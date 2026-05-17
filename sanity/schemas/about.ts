import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "O mnie (About Page)",
  type: "document",
  fields: [
    defineField({ name: "seoTitle", title: "SEO title", type: "localizedString" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "localizedText" }),
    defineField({
      name: "profileImage",
      title: "Zdjecie profilowe",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "localizedString" }],
    }),
    defineField({ name: "role", title: "Rola / stanowisko", type: "localizedString" }),
    defineField({ name: "title", title: "Imie / tytul", type: "localizedString" }),
    defineField({ name: "bio", title: "Biografia", type: "localizedBlocks" }),
    defineField({
      name: "hobbies",
      title: "Po godzinach",
      type: "array",
      of: [
        {
          type: "object",
          name: "hobby",
          fields: [
            { name: "name", type: "localizedString", title: "Nazwa" },
            {
              name: "icon",
              type: "string",
              title: "Ikona",
              options: {
                list: [
                  { title: "Palette", value: "palette" },
                  { title: "Music", value: "music" },
                  { title: "Leaf", value: "leaf" },
                  { title: "Coffee", value: "coffee" },
                ],
              },
            },
          ],
          preview: {
            select: { title: "name.pl", subtitle: "name.en" },
          },
        },
      ],
    }),
    defineField({ name: "contactTitle", title: "Tytul sekcji kontaktowej", type: "localizedString" }),
    defineField({ name: "contactEmail", title: "Email kontaktowy", type: "string" }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
  preview: {
    select: { title: "title.pl", subtitle: "title.en", media: "profileImage" },
  },
});
