import CodeBlock from '@/components/content/CodeBlock'
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
      <h2>Commit nima?</h2>
      <p>
        <strong>Commit</strong> — bu Git'dagi eng fundamental tushunchalardan biridir. U Staging Area'dagi o'zgarishlarni loyihaning muayyan vaqtdagi <strong>snapshot (surati)</strong> sifatida saqlaydi va unga unikal ID (hash) hamda izoh beradi.
      </p>

      <h2>git commit buyrug'i va -m bayrog'i</h2>
      <p>
        Staging Area'dagi fayllarni saqlash uchun quyidagi buyruq ishlatiladi:
      </p>
      <CodeBlock lang="bash">{`git commit -m "Add homepage structure"`}</CodeBlock>
      <p>
        Bu yerda <code>-m</code> (message) bayrog'i commit haqida qisqacha, lekin ma'noli izoh yozish imkonini beradi.
      </p>

      <h2>Yaxshi va yomon Commit Message'lar</h2>
      <p>
        Commit izohlarini to'g'ri yozish jamoada ishlashning eng muhim qoidalaridan biridir:
      </p>

      <table className="my-4 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-canvas-muted">
            <th className="p-3 font-semibold text-ink">Yomon Commit Message (Noto'g'ri)</th>
            <th className="p-3 font-semibold text-ink">Yaxshi Commit Message (To'g'ri)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line">
            <td className="p-3 text-ink-muted"><code>fix</code>, <code>asdf</code>, <code>kod o'zgardi</code></td>
            <td className="p-3 text-ink-muted"><code>Fix navigation menu mobile layout</code></td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 text-ink-muted"><code>yangi fayl</code></td>
            <td className="p-3 text-ink-muted"><code>Add user registration form validation</code></td>
          </tr>
        </tbody>
      </table>

      <Quiz
        question="Commit yaratishda '-m' bayrog'i nima uchun kerak?"
        options={[
          'Fayllarni avtomatik o\'chirish uchun',
          'Commit uchun qisqacha izoh (message) kiritish uchun',
          'Loyihani GitHub\'ga yuklash uchun',
          'Yangi branch yaratish uchun',
        ]}
        correctIndex={1}
        explanation="-m (message) bayrog'i kiritilayotgan o'zgarishga qisqa va tushunarli izoh biriktiradi."
      />

      <Exercise title="Mashq: 3 ta alohida commit yaratish">
        <p>
          Quyidagi 3 ta o'zgarishni ketma-ket alohida commit sifatida saqlang:
        </p>
        <ol>
          <li><code>index.html</code> yarating, <code>git add .</code> qiling va <code>"Add index.html structure"</code> nomi bilan commit qiling.</li>
          <li><code>style.css</code> yarating, <code>git add .</code> qiling va <code>"Add basic styles"</code> nomi bilan commit qiling.</li>
          <li><code>README.md</code> yarating, <code>git add .</code> qiling va <code>"Add project documentation"</code> nomi bilan commit qiling.</li>
        </ol>
        <Solution>
          <CodeBlock lang="bash">{`git add index.html
git commit -m "Add index.html structure"

git add style.css
git commit -m "Add basic styles"

git add README.md
git commit -m "Add project documentation"`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Commit — Staging Area'dagi fayllarni snapshot sifatida saqlaydi.
        </li>
        <li>
          <code>git commit -m "izoh"</code> buyrug'i commit yaratishning asosiy usulidir.
        </li>
        <li>
          Commit izohlari (message) har doim aniq va tushunarli bo'lishi kerak.
        </li>
      </KeyPoints>
    </>
  )
}
