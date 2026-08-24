import { Link } from 'react-router-dom'
import { Database, Swords } from 'lucide-react'
import { getTopics, getChallenges } from '@/arena/registry'

const ICONS = {
  database: Database,
}

export default function ArenaPage() {
  const topics = getTopics()

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand2-200 text-brand2-800 dark:bg-brand2-950 dark:text-brand2-400">
          <Swords className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-4xl text-ink">Arena</h1>
          <p className="mt-1.5 text-ink-muted">Mavzuni tanlang va masalalarni yechib, bilimingizni mashq qiling.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const Icon = ICONS[topic.icon] ?? Database
          return (
            <Link
              key={topic.id}
              to={`/arena/${topic.id}`}
              className="group flex flex-col gap-3 rounded-3xl bg-canvas p-6 transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand2-200 text-brand2-800 dark:bg-brand2-950 dark:text-brand2-400">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-heading text-xl text-ink">{topic.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{topic.description}</p>
              </div>
              <div className="mt-auto pt-2 text-sm">
                <span className="rounded-full bg-canvas-muted px-3 py-1 text-xs text-ink-muted">
                  {getChallenges(topic.id).length} ta masala
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
