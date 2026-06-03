type Option = {
  label: string
  score: number
}

type Question = {
  id: number
  question: string
  options: Option[]
}

type Result = {
  range: [number, number]
  label: string
}

type Quiz = {
  title: string
  questions: Question[] | null
  results: Result[] | null
}

type QuizeResponse = {
  success: boolean
  // id: string
  score: number
  resultLabel: string
}

type SaveQuizInput = {
  email?: string
  notes?: string
  answers: Record<number, number>
  score: number
  resultLabel: string
}

type SaveQuizResponse = {
  success: boolean
  id: string
  history?: QHistory[]
}

type QHistory = {
  answers: Record<number, number>
  email?: string
  notes?: string
  score?: number
  resultLabel?: string
}

type Result = { range: [number, number]; label: string }
type Results = Result[]
