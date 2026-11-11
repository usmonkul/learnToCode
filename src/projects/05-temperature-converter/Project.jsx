import { useState } from 'react'
import { Thermometer } from 'lucide-react'
import { cn } from '@/lib/cn'

const MODES = {
  cToF: { from: '°C', to: '°F', label: 'Selsiy → Farengeyt', convert: (c) => (c * 9) / 5 + 32 },
  fToC: { from: '°F', to: '°C', label: 'Farengeyt → Selsiy', convert: (f) => ((f - 32) * 5) / 9 },
}

export default function TemperatureConverterProject() {
  const [mode, setMode] = useState('cToF')
  const [value, setValue] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const current = MODES[mode]

  function changeMode(nextMode) {
    setMode(nextMode)
    setResult(null)
    setError('')
  }

  function handleConvert(event) {
    event.preventDefault()
    const number = parseFloat(value)

    if (Number.isNaN(number)) {
      setResult(null)
      setError('Iltimos, haroratni kiriting.')
      return
    }

    setError('')
    setResult({ input: number, output: current.convert(number) })
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-rose-50 to-sky-50 px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-rose-500 to-sky-500 text-white shadow-lg">
        <Thermometer className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Harorat konvertori</h1>
      <p className="mt-2 max-w-sm text-center text-slate-500">
        Yo'nalishni tanlang, haroratni kiriting va "O'girish" tugmasini bosing.
      </p>

      <div className="mt-10 w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl">
        <div className="grid grid-cols-2 gap-2 rounded-full bg-slate-100 p-1">
          {Object.entries(MODES).map(([key, option]) => (
            <button
              key={key}
              type="button"
              onClick={() => changeMode(key)}
              className={cn(
                'rounded-full px-3 py-2 text-sm font-semibold',
                mode === key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              )}
            >
              {option.from} → {option.to}
            </button>
          ))}
        </div>

        <form onSubmit={handleConvert} className="mt-5 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">{current.label}</span>
            <div className="relative">
              <input
                type="number"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="0"
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 pr-12 text-sm text-slate-900 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                {current.from}
              </span>
            </div>
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="rounded-full bg-gradient-to-r from-rose-500 to-sky-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            O'girish
          </button>
        </form>

        {result && (
          <div className="mt-6 rounded-2xl bg-slate-50 px-4 py-5 text-center">
            <p className="text-sm text-slate-500">
              {result.input} {current.from} =
            </p>
            <p className="mt-1 text-4xl font-bold text-slate-900">
              {result.output.toFixed(1)} {current.to}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
