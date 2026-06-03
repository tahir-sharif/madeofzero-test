import React from 'react'

type Props = {
  title: string
  quizeResponse: QuizeResponse
  onSubmit: () => void
  onChange: (name: string, value: string) => void
  onRestart: () => void
  values: Record<string, string> | null
}

const QuizScore = ({ title, quizeResponse, values, onChange, onRestart, onSubmit }: Props) => {
  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-2">{title}</h1>

      <p className="text-center text-xl mb-6">
        Your total score is: <strong>{quizeResponse.score}</strong>
      </p>

      <p className="text-center mb-6 text-lg italic">{quizeResponse.resultLabel}</p>

      <section>
        <label className="block font-semibold mb-1">Notes (optional)</label>
        <textarea
          value={values?.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          rows={4}
          className="w-full p-2 border rounded text-black bg-white"
        />
      </section>

      <section>
        <label className="block font-semibold mb-1">Email (optional)</label>
        <input
          type="email"
          value={values?.email}
          onChange={(e) => onChange('email', e.target.value)}
          className="w-full p-2 border rounded text-black bg-white"
        />
      </section>

      <button
        onClick={onSubmit}
        disabled={!values?.email}
        className="w-full py-3 rounded bg-green-600 text-white font-semibold hover:bg-green-700"
      >
        Save Results {values?.email ? `as ${values.email}` : '(email required)'}
      </button>

      <button onClick={onRestart} className="w-full py-3 rounded border border-gray-400">
        Restart Quiz
      </button>
    </main>
  )
}

export default QuizScore
