import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Scope chuqurroq: var, let, const va hoisting',
  section: 'Chuqur asoslar',
}

export default function ScopeVaHoistingLesson() {
  return (
    <>
      <p>
        JavaScript Fundamentals kursida <code>let</code> va <code>const</code> bilan
        o'zgaruvchi yaratishni o'rgangan edingiz (2-dars). Bu darsdan boshlab
        JavaScript Advanced kursi boshlanadi — u yerda o'rgangan bilimlaringizni
        chuqurlashtirib, real loyihalarda duch keladigan mavzularni ko'ramiz. Birinchi
        mavzu — <strong>scope</strong> (qamrov): o'zgaruvchi qayerda "ko'rinadi" va
        qayerda "ko'rinmaydi" degan savol. Bu tushuncha keyingi darsdagi{' '}
        <strong>closure</strong>ning asosini tashkil qiladi, shuning uchun uni yaxshi
        tushunib olish muhim.
      </p>

      <h2>var — eski, muammoli usul</h2>
      <p>
        <code>let</code> va <code>const</code>dan oldin JavaScriptda o'zgaruvchi faqat{' '}
        <code>var</code> bilan yaratilardi. Bugungi kunda <code>var</code> deyarli
        ishlatilmaydi, lekin eski kodlarda hali ham uchraydi — shuning uchun uning nega
        muammoli ekanini bilish kerak. Asosiy muammo: <code>var</code>{' '}
        <strong>blok qamroviga</strong> (block scope) amal qilmaydi:
      </p>
      <CodeBlock lang="javascript">{`if (true) {
  var xabar = "Ichkarida yaratildi"
}

console.log(xabar) // "Ichkarida yaratildi" — bloqdan tashqarida ham ko'rinadi!`}</CodeBlock>
      <p>
        <code>if</code> blokining ichida yaratilgan <code>xabar</code> o'zgaruvchisi
        bloqdan tashqarida ham ishlatilishi mumkin bo'lib chiqdi. Bu — kutilmagan
        xatoliklarga olib keladigan xavfli xususiyat. Solishtirib ko'ring:
      </p>
      <CodeBlock lang="javascript">{`if (true) {
  let xabar = "Ichkarida yaratildi"
}

console.log(xabar) // XATOLIK: xabar is not defined`}</CodeBlock>
      <p>
        <code>let</code> bilan yaratilgan o'zgaruvchi faqat o'zi yaratilgan{' '}
        <strong>{'{ }'}</strong> bloki ichida mavjud — bu <strong>block scope</strong>{' '}
        deyiladi. <code>if</code>, <code>for</code>, <code>while</code> va oddiy{' '}
        <code>{'{ }'}</code> — barchasi blok hisoblanadi.
      </p>

      <h2>Real muammo: for tsiklidagi var</h2>
      <p>
        <code>var</code>ning eng mashhur "tuzog'i" — tsikl ichida event handlerlar
        yaratilganda ko'rinadi. Tasavvur qiling, sahifada uchta tugma bor va har biriga
        bosilganda o'z raqamini chiqarishi kerak:
      </p>
      <CodeBlock lang="javascript">{`let tugmalar = document.querySelectorAll(".raqam-tugma") // 07-darsda o'rgangan querySelector

for (var i = 0; i < tugmalar.length; i++) {
  tugmalar[i].onclick = () => {
    console.log("Siz bosgan tugma: " + i)
  }
}

// Har qanday tugmani bossangiz ham konsolda "Siz bosgan tugma: 3" chiqadi!`}</CodeBlock>
      <Callout type="warning" title="Nega hammasi bir xil raqamni chiqaradi?">
        <code>var i</code> — butun <code>for</code> tsikli uchun <strong>bitta</strong>{' '}
        o'zgaruvchi. Tsikl tugagach, <code>i</code> ning qiymati <code>3</code>{' '}
        (tugmalar soni) bo'lib qoladi. Tugma keyinchalik bosilganda, arrow funksiya{' '}
        <code>i</code>ning o'sha paytdagi (yakuniy) qiymatini o'qiydi — barcha tugmalar
        uchun bitta umumiy <code>i</code>ni "ko'radi".
      </Callout>
      <p>
        Yechim — <code>var</code> o'rniga <code>let</code> ishlatish. <code>let</code>{' '}
        bilan yaratilgan o'zgaruvchi tsiklning <strong>har bir</strong> iteratsiyasida
        yangidan yaratiladi, ya'ni har bir tugma o'zining shaxsiy <code>i</code>{' '}
        nusxasini "eslab qoladi":
      </p>
      <CodeBlock lang="javascript">{`let tugmalar = document.querySelectorAll(".raqam-tugma")

for (let i = 0; i < tugmalar.length; i++) {
  tugmalar[i].onclick = () => {
    console.log("Siz bosgan tugma: " + i)
  }
}

// Endi har bir tugma o'z raqamini to'g'ri chiqaradi: 0, 1, 2`}</CodeBlock>
      <p>
        Bu — <code>let</code>ning <code>var</code>dan ustunligini ko'rsatuvchi eng
        mashhur real hayotiy misol. Keyingi darsda buning texnik sababini —{' '}
        <strong>closure</strong> orqali — chuqurroq tushuntiramiz.
      </p>

      <h2>let vs const — qachon qaysi birini ishlatish kerak</h2>
      <p>
        2-darsda o'rganganingizdek, <code>const</code> bilan yaratilgan o'zgaruvchiga
        qayta qiymat berib bo'lmaydi. Zamonaviy JavaScript kodida qabul qilingan qoida
        shu: <strong>har doim <code>const</code> bilan boshlang</strong>, faqat
        qiymatni keyinchalik o'zgartirish kerak bo'lsagina <code>let</code>ga o'ting.{' '}
        <code>var</code> esa umuman ishlatilmaydi:
      </p>
      <CodeBlock lang="javascript">{`const API_MANZILI = "https://api.example.com" // hech qachon o'zgarmaydi — const

let hisoblagich = 0 // qiymati o'zgaradi — let
hisoblagich = hisoblagich + 1`}</CodeBlock>
      <Callout type="tip" title="const massiv/obyektni o'zgartirishga to'sqinlik qilmaydi">
        <code>const</code> faqat o'zgaruvchiga <strong>boshqa qiymat</strong>{' '}
        (masalan, butunlay yangi massiv) berishga yo'l qo'ymaydi. Massiv yoki
        obyektning <strong>ichidagi</strong> narsalarni o'zgartirish (element qo'shish,
        xususiyatni yangilash) hech qanday muammosiz ishlaydi:
        <CodeBlock lang="javascript">{`const royxat = ["olma", "nok"]
royxat.push("uzum") // ishlaydi — massiv ichidagi o'zgarish

royxat = ["boshqa"] // XATOLIK — butunlay yangi massiv bera olmaysiz`}</CodeBlock>
      </Callout>

      <h2>Hoisting — kod "yuqoriga ko'tariladimi"?</h2>
      <p>
        JavaScript kodni ishga tushirishdan oldin, funksiya va o'zgaruvchi
        e'lonlarini "oldindan ko'rib chiqadi". Bu jarayon <strong>hoisting</strong>{' '}
        (ko'tarish) deyiladi. Eng ko'zga tashlanadigan misol — funksiyani e'lon
        qilinishidan <strong>oldin</strong> chaqirish:
      </p>
      <CodeBlock lang="javascript">{`salomlash() // ishlaydi! "Salom!" chiqadi

function salomlash() {
  console.log("Salom!")
}`}</CodeBlock>
      <p>
        Bu ishlaydi, chunki <code>function salomlash() {'{ }'}</code> ko'rinishidagi
        funksiya e'loni (declaration) butunlay faylning "yuqorisiga ko'tariladi". Lekin{' '}
        <code>var</code> bilan bunday emas — <code>var</code>ning{' '}
        <strong>e'loni</strong> ko'tariladi, ammo <strong>qiymati</strong> ko'tarilmaydi:
      </p>
      <CodeBlock lang="javascript">{`console.log(ism) // undefined — xatolik emas, lekin qiymat ham yo'q
var ism = "Aziz"
console.log(ism) // "Aziz"`}</CodeBlock>

      <h2>Temporal Dead Zone — let/const nima uchun xavfsizroq</h2>
      <p>
        <code>let</code> va <code>const</code> ham texnik jihatdan "ko'tariladi", lekin
        ularga o'z qatoriga yetmasdan murojaat qilish <strong>xatolik</strong> beradi —
        bu oraliq <strong>Temporal Dead Zone</strong> (TDZ, "vaqtinchalik o'lik zona")
        deyiladi:
      </p>
      <CodeBlock lang="javascript">{`console.log(shahar) // XATOLIK: Cannot access 'shahar' before initialization
let shahar = "Toshkent"`}</CodeBlock>
      <p>
        Bu — <code>var</code>ning "jim <code>undefined</code> qaytarish" xatti-harakatidan
        ancha yaxshi: <code>let</code>/<code>const</code> bilan yozilgan xatolikni siz{' '}
        <strong>darhol</strong> ko'rasiz, dastur "sukut bo'yicha noto'g'ri" ishlab
        ketmaydi. Aynan shu sabab — <code>var</code>ning o'rnini <code>let</code> va{' '}
        <code>const</code> bosishining asosiy sabablaridan biri.
      </p>
      <Quiz
        question="Quyidagi kod nima chiqaradi? let son = 5; if (true) { let son = 10; console.log(son) } console.log(son)"
        options={['10 va keyin 10', '10 va keyin 5', '5 va keyin 10', 'Xatolik beradi']}
        correctIndex={1}
        explanation="if bloki ichidagi 'let son = 10' — tashqaridagi 'son'dan butunlay boshqa, blokka xos o'zgaruvchi. Blok ichida u 10 ni chiqaradi, blokdan chiqqach esa tashqi 'son' (5) o'z holicha qoladi."
      />

      <h2>Amaliy misol: xarid savati hisoblagichi</h2>
      <p>
        Endi bularni birlashtirib, kichik real misol ko'ramiz — do'kon sahifasida har
        bir "Savatga qo'shish" tugmasi bosilganda umumiy summani hisoblaydigan kod.
        HTML: <code>{'<button class="qoshish-tugmasi" data-narx="25000">Olma</button>'}</code>{' '}
        kabi bir nechta tugma va <code>{'<p id="jamiSumma">0 so\'m</p>'}</code>.
      </p>
      <CodeBlock lang="javascript">{`const tugmalar = document.querySelectorAll(".qoshish-tugmasi")
const jamiSummaElement = document.getElementById("jamiSumma")

let jamiSumma = 0

for (let i = 0; i < tugmalar.length; i++) {
  tugmalar[i].addEventListener("click", () => {
    const narx = Number(tugmalar[i].dataset.narx) // 18-darsda o'rgangan data-* atribut
    jamiSumma = jamiSumma + narx
    jamiSummaElement.textContent = jamiSumma + " so'm"
  })
}`}</CodeBlock>
      <p>
        Bu yerda <code>let i</code> aynan yuqoridagi tugmalar misolidagi kabi ishlayapti
        — har bir tugma o'zining <code>i</code> qiymatini (demak, o'zining{' '}
        <code>narx</code>ini) to'g'ri "eslab qoladi". Agar <code>var</code> ishlatilganda
        edi, barcha tugmalar oxirgi mahsulotning narxini qo'shgan bo'lardi.
      </p>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: var muammosini toping">
        <p>
          Quyidagi kodda nima chiqishini bashorat qiling, keyin sababini bir gapda
          tushuntiring:
        </p>
        <CodeBlock lang="javascript">{`for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}`}</CodeBlock>
        <Solution>
          <p>
            Uch marta ham <code>3</code> chiqadi (<code>0</code>, <code>1</code>,{' '}
            <code>2</code> emas) — chunki <code>var i</code> butun tsikl uchun bitta
            umumiy o'zgaruvchi. <code>setTimeout</code> ichidagi funksiyalar
            ishga tushganda tsikl allaqachon tugagan va <code>i</code> ning yakuniy
            qiymati (<code>3</code>) qolgan bo'ladi.
          </p>
          <CodeBlock lang="javascript">{`// Tuzatilgan versiya:
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100) // 0, 1, 2
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Blok qamrovini sinab ko'ring">
        <p>
          Quyidagi kodni <code>let</code>dan <code>var</code>ga almashtiring va nima
          o'zgarishini kuzating: <code>{'{ let raqam = 42 } console.log(raqam)'}</code>.
          Ikkala holatda ham natijani va sababini yozing.
        </p>
        <Solution>
          <p>
            <code>let</code> bilan: konsolda xatolik chiqadi (<code>raqam is not
            defined</code>), chunki <code>raqam</code> faqat <code>{'{ }'}</code>{' '}
            bloki ichida mavjud. <code>var</code> bilan: <code>42</code> chiqadi,
            chunki <code>var</code> blok qamroviga amal qilmaydi.
          </p>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Narxlar ro'yxatini to'g'ri bog'lash">
        <p>
          HTML: uchta <code>{'<button class="mahsulot" data-nom="Kitob">Tanlash</button>'}</code>{' '}
          tugmasi (har birida turli <code>data-nom</code>). Har bir tugma bosilganda
          o'zining <code>data-nom</code> qiymatini <code>alert()</code> qilib
          chiqaradigan kod yozing, <code>querySelectorAll</code> va <code>for</code>{' '}
          tsiklidan foydalanib.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const mahsulotTugmalari = document.querySelectorAll(".mahsulot")

for (let i = 0; i < mahsulotTugmalari.length; i++) {
  mahsulotTugmalari[i].addEventListener("click", () => {
    alert(mahsulotTugmalari[i].dataset.nom)
  })
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: TDZ xatoligini toping">
        <p>
          Quyidagi kod nima uchun xatolik berishini tushuntiring va uni tuzating:
        </p>
        <CodeBlock lang="javascript">{`function hisobla() {
  console.log(natija)
  const natija = 10 * 5
  return natija
}`}</CodeBlock>
        <Solution>
          <p>
            <code>const natija</code> o'z qatoriga yetmasdan <code>console.log</code>{' '}
            orqali chaqirilgan — bu Temporal Dead Zone xatoligi. Tuzatish uchun{' '}
            <code>console.log</code>ni <code>const natija = 10 * 5</code>dan keyinga
            ko'chirish kerak.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>var</code> funksiya qamroviga (function scope) ega va blokdan
          "sizib chiqadi" — zamonaviy kodda ishlatilmaydi.
        </li>
        <li>
          <code>let</code> va <code>const</code> blok qamroviga (block scope) ega —
          faqat o'zi yaratilgan <code>{'{ }'}</code> ichida ko'rinadi.
        </li>
        <li>
          <code>for</code> tsiklida <code>let</code> ishlatish har bir iteratsiya
          uchun alohida nusxa yaratadi — bu event handlerlar bilan ishlaganda muhim
          farq.
        </li>
        <li>
          Funksiya e'lonlari va <code>var</code> hoisting qilinadi, lekin{' '}
          <code>var</code>ning qiymati emas — u <code>undefined</code> bo'ladi.
        </li>
        <li>
          <code>let</code>/<code>const</code>ga o'z qatoridan oldin murojaat qilish
          Temporal Dead Zone xatoligini beradi — bu xatoni "jim" qolib ketishdan
          ko'ra afzalroq.
        </li>
        <li>
          Amaliy qoida: har doim <code>const</code>dan boshlang, faqat qiymat
          o'zgarishi kerak bo'lsa <code>let</code>ga o'ting, <code>var</code>ni
          umuman ishlatmang.
        </li>
      </KeyPoints>
    </>
  )
}
