"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  overline?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export const SectionHeader = ({ overline, title, description, align = "left", dark = false }: SectionHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className={align === "center" ? "text-center" : ""}
  >
    {overline && (
      <span className={`overline block mb-4 ${dark ? "text-[var(--gold)]" : ""}`}>
        {overline}
      </span>
    )}
    <h2 className={`heading-section ${dark ? "text-white" : "text-[var(--foreground)]"}`}>
      {title}
    </h2>
    {description && (
      <p className={`text-body-lg mt-4 max-w-xl ${align === "center" ? "mx-auto" : ""} ${dark ? "text-white/60" : ""}`}>
        {description}
      </p>
    )}
  </motion.div>
);
