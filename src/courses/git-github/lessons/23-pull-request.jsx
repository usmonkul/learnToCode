import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Pull Request',
  section: 'Modul 5. GitHub Collaboration',
}

export default function Lesson23PullRequest() {
  return (
    <>
      <h2>Pull Request (PR) nima?</h2>
      <p>
        <strong>Pull Request (PR)</strong> — bu GitHub'ning jamoaviy ishlashdagi eng asosiy va muhim vositasidir. U dasturchiga o'zi yozgan kodi va branch'ini asosiy <code>main</code> branch'ga qo'shish taklifini bildirish va jamoadoshlaridan tekshiruv (Code Review) so'rash imkonini beradi.
      </p>

      <h2>Pull Request workflow (Ish tartibi)</h2>
      <ol>
        <li>Dasturchi alohida <code>feature-login</code> branch ochib, kodi bilan GitHub'ga push qiladi.</li>
        <li>GitHub saytida <strong>Compare & pull request</strong> tugmasi paydo bo'ladi.</li>
        <li>Dasturchi PR sarlavhasi (title) va batafsil ta'rifini (description) yozib, Pull Request ochadi.</li>
        <li>Jamoadoshlar yoki Senior dasturchilar kodni ko'rib chiqib (Review), izoh berishadi yoki tasdiqlashadi (Approve).</li>
        <li>Tasdiqlangach, PR <strong>Merge pull request</strong> tugmasi orqali <code>main</code>ga qo me'moriy qo'shiladi.</li>
      </ol>

      <Quiz
        question="Pull Request (PR) ning asosiy maqsadi nimadan iborat?"
        options={[
          'Serverdagi barcha fayllarni o\'chirish',
          'Branch kodi asosiy (main) branch\'ga qo\'shilishidan oldin uni jamoa bilan ko\'rib chiqish va tasdiqlash',
          'Terminal buyruqlarini avtomatik bajartirish',
          'Kodni kompyuterga zip qilib yuklab olish',
        ]}
        correctIndex={1}
        explanation="Pull Request yangi kodni asosiy tarmoqqa qo'shishdan avval uni ko'rib chiqish va muammolarni aniqlash imkonini beradi."
      />

      <Exercise title="Mashq: O'z loyihangizda Pull Request ochish">
        <p>
          1. Loyihangizda yangi branch ochib kodingizni GitHub'ga push qiling.
          <br />
          2. GitHub sahifangizga kirib, <strong>Pull Requests</strong> bo'limidan yangi PR yarating.
        </p>
        <Solution>
          <p>
            PR ochilgandan so'ng, uning ostida o'zgarishlar diff ko'rinishida namoyon bo'ladi va <strong>Merge pull request</strong> tugmasi paydo bo'ladi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Pull Request (PR) yangi kodni asosiy loyihaga birlashtirish taklifidir.
        </li>
        <li>
          PR orqali Code Review (kod ko me me'moriy ko'rigi) amalga oshiriladi.
        </li>
        <li>
          Tasdiqlangan PR GitHub veb-interfeysida merge qilinadi.
        </li>
      </KeyPoints>
    </>
  )
}
