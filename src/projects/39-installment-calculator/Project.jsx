import { useState } from 'react'
import { CreditCard } from 'lucide-react'
import { cn } from '@/lib/cn'

const MONTH_OPTIONS = [3, 6, 12, 24]

function formatSum(value) {
  return Math.round(value).toLocaleString('ru-RU')
}

export default function InstallmentCalculatorProject() {
  const [price, setPrice] = useState('')
  const [downPayment, setDownPayment] = useState('')
  const [months, setMonths] = useState(6)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const priceValue = Number(price)
    const downValue = Number(downPayment) || 0

    if (!price || priceValue <= 0) {
      setResult(null)
      setError('Iltimos, mahsulot narxini kiriting.')
      return
    }
    if (downValue < 0 || downValue >= priceValue) {
      setResult(null)
      setError("Boshlang'ich to'lov narxdan kichik bo'lishi kerak.")
      return
    }

    const remaining = priceValue - downValue
    setError('')
    setResult({ remaining, monthly: remaining / months, months })
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-violet-50 px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-200">
        <CreditCard className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Nasiya hisoblagich</h1>
      <p className="mt-2 max-w-sm text-center text-slate-500">Bo'lib to'lashda har oy qancha to'lashingizni bilib oling.</p>

      <form onSubmit={handleSubmit} className="mt-10 flex w-full max-w-sm flex-col gap-4 rounded-3xl bg-white p-6 shadow-xl shadow-violet-100">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Mahsulot narxi (so'm)</span>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Masalan: 6000000"
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Boshlang'ich to'lov (so'm)</span>
          <input
            type="number"
            min="0"
            value={downPayment}
            onChange={(event) => setDownPayment(event.target.value)}
            placeholder="0"
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          />
        </label>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Muddat</span>
          <div className="grid grid-cols-4 gap-2">
            {MONTH_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMonths(option)}
                className={cn(
                  'rounded-xl py-2 text-sm font-semibold',
                  months === option ? 'bg-violet-600 text-white' : 'bg-violet-50 text-violet-700 hover:bg-violet-100'
                )}
              >
                {option} oy
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" className="rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-700">
          Hisoblash
        </button>

        {result && (
          <div className="mt-2 rounded-2xl bg-violet-600 p-5 text-center text-white">
            <p className="text-sm text-violet-100">Har oy to'lov</p>
            <p className="mt-1 text-3xl font-bold">{formatSum(result.monthly)} so'm</p>
            <p className="mt-2 text-xs text-violet-200">
              {result.months} oy davomida, jami qoldiq {formatSum(result.remaining)} so'm
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
