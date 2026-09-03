import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'async/await',
  section: 'Asinxron JavaScript',
}

export default function AsyncAwaitLesson() {
  return (
    <>
      <p>
        O'tgan darsda Promise zanjiri callback hell muammosini yechganini
        ko'rdik. <code>async</code>/<code>await</code> — Promise ustiga
        qurilgan, uni <strong>yanada oddiy, sinxron kodga o'xshab</strong>{' '}
        yozish imkonini beruvchi sintaksis. Bugungi kunda amaliyotda{' '}
        <code>.then()</code> zanjiridan ko'ra <code>async</code>/
        <code>await</code> ko'proq ishlatiladi — u ayniqsa keyingi darsdagi{' '}
        <code>fetch</code> bilan birga eng ko'p uchraydigan uslub.
      </p>

      <h2>async funksiya — nima uchun kerak?</h2>
      <p>
        Funksiya oldiga <code>async</code> kalit so'zi qo'yilsa, u funksiya
        avtomatik ravishda <strong>Promise qaytaradigan</strong> funksiyaga
        aylanadi:
      </p>
      <CodeBlock lang="javascript">{`async function salomlash() {
  return "Salom!"
}

salomlash().then((natija) => console.log(natija)) // "Salom!"

console.log(salomlash()) // Promise {<fulfilled>: 'Salom!'} — oddiy qiymat emas, Promise`}</CodeBlock>
      <p>
        <code>async</code> funksiya ichida esa <code>await</code> kalit so'zini
        ishlatish mumkin bo'ladi — u Promise <strong>bajarilishini kutib</strong>
        , to'g'ridan-to'g'ri natijani qaytaradi:
      </p>
      <CodeBlock lang="javascript">{`function foydalanuvchiniOl(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, ism: "Aziz" }), 1000)
  })
}

async function ishGaTushir() {
  console.log("So'rov yuborilmoqda...")
  const foydalanuvchi = await foydalanuvchiniOl(1) // Promise bajarilishini kutadi
  console.log("Foydalanuvchi:", foydalanuvchi)      // natija tayyor bo'lgach ishlaydi
}

ishGaTushir()`}</CodeBlock>
      <Callout type="note" title="await faqat async funksiya ichida ishlaydi">
        <code>await</code>ni oddiy funksiya ichida yoki faylning eng
        yuqorisida (ba'zi zamonaviy modul tizimlaridan tashqari) ishlatib
        bo'lmaydi — u faqat <code>async</code> deb belgilangan funksiya ichida
        ruxsat etiladi.
      </Callout>

      <h2>Promise zanjirini async/await bilan solishtirish</h2>
      <p>
        O'tgan darsdagi foydalanuvchi → buyurtmalar → tafsilot zanjirini endi{' '}
        <code>async</code>/<code>await</code> bilan yozamiz — natija xuddi
        oddiy, ketma-ket sinxron kod kabi o'qiladi:
      </p>
      <CodeBlock lang="javascript">{`// Promise zanjiri bilan (o'tgan darsdan):
foydalanuvchiniOl(userId)
  .then((foydalanuvchi) => buyurtmalarniOl(foydalanuvchi.id))
  .then((buyurtmalar) => buyurtmaTafsilotiniOl(buyurtmalar[0].id))
  .then((tafsilot) => console.log(tafsilot))
  .catch((xato) => console.log(xato))

// async/await bilan — xuddi sinxron kod kabi o'qiladi:
async function tafsilotniOlish(userId) {
  try {
    const foydalanuvchi = await foydalanuvchiniOl(userId)
    const buyurtmalar = await buyurtmalarniOl(foydalanuvchi.id)
    const tafsilot = await buyurtmaTafsilotiniOl(buyurtmalar[0].id)
    console.log(tafsilot)
  } catch (xato) {
    console.log(xato)
  }
}`}</CodeBlock>
      <p>
        Ikkalasi ham bir xil natijaga olib keladi, lekin{' '}
        <code>async</code>/<code>await</code> versiyasi — har bir qadam alohida{' '}
        <code>const</code>ga saqlanadigan, yuqoridan pastga o'qiladigan oddiy
        kod ko'rinishida. Xatoliklarni boshqarish uchun{' '}
        <code>.catch()</code> o'rniga oddiy <code>try</code>/<code>catch</code>{' '}
        bloki ishlatiladi — buni keyingi darsda chuqurroq ko'ramiz.
      </p>
      <Quiz
        question="async funksiya nimani qaytaradi?"
        options={[
          "To'g'ridan-to'g'ri oddiy qiymatni",
          "Har doim Promise'ni (hatto oddiy qiymat return qilinsa ham)",
          "undefined",
          "Callback funksiyani",
        ]}
        correctIndex={1}
        explanation="async funksiya har doim Promise qaytaradi — funksiya ichida oddiy qiymat return qilinsa ham, u avtomatik ravishda o'sha qiymat bilan bajarilgan Promise'ga o'raladi."
      />

      <h2>Ketma-ket vs parallel await</h2>
      <p>
        Agar ikkita <code>await</code> bir-biriga bog'liq bo'lmasa, ularni
        ketma-ket yozish vaqtni behuda sarflaydi:
      </p>
      <CodeBlock lang="javascript">{`// Sekin — ikkalasi ketma-ket kutiladi (jami ~2 soniya):
async function ikkalasiniOlSekin() {
  const foydalanuvchi = await foydalanuvchiniOl(1) // 1 soniya kutadi
  const mahsulotlar = await mahsulotlarniOl()       // yana 1 soniya kutadi
  return { foydalanuvchi, mahsulotlar }
}`}</CodeBlock>
      <p>
        Bunday holatda 11-darsda o'rgangan <code>Promise.all</code>ni{' '}
        <code>await</code> bilan birga ishlatib, ikkalasini bir vaqtda
        boshlash kerak:
      </p>
      <CodeBlock lang="javascript">{`// Tez — ikkalasi bir vaqtda boshlanadi (jami ~1 soniya):
async function ikkalasiniOlTez() {
  const [foydalanuvchi, mahsulotlar] = await Promise.all([
    foydalanuvchiniOl(1),
    mahsulotlarniOl(),
  ])
  return { foydalanuvchi, mahsulotlar }
}`}</CodeBlock>
      <Callout type="warning" title="Amaliy qoida: faqat kerak bo'lganda ketma-ket kuting">
        <code>await</code>ni faqat keyingi qadam <strong>oldingisining
        natijasiga bog'liq</strong> bo'lganda ketma-ket yozing (masalan,
        foydalanuvchini olib, keyin uning ID'si bilan buyurtmalarni so'rash).
        Bog'liq bo'lmagan so'rovlarni <code>Promise.all</code> bilan parallel
        boshlash — real loyihalarda sahifa yuklanish tezligiga sezilarli
        ta'sir qiladi.
      </Callout>

      <h2>Real hayotiy misol: tugma bosilganda ma'lumot yuklash</h2>
      <p>
        DOM bilan birgalikda — bu naqsh keyingi darslarda tez-tez ishlatiladi:
        tugma bosilganda <code>async</code> funksiyani chaqirib, natijani DOM'ga
        chiqarish:
      </p>
      <CodeBlock lang="javascript">{`const tugma = document.getElementById("yuklashTugmasi")
const natijaElement = document.getElementById("natija")

tugma.addEventListener("click", async () => {
  natijaElement.textContent = "Yuklanmoqda..."

  try {
    const foydalanuvchi = await foydalanuvchiniOl(1)
    natijaElement.textContent = foydalanuvchi.ism
  } catch (xato) {
    natijaElement.textContent = "Xatolik yuz berdi"
  }
})`}</CodeBlock>
      <Callout type="tip" title="addEventListener ichida ham async ishlatish mumkin">
        Arrow funksiya oldiga <code>async</code> qo'yish orqali event
        handlerning o'zini ham asinxron qilish mumkin — bu real ilovalarda
        "tugma bosildi → ma'lumot yuklandi → DOM yangilandi" ketma-ketligini
        yozishning eng keng tarqalgan usuli.
      </Callout>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: async funksiya yozish">
        <p>
          <code>ikkiBaravarOlish(son)</code> nomli <code>async</code> funksiya
          yozing — u <code>setTimeout</code> bilan 500 millisekunddan keyin{' '}
          <code>son * 2</code>ni qaytaradigan Promise'ni <code>await</code>{' '}
          qilib kutib, natijani <code>return</code> qiladi.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function kechikish(son) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(son * 2), 500)
  })
}

async function ikkiBaravarOlish(son) {
  const natija = await kechikish(son)
  return natija
}

ikkiBaravarOlish(7).then((natija) => console.log(natija)) // 14`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Ketma-ket await">
        <p>
          <code>kechikish(son)</code> (yuqoridagi 1-vazifadan) funksiyasidan
          foydalanib, avval <code>3</code>ni ikki baravarlab, natijani yana
          ikki baravarlab, yakuniy natijani konsolga chiqaruvchi{' '}
          <code>async</code> funksiya yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`async function ikkiMartaIkkiBaravarlash() {
  const birinchi = await kechikish(3)
  const ikkinchi = await kechikish(birinchi)
  console.log(ikkinchi) // 3 -> 6 -> 12
}

ikkiMartaIkkiBaravarlash()`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Parallel yuklash">
        <p>
          <code>kechikish(2)</code>, <code>kechikish(4)</code> va{' '}
          <code>kechikish(6)</code>ni <code>Promise.all</code> va{' '}
          <code>await</code> yordamida bir vaqtda boshlab, uchala natijaning
          yig'indisini konsolga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`async function jaminiHisobla() {
  const [a, b, c] = await Promise.all([kechikish(2), kechikish(4), kechikish(6)])
  console.log(a + b + c) // 4 + 8 + 12 = 24
}

jaminiHisobla()`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: DOM bilan async tugma">
        <p>
          HTML: <code>{'<button id="yukla">Yuklash</button>'}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. Tugma bosilganda{' '}
          <code>natija</code>ga avval <code>"Yuklanmoqda..."</code> matnini,
          keyin (yuqoridagi <code>kechikish</code> funksiyasidan foydalanib){' '}
          bir soniyadan keyin <code>"Tayyor!"</code> matnini chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const tugma = document.getElementById("yukla")
const natijaElement = document.getElementById("natija")

tugma.addEventListener("click", async () => {
  natijaElement.textContent = "Yuklanmoqda..."
  await kechikish(0) // faqat kutish uchun ishlatilmoqda, natija kerak emas
  natijaElement.textContent = "Tayyor!"
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>async</code> funksiya har doim Promise qaytaradi;{' '}
          <code>await</code> — Promise bajarilishini kutib, natijani
          to'g'ridan-to'g'ri qaytaradi.
        </li>
        <li>
          <code>await</code> faqat <code>async</code> funksiya ichida
          ishlatiladi va Promise zanjiriga qaraganda kodni sinxron kodga
          o'xshab, yuqoridan pastga o'qiladigan qilib yozish imkonini beradi.
        </li>
        <li>
          Bog'liq bo'lmagan asinxron amallarni ketma-ket <code>await</code>{' '}
          qilish vaqtni behuda sarflaydi — bunday hollarda{' '}
          <code>Promise.all</code> bilan parallel boshlash tavsiya etiladi.
        </li>
        <li>
          <code>try</code>/<code>catch</code> — <code>async</code>/
          <code>await</code>da xatoliklarni boshqarishning standart usuli
          (keyingi darsda chuqur o'rganamiz).
        </li>
      </KeyPoints>
    </>
  )
}
