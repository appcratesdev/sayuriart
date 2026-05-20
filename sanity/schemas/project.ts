import { defineField, defineType } from "sanity";
import { imageGuides } from "./imageGuidance";

export default defineType({
  name: "project",
  title: "Projekty",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytul projektu",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug URL",
      type: "localizedSlug",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Kategoria",
      type: "string",
      options: {
        list: [
          { title: "Lifestyle", value: "lifestyle" },
          { title: "Produktowy", value: "product" },
          { title: "Amazon", value: "amazon" },
          { title: "Infografiki", value: "infographics" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "excerpt", title: "Krotki opis", type: "localizedText" }),
    defineField({
      name: "coverImage",
      title: "Zdjecie glowne",
      type: "galleryBlock",
      description: imageGuides.projectCover.description,
    }),
    defineField({ name: "client", title: "Klient", type: "string" }),
    defineField({ name: "year", title: "Rok", type: "number" }),
    defineField({ name: "services", title: "Uslugi", type: "localizedStringArray" }),
    defineField({ name: "challenge", title: "Wyzwanie", type: "localizedText" }),
    defineField({ name: "solution", title: "Rozwiazanie", type: "localizedText" }),
    defineField({ name: "results", title: "Rezultaty", type: "localizedStringArray" }),
    defineField({ name: "description", title: "Pelny opis", type: "localizedBlocks" }),
    defineField({
      name: "gallery",
      title: "Galeria zdjec",
      type: "array",
      of: [{ type: "galleryBlock" }],
    }),
    defineField({ name: "featured", title: "Wyrozniony", type: "boolean", initialValue: false }),
    defineField({
      name: "order",
      title: "Kolejnosc",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
  orderings: [
    { title: "Kolejnosc", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Data (najnowsze)", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
  ],
  preview: {
    select: {
      title: "title.pl",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
