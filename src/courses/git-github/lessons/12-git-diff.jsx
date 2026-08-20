import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'git diff',
  section: 'Modul 2. Git asoslari',
}

export default function Lesson12GitDiff() {
  return (
    <>
      <h2>git diff (O'zgarishlarni solishtirish) nima?</h2>
      <p>
        <strong>git diff</strong> — bu fayllarga kiritilgan o'zgarishlarni satrma-satr aniq solishtirib ko'rsatuvchi buyruqdir.
        U qaysi satrlar qo'shilganini (<code>+</code> yashil) va qaysi satrlar o'chirilganini (<code>-</code> qizil) aniq ko'rsatadi.
      </p>

      <h2>git diff va git diff --staged</h2>
      <p>
        Git'da o'zgarishlarni solishtirishning 2 ta asosiy holati mavjud:
      </p>

      <h3>1. Working Directory va Staging Area o'rtasidagi farq</h3>
      <p>
        Faylni tahrirladingiz, lekin hali <code>git add</code> qilmadingiz. Ushbu o'zgarishlarni ko'rish uchun:
      </p>
      <CodeBlock lang="bash">{`git diff`}</CodeBlock>

      <h3>2. Staging Area va Oxirgi Commit o'rtasidagi farq</h3>
      <p>
        Faylni <code>git add</code> orqali tayyorlab qo'ydingiz, lekin hali <code>git commit</code> qilmadingiz. Staged holatdagi o'zgarishlarni ko'rish uchun:
      </p>
      <CodeBlock lang="bash">{`git diff --staged`}</CodeBlock>

      <h2>Diff natijasini o'qish</h2>
      <CodeBlock lang="diff">{`- <h1>Salom Dunyo</h1>
+ <h1>Xush kelibsiz loyihamizga!</h1>`}</CodeBlock>
      <p>
        Bu yerda <code>-</code> belgisi eski o'chirilgan qatorni, <code>+</code> belgisi esa yangi qo'shilgan qatorni bildiradi.
      </p>

      <Callout type="tip" title="Commit qilishdan oldin tekshiring">
        Har doim <code>git commit</code> qilishdan oldin <code>git diff --staged</code> orqali faqat kerakli o'zgarishlarni saqlayotganingizga ishonch hosil qiling.
      </Callout>

      <Quiz
        question="'git add' qilib Staging Area'ga o'tkazilgan o'zgarishlarni oxirgi commit bilan solishtirish uchun qaysi buyruq ishlatiladi?"
        options={[
          'git diff',
          'git diff --staged',
          'git status --diff',
          'git compare',
        ]}
        correctIndex={1}
        explanation="git diff --staged (yoki git diff --cached) Staging Area'dagi o'zgarishlarni oxirgi commit bilan solishtiradi."
      />

      <Exercise title="Mashq: O'zgarishlarni solishtirish">
        <p>
          1. <code>index.html</code> fayliga yangi qator qo'shing.<br />
          2. <code>git diff</code> buyrug'i orqali o'zgarishlarni ko'ring.<br />
          3. <code>git add index.html</code> bajaring va <code>git diff --staged</code> buyrug'i bilan tekshiring.
        </p>
        <Solution>
          <CodeBlock lang="bash">{`git diff
git add index.html
git diff --staged`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>git diff</code> saqlanmagan (unstaged) o'zgarishlarni ko'rsatadi.
        </li>
        <li>
          <code>git diff --staged</code> tayyorlangan (staged) o'zgarishlarni ko'rsatadi.
        </li>
        <li>
          <code>+</code> yangi qo'shilgan qator, <code>-</code> o'chirilgan qator.
        </li>
      </KeyPoints>
    </>
  )
}
