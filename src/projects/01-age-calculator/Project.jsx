import { useState } from 'react'
import { Cake } from 'lucide-react'

// This project renders a full, standalone page — deliberately not using
// Yaratuvchi.uz's brand tokens or dark-mode variants, since it's meant to
// feel like its own independent site, not a themed page inside the app.

export default function AgeCalculatorProject() {
  const [birthYear, setBirthYear] = useState('')
  const [age, setAge] = useState(null)
  const [error, setError] = useState('')

  const currentYear = new Date().getFullYear()

  function handleSubmit(event) {
    event.preventDefault()
    setAge(null)

    const year = Number(birthYear)

    if (!birthYear) {
      setError("Iltimos, tug'ilgan yilingizni kiriting.")
      return
    }
    if (year > currentYear) {
      setError("Tug'ilgan yil kelajakda bo'lishi mumkin emas.")
      return
    }
    if (year < 1900) {
      setError("Iltimos, to'g'ri yil kiriting (1900 dan katta).")
      return
    }

    setError('')
    setAge(currentYear - year)
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-indigo-50 via-white to-white px-4 py-20">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200">
          <Cake className="h-7 w-7" />
        </span>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Yosh hisoblagich</h1>
        <p className="mt-2 max-w-sm text-slate-500">Tug'ilgan yilingizni kiriting va yoshingizni bilib oling.</p>
      </div>

      <div className="mt-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">Tug'ilgan yilingiz</span>
            <input
              type="number"
              value={birthYear}
              onChange={(event) => setBirthYear(event.target.value)}
              placeholder={`Masalan: ${currentYear - 20}`}
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

        {age !== null && (
          <div className="mt-6 border-t border-slate-100 pt-6 text-center">
            <p className="text-sm text-slate-500">Siz</p>
            <p className="mt-1 text-5xl font-bold text-indigo-700">{age}</p>
            <p className="mt-1 text-sm text-slate-500">yoshdasiz</p>
          </div>
        )}
      </div>

      <p className="mt-12 text-xs text-slate-400">Yaratuvchi.uz loyihasi</p>
    </div>
  )
}
