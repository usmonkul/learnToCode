import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { getCourse, getGroupedLessons } from '@/courses/registry'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { useProgressStore } from '@/store/progressStore'
import { cn } from '@/lib/cn'

export default function CourseOverviewPage() {
  const { courseId } = useParams()
  const course = getCourse(courseId)
  const isComplete = useProgressStore((state) => state.isComplete)
  if (!course) return <Navigate to="/not-found" replace />

  const groups = getGroupedLessons(courseId)
  const allLessons = groups.flatMap((group) => group.lessons)
  const doneCount = allLessons.filter((lesson) => isComplete(courseId, lesson.slug)).length
  const percent = allLessons.length ? Math.round((doneCount / allLessons.length) * 100) : 0
  const firstLesson = groups[0]?.lessons[0]

  return (
    <div className="mx-auto max-w-6xl px-6 py-4 py-10">
      <Breadcrumbs items={[{ label: 'Kurslar', to: '/kurslar' }, { label: course.title }]} />
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <h1 className="text-5xl text-ink">{course.title}</h1>
          <p className="mt-3.5 max-w-[52ch] text-lg leading-relaxed text-ink-muted">{course.description}</p>
          {firstLesson && (
            <div className="mt-6 flex items-center gap-3.5">
              <Link
                to={`/${courseId}/${firstLesson.slug}`}
                className="flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-canvas-muted hover:bg-brand-700"
              >
                {doneCount > 0 ? 'Davom etish' : 'Kursni boshlash'}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="text-sm text-ink-muted">
                {doneCount}/{allLessons.length} tugallangan
              </span>
            </div>
          )}
          {allLessons.length > 0 && (
            <div className="mt-4.5 h-2.5 max-w-[420px] overflow-hidden rounded-full bg-canvas-muted">
              <div className="h-full rounded-full bg-brand-600" style={{ width: `${percent}%` }} />
            </div>
          )}
        </div>
        <div className="rounded-3xl bg-canvas p-6">
          <p className="font-heading text-lg text-ink">Kurs tarkibi</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-ink-muted">
            {groups.map((group) => (
              <div key={group.lessons[0].slug} className="flex justify-between gap-3">
                <span>{group.section || course.title}</span>
                <span className="shrink-0">{group.lessons.length} dars</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-8">
        {groups.map((group) => (
          <div key={group.lessons[0].slug}>
            {group.section && <p className="mb-3.5 text-xs font-medium uppercase tracking-[.12em] text-brand-700 dark:text-brand-300">{group.section}</p>}
            <div className="flex flex-col gap-1.5">
              {group.lessons.map((lesson, index) => {
                const complete = isComplete(courseId, lesson.slug)
                return (
                  <Link
                    key={lesson.slug}
                    to={`/${courseId}/${lesson.slug}`}
                    className="flex items-center gap-4 rounded-full bg-canvas px-5 py-3 hover:bg-canvas/70"
                  >
                    <span
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium',
                        complete ? 'bg-brand2-300 text-brand2-900 dark:bg-brand2-800 dark:text-brand2-200' : 'bg-canvas-muted text-ink-muted'
                      )}
                    >
                      {complete ? <Check className="h-4 w-4" /> : index + 1}
                    </span>
                    <span className="text-base text-ink">{lesson.meta.title}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
