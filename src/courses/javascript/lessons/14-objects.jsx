import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Obyektlar (objects)',
  section: 'Obyektlar',
}

export default function ObjectsLesson() {
  return (
    <>
      <p>
        Massiv tartiblangan ro'yxat uchun juda qulay, lekin real hayotdagi narsalarni
        (masalan, bitta odam, bitta mahsulot) tasvirlash uchun ko'pincha nomlangan
        xususiyatlar (properties) kerak bo'ladi — "ism", "yosh", "narx" kabi. Aynan shu
        uchun <strong>obyekt</strong> (object) ishlatiladi — u qiymatlarni indeks emas,{' '}
        <strong>kalit</strong> (key) orqali saqlaydi.
      </p>

      <h2>Obyekt yaratish</h2>
      <p>
        Obyekt figurali qavs <code>{'{ }'}</code> ichida, <code>kalit: qiymat</code>{' '}
        juftliklari vergul bilan ajratib yoziladi:
      </p>
      <CodeBlock lang="javascript">{`let talaba = {
  ism: "Aziz",
  yosh: 22,
  aloqachi: false
}

console.log(talaba) // { ism: "Aziz", yosh: 22, aloqachi: false }`}</CodeBlock>
      <p>
        Har bir <code>kalit</code> — bu xususiyatning nomi (odatda matn, lekin qo'shtirnoqsiz
        yoziladi), <code>qiymat</code> esa istalgan turdagi ma'lumot bo'lishi mumkin — matn,
        son, boolean, massiv, hatto boshqa obyekt.
      </p>

      <h2>Xususiyatlarni o'qish: nuqta va kvadrat qavs</h2>
      <p>
        Obyektning xususiyatiga ikki xil usulda murojaat qilish mumkin — <strong>nuqta
        notatsiyasi</strong> (dot notation) va <strong>kvadrat qavs notatsiyasi</strong>{' '}
        (bracket notation):
      </p>
      <CodeBlock lang="javascript">{`let talaba = { ism: "Aziz", yosh: 22 }

console.log(talaba.ism)      // "Aziz" — nuqta orqali
console.log(talaba["yosh"])  // 22     — kvadrat qavs orqali`}</CodeBlock>
      <p>
        Amaliyotda nuqta notatsiyasi ko'proq ishlatiladi — u qisqaroq va o'qish uchun
        qulayroq. Lekin kvadrat qavs kerak bo'ladigan holatlar bor:
      </p>
      <ul>
        <li>Kalit nomi o'zgaruvchida saqlangan bo'lsa (dinamik kalit)</li>
        <li>Kalit nomida bo'sh joy yoki maxsus belgi bo'lsa</li>
      </ul>
      <CodeBlock lang="javascript">{`let talaba = { ism: "Aziz", yosh: 22 }
let kalit = "ism"

console.log(talaba[kalit]) // "Aziz" — kalit o'zgaruvchidan olinadi
// console.log(talaba.kalit) // XATO MANTIQ: bu talaba.kalit (mavjud emas) deb qidiradi`}</CodeBlock>
      <Callout type="warning" title="Mavjud bo'lmagan xususiyat">
        Agar mavjud bo'lmagan xususiyatga murojaat qilsangiz, xatolik bermaydi —{' '}
        <code>undefined</code> qaytadi. Xuddi massivning mavjud bo'lmagan indeksi kabi.
      </Callout>

      <h2>Xususiyatni o'zgartirish va qo'shish</h2>
      <p>
        Mavjud xususiyatni yangilash yoki umuman yangi xususiyat qo'shish uchun oddiy
        tayinlash (<code>=</code>) yetarli:
      </p>
      <CodeBlock lang="javascript">{`let talaba = { ism: "Aziz", yosh: 22 }

talaba.yosh = 23        // mavjud xususiyatni yangilash
talaba.shahar = "Toshkent" // yangi xususiyat qo'shish

console.log(talaba) // { ism: "Aziz", yosh: 23, shahar: "Toshkent" }`}</CodeBlock>

      <h2>
        <code>delete</code> — xususiyatni o'chirish
      </h2>
      <p>
        <code>delete</code> kaliti obyektdan xususiyatni butunlay olib tashlaydi:
      </p>
      <CodeBlock lang="javascript">{`let talaba = { ism: "Aziz", yosh: 22, shahar: "Toshkent" }

delete talaba.shahar
console.log(talaba) // { ism: "Aziz", yosh: 22 }`}</CodeBlock>
      <Quiz
        question={`let mahsulot = { nomi: "Kitob", narx: 25000 }. mahsulot["narx"] nimaga teng bo'ladi?`}
        options={['"narx"', '25000', 'undefined', "Xatolik yuz beradi"]}
        correctIndex={1}
        explanation={`Kvadrat qavs notatsiyasi ham nuqta notatsiyasi kabi xususiyat qiymatini qaytaradi — mahsulot["narx"] va mahsulot.narx bir xil natija beradi: 25000.`}
      />

      <h2>
        <code>typeof</code> va obyektni tekshirish
      </h2>
      <p>
        <code>typeof</code> obyekt uchun <code>"object"</code> qaytaradi (2-darsda
        ko'rganingizdek, qiziq tomoni — <code>typeof null</code> ham{' '}
        <code>"object"</code> qaytaradi, ammo <code>null</code> obyekt emas):
      </p>
      <CodeBlock lang="javascript">{`let talaba = { ism: "Aziz" }
console.log(typeof talaba) // "object"`}</CodeBlock>

      <h2>Obyekt ichida obyekt (nested)</h2>
      <p>
        Obyektning qiymati o'zi ham obyekt yoki massiv bo'lishi mumkin. Ichma-ich
        xususiyatlarga bir necha nuqta bilan murojaat qilinadi:
      </p>
      <CodeBlock lang="javascript">{`let talaba = {
  ism: "Aziz",
  manzil: {
    shahar: "Toshkent",
    kocha: "Amir Temur"
  },
  fanlar: ["Matematika", "Fizika"]
}

console.log(talaba.manzil.shahar) // "Toshkent"
console.log(talaba.fanlar[0])     // "Matematika"`}</CodeBlock>

      <h2>Obyekt vs massiv — qachon nimani ishlatish kerak</h2>
      <p>
        Tartiblangan, bir xil turdagi qiymatlar ro'yxati kerak bo'lsa (masalan, "barcha
        talabalar ismlari") — <strong>massiv</strong>. Bitta narsaning turli
        xususiyatlarini nomlab saqlash kerak bo'lsa (masalan, "bitta talabaning ismi,
        yoshi, shahri") — <strong>obyekt</strong>. Ko'pincha ikkalasi birgalikda
        ishlatiladi: obyektlar massivi (masalan, talabalar ro'yxati, har biri o'z
        xususiyatlariga ega).
      </p>
      <CodeBlock lang="javascript">{`let talabalar = [
  { ism: "Aziz", yosh: 22 },
  { ism: "Vali", yosh: 24 }
]

console.log(talabalar[0].ism) // "Aziz"
console.log(talabalar[1].yosh) // 24`}</CodeBlock>
      <Quiz
        question="Bitta mahsulotning nomi, narxi va soni kabi bir necha xususiyatini birga saqlash uchun eng mos ma'lumot turi qaysi?"
        options={['Massiv', 'Obyekt', 'String', 'Boolean']}
        correctIndex={1}
        explanation="Nomlangan xususiyatlar to'plamini (nomi, narxi, soni) saqlash uchun obyekt eng mos — har bir qiymat o'z kaliti bilan aniq belgilanadi."
      />

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Mahsulot obyekti">
        <p>
          <code>nomi</code>, <code>narx</code> va <code>miqdor</code> xususiyatlariga ega{' '}
          <code>mahsulot</code> obyektini yarating. <code>nomi</code> va{' '}
          <code>narx</code>ni alohida-alohida <code>console.log()</code> bilan chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let mahsulot = {
  nomi: "Noutbuk",
  narx: 8500000,
  miqdor: 5
}

console.log(mahsulot.nomi)
console.log(mahsulot.narx)`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Narxni yangilash va xususiyat qo'shish">
        <p>
          Yuqoridagi <code>mahsulot</code> obyektining <code>narx</code>ini{' '}
          <code>7900000</code>ga o'zgartiring, so'ng unga <code>chegirma</code> (boolean)
          degan yangi xususiyat qo'shing va butun obyektni <code>console.log()</code> bilan
          chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let mahsulot = { nomi: "Noutbuk", narx: 8500000, miqdor: 5 }

mahsulot.narx = 7900000
mahsulot.chegirma = true

console.log(mahsulot)`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Xususiyatni o'chirish">
        <p>
          <code>{'let foydalanuvchi = { ism: "Malika", parol: "12345", email: "malika@mail.uz" }'}</code>{' '}
          obyekti bor. Xavfsizlik uchun <code>parol</code> xususiyatini <code>delete</code>{' '}
          bilan o'chiring va qolgan obyektni <code>console.log()</code> bilan chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let foydalanuvchi = { ism: "Malika", parol: "12345", email: "malika@mail.uz" }

delete foydalanuvchi.parol
console.log(foydalanuvchi) // { ism: "Malika", email: "malika@mail.uz" }`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Profilni HTML da ko'rsatish">
        <p>
          HTML: <code>{'<p id="natija"></p>'}</code>.{' '}
          <code>{'let talaba = { ism: "Sardor", yosh: 20, shahar: "Samarqand" }'}</code>{' '}
          obyekti bor. Uning barcha ma'lumotlarini bitta matn qilib (masalan, "Sardor, 20
          yosh, Samarqand") <code>natija</code>ga <code>.textContent</code> orqali chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let talaba = { ism: "Sardor", yosh: 20, shahar: "Samarqand" }
let natijaElement = document.getElementById("natija")

natijaElement.textContent = \`\${talaba.ism}, \${talaba.yosh} yosh, \${talaba.shahar}\``}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="5-vazifa: Inputdan obyekt yaratish">
        <p>
          HTML: <code>{'<input type="text" id="ismInput" />'}</code>,{' '}
          <code>{'<input type="number" id="yoshInput" />'}</code>,{' '}
          <code>{'<button id="saqlaTugmasi">Saqlash</button>'}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. Tugma bosilganda ikkala inputning{' '}
          <code>.value</code>sidan foydalanib yangi <code>{'{ ism, yosh }'}</code> obyekti
          yarating (yoshni <code>Number()</code>ga aylantiring) va uni{' '}
          <code>natija</code>ga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let ismInput = document.getElementById("ismInput")
let yoshInput = document.getElementById("yoshInput")
let saqlaTugmasi = document.getElementById("saqlaTugmasi")
let natijaElement = document.getElementById("natija")

saqlaTugmasi.onclick = function () {
  let foydalanuvchi = {
    ism: ismInput.value,
    yosh: Number(yoshInput.value)
  }

  natijaElement.textContent = \`\${foydalanuvchi.ism}, \${foydalanuvchi.yosh} yosh\`
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="6-vazifa: Obyektlar massivi — select orqali qidirish">
        <p>
          <code>{`let mahsulotlar = [
  { nomi: "Kitob", narx: 25000 },
  { nomi: "Daftar", narx: 8000 },
  { nomi: "Ruchka", narx: 3000 }
]`}</code>{' '}
          massivi bor. HTML: <code>{'<select id="mahsulotSelect">'}</code> ichida har bir
          mahsulot uchun <code>{'<option value="0">Kitob</option>'}</code> kabi variantlar
          (indekslari <code>value</code> sifatida), <code>{'<button id="korTugmasi">Narxini ko\'rsat</button>'}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. Tugma bosilganda tanlangan indeks bo'yicha
          mahsulotni topib, uning <code>nomi</code> va <code>narx</code>ini{' '}
          <code>natija</code>ga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let mahsulotlar = [
  { nomi: "Kitob", narx: 25000 },
  { nomi: "Daftar", narx: 8000 },
  { nomi: "Ruchka", narx: 3000 }
]

let mahsulotSelect = document.getElementById("mahsulotSelect")
let korTugmasi = document.getElementById("korTugmasi")
let natijaElement = document.getElementById("natija")

korTugmasi.onclick = function () {
  let index = Number(mahsulotSelect.value)
  let tanlangan = mahsulotlar[index]

  natijaElement.textContent = \`\${tanlangan.nomi}: \${tanlangan.narx} so'm\`
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Obyekt — <code>{'{ kalit: qiymat }'}</code> juftliklari to'plami; nomlangan
          xususiyatlarga ega bitta narsani tasvirlash uchun ishlatiladi.
        </li>
        <li>
          Xususiyatga <strong>nuqta notatsiyasi</strong> (<code>obyekt.kalit</code>) yoki{' '}
          <strong>kvadrat qavs</strong> (<code>{'obyekt["kalit"]'}</code>) orqali murojaat
          qilinadi; kvadrat qavs dinamik (o'zgaruvchidagi) kalitlar uchun kerak.
        </li>
        <li>
          Xususiyatni <code>=</code> orqali yangilash yoki qo'shish mumkin,{' '}
          <code>delete</code> orqali o'chirish mumkin.
        </li>
        <li>
          Mavjud bo'lmagan xususiyatga murojaat xatolik bermaydi —{' '}
          <code>undefined</code> qaytadi.
        </li>
        <li>
          Obyekt ichida obyekt yoki massiv bo'lishi mumkin (nested); obyektlar massivi —
          bir xil tuzilishdagi ko'p narsani (masalan, talabalar ro'yxati) saqlashning eng
          keng tarqalgan usuli.
        </li>
      </KeyPoints>
    </>
  )
}
