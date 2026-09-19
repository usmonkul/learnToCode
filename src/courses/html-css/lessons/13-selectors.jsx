import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Selektorlar",
  section: "CSS asoslari",
}

export default function SelectorsLesson() {
  return (
    <>
      <p>
        Selektor CSSga "qaysi elementlarni bezayapmiz?" degan savolga javob beradi. To'g'ri
        selektor tanlash CSSning eng asosiy ko'nikmasidir.
      </p>

      <h2>Asosiy selektorlar</h2>
      <CodeBlock lang="css">{`/* Element (teg) selektori: barcha p elementlari */
p {
  color: gray;
}

/* Class selektori: class="karta" bo'lgan elementlar */
.karta {
  border: 1px solid #ddd;
}

/* ID selektori: id="asosiy" bo'lgan bitta element */
#asosiy {
  max-width: 900px;
}

/* Universal: hamma element */
* {
  box-sizing: border-box;
}`}</CodeBlock>
      <CodeBlock lang="html">{`<div class="karta">...</div>
<div class="karta karta-katta">...</div>
<main id="asosiy">...</main>`}</CodeBlock>
      <Callout type="tip" title="Classni afzal ko'ring">
        Deyarli har doim class ishlating. Class qayta ishlatiladi, bir elementda bir nechta
        class bo'lishi mumkin. ID esa sahifada takrorlanmaydi va CSSda juda "kuchli" bo'lgani
        uchun keyinchalik muammo tug'diradi.
      </Callout>

      <h2>Selektorlarni birlashtirish</h2>
      <CodeBlock lang="css">{`/* Guruhlash: bir nechta selektorga bir xil qoida */
h1, h2, h3 {
  font-family: Georgia, serif;
}

/* Avlod (descendant): .karta ichidagi har qanday p */
.karta p {
  margin: 0;
}

/* Bola (child): to'g'ridan-to'g'ri farzand */
ul > li {
  list-style: square;
}

/* Bir elementga ikkita class: ikkalasi ham bor */
button.asosiy {
  background: teal;
}

/* Qo'shni: h2 dan keyingi birinchi p */
h2 + p {
  font-weight: bold;
}`}</CodeBlock>

      <h2>Atribut selektorlari</h2>
      <CodeBlock lang="css">{`a[target="_blank"] {
  color: crimson;
}

input[type="email"] {
  border-color: teal;
}`}</CodeBlock>

      <Quiz
        question="class='karta' bo'lgan elementlarni tanlash uchun qaysi selektor to'g'ri?"
        options={[".karta", "#karta", "karta", "*karta"]}
        correctIndex={0}
        explanation="Class selektori nuqta bilan boshlanadi (.karta). # belgisi ID uchun, nuqtasiz nom esa teg nomi sifatida o'qiladi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Selektor yozing">
        <p>Quyidagi uchta qoidani yozing:</p>
        <ol>
          <li><code>nav</code> ichidagi barcha <code>a</code> havolalarni oq rang qiling.</li>
          <li><code>class="muhim"</code> bo'lgan har qanday elementga qizil rang bering.</li>
          <li><code>h1</code> va <code>h2</code> ga bir xil shrift bering.</li>
        </ol>
        <Solution>
          <CodeBlock lang="css">{`nav a {
  color: white;
}

.muhim {
  color: red;
}

h1, h2 {
  font-family: Georgia, serif;
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Element (<code>p</code>), class (<code>.karta</code>), ID (<code>#asosiy</code>) — asosiy selektorlar.</li>
        <li>Deyarli har doim class ishlating.</li>
        <li>Bo'sh joy — avlod, <code>{`>`}</code> — bevosita farzand, vergul — guruhlash.</li>
        <li>Atribut selektori: <code>{`input[type="email"]`}</code>.</li>
      </KeyPoints>
    </>
  )
}
