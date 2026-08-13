import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Merge Conflict',
  section: 'Modul 4. Branching',
}

export default function Lesson22MergeConflict() {
  return (
    <>
      <h2>Merge Conflict (Birlashtirish ziddiyati) nima?</h2>
      <p>
        <strong>Merge Conflict</strong> — ikki xil branch'da bir vaqtning o'zida <strong>aynan bitta faylning bitta qatori</strong> turli xil tahrirlanganda va ularni avtomatik birlashtirib bo'lmaganda Git tomonidan beriladigan to'xtalish holatidir.
      </p>

      <h2>Conflict markerlar (Ziddiyat belgilari)</h2>
      <p>
        Conflict yuz berganda, Git fayl ichiga maxsus markerlarni yozib qo'yadi:
      </p>
      <CodeBlock lang="html">{`<<<<<<< HEAD
<h1>Salom Asosiy Sahifa</h1>
=======
<h1>Salom Yangi Sahifa</h1>
>>>>>>> feature-header`}</CodeBlock>

      <p>
        Markerlar ma'nosi:
      </p>
      <ul>
        <li><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> — siz turgan joriy branch (masalan: <code>main</code>) kodi.</li>
        <li><code>=======</code> — o'zgargan ikki variatni ajratuvchi chiziq.</li>
        <li><code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature-header</code> — birlashtirilayotgan branch kodi.</li>
      </ul>

      <h2>Conflict'ni hal qilish (Resolution) bosqichlari</h2>
      <ol>
        <li>Conflict bergan faylni matn muharririda oching.</li>
        <li>Kerakli variantni qoldirib, ortiqcha conflict markerlarini (<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>) o'chirib tashlang.</li>
        <li>Faylni saqlang: <code>git add index.html</code></li>
        <li>Conflict hal qilinganini muhrlang: <code>git commit -m "Fix merge conflict in index.html"</code></li>
      </ol>

      <Callout type="note" title="Vahimaga o'rin yo'q">
        Merge Conflict — bu har bir dasturchi kunlik ishida uchratadigan tabiiy jarayon. Muhimi markerlarni to'g'ri tozalash va to'g'ri kod variantini tanlashdir.
      </Callout>

      <Quiz
        question="Git'dagi conflict markerlarida '<<<<<<< HEAD' belgisi nimani ko'rsatadi?"
        options={[
          'Serverdagi eng oxirgi koddagi faylni',
          'Siz hozir turgan joriy branch kodi chegarasini',
          'Birlashtirilayotgan yangi branch kodi bo\'limini',
          'Xatoni avtomatik o\'chiruvchi skriptni',
        ]}
        correctIndex={1}
        explanation="<<<<<<< HEAD marker joriy aktiv branch'dagi kodingiz boshi va chegarasini belgilaydi."
      />

      <Exercise title="Practice: Ataylab conflict yaratish va hal qilish">
        <p>
          1. <code>main</code> branch'da <code>index.html</code> ichidagi 1-qatorni <code>"Title 1"</code> ga o'zgartirib commit qiling.
          <br />
          2. Yangi <code>feature</code> branch ochib, <code>index.html</code> 1-qatorini <code>"Title 2"</code> ga o'zgartirib commit qiling.
          <br />
          3. <code>main</code>ga qaytib <code>git merge feature</code> buyrug'ini bosing va kelib chiqqan conflict'ni qo'lda tozalab commit qiling.
        </p>
        <Solution>
          <CodeBlock lang="bash">{`# Conflict chiqqandan so'ng:
# 1. index.html fayli ochiladi, kerakli matn qoldirilib markerlar o'chiriladi.
git add index.html
git commit -m "Resolve merge conflict"`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Merge Conflict bir faylning bir qatori 2 xil o'zgarganda sodir bo'ladi.
        </li>
        <li>
          Markerlar (<code>HEAD</code>, <code>===</code>, <code>branch-nomi</code>) ziddiyatli joylarni ko'rsatadi.
        </li>
        <li>
          Conflict qo'lda tozalangach, <code>git add</code> va <code>git commit</code> bilan saqlanadi.
        </li>
      </KeyPoints>
    </>
  )
}
