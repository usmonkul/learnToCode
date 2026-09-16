import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PROJECT_ICONS } from '@/lib/projectIcons'
import { cn } from '@/lib/cn'

const LEVEL_STYLES = {
  Beginner: 'bg-brand2-100 text-brand2-800 dark:bg-brand2-950 dark:text-brand2-400',
  Intermediate: 'bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-400',
  Advanced: 'border border-brand-600 text-brand-700 dark:border-brand-400 dark:text-brand-300',
}

const TYPE_STYLES = {
  HTML: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-400',
  CSS: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-400',
  JavaScript: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400',
  React: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-400',
  API: 'bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-400',
}

export default function ProjectCard({ project }) {
  const Icon = PROJECT_ICONS[project.icon] ?? PROJECT_ICONS.default

  return (
    <Link
      to={`/loyihalar/${project.id}`}
      className="group flex flex-col gap-3 rounded-3xl bg-canvas p-6 transition-transform hover:-translate-y-1 hover:shadow-md"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand2-200 text-brand2-800 dark:bg-brand2-950 dark:text-brand2-400">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <h3 className="font-heading text-xl text-ink">{project.title}</h3>
        <p className="mt-1 text-sm text-ink-muted">{project.description}</p>
      </div>
      {(project.type || project.level) && (
        <div className="flex flex-wrap items-center gap-1.5">
          {project.type && (
            <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', TYPE_STYLES[project.type])}>
              {project.type}
            </span>
          )}
          {project.level && (
            <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', LEVEL_STYLES[project.level])}>
              {project.level}
            </span>
          )}
        </div>
      )}
      <div className="mt-auto flex items-center justify-end pt-2 text-sm">
        <span
          className={cn(
            'flex items-center gap-1 font-medium text-brand-700 transition-transform dark:text-brand-300',
            'group-hover:translate-x-0.5'
          )}
        >
          Ochish <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
