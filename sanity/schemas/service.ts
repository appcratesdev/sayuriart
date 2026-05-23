import { defineField, defineType } from "sanity";
import { imageGuides } from "./imageGuidance";


export default defineType({
  name: "service",
  title: "Uslugi",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytul",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug URL",
      type: "localizedSlug",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", title: "Opis", type: "localizedText" }),
    defineField({ name: "features", title: "Cechy", type: "localizedStringArray" }),
    defineField({
      name: "image",
      title: "Zdjecie",
      type: "galleryBlock",
      description: imageGuides.service.description,
    }),
    defineField({ name: "pageOverline", title: "Strona uslugi - overline", type: "localizedString" }),
    defineField({ name: "backLinkText", title: "Strona uslugi - link powrotu", type: "localizedString" }),
    defineField({
      name: "pageTitle",
      title: "Strona uslugi - H1",
      type: "localizedString",
      description: "Gdy puste, uzywany jest tytul uslugi.",
    }),
    defineField({
      name: "pageLead",
      title: "Strona uslugi - lead",
      type: "localizedText",
      description: "Krotki tekst pod H1, mocny SEO opis uslugi.",
    }),
    defineField({ name: "heroCtaText", title: "Hero - tekst CTA", type: "localizedString" }),
    defineField({ name: "heroCtaLink", title: "Hero - link CTA", type: "string", initialValue: "#contact" }),
    defineField({ name: "problemsTitle", title: "Sekcja problemow - tytul", type: "localizedString" }),
    defineField({ name: "problemsIntro", title: "Sekcja problemow - opis", type: "localizedText" }),
    defineField({
      name: "problems",
      title: "Problemy rozwiazywane przez usluge",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Tytul", type: "localizedString", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "Opis", type: "localizedText" }),
          ],
          preview: { select: { title: "title.pl", subtitle: "description.pl" } },
        },
      ],
    }),
    defineField({ name: "benefitsTitle", title: "Sekcja korzysci - tytul", type: "localizedString" }),
    defineField({ name: "benefitsIntro", title: "Sekcja korzysci - opis", type: "localizedText" }),
    defineField({
      name: "benefits",
      title: "Korzyści",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Tytul", type: "localizedString", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "Opis", type: "localizedText" }),
          ],
          preview: { select: { title: "title.pl", subtitle: "description.pl" } },
        },
      ],
    }),
    defineField({ name: "detailsTitle", title: "Sekcja opisu SEO - tytul", type: "localizedString" }),
    defineField({ name: "detailsBody", title: "Sekcja opisu SEO - tresc", type: "localizedBlocks" }),
    defineField({ name: "faqTitle", title: "FAQ uslugi - tytul", type: "localizedString" }),
    defineField({
      name: "faqItems",
      title: "FAQ uslugi",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "question", title: "Pytanie", type: "localizedString", validation: (Rule) => Rule.required() }),
            defineField({ name: "answer", title: "Odpowiedz", type: "localizedText", validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "question.pl", subtitle: "answer.pl" } },
        },
      ],
    }),
    defineField({ name: "relatedProjectsTitle", title: "Powiazane projekty - tytul", type: "localizedString" }),
    defineField({ name: "relatedProjectsIntro", title: "Powiazane projekty - opis", type: "localizedText" }),
    defineField({
      name: "relatedProjects",
      title: "Powiazane projekty",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      description: "Gdy puste, strona pokaze istniejace projekty jako fallback.",
    }),
    defineField({ name: "relatedProjectsCtaText", title: "Powiazane projekty - tekst linku", type: "localizedString" }),
    defineField({ name: "otherServicesTitle", title: "Pozostale uslugi - tytul", type: "localizedString" }),
    defineField({ name: "otherServicesIntro", title: "Pozostale uslugi - opis", type: "localizedText" }),
    defineField({ name: "otherServicesCtaText", title: "Pozostale uslugi - tekst linku", type: "localizedString" }),
    defineField({ name: "finalCtaTitle", title: "Final CTA - tytul", type: "localizedString" }),
    defineField({ name: "finalCtaDescription", title: "Final CTA - opis", type: "localizedText" }),
    defineField({ name: "finalCtaPrimaryText", title: "Final CTA - glowny przycisk", type: "localizedString" }),
    defineField({ name: "finalCtaPrimaryLink", title: "Final CTA - glowny link", type: "string", initialValue: "#contact" }),
    defineField({ name: "finalCtaSecondaryText", title: "Final CTA - drugi przycisk", type: "localizedString" }),
    defineField({ name: "finalCtaSecondaryLink", title: "Final CTA - drugi link", type: "string", initialValue: "/#portfolio" }),
    defineField({
      name: "order",
      title: "Kolejnosc",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
  orderings: [{ title: "Kolejnosc", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title.pl", subtitle: "title.en", media: "image" },
  },
});
