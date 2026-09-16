import { useState } from 'react'
import { ShoppingCart, Trash2 } from 'lucide-react'

export default function ExpenseTrackerProject() {
  const [items, setItems] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')

  function addItem(event) {
    event.preventDefault()
    const trimmedName = name.trim()
    const value = Number(price)
    if (!trimmedName || !price || Number.isNaN(value) || value <= 0) return

    setItems((prev) => [...prev, { id: Date.now(), name: trimmedName, price: value }])
    setName('')
    setPrice('')
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="flex min-h-screen flex-col items-center bg-black px-4 py-20">
      <h1 className="text-center text-3xl font-bold text-white">Xarajatlar Hisoblagichi</h1>
      <p className="mt-2 text-center text-zinc-400">Xaridlaringizni kiriting va umumiy byudjetni real-vaqtda hisoblang</p>

      <form onSubmit={addItem} className="mt-8 w-full max-w-md rounded-3xl bg-zinc-900 p-6">
        <label className="text-sm font-semibold text-zinc-300">Mahsulot / Xarajat nomi:</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Masalan: Kitob, Qahva, Oziq-ovqat..."
          className="mt-2 w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white placeholder:text-zinc-600 focus:border-sky-500 focus:outline-none"
        />

        <label className="mt-5 block text-sm font-semibold text-zinc-300">Narxi (so'mda):</label>
        <div className="relative mt-2">
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Masalan: 45000"
            className="w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 pr-14 text-white placeholder:text-zinc-600 focus:border-sky-500 focus:outline-none"
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">so'm</span>
        </div>

        <button
          type="submit"
          className="mt-5 w-full rounded-full bg-white py-3 font-semibold text-black hover:bg-zinc-200"
        >
          + Xaridni Qo'shish
        </button>
      </form>

      <div className="mt-6 w-full max-w-md rounded-3xl bg-zinc-900 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Xaridlar Ro'yxati</h2>
          <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">
            {items.length} ta mahsulot
          </span>
        </div>
        <div className="mt-4 border-t border-zinc-800" />

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-10">
            <ShoppingCart className="h-8 w-8 text-zinc-600" />
            <p className="text-sm text-zinc-500">Hozircha xaridlar qo'shilmagan</p>
          </div>
        ) : (
          <ul className="mt-4 flex flex-col gap-2">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between rounded-xl bg-black px-4 py-3">
                <div>
                  <p className="font-medium text-white">{item.name}</p>
                  <p className="text-sm font-semibold text-sky-400">{item.price.toLocaleString('en-US')} so'm</p>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-zinc-600 hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-5">
          <div>
            <p className="text-xs font-semibold tracking-wide text-zinc-500">JAMI SUMMA:</p>
            <p className="text-2xl font-bold text-white">{total.toLocaleString('en-US')} so'm</p>
          </div>
          <button
            onClick={() => setItems([])}
            className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800"
          >
            Tozalash
          </button>
        </div>
      </div>
    </div>
  )
}
