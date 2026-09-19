import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Hover effektlari va o'tishlar",
  section: "CSS asoslari",
}

export default function PseudoClassesAndTransitionsLesson() {
  return (
    <>
      <p>
        Yaxshi sahifa foydalanuvchi harakatiga javob beradi: tugma ustiga borilganda rangi
        o'zgaradi, havola bosilganda ajralib turadi. Buning uchun{' '}
        <strong>pseudo-class</strong>lar ishlatiladi.
      </p>

      <h2>Pseudo-class'lar</h2>
      <p>
        Pseudo-class elementning <em>holatini</em> tanlaydi. U selektorga ikki nuqta bilan
        qo'shiladi:
      </p>
      <CodeBlock lang="css">{`a:hover {
  color: crimson;           /* sichqoncha ustida */
}

button:active {
  transform: scale(0.97);   /* bosilgan paytda */
}

input:focus {
  outline: 2px solid teal;  /* klaviatura/tanlov fokusi */
}

li:first-child { font-weight: bold; }
li:last-child  { border-bottom: none; }
li:nth-child(even) { background: #f3f4f6; }`}</CodeBlock>
      <Callout type="warning" title="Fokusni yo'qotmang">
        <code>outline: none</code> yozib fokus ko'rsatkichini olib tashlamang: klaviaturadan
        foydalanuvchilar qayerda turganini ko'rmay qoladi. Agar o'zgartirsangiz, o'rniga
        ko'rinadigan boshqa fokus uslubi bering.
      </Callout>

      <h2>Pseudo-element'lar</h2>
      <p>
        Ikkita ikki nuqta bilan yoziladi va elementning qismini yoki qo'shimcha kontentni
        tanlaydi:
      </p>
      <CodeBlock lang="css">{`p::first-line {
  font-weight: bold;
}

.eslatma::before {
  content: "💡 ";
}`}</CodeBlock>

      <h2>Transition: silliq o'tish</h2>
      <p>
        Odatda hover paytida rang bir zumda o'zgaradi. <code>transition</code> bu
        o'zgarishni silliq qiladi.
      </p>
      <CodeBlock lang="css">{`.tugma {
  background: teal;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  transition: background 0.2s ease, transform 0.2s ease;
}

.tugma:hover {
  background: darkcyan;
  transform: translateY(-2px);
}`}</CodeBlock>
      <ul>
        <li>Birinchi qiymat — qaysi xossa (yoki <code>all</code>).</li>
        <li>Ikkinchisi — davomiylik (<code>0.2s</code>).</li>
        <li>Uchinchisi — tezlanish funksiyasi (<code>ease</code>, <code>ease-in-out</code>, <code>linear</code>).</li>
      </ul>
      <p>
        Transition'ni <strong>asosiy holatga</strong> yozing (<code>:hover</code>ga emas):
        shunda sichqoncha ketganda ham o'tish silliq bo'ladi.
      </p>

      <Quiz
        question="Sichqoncha elementning ustiga kelganda uslub qo'llash uchun qaysi pseudo-class kerak?"
        options={[":focus", ":hover", ":active", ":visited"]}
        correctIndex={1}
        explanation=":hover sichqoncha ustida turganda ishlaydi. :focus — tanlangan input, :active — bosilgan paytda."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Jonli tugma">
        <p>
          <code>.tugma</code> uchun hover paytida fon rangi to'qroq bo'lsin va tugma 2px
          yuqoriga siljisin. O'tish 0.2 soniyada silliq bo'lsin.
        </p>
        <Solution>
          <CodeBlock lang="css">{`.tugma {
  background: #0d9488;
  transition: background 0.2s ease, transform 0.2s ease;
}

.tugma:hover {
  background: #0f766e;
  transform: translateY(-2px);
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Pseudo-class (<code>:hover</code>, <code>:focus</code>, <code>:first-child</code>) elementning holatini tanlaydi.</li>
        <li>Pseudo-element (<code>::before</code>, <code>::after</code>) qism yoki qo'shimcha kontent qo'shadi.</li>
        <li><code>transition</code> o'zgarishlarni silliq qiladi va asosiy holatga yoziladi.</li>
        <li>Fokus ko'rsatkichini olib tashlamang.</li>
      </KeyPoints>
    </>
  )
}
