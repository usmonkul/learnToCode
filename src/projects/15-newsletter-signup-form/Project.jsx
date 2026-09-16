import { useState } from 'react'
import { Mail, Check } from 'lucide-react'
import { cn } from '@/lib/cn'

const PERKS = [
  "Haftalik yangi darslar haqida birinchilardan bo'lib xabar toping",
  'Yangi loyihalar chiqqanda darhol bilib oling',
  'Faqat obunachilar uchun maslahatlar',
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function NewsletterSignupFormProject() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!email.trim()) {
      setError('Iltimos, email manzilingizni kiriting.')
      return
    }
    if (!EMAIL_PATTERN.test(email)) {
      setError("Email manzil to'g'ri formatda emas.")
      return
    }
    setError('')
    setSubmittedEmail(email)
  }

  function reset() {
    setSubmittedEmail('')
    setEmail('')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-20">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        {submittedEmail ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white">
              <Check className="h-7 w-7" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">Rahmat!</h1>
            <p className="text-sm text-slate-500">
              <span className="font-medium text-slate-900">{submittedEmail}</span> manziliga tasdiqlash xati yuborildi.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Orqaga
            </button>
          </div>
        ) : (
          <>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white">
              <Mail className="h-7 w-7" />
            </span>
            <h1 className="mt-4 text-2xl font-bold text-slate-900">Yangiliklarga obuna bo'ling</h1>
            <ul className="mt-4 flex flex-col gap-2">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  {perk}
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-1.5">
              <label htmlFor="newsletter-email" className="text-sm font-medium text-slate-700">
                Email manzil
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="siz@misol.uz"
                className={cn(
                  'w-full rounded-full border bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2',
                  error
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
                )}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                className="mt-3 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Obuna bo'lish
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
