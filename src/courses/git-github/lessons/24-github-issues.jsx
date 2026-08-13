import CodeBlock from '@/components/content/CodeBlock'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'GitHub Issues',
  section: 'Modul 5. GitHub Collaboration',
}

export default function Lesson24GitHubIssues() {
  return (
    <>
      <h2>GitHub Issues nima?</h2>
      <p>
        <strong>GitHub Issues</strong> — bu loyihadagi xatoliklar (bug), bajarilishi kerak bo'lgan vazifalar (tasks) yoki yangi g me'moriy g'oyalarni (feature requests) ro me'moriy ro'yxatga olish va kuzatib borish uchun mo'ljallangan vazifalar menejeri (task tracker) xizmatidir.
      </p>

      <h2>Issue turlari va yorliqlar (Labels)</h2>
      <p>
        Issues bo'limida vazifalarni tartiblash uchun yorliqlar ishlatiladi:
      </p>
      <ul>
        <li><code>[BUG]</code> — koddagi mavjud xatolik va kamchiliklar.</li>
        <li><code>[FEATURE]</code> — loyihaga qo me'moriy qo'shilishi kerak bo'lgan yangi imkoniyatlar.</li>
        <li><code>[TASK]</code> — texnik qayta ishlash yoki hujjatlashtirish vazifalari.</li>
      </ul>

      <Quiz
        question="Loyihadagi koddagi xatolik (bug) yoki yangi g'oyalarni ro'yxatga olib kuzatib borish uchun GitHub'ning qaysi bo'limidan foydalaniladi?"
        options={[
          'Pull Requests',
          'GitHub Issues',
          'GitHub Actions',
          'Insights',
        ]}
        correctIndex={1}
        explanation="GitHub Issues xatoliklar va rejlashtirilgan vazifalarni ro'yxatga olish xizmatidir."
      />

      <Exercise title="Mashq: 3 ta Issue yaratish">
        <p>
          Repository'ingizdagi <strong>Issues</strong> bo'limiga kirib, quyidagi 3 ta vazifani yarating:
        </p>

        <CodeBlock lang="text">{`1. [BUG] Login button doesn't work on mobile
2. [FEATURE] Add dark mode theme switcher
3. [TASK] Create footer section component`}</CodeBlock>
        <Solution>
          <p>
            Yaratilgan har bir issue unikal raqamga (masalan: <code>#1</code>, <code>#2</code>) ega bo'ladi va ularni commit yoki PR izohida yopish (masalan: <em>Fixes #1</em>) mumkin.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          GitHub Issues vazifalarni ro'yxatga olish va tayinlash tizimidir.
        </li>
        <li>
          Yorliqlar (Labels) orqali vazifalar toifalarga ajratiladi.
        </li>
      </KeyPoints>
    </>
  )
}
