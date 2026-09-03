import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Inputdan ma'lumot olish",
  section: 'DOM bilan ishlash',
}

export default function InputValuesLesson() {
  return (
    <>
      <p>
        3-darsda <code>prompt()</code> yordamida foydalanuvchidan ma'lumot so'radik — bu har
        safar alohida dialog oynasini ochadi. Lekin haqiqiy veb-saytlarda (ro'yxatdan o'tish,
        qidiruv, izoh qoldirish) ma'lumot odatda sahifaning o'zidagi{' '}
        <code>{'<input>'}</code> maydonchalari orqali olinadi. Bu darsda 8-darsda o'rgangan{' '}
        <code>onclick</code>ni <code>{'<input>'}</code> bilan birlashtirib, "tugma bosilganda
        maydondagi qiymatni o'qish" naqshini o'rganamiz.
      </p>

      <h2>
        <code>{'<input>'}</code> elementi
      </h2>
      <p>Avval HTML'da matn kiritish maydoni va tugma yaratamiz:</p>
      <CodeBlock lang="html">{`<!DOCTYPE html>
<html lang="uz">
  <body>
    <input type="text" id="ismInput" placeholder="Ismingizni kiriting" />
    <button id="tugma">Yuborish</button>
    <p id="natija"></p>

    <script src="script.js"></script>
  </body>
</html>`}</CodeBlock>
      <p>
        <code>type="text"</code> — oddiy matn kiritish maydoni ekanligini bildiradi;{' '}
        <code>placeholder</code> — maydon bo'sh bo'lganda ko'rinadigan, kulrang maslahat
        matni (u haqiqiy qiymat emas, faqat vizual ko'rsatma).
      </p>

      <h2>
        <code>.value</code> — kiritilgan qiymatni olish
      </h2>
      <p>
        <code>{'<p>'}</code> yoki <code>{'<h1>'}</code> kabi elementlarning matnini{' '}
        <code>.textContent</code> orqali o'qigan edik. <code>{'<input>'}</code> esa boshqacha
        ishlaydi — foydalanuvchi yozgan matn uning <strong>xususiyati</strong> (
        <code>attribute</code>) sifatida emas, <code>.value</code> degan alohida xususiyatda
        saqlanadi:
      </p>
      <CodeBlock lang="javascript">{`let ismInput = document.getElementById("ismInput")
console.log(ismInput.value) // foydalanuvchi maydonga yozgan matn`}</CodeBlock>
      <Callout type="warning" title=".value har doim string qaytaradi">
        Xuddi <code>prompt()</code> kabi, <code>.value</code> ham{' '}
        <code>type="number"</code> bo'lgan maydon uchun ham har doim{' '}
        <strong>matn (string)</strong> qaytaradi. Son bilan hisob-kitob qilishdan oldin uni{' '}
        4-darsda o'rgangan <code>Number()</code> bilan songa aylantirish kerak.
      </Callout>

      <h2>Tugma bosilganda qiymatni o'qish</h2>
      <p>
        Endi 8-darsdagi <code>onclick</code>ni ishlatib, tugma bosilgan paytda{' '}
        <code>.value</code>ni o'qib, natijani <code>.textContent</code> orqali sahifada
        ko'rsatamiz:
      </p>
      <CodeBlock lang="javascript">{`let ismInput = document.getElementById("ismInput")
let tugma = document.getElementById("tugma")
let natijaElement = document.getElementById("natija")

tugma.onclick = function () {
  let ism = ismInput.value
  natijaElement.textContent = \`Salom, \${ism}!\`
}`}</CodeBlock>
      <p>
        E'tibor bering: <code>.value</code>ni <code>onclick</code> funksiyasi{' '}
        <strong>ichida</strong> o'qiymiz, tashqarisida emas — chunki foydalanuvchi tugmani
        bosgan paytdagi eng so'nggi qiymatni olishimiz kerak, sahifa yuklangan paytdagi
        (hali bo'sh) qiymatni emas.
      </p>

      <h2>Raqamli inputlar</h2>
      <p>
        <code>type="number"</code> — foydalanuvchidan faqat son kiritishni so'raydigan
        maydon (brauzer klaviaturasini ham songa moslashtiradi), lekin{' '}
        <code>.value</code> baribir string qaytaradi:
      </p>
      <CodeBlock lang="html">{`<input type="number" id="narxInput" />
<input type="number" id="sonInput" />
<button id="hisoblaTugmasi">Hisoblash</button>
<p id="natija"></p>`}</CodeBlock>
      <CodeBlock lang="javascript">{`let narxInput = document.getElementById("narxInput")
let sonInput = document.getElementById("sonInput")
let hisoblaTugmasi = document.getElementById("hisoblaTugmasi")
let natijaElement = document.getElementById("natija")

hisoblaTugmasi.onclick = function () {
  let narx = Number(narxInput.value)
  let son = Number(sonInput.value)
  let umumiy = narx * son

  natijaElement.textContent = \`Umumiy narx: \${umumiy}\`
}`}</CodeBlock>
      <Quiz
        question={`<input type="number" id="yoshInput"> mavjud. yoshInput.value + 1 ifodasi bilan bog'liq muammo nima?`}
        options={[
          "Hech qanday muammo yo'q, natija to'g'ri qo'shiladi",
          "value har doim string qaytaradi, shuning uchun + 1 sonni qo'shish emas, matnlarni birlashtirishga olib keladi",
          "input elementlari umuman .value xususiyatiga ega emas",
          "type=\"number\" bo'lganda .value avtomatik songa aylanadi"
        ]}
        correctIndex={1}
        explanation={`type="number" bo'lsa ham, .value har doim string qaytaradi. Uni songa aylantirmasdan + 1 qilsak, JavaScript "25" + 1 ni "251" matniga aylantirib qo'yishi mumkin — avval Number() bilan aylantirish kerak.`}
      />

      <h2>Bo'sh maydonni tekshirish</h2>
      <p>
        Foydalanuvchi hech narsa kiritmasdan tugmani bosishi mumkin — bunday holatni 6-darsda
        o'rgangan <code>if</code> bilan oldindan tekshirish yaxshi amaliyot hisoblanadi:
      </p>
      <CodeBlock lang="javascript">{`tugma.onclick = function () {
  let ism = ismInput.value

  if (ism === "") {
    natijaElement.textContent = "Iltimos, ismingizni kiriting"
    natijaElement.style.color = "red"
  } else {
    natijaElement.textContent = \`Salom, \${ism}!\`
    natijaElement.style.color = "green"
  }
}`}</CodeBlock>

      <h2>
        <code>{'<select>'}</code> — tanlov ro'yxatidan qiymat olish
      </h2>
      <p>
        Foydalanuvchi erkin matn emas, oldindan belgilangan variantlardan bittasini tanlashi
        kerak bo'lganda (masalan, shahar, til, mahsulot turi), <code>{'<input>'}</code> o'rniga{' '}
        <code>{'<select>'}</code> elementi ishlatiladi:
      </p>
      <CodeBlock lang="html">{`<select id="shaharSelect">
  <option value="toshkent">Toshkent</option>
  <option value="samarqand">Samarqand</option>
  <option value="buxoro">Buxoro</option>
</select>
<button id="tugma">Tanlash</button>
<p id="natija"></p>`}</CodeBlock>
      <p>
        <code>{'<select>'}</code>ning ham o'z <code>.value</code>si bor — u har doim hozir
        tanlangan <code>{'<option>'}</code>ning <code>value</code> atributini qaytaradi:
      </p>
      <CodeBlock lang="javascript">{`let shaharSelect = document.getElementById("shaharSelect")
let tugma = document.getElementById("tugma")
let natijaElement = document.getElementById("natija")

tugma.onclick = function () {
  let shahar = shaharSelect.value
  natijaElement.textContent = \`Siz tanladingiz: \${shahar}\`
}`}</CodeBlock>
      <Callout type="tip" title="option'ning value'si ekrandagi matndan farq qilishi mumkin">
        <code>{'<option value="toshkent">Toshkent</option>'}</code> — foydalanuvchi ro'yxatda
        "Toshkent" deb yozilgan matnni ko'radi, lekin <code>.value</code> orqali dasturga
        qulayroq <code>"toshkent"</code> qiymati qaytadi. Bu ayniqsa ma'lumotlar bazasi yoki
        API bilan ishlashda foydali. Agar <code>{'<option>'}</code>da <code>value</code>{' '}
        atributi umuman yozilmagan bo'lsa, <code>.value</code> shunchaki{' '}
        <code>{'<option>'}</code> ichidagi matnning o'zini qaytaradi.
      </Callout>
      <Quiz
        question={`<option value="toshkent">Toshkent shahri</option> tanlangan bo'lsa, shaharSelect.value nimaga teng bo'ladi?`}
        options={['"Toshkent shahri"', '"toshkent"', 'undefined', 'null']}
        correctIndex={1}
        explanation={`select elementining .value'si tanlangan option'ning value atributini qaytaradi ("toshkent"), ekranda ko'rinadigan matnni ("Toshkent shahri") emas.`}
      />

      <h2>Amaliyot</h2>
      <p>
        Har bir vazifada HTML'da mos <code>{'<input>'}</code>, tugma va natija elementlari
        bor deb tasavvur qiling.
      </p>

      <Exercise title="1-vazifa: Ism bilan salomlashish">
        <p>
          HTML: <code>{'<input type="text" id="ismInput" />'}</code>,{' '}
          <code>{'<button id="tugma">Yuborish</button>'}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. Tugma bosilganda inputdagi ismni o'qib,{' '}
          <code>natija</code>ga "Salom, &lt;ism&gt;!" deb yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let ismInput = document.getElementById("ismInput")
let tugma = document.getElementById("tugma")
let natijaElement = document.getElementById("natija")

tugma.onclick = function () {
  let ism = ismInput.value
  natijaElement.textContent = \`Salom, \${ism}!\`
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Ikki sonni qo'shish">
        <p>
          HTML: <code>{'<input type="number" id="aInput" />'}</code>,{' '}
          <code>{'<input type="number" id="bInput" />'}</code>,{' '}
          <code>{'<button id="qoshTugmasi">Qo\'shish</button>'}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. Tugma bosilganda ikkala sonni o'qib,
          ularni songa aylantirib, yig'indisini <code>natija</code>ga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let aInput = document.getElementById("aInput")
let bInput = document.getElementById("bInput")
let qoshTugmasi = document.getElementById("qoshTugmasi")
let natijaElement = document.getElementById("natija")

qoshTugmasi.onclick = function () {
  let a = Number(aInput.value)
  let b = Number(bInput.value)
  natijaElement.textContent = \`Yig'indi: \${a + b}\`
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Bo'sh maydonni tekshirish">
        <p>
          HTML: <code>{'<input type="text" id="izohInput" />'}</code>,{' '}
          <code>{'<button id="yuborTugmasi">Yuborish</button>'}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. Agar maydon bo'sh bo'lsa, qizil rangda
          "Izoh bo'sh bo'lishi mumkin emas" deb yozing; aks holda yashil rangda "Izoh
          yuborildi" deb yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let izohInput = document.getElementById("izohInput")
let yuborTugmasi = document.getElementById("yuborTugmasi")
let natijaElement = document.getElementById("natija")

yuborTugmasi.onclick = function () {
  let izoh = izohInput.value

  if (izoh === "") {
    natijaElement.textContent = "Izoh bo'sh bo'lishi mumkin emas"
    natijaElement.style.color = "red"
  } else {
    natijaElement.textContent = "Izoh yuborildi"
    natijaElement.style.color = "green"
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Kirish formasi">
        <p>
          HTML: <code>{'<input type="text" id="loginInput" />'}</code>,{' '}
          <code>{'<input type="text" id="parolInput" />'}</code>,{' '}
          <code>{'<button id="kirishTugmasi">Kirish</button>'}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. Login <code>"admin"</code> va parol{' '}
          <code>"12345"</code>ga teng bo'lsa "Xush kelibsiz!", aks holda "Login yoki parol
          xato" deb yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let loginInput = document.getElementById("loginInput")
let parolInput = document.getElementById("parolInput")
let kirishTugmasi = document.getElementById("kirishTugmasi")
let natijaElement = document.getElementById("natija")

kirishTugmasi.onclick = function () {
  let login = loginInput.value
  let parol = parolInput.value

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

      <Exercise title="5-vazifa: Buyurtma summasini hisoblash">
        <p>
          HTML: <code>{'<input type="number" id="narxInput" />'}</code> (bitta mahsulot
          narxi), <code>{'<input type="number" id="sonInput" />'}</code> (miqdori),{' '}
          <code>{'<button id="hisoblaTugmasi">Hisoblash</button>'}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. Ikkalasini ko'paytirib, umumiy summani{' '}
          <code>natija</code>ga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let narxInput = document.getElementById("narxInput")
let sonInput = document.getElementById("sonInput")
let hisoblaTugmasi = document.getElementById("hisoblaTugmasi")
let natijaElement = document.getElementById("natija")

hisoblaTugmasi.onclick = function () {
  let narx = Number(narxInput.value)
  let son = Number(sonInput.value)
  natijaElement.textContent = \`Umumiy summa: \${narx * son}\`
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="6-vazifa: Parolni tasdiqlash">
        <p>
          HTML: <code>{'<input type="text" id="parolInput" />'}</code>,{' '}
          <code>{'<input type="text" id="tasdiqInput" />'}</code> (parolni takrorlash),{' '}
          <code>{`<button id="royxatTugmasi">Ro'yxatdan o'tish</button>`}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. Ikkala maydondagi qiymatlar bir xil bo'lsa
          yashil rangda "Parollar mos keldi", aks holda qizil rangda "Parollar mos kelmadi"
          deb yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let parolInput = document.getElementById("parolInput")
let tasdiqInput = document.getElementById("tasdiqInput")
let royxatTugmasi = document.getElementById("royxatTugmasi")
let natijaElement = document.getElementById("natija")

royxatTugmasi.onclick = function () {
  if (parolInput.value === tasdiqInput.value) {
    natijaElement.textContent = "Parollar mos keldi"
    natijaElement.style.color = "green"
  } else {
    natijaElement.textContent = "Parollar mos kelmadi"
    natijaElement.style.color = "red"
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="7-vazifa: Tanlangan mahsulot turini ko'rsatish">
        <p>
          HTML: <code>{`<select id="turSelect">`}</code> ichida uchta variant —{' '}
          <code>{'<option value="kitob">Kitob</option>'}</code>,{' '}
          <code>{'<option value="daftar">Daftar</option>'}</code>,{' '}
          <code>{'<option value="ruchka">Ruchka</option>'}</code> — hamda{' '}
          <code>{'<button id="tanlaTugmasi">Tanlash</button>'}</code> va{' '}
          <code>{'<p id="natija"></p>'}</code>. Tugma bosilganda tanlangan mahsulot turining{' '}
          <code>value</code>sini o'qib, <code>{`"Siz tanladingiz: <qiymat>"`}</code> deb{' '}
          <code>natija</code>ga yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let turSelect = document.getElementById("turSelect")
let tanlaTugmasi = document.getElementById("tanlaTugmasi")
let natijaElement = document.getElementById("natija")

tanlaTugmasi.onclick = function () {
  let tur = turSelect.value
  natijaElement.textContent = \`Siz tanladingiz: \${tur}\`
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>{'<input>'}</code>ga kiritilgan qiymatni <code>.textContent</code> emas,{' '}
          <code>.value</code> orqali olamiz.
        </li>
        <li>
          <code>.value</code> — <code>type="number"</code> bo'lsa ham, har doim{' '}
          <strong>string</strong> qaytaradi; son bilan hisob-kitob qilishdan oldin{' '}
          <code>Number()</code> kerak.
        </li>
        <li>
          <code>.value</code>ni tugmaning <code>onclick</code> funksiyasi{' '}
          <strong>ichida</strong> o'qish kerak — shundagina bosilgan paytdagi eng so'nggi
          qiymat olinadi.
        </li>
        <li>
          Bo'sh maydonni <code>{'value === ""'}</code> bilan tekshirish — foydalanuvchi
          xatosidan himoyalanishning oddiy usuli.
        </li>
        <li>
          Ikki inputning qiymatlarini <code>===</code> bilan solishtirish (masalan, parolni
          tasdiqlashda) juda keng tarqalgan naqsh.
        </li>
        <li>
          <code>{'<select>'}</code>ning <code>.value</code>si tanlangan{' '}
          <code>{'<option>'}</code>ning <code>value</code> atributini qaytaradi — ekranda
          ko'rinadigan matnni emas.
        </li>
      </KeyPoints>
    </>
  )
}
