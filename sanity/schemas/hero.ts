import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Sekcja Hero",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytul",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Podtytul",
      type: "localizedText",
    }),
    defineField({
      name: "ctaText",
      title: "Tekst przycisku CTA",
      type: "localizedString",
    }),
    defineField({
      name: "ctaLink",
      title: "Link przycisku CTA",
      type: "string",
      description: "Np. #contact, /o-mnie albo pelny URL. Jezyk zostanie dodany automatycznie dla linkow lokalnych.",
    }),
    defineField({
      name: "heroImage",
      title: "Zdjecie Hero",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "localizedString",
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
  ],
  preview: {
    select: {
      title: "title.pl",
      subtitle: "title.en",
      media: "heroImage",
    },
  },
});
