import CodeBlock from '@/components/content/CodeBlock'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'git diff',
  section: 'Modul 2. Git asoslari',
}

export default function Lesson12GitDiff() {
  return (
    <>
      <h2>git diff (O'zgarishlarni solishtirish)</h2>
      <p>
        Koddagi o'zgarishlarni commit qilishdan oldin aynan qaysi qatorlar qo'shilgani yoki o'chirilganini tekshirish uchun <code>git diff</code> buyrug'idan foydalaniladi.
      </p>

      <h2>1. Working Directory va oxirgi Commit o'rtasidagi diff</h2>
      <p>
        Hali <code>git add</code> qilinmagan (Modified) o'zgarishlarni ko'rish:
      </p>
      <CodeBlock lang="bash">{`git diff`}</CodeBlock>
      <p>
        Terminalda o'chirilgan qatorlar qizil rangda minus (<code>-</code>) bilan, yangi qo'shilgan qatorlar esa yashil rangda plyus (<code>+</code>) bilan ko'rinadi.
      </p>

      <h2>2. Staged changes (Staging Area) diff</h2>
      <p>
        <code>git add</code> qilingan, lekin hali commit qilinmagan o'zgarishlarni ko'rish uchun:
      </p>
      <CodeBlock lang="bash">{`git diff --staged`}</CodeBlock>

      <Quiz
        question="'git add' qilingan (Staged) fayllardagi o'zgarishlarni ko'rish uchun qaysi buyruq ishlatiladi?"
        options={[
          'git diff',
          'git diff --staged',
          'git diff --all',
          'git status --diff',
        ]}
        correctIndex={1}
        explanation="git diff --staged buyrug'i Staging Area'ga o'tkazilgan o'zgarishlarni oxirgi commit bilan solishtirib beradi."
      />

      <Exercise title="Challenge: 3 qatorlik o'zgarishni diff orqali tahlil qilish">
        <p>
          <code>index.html</code> faylingizga 3 qator yangi kod qo'shing va saqlang. So'ng terminalda <code>git diff</code> buyrug'ini kiriting va plyus (<code>+</code>) bilan chiqqan qatorlarni o'qing.
        </p>
        <Solution>
          <CodeBlock lang="bash">{`$ git diff
diff --git a/index.html b/index.html
--- a/index.html
+++ b/index.html
@@ -5,3 +5,6 @@
+  <header>
+    <h1>Xush kelibsiz!</h1>
+  </header>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>git diff</code> hali add qilinmagan o'zgarishlarni ko'rsatadi.
        </li>
        <li>
          <code>git diff --staged</code> add qilingan (Staged) o'zgarishlarni ko'rsatadi.
        </li>
        <li>
          O'chirilgan qatorlar minus (<code>-</code>), qo'shilgan qatorlar plyus (<code>+</code>) bilan ko'rinadi.
        </li>
      </KeyPoints>
    </>
  )
}
