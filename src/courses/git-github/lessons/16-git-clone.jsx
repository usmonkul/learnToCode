import CodeBlock from '@/components/content/CodeBlock'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'git clone',
  section: 'Modul 3. Git + GitHub',
}

export default function Lesson16GitClone() {
  return (
    <>
      <h2>git clone nima?</h2>
      <p>
        <strong>git clone</strong> — bu GitHub yoki masofaviy serverdagi mavjud repository'ning nusxasini (barcha fayllari va tarixi bilan) o'z kompyuteringizga yuklab olish buyrug'idir.
      </p>

      <h2>Buyruq ko'rinishi</h2>
      <CodeBlock lang="bash">{`git clone https://github.com/username/repository-name.git`}</CodeBlock>

      <h2>Clone jarayonida nima sodir bo'ladi?</h2>
      <ol>
        <li>Kompyuteringizda repository nomi bilan yangi papka yaratiladi.</li>
        <li>Loyihaning barcha fayllari va commit tarixi yuklanadi.</li>
        <li>Masofaviy <code>origin</code> ulanishi avtomatik ravishda sozlanadi.</li>
      </ol>

      <Quiz
        question="GitHub'dagi mavjud loyihani kompyuterga to'liq yuklab olish uchun qaysi buyruq ishlatiladi?"
        options={[
          'git download <URL>',
          'git clone <URL>',
          'git copy <URL>',
          'git fetch <URL>',
        ]}
        correctIndex={1}
        explanation="git clone buyrug'i masofaviy repository'ni kompyuterga nusxalaydi va barcha tarixni tiklaydi."
      />

      <Exercise title="Amaliyot: Boshqa dasturchi loyihasini clone qilish">
        <p>
          Terminalda ochiq kodli loyihani kompyuteringizga clone qilib ko'ring:
        </p>
        <Solution>
          <CodeBlock lang="bash">{`git clone https://github.com/octocat/Spoon-Knife.git
cd Spoon-Knife
git log --oneline`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>git clone</code> remote repository'ni kompyuterga to'liq nusxalaydi.
        </li>
        <li>
          Clone qilinganda <code>origin</code> ulanishi avtomatik o me me'moriy sozlanadi.
        </li>
      </KeyPoints>
    </>
  )
}
