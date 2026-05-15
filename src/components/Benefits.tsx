"use client";

import { AnimatedSection } from "./AnimatedSection";

export const Benefits = () => {
  const benefits = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--foreground)]">
          <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.5-1 2-1.5L20 12V5z"/>
          <path d="M2 9v1c0 1.1.9 2 2 2h1"/>
          <path d="M16 11h.01"/>
        </svg>
      ),
      title: "Bez kosztów sesji zdjęciowej",
      desc: "Brak wynajmu studia, sprzętu i całego zespołu. Oszczędność czasu i budżetu."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--foreground)]">
          <path d="M6 3h12l4 6-10 13L2 9Z"/>
          <path d="M11 3 8 9l4 13 4-13-3-6"/>
          <path d="M2 9h20"/>
        </svg>
      ),
      title: "Spójny i estetyczny wizerunek marki",
      desc: "Zachowujesz spójny styl, kolory i klimat we wszystkich kanałach sprzedaży."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--foreground)]">
          <circle cx="8" cy="21" r="1"/>
          <circle cx="19" cy="21" r="1"/>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
        </svg>
      ),
      title: "Materiały gotowe do e-commerce i Amazon",
      desc: "Grafiki zoptymalizowane pod sklepy internetowe, listingi i kampanie."
    }
  ];

  return (
    <AnimatedSection className="py-16 md:py-24 px-6 md:px-12 bg-white border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[var(--foreground)]">Dlaczego marki wybierają takie rozwiązanie?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((b, i) => (
            <div key={i} className="bg-[var(--background)] p-8 md:p-10 flex flex-col md:flex-row items-start gap-5 md:gap-6 rounded-sm shadow-sm border border-[var(--border)]/50">
              <div className="shrink-0 pt-1">
                {b.icon}
              </div>
              <div>
                <h3 className="text-lg font-serif text-[var(--foreground)] mb-2 md:mb-3">{b.title}</h3>
                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};
