import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'type vs interface: qachon nimani ishlatish',
  section: 'TypeScript asoslari',
}

export default function TypeVsInterfaceLesson() {
  return (
    <>
      <p>
        Oldingi darsda obyekt shaklini <code>interface</code> orqali belgilashni ko'rdik. Lekin
        TypeScript'da shaklni belgilashning yana bir usuli bor — <code>type</code> alias. Bu
        darsda ikkalasining farqini va amaliyotda qaysi holatda qaysi birini tanlash
        kerakligini ko'rib chiqamiz.
      </p>

      <h2>
        <code>type</code> alias asoslari
      </h2>
      <p>
        <code>type</code> — istalgan tipga (obyekt, union, yoki hatto oddiy primitiv) nom
        berish usuli:
      </p>
      <CodeBlock lang="typescript">{`type Foydalanuvchi = {
  ism: string
  yosh: number
}

const f: Foydalanuvchi = { ism: "Aziz", yosh: 25 }`}</CodeBlock>
      <p>
        Obyekt uchun <code>type</code> va <code>interface</code> deyarli bir xil ko'rinishda
        ishlaydi. Lekin <code>type</code>ning <code>interface</code>da yo'q, muhim
        qobiliyati bor — u <strong>union tip</strong>larni ham ifodalay oladi:
      </p>
      <CodeBlock lang="typescript">{`type Holat = "yuklanmoqda" | "muvaffaqiyatli" | "xato"

let joriyHolat: Holat = "yuklanmoqda"
joriyHolat = "xato"        // OK
joriyHolat = "bekor"       // Xato: Holat faqat uch qiymatdan birini qabul qiladi`}</CodeBlock>
      <p>
        <code>type</code> shuningdek oddiy primitivga ham nom berishi mumkin — bu ayniqsa
        loyihada bir xil ma'noli qiymat bir necha joyda ishlatilganda foydali:
      </p>
      <CodeBlock lang="typescript">{`type ID = string | number

function foydalanuvchiniTop(id: ID) {
  // ...
}`}</CodeBlock>

      <h2>
        <code>interface</code> bilan solishtirish
      </h2>
      <p>
        Ikkala obyekt shaklini kengaytirish mumkin, lekin sintaksisi farqlanadi.{' '}
        <code>interface</code> <code>extends</code> ishlatadi:
      </p>
      <CodeBlock lang="typescript">{`interface Hayvon {
  ism: string
}

interface It extends Hayvon {
  zot: string
}

const it: It = { ism: "Rex", zot: "Nemis cho'poni" }`}</CodeBlock>
      <p>
        <code>type</code> esa shu maqsadda <strong>intersection (&amp;)</strong> operatoridan
        foydalanadi:
      </p>
      <CodeBlock lang="typescript">{`type Hayvon = {
  ism: string
}

type It = Hayvon & {
  zot: string
}

const it: It = { ism: "Rex", zot: "Nemis cho'poni" }`}</CodeBlock>
      <p>
        Yana bir farq — <code>interface</code>ning <strong>declaration merging</strong>{' '}
        (deklaratsiyalarni birlashtirish) degan xususiyati bor: bir xil nomli{' '}
        <code>interface</code>ni bir necha marta e'lon qilsangiz, TypeScript ularni avtomatik
        birlashtirib, bitta interfeys sifatida qaraydi:
      </p>
      <CodeBlock lang="typescript">{`interface Foydalanuvchi {
  ism: string
}

interface Foydalanuvchi {
  yosh: number
}

// Natijada Foydalanuvchi ikkala xususiyatga ham ega bo'ladi
const f: Foydalanuvchi = { ism: "Aziz", yosh: 25 }`}</CodeBlock>
      <p>
        <code>type</code> bilan bir xil nomni ikki marta e'lon qilishga urinish esa
        kompilyatsiya xatosiga olib keladi — <code>type</code> alias qayta e'lon qilinmaydi,
        faqat bitta joyda belgilanadi.
      </p>

      <Callout type="note" title="Declaration merging amalda qachon uchraydi">
        Bu xususiyat ko'proq kutubxona mualliflari uchun foydali — masalan, bir kutubxonaning
        asosiy tipini keyin boshqa modulda kengaytirish uchun. Kundalik ilova kodida buni kam
        ishlatasiz, lekin farqni bilish muhim.
      </Callout>

      <h2>Amaliy qoida: qaysi birini tanlash kerak</h2>
      <p>
        Ikkalasi ham ko'p holatlarda bir-birining o'rnini bosa oladi, va zamonaviy
        loyihalarda quyidagi taxminiy qoida keng qabul qilingan:
      </p>
      <ul>
        <li>
          Oddiy <strong>obyekt shakllari</strong> uchun (masalan, bir obyektning
          xususiyatlarini belgilash) ko'pincha <code>interface</code> afzal ko'riladi —
          ayniqsa u kelajakda kengaytirilishi (<code>extends</code>) mumkin bo'lsa.
        </li>
        <li>
          <strong>Union tiplar</strong>, murakkab kombinatsiyalar yoki primitivlarga nom
          berish uchun <code>type</code> ishlatiladi — buni <code>interface</code> bilan
          umuman ifodalab bo'lmaydi.
        </li>
        <li>
          Aksariyat oddiy holatlarda ikkalasi ham amal qiladi — bunday paytda{' '}
          <strong>loyihadagi izchillik (consistency)</strong> ikkalasini tanlashdan ko'ra
          muhimroq: jamoa qaysi birini tanlagan bo'lsa, o'sha uslubga amal qiling.
        </li>
      </ul>

      <Quiz
        question="Union tip (masalan, uchta belgilangan matn qiymatidan birini bildiruvchi tip) yaratish kerak bo'lsa, qaysi vositadan foydalanish kerak?"
        options={[
          'interface, chunki u har doim type-dan kuchliroq',
          "type, chunki interface union tiplarni ifodalay olmaydi",
          'Ikkalasi ham ishlamaydi, faqat enum kerak',
          "readonly kalit so'zi",
        ]}
        correctIndex={1}
        explanation="interface faqat obyekt shaklini (va uni extends orqali kengaytirishni) ifodalay oladi. Union tip kabi kombinatsiyalarni faqat type alias orqali yaratish mumkin."
      />

      <Exercise title="Mashq">
        <p>
          <code>Buyurtma</code> nomli obyekt shaklini <code>type</code> yordamida yarating:{' '}
          <code>mahsulot: string</code> va <code>narx: number</code> xususiyatlariga ega
          bo'lsin. Shundan so'ng, <code>BuyurtmaHolati</code> nomli union tip yarating — u
          faqat <code>"kutilmoqda"</code>, <code>"jonatildi"</code> yoki{' '}
          <code>"yetkazildi"</code> qiymatlaridan birini qabul qilsin.
        </p>
        <Solution>
          <CodeBlock lang="typescript">{`type Buyurtma = {
  mahsulot: string
  narx: number
}

type BuyurtmaHolati = "kutilmoqda" | "jonatildi" | "yetkazildi"

const buyurtma: Buyurtma = { mahsulot: "Noutbuk", narx: 8000000 }
const holat: BuyurtmaHolati = "jonatildi"`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>type</code> obyekt, union va primitiv tiplarga nom bera oladi;{' '}
          <code>interface</code> faqat obyekt shaklini belgilaydi.
        </li>
        <li>
          Kengaytirish <code>interface</code>da <code>extends</code> orqali,{' '}
          <code>type</code>da intersection (<code>&amp;</code>) orqali bajariladi.
        </li>
        <li>
          <code>interface</code>ning declaration merging xususiyati bor — bir xil nomli
          interfeyslar avtomatik birlashadi; <code>type</code>da bu mumkin emas.
        </li>
        <li>
          Amaliy qoida: obyekt shakllari uchun ko'pincha <code>interface</code>,
          union/murakkab kombinatsiyalar uchun <code>type</code> — lekin loyihadagi
          izchillik ikkalasidan ham muhimroq.
        </li>
      </KeyPoints>
    </>
  )
}
