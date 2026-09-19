import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "CSS Grid asoslari",
  section: "Layout",
}

export default function CssGridBasicsLesson() {
  return (
    <>
      <p>
        Flexbox bir yo'nalishda (qator yoki ustun) ishlaydi. <strong>CSS Grid</strong> esa
        ikki o'lchamli: qator <em>va</em> ustunlarni bir vaqtning o'zida boshqaradi. Sahifa
        maketi, galereyalar va dashboardlar uchun ideal.
      </p>

      <h2>Birinchi grid</h2>
      <CodeBlock lang="css">{`.galereya {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;  /* uchta teng ustun */
  gap: 16px;
}`}</CodeBlock>
      <CodeBlock lang="html">{`<div class="galereya">
  <div>1</div><div>2</div><div>3</div>
  <div>4</div><div>5</div><div>6</div>
</div>`}</CodeBlock>
      <p>
        Bolalar ustunlar bo'ylab avtomatik joylashadi va to'lgach yangi qator ochiladi.
      </p>

      <h2>fr birligi va repeat()</h2>
      <ul>
        <li><code>fr</code> (fraction) — bo'sh joyning ulushi. <code>1fr 2fr</code> — ikkinchi ustun ikki baravar keng.</li>
        <li><code>repeat(3, 1fr)</code> — <code>1fr 1fr 1fr</code> ning qisqa yozuvi.</li>
        <li>Aralash: <code>250px 1fr</code> — chapda qat'iy, o'ngda qolgan joy.</li>
      </ul>
      <CodeBlock lang="css">{`.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 24px;
  min-height: 100vh;
}`}</CodeBlock>

      <h2>Elementni joylashtirish</h2>
      <p>
        Grid chiziqlari 1 dan boshlab raqamlanadi. Element qaysi chiziqdan qaysi chiziqqacha
        cho'zilishini aytish mumkin:
      </p>
      <CodeBlock lang="css">{`.hero {
  grid-column: 1 / 4;       /* 1-chiziqdan 4-chiziqqacha (3 ustun) */
  grid-row: 1;
}

.keng {
  grid-column: span 2;      /* 2 ustun egallasin */
}

.butun {
  grid-column: 1 / -1;      /* boshidan oxirigacha */
}`}</CodeBlock>

      <h2>Tekislash</h2>
      <CodeBlock lang="css">{`.grid {
  display: grid;
  justify-items: center;   /* har bir katak ichida gorizontal */
  align-items: center;     /* har bir katak ichida vertikal */
  place-items: center;     /* ikkalasi birga */
}

.markazlash {
  display: grid;
  place-items: center;     /* eng qisqa markazlash usuli */
  min-height: 100vh;
}`}</CodeBlock>
      <Callout type="tip" title="Flexbox yoki Grid?">
        Umumiy qoida: kontentdan boshlab hisoblansa (navigatsiya, tugmalar qatori) —
        Flexbox. Maketdan boshlab hisoblansa (sahifa bo'limlari, galereya) — Grid. Ikkalasi
        birga ham ishlaydi: Grid ichidagi katakka Flexbox qo'yish mumkin.
      </Callout>

      <Quiz
        question="grid-template-columns: repeat(4, 1fr) nechta ustun yaratadi?"
        options={["1 ta", "3 ta", "4 ta teng ustun", "1fr ta"]}
        correctIndex={2}
        explanation="repeat(4, 1fr) '1fr 1fr 1fr 1fr' ning qisqa yozuvi: to'rtta teng kenglikdagi ustun."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Rasm galereyasi">
        <p>
          Uch ustunli, 12px oraliqli galereya yarating. Birinchi rasm ikki ustun egallasin.
          Rasmlar katak o'lchamiga sig'sin (<code>object-fit: cover</code>).
        </p>
        <Solution>
          <CodeBlock lang="css">{`.galereya {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.galereya img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.galereya img:first-child {
  grid-column: span 2;
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Grid — ikki o'lchamli maket: ustunlar va qatorlar.</li>
        <li><code>fr</code> birligi va <code>repeat()</code> ustunlarni oson yozadi.</li>
        <li><code>grid-column: 1 / -1</code> va <code>span</code> elementni cho'zadi.</li>
        <li><code>place-items: center</code> — eng qisqa markazlash.</li>
      </KeyPoints>
    </>
  )
}
