import { useEffect, useMemo, useRef, useState } from 'react'
import { CircleCheck, Search, X } from 'lucide-react'
import { cn } from '@/lib/cn'

const ITEMS = [
  { id: 1, name: 'JavaScript', category: 'Til' },
  { id: 2, name: 'TypeScript', category: 'Til' },
  { id: 3, name: 'Python', category: 'Til' },
  { id: 4, name: 'React', category: 'Freymvork' },
  { id: 5, name: 'Vue', category: 'Freymvork' },
  { id: 6, name: 'Angular', category: 'Freymvork' },
  { id: 7, name: 'Svelte', category: 'Freymvork' },
  { id: 8, name: 'Next.js', category: 'Freymvork' },
  { id: 9, name: 'Node.js', category: 'Freymvork' },
  { id: 10, name: 'Django', category: 'Freymvork' },
  { id: 11, name: 'FastAPI', category: 'Freymvork' },
  { id: 12, name: 'PostgreSQL', category: "Ma'lumotlar bazasi" },
  { id: 13, name: 'MongoDB', category: "Ma'lumotlar bazasi" },
  { id: 14, name: 'Redis', category: "Ma'lumotlar bazasi" },
  { id: 15, name: 'SQLite', category: "Ma'lumotlar bazasi" },
  { id: 16, name: 'Docker', category: 'Vosita' },
  { id: 17, name: 'Git', category: 'Vosita' },
  { id: 18, name: 'GitHub', category: 'Vosita' },
  { id: 19, name: 'Figma', category: 'Vosita' },
  { id: 20, name: 'Vite', category: 'Vosita' },
  { id: 21, name: 'Webpack', category: 'Vosita' },
  { id: 22, name: 'Tailwind CSS', category: 'Vosita' },
  { id: 23, name: 'GraphQL', category: 'Vosita' },
  { id: 24, name: 'ESLint', category: 'Vosita' },
]

const DEBOUNCE_MS = 250

export default function CommandSearchProject() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const inputRef = useRef(null)
  const itemRefs = useRef([])

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), DEBOUNCE_MS)
    return () => clearTimeout(timeout)
  }, [query])

  const results = useMemo(() => {
    if (!debouncedQuery) return ITEMS
    return ITEMS.filter((item) => item.name.toLowerCase().includes(debouncedQuery))
  }, [debouncedQuery])

  useEffect(() => {
    setActiveIndex(0)
  }, [debouncedQuery])

  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  function highlightMatch(name, isActive) {
    if (!debouncedQuery) return name
    const index = name.toLowerCase().indexOf(debouncedQuery)
    if (index === -1) return name
    return (
      <>
        {name.slice(0, index)}
        <mark className={cn('rounded', isActive ? 'bg-white/25 text-white' : 'bg-indigo-100 text-indigo-700')}>
          {name.slice(index, index + debouncedQuery.length)}
        </mark>
        {name.slice(index + debouncedQuery.length)}
      </>
    )
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => Math.min(index + 1, results.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (results[activeIndex]) setSelected(results[activeIndex])
    } else if (event.key === 'Escape') {
      setQuery('')
      setSelected(null)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-50 px-4 py-16">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
          <Search className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Texnologiya qidiruvi</h1>
          <p className="text-sm text-slate-500">Klaviatura bilan boshqaring: ↑ ↓ Enter Escape</p>
        </div>
      </div>

      <div className="mt-8 w-full max-w-md">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Texnologiya qidirish..."
            autoFocus
            className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                inputRef.current?.focus()
              }}
              aria-label="Qidiruvni tozalash"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {selected && (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-sm text-indigo-700">
            <CircleCheck className="h-4 w-4 shrink-0" />
            Tanlandi: <strong>{selected.name}</strong>
          </div>
        )}

        <ul className="mt-4 max-h-80 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          {results.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-slate-400">Hech narsa topilmadi.</li>
          ) : (
            results.map((item, index) => {
              const isActive = index === activeIndex
              return (
                <li
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[index] = el
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setSelected(item)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm transition-colors',
                    isActive ? 'bg-indigo-600 text-white' : 'text-slate-700'
                  )}
                >
                  <span>{highlightMatch(item.name, isActive)}</span>
                  <span className={cn('text-xs', isActive ? 'text-indigo-100' : 'text-slate-400')}>
                    {item.category}
                  </span>
                </li>
              )
            })
          )}
        </ul>

        <p className="mt-3 text-center text-xs text-slate-400">
          ↑ ↓ bilan tanlang, Enter bilan tasdiqlang, Escape bilan tozalang.
        </p>
      </div>
    </div>
  )
}
