import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pricing',
  title: 'Cennik',
  type: 'document',
  fields: [
    defineField({
      name: 'categoryId',
      title: 'ID Kategorii',
      type: 'string',
      options: {
        list: [
          { title: 'Lifestyle', value: 'lifestyle' },
          { title: 'Produktowy', value: 'product' },
          { title: 'Amazon', value: 'amazon' },
          { title: 'Subskrypcje', value: 'subscription' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categoryLabel',
      title: 'Nazwa Kategorii',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'packages',
      title: 'Pakiety',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Nazwa Pakietu', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'price', title: 'Cena', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'unit', title: 'Jednostka (np. / miesiąc)', type: 'string' },
            { name: 'featured', title: 'Wyróżniony', type: 'boolean', initialValue: false },
            { name: 'savings', title: 'Oszczędności (zł)', type: 'string' },
            { name: 'originalValue', title: 'Oryginalna Wartość (zł)', type: 'string' },
            {
              name: 'features',
              title: 'Cechy',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'price',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Kolejność',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Kolejność',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'categoryLabel',
      subtitle: 'categoryId',
    },
  },
})
