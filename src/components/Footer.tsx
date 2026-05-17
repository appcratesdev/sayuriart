"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getDictionary, type Locale } from "@/lib/i18n";
import { ContactForm } from "./ContactForm";

export interface FooterSettings {
  email?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  title?: string;
  titleEdit?: string;
  emailEdit?: string;
}

export const Footer = ({ settings, locale = "pl" }: { settings?: FooterSettings; locale?: Locale }) => {
  const email = settings?.email || "hello@lifestyleimages.pl";
  const dict = getDictionary(locale);

  return (
    <footer className="bg-[var(--dark-bg)] text-white relative" id="contact">
      <div className="container-main py-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.1] mb-6 md:mb-8">
              {dict.footer.headingStart}
              <br />
              <span className="text-[var(--gold)] italic">{dict.footer.headingAccent}</span>
            </h2>
            <p className="text-white/50 text-base md:text-lg mb-10 max-w-md">{dict.footer.description}</p>

            <div className="mt-auto flex flex-col gap-6">
              <div>
                <span className="form-label">{dict.footer.email}</span>
                <a href={`mailto:${email}`} className="text-xl font-medium hover:text-[var(--gold)] transition-colors block" data-sanity={settings?.emailEdit}>
                  {email}
                </a>
              </div>
              <div>
                <span className="form-label">{dict.footer.social}</span>
                <div className="flex gap-6 mt-2">
                  <a href={settings?.instagram || "#"} className="text-white/60 hover:text-white transition-colors" aria-label="Instagram">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  <a href={settings?.linkedin || "#"} className="text-white/60 hover:text-white transition-colors" aria-label="LinkedIn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a href={settings?.facebook || "#"} className="text-white/60 hover:text-white transition-colors" aria-label="Facebook">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="card-glass p-6 sm:p-8 md:p-12"
          >
            <ContactForm dict={dict.footer} />
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-white/30 gap-4 text-center md:text-left">
          <span className="font-bold tracking-widest uppercase text-white/50" data-sanity={settings?.titleEdit}>{settings?.title || "LIFESTYLE IMAGES"}</span>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <Link href={`/${locale}/${locale === "en" ? "privacy-policy" : "polityka-prywatnosci"}`} className="hover:text-white transition-colors">{dict.footer.privacy}</Link>
            <Link href={`/${locale}/${locale === "en" ? "terms-of-use" : "regulamin"}`} className="hover:text-white transition-colors">{dict.footer.terms}</Link>
            <span className="opacity-50 hidden md:inline">|</span>
            <a href="https://appcrates.pl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Developed by Appcrates.pl
            </a>
          </div>
          <span>© 2026 {dict.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
};
