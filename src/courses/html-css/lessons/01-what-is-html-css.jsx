import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "HTML va CSS nima?",
  section: "Boshlash",
}

export default function WhatIsHtmlCssLesson() {
  return (
    <>
      <p>
        Siz har kuni ko'radigan har bir veb-sahifa — Google, YouTube, Telegram Web — uchta
        texnologiya ustiga qurilgan: <strong>HTML</strong>, <strong>CSS</strong> va{' '}
        <strong>JavaScript</strong>. Bu kursda birinchi ikkitasini o'rganamiz.
      </p>
      <p>Ularni uy qurilishiga o'xshatish mumkin:</p>
      <ul>
        <li>
          <strong>HTML</strong> — uyning <em>karkasi</em>: devorlar, eshiklar, derazalar. Ya'ni
          sahifada <em>nima bor</em>: sarlavha, matn, rasm, tugma.
        </li>
        <li>
          <strong>CSS</strong> — uyning <em>ichki va tashqi bezagi</em>: ranglar, o'lchamlar,
          joylashuv. Ya'ni sahifa <em>qanday ko'rinadi</em>.
        </li>
        <li>
          <strong>JavaScript</strong> — uyning <em>elektr va mexanizmlari</em>: tugma bosilsa
          eshik ochiladi. Ya'ni sahifa <em>qanday ishlaydi</em>.
        </li>
      </ul>

      <h2>HTML nima?</h2>
      <p>
        HTML (HyperText Markup Language — gipermatn belgilash tili) dasturlash tili emas,{' '}
        <strong>belgilash tili</strong> (markup language). U hisob-kitob qilmaydi, faqat
        kontentga "bu — sarlavha, bu — abzats, bu — rasm" deb yorliq (teg, tag) qo'yadi.
      </p>
      <CodeBlock lang="html">{`<h1>Salom, dunyo!</h1>
<p>Bu mening birinchi sahifam.</p>`}</CodeBlock>

      <h2>CSS nima?</h2>
      <p>
        CSS (Cascading Style Sheets — pog'onali uslublar jadvali) HTML elementlarining
        ko'rinishini boshqaradi. Quyidagi qoida barcha sarlavhalarni qizil qiladi:
      </p>
      <CodeBlock lang="css">{`h1 {
  color: red;
}`}</CodeBlock>

      <Callout type="note" title="Nega ikkalasini ajratamiz?">
        Mazmun (HTML) va ko'rinish (CSS) alohida yozilsa, sayt dizaynini bitta faylni o'zgartirib
        butunlay yangilash mumkin, HTMLga tegmasdan. Bu professional veb-ishlab chiqishning
        asosiy tamoyillaridan biri.
      </Callout>

      <Quiz
        question="Sahifadagi matn rangini o'zgartirish uchun qaysi texnologiya javob beradi?"
        options={["HTML", "CSS", "Ikkalasi ham bir xil", "Hech biri"]}
        correctIndex={1}
        explanation="Ranglar, o'lchamlar va joylashuv — ko'rinish masalalari, ularni CSS boshqaradi. HTML esa sahifa mazmunini va tuzilishini belgilaydi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Tasniflash">
        <p>
          Quyidagilarning har biri HTMLga tegishlimi yoki CSSga? (1) sarlavha matni, (2) fon
          rangi, (3) rasm joylashtirish, (4) shrift o'lchami.
        </p>
        <Solution>
          <p>
            HTML: (1) sarlavha matni, (3) rasm joylashtirish. CSS: (2) fon rangi, (4) shrift
            o'lchami.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>HTML sahifaning mazmuni va tuzilishini belgilaydi.</li>
        <li>CSS sahifaning ko'rinishini (rang, o'lcham, joylashuv) belgilaydi.</li>
        <li>JavaScript sahifaga xatti-harakat qo'shadi (bu kursda o'rganilmaydi).</li>
        <li>HTML — belgilash tili, dasturlash tili emas.</li>
      </KeyPoints>
    </>
  )
}
