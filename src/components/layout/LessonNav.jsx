import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getAdjacentLessons } from '@/courses/registry'

export default function LessonNav({ courseId, slug }) {
  const { prev, next } = getAdjacentLessons(courseId, slug)
  if (!prev && !next) return null

  return (
    <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
      {prev ? (
        <Link
          to={`/${courseId}/${prev.slug}`}
          className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {prev.meta.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={`/${courseId}/${next.slug}`}
          className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:underline"
        >
          {next.meta.title}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <span />
      )}
    </div>
  )
}
