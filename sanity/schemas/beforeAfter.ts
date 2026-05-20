import { defineField, defineType } from "sanity";
import { imageGuides, requiredImageWithWarning } from "./imageGuidance";

export default defineType({
  name: "beforeAfter",
  title: "Przed/Po",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytul",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", title: "Opis", type: "localizedText" }),
    defineField({
      name: "beforeImage",
      title: "Zdjecie przed",
      type: "image",
      description: imageGuides.beforeAfter.description,
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "localizedString" }],
      validation: requiredImageWithWarning(imageGuides.beforeAfter),
    }),
    defineField({
      name: "afterImage",
      title: "Zdjecie po",
      type: "image",
      description: imageGuides.beforeAfter.description,
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "localizedString" }],
      validation: requiredImageWithWarning(imageGuides.beforeAfter),
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
    select: { title: "title.pl", subtitle: "title.en", media: "afterImage" },
  },
});
