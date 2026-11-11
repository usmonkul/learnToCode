import { useState } from 'react'
import { BookOpen, Headphones, Languages, Mic, PenLine, TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/cn'

const SKILLS = [
  { key: 'listening', label: 'Listening', Icon: Headphones },
  { key: 'reading', label: 'Reading', Icon: BookOpen },
  { key: 'writing', label: 'Writing', Icon: PenLine },
  { key: 'speaking', label: 'Speaking', Icon: Mic },
]

const EMPTY_SCORES = { listening: '', reading: '', writing: '', speaking: '' }

// IELTS rasmiy qoidasi: o'rtacha eng yaqin 0.5 ga yaxlitlanadi,
// .25 → .5 ga, .75 → keyingi butun songa ko'tariladi.
function overallBand(scores) {
  const sum = scores.reduce((total, score) => total + score, 0)
  return Math.round((sum / scores.length) * 2) / 2
}

// IELTS → CEFR muvofiqligi (IELTS rasmiy jadvali asosida).
function cefrFor(band) {
  if (band >= 8.5) return 'C2'
  if (band >= 7) return 'C1'
  if (band >= 5.5) return 'B2'
  if (band >= 4) return 'B1'
  if (band >= 3) return 'A2'
  return 'A1'
}

// Har bir butun ball uchun IELTS "band descriptor" nomi va izoh.
const BAND_INFO = [
  { min: 9, name: 'Expert user', message: "Mukammal natija! Ingliz tilini ona tilidek erkin va aniq qo'llaysiz." },
  { min: 8, name: 'Very good user', message: "Ajoyib! Murakkab mavzularda ham erkin muloqot qila olasiz, kamdan-kam xato qilasiz." },
  { min: 7, name: 'Good user', message: "Juda yaxshi! Ko'pchilik xorijiy universitetlar talabiga javob beradigan daraja." },
  { min: 6, name: 'Competent user', message: "Yaxshi natija. Tanish mavzularda ishonchli gaplashasiz, lekin murakkab tilda ba'zan xato qilasiz." },
  { min: 5, name: 'Modest user', message: "O'rtacha daraja. Asosiy ma'noni tushunasiz, ammo ko'p xatolar bor — muntazam mashq qiling." },
  { min: 4, name: 'Limited user', message: "Asosiy bilim bor, lekin faqat tanish vaziyatlarda. Grammatika va lug'atni mustahkamlang." },
  { min: 0, name: 'Extremely limited user', message: "Boshlang'ich daraja. Asoslardan boshlab, har kuni oz-ozdan shug'ullaning." },
]

function bandInfoFor(band) {
  return BAND_INFO.find((info) => band >= info.min)
}

function isValidScore(value) {
  if (value === '') return false
  const number = Number(value)
  return number >= 0 && number <= 9 && Number.isInteger(number * 2)
}

export default function IeltsCalculatorProject() {
  const [scores, setScores] = useState(EMPTY_SCORES)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function updateScore(key, value) {
    setScores((prev) => ({ ...prev, [key]: value }))
    setResult(null)
    setError('')
  }

  function calculate(mode) {
    const invalid = SKILLS.filter((skill) => !isValidScore(scores[skill.key]))
    if (invalid.length > 0) {
      setResult(null)
      setError(
        `${invalid.map((skill) => skill.label).join(', ')}: ball 0 dan 9 gacha, 0.5 qadam bilan bo'lishi kerak (masalan 6.5).`
      )
      return
    }

    const values = SKILLS.map((skill) => ({ ...skill, score: Number(scores[skill.key]) }))
    const band = overallBand(values.map((skill) => skill.score))
    const sorted = [...values].sort((a, b) => b.score - a.score)

    setError('')
    setResult({
      mode,
      band,
      cefr: cefrFor(band),
      info: bandInfoFor(band),
      skills: values,
      strongest: sorted[0],
      weakest: sorted[sorted.length - 1],
    })
  }

  function reset() {
    setScores(EMPTY_SCORES)
    setResult(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-rose-50 px-4 py-20">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/30">
          <Languages className="h-7 w-7" />
        </span>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">IELTS Hisoblagich</h1>
        <p className="mt-2 text-slate-500">
          To'rtta ko'nikma bo'yicha ballaringizni kiriting va umumiy natijangizni bilib oling
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-xl rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <div className="grid grid-cols-2 gap-4">
          {SKILLS.map(({ key, label, Icon }) => (
            <label key={key} className="block">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                <Icon className="h-4 w-4 text-red-600" />
                {label}
              </span>
              <input
                type="number"
                min={0}
                max={9}
                step={0.5}
                value={scores[key]}
                onChange={(event) => updateScore(key, event.target.value)}
                placeholder="0 – 9"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-semibold text-slate-900 placeholder:font-normal placeholder:text-slate-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </label>
          ))}
        </div>

        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => calculate('simple')}
            className="rounded-full bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
          >
            Umumiy ballni hisoblash
          </button>
          <button
            type="button"
            onClick={() => calculate('detailed')}
            className="rounded-full border-2 border-red-600 py-3 font-semibold text-red-600 hover:bg-red-50"
          >
            Batafsil natija
          </button>
        </div>

        {result?.mode === 'simple' && (
          <div className="mt-6 rounded-2xl bg-red-600 p-6 text-center text-white">
            <p className="text-sm font-medium uppercase tracking-wide text-red-100">Overall Band Score</p>
            <p className="mt-1 text-6xl font-extrabold">{result.band.toFixed(1)}</p>
          </div>
        )}

        {result?.mode === 'detailed' && <DetailedResult result={result} />}

        {(result || Object.values(scores).some(Boolean)) && (
          <button type="button" onClick={reset} className="mx-auto mt-5 block text-sm font-medium text-slate-400 hover:text-red-600">
            Tozalash
          </button>
        )}
      </div>
    </div>
  )
}

function DetailedResult({ result }) {
  const { band, cefr, info, skills, strongest, weakest } = result
  const balanced = strongest.score === weakest.score

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-red-600 p-5 text-center text-white">
          <p className="text-xs font-medium uppercase tracking-wide text-red-100">Overall</p>
          <p className="mt-1 text-5xl font-extrabold">{band.toFixed(1)}</p>
        </div>
        <div className="rounded-2xl bg-rose-50 p-5 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-red-400">CEFR daraja</p>
          <p className="mt-1 text-5xl font-extrabold text-red-600">{cefr}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 p-5">
        <p className="font-bold text-slate-900">{info.name}</p>
        <p className="mt-1 text-sm text-slate-600">{info.message}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 p-5">
        <p className="text-sm font-semibold text-slate-700">Ko'nikmalar bo'yicha</p>
        <ul className="mt-3 flex flex-col gap-3">
          {skills.map(({ key, label, Icon, score }) => (
            <li key={key}>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Icon className="h-4 w-4 text-red-600" />
                  {label}
                </span>
                <span className="font-semibold text-slate-900">{score.toFixed(1)}</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={cn('h-full rounded-full', score === weakest.score && !balanced ? 'bg-red-300' : 'bg-red-600')}
                  style={{ width: `${(score / 9) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {balanced ? (
        <p className="rounded-2xl bg-rose-50 p-4 text-sm text-slate-700">
          Barcha ko'nikmalaringiz bir xil darajada — juda muvozanatli natija!
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl bg-emerald-50 p-4">
            <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <p className="text-sm text-slate-700">
              Eng kuchli tomoningiz: <span className="font-semibold">{strongest.label}</span> ({strongest.score.toFixed(1)})
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-rose-50 p-4">
            <TrendingDown className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <p className="text-sm text-slate-700">
              Ko'proq e'tibor bering: <span className="font-semibold">{weakest.label}</span> ({weakest.score.toFixed(1)})
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
