import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Vositalar va birinchi sahifa",
  section: "Boshlash",
}

export default function ToolsAndFirstPageLesson() {
  return (
    <>
      <p>
        HTML va CSS yozish uchun qimmat dasturlar kerak emas. Sizga faqat ikkita narsa yetarli:
        matn muharriri (code editor) va brauzer.
      </p>

      <h2>Kerakli vositalar</h2>
      <ul>
        <li>
          <strong>Kod muharriri:</strong> Visual Studio Code (VS Code) — bepul va eng
          mashhuri. Oddiy Notepad ham ishlaydi, lekin VS Code kodni ranglar bilan ajratib,
          xatolarni ko'rsatib beradi.
        </li>
        <li>
          <strong>Brauzer:</strong> Chrome, Firefox yoki Edge. Ular HTML faylni o'qib, sahifa
          shaklida ko'rsatadi.
        </li>
      </ul>
      <Callout type="tip" title="VS Code uchun foydali kengaytma">
        <strong>Live Server</strong> kengaytmasini o'rnating: kodni saqlaganingizda brauzer
        avtomatik yangilanadi va har safar qo'lda qayta yuklash shart bo'lmaydi.
      </Callout>

      <h2>Birinchi HTML fayl</h2>
      <ol>
        <li>Kompyuteringizda <code>my-site</code> nomli papka yarating.</li>
        <li>Uni VS Codeda oching va ichida <code>index.html</code> faylini yarating.</li>
        <li>Quyidagi kodni yozing va saqlang.</li>
        <li>Faylni brauzerda oching (ikki marta bosing yoki Live Server orqali).</li>
      </ol>
      <CodeBlock lang="html">{`<!DOCTYPE html>
<html lang="uz">
  <head>
    <meta charset="UTF-8" />
    <title>Mening birinchi sahifam</title>
  </head>
  <body>
    <h1>Salom, dunyo!</h1>
    <p>Men HTML o'rganyapman.</p>
  </body>
</html>`}</CodeBlock>
      <p>
        Brauzer oynasida katta "Salom, dunyo!" sarlavhasi va uning ostida abzats ko'rinadi.
        Brauzer yorlig'ida (tab) esa <code>title</code> ichidagi matn chiqadi.
      </p>

      <Callout type="note" title="Fayl nomi haqida">
        Bosh sahifa fayli odatda <code>index.html</code> deb nomlanadi: veb-serverlar papka
        ochilganda aynan shu faylni avtomatik ko'rsatadi. Fayl nomlarini kichik harflar bilan,
        bo'sh joysiz (kerak bo'lsa chiziqcha bilan) yozing.
      </Callout>

      <Quiz
        question="Saytning bosh sahifa faylini odatda qanday nomlashadi?"
        options={["home.txt", "main.css", "index.html", "start.doc"]}
        correctIndex={2}
        explanation="Veb-serverlar papka manzili so'ralganda avtomatik ravishda index.html faylini qaytaradi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: O'z sahifangiz">
        <p>
          <code>index.html</code> yarating va sarlavha o'rniga o'z ismingizni, abzatsda esa
          qaysi shaharda yashashingizni yozing. Brauzerda oching.
        </p>
        <Solution>
          <CodeBlock lang="html">{`<!DOCTYPE html>
<html lang="uz">
  <head>
    <meta charset="UTF-8" />
    <title>Aziz haqida</title>
  </head>
  <body>
    <h1>Aziz</h1>
    <p>Men Toshkentda yashayman.</p>
  </body>
</html>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Boshlash uchun kod muharriri (VS Code) va brauzer yetarli.</li>
        <li>HTML fayl <code>.html</code> kengaytmasi bilan saqlanadi.</li>
        <li>Bosh sahifa fayli odatda <code>index.html</code> deb nomlanadi.</li>
        <li>Live Server kengaytmasi o'zgarishlarni darhol ko'rsatadi.</li>
      </KeyPoints>
    </>
  )
}
