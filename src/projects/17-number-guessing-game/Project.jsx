import { useState } from 'react'
import { Target, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/cn'

const MAX_ATTEMPTS = 7

function randomNumber() {
  return Math.floor(Math.random() * 100) + 1
}

export default function NumberGuessingGameProject() {
  const [secret, setSecret] = useState(randomNumber)
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [status, setStatus] = useState('playing')
  const [message, setMessage] = useState("Boshlash uchun 1 dan 100 gacha son tanlang.")

  function resetGame() {
    setSecret(randomNumber())
    setGuess('')
    setAttempts(0)
    setStatus('playing')
    setMessage("Boshlash uchun 1 dan 100 gacha son tanlang.")
  }

  function handleGuess(event) {
    event.preventDefault()
    if (status !== 'playing') return

    const value = Number(guess)
    if (!guess || Number.isNaN(value) || value < 1 || value > 100) {
      setMessage('Iltimos, 1 dan 100 gacha to‘g‘ri son kiriting.')
      return
    }

    const nextAttempts = attempts + 1
    setAttempts(nextAttempts)

    if (value === secret) {
      setStatus('won')
      setMessage(`Ajoyib! Siz ${nextAttempts}-urinishda sonni topdingiz!`)
      return
    }

    if (nextAttempts >= MAX_ATTEMPTS) {
      setStatus('lost')
      setMessage(`Afsuski, urinishlar tugadi. Yashiringan son ${secret} edi.`)
      return
    }

    setMessage(value < secret ? 'Juda kichik! Yana urinib ko‘ring.' : 'Juda katta! Yana urinib ko‘ring.')
    setGuess('')
  }

  const isOver = status !== 'playing'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-20">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-600 text-white shadow-lg shadow-slate-200">
          <Target className="h-7 w-7" />
        </span>
        <h1 className="mt-4 text-center text-3xl font-extrabold text-slate-900">Sonni Top</h1>
        <p className="mt-2 text-center text-slate-500">1 dan 100 gacha sirli sonni toping.</p>

        <div className="mt-8 flex items-center justify-between rounded-2xl bg-slate-100 px-6 py-4">
          <span className="font-medium text-slate-500">Urinishlar</span>
          <span className="text-2xl font-bold text-slate-900">
            {attempts} / {MAX_ATTEMPTS}
          </span>
        </div>

        <p
          className={cn(
            'mt-5 text-center text-sm font-medium',
            status === 'won' && 'text-emerald-600',
            status === 'lost' && 'text-red-600',
            status === 'playing' && 'text-slate-900'
          )}
        >
          {message}
        </p>

        <form onSubmit={handleGuess} className="mt-5 flex flex-col gap-3">
          <input
            type="number"
            min={1}
            max={100}
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
            disabled={isOver}
            placeholder="Taxminingizni kiriting"
            className="w-full rounded-2xl border border-slate-300 px-6 py-4 text-center text-lg text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/20 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isOver}
            className="w-full rounded-2xl bg-slate-600 py-4 font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Topish
          </button>
        </form>

        <button
          onClick={resetGame}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 py-4 font-semibold text-slate-700 hover:bg-slate-50"
        >
          <RotateCcw className="h-4 w-4" />
          O'yinni qayta boshlash
        </button>
      </div>
    </div>
  )
}
