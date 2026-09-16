import { useState } from 'react'
import { ListTodo, Plus, Trash2, Check } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function TodoListProject() {
  const [tasks, setTasks] = useState([])
  const [text, setText] = useState('')

  function addTask(event) {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    setTasks((prev) => [...prev, { id: Date.now(), text: trimmed, done: false }])
    setText('')
  }

  function toggleTask(id) {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)))
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const doneCount = tasks.filter((task) => task.done).length

  return (
    <div className="flex min-h-screen flex-col items-center bg-violet-50 px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-200">
        <ListTodo className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Vazifalar ro'yxati</h1>
      <p className="mt-2 text-slate-500">
        {tasks.length ? `${doneCount}/${tasks.length} bajarildi` : "Birinchi vazifangizni qo'shing."}
      </p>

      <div className="mt-8 w-full max-w-md rounded-3xl bg-white p-6 shadow-xl shadow-violet-100">
        <form onSubmit={addTask} className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Yangi vazifa..."
            className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          />
          <button
            type="submit"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white hover:bg-violet-700"
          >
            <Plus className="h-5 w-5" />
          </button>
        </form>

        <ul className="mt-5 flex flex-col gap-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-2.5">
              <button
                onClick={() => toggleTask(task.id)}
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border',
                  task.done ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-300 text-transparent'
                )}
              >
                <Check className="h-4 w-4" />
              </button>
              <span className={cn('flex-1 text-sm', task.done ? 'text-slate-400 line-through' : 'text-slate-900')}>
                {task.text}
              </span>
              <button onClick={() => removeTask(task.id)} className="text-slate-300 hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
