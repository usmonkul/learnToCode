import { useState } from 'react'
import { MessageCircleQuestion, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

const FAQS = [
  {
    question: 'Bu loyihalar nimaga kerak?',
    answer: "Har bir loyiha darsliklarda o'rganganlaringizni amalda qo'llash uchun kichik, tayyor mashqdir.",
  },
  {
    question: "Loyiha kodini ko'rish mumkinmi?",
    answer:
      "Hozircha kodni to'g'ridan-to'g'ri sahifada ko'rsatish yo'q — loyiha ustidagi (i) tugmasi orqali ishlatilgan ranglar, shriftlar va API havolasini topishingiz mumkin.",
  },
  {
    question: 'Loyihalar bepulmi?',
    answer: 'Ha, barcha loyihalar butunlay bepul va istalgancha marta ishlatishingiz mumkin.',
  },
  {
    question: "Yangi loyihalar qo'shilib boriladimi?",
    answer: "Ha, Loyihalar bo'limi doimiy yangilanib boradi.",
  },
]

export default function FaqAccordionProject() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="flex min-h-screen flex-col items-center bg-amber-50 px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-600 text-white shadow-lg shadow-amber-200">
        <MessageCircleQuestion className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Ko'p so'raladigan savollar</h1>

      <div className="mt-10 flex w-full max-w-xl flex-col gap-3">
        {FAQS.map((faq, index) => {
          const isOpen = index === openIndex
          return (
            <div key={faq.question} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-amber-50"
              >
                <span className="font-medium text-slate-900">{faq.question}</span>
                <ChevronDown
                  className={cn('h-5 w-5 shrink-0 text-amber-600 transition-transform', isOpen && 'rotate-180')}
                />
              </button>
              {isOpen && <p className="border-t border-amber-100 px-5 py-4 text-sm text-slate-600">{faq.answer}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
