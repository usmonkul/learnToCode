import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Birinchi Git repository',
  section: 'Modul 2. Git asoslari',
}

export default function Lesson07BirinchiGitRepository() {
  return (
    <>
      <h2>Lokal loyihani Git repository'ga aylantirish</h2>
      <p>
        Kompyuteringizdagi istalgan oddiy papkani Git versiyalarni boshqarish tizimiga ulashingiz mumkin. Buning uchun <code>git init</code> buyrug'idan foydalaniladi.
      </p>

      <h2>Loyiha papkasini yaratish va unga kirish</h2>
      <p>
        Dastlab terminalda yangi loyiha papkasini yarating va uning ichiga kiring:
      </p>
      <CodeBlock lang="bash">{`mkdir my-project
cd my-project`}</CodeBlock>

      <h2>git init buyrug'i va .git yashirin papkasi</h2>
      <p>
        Endi ushbu papka ichida quyidagi buyruqni ishga tushiring:
      </p>
      <CodeBlock lang="bash">{`git init`}</CodeBlock>
      <p>
        Ushbu buyruq ishga tushgach, Terminalda <em>"Initialized empty Git repository in .../my-project/.git/"</em> xabari paydo bo'ladi.
      </p>

      <Callout type="note" title=".git yashirin papkasi nima?">
        <code>git init</code> buyrug'i loyiha papkangiz ichida yashirin <code>.git</code> papkasini yaratadi. Ushbu papka ichida Git loyihangizning barcha o'zgarishlar tarixi, branch'lar va sozlamalarni saqlaydi. Ushbu papkani hech qachon qo'lda o'chirmang yoki o'zgartirmang!
      </Callout>

      <Quiz
        question="Lokal papkani Git repository'ga aylantirish uchun qaysi buyruq ishlatiladi?"
        options={[
          'git create',
          'git init',
          'git start',
          'git new',
        ]}
        correctIndex={1}
        explanation="git init buyrug'i bo'sh Git repository'sini ishga tushiradi va .git yashirin papkasini yaratadi."
      />

      <h2>Repository lifecycle (Repository hayotiy tsikli)</h2>
      <p>
        Git repository yaratilgandan so'ng, unga fayllar qo'shiladi va ular ustida ishlanadi. Oddiy ish oqimi quyidagicha:
      </p>
      <ol>
        <li>Loyihaga yangi fayl qo'shiladi yoki mavjud fayl tahrirlanadi (Working Directory).</li>
        <li>Fayllar saqlash uchun tayyorlanadi (Staging Area).</li>
        <li>O'zgarishlar versiya sifatida muhrlanadi (Commit).</li>
      </ol>

      <Exercise title="Mashq: Birinchi repository'ni initialize qilish">
        <p>
          Terminalingizda quyidagi ketma-ketlikni bajaring:
        </p>
        <ol>
          <li><code>mkdir my-project</code> buyrug'i bilan papka yarating.</li>
          <li><code>cd my-project</code> orqali papkaga kiring.</li>
          <li><code>git init</code> orqali repository'ni ishga tushiring.</li>
        </ol>
        <Solution>
          <CodeBlock lang="bash">{`$ mkdir my-project
$ cd my-project
$ git init
Initialized empty Git repository in C:/Users/User/Desktop/my-project/.git/`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>git init</code> buyrug'i oddiy papkani Git repository'siga aylantiradi.
        </li>
        <li>
          <code>.git</code> yashirin papkasi loyihaning butun versiyalar tarixini saqlaydi.
        </li>
        <li>
          .git papkasini qo'lda tahrirlash yoki o'chirish taqiqlanadi.
        </li>
      </KeyPoints>
    </>
  )
}
