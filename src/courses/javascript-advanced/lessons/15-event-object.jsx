import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Event obyekti: target, preventDefault, bubbling',
  section: 'DOM: real loyihalar darajasida',
}

export default function EventObjectLesson() {
  return (
    <>
      <p>
        Fundamentals kursida (8, 17-darslar) <code>addEventListener</code>ni
        ko'p ishlatdik, lekin handler funksiyaga <strong>avtomatik ravishda
        beriladigan argument</strong> — event obyekti — hali chuqur
        o'rganilmagan edi. Bu bo'limda DOM bilan haqiqiy loyihalarda
        ishlashning yuragi bo'lgan mavzularni ko'ramiz: event obyekti nima
        ma'lumot beradi, brauzerning standart xatti-harakatini qanday
        to'xtatish mumkin va hodisalar DOM bo'ylab qanday "tarqaladi".
      </p>

      <h2>Event obyekti — handlerga avtomatik beriladi</h2>
      <p>
        Har qanday event handler birinchi argument sifatida{' '}
        <strong>event obyekti</strong>ni oladi — unda hodisa haqida barcha
        ma'lumot bor:
      </p>
      <CodeBlock lang="javascript">{`const tugma = document.getElementById("tugma")

tugma.addEventListener("click", (event) => {
  console.log(event.type)   // "click" — hodisa turi
  console.log(event.target) // aynan bosilgan element
})`}</CodeBlock>
      <p>
        <code>event.target</code> — 03-darsda ko'rgan <code>this</code>ga juda
        o'xshaydi (aslida ko'p hollarda ular bir xil elementga ishora
        qiladi), lekin muhim farq bor: arrow funksiyada <code>this</code>{' '}
        ishlamasa ham, <code>event.target</code> har doim ishlaydi — chunki u{' '}
        <code>this</code>ga emas, <strong>event obyektiga</strong> bog'liq:
      </p>
      <CodeBlock lang="javascript">{`tugma.addEventListener("click", (event) => {
  event.target.classList.toggle("bosilgan") // arrow funksiyada ham ishlaydi
})`}</CodeBlock>

      <h2>preventDefault — brauzerning standart xatti-harakatini to'xtatish</h2>
      <p>
        Ba'zi HTML elementlari o'zining "standart" xatti-harakatiga ega —
        masalan, forma <code>submit</code> bo'lganda sahifa qayta yuklanadi,{' '}
        <code>{'<a href="...">'}</code> bosilganda boshqa sahifaga o'tiladi.
        Zamonaviy ilovalarda bu ko'pincha kerak emas — biz JavaScript orqali
        o'zimiz boshqarishni xohlaymiz:
      </p>
      <CodeBlock lang="javascript">{`const forma = document.getElementById("royxatgaOlishFormasi")

forma.addEventListener("submit", (event) => {
  event.preventDefault() // sahifa qayta yuklanishini to'xtatadi

  console.log("Forma yuborildi, lekin sahifa qayta yuklanmadi")
  // bu yerda fetch orqali ma'lumotni serverga jo'natish mumkin (13-darsdagi kabi)
})`}</CodeBlock>
      <Callout type="warning" title="preventDefault'ni unutish — keng tarqalgan xato">
        Agar formani <code>fetch</code> orqali yuborishni xohlasangiz-u,{' '}
        <code>event.preventDefault()</code>ni unutsangiz, brauzer forma
        ma'lumotini o'zicha yuboradi va sahifa qayta yuklanadi — sizning{' '}
        <code>fetch</code> chaqiruvingiz hech qachon tugamay qoladi. Bu —
        real loyihalarda eng ko'p uchraydigan "nega formam ishlamayapti"
        xatolaridan biri.
      </Callout>
      <Quiz
        question="Forma submit hodisasida event.preventDefault() chaqirilmasa, nima bo'ladi?"
        options={[
          "Hech narsa o'zgarmaydi",
          "Brauzer sahifani standart tarzda qayta yuklaydi (fetch ishlatilgan bo'lsa ham)",
          'JavaScript xatolik chiqaradi',
          'Forma umuman yuborilmaydi',
        ]}
        correctIndex={1}
        explanation="preventDefault() chaqirilmasa, brauzer submit hodisasining standart xatti-harakatini bajaradi — formani odatiy usulda yuboradi va sahifani qayta yuklaydi, bu esa JavaScript orqali boshlangan har qanday amalni (masalan, fetch so'rovini) uzib qo'yishi mumkin."
      />

      <h2>Event bubbling — hodisa yuqoriga "ko'tariladi"</h2>
      <p>
        Bir elementda hodisa yuz berganda, u faqat o'sha elementda emas,{' '}
        <strong>ota elementlarida ham</strong> ketma-ket ishga tushadi — bu{' '}
        <strong>bubbling</strong> (pufakcha kabi "ko'tarilish") deyiladi:
      </p>
      <CodeBlock lang="javascript">{`// HTML: <div id="tashqi"><button id="ichki">Bos</button></div>

document.getElementById("tashqi").addEventListener("click", () => {
  console.log("Tashqi div bosildi")
})

document.getElementById("ichki").addEventListener("click", () => {
  console.log("Ichki tugma bosildi")
})

// Tugmani bossangiz, konsolda IKKALASI ham chiqadi:
// "Ichki tugma bosildi"
// "Tashqi div bosildi"`}</CodeBlock>
      <Callout type="note" title="Nega bu foydali?">
        Bubbling — keyingi darsdagi <strong>event delegation</strong> (hodisa
        vakolatlashi) texnikasining asosi: bitta listenerni ota elementga
        qo'yib, undagi ko'plab bola elementlar uchun yuz beradigan hodisalarni
        ushlash mumkin. Bu ayniqsa dinamik (JavaScript orqali yaratiladigan)
        elementlar bilan ishlashda juda foydali — buni to'liq keyingi darsda
        ko'ramiz.
      </Callout>
      <p>
        Agar bubbling'ni to'xtatish kerak bo'lsa (kamdan-kam holatlarda){' '}
        <code>event.stopPropagation()</code> ishlatiladi:
      </p>
      <CodeBlock lang="javascript">{`document.getElementById("ichki").addEventListener("click", (event) => {
  event.stopPropagation() // bubbling'ni to'xtatadi
  console.log("Faqat shu qator chiqadi, tashqi div listeneri ishlamaydi")
})`}</CodeBlock>

      <h2>Foydali event xususiyatlari</h2>
      <p>Klaviatura va sichqoncha hodisalarida event obyekti qo'shimcha ma'lumot beradi:</p>
      <CodeBlock lang="javascript">{`const inputElement = document.getElementById("qidiruv")

inputElement.addEventListener("keydown", (event) => {
  console.log(event.key) // bosilgan tugma nomi: "Enter", "a", "Backspace" va h.k.

  if (event.key === "Enter") {
    console.log("Qidiruv boshlandi!")
  }
})`}</CodeBlock>
      <p>
        Bu naqsh real qidiruv maydonlarida (masalan, "Enter bosilganda
        qidirish") va yakuniy loyihamizdagi shahar qidiruvida ishlatiladi.
      </p>

      <h2>Amaliy misol: forma validatsiyasi (real hayotiy naqsh)</h2>
      <CodeBlock lang="javascript">{`const forma = document.getElementById("royxatgaOlishFormasi")

forma.addEventListener("submit", (event) => {
  event.preventDefault()

  const emailInput = document.getElementById("email")
  const xatoElement = document.getElementById("emailXatosi")

  if (!emailInput.value.includes("@")) {
    xatoElement.textContent = "Email manzil noto'g'ri"
    return
  }

  xatoElement.textContent = ""
  console.log("Forma to'g'ri to'ldirildi, yuborilmoqda...")
})`}</CodeBlock>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: event.target bilan ishlash">
        <p>
          HTML: bir nechta <code>{'<div class="rang-blok" data-rang="qizil"></div>'}</code>{' '}
          (turli <code>data-rang</code> qiymatlari bilan). Har qanday blok
          bosilganda, <code>event.target</code> orqali uning{' '}
          <code>data-rang</code> qiymatini konsolga chiqaradigan bitta
          listenerni <code>document</code>ga biriktiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`document.addEventListener("click", (event) => {
  if (event.target.classList.contains("rang-blok")) {
    console.log(event.target.dataset.rang)
  }
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Formani preventDefault bilan boshqarish">
        <p>
          HTML: <code>{'<form id="forma"><input id="ism" /><button type="submit">Yubor</button></form>'}</code>
          . Forma yuborilganda sahifa qayta yuklanmasin, aksincha,{' '}
          <code>ism</code> inputining qiymatini konsolga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`document.getElementById("forma").addEventListener("submit", (event) => {
  event.preventDefault()

  const ism = document.getElementById("ism").value
  console.log("Kiritilgan ism:", ism)
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Enter tugmasi bilan qidirish">
        <p>
          HTML: <code>{'<input id="qidiruv" />'}</code>. Foydalanuvchi{' '}
          <code>Enter</code> tugmasini bosganda (boshqa tugmalarda emas)
          inputning qiymatini konsolga <code>"Qidirilmoqda: [qiymat]"</code>{' '}
          ko'rinishida chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`document.getElementById("qidiruv").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    console.log("Qidirilmoqda: " + event.target.value)
  }
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Har qanday event handler birinchi argument sifatida event obyektini
          oladi; <code>event.target</code> — hodisa aslida yuz bergan
          element, arrow funksiyada ham ishonchli ishlaydi.
        </li>
        <li>
          <code>event.preventDefault()</code> — brauzerning standart xatti-
          harakatini (forma yuborilganda sahifa qayta yuklanishi, havola
          bosilganda o'tish) to'xtatadi.
        </li>
        <li>
          Event bubbling — hodisa bola elementdan boshlab, ota elementlarga
          qarab "ko'tariladi"; <code>event.stopPropagation()</code> buni
          to'xtatadi.
        </li>
        <li>
          <code>event.key</code> — klaviatura hodisalarida qaysi tugma
          bosilganini bilish uchun ishlatiladi (masalan, <code>"Enter"</code>
          ni tekshirish).
        </li>
      </KeyPoints>
    </>
  )
}
