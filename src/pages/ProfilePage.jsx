import { Link } from 'react-router-dom'
import { CheckCircle2, Flame, LogOut, Mail, Trophy } from 'lucide-react'
import { useAuthStore, signOut, getDisplayName, getAvatarUrl } from '@/store/authStore'
import { useProgressStore } from '@/store/progressStore'
import { getAllCourses, getLessons } from '@/courses/registry'
import Avatar from '@/components/ui/Avatar'

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const streak = useProgressStore((state) => state.streak)
  const completedCount = useProgressStore((state) => state.completions.size)
  const isComplete = useProgressStore((state) => state.isComplete)

  const displayName = getDisplayName(user)
  const avatarUrl = getAvatarUrl(user)
  const courses = getAllCourses()
  const totalLessons = courses.reduce((total, course) => total + getLessons(course.id).length, 0)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center gap-5">
        <Avatar src={avatarUrl} name={displayName} size="lg" />
        <div className="min-w-0">
          <h1 className="truncate text-4xl text-ink">{displayName}</h1>
          {user?.email && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{user.email}</span>
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => signOut()}
          className="ml-auto flex shrink-0 items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-canvas"
        >
          <LogOut className="h-4 w-4" />
          Chiqish
        </button>
      </div>

      <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-3xl bg-brand-200 p-6 dark:bg-brand-900">
          <Flame className="h-6 w-6 text-brand-800 dark:text-brand-300" />
          <p className="mt-3.5 font-heading text-4xl leading-none text-brand-900 dark:text-brand-100">{streak.current}</p>
          <p className="mt-2 text-sm text-brand-900 dark:text-brand-100">Kunlik ketma-ketlik</p>
        </div>
        <div className="rounded-3xl bg-brand2-200 p-6 dark:bg-brand2-900">
          <Trophy className="h-6 w-6 text-brand2-800 dark:text-brand2-300" />
          <p className="mt-3.5 font-heading text-4xl leading-none text-brand2-900 dark:text-brand2-100">{streak.longest}</p>
          <p className="mt-2 text-sm text-brand2-900 dark:text-brand2-100">Eng uzun ketma-ketlik</p>
        </div>
        <div className="rounded-3xl bg-canvas p-6">
          <CheckCircle2 className="h-6 w-6 text-ink-muted" />
          <p className="mt-3.5 font-heading text-4xl leading-none text-ink">{completedCount}</p>
          <p className="mt-2 text-sm text-ink-muted">Tugallangan darslar · {totalLessons} dan</p>
        </div>
      </div>

      <h2 className="mt-11 text-3xl text-ink">Kurslar bo'yicha progress</h2>
      <div className="mt-5 flex flex-col gap-3">
        {courses.map((course) => {
          const lessons = getLessons(course.id)
          const done = lessons.filter((lesson) => isComplete(course.id, lesson.slug)).length
          const percent = lessons.length ? Math.round((done / lessons.length) * 100) : 0
          return (
            <Link key={course.id} to={`/${course.id}`} className="rounded-3xl bg-canvas p-5 hover:bg-canvas/70">
              <div className="flex items-center justify-between gap-3">
                <span className="font-heading text-lg text-ink">{course.title}</span>
                <span className="shrink-0 text-sm text-ink-muted">
                  {done}/{lessons.length}
                </span>
              </div>
              <div className="mt-3.5 h-2.5 overflow-hidden rounded-full bg-canvas-muted">
                <div className="h-full rounded-full bg-brand-600" style={{ width: `${percent}%` }} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
