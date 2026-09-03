import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'find, some, every va sort',
  section: "Massivlar va obyektlar: yangi imkoniyatlar",
}

export default function ArrayQidirishTekshirishLesson() {
  return (
    <>
      <p>
        O'tgan darsda massivni <strong>o'zgartirish</strong> (<code>map</code>) va{' '}
        <strong>saralash</strong> (<code>filter</code>) metodlarini ko'rdik. Bu
        darsda massivdan <strong>bitta elementni topish</strong>,{' '}
        <strong>shartni tekshirish</strong> va <strong>tartiblash</strong> uchun
        ishlatiladigan metodlarni o'rganamiz — bular real loyihalarda, masalan, "ID
        bo'yicha mahsulotni topish" yoki "narx bo'yicha tartiblash" kabi kundalik
        vazifalarda ishlatiladi.
      </p>

      <h2>find — birinchi mos elementni topish</h2>
      <p>
        <code>find</code> — shartga mos kelgan <strong>birinchi</strong> elementning
        o'zini (massiv emas!) qaytaradi, topilmasa — <code>undefined</code>:
      </p>
      <CodeBlock lang="javascript">{`const foydalanuvchilar = [
  { id: 1, ism: "Aziz" },
  { id: 2, ism: "Malika" },
  { id: 3, ism: "Vali" },
]

const foydalanuvchi = foydalanuvchilar.find((f) => f.id === 2)
console.log(foydalanuvchi) // { id: 2, ism: "Malika" }

const topilmadi = foydalanuvchilar.find((f) => f.id === 99)
console.log(topilmadi) // undefined`}</CodeBlock>
      <Callout type="note" title="find vs filter — muhim farq">
        <code>filter</code> har doim <strong>massiv</strong> qaytaradi (hatto bitta
        ham mos element topilmasa, bo'sh massiv <code>[]</code>). <code>find</code>{' '}
        esa <strong>bitta obyekt</strong> (yoki <code>undefined</code>) qaytaradi.
        ID bo'yicha bitta narsani qidirganda — <code>find</code>, ro'yxatni
        saralashda — <code>filter</code> ishlatiladi.
      </Callout>
      <p>
        Real misol — 19-darsdagi to-do loyihasida vazifani ID bo'yicha topish
        endi bir qatorda:
      </p>
      <CodeBlock lang="javascript">{`const vazifalar = [
  { id: 1, matn: "Non sotib olish", bajarildi: false },
  { id: 2, matn: "Kod yozish", bajarildi: true },
]

function vazifaniTop(id) {
  return vazifalar.find((vazifa) => vazifa.id === id)
}

console.log(vazifaniTop(2)) // { id: 2, matn: "Kod yozish", bajarildi: true }`}</CodeBlock>

      <h2>findIndex — mos elementning o'rnini (index) topish</h2>
      <p>
        Ba'zan elementning o'zi emas, uning massivdagi <strong>o'rni</strong>{' '}
        kerak bo'ladi (masalan, keyin o'sha o'rindagi qiymatni yangilash uchun):
      </p>
      <CodeBlock lang="javascript">{`const orin = vazifalar.findIndex((vazifa) => vazifa.id === 2)
console.log(orin) // 1 — massivdagi indeks (0dan boshlab)

const topilmadiOrin = vazifalar.findIndex((vazifa) => vazifa.id === 99)
console.log(topilmadiOrin) // -1 — topilmasa -1 qaytadi`}</CodeBlock>

      <h2>some va every — bo'lish/bo'lmasligini tekshirish</h2>
      <p>
        <code>some</code> — massivda <strong>hech bo'lmasa bitta</strong> element
        shartga mos kelsa <code>true</code> qaytaradi:
      </p>
      <CodeBlock lang="javascript">{`const savat = [
  { nom: "Noutbuk", narx: 8000000 },
  { nom: "Sichqoncha", narx: 150000 },
]

const qimmatMahsulotBorMi = savat.some((mahsulot) => mahsulot.narx > 5000000)
console.log(qimmatMahsulotBorMi) // true — Noutbuk shartga mos`}</CodeBlock>
      <p>
        <code>every</code> — massivning <strong>barcha</strong> elementlari
        shartga mos kelsagina <code>true</code> qaytaradi:
      </p>
      <CodeBlock lang="javascript">{`const barchasiArzonmi = savat.every((mahsulot) => mahsulot.narx < 1000000)
console.log(barchasiArzonmi) // false — Noutbuk 1 milliondan qimmat`}</CodeBlock>
      <p>
        Bu ikkalasi real forma validatsiyasida juda foydali — masalan, "barcha
        maydonlar to'ldirilganmi" yoki "kamida bitta checkbox belgilanganmi"ni
        tekshirish uchun:
      </p>
      <CodeBlock lang="javascript">{`const inputlar = document.querySelectorAll(".majburiy-maydon")

const tugmaniYoqish = () => {
  const barchasiToliq = Array.from(inputlar).every((input) => input.value.trim() !== "")
  yuborishTugmasi.disabled = !barchasiToliq
}

inputlar.forEach((input) => input.addEventListener("input", tugmaniYoqish))`}</CodeBlock>
      <Callout type="tip" title="Array.from — NodeList'ni haqiqiy massivga aylantirish">
        <code>querySelectorAll</code> haqiqiy massiv emas, <strong>NodeList</strong>{' '}
        qaytaradi. <code>forEach</code> NodeList'da ham ishlaydi, lekin{' '}
        <code>every</code>/<code>some</code>/<code>map</code>/<code>filter</code>ning
        ba'zi eski brauzerlarda NodeList bilan ishlamasligi mumkin — shuning uchun{' '}
        <code>Array.from(nodeList)</code> bilan avval haqiqiy massivga aylantirish
        xavfsiz odat. Keyingi bo'limda NodeList haqida chuqurroq gaplashamiz.
      </Callout>
      <Quiz
        question="[3, 7, 12, 5].some(son => son > 10) va [3, 7, 12, 5].every(son => son > 10) mos ravishda nima qaytaradi?"
        options={['true, true', 'false, false', 'true, false', 'false, true']}
        correctIndex={2}
        explanation="12 soni 10dan katta, shuning uchun 'hech bo'lmasa bittasi' shartga mos — some true qaytaradi. Lekin barcha sonlar 10dan katta emas (3, 7, 5), shuning uchun every false qaytaradi."
      />

      <h2>sort — massivni tartiblash</h2>
      <p>
        <code>sort</code> — massivni <strong>o'z joyida</strong> (in-place, ya'ni
        asl massivning o'zini) tartiblaydi. Sonlar bilan ishlatilganda ehtiyot
        bo'lish kerak:
      </p>
      <CodeBlock lang="javascript">{`const sonlar = [40, 5, 100, 25]

console.log(sonlar.sort()) // [100, 25, 40, 5] — noto'g'ri!`}</CodeBlock>
      <Callout type="warning" title="sort() sukut bo'yicha sonlarni matn kabi solishtiradi">
        Argumentsiz <code>sort()</code> elementlarni <strong>matn</strong>{' '}
        sifatida solishtiradi ("100" &lt; "25", chunki "1" &lt; "2"). To'g'ri son
        bo'yicha tartiblash uchun <strong>comparator funksiya</strong> berish
        shart.
      </Callout>
      <CodeBlock lang="javascript">{`const sonlar = [40, 5, 100, 25]

sonlar.sort((a, b) => a - b) // o'sish tartibida
console.log(sonlar) // [5, 25, 40, 100]

sonlar.sort((a, b) => b - a) // kamayish tartibida
console.log(sonlar) // [100, 40, 25, 5]`}</CodeBlock>
      <p>
        Comparator funksiya mantiqi: agar u <strong>manfiy</strong> son qaytarsa,{' '}
        <code>a</code> — <code>b</code>dan oldin turadi; <strong>musbat</strong>{' '}
        qaytarsa — <code>b</code> oldin turadi. <code>a - b</code> — o'sish
        tartibi uchun eng ko'p ishlatiladigan qisqa yozuv.
      </p>
      <p>Obyektlar massivini biror xususiyat bo'yicha tartiblash ham xuddi shunday ishlaydi — masalan, mahsulotlarni narx bo'yicha:</p>
      <CodeBlock lang="javascript">{`const mahsulotlar = [
  { nom: "Monitor", narx: 2500000 },
  { nom: "Sichqoncha", narx: 150000 },
  { nom: "Noutbuk", narx: 8000000 },
]

mahsulotlar.sort((a, b) => a.narx - b.narx)
console.log(mahsulotlar.map((m) => m.nom)) // ["Sichqoncha", "Monitor", "Noutbuk"]`}</CodeBlock>
      <Callout type="note" title="sort asl massivni o'zgartiradi">
        <code>map</code>/<code>filter</code>dan farqli o'laroq, <code>sort</code>{' '}
        asl massivni <strong>joyida</strong> o'zgartiradi (mutate qiladi). Agar asl
        massivni saqlab qolish kerak bo'lsa, avval nusxasini oling:{' '}
        <code>[...massiv].sort(...)</code> (spread operatorini keyingi darsda
        chuqur o'rganamiz).
      </Callout>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Email bo'yicha foydalanuvchini topish">
        <p>
          <code>{'[{ email: "aziz@mail.uz", ism: "Aziz" }, { email: "vali@mail.uz", ism: "Vali" }]'}</code>{' '}
          massividan <code>find</code> yordamida <code>"vali@mail.uz"</code> emailli
          foydalanuvchini toping.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const foydalanuvchilar = [
  { email: "aziz@mail.uz", ism: "Aziz" },
  { email: "vali@mail.uz", ism: "Vali" },
]

const topilgan = foydalanuvchilar.find((f) => f.email === "vali@mail.uz")
console.log(topilgan) // { email: "vali@mail.uz", ism: "Vali" }`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Barcha mahsulotlar omborda bormi?">
        <p>
          <code>{'[{ nom: "Kitob", ombordaSoni: 5 }, { nom: "Ruchka", ombordaSoni: 0 }]'}</code>{' '}
          massivida <code>every</code> yordamida barcha mahsulotlar omborda
          borligini (soni 0dan katta) tekshiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const mahsulotlar = [
  { nom: "Kitob", ombordaSoni: 5 },
  { nom: "Ruchka", ombordaSoni: 0 },
]

const barchasiOmbordami = mahsulotlar.every((m) => m.ombordaSoni > 0)
console.log(barchasiOmbordami) // false — Ruchka tugagan`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Talabalarni ball bo'yicha kamayish tartibida">
        <p>
          <code>{'[{ ism: "Aziz", ball: 70 }, { ism: "Vali", ball: 95 }, { ism: "Malika", ball: 82 }]'}</code>{' '}
          massivini <code>ball</code> bo'yicha eng yuqoridan pastga tartiblang (
          <code>sort</code> ishlatib).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const talabalar = [
  { ism: "Aziz", ball: 70 },
  { ism: "Vali", ball: 95 },
  { ism: "Malika", ball: 82 },
]

talabalar.sort((a, b) => b.ball - a.ball)
console.log(talabalar.map((t) => t.ism)) // ["Vali", "Malika", "Aziz"]`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Formani tekshirish (some/every)">
        <p>
          HTML: uchta <code>{'<input class="maydon" required />'}</code>. Barcha
          maydonlar to'ldirilgan bo'lsa konsolga <code>"Tayyor"</code>, aks holda{' '}
          <code>"To'ldirilmagan maydonlar bor"</code> chiqaradigan tugma bosish
          hodisasi yozing (<code>Array.from</code> va <code>every</code>{' '}
          ishlating).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const tugma = document.getElementById("yuborishTugmasi")
const maydonlar = document.querySelectorAll(".maydon")

tugma.addEventListener("click", () => {
  const barchasiToliq = Array.from(maydonlar).every((maydon) => maydon.value.trim() !== "")

  console.log(barchasiToliq ? "Tayyor" : "To'ldirilmagan maydonlar bor")
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>find</code> — shartga mos <strong>birinchi elementning o'zini</strong>{' '}
          qaytaradi (yoki <code>undefined</code>); <code>findIndex</code> — uning
          o'rnini (yoki <code>-1</code>).
        </li>
        <li>
          <code>some</code> — hech bo'lmasa bitta element shartga mos kelsa{' '}
          <code>true</code>; <code>every</code> — barcha elementlar mos kelsagina{' '}
          <code>true</code>.
        </li>
        <li>
          <code>sort</code> sukut bo'yicha matn sifatida solishtiradi — sonlar
          uchun comparator funksiya (<code>(a, b) {'=>'} a - b</code>) shart.
        </li>
        <li>
          <code>sort</code> asl massivni joyida o'zgartiradi (mutate) —{' '}
          <code>map</code>/<code>filter</code>/<code>find</code>dan farqli
          o'laroq.
        </li>
        <li>
          <code>querySelectorAll</code>dan qaytgan NodeList'ni{' '}
          <code>Array.from()</code> bilan haqiqiy massivga aylantirib, undan
          keyin barcha massiv metodlarini xavfsiz ishlatish mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
