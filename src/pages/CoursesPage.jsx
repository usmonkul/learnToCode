import { getAllCourses, getLessons } from '@/courses/registry'
import CourseCard from '@/components/layout/CourseCard'

const FILTERS = ['Hammasi', "Boshlang'ich", "Ma'lumot", 'Interfeys']

export default function CoursesPage() {
  const courses = getAllCourses()

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl text-ink">Kurslar</h1>
          <p className="mt-3 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
            O'zingizga mos kursni tanlang va o'z sur'atingizda o'rganishni boshlang. Har bir kurs bo'limlarga
            bo'lingan.
          </p>
        </div>
        <div className="flex flex-none overflow-hidden rounded-full border border-line" role="presentation">
          {FILTERS.map((label, index) => (
            <span
              key={label}
              className={`px-3.5 py-2 text-sm ${index === 0 ? 'bg-brand-600 text-canvas-muted' : 'text-ink-muted'} ${
                index > 0 ? 'border-l border-line' : ''
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} lessonCount={getLessons(course.id).length} />
        ))}
      </div>
    </div>
  )
}
