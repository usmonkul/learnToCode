import { useState } from 'react'
import { Check, Trash2 } from 'lucide-react'
import { cn } from '@/lib/cn'

const PRIORITIES = {
  low: { label: 'Past prioritet', badge: 'Past', emoji: '🌱', classes: 'bg-emerald-950 text-emerald-400' },
  medium: { label: "O'rta prioritet", badge: "O'rta", emoji: '🟡', classes: 'bg-amber-950 text-amber-400' },
  high: { label: 'Yuqori prioritet', badge: 'Yuqori', emoji: '🔥', classes: 'bg-red-950 text-red-400' },
}

const FILTERS = [
  { id: 'all', label: 'Barchasi' },
  { id: 'active', label: 'Bajarilmagan' },
  { id: 'done', label: 'Bajarilgan' },
]

export default function SmartTaskManagerProject() {
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('low')
  const [filter, setFilter] = useState('all')

  function addTask(event) {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    setTasks((prev) => [...prev, { id: Date.now(), text: trimmed, priority, done: false }])
    setText('')
  }

  function toggleTask(id) {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)))
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const total = tasks.length
  const doneCount = tasks.filter((task) => task.done).length
  const activeCount = total - doneCount
  const percent = total === 0 ? 0 : Math.round((doneCount / total) * 100)

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.done
    if (filter === 'done') return task.done
    return true
  })

  return (
    <div className="flex min-h-screen flex-col items-center bg-black px-4 py-20">
      <span className="rounded-full border border-sky-800 px-4 py-1.5 text-xs font-semibold tracking-wide text-sky-400">
        AMALIYOT / PRACTICE PROJECT
      </span>
      <h1 className="mt-4 text-center text-3xl font-bold text-white">Smart Vazifalar Boshqaruvchisi</h1>
      <p className="mt-2 text-center text-zinc-400">
        Vazifalaringizni rejalashtiring, prioritetlarni belgilang va natijani kuzating
      </p>

      <form onSubmit={addTask} className="mt-8 w-full max-w-lg rounded-3xl bg-zinc-900 p-6">
        <label className="text-sm font-semibold text-zinc-300">Vazifa nomi:</label>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Masalan: JavaScript DOM takrorlash..."
          className="mt-2 w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white placeholder:text-zinc-600 focus:border-sky-500 focus:outline-none"
        />

        <label className="mt-5 block text-sm font-semibold text-zinc-300">Muhimlik darajasi (Prioritet):</label>
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          className="mt-2 w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white focus:border-sky-500 focus:outline-none"
        >
          {Object.entries(PRIORITIES).map(([id, info]) => (
            <option key={id} value={id}>
              {info.emoji} {info.label}
            </option>
          ))}
        </select>

        <button type="submit" className="mt-5 w-full rounded-full bg-white py-3 font-semibold text-black hover:bg-zinc-200">
          + Vazifani Qo'shish
        </button>
      </form>

      <div className="mt-6 w-full max-w-lg rounded-3xl bg-zinc-900 p-6">
        <div className="flex items-center justify-between text-sm font-semibold tracking-wide text-zinc-400">
          <span>BAJARILISH NATIJASI</span>
          <span className="text-sky-400">{percent}%</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-zinc-800">
          <div className="h-2 rounded-full bg-sky-500 transition-all" style={{ width: `${percent}%` }} />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-black px-4 py-4 text-center">
            <p className="text-2xl font-bold text-white">{total}</p>
            <p className="mt-1 text-xs text-zinc-500">Jami</p>
          </div>
          <div className="rounded-2xl bg-black px-4 py-4 text-center">
            <p className="text-2xl font-bold text-amber-400">{activeCount}</p>
            <p className="mt-1 text-xs text-zinc-500">Bajarilmoqda</p>
          </div>
          <div className="rounded-2xl bg-black px-4 py-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">{doneCount}</p>
            <p className="mt-1 text-xs text-zinc-500">Bajarildi</p>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full max-w-lg rounded-3xl bg-zinc-900 p-6">
        <div className="flex gap-1 rounded-full bg-black p-1">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                'flex-1 rounded-full py-2 text-sm font-medium transition-colors',
                filter === item.id ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {visibleTasks.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-10">
            <span className="text-3xl">📝</span>
            <p className="text-sm text-zinc-500">Hozircha vazifalar mavjud emas</p>
          </div>
        ) : (
          <ul className="mt-4 flex flex-col gap-2">
            {visibleTasks.map((task) => (
              <li key={task.id} className="flex items-center gap-3 rounded-xl bg-black px-4 py-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded border',
                    task.done ? 'border-sky-500 bg-sky-500 text-white' : 'border-zinc-600 text-transparent'
                  )}
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
                <span className={cn('flex-1 text-sm', task.done ? 'text-zinc-500 line-through' : 'text-white')}>
                  {task.text}
                </span>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-1 text-xs font-semibold',
                    PRIORITIES[task.priority].classes
                  )}
                >
                  {PRIORITIES[task.priority].emoji} {PRIORITIES[task.priority].badge}
                </span>
                <button onClick={() => removeTask(task.id)} className="text-zinc-600 hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-5 text-sm">
          <button
            onClick={() => setTasks((prev) => prev.filter((task) => !task.done))}
            className="rounded-full border border-zinc-700 px-4 py-2 font-medium text-zinc-300 hover:bg-zinc-800"
          >
            Bajarilganlarni tozalash
          </button>
          <button
            onClick={() => setTasks([])}
            className="rounded-full border border-zinc-700 px-4 py-2 font-medium text-zinc-300 hover:bg-zinc-800"
          >
            Barchasini tozalash
          </button>
        </div>
      </div>
    </div>
  )
}
