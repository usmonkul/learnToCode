import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Branch nima?',
  section: 'Modul 4. Branching',
}

export default function Lesson18BranchNima() {
  return (
    <>
      <h2>Branch (Tarmoq) nima?</h2>
      <p>
        <strong>Branch</strong> — bu loyihaning asosiy kodidan ajralib chiqqan mustaqil ish sohasi (tarmog'i) hisoblanadi.
      </p>
      <p>
        Daraxtning shoxlarini tasvirga keltiring: uning asosiy tanasi (<code>main</code> branch) mavjud va har bir yangi funksiya (masalan: <code>feature-login</code>, <code>feature-navbar</code>) alohida shoxlarda ishlab chiqiladi.
      </p>

      <h2>Nega main branch'da to'g'ridan-to'g'ri ishlamaslik kerak?</h2>
      <p>
        <code>main</code> (yoki <code>master</code>) branch bu loyihangizning <strong>tayyor va ishlayotgan ishlab chiqarish (production) kodi</strong> saqlanadigan joyidir.
      </p>
      <ul>
        <li>Agarda siz yangi xususiyatni to'g me-to'g'ri <code>main</code>da yozsangiz va xato qilsangiz, butun tayyor veb-sayt ishdan chiqadi.</li>
        <li>Branch yaratib ishlash esa asosiy kodga zarar yetkazmasdan erkin tajriba o'tkazish imkonini beradi.</li>
      </ul>

      <Callout type="tip" title="Feature Branch Workflow">
        Har bir yangi vazifa yoki funksiyadorlik uchun alohida <strong>feature branch</strong> yarating. Tayyor bo'lgach, uni tekshirib <code>main</code>ga qo me'moriy qo'shasiz.
      </Callout>

      <Quiz
        question="Nima uchun loyihaga yangi funksiya qo'shishda alohida branch ishlatiladi?"
        options={[
          'Chunki main branch\'da fayl yaratish taqiqlangan',
          'Asosiy (main) ishlayotgan koddagi barqarorlikni buzmasdan, xavfsiz parallel ishlash uchun',
          'Branch ishlatilsa fayllar hajmi 2 baravar kichrayadi',
          'Git faqat branchlar orqali ishlaydi',
        ]}
        correctIndex={1}
        explanation="Branch'lar yangi kodni asosiy barqaror koddan (main) ayri holda xavfsiz ishlab chiqishga xizmat qiladi."
      />

      <Exercise title="Mashq: Branch modellarini o'rganish">
        <p>
          Standard branch strukturasini o'rganing:
        </p>
        <CodeBlock lang="text">{`main (ishlab chiqarish kodi)
 │
 ├── feature-login (kirish sahifasi)
 ├── feature-navbar (menyu)
 └── feature-footer (pastki qism)`}</CodeBlock>
        <Solution>
          <p>Ushbu model jamoada tartib va xavfsizlikni ta'minlaydi.</p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Branch loyihaning parallel va mustaqil ish tarmog'idir.
        </li>
        <li>
          <code>main</code> branch doimo barqaror va tayyor kod saqlanadigan joydir.
        </li>
      </KeyPoints>
    </>
  )
}
