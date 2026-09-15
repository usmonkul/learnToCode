import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getTopic, getChallenges, getChallenge } from '@/arena/registry'
import { SQL_SCHEMA } from '@/arena/sql/schema'
import ChallengeList from '@/components/arena/ChallengeList'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import SqlPlayground from '@/components/content/SqlPlayground'
import JsPlayground from '@/components/content/JsPlayground'
import { useArenaStore } from '@/store/arenaStore'

export default function ArenaTopicPage() {
  const { topicId, challengeSlug } = useParams()
  const topic = getTopic(topicId)
  const challenges = getChallenges(topicId)

  // RequireAuth only mounts this route once auth status is resolved, so
  // arenaStore's own signedOut->signedIn subscription (registered at module
  // load, i.e. on this component's first mount) has already missed that
  // transition — fetch explicitly here instead of relying on it.
  useEffect(() => {
    useArenaStore.getState().fetchAll()
  }, [])

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

  return (
    <div className="mx-auto max-w-6xl px-6 py-4 py-10">
      <Breadcrumbs items={[{ label: 'Arena', to: '/arena' }, { label: topic.title }]} />
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-4xl text-ink">{topic.title} masalalari</h1>
        <div className="ml-auto flex gap-2">
          {counts.easy > 0 && (
            <span className="rounded-full bg-brand2-100 px-3 py-1 text-xs font-medium text-brand2-800 dark:bg-brand2-950 dark:text-brand2-400">
              {counts.easy} oson
            </span>
          )}
          {counts.medium > 0 && (
            <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-800 dark:bg-brand-950 dark:text-brand-400">
              {counts.medium} o'rta
            </span>
          )}
          {counts.hard > 0 && (
            <span className="rounded-full border border-brand-600 px-3 py-1 text-xs font-medium text-brand-700 dark:border-brand-400 dark:text-brand-300">
              {counts.hard} qiyin
            </span>
          )}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <ChallengeList
          challenges={challenges}
          activeSlug={challenge.slug}
          topicId={topicId}
          schema={schema}
        />
        {topic.hasSandbox && topicId === 'sql' && (
          <div className="min-w-0 [&>div]:my-0!">
            <SqlPlayground key={challenge.slug} schema={schema} initialQuery={challenge.starterQuery} />
          </div>
        )}
        {topic.hasSandbox && topicId === 'javascript' && (
          <div className="min-w-0 [&>div]:my-0!">
            <JsPlayground key={challenge.slug} challenge={challenge} topicId={topicId} slug={challenge.slug} />
          </div>
        )}
      </div>
    </div>
  )
}
