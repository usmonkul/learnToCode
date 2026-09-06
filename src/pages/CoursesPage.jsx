import { useMemo, useState } from 'react'
import { ChevronDown, Search, X } from 'lucide-react'
import { getAllCourses, getLessons } from '@/courses/registry'
import { cn } from '@/lib/cn'
import CourseCard from '@/components/layout/CourseCard'

const ALL = 'Hammasi'

export default function CoursesPage() {
  const courses = getAllCourses()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(ALL)

  const categoryOptions = useMemo(() => {
    const found = new Set(courses.flatMap((course) => course.categories ?? []))
    return [ALL, ...Array.from(found).sort()]
  }, [courses])

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase()
    return courses.filter((course) => {
      const matchesCategory = category === ALL || course.categories?.includes(category)
      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [courses, search, category])

  const hasActiveFilters = search.trim() !== '' || category !== ALL

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div>
        <h1 className="text-5xl text-ink">Kurslar</h1>
        <p className="mt-3 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
          O'zingizga mos kursni tanlang va o'z sur'atingizda o'rganishni boshlang. Har bir kurs bo'limlarga
          bo'lingan.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Kurs qidirish..."
            className="w-full rounded-full border border-line bg-canvas py-2.5 pl-10 pr-10 text-sm text-ink placeholder:text-ink-muted/70 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Qidiruvni tozalash"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="relative sm:w-48">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Kategoriya bo'yicha filtrlash"
            className="w-full appearance-none rounded-full border border-line bg-canvas py-2.5 pl-4 pr-10 text-sm text-ink transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} lessonCount={getLessons(course.id).length} />
          ))}
        </div>
      ) : (
        <div className="mt-9 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line py-16 text-center">
          <p className="text-ink-muted">Hech qanday kurs topilmadi.</p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setCategory(ALL)
              }}
              className={cn(
                'rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-canvas-muted hover:bg-brand-700'
              )}
            >
              Filtrni tozalash
            </button>
          )}
        </div>
      )}
    </div>
  )
}
