import { useState } from 'react'
import { Zap } from 'lucide-react'

function formatSum(value) {
  return Math.round(value).toLocaleString('ru-RU')
}

export default function ElectricityBillProject() {
  const [previous, setPrevious] = useState('')
  const [current, setCurrent] = useState('')
  const [tariff, setTariff] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const previousValue = Number(previous)
    const currentValue = Number(current)
    const tariffValue = Number(tariff)

    if (!previous || !current || !tariff) {
      setResult(null)
      setError("Iltimos, barcha maydonlarni to'ldiring.")
      return
    }
    if (currentValue < previousValue) {
      setResult(null)
      setError("Hozirgi ko'rsatkich oldingisidan kichik bo'lishi mumkin emas.")
      return
    }

    const used = currentValue - previousValue
    setError('')
    setResult({ used, total: used * tariffValue })
  }

  const inputClass =
    'w-full rounded-full border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20'

  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-950 px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-400/20">
        <Zap className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-white">Elektr to'lovi</h1>
      <p className="mt-2 max-w-sm text-center text-slate-400">Oylik elektr energiyasi uchun to'lovni hisoblang.</p>

      <form onSubmit={handleSubmit} className="mt-10 flex w-full max-w-sm flex-col gap-4 rounded-3xl bg-slate-800 p-6 shadow-xl">
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-300">Oldingi</span>
            <input type="number" min="0" value={previous} onChange={(event) => setPrevious(event.target.value)} placeholder="12450" className={inputClass} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-300">Hozirgi</span>
            <input type="number" min="0" value={current} onChange={(event) => setCurrent(event.target.value)} placeholder="12680" className={inputClass} />
          </label>
        </div>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-slate-300">Tarif (so'm / kVt·soat)</span>
          <input type="number" min="0" value={tariff} onChange={(event) => setTariff(event.target.value)} placeholder="Masalan: 600" className={inputClass} />
        </label>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button type="submit" className="rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-yellow-300">
          Hisoblash
        </button>

        {result && (
          <div className="mt-2 flex flex-col gap-3 border-t border-slate-700 pt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Ishlatildi</span>
              <span className="font-semibold text-white">{result.used} kVt·soat</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-900 px-4 py-3">
              <span className="text-sm text-slate-300">To'lov</span>
              <span className="text-2xl font-bold text-yellow-400">{formatSum(result.total)} so'm</span>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
