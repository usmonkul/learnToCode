import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, RotateCcw, UploadCloud, ArrowRight } from 'lucide-react'
import { getSqlEngine } from '@/lib/sqlEngine'
import { useArenaStore, solvedKey } from '@/store/arenaStore'
import { cn } from '@/lib/cn'

function normalizeResult(output) {
  return output[output.length - 1] ?? { columns: [], values: [] }
}

export default function SqlPlayground({ challenge, topicId, slug, schema, initialQuery = '', nextChallenge }) {
  const engineRef = useRef(null)
  const dbRef = useRef(null)
  const markSolved = useArenaStore((state) => state.markSolved)
  const solutions = useArenaStore((state) => state.solutions)
  const [query, setQuery] = useState(
    () => useArenaStore.getState().solutions.get(solvedKey(topicId, slug)) ?? initialQuery
  )
  const [status, setStatus] = useState('loading')
  const [initError, setInitError] = useState(null)
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState(null)
  const [runError, setRunError] = useState(null)
  const [checkPassed, setCheckPassed] = useState(null)
  const canSubmit = Boolean(challenge && topicId && slug)

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

  // Saved-solution history loads asynchronously (arenaStore.fetchAll), so on a
  // fresh page load the initializer above can run before it arrives — hydrate
  // it once it shows up, but only if the editor still shows the untouched
  // starter query (don't clobber a query the student is mid-typing).
  useEffect(() => {
    const saved = solutions.get(solvedKey(topicId, slug))
    if (saved) setQuery((current) => (current === initialQuery ? saved : current))
  }, [solutions, topicId, slug, initialQuery])

  function handleRun() {
    const db = dbRef.current
    if (!db) return

    setRunError(null)
    setMessage(null)
    setResult(null)
    setCheckPassed(null)

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

  function handleSubmit() {
    const db = dbRef.current
    const SQL = engineRef.current
    if (!db || !SQL || !challenge) return

    setRunError(null)
    setMessage(null)
    setCheckPassed(null)

    let actual
    try {
      actual = normalizeResult(db.exec(query))
      setResult(actual)
    } catch (error) {
      setRunError(error.message)
      return
    }

    const expectedDb = new SQL.Database()
    let expected
    try {
      expectedDb.run(schema)
      expected = normalizeResult(expectedDb.exec(challenge.solutionQuery))
    } finally {
      expectedDb.close()
    }

    const passed =
      JSON.stringify(actual.columns) === JSON.stringify(expected.columns) &&
      JSON.stringify(actual.values) === JSON.stringify(expected.values)

    setCheckPassed(passed)
    if (passed) markSolved(topicId, slug, query)
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
    setCheckPassed(null)
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-3xl bg-neutral-900">
      <div className="flex items-center justify-between px-5 py-3.5">
        <span className="text-xs font-medium uppercase tracking-[.12em] text-neutral-400">SQL maydonchasi</span>
        <button
          type="button"
          onClick={handleReset}
          disabled={status !== 'ready'}
          className="flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-neutral-100 disabled:opacity-50"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Qayta tiklash
        </button>
      </div>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== 'Enter' || !(e.ctrlKey || e.metaKey)) return
          e.preventDefault()
          handleRun()
        }}
        disabled={status !== 'ready'}
        rows={4}
        spellCheck={false}
        aria-label="SQL so'rovi"
        className="w-full resize-y bg-transparent px-5 py-1 font-mono text-sm text-neutral-100 outline-none disabled:opacity-50"
      />

      <div className="flex items-center justify-between px-5 pb-4 pt-1">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleRun}
            disabled={status !== 'ready'}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold disabled:opacity-50',
              canSubmit
                ? 'bg-neutral-800 text-neutral-100 hover:bg-neutral-700'
                : 'bg-brand-600 text-canvas-muted hover:bg-brand-700'
            )}
          >
            <Play className="h-3.5 w-3.5" />
            {status === 'loading' ? 'Yuklanmoqda...' : 'Bajarish'}
          </button>
          {canSubmit && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status !== 'ready'}
              className="flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-canvas-muted hover:bg-brand-700 disabled:opacity-50"
            >
              <UploadCloud className="h-3.5 w-3.5" />
              Yuborish
            </button>
          )}
        </div>
        <span className="text-xs text-neutral-500">Ctrl + Enter</span>
      </div>

      {status === 'error' && (
        <p className="bg-red-50 px-5 py-3.5 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">SQL vositasini yuklab bo'lmadi: {initError}</p>
      )}

      {runError && <p className="bg-red-50 px-5 py-3.5 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">{runError}</p>}

      {checkPassed === true && (
        <div className="bg-brand2-50 px-5 py-3.5 dark:bg-brand2-950">
          <p className="text-sm text-brand2-800 dark:text-brand2-400">
            To'g'ri — natija kutilganiga mos keldi. Yechildi!
          </p>
          {nextChallenge ? (
            <Link
              to={`/arena/${topicId}/${nextChallenge.slug}`}
              className="mt-2.5 flex w-fit items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-canvas-muted hover:bg-brand-700"
            >
              Keyingi masala: {nextChallenge.title}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <p className="mt-2 text-xs text-brand2-700 dark:text-brand2-400">
              Bu mavzudagi barcha masalalar yechildi!
            </p>
          )}
        </div>
      )}

      {checkPassed === false && (
        <p className="bg-red-50 px-5 py-3.5 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          Natija kutilganidan farq qiladi. Chap paneldagi "Kutilgan natija"ni solishtiring.
        </p>
      )}

      {message && !runError && (
        <p className="bg-canvas-muted px-5 py-3.5 text-sm text-ink">{message}</p>
      )}

      {result && !runError && (
        <div className="bg-canvas-muted p-4">
          <p className="mb-2 px-1 text-xs font-medium uppercase tracking-[.1em] text-ink-muted">
            Natija · {result.values.length} qator
          </p>
          <div className="max-h-80 overflow-auto rounded-3xl bg-canvas">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-canvas text-ink-muted">
                <tr>
                  {result.columns.map((column) => (
                    <th key={column} className="whitespace-nowrap px-4 py-2.5 font-medium">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.values.map((row, rowIndex) => (
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
            {result.values.length === 0 && (
              <p className="px-4 py-2.5 text-sm text-ink-muted">Natija topilmadi (0 qator).</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
