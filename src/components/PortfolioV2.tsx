"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
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
  titleEdit?: string;
  descriptionEdit?: string;
}

const fallbackWorks: NonNullable<PortfolioContent["works"]> = [
  { title: "Kosmetyki naturalne", slug: "kosmetyki-naturalne", category: "Lifestyle", img: "/images/placeholder.jpg" },
  { title: "Kolekcja zapachow", slug: "kolekcja-zapachow", category: "Packshot", img: "/images/placeholder.jpg" },
  { title: "Swiece premium", slug: "swiece-premium", category: "Lifestyle", img: "/images/placeholder.jpg" },
  { title: "Ceramika artystyczna", slug: "ceramika-artystyczna", category: "Infografiki", img: "/images/placeholder.jpg" },
  { title: "Suplementy diety", slug: "suplementy-diety", category: "A+ Content", img: "/images/placeholder.jpg" },
  { title: "Bizuteria premium", slug: "bizuteria-premium", category: "Packshot", img: "/images/placeholder.jpg" },
];

/* ── Floating image that follows the cursor ───────────────────── */
const FloatingImage = ({
  src,
  alt,
  isVisible,
}: {
  src: string;
  alt: string;
  isVisible: boolean;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring-based following
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - 180);
      mouseY.set(e.clientY - 220);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="pv2-floating-image"
          style={{ x, y }}
          initial={{ opacity: 0, scale: 0.7, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          exit={{ opacity: 0, scale: 0.7, rotate: 4 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="360px"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ── Single row item ──────────────────────────────────────────── */
const PortfolioRow = ({
  work,
  index,
  locale,
  dict,
  onHover,
  onLeave,
  isActive,
}: {
  work: NonNullable<PortfolioContent["works"]>[number];
  index: number;
  locale: Locale;
  dict: ReturnType<typeof getDictionary>;
  onHover: () => void;
  onLeave: () => void;
  isActive: boolean;
}) => {
  const padIndex = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={localizedHref(locale, `/projekt/${work.slug}`)}
        className={`pv2-row ${isActive ? "pv2-row--active" : ""}`}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {/* Number */}
        <span className="pv2-row-index">{padIndex}</span>

        {/* Title */}
        <h3 className="pv2-row-title" data-sanity={work.titleEdit}>
          {work.title}
        </h3>

        {/* Category */}
        <span className="pv2-row-category" data-sanity={work.categoryEdit}>
          {work.category}
        </span>

        {/* Arrow */}
        <span className="pv2-row-arrow">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </span>

        {/* Mobile-only thumbnail */}
        <div className="pv2-row-thumb" data-sanity={work.imageEdit}>
          <Image
            src={work.img || "/images/placeholder.jpg"}
            alt={work.title}
            width={64}
            height={64}
            className="object-cover rounded-lg"
          />
        </div>
      </Link>
    </motion.div>
  );
};

/* ── Main component ───────────────────────────────────────────── */
export const PortfolioV2 = ({ content, locale = "pl" }: { content?: PortfolioContent; locale?: Locale }) => {
  const workItems = content?.works?.length ? content.works : fallbackWorks;
  const dict = getDictionary(locale);
  const categories = Array.from(new Set(workItems.map((w) => w.category)));
  const filterItems = [dict.home.portfolioAll, ...categories];
  const [activeFilter, setActiveFilter] = useState<string>(dict.home.portfolioAll);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const filtered =
    activeFilter === dict.home.portfolioAll
      ? workItems
      : workItems.filter((w) => w.category === activeFilter);

  const hoveredWork = filtered.find((w) => w.slug === hoveredSlug);

  return (
    <section className="pv2-section" id="portfolio">
      <div className="container-main">
        {/* ── Header ──────────────────────────────────────── */}
        <div className="pv2-header">
          <SectionHeader
            title={content?.title || dict.home.portfolioTitle}
            description={content?.description || dict.home.portfolioDescription}
            titleEdit={content?.titleEdit}
            descriptionEdit={content?.descriptionEdit}
          />

          {/* Filter pills — inline with header on desktop */}
          <div className="pv2-filters">
            {filterItems.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`pv2-filter-btn ${activeFilter === filter ? "active" : ""}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* ── Rows list ───────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pv2-list"
          >
            {filtered.map((work, i) => (
              <PortfolioRow
                key={work.slug}
                work={work}
                index={i}
                locale={locale}
                dict={dict}
                onHover={() => setHoveredSlug(work.slug)}
                onLeave={() => setHoveredSlug(null)}
                isActive={hoveredSlug === work.slug}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Count footer ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pv2-footer"
        >
          <div className="pv2-footer-line" />
          <span className="pv2-footer-count">
            {filtered.length} {filtered.length === 1 ? "projekt" : filtered.length < 5 ? "projekty" : "projektów"}
          </span>
          <div className="pv2-footer-line" />
        </motion.div>
      </div>

      {/* ── Floating cursor image (desktop only) ─────────── */}
      <FloatingImage
        src={hoveredWork?.img || "/images/placeholder.jpg"}
        alt={hoveredWork?.title || ""}
        isVisible={!!hoveredWork}
      />
    </section>
  );
};
