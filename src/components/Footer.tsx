"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getDictionary, type Locale } from "@/lib/i18n";

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
                    Instagram
                  </a>
                  <a href={settings?.linkedin || "#"} className="text-white/60 hover:text-white transition-colors" aria-label="LinkedIn">
                    LinkedIn
                  </a>
                  <a href={settings?.facebook || "#"} className="text-white/60 hover:text-white transition-colors" aria-label="Facebook">
                    Facebook
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
            <form className="flex flex-col gap-7" onSubmit={(event) => event.preventDefault()}>
              <div>
                <label htmlFor="name" className="form-label">{dict.footer.nameLabel}</label>
                <input type="text" id="name" className="form-input-dark" placeholder={dict.footer.namePlaceholder} />
              </div>
              <div>
                <label htmlFor="email" className="form-label">{dict.footer.emailLabel}</label>
                <input type="email" id="email" className="form-input-dark" placeholder={dict.footer.emailPlaceholder} />
              </div>
              <div>
                <label htmlFor="type" className="form-label">{dict.footer.typeLabel}</label>
                <select id="type" className="form-input-dark appearance-none">
                  {Object.entries(dict.footer.options).map(([value, label]) => (
                    <option key={value} value={value} className="bg-[var(--dark-bg)]">
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="form-label">{dict.footer.messageLabel}</label>
                <textarea id="message" rows={3} className="form-input-dark resize-none" placeholder={dict.footer.messagePlaceholder} />
              </div>
              <button type="submit" className="btn btn-white w-full py-4 mt-2 text-sm tracking-widest uppercase">
                {dict.footer.submit}
              </button>
            </form>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-white/30 gap-4 text-center md:text-left">
          <span className="font-bold tracking-widest uppercase text-white/50" data-sanity={settings?.titleEdit}>{settings?.title || "LIFESTYLE IMAGES"}</span>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">{dict.footer.privacy}</Link>
            <Link href="#" className="hover:text-white transition-colors">{dict.footer.terms}</Link>
          </div>
          <span>© 2026 {dict.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
};
