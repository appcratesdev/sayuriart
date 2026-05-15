"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./ui/SectionHeader";

const services = [
  {
    title: "Grafiki lifestyle",
    desc: "Realistyczne, estetyczne sceny lifestyle, które pokazują Twój produkt w naturalnym otoczeniu i przyciągają uwagę klientów.",
    features: ["Realistyczne sceny AI", "Dowolne otoczenie i styl", "Spójny wizerunek marki", "Gotowe do social media i e-commerce"],
    img: "/images/placeholder.jpg",
  },
  {
    title: "Zdjęcia na białym tle",
    desc: "Profesjonalne grafiki produktowe na czystym białym tle, idealne do sklepów internetowych i ofert na Amazon.",
    features: ["Czyste białe tło", "Precyzyjne odwzorowanie produktu", "Zgodne z wytycznymi marketplace", "Wysokia rozdzielczość"],
    img: "/images/placeholder.jpg",
  },
  {
    title: "Infografiki produktowe",
    desc: "Czytelne i estetyczne infografiki, które w prosty sposób prezentują najważniejsze cechy i korzyści Twojego produktu.",
    features: ["Wizualizacja kluczowych cech", "Czytelna hierarchia informacji", "Spójna z identyfikacją marki", "Zwiększają konwersję"],
    img: "/images/placeholder.jpg",
  },
  {
    title: "A+ Content",
    desc: "Projekt i przygotowanie treści A+ Content, które wyróżnią Twoją ofertę i zwiększą konwersję na Amazon.",
    features: ["Moduły A+ Basic i Premium", "Zgodne z wytycznymi Amazon", "Storytelling wizualny", "Wyższa konwersja listingów"],
    img: "/images/placeholder.jpg",
  },
  {
    title: "Inne grafiki",
    desc: "Potrzebujesz innych grafik? Przygotuję indywidualną wycenę dopasowaną do Twoich potrzeb.",
    features: ["Banery reklamowe", "Grafiki do social media", "Materiały do kampanii", "Indywidualna wycena"],
    img: "/images/placeholder.jpg",
  },
];

export interface ServiceContent {
  title: string;
  desc?: string;
  features?: string[];
  img?: string;
}

export const Services = ({ items }: { items?: ServiceContent[] }) => {
  const serviceItems = items?.length ? items : services;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = serviceItems[activeIndex] ?? serviceItems[0];

  return (
    <section className="section-padding bg-[var(--background)]" id="services">
      <div className="container-main">
        <SectionHeader
          title="Co mogę dla Ciebie zrobić"
          description="Kompleksowe usługi graficzne dopasowane do potrzeb Twojego e-commerce, marketplace i social media."
        />

        {/* Tabs */}
        <div className="mt-12 mb-10 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-2 w-max md:w-auto md:flex-wrap md:justify-center">
            {serviceItems.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`tab-btn ${activeIndex === i ? "active" : ""}`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
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
              {/* Image */}
              <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[480px]">
                <Image
                  src={activeService.img || "/images/placeholder.jpg"}
                  alt={activeService.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">

                <h3 className="heading-card text-[var(--foreground)] mb-4">
                  {activeService.title}
                </h3>
                <p className="text-body mb-8">
                  {activeService.desc}
                </p>

                <ul className="space-y-3 mb-8">
                  {(activeService.features || []).map((f, j) => (
                    <li key={j} className="pricing-feature">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href="#pricing" className="btn btn-accent self-start">
                  Zobacz cennik →
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
