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

const PricingCard = ({ pkg, locale }: { pkg: Package; locale: Locale }) => {
  const dict = getDictionary(locale);

  return (
    <div className={`pricing-card ${pkg.featured ? "featured" : ""}`}>
      {pkg.featured && (
        <span className="badge badge-primary absolute top-4 right-4 md:top-6 md:right-6 z-10 whitespace-nowrap">
          {dict.home.pricingPopular}
        </span>
      )}

      <h3 className={`heading-card text-[var(--foreground)] mb-2 ${pkg.featured ? "pr-28 sm:pr-32" : ""}`} data-sanity={pkg.nameEdit}>
        {pkg.name}
      </h3>

      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-4xl md:text-5xl font-serif text-[var(--foreground)]" data-sanity={pkg.priceEdit}>{pkg.price}</span>
        <span className="text-lg text-[var(--muted-foreground)]">{dict.home.pricingCurrency}</span>
        {pkg.unit && <span className="text-sm text-[var(--muted-foreground)] ml-1">{pkg.unit}</span>}
      </div>

      {pkg.savings ? (
        <div className="flex items-center gap-2 mt-2 mb-4">
          <span className="badge badge-savings">
            {dict.home.pricingSavings} {pkg.savings} {dict.home.pricingCurrency}
          </span>
          <span className="text-xs text-[var(--muted-foreground)] line-through">
            {pkg.originalValue} {dict.home.pricingCurrency}
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

      <Link href="#contact" className={`btn mt-6 w-full ${pkg.featured ? "btn-accent" : "btn-secondary"}`}>
        {dict.home.pricingOrder}
      </Link>
    </div>
  );
};

export const Pricing = ({ items, locale = "pl" }: { items?: PricingCategory[]; locale?: Locale }) => {
  const pricingCategories = items?.length ? items : fallbackCategories;
  const [activeCategory, setActiveCategory] = useState(0);
  const current = pricingCategories[activeCategory] ?? pricingCategories[0];
  const dict = getDictionary(locale);

  return (
    <section className="section-padding bg-[var(--secondary)]" id="pricing">
      <div className="container-main">
        <SectionHeader title={dict.home.pricingTitle} description={dict.home.pricingDescription} align="center" />

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
              <PricingCard key={pkg.name} pkg={pkg} locale={locale} />
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
          <p className="text-body mb-4">{dict.home.pricingCustomQuestion}</p>
          <Link href="#contact" className="btn btn-secondary">
            {dict.home.pricingCustomCta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
