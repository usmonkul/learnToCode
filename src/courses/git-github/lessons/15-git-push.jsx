import CodeBlock from '@/components/content/CodeBlock'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'git push',
  section: 'Modul 3. Git + GitHub',
}

export default function Lesson15GitPush() {
  return (
    <>
      <h2>Push nima? (Local commit → GitHub)</h2>
      <p>
        Lokal kompyuteringizda <code>git commit</code> orqali saqlangan o'zgarishlarni GitHub serveriga yuklash jarayoni <strong>Push</strong> deb ataladi.
      </p>

      <h2>git push origin main buyrug'i</h2>
      <p>
        Kodingizni birinchi marta masofaviy serverga yuklash uchun quyidagi buyruq ishlatiladi:
      </p>
      <CodeBlock lang="bash">{`git push -u origin main`}</CodeBlock>

      <p>
        Bu buyruq tarkibi:
      </p>
      <ul>
        <li><code>push</code> — yuklash amali.</li>
        <li><code>-u</code> (upstream) — lokal branch'ni remote branch bilan doimiy ulash (keyinroq faqat <code>git push</code> kiritish kifoya bo'ladi).</li>
        <li><code>origin</code> — masofaviy server nomi.</li>
        <li><code>main</code> — yuklanayotgan branch (tarmoq) nomi.</li>
      </ul>

      <Quiz
        question="Lokal commit'larni GitHub'dagi 'main' branch'ga birinchi marta yuklash uchun qaysi buyruq ishlatiladi?"
        options={[
          'git upload origin main',
          'git push -u origin main',
          'git sync main',
          'git send origin main',
        ]}
        correctIndex={1}
        explanation="git push -u origin main buyrug'i commit'larni GitHub'ga yuklaydi va ulanish zanjirini o'rnatadi."
      />

      <Exercise title="Challenge: Local loyihangizni GitHub'ga push qiling">
        <p>
          Barcha lokal commit'laringizni GitHub'dagi masofaviy repository'ga push qiling va brauzerda GitHub sahifangizni yangilab, kodingiz chiqqanini tasdiqlang.
        </p>
        <Solution>
          <CodeBlock lang="bash">{`git push -u origin main`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>git push</code> lokal commit'larni masofaviy serverga yuklaydi.
        </li>
        <li>
          <code>-u</code> bayrog'i keyingi push buyruqlarini qisqartirishga xizmat qiladi.
        </li>
      </KeyPoints>
    </>
  )
}
