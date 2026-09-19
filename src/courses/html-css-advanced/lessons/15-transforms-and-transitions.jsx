import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Transform va transition",
  section: "Animatsiya",
}

export default function TransformsAndTransitionsLesson() {
  return (
    <>
      <p>
        Yaxshi animatsiya bezak emas, u foydalanuvchiga nima o'zgarganini tushuntiradi:
        tugma bosildi, menyu ochildi, element qo'shildi. Ikki asosiy vosita —{' '}
        <code>transform</code> va <code>transition</code>.
      </p>

      <h2>transform</h2>
      <p>
        Transform elementni sahifa maketini <strong>buzmasdan</strong> siljitadi, aylantiradi
        yoki kattalashtiradi: qo'shni elementlar joyidan qimirlamaydi.
      </p>
      <CodeBlock lang="css">{`.el {
  transform: translateX(20px);           /* siljitish */
  transform: translate(-50%, -50%);      /* x va y */
  transform: rotate(15deg);              /* aylantirish */
  transform: scale(1.1);                 /* kattalashtirish */
  transform: skewX(10deg);               /* egish */

  /* Bir nechtasi birga: o'ngdan chapga qo'llanadi */
  transform: translateY(-4px) scale(1.05) rotate(2deg);

  transform-origin: top left;            /* aylanish/masshtab markazi */
}

/* Alohida xossalar (zamonaviy) */
.el2 {
  translate: 0 -4px;
  scale: 1.05;
  rotate: 2deg;
}`}</CodeBlock>

      <h2>transition</h2>
      <CodeBlock lang="css">{`.tugma {
  transition-property: transform, background-color;
  transition-duration: 200ms;
  transition-timing-function: ease-out;
  transition-delay: 0s;

  /* Qisqa yozuv */
  transition: transform 200ms ease-out, background-color 200ms ease-out;
}

.tugma:hover {
  transform: translateY(-2px);
  background-color: #1d4ed8;
}`}</CodeBlock>
      <ul>
        <li><strong>Davomiylik:</strong> mayda hover effektlari 100–200ms, katta o'zgarishlar 300–500ms. Undan uzoq — sekin tuyuladi.</li>
        <li><strong>Timing function:</strong> <code>ease-out</code> kirish uchun, <code>ease-in</code> chiqish uchun yaxshi; <code>linear</code> asosan doimiy harakat uchun.</li>
        <li>Maxsus egri chiziq: <code>cubic-bezier(0.2, 0.8, 0.2, 1)</code>.</li>
      </ul>
      <Callout type="warning" title="transition: all dan qoching">
        <code>all</code> hamma xossani, hatto tasodifan o'zgargan xossalarni ham animatsiya
        qiladi va samaradorlikni tushiradi. Kerakli xossalarni aniq ko'rsating.
      </Callout>

      <h2>Qaysi xossalarni animatsiya qilish arzon?</h2>
      <p>
        Brauzer sahifani chizishda uch bosqichdan o'tadi: layout (joylashuv), paint
        (bo'yash), composite (qatlamlarni yig'ish). Qancha erta bosqichdan boshlansa, shuncha
        qimmat.
      </p>
      <ul>
        <li><strong>Arzon (faqat composite):</strong> <code>transform</code>, <code>opacity</code>.</li>
        <li><strong>O'rtacha (paint):</strong> <code>color</code>, <code>background-color</code>, <code>box-shadow</code>.</li>
        <li><strong>Qimmat (layout):</strong> <code>width</code>, <code>height</code>, <code>margin</code>, <code>top</code>/<code>left</code>.</li>
      </ul>
      <CodeBlock lang="css">{`/* Yomon: layoutni qayta hisoblatadi */
.menyu { left: -300px; transition: left 0.3s; }
.menyu.ochiq { left: 0; }

/* Yaxshi: faqat composite */
.menyu { transform: translateX(-100%); transition: transform 0.3s; }
.menyu.ochiq { transform: translateX(0); }`}</CodeBlock>

      <h2>Amaliy naqshlar</h2>
      <CodeBlock lang="css">{`/* Kartani ko'tarish */
.karta {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}
.karta:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

/* Havola tagchizig'i */
.havola {
  background: linear-gradient(currentColor, currentColor) no-repeat 0 100% / 0 2px;
  transition: background-size 250ms;
}
.havola:hover {
  background-size: 100% 2px;
}`}</CodeBlock>

      <Quiz
        question="Element joylashuvini animatsiya qilishning eng samarali usuli qaysi?"
        options={["left va top", "margin", "transform: translate()", "width"]}
        correctIndex={2}
        explanation="transform va opacity layout va paint bosqichlarini chetlab o'tadi va GPU'da tez ishlaydi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Yon menyu">
        <p>
          <code>.yon-menyu</code> ekrandan chapga yashirin (<code>translateX(-100%)</code>)
          bo'lsin, <code>.ochiq</code> class qo'shilganda 300ms ichida silliq chiqsin.
          <code>left</code> ishlatmang.
        </p>
        <Solution>
          <CodeBlock lang="css">{`.yon-menyu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 280px;
  background: white;
  transform: translateX(-100%);
  transition: transform 300ms ease-out;
}

.yon-menyu.ochiq {
  transform: translateX(0);
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>transform</code> maketni buzmasdan siljitadi, aylantiradi, kattalashtiradi.</li>
        <li><code>transition</code> o'zgarishni silliq qiladi: xossa, davomiylik, timing function.</li>
        <li>Faqat <code>transform</code> va <code>opacity</code> ni animatsiya qilish eng tez.</li>
        <li><code>transition: all</code> dan qoching.</li>
      </KeyPoints>
    </>
  )
}
