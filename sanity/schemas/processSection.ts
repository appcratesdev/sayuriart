import { defineField, defineType } from "sanity";

export default defineType({
  name: "processSection",
  title: "Proces - sekcja",
  type: "document",
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Tytul sekcji",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "sectionDescription", title: "Opis sekcji", type: "localizedText" }),
  ],
  preview: {
    select: { title: "sectionTitle.pl", subtitle: "sectionTitle.en" },
  },
});
