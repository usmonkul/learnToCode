import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Debounce: performance va foydalanuvchi tajribasi',
  section: 'DOM: real loyihalar darajasida',
}

export default function DebounceLesson() {
  return (
    <>
      <p>
        Bu — bo'limning yakuniy darsi, va u to'g'ridan-to'g'ri kursning
        yakuniy loyihasiga tayyorgarlik: shahar qidiruv maydoni. Muammo
        shunda — agar har bir harf kiritilganda <code>fetch</code>{' '}
        (13-dars) yuborilsa, "Toshkent" so'zini yozayotganda 8 marta
        (har bir harf uchun) server so'rovi jo'natiladi. Bu — real
        loyihalarda tez-tez uchraydigan, lekin oson hal qilinadigan
        muammo — <strong>debounce</strong> texnikasi bilan.
      </p>

      <h2>Muammo: har bir keystroke'da so'rov yuborish</h2>
      <p>
        15-darsda o'rgangan <code>input</code> hodisasi foydalanuvchi har bir
        harf kiritganda ishga tushadi:
      </p>
      <CodeBlock lang="javascript">{`const qidiruvInput = document.getElementById("qidiruv")

qidiruvInput.addEventListener("input", (event) => {
  shaharniQidirish(event.target.value) // "T", "To", "Tos", "Tosh"... — har biri uchun alohida fetch!
})`}</CodeBlock>
      <Callout type="warning" title="Nega bu muammo?">
        "Toshkent" so'zini yozish paytida 8 ta <code>fetch</code> so'rovi
        ketma-ket jo'natiladi — bu server resurslarini behuda sarflaydi,
        sekin internetda ilova "sekin" his qilinadi, va (eng yomoni) javoblar
        <strong> tartibsiz</strong> qaytishi mumkin — masalan, "T" uchun
        so'rov "Tosh" uchun so'rovdan <strong>keyinroq</strong> javob berib,
        noto'g'ri natijalarni ko'rsatib qo'yishi mumkin.
      </Callout>

      <h2>Debounce nima?</h2>
      <p>
        <strong>Debounce</strong> — funksiyaning ishga tushishini{' '}
        <strong>kechiktirib</strong>, agar shu kechikish davomida funksiya
        yana chaqirilsa, avvalgi kechikishni bekor qilib, hisobni{' '}
        <strong>qaytadan boshlaydigan</strong> texnika. Natijada funksiya
        faqat foydalanuvchi <strong>to'xtaganidan</strong> keyin, bir marta
        ishga tushadi:
      </p>
      <CodeBlock lang="javascript">{`function debounce(funksiya, kechikish) {
  let taymer // 02-darsda o'rgangan closure — bu o'zgaruvchi funksiyalar orasida "eslab qolinadi"

  return (...argumentlar) => {
    clearTimeout(taymer)     // oldingi rejalashtirilgan chaqiruvni bekor qilish
    taymer = setTimeout(() => {
      funksiya(...argumentlar) // faqat kechikish davomida boshqa chaqiruv bo'lmasa, ishga tushadi
    }, kechikish)
  }
}`}</CodeBlock>
      <p>
        Bu — 04-darsda o'rgangan HOF (funksiya qabul qilib, funksiya
        qaytaruvchi funksiya) va 02-darsdagi closure (<code>taymer</code>{' '}
        o'zgaruvchisi qaytarilgan funksiya ichida "eslab qolinadi")
        bilimlarining amaliy qo'llanilishi.
      </p>

      <h2>debounce'ni qo'llash</h2>
      <CodeBlock lang="javascript">{`const qidiruvInput = document.getElementById("qidiruv")

const kechiktirilganQidiruv = debounce((qiymat) => {
  shaharniQidirish(qiymat) // faqat foydalanuvchi 400ms davomida yozishni to'xtatsa ishga tushadi
}, 400)

qidiruvInput.addEventListener("input", (event) => {
  kechiktirilganQidiruv(event.target.value)
})`}</CodeBlock>
      <p>
        Endi "Toshkent" yozilganda — har bir harfda taymer qaytadan
        boshlanadi, va foydalanuvchi yozishni to'xtatgandan{' '}
        <strong>400 millisekund keyin</strong>gina <code>fetch</code> bitta
        marta yuboriladi.
      </p>
      <Quiz
        question="Foydalanuvchi 400ms debounce bilan 'Toshkent' so'zini uzluksiz, tez yozsa, shaharniQidirish() nechta marta chaqiriladi?"
        options={[
          "8 marta (har bir harf uchun)",
          "1 marta (yozish to'xtaganidan keyin)",
          "0 marta",
          "Har 400ms da bitta, ya'ni bir necha marta",
        ]}
        correctIndex={1}
        explanation="Debounce har bir yangi chaqiruvda oldingi rejalashtirilgan taymerni bekor qiladi. Foydalanuvchi uzluksiz yozar ekan, taymer hech qachon tugamaydi — u faqat yozish TO'XTAGANIDAN keyin, belgilangan kechikishdan so'ng bir marta ishga tushadi."
      />

      <h2>Debounce vs throttle — qisqacha farq</h2>
      <Callout type="note" title="Ikkalasi ham chastotani cheklaydi, lekin boshqacha">
        <strong>Debounce</strong> — "faqat harakat <em>to'xtagandan</em> keyin
        bajar" (qidiruv maydoni, forma validatsiyasi, oyna o'lchami
        o'zgarishi tugagach qayta hisoblash). <strong>Throttle</strong> —
        "harakat davomida ham, lekin ko'pi bilan har X millisekundda bir
        marta bajar" (scroll hodisasi, sichqoncha harakati kabi uzluksiz
        hodisalar uchun). Bu kursda faqat debounce'ni chuqur ko'ramiz, chunki
        u qidiruv maydonlari uchun to'g'ridan-to'g'ri kerakli vosita.
      </Callout>

      <h2>Amaliy misol: yakuniy loyihaga tayyor komponent</h2>
      <p>
        Bu — kursning yakuniy ob-havo ilovasida ishlatiladigan naqshning
        to'liq ko'rinishi, 13-14-15-19-darslarning barchasini birlashtirib:
      </p>
      <CodeBlock lang="javascript">{`function debounce(funksiya, kechikish) {
  let taymer
  return (...argumentlar) => {
    clearTimeout(taymer)
    taymer = setTimeout(() => funksiya(...argumentlar), kechikish)
  }
}

async function shaharniQidirish(nom) {
  if (nom.trim() === "") return

  const natijaElement = document.getElementById("qidiruvNatijasi")
  natijaElement.textContent = "Qidirilmoqda..."

  try {
    const manzil = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(nom)
    const javob = await fetch(manzil)

    if (!javob.ok) throw new Error("Qidiruv muvaffaqiyatsiz")

    const malumot = await javob.json()
    const shahar = malumot.results?.[0]

    natijaElement.textContent = shahar ? shahar.name + ", " + shahar.country : "Shahar topilmadi"
  } catch (xato) {
    natijaElement.textContent = "Xatolik: " + xato.message
  }
}

const kechiktirilganQidiruv = debounce(shaharniQidirish, 400)

document.getElementById("shaharInput").addEventListener("input", (event) => {
  kechiktirilganQidiruv(event.target.value)
})`}</CodeBlock>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: debounce funksiyasini yozing">
        <p>
          Yuqoridagi <code>debounce(funksiya, kechikish)</code> funksiyasini
          o'zingiz (qarab yozmasdan, xotiradan) qayta yozing va uni{' '}
          <code>console.log("Chaqirildi")</code>ni 300ms kechikish bilan
          ishga tushiradigan holatda sinab ko'ring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function debounce(funksiya, kechikish) {
  let taymer
  return (...argumentlar) => {
    clearTimeout(taymer)
    taymer = setTimeout(() => funksiya(...argumentlar), kechikish)
  }
}

const kechiktirilganLog = debounce(() => console.log("Chaqirildi"), 300)

kechiktirilganLog()
kechiktirilganLog()
kechiktirilganLog() // faqat oxirgi chaqiruvdan 300ms keyin BIR marta "Chaqirildi" chiqadi`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Qidiruv maydoniga debounce qo'llash">
        <p>
          HTML: <code>{'<input id="qidiruv" />'}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. Foydalanuvchi yozishni
          to'xtatgandan 500ms keyin, <code>natija</code>ga{' '}
          <code>"Qidirilmoqda: [qiymat]"</code> matnini chiqaring (haqiqiy
          fetch shart emas, faqat debounce mantig'ini sinab ko'ring).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function debounce(funksiya, kechikish) {
  let taymer
  return (...argumentlar) => {
    clearTimeout(taymer)
    taymer = setTimeout(() => funksiya(...argumentlar), kechikish)
  }
}

const natijaElement = document.getElementById("natija")

const qidiruvniKorsat = debounce((qiymat) => {
  natijaElement.textContent = "Qidirilmoqda: " + qiymat
}, 500)

document.getElementById("qidiruv").addEventListener("input", (event) => {
  qidiruvniKorsat(event.target.value)
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Debounce — funksiya chaqiruvini kechiktirib, har yangi chaqiruvda
          oldingi kechikishni bekor qilib qayta boshlaydi; natijada funksiya
          faqat harakat to'xtaganidan keyin, bir marta ishga tushadi.
        </li>
        <li>
          Debounce — closure (taymer o'zgaruvchisini "eslab qolish") va HOF
          (funksiya qabul qilib, funksiya qaytarish) tushunchalarining
          to'g'ridan-to'g'ri amaliy qo'llanilishi.
        </li>
        <li>
          Qidiruv maydonlari, forma validatsiyasi va oyna o'lchami kabi
          "tez-tez o'zgaruvchi, lekin kamdan-kam qayta ishlash kerak
          bo'lgan" hodisalarda debounce serverga ortiqcha yuklamani oldini
          oladi.
        </li>
        <li>
          Throttle — debounce'ga o'xshash, lekin harakat davomida ham
          belgilangan intervalda ishlab turadi; scroll kabi uzluksiz
          hodisalar uchun ishlatiladi.
        </li>
      </KeyPoints>
    </>
  )
}
