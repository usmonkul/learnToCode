import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "@keyframes animatsiyalar",
  section: "Animatsiya",
}

export default function KeyframeAnimationsLesson() {
  return (
    <>
      <p>
        Transition ikki holat orasida ishlaydi (boshi va oxiri) va biror hodisa (hover, class
        o'zgarishi) talab qiladi. Ko'p bosqichli, o'zi boshlanadigan yoki takrorlanadigan
        harakat uchun <code>@keyframes</code> kerak.
      </p>

      <h2>Birinchi animatsiya</h2>
      <CodeBlock lang="css">{`@keyframes paydo-bol {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.karta {
  animation: paydo-bol 500ms ease-out;
}`}</CodeBlock>
      <p>
        Oraliq bosqichlar uchun foizlardan foydalaniladi:
      </p>
      <CodeBlock lang="css">{`@keyframes urish {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.15); }
  100% { transform: scale(1); }
}

.yurak {
  animation: urish 1s ease-in-out infinite;
}`}</CodeBlock>

      <h2>animation xossalari</h2>
      <CodeBlock lang="css">{`.el {
  animation-name: paydo-bol;
  animation-duration: 600ms;
  animation-timing-function: ease-out;
  animation-delay: 200ms;
  animation-iteration-count: infinite;   /* yoki raqam: 3 */
  animation-direction: alternate;        /* normal | reverse | alternate */
  animation-fill-mode: forwards;         /* oxirgi holatda qolish */
  animation-play-state: paused;          /* to'xtatish/davom ettirish */

  /* Qisqa yozuv: nom davomiylik timing kechikish takror yo'nalish fill */
  animation: paydo-bol 600ms ease-out 200ms 1 normal both;
}`}</CodeBlock>
      <ul>
        <li><code>fill-mode: forwards</code> — animatsiya tugagach oxirgi kadrda qoladi.</li>
        <li><code>fill-mode: backwards</code> — kechikish paytida birinchi kadrni qo'llaydi.</li>
        <li><code>both</code> — ikkalasi. Kechikishli paydo bo'lish animatsiyalarida ko'pincha aynan shu kerak.</li>
      </ul>

      <h2>Ketma-ket paydo bo'lish (stagger)</h2>
      <CodeBlock lang="css">{`.royxat li {
  opacity: 0;
  animation: paydo-bol 500ms ease-out forwards;
  animation-delay: calc(var(--i) * 80ms);
}`}</CodeBlock>
      <CodeBlock lang="html">{`<ul class="royxat">
  <li style="--i: 0">Birinchi</li>
  <li style="--i: 1">Ikkinchi</li>
  <li style="--i: 2">Uchinchi</li>
</ul>`}</CodeBlock>

      <h2>Loader (yuklanish) namunasi</h2>
      <CodeBlock lang="css">{`@keyframes aylan {
  to { transform: rotate(360deg); }
}

.loader {
  width: 32px;
  height: 32px;
  border: 4px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: aylan 800ms linear infinite;
}`}</CodeBlock>
      <Callout type="tip" title="Loader uchun matn qo'shing">
        Faqat vizual loader ekran o'quvchilarga hech narsa demaydi. Yonida{' '}
        <code>role="status"</code> va yashirin "Yuklanmoqda..." matnini qo'shing.
      </Callout>

      <h2>Scroll bilan bog'liq animatsiyalar</h2>
      <p>
        Zamonaviy brauzerlarda animatsiyani sahifa aylantirish bilan bog'lash mumkin,
        JavaScriptsiz:
      </p>
      <CodeBlock lang="css">{`.progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background: #2563eb;
  transform-origin: left;
  animation: kengayish linear;
  animation-timeline: scroll();
}

@keyframes kengayish {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}`}</CodeBlock>
      <Callout type="note" title="Yangi imkoniyat">
        <code>animation-timeline</code> hali hamma brauzerda to'liq qo'llab-quvvatlanmaydi.
        Undan progressive enhancement sifatida foydalaning: ishlamasa ham sahifa buzilmasin.
      </Callout>

      <Quiz
        question="Animatsiya tugagandan keyin element oxirgi kadrdagi holatda qolishi uchun qaysi xossa kerak?"
        options={[
          "animation-fill-mode: forwards",
          "animation-direction: reverse",
          "animation-play-state: paused",
          "animation-timeline: auto",
        ]}
        correctIndex={0}
        explanation="fill-mode: forwards animatsiya tugagach oxirgi keyframe'dagi uslublarni saqlab qoladi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Pulsatsiya">
        <p>
          <code>.bildirish</code> nuqtasi (12x12 aylana) uchun <code>@keyframes puls</code>{' '}
          yozing: nuqta kattalashib va shaffoflashib (<code>scale(2)</code>, opacity 0),
          cheksiz takrorlansin.
        </p>
        <Solution>
          <CodeBlock lang="css">{`@keyframes puls {
  0%   { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2); opacity: 0; }
}

.bildirish {
  width: 12px;
  height: 12px;
  background: #ef4444;
  border-radius: 50%;
  animation: puls 1.2s ease-out infinite;
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>@keyframes</code> ko'p bosqichli, o'zi boshlanadigan animatsiya beradi.</li>
        <li><code>animation</code> qisqa yozuvi: nom, davomiylik, timing, kechikish, takror, yo'nalish, fill-mode.</li>
        <li><code>fill-mode: both</code> kechikishli kirish animatsiyalarida foydali.</li>
        <li>CSS o'zgaruvchisi bilan ketma-ket (stagger) animatsiya qilish mumkin.</li>
      </KeyPoints>
    </>
  )
}
