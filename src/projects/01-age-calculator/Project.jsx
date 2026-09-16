import { useState } from 'react'
import { Cake } from 'lucide-react'

// This project renders a full, standalone page — deliberately not using
// Yaratuvchi.uz's brand tokens or dark-mode variants, since it's meant to
// feel like its own independent site, not a themed page inside the app.

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function calculateAge(birthDate, today) {
  let years = today.getFullYear() - birthDate.getFullYear()
  let months = today.getMonth() - birthDate.getMonth()
  let days = today.getDate() - birthDate.getDate()

  if (days < 0) {
    months -= 1
    days += daysInMonth(today.getFullYear(), today.getMonth() - 1)
  }
  if (months < 0) {
    years -= 1
    months += 12
  }

  const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24))

  let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
  if (nextBirthday < today) nextBirthday = new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate())
  const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24))

  return { years, months, days, totalDays, daysUntilBirthday }
}

export default function AgeCalculatorProject() {
  const [birthDateInput, setBirthDateInput] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setResult(null)

    if (!birthDateInput) {
      setError("Iltimos, tug'ilgan kuningizni tanlang.")
      return
    }

    const birthDate = new Date(`${birthDateInput}T00:00:00`)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (birthDate > today) {
      setError("Tug'ilgan kun kelajakda bo'lishi mumkin emas.")
      return
    }

    setError('')
    setResult(calculateAge(birthDate, today))
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-indigo-50 via-white to-white px-4 py-20">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200">
          <Cake className="h-7 w-7" />
        </span>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Yosh hisoblagich</h1>
        <p className="mt-2 max-w-sm text-slate-500">Tug'ilgan kuningizni kiriting va yoshingizni bilib oling.</p>
      </div>

      <div className="mt-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">Tug'ilgan kuningiz</span>
            <input
              type="date"
              value={birthDateInput}
              onChange={(event) => setBirthDateInput(event.target.value)}
              max={new Date().toISOString().slice(0, 10)}
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <Cake className="h-4 w-4" />
            Hisoblash
          </button>
        </form>

        {result && (
          <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-6">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-indigo-50 px-2 py-4">
                <p className="text-2xl font-semibold text-indigo-700">{result.years}</p>
                <p className="mt-1 text-xs text-slate-500">yil</p>
              </div>
              <div className="rounded-2xl bg-indigo-50 px-2 py-4">
                <p className="text-2xl font-semibold text-indigo-700">{result.months}</p>
                <p className="mt-1 text-xs text-slate-500">oy</p>
              </div>
              <div className="rounded-2xl bg-indigo-50 px-2 py-4">
                <p className="text-2xl font-semibold text-indigo-700">{result.days}</p>
                <p className="mt-1 text-xs text-slate-500">kun</p>
              </div>
            </div>
            <p className="text-sm text-slate-500">
              Siz dunyoda jami <span className="font-semibold text-slate-900">{result.totalDays.toLocaleString('uz-UZ')}</span>{' '}
              kun yashadingiz.
            </p>
            <p className="text-sm text-slate-500">
              Keyingi tug'ilgan kuningizgacha{' '}
              <span className="font-semibold text-slate-900">{result.daysUntilBirthday}</span> kun qoldi.
            </p>
          </div>
        )}
      </div>

      <p className="mt-12 text-xs text-slate-400">Yaratuvchi.uz loyihasi</p>
    </div>
  )
}
