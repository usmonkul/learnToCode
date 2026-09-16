import { useEffect, useState } from 'react'
import { PawPrint, Dices } from 'lucide-react'

export default function DogImageGeneratorProject() {
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchDog() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random')
      if (!response.ok) throw new Error('Network error')
      const data = await response.json()
      setImageUrl(data.message)
    } catch {
      setError("Rasm yuklab bo'lmadi. Qayta urinib ko'ring.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDog()
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-orange-50 px-4 py-20">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-600 text-white shadow-lg shadow-amber-200">
        <PawPrint className="h-7 w-7" />
      </span>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">It rasmlari generatori</h1>

      <div className="mt-8 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-xl">
        <div className="flex aspect-square items-center justify-center bg-slate-100">
          {loading && <p className="text-sm text-slate-500">Yuklanmoqda...</p>}
          {!loading && error && <p className="px-6 text-center text-sm text-red-600">{error}</p>}
          {!loading && !error && <img src={imageUrl} alt="Tasodifiy it" className="h-full w-full object-cover" />}
        </div>
        <div className="p-6">
          <button
            onClick={fetchDog}
            disabled={loading}
            className="mx-auto flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
          >
            <Dices className="h-4 w-4" />
            Yangi rasm
          </button>
        </div>
      </div>
    </div>
  )
}
