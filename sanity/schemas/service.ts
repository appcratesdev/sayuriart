import { defineField, defineType } from "sanity";

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
    defineField({ name: "description", title: "Opis", type: "localizedText" }),
    defineField({ name: "features", title: "Cechy", type: "localizedStringArray" }),
    defineField({
      name: "image",
      title: "Zdjecie",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "localizedString" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Kolejnosc",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [{ title: "Kolejnosc", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title.pl", subtitle: "title.en", media: "image" },
  },
});
