import { useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { Menu, X, BookOpen } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { NAV_ITEMS } from '@/components/layout/navItems'
import ThemeToggle from '@/components/layout/ThemeToggle'
import UserMenu from '@/components/layout/UserMenu'
import { cn } from '@/lib/cn'

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const { courseId, slug } = useParams()
  const hasSidebar = Boolean(courseId && slug)

  const mobileMenuOpen = hasSidebar ? sidebarOpen : menuOpen

  function handleToggleMobileMenu() {
    if (hasSidebar) toggleSidebar()
    else setMenuOpen((value) => !value)
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-canvas-muted/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-6">
        <Link to="/" className="mr-3 flex shrink-0 items-center gap-2.5 font-heading text-lg text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-canvas-muted">
            <BookOpen className="h-4 w-4" />
          </span>
          Darsliklar
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium',
                  isActive
                    ? 'bg-brand-200 text-brand-800 dark:bg-brand-950 dark:text-brand-300'
                    : 'text-ink-muted hover:bg-canvas hover:text-ink'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <UserMenu />
          <ThemeToggle />
          <button
            type="button"
            onClick={handleToggleMobileMenu}
            className="rounded-full p-2 text-ink-muted hover:bg-canvas md:hidden"
            aria-label={mobileMenuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {!hasSidebar && menuOpen && (
        <>
          <button
            type="button"
            aria-label="Fonni yopish"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/30 md:hidden"
          />
          <nav className="absolute inset-x-0 top-full z-40 border-b border-line bg-canvas-muted px-6 py-3 shadow-lg md:hidden">
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-full px-3.5 py-2 text-sm font-medium',
                      isActive
                        ? 'bg-brand-200 text-brand-800 dark:bg-brand-950 dark:text-brand-300'
                        : 'text-ink-muted hover:bg-canvas hover:text-ink'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
