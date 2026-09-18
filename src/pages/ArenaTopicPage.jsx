import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getTopic, getChallenges, getChallenge } from '@/arena/registry'
import { SQL_SCHEMA } from '@/arena/sql/schema'
import ChallengeList from '@/components/arena/ChallengeList'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import SqlPlayground from '@/components/content/SqlPlayground'
import JsPlayground from '@/components/content/JsPlayground'
import PyPlayground from '@/components/content/PyPlayground'
import { useArenaStore, solvedKey } from '@/store/arenaStore'
import { DIFFICULTY_LABELS, DIFFICULTY_STYLES } from '@/lib/difficulty'
import { cn } from '@/lib/cn'

const DIFFICULTY_ORDER = ['easy', 'medium', 'hard']

// Full topic order (not the difficulty-filtered list), wrapping past the end,
// so "next challenge" always has somewhere to go regardless of the active filter.
function getNextChallenge(challenges, currentSlug, solved, topicId) {
  const currentIndex = challenges.findIndex((c) => c.slug === currentSlug)
  const ordered = [...challenges.slice(currentIndex + 1), ...challenges.slice(0, currentIndex + 1)]
  return ordered.find((c) => c.slug !== currentSlug && !solved.has(solvedKey(topicId, c.slug))) ?? null
}

export default function ArenaTopicPage() {
  const { topicId, challengeSlug } = useParams()
  const topic = getTopic(topicId)
  const challenges = getChallenges(topicId)
  const solved = useArenaStore((state) => state.solved)
  const [difficultyFilter, setDifficultyFilter] = useState(null)

  // RequireAuth only mounts this route once auth status is resolved, so
  // arenaStore's own signedOut->signedIn subscription (registered at module
  // load, i.e. on this component's first mount) has already missed that
  // transition — fetch explicitly here instead of relying on it.
  useEffect(() => {
    useArenaStore.getState().fetchAll()
  }, [])

  // Filter is topic-scoped (difficulty mix differs per topic); drop it when
  // the topic changes instead of leaving a stale filter that hides everything.
  useEffect(() => {
    setDifficultyFilter(null)
  }, [topicId])

  if (!topic) return <Navigate to="/not-found" replace />

  if (!challengeSlug) {
    const first = challenges[0]
    if (!first) return <Navigate to="/not-found" replace />
    return <Navigate to={`/arena/${topicId}/${first.slug}`} replace />
  }

  const challenge = getChallenge(topicId, challengeSlug)
  if (!challenge) return <Navigate to="/not-found" replace />

  const schema = topicId === 'sql' ? SQL_SCHEMA : null
  const counts = challenges.reduce(
    (acc, c) => ({ ...acc, [c.difficulty]: (acc[c.difficulty] ?? 0) + 1 }),
    {}
  )
  const solvedCount = challenges.filter((c) => solved.has(solvedKey(topicId, c.slug))).length
  const solvedPct = challenges.length ? (solvedCount / challenges.length) * 100 : 0
  const filteredChallenges = difficultyFilter
    ? challenges.filter((c) => c.difficulty === difficultyFilter)
    : challenges
  const nextChallenge = getNextChallenge(challenges, challenge.slug, solved, topicId)

  return (
    <div className="mx-auto max-w-6xl px-6 py-4 py-10">
      <Breadcrumbs
        items={[
          { label: 'Arena', to: '/arena' },
          { label: topic.title, to: `/arena/${topicId}` },
          { label: challenge.title },
        ]}
      />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl text-ink">{topic.title} masalalari</h1>
        <div className="text-sm text-ink-muted">
          <span className="font-medium text-ink">{solvedCount}</span>/{challenges.length} yechilgan
        </div>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-canvas-muted">
        <div
          className="h-full rounded-full bg-brand2-500 transition-[width]"
          style={{ width: `${solvedPct}%` }}
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setDifficultyFilter(null)}
          className={cn(
            'rounded-full px-3 py-1 text-xs font-medium transition-colors',
            difficultyFilter === null ? 'bg-canvas text-ink shadow-sm' : 'text-ink-muted hover:bg-canvas'
          )}
        >
          Barchasi ({challenges.length})
        </button>
        {DIFFICULTY_ORDER.map(
          (level) =>
            counts[level] > 0 && (
              <button
                key={level}
                type="button"
                onClick={() => setDifficultyFilter((current) => (current === level ? null : level))}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                  difficultyFilter === level ? DIFFICULTY_STYLES[level] : 'text-ink-muted hover:bg-canvas'
                )}
              >
                {DIFFICULTY_LABELS[level]} ({counts[level]})
              </button>
            )
        )}
      </div>
      <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <ChallengeList
          challenges={filteredChallenges}
          activeSlug={challenge.slug}
          topicId={topicId}
          schema={schema}
        />
        {topic.hasSandbox && topicId === 'sql' && (
          <div className="min-w-0 [&>div]:my-0!">
            <SqlPlayground
              key={challenge.slug}
              challenge={challenge}
              topicId={topicId}
              slug={challenge.slug}
              schema={schema}
              initialQuery={challenge.starterQuery}
              nextChallenge={nextChallenge}
            />
          </div>
        )}
        {topic.hasSandbox && topicId === 'javascript' && (
          <div className="min-w-0 [&>div]:my-0!">
            <JsPlayground
              key={challenge.slug}
              challenge={challenge}
              topicId={topicId}
              slug={challenge.slug}
              nextChallenge={nextChallenge}
            />
          </div>
        )}
        {topic.hasSandbox && topicId === 'python' && (
          <div className="min-w-0 [&>div]:my-0!">
            <PyPlayground
              key={challenge.slug}
              challenge={challenge}
              topicId={topicId}
              slug={challenge.slug}
              nextChallenge={nextChallenge}
            />
          </div>
        )}
      </div>
    </div>
  )
}
