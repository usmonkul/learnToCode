import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Operatorlar',
  section: 'Boshlash uchun',
}

export default function OperatorsLesson() {
  return (
    <>
      <p>
        Operator — qiymatlar ustida amal bajarish uchun ishlatiladigan maxsus belgi (masalan{' '}
        <code>+</code> yoki <code>{'>'}</code>). Bu darsda JavaScript'da eng ko'p
        ishlatiladigan uchta operator turini ko'rib chiqamiz: <strong>arifmetik</strong> (sonlar
        ustida hisob-kitob), <strong>taqqoslash</strong> (ikki qiymatni solishtirish) va{' '}
        <strong>mantiqiy</strong> (bir nechta shartni birlashtirish) operatorlar.
      </p>

      <h2>Arifmetik operatorlar</h2>
      <p>Sonlar ustida matematik amallarni bajarish uchun ishlatiladi:</p>
      <CodeBlock lang="javascript">{`let a = 10
let b = 3

console.log(a + b)  // 13 — qo'shish
console.log(a - b)  // 7  — ayirish
console.log(a * b)  // 30 — ko'paytirish
console.log(a / b)  // 3.3333333333333335 — bo'lish
console.log(a % b)  // 1  — bo'lishdan qolgan qoldiq (remainder)
console.log(a ** b) // 1000 — darajaga oshirish (10 ning 3-darajasi)`}</CodeBlock>
      <Callout type="tip" title="% qoldiq operatori qayerda foydali?">
        <code>%</code> ko'pincha "son juftmi yoki toqmi" tekshirishda ishlatiladi:{' '}
        <code>{'son % 2 === 0'}</code> son juft bo'lsa <code>true</code> qaytaradi. Shuningdek,
        "har 5-elementda bir marta" kabi davriy holatlarni aniqlashda ham keng qo'llaniladi.
      </Callout>

      <h3>Ortirish va kamaytirish: ++ va --</h3>
      <p>
        Sonni bittaga oshirish yoki kamaytirish shu qadar tez-tez kerak bo'ladiki, buning uchun
        alohida qisqa operatorlar bor:
      </p>
      <CodeBlock lang="javascript">{`let hisob = 5
hisob++  // hisob = hisob + 1 bilan bir xil
console.log(hisob) // 6

hisob--  // hisob = hisob - 1 bilan bir xil
console.log(hisob) // 5`}</CodeBlock>

      <h3>Qisqartirilgan tayinlash (compound assignment) operatorlari</h3>
      <p>
        O'zgaruvchining eski qiymati ustiga amal bajarib, natijani yana o'ziga yozish juda
        keng tarqalgan holat — buning uchun qisqa yozuv bor:
      </p>
      <CodeBlock lang="javascript">{`let narx = 100

narx += 20   // narx = narx + 20  →  120
narx -= 10   // narx = narx - 10  →  110
narx *= 2    // narx = narx * 2   →  220
narx /= 4    // narx = narx / 4   →  55
narx %= 4    // narx = narx % 4   →  3`}</CodeBlock>
      <Quiz
        question={`let x = 7; x %= 3; natijada x nechaga teng bo'ladi?`}
        options={['2', '1', '3', '0']}
        correctIndex={1}
        explanation={`x %= 3 shuni bildiradi: x = x % 3, ya'ni 7ni 3ga bo'lishdan qolgan qoldiq — 1.`}
      />

      <h2>Taqqoslash operatorlari</h2>
      <p>
        Ikki qiymatni solishtirib, natija sifatida har doim <code>boolean</code> (
        <code>true</code> yoki <code>false</code>) qaytaradi:
      </p>
      <CodeBlock lang="javascript">{`let a = 10
let b = 3

console.log(a > b)   // true  — kattami?
console.log(a < b)   // false — kichikmi?
console.log(a >= 10) // true  — kattami yoki tengmi?
console.log(a <= 3)  // false — kichikmi yoki tengmi?`}</CodeBlock>

      <h3>
        <code>==</code> va <code>===</code> — eng muhim farq
      </h3>
      <p>
        JavaScript'da tenglikni tekshirishning ikki xil operatori bor, va ular boshqacha
        ishlaydi:
      </p>
      <ul>
        <li>
          <code>==</code> (loose equality) — qiymatlarni solishtirishdan oldin turlarini
          avtomatik moslashtirib (type coercion) ko'radi.
        </li>
        <li>
          <code>===</code> (strict equality) — turni ham, qiymatni ham solishtiradi, hech
          qanday avtomatik moslashtirish qilmaydi.
        </li>
      </ul>
      <CodeBlock lang="javascript">{`console.log(5 == "5")   // true  — "5" avtomatik songa aylantirilib solishtirildi
console.log(5 === "5")  // false — turlar boshqacha (number va string), shuning uchun teng emas

console.log(0 == false) // true  — avtomatik moslashtirish
console.log(0 === false) // false — turlar boshqacha (number va boolean)`}</CodeBlock>
      <Callout type="warning" title="Har doim === (va !==) ishlating">
        Amaliyotda <code>==</code>ning avtomatik moslashtirishi kutilmagan xatolarga olib
        kelishi mumkin. Shu sababli JavaScript dasturchilari deyarli har doim{' '}
        <code>===</code> (qat'iy teng) va <code>!==</code> (qat'iy teng emas) operatorlaridan
        foydalanishni tavsiya qiladi — <code>==</code>/<code>!=</code>ni faqat ongli ravishda,
        maxsus holat uchun ishlatish kerak.
      </Callout>
      <Quiz
        question={`"10" === 10 ifodasining natijasi nima bo'ladi?`}
        options={['true', 'false', 'undefined', 'Xatolik beradi']}
        correctIndex={1}
        explanation={`=== operatori turni ham solishtiradi: "10" — string, 10 — number, shuning uchun ular teng emas va false qaytadi.`}
      />

      <h2>Mantiqiy operatorlar</h2>
      <p>
        Bir nechta shartni birlashtirish yoki ularni inkor qilish uchun ishlatiladi. Uchta
        asosiy mantiqiy operator bor:
      </p>

      <h3>
        <code>&&</code> — VA (AND)
      </h3>
      <p>Barcha shartlar rost (true) bo'lsagina, natija ham rost bo'ladi:</p>
      <CodeBlock lang="javascript">{`let yosh = 20
let hujjatiBor = true

console.log(yosh >= 18 && hujjatiBor) // true — ikkalasi ham rost`}</CodeBlock>

      <h3>
        <code>||</code> — YOKI (OR)
      </h3>
      <p>Shartlardan kamida bittasi rost bo'lsa, natija rost bo'ladi:</p>
      <CodeBlock lang="javascript">{`let dushanba = false
let shanba = true

console.log(dushanba || shanba) // true — kamida bittasi rost`}</CodeBlock>

      <h3>
        <code>!</code> — INKOR (NOT)
      </h3>
      <p>Berilgan qiymatning teskarisini qaytaradi — rostni yolg'onga, yolg'onni rostga:</p>
      <CodeBlock lang="javascript">{`let yomgirYogyapti = false
console.log(!yomgirYogyapti) // true — "yomg'ir yog'moyapti" rost`}</CodeBlock>

      <h3>Qisqa tutashuv (short-circuit evaluation)</h3>
      <p>
        JavaScript <code>&&</code> va <code>||</code>ni chapdan o'ngga qarab, natija allaqachon
        aniq bo'lib qolganda to'xtab qoladigan tarzda hisoblaydi. Bu shunchaki nazariy
        qiziqarli xususiyat emas — amaliyotda juda ko'p ishlatiladi:
      </p>
      <CodeBlock lang="javascript">{`let foydalanuvchi = null

// && — chap taraf yolg'on bo'lsa, o'ng tarafga umuman qaralmaydi
console.log(foydalanuvchi && foydalanuvchi.ism) // null — xatoga olib kelmaydi

// || — chap taraf rost bo'lsa, o'ng tarafga umuman qaralmaydi, ko'pincha standart
// (default) qiymat berish uchun ishlatiladi
let ism = foydalanuvchi || "Mehmon"
console.log(ism) // "Mehmon"`}</CodeBlock>
      <Callout type="note" title="Truthy va falsy qiymatlar">
        Mantiqiy operatorlar <code>boolean</code> bo'lmagan qiymatlar bilan ham ishlaydi —
        JavaScript har qanday qiymatni avtomatik "rost"ga (truthy) yoki "yolg'on"ga (falsy)
        aylantirib baholaydi. Faqat oltita qiymat <strong>falsy</strong> hisoblanadi:{' '}
        <code>false</code>, <code>0</code>, <code>""</code> (bo'sh matn), <code>null</code>,{' '}
        <code>undefined</code> va <code>NaN</code>. Qolgan hamma narsa — shu jumladan bo'sh
        bo'lmagan matn, har qanday manfiy yoki musbat son (0'dan tashqari) —{' '}
        <strong>truthy</strong> hisoblanadi.
      </Callout>
      <CodeBlock lang="javascript">{`console.log(Boolean(""))       // false
console.log(Boolean("Salom"))  // true
console.log(Boolean(0))        // false
console.log(Boolean(-5))       // true`}</CodeBlock>
      <Quiz
        question={`let bosh = ""; let ism = bosh || "Mehmon"; ism nechaga teng bo'ladi?`}
        options={['"" (bo\'sh matn)', '"Mehmon"', 'undefined', 'false']}
        correctIndex={1}
        explanation={`"" (bo'sh matn) falsy hisoblanadi, shuning uchun || operatori o'ng tarafdagi "Mehmon" qiymatini qaytaradi.`}
      />

      <Exercise title="Mashq: kirish shartlarini tekshirish">
        <p>
          Konsertga kirish uchun quyidagi shartlar bajarilishi kerak: yosh 18 dan katta yoki
          teng bo'lishi <strong>va</strong> chiptasi bo'lishi kerak. <code>prompt()</code>{' '}
          yordamida yoshni so'rang, <code>Number()</code>ga aylantiring, so'ng{' '}
          <code>confirm()</code> yordamida "Chiptangiz bormi?" deb so'rang. Ikkala shart ham
          bajarilganini <code>&&</code> operatori bilan tekshirib, natijani{' '}
          <code>console.log()</code> orqali chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let yoshMatn = prompt("Yoshingiz?")
let yosh = Number(yoshMatn)
let chiptasiBor = confirm("Chiptangiz bormi?")

let kirishMumkin = yosh >= 18 && chiptasiBor
console.log(kirishMumkin)`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Arifmetik operatorlar: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>,{' '}
          <code>%</code> (qoldiq), <code>**</code> (daraja); qisqartirilgan yozuv:{' '}
          <code>+=</code>, <code>-=</code>, <code>++</code>, <code>--</code> va h.k.
        </li>
        <li>
          Taqqoslash operatorlari har doim <code>boolean</code> qaytaradi:{' '}
          <code>{'>'}</code>, <code>{'<'}</code>, <code>{'>='}</code>, <code>{'<='}</code>,{' '}
          <code>===</code>, <code>!==</code>.
        </li>
        <li>
          <code>===</code> turni ham, qiymatni ham solishtiradi; <code>==</code> avtomatik tur
          moslashtiradi va kutilmagan natijalarga olib kelishi mumkin — shuning uchun har doim{' '}
          <code>===</code>/<code>!==</code> ishlating.
        </li>
        <li>
          Mantiqiy operatorlar: <code>&&</code> (barchasi rost bo'lsa), <code>||</code> (kamida
          bittasi rost bo'lsa), <code>!</code> (teskarisi).
        </li>
        <li>
          <code>&&</code>/<code>||</code> qisqa tutashuv bilan ishlaydi va{' '}
          <code>boolean</code> bo'lmagan (truthy/falsy) qiymatlar bilan ham to'g'ri ishlaydi.
        </li>
      </KeyPoints>
    </>
  )
}
