import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Highlight, themes } from 'prism-react-renderer'
import { Play, UploadCloud, RotateCcw, ArrowRight } from 'lucide-react'
import { runChallenge } from '@/lib/jsRunner'
import { useArenaStore, solvedKey } from '@/store/arenaStore'
import { cn } from '@/lib/cn'

function CodeEditor({ code, onChange, onRunShortcut }) {
  const lines = code.split('\n')

  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      onRunShortcut()
      return
    }
    if (e.key !== 'Tab') return
    e.preventDefault()
    const el = e.target
    const { selectionStart, selectionEnd } = el
    const next = `${code.slice(0, selectionStart)}  ${code.slice(selectionEnd)}`
    onChange(next)
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = selectionStart + 2
    })
  }

  return (
    <div className="flex max-h-96 overflow-auto bg-neutral-900">
      <div className="select-none px-3 py-3 text-right font-mono text-sm leading-6 text-neutral-600">
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div className="relative min-w-0 flex-1">
        <Highlight theme={themes.oneDark} code={code} language="javascript">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              aria-hidden="true"
              className={cn(className, 'pointer-events-none m-0 whitespace-pre bg-transparent px-2 py-3 font-mono text-sm leading-6')}
              style={{ ...style, backgroundColor: 'transparent' }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          aria-label="JavaScript kodi"
          className="absolute inset-0 resize-none whitespace-pre bg-transparent px-2 py-3 font-mono text-sm leading-6 text-transparent caret-white outline-none"
        />
      </div>
    </div>
  )
}

export default function JsPlayground({ challenge, topicId, slug, nextChallenge }) {
  const [code, setCode] = useState(challenge.starterCode)
  const [status, setStatus] = useState('idle')
  const [tab, setTab] = useState('tests')
  const [activeIndex, setActiveIndex] = useState(0)
  const [runResult, setRunResult] = useState(null)
  const [runError, setRunError] = useState(null)
  const markSolved = useArenaStore((state) => state.markSolved)
  const solutions = useArenaStore((state) => state.solutions)

  useEffect(() => {
    const saved = useArenaStore.getState().solutions.get(solvedKey(topicId, slug))
    setCode(saved ?? challenge.starterCode)
    setStatus('idle')
    setTab('tests')
    setActiveIndex(0)
    setRunResult(null)
    setRunError(null)
  }, [challenge, topicId, slug])

  // Solved history loads asynchronously (arenaStore.fetchAll), so on a fresh
  // page load the effect above can run before it arrives — hydrate the saved
  // solution once it shows up, but only if the editor still shows the
  // untouched starter code (don't clobber code the student is mid-typing).
  useEffect(() => {
    const saved = solutions.get(solvedKey(topicId, slug))
    if (saved) setCode((current) => (current === challenge.starterCode ? saved : current))
  }, [solutions, challenge, topicId, slug])

  async function runAgainst(type, tests) {
    setStatus('running')
    setRunError(null)

    const response = await runChallenge(code, challenge.functionName, tests)

    if (!response.ok) {
      setRunError(response.error)
      setStatus('idle')
      return
    }

    setRunResult({ type, tests, results: response.results })
    setTab('results')
    setActiveIndex(0)
    setStatus('idle')

    if (type === 'submit' && response.results.every((r) => r.pass)) {
      markSolved(topicId, slug, code)
    }
  }

  function handleReset() {
    setCode(challenge.starterCode)
    setStatus('idle')
    setTab('tests')
    setActiveIndex(0)
    setRunResult(null)
    setRunError(null)
  }

  function formatArgs(args) {
    const paramNames = challenge.paramNames ?? args.map((_, i) => `arg${i + 1}`)
    return paramNames.map((name, i) => `${name} = ${JSON.stringify(args[i])}`).join('\n')
  }

  const pillTests = tab === 'results' && runResult ? runResult.tests : challenge.examples
  const activeTest = pillTests[activeIndex]
  const activeResult = tab === 'results' && runResult ? runResult.results[activeIndex] : null
  const passCount = runResult?.results.filter((r) => r.pass).length

  return (
    <div className="not-prose my-6 overflow-hidden rounded-3xl bg-neutral-900">
      <div className="flex items-center justify-between px-5 py-3.5">
        <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[.12em] text-neutral-400">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-yellow-400 text-[10px] font-bold text-neutral-900">
            JS
          </span>
          JavaScript
        </span>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-neutral-100"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Qayta boshlash
        </button>
      </div>

      <CodeEditor code={code} onChange={setCode} onRunShortcut={() => runAgainst('run', challenge.examples)} />

      <div className="border-t border-neutral-800 px-5 py-3.5">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 rounded-full bg-neutral-800 p-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => {
                setTab('tests')
                setActiveIndex(0)
              }}
              className={cn(
                'rounded-full px-3 py-1.5',
                tab === 'tests' ? 'bg-neutral-700 text-neutral-100' : 'text-neutral-400'
              )}
            >
              Testlar
            </button>
            <button
              type="button"
              onClick={() => {
                if (!runResult) return
                setTab('results')
                setActiveIndex(0)
              }}
              disabled={!runResult}
              className={cn(
                'rounded-full px-3 py-1.5',
                tab === 'results' ? 'bg-neutral-700 text-neutral-100' : 'text-neutral-400',
                !runResult && 'opacity-40'
              )}
            >
              Natijalar
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => runAgainst('run', challenge.examples)}
                disabled={status === 'running'}
                className="flex items-center gap-1.5 rounded-full bg-neutral-800 px-4 py-2 text-xs font-semibold text-neutral-100 hover:bg-neutral-700 disabled:opacity-50"
              >
                <Play className="h-3.5 w-3.5" />
                Yuritish
              </button>
              <button
                type="button"
                onClick={() => runAgainst('submit', challenge.tests)}
                disabled={status === 'running'}
                className="flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-canvas-muted hover:bg-brand-700 disabled:opacity-50"
              >
                <UploadCloud className="h-3.5 w-3.5" />
                Yuborish
              </button>
            </div>
            <span className="text-xs text-neutral-500">Ctrl + Enter</span>
          </div>
        </div>

        {runError && (
          <p className="mt-3 rounded-2xl bg-red-950 px-4 py-2.5 text-sm text-red-300">{runError}</p>
        )}

        {tab === 'results' && runResult && (
          <p className="mt-3 text-xs text-neutral-400">
            {passCount} / {runResult.results.length} test o'tdi
            {runResult.type === 'submit' && passCount === runResult.results.length && ' — Yechildi!'}
          </p>
        )}

        {runResult?.type === 'submit' && passCount === runResult.results.length && (
          <div className="mt-3">
            {nextChallenge ? (
              <Link
                to={`/arena/${topicId}/${nextChallenge.slug}`}
                className="flex w-fit items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-canvas-muted hover:bg-brand-700"
              >
                Keyingi masala: {nextChallenge.title}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <p className="text-xs text-neutral-400">Bu mavzudagi barcha masalalar yechildi!</p>
            )}
          </div>
        )}

        {!runError && (
          <div className="mt-3 flex flex-wrap gap-2">
            {pillTests.map((_, index) => {
              const result = tab === 'results' && runResult ? runResult.results[index] : null
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs font-medium',
                    index === activeIndex
                      ? result
                        ? result.pass
                          ? 'border-brand2-500 bg-brand2-950 text-brand2-400'
                          : 'border-red-500 bg-red-950 text-red-300'
                        : 'border-neutral-500 bg-neutral-800 text-neutral-100'
                      : 'border-neutral-700 text-neutral-400 hover:text-neutral-200'
                  )}
                >
                  Test {index + 1}
                </button>
              )
            })}
          </div>
        )}

        {!runError && activeTest && (
          <div className="mt-3 flex flex-col gap-3">
            {activeResult && (
              <p className={cn('text-sm font-medium', activeResult.pass ? 'text-brand2-400' : 'text-red-400')}>
                {activeResult.pass ? "To'g'ri" : 'Xato'}
              </p>
            )}

            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-[.1em] text-neutral-500">Input</p>
              <pre className="whitespace-pre-wrap rounded-2xl bg-neutral-800 px-4 py-2.5 font-mono text-sm text-neutral-200">
                {formatArgs(activeTest.args)}
              </pre>
            </div>

            {activeResult && (
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-[.1em] text-neutral-500">Output</p>
                <pre className="whitespace-pre-wrap rounded-2xl bg-neutral-800 px-4 py-2.5 font-mono text-sm text-neutral-200">
                  {activeResult.error ? `Xatolik: ${activeResult.error}` : JSON.stringify(activeResult.actual)}
                </pre>
              </div>
            )}

            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-[.1em] text-neutral-500">Kutilgan</p>
              <pre className="whitespace-pre-wrap rounded-2xl bg-neutral-800 px-4 py-2.5 font-mono text-sm text-neutral-200">
                {JSON.stringify(activeTest.expected)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
