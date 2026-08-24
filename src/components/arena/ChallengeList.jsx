import { Link } from 'react-router-dom'
import ChallengeDetail from '@/components/arena/ChallengeDetail'
import { cn } from '@/lib/cn'

const DIFFICULTY_LABELS = { easy: 'Oson', medium: "O'rta", hard: 'Qiyin' }
const DIFFICULTY_STYLES = {
  easy: 'bg-brand2-100 text-brand2-800 dark:bg-brand2-950 dark:text-brand2-400',
  medium: 'bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-400',
  hard: 'border border-brand-600 text-brand-700 dark:border-brand-400 dark:text-brand-300',
}

export default function ChallengeList({ challenges, activeSlug, topicId, schema }) {
  return (
    <div className="flex min-w-0 flex-col gap-1 rounded-3xl bg-canvas p-3.5">
      {challenges.map((challenge, index) => {
        const isActive = challenge.slug === activeSlug
        return (
          <div key={challenge.slug} className={cn(isActive && 'rounded-[26px] bg-canvas-muted p-1')}>
            <Link
              to={`/arena/${topicId}/${challenge.slug}`}
              className={cn(
                'flex items-center justify-between gap-3 rounded-full px-4 py-3 text-sm',
                isActive ? 'bg-canvas-muted font-medium text-ink' : 'text-ink-muted hover:bg-canvas-muted'
              )}
            >
              <span>
                {index + 1}. {challenge.title}
              </span>
              <span className={cn('shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium', DIFFICULTY_STYLES[challenge.difficulty])}>
                {DIFFICULTY_LABELS[challenge.difficulty]}
              </span>
            </Link>
            {isActive && <ChallengeDetail challenge={challenge} schema={schema} />}
          </div>
        )
      })}
    </div>
  )
}
