import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Massivlar (arrays)',
  section: 'Massivlar',
}

export default function ArraysLesson() {
  return (
    <>
      <p>
        Hozirgacha har bir qiymat uchun alohida o'zgaruvchi yaratdik: <code>mahsulot1</code>,{' '}
        <code>mahsulot2</code>, <code>mahsulot3</code>... Bir nechta bog'liq qiymatni (masalan,
        talabalar ro'yxati, mahsulotlar, haftaning kunlari) shu tarzda saqlash tezda
        boshqarib bo'lmaydigan holga keladi. Buning uchun <strong>massiv</strong> (array) —
        tartiblangan qiymatlar ro'yxatini bitta o'zgaruvchida saqlaydigan ma'lumot turi
        ishlatiladi.
      </p>

      <h2>Massiv yaratish</h2>
      <p>
        Massiv kvadrat qavs <code>{'[ ]'}</code> ichida, qiymatlarni vergul bilan ajratib
        yoziladi:
      </p>
      <CodeBlock lang="javascript">{`let mevalar = ["olma", "banan", "shaftoli"]
console.log(mevalar) // ["olma", "banan", "shaftoli"]`}</CodeBlock>
      <p>
        Massiv istalgan turdagi qiymatlarni saqlashi mumkin — matn, son, boolean, hatto
        boshqa massivni ham. Amaliyotda odatda bir xil turdagi qiymatlarni birga saqlash
        tavsiya etiladi, lekin JavaScript buni majburlamaydi:
      </p>
      <CodeBlock lang="javascript">{`let aralash = ["Aziz", 25, true]
console.log(aralash) // ["Aziz", 25, true]`}</CodeBlock>

      <h2>Indekslar — elementlarga murojaat qilish</h2>
      <p>
        Massivdagi har bir element o'zining <strong>indeksi</strong> (index) — tartib
        raqami — orqali olinadi. Juda muhim: indekslar <code>0</code>dan boshlanadi, ya'ni
        birinchi element indeksi <code>0</code>, ikkinchisi <code>1</code> va hokazo:
      </p>
      <CodeBlock lang="javascript">{`let mevalar = ["olma", "banan", "shaftoli"]

console.log(mevalar[0]) // "olma"    — birinchi element
console.log(mevalar[1]) // "banan"   — ikkinchi element
console.log(mevalar[2]) // "shaftoli" — uchinchi element`}</CodeBlock>
      <Callout type="warning" title="Mavjud bo'lmagan indeks">
        Agar massivda yo'q indeksga murojaat qilsangiz (masalan{' '}
        <code>{'mevalar[10]'}</code>, massivda faqat 3 ta element bo'lsa), JavaScript
        xatolik bermaydi — u shunchaki <code>undefined</code> qaytaradi.
      </Callout>

      <h2>
        <code>.length</code> — massivdagi elementlar soni
      </h2>
      <p>
        3-darsda matnlar uchun ko'rgan <code>.length</code> massivlar uchun ham ishlaydi —
        u massivdagi elementlar sonini qaytaradi:
      </p>
      <CodeBlock lang="javascript">{`let mevalar = ["olma", "banan", "shaftoli"]
console.log(mevalar.length) // 3`}</CodeBlock>
      <p>
        <code>.length</code>ning eng foydali qo'llanishlaridan biri — massivning{' '}
        <strong>oxirgi</strong> elementiga murojaat qilish. Oxirgi elementning indeksi har
        doim <code>{'length - 1'}</code>ga teng (chunki hisob <code>0</code>dan boshlanadi):
      </p>
      <CodeBlock lang="javascript">{`let mevalar = ["olma", "banan", "shaftoli"]
let oxirgiIndex = mevalar.length - 1
console.log(mevalar[oxirgiIndex]) // "shaftoli"`}</CodeBlock>
      <Quiz
        question={`let ranglar = ["qizil", "yashil", "ko'k"]. ranglar[ranglar.length - 1] nimaga teng bo'ladi?`}
        options={['"qizil"', '"yashil"', `"ko'k"`, 'undefined']}
        correctIndex={2}
        explanation={`ranglar.length 3ga teng, shuning uchun ranglar.length - 1 = 2 — bu oxirgi elementning ("ko'k") indeksi.`}
      />

      <h2>Elementni o'zgartirish</h2>
      <p>
        Massivning ma'lum indeksidagi qiymatini oddiy tayinlash (<code>=</code>) orqali
        yangilash mumkin:
      </p>
      <CodeBlock lang="javascript">{`let mevalar = ["olma", "banan", "shaftoli"]
mevalar[1] = "uzum"
console.log(mevalar) // ["olma", "uzum", "shaftoli"]`}</CodeBlock>

      <h2>Bo'sh massiv</h2>
      <p>Elementsiz, bo'sh massiv ham yaratish mumkin — odatda keyinroq to'ldirish uchun:</p>
      <CodeBlock lang="javascript">{`let boshMassiv = []
console.log(boshMassiv.length) // 0`}</CodeBlock>
      <Quiz
        question={`let sonlar = [10, 20, 30]. sonlar[5] ga murojaat qilinsa nima bo'ladi?`}
        options={[
          "Dastur xatolik beradi va to'xtaydi",
          'undefined qaytadi, xatolik bermaydi',
          'null qaytadi',
          "0 qaytadi"
        ]}
        correctIndex={1}
        explanation={`Massivda mavjud bo'lmagan indeksga murojaat qilinganda JavaScript xatolik bermaydi, shunchaki undefined qaytaradi.`}
      />

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Sevimli mevalar">
        <p>
          Kamida uchta meva nomidan iborat <code>sevimliMevalar</code> massivini yarating.
          Birinchi va oxirgi mevani (<code>.length</code>dan foydalanib) alohida-alohida{' '}
          <code>console.log()</code> bilan chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let sevimliMevalar = ["olma", "anor", "uzum"]

console.log(sevimliMevalar[0])
console.log(sevimliMevalar[sevimliMevalar.length - 1])`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Hafta kunini aniqlash">
        <p>
          <code>{'["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"]'}</code>{' '}
          massivini yarating. <code>prompt()</code> orqali "Necha-kun (1-7)?" deb so'rang,{' '}
          <code>Number()</code>ga aylantiring va mos kun nomini <code>console.log()</code>{' '}
          bilan chiqaring (eslatma: foydalanuvchi <code>1</code> desa, bu massivning{' '}
          <code>0</code>-indeksiga to'g'ri keladi).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let kunlar = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"]

let raqamMatn = prompt("Necha-kun (1-7)?")
let raqam = Number(raqamMatn)

console.log(kunlar[raqam - 1])`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Necha talaba bor?">
        <p>
          HTML: <code>{'<p id="natija"></p>'}</code>. Talabalar ismlaridan iborat massiv
          yarating va <code>.length</code> yordamida "Guruhda N ta talaba bor" deb{' '}
          <code>natija</code>ga <code>.textContent</code> orqali chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let talabalar = ["Aziz", "Vali", "Malika", "Nodira"]
let natijaElement = document.getElementById("natija")

natijaElement.textContent = \`Guruhda \${talabalar.length} ta talaba bor\``}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Narxni yangilash">
        <p>
          <code>{'let narxlar = [15000, 25000, 9000]'}</code> massivi bor. Ikkinchi
          mahsulotning narxi <code>20000</code>ga tushirilgani uchun mos indeksdagi
          qiymatni yangilang, so'ng butun massivni <code>console.log()</code> bilan
          chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let narxlar = [15000, 25000, 9000]
narxlar[1] = 20000
console.log(narxlar) // [15000, 20000, 9000]`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="5-vazifa: Select orqali mahsulot tanlash">
        <p>
          <code>{'let mahsulotlar = ["Kitob", "Daftar", "Ruchka"]'}</code> massivi bor.
          HTML: <code>{'<select id="indexSelect">'}</code> ichida{' '}
          <code>{'<option value="0">1-mahsulot</option>'}</code>,{' '}
          <code>{'<option value="1">2-mahsulot</option>'}</code>,{' '}
          <code>{'<option value="2">3-mahsulot</option>'}</code>,{' '}
          <code>{`<button id="tanlaTugmasi">Ko'rsatish</button>`}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. Tugma bosilganda tanlangan indeksni (
          <code>Number()</code>ga aylantirib) massivdan mos mahsulotni topib,{' '}
          <code>natija</code>ga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let mahsulotlar = ["Kitob", "Daftar", "Ruchka"]
let indexSelect = document.getElementById("indexSelect")
let tanlaTugmasi = document.getElementById("tanlaTugmasi")
let natijaElement = document.getElementById("natija")

tanlaTugmasi.onclick = function () {
  let index = Number(indexSelect.value)
  natijaElement.textContent = mahsulotlar[index]
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="6-vazifa: Oxirgi mahsulotni ko'rsatish">
        <p>
          <code>{`let savat = ["Non", "Sut", "Tuxum", "Yog'"]`}</code> massivi bor. HTML:{' '}
          <code>{`<button id="oxirgiTugmasi">Oxirgi qo'shilganni ko'rsat</button>`}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. Tugma bosilganda <code>.length</code>{' '}
          yordamida savatdagi oxirgi mahsulotni <code>natija</code>ga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let savat = ["Non", "Sut", "Tuxum", "Yog'"]
let oxirgiTugmasi = document.getElementById("oxirgiTugmasi")
let natijaElement = document.getElementById("natija")

oxirgiTugmasi.onclick = function () {
  natijaElement.textContent = savat[savat.length - 1]
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Massiv — <code>{'[ ]'}</code> ichida, vergul bilan ajratilgan qiymatlar ro'yxati;
          bitta o'zgaruvchida ko'plab bog'liq qiymatni saqlash uchun ishlatiladi.
        </li>
        <li>
          Elementlarga indeks orqali murojaat qilinadi, indekslar <code>0</code>dan
          boshlanadi — birinchi element <code>{'massiv[0]'}</code>.
        </li>
        <li>
          <code>.length</code> — massivdagi elementlar soni; oxirgi elementning indeksi
          har doim <code>{'.length - 1'}</code>.
        </li>
        <li>
          Mavjud bo'lmagan indeksga murojaat xatolik bermaydi — <code>undefined</code>{' '}
          qaytadi.
        </li>
        <li>
          Elementni <code>{'massiv[index] = yangiQiymat'}</code> orqali o'zgartirish mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
