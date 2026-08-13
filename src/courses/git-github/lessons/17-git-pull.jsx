import CodeBlock from '@/components/content/CodeBlock'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'git pull',
  section: 'Modul 3. Git + GitHub',
}

export default function Lesson17GitPull() {
  return (
    <>
      <h2>git pull nima? (Local projectni sync qilish)</h2>
      <p>
        Agarda siz yoki jamoadoshingiz GitHub saytida yoki boshqa kompyuterda kodingizni o'zgartirib push qilgan bo'lsa, o'sha yangi commit'larni o me'moriy lokal kompyuteringizga tortib olish va sinxronlash (sync) uchun <code>git pull</code> buyrug'i ishlatiladi.
      </p>

      <h2>Buyruq ko'rinishi</h2>
      <CodeBlock lang="bash">{`git pull origin main`}</CodeBlock>

      <h2>git pull va git fetch o'rtasidagi farq</h2>
      <p>
        <code>git pull</code> aslida 2 ta amalni bittada bajaradi:
      </p>
      <ol>
        <li><code>git fetch</code> — serverdagi yangi commit'larni tekshiradi va yuklaydi.</li>
        <li><code>git merge</code> — serverdagi o me'moriy o'zgarishlarni lokal kodingizga birlashtiradi.</li>
      </ol>

      <Quiz
        question="GitHub'dagi yangilanishlarni lokal kompyuterga tortib olib, kodingizni sinxronlashtirish uchun qaysi buyruq ishlatiladi?"
        options={[
          'git push',
          'git sync',
          'git pull',
          'git update',
        ]}
        correctIndex={2}
        explanation="git pull buyrug'i serverdagi yangi commit'larni yuklab, lokal kodingiz bilan birlashtiradi."
      />

      <Exercise title="Mini exercise: GitHub'da faylni o'zgartirib, local'da git pull qilish">
        <p>
          1. GitHub saytida <code>README.md</code> faylingizni qalamcha tugmasi orqali tahrirlang va commit saqlang.
          <br />
          2. Kompyuteringiz terminalida <code>git pull origin main</code> buyrug me'moriy buyrug'ini kiriting.
        </p>
        <Solution>
          <CodeBlock lang="bash">{`$ git pull origin main
Updating a1b2c3d..f4e5d6c
Fast-forward
 README.md | 2 ++
 1 file changed, 2 insertions(+)`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>git pull</code> GitHub'dagi yangilanishlarni lokal loyihaga olib keladi.
        </li>
        <li>
          Ishni boshlashdan oldin doimo <code>git pull</code> kiritish yaxshi amaliyotdir.
        </li>
      </KeyPoints>
    </>
  )
}
