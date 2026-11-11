import { useEffect, useRef, useState } from 'react'
import { MessageSquareLock } from 'lucide-react'
import { cn } from '@/lib/cn'

const LENGTH = 6
const CORRECT_CODE = '123456' // demo uchun — haqiqiy ilovada server tekshiradi
const RESEND_SECONDS = 30

const emptyCode = () => Array(LENGTH).fill('')

export default function OtpInputProject() {
  const [digits, setDigits] = useState(emptyCode)
  const [status, setStatus] = useState('idle') // idle | success | error
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const inputsRef = useRef([])

  // Qayta yuborish taymeri
  useEffect(() => {
    if (secondsLeft === 0) return
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearInterval(timer)
  }, [secondsLeft])

  function focusInput(index) {
    inputsRef.current[index]?.focus()
  }

  function handleChange(index, value) {
    const digit = value.replace(/\D/g, '').slice(-1) // faqat oxirgi raqam
    const next = [...digits]
    next[index] = digit
    setDigits(next)
    setStatus('idle')
    if (digit && index < LENGTH - 1) focusInput(index + 1)
  }

  function handleKeyDown(index, event) {
    if (event.key === 'Backspace' && !digits[index] && index > 0) focusInput(index - 1)
    if (event.key === 'ArrowLeft' && index > 0) focusInput(index - 1)
    if (event.key === 'ArrowRight' && index < LENGTH - 1) focusInput(index + 1)
  }

  function handlePaste(event) {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, LENGTH)
    if (!pasted) return
    const next = emptyCode().map((_, i) => pasted[i] ?? '')
    setDigits(next)
    setStatus('idle')
    focusInput(Math.min(pasted.length, LENGTH - 1))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setStatus(digits.join('') === CORRECT_CODE ? 'success' : 'error')
  }

  function resend() {
    setDigits(emptyCode())
    setStatus('idle')
    setSecondsLeft(RESEND_SECONDS)
    focusInput(0)
  }

  const isComplete = digits.every(Boolean)

  return (
    <div className="flex min-h-screen flex-col items-center bg-indigo-50 px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200">
        <MessageSquareLock className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Tasdiqlash kodi</h1>
      <p className="mt-2 max-w-sm text-center text-slate-500">
        +998 90 *** ** 45 raqamiga yuborilgan 6 xonali kodni kiriting.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl shadow-indigo-100">
        <div className="flex justify-between gap-2" onPaste={handlePaste}>
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(element) => (inputsRef.current[index] = element)}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={digit}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              onFocus={(event) => event.target.select()}
              aria-label={`${index + 1}-raqam`}
              className={cn(
                'h-14 w-12 rounded-xl border-2 bg-slate-50 text-center text-2xl font-bold text-slate-900 focus:outline-none',
                status === 'error' && 'border-red-500',
                status === 'success' && 'border-green-500',
                status === 'idle' && 'border-slate-200 focus:border-indigo-500'
              )}
            />
          ))}
        </div>

        {status === 'error' && <p className="mt-4 text-center text-sm text-red-600">Kod noto'g'ri. Qaytadan urinib ko'ring.</p>}
        {status === 'success' && <p className="mt-4 text-center text-sm font-medium text-green-600">Kod tasdiqlandi ✓</p>}

        <button
          type="submit"
          disabled={!isComplete}
          className="mt-6 w-full rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Tasdiqlash
        </button>

        <p className="mt-4 text-center text-sm text-slate-500">
          {secondsLeft > 0 ? (
            <>Kodni qayta yuborish: 0:{String(secondsLeft).padStart(2, '0')}</>
          ) : (
            <button type="button" onClick={resend} className="font-semibold text-indigo-600 hover:underline">
              Kodni qayta yuborish
            </button>
          )}
        </p>
      </form>

      <p className="mt-6 text-xs text-slate-400">Demo kod: {CORRECT_CODE}</p>
    </div>
  )
}
