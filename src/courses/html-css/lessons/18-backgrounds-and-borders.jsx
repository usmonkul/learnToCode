import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Fon, chegara va soyalar",
  section: "CSS asoslari",
}

export default function BackgroundsAndBordersLesson() {
  return (
    <>
      <p>
        Endi elementlarga "yuz" beramiz: fon rasmlari, yumaloq burchaklar va soyalar
        sahifani zamonaviy ko'rsatadi.
      </p>

      <h2>Fon (background)</h2>
      <CodeBlock lang="css">{`.hero {
  background-color: #0f172a;
  background-image: url("images/hero.jpg");
  background-size: cover;        /* butun elementni qoplaydi */
  background-position: center;
  background-repeat: no-repeat;
}

/* Gradient: rasm o'rnida */
.banner {
  background: linear-gradient(135deg, #f97316, #ec4899);
}`}</CodeBlock>
      <ul>
        <li><code>cover</code> — rasm butun elementni qoplaydi (qirqilishi mumkin).</li>
        <li><code>contain</code> — rasm butunlay sig'adi (bo'sh joy qolishi mumkin).</li>
      </ul>
      <Callout type="tip" title="Matn o'qilishi">
        Fon rasmi ustiga matn yozsangiz, rasm yorqin bo'lsa matn o'qilmay qoladi. Rasm ustiga
        yarim shaffof qoraytiruvchi qatlam qo'shing yoki gradient ishlating.
      </Callout>

      <h2>Chegara (border)</h2>
      <CodeBlock lang="css">{`.karta {
  border: 1px solid #e2e8f0;      /* qalinlik uslub rang */
  border-bottom: 3px solid teal;  /* faqat pastki */
  border-radius: 12px;            /* yumaloq burchak */
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;             /* aylana */
}`}</CodeBlock>
      <p>
        Uslub qiymatlari: <code>solid</code>, <code>dashed</code>, <code>dotted</code>,{' '}
        <code>double</code>, <code>none</code>.
      </p>

      <h2>Soyalar</h2>
      <CodeBlock lang="css">{`.karta {
  /* x-siljish  y-siljish  xiralik  rang */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}`}</CodeBlock>
      <Callout type="note" title="Yumshoq soya">
        Yaxshi soya odatda juda xira va shaffof bo'ladi (<code>0.05–0.15</code> shaffoflik).
        Qora, qattiq soya eskirgan ko'rinadi.
      </Callout>

      <Quiz
        question="Kvadrat rasmni to'liq aylanaga aylantirish uchun nima yoziladi?"
        options={[
          "border-radius: 50%",
          "border: round",
          "border-radius: 0",
          "box-shadow: circle",
        ]}
        correctIndex={0}
        explanation="border-radius: 50% kvadrat elementni aylanaga aylantiradi. Kenglik va balandlik teng bo'lishi shart."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Profil kartochkasi">
        <p>
          <code>.profil</code> kartochkasi yarating: oq fon, 16px yumaloq burchak, yengil
          soya va 1px och kulrang chegara. Ichidagi <code>.profil img</code> aylana bo'lsin.
        </p>
        <Solution>
          <CodeBlock lang="css">{`.profil {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 24px;
}

.profil img {
  width: 96px;
  height: 96px;
  border-radius: 50%;
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>background-size: cover</code> bilan fon rasmi elementni to'liq qoplaydi.</li>
        <li><code>linear-gradient()</code> rasm o'rnida gradient fon beradi.</li>
        <li><code>border-radius</code> burchaklarni yumaloqlaydi, <code>50%</code> — aylana.</li>
        <li><code>box-shadow</code> yengil bo'lsa, chiroyli ko'rinadi.</li>
      </KeyPoints>
    </>
  )
}
