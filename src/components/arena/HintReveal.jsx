import { useState } from 'react'
import { Lightbulb } from 'lucide-react'

export default function HintReveal({ hint }) {
  const [shown, setShown] = useState(false)

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setShown((current) => !current)}
        className="flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-ink"
      >
        <Lightbulb className="h-3.5 w-3.5" />
        {shown ? 'Maslahatni yashirish' : "Maslahat ko'rish"}
      </button>
      {shown && (
        <p className="mt-2 whitespace-pre-line rounded-2xl bg-canvas-muted px-4 py-2.5 text-sm text-ink">{hint}</p>
      )}
    </div>
  )
}
