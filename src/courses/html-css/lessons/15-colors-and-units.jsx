import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Ranglar va o'lchov birliklari",
  section: "CSS asoslari",
}

export default function ColorsAndUnitsLesson() {
  return (
    <>
      <p>
        Deyarli har bir CSS qoidasi rang yoki o'lcham bilan ishlaydi. Ikkalasini ham turli
        usulda yozish mumkin.
      </p>

      <h2>Ranglar</h2>
      <CodeBlock lang="css">{`.misol {
  color: tomato;                 /* nomi bilan (140 ta nom bor) */
  color: #ff6347;                /* HEX */
  color: #f63;                   /* HEX qisqa yozuvi */
  color: rgb(255, 99, 71);       /* qizil, yashil, ko'k (0-255) */
  color: rgb(255 99 71 / 50%);   /* yarim shaffof */
  color: hsl(9, 100%, 64%);      /* ton, to'yinganlik, yorqinlik */
}`}</CodeBlock>
      <ul>
        <li><strong>HEX</strong> — dizaynerlar eng ko'p beradigan format.</li>
        <li><strong>RGB</strong> — uchta kanal aralashmasi.</li>
        <li><strong>HSL</strong> — o'zgartirish oson: yorqinroq yoki to'qroq qilish uchun faqat uchinchi raqamni o'zgartirasiz.</li>
      </ul>
      <Callout type="tip" title="Kontrast">
        Matn va fon rangi orasida yetarli kontrast bo'lishi kerak: och kulrang fondagi och
        kulrang matnni o'qib bo'lmaydi. Kontrastni tekshirish uchun brauzerning DevTools
        asboblaridan foydalaning.
      </Callout>

      <h2>O'lchov birliklari</h2>
      <h3>Absolyut birlik</h3>
      <ul>
        <li><code>px</code> — piksel. Aniq, o'zgarmas o'lcham (chegara, kichik oraliqlar uchun).</li>
      </ul>
      <h3>Nisbiy birliklar</h3>
      <ul>
        <li><code>%</code> — ota-element o'lchamiga nisbatan.</li>
        <li><code>em</code> — joriy elementning shrift o'lchamiga nisbatan.</li>
        <li><code>rem</code> — ildiz (<code>html</code>) shrift o'lchamiga nisbatan (odatda 16px).</li>
        <li><code>vw</code>, <code>vh</code> — ko'rinish oynasi kengligi/balandligining 1 foizi.</li>
      </ul>
      <CodeBlock lang="css">{`h1 {
  font-size: 2rem;      /* 32px (16px x 2) */
}

.rasm {
  width: 50%;           /* ota-element kengligining yarmi */
}

.hero {
  height: 100vh;        /* butun ekran balandligi */
}`}</CodeBlock>
      <Callout type="note" title="Nima uchun rem?">
        Foydalanuvchi brauzer sozlamalarida shrift o'lchamini kattalashtirsa, <code>rem</code>{' '}
        bilan yozilgan o'lchamlar unga moslashadi. <code>px</code> esa o'zgarmaydi. Shrift va
        oraliqlar uchun <code>rem</code> yaxshi tanlov.
      </Callout>

      <Quiz
        question="Ildiz elementi shrift o'lchamiga nisbatan hisoblanadigan birlik qaysi?"
        options={["px", "em", "rem", "vh"]}
        correctIndex={2}
        explanation="rem (root em) html elementining shrift o'lchamiga bog'liq. em esa joriy elementning shrift o'lchamiga bog'liq."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Rangli karta">
        <p>
          <code>.karta</code> klassiga to'q ko'k fon (HEX bilan), oq matn, <code>1.5rem</code>{' '}
          shrift va kengligi ota-elementning 80 foizi bo'lgan qoida yozing.
        </p>
        <Solution>
          <CodeBlock lang="css">{`.karta {
  background-color: #1e3a8a;
  color: white;
  font-size: 1.5rem;
  width: 80%;
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Rang: nom, HEX, RGB, HSL. Yarim shaffoflik uchun <code>/ 50%</code>.</li>
        <li><code>px</code> — aniq, <code>%</code> — ota-elementga nisbatan, <code>rem</code> — ildiz shriftiga nisbatan.</li>
        <li><code>vw</code>/<code>vh</code> — ekran o'lchamiga nisbatan.</li>
        <li>Shrift va oraliqlar uchun <code>rem</code>, nozik chegaralar uchun <code>px</code>.</li>
      </KeyPoints>
    </>
  )
}
