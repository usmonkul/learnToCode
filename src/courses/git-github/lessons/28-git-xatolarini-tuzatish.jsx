import CodeBlock from '@/components/content/CodeBlock'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Git xatolarini tuzatish',
  section: 'Modul 6. Real Developer Workflow',
}

export default function Lesson28GitXatolariniTuzatish() {
  return (
    <>
      <h2>Git'da xato qilganda vahimaga tushmaslik</h2>
      <p>
        Dasturlashda xato qilish tabiiy holat. Git'ning eng katta kuchi — istalgan nojo'ya o'zgarishni bexatar orqaga qaytarish imkoniyatidadir.
      </p>

      <h2>1. Hali add qilinmagan o'zgarishni bekor qilish (git restore)</h2>
      <p>
        Faylni tahrirladingiz, lekin hali <code>git add</code> qilmadingiz va kiritilgan o'zgarishni bekor qilib, oxirgi commit holatiga qaytarmoqchisiz:
      </p>
      <CodeBlock lang="bash">{`git restore index.html`}</CodeBlock>

      <h2>2. Staging Area'dan faylni chiqarish (git restore --staged)</h2>
      <p>
        Faylni tasodifan <code>git add</code> qilib qo me me'moriy qo'ydingiz, lekin uni commit qilmoqchi emassiz:
      </p>
      <CodeBlock lang="bash">{`git restore --staged index.html`}</CodeBlock>

      <h2>3. Bajarilgan commit'ni xavfsiz bekor qilish (git revert)</h2>
      <p>
        Commit yaratib va hatto uni serverga push qilib bo'ldingiz, lekin undagi o'zgarish xato bo'lib chiqdi. Server tarixini buzmasdan commit'ni bekor qilish:
      </p>
      <CodeBlock lang="bash">{`git revert <commit-id>`}</CodeBlock>
      <p>
        <code>git revert</code> eskisini o'chirmaydi, balki o'sha xato commit'ga teskari o'zgarish qiluvchi yangi commit yaratadi.
      </p>

      <Quiz
        question="Mavjud commit'dagi o'zgarishlarni server tarixini o'chirmasdan, xavfsiz holda bekor qiluvchi yangi commit yaratish uchun qaysi buyruq ishlatiladi?"
        options={[
          'git delete',
          'git revert <commit-id>',
          'git erase',
          'git reset --hard',
        ]}
        correctIndex={1}
        explanation="git revert o'tmishdagi xato commit'ni teskari o'zgarish kiritish orqali xavfsiz bekor qiladi."
      />

      <Exercise title="Mashq: O'zgarishni qaytarish">
        <p>
          1. <code>index.html</code> ichiga ixtiyoriy matn yozing.
          <br />
          2. <code>git status</code> bilan Modified holatni ko'ring.
          <br />
          3. <code>git restore index.html</code> buyrug'i orqali o'zgarishni bekor qiling.
        </p>
        <Solution>
          <CodeBlock lang="bash">{`git restore index.html
git status`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>git restore &lt;fayl&gt;</code> tahrirlangan faylni oxirgi commit holatiga qaytaradi.
        </li>
        <li>
          <code>git restore --staged &lt;fayl&gt;</code> faylni Staging Area'dan chiqaradi.
        </li>
        <li>
          <code>git revert &lt;commit-id&gt;</code> pastki commit'ni xavfsiz bekor qiladi.
        </li>
      </KeyPoints>
    </>
  )
}
