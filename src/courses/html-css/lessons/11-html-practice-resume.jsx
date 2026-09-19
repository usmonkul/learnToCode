import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Amaliyot: rezyume sahifasi",
  section: "HTML",
}

export default function HtmlPracticeResumeLesson() {
  return (
    <>
      <p>
        HTML bo'limini rezyume (resume) sahifasi bilan mustahkamlaymiz. Hozircha u oddiy,
        "bezaksiz" ko'rinadi — bu normal, chunki CSSni hali o'rganmadik. Maqsad —{' '}
        <strong>to'g'ri va semantik tuzilma</strong>.
      </p>

      <h2>Reja</h2>
      <ul>
        <li><code>header</code>: ism, kasb va rasm.</li>
        <li><code>nav</code>: sahifa ichidagi bo'limlarga havolalar.</li>
        <li><code>main</code>: "Men haqimda", "Ko'nikmalar", "Tajriba" (jadval) va "Aloqa" (forma) bo'limlari.</li>
        <li><code>footer</code>: mualliflik huquqi.</li>
      </ul>

      <h2>Namuna</h2>
      <CodeBlock lang="html">{`<!DOCTYPE html>
<html lang="uz">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aziz Karimov — Rezyume</title>
  </head>
  <body>
    <header>
      <img src="aziz.jpg" alt="Aziz Karimovning portreti" width="150" />
      <h1>Aziz Karimov</h1>
      <p>Frontend dasturchi</p>
      <nav>
        <ul>
          <li><a href="#about">Men haqimda</a></li>
          <li><a href="#skills">Ko'nikmalar</a></li>
          <li><a href="#experience">Tajriba</a></li>
          <li><a href="#contact">Aloqa</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section id="about">
        <h2>Men haqimda</h2>
        <p>Men veb-saytlar yaratishni yaxshi ko'raman va har kuni yangi narsa o'rganaman.</p>
      </section>

      <section id="skills">
        <h2>Ko'nikmalar</h2>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>Git</li>
        </ul>
      </section>

      <section id="experience">
        <h2>Tajriba</h2>
        <table>
          <thead>
            <tr><th>Yil</th><th>Lavozim</th><th>Kompaniya</th></tr>
          </thead>
          <tbody>
            <tr><td>2025</td><td>Stajyor</td><td>Tech LLC</td></tr>
          </tbody>
        </table>
      </section>

      <section id="contact">
        <h2>Aloqa</h2>
        <form>
          <label for="ism">Ismingiz</label>
          <input type="text" id="ism" name="ism" required />
          <label for="xabar">Xabar</label>
          <textarea id="xabar" name="xabar" rows="4"></textarea>
          <button type="submit">Yuborish</button>
        </form>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 Aziz Karimov</p>
    </footer>
  </body>
</html>`}</CodeBlock>

      <Callout type="tip" title="Bu sahifani saqlab qo'ying">
        Keyingi CSS darslarida aynan shu sahifani bezaymiz. Fayl nomi <code>resume.html</code>{' '}
        bo'lsin va ma'lumotlarni o'zingizniki bilan almashtiring.
      </Callout>

      <Quiz
        question="Sahifa ichidagi 'Aloqa' bo'limiga o'tuvchi havola qanday yoziladi?"
        options={[
          `href="contact"`,
          `href="#contact" va bo'limda id="contact"`,
          `href="contact.html#"`,
          `id="#contact"`,
        ]}
        correctIndex={1}
        explanation={`Sahifa ichida o'tish uchun havola "#" bilan boshlanadi, elementda esa xuddi shu nomli id atributi bo'lishi kerak.`}
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: O'zingizning rezyumeingiz">
        <p>
          Namunani o'zingizning ma'lumotlaringiz bilan to'ldiring. Qo'shimcha ravishda "Ta'lim"
          bo'limini tartibli ro'yxat (<code>{`<ol>`}</code>) bilan qo'shing va bitta tashqi
          havolani (GitHub profilingiz) yangi tabda ochiladigan qiling.
        </p>
        <Solution>
          <CodeBlock lang="html">{`<section id="education">
  <h2>Ta'lim</h2>
  <ol>
    <li>2015–2020: 25-maktab</li>
    <li>2020–2024: Toshkent axborot texnologiyalari universiteti</li>
  </ol>
  <a href="https://github.com/username" target="_blank" rel="noopener noreferrer">
    GitHub profilim
  </a>
</section>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Sahifani <code>header</code>, <code>nav</code>, <code>main</code>, <code>footer</code> bilan tuzing.</li>
        <li>Bo'limlar uchun <code>section</code> + <code>id</code>, navigatsiya uchun <code>#id</code> havolalar.</li>
        <li>Turli HTML elementlari birga ishlatilishi mumkin: ro'yxat, jadval, forma, rasm.</li>
        <li>Endi bu tuzilmani CSS bilan bezaymiz.</li>
      </KeyPoints>
    </>
  )
}
