import { NavLink } from 'react-router-dom'
import { X, Check } from 'lucide-react'
import { getGroupedLessons } from '@/courses/registry'
import { useUIStore } from '@/store/uiStore'
import { useProgressStore } from '@/store/progressStore'
import { NAV_ITEMS } from '@/components/layout/navItems'
import { cn } from '@/lib/cn'

export default function Sidebar({ courseId }) {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)
  const closeSidebar = useUIStore((state) => state.closeSidebar)
  const isComplete = useProgressStore((state) => state.isComplete)
  const groups = getGroupedLessons(courseId)

  return (
    <>
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Menyuni yopish"
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-72 -translate-x-full overflow-y-auto border-r border-line bg-canvas p-5 transition-transform md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:translate-x-0',
          sidebarOpen && 'translate-x-0'
        )}
      >
        <div className="mb-4 flex items-center justify-between md:hidden">
          <span className="font-semibold text-ink">Menyu</span>
          <button type="button" onClick={closeSidebar} aria-label="Yopish">
            <X className="h-5 w-5 text-ink-muted" />
          </button>
        </div>

        <nav className="mb-5 flex flex-col gap-1 border-b border-line pb-5 md:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={closeSidebar}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-sm font-medium',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                    : 'text-ink-muted hover:bg-canvas-muted hover:text-ink'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted md:hidden">
          Dars mazmuni
        </p>
        <nav className="flex flex-col gap-6">
          {groups.map((group) => (
            <div key={group.lessons[0].slug}>
              {group.section && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {group.section}
                </p>
              )}
              <ul className="flex flex-col gap-1">
                {group.lessons.map((lesson) => (
                  <li key={lesson.slug}>
                    <NavLink
                      to={`/${courseId}/${lesson.slug}`}
                      end
                      onClick={closeSidebar}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm',
                          isActive
                            ? 'bg-brand-50 font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-300'
                            : 'text-ink-muted hover:bg-canvas-muted'
                        )
                      }
                    >
                      <span>{lesson.meta.title}</span>
                      {isComplete(courseId, lesson.slug) && (
                        <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
