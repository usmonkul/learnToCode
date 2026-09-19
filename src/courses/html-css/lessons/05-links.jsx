import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Havolalar",
  section: "HTML",
}

export default function LinksLesson() {
  return (
    <>
      <p>
        Havolalar (links) veb-ni "veb" qiladi: ular sahifalarni bir-biri bilan bog'laydi.
        Havola <code>{`<a>`}</code> (anchor — langar) elementi bilan yaratiladi.
      </p>
      <CodeBlock lang="html">{`<a href="https://developer.mozilla.org">MDN hujjatlari</a>`}</CodeBlock>
      <p>
        <code>href</code> atributi — havola manzili, elementning ichidagi matn esa
        foydalanuvchi bosadigan qism.
      </p>

      <h2>Havola turlari</h2>
      <CodeBlock lang="html">{`<!-- 1. Tashqi havola: to'liq manzil -->
<a href="https://example.com">Boshqa sayt</a>

<!-- 2. Ichki havola: o'z saytingizdagi boshqa fayl -->
<a href="about.html">Biz haqimizda</a>
<a href="pages/contact.html">Aloqa</a>

<!-- 3. Sahifa ichidagi bo'limga havola -->
<a href="#narxlar">Narxlarga o'tish</a>
<h2 id="narxlar">Narxlar</h2>

<!-- 4. Email va telefon -->
<a href="mailto:info@example.com">Xat yozing</a>
<a href="tel:+998901234567">Qo'ng'iroq qiling</a>`}</CodeBlock>

      <h2>Yangi oynada ochish</h2>
      <CodeBlock lang="html">{`<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Yangi tabda ochiladi
</a>`}</CodeBlock>
      <Callout type="warning" title="rel atributini unutmang">
        <code>target="_blank"</code> ishlatilganda <code>rel="noopener noreferrer"</code>{' '}
        qo'shing — bu ochilgan sahifaning sizning sahifangizni boshqarishiga yo'l qo'ymaydi
        (xavfsizlik).
      </Callout>

      <Callout type="tip" title="Yaxshi havola matni">
        "Bu yerni bosing" o'rniga havola nima haqida ekanini yozing: "Narxlar jadvalini
        ko'rish". Bu foydalanuvchilar, qidiruv tizimlari va ekran o'quvchilar uchun yaxshi.
      </Callout>

      <Quiz
        question="Havola manzili qaysi atributda yoziladi?"
        options={["src", "link", "href", "url"]}
        correctIndex={2}
        explanation="href (hypertext reference) atributi havola qayerga olib borishini belgilaydi. src esa rasm va skriptlar uchun."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Mini menyu">
        <p>
          Sahifada uchta havola yarating: yangi tabda ochiladigan MDN havolasi, email havolasi
          va sahifaning pastki qismidagi <code>id="pastki"</code> bo'limga o'tuvchi havola.
        </p>
        <Solution>
          <CodeBlock lang="html">{`<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">MDN</a>
<a href="mailto:men@example.com">Email yozish</a>
<a href="#pastki">Pastga o'tish</a>

<h2 id="pastki">Pastki bo'lim</h2>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>{`<a href="...">`}</code> havola yaratadi.</li>
        <li>Tashqi havola to'liq URL, ichki havola fayl yo'li bilan yoziladi.</li>
        <li><code>#id</code> sahifa ichidagi elementga o'tkazadi.</li>
        <li><code>target="_blank"</code> bilan birga <code>rel="noopener noreferrer"</code> yozing.</li>
      </KeyPoints>
    </>
  )
}
