import { decrypt, encrypt } from '@/lib/utils'
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

  hooks: {
    beforeChange: [
      ({ data }) => {
        data.notes = encrypt(data.notes)
        return data
      },
    ],

    afterRead: [
      ({ doc }) => {
        doc.notes = decrypt(doc.notes)
        return doc
      },
    ],
  },
}
