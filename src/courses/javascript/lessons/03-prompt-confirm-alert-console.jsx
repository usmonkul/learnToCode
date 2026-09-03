import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'prompt, confirm, alert va console',
  section: 'Boshlash uchun',
}

export default function PromptConfirmAlertConsoleLesson() {
  return (
    <>
      <p>
        Hozirgacha biz o'zgaruvchilarga qiymatni to'g'ridan-to'g'ri kod ichida yozib
        berdik. Lekin haqiqiy dasturlar odatda foydalanuvchidan ma'lumot so'raydi va unga
        natijani ko'rsatadi. Brauzer buning uchun to'rtta oddiy, tayyor funksiyani taqdim
        etadi: <code>prompt()</code>, <code>confirm()</code>, <code>alert()</code> va{' '}
        <code>console</code>.
      </p>
      <Callout type="note" title="Bular qayerda ishlaydi?">
        <code>prompt()</code>, <code>confirm()</code> va <code>alert()</code> — bu brauzerning
        (window ob'ektining) funksiyalari, shuning uchun ular faqat brauzerda ishlaydi (Node.js
        kabi server muhitida mavjud emas). <code>console</code> esa ham brauzerda, ham
        Node.js'da ishlaydi.
      </Callout>

      <h2>
        <code>prompt()</code> — foydalanuvchidan matn so'rash
      </h2>
      <p>
        <code>prompt()</code> ekranda kichik dialog oynasi ochadi, unda savol va foydalanuvchi
        yozishi uchun matn maydoni bo'ladi. Foydalanuvchi nimadir yozib "OK" tugmasini bossa,
        o'sha matn funksiyaning natijasi (return value) sifatida qaytadi:
      </p>
      <CodeBlock lang="javascript">{`let ism = prompt("Ismingizni kiriting:")
console.log(ism) // foydalanuvchi yozgan matn`}</CodeBlock>
      <Callout type="warning" title="prompt() har doim string qaytaradi">
        Foydalanuvchi <code>25</code> deb yozsa ham, <code>prompt()</code> uni son emas,{' '}
        <code>"25"</code> — matn (string) sifatida qaytaradi. Son bilan hisob-kitob qilishdan
        oldin uni <code>Number()</code> yordamida songa aylantirish kerak:
      </Callout>
      <CodeBlock lang="javascript">{`let yoshMatn = prompt("Yoshingizni kiriting:")
let yosh = Number(yoshMatn)
console.log(typeof yoshMatn) // "string"
console.log(typeof yosh)     // "number"
console.log(yosh + 1)        // to'g'ri qo'shiladi, masalan 26`}</CodeBlock>
      <p>
        Agar foydalanuvchi dialogni "Bekor qilish" (Cancel) tugmasi bilan yopsa,{' '}
        <code>prompt()</code> matn o'rniga <code>null</code> qaytaradi — bu ham oldingi darsda
        ko'rgan "qasddan bo'sh qiymat" degani.
      </p>

      <h2>
        <code>confirm()</code> — ha/yo'q savoli
      </h2>
      <p>
        <code>confirm()</code> "OK" va "Bekor qilish" (Cancel) tugmalari bo'lgan dialog oynasi
        ochadi va foydalanuvchi qaysi tugmani bosganiga qarab <code>boolean</code> qiymat
        qaytaradi — "OK" bosilsa <code>true</code>, "Bekor qilish" bosilsa <code>false</code>:
      </p>
      <CodeBlock lang="javascript">{`let roziMi = confirm("Davom etishni xohlaysizmi?")
console.log(roziMi)        // true yoki false
console.log(typeof roziMi) // "boolean"`}</CodeBlock>

      <h2>
        <code>alert()</code> — foydalanuvchiga xabar ko'rsatish
      </h2>
      <p>
        <code>alert()</code> ekranda faqat "OK" tugmasi bo'lgan dialog oynasi ochadi va
        foydalanuvchiga matn ko'rsatadi. U hech qanday foydali qiymat qaytarmaydi (
        <code>undefined</code>) — uning yagona vazifasi ekranda ma'lumotni{' '}
        <strong>ko'rsatish</strong>:
      </p>
      <CodeBlock lang="javascript">{`let ism = "Aziz"
alert(\`Salom, \${ism}!\`)`}</CodeBlock>
      <Callout type="warning" title="prompt, confirm va alert dasturni to'xtatadi">
        Uchalasi ham <strong>sinxron (synchronous)</strong> — foydalanuvchi dialog oynasidagi
        tugmani bosmaguncha, sahifadagi boshqa hech narsa ishlamaydi. Shu sababli ular kichik
        o'quv misollari va oddiy skriptlar uchun qulay, lekin haqiqiy veb-ilovalarda deyarli
        ishlatilmaydi — ular o'rniga sahifa ichidagi maxsus forma va oyna (modal) komponentlari
        ishlatiladi.
      </Callout>

      <h2>
        <code>console</code> — dasturchi uchun konsol
      </h2>
      <p>
        <code>alert()</code>dan farqli o'laroq, <code>console</code> orqali chiqarilgan
        ma'lumot foydalanuvchiga emas, faqat <strong>dasturchiga</strong> ko'rinadi — brauzerning
        Developer Tools panelidagi "Console" bo'limida. U hech qanday oynani to'xtatmaydi va
        kodni tekshirish (debugging) uchun eng ko'p ishlatiladigan vositadir.
      </p>
      <CodeBlock lang="javascript">{`console.log("Oddiy xabar")
console.warn("Bu ogohlantirish")
console.error("Bu xatolik haqida xabar")`}</CodeBlock>
      <p>
        <code>console.log()</code> — eng ko'p ishlatiladigan usul, oddiy ma'lumot chiqarish
        uchun. <code>console.warn()</code> konsolda sariq rangda, ogohlantirish sifatida;{' '}
        <code>console.error()</code> esa qizil rangda, xatolik sifatida ko'rinadi — bu ikkalasi
        ham katta loyihalarda muhim xabarlarni oddiy loglar orasidan ajratib turish uchun
        foydali.
      </p>

      <h2>Qaysi birini qachon ishlatish kerak?</h2>
      <table className="my-4 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-canvas-muted">
            <th className="p-3 font-semibold text-ink">Funksiya</th>
            <th className="p-3 font-semibold text-ink">Nima qaytaradi</th>
            <th className="p-3 font-semibold text-ink">Kim ko'radi</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>prompt()</code>
            </td>
            <td className="p-3 text-ink-muted">
              Kiritilgan matn (string) yoki <code>null</code>
            </td>
            <td className="p-3 text-ink-muted">Foydalanuvchi</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>confirm()</code>
            </td>
            <td className="p-3 text-ink-muted">
              <code>true</code> yoki <code>false</code>
            </td>
            <td className="p-3 text-ink-muted">Foydalanuvchi</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>alert()</code>
            </td>
            <td className="p-3 text-ink-muted">
              <code>undefined</code>
            </td>
            <td className="p-3 text-ink-muted">Foydalanuvchi</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>console.log()</code>
            </td>
            <td className="p-3 text-ink-muted">
              <code>undefined</code>
            </td>
            <td className="p-3 text-ink-muted">Faqat dasturchi (Developer Tools)</td>
          </tr>
        </tbody>
      </table>

      <Quiz
        question={`prompt() funksiyasi foydalanuvchi "Bekor qilish" tugmasini bossa, nima qaytaradi?`}
        options={[`bo'sh matn ("")`, 'undefined', 'null', '0']}
        correctIndex={2}
        explanation="Foydalanuvchi dialogni bekor qilsa, prompt() null qaytaradi — bu qasddan bo'sh qiymat degani."
      />
      <Quiz
        question="alert() bilan console.log() o'rtasidagi asosiy farq nima?"
        options={[
          "alert() faqat sonlarni ko'rsatadi, console.log() faqat matnlarni",
          "alert() foydalanuvchiga ko'rinadigan dialog ochadi va sahifani to'xtatadi, console.log() esa faqat Developer Tools'da ko'rinadi va sahifani to'xtatmaydi",
          "ular bir xil, faqat nomi boshqacha",
          "console.log() faqat Node.js'da ishlaydi, alert() esa faqat brauzerda",
        ]}
        correctIndex={1}
        explanation="alert() foydalanuvchi ko'radigan, sinxron dialog oynasi ochadi; console.log() esa faqat dasturchi Developer Tools'da ko'radigan, sahifani to'xtatmaydigan yozuv qoldiradi."
      />

      <h2>Amaliyot</h2>
      <p>
        Quyidagi 10 ta vazifani ketma-ket bajaring — har birida <code>prompt()</code>,{' '}
        <code>confirm()</code>, <code>alert()</code> va <code>console</code>dan foydalaning.
        Kodni brauzeringizning Developer Tools konsolida sinab ko'rishingiz mumkin.
      </p>

      <Exercise title="1-vazifa: Ism so'rash">
        <p>
          <code>prompt()</code> yordamida foydalanuvchidan ismini so'rang va uni{' '}
          <code>console.log()</code> bilan konsolga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let ism = prompt("Ismingiz nima?")
console.log(ism)`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Salomlashish">
        <p>
          <code>prompt()</code> yordamida ism so'rang, so'ng template literal yordamida{' '}
          <code>{`"Salom, <ism>!"`}</code> xabarini <code>alert()</code> orqali ko'rsating.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let ism = prompt("Ismingiz nima?")
alert(\`Salom, \${ism}!\`)`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Yoshni hisoblash">
        <p>
          <code>prompt()</code> yordamida tug'ilgan yilingizni so'rang, uni{' '}
          <code>Number()</code> bilan songa aylantiring va joriy yildan ayirib, taxminiy
          yoshingizni <code>console.log()</code> bilan chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let tugilganYilMatn = prompt("Tug'ilgan yilingiz?")
let tugilganYil = Number(tugilganYilMatn)
let yosh = 2026 - tugilganYil
console.log(yosh)`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Ha yoki yo'q">
        <p>
          <code>confirm()</code> yordamida "Dasturlashni yaxshi ko'rasizmi?" deb so'rang va
          javobni (<code>true</code>/<code>false</code>) hamda uning turini (
          <code>typeof</code>) <code>console.log()</code> bilan chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let javob = confirm("Dasturlashni yaxshi ko'rasizmi?")
console.log(javob)
console.log(typeof javob)`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="5-vazifa: Ikkita sonni qo'shish">
        <p>
          <code>prompt()</code> yordamida ikkita son so'rang, ularni <code>Number()</code>ga
          aylantirib, yig'indisini <code>alert()</code> orqali ko'rsating.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let aMatn = prompt("Birinchi son:")
let bMatn = prompt("Ikkinchi son:")
let a = Number(aMatn)
let b = Number(bMatn)
alert(\`Yig'indi: \${a + b}\`)`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="6-vazifa: Bekor qilishni tekshirish">
        <p>
          <code>prompt()</code> yordamida shahringizni so'rang. Agar foydalanuvchi "Bekor
          qilish" tugmasini bossa, natija <code>null</code> bo'lishini{' '}
          <code>{`console.log(shahar === null)`}</code> yordamida tekshirib ko'ring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let shahar = prompt("Qaysi shaharda yashaysiz?")
console.log(shahar)
console.log(shahar === null)`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="7-vazifa: Javobni to'g'ridan-to'g'ri ko'rsatish">
        <p>
          <code>confirm()</code> yordamida "Bildirishnomalarni yoqasizmi?" deb so'rang va
          natijani to'g'ridan-to'g'ri template literal ichiga joylashtirib{' '}
          <code>alert()</code> bilan ko'rsating (masalan:{' '}
          <code>{`alert(\`Javobingiz: ${'${javob}'}\`)`}</code>).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let javob = confirm("Bildirishnomalarni yoqasizmi?")
alert(\`Javobingiz: \${javob}\`)`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="8-vazifa: Umumiy narxni hisoblash">
        <p>
          <code>prompt()</code> yordamida bitta xonaning narxini va xonalar sonini so'rang,
          umumiy narxni hisoblab, natijani ham <code>alert()</code>, ham{' '}
          <code>console.log()</code> orqali chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let narxMatn = prompt("Bitta xonaning narxi (kv.m uchun):")
let sonMatn = prompt("Xonalar soni (kv.m):")
let narx = Number(narxMatn)
let son = Number(sonMatn)
let umumiyNarx = narx * son

alert(\`Umumiy narx: \${umumiyNarx}\`)
console.log(umumiyNarx)`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="9-vazifa: Ogohlantirish va xatolik">
        <p>
          <code>console.warn()</code> yordamida "Diqqat: bu funksiya eskirgan" degan
          ogohlantirish, <code>console.error()</code> yordamida esa "Xatolik: ma'lumot
          topilmadi" degan xabar chiqaring. Brauzer konsolida ularning rangi qanday farq
          qilishini solishtiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`console.warn("Diqqat: bu funksiya eskirgan")
console.error("Xatolik: ma'lumot topilmadi")`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="10-vazifa: Mini-ro'yxatdan o'tish dasturi">
        <p>
          <code>prompt()</code> orqali ism, <code>prompt()</code> orqali yosh,{' '}
          <code>confirm()</code> orqali "Shartlarni qabul qilasizmi?" so'rang. So'ng barcha
          ma'lumotlarni bitta template literal ichida jamlab <code>alert()</code> bilan
          ko'rsating hamda har bir qiymatni alohida-alohida <code>console.log()</code> bilan
          konsolga ham chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let ism = prompt("Ismingiz?")
let yoshMatn = prompt("Yoshingiz?")
let yosh = Number(yoshMatn)
let shartQabul = confirm("Shartlarni qabul qilasizmi?")

alert(\`Ism: \${ism}, Yosh: \${yosh}, Shartlar qabul qilindi: \${shartQabul}\`)

console.log(ism)
console.log(yosh)
console.log(shartQabul)`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>prompt()</code> foydalanuvchidan matn so'raydi va har doim string (yoki bekor
          qilinsa <code>null</code>) qaytaradi — songa aylantirish uchun <code>Number()</code>{' '}
          kerak.
        </li>
        <li>
          <code>confirm()</code> "OK"/"Bekor qilish" savolini beradi va boolean (
          <code>true</code>/<code>false</code>) qaytaradi.
        </li>
        <li>
          <code>alert()</code> foydalanuvchiga ma'lumot ko'rsatadi, lekin hech narsa
          qaytarmaydi (<code>undefined</code>).
        </li>
        <li>
          <code>prompt()</code>, <code>confirm()</code> va <code>alert()</code> sinxron —
          foydalanuvchi tugmani bosmaguncha sahifa to'xtab turadi; shu sababli haqiqiy
          ilovalarda kam ishlatiladi.
        </li>
        <li>
          <code>console.log()</code>/<code>warn()</code>/<code>error()</code> faqat Developer
          Tools'da, faqat dasturchiga ko'rinadi va sahifani to'xtatmaydi — debugging uchun
          asosiy vosita.
        </li>
      </KeyPoints>
    </>
  )
}
