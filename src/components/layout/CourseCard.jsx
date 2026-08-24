import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { resolveCourseIcon } from '@/lib/courseIcons'
import { cn } from '@/lib/cn'

export default function CourseCard({ course, lessonCount }) {
  const Icon = resolveCourseIcon(course.icon)

  return (
    <Link
      to={`/${course.id}`}
      className="group flex flex-col gap-3 rounded-3xl bg-canvas p-6 transition-transform hover:-translate-y-1 hover:shadow-md"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-200 text-brand-800">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <h3 className="font-heading text-xl text-ink">{course.title}</h3>
        <p className="mt-1 text-sm text-ink-muted">{course.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between pt-2 text-sm">
        <span className="rounded-full bg-canvas-muted px-3 py-1 text-xs text-ink-muted">{lessonCount} ta dars</span>
        <span
          className={cn(
            'flex items-center gap-1 font-medium text-brand-700 transition-transform',
            'group-hover:translate-x-0.5'
          )}
        >
          Boshlash <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
