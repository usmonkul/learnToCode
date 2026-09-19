import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Container query'lar",
  section: "Responsive",
}

export default function ContainerQueriesLesson() {
  return (
    <>
      <p>
        Media query butun <em>ekran</em> o'lchamiga qaraydi. Lekin komponent (masalan,
        kartochka) sahifaning keng asosiy qismida ham, tor yon panelida ham ishlatilishi
        mumkin — ikkalasida ekran kengligi bir xil, komponentga berilgan joy esa boshqa.
        <strong> Container query</strong> komponentni <em>o'z konteyneri</em> o'lchamiga
        qarab moslashtiradi.
      </p>

      <h2>Muammo</h2>
      <CodeBlock lang="css">{`/* Media query: ekran keng bo'lsa, karta gorizontal */
@media (min-width: 700px) {
  .karta { flex-direction: row; }
}
/* Lekin karta tor yon panelda bo'lsa-chi? U baribir siqilib qoladi. */`}</CodeBlock>

      <h2>Yechim: container-type va @container</h2>
      <CodeBlock lang="css">{`/* 1. Ota-elementni konteyner deb belgilang */
.karta-quti {
  container-type: inline-size;
  container-name: karta;
}

/* 2. Komponent konteyner kengligiga qarab moslashadi */
.karta {
  display: grid;
  gap: 1rem;
}

@container karta (min-width: 420px) {
  .karta {
    grid-template-columns: 160px 1fr;
    align-items: center;
  }
}`}</CodeBlock>
      <CodeBlock lang="html">{`<aside class="yon-panel">
  <div class="karta-quti">
    <article class="karta">...</article>   <!-- tor: ustma-ust -->
  </div>
</aside>

<main>
  <div class="karta-quti">
    <article class="karta">...</article>   <!-- keng: yonma-yon -->
  </div>
</main>`}</CodeBlock>
      <p>
        Endi bir xil <code>.karta</code> komponenti qayerga qo'yilsa, o'sha joyga moslashadi.
        Bu haqiqiy qayta ishlatiladigan komponentlar uchun katta yutuq.
      </p>
      <Callout type="note" title="Muhim qoida">
        Konteyner elementning o'zi o'z ichidagi uslubga ta'sir qila olmaydi: siz{' '}
        <code>@container</code> ichida konteynerning <em>bolalarini</em> bezaysiz, konteynerni
        emas. Shuning uchun odatda alohida o'rovchi element kerak.
      </Callout>

      <h2>Container query birliklari</h2>
      <CodeBlock lang="css">{`.sarlavha {
  font-size: clamp(1rem, 5cqi, 2rem);   /* 1cqi = konteyner kengligining 1% */
}`}</CodeBlock>
      <ul>
        <li><code>cqi</code> — konteynerning inline (gorizontal) o'lchamining 1 foizi.</li>
        <li><code>cqw</code>, <code>cqh</code> — kenglik va balandlik.</li>
      </ul>

      <h2>Qachon qaysi biri?</h2>
      <ul>
        <li><strong>Media query</strong> — sahifaning umumiy maketi (navigatsiya, sidebar bor-yo'qligi).</li>
        <li><strong>Container query</strong> — qayta ishlatiladigan komponentlar (karta, widget, forma).</li>
      </ul>

      <Quiz
        question="Container query ishlashi uchun ota-elementga nima berilishi shart?"
        options={["display: flex", "container-type", "position: relative", "@media"]}
        correctIndex={1}
        explanation="container-type (odatda inline-size) elementni o'lchamini kuzatish mumkin bo'lgan konteynerga aylantiradi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Moslashuvchan mahsulot kartasi">
        <p>
          <code>.mahsulot-quti</code> konteyner bo'lsin. <code>.mahsulot</code> odatda
          ustma-ust (rasm tepada, matn pastda); konteyner 400px dan kengroq bo'lsa, rasm
          chapda 140px, matn o'ngda bo'lsin.
        </p>
        <Solution>
          <CodeBlock lang="css">{`.mahsulot-quti {
  container-type: inline-size;
}

.mahsulot {
  display: grid;
  gap: 1rem;
}

@container (min-width: 400px) {
  .mahsulot {
    grid-template-columns: 140px 1fr;
    align-items: start;
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Container query komponentni o'z konteyneri o'lchamiga qarab moslashtiradi.</li>
        <li><code>container-type: inline-size</code> + <code>@container (min-width: ...)</code>.</li>
        <li>Media query — umumiy maket uchun, container query — qayta ishlatiladigan komponentlar uchun.</li>
        <li>Konteynerning o'zini emas, ichidagi elementlarni bezaysiz.</li>
      </KeyPoints>
    </>
  )
}
