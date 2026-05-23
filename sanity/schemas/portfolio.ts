import { defineField, defineType } from "sanity";

export default defineType({
  name: "portfolio",
  title: "Portfolio - sekcja",
  type: "document",
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Tytul sekcji",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "sectionDescription", title: "Opis sekcji", type: "localizedText" }),
    defineField({ name: "allFilterLabel", title: "Filtr: wszystko", type: "localizedString" }),
    defineField({ name: "openProjectLabel", title: "Overlay: zobacz projekt", type: "localizedString" }),
    defineField({ name: "seo", title: "SEO", type: "seoFields" }),
  ],
  preview: {
    select: { title: "sectionTitle.pl", subtitle: "sectionTitle.en" },
  },
});
