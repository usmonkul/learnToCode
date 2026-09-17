import { useEffect, useRef, useState } from 'react'
import { UserRound, Send } from 'lucide-react'
import { cn } from '@/lib/cn'

const INITIAL_MESSAGES = [
  { id: 1, sender: 'them', text: 'Salom! Loyiha qanday ketyapti?' },
  { id: 2, sender: 'me', text: "Yaxshi, flexbox qismini tugatdim." },
  { id: 3, sender: 'them', text: 'Ajoyib, skrinshot yuborib turasanmi?' },
  { id: 4, sender: 'me', text: "Albatta, hozir yuboraman." },
]

export default function ChatWindowProject() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [draft, setDraft] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages])

  function handleSubmit(event) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'me', text }])
    setDraft('')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="flex h-[600px] w-full max-w-md flex-col overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <UserRound className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900">Dilshod Rahimov</p>
            <p className="text-xs text-emerald-600">Onlayn</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-4">
          {messages.map((message) => (
            <div key={message.id} className={cn('flex', message.sender === 'me' ? 'justify-end' : 'justify-start')}>
              <div
                className={cn(
                  'max-w-[75%] rounded-2xl px-4 py-2 text-sm',
                  message.sender === 'me' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-900'
                )}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-slate-100 px-3 py-3">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Xabar yozing..."
            className="flex-1 rounded-full bg-slate-100 px-4 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            type="submit"
            aria-label="Yuborish"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white disabled:opacity-40"
            disabled={!draft.trim()}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
