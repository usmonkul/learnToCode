import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Shartli operatorlar (if, else if, else, switch, ternar operator)',
  section: 'Boshlash uchun',
}

export default function ConditionalsLesson() {
  return (
    <>
      <p>
        Hozirgacha yozgan kodimiz har doim yuqoridan pastga, qatma-qat bir xilda ishlagan.
        Lekin haqiqiy dasturlar odatda sharoitga qarab <strong>turlicha</strong> harakat
        qilishi kerak: "agar yosh 18dan katta bo'lsa — kirishga ruxsat, aks holda — rad
        etish". Buning uchun shartli operatorlar (conditional statements) ishlatiladi. Ular
        oldingi darsda o'rgangan taqqoslash va mantiqiy operatorlarning natijasiga (
        <code>true</code>/<code>false</code>) qarab, kodning qaysi bo'lagi ishga tushishini
        hal qiladi.
      </p>

      <h2>
        <code>if</code> — shart to'g'ri bo'lsa
      </h2>
      <p>
        <code>if</code> qavs ichidagi shartni tekshiradi. Agar shart <code>true</code>ga
        (yoki truthy qiymatga) baholansa, jingalak qavs <code>{'{ }'}</code> ichidagi kod
        bloki ishga tushadi:
      </p>
      <CodeBlock lang="javascript">{`let yosh = 20

if (yosh >= 18) {
  console.log("Kirishga ruxsat berildi")
}`}</CodeBlock>
      <p>
        Agar shart <code>false</code> bo'lsa, blok ichidagi kod umuman ishlamaydi — dastur
        shunchaki uni o'tkazib yuboradi.
      </p>
      <Callout type="warning" title="Keng tarqalgan xato: = va === aralashtirib yuborish">
        <code>{'if (yosh = 18)'}</code> — bu xato! Bitta <code>=</code> taqqoslamaydi, balki{' '}
        <code>yosh</code>ga <code>18</code> qiymatini yozib qo'yadi (va bu qiymat truthy
        bo'lgani uchun shart doim <code>true</code> bo'lib chiqadi). Shartlarda har doim{' '}
        <code>===</code> (yoki boshqa taqqoslash operatori) ishlating.
      </Callout>

      <h2>
        <code>else</code> — shart noto'g'ri bo'lsa
      </h2>
      <p>
        <code>else</code> <code>if</code> shartga qo'shimcha "aks holda" bo'limini beradi —
        shart <code>false</code> bo'lganda ishga tushadigan kod:
      </p>
      <CodeBlock lang="javascript">{`let yosh = 15

if (yosh >= 18) {
  console.log("Kirishga ruxsat berildi")
} else {
  console.log("Kechirasiz, yoshingiz yetarli emas")
}`}</CodeBlock>

      <h2>
        <code>else if</code> — bir nechta shartni ketma-ket tekshirish
      </h2>
      <p>
        Ikkitadan ko'p variant bo'lsa, <code>else if</code> zanjiri ishlatiladi. JavaScript
        shartlarni yuqoridan pastga qarab tekshiradi va{' '}
        <strong>birinchi to'g'ri kelgan</strong> shartning bloki bilan to'xtaydi — qolganlarga
        umuman qaramaydi:
      </p>
      <CodeBlock lang="javascript">{`let baho = 85

if (baho >= 90) {
  console.log("A'lo")
} else if (baho >= 70) {
  console.log("Yaxshi")
} else if (baho >= 50) {
  console.log("Qoniqarli")
} else {
  console.log("Qoniqarsiz")
}
// natija: "Yaxshi" — chunki 85 >= 90 emas, lekin 85 >= 70 rost`}</CodeBlock>
      <Callout type="tip" title="Tartib muhim">
        Shartlarni har doim <strong>eng qat'iysidan boshlab</strong> tartiblang. Agar yuqoridagi
        misolda <code>{'baho >= 50'}</code> birinchi bo'lib tekshirilganda edi, <code>95</code>{' '}
        ball olgan o'quvchi ham "Qoniqarli" deb chiqib ketardi — chunki JavaScript birinchi
        to'g'ri shartda to'xtaydi.
      </Callout>
      <Quiz
        question={`let baho = 95; yuqoridagi else if zanjiri ishga tushsa, konsolga nima chiqadi?`}
        options={[`"Yaxshi"`, `"A'lo"`, `"Qoniqarli"`, `"Qoniqarsiz"`]}
        correctIndex={1}
        explanation={`baho >= 90 (95 >= 90) birinchi shart bo'lib tekshiriladi va rost bo'lgani uchun "A'lo" chiqadi, qolgan else if/else bloklariga umuman qaralmaydi.`}
      />

      <h2>Ichma-ich (nested) shartlar</h2>
      <p>
        Bir <code>if</code> blokining ichiga yana bitta <code>if</code> yozish mumkin —
        bu ikkita shartni ketma-ket, faqat birinchisi rost bo'lgandagina tekshirish kerak
        bo'lganda foydali (garchi ko'p holatlarda buni <code>&&</code> bilan bitta shartga
        birlashtirish ham mumkin bo'lsa-da):
      </p>
      <CodeBlock lang="javascript">{`let yosh = 20
let hujjatiBor = true

if (yosh >= 18) {
  if (hujjatiBor) {
    console.log("Kirish mumkin")
  } else {
    console.log("Hujjat kerak")
  }
} else {
  console.log("Yosh yetarli emas")
}`}</CodeBlock>

      <h2>
        <code>switch</code> — bitta qiymatni ko'p variant bilan solishtirish
      </h2>
      <p>
        Bitta o'zgaruvchini bir nechta aniq (discrete) qiymat bilan solishtirish kerak bo'lganda,{' '}
        <code>else if</code> zanjiri o'rniga <code>switch</code> ko'pincha o'qish uchun
        qulayroq bo'ladi:
      </p>
      <CodeBlock lang="javascript">{`let kun = "Dushanba"

switch (kun) {
  case "Dushanba":
    console.log("Hafta boshlandi")
    break
  case "Juma":
    console.log("Ish haftasi tugadi")
    break
  case "Shanba":
  case "Yakshanba":
    console.log("Dam olish kuni")
    break
  default:
    console.log("Oddiy ish kuni")
}
// natija: "Hafta boshlandi"`}</CodeBlock>
      <p>
        Har bir <code>case</code> — tekshirilayotgan qiymat bilan qat'iy (<code>===</code>{' '}
        kabi) solishtiriladigan variant. Mos kelgan <code>case</code> topilsa, undan keyingi
        kod <code>break</code>gacha ishga tushadi. <code>default</code> — hech qaysi{' '}
        <code>case</code> mos kelmasa ishga tushadigan, ixtiyoriy bo'lim (
        <code>else</code>ga o'xshaydi).
      </p>
      <p>
        Yuqoridagi misolda <code>"Shanba"</code> va <code>"Yakshanba"</code> bir xil natija
        berishi kerak bo'lgani uchun ular birgalikda yozilgan — <code>case "Shanba"</code>{' '}
        o'zining <code>break</code>iga ega emas, shuning uchun mos kelmasa ham, keyingi{' '}
        <code>case "Yakshanba"</code>ning kodiga "quyilib" o'tadi.
      </p>
      <Callout type="warning" title="break ni unutmang!">
        Agar <code>case</code>dan keyin <code>break</code> yozilmasa, JavaScript o'sha{' '}
        <code>case</code> mos kelganidan keyin <strong>keyingi barcha case'larni ham</strong>{' '}
        (shart tekshirmasdan) ishga tushiraveradi — bu "fall-through" deyiladi va odatda
        xohlanmagan xatolikka olib keladi:
      </Callout>
      <CodeBlock lang="javascript">{`let kun = "Dushanba"

switch (kun) {
  case "Dushanba":
    console.log("Hafta boshlandi") // bu chiqadi
  case "Juma":
    console.log("Ish haftasi tugadi") // break yo'q edi — bu ham chiqadi!
    break
  default:
    console.log("Oddiy ish kuni")
}
// natija: "Hafta boshlandi" VA "Ish haftasi tugadi" — ikkalasi ham chiqadi`}</CodeBlock>
      <Quiz
        question={`switch blokida bitta case ichida break yozishni unutib qo'ysangiz, nima bo'ladi?`}
        options={[
          'Dastur xatolik beradi',
          `Faqat o'sha case ishga tushadi, qolganlari e'tiborsiz qoladi`,
          'Mos kelgan case dan keyingi barcha case kodlar ham ishga tushadi, break yoki switch tugaguncha',
          `Hech narsa o'zgarmaydi`,
        ]}
        correctIndex={2}
        explanation={`break yo'qligi "fall-through"ga olib keladi: mos kelgan case dan keyin, JavaScript keyingi case'larning shartini tekshirmasdan, ularning kodini ham ketma-ket bajaraveradi.`}
      />

      <h2>
        <code>if/else</code> yoki <code>switch</code> — qaysi birini tanlash?
      </h2>
      <ul>
        <li>
          Bitta o'zgaruvchini bir nechta <strong>aniq qiymat</strong> bilan solishtirsangiz (
          kun nomi, status, tanlangan variant) — <code>switch</code> odatda o'qish uchun
          tozaroq.
        </li>
        <li>
          Diapazon (<code>{'>'}</code>, <code>{'<'}</code> kabi) yoki bir nechta turli
          o'zgaruvchini <code>&&</code>/<code>||</code> bilan birlashtirilgan murakkab shart
          tekshirsangiz — <code>if</code>/<code>else if</code> yagona variant, chunki{' '}
          <code>switch</code> faqat qat'iy tenglikni tekshiradi.
        </li>
      </ul>

      <h2>
        Ternar operator (<code>{'? :'}</code>) — qisqa <code>if</code>/<code>else</code>
      </h2>
      <p>
        Ba'zan <code>if</code>/<code>else</code> faqat bitta oddiy narsa uchun ishlatiladi —
        shartga qarab ikkita qiymatdan bittasini tanlash. Bunday holatlar uchun{' '}
        <strong>ternar operator</strong> (ternary operator) bor — u butun{' '}
        <code>if</code>/<code>else</code>ni bitta qatorga sig'diradi:
      </p>
      <CodeBlock lang="javascript">{`let yosh = 20

// if/else bilan
let toifa
if (yosh >= 18) {
  toifa = "Kattalar"
} else {
  toifa = "Bolalar"
}

// xuddi shu narsa, ternar operator bilan
let toifa2 = yosh >= 18 ? "Kattalar" : "Bolalar"

console.log(toifa2) // "Kattalar"`}</CodeBlock>
      <p>
        Sintaksis: <code>shart ? shartToʻgʻriBoʻlsaganQiymat : shartNotoʻgʻriBoʻlgandagiQiymat</code>
        . <code>?</code>dan oldingi qism — tekshiriladigan shart, <code>?</code> bilan{' '}
        <code>:</code> orasi — shart <code>true</code> bo'lganda qaytariladigan qiymat,{' '}
        <code>:</code>dan keyingi qism — shart <code>false</code> bo'lganda qaytariladigan
        qiymat.
      </p>
      <p>
        Ternar operatorni to'g'ridan-to'g'ri <code>console.log()</code> ichida yoki shablon
        satr (template literal) ichida ham ishlatish mumkin — bu uni ayniqsa qulay qiladi:
      </p>
      <CodeBlock lang="javascript">{`let mahsulotSoni = 0

console.log(\`Savatda: \${mahsulotSoni > 0 ? mahsulotSoni + " ta mahsulot" : "bo'sh"}\`)
// "Savatda: bo'sh"`}</CodeBlock>
      <Callout type="warning" title="Ternar operatordan qachon foydalanish kerak">
        Ternar operator faqat <strong>bitta oddiy qiymatni</strong> tanlash uchun mos —
        masalan, o'zgaruvchiga qiymat berish yoki matn ichiga qo'yish. Agar shart bajarilganda
        bir nechta amal bajarilishi kerak bo'lsa (bir nechta qator kod, <code>console.log</code>
        dan tashqari yana biror narsa), yoki ternarlarni bir-biriga ichma-ich joylashtirishga
        to'g'ri kelsa — bu kodni o'qish qiyinlashtiradi. Bunday holatlarda oddiy{' '}
        <code>if</code>/<code>else</code>ga qayting.
      </Callout>
      <Quiz
        question={`let ball = 55; let natija = ball >= 60 ? "O'tdi" : "Yiqildi"; natija nimaga teng bo'ladi?`}
        options={[`"O'tdi"`, `"Yiqildi"`, 'true', 'false']}
        correctIndex={1}
        explanation={`ball >= 60 (55 >= 60) noto'g'ri (false) bo'lgani uchun ternar operator : dan keyingi qiymatni, ya'ni "Yiqildi"ni qaytaradi.`}
      />

      <h2>Amaliyot</h2>
      <p>
        Quyidagi vazifalarning har birida yuqorida o'rgangan <code>if</code>/<code>else if</code>
        /<code>else</code>, <code>switch</code> yoki ternar operatordan foydalaning.
      </p>

      <Exercise title="1-vazifa: Baholash tizimi">
        <p>
          <code>prompt()</code> orqali imtihon ballini (0–100) so'rang. <code>else if</code>{' '}
          zanjiri yordamida: 90 va undan yuqori — "A'lo", 70–89 — "Yaxshi", 50–69 —
          "Qoniqarli", 50dan past — "Qoniqarsiz" deb <code>console.log()</code> orqali
          chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let ballMatn = prompt("Imtihon ballingiz (0-100)?")
let ball = Number(ballMatn)

if (ball >= 90) {
  console.log("A'lo")
} else if (ball >= 70) {
  console.log("Yaxshi")
} else if (ball >= 50) {
  console.log("Qoniqarli")
} else {
  console.log("Qoniqarsiz")
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Kinoteatr yosh chegarasi">
        <p>
          Film 16 yoshdan katta tomoshabinlar uchun. <code>prompt()</code> orqali yoshni
          so'rab, <code>if</code>/<code>else</code> yordamida "Filmni tomosha qilishingiz
          mumkin" yoki "Kechirasiz, bu film sizga mos emas" deb chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let yoshMatn = prompt("Yoshingiz?")
let yosh = Number(yoshMatn)

if (yosh > 16) {
  console.log("Filmni tomosha qilishingiz mumkin")
} else {
  console.log("Kechirasiz, bu film sizga mos emas")
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Ish kuni yoki dam olish kuni">
        <p>
          <code>prompt()</code> orqali hafta kunining nomini so'rang (masalan{' '}
          <code>"Shanba"</code>). <code>switch</code> yordamida "Shanba" yoki "Yakshanba"
          bo'lsa — "Dam olish kuni", aks holda — "Ish kuni" deb chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let kun = prompt("Hafta kuni?")

switch (kun) {
  case "Shanba":
  case "Yakshanba":
    console.log("Dam olish kuni")
    break
  default:
    console.log("Ish kuni")
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Chegirma tizimi">
        <p>
          Onlayn-do'kon xarid summasiga qarab chegirma beradi: 1,000,000 so'mdan yuqori — 20%,
          500,000 dan yuqori — 10%, 100,000 dan yuqori — 5%, aks holda — chegirma yo'q.{' '}
          <code>prompt()</code> orqali xarid summasini so'rab, mos chegirma foizini{' '}
          <code>alert()</code> orqali ko'rsating.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let summaMatn = prompt("Xarid summasi?")
let summa = Number(summaMatn)

if (summa > 1000000) {
  alert("Chegirma: 20%")
} else if (summa > 500000) {
  alert("Chegirma: 10%")
} else if (summa > 100000) {
  alert("Chegirma: 5%")
} else {
  alert("Chegirma yo'q")
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="5-vazifa: Yil faslini aniqlash">
        <p>
          <code>prompt()</code> orqali oy raqamini (1–12) so'rang va <code>switch</code>{' '}
          yordamida faslni aniqlang: 12, 1, 2 — "Qish"; 3, 4, 5 — "Bahor"; 6, 7, 8 — "Yoz"; 9,
          10, 11 — "Kuz".
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let oyMatn = prompt("Oy raqami (1-12)?")
let oy = Number(oyMatn)

switch (oy) {
  case 12:
  case 1:
  case 2:
    console.log("Qish")
    break
  case 3:
  case 4:
  case 5:
    console.log("Bahor")
    break
  case 6:
  case 7:
  case 8:
    console.log("Yoz")
    break
  case 9:
  case 10:
  case 11:
    console.log("Kuz")
    break
  default:
    console.log("Noto'g'ri oy raqami")
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="6-vazifa: Kirish tekshiruvi">
        <p>
          <code>prompt()</code> orqali login va parolni so'rang. Agar login{' '}
          <code>"admin"</code> va parol <code>"12345"</code>ga teng bo'lsa — "Xush kelibsiz!",
          aks holda — "Login yoki parol xato" deb <code>alert()</code> orqali chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let login = prompt("Login?")
let parol = prompt("Parol?")

if (login === "admin" && parol === "12345") {
  alert("Xush kelibsiz!")
} else {
  alert("Login yoki parol xato")
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="7-vazifa: Ternar operator bilan holat belgisi">
        <p>
          <code>prompt()</code> orqali mahsulot omborida qolgan sonini so'rang (
          <code>Number()</code>ga aylantiring). Ternar operatordan foydalanib, son{' '}
          <code>0</code>dan katta bo'lsa — "Mavjud", aks holda — "Tugagan" deb bitta
          o'zgaruvchiga saqlang va uni <code>console.log()</code> bilan chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let sonMatn = prompt("Omborda qolgan soni?")
let son = Number(sonMatn)

let holat = son > 0 ? "Mavjud" : "Tugagan"
console.log(holat)`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>if</code> shart <code>true</code> (yoki truthy) bo'lsa blokni bajaradi;{' '}
          <code>else</code> — aks holda ishlaydigan bo'lim.
        </li>
        <li>
          <code>else if</code> bir nechta shartni ketma-ket tekshiradi va{' '}
          <strong>birinchi to'g'ri kelgan</strong> shartda to'xtaydi — tartib muhim.
        </li>
        <li>
          Shartlarda <code>=</code> emas, <code>===</code> ishlating — <code>=</code> qiymat
          beradi, taqqoslamaydi.
        </li>
        <li>
          <code>switch</code> bitta qiymatni bir nechta aniq variant bilan solishtirganda
          qulay; har bir <code>case</code> odatda <code>break</code> bilan tugaydi, aks holda
          "fall-through" yuz beradi.
        </li>
        <li>
          Diapazon yoki murakkab (<code>&&</code>/<code>||</code>) shartlar uchun{' '}
          <code>if</code>/<code>else if</code>, aniq qiymatlarni solishtirish uchun{' '}
          <code>switch</code> tanlanadi.
        </li>
        <li>
          Ternar operator (<code>{'shart ? a : b'}</code>) — bitta oddiy qiymatni tanlash
          uchun <code>if</code>/<code>else</code>ning qisqa shakli; murakkab yoki
          ichma-ich holatlarda oddiy <code>if</code>/<code>else</code> afzal.
        </li>
      </KeyPoints>
    </>
  )
}
