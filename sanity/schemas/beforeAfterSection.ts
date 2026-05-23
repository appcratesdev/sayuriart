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
    defineField({ name: "beforeLabel", title: "Etykieta zdjecia przed", type: "localizedString" }),
    defineField({ name: "afterLabel", title: "Etykieta zdjecia po", type: "localizedString" }),
    defineField({ name: "instruction", title: "Instrukcja pod suwakiem", type: "localizedString" }),
  ],
  preview: {
    select: { title: "sectionTitle.pl", subtitle: "sectionTitle.en" },
  },
});
