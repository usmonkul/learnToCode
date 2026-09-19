import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Flexbox asoslari",
  section: "CSS asoslari",
}

export default function FlexboxBasicsLesson() {
  return (
    <>
      <p>
        Elementlarni yonma-yon qo'yish, markazlash, teng taqsimlash — ilgari bular og'riqli
        vazifa edi. <strong>Flexbox</strong> ularni oson qiladi.
      </p>

      <h2>Asosiy g'oya</h2>
      <p>
        Ota-elementga <code>display: flex</code> bering — u <strong>flex konteyner</strong>{' '}
        bo'ladi, bevosita bolalari esa <strong>flex elementlar</strong>. Ular endi
        gorizontal qatorda joylashadi.
      </p>
      <CodeBlock lang="html">{`<div class="qator">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>`}</CodeBlock>
      <CodeBlock lang="css">{`.qator {
  display: flex;
}`}</CodeBlock>

      <h2>Ikkita o'q</h2>
      <p>
        Flexboxda ikki o'q bor: <strong>asosiy o'q</strong> (main axis, standartda gorizontal)
        va <strong>ko'ndalang o'q</strong> (cross axis, vertikal).
      </p>
      <ul>
        <li><code>justify-content</code> — asosiy o'q bo'ylab taqsimlash.</li>
        <li><code>align-items</code> — ko'ndalang o'q bo'ylab tekislash.</li>
        <li><code>flex-direction</code> — asosiy o'q yo'nalishi: <code>row</code> (standart) yoki <code>column</code>.</li>
        <li><code>gap</code> — elementlar orasidagi masofa.</li>
        <li><code>flex-wrap: wrap</code> — sig'masa, keyingi qatorga o'tkazadi.</li>
      </ul>
      <CodeBlock lang="css">{`.qator {
  display: flex;
  justify-content: space-between; /* flex-start | center | flex-end | space-around | space-evenly */
  align-items: center;            /* stretch | flex-start | center | flex-end */
  gap: 16px;
}`}</CodeBlock>

      <h2>Ikkita klassik misol</h2>
      <h3>1. Navigatsiya paneli</h3>
      <CodeBlock lang="css">{`nav ul {
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}`}</CodeBlock>
      <h3>2. To'liq markazlash</h3>
      <CodeBlock lang="css">{`.markaz {
  display: flex;
  justify-content: center;   /* gorizontal */
  align-items: center;       /* vertikal */
  min-height: 100vh;
}`}</CodeBlock>

      <h2>Elementlar uchun: flex</h2>
      <CodeBlock lang="css">{`.yon-panel { flex: 0 0 240px; }  /* qat'iy 240px */
.asosiy    { flex: 1; }          /* qolgan barcha joyni oladi */`}</CodeBlock>
      <Callout type="note" title="flex: 1 nima?">
        Bu qisqa yozuv: element bo'sh joyni teng bo'lib olishi mumkin. Uchta elementning
        hammasiga <code>flex: 1</code> bersangiz, ular teng kenglikda bo'ladi.
      </Callout>
      <Callout type="tip" title="Flexbox — bir o'lchamli">
        Flexbox bitta yo'nalishda (qator yoki ustun) ishlaydi. Ham qator, ham ustun bo'yicha
        ikki o'lchamli setka kerak bo'lsa, Advanced kursdagi CSS Grid'ni o'rganasiz.
      </Callout>

      <Quiz
        question="Flex elementlarni vertikal (ko'ndalang o'q bo'yicha) markazlash uchun qaysi xossa ishlatiladi?"
        options={["justify-content", "align-items", "flex-wrap", "gap"]}
        correctIndex={1}
        explanation="Standart yo'nalishda align-items ko'ndalang (vertikal) o'qni boshqaradi, justify-content esa asosiy (gorizontal) o'qni."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Header">
        <p>
          <code>header</code> ichida chapda logotip (<code>.logo</code>), o'ngda menyu (
          <code>nav</code>) bo'lsin. Ular orasida maksimal masofa, vertikal markazlashgan.
        </p>
        <Solution>
          <CodeBlock lang="css">{`header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>display: flex</code> ota-elementga beriladi, ta'siri bevosita bolalarga tegadi.</li>
        <li><code>justify-content</code> — asosiy o'q, <code>align-items</code> — ko'ndalang o'q.</li>
        <li><code>gap</code> — elementlar orasidagi masofa.</li>
        <li><code>flex: 1</code> — bo'sh joyni egallash.</li>
      </KeyPoints>
    </>
  )
}
