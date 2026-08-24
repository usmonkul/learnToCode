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
      <div className="mb-10 flex items-center gap-3">
        <Swords className="h-8 w-8 text-brand-600" />
        <div>
          <h1 className="text-3xl font-bold text-ink">Arena</h1>
          <p className="mt-1 text-ink-muted">
            Mavzuni tanlang va masalalarni yechib, bilimingizni mashq qiling.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const Icon = ICONS[topic.icon] ?? Database
          return (
            <Link
              key={topic.id}
              to={`/arena/${topic.id}`}
              className="group flex flex-col gap-4 rounded-xl border border-line bg-canvas p-6 transition-colors hover:border-brand-300"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-ink">{topic.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{topic.description}</p>
              </div>
              <div className="mt-auto text-sm text-ink-muted">
                {getChallenges(topic.id).length} ta masala
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
