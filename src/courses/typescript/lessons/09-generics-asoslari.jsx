import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Generiklar asoslari',
  section: 'TypeScript asoslari',
}

export default function GenericsAsoslariLesson() {
  return (
    <>
      <p>
        Ko'pincha bir xil mantiqqa ega funksiya turli tipdagi qiymatlar bilan ishlashi kerak
        bo'ladi — masalan, massivdan birinchi elementni olish funksiyasi son massivi bilan
        ham, matn massivi bilan ham ishlashi kerak. Bu darsda shunday holatlar uchun
        mo'ljallangan <strong>generik (generic)</strong> tiplarni ko'rib chiqamiz.
      </p>

      <h2>
        Muammo: <code>any</code> tip xavfsizligini yo'qotadi
      </h2>
      <p>
        Bunday universallikka eng oson yo'l — <code>any</code> ishlatish. Lekin{' '}
        <code>any</code> tip tekshiruvini butunlay o'chirib qo'yadi:
      </p>
      <CodeBlock lang="typescript">{`function birinchiAny(royxat: any[]): any {
  return royxat[0]
}

const son = birinchiAny([1, 2, 3])
const matn = birinchiAny(["a", "b"])

son.toUpperCase() // Xatolik yo'q! Lekin son — number, bu runtime'da chuqib chiqadi`}</CodeBlock>
      <p>
        Bu yerda <code>birinchiAny</code>ning natijasi har doim <code>any</code> — TypeScript
        endi <code>son</code>ning haqiqatda <code>number</code> ekanini "unutadi" va{' '}
        <code>son.toUpperCase()</code> kabi noto'g'ri chaqiruvlarni ushlab qololmaydi.
      </p>

      <h2>Yechim: generik funksiya</h2>
      <p>
        Generik — funksiya chaqirilganda aniqlanadigan "tip parametri". U burchakli qavslar{' '}
        <code>{'<T>'}</code> ichida e'lon qilinadi va funksiya ichida oddiy tip kabi
        ishlatiladi:
      </p>
      <CodeBlock lang="typescript">{`function birinchi<T>(royxat: T[]): T {
  return royxat[0]
}

const son = birinchi([1, 2, 3])       // TS T ni number deb xulosa qiladi
const matn = birinchi(["a", "b", "c"]) // TS T ni string deb xulosa qiladi

son.toFixed(2)      // to'g'ri, TS biladi: son — number
matn.toUpperCase()  // to'g'ri, TS biladi: matn — string
son.toUpperCase()   // Xatolik! number'da toUpperCase yo'q — TS buni ushlaydi`}</CodeBlock>
      <p>
        Muhim joyi shu: <code>T</code>ni har safar qo'lda yozish shart emas — TypeScript uni
        berilgan argumentdan (bu misolda massiv elementlari tipidan) avtomatik xulosa qiladi
        (type inference). Natijada kod <code>any</code> kabi universal, lekin{' '}
        <code>any</code>dan farqli o'laroq, to'liq tip xavfsizligini saqlab qoladi.
      </p>
      <Callout type="tip" title="T — shunchaki nom, kelishuv">
        <code>T</code> — "Type"dan olingan kelishuv, majburiy nom emas. Bitta generik
        parametrli oddiy funksiyalarda odatda <code>T</code> ishlatiladi, bir nechta parametr
        kerak bo'lsa <code>K</code>, <code>V</code> kabi qo'shimcha harflar yoki{' '}
        <code>TItem</code>, <code>TResult</code> kabi tavsifliroq nomlar ham qo'llaniladi.
      </Callout>

      <h2>Generik interfeys va tip</h2>
      <p>
        Generiklar nafaqat funksiyalarda, balki <code>interface</code> va <code>type</code>{' '}
        e'lonlarida ham ishlatiladi — bu turli xil ma'lumot bilan ishlaydigan qayta
        ishlatiladigan tuzilmalar yaratish imkonini beradi:
      </p>
      <CodeBlock lang="typescript">{`interface Quti<T> {
  qiymat: T
}

const sonQutisi: Quti<number> = { qiymat: 42 }
const matnQutisi: Quti<string> = { qiymat: "salom" }`}</CodeBlock>
      <p>
        Siz bu turdagi generik tiplarni allaqachon ishlatgan bo'lishingiz mumkin — JavaScript
        va TypeScript'ning ko'plab quruvchi (built-in) tiplari aynan shunday qurilgan:{' '}
        <code>Array&lt;T&gt;</code> (<code>string[]</code> aslida <code>Array&lt;string&gt;</code>{' '}
        bilan bir xil) va <code>Promise&lt;T&gt;</code> (masalan,{' '}
        <code>Promise&lt;number&gt;</code> — kelajakda <code>number</code> qiymat bilan
        bajariladigan promise):
      </p>
      <CodeBlock lang="typescript">{`const royxat: Array<string> = ["olma", "anor"] // string[] bilan bir xil
const vada: Promise<number> = Promise.resolve(42)`}</CodeBlock>

      <h2>
        Cheklov: <code>extends</code> bilan generikni chegaralash
      </h2>
      <p>
        Ba'zan <code>T</code> mutlaqo har qanday tip bo'lmasligi, balki ma'lum bir shartga mos
        kelishi kerak — masalan, unda <code>length</code> xususiyati bo'lishi shart. Buning
        uchun <code>extends</code> bilan cheklov (constraint) qo'yiladi:
      </p>
      <CodeBlock lang="typescript">{`function uzunlikChop<T extends { length: number }>(qiymat: T): T {
  console.log(qiymat.length)
  return qiymat
}

uzunlikChop("salom")        // to'g'ri — string'da length bor
uzunlikChop([1, 2, 3])      // to'g'ri — massivda length bor
uzunlikChop(42)              // Xatolik! number'da length yo'q`}</CodeBlock>
      <p>
        <code>T extends {'{'} length: number {'}'}</code> "T — istalgan tip bo'lishi mumkin, faqat u{' '}
        <code>length: number</code>ga ega bo'lishi shart" degan ma'noni bildiradi. Bu{' '}
        <code>T</code>ni butunlay erkin qoldirmasdan, bir vaqtning o'zida ham moslashuvchan,
        ham xavfsiz kod yozish imkonini beradi.
      </p>

      <Quiz
        question="function birinchi<T>(royxat: T[]): T funksiyasi birinchi([10, 20, 30]) deb chaqirilsa, TypeScript T ni qanday tip deb xulosa qiladi?"
        options={[
          "any, chunki T hali aniqlanmagan",
          "number, chunki massiv elementlaridan avtomatik xulosa qilinadi",
          "T[], massivning o'zi bilan bir xil",
          "unknown, chunki generiklar avtomatik xulosa qilinmaydi",
        ]}
        correctIndex={1}
        explanation="TypeScript berilgan argumentdan (bu yerda number[] massividan) T ni avtomatik xulosa qiladi (type inference) — bu holda T aynan number bo'ladi, va funksiya natijasi ham number deb hisoblanadi."
      />

      <Exercise title="Mashq">
        <p>
          <code>oxirgi&lt;T&gt;(royxat: T[]): T</code> nomli generik funksiya yozing — u
          berilgan massivning oxirgi elementini qaytarsin. Funksiyani son massivi va matn
          massivi bilan chaqirib, ikkala holatda ham TypeScript tipni to'g'ri xulosa
          qilishini tekshiring.
        </p>
        <Solution>
          <CodeBlock lang="typescript">{`function oxirgi<T>(royxat: T[]): T {
  return royxat[royxat.length - 1]
}

const oxirgiSon = oxirgi([1, 2, 3])          // TS: number
const oxirgiMatn = oxirgi(["a", "b", "c"])   // TS: string

console.log(oxirgiSon.toFixed(0))   // 3
console.log(oxirgiMatn.toUpperCase()) // C`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Generiklar <code>any</code>dan farqli o'laroq, qayta ishlatiladigan kod yozishga
          imkon berib, tip xavfsizligini to'liq saqlab qoladi.
        </li>
        <li>
          Generik parametr (<code>{'<T>'}</code>) funksiya chaqirilganda argumentdan avtomatik
          xulosa qilinadi — uni har doim qo'lda yozish shart emas.
        </li>
        <li>
          Generiklar <code>interface</code>/<code>type</code> e'lonlarida ham ishlatiladi;{' '}
          <code>Array&lt;T&gt;</code> va <code>Promise&lt;T&gt;</code> — tanish generik
          tiplarga misol.
        </li>
        <li>
          <code>T extends ...</code> yordamida generik parametrga cheklov (constraint) qo'yish
          mumkin — bu <code>T</code>ni butunlay erkin qoldirmasdan moslashuvchanlikni
          saqlaydi.
        </li>
      </KeyPoints>
    </>
  )
}
