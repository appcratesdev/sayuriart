"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { getDictionary, localeLabels, locales, localizedHref, type Locale } from "@/lib/i18n";

export const Header = ({ title, locale = "pl" }: { title?: string; locale?: Locale }) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dict = getDictionary(locale);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    setHidden(latest > previous && latest > 150);
    setScrolled(latest > 20);
  });

  const navLinks = [
    { href: "/#services", label: dict.nav.services },
    { href: "/#portfolio", label: dict.nav.portfolio },
    { href: "/#pricing", label: dict.nav.pricing },
    { href: "/#process", label: dict.nav.process },
    { href: "/o-mnie", label: dict.nav.about },
  ];

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden && !mobileMenuOpen ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? "bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)] py-3"
          : "bg-transparent py-4 md:py-5"
      }`}
    >
      <div className="container-main flex justify-between items-center relative z-50">
        <Link
          href={localizedHref(locale, "/")}
          className="text-lg font-bold tracking-tight text-[var(--foreground)] relative z-50"
        >
          {title || "LIFESTYLE IMAGES"}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={localizedHref(locale, link.href)}
              className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-bold uppercase">
            {locales.map((candidate) => (
              <Link
                key={candidate}
                href={localizedHref(candidate, "/")}
                className={`px-2 py-1 transition-colors ${
                  candidate === locale
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--primary)]"
                }`}
                aria-current={candidate === locale ? "page" : undefined}
              >
                {localeLabels[candidate]}
              </Link>
            ))}
          </div>
          <Link href={localizedHref(locale, "/#contact")} className="btn btn-primary text-sm py-2.5 px-6">
            {dict.nav.cta}
          </Link>
        </div>

        <button
          className="md:hidden relative z-50 p-2 -mr-2 text-[var(--foreground)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? dict.nav.close : dict.nav.menu}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 12h16M4 6h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`md:hidden fixed top-0 left-0 w-full h-[100dvh] bg-[var(--background)] z-40 transition-transform duration-500 ease-[var(--ease-out-expo)] ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ paddingTop: "80px" }}
      >
        <nav className="flex flex-col items-center gap-8 pt-12 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={localizedHref(locale, link.href)}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={localizedHref(locale, "/#contact")}
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary w-full text-center mt-4 py-4 text-lg"
          >
            {dict.nav.cta}
          </Link>
          <div className="flex items-center gap-5 text-sm font-bold uppercase">
            {locales.map((candidate) => (
              <Link
                key={candidate}
                href={localizedHref(candidate, "/")}
                onClick={() => setMobileMenuOpen(false)}
                className={candidate === locale ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"}
              >
                {localeLabels[candidate]}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </motion.header>
  );
};
