import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "localStorage: brauzerda ma'lumot saqlash",
  section: 'DOM: real loyihalar darajasida',
}

export default function LocalStorageLesson() {
  return (
    <>
      <p>
        19-darsdagi to-do loyihasini eslang — sahifani yangilasangiz (F5),
        barcha vazifalar yo'qolib ketadi, chunki ular faqat JavaScript
        xotirasida (bitta oddiy massivda) saqlangan edi. Bu real
        ilovalarda qabul qilib bo'lmaydigan kamchilik. <strong>localStorage</strong>{' '}
        — brauzerning ma'lumotni sahifa yopilgandan, hatto kompyuter qayta
        yoqilgandan keyin ham saqlab qoladigan xotirasi. Bu darsda uni
        o'rganib, to-do loyihasiga "xotira" qo'shamiz.
      </p>

      <h2>localStorage — asosiy metodlar</h2>
      <p>
        <code>localStorage</code> — global obyekt, faqat matn (string)
        saqlaydi, kalit-qiymat (key-value) tarzida:
      </p>
      <CodeBlock lang="javascript">{`localStorage.setItem("ism", "Aziz") // saqlash

console.log(localStorage.getItem("ism")) // "Aziz" — o'qish

localStorage.removeItem("ism") // o'chirish

localStorage.clear() // BARCHA saqlangan ma'lumotni o'chirish`}</CodeBlock>
      <Callout type="tip" title="Brauzerni yoping va qayta oching">
        <code>localStorage.setItem("ism", "Aziz")</code>ni konsolda ishga
        tushirib, brauzer tabini yoping, qayta oching va{' '}
        <code>localStorage.getItem("ism")</code>ni sinab ko'ring — u hali
        ham <code>"Aziz"</code> qaytaradi. Bu — <code>sessionStorage</code>{' '}
        (faqat tab ochiq turgunicha saqlaydi) yoki oddiy JavaScript
        o'zgaruvchisidan (sahifa yangilanganda yo'qoladi) asosiy farqi.
      </Callout>

      <h2>Faqat matn — JSON bilan obyekt/massiv saqlash</h2>
      <p>
        <code>localStorage</code> faqat <strong>matn</strong> saqlay oladi.
        Obyekt yoki massiv to'g'ridan-to'g'ri berilsa, u avtomatik{' '}
        <code>"[object Object]"</code> kabi noto'g'ri matnga aylanadi:
      </p>
      <CodeBlock lang="javascript">{`const vazifalar = [{ id: 1, matn: "Non", bajarildi: false }]

localStorage.setItem("vazifalar", vazifalar) // XATO — noto'g'ri natija
console.log(localStorage.getItem("vazifalar")) // "[object Object]" — ma'lumot yo'qoldi!`}</CodeBlock>
      <p>
        Yechim — 13-darsda ko'rgan <code>JSON.stringify</code> bilan avval
        matnga aylantirish, o'qishda esa <code>JSON.parse</code> bilan
        qaytadan obyekt/massivga aylantirish:
      </p>
      <CodeBlock lang="javascript">{`const vazifalar = [{ id: 1, matn: "Non", bajarildi: false }]

localStorage.setItem("vazifalar", JSON.stringify(vazifalar)) // massivni matnga aylantirib saqlash

const saqlanganMatn = localStorage.getItem("vazifalar")
const qaytaOlinganVazifalar = JSON.parse(saqlanganMatn) // matnni qaytadan massivga aylantirish

console.log(qaytaOlinganVazifalar) // [{ id: 1, matn: "Non", bajarildi: false }] — asl massiv!`}</CodeBlock>
      <Quiz
        question="localStorage.setItem('royxat', [1, 2, 3]) to'g'ridan-to'g'ri chaqirilsa nima bo'ladi?"
        options={[
          "Massiv to'g'ri saqlanadi",
          "Xatolik chiqadi",
          "Massiv noto'g'ri matn ko'rinishiga (masalan, '1,2,3' yoki '[object Object]') aylanib saqlanadi",
          "localStorage avtomatik JSON.stringify qiladi",
        ]}
        correctIndex={2}
        explanation="localStorage faqat matn saqlaydi — massiv yoki obyekt berilsa, JavaScript uni avtomatik matnga aylantirishga urinadi (masalan, massiv '1,2,3' ga aylanadi), bu esa asl tuzilmani yo'qotadi. To'g'ri saqlash uchun JSON.stringify, o'qishda JSON.parse ishlatiladi."
      />
      <Callout type="warning" title="Mavjud bo'lmagan kalitni JSON.parse qilish">
        Agar <code>localStorage.getItem("vazifalar")</code> hali hech narsa
        saqlanmagani uchun <code>null</code> qaytarsa,{' '}
        <code>JSON.parse(null)</code> xatolik <strong>bermaydi</strong> —{' '}
        <code>null</code>ning o'zini qaytaradi. Lekin xavfsizroq yozish uchun
        8-darsda o'rgangan <code>??</code>dan foydalanib, standart qiymat
        berish tavsiya etiladi (pastdagi misolda ko'rasiz).
      </Callout>

      <h2>Amaliy misol: to-do loyihasiga xotira qo'shish</h2>
      <p>
        Endi 19-darsdagi to-do loyihasini <code>localStorage</code> bilan
        birlashtiramiz — sahifa har safar ochilganda, saqlangan vazifalar
        avtomatik yuklanadi:
      </p>
      <CodeBlock lang="javascript">{`const SAQLASH_KALITI = "todoVazifalar"

function vazifalarniSaqlash(vazifalar) {
  localStorage.setItem(SAQLASH_KALITI, JSON.stringify(vazifalar))
}

function vazifalarniYuklash() {
  const saqlangan = localStorage.getItem(SAQLASH_KALITI)
  return saqlangan ? JSON.parse(saqlangan) : [] // hech narsa saqlanmagan bo'lsa — bo'sh massiv
}

// Sahifa ochilganda, avval saqlangan vazifalarni yuklaymiz:
let vazifalar = vazifalarniYuklash()

function vazifaQoshish(matn) {
  vazifalar.push({ id: Date.now(), matn, bajarildi: false })
  vazifalarniSaqlash(vazifalar) // har o'zgarishda darhol saqlanadi
  royxatniChizish()
}

function vazifaniOchir(id) {
  vazifalar = vazifalar.filter((vazifa) => vazifa.id !== id) // 5-darsdagi filter
  vazifalarniSaqlash(vazifalar)
  royxatniChizish()
}`}</CodeBlock>
      <Callout type="note" title="Date.now() — oddiy, tez ID generatori">
        19-darsdagi loyihada ID qo'lda, hisoblagich o'zgaruvchisi orqali
        berilgan edi. <code>Date.now()</code> — joriy vaqtni millisekundlarda
        qaytaradi, bu kichik loyihalarda deyarli har doim{' '}
        <strong>noyob</strong> (unique) qiymat berish uchun yetarli va
        oddiyroq usul.
      </Callout>
      <p>
        Muhim naqsh: <code>vazifalarniSaqlash(vazifalar)</code> —{' '}
        <strong>har bir o'zgarishdan keyin</strong> chaqiriladi (qo'shish,
        o'chirish, belgilash). Shu tufayli <code>vazifalar</code> massivi va{' '}
        <code>localStorage</code>dagi ma'lumot doim bir xil holatda
        (sinxronlashgan) turadi.
      </p>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Oddiy saqlash va o'qish">
        <p>
          <code>"foydalanuvchiIsmi"</code> kaliti bilan{' '}
          <code>"Malika"</code>ni <code>localStorage</code>ga saqlang, keyin
          uni <code>getItem</code> bilan o'qib konsolga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`localStorage.setItem("foydalanuvchiIsmi", "Malika")
console.log(localStorage.getItem("foydalanuvchiIsmi")) // "Malika"`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Obyektni saqlash va qayta olish">
        <p>
          <code>{'{ til: "uz", mavzu: "qorong\'i" }'}</code> sozlamalar
          obyektini <code>"sozlamalar"</code> kaliti bilan{' '}
          <code>localStorage</code>ga saqlang (JSON.stringify bilan), keyin
          uni qayta o'qib (JSON.parse bilan) obyekt sifatida konsolga
          chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const sozlamalar = { til: "uz", mavzu: "qorong'i" }

localStorage.setItem("sozlamalar", JSON.stringify(sozlamalar))

const qaytaOlingan = JSON.parse(localStorage.getItem("sozlamalar"))
console.log(qaytaOlingan) // { til: "uz", mavzu: "qorong'i" }`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Sahifa yangilansa ham saqlanadigan hisoblagich">
        <p>
          HTML: <code>{'<button id="ortirTugmasi">+1</button>'}</code>,{' '}
          <code>{'<p id="son">0</p>'}</code>. Tugma bosilganda son{' '}
          <code>localStorage</code>ga saqlansin va sahifa har safar
          ochilganda (yuklanganda) saqlangan qiymatdan davom etsin (agar
          saqlangan qiymat bo'lmasa — <code>0</code>dan boshlansin).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const sonElement = document.getElementById("son")

let son = Number(localStorage.getItem("hisoblagich")) || 0
sonElement.textContent = son

document.getElementById("ortirTugmasi").addEventListener("click", () => {
  son = son + 1
  localStorage.setItem("hisoblagich", son)
  sonElement.textContent = son
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>localStorage.setItem(kalit, qiymat)</code> /{' '}
          <code>getItem(kalit)</code> / <code>removeItem(kalit)</code> /{' '}
          <code>clear()</code> — brauzerda sahifa yopilgandan keyin ham
          saqlanadigan ma'lumot bilan ishlash uchun asosiy metodlar.
        </li>
        <li>
          <code>localStorage</code> faqat matn saqlaydi — obyekt/massiv
          saqlash uchun <code>JSON.stringify</code>, o'qishda{' '}
          <code>JSON.parse</code> ishlatiladi.
        </li>
        <li>
          Mavjud bo'lmagan kalit <code>getItem</code>dan <code>null</code>{' '}
          qaytaradi — <code>JSON.parse</code>dan oldin buni tekshirish yoki{' '}
          <code>??</code>/ternary bilan standart qiymat berish kerak.
        </li>
        <li>
          Real ilovada har bir ma'lumot o'zgarishidan (qo'shish, o'chirish,
          yangilash) keyin darhol <code>localStorage</code>ga qayta yozish —
          xotiradagi holat va saqlangan holatni sinxron ushlab turish uchun
          standart naqsh.
        </li>
      </KeyPoints>
    </>
  )
}
