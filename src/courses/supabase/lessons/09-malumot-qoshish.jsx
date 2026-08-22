import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Ma'lumot qo'shish (insert)",
  section: "3-bo'lim: Frontendni ulash",
}

export default function Lesson09MalumotQoshish() {
  return (
    <>
      <p>
        Oldingi darsda <code>supabase</code> klientini yaratdik, ammo u hali hech qanday amalda
        ishlatilmagan. Bugun birinchi haqiqiy amaliyotni bajaramiz: foydalanuvchi formaga vazifa
        nomini yozadi, "Qo'shish" tugmasini bosadi va shu vazifa <code>tasks</code> jadvaliga
        <strong> insert</strong> qilinadi. Buning uchun <code>TaskForm</code> komponentini
        yaratamiz va uni <code>App.jsx</code>ga ulaymiz.
      </p>

      <h2>supabase-js'da insert qanday ishlaydi</h2>
      <p>
        <code>supabase-js</code> kutubxonasi bazaga so'rov yuborish uchun zanjirlangan
        (chainable) metodlar taqdim etadi. Bitta qatorni qo'shish uchun umumiy shakl quyidagicha:
      </p>
      <CodeBlock lang="js">{`const { data, error } = await supabase
  .from('tasks')
  .insert({ title: "Kitob o'qish" })
  .select()
  .single()`}</CodeBlock>
      <p>
        Bu yerda <code>.from('tasks')</code> — qaysi jadval bilan ishlashni belgilaydi,{' '}
        <code>.insert(...)</code> — yangi qatorni qo'shadi. Standart holatda{' '}
        <code>insert</code> hech narsa qaytarmaydi (faqat muvaffaqiyat/xatolikni bildiradi);{' '}
        <code>.select()</code> qo'shilishi Supabase'ga "qo'shilgan qatorni menga qaytarib ber"
        deb aytadi, <code>.single()</code> esa natijani massiv (<code>[{'{'}...{'}'}]</code>)
        emas, balki bitta obyekt qilib qaytarishni so'raydi — chunki biz aynan bitta qator
        qo'shyapmiz. Har bir so'rov <code>{'{ data, error }'}</code> obyektini qaytaradi:
        muvaffaqiyatli bo'lsa <code>data</code> to'ladi, xatolik bo'lsa <code>error</code>{' '}
        to'ladi.
      </p>

      <Callout type="tip" title="Nega har doim error'ni tekshiramiz?">
        Tarmoq so'rovi — bu doimo muvaffaqiyatsiz bo'lishi mumkin bo'lgan amal: internet uzilishi,
        RLS policy ruxsat bermasligi, ustun nomida xato va h.k. Shuning uchun{' '}
        <code>supabase-js</code>dagi har bir so'rovdan keyin <code>error</code>ni tekshirish odat
        bo'lishi kerak — bu darsda oddiy <code>console.error</code> bilan cheklanamiz, lekin
        haqiqiy loyihada foydalanuvchiga xato haqida UI orqali xabar berish tavsiya etiladi.
      </Callout>

      <h2>TaskForm komponentini yaratish</h2>
      <p>
        <code>src/components/</code> papkasini yarating va ichiga{' '}
        <code>TaskForm.jsx</code> faylini qo'shing. Bu komponent forma holatini{' '}
        <code>useState</code> orqali boshqaradi va forma yuborilganda insert so'rovini yuboradi:
      </p>
      <CodeBlock lang="jsx">{`import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    const { data, error } = await supabase
      .from('tasks')
      .insert({ title })
      .select()
      .single()

    if (error) {
      console.error(error)
      return
    }

    onTaskAdded(data)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Yangi vazifa..."
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
      <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
        Qo'shish
      </button>
    </form>
  )
}`}</CodeBlock>
      <p>
        Diqqat qiling: <code>TaskForm</code> o'zi <code>tasks</code> ro'yxatini saqlamaydi — u
        faqat bazaga yangi qator qo'shadi va natijada kelgan <code>data</code>ni{' '}
        <code>onTaskAdded(data)</code> orqali <strong>ota komponentga</strong> uzatadi. Bu React
        komponentlari orasida keng tarqalgan naqsh: bola komponent o'z holatini emas, balki
        hodisani (event) ota komponentga xabar qiladi, ro'yxatni qayerda saqlash va yangilashni
        esa ota komponent hal qiladi.
      </p>
      <p>
        Shuningdek, <code>if (!title.trim()) return</code> qatoriga e'tibor bering — bu bo'sh
        yoki faqat probeldan iborat matn bilan bazaga bekorga so'rov yuborilishining oldini oladi.
        Muvaffaqiyatli qo'shilgandan so'ng <code>setTitle('')</code> input maydonini tozalaydi.
      </p>

      <h2>App.jsx'ga ulash</h2>
      <p>
        Endi <code>App.jsx</code>ni yozamiz. Hozircha unda faqat qo'shilgan vazifalarning{' '}
        <code>tasks</code> massivini saqlash va <code>TaskForm</code>ni ko'rsatish bor — o'qish
        (fetch) va ro'yxatni chiqarish (TaskList) keyingi darsda qo'shiladi:
      </p>
      <CodeBlock lang="jsx">{`import { useState } from 'react'
import TaskForm from './components/TaskForm'

function App() {
  const [tasks, setTasks] = useState([])

  function handleTaskAdded(newTask) {
    setTasks((prev) => [newTask, ...prev])
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">Vazifalar boshqaruvchisi</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
    </div>
  )
}

export default App`}</CodeBlock>
      <p>
        <code>handleTaskAdded</code> — <code>TaskForm</code>dan kelgan yangi vazifani{' '}
        <code>tasks</code> massivining boshiga qo'shadi (<code>[newTask, ...prev]</code>), shuning
        uchun eng yangi vazifa ro'yxatning tepasida chiqadi. Hozircha <code>tasks</code>ni ekranda
        ko'rsatadigan komponent yo'q — buni keyingi darsda <code>TaskList</code> orqali qo'shamiz.
        Lekin siz allaqachon React DevTools yoki vaqtinchalik{' '}
        <code>{'{JSON.stringify(tasks)}'}</code> yordamida <code>tasks</code> holati
        yangilanayotganini tekshirib ko'rishingiz mumkin.
      </p>

      <Exercise title="Mashq: yuborishdan oldin tekshiruv qo'shish">
        <p>
          Hozirgi <code>TaskForm</code> vazifa nomi 100 belgidan uzun bo'lsa ham uni bazaga
          yuborishga ruxsat beradi. <code>handleSubmit</code> funksiyasini shunday o'zgartiringki,
          agar <code>title.trim().length</code> 100 dan katta bo'lsa, forma{' '}
          <code>console.error</code> orqali xabar bersin va bazaga so'rov umuman yuborilmasin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`async function handleSubmit(e) {
  e.preventDefault()
  const trimmed = title.trim()
  if (!trimmed) return

  if (trimmed.length > 100) {
    console.error("Vazifa nomi 100 belgidan uzun bo'lishi mumkin emas")
    return
  }

  const { data, error } = await supabase
    .from('tasks')
    .insert({ title: trimmed })
    .select()
    .single()

  if (error) {
    console.error(error)
    return
  }

  onTaskAdded(data)
  setTitle('')
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Quiz
        question="TaskForm komponenti nega tasks massivini o'zida saqlamay, onTaskAdded orqali ota komponentga uzatadi?"
        options={[
          "Chunki useState faqat bitta komponentda bir marta ishlatilishi mumkin",
          "Chunki bir nechta komponent (masalan, kelajakda TaskList) bir xil tasks ma'lumotidan foydalanishi kerak bo'lishi mumkin, shuning uchun holatni umumiy ota komponentda saqlash qulayroq",
          "Chunki supabase-js insert natijasini faqat ota komponentlarga qaytaradi",
          "Chunki bola komponentlar useState'dan foydalana olmaydi",
        ]}
        correctIndex={1}
        explanation="Bir nechta komponent bir xil ma'lumotga muhtoj bo'lganda, uni umumiy ota komponentda saqlab, kerakli komponentlarga props orqali uzatish odatiy React naqshidir — bu 'holatni yuqoriga ko'tarish' (lifting state up) deb ataladi."
      />

      <KeyPoints>
        <li>
          <code>supabase.from('tasks').insert({'{ title }'}).select().single()</code> — bitta
          qator qo'shadi va uni <code>data</code> sifatida qaytaradi.
        </li>
        <li>
          Har bir supabase-js so'rovi <code>{'{ data, error }'}</code> qaytaradi — <code>error</code>
          ni tekshirish har doim shart.
        </li>
        <li>
          <code>TaskForm</code> o'z ichida vazifalar ro'yxatini saqlamaydi — u faqat insert
          qiladi va natijani <code>onTaskAdded</code> callback orqali ota komponentga xabar
          qiladi.
        </li>
        <li>
          <code>App.jsx</code>dagi <code>tasks</code> holati — butun ilova uchun "yagona haqiqat
          manbai" (single source of truth) bo'lib xizmat qiladi.
        </li>
      </KeyPoints>
    </>
  )
}
