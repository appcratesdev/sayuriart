"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "./AnimatedSection";

export const CTABanner = () => {
  return (
    <AnimatedSection className="py-16 md:py-24 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="bg-[#FAF8F2] flex flex-col md:flex-row items-stretch rounded-2xl md:rounded-xl overflow-hidden shadow-sm border border-[var(--border)]/50">
        
        {/* Lewa strona - zdjęcie */}
        <div className="relative w-full md:w-1/3 min-h-[250px] md:min-h-full">
          <Image 
            src="/images/placeholder.jpg" 
            alt="Kontakt" 
            fill 
            className="object-cover" 
          />
        </div>

        {/* Prawa strona - treść */}
        <div className="p-8 sm:p-10 md:p-12 flex-1 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 md:gap-8 text-center md:text-left">
          <div className="max-w-md">
            <h3 className="font-serif text-2xl md:text-3xl text-[var(--foreground)] mb-4 md:mb-3 leading-tight">
              Chcesz pokazać produkt profesjonalnie bez organizowania sesji?
            </h3>
            <p className="text-[var(--muted-foreground)] text-base md:text-base">
              Napisz do mnie, a przygotuję grafiki, które sprzedają.
            </p>
          </div>
          
          <Link href="#contact" className="w-full md:w-auto mt-2 md:mt-0 px-8 py-4 md:py-3 bg-[var(--primary)] text-white font-medium rounded-full md:rounded-md hover:bg-[var(--accent)] transition-colors shrink-0">
            Skontaktuj się
          </Link>
        </div>

      </div>
    </AnimatedSection>
  );
};
