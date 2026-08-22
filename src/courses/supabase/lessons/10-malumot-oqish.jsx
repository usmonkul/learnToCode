import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Ma'lumotni o'qish (select)",
  section: "3-bo'lim: Frontendni ulash",
}

export default function Lesson10MalumotOqish() {
  return (
    <>
      <p>
        Hozircha ilovamiz vazifa qo'shishni biladi, lekin sahifani yangilasangiz (refresh) barcha
        vazifalar yo'qoladi — chunki ular faqat <code>App</code>ning xotira ichidagi{' '}
        <code>tasks</code> holatida saqlanadi, bazadan hech qachon o'qilmaydi. Bugun buni
        tuzatamiz: ilova ochilganda avtomatik ravishda <code>tasks</code> jadvalidan barcha
        qatorlarni o'qib olib, ularni ekranda ro'yxat qilib ko'rsatadigan{' '}
        <code>TaskList</code> komponentini yaratamiz.
      </p>

      <h2>supabase-js'da select qanday ishlaydi</h2>
      <p>Bazadan qatorlarni o'qish uchun umumiy shakl quyidagicha:</p>
      <CodeBlock lang="js">{`const { data, error } = await supabase
  .from('tasks')
  .select('*')
  .order('created_at', { ascending: false })`}</CodeBlock>
      <p>
        <code>.select('*')</code> — jadvalning barcha ustunlarini so'raydi (kerak bo'lsa faqat
        ma'lum ustunlarni ham tanlash mumkin, masalan <code>.select('id, title')</code>).{' '}
        <code>.order('created_at', {'{ ascending: false }'})</code> esa natijalarni{' '}
        <code>created_at</code> ustuni bo'yicha, eng yangisidan eng eskisiga qarab tartiblaydi —
        shu bois ro'yxatda eng oxirgi qo'shilgan vazifa tepada chiqadi. Insert'dan farqli
        o'laroq, bu yerda <code>.single()</code> yo'q, chunki natija bir nechta qatordan iborat
        massiv bo'lishi mumkin.
      </p>

      <h2>fetchTasks funksiyasini App.jsx'ga qo'shish</h2>
      <p>
        Bazadan o'qishni komponent birinchi marta ekranga chiqqanda avtomatik bajarish uchun{' '}
        <code>useEffect</code> hook'idan foydalanamiz. <code>App.jsx</code>ni quyidagicha
        o'zgartiring — <code>fetchTasks</code> nomli yangi funksiya va uni chaqiruvchi{' '}
        <code>useEffect</code> qo'shiladi:
      </p>
      <CodeBlock lang="jsx">{`import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setTasks(data)
  }

  function handleTaskAdded(newTask) {
    setTasks((prev) => [newTask, ...prev])
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">Vazifalar boshqaruvchisi</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList tasks={tasks} />
    </div>
  )
}

export default App`}</CodeBlock>
      <p>
        <code>useEffect(() =&gt; {'{ fetchTasks() }'}, [])</code> — bo'sh massiv{' '}
        (<code>[]</code>) ikkinchi argument sifatida berilgani sababli, bu effekt komponent{' '}
        <strong>faqat birinchi marta</strong> render bo'lganda ishga tushadi, keyingi
        render'larda esa qayta chaqirilmaydi. Aynan shu — sahifa ochilganda bazadan bir marta
        so'rov yuborishning odatiy usuli.
      </p>

      <Callout type="note" title="Nega fetchTasks alohida funksiya qilib ajratilgan?">
        <code>fetchTasks</code>ni <code>useEffect</code> ichiga to'g'ridan-to'g'ri yozish o'rniga
        alohida funksiya qilib chiqarish uni kelajakda boshqa joylardan ham chaqirish imkonini
        beradi — masalan, "yangilash" tugmasi qo'shilsa yoki xatolikdan keyin qayta urinish kerak
        bo'lsa. Hozircha u faqat <code>useEffect</code> ichida ishlatiladi, lekin bu tuzilma
        kodni kengaytirishni osonlashtiradi.
      </Callout>

      <h2>TaskList komponentini yaratish</h2>
      <p>
        Endi <code>src/components/TaskList.jsx</code> faylini yarating. Hozircha bu komponent
        faqat <strong>o'qish</strong> uchun — u <code>tasks</code> massivini props orqali qabul
        qiladi va uni <code>{'<ul>'}</code> ro'yxati sifatida chizadi:
      </p>
      <CodeBlock lang="jsx">{`export default function TaskList({ tasks }) {
  return (
    <ul className="mt-4 flex flex-col gap-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2">
          <span>{task.title}</span>
        </li>
      ))}
    </ul>
  )
}`}</CodeBlock>
      <p>
        <code>tasks.map(...)</code> — har bir vazifa uchun bitta <code>{'<li>'}</code> elementi
        yaratadi. <code>key={'{task.id}'}</code> — React'ga har bir elementni noyob tarzda
        tanishtirish uchun zarur; agar <code>key</code> berilmasa yoki noto'g'ri tanlansa (masalan
        massiv indeksi), React ro'yxat o'zgarganda elementlarni noto'g'ri solishtirib, keraksiz
        qayta render yoki hatto vizual xatoliklarga olib kelishi mumkin. <code>tasks</code>dagi
        har bir qator o'zining noyob <code>id</code>siga ega bo'lgani uchun aynan shu ustun{' '}
        <code>key</code> sifatida ideal.
      </p>
      <p>
        E'tibor bering — hozirgi <code>TaskList</code>da checkbox ham, o'chirish tugmasi ham yo'q,
        u faqat vazifa nomini ko'rsatadi. Keyingi darsda <code>onToggle</code> va{' '}
        <code>onDelete</code> callback'larini qo'shib, vazifani bajarilgan deb belgilash va
        o'chirishni ham qo'shamiz.
      </p>

      <Exercise title="Mashq: yuklanish holatini ko'rsatish">
        <p>
          Hozirgi kodda bazadan ma'lumot kelguncha foydalanuvchi bo'sh ekran ko'radi. App.jsx'ga{' '}
          <code>loading</code> nomli yangi <code>useState(true)</code> holatini qo'shing.{' '}
          <code>fetchTasks</code> boshlanganda u <code>true</code> bo'lib qolaveradi, so'rov
          tugagach (muvaffaqiyatli yoki xatolik bilan) <code>false</code>ga o'rnatilsin. So'ng{' '}
          <code>App</code>ning JSX qismida <code>loading</code> rost bo'lsa{' '}
          <code>{'<p>Yuklanmoqda...</p>'}</code>, aks holda <code>TaskList</code>ni ko'rsating.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    setLoading(true)
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      setLoading(false)
      return
    }

    setTasks(data)
    setLoading(false)
  }

  function handleTaskAdded(newTask) {
    setTasks((prev) => [newTask, ...prev])
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">Vazifalar boshqaruvchisi</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      {loading ? <p>Yuklanmoqda...</p> : <TaskList tasks={tasks} />}
    </div>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Quiz
        question="useEffect(() => { fetchTasks() }, []) qatoridagi bo'sh massiv [] nimani anglatadi?"
        options={[
          "Effekt hech qachon ishga tushmaydi",
          "Effekt har bir render'da qayta ishga tushadi",
          "Effekt faqat komponent birinchi marta render bo'lganda bir marta ishga tushadi",
          "Effekt faqat tasks o'zgarganda ishga tushadi",
        ]}
        correctIndex={2}
        explanation="useEffect'ning ikkinchi argumenti bog'liqliklar (dependencies) massivi deyiladi. Bo'sh massiv berilsa, effekt hech qanday qiymatga bog'liq emasligini bildiradi va faqat komponent birinchi marta ekranga chiqqanda bir marta ishga tushadi."
      />

      <KeyPoints>
        <li>
          <code>supabase.from('tasks').select('*').order(...)</code> — jadvaldagi barcha
          qatorlarni belgilangan tartibda o'qiydi.
        </li>
        <li>
          <code>useEffect(() =&gt; {'{ ... }'}, [])</code> — komponent birinchi marta render
          bo'lganda bir marta ishga tushadigan effekt yaratish uchun ishlatiladi (bo'sh
          bog'liqliklar massivi).
        </li>
        <li>
          <code>fetchTasks</code> — <code>useEffect</code>dan alohida funksiya qilib ajratilgan,
          bu uni kelajakda boshqa joylardan ham chaqirish imkonini beradi.
        </li>
        <li>
          <code>TaskList</code> hozircha faqat o'qish uchun — <code>tasks</code> massivini
          props orqali oladi va <code>key</code> bilan ro'yxat qilib chizadi.
        </li>
      </KeyPoints>
    </>
  )
}
