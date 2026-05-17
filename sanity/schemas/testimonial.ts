import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Opinie",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Imie i nazwisko", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", title: "Stanowisko/Firma", type: "localizedString" }),
    defineField({ name: "content", title: "Tresc opinii", type: "localizedText", validation: (Rule) => Rule.required() }),
    defineField({
      name: "avatar",
      title: "Zdjecie",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "localizedString" }],
    }),
    defineField({ name: "rating", title: "Ocena (1-5)", type: "number", validation: (Rule) => Rule.required().min(1).max(5) }),
    defineField({ name: "order", title: "Kolejnosc", type: "number", validation: (Rule) => Rule.required().min(0) }),
  ],
  orderings: [{ title: "Kolejnosc", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "role.pl", media: "avatar" },
  },
});
