import { useEffect, useState } from 'react'
import { getSqlEngine } from '@/lib/sqlEngine'
import { cn } from '@/lib/cn'

export default function ChallengeDetail({ challenge, schema }) {
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
    <div className="border-t border-line bg-canvas-muted px-4 py-4">
      <p className="whitespace-pre-line text-sm text-ink">{challenge.prompt}</p>

      {error && (
        <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          Kutilgan natijani hisoblashda xatolik: {error}
        </p>
      )}

      {expected && !error && (
        <div className="mt-3">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-muted">
            Kutilgan natija
          </p>
          <div className="max-h-80 overflow-auto rounded-md border border-line bg-canvas">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-canvas-muted text-ink-muted">
                <tr>
                  {expected.columns.map((column) => (
                    <th key={column} className="whitespace-nowrap px-3 py-2 font-medium">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {expected.values.map((row, rowIndex) => (
                  <tr key={rowIndex} className={cn(rowIndex > 0 && 'border-t border-line')}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="whitespace-nowrap px-3 py-2 text-ink">
                        {cell === null ? <span className="text-ink-muted italic">NULL</span> : String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {expected.values.length === 0 && (
              <p className="px-3 py-2 text-sm text-ink-muted">Natija topilmadi (0 qator).</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
