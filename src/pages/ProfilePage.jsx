import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, CheckCircle2, ChevronRight, Flame, LogOut, Mail, Swords, Trophy } from 'lucide-react'
import { useAuthStore, signOut, getDisplayName, getAvatarUrl } from '@/store/authStore'
import { useProgressStore } from '@/store/progressStore'
import { useArenaStore, solvedKey } from '@/store/arenaStore'
import { getAllCourses, getLessons } from '@/courses/registry'
import { getTopics, getChallenges } from '@/arena/registry'
import Avatar from '@/components/ui/Avatar'

function StatTile({ icon: Icon, value, label, hint, tone }) {
  return (
    <div className="rounded-3xl border border-line bg-canvas p-5">
      <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${tone}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-4 font-heading text-4xl leading-none text-ink">{value}</p>
      <p className="mt-2 text-sm font-medium text-ink">{label}</p>
      {hint && <p className="mt-0.5 text-xs text-ink-muted">{hint}</p>}
    </div>
  )
}

function ProgressCard({ icon: Icon, title, doneCount, totalCount, items, barClass, iconTone }) {
  const percent = totalCount ? Math.round((doneCount / totalCount) * 100) : 0
  return (
    <section className="rounded-3xl border border-line bg-canvas p-6">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${iconTone}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl text-ink">{title}</h2>
          <p className="text-sm text-ink-muted">
            {doneCount} / {totalCount} bajarildi
          </p>
        </div>
        <span className="ml-auto font-heading text-3xl leading-none text-ink">{percent}%</span>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-canvas-muted">
        <div className={`h-full rounded-full ${barClass}`} style={{ width: `${percent}%` }} />
      </div>

      <ul className="mt-5 divide-y divide-line border-t border-line">
        {items.map((item) => (
          <li key={item.id}>
            <Link to={item.to} className="group flex items-center gap-4 py-3.5">
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-sm font-medium text-ink group-hover:text-brand-700 dark:group-hover:text-brand-300">
                    {item.title}
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-ink-muted">
                    {item.done}/{item.total}
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-canvas-muted">
                  <div className={`h-full rounded-full ${barClass}`} style={{ width: `${item.percent}%` }} />
                </div>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const streak = useProgressStore((state) => state.streak)
  const completedCount = useProgressStore((state) => state.completions.size)
  const isComplete = useProgressStore((state) => state.isComplete)
  const arenaSolved = useArenaStore((state) => state.solved)

  // Mirrors ArenaTopicPage: RequireAuth only mounts this route once auth is
  // already resolved, so arenaStore's signedOut->signedIn subscription can
  // miss that transition — fetch explicitly here too.
  useEffect(() => {
    useArenaStore.getState().fetchAll()
  }, [])

  const displayName = getDisplayName(user)
  const avatarUrl = getAvatarUrl(user)
  const courses = getAllCourses()
  const totalLessons = courses.reduce((total, course) => total + getLessons(course.id).length, 0)
  const arenaTopics = getTopics()
  const arenaTotal = arenaTopics.reduce((total, topic) => total + getChallenges(topic.id).length, 0)
  const arenaSolvedCount = arenaTopics.reduce(
    (total, topic) =>
      total + getChallenges(topic.id).filter((c) => arenaSolved.has(solvedKey(topic.id, c.slug))).length,
    0
  )

  const courseItems = courses.map((course) => {
    const lessons = getLessons(course.id)
    const done = lessons.filter((lesson) => isComplete(course.id, lesson.slug)).length
    return {
      id: course.id,
      to: `/${course.id}`,
      title: course.title,
      done,
      total: lessons.length,
      percent: lessons.length ? Math.round((done / lessons.length) * 100) : 0,
    }
  })
  const arenaItems = arenaTopics.map((topic) => {
    const challenges = getChallenges(topic.id)
    const done = challenges.filter((c) => arenaSolved.has(solvedKey(topic.id, c.slug))).length
    return {
      id: topic.id,
      to: `/arena/${topic.id}`,
      title: topic.title,
      done,
      total: challenges.length,
      percent: challenges.length ? Math.round((done / challenges.length) * 100) : 0,
    }
  })

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex flex-col gap-5 rounded-3xl border border-line bg-canvas p-6 sm:flex-row sm:items-center sm:p-8">
        <Avatar src={avatarUrl} name={displayName} size="lg" />
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-3xl text-ink sm:text-4xl">{displayName}</h1>
          {user?.email && (
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-muted">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{user.email}</span>
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => signOut()}
          className="flex shrink-0 items-center justify-center gap-2 self-start rounded-full border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-canvas-muted sm:self-center"
        >
          <LogOut className="h-4 w-4" />
          Chiqish
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile
          icon={Flame}
          value={streak.current}
          label="Kunlik ketma-ketlik"
          hint="kun ketma-ket"
          tone="bg-brand-200 text-brand-800 dark:bg-brand-900 dark:text-brand-300"
        />
        <StatTile
          icon={Trophy}
          value={streak.longest}
          label="Eng uzun ketma-ketlik"
          hint="kun"
          tone="bg-brand2-200 text-brand2-800 dark:bg-brand2-900 dark:text-brand2-300"
        />
        <StatTile
          icon={CheckCircle2}
          value={completedCount}
          label="Tugallangan darslar"
          hint={`${totalLessons} tadan`}
          tone="bg-canvas-muted text-ink-muted"
        />
        <StatTile
          icon={Swords}
          value={arenaSolvedCount}
          label="Yechilgan masalalar"
          hint={`${arenaTotal} tadan`}
          tone="bg-canvas-muted text-ink-muted"
        />
      </div>

      <h2 className="mt-12 text-3xl text-ink">Progress</h2>
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-start">
        <ProgressCard
          icon={BookOpen}
          title="Kurslar"
          doneCount={completedCount}
          totalCount={totalLessons}
          items={courseItems}
          barClass="bg-brand-600"
          iconTone="bg-brand-200 text-brand-800 dark:bg-brand-900 dark:text-brand-300"
        />
        <ProgressCard
          icon={Swords}
          title="Arena"
          doneCount={arenaSolvedCount}
          totalCount={arenaTotal}
          items={arenaItems}
          barClass="bg-brand2-500"
          iconTone="bg-brand2-200 text-brand2-800 dark:bg-brand2-900 dark:text-brand2-300"
        />
      </div>
    </div>
  )
}
