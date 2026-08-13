import CodeBlock from '@/components/content/CodeBlock'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Branch yaratish va almashtirish',
  section: 'Modul 4. Branching',
}

export default function Lesson19BranchYaratishVaAlmashtirish() {
  return (
    <>
      <h2>Branch yaratish va o'tish buyruqlari</h2>
      <p>
        Git'da mavjud branch'lar ro'yxatini ko'rish, yangi branch yaratish va ular o'rtasida o'tish juda oson.
      </p>

      <h2>1. Mavjud branch'larni ko'rish</h2>
      <CodeBlock lang="bash">{`git branch`}</CodeBlock>
      <p>
        Ekranda branch'lar ro'yxati chiqadi, siz turgan joriy branch oldida yulduzcha (<code>*</code>) belgisi bo'ladi.
      </p>

      <h2>2. Yangi branch yaratish</h2>
      <CodeBlock lang="bash">{`git branch feature-login`}</CodeBlock>

      <h2>3. Boshqa branch'ga o'tish (Switch)</h2>
      <CodeBlock lang="bash">{`git switch feature-login`}</CodeBlock>

      <h2>4. Yangi branch yaratish va unga bir vaqtda o'tish (Qisqa usul)</h2>
      <p>
        Zamonaviy Git'da eng ko'p ishlatiladigan qulay buyruq:
      </p>
      <CodeBlock lang="bash">{`git switch -c feature-login`}</CodeBlock>
      <p>
        Bu yerda <code>-c</code> (create) bayrog'i yangi branch yaratib, zudlik bilan unga o'tadi.
      </p>

      <Quiz
        question="Yangi branch yaratib, bir vaqtning o'zida unga o'tish uchun qaysi zamonaviy buyruq ishlatiladi?"
        options={[
          'git branch -new <nom>',
          'git switch -c <nom>',
          'git move -b <nom>',
          'git checkout --create <nom>',
        ]}
        correctIndex={1}
        explanation="git switch -c <nom> buyrug'i yangi tarmoq ochib, unga o'tishni bitta qadamda bajaradi."
      />

      <Exercise title="Mashq: 3 ta feature branch yaratish">
        <p>
          Terminalda quyidagi 3 ta branch'ni yaratib ko'ring:
        </p>
        <ul>
          <li><code>feature-login</code></li>
          <li><code>feature-navbar</code></li>
          <li><code>feature-contact</code></li>
        </ul>
        <Solution>
          <CodeBlock lang="bash">{`git switch -c feature-login
git switch -c feature-navbar
git switch -c feature-contact
git branch`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>git branch</code> barcha lokal branch'larni ko'rsatadi.
        </li>
        <li>
          <code>git switch &lt;branch&gt;</code> ko'rsatilgan branch'ga o'tadi.
        </li>
        <li>
          <code>git switch -c &lt;branch&gt;</code> yangi branch yaratadi va o'tadi.
        </li>
      </KeyPoints>
    </>
  )
}
