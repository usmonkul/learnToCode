import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'git commit',
  section: 'Modul 2. Git asoslari',
}

export default function Lesson10GitCommit() {
  return (
    <>
      <h2>git commit (Versiyani muhrlash) nima?</h2>
      <p>
        <strong>Commit</strong> — bu loyihangizning muayyan vaqtdagi to'liq rasmi (snapshot) yoki holatidir. 
        Staging Area'ga yig'ilgan barcha o'zgarishlar <code>git commit</code> buyrug'i orqali Git ma'lumotlar bazasiga doimiy saqlanadi.
      </p>
      <p>
        Har bir commit o'zining unikal identifikatoriga (SHA-1 hash), muallifi, vaqti va nima o'zgarganini bildiruvchi xabariga ega bo'ladi.
      </p>

      <h2>git commit -m buyrug'i</h2>
      <p>
        Commit qilish uchun <code>-m</code> (message — xabar) parametri bilan qisqa va aniq izoh yoziladi:
      </p>
      <CodeBlock lang="bash">{`git commit -m "Add navigation bar"`}</CodeBlock>

      <h2>Commit xabarlarini yozish madaniyati</h2>
      <p>
        Yaxshi va tushunarli commit xabari kelajakda koddagi o'zgarishlarni oson topishga yordam beradi:
      </p>
      <ul>
        <li><strong>Yaxshi:</strong> <code>git commit -m "Add user login validation"</code></li>
        <li><strong>Yaxshi:</strong> <code>git commit -m "Fix mobile responsive bug in header"</code></li>
        <li><strong>Yomon:</strong> <code>git commit -m "fix"</code>, <code>git commit -m "asdasd"</code>, <code>git commit -m "update"</code></li>
      </ul>

      <Callout type="tip" title="Hozirgi zamon fe'lidan foydalaning">
        Commit xabarlarida odatda ingliz tilida buyruq/hozirgi zamon shakli (masalan: <em>"Add feature"</em>, <em>"Fix bug"</em>) ishlatiladi.
      </Callout>

      <Quiz
        question="Staging Area'dagi o'zgarishlarni izoh bilan birga rasmiy commit qilish uchun qaysi buyruq ishlatiladi?"
        options={[
          'git save -m "xabar"',
          'git commit -m "xabar"',
          'git push -m "xabar"',
          'git record -m "xabar"',
        ]}
        correctIndex={1}
        explanation="git commit -m 'xabar' buyrug'i Staged holatdagi fayllarni snapshot sifatida saqlaydi."
      />

      <Exercise title="Mashq: Birinchi rasmiy commit'ni yaratish">
        <p>
          1. <code>about.html</code> faylini yarating va unga kod yozing.<br />
          2. Uni Staging Area'ga o'tkazing.<br />
          3. <em>"Create about page"</em> xabari bilan commit qiling.
        </p>
        <Solution>
          <CodeBlock lang="bash">{`git add about.html
git commit -m "Create about page"`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>git commit</code> loyihaning joriy holatini doimiy snapshot sifatida saqlaydi.
        </li>
        <li>
          <code>-m</code> parametri orqali commit'ga qisqa va mazmunli izoh beriladi.
        </li>
        <li>
          Faqat Staging Area'ga (<code>git add</code> qilingan) qo'shilgan fayllar commit qilinadi.
        </li>
      </KeyPoints>
    </>
  )
}
