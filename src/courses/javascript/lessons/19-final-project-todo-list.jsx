import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Yakuniy loyiha: Vazifalar ro'yxati",
  section: 'Amaliy loyiha',
}

export default function FinalProjectTodoListLesson() {
  return (
    <>
      <p>
        12-18-darslarda massivlar, obyektlar, <code>for</code> tsikli, funksiyalar va DOM
        bilan ishlashning turli usullarini alohida-alohida o'rgandik. Endi hammasini bitta
        haqiqiy dasturga — <strong>vazifalar ro'yxati</strong> (to-do list) ilovasiga —
        birlashtiramiz: foydalanuvchi vazifa qo'shadi, uni bajarilgan deb belgilaydi va
        kerak bo'lmasa o'chiradi.
      </p>

      <h2>Kerakli HTML</h2>
      <p>Boshlash uchun sahifada quyidagi elementlar bo'lishi kerak:</p>
      <CodeBlock lang="html">{`<input type="text" id="vazifaInput" placeholder="Yangi vazifa..." />
<button id="qoshTugmasi">Qo'shish</button>
<p id="hisoblagich"></p>
<ul id="vazifalarRoyxati"></ul>`}</CodeBlock>
      <p>
        Bajarilgan vazifalarni vizual ajratish uchun ozgina CSS ham kerak bo'ladi:
      </p>
      <CodeBlock lang="css">{`.bajarildi {
  text-decoration: line-through;
  opacity: 0.6;
}`}</CodeBlock>

      <h2>1-qadam: Ma'lumotlar tuzilishi</h2>
      <p>
        14-darsda ko'rganimizdek, bir xil tuzilishdagi ko'p narsani saqlash uchun{' '}
        <strong>obyektlar massivi</strong> eng mos usul. Har bir vazifa — <code>id</code>{' '}
        (uni keyinchalik topish uchun noyob raqam), <code>matn</code> va{' '}
        <code>bajarildi</code> (boolean) xususiyatlariga ega obyekt bo'ladi:
      </p>
      <CodeBlock lang="javascript">{`let vazifalar = []
let keyingiId = 1

let vazifaInput = document.getElementById("vazifaInput")
let qoshTugmasi = document.getElementById("qoshTugmasi")
let royxatElement = document.getElementById("vazifalarRoyxati")
let hisoblagichElement = document.getElementById("hisoblagich")`}</CodeBlock>
      <p>
        <code>keyingiId</code> — har bir yangi vazifaga o'ziga xos raqam berish uchun; har
        safar vazifa qo'shilganda uni bittaga oshiramiz, shunda hech ikkita vazifa bir xil{' '}
        <code>id</code>ga ega bo'lmaydi.
      </p>

      <h2>2-qadam: Ro'yxatni ekranga chizish</h2>
      <p>
        18-darsda ko'rgan <code>createElement()</code>/<code>appendChild()</code> naqshini
        ishlatib, <code>vazifalar</code> massividagi har bir obyekt uchun HTML element
        yasaymiz. Bu funksiyani <code>render</code> deb ataymiz — u har safar ma'lumot
        o'zgarganda qayta chaqiriladi va ro'yxatni <strong>qaytadan</strong> chizadi:
      </p>
      <CodeBlock lang="javascript">{`function render() {
  royxatElement.innerHTML = "" // avvalgi ro'yxatni tozalaymiz

  for (let i = 0; i < vazifalar.length; i++) {
    let vazifa = vazifalar[i]

    let liElement = document.createElement("li")

    let matnElement = document.createElement("span")
    matnElement.textContent = vazifa.matn
    if (vazifa.bajarildi) {
      matnElement.classList.add("bajarildi")
    }

    let bajarildiTugmasi = document.createElement("button")
    bajarildiTugmasi.textContent = "✓"
    bajarildiTugmasi.addEventListener("click", () => {
      vazifaniBajarildiQil(vazifa.id)
    })

    let ochirTugmasi = document.createElement("button")
    ochirTugmasi.textContent = "O'chirish"
    ochirTugmasi.addEventListener("click", () => {
      vazifaniOchir(vazifa.id)
    })

    liElement.appendChild(matnElement)
    liElement.appendChild(bajarildiTugmasi)
    liElement.appendChild(ochirTugmasi)
    royxatElement.appendChild(liElement)
  }

  hisoblagichniYangilash()
}`}</CodeBlock>
      <Callout type="note" title="Nega har safar innerHTML ni tozalab, qaytadan chizamiz?">
        Bu — mayda ilovalarda eng oddiy va tushunarli yondashuv: ma'lumot (
        <code>vazifalar</code> massivi) o'zgarganda, ekranni butunlay yangi ma'lumotga mos
        holda qaytadan chizamiz, ayrim elementlarni qo'lda qidirib o'zgartirish o'rniga.
        Katta ilovalarda buni React kabi kutubxonalar avtomatik va samarali bajaradi.
      </Callout>

      <h2>3-qadam: Yangi vazifa qo'shish</h2>
      <p>
        4-darsda ko'rgan <code>.trim()</code> yordamida bo'sh joylardan tozalab, foydalanuvchi
        faqat bo'sh joy kiritib "qo'shish"ni bosolmasligini ta'minlaymiz:
      </p>
      <CodeBlock lang="javascript">{`function vazifaQoshish() {
  let matn = vazifaInput.value.trim()

  if (matn === "") {
    return
  }

  vazifalar.push({ id: keyingiId, matn: matn, bajarildi: false })
  keyingiId = keyingiId + 1

  vazifaInput.value = ""
  render()
}

qoshTugmasi.addEventListener("click", vazifaQoshish)`}</CodeBlock>
      <Callout type="tip" title="Funksiya nomini qavssiz uzatish">
        <code>addEventListener("click", vazifaQoshish)</code> — bu yerda{' '}
        <code>vazifaQoshish</code> qavssiz yozilgan, chunki biz uni <strong>hozir emas</strong>
        , faqat bosilganda ishga tushirilishini xohlaymiz. Bu 8-darsda ko'rgan{' '}
        <code>fn</code> va <code>fn()</code> farqining aynan o'zi.
      </Callout>

      <h2>4-qadam: Bajarildi deb belgilash</h2>
      <p>
        Bu yerda vazifani <code>.map()</code>siz, oddiy <code>for</code> tsikli bilan
        yangilaymiz — mos <code>id</code>li obyektni topib, uning{' '}
        <code>bajarildi</code>sini teskarisiga o'zgartiramiz:
      </p>
      <CodeBlock lang="javascript">{`function vazifaniBajarildiQil(id) {
  for (let i = 0; i < vazifalar.length; i++) {
    if (vazifalar[i].id === id) {
      vazifalar[i].bajarildi = !vazifalar[i].bajarildi
    }
  }

  render()
}`}</CodeBlock>

      <h2>5-qadam: Vazifani o'chirish</h2>
      <p>
        Massivdan bitta elementni olib tashlashning eng tushunarli usuli — kerakli
        elementdan tashqarisini yangi massivga <code>push()</code> qilib yig'ish:
      </p>
      <CodeBlock lang="javascript">{`function vazifaniOchir(id) {
  let yangiRoyxat = []

  for (let i = 0; i < vazifalar.length; i++) {
    if (vazifalar[i].id !== id) {
      yangiRoyxat.push(vazifalar[i])
    }
  }

  vazifalar = yangiRoyxat
  render()
}`}</CodeBlock>
      <Callout type="tip" title="Kelajakda: .filter() bilan bitta qatorda">
        Yuqoridagi funksiya aslida <strong>filtrlash</strong> qilyapti — "shu shartga mos
        kelmaganlarni yangi massivga yig'ish". JavaScript'ning ilg'or kursida
        o'rganadigan <code>.filter()</code> metodi aynan shu naqshni bitta qatorga
        sig'diradi. Hozircha uni <code>for</code> tsikli bilan qo'lda qanday
        qilinishini tushunish — keyinroq <code>.filter()</code>ni ishlatganda, u
        "sehr" emas, aynan shu mantiqni bajarayotganini bilib turasiz.
      </Callout>

      <h2>6-qadam: Qolgan vazifalar sonini ko'rsatish</h2>
      <CodeBlock lang="javascript">{`function hisoblagichniYangilash() {
  let bajarilmaganSoni = 0

  for (let i = 0; i < vazifalar.length; i++) {
    if (!vazifalar[i].bajarildi) {
      bajarilmaganSoni = bajarilmaganSoni + 1
    }
  }

  hisoblagichElement.textContent = bajarilmaganSoni + " ta vazifa qoldi"
}

render() // ilova ochilganda ro'yxatni (bo'sh holda) birinchi marta chizib qo'yamiz`}</CodeBlock>
      <p>
        E'tibor bering — <code>hisoblagichniYangilash()</code>ni alohida chaqirishning
        hojati yo'q, chunki u <code>render()</code> ichida allaqachon chaqirilgan (2-qadamga
        qarang). Shunday qilib, ma'lumot o'zgargan har bir joyda faqat{' '}
        <code>render()</code>ni chaqirish yetarli — u ham ro'yxatni, ham hisoblagichni
        yangilaydi.
      </p>

      <h2>Amaliyot</h2>
      <p>
        Yuqoridagi ilovaga quyidagi qo'shimcha imkoniyatlarni qo'shing. Har birida{' '}
        <code>vazifalar</code> massivini, kerakli funksiyalarni va <code>render()</code>ni
        ishlatasiz.
      </p>

      <Exercise title="1-vazifa: Jami va bajarilgan sonini ko'rsatish">
        <p>
          <code>hisoblagichniYangilash()</code>ni kengaytiring — endi u faqat qolgan sonini
          emas, <code>"Jami: 5, Bajarildi: 2, Qoldi: 3"</code> shaklidagi to'liq statistikani
          ko'rsatsin.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function hisoblagichniYangilash() {
  let bajarilganSoni = 0

  for (let i = 0; i < vazifalar.length; i++) {
    if (vazifalar[i].bajarildi) {
      bajarilganSoni = bajarilganSoni + 1
    }
  }

  let jami = vazifalar.length
  let qoldi = jami - bajarilganSoni

  hisoblagichElement.textContent = \`Jami: \${jami}, Bajarildi: \${bajarilganSoni}, Qoldi: \${qoldi}\`
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Hammasini tozalash tugmasi">
        <p>
          HTML: <code>{'<button id="tozalashTugmasi">Hammasini tozalash</button>'}</code>.
          Tugma bosilganda <code>vazifalar</code> massivini bo'sh massivga tenglashtirib,{' '}
          <code>render()</code>ni chaqiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let tozalashTugmasi = document.getElementById("tozalashTugmasi")

tozalashTugmasi.addEventListener("click", () => {
  vazifalar = []
  render()
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Bir xil vazifani ikki marta qo'shdirmaslik">
        <p>
          <code>vazifaQoshish()</code> funksiyasini kengaytiring: yangi vazifa qo'shishdan
          oldin, <code>for</code> tsikli bilan <code>vazifalar</code> ichida xuddi shunday
          matnli (katta-kichik harfga qaramasdan — <code>.toLowerCase()</code> yordamida)
          vazifa bor-yo'qligini tekshiring. Bor bo'lsa, <code>alert("Bu vazifa allaqachon
          ro'yxatda!")</code> chiqarib, qo'shmang.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function vazifaQoshish() {
  let matn = vazifaInput.value.trim()

  if (matn === "") {
    return
  }

  for (let i = 0; i < vazifalar.length; i++) {
    if (vazifalar[i].matn.toLowerCase() === matn.toLowerCase()) {
      alert("Bu vazifa allaqachon ro'yxatda!")
      return
    }
  }

  vazifalar.push({ id: keyingiId, matn: matn, bajarildi: false })
  keyingiId = keyingiId + 1

  vazifaInput.value = ""
  render()
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Faqat bajarilmaganlarni ko'rsatish">
        <p>
          HTML: <code>{`<button id="filterTugmasi">Faqat qolganlarni ko'rsat</button>`}</code>
          . <code>ko'rsatilsinMi</code> nomli boolean o'zgaruvchi yarating (boshlang'ich
          qiymati <code>false</code>). Tugma bosilganda uni teskarisiga o'zgartiring va{' '}
          <code>render()</code>ni chaqiring. <code>render()</code> ichida, agar{' '}
          <code>ko'rsatilsinMi</code> <code>true</code> bo'lsa, faqat{' '}
          <code>bajarildi === false</code> bo'lgan vazifalarni chizing (yordam: tsikl
          ichida shunday vazifalarni <code>continue</code> bilan o'tkazib yuboring).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let korsatilsinMi = false
let filterTugmasi = document.getElementById("filterTugmasi")

filterTugmasi.addEventListener("click", () => {
  korsatilsinMi = !korsatilsinMi
  render()
})

function render() {
  royxatElement.innerHTML = ""

  for (let i = 0; i < vazifalar.length; i++) {
    let vazifa = vazifalar[i]

    if (korsatilsinMi && vazifa.bajarildi) {
      continue // bajarilganlarni o'tkazib yuboramiz
    }

    let liElement = document.createElement("li")
    let matnElement = document.createElement("span")
    matnElement.textContent = vazifa.matn
    if (vazifa.bajarildi) {
      matnElement.classList.add("bajarildi")
    }
    liElement.appendChild(matnElement)
    royxatElement.appendChild(liElement)
  }

  hisoblagichniYangilash()
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="5-vazifa: Eng uzun vazifa matnini topish">
        <p>
          <code>engUzunVazifa()</code> nomli funksiya yozing — u <code>vazifalar</code>{' '}
          massivini aylanib chiqib, <code>matn</code>i eng uzun bo'lgan vazifa obyektini{' '}
          <code>return</code> qiladi (massiv bo'sh bo'lsa, <code>null</code> qaytaring).
          Natijani <code>console.log()</code> bilan tekshiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function engUzunVazifa() {
  if (vazifalar.length === 0) {
    return null
  }

  let engUzuni = vazifalar[0]

  for (let i = 1; i < vazifalar.length; i++) {
    if (vazifalar[i].matn.length > engUzuni.matn.length) {
      engUzuni = vazifalar[i]
    }
  }

  return engUzuni
}

console.log(engUzunVazifa())`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Obyektlar massivi (<code>{'[{ id, matn, bajarildi }, ...]'}</code>) — bir xil
          tuzilishdagi ko'p ma'lumotni (vazifalar, mahsulotlar, foydalanuvchilar) saqlashning
          standart usuli.
        </li>
        <li>
          "Ma'lumot o'zgarsa — <code>render()</code>ni qayta chaqiramiz" naqshi: har bir
          funksiya (<code>qo'shish</code>, <code>bajarildi qilish</code>,{' '}
          <code>o'chirish</code>) faqat <code>vazifalar</code> massivini yangilaydi,
          ekranni chizishni butunlay <code>render()</code>ga topshiradi.
        </li>
        <li>
          <code>.filter()</code>/<code>.map()</code> kabi metodlar hali o'rganilmagan bo'lsa
          ham, ularning ortidagi mantiqni oddiy <code>for</code> tsikli va{' '}
          <code>push()</code> bilan qo'lda amalga oshirish mumkin.
        </li>
        <li>
          <code>createElement()</code> + <code>appendChild()</code> + <code>classList</code>{' '}
          + <code>addEventListener()</code> — dinamik, ma'lumotga asoslangan interfeys
          qurishning asosiy quroli.
        </li>
      </KeyPoints>
    </>
  )
}
