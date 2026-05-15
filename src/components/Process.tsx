"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./ui/SectionHeader";

const steps = [
  {
    number: "01",
    title: "Brief",
    desc: "Przekazujesz informacje o produkcie, grupie docelowej i oczekiwaniach wizualnych.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Koncepcja",
    desc: "Przedstawiam propozycję sceny, stylu i kierunku wizualnego dopasowanego do Twojej marki.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
        <polyline points="7.5 19.79 7.5 14.6 3 12"/>
        <polyline points="21 12 16.5 14.6 16.5 19.79"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Kreacja",
    desc: "Tworzę grafiki zgodne z ustaleniami, Twoją identyfikacją i standardami platform.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/><path d="M21 5h-4"/>
      </svg>
    ),
  },
  {
    number: "04",
    title: "Finalne pliki",
    desc: "Otrzymujesz gotowe pliki w wybranych formatach, gotowe do publikacji i sprzedaży.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
  },
];

export interface ProcessContent {
  number: string;
  title: string;
  desc: string;
  iconName?: "brief" | "concept" | "creation" | "files";
}

const iconByName = {
  brief: steps[0].icon,
  concept: steps[1].icon,
  creation: steps[2].icon,
  files: steps[3].icon,
};

export const Process = ({ items }: { items?: ProcessContent[] }) => {
  const processSteps = items?.length
    ? items.map((item) => ({
        ...item,
        icon: iconByName[item.iconName || "brief"],
      }))
    : steps;

  return (
    <section className="section-padding bg-[var(--card)]" id="process">
      <div className="container-main">
        <SectionHeader
          title="Prosty, przewidywalny proces"
          description="Od briefu do gotowych plików — współpraca przejrzysta na każdym etapie."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 mt-16 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-[1px] bg-[var(--border)]" />

          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <div className="w-24 h-24 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center mb-6 relative">
                <div className="text-[var(--primary)]">{step.icon}</div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-serif text-[var(--foreground)] mb-3">{step.title}</h3>
              <p className="text-body text-sm max-w-[240px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
