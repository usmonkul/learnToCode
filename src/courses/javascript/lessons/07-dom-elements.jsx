import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'DOM: elementlarni tanlash va matn chiqarish',
  section: 'DOM bilan ishlash',
}

export default function DomElementsLesson() {
  return (
    <>
      <p>
        Hozirgacha natijalarni faqat konsolga (<code>console.log</code>) yoki brauzer
        dialoglariga (<code>alert</code>) chiqarib keldik. Endi keyingi qadamga o'tamiz —
        natijalarni to'g'ridan-to'g'ri <strong>veb-sahifaning o'ziga</strong> chiqarishni
        o'rganamiz. Buning uchun DOM (Document Object Model) bilan ishlashni bilish kerak.
      </p>

      <h2>DOM nima?</h2>
      <p>
        Brauzer HTML sahifani o'qib, uni JavaScript o'zgartira oladigan ob'ektlar daraxtiga
        aylantiradi — bu daraxt <strong>DOM</strong> deb ataladi. Har bir HTML teg (
        <code>{'<h1>'}</code>, <code>{'<p>'}</code>, <code>{'<div>'}</code> va h.k.) DOM'da
        alohida ob'ekt sifatida mavjud bo'ladi, va JavaScript shu ob'ektlarni topib, ularning
        matnini, stilini yoki tuzilishini real vaqtda o'zgartira oladi.
      </p>
      <Callout type="note" title="HTML va JavaScript birga ishlaydi">
        Bu darsdan boshlab misollarimiz ikkita fayldan iborat bo'ladi: sahifa tuzilishini
        belgilaydigan <code>.html</code> fayl va uni boshqaradigan <code>.js</code> fayl.
        Quyidagi kabi bir xil misolni o'z kompyuteringizda sinab ko'rishingiz mumkin:
      </Callout>
      <CodeBlock lang="html">{`<!DOCTYPE html>
<html lang="uz">
  <body>
    <h1>Salom, Dunyo!</h1>
    <p id="natija"></p>

    <script src="script.js"></script>
  </body>
</html>`}</CodeBlock>
      <p>
        <code>{'<script>'}</code> tegi odatda <code>{'</body>'}</code> yopilishidan{' '}
        <strong>oldin</strong> joylashtiriladi. Sababi: brauzer HTML'ni yuqoridan pastga qarab
        o'qiydi — agar <code>{'<script>'}</code> yuqorida (masalan <code>{'<head>'}</code>{' '}
        ichida) tursa, u ishga tushganda pastdagi <code>{'<p id="natija">'}</code> hali mavjud
        bo'lmaydi va JavaScript uni topa olmaydi.
      </p>

      <h2>
        <code>document.getElementById()</code>
      </h2>
      <p>
        Sahifadagi bitta elementni uning <code>id</code> atributi bo'yicha topish uchun eng
        oddiy va tez usul. Har bir <code>id</code> sahifada noyob (yagona) bo'lishi kerak,
        shuning uchun bu metod har doim aynan bitta elementni (yoki elementni topa olmasa,{' '}
        <code>null</code>) qaytaradi:
      </p>
      <CodeBlock lang="javascript">{`let natijaElement = document.getElementById("natija")
console.log(natijaElement) // <p id="natija"></p>`}</CodeBlock>
      <p>
        E'tibor bering: argument sifatida faqat <code>id</code>ning o'zi beriladi,{' '}
        <code>#</code> belgisisiz.
      </p>

      <h2>
        <code>document.querySelector()</code>
      </h2>
      <p>
        Zamonaviy va universalroq usul — istalgan <strong>CSS selektori</strong> bo'yicha
        birinchi mos kelgan elementni qaytaradi. CSS'da bo'lgani kabi: <code>id</code> uchun{' '}
        <code>#</code>, <code>class</code> uchun <code>.</code>, teg nomi esa{' '}
        o'zgarishsiz yoziladi:
      </p>
      <CodeBlock lang="javascript">{`let natijaElement = document.querySelector("#natija")    // id bo'yicha
let sarlavha = document.querySelector("h1")                // teg nomi bo'yicha
let birinchiKartochka = document.querySelector(".kartochka") // klass bo'yicha`}</CodeBlock>
      <Callout type="tip" title="Qaysi birini tanlash kerak?">
        <code>getElementById()</code> faqat <code>id</code> bo'yicha ishlaydi va biroz
        tezroq. <code>querySelector()</code> esa istalgan CSS selektorini (klass, teg,
        murakkab kombinatsiyalar) qabul qilgani uchun ancha moslashuvchan — zamonaviy kodda
        ko'pincha shu afzal ko'riladi. Bir nechta elementni birdaniga tanlash kerak bo'lsa,{' '}
        <code>querySelectorAll()</code> degan (bu yerda batafsil ko'rib chiqilmaydigan) usul
        ham mavjud.
      </Callout>
      <Quiz
        question={`HTML'da <p id="xabar"></p> elementi bor. Uni querySelector() bilan tanlashning to'g'ri usuli qaysi?`}
        options={[
          `document.querySelector("xabar")`,
          `document.querySelector(".xabar")`,
          `document.querySelector("#xabar")`,
          `document.querySelector("id=xabar")`,
        ]}
        correctIndex={2}
        explanation={`id bo'yicha tanlashda CSS selektor sifatida # belgisi ishlatiladi: "#xabar".`}
      />

      <h2>
        <code>.textContent</code> — elementga matn yozish
      </h2>
      <p>
        Element topilgach, uning <code>.textContent</code> xususiyatiga yangi qiymat berish
        orqali sahifadagi matnni o'zgartirish mumkin:
      </p>
      <CodeBlock lang="javascript">{`let natijaElement = document.getElementById("natija")
natijaElement.textContent = "Bu matn endi sahifada ko'rinadi!"`}</CodeBlock>
      <p>
        <code>.textContent</code>ni o'qish uchun ham ishlatish mumkin — u elementning ichidagi
        joriy matnni qaytaradi:
      </p>
      <CodeBlock lang="javascript">{`console.log(natijaElement.textContent) // "Bu matn endi sahifada ko'rinadi!"`}</CodeBlock>

      <h2>Hammasini birlashtiramiz</h2>
      <p>
        Endi 3-darsda o'rgangan <code>prompt()</code>/<code>confirm()</code> va 6-darsda
        o'rgangan <code>if</code>/<code>else</code>ni DOM bilan birlashtiramiz — foydalanuvchi
        kiritgan ma'lumotni endi <code>console.log()</code>ga emas, to'g'ridan-to'g'ri
        sahifaning o'ziga chiqaramiz:
      </p>
      <CodeBlock lang="html">{`<!DOCTYPE html>
<html lang="uz">
  <body>
    <h1>Ro'yxatdan o'tish</h1>
    <p id="salomlashuv"></p>
    <p id="obunaHolati"></p>

    <script src="script.js"></script>
  </body>
</html>`}</CodeBlock>
      <CodeBlock lang="javascript">{`let ism = prompt("Ismingiz nima?")
let obunaBoladimi = confirm("Yangiliklar xatiga obuna bo'lasizmi?")

let salomlashuvElement = document.getElementById("salomlashuv")
salomlashuvElement.textContent = \`Salom, \${ism}!\`

let obunaElement = document.querySelector("#obunaHolati")
if (obunaBoladimi) {
  obunaElement.textContent = "Siz yangiliklar xatiga obuna bo'ldingiz"
} else {
  obunaElement.textContent = "Siz obuna bo'lmadingiz"
}`}</CodeBlock>
      <Quiz
        question={`Yuqoridagi kodda salomlashuvElement.textContent = \`Salom, \${ism}!\` qatori nima qiladi?`}
        options={[
          "Konsolga xabar chiqaradi",
          "id=\"salomlashuv\" elementining sahifadagi matnini o'zgartiradi",
          "Yangi HTML elementi yaratadi",
          "Dialog oynasi ochadi",
        ]}
        correctIndex={1}
        explanation={`.textContent'ga qiymat berish o'sha elementning sahifada ko'rinadigan matnini o'zgartiradi — bu yerda id="salomlashuv" bo'lgan <p> ning ichidagi matn yangilanadi.`}
      />

      <h2>Amaliyot</h2>
      <p>
        Har bir vazifada berilgan HTML tuzilmasini tasavvur qiling (yoki o'zingizning{' '}
        <code>.html</code> faylingizga yozib, yoniga <code>.js</code> fayl ulang) va uni
        boshqaradigan JavaScript kodini yozing.
      </p>

      <Exercise title="1-vazifa: Matnni almashtirish">
        <p>
          HTML'da <code>{'<p id="xabar">Eski matn</p>'}</code> bor. Uni{' '}
          <code>getElementById()</code> bilan tanlab, <code>.textContent</code> yordamida{' '}
          <code>"Yangi matn!"</code>ga almashtiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let xabarElement = document.getElementById("xabar")
xabarElement.textContent = "Yangi matn!"`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: querySelector bilan sarlavhani o'zgartirish">
        <p>
          HTML'da <code>{'<h1 class="sarlavha">Salom</h1>'}</code> bor.{' '}
          <code>querySelector()</code> yordamida uni klassi bo'yicha tanlab, matnini{' '}
          <code>"Xush kelibsiz!"</code>ga o'zgartiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let sarlavhaElement = document.querySelector(".sarlavha")
sarlavhaElement.textContent = "Xush kelibsiz!"`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Ism bilan salomlashish">
        <p>
          HTML'da <code>{'<p id="salom"></p>'}</code> bor. <code>prompt()</code> orqali ism
          so'rang va <code>{'"Salom, <ism>!"'}</code> matnini o'sha elementga{' '}
          <code>.textContent</code> orqali yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let ism = prompt("Ismingiz nima?")
let salomElement = document.getElementById("salom")
salomElement.textContent = \`Salom, \${ism}!\``}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Bildirishnoma holatini ko'rsatish">
        <p>
          HTML'da <code>{'<p id="holat"></p>'}</code> bor. <code>confirm()</code> orqali
          "Bildirishnomalarni yoqasizmi?" deb so'rang. Javobga qarab (<code>if</code>/
          <code>else</code>) o'sha elementga "Bildirishnomalar yoqildi" yoki "Bildirishnomalar
          o'chirildi" deb yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let yoqilsinmi = confirm("Bildirishnomalarni yoqasizmi?")
let holatElement = document.getElementById("holat")

if (yoqilsinmi) {
  holatElement.textContent = "Bildirishnomalar yoqildi"
} else {
  holatElement.textContent = "Bildirishnomalar o'chirildi"
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="5-vazifa: Kirish natijasini sahifada ko'rsatish">
        <p>
          HTML'da <code>{'<p id="natija"></p>'}</code> bor. <code>prompt()</code> orqali login
          va parolni so'rang. Agar login <code>"admin"</code> va parol <code>"12345"</code>ga
          teng bo'lsa — "Xush kelibsiz!", aks holda — "Login yoki parol xato" deb o'sha
          elementga <code>.textContent</code> orqali yozing (6-darsdagi mashqni eslang, endi{' '}
          <code>alert()</code> o'rniga sahifaning o'ziga chiqaramiz).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let login = prompt("Login?")
let parol = prompt("Parol?")
let natijaElement = document.getElementById("natija")

if (login === "admin" && parol === "12345") {
  natijaElement.textContent = "Xush kelibsiz!"
} else {
  natijaElement.textContent = "Login yoki parol xato"
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="6-vazifa: Mini-profil kartasi">
        <p>
          HTML'da uchta bo'sh element bor:{' '}
          <code>{'<p id="ismChiqishi"></p>'}</code>,{' '}
          <code>{'<p id="yoshChiqishi"></p>'}</code> va{' '}
          <code>{'<p id="shaharChiqishi"></p>'}</code>. <code>prompt()</code> orqali ism,
          yosh va shaharni birma-bir so'rang va har birini mos elementga{' '}
          <code>.textContent</code> orqali chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let ism = prompt("Ismingiz?")
let yosh = prompt("Yoshingiz?")
let shahar = prompt("Qaysi shaharda yashaysiz?")

document.getElementById("ismChiqishi").textContent = \`Ism: \${ism}\`
document.getElementById("yoshChiqishi").textContent = \`Yosh: \${yosh}\`
document.getElementById("shaharChiqishi").textContent = \`Shahar: \${shahar}\``}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          DOM — brauzer HTML sahifadan yaratadigan ob'ektlar daraxti; JavaScript shu daraxt
          orqali sahifani o'zgartiradi.
        </li>
        <li>
          <code>{'<script>'}</code> odatda <code>{'</body>'}</code>dan oldin joylashtiriladi,
          shunda u ishga tushganda barcha HTML elementlar allaqachon mavjud bo'ladi.
        </li>
        <li>
          <code>document.getElementById("id")</code> — <code>id</code> atributi bo'yicha
          bitta elementni topadi (<code>#</code>siz).
        </li>
        <li>
          <code>document.querySelector("selektor")</code> — istalgan CSS selektori (
          <code>#id</code>, <code>.klass</code>, <code>teg</code>) bo'yicha birinchi mos
          kelgan elementni topadi.
        </li>
        <li>
          Elementning <code>.textContent</code>iga qiymat berish sahifadagi ko'rinadigan
          matnni o'zgartiradi; o'qish uchun ham ishlatiladi.
        </li>
      </KeyPoints>
    </>
  )
}
