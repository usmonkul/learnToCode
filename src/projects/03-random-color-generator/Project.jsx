import { useState } from 'react'
import { Shuffle, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/cn'

function randomHex() {
  const hex = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')
  return `#${hex}`
}

function isLight(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 150
}

export default function RandomColorGeneratorProject() {
  const [color, setColor] = useState(randomHex())
  const [copied, setCopied] = useState(false)
  const textColor = isLight(color) ? 'text-slate-900' : 'text-white'

  function generate() {
    setColor(randomHex())
    setCopied(false)
  }

  async function copy() {
    await navigator.clipboard.writeText(color)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 py-20 transition-colors"
      style={{ backgroundColor: color }}
    >
      <h1 className={cn('text-3xl font-bold', textColor)}>Tasodifiy rang generatori</h1>
      <p className={cn('mt-2 opacity-80', textColor)}>Tugmani bosing — yangi rang chiqadi.</p>

      <div className="mt-10 flex flex-col items-center gap-6 rounded-3xl bg-white/90 px-10 py-8 shadow-xl">
        <p className="font-mono text-4xl font-bold text-slate-900">{color.toUpperCase()}</p>
        <div className="flex items-center gap-3">
          <button
            onClick={generate}
            className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
          >
            <Shuffle className="h-4 w-4" /> Yangi rang
          </button>
          <button
            onClick={copy}
            className="flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Nusxalandi' : 'Nusxalash'}
          </button>
        </div>
      </div>
    </div>
  )
}
