import { useEffect, useState } from 'react'

// 30-darsdagi hook'lar — o'zgarishsiz

export function useDebounce(qiymat, kechikish = 400) {
  const [kechiktirilgan, setKechiktirilgan] = useState(qiymat)

  useEffect(() => {
    const id = setTimeout(() => setKechiktirilgan(qiymat), kechikish)
    return () => clearTimeout(id)
  }, [qiymat, kechikish])

  return kechiktirilgan
}

export function useFetch(url) {
  const [natija, setNatija] = useState({ holat: 'yuklanmoqda', data: null, xato: null })

  useEffect(() => {
    if (!url) return
    const controller = new AbortController()

    async function yuklash() {
      try {
        const javob = await fetch(url, { signal: controller.signal })
        if (!javob.ok) throw new Error(`Server xatosi: ${javob.status}`)
        const data = await javob.json()
        setNatija({ holat: 'tayyor', data, xato: null })
      } catch (err) {
        if (err.name === 'AbortError') return
        setNatija({ holat: 'xato', data: null, xato: err.message })
      }
    }
    yuklash()

    return () => controller.abort()
  }, [url])

  if (!url) return { holat: 'kutilmoqda', data: null, xato: null }
  return natija
}

export function useLocalStorage(kalit, boshlangichQiymat) {
  const [qiymat, setQiymat] = useState(() => {
    try {
      const saqlangan = localStorage.getItem(kalit)
      return saqlangan !== null ? JSON.parse(saqlangan) : boshlangichQiymat
    } catch {
      return boshlangichQiymat
    }
  })

  useEffect(() => {
    localStorage.setItem(kalit, JSON.stringify(qiymat))
  }, [kalit, qiymat])

  return [qiymat, setQiymat]
}
