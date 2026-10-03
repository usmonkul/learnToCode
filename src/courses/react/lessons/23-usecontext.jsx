import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import Figure from '@/components/content/Figure'
import contextTree from '@/assets/context-tree.svg'

export const meta = {
  title: "Context: ma'lumotni chuqurga uzatish",
  section: 'State boshqaruvi',
}

export default function UseContextLesson() {
  return (
    <>
      <h2>
        Muammo: <em>prop drilling</em>
      </h2>
      <p>
        20-darsda prop drilling'ni qisqacha ko'rdik. Tasavvur qiling, <code>App</code>{' '}
        komponentida joriy foydalanuvchi ma'lumoti bor, va u
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
        <code>{'<FoydalanuvchiContext value={...}>'}</code> ichiga joylashtirish. Context'ning
        o'zi provider vazifasini bajaradi. Shu provider ichidagi har qanday komponent (necha qavat chuqur bo'lishidan qat'i nazar) shu{' '}
        <code>value</code>ni o'qiy oladi:
      </p>
      <CodeBlock lang="jsx">{`function App() {
  const foydalanuvchi = { ism: 'Malika', avatar: 'malika.jpg' }

  return (
    <FoydalanuvchiContext value={foydalanuvchi}>
      <Sahifa />
    </FoydalanuvchiContext>
  )
}`}</CodeBlock>
      <Callout type="note" title="Eski kodda: .Provider">
        React 19'dan oldin provider <code>{'<FoydalanuvchiContext.Provider value={...}>'}</code>{' '}
        deb yozilardi. Bu yozuv hali ham ishlaydi va internetdagi ko'p misollarda uchraydi —
        ikkalasi bir xil narsa. Yangi kodda qisqa shaklni ishlating.
      </Callout>
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
      <Figure
        src={contextTree}
        alt="App TemaContext provider'i bilan Sahifa, Header, Logo va TemaTugmasi'ni o'raydi; qiymat oraliq Sahifa va Header orqali emas, to'g'ridan-to'g'ri TemaTugmasi'ga yetadi."
        caption="1-rasm: context qiymati oraliq komponentlarni chetlab o'tadi"
      />
      <p>
        <code>useContext</code> daraxtda <strong>yuqoriga</strong> qarab eng yaqin provider'ni
        qidiradi. Agar provider umuman topilmasa, <code>createContext(...)</code>ga berilgan
        standart qiymat qaytadi (bizda — <code>null</code>). Daraxtning bir qismida boshqa
        qiymat kerak bo'lsa, ichkariroqda yana bitta provider qo'yish mumkin — ichidagilar
        eng yaqinini ko'radi.
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
    <TemaContext value={tema}>
      <button onClick={() => setTema(tema === 'yorug' ? 'qorongi' : 'yorug')}>
        Temani almashtirish
      </button>
      <AsosiyKontent />
    </TemaContext>
  )
}

function AsosiyKontent() {
  return <Karta />
}

function Karta() {
  const tema = useContext(TemaContext)
  return (
    <div className={tema === 'qorongi' ? 'karta karta-qorongi' : 'karta'}>
      Karta mazmuni
    </div>
  )
}`}</CodeBlock>
      <p>
        <code>Karta</code> — <code>AsosiyKontent</code>ning bolasi, <code>AsosiyKontent</code>{' '}
        esa hech qanday props qabul qilmaydi. Shunga qaramay, <code>Karta</code>{' '}
        <code>TemaContext</code> provider'ida o'rnatilgan qiymatni to'g'ridan-to'g'ri o'qiy oladi,
        chunki u shu provider'ning ichida joylashgan komponent daraxtining bir qismi.{' '}
        <code>tema</code> o'zgarganda, provider'ning <code>value</code>si yangilanadi
        va uni o'qiyotgan barcha komponentlar (ular qanchalik chuqur joylashgan bo'lmasin)
        avtomatik qayta render bo'ladi.
      </p>

      <h2>Context'dan state'ni o'zgartirish</h2>
      <p>
        Yuqoridagi misolda tugma <code>App</code>ning o'zida edi. Agar tema chuqurdagi
        komponentdan almashtirilishi kerak bo'lsa, context orqali qiymat bilan birga uni
        o'zgartiradigan funksiyani ham uzatish mumkin. Odatda bu uchun context'ni o'z faylida,
        o'z provider komponenti bilan yozish qulay:
      </p>
      <CodeBlock lang="jsx">{`// src/TemaContext.jsx
import { createContext, useContext, useState } from 'react'

const TemaContext = createContext(null)

export function TemaProvider({ children }) {
  const [tema, setTema] = useState('yorug')

  function almashtir() {
    setTema((t) => (t === 'yorug' ? 'qorongi' : 'yorug'))
  }

  return <TemaContext value={{ tema, almashtir }}>{children}</TemaContext>
}

export function useTema() {
  const qiymat = useContext(TemaContext)
  if (qiymat === null) {
    throw new Error('useTema faqat TemaProvider ichida ishlatiladi')
  }
  return qiymat
}`}</CodeBlock>
      <CodeBlock lang="jsx">{`// src/App.jsx
import { TemaProvider } from './TemaContext.jsx'

export default function App() {
  return (
    <TemaProvider>
      <Sahifa />
    </TemaProvider>
  )
}

// chuqurdagi istalgan komponent:
import { useTema } from './TemaContext.jsx'

function TemaTugmasi() {
  const { tema, almashtir } = useTema()
  return <button onClick={almashtir}>{tema === 'yorug' ? '🌙' : '☀️'}</button>
}`}</CodeBlock>
      <ul>
        <li>
          <code>TemaProvider</code> — state va mantiqni o'z ichiga yig'adi; ilova uni{' '}
          <code>children</code> bilan o'raydi (6-dars).
        </li>
        <li>
          <code>useTema</code> — o'zimiz yozgan kichik hook: <code>useContext</code>ni chaqiradi
          va provider unutilgan bo'lsa, tushunarli xato beradi. Bunday funksiyalar{' '}
          <strong>custom hook</strong> deb ataladi — 30-darsda ularni batafsil o'rganamiz.
        </li>
        <li>
          Komponentlar <code>TemaContext</code>ni umuman import qilmaydi — faqat{' '}
          <code>useTema()</code>.
        </li>
      </ul>

      <h2>Reducer + context</h2>
      <p>
        22-darsdagi reducer bilan birlashtirilsa, bu naqsh o'rta hajmdagi ilova uchun to'liq
        state boshqaruvini beradi: reducer — "state qanday o'zgaradi", context — "kim unga
        kira oladi". Ko'pincha state va <code>dispatch</code> ikki alohida context'da
        uzatiladi:
      </p>
      <CodeBlock lang="jsx">{`const VazifalarContext = createContext(null)
const VazifalarDispatchContext = createContext(null)

export function VazifalarProvider({ children }) {
  const [vazifalar, dispatch] = useReducer(vazifalarReducer, BOSHLANGICH)

  return (
    <VazifalarContext value={vazifalar}>
      <VazifalarDispatchContext value={dispatch}>
        {children}
      </VazifalarDispatchContext>
    </VazifalarContext>
  )
}

export function useVazifalar() {
  return useContext(VazifalarContext)
}

export function useVazifalarDispatch() {
  return useContext(VazifalarDispatchContext)
}`}</CodeBlock>
      <p>
        Endi chuqurdagi <code>VazifaQatori</code> <code>onOchirish</code> prop'ini kutmaydi — u
        o'zi <code>{"useVazifalarDispatch()({ type: 'ochirish', id })"}</code> qiladi. Faqat
        o'zgartiradigan (lekin o'qimaydigan) komponentlar dispatch context'ini o'qiydi —{' '}
        <code>dispatch</code> hech qachon o'zgarmaydi. Keyingi darsdagi bozor savatchasi aynan
        shu naqsh asosida quriladi.
      </p>

      <Callout type="warning" title="Context — har doim eng yaxshi yechim emas">
        Context ma'lumotni pastga uzatish uchun juda kuchli vosita, lekin uni har doim
        ishlatavermang. Agar ma'lumot faqat ikkita-uchta yaqin joylashgan komponent orasida
        bo'lishilsa, 20-darsda ko'rgan <strong>state'ni yuqoriga ko'tarish</strong> odatda
        soddaroq va tushunarliroq yechim bo'ladi — propni to'g'ridan-to'g'ri ko'rish osonroq,
        context esa uni qayerdan kelayotganini "yashiradi". Context'ni chindan ham{' '}
        <strong>global</strong> yoki daraxtning katta qismiga tegishli bo'lgan qiymatlar uchun
        saqlang — joriy foydalanuvchi, tanlangan til (locale), tema kabi narsalar uchun. Avval
        props va lifting state up'ni sinab ko'ring, va faqat prop drilling chindan ham muammo
        bo'lib qolganda context'ga o'ting.
      </Callout>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Provider'siz <code>useContext</code>.</strong> Komponent provider'dan tashqarida
            bo'lsa, standart qiymat (masalan <code>null</code>) keladi va{' '}
            <code>null.ism</code> xatosi chiqadi. Custom hook'dagi tekshiruv buni darhol
            ko'rsatadi.
          </li>
          <li>
            <strong>Provider'ni noto'g'ri joyga qo'yish.</strong> <code>useContext</code>{' '}
            yuqoriga qaraydi: provider'ni chaqirgan komponentning <em>o'zi</em> o'qiy olmaydi,
            faqat uning ichidagi (children) komponentlar.
          </li>
          <li>
            <strong>Hamma narsa uchun context.</strong> Ikki-uch qavat props — muammo emas.
            Context ma'lumot qayerdan kelayotganini yashiradi va komponentni qayta ishlatishni
            qiyinlashtiradi.
          </li>
          <li>
            <strong>Context'ni komponent ichida yaratish.</strong>{' '}
            <code>createContext</code> modul darajasida bir marta chaqiriladi; komponent ichida
            bo'lsa, har renderda yangi context bo'ladi va hech narsa ishlamaydi.
          </li>
          <li>
            <strong>Har bir kichik o'zgarish butun daraxtni yangilaydi deb qo'rqish.</strong>{' '}
            Context o'zgarishining o'zi faqat uni o'qiydigan komponentlarni yangilaydi. Lekin
            provider'ni chizgan komponentning state'i o'zgarsa (masalan, <code>setTema</code>{' '}
            <code>App</code>da bo'lsa), 9-darsdagidek uning butun pastki daraxti baribir qayta
            chiziladi — bu odatda muammo emas. Katta ilovalardagi optimallashtirish — keyingi
            kurs mavzusi.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="Katta komponent daraxtida faqat ikkita yonma-yon (sibling) komponent bitta 'tanlangan sana' qiymatini bo'lishishi kerak, boshqa hech qaysi komponentga bu qiymat kerak emas. Qaysi yechim odatda maqsadga eng mos keladi?"
        options={[
          "createContext orqali global context yaratib, butun App'ni Provider bilan o'rash",
          "Qiymatni ikkalasining umumiy ota-komponentida useState bilan saqlab, props orqali ikkalasiga uzatish (state'ni yuqoriga ko'tarish)",
          "Har ikkala komponentda alohida useState yaratib, ularni har o'zgarishda qo'lda sinxronlash",
          "localStorage orqali qiymatni saqlab, har ikkala komponentda uni alohida o'qish",
        ]}
        correctIndex={1}
        explanation="Faqat ikkita yaqin komponent orasida qiymat bo'lishilganda, state'ni ularning umumiy ota-komponentiga ko'tarib, props orqali uzatish odatda eng sodda yechim. Context daraxtning katta qismiga tarqalgan yoki chuqur joylashgan komponentlarga kerak bo'lgan qiymatlar uchun mo'ljallangan — bu yerda esa ortiqcha murakkablik qo'shadi."
      />

      <Quiz
        question="App ichida <TemaContext value='tungi'> bor, uning ichida Panel, Panel ichida esa <TemaContext value='kunduzgi'> va Tugma. Tugma ichidagi useContext(TemaContext) nimani qaytaradi?"
        options={[
          "'kunduzgi' — eng yaqin provider qiymati",
          "'tungi' — eng tashqi provider qiymati",
          "createContext'ga berilgan standart qiymat",
          "Xato: bitta context'ning ikkita provider'i bo'lishi mumkin emas",
        ]}
        correctIndex={0}
        explanation="useContext daraxtda yuqoriga qarab birinchi uchragan — eng yaqin — provider qiymatini oladi. Ichma-ich provider'lar bilan daraxtning bir qismida qiymatni almashtirish mumkin."
      />

      <Exercise title="1-mashq: til konteksti">
        <p>
          <code>TilContext</code> nomli context yarating, standart qiymati{' '}
          <code>"uz"</code> bo'lsin. <code>App</code> komponentida <code>useState</code> orqali{' '}
          <code>til</code> state'ini saqlang (boshlang'ich qiymat <code>"uz"</code>) va{' '}
          <code>TilContext</code> provider'i orqali uni komponent daraxtiga uzating. So'ng ikki
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
    <TilContext value={til}>
      <button onClick={() => setTil(til === 'uz' ? 'en' : 'uz')}>
        Tilni almashtirish
      </button>
      <Sahifa />
    </TilContext>
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

      <Exercise title="2-mashq: kirgan foydalanuvchi">
        <p>
          <code>AuthContext.jsx</code> faylida <code>AuthProvider</code> va{' '}
          <code>useAuth</code> hook'ini yozing. Provider ichida{' '}
          <code>foydalanuvchi</code> state'i (<code>null</code> yoki <code>{'{ ism }'}</code>)
          hamda <code>kirish(ism)</code> va <code>chiqish()</code> funksiyalari bo'lsin. So'ng
          ikkita chuqur komponent yozing: <code>Navbar</code> ichidagi <code>ProfilMenyu</code>{' '}
          (kirgan bo'lsa — "Salom, Aziz" va "Chiqish" tugmasi, bo'lmasa — ism input'i va "Kirish"
          tugmasi) va <code>Sahifa</code> ichidagi <code>Xush</code> (kirgan bo'lsa — "Xush
          kelibsiz, Aziz!", bo'lmasa — "Iltimos, tizimga kiring"). Oraliq komponentlar props
          olmasin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`// src/AuthContext.jsx
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [foydalanuvchi, setFoydalanuvchi] = useState(null)

  function kirish(ism) {
    setFoydalanuvchi({ ism })
  }

  function chiqish() {
    setFoydalanuvchi(null)
  }

  return <AuthContext value={{ foydalanuvchi, kirish, chiqish }}>{children}</AuthContext>
}

export function useAuth() {
  const qiymat = useContext(AuthContext)
  if (qiymat === null) throw new Error('useAuth faqat AuthProvider ichida')
  return qiymat
}`}</CodeBlock>
          <CodeBlock lang="jsx">{`// src/App.jsx
import { useState } from 'react'
import { AuthProvider, useAuth } from './AuthContext.jsx'

function ProfilMenyu() {
  const { foydalanuvchi, kirish, chiqish } = useAuth()
  const [ism, setIsm] = useState('')

  if (foydalanuvchi) {
    return (
      <div>
        Salom, {foydalanuvchi.ism} <button onClick={chiqish}>Chiqish</button>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (ism.trim()) kirish(ism.trim())
      }}
    >
      <input value={ism} onChange={(e) => setIsm(e.target.value)} placeholder="Ism" />
      <button type="submit">Kirish</button>
    </form>
  )
}

function Xush() {
  const { foydalanuvchi } = useAuth()
  return <h1>{foydalanuvchi ? \`Xush kelibsiz, \${foydalanuvchi.ism}!\` : 'Iltimos, tizimga kiring'}</h1>
}

function Navbar() {
  return (
    <nav>
      <ProfilMenyu />
    </nav>
  )
}

function Sahifa() {
  return (
    <main>
      <Xush />
    </main>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Sahifa />
    </AuthProvider>
  )
}`}</CodeBlock>
          <p>
            <code>ProfilMenyu</code>dagi <code>ism</code> input'i — faqat shu komponentga kerak
            bo'lgan mahalliy state, shuning uchun u context'da emas. Global narsa — kim kirgani —
            context'da.
          </p>
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
          yaratiladi, <code>{'<Context value={...}>'}</code> provider'i orqali komponent
          daraxtining bir qismiga qiymat "o'rnatiladi".
        </li>
        <li>
          Provider ichidagi istalgan komponent — necha qavat chuqur joylashganidan qat'i
          nazar — <code>useContext(Context)</code> orqali qiymatni to'g'ridan-to'g'ri o'qiy
          oladi, oraliq komponentlarni chetlab o'tib.
        </li>
        <li>
          State va uni o'zgartiruvchi funksiyalarni o'z provider komponenti va{' '}
          <code>useX()</code> hook'i bilan alohida faylga chiqaring; reducer + context — o'rta
          hajmdagi ilova uchun to'liq yechim.
        </li>
        <li>
          Provider'ning <code>value</code>si o'zgarganda, uni o'qiyotgan barcha komponentlar
          avtomatik qayta render bo'ladi.
        </li>
        <li>
          Context — chindan ham global yoki daraxtning katta qismiga tegishli qiymatlar uchun
          (tema, joriy foydalanuvchi, til). Ikki-uchta yaqin komponent orasida qiymat bo'lishish
          kerak bo'lsa, odatda state'ni yuqoriga ko'tarish (20-dars) soddaroq va afzalroq
          yechim.
        </li>
      </KeyPoints>
    </>
  )
}
