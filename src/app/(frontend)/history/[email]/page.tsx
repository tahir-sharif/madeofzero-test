import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import QuizList from '../../components/quiz-list'
import { getHistory } from '@/actions/quiz'

type PageProps = {
  params: Promise<{
    email: string
  }>
}

export default async function HistoryPage({ params }: PageProps) {
  const { email: encodedEmail } = await params
  const email = decodeURIComponent(encodedEmail)

  const history = await getHistory(email)

  if (!history.length) {
    return notFound()
  }

  return (
    <div className="space-y-6 px-5 py-8">
      <p className="text-center">
        <strong>{email}</strong>'s - History
      </p>

      <p className="font-semibold text-2xl">UI isn't Ready yet ... But you've got History data</p>

      <code>
        <pre>{JSON.stringify(history, null, 2)}</pre>
      </code>
    </div>
  )
}
