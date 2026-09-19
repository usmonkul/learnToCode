import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "CSS qo'shish usullari",
  section: "CSS asoslari",
}

export default function AddingCssLesson() {
  return (
    <>
      <p>
        HTML tayyor, endi uni bezaymiz. CSS qoidasi (rule) uch qismdan iborat: selektor
        (qaysi elementga), xossa (property — nimani o'zgartirish) va qiymat (value — qanday).
      </p>
      <CodeBlock lang="css">{`selector {
  property: value;
}

/* Misol */
p {
  color: navy;
  font-size: 18px;
}`}</CodeBlock>
      <p>
        Har bir e'lon (declaration) <code>xossa: qiymat;</code> ko'rinishida yoziladi va nuqtali
        vergul bilan tugaydi. <code>{`/* ... */`}</code> — CSS izohi.
      </p>

      <h2>CSSni HTMLga ulashning uchta usuli</h2>

      <h3>1. Tashqi fayl (eng yaxshi usul)</h3>
      <p><code>style.css</code> faylini yarating va uni <code>head</code> ichida ulang:</p>
      <CodeBlock lang="html">{`<head>
  <link rel="stylesheet" href="style.css" />
</head>`}</CodeBlock>
      <p>Bitta CSS fayl butun saytning barcha sahifalari uchun ishlashi mumkin.</p>

      <h3>2. Ichki style tegi</h3>
      <CodeBlock lang="html">{`<head>
  <style>
    h1 {
      color: tomato;
    }
  </style>
</head>`}</CodeBlock>
      <p>Kichik tajribalar va bitta sahifali demolar uchun qulay.</p>

      <h3>3. Inline style</h3>
      <CodeBlock lang="html">{`<p style="color: green; font-size: 20px;">Yashil matn</p>`}</CodeBlock>
      <Callout type="warning" title="Inline style dan qoching">
        Inline style kodni chalkashtiradi, qayta ishlatib bo'lmaydi va boshqa qoidalardan
        kuchliroq ishlaydi. Faqat istisno hollarda ishlating. Asosiy usul — tashqi fayl.
      </Callout>

      <h2>Birinchi bezash</h2>
      <CodeBlock lang="css">{`body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  color: #222;
}

h1 {
  color: darkblue;
  text-align: center;
}`}</CodeBlock>

      <Quiz
        question="Qaysi usul CSSni bir nechta HTML sahifalarda qayta ishlatish imkonini beradi?"
        options={["Inline style", "Ichki style tegi", "Tashqi CSS fayl", "Izoh ichida yozish"]}
        correctIndex={2}
        explanation="Tashqi .css fayl link orqali istalgan sahifaga ulanadi, shuning uchun uslublarni bir joyda saqlab, hamma sahifada ishlatish mumkin."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Rezyumeni ulash">
        <p>
          <code>resume.html</code> bilan bir papkada <code>style.css</code> yarating, uni
          HTMLga ulang va <code>body</code>ga shrift va fon rangini, <code>h1</code>ga
          markazlashtirilgan matn bering.
        </p>
        <Solution>
          <CodeBlock lang="html">{`<!-- resume.html ichida, head qismida -->
<link rel="stylesheet" href="style.css" />`}</CodeBlock>
          <CodeBlock lang="css">{`/* style.css */
body {
  font-family: Arial, sans-serif;
  background-color: #fafafa;
}

h1 {
  text-align: center;
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>CSS qoidasi: selektor + <code>xossa: qiymat;</code> e'lonlari.</li>
        <li>Uch usul: tashqi fayl, ichki <code>style</code>, inline. Asosiysi — tashqi fayl.</li>
        <li>Tashqi fayl <code>{`<link rel="stylesheet" href="...">`}</code> orqali ulanadi.</li>
        <li>Inline style'dan imkon qadar qoching.</li>
      </KeyPoints>
    </>
  )
}
