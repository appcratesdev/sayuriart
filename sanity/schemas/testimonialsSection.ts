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
    defineField({ name: "previousLabel", title: "Etykieta poprzedniej opinii", type: "localizedString" }),
    defineField({ name: "nextLabel", title: "Etykieta nastepnej opinii", type: "localizedString" }),
    defineField({ name: "goToSlideLabel", title: "Etykieta kropki slajdu", type: "localizedString", description: "Uzyj {number}, aby wstawic numer slajdu." }),
  ],
  preview: {
    select: { title: "sectionTitle.pl", subtitle: "sectionTitle.en" },
  },
});
