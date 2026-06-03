'use server'
// Used Server Actions directly instead of Rest APIs because of the Payload CMS

import { getResultLabel } from '@/lib/utils'
import config from '@payload-config'
import { getPayload } from 'payload'

export const getQuizesList = async () => {
  const payload = await getPayload({ config })

  const quizes = await payload.find({
    collection: 'quizzes',
  })

  return quizes
}

export const getQuizResults = async (data: {
  answers: Record<number, number>
}): Promise<QuizeResponse> => {
  const payload = await getPayload({ config })

  const score = Object.values(data.answers).reduce((a, b) => a + (b ?? 0), 0)

  const quizes = await payload.find({ collection: 'quizzes' })
  const results = quizes.docs[0].results as Results

  const resultLabel = getResultLabel(results, score)

  return {
    success: true,
    score,
    resultLabel: resultLabel,
  }
}

export async function getHistory(email: string): Promise<QHistory[]> {
  const payload = await getPayload({ config })

  const history = await payload.find({
    collection: 'quiz-results',
    where: {
      email: {
        equals: email,
      },
    },
    // limit: 1,
    sort: '-createdAt',
  })

  return history.docs as unknown as QHistory[]
}

export async function saveQuizResult(data: SaveQuizInput): Promise<SaveQuizResponse> {
  const payload = await getPayload({ config })

  const history = {
    breakdown: data.answers,
    email: data.email,
    notes: data.notes,
    score: data?.score,
    resultLabel: data?.resultLabel,
  }

  const created = await payload.create({
    collection: 'quiz-results',
    data: history,
  })

  if (typeof data.email === 'string') {
    const oldResults = await payload.find({
      collection: 'quiz-results',
      where: {
        email: {
          equals: data.email,
        },
      },
    })

    return {
      success: true,
      id: String(created.id),
      history: oldResults.docs as unknown as QHistory[],
    }
  }

  return {
    success: true,
    id: String(created.id),
  }
}
