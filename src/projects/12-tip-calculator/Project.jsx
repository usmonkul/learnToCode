import { useState } from 'react'
import { Receipt, Users } from 'lucide-react'
import { cn } from '@/lib/cn'

const TIP_OPTIONS = [5, 10, 15, 25, 50]

export default function TipCalculatorProject() {
  const [bill, setBill] = useState('')
  const [tipPercent, setTipPercent] = useState(15)
  const [customTip, setCustomTip] = useState('')
  const [people, setPeople] = useState('1')

  const billValue = parseFloat(bill) || 0
  const tipValue = customTip !== '' ? parseFloat(customTip) || 0 : tipPercent
  const peopleValue = Math.max(1, parseInt(people, 10) || 1)

  const tipPerPerson = (billValue * (tipValue / 100)) / peopleValue
  const totalPerPerson = billValue / peopleValue + tipPerPerson

  function reset() {
    setBill('')
    setTipPercent(15)
    setCustomTip('')
    setPeople('1')
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-lime-50 px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lime-600 text-white shadow-lg shadow-lime-200">
        <Receipt className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Choy puli kalkulyatori</h1>
      <p className="mt-2 max-w-sm text-center text-slate-500">Hisobni bo'lib, har kishi ulushini hisoblang.</p>

      <div className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-6 rounded-3xl bg-white p-6 shadow-2xl md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">Hisob summasi</span>
            <input
              type="number"
              min="0"
              value={bill}
              onChange={(event) => setBill(event.target.value)}
              placeholder="0"
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/20"
            />
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-slate-700">Choy puli foizi</span>
            <div className="grid grid-cols-3 gap-2">
              {TIP_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setTipPercent(option)
                    setCustomTip('')
                  }}
                  className={cn(
                    'rounded-xl px-3 py-2 text-sm font-semibold',
                    tipPercent === option && customTip === ''
                      ? 'bg-lime-600 text-white'
                      : 'bg-lime-50 text-lime-700 hover:bg-lime-100'
                  )}
                >
                  {option}%
                </button>
              ))}
              <input
                type="number"
                min="0"
                value={customTip}
                onChange={(event) => setCustomTip(event.target.value)}
                placeholder="Boshqa"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center text-sm text-slate-900 focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/20"
              />
            </div>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
              <Users className="h-4 w-4" /> Odamlar soni
            </span>
            <input
              type="number"
              min="1"
              value={people}
              onChange={(event) => setPeople(event.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500/20"
            />
          </label>
        </div>

        <div className="flex flex-col justify-between rounded-2xl bg-slate-900 p-6">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Choy puli / kishi</span>
              <span className="font-mono text-2xl font-bold text-lime-400">{tipPerPerson.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Jami / kishi</span>
              <span className="font-mono text-2xl font-bold text-lime-400">{totalPerPerson.toFixed(2)}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-full bg-lime-500 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-lime-400"
          >
            Tozalash
          </button>
        </div>
      </div>
    </div>
  )
}
