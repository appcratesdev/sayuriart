"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getDictionary, type Locale } from "@/lib/i18n";
import { SectionHeader } from "./ui/SectionHeader";
import { EditableImage } from "./EditableImage";

const fallbackServices: ServiceContent[] = [
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
  titleEdit?: string;
  descEdit?: string;
  featuresEdit?: string;
  imageEdit?: string;
  _id?: string;
  _type?: string;
  imageValue?: {
    hotspot?: { x: number; y: number };
    crop?: { top: number; bottom: number; left: number; right: number };
  } | null;
}

interface ServicesProps {
  items?: ServiceContent[];
  locale?: Locale;
  sectionTitle?: string;
  sectionDescription?: string;
  sectionTitleEdit?: string;
  sectionDescriptionEdit?: string;
}

export const Services = ({
  items,
  locale = "pl",
  sectionTitle,
  sectionDescription,
  sectionTitleEdit,
  sectionDescriptionEdit,
}: ServicesProps) => {
  const serviceItems = items?.length ? items : fallbackServices;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = serviceItems[activeIndex] ?? serviceItems[0];
  const dict = getDictionary(locale);

  return (
    <section className="section-padding bg-[var(--background)]" id="services">
      <div className="container-main">
        <SectionHeader
          title={sectionTitle || dict.home.servicesTitle}
          description={sectionDescription || dict.home.servicesDescription}
          titleEdit={sectionTitleEdit}
          descriptionEdit={sectionDescriptionEdit}
        />

        <div className="mt-12 mb-10 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-2 w-max md:w-auto md:flex-wrap md:justify-center">
            {serviceItems.map((service, index) => (
              <button
                key={service.title}
                onClick={() => setActiveIndex(index)}
                className={`tab-btn ${activeIndex === index ? "active" : ""}`}
                data-sanity={service.titleEdit}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[var(--radius-xl)] bg-[var(--card)] p-5 sm:p-6 md:p-8 lg:p-10"
            >
              <h3
                className="heading-card text-center text-foreground mb-6 md:mb-8"
                data-sanity={activeService.titleEdit}
              >
                {activeService.title}
              </h3>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-center">
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--card)]"
                  data-sanity={activeService.imageEdit}
                >
                  <EditableImage
                    src={activeService.img || "/images/placeholder.jpg"}
                    alt={activeService.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 720px"
                    quality={95}
                    documentId={activeService._id}
                    fieldPath="image"
                    imageValue={activeService.imageValue}
                  />
                </div>

                <div className="lg:pl-2">
                  {activeService.desc && (
                    <p className="text-body mb-6" data-sanity={activeService.descEdit}>
                      {activeService.desc}
                    </p>
                  )}

                  <ul className="space-y-2.5" data-sanity={activeService.featuresEdit}>
                    {(activeService.features || []).map((feature) => (
                      <li key={feature} className="pricing-feature">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M13.5 4.5L6 12L2.5 8.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Link href="#pricing" className="btn btn-accent">
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
