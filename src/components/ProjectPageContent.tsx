"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectData {
  title: string;
  category: string;
  client: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  images: string[];
}

export const ProjectPageContent = ({ project }: { project: ProjectData }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const galleryImages = project.images.slice(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev! + 1) % galleryImages.length);
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [lightboxIndex, galleryImages.length]);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-[var(--background)]">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors mb-8"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Wróć do portfolio
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="badge badge-outline mb-4">{project.category}</span>
                <h1 className="heading-display text-[var(--foreground)]">{project.title}</h1>
              </div>
              <div className="flex gap-8 text-sm text-[var(--muted-foreground)]">
                <div>
                  <span className="block font-medium text-[var(--foreground)]">Klient</span>
                  {project.client}
                </div>
                <div>
                  <span className="block font-medium text-[var(--foreground)]">Rok</span>
                  {project.year}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="img-wrapper aspect-[21/9] w-full"
          >
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 md:py-24 bg-[var(--background)]">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-body-lg">{project.description}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div>
                <h3 className="heading-card text-[var(--foreground)] mb-3">Wyzwanie</h3>
                <p className="text-body">{project.challenge}</p>
              </div>
              <div>
                <h3 className="heading-card text-[var(--foreground)] mb-3">Rozwiązanie</h3>
                <p className="text-body">{project.solution}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-8 md:py-12 bg-[var(--background)]">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`img-wrapper group cursor-pointer overflow-hidden ${
                  i === 0 ? "aspect-[4/5] md:row-span-2" : "aspect-square"
                }`}
                onClick={() => setLightboxIndex(i)}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 duration-500" />
                <Image
                  src={img}
                  alt={`${project.title} — grafika ${i + 2}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 md:py-24 bg-[var(--card)] border-y border-[var(--border)]">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="heading-section text-[var(--foreground)] mb-10">Rezultaty</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {project.results.map((result, i) => (
                <div key={i} className="card-flat p-6">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-bold mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-[var(--foreground)] font-medium leading-snug">{result}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-[var(--background)]">
        <div className="container-main text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="heading-section text-[var(--foreground)] mb-4">
              Chcesz podobne efekty?
            </h2>
            <p className="text-body-lg mb-8 max-w-lg mx-auto">
              Napisz do mnie — przygotuję grafiki, które wyróżnią Twój produkt.
            </p>
            <Link href="/#contact" className="btn btn-primary btn-primary-lg">
              Rozpocznij projekt
            </Link>
          </motion.div>
        </div>
      </section>
    {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
            >
              <X size={32} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev! - 1 + galleryImages.length) % galleryImages.length);
              }}
              className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-50 p-2"
            >
              <ChevronLeft size={48} />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev! + 1) % galleryImages.length);
              }}
              className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-50 p-2"
            >
              <ChevronRight size={48} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full max-w-5xl max-h-[85vh] m-4 md:m-12 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightboxIndex]}
                alt={`${project.title} — powiększenie`}
                fill
                className="object-contain"
                quality={100}
                priority
              />
            </motion.div>
            
            <div className="absolute bottom-6 left-0 right-0 text-center text-white/50 text-sm">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
