import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Jadvallar",
  section: "HTML",
}

export default function TablesLesson() {
  return (
    <>
      <p>
        Jadvallar (tables) ma'lumotni qator va ustunlarda ko'rsatadi: dars jadvali, narxlar
        ro'yxati, natijalar. Ular faqat <strong>haqiqiy jadval ma'lumotlari</strong> uchun
        ishlatiladi, sahifani joylashtirish uchun emas.
      </p>

      <h2>Asosiy tuzilma</h2>
      <CodeBlock lang="html">{`<table>
  <thead>
    <tr>
      <th>Ism</th>
      <th>Yosh</th>
      <th>Shahar</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Aziz</td>
      <td>22</td>
      <td>Toshkent</td>
    </tr>
    <tr>
      <td>Malika</td>
      <td>25</td>
      <td>Samarqand</td>
    </tr>
  </tbody>
</table>`}</CodeBlock>
      <ul>
        <li><code>{`<table>`}</code> — butun jadval.</li>
        <li><code>{`<tr>`}</code> (table row) — qator.</li>
        <li><code>{`<th>`}</code> (table header) — sarlavha katak, odatda qalin va markazda.</li>
        <li><code>{`<td>`}</code> (table data) — oddiy katak.</li>
        <li><code>{`<thead>`}</code>, <code>{`<tbody>`}</code>, <code>{`<tfoot>`}</code> — jadval qismlari.</li>
        <li><code>{`<caption>`}</code> — jadval sarlavhasi (table ichining birinchi farzandi).</li>
      </ul>

      <h2>Kataklarni birlashtirish</h2>
      <p>
        <code>colspan</code> katakni bir necha ustunga, <code>rowspan</code> bir necha
        qatorga cho'zadi.
      </p>
      <CodeBlock lang="html">{`<tr>
  <th colspan="2">Narxlar</th>
</tr>
<tr>
  <td>Non</td>
  <td rowspan="2">5 000 so'm</td>
</tr>`}</CodeBlock>

      <Callout type="tip" title="Jadval ko'rinishi">
        Standart jadval chegarasiz va zich ko'rinadi. Chegaralar, oraliqlar va ranglarni CSS
        bilan beramiz — CSS bo'limida shu jadvalni bezashni ko'rasiz.
      </Callout>

      <Quiz
        question="Jadvalning sarlavha katagi qaysi element bilan yoziladi?"
        options={["td", "tr", "th", "thead"]}
        correctIndex={2}
        explanation="th — sarlavha katagi (table header). td oddiy ma'lumot katagi, tr qator, thead esa sarlavha qatorlari guruhi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Dars jadvali">
        <p>
          Ikki ustunli (Kun, Fan) jadval yarating: sarlavha qatori va kamida uchta ma'lumot
          qatori bo'lsin. <code>thead</code> va <code>tbody</code> ishlating.
        </p>
        <Solution>
          <CodeBlock lang="html">{`<table>
  <thead>
    <tr><th>Kun</th><th>Fan</th></tr>
  </thead>
  <tbody>
    <tr><td>Dushanba</td><td>Matematika</td></tr>
    <tr><td>Seshanba</td><td>Fizika</td></tr>
    <tr><td>Chorshanba</td><td>Informatika</td></tr>
  </tbody>
</table>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Jadval: <code>table</code> → <code>tr</code> (qator) → <code>th</code>/<code>td</code> (katak).</li>
        <li><code>thead</code>, <code>tbody</code>, <code>tfoot</code> jadvalni qismlarga ajratadi.</li>
        <li><code>colspan</code>/<code>rowspan</code> kataklarni birlashtiradi.</li>
        <li>Jadvalni faqat jadval ma'lumotlari uchun ishlating, sahifa dizayni uchun emas.</li>
      </KeyPoints>
    </>
  )
}
