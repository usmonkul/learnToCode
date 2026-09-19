import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Meta teglar va SEO",
  section: "Chuqur HTML",
}

export default function MetaAndSeoLesson() {
  return (
    <>
      <p>
        Sahifangiz qidiruv natijalarida qanday ko'rinishi va ijtimoiy tarmoqda
        ulashilganda qanday karta chiqishi <code>head</code> ichidagi ma'lumotlarga bog'liq.
        Foydalanuvchi ko'rmaydigan, lekin juda muhim qism.
      </p>

      <h2>Asosiy meta teglar</h2>
      <CodeBlock lang="html">{`<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Qahva Uyi — Toshkentdagi eng mazali qahva</title>
  <meta
    name="description"
    content="Yangi qovurilgan donalardan tayyorlangan qahva. Chilonzor tumanida, har kuni 8:00 dan 22:00 gacha."
  />
  <link rel="canonical" href="https://qahvauyi.uz/" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <meta name="theme-color" content="#7c3f1d" />
</head>`}</CodeBlock>
      <ul>
        <li><code>title</code> — qidiruv natijasidagi sarlavha va brauzer tabi. Noyob va 50–60 belgigacha bo'lsin.</li>
        <li><code>description</code> — natijadagi qisqa tavsif (taxminan 150 belgi). Reytingga to'g'ridan-to'g'ri ta'sir qilmaydi, lekin bosishlar sonini oshiradi.</li>
        <li><code>canonical</code> — bir xil kontent bir necha manzilda bo'lsa, asosiy manzil.</li>
      </ul>

      <h2>Open Graph va Twitter Card</h2>
      <p>
        Havola Telegram, Facebook yoki X'da ulashilganda ko'rinadigan karta shu teglar bilan
        boshqariladi.
      </p>
      <CodeBlock lang="html">{`<meta property="og:type" content="website" />
<meta property="og:title" content="Qahva Uyi" />
<meta property="og:description" content="Toshkentdagi eng mazali qahva." />
<meta property="og:image" content="https://qahvauyi.uz/og.jpg" />
<meta property="og:url" content="https://qahvauyi.uz/" />
<meta name="twitter:card" content="summary_large_image" />`}</CodeBlock>
      <Callout type="tip" title="Rasm o'lchami">
        Ijtimoiy tarmoq kartasi uchun rasm odatda 1200x630 piksel bo'ladi va to'liq (mutlaq)
        URL bilan ko'rsatilishi kerak.
      </Callout>

      <h2>robots</h2>
      <CodeBlock lang="html">{`<!-- Sahifani qidiruvga kiritmaslik (admin, rahmat sahifasi) -->
<meta name="robots" content="noindex, nofollow" />`}</CodeBlock>

      <h2>Tuzilgan ma'lumot (JSON-LD)</h2>
      <p>
        Qidiruv tizimlariga sahifa nima haqida ekanini mashina o'qiy oladigan shaklda
        aytishingiz mumkin:
      </p>
      <CodeBlock lang="html">{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "name": "Qahva Uyi",
  "address": "Chilonzor, Toshkent",
  "openingHours": "Mo-Su 08:00-22:00"
}
</script>`}</CodeBlock>

      <h2>SEO uchun HTML qoidalari</h2>
      <ul>
        <li>Sahifada bitta <code>h1</code> va mantiqiy sarlavha ierarxiyasi.</li>
        <li>Rasmlarga mazmunli <code>alt</code>.</li>
        <li>Havola matni ma'noli ("batafsil" emas, "narxlar jadvalini ko'rish").</li>
        <li>Semantik elementlar (<code>main</code>, <code>nav</code>, <code>article</code>).</li>
        <li>Tez yuklanish va mobil moslik.</li>
      </ul>
      <Callout type="note" title="Meta keywords">
        <code>{`<meta name="keywords">`}</code> ni qidiruv tizimlari ko'p yillardan beri
        hisobga olmaydi. Uni yozish shart emas.
      </Callout>

      <Quiz
        question="Havola ijtimoiy tarmoqda ulashilganda ko'rinadigan rasmni qaysi teg boshqaradi?"
        options={["meta name=\"description\"", "og:image", "link rel=\"icon\"", "canonical"]}
        correctIndex={1}
        explanation="og:image (Open Graph) ijtimoiy tarmoq kartasida ko'rsatiladigan rasmni belgilaydi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Head qismini tayyorlang">
        <p>
          O'z sayt loyihangiz uchun to'liq <code>head</code> yozing: charset, viewport, noyob
          title, description, favicon, va Open Graph (title, description, image).
        </p>
        <Solution>
          <CodeBlock lang="html">{`<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Aziz Karimov — Frontend dasturchi</title>
  <meta name="description" content="Aziz Karimovning portfolio sayti: loyihalar va aloqa." />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <meta property="og:title" content="Aziz Karimov — Frontend dasturchi" />
  <meta property="og:description" content="Portfolio va loyihalar." />
  <meta property="og:image" content="https://example.com/og.jpg" />
</head>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Har bir sahifaga noyob <code>title</code> va <code>description</code> yozing.</li>
        <li>Open Graph teglari ulashilgan havola ko'rinishini boshqaradi.</li>
        <li><code>canonical</code> va <code>robots</code> qidiruv tizimlariga yo'l-yo'riq beradi.</li>
        <li>SEOning asosi — semantik HTML, tezlik va sifatli kontent.</li>
      </KeyPoints>
    </>
  )
}
