import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import KeyPoints from '@/components/content/KeyPoints'
import Figure from '@/components/content/Figure'
import menuTree from '@/assets/restaurant-menu-tree.svg'

export const meta = {
  title: "Loyiha: osh markazi menyusi",
  section: "UI'ni tasvirlash",
}

export default function RestaurantMenuProjectLesson() {
  return (
    <>
      <p>
        <strong>
          <a href="/loyihalar/react-restaurant-menu">Tayyor natijani ko'ring →</a>
        </strong>
      </p>
      <p>
        Bu — "UI'ni tasvirlash" bo'limining yakuniy loyihasi. Hozircha ilovada hech qanday
        interaktivlik yo'q: biz faqat ma'lumotdan chiroyli, to'g'ri tuzilgan sahifa yasaymiz.
        Lekin aynan shu ko'nikma — ma'lumotni komponentlarga bo'lib, props orqali uzatib,
        ro'yxat va shartlar bilan chizish — har qanday React ilovasining 80 foizini tashkil
        qiladi. Keyingi bo'limda bu menyuga o'xshash ilovalarga jon kiritamiz.
      </p>

      <h2>Talablar</h2>
      <p>"Beshqozon" osh markazi uchun onlayn menyu sahifasi:</p>
      <ul>
        <li>Tepada restoran nomi, manzili va ish vaqti.</li>
        <li>
          Taomlar bo'limlarga ajratilgan (Osh, Sho'rvalar, Salatlar, Ichimliklar). Har bir
          bo'lim sarlavhasi yonida "3 tadan 2 tasi mavjud" ko'rinishidagi izoh.
        </li>
        <li>Har bir taom kartasida: nomi, tavsifi, narxi va belgilar (Vegetarian, Achchiq, Yangi...).</li>
        <li>Chegirmali taomda eski narx chizilgan, yonida yangi narx.</li>
        <li>
          Tugagan taom xira ko'rinadi, "Tugadi" belgisi bilan, va bo'limning eng pastiga
          tushadi.
        </li>
        <li>Bo'limdagi barcha taomlar tugagan bo'lsa — bo'lim boshida ogohlantirish.</li>
        <li>Hamma ma'lumot bitta faylda; komponentlarda birorta taom nomi qo'lda yozilmaydi.</li>
      </ul>
      <p>
        Ishlatiladigan bilimlar: komponent va modullar (4), props (5), children (6), shartli
        render (7), ro'yxatlar va key (8), sof komponentlar (9), CSS Modules (10).
      </p>

      <h2>Reja: komponentlarga bo'lish</h2>
      <p>
        Kod yozishdan oldin sahifani komponentlarga bo'lamiz (1-darsdagi 2-mashqni eslang).
        Takrorlanadigan narsalar — bo'lim, taom kartasi, belgi — albatta alohida komponent:
      </p>
      <Figure
        src={menuTree}
        alt="App'dan Sarlavha va Bolim'ga, Bolim'dan TaomKartasi'ga, TaomKartasi'dan Belgi va Narx'ga strelkalar. Chetda menu.js ma'lumot fayli App'ga ulangan."
        caption="1-rasm: menyu ilovasining komponentlar daraxti"
      />
      <ul>
        <li><code>App</code> — ma'lumotni import qiladi va bo'limlarni aylanib chiqadi.</li>
        <li><code>Sarlavha</code> — restoran nomi, manzil, ish vaqti.</li>
        <li><code>Bolim</code> — bo'lim qobig'i: sarlavha, izoh va <code>children</code>.</li>
        <li><code>TaomKartasi</code> — bitta taom.</li>
        <li><code>Belgi</code> va <code>Narx</code> — kartaning kichik, qayta ishlatiladigan bo'laklari.</li>
      </ul>
      <p>Fayllar tuzilishi:</p>
      <CodeBlock lang="text">{`src/
├── data/
│   └── menu.js
├── components/
│   ├── Belgi.jsx
│   ├── Bolim.jsx
│   ├── Narx.jsx
│   ├── Sarlavha.jsx
│   └── TaomKartasi.jsx
├── Menyu.module.css
├── App.jsx
├── index.css
└── main.jsx`}</CodeBlock>
      <Callout type="note" title="Bitta CSS Modules fayli">
        Loyiha kichik bo'lgani uchun barcha stillarni bitta <code>Menyu.module.css</code>{' '}
        fayliga yig'amiz va har bir komponent uni import qiladi. Kattaroq loyihada har bir
        komponent o'z <code>.module.css</code> fayliga ega bo'ladi (10-dars).
      </Callout>

      <h2>1-qadam: ma'lumot</h2>
      <p>
        <strong>Maqsad:</strong> sahifadagi barcha matn va sonlarni bitta joyga yig'ish.
      </p>
      <p>
        Haqiqiy restoranda bu ma'lumot serverdan keladi (28-darsda shuni qilamiz). Hozircha uni
        alohida JS faylda saqlaymiz. Har bir taomning noyob <code>id</code>si bor — u{' '}
        <code>key</code> uchun kerak. <code>chegirma</code> ixtiyoriy: u yo'q taomlarda{' '}
        <code>undefined</code> bo'ladi.
      </p>
      <CodeBlock lang="js">{`// src/data/menu.js
export const restoran = {
  nomi: 'Beshqozon',
  manzil: "Toshkent, Yunusobod tumani, Amir Temur ko'chasi, 108",
  ishVaqti: '10:00 – 23:00',
}

export const bolimlar = [
  {
    id: 'osh',
    nomi: 'Osh',
    taomlar: [
      {
        id: 'osh-1',
        nomi: "To'y oshi",
        tavsif: "Devzira guruch, qo'y go'shti, sariq sabzi, no'xat va mayiz.",
        narx: 45000,
        belgilar: ['Mashhur'],
        mavjud: true,
      },
      {
        id: 'osh-2',
        nomi: 'Samarqand oshi',
        tavsif: "Qatlam-qatlam tortilgan, go'shti ustiga terilgan osh.",
        narx: 48000,
        chegirma: 10,
        belgilar: [],
        mavjud: true,
      },
      {
        id: 'osh-3',
        nomi: 'Choyxona palovi',
        tavsif: "Bedana tuxumi va qazi bilan. Faqat tushlikkacha.",
        narx: 55000,
        belgilar: ['Yangi'],
        mavjud: false,
      },
    ],
  },
  {
    id: 'shorva',
    nomi: "Sho'rvalar",
    taomlar: [
      {
        id: 'shorva-1',
        nomi: "Qo'y sho'rva",
        tavsif: "Kartoshka, sabzi va ko'katlar bilan tiniq sho'rva.",
        narx: 32000,
        belgilar: [],
        mavjud: true,
      },
      {
        id: 'shorva-2',
        nomi: 'Mastava',
        tavsif: "Guruchli quyuq sho'rva, qatiq bilan tortiladi.",
        narx: 28000,
        belgilar: ['Achchiq'],
        mavjud: true,
      },
    ],
  },
  {
    id: 'salat',
    nomi: 'Salatlar',
    taomlar: [
      {
        id: 'salat-1',
        nomi: 'Achchiq-chuchuk',
        tavsif: 'Pomidor, piyoz va achchiq qalampir.',
        narx: 15000,
        belgilar: ['Vegetarian', 'Achchiq'],
        mavjud: true,
      },
      {
        id: 'salat-2',
        nomi: 'Shakarob',
        tavsif: 'Pomidor va piyoz, rayhon bilan.',
        narx: 14000,
        chegirma: 20,
        belgilar: ['Vegetarian'],
        mavjud: true,
      },
    ],
  },
  {
    id: 'ichimlik',
    nomi: 'Ichimliklar',
    taomlar: [
      {
        id: 'ichimlik-1',
        nomi: "Ko'k choy",
        tavsif: 'Choynakda, limon bilan.',
        narx: 8000,
        belgilar: [],
        mavjud: false,
      },
      {
        id: 'ichimlik-2',
        nomi: 'Kompot',
        tavsif: "Uy kompoti, mavsumiy mevalardan.",
        narx: 12000,
        belgilar: ['Yangi'],
        mavjud: false,
      },
    ],
  },
]`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong> ma'lumot UI'dan ajratilgan. Ertaga menyuga yangi taom
        qo'shish uchun birorta komponentga tegish shart emas — faqat shu faylga yangi obyekt.
        Bu — 1-darsdagi UI = f(ma'lumot) g'oyasining amaldagi ko'rinishi.
      </p>

      <h2>2-qadam: Narx va Belgi</h2>
      <p>
        <strong>Maqsad:</strong> eng kichik bo'laklardan boshlash.
      </p>
      <CodeBlock lang="jsx">{`// src/components/Narx.jsx
import styles from '../Menyu.module.css'

function formatlash(son) {
  return son.toLocaleString('uz-UZ') + " so'm"
}

export default function Narx({ narx, chegirma = 0 }) {
  if (chegirma === 0) {
    return <div className={styles.narx}>{formatlash(narx)}</div>
  }

  const yangiNarx = narx * (1 - chegirma / 100)
  return (
    <div className={styles.narx}>
      <span className={styles.eskiNarx}>{formatlash(narx)}</span>
      <span className={styles.yangiNarx}>{formatlash(yangiNarx)}</span>
    </div>
  )
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong> <code>chegirma = 0</code> standart qiymati (5-dars)
        tufayli <code>chegirma</code>si yo'q taomlar ham to'g'ri ishlaydi. Erta{' '}
        <code>return</code> (7-dars) ikki butunlay boshqa ko'rinishni ajratib turadi.{' '}
        <code>toLocaleString</code> esa <code>45000</code>ni o'qishga qulay{' '}
        <code>45 000</code> ko'rinishiga keltiradi (ajratuvchi belgi brauzerga qarab bo'sh joy
        yoki vergul bo'lishi mumkin).
      </p>
      <CodeBlock lang="jsx">{`// src/components/Belgi.jsx
import styles from '../Menyu.module.css'

const BELGI_KLASSLARI = {
  Vegetarian: styles.yashil,
  Achchiq: styles.qizil,
  Tugadi: styles.qizil,
  Yangi: styles.sariq,
}

export default function Belgi({ matn }) {
  const qoshimcha = BELGI_KLASSLARI[matn] ?? ''
  return <span className={\`\${styles.belgi} \${qoshimcha}\`}>{matn}</span>
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong> belgi rangini tanlash uchun to'rtta ternary o'rniga
        7-darsdagi <strong>lug'at obyekt</strong>. Ro'yxatda yo'q belgi (masalan, "Mashhur")
        oddiy kulrang bo'lib qoladi — <code>??</code> operatori <code>undefined</code>ni bo'sh
        satrga almashtiradi.
      </p>

      <h2>3-qadam: TaomKartasi</h2>
      <p>
        <strong>Maqsad:</strong> bitta taomni to'liq chizish.
      </p>
      <CodeBlock lang="jsx">{`// src/components/TaomKartasi.jsx
import styles from '../Menyu.module.css'
import Belgi from './Belgi.jsx'
import Narx from './Narx.jsx'

export default function TaomKartasi({ taom }) {
  return (
    <li className={taom.mavjud ? styles.karta : \`\${styles.karta} \${styles.tugagan}\`}>
      <div>
        <h3 className={styles.taomNomi}>
          {taom.nomi}
          {taom.belgilar.map((belgi) => (
            <Belgi key={belgi} matn={belgi} />
          ))}
          {!taom.mavjud && <Belgi matn="Tugadi" />}
        </h3>
        <p className={styles.tavsif}>{taom.tavsif}</p>
      </div>
      <Narx narx={taom.narx} chegirma={taom.chegirma} />
    </li>
  )
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong>
      </p>
      <ul>
        <li>
          Butun <code>taom</code> obyekti bitta prop sifatida uzatildi — kartaga uning deyarli
          barcha maydonlari kerak, beshta alohida prop yozish ortiqcha bo'lardi.
        </li>
        <li>
          Belgilar ro'yxatida <code>{'key={belgi}'}</code> — matnning o'zi. Bitta taomda bir xil
          belgi ikki marta bo'lmaydi, shuning uchun u noyob va barqaror (8-dars).
        </li>
        <li>
          <code>{'{!taom.mavjud && ...}'}</code> — chap tomon har doim boolean, "0" muammosi
          yo'q.
        </li>
        <li>
          Komponent sof (9-dars): <code>taom</code>ni faqat o'qiydi, hech narsani
          o'zgartirmaydi.
        </li>
      </ul>

      <h2>4-qadam: Bolim va Sarlavha</h2>
      <p>
        <strong>Maqsad:</strong> sahifa "qobiqlarini" yasash.
      </p>
      <CodeBlock lang="jsx">{`// src/components/Bolim.jsx
import styles from '../Menyu.module.css'

export default function Bolim({ nomi, izoh, children }) {
  return (
    <section className={styles.bolim}>
      <div className={styles.bolimSarlavhasi}>
        <h2 className={styles.bolimNomi}>{nomi}</h2>
        <span className={styles.bolimIzohi}>{izoh}</span>
      </div>
      {children}
    </section>
  )
}`}</CodeBlock>
      <CodeBlock lang="jsx">{`// src/components/Sarlavha.jsx
import styles from '../Menyu.module.css'

export default function Sarlavha({ nomi, manzil, ishVaqti }) {
  return (
    <header className={styles.sarlavha}>
      <h1 className={styles.restoranNomi}>{nomi}</h1>
      <p className={styles.manzil}>
        {manzil} · {ishVaqti}
      </p>
    </header>
  )
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong> <code>Bolim</code> ichida nima bo'lishini bilmaydi —
        ro'yxatmi, ogohlantirishmi, ikkalasimi. Bu 6-darsdagi composition: qobiq bir joyda,
        mazmun esa chaqiruvchining qo'lida. Ertaga "Kun taklifi" bo'limiga ro'yxat o'rniga
        katta rasm kerak bo'lsa, <code>Bolim</code>ni o'zgartirish shart emas.
      </p>

      <h2>5-qadam: App — hammasini yig'ish</h2>
      <p>
        <strong>Maqsad:</strong> ma'lumotni komponentlarga ulash.
      </p>
      <CodeBlock lang="jsx">{`// src/App.jsx
import styles from './Menyu.module.css'
import { restoran, bolimlar } from './data/menu.js'
import Sarlavha from './components/Sarlavha.jsx'
import Bolim from './components/Bolim.jsx'
import TaomKartasi from './components/TaomKartasi.jsx'

export default function App() {
  return (
    <div className={styles.sahifa}>
      <div className={styles.konteyner}>
        <Sarlavha nomi={restoran.nomi} manzil={restoran.manzil} ishVaqti={restoran.ishVaqti} />

        <main>
          {bolimlar.map((bolim) => {
            const mavjudlari = bolim.taomlar.filter((taom) => taom.mavjud)
            // mavjud taomlar tepada, tugaganlari pastda
            const tartiblangan = bolim.taomlar.toSorted((a, b) => b.mavjud - a.mavjud)

            return (
              <Bolim
                key={bolim.id}
                nomi={bolim.nomi}
                izoh={\`\${bolim.taomlar.length} tadan \${mavjudlari.length} tasi mavjud\`}
              >
                {mavjudlari.length === 0 && (
                  <p className={styles.ogohlantirish}>Bu bo'limdagi barcha taomlar bugun tugadi.</p>
                )}
                <ul className={styles.royxat}>
                  {tartiblangan.map((taom) => (
                    <TaomKartasi key={taom.id} taom={taom} />
                  ))}
                </ul>
              </Bolim>
            )
          })}
        </main>

        <footer className={styles.footer}>Narxlar QQS bilan. Yoqimli ishtaha!</footer>
      </div>
    </div>
  )
}`}</CodeBlock>
      <p>
        <strong>Nega shunday:</strong>
      </p>
      <ul>
        <li>
          <code>map</code> ichidagi funksiya bu safar jingalak qavsli tanaga ega, chunki
          JSX'dan oldin ikki o'zgaruvchi hisoblanadi — shuning uchun aniq <code>return</code>{' '}
          bor (8-darsdagi xatoni eslang).
        </li>
        <li>
          <code>mavjudlari</code> va <code>tartiblangan</code> — saqlanmaydigan, har renderda
          ma'lumotdan hisoblanadigan qiymatlar. Izohdagi son va ogohlantirish ular bilan doim
          ma'lumotga mos.
        </li>
        <li>
          <code>toSorted</code> asl massivni o'zgartirmaydi (8-dars).{' '}
          <code>b.mavjud - a.mavjud</code>: JavaScript ayirishda <code>true</code>ni 1,{' '}
          <code>false</code>ni 0 deb hisoblaydi, shuning uchun mavjudlar oldinga chiqadi.
        </li>
        <li>
          <code>key</code> <code>Bolim</code> va <code>TaomKartasi</code> teglarida — ichidagi{' '}
          <code>{'<section>'}</code> yoki <code>{'<li>'}</code>da emas.
        </li>
      </ul>

      <h2>6-qadam: stillar</h2>
      <p>
        <strong>Maqsad:</strong> menyuga restoran ruhini berish. CSS Modules faylidagi klass
        nomlari camelCase'da (10-dars), shuning uchun <code>styles.bolimNomi</code> kabi
        to'g'ridan-to'g'ri murojaat qilish mumkin. <code>index.css</code>dagi Vite
        shablonining standart stillarini o'chirib, faqat <code>{'body { margin: 0; }'}</code>{' '}
        qoldiring.
      </p>
      <CodeBlock lang="css">{`/* src/Menyu.module.css */
.sahifa {
  min-height: 100vh;
  background: #fbf6ee;
  color: #2b1d14;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  padding: 48px 16px 64px;
}

.konteyner {
  max-width: 760px;
  margin: 0 auto;
}

/* Sarlavha */
.sarlavha {
  text-align: center;
  margin-bottom: 40px;
}

.restoranNomi {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 44px;
  margin: 0;
  color: #b4531f;
  letter-spacing: 0.02em;
}

.manzil {
  margin: 8px 0 0;
  color: #7a6a5c;
  font-size: 14px;
}

/* Bo'lim */
.bolim {
  margin-top: 36px;
}

.bolimSarlavhasi {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 2px solid #b4531f;
  padding-bottom: 6px;
  margin-bottom: 16px;
}

.bolimNomi {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 26px;
  margin: 0;
}

.bolimIzohi {
  font-size: 13px;
  color: #7a6a5c;
}

.ogohlantirish {
  background: #fdecea;
  color: #b42318;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  margin: 0 0 12px;
}

.royxat {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
}

/* Taom kartasi */
.karta {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  background: #ffffff;
  border: 1px solid #eadfce;
  border-radius: 12px;
  padding: 16px 18px;
}

.tugagan {
  opacity: 0.55;
}

.taomNomi {
  margin: 0;
  font-family: inherit;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.tavsif {
  margin: 6px 0 0;
  color: #7a6a5c;
  font-size: 14px;
  line-height: 1.5;
}

/* Belgi */
.belgi {
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-radius: 999px;
  padding: 2px 8px;
  background: #f1e7da;
  color: #7a6a5c;
}

.yashil {
  background: #e8efdc;
  color: #5f7a3a;
}

.qizil {
  background: #fdecea;
  color: #b42318;
}

.sariq {
  background: #fdf1d6;
  color: #9a6200;
}

/* Narx */
.narx {
  white-space: nowrap;
  text-align: right;
  font-weight: 700;
  font-size: 17px;
}

.eskiNarx {
  display: block;
  font-weight: 400;
  font-size: 13px;
  color: #7a6a5c;
  text-decoration: line-through;
}

.yangiNarx {
  color: #b4531f;
}

.footer {
  margin-top: 48px;
  text-align: center;
  font-size: 13px;
  color: #7a6a5c;
}`}</CodeBlock>

      <p>
        <strong>Nega shunday:</strong> barcha ranglar va o'lchamlar bitta faylda, klass nomlari
        esa qisqa va oddiy (<code>.karta</code>, <code>.narx</code>) — CSS Modules ularni baribir
        noyob nomlarga aylantiradi, shuning uchun boshqa komponentlar bilan to'qnashuv yo'q.
        Tugagan taom uchun alohida komponent emas, bitta qo'shimcha klass (<code>.tugagan</code>)
        yetarli: ko'rinish farqi faqat stilda.
      </p>

      <h2>To'liq kod</h2>
      <p>
        1–6-qadamlardagi fayllar (<code>menu.js</code>, beshta komponent, <code>App.jsx</code>,{' '}
        <code>Menyu.module.css</code>) — yakuniy ko'rinishda. Qolgan ikki fayl:
      </p>
      <CodeBlock lang="css">{`/* src/index.css — Vite shablonidagi hamma narsani shu bilan almashtiring */
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

      <h2>Yakuniy natija</h2>
      <p>
        Barcha fayllar tayyor.{' '}
        <code>npm run dev</code> bilan sahifani oching va{' '}
        <a href="/loyihalar/react-restaurant-menu">tayyor natija</a> bilan solishtiring. Tekshirib
        ko'ring:
      </p>
      <ul>
        <li>
          <code>menu.js</code>da biror taomning <code>mavjud</code>ini <code>false</code>ga
          o'zgartiring — u xiralashib, bo'lim oxiriga tushishi va izohdagi son o'zgarishi kerak.
        </li>
        <li>
          Yangi taom qo'shing — hech qaysi komponentga tegmasdan u sahifada paydo bo'lishi kerak.
        </li>
        <li>
          Brauzer konsolida birorta ogohlantirish (ayniqsa <code>key</code> haqida) bo'lmasligi
          kerak.
        </li>
      </ul>

      <h2>Qo'shimcha topshiriqlar</h2>
      <p>Bularning yechimi berilmaydi — o'zingiz bajaring va natijani brauzerda tekshiring.</p>
      <ol>
        <li>
          <strong>Bo'limlar menyusi.</strong> Sahifa tepasiga bo'limlar ro'yxatini qo'shing
          (Osh · Sho'rvalar · ...). Har biri <code>{'<a href="#osh">'}</code> ko'rinishidagi
          havola bo'lib, bosilganda tegishli bo'limga o'tsin. Buning uchun{' '}
          <code>{'<section>'}</code>ga <code>id</code> kerak bo'ladi — uni qayerdan olasiz?
        </li>
        <li>
          <strong>Kaloriya.</strong> Ba'zi taomlarga <code>kaloriya</code> maydonini qo'shing. U
          bor taomlarda nomi ostida "520 kkal" chiqsin, yo'qlarida hech narsa chiqmasin (va
          "0" ham chiqmasin — kaloriyasi 0 bo'lgan suv-chi?).
        </li>
        <li>
          <strong>Kun taklifi.</strong> Sahifa tepasida, sarlavha ostida, eng katta chegirmali
          mavjud taomni alohida katta kartada ko'rsating. Uni hisoblash uchun barcha
          bo'limlardagi taomlarni bitta massivga yig'ish kerak (<code>flatMap</code>ga qarang).
        </li>
      </ol>

      <KeyPoints>
        <li>
          Avval UI'ni komponentlar daraxtiga bo'ling: takrorlanadigan va mustaqil ma'noli
          bo'laklar — alohida komponent.
        </li>
        <li>
          Ma'lumotni alohida faylda saqlang; komponentlar uni faqat props orqali oladi va
          o'zgartirmaydi.
        </li>
        <li>
          Hisoblanadigan qiymatlar (mavjudlar soni, saralangan ro'yxat) saqlanmaydi — ular har
          renderda ma'lumotdan qayta hisoblanadi.
        </li>
        <li>
          Qobiq komponentlar (<code>Bolim</code>) <code>children</code> bilan, ko'p variantli
          ko'rinishlar lug'at obyekt bilan, "bor/yo'q" holatlar <code>&&</code> bilan yoziladi.
        </li>
        <li>
          Interaktivlik hali yo'q — keyingi bo'limda ilovalarga hodisalar va state qo'shamiz.
        </li>
      </KeyPoints>
    </>
  )
}
