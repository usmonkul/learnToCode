import { Link, useParams } from 'react-router-dom'
import { Menu, BookOpen } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import ThemeToggle from '@/components/layout/ThemeToggle'

export default function TopNav() {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const { courseId, slug } = useParams()
  const hasSidebar = Boolean(courseId && slug)

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-ink">
          <BookOpen className="h-5 w-5 text-brand-600" />
          Darsliklar
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          {hasSidebar && (
            <button
              type="button"
              onClick={toggleSidebar}
              className="rounded-md p-2 text-ink-muted hover:bg-canvas-muted md:hidden"
              aria-label="Menyuni ochish"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
