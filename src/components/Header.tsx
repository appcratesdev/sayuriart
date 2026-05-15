"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export const Header = ({ title }: { title?: string }) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 20);
  });

  const navLinks = [
    { href: "/#services", label: "Usługi" },
    { href: "/#portfolio", label: "Portfolio" },
    { href: "/#pricing", label: "Cennik" },
    { href: "/#process", label: "Proces" },
    { href: "/o-mnie", label: "O mnie" },
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
        <Link href="/" className="text-lg font-bold tracking-tight text-[var(--foreground)] relative z-50">
          {title || "LIFESTYLE IMAGES"}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/#contact" className="hidden md:inline-flex btn btn-primary text-sm py-2.5 px-6">
          Rozpocznij projekt
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-50 p-2 -mr-2 text-[var(--foreground)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
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

      {/* Mobile Menu Overlay */}
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
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-serif text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary w-full text-center mt-4 py-4 text-lg"
          >
            Rozpocznij projekt
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};
