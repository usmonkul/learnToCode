import { useState } from 'react'
import { GlassWater, Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/cn'

const GOAL = 8
const GLASS_LITERS = 0.25

export default function WaterTrackerProject() {
  const [glasses, setGlasses] = useState(0)

  const percent = Math.min(100, Math.round((glasses / GOAL) * 100))
  const done = glasses >= GOAL

  return (
    <div className="flex min-h-screen flex-col items-center bg-sky-50 px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-600 text-white shadow-lg shadow-sky-200">
        <GlassWater className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Suv ichish trekeri</h1>
      <p className="mt-2 max-w-sm text-center text-slate-500">Kunlik maqsad: {GOAL} stakan (2 litr) suv.</p>

      <div className="mt-10 w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-xl shadow-sky-100">
        <p className="text-5xl font-bold text-sky-600">
          {glasses} <span className="text-xl font-medium text-slate-400">/ {GOAL}</span>
        </p>
        <p className="mt-1 text-sm text-slate-500">{(glasses * GLASS_LITERS).toFixed(2)} litr ichildi</p>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-sky-100">
          <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${percent}%` }} />
        </div>
        <p className="mt-2 text-xs text-slate-400">{percent}%</p>

        <div className="mt-5 grid grid-cols-8 gap-1.5">
          {Array.from({ length: GOAL }, (_, index) => (
            <GlassWater key={index} className={cn('mx-auto h-6 w-6', index < glasses ? 'text-sky-500' : 'text-slate-200')} />
          ))}
        </div>

        <p className={cn('mt-5 text-sm font-medium', done ? 'text-emerald-600' : 'text-slate-500')}>
          {done ? "Barakalla! Bugungi maqsad bajarildi 🎉" : `Yana ${GOAL - glasses} stakan qoldi`}
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setGlasses((count) => Math.max(0, count - 1))}
            disabled={glasses === 0}
            aria-label="Bir stakan ayirish"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-sky-700 hover:bg-sky-100 disabled:opacity-40"
          >
            <Minus className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setGlasses((count) => count + 1)}
            className="flex items-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700"
          >
            <Plus className="h-4 w-4" /> Bir stakan ichdim
          </button>
        </div>

        {glasses > 0 && (
          <button type="button" onClick={() => setGlasses(0)} className="mt-4 text-xs font-medium text-slate-400 hover:text-sky-600">
            Qaytadan boshlash
          </button>
        )}
      </div>
    </div>
  )
}
