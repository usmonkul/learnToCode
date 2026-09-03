import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Promise: asinxron kodni boshqarish',
  section: 'Asinxron JavaScript',
}

export default function PromisesLesson() {
  return (
    <>
      <p>
        O'tgan darsda callback'larning asosiy muammosini ko'rdik: bir nechta
        asinxron amalni ketma-ket bajarish kerak bo'lganda, kod chuqur uyalashib
        ("callback hell"), xatoliklarni boshqarish esa har bosqichda takrorlanadi.{' '}
        <strong>Promise</strong> — aynan shu ikkala muammoni hal qilish uchun
        JavaScriptga qo'shilgan vosita. Bugungi kunda deyarli barcha zamonaviy
        asinxron API'lar (jumladan, keyingi darsda o'rganadigan{' '}
        <code>fetch</code>) natijani Promise ko'rinishida qaytaradi.
      </p>

      <h2>Promise nima?</h2>
      <p>
        <strong>Promise</strong> — "kelajakda tayyor bo'ladigan qiymat"ning
        o'ramasi (wrapper). U uch holatdan birida bo'lishi mumkin:
      </p>
      <ul>
        <li>
          <strong>pending</strong> (kutilmoqda) — natija hali tayyor emas
        </li>
        <li>
          <strong>fulfilled</strong> (bajarildi) — amal muvaffaqiyatli tugadi,
          natija bor
        </li>
        <li>
          <strong>rejected</strong> (rad etildi) — amal xatolik bilan tugadi
        </li>
      </ul>
      <p>
        Promise yaratish uchun <code>new Promise()</code> ishlatiladi — ichida{' '}
        <code>resolve</code> (muvaffaqiyat) va <code>reject</code> (xatolik)
        funksiyalari beriladi:
      </p>
      <CodeBlock lang="javascript">{`const malumotOlishPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const muvaffaqiyatli = true

    if (muvaffaqiyatli) {
      resolve({ ism: "Aziz", yosh: 25 }) // "bajarildi" holatiga o'tadi
    } else {
      reject(new Error("Ma'lumot topilmadi")) // "rad etildi" holatiga o'tadi
    }
  }, 1000)
})`}</CodeBlock>
      <Callout type="tip" title="Amaliyotda Promise'ni odatda o'zingiz yaratmaysiz">
        Real loyihalarda <code>new Promise()</code>ni kamdan-kam o'zingiz
        yozasiz — <code>fetch</code> va boshqa zamonaviy brauzer API'lari
        Promise'ni <strong>tayyor holda</strong> qaytaradi. Bu darsda{' '}
        <code>new Promise</code>ni faqat Promise "ichida" nima bo'layotganini
        tushunish uchun ko'ramiz.
      </Callout>

      <h2>then, catch, finally — natijani qabul qilish</h2>
      <p>
        Promise'ning natijasini <code>.then()</code> orqali olamiz (muvaffaqiyat
        bo'lsa), xatolikni <code>.catch()</code> orqali (rad etilsa):
      </p>
      <CodeBlock lang="javascript">{`malumotOlishPromise
  .then((malumot) => {
    console.log("Muvaffaqiyatli:", malumot)
  })
  .catch((xato) => {
    console.log("Xatolik:", xato.message)
  })`}</CodeBlock>
      <p>
        <code>.finally()</code> — natija muvaffaqiyatli yoki xato bo'lishidan
        qat'i nazar, <strong>har doim</strong> ishga tushadi. Bu, masalan,
        "yuklanmoqda" indikatorini o'chirish uchun juda foydali:
      </p>
      <CodeBlock lang="javascript">{`const yuklovchiElement = document.getElementById("yuklovchi")

yuklovchiElement.style.display = "block" // yuklanish indikatorini ko'rsatish

malumotOlishPromise
  .then((malumot) => console.log("Muvaffaqiyatli:", malumot))
  .catch((xato) => console.log("Xatolik:", xato.message))
  .finally(() => {
    yuklovchiElement.style.display = "none" // har qanday natijada ham yashiriladi
  })`}</CodeBlock>

      <h2>Promise zanjiri — callback hell'ning yechimi</h2>
      <p>
        <code>.then()</code>ning ichidan yana Promise <code>return</code>{' '}
        qilinsa, keyingi <code>.then()</code> o'sha Promise natijasini kutadi —
        bu ketma-ket asinxron amallarni <strong>tekis zanjir</strong> qilib
        yozish imkonini beradi, uyalashtirmasdan:
      </p>
      <CodeBlock lang="javascript">{`foydalanuvchiniOl(userId)
  .then((foydalanuvchi) => {
    console.log("Foydalanuvchi:", foydalanuvchi)
    return buyurtmalarniOl(foydalanuvchi.id) // keyingi Promise'ni qaytaramiz
  })
  .then((buyurtmalar) => {
    console.log("Buyurtmalar:", buyurtmalar)
    return buyurtmaTafsilotiniOl(buyurtmalar[0].id)
  })
  .then((tafsilot) => {
    console.log("Tafsilot:", tafsilot)
  })
  .catch((xato) => {
    console.log("Istalgan bosqichda xatolik bo'lsa, shu yerda ushlanadi:", xato)
  })`}</CodeBlock>
      <Callout type="note" title="callback hell bilan solishtiring">
        O'tgan darsdagi bir xil vazifa (foydalanuvchi → buyurtmalar → tafsilot)
        endi o'ngga surilmasdan, <strong>tekis</strong> zanjir shaklida yozildi.
        Bundan ham muhimi — bitta <code>.catch()</code> zanjirdagi{' '}
        <strong>istalgan</strong> bosqichda yuz bergan xatolikni ushlaydi, har
        bosqichda alohida tekshirish shart emas.
      </Callout>
      <Quiz
        question="Promise zanjirida .then() ichidan yana Promise return qilinsa nima bo'ladi?"
        options={[
          'Xatolik beradi',
          "Keyingi .then() o'sha qaytarilgan Promise natijasini kutib oladi",
          "Zanjir darhol to'xtaydi",
          'Ikkala Promise bir vaqtda ishga tushadi',
        ]}
        correctIndex={1}
        explanation=".then() ichidan Promise return qilinganda, zanjirdagi keyingi .then() avtomatik ravishda o'sha Promise bajarilishini kutadi — bu ketma-ket asinxron amallarni tekis zanjir shaklida yozish imkonini beradi."
      />

      <h2>Promise.all — bir nechta amalni parallel bajarish</h2>
      <p>
        Ba'zan bir nechta asinxron amal bir-biriga <strong>bog'liq emas</strong>{' '}
        va ularni ketma-ket emas, <strong>bir vaqtda</strong> (parallel)
        boshlash mumkin — bu ancha tezroq. <code>Promise.all</code> — bir nechta
        Promise'ni bir vaqtda kutib, barchasi tugagach natijalar massivini
        beradi:
      </p>
      <CodeBlock lang="javascript">{`Promise.all([
  foydalanuvchiniOl(1),
  foydalanuvchiniOl(2),
  foydalanuvchiniOl(3),
]).then(([foydalanuvchi1, foydalanuvchi2, foydalanuvchi3]) => {
  console.log("Uchalasi ham tayyor:", foydalanuvchi1, foydalanuvchi2, foydalanuvchi3)
})

// Ketma-ket (3 marta kutish) o'rniga, uchalasi BIR VAQTDA boshlanadi — ancha tezroq`}</CodeBlock>
      <Callout type="warning" title="Promise.all — birortasi rad etilsa, hammasi to'xtaydi">
        Agar massivdagi Promise'lardan <strong>bittasi</strong> ham rad etilsa
        (reject bo'lsa), <code>Promise.all</code> darhol o'sha xatolik bilan rad
        etiladi, boshqalari muvaffaqiyatli bo'lsa ham. Barcha natijalarni,
        xatolarni ham hisobga olib olish kerak bo'lsa, <code>Promise.allSettled</code>{' '}
        ishlatiladi (kurs doirasidan tashqarida, lekin bilib qo'yish foydali).
      </Callout>

      <h2>Amaliy misol: sun'iy API chaqiruvi</h2>
      <p>
        Keyingi darsda haqiqiy <code>fetch</code>ni ko'ramiz, lekin tushunchani
        mustahkamlash uchun "soxta" (mock) API funksiyasini Promise bilan
        yozamiz — bu real loyihalarda testlash uchun ham ishlatiladigan naqsh:
      </p>
      <CodeBlock lang="javascript">{`function foydalanuvchiniOl(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, ism: "Foydalanuvchi #" + id })
      } else {
        reject(new Error("Noto'g'ri ID"))
      }
    }, 800)
  })
}

const natijaElement = document.getElementById("natija")

foydalanuvchiniOl(5)
  .then((foydalanuvchi) => {
    natijaElement.textContent = foydalanuvchi.ism
  })
  .catch((xato) => {
    natijaElement.textContent = "Xatolik: " + xato.message
  })`}</CodeBlock>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Oddiy Promise yaratish">
        <p>
          <code>sonniIkkilantirish(son)</code> nomli funksiya yozing — u Promise
          qaytaradi: agar <code>son</code> musbat bo'lsa, 1 soniyadan keyin{' '}
          <code>son * 2</code>ni <code>resolve</code> qiladi, aks holda xatolik
          bilan <code>reject</code> qiladi.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function sonniIkkilantirish(son) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (son > 0) {
        resolve(son * 2)
      } else {
        reject(new Error("Son musbat bo'lishi kerak"))
      }
    }, 1000)
  })
}

sonniIkkilantirish(5)
  .then((natija) => console.log(natija)) // 10
  .catch((xato) => console.log(xato.message))`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Promise zanjiri">
        <p>
          Yuqoridagi <code>sonniIkkilantirish</code>ni ikki marta zanjirlab
          chaqiring — avval <code>3</code>ni, keyin natijani yana ikki
          barobarlab, yakuniy natijani konsolga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`sonniIkkilantirish(3)
  .then((natija1) => sonniIkkilantirish(natija1))
  .then((natija2) => console.log(natija2)) // 12 (3 -> 6 -> 12)
  .catch((xato) => console.log(xato.message))`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Promise.all bilan parallel chaqiruv">
        <p>
          <code>sonniIkkilantirish</code>ni <code>Promise.all</code> yordamida
          bir vaqtda <code>2</code>, <code>4</code> va <code>6</code> bilan
          chaqirib, uchala natijaning yig'indisini konsolga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`Promise.all([
  sonniIkkilantirish(2),
  sonniIkkilantirish(4),
  sonniIkkilantirish(6),
]).then(([a, b, c]) => {
  console.log(a + b + c) // 4 + 8 + 12 = 24
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Promise — kelajakda tayyor bo'ladigan qiymatning o'ramasi; uchta
          holati bor: pending, fulfilled, rejected.
        </li>
        <li>
          <code>.then()</code> — muvaffaqiyatli natijani, <code>.catch()</code>{' '}
          — xatolikni, <code>.finally()</code> — natijadan qat'i nazar har doim
          ishga tushadigan kodni belgilaydi.
        </li>
        <li>
          <code>.then()</code> ichidan Promise <code>return</code> qilish orqali
          ketma-ket asinxron amallarni chuqur uyalashtirmasdan, tekis zanjir
          shaklida yozish mumkin — bu callback hell'ning to'g'ridan-to'g'ri
          yechimi.
        </li>
        <li>
          Bitta <code>.catch()</code> zanjirdagi istalgan bosqichdagi xatolikni
          ushlaydi — har bosqichda alohida tekshirish shart emas.
        </li>
        <li>
          <code>Promise.all</code> — bir-biriga bog'liq bo'lmagan bir nechta
          asinxron amalni bir vaqtda (parallel) bajarib, tezlikni oshiradi.
        </li>
      </KeyPoints>
    </>
  )
}
