import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Dark mode va tema tizimi",
  section: "Professional CSS",
}

export default function DarkModeThemingLesson() {
  return (
    <>
      <p>
        Dark mode endi hamma joyda: tizim sozlamalari, ilovalar va saytlar. CSS
        o'zgaruvchilari (6-dars) bilan uni juda oson qilish mumkin: har bir rangni ikki
        marta yozish o'rniga, o'zgaruvchi qiymatlarini almashtirasiz.
      </p>

      <h2>1. Semantik tokenlar</h2>
      <p>
        Ranglarni ko'rinishiga ("oq", "qora") emas, <em>vazifasiga</em> ("sahifa foni",
        "asosiy matn") qarab nomlang:
      </p>
      <CodeBlock lang="css">{`:root {
  --bg: #ffffff;
  --bg-muted: #f3f4f6;
  --text: #111827;
  --text-muted: #4b5563;
  --border: #e5e7eb;
  --accent: #2563eb;
}

body {
  background: var(--bg);
  color: var(--text);
}

.karta {
  background: var(--bg-muted);
  border: 1px solid var(--border);
}`}</CodeBlock>

      <h2>2. Tizim sozlamasiga moslashish</h2>
      <CodeBlock lang="css">{`@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f172a;
    --bg-muted: #1e293b;
    --text: #f1f5f9;
    --text-muted: #94a3b8;
    --border: #334155;
    --accent: #60a5fa;
  }
}`}</CodeBlock>
      <p>
        Komponentlarning CSSini o'zgartirmaysiz: ular faqat tokenlardan foydalanadi.
      </p>
      <Callout type="tip" title="color-scheme">
        <code>:root {`{ color-scheme: light dark; }`}</code> bilan brauzerning o'zi yaratgan
        elementlar (skrollbar, formalar, tanlov) ham tema bilan mos keladi.
      </Callout>

      <h2>3. Qo'lda almashtirish tugmasi</h2>
      <p>
        Foydalanuvchiga tanlash imkonini berish uchun <code>html</code> elementiga{' '}
        <code>data-theme</code> atributi qo'yiladi (buni JavaScript bajaradi, CSS tomonini
        ko'rib chiqamiz):
      </p>
      <CodeBlock lang="css">{`:root {
  color-scheme: light dark;
  --bg: #ffffff;
  --text: #111827;
}

/* Tizim: qorong'u, lekin foydalanuvchi qo'lda "yorug'" tanlamagan bo'lsa */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #0f172a;
    --text: #f1f5f9;
  }
}

/* Foydalanuvchi qo'lda qorong'u tanlagan */
:root[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f1f5f9;
}`}</CodeBlock>
      <CodeBlock lang="html">{`<html lang="uz" data-theme="dark">`}</CodeBlock>

      <h2>4. light-dark() funksiyasi</h2>
      <p>Zamonaviy qisqa yozuv: ikkala rangni bir joyda yozasiz.</p>
      <CodeBlock lang="css">{`:root {
  color-scheme: light dark;
}

body {
  background: light-dark(#ffffff, #0f172a);
  color: light-dark(#111827, #f1f5f9);
}`}</CodeBlock>

      <h2>Dark mode dizayn maslahatlari</h2>
      <ul>
        <li>Sof qora (<code>#000</code>) va sof oq o'rniga yumshoqroq ranglar ishlating: ko'zni charchatmaydi.</li>
        <li>Qorong'u fonda soyalar deyarli ko'rinmaydi. Balandlikni fon rangining biroz ochiqroq tusi bilan ko'rsating.</li>
        <li>Yorqin ranglarni biroz to'yinmagan qiling: qora fonda ular "yonib" ko'rinadi.</li>
        <li>Rasmlar ham moslashishi kerak bo'lishi mumkin: <code>filter: brightness(0.9)</code>.</li>
        <li>Kontrast nisbatini ikkala temada ham tekshiring.</li>
      </ul>

      <Quiz
        question="Foydalanuvchi operatsion tizimda qorong'u temani tanlaganini CSSda qaysi media feature aniqlaydi?"
        options={[
          "prefers-color-scheme: dark",
          "prefers-reduced-motion: dark",
          "color: dark",
          "theme: dark",
        ]}
        correctIndex={0}
        explanation="prefers-color-scheme tizimning yorug' yoki qorong'u tema afzalligini bildiradi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Ikki temali kartochka">
        <p>
          Tokenlar (<code>--bg</code>, <code>--text</code>, <code>--accent</code>) bilan yorug'
          va qorong'u tema yarating. Tizim qorong'u bo'lsa, tokenlar o'zgarsin. Karta va
          tugma faqat tokenlardan foydalansin.
        </p>
        <Solution>
          <CodeBlock lang="css">{`:root {
  color-scheme: light dark;
  --bg: #ffffff;
  --text: #111827;
  --accent: #2563eb;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f172a;
    --text: #f1f5f9;
    --accent: #60a5fa;
  }
}

body {
  background: var(--bg);
  color: var(--text);
}

.karta {
  border: 1px solid var(--accent);
  border-radius: 12px;
  padding: 1rem;
}

.tugma {
  background: var(--accent);
  color: var(--bg);
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Semantik tokenlar (<code>--bg</code>, <code>--text</code>) temani almashtirishni osonlashtiradi.</li>
        <li><code>prefers-color-scheme</code> tizim afzalligiga moslashadi, <code>data-theme</code> qo'lda tanlashga imkon beradi.</li>
        <li><code>color-scheme</code> va <code>light-dark()</code> kodni qisqartiradi.</li>
        <li>Kontrastni ikkala temada ham tekshiring.</li>
      </KeyPoints>
    </>
  )
}
