import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Pull Request (PR)',
  section: 'Modul 5. GitHub Collaboration',
}

export default function Lesson23PullRequest() {
  return (
    <>
      <h2>Pull Request (PR) nima?</h2>
      <p>
        <strong>Pull Request (PR)</strong> — bu o'z branch'ingizda yozgan kodingizni asosiy branch'ga (masalan: <code>main</code>) qo'shish (merge qilish) uchun jamoa a'zolari yoki loyiha rahbarlariga yuboriladigan rasmiy so'rovdir.
      </p>
      <p>
        PR orqali jamoa kodingizni tekshiradi (Code Review), fikr-mulohazalar bildiradi, sinovdan o'tkazadi va ma'qullangach, asosiy kodga birlashtiradi.
      </p>

      <h2>Pull Request ochish bosqichlari</h2>
      <ol>
        <li>Yangi feature branch'da kod yozing va commit qiling: <code>git commit -m "Add search bar"</code></li>
        <li>Branch'ni GitHub'ga yuklang: <code>git push -u origin feature-search</code></li>
        <li>GitHub'dagi repository sahifasiga o'ting va <strong>"Compare & pull request"</strong> tugmasini bosing.</li>
        <li>PR sarlavhasi va tushunarli tavsifini (description) yozing.</li>
        <li><strong>"Create pull request"</strong> tugmasini bosib so'rovni oching.</li>
      </ol>

      <h2>Code Review va Merging</h2>
      <p>
        PR ochilgandan keyin:
      </p>
      <ul>
        <li><strong>Reviewers:</strong> Boshqa dasturchilar kodingizni ko'rib chiqadi va kerak bo'lsa o'zgartirishlar so'raydi.</li>
        <li><strong>Approve:</strong> Kod tekshirilib tasdiqlangach, <em>"Merge pull request"</em> tugmasi orqali kod <code>main</code>ga qo'shiladi.</li>
        <li><strong>Delete branch:</strong> Merge qilingan feature branch odatda xavfsiz o'chiriladi.</li>
      </ul>

      <Callout type="tip" title="Kichik va aniq PR oching">
        Katta hajmli PR'larni tekshirish qiyin bo'ladi. Har bir alohida vazifa uchun bitta kichik va aniq Pull Request ochish maqsadga muvofiqdir.
      </Callout>

      <Quiz
        question="Feature branch'dagi yangi o'zgarishlarni asosiy 'main' branch'ga qo'shishdan oldin jamoa tekshiruvi (Code Review) uchun nima ochiladi?"
        options={[
          'GitHub Issue',
          'Pull Request (PR)',
          'Git Tag',
          'GitHub Action',
        ]}
        correctIndex={1}
        explanation="Pull Request (PR) orqali kodingiz boshqa dasturchilar tomonidan ko'rib chiqiladi va asosiy branch'ga merge qilinadi."
      />

      <Exercise title="Mashq: Birinchi Pull Request'ni ochish">
        <p>
          1. <code>feature-contact</code> branch'ini yarating.<br />
          2. <code>contact.html</code> faylini qo'shib commit va push qiling.<br />
          3. GitHub'da <code>main</code> branch'ga qaratilgan Pull Request oching.
        </p>
        <Solution>
          <CodeBlock lang="bash">{`git switch -c feature-contact
# contact.html yaratiladi
git add contact.html
git commit -m "Add contact page"
git push -u origin feature-contact`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Pull Request — yangi kodni asosiy branch'ga qo'shishdan oldin tekshirish vositasi.
        </li>
        <li>
          Code Review orqali koddagi xatoliklar erta bosqichda aniqlanadi.
        </li>
        <li>
          PR tasdiqlangach (approved), kod <code>main</code>ga merge qilinadi.
        </li>
      </KeyPoints>
    </>
  )
}
