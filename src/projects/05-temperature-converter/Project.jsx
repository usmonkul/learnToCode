import { useState } from 'react'
import { Thermometer } from 'lucide-react'

export default function TemperatureConverterProject() {
  const [celsius, setCelsius] = useState('0')

  function handleFahrenheitChange(value) {
    const f = parseFloat(value)
    if (Number.isNaN(f)) {
      setCelsius('')
      return
    }
    setCelsius((((f - 32) * 5) / 9).toFixed(1))
  }

  const c = parseFloat(celsius)
  const fahrenheit = Number.isNaN(c) ? '' : ((c * 9) / 5 + 32).toFixed(1)
  const kelvin = Number.isNaN(c) ? '' : (c + 273.15).toFixed(1)

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-rose-50 to-sky-50 px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-rose-500 to-sky-500 text-white shadow-lg">
        <Thermometer className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Harorat konvertori</h1>
      <p className="mt-2 max-w-sm text-center text-slate-500">
        Selsiy yoki Farengeytda kiriting — ikkalasi bir vaqtda yangilanadi.
      </p>

      <div className="mt-10 w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">Selsiy (°C)</span>
            <input
              type="number"
              value={celsius}
              onChange={(event) => setCelsius(event.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">Farengeyt (°F)</span>
            <input
              type="number"
              value={fahrenheit}
              onChange={(event) => handleFahrenheitChange(event.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </label>
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-center text-sm text-slate-500">
            Kelvin: <span className="font-semibold text-slate-900">{kelvin || '—'} K</span>
          </div>
        </div>
      </div>
    </div>
  )
}
