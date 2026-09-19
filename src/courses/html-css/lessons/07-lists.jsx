import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Ro'yxatlar",
  section: "HTML",
}

export default function ListsLesson() {
  return (
    <>
      <p>
        Ro'yxatlar ma'lumotni tartibli ko'rsatish uchun ishlatiladi. Menyu, xarid ro'yxati,
        bosqichma-bosqich yo'riqnoma — hammasi ro'yxat.
      </p>

      <h2>Tartibsiz ro'yxat</h2>
      <p>
        <code>{`<ul>`}</code> (unordered list) belgili ro'yxat yaratadi. Har bir band{' '}
        <code>{`<li>`}</code> (list item) ichida yoziladi.
      </p>
      <CodeBlock lang="html">{`<ul>
  <li>Non</li>
  <li>Sut</li>
  <li>Tuxum</li>
</ul>`}</CodeBlock>

      <h2>Tartibli ro'yxat</h2>
      <p>
        Tartib muhim bo'lganda (masalan, retsept qadamlari) <code>{`<ol>`}</code> ishlatiladi:
        bandlar raqamlanadi.
      </p>
      <CodeBlock lang="html">{`<ol>
  <li>Suvni qaynating</li>
  <li>Guruch soling</li>
  <li>20 daqiqa pishiring</li>
</ol>`}</CodeBlock>
      <p>
        <code>{`<ol>`}</code> ga <code>start="5"</code> (5 dan boshlash) yoki <code>reversed</code>{' '}
        (teskari tartib) atributlarini berish mumkin.
      </p>

      <h2>Ichma-ich ro'yxatlar</h2>
      <p>Ro'yxat ichida yana ro'yxat bo'lishi mumkin. Ichki ro'yxat <code>{`<li>`}</code> ichiga yoziladi:</p>
      <CodeBlock lang="html">{`<ul>
  <li>Mevalar
    <ul>
      <li>Olma</li>
      <li>Nok</li>
    </ul>
  </li>
  <li>Sabzavotlar</li>
</ul>`}</CodeBlock>
      <Callout type="warning" title="Ichki ro'yxat joyi">
        Ichki <code>{`<ul>`}</code>ni to'g'ridan-to'g'ri tashqi <code>{`<ul>`}</code> ichiga emas,
        albatta biror <code>{`<li>`}</code> ichiga joylang. <code>{`<ul>`}</code>ning bevosita
        farzandi faqat <code>{`<li>`}</code> bo'la oladi.
      </Callout>

      <h2>Ta'rif ro'yxati</h2>
      <p>Atama va uning ta'rifi juftliklari uchun <code>{`<dl>`}</code>, <code>{`<dt>`}</code>, <code>{`<dd>`}</code> bor:</p>
      <CodeBlock lang="html">{`<dl>
  <dt>HTML</dt>
  <dd>Sahifa tuzilishini yozish tili.</dd>
  <dt>CSS</dt>
  <dd>Sahifa uslubini yozish tili.</dd>
</dl>`}</CodeBlock>

      <Quiz
        question="Retseptdagi ketma-ket qadamlar uchun qaysi ro'yxat mos?"
        options={["ul", "ol", "dl", "li"]}
        correctIndex={1}
        explanation="Tartib muhim bo'lganda ol (ordered list) ishlatiladi: bandlar avtomatik raqamlanadi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Menyu">
        <p>
          Sayt menyusini <code>{`<ul>`}</code> bilan yozing: "Bosh sahifa", "Kurslar", "Aloqa". Har
          bir band havola bo'lsin.
        </p>
        <Solution>
          <CodeBlock lang="html">{`<ul>
  <li><a href="index.html">Bosh sahifa</a></li>
  <li><a href="courses.html">Kurslar</a></li>
  <li><a href="contact.html">Aloqa</a></li>
</ul>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>{`<ul>`}</code> — belgili, <code>{`<ol>`}</code> — raqamli ro'yxat.</li>
        <li>Har bir band <code>{`<li>`}</code> ichida yoziladi.</li>
        <li>Ichma-ich ro'yxat <code>{`<li>`}</code> ichiga joylanadi.</li>
        <li>Navigatsiya menyulari ham odatda ro'yxat sifatida yoziladi.</li>
      </KeyPoints>
    </>
  )
}
