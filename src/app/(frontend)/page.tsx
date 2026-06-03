import React from 'react'
import QuizComponent from '@/app/(frontend)/components'
import { getQuizesList } from '@/lib/payload-cms'

import './styles.css'
import { shuffleOptions } from '@/lib/utils'

export default async function HomePage() {
  // data fetched on server
  const quizData = await getQuizesList()
  const shuffled = shuffleOptions(quizData.docs?.[0])

  return <QuizComponent quizData={shuffled} />
}
