import { useState } from 'react'
import { Brain, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/cn'

const QUESTIONS = [
  {
    question: 'CSS nima uchun ishlatiladi?',
    options: [
      "Sahifani chiroyli ko'rinishga keltirish uchun",
      "Ma'lumotlarni saqlash uchun",
      'Serverni ishga tushirish uchun',
      'Fayllarni siqish uchun',
    ],
    correct: 0,
  },
  {
    question: "JavaScript'da o'zgaruvchi e'lon qilish uchun qaysi kalit so'z ishlatiladi?",
    options: ['print', 'let', 'def', 'import'],
    correct: 1,
  },
  {
    question: 'HTML qisqartmasi nimani anglatadi?',
    options: [
      'High Tech Modern Language',
      'Home Tool Markup Language',
      'HyperText Markup Language',
      'Hyperlink and Text Markup',
    ],
    correct: 2,
  },
  {
    question: 'Massivning birinchi elementiga qanday murojaat qilinadi?',
    options: ['array(0)', 'array.first()', 'array[1]', 'array[0]'],
    correct: 3,
  },
  {
    question: "Qaysi belgi JavaScript'da bir qatorli izoh (comment) yozish uchun ishlatiladi?",
    options: ['//', '##', '<!-- -->', '**'],
    correct: 0,
  },
]

export default function QuizAppProject() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = QUESTIONS[index]

  function selectOption(optionIndex) {
    if (selected !== null) return
    setSelected(optionIndex)
    if (optionIndex === question.correct) setScore((s) => s + 1)
  }

  function next() {
    if (index + 1 < QUESTIONS.length) {
      setIndex((i) => i + 1)
      setSelected(null)
    } else {
      setFinished(true)
    }
  }

  function restart() {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-fuchsia-600 to-purple-900 px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-fuchsia-600">
        <Brain className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-white">Test ilovasi</h1>

      <div className="mt-8 w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        {!finished ? (
          <>
            <p className="text-xs font-medium uppercase tracking-wide text-fuchsia-500">
              Savol {index + 1}/{QUESTIONS.length}
            </p>
            <h2 className="mt-2 text-lg font-bold text-slate-900">{question.question}</h2>

            <div className="mt-5 flex flex-col gap-2">
              {question.options.map((option, optionIndex) => {
                const isCorrect = optionIndex === question.correct
                const isSelected = optionIndex === selected
                const showResult = selected !== null

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectOption(optionIndex)}
                    className={cn(
                      'rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors',
                      !showResult && 'border-slate-200 text-slate-700 hover:border-fuchsia-400 hover:bg-fuchsia-50',
                      showResult && isCorrect && 'border-emerald-500 bg-emerald-50 text-emerald-700',
                      showResult && isSelected && !isCorrect && 'border-red-500 bg-red-50 text-red-700',
                      showResult && !isSelected && !isCorrect && 'border-slate-100 bg-slate-50 text-slate-500'
                    )}
                  >
                    {option}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={next}
              disabled={selected === null}
              className="mt-6 w-full rounded-full bg-fuchsia-600 px-6 py-3 text-sm font-semibold text-white hover:bg-fuchsia-700 disabled:opacity-40"
            >
              {index + 1 < QUESTIONS.length ? 'Keyingi savol' : "Yakunlash"}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <p className="text-sm font-medium uppercase tracking-wide text-fuchsia-500">Natija</p>
            <p className="text-5xl font-bold text-slate-900">
              {score}/{QUESTIONS.length}
            </p>
            <button
              type="button"
              onClick={restart}
              className="mt-2 flex items-center gap-2 rounded-full bg-fuchsia-600 px-6 py-3 text-sm font-semibold text-white hover:bg-fuchsia-700"
            >
              <RotateCcw className="h-4 w-4" />
              Qayta boshlash
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
