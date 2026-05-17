import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { defineLocations, presentationTool } from "sanity/presentation";
import { schemaTypes } from "./sanity/schemas";

const previewUrl = (
  process.env.SANITY_STUDIO_PREVIEW_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ||
  "https://lifestyleimages.pl"
).replace(/\/$/, "");

const projectLocations = defineLocations({
  select: {
    title: "title.pl",
    slugPl: "slug.pl.current",
    slugEn: "slug.en.current",
  },
  resolve: (doc) => ({
    locations: doc
      ? [
          doc.slugPl ? { title: doc.title || "Projekt", href: `/pl/projekt/${doc.slugPl}` } : null,
          doc.slugEn ? { title: doc.title || "Project", href: `/en/projekt/${doc.slugEn}` } : null,
        ].filter((location): location is { title: string; href: string } => Boolean(location))
      : [],
  }),
});

export default defineConfig({
  name: "default",
  title: "Sayuri Portfolio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "9u4sqgld",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/studio",

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: {
        initial: previewUrl,
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
      allowOrigins: [previewUrl, "http://localhost:*"],
      resolve: {
        locations: {
          siteSettings: defineLocations({
            locations: [
              { title: "Strona glowna PL", href: "/pl" },
              { title: "Home EN", href: "/en" },
            ],
          }),
          hero: defineLocations({
            locations: [
              { title: "Strona glowna PL", href: "/pl" },
              { title: "Home EN", href: "/en" },
            ],
          }),
          manifesto: defineLocations({
            locations: [
              { title: "Strona glowna PL", href: "/pl" },
              { title: "Home EN", href: "/en" },
            ],
          }),
          service: defineLocations({
            locations: [
              { title: "Uslugi PL", href: "/pl#services" },
              { title: "Services EN", href: "/en#services" },
            ],
          }),
          beforeAfter: defineLocations({
            locations: [
              { title: "Przed/Po PL", href: "/pl#before-after" },
              { title: "Before/After EN", href: "/en#before-after" },
            ],
          }),
          portfolio: defineLocations({
            locations: [
              { title: "Portfolio PL", href: "/pl#portfolio" },
              { title: "Portfolio EN", href: "/en#portfolio" },
            ],
          }),
          pricing: defineLocations({
            locations: [
              { title: "Cennik PL", href: "/pl#pricing" },
              { title: "Pricing EN", href: "/en#pricing" },
            ],
          }),
          testimonial: defineLocations({
            locations: [
              { title: "Opinie PL", href: "/pl" },
              { title: "Testimonials EN", href: "/en" },
            ],
          }),
          process: defineLocations({
            locations: [
              { title: "Proces PL", href: "/pl#process" },
              { title: "Process EN", href: "/en#process" },
            ],
          }),
          faq: defineLocations({
            locations: [
              { title: "FAQ PL", href: "/pl#faq" },
              { title: "FAQ EN", href: "/en#faq" },
            ],
          }),
          about: defineLocations({
            locations: [
              { title: "O mnie PL", href: "/pl/o-mnie" },
              { title: "About EN", href: "/en/o-mnie" },
            ],
          }),
          project: projectLocations,
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
