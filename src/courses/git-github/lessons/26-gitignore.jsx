import CodeBlock from '@/components/content/CodeBlock'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: '.gitignore',
  section: 'Modul 6. Real Developer Workflow',
}

export default function Lesson26Gitignore() {
  return (
    <>
      <h2>.gitignore fayli nima va u nega kerak?</h2>
      <p>
        Loyihada shunday fayl va papkalar bo'ladiki, ularni Git kuzatmasligi va GitHub'ga <strong>hech qachon yuklanmasligi</strong> kerak. Masalan:
      </p>
      <ul>
        <li><code>node_modules/</code> — ulkan hajmli kutubxonalar papkasi.</li>
        <li><code>.env</code> — maxfiy kalitlar, parollar va bazalar ulanish manzilini saqlovchi fayl.</li>
        <li><code>dist/</code> yoki <code>build/</code> — avtomatik yig'ilgan yakuniy loyiha kodi.</li>
      </ul>
      <p>
        Ushbu fayllarni Git e'tiboridan chetda qoldirish uchun loyiha ildizida <strong>.gitignore</strong> fayli yaratiladi.
      </p>

      <h2>.gitignore misoli</h2>
      <CodeBlock lang="text">{`# Kutubxonalar
node_modules/

# Maxfiy kalitlar va muhit fayllari
.env
.env.local

# Yig me'moriy yig'ilgan loyiha fayllari
dist/
build/

# Tizim fayllari
.DS_Store
Thumbs.db`}</CodeBlock>

      <Quiz
        question="Nima uchun '.env' fayli '.gitignore'ga qo'shilishi shart?"
        options={[
          'Chunki u juda katta hajmli fayl',
          'Chunki unda maxfiy parollar, kalitlar va xavfsizlik ma\'lumotlari saqlanadi',
          'Chunki u faqat Windows operatsion tizimida ishlaydi',
          'Chunki Git u faylni o\'qiy olmaydi',
        ]}
        correctIndex={1}
        explanation=".env faylidagi maxfiy ma'lumotlar ochiq GitHub repository'lariga tushib qolmasligi uchun u har doim .gitignore ichida bo'lishi shart."
      />

      <Exercise title="Challenge: Frontend loyiha uchun .gitignore yozish">
        <p>
          Loyihangiz ildizida <code>.gitignore</code> faylini yarating va unga node_modules, dist va .env fayllarini yozing. So'ng <code>git status</code> buyrug'ida u fayllar ko'rinmay qolganini tasdiqlang.
        </p>
        <Solution>
          <CodeBlock lang="text">{`node_modules/
dist/
.env`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>.gitignore</code> fayli Git tomonidan inkor etiladigan fayllar ro'yxatini saqlaydi.
        </li>
        <li>
          Maxfiy kalitlar (<code>.env</code>) va og'ir kutubxonalar (<code>node_modules/</code>) doimo ignore qilinadi.
        </li>
      </KeyPoints>
    </>
  )
}
