"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getDictionary, type Locale } from "@/lib/i18n";
import { SectionHeader } from "./ui/SectionHeader";

const fallbackServices = [
  {
    title: "Grafiki lifestyle",
    desc: "Realistyczne, estetyczne sceny lifestyle pokazujace produkt w naturalnym otoczeniu.",
    features: ["Realistyczne sceny AI", "Dowolne otoczenie i styl", "Spojny wizerunek marki"],
    img: "/images/placeholder.jpg",
  },
  {
    title: "Packshoty",
    desc: "Profesjonalne grafiki produktowe na czystym tle, gotowe do sklepow i marketplace.",
    features: ["Czyste biale tlo", "Precyzyjne odwzorowanie produktu", "Wysoka rozdzielczosc"],
    img: "/images/placeholder.jpg",
  },
  {
    title: "Infografiki",
    desc: "Czytelne infografiki, ktore prezentuja najwazniejsze cechy i korzysci produktu.",
    features: ["Hierarchia informacji", "Spojnosc z marka", "Wsparcie konwersji"],
    img: "/images/placeholder.jpg",
  },
];

export interface ServiceContent {
  title: string;
  desc?: string;
  features?: string[];
  img?: string;
}

export const Services = ({ items, locale = "pl" }: { items?: ServiceContent[]; locale?: Locale }) => {
  const serviceItems = items?.length ? items : fallbackServices;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = serviceItems[activeIndex] ?? serviceItems[0];
  const dict = getDictionary(locale);

  return (
    <section className="section-padding bg-[var(--background)]" id="services">
      <div className="container-main">
        <SectionHeader title={dict.home.servicesTitle} description={dict.home.servicesDescription} />

        <div className="mt-12 mb-10 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-2 w-max md:w-auto md:flex-wrap md:justify-center">
            {serviceItems.map((service, index) => (
              <button
                key={service.title}
                onClick={() => setActiveIndex(index)}
                className={`tab-btn ${activeIndex === index ? "active" : ""}`}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>

        <div className="relative bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-xl)] overflow-hidden min-h-[420px] md:min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col md:flex-row"
            >
              <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[480px]">
                <Image
                  src={activeService.img || "/images/placeholder.jpg"}
                  alt={activeService.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                <h3 className="heading-card text-[var(--foreground)] mb-4">{activeService.title}</h3>
                {activeService.desc && <p className="text-body mb-8">{activeService.desc}</p>}

                <ul className="space-y-3 mb-8">
                  {(activeService.features || []).map((feature) => (
                    <li key={feature} className="pricing-feature">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="#pricing" className="btn btn-accent self-start">
                  {dict.home.servicesCta} -&gt;
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
