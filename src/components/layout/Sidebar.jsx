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
          'fixed inset-y-0 left-0 z-40 w-72 -translate-x-full overflow-y-auto bg-canvas p-5 transition-transform md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0 md:rounded-3xl',
          sidebarOpen && 'translate-x-0'
        )}
      >
        <div className="mb-4 flex items-center justify-between md:hidden">
          <span className="font-heading text-base text-ink">Menyu</span>
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
                  'rounded-full px-3.5 py-2 text-sm font-medium',
                  isActive
                    ? 'bg-brand-200 text-brand-800 dark:bg-brand-950 dark:text-brand-300'
                    : 'text-ink-muted hover:bg-canvas-muted hover:text-ink'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <p className="mb-2 text-xs font-medium uppercase tracking-[.1em] text-ink-muted md:hidden">Dars mazmuni</p>
        <nav className="flex flex-col gap-5">
          {groups.map((group) => (
            <div key={group.lessons[0].slug}>
              {group.section && (
                <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[.1em] text-ink-muted">
                  {group.section}
                </p>
              )}
              <div className="flex flex-col gap-1">
                {group.lessons.map((lesson) => (
                  <NavLink
                    key={lesson.slug}
                    to={`/${courseId}/${lesson.slug}`}
                    end
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between gap-2 rounded-full px-3.5 py-2 text-sm',
                        isActive
                          ? 'bg-brand-200 font-medium text-brand-900 dark:bg-brand-950 dark:text-brand-300'
                          : 'text-ink-muted hover:bg-canvas-muted'
                      )
                    }
                  >
                    <span>{lesson.meta.title}</span>
                    {isComplete(courseId, lesson.slug) && (
                      <Check className="h-3.5 w-3.5 shrink-0 text-brand2-700 dark:text-brand2-400" />
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
