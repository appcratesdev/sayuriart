"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getDictionary, localizedHref, type Locale } from "@/lib/i18n";
import { SectionHeader } from "./ui/SectionHeader";
import { EditableImage } from "./EditableImage";

export interface ServiceContent {
  title: string;
  slug?: string;
  desc?: string;
  features?: string[];
  img?: string;
  aspectRatio?: string;
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
  ctaText?: string;
  servicePageCtaText?: string;
  sectionTitleEdit?: string;
  sectionDescriptionEdit?: string;
  ctaTextEdit?: string;
  servicePageCtaTextEdit?: string;
}

export const Services = ({
  items,
  locale = "pl",
  sectionTitle,
  sectionDescription,
  ctaText,
  servicePageCtaText,
  sectionTitleEdit,
  sectionDescriptionEdit,
  ctaTextEdit,
  servicePageCtaTextEdit,
}: ServicesProps) => {
  const serviceItems = items || [];
  const dict = getDictionary(locale);

  if (!serviceItems.length) {
    return null;
  }

  return (
    <section className="section-padding bg-[var(--background)]" id="services">
      <div className="container-main">
        {sectionTitle && (
          <SectionHeader
            title={sectionTitle}
            description={sectionDescription}
            titleEdit={sectionTitleEdit}
            descriptionEdit={sectionDescriptionEdit}
          />
        )}

        <div className="mt-12 grid gap-6 lg:gap-8">
          {serviceItems.map((service, index) => (
            <motion.div
              key={service._id || service.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[var(--radius-xl)] bg-[var(--card)] p-5 sm:p-6 md:p-8 lg:p-10"
              data-sanity={service.titleEdit}
            >
              <h3
                className="heading-card text-center text-foreground mb-6 md:mb-8"
                data-sanity={service.titleEdit}
              >
                {service.title}
              </h3>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-center">
                <div
                  className="relative w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--card)]"
                  style={{ aspectRatio: service.aspectRatio || "4/3" }}
                  data-sanity={service.imageEdit}
                >
                  <EditableImage
                    src={service.img || "/images/placeholder.jpg"}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 720px"
                    quality={95}
                    documentId={service._id}
                    fieldPath="image"
                    imageValue={service.imageValue}
                  />
                </div>

                <div className="lg:pl-2">
                  {service.desc && (
                    <p className="text-body mb-6" data-sanity={service.descEdit}>
                      {service.desc}
                    </p>
                  )}

                  {!!service.features?.length && (
                  <ul className="space-y-2.5" data-sanity={service.featuresEdit}>
                    {service.features.map((feature) => (
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
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <div className="flex flex-col sm:flex-row gap-3">
                  {service.slug && (
                    <Link
                      href={localizedHref(locale, `/${locale === "en" ? "services" : "uslugi"}/${service.slug}`)}
                      className="btn btn-secondary"
                      data-sanity={servicePageCtaTextEdit}
                    >
                      {servicePageCtaText || (locale === "en" ? "Explore service" : "Zobacz usluge")} -&gt;
                    </Link>
                  )}
                  <Link href="#pricing" className="btn btn-accent">
                    <span data-sanity={ctaTextEdit}>{ctaText || dict.home.servicesCta}</span> -&gt;
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
