import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'addEventListener va innerHTML',
  section: 'DOM: kengaytirilgan',
}

export default function AddEventListenerInnerHtmlLesson() {
  return (
    <>
      <p>
        8-darsdan buyon tugma bosilganda kod ishga tushirish uchun{' '}
        <code>element.onclick = function () {'{ ... }'}</code> ishlatib keldik. Bu
        usul oddiy vaziyatlar uchun yaxshi ishlaydi, lekin uning ikkita cheklovi bor:
        u faqat bitta hodisani (event, <code>click</code>) tinglaydi va bitta elementga faqat{' '}
        <strong>bitta</strong> funksiyani biriktirish mumkin. Bu darsda ancha
        moslashuvchan usul — <code>addEventListener()</code>ni, hamda{' '}
        <code>.textContent</code>dan farqli, HTML kodini ham qabul qiladigan{' '}
        <code>.innerHTML</code>ni o'rganamiz.
      </p>

      <h2>
        <code>addEventListener()</code> — hodisani tinglash
      </h2>
      <p>
        <code>addEventListener()</code> elementga "qaysi hodisani" va "hodisa yuz
        berganda qaysi funksiyani ishga tushirish"ni ikkita argument sifatida beradi:
      </p>
      <CodeBlock lang="javascript">{`let tugma = document.getElementById("tugma")

tugma.addEventListener("click", () => {
  alert("Tugma bosildi!")
})`}</CodeBlock>
      <p>
        Natija <code>onclick</code> bilan bir xil — lekin sintaksis farq qiladi: hodisa
        nomi (<code>"click"</code>) matn sifatida beriladi, funksiya esa ikkinchi
        argument sifatida.
      </p>

      <h2>onclick bilan solishtirganda: nima uchun addEventListener afzal?</h2>
      <p>
        <code>onclick</code>ga funksiya tayinlansa, u{' '}
        <strong>oldingi</strong> tayinlangan funksiyani almashtirib yuboradi — bitta
        elementga faqat bitta <code>onclick</code> ishlaydi:
      </p>
      <CodeBlock lang="javascript">{`let tugma = document.getElementById("tugma")

tugma.onclick = () => console.log("Birinchi")
tugma.onclick = () => console.log("Ikkinchi")

// Faqat "Ikkinchi" ishlaydi — birinchisi ustidan yozib yuborildi`}</CodeBlock>
      <p>
        <code>addEventListener()</code> esa bir nechta funksiyani <strong>qo'shib</strong>{' '}
        boradi — ularning barchasi ishga tushadi:
      </p>
      <CodeBlock lang="javascript">{`let tugma = document.getElementById("tugma")

tugma.addEventListener("click", () => console.log("Birinchi"))
tugma.addEventListener("click", () => console.log("Ikkinchi"))

// Tugma bosilganda ikkalasi ham ishlaydi: "Birinchi" va "Ikkinchi"`}</CodeBlock>
      <Callout type="tip" title="Amaliyotda qaysi birini ishlatish kerak?">
        <code>onclick</code> ham to'g'ri ishlaydi va o'rganish uchun oddiyroq, shuning
        uchun avvalgi darslarda undan foydalandik. Lekin real loyihalarda{' '}
        <code>addEventListener()</code> ko'proq tavsiya etiladi — u moslashuvchanroq va
        <code>click</code>dan tashqari boshqa ko'plab hodisalarni ham tinglay oladi.
      </Callout>

      <h2>Boshqa hodisa turlari</h2>
      <p>
        <code>addEventListener()</code>ning kuchi shundaki, u{' '}
        <code>click</code>dan tashqari ko'plab hodisalarni tinglay oladi. Eng ko'p
        ishlatiladiganlari:
      </p>
      <ul>
        <li>
          <code>"click"</code> — element bosilganda
        </li>
        <li>
          <code>"mouseover"</code> — sichqoncha element ustiga kelganda
        </li>
        <li>
          <code>"mouseout"</code> — sichqoncha elementdan chiqib ketganda
        </li>
        <li>
          <code>"input"</code> — inputga har bir belgi kiritilganda (real vaqtda)
        </li>
        <li>
          <code>"keydown"</code> — klaviaturadan tugma bosilganda
        </li>
      </ul>
      <CodeBlock lang="javascript">{`let quti = document.getElementById("quti")

quti.addEventListener("mouseover", () => {
  quti.style.backgroundColor = "yellow"
})

quti.addEventListener("mouseout", () => {
  quti.style.backgroundColor = "white"
})`}</CodeBlock>
      <p>
        <code>"input"</code> hodisasi ayniqsa foydali — u foydalanuvchi tugma bosishini
        kutmasdan, har bir harf kiritilganda darhol ishga tushadi:
      </p>
      <CodeBlock lang="javascript">{`let ismInput = document.getElementById("ismInput")
let natijaElement = document.getElementById("natija")

ismInput.addEventListener("input", () => {
  natijaElement.textContent = "Siz kiritdingiz: " + ismInput.value
})`}</CodeBlock>
      <Quiz
        question={`tugma.addEventListener("click", fn1) va tugma.addEventListener("click", fn2) ikkalasi ham yozilsa, tugma bosilganda nima bo'ladi?`}
        options={[
          'Faqat fn1 ishlaydi',
          'Faqat fn2 ishlaydi',
          'Ikkalasi ham ishlaydi',
          "Xatolik yuz beradi, chunki bitta elementga ikkita listener bo'lmaydi",
        ]}
        correctIndex={2}
        explanation="onclickdan farqli, addEventListener() funksiyalarni almashtirmaydi, balki qo'shib boradi — shuning uchun bir xil elementga qo'shilgan barcha listenerlar ishga tushadi."
      />

      <h2>
        <code>.innerHTML</code> — HTML kodini o'qish va yozish
      </h2>
      <p>
        7-darsda <code>.textContent</code> yordamida elementga oddiy matn yozishni
        o'rgandik. <code>.innerHTML</code> ham xuddi shunday ishlaydi, faqat u matnni{' '}
        <strong>HTML kodi</strong> sifatida talqin qiladi — ya'ni ichidagi teglar
        (masalan, <code>{'<strong>'}</code>, <code>{'<em>'}</code>) haqiqiy HTML
        elementlariga aylanadi:
      </p>
      <CodeBlock lang="javascript">{`let natijaElement = document.getElementById("natija")

natijaElement.textContent = "<strong>Salom!</strong>"
// Ekranda harfma-harf ko'rinadi: <strong>Salom!</strong>

natijaElement.innerHTML = "<strong>Salom!</strong>"
// Ekranda qalin qilib chiqadi: Salom!`}</CodeBlock>
      <p>
        <code>.innerHTML</code> orqali bir nechta elementni birdaniga qo'shish ham
        mumkin:
      </p>
      <CodeBlock lang="javascript">{`let natijaElement = document.getElementById("natija")

natijaElement.innerHTML = "<h3>Xush kelibsiz</h3><p>Bu sahifaga xush kelibsiz.</p>"`}</CodeBlock>
      <Callout type="danger" title="Xavfsizlik: innerHTML va foydalanuvchi ma'lumoti">
        <code>.innerHTML</code>ga <strong>foydalanuvchi kiritgan</strong> (masalan,{' '}
        <code>prompt()</code> yoki inputdan olingan) matnni to'g'ridan-to'g'ri qo'yish
        xavfli — agar foydalanuvchi <code>{'<script>...</script>'}</code> kabi kod
        kiritsa, u sahifada bajarilishi mumkin (bu XSS — cross-site scripting hujumi
        deb ataladi). Foydalanuvchi ma'lumotini chiqarish uchun har doim{' '}
        <code>.textContent</code>ni ishlating; <code>.innerHTML</code>ni faqat o'zingiz
        yozgan, ishonchli HTML uchun qo'llang.
      </Callout>

      <h2>Amaliy misol: massivdan HTML ro'yxat yasash</h2>
      <p>
        15-darsda o'rgangan <code>for</code> tsikli va <code>.innerHTML</code>ni
        birlashtirib, massivdan HTML ro'yxat yasash mumkin. HTML:{' '}
        <code>{'<ul id="royxat"></ul>'}</code>:
      </p>
      <CodeBlock lang="javascript">{`let mevalar = ["olma", "banan", "shaftoli"]
let royxatElement = document.getElementById("royxat")
let html = ""

for (let i = 0; i < mevalar.length; i++) {
  html += \`<li>\${mevalar[i]}</li>\`
}

royxatElement.innerHTML = html
// <ul id="royxat"><li>olma</li><li>banan</li><li>shaftoli</li></ul>`}</CodeBlock>
      <Quiz
        question="textContent va innerHTML orasidagi asosiy farq nima?"
        options={[
          'Ular bir xil, faqat nomi boshqa',
          "textContent matnni HTML kodi sifatida ko'rsatadi, innerHTML esa oddiy matn sifatida",
          "innerHTML matnni HTML kodi sifatida talqin qiladi (teglar ishlaydi), textContent esa hamma narsani oddiy matn sifatida ko'rsatadi",
          'textContent faqat raqamlar uchun, innerHTML faqat matn uchun ishlatiladi',
        ]}
        correctIndex={2}
        explanation="innerHTML ichidagi HTML teglarini haqiqiy elementlarga aylantiradi, textContent esa har qanday matnni (hatto <b> kabi belgilarni ham) o'zgarishsiz, harfma-harf ko'rsatadi."
      />

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: addEventListener bilan salomlashish">
        <p>
          HTML: <code>{'<button id="salomTugmasi">Salom ayt</button>'}</code>.{' '}
          <code>addEventListener("click", ...)</code> yordamida tugma bosilganda{' '}
          <code>alert("Salom!")</code> chiqaradigan kod yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let salomTugmasi = document.getElementById("salomTugmasi")

salomTugmasi.addEventListener("click", () => {
  alert("Salom!")
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Bir tugmaga ikkita listener">
        <p>
          Yuqoridagi <code>salomTugmasi</code>ga yana bitta{' '}
          <code>addEventListener("click", ...)</code> qo'shing — u{' '}
          <code>console.log("Tugma bosildi")</code> qilsin. Ikkala listener ham
          ishlashini tekshiring (alert ham chiqishi, konsolga ham yozilishi kerak).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let salomTugmasi = document.getElementById("salomTugmasi")

salomTugmasi.addEventListener("click", () => {
  alert("Salom!")
})

salomTugmasi.addEventListener("click", () => {
  console.log("Tugma bosildi")
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Sichqoncha ustiga kelganda rang o'zgarishi">
        <p>
          HTML: <code>{'<div id="quti" style="width: 100px; height: 100px; background: gray;"></div>'}</code>
          . <code>"mouseover"</code> hodisasida qutining fonini{' '}
          <code>"green"</code>ga, <code>"mouseout"</code> hodisasida qaytadan{' '}
          <code>"gray"</code>ga o'zgartiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let quti = document.getElementById("quti")

quti.addEventListener("mouseover", () => {
  quti.style.background = "green"
})

quti.addEventListener("mouseout", () => {
  quti.style.background = "gray"
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: innerHTML bilan qalin matn">
        <p>
          HTML: <code>{'<p id="natija"></p>'}</code>. <code>.innerHTML</code> yordamida{' '}
          <code>natija</code>ga <code>"Bu <strong>muhim</strong> xabar"</code> deb
          yozing, shunda "muhim" so'zi qalin bo'lib chiqsin.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let natijaElement = document.getElementById("natija")
natijaElement.innerHTML = "Bu <strong>muhim</strong> xabar"`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="5-vazifa: Talabalar ro'yxatini innerHTML bilan chiqarish">
        <p>
          HTML: <code>{'<ul id="royxat"></ul>'}</code>.{' '}
          <code>{'let talabalar = ["Aziz", "Vali", "Malika"]'}</code> massivi bor.{' '}
          <code>for</code> tsikli va <code>.innerHTML</code> yordamida har bir talabani{' '}
          <code>{'<li>'}</code> sifatida <code>royxat</code>ga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let talabalar = ["Aziz", "Vali", "Malika"]
let royxatElement = document.getElementById("royxat")
let html = ""

for (let i = 0; i < talabalar.length; i++) {
  html += \`<li>\${talabalar[i]}</li>\`
}

royxatElement.innerHTML = html`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="6-vazifa: Real vaqtda belgilar sonini ko'rsatish">
        <p>
          HTML: <code>{'<textarea id="matnInput"></textarea>'}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. <code>"input"</code> hodisasidan
          foydalanib, foydalanuvchi yozayotganda (har bir belgidan keyin) matnning
          uzunligini (<code>.value.length</code>) real vaqtda{' '}
          <code>natija</code>ga chiqarib turing (masalan, "Belgilar soni: 12").
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let matnInput = document.getElementById("matnInput")
let natijaElement = document.getElementById("natija")

matnInput.addEventListener("input", () => {
  natijaElement.textContent = "Belgilar soni: " + matnInput.value.length
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>addEventListener(hodisa, funksiya)</code> — elementga hodisa
          tinglovchisini qo'shadi; <code>onclick</code>dan farqli, bir nechta
          listenerni bir vaqtda ishlatish mumkin.
        </li>
        <li>
          <code>"click"</code>dan tashqari <code>"mouseover"</code>,{' '}
          <code>"mouseout"</code>, <code>"input"</code>, <code>"keydown"</code> kabi
          ko'plab hodisa turlari mavjud.
        </li>
        <li>
          <code>.innerHTML</code> — <code>.textContent</code>dan farqli, matn ichidagi
          HTML teglarini haqiqiy elementlarga aylantiradi.
        </li>
        <li>
          <code>.innerHTML</code>ga foydalanuvchi kiritgan ma'lumotni to'g'ridan-to'g'ri
          qo'ymaslik kerak — xavfsizlik uchun bunday holatlarda{' '}
          <code>.textContent</code> ishlatiladi.
        </li>
        <li>
          <code>for</code> tsikli va <code>.innerHTML</code>ni birlashtirib,
          massivdan dinamik HTML ro'yxat yasash mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
