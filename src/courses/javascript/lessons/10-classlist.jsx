import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'classList: CSS klasslarni boshqarish',
  section: 'DOM bilan ishlash',
}

export default function ClassListLesson() {
  return (
    <>
      <p>
        8-darsda elementning ko'rinishini <code>.style.color</code>,{' '}
        <code>.style.backgroundColor</code> kabi xususiyatlarni birma-bir o'zgartirib
        boshqargan edik. Bu usul bir-ikkita xususiyat uchun ishlaydi, lekin bir vaqtning
        o'zida 5-6 ta xususiyatni (rang, fon, chegara, shrift o'lchami...) o'zgartirish kerak
        bo'lsa, kod tezda uzun va chalkash bo'lib qoladi. Haqiqiy veb-ilovalarda buning
        o'rniga <strong>CSS klasslarni</strong> yoqib/o'chirish ishlatiladi — bu darsda aynan
        shuni, <code>classList</code> orqali o'rganamiz.
      </p>

      <h2>G'oya: stil emas, klass boshqariladi</h2>
      <p>
        Avval CSS'da tayyor klass yozamiz — bu klass qanday ko'rinish berishini belgilaydi:
      </p>
      <CodeBlock lang="css">{`.active {
  color: green;
  font-weight: bold;
  background-color: #e6ffed;
}`}</CodeBlock>
      <p>
        Endi JavaScript'da bu klassning barcha xususiyatlarini birma-bir yozish o'rniga,
        shunchaki elementga <code>"active"</code> klassini <strong>qo'shamiz</strong> yoki{' '}
        <strong>olib tashlaymiz</strong> — ko'rinish esa CSS orqali avtomatik hal bo'ladi.
        Buning uchun har bir DOM elementida <code>.classList</code> degan maxsus ob'ekt
        mavjud.
      </p>

      <h2>
        <code>classList.add()</code> — klass qo'shish
      </h2>
      <p>Elementga bitta (yoki bir nechta) klass nomini qo'shadi:</p>
      <CodeBlock lang="html">{`<p id="xabar">Bu xabar</p>`}</CodeBlock>
      <CodeBlock lang="javascript">{`let xabarElement = document.getElementById("xabar")
xabarElement.classList.add("active")
// natija: <p id="xabar" class="active">Bu xabar</p>`}</CodeBlock>
      <Callout type="tip" title="add() xavfsiz, qayta-qayta chaqirsa ham bo'ladi">
        Agar element allaqachon <code>"active"</code> klassiga ega bo'lsa,{' '}
        <code>classList.add("active")</code>ni yana chaqirish hech qanday xatolikka olib
        kelmaydi va hech narsani ikki marta qo'shib qo'ymaydi — u shunchaki "bu klass hozir
        bor ekanligiga ishonch hosil qil" degani.
      </Callout>

      <h2>
        <code>classList.remove()</code> — klassni olib tashlash
      </h2>
      <p>
        <code>add()</code>ning teskarisi — elementdan berilgan klassni olib tashlaydi. Agar
        element o'sha klassga ega bo'lmasa ham, xatolik bermaydi:
      </p>
      <CodeBlock lang="javascript">{`xabarElement.classList.remove("active")
// natija: <p id="xabar" class="">Bu xabar</p>`}</CodeBlock>
      <p>
        Bu ayniqsa xatolik yoki ogohlantirish xabarlarini "tozalashda" foydali — masalan,
        foydalanuvchi xato ma'lumot kiritganda <code>"error"</code> klassi qo'shiladi, to'g'ri
        qiymat kiritilgach esa <code>remove("error")</code> bilan olib tashlanadi.
      </p>

      <h2>
        <code>classList.toggle()</code> — bor bo'lsa olib tashlash, yo'q bo'lsa qo'shish
      </h2>
      <p>
        <code>toggle()</code> — <code>add()</code> va <code>remove()</code>ni bitta metodda
        birlashtirgan holati: agar klass hozir bor bo'lsa, uni olib tashlaydi; yo'q bo'lsa,
        qo'shadi. Bu "yoqish/o'chirish" (masalan, menyuni ochish/yopish, "like" tugmasi,
        dark mode) kabi holatlar uchun aynan mos keladi:
      </p>
      <CodeBlock lang="javascript">{`let tugma = document.getElementById("yoqdiTugmasi")

tugma.onclick = function () {
  tugma.classList.toggle("yoqilgan")
}
// birinchi bosishda: "yoqilgan" klassi qo'shiladi
// ikkinchi bosishda: "yoqilgan" klassi olib tashlanadi
// va hokazo, har bosishda holat almashadi`}</CodeBlock>
      <p>
        <code>toggle()</code> yana bir foydali xususiyatga ega — u{' '}
        <strong>boolean qaytaradi</strong>: klass qo'shilgan bo'lsa <code>true</code>, olib
        tashlangan bo'lsa <code>false</code>. Bu natijadan 6-darsda o'rgangan{' '}
        <code>if</code> bilan birga foydalanish mumkin:
      </p>
      <CodeBlock lang="javascript">{`let natijaElement = document.getElementById("natija")

tugma.onclick = function () {
  let yoqilganmi = tugma.classList.toggle("yoqilgan")

  if (yoqilganmi) {
    natijaElement.textContent = "Sizga yoqdi!"
  } else {
    natijaElement.textContent = "Yoqtirish bekor qilindi"
  }
}`}</CodeBlock>
      <Callout type="note" title="Bonus: classList.contains()">
        <code>add</code>/<code>remove</code>/<code>toggle</code>dan tashqari,{' '}
        <code>classList.contains("nomi")</code> ham mavjud — element berilgan klassga ega
        yoki yo'qligini tekshirib, boolean qaytaradi. Ko'pincha holatni tekshirib, unga
        qarab boshqa amal bajarish kerak bo'lganda ishlatiladi:{' '}
        <code>{'if (element.classList.contains("active")) { ... }'}</code>.
      </Callout>
      <Quiz
        question={`Element "yashirin" klassiga ega emas. element.classList.toggle("yashirin") ikki marta ketma-ket chaqirilsa, oxirida element bu klassga egami?`}
        options={[
          "Ha, chunki toggle har chaqirilganda qo'shadi",
          "Yo'q — birinchi chaqiruvda qo'shiladi, ikkinchisida yana olib tashlanadi",
          "Xatolik yuz beradi, chunki klass mavjud emas edi",
          'Bu classList.add() bilan bir xil ishlaydi'
        ]}
        correctIndex={1}
        explanation={`toggle() har chaqirilganda holatni almashtiradi: birinchi chaqiruv klassni qo'shadi, ikkinchisi uni yana olib tashlaydi — natijada element boshlang'ich holatiga qaytadi.`}
      />
      <Quiz
        question={`.style.color = "red" bilan .classList.add("xato")ni solishtirganda, classList qaysi jihatdan afzalroq?`}
        options={[
          "classList tezroq ishlaydi, boshqa farqi yo'q",
          "classList orqali bir nechta CSS xususiyatini (rang, fon, shrift va h.k.) bitta nom bilan, CSS faylida markazlashtirib boshqarish mumkin",
          ".style hech qachon ishlatilmasligi kerak",
          "classList faqat tugmalar uchun ishlaydi"
        ]}
        correctIndex={1}
        explanation={`classList bilan ko'rinishning "qanday"ligi (rang, fon, chegara...) CSS faylida bir joyda saqlanadi, JavaScript esa faqat qaysi holat (klass) yoqilganini boshqaradi — bu kodni ancha tozaroq va boshqarish osonroq qiladi.`}
      />

      <h2>Yana bir misol: panelni ko'rsatish/yashirish</h2>
      <p>
        8-darsda <code>style.display = "none"</code> bilan elementni yashirgan edik. Xuddi
        shu natijani classList bilan ham, ko'proq qayta ishlatiladigan tarzda olish mumkin:
      </p>
      <CodeBlock lang="css">{`.yashirin {
  display: none;
}`}</CodeBlock>
      <CodeBlock lang="javascript">{`let panelElement = document.getElementById("panel")
let tugma = document.getElementById("panelTugmasi")

tugma.onclick = function () {
  panelElement.classList.toggle("yashirin")
}`}</CodeBlock>

      <h2>Amaliyot</h2>
      <p>
        Har bir vazifada mos HTML va CSS klass mavjud deb tasavvur qiling (yoki o'zingizning{' '}
        <code>.html</code>/<code>.css</code> fayllaringizga qo'shib sinab ko'ring).
      </p>

      <Exercise title="1-vazifa: Muvaffaqiyat xabari">
        <p>
          CSS'da <code>{'.success { color: green; font-weight: bold; }'}</code> bor. HTML:{' '}
          <code>{'<button id="yuborTugmasi">Yuborish</button>'}</code>,{' '}
          <code>{'<p id="natija">Forma yuborilmadi</p>'}</code>. Tugma bosilganda{' '}
          <code>natija</code>ga <code>"success"</code> klassini qo'shing va matnini{' '}
          <code>"Forma muvaffaqiyatli yuborildi"</code>ga o'zgartiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let yuborTugmasi = document.getElementById("yuborTugmasi")
let natijaElement = document.getElementById("natija")

yuborTugmasi.onclick = function () {
  natijaElement.classList.add("success")
  natijaElement.textContent = "Forma muvaffaqiyatli yuborildi"
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Xatolikni bekor qilish">
        <p>
          HTML: <code>{'<p id="xabar" class="error">Xatolik yuz berdi</p>'}</code>,{' '}
          <code>{'<button id="tozalaTugmasi">Tozalash</button>'}</code>. Tugma bosilganda{' '}
          <code>xabar</code>dan <code>"error"</code> klassini olib tashlang va matnini bo'sh
          qatorga o'zgartiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let tozalaTugmasi = document.getElementById("tozalaTugmasi")
let xabarElement = document.getElementById("xabar")

tozalaTugmasi.onclick = function () {
  xabarElement.classList.remove("error")
  xabarElement.textContent = ""
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Menyuni ochish/yopish">
        <p>
          CSS'da <code>{'.ochiq { display: block; }'}</code> va menyu boshida yashirin (
          <code>display: none</code>) deb tasavvur qiling. HTML:{' '}
          <code>{'<button id="menyuTugmasi">☰ Menyu</button>'}</code>,{' '}
          <code>{'<nav id="menyu">...</nav>'}</code>. Tugma bosilganda <code>menyu</code>da{' '}
          <code>"ochiq"</code> klassini <code>toggle()</code> qiling.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let menyuTugmasi = document.getElementById("menyuTugmasi")
let menyuElement = document.getElementById("menyu")

menyuTugmasi.onclick = function () {
  menyuElement.classList.toggle("ochiq")
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Yoqdi/bekor qilish tugmasi">
        <p>
          CSS'da <code>{'.yoqilgan { color: red; font-weight: bold; }'}</code> bor. HTML:{' '}
          <code>{'<button id="yoqdiTugmasi">❤️ Yoqdi</button>'}</code>,{' '}
          <code>{'<p id="holat"></p>'}</code>. Tugma bosilganda tugmaning o'zida{' '}
          <code>"yoqilgan"</code> klassini <code>toggle()</code> qiling. Uning qaytargan
          qiymatidan foydalanib, <code>holat</code>ga "Sizga yoqdi!" yoki "Yoqtirish bekor
          qilindi" deb yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let yoqdiTugmasi = document.getElementById("yoqdiTugmasi")
let holatElement = document.getElementById("holat")

yoqdiTugmasi.onclick = function () {
  let yoqilganmi = yoqdiTugmasi.classList.toggle("yoqilgan")

  if (yoqilganmi) {
    holatElement.textContent = "Sizga yoqdi!"
  } else {
    holatElement.textContent = "Yoqtirish bekor qilindi"
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="5-vazifa: Qorong'i rejim tugmasi">
        <p>
          CSS'da <code>{'.dark { background-color: #111; color: white; }'}</code> bor. HTML:{' '}
          <code>{`<button id="temaTugmasi">🌙 Qorong'i rejim</button>`}</code>,{' '}
          <code>{'<body id="sahifa">...</body>'}</code>. Tugma bosilganda{' '}
          <code>sahifa</code>da <code>"dark"</code> klassini <code>toggle()</code> qiling.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let temaTugmasi = document.getElementById("temaTugmasi")
let sahifaElement = document.getElementById("sahifa")

temaTugmasi.onclick = function () {
  sahifaElement.classList.toggle("dark")
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="6-vazifa: Input validatsiyasi klass bilan">
        <p>
          CSS'da <code>{'.xato { border: 2px solid red; }'}</code> bor. HTML:{' '}
          <code>{'<input type="text" id="ismInput" />'}</code>,{' '}
          <code>{'<button id="tekshirTugmasi">Tekshirish</button>'}</code>. Tugma bosilganda
          agar <code>ismInput</code> bo'sh bo'lsa, unga <code>"xato"</code> klassini
          qo'shing; bo'sh bo'lmasa, aksincha, <code>"xato"</code> klassini olib tashlang
          (9-darsdagi bo'sh maydonni tekshirishni <code>classList</code> bilan
          birlashtiring).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let ismInput = document.getElementById("ismInput")
let tekshirTugmasi = document.getElementById("tekshirTugmasi")

tekshirTugmasi.onclick = function () {
  if (ismInput.value === "") {
    ismInput.classList.add("xato")
  } else {
    ismInput.classList.remove("xato")
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>classList</code> — elementning ko'rinishini xususiyat-baxususiyat (
          <code>.style</code>) emas, oldindan CSS'da tayyorlangan klasslarni yoqib/o'chirib
          boshqarish usuli.
        </li>
        <li>
          <code>classList.add("nomi")</code> — klass qo'shadi; qayta chaqirilsa ham xatolik
          bermaydi.
        </li>
        <li>
          <code>classList.remove("nomi")</code> — klassni olib tashlaydi; klass mavjud
          bo'lmasa ham xatolik bermaydi.
        </li>
        <li>
          <code>classList.toggle("nomi")</code> — bor bo'lsa olib tashlaydi, yo'q bo'lsa
          qo'shadi; natijada klass qo'shilgan-qo'shilmaganini bildiruvchi{' '}
          <code>boolean</code> qaytaradi.
        </li>
        <li>
          <code>classList.contains("nomi")</code> — element o'sha klassga ega yoki yo'qligini
          tekshiradi.
        </li>
        <li>
          classList yondashuvi kodni tozaroq qiladi: CSS "qanday ko'rinish"ni, JavaScript
          esa faqat "qaysi holat yoqilgan"ligini boshqaradi.
        </li>
      </KeyPoints>
    </>
  )
}
