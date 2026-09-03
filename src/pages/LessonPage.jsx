import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2, Circle } from 'lucide-react'
import { getCourse, getLesson } from '@/courses/registry'
import Sidebar from '@/components/layout/Sidebar'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import LessonNav from '@/components/layout/LessonNav'
import { useAuthStore } from '@/store/authStore'
import { useProgressStore } from '@/store/progressStore'
import { cn } from '@/lib/cn'

export default function LessonPage() {
  const { courseId, slug } = useParams()
  const navigate = useNavigate()
  const course = getCourse(courseId)
  const lesson = getLesson(courseId, slug)
  const status = useAuthStore((state) => state.status)
  const isComplete = useProgressStore((state) => state.isComplete(courseId, slug))
  const markComplete = useProgressStore((state) => state.markComplete)
  const markIncomplete = useProgressStore((state) => state.markIncomplete)

  if (!course || !lesson) return <Navigate to="/not-found" replace />

  const LessonContent = lesson.Component

  function handleToggleComplete() {
    if (status !== 'signedIn') {
      navigate(`/login?redirect=${encodeURIComponent(`/${courseId}/${slug}`)}`)
      return
    }
    if (isComplete) markIncomplete(courseId, slug)
    else markComplete(courseId, slug)
  }

  return (
    <div className="mx-auto flex max-w-6xl px-6 py-4">
      <Sidebar courseId={courseId} />
      <main className="min-w-0 flex-1 py-10 md:pl-6">
        <Breadcrumbs
          items={[
            { label: 'Kurslar', to: '/kurslar' },
            { label: course.title, to: `/${courseId}` },
            { label: lesson.meta.title },
          ]}
        />
        <article className="prose prose-slate max-w-none dark:prose-invert">
          <h1>{lesson.meta.title}</h1>
          {LessonContent ? (
            <LessonContent />
          ) : (
            <p className="text-ink-muted">Dars mazmuni hozirda tayyorlanmoqda...</p>
          )}
        </article>
        <button
          type="button"
          onClick={handleToggleComplete}
          className={cn(
            'mt-6 flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium',
            isComplete
              ? 'border-brand2-300 bg-brand2-100 text-brand2-800 dark:border-brand2-700 dark:bg-brand2-950 dark:text-brand2-300'
              : 'border-line text-ink hover:border-brand-300'
          )}
        >
          {isComplete ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
          {isComplete ? "Dars tugallandi" : "Darsni tugallash"}
        </button>
        <LessonNav courseId={courseId} slug={slug} />
      </main>
    </div>
  )
}
