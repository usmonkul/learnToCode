import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "CSS o'zgaruvchilari (Custom properties)",
  section: "CSS chuqur",
}

export default function CustomPropertiesLesson() {
  return (
    <>
      <p>
        Bir xil rang yoki oraliq CSSda o'nlab marta takrorlanadi. Brend rangini o'zgartirish
        kerak bo'lsa, hamma joyni izlab chiqish kerakmi? CSS o'zgaruvchilari (custom
        properties) bu muammoni hal qiladi.
      </p>

      <h2>E'lon qilish va ishlatish</h2>
      <CodeBlock lang="css">{`:root {
  --brand: #c2410c;
  --brand-dark: #9a3412;
  --text: #2b2118;
  --radius: 12px;
  --space: 1rem;
}

.tugma {
  background: var(--brand);
  color: white;
  border-radius: var(--radius);
  padding: var(--space) calc(var(--space) * 2);
}

.tugma:hover {
  background: var(--brand-dark);
}`}</CodeBlock>
      <ul>
        <li>Nomi <code>--</code> bilan boshlanadi va katta-kichik harfga sezgir.</li>
        <li><code>:root</code> (ya'ni <code>html</code>) da e'lon qilinsa, butun sahifada mavjud.</li>
        <li><code>var(--nom, zaxira)</code> — ikkinchi qiymat o'zgaruvchi topilmasa ishlatiladi.</li>
        <li>Ular meros bo'ladi va <code>calc()</code> bilan ishlaydi.</li>
      </ul>

      <h2>Sass o'zgaruvchilaridan farqi</h2>
      <p>
        CSS o'zgaruvchilari brauzerda <strong>ishlash vaqtida</strong> yashaydi, ya'ni ularni
        JavaScript bilan o'zgartirish, media query ichida qayta belgilash va element
        doirasida (scope) override qilish mumkin.
      </p>
      <CodeBlock lang="css">{`/* Element doirasida qayta belgilash */
.xavfli {
  --brand: #dc2626;
  --brand-dark: #b91c1c;
}
/* .xavfli ichidagi .tugma endi qizil, boshqa kod o'zgarmadi */

/* Media query ichida */
@media (min-width: 768px) {
  :root {
    --space: 1.5rem;
  }
}`}</CodeBlock>
      <CodeBlock lang="html">{`<div class="xavfli">
  <button class="tugma">O'chirish</button>
</div>`}</CodeBlock>

      <h2>Komponent parametri sifatida</h2>
      <CodeBlock lang="css">{`.avatar {
  --size: 48px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
}

.avatar.katta {
  --size: 96px;
}`}</CodeBlock>

      <Callout type="tip" title="Dizayn tokenlari">
        Professional loyihalarda o'zgaruvchilar "dizayn tokenlari" deb ataladi: ranglar,
        shrift o'lchamlari, oraliqlar, soyalar bir joyda saqlanadi va butun sayt shularga
        tayanadi. Bu dark mode va brendni o'zgartirishni osonlashtiradi (keyingi darslarda
        ko'ramiz).
      </Callout>

      <h2>@property: tipli o'zgaruvchilar</h2>
      <p>
        Oddiy o'zgaruvchi matn sifatida qaraladi, shuning uchun uni animatsiya qilib
        bo'lmaydi. <code>@property</code> unga tur berib, silliq o'tishni yoqadi:
      </p>
      <CodeBlock lang="css">{`@property --burchak {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.aylanma {
  background: conic-gradient(from var(--burchak), red, blue, red);
  transition: --burchak 1s;
}
.aylanma:hover {
  --burchak: 180deg;
}`}</CodeBlock>

      <Quiz
        question="Element doirasida o'zgaruvchini o'zgartirish uchun nima qilinadi?"
        options={[
          "Elementga o'sha nomdagi o'zgaruvchini qayta e'lon qilinadi",
          "JavaScriptdan boshqa yo'l yo'q",
          "!important qo'shiladi",
          "Yangi :root yaratiladi",
        ]}
        correctIndex={0}
        explanation="O'zgaruvchilar meros bo'ladi, shuning uchun elementda qayta e'lon qilsangiz, uning ichidagi barcha bolalar yangi qiymatni oladi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Tema tizimi">
        <p>
          <code>:root</code>da <code>--bg</code>, <code>--text</code>, <code>--accent</code> va{' '}
          <code>--radius</code> e'lon qiling. <code>.karta</code> va <code>.tugma</code>{' '}
          ularni ishlatsin. <code>.karta.ogohlantirish</code> <code>--accent</code>ni sariq
          rangga o'zgartirsin.
        </p>
        <Solution>
          <CodeBlock lang="css">{`:root {
  --bg: #ffffff;
  --text: #1f2937;
  --accent: #2563eb;
  --radius: 12px;
}

.karta {
  background: var(--bg);
  color: var(--text);
  border: 2px solid var(--accent);
  border-radius: var(--radius);
  padding: 1rem;
}

.tugma {
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
}

.karta.ogohlantirish {
  --accent: #eab308;
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>--nom: qiymat</code> e'lon qiladi, <code>var(--nom)</code> ishlatadi.</li>
        <li>O'zgaruvchilar meros bo'ladi va istalgan elementda qayta belgilanishi mumkin.</li>
        <li>Runtime'da yashaydi: media query va JavaScript bilan o'zgaradi.</li>
        <li><code>@property</code> ularga tur berib, animatsiya imkonini yaratadi.</li>
      </KeyPoints>
    </>
  )
}
