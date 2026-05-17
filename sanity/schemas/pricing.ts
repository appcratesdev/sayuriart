import { defineField, defineType } from "sanity";

export default defineType({
  name: "pricing",
  title: "Cennik",
  type: "document",
  fields: [
    defineField({
      name: "categoryId",
      title: "ID kategorii",
      type: "string",
      options: {
        list: [
          { title: "Lifestyle", value: "lifestyle" },
          { title: "Produktowy", value: "product" },
          { title: "Amazon", value: "amazon" },
          { title: "Subskrypcje", value: "subscription" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoryLabel",
      title: "Nazwa kategorii",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "packages",
      title: "Pakiety",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Nazwa pakietu", type: "localizedString", validation: (Rule) => Rule.required() },
            { name: "price", title: "Cena", type: "string", validation: (Rule) => Rule.required() },
            { name: "unit", title: "Jednostka", type: "localizedString" },
            { name: "featured", title: "Wyrozniony", type: "boolean", initialValue: false },
            { name: "savings", title: "Oszczednosci", type: "string" },
            { name: "originalValue", title: "Oryginalna wartosc", type: "string" },
            { name: "features", title: "Cechy", type: "localizedStringArray", validation: (Rule) => Rule.required() },
          ],
          preview: { select: { title: "name.pl", subtitle: "price" } },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Kolejnosc",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [{ title: "Kolejnosc", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "categoryLabel.pl", subtitle: "categoryId" },
  },
});
