import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Komponentlarga stil berish",
  section: "UI'ni tasvirlash",
}

export default function StylingLesson() {
  return (
    <>
      <h2>Muammo: bir xil klass nomi, ikki xil komponent</h2>
      <p>
        Loyihangizda ikkita komponent bor, har biri o'z CSS faylida:
      </p>
      <CodeBlock lang="css">{`/* KitobKartasi.css */
.karta {
  border: 1px solid #ddd;
  padding: 16px;
}`}</CodeBlock>
      <CodeBlock lang="css">{`/* FoydalanuvchiKartasi.css */
.karta {
  background: #222;
  color: white;
  border-radius: 50%;
}`}</CodeBlock>
      <p>
        Ikkala fayl ham alohida, ikkala komponent ham alohida — lekin kitob kartalari birdan
        qora va dumaloq bo'lib qoldi. Sabab: oddiy CSS <strong>global</strong>. Vite barcha
        import qilingan CSS fayllarni bitta sahifaga qo'shadi, va <code>.karta</code> nomli
        ikki qoida bir-birining ustiga yoziladi. Loyiha kattalashgan sari bunday to'qnashuvlar
        ko'payadi.
      </p>
      <p>
        Bu darsda React loyihasida stil berishning asosiy usullarini va har birini qachon
        tanlashni ko'ramiz: oddiy CSS fayllar, CSS Modules va <code>style</code> prop'i.
      </p>

      <h2>1-usul: oddiy CSS fayl</h2>
      <p>
        Eng sodda yo'l — CSS faylni komponent fayli yonida yaratib, uni import qilish. Klass{' '}
        <code>className</code> orqali beriladi (3-darsni eslang):
      </p>
      <CodeBlock lang="jsx">{`// src/components/KitobKartasi.jsx
import './KitobKartasi.css'

export default function KitobKartasi({ nomi, muallif }) {
  return (
    <div className="karta">
      <h3 className="karta-nomi">{nomi}</h3>
      <p>{muallif}</p>
    </div>
  )
}`}</CodeBlock>
      <p>
        <code>import './KitobKartasi.css'</code> — hech narsani o'zgaruvchiga olmaydigan import:
        u shunchaki "bu CSS'ni sahifaga qo'sh" degani. Shu sababli CSS hali ham global — fayl
        komponent yonida turishi faqat tartib uchun. To'qnashuvlardan qochish uchun klass
        nomlariga komponent nomini prefiks qilish odati bor:{' '}
        <code>.kitob-karta</code>, <code>.kitob-karta__nomi</code> (bu BEM uslubi deb ataladi).
      </p>
      <p>
        Umumiy, butun sahifaga tegishli stillar (shrift, fon rangi, <code>box-sizing</code>) esa{' '}
        <code>src/index.css</code>da qoladi — u <code>main.jsx</code>da allaqachon import
        qilingan.
      </p>

      <h3>Shartga qarab klass berish</h3>
      <p>
        <code>className</code> — oddiy satr, demak uni JavaScript bilan yig'ish mumkin. 7-darsdagi
        ternary bu yerda juda qo'l keladi:
      </p>
      <CodeBlock lang="jsx">{`function Tugma({ asosiy, children }) {
  return (
    <button className={asosiy ? 'tugma tugma-asosiy' : 'tugma'}>
      {children}
    </button>
  )
}

// Bir nechta shart bo'lsa — template literal:
<div className={\`karta \${tanlangan ? 'tanlangan' : ''} \${tugagan ? 'xira' : ''}\`}>`}</CodeBlock>
      <p>
        Shartlar ko'payib ketsa, haqiqiy loyihalarda kichik <code>clsx</code> kutubxonasi
        ishlatiladi: <code>{"clsx('karta', { tanlangan, xira: tugagan })"}</code>. Hozircha
        template literal yetarli.
      </p>

      <h2>2-usul: CSS Modules</h2>
      <p>
        CSS Modules to'qnashuv muammosini butunlay hal qiladi, va buning uchun hech narsa
        o'rnatish shart emas — Vite uni o'zi qo'llab-quvvatlaydi. Faqat fayl nomi{' '}
        <code>.module.css</code> bilan tugashi kerak:
      </p>
      <CodeBlock lang="css">{`/* KitobKartasi.module.css */
.karta {
  border: 1px solid #ddd;
  padding: 16px;
}

.nomi {
  font-size: 18px;
}

.tanlangan {
  border-color: #c67139;
}`}</CodeBlock>
      <CodeBlock lang="jsx">{`import styles from './KitobKartasi.module.css'

export default function KitobKartasi({ nomi, tanlangan }) {
  return (
    <div className={tanlangan ? \`\${styles.karta} \${styles.tanlangan}\` : styles.karta}>
      <h3 className={styles.nomi}>{nomi}</h3>
    </div>
  )
}`}</CodeBlock>
      <p>
        Endi <code>styles</code> — obyekt: uning kalitlari siz yozgan klass nomlari, qiymatlari
        esa Vite yaratgan <strong>noyob</strong> nomlar. Brauzerda element{' '}
        <code>{'class="_karta_x7k2p_1"'}</code> ko'rinishida chiqadi. Boshqa komponentdagi{' '}
        <code>.karta</code> esa boshqa noyob nom oladi — ular endi hech qachon to'qnashmaydi.
        Shuning uchun CSS Modules'da qisqa, oddiy klass nomlari (<code>.karta</code>,{' '}
        <code>.nomi</code>) yozish mumkin.
      </p>
      <Callout type="tip" title="Klass nomlarini camelCase'da yozing">
        <code>.narx-belgisi</code> kabi chiziqchali nomga <code>styles.narx-belgisi</code> deb
        murojaat qilib bo'lmaydi — JavaScript buni ayirish deb tushunadi. Yoki{' '}
        <code>{"styles['narx-belgisi']"}</code> deb yozing, yoki CSS Modules faylida boshidanoq{' '}
        <code>.narxBelgisi</code> deb nomlang.
      </Callout>

      <h2>3-usul: style prop'i</h2>
      <p>
        <code>style</code> atributi HTML'dagidek satr emas, <strong>obyekt</strong> qabul qiladi.
        Xususiyat nomlari camelCase'da, son qiymatlar esa aksariyat xususiyatlarda avtomatik <code>px</code> bo'ladi (<code>opacity</code>, <code>zIndex</code>, <code>lineHeight</code> kabi birliksizlari bundan mustasno):
      </p>
      <CodeBlock lang="jsx">{`// HTML:  <div style="background-color: #fff2eb; font-size: 14px">
// JSX:
<div style={{ backgroundColor: '#fff2eb', fontSize: 14 }}>...</div>`}</CodeBlock>
      <p>
        Ikki qavat qavs yana o'sha: tashqisi — "JavaScript qiymati", ichkisi — obyekt. Inline
        stilning haqiqiy kuchi — <strong>dinamik qiymatlar</strong>, ya'ni har renderda
        hisoblanadigan, klass bilan oldindan yozib bo'lmaydigan qiymatlar:
      </p>
      <CodeBlock lang="jsx">{`function Progress({ foiz }) {
  return (
    <div className="progress">
      <div className="progress-chiziq" style={{ width: \`\${foiz}%\` }} />
    </div>
  )
}

<Progress foiz={65} />`}</CodeBlock>
      <p>
        Qolgan hamma narsa (rang, shrift, joylashuv) uchun klasslardan foydalaning: inline
        stilda <code>:hover</code>, media query va animatsiyalar ishlamaydi, va bir xil stilni
        har bir elementga qayta-qayta yozishga to'g'ri keladi.
      </p>

      <h2>Rasmlar</h2>
      <p>Rasm qo'shishning ikki yo'li bor:</p>
      <CodeBlock lang="jsx">{`// 1) src/assets/ ichidagi rasm — import qilinadi
import logo from '../assets/logo.png'
<img src={logo} alt="Kitob rastasi logotipi" />

// 2) public/ ichidagi rasm — to'g'ridan-to'g'ri manzil bilan
<img src="/images/muqova.jpg" alt="Muqova" />`}</CodeBlock>
      <p>
        <code>src/assets</code>dagi rasm nomiga Vite hash qo'shadi (4 KB dan kichiklarini esa to'g'ridan-to'g'ri kodga joylab yuboradi);
        fayl yo'q bo'lsa — build xato beradi. <code>public/</code>dagi fayllar esa o'zgarishsiz
        ko'chiriladi — ko'p sonli yoki dinamik nomli rasmlar (masalan, kitob muqovalari) uchun
        qulay.
      </p>

      <h2>Qaysi birini tanlash kerak?</h2>
      <ul>
        <li>
          <strong>Global stillar</strong> (shrift, reset, CSS o'zgaruvchilari) —{' '}
          <code>index.css</code>.
        </li>
        <li>
          <strong>Komponent stillari</strong> — CSS Modules. Bu kursdagi loyihalarda shu
          usuldan foydalanamiz.
        </li>
        <li>
          <strong>Dinamik qiymatlar</strong> (foiz, koordinata, foydalanuvchi tanlagan rang) —{' '}
          <code>style</code> prop'i.
        </li>
      </ul>
      <Callout type="note" title="Tailwind CSS haqida">
        Ko'plab React loyihalarida <strong>Tailwind CSS</strong> ishlatiladi: CSS fayl yozish
        o'rniga, JSX'da tayyor kichik klasslar birlashtiriladi (
        <code>{'className="rounded-lg border p-4"'}</code>). Bu alohida vosita — uni Tailwind
        kursida o'rganishingiz mumkin. React'ning o'zi uchun hech narsa o'zgarmaydi: Tailwind
        ham oxir-oqibat <code>className</code>ga yoziladigan oddiy satr.
      </Callout>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong><code>style</code>ga satr berish.</strong>{' '}
            <code>{'style="color: red"'}</code> — React xato beradi: "The style prop expects a
            mapping from style properties to values, not a string". To'g'risi —{' '}
            <code>{"style={{ color: 'red' }}"}</code>.
          </li>
          <li>
            <strong>Chiziqchali xususiyat nomlari.</strong>{' '}
            <code>{"{{ 'font-size': 14 }}"}</code> o'rniga <code>{'{{ fontSize: 14 }}'}</code>.
          </li>
          <li>
            <strong><code>.module</code>ni unutish.</strong> Fayl <code>Karta.css</code> deb
            nomlansa, <code>import styles from './Karta.css'</code> ishlamaydi: oddiy CSS faylda
            default eksport yo'q, shuning uchun sahifa oq bo'lib qoladi va konsolda "does not
            provide an export named 'default'" xatosi chiqadi. CSS Modules uchun fayl nomi{' '}
            <code>.module.css</code> bilan tugashi shart.
          </li>
          <li>
            <strong>CSS Modules klassini satr sifatida yozish.</strong>{' '}
            <code>{'className="karta"'}</code> CSS Modules faylidagi <code>.karta</code>ga
            mos kelmaydi — nom o'zgartirilgan. Doim <code>{'className={styles.karta}'}</code>.
          </li>
          <li>
            <strong>Hamma narsani inline stil bilan yozish</strong> — hover, media query yo'q,
            kod takrorlanadi. Inline faqat dinamik qiymat uchun.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="Tugma.module.css faylida .asosiy klassi bor. Komponentda import styles from './Tugma.module.css' qilingan. Tugmaga bu klassni qanday berasiz?"
        options={[
          "className={styles.asosiy}",
          'className="asosiy"',
          "className={asosiy}",
          'style={styles.asosiy}',
        ]}
        correctIndex={0}
        explanation="CSS Modules klass nomlarini noyob nomlarga aylantiradi, va haqiqiy nom styles obyektida saqlanadi. className='asosiy' esa haqiqiy (o'zgartirilgan) nomga mos kelmaydi."
      />

      <Quiz
        question="Yuklanish chizig'ining kengligi har soniyada 0% dan 100% gacha o'zgaradi. Kenglikni berishning eng to'g'ri usuli qaysi?"
        options={[
          "style={{ width: `${foiz}%` }}",
          "Har bir foiz uchun alohida CSS klass: .w-1, .w-2, ... .w-100",
          "document.querySelector bilan kenglikni qo'lda o'zgartirish",
          "Global CSS'da !important bilan",
        ]}
        correctIndex={0}
        explanation="Har renderda hisoblanadigan dinamik qiymat — style prop'ining aynan vazifasi. 100 ta klass yozish ortiqcha, DOM'ni qo'lda o'zgartirish esa React'da qilinmaydi (1-dars)."
      />

      <Exercise title="1-mashq: CSS Modules bilan karta">
        <p>
          5-darsdagi <code>KitobKartasi</code>ga CSS Modules bilan stil bering:{' '}
          <code>KitobKartasi.module.css</code> faylida <code>.karta</code> (chegara, ichki
          bo'shliq, yumaloq burchak), <code>.nomi</code> va <code>.muallif</code> (kulrang,
          kichikroq) klasslari bo'lsin. So'ng <code>mavjud</code> prop'i <code>false</code>{' '}
          bo'lganda kartaga qo'shimcha <code>.xira</code> klassi (<code>opacity: 0.5</code>)
          qo'shilsin.
        </p>
        <Solution>
          <CodeBlock lang="css">{`/* KitobKartasi.module.css */
.karta {
  border: 1px solid #e3e1da;
  border-radius: 12px;
  padding: 16px;
}

.nomi {
  margin: 0 0 4px;
  font-size: 18px;
}

.muallif {
  margin: 0;
  color: #6a675e;
  font-size: 14px;
}

.xira {
  opacity: 0.5;
}`}</CodeBlock>
          <CodeBlock lang="jsx">{`import styles from './KitobKartasi.module.css'

export default function KitobKartasi({ nomi, muallif, mavjud = true }) {
  const klass = mavjud ? styles.karta : \`\${styles.karta} \${styles.xira}\`

  return (
    <div className={klass}>
      <h3 className={styles.nomi}>{nomi}</h3>
      <p className={styles.muallif}>{muallif}</p>
    </div>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: reyting yulduzlari">
        <p>
          <code>Reyting</code> komponentini yozing: u <code>ball</code> (0 dan 5 gacha, kasr
          bo'lishi mumkin, masalan <code>3.5</code>) prop'ini oladi. Kulrang beshta yulduz (
          <code>★★★★★</code>) ustida xuddi shunday sariq yulduzlar turadi, va sariq qatlam
          kengligi ballga mos ravishda kesilgan bo'ladi (3.5 ball → 70%). Stillarning
          o'zgarmas qismini CSS Modules'da, dinamik kenglikni <code>style</code> prop'ida
          bering.
        </p>
        <Solution>
          <CodeBlock lang="css">{`/* Reyting.module.css */
.reyting {
  position: relative;
  display: inline-block;
  font-size: 24px;
  color: #d4d4d4;
}

.toldirilgan {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  white-space: nowrap;
  color: #f5b301;
}`}</CodeBlock>
          <CodeBlock lang="jsx">{`import styles from './Reyting.module.css'

export default function Reyting({ ball }) {
  const foiz = (ball / 5) * 100

  return (
    <span className={styles.reyting} aria-label={\`5 dan \${ball} ball\`}>
      ★★★★★
      <span className={styles.toldirilgan} style={{ width: \`\${foiz}%\` }}>
        ★★★★★
      </span>
    </span>
  )
}`}</CodeBlock>
          <p>
            Hamma narsa klassda, faqat ballga bog'liq bitta qiymat — <code>width</code> —
            inline. <code>aria-label</code> esa ekran o'quvchi dasturlar uchun bahoni matn
            ko'rinishida beradi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Oddiy CSS import qilinganda global bo'ladi — bir xil klass nomlari turli
          komponentlarda to'qnashadi.
        </li>
        <li>
          CSS Modules (<code>Nom.module.css</code> +{' '}
          <code>{'className={styles.klass}'}</code>) har bir klassga noyob nom beradi; komponent
          stillari uchun asosiy tanlov.
        </li>
        <li>
          <code>style</code> prop'i obyekt oladi (<code>{"{{ fontSize: 14 }}"}</code>) va faqat
          dinamik, hisoblanadigan qiymatlar uchun ishlatiladi.
        </li>
        <li>
          <code>className</code> — oddiy satr; shartli klasslar ternary yoki template literal
          bilan yig'iladi.
        </li>
        <li>
          Rasmlar: <code>src/assets</code>dan import qilinadi yoki <code>public/</code>dan
          to'g'ridan-to'g'ri manzil bilan olinadi.
        </li>
      </KeyPoints>
    </>
  )
}
