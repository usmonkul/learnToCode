import { useState, Fragment } from 'react'
import { Truck, Package, ClipboardCheck, Home, Check } from 'lucide-react'
import { cn } from '@/lib/cn'

const STEPS = [
  { label: 'Qabul qilindi', icon: ClipboardCheck },
  { label: 'Tayyorlanmoqda', icon: Package },
  { label: "Yo'lda", icon: Truck },
  { label: 'Yetkazildi', icon: Home },
]

export default function OrderTrackerProject() {
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-20">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl">
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Buyurtma holati</h1>
          <p className="text-sm text-slate-500">#UZ-4821 raqamli buyurtmangiz yo'lda</p>
        </div>

        <div className="mt-10 flex items-center">
          {STEPS.map((step, index) => {
            const isDone = index < currentStep
            const isActive = index === currentStep
            const Icon = step.icon

            return (
              <Fragment key={step.label}>
                <div className="flex flex-col items-center gap-2">
                  <span
                    className={cn(
                      'flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors',
                      isDone && 'bg-emerald-500 text-white',
                      isActive && 'bg-indigo-600 text-white ring-4 ring-indigo-100',
                      !isDone && !isActive && 'bg-slate-100 text-slate-400'
                    )}
                  >
                    {isDone ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </span>
                  <span className="w-20 text-center text-xs font-medium text-slate-500">{step.label}</span>
                </div>

                {index < STEPS.length - 1 && (
                  <div className={cn('mx-1 h-1 flex-1 rounded-full', isDone ? 'bg-emerald-500' : 'bg-slate-200')} />
                )}
              </Fragment>
            )
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentStep((step) => Math.max(0, step - 1))}
            disabled={currentStep === 0}
            className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-40"
          >
            Oldingi
          </button>
          <button
            type="button"
            onClick={() => setCurrentStep((step) => Math.min(STEPS.length - 1, step + 1))}
            disabled={currentStep === STEPS.length - 1}
            className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
          >
            Keyingi bosqich
          </button>
        </div>
      </div>
    </div>
  )
}
