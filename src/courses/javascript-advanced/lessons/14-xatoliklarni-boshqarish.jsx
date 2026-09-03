import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Asinxron kodda xatoliklarni boshqarish',
  section: 'Asinxron JavaScript',
}

export default function XatoliklarniBoshqarishLesson() {
  return (
    <>
      <p>
        Oldingi darsda <code>fetch</code>ni <code>try</code>/<code>catch</code>{' '}
        bilan o'rab, xatolikni ushlashni qisqacha ko'rgan edik. Real
        ilovalarda xatoliklarni to'g'ri boshqarish — internet uzilishi,
        server nosozligi, noto'g'ri ma'lumot — foydalanuvchiga "oq ekran"
        yoki tushunarsiz xatolik ko'rsatish o'rniga aniq va foydali xabar
        berishning kaliti. Bu darsda buni chuqurroq, tizimli tarzda
        o'rganamiz.
      </p>

      <h2>try/catch/finally — sintaksis</h2>
      <p>
        <code>try</code> blokida potentsial xatolik chiqarishi mumkin bo'lgan
        kod yoziladi; xatolik chiqsa, <code>catch</code> bloki uni ushlaydi va
        dastur to'xtab qolmaydi:
      </p>
      <CodeBlock lang="javascript">{`try {
  const natija = JSON.parse("noto'g'ri json") // bu xatolik chiqaradi
  console.log(natija)
} catch (xato) {
  console.log("JSON o'qishda xatolik:", xato.message)
} finally {
  console.log("Bu qator har doim ishlaydi")
}

console.log("Dastur davom etmoqda") // try/catch bo'lmasa, bu qatorga yetib bormas edi`}</CodeBlock>
      <Callout type="note" title="try/catch faqat sinxron xatoliklarni emas, await'ni ham ushlaydi">
        <code>async</code> funksiya ichida <code>await</code> qilingan Promise
        rad etilsa (reject bo'lsa), bu xuddi oddiy <code>throw</code> kabi{' '}
        <code>catch</code> blokiga tushadi. Shu sababli 12-13-darslarda{' '}
        <code>try</code>/<code>catch</code>ni <code>fetch</code> bilan birga
        ishlatgan edik.
      </Callout>

      <h2>Maxsus xatolik turlari — o'z Error klassingizni yaratish</h2>
      <p>
        Standart <code>Error</code> obyektidan tashqari, o'zingizning maxsus
        xatolik turlaringizni yaratish mumkin — bu <code>catch</code> blokida{' '}
        <strong>qaysi turdagi xatolik</strong> yuz berganini aniq bilish
        imkonini beradi (klasslarni keyingi bo'limda chuqur o'rganamiz, bu
        yerda oddiy misolda ko'ramiz):
      </p>
      <CodeBlock lang="javascript">{`class TarmoqXatoligi extends Error {
  constructor(xabar, status) {
    super(xabar)
    this.name = "TarmoqXatoligi"
    this.status = status
  }
}

async function malumotOlish(manzil) {
  const javob = await fetch(manzil)

  if (!javob.ok) {
    throw new TarmoqXatoligi("So'rov muvaffaqiyatsiz", javob.status)
  }

  return javob.json()
}`}</CodeBlock>
      <p>
        Endi <code>catch</code> blokida xatolik turiga qarab har xil
        munosabat bildirish mumkin:
      </p>
      <CodeBlock lang="javascript">{`try {
  const malumot = await malumotOlish("https://api.open-meteo.com/v1/forecast?latitude=41.3&longitude=69.3&current_weather=true")
  console.log(malumot)
} catch (xato) {
  if (xato instanceof TarmoqXatoligi) {
    console.log("Server xatoligi, kod:", xato.status)
  } else {
    console.log("Boshqa xatolik:", xato.message)
  }
}`}</CodeBlock>
      <Quiz
        question="try bloki ichida await qilingan Promise rad etilsa (reject bo'lsa), nima sodir bo'ladi?"
        options={[
          "Dastur to'xtab, sahifa qayta yuklanadi",
          "Bu xuddi throw qilingandek, mos catch blokiga tushadi",
          "Hech narsa — reject sinxron xatolik emas, e'tiborsiz qoldiriladi",
          "await avtomatik ravishda qayta urinadi",
        ]}
        correctIndex={1}
        explanation="async funksiya ichida await qilingan Promise rad etilganda, bu xato try/catch mexanizmiga xuddi oddiy throw qilingandek uzatiladi — shuning uchun async/await kodida ham try/catch xatoliklarni ushlash uchun ishlatiladi."
      />

      <h2>Real UX naqshi: uch holatni to'liq boshqarish</h2>
      <p>
        13-darsda ko'rgan "yuklanmoqda / muvaffaqiyat / xatolik" naqshini endi
        to'liq, qayta ishlatiladigan funksiya sifatida yozamiz — bu naqsh
        yakuniy loyihada asosiy qurilish blokiga aylanadi:
      </p>
      <CodeBlock lang="javascript">{`async function malumotniYuklaVaKorsat({ manzil, konteynerElement, formatlash }) {
  konteynerElement.innerHTML = '<p class="yuklanmoqda">Yuklanmoqda...</p>'

  try {
    const javob = await fetch(manzil)

    if (!javob.ok) {
      throw new Error("Server xatoligi: " + javob.status)
    }

    const malumot = await javob.json()
    konteynerElement.innerHTML = formatlash(malumot)
  } catch (xato) {
    konteynerElement.innerHTML = \`<p class="xatolik">Xatolik: \${xato.message}</p>\`
  }
}

malumotniYuklaVaKorsat({
  manzil: "https://api.open-meteo.com/v1/forecast?latitude=41.3&longitude=69.3&current_weather=true",
  konteynerElement: document.getElementById("obhavoNatija"),
  formatlash: (malumot) => \`<p>Harorat: \${malumot.current_weather.temperature}°C</p>\`,
})`}</CodeBlock>
      <p>
        Diqqat qiling: bu funksiya destructuring (7-dars) bilan obyekt
        parametr qabul qiladi, HOF (4-dars) sifatida{' '}
        <code>formatlash</code> funksiyasini oladi — oldingi darslarda
        o'rgangan barcha vositalar bitta amaliy, qayta ishlatiladigan
        funksiyada birlashdi.
      </p>

      <h2>Tarmoq uzilishini simulyatsiya qilib ko'rish</h2>
      <Callout type="tip" title="Brauzerda sinab ko'ring">
        Chrome DevTools'ning <strong>Network</strong> panelida "Offline"
        rejimini yoqib, <code>fetch</code> chaqiruvi qanday{' '}
        <code>catch</code> blokiga tushishini o'z ko'zingiz bilan ko'rishingiz
        mumkin — bu real loyihada "internet yo'q" holatini qanday sinash
        kerakligini bilish uchun foydali odat.
      </Callout>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: JSON.parse xatoligini ushlash">
        <p>
          <code>xavfsizJsonOchish(matn)</code> nomli funksiya yozing — u{' '}
          <code>JSON.parse(matn)</code>ni <code>try</code>/<code>catch</code>{' '}
          bilan o'rab, muvaffaqiyatli bo'lsa natijani, xatolik bo'lsa{' '}
          <code>null</code>ni qaytaradi.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function xavfsizJsonOchish(matn) {
  try {
    return JSON.parse(matn)
  } catch (xato) {
    return null
  }
}

console.log(xavfsizJsonOchish('{"ism": "Aziz"}')) // { ism: "Aziz" }
console.log(xavfsizJsonOchish("noto'g'ri"))        // null`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Maxsus xatolik klassi">
        <p>
          <code>ValidatsiyaXatoligi</code> nomli, <code>Error</code>dan{' '}
          <code>extends</code> qilingan klass yarating (<code>name</code>{' '}
          xususiyati <code>"ValidatsiyaXatoligi"</code> bo'lsin). Uni yosh
          manfiy bo'lsa <code>throw</code> qiladigan{' '}
          <code>yoshniTekshir(yosh)</code> funksiyasida ishlating.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`class ValidatsiyaXatoligi extends Error {
  constructor(xabar) {
    super(xabar)
    this.name = "ValidatsiyaXatoligi"
  }
}

function yoshniTekshir(yosh) {
  if (yosh < 0) {
    throw new ValidatsiyaXatoligi("Yosh manfiy bo'lishi mumkin emas")
  }
  return yosh
}

try {
  yoshniTekshir(-5)
} catch (xato) {
  console.log(xato.name + ": " + xato.message) // "ValidatsiyaXatoligi: Yosh manfiy bo'lishi mumkin emas"
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: To'liq yuklash naqshi">
        <p>
          HTML: <code>{'<div id="natija"></div>'}</code>,{' '}
          <code>{'<button id="yukla">Yuklash</button>'}</code>. Tugma
          bosilganda <code>"https://api.open-meteo.com/v1/forecast?latitude=41.3&amp;longitude=69.3&amp;current_weather=true"</code>{' '}
          manzilidan ma'lumot yuklab, "Yuklanmoqda...", muvaffaqiyat va
          xatolik holatlarini <code>natija</code> elementida ko'rsating.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`document.getElementById("yukla").addEventListener("click", async () => {
  const natijaElement = document.getElementById("natija")
  natijaElement.textContent = "Yuklanmoqda..."

  try {
    const javob = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.3&longitude=69.3&current_weather=true")

    if (!javob.ok) {
      throw new Error("Server xatoligi: " + javob.status)
    }

    const malumot = await javob.json()
    natijaElement.textContent = "Harorat: " + malumot.current_weather.temperature + "°C"
  } catch (xato) {
    natijaElement.textContent = "Xatolik: " + xato.message
  }
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>try</code>/<code>catch</code>/<code>finally</code> — sinxron
          va (<code>await</code> orqali) asinxron xatoliklarni bitta bir xil
          usulda ushlaydi.
        </li>
        <li>
          <code>Error</code>dan <code>extends</code> qilib maxsus xatolik
          klasslari yaratish — <code>catch</code> blokida{' '}
          <code>instanceof</code> orqali xatolik turini aniqlab, har xil
          munosabat bildirish imkonini beradi.
        </li>
        <li>
          Real ilovada har doim uchta holatni boshqarish kerak: yuklanmoqda,
          muvaffaqiyat, xatolik — foydalanuvchi hech qachon noaniqlikda
          qolmasligi kerak.
        </li>
        <li>
          <code>fetch</code>ning o'zi tarmoq xatoligida <code>reject</code>{' '}
          bo'ladi, HTTP xatolik kodlari uchun esa <code>response.ok</code>{' '}
          tekshirilib, kerak bo'lsa qo'lda <code>throw</code> qilinadi.
        </li>
      </KeyPoints>
    </>
  )
}
