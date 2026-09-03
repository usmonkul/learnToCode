import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Callbacklar va "callback hell"',
  section: 'Asinxron JavaScript',
}

export default function CallbackHellLesson() {
  return (
    <>
      <p>
        Hozirgacha yozgan barcha kodimiz — <strong>sinxron</strong> (synchronous)
        edi: har bir qator navbat bilan, oldingisi tugagach ishlaydi. Lekin real
        veb-ilovalarda ko'p vazifalar <strong>darhol</strong> tugamaydi — masalan,
        serverdan ma'lumot olish, foydalanuvchi bir necha soniya kutish yoki fayl
        yuklash. Bu bo'lim — kursning eng muhim yangi mavzusi, <strong>asinxron
        JavaScript</strong>ka kirish. Birinchi qadam sifatida uning eng eski
        vositasi — <strong>callback</strong> — va uning muammosini ko'ramiz.
      </p>

      <h2>Asinxron nima va nega kerak?</h2>
      <p>
        <code>setTimeout</code> — eng oddiy asinxron funksiya: u kodni{' '}
        <strong>darhol emas</strong>, belgilangan vaqtdan keyin ishga tushiradi:
      </p>
      <CodeBlock lang="javascript">{`console.log("1-qadam")

setTimeout(() => {
  console.log("2-qadam (2 soniyadan keyin)")
}, 2000)

console.log("3-qadam")

// Konsolda tartib: "1-qadam", "3-qadam", (2 soniyadan keyin) "2-qadam (2 soniyadan keyin)"`}</CodeBlock>
      <Callout type="note" title="Nega '3-qadam' '2-qadam'dan oldin chiqadi?">
        JavaScript <code>setTimeout</code>ni chaqirib, "2 soniyadan keyin buni
        bajar" deb brauzerga topshiradi-yu, <strong>kutib turmaydi</strong> — darhol
        keyingi qatorga o'tadi. Bu — JavaScriptning bitta vaqtda faqat bitta
        vazifani bajarish (single-threaded), lekin uzoq davom etadigan ishlarni
        "fonga" jo'natib, dasturni bloklamaslik tamoyili.
      </Callout>
      <p>
        Real hayotda bunga o'xshash vaziyat — masalan, serverga so'rov yuborish:
        javob 1-2 soniyada keladi, lekin shu vaqt ichida sahifa "muzlab
        qolmasligi", foydalanuvchi boshqa tugmalarni bosa olishi kerak.
        Serverdan ma'lumot olishni (<code>fetch</code>) 13-darsda o'rganamiz —
        hozircha <code>setTimeout</code> orqali "biroz vaqt talab qiladigan ish"ni
        simulyatsiya qilamiz.
      </p>

      <h2>Callback — "tugagach, shuni bajar"</h2>
      <p>
        <strong>Callback</strong> — allaqachon tanish tushuncha: 04-darsda HOFga
        argument sifatida beriladigan funksiya deb o'rgangan edingiz. Asinxron
        kontekstda callback — "ish tugagach, shu funksiyani chaqir" degan
        ma'noni bildiradi:
      </p>
      <CodeBlock lang="javascript">{`function malumotOlish(callback) {
  setTimeout(() => {
    const malumot = { ism: "Aziz", yosh: 25 }
    callback(malumot) // "ish tugadi" — natijani callback orqali beramiz
  }, 1000)
}

malumotOlish((malumot) => {
  console.log("Kelgan ma'lumot:", malumot)
})
console.log("Ma'lumot so'raldi, kutyapmiz...")

// Tartib: "Ma'lumot so'raldi, kutyapmiz...", (1 soniyadan keyin) "Kelgan ma'lumot: ..."`}</CodeBlock>
      <p>
        <code>malumotOlish</code>ning natijasini <code>return</code> orqali
        to'g'ridan-to'g'ri qaytarib bo'lmaydi — chunki funksiya ma'lumot hali
        tayyor bo'lmasdan tugab ketadi. Shuning uchun natija callback orqali,
        "keyinroq" yetkaziladi.
      </p>

      <h2>Muammo: "callback hell" — ichma-ich callbacklar</h2>
      <p>
        Agar bir nechta asinxron amalni <strong>ketma-ket</strong> bajarish kerak
        bo'lsa (masalan, avval foydalanuvchini olish, keyin uning
        buyurtmalarini, keyin har bir buyurtma tafsilotini), callbacklar
        bir-birining ichiga "uyalashib" ketadi:
      </p>
      <CodeBlock lang="javascript">{`foydalanuvchiniOl(userId, (foydalanuvchi) => {
  console.log("Foydalanuvchi:", foydalanuvchi)

  buyurtmalarniOl(foydalanuvchi.id, (buyurtmalar) => {
    console.log("Buyurtmalar:", buyurtmalar)

    buyurtmaTafsilotiniOl(buyurtmalar[0].id, (tafsilot) => {
      console.log("Tafsilot:", tafsilot)

      // ... va shu tariqa davom etadi
    })
  })
})`}</CodeBlock>
      <Callout type="warning" title="Nega bu 'callback hell' (do'zax) deb ataladi?">
        Har bir yangi asinxron qadam kodni <strong>bir pog'ona o'ngga</strong>{' '}
        suradi — natijada kod "zinapoya" yoki "yoysimon" shaklga aylanadi. Bu
        kodni o'qish, xatolarni boshqarish (har bir bosqichda alohida{' '}
        <code>if xato bo'lsa</code> yozish kerak) va tartibni tushunishni juda
        qiyinlashtiradi. Bu — real loyihalarda ko'p uchraydigan, tanib olish
        muhim bo'lgan "yomon hid" (code smell).
      </Callout>
      <Quiz
        question="Callback hell nima uchun yuzaga keladi?"
        options={[
          "JavaScript juda sekin ishlagani uchun",
          "Bir nechta asinxron amal ketma-ket, bir-birining ichida callback orqali bog'langani uchun",
          "setTimeout noto'g'ri ishlatilgani uchun",
          "Massiv metodlari noto'g'ri ishlatilgani uchun",
        ]}
        correctIndex={1}
        explanation="Har bir keyingi asinxron amal avvalgisining natijasiga bog'liq bo'lsa va bu callback orqali amalga oshirilsa, callbacklar bir-birining ichiga uyalashib, chuqur, o'qish qiyin kod tuzilishi hosil bo'ladi."
      />

      <h2>Xatoliklarni boshqarish — yana bir muammo</h2>
      <p>
        Callback uslubida xatolik odatda birinchi argument sifatida uzatiladi
        ("error-first callback" naqshi), va har bir bosqichda uni alohida
        tekshirish kerak bo'ladi:
      </p>
      <CodeBlock lang="javascript">{`malumotOlish((xato, malumot) => {
  if (xato) {
    console.log("Xatolik:", xato)
    return
  }

  keyingiAmal(malumot, (xato2, natija) => {
    if (xato2) {
      console.log("Xatolik:", xato2)
      return
    }

    // ... har bosqichda shu tekshiruv takrorlanadi
  })
})`}</CodeBlock>
      <p>
        Bu takrorlanish — kodni uzun va xatoga moyil qiladi. Keyingi ikki
        darsda — <strong>Promise</strong> va <strong>async/await</strong> —
        aynan shu ikkala muammoni (chuqur uyalashish va xatolik boshqaruvi
        takrorlanishi) hal qilish uchun yaratilgan zamonaviy vositalarni
        o'rganamiz.
      </p>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: setTimeout bilan kechikish">
        <p>
          Konsolga <code>"Boshlandi"</code>ni darhol, <code>"Tugadi"</code>ni esa
          1.5 soniyadan keyin chiqaradigan kod yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`console.log("Boshlandi")

setTimeout(() => {
  console.log("Tugadi")
}, 1500)`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Callback qabul qiluvchi funksiya">
        <p>
          <code>kutibOlish(sekund, callback)</code> nomli funksiya yozing — u{' '}
          <code>sekund</code>ga mos vaqtdan keyin <code>callback</code>ni
          chaqiradi, "Vaqt o'tdi!" matnini argument sifatida uzatib.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function kutibOlish(sekund, callback) {
  setTimeout(() => {
    callback("Vaqt o'tdi!")
  }, sekund * 1000)
}

kutibOlish(2, (xabar) => console.log(xabar)) // 2 soniyadan keyin: "Vaqt o'tdi!"`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Ikkita ketma-ket asinxron amal">
        <p>
          <code>birinchiQadam(callback)</code> va <code>ikkinchiQadam(natija,
          callback)</code> funksiyalari berilgan (ikkalasi ham{' '}
          <code>setTimeout</code> bilan 1 soniyadan keyin ishlaydi). Ularni
          ketma-ket, callback ichida callback shaklida chaqirib, yakuniy
          natijani konsolga chiqaring.
        </p>
        <CodeBlock lang="javascript">{`function birinchiQadam(callback) {
  setTimeout(() => callback(10), 1000)
}

function ikkinchiQadam(natija, callback) {
  setTimeout(() => callback(natija * 2), 1000)
}`}</CodeBlock>
        <Solution>
          <CodeBlock lang="javascript">{`birinchiQadam((natija1) => {
  ikkinchiQadam(natija1, (natija2) => {
    console.log("Yakuniy natija:", natija2) // "Yakuniy natija: 20" (2 soniyadan keyin)
  })
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Asinxron kod — natijasi <strong>darhol emas</strong>, keyinroq
          tayyor bo'ladigan kod; JavaScript uni kutib turmasdan keyingi
          qatorlarni bajarishda davom etadi.
        </li>
        <li>
          Callback — "ish tugagach chaqiriladigan" funksiya; asinxron
          natijani <code>return</code> o'rniga shu tariqa "keyinroq" yetkazish
          usuli.
        </li>
        <li>
          Bir nechta asinxron amalni ketma-ket bajarish kerak bo'lganda,
          callbacklar bir-birining ichiga uyalashib, "callback hell" hosil
          qiladi — o'qish va xatolikni boshqarish qiyinlashadi.
        </li>
        <li>
          Bu muammo — Promise va async/await (keyingi ikki dars) yaratilishining
          asosiy sababi.
        </li>
      </KeyPoints>
    </>
  )
}
