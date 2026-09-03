import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'querySelectorAll, NodeList va closest()',
  section: 'DOM: real loyihalar darajasida',
}

export default function QuerySelectorAllClosestLesson() {
  return (
    <>
      <p>
        <code>querySelectorAll</code> va <code>closest</code>ni oldingi
        darslarda vaqti-vaqti bilan ishlatgan bo'lsangiz ham, ularning
        qanday ishlashini hali chuqur ko'rmagan edik. Bu bo'limda ikkalasini
        ham to'liq o'rganamiz — ular real loyihalarda, ayniqsa event
        delegation bilan birga, kundalik quroldir.
      </p>

      <h2>querySelectorAll — barcha mos elementlarni topish</h2>
      <p>
        07-darsda <code>querySelector</code> — <strong>birinchi</strong> mos
        elementni topishini ko'rgan edingiz.{' '}
        <code>querySelectorAll</code> esa mos keladigan{' '}
        <strong>barcha</strong> elementlarni qaytaradi:
      </p>
      <CodeBlock lang="javascript">{`const barchaTugmalar = document.querySelectorAll(".mahsulot-tugma")

console.log(barchaTugmalar.length) // nechta mos element topilgani`}</CodeBlock>
      <p>
        <code>querySelectorAll</code>ga har qanday CSS selektor berish mumkin
        — klass, teg, atribut, hatto murakkab kombinatsiyalar:
      </p>
      <CodeBlock lang="javascript">{`document.querySelectorAll("li")                    // barcha <li> elementlari
document.querySelectorAll(".vazifa.bajarildi")       // ham "vazifa", ham "bajarildi" klassiga ega elementlar
document.querySelectorAll("[data-holat='faol']")     // data-holat="faol" atributiga ega elementlar
document.querySelectorAll("#royxat > li")             // "royxat" ning to'g'ridan-to'g'ri bola <li>lari`}</CodeBlock>

      <h2>NodeList — massiv emas, lekin massivga o'xshaydi</h2>
      <p>
        <code>querySelectorAll</code>ning qaytargan qiymati —{' '}
        <strong>NodeList</strong>, haqiqiy massiv emas. U{' '}
        <code>forEach</code>ni qo'llab-quvvatlaydi, lekin{' '}
        <code>map</code>/<code>filter</code>/<code>reduce</code> (5-6-darslar)
        NodeList'da <strong>ishlamaydi</strong>:
      </p>
      <CodeBlock lang="javascript">{`const tugmalar = document.querySelectorAll(".tugma")

tugmalar.forEach((tugma) => console.log(tugma)) // ishlaydi

tugmalar.map((tugma) => tugma.textContent) // XATOLIK: tugmalar.map is not a function`}</CodeBlock>
      <p>
        Yechim — <code>Array.from()</code> bilan haqiqiy massivga aylantirish
        (6-darsda ko'rgan edik), yoki spread operatoridan foydalanish
        (7-dars):
      </p>
      <CodeBlock lang="javascript">{`const tugmalarMassivi = Array.from(tugmalar)
// yoki:
const tugmalarMassivi2 = [...tugmalar]

const matnlar = tugmalarMassivi.map((tugma) => tugma.textContent)
console.log(matnlar) // endi map ishlaydi`}</CodeBlock>
      <Callout type="tip" title="Amaliy qoida">
        Agar faqat elementlarni aylanib chiqish (loop) kerak bo'lsa —{' '}
        <code>forEach</code> yetarli. Agar natijadan yangi massiv yasash,
        saralash yoki qidirish kerak bo'lsa — avval{' '}
        <code>Array.from()</code> yoki <code>[...]</code> bilan massivga
        aylantiring.
      </Callout>
      <Quiz
        question="document.querySelectorAll(...) natijasida to'g'ridan-to'g'ri .filter() chaqirilsa nima bo'ladi?"
        options={[
          "Oddiy ishlaydi, chunki NodeList massiv bilan bir xil",
          "Xatolik beradi, chunki NodeList haqiqiy massiv emas",
          "Bo'sh massiv qaytadi",
          "Avtomatik Array.from() chaqiriladi",
        ]}
        correctIndex={1}
        explanation="NodeList faqat forEach metodini qo'llab-quvvatlaydi. map/filter/reduce kabi massiv metodlarini ishlatish uchun avval Array.from() yoki spread operatori bilan haqiqiy massivga aylantirish kerak."
      />

      <h2>closest() — yuqoriga qarab qidirish</h2>
      <p>
        <code>querySelector</code>/<code>querySelectorAll</code> —{' '}
        <strong>pastga</strong> (bola elementlar ichidan) qidiradi.{' '}
        <code>closest()</code> esa teskarisini qiladi — elementning{' '}
        <strong>o'zidan boshlab, yuqoriga</strong> (ota elementlar bo'ylab)
        birinchi mos keladigan elementni topadi:
      </p>
      <CodeBlock lang="javascript">{`// HTML: <li class="vazifa" data-id="5"><span>Matn</span><button class="ochir">X</button></li>

document.querySelector(".ochir").addEventListener("click", (event) => {
  const vazifaElement = event.target.closest(".vazifa")
  console.log(vazifaElement.dataset.id) // "5" — tugmadan boshlab yuqoriga qarab "vazifa" klassini topdi
})`}</CodeBlock>
      <p>
        Bu — 16-darsdagi event delegation bilan birga eng ko'p ishlatiladigan
        naqsh: <code>event.target</code> odatda bosilgan{' '}
        <strong>kichik</strong> element (tugma, ikonka), lekin bizga kerakli
        ma'lumot (masalan, <code>data-id</code>) ko'pincha uning{' '}
        <strong>ota</strong> elementida saqlanadi.
      </p>
      <Callout type="note" title="closest() o'z-o'zini ham tekshiradi">
        Agar element o'zi selektorga mos kelsa, <code>closest()</code>{' '}
        o'sha elementning o'zini qaytaradi — yuqoriga chiqishning shart
        emasligini avtomatik aniqlaydi. Mos element topilmasa,{' '}
        <code>null</code> qaytadi.
      </Callout>

      <h2>Amaliy misol: mahsulotlar jadvali — filtrlash</h2>
      <p>
        Endi hammasini birlashtiramiz — kategoriya bo'yicha mahsulotlarni
        ko'rsatish/yashirish:
      </p>
      <CodeBlock lang="javascript">{`const kategoriyaTugmalari = document.querySelectorAll(".kategoriya-tugma")
const mahsulotlar = document.querySelectorAll(".mahsulot-kartochka")

kategoriyaTugmalari.forEach((tugma) => {
  tugma.addEventListener("click", () => {
    const tanlanganKategoriya = tugma.dataset.kategoriya

    mahsulotlar.forEach((mahsulot) => {
      const korsatilsinmi = tanlanganKategoriya === "hammasi" || mahsulot.dataset.kategoriya === tanlanganKategoriya
      mahsulot.style.display = korsatilsinmi ? "block" : "none"
    })
  })
})`}</CodeBlock>
      <p>
        Bu misolda <code>querySelectorAll</code> ikki marta — tugmalar va
        mahsulotlar uchun — ishlatildi, har biri <code>forEach</code> bilan
        aylanib chiqilib, DOM'ga bevosita ta'sir qildi. Bu — filtr, tab yoki
        kategoriya tanlash kabi UI qismlarining odatiy qurilish naqshi.
      </p>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Barcha bajarilgan vazifalarni topish">
        <p>
          HTML: bir nechta <code>{'<li class="vazifa bajarildi">'}</code> va{' '}
          <code>{'<li class="vazifa">'}</code>. <code>querySelectorAll</code>{' '}
          yordamida faqat <code>bajarildi</code> klassiga ega elementlar
          sonini konsolga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const bajarilganlar = document.querySelectorAll(".vazifa.bajarildi")
console.log(bajarilganlar.length)`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: NodeList'ni massivga aylantirib saralash">
        <p>
          HTML: bir nechta <code>{'<span class="narx" data-son="15000">'}</code>{' '}
          (turli <code>data-son</code> qiymatlari bilan).{' '}
          <code>querySelectorAll</code> va <code>Array.from</code>{' '}
          yordamida ularni massivga aylantirib, <code>data-son</code>{' '}
          qiymatlari bo'yicha o'sish tartibida saralab, konsolga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const narxElementlari = Array.from(document.querySelectorAll(".narx"))

const saralangan = narxElementlari
  .map((el) => Number(el.dataset.son))
  .sort((a, b) => a - b)

console.log(saralangan)`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: closest() bilan kartochkani topish (delegation)">
        <p>
          HTML: bir nechta{' '}
          <code>{'<div class="mahsulot" data-id="1"><button class="savatga">Savatga</button></div>'}</code>
          . Delegation yordamida (konteynerga bitta listener) istalgan
          "savatga" tugmasi bosilganda, <code>closest()</code> bilan uning
          ota <code>.mahsulot</code>ini topib, <code>data-id</code>sini
          konsolga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`document.getElementById("mahsulotlarRoyxati").addEventListener("click", (event) => {
  if (event.target.classList.contains("savatga")) {
    const mahsulot = event.target.closest(".mahsulot")
    console.log(mahsulot.dataset.id)
  }
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>querySelectorAll</code> — mos keladigan barcha elementlarni
          NodeList ko'rinishida qaytaradi; <code>querySelector</code>{' '}
          faqat birinchisini.
        </li>
        <li>
          NodeList — <code>forEach</code>ni qo'llab-quvvatlaydi, lekin{' '}
          <code>map</code>/<code>filter</code>/<code>reduce</code> uchun
          avval <code>Array.from()</code> yoki spread bilan haqiqiy massivga
          aylantirish kerak.
        </li>
        <li>
          <code>closest(selektor)</code> — elementning o'zidan boshlab,
          yuqoriga (ota elementlar bo'ylab) birinchi mos elementni topadi;
          topilmasa <code>null</code> qaytaradi.
        </li>
        <li>
          <code>event.target.closest(...)</code> — event delegation'da{' '}
          <code>event.target</code>dan (odatda kichik, ichki element)
          kerakli ma'lumotga ega bo'lgan ota elementga "ko'tarilish" uchun
          eng ko'p ishlatiladigan naqsh.
        </li>
      </KeyPoints>
    </>
  )
}
