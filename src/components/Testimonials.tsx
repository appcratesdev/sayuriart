"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./ui/SectionHeader";
import { getDictionary, type Locale } from "@/lib/i18n";

const testimonials: TestimonialContent[] = [
  {
    quote: "Grafiki, które otrzymaliśmy, całkowicie odmieniły naszą konwersję. Klienci spędzają o 40% więcej czasu na stronach produktowych.",
    author: "Karolina Nowak",
    role: "CMO, Natural Cosmetics",
    initials: "KN",
  },
  {
    quote: "To nie są zwykłe packshoty. To dzieła sztuki, które pozycjonują naszą markę w segmencie premium bez słów.",
    author: "Michał Wiśniewski",
    role: "Founder, Minimalist Home",
    initials: "MW",
  },
  {
    quote: "Współpraca była perfekcyjna. Otrzymaliśmy materiały na Amazon, które natychmiast wybiły nasze listingi na pierwszą stronę wyników.",
    author: "Anna Kowalska",
    role: "E-commerce Director",
    initials: "AK",
  },
];

export interface TestimonialContent {
  quote: string;
  author: string;
  role?: string;
  initials?: string;
  quoteEdit?: string;
  authorEdit?: string;
  roleEdit?: string;
}

const initialsFromName = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

interface TestimonialsProps {
  items?: TestimonialContent[];
  locale?: Locale;
  sectionTitle?: string;
  sectionDescription?: string;
  sectionTitleEdit?: string;
  sectionDescriptionEdit?: string;
}

export const Testimonials = ({
  items,
  locale = "pl",
  sectionTitle,
  sectionDescription,
  sectionTitleEdit,
  sectionDescriptionEdit,
}: TestimonialsProps) => {
  const testimonialItems = items?.length ? items : testimonials;
  const [currentIndex, setCurrentIndex] = useState(0);
  const dict = getDictionary(locale);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonialItems.length]);

  const current = testimonialItems[currentIndex] ?? testimonialItems[0];

  return (
    <section className="section-padding bg-[var(--background)]">
      <div className="container-main">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          {/* Left */}
          <div className="w-full md:w-1/3 md:sticky md:top-32">
            <SectionHeader
              title={sectionTitle || dict.home.testimonialsTitle}
              description={sectionDescription || dict.home.testimonialsDescription}
              titleEdit={sectionTitleEdit}
              descriptionEdit={sectionDescriptionEdit}
            />

            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentIndex((prev) => (prev === 0 ? testimonialItems.length - 1 : prev - 1))}
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-colors"
                aria-label="Previous testimonial"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonialItems.length)}
                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-colors"
                aria-label="Next testimonial"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>

              {/* Progress dots */}
              <div className="flex gap-2 ml-2">
                {testimonialItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? "w-8 bg-[var(--primary)]" : "w-3 bg-[var(--border)]"
                      }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right — Quote */}
          <div className="w-full md:w-2/3 relative h-[450px] md:h-[350px] lg:h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-center absolute inset-0"
              >
                {/* Quote mark */}
                <svg className="w-12 h-12 text-[var(--border)] mb-6" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>

                <p className="text-2xl sm:text-3xl md:text-4xl font-serif leading-[1.35] text-[var(--foreground)] mb-8" data-sanity={current.quoteEdit}>
                  &ldquo;{current.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white text-sm font-bold">
                    {current.initials || initialsFromName(current.author)}
                  </div>
                  <div>
                    <div className="font-medium text-[var(--foreground)]" data-sanity={current.authorEdit}>{current.author}</div>
                    {current.role && <div className="text-sm text-[var(--muted-foreground)]" data-sanity={current.roleEdit}>{current.role}</div>}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
