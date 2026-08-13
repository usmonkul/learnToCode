import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Collaborators va Teamwork',
  section: 'Modul 5. GitHub Collaboration',
}

export default function Lesson25CollaboratorsVaTeamwork() {
  return (
    <>
      <h2>Collaborator (Hamkor dasturchi) taklif qilish</h2>
      <p>
        Agarda siz xususiy yoki ommaviy repository'ingizda boshqa dasturchi bilan birga ishlamoqchi bo'lsangiz, uni <strong>Collaborator</strong> sifatida taklif qilishingiz kerak.
      </p>

      <h2>Taklif qilish ketma-ketligi</h2>
      <ol>
        <li>Repository sahifasidagi <strong>Settings</strong> bo'limiga kiring.</li>
        <li>Chap menyudan <strong>Collaborators</strong> (yoki <em>Access</em>) bo'limini tanlang.</li>
        <li><strong>Add people</strong> tugmasini bosib, hamkoringizning GitHub username yoki email manzilini kiriting.</li>
        <li>Hamkoringiz taklifni (invitation) qabul qilgach, u repository'ga to'g me-to'g'ri push qilish huquqiga ega bo'ladi.</li>
      </ol>

      <Quiz
        question="Boshqa dasturchiga repository kodingizni o'zgartirish va push qilish ruxsatini berish uchun nima qilish kerak?"
        options={[
          'Unga kompyuteringiz parolini berish',
          'Settings -> Collaborators bo\'limidan uni loyihaga taklif qilish',
          'Faqat telegram guruhida fayl ulashish',
          'Barcha fayllarni public qilib o\'chirish',
        ]}
        correctIndex={1}
        explanation="Collaborator taklifi boshqa dasturchiga repository'da to'g'ridan-to'g me push va pull qilish huquqini taqdim etadi."
      />

      <Exercise title="Mini project: Jamoadosh bilan hamkorlik amaliyoti">
        <p>
          Do'stingizni repository'ingizga Collaborator qilib qo'shing. U loyihani <code>git clone</code> qilib olsin va yangi branch ochib kiritgan o'zgarishini PR orqali taqdim etsin.
        </p>
        <Solution>
          <p>
            Ushbu amaliyot haqiqiy IT kompaniyalarda har kuni qo'llaniladigan jamoaviy ishlash madaniyatini shakllantiradi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Collaborators — loyihada push/pull huquqiga ega jamoadoshlar.
        </li>
        <li>
          Takliflar Settings -&gt; Collaborators bo'limidan yuboriladi.
        </li>
      </KeyPoints>
    </>
  )
}
