import { useState } from 'react'
import { BookOpen, Laptop, Search, Shirt, ShoppingBasket, Store } from 'lucide-react'
import { cn } from '@/lib/cn'
import { CATEGORIES, PRODUCTS } from './products'

const CATEGORY_ICONS = {
  Elektronika: Laptop,
  Kiyim: Shirt,
  Kitoblar: BookOpen,
  'Oziq-ovqat': ShoppingBasket,
}

const SORT_OPTIONS = [
  { value: 'default', label: 'Standart tartib' },
  { value: 'price-asc', label: 'Arzonroq avval' },
  { value: 'price-desc', label: 'Qimmatroq avval' },
  { value: 'name', label: 'Nomi (A → Z)' },
]

function formatSum(value) {
  return value.toLocaleString('ru-RU')
}

export default function ProductCatalogProject() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Hammasi')
  const [sortBy, setSortBy] = useState('default')

  const query = search.trim().toLowerCase()

  // 1) filter — qidiruv va kategoriya bo'yicha
  const filtered = PRODUCTS.filter((product) => {
    const matchesCategory = category === 'Hammasi' || product.category === category
    const matchesSearch = product.name.toLowerCase().includes(query)
    return matchesCategory && matchesSearch
  })

  // 2) sort — asl massivni o'zgartirmaslik uchun nusxasini saralaymiz
  const visible = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return 0
  })

  return (
    <div className="min-h-screen bg-teal-50 px-4 py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg shadow-teal-200">
          <Store className="h-7 w-7" />
        </span>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Mahsulotlar katalogi</h1>
        <p className="mt-2 text-slate-500">Qidiring, filtrlang va saralang.</p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Mahsulot qidirish..."
              className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium',
                category === item ? 'bg-teal-600 text-white' : 'bg-white text-slate-600 hover:bg-teal-100'
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm text-slate-500">{visible.length} ta mahsulot topildi</p>

        {visible.length === 0 ? (
          <div className="mt-4 rounded-3xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <p className="font-semibold text-slate-900">Hech narsa topilmadi</p>
            <p className="mt-1 text-sm text-slate-500">Boshqa so'z yoki kategoriyani sinab ko'ring.</p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => {
              const Icon = CATEGORY_ICONS[product.category]
              return (
                <div key={product.id} className="rounded-3xl bg-white p-5 shadow-sm">
                  <span className="flex h-24 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                    <Icon className="h-10 w-10" />
                  </span>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-400">{product.category}</p>
                  <p className="mt-1 font-semibold text-slate-900">{product.name}</p>
                  <p className="mt-2 text-lg font-bold text-teal-700">{formatSum(product.price)} so'm</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
