import { Navigate, useParams } from 'react-router-dom'
import { getCourse, getLesson } from '@/courses/registry'
import Sidebar from '@/components/layout/Sidebar'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import LessonNav from '@/components/layout/LessonNav'

export default function LessonPage() {
  const { courseId, slug } = useParams()
  const course = getCourse(courseId)
  const lesson = getLesson(courseId, slug)
  if (!course || !lesson) return <Navigate to="/not-found" replace />

  const LessonContent = lesson.Component

  return (
    <div className="mx-auto flex max-w-6xl px-6">
      <Sidebar courseId={courseId} />
      <main className="min-w-0 flex-1 py-10 md:pl-6">
        <Breadcrumbs
          items={[
            { label: 'Kurslar', to: '/' },
            { label: course.title, to: `/${courseId}` },
            { label: lesson.meta.title },
          ]}
        />
        <article className="prose prose-slate max-w-none">
          <h1>{lesson.meta.title}</h1>
          <LessonContent />
        </article>
        <LessonNav courseId={courseId} slug={slug} />
      </main>
    </div>
  )
}
