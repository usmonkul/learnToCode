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

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center gap-4">
        <Avatar src={avatarUrl} name={displayName} size="lg" />
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold text-ink">{displayName}</h1>
          {user?.email && (
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-muted">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{user.email}</span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-line p-4">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="text-2xl font-bold text-ink">{streak.current}</span>
          </div>
          <p className="mt-1 text-sm text-ink-muted">Kunlik ketma-ketlik</p>
        </div>
        <div className="rounded-lg border border-line p-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-brand-600" />
            <span className="text-2xl font-bold text-ink">{streak.longest}</span>
          </div>
          <p className="mt-1 text-sm text-ink-muted">Eng uzun ketma-ketlik</p>
        </div>
        <div className="rounded-lg border border-line p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <span className="text-2xl font-bold text-ink">{completedCount}</span>
          </div>
          <p className="mt-1 text-sm text-ink-muted">Tugallangan darslar</p>
        </div>
      </div>

      <h2 className="mt-10 text-lg font-semibold text-ink">Kurslar bo'yicha progress</h2>
      <div className="mt-4 flex flex-col gap-3">
        {courses.map((course) => {
          const lessons = getLessons(course.id)
          const done = lessons.filter((lesson) => isComplete(course.id, lesson.slug)).length
          const percent = lessons.length ? Math.round((done / lessons.length) * 100) : 0
          return (
            <Link
              key={course.id}
              to={`/${course.id}`}
              className="rounded-lg border border-line p-4 transition-colors hover:border-brand-300"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-ink">{course.title}</span>
                <span className="shrink-0 text-sm text-ink-muted">
                  {done}/{lessons.length}
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-canvas-muted">
                <div className="h-full rounded-full bg-brand-600" style={{ width: `${percent}%` }} />
              </div>
            </Link>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => signOut()}
        className="mt-10 flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-canvas-muted"
      >
        <LogOut className="h-4 w-4" />
        Chiqish
      </button>
    </div>
  )
}
