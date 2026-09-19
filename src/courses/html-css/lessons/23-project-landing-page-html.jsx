import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Loyiha: landing sahifa (HTML)",
  section: "Loyiha",
}

export default function ProjectLandingPageHtmlLesson() {
  return (
    <>
      <p>
        Yakuniy loyiha: kichik mahsulot yoki xizmat uchun <strong>landing sahifa</strong>{' '}
        (reklama sahifasi). Mavzuni o'zingiz tanlang: kofexona, dasturlash kursi, sport
        zali, shaxsiy portfolio. Avval HTML skeletini yozamiz, keyingi darsda bezaymiz.
      </p>

      <h2>Sahifa bo'limlari</h2>
      <ol>
        <li><strong>Header:</strong> logotip va navigatsiya.</li>
        <li><strong>Hero:</strong> katta sarlavha, qisqa tavsif va asosiy tugma (CTA).</li>
        <li><strong>Xususiyatlar:</strong> uchta afzallik kartochkasi.</li>
        <li><strong>Narxlar:</strong> narx tariflari.</li>
        <li><strong>Aloqa:</strong> forma.</li>
        <li><strong>Footer:</strong> mualliflik huquqi.</li>
      </ol>

      <h2>Skelet</h2>
      <CodeBlock lang="html">{`<!DOCTYPE html>
<html lang="uz">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Qahva Uyi — eng mazali qahva</title>
    <link rel="stylesheet" href="landing.css" />
  </head>
  <body>
    <header class="header">
      <div class="konteyner header__ichki">
        <a href="#" class="logo">Qahva Uyi</a>
        <nav>
          <ul class="menyu">
            <li><a href="#xususiyatlar">Afzalliklar</a></li>
            <li><a href="#narxlar">Narxlar</a></li>
            <li><a href="#aloqa">Aloqa</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="konteyner">
          <h1>Har kuni yangi ta'm</h1>
          <p>Yangi qovurilgan donalardan tayyorlangan qahva — sizning shahringizda.</p>
          <a href="#aloqa" class="tugma">Stol band qilish</a>
        </div>
      </section>

      <section id="xususiyatlar" class="konteyner">
        <h2>Nega aynan biz?</h2>
        <div class="kartalar">
          <article class="karta">
            <h3>Yangi donalar</h3>
            <p>Har hafta yangi qovuriladi.</p>
          </article>
          <article class="karta">
            <h3>Tez xizmat</h3>
            <p>Buyurtma 5 daqiqada tayyor.</p>
          </article>
          <article class="karta">
            <h3>Qulay muhit</h3>
            <p>Ishlash va suhbat uchun ideal.</p>
          </article>
        </div>
      </section>

      <section id="narxlar" class="konteyner">
        <h2>Narxlar</h2>
        <table>
          <thead>
            <tr><th>Ichimlik</th><th>Narx</th></tr>
          </thead>
          <tbody>
            <tr><td>Espresso</td><td>15 000 so'm</td></tr>
            <tr><td>Kapuchino</td><td>22 000 so'm</td></tr>
            <tr><td>Latte</td><td>24 000 so'm</td></tr>
          </tbody>
        </table>
      </section>

      <section id="aloqa" class="konteyner">
        <h2>Bog'laning</h2>
        <form>
          <label for="ism">Ismingiz</label>
          <input type="text" id="ism" name="ism" required />
          <label for="telefon">Telefon</label>
          <input type="tel" id="telefon" name="telefon" required />
          <button type="submit" class="tugma">Yuborish</button>
        </form>
      </section>
    </main>

    <footer class="footer">
      <div class="konteyner">
        <p>&copy; 2026 Qahva Uyi</p>
      </div>
    </footer>
  </body>
</html>`}</CodeBlock>

      <Callout type="note" title="Class nomlari">
        Bu yerda <code>header__ichki</code> kabi nomlar ko'rinadi. Bu <strong>BEM</strong>{' '}
        uslubi: <code>blok__element</code>. Advanced kursda batafsil o'rganasiz, hozircha
        oddiy "qaysi qismga tegishli" belgisi deb qabul qiling.
      </Callout>

      <Quiz
        question="Nega landing sahifada bitta h1, bir nechta h2 va h3 ishlatiladi?"
        options={[
          "Chunki brauzer faqat bitta h1 ni ko'rsatadi",
          "Sarlavhalar sahifaning mantiqiy ierarxiyasini bildiradi",
          "Brauzer h2 ni ko'proq qo'llab-quvvatlaydi",
          "Bu CSS talabi",
        ]}
        correctIndex={1}
        explanation="h1 — sahifa mavzusi, h2 — asosiy bo'limlar, h3 — ularning ichidagi kichik bo'limlar. Bu ierarxiya foydalanuvchi va qidiruv tizimlariga tuzilmani tushuntiradi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: O'z mavzuingiz">
        <p>
          Namunani o'z mavzuingizga moslashtiring: nom, matnlar, xususiyatlar va narxlarni
          almashtiring. Yana bitta bo'lim qo'shing: "Mijozlar fikri" (<code>section</code>{' '}
          ichida ikkita <code>blockquote</code>).
        </p>
        <Solution>
          <CodeBlock lang="html">{`<section id="fikrlar" class="konteyner">
  <h2>Mijozlar fikri</h2>
  <blockquote>
    <p>Shahardagi eng yaxshi qahva!</p>
    <footer>— Malika</footer>
  </blockquote>
  <blockquote>
    <p>Xizmat juda tez va ochiq ko'ngilli.</p>
    <footer>— Jasur</footer>
  </blockquote>
</section>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Landing sahifa: header, hero, xususiyatlar, narxlar, aloqa, footer.</li>
        <li>Avval HTML tuzilmasini semantik yozing, keyin bezang.</li>
        <li>Bo'limlarga <code>id</code> berib, navigatsiyani havolalar bilan bog'lang.</li>
        <li>Class nomlari elementning roliga ishora qilsin, ko'rinishiga emas.</li>
      </KeyPoints>
    </>
  )
}
