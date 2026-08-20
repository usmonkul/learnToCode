import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Collaborators va jamoaviy ishlash',
  section: 'Modul 5. GitHub Collaboration',
}

export default function Lesson25CollaboratorsVaTeamwork() {
  return (
    <>
      <h2>Collaborators (Hammualliflar) nima?</h2>
      <p>
        <strong>Collaborator</strong> — bu sizning shaxsiy yoki tashkilot repository'ingizga to'g'ridan-to'g'ri kod yozish (push qilish) va boshqarish huquqiga ega bo'lgan jamoa a'zosidir.
      </p>

      <h2>Repository'ga yangi a'zo qo'shish</h2>
      <p>
        GitHub'da do'stingiz yoki hamkasbingizni loyihaga biriktirish:
      </p>
      <ol>
        <li>Repository sahifasida <strong>Settings</strong> bo'limiga o'ting.</li>
        <li>Chap menyudan <strong>Collaborators</strong> (yoki <em>Access &gt; Collaborators</em>) bandini tanlang.</li>
        <li><strong>"Add people"</strong> tugmasini bosing.</li>
        <li>Foydalanuvchining GitHub username yoki elektron pochtasini kiriting va taklifnoma (invitation) yuboring.</li>
        <li>Foydalanuvchi o'z emailiga kelgan taklifni qabul qilgach, repository'ga kirish huquqiga ega bo'ladi.</li>
      </ol>

      <h2>Ruxsatlar va Fork tushunchasi</h2>
      <p>
        Jamoaviy ishlashda 2 xil yondashuv mavjud:
      </p>
      <ul>
        <li>
          <strong>Direct Access (Collaborator):</strong> Bitta repository ichida bir nechta odam har xil branch'lar ochib ishlaydi.
        </li>
        <li>
          <strong>Fork &amp; Pull Request:</strong> Ochiq manbali (Open Source) loyihalarda to'g'ridan-to'g'ri push qilish huquqi berilmaydi. Buning o'rniga loyiha nusxasi (Fork) olinadi va o'zgarishlar PR orqali taqdim etiladi.
        </li>
      </ul>

      <Callout type="note" title="Branch Protection qoidalari">
        Jamoaviy ishlaganda hech kim tasodifan <code>main</code> branch'ni buzib qo'ymasligi uchun GitHub Settings'da <em>Branch Protection Rules</em> yoqib qo'yiladi va to'g'ridan-to'g'ri push qilish taqiqlanadi.
      </Callout>

      <Quiz
        question="Shaxsiy GitHub repository'ga boshqa dasturchiga kod yozish va push qilish ruxsatini berish uchun qayerdan taklif yuboriladi?"
        options={[
          'Pull Requests bo\'limidan',
          'Settings > Collaborators bo\'limidan',
          'Issues bo\'limidan',
          'Insights bo\'limidan',
        ]}
        correctIndex={1}
        explanation="Repository sozlamalaridagi Settings > Collaborators bo'limidan boshqa foydalanuvchilarga taklifnoma yuboriladi."
      />

      <Exercise title="Mashq: Jamoaviy ishlash qoidalari">
        <p>
          Do'stingiz bilan birgalikda ishlash uchun quyidagi qadamlarni rejalashtiring:
        </p>
        <ol>
          <li>Do'stingizni Collaborator sifatida qo'shing.</li>
          <li>Do'stingiz <code>git clone</code> orqali loyihani ko'chirib olsin.</li>
          <li>Do'stingiz yangi branch ochib, o'zgarish kiritib PR yuborsin.</li>
        </ol>
        <Solution>
          <CodeBlock lang="bash">{`# Do'stingiz kompyuterida:
git clone https://github.com/sizning-username/loyiha.git
cd loyiha
git switch -c feature-header
# kod yoziladi
git add .
git commit -m "Add header"
git push -u origin feature-header`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Collaborators — loyihaga to'g'ridan-to'g'ri hissa qo'shish huquqiga ega a'zolar.
        </li>
        <li>
          Taklifnomalar Settings &gt; Collaborators orqali yuboriladi.
        </li>
        <li>
          Jamoada har doim branch'lar va Pull Request'lar orqali ishlash xavfsiz va toza hisoblanadi.
        </li>
      </KeyPoints>
    </>
  )
}
