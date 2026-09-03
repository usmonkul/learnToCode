import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Elementlarni yaratish va o'chirish",
  section: 'DOM: kengaytirilgan',
}

export default function CreateRemoveElementsLesson() {
  return (
    <>
      <p>
        O'tgan darsda <code>.innerHTML</code> yordamida HTML kodini matn sifatida
        yozib, yangi elementlar hosil qilishni ko'rdik. Bu usul tez, lekin bir
        kamchiligi bor — u har safar butun HTML qatorini{' '}
        <strong>qaytadan qurishga</strong> majbur qiladi, hatto faqat bitta element
        qo'shmoqchi bo'lsangiz ham. Bu darsda elementlarni JavaScript orqali{' '}
        <strong>to'g'ridan-to'g'ri</strong> yaratish, sahifaga qo'shish va olib
        tashlashni o'rganamiz — <code>createElement()</code>,{' '}
        <code>appendChild()</code>, <code>.remove()</code>.
      </p>

      <h2>
        <code>document.createElement()</code> — yangi element yaratish
      </h2>
      <p>
        <code>createElement()</code> berilgan teg nomi asosida yangi HTML elementini
        yaratadi — lekin bu element hali sahifada <strong>ko'rinmaydi</strong>, chunki
        u hali hech qayerga ulanmagan:
      </p>
      <CodeBlock lang="javascript">{`let yangiElement = document.createElement("p")
console.log(yangiElement) // <p></p> — mavjud, lekin sahifada yo'q`}</CodeBlock>
      <p>
        Yaratilgan elementga 7-8-darslarda tanish bo'lgan usullar bilan mazmun
        qo'shish mumkin — <code>.textContent</code>, <code>.style</code>,{' '}
        <code>classList</code>:
      </p>
      <CodeBlock lang="javascript">{`let yangiElement = document.createElement("p")
yangiElement.textContent = "Men yangi elementman!"
yangiElement.style.color = "blue"`}</CodeBlock>

      <h2>
        <code>appendChild()</code> — elementni sahifaga qo'shish
      </h2>
      <p>
        Yaratilgan element sahifada ko'rinishi uchun uni mavjud bir elementning{' '}
        <strong>ichiga</strong> qo'shish kerak. Buning uchun ota-element (parent) ustida{' '}
        <code>appendChild()</code> chaqiriladi — u yangi elementni oxiriga qo'shadi:
      </p>
      <CodeBlock lang="javascript">{`let konteyner = document.getElementById("konteyner")

let yangiElement = document.createElement("p")
yangiElement.textContent = "Men yangi elementman!"

konteyner.appendChild(yangiElement) // endi sahifada ko'rinadi`}</CodeBlock>
      <Callout type="note" title="Uch qadamli naqsh">
        Yangi element yaratish odatda uch bosqichdan iborat:{' '}
        <strong>1)</strong> <code>createElement()</code> bilan yaratish,{' '}
        <strong>2)</strong> <code>.textContent</code>, <code>.style</code> va
        hokazolar bilan to'ldirish, <strong>3)</strong> <code>appendChild()</code>{' '}
        bilan sahifaga ulash. Ikkinchi va uchinchi qadamlarni istalgan tartibda
        bajarish mumkin, lekin element sahifada ko'rinishi uchun{' '}
        <code>appendChild()</code> albatta chaqirilishi kerak.
      </Callout>

      <h2>Amaliy misol: massivdan elementlar yasash</h2>
      <p>
        15-darsdagi <code>for</code> tsikli bilan birga, <code>createElement()</code>{' '}
        va <code>appendChild()</code>ni massiv elementlaridan haqiqiy HTML ro'yxat
        yasash uchun ishlatish mumkin. HTML: <code>{'<ul id="royxat"></ul>'}</code>:
      </p>
      <CodeBlock lang="javascript">{`let mevalar = ["olma", "banan", "shaftoli"]
let royxatElement = document.getElementById("royxat")

for (let i = 0; i < mevalar.length; i++) {
  let liElement = document.createElement("li")
  liElement.textContent = mevalar[i]
  royxatElement.appendChild(liElement)
}`}</CodeBlock>
      <Callout type="tip" title="innerHTML yoki createElement — qaysi birini tanlash?">
        <code>.innerHTML</code> qisqaroq va oddiy holatlar uchun qulay, lekin
        foydalanuvchi ma'lumotini o'z ichiga olganda xavfli (o'tgan darsda ko'rgan XSS
        muammosi). <code>createElement()</code> + <code>.textContent</code> esa
        matnni hech qachon HTML sifatida talqin qilmaydi — shuning uchun
        foydalanuvchi kiritgan ma'lumotdan element yasashda xavfsizroq usul hisoblanadi.
      </Callout>
      <Quiz
        question="Yangi yaratilgan element (document.createElement bilan) sahifada avtomatik ko'rinadimi?"
        options={[
          "Ha, darhol ko'rinadi",
          "Yo'q, uni appendChild() bilan mavjud elementga qo'shmaguningizcha ko'rinmaydi",
          "Faqat body ichida yaratilsa ko'rinadi",
          "Faqat textContent berilsa ko'rinadi",
        ]}
        correctIndex={1}
        explanation="createElement() elementni faqat JavaScript xotirasida yaratadi. U sahifada ko'rinishi uchun appendChild() orqali DOM daraxtiga (biror mavjud elementning ichiga) qo'shilishi shart."
      />

      <h2>
        <code>.remove()</code> — elementni sahifadan olib tashlash
      </h2>
      <p>
        10-darsda <code>classList</code> bilan elementning ko'rinishini yashirishni
        ko'rgan edik (<code>display: none</code>). <code>.remove()</code> esa
        boshqacha — u elementni yashirmaydi, balki uni DOM'dan{' '}
        <strong>butunlay olib tashlaydi</strong>:
      </p>
      <CodeBlock lang="javascript">{`let ogohlantirish = document.getElementById("ogohlantirish")
let yopishTugmasi = document.getElementById("yopishTugmasi")

yopishTugmasi.onclick = () => {
  ogohlantirish.remove()
}`}</CodeBlock>
      <p>
        <code>createElement()</code> bilan yaratilgan elementlarni ham xuddi shunday
        olib tashlash mumkin — masalan, ro'yxatdagi bitta elementga "o'chirish" tugmasi
        qo'shib, bosilganda o'sha elementni olib tashlash:
      </p>
      <CodeBlock lang="javascript">{`let royxatElement = document.getElementById("royxat")

let liElement = document.createElement("li")
liElement.textContent = "Vazifa: kitob o'qish"
royxatElement.appendChild(liElement)

// keyinroq, masalan tugma bosilganda:
liElement.remove()`}</CodeBlock>

      <h2>
        <code>setAttribute()</code> va <code>getAttribute()</code> — atributlar bilan
        ishlash
      </h2>
      <p>
        Hozirgacha elementning ba'zi xususiyatlarini (<code>.textContent</code>,{' '}
        <code>.style</code>) to'g'ridan-to'g'ri nuqta orqali o'zgartirdik. Lekin{' '}
        <code>src</code>, <code>href</code>, <code>id</code>, yoki o'zingiz o'ylab
        topgan <code>data-*</code> kabi HTML <strong>atributlarini</strong> (attribute)
        o'qish va yozish uchun universal usul bor — <code>setAttribute()</code> va{' '}
        <code>getAttribute()</code>:
      </p>
      <CodeBlock lang="javascript">{`let rasm = document.getElementById("rasm")

rasm.setAttribute("src", "logo.png")
rasm.setAttribute("alt", "Kompaniya logotipi")

console.log(rasm.getAttribute("src")) // "logo.png"`}</CodeBlock>
      <p>
        Yaratilgan elementga ham atribut qo'shish mumkin — masalan, havola yasashda:
      </p>
      <CodeBlock lang="javascript">{`let havola = document.createElement("a")
havola.textContent = "Bizning sahifa"
havola.setAttribute("href", "https://example.com")

document.body.appendChild(havola)`}</CodeBlock>
      <Callout type="note" title="setAttribute umumiy, .property esa qulayroq">
        Ko'p hollarda <code>elementValue.value</code> yoki{' '}
        <code>rasm.src</code> kabi to'g'ridan-to'g'ri xususiyat orqali ham o'qish/yozish
        mumkin — bu odatda qisqaroq. <code>setAttribute()</code>/<code>getAttribute()</code>{' '}
        esa istalgan atribut (hatto standart bo'lmagan{' '}
        <code>data-*</code> atributlar) bilan ishlaydigan{' '}
        <strong>universal</strong> usul — ayniqsa maxsus atributlarni o'qish/yozishda
        foydali.
      </Callout>
      <CodeBlock lang="javascript">{`let karta = document.getElementById("karta")

karta.setAttribute("data-mahsulot-id", "42")
console.log(karta.getAttribute("data-mahsulot-id")) // "42"`}</CodeBlock>
      <Quiz
        question={`rasm.setAttribute("alt", "Logotip") ishlatilgach, rasm.getAttribute("alt") nima qaytaradi?`}
        options={['"alt"', '"Logotip"', 'undefined', 'true']}
        correctIndex={1}
        explanation={`setAttribute("alt", "Logotip") elementning alt atributini "Logotip" qiymatiga o'rnatadi; getAttribute("alt") esa aynan shu qiymatni qaytaradi.`}
      />

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Yangi paragraf qo'shish">
        <p>
          HTML: <code>{'<div id="konteyner"></div>'}</code>. <code>createElement()</code>{' '}
          bilan yangi <code>{'<p>'}</code> yarating, <code>.textContent</code>ni
          <code>"Bu dinamik qo'shilgan matn"</code> qiling va uni{' '}
          <code>konteyner</code>ga <code>appendChild()</code> orqali qo'shing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let konteyner = document.getElementById("konteyner")

let pElement = document.createElement("p")
pElement.textContent = "Bu dinamik qo'shilgan matn"

konteyner.appendChild(pElement)`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Tugma bosilganda vazifa qo'shish">
        <p>
          HTML: <code>{'<input type="text" id="vazifaInput" />'}</code>,{' '}
          <code>{`<button id="qoshTugmasi">Qo'shish</button>`}</code>,{' '}
          <code>{'<ul id="royxat"></ul>'}</code>. Tugma bosilganda inputning{' '}
          <code>.value</code>sini olib, yangi <code>{'<li>'}</code> yaratib,{' '}
          <code>royxat</code>ga qo'shing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let vazifaInput = document.getElementById("vazifaInput")
let qoshTugmasi = document.getElementById("qoshTugmasi")
let royxatElement = document.getElementById("royxat")

qoshTugmasi.onclick = () => {
  let liElement = document.createElement("li")
  liElement.textContent = vazifaInput.value

  royxatElement.appendChild(liElement)
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Ogohlantirishni yopish">
        <p>
          HTML: <code>{'<div id="ogohlantirish">Diqqat! Bu muhim xabar.</div>'}</code>,{' '}
          <code>{'<button id="yopTugmasi">Yopish</button>'}</code>. Tugma bosilganda{' '}
          <code>.remove()</code> yordamida <code>ogohlantirish</code>ni sahifadan
          butunlay olib tashlang.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let ogohlantirish = document.getElementById("ogohlantirish")
let yopTugmasi = document.getElementById("yopTugmasi")

yopTugmasi.onclick = () => {
  ogohlantirish.remove()
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Har bir vazifaga o'chirish tugmasi">
        <p>
          2-vazifadagi kodni kengaytiring: yangi <code>{'<li>'}</code> yaratilganda,
          uning ichiga kichik "X" matnli <code>{'<button>'}</code> ham yarating va uni{' '}
          <code>{'<li>'}</code>ga <code>appendChild()</code> bilan qo'shing. Bu
          tugmaga <code>onclick</code> biriktirib, bosilganda o'sha{' '}
          <code>{'<li>'}</code>ning o'zini <code>.remove()</code> qiling.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let vazifaInput = document.getElementById("vazifaInput")
let qoshTugmasi = document.getElementById("qoshTugmasi")
let royxatElement = document.getElementById("royxat")

qoshTugmasi.onclick = () => {
  let liElement = document.createElement("li")
  liElement.textContent = vazifaInput.value

  let ochirTugmasi = document.createElement("button")
  ochirTugmasi.textContent = "X"
  ochirTugmasi.onclick = () => {
    liElement.remove()
  }

  liElement.appendChild(ochirTugmasi)
  royxatElement.appendChild(liElement)
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="5-vazifa: setAttribute bilan rasm manzilini o'zgartirish">
        <p>
          HTML: <code>{'<img id="rasm" />'}</code>,{' '}
          <code>{`<button id="ozgartirTugmasi">Rasmni o'zgartirish</button>`}</code>.
          Tugma bosilganda <code>setAttribute()</code> yordamida{' '}
          <code>rasm</code>ning <code>src</code> atributini{' '}
          <code>"yangi-rasm.png"</code>ga, <code>alt</code> atributini esa{' '}
          <code>"Yangi rasm"</code>ga o'zgartiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let rasm = document.getElementById("rasm")
let ozgartirTugmasi = document.getElementById("ozgartirTugmasi")

ozgartirTugmasi.onclick = () => {
  rasm.setAttribute("src", "yangi-rasm.png")
  rasm.setAttribute("alt", "Yangi rasm")
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="6-vazifa: getAttribute bilan mahsulot ID'sini o'qish">
        <p>
          HTML: <code>{'<div id="karta" data-mahsulot-id="7"></div>'}</code>,{' '}
          <code>{`<button id="korTugmasi">ID'ni ko'rsat</button>`}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. Tugma bosilganda{' '}
          <code>getAttribute("data-mahsulot-id")</code> yordamida qiymatni olib,{' '}
          <code>"Mahsulot ID: 7"</code> deb <code>natija</code>ga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let karta = document.getElementById("karta")
let korTugmasi = document.getElementById("korTugmasi")
let natijaElement = document.getElementById("natija")

korTugmasi.onclick = () => {
  let id = karta.getAttribute("data-mahsulot-id")
  natijaElement.textContent = "Mahsulot ID: " + id
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>document.createElement(teg)</code> — yangi elementni yaratadi, lekin u
          hali sahifada ko'rinmaydi.
        </li>
        <li>
          <code>appendChild()</code> — yaratilgan (yoki mavjud) elementni boshqa
          elementning ichiga, oxiriga qo'shadi va shu bilan sahifada ko'rinadigan qiladi.
        </li>
        <li>
          Odatiy naqsh: <code>createElement()</code> → <code>.textContent</code>/
          <code>.style</code> bilan to'ldirish → <code>appendChild()</code>.
        </li>
        <li>
          <code>.remove()</code> — elementni DOM'dan butunlay olib tashlaydi (
          <code>classList</code> bilan yashirishdan farqli, uni qaytarib bo'lmaydi).
        </li>
        <li>
          <code>setAttribute(nom, qiymat)</code> va <code>getAttribute(nom)</code> —
          istalgan HTML atributini (shu jumladan <code>data-*</code>) yozish va
          o'qishning universal usuli.
        </li>
      </KeyPoints>
    </>
  )
}
