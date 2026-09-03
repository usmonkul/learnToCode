import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Amaliyot: real loyihalar',
  section: 'DOM bilan ishlash',
}

export default function DomPracticeLesson() {
  return (
    <>
      <p>
        7-10 darslarda DOM bilan ishlash uchun to'liq asboblar to'plamini yig'dik. Bu darsda
        yangi mavzu yo'q — buning o'rniga hammasini birlashtirib, ikkita real hayotiy misolni
        boshidan oxirigacha yechamiz, so'ng siz uchun mustaqil bajarish uchun yana oltita real
        vazifa qoldiramiz.
      </p>
      <Callout type="note" title="Asboblar to'plami — qisqa eslatma">
        <ul>
          <li>
            <code>document.getElementById()</code> / <code>document.querySelector()</code> —
            elementni tanlash (7-dars)
          </li>
          <li>
            <code>.textContent</code> — elementga matn yozish/o'qish (7-dars)
          </li>
          <li>
            <code>element.onclick = function () {'{ ... }'}</code> — tugma bosilganda kod
            ishga tushirish (8-dars)
          </li>
          <li>
            <code>.style.property</code> — bitta-ikkita CSS xususiyatini to'g'ridan-to'g'ri
            o'zgartirish (8-dars)
          </li>
          <li>
            <code>.value</code> — <code>{'<input>'}</code> va <code>{'<select>'}</code>dan
            qiymat olish (9-dars)
          </li>
          <li>
            <code>classList.add()</code> / <code>remove()</code> / <code>toggle()</code> —
            CSS klasslarni yoqib/o'chirish orqali ko'rinishni boshqarish (10-dars)
          </li>
        </ul>
      </Callout>

      <h2>1-holat: Ro'yxatdan o'tish formasi</h2>
      <p>
        Real saytlarda ro'yxatdan o'tish formasi bir nechta bosqichda tekshiriladi: maydonlar
        bo'shmi, qiymatlar to'g'rimi, va nihoyat foydalanuvchidan tasdiq so'raladi. Keling,
        buni to'liq yozamiz.
      </p>
      <CodeBlock lang="html">{`<!DOCTYPE html>
<html lang="uz">
  <body>
    <input type="text" id="ismInput" placeholder="Ismingiz" />
    <input type="number" id="yoshInput" placeholder="Yoshingiz" />
    <select id="shaharSelect">
      <option value="toshkent">Toshkent</option>
      <option value="samarqand">Samarqand</option>
      <option value="buxoro">Buxoro</option>
    </select>
    <button id="royxatTugmasi">Ro'yxatdan o'tish</button>
    <p id="natija"></p>

    <script src="script.js"></script>
  </body>
</html>`}</CodeBlock>
      <CodeBlock lang="css">{`.xato {
  border: 2px solid red;
}
.muvaffaqiyat {
  color: green;
  font-weight: bold;
}`}</CodeBlock>
      <CodeBlock lang="javascript">{`let ismInput = document.getElementById("ismInput")
let yoshInput = document.getElementById("yoshInput")
let shaharSelect = document.getElementById("shaharSelect")
let royxatTugmasi = document.getElementById("royxatTugmasi")
let natijaElement = document.getElementById("natija")

royxatTugmasi.onclick = function () {
  let ism = ismInput.value
  let yosh = Number(yoshInput.value)
  let shahar = shaharSelect.value

  if (ism === "") {
    ismInput.classList.add("xato")
    natijaElement.textContent = "Iltimos, ismingizni kiriting"
  } else if (yosh < 13) {
    ismInput.classList.remove("xato")
    yoshInput.classList.add("xato")
    natijaElement.textContent = "Ro'yxatdan o'tish uchun kamida 13 yosh bo'lishi kerak"
  } else {
    ismInput.classList.remove("xato")
    yoshInput.classList.remove("xato")

    let tasdiqlaydimi = confirm(\`\${ism}, ma'lumotlaringiz to'g'rimi? Shahar: \${shahar}\`)

    if (tasdiqlaydimi) {
      natijaElement.textContent = \`Xush kelibsiz, \${ism}!\`
      natijaElement.classList.add("muvaffaqiyat")
    } else {
      natijaElement.textContent = "Ro'yxatdan o'tish bekor qilindi"
    }
  }
}`}</CodeBlock>
      <p>
        E'tibor bering: har bir shart o'zining klassini mustaqil boshqaradi —{' '}
        <code>else if</code>/<code>else</code>ga o'tganda oldingi bosqichning{' '}
        <code>"xato"</code> klassi <code>remove()</code> bilan tozalanadi. Aks holda, bir
        marta xato qilingan maydon keyinchalik to'g'irlansa ham qizil chegarali bo'lib
        qolaverardi.
      </p>

      <h2>2-holat: Xarid savati hisoblagichi</h2>
      <p>
        Onlayn-do'konlarda "savatga qo'shish" tugmasi odatda: qiymatlarni tekshiradi,
        umumiy summani hisoblaydi, muvaffaqiyat xabarini ko'rsatadi va formani tozalab,
        keyingi mahsulot uchun tayyorlaydi.
      </p>
      <CodeBlock lang="html">{`<input type="number" id="narxInput" placeholder="Narxi" />
<input type="number" id="sonInput" placeholder="Miqdori" />
<button id="qoshTugmasi">Savatga qo'shish</button>
<p id="savatNatija"></p>`}</CodeBlock>
      <CodeBlock lang="javascript">{`let narxInput = document.getElementById("narxInput")
let sonInput = document.getElementById("sonInput")
let qoshTugmasi = document.getElementById("qoshTugmasi")
let savatNatijaElement = document.getElementById("savatNatija")

qoshTugmasi.onclick = function () {
  if (narxInput.value === "" || sonInput.value === "") {
    narxInput.classList.add("xato")
    sonInput.classList.add("xato")
    savatNatijaElement.textContent = "Narx va miqdorni kiriting"
  } else {
    narxInput.classList.remove("xato")
    sonInput.classList.remove("xato")

    let narx = Number(narxInput.value)
    let son = Number(sonInput.value)
    let umumiy = narx * son

    savatNatijaElement.textContent = \`Savatga qo'shildi: \${son} dona, umumiy narx \${umumiy} so'm\`
    savatNatijaElement.classList.add("muvaffaqiyat")

    narxInput.value = ""
    sonInput.value = ""
  }
}`}</CodeBlock>
      <Callout type="tip" title="Inputni tozalash">
        <code>{'input.value = ""'}</code> — inputning joriy qiymatini bo'sh matnga
        o'zgartiradi, ya'ni maydonni vizual ravishda tozalaydi. Muvaffaqiyatli yuborilgan
        formalarda foydalanuvchini keyingi kiritishga tayyorlash uchun juda keng
        qo'llaniladi.
      </Callout>
      <Quiz
        question={`Yuqoridagi 2-holatda, narxInput.value === "" tekshiruvi Number(narxInput.value) === 0 tekshiruvidan nima uchun afzalroq?`}
        options={[
          "Ular bir xil natija beradi, farqi yo'q",
          "Foydalanuvchi narx sifatida haqiqatan ham 0 kiritishi mumkin — bu bo'sh maydon bilan bir xil emas",
          "value === \"\" ishlamaydi, chunki value har doim son qaytaradi",
          "Number(narxInput.value) har doim NaN qaytaradi"
        ]}
        correctIndex={1}
        explanation={`Agar mahsulot bepul (narx = 0) bo'lsa, Number(...) === 0 tekshiruvi uni ham "bo'sh" deb noto'g'ri belgilab qo'yardi. value === "" esa faqat maydon haqiqatan bo'sh qoldirilganini tekshiradi.`}
      />
      <Quiz
        question={`1-holatdagi kodda ismInput.classList.remove("xato") nima uchun else if va else bloklarining har ikkalasida ham chaqiriladi?`}
        options={[
          "Bu xato, faqat bir marta chaqirilishi kerak edi",
          "Chunki ism shart bekor bo'lgandan keyin, keyingi tekshiruvlarga o'tganda, oldin qo'shilgan bo'lishi mumkin bo'lgan \"xato\" klassini tozalash kerak",
          "remove() har doim ikki marta chaqirilishi shart",
          "classList faqat ikki marta chaqirilganda ishlaydi"
        ]}
        correctIndex={1}
        explanation={`Agar foydalanuvchi avval ismni bo'sh qoldirib xato olgan, keyin to'g'irlab qayta bossa, ismInput hali "xato" klassiga ega bo'lishi mumkin — shuning uchun ism sharti o'tib ketgan har bir keyingi bosqichda uni tozalash kerak.`}
      />

      <h2>Amaliyot: mustaqil vazifalar</h2>
      <p>
        Endi navbat sizda. Har bir vazifa haqiqiy loyihalarda uchraydigan holatga
        asoslangan — o'rgangan barcha vositalardan (tanlash, <code>.value</code>,{' '}
        <code>onclick</code>, <code>.style</code>, <code>classList</code>,{' '}
        <code>prompt</code>/<code>confirm</code>) kerakli birikmasidan foydalaning.
      </p>

      <Exercise title="1-vazifa: Izoh qoldirish formasi">
        <p>
          HTML: <code>{'<input type="text" id="izohInput" />'}</code>,{' '}
          <code>{'<button id="yuborTugmasi">Izoh qoldirish</button>'}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. CSS'da <code>.xato</code> va{' '}
          <code>.muvaffaqiyat</code> klasslari bor (1-holatdagi kabi). Agar izoh bo'sh
          bo'lsa, inputga <code>"xato"</code> klassini qo'shib xabar bering. Aks holda,{' '}
          <code>"muvaffaqiyat"</code> klassi bilan "Izohingiz uchun rahmat!" deb yozing va
          inputni tozalang.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let izohInput = document.getElementById("izohInput")
let yuborTugmasi = document.getElementById("yuborTugmasi")
let natijaElement = document.getElementById("natija")

yuborTugmasi.onclick = function () {
  if (izohInput.value === "") {
    izohInput.classList.add("xato")
    natijaElement.textContent = "Izoh bo'sh bo'lishi mumkin emas"
  } else {
    izohInput.classList.remove("xato")
    natijaElement.textContent = "Izohingiz uchun rahmat!"
    natijaElement.classList.add("muvaffaqiyat")
    izohInput.value = ""
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Kino chiptasi narxini hisoblash">
        <p>
          HTML: <code>{'<select id="chiptaSelect">'}</code> ichida{' '}
          <code>{'<option value="oddiy">Oddiy — 20000</option>'}</code> va{' '}
          <code>{'<option value="vip">VIP — 50000</option>'}</code>,{' '}
          <code>{'<button id="sotibOlTugmasi">Sotib olish</button>'}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. Tugma bosilganda tanlangan bilet turiga
          qarab (<code>switch</code> yordamida) narxni aniqlang,{' '}
          <code>confirm()</code> bilan "Sotib olishni tasdiqlaysizmi?" deb so'rang, rozi
          bo'lsa "Chipta sotib olindi: &lt;narx&gt; so'm" deb yozing, aks holda "Bekor
          qilindi" deb yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let chiptaSelect = document.getElementById("chiptaSelect")
let sotibOlTugmasi = document.getElementById("sotibOlTugmasi")
let natijaElement = document.getElementById("natija")

sotibOlTugmasi.onclick = function () {
  let tur = chiptaSelect.value
  let narx = 0

  switch (tur) {
    case "oddiy":
      narx = 20000
      break
    case "vip":
      narx = 50000
      break
  }

  let tasdiqlaydimi = confirm("Sotib olishni tasdiqlaysizmi?")

  if (tasdiqlaydimi) {
    natijaElement.textContent = \`Chipta sotib olindi: \${narx} so'm\`
  } else {
    natijaElement.textContent = "Bekor qilindi"
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Sevimlilarga qo'shish tugmasi">
        <p>
          CSS'da <code>{'.sevimli { color: red; }'}</code> bor. HTML:{' '}
          <code>{`<button id="sevimliTugmasi">♡ Sevimlilarga qo'shish</button>`}</code>.
          Tugma bosilganda tugmaning o'zida <code>"sevimli"</code> klassini{' '}
          <code>toggle()</code> qiling; <code>toggle()</code>ning qaytargan qiymatidan
          foydalanib, tugma matnini <code>"♥ Sevimlilarda"</code> yoki{' '}
          <code>"♡ Sevimlilarga qo'shish"</code>ga almashtiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let sevimliTugmasi = document.getElementById("sevimliTugmasi")

sevimliTugmasi.onclick = function () {
  let sevimlimi = sevimliTugmasi.classList.toggle("sevimli")

  if (sevimlimi) {
    sevimliTugmasi.textContent = "♥ Sevimlilarda"
  } else {
    sevimliTugmasi.textContent = "♡ Sevimlilarga qo'shish"
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Ko'p tilli salomlashish">
        <p>
          HTML: <code>{'<select id="tilSelect">'}</code> ichida{' '}
          <code>{`<option value="uz">O'zbekcha</option>`}</code>,{' '}
          <code>{'<option value="ru">Ruscha</option>'}</code>,{' '}
          <code>{'<option value="en">Inglizcha</option>'}</code>,{' '}
          <code>{'<button id="salomTugmasi">Salomlashish</button>'}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. <code>switch</code> yordamida tanlangan
          tilga qarab mos tilda salomlashish xabarini (masalan "Salom!", "Привет!",
          "Hello!") chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let tilSelect = document.getElementById("tilSelect")
let salomTugmasi = document.getElementById("salomTugmasi")
let natijaElement = document.getElementById("natija")

salomTugmasi.onclick = function () {
  let til = tilSelect.value

  switch (til) {
    case "uz":
      natijaElement.textContent = "Salom!"
      break
    case "ru":
      natijaElement.textContent = "Привет!"
      break
    case "en":
      natijaElement.textContent = "Hello!"
      break
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="5-vazifa: Chegaradan oshganda ogohlantirish">
        <p>
          CSS'da <code>{'.limit { color: red; font-weight: bold; }'}</code> bor. HTML:{' '}
          <code>{'<button id="bosishTugmasi">Bos!</button>'}</code>,{' '}
          <code>{'<p id="son">0</p>'}</code>. Har bosishda son bittaga oshsin. Son 10dan
          oshib ketsa, <code>son</code> elementiga <code>"limit"</code> klassini qo'shib,
          uning yoniga (yangi qatorga emas, xuddi shu elementga) " — limit oshib ketdi!" deb
          qo'shib yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let bosishTugmasi = document.getElementById("bosishTugmasi")
let sonElement = document.getElementById("son")
let hisob = 0

bosishTugmasi.onclick = function () {
  hisob = hisob + 1

  if (hisob > 10) {
    sonElement.textContent = \`\${hisob} — limit oshib ketdi!\`
    sonElement.classList.add("limit")
  } else {
    sonElement.textContent = hisob
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="6-vazifa: Kirish/chiqish tugmasi">
        <p>
          CSS'da <code>{'.yashirin { display: none; }'}</code> bor. HTML:{' '}
          <code>{'<button id="holatTugmasi">Kirish</button>'}</code>,{' '}
          <code>{`<p id="profilPaneli">Profil ma'lumotlari</p>`}</code>. Boshida{' '}
          <code>profilPaneli</code> <code>"yashirin"</code> klassiga ega. Tugma bosilganda:
          agar hozir "Kirish" deb yozilgan bo'lsa — matnini "Chiqish"ga o'zgartirib,{' '}
          <code>profilPaneli</code>dan <code>"yashirin"</code>ni olib tashlang; aks holda —
          matnini yana "Kirish"ga qaytarib, <code>profilPaneli</code>ga{' '}
          <code>"yashirin"</code>ni qayta qo'shing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let holatTugmasi = document.getElementById("holatTugmasi")
let profilPaneliElement = document.getElementById("profilPaneli")

holatTugmasi.onclick = function () {
  if (holatTugmasi.textContent === "Kirish") {
    holatTugmasi.textContent = "Chiqish"
    profilPaneliElement.classList.remove("yashirin")
  } else {
    holatTugmasi.textContent = "Kirish"
    profilPaneliElement.classList.add("yashirin")
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Real formalar odatda bir nechta shartni ketma-ket tekshiradi — har bir bosqich
          o'z xato holatini qo'shadi va oldingi bosqichlarning xato holatini tozalaydi.
        </li>
        <li>
          <code>{'input.value = ""'}</code> — muvaffaqiyatli yuborilgan formani tozalash
          uchun ishlatiladi.
        </li>
        <li>
          Bo'sh maydonni tekshirishda <code>{'value === ""'}</code>ni sonli tekshiruvdan
          (<code>{'=== 0'}</code>) ajrata bilish kerak — ular boshqa-boshqa holatlar.
        </li>
        <li>
          <code>onclick</code>, <code>.value</code>, <code>.textContent</code>,{' '}
          <code>.style</code>/<code>classList</code> va <code>prompt</code>/
          <code>confirm</code> — barchasi bitta funksiya ichida erkin birlashtiriladi, aynan
          shu birikma real veb-ilovalarning asosini tashkil qiladi.
        </li>
      </KeyPoints>
    </>
  )
}
