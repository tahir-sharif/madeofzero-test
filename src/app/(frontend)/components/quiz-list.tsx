import React from 'react'

type Props = {
  title: string
  questions?: Question[] | null
  answers: Record<number, number>
  allAnswered?: boolean
  onSubmit?: () => void
  onSelectAnswer?: (questionId: number, score: number) => void
  readOnly?: boolean
}

const QuizList = ({
  title,
  questions,
  answers,
  allAnswered,
  onSubmit,
  onSelectAnswer,
  readOnly = false,
}: Props) => {
  return (
    <main className="max-w-xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-4">{title}</h1>

      {questions?.map((q) => (
        <section key={q.question} className="border rounded p-4">
          <h2 className="font-semibold mb-3">{q.question}</h2>

          <div className="space-y-2">
            {q.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => !readOnly && onSelectAnswer?.(q.id, opt.score)}
                className={`block w-full text-left p-2 rounded border ${
                  answers[q.id] === opt.score
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-black hover:text-black text-white/80 border-gray-300 hover:bg-blue-400'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>
      ))}

      <button
        disabled={!allAnswered}
        onClick={onSubmit}
        className={`mt-6 w-full py-3 rounded text-white font-semibold ${
          allAnswered ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Submit Quiz
      </button>
    </main>
  )
}

export default QuizList
