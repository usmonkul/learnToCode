import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Yuklangan faylni ko'rsatish",
  section: "6-bo'lim: Fayllarni saqlash",
}

export default function Lesson22FayliniKorsatish() {
  return (
    <>
      <p>
        Endi loyihamizda vazifalar fayl bilan yuklanishi mumkin — <code>tasks</code> jadvalidagi{' '}
        <code>file_path</code> ustunida shu faylning Storage ichidagi yo'li saqlanadi. Ammo
        hozircha bu ma'lumot foydalanuvchiga hech qanday ko'rinishda ko'rsatilmayapti. Bu darsda{' '}
        <code>TaskList.jsx</code> komponentini kengaytirib, fayli bor vazifalar yonida bosish
        mumkin bo'lgan havola chiqaramiz.
      </p>

      <h2>Yo'ldan haqiqiy URL'ga: <code>getPublicUrl()</code></h2>
      <p>
        Eslatib o'tamiz: <code>file_path</code> ustunida saqlanadigan qiymat — oddiy matn, masalan{' '}
        <code>{'"a1b2c3d4-shartnoma.pdf"'}</code>. Bu — brauzerda ochib bo'lmaydigan qiymat, chunki
        u to'liq URL emas. Uni haqiqiy, bosish mumkin bo'lgan manzilga aylantirish uchun Supabase
        Storage API'sining <code>getPublicUrl()</code> metodidan foydalanamiz:
      </p>
      <CodeBlock lang="jsx">{`const { data } = supabase.storage.from('task-files').getPublicUrl(task.file_path)
console.log(data.publicUrl)
// https://xxxxxxxxxxxx.supabase.co/storage/v1/object/public/task-files/a1b2c3d4-shartnoma.pdf`}</CodeBlock>
      <p>
        E'tibor bering: <code>getPublicUrl()</code> hech qanday tarmoq so'rovi
        yubormaydi — u faqat berilgan bucket nomi, loyihangiz manzili va fayl yo'lidan{' '}
        <strong>matematik tarzda</strong> URL yasab beradi (chunki bucket public bo'lgani uchun
        bu manzil doim bir xil formulaga bo'ysunadi). Shuning uchun uni <code>await</code>{' '}
        bilan chaqirish shart emas — u sinxron funksiya.
      </p>

      <Callout type="note" title="Private bucket bo'lganda farq">
        Agar bucket private bo'lganida, shu formuladagi URL ishlamas edi — chunki server har bir
        so'rovda ruxsatni tekshirishi kerak bo'lardi. O'sha holatda{' '}
        <code>getPublicUrl()</code> o'rniga <code>await supabase.storage.from(...).createSignedUrl(path, expiresIn)</code>{' '}
        chaqirilar edi — bu haqiqatan tarmoq so'rovi yuboradi va server tomonidan imzolangan,
        muddatli URL qaytaradi. Bizning holatimizda bucket public bo'lgani uchun soddaroq{' '}
        <code>getPublicUrl()</code> yetarli.
      </Callout>

      <h2><code>TaskList.jsx</code>ni kengaytirish</h2>
      <p>
        Hozirgacha <code>TaskList.jsx</code> Supabase bilan bevosita ishlamagan — u faqat props
        orqali kelgan <code>tasks</code> massivini ekranga chiqargan. Endi unga{' '}
        <code>getPublicUrl()</code>ni chaqirish uchun <code>supabase</code> klientini import
        qilishimiz kerak:
      </p>
      <CodeBlock lang="jsx">{`import { supabase } from '../supabaseClient'

export default function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul className="mt-4 flex flex-col gap-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={task.is_done} onChange={() => onToggle(task.id, task.is_done)} />
            <span className={task.is_done ? 'text-gray-400 line-through' : ''}>{task.title}</span>
          </label>
          <div className="flex items-center gap-3">
            {task.file_path && (
              <a
                href={supabase.storage.from('task-files').getPublicUrl(task.file_path).data.publicUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600 underline"
              >
                Fayl
              </a>
            )}
            <button onClick={() => onDelete(task.id)} className="text-sm text-red-500 hover:text-red-700">
              O'chirish
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}`}</CodeBlock>
      <p>
        Eng muhim qism — <code>{'{task.file_path && (...)}'}</code> sharti. <code>file_path</code>{' '}
        ustuni <code>nullable</code> qilib yaratilgani esingizda bo'lsa kerak — fayli bo'lmagan
        vazifalarda bu qiymat <code>null</code>. JavaScript'da <code>null</code> — "yolg'on"
        (falsy) qiymat hisoblanadi, shuning uchun <code>&&</code> operatori chapdagi shart{' '}
        <code>false</code> bo'lganda o'ngdagi JSX'ni umuman render qilmaydi. Natijada fayli bor
        vazifalar yonida "Fayl" havolasi chiqadi, fayli yo'qlarida esa hech narsa
        ko'rsatilmaydi.
      </p>
      <p>
        Havola atributlariga ham e'tibor bering: <code>target="_blank"</code> faylni yangi
        brauzer tabida ochadi, <code>rel="noreferrer"</code> esa xavfsizlik uchun qo'shiladi —
        yangi tabga ochilgan sahifa asl sahifaga (<code>window.opener</code> orqali) kirish
        huquqiga ega bo'lmasligini ta'minlaydi.
      </p>

      <Callout type="tip" title="getPublicUrl() natijasini o'zgaruvchiga chiqarib olish mumkin">
        JSX ichida to'g'ridan-to'g'ri zanjirli chaqiruv (
        <code>{'supabase.storage.from(...).getPublicUrl(...).data.publicUrl'}</code>) yozish
        ishlaydi, lekin o'qishni qiyinlashtiradi. Kattaroq komponentlarda buni{' '}
        <code>.map()</code> ichida alohida o'zgaruvchiga chiqarib olish tavsiya etiladi, masalan:{' '}
        <code>{'const fileUrl = task.file_path ? supabase.storage.from("task-files").getPublicUrl(task.file_path).data.publicUrl : null'}</code>{' '}
        — shundan keyin JSX ichida shunchaki <code>{'{fileUrl && <a href={fileUrl}>...</a>}'}</code>{' '}
        deb yozish qulayroq.
      </Callout>

      <Quiz
        question="Nega TaskList.jsx komponentiga getPublicUrl()ni chaqirish uchun await qo'yilmagan?"
        options={[
          "getPublicUrl() hech qachon xato qaytarmaydi, shuning uchun await shart emas",
          "getPublicUrl() tarmoq so'rovi yubormaydi — u faqat bucket nomi, loyiha manzili va fayl yo'lidan sinxron ravishda URL yasaydi",
          "React komponentlari ichida await operatorini umuman ishlatib bo'lmaydi",
          "await faqat insert va update operatsiyalarida kerak, select va Storage metodlarida shart emas"
        ]}
        correctIndex={1}
        explanation="getPublicUrl() serverga hech qanday so'rov yubormaydi — public bucket uchun URL manzili doim bir xil formula bo'yicha hisoblanadi (loyiha manzili + bucket nomi + fayl yo'li), shuning uchun u darhol, sinxron ravishda natija qaytaradi."
      />

      <Exercise title="Mashq: Fayl kengaytmasiga qarab boshqacha yorliq ko'rsatish">
        <p>
          Hozirgi kodda fayli bor har bir vazifa yonida bir xil "Fayl" matni chiqadi. Kodni
          o'zgartirib, agar fayl nomi <code>.pdf</code> bilan tugasa "PDF ko'rish", aks holda
          "Faylni ochish" matni chiqadigan qiling. Maslahat: <code>task.file_path</code> — bu
          matn, uning <code>.endsWith(".pdf")</code> metodidan foydalanishingiz mumkin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`{task.file_path && (
  <a
    href={supabase.storage.from('task-files').getPublicUrl(task.file_path).data.publicUrl}
    target="_blank"
    rel="noreferrer"
    className="text-sm text-blue-600 underline"
  >
    {task.file_path.endsWith('.pdf') ? "PDF ko'rish" : "Faylni ochish"}
  </a>
)}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>getPublicUrl(path)</code> — <code>file_path</code>dagi qisqa yo'lni to'liq,
          brauzerda ochish mumkin bo'lgan URL'ga aylantiradi; u sinxron ishlaydi va hech qanday
          tarmoq so'rovi yubormaydi (chunki bucket public).
        </li>
        <li>
          <code>TaskList.jsx</code> endi <code>supabase</code> klientini o'zi ham import qiladi —
          Storage API'siga to'g'ridan-to'g'ri murojaat qilish uchun.
        </li>
        <li>
          <code>{'{task.file_path && <a ...>Fayl</a>}'}</code> — <code>null</code> qiymat uchun
          havola umuman render qilinmaydi, shu tariqa fayli yo'q vazifalar toza ko'rinishda
          qoladi.
        </li>
        <li>
          <code>target="_blank"</code> bilan birga <code>rel="noreferrer"</code> yozish —
          yangi tabda ochilgan havolalar uchun xavfsizlik bo'yicha yaxshi amaliyot hisoblanadi.
        </li>
        <li>
          Private bucket holatida <code>getPublicUrl()</code> o'rniga muddatli{' '}
          <code>createSignedUrl()</code> ishlatilar edi, chunki u haqiqiy server tomonidan
          tekshiruvni talab qiladi.
        </li>
      </KeyPoints>
    </>
  )
}
