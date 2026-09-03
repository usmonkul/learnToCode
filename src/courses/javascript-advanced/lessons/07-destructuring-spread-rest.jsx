import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Destructuring, spread va rest operatorlari',
  section: "Massivlar va obyektlar: yangi imkoniyatlar",
}

export default function DestructuringSpreadRestLesson() {
  return (
    <>
      <p>
        14-darsda obyektning xususiyatiga <code>obyekt.xususiyat</code> orqali
        murojaat qilishni o'rgangan edingiz. Zamonaviy JavaScriptda buni tezroq va
        toza yozish uchun uchta bir-biriga bog'liq vosita bor:{' '}
        <strong>destructuring</strong> (qismlarga ajratish), <strong>spread</strong>{' '}
        (<code>...</code> — "yoyish") va <strong>rest</strong> (<code>...</code> —
        "qolganlarini yig'ish"). Bular React kabi zamonaviy kutubxonalarning
        kodida deyarli har bir qatorda uchraydi, shuning uchun ularni chuqur
        bilish keyingi darslar uchun ham muhim.
      </p>

      <h2>Obyekt destructuring — xususiyatlarni o'zgaruvchilarga ajratish</h2>
      <p>
        Obyektdan bir nechta xususiyatni alohida-alohida o'qish o'rniga, ularni
        bitta qatorda o'zgaruvchilarga "ajratib olish" mumkin:
      </p>
      <CodeBlock lang="javascript">{`const foydalanuvchi = { ism: "Aziz", yosh: 25, shahar: "Toshkent" }

// Eski usul:
const ism1 = foydalanuvchi.ism
const yosh1 = foydalanuvchi.yosh

// Destructuring bilan — bitta qatorda:
const { ism, yosh, shahar } = foydalanuvchi

console.log(ism, yosh, shahar) // "Aziz" 25 "Toshkent"`}</CodeBlock>
      <p>
        O'zgaruvchi nomi obyekt xususiyati nomiga <strong>aynan mos kelishi</strong>{' '}
        kerak. Agar boshqa nom bilan saqlash kerak bo'lsa, <code>:</code> orqali
        qayta nomlash mumkin:
      </p>
      <CodeBlock lang="javascript">{`const { ism: foydalanuvchiIsmi } = foydalanuvchi
console.log(foydalanuvchiIsmi) // "Aziz"`}</CodeBlock>
      <p>Standart qiymat ham berish mumkin — agar xususiyat mavjud bo'lmasa ishlatiladi:</p>
      <CodeBlock lang="javascript">{`const { davlat = "O'zbekiston" } = foydalanuvchi
console.log(davlat) // "O'zbekiston" — obyektda "davlat" yo'q, standart qiymat ishlatildi`}</CodeBlock>

      <h2>Funksiya parametrlarida destructuring — real foydasi</h2>
      <p>
        Destructuringning eng ko'p ishlatiladigan joyi — funksiya parametrlari.
        Obyekt qabul qiladigan funksiyani ancha o'qish oson qilib yozish mumkin:
      </p>
      <CodeBlock lang="javascript">{`// Destructuringsiz:
function kartochkaChiqar(mahsulot) {
  console.log(mahsulot.nom + " — " + mahsulot.narx + " so'm")
}

// Destructuring bilan — parametrning o'zida ajratib olamiz:
function kartochkaChiqar({ nom, narx }) {
  console.log(nom + " — " + narx + " so'm")
}

kartochkaChiqar({ nom: "Noutbuk", narx: 8000000 }) // "Noutbuk — 8000000 so'm"`}</CodeBlock>
      <p>
        Bu naqsh ayniqsa <code>fetch</code>dan (13-darsda o'rganamiz) kelgan API
        javoblarini qayta ishlashda va React'da propslarni qabul qilishda doimiy
        ishlatiladi — shuning uchun uni hozirdan mustahkam o'zlashtirib olish
        foydali.
      </p>

      <h2>Massiv destructuring</h2>
      <p>
        Massivlar ham xuddi shunday, lekin nom o'rniga <strong>tartib</strong>{' '}
        (pozitsiya) bo'yicha ajratiladi:
      </p>
      <CodeBlock lang="javascript">{`const koordinatalar = [41.3, 69.2]
const [kenglik, uzunlik] = koordinatalar

console.log(kenglik, uzunlik) // 41.3 69.2`}</CodeBlock>
      <p>
        Bu — ikkita o'zgaruvchining qiymatini almashtirish (swap) uchun eng qulay
        usul, vaqtinchalik uchinchi o'zgaruvchisiz:
      </p>
      <CodeBlock lang="javascript">{`let a = 5
let b = 10

;[a, b] = [b, a]

console.log(a, b) // 10 5`}</CodeBlock>

      <h2>Spread (...) — yoyish</h2>
      <p>
        Spread operatori (<code>...</code>) massiv yoki obyektning{' '}
        <strong>barcha elementlarini "yoyib"</strong> boshqa massiv/obyekt ichiga
        yoki funksiya argumentlariga qo'yadi. Eng ko'p ishlatiladigan holat —
        massiv/obyektni <strong>o'zgartirmasdan nusxa olish</strong>:
      </p>
      <CodeBlock lang="javascript">{`const asliyMassiv = [1, 2, 3]
const nusxa = [...asliyMassiv]

nusxa.push(4)
console.log(asliyMassiv) // [1, 2, 3] — o'zgarmadi
console.log(nusxa)       // [1, 2, 3, 4]`}</CodeBlock>
      <p>
        Bu — 8-darsda o'rgangan <code>const</code> qoidasiga to'g'ridan-to'g'ri
        bog'liq: massivni "o'zgartirmasdan yangilash" kerak bo'lganda (React va
        zamonaviy state boshqaruvida majburiy qoida), spread bilan avval nusxa
        olib, keyin o'zgartiriladi:
      </p>
      <CodeBlock lang="javascript">{`const vazifalar = [
  { id: 1, matn: "Non", bajarildi: false },
  { id: 2, matn: "Kod", bajarildi: false },
]

// Yangi vazifani qo'shib, YANGI massiv yaratamiz (asl massivni o'zgartirmasdan):
const yangiVazifalar = [...vazifalar, { id: 3, matn: "Sport", bajarildi: false }]

console.log(vazifalar.length)       // 2 — o'zgarmadi
console.log(yangiVazifalar.length)  // 3`}</CodeBlock>
      <p>Obyektlarda ham xuddi shunday ishlaydi — mavjud xususiyatlarni saqlab, faqat kerakli qismini yangilash:</p>
      <CodeBlock lang="javascript">{`const foydalanuvchi = { ism: "Aziz", yosh: 25, shahar: "Toshkent" }

const yangilanganFoydalanuvchi = { ...foydalanuvchi, yosh: 26 }

console.log(yangilanganFoydalanuvchi) // { ism: "Aziz", yosh: 26, shahar: "Toshkent" }
console.log(foydalanuvchi.yosh)       // 25 — asl obyekt o'zgarmadi`}</CodeBlock>
      <Callout type="tip" title="Diqqat qiling: keyin yozilgan xususiyat ustunlik qiladi">
        <code>{'{ ...foydalanuvchi, yosh: 26 }'}</code> — avval barcha eski
        xususiyatlar "yoyiladi", keyin <code>yosh: 26</code> ularning ustidan
        yoziladi. Agar <code>yosh: 26</code> birinchi, <code>...foydalanuvchi</code>{' '}
        keyin yozilsa, natija teskari bo'lardi — spreadning tartibi muhim.
      </Callout>
      <Quiz
        question="const a = { x: 1, y: 2 }; const b = { ...a, y: 5, z: 3 }; console.log(b) nima chiqaradi?"
        options={['{ x: 1, y: 2 }', '{ x: 1, y: 5, z: 3 }', '{ y: 5, z: 3 }', 'Xatolik beradi']}
        correctIndex={1}
        explanation="...a orqali x: 1 va y: 2 yoyiladi, keyin y: 5 uni qayta yozadi (ustunlik qiladi), z: 3 esa yangi xususiyat sifatida qo'shiladi. Natija: { x: 1, y: 5, z: 3 }."
      />

      <h2>Rest (...) — qolganlarini yig'ish</h2>
      <p>
        Rest operatori tashqi ko'rinishi bo'yicha spread bilan bir xil (
        <code>...</code>), lekin{' '}
        <strong>teskari ishlaydi</strong> — u alohida qiymatlarni bitta massiv
        yoki obyektga "yig'adi". Funksiya parametrlarida — noma'lum sondagi
        argumentlarni qabul qilish uchun ishlatiladi:
      </p>
      <CodeBlock lang="javascript">{`function jamlash(...sonlar) {
  return sonlar.reduce((jami, son) => jami + son, 0)
}

console.log(jamlash(1, 2, 3))       // 6
console.log(jamlash(10, 20, 30, 40)) // 100 — istalgan sondagi argument`}</CodeBlock>
      <p>Destructuring bilan birga ham ishlatiladi — "birinchisini olib, qolganini yig'ish":</p>
      <CodeBlock lang="javascript">{`const [birinchi, ...qolganlar] = [10, 20, 30, 40]

console.log(birinchi)  // 10
console.log(qolganlar) // [20, 30, 40]`}</CodeBlock>
      <CodeBlock lang="javascript">{`const { ism, ...boshqaMalumotlar } = { ism: "Aziz", yosh: 25, shahar: "Toshkent" }

console.log(ism)             // "Aziz"
console.log(boshqaMalumotlar) // { yosh: 25, shahar: "Toshkent" }`}</CodeBlock>
      <Callout type="warning" title="spread va rest bir xil belgi, lekin qarama-qarshi ma'no">
        Farqni kontekstdan bilib olasiz: agar <code>...</code> mavjud
        massiv/obyektni "ochib" boshqasiga qo'yayotgan bo'lsa — bu{' '}
        <strong>spread</strong>. Agar u yangi o'zgaruvchi/parametrni e'lon
        qilayotgan bo'lib, "qolganlarini shu yerga yig'" deb turgan bo'lsa — bu{' '}
        <strong>rest</strong>.
      </Callout>

      <h2>Amaliy misol: to-do loyihasida vazifani yangilash</h2>
      <p>
        19-darsdagi to-do loyihasida vazifani "bajarildi" qilib belgilash uchun{' '}
        <code>for</code> tsikli ichida massiv elementiga to'g'ridan-to'g'ri
        murojaat qilingan edi. Endi buni <code>map</code> + spread bilan, asl
        massivni o'zgartirmasdan yozamiz:
      </p>
      <CodeBlock lang="javascript">{`let vazifalar = [
  { id: 1, matn: "Non sotib olish", bajarildi: false },
  { id: 2, matn: "Kod yozish", bajarildi: false },
]

function vazifaniBelgilash(id) {
  vazifalar = vazifalar.map((vazifa) =>
    vazifa.id === id ? { ...vazifa, bajarildi: !vazifa.bajarildi } : vazifa
  )
}

vazifaniBelgilash(1)
console.log(vazifalar[0].bajarildi) // true — faqat shu vazifa o'zgardi, boshqalar aynan shu holicha qoldi`}</CodeBlock>
      <p>
        Bu naqsh — <code>id</code> mos kelgan elementga yangi obyekt (
        <code>{'{ ...vazifa, bajarildi: ... }'}</code>) yasab, mos kelmagan
        elementlarni o'zgartirmasdan qoldirish — React kabi kutubxonalarda "state"
        ni yangilashning standart usuli.
      </p>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Obyektdan kerakli maydonlarni ajrating">
        <p>
          <code>{'{ nom: "Noutbuk", narx: 8000000, brend: "Dell", rang: "kulrang" }'}</code>{' '}
          obyektidan destructuring yordamida faqat <code>nom</code> va{' '}
          <code>narx</code>ni alohida o'zgaruvchilarga ajrating.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const mahsulot = { nom: "Noutbuk", narx: 8000000, brend: "Dell", rang: "kulrang" }
const { nom, narx } = mahsulot

console.log(nom, narx) // "Noutbuk" 8000000`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Massivga elementni o'zgartirmasdan qo'shish">
        <p>
          <code>{'["olma", "nok"]'}</code> massiviga spread yordamida{' '}
          <code>"uzum"</code>ni qo'shib, <strong>yangi</strong> massiv yarating (
          asl massiv o'zgarmasin).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const mevalar = ["olma", "nok"]
const yangiMevalar = [...mevalar, "uzum"]

console.log(mevalar)      // ["olma", "nok"]
console.log(yangiMevalar) // ["olma", "nok", "uzum"]`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Istalgan sondagi sonlarning eng kattasi">
        <p>
          Rest operatoridan foydalanib <code>engKatta(...sonlar)</code> funksiyasi
          yozing — u istalgan sondagi argument qabul qilib, eng katta sonni
          qaytaradi (<code>Math.max</code>ni spread bilan birga ishlating:{' '}
          <code>{'Math.max(...sonlar)'}</code>).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function engKatta(...sonlar) {
  return Math.max(...sonlar)
}

console.log(engKatta(4, 19, 7, 25, 3)) // 25`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Foydalanuvchi profilini yangilash">
        <p>
          <code>{'{ ism: "Vali", yosh: 22, shahar: "Andijon" }'}</code> obyektidan
          spread yordamida faqat <code>shahar</code>ni <code>"Farg'ona"</code>ga
          o'zgartirgan <strong>yangi</strong> obyekt yarating (qolgan
          xususiyatlar saqlanib qolsin).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const foydalanuvchi = { ism: "Vali", yosh: 22, shahar: "Andijon" }
const yangilangan = { ...foydalanuvchi, shahar: "Farg'ona" }

console.log(yangilangan) // { ism: "Vali", yosh: 22, shahar: "Farg'ona" }`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Obyekt/massiv destructuring — xususiyat yoki elementlarni bitta
          qatorda o'zgaruvchilarga ajratib olish usuli, standart qiymat va qayta
          nomlashni ham qo'llab-quvvatlaydi.
        </li>
        <li>
          Spread (<code>...massiv</code> yoki <code>...obyekt</code>) mavjud
          massiv/obyektni "yoyib", <strong>yangi nusxa</strong> yasaydi — asl
          qiymatni o'zgartirmasdan yangilash uchun eng ko'p ishlatiladigan usul.
        </li>
        <li>
          Rest (funksiya parametrida yoki destructuringda <code>...qolganlar</code>
          ) — bir nechta qiymatni bitta massiv/obyektga "yig'adi".
        </li>
        <li>
          <code>{'{ ...obyekt, xususiyat: yangiQiymat }'}</code> naqshi — obyektni
          o'zgartirmasdan, faqat bitta xususiyatini yangilangan nusxasini yaratish
          uchun standart uslub.
        </li>
      </KeyPoints>
    </>
  )
}
