import CodeBlock from '@/components/content/CodeBlock'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Git & GitHub Final Project',
  section: 'Modul 7. Final Project',
}

export default function Lesson29GitAndGitHubFinalProject() {
  return (
    <>
      <h2>Yakuniy Amaliy Loyiha (Final Project)</h2>
      <p>
        Tabriklaymiz! Siz Git va GitHub kursi davomida barcha nazariy va amaliy tushunchalarni o'rganib chiqdingiz. Endi o'rgangan bilimlaringizni real loyiha ustida bir butun jarayon sifatida qo'llash va portfoliosingiz uchun sifatli loyiha yaratish vaqti keldi.
      </p>

      <h2>Loyiha Mavzusi: Student Management App</h2>
      <p>
        Siz o'quvchilar ma'lumotlarini boshqaruvchi kichik veb-dastur interfeysini yaratasiz.
      </p>

      <h2>Final Project Minimial Talablari Ro'yxati</h2>
      <p>
        Loyihangiz to'liq va muvaffaqiyatli hisoblanishi uchun kamida quyidagi ko me me'moriy ko'rsatkichlarni bajarishingiz kerak:
      </p>

      <ul>
        <li><strong>GitHub Repository:</strong> <code>student-management-app</code> nomli Public repository va uning ichida professional <code>README.md</code> hamda <code>.gitignore</code> fayli.</li>
        <li><strong>Commit'lar soni:</strong> Kamida <strong>5 va undan ortiq</strong> ma'noli commit message'lar.</li>
        <li><strong>Branch'lar soni:</strong> Kamida <strong>3 ta alohida branch</strong> (masalan: <code>feature-navbar</code>, <code>feature-login</code>, <code>feature-dashboard</code>).</li>
        <li><strong>Pull Request'lar:</strong> GitHub'da ochilgan hamda tekshirilib main'ga merge qilingan kamida <strong>2 ta Pull Request</strong>.</li>
        <li><strong>GitHub Issues:</strong> Kamida <strong>3 ta yaratilgan issue</strong> (masalan: <code>[BUG]</code>, <code>[FEATURE]</code>, <code>[TASK]</code>).</li>
        <li><strong>Merge Conflict:</strong> Ataylab 1 ta Merge Conflict vaziyatini hosil qilib, uni qo'lda to'g'ri hal qilish mashqi.</li>
      </ul>

      <h2>Bajarish ketma-ketligi yo'riqnomasi</h2>

      <h3>1-Qadam: Repository va loyihani initialize qilish</h3>
      <CodeBlock lang="bash">{`mkdir student-management-app
cd student-management-app
git init
# .gitignore va README.md yaratiladi
git add .
git commit -m "Initial commit: Add README and gitignore"
git remote add origin https://github.com/username/student-management-app.git
git push -u origin main`}</CodeBlock>

      <h3>2-Qadam: Issues yaratish</h3>
      <p>
        GitHub repository'ingizdagi <strong>Issues</strong> bo'limiga kirib, quyidagi 3 ta vazifani kiriting:
      </p>
      <CodeBlock lang="text">{`1. [TASK] Create top navigation bar
2. [FEATURE] Build student list table component
3. [BUG] Fix mobile responsiveness on login view`}</CodeBlock>

      <h3>3-Qadam: Branch'larda ishlab, PR ochish</h3>
      <CodeBlock lang="bash">{`git switch -c feature-navbar
# navbar.html yaratiladi
git add navbar.html
git commit -m "Add header navigation component"
git push -u origin feature-navbar`}</CodeBlock>
      <p>
        GitHub'ga kirib, <code>feature-navbar</code> uchun Pull Request oching va uni <code>main</code>ga merge qiling.
      </p>

      <h3>4-Qadam: Merge Conflict mashqini bajarish</h3>
      <p>
        <code>main</code> branch va yangi <code>feature-dashboard</code> branch'da bir faylning bitta qatorini 2 xil tahrirlab conflict chaqiring hamda uni tozalab commit qiling.
      </p>

      <Quiz
        question="Final loyihada professional kod madaniyatini namoyish etish uchun qaysi elementlar bo'lishi shart?"
        options={[
          'Faqat bitta commit va zip fayl',
          'Kamida 5+ commit, alohida feature branchlar, PRlar, Issues va to\'g\'ri README hamda .gitignore',
          'Faqat yopiq private repository',
          'Faqat HTML faylining o\'zi',
        ]}
        correctIndex={1}
        explanation="Mukammal portfolio loyihasida Git va GitHub workflow'ining barcha elementlari (commit, branch, PR, issue, README, gitignore) aks etgan bo'lishi kerak."
      />

      <Exercise title="Yakuniy topshiriq: Topshirish">
        <p>
          Final loyihangizni GitHub'ga to'liq yuklab bo'lgach, repository URL manzilingizni tekshiring:
        </p>
        <CodeBlock lang="text">{`https://github.com/username/student-management-app`}</CodeBlock>
        <Solution>
          <p>
            Ushbu loyiha havolasini rezyumengizga hamda LinkedIn profilingizga joylashtirishingiz mumkin. Tabriklaymiz, siz Git va GitHub asoslarini a'lo darajada egalladingiz!
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Final loyiha barcha o'rganilgan Git va GitHub vositalarini amaliyotda birlashtiradi.
        </li>
        <li>
          Push, Pull Request, Issue va Branch workflow portfoliosingiz sifatini belgilaydi.
        </li>
      </KeyPoints>
    </>
  )
}
