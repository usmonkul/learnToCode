import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Event delegation',
  section: 'DOM: real loyihalar darajasida',
}

export default function EventDelegationLesson() {
  return (
    <>
      <p>
        Fundamentals kursidagi to-do loyihasida (19-dars) har bir yangi
        vazifa yaratilganda, unga alohida <code>addEventListener</code>{' '}
        biriktirilgan edi. Bu ishlaydi, lekin muammosi bor: 100 ta vazifa
        bo'lsa — 100 ta alohida listener. Bu darsda o'tgan darsdagi{' '}
        <strong>bubbling</strong> xususiyatidan foydalanib, bitta listener
        bilan cheksiz sonli (hatto hali yaratilmagan!) elementlarni
        boshqarish usulini — <strong>event delegation</strong> (hodisa
        vakolatlashi) — o'rganamiz.
      </p>

      <h2>Muammo: dinamik elementlarga listener biriktirish</h2>
      <p>
        18-darsda <code>createElement</code> bilan yangi element
        yaratganingizni eslang. Muammo shunda: agar elementga listener
        yaratilgan paytda biriktirilsa-yu, keyinroq shunga o'xshash yana
        elementlar qo'shilsa, ularga listener <strong>avtomatik</strong>{' '}
        qo'shilmaydi:
      </p>
      <CodeBlock lang="javascript">{`document.querySelectorAll(".vazifa-ochir-tugma").forEach((tugma) => {
  tugma.addEventListener("click", () => {
    tugma.closest(".vazifa").remove()
  })
})

// Muammo: bu kod faqat SAHIFA YUKLANGANDA mavjud bo'lgan tugmalarga ishlaydi.
// Keyinroq JavaScript orqali qo'shilgan yangi "vazifa-ochir-tugma"lar bu listenerni OLMAYDI!`}</CodeBlock>
      <Callout type="warning" title="19-darsdagi to-do loyihasida bu muammo qanday 'yashiringan' edi?">
        U yerda butun ro'yxat har safar <code>render()</code> funksiyasi
        orqali <code>innerHTML = ""</code> bilan tozalanib, qaytadan{' '}
        <code>createElement</code>lar bilan yaratilgan va listenerlar har
        safar qaytadan biriktirilgan edi. Bu ishlaydi, lekin katta ro'yxatda
        <strong> samarasiz</strong> — har bir o'zgarishda butun DOM qayta
        qurilib, barcha listenerlar qayta yaratiladi.
      </Callout>

      <h2>Yechim: listenerni ota elementga qo'yish</h2>
      <p>
        O'tgan darsda ko'rgan bubbling tufayli, bola elementdagi hodisa ota
        elementda ham "eshitiladi". Shuning uchun listenerni{' '}
        <strong>har bir tugmaga emas, doimiy turadigan ota elementga</strong>{' '}
        bitta marta biriktirish mumkin:
      </p>
      <CodeBlock lang="javascript">{`const vazifalarRoyxati = document.getElementById("vazifalarRoyxati") // hech qachon o'chmaydigan konteyner

vazifalarRoyxati.addEventListener("click", (event) => {
  if (event.target.classList.contains("vazifa-ochir-tugma")) {
    event.target.closest(".vazifa").remove()
  }
})

// Endi vazifalarRoyxati ichiga qancha yangi "vazifa-ochir-tugma" qo'shilmasin,
// bitta listener BARCHASINI boshqaradi — chunki bubbling orqali klik ota elementga yetib boradi`}</CodeBlock>
      <p>
        <code>event.target</code> — aynan bosilgan elementning o'zi (masalan,
        tugma), <code>closest(".vazifa")</code> esa shu tugmadan yuqoriga
        qarab, birinchi mos keladigan ota elementni topadi (buni keyingi
        bo'limda chuqurroq ko'ramiz).
      </p>
      <Quiz
        question="Event delegation qanday ishlaydi?"
        options={[
          "Har bir bola elementga alohida listener biriktiriladi",
          "Listener ota elementga qo'yiladi, bubbling orqali bola elementlardagi hodisalarni ham ushlaydi",
          "Brauzer avtomatik ravishda barcha elementlarga listener qo'shadi",
          "addEventListener ichida 'delegate: true' sozlamasi ishlatiladi",
        ]}
        correctIndex={1}
        explanation="Event delegation — listenerni bola elementlarning umumiy ota elementiga qo'yish, va event.target orqali aynan qaysi bola bosilganini aniqlash. Bu bubbling xususiyatiga asoslanadi va yangi qo'shilgan (hali mavjud bo'lmagan) bola elementlar uchun ham avtomatik ishlaydi."
      />

      <h2>Nega bu real loyihalarda muhim?</h2>
      <p>
        Event delegation ikkita katta afzallik beradi:
      </p>
      <ol>
        <li>
          <strong>Ishlash unumdorligi</strong> — 1000 ta elementga 1000 ta
          listener o'rniga, bitta listener yetarli.
        </li>
        <li>
          <strong>Dinamik elementlar avtomatik ishlaydi</strong> — yangi
          element qo'shilganda, listenerni qayta biriktirish shart emas.
        </li>
      </ol>
      <p>
        Endi to-do loyihasini delegation bilan qayta yozamiz — vazifa
        qo'shilganda faqat shu bitta elementni <code>appendChild</code>{' '}
        qilamiz (butun ro'yxatni qayta qurmasdan), o'chirish esa bitta umumiy
        listener orqali ishlaydi:
      </p>
      <CodeBlock lang="javascript">{`const vazifalarRoyxati = document.getElementById("vazifalarRoyxati")
const yangiVazifaInput = document.getElementById("yangiVazifa")

function vazifaElementiYarat(matn) {
  const li = document.createElement("li")
  li.className = "vazifa"
  li.innerHTML = \`
    <span>\${matn}</span>
    <button class="vazifa-ochir-tugma">O'chirish</button>
  \`
  return li
}

document.getElementById("qoshishTugmasi").addEventListener("click", () => {
  const yangiElement = vazifaElementiYarat(yangiVazifaInput.value)
  vazifalarRoyxati.appendChild(yangiElement) // faqat YANGI elementni qo'shamiz
  yangiVazifaInput.value = ""
})

// Bitta listener — istalgan sondagi (hozirgi va kelajakdagi) tugmalar uchun ishlaydi:
vazifalarRoyxati.addEventListener("click", (event) => {
  if (event.target.classList.contains("vazifa-ochir-tugma")) {
    event.target.closest(".vazifa").remove()
  }
})`}</CodeBlock>
      <Callout type="tip" title="19-darsdagi to-do loyihasi bilan solishtiring">
        Bu versiyada butun ro'yxat hech qachon <code>innerHTML = ""</code>{' '}
        bilan tozalanmaydi — faqat kerakli o'zgarish (yangi element qo'shish
        yoki bitta elementni o'chirish) amalga oshiriladi. Katta ro'yxatlarda
        bu sezilarli darajada tezroq va DOM'ga "yumshoqroq" munosabatda
        bo'ladi.
      </Callout>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Dinamik ro'yxat, bitta listener">
        <p>
          HTML: <code>{'<ul id="royxat"></ul>'}</code>,{' '}
          <code>{'<button id="qoshTugmasi">Qo\'shish</button>'}</code>. Tugma
          bosilganda ro'yxatga <code>{'<li>Element <button class="ochir">X</button></li>'}</code>{' '}
          ko'rinishida yangi qator qo'shing. Delegation yordamida{' '}
          <code>"ochir"</code> klassidagi istalgan tugma bosilganda, o'sha{' '}
          <code>{'<li>'}</code>ni o'chiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const royxat = document.getElementById("royxat")

document.getElementById("qoshTugmasi").addEventListener("click", () => {
  const li = document.createElement("li")
  li.innerHTML = 'Element <button class="ochir">X</button>'
  royxat.appendChild(li)
})

royxat.addEventListener("click", (event) => {
  if (event.target.classList.contains("ochir")) {
    event.target.closest("li").remove()
  }
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Rangli kartochkalarni tanlash (delegation bilan)">
        <p>
          HTML: <code>{'<div id="kartochkalar"></div>'}</code>. JavaScript
          orqali 5 ta <code>{'<div class="kartochka" data-nom="Kartochka 1">'}</code>{' '}
          elementi yarating va qo'shing. Delegation yordamida istalgan
          kartochka bosilganda, uning <code>data-nom</code>ini konsolga
          chiqaring (har bir kartochkaga alohida listener biriktirmang).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const konteyner = document.getElementById("kartochkalar")

for (let i = 1; i <= 5; i++) {
  const div = document.createElement("div")
  div.className = "kartochka"
  div.dataset.nom = "Kartochka " + i
  div.textContent = "Kartochka " + i
  konteyner.appendChild(div)
}

konteyner.addEventListener("click", (event) => {
  if (event.target.classList.contains("kartochka")) {
    console.log(event.target.dataset.nom)
  }
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Event delegation — listenerni har bir bola elementga emas, umumiy,
          doimiy turadigan ota elementga bitta marta biriktirish; bubbling
          orqali bola elementlardagi hodisalarni ham ushlaydi.
        </li>
        <li>
          <code>event.target</code> orqali aynan qaysi bola element bosilganini
          aniqlash, <code>classList.contains()</code> yoki{' '}
          <code>closest()</code> bilan tekshirish — delegation'ning asosiy
          naqshi.
        </li>
        <li>
          Delegation'ning ikki asosiy afzalligi: kamroq listener (unumdorlik)
          va yangi qo'shilgan (dinamik) elementlar uchun avtomatik ishlashi.
        </li>
        <li>
          Bu naqsh — 19-darsdagi to-do loyihasidagi "butun ro'yxatni har
          safar innerHTML orqali qayta qurish" yondashuviga qaraganda
          samaraliroq muqobil.
        </li>
      </KeyPoints>
    </>
  )
}
