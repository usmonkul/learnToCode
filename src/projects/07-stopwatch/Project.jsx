import { useEffect, useRef, useState } from 'react'
import { Timer, Play, Pause, RotateCcw } from 'lucide-react'

function formatTime(ms) {
  const totalCentiseconds = Math.floor(ms / 10)
  const minutes = Math.floor(totalCentiseconds / 6000)
  const seconds = Math.floor((totalCentiseconds % 6000) / 100)
  const centiseconds = totalCentiseconds % 100
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`
}

export default function StopwatchProject() {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const startedAtRef = useRef(0)

  useEffect(() => {
    if (!running) return
    startedAtRef.current = Date.now() - elapsed
    const interval = setInterval(() => {
      setElapsed(Date.now() - startedAtRef.current)
    }, 10)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  function reset() {
    setRunning(false)
    setElapsed(0)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white">
        <Timer className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-white">Sekundomer</h1>

      <p className="mt-10 font-mono text-7xl font-bold tabular-nums text-white">{formatTime(elapsed)}</p>

      <div className="mt-10 flex items-center gap-4">
        <button
          onClick={() => setRunning((r) => !r)}
          className="flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700"
        >
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "To'xtatish" : 'Boshlash'}
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
        >
          <RotateCcw className="h-4 w-4" />
          Qayta boshlash
        </button>
      </div>
    </div>
  )
}
