import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'for tsikli',
  section: 'Tsikllar',
}

export default function ForLoopLesson() {
  return (
    <>
      <p>
        12-darsda massiv elementlariga <code>{'massiv[0]'}</code>,{' '}
        <code>{'massiv[1]'}</code> deb bittalab murojaat qilgan edik. Massivda 100 ta
        element bo'lsa-chi? Har birini qo'lda yozish amaliy emas. <strong>Tsikl</strong>{' '}
        (loop) — bir xil kodni bir necha marta, avtomatik takrorlash imkonini beradi.
        Eng ko'p ishlatiladigan tsikl — <code>for</code> tsikli.
      </p>

      <h2>
        <code>for</code> tsiklining tuzilishi
      </h2>
      <p>
        <code>for</code> tsikli uchta qismdan iborat, nuqta-vergul bilan ajratilgan:
      </p>
      <CodeBlock lang="javascript">{`for (boshlanish; shart; qadam) {
  // takrorlanadigan kod
}`}</CodeBlock>
      <ul>
        <li>
          <strong>boshlanish</strong> — hisoblagich o'zgaruvchisi bir marta e'lon qilinadi
          (odatda <code>let i = 0</code>)
        </li>
        <li>
          <strong>shart</strong> — har bir takrorlashdan oldin tekshiriladi; <code>true</code>{' '}
          bo'lsa tsikl davom etadi, <code>false</code> bo'lsa to'xtaydi
        </li>
        <li>
          <strong>qadam</strong> — har bir takrorlashdan keyin bajariladi (odatda{' '}
          <code>i++</code> — hisoblagichni oshirish)
        </li>
      </ul>
      <CodeBlock lang="javascript">{`for (let i = 0; i < 5; i++) {
  console.log(i)
}
// 0
// 1
// 2
// 3
// 4`}</CodeBlock>
      <Callout type="note" title="Nima uchun 5 marta emas, 0 dan 4 gacha?">
        <code>i</code> <code>0</code>dan boshlanadi va <code>i &lt; 5</code> shart
        bo'lgani uchun <code>i</code> <code>5</code>ga yetganda tsikl to'xtaydi (chunki{' '}
        <code>5 &lt; 5</code> — <code>false</code>). Shuning uchun{' '}
        <code>0, 1, 2, 3, 4</code> — jami 5 marta ishlaydi.
      </Callout>

      <h2>Massiv elementlarini aylanib chiqish</h2>
      <p>
        <code>for</code> tsiklining eng keng tarqalgan qo'llanilishi — massivning har bir
        elementi bilan ishlash. Buning uchun shartni <code>{'i < massiv.length'}</code>{' '}
        qilib qo'yamiz:
      </p>
      <CodeBlock lang="javascript">{`let mevalar = ["olma", "banan", "shaftoli"]

for (let i = 0; i < mevalar.length; i++) {
  console.log(mevalar[i])
}
// "olma"
// "banan"
// "shaftoli"`}</CodeBlock>
      <Callout type="tip" title="Nega mevalar.length, aniq son (masalan, 3) emas?">
        Agar massiv o'zgarsa (element qo'shilsa yoki olib tashlansa), qattiq yozilgan son
        (<code>i &lt; 3</code>) noto'g'ri bo'lib qoladi. <code>mevalar.length</code>{' '}
        har doim massivning haqiqiy hajmini oladi, shuning uchun tsikl har qanday
        o'lchamdagi massiv bilan to'g'ri ishlaydi.
      </Callout>
      <Quiz
        question={`let sonlar = [10, 20, 30, 40]; for (let i = 0; i < sonlar.length; i++) { ... } tsikli necha marta ishlaydi?`}
        options={['3', '4', '5', "Cheksiz"]}
        correctIndex={1}
        explanation={`sonlar.length = 4, shuning uchun i 0, 1, 2, 3 qiymatlarini oladi — jami 4 marta.`}
      />

      <h2>
        <code>break</code> — tsiklni to'xtatish
      </h2>
      <p>
        <code>break</code> tsiklni darhol to'xtatadi, shart hali <code>true</code>{' '}
        bo'lsa ham. Odatda kerakli narsa topilgach, qolganini tekshirishning hojati
        bo'lmaganda ishlatiladi:
      </p>
      <CodeBlock lang="javascript">{`let ismlar = ["Aziz", "Vali", "Malika", "Nodira"]

for (let i = 0; i < ismlar.length; i++) {
  if (ismlar[i] === "Malika") {
    console.log("Topildi, indeks: " + i)
    break // "Malika" topilgach, qolganini tekshirmaymiz
  }
}`}</CodeBlock>

      <h2>
        <code>continue</code> — joriy qadamni o'tkazib yuborish
      </h2>
      <p>
        <code>continue</code> tsiklni to'xtatmaydi — faqat joriy takrorlashni tashlab,
        keyingi qadamga o'tadi:
      </p>
      <CodeBlock lang="javascript">{`for (let i = 1; i <= 10; i++) {
  if (i % 2 !== 0) {
    continue // toq sonlarni o'tkazib yuboramiz
  }
  console.log(i) // faqat juft sonlar chiqadi
}
// 2, 4, 6, 8, 10`}</CodeBlock>
      <Quiz
        question="break va continue orasidagi farq nima?"
        options={[
          'Ikkalasi ham bir xil ishlaydi',
          "break tsiklni butunlay to'xtatadi, continue esa faqat joriy qadamni o'tkazib, tsiklni davom ettiradi",
          "break joriy qadamni o'tkazadi, continue tsiklni to'xtatadi",
          'Ikkalasi ham faqat switch ichida ishlatiladi',
        ]}
        correctIndex={1}
        explanation="break tsikldan butunlay chiqib ketadi. continue esa joriy takrorlashni tugatib, shart va qadam orqali keyingi takrorlashga o'tadi."
      />

      <h2>Ichma-ich tsikllar (nested loops)</h2>
      <p>
        Tsikl ichida yana bir tsikl bo'lishi mumkin — masalan, jadval yoki koordinatalar
        bilan ishlashda foydali:
      </p>
      <CodeBlock lang="javascript">{`for (let qator = 1; qator <= 3; qator++) {
  for (let ustun = 1; ustun <= 3; ustun++) {
    console.log(\`Qator \${qator}, Ustun \${ustun}\`)
  }
}
// Qator 1, Ustun 1
// Qator 1, Ustun 2
// Qator 1, Ustun 3
// Qator 2, Ustun 1
// ... va hokazo, jami 9 marta`}</CodeBlock>

      <h2>Tsikl natijasini massivga yig'ish</h2>
      <p>
        Ko'pincha tsikl ichida yangi massiv yaratib, har bir qadamda unga element{' '}
        <code>push()</code> qilinadi:
      </p>
      <CodeBlock lang="javascript">{`let sonlar = [1, 2, 3, 4]
let ikkiBaravar = []

for (let i = 0; i < sonlar.length; i++) {
  ikkiBaravar.push(sonlar[i] * 2)
}

console.log(ikkiBaravar) // [2, 4, 6, 8]`}</CodeBlock>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: 1 dan 10 gacha">
        <p>
          <code>for</code> tsikli yordamida <code>1</code>dan <code>10</code>gacha bo'lgan
          barcha sonlarni <code>console.log()</code> bilan chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`for (let i = 1; i <= 10; i++) {
  console.log(i)
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Massiv yig'indisi">
        <p>
          <code>{'let sonlar = [5, 12, 8, 20, 3]'}</code> massivi bor.{' '}
          <code>for</code> tsikli yordamida barcha elementlarning yig'indisini hisoblang
          va <code>console.log()</code> bilan chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let sonlar = [5, 12, 8, 20, 3]
let yigindi = 0

for (let i = 0; i < sonlar.length; i++) {
  yigindi = yigindi + sonlar[i]
}

console.log(yigindi) // 48`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Juft sonlarni topish">
        <p>
          <code>{'let sonlar = [3, 8, 15, 20, 7, 12]'}</code> massivi bor.{' '}
          <code>for</code> va <code>continue</code>dan foydalanib, faqat juft sonlarni
          alohida <code>juftSonlar</code> massiviga <code>push()</code> qiling, so'ng
          uni <code>console.log()</code> bilan chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let sonlar = [3, 8, 15, 20, 7, 12]
let juftSonlar = []

for (let i = 0; i < sonlar.length; i++) {
  if (sonlar[i] % 2 !== 0) {
    continue
  }
  juftSonlar.push(sonlar[i])
}

console.log(juftSonlar) // [8, 20, 12]`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Birinchi mos elementni topish (break)">
        <p>
          <code>{'let talabalar = ["Aziz", "Vali", "Malika", "Nodira"]'}</code> massivi
          bor. <code>for</code> va <code>break</code>dan foydalanib, ismi{' '}
          <code>"M"</code> harfidan boshlanadigan birinchi talabani topib,{' '}
          <code>console.log()</code> bilan chiqaring (topilgach tsiklni to'xtating).
          Yordam: <code>{'ism.startsWith("M")'}</code>.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let talabalar = ["Aziz", "Vali", "Malika", "Nodira"]

for (let i = 0; i < talabalar.length; i++) {
  if (talabalar[i].startsWith("M")) {
    console.log(talabalar[i]) // "Malika"
    break
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="5-vazifa: Ro'yxatni HTML da ko'rsatish">
        <p>
          HTML: <code>{'<p id="natija"></p>'}</code>.{' '}
          <code>{'let mahsulotlar = ["Non", "Sut", "Tuxum"]'}</code> massivi bor.{' '}
          <code>for</code> tsikli va <code>join()</code>siz — tsikl ichida{' '}
          <code>+=</code> yordamida bitta matn yig'ing (masalan: "Non, Sut, Tuxum, ") va
          uni <code>natija</code>ga <code>.textContent</code> orqali chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let mahsulotlar = ["Non", "Sut", "Tuxum"]
let natijaElement = document.getElementById("natija")
let matn = ""

for (let i = 0; i < mahsulotlar.length; i++) {
  matn += mahsulotlar[i] + ", "
}

natijaElement.textContent = matn`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="6-vazifa: Ko'paytirish jadvali">
        <p>
          HTML: <code>{'<input type="number" id="sonInput" />'}</code>,{' '}
          <code>{'<button id="jadvalTugmasi">Jadval</button>'}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. Tugma bosilganda, inputga kiritilgan son
          uchun <code>1</code>dan <code>10</code>gacha ko'paytirish natijalarini (masalan,
          "5 x 1 = 5") tsikl yordamida hisoblab, har birini yangi qatorda{' '}
          <code>natija</code>ga chiqaring (qatorlarni <code>"\n"</code> bilan
          birlashtiring).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let sonInput = document.getElementById("sonInput")
let jadvalTugmasi = document.getElementById("jadvalTugmasi")
let natijaElement = document.getElementById("natija")

jadvalTugmasi.onclick = function () {
  let son = Number(sonInput.value)
  let natijaMatn = ""

  for (let i = 1; i <= 10; i++) {
    natijaMatn += \`\${son} x \${i} = \${son * i}\n\`
  }

  natijaElement.textContent = natijaMatn
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>for (boshlanish; shart; qadam)</code> — bir xil kodni avtomatik
          takrorlash uchun ishlatiladi.
        </li>
        <li>
          Massivni aylanib chiqishning standart usuli:{' '}
          <code>{'for (let i = 0; i < massiv.length; i++)'}</code>.
        </li>
        <li>
          <code>break</code> — tsiklni butunlay to'xtatadi;{' '}
          <code>continue</code> — faqat joriy qadamni o'tkazib, tsiklni davom ettiradi.
        </li>
        <li>Tsikl ichida yana tsikl bo'lishi mumkin (nested loops).</li>
        <li>
          Tsikl ichida <code>push()</code> yordamida yangi massiv yig'ish — juda keng
          tarqalgan qolip (pattern).
        </li>
      </KeyPoints>
    </>
  )
}
