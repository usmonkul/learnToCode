import CodeBlock from '@/components/content/CodeBlock'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Real project workflow',
  section: 'Modul 6. Real Developer Workflow',
}

export default function Lesson27RealProjectWorkflow() {
  return (
    <>
      <h2>Haqiqiy Dasturchi Kunlik Git Workflow'i</h2>
      <p>
        IT kompaniyalarda va professional jamoalarda har kuni takrorlanadigan mukammal va tartibli 9 bosqichli ish sikli:
      </p>

      <CodeBlock lang="text">{`1. git pull (Asosiy main tarmoqni server bilan sync qilish)
   ↓
2. git switch -c feature-header (Yangi topshiriq uchun branch yaratish)
   ↓
3. Kod yozish va amaliyot bajarish
   ↓
4. git status (O'zgargan fayllarni nazorat qilish)
   ↓
5. git add . (Staging Area'ga tayyorlash)
   ↓
6. git commit -m "Add responsive header component" (Snapshot yaratish)
   ↓
7. git push -u origin feature-header (Branch'ni GitHub'ga yuklash)
   ↓
8. GitHub'da Pull Request Ochish va Code Review'dan o'tish
   ↓
9. PR tasdiqlangach, main'ga Merge qilish`}</CodeBlock>

      <Quiz
        question="Real loyihada yangi vazifani boshlashdan oldin birinchi o'rinda qaysi buyruqni bajarish tavsiya etiladi?"
        options={[
          'git push',
          'git pull (main tarmoqdagi yangi o\'zgarishlarni yuklab olish)',
          'git init',
          'git commit',
        ]}
        correctIndex={1}
        explanation="Yangi ish boshlashdan avval serverdagi eng so'nggi yangilanishlarni git pull orqali olib kelish kelgusidagi conflict'larning oldini oladi."
      />

      <Exercise title="Amaliyot: Workflow'ni boshdan oxirigacha takrorlash">
        <p>
          Yuqoridagi 9 bosqichli algoritmni o me'moriy loyihangizda yangi <code>feature-footer</code> branch ochgan holda to'liq amalda bajaring.
        </p>
        <Solution>
          <CodeBlock lang="bash">{`git switch main
git pull origin main
git switch -c feature-footer
# kod yoziladi
git status
git add .
git commit -m "Add page footer"
git push -u origin feature-footer`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Har kuni ish boshlashdan avval <code>git pull</code> qilinadi.
        </li>
        <li>
          Har bir vazifa alohida feature branch'da bajariladi.
        </li>
        <li>
          Kod faqat PR va Code Review orqali <code>main</code>ga qo'shiladi.
        </li>
      </KeyPoints>
    </>
  )
}
