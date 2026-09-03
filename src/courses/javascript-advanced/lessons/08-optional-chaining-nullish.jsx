import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Optional chaining (?.) va nullish coalescing (??)",
  section: "Massivlar va obyektlar: yangi imkoniyatlar",
}

export default function OptionalChainingNullishLesson() {
  return (
    <>
      <p>
        Keyingi darslarda <code>fetch</code> orqali tashqi API'lardan ma'lumot
        olishni o'rganamiz — u yerda ma'lumot tuzilishi har doim kutilganidek
        "to'liq" kelavermaydi: ba'zi xususiyatlar yo'q bo'lishi, obyekt ichida
        obyekt bo'lmasligi mumkin. Bu darsda shunday holatlarda dastur "yiqilib
        tushmasligi" uchun ikkita zamonaviy vosita — <strong>optional
        chaining</strong> (<code>?.</code>) va <strong>nullish coalescing</strong>{' '}
        (<code>??</code>) — ni o'rganamiz.
      </p>

      <h2>Muammo: ichma-ich obyektga murojaat qilishda xatolik</h2>
      <p>
        Obyekt ichida obyekt bo'lganda (masalan, foydalanuvchining manzili), agar
        ichki xususiyat mavjud bo'lmasa, JavaScript xatolik beradi:
      </p>
      <CodeBlock lang="javascript">{`const foydalanuvchi = { ism: "Aziz" } // manzil ma'lumoti yo'q

console.log(foydalanuvchi.manzil.shahar) // XATOLIK: Cannot read properties of undefined`}</CodeBlock>
      <p>
        Bu real loyihalarda tez-tez uchraydi — masalan, API'dan kelgan
        foydalanuvchi obyektida ba'zan <code>manzil</code> maydoni bo'lmasligi
        mumkin. Eski usulda buni oldini olish uchun har bir qadamni alohida
        tekshirish kerak edi:
      </p>
      <CodeBlock lang="javascript">{`let shahar
if (foydalanuvchi && foydalanuvchi.manzil) {
  shahar = foydalanuvchi.manzil.shahar
}
console.log(shahar) // undefined — xatolik yo'q, lekin kod uzun`}</CodeBlock>

      <h2>Optional chaining (?.) — xavfsiz murojaat</h2>
      <p>
        <code>?.</code> — xuddi oddiy <code>.</code> kabi ishlaydi, lekin agar
        chap tomondagi qiymat <code>null</code> yoki <code>undefined</code>{' '}
        bo'lsa, xatolik bermasdan <code>undefined</code> qaytaradi va to'xtaydi:
      </p>
      <CodeBlock lang="javascript">{`const foydalanuvchi = { ism: "Aziz" }

console.log(foydalanuvchi.manzil?.shahar) // undefined — xatolik yo'q!
console.log(foydalanuvchi.ism)             // "Aziz" — mavjud bo'lsa oddiy ishlaydi`}</CodeBlock>
      <p>
        Bu bir qatorda, ichma-ich necha bosqich bo'lsa ham zanjirlab ishlatilishi
        mumkin:
      </p>
      <CodeBlock lang="javascript">{`const buyurtma = {
  mijoz: {
    manzil: null,
  },
}

console.log(buyurtma.mijoz?.manzil?.kocha) // undefined — birinchi null'da to'xtaydi, xatolik bermaydi
console.log(buyurtma.royxat?.uzunlik)      // undefined — "royxat" umuman yo'q`}</CodeBlock>
      <Callout type="note" title="Metod chaqirishda ham ishlatiladi">
        <code>?.()</code> — funksiya mavjud bo'lsagina uni chaqiradi:
        <CodeBlock lang="javascript">{`const sozlamalar = {}

sozlamalar.saqlash?.() // "saqlash" metodi yo'q — hech narsa bo'lmaydi, xatolik ham yo'q`}</CodeBlock>
      </Callout>
      <p>Massiv elementiga murojaat qilishda ham xuddi shunday ishlaydi — <code>?.[ ]</code>:</p>
      <CodeBlock lang="javascript">{`const malumot = {}

console.log(malumot.royxat?.[0]) // undefined — "royxat" yo'q, lekin xatolik yo'q`}</CodeBlock>

      <h2>Real hayotiy misol: API'dan kelgan ma'lumotni DOM'ga chiqarish</h2>
      <p>
        Keyingi bo'limda <code>fetch</code> bilan chuqur tanishamiz, lekin
        optional chaining aynan shu vaziyat uchun yaratilgan — server javobida
        ba'zi maydonlar bo'lmasligi mumkin, dastur esa "yiqilib tushmasligi"
        kerak:
      </p>
      <CodeBlock lang="javascript">{`function foydalanuvchiKartochkasiniChiqar(foydalanuvchi) {
  const shaharElement = document.getElementById("shahar")

  // Agar "manzil" yoki "shahar" maydoni serverdan kelmasa ham, dastur ishlashda davom etadi:
  shaharElement.textContent = foydalanuvchi.manzil?.shahar ?? "Noma'lum shahar"
}`}</CodeBlock>
      <Quiz
        question="const obyekt = { a: { b: null } }; console.log(obyekt.a?.b?.c) nima chiqaradi?"
        options={['undefined', 'null', 'Xatolik beradi', '{}']}
        correctIndex={0}
        explanation="obyekt.a mavjud, obyekt.a.b esa null. ?. null qiymatda ham to'xtab, xatolik bermasdan undefined qaytaradi (c'ga umuman yetib bormaydi)."
      />

      <h2>Nullish coalescing (??) — standart qiymat berish</h2>
      <p>
        <code>??</code> — chap tomondagi qiymat <code>null</code> yoki{' '}
        <code>undefined</code> bo'lsa, o'ng tomondagi standart qiymatni
        qaytaradi. U ko'pincha <code>?.</code> bilan birga ishlatiladi:
      </p>
      <CodeBlock lang="javascript">{`const foydalanuvchi = { ism: "Aziz" }

const shahar = foydalanuvchi.manzil?.shahar ?? "Noma'lum shahar"
console.log(shahar) // "Noma'lum shahar"`}</CodeBlock>
      <p>
        5-darsda o'rgangan <code>||</code> operatori ham shunga o'xshab standart
        qiymat berish uchun ishlatiladi, lekin ular orasida <strong>muhim
        farq</strong> bor:
      </p>
      <CodeBlock lang="javascript">{`const chegirma = 0 // haqiqiy, to'g'ri qiymat — lekin 0 "falsy" hisoblanadi

console.log(chegirma || 10) // 10 — XATO! 0 chegirma "yo'q" deb hisoblanib, standart qiymat ishlatildi
console.log(chegirma ?? 10) // 0 — TO'G'RI! 0 — haqiqiy qiymat, faqat null/undefined uchun standart ishlatiladi`}</CodeBlock>
      <Callout type="warning" title="|| va ?? — bir xil emas">
        <code>||</code> chap tomon <strong>istalgan falsy qiymat</strong> bo'lsa
        (<code>0</code>, <code>""</code>, <code>false</code>, <code>null</code>,{' '}
        <code>undefined</code>, <code>NaN</code>) o'ng tomonni qaytaradi.{' '}
        <code>??</code> esa <strong>faqat</strong> <code>null</code> yoki{' '}
        <code>undefined</code>da o'ng tomonni qaytaradi. Sonlar yoki bo'sh matn
        bilan ishlaganda (masalan, chegirma foizi, forma inputi) <code>??</code>{' '}
        ancha xavfsizroq.
      </Callout>
      <p>Real misol — forma inputidan miqdorni o'qish:</p>
      <CodeBlock lang="javascript">{`const miqdorInput = document.getElementById("miqdor")

function miqdorniOl() {
  const qiymat = miqdorInput.value.trim()
  return qiymat === "" ? null : Number(qiymat)
}

const miqdor = miqdorniOl() ?? 1 // qiymat kiritilmagan bo'lsa, standart 1 dona`}</CodeBlock>

      <h2>Amaliy misol: mahsulot kartochkasi (hammasi birga)</h2>
      <CodeBlock lang="javascript">{`function kartochkaYarat(mahsulot) {
  const nom = mahsulot.nom ?? "Nomsiz mahsulot"
  const narx = mahsulot.narx ?? 0
  const rasm = mahsulot.rasm?.url ?? "/placeholder.png"
  const sharhlarSoni = mahsulot.sharhlar?.length ?? 0

  return \`
    <div class="kartochka">
      <img src="\${rasm}" alt="\${nom}" />
      <h3>\${nom}</h3>
      <p>\${narx} so'm — \${sharhlarSoni} ta sharh</p>
    </div>
  \`
}`}</CodeBlock>
      <p>
        Bu funksiya <code>mahsulot</code> obyektida <code>rasm</code> yoki{' '}
        <code>sharhlar</code> bo'lmasa ham xatolik bermay, mos standart
        qiymatlar bilan ishlashda davom etadi — real API bilan ishlaganda bu
        naqsh doimiy ishlatiladi.
      </p>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Xavfsiz murojaat">
        <p>
          <code>{'{ mijoz: { ism: "Vali" } }'}</code> obyektida{' '}
          <code>telefon</code> maydoni yo'q. Optional chaining yordamida{' '}
          <code>mijoz.telefon.raqam</code>ga xavfsiz murojaat qilib, konsolga
          chiqaring (xatolik bermasligi kerak).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const buyurtma = { mijoz: { ism: "Vali" } }

console.log(buyurtma.mijoz?.telefon?.raqam) // undefined — xatolik yo'q`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: || va ?? farqini toping">
        <p>
          <code>const sonSharhlar = 0</code> berilgan.{' '}
          <code>{'sonSharhlar || "Sharh yo\'q"'}</code> va{' '}
          <code>{'sonSharhlar ?? "Sharh yo\'q"'}</code> nima qaytarishini
          bashorat qiling va sababini tushuntiring.
        </p>
        <Solution>
          <p>
            <code>{'sonSharhlar || "Sharh yo\'q"'}</code> — <code>"Sharh yo'q"</code>{' '}
            qaytaradi, chunki <code>0</code> falsy hisoblanadi. Lekin bu noto'g'ri
            natija — 0 ta sharh bo'lishi haqiqiy holat.{' '}
            <code>{'sonSharhlar ?? "Sharh yo\'q"'}</code> — <code>0</code>{' '}
            qaytaradi, chunki <code>??</code> faqat <code>null</code>/
            <code>undefined</code>ni tekshiradi, <code>0</code> esa haqiqiy
            qiymat.
          </p>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Foydalanuvchi sozlamalari">
        <p>
          <code>{'{ mavzu: null, tilKodi: "uz" }'}</code> obyektidan{' '}
          <code>mavzu</code>ni <code>?? "yorug"</code> bilan, <code>tilKodi</code>ni
          esa <code>?? "en"</code> bilan o'qib, ikkalasini ham konsolga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const sozlamalar = { mavzu: null, tilKodi: "uz" }

const mavzu = sozlamalar.mavzu ?? "yorug"
const til = sozlamalar.tilKodi ?? "en"

console.log(mavzu, til) // "yorug" "uz" — tilKodi mavjud bo'lgani uchun standart ishlatilmadi`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>?.</code> (optional chaining) — chap tomon{' '}
          <code>null</code>/<code>undefined</code> bo'lsa xatolik bermasdan{' '}
          <code>undefined</code> qaytaradi; obyekt xususiyati, massiv elementi va
          metod chaqirishda ishlatiladi.
        </li>
        <li>
          <code>??</code> (nullish coalescing) — chap tomon faqat{' '}
          <code>null</code>/<code>undefined</code> bo'lsa o'ng tomondagi standart
          qiymatni beradi.
        </li>
        <li>
          <code>??</code> — <code>||</code>dan farqli o'laroq, <code>0</code>,{' '}
          <code>""</code>, <code>false</code> kabi "haqiqiy, lekin falsy"
          qiymatlarni standart bilan almashtirib qo'ymaydi.
        </li>
        <li>
          <code>?.</code> va <code>??</code> birga ishlatilganda (
          <code>obyekt.maydon?.ichki ?? standart</code>) — API'dan kelgan
          to'liq bo'lmagan ma'lumot bilan xavfsiz ishlash uchun eng ko'p
          ishlatiladigan naqsh.
        </li>
      </KeyPoints>
    </>
  )
}
