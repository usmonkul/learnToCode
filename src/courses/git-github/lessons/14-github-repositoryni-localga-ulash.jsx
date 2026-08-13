import CodeBlock from '@/components/content/CodeBlock'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "GitHub repository'ni local'ga ulash",
  section: 'Modul 3. Git + GitHub',
}

export default function Lesson14GitHubRepositoryniLocalgaUlash() {
  return (
    <>
      <h2>Lokal va Remote repository'ni o'zaro bog'lash</h2>
      <p>
        Kompyuteringizda yaratilgan lokal repository'ni GitHub'dagi bo'sh repository bilan ulasangiz, kodingizni bulutga yuklash imkoni paydo bo'ladi.
      </p>

      <h2>git remote add origin &lt;URL&gt;</h2>
      <p>
        Buning uchun quyidagi buyruq kiritiladi:
      </p>
      <CodeBlock lang="bash">{`git remote add origin https://github.com/username/my-project.git`}</CodeBlock>

      <h2>Bosqichma-bosqich jarayon</h2>
      <ol>
        <li>GitHub saytida yangi bo'sh repository yarating (masalan: <code>my-project</code>).</li>
        <li>Repository sahifasidagi HTTPS URL manzilini nusxalab oling.</li>
        <li>Kompyuterdagi loyiha terminalida <code>git remote add origin &lt;URL&gt;</code> buyrug'ini kiriting.</li>
        <li><code>git remote -v</code> orqali ulanish muvaffaqiyatli o'rnatilganini tekshiring.</li>
      </ol>

      <Quiz
        question="Lokal Git repository'ga masofaviy GitHub manzilini ulash uchun qaysi buyruq ishlatiladi?"
        options={[
          'git link origin <URL>',
          'git remote add origin <URL>',
          'git connect <URL>',
          'git push --set <URL>',
        ]}
        correctIndex={1}
        explanation="git remote add origin <URL> buyrug'i origin nomli masofaviy ulanishni lokal repository'ga qo'shadi."
      />

      <Exercise title="Mashq: Oldingi local loyihani GitHub'ga ulash">
        <p>
          GitHub'da yangi <code>my-project</code> nomli bo'sh repository yarating va uni kompyuteringizdagi <code>my-project</code> papkasiga ulang.
        </p>
        <Solution>
          <CodeBlock lang="bash">{`git remote add origin https://github.com/sizning-username/my-project.git
git remote -v`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>git remote add origin &lt;URL&gt;</code> lokal va masofaviy omborni bog'laydi.
        </li>
        <li>
          Manzil to'g'riligini <code>git remote -v</code> buyrug'i bilan tekshirish mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
