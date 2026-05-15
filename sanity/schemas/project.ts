import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projekty',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł Projektu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategoria',
      type: 'string',
      options: {
        list: [
          { title: 'Lifestyle', value: 'lifestyle' },
          { title: 'Produktowy', value: 'product' },
          { title: 'Amazon', value: 'amazon' },
          { title: 'Infografiki', value: 'infographics' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Krótki Opis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Zdjęcie Główne',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Klient',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Rok',
      type: 'number',
    }),
    defineField({
      name: 'services',
      title: 'Usługi',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'challenge',
      title: 'Wyzwanie',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'solution',
      title: 'RozwiÄ…zanie',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'results',
      title: 'Rezultaty',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'description',
      title: 'Pełny Opis',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria Zdjęć',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              title: 'Podpis',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Wyróżniony',
      type: 'boolean',
      initialValue: false,
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
    {
      title: 'Data (najnowsze)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
