import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Yakuniy loyiha: Ob-havo ilovasi",
  section: 'Yakuniy loyiha',
}

export default function FinalProjectWeatherAppLesson() {
  return (
    <>
      <p>
        Kursning boshida (1-dars) shu kursni Fundamentals'dagi to-do
        loyihasidan farqli qilib, konsol o'rniga <strong>haqiqiy DOM va
        haqiqiy API</strong> bilan ishlaydigan loyiha bilan yakunlashni
        va'da qilgan edik. Mana shu loyiha — <strong>ob-havo ilovasi</strong>:
        foydalanuvchi shahar qidiradi, haqiqiy ob-havo ma'lumotini ko'radi
        va sevimli shaharlarini saqlab, keyingi safar tezda qaytadan ochadi.
        Bu darsda 10-22-darslarda o'rgangan deyarli <strong>hamma
        narsa</strong> — closures, async/await, fetch, event delegation,
        localStorage, debounce, optional chaining — bitta ishlaydigan
        ilovada birlashadi.
      </p>

      <h2>Kerakli HTML</h2>
      <CodeBlock lang="html">{`<div class="obhavo-ilova">
  <div class="qidiruv-blok">
    <input type="text" id="shaharInput" placeholder="Shahar nomini kiriting..." />
    <ul id="qidiruvNatijalari"></ul>
  </div>

  <div id="joriyObHavo" class="obhavo-kartochka"></div>

  <h3>Saqlangan shaharlar</h3>
  <ul id="saqlanganShaharlar"></ul>
</div>`}</CodeBlock>
      <Callout type="tip" title="Nega Open-Meteo?">
        13-darsda aytilganidek, Open-Meteo — API kalit talab qilmaydigan,
        bepul ochiq API. Ikkita uchini ishlatamiz:{' '}
        <code>geocoding-api.open-meteo.com</code> (shahar nomidan
        koordinata topish) va <code>api.open-meteo.com</code>{' '}
        (koordinatadan ob-havo olish). Bu loyiha butunlay statik — hech
        qanday server yo'q, shuning uchun kalitsiz API'lar bu yerda yagona
        to'g'ri tanlov.
      </Callout>

      <h2>1-qadam: Boshlang'ich holat va DOM elementlari</h2>
      <CodeBlock lang="javascript">{`const shaharInput = document.getElementById("shaharInput")
const qidiruvNatijalariElement = document.getElementById("qidiruvNatijalari")
const joriyObHavoElement = document.getElementById("joriyObHavo")
const saqlanganShaharlarElement = document.getElementById("saqlanganShaharlar")

const SAQLASH_KALITI = "obhavoSaqlanganShaharlar"

let saqlanganShaharlar = JSON.parse(localStorage.getItem(SAQLASH_KALITI)) ?? [] // 18 va 8-darslardagi naqsh`}</CodeBlock>
      <p>
        <code>saqlanganShaharlar</code> — har biri{' '}
        <code>{'{ nom, davlat, kenglik, uzunlik }'}</code> ko'rinishidagi
        obyektlar massivi bo'ladi. Sahifa ochilishi bilanoq, avval
        localStorage'da nima bor bo'lsa — o'sha yuklanadi.
      </p>

      <h2>2-qadam: debounce funksiyasi</h2>
      <p>
        19-darsda yozgan <code>debounce</code>ni bu yerga ko'chiramiz — u
        qidiruv maydonining har bir harfda emas, foydalanuvchi
        to'xtaganidan keyin ishlashini ta'minlaydi:
      </p>
      <CodeBlock lang="javascript">{`function debounce(funksiya, kechikish) {
  let taymer
  return (...argumentlar) => {
    clearTimeout(taymer)
    taymer = setTimeout(() => funksiya(...argumentlar), kechikish)
  }
}`}</CodeBlock>

      <h2>3-qadam: Shaharni qidirish (geocoding)</h2>
      <p>
        13-darsdagi naqshni ishlatib, foydalanuvchi kiritgan nomga mos
        shaharlarni qidiramiz va natijalarni ro'yxat qilib ko'rsatamiz:
      </p>
      <CodeBlock lang="javascript">{`async function shaharlarniQidirish(nom) {
  if (nom.trim() === "") {
    qidiruvNatijalariElement.innerHTML = ""
    return
  }

  qidiruvNatijalariElement.innerHTML = "<li>Qidirilmoqda...</li>"

  try {
    const manzil = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(nom)
    const javob = await fetch(manzil)

    if (!javob.ok) throw new Error("Qidiruv muvaffaqiyatsiz")

    const malumot = await javob.json()
    const natijalar = malumot.results ?? [] // 8-darsdagi nullish coalescing — "results" bo'lmasligi mumkin

    qidiruvNatijalariniChizish(natijalar)
  } catch (xato) {
    qidiruvNatijalariElement.innerHTML = \`<li class="xatolik">Xatolik: \${xato.message}</li>\`
  }
}

const kechiktirilganQidiruv = debounce(shaharlarniQidirish, 400)

shaharInput.addEventListener("input", (event) => {
  kechiktirilganQidiruv(event.target.value)
})`}</CodeBlock>
      <p>Natijalarni ro'yxat qilib chizamiz — har birida "tanlash" uchun bosiladigan tugma:</p>
      <CodeBlock lang="javascript">{`function qidiruvNatijalariniChizish(natijalar) {
  if (natijalar.length === 0) {
    qidiruvNatijalariElement.innerHTML = "<li>Hech narsa topilmadi</li>"
    return
  }

  qidiruvNatijalariElement.innerHTML = natijalar
    .map((shahar, indeks) => \`
      <li class="natija-elementi" data-indeks="\${indeks}">
        \${shahar.name}, \${shahar.country}
      </li>
    \`)
    .join("")

  qidiruvNatijalariElement.dataset.natijalar = JSON.stringify(natijalar) // keyingi qadamda ishlatamiz
}`}</CodeBlock>
      <Callout type="note" title="Nega natijalarni data atributida saqlaymiz?">
        18-19-darslarda ko'rganingizdek, HTML elementlari faqat matn
        saqlaydi. Keyingi qadamda foydalanuvchi natijalardan birini
        bosganda, aynan qaysi shaharni tanlaganini bilishimiz kerak — buning
        eng oddiy yo'li, ro'yxatni chizib bo'lgach, to'liq ma'lumotni JSON
        ko'rinishida <code>dataset</code>ga "yashirib qo'yish".
      </Callout>

      <h2>4-qadam: Ob-havoni olish va ko'rsatish</h2>
      <p>
        Koordinata (kenglik, uzunlik) berilgan shahar uchun joriy ob-havoni
        so'raymiz — bu ham xuddi qidiruv kabi, uch holatli (yuklanmoqda /
        muvaffaqiyat / xatolik) naqsh bilan:
      </p>
      <CodeBlock lang="javascript">{`async function obHavoniKorsatish(shahar) {
  joriyObHavoElement.innerHTML = "<p>Yuklanmoqda...</p>"

  try {
    const manzil = \`https://api.open-meteo.com/v1/forecast?latitude=\${shahar.latitude}&longitude=\${shahar.longitude}&current_weather=true\`
    const javob = await fetch(manzil)

    if (!javob.ok) throw new Error("Ob-havo ma'lumoti topilmadi")

    const malumot = await javob.json()
    const obhavo = malumot.current_weather

    joriyObHavoElement.innerHTML = \`
      <h2>\${shahar.name}, \${shahar.country}</h2>
      <p class="harorat">\${obhavo.temperature}°C</p>
      <p>Shamol tezligi: \${obhavo.windspeed} km/soat</p>
      <button id="saqlashTugmasi">Saqlash ★</button>
    \`

    document.getElementById("saqlashTugmasi").addEventListener("click", () => {
      shaharniSaqlash(shahar)
    })
  } catch (xato) {
    joriyObHavoElement.innerHTML = \`<p class="xatolik">Xatolik: \${xato.message}</p>\`
  }
}`}</CodeBlock>
      <p>
        Endi qidiruv natijalaridan birini bosilganda shu funksiyani
        chaqiramiz — bu yerda 16-darsdagi <strong>event delegation</strong>{' '}
        ishlatiladi, chunki natijalar ro'yxati har qidiruvda{' '}
        <code>innerHTML</code> orqali butunlay qayta yaratiladi:
      </p>
      <CodeBlock lang="javascript">{`qidiruvNatijalariElement.addEventListener("click", (event) => {
  const elementi = event.target.closest(".natija-elementi") // 17-darsdagi closest()
  if (!elementi) return

  const natijalar = JSON.parse(qidiruvNatijalariElement.dataset.natijalar)
  const tanlanganShahar = natijalar[elementi.dataset.indeks]

  obHavoniKorsatish(tanlanganShahar)
  qidiruvNatijalariElement.innerHTML = ""
  shaharInput.value = ""
})`}</CodeBlock>

      <h2>5-qadam: Shaharni saqlash va saqlangan ro'yxatni chizish</h2>
      <CodeBlock lang="javascript">{`function shaharniSaqlash(shahar) {
  const allaqachonBormi = saqlanganShaharlar.some((s) => s.name === shahar.name && s.country === shahar.country) // 6-darsdagi some()

  if (allaqachonBormi) return

  saqlanganShaharlar = [...saqlanganShaharlar, shahar] // 7-darsdagi spread — o'zgartirmasdan yangi massiv
  localStorage.setItem(SAQLASH_KALITI, JSON.stringify(saqlanganShaharlar))
  saqlanganShaharlarniChizish()
}

function saqlanganShaharlarniChizish() {
  saqlanganShaharlarElement.innerHTML = saqlanganShaharlar
    .map((shahar, indeks) => \`
      <li class="saqlangan-shahar" data-indeks="\${indeks}">
        <span>\${shahar.name}, \${shahar.country}</span>
        <button class="ochir-tugma" data-indeks="\${indeks}">✕</button>
      </li>
    \`)
    .join("")
}

saqlanganShaharlarniChizish() // sahifa ochilganda, localStorage'dan yuklangan ro'yxatni darhol ko'rsatamiz`}</CodeBlock>
      <p>
        Saqlangan ro'yxatda ikkita amal bor: shaharga bosib uning ob-havosini
        ko'rish, va "✕" tugmasi bilan o'chirish. Ikkalasini ham{' '}
        <strong>bitta</strong> delegation listeneri bilan boshqaramiz:
      </p>
      <CodeBlock lang="javascript">{`saqlanganShaharlarElement.addEventListener("click", (event) => {
  if (event.target.classList.contains("ochir-tugma")) {
    const indeks = Number(event.target.dataset.indeks)
    saqlanganShaharlar = saqlanganShaharlar.filter((shahar, i) => i !== indeks) // 5-darsdagi filter
    localStorage.setItem(SAQLASH_KALITI, JSON.stringify(saqlanganShaharlar))
    saqlanganShaharlarniChizish()
    return
  }

  const elementi = event.target.closest(".saqlangan-shahar")
  if (elementi) {
    const indeks = Number(elementi.dataset.indeks)
    obHavoniKorsatish(saqlanganShaharlar[indeks])
  }
})`}</CodeBlock>
      <Callout type="warning" title="Nega o'chirish tugmasini avval tekshiramiz?">
        "✕" tugmasi <code>.saqlangan-shahar</code>{' '}
        <code>{'<li>'}</code>ning ichida joylashgan. 15-darsda o'rgangan{' '}
        <strong>event bubbling</strong> tufayli, tugma bosilganda hodisa{' '}
        <code>{'<li>'}</code>gacha ham "ko'tariladi" — agar avval "✕"ni
        tekshirmasak, o'chirish tugmasi bosilganda ham noto'g'ri ravishda
        ob-havo ko'rsatish funksiyasi ishga tushib qolar edi.
      </Callout>

      <h2>Yakuniy natija — barcha darslar bir joyda</h2>
      <p>
        Ushbu loyihada ishlatilgan mavzularni sanab o'tsak: closures va HOF
        (<code>debounce</code>), destructuring/spread/rest (shaharlarni
        yangilash), optional chaining va nullish coalescing (
        <code>?.</code>, <code>??</code>), promises va async/await, fetch
        API, xatoliklarni boshqarish (<code>try</code>/<code>catch</code>),
        event obyekti va delegation, <code>closest()</code>,{' '}
        <code>localStorage</code>, va debounce. Bu — aynan real front-end
        loyihalarda kunlik ishlatiladigan vositalar to'plami.
      </p>

      <h2>Amaliyot — ilovani kengaytiring</h2>
      <p>
        Yuqoridagi ilovaga quyidagi qo'shimcha imkoniyatlarni qo'shing. Har
        birida yuqoridagi o'zgaruvchilar va funksiyalardan foydalanasiz.
      </p>

      <Exercise title="1-vazifa: Saqlangan shaharlar sonini ko'rsatish">
        <p>
          <code>{'<p id="saqlanganSoni"></p>'}</code> elementini qo'shing va{' '}
          <code>saqlanganShaharlarniChizish()</code>ni kengaytirib, unda{' '}
          <code>"3 ta shahar saqlangan"</code> kabi matn ko'rsating (0
          bo'lganda — <code>"Hali shahar saqlanmagan"</code>).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function saqlanganShaharlarniChizish() {
  saqlanganShaharlarElement.innerHTML = saqlanganShaharlar
    .map((shahar, indeks) => \`
      <li class="saqlangan-shahar" data-indeks="\${indeks}">
        <span>\${shahar.name}, \${shahar.country}</span>
        <button class="ochir-tugma" data-indeks="\${indeks}">✕</button>
      </li>
    \`)
    .join("")

  const sonElement = document.getElementById("saqlanganSoni")
  sonElement.textContent = saqlanganShaharlar.length === 0
    ? "Hali shahar saqlanmagan"
    : saqlanganShaharlar.length + " ta shahar saqlangan"
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Oxirgi ko'rilgan shaharni eslab qolish">
        <p>
          Sahifa ochilganda (agar saqlangan shahar bo'lsa) avtomatik ravishda{' '}
          <strong>birinchi</strong> saqlangan shaharning ob-havosini
          ko'rsating — foydalanuvchi hech narsa qidirmasdan darhol
          ma'lumotni ko'rsin.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`saqlanganShaharlarniChizish()

if (saqlanganShaharlar.length > 0) {
  obHavoniKorsatish(saqlanganShaharlar[0])
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Bir xil shaharni ikki marta saqlamaslik xabari">
        <p>
          <code>shaharniSaqlash</code> funksiyasini kengaytiring — agar
          shahar allaqachon saqlangan bo'lsa,{' '}
          <code>{'<button id="saqlashTugmasi">'}</code>ning matnini
          vaqtincha <code>"Allaqachon saqlangan"</code>ga o'zgartirib, 1.5
          soniyadan keyin qaytadan <code>"Saqlash ★"</code>ga qaytaring (
          <code>setTimeout</code> ishlatib).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function shaharniSaqlash(shahar) {
  const tugma = document.getElementById("saqlashTugmasi")
  const allaqachonBormi = saqlanganShaharlar.some((s) => s.name === shahar.name && s.country === shahar.country)

  if (allaqachonBormi) {
    tugma.textContent = "Allaqachon saqlangan"
    setTimeout(() => {
      tugma.textContent = "Saqlash ★"
    }, 1500)
    return
  }

  saqlanganShaharlar = [...saqlanganShaharlar, shahar]
  localStorage.setItem(SAQLASH_KALITI, JSON.stringify(saqlanganShaharlar))
  saqlanganShaharlarniChizish()
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Real front-end loyiha — bir nechta alohida o'rgangan mavzuning
          (async/await, fetch, DOM, localStorage, delegation, debounce)
          birgalikda, bir-biriga bog'liq holda ishlashi.
        </li>
        <li>
          Har bir tarmoq so'rovi (qidiruv, ob-havo) uch holatni — yuklanmoqda,
          muvaffaqiyat, xatolik — boshqarishi kerak, foydalanuvchi hech
          qachon noaniqlikda qolmasligi uchun.
        </li>
        <li>
          Dinamik ro'yxatlar (qidiruv natijalari, saqlangan shaharlar) uchun
          event delegation — har bir elementga alohida listener biriktirish
          o'rniga, bitta umumiy listener bilan boshqarish.
        </li>
        <li>
          <code>localStorage</code> + <code>JSON.stringify</code>/
          <code>JSON.parse</code> — foydalanuvchi ma'lumotini sahifa
          yopilgandan keyin ham saqlab qolish uchun asosiy naqsh.
        </li>
        <li>
          Kalitsiz, ochiq API'lar (Open-Meteo kabi) — server yo'q, sof
          frontend loyihalar uchun xavfsiz va amaliy tanlov.
        </li>
      </KeyPoints>
    </>
  )
}
