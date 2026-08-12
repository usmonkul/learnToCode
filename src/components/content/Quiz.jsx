import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function Quiz({ question, options, correctIndex, explanation }) {
  const [selected, setSelected] = useState(null)
  const answered = selected !== null
  const isCorrect = selected === correctIndex

  return (
    <div className="not-prose my-6 rounded-lg border border-line bg-canvas p-5">
      <p className="mb-3 font-semibold text-ink">{question}</p>
      <div className="flex flex-col gap-2">
        {options.map((option, index) => {
          const isSelected = selected === index
          const showCorrect = answered && index === correctIndex
          const showWrong = answered && isSelected && !isCorrect

          return (
            <button
              key={option}
              type="button"
              disabled={answered}
              onClick={() => setSelected(index)}
              className={cn(
                'flex items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors',
                'border-line hover:border-brand-300',
                showCorrect && 'border-emerald-400 bg-emerald-50',
                showWrong && 'border-red-400 bg-red-50',
                answered && !showCorrect && !showWrong && 'opacity-60'
              )}
            >
              <span>{option}</span>
              {showCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
              {showWrong && <XCircle className="h-4 w-4 text-red-600" />}
            </button>
          )
        })}
      </div>
      {answered && explanation && <p className="mt-3 text-sm text-ink-muted">{explanation}</p>}
    </div>
  )
}
