import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Tugma bosish voqealari (onclick)',
  section: 'DOM bilan ishlash',
}

export default function ClickEventsLesson() {
  return (
    <>
      <p>
        Hozirgacha yozgan kodimiz sahifa yuklangan zahoti, yuqoridan pastga qarab bir marta
        ishlab, to'xtardi. Lekin haqiqiy veb-sahifalar foydalanuvchi bilan{' '}
        <strong>o'zaro ta'sirlashadi</strong> — tugma bosilganda, forma to'ldirilganda va
        hokazo. Bunday holatlar <strong>voqea</strong> (event) deyiladi. Bu darsda eng ko'p
        uchraydigan voqea — tugma bosish (<code>click</code>) bilan ishlashni o'rganamiz.
      </p>

      <h2>Funksiya (function) — qisqacha</h2>
      <p>
        Tugma bosilganda qandaydir kod ishga tushishi uchun, avval o'sha kodni{' '}
        <strong>funksiya</strong> ichiga joylashimiz kerak. Funksiya — nomlangan, qayta-qayta
        chaqirilishi mumkin bo'lgan kod bo'lagi. U <code>function</code> kalit so'zi, nomi va{' '}
        <code>{'{ }'}</code> ichidagi tanasi (body) dan iborat:
      </p>
      <CodeBlock lang="javascript">{`function salomlashish() {
  console.log("Salom!")
}

salomlashish() // funksiyani chaqirish — endigina "Salom!" chiqadi`}</CodeBlock>
      <p>
        Muhim jihati: funksiya <strong>e'lon qilinganda</strong> ichidagi kod ishlamaydi — u
        faqat <code>salomlashish()</code> kabi <strong>chaqirilganda</strong> ishga tushadi.
        Xuddi shu narsa bizga kerak: kodni tugma bosilgan paytgacha "kutib turadigan" qilib
        yozish.
      </p>

      <h2>
        HTML tugma va <code>onclick</code>
      </h2>
      <p>Avval oddiy HTML tugma yaratamiz:</p>
      <CodeBlock lang="html">{`<!DOCTYPE html>
<html lang="uz">
  <body>
    <button id="tugma">Bosing</button>
    <p id="natija"></p>

    <script src="script.js"></script>
  </body>
</html>`}</CodeBlock>
      <p>
        Endi shu tugmani JavaScript'da tanlab, uning <code>onclick</code> xususiyatiga
        funksiya beramiz — bu funksiya foydalanuvchi tugmani bosgan paytda, brauzer tomonidan
        avtomatik chaqiriladi:
      </p>
      <CodeBlock lang="javascript">{`let tugma = document.getElementById("tugma")

tugma.onclick = function () {
  console.log("Tugma bosildi!")
}`}</CodeBlock>
      <p>
        Bu yerda <code>function () {'{ ... }'}</code> — nomsiz (anonim) funksiya, to'g'ridan-to'g'ri{' '}
        <code>onclick</code>ga beriladi. Uni alohida chaqirish shart emas — brauzerning o'zi
        tugma bosilganda uni chaqiradi.
      </p>
      <Callout type="warning" title="Eng keng tarqalgan xato: qavs qo'yish yoki qo'ymaslik">
        <code>{'tugma.onclick = salomlashish'}</code> — to'g'ri: bu yerda funksiyaning o'ziga
        (havolasiga) berilyapti, u faqat bosilganda chaqiriladi. Lekin{' '}
        <code>{'tugma.onclick = salomlashish()'}</code> — XATO: qavs funksiyani{' '}
        <strong>darhol</strong> chaqiradi, va uning natijasi (odatda <code>undefined</code>)
        <code>onclick</code>ga beriladi — tugma bosilganda hech narsa sodir bo'lmaydi.
      </Callout>
      <Quiz
        question={`function chiqar() { console.log("salom") } bor. Uni tugma bosilgandagina ishga tushirish uchun qaysi yozuv to'g'ri?`}
        options={[
          'tugma.onclick = chiqar()',
          'tugma.onclick = chiqar',
          'tugma.onclick() = chiqar',
          'tugma = chiqar.onclick',
        ]}
        correctIndex={1}
        explanation={`tugma.onclick = chiqar funksiyaning o'ziga (chaqirmasdan) havola beradi — u faqat tugma bosilganda ishga tushadi. Oxiriga () qo'shilsa, funksiya darhol chaqirilib ketadi.`}
      />

      <h2>Bosilganda xabar ko'rsatish</h2>
      <p>
        7-darsda o'rgangan <code>.textContent</code>ni <code>onclick</code> ichida
        ishlatsak, tugma bosilganda sahifada xabar paydo bo'ladi:
      </p>
      <CodeBlock lang="javascript">{`let tugma = document.getElementById("tugma")
let natijaElement = document.getElementById("natija")

tugma.onclick = function () {
  natijaElement.textContent = "Rahmat, bosdingiz!"
}`}</CodeBlock>

      <h2>
        Bosilganda stilni o'zgartirish: <code>.style</code>
      </h2>
      <p>
        Har bir DOM elementining <code>.style</code> xususiyati bor — unga qiymat berish
        elementning ko'rinishini (rang, o'lcham, fon va h.k.) real vaqtda o'zgartiradi:
      </p>
      <CodeBlock lang="javascript">{`natijaElement.style.color = "green"
natijaElement.style.fontWeight = "bold"`}</CodeBlock>
      <Callout type="note" title="CSS nomi bilan JS nomi farq qiladi">
        CSS'da <code>background-color</code>, <code>font-size</code> kabi chiziqcha (
        <code>-</code>) bilan yoziladigan xususiyat nomlari, JavaScript'da 2-darsda o'rgangan{' '}
        <code>camelCase</code> uslubida yoziladi: <code>backgroundColor</code>,{' '}
        <code>fontSize</code>. Qiymatlar esa har doim matn (string) sifatida, o'lchov birligi
        bilan birga beriladi: <code>{'"20px"'}</code>, faqat <code>20</code> emas.
      </Callout>
      <CodeBlock lang="javascript">{`natijaElement.style.backgroundColor = "yellow"
natijaElement.style.fontSize = "20px"
natijaElement.style.display = "none" // elementni butunlay yashiradi`}</CodeBlock>

      <h2>Bosilganda ma'lumot so'rash</h2>
      <p>
        <code>onclick</code> funksiyasi ichida <code>prompt()</code> yoki{' '}
        <code>confirm()</code>ni ham chaqirish mumkin — shunda tugma bosilgandagina
        foydalanuvchidan savol so'raladi, sahifa yuklangan zahoti emas:
      </p>
      <CodeBlock lang="javascript">{`let salomTugmasi = document.getElementById("salomTugmasi")
let natijaElement = document.getElementById("natija")

salomTugmasi.onclick = function () {
  let ism = prompt("Ismingiz nima?")
  natijaElement.textContent = \`Salom, \${ism}!\`
  natijaElement.style.color = "green"
  natijaElement.style.fontWeight = "bold"
}`}</CodeBlock>
      <p>
        Yoki <code>confirm()</code> bilan — masalan, "o'chirish" kabi qaytarib bo'lmaydigan
        amaldan oldin tasdiqlash so'rash uchun (bu real ilovalarda juda keng tarqalgan
        naqsh):
      </p>
      <CodeBlock lang="javascript">{`let ochirishTugmasi = document.getElementById("ochirishTugmasi")
let holatElement = document.getElementById("holat")

ochirishTugmasi.onclick = function () {
  let roziMi = confirm("Rostdan ham o'chirmoqchimisiz?")

  if (roziMi) {
    holatElement.textContent = "O'chirildi"
    holatElement.style.color = "red"
  } else {
    holatElement.textContent = "Bekor qilindi"
    holatElement.style.color = "gray"
  }
}`}</CodeBlock>
      <Quiz
        question={`natijaElement.style.backgroundColor = "yellow" qatoridagi backgroundColor nima uchun shu ko'rinishda yozilgan (background-color emas)?`}
        options={[
          "Bu xato, background-color to'g'ri edi",
          "JavaScript'da CSS xususiyat nomlari camelCase uslubida yoziladi",
          "backgroundColor faqat tugmalar uchun ishlatiladi",
          "Ikkalasi ham bir xil ishlamaydi"
        ]}
        correctIndex={1}
        explanation={`JavaScript'da .style orqali CSS xususiyatlariga murojaat qilganda, chiziqchali CSS nomlari (background-color) camelCase'ga (backgroundColor) aylantiriladi.`}
      />

      <h2>Amaliyot</h2>
      <p>
        Har bir vazifada HTML'da mos tugma va natija elementi bor deb tasavvur qiling (yoki
        o'zingizning <code>.html</code> faylingizga qo'shib sinab ko'ring).
      </p>

      <Exercise title="1-vazifa: Oddiy salomlashish tugmasi">
        <p>
          HTML: <code>{'<button id="salomTugmasi">Salomlashish</button>'}</code> va{' '}
          <code>{'<p id="natija"></p>'}</code>. Tugma bosilganda <code>natija</code>{' '}
          elementiga "Salom, dunyo!" deb yozadigan <code>onclick</code> funksiyasini yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let tugma = document.getElementById("salomTugmasi")
let natijaElement = document.getElementById("natija")

tugma.onclick = function () {
  natijaElement.textContent = "Salom, dunyo!"
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Rangni o'zgartiruvchi tugma">
        <p>
          HTML: <code>{'<button id="rangTugmasi">Rangni o\'zgartirish</button>'}</code> va{' '}
          <code>{'<p id="matn">Bu matn</p>'}</code>. Tugma bosilganda <code>matn</code>{' '}
          elementining rangini <code>"blue"</code>ga, shrift qalinligini{' '}
          <code>"bold"</code>ga o'zgartiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let rangTugmasi = document.getElementById("rangTugmasi")
let matnElement = document.getElementById("matn")

rangTugmasi.onclick = function () {
  matnElement.style.color = "blue"
  matnElement.style.fontWeight = "bold"
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Ko'rsatish/yashirish tugmasi">
        <p>
          HTML: <code>{'<button id="yashirishTugmasi">Yashirish</button>'}</code> va{' '}
          <code>{'<p id="elon">Bu e\'lon matni</p>'}</code>. Tugma bosilganda{' '}
          <code>elon</code> elementini <code>style.display = "none"</code> yordamida butunlay
          yashiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let yashirishTugmasi = document.getElementById("yashirishTugmasi")
let elonElement = document.getElementById("elon")

yashirishTugmasi.onclick = function () {
  elonElement.style.display = "none"
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: O'chirishni tasdiqlash">
        <p>
          HTML: <code>{'<button id="ochirTugmasi">O\'chirish</button>'}</code> va{' '}
          <code>{'<p id="holat"></p>'}</code>. Tugma bosilganda <code>confirm()</code>{' '}
          yordamida "Rostdan ham o'chirmoqchimisiz?" deb so'rang; rozi bo'lsa{' '}
          <code>holat</code>ga qizil rangda "O'chirildi", aks holda kulrang rangda "Bekor
          qilindi" deb yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let ochirTugmasi = document.getElementById("ochirTugmasi")
let holatElement = document.getElementById("holat")

ochirTugmasi.onclick = function () {
  let roziMi = confirm("Rostdan ham o'chirmoqchimisiz?")

  if (roziMi) {
    holatElement.textContent = "O'chirildi"
    holatElement.style.color = "red"
  } else {
    holatElement.textContent = "Bekor qilindi"
    holatElement.style.color = "gray"
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="5-vazifa: Kirish tekshiruvi tugma orqali">
        <p>
          HTML: <code>{'<button id="kirishTugmasi">Kirish</button>'}</code> va{' '}
          <code>{'<p id="natija"></p>'}</code>. Tugma bosilgandagina (sahifa yuklanganda emas!)
          <code>prompt()</code> orqali login va parolni so'rang. Login <code>"admin"</code> va
          parol <code>"12345"</code>ga teng bo'lsa, <code>natija</code>ga yashil rangda "Xush
          kelibsiz!", aks holda qizil rangda "Login yoki parol xato" deb yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let kirishTugmasi = document.getElementById("kirishTugmasi")
let natijaElement = document.getElementById("natija")

kirishTugmasi.onclick = function () {
  let login = prompt("Login?")
  let parol = prompt("Parol?")

  if (login === "admin" && parol === "12345") {
    natijaElement.textContent = "Xush kelibsiz!"
    natijaElement.style.color = "green"
  } else {
    natijaElement.textContent = "Login yoki parol xato"
    natijaElement.style.color = "red"
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="6-vazifa: Bosishlar hisoblagichi">
        <p>
          HTML: <code>{'<button id="hisoblagichTugmasi">Bos!</button>'}</code> va{' '}
          <code>{'<p id="son">0</p>'}</code>. Har safar tugma bosilganda hisobni bittaga
          oshirib, yangi qiymatni <code>son</code> elementiga chiqaring (maslahat: hisobni
          saqlaydigan o'zgaruvchini <code>onclick</code>dan tashqarida e'lon qiling, aks
          holda u har bosishda qaytadan <code>0</code>dan boshlanadi).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let hisoblagichTugmasi = document.getElementById("hisoblagichTugmasi")
let sonElement = document.getElementById("son")
let hisob = 0

hisoblagichTugmasi.onclick = function () {
  hisob = hisob + 1
  sonElement.textContent = hisob
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Funksiya — <code>function</code> bilan e'lon qilinadigan, faqat chaqirilganda
          ishlaydigan kod bo'lagi.
        </li>
        <li>
          <code>{'element.onclick = funksiya'}</code> — funksiyaning o'ziga havola beradi, u
          tugma bosilganda avtomatik chaqiriladi; oxiriga <code>()</code> qo'shib qo'yish
          (funksiyani darhol chaqirib yuborish) — eng keng tarqalgan xato.
        </li>
        <li>
          <code>onclick</code> ichida <code>.textContent</code>, <code>.style</code>,{' '}
          <code>prompt()</code>, <code>confirm()</code> — barchasi bemalol ishlatilaveradi.
        </li>
        <li>
          <code>.style</code> orqali CSS xususiyatlariga murojaat qilganda, chiziqchali
          nomlar (<code>background-color</code>) camelCase'ga (<code>backgroundColor</code>)
          aylanadi; qiymatlar o'lchov birligi bilan matn sifatida beriladi (
          <code>"20px"</code>).
        </li>
        <li>
          Tugma bosishlar orasida qiymatni "eslab qolish" uchun o'zgaruvchi{' '}
          <code>onclick</code> funksiyasidan <strong>tashqarida</strong> e'lon qilinishi
          kerak.
        </li>
      </KeyPoints>
    </>
  )
}
