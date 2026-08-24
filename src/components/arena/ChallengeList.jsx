import { Link } from 'react-router-dom'
import ChallengeDetail from '@/components/arena/ChallengeDetail'
import { cn } from '@/lib/cn'

const DIFFICULTY_LABELS = { easy: 'Oson', medium: "O'rta", hard: 'Qiyin' }
const DIFFICULTY_STYLES = {
  easy: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  hard: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
}

export default function ChallengeList({ challenges, activeSlug, topicId, schema }) {
  return (
    <ul className="flex min-w-0 flex-col divide-y divide-line overflow-hidden rounded-lg border border-line">
      {challenges.map((challenge, index) => {
        const isActive = challenge.slug === activeSlug
        return (
          <li key={challenge.slug} className="bg-canvas">
            <Link
              to={`/arena/${topicId}/${challenge.slug}`}
              className={cn(
                'flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-canvas-muted',
                isActive && 'bg-canvas-muted'
              )}
            >
              <span className="text-ink">
                {index + 1}. {challenge.title}
              </span>
              <span
                className={cn(
                  'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium',
                  DIFFICULTY_STYLES[challenge.difficulty]
                )}
              >
                {DIFFICULTY_LABELS[challenge.difficulty]}
              </span>
            </Link>
            {isActive && <ChallengeDetail challenge={challenge} schema={schema} />}
          </li>
        )
      })}
    </ul>
  )
}
