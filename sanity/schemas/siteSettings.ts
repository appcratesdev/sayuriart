import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Ustawienia strony",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tytul strony",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", title: "Opis meta", type: "localizedText" }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "localizedString" }],
    }),
    defineField({ name: "email", title: "Email kontaktowy", type: "string" }),
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({
      name: "socialLinks",
      title: "Social media",
      type: "object",
      fields: [
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "linkedin", title: "LinkedIn", type: "url" },
      ],
    }),
    defineField({ name: "seo", title: "SEO globalne", type: "seoFields" }),
  ],
  preview: {
    select: { title: "title.pl", subtitle: "title.en", media: "logo" },
  },
});
