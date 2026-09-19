import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Zamonaviy CSS imkoniyatlari",
  section: "Professional CSS",
}

export default function ModernCssFeaturesLesson() {
  return (
    <>
      <p>
        CSS so'nggi yillarda juda tez rivojlandi. Ilgari preprotsessor (Sass) yoki
        JavaScript talab qilgan ko'p narsa endi to'g'ridan-to'g'ri CSSning o'zida bor. Eng
        foydali yangi imkoniyatlarni ko'rib chiqamiz.
      </p>

      <h2>CSS nesting</h2>
      <p>Qoidalarni bir-birining ichiga yozish mumkin: Sass'siz.</p>
      <CodeBlock lang="css">{`.karta {
  padding: 1rem;
  border-radius: 12px;

  h3 {
    margin-top: 0;
  }

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  &.faol {
    border: 2px solid var(--accent);
  }

  @media (width >= 768px) {
    padding: 2rem;
  }
}`}</CodeBlock>
      <ul>
        <li><code>&amp;</code> — tashqi selektorga ishora qiladi (<code>&amp;:hover</code> = <code>.karta:hover</code>).</li>
        <li>Media query ham qoida ichiga yoziladi: komponentning hamma qismi bir joyda.</li>
      </ul>
      <Callout type="warning" title="Chuqur nesting">
        Uch-to'rt darajadan ortiq ichma-ich yozmang: aniqlik oshib ketadi va kodni o'qish
        qiyinlashadi. Ikki daraja odatda yetarli.
      </Callout>

      <h2>color-mix() va nisbiy ranglar</h2>
      <CodeBlock lang="css">{`:root {
  --brand: #2563eb;
}

.tugma {
  background: var(--brand);
}
.tugma:hover {
  /* brend rangiga 20% qora aralashtirish */
  background: color-mix(in srgb, var(--brand), black 20%);
}

.yengil-fon {
  /* 10% shaffoflikdagi brend rangi */
  background: color-mix(in srgb, var(--brand) 10%, transparent);
}`}</CodeBlock>
      <p>
        Endi bitta asosiy rangdan butun palitra (hover, fon, chegara) hosil qilish
        mumkin, har birini qo'lda yozish shart emas.
      </p>

      <h2>Scroll snap</h2>
      <CodeBlock lang="css">{`.slayd-royxat {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}

.slayd {
  flex: 0 0 100%;
  scroll-snap-align: center;
}`}</CodeBlock>

      <h2>Aylantirishni boshqarish</h2>
      <CodeBlock lang="css">{`html {
  scroll-behavior: smooth;            /* silliq sakrash (#id havolalar) */
}

[id] {
  scroll-margin-top: 80px;            /* sticky header ostida qolmasligi uchun */
}

.modal-royxat {
  overscroll-behavior: contain;       /* ichki aylantirish sahifaga o'tmasin */
}`}</CodeBlock>

      <h2>accent-color, text-wrap, gap</h2>
      <CodeBlock lang="css">{`input[type="checkbox"],
input[type="radio"] {
  accent-color: var(--brand);          /* brend rangli checkbox */
}

h1, h2, h3 {
  text-wrap: balance;                  /* sarlavha qatorlarini teng taqsimlaydi */
}

p {
  text-wrap: pretty;                   /* qatorda yakka so'z qolishining oldini oladi */
}`}</CodeBlock>

      <h2>dialog va popover</h2>
      <p>
        Modal oynalar va tooltiplar uchun ilgari JavaScript kutubxonalari kerak bo'lardi.
        Endi brauzerning o'zida bor:
      </p>
      <CodeBlock lang="html">{`<dialog id="oyna">
  <h2>Tasdiqlash</h2>
  <p>Haqiqatan o'chirmoqchimisiz?</p>
  <form method="dialog">
    <button value="yoq">Yo'q</button>
    <button value="ha">Ha</button>
  </form>
</dialog>

<button popovertarget="maslahat">Yordam</button>
<div id="maslahat" popover>Bu yordam matni.</div>`}</CodeBlock>
      <CodeBlock lang="css">{`dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
}`}</CodeBlock>
      <p>
        <code>dialog</code> ni <code>showModal()</code> orqali JavaScriptdan ochish fokusni
        ushlab turish, Esc bilan yopish va orqa fonni bloklashni avtomatik bajaradi.{' '}
        <code>popover</code> esa JavaScriptsiz ochiladi va yopiladi.
      </p>
      <Callout type="tip" title="Yangi imkoniyatlardan foydalanish">
        Yangi xususiyatdan oldin caniuse.com'da qo'llab-quvvatlashni tekshiring. Ko'pchilik
        uchun <code>@supports</code> bilan zaxira yo'l berish mumkin:
        <code>@supports (text-wrap: balance) {`{ ... }`}</code>.
      </Callout>

      <Quiz
        question="CSS nesting'da tashqi selektorga ishora qilish uchun qaysi belgi ishlatiladi?"
        options={["&", "*", "@", "%"]}
        correctIndex={0}
        explanation="& belgisi ota-selektorni bildiradi: &:hover, &.faol, &::before kabi yozuvlarda ishlatiladi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Nesting bilan kartochka">
        <p>
          Quyidagini nesting bilan qayta yozing: <code>.karta</code>, <code>.karta:hover</code>,{' '}
          <code>.karta h3</code> va 768px dan keng ekranda <code>.karta</code>ning{' '}
          <code>padding</code>i 2rem bo'lsin.
        </p>
        <Solution>
          <CodeBlock lang="css">{`.karta {
  padding: 1rem;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin-top: 0;
  }

  @media (width >= 768px) {
    padding: 2rem;
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>CSS nesting Sass'siz qoidalarni ichma-ich yozish imkonini beradi (<code>&amp;</code> bilan).</li>
        <li><code>color-mix()</code> bitta rangdan palitra yaratadi.</li>
        <li><code>scroll-snap</code>, <code>text-wrap: balance</code>, <code>accent-color</code> — kichik, lekin foydali.</li>
        <li><code>dialog</code> va <code>popover</code> modal va tooltiplarni JavaScriptsiz (yoki minimal) yechadi.</li>
      </KeyPoints>
    </>
  )
}
