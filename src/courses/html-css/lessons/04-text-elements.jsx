import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Matn elementlari",
  section: "HTML",
}

export default function TextElementsLesson() {
  return (
    <>
      <p>
        Veb-sahifalarning katta qismi matndan iborat. HTML matnni mazmuniga qarab turli
        elementlarga ajratadi.
      </p>

      <h2>Sarlavhalar</h2>
      <p>
        Oltita sarlavha darajasi bor: <code>{`<h1>`}</code> (eng muhim) dan <code>{`<h6>`}</code>{' '}
        (eng kichik) gacha.
      </p>
      <CodeBlock lang="html">{`<h1>Sayt sarlavhasi</h1>
<h2>Bo'lim sarlavhasi</h2>
<h3>Kichik bo'lim sarlavhasi</h3>`}</CodeBlock>
      <Callout type="warning" title="Sarlavha o'lchami uchun emas">
        Sarlavha tegini matn kattaroq bo'lsin deb tanlamang. Daraja — <em>tuzilma</em>ni
        bildiradi. Sahifada odatda bitta <code>{`<h1>`}</code> bo'ladi, keyin{' '}
        <code>{`<h2>`}</code>, <code>{`<h3>`}</code> ketma-ket, sakramasdan. O'lchamni CSS
        bilan o'zgartiramiz.
      </Callout>

      <h2>Abzats va qator o'tkazish</h2>
      <CodeBlock lang="html">{`<p>Birinchi abzats. Brauzer uzun matnni avtomatik qatorlarga bo'ladi.</p>
<p>Ikkinchi abzats.<br />Bu yangi qatordan boshlandi.</p>
<hr />`}</CodeBlock>
      <ul>
        <li><code>{`<p>`}</code> — abzats.</li>
        <li><code>{`<br>`}</code> — abzats ichida qator uzish.</li>
        <li><code>{`<hr>`}</code> — mavzular orasidagi gorizontal chiziq.</li>
      </ul>
      <Callout type="note" title="Bo'sh joylar">
        HTMLda ketma-ket bir nechta bo'sh joy yoki Enter bosish bitta bo'sh joy sifatida
        ko'rinadi. Kodni chiroyli formatlash sahifaga ta'sir qilmaydi.
      </Callout>

      <h2>Matnni belgilash</h2>
      <CodeBlock lang="html">{`<p>
  Bu <strong>juda muhim</strong> so'z, bu esa <em>ta'kidlangan</em> so'z.
  Suv formulasi H<sub>2</sub>O, kvadrat: m<sup>2</sup>.
  Kod: <code>console.log()</code>. Narx: <del>100</del> <mark>80</mark> ming.
</p>
<blockquote>Ilm — eng katta boylik.</blockquote>`}</CodeBlock>
      <ul>
        <li><code>{`<strong>`}</code> — muhim (odatda qalin ko'rinadi).</li>
        <li><code>{`<em>`}</code> — ta'kid (odatda yotiq ko'rinadi).</li>
        <li><code>{`<code>`}</code> — kod parchasi.</li>
        <li><code>{`<mark>`}</code>, <code>{`<del>`}</code>, <code>{`<sub>`}</code>, <code>{`<sup>`}</code> — ajratish, o'chirilgan, pastki va yuqori indeks.</li>
        <li><code>{`<blockquote>`}</code> — iqtibos.</li>
      </ul>

      <Quiz
        question="Sahifada nechta asosiy (h1) sarlavha bo'lishi tavsiya etiladi?"
        options={["Kamida uchta", "Odatda bitta", "Ikkita", "Cheklov yo'q"]}
        correctIndex={1}
        explanation="h1 sahifaning asosiy mavzusini bildiradi. Qolgan bo'limlar h2, h3 va hokazo bilan belgilanadi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Maqola sahifasi">
        <p>
          Sevimli mavzuingiz haqida qisqa maqola yozing: bitta <code>{`<h1>`}</code>, ikkita{' '}
          <code>{`<h2>`}</code> bo'lim, har birida abzats, kamida bitta <code>{`<strong>`}</code>{' '}
          va bitta <code>{`<em>`}</code> ishlating.
        </p>
        <Solution>
          <CodeBlock lang="html">{`<h1>Shaxmat</h1>
<h2>Tarixi</h2>
<p>Shaxmat <strong>ming yildan ortiq</strong> tarixga ega qadimiy o'yin.</p>
<h2>Nima uchun foydali?</h2>
<p>U <em>strategik fikrlashni</em> rivojlantiradi.</p>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Sarlavha darajasi (h1–h6) tuzilmani bildiradi, o'lchamni emas.</li>
        <li><code>{`<p>`}</code> abzats uchun, <code>{`<br>`}</code> qator uzish uchun.</li>
        <li><code>{`<strong>`}</code> va <code>{`<em>`}</code> mazmun jihatidan ajratadi.</li>
        <li>HTMLda ortiqcha bo'sh joylar bitta bo'sh joyga aylanadi.</li>
      </KeyPoints>
    </>
  )
}
