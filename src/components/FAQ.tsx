"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./ui/SectionHeader";

const faqs = [
  {
    question: "Ile trwa realizacja projektu?",
    answer: "Standardowy projekt zamykamy w 2–5 dni roboczych od akceptacji briefu. Dla bardziej rozbudowanych kampanii czas może ulec wydłużeniu, o czym zawsze informuję na początku współpracy."
  },
  {
    question: "Czy muszę wysyłać fizyczne produkty?",
    answer: "Nie zawsze. Do grafik lifestyle AI wystarczą mi zdjęcia produktu z telefonu, rysunki techniczne lub istniejące packshoty. W przypadku tradycyjnych zdjęć na białym tle — zależy od specyfiki produktu."
  },
  {
    question: "Co jeśli nie mam wizji na grafiki?",
    answer: "Nie musisz jej mieć. Elementem mojej usługi jest opracowanie koncepcji kreatywnej. Na podstawie analizy Twojej marki i konkurencji zaproponuję najlepszy kierunek wizualny."
  },
  {
    question: "W jakich formatach otrzymam pliki?",
    answer: "Dostarczam pliki w dowolnym formacie: 1:1, 4:5, 4:3, 16:9, 9:16, poziomy lub pionowy. Format ustalamy na etapie briefu. Pliki są gotowe do natychmiastowej publikacji."
  },
  {
    question: "Czy mogę zamówić pojedynczą grafikę?",
    answer: "Tak, ale najbardziej opłacalne są pakiety. Cena pojedynczej grafiki lifestyle to 120 zł, packshotu na białym tle — 149 zł, a infografiki produktowej — 149 zł."
  },
  {
    question: "Ile kosztuje runda poprawek?",
    answer: "Każdy pakiet zawiera 1 rundę poprawek w cenie. Dodatkowe rundy poprawek wyceniam indywidualnie — zazwyczaj to 20–30% wartości grafiki."
  }
];

export interface FAQContent {
  question: string;
  answer: string;
}

export const FAQ = ({ items }: { items?: FAQContent[] }) => {
  const faqItems = items?.length ? items : faqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-[var(--background)]" id="faq">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left side */}
          <div>
            <SectionHeader
              title="Często zadawane pytania"
              description="Zanim napiszesz, sprawdź odpowiedzi na najczęstsze pytania."
            />
            <div className="mt-8 p-6 md:p-8 bg-[var(--secondary)] rounded-[var(--radius-xl)]">
              <h4 className="font-serif text-lg text-[var(--foreground)] mb-3">Nie znalazłeś odpowiedzi?</h4>
              <p className="text-body text-sm mb-5">Napisz do mnie — odpowiem w ciągu 24 godzin.</p>
              <a href="#contact" className="btn btn-primary text-sm">
                Zadaj pytanie →
              </a>
            </div>
          </div>

          {/* Right side — Accordion */}
          <div className="flex flex-col border-t border-[var(--border)]">
            {faqItems.map((faq, i) => (
              <div key={i} className="border-b border-[var(--border)]">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex justify-between items-center py-5 text-left focus:outline-none group"
                >
                  <span className="text-base font-medium text-[var(--foreground)] pr-4 group-hover:text-[var(--primary)] transition-colors">
                    {faq.question}
                  </span>
                  <span className={`ml-4 shrink-0 w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'bg-[var(--primary)] border-[var(--primary)] text-white rotate-45' : 'text-[var(--foreground)]'}`}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M7 1v12M1 7h12"/>
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-body text-sm max-w-lg">
                        {faq.answer}
                      </p>
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
