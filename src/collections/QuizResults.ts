import { decrypt, encrypt } from '@/lib/utils'
import { CollectionConfig } from 'payload'

export const QuizResults: CollectionConfig = {
  slug: 'quiz-results',

  fields: [
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'score',
      type: 'number',
      required: true,
    },
    {
      name: 'resultLabel',
      type: 'text',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'breakdown',
      type: 'json',
    },
  ],

  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.notes) {
          data.notes = encrypt(data.notes)
        }
        return data
      },
    ],

    afterRead: [
      ({ doc }) => {
        if (doc.notes) {
          doc.notes = decrypt(doc.notes)
        }
        return doc
      },
    ],
  },
}
