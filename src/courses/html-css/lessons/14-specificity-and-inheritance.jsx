import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Meros va ustunlik",
  section: "CSS asoslari",
}

export default function SpecificityAndInheritanceLesson() {
  return (
    <>
      <p>
        "Nima uchun CSSim ishlamayapti?" — yangi boshlovchilarning eng ko'p beradigan savoli.
        Javob ko'pincha bir elementga bir nechta qoida tegishli bo'lganda qaysi biri g'olib
        bo'lishini bilishda. Bu CSS nomidagi "Cascading" (pog'onali) so'zining ma'nosi.
      </p>

      <h2>Meros (inheritance)</h2>
      <p>
        Ba'zi xossalar (rang, shrift, matn tekislash) ota-elementdan bolalarga{' '}
        <strong>avtomatik o'tadi</strong>. Bir marta <code>body</code>ga yozsangiz, ichidagi
        hamma matnga ta'sir qiladi.
      </p>
      <CodeBlock lang="css">{`body {
  color: #222;
  font-family: Arial, sans-serif;
}
/* p, li, h1... hammasi shu rang va shriftni meros qiladi */`}</CodeBlock>
      <p>
        Lekin <code>border</code>, <code>margin</code>, <code>padding</code>, <code>background</code>{' '}
        kabi xossalar meros bo'lmaydi.
      </p>

      <h2>Ziddiyat bo'lsa nima bo'ladi?</h2>
      <p>Brauzer g'olibni quyidagi tartibda aniqlaydi:</p>
      <ol>
        <li><strong>Muhimlik (importance):</strong> <code>!important</code> hamma narsadan ustun (undan qoching).</li>
        <li><strong>Aniqlik (specificity):</strong> aniqroq selektor g'olib.</li>
        <li><strong>Tartib:</strong> aniqlik teng bo'lsa, faylda keyin yozilgan g'olib.</li>
      </ol>

      <h2>Aniqlik darajasi</h2>
      <p>Selektorlarni kuchi bo'yicha eng oddiydan eng kuchliga tartiblash:</p>
      <ul>
        <li>Element (<code>p</code>) — eng zaif.</li>
        <li>Class (<code>.karta</code>), atribut, pseudo-class — o'rtacha.</li>
        <li>ID (<code>#asosiy</code>) — kuchli.</li>
        <li>Inline <code>style</code> — undan ham kuchli.</li>
      </ul>
      <CodeBlock lang="css">{`p { color: blue; }          /* eng zaif */
.matn { color: green; }     /* kuchliroq */
#maxsus { color: red; }     /* eng kuchli */`}</CodeBlock>
      <CodeBlock lang="html">{`<p class="matn" id="maxsus">Bu matn qanday rangda?</p>
<!-- Javob: qizil, chunki ID selektori kuchliroq -->`}</CodeBlock>

      <Callout type="warning" title="!important odat qilmang">
        <code>!important</code> muammoni vaqtincha yopadi, lekin keyin uni bekor qilish uchun
        yana <code>!important</code> kerak bo'ladi. Buning o'rniga selektorni aniqroq qiling
        yoki tartibni to'g'rilang.
      </Callout>

      <Quiz
        question="Ikkita qoidaning aniqligi teng bo'lsa, qaysi biri qo'llanadi?"
        options={[
          "Faylda oldin yozilgani",
          "Faylda keyin yozilgani",
          "Qisqaroq yozilgani",
          "Tasodifiy",
        ]}
        correctIndex={1}
        explanation="Aniqlik bir xil bo'lsa, keyingi qoida oldingisini bekor qiladi. Aynan shuning uchun CSSda tartib muhim."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Qaysi rang?">
        <p>
          Quyidagi CSS va HTML berilgan. <code>{`<p class="a" id="b">`}</code> qanday rangda
          bo'ladi va nima uchun?
        </p>
        <CodeBlock lang="css">{`p { color: red; }
.a { color: blue; }
#b { color: green; }`}</CodeBlock>
        <Solution>
          <p>
            Yashil. Uchala qoida ham mos keladi, lekin ID selektori (<code>#b</code>) eng
            yuqori aniqlikka ega.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Rang, shrift kabi xossalar bolalarga meros bo'ladi.</li>
        <li>Ziddiyatda: muhimlik, keyin aniqlik (ID kuchli, class o'rtacha, element zaif), keyin tartib.</li>
        <li><code>!important</code>dan qoching.</li>
        <li>Selektorlarni oddiy va past aniqlikda saqlash — yaxshi odat.</li>
      </KeyPoints>
    </>
  )
}
