import { useState } from 'react'
import { cn } from '@/lib/cn'

// Spans are literal class strings so Tailwind can see them at build time.
const CARDS = [
  { id: 'visits', title: 'Tashriflar', value: '12 480', className: 'col-span-2 row-span-2 bg-violet-600 text-white' },
  { id: 'orders', title: 'Buyurtmalar', value: '384', className: 'col-span-1 bg-neutral-800 text-white' },
  { id: 'rating', title: 'Reyting', value: '4.8', className: 'col-span-1 bg-lime-400 text-neutral-900' },
  { id: 'wide', title: 'Oylik daromad', value: '$18 240', className: 'col-span-3 bg-neutral-800 text-white' },
  { id: 'tall', title: 'Yangi mijozlar', value: '96', className: 'col-span-1 row-span-2 bg-sky-500 text-white' },
  { id: 'refunds', title: 'Qaytarishlar', value: '7', className: 'col-span-1 bg-neutral-800 text-white' },
  { id: 'uptime', title: 'Uptime', value: '99.9%', className: 'col-span-2 bg-neutral-800 text-white' },
  { id: 'tickets', title: 'Murojaatlar', value: '23', className: 'col-span-1 bg-rose-500 text-white' },
]

export default function BentoDashboardProject() {
  const [dense, setDense] = useState(true)

  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-3xl font-bold text-white">Bento panel</h1>
        <p className="mt-3 text-center text-neutral-400">
          Kartochkalar <code className="text-lime-400">col-span</code> va <code className="text-lime-400">row-span</code>{' '}
          bilan turli o'lchamga ega. <code className="text-lime-400">dense</code> rejimi bo'shliqlarni to'ldiradi;
          uni <code className="text-lime-400">row</code> ga almashtirsangiz, bo'sh joylar paydo bo'ladi.
        </p>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setDense((value) => !value)}
            className={cn(
              'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
              dense ? 'bg-lime-400 text-neutral-900' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            )}
          >
            grid-auto-flow: {dense ? 'dense' : 'row'}
          </button>
        </div>

        <div className={cn('mt-8 grid auto-rows-[110px] grid-cols-3 gap-3', dense && 'grid-flow-dense')}>
          {CARDS.map((card) => (
            <div key={card.id} className={cn('flex flex-col justify-between rounded-2xl p-4', card.className)}>
              <span className="text-sm font-medium opacity-80">{card.title}</span>
              <span className="text-2xl font-bold">{card.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
