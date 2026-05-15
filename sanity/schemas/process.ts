import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'process',
  title: 'Proces',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Numer',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'iconName',
      title: 'Nazwa Ikony',
      type: 'string',
      description: 'brief, concept, creation, files',
      options: {
        list: [
          { title: 'Brief (dokument)', value: 'brief' },
          { title: 'Koncepcja (sześcian)', value: 'concept' },
          { title: 'Kreacja (paleta)', value: 'creation' },
          { title: 'Finalne pliki (pobieranie)', value: 'files' },
        ],
      },
      validation: (Rule) => Rule.required(),
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
})
