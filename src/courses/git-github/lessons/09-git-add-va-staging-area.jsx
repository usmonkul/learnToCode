import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'git add va Staging Area',
  section: 'Modul 2. Git asoslari',
}

export default function Lesson09GitAddVaStagingArea() {
  return (
    <>
      <h2>Staging Area (Tayyorlash hududi) nima?</h2>
      <p>
        <strong>Staging Area</strong> (ba'zan <em>Index</em> deb ham ataladi) — bu sizning o'zgargan fayllaringiz va rasmiy commit (saqlash) o'rtasidagi bufer hududdir.
      </p>
      <p>
        Tasavvur qiling, siz posilka qutisiga buyumlarni joylayapsiz (Staging Area). Barcha kerakli buyumlarni solib bo me me'moriy quti qopqog'ini yopasiz va pochta muhri bilan jo'natasiz (Commit).
      </p>

      <h2>git add buyrug'ining variantlari</h2>
      <p>
        Fayllarni Staging Area'ga o'tkazish uchun <code>git add</code> buyrug me me'moriy buyrug'idan foydalaniladi:
      </p>

      <h3>1. Konkret bitta faylni qo'shish</h3>
      <CodeBlock lang="bash">{`git add index.html`}</CodeBlock>

      <h3>2. Bir nechta tanlangan fayllarni qo'shish</h3>
      <CodeBlock lang="bash">{`git add index.html style.css`}</CodeBlock>

      <h3>3. Barcha o'zgargan va yangi fayllarni qo'shish</h3>
      <CodeBlock lang="bash">{`git add .`}</CodeBlock>

      <Callout type="note" title="Nuqta (.) nimani anglatadi?">
        <code>git add .</code> buyrug'idagi nuqta <em>"joriy papkadagi barcha o'zgargan fayllarni staging area'ga tushir"</em> degan ma'noni beradi.
      </Callout>

      <Quiz
        question="Barcha yangi va o'zgargan fayllarni bittada Staging Area'ga qo'shish uchun qaysi buyruq ishlatiladi?"
        options={[
          'git add all',
          'git add .',
          'git stage *',
          'git commit .',
        ]}
        correctIndex={1}
        explanation="git add . buyrug'i joriy papkadagi barcha o'zgarishlarni tayyorlash hududiga o'tkazadi."
      />

      <Exercise title="Mini challenge: Tanlab Staging Area'ga o'tkazish">
        <p>
          Sizda 3 ta fayl mavjud: <code>index.html</code>, <code>style.css</code> va <code>script.js</code>.
        </p>
        <p>
          Ushbu 3 ta fayldan faqat <code>index.html</code> va <code>style.css</code> fayllarini Staging Area'ga o'tkazing, <code>script.js</code> esa Untracked holatida qolsin.
        </p>
        <Solution>
          <CodeBlock lang="bash">{`git add index.html style.css`}</CodeBlock>
          <p>
            Keyin <code>git status</code> buyrug'ini kiritsangiz, ikkita fayl yashil (Staged), bitta fayl esa qizil (Untracked) bo'lib turadi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Staging Area — commit qilishdan oldingi tayyorlov sahnasidir.
        </li>
        <li>
          <code>git add &lt;fayl&gt;</code> muayyan faylni Staged holatiga o'tkazadi.
        </li>
        <li>
          <code>git add .</code> joriy papkadagi barcha fayllarni Staged holatiga o'tkazadi.
        </li>
      </KeyPoints>
    </>
  )
}
