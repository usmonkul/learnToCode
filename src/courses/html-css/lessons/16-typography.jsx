import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Tipografiya",
  section: "CSS asoslari",
}

export default function TypographyLesson() {
  return (
    <>
      <p>
        Veb-sahifa kontentining ko'p qismi matn, shuning uchun matnni yaxshi ko'rsatish
        dizaynning asosiy qismidir. Bunga tipografiya (typography) deyiladi.
      </p>

      <h2>Asosiy xossalar</h2>
      <CodeBlock lang="css">{`body {
  font-family: "Segoe UI", Arial, sans-serif;  /* shrift oilasi */
  font-size: 1rem;         /* o'lcham */
  font-weight: 400;        /* qalinlik: 100 dan 900 gacha */
  line-height: 1.6;        /* qator balandligi */
  letter-spacing: 0.2px;   /* harflar orasi */
}

h1 {
  text-align: center;      /* left | center | right | justify */
  text-transform: uppercase;
  text-decoration: underline;
  font-style: italic;
}`}</CodeBlock>
      <ul>
        <li><code>font-family</code> — shriftlar ro'yxati. Birinchisi topilmasa, keyingisi ishlatiladi. Oxirida umumiy oila (<code>sans-serif</code>, <code>serif</code>, <code>monospace</code>) yozing.</li>
        <li><code>line-height</code> — qator balandligi. Birliksiz raqam (masalan, <code>1.6</code>) eng yaxshi: u shrift o'lchamiga ko'paytiriladi.</li>
        <li><code>text-align</code> — gorizontal tekislash.</li>
      </ul>
      <Callout type="tip" title="O'qish qulayligi">
        Asosiy matn uchun <code>line-height</code> 1.5–1.7 oralig'ida va qator uzunligi
        taxminan 50–75 belgi bo'lsa, o'qish eng qulay bo'ladi.
      </Callout>

      <h2>Google Fonts</h2>
      <p>
        Maxsus shrift ishlatish uchun Google Fonts'dan link oling va <code>head</code>ga
        joylang:
      </p>
      <CodeBlock lang="html">{`<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
  rel="stylesheet"
/>`}</CodeBlock>
      <CodeBlock lang="css">{`body {
  font-family: "Inter", sans-serif;
}`}</CodeBlock>
      <Callout type="note" title="Shriftlar sonini cheklang">
        Har bir shrift oilasi va qalinligi sahifani sekinlashtiradi. Odatda ikkita shrift
        (sarlavha va asosiy matn uchun) yetarli.
      </Callout>

      <Quiz
        question="line-height uchun qaysi yozuv tavsiya etiladi?"
        options={["line-height: 24px", "line-height: 1.6", "line-height: 160%", "line-height: large"]}
        correctIndex={1}
        explanation="Birliksiz raqam har bir elementda shu elementning shrift o'lchamiga ko'paytiriladi, shuning uchun meros bo'lganda ham to'g'ri ishlaydi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: O'qiladigan matn">
        <p>
          <code>body</code> uchun sans-serif shrift, <code>1.1rem</code> o'lcham va{' '}
          <code>1.7</code> qator balandligi bering. <code>h1</code> ni markazlashtiring va
          qalinligini 800 qiling.
        </p>
        <Solution>
          <CodeBlock lang="css">{`body {
  font-family: Arial, sans-serif;
  font-size: 1.1rem;
  line-height: 1.7;
}

h1 {
  text-align: center;
  font-weight: 800;
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>font-family</code> ro'yxatining oxirida umumiy oila yozing.</li>
        <li><code>line-height</code> ni birliksiz (1.5–1.7) bering.</li>
        <li><code>text-align</code>, <code>font-weight</code>, <code>text-transform</code> matnni sozlaydi.</li>
        <li>Google Fonts bilan maxsus shrift ulash mumkin, lekin ularni kam ishlating.</li>
      </KeyPoints>
    </>
  )
}
