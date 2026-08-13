import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "GitHub'da fayllar va README",
  section: 'Modul 1. GitHub bilan tanishish',
}

export default function Lesson03GitHubdaFayllarVaReadme() {
  return (
    <>
      <h2>GitHub veb-interfeysida fayllar bilan ishlash</h2>
      <p>
        Hali kompyuteringizda Git terminal buyruqlarini ishlatmasdan turib ham, GitHub saytining o'zida fayllar yaratishingiz, tahrirlashingiz va o'chirishingiz mumkin.
      </p>

      <h3>1. Fayl yaratish (Create new file)</h3>
      <p>
        Repository sahifasida <strong>Add file</strong> → <strong>Create new file</strong> tugmasini bosing. Fayl nomini va kengaytmasini (masalan: <code>index.html</code>, <code>style.css</code>) yozing, kodini kiriting va sahifa pastidagi <strong>Commit changes</strong> tugmasini bosing.
      </p>

      <h3>2. Faylni tahrirlash (Edit file)</h3>
      <p>
        Kerakli faylni oching va o'ng yuqori qismdagi <strong>Qalamcha (Edit)</strong> tugmasini bosing. Kodga o'zgartirish kiritgach, yana <strong>Commit changes</strong> tugmasi orqali saqlang.
      </p>

      <h3>3. Faylni o'chirish (Delete file)</h3>
      <p>
        Faylni ochib, <strong>Chiqindi qutisi (Delete file)</strong> tugmasini bosing va o'chirishni tasdiqlash uchun <strong>Commit changes</strong> tugmasini bosing.
      </p>

      <Callout type="note" title="Commit iborasi nimani anglatadi?">
        GitHub'da <strong>Commit</strong> degani — kiritilgan o'zgarishlarni saqlash va versiyalar tarixiga belgilangan ma'lumot (xabar) bilan muhrlash deganidir.
      </Callout>

      <h2>README nima va u nega kerak?</h2>
      <p>
        <strong>README.md</strong> — bu har bir repository'ning yuzi va vizitka qog'ozidir. Ish beruvchilar yoki boshqa dasturchilar loyihangiz sahifasiga kirganlarida, birinchi bo'lib aynan README faylini ko'rishadi.
      </p>
      <p>
        README faylida odatda quyidagilar yoritiladi:
      </p>
      <ul>
        <li>Loyiha nomi va nima maqsadda yaratilgani</li>
        <li>Ishlatilgan texnologiyalar va kutubxonalar</li>
        <li>Loyihani kompyuterda ishga tushirish yo'riqnomasi</li>
        <li>Muallif haqida aloqa ma'lumotlari</li>
      </ul>

      <h2>Markdown tili sintaksisiga kirish</h2>
      <p>
        <code>.md</code> kengaytmasi <strong>Markdown</strong> belgilash tili deganidir. U matnni juda oson va chiroyli formatlash imkonini beradi:
      </p>

      <div className="my-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-canvas p-4">
          <h4 className="mt-0 text-sm font-semibold text-ink">Markdown Kodu</h4>
          <CodeBlock lang="markdown">{`# Katta sarlavha (H1)
## O'rta sarlavha (H2)
### Kichik sarlavha (H3)

**Qalin matn** va *kursiv matn*

- Birinchi element
- Ikkinchi element

[Google sayti](https://google.com)`}</CodeBlock>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-4">
          <h4 className="mt-0 text-sm font-semibold text-ink">Natija (Rendered)</h4>
          <div className="prose prose-sm text-ink">
            <h1 className="mt-0 text-lg font-bold">Katta sarlavha (H1)</h1>
            <h2 className="text-base font-semibold">O'rta sarlavha (H2)</h2>
            <h3 className="text-sm font-medium">Kichik sarlavha (H3)</h3>
            <p className="my-1">
              <strong>Qalin matn</strong> va <em>kursiv matn</em>
            </p>
            <ul className="my-1 pl-4">
              <li>Birinchi element</li>
              <li>Ikkinchi element</li>
            </ul>
            <p className="my-1 text-brand-600 underline">Google sayti</p>
          </div>
        </div>
      </div>

      <Quiz
        question="Markdown (.md) tilida eng katta sarlavha (H1) yaratish uchun qaysi belgilardan foydalaniladi?"
        options={['# Sarlavha', '## Sarlavha', '### Sarlavha', '**Sarlavha**']}
        correctIndex={0}
        explanation="Bitta panjara (#) belgisi eng katta H1 sarlavhasini hosil qiladi."
      />

      <Exercise title="Kichik mashq: README faylida dastlabki matnni yozish">
        <p>
          <code>my-first-project</code> repository'ingizdagi <code>README.md</code> faylini qalamcha (Edit) tugmasi orqali oching va ichiga quyidagi ma'lumotni yozing:
        </p>
        <CodeBlock lang="markdown">{`# My First Project

This is my first GitHub project.`}</CodeBlock>
        <p>So'ngra sahifa pastidagi <strong>Commit changes</strong> tugmasini bosing.</p>
        <Solution>
          <p>
            O'zgarishni saqlaganingizdan so'ng, repository asosiy sahifasiga qaytsangiz, README fayli chiroyli formatlangan sarlavha bilan namoyon bo'ladi!
          </p>
        </Solution>
      </Exercise>

      <Exercise title="Challenge: README faylini professional shaklga keltirish">
        <p>
          README.md faylingizni qayta tahrirlang va uni quyidagi murakkabroq Markdown sintaksislari bilan to'ldiring:
        </p>
        <ul>
          <li>Loyiha haqida to'liqroq ta'rif (paragraf)</li>
          <li>Ishlatilayotgan texnologiyalar ro'yxati (HTML, CSS)</li>
          <li>Aloqa uchun emailingiz va ijtimoiy tarmoq havolasi</li>
        </ul>
        <Solution>
          <CodeBlock lang="markdown">{`# My First GitHub Project

Bu mening GitHub'dagi birinchi amaliy loyiham. Ushbu repository orqali men Git va GitHub asoslarini o'rganmoqdaman.

## Ishlatilgan Texnologiyalar
- **HTML5** — Veb-sahifa strukturasi
- **CSS3** — Dizayn va stillar
- **Markdown** — Hujjatlashtirish

## Bog'lanish
Savollar yoki takliflar bo'lsa, men bilan [Email](mailto:example@gmail.com) orqali bog'lanishingiz mumkin.`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          GitHub veb-interfeysi orqali fayllarni to'g'ridan-to'g me yaratish, tahrirlash (Edit) va o'chirish (Delete) mumkin.
        </li>
        <li>
          Har qanday o'zgarish <strong>Commit changes</strong> tugmasi orqali versiyalar tarixiga saqlanadi.
        </li>
        <li>
          <code>README.md</code> fayli loyihaning yuzi bo'lib, loyiha nima haqidaligini tushuntiradi.
        </li>
        <li>
          Markdown sintaksisida sarlavhalar uchun <code>#</code>, qalin matn uchun <code>**matn**</code>, ro'yxatlar uchun <code>-</code> belgilari ishlatiladi.
        </li>
      </KeyPoints>
    </>
  )
}
