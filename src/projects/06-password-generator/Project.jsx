import { useState } from 'react'
import { KeyRound, Copy, Check, RefreshCw } from 'lucide-react'

const CHAR_SETS = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}',
}

const OPTION_LABELS = {
  lower: 'kichik harflar',
  upper: 'katta harflar',
  numbers: 'raqamlar',
  symbols: 'belgilar',
}

function generatePassword(length, options) {
  const pool = Object.keys(options)
    .filter((key) => options[key])
    .map((key) => CHAR_SETS[key])
    .join('')
  if (!pool) return ''
  let password = ''
  for (let i = 0; i < length; i++) {
    password += pool[Math.floor(Math.random() * pool.length)]
  }
  return password
}

const INITIAL_OPTIONS = { lower: true, upper: true, numbers: true, symbols: false }

export default function PasswordGeneratorProject() {
  const [length, setLength] = useState(12)
  const [options, setOptions] = useState(INITIAL_OPTIONS)
  const [password, setPassword] = useState(() => generatePassword(12, INITIAL_OPTIONS))
  const [copied, setCopied] = useState(false)

  function regenerate(nextLength, nextOptions) {
    setPassword(generatePassword(nextLength, nextOptions))
    setCopied(false)
  }

  function toggleOption(key) {
    const nextOptions = { ...options, [key]: !options[key] }
    if (!Object.values(nextOptions).some(Boolean)) return
    setOptions(nextOptions)
    regenerate(length, nextOptions)
  }

  async function copy() {
    if (!password) return
    await navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-950 px-4 py-20 font-mono">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-slate-950">
        <KeyRound className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-emerald-400">Parol generatori</h1>
      <p className="mt-2 max-w-sm text-center text-slate-400">Xavfsiz, tasodifiy parol yarating.</p>

      <div className="mt-10 w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-950 px-4 py-3">
          <p className="truncate text-lg text-emerald-400">{password || '—'}</p>
          <div className="flex shrink-0 gap-1.5">
            <button
              onClick={() => regenerate(length, options)}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-emerald-400"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button onClick={copy} className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-emerald-400">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="flex justify-between text-sm text-slate-300">
              <span>Uzunlik</span>
              <span className="text-emerald-400">{length}</span>
            </span>
            <input
              type="range"
              min="6"
              max="32"
              value={length}
              onChange={(event) => {
                const nextLength = Number(event.target.value)
                setLength(nextLength)
                regenerate(nextLength, options)
              }}
              className="accent-emerald-500"
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            {Object.keys(CHAR_SETS).map((key) => (
              <label key={key} className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" checked={options[key]} onChange={() => toggleOption(key)} className="accent-emerald-500" />
                {OPTION_LABELS[key]}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
