import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { getSqlEngine } from '@/lib/sqlEngine'
import { useArenaStore } from '@/store/arenaStore'
import HintReveal from '@/components/arena/HintReveal'
import { cn } from '@/lib/cn'

export default function ChallengeDetail({ challenge, topicId, schema }) {
  const isSolved = useArenaStore((state) => state.isSolved(topicId, challenge.slug))
  const [expected, setExpected] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setExpected(null)
    setError(null)

    getSqlEngine()
      .then((SQL) => {
        if (cancelled) return
        const db = new SQL.Database()
        try {
          db.run(schema)
          const output = db.exec(challenge.solutionQuery)
          setExpected(output[0] ?? { columns: [], values: [] })
        } catch (err) {
          setError(err.message)
        } finally {
          db.close()
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })

    return () => {
      cancelled = true
    }
  }, [challenge, schema])

  return (
    <div className="px-4 py-4">
      {isSolved && (
        <span className="mb-3 flex w-fit items-center gap-1.5 rounded-full bg-brand2-100 px-3 py-1 text-xs font-medium text-brand2-800 dark:bg-brand2-950 dark:text-brand2-400">
          <Check className="h-3.5 w-3.5" />
          Yechilgan
        </span>
      )}
      <p className="whitespace-pre-line text-sm text-ink">{challenge.prompt}</p>

      {error && (
        <p className="mt-3 rounded-full bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          Kutilgan natijani hisoblashda xatolik: {error}
        </p>
      )}

      {expected && !error && (
        <div className="mt-3">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-[.1em] text-ink-muted">Kutilgan natija</p>
          <div className="max-h-80 overflow-auto rounded-3xl bg-canvas-muted">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-canvas-muted text-ink-muted">
                <tr>
                  {expected.columns.map((column) => (
                    <th key={column} className="whitespace-nowrap px-4 py-2.5 font-medium">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {expected.values.map((row, rowIndex) => (
                  <tr key={rowIndex} className={cn(rowIndex > 0 && 'border-t border-line')}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="whitespace-nowrap px-4 py-2.5 text-ink">
                        {cell === null ? <span className="text-ink-muted italic">NULL</span> : String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {expected.values.length === 0 && (
              <p className="px-4 py-2.5 text-sm text-ink-muted">Natija topilmadi (0 qator).</p>
            )}
          </div>
        </div>
      )}

      {challenge.hint && <HintReveal hint={challenge.hint} />}
    </div>
  )
}
