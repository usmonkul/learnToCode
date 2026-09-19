import { useState } from 'react'
import { cn } from '@/lib/cn'

// Each layout is one grid-template-areas value — switching layouts only swaps this string.
const LAYOUTS = {
  full: {
    label: "To'liq",
    columns: '160px 1fr 160px',
    areas: '"header header header" "nav main aside" "footer footer footer"',
  },
  noAside: {
    label: "O'ng panelsiz",
    columns: '160px 1fr',
    areas: '"header header" "nav main" "footer footer"',
  },
  focus: {
    label: 'Fokus',
    columns: '1fr',
    areas: '"header" "main" "footer"',
  },
}

const AREAS = [
  { name: 'header', label: 'header', className: 'bg-sky-500' },
  { name: 'nav', label: 'nav', className: 'bg-violet-500' },
  { name: 'main', label: 'main', className: 'bg-emerald-500' },
  { name: 'aside', label: 'aside', className: 'bg-amber-500' },
  { name: 'footer', label: 'footer', className: 'bg-rose-500' },
]

const VISIBLE_AREAS = {
  full: ['header', 'nav', 'main', 'aside', 'footer'],
  noAside: ['header', 'nav', 'main', 'footer'],
  focus: ['header', 'main', 'footer'],
}

export default function PageLayoutGridProject() {
  const [layoutId, setLayoutId] = useState('full')
  const layout = LAYOUTS[layoutId]
  const visible = VISIBLE_AREAS[layoutId]

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-3xl font-bold text-white">Sahifa maketi</h1>
        <p className="mt-3 text-center text-slate-400">
          Har bir blok o'z <code className="text-sky-400">grid-area</code> nomiga ega. Maketni almashtirsangiz,
          faqat <code className="text-sky-400">grid-template-areas</code> o'zgaradi.
        </p>

        <div className="mt-8 flex justify-center gap-2">
          {Object.entries(LAYOUTS).map(([id, item]) => (
            <button
              key={id}
              onClick={() => setLayoutId(id)}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                id === layoutId ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div
          className="mt-8 grid gap-3"
          style={{
            gridTemplateColumns: layout.columns,
            gridTemplateRows: 'auto 260px auto',
            gridTemplateAreas: layout.areas,
          }}
        >
          {AREAS.filter((area) => visible.includes(area.name)).map((area) => (
            <div
              key={area.name}
              style={{ gridArea: area.name }}
              className={cn(
                'flex items-center justify-center rounded-xl p-4 font-mono text-sm font-semibold text-white',
                area.className
              )}
            >
              {area.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
