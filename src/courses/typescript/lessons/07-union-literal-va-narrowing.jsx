import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Union, literal tiplar va narrowing',
  section: 'TypeScript asoslari',
}

export default function UnionLiteralNarrowingLesson() {
  return (
    <>
      <p>
        Haqiqiy kodda bir o'zgaruvchi ba'zan bir nechta turli tipdagi qiymatlardan birini
        qabul qilishi mumkin — masalan, funksiyaga son ham, matn ham berilishi mumkin bo'lgan
        holatlar. Bu darsda shuni ifodalash uchun <strong>union tip</strong>larni, aniq
        qiymatlarni tip sifatida ishlatuvchi <strong>literal tip</strong>larni va TypeScript'ning
        kod oqimi ichida tipni avtomatik toraytiradigan{' '}
        <strong>narrowing (toraytirish)</strong> mexanizmini ko'rib chiqamiz.
      </p>

      <h2>Union tiplar: "bu yoki u"</h2>
      <p>
        Union tip <code>|</code> belgisi bilan yoziladi va "bu tiplardan biri" degan ma'noni
        bildiradi. Masalan, funksiya parametri son ham, matn ham bo'lishi mumkin:
      </p>
      <CodeBlock lang="typescript">{`function idNiChop(id: string | number) {
  console.log("ID:", id)
}

idNiChop(101)      // to'g'ri
idNiChop("A-101")  // to'g'ri
idNiChop(true)     // xato: boolean union'ga kirmaydi`}</CodeBlock>
      <p>
        Union tipdagi qiymat bilan ishlashda TypeScript faqat <strong>ikkala</strong> tipda
        ham mavjud bo'lgan metod va xususiyatlarga ruxsat beradi — chunki qiymat runtime'da
        qaysi biri ekanligi hali noma'lum:
      </p>
      <CodeBlock lang="typescript">{`function uzunlikMi(qiymat: string | number) {
  return qiymat.toFixed(2) // Xatolik! toFixed faqat number'da bor, string'da yo'q
}`}</CodeBlock>

      <h2>Literal tiplar: aniq qiymat — tip sifatida</h2>
      <p>
        Literal tip — bu bitta aniq qiymatning o'zi tip sifatida ishlatilishi. Masalan,{' '}
        <code>"success"</code> degan satr shunchaki <code>string</code> emas, balki aynan shu
        matnning o'zi bo'lgan tor tip bo'lishi mumkin:
      </p>
      <CodeBlock lang="typescript">{`let holat: "success" = "success"
holat = "error" // Xatolik! faqat "success" qiymati ruxsat etilgan`}</CodeBlock>
      <p>
        Literal tiplar ko'pincha union bilan birga ishlatilib, "faqat shu bir nechta qiymatdan
        biri" degan cheklovni ifodalaydi — bu erkin <code>string</code>dan ancha xavfsizroq:
      </p>
      <CodeBlock lang="typescript">{`type Holat = "success" | "error" | "loading"

function xabarKorsat(holat: Holat) {
  console.log(holat)
}

xabarKorsat("success") // to'g'ri
xabarKorsat("noaniq")  // Xatolik! Holat union'iga kirmaydi`}</CodeBlock>
      <Callout type="tip" title="Nega erkin string emas, literal union?">
        Agar parametr oddiy <code>string</code> bo'lganida, <code>"noaniq"</code> yoki xato
        yozilgan <code>"sucess"</code> ham to'g'ri deb qabul qilinardi — xatolik faqat runtime'da
        bilinardi. Literal union esa noto'g'ri qiymatni yozish kompilyatsiya paytida, kod hali
        ishga tushmasdan turib aniqlanishini ta'minlaydi.
      </Callout>

      <h2>Narrowing: kod bo'limida tip avtomatik toraytiriladi</h2>
      <p>
        Union tipdagi qiymat bilan xavfsiz ishlash uchun TypeScript'ga qiymat aslida qaysi
        tip ekanini "isbotlab berish" kerak — buni <strong>narrowing (toraytirish)</strong> deb
        atashadi. TypeScript kodning ma'lum bir bo'limida qiymat qaysi tip ekanini bilib,
        o'sha bo'lim ichida tipni avtomatik toraytiradi (bunga control-flow analysis deyiladi).
        Eng ko'p ishlatiladigan usul — <code>typeof</code> tekshiruvi:
      </p>
      <CodeBlock lang="typescript">{`function formatla(qiymat: string | number) {
  if (typeof qiymat === "string") {
    return qiymat.toUpperCase() // bu yerda TS qiymatni faqat string deb biladi
  }
  return qiymat.toFixed(2) // bu yerda TS qiymatni faqat number deb biladi
}`}</CodeBlock>
      <p>
        Obyektlar bilan ishlaganda <code>instanceof</code> operatoridan foydalaniladi —
        qiymat qaysi klassning nusxasi ekanini tekshiradi:
      </p>
      <CodeBlock lang="typescript">{`function sanaKorsat(qiymat: Date | string) {
  if (qiymat instanceof Date) {
    return qiymat.toISOString() // bu yerda qiymat — Date
  }
  return new Date(qiymat).toISOString() // bu yerda qiymat — string
}`}</CodeBlock>
      <p>
        Ikki xil obyekt tipi orasida ajratish uchun esa <code>in</code> operatoridan
        foydalanish qulay — bu obyektda ma'lum bir xususiyat mavjudligini tekshiradi:
      </p>
      <CodeBlock lang="typescript">{`interface Mushuk {
  miyovlash: () => void
}

interface It {
  hurish: () => void
}

function ovozChiqar(hayvon: Mushuk | It) {
  if ("miyovlash" in hayvon) {
    hayvon.miyovlash() // bu yerda hayvon — Mushuk
  } else {
    hayvon.hurish() // bu yerda hayvon — It
  }
}`}</CodeBlock>
      <p>
        Oddiy <strong>truthiness tekshiruvi</strong> ham narrowing hisoblanadi — masalan,{' '}
        <code>null</code> yoki <code>undefined</code> bo'lishi mumkin bo'lgan qiymatni
        ishlatishdan oldin tekshirish:
      </p>
      <CodeBlock lang="typescript">{`function ismniChop(ism: string | null) {
  if (ism) {
    console.log(ism.toUpperCase()) // bu yerda ism — faqat string, null emas
  } else {
    console.log("Ism berilmagan")
  }
}`}</CodeBlock>
      <Callout type="note" title="Narrowing — faqat shu bo'lim ichida amal qiladi">
        Toraytirilgan tip faqat <code>if</code>, <code>else</code> yoki shunga o'xshash blok
        ichida amal qiladi. Blokdan tashqarida qiymat yana o'zining asl union tipiga qaytadi —
        chunki TypeScript kodni statik tahlil qiladi, u har bir qatordagi mumkin bo'lgan
        holatni kuzatib boradi, xolos.
      </Callout>

      <Quiz
        question="Quyidagi funksiya ichida if (typeof qiymat === 'string') blokidan keyin, TypeScript qiymat o'zgaruvchisini qanday tip deb biladi?"
        options={[
          "Hali ham string | number, chunki tip e'lon qilinganda shunday yozilgan",
          "Faqat string, chunki TS shu blok ichida tipni avtomatik toraytiradi",
          "any, chunki typeof tekshiruvi tipni yo'qotadi",
          "Xatolik chiqadi, typeof union tip bilan ishlamaydi",
        ]}
        correctIndex={1}
        explanation="TypeScript control-flow analysis orqali typeof qiymat === 'string' tekshiruvidan keyingi blok ichida qiymatni faqat string deb toraytiradi (narrowing). Bu faqat o'sha blok doirasida amal qiladi."
      />

      <Exercise title="Mashq">
        <p>
          <code>masofaniChop(masofa: number | string)</code> nomli funksiya yozing. Agar{' '}
          <code>masofa</code> — <code>number</code> bo'lsa, uni "km" birligi bilan birga (masalan,{' '}
          <code>12 km</code>) chop eting. Agar <code>string</code> bo'lsa, uni o'zgarishsiz chop
          eting. Narrowing uchun <code>typeof</code> tekshiruvidan foydalaning.
        </p>
        <Solution>
          <CodeBlock lang="typescript">{`function masofaniChop(masofa: number | string) {
  if (typeof masofa === "number") {
    console.log(\`\${masofa} km\`)
  } else {
    console.log(masofa)
  }
}

masofaniChop(12)        // 12 km
masofaniChop("noma'lum") // noma'lum`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Union tip (<code>A | B</code>) qiymat bir nechta tipdan biri bo'lishi mumkinligini
          bildiradi; union ichida faqat barcha variantlarga umumiy bo'lgan amallar ruxsat
          etiladi.
        </li>
        <li>
          Literal tip aniq bir qiymatning o'zini tip sifatida ishlatadi; literal union (masalan{' '}
          <code>"success" | "error"</code>) erkin <code>string</code>dan ancha xavfsizroq.
        </li>
        <li>
          Narrowing — TypeScript'ning kod oqimini tahlil qilib, <code>if</code> kabi bloklar
          ichida union'ni torroq tipga qisqartirishi (control-flow analysis).
        </li>
        <li>
          Narrowing uchun eng ko'p ishlatiladigan usullar: <code>typeof</code> (primitivlar
          uchun), <code>instanceof</code> (klass nusxalari uchun), <code>in</code> (obyekt
          xususiyati mavjudligini tekshirish uchun) va oddiy truthiness tekshiruvi.
        </li>
      </KeyPoints>
    </>
  )
}
