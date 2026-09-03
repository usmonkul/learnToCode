import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Fetch API: haqiqiy ma'lumot olish",
  section: 'Asinxron JavaScript',
}

export default function FetchApiLesson() {
  return (
    <>
      <p>
        Oldingi ikki darsda Promise va <code>async</code>/<code>await</code>ni
        "soxta" (<code>setTimeout</code> bilan simulyatsiya qilingan) API
        chaqiruvlari bilan mashq qildik. Endi ularni <strong>haqiqiy</strong>{' '}
        ma'lumot olish uchun ishlatamiz — <code>fetch</code>, brauzerning tarmoq
        so'rovlari (network requests) yuborish uchun quroli. Bu — kursning eng
        "real hayotiy" darslaridan biri: deyarli har qanday zamonaviy
        veb-ilova serverdan yoki ochiq API'dan ma'lumot olish uchun{' '}
        <code>fetch</code>ni ishlatadi.
      </p>

      <h2>fetch — asosiy sintaksis</h2>
      <p>
        <code>fetch(manzil)</code> — Promise qaytaradi, u manzilga so'rov
        yuborib, javobni oladi:
      </p>
      <CodeBlock lang="javascript">{`fetch("https://api.open-meteo.com/v1/forecast?latitude=41.3&longitude=69.3&current_weather=true")
  .then((javob) => javob.json()) // javob tanasini JSON qilib o'qish (bu ham Promise!)
  .then((malumot) => console.log(malumot))
  .catch((xato) => console.log("Xatolik:", xato))`}</CodeBlock>
      <Callout type="note" title="Nega ikkita .then() kerak?">
        <code>fetch</code>ning birinchi natijasi — <code>Response</code>{' '}
        obyekti, unda hali "xom" ma'lumot bor. <code>javob.json()</code> —
        javob tanasini JavaScript obyektiga aylantiradi, lekin bu ham{' '}
        <strong>asinxron</strong> amal (yana Promise qaytaradi), shuning uchun
        uni ham <code>.then()</code> yoki <code>await</code> bilan kutish
        kerak.
      </Callout>
      <p><code>async</code>/<code>await</code> bilan xuddi shu kod ancha oddiy o'qiladi:</p>
      <CodeBlock lang="javascript">{`async function obHavoniOlish() {
  const javob = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.3&longitude=69.3&current_weather=true")
  const malumot = await javob.json()
  console.log(malumot)
}

obHavoniOlish()`}</CodeBlock>

      <h2>Nega Open-Meteo?</h2>
      <Callout type="tip" title="Kalitsiz, bepul, hech qanday cheklovsiz API">
        Bu kursda ochiq havo ma'lumotlari API'si —{' '}
        <strong>Open-Meteo</strong> (api.open-meteo.com) ishlatiladi, chunki u{' '}
        <strong>API kalit talab qilmaydi</strong>. Bu tasodifiy tanlov emas:
        sizning kodingiz — statik fayllar, hech qanday server yo'q. Agar API
        kalit talab qiladigan xizmatdan foydalansangiz, kalit brauzerga
        yuboriladigan kodning ichida qolib, uni <strong>har qanday tashrif
        buyuruvchi ko'ra oladi</strong> — bu xavfsizlik nuqtai nazaridan
        noto'g'ri amaliyot. Shuning uchun frontend-only loyihalarda kalitsiz
        (yoki maxsus "public" kalitli) API'larni tanlash — muhim odat.
      </Callout>

      <h2>response.ok — muvaffaqiyatni tekshirish</h2>
      <p>
        Muhim jihat: <code>fetch</code>ning Promise'i <strong>faqat</strong>{' '}
        tarmoq darajasida xatolik bo'lsa (masalan, internet yo'q) rad etiladi
        (reject). Server <code>404</code> yoki <code>500</code> kabi xatolik
        kodi bilan javob bersa ham, <code>fetch</code> buni "muvaffaqiyat" deb
        hisoblaydi — shuning uchun <code>response.ok</code>ni qo'lda tekshirish
        kerak:
      </p>
      <CodeBlock lang="javascript">{`async function malumotniOlish(manzil) {
  const javob = await fetch(manzil)

  if (!javob.ok) {
    throw new Error("So'rov muvaffaqiyatsiz: " + javob.status)
  }

  return javob.json()
}`}</CodeBlock>
      <Quiz
        question="Server 404 xatolik kodi bilan javob bersa, fetch()ning Promise'i qanday holatga o'tadi?"
        options={[
          "reject bo'ladi (xatolik sifatida)",
          "resolve bo'ladi (response.ok false bo'lgan holda)",
          "pending holatida abadiy qoladi",
          "Avtomatik qayta urinadi",
        ]}
        correctIndex={1}
        explanation="fetch faqat tarmoq darajasidagi muammoda (masalan, internet yo'qligida) reject bo'ladi. HTTP xatolik kodlari (404, 500) bilan kelgan javob ham 'muvaffaqiyatli qabul qilindi' deb hisoblanadi — shuning uchun response.ok'ni qo'lda tekshirish shart."
      />

      <h2>Yuklanish va xatolik holatlari — real UX naqshi</h2>
      <p>
        Haqiqiy ilovada foydalanuvchi so'rov davomida sahifaning "muzlab"
        qolganini emas, <strong>nima bo'layotganini</strong> ko'rishi kerak.
        Uch holatni har doim boshqarish odat bo'lishi kerak:{' '}
        <strong>yuklanmoqda</strong>, <strong>muvaffaqiyat</strong>,{' '}
        <strong>xatolik</strong>:
      </p>
      <CodeBlock lang="javascript">{`const natijaElement = document.getElementById("natija")
const tugma = document.getElementById("qidirTugmasi")

tugma.addEventListener("click", async () => {
  natijaElement.textContent = "Yuklanmoqda..." // 1. yuklanmoqda holati

  try {
    const javob = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.3&longitude=69.3&current_weather=true")

    if (!javob.ok) {
      throw new Error("Server xatoligi: " + javob.status)
    }

    const malumot = await javob.json()
    natijaElement.textContent = "Harorat: " + malumot.current_weather.temperature + "°C" // 2. muvaffaqiyat
  } catch (xato) {
    natijaElement.textContent = "Xatolik yuz berdi: " + xato.message // 3. xatolik
  }
})`}</CodeBlock>
      <Callout type="warning" title="try/catch — tarmoq xatoliklari uchun ham, JSON xatoligi uchun ham">
        <code>try</code> bloki ichidagi <strong>istalgan</strong> qadam
        (tarmoq uzilishi, <code>javob.ok</code> false bo'lishi, yoki hatto{' '}
        <code>.json()</code> noto'g'ri formatdagi javobni ochib bo'lmasligi)
        bitta <code>catch</code> blokida ushlanadi. Keyingi darsda bu mavzuni
        chuqurroq — maxsus xatolik turlari va foydalanuvchiga qanday
        ko'rsatish kerakligini — ko'ramiz.
      </Callout>

      <h2>GET so'rovidan tashqari — POST so'rovi</h2>
      <p>
        <code>fetch</code>ning ikkinchi (ixtiyoriy) argumenti — so'rov
        sozlamalari. Serverga ma'lumot <strong>yuborish</strong> uchun{' '}
        <code>POST</code> metodi ishlatiladi:
      </p>
      <CodeBlock lang="javascript">{`async function vazifaSaqlash(matn) {
  const javob = await fetch("https://api.example.com/vazifalar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ matn: matn, bajarildi: false }),
  })

  return javob.json()
}`}</CodeBlock>
      <p>
        <code>JSON.stringify</code> — JavaScript obyektini matnga (JSON
        formatiga) aylantiradi, chunki tarmoq orqali faqat matn yuborish
        mumkin. Bu kursda asosiy e'tibor <code>GET</code> so'rovlariga
        qaratiladi (kelajakda amaliy loyihalarda <code>POST</code> ham
        kerak bo'ladi), lekin uning borligini bilib qo'yish muhim.
      </p>

      <h2>Amaliy misol: shahar qidiruvi (yakuniy loyihaga tayyorgarlik)</h2>
      <p>
        Kursning yakuniy loyihasi — ob-havo ilovasi. Mana shu loyihada
        ishlatiladigan naqshning kichik namunasi — foydalanuvchi shahar nomini
        kiritib, tugmani bosganda haqiqiy koordinatalarni topish (Open-Meteo'ning
        geokodlash API'si orqali, bu ham kalitsiz):
      </p>
      <CodeBlock lang="javascript">{`async function shaharniQidirish(nom) {
  const manzil = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(nom)

  const javob = await fetch(manzil)
  if (!javob.ok) throw new Error("Qidiruv muvaffaqiyatsiz")

  const malumot = await javob.json()
  return malumot.results?.[0] ?? null // 8-darsda o'rgangan optional chaining
}

shaharniQidirish("Toshkent").then((natija) => console.log(natija))`}</CodeBlock>
      <Callout type="tip" title="encodeURIComponent — foydalanuvchi kiritgan matnni URL'ga xavfsiz qo'shish">
        Foydalanuvchi qidiruv maydoniga bo'sh joy yoki maxsus belgi kiritishi
        mumkin (masalan, "Toshkent shahri"). <code>encodeURIComponent</code>{' '}
        bunday belgilarni URL uchun xavfsiz ko'rinishga o'tkazadi — foydalanuvchi
        inputini to'g'ridan-to'g'ri URL'ga qo'shganda har doim ishlatiladigan
        odat.
      </Callout>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Oddiy GET so'rovi">
        <p>
          <code>async</code> funksiya yozing — u{' '}
          <code>"https://api.open-meteo.com/v1/forecast?latitude=41.3&longitude=69.3&current_weather=true"</code>{' '}
          manziliga <code>fetch</code> yuborib, javobdagi{' '}
          <code>current_weather.temperature</code>ni konsolga chiqaradi.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`async function haroratniOl() {
  const javob = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.3&longitude=69.3&current_weather=true")
  const malumot = await javob.json()
  console.log(malumot.current_weather.temperature)
}

haroratniOl()`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: response.ok bilan tekshirish">
        <p>
          Yuqoridagi funksiyaga <code>response.ok</code> tekshiruvini qo'shing
          — agar <code>false</code> bo'lsa, <code>Error</code> tashlang (
          <code>throw new Error(...)</code>), matnda status kodini ko'rsating.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`async function haroratniOl() {
  const javob = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.3&longitude=69.3&current_weather=true")

  if (!javob.ok) {
    throw new Error("Xatolik: " + javob.status)
  }

  const malumot = await javob.json()
  console.log(malumot.current_weather.temperature)
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: DOM + yuklanish holati">
        <p>
          HTML: <code>{'<button id="olTugmasi">Haroratni ko\'rsat</button>'}</code>
          ,{' '}
          <code>{'<p id="harorat"></p>'}</code>. Tugma bosilganda avval{' '}
          <code>"Yuklanmoqda..."</code>, keyin haroratni, xatolik bo'lsa esa
          xatolik matnini <code>harorat</code> elementiga chiqaring (
          <code>try</code>/<code>catch</code> ishlating).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const tugma = document.getElementById("olTugmasi")
const haroratElement = document.getElementById("harorat")

tugma.addEventListener("click", async () => {
  haroratElement.textContent = "Yuklanmoqda..."

  try {
    const javob = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.3&longitude=69.3&current_weather=true")
    if (!javob.ok) throw new Error("Server xatoligi")

    const malumot = await javob.json()
    haroratElement.textContent = malumot.current_weather.temperature + "°C"
  } catch (xato) {
    haroratElement.textContent = "Xatolik: " + xato.message
  }
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>fetch(manzil)</code> — tarmoq so'rovi yuboradi, Promise
          qaytaradi; javob tanasini o'qish uchun <code>.json()</code> alohida,
          yana bir asinxron qadam.
        </li>
        <li>
          <code>fetch</code> faqat tarmoq xatoligida (reject) rad etiladi — HTTP
          xatolik kodlari (404, 500) uchun <code>response.ok</code>ni qo'lda
          tekshirish kerak.
        </li>
        <li>
          Real ilovada har doim uch holatni ko'rsatish kerak: yuklanmoqda,
          muvaffaqiyat, xatolik — foydalanuvchi hech qachon "hech narsa
          bo'lmayotgan" holatda qolib ketmasin.
        </li>
        <li>
          API kalit talab qilmaydigan xizmatlar (Open-Meteo kabi) — sof
          frontend loyihalar uchun to'g'ri tanlov, chunki har qanday API kalit
          brauzer kodida yashirin qolmaydi.
        </li>
        <li>
          Foydalanuvchi kiritgan matnni URL'ga qo'shishdan oldin{' '}
          <code>encodeURIComponent</code> bilan xavfsizlashtirish kerak.
        </li>
      </KeyPoints>
    </>
  )
}
