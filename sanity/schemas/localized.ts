import { defineField, defineType } from "sanity";

const languageFields = (type: "string" | "text") => [
  defineField({
    name: "pl",
    title: "Polski",
    type,
  }),
  defineField({
    name: "en",
    title: "English",
    type,
  }),
];

export const localizedString = defineType({
  name: "localizedString",
  title: "Tekst PL/EN",
  type: "object",
  fields: languageFields("string"),
});

export const localizedText = defineType({
  name: "localizedText",
  title: "Dluzszy tekst PL/EN",
  type: "object",
  fields: [
    defineField({
      name: "pl",
      title: "Polski",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "en",
      title: "English",
      type: "text",
      rows: 4,
    }),
  ],
});

export const localizedBlocks = defineType({
  name: "localizedBlocks",
  title: "Rich text PL/EN",
  type: "object",
  fields: [
    defineField({
      name: "pl",
      title: "Polski",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});

export const localizedStringArray = defineType({
  name: "localizedStringArray",
  title: "Lista tekstow PL/EN",
  type: "object",
  fields: [
    defineField({
      name: "pl",
      title: "Polski",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});

export const localizedSlug = defineType({
  name: "localizedSlug",
  title: "Slug PL/EN",
  type: "object",
  fields: [
    defineField({
      name: "pl",
      title: "Polski",
      type: "slug",
      options: { source: "title.pl", maxLength: 96 },
    }),
    defineField({
      name: "en",
      title: "English",
      type: "slug",
      options: { source: "title.en", maxLength: 96 },
    }),
  ],
});

export const seoFields = defineType({
  name: "seoFields",
  title: "SEO PL/EN",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Meta title",
      type: "localizedString",
      validation: (Rule) => Rule.custom((value) => {
        const title = value as { pl?: string; en?: string } | undefined;
        if (title?.pl && title.pl.length > 65) return "PL title powinien miec maksymalnie ok. 65 znakow.";
        if (title?.en && title.en.length > 65) return "EN title should be about 65 characters max.";
        return true;
      }),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "localizedText",
      validation: (Rule) => Rule.custom((value) => {
        const description = value as { pl?: string; en?: string } | undefined;
        if (description?.pl && description.pl.length > 160) return "PL description powinien miec maksymalnie ok. 160 znakow.";
        if (description?.en && description.en.length > 160) return "EN description should be about 160 characters max.";
        return true;
      }),
    }),
    defineField({
      name: "image",
      title: "Obraz Open Graph",
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
  ],
});
