"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "./ui/SectionHeader";
import { getDictionary, localizedHref, type Locale } from "@/lib/i18n";
import { GalleryBlockRenderer } from "./GalleryBlock";
import type { GalleryBlock } from "../../sanity/lib/types";
import { ArrowRight } from "lucide-react";

export interface PortfolioContent {
  title?: string;
  description?: string;
  works?: Array<{
    title: string;
    slug: string;
    category: string;
    coverImageBlock?: GalleryBlock;
    titleEdit?: string;
    categoryEdit?: string;
    imageEdit?: string;
  }>;
  openProjectLabel?: string;
  titleEdit?: string;
  descriptionEdit?: string;
  openProjectLabelEdit?: string;
}

const defaultWorks: NonNullable<PortfolioContent["works"]> = [
  {
    title: "Przykładowy projekt",
    slug: "#",
    category: "Design",
  },
];

export const Portfolio = ({ content, locale = "pl" }: { content?: PortfolioContent; locale?: Locale }) => {
  const workItems = content?.works?.length ? content.works : defaultWorks;
  const dict = getDictionary(locale);
  const openProjectLabel = content?.openProjectLabel || dict.home.portfolioOpen;

  return (
    <section className="section-padding bg-[var(--background)]" id="portfolio">
      <div className="container-main">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <SectionHeader
            title={content?.title || dict.home.portfolioTitle}
            description={content?.description || dict.home.portfolioDescription}
            titleEdit={content?.titleEdit}
            descriptionEdit={content?.descriptionEdit}
          />
        </div>

        <div className="space-y-24 md:space-y-32">
          {workItems.map((work, idx) => (
            <motion.div
              key={work.slug + idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col gap-6"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
                <div>
                  <span className="badge badge-outline mb-3" data-sanity={work.categoryEdit}>{work.category}</span>
                  <h3 className="heading-card text-[var(--foreground)]" data-sanity={work.titleEdit}>{work.title}</h3>
                </div>
                <Link
                  href={work.slug === "#" ? "#" : localizedHref(locale, `/projekt/${work.slug}`)}
                  className="inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase text-[var(--primary)] hover:text-[var(--foreground)] transition-colors"
                >
                  <span data-sanity={content?.openProjectLabelEdit}>{openProjectLabel}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="relative group cursor-pointer" data-sanity={work.imageEdit}>
                <Link
                  href={work.slug === "#" ? "#" : localizedHref(locale, `/projekt/${work.slug}`)}
                  className="absolute inset-0 z-20"
                  aria-label={work.title}
                />
                <div className="pointer-events-none">
                  {work.coverImageBlock ? (
                    <GalleryBlockRenderer blocks={[work.coverImageBlock]} standalone={false} />
                  ) : (
                    <div className="w-full aspect-[21/9] bg-[var(--muted)] rounded-lg flex items-center justify-center">
                      <span className="text-[var(--muted-foreground)]">Brak galerii</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
