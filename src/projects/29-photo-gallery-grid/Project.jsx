import { useState } from 'react'
import { cn } from '@/lib/cn'

const TILES = [
  'from-rose-400 to-orange-300',
  'from-amber-300 to-lime-300',
  'from-emerald-400 to-teal-300',
  'from-sky-400 to-indigo-400',
  'from-violet-400 to-fuchsia-400',
  'from-pink-400 to-rose-300',
  'from-teal-300 to-cyan-400',
  'from-orange-400 to-red-400',
  'from-indigo-400 to-sky-300',
  'from-lime-300 to-emerald-400',
  'from-fuchsia-400 to-pink-300',
  'from-cyan-300 to-blue-400',
]

// Tailwind only sees classes written out literally, so each option maps to a full class string.
const COLUMN_OPTIONS = [
  { value: 2, label: '2 ustun', className: 'grid-cols-2' },
  { value: 3, label: '3 ustun', className: 'grid-cols-3' },
  { value: 4, label: '4 ustun', className: 'grid-cols-4' },
]

const GAP_OPTIONS = [
  { value: 'sm', label: 'Kichik', className: 'gap-2' },
  { value: 'md', label: "O'rta", className: 'gap-4' },
  { value: 'lg', label: 'Katta', className: 'gap-8' },
]

function OptionGroup({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-stone-400">{label}</span>
      <div className="flex gap-1 rounded-xl bg-stone-800 p-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              option.value === value ? 'bg-amber-500 text-stone-900' : 'text-stone-300 hover:bg-stone-700'
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function PhotoGalleryGridProject() {
  const [columns, setColumns] = useState(3)
  const [gap, setGap] = useState('md')

  const columnClass = COLUMN_OPTIONS.find((option) => option.value === columns).className
  const gapClass = GAP_OPTIONS.find((option) => option.value === gap).className

  return (
    <div className="min-h-screen bg-stone-900 px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-3xl font-bold text-white">Rasmlar galereyasi</h1>
        <p className="mt-3 text-center text-stone-400">
          Ustunlar soni va oraliqni o'zgartiring — bu <code className="text-amber-400">grid-cols</code> va{' '}
          <code className="text-amber-400">gap</code> ishlashini ko'rsatadi.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <OptionGroup label="Ustunlar" options={COLUMN_OPTIONS} value={columns} onChange={setColumns} />
          <OptionGroup label="Oraliq" options={GAP_OPTIONS} value={gap} onChange={setGap} />
        </div>

        <div className={cn('mt-10 grid', columnClass, gapClass)}>
          {TILES.map((gradient, index) => (
            <div
              key={gradient}
              className={cn(
                'flex aspect-square items-end rounded-2xl bg-gradient-to-br p-3 text-sm font-semibold text-white/90 shadow-lg',
                gradient
              )}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
