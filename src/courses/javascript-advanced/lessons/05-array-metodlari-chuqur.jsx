import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Array metodlari chuqur: map, filter, reduce',
  section: "Massivlar va obyektlar: yangi imkoniyatlar",
}

export default function ArrayMetodlariChuqurLesson() {
  return (
    <>
      <p>
        12-13-darslarda massivlar bilan <code>for</code> tsikli orqali ishlashni
        o'rgangan edingiz. 19-darsdagi yakuniy loyihada (vazifalar ro'yxati) esa
        vazifani o'chirishda qo'lda yangi massiv yig'ishga to'g'ri kelgan va u yerda
        "keyingi darslarda <code>.filter()</code> buni bir qatorda qilishini
        o'rganasiz" deb aytilgan edi. O'sha va'da — mana shu darsda. <code>map</code>,{' '}
        <code>filter</code> va <code>reduce</code> — zamonaviy JavaScript va React
        kodining kundalik quroli: ular real loyihalarda <code>for</code>{' '}
        tsiklidan ko'ra ko'proq ishlatiladi.
      </p>

      <h2>map — har bir elementni o'zgartirib, yangi massiv qaytarish</h2>
      <p>
        <code>map</code> — massivning har bir elementini bergan funksiyangizdan
        o'tkazib, natijalardan <strong>yangi massiv</strong> yasaydi. Asl massiv
        o'zgarmaydi:
      </p>
      <CodeBlock lang="javascript">{`const narxlar = [10000, 25000, 8000]

const chegirmali = narxlar.map((narx) => narx * 0.9)

console.log(chegirmali) // [9000, 22500, 7200]
console.log(narxlar)    // [10000, 25000, 8000] — o'zgarmagan`}</CodeBlock>
      <p>
        Solishtiring — <code>for</code> tsikli bilan xuddi shu natijaga erishish
        uchun bo'sh massiv yaratib, <code>push</code> qilib borish kerak edi:
      </p>
      <CodeBlock lang="javascript">{`// Eski usul (for bilan)
const chegirmaliEski = []
for (let i = 0; i < narxlar.length; i++) {
  chegirmaliEski.push(narxlar[i] * 0.9)
}`}</CodeBlock>
      <p>
        <code>map</code> aynan shu naqshni — "har bir element uchun bo'sh massivga
        natija qo'shish" — bitta metodga jamlagan. Real loyihada bu, masalan,
        API'dan (13-darsda o'rganamiz) kelgan ma'lumotlarni DOM'ga chiqarish uchun
        tayyor matnlar massiviga aylantirishda ishlatiladi:
      </p>
      <CodeBlock lang="javascript">{`const foydalanuvchilar = [
  { ism: "Aziz", yosh: 25 },
  { ism: "Malika", yosh: 30 },
]

const ismlar = foydalanuvchilar.map((foydalanuvchi) => foydalanuvchi.ism)
console.log(ismlar) // ["Aziz", "Malika"]`}</CodeBlock>

      <h2>filter — shartga mos elementlarni saralash</h2>
      <p>
        <code>filter</code> — massivdan faqat berilgan shartga (funksiya{' '}
        <code>true</code> qaytargan) mos keladigan elementlarni ajratib, yangi
        massiv qaytaradi:
      </p>
      <CodeBlock lang="javascript">{`const mahsulotlar = [
  { nom: "Noutbuk", narx: 8000000 },
  { nom: "Sichqoncha", narx: 150000 },
  { nom: "Monitor", narx: 2500000 },
]

const arzonlar = mahsulotlar.filter((mahsulot) => mahsulot.narx < 1000000)

console.log(arzonlar) // faqat "Sichqoncha" bo'lgan obyekt`}</CodeBlock>
      <p>
        Aynan shu bilan 19-darsdagi to-do loyihasidagi vazifani o'chirish endi bir
        qatorga sig'adi:
      </p>
      <CodeBlock lang="javascript">{`let vazifalar = [
  { id: 1, matn: "Non sotib olish", bajarildi: false },
  { id: 2, matn: "Kod yozish", bajarildi: true },
]

function vazifaniOchir(id) {
  vazifalar = vazifalar.filter((vazifa) => vazifa.id !== id)
}

vazifaniOchir(1)
console.log(vazifalar) // faqat id: 2 bo'lgan vazifa qoladi`}</CodeBlock>
      <Callout type="tip" title="19-darsdagi qo'lda yozilgan versiya bilan solishtiring">
        Fundamentals kursidagi to-do loyihasida vazifani o'chirish uchun{' '}
        <code>for</code> tsikli bilan yangi massiv qo'lda yig'ilgan edi (har bir
        elementni tekshirib, kerakli bo'lmasa <code>push</code> qilib). Yuqoridagi{' '}
        <code>filter</code> versiyasi aynan shu mantiqni bir qatorda, aniqroq va
        xatoga kamroq moyil qilib bajaradi.
      </Callout>
      <Quiz
        question="[1, 2, 3, 4, 5].filter(son => son % 2 === 0) nima qaytaradi?"
        options={['[1, 3, 5]', '[2, 4]', 'true', '[1, 2, 3, 4, 5]']}
        correctIndex={1}
        explanation="filter faqat funksiya true qaytargan elementlarni saqlaydi. son % 2 === 0 — juft sonlar uchun true, shuning uchun [2, 4] qaytadi."
      />

      <h2>reduce — massivni bitta qiymatga "yig'ish"</h2>
      <p>
        <code>reduce</code> — eng kuchli, lekin dastlab eng qiyin tushuniladigan
        metod. U massivning barcha elementlarini aylanib chiqib,{' '}
        <strong>bitta yakuniy qiymat</strong>ga (son, matn, obyekt — istalgan
        narsaga) "yig'adi":
      </p>
      <CodeBlock lang="javascript">{`const narxlar = [10000, 25000, 8000]

const jamiSumma = narxlar.reduce((jami, narx) => jami + narx, 0)

console.log(jamiSumma) // 43000`}</CodeBlock>
      <p>
        <code>reduce</code>ning ikkita argumenti bor: funksiya va{' '}
        <strong>boshlang'ich qiymat</strong> (yuqorida — <code>0</code>). Funksiya
        har bir elementda ikkita narsa oladi — <code>jami</code> (hozirgacha
        to'plangan natija) va joriy element:
      </p>
      <CodeBlock lang="javascript">{`// reduce ichida nima bo'layotganini "for" bilan ko'rsatsak:
let jami = 0 // boshlang'ich qiymat
for (const narx of narxlar) {
  jami = jami + narx // har safar "jami" yangilanadi
}
console.log(jami) // 43000 — reduce bilan bir xil natija`}</CodeBlock>
      <p>
        <code>reduce</code> faqat yig'indi hisoblash uchun emas — u istalgan
        "massivni bitta narsaga aylantirish" vazifasi uchun ishlatiladi. Masalan,
        savatdagi bajarilgan vazifalar sonini sanash:
      </p>
      <CodeBlock lang="javascript">{`const vazifalar = [
  { matn: "Non", bajarildi: true },
  { matn: "Kod", bajarildi: false },
  { matn: "Sport", bajarildi: true },
]

const bajarilganlarSoni = vazifalar.reduce((son, vazifa) => {
  return vazifa.bajarildi ? son + 1 : son
}, 0)

console.log(bajarilganlarSoni) // 2`}</CodeBlock>
      <Callout type="warning" title="reduce'ning boshlang'ich qiymatini unutmang">
        Ikkinchi argument (boshlang'ich qiymat) berilmasa, <code>reduce</code>{' '}
        massivning birinchi elementini boshlang'ich qiymat sifatida oladi — bu
        ba'zan kutilmagan natijaga olib kelishi mumkin, ayniqsa massiv bo'sh bo'lsa
        xatolik beradi. Har doim boshlang'ich qiymatni aniq yozish — xavfsizroq
        odat.
      </Callout>

      <h2>Zanjirlash (chaining) — real hayotiy misol</h2>
      <p>
        <code>map</code>, <code>filter</code> va <code>reduce</code>ning eng
        kuchli tomoni — ularni <strong>zanjirlab</strong> (bir-biridan keyin
        yozib) ishlatish mumkinligi. Masalan, do'kon sahifasida faqat sotuvdagi
        mahsulotlarning chegirmali narxlari yig'indisini hisoblaymiz:
      </p>
      <CodeBlock lang="javascript">{`const mahsulotlar = [
  { nom: "Noutbuk", narx: 8000000, sotuvda: true },
  { nom: "Sichqoncha", narx: 150000, sotuvda: false },
  { nom: "Monitor", narx: 2500000, sotuvda: true },
]

const jamiChegirmaliNarx = mahsulotlar
  .filter((m) => m.sotuvda)              // faqat sotuvdagilar
  .map((m) => m.narx * 0.8)              // 20% chegirma
  .reduce((jami, narx) => jami + narx, 0) // yig'indi

console.log(jamiChegirmaliNarx) // (8000000 + 2500000) * 0.8 = 8400000`}</CodeBlock>
      <p>
        Har bir metod o'z ishini qiladi va navbatdagisiga natija uzatadi — bu kodni{' '}
        <code>for</code> tsikli bilan yozilgan versiyaga qaraganda ancha o'qish
        oson qiladi: har bir qator "nima qilish kerak"ni to'g'ridan-to'g'ri aytadi.
      </p>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Ismlarni katta harf bilan boshlash">
        <p>
          <code>{'["aziz", "malika", "vali"]'}</code> massividagi har bir ismning
          birinchi harfini katta qilib, yangi massiv yasang — <code>map</code>{' '}
          ishlating.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const ismlar = ["aziz", "malika", "vali"]

const kattaIsmlar = ismlar.map((ism) => ism[0].toUpperCase() + ism.slice(1))

console.log(kattaIsmlar) // ["Aziz", "Malika", "Vali"]`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Faqat bajarilmagan vazifalar">
        <p>
          19-darsdagi to-do loyihasi ma'lumot tuzilishiga o'xshash massiv berilgan:{' '}
          <code>{'[{ matn: "A", bajarildi: true }, { matn: "B", bajarildi: false }]'}</code>
          . <code>filter</code> yordamida faqat bajarilmagan vazifalarni ajrating.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const vazifalar = [
  { matn: "Non sotib olish", bajarildi: false },
  { matn: "Kod yozish", bajarildi: true },
  { matn: "Sport zali", bajarildi: false },
]

const bajarilmaganlar = vazifalar.filter((vazifa) => !vazifa.bajarildi)

console.log(bajarilmaganlar) // "Non sotib olish" va "Sport zali"`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Savat jami summasi">
        <p>
          <code>{'[{ nom: "Kitob", narx: 30000, soni: 2 }, { nom: "Ruchka", narx: 5000, soni: 3 }]'}</code>{' '}
          savat massivi berilgan. <code>reduce</code> yordamida jami summani (har
          bir mahsulot narxi × soni) hisoblang.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const savat = [
  { nom: "Kitob", narx: 30000, soni: 2 },
  { nom: "Ruchka", narx: 5000, soni: 3 },
]

const jamiSumma = savat.reduce((jami, mahsulot) => {
  return jami + mahsulot.narx * mahsulot.soni
}, 0)

console.log(jamiSumma) // 30000*2 + 5000*3 = 75000`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Zanjirlash — talabalar ro'yxati">
        <p>
          <code>{'[{ ism: "Aziz", ball: 85 }, { ism: "Vali", ball: 45 }, { ism: "Malika", ball: 92 }]'}</code>{' '}
          massividan faqat ball 60 dan yuqori bo'lgan talabalarning ismlarini olib,
          vergul bilan qo'shilgan bitta matn hosil qiling (<code>filter</code>,{' '}
          keyin <code>map</code>, keyin <code>join(", ")</code> ishlating).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const talabalar = [
  { ism: "Aziz", ball: 85 },
  { ism: "Vali", ball: 45 },
  { ism: "Malika", ball: 92 },
]

const otganlar = talabalar
  .filter((t) => t.ball > 60)
  .map((t) => t.ism)
  .join(", ")

console.log(otganlar) // "Aziz, Malika"`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="5-vazifa: DOM'ga chiqarish (map + join)">
        <p>
          HTML: <code>{'<ul id="royxat"></ul>'}</code>. <code>{'["Olma", "Nok", "Uzum"]'}</code>{' '}
          massividagi har bir mevani <code>{'<li>Olma</li>'}</code> ko'rinishidagi
          HTML qatoriga aylantirib (<code>map</code> bilan), ularni birlashtirib
          (<code>join("")</code>) <code>royxat.innerHTML</code>ga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const mevalar = ["Olma", "Nok", "Uzum"]
const royxat = document.getElementById("royxat")

royxat.innerHTML = mevalar.map((meva) => \`<li>\${meva}</li>\`).join("")`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>map</code> — har bir elementni o'zgartirib, <strong>bir xil
          uzunlikdagi</strong> yangi massiv qaytaradi; asl massiv o'zgarmaydi.
        </li>
        <li>
          <code>filter</code> — shartga mos elementlarnigina saqlab, yangi (odatda
          qisqaroq) massiv qaytaradi.
        </li>
        <li>
          <code>reduce</code> — massivni bitta yakuniy qiymatga (son, matn,
          obyekt) "yig'adi"; boshlang'ich qiymatni har doim aniq berish tavsiya
          etiladi.
        </li>
        <li>
          Bu uch metodni zanjirlab ishlatish (<code>filter().map().reduce()</code>)
          — ma'lumotni bosqichma-bosqich qayta ishlashning zamonaviy, o'qish oson
          usuli, ko'pincha <code>for</code> tsiklidan ustun.
        </li>
        <li>
          Hech biri asl massivni o'zgartirmaydi — bu real loyihalarda kutilmagan
          yon ta'sirlar (side effects)ning oldini oladi.
        </li>
      </KeyPoints>
    </>
  )
}
