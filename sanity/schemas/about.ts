import { defineField, defineType } from "sanity";

export default defineType({
  name: "about",
  title: "O mnie (About Page)",
  type: "document",
  fields: [
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Title tag for SEO (e.g., O mnie | Sayuri)",
      initialValue: "O mnie | Sayuri",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      description: "Meta description for SEO",
      initialValue: "Poznajmy się bliżej. Zobaczmy, co możemy razem stworzyć.",
    }),
    defineField({
      name: "profileImage",
      title: "Zdjęcie profilowe (Profile Image)",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Ważne dla SEO i dostępności.",
          initialValue: "Ania - Art Director",
        },
      ],
    }),
    defineField({
      name: "role",
      title: "Rola / Stanowisko (Role)",
      type: "string",
      initialValue: "Art Director / Content & Community",
    }),
    defineField({
      name: "title",
      title: "Imię / Tytuł (Title)",
      type: "string",
      initialValue: "Ania",
    }),
    defineField({
      name: "bio",
      title: "Biografia (Bio)",
      type: "array",
      of: [{ type: "block" }],
      description: "Treść sekcji O mnie",
    }),
    defineField({
      name: "hobbies",
      title: "Po godzinach (Hobbies)",
      type: "array",
      of: [
        {
          type: "object",
          name: "hobby",
          fields: [
            { name: "name", type: "string", title: "Nazwa (np. Malarstwo)" },
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
        },
      ],
    }),
    defineField({
      name: "contactTitle",
      title: "Tytuł sekcji kontaktowej",
      type: "string",
      initialValue: "Zróbmy razem coś wyjątkowego.",
    }),
    defineField({
      name: "contactEmail",
      title: "Email kontaktowy",
      type: "string",
      initialValue: "annsayuriart@gmail.com",
    }),
  ],
});
