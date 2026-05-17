"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getDictionary, type Locale } from "@/lib/i18n";
import { SectionHeader } from "./ui/SectionHeader";

export interface FAQContent {
  question: string;
  answer: string;
  questionEdit?: string;
  answerEdit?: string;
}

const fallbackFaqs: FAQContent[] = [
  {
    question: "How long does a project take?",
    answer: "Most projects are completed in 2-5 business days after the brief is approved.",
  },
  {
    question: "Do I need to send physical products?",
    answer: "Not always. For AI lifestyle visuals, existing product photos or packshots are often enough.",
  },
];

export const FAQ = ({ items, locale = "pl" }: { items?: FAQContent[]; locale?: Locale }) => {
  const faqItems = items?.length ? items : fallbackFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const dict = getDictionary(locale);

  return (
    <section className="section-padding bg-[var(--background)]" id="faq">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <SectionHeader title={dict.home.faqTitle} description={dict.home.faqDescription} />
            <div className="mt-8 p-6 md:p-8 bg-[var(--secondary)] rounded-[var(--radius-xl)]">
              <h4 className="font-serif text-lg text-[var(--foreground)] mb-3">{dict.home.pricingCustomQuestion}</h4>
              <p className="text-body text-sm mb-5">{dict.footer.description}</p>
              <a href="#contact" className="btn btn-primary text-sm">
                {dict.home.faqCta} -&gt;
              </a>
            </div>
          </div>

          <div className="flex flex-col border-t border-[var(--border)]">
            {faqItems.map((faq, index) => (
              <div key={faq.question} className="border-b border-[var(--border)]">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center py-5 text-left focus:outline-none group"
                >
                  <span className="text-base font-medium text-[var(--foreground)] pr-4 group-hover:text-[var(--primary)] transition-colors" data-sanity={faq.questionEdit}>
                    {faq.question}
                  </span>
                  <span
                    className={`ml-4 shrink-0 w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center transition-all duration-300 ${
                      openIndex === index ? "bg-[var(--primary)] border-[var(--primary)] text-white rotate-45" : "text-[var(--foreground)]"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M7 1v12M1 7h12" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-body text-sm max-w-lg" data-sanity={faq.answerEdit}>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
