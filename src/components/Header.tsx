"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { getDictionary, localizedHref, switchLocalePath, type Locale } from "@/lib/i18n";
import { usePathname } from "next/navigation";

export interface HeaderContent {
  servicesLabel?: string;
  portfolioLabel?: string;
  pricingLabel?: string;
  processLabel?: string;
  aboutLabel?: string;
  ctaLabel?: string;
  menuLabel?: string;
  closeLabel?: string;
  polishLocaleLabel?: string;
  englishLocaleLabel?: string;
  servicesLabelEdit?: string;
  portfolioLabelEdit?: string;
  pricingLabelEdit?: string;
  processLabelEdit?: string;
  aboutLabelEdit?: string;
  ctaLabelEdit?: string;
  menuLabelEdit?: string;
  closeLabelEdit?: string;
  polishLocaleLabelEdit?: string;
  englishLocaleLabelEdit?: string;
}

export const Header = ({ title, titleEdit, content, locale = "pl" }: { title?: string; titleEdit?: string; content?: HeaderContent; locale?: Locale }) => {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const dict = getDictionary(locale);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setHidden(false); // Zmieniono na prośbę klienta - pasek zawsze widoczny
    setScrolled(latest > 20);
  });

  useEffect(() => {
    const checkBg = () => {
      const sections = document.querySelectorAll('section, .bg-dark');
      let isDark = false;
      const headerMid = 40; // Środek paska nawigacyjnego do sprawdzania koloru sekcji

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerMid && rect.bottom >= headerMid) {
          const style = window.getComputedStyle(section);
          const bg = style.backgroundColor;
          if (
            section.classList.contains('bg-dark') ||
            bg === 'rgb(32, 70, 54)' || // var(--dark-bg)
            bg === 'rgb(23, 36, 25)' || // old process bg
            bg === 'rgb(16, 34, 26)'    // var(--dark-bg-light)
          ) {
            isDark = true;
          }
        }
      });
      setIsDarkBg(isDark);
    };

    window.addEventListener('scroll', checkBg, { passive: true });
    checkBg();
    return () => window.removeEventListener('scroll', checkBg);
  }, []);

  const navLinks = [
    { href: "/#services", label: content?.servicesLabel || dict.nav.services, edit: content?.servicesLabelEdit },
    { href: "/#portfolio", label: content?.portfolioLabel || dict.nav.portfolio, edit: content?.portfolioLabelEdit },
    { href: "/#pricing", label: content?.pricingLabel || dict.nav.pricing, edit: content?.pricingLabelEdit },
    { href: "/#process", label: content?.processLabel || dict.nav.process, edit: content?.processLabelEdit },
    { href: "/o-mnie", label: content?.aboutLabel || dict.nav.about, edit: content?.aboutLabelEdit },
  ];
  const ctaLabel = content?.ctaLabel || dict.nav.cta;
  const menuLabel = content?.menuLabel || dict.nav.menu;
  const closeLabel = content?.closeLabel || dict.nav.close;
  const polishLocaleLabel = content?.polishLocaleLabel || "PL";
  const englishLocaleLabel = content?.englishLocaleLabel || "EN";

  const isDarkTheme = isDarkBg && !mobileMenuOpen;

  const headerBgClass = isDarkTheme
    ? (scrolled ? "bg-[var(--dark-bg)]/95 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-4 md:py-5")
    : (scrolled || mobileMenuOpen
      ? "bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)] py-3"
      : "bg-[var(--background)] py-4 md:py-5");

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden && !mobileMenuOpen ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBgClass}`}
    >
      <div className="container-main flex justify-between items-center relative z-50">
        <Link
          href={localizedHref(locale, "/")}
          className={`text-lg font-bold tracking-tight relative z-50 transition-colors ${isDarkTheme ? "text-white" : "text-[var(--foreground)]"
            }`}
          data-sanity={titleEdit}
        >
          {title || "LIFESTYLE IMAGES"}
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={localizedHref(locale, link.href)}
              className={`text-sm font-medium transition-colors ${isDarkTheme ? "text-white/90 hover:text-white" : "text-[var(--foreground)] hover:text-[var(--primary)]"
                }`}
              data-sanity={link.edit}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-bold uppercase">
            <Link
              href={switchLocalePath(pathname, locale === 'pl' ? 'en' : 'pl')}
              className={`px-2 py-1 transition-colors flex gap-1 ${isDarkTheme ? "text-white/60 hover:text-white" : "text-[var(--muted-foreground)] hover:text-[var(--primary)]"
                }`}
            >
              <span
                className={locale === 'pl' ? (isDarkTheme ? "text-white" : "text-[var(--foreground)]") : ""}
                data-sanity={content?.polishLocaleLabelEdit}
              >
                {polishLocaleLabel}
              </span>
              <span>/</span>
              <span
                className={locale === 'en' ? (isDarkTheme ? "text-white" : "text-[var(--foreground)]") : ""}
                data-sanity={content?.englishLocaleLabelEdit}
              >
                {englishLocaleLabel}
              </span>
            </Link>
          </div>
          <Link href={localizedHref(locale, "/#contact")} className={`btn text-sm py-2.5 px-6 ${isDarkTheme ? "btn-white" : "btn-primary"}`} data-sanity={content?.ctaLabelEdit}>
            {ctaLabel}
          </Link>
        </div>

        <button
          className={`md:hidden relative z-50 p-2 -mr-2 transition-colors ${isDarkTheme ? "text-white" : "text-[var(--foreground)]"
            }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? closeLabel : menuLabel}
          data-sanity={mobileMenuOpen ? content?.closeLabelEdit : content?.menuLabelEdit}
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
        className={`md:hidden fixed top-0 left-0 w-full h-[100dvh] bg-[var(--background)] z-40 transition-transform duration-500 ease-[var(--ease-out-expo)] ${mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
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
              data-sanity={link.edit}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={localizedHref(locale, "/#contact")}
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary w-full text-center mt-4 py-4 text-lg"
            data-sanity={content?.ctaLabelEdit}
          >
            {ctaLabel}
          </Link>
          <div className="flex items-center gap-2 text-sm font-bold uppercase">
            <Link
              href={switchLocalePath(pathname, locale === 'pl' ? 'en' : 'pl')}
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1 transition-colors flex gap-2 text-[var(--muted-foreground)] hover:text-[var(--primary)]"
            >
              <span className={locale === 'pl' ? "text-[var(--foreground)]" : ""} data-sanity={content?.polishLocaleLabelEdit}>
                {polishLocaleLabel}
              </span>
              <span>/</span>
              <span className={locale === 'en' ? "text-[var(--foreground)]" : ""} data-sanity={content?.englishLocaleLabelEdit}>
                {englishLocaleLabel}
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};
