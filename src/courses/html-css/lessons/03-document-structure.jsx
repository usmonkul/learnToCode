import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "HTML hujjat tuzilishi",
  section: "Boshlash",
}

export default function DocumentStructureLesson() {
  return (
    <>
      <p>
        Oldingi darsda yozgan faylimiz har bir HTML sahifaning "skeleti" edi. Endi uning
        qismlarini birma-bir ko'rib chiqamiz.
      </p>

      <h2>Teglar va elementlar</h2>
      <p>
        HTML <strong>teglar</strong> (tags) bilan yoziladi. Ko'pchilik teg juft bo'ladi:
        ochuvchi <code>{`<p>`}</code> va yopuvchi <code>{`</p>`}</code> (yopuvchida
        qiya chiziq bor). Ikkalasi va orasidagi kontent birgalikda <strong>element</strong>{' '}
        deyiladi.
      </p>
      <CodeBlock lang="html">{`<p>Bu — abzats elementi.</p>
<!--  ^ ochuvchi teg    ^ yopuvchi teg -->`}</CodeBlock>
      <p>
        Ba'zi elementlar kontent saqlamaydi va yopilmaydi (bo'sh, void elementlar):{' '}
        <code>{`<br>`}</code>, <code>{`<img>`}</code>, <code>{`<hr>`}</code>,{' '}
        <code>{`<input>`}</code>.
      </p>

      <h2>Atributlar</h2>
      <p>
        Teg qo'shimcha ma'lumot olishi mumkin — bu <strong>atributlar</strong> (attributes).
        Ular ochuvchi tegda <code>nom="qiymat"</code> ko'rinishida yoziladi:
      </p>
      <CodeBlock lang="html">{`<a href="https://example.com" target="_blank">Saytga o'tish</a>`}</CodeBlock>

      <h2>Sahifaning asosiy qismlari</h2>
      <CodeBlock lang="html">{`<!DOCTYPE html>
<html lang="uz">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sahifa nomi</title>
  </head>
  <body>
    <!-- Foydalanuvchiga ko'rinadigan hamma narsa shu yerda -->
  </body>
</html>`}</CodeBlock>
      <ul>
        <li>
          <code>{`<!DOCTYPE html>`}</code> — brauzerga hujjat zamonaviy HTML5 ekanini aytadi.
        </li>
        <li>
          <code>{`<html lang="uz">`}</code> — barcha kontentni o'rab turadi; <code>lang</code>{' '}
          sahifa tilini bildiradi (qidiruv tizimlari va ekran o'quvchilar uchun muhim).
        </li>
        <li>
          <code>{`<head>`}</code> — sahifa haqidagi ma'lumotlar (sarlavha, kodlash, CSS
          ulanishi). Bu qism ekranda ko'rinmaydi.
        </li>
        <li>
          <code>{`<meta charset="UTF-8">`}</code> — o'zbekcha harflar (o', g', sh, ch) to'g'ri
          chiqishi uchun kodlash.
        </li>
        <li>
          <code>{`<meta name="viewport" ...>`}</code> — telefonlarda sahifa to'g'ri
          o'lchamda ko'rinishi uchun.
        </li>
        <li>
          <code>{`<body>`}</code> — ekranda ko'rinadigan barcha kontent.
        </li>
      </ul>

      <Callout type="tip" title="Izohlar">
        <code>{`<!-- ... -->`}</code> orasidagi matn izoh hisoblanadi: brauzer uni ko'rsatmaydi.
        O'zingizga eslatma qoldirish yoki kodni vaqtincha o'chirib turish uchun foydali.
      </Callout>

      <Quiz
        question="Brauzer oynasida ko'rinadigan kontent qaysi element ichiga yoziladi?"
        options={["head", "body", "title", "meta"]}
        correctIndex={1}
        explanation="Ekranda ko'rinadigan barcha narsa body ichida bo'ladi. head esa sahifa haqidagi ma'lumotlarni saqlaydi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Xatoni toping">
        <p>Quyidagi kodda ikkita xato bor. Toping va tuzating.</p>
        <CodeBlock lang="html">{`<html>
  <body>
    <h1>Mening sahifam
    <p>Salom!</p>
  </body>
  <head>
    <title>Sahifa</title>
  </head>
</html>`}</CodeBlock>
        <Solution>
          <p>
            Birinchi xato: <code>{`<h1>`}</code> yopilmagan (<code>{`</h1>`}</code> yetishmaydi).
            Ikkinchi xato: <code>{`<head>`}</code> <code>{`<body>`}</code>dan oldin kelishi kerak.
          </p>
          <CodeBlock lang="html">{`<html>
  <head>
    <title>Sahifa</title>
  </head>
  <body>
    <h1>Mening sahifam</h1>
    <p>Salom!</p>
  </body>
</html>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Element = ochuvchi teg + kontent + yopuvchi teg.</li>
        <li>Atributlar tegga qo'shimcha ma'lumot beradi: <code>nom="qiymat"</code>.</li>
        <li><code>head</code> — sahifa haqida ma'lumot, <code>body</code> — ko'rinadigan kontent.</li>
        <li>Har doim <code>lang</code>, <code>charset</code> va <code>viewport</code>ni yozing.</li>
      </KeyPoints>
    </>
  )
}
