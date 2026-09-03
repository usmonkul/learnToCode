import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "O'zgaruvchilar va ma'lumot turlari",
  section: 'Boshlash uchun',
}

export default function VariablesLesson() {
  return (
    <>
      <h2>O'zgaruvchi (variable) nima?</h2>
      <p>
        O'zgaruvchi — bu qiymatni xotirada saqlab turadigan nom. Uni yorlig'i (label)
        yopishtirilgan quti deb tasavvur qiling: qutining ichida qandaydir qiymat yotadi, biz
        esa o'sha qutiga ism qo'yib, keyinchalik shu ism orqali qiymatga murojaat qilamiz —
        uni o'qish, boshqa joyda ishlatish yoki yangi qiymatga almashtirish mumkin.
      </p>
      <CodeBlock lang="javascript">{`let ism = "Aziz"
console.log(ism) // Aziz`}</CodeBlock>
      <p>
        Bu yerda <code>ism</code> — o'zgaruvchi nomi, <code>=</code> — qiymat berish
        (assignment) operatori, <code>"Aziz"</code> esa unga berilayotgan qiymat.
      </p>
      <Callout type="note" title="Diqqat: bu tenglik emas">
        Dasturlashda <code>=</code> matematikadagi "tenglik" degani emas, balki "o'ngdagi
        qiymatni chapdagi o'zgaruvchiga yoz" degani. Shuning uchun{' '}
        <code>{`yosh = yosh + 1`}</code> kabi kod mutlaqo normal — u "yosh o'zgaruvchisining
        eski qiymatiga 1 qo'shib, natijani yana <code>yosh</code>ga yoz" deb o'qiladi.
      </Callout>

      <h2>
        <code>let</code>, <code>const</code> va <code>var</code>
      </h2>
      <p>
        JavaScript'da o'zgaruvchi yaratishning uchta kaliti bor. Ular bir-biridan qiymatni
        keyinroq o'zgartirish mumkinligi va ko'lami (scope) bilan farq qiladi.
      </p>
      <ul>
        <li>
          <code>let</code> — qiymati keyinchalik o'zgarishi mumkin bo'lgan o'zgaruvchi uchun.
          Zamonaviy JavaScript'da eng ko'p ishlatiladigan variant.
        </li>
        <li>
          <code>const</code> — qiymati bir marta belgilanib, keyin{' '}
          <strong>o'zgartirilmaydigan</strong> o'zgaruvchi uchun (constant). Qiymati
          o'zgarmasligi kerak bo'lgan har bir joyda shuni ishlating — bu kodni xato bilan
          tasodifan qayta yozib qo'yishdan himoya qiladi.
        </li>
        <li>
          <code>var</code> — JavaScript'ning eski, tarixiy kaliti. Hozirgi kunda yozilayotgan
          kodda deyarli ishlatilmaydi, chunki uning ko'lam qoidalari chalkash va xatolarga olib
          keladi; buni faqat eski kodda uchratishingiz mumkin.
        </li>
      </ul>
      <CodeBlock lang="javascript">{`let yosh = 25
yosh = 26 // to'g'ri — let qiymatini o'zgartirish mumkin

const PI = 3.14
PI = 3.15 // XATO — const qiymatini qayta belgilab bo'lmaydi`}</CodeBlock>
      <Callout type="tip" title="Qaysi birini tanlash kerak?">
        Amaliy qoida: har doim <code>const</code>dan boshlang. Agar o'zgaruvchiga keyinroq
        boshqa qiymat berish kerak bo'lib qolsa, uni <code>let</code>ga almashtiring.{' '}
        <code>var</code>dan esa umuman foydalanmang.
      </Callout>

      <h2>O'zgaruvchilarni nomlash qoidalari</h2>
      <p>JavaScript'da o'zgaruvchi nomi quyidagi qoidalarga bo'ysunadi:</p>
      <ul>
        <li>
          Faqat harflar, raqamlar, pastki chiziq (<code>_</code>) va dollar belgisidan (
          <code>$</code>) iborat bo'lishi mumkin.
        </li>
        <li>Raqam bilan boshlana olmaydi (lekin ichida yoki oxirida raqam bo'lishi mumkin).</li>
        <li>Bo'sh joy (space) ishlatib bo'lmaydi.</li>
        <li>
          Katta-kichik harfga sezgir (case-sensitive): <code>yosh</code> va <code>Yosh</code> —
          ikkita butunlay boshqa o'zgaruvchi.
        </li>
        <li>
          JavaScript'ning zaxira so'zlari (masalan <code>let</code>, <code>if</code>,{' '}
          <code>class</code>, <code>true</code>) o'zgaruvchi nomi sifatida ishlatilmaydi.
        </li>
      </ul>
      <CodeBlock lang="javascript">{`let yosh = 25          // to'g'ri
let _maxfiyKod = 123   // to'g'ri — pastki chiziq bilan boshlash mumkin
let talaba2 = "Vali"   // to'g'ri — oxirida raqam bo'lishi mumkin

let 2talaba = "Vali"    // XATO — raqam bilan boshlana olmaydi
let talaba nomi = "Vali" // XATO — bo'sh joy ishlatib bo'lmaydi`}</CodeBlock>
      <p>
        Ko'p so'zli nomlar uchun JavaScript jamoasi <code>camelCase</code> uslubini rasmiy
        tavsiya qiladi — birinchi so'z kichik harf bilan, keyingi har bir so'z katta harf bilan
        boshlanadi:
      </p>
      <CodeBlock lang="javascript">{`let talabaIsmi = "Aziz"   // camelCase — JavaScript'ning rasmiy uslubi
let MAKSIMAL_YOSH = 100   // UPPER_CASE — o'zgarmas doimiylar (constants) uchun`}</CodeBlock>
      <Quiz
        question="Quyidagi o'zgaruvchi e'lonlaridan qaysi biri JavaScript'da NOTO'G'RI (xato)?"
        options={['let talabaSoni = 10', 'const _maxfiy = true', 'let 2natija = 5', 'let natija2 = 5']}
        correctIndex={2}
        explanation="O'zgaruvchi nomi raqam bilan boshlana olmaydi, shuning uchun 2natija xato hisoblanadi."
      />

      <h2>Ma'lumot turlari (data types)</h2>
      <p>
        JavaScript'dagi har bir qiymat ma'lum bir turga (type) tegishli. Qiymatning turini{' '}
        <code>typeof</code> operatori yordamida istalgan vaqtda tekshirish mumkin:
      </p>
      <CodeBlock lang="javascript">{`let yosh = 25
console.log(typeof yosh) // "number"`}</CodeBlock>
      <p>Eng asosiy beshta turni birma-bir ko'rib chiqamiz.</p>

      <h3>String — matn turi</h3>
      <p>
        Harflar, raqamlar va belgilar ketma-ketligi (string). Bitta tirnoq (
        <code>'...'</code>), qo'shtirnoq (<code>"..."</code>) yoki orqa qiya tirnoq (backtick,{' '}
        <code>`...`</code>) ichida yoziladi:
      </p>
      <CodeBlock lang="javascript">{`let ism = "Aziz"
let familiya = 'Karimov'
let tolikIsm = ism + " " + familiya
console.log(tolikIsm) // Aziz Karimov
console.log(typeof ism) // "string"`}</CodeBlock>
      <p>
        Backtick bilan yozilgan satrlar <strong>template literal</strong> deyiladi va ular
        ichiga <code>{'${...}'}</code> yordamida o'zgaruvchini to'g'ridan-to'g'ri joylashtirish
        mumkin — bu matnlarni <code>+</code> bilan qo'shishdan ancha qulayroq:
      </p>
      <CodeBlock lang="javascript">{`let yosh = 25
console.log(\`Mening yoshim \${yosh} da\`) // Mening yoshim 25 da`}</CodeBlock>

      <h3>Number — son turi</h3>
      <p>
        Python yoki Java'dan farqli o'laroq, JavaScript'da butun son (integer) va kasr son
        (float) uchun alohida tur yo'q — ikkalasi ham bitta <code>number</code> turiga
        tegishli:
      </p>
      <CodeBlock lang="javascript">{`let yosh = 25       // butun son
let narx = 9.99     // kasr son
console.log(typeof yosh) // "number"
console.log(typeof narx) // "number" — xuddi shu tur!`}</CodeBlock>
      <p>Ustida odatdagi arifmetik amallarni bajarish mumkin:</p>
      <CodeBlock lang="javascript">{`let a = 10
let b = 3
console.log(a + b)  // 13
console.log(a - b)  // 7
console.log(a * b)  // 30
console.log(a / b)  // 3.3333333333333335
console.log(a % b)  // 1  — bo'lishdan qolgan qoldiq`}</CodeBlock>
      <Callout type="warning" title="Diqqat: matn va sonni qo'shish">
        <code>+</code> operatori matn bilan ishlatilganda son avtomatik matnga aylanadi, sonlar
        ustida bajaradigan qo'shish amalini emas: <code>{`"Yosh: " + 25`}</code> natijasi{' '}
        <code>"Yosh: 25"</code> (matn) bo'ladi, xato emas — lekin bu ko'pincha kutilmagan
        natijaga olib keladi, shuning uchun sonni matnga qo'shishda ehtiyot bo'ling yoki
        template literal ishlating.
      </Callout>

      <h3>Boolean — mantiqiy qiymat turi</h3>
      <p>
        Faqat ikkita qiymat qabul qiladi: <code>true</code> yoki <code>false</code>. Odatda
        taqqoslash (comparison) amallari natijasida hosil bo'ladi va shartlarni (if)
        tekshirishda ishlatiladi:
      </p>
      <CodeBlock lang="javascript">{`let katta = 18 > 15
console.log(katta)        // true
console.log(typeof katta) // "boolean"`}</CodeBlock>

      <h3>
        <code>undefined</code> — qiymat berilmagan
      </h3>
      <p>
        O'zgaruvchi e'lon qilingan, lekin unga hali qiymat berilmagan bo'lsa, JavaScript unga
        avtomatik <code>undefined</code> qiymatini beradi. Bu "hali qiymat yo'q" degani —
        JavaScript'ning o'zi bergan holat, dasturchi qo'lda yozadigan narsa emas:
      </p>
      <CodeBlock lang="javascript">{`let shahar
console.log(shahar)        // undefined
console.log(typeof shahar) // "undefined"`}</CodeBlock>

      <h3>
        <code>null</code> — qasddan bo'sh qiymat
      </h3>
      <p>
        <code>null</code> ham "qiymat yo'q" degan ma'noni bildiradi, lekin farqi shundaki, uni
        dasturchi <strong>ataylab, ongli ravishda</strong> o'zgaruvchiga beradi: "bu yerda
        qasddan hech qanday qiymat yo'q" deb belgilash uchun:
      </p>
      <CodeBlock lang="javascript">{`let tanlanganMahsulot = null // hozircha hech narsa tanlanmagan
console.log(tanlanganMahsulot) // null
console.log(typeof tanlanganMahsulot) // "object" — bu JavaScript'ning tarixiy xatosi!`}</CodeBlock>
      <Callout type="note" title="null va undefined farqi">
        Ikkalasi ham "bo'shlik"ni bildiradi, lekin: <code>undefined</code> — "bu o'zgaruvchiga
        hali hech kim qiymat bermagan" (JavaScript'ning o'zi qo'yadi); <code>null</code> —
        "bu yerda qasddan qiymat yo'qligi belgilangan" (dasturchi o'zi qo'yadi). Amaliyotda
        odatda <code>null</code>dan qasddan "bo'shlik"ni ifodalash uchun, <code>undefined</code>
        dan esa hali qiymat berilmagan holatni aniqlash uchun foydalaniladi.
      </Callout>
      <Quiz
        question="O'zgaruvchiga hech qanday qiymat berilmagan bo'lsa (masalan, faqat let shahar yozilgan bo'lsa), uning qiymati avtomatik ravishda nima bo'ladi?"
        options={['null', 'undefined', '0', '"" (bo\'sh matn)']}
        correctIndex={1}
        explanation="Qiymat berilmagan o'zgaruvchiga JavaScript avtomatik undefined qiymatini beradi. null esa faqat dasturchi tomonidan ataylab beriladi."
      />

      <Exercise title="Mashq">
        <p>
          <code>const</code> yordamida <code>ism</code> (string) va <code>yosh</code> (number)
          o'zgaruvchilarini, <code>let</code> yordamida esa hali tanlanmagan{' '}
          <code>sevimliRang</code> (uni <code>null</code> qiymati bilan) o'zgaruvchisini
          yarating. So'ng template literal yordamida ularni bitta xabarga birlashtirib chop
          eting va har birining turini <code>typeof</code> bilan tekshiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const ism = "Aziz"
const yosh = 25
let sevimliRang = null

console.log(\`Salom, mening ismim \${ism}, yoshim \${yosh}\`)
console.log(typeof ism)         // "string"
console.log(typeof yosh)        // "number"
console.log(typeof sevimliRang) // "object"`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          O'zgaruvchi — qiymatni saqlab turadigan nom; <code>=</code> tenglik emas, balki
          qiymat berish operatori.
        </li>
        <li>
          <code>let</code> — qiymati o'zgarishi mumkin bo'lgan o'zgaruvchi uchun,{' '}
          <code>const</code> — o'zgarmas qiymat uchun, <code>var</code> — eskirgan, endi
          ishlatilmaydi.
        </li>
        <li>
          Nom raqam bilan boshlanmasligi, bo'sh joysiz yozilishi va case-sensitive ekanligi
          kerak; ko'p so'zli nomlar uchun <code>camelCase</code> tavsiya etiladi.
        </li>
        <li>
          Beshta asosiy tur: <code>string</code>, <code>number</code> (integer va float uchun
          ham bitta tur), <code>boolean</code>, <code>undefined</code> va <code>null</code> —
          turni <code>typeof</code> bilan tekshirish mumkin.
        </li>
        <li>
          <code>undefined</code> — qiymat hali berilmagan (JavaScript o'zi qo'yadi);{' '}
          <code>null</code> — qiymat qasddan bo'sh deb belgilangan (dasturchi o'zi qo'yadi).
        </li>
      </KeyPoints>
    </>
  )
}
