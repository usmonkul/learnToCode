import { useState } from 'react'
import { BadgePercent } from 'lucide-react'

function formatSum(value) {
  return Math.round(value).toLocaleString('ru-RU')
}

export default function DiscountCalculatorProject() {
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const priceValue = Number(price)
    const discountValue = Number(discount)

    if (!price || !discount || priceValue <= 0) {
      setResult(null)
      setError('Iltimos, narx va chegirma foizini kiriting.')
      return
    }
    if (discountValue < 0 || discountValue > 100) {
      setResult(null)
      setError("Chegirma 0 dan 100 gacha bo'lishi kerak.")
      return
    }

    const saved = (priceValue * discountValue) / 100
    setError('')
    setResult({ oldPrice: priceValue, saved, newPrice: priceValue - saved })
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-orange-50 px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg shadow-orange-200">
        <BadgePercent className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Chegirma hisoblagich</h1>
      <p className="mt-2 max-w-sm text-center text-slate-500">Do'kondagi chegirmadan keyin qancha to'lashingizni bilib oling.</p>

      <form onSubmit={handleSubmit} className="mt-10 flex w-full max-w-sm flex-col gap-4 rounded-3xl bg-white p-6 shadow-xl shadow-orange-100">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Narxi (so'm)</span>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Masalan: 250000"
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-700">Chegirma (%)</span>
          <input
            type="number"
            min="0"
            max="100"
            value={discount}
            onChange={(event) => setDiscount(event.target.value)}
            placeholder="Masalan: 20"
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" className="rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-700">
          Hisoblash
        </button>

        {result && (
          <div className="mt-2 flex flex-col gap-3 border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Eski narx</span>
              <span className="text-slate-400 line-through">{formatSum(result.oldPrice)} so'm</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Tejaysiz</span>
              <span className="font-semibold text-emerald-600">−{formatSum(result.saved)} so'm</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-orange-50 px-4 py-3">
              <span className="text-sm font-medium text-slate-700">Yangi narx</span>
              <span className="text-2xl font-bold text-orange-600">{formatSum(result.newPrice)} so'm</span>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
