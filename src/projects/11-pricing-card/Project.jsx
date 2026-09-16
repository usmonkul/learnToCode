import { Check, Tag } from 'lucide-react'
import { cn } from '@/lib/cn'

const PLANS = [
  {
    name: "Boshlang'ich",
    price: '0',
    features: ['1 loyiha', "Asosiy qo'llab-quvvatlash", 'Jamoat forumi'],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '99 000',
    features: ['Cheksiz loyihalar', "Ustuvor qo'llab-quvvatlash", 'Jamoaviy ishlash', 'Maxsus domenlar'],
    highlighted: true,
  },
  {
    name: 'Biznes',
    price: '249 000',
    features: ['Pro tarifidagi hammasi', 'SLA kafolati', 'Shaxsiy menejer'],
    highlighted: false,
  },
]

export default function PricingCardProject() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-50 px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white">
        <Tag className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Tariflar</h1>
      <p className="mt-2 max-w-sm text-center text-slate-500">Sizga mos tarifni tanlang.</p>

      <div className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              'flex flex-col rounded-3xl p-6 shadow-xl',
              plan.highlighted ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
            )}
          >
            <h2 className="text-lg font-bold">{plan.name}</h2>
            <p className="mt-4 text-3xl font-bold">
              {plan.price} <span className="text-sm font-normal opacity-60">so'm/oy</span>
            </p>
            <ul className="mt-6 flex flex-1 flex-col gap-3 text-sm">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className={cn('h-4 w-4 shrink-0', plan.highlighted ? 'text-emerald-400' : 'text-emerald-600')} />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={cn(
                'mt-6 rounded-full px-6 py-2.5 text-sm font-semibold',
                plan.highlighted ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
              )}
            >
              Tanlash
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
