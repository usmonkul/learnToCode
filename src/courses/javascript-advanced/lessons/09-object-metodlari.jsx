import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Object.keys, values, entries va obyektlarni klonlash',
  section: "Massivlar va obyektlar: yangi imkoniyatlar",
}

export default function ObjectMetodlariLesson() {
  return (
    <>
      <p>
        14-darsda oddiy obyektlar bilan ishlashni, <code>for...in</code>ni esa
        15-darsda ko'rgan bo'lishingiz mumkin. Bu darsda obyektni{' '}
        <strong>massiv metodlari bilan</strong> (5-6-darslarda o'rgangan{' '}
        <code>map</code>/<code>filter</code>) qayta ishlash imkonini beruvchi
        uchta metodni — <code>Object.keys</code>, <code>Object.values</code>,{' '}
        <code>Object.entries</code> — hamda obyektni xavfsiz nusxalash usullarini
        ko'ramiz.
      </p>

      <h2>Object.keys — barcha kalitlar (nomlar) ro'yxati</h2>
      <p><code>Object.keys(obyekt)</code> — obyektning barcha xususiyat nomlarini massiv qilib qaytaradi:</p>
      <CodeBlock lang="javascript">{`const narxlar = {
  noutbuk: 8000000,
  sichqoncha: 150000,
  klaviatura: 300000,
}

console.log(Object.keys(narxlar)) // ["noutbuk", "sichqoncha", "klaviatura"]`}</CodeBlock>
      <p>
        Bu massiv bo'lgani uchun endi unga barcha massiv metodlarini —{' '}
        <code>map</code>, <code>filter</code>, <code>length</code> — qo'llash
        mumkin:
      </p>
      <CodeBlock lang="javascript">{`console.log(Object.keys(narxlar).length) // 3 — nechta mahsulot borligini bilish uchun`}</CodeBlock>

      <h2>Object.values — barcha qiymatlar ro'yxati</h2>
      <p><code>Object.values(obyekt)</code> — faqat qiymatlarni massiv qilib qaytaradi (kalitlarsiz):</p>
      <CodeBlock lang="javascript">{`console.log(Object.values(narxlar)) // [8000000, 150000, 300000]

const jamiNarx = Object.values(narxlar).reduce((jami, narx) => jami + narx, 0)
console.log(jamiNarx) // 8450000 — 5-darsda o'rgangan reduce bilan birga ishlatilmoqda`}</CodeBlock>

      <h2>Object.entries — kalit va qiymat juftliklari</h2>
      <p>
        <code>Object.entries(obyekt)</code> — har bir xususiyatni{' '}
        <code>[kalit, qiymat]</code> juftligi ko'rinishidagi massiv qilib
        qaytaradi. Bu obyektni to'liq aylanib chiqish uchun eng foydali metod:
      </p>
      <CodeBlock lang="javascript">{`console.log(Object.entries(narxlar))
// [["noutbuk", 8000000], ["sichqoncha", 150000], ["klaviatura", 300000]]`}</CodeBlock>
      <p>
        Destructuring bilan birga ishlatilganda, obyektni DOM'ga chiqarish juda
        qulay bo'ladi:
      </p>
      <CodeBlock lang="javascript">{`const royxat = document.getElementById("narxlarRoyxati")

royxat.innerHTML = Object.entries(narxlar)
  .map(([nom, narx]) => \`<li>\${nom}: \${narx} so'm</li>\`)
  .join("")`}</CodeBlock>
      <Callout type="tip" title="for...in bilan solishtiring">
        15-darsda <code>for...in</code> tsikli orqali obyektni aylanib
        chiqishni ko'rgan bo'lsangiz — <code>Object.entries</code> +{' '}
        <code>forEach</code>/<code>map</code> shu vazifani zamonaviyroq,
        massiv metodlari zanjiriga qo'shish mumkin bo'lgan usulda bajaradi.
        Ikkalasi ham to'g'ri, lekin real loyihalarda <code>Object.entries</code>{' '}
        ko'proq ishlatiladi.
      </Callout>
      <Quiz
        question="Object.entries({ a: 1, b: 2 }) nima qaytaradi?"
        options={['{ a: 1, b: 2 }', '["a", "b"]', '[1, 2]', '[["a", 1], ["b", 2]]']}
        correctIndex={3}
        explanation="Object.entries har bir xususiyatni [kalit, qiymat] juftligiga aylantirib, ularning massivini qaytaradi."
      />

      <h2>Obyektni klonlash (nusxalash)</h2>
      <p>
        7-darsda spread operatori bilan obyektning yuzaki (shallow) nusxasini
        olishni ko'rgan edingiz. Bu odatda yetarli, lekin muhim bir cheklovi bor —
        agar obyekt ichida <strong>boshqa obyekt</strong> bo'lsa, ichkisi
        nusxalanmaydi:
      </p>
      <CodeBlock lang="javascript">{`const foydalanuvchi = {
  ism: "Aziz",
  manzil: { shahar: "Toshkent" },
}

const nusxa = { ...foydalanuvchi }

nusxa.manzil.shahar = "Samarqand"

console.log(foydalanuvchi.manzil.shahar) // "Samarqand" — asl obyekt ham o'zgardi!`}</CodeBlock>
      <Callout type="warning" title="Shallow copy — faqat birinchi qavat nusxalanadi">
        Spread (va <code>Object.assign</code>) faqat obyektning{' '}
        <strong>birinchi darajadagi</strong> xususiyatlarini nusxalaydi. Ichma-ich
        obyekt/massiv bo'lsa, ular hali ham <strong>bitta xotiradagi
        manzilga</strong> ishora qiladi — ikkala o'zgaruvchi ham bir xil ichki
        obyektni "ko'radi".
      </Callout>
      <p>
        To'liq (deep) nusxa kerak bo'lsa — zamonaviy brauzerlarda{' '}
        <code>structuredClone</code> global funksiyasi ishlatiladi:
      </p>
      <CodeBlock lang="javascript">{`const foydalanuvchi = {
  ism: "Aziz",
  manzil: { shahar: "Toshkent" },
}

const chuqurNusxa = structuredClone(foydalanuvchi)

chuqurNusxa.manzil.shahar = "Samarqand"

console.log(foydalanuvchi.manzil.shahar)  // "Toshkent" — asl obyekt saqlanib qoldi
console.log(chuqurNusxa.manzil.shahar)    // "Samarqand"`}</CodeBlock>
      <p>
        Amaliy qoida: agar obyektingiz "tekis" bo'lsa (ichida boshqa
        obyekt/massiv yo'q), spread yetarli va tezroq. Agar ichma-ich tuzilma
        bo'lsa va uni mustaqil o'zgartirish kerak bo'lsa —{' '}
        <code>structuredClone</code>ni ishlating.
      </p>

      <h2>Amaliy misol: mahsulotlar ro'yxatini obyektdan chiqarish</h2>
      <p>
        Ba'zan ma'lumot massiv emas, obyekt ko'rinishida keladi (masalan, ID
        bo'yicha tashkil qilingan). Uni DOM'ga chiqarish uchun avval massivga
        aylantirish kerak:
      </p>
      <CodeBlock lang="javascript">{`const ombor = {
  "p1": { nom: "Noutbuk", soni: 5 },
  "p2": { nom: "Sichqoncha", soni: 20 },
  "p3": { nom: "Klaviatura", soni: 0 },
}

const omborDagilar = Object.entries(ombor)
  .filter(([id, mahsulot]) => mahsulot.soni > 0) // faqat omborda bori
  .map(([id, mahsulot]) => \`\${mahsulot.nom}: \${mahsulot.soni} dona\`)

console.log(omborDagilar) // ["Noutbuk: 5 dona", "Sichqoncha: 20 dona"]`}</CodeBlock>
      <p>
        Bu misol — <code>Object.entries</code>, destructuring, <code>filter</code>{' '}
        va <code>map</code>ni bitta zanjirda birlashtirib, obyekt ko'rinishidagi
        ma'lumotni ham massiv kabi qulay qayta ishlash mumkinligini ko'rsatadi.
      </p>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Xususiyatlar sonini sanash">
        <p>
          <code>{'{ ism: "Vali", yosh: 22, shahar: "Andijon", telefon: "998901234567" }'}</code>{' '}
          obyektida nechta xususiyat borligini <code>Object.keys</code>{' '}
          yordamida aniqlang.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const foydalanuvchi = { ism: "Vali", yosh: 22, shahar: "Andijon", telefon: "998901234567" }

console.log(Object.keys(foydalanuvchi).length) // 4`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Eng qimmat mahsulotni topish">
        <p>
          <code>{'{ noutbuk: 8000000, sichqoncha: 150000, monitor: 2500000 }'}</code>{' '}
          obyektidan <code>Object.values</code> va <code>Math.max</code>{' '}
          yordamida eng katta narxni toping.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const narxlar = { noutbuk: 8000000, sichqoncha: 150000, monitor: 2500000 }

const engKattaNarx = Math.max(...Object.values(narxlar))
console.log(engKattaNarx) // 8000000`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Obyektni HTML ro'yxatiga aylantirish">
        <p>
          HTML: <code>{'<ul id="malumotlar"></ul>'}</code>.{' '}
          <code>{'{ ism: "Malika", yosh: 28 }'}</code> obyektini{' '}
          <code>Object.entries</code> va <code>map</code> yordamida{' '}
          <code>{'<li>ism: Malika</li>'}</code> ko'rinishidagi qatorlarga
          aylantirib, <code>malumotlar.innerHTML</code>ga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const foydalanuvchi = { ism: "Malika", yosh: 28 }
const malumotlar = document.getElementById("malumotlar")

malumotlar.innerHTML = Object.entries(foydalanuvchi)
  .map(([kalit, qiymat]) => \`<li>\${kalit}: \${qiymat}</li>\`)
  .join("")`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Chuqur nusxalash sinovi">
        <p>
          <code>{'{ sozlamalar: { til: "uz" } }'}</code> obyektidan avval spread
          bilan, keyin <code>structuredClone</code> bilan nusxa oling. Har ikkala
          nusxadagi <code>sozlamalar.til</code>ni o'zgartirib, asl obyekt qanday
          holatlarda o'zgarishini kuzating.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const asl = { sozlamalar: { til: "uz" } }

const yuzakiNusxa = { ...asl }
yuzakiNusxa.sozlamalar.til = "ru"
console.log(asl.sozlamalar.til) // "ru" — asl ham o'zgardi (shallow copy)

const asl2 = { sozlamalar: { til: "uz" } }
const chuqurNusxa = structuredClone(asl2)
chuqurNusxa.sozlamalar.til = "en"
console.log(asl2.sozlamalar.til) // "uz" — asl saqlanib qoldi (deep copy)`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>Object.keys</code> — kalitlar massivi, <code>Object.values</code>{' '}
          — qiymatlar massivi, <code>Object.entries</code> —{' '}
          <code>[kalit, qiymat]</code> juftliklari massivi qaytaradi.
        </li>
        <li>
          Bu uch metod obyektni massiv metodlariga (<code>map</code>,{' '}
          <code>filter</code>, <code>reduce</code>) "ochib beradi" — obyekt
          ustida ham zamonaviy zanjirlab qayta ishlashni mumkin qiladi.
        </li>
        <li>
          Spread orqali nusxalash — <strong>shallow copy</strong>: faqat
          birinchi daraja nusxalanadi, ichma-ich obyekt/massiv hali ham asl bilan
          umumiy bo'lib qoladi.
        </li>
        <li>
          <code>structuredClone</code> — <strong>deep copy</strong> beradi,
          ichma-ich tuzilmalarni ham to'liq mustaqil nusxalaydi.
        </li>
      </KeyPoints>
    </>
  )
}
