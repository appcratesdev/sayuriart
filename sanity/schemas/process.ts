import { defineField, defineType } from "sanity";

export default defineType({
  name: "process",
  title: "Proces",
  type: "document",
  fields: [
    defineField({ name: "number", title: "Numer", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "title", title: "Tytul", type: "localizedString", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Opis", type: "localizedText", validation: (Rule) => Rule.required() }),
    defineField({
      name: "iconName",
      title: "Nazwa ikony",
      type: "string",
      options: {
        list: [
          { title: "Brief", value: "brief" },
          { title: "Koncepcja", value: "concept" },
          { title: "Kreacja", value: "creation" },
          { title: "Finalne pliki", value: "files" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "order", title: "Kolejnosc", type: "number", validation: (Rule) => Rule.required().min(0) }),
  ],
  orderings: [{ title: "Kolejnosc", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title.pl", subtitle: "title.en" } },
});
