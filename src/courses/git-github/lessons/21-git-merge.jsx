import CodeBlock from '@/components/content/CodeBlock'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'git merge',
  section: 'Modul 4. Branching',
}

export default function Lesson21GitMerge() {
  return (
    <>
      <h2>git merge (Tarmoqlarni birlashtirish) nima?</h2>
      <p>
        Feature branch'da tayyorlangan va sinovdan o'tgan kodni loyihaning asosiy <code>main</code> branch'iga qo'shish jarayoni <strong>Merge (Birlashtirish)</strong> deb ataladi.
      </p>

      <h2>Merge qilish ketma-ketligi</h2>
      <p>
        Boshqa branch'dagi o'zgarishlarni <code>main</code>ga qo me'moriy qo'shish uchun:
      </p>
      <ol>
        <li>Avval asosiy branch'ga o'tiladi: <code>git switch main</code></li>
        <li>Birlashtiriladigan branch nomi ko'rsatiladi: <code>git merge feature-login</code></li>
      </ol>

      <CodeBlock lang="bash">{`git switch main
git merge feature-login`}</CodeBlock>

      <h2>Fast-forward Merge</h2>
      <p>
        Agar siz <code>feature-login</code> branch'ini yaratganingizdan so'ng <code>main</code> branch'da hech qanday boshqa o'zgarish bo me me'moriy bo'lmagan bo'lsa, Git uni <strong>Fast-forward</strong> usulida (shunchaki ko'rsatkichni oldinga surish orqali) juda tez birlashtiradi.
      </p>

      <Quiz
        question="'feature-login' tarmoq kodingizni 'main' tarmoqqa birlashtirish uchun birinchi navbatda nima qilish kerak?"
        options={[
          'To\'g\'ridan-to\'g\'ri feature-login tarmoqning o\'zida git merge main buyrug\'ini kiritish',
          'Avval git switch main orqali main tarmoqqa o\'tib, so\'ng git merge feature-login kiritish',
          'git commit --merge deb yozish',
          'Loyihadagi barcha branchlarni o\'chirib yuborish',
        ]}
        correctIndex={1}
        explanation="Merge qilishda har doim o'zgarishlarni qabul qilib oluvchi asosiy tarmoqqa (main) o'tib, so'ng birlashtiriladigan branch nomi ko'rsatiladi."
      />

      <Exercise title="Mashq: Ikki feature branchni mainga merge qilish">
        <p>
          1. <code>git switch main</code> orqali main branch'ga o me me'moriy o'ting.
          <br />
          2. <code>git merge feature-navbar</code> kiritib menyuni birlashtiring.
          <br />
          3. <code>git merge feature-login</code> kiritib kirish sahifasini birlashtiring.
        </p>
        <Solution>
          <CodeBlock lang="bash">{`git switch main
git merge feature-navbar
git merge feature-login`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>git merge &lt;branch&gt;</code> ko'rsatilgan branch kodi va tarixini joriy branch'ga birlashtiradi.
        </li>
        <li>
          Merge qilishdan oldin har doim qabul qiluvchi branch'ga (<code>main</code>) o'tiladi.
        </li>
      </KeyPoints>
    </>
  )
}
