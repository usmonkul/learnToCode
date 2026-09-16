import { useState } from 'react'
import { Scale } from 'lucide-react'
import { cn } from '@/lib/cn'

function categoryFor(bmi) {
  if (bmi < 18.5) return { label: 'Kam vazn', className: 'bg-sky-50 text-sky-600' }
  if (bmi < 25) return { label: 'Normal', className: 'bg-emerald-50 text-emerald-600' }
  if (bmi < 30) return { label: 'Ortiqcha vazn', className: 'bg-amber-50 text-amber-600' }
  return { label: 'Semizlik', className: 'bg-red-50 text-red-600' }
}

export default function BmiCalculatorProject() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    const w = parseFloat(weight)
    const h = parseFloat(height) / 100
    if (!w || !h) return
    setBmi(w / (h * h))
  }

  const category = bmi ? categoryFor(bmi) : null

  return (
    <div className="flex min-h-screen flex-col items-center bg-teal-50 px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg shadow-teal-200">
        <Scale className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">BMI kalkulyatori</h1>
      <p className="mt-2 max-w-sm text-center text-slate-500">
        Vazn va bo'yingizni kiriting — tana-massa indeksingizni bilib oling.
      </p>

      <div className="mt-10 w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl shadow-teal-100">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">Vazn (kg)</span>
            <input
              type="number"
              min="1"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">Bo'y (sm)</span>
            <input
              type="number"
              min="1"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </label>
          <button type="submit" className="rounded-full bg-teal-600 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-700">
            Hisoblash
          </button>
        </form>

        {bmi && (
          <div className="mt-6 flex flex-col items-center gap-2 border-t border-slate-100 pt-6 text-center">
            <p className="text-4xl font-bold text-slate-900">{bmi.toFixed(1)}</p>
            <span className={cn('rounded-full px-3 py-1 text-sm font-medium', category.className)}>{category.label}</span>
          </div>
        )}
      </div>
    </div>
  )
}
