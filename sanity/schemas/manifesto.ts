import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'manifesto',
  title: 'Sekcja Manifesto',
  type: 'document',
  fields: [
    defineField({
      name: 'overline',
      title: 'Nadtytuł',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
