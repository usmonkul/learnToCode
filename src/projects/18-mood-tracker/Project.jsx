import { useState } from 'react'
import { cn } from '@/lib/cn'

const MOODS = [
  {
    id: 'happy',
    label: 'Happy',
    emoji: '😊',
    title: 'Ajoyib va Quvnoq!',
    description: "Bugun kayfiyatingiz a'lo darajada! Yangi imkoniyatlar sari tabassum bilan qadam bosing.",
    gradient: 'from-orange-300 via-pink-300 to-sky-400',
  },
  {
    id: 'sleepy',
    label: 'Sleepy',
    emoji: '😴',
    title: 'Dam Olish Vaqti',
    description: "Biroz charchagandek ko'rinasiz. Ko'zlaringizga dam bering va energiyangizni tiklang.",
    gradient: 'from-indigo-900 via-purple-800 to-slate-900',
  },
  {
    id: 'coding',
    label: 'Coding',
    emoji: '💻',
    title: 'Kodlash Rejimi',
    description: "Diqqatingiz kod bilan band. Bir chashka qahva va fokus — g'alaba sizniki!",
    gradient: 'from-slate-800 via-slate-700 to-cyan-900',
  },
]

export default function MoodTrackerProject() {
  const [selectedId, setSelectedId] = useState(MOODS[0].id)
  const mood = MOODS.find((item) => item.id === selectedId)

  return (
    <div className="flex min-h-screen flex-col items-center bg-black px-4 py-20">
      <span className="rounded-full border border-zinc-700 px-4 py-1.5 text-xs font-semibold tracking-wide text-zinc-400">
        AMALIYOT / PRACTICE PROJECT
      </span>
      <h1 className="mt-4 text-center text-3xl font-bold text-white">Kayfiyatingizni Tanlang</h1>
      <p className="mt-3 max-w-md text-center text-zinc-400">
        Bugungi holatingizga mos tugmani bosing va kartochka dinamikasini kuzating
      </p>

      <div className="mt-8 grid w-full max-w-md grid-cols-3 gap-3">
        {MOODS.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={cn(
              'flex flex-col items-center gap-2 rounded-2xl border px-4 py-4 transition-colors',
              item.id === selectedId
                ? 'border-white bg-white text-black'
                : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
            )}
          >
            <span className="text-2xl">{item.emoji}</span>
            <span className="text-sm font-semibold">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 w-full max-w-md overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl">
        <div className={cn('relative flex h-64 items-end justify-center bg-gradient-to-br', mood.gradient)}>
          <span className="absolute -bottom-8 flex h-16 w-16 items-center justify-center rounded-full border-4 border-zinc-900 bg-black text-3xl">
            {mood.emoji}
          </span>
        </div>
        <div className="px-6 pb-8 pt-12 text-center">
          <h2 className="text-2xl font-bold text-white">{mood.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{mood.description}</p>
        </div>
      </div>
    </div>
  )
}
