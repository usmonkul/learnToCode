import { useEffect, useState } from 'react'
import { Quote, Dices } from 'lucide-react'

export default function AdviceGeneratorProject() {
  const [advice, setAdvice] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchAdvice() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`https://api.adviceslip.com/advice?_=${Date.now()}`)
      if (!response.ok) throw new Error('Network error')
      const data = await response.json()
      setAdvice(data.slip.advice)
    } catch {
      setError("Maslahat yuklab bo'lmadi. Qayta urinib ko'ring.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdvice()
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-700 px-4 py-20">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-2xl">
        <Quote className="mx-auto h-8 w-8 text-cyan-500" />
        <p className="mt-4 min-h-[4.5rem] text-xl font-medium text-slate-800">
          {loading ? 'Yuklanmoqda...' : error || advice}
        </p>
        <button
          onClick={fetchAdvice}
          disabled={loading}
          className="mx-auto mt-8 flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-700 disabled:opacity-50"
        >
          <Dices className="h-4 w-4" />
          Yangi maslahat
        </button>
      </div>
    </div>
  )
}
