import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import KeyPoints from '@/components/content/KeyPoints'
import Figure from '@/components/content/Figure'
import trackerTree from '@/assets/homework-tracker-tree.svg'

export const meta = {
  title: "Loyiha: uy vazifalari kuzatuvchisi",
  section: 'Interaktivlik',
}

export default function HomeworkTrackerProjectLesson() {
  return (
    <>
      <p>
        <strong>
          <a href="/loyihalar/react-homework-tracker">Tayyor natijani ko'ring →</a>
        </strong>
      </p>
      <p>
        "Interaktivlik" bo'limining yakuniy loyihasi — maktab o'quvchisi yoki talaba uchun uy
        vazifalari daftari. 11-darsdagi menyu faqat ma'lumotni ko'rsatardi; bu ilova esa
        ma'lumotni <strong>o'zgartiradi</strong>: vazifa qo'shiladi, bajarilgan deb belgilanadi,
        o'chiriladi, filtrlanadi. Bu bo'limda o'rgangan hamma narsa shu yerda birlashadi.
      </p>

      <h2>Talablar</h2>
      <ul>
        <li>
          Forma: vazifa matni, fan (ro'yxatdan tanlanadi) va muddat (sana). Matn bo'sh bo'lsa —
          yuborishga urinishdan keyin xato.
        </li>
        <li>
          Ro'yxat muddat bo'yicha saralangan: eng yaqini tepada. Har bir qatorda: checkbox, matn,
          fan belgisi, muddat ("Bugun", "05.10.2026" yoki qizil "Muddati o'tgan") va o'chirish
          tugmasi.
        </li>
        <li>Bajarilgan vazifa chizilgan va kulrang.</li>
        <li>
          Filtr: Hammasi / Bajarilmagan / Bajarilgan, va yonida "3 ta vazifa qoldi".
        </li>
        <li>"Bajarilganlarni tozalash (N)" tugmasi; bajarilgan vazifa yo'q bo'lsa — o'chirilgan.</li>
        <li>
          Bo'sh holatlar: umuman vazifa yo'q bo'lsa — "Hali vazifa yo'q", filtr bo'yicha yo'q
          bo'lsa — "Bu filtrda vazifa yo'q".
        </li>
      </ul>
      <p>
        Ishlatiladigan bilimlar: hodisalar va handler props (12), <code>useState</code> (13),
        updater funksiyalar (14), obyektlarni (15) va massivlarni (16) yangilash, formalar (17),
        hamda 2-bo'limdagi hamma narsa.
      </p>

      <h2>Reja: state qayerda yashaydi?</h2>
      <p>
        Bu loyihaning eng muhim qarori — komponentlarga bo'lishdan ham oldin —{' '}
        <strong>state qayerda turishi</strong>. Vazifalar ro'yxatini forma ham (qo'shadi),
        filtr paneli ham (sanaydi), qatorlar ham (o'zgartiradi, o'chiradi) ishlatadi. Demak u
        ularning hammasidan yuqorida — <code>App</code>da bo'lishi kerak. Bolalar ma'lumotni
        props orqali oladi, o'zgarish kerak bo'lganda esa <code>App</code>dan kelgan handler'ni
        chaqiradi (12-darsdagi <code>on...</code> props naqshi):
      </p>
      <Figure
        src={trackerTree}
        alt="App (state: vazifalar, filtr) dan VazifaFormasi, FiltrPaneli va VazifaQatori'ga props strelkalari; ulardan App'ga qaytuvchi punktir strelkalar: onQoshish, onFiltr, onAlmashtir va onOchirish."
        caption="1-rasm: ma'lumot pastga — props, o'zgarishlar yuqoriga — handler'lar orqali"
      />
      <p>
        Forma esa o'z ichki state'iga (<code>forma</code> — hali yuborilmagan matn) ega:
        uni boshqa hech kim bilishi shart emas. Bu "state'ni uni ishlatadigan eng yaqin umumiy
        ota komponentga qo'yish" qoidasi — 20-darsda uni batafsil ko'ramiz.
      </p>
      <CodeBlock lang="text">{`src/
├── components/
│   ├── FiltrPaneli.jsx
│   ├── VazifaFormasi.jsx
│   └── VazifaQatori.jsx
├── vazifalar.js
├── Vazifalar.module.css
├── App.jsx
├── index.css
└── main.jsx`}</CodeBlock>

      <h2>1-qadam: ma'lumot va yordamchilar</h2>
      <p>
        <strong>Maqsad:</strong> fanlar ro'yxati, boshlang'ich vazifalar va sana bilan ishlash
        uchun yordamchi funksiyalar.
      </p>
      <CodeBlock lang="js">{`// src/vazifalar.js — ma'lumot va yordamchi funksiyalar
export const FANLAR = ['Matematika', 'Fizika', 'Ona tili', 'Ingliz tili', 'Tarix']

// Bugungi sana ilova yuklanganda BIR MARTA hisoblanadi — render ichida emas.
export const BUGUN = sanaMatni(new Date())
export const ERTAGA = kunQoshish(1)

// mahalliy sana "YYYY-MM-DD" ko'rinishida (toISOString UTC'da hisoblagani uchun ishlatilmaydi)
function sanaMatni(sana) {
  const oy = String(sana.getMonth() + 1).padStart(2, '0')
  const kun = String(sana.getDate()).padStart(2, '0')
  return \`\${sana.getFullYear()}-\${oy}-\${kun}\` // "2026-10-03"
}

export function kunQoshish(kunlar) {
  const sana = new Date()
  sana.setDate(sana.getDate() + kunlar)
  return sanaMatni(sana)
}

export const BOSHLANGICH = [
  { id: 'v1', fan: 'Matematika', matn: "12-mashqdan 5 ta misol yechish", muddat: kunQoshish(1), bajarildi: false },
  { id: 'v2', fan: 'Ona tili', matn: "\\"O'tkan kunlar\\"dan 3-bobni o'qish", muddat: kunQoshish(3), bajarildi: false },
  { id: 'v3', fan: 'Ingliz tili', matn: '20 ta yangi so\\'zni yodlash', muddat: kunQoshish(-1), bajarildi: false },
  { id: 'v4', fan: 'Fizika', matn: 'Laboratoriya ishi hisobotini yozish', muddat: kunQoshish(0), bajarildi: true },
]

export const FILTRLAR = [
  { qiymat: 'hammasi', nomi: 'Hammasi' },
  { qiymat: 'faol', nomi: 'Bajarilmagan' },
  { qiymat: 'bajarilgan', nomi: 'Bajarilgan' },
]

export function muddatMatni(muddat) {
  if (muddat < BUGUN) return 'Muddati o\\'tgan'
  if (muddat === BUGUN) return 'Bugun'
  return muddat.split('-').reverse().join('.') // "05.10.2026"
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong>
      </p>
      <ul>
        <li>
          Sanalar <code>"2026-10-03"</code> ko'rinishidagi satr sifatida saqlanadi.
          Bu format <code>{'<input type="date">'}</code> qaytaradigan qiymat bilan bir xil, va
          bunday satrlarni oddiy <code>{'<'}</code>, <code>===</code> va{' '}
          <code>localeCompare</code> bilan to'g'ri solishtirish mumkin.
        </li>
        <li>
          <code>toISOString()</code> o'rniga sana qismlari qo'lda yig'ilgan:{' '}
          <code>toISOString</code> vaqtni UTC'da hisoblaydi, Toshkent esa UTC+5 — ertalab soat
          5 gacha "bugun" kechagi sana bo'lib chiqardi.
        </li>
        <li>
          <code>BUGUN</code> va <code>ERTAGA</code> modul darajasida, ilova yuklanganda{' '}
          <strong>bir marta</strong> hisoblanadi. Agar <code>new Date()</code> render ichida chaqirilsa, komponent har
          safar boshqa natija berishi mumkin bo'lardi — 9-darsdagi sof render qoidasini eslang.
        </li>
      </ul>

      <h2>2-qadam: VazifaQatori</h2>
      <p>
        <strong>Maqsad:</strong> bitta vazifani ko'rsatish va foydalanuvchi harakatini otaga
        yetkazish.
      </p>
      <CodeBlock lang="jsx">{`// src/components/VazifaQatori.jsx
import styles from '../Vazifalar.module.css'
import { BUGUN, muddatMatni } from '../vazifalar.js'

export default function VazifaQatori({ vazifa, onAlmashtir, onOchirish }) {
  const otgan = !vazifa.bajarildi && vazifa.muddat < BUGUN

  return (
    <li className={vazifa.bajarildi ? \`\${styles.qator} \${styles.bajarilgan}\` : styles.qator}>
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
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong> qator o'zi hech qanday state saqlamaydi va vazifani
        o'zgartirmaydi. Checkbox bosilganda u faqat "shu id'li vazifa almashtirilsin" deb{' '}
        <code>onAlmashtir(vazifa.id)</code>ni chaqiradi — qanday almashtirishni{' '}
        <code>App</code> biladi. Checkbox controlled: <code>checked</code> ma'lumotdan keladi
        (17-dars). <code>otgan</code> esa props'dan hisoblanadi.
      </p>

      <h2>3-qadam: VazifaFormasi</h2>
      <p>
        <strong>Maqsad:</strong> yangi vazifa ma'lumotini yig'ish va tekshirish.
      </p>
      <CodeBlock lang="jsx">{`// src/components/VazifaFormasi.jsx
import { useState } from 'react'
import styles from '../Vazifalar.module.css'
import { FANLAR, ERTAGA } from '../vazifalar.js'

export default function VazifaFormasi({ onQoshish }) {
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
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong>
      </p>
      <ul>
        <li>
          Uch maydon — bitta obyekt state va bitta <code>handleChange</code> (15 va 17-darslar).
        </li>
        <li>
          <code>matnBosh</code> state emas, hisoblanadi. <code>urindi</code> esa — state: xato
          faqat foydalanuvchi yuborishga urinsa chiqadi.
        </li>
        <li>
          Forma vazifani o'zi ro'yxatga qo'shmaydi — ro'yxat uniki emas. U tayyor ma'lumotni{' '}
          <code>onQoshish</code> orqali otaga beradi. <code>id</code> va <code>bajarildi</code>{' '}
          esa ro'yxat egasi — <code>App</code> — tomonidan qo'shiladi.
        </li>
        <li>
          Yuborilgandan keyin faqat matn tozalanadi: fan va muddat saqlanib qoladi — bir fandan
          ketma-ket bir nechta vazifa yozish qulay.
        </li>
      </ul>

      <h2>4-qadam: FiltrPaneli</h2>
      <p>
        <strong>Maqsad:</strong> filtr tugmalari va qolgan vazifalar soni.
      </p>
      <CodeBlock lang="jsx">{`// src/components/FiltrPaneli.jsx
import styles from '../Vazifalar.module.css'
import { FILTRLAR } from '../vazifalar.js'

export default function FiltrPaneli({ filtr, onFiltr, qolganSoni }) {
  return (
    <div className={styles.filtrlar}>
      <div className={styles.filtrTugmalari}>
        {FILTRLAR.map((f) => (
          <button
            key={f.qiymat}
            className={filtr === f.qiymat ? \`\${styles.filtr} \${styles.filtrFaol}\` : styles.filtr}
            onClick={() => onFiltr(f.qiymat)}
          >
            {f.nomi}
          </button>
        ))}
      </div>
      <span className={styles.hisob}>{qolganSoni} ta vazifa qoldi</span>
    </div>
  )
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong> tugmalar <code>FILTRLAR</code> massividan chiziladi —
        uchta deyarli bir xil tugmani qo'lda yozish o'rniga. Panel tanlangan filtrni o'zi
        saqlamaydi: <code>filtr</code> props'dan keladi, bosilganda esa{' '}
        <code>onFiltr</code> chaqiriladi. Shuning uchun <code>App</code> joriy filtrni doim
        biladi va ro'yxatni unga qarab hisoblay oladi.
      </p>

      <h2>5-qadam: App — state, handler'lar va hisob-kitob</h2>
      <p>
        <strong>Maqsad:</strong> ro'yxatni saqlash, uni o'zgartiradigan to'rt amal va
        ko'rsatiladigan ro'yxatni hisoblash.
      </p>
      <CodeBlock lang="jsx">{`// src/App.jsx
import { useState } from 'react'
import styles from './Vazifalar.module.css'
import { BOSHLANGICH } from './vazifalar.js'
import VazifaFormasi from './components/VazifaFormasi.jsx'
import FiltrPaneli from './components/FiltrPaneli.jsx'
import VazifaQatori from './components/VazifaQatori.jsx'

export default function App() {
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
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong>
      </p>
      <ul>
        <li>
          To'rt amal — 16-darsdagi to'rt naqsh: qo'shish — spread, almashtirish —{' '}
          <code>map</code> + spread, o'chirish va tozalash — <code>filter</code>. Hech qayerda{' '}
          <code>push</code> yoki mutatsiya yo'q.
        </li>
        <li>
          Barcha setter'lar updater shaklida (<code>{'eski => ...'}</code>) — 14-dars. Bu yerda
          bitta handler'da bitta yangilanish bo'lsa ham, updater handler'lar keyinchalik
          qayerdan chaqirilmasin xavfsiz.
        </li>
        <li>
          State — faqat ikkita: <code>vazifalar</code> va <code>filtr</code>.{' '}
          <code>qolganSoni</code>, <code>bajarilganSoni</code> va <code>korsatiladigan</code>{' '}
          har renderda ulardan hisoblanadi. Ularni alohida state qilsak, har bir amalda uchta
          narsani sinxron yangilashni unutmaslik kerak bo'lardi.
        </li>
        <li>
          <code>{'onFiltr={setFiltr}'}</code> — setter ham oddiy funksiya, uni to'g'ridan-to'g'ri
          prop qilib berish mumkin.
        </li>
        <li>
          Ikki xil bo'sh holat ternary bilan ajratilgan: ro'yxat umuman bo'shmi yoki faqat
          filtrdan keyin bo'sh qoldimi.
        </li>
      </ul>

      <h2>6-qadam: stillar</h2>
      <p>
        <strong>Maqsad:</strong> daftar ko'rinishi — qog'oz rangidagi varaq va chap tomonda
        qizil hoshiya chizig'i.
      </p>
      <CodeBlock lang="css">{`/* src/Vazifalar.module.css */
.sahifa {
  min-height: 100vh;
  background: #eef2f7;
  padding: 48px 16px 64px;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  color: #111827;
}

.daftar {
  max-width: 640px;
  margin: 0 auto;
  background: #fffdf7;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(30, 58, 138, 0.12);
  padding: 32px 32px 24px 56px;
  position: relative;
}

/* daftar hoshiyasi */
.daftar::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 36px;
  width: 2px;
  background: #ef4444;
  opacity: 0.6;
}

.sarlavha {
  margin: 0 0 4px;
  font-size: 28px;
  font-weight: 800;
  color: #1e3a8a;
  font-family: inherit;
}

.kichikMatn {
  margin: 0 0 24px;
  color: #6b7280;
  font-size: 14px;
}

/* Forma */
.forma {
  display: grid;
  grid-template-columns: 1fr 140px;
  gap: 8px;
  margin-bottom: 20px;
}

.forma input,
.forma select {
  font: inherit;
  font-size: 14px;
  padding: 9px 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  color: #111827;
}

.matnMaydoni {
  grid-column: 1 / -1;
}

.qoshishTugmasi {
  grid-column: 1 / -1;
  font: inherit;
  font-weight: 600;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #1e3a8a;
  color: #ffffff;
  cursor: pointer;
}

.qoshishTugmasi:hover {
  background: #1e40af;
}

.xato {
  grid-column: 1 / -1;
  margin: 0;
  color: #b91c1c;
  font-size: 13px;
}

/* Filtrlar */
.filtrlar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 12px;
  margin-bottom: 4px;
}

.filtrTugmalari {
  display: flex;
  gap: 4px;
}

.filtr {
  font: inherit;
  font-size: 13px;
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  background: transparent;
  color: #374151;
  cursor: pointer;
}

.filtrFaol {
  background: #1e3a8a;
  border-color: #1e3a8a;
  color: #ffffff;
}

.hisob {
  font-size: 13px;
  color: #6b7280;
}

/* Ro'yxat */
.royxat {
  list-style: none;
  margin: 0;
  padding: 0;
}

.qator {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
}

.qator input[type='checkbox'] {
  width: 18px;
  height: 18px;
  accent-color: #1e3a8a;
  cursor: pointer;
}

.qatorMatni {
  flex: 1;
  min-width: 0;
}

.vazifaMatni {
  margin: 0;
  font-size: 15px;
}

.bajarilgan .vazifaMatni {
  text-decoration: line-through;
  color: #9ca3af;
}

.meta {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 4px;
  font-size: 12px;
  color: #6b7280;
}

.fan {
  font-weight: 600;
  border-radius: 4px;
  padding: 1px 6px;
  background: #e0e7ff;
  color: #1e3a8a;
}

.muddatOtgan {
  color: #b91c1c;
  font-weight: 600;
}

.ochirish {
  font-size: 18px;
  line-height: 1;
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
}

.ochirish:hover {
  color: #b91c1c;
  background: #fee2e2;
}

.bosh {
  text-align: center;
  color: #6b7280;
  padding: 32px 0;
  margin: 0;
}

.pastki {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.tozalash {
  font: inherit;
  font-size: 13px;
  border: none;
  background: transparent;
  color: #6b7280;
  text-decoration: underline;
  cursor: pointer;
}

.tozalash:disabled {
  opacity: 0.4;
  cursor: default;
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong> hoshiya chizig'i alohida element emas,{' '}
        <code>::before</code> psevdo-elementi — bu sof bezak, JSX'ni ortiqcha{' '}
        <code>{'<div>'}</code> bilan to'ldirish shart emas. Bajarilgan vazifa ko'rinishi esa{' '}
        <code>.bajarilgan .vazifaMatni</code> selektori bilan: qatorga bitta klass qo'shiladi,
        qolganini CSS hal qiladi.
      </p>

      <h2>To'liq kod</h2>
      <p>
        1–6-qadamlardagi fayllar yakuniy ko'rinishda. Qolgan ikki fayl 11-darsdagidek:
      </p>
      <CodeBlock lang="css">{`/* src/index.css */
body {
  margin: 0;
}`}</CodeBlock>
      <CodeBlock lang="jsx">{`// src/main.jsx — 2-darsdagidek, o'zgarishsiz
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)`}</CodeBlock>
      <p>
        Ilovani ishga tushiring va <a href="/loyihalar/react-homework-tracker">tayyor natija</a>{' '}
        bilan solishtiring. Tekshiring:
      </p>
      <ul>
        <li>Bo'sh matn bilan "Vazifa qo'shish" — xato chiqadi, ro'yxat o'zgarmaydi.</li>
        <li>Yangi vazifa muddatiga qarab ro'yxatning to'g'ri joyida paydo bo'ladi.</li>
        <li>"Bajarilgan" filtrida turib vazifani belgidan chiqarsangiz, u ro'yxatdan yo'qoladi.</li>
        <li>Konsolda <code>key</code> yoki controlled input haqida ogohlantirish yo'q.</li>
      </ul>

      <Callout type="note" title="Sahifani yangilasangiz...">
        ...barcha vazifalar boshlang'ich holatga qaytadi: state faqat xotirada yashaydi. Uni
        brauzerda saqlash (<code>localStorage</code>) — tashqi dunyo bilan sinxronlash, ya'ni
        effect. Buni 26 va 30-darslarda o'rganamiz va 31-darsdagi loyihada qo'llaymiz.
      </Callout>

      <h2>Qo'shimcha topshiriqlar</h2>
      <p>Yechimlari berilmaydi — o'zingiz bajaring.</p>
      <ol>
        <li>
          <strong>Tahrirlash.</strong> Vazifa matniga ikki marta bosilganda (
          <code>onDoubleClick</code>) matn input'ga aylansin; Enter bosilganda saqlansin, Escape
          bosilganda bekor qilinsin. Qaysi state qaysi komponentda bo'lishi kerak?
        </li>
        <li>
          <strong>Fan bo'yicha filtr.</strong> Holat filtridan tashqari fan tanlash
          (<code>select</code>) qo'shing. Ikkala filtr birga ishlasin: "Matematika, bajarilmagan".
        </li>
        <li>
          <strong>Progress.</strong> Sarlavha ostida "Bugungi vazifalar: 2/5" va shunga mos
          progress chizig'i (10-darsdagi <code>style</code> bilan kenglik).
        </li>
      </ol>

      <KeyPoints>
        <li>
          Avval state qayerda yashashini hal qiling: uni ishlatadigan barcha komponentlarning eng
          yaqin umumiy otasida.
        </li>
        <li>
          Ma'lumot props orqali pastga tushadi, o'zgarishlar esa <code>on...</code> handler
          props orqali yuqoriga ko'tariladi; bola ota state'ini to'g'ridan-to'g'ri o'zgartirmaydi.
        </li>
        <li>
          Ro'yxat amallari — spread, <code>map</code>, <code>filter</code>; hech qachon{' '}
          <code>push</code> yoki mutatsiya.
        </li>
        <li>
          Minimal state saqlang: soni, filtrlangan va saralangan ro'yxat — hisoblanadi.
        </li>
        <li>
          Render sof qolsin: "bugun" kabi o'zgaruvchan qiymatlar render ichida emas, bir marta
          hisoblanadi.
        </li>
      </KeyPoints>
    </>
  )
}
