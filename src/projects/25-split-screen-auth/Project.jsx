import { useState } from 'react'
import { Rocket, CircleCheck } from 'lucide-react'

export default function SplitScreenAuthProject() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="hidden flex-1 flex-col items-center justify-center gap-4 bg-gradient-to-br from-indigo-600 to-violet-700 px-10 py-16 text-center text-white md:flex">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
          <Rocket className="h-8 w-8" />
        </span>
        <h1 className="text-3xl font-bold">Xush kelibsiz</h1>
        <p className="max-w-xs text-white/80">Loyihalaringizni boshqarish uchun hisobingizga kiring.</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-16">
        <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-5">
          <div className="flex flex-col gap-1 md:hidden">
            <h1 className="text-2xl font-bold text-slate-900">Tizimga kirish</h1>
          </div>
          <h2 className="hidden text-2xl font-bold text-slate-900 md:block">Tizimga kirish</h2>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="siz@misol.uz"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Parol
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="********"
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <button type="submit" className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white">
            Kirish
          </button>

          {submitted && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">
              <CircleCheck className="h-4 w-4 shrink-0" />
              Bu demo forma — ma'lumotlar hech qayerga yuborilmaydi.
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
