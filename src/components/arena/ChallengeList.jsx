import { Link } from 'react-router-dom'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import ChallengeDetail from '@/components/arena/ChallengeDetail'
import { useArenaStore, solvedKey } from '@/store/arenaStore'
import { cn } from '@/lib/cn'
import { DIFFICULTY_LABELS, DIFFICULTY_STYLES } from '@/lib/difficulty'

export default function ChallengeList({ challenges, activeSlug, topicId, schema }) {
  const solved = useArenaStore((state) => state.solved)

  if (challenges.length === 0) {
    return (
      <div className="rounded-3xl bg-canvas p-6 text-center text-sm text-ink-muted">
        Bu filtr uchun masala topilmadi.
      </div>
    )
  }

  return (
    <div className="flex min-w-0 flex-col gap-1 rounded-3xl bg-canvas p-3.5">
      {challenges.map((challenge, index) => {
        const isActive = challenge.slug === activeSlug
        const isSolved = solved.has(solvedKey(topicId, challenge.slug))
        return (
          <div key={challenge.slug} className={cn(isActive && 'rounded-[26px] bg-canvas-muted p-1')}>
            <Link
              to={`/arena/${topicId}/${challenge.slug}`}
              className={cn(
                'flex items-center justify-between gap-3 rounded-full px-4 py-3 text-sm',
                isActive ? 'bg-canvas-muted font-medium text-ink' : 'text-ink-muted hover:bg-canvas-muted'
              )}
            >
              <span className="flex items-center gap-2">
                {index + 1}. {challenge.title}
                {isSolved && <Check className="h-3.5 w-3.5 shrink-0 text-brand2-600 dark:text-brand2-400" />}
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span
                  className={cn(
                    'rounded-full px-2.5 py-0.5 text-xs font-medium',
                    DIFFICULTY_STYLES[challenge.difficulty]
                  )}
                >
                  {DIFFICULTY_LABELS[challenge.difficulty]}
                </span>
                {isActive ? (
                  <ChevronUp className="h-4 w-4 text-ink-muted" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-ink-muted" />
                )}
              </span>
            </Link>
            {isActive && <ChallengeDetail challenge={challenge} topicId={topicId} schema={schema} />}
          </div>
        )
      })}
    </div>
  )
}
