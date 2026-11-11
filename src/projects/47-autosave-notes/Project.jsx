import { useEffect, useRef, useState } from 'react'
import { Check, LoaderCircle, NotebookTabs, Trash2 } from 'lucide-react'

const STORAGE_KEY = 'autosave-note'
const SAVE_DELAY = 1000

function loadNote() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return saved ?? { title: '', body: '', savedAt: null }
  } catch {
    return { title: '', body: '', savedAt: null }
  }
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

export default function AutosaveNotesProject() {
  // Funksiya bilan berilgan boshlang'ich qiymat faqat birinchi renderda o'qiladi.
  const [initial] = useState(loadNote)
  const [title, setTitle] = useState(initial.title)
  const [body, setBody] = useState(initial.body)
  const [savedAt, setSavedAt] = useState(initial.savedAt)
  const [saving, setSaving] = useState(false)

  // Oxirgi saqlangan matn — o'zgarish bo'lmasa, qayta saqlamaymiz.
  const lastSaved = useRef({ title: initial.title, body: initial.body })

  // Debounce: har bir harfdan keyin taymer qayta boshlanadi,
  // yozish 1 soniya to'xtagandagina saqlaymiz.
  useEffect(() => {
    if (title === lastSaved.current.title && body === lastSaved.current.body) {
      setSaving(false)
      return
    }

    setSaving(true)
    const timer = setTimeout(() => {
      const now = Date.now()
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ title, body, savedAt: now }))
      lastSaved.current = { title, body }
      setSavedAt(now)
      setSaving(false)
    }, SAVE_DELAY)

    return () => clearTimeout(timer)
  }, [title, body])

  function clearNote() {
    setTitle('')
    setBody('')
  }

  const words = body.trim() ? body.trim().split(/\s+/).length : 0

  return (
    <div className="flex min-h-screen flex-col items-center bg-amber-50 px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-600 text-white shadow-lg shadow-amber-200">
        <NotebookTabs className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-stone-900">Eslatma</h1>
      <p className="mt-2 max-w-sm text-center text-stone-500">Yozing — saqlash tugmasi kerak emas.</p>

      <div className="mt-10 w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl shadow-amber-100">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-stone-500">
            {saving ? (
              <>
                <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Saqlanmoqda...
              </>
            ) : savedAt ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-600" /> Saqlandi · {formatTime(savedAt)}
              </>
            ) : (
              'Hali saqlanmagan'
            )}
          </span>
          <button
            type="button"
            onClick={clearNote}
            disabled={!title && !body}
            className="flex items-center gap-1 font-medium text-stone-400 hover:text-red-600 disabled:opacity-40"
          >
            <Trash2 className="h-3.5 w-3.5" /> Tozalash
          </button>
        </div>

        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Sarlavha"
          className="mt-4 w-full border-none bg-transparent text-2xl font-bold text-stone-900 placeholder:text-stone-300 focus:outline-none"
        />
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Bu yerga yozing..."
          rows={12}
          className="mt-2 w-full resize-none border-none bg-transparent leading-relaxed text-stone-700 placeholder:text-stone-300 focus:outline-none"
        />

        <div className="mt-2 flex justify-end gap-4 border-t border-stone-100 pt-3 text-xs text-stone-400">
          <span>{words} so'z</span>
          <span>{body.length} belgi</span>
        </div>
      </div>

      <p className="mt-6 text-xs text-stone-400">Sinab ko'ring: biror narsa yozing va sahifani yangilang.</p>
    </div>
  )
}
