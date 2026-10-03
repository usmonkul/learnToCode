import { useEffect, useRef, useState } from 'react'
import styles from './Project.module.css'
import { useDebounce, useFetch, useLocalStorage } from './hooks.js'

// React kursining 31-darsi (project-book-search) quradigan ilovaning tayyor varianti.
// Darsda komponentlar alohida fayllarda; bu yerda galereya uchun bitta faylga jamlangan.

const MAYDONLAR = 'key,title,author_name,first_publish_year,cover_i'

function qidiruvManzili(soz) {
  if (soz.trim().length < 2) return null
  return `https://openlibrary.org/search.json?q=${encodeURIComponent(soz.trim())}&limit=24&fields=${MAYDONLAR}`
}

// API javobidagi kitobni ilova uchun qulay ko'rinishga keltirish
function kitobga(doc) {
  return {
    id: doc.key,
    nomi: doc.title,
    muallif: doc.author_name?.join(', ') ?? "Muallif noma'lum",
    yil: doc.first_publish_year ?? null,
    muqova: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
  }
}

function QidiruvMaydoni({ ref, qiymat, onChange }) {
  return (
    <div className={styles.qidiruv}>
      <span className={styles.qidiruvBelgi}>🔍</span>
      <input
        ref={ref}
        value={qiymat}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Kitob nomi yoki muallif..."
        className={styles.qidiruvInput}
      />
      <kbd className={styles.klavish}>/</kbd>
    </div>
  )
}

function KitobKartasi({ kitob, sevimli, onSevimli }) {
  return (
    <article className={styles.karta}>
      {kitob.muqova ? (
        <img src={kitob.muqova} alt={kitob.nomi} className={styles.muqova} loading="lazy" />
      ) : (
        <div className={styles.muqovaYoq}>📖</div>
      )}
      <div className={styles.kartaMatni}>
        <h3 className={styles.kitobNomi}>{kitob.nomi}</h3>
        <p className={styles.muallif}>{kitob.muallif}</p>
        {kitob.yil && <p className={styles.yil}>{kitob.yil}</p>}
      </div>
      <button
        className={sevimli ? `${styles.yurak} ${styles.yurakFaol}` : styles.yurak}
        onClick={() => onSevimli(kitob)}
        aria-label={sevimli ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
      >
        {sevimli ? '♥' : '♡'}
      </button>
    </article>
  )
}

function Natijalar({ url, sevimliIdlar, onSevimli }) {
  const { holat, data, xato } = useFetch(url)

  if (holat === 'yuklanmoqda') {
    return (
      <div className={styles.tor}>
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className={styles.skelet} />
        ))}
      </div>
    )
  }
  if (holat === 'xato') return <p className={styles.xabar}>Xatolik: {xato}. Internetni tekshiring.</p>

  const kitoblar = data.docs.map(kitobga)
  if (kitoblar.length === 0) return <p className={styles.xabar}>Hech narsa topilmadi 😕</p>

  return (
    <>
      <p className={styles.soni}>{data.numFound.toLocaleString('uz-UZ')} ta natija</p>
      <div className={styles.tor}>
        {kitoblar.map((k) => (
          <KitobKartasi key={k.id} kitob={k} sevimli={sevimliIdlar.has(k.id)} onSevimli={onSevimli} />
        ))}
      </div>
    </>
  )
}

export default function BookSearchProject() {
  const [soz, setSoz] = useState('')
  const [tab, setTab] = useState('qidiruv') // 'qidiruv' | 'sevimlilar'
  const [sevimlilar, setSevimlilar] = useLocalStorage('kitob-sevimlilar', [])
  const inputRef = useRef(null)

  const qidiruvSozi = useDebounce(soz, 500)
  const url = qidiruvManzili(qidiruvSozi)
  const sevimliIdlar = new Set(sevimlilar.map((k) => k.id))

  // "/" bosilganda qidiruvga fokus — tashqi tizim (window) bilan sinxronlash
  useEffect(() => {
    function handleKeyDown(e) {
      const yozilmoqda = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA'
      if (e.key === '/' && !yozilmoqda) {
        e.preventDefault()
        setTab('qidiruv')
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // brauzer tab'idagi sarlavha — tashqi tizim (document) bilan sinxronlash
  useEffect(() => {
    const oldingi = document.title
    document.title = sevimlilar.length > 0 ? `Kitob qidiruv (♥ ${sevimlilar.length})` : 'Kitob qidiruv'
    return () => {
      document.title = oldingi
    }
  }, [sevimlilar.length])

  function handleSevimli(kitob) {
    setSevimlilar((eski) =>
      eski.some((k) => k.id === kitob.id) ? eski.filter((k) => k.id !== kitob.id) : [...eski, kitob],
    )
  }

  return (
    <div className={styles.sahifa}>
      <div className={styles.konteyner}>
        <header className={styles.sarlavha}>
          <h1 className={styles.logo}>Kitob qidiruv</h1>
          <p className={styles.shior}>Open Library'dagi 20 milliondan ortiq kitob orasida</p>
        </header>

        <nav className={styles.tablar}>
          <button
            className={tab === 'qidiruv' ? `${styles.tab} ${styles.tabFaol}` : styles.tab}
            onClick={() => setTab('qidiruv')}
          >
            Qidiruv
          </button>
          <button
            className={tab === 'sevimlilar' ? `${styles.tab} ${styles.tabFaol}` : styles.tab}
            onClick={() => setTab('sevimlilar')}
          >
            Sevimlilar ({sevimlilar.length})
          </button>
        </nav>

        {tab === 'qidiruv' ? (
          <>
            <QidiruvMaydoni ref={inputRef} qiymat={soz} onChange={setSoz} />
            {url === null ? (
              <p className={styles.xabar}>Kamida 2 ta harf yozing. Masalan: "Samarkand" yoki "Tolkien".</p>
            ) : (
              <Natijalar key={url} url={url} sevimliIdlar={sevimliIdlar} onSevimli={handleSevimli} />
            )}
          </>
        ) : sevimlilar.length === 0 ? (
          <p className={styles.xabar}>Hali sevimli kitob yo'q. Qidiruvda ♡ ni bosing.</p>
        ) : (
          <div className={styles.tor}>
            {sevimlilar.map((k) => (
              <KitobKartasi key={k.id} kitob={k} sevimli onSevimli={handleSevimli} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
