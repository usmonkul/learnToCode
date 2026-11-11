import { useCallback, useEffect, useState } from 'react'
import { BellRing, CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react'
import { cn } from '@/lib/cn'

const DURATION = 3000

const VARIANTS = {
  success: { label: 'Muvaffaqiyat', message: "Ma'lumotlar saqlandi.", Icon: CircleCheck, classes: 'bg-green-600' },
  error: { label: 'Xato', message: "Internet bilan bog'lanib bo'lmadi.", Icon: CircleAlert, classes: 'bg-red-600' },
  warning: { label: 'Ogohlantirish', message: 'Parolingiz muddati tugayapti.', Icon: TriangleAlert, classes: 'bg-amber-600' },
  info: { label: "Ma'lumot", message: 'Yangi versiya mavjud.', Icon: Info, classes: 'bg-blue-600' },
}

function Toast({ toast, onClose }) {
  const { Icon, label, message, classes } = VARIANTS[toast.type]

  // Har bir toast o'z taymeriga ega; komponent yo'qolsa taymer ham tozalanadi.
  useEffect(() => {
    const timer = setTimeout(() => onClose(toast.id), DURATION)
    return () => clearTimeout(timer)
  }, [toast.id, onClose])

  return (
    <div className={cn('flex w-80 items-start gap-3 rounded-2xl p-4 text-white shadow-lg', classes)}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-sm text-white/85">{message}</p>
      </div>
      <button type="button" onClick={() => onClose(toast.id)} aria-label="Yopish" className="text-white/70 hover:text-white">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export default function ToastNotificationsProject() {
  const [toasts, setToasts] = useState([])

  function showToast(type) {
    setToasts((prev) => [...prev, { id: Date.now() + Math.random(), type }])
  }

  // useCallback — funksiya har renderda qayta yaratilmasin, aks holda Toast ichidagi taymer qayta boshlanadi.
  const closeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-50 px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg">
        <BellRing className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Toast bildirishnomalar</h1>
      <p className="mt-2 max-w-sm text-center text-slate-500">
        Tugmalardan birini bosing. Xabar {DURATION / 1000} soniyadan keyin o'zi yopiladi.
      </p>

      <div className="mt-10 grid w-full max-w-sm grid-cols-2 gap-3 rounded-3xl bg-white p-6 shadow-xl">
        {Object.entries(VARIANTS).map(([type, variant]) => (
          <button
            key={type}
            type="button"
            onClick={() => showToast(type)}
            className={cn('rounded-full px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90', variant.classes)}
          >
            {variant.label}
          </button>
        ))}
      </div>

      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={closeToast} />
        ))}
      </div>
    </div>
  )
}
