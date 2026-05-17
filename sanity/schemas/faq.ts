import { defineField, defineType } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Pytanie", type: "localizedString", validation: (Rule) => Rule.required() }),
    defineField({ name: "answer", title: "Odpowiedz", type: "localizedText", validation: (Rule) => Rule.required() }),
    defineField({ name: "order", title: "Kolejnosc", type: "number", validation: (Rule) => Rule.required().min(0) }),
  ],
  orderings: [{ title: "Kolejnosc", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "question.pl", subtitle: "question.en" } },
});
