import { Check } from 'lucide-react'
import { useArenaStore } from '@/store/arenaStore'
import HintReveal from '@/components/arena/HintReveal'

function formatCall(challenge, args) {
  const paramNames = challenge.paramNames ?? args.map((_, i) => `arg${i + 1}`)
  return paramNames.map((name, i) => `${name} = ${JSON.stringify(args[i])}`).join('\n')
}

export default function FunctionChallengeDetail({ challenge, topicId }) {
  const isSolved = useArenaStore((state) => state.isSolved(topicId, challenge.slug))

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-3">
        <h2 className="font-heading text-2xl text-ink">{challenge.title}</h2>
        {isSolved && (
          <span className="flex items-center gap-1.5 rounded-full bg-brand2-100 px-3 py-1 text-xs font-medium text-brand2-800 dark:bg-brand2-950 dark:text-brand2-400">
            <Check className="h-3.5 w-3.5" />
            Yechilgan
          </span>
        )}
      </div>

      <p className="mt-3 whitespace-pre-line text-sm text-ink">{challenge.prompt}</p>

      {challenge.examples.map((example, index) => (
        <div key={index} className="mt-4">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-[.1em] text-ink-muted">
            Misol {index + 1}
          </p>
          <pre className="whitespace-pre-wrap rounded-2xl bg-canvas-muted px-4 py-2.5 font-mono text-sm text-ink">
            {formatCall(challenge, example.args)}
          </pre>
          <p className="mb-1.5 mt-2 text-xs font-medium uppercase tracking-[.1em] text-ink-muted">
            Kutilgan natija
          </p>
          <pre className="whitespace-pre-wrap rounded-2xl bg-canvas-muted px-4 py-2.5 font-mono text-sm text-ink">
            {JSON.stringify(example.expected)}
          </pre>
        </div>
      ))}

      {challenge.hint && <HintReveal hint={challenge.hint} />}
    </div>
  )
}
