'use client'
import { getQuizResults, saveQuizResult } from '@/actions/quiz'

import { useState } from 'react'
import QuizForm from './quiz-list'
import QuizScore from './quiz-score'

interface Props {
  quizData: Quiz
}

export default function QuizeComponent({ quizData }: Props) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [scoreDetails, setScoreDetails] = useState<QuizeResponse | null>(null)

  // combining notes and email states
  const [scoreFields, setScoreFields] = useState({ notes: '', email: '' })

  const { title, questions = [] } = quizData

  const selectAnswer = (questionId: number, score: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: score,
    }))
  }

  const allAnswered = questions?.length === Object.keys(answers).length

  const onSubmitHandler = async () => {
    try {
      const details = await getQuizResults({ answers })
      setScoreDetails(details)
    } catch {
      setScoreDetails(null)
      console.log('error')
    }
  }

  const onScoreDetailsSubmit = async () => {
    try {
      const details = await saveQuizResult({
        answers,
        email: scoreFields.email,
        notes: scoreFields.notes,
        score: scoreDetails?.score || 0,
        resultLabel: scoreDetails?.resultLabel || '',
      })

      // console.log('details', details)

      navigation.navigate(`/history/${scoreFields.email}`)
    } catch {
      setScoreDetails(null)
      console.log('error')
    }
  }

  const onResultFieldsChangeHanlder = (name: string, value: string) => {
    setScoreFields((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const restartQuiz = () => {
    setAnswers({})
    setScoreDetails(null)
    setScoreFields({ notes: '', email: '' })
  }

  if (!scoreDetails)
    return (
      <QuizForm
        title={title}
        questions={questions}
        answers={answers}
        allAnswered={allAnswered}
        onSubmit={onSubmitHandler}
        onSelectAnswer={selectAnswer}
      />
    )

  return (
    <QuizScore
      title={title}
      values={scoreFields}
      quizeResponse={scoreDetails}
      onChange={onResultFieldsChangeHanlder}
      onRestart={restartQuiz}
      onSubmit={onScoreDetailsSubmit}
    />
  )
}
