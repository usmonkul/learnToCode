import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Funksiyalar (functions)',
  section: 'Funksiyalar',
}

export default function FunctionsLesson() {
  return (
    <>
      <p>
        8-darsdan beri <code>tugma.onclick = function () {'{ ... }'}</code> deb yozib
        kelyapmiz — bu aslida <strong>funksiya</strong> edi, biz uni faqat tugmaga
        bog'lab ishlatgan edik. Bu darsda funksiyani rasmiy o'rganamiz: uni qanday
        e'lon qilish, parametr berish, natija qaytarish va istalgan joyda chaqirish
        mumkin.
      </p>
      <p>
        Funksiya — bir necha marta ishlatiladigan kod bo'lagini nomlab, bitta joyga
        yig'ish usuli. Bir xil amalni har safar qaytadan yozish o'rniga, uni bir marta
        funksiya sifatida yozib, keyin xohlagan joyda <strong>chaqirasiz</strong>{' '}
        (call qilasiz).
      </p>

      <h2>Nega funksiya kerak?</h2>
      <p>
        Tasavvur qiling, uchta talabani alohida-alohida salomlashimiz kerak. Funksiyasiz
        bu kodni har safar qaytadan yozishga to'g'ri keladi:
      </p>
      <CodeBlock lang="javascript">{`console.log("Salom, Aziz! Xush kelibsiz.")
console.log("Salom, Vali! Xush kelibsiz.")
console.log("Salom, Malika! Xush kelibsiz.")`}</CodeBlock>
      <p>
        Kod uchta joyda deyarli bir xil takrorlanmoqda — faqat ism o'zgaryapti. Agar
        salomlashish matnini o'zgartirish kerak bo'lsa (masalan, "Xush kelibsiz" o'rniga
        "Xayrli kun" desak), uchala qatorni ham qo'lda tuzatish kerak bo'ladi. Funksiya
        aynan shu muammoni hal qiladi — takrorlanadigan mantiqni bir marta yozib,
        keyin faqat kerakli qiymat bilan chaqiramiz:
      </p>
      <CodeBlock lang="javascript">{`function salomlash(ism) {
  console.log("Salom, " + ism + "! Xush kelibsiz.")
}

salomlash("Aziz")
salomlash("Vali")
salomlash("Malika")`}</CodeBlock>
      <p>
        Endi matnni o'zgartirish kerak bo'lsa, faqat funksiya ichidagi bitta qatorni
        tuzatish kifoya — u har uch chaqiruvda ham avtomatik qo'llanadi. Bu — funksiyaning
        asosiy afzalligi: kodni <strong>qayta ishlatish</strong> (reuse) va bitta joydan{' '}
        <strong>boshqarish</strong> (maintain qilish) imkonini beradi.
      </p>

      <h2>Funksiya e'lon qilish (function declaration)</h2>
      <p>Eng oddiy funksiya — parametrsiz, faqat bitta amalni bajaradi:</p>
      <CodeBlock lang="javascript">{`function salomlash() {
  console.log("Salom!")
}

salomlash() // "Salom!" — funksiya chaqirilganda ishga tushadi
salomlash() // "Salom!" — istalgancha marta qayta chaqirish mumkin`}</CodeBlock>
      <Callout type="warning" title="E'lon qilish va chaqirish — ikki xil narsa">
        <code>salomlash</code> — funksiyaning o'ziga ishora (u hali ishlamaydi).{' '}
        <code>salomlash()</code> — funksiyani <strong>chaqirish</strong>, ya'ni ichidagi
        kodni ishga tushirish. Qavslarni unutish — 8-darsda ko'rgan{' '}
        <code>onclick</code>dagi eng keng tarqalgan xatolarning bittasi edi, funksiya
        chaqirishda ham xuddi shu qoida amal qiladi.
      </Callout>

      <h2>Parametrlar (parameters) — funksiyaga ma'lumot uzatish</h2>
      <p>
        Funksiya qavs ichida <strong>parametr</strong> (parameter)larni qabul qilishi
        mumkin — bular funksiya ichida oddiy o'zgaruvchi kabi ishlatiladi:
      </p>
      <CodeBlock lang="javascript">{`function salomlash(ism) {
  console.log("Salom, " + ism + "!")
}

salomlash("Aziz") // "Salom, Aziz!"
salomlash("Malika") // "Salom, Malika!"`}</CodeBlock>
      <p>Bir nechta parametr vergul bilan ajratiladi:</p>
      <CodeBlock lang="javascript">{`function tanishtir(ism, yosh) {
  console.log(ism + " " + yosh + " yoshda")
}

tanishtir("Vali", 24) // "Vali 24 yoshda"`}</CodeBlock>
      <p>
        Funksiyaga chaqirilganda beriladigan qiymatlar — <strong>argument</strong>{' '}
        (argument) deyiladi (<code>"Vali"</code> va <code>24</code> — argumentlar;{' '}
        <code>ism</code> va <code>yosh</code> — parametrlar). Amaliyotda ikkalasi
        ko'pincha bir xil ma'noda ishlatiladi.
      </p>
      <p>
        Parametrlar bilan ishlaganda hisob-kitob ham qilish mumkin — masalan, mahsulot
        narxini soniga qarab hisoblaydigan funksiya:
      </p>
      <CodeBlock lang="javascript">{`function narxHisobla(birNarx, soni) {
  console.log("Jami: " + birNarx * soni + " so'm")
}

narxHisobla(15000, 3) // "Jami: 45000 so'm"
narxHisobla(8000, 10) // "Jami: 80000 so'm"`}</CodeBlock>

      <h2>
        <code>return</code> — natija qaytarish
      </h2>
      <p>
        Hozirgacha funksiya ichida faqat <code>console.log()</code> qilib kelduk. Lekin
        funksiyaning haqiqiy kuchi — u hisoblagan natijani{' '}
        <code>return</code> orqali <strong>qaytarib</strong>, keyin shu natijadan
        boshqa joyda foydalanish mumkinligida:
      </p>
      <CodeBlock lang="javascript">{`function qoshish(a, b) {
  return a + b
}

let natija = qoshish(5, 3)
console.log(natija) // 8`}</CodeBlock>
      <p>
        <code>console.log()</code> faqat ekranga chiqaradi va shu bilan tugaydi — undan
        keyin natijadan foydalanib bo'lmaydi. <code>return</code> esa natijani funksiya
        chaqirilgan joyga "qaytarib beradi" — uni o'zgaruvchiga saqlash, boshqa
        hisob-kitobda ishlatish yoki to'g'ridan-to'g'ri DOM'ga chiqarish mumkin bo'ladi:
      </p>
      <CodeBlock lang="javascript">{`function kvadrat(x) {
  return x * x
}

console.log(kvadrat(3) + kvadrat(4)) // 9 + 16 = 25 — ikkala natija ham ishlatildi`}</CodeBlock>
      <p>
        <code>return</code>dan keyingi kod <strong>ishlamaydi</strong> — funksiya{' '}
        <code>return</code>ga yetgach, darhol to'xtaydi. Bu 6-darsdagi{' '}
        <code>if</code>/<code>else</code> bilan birga ishlatilganda ayniqsa foydali:
      </p>
      <CodeBlock lang="javascript">{`function tekshir(son) {
  if (son > 0) {
    return "Musbat"
  }
  return "Musbat emas"
}

console.log(tekshir(5))  // "Musbat"
console.log(tekshir(-2)) // "Musbat emas"`}</CodeBlock>
      <p>
        Bu yerda <code>if</code> shart bajarilsa, funksiya <code>"Musbat"</code>{' '}
        deb <strong>darhol</strong> to'xtaydi — pastdagi ikkinchi{' '}
        <code>return</code>ga umuman yetib bormaydi. Shart bajarilmasa,{' '}
        <code>if</code> bloki o'tkazib yuboriladi va pastdagi{' '}
        <code>return</code> ishlaydi. Bu naqsh — <strong>erta qaytarish</strong>{' '}
        (early return) — kodni ortiqcha <code>else</code>larsiz ham tushunarli qiladi.
      </p>
      <Callout type="note" title="return bo'lmasa nima bo'ladi?">
        Agar funksiyada <code>return</code> bo'lmasa (yoki qiymatsiz{' '}
        <code>return</code> ishlatilsa), funksiya avtomatik <code>undefined</code>{' '}
        qaytaradi. <code>console.log()</code> bilan ekranga chiqarish va{' '}
        <code>return</code> bilan natija qaytarish — ikki xil narsa: birinchisi faqat
        ko'rsatadi, ikkinchisi natijani boshqa kodga "beradi".
      </Callout>
      <Quiz
        question={`function kvadrat(x) { return x * x } console.log(kvadrat(4)) nimani chiqaradi?`}
        options={['4', '8', '16', 'undefined']}
        correctIndex={2}
        explanation="kvadrat(4) chaqirilganda x = 4 bo'ladi, return x * x esa 4 * 4 = 16 ni qaytaradi."
      />

      <h2>Standart qiymatli parametrlar (default parameters)</h2>
      <p>
        Parametrga argument berilmasa, u <code>undefined</code> bo'ladi — buning oldini
        olish uchun standart qiymat belgilash mumkin:
      </p>
      <CodeBlock lang="javascript">{`function salomlash(ism = "Mehmon") {
  console.log("Salom, " + ism + "!")
}

salomlash("Aziz") // "Salom, Aziz!"
salomlash()       // "Salom, Mehmon!" — argument berilmadi, standart qiymat ishlatildi`}</CodeBlock>
      <p>
        Bu real hayotda, masalan, yetkazib berish narxini hisoblashda foydali —
        mijoz shahar nomini kiritmasa ham funksiya xatolik bermay ishlashda davom etadi:
      </p>
      <CodeBlock lang="javascript">{`function yetkazishNarxi(masofaKm, narxKm = 2000) {
  return masofaKm * narxKm
}

console.log(yetkazishNarxi(10))       // 20000 — standart narx bilan
console.log(yetkazishNarxi(10, 3000)) // 30000 — maxsus narx bilan`}</CodeBlock>

      <h2>Arrow funksiya — qisqaroq yozish usuli</h2>
      <p>
        Zamonaviy JavaScriptda funksiyani yozishning yana bir, qisqaroq usuli bor —{' '}
        <strong>arrow funksiya</strong> (<code>{'=>'}</code>). Unda funksiya nomsiz
        yaratiladi va o'zgaruvchiga saqlanadi:
      </p>
      <CodeBlock lang="javascript">{`// function declaration
function qoshish(a, b) {
  return a + b
}

// xuddi shu narsa, arrow funksiya bilan
let qoshish2 = (a, b) => {
  return a + b
}

console.log(qoshish(2, 3))  // 5
console.log(qoshish2(2, 3)) // 5 — natija bir xil`}</CodeBlock>
      <p>
        Ikkalasi ham bir xil ishlaydi — farq faqat yozilish shaklida. Arrow funksiyada{' '}
        <code>function</code> so'zi o'rniga parametrlardan keyin <code>{'=>'}</code>{' '}
        (o'q) belgisi yoziladi.
      </p>
      <p>
        Agar funksiya tanasi <strong>bitta</strong> <code>return</code> ifodasidan
        iborat bo'lsa, figurali qavs va <code>return</code> so'zini ham tashlab yuborish
        mumkin — bu <strong>yashirin qaytarish</strong> (implicit return) deyiladi:
      </p>
      <CodeBlock lang="javascript">{`let qoshish = (a, b) => a + b

console.log(qoshish(2, 3)) // 5 — return yozmasdan ham natija qaytadi`}</CodeBlock>
      <p>Yana bir misol — sonni ikki baravar oshiruvchi funksiya:</p>
      <CodeBlock lang="javascript">{`function ikkiBaravar(son) {
  return son * 2
}

// arrow funksiya bilan, implicit return
let ikkiBaravar2 = son => son * 2

console.log(ikkiBaravar(6))  // 12
console.log(ikkiBaravar2(6)) // 12`}</CodeBlock>
      <Callout type="warning" title="Yashirin qaytarish faqat bitta ifoda uchun">
        Agar funksiya ichida bir nechta qator kod bo'lsa (masalan, <code>if</code>{' '}
        yoki bir nechta amal), figurali qavs va <code>return</code>ni albatta yozish
        kerak:
        <CodeBlock lang="javascript">{`let tekshir = (son) => {
  if (son > 0) {
    return "Musbat"
  }
  return "Musbat emas"
}`}</CodeBlock>
      </Callout>
      <p>Bitta parametr bo'lsa, uni qavssiz ham yozish mumkin:</p>
      <CodeBlock lang="javascript">{`let kvadrat = x => x * x
console.log(kvadrat(5)) // 25

// parametr bo'lmasa, bo'sh qavs shart
let salom = () => console.log("Salom!")
salom()`}</CodeBlock>
      <Quiz
        question={`Qaysi arrow funksiya let ikkiBaravar = (son) => { return son * 2 } bilan bir xil natija beradi?`}
        options={[
          'let ikkiBaravar = (son) => son * 2',
          'let ikkiBaravar = son => { son * 2 }',
          'let ikkiBaravar = (son) => return son * 2',
          'let ikkiBaravar => son * 2',
        ]}
        correctIndex={0}
        explanation="Bitta ifodali arrow funksiyada figurali qavs va return so'zini tashlab, to'g'ridan-to'g'ri son * 2 deb yozish mumkin — bu implicit return."
      />

      <h2>Arrow funksiya event handlerlarda</h2>
      <p>
        8-10-darslarda ko'rgan <code>onclick</code> misollarini arrow funksiya bilan ham
        yozish mumkin — bu bugungi kunda juda keng tarqalgan uslub:
      </p>
      <CodeBlock lang="javascript">{`let tugma = document.getElementById("tugma")

tugma.onclick = () => {
  alert("Tugma bosildi!")
}`}</CodeBlock>

      <h2>O'zgaruvchining qamrovi (scope)</h2>
      <p>
        Funksiya ichida <code>let</code>/<code>const</code> bilan e'lon qilingan
        o'zgaruvchi (shu jumladan parametrlar) faqat o'sha funksiya ichida mavjud —
        funksiyadan tashqarida unga murojaat qilib bo'lmaydi:
      </p>
      <CodeBlock lang="javascript">{`function hisobla() {
  let natija = 10 * 2
  console.log(natija) // 20 — funksiya ichida ishlaydi
}

hisobla()
console.log(natija) // XATOLIK: natija is not defined`}</CodeBlock>
      <p>
        Bu, aslida, foydali xususiyat — turli funksiyalar bir xil nomdagi
        o'zgaruvchilarni ishlatsa ham, ular bir-biriga xalaqit bermaydi, chunki har
        birining o'z "ichki dunyosi" bor:
      </p>
      <CodeBlock lang="javascript">{`function birinchi() {
  let natija = "Birinchi funksiyadan"
  console.log(natija)
}

function ikkinchi() {
  let natija = "Ikkinchi funksiyadan"
  console.log(natija)
}

birinchi() // "Birinchi funksiyadan"
ikkinchi() // "Ikkinchi funksiyadan" — o'zining natija'siga ega, chalkashmaydi`}</CodeBlock>
      <p>
        Shuning uchun funksiyadan natijani "tashqariga chiqarish" uchun aynan{' '}
        <code>return</code> ishlatiladi.
      </p>

      <h2>Amaliy misol: harorat konvertori</h2>
      <p>
        Endi o'rgangan hammasini — funksiya, parametr, <code>return</code> va DOM —
        birlashtirib, kichik amaliy misol ko'ramiz. HTML:{' '}
        <code>{'<input type="number" id="celsiyInput" />'}</code>,{' '}
        <code>{'<button id="aylantirTugmasi">Fahrenheytga o\'tkazish</button>'}</code>,{' '}
        <code>{'<p id="natija"></p>'}</code>.
      </p>
      <CodeBlock lang="javascript">{`// Celsiydan Fahrenheytga aylantiruvchi funksiya
let fahrenheytgaOtkazish = celsiy => (celsiy * 9) / 5 + 32

let celsiyInput = document.getElementById("celsiyInput")
let aylantirTugmasi = document.getElementById("aylantirTugmasi")
let natijaElement = document.getElementById("natija")

aylantirTugmasi.onclick = () => {
  let celsiy = Number(celsiyInput.value)
  let fahrenheyt = fahrenheytgaOtkazish(celsiy)

  natijaElement.textContent = \`\${celsiy}°C = \${fahrenheyt}°F\`
}`}</CodeBlock>
      <p>
        Diqqat qiling: <code>fahrenheytgaOtkazish</code> funksiyasi DOM haqida hech
        narsa bilmaydi — u faqat son qabul qilib, son qaytaradi. DOM bilan ishlash
        (inputni o'qish, natijani chiqarish) esa <code>onclick</code> ichida, alohida
        bajariladi. Bu — hisob-kitob mantig'ini ekranga chiqarishdan{' '}
        <strong>ajratib qo'yish</strong>, funksiyalarning eng foydali qo'llanishlaridan
        biri.
      </p>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Ikki sonni ko'paytirish">
        <p>
          <code>kopaytir(a, b)</code> nomli funksiya yozing — u ikkita sonni qabul
          qilib, ularning ko'paytmasini <code>return</code> qiladi.{' '}
          <code>console.log(kopaytir(4, 6))</code> orqali sinab ko'ring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function kopaytir(a, b) {
  return a * b
}

console.log(kopaytir(4, 6)) // 24`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Arrow funksiyaga aylantirish">
        <p>
          Quyidagi funksiyani arrow funksiya ko'rinishiga (yashirin qaytarish bilan)
          o'zgartiring:
        </p>
        <CodeBlock lang="javascript">{`function yosh(tugilganYil) {
  return 2026 - tugilganYil
}`}</CodeBlock>
        <Solution>
          <CodeBlock lang="javascript">{`let yosh = tugilganYil => 2026 - tugilganYil

console.log(yosh(2000)) // 26`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Juft yoki toqligini tekshirish">
        <p>
          <code>juftMi(son)</code> nomli funksiya yozing — son juft bo'lsa{' '}
          <code>true</code>, toq bo'lsa <code>false</code> qaytaradi. Uni bir necha son
          bilan sinab, <code>console.log()</code> orqali tekshiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function juftMi(son) {
  return son % 2 === 0
}

console.log(juftMi(4)) // true
console.log(juftMi(7)) // false`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Standart qiymatli chegirma funksiyasi">
        <p>
          <code>chegirmaliNarx(narx, foiz)</code> funksiyasini yozing — <code>foiz</code>{' '}
          parametri berilmasa, standart qiymat sifatida <code>10</code> ishlatilsin.
          Funksiya narxdan chegirma foizini ayirib, yakuniy narxni qaytarsin.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function chegirmaliNarx(narx, foiz = 10) {
  return narx - (narx * foiz) / 100
}

console.log(chegirmaliNarx(100000))     // 90000 — standart 10%
console.log(chegirmaliNarx(100000, 25)) // 75000 — 25% chegirma`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="5-vazifa: Funksiya bilan qayta yozish (DOM)">
        <p>
          HTML: <code>{'<input type="number" id="a" />'}</code>,{' '}
          <code>{'<input type="number" id="b" />'}</code>,{' '}
          <code>{'<button id="hisoblaTugmasi">Qo\'shish</button>'}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. Arrow funksiya sifatida{' '}
          <code>qoshish(a, b)</code> yozing (ikkala sonni qo'shib qaytaradi). Tugma
          bosilganda ikkala inputning qiymatini <code>Number()</code>ga aylantirib,{' '}
          <code>qoshish()</code> funksiyasini chaqiring va natijani{' '}
          <code>natija</code>ga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let qoshish = (a, b) => a + b

let aInput = document.getElementById("a")
let bInput = document.getElementById("b")
let hisoblaTugmasi = document.getElementById("hisoblaTugmasi")
let natijaElement = document.getElementById("natija")

hisoblaTugmasi.onclick = () => {
  let a = Number(aInput.value)
  let b = Number(bInput.value)

  natijaElement.textContent = qoshish(a, b)
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="6-vazifa: Massiv elementlarini funksiya bilan qayta ishlash">
        <p>
          12-13-darsdagi massiv bilimlaringizni ishlatib, <code>engKattaSon(massiv)</code>{' '}
          nomli funksiya yozing — u sonlar massivini qabul qilib, eng katta sonni{' '}
          <code>return</code> qiladi (<code>for</code> tsiklidan foydalaning). Uni{' '}
          <code>{'[4, 19, 7, 25, 3]'}</code> massivi bilan sinab, natijani{' '}
          <code>console.log()</code> qiling.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function engKattaSon(massiv) {
  let katta = massiv[0]

  for (let i = 1; i < massiv.length; i++) {
    if (massiv[i] > katta) {
      katta = massiv[i]
    }
  }

  return katta
}

console.log(engKattaSon([4, 19, 7, 25, 3])) // 25`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Funksiya — bir necha marta ishlatiladigan kod bo'lagini nomlab, qayta-qayta
          yozmaslik uchun ishlatiladi; <code>funksiyaNomi()</code> orqali chaqiriladi.
        </li>
        <li>
          Parametrlar orqali funksiyaga ma'lumot uzatiladi, <code>return</code> orqali
          funksiyadan natija qaytariladi; <code>return</code>siz funksiya{' '}
          <code>undefined</code> qaytaradi.
        </li>
        <li>
          <code>return</code>ga yetgach funksiya darhol to'xtaydi — bu erta qaytarish
          (early return) naqshini <code>if</code>/<code>else</code> bilan birga qulay
          qiladi.
        </li>
        <li>
          Funksiyani ikki xil usulda yaratish mumkin:{' '}
          <code>function nom() {'{ }'}</code> (declaration) va{' '}
          <code>let nom = () {'=>'} {'{ }'}</code> (arrow function) — ikkalasi ham bir
          xil ishlaydi, faqat yozilishi farq qiladi.
        </li>
        <li>
          Arrow funksiya — qisqaroq yozuv; bitta ifodali funksiyalarda figurali qavs va{' '}
          <code>return</code>ni tashlab, yashirin qaytarish qilish mumkin.
        </li>
        <li>
          Funksiya ichidagi <code>let</code>/<code>const</code> o'zgaruvchilari (va
          parametrlar) faqat o'sha funksiya ichida mavjud (scope) — tashqariga{' '}
          <code>return</code> orqali chiqariladi.
        </li>
      </KeyPoints>
    </>
  )
}
