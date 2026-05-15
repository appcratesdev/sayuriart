"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export interface FooterSettings {
  email?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  title?: string;
}

export const Footer = ({ settings }: { settings?: FooterSettings }) => {
  const email = settings?.email || "hello@lifestyleimages.pl";

  return (
    <footer className="bg-[var(--dark-bg)] text-white relative" id="contact">
      {/* Contact Section */}
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
              Rozpocznijmy<br />
              <span className="text-[var(--gold)] italic">współpracę.</span>
            </h2>
            <p className="text-white/50 text-base md:text-lg mb-10 max-w-md">
              Wypełnij formularz, a wrócę do Ciebie z propozycją w ciągu 24 godzin.
            </p>

            <div className="mt-auto flex flex-col gap-6">
              <div>
                <span className="form-label">EMAIL</span>
                <a href={`mailto:${email}`} className="text-xl font-medium hover:text-[var(--gold)] transition-colors block">
                  {email}
                </a>
              </div>
              <div>
                <span className="form-label">SOCIAL MEDIA</span>
                <div className="flex gap-6 mt-2">
                  <a href={settings?.instagram || "#"} className="text-white/60 hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </a>
                  <a href={settings?.linkedin || "#"} className="text-white/60 hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                  <a href={settings?.facebook || "#"} className="text-white/60 hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 7.058 4.156 7.058 6.15 0 3.656-2.631 5.619-7.545 5.817zM5.513 16.524c3.053 0 4.178-1.671 4.178-3.322 0-1.652-1.125-3.322-3.633-3.322H3.782v6.644h1.731z" /></svg>
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
            <form className="flex flex-col gap-7" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="form-label">Imię i nazwisko</label>
                <input type="text" id="name" className="form-input-dark" placeholder="Jak się nazywasz?" />
              </div>
              <div>
                <label htmlFor="email" className="form-label">Adres email</label>
                <input type="email" id="email" className="form-input-dark" placeholder="jan@firma.pl" />
              </div>
              <div>
                <label htmlFor="type" className="form-label">Czego dotyczy projekt?</label>
                <select id="type" className="form-input-dark appearance-none">
                  <option value="lifestyle" className="bg-[var(--dark-bg)]">Grafiki lifestyle</option>
                  <option value="packshots" className="bg-[var(--dark-bg)]">Packshoty na białym tle</option>
                  <option value="infographics" className="bg-[var(--dark-bg)]">Infografiki produktowe</option>
                  <option value="amazon" className="bg-[var(--dark-bg)]">A+ Content / Amazon</option>
                  <option value="package" className="bg-[var(--dark-bg)]">Pakiet grafik</option>
                  <option value="subscription" className="bg-[var(--dark-bg)]">Subskrypcja</option>
                  <option value="other" className="bg-[var(--dark-bg)]">Inne</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="form-label">Opis projektu (opcjonalnie)</label>
                <textarea id="message" rows={3} className="form-input-dark resize-none" placeholder="Link do sklepu, opis produktu..." />
              </div>
              <button type="submit" className="btn btn-white w-full py-4 mt-2 text-sm tracking-widest uppercase">
                Wyślij zapytanie
              </button>
            </form>
          </motion.div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-white/30 gap-4 text-center md:text-left">
          <span className="font-bold tracking-widest uppercase text-white/50">{settings?.title || "LIFESTYLE IMAGES"}</span>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">Polityka prywatności</Link>
            <Link href="#" className="hover:text-white transition-colors">Regulamin</Link>
          </div>
          <span>© 2026 Wszystkie prawa zastrzeżone.</span>
        </div>
      </div>
    </footer>
  );
};
