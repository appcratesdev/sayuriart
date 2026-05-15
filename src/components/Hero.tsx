"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export interface HeroContent {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
}

const fallbackHero: Required<HeroContent> = {
  title: "Zamieniamy Twoje produkty w obiekty pozadania.",
  subtitle:
    "Grafiki lifestyle, packshoty i infografiki, ktore podnosza prestiz marki i maksymalizuja sprzedaz - bez organizowania drogich sesji.",
  ctaText: "Rozpocznij transformacje",
  ctaLink: "#contact",
  image: "/images/placeholder.jpg",
};

export const Hero = ({ content }: { content?: HeroContent }) => {
  const hero = { ...fallbackHero, ...content };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[var(--background)]">
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-0 top-0 w-full md:w-[60%] h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/70 to-[var(--background)]/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent z-10" />
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <div className="container-main w-full relative z-20">
        <div className="max-w-3xl py-12 md:py-0">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="heading-display text-[var(--foreground)] mb-8"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-body-lg mb-10 max-w-xl"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center"
          >
            <Link href={hero.ctaLink} className="btn btn-primary btn-primary-lg">
              {hero.ctaText}
            </Link>
            <Link href="#portfolio" className="btn btn-ghost group">
              Zobacz prace
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">-&gt;</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
