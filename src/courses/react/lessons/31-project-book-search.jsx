import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import KeyPoints from '@/components/content/KeyPoints'
import Figure from '@/components/content/Figure'
import bookSearchFlow from '@/assets/book-search-flow.svg'

export const meta = {
  title: "Yakuniy loyiha: kitob qidiruv",
  section: 'Ref va effektlar',
}

export default function BookSearchProjectLesson() {
  return (
    <>
      <p>
        <strong>
          <a href="/loyihalar/react-book-search">Tayyor natijani ko'ring →</a>
        </strong>
      </p>
      <p>
        Kursning yakuniy loyihasi. Bu safar ma'lumot faylda emas, haqiqiy serverda: Open Library
        — 20 milliondan ortiq kitob haqida ma'lumot beradigan bepul, ochiq API (kalit yoki
        ro'yxatdan o'tish kerak emas). Foydalanuvchi kitob qidiradi, natijalarni ko'radi va
        yoqqanlarini sevimlilarga qo'shadi — ular sahifa yangilanganda ham saqlanib qoladi.
        Ilova kursdagi deyarli hamma narsani ishlatadi: komponentlar, props, ro'yxatlar,
        state, shartli render, ref, effect'lar, cleanup, ma'lumot yuklash va o'z hook'laringiz.
      </p>

      <h2>Talablar</h2>
      <ul>
        <li>
          Qidiruv maydoni: foydalanuvchi yozishni to'xtatganidan 500 ms keyin qidiruv boshlanadi.
          2 harfdan kam bo'lsa — maslahat matni.
        </li>
        <li>
          Yuklanish paytida — skelet kartalar (yaltiraydigan kulrang to'rtburchaklar), xato
          bo'lsa — xabar, natija bo'lmasa — "Hech narsa topilmadi", aks holda — natijalar soni
          va kartalar to'ri.
        </li>
        <li>
          Kitob kartasi: muqova (yo'q bo'lsa — 📖), nomi, muallif(lar), birinchi nashr yili va ♡
          tugmasi.
        </li>
        <li>
          "Qidiruv" va "Sevimlilar (N)" tablari. Sevimlilar <code>localStorage</code>da saqlanadi.
        </li>
        <li>
          Klaviaturada <kbd>/</kbd> bosilganda qidiruv maydoniga fokus tushadi. Brauzer
          tabidagi sarlavhada sevimlilar soni.
        </li>
        <li>Foydalanuvchi tez yozganda eski so'rovlar natijasi hech qachon ekranga chiqmasligi kerak.</li>
      </ul>
      <p>
        Ishlatiladigan bilimlar: ref (25), effect va cleanup (26–27), ma'lumot yuklash va poyga
        holati (28), qachon effect kerak emasligi (29), custom hook'lar (30), shuningdek key
        bilan qayta boshlash (21) va state tuzilishi (19).
      </p>

      <h2>Reja</h2>
      <p>
        Avval ma'lumot oqimini o'ylaymiz. Foydalanuvchi yozgan har bir harf — state (
        <code>soz</code>). Lekin har bir harfda so'rov yubormaslik uchun undan kechiktirilgan
        qiymat olinadi (<code>useDebounce</code>), undan esa so'rov manzili{' '}
        <strong>hisoblanadi</strong>. Natijalar komponenti manzil bo'yicha ma'lumotni yuklaydi:
      </p>
      <Figure
        src={bookSearchFlow}
        alt="QidiruvMaydoni'dagi soz useDebounce orqali url'ga aylanadi; Natijalar key={url} bilan useFetch orqali Open Library'dan yuklaydi; KitobKartasi ♡ tugmasi App'dagi useLocalStorage sevimlilariga yozadi."
        caption="1-rasm: ma'lumot oqimi — state, hisoblangan qiymatlar va tashqi tizimlar"
      />
      <p>Minimal state (19-dars):</p>
      <ul>
        <li>
          <code>soz</code> — input matni; <code>tab</code> — qaysi tab ochiq;{' '}
          <code>sevimlilar</code> — sevimli kitoblar massivi (<code>localStorage</code> bilan
          sinxron).
        </li>
        <li>
          Hisoblanadi: <code>qidiruvSozi</code> (hook ichidagi state, lekin komponent uchun —
          kirish), <code>url</code>, sevimlilar id'lari to'plami, kitoblar ro'yxati (API
          javobidan).
        </li>
        <li>
          Yuklanish holati va natijalar — <code>useFetch</code> ichida, faqat{' '}
          <code>Natijalar</code> komponentiga kerak.
        </li>
      </ul>
      <CodeBlock lang="text">{`src/
├── components/
│   ├── KitobKartasi.jsx
│   ├── Natijalar.jsx
│   └── QidiruvMaydoni.jsx
├── hooks.js
├── kitoblar.js
├── Kitoblar.module.css
├── App.jsx
├── index.css
└── main.jsx`}</CodeBlock>

      <h2>1-qadam: hook'lar</h2>
      <p>
        <strong>Maqsad:</strong> 30-darsda yozgan uchta hook'ni bitta faylga yig'ish.
      </p>
      <CodeBlock lang="js">{`// src/hooks.js
import { useEffect, useState } from 'react'

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
        if (!javob.ok) throw new Error(\`Server xatosi: \${javob.status}\`)
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
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong> hook'lar ilovaning qolgan qismidan mustaqil — ularni
        istalgan boshqa loyihaga ko'chirish mumkin. Qolgan kodimiz "qanday yuklanadi" yoki
        "qanday saqlanadi" haqida o'ylamaydi, faqat <code>useFetch(url)</code> va{' '}
        <code>useLocalStorage(kalit, ...)</code> deydi.
      </p>

      <h2>2-qadam: API bilan ishlash</h2>
      <p>
        <strong>Maqsad:</strong> so'rov manzilini yasash va API javobini ilova uchun qulay
        ko'rinishga keltirish.
      </p>
      <CodeBlock lang="js">{`// src/kitoblar.js
const MAYDONLAR = 'key,title,author_name,first_publish_year,cover_i'

export function qidiruvManzili(soz) {
  if (soz.trim().length < 2) return null
  return \`https://openlibrary.org/search.json?q=\${encodeURIComponent(soz.trim())}&limit=24&fields=\${MAYDONLAR}\`
}

// API javobidagi kitobni ilova uchun qulay ko'rinishga keltirish
export function kitobga(doc) {
  return {
    id: doc.key,
    nomi: doc.title,
    muallif: doc.author_name?.join(', ') ?? "Muallif noma'lum",
    yil: doc.first_publish_year ?? null,
    muqova: doc.cover_i ? \`https://covers.openlibrary.org/b/id/\${doc.cover_i}-M.jpg\` : null,
  }
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong>
      </p>
      <ul>
        <li>
          <code>fields=</code> parametri API'ga faqat kerakli maydonlarni qaytarishni aytadi —
          javob o'nlab marta kichikroq va tezroq.
        </li>
        <li>
          <code>encodeURIComponent</code> — so'zdagi bo'sh joy, <code>&</code>,{' '}
          <code>?</code> kabi belgilar URL'ni buzmasligi uchun.
        </li>
        <li>
          <code>kitobga</code> API'ning <code>author_name</code>, <code>cover_i</code> kabi
          nomlarini va yo'q maydonlarini (<code>?.</code>, <code>??</code>) bir joyda hal
          qiladi. Komponentlar API tuzilishini bilmaydi — ertaga boshqa API'ga o'tsak, faqat
          shu funksiya o'zgaradi.
        </li>
        <li>
          Ikkala funksiya ham sof va React'ga bog'liq emas.
        </li>
      </ul>

      <h2>3-qadam: qidiruv maydoni va kitob kartasi</h2>
      <p>
        <strong>Maqsad:</strong> ko'rinishga javob beradigan ikki oddiy komponent.
      </p>
      <CodeBlock lang="jsx">{`// src/components/QidiruvMaydoni.jsx
import styles from '../Kitoblar.module.css'

export default function QidiruvMaydoni({ ref, qiymat, onChange }) {
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
}`}</CodeBlock>
      <CodeBlock lang="jsx">{`// src/components/KitobKartasi.jsx
import styles from '../Kitoblar.module.css'

export default function KitobKartasi({ kitob, sevimli, onSevimli }) {
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
        className={sevimli ? \`\${styles.yurak} \${styles.yurakFaol}\` : styles.yurak}
        onClick={() => onSevimli(kitob)}
        aria-label={sevimli ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
      >
        {sevimli ? '♥' : '♡'}
      </button>
    </article>
  )
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong> <code>QidiruvMaydoni</code> boshqariladigan input (17 va
        20-darslar) va <code>ref</code>ni oddiy prop sifatida qabul qiladi (React 19, 25-dars) —
        shunda <code>App</code> unga fokus bera oladi. <code>KitobKartasi</code> o'zi sevimli
        ekanini bilmaydi: <code>sevimli</code> props'dan keladi, bosish esa{' '}
        <code>onSevimli</code> orqali otaga bildiriladi. <code>loading="lazy"</code> — brauzer
        muqovalarni faqat ekranga yaqinlashganda yuklaydi.
      </p>

      <h2>4-qadam: Natijalar</h2>
      <p>
        <strong>Maqsad:</strong> so'rovning to'rt holatini chizish.
      </p>
      <CodeBlock lang="jsx">{`// src/components/Natijalar.jsx
import styles from '../Kitoblar.module.css'
import { useFetch } from '../hooks.js'
import { kitobga } from '../kitoblar.js'
import KitobKartasi from './KitobKartasi.jsx'

export default function Natijalar({ url, sevimliIdlar, onSevimli }) {
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
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong>
      </p>
      <ul>
        <li>
          Barcha yuklash mantig'i bitta qatorda: <code>useFetch(url)</code>. Poyga himoyasi (
          <code>AbortController</code>) hook ichida — eski so'rov yangisi boshlanishi bilan bekor
          qilinadi.
        </li>
        <li>
          Skelet kartalar <code>{'Array.from({ length: 8 }, ...)'}</code> bilan yasaladi. Bu
          yerda indeksni <code>key</code> qilish xavfsiz: ro'yxat statik va hech qachon
          o'zgarmaydi (8-dars).
        </li>
        <li>
          <code>kitoblar</code> — state emas, javobdan hisoblanadi (29-dars). Sevimlilar{' '}
          <code>Set</code>da keladi: <code>has(id)</code> — tez tekshiruv.
        </li>
      </ul>

      <h2>5-qadam: App — hammasini ulash</h2>
      <p>
        <strong>Maqsad:</strong> state, hook'lar, ikki effect va tablar.
      </p>
      <CodeBlock lang="jsx">{`// src/App.jsx
import { useEffect, useRef, useState } from 'react'
import styles from './Kitoblar.module.css'
import { useDebounce, useLocalStorage } from './hooks.js'
import { qidiruvManzili } from './kitoblar.js'
import QidiruvMaydoni from './components/QidiruvMaydoni.jsx'
import KitobKartasi from './components/KitobKartasi.jsx'
import Natijalar from './components/Natijalar.jsx'

export default function App() {
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
    document.title = sevimlilar.length > 0 ? \`Kitob qidiruv (♥ \${sevimlilar.length})\` : 'Kitob qidiruv'
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
            className={tab === 'qidiruv' ? \`\${styles.tab} \${styles.tabFaol}\` : styles.tab}
            onClick={() => setTab('qidiruv')}
          >
            Qidiruv
          </button>
          <button
            className={tab === 'sevimlilar' ? \`\${styles.tab} \${styles.tabFaol}\` : styles.tab}
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
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong>
      </p>
      <ul>
        <li>
          <code>{'<Natijalar key={url} ... />'}</code> — har bir yangi qidiruv uchun komponent
          noldan yaratiladi (21-dars): <code>useFetch</code> darhol "yuklanmoqda" holatidan
          boshlaydi va oldingi so'zning natijalari bir lahza ham ko'rinmaydi.
        </li>
        <li>
          Ikki effect — ikki mustaqil tashqi tizim (27-dars: bitta effect — bitta jarayon):{' '}
          <code>window</code> klaviatura hodisasi (cleanup bilan) va <code>document.title</code>.
        </li>
        <li>
          Sevimli qo'shish — foydalanuvchi harakati, shuning uchun handler'da (29-dars), effect'da
          emas. <code>localStorage</code>ga yozishni esa <code>useLocalStorage</code> ichidagi
          effect qiladi: u qiymat <em>qanday</em> o'zgarganidan qat'i nazar sinxronlaydi.
        </li>
        <li>
          <code>{'"/"'}</code> tinglovchisi foydalanuvchi biror input'ga yozayotgan bo'lsa
          ishlamaydi — aks holda "/" belgisini yozib bo'lmasdi.
        </li>
        <li>
          Sarlavha effect'i cleanup'da oldingi sarlavhani qaytaradi: komponent sahifadan
          olib tashlansa, brauzer tabida eski "♥ N" qolib ketmaydi.
        </li>
      </ul>

      <h2>6-qadam: stillar</h2>
      <p>
        <strong>Maqsad:</strong> kutubxona ruhidagi ko'rinish va yuklanish animatsiyasi.
      </p>
      <CodeBlock lang="css">{`/* src/Kitoblar.module.css */
.sahifa {
  min-height: 100vh;
  background: #f7f4ee;
  color: #22223b;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  padding: 76px 16px 64px;
}

.konteyner {
  max-width: 980px;
  margin: 0 auto;
}

.sarlavha {
  text-align: center;
  margin-bottom: 24px;
}

.logo {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 40px;
  font-weight: 700;
  color: #1c2541;
}

.shior {
  margin: 6px 0 0;
  color: #6c6a7c;
}

/* Tablar */
.tablar {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 20px;
}

.tab {
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid #e4ded2;
  background: #ffffff;
  color: #22223b;
  cursor: pointer;
}

.tabFaol {
  background: #1c2541;
  border-color: #1c2541;
  color: #ffffff;
}

/* Qidiruv */
.qidiruv {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  border: 2px solid #e4ded2;
  border-radius: 14px;
  padding: 4px 14px;
  margin-bottom: 20px;
}

.qidiruv:focus-within {
  border-color: #1c2541;
}

.qidiruvBelgi {
  font-size: 18px;
}

.qidiruvInput {
  flex: 1;
  border: none;
  outline: none;
  font: inherit;
  font-size: 17px;
  padding: 10px 0;
  background: transparent;
  color: #22223b;
}

.klavish {
  font-family: inherit;
  font-size: 12px;
  color: #6c6a7c;
  border: 1px solid #e4ded2;
  border-bottom-width: 2px;
  border-radius: 6px;
  padding: 1px 7px;
}

/* Natijalar */
.soni {
  color: #6c6a7c;
  font-size: 14px;
  margin: 0 0 12px;
}

.xabar {
  text-align: center;
  color: #6c6a7c;
  padding: 40px 0;
  margin: 0;
}

.tor {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.karta {
  position: relative;
  background: #ffffff;
  border: 1px solid #e4ded2;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.muqova,
.muqovaYoq {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  background: #ece6da;
}

.muqovaYoq {
  display: grid;
  place-items: center;
  font-size: 44px;
}

.kartaMatni {
  padding: 12px 14px 14px;
}

.kitobNomi {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
}

.muallif {
  margin: 4px 0 0;
  font-size: 13px;
  color: #6c6a7c;
}

.yil {
  margin: 2px 0 0;
  font-size: 12px;
  color: #9a97a6;
}

.yurak {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.92);
  color: #c8553d;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.yurakFaol {
  background: #c8553d;
  color: #ffffff;
}

.skelet {
  aspect-ratio: 2 / 3.6;
  border-radius: 14px;
  background: linear-gradient(90deg, #ece6da 25%, #f5f1e8 50%, #ece6da 75%);
  background-size: 200% 100%;
  animation: yaltirash 1.2s infinite;
}

@keyframes yaltirash {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong> muqovalar <code>aspect-ratio: 2 / 3</code> bilan — rasm
        hali yuklanmagan bo'lsa ham karta balandligi sakramaydi. Skelet animatsiyasi —
        gradientning <code>background-position</code>ini siljitish, JavaScript'siz.{' '}
        <code>:focus-within</code> — ichidagi input fokusda bo'lganda butun qidiruv qutisiga
        ramka beradi.
      </p>

      <h2>Yakuniy tekshiruv</h2>
      <p>
        1–6-qadamlardagi fayllar yakuniy ko'rinishda. <code>main.jsx</code> 2-darsdagidek,{' '}
        <code>index.css</code>da <code>{'body { margin: 0; }'}</code>. Ishga tushiring va{' '}
        <a href="/loyihalar/react-book-search">tayyor natija</a> bilan solishtiring. Tekshiring:
      </p>
      <ul>
        <li>
          DevTools → Network: "samarkand" deb tez yozing — faqat <strong>bitta</strong> yakunlangan
          so'rov ketishi kerak (dasturlash rejimida StrictMode tufayli yonida yana bitta
          "(canceled)" ham ko'rinadi — bu normal).
        </li>
        <li>
          Network → "Slow 4G" yoqib, so'zni tez-tez o'zgartiring — bekor qilingan so'rovlar
          "(canceled)" bo'lib ko'rinadi va ekranda doim oxirgi so'zning natijalari.
        </li>
        <li>Kitobni sevimlilarga qo'shib, sahifani yangilang — u joyida qolishi kerak.</li>
        <li>Network → "Offline" — xato xabari chiqishi kerak, ilova "qotib qolmasligi" kerak.</li>
      </ul>

      <h2>Qo'shimcha topshiriqlar</h2>
      <p>Yechimlari berilmaydi — bu sizning portfolio loyihangiz.</p>
      <ol>
        <li>
          <strong>Ko'proq natija.</strong> Natijalar oxirida "Yana yuklash" tugmasi: API'ning{' '}
          <code>page=2</code> parametri bilan keyingi 24 tasini mavjudlarining ostiga qo'shsin.
          Bu holda yuklangan sahifalar sonini qayerda saqlaysiz va qidiruv so'zi o'zgarganda u
          qanday tozalanadi?
        </li>
        <li>
          <strong>Kitob tafsilotlari.</strong> Karta bosilganda oyna (modal) ochilsin va unda{' '}
          <code>{'https://openlibrary.org{id}.json'}</code> (masalan,{' '}
          <code>/works/OL85675W.json</code>) dan olingan tavsif ko'rsatilsin. Escape bilan
          yopilsin (27-dars).
        </li>
        <li>
          <strong>Saralash.</strong> Natijalar ustida "Moslik / Eng yangi / Eng eski" tanlovi.
          Saralangan ro'yxat state bo'lishi kerakmi? (Ishora: 16-dars.)
        </li>
      </ol>

      <KeyPoints>
        <li>
          Foydalanuvchi kiritmasi — state; undan kechiktirilgan qiymat va so'rov manzili —
          hisoblanadi; so'rov esa effect (hook) ichida.
        </li>
        <li>
          Takrorlanadigan effect mantig'i (yuklash, debounce, localStorage) — custom hook'larda;
          komponentlar faqat natijadan foydalanadi.
        </li>
        <li>
          Parametr o'zgarganda komponentni <code>key</code> bilan qayta boshlash — eski ma'lumot
          ko'rinmasligining eng sodda yo'li.
        </li>
        <li>
          Har bir tashqi tizim — alohida effect, cleanup bilan; foydalanuvchi harakatlari —
          handler'larda.
        </li>
        <li>
          API javobini bitta funksiyada ilova formatiga keltiring — komponentlar tashqi API
          tuzilishiga bog'lanib qolmaydi.
        </li>
      </KeyPoints>
    </>
  )
}
