import { defineField, defineType } from "sanity";

export default defineType({
  name: "pricingSection",
  title: "Cennik - sekcja",
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
      name: "customQuestion",
      title: "Tekst pod kartami (pytanie o indywidualną wycenę)",
      type: "localizedString",
    }),
    defineField({
      name: "customCta",
      title: "Tekst przycisku pod kartami",
      type: "localizedString",
    }),
  ],
  preview: {
    select: { title: "sectionTitle.pl", subtitle: "sectionTitle.en" },
  },
});
