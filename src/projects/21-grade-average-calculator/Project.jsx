import { useState } from 'react'
import { GraduationCap, Trash2, TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/cn'

function gradeFor(score) {
  if (score >= 90) return { label: "A'lo (A)", short: "A'lo", classes: 'bg-emerald-100 text-emerald-700', warn: false }
  if (score >= 70) return { label: 'Yaxshi (B)', short: 'Yaxshi', classes: 'bg-blue-100 text-blue-700', warn: false }
  if (score >= 50) return { label: 'Qoniqarli (C)', short: 'Qoniqarli', classes: 'bg-amber-100 text-amber-700', warn: true }
  return { label: 'Qoniqarsiz (F)', short: 'Qoniqarsiz', classes: 'bg-red-100 text-red-700', warn: true }
}

export default function GradeAverageCalculatorProject() {
  const [subjects, setSubjects] = useState([])
  const [name, setName] = useState('')
  const [score, setScore] = useState('')

  function addSubject(event) {
    event.preventDefault()
    const trimmedName = name.trim()
    const value = Number(score)
    if (!trimmedName || !score || Number.isNaN(value) || value < 0 || value > 100) return

    setSubjects((prev) => [...prev, { id: Date.now(), name: trimmedName, score: value }])
    setName('')
    setScore('')
  }

  function removeSubject(id) {
    setSubjects((prev) => prev.filter((subject) => subject.id !== id))
  }

  const average = subjects.length ? subjects.reduce((sum, subject) => sum + subject.score, 0) / subjects.length : 0
  const overallGrade = subjects.length ? gradeFor(average) : null

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-20">
      <h1 className="text-center text-3xl font-bold text-slate-900">Fanlar va O'rtacha Ball</h1>
      <p className="mx-auto mt-2 max-w-md text-center text-slate-500">
        Fanlaringiz ballarini kiriting, akademik o'zlashtirish va umumiy o'rtacha ko'rsatkichingizni hisoblang
      </p>

      <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <form onSubmit={addSubject} className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Yangi Fan Qo'shish</h2>
            <p className="mt-1 text-sm text-slate-500">Ball 0 dan 100 gacha</p>

            <label className="mt-5 block text-sm font-semibold text-slate-700">Fan nomi</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Masalan: Matematika, Dasturlash..."
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />

            <label className="mt-4 block text-sm font-semibold text-slate-700">To'plangan ball</label>
            <div className="relative mt-2">
              <input
                type="number"
                min={0}
                max={100}
                value={score}
                onChange={(event) => setScore(event.target.value)}
                placeholder="Masalan: 88"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-14 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">ball</span>
            </div>

            <button type="submit" className="mt-5 w-full rounded-full bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
              + Fanni Qo'shish
            </button>
          </form>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold tracking-wide text-slate-500">UMUMIY O'RTACHA BALL</p>
            <div className="mt-3 flex items-end justify-between">
              <p className="text-4xl font-extrabold text-slate-900">
                {average.toFixed(1)} <span className="text-lg font-medium text-slate-400">/ 100</span>
              </p>
              {overallGrade && (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                  {overallGrade.warn ? (
                    <>
                      <TriangleAlert className="h-4 w-4 text-amber-500" />
                      Umumiy natija: {overallGrade.short}
                    </>
                  ) : (
                    `Umumiy natija: ${overallGrade.short}`
                  )}
                </span>
              )}
              {!overallGrade && <span className="text-sm font-semibold text-emerald-600">Baholash boshlanmadi</span>}
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Kiritilgan Fanlar</h2>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {subjects.length} ta fan
              </span>
              <button onClick={() => setSubjects([])} className="text-xs font-semibold text-red-500 hover:text-red-600">
                Tozalash
              </button>
            </div>
          </div>
          <div className="mt-4 border-t border-slate-100" />

          {subjects.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-14 text-center">
              <GraduationCap className="h-8 w-8 text-slate-300" />
              <p className="font-semibold text-slate-900">Hozircha fanlar kiritilmagan</p>
              <p className="max-w-[220px] text-sm text-slate-500">
                Chap tarafdagi forma orqali fan nomi va to'plangan ballingizni qo'shing
              </p>
            </div>
          ) : (
            <ul className="mt-4 flex flex-col gap-2">
              {subjects.map((subject) => {
                const grade = gradeFor(subject.score)
                return (
                  <li key={subject.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <div>
                      <p className="font-semibold text-slate-900">{subject.name}</p>
                      <p className="text-sm text-slate-500">{subject.score} ball</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', grade.classes)}>
                        {grade.label}
                      </span>
                      <button onClick={() => removeSubject(subject.id)} className="text-slate-300 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
