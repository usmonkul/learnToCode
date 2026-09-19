import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Loyiha: landing sahifa (CSS)",
  section: "Loyiha",
}

export default function ProjectLandingPageCssLesson() {
  return (
    <>
      <p>
        Endi oldingi darsdagi HTML skeletini <code>landing.css</code> bilan bezaymiz. Barcha
        o'rganganlaringiz bu yerda birlashadi: quti modeli, tipografiya, Flexbox, hover va
        responsive dizayn.
      </p>

      <h2>1. Asos: reset va o'zgaruvchilar</h2>
      <CodeBlock lang="css">{`*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Segoe UI", Arial, sans-serif;
  line-height: 1.6;
  color: #2b2118;
  background: #fffaf5;
}

img {
  max-width: 100%;
  height: auto;
}

.konteyner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 16px;
}`}</CodeBlock>

      <h2>2. Header va menyu</h2>
      <CodeBlock lang="css">{`.header {
  position: sticky;
  top: 0;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.header__ichki {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
}

.logo {
  font-weight: 800;
  font-size: 1.25rem;
  color: #7c3f1d;
  text-decoration: none;
}

.menyu {
  display: flex;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.menyu a {
  color: inherit;
  text-decoration: none;
}

.menyu a:hover {
  color: #c2410c;
}`}</CodeBlock>

      <h2>3. Hero va tugma</h2>
      <CodeBlock lang="css">{`.hero {
  background: linear-gradient(135deg, #7c3f1d, #c2410c);
  color: white;
  text-align: center;
}

.hero .konteyner {
  padding-top: 96px;
  padding-bottom: 96px;
}

.hero h1 {
  font-size: 2.5rem;
  margin: 0 0 16px;
}

.tugma {
  display: inline-block;
  padding: 12px 28px;
  background: #fde68a;
  color: #7c3f1d;
  font-weight: 700;
  border: none;
  border-radius: 999px;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}

.tugma:hover {
  background: #fcd34d;
  transform: translateY(-2px);
}`}</CodeBlock>

      <h2>4. Kartalar (mobile-first)</h2>
      <CodeBlock lang="css">{`.kartalar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.karta {
  flex: 1;
  background: white;
  border: 1px solid #f1e3d3;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.karta h3 {
  margin-top: 0;
}

@media (min-width: 768px) {
  .kartalar {
    flex-direction: row;
  }
}`}</CodeBlock>

      <h2>5. Jadval, forma va footer</h2>
      <CodeBlock lang="css">{`table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #f1e3d3;
}

form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 420px;
}

input {
  padding: 10px 12px;
  border: 1px solid #d6c3af;
  border-radius: 8px;
  font: inherit;
}

input:focus {
  outline: 2px solid #c2410c;
  border-color: transparent;
}

.footer {
  background: #2b2118;
  color: #f1e3d3;
  text-align: center;
}`}</CodeBlock>

      <Callout type="tip" title="Tekshirish ro'yxati">
        Sahifani brauzerda torayting va telefon rejimida ko'ring: gorizontal aylantirish
        paydo bo'lmayaptimi? Rasm va matn to'g'ri sig'yaptimi? Tugma va havolalar ustiga
        borilganda o'zgaradimi? Tab tugmasi bilan fokus ko'rinyaptimi?
      </Callout>

      <Quiz
        question="Nega .kartalar uchun avval ustun ko'rinishi yoziladi, keyin media query bilan qator qilinadi?"
        options={[
          "Chunki media query faqat qatorlar uchun ishlaydi",
          "Bu mobile-first yondashuv: avval kichik ekran, keyin kengaytirish",
          "Chunki Flexbox faqat ustunlarda ishlaydi",
          "Bu majburiy CSS qoidasi",
        ]}
        correctIndex={1}
        explanation="Mobile-first yondashuvda asosiy CSS kichik ekran uchun yoziladi va min-width media queryda katta ekranlar uchun o'zgartiriladi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: O'z dizayningiz">
        <p>
          Loyihani shaxsiylashtiring: ranglar palitrasini o'zgartiring (kamida uchta rang),
          Google Fonts'dan bitta shrift qo'shing va "Mijozlar fikri" bo'limini karta
          uslubida bezang. Natijani telefon kengligida ham tekshiring.
        </p>
        <Solution>
          <CodeBlock lang="css">{`blockquote {
  margin: 0 0 16px;
  padding: 20px 24px;
  background: white;
  border-left: 4px solid #c2410c;
  border-radius: 8px;
}

blockquote footer {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #7c3f1d;
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Loyiha reset, tipografiya, quti modeli, Flexbox, hover va responsive dizaynni birlashtiradi.</li>
        <li>Mobile-first: asosiy uslub kichik ekran uchun, <code>min-width</code> bilan kengaytiring.</li>
        <li>Barcha brauzer o'lchamlarida va klaviatura bilan tekshiring.</li>
        <li>Tabriklaymiz! Endi Advanced kursda CSS Grid, animatsiya va accessibility'ni o'rganishingiz mumkin.</li>
      </KeyPoints>
    </>
  )
}
