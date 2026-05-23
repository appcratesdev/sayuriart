import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqSection",
  title: "FAQ - sekcja",
  type: "document",
  fields: [
    defineField({ name: "sectionTitle", title: "Tytul sekcji", type: "localizedString", validation: (Rule) => Rule.required() }),
    defineField({ name: "sectionDescription", title: "Opis sekcji", type: "localizedText" }),
    defineField({ name: "contactTitle", title: "Karta kontaktowa - tytul", type: "localizedString" }),
    defineField({ name: "contactDescription", title: "Karta kontaktowa - opis", type: "localizedText" }),
    defineField({ name: "contactCta", title: "Karta kontaktowa - CTA", type: "localizedString" }),
  ],
  preview: {
    select: { title: "sectionTitle.pl", subtitle: "sectionTitle.en" },
  },
});
