import { useEffect, useRef, useState } from 'react'
import { Download, Paintbrush, Redo2, Trash2, Undo2 } from 'lucide-react'
import { cn } from '@/lib/cn'

const COLORS = ['#0f172a', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ffffff']
const MAX_HISTORY = 15

export default function DrawingWhiteboardProject() {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const isDrawingRef = useRef(false)
  const lastPointRef = useRef({ x: 0, y: 0 })

  const [color, setColor] = useState(COLORS[0])
  const [brushSize, setBrushSize] = useState(6)
  const [history, setHistory] = useState([])
  const [redoStack, setRedoStack] = useState([])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.lineCap = 'round'
    context.lineJoin = 'round'
    contextRef.current = context
  }, [])

  useEffect(() => {
    if (!contextRef.current) return
    contextRef.current.strokeStyle = color
    contextRef.current.lineWidth = brushSize
  }, [color, brushSize])

  function getPoint(event) {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    return { x: (event.clientX - rect.left) * scaleX, y: (event.clientY - rect.top) * scaleY }
  }

  function pushHistory() {
    const snapshot = canvasRef.current.toDataURL()
    setHistory((prev) => {
      const next = [...prev, snapshot]
      return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next
    })
    setRedoStack([])
  }

  function loadSnapshot(dataUrl) {
    const canvas = canvasRef.current
    const context = contextRef.current
    const image = new Image()
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(image, 0, 0)
    }
    image.src = dataUrl
  }

  function handlePointerDown(event) {
    event.preventDefault()
    canvasRef.current.setPointerCapture(event.pointerId)
    pushHistory()
    isDrawingRef.current = true
    lastPointRef.current = getPoint(event)
  }

  function handlePointerMove(event) {
    if (!isDrawingRef.current) return
    const point = getPoint(event)
    const context = contextRef.current
    context.beginPath()
    context.moveTo(lastPointRef.current.x, lastPointRef.current.y)
    context.lineTo(point.x, point.y)
    context.stroke()
    lastPointRef.current = point
  }

  function handlePointerUp(event) {
    isDrawingRef.current = false
    if (canvasRef.current.hasPointerCapture(event.pointerId)) {
      canvasRef.current.releasePointerCapture(event.pointerId)
    }
  }

  function handleUndo() {
    if (history.length === 0) return
    const previous = history[history.length - 1]
    setRedoStack((prev) => [...prev, canvasRef.current.toDataURL()])
    setHistory((prev) => prev.slice(0, -1))
    loadSnapshot(previous)
  }

  function handleRedo() {
    if (redoStack.length === 0) return
    const next = redoStack[redoStack.length - 1]
    setHistory((prev) => [...prev, canvasRef.current.toDataURL()])
    setRedoStack((prev) => prev.slice(0, -1))
    loadSnapshot(next)
  }

  function handleClear() {
    pushHistory()
    const canvas = canvasRef.current
    contextRef.current.fillStyle = '#ffffff'
    contextRef.current.fillRect(0, 0, canvas.width, canvas.height)
  }

  function handleDownload() {
    const link = document.createElement('a')
    link.download = 'chizma.png'
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 bg-slate-100 px-4 py-10">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
          <Paintbrush className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Rasm chizish taxtasi</h1>
          <p className="text-sm text-slate-500">Sichqoncha yoki barmoq bilan chizing.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-5 rounded-2xl bg-white px-5 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          {COLORS.map((swatch) => (
            <button
              key={swatch}
              type="button"
              onClick={() => setColor(swatch)}
              aria-label={`Rang: ${swatch}`}
              style={{ backgroundColor: swatch }}
              className={cn(
                'h-7 w-7 rounded-full border-2 transition-transform',
                color === swatch ? 'scale-110 border-indigo-500' : 'border-slate-200'
              )}
            />
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          O'lcham
          <input
            type="range"
            min="2"
            max="24"
            value={brushSize}
            onChange={(event) => setBrushSize(Number(event.target.value))}
            className="accent-indigo-600"
          />
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleUndo}
            disabled={history.length === 0}
            aria-label="Ortga qaytarish"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-40"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            aria-label="Qaytadan bajarish"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-40"
          >
            <Redo2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleClear}
            aria-label="Tozalash"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleDownload}
            aria-label="Yuklab olish"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-2 shadow-md">
        <canvas
          ref={canvasRef}
          width={900}
          height={520}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="w-full touch-none rounded-xl cursor-crosshair"
        />
      </div>
    </div>
  )
}
