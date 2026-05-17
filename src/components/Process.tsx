"use client";

import { motion } from "framer-motion";
import { getDictionary, type Locale } from "@/lib/i18n";
import { SectionHeader } from "./ui/SectionHeader";

const icons = {
  brief: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" />
    </svg>
  ),
  concept: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  ),
  creation: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /><path d="M19 3v4" /><path d="M21 5h-4" />
    </svg>
  ),
  files: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
};

const fallbackSteps: ProcessContent[] = [
  { number: "01", title: "Brief", desc: "Send product details, audience and visual expectations.", iconName: "brief" as const },
  { number: "02", title: "Concept", desc: "I prepare the scene, style and creative direction.", iconName: "concept" as const },
  { number: "03", title: "Creation", desc: "The visuals are created in line with your brand and platform standards.", iconName: "creation" as const },
  { number: "04", title: "Files", desc: "You receive final files ready for publication and sales.", iconName: "files" as const },
];

export interface ProcessContent {
  number: string;
  title: string;
  desc: string;
  iconName?: keyof typeof icons;
  numberEdit?: string;
  titleEdit?: string;
  descEdit?: string;
}

export const Process = ({ items, locale = "pl" }: { items?: ProcessContent[]; locale?: Locale }) => {
  const processSteps = items?.length ? items : fallbackSteps;
  const dict = getDictionary(locale);

  return (
    <section className="section-padding bg-[var(--dark-bg)]" id="process">
      <div className="container-main">
        <SectionHeader title={dict.home.processTitle} description={dict.home.processDescription} align="center" dark />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 mt-16 relative">
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-[1px] bg-white/20" />

          {processSteps.map((step, index) => (
            <motion.div
              key={`${step.number}-${step.title}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <div className="w-24 h-24 rounded-full bg-[var(--background)] border border-white/10 flex items-center justify-center mb-6 relative">
                <div className="text-[var(--primary)]">{icons[step.iconName || "brief"]}</div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[var(--gold)] text-white text-xs font-bold flex items-center justify-center" data-sanity={step.numberEdit}>
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-serif text-white mb-3" data-sanity={step.titleEdit}>{step.title}</h3>
              <p className="text-white/70 text-sm max-w-[240px]" data-sanity={step.descEdit}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
