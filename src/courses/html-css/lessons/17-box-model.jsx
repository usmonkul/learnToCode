import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Quti modeli (Box model)",
  section: "CSS asoslari",
}

export default function BoxModelLesson() {
  return (
    <>
      <p>
        CSSda <strong>har bir element to'rtburchak quti</strong>. Sahifa dizayni — bu
        qutilarning o'lchami, oralig'i va joylashuvi bilan ishlash. Quti modeli (box model)
        CSSning eng muhim tushunchasi.
      </p>

      <h2>Quti qatlamlari</h2>
      <p>Ichkaridan tashqariga qarab har bir quti to'rt qatlamdan iborat:</p>
      <ol>
        <li><strong>Content</strong> — kontentning o'zi (matn, rasm).</li>
        <li><strong>Padding</strong> — kontent bilan chegara orasidagi ichki bo'shliq.</li>
        <li><strong>Border</strong> — chegara chizig'i.</li>
        <li><strong>Margin</strong> — quti va qo'shni elementlar orasidagi tashqi bo'shliq.</li>
      </ol>
      <CodeBlock lang="css">{`.quti {
  width: 300px;
  padding: 20px;             /* to'rt tomondan */
  border: 2px solid #333;    /* qalinlik, uslub, rang */
  margin: 16px;
}`}</CodeBlock>

      <h2>Qisqa yozuvlar</h2>
      <CodeBlock lang="css">{`.a { padding: 10px; }                  /* to'rt tomon */
.b { padding: 10px 20px; }             /* tepa-past | chap-o'ng */
.c { padding: 10px 20px 30px; }        /* tepa | chap-o'ng | past */
.d { padding: 10px 20px 30px 40px; }   /* tepa, o'ng, past, chap (soat strelkasi) */

.e { margin-left: 8px; }               /* bitta tomon */
.f { margin: 0 auto; }                 /* gorizontal markazlash (width bilan) */`}</CodeBlock>
      <Callout type="tip" title="Markazlash">
        Blok elementni gorizontal markazlash uchun unga <code>width</code> (yoki{' '}
        <code>max-width</code>) va <code>margin: 0 auto</code> bering.
      </Callout>

      <h2>box-sizing: muhim tuzatish</h2>
      <p>
        Standartda <code>width: 300px</code> faqat <em>kontent</em> kengligini belgilaydi:
        padding va border ustiga qo'shiladi, ya'ni umumiy kenglik 300px dan katta bo'ladi. Bu
        hisob-kitobni murakkablashtiradi. Yechim:
      </p>
      <CodeBlock lang="css">{`*,
*::before,
*::after {
  box-sizing: border-box;
}`}</CodeBlock>
      <p>
        <code>border-box</code> bilan <code>width</code> padding va borderni ham o'z ichiga
        oladi: 300px degani chindan ham 300px. Deyarli har bir loyiha shu qoida bilan
        boshlanadi.
      </p>
      <Callout type="note" title="Margin qo'shilishi">
        Vertikal yo'nalishda ikki qo'shni elementning marginlari qo'shilmaydi, ularning
        kattasi olinadi (margin collapse). Masalan, 20px va 30px margin orasidagi masofa 50px
        emas, 30px bo'ladi.
      </Callout>

      <Quiz
        question="Element ichidagi kontent va chegara orasidagi bo'shliq qanday nomlanadi?"
        options={["margin", "padding", "border", "gap"]}
        correctIndex={1}
        explanation="padding — ichki bo'shliq (kontent va chegara orasida), margin esa tashqi bo'shliq (chegaradan tashqarida)."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Kartochka">
        <p>
          <code>.karta</code> uchun: <code>box-sizing: border-box</code>, kengligi 320px,
          ichki bo'shliq 24px, 1px kulrang chegara, gorizontal markazlash va pastdan 32px
          tashqi bo'shliq yozing.
        </p>
        <Solution>
          <CodeBlock lang="css">{`.karta {
  box-sizing: border-box;
  width: 320px;
  padding: 24px;
  border: 1px solid #ccc;
  margin: 0 auto 32px;
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Har bir element quti: content, padding, border, margin.</li>
        <li>Qisqa yozuv: bitta qiymat — hamma tomon, ikkita — tepa-past/chap-o'ng, to'rtta — soat strelkasi bo'yicha.</li>
        <li>Har doim <code>box-sizing: border-box</code> bilan boshlang.</li>
        <li><code>margin: 0 auto</code> va <code>width</code> — gorizontal markazlash.</li>
      </KeyPoints>
    </>
  )
}
