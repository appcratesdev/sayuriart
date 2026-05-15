import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Sekcja Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Podtytuł',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaText',
      title: 'Tekst Przycisku CTA',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Link Przycisku CTA',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Zdjęcie Hero',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
