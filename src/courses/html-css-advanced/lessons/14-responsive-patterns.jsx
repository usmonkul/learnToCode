import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Responsive naqshlar (patterns)",
  section: "Responsive",
}

export default function ResponsivePatternsLesson() {
  return (
    <>
      <p>
        Endi barcha vositalar qo'lingizda: Grid, Flexbox, clamp, media va container
        query'lar. Bu darsda real loyihalarda eng ko'p uchraydigan responsive naqshlarni
        ko'ramiz.
      </p>

      <h2>1. Media query'larni to'g'ri yozish</h2>
      <CodeBlock lang="css">{`/* Zamonaviy diapazon sintaksisi */
@media (width >= 768px) { ... }
@media (400px <= width < 900px) { ... }

/* Nafaqat kenglik */
@media (hover: hover) { .karta:hover { transform: translateY(-4px); } }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
@media print { nav, footer { display: none; } }`}</CodeBlock>
      <p>
        <code>(hover: hover)</code> — sensorli ekranlarda "yopishib qoladigan" hover
        effektlarini oldini oladi.
      </p>

      <h2>2. Ochiluvchi navigatsiya</h2>
      <p>
        Mobilda menyu yashirin, tugma bosilganda ochiladi. Eng oddiy variant:{' '}
        <code>details</code>/<code>summary</code> — JavaScriptsiz ishlaydi:
      </p>
      <CodeBlock lang="html">{`<nav class="nav">
  <a href="/" class="nav__logo">Logo</a>
  <details class="nav__menyu">
    <summary>Menyu</summary>
    <ul>
      <li><a href="#a">Xizmatlar</a></li>
      <li><a href="#b">Narxlar</a></li>
    </ul>
  </details>
</nav>`}</CodeBlock>
      <p>
        Kompyuterda esa menyu doim ko'rinadi. <code>details</code>ning ochilish holatini CSS
        bilan bosishning oson yo'li yo'q, shuning uchun ko'p loyihalarda kichik JavaScript
        bilan class almashtiriladi. Dizayn tomonini ko'rib chiqamiz:
      </p>
      <CodeBlock lang="css">{`.menyu {
  display: none;              /* mobilda yashirin */
  flex-direction: column;
}
.menyu.ochiq { display: flex; }

@media (width >= 768px) {
  .menyu {
    display: flex;            /* kompyuterda doim ko'rinadi */
    flex-direction: row;
    gap: 1.5rem;
  }
  .menyu-tugma { display: none; }
}`}</CodeBlock>

      <h2>3. Sidebar: yon panel yoki tepadagi blok</h2>
      <CodeBlock lang="css">{`.sahifa {
  display: grid;
  gap: 2rem;
}

@media (width >= 900px) {
  .sahifa {
    grid-template-columns: minmax(0, 1fr) 280px;
  }
}`}</CodeBlock>
      <Callout type="tip" title="minmax(0, 1fr)">
        Oddiy <code>1fr</code> ustunning minimal kengligi kontent kengligiga teng
        bo'ladi, shuning uchun uzun kod yoki jadval ustunni kengaytirib yuboradi.{' '}
        <code>minmax(0, 1fr)</code> bunga yo'l qo'ymaydi.
      </Callout>

      <h2>4. Gorizontal aylantiriladigan jadval</h2>
      <CodeBlock lang="css">{`.jadval-quti {
  overflow-x: auto;
}
.jadval-quti table {
  min-width: 600px;
}`}</CodeBlock>

      <h2>5. Aylantirishga yopishuvchi karusel</h2>
      <CodeBlock lang="css">{`.karusel {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: min(80%, 300px);
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
.karusel > * {
  scroll-snap-align: start;
}`}</CodeBlock>

      <h2>Sinov ro'yxati</h2>
      <ul>
        <li>320px kenglikda ham gorizontal aylantirish yo'qmi?</li>
        <li>Tugma va havolalar sensorli ekranda kamida 44x44 piksel joy egallaydimi?</li>
        <li>Matn 200% kattalashtirilsa, maket buzilmaydimi?</li>
        <li>Landscape (yotiq) rejimida ham ishlaydimi?</li>
      </ul>

      <Quiz
        question="Sensorli ekranda 'yopishib qoladigan' hover effektlaridan qochish uchun qaysi media feature ishlatiladi?"
        options={["(hover: hover)", "(pointer: none)", "(min-width: 0)", "(orientation: hover)"]}
        correctIndex={0}
        explanation="(hover: hover) faqat sichqoncha kabi hover'ni qo'llab-quvvatlaydigan qurilmalarda qo'llanadi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Blog maketi">
        <p>
          Mobilda ustma-ust, 900px dan keng ekranda o'ngda 280px yon panel bo'ladigan
          <code>.blog</code> maketi yozing. Jadval va kod bloklari asosiy ustunni buzmasin.
        </p>
        <Solution>
          <CodeBlock lang="css">{`.blog {
  display: grid;
  gap: 2rem;
}

.blog pre,
.blog .jadval-quti {
  overflow-x: auto;
}

@media (width >= 900px) {
  .blog {
    grid-template-columns: minmax(0, 1fr) 280px;
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Media query'da <code>width &gt;= 768px</code> diapazon sintaksisi qulay.</li>
        <li><code>(hover: hover)</code> va <code>prefers-reduced-motion</code> kabi feature'larni ham hisobga oling.</li>
        <li><code>minmax(0, 1fr)</code> grid ustunlarini kontent kengaytirib yuborishidan saqlaydi.</li>
        <li>Har doim 320px, sensorli va kattalashtirilgan matn bilan sinang.</li>
      </KeyPoints>
    </>
  )
}
