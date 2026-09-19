import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "CSS Grid ilg'or usullar",
  section: "Layout",
}

export default function CssGridAdvancedLesson() {
  return (
    <>
      <p>
        Grid'ning haqiqiy kuchi media query'siz moslashuvchan maketlar va nomlangan
        hududlar (areas) orqali ochiladi.
      </p>

      <h2>grid-template-areas</h2>
      <p>
        Maketni matn rasmi kabi chizib chiqasiz va har bir qismga nom berasiz. Kodning o'zi
        maket rasmiga o'xshaydi.
      </p>
      <CodeBlock lang="css">{`.sahifa {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  min-height: 100vh;
  gap: 16px;
}

.sahifa > header  { grid-area: header; }
.sahifa > aside   { grid-area: sidebar; }
.sahifa > main    { grid-area: main; }
.sahifa > footer  { grid-area: footer; }

/* Mobilda: hammasi ustma-ust */
@media (max-width: 700px) {
  .sahifa {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
  }
}`}</CodeBlock>
      <p>
        Mobil versiyada faqat area xaritasini o'zgartirdik, HTML esa o'z holicha qoldi. Ko'rish
        tartibi va HTML tartibi mos bo'lishi accessibility uchun yaxshi, lekin bu usul
        maket ustidan eng katta nazoratni beradi.
      </p>

      <h2>auto-fit va minmax(): media query'siz responsive</h2>
      <CodeBlock lang="css">{`.kartalar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}`}</CodeBlock>
      <p>
        Bu bitta qator: "har bir ustun kamida 240px, qolgan joyni teng bo'lib olsin, nechta
        sig'sa shuncha ustun yarat". Ekran torayganda ustunlar soni o'zi kamayadi.
      </p>
      <ul>
        <li><code>minmax(240px, 1fr)</code> — ustun 240px dan kichik bo'lmaydi, kengayishi mumkin.</li>
        <li><code>auto-fit</code> — bo'sh ustunlarni yig'ib, mavjudlarini cho'zadi.</li>
        <li><code>auto-fill</code> — bo'sh ustunlarni ham saqlab qoladi (bo'sh joy qoladi).</li>
      </ul>
      <Callout type="tip" title="Kichik ekran muammosi">
        240px dan ingichka ekranda gorizontal aylantirish paydo bo'lishi mumkin. Xavfsizroq
        variant: <code>minmax(min(240px, 100%), 1fr)</code>.
      </Callout>

      <h2>Yashirin (implicit) qatorlar va dense</h2>
      <CodeBlock lang="css">{`.grid {
  display: grid;
  grid-auto-rows: minmax(120px, auto);   /* avtomatik qatorlar balandligi */
  grid-auto-flow: dense;                 /* bo'sh o'rinlarni to'ldirish */
}`}</CodeBlock>

      <h2>Subgrid</h2>
      <p>
        Ichki grid ota-gridning ustun/qator chiziqlarini meros qilib oladi. Natijada
        kartalarning sarlavha, matn, tugma qismlari barcha kartalarda bir chiziqqa tushadi:
      </p>
      <CodeBlock lang="css">{`.kartalar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.karta {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;   /* ota-gridning qatorlarini oladi */
}`}</CodeBlock>

      <Quiz
        question="Ekran kengligiga qarab ustunlar sonini media query'siz o'zgartiradigan yozuv qaysi?"
        options={[
          "grid-template-columns: 1fr 1fr",
          "grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))",
          "grid-auto-flow: column",
          "grid-template-areas: auto",
        ]}
        correctIndex={1}
        explanation="auto-fit va minmax() birgalikda nechta ustun sig'ishini brauzerning o'ziga hisoblatadi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Dashboard maketi">
        <p>
          <code>grid-template-areas</code> bilan: tepada header, chapda sidebar (220px),
          o'rtada main, pastda footer bo'lgan maket yozing. 700px dan tor ekranda hammasi
          bitta ustunga tushsin.
        </p>
        <Solution>
          <CodeBlock lang="css">{`.dashboard {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
}

.dashboard > header { grid-area: header; }
.dashboard > aside  { grid-area: sidebar; }
.dashboard > main   { grid-area: main; }
.dashboard > footer { grid-area: footer; }

@media (max-width: 700px) {
  .dashboard {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>grid-template-areas</code> maketni vizual, o'qiladigan shaklda tasvirlaydi.</li>
        <li><code>repeat(auto-fit, minmax(...))</code> — media query'siz responsive grid.</li>
        <li><code>grid-auto-flow: dense</code> bo'sh joylarni to'ldiradi.</li>
        <li><code>subgrid</code> ichki elementlarni ota-grid chiziqlariga tekislaydi.</li>
      </KeyPoints>
    </>
  )
}
