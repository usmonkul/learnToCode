import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Semantik tuzilma",
  section: "HTML",
}

export default function SemanticLayoutLesson() {
  return (
    <>
      <p>
        Sahifani bo'limlarga ajratish uchun <code>{`<div>`}</code> ni hamma joyga qo'yish
        mumkin, lekin bu "ma'nosiz quti". HTML5 sahifa qismlarining <strong>ma'nosini</strong>{' '}
        bildiradigan semantik (semantic) elementlarni taqdim etadi.
      </p>
      <CodeBlock lang="html">{`<!-- Semantik emas -->
<div class="header"> ... </div>

<!-- Semantik -->
<header> ... </header>`}</CodeBlock>

      <h2>Asosiy semantik elementlar</h2>
      <ul>
        <li><code>{`<header>`}</code> — sahifa yoki bo'lim boshi (logotip, sarlavha).</li>
        <li><code>{`<nav>`}</code> — asosiy navigatsiya havolalari.</li>
        <li><code>{`<main>`}</code> — sahifaning asosiy kontenti (sahifada bitta bo'ladi).</li>
        <li><code>{`<section>`}</code> — mavzuli bo'lim (odatda o'z sarlavhasi bilan).</li>
        <li><code>{`<article>`}</code> — mustaqil kontent: maqola, blog posti, kartochka.</li>
        <li><code>{`<aside>`}</code> — yon kontent: reklama, qo'shimcha havolalar.</li>
        <li><code>{`<footer>`}</code> — sahifa yoki bo'lim oxiri (aloqa, huquqlar).</li>
      </ul>

      <h2>Tipik sahifa</h2>
      <CodeBlock lang="html">{`<body>
  <header>
    <h1>Mening blogim</h1>
    <nav>
      <ul>
        <li><a href="/">Bosh sahifa</a></li>
        <li><a href="/about">Men haqimda</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h2>Birinchi maqola</h2>
      <p>Maqola matni...</p>
    </article>

    <aside>
      <h2>Mashhur postlar</h2>
    </aside>
  </main>

  <footer>
    <p>&copy; 2026 Mening blogim</p>
  </footer>
</body>`}</CodeBlock>

      <Callout type="note" title="div hali ham kerak">
        <code>{`<div>`}</code> (blok) va <code>{`<span>`}</code> (qator ichida) hech qanday ma'no
        bildirmaydi. Mos semantik element topilmaganda, asosan CSS uchun guruhlash kerak
        bo'lganda ishlating.
      </Callout>

      <h2>Nega semantika muhim?</h2>
      <ul>
        <li><strong>Accessibility:</strong> ekran o'quvchilar sahifa qismlariga tez o'tishi mumkin.</li>
        <li><strong>SEO:</strong> qidiruv tizimlari sahifani yaxshiroq tushunadi.</li>
        <li><strong>O'qilishi:</strong> kod tushunarli bo'ladi, jamoada ishlash osonlashadi.</li>
      </ul>

      <Quiz
        question="Sahifaning asosiy navigatsiya havolalari qaysi elementga o'raladi?"
        options={["header", "aside", "nav", "section"]}
        correctIndex={2}
        explanation="nav — asosiy navigatsiya bloki. U header ichida bo'lishi mumkin, lekin ma'nosi aynan navigatsiyadir."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Div dan semantikaga">
        <p>Quyidagi kodni semantik elementlar bilan qayta yozing.</p>
        <CodeBlock lang="html">{`<div class="top">
  <div class="menu">...</div>
</div>
<div class="content">
  <div class="post">...</div>
</div>
<div class="bottom">...</div>`}</CodeBlock>
        <Solution>
          <CodeBlock lang="html">{`<header>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
</main>
<footer>...</footer>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Semantik elementlar qismning ma'nosini bildiradi.</li>
        <li><code>header</code>, <code>nav</code>, <code>main</code>, <code>section</code>, <code>article</code>, <code>aside</code>, <code>footer</code> — asosiylari.</li>
        <li>Semantika accessibility va SEO uchun muhim.</li>
        <li><code>div</code> faqat mos semantik element bo'lmaganda ishlatiladi.</li>
      </KeyPoints>
    </>
  )
}
