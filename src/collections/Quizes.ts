import { CollectionConfig } from 'payload'

export const Quizzes: CollectionConfig = {
  slug: 'quizzes',

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'questions',
      type: 'json',
      required: true,
    },
    {
      name: 'results',
      type: 'json',
      required: true,
    },
  ],
}
