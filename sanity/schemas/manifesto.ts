import { defineField, defineType } from "sanity";
import { imageGuides, imageWarning } from "./imageGuidance";

export default defineType({
  name: "manifesto",
  title: "Sekcja Manifesto",
  type: "document",
  fields: [
    defineField({ name: "overline", title: "Nadtytul", type: "localizedString" }),
    defineField({
      name: "title",
      title: "Tytul",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", title: "Opis", type: "localizedBlocks" }),
    defineField({
      name: "image",
      title: "Zdjecie",
      type: "image",
      description: imageGuides.unusedContentImage.description,
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "localizedString" }],
      validation: imageWarning(imageGuides.unusedContentImage),
    }),
  ],
  preview: {
    select: {
      title: "title.pl",
      subtitle: "title.en",
      media: "image",
    },
  },
});
