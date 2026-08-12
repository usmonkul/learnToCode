import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getCourse, getGroupedLessons } from '@/courses/registry'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export default function CourseOverviewPage() {
  const { courseId } = useParams()
  const course = getCourse(courseId)
  if (!course) return <Navigate to="/not-found" replace />

  const groups = getGroupedLessons(courseId)
  const firstLesson = groups[0]?.lessons[0]

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Breadcrumbs items={[{ label: 'Kurslar', to: '/' }, { label: course.title }]} />
      <h1 className="text-3xl font-bold text-ink">{course.title}</h1>
      <p className="mt-3 text-ink-muted">{course.description}</p>
      {firstLesson && (
        <Link
          to={`/${courseId}/${firstLesson.slug}`}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Kursni boshlash
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
      <div className="mt-10 flex flex-col gap-8">
        {groups.map((group) => (
          <div key={group.section}>
            {group.section && (
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
                {group.section}
              </h2>
            )}
            <ul className="flex flex-col gap-2">
              {group.lessons.map((lesson, index) => (
                <li key={lesson.slug}>
                  <Link
                    to={`/${courseId}/${lesson.slug}`}
                    className="flex items-center gap-3 rounded-md border border-line px-4 py-3 text-sm hover:border-brand-300"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-canvas-muted text-xs font-medium text-ink-muted">
                      {index + 1}
                    </span>
                    <span className="text-ink">{lesson.meta.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
