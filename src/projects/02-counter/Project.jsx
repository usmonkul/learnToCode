import { useState } from 'react'
import { Minus, Plus, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function CounterProject() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-700 px-4 py-20">
      <h1 className="text-3xl font-bold text-white">Hisoblagich</h1>
      <p className="mt-2 text-emerald-100">Tugmalarni bosib sonni oshiring yoki kamaytiring.</p>

      <div className="mt-10 flex flex-col items-center gap-8 rounded-3xl bg-white/10 px-12 py-10 backdrop-blur">
        <p
          className={cn(
            'text-7xl font-bold tabular-nums',
            count > 0 ? 'text-emerald-300' : count < 0 ? 'text-red-300' : 'text-white'
          )}
        >
          {count}
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCount((c) => c - 1)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <Minus className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCount(0)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-emerald-700 hover:bg-emerald-50"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>

      <p className="mt-12 text-xs text-emerald-100/70">Yaratuvchi.uz loyihasi</p>
    </div>
  )
}
