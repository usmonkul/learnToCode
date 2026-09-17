import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDown, Hammer, Search, X } from 'lucide-react'
import { getAllProjects } from '@/projects/registry'
import { cn } from '@/lib/cn'
import ProjectCard from '@/components/layout/ProjectCard'

const ALL = 'Hammasi'
const TYPE_OPTIONS = [ALL, 'HTML', 'CSS', 'JavaScript', 'React', 'API']
const LEVEL_OPTIONS = [ALL, 'Beginner', 'Intermediate', 'Advanced']

export default function ProjectsPage() {
  const projects = getAllProjects()
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('q') ?? ''
  const type = searchParams.get('type') ?? ALL
  const level = searchParams.get('level') ?? ALL

  function updateParams(next) {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev)
        Object.entries(next).forEach(([key, value]) => {
          if (!value || value === ALL) {
            params.delete(key)
          } else {
            params.set(key, value)
          }
        })
        return params
      },
      { replace: true }
    )
  }

  const setSearch = (value) => updateParams({ q: value })
  const setType = (value) => updateParams({ type: value })
  const setLevel = (value) => updateParams({ level: value })

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesType = type === ALL || project.type === type
      const matchesLevel = level === ALL || project.level === level
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query)
      return matchesType && matchesLevel && matchesSearch
    })
  }, [projects, search, type, level])

  const hasActiveFilters = search.trim() !== '' || type !== ALL || level !== ALL

  function clearFilters() {
    setSearchParams({}, { replace: true })
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand2-200 text-brand2-800 dark:bg-brand2-950 dark:text-brand2-400">
          <Hammer className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-4xl text-ink">Loyihalar</h1>
          <p className="mt-1.5 text-ink-muted">
            O'rganganlaringizni amalda qo'llang — har bir loyiha to'liq ishlaydigan kichik dastur.
          </p>
        </div>
      </div>

      {projects.length > 0 && (
        <div className="mb-9 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Loyiha qidirish..."
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

          <div className="relative sm:w-40">
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              aria-label="Turi bo'yicha filtrlash"
              className="w-full appearance-none rounded-full border border-line bg-canvas py-2.5 pl-4 pr-10 text-sm text-ink transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          </div>

          <div className="relative sm:w-44">
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              aria-label="Daraja bo'yicha filtrlash"
              className="w-full appearance-none rounded-full border border-line bg-canvas py-2.5 pl-4 pr-10 text-sm text-ink transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {LEVEL_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          </div>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line py-16 text-center">
          <p className="text-ink-muted">Hozircha loyihalar yo'q.</p>
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line py-16 text-center">
          <p className="text-ink-muted">Hech qanday loyiha topilmadi.</p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
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
