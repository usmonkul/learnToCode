import { useState } from 'react'
import styles from './Project.module.css'

// React kursining 18-darsi (project-homework-tracker) quradigan ilovaning tayyor varianti.
// Darsda komponentlar alohida fayllarda; bu yerda galereya uchun bitta faylga jamlangan.

const FANLAR = ['Matematika', 'Fizika', 'Ona tili', 'Ingliz tili', 'Tarix']

// Bugungi sana ilova yuklanganda BIR MARTA hisoblanadi — render ichida emas.
const BUGUN = sanaMatni(new Date())
const ERTAGA = kunQoshish(1)

// mahalliy sana "YYYY-MM-DD" ko'rinishida (toISOString UTC'da hisoblagani uchun ishlatilmaydi)
function sanaMatni(sana) {
  const oy = String(sana.getMonth() + 1).padStart(2, '0')
  const kun = String(sana.getDate()).padStart(2, '0')
  return `${sana.getFullYear()}-${oy}-${kun}` // "2026-10-03"
}

function kunQoshish(kunlar) {
  const sana = new Date()
  sana.setDate(sana.getDate() + kunlar)
  return sanaMatni(sana)
}

const BOSHLANGICH = [
  { id: 'v1', fan: 'Matematika', matn: "12-mashqdan 5 ta misol yechish", muddat: kunQoshish(1), bajarildi: false },
  { id: 'v2', fan: 'Ona tili', matn: "\"O'tkan kunlar\"dan 3-bobni o'qish", muddat: kunQoshish(3), bajarildi: false },
  { id: 'v3', fan: 'Ingliz tili', matn: '20 ta yangi so\'zni yodlash', muddat: kunQoshish(-1), bajarildi: false },
  { id: 'v4', fan: 'Fizika', matn: 'Laboratoriya ishi hisobotini yozish', muddat: kunQoshish(0), bajarildi: true },
]

const FILTRLAR = [
  { qiymat: 'hammasi', nomi: 'Hammasi' },
  { qiymat: 'faol', nomi: 'Bajarilmagan' },
  { qiymat: 'bajarilgan', nomi: 'Bajarilgan' },
]

function muddatMatni(muddat) {
  if (muddat < BUGUN) return 'Muddati o\'tgan'
  if (muddat === BUGUN) return 'Bugun'
  return muddat.split('-').reverse().join('.') // "05.10.2026"
}

function VazifaFormasi({ onQoshish }) {
  const [forma, setForma] = useState({ fan: FANLAR[0], matn: '', muddat: ERTAGA })
  const [urindi, setUrindi] = useState(false)

  const matnBosh = forma.matn.trim() === ''

  function handleChange(e) {
    setForma({ ...forma, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (matnBosh) {
      setUrindi(true)
      return
    }
    onQoshish({ ...forma, matn: forma.matn.trim() })
    setForma({ ...forma, matn: '' })
    setUrindi(false)
  }

  return (
    <form className={styles.forma} onSubmit={handleSubmit}>
      <input
        className={styles.matnMaydoni}
        name="matn"
        value={forma.matn}
        onChange={handleChange}
        placeholder="Masalan: 15-betdagi mashqlar"
      />
      <select name="fan" value={forma.fan} onChange={handleChange}>
        {FANLAR.map((fan) => (
          <option key={fan} value={fan}>
            {fan}
          </option>
        ))}
      </select>
      <input type="date" name="muddat" value={forma.muddat} onChange={handleChange} />
      {urindi && matnBosh && <p className={styles.xato}>Vazifa matnini kiriting</p>}
      <button type="submit" className={styles.qoshishTugmasi}>
        Vazifa qo'shish
      </button>
    </form>
  )
}

function FiltrPaneli({ filtr, onFiltr, qolganSoni }) {
  return (
    <div className={styles.filtrlar}>
      <div className={styles.filtrTugmalari}>
        {FILTRLAR.map((f) => (
          <button
            key={f.qiymat}
            className={filtr === f.qiymat ? `${styles.filtr} ${styles.filtrFaol}` : styles.filtr}
            onClick={() => onFiltr(f.qiymat)}
          >
            {f.nomi}
          </button>
        ))}
      </div>
      <span className={styles.hisob}>{qolganSoni} ta vazifa qoldi</span>
    </div>
  )
}

function VazifaQatori({ vazifa, onAlmashtir, onOchirish }) {
  const otgan = !vazifa.bajarildi && vazifa.muddat < BUGUN

  return (
    <li className={vazifa.bajarildi ? `${styles.qator} ${styles.bajarilgan}` : styles.qator}>
      <input
        type="checkbox"
        checked={vazifa.bajarildi}
        onChange={() => onAlmashtir(vazifa.id)}
        aria-label="Bajarildi"
      />
      <div className={styles.qatorMatni}>
        <p className={styles.vazifaMatni}>{vazifa.matn}</p>
        <div className={styles.meta}>
          <span className={styles.fan}>{vazifa.fan}</span>
          <span className={otgan ? styles.muddatOtgan : undefined}>{muddatMatni(vazifa.muddat)}</span>
        </div>
      </div>
      <button className={styles.ochirish} onClick={() => onOchirish(vazifa.id)} aria-label="O'chirish">
        ×
      </button>
    </li>
  )
}

export default function HomeworkTrackerProject() {
  const [vazifalar, setVazifalar] = useState(BOSHLANGICH)
  const [filtr, setFiltr] = useState('hammasi')

  function handleQoshish(yangi) {
    setVazifalar((eski) => [...eski, { ...yangi, id: crypto.randomUUID(), bajarildi: false }])
  }

  function handleAlmashtir(id) {
    setVazifalar((eski) => eski.map((v) => (v.id === id ? { ...v, bajarildi: !v.bajarildi } : v)))
  }

  function handleOchirish(id) {
    setVazifalar((eski) => eski.filter((v) => v.id !== id))
  }

  function handleTozalash() {
    setVazifalar((eski) => eski.filter((v) => !v.bajarildi))
  }

  // hisoblanadigan qiymatlar — state emas
  const qolganSoni = vazifalar.filter((v) => !v.bajarildi).length
  const bajarilganSoni = vazifalar.length - qolganSoni
  const korsatiladigan = vazifalar
    .filter((v) => {
      if (filtr === 'faol') return !v.bajarildi
      if (filtr === 'bajarilgan') return v.bajarildi
      return true
    })
    .toSorted((a, b) => a.muddat.localeCompare(b.muddat))

  return (
    <div className={styles.sahifa}>
      <main className={styles.daftar}>
        <h1 className={styles.sarlavha}>Uy vazifalari</h1>
        <p className={styles.kichikMatn}>Muddati yaqinlari tepada.</p>

        <VazifaFormasi onQoshish={handleQoshish} />
        <FiltrPaneli filtr={filtr} onFiltr={setFiltr} qolganSoni={qolganSoni} />

        {korsatiladigan.length === 0 ? (
          <p className={styles.bosh}>
            {vazifalar.length === 0 ? "Hali vazifa yo'q. Birinchisini qo'shing!" : "Bu filtrda vazifa yo'q."}
          </p>
        ) : (
          <ul className={styles.royxat}>
            {korsatiladigan.map((v) => (
              <VazifaQatori key={v.id} vazifa={v} onAlmashtir={handleAlmashtir} onOchirish={handleOchirish} />
            ))}
          </ul>
        )}

        <div className={styles.pastki}>
          <button className={styles.tozalash} onClick={handleTozalash} disabled={bajarilganSoni === 0}>
            Bajarilganlarni tozalash ({bajarilganSoni})
          </button>
        </div>
      </main>
    </div>
  )
}
