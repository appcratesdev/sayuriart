import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'portfolio',
  title: 'Portfolio - Sekcja',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Tytuł Sekcji',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionDescription',
      title: 'Opis Sekcji',
      type: 'text',
      rows: 2,
    }),
  ],
})
