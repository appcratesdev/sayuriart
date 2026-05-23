"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getDictionary, type Locale } from "@/lib/i18n";
import { SectionHeader } from "./ui/SectionHeader";

interface Package {
  name: string;
  price: string;
  unit?: string | null;
  featured: boolean;
  savings?: string;
  originalValue?: string;
  features: string[];
  nameEdit?: string;
  priceEdit?: string;
  unitEdit?: string;
  savingsEdit?: string;
  originalValueEdit?: string;
  featuresEdit?: string;
}

export interface PricingCategory {
  id: string;
  label: string;
  packages: Package[];
  labelEdit?: string;
}

const fallbackCategories: PricingCategory[] = [
  {
    id: "lifestyle",
    label: "Lifestyle",
    packages: [
      {
        name: "Pakiet 10 grafik",
        price: "790",
        unit: "79 zl / grafika",
        featured: true,
        features: ["10 realistycznych grafik lifestyle AI", "Spojny styl marki", "1 runda poprawek"],
      },
    ],
  },
];

const PricingCard = ({
  pkg,
  labels,
}: {
  pkg: Package;
  labels: {
    popular: string;
    order: string;
    currency: string;
    savings: string;
    orderMessageTemplate: string;
    popularEdit?: string;
    orderEdit?: string;
    currencyEdit?: string;
    savingsEdit?: string;
  };
}) => {
  return (
    <div className={`pricing-card transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-2 hover:ring-[var(--primary)] cursor-default ${pkg.featured ? "featured ring-1 ring-[var(--primary)]" : ""}`} style={{ padding: '1.75rem', fontSize: '0.9rem' }}>
      {pkg.featured && (
        <span className="badge badge-primary absolute top-3 right-3 md:top-4 md:right-4 z-10 whitespace-nowrap text-xs" data-sanity={labels.popularEdit}>
          {labels.popular}
        </span>
      )}

      <h3 className={`heading-card text-[var(--foreground)] mb-2 ${pkg.featured ? "pr-28 sm:pr-32" : ""}`} data-sanity={pkg.nameEdit}>
        {pkg.name}
      </h3>

      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl md:text-4xl font-serif text-[var(--foreground)]" data-sanity={pkg.priceEdit}>{pkg.price}</span>
        <span className="text-base text-[var(--muted-foreground)]" data-sanity={labels.currencyEdit}>{labels.currency}</span>
        {pkg.unit && <span className="text-xs text-[var(--muted-foreground)] ml-1" data-sanity={pkg.unitEdit}>{pkg.unit}</span>}
      </div>

      {pkg.savings ? (
        <div className="flex items-center gap-2 mt-2 mb-4">
          <span className="badge badge-savings">
            <span data-sanity={labels.savingsEdit}>{labels.savings}</span> <span data-sanity={pkg.savingsEdit}>{pkg.savings}</span> <span data-sanity={labels.currencyEdit}>{labels.currency}</span>
          </span>
          <span className="text-xs text-[var(--muted-foreground)] line-through" data-sanity={pkg.originalValueEdit}>
            {pkg.originalValue} {labels.currency}
          </span>
        </div>
      ) : (
        <div className="mb-4" />
      )}

      <div className="border-t border-[var(--border)] my-4 pt-4 flex-1">
        <ul className="space-y-2.5" data-sanity={pkg.featuresEdit}>
          {pkg.features.map((feature) => (
            <li key={feature} className="pricing-feature">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
                <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link 
        href="#contact" 
        onClick={() => {
          setTimeout(() => {
            const messageEl = document.getElementById('message') as HTMLTextAreaElement;
            if (messageEl) {
              messageEl.value = labels.orderMessageTemplate.replace("{package}", pkg.name);
              messageEl.focus();
            }
          }, 100);
        }}
        className={`btn mt-6 w-full transition-transform hover:scale-[1.02] ${pkg.featured ? "btn-accent" : "btn-secondary"}`}
      >
        <span data-sanity={labels.orderEdit}>{labels.order}</span>
      </Link>
    </div>
  );
};

interface PricingProps {
  items?: PricingCategory[];
  locale?: Locale;
  sectionTitle?: string;
  sectionDescription?: string;
  customQuestion?: string;
  customCta?: string;
  popularLabel?: string;
  orderLabel?: string;
  currencyLabel?: string;
  savingsLabel?: string;
  orderMessageTemplate?: string;
  sectionTitleEdit?: string;
  sectionDescriptionEdit?: string;
  customQuestionEdit?: string;
  customCtaEdit?: string;
  popularLabelEdit?: string;
  orderLabelEdit?: string;
  currencyLabelEdit?: string;
  savingsLabelEdit?: string;
}

export const Pricing = ({
  items,
  locale = "pl",
  sectionTitle,
  sectionDescription,
  customQuestion,
  customCta,
  popularLabel,
  orderLabel,
  currencyLabel,
  savingsLabel,
  orderMessageTemplate,
  sectionTitleEdit,
  sectionDescriptionEdit,
  customQuestionEdit,
  customCtaEdit,
  popularLabelEdit,
  orderLabelEdit,
  currencyLabelEdit,
  savingsLabelEdit,
}: PricingProps) => {
  const pricingCategories = items?.length ? items : fallbackCategories;
  const [activeCategory, setActiveCategory] = useState(0);
  const current = pricingCategories[activeCategory] ?? pricingCategories[0];
  const dict = getDictionary(locale);
  const labels = {
    popular: popularLabel || dict.home.pricingPopular,
    order: orderLabel || dict.home.pricingOrder,
    currency: currencyLabel || dict.home.pricingCurrency,
    savings: savingsLabel || dict.home.pricingSavings,
    orderMessageTemplate:
      orderMessageTemplate ||
      (locale === "en"
        ? "Hello, I am interested in {package}. Please send me more information."
        : "Dzien dobry, interesuje mnie {package}. Prosze o wiecej informacji."),
    popularEdit: popularLabelEdit,
    orderEdit: orderLabelEdit,
    currencyEdit: currencyLabelEdit,
    savingsEdit: savingsLabelEdit,
  };

  return (
    <section className="section-padding bg-[var(--secondary)]" id="pricing">
      <div className="container-main">
        <SectionHeader 
          title={sectionTitle || dict.home.pricingTitle} 
          description={sectionDescription || dict.home.pricingDescription} 
          titleEdit={sectionTitleEdit}
          descriptionEdit={sectionDescriptionEdit}
          align="center" 
        />

        <div className="flex justify-center mt-10 mb-12 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <div className="tabs-container flex-wrap justify-center">
            {pricingCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(index)}
                className={`tab-btn ${activeCategory === index ? "active" : ""}`}
                data-sanity={category.labelEdit}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`grid gap-6 md:gap-8 max-w-5xl mx-auto ${
              current.packages.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {current.packages.map((pkg) => (
              <PricingCard key={pkg.name} pkg={pkg} labels={labels} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-body mb-4" data-sanity={customQuestionEdit}>{customQuestion || dict.home.pricingCustomQuestion}</p>
          <Link href="#contact" className="btn btn-secondary" data-sanity={customCtaEdit}>
            {customCta || dict.home.pricingCustomCta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
