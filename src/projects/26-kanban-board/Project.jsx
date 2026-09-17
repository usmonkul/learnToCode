import { useEffect, useState } from 'react'
import { Kanban, Plus, X } from 'lucide-react'
import { cn } from '@/lib/cn'

const STORAGE_KEY = 'kanban-board-tasks'

const COLUMNS = [
  { id: 'todo', title: 'Bajarilishi kerak' },
  { id: 'progress', title: 'Jarayonda' },
  { id: 'done', title: 'Bajarildi' },
]

const INITIAL_TASKS = [
  { id: 't1', columnId: 'todo', text: 'Landing sahifa dizaynini tayyorlash' },
  { id: 't2', columnId: 'todo', text: "API hujjatlarini o'qib chiqish" },
  { id: 't3', columnId: 'progress', text: 'Kirish formasi validatsiyasi' },
  { id: 't4', columnId: 'done', text: "Loyihani serverga joylash" },
]

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : INITIAL_TASKS
  } catch {
    return INITIAL_TASKS
  }
}

export default function KanbanBoardProject() {
  const [tasks, setTasks] = useState(loadTasks)
  const [drafts, setDrafts] = useState({})
  const [dragOverColumn, setDragOverColumn] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function handleAddTask(columnId) {
    const text = (drafts[columnId] ?? '').trim()
    if (!text) return
    setTasks((prev) => [...prev, { id: `t${Date.now()}`, columnId, text }])
    setDrafts((prev) => ({ ...prev, [columnId]: '' }))
  }

  function handleDeleteTask(taskId) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  function handleDragStart(event, taskId) {
    event.dataTransfer.setData('text/plain', taskId)
    event.dataTransfer.effectAllowed = 'move'
  }

  function handleDrop(event, columnId) {
    event.preventDefault()
    const taskId = event.dataTransfer.getData('text/plain')
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, columnId } : task)))
    setDragOverColumn(null)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
          <Kanban className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-lg font-bold">Kanban taxtasi</h1>
          <p className="text-sm text-slate-400">Vazifani ushlab, boshqa ustunga sudrab ko'chiring.</p>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto px-6 py-8">
        {COLUMNS.map((column) => {
          const columnTasks = tasks.filter((task) => task.columnId === column.id)

          return (
            <div
              key={column.id}
              onDragOver={(event) => {
                event.preventDefault()
                setDragOverColumn(column.id)
              }}
              onDragLeave={() => setDragOverColumn((current) => (current === column.id ? null : current))}
              onDrop={(event) => handleDrop(event, column.id)}
              className={cn(
                'flex w-72 shrink-0 flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-800/60 p-4 transition-colors',
                dragOverColumn === column.id && 'border-indigo-500 bg-slate-800'
              )}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-200">{column.title}</h2>
                <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs text-slate-300">
                  {columnTasks.length}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(event) => handleDragStart(event, task.id)}
                    className="group flex cursor-grab items-start justify-between gap-2 rounded-xl bg-slate-700/80 px-3 py-2.5 text-sm text-slate-100 shadow-sm active:cursor-grabbing"
                  >
                    <span>{task.text}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                      aria-label="Vazifani o'chirish"
                      className="shrink-0 text-slate-400 opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  handleAddTask(column.id)
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={drafts[column.id] ?? ''}
                  onChange={(event) => setDrafts((prev) => ({ ...prev, [column.id]: event.target.value }))}
                  placeholder="Yangi vazifa..."
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  aria-label="Qo'shish"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-500"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </form>
            </div>
          )
        })}
      </div>
    </div>
  )
}
