"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./ui/SectionHeader";

const categories = [
  {
    id: "lifestyle",
    label: "Lifestyle",
    packages: [
      {
        name: "Pakiet 5 grafik",
        price: "449",
        unit: "89,80 zł / grafika",
        featured: false,
        features: [
          "5 realistycznych grafik lifestyle AI",
          "Dla 1 lub różnych produktów",
          "Jeden spójny styl marki",
          "1 runda poprawek",
          "Dowolny format: 1:1, 4:5, 4:3, 16:9, 9:16",
          "Do sklepu, social mediów i reklam",
        ],
      },
      {
        name: "Pakiet 10 grafik",
        price: "790",
        unit: "79 zł / grafika",
        featured: true,
        features: [
          "10 realistycznych grafik lifestyle AI",
          "Możliwość pokazania różnych produktów",
          "Spójny, estetyczny styl wizualny marki",
          "1 runda poprawek",
          "Dowolny format: 1:1, 4:5, 4:3, 16:9, 9:16",
          "Idealne do e-commerce i social mediów",
        ],
      },
      {
        name: "Pakiet 20 grafik",
        price: "1490",
        unit: "74,50 zł / grafika",
        featured: false,
        features: [
          "20 realistycznych grafik lifestyle AI",
          "Dla jednego lub wielu produktów",
          "Jeden spójny styl całej marki",
          "1 runda poprawek",
          "Dowolny format: 1:1, 4:5, 4:3, 16:9, 9:16",
          "Do sklepu, reklam i social mediów",
        ],
      },
    ],
  },
  {
    id: "product",
    label: "Produktowy",
    packages: [
      {
        name: "Pakiet podstawowy",
        price: "299",
        unit: null,
        featured: false,
        savings: "97",
        originalValue: "396",
        features: [
          "1 packshot na białym tle",
          "2 realistyczne grafiki lifestyle AI",
          "1 infografika produktowa",
          "Spójny styl wizualny całego zestawu",
          "1 runda poprawek",
          "Dowolny format: 1:1, 4:5, 4:3, 16:9, 9:16",
        ],
      },
      {
        name: "Pakiet rozszerzony",
        price: "449",
        unit: null,
        featured: true,
        savings: "195",
        originalValue: "644",
        features: [
          "1 packshot na białym tle",
          "3 realistyczne grafiki lifestyle AI",
          "2 infografiki produktowe",
          "Spójny styl wizualny całego zestawu",
          "1 runda poprawek",
          "Dowolny format: 1:1, 4:5, 4:3, 16:9, 9:16",
        ],
      },
    ],
  },
  {
    id: "amazon",
    label: "Amazon",
    packages: [
      {
        name: "Amazon Podstawowy",
        price: "1090",
        unit: null,
        featured: false,
        savings: "345",
        originalValue: "1435",
        features: [
          "1 packshot na białym tle",
          "2 realistyczne grafiki lifestyle AI",
          "2 infografiki produktowe",
          "A+ Content Basic",
          "Spójny styl wizualny całego zestawu",
          "1 runda poprawek",
          "Gotowe do wykorzystania na Amazon",
        ],
      },
      {
        name: "Amazon Full",
        price: "1690",
        unit: null,
        featured: true,
        savings: "492",
        originalValue: "2182",
        features: [
          "1 packshot na białym tle",
          "4 realistyczne grafiki lifestyle AI",
          "3 infografiki produktowe",
          "A+ Content Full",
          "Spójny styl wizualny całego zestawu",
          "1 runda poprawek",
          "Kompleksowe przygotowanie oferty Amazon",
        ],
      },
    ],
  },
  {
    id: "subscription",
    label: "Subskrypcje",
    packages: [
      {
        name: "Subskrypcja Basic",
        price: "1690",
        unit: "/ miesiąc",
        featured: false,
        features: [
          "Stały, priorytetowy dostęp do usług",
          "Jedno aktywne zlecenie na raz",
          "Realizacja w 24–48 h",
          "Packshoty, lifestyle AI, infografiki",
          "Dowolne formaty",
          "1 runda poprawek",
          "Spójny styl wizualny marki",
        ],
      },
      {
        name: "Subskrypcja Full Pro",
        price: "2790",
        unit: "/ miesiąc",
        featured: true,
        features: [
          "Stały, priorytetowy dostęp do usług",
          "Jedno aktywne zlecenie na raz",
          "Realizacja w 24–48 h",
          "Packshoty, lifestyle, infografiki + A+ Content",
          "Dowolne formaty",
          "1 runda poprawek",
          "Spójny styl wizualny marki",
          "Rozbudowane materiały produktowe",
        ],
      },
    ],
  },
];

interface Package {
  name: string;
  price: string;
  unit?: string | null;
  featured: boolean;
  savings?: string;
  originalValue?: string;
  features: string[];
}

export interface PricingCategory {
  id: string;
  label: string;
  packages: Package[];
}

const PricingCard = ({ pkg }: { pkg: Package }) => (
  <div className={`pricing-card ${pkg.featured ? "featured" : ""}`}>
    {pkg.featured && (
      <span className="badge badge-primary absolute top-4 right-4 md:top-6 md:right-6 z-10 whitespace-nowrap">POPULARNY</span>
    )}

    <h3 className={`heading-card text-[var(--foreground)] mb-2 ${pkg.featured ? "pr-28 sm:pr-32" : ""}`}>{pkg.name}</h3>

    <div className="flex items-baseline gap-1 mb-1">
      <span className="text-4xl md:text-5xl font-serif text-[var(--foreground)]">{pkg.price}</span>
      <span className="text-lg text-[var(--muted-foreground)]"> zł</span>
      {pkg.unit && (
        <span className="text-sm text-[var(--muted-foreground)] ml-1">{pkg.unit}</span>
      )}
    </div>

    {pkg.savings && (
      <div className="flex items-center gap-2 mt-2 mb-4">
        <span className="badge badge-savings">Oszczędzasz {pkg.savings} zł</span>
        <span className="text-xs text-[var(--muted-foreground)] line-through">{pkg.originalValue} zł</span>
      </div>
    )}

    {!pkg.savings && <div className="mb-4" />}

    <div className="border-t border-[var(--border)] my-4 pt-4 flex-1">
      <ul className="space-y-2.5">
        {pkg.features.map((f, i) => (
          <li key={i} className="pricing-feature">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
              <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>

    <Link
      href="#contact"
      className={`btn mt-6 w-full ${pkg.featured ? "btn-accent" : "btn-secondary"}`}
    >
      Zamów pakiet
    </Link>
  </div>
);

export const Pricing = ({ items }: { items?: PricingCategory[] }) => {
  const pricingCategories = items?.length ? items : categories;
  const [activeCategory, setActiveCategory] = useState(0);
  const current = pricingCategories[activeCategory] ?? pricingCategories[0];

  return (
    <section className="section-padding bg-[var(--secondary)]" id="pricing">
      <div className="container-main">
        <SectionHeader
          title="Transparentne ceny"
          description="Wybierz pakiet dopasowany do swoich potrzeb. Bez ukrytych kosztów."
          align="center"
        />

        {/* Category Tabs */}
        <div className="flex justify-center mt-10 mb-12 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <div className="tabs-container flex-wrap justify-center">
            {pricingCategories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(i)}
                className={`tab-btn ${activeCategory === i ? "active" : ""}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`grid gap-6 md:gap-8 max-w-5xl mx-auto ${
              current.packages.length === 3
                ? "grid-cols-1 md:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {current.packages.map((pkg, i) => (
              <PricingCard key={i} pkg={pkg} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-body mb-4">Potrzebujesz czegoś innego?</p>
          <Link href="#contact" className="btn btn-secondary">
            Napisz do mnie — indywidualna wycena
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
