"use client";

import { motion } from "framer-motion";

const fallbackText =
  "Przecietne zdjecia kosztuja Cie wiecej, niz myslisz. Tracisz zaufanie i konwersje. My zamieniamy Twoje produkty w obiekty pozadania - bez koniecznosci organizacji drogich sesji.";

export const Manifesto = ({ text, textEdit }: { text?: string; textEdit?: string }) => {
  const words = (text || fallbackText).split(" ");

  return (
    <section className="bg-[var(--dark-bg)] relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[var(--primary)] blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[var(--gold)] blur-[180px] opacity-20" />
      </div>

      <div className="container-main section-padding relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-[1.35] md:leading-[1.3] flex flex-wrap justify-center gap-x-[0.22em] gap-y-[0.1em]"
            data-sanity={textEdit}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.04, delayChildren: 0.1 },
              },
            }}
          >
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                className={`inline-block ${["pozadania", "konwersje.", "zaufanie"].includes(word)
                    ? "text-[var(--gold)]"
                    : ""
                  }`}
                variants={{
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { type: "spring", damping: 20, stiffness: 100 },
                  },
                  hidden: {
                    opacity: 0,
                    y: 20,
                    filter: "blur(4px)",
                    transition: { type: "spring", damping: 20, stiffness: 100 },
                  },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>
      </div>
    </section>
  );
};
