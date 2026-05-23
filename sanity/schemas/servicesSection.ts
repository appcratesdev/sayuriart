import { defineField, defineType } from "sanity";

export default defineType({
  name: "servicesSection",
  title: "Usługi - sekcja",
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
    defineField({
      name: "ctaText",
      title: "Tekst przycisku CTA",
      type: "localizedString",
    }),
    defineField({
      name: "servicePageCtaText",
      title: "Tekst linku do strony uslugi",
      type: "localizedString",
    }),
  ],
  preview: {
    select: { title: "sectionTitle.pl", subtitle: "sectionTitle.en" },
  },
});
