import { getAllCourses, getLessons } from '@/courses/registry'
import CourseCard from '@/components/layout/CourseCard'

export default function CoursesPage() {
  const courses = getAllCourses()

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-ink">Kurslar</h1>
        <p className="mt-2 text-ink-muted">
          O'zingizga mos kursni tanlang va o'z sur'atingizda o'rganishni boshlang.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} lessonCount={getLessons(course.id).length} />
        ))}
      </div>
    </div>
  )
}
