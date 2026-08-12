import { Info, Lightbulb, AlertTriangle, AlertOctagon } from 'lucide-react'
import { cn } from '@/lib/cn'

const VARIANTS = {
  tip: {
    icon: Lightbulb,
    className: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    iconClassName: 'text-emerald-600',
  },
  note: {
    icon: Info,
    className: 'border-brand-200 bg-brand-50 text-brand-900',
    iconClassName: 'text-brand-600',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-amber-200 bg-amber-50 text-amber-900',
    iconClassName: 'text-amber-600',
  },
  danger: {
    icon: AlertOctagon,
    className: 'border-red-200 bg-red-50 text-red-900',
    iconClassName: 'text-red-600',
  },
}

export default function Callout({ type = 'note', title, children }) {
  const variant = VARIANTS[type] ?? VARIANTS.note
  const Icon = variant.icon

  return (
    <div className={cn('not-prose my-6 flex gap-3 rounded-lg border p-4', variant.className)}>
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', variant.iconClassName)} />
      <div className="text-sm leading-relaxed">
        {title && <p className="mb-1 font-semibold">{title}</p>}
        {children}
      </div>
    </div>
  )
}
