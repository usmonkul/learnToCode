import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Harakat sozlamalari va samaradorlik",
  section: "Animatsiya",
}

export default function MotionAndPerformanceLesson() {
  return (
    <>
      <p>
        Har bir foydalanuvchi animatsiyani yoqtirmaydi va ba'zilari uchun u haqiqiy muammo:
        vestibulyar buzilishi bor odamlarda katta harakat bosh aylanishi yoki ko'ngil aynishiga
        sabab bo'ladi. Shuningdek, sekin qurilmalarda ortiqcha animatsiya sahifani "qotirib"
        qo'yadi.
      </p>

      <h2>prefers-reduced-motion</h2>
      <p>
        Operatsion tizimda "harakatni kamaytirish" yoqilgan bo'lsa, buni CSS bilan bilish
        mumkin:
      </p>
      <CodeBlock lang="css">{`/* Variant 1: standartni saqlab, kerak bo'lsa o'chirish */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Variant 2 (tavsiya): faqat harakat kerak bo'lganda qo'shish */
.karta {
  opacity: 1;
}

@media (prefers-reduced-motion: no-preference) {
  .karta {
    animation: paydo-bol 500ms ease-out;
  }
}`}</CodeBlock>
      <Callout type="tip" title="Butunlay o'chirish shart emas">
        Katta siljish, aylanish va masshtab o'zgarishlarini olib tashlang, lekin yengil
        opacity o'tishlarini qoldirish mumkin: ular odatda muammo tug'dirmaydi.
      </Callout>

      <h2>Samaradorlik qoidalari</h2>
      <ol>
        <li>Faqat <code>transform</code> va <code>opacity</code>ni animatsiya qiling.</li>
        <li>Bir vaqtda juda ko'p elementni animatsiya qilmang.</li>
        <li>Katta blur va soyalarni animatsiya qilmang: ular qimmat.</li>
        <li>Animatsiya uzoq davom etsa, foydalanuvchi kutmasligi kerak (interaktivlikni to'smasin).</li>
      </ol>

      <h2>will-change</h2>
      <p>
        <code>will-change</code> brauzerga "bu xossa o'zgaradi" deb oldindan xabar beradi va
        u elementni alohida GPU qatlamiga chiqaradi.
      </p>
      <CodeBlock lang="css">{`.menyu {
  will-change: transform;
}`}</CodeBlock>
      <Callout type="warning" title="Ehtiyot bo'ling">
        Har bir <code>will-change</code> xotira sarflaydi va yangi stacking context yaratadi.
        Uni hamma joyga yozmang: faqat haqiqatan ham muammo bo'lgan, tez-tez animatsiya
        qilinadigan elementlarga va imkon bo'lsa animatsiya boshlanishidan oldin qo'shing.
      </Callout>

      <h2>Samaradorlikni o'lchash</h2>
      <ul>
        <li><strong>DevTools → Performance:</strong> animatsiya paytida kadrlar tushib ketyaptimi?</li>
        <li><strong>DevTools → Rendering → Paint flashing:</strong> qaysi joylar qayta bo'yalayotganini ko'rsatadi.</li>
        <li><strong>Lighthouse:</strong> umumiy tezlik va CLS (kutilmagan siljish) ballari.</li>
      </ul>

      <h2>Kontent-visibility</h2>
      <p>Uzun sahifalarda ekrandan tashqaridagi bo'limlarni chizishni keyinga qoldirish mumkin:</p>
      <CodeBlock lang="css">{`.bolim {
  content-visibility: auto;
  contain-intrinsic-size: auto 600px;   /* taxminiy balandlik */
}`}</CodeBlock>

      <Quiz
        question="Sahifa operatsion tizimda 'harakatni kamaytirish' yoqilganini qaysi media feature aniqlaydi?"
        options={[
          "prefers-color-scheme",
          "prefers-reduced-motion",
          "prefers-contrast",
          "hover",
        ]}
        correctIndex={1}
        explanation="prefers-reduced-motion: reduce foydalanuvchi tizim darajasida harakatni kamaytirishni so'raganini bildiradi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Hurmatli animatsiya">
        <p>
          <code>.karta</code> sahifa ochilganda pastdan paydo bo'lish animatsiyasiga ega
          bo'lsin, lekin faqat foydalanuvchi harakatni kamaytirishni so'ramagan bo'lsa.
        </p>
        <Solution>
          <CodeBlock lang="css">{`@keyframes paydo-bol {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: no-preference) {
  .karta {
    animation: paydo-bol 500ms ease-out both;
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>prefers-reduced-motion</code>ni hurmat qiling: katta harakatni o'chiring yoki kamaytiring.</li>
        <li>Faqat <code>transform</code>/<code>opacity</code>ni animatsiya qiling.</li>
        <li><code>will-change</code>ni ehtiyotkorlik bilan, faqat kerak joyda ishlating.</li>
        <li>DevTools bilan haqiqiy natijani o'lchang, taxmin qilmang.</li>
      </KeyPoints>
    </>
  )
}
