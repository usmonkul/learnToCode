import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Repository nima?',
  section: 'Modul 1. GitHub bilan tanishish',
}

export default function Lesson02RepositoryNima() {
  return (
    <>
      <h2>Repository (Ombor) nima?</h2>
      <p>
        Dasturlash olamida <strong>Repository</strong> (yoki qisqacha <em>Repo</em>) — bu loyihangizning barcha fayllari, kodlari, rasmlari, sozlamalari va eng muhimi, <strong>o'zgarishlar tarixi (commit history)</strong> saqlanadigan raqamli papkadir (folder).
      </p>
      <p>
        Oddiy kompyuterdagi papkadan farqli ravishda, repository koddagi har bir kichik o'zgarishni va uning muallifini aniq eslab qoladi.
      </p>

      <h2>Project va Repository o'rtasidagi farq</h2>
      <p>
        Ko'pincha "Loyiha" (Project) va "Repository" so'zlari bir xil ma'noda ishlatiladi. Biroq ularning kichik farqi bor:
      </p>
      <ul>
        <li>
          <strong>Project (Loyiha):</strong> Bu siz yaratayotgan umumiy mahsulot yoki veb-sayt (masalan, "Onlayn do'kon veb-sayti").
        </li>
        <li>
          <strong>Repository (Ombor):</strong> Bu o'sha loyihaning fayllari va kodi saqlanadigan muayyan Git/GitHub papkasi.
        </li>
      </ul>

      <h2>Public vs Private Repository</h2>
      <p>
        GitHub'da yangi repository yaratayotganingizda u uchun 2 xil kirish rejimidan birini tanlaysiz:
      </p>

      <div className="my-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-canvas p-4">
          <h3 className="mt-0 text-base font-semibold text-ink">Public (Ochiq) Repository</h3>
          <p className="mb-0 text-sm text-ink-muted">
            Internetdagi <strong>istalgan kishi</strong> kodingizni ko'rishi va yuklab olishi (clone) mumkin. Biroq kodingizga o'zgarish kiritish huquqi faqat sizda va siz ruxsat bergan jamoadoshlarda bo'ladi. Portfolio va Open Source loyihalar uchun mos.
          </p>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-4">
          <h3 className="mt-0 text-base font-semibold text-ink">Private (Yopiq) Repository</h3>
          <p className="mb-0 text-sm text-ink-muted">
            Repository kodi faqat <strong>siz va siz taklif qilgan (collaborator)</strong> kishilar uchungina ko'rinadi. Tijoriy, kompaniya yoki maxfiy shaxsiy loyihalar uchun ishlatiladi.
          </p>
        </div>
      </div>

      <Callout type="tip" title="Tavsiya">
        Yangi o'rganayotganingizda va portfoliosingizni boyitayotganingizda loyihalaringizni <strong>Public</strong> qilib ochganingiz ma'qul. Bu ish beruvchilarga bilimingizni ko'rsatishga yordam beradi.
      </Callout>

      <Quiz
        question="Agar siz tijorat kompaniyasining maxfiy loyihasi ustida ishlayotgan bo'lsangiz, qanday repository tanlashingiz kerak?"
        options={[
          'Public Repository',
          'Private Repository',
          'Open Source Repository',
          'Ommaviy Repository',
        ]}
        correctIndex={1}
        explanation="Private (yopiq) repository loyiha kodini Begona kishilardan yashiradi va faqat ruxsat etilgan dasturchilarga ko'rsatadi."
      />

      <h2>GitHub'da Yangi Repository Yaratish</h2>
      <p>
        GitHub sahifasida yangi repo yaratish tartibi juda oddiy:
      </p>
      <ol>
        <li>GitHub'ga kiring va yuqori o'ng burchakdagi <strong>"+"</strong> tugmasini bosib, <strong>"New repository"</strong> tanlang.</li>
        <li><strong>Repository name:</strong> Repository nomini yozing (masalan: <code>my-first-project</code>). Nomlarda bo'sh joy o'rniga chiziqcha (<code>-</code>) ishlatish tavsiya etiladi.</li>
        <li><strong>Description:</strong> Loyihangiz haqida qisqacha izoh (ixtiyoriy).</li>
        <li><strong>Public / Private:</strong> Kirish rejimini tanlang.</li>
        <li><strong>Add a README file:</strong> Loyihangiz haqida ma'lumot beruvchi dastlabki faylni avtomatik qo'shish uchun ushbu katakka qushcha qo'ying.</li>
        <li><strong>Create repository</strong> tugmasini bosing!</li>
      </ol>

      <h2>Repository URL manzili</h2>
      <p>
        Repository yaratilgach, u o'zining unikal veb-manziliga (URL) ega bo'ladi:
      </p>
      <CodeBlock lang="text">{`https://github.com/username/my-first-project`}</CodeBlock>
      <p>
        Kelgusida ushbu URL orqali boshqalar sizning loyihangizni ko'rishi yoki Git orqali kompyuteriga yuklab olishi mumkin bo'ladi.
      </p>

      <Quiz
        question="Repository nomini yozishda qaysi uslub eng to'g'ri hisoblanadi?"
        options={[
          'Mening Birinchi Loyiham',
          'my-first-project',
          'my first project!',
          'my/first/project',
        ]}
        correctIndex={1}
        explanation="URL va fayl tizimida muammo tug'dirmasligi uchun repository nomlarida kichik harflar va chiziqchalar (kebab-case) ishlatiladi."
      />

      <Exercise title="Kichik mashq: my-first-project repository yaratish">
        <p>
          GitHub saytingizga kiring va quyidagi ko'rsatmalar bo'yicha birinchi repository'ingizni yarating:
        </p>
        <ul>
          <li>Repository nomi: <code>my-first-project</code></li>
          <li>Rejim: <strong>Public</strong></li>
          <li><strong>Add a README file</strong> katagiga qushcha qo'ying.</li>
          <li>Yaratilgan repository havolasini brauzerda tekshiring.</li>
        </ul>
        <Solution>
          <p>
            Tabriklaymiz! Sahifangizda <code>https://github.com/username/my-first-project</code> manzili bo'yicha birinchi repository'ingiz tayyor bo'ldi.
          </p>
        </Solution>
      </Exercise>

      <Exercise title="Challenge: Repository yaratib, unga oddiy index.html qo'shish">
        <p>
          Yangi yaratilgan repository'ingizda GitHub veb-interfeysidan foydalanib fayl qo'shing:
        </p>
        <ol>
          <li>Repository sahifasida <strong>Add file</strong> → <strong>Create new file</strong> tugmasini bosing.</li>
          <li>Fayl nomiga <code>index.html</code> deb yozing.</li>
          <li>Kodingizga <code>&lt;h1&gt;Salom GitHub!&lt;/h1&gt;</code> matnini yozing.</li>
          <li>Sahifaning pastiga tushib, <strong>Commit changes</strong> tugmasini bosing.</li>
        </ol>
        <Solution>
          <CodeBlock lang="html">{`<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <title>Mening Loyiham</title>
</head>
<body>
  <h1>Salom GitHub! Bu mening birinchi veb-sahifam.</h1>
</body>
</html>`}</CodeBlock>
          <p>
            "Commit changes" tugmasi bosilgach, <code>index.html</code> faylingiz repository'ga qo'shiladi va versiyalar tarixiga muhrlanadi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Repository — loyihangiz fayllari va ularning o'zgarishlar tarixi saqlanadigan raqamli ombor.
        </li>
        <li>
          Public repository'ni hamma ko'ra oladi, Private repository'ni faqat ruxsat berilganlar ko'radi.
        </li>
        <li>
          Repository nomi kichik harflar va chiziqcha bilan yozilishi maqsadga muvofiq (masalan, <code>my-first-project</code>).
        </li>
        <li>
          Har bir repository o'zining unikal GitHub URL manziliga ega bo'ladi.
        </li>
      </KeyPoints>
    </>
  )
}
