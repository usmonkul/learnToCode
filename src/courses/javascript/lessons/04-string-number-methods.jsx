import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'String va Number metodlari',
  section: 'Boshlash uchun',
}

export default function StringNumberMethodsLesson() {
  return (
    <>
      <p>
        Har bir <code>string</code> va <code>number</code> qiymatning ustida tayyor amallarni
        bajarish uchun o'ziga xos <strong>metodlar</strong> (methods) mavjud — bular qiymatga{' '}
        <code>.</code> (nuqta) orqali qo'shib chaqiriladigan tayyor funksiyalar. Ularni bilish
        kod yozishni ancha tezlashtiradi, chunki matn yoki son ustida bajariladigan ko'plab
        amallarni qo'lda yozishga hojat qolmaydi.
      </p>

      <h2>Eng ko'p ishlatiladigan String metodlari</h2>

      <h3>
        <code>.length</code> — uzunlikni bilish
      </h3>
      <p>
        Metod emas, xususiyat (property), lekin shu qadar ko'p ishlatiladiki, shu yerda
        boshlaymiz. Matndagi belgilar sonini qaytaradi:
      </p>
      <CodeBlock lang="javascript">{`let ism = "Aziz"
console.log(ism.length) // 4`}</CodeBlock>

      <h3>
        <code>.toUpperCase()</code> va <code>.toLowerCase()</code>
      </h3>
      <p>Matnni butunlay katta yoki kichik harflarga o'zgartiradi:</p>
      <CodeBlock lang="javascript">{`let shahar = "Toshkent"
console.log(shahar.toUpperCase()) // TOSHKENT
console.log(shahar.toLowerCase()) // toshkent`}</CodeBlock>

      <h3>
        <code>.trim()</code> — bo'sh joylarni tozalash
      </h3>
      <p>
        Matnning boshi va oxiridagi ortiqcha bo'sh joylarni (space) olib tashlaydi. Foydalanuvchi{' '}
        <code>prompt()</code> orqali kiritgan matnni tozalashda juda tez-tez ishlatiladi:
      </p>
      <CodeBlock lang="javascript">{`let email = "  aziz@example.com   "
console.log(email.trim()) // "aziz@example.com"`}</CodeBlock>

      <h3>
        <code>.includes()</code> — matn ichida borligini tekshirish
      </h3>
      <p>Berilgan qism matn ichida bor-yo'qligini tekshirib, boolean qaytaradi:</p>
      <CodeBlock lang="javascript">{`let email = "aziz@example.com"
console.log(email.includes("@")) // true
console.log(email.includes("gmail")) // false`}</CodeBlock>

      <h3>
        <code>.startsWith()</code> va <code>.endsWith()</code>
      </h3>
      <p>Matn ma'lum bir qism bilan boshlanadimi yoki tugaydimi, shuni tekshiradi:</p>
      <CodeBlock lang="javascript">{`let fayl = "rasm.png"
console.log(fayl.startsWith("rasm")) // true
console.log(fayl.endsWith(".png"))   // true`}</CodeBlock>

      <h3>
        <code>.slice()</code> — matndan bo'lak ajratib olish
      </h3>
      <p>
        Matnning boshlanish va tugash indeksi (index) bo'yicha bir qismini ajratib qaytaradi —
        indekslar <code>0</code>dan boshlanadi, tugash indeksi natijaga kirmaydi:
      </p>
      <CodeBlock lang="javascript">{`let email = "aziz@example.com"
console.log(email.slice(0, 4))  // "aziz"
console.log(email.slice(5))     // "example.com" — ikkinchi argument berilmasa, oxirigacha oladi`}</CodeBlock>

      <h3>
        <code>.indexOf()</code> — belgining o'rnini topish
      </h3>
      <p>
        Berilgan qism matn birinchi marta qayerda uchrashini (indeksini) qaytaradi; topilmasa{' '}
        <code>-1</code> qaytaradi. Ko'pincha <code>.slice()</code> bilan birga ishlatiladi:
      </p>
      <CodeBlock lang="javascript">{`let email = "aziz@example.com"
console.log(email.indexOf("@")) // 4
console.log(email.slice(0, email.indexOf("@"))) // "aziz"`}</CodeBlock>

      <h3>
        <code>.split()</code> — matnni bo'laklarga ajratish
      </h3>
      <p>Matnni berilgan belgi bo'yicha bo'lib, natijani massiv (array) qilib qaytaradi:</p>
      <CodeBlock lang="javascript">{`let tolikIsm = "Aziz Karimov"
let qismlar = tolikIsm.split(" ")
console.log(qismlar) // ["Aziz", "Karimov"]
console.log(qismlar[0]) // "Aziz"`}</CodeBlock>

      <h3>
        <code>.replace()</code> va <code>.replaceAll()</code>
      </h3>
      <p>
        Matndagi qism matnni boshqasiga almashtiradi. <code>.replace()</code> faqat birinchi
        uchraganini, <code>.replaceAll()</code> esa hammasini almashtiradi:
      </p>
      <CodeBlock lang="javascript">{`let raqam = "90 123 45 67"
console.log(raqam.replace(" ", ""))    // "90123 45 67" — faqat birinchisi
console.log(raqam.replaceAll(" ", "")) // "901234567"  — barchasi`}</CodeBlock>
      <Quiz
        question={`"  Salom  ".trim().toUpperCase() natijasi nima bo'ladi?`}
        options={['"  SALOM  "', '"Salom"', '"SALOM"', '"salom"']}
        correctIndex={2}
        explanation={`Avval trim() bo'sh joylarni olib tashlaydi ("Salom"), so'ng toUpperCase() uni katta harflarga o'zgartiradi ("SALOM").`}
      />

      <h2>Eng ko'p ishlatiladigan Number metodlari</h2>

      <h3>
        <code>.toFixed()</code> — kasr xonalarni cheklash
      </h3>
      <p>
        Sonni berilgan sondagi kasr xonagacha yaxlitlab, <strong>matn (string)</strong> holida
        qaytaradi — narxlarni ko'rsatishda juda keng qo'llaniladi:
      </p>
      <CodeBlock lang="javascript">{`let narx = 19.9999
console.log(narx.toFixed(2)) // "20.00"
console.log(typeof narx.toFixed(2)) // "string"`}</CodeBlock>

      <h3>
        <code>.toString()</code> — sonni matnga aylantirish
      </h3>
      <CodeBlock lang="javascript">{`let yosh = 25
console.log(yosh.toString())        // "25"
console.log(typeof yosh.toString()) // "string"`}</CodeBlock>

      <h3>
        <code>Number.isInteger()</code> — butun son ekanligini tekshirish
      </h3>
      <p>
        Son butun (kasrsiz) ekanligini tekshiradi. Bu <code>Number</code>ning o'zida turgan
        (static) metod, shuning uchun qiymatga emas, <code>Number</code>ning o'ziga qo'shib
        chaqiriladi:
      </p>
      <CodeBlock lang="javascript">{`console.log(Number.isInteger(10))   // true
console.log(Number.isInteger(10.5)) // false`}</CodeBlock>

      <h3>
        <code>parseInt()</code> va <code>parseFloat()</code>
      </h3>
      <p>
        Matnni songa aylantiradi — <code>parseInt()</code> butun songa, <code>parseFloat()</code>{' '}
        esa kasr songa. <code>Number()</code>dan farqi: matn ichida son bilan boshlanib, keyin
        boshqa belgilar bo'lsa ham, ular topgan qismini o'qiy oladi:
      </p>
      <CodeBlock lang="javascript">{`console.log(parseInt("25 yosh"))     // 25
console.log(parseFloat("9.99 so'm")) // 9.99
console.log(Number("25 yosh"))       // NaN — Number() butun matnni songa aylantira olmasa, taslim bo'ladi`}</CodeBlock>
      <Callout type="tip" title="Number() yoki parseInt()?">
        Agar matn <strong>faqat</strong> sondan iborat bo'lsa (masalan, <code>prompt()</code>{' '}
        natijasi), <code>Number()</code> ishlatish tavsiya etiladi — u aniqroq. Agar matn
        ichida son bilan bir qatorda boshqa so'zlar ham bo'lsa (masalan, <code>"25 yosh"</code>
        ), <code>parseInt()</code>/<code>parseFloat()</code> foydaliroq.
      </Callout>

      <h3>
        <code>isNaN()</code> — son emasligini tekshirish
      </h3>
      <p>
        Qiymat <code>NaN</code> ("Not a Number" — son emas) ekanligini tekshiradi. Foydalanuvchi
        kiritgan matn to'g'ri songa aylanganini tekshirishda juda foydali:
      </p>
      <CodeBlock lang="javascript">{`let kiritilgan = Number(prompt("Yoshingiz?"))
console.log(isNaN(kiritilgan)) // agar foydalanuvchi son o'rniga matn yozsa — true`}</CodeBlock>
      <Quiz
        question={`Number("12 yosh") va parseInt("12 yosh") natijalari mos ravishda nima bo'ladi?`}
        options={['12 va 12', 'NaN va 12', '12 va NaN', 'NaN va NaN']}
        correctIndex={1}
        explanation="Number() butun matn to'liq songa aylanmasa NaN qaytaradi; parseInt() esa matn boshidagi son qismini o'qib, 12ni qaytaradi."
      />

      <h2>Amaliyot: haqiqiy hayotdagi vazifalar</h2>
      <p>
        Quyidagi vazifalarning har biri haqiqiy loyihalarda tez-tez uchraydigan holatga
        asoslangan. Har birini yechish uchun yuqorida o'rgangan String va Number
        metodlaridan foydalaning.
      </p>

      <Exercise title="1-vazifa: Email validatsiyasi">
        <p>
          Ro'yxatdan o'tish formasida foydalanuvchi email kiritadi. <code>prompt()</code> orqali
          email so'rang, uni <code>.trim()</code> bilan tozalang va u <code>@</code> belgisini
          o'z ichiga olishini <code>.includes()</code> bilan tekshirib, natijani konsolga
          chiqaring.
        </p>
      </Exercise>

      <Exercise title="2-vazifa: Foydalanuvchi nomini avtomatik yaratish">
        <p>
          Ko'pgina saytlar ro'yxatdan o'tishda ism va familiyadan avtomatik login (username)
          yasaydi. Ism va familiyani <code>prompt()</code> orqali so'rang va ularni kichik
          harflarga o'tkazib, orasiga nuqta qo'yib birlashtiring (masalan{' '}
          <code>"aziz.karimov"</code>).
        </p>
      </Exercise>

      <Exercise title="3-vazifa: Narxni checkout uchun formatlash">
        <p>
          Onlayn-do'kon savatidagi mahsulot narxi <code>14999.5</code> so'm. Uni chekda
          ko'rsatish uchun aynan 2 xonali kasrgacha yaxlitlab chiqaring.
        </p>
      </Exercise>

      <Exercise title="4-vazifa: Fayl kengaytmasini aniqlash">
        <p>
          Fayl yuklash tizimida faqat rasm fayllariga ruxsat berilishi kerak. Fayl nomi (
          <code>"portret.png"</code>) berilgan bo'lsa, undan kengaytmani (<code>"png"</code>)
          ajratib oling va u <code>"png"</code>, <code>"jpg"</code> yoki{' '}
          <code>"jpeg"</code>ga tengligini tekshiring.
        </p>
      </Exercise>

      <Exercise title="5-vazifa: Telefon raqamini tozalash">
        <p>
          Foydalanuvchi telefon raqamini <code>"+998 90 123 45 67"</code> ko'rinishida kiritdi,
          lekin bazaga faqat raqamlarni (bo'sh joysiz) saqlash kerak. Barcha bo'sh joylarni olib
          tashlab, tozalangan raqamni chiqaring.
        </p>
      </Exercise>

      <Exercise title="6-vazifa: Parol uzunligini tekshirish">
        <p>
          Ro'yxatdan o'tishda parol kamida 8 belgidan iborat bo'lishi shart. Foydalanuvchidan{' '}
          <code>prompt()</code> orqali parol so'rang va uning uzunligi yetarli ekanligini
          tekshirib, natijani (<code>true</code>/<code>false</code>) chiqaring.
        </p>
      </Exercise>

      <Exercise title="7-vazifa: Ism-familiyani to'g'ri formatga keltirish">
        <p>
          Foydalanuvchi ismini turlicha usulda kiritishi mumkin: <code>"AZIZ"</code>,{' '}
          <code>"aziz"</code> yoki <code>"aZiZ"</code>. Har qanday holatda ham uni bir xilda,
          faqat birinchi harfi katta qolgani kichik holatda (<code>"Aziz"</code>) chiqaradigan
          kod yozing.
        </p>
      </Exercise>

      <Exercise title="8-vazifa: Buyurtma umumiy summasini hisoblash">
        <p>
          Onlayn-do'konda uchta mahsulot narxi <code>prompt()</code> orqali birma-bir
          so'raladi (foydalanuvchi ularni matn sifatida kiritadi). Barchasini songa
          aylantirib, umumiy summani hisoblang va uni 2 xonali kasrgacha yaxlitlab{' '}
          <code>alert()</code> orqali ko'rsating.
        </p>
      </Exercise>

      <KeyPoints>
        <li>
          Metod — qiymatga <code>.</code> orqali qo'shib chaqiriladigan tayyor funksiya;{' '}
          <code>.length</code> esa metod emas, xususiyat.
        </li>
        <li>
          Eng ko'p ishlatiladigan String metodlari: <code>toUpperCase()</code>,{' '}
          <code>toLowerCase()</code>, <code>trim()</code>, <code>includes()</code>,{' '}
          <code>slice()</code>, <code>split()</code>, <code>replace()</code>/
          <code>replaceAll()</code>, <code>indexOf()</code>, <code>startsWith()</code>/
          <code>endsWith()</code>.
        </li>
        <li>
          Eng ko'p ishlatiladigan Number metodlari: <code>toFixed()</code>,{' '}
          <code>toString()</code>, <code>Number.isInteger()</code>,{' '}
          <code>parseInt()</code>/<code>parseFloat()</code>, <code>isNaN()</code>.
        </li>
        <li>
          <code>Number()</code> matn to'liq son bo'lgandagina ishlaydi;{' '}
          <code>parseInt()</code>/<code>parseFloat()</code> matn ichidan son qismini topib
          o'qiy oladi.
        </li>
      </KeyPoints>
    </>
  )
}
