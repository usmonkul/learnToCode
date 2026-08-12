import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function Disclosure({ summary, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-md border border-line">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm font-medium text-ink"
      >
        {summary}
        <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="border-t border-line px-4 py-3 text-sm">{children}</div>}
    </div>
  )
}
