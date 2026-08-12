import { CheckCircle2 } from 'lucide-react'

export default function KeyPoints({ children }) {
  return (
    <div className="not-prose my-6 rounded-lg border border-line bg-canvas-muted p-5">
      <p className="mb-3 flex items-center gap-2 font-semibold text-ink">
        <CheckCircle2 className="h-5 w-5 text-brand-600" />
        Asosiy fikrlar
      </p>
      <ul className="flex flex-col gap-2 text-sm text-ink-muted">{children}</ul>
    </div>
  )
}
