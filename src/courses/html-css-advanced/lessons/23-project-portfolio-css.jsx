import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Loyiha: portfolio sayti (CSS)",
  section: "Loyiha",
}

export default function ProjectPortfolioCssLesson() {
  return (
    <>
      <p>
        Endi <code>portfolio.css</code> yozamiz. Kursdagi barcha texnikalar bir joyda:
        qatlamlar, tokenlar, dark mode, Grid, container query, suyuq o'lchamlar va
        animatsiya.
      </p>

      <h2>1. Qatlamlar va tokenlar</h2>
      <CodeBlock lang="css">{`@layer reset, tokens, base, layout, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
  img { max-width: 100%; height: auto; display: block; }
}

@layer tokens {
  :root {
    color-scheme: light dark;
    --bg: light-dark(#ffffff, #0b1020);
    --bg-muted: light-dark(#f3f4f6, #131a2e);
    --text: light-dark(#111827, #e5e7eb);
    --text-muted: light-dark(#4b5563, #9ca3af);
    --border: light-dark(#e5e7eb, #26304a);
    --accent: light-dark(#2563eb, #60a5fa);

    --radius: 14px;
    --space: clamp(1rem, 3vw, 2rem);
    --fs-body: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
    --fs-h1: clamp(2.25rem, 1.4rem + 4vw, 4.5rem);
    --fs-h2: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
  }
}`}</CodeBlock>

      <h2>2. Asos va maket</h2>
      <CodeBlock lang="css">{`@layer base {
  body {
    font-family: system-ui, sans-serif;
    font-size: var(--fs-body);
    line-height: 1.6;
    background: var(--bg);
    color: var(--text);
  }

  h1, h2, h3 { line-height: 1.15; text-wrap: balance; }
  h2 { font-size: var(--fs-h2); }

  a { color: var(--accent); }

  :focus-visible {
    outline: 3px solid var(--accent);
    outline-offset: 3px;
  }

  [id] { scroll-margin-top: 5rem; }
  html { scroll-behavior: smooth; }

  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
  }
}

@layer layout {
  .konteyner {
    width: min(100% - 2 * var(--space), 1100px);
    margin-inline: auto;
    padding-block: clamp(2rem, 6vw, 5rem);
  }
}`}</CodeBlock>

      <h2>3. Header va skip link</h2>
      <CodeBlock lang="css">{`@layer components {
  .skip-link {
    position: absolute;
    left: 1rem;
    top: -4rem;
    padding: 0.5rem 1rem;
    background: var(--accent);
    color: var(--bg);
    border-radius: 8px;
    z-index: 100;
  }
  .skip-link:focus { top: 1rem; }

  .sayt-header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: color-mix(in srgb, var(--bg) 85%, transparent);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
  }

  .sayt-header__ichki {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-block: 0.75rem;
  }

  .logo { font-weight: 800; text-decoration: none; margin-right: auto; }

  .menyu {
    display: flex;
    gap: 1.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .menyu a { color: var(--text); text-decoration: none; }
  .menyu a:hover { color: var(--accent); }
}`}</CodeBlock>

      <h2>4. Hero va tugmalar</h2>
      <CodeBlock lang="css">{`@layer components {
  .hero__sarlavha {
    font-size: var(--fs-h1);
    margin: 0.25rem 0 1rem;
  }
  .hero__tavsif { max-width: 55ch; color: var(--text-muted); }
  .hero__amallar { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.5rem; }

  .tugma {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: var(--accent);
    color: var(--bg);
    font-weight: 700;
    text-decoration: none;
    border: 2px solid var(--accent);
    border-radius: 999px;
    cursor: pointer;
    transition: transform 200ms ease-out, background 200ms ease-out;
  }
  .tugma--ikkilamchi { background: transparent; color: var(--accent); }

  @media (hover: hover) {
    .tugma:hover { transform: translateY(-2px); }
  }
}`}</CodeBlock>

      <h2>5. Loyiha kartalari: Grid + container query</h2>
      <CodeBlock lang="css">{`@layer components {
  .loyihalar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
    gap: var(--space);
  }

  .loyiha-karta {
    container-type: inline-size;
    display: grid;
    background: var(--bg-muted);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }

  .loyiha-karta img {
    width: 100%;
    aspect-ratio: 3 / 2;
    object-fit: cover;
  }

  .loyiha-karta__matn { padding: 1.25rem; }
  .loyiha-karta__sarlavha { margin: 0 0 0.5rem; }

  @container (min-width: 420px) {
    .loyiha-karta { grid-template-columns: 180px 1fr; }
    .loyiha-karta img { height: 100%; aspect-ratio: auto; }
  }
}`}</CodeBlock>
      <Callout type="note" title="Nima uchun ikkala usul?">
        <code>auto-fit</code> Grid kartalar sonini ekranga moslaydi, container query esa har
        bir kartaning ichki maketini uning haqiqiy kengligiga moslaydi. Bu ikki xil
        vazifa.
      </Callout>

      <h2>6. Forma va ketma-ket kirish animatsiyasi</h2>
      <CodeBlock lang="css">{`@layer components {
  .forma { display: grid; gap: 1rem; max-width: 520px; }
  .maydon { display: grid; gap: 0.35rem; }

  .maydon input,
  .maydon textarea {
    font: inherit;
    padding: 0.7rem 0.9rem;
    color: var(--text);
    background: var(--bg-muted);
    border: 1px solid var(--border);
    border-radius: 10px;
  }

  .maydon:has(input:user-invalid, textarea:user-invalid) label { color: #dc2626; }
  input:user-invalid, textarea:user-invalid { border-color: #dc2626; }

  .sayt-footer { border-top: 1px solid var(--border); color: var(--text-muted); }
}

@layer utilities {
  @keyframes paydo-bol {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: no-preference) {
    .loyiha-karta {
      animation: paydo-bol 500ms ease-out both;
    }
    .loyiha-karta:nth-child(2) { animation-delay: 100ms; }
    .loyiha-karta:nth-child(3) { animation-delay: 200ms; }
  }
}`}</CodeBlock>

      <Callout type="tip" title="Yakuniy tekshiruv">
        Lighthouse'da accessibility va performance 90+ ball oling. Sahifani 320px
        kenglikda, 200% kattalashtirilgan matnda, qorong'u temada va faqat klaviatura bilan
        sinab ko'ring. Shundan keyingina loyihani tugadi deb hisoblang.
      </Callout>

      <Quiz
        question="Nega .loyiha-karta ichidagi maket media query emas, container query bilan yozilgan?"
        options={[
          "Chunki media query kartalarda ishlamaydi",
          "Karta qanday kenglikdagi joyga qo'yilishidan qat'i nazar o'ziga moslashishi uchun",
          "Chunki container query tezroq",
          "Bu majburiy",
        ]}
        correctIndex={1}
        explanation="Container query komponentni sahifa kengligiga emas, o'z konteyneri kengligiga moslashtiradi, shuning uchun karta istalgan joyda to'g'ri ko'rinadi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Mavzu almashtirish tugmasi">
        <p>
          Header'dagi <code>.tema-tugma</code> uchun CSS yozing va qo'lda tanlash uchun{' '}
          <code>data-theme</code> atributini qo'llab-quvvatlang. Tugma doira shaklida, 44x44
          piksel bo'lsin.
        </p>
        <Solution>
          <CodeBlock lang="css">{`.tema-tugma {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  font-size: 1.25rem;
  color: var(--text);
  background: var(--bg-muted);
  border: 1px solid var(--border);
  border-radius: 50%;
  cursor: pointer;
}

/* Qo'lda tanlangan tema tizim sozlamasidan ustun */
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"]  { color-scheme: dark; }`}</CodeBlock>
          <p>
            <code>light-dark()</code> funksiyasi <code>color-scheme</code> qiymatiga qarab
            ishlaydi, shuning uchun <code>data-theme</code> orqali <code>color-scheme</code>ni
            majburan o'zgartirish yetarli.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>@layer</code> va CSS tokenlar butun loyihani tartibli qiladi.</li>
        <li>Grid <code>auto-fit</code> sahifa maketini, container query komponent ichki maketini boshqaradi.</li>
        <li><code>light-dark()</code> + <code>color-scheme</code> dark mode'ni qisqa yozadi.</li>
        <li>Animatsiyalarni <code>prefers-reduced-motion</code> ga moslang va maketni har xil sharoitda sinang.</li>
        <li>Tabriklaymiz: endi siz professional darajadagi HTML va CSS yozishni bilasiz!</li>
      </KeyPoints>
    </>
  )
}
