import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Suyuq o'lchamlar: clamp, min, max",
  section: "Layout",
}

export default function FluidSizingLesson() {
  return (
    <>
      <p>
        Breakpoint'lar orasida shrift va oraliqlar birdan sakraydi. <strong>Suyuq</strong>{' '}
        (fluid) dizaynda ular ekran kengligi bilan silliq o'zgaradi. Buning uchun uchta
        matematik funksiya kerak.
      </p>

      <h2>min(), max(), clamp()</h2>
      <CodeBlock lang="css">{`.konteyner {
  width: min(90%, 1100px);       /* ikkalasidan kichigi */
}

.tugma {
  padding: max(0.75rem, 2vw);    /* ikkalasidan kattasi */
}

h1 {
  font-size: clamp(2rem, 5vw + 1rem, 4rem);
  /*           eng kichik  ideal   eng katta */
}`}</CodeBlock>
      <ul>
        <li><code>min(a, b)</code> — kichigini oladi (ya'ni "eng ko'pi bilan").</li>
        <li><code>max(a, b)</code> — kattasini oladi ("kamida").</li>
        <li><code>clamp(eng-kichik, ideal, eng-katta)</code> — ideal qiymat ikki chegara orasida qoladi.</li>
      </ul>

      <h2>Suyuq tipografiya</h2>
      <CodeBlock lang="css">{`:root {
  --fs-body: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --fs-h2:   clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
  --fs-h1:   clamp(2rem, 1.4rem + 3vw, 3.5rem);
}

body { font-size: var(--fs-body); }
h1 { font-size: var(--fs-h1); }
h2 { font-size: var(--fs-h2); }`}</CodeBlock>
      <Callout type="warning" title="Faqat vw bilan yozmang">
        <code>font-size: 5vw</code> foydalanuvchi brauzerda matnni kattalashtirsa
        kattalashmaydi (accessibility buziladi). Doim <code>rem</code> bilan aralashtiring:{' '}
        <code>1rem + 2vw</code>.
      </Callout>

      <h2>Suyuq oraliqlar</h2>
      <CodeBlock lang="css">{`section {
  padding-block: clamp(2rem, 6vw, 6rem);
}

.grid {
  gap: clamp(1rem, 3vw, 2rem);
}`}</CodeBlock>

      <h2>aspect-ratio</h2>
      <CodeBlock lang="css">{`.video-quti {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.avatar {
  aspect-ratio: 1;     /* kvadrat */
  width: 64px;
  object-fit: cover;
}`}</CodeBlock>
      <p>
        Oldin nisbatni saqlash uchun "padding-top: 56.25%" kabi hiylalar kerak edi; endi bitta
        xossa yetarli.
      </p>

      <h2>Mantiqiy (logical) xossalar</h2>
      <p>
        <code>left</code>/<code>right</code>/<code>top</code>/<code>bottom</code> o'rniga
        yozuv yo'nalishiga bog'liq bo'lmagan nomlar: <code>inline</code> (matn oqimi
        bo'ylab) va <code>block</code> (perpendikulyar).
      </p>
      <CodeBlock lang="css">{`.karta {
  padding-inline: 1.5rem;   /* chap + o'ng */
  padding-block: 1rem;      /* tepa + past */
  margin-inline: auto;      /* gorizontal markazlash */
  inline-size: min(100%, 60ch);  /* width */
  inset: 0;                 /* top, right, bottom, left: 0 */
}`}</CodeBlock>
      <p>
        Bu arab yoki ibroniy kabi o'ngdan chapga yoziladigan tillarda maket avtomatik
        aks etishini ta'minlaydi.
      </p>
      <Callout type="tip" title="ch birligi">
        <code>ch</code> — "0" belgisining kengligi. <code>max-width: 65ch</code> matn qatori
        uzunligini o'qishga qulay (taxminan 65 belgi) qiladi.
      </Callout>

      <Quiz
        question="font-size: clamp(1rem, 2vw + 1rem, 2rem) qanday ishlaydi?"
        options={[
          "Hech qachon 1rem dan kichik yoki 2rem dan katta bo'lmaydi",
          "Doim 2rem",
          "Faqat mobilda ishlaydi",
          "Faqat vw bilan hisoblanadi",
        ]}
        correctIndex={0}
        explanation="clamp() ideal qiymatni eng kichik va eng katta chegaralar orasida ushlab turadi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Suyuq sahifa">
        <p>
          <code>.konteyner</code> kengligi <code>min(92%, 1100px)</code> bo'lsin va
          markazlashgan (mantiqiy xossa bilan). <code>h1</code> 2rem dan 3.5rem gacha suyuq
          o'zgarsin. <code>.video</code> 16:9 nisbatda bo'lsin.
        </p>
        <Solution>
          <CodeBlock lang="css">{`.konteyner {
  width: min(92%, 1100px);
  margin-inline: auto;
}

h1 {
  font-size: clamp(2rem, 1.4rem + 3vw, 3.5rem);
}

.video {
  aspect-ratio: 16 / 9;
  width: 100%;
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>clamp(min, ideal, max)</code> qiymatni chegara ichida silliq o'zgartiradi.</li>
        <li>Suyuq shriftda <code>vw</code>ni doim <code>rem</code> bilan aralashtiring.</li>
        <li><code>aspect-ratio</code> nisbatni bitta qatorda beradi.</li>
        <li>Mantiqiy xossalar (<code>padding-inline</code>, <code>inset</code>) yozuv yo'nalishiga moslashadi.</li>
      </KeyPoints>
    </>
  )
}
