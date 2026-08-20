import { useEffect, useRef, useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { getSqlEngine } from '@/lib/sqlEngine'
import { cn } from '@/lib/cn'

export default function SqlPlayground({ schema, initialQuery = '' }) {
  const engineRef = useRef(null)
  const dbRef = useRef(null)
  const [query, setQuery] = useState(initialQuery)
  const [status, setStatus] = useState('loading')
  const [initError, setInitError] = useState(null)
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState(null)
  const [runError, setRunError] = useState(null)

  useEffect(() => {
    let cancelled = false

    getSqlEngine()
      .then((SQL) => {
        if (cancelled) return
        engineRef.current = SQL
        const db = new SQL.Database()
        db.run(schema)
        dbRef.current = db
        setStatus('ready')
      })
      .catch((error) => {
        if (cancelled) return
        setInitError(error.message)
        setStatus('error')
      })

    return () => {
      cancelled = true
      dbRef.current?.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleRun() {
    const db = dbRef.current
    if (!db) return

    setRunError(null)
    setMessage(null)
    setResult(null)

    try {
      const output = db.exec(query)

      if (output.length > 0) {
        setResult(output[output.length - 1])
      } else {
        setMessage("So'rov muvaffaqiyatli bajarildi. Natijani ko'rish uchun SELECT so'rovini ishga tushiring.")
      }
    } catch (error) {
      setRunError(error.message)
    }
  }

  function handleReset() {
    const SQL = engineRef.current
    if (!SQL) return

    dbRef.current?.close()
    const db = new SQL.Database()
    db.run(schema)
    dbRef.current = db
    setQuery(initialQuery)
    setResult(null)
    setMessage(null)
    setRunError(null)
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-line">
      <div className="flex items-center justify-between border-b border-line bg-canvas-muted px-4 py-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          SQL maydonchasi
        </span>
        <button
          type="button"
          onClick={handleReset}
          disabled={status !== 'ready'}
          className="flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-brand-600 disabled:opacity-50"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Qayta tiklash
        </button>
      </div>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={status !== 'ready'}
        rows={4}
        spellCheck={false}
        aria-label="SQL so'rovi"
        className="w-full resize-y border-b border-line bg-canvas px-4 py-3 font-mono text-sm text-ink outline-none focus:bg-canvas-muted/40 disabled:opacity-50"
      />

      <div className="flex items-center justify-between bg-canvas-muted px-4 py-2">
        <button
          type="button"
          onClick={handleRun}
          disabled={status !== 'ready'}
          className="flex items-center gap-1.5 rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
        >
          <Play className="h-3.5 w-3.5" />
          {status === 'loading' ? 'Yuklanmoqda...' : 'Bajarish'}
        </button>
      </div>

      {status === 'error' && (
        <p className="border-t border-line bg-red-50 px-4 py-3 text-sm text-red-700">
          SQL vositasini yuklab bo'lmadi: {initError}
        </p>
      )}

      {runError && (
        <p className="border-t border-line bg-red-50 px-4 py-3 text-sm text-red-700">{runError}</p>
      )}

      {message && !runError && (
        <p className="border-t border-line bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {message}
        </p>
      )}

      {result && !runError && (
        <div className="overflow-x-auto border-t border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-canvas-muted text-ink-muted">
              <tr>
                {result.columns.map((column) => (
                  <th key={column} className="whitespace-nowrap px-3 py-2 font-medium">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.values.map((row, rowIndex) => (
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
          {result.values.length === 0 && (
            <p className="px-3 py-2 text-sm text-ink-muted">Natija topilmadi (0 qator).</p>
          )}
        </div>
      )}
    </div>
  )
}
