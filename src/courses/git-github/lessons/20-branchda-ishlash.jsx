import CodeBlock from '@/components/content/CodeBlock'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Branch'da ishlash",
  section: 'Modul 4. Branching',
}

export default function Lesson20BranchdaIshlash() {
  return (
    <>
      <h2>Branch ichidagi standart ish sikli (Workflow)</h2>
      <p>
        Alohida branch'ga o'tganingizdan so'ng bajariladigan to'liq dasturchilik tsikli quyidagi tartibda bo'ladi:
      </p>

      <ol>
        <li>Yangi branch yaratish va o'tish: <code>git switch -c feature-navbar</code></li>
        <li>Kodingizni yozish va fayllarga o'zgartirish kiritish</li>
        <li>O'zgarishlar holatini tekshirish: <code>git status</code></li>
        <li>Staging Area'ga o'tkazish: <code>git add .</code></li>
        <li>Local Commit yaratish: <code>git commit -m "Add navbar component"</code></li>
        <li>Yangi branch'ni GitHub'ga push qilish: <code>git push -u origin feature-navbar</code></li>
      </ol>

      <Quiz
        question="Local'da yaratilgan yangi 'feature-navbar' branch'ini GitHub'ga birinchi marta push qilish uchun qaysi buyruq ishlatiladi?"
        options={[
          'git push',
          'git push -u origin feature-navbar',
          'git send feature-navbar',
          'git branch --upload feature-navbar',
        ]}
        correctIndex={1}
        explanation="git push -u origin feature-navbar buyrug'i yangi lokal tarmoqni masofaviy GitHub serveriga yaratib yuklaydi."
      />

      <Exercise title="Challenge: Navbar feature'ini alohida branch'da ishlab chiqish">
        <p>
          1. <code>feature-navbar</code> nomli alohida branch oching.
          <br />
          2. <code>navbar.html</code> faylini yaratib, ichiga oddiy menyu kodini yozing.
          <br />
          3. O'zgarishni add qiling, <code>"Add navbar markup"</code> deb commit qiling va GitHub'ga push qiling.
        </p>
        <Solution>
          <CodeBlock lang="bash">{`git switch -c feature-navbar
# navbar.html yaratiladi
git add navbar.html
git commit -m "Add navbar markup"
git push -u origin feature-navbar`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Har bir vazifa uchun alohida branch yaratiladi.
        </li>
        <li>
          Branch'dagi commit'lar <code>main</code> branch kodingizga ta'sir qilmaydi.
        </li>
        <li>
          Natijalar <code>git push -u origin &lt;branch-nomi&gt;</code> orqali GitHub'ga yuboriladi.
        </li>
      </KeyPoints>
    </>
  )
}
