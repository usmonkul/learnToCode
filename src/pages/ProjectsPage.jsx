import { Hammer } from 'lucide-react'
import { getAllProjects } from '@/projects/registry'
import ProjectCard from '@/components/layout/ProjectCard'

export default function ProjectsPage() {
  const projects = getAllProjects()

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

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line py-16 text-center">
          <p className="text-ink-muted">Hozircha loyihalar yo'q.</p>
        </div>
      )}
    </div>
  )
}
