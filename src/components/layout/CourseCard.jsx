import { Link } from 'react-router-dom'
import { Code2, LayoutTemplate, Palette, Terminal, GitBranch, Atom, Database, Puzzle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'

const ICONS = {
  Code2,
  'layout-template': LayoutTemplate,
  palette: Palette,
  python: Terminal,
  'git-branch': GitBranch,
  git: GitBranch,
  github: GitBranch,
  react: Atom,
  database: Database,
  puzzle: Puzzle,
}

export default function CourseCard({ course, lessonCount }) {
  const Icon = ICONS[course.icon] ?? Code2

  return (
    <Link
      to={`/${course.id}`}
      className="group flex flex-col gap-4 rounded-xl border border-line bg-canvas p-6 transition-colors hover:border-brand-300"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <h3 className="text-lg font-semibold text-ink">{course.title}</h3>
        <p className="mt-1 text-sm text-ink-muted">{course.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between text-sm text-ink-muted">
        <span>{lessonCount} ta dars</span>
        <span
          className={cn(
            'flex items-center gap-1 font-medium text-brand-600 transition-transform',
            'group-hover:translate-x-0.5'
          )}
        >
          Boshlash <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
