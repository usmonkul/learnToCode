import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'GitHub Profile va developer portfolio',
  section: 'Modul 1. GitHub bilan tanishish',
}

export default function Lesson04GitHubProfileVaPortfolio() {
  return (
    <>
      <h2>GitHub Profile nimasi bilan muhim?</h2>
      <p>
        Zamonaviy dasturlash sohasida GitHub profilingiz sizning raqamli <strong>rezyumengiz</strong> hisoblanadi. IT kompaniyalar va rekruterlar dasturchini ishga saralashda uning nazariy rezyumesidan ko'ra GitHub'dagi faolligi va kod yozish madaniyatiga ko'proq e'tibor qaratishadi.
      </p>

      <h2>Profilning asosiy elementlari</h2>
      <p>
        Mukammal GitHub profilida quyidagi elementlar to'g'ri sozlagan bo'lishi kerak:
      </p>

      <h3>1. Profil ma'lumotlari (Profile Bio & Photo)</h3>
      <ul>
        <li><strong>Aniq va aniqlashtirilgan rasm (Avatar):</strong> Professional va aniq ko'rinadigan shaxsiy rasm.</li>
        <li><strong>Bio (Qisqacha ta'rif):</strong> Qaysi sohada ishlayotganingiz yoki nimani o'rganayotganingiz (masalan: <em>Frontend Developer | React & JavaScript Enthusiast</em>).</li>
        <li><strong>Location va Links:</strong> Shahringiz va LinkedIn yoki shaxsiy veb-saytingiz havolalari.</li>
      </ul>

      <h3>2. Contribution Graph (Faollik grafigi)</h3>
      <p>
        Profil markazida joylashgan yashil kataklar katakchasi — bu sizning <strong>Contribution Graph</strong>'ingizdir. Har safar GitHub'ga kod yuborganingizda (commit, pull request, issue) o'sha kunga tegishli katakcha yashil tusga kiradi.
      </p>
      <p>
        Bu grafik sizning dasturlash bilan qanchalik muntazam shug'ullanayotganingizni ko'rsatib beradi.
      </p>

      <h3>3. Pinned Repositories (Qadab qo'yilgan loyihalar)</h3>
      <p>
        Profil sahifangizning eng yuqori qismiga o'zingizning eng sifatli <strong>6 tagacha repository</strong>'ingizni qadab (pin qilib) qo me'moriy qo'yishingiz mumkin. Profildagi "Customize your pins" tugmasi orqali saralanadi.
      </p>

      <Quiz
        question="GitHub profilida Pinned Repositories bo'limi nima uchun ishlatiladi?"
        options={[
          'Barcha repository\'larni tasodifiy tartibda ko\'rsatish uchun',
          'Eng yaxshi va sifatli loyihalarni profilning yuqori qismida ajratib ko\'rsatish uchun',
          'Faqat yopiq (private) loyihalarni saqlash uchun',
          'Kodni avtomatik ravishda xatolardan tozalash uchun',
        ]}
        correctIndex={1}
        explanation="Pinned Repositories sizning eng yaxshi 6 tagacha loyihangizni profilning birinchi sahifasida namoyish etish imkonini beradi."
      />

      <h2>Repository nomlash madaniyati (Naming Conventions)</h2>
      <p>
        Professional dasturchi loyihalariga tartibli va aniq nom beradi. Xato va to'g'ri uslublarni solishtiring:
      </p>

      <table className="my-4 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-canvas-muted">
            <th className="p-3 font-semibold text-ink">Noto'g'ri / Professional emas</th>
            <th className="p-3 font-semibold text-ink">To'g'ri / Professional</th>
            <th className="p-3 font-semibold text-ink">Sababi</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line">
            <td className="p-3 text-ink-muted"><code>project1</code>, <code>test123</code></td>
            <td className="p-3 text-ink-muted"><code>weather-dashboard-app</code></td>
            <td className="p-3 text-ink-muted">Loyiha mazmunini aniq ifodalaydi</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 text-ink-muted"><code>Mening Yangi Proektim</code></td>
            <td className="p-3 text-ink-muted"><code>online-store-frontend</code></td>
            <td className="p-3 text-ink-muted">Bo'sh joy va katta harflar ishlatilmaydi</td>
          </tr>
        </tbody>
      </table>

      <h2>Maxsus Profile README repository</h2>
      <p>
        GitHub'da maxsus funksiya mavjud: agar siz <strong>username'ingiz bilan bir xil nomda</strong> Public repository yaratsangiz (masalan: username <code>eldor-dev</code> bo'lsa, repo nomi <code>eldor-dev</code>), ushbu repository'dagi README.md fayli sizning asosiy profil sahifangizda kartochka sifatida paydo bo'ladi.
      </p>

      <Callout type="tip" title="Profile README Imkoniyatlari">
        Ushbu faylga o'zingiz haqingizda to'liqroq portfolio, ko'nikmalaringiz (skills), bog'lanish ma'lumotlari va hatto statistikangizni yerlashtirishingiz mumkin.
      </Callout>

      <Exercise title="Kichik mashq: Profilni tartibga keltirish">
        <p>
          GitHub profil sahifangizga kirib, quyidagi amallarni bajaring:
        </p>
        <ol>
          <li><strong>Edit profile</strong> tugmasini bosing.</li>
          <li>Ism-sharifingiz va Bio bo'limiga mutaxassisligingizni yozing (masalan: <em>Learning Git & Web Development</em>).</li>
          <li>Mavjud repository'laringizdan eng yaxshilarini <strong>Customize your pins</strong> orqali qadab qo'ying.</li>
        </ol>
        <Solution>
          <p>
            Profil ma'lumotlari yangilangach, profil sahifangiz yanada tartibli va professional ko'rinishga ega bo'ladi.
          </p>
        </Solution>
      </Exercise>

      <Exercise title="Challenge: Shaxsiy Special Profile README yaratish">
        <p>
          GitHub'da o'zingizning username'ingiz bilan bir xil nomda yangi Public repository yarating va quyidagi tarkibda README.md yozing:
        </p>
        <Solution>
          <CodeBlock lang="markdown">{`# Salom, men [Sizning Ismingiz]! 👋

Men dasturlashni va veb-texnologiyalarni o'rganmoqdaman.

## 🚀 Men haqimda
- 🔭 Hozirda **Git va GitHub Fundamentals** kursini o'rganmoqdaman.
- 🌱 Texnologiyalarim: HTML5, CSS3, JavaScript, Git.
- 💬 Men bilan bog'lanish: [LinkedIn](https://linkedin.com) yoki Email orqali.`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          GitHub profil — dasturchining amaliy portfolio rezyumesidir.
        </li>
        <li>
          Contribution Graph doimiy kod yozish faolligingizni ko'rsatadi.
        </li>
        <li>
          Pinned Repositories eng saralangan 6 ta loyihangizni namoyish etadi.
        </li>
        <li>
          Username bilan bir xil nomdagi repository profilga maxsus README kartochkasi qo'shadi.
        </li>
      </KeyPoints>
    </>
  )
}
