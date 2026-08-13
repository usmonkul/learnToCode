import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Git nima?',
  section: 'Modul 2. Git asoslari',
}

export default function Lesson05GitNima() {
  return (
    <>
      <h2>Git nima?</h2>
      <p>
        <strong>Git</strong> — bu dasturchilar uchun mo'ljallangan va dunyo bo'ylab keng tarqalgan <strong>Distributed Version Control System (Taqsimlangan Versiyalarni Boshqarish Tizimi)</strong> hisoblanadi. U 2005-yilda Linux operatsion tizimi asoschisi Linus Torvalds tomonidan yaratilgan.
      </p>
      <p>
        Git loyihangizdagi har bir fayl va koddagi o'zgarishlarni vaqt bo'yicha suratga oladi (snapshot) hamda ularni tartibli ravishda saqlab boradi.
      </p>

      <h2>Version Control System (VCS) nima va nega kerak?</h2>
      <p>
        Tasavvur qiling, siz katta veb-sayt ustida ishlayapsiz va yangi funksiya qo'shgach, butun sayt buzilib qoldi. Agar sizda versiyalar nazorati bo'lmasa, qaysi qator kod xatoga olib kelganini topish juda qiyin bo'ladi.
      </p>
      <p>
        Git kabi VCS tizimi mavjud bo'lganda esa:
      </p>
      <ul>
        <li>Koddagi har bir o'zgarish kim tomonidan va qachon kiritilganini aniq ko'rish;</li>
        <li>Istalgan vaqtda loyihaning 1 kun, 1 hafta yoki 1 oy oldingi ishlayotgan holatiga bir soniyada qaytish;</li>
        <li>Bir nechta dasturchilar bir vaqtning o'zida bitta loyihaning turli qismlarida parallel ishlashi mumkin.</li>
      </ul>

      <h2>Eng muhim model: Git va GitHub o'rtasidagi farq</h2>
      <p>
        Dasturlashni o'rganayotgan ko'pchilik o'quvchilar ushbu ikki tushunchani chalkashtirishadi. Ularning farqini bir umrga eslab qoling:
      </p>

      <div className="my-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-line bg-canvas p-4">
          <h3 className="mt-0 text-base font-semibold text-ink">Git (Dastur)</h3>
          <p className="mb-0 text-sm text-ink-muted">
            Bu sizning lokal kompyuteringizda ishlaydigan konsol (terminal) buyruqlar dasturi. U internet talab qilmaydi va fayllaringiz tarixini kompyuter xotirasida saqlaydi.
          </p>
        </div>
        <div className="rounded-lg border border-line bg-canvas p-4">
          <h3 className="mt-0 text-base font-semibold text-ink">GitHub (Bulutli Platforma)</h3>
          <p className="mb-0 text-sm text-ink-muted">
            Bu internetda joylashgan onlayn platforma. U Git orqali saqlangan repository'larni bulutda saqlash va boshqa dasturchilar bilan ulashish imkonini beradi.
          </p>
        </div>
      </div>

      <Callout type="note" title="Mantiqiy o'xshatish">
        Git bu <strong>videokamera</strong> (o'zgarishlarni tasvirga oladi), GitHub esa <strong>YouTube</strong> (tasvirga olingan videolarni internetga joylaydi va boshqalarga ulashadi).
      </Callout>

      <Quiz
        question="Git va GitHub o'rtasidagi asosiy farq nimada?"
        options={[
          'Git va GitHub bir xil narsa, faqat nomlanishi turlicha',
          'Git — kompyuterdagi versiyalarni boshqarish vositasi, GitHub — repository\'larni internetda saqlash platformasi',
          'Git faqat HTML uchun ishlatiladi, GitHub esa JavaScript uchun',
          'Git pullik dastur, GitHub esa mutlaqo bepul',
        ]}
        correctIndex={1}
        explanation="Git — bu kompyuteringizda mahalliy ishlaydigan version control dasturi, GitHub esa o'sha repository'larni bulutda saqlaydigan veb-saytdir."
      />

      <h2>Git ishlatilmagan va Git ishlatilgan loyiha</h2>
      <p>
        Amaliyotda loyihalarni boshqarishning ikki xil yondashuvini solishtiraylik:
      </p>

      <table className="my-4 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-canvas-muted">
            <th className="p-3 font-semibold text-ink">Holat</th>
            <th className="p-3 font-semibold text-ink">Git ishlatilmagan loyiha</th>
            <th className="p-3 font-semibold text-ink">Git ishlatilgan loyiha</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">Fayllarni saqlash</td>
            <td className="p-3 text-ink-muted">Papkalar nusxalanadi: <code>loyiha_v1</code>, <code>loyiha_final</code></td>
            <td className="p-3 text-ink-muted">Bitta papka saqlanadi, barcha tarixlarni Git o'zi yuritadi</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">Xatoni orqaga qaytarish</td>
            <td className="p-3 text-ink-muted">Kod o'chib ketsa qaytarishning iloji yo'q (Ctrl+Z cheklangan)</td>
            <td className="p-3 text-ink-muted">O'tmishdagi istalgan commit versiyasiga darhol qaytish mumkin</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">Jamoada ishlash</td>
            <td className="p-3 text-ink-muted">Fayllar Telegram'dan yuboriladi, kodlar aralashib ketadi</td>
            <td className="p-3 text-ink-muted">Har bir dasturchi alohida branch'da xavfsiz ishlaydi</td>
          </tr>
        </tbody>
      </table>

      <Exercise title="Mashq: Git farqini tushuntirib bering">
        <p>
          Do'stingiz sizdan <em>"Nega kodlarimni oddiy zip qilib saqlamay, Git o'rganishim kerak?"</em> deb so'radi. Unga Git'ning eng katta 3 ta afzalligini tushuntirib bering.
        </p>
        <Solution>
          <ul>
            <li><strong>1. Kaosning yo'qolishi:</strong> O'nlab zip papkalar o'rniga bitta toza loyiha papkasi bo'ladi.</li>
            <li><strong>2. Xavfsizlik va vaqt mashinasi:</strong> Koddagi xatolik yuz berganda, ishlayotgan istalgan eski versiyaga qaytish mumkin.</li>
            <li><strong>3. Parallel ishlash:</strong> Jamoa a'zolari bir faylni bir vaqtda o'zgartirganda kodlar bir-birini o'chirib yubormaydi.</li>
          </ul>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Git — bu taqsimlangan versiyalarni boshqarish tizimi (VCS).
        </li>
        <li>
          Git kompyuteringizda lokal ishlaydi; GitHub esa tarmoqdagi bulutli platformadir.
        </li>
        <li>
          Git har bir o'zgarish snapshot'ini saqlaydi va o'tmishdagi versiyalarga qaytish imkonini beradi.
        </li>
      </KeyPoints>
    </>
  )
}
