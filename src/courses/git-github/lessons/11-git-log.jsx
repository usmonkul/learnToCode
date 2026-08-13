import CodeBlock from '@/components/content/CodeBlock'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'git log',
  section: 'Modul 2. Git asoslari',
}

export default function Lesson11GitLog() {
  return (
    <>
      <h2>Commit tarixini ko'rish (git log)</h2>
      <p>
        Repository'da saqlangan barcha commit'lar tarixini ko'rish uchun <code>git log</code> buyrug me'moriy buyrug'idan foydalaniladi. U loyihada kim, qachon va qanday o me'moriy o'zgarish qilganini ko'rsatadi.
      </p>

      <h2>git log natijasi tarkibi</h2>
      <p>
        Standard <code>git log</code> buyrug'i quyidagi ma'lumotlarni beradi:
      </p>
      <ul>
        <li><strong>Commit Hash (ID):</strong> Har bir commit uchun unikal 40 belgili SHA-1 identifikator (masalan: <code>a1b2c3d4e5...</code>).</li>
        <li><strong>Author (Muallif):</strong> Commit qilgan dasturchi ismi va emaili.</li>
        <li><strong>Date (Sana):</strong> Commit qilingan aniq vaqt.</li>
        <li><strong>Commit Message:</strong> Kiritilgan izoh.</li>
      </ul>

      <h2>git log --oneline bitta qatorda ko'rish</h2>
      <p>
        Tarix ko'payganda uni ixchamroq, har bir commit'ni bitta qatorda ko'rish juda qulay:
      </p>
      <CodeBlock lang="bash">{`git log --oneline`}</CodeBlock>

      <CodeBlock lang="text">{`a1b2c3d (HEAD -> main) Add project documentation
f4e5d6c Add basic styles
b7a8c9d Add index.html structure`}</CodeBlock>

      <Quiz
        question="Commit tarixini ixcham qilib, har bir commit'ni bitta qatorda ko'rish uchun qaysi buyruq ishlatiladi?"
        options={[
          'git log --short',
          'git log --oneline',
          'git log --mini',
          'git log --compact',
        ]}
        correctIndex={1}
        explanation="git log --oneline buyrug'i har bir commit'ning qisqacha hash ID si va izohini bitta qatorda chiqarib beradi."
      />

      <Exercise title="Mashq: Oxirgi commit'larni ko'rish">
        <p>
          Lokal repository'ingizda <code>git log --oneline</code> buyrug'ini kiriting va oxirgi bajarilgan 3-5 ta commit tarixingizni tahlil qiling.
        </p>
        <Solution>
          <CodeBlock lang="bash">{`$ git log --oneline -n 5
a1b2c3d Add documentation
f4e5d6c Update styles
b7a8c9d Add homepage layout`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>git log</code> repository'dagi barcha commit'lar tarixini ko'rsatadi.
        </li>
        <li>
          Har bir commit unikal Hash ID, muallif, sana va izohga ega.
        </li>
        <li>
          <code>git log --oneline</code> tarixni ixcham va qulay formatda chiqaradi.
        </li>
      </KeyPoints>
    </>
  )
}
