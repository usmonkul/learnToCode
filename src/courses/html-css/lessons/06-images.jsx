import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Rasmlar",
  section: "HTML",
}

export default function ImagesLesson() {
  return (
    <>
      <p>
        Rasmlar sahifani jonli qiladi. Ular <code>{`<img>`}</code> elementi bilan qo'shiladi —
        bu yopilmaydigan (bo'sh) element.
      </p>
      <CodeBlock lang="html">{`<img src="images/mushuk.jpg" alt="Deraza oldida uxlayotgan mushuk" width="400" />`}</CodeBlock>

      <h2>Asosiy atributlar</h2>
      <ul>
        <li>
          <code>src</code> — rasm manzili (fayl yo'li yoki URL). Majburiy.
        </li>
        <li>
          <code>alt</code> — rasmning matnli tavsifi. Rasm yuklanmasa ko'rsatiladi, ekran
          o'quvchilar uni ovoz chiqarib o'qiydi, qidiruv tizimlari ham undan foydalanadi.
          Majburiy.
        </li>
        <li>
          <code>width</code> va <code>height</code> — o'lchamlar (piksellarda). Ularni
          yozish sahifa yuklanayotganda "sakrashlar"ning oldini oladi.
        </li>
      </ul>

      <Callout type="warning" title="alt matnini bo'sh qoldirmang">
        Ma'noli rasmga har doim aniq tavsif yozing. Faqat bezak bo'lgan rasm uchun{' '}
        <code>alt=""</code> (bo'sh) yozing — ekran o'quvchilar uni o'tkazib yuboradi.
      </Callout>

      <h2>Fayl yo'llari</h2>
      <CodeBlock lang="html">{`<!-- Bir xil papkada -->
<img src="logo.png" alt="Logotip" />

<!-- Ichki papkada -->
<img src="images/logo.png" alt="Logotip" />

<!-- Bir pog'ona yuqorida -->
<img src="../images/logo.png" alt="Logotip" />

<!-- Internetdagi rasm -->
<img src="https://example.com/rasm.jpg" alt="Tavsif" />`}</CodeBlock>

      <h2>figure va figcaption</h2>
      <p>Rasmga izoh (sarlavha) qo'shish uchun maxsus elementlar bor:</p>
      <CodeBlock lang="html">{`<figure>
  <img src="images/registon.jpg" alt="Registon maydoni kechqurun" />
  <figcaption>Samarqanddagi Registon maydoni.</figcaption>
</figure>`}</CodeBlock>

      <h2>Rasm formatlari</h2>
      <ul>
        <li><strong>JPG</strong> — fotosuratlar uchun.</li>
        <li><strong>PNG</strong> — shaffof fonli rasmlar va skrinshotlar uchun.</li>
        <li><strong>SVG</strong> — logotip va ikonkalar uchun (sifat yo'qolmaydi).</li>
        <li><strong>WebP</strong> — zamonaviy, kichik hajmli format.</li>
      </ul>

      <Quiz
        question="Rasm yuklanmasa yoki ekran o'quvchi ishlatilsa, qaysi atribut matn ko'rsatadi?"
        options={["title", "alt", "src", "caption"]}
        correctIndex={1}
        explanation="alt atributi rasmning matnli o'rnini bosuvchi tavsifdir. U foydalanuvchilar va qidiruv tizimlari uchun muhim."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Izohli rasm">
        <p>
          <code>figure</code> ichida rasm va izoh yarating. Rasm 300 piksel kenglikda
          bo'lsin va mazmunli <code>alt</code> matniga ega bo'lsin.
        </p>
        <Solution>
          <CodeBlock lang="html">{`<figure>
  <img src="images/tog.jpg" alt="Qor bilan qoplangan tog' cho'qqisi" width="300" />
  <figcaption>Chimyon tog'lari, qish.</figcaption>
</figure>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>{`<img>`}</code> yopilmaydi va <code>src</code>, <code>alt</code> atributlari majburiy.</li>
        <li>Ma'noli rasmga aniq <code>alt</code>, bezakka <code>alt=""</code> yozing.</li>
        <li><code>width</code>/<code>height</code> sahifa "sakrashi"ni oldini oladi.</li>
        <li><code>figure</code> + <code>figcaption</code> rasmga izoh qo'shadi.</li>
      </KeyPoints>
    </>
  )
}
