import { defineField, defineType } from "sanity";

export default defineType({
  name: "beforeAfterSection",
  title: "Przed/Po - sekcja",
  type: "document",
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Tytuł sekcji",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionDescription",
      title: "Opis sekcji",
      type: "localizedText",
    }),
  ],
  preview: {
    select: { title: "sectionTitle.pl", subtitle: "sectionTitle.en" },
  },
});
