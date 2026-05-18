import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonialsSection",
  title: "Opinie - sekcja",
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
