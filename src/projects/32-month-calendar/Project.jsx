import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

const MONTHS = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
  'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr',
]
const WEEKDAYS = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya']

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export default function MonthCalendarProject() {
  const today = new Date()
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const [selected, setSelected] = useState(null)

  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()
  // getDay() is 0 for Sunday; shift so the week starts on Monday (Du).
  const offset = (new Date(view.year, view.month, 1).getDay() + 6) % 7

  function changeMonth(delta) {
    const next = new Date(view.year, view.month + delta, 1)
    setView({ year: next.getFullYear(), month: next.getMonth() })
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-900 px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl bg-zinc-800 p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <button
            onClick={() => changeMonth(-1)}
            aria-label="Oldingi oy"
            className="rounded-full p-2 text-zinc-300 hover:bg-zinc-700"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="font-semibold text-white">
            {MONTHS[view.month]} {view.year}
          </h1>
          <button
            onClick={() => changeMonth(1)}
            aria-label="Keyingi oy"
            className="rounded-full p-2 text-zinc-300 hover:bg-zinc-700"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((day) => (
            <span key={day} className="py-2 text-xs font-semibold text-zinc-500">
              {day}
            </span>
          ))}

          {Array.from({ length: daysInMonth }, (_, index) => {
            const date = new Date(view.year, view.month, index + 1)
            const isSelected = selected && isSameDay(date, selected)
            return (
              <button
                key={index}
                // Only day 1 needs an explicit column: the rest auto-place after it.
                style={index === 0 ? { gridColumnStart: offset + 1 } : undefined}
                onClick={() => setSelected(date)}
                className={cn(
                  'aspect-square rounded-full text-sm transition-colors',
                  isSelected ? 'bg-teal-500 font-semibold text-zinc-900' : 'text-zinc-200 hover:bg-zinc-700',
                  isSameDay(date, today) && !isSelected && 'ring-2 ring-teal-300'
                )}
              >
                {index + 1}
              </button>
            )
          })}
        </div>

        <p className="mt-4 h-5 text-center text-sm text-zinc-400">
          {selected
            ? `Tanlangan sana: ${selected.getDate()} ${MONTHS[selected.getMonth()]} ${selected.getFullYear()}`
            : 'Sanani tanlang'}
        </p>
      </div>
    </div>
  )
}
