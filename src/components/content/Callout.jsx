import { Info, Lightbulb, AlertTriangle, AlertOctagon } from 'lucide-react'
import { cn } from '@/lib/cn'

const VARIANTS = {
  tip: {
    icon: Lightbulb,
    className: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
    iconClassName: 'text-emerald-600 dark:text-emerald-400',
  },
  note: {
    icon: Info,
    className: 'border-brand-200 bg-brand-50 text-brand-900 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-200',
    iconClassName: 'text-brand-600 dark:text-brand-400',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200',
    iconClassName: 'text-amber-600 dark:text-amber-400',
  },
  danger: {
    icon: AlertOctagon,
    className: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-200',
    iconClassName: 'text-red-600 dark:text-red-400',
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
