import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Discriminated union'lar",
  section: 'TypeScript asoslari',
}

export default function DiscriminatedUnionsLesson() {
  return (
    <>
      <p>
        Oldingi darsda union tiplarni va narrowing'ni ko'rdik. Endi ularning eng foydali
        qo'llanilishlaridan biriga — <strong>discriminated union</strong> patterniga o'tamiz.
        Bu — zamonaviy TypeScript kodida eng ko'p ishlatiladigan patternlardan biri: turli xil
        "holat"larni (loading, success, error kabi) xavfsiz va aniq tarzda modellashtirish
        usuli.
      </p>

      <h2>Muammo: bog'liq bo'lmagan maydonlar</h2>
      <p>
        Tasavvur qiling, API so'rovi natijasini ifodalash kerak. Yomon yechim — barcha mumkin
        bo'lgan maydonlarni bitta interfeysga optional qilib qo'shish:
      </p>
      <CodeBlock lang="typescript">{`interface ApiNatijaYomon {
  holat: string
  malumot?: string
  xato?: string
}

function korsat(natija: ApiNatijaYomon) {
  if (natija.holat === "success") {
    console.log(natija.malumot.toUpperCase()) // Xatolik! malumot undefined bo'lishi mumkin
  }
}`}</CodeBlock>
      <p>
        Bu yerda TypeScript <code>natija.holat === "success"</code> tekshiruvidan{' '}
        <code>malumot</code>ning albatta mavjudligini xulosa qila olmaydi — chunki{' '}
        <code>holat</code> va <code>malumot</code> orasida hech qanday rasmiy bog'liqlik yo'q,
        ular shunchaki ikkita mustaqil optional maydon.
      </p>

      <h2>Yechim: umumiy "belgi" maydoni orqali variantlarni ajratish</h2>
      <p>
        Discriminated union'da har bir variant — alohida <code>interface</code> yoki{' '}
        <code>type</code> bo'lib, ularning barchasida bir xil nomdagi, lekin har birida
        boshqacha literal qiymatga ega bo'lgan umumiy <strong>"belgi" (discriminant) maydoni</strong>{' '}
        bo'ladi. Bu misolda — <code>status</code>:
      </p>
      <CodeBlock lang="typescript">{`type ApiNatija<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string }`}</CodeBlock>
      <p>
        Endi <code>status</code> qiymatini tekshirish orqali TypeScript qaysi variant
        ekanligini aniq biladi va shu variantga tegishli boshqa maydonlarni ham avtomatik
        toraytiradi:
      </p>
      <CodeBlock lang="typescript">{`function korsat(natija: ApiNatija<string[]>) {
  if (natija.status === "success") {
    console.log(natija.data.length) // TS biladi: bu yerda data — string[], albatta mavjud
  } else if (natija.status === "error") {
    console.log(natija.error.toUpperCase()) // TS biladi: bu yerda error — string, albatta mavjud
  } else {
    console.log("Yuklanmoqda...")
  }
}`}</CodeBlock>
      <Callout type="tip" title="Nega bu foydali?">
        Discriminated union bilan "success holatida <code>data</code> bor, lekin{' '}
        <code>error</code> yo'q" degan qoidani optional maydonlar va izohlarga tayanib emas,
        balki to'g'ridan-to'g'ri tip sistemasi orqali ifodalaymiz. Noto'g'ri kombinatsiya
        (masalan, <code>status: "loading"</code> bilan birga <code>data</code>) kompilyatsiya
        vaqtida xatolik beradi.
      </Callout>

      <h2>
        <code>switch</code> bilan exhaustiveness (to'liq qamrab olish)
      </h2>
      <p>
        Discriminated union'lar <code>switch</code> operatori bilan ayniqsa yaxshi ishlaydi.
        TypeScript har bir <code>case</code> ichida belgi maydoni orqali tipni toraytiradi:
      </p>
      <CodeBlock lang="typescript">{`function xabar(natija: ApiNatija<string[]>): string {
  switch (natija.status) {
    case "loading":
      return "Yuklanmoqda..."
    case "success":
      return \`Keldi: \${natija.data.length} ta element\`
    case "error":
      return \`Xatolik: \${natija.error}\`
  }
}`}</CodeBlock>
      <p>
        Yanada foydalisi — kelajakda union'ga yangi variant qo'shilsa (masalan{' '}
        <code>{'{ status: "idle" }'}</code>), eski <code>switch</code>da uni unutib
        qo'yishning oldini <code>never</code> tipi bilan olish mumkin:
      </p>
      <CodeBlock lang="typescript">{`function xabarXavfsiz(natija: ApiNatija<string[]>): string {
  switch (natija.status) {
    case "loading":
      return "Yuklanmoqda..."
    case "success":
      return \`Keldi: \${natija.data.length} ta element\`
    case "error":
      return \`Xatolik: \${natija.error}\`
    default: {
      const tekshiruv: never = natija // barcha variant qamrab olinmasa, shu qatorda xatolik chiqadi
      return tekshiruv
    }
  }
}`}</CodeBlock>
      <p>
        Agar kimdir <code>ApiNatija</code>ga yangi variant qo'shsa-yu, lekin{' '}
        <code>switch</code>ga mos <code>case</code> qo'shishni unutsa, <code>default</code>{' '}
        blokidagi <code>natija</code> endi <code>never</code>ga mos kelmay qoladi va
        kompilyator darhol xatolik beradi — shunday qilib yangi variantni "unutib qo'yish"
        mumkin emas.
      </p>

      <Callout type="note" title="Bu pattern keyinroq React qismida qayta qaytadi">
        Discriminated union'lar — holatni modellashtirishning (state modeling) eng amaliy
        usullaridan biri: Redux uslubidagi action'lar (<code>{'{ type: "ADD"; payload: ... }'}</code>{' '}
        kabi) va React'ning <code>useReducer</code> hook'i aynan shu patternga tayanadi. Bu
        kursning React qismida ularni qayta ko'rib chiqamiz.
      </Callout>

      <Quiz
        question="Discriminated union'da har bir variantni bir-biridan ajratib turadigan umumiy maydon (masalan, status) qanday deb ataladi?"
        options={[
          "Generic parametr",
          "Discriminant (belgi) maydon",
          "Optional maydon",
          "Index signature",
        ]}
        correctIndex={1}
        explanation="Har bir variantda bir xil nomga, lekin har birida boshqacha literal qiymatga ega bo'lgan umumiy maydon discriminant (belgi) maydon deb ataladi — aynan shu maydon orqali TypeScript qaysi variant ekanligini aniqlaydi."
      />

      <Exercise title="Mashq">
        <p>
          Shakllarni modellashtiruvchi discriminated union yozing:{' '}
          <code>{'{ kind: "doira"; radius: number }'}</code> yoki{' '}
          <code>{'{ kind: "toghri_tortburchak"; kenglik: number; balandlik: number }'}</code>.
          Keyin <code>maydon(shakl: Shakl): number</code> nomli funksiya yozing — u{' '}
          <code>switch</code> orqali har bir variant uchun maydonni (doira uchun{' '}
          <code>Math.PI * radius * radius</code>, to'g'ri to'rtburchak uchun{' '}
          <code>kenglik * balandlik</code>) hisoblab qaytarsin.
        </p>
        <Solution>
          <CodeBlock lang="typescript">{`type Shakl =
  | { kind: "doira"; radius: number }
  | { kind: "toghri_tortburchak"; kenglik: number; balandlik: number }

function maydon(shakl: Shakl): number {
  switch (shakl.kind) {
    case "doira":
      return Math.PI * shakl.radius * shakl.radius
    case "toghri_tortburchak":
      return shakl.kenglik * shakl.balandlik
  }
}

maydon({ kind: "doira", radius: 2 })                              // ~12.57
maydon({ kind: "toghri_tortburchak", kenglik: 3, balandlik: 4 })   // 12`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Discriminated union — har bir variantda bir xil nomli, lekin har birida boshqacha
          literal qiymatga ega "belgi" (discriminant) maydoni bo'lgan union pattern.
        </li>
        <li>
          Belgi maydonini tekshirish (<code>if</code> yoki <code>switch</code> orqali)
          TypeScript'ga variantga tegishli boshqa maydonlarni avtomatik toraytirish imkonini
          beradi.
        </li>
        <li>
          <code>switch</code>dagi <code>default</code> blokda o'zgaruvchini <code>never</code>{' '}
          tipiga tekshirish orqali barcha variantlar qamrab olinganini (exhaustiveness)
          kompilyatsiya vaqtida tekshirish mumkin.
        </li>
        <li>
          Bu pattern API holati, Redux-uslubidagi action'lar va <code>useReducer</code> kabi
          real loyihalarda holat modellashtirish uchun keng qo'llaniladi.
        </li>
      </KeyPoints>
    </>
  )
}
