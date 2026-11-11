import { useState } from 'react'
import { Fuel } from 'lucide-react'

const FIELDS = [
  { key: 'distance', label: 'Masofa (km)', placeholder: 'Masalan: 300' },
  { key: 'consumption', label: "Sarf (litr / 100 km)", placeholder: 'Masalan: 8' },
  { key: 'fuelPrice', label: "1 litr narxi (so'm)", placeholder: 'Masalan: 12500' },
]

function formatSum(value) {
  return Math.round(value).toLocaleString('ru-RU')
}

export default function FuelCostCalculatorProject() {
  const [values, setValues] = useState({ distance: '', consumption: '', fuelPrice: '' })
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const distance = Number(values.distance)
    const consumption = Number(values.consumption)
    const fuelPrice = Number(values.fuelPrice)

    if (distance <= 0 || consumption <= 0 || fuelPrice <= 0) {
      setResult(null)
      setError("Iltimos, barcha maydonlarga 0 dan katta son kiriting.")
      return
    }

    const liters = (distance * consumption) / 100
    setError('')
    setResult({ liters, cost: liters * fuelPrice })
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-emerald-50 px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-200">
        <Fuel className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Yo'l xarajati</h1>
      <p className="mt-2 max-w-sm text-center text-slate-500">Safarga chiqishdan oldin yoqilg'i uchun qancha pul kerakligini bilib oling.</p>

      <form onSubmit={handleSubmit} className="mt-10 flex w-full max-w-sm flex-col gap-4 rounded-3xl bg-white p-6 shadow-xl shadow-emerald-100">
        {FIELDS.map((field) => (
          <label key={field.key} className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">{field.label}</span>
            <input
              type="number"
              min="0"
              value={values[field.key]}
              onChange={(event) => setValues((prev) => ({ ...prev, [field.key]: event.target.value }))}
              placeholder={field.placeholder}
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </label>
        ))}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700">
          Hisoblash
        </button>

        {result && (
          <div className="mt-2 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-2xl bg-emerald-50 px-3 py-4">
              <p className="text-2xl font-bold text-emerald-700">{result.liters.toFixed(1)}</p>
              <p className="mt-1 text-xs text-slate-500">litr yoqilg'i</p>
            </div>
            <div className="rounded-2xl bg-emerald-600 px-3 py-4 text-white">
              <p className="text-2xl font-bold">{formatSum(result.cost)}</p>
              <p className="mt-1 text-xs text-emerald-100">so'm</p>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
