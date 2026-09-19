import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Accessibility va ARIA",
  section: "Chuqur HTML",
}

export default function AccessibilityAndAriaLesson() {
  return (
    <>
      <p>
        Accessibility (a11y) — saytingizdan <strong>hamma</strong> foydalana olishi:
        ko'rish qobiliyati cheklangan, klaviaturadan foydalanadigan, ekran o'quvchi
        ishlatadigan yoki qo'li vaqtincha shikastlangan odamlar ham. Bu ixtiyoriy "qo'shimcha"
        emas: ko'p mamlakatlarda qonuniy talab, va ayni paytda sifatli veb-ishlab chiqishning
        belgisi.
      </p>

      <h2>Birinchi qoida: to'g'ri HTML</h2>
      <p>
        Accessibilityning 80 foizi semantik HTMLdan keladi. Tayyor <code>{`<button>`}</code>{' '}
        klaviaturada fokus oladi, Enter va Space bilan ishlaydi va ekran o'quvchiga "tugma"
        deb e'lon qilinadi. <code>{`<div onclick>`}</code> esa buning birortasini bermaydi.
      </p>
      <CodeBlock lang="html">{`<!-- Yomon -->
<div class="tugma">Yuborish</div>

<!-- Yaxshi -->
<button type="button">Yuborish</button>`}</CodeBlock>

      <h2>Klaviatura va fokus</h2>
      <ul>
        <li>Barcha interaktiv elementlarga Tab bilan yetib borish mumkin bo'lsin.</li>
        <li>Fokus ko'rinib turishi kerak: <code>:focus-visible</code> bilan uslub bering.</li>
        <li><code>tabindex="0"</code> element tab tartibiga qo'shadi, <code>tabindex="-1"</code> faqat dasturiy fokus uchun. Musbat qiymatlardan qoching.</li>
      </ul>
      <CodeBlock lang="css">{`:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}`}</CodeBlock>
      <p>Sahifa boshiga "asosiy kontentga o'tish" havolasini qo'shish ham foydali:</p>
      <CodeBlock lang="html">{`<a class="skip-link" href="#main">Asosiy kontentga o'tish</a>
...
<main id="main">...</main>`}</CodeBlock>

      <h2>ARIA: kerak bo'lganda</h2>
      <p>
        ARIA (Accessible Rich Internet Applications) atributlari HTML o'zi ifodalay
        olmaydigan ma'noni ekran o'quvchilarga yetkazadi.
      </p>
      <Callout type="warning" title="ARIAning birinchi qoidasi">
        Agar mos native HTML element bor bo'lsa, ARIA ishlatmang. Yomon ARIA — ARIA
        yo'qligidan yomonroq: u ekran o'quvchiga noto'g'ri ma'lumot beradi.
      </Callout>
      <CodeBlock lang="html">{`<!-- Faqat ikonka bo'lgan tugmaga nom -->
<button aria-label="Menyuni yopish">✕</button>

<!-- Ochiladigan menyu holati -->
<button aria-expanded="false" aria-controls="menyu">Menyu</button>
<ul id="menyu" hidden>...</ul>

<!-- Xato xabarini maydon bilan bog'lash -->
<input id="email" type="email" aria-describedby="email-xato" aria-invalid="true" />
<p id="email-xato" role="alert">Email noto'g'ri kiritilgan.</p>

<!-- Bezak rasmni yashirish -->
<img src="chiziq.svg" alt="" aria-hidden="true" />`}</CodeBlock>
      <ul>
        <li><code>aria-label</code> — ko'rinmaydigan nom.</li>
        <li><code>aria-expanded</code>, <code>aria-pressed</code>, <code>aria-current</code> — holat.</li>
        <li><code>aria-describedby</code> — qo'shimcha izoh bilan bog'lash.</li>
        <li><code>role="alert"</code> — xabarni darhol o'qib beradi.</li>
      </ul>

      <h2>Rang va matn</h2>
      <ul>
        <li>Oddiy matn kontrasti kamida <strong>4.5:1</strong> (WCAG AA), katta matn uchun 3:1.</li>
        <li>Ma'noni faqat rang bilan bermang (masalan, xato faqat qizil chegara bilan): matn yoki ikonka ham qo'shing.</li>
        <li>Havola matni o'zi tushunarli bo'lsin.</li>
      </ul>

      <Quiz
        question="Faqat ✕ belgisi bor tugmani ekran o'quvchi uchun tushunarli qilish uchun nima qo'shiladi?"
        options={[
          "title atributi qo'shmasdan qoldirish",
          "aria-label=\"Yopish\"",
          "tabindex=\"5\"",
          "role=\"img\"",
        ]}
        correctIndex={1}
        explanation="aria-label ko'rinmaydigan matnli nom beradi, ekran o'quvchi 'Yopish, tugma' deb o'qiydi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Accessibility audit">
        <p>Quyidagi kodda kamida uch xato bor. Toping va to'g'rilang.</p>
        <CodeBlock lang="html">{`<div class="tugma" onclick="yuborish()">Yuborish</div>
<img src="logo.png" />
<input type="text" placeholder="Ismingiz" />`}</CodeBlock>
        <Solution>
          <CodeBlock lang="html">{`<button type="button" onclick="yuborish()">Yuborish</button>
<img src="logo.png" alt="Kompaniya logotipi" />
<label for="ism">Ismingiz</label>
<input type="text" id="ism" placeholder="Masalan, Aziz" />`}</CodeBlock>
          <p>
            Xatolar: <code>div</code> tugma o'rnida ishlatilgan, rasmda <code>alt</code>{' '}
            yo'q, inputda <code>label</code> yo'q.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Semantik HTML — accessibilityning asosi.</li>
        <li>Barcha narsaga klaviaturadan yetib borish va fokus ko'rinib turishi kerak.</li>
        <li>ARIA faqat native HTML yetmaganda ishlatiladi.</li>
        <li>Kontrast kamida 4.5:1 va ma'no faqat rangga tayanmasin.</li>
      </KeyPoints>
    </>
  )
}
