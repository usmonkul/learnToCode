import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Loyiha: portfolio sayti (HTML)",
  section: "Loyiha",
}

export default function ProjectPortfolioHtmlLesson() {
  return (
    <>
      <p>
        Yakuniy loyiha: o'zingiz uchun to'liq responsive <strong>portfolio sayti</strong>.
        Unda kursdagi hamma narsa ishlatiladi: accessibility, semantik HTML, Grid, container
        query, o'zgaruvchilar, dark mode va animatsiya. Avval HTML'ni yozamiz.
      </p>

      <h2>Talablar</h2>
      <ul>
        <li>Semantik tuzilma va "asosiy kontentga o'tish" havolasi.</li>
        <li>To'liq klaviatura bilan boshqariladigan navigatsiya.</li>
        <li>Responsive rasmlar (<code>picture</code>/<code>srcset</code>) va <code>alt</code>.</li>
        <li>SEO va Open Graph teglari.</li>
        <li>Aloqa formasi (validatsiya bilan).</li>
      </ul>

      <h2>Bo'limlar</h2>
      <ol>
        <li><strong>Header:</strong> logotip, navigatsiya, mavzu (tema) almashtirish tugmasi.</li>
        <li><strong>Hero:</strong> ism, kasb, qisqa tavsif, CTA havolalari.</li>
        <li><strong>Loyihalar:</strong> 3–6 ta kartochka (Grid bilan).</li>
        <li><strong>Ko'nikmalar:</strong> ro'yxat.</li>
        <li><strong>Aloqa:</strong> forma.</li>
        <li><strong>Footer:</strong> ijtimoiy tarmoq havolalari.</li>
      </ol>

      <h2>HTML skeleti</h2>
      <CodeBlock lang="html">{`<!DOCTYPE html>
<html lang="uz">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="light dark" />
    <title>Aziz Karimov — Frontend dasturchi</title>
    <meta name="description" content="Aziz Karimovning portfolio sayti: loyihalar, ko'nikmalar va aloqa." />
    <meta property="og:title" content="Aziz Karimov — Frontend dasturchi" />
    <meta property="og:description" content="Portfolio va loyihalar." />
    <meta property="og:image" content="https://example.com/og.jpg" />
    <link rel="stylesheet" href="portfolio.css" />
  </head>
  <body>
    <a class="skip-link" href="#main">Asosiy kontentga o'tish</a>

    <header class="sayt-header">
      <div class="konteyner sayt-header__ichki">
        <a href="#" class="logo">Aziz.</a>
        <nav aria-label="Asosiy menyu">
          <ul class="menyu">
            <li><a href="#loyihalar">Loyihalar</a></li>
            <li><a href="#konikmalar">Ko'nikmalar</a></li>
            <li><a href="#aloqa">Aloqa</a></li>
          </ul>
        </nav>
        <button type="button" class="tema-tugma" aria-label="Mavzuni almashtirish">◐</button>
      </div>
    </header>

    <main id="main">
      <section class="hero konteyner">
        <p class="hero__salom">Salom, men</p>
        <h1 class="hero__sarlavha">Aziz Karimov</h1>
        <p class="hero__tavsif">Men tez, qulay va hamma uchun ochiq veb-saytlar yarataman.</p>
        <div class="hero__amallar">
          <a class="tugma" href="#loyihalar">Loyihalarni ko'rish</a>
          <a class="tugma tugma--ikkilamchi" href="#aloqa">Bog'lanish</a>
        </div>
      </section>

      <section id="loyihalar" class="konteyner" aria-labelledby="loyihalar-sarlavha">
        <h2 id="loyihalar-sarlavha">Loyihalar</h2>
        <div class="loyihalar">
          <article class="loyiha-karta">
            <picture>
              <source srcset="loyiha1.webp" type="image/webp" />
              <img src="loyiha1.jpg" alt="Qahvaxona saytining bosh sahifasi" width="600" height="400" loading="lazy" />
            </picture>
            <div class="loyiha-karta__matn">
              <h3 class="loyiha-karta__sarlavha">Qahva Uyi</h3>
              <p>Qahvaxona uchun landing sahifa.</p>
              <a href="https://example.com" class="loyiha-karta__havola">Saytni ko'rish</a>
            </div>
          </article>
          <!-- Yana 2-5 ta karta -->
        </div>
      </section>

      <section id="konikmalar" class="konteyner" aria-labelledby="konikmalar-sarlavha">
        <h2 id="konikmalar-sarlavha">Ko'nikmalar</h2>
        <ul class="konikmalar">
          <li>HTML</li><li>CSS</li><li>JavaScript</li><li>Git</li><li>Accessibility</li>
        </ul>
      </section>

      <section id="aloqa" class="konteyner" aria-labelledby="aloqa-sarlavha">
        <h2 id="aloqa-sarlavha">Bog'laning</h2>
        <form class="forma">
          <div class="maydon">
            <label for="ism">Ism</label>
            <input id="ism" name="ism" required minlength="2" autocomplete="name" />
          </div>
          <div class="maydon">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" required autocomplete="email" />
          </div>
          <div class="maydon">
            <label for="xabar">Xabar</label>
            <textarea id="xabar" name="xabar" rows="5" required></textarea>
          </div>
          <button type="submit" class="tugma">Yuborish</button>
        </form>
      </section>
    </main>

    <footer class="sayt-footer">
      <div class="konteyner">
        <p>&copy; 2026 Aziz Karimov</p>
      </div>
    </footer>
  </body>
</html>`}</CodeBlock>

      <Callout type="note" title="Nima uchun aria-labelledby?">
        Har bir <code>section</code>ni o'z sarlavhasi bilan bog'lasangiz, ekran o'quvchilar
        uni nomlangan hudud (region) sifatida e'lon qiladi va foydalanuvchi bo'limlar
        orasida oson yura oladi.
      </Callout>

      <Quiz
        question="'Asosiy kontentga o'tish' (skip link) kimlar uchun eng foydali?"
        options={[
          "Faqat mobil foydalanuvchilar uchun",
          "Klaviatura va ekran o'quvchi foydalanuvchilar uchun",
          "Faqat qidiruv botlari uchun",
          "Faqat dizaynerlar uchun",
        ]}
        correctIndex={1}
        explanation="Klaviatura foydalanuvchilari har safar butun navigatsiyani Tab bilan o'tishga majbur bo'lmasligi uchun skip link asosiy kontentga to'g'ridan-to'g'ri sakraydi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: O'z portfolioingiz">
        <p>
          Skeletni o'z ma'lumotlaringiz bilan to'ldiring: kamida 3 ta loyiha kartochkasi,
          ko'nikmalar ro'yxati va ishlaydigan aloqa formasi. Barcha rasmlarga mazmunli{' '}
          <code>alt</code> yozing. Keyingi darsda ularni bezaymiz.
        </p>
        <Solution>
          <CodeBlock lang="html">{`<article class="loyiha-karta">
  <img src="todo.jpg" alt="Vazifalar ro'yxati ilovasi skrinshoti" width="600" height="400" loading="lazy" />
  <div class="loyiha-karta__matn">
    <h3 class="loyiha-karta__sarlavha">Todo ilovasi</h3>
    <p>Vazifalarni boshqarish uchun oddiy ilova.</p>
    <a href="https://example.com/todo" class="loyiha-karta__havola">Ko'rish</a>
  </div>
</article>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Portfolio semantik HTML, accessibility va SEO asosida quriladi.</li>
        <li>Skip link va <code>aria-labelledby</code> klaviatura va ekran o'quvchilarga qulaylik yaratadi.</li>
        <li>BEM nomlash bilan CSSni keyin oson yozish mumkin.</li>
        <li>Rasmlarda <code>alt</code>, <code>width</code>/<code>height</code> va lazy loading bo'lsin.</li>
      </KeyPoints>
    </>
  )
}
