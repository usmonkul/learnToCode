import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Yopilmalar (closures)',
  section: 'Chuqur asoslar',
}

export default function ClosuresLesson() {
  return (
    <>
      <p>
        O'tgan darsda <code>let</code> tufayli har bir tsikl iteratsiyasi o'zining
        alohida <code>i</code> nusxasini "eslab qolishini" ko'rdik. Bu hodisaning
        texnik nomi — <strong>closure</strong> (yopilma). Closure — JavaScriptdagi eng
        kuchli, lekin ko'pincha noto'g'ri tushuniladigan mavzulardan biri. U zamonaviy
        front-end kodning deyarli har bir joyida — hatto React'ning{' '}
        <code>useState</code>i ichida ham — ishlatiladi, shuning uchun uni chuqur
        tushunish keyingi barcha darslar uchun poydevor bo'ladi.
      </p>

      <h2>Closure nima?</h2>
      <p>
        <strong>Closure</strong> — funksiya o'zi yaratilgan joydagi o'zgaruvchilarni{' '}
        "eslab qolish" xususiyati, hatto o'sha tashqi funksiya ishini tugatgandan
        keyin ham:
      </p>
      <CodeBlock lang="javascript">{`function salomlashFunksiyasiniYarat(ism) {
  return function () {
    console.log("Salom, " + ism + "!")
  }
}

const azizgaSalom = salomlashFunksiyasiniYarat("Aziz")
const malikagaSalom = salomlashFunksiyasiniYarat("Malika")

azizgaSalom()   // "Salom, Aziz!"
malikagaSalom() // "Salom, Malika!"`}</CodeBlock>
      <p>
        <code>salomlashFunksiyasiniYarat</code> ishini tugatib, o'z ichki funksiyasini{' '}
        <code>return</code> qiladi. Ajablanarlisi shundaki — qaytarilgan funksiya{' '}
        <code>ism</code> parametrini hali ham "eslab qoladi", garchi tashqi funksiya
        allaqachon ishlab bo'lgan bo'lsa ham. Har bir chaqiruv o'zining shaxsiy{' '}
        <code>ism</code> nusxasiga ega — <code>azizgaSalom</code> va{' '}
        <code>malikagaSalom</code> bir-biriga xalaqit bermaydi.
      </p>
      <Callout type="note" title="Nega shunday nomlangan?">
        Ichki funksiya tashqi o'zgaruvchini o'zi bilan birga "yopib" (close over)
        olib ketadi — shu sababli <strong>closure</strong>. Rasman aytganda, har bir
        JavaScript funksiyasi closure hosil qiladi: u har doim o'zi yaratilgan
        muhitdagi o'zgaruvchilarga kirish huquqiga ega bo'ladi.
      </Callout>

      <h2>Amaliy foyda: shaxsiy (private) holat</h2>
      <p>
        Closure'ning eng ko'p ishlatiladigan real qo'llanilishi — tashqaridan
        to'g'ridan-to'g'ri o'zgartirib bo'lmaydigan, faqat maxsus funksiyalar orqali
        boshqariladigan "shaxsiy" ma'lumot yaratish. Masalan, sahifadagi like
        tugmasi uchun hisoblagich:
      </p>
      <CodeBlock lang="javascript">{`function hisoblagichYarat() {
  let son = 0 // "son" tashqaridan ko'rinmaydi

  return {
    ortirish: () => {
      son = son + 1
      return son
    },
    korish: () => son,
  }
}

const likeHisoblagich = hisoblagichYarat()

console.log(likeHisoblagich.ortirish()) // 1
console.log(likeHisoblagich.ortirish()) // 2
console.log(likeHisoblagich.korish())   // 2
console.log(likeHisoblagich.son)        // undefined — "son"ga to'g'ridan-to'g'ri kirib bo'lmaydi`}</CodeBlock>
      <p>
        <code>son</code> o'zgaruvchisi funksiya ichida "berkitilgan" — uni faqat{' '}
        <code>ortirish</code> va <code>korish</code> orqali o'zgartirish/ko'rish
        mumkin, tashqaridan bevosita tegib bo'lmaydi. Bu — obyektning ichki holatini
        himoyalab, faqat nazorat qilingan "eshiklar" (metodlar) orqali ishlash
        printsipi, katta loyihalarda juda foydali.
      </p>

      <h2>Real hayotiy misol: bir nechta mustaqil hisoblagich (DOM)</h2>
      <p>
        Endi closure'ni DOM bilan birlashtiramiz. Sahifada bir nechta mahsulot bor,
        har birining o'z "soni" (miqdori) hisoblagichi kerak — xuddi online do'konlar
        kabi. HTML: har bir mahsulot uchun{' '}
        <code>{'<span class="son">0</span>'}</code> va{' '}
        <code>{'<button class="ortir-tugma">+</button>'}</code>.
      </p>
      <CodeBlock lang="javascript">{`function mahsulotHisoblagichiYarat(sonElement) {
  let son = 0

  return () => {
    son = son + 1
    sonElement.textContent = son
  }
}

const tugmalar = document.querySelectorAll(".ortir-tugma")

tugmalar.forEach((tugma) => {
  const sonElement = tugma.previousElementSibling // 07-darsda ko'rgan DOM navigatsiyaga o'xshash
  const ortirish = mahsulotHisoblagichiYarat(sonElement)

  tugma.addEventListener("click", ortirish)
})`}</CodeBlock>
      <p>
        Har bir mahsulot uchun <code>mahsulotHisoblagichiYarat</code> chaqirilganda,
        yangi, mustaqil <code>son</code> yaratiladi. Bitta mahsulotning "+"
        tugmasini bossangiz, faqat o'sha mahsulotning soni ortadi — chunki har bir
        tugmaga bog'langan funksiya o'zining shaxsiy <code>son</code>ini "yopib"
        olgan.
      </p>

      <h2>Closure va tsikl — nega let ishladi</h2>
      <p>
        Endi o'tgan darsdagi tugmalar misolini closure nuqtai nazaridan qayta
        ko'rib chiqamiz:
      </p>
      <CodeBlock lang="javascript">{`for (let i = 0; i < tugmalar.length; i++) {
  tugmalar[i].onclick = () => {
    console.log(i)
  }
}`}</CodeBlock>
      <p>
        <code>let</code> bilan yaratilgan <code>i</code> — tsiklning har bir
        aylanishida <strong>yangi</strong> o'zgaruvchi hisoblanadi. Har bir{' '}
        <code>onclick</code> funksiyasi o'zining iteratsiyasidagi <code>i</code>ni
        closure orqali "yopib" oladi. <code>var</code> bilan esa <code>i</code>{' '}
        bitta umumiy o'zgaruvchi bo'lgani uchun barcha funksiyalar bitta (oxirgi)
        qiymatni "ko'radi". Demak — closure aslida yangi tushuncha emas, siz uni 1-darsda
        allaqachon amalda ko'rgan edingiz.
      </p>
      <Quiz
        question="Quyidagi kod nima chiqaradi? function f() { let hisob = 0; return () => { hisob++; return hisob } } const a = f(); const b = f(); console.log(a(), a(), b())"
        options={['1 2 1', '1 1 1', '1 2 3', 'Xatolik beradi']}
        correctIndex={0}
        explanation="a va b — f()ning ikkita alohida chaqiruvi, demak ikkalasi ham o'zining mustaqil 'hisob' o'zgaruvchisiga ega. a() ikki marta chaqirilgani uchun 1, 2 chiqadi; b() birinchi marta chaqirilgani uchun o'z hisobidan 1 chiqadi."
      />

      <h2>Diqqat: closure xotira sarflaydi</h2>
      <Callout type="warning" title="Ishlatilmagan closure'lar xotirani band qiladi">
        Closure tashqi o'zgaruvchini "eslab qolar ekan", u o'zgaruvchini xotiradan
        (memory) darhol o'chirilishiga yo'l qo'ymaydi. Agar sahifada juda ko'p
        elementga (masalan, minglab qatorli jadvalga) closure orqali event listener
        biriktirilsa va elementlar keyin DOM'dan olib tashlansa-yu, listenerlar
        o'chirilmasa — bu xotira sızishi (memory leak)ga olib kelishi mumkin. Keyingi
        bo'limda o'rganadigan <code>removeEventListener</code> aynan shu muammoni
        oldini olish uchun kerak.
      </Callout>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Ko'paytiruvchi funksiya fabrikasi">
        <p>
          <code>kopaytuvchiYarat(son)</code> nomli funksiya yozing — u{' '}
          <code>son</code>ni "eslab qoladigan" yangi funksiya qaytaradi; qaytarilgan
          funksiya boshqa bir sonni qabul qilib, uni <code>son</code>ga ko'paytirib
          qaytaradi. Masalan, <code>ikkigaKopaytir = kopaytuvchiYarat(2)</code>, keyin{' '}
          <code>ikkigaKopaytir(5)</code> — <code>10</code> qaytarishi kerak.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function kopaytuvchiYarat(son) {
  return (boshqaSon) => son * boshqaSon
}

const ikkigaKopaytir = kopaytuvchiYarat(2)
const ongaKopaytir = kopaytuvchiYarat(10)

console.log(ikkigaKopaytir(5)) // 10
console.log(ongaKopaytir(5))   // 50`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Bank hisobi (shaxsiy balans)">
        <p>
          <code>hisobYarat(boshlangichBalans)</code> funksiyasini yozing — u{' '}
          <code>tolash(summa)</code> va <code>balansniKor()</code> metodlari bo'lgan
          obyekt qaytaradi. Balans tashqaridan to'g'ridan-to'g'ri o'zgartirilmasin
          (faqat shu ikki metod orqali).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function hisobYarat(boshlangichBalans) {
  let balans = boshlangichBalans

  return {
    tolash: (summa) => {
      balans = balans - summa
      return balans
    },
    balansniKor: () => balans,
  }
}

const meningHisobim = hisobYarat(100000)
console.log(meningHisobim.tolash(30000))  // 70000
console.log(meningHisobim.balansniKor())  // 70000`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Har bir kartochka uchun mustaqil like hisoblagichi">
        <p>
          HTML: bir nechta <code>{'<div class="kartochka">'}</code>, har birida{' '}
          <code>{'<span class="like-son">0</span>'}</code> va{' '}
          <code>{'<button class="like-tugma">❤️</button>'}</code>. Har bir
          kartochkaning "like" tugmasi faqat o'sha kartochkaning sonini oshiradigan
          kodni closure yordamida yozing (yuqoridagi "mahsulot hisoblagichi"
          misoliga o'xshab).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function likeHisoblagichiYarat(sonElement) {
  let son = 0

  return () => {
    son = son + 1
    sonElement.textContent = son
  }
}

document.querySelectorAll(".kartochka").forEach((kartochka) => {
  const sonElement = kartochka.querySelector(".like-son")
  const tugma = kartochka.querySelector(".like-tugma")

  tugma.addEventListener("click", likeHisoblagichiYarat(sonElement))
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Bir marta ishlaydigan funksiya (once)">
        <p>
          <code>birMartaIshlat(funksiya)</code> nomli funksiya yozing — u boshqa
          funksiyani qabul qilib, shunday yangi funksiya qaytaradi: bu yangi funksiya
          faqat <strong>birinchi</strong> chaqiruvda asl funksiyani ishga tushiradi,
          keyingi chaqiruvlarda esa hech narsa qilmaydi. (Maslahat: closure ichida
          boolean flag saqlang.)
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function birMartaIshlat(funksiya) {
  let ishlatilganmi = false

  return (...argumentlar) => {
    if (ishlatilganmi) return
    ishlatilganmi = true
    funksiya(...argumentlar)
  }
}

const royxatgaOlish = birMartaIshlat(() => console.log("Ro'yxatga olindingiz!"))

royxatgaOlish() // "Ro'yxatga olindingiz!"
royxatgaOlish() // hech narsa chiqmaydi
royxatgaOlish() // hech narsa chiqmaydi`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Closure — funksiyaning o'zi yaratilgan muhitdagi o'zgaruvchilarni tashqi
          funksiya ishini tugatgandan keyin ham "eslab qolish" xususiyati.
        </li>
        <li>
          Closure orqali shaxsiy (private) holat yaratish mumkin — o'zgaruvchi faqat
          maxsus qaytarilgan funksiyalar orqali o'zgartiriladi, tashqaridan
          to'g'ridan-to'g'ri ko'rinmaydi.
        </li>
        <li>
          Har bir funksiya chaqiruvi (masalan, fabrika funksiyasidan) o'zining
          mustaqil closure nusxasiga ega bo'ladi — shu sababli bir nechta hisoblagich
          bir-biriga xalaqit bermaydi.
        </li>
        <li>
          Oldingi darsdagi <code>let</code> va <code>for</code> tsikli misoli —
          closure'ning eng amaliy ko'rinishi: har bir iteratsiya o'z closure'iga ega.
        </li>
        <li>
          Ko'p sonli elementlarga closure orqali listener biriktirilganda,
          ishlatilmay qolgan closure'lar xotirani band qilib turishi mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
