import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'useContext va Context API',
  section: 'State boshqaruvi naqshlari',
}

export default function UseContextLesson() {
  return (
    <>
      <p>
        14-darsda state'ni umumiy ota-komponentga ko'tarishni (lifting state up) ko'rdik — bu
        ikki-uchta yaqin komponent orasida ma'lumot bo'lishish uchun juda yaxshi ishlaydi. Lekin
        katta komponent daraxtida ba'zi ma'lumotlar (masalan, joriy foydalanuvchi yoki tanlangan
        tema) o'nlab komponent qavatlari orqali, ko'plab oraliq komponentlarga kerak bo'lmasa
        ham, ularning ichidan "o'tkazib yuborilishi" kerak bo'ladi. Bu muammoni React'ning{' '}
        <strong>Context API</strong>si hal qiladi.
      </p>

      <h2>
        Muammo: <em>prop drilling</em>
      </h2>
      <p>
        Tasavvur qiling, <code>App</code> komponentida joriy foydalanuvchi ma'lumoti bor, va u
        bir necha qavat pastdagi <code>ProfilTugmasi</code> komponentiga kerak. Oddiy props orqali
        buni uzatish uchun, har bir oraliq komponent — hatto o'ziga umuman kerak bo'lmasa ham —
        shu propni qabul qilib, keyingisiga uzatib turishi kerak:
      </p>
      <CodeBlock lang="jsx">{`function App() {
  const foydalanuvchi = { ism: 'Malika', avatar: 'malika.jpg' }
  return <Sahifa foydalanuvchi={foydalanuvchi} />
}

function Sahifa({ foydalanuvchi }) {
  return <Header foydalanuvchi={foydalanuvchi} />
}

function Header({ foydalanuvchi }) {
  return <Navbar foydalanuvchi={foydalanuvchi} />
}

function Navbar({ foydalanuvchi }) {
  return <ProfilTugmasi foydalanuvchi={foydalanuvchi} />
}

function ProfilTugmasi({ foydalanuvchi }) {
  return <button>{foydalanuvchi.ism}</button>
}`}</CodeBlock>
      <p>
        <code>Sahifa</code>, <code>Header</code> va <code>Navbar</code> komponentlarining
        hech biriga <code>foydalanuvchi</code> propi kerak emas — ular faqat uni pastga
        "tashiydi". Bu holat <strong>prop drilling</strong> (proplarni burg'ilab pastga o'tkazish)
        deb ataladi. Kichik komponent daraxtlarida bu unchalik muammo emas, lekin daraxt
        chuqurlashib, oraliq komponentlar ko'payishi bilan har bir yangi propni qo'shish yoki
        nomini o'zgartirish butun zanjir bo'ylab o'zgarish talab qiladi — bu esa kodni
        qo'llab-quvvatlashni qiyinlashtiradi.
      </p>

      <h2>Yechim: Context API</h2>
      <p>
        Context — komponent daraxtining bir qismini "o'rab", shu qism ichidagi{' '}
        <strong>istalgan chuqurlikdagi</strong> komponentga ma'lumotni to'g'ridan-to'g'ri
        yetkazish imkonini beradi, oraliq komponentlarni chetlab o'tib. Bu uch qadamdan iborat:
      </p>
      <p>
        <strong>1. Context yaratish</strong> — <code>createContext</code> yordamida, ixtiyoriy
        standart qiymat bilan:
      </p>
      <CodeBlock lang="jsx">{`import { createContext } from 'react'

const FoydalanuvchiContext = createContext(null)`}</CodeBlock>
      <p>
        <strong>2. Provider bilan o'rash</strong> — komponent daraxtining kerakli qismini{' '}
        <code>{'<FoydalanuvchiContext.Provider value={...}>'}</code> ichiga joylashtirish. Shu
        Provider ichidagi har qanday komponent (necha qavat chuqur bo'lishidan qat'i nazar) shu{' '}
        <code>value</code>ni o'qiy oladi:
      </p>
      <CodeBlock lang="jsx">{`function App() {
  const foydalanuvchi = { ism: 'Malika', avatar: 'malika.jpg' }

  return (
    <FoydalanuvchiContext.Provider value={foydalanuvchi}>
      <Sahifa />
    </FoydalanuvchiContext.Provider>
  )
}`}</CodeBlock>
      <p>
        <strong>
          3. <code>useContext</code> bilan o'qish
        </strong>{' '}
        — kerakli komponentda, necha qavat pastda bo'lishidan qat'i nazar:
      </p>
      <CodeBlock lang="jsx">{`import { useContext } from 'react'

function Sahifa() {
  return <Header />
}

function Header() {
  return <Navbar />
}

function Navbar() {
  return <ProfilTugmasi />
}

function ProfilTugmasi() {
  const foydalanuvchi = useContext(FoydalanuvchiContext)
  return <button>{foydalanuvchi.ism}</button>
}`}</CodeBlock>
      <p>
        Endi <code>Sahifa</code>, <code>Header</code> va <code>Navbar</code> komponentlarining
        hech biri <code>foydalanuvchi</code> haqida bilishi shart emas — ular hatto{' '}
        <code>props</code>ni umuman qabul qilmaydi. Faqat <code>ProfilTugmasi</code>, ya'ni bu
        ma'lumot haqiqatan kerak bo'lgan komponent, <code>useContext(FoydalanuvchiContext)</code>{' '}
        orqali uni to'g'ridan-to'g'ri o'qiydi — necha qavat chuqurlikda joylashganidan qat'i
        nazar.
      </p>

      <h2>To'liq misol: tema (theme) contexti</h2>
      <p>
        Yana bir keng tarqalgan holat — ilova bo'ylab "yorug'/qorong'i" tema (theme) qiymatini
        ulashish. Bu ham xuddi shu naqsh bilan yechiladi:
      </p>
      <CodeBlock lang="jsx">{`import { createContext, useContext, useState } from 'react'

const TemaContext = createContext('yorug')

function App() {
  const [tema, setTema] = useState('yorug')

  return (
    <TemaContext.Provider value={tema}>
      <button onClick={() => setTema(tema === 'yorug' ? 'qorongi' : 'yorug')}>
        Temani almashtirish
      </button>
      <AsosiyKontent />
    </TemaContext.Provider>
  )
}

function AsosiyKontent() {
  return <Karta />
}

function Karta() {
  const tema = useContext(TemaContext)
  return (
    <div className={tema === 'qorongi' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}>
      Karta mazmuni
    </div>
  )
}`}</CodeBlock>
      <p>
        <code>Karta</code> — <code>AsosiyKontent</code>ning bolasi, <code>AsosiyKontent</code>{' '}
        esa hech qanday props qabul qilmaydi. Shunga qaramay, <code>Karta</code>{' '}
        <code>TemaContext.Provider</code>da o'rnatilgan qiymatni to'g'ridan-to'g'ri o'qiy oladi,
        chunki u shu Provider'ning ichida joylashgan komponent daraxtining bir qismi.{' '}
        <code>tema</code> o'zgarganda, <code>Provider</code>ning <code>value</code>si yangilanadi
        va uni o'qiyotgan barcha komponentlar (ular qanchalik chuqur joylashgan bo'lmasin)
        avtomatik qayta render bo'ladi.
      </p>

      <Callout type="warning" title="Context — har doim eng yaxshi yechim emas">
        Context ma'lumotni pastga uzatish uchun juda kuchli vosita, lekin uni har doim
        ishlatavermang. Agar ma'lumot faqat ikkita-uchta yaqin joylashgan komponent orasida
        bo'lishilsa, 14-darsda ko'rgan <strong>state'ni yuqoriga ko'tarish</strong> odatda
        soddaroq va tushunarliroq yechim bo'ladi — propni to'g'ridan-to'g'ri ko'rish osonroq,
        context esa uni qayerdan kelayotganini "yashiradi". Context'ni chindan ham{' '}
        <strong>global</strong> yoki daraxtning katta qismiga tegishli bo'lgan qiymatlar uchun
        saqlang — joriy foydalanuvchi, tanlangan til (locale), tema kabi narsalar uchun. Avval
        props va lifting state up'ni sinab ko'ring, va faqat prop drilling chindan ham muammo
        bo'lib qolganda context'ga o'ting.
      </Callout>

      <Quiz
        question="Katta komponent daraxtida faqat ikkita yonma-yon (sibling) komponent bitta 'tanlangan sana' qiymatini bo'lishishi kerak, boshqa hech qaysi komponentga bu qiymat kerak emas. Qaysi yechim odatda maqsadga eng mos keladi?"
        options={[
          "createContext orqali global context yaratib, butun App'ni Provider bilan o'rash",
          "Qiymatni ikkalasining umumiy ota-komponentida useState bilan saqlab, props orqali ikkalasiga uzatish (state'ni yuqoriga ko'tarish)",
          "Har ikkala komponentda alohida useState yaratib, ularni useEffect orqali sinxronlash",
          "localStorage orqali qiymatni saqlab, har ikkala komponentda uni alohida o'qish",
        ]}
        correctIndex={1}
        explanation="Faqat ikkita yaqin komponent orasida qiymat bo'lishilganda, state'ni ularning umumiy ota-komponentiga ko'tarib, props orqali uzatish odatda eng sodda yechim. Context daraxtning katta qismiga tarqalgan yoki chuqur joylashgan komponentlarga kerak bo'lgan qiymatlar uchun mo'ljallangan — bu yerda esa ortiqcha murakkablik qo'shadi."
      />

      <Exercise title="Mashq">
        <p>
          <code>TilContext</code> nomli context yarating, standart qiymati{' '}
          <code>"uz"</code> bo'lsin. <code>App</code> komponentida <code>useState</code> orqali{' '}
          <code>til</code> state'ini saqlang (boshlang'ich qiymat <code>"uz"</code>) va{' '}
          <code>TilContext.Provider</code> orqali uni komponent daraxtiga uzating. So'ng ikki
          qavat ichma-ich joylashgan <code>Salomlashish</code> komponentini yozing — u{' '}
          <code>useContext</code> orqali tilni o'qib, <code>til === 'uz'</code> bo'lsa{' '}
          <code>"Salom!"</code>, aks holda <code>"Hello!"</code> chiqarsin. Props orqali
          hech narsa uzatmang — faqat context ishlatilsin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { createContext, useContext, useState } from 'react'

const TilContext = createContext('uz')

function App() {
  const [til, setTil] = useState('uz')

  return (
    <TilContext.Provider value={til}>
      <button onClick={() => setTil(til === 'uz' ? 'en' : 'uz')}>
        Tilni almashtirish
      </button>
      <Sahifa />
    </TilContext.Provider>
  )
}

function Sahifa() {
  return <Blok />
}

function Blok() {
  return <Salomlashish />
}

function Salomlashish() {
  const til = useContext(TilContext)
  return <p>{til === 'uz' ? 'Salom!' : 'Hello!'}</p>
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <strong>Prop drilling</strong> — bir propni o'ziga kerak bo'lmagan ko'plab oraliq
          komponentlar orqali faqat pastga yetkazish uchun uzatib borish; daraxt chuqurlashgani
          sari kod ko'p bo'lib, o'zgartirish qiyinlashadi.
        </li>
        <li>
          Context API bu muammoni hal qiladi: <code>createContext</code> bilan context
          yaratiladi, <code>{'<Context.Provider value={...}>'}</code> orqali komponent
          daraxtining bir qismiga qiymat "o'rnatiladi".
        </li>
        <li>
          Provider ichidagi istalgan komponent — necha qavat chuqur joylashganidan qat'i
          nazar — <code>useContext(Context)</code> orqali qiymatni to'g'ridan-to'g'ri o'qiy
          oladi, oraliq komponentlarni chetlab o'tib.
        </li>
        <li>
          Provider'ning <code>value</code>si o'zgarganda, uni o'qiyotgan barcha komponentlar
          avtomatik qayta render bo'ladi.
        </li>
        <li>
          Context — chindan ham global yoki daraxtning katta qismiga tegishli qiymatlar uchun
          (tema, joriy foydalanuvchi, til). Ikki-uchta yaqin komponent orasida qiymat bo'lishish
          kerak bo'lsa, odatda state'ni yuqoriga ko'tarish (14-dars) soddaroq va afzalroq
          yechim.
        </li>
      </KeyPoints>
    </>
  )
}
