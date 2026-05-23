"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "./ui/SectionHeader";
import { getDictionary, localizedHref, type Locale } from "@/lib/i18n";

export interface PortfolioContent {
  title?: string;
  description?: string;
  works?: Array<{
    title: string;
    slug: string;
    category: string;
    img?: string;
    aspect?: string;
    span?: string;
    titleEdit?: string;
    categoryEdit?: string;
    imageEdit?: string;
  }>;
  allFilterLabel?: string;
  openProjectLabel?: string;
  titleEdit?: string;
  descriptionEdit?: string;
  allFilterLabelEdit?: string;
  openProjectLabelEdit?: string;
}

const works: NonNullable<PortfolioContent["works"]> = [
  { title: "Kosmetyki naturalne", slug: "kosmetyki-naturalne", category: "Lifestyle", img: "/images/placeholder.jpg", aspect: "aspect-[4/5]", span: "col-span-1 md:col-span-2 md:row-span-2" },
  { title: "Kolekcja zapachow", slug: "kolekcja-zapachow", category: "Packshot", img: "/images/placeholder.jpg", aspect: "aspect-square", span: "col-span-1" },
  { title: "Swiece premium", slug: "swiece-premium", category: "Lifestyle", img: "/images/placeholder.jpg", aspect: "aspect-square", span: "col-span-1" },
  { title: "Ceramika artystyczna", slug: "ceramika-artystyczna", category: "Infografiki", img: "/images/placeholder.jpg", aspect: "aspect-[3/4]", span: "col-span-1" },
  { title: "Suplementy diety", slug: "suplementy-diety", category: "A+ Content", img: "/images/placeholder.jpg", aspect: "aspect-[16/10]", span: "col-span-1 md:col-span-2" },
  { title: "Bizuteria premium", slug: "bizuteria-premium", category: "Packshot", img: "/images/placeholder.jpg", aspect: "aspect-[3/4]", span: "col-span-1" },
];

export const Portfolio = ({ content, locale = "pl" }: { content?: PortfolioContent; locale?: Locale }) => {
  const workItems = content?.works?.length ? content.works : works;
  const dict = getDictionary(locale);
  const allFilter = content?.allFilterLabel || dict.home.portfolioAll;
  const openProjectLabel = content?.openProjectLabel || dict.home.portfolioOpen;
  const filterItems = [allFilter, ...Array.from(new Set(workItems.map((work) => work.category)))];
  const [activeFilter, setActiveFilter] = useState<string>(allFilter);
  const filtered =
    activeFilter === allFilter
      ? workItems
      : workItems.filter((work) => work.category === activeFilter);

  return (
    <section className="section-padding bg-[var(--background)]" id="portfolio">
      <div className="container-main">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <SectionHeader
            title={content?.title || dict.home.portfolioTitle}
            description={
              content?.description ||
              dict.home.portfolioDescription
            }
            titleEdit={content?.titleEdit}
            descriptionEdit={content?.descriptionEdit}
          />
        </div>

        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 -mx-2 px-2">
          {filterItems.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`tab-btn ${activeFilter === filter ? "active" : ""}`}
              data-sanity={filter === allFilter ? content?.allFilterLabelEdit : undefined}
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {filtered.map((work) => (
            <motion.div
              key={work.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`group cursor-pointer ${work.span || "col-span-1"}`}
            >
              <Link href={localizedHref(locale, `/projekt/${work.slug}`)} className="block w-full h-full">
                <div className={`img-wrapper w-full ${work.aspect || "aspect-square"}`} data-sanity={work.imageEdit}>
                  <Image
                    src={work.img || "/images/placeholder.jpg"}
                    alt={work.title}
                    fill
                    className="object-cover img-hover-zoom"
                    sizes={
                      work.span?.includes("col-span-2") || work.span?.includes("md:col-span-2")
                        ? "(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                        : "(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    }
                    quality={95}
                  />
                  <div className="img-overlay" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="px-5 py-2.5 bg-white/90 backdrop-blur-sm text-[var(--foreground)] text-xs font-bold tracking-widest uppercase rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <span data-sanity={content?.openProjectLabelEdit}>{openProjectLabel}</span>
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <h3 className="text-base font-medium text-[var(--foreground)]" data-sanity={work.titleEdit}>{work.title}</h3>
                  <span className="badge badge-outline" data-sanity={work.categoryEdit}>{work.category}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
