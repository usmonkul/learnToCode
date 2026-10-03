import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import KeyPoints from '@/components/content/KeyPoints'
import Figure from '@/components/content/Figure'
import bazaarTree from '@/assets/bazaar-cart-tree.svg'

export const meta = {
  title: "Loyiha: bozor savatchasi",
  section: 'State boshqaruvi',
}

export default function BazaarCartProjectLesson() {
  return (
    <>
      <p>
        <strong>
          <a href="/loyihalar/react-bazaar-cart">Tayyor natijani ko'ring →</a>
        </strong>
      </p>
      <p>
        "State boshqaruvi" bo'limining yakuniy loyihasi — "Chorsu Online": bozor mahsulotlarini
        uyga buyurtma qilish ilovasi. Bu safar state ilovaning ko'p joyida kerak: sarlavhadagi
        nishon, har bir mahsulot kartasi, savatcha paneli va buyurtma ekrani. Shu yerda
        bo'limda o'rgangan hamma narsa — state'ni to'g'ri tuzish, reducer va context — bir
        butun bo'lib ishlaydi.
      </p>

      <h2>Talablar</h2>
      <ul>
        <li>Mahsulotlar kategoriyalar bo'yicha filtrlanadi (Hammasi, Sabzavotlar, Mevalar, Non, Sut).</li>
        <li>
          Har bir mahsulot o'z birligida sotiladi: sabzavot va mevalar — kilogramm (0,5 kg
          qadam bilan), non va sut mahsulotlari — dona.
        </li>
        <li>
          Mahsulot kartasidagi tugma: savatda yo'q bo'lsa — "Savatga qo'shish", bor bo'lsa —
          "Savatda: 1.5 kg · +0.5".
        </li>
        <li>Sarlavhadagi savat nishonida savatdagi mahsulot turlari soni.</li>
        <li>
          Savatcha panelida: har bir qator (miqdorni +/−, olib tashlash), mahsulotlar summasi,
          yetkazib berish narxi (100 000 so'm va undan ko'p bo'lsa — bepul), jami, va "Yana N so'm — va
          yetkazib berish bepul!" maslahati.
        </li>
        <li>"Buyurtma berish" — tasdiq ekrani buyurtma tafsilotlari bilan; "Yangi xarid" — qaytish.</li>
      </ul>
      <p>
        Ishlatiladigan bilimlar: state'ni tuzish (19), state'ni ko'tarish (20),{' '}
        <code>useReducer</code> (22), context (23), hamda 16-darsdagi massivlarni yangilash.
      </p>

      <h2>Reja</h2>
      <p>Avval 19-darsdagi savol: <strong>minimal state qanday?</strong></p>
      <ul>
        <li>
          <strong>Savat:</strong> faqat <code>{'[{ mahsulotId, miqdor }]'}</code>. Mahsulot nomi,
          narxi va birligi o'zgarmas katalogda bor — ularni savatga nusxalash 19-darsdagi
          "takrorlanish" xatosi bo'lardi. Qator summasi, oraliq summa, yetkazish narxi va jami —
          hammasi hisoblanadi.
        </li>
        <li>
          <strong>Tanlangan kategoriya</strong> — bitta satr.
        </li>
        <li>
          <strong>Buyurtma holati</strong> — alohida <code>holat</code> va{' '}
          <code>buyurtma</code> state'lari o'rniga bitta <code>buyurtma</code>:{' '}
          <code>null</code> bo'lsa — xarid davom etmoqda, obyekt bo'lsa — tasdiq ekrani.
        </li>
      </ul>
      <p>
        Savat to'rtta turli komponentga kerak va ularning ba'zilari daraxtda ancha chuqur —
        bu context uchun klassik holat. Savatni o'zgartiradigan amallar esa ko'p xil — bu
        reducer uchun klassik holat. Kategoriya va buyurtma esa faqat bitta komponentga (
        <code>Bozor</code>) kerak — ular oddiy <code>useState</code>da qoladi.
      </p>
      <Figure
        src={bazaarTree}
        alt="SavatProvider butun daraxtni o'raydi. Bozor ichida Sarlavha, KategoriyaFiltri, MahsulotKartasi'lar, SavatPaneli va SavatQatori'lar, hamda Tasdiq. Bozor, Sarlavha, MahsulotKartasi, SavatPaneli va SavatQatori savat context'idan foydalanadi."
        caption="1-rasm: savat context orqali, kategoriya va buyurtma esa Bozor'ning o'z state'i"
      />
      <CodeBlock lang="text">{`src/
├── components/
│   ├── KategoriyaFiltri.jsx
│   ├── MahsulotKartasi.jsx
│   ├── Sarlavha.jsx
│   ├── SavatPaneli.jsx
│   ├── SavatQatori.jsx
│   └── Tasdiq.jsx
├── bozor.js
├── SavatContext.jsx
├── Bozor.module.css
├── App.jsx
├── index.css
└── main.jsx`}</CodeBlock>

      <h2>1-qadam: katalog va hisob-kitob</h2>
      <p>
        <strong>Maqsad:</strong> o'zgarmas ma'lumot va savatdan hamma narsani hisoblaydigan
        bitta funksiya.
      </p>
      <CodeBlock lang="js">{`// src/bozor.js
export const KATEGORIYALAR = [
  { id: 'hammasi', nomi: 'Hammasi' },
  { id: 'sabzavot', nomi: 'Sabzavotlar' },
  { id: 'meva', nomi: 'Mevalar' },
  { id: 'non', nomi: 'Non' },
  { id: 'sut', nomi: 'Sut mahsulotlari' },
]

// birlik: 'kg' — 0.5 kg qadam bilan, 'dona' — 1 dona qadam bilan
export const MAHSULOTLAR = [
  { id: 'pomidor', nomi: 'Pomidor', kategoriya: 'sabzavot', narx: 14000, birlik: 'kg', belgi: '🍅' },
  { id: 'bodring', nomi: 'Bodring', kategoriya: 'sabzavot', narx: 9000, birlik: 'kg', belgi: '🥒' },
  { id: 'kartoshka', nomi: 'Kartoshka', kategoriya: 'sabzavot', narx: 6000, birlik: 'kg', belgi: '🥔' },
  { id: 'sabzi', nomi: 'Sariq sabzi', kategoriya: 'sabzavot', narx: 7000, birlik: 'kg', belgi: '🥕' },
  { id: 'olma', nomi: 'Olma', kategoriya: 'meva', narx: 16000, birlik: 'kg', belgi: '🍎' },
  { id: 'uzum', nomi: 'Uzum', kategoriya: 'meva', narx: 22000, birlik: 'kg', belgi: '🍇' },
  { id: 'anor', nomi: 'Anor', kategoriya: 'meva', narx: 25000, birlik: 'kg', belgi: '🔴' },
  { id: 'non', nomi: 'Tandir non', kategoriya: 'non', narx: 4000, birlik: 'dona', belgi: '🫓' },
  { id: 'patir', nomi: 'Patir', kategoriya: 'non', narx: 9000, birlik: 'dona', belgi: '🥯' },
  { id: 'qatiq', nomi: 'Qatiq', kategoriya: 'sut', narx: 11000, birlik: 'dona', belgi: '🥛' },
  { id: 'suzma', nomi: 'Suzma', kategoriya: 'sut', narx: 18000, birlik: 'dona', belgi: '🧀' },
]

export const YETKAZISH_NARXI = 15000
export const BEPUL_YETKAZISH_CHEGARASI = 100000

export function qadam(birlik) {
  return birlik === 'kg' ? 0.5 : 1
}

export function somda(son) {
  return Math.round(son).toLocaleString('uz-UZ') + " so'm"
}

// Savat qatorlaridan barcha hisob-kitob — state emas, har renderda hisoblanadi
export function hisobla(qatorlar) {
  const batafsil = qatorlar.map((q) => {
    const mahsulot = MAHSULOTLAR.find((m) => m.id === q.mahsulotId)
    return { ...q, mahsulot, summa: mahsulot.narx * q.miqdor }
  })
  const oraliq = batafsil.reduce((jami, q) => jami + q.summa, 0)
  const yetkazish = oraliq === 0 || oraliq >= BEPUL_YETKAZISH_CHEGARASI ? 0 : YETKAZISH_NARXI
  return { batafsil, oraliq, yetkazish, jami: oraliq + yetkazish }
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong> <code>hisobla</code> — React'ga bog'liq bo'lmagan oddiy,
        sof funksiya. U savat qatorlarini olib, katalogdan mahsulotni topadi va barcha
        summalarni qaytaradi. Savatcha paneli uni chaqiradi, tasdiq ekrani esa uning natijasini
        buyurtma bilan birga oladi — hisob-kitob bitta joyda va hech qachon "orqada qolmaydi".{' '}
        <code>somda</code>dagi <code>Math.round</code> — ehtiyot chorasi: hozirgi narxlarda kasr
        chiqmaydi, lekin chegirma (masalan, 2-qo'shimcha topshiriqdagi 10%) qo'shilsa, tiyinlar
        paydo bo'lishi mumkin.
      </p>

      <h2>2-qadam: savat reducer'i va context</h2>
      <p>
        <strong>Maqsad:</strong> savatning barcha o'zgarishlarini bitta reducer'ga yig'ish va uni
        context orqali butun ilovaga ochish.
      </p>
      <CodeBlock lang="jsx">{`// src/SavatContext.jsx
import { createContext, useContext, useReducer } from 'react'

// State: { qatorlar: [{ mahsulotId, miqdor }] } — mahsulot obyektlari emas, faqat id va miqdor
const BOSHLANGICH = { qatorlar: [] }

function savatReducer(savat, action) {
  switch (action.type) {
    case 'qoshish': {
      const mavjud = savat.qatorlar.find((q) => q.mahsulotId === action.mahsulotId)
      if (mavjud) {
        return {
          ...savat,
          qatorlar: savat.qatorlar.map((q) =>
            q.mahsulotId === action.mahsulotId ? { ...q, miqdor: q.miqdor + action.miqdor } : q,
          ),
        }
      }
      return {
        ...savat,
        qatorlar: [...savat.qatorlar, { mahsulotId: action.mahsulotId, miqdor: action.miqdor }],
      }
    }
    case 'ozgartirish': {
      if (action.miqdor <= 0) {
        return { ...savat, qatorlar: savat.qatorlar.filter((q) => q.mahsulotId !== action.mahsulotId) }
      }
      return {
        ...savat,
        qatorlar: savat.qatorlar.map((q) =>
          q.mahsulotId === action.mahsulotId ? { ...q, miqdor: action.miqdor } : q,
        ),
      }
    }
    case 'ochirish':
      return { ...savat, qatorlar: savat.qatorlar.filter((q) => q.mahsulotId !== action.mahsulotId) }
    case 'tozalash':
      return BOSHLANGICH
    default:
      throw new Error("Noma'lum action: " + action.type)
  }
}

const SavatContext = createContext(null)
const SavatDispatchContext = createContext(null)

export function SavatProvider({ children }) {
  const [savat, dispatch] = useReducer(savatReducer, BOSHLANGICH)

  return (
    <SavatContext value={savat}>
      <SavatDispatchContext value={dispatch}>{children}</SavatDispatchContext>
    </SavatContext>
  )
}

export function useSavat() {
  const savat = useContext(SavatContext)
  if (savat === null) throw new Error('useSavat faqat SavatProvider ichida ishlatiladi')
  return savat
}

export function useSavatDispatch() {
  const dispatch = useContext(SavatDispatchContext)
  if (dispatch === null) throw new Error('useSavatDispatch faqat SavatProvider ichida ishlatiladi')
  return dispatch
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong>
      </p>
      <ul>
        <li>
          To'rt action — to'rt foydalanuvchi harakati. "Qo'shish" mavjud qatorni topsa,
          miqdorni oshiradi, topmasa — yangi qator qo'shadi; komponent bu farqni bilishi shart
          emas.
        </li>
        <li>
          <code>ozgartirish</code> miqdor 0 ga tushsa, qatorni o'zi o'chiradi — "0 kg pomidor"
          degan qator hech qachon paydo bo'lmaydi. Bunday qoidalar komponentlarda emas, reducer'da
          bo'lgani yaxshi: ular bitta joyda va har qanday chaqiruvchi uchun ishlaydi.
        </li>
        <li>
          <code>{"case 'qoshish': { ... }"}</code> dagi jingalak qavslar — <code>case</code>{' '}
          ichida <code>const</code> e'lon qilish uchun alohida blok.
        </li>
        <li>
          State va <code>dispatch</code> ikki context'da (23-dars):{' '}
          <code>SavatQatori</code> faqat dispatch qiladi va savat o'qilishi shart emas.
        </li>
        <li>
          <code>useSavat</code>/<code>useSavatDispatch</code> provider unutilsa tushunarli xato
          beradi.
        </li>
      </ul>
      <Callout type="note" title="ESLint ogohlantirishi">
        Vite shablonidagi ESLint bu faylda "Fast refresh only works when a file only exports
        components" deb ogohlantirishi mumkin, chunki fayl komponent bilan birga hook'larni ham
        eksport qiladi. Bu xato emas — ilova to'g'ri ishlaydi, faqat bu fayl o'zgarganda hot
        reload sahifani to'liq yangilaydi. Xohlasangiz, hook'larni alohida faylga chiqarish
        mumkin.
      </Callout>

      <h2>3-qadam: Sarlavha va MahsulotKartasi</h2>
      <p>
        <strong>Maqsad:</strong> savatni o'qiydigan va unga qo'shadigan komponentlar.
      </p>
      <CodeBlock lang="jsx">{`// src/components/Sarlavha.jsx
import styles from '../Bozor.module.css'
import { useSavat } from '../SavatContext.jsx'

export default function Sarlavha() {
  const { qatorlar } = useSavat()

  return (
    <header className={styles.sarlavha}>
      <div>
        <h1 className={styles.logo}>Chorsu Online</h1>
        <p className={styles.shior}>Bozordan uyingizgacha — bir soatda</p>
      </div>
      <div className={styles.savatBelgisi} aria-label={\`Savatda \${qatorlar.length} xil mahsulot\`}>
        🧺
        {qatorlar.length > 0 && <span className={styles.nishon}>{qatorlar.length}</span>}
      </div>
    </header>
  )
}`}</CodeBlock>
      <CodeBlock lang="jsx">{`// src/components/KategoriyaFiltri.jsx
import styles from '../Bozor.module.css'
import { KATEGORIYALAR } from '../bozor.js'

export default function KategoriyaFiltri({ tanlangan, onTanlash }) {
  return (
    <nav className={styles.kategoriyalar}>
      {KATEGORIYALAR.map((k) => (
        <button
          key={k.id}
          className={k.id === tanlangan ? \`\${styles.kategoriya} \${styles.kategoriyaFaol}\` : styles.kategoriya}
          onClick={() => onTanlash(k.id)}
        >
          {k.nomi}
        </button>
      ))}
    </nav>
  )
}`}</CodeBlock>
      <CodeBlock lang="jsx">{`// src/components/MahsulotKartasi.jsx
import styles from '../Bozor.module.css'
import { qadam, somda } from '../bozor.js'
import { useSavat, useSavatDispatch } from '../SavatContext.jsx'

export default function MahsulotKartasi({ mahsulot }) {
  const { qatorlar } = useSavat()
  const dispatch = useSavatDispatch()

  const qator = qatorlar.find((q) => q.mahsulotId === mahsulot.id)

  function handleQoshish() {
    dispatch({ type: 'qoshish', mahsulotId: mahsulot.id, miqdor: qadam(mahsulot.birlik) })
  }

  return (
    <article className={styles.karta}>
      <div className={styles.kartaBelgi}>{mahsulot.belgi}</div>
      <h3 className={styles.kartaNomi}>{mahsulot.nomi}</h3>
      <p className={styles.kartaNarx}>
        {somda(mahsulot.narx)} <span>/ {mahsulot.birlik}</span>
      </p>
      <button className={styles.qoshishTugmasi} onClick={handleQoshish}>
        {qator ? \`Savatda: \${qator.miqdor} \${mahsulot.birlik} · +\${qadam(mahsulot.birlik)}\` : "Savatga qo'shish"}
      </button>
    </article>
  )
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong> <code>Sarlavha</code> va <code>MahsulotKartasi</code>{' '}
        savatni props orqali emas, <code>useSavat()</code> bilan o'zi oladi — <code>Bozor</code>{' '}
        ularga hech narsa uzatmaydi. Kartadagi "Savatda: 1.5 kg" savatdan{' '}
        <strong>hisoblanadi</strong> (<code>find</code>) — kartaning o'z state'i yo'q.{' '}
        <code>KategoriyaFiltri</code> esa boshqariladigan komponent (20-dars): tanlangan
        kategoriya otadan keladi.
      </p>

      <h2>4-qadam: savatcha paneli</h2>
      <p>
        <strong>Maqsad:</strong> savat qatorlari, summalar va buyurtma tugmasi.
      </p>
      <CodeBlock lang="jsx">{`// src/components/SavatQatori.jsx
import styles from '../Bozor.module.css'
import { qadam, somda } from '../bozor.js'
import { useSavatDispatch } from '../SavatContext.jsx'

export default function SavatQatori({ qator }) {
  const dispatch = useSavatDispatch()
  const { mahsulot, miqdor, summa } = qator
  const q = qadam(mahsulot.birlik)

  function ozgartir(yangiMiqdor) {
    dispatch({ type: 'ozgartirish', mahsulotId: mahsulot.id, miqdor: yangiMiqdor })
  }

  return (
    <li className={styles.qator}>
      <span className={styles.qatorBelgi}>{mahsulot.belgi}</span>
      <div className={styles.qatorMatni}>
        <strong>{mahsulot.nomi}</strong>
        <span>{somda(summa)}</span>
      </div>
      <div className={styles.miqdor}>
        <button onClick={() => ozgartir(miqdor - q)} aria-label="Kamaytirish">−</button>
        <span>
          {miqdor} {mahsulot.birlik}
        </span>
        <button onClick={() => ozgartir(miqdor + q)} aria-label="Ko'paytirish">+</button>
      </div>
      <button
        className={styles.olib}
        onClick={() => dispatch({ type: 'ochirish', mahsulotId: mahsulot.id })}
        aria-label="Olib tashlash"
      >
        ×
      </button>
    </li>
  )
}`}</CodeBlock>
      <CodeBlock lang="jsx">{`// src/components/SavatPaneli.jsx
import styles from '../Bozor.module.css'
import { BEPUL_YETKAZISH_CHEGARASI, somda, hisobla } from '../bozor.js'
import { useSavat, useSavatDispatch } from '../SavatContext.jsx'
import SavatQatori from './SavatQatori.jsx'

export default function SavatPaneli({ onRasmiylashtirish }) {
  const { qatorlar } = useSavat()
  const dispatch = useSavatDispatch()
  const { batafsil, oraliq, yetkazish, jami } = hisobla(qatorlar)

  if (batafsil.length === 0) {
    return (
      <aside className={styles.panel}>
        <h2 className={styles.panelSarlavha}>Savatcha</h2>
        <p className={styles.bosh}>Savatcha bo'sh. Bozorni aylanib chiqing!</p>
      </aside>
    )
  }

  const bepulgacha = BEPUL_YETKAZISH_CHEGARASI - oraliq

  return (
    <aside className={styles.panel}>
      <h2 className={styles.panelSarlavha}>Savatcha</h2>
      <ul className={styles.qatorlar}>
        {batafsil.map((q) => (
          <SavatQatori key={q.mahsulotId} qator={q} />
        ))}
      </ul>

      <dl className={styles.hisob}>
        <dt>Mahsulotlar</dt>
        <dd>{somda(oraliq)}</dd>
        <dt>Yetkazib berish</dt>
        <dd>{yetkazish === 0 ? 'Bepul' : somda(yetkazish)}</dd>
        <dt className={styles.jami}>Jami</dt>
        <dd className={styles.jami}>{somda(jami)}</dd>
      </dl>
      {bepulgacha > 0 && (
        <p className={styles.maslahat}>Yana {somda(bepulgacha)} — va yetkazib berish bepul!</p>
      )}

      <button className={styles.rasmiylashtirish} onClick={() => onRasmiylashtirish({ batafsil, jami })}>
        Buyurtma berish
      </button>
      <button className={styles.tozalash} onClick={() => dispatch({ type: 'tozalash' })}>
        Savatchani tozalash
      </button>
    </aside>
  )
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong>
      </p>
      <ul>
        <li>
          <code>SavatQatori</code> tayyor <code>qator</code>ni (mahsulot va summa bilan) props
          orqali oladi, o'zgartirish uchun esa to'g'ridan-to'g'ri <code>dispatch</code>. "−"
          tugmasi miqdorni 0 ga tushirsa, reducer qatorni o'zi o'chiradi.
        </li>
        <li>
          Panel butun hisob-kitobni bitta <code>hisobla(qatorlar)</code> chaqiruvi bilan oladi.
        </li>
        <li>
          Bo'sh savat — erta <code>return</code> (7-dars). "Bepul yetkazishgacha" maslahati
          chap tomoni boolean bo'lgan <code>&&</code> bilan.
        </li>
        <li>
          "Buyurtma berish" buyurtmani o'zi rasmiylashtirmaydi — tayyor ma'lumotni{' '}
          <code>onRasmiylashtirish</code> orqali otaga beradi: tasdiq ekraniga o'tish{' '}
          <code>Bozor</code>ning ishi.
        </li>
      </ul>

      <h2>5-qadam: Bozor — sahifani yig'ish</h2>
      <p>
        <strong>Maqsad:</strong> kategoriya, buyurtma holati va ikki ekran.
      </p>
      <CodeBlock lang="jsx">{`// src/components/Tasdiq.jsx
import styles from '../Bozor.module.css'
import { somda } from '../bozor.js'

export default function Tasdiq({ buyurtma, onYangi }) {
  return (
    <section className={styles.tasdiq}>
      <div className={styles.tasdiqBelgi}>✅</div>
      <h2>Buyurtmangiz qabul qilindi!</h2>
      <ul>
        {buyurtma.batafsil.map((q) => (
          <li key={q.mahsulotId}>
            {q.mahsulot.nomi} — {q.miqdor} {q.mahsulot.birlik}
          </li>
        ))}
      </ul>
      <p className={styles.tasdiqJami}>To'lov: {somda(buyurtma.jami)}</p>
      <button className={styles.rasmiylashtirish} onClick={onYangi}>
        Yangi xarid
      </button>
    </section>
  )
}`}</CodeBlock>
      <CodeBlock lang="jsx">{`// src/App.jsx
import { useState } from 'react'
import styles from './Bozor.module.css'
import { MAHSULOTLAR } from './bozor.js'
import { SavatProvider, useSavatDispatch } from './SavatContext.jsx'
import Sarlavha from './components/Sarlavha.jsx'
import KategoriyaFiltri from './components/KategoriyaFiltri.jsx'
import MahsulotKartasi from './components/MahsulotKartasi.jsx'
import SavatPaneli from './components/SavatPaneli.jsx'
import Tasdiq from './components/Tasdiq.jsx'

function Bozor() {
  const dispatch = useSavatDispatch()
  const [kategoriya, setKategoriya] = useState('hammasi')
  const [buyurtma, setBuyurtma] = useState(null) // null — xarid qilinmoqda

  function handleRasmiylashtirish(malumot) {
    setBuyurtma(malumot)
    dispatch({ type: 'tozalash' })
  }

  const korsatiladigan =
    kategoriya === 'hammasi' ? MAHSULOTLAR : MAHSULOTLAR.filter((m) => m.kategoriya === kategoriya)

  return (
    <div className={styles.sahifa}>
      <div className={styles.konteyner}>
        <Sarlavha />
        {buyurtma ? (
          <Tasdiq buyurtma={buyurtma} onYangi={() => setBuyurtma(null)} />
        ) : (
          <div className={styles.asosiy}>
            <main>
              <KategoriyaFiltri tanlangan={kategoriya} onTanlash={setKategoriya} />
              <div className={styles.tor}>
                {korsatiladigan.map((m) => (
                  <MahsulotKartasi key={m.id} mahsulot={m} />
                ))}
              </div>
            </main>
            <SavatPaneli onRasmiylashtirish={handleRasmiylashtirish} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <SavatProvider>
      <Bozor />
    </SavatProvider>
  )
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong>
      </p>
      <ul>
        <li>
          <code>SavatProvider</code> eng tashqarida, <code>App</code>da. <code>Bozor</code> uning{' '}
          <em>ichida</em> bo'lgani uchungina <code>useSavatDispatch()</code>ni chaqira oladi
          (23-dars: provider'ni chizgan komponentning o'zi uni o'qiy olmaydi).
        </li>
        <li>
          <code>buyurtma</code> — bitta state ikki vazifani bajaradi: qaysi ekran ko'rsatilishi
          va tasdiq ekranidagi ma'lumot. Rasmiylashtirishda savat tozalanadi, lekin buyurtma
          nusxasi tasdiq ekrani uchun saqlanib qoladi.
        </li>
        <li>
          Filtrlangan mahsulotlar — hisoblanadigan qiymat. "Hammasi" uchun asl massivning
          o'zi qaytariladi.
        </li>
      </ul>

      <h2>6-qadam: stillar</h2>
      <p>
        <strong>Maqsad:</strong> bozor ruhidagi yashil-sariq ko'rinish, kichik ekranlarda esa
        savatcha mahsulotlar ostiga tushadi.
      </p>
      <CodeBlock lang="css">{`/* src/Bozor.module.css */
.sahifa {
  min-height: 100vh;
  background: #fdfaf3;
  color: #1f2a1f;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  padding: 76px 16px 64px;
}

.konteyner {
  max-width: 1080px;
  margin: 0 auto;
}

/* Sarlavha */
.sarlavha {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.logo {
  margin: 0;
  font-family: inherit;
  font-size: 30px;
  font-weight: 800;
  color: #2f6b3a;
}

.shior {
  margin: 2px 0 0;
  color: #6b705c;
  font-size: 14px;
}

.savatBelgisi {
  position: relative;
  font-size: 30px;
}

.nishon {
  position: absolute;
  top: -6px;
  right: -10px;
  min-width: 22px;
  height: 22px;
  border-radius: 999px;
  background: #e9a23b;
  color: #1f2a1f;
  font-size: 12px;
  font-weight: 700;
  display: grid;
  place-items: center;
  padding: 0 5px;
}

/* Maket */
.asosiy {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 24px;
  align-items: start;
}

@media (max-width: 820px) {
  .asosiy {
    grid-template-columns: 1fr;
  }
}

/* Kategoriyalar */
.kategoriyalar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.kategoriya {
  font: inherit;
  font-size: 14px;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid #e7e2d3;
  background: #ffffff;
  color: #1f2a1f;
  cursor: pointer;
}

.kategoriyaFaol {
  background: #2f6b3a;
  border-color: #2f6b3a;
  color: #ffffff;
}

/* Mahsulotlar */
.tor {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 14px;
}

.karta {
  background: #ffffff;
  border: 1px solid #e7e2d3;
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.kartaBelgi {
  font-size: 42px;
  line-height: 1;
  margin-bottom: 10px;
}

.kartaNomi {
  margin: 0;
  font-family: inherit;
  font-size: 16px;
  font-weight: 700;
}

.kartaNarx {
  margin: 4px 0 14px;
  font-weight: 600;
  color: #2f6b3a;
}

.kartaNarx span {
  color: #6b705c;
  font-weight: 400;
  font-size: 13px;
}

.qoshishTugmasi {
  margin-top: auto;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  padding: 9px 10px;
  border-radius: 10px;
  border: none;
  background: #2f6b3a;
  color: #ffffff;
  cursor: pointer;
}

.qoshishTugmasi:hover {
  background: #275a31;
}

/* Savatcha paneli */
.panel {
  position: sticky;
  top: 16px;
  background: #ffffff;
  border: 1px solid #e7e2d3;
  border-radius: 16px;
  padding: 20px;
}

.panelSarlavha {
  margin: 0 0 12px;
  font-family: inherit;
  font-size: 20px;
  font-weight: 700;
}

.bosh {
  color: #6b705c;
  margin: 0;
}

.qatorlar {
  list-style: none;
  margin: 0 0 12px;
  padding: 0;
}

.qator {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f0ece0;
}

.qatorBelgi {
  font-size: 22px;
}

.qatorMatni {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.qatorMatni span {
  color: #6b705c;
  font-size: 13px;
}

.miqdor {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  white-space: nowrap;
}

.miqdor button {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  border: 1px solid #e7e2d3;
  background: #fdfaf3;
  cursor: pointer;
  font-size: 15px;
  color: #1f2a1f;
}

.olib {
  border: none;
  background: transparent;
  color: #a3a38f;
  font-size: 18px;
  cursor: pointer;
}

.olib:hover {
  color: #b42318;
}

.hisob {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 6px 12px;
  margin: 0;
  font-size: 14px;
}

.hisob dd {
  margin: 0;
  text-align: right;
}

.jami {
  font-weight: 800;
  font-size: 16px;
  padding-top: 6px;
  border-top: 1px dashed #e7e2d3;
}

.maslahat {
  margin: 12px 0 0;
  font-size: 13px;
  background: #fdf1d6;
  color: #7a5200;
  border-radius: 8px;
  padding: 8px 10px;
}

.rasmiylashtirish {
  width: 100%;
  margin-top: 14px;
  font: inherit;
  font-weight: 700;
  padding: 12px;
  border: none;
  border-radius: 12px;
  background: #e9a23b;
  color: #1f2a1f;
  cursor: pointer;
}

.rasmiylashtirish:hover {
  background: #dd9426;
}

.tozalash {
  width: 100%;
  margin-top: 8px;
  font: inherit;
  font-size: 13px;
  border: none;
  background: transparent;
  color: #6b705c;
  text-decoration: underline;
  cursor: pointer;
}

/* Tasdiq */
.tasdiq {
  max-width: 460px;
  margin: 40px auto 0;
  text-align: center;
  background: #ffffff;
  border: 1px solid #e7e2d3;
  border-radius: 18px;
  padding: 32px 28px;
}

.tasdiq h2 {
  font-family: inherit;
  margin: 8px 0 16px;
}

.tasdiq ul {
  list-style: none;
  padding: 0;
  margin: 0 0 12px;
  color: #6b705c;
  line-height: 1.8;
}

.tasdiqBelgi {
  font-size: 44px;
}

.tasdiqJami {
  font-weight: 800;
  font-size: 18px;
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong> mahsulotlar to'ri{' '}
        <code>repeat(auto-fill, minmax(170px, 1fr))</code> bilan — ustunlar soni ekran kengligiga
        qarab o'zi o'zgaradi, media query kerak emas. Savatcha paneli{' '}
        <code>position: sticky</code> — uzun ro'yxatni aylantirganda ham ko'z oldida qoladi.
      </p>

      <h2>To'liq kod</h2>
      <p>
        1–6-qadamlardagi fayllar yakuniy ko'rinishda. <code>index.css</code> va{' '}
        <code>main.jsx</code> 18-darsdagidek (<code>{'body { margin: 0; }'}</code> va
        o'zgarishsiz <code>main.jsx</code>):
      </p>
      <CodeBlock lang="jsx">{`// src/main.jsx
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
        <a href="/loyihalar/react-bazaar-cart">Tayyor natija</a> bilan solishtiring va
        tekshiring:
      </p>
      <ul>
        <li>Pomidorni uch marta qo'shing — kartada "Savatda: 1.5 kg", savatda bitta qator.</li>
        <li>Savatdagi "−" tugmasini 0 gacha bosing — qator yo'qoladi, nishon kamayadi.</li>
        <li>Summa 100 000 ga yetganda yetkazish "Bepul" bo'ladi va maslahat yo'qoladi.</li>
        <li>Buyurtmadan keyin "Yangi xarid" — savat bo'sh, kategoriya esa saqlangan.</li>
      </ul>

      <h2>Qo'shimcha topshiriqlar</h2>
      <p>Yechimlari berilmaydi.</p>
      <ol>
        <li>
          <strong>Qidiruv.</strong> Kategoriyalar ustiga qidiruv input'ini qo'shing: u kategoriya
          filtri bilan birga ishlasin. Qidiruv matni qaysi komponentning state'i bo'lishi kerak?
        </li>
        <li>
          <strong>Promokod.</strong> Savatcha paneliga promokod maydonini qo'shing:{' '}
          <code>CHORSU10</code> — mahsulotlar summasidan 10% chegirma. Chegirma reducer
          state'idami, alohida <code>useState</code>dami yoki <code>hisobla</code>dami bo'lishi
          kerak? Javobingizni asoslang.
        </li>
        <li>
          <strong>Ombordagi qoldiq.</strong> Katalogga <code>qoldiq</code> maydonini qo'shing
          (masalan, uzum — 3 kg). Savatga qoldiqdan ko'p qo'shib bo'lmasin, qoldiq tugaganda
          kartadagi tugma o'chirilsin. Bu cheklov reducer'da bo'lishi kerakmi yoki komponentda?
        </li>
      </ol>

      <KeyPoints>
        <li>
          Minimal state: savatda faqat id va miqdor; mahsulot ma'lumoti katalogda, summalar esa
          hisoblanadi.
        </li>
        <li>
          Ko'p xil amal bilan o'zgaradigan state — reducer'da; biznes qoidalari (0 bo'lsa
          o'chirish, mavjudga qo'shish) ham reducer'da.
        </li>
        <li>
          Ko'p joyda kerak bo'lgan state — context orqali; state va dispatch alohida
          context'larda, o'z provider'i va <code>useX()</code> hook'lari bilan.
        </li>
        <li>
          Faqat bitta komponentga kerak bo'lgan state (kategoriya, buyurtma ekrani) — oddiy{' '}
          <code>useState</code>, context'ga emas.
        </li>
        <li>
          Bitta state'dan ikki vazifa: <code>buyurtma === null</code> — xarid ekrani, aks holda
          tasdiq ekrani.
        </li>
      </KeyPoints>
    </>
  )
}
