import { defineField, defineType } from "sanity";
import { imageGuides, imageWarning } from "./imageGuidance";

const localizedCardFields = [
  defineField({ name: "title", title: "Tytul", type: "localizedString", validation: (Rule) => Rule.required() }),
  defineField({ name: "description", title: "Opis", type: "localizedText" }),
];

export default defineType({
  name: "servicePage",
  title: "Strony uslug",
  type: "document",
  fields: [
    defineField({
      name: "service",
      title: "Powiazana usluga z sekcji homepage",
      type: "reference",
      to: [{ type: "service" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug URL strony uslugi",
      type: "object",
      fields: [
        defineField({
          name: "pl",
          title: "Polski",
          type: "slug",
          options: { source: "pageTitle.pl", maxLength: 96 },
        }),
        defineField({
          name: "en",
          title: "English",
          type: "slug",
          options: { source: "pageTitle.en", maxLength: 96 },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "pageOverline", title: "Hero - overline", type: "localizedString" }),
    defineField({ name: "backLinkText", title: "Hero - link powrotu", type: "localizedString" }),
    defineField({ name: "pageTitle", title: "Hero - H1", type: "localizedString", validation: (Rule) => Rule.required() }),
    defineField({ name: "pageLead", title: "Hero - lead SEO", type: "localizedText", validation: (Rule) => Rule.required() }),
    defineField({
      name: "heroImage",
      title: "Hero - obraz",
      type: "image",
      description: imageGuides.service.description,
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "localizedString" })],
      validation: imageWarning(imageGuides.service),
    }),
    defineField({ name: "heroCtaText", title: "Hero - tekst CTA", type: "localizedString" }),
    defineField({ name: "heroCtaLink", title: "Hero - link CTA", type: "string", initialValue: "#contact" }),
    defineField({ name: "problemsTitle", title: "Problemy - tytul", type: "localizedString" }),
    defineField({ name: "problemsIntro", title: "Problemy - opis", type: "localizedText" }),
    defineField({
      name: "problems",
      title: "Problemy rozwiazywane przez usluge",
      type: "array",
      of: [{ type: "object", fields: localizedCardFields, preview: { select: { title: "title.pl", subtitle: "description.pl" } } }],
    }),
    defineField({ name: "benefitsTitle", title: "Korzysci - tytul", type: "localizedString" }),
    defineField({ name: "benefitsIntro", title: "Korzysci - opis", type: "localizedText" }),
    defineField({
      name: "benefits",
      title: "Korzysci",
      type: "array",
      of: [{ type: "object", fields: localizedCardFields, preview: { select: { title: "title.pl", subtitle: "description.pl" } } }],
    }),
    defineField({ name: "detailsTitle", title: "Opis SEO - tytul", type: "localizedString" }),
    defineField({ name: "detailsBody", title: "Opis SEO - tresc", type: "localizedBlocks" }),
    defineField({ name: "faqTitle", title: "FAQ - tytul", type: "localizedString" }),
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
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
  preview: {
    select: { title: "pageTitle.pl", subtitle: "service.title.pl", media: "heroImage" },
  },
});
