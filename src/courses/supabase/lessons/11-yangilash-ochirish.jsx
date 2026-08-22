import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Yangilash va o'chirish (update/delete)",
  section: "3-bo'lim: Frontendni ulash",
}

export default function Lesson11YangilashOchirish() {
  return (
    <>
      <p>
        Ma'lumotlar bazasidagi to'rtta asosiy amal — <strong>CRUD</strong> (Create, Read, Update,
        Delete) — dan ikkitasini allaqachon bajardik: <code>insert</code> bilan vazifa qo'shdik,{' '}
        <code>select</code> bilan ro'yxatni o'qidik. Bugun oxirgi ikkisini qo'shamiz: vazifani{' '}
        <strong>bajarilgan</strong> deb belgilash (update) va vazifani{' '}
        <strong>o'chirish</strong> (delete). Shu bilan "Vazifalar boshqaruvchisi"ning asosiy
        funksionalligi to'liq bo'ladi.
      </p>

      <h2>supabase-js'da update va delete</h2>
      <p>Bitta qatorni yangilash uchun umumiy shakl:</p>
      <CodeBlock lang="js">{`const { data, error } = await supabase
  .from('tasks')
  .update({ is_done: true })
  .eq('id', 3)
  .select()
  .single()`}</CodeBlock>
      <p>
        <code>.update({'{ is_done: true }'})</code> — qaysi ustunlarni qanday qiymatga
        o'zgartirishni belgilaydi. <code>.eq('id', 3)</code> esa — <strong>qaysi qatorni</strong>{' '}
        yangilash kerakligini aniqlaydi ("id ustuni 3 ga teng bo'lgan qator"). Bu juda muhim
        qadam: <code>.eq(...)</code> filtri bo'lmasa, Supabase butun jadvaldagi{' '}
        <strong>barcha</strong> qatorlarni yangilashga urinadi (odatda buni RLS to'xtatadi, lekin
        har doim aniq filtr yozish yaxshi odat).
      </p>
      <p>O'chirish esa yanada soddaroq — faqat filtr kerak, yangilanadigan qiymat yo'q:</p>
      <CodeBlock lang="js">{`const { error } = await supabase
  .from('tasks')
  .delete()
  .eq('id', 3)`}</CodeBlock>
      <p>
        <code>delete()</code> odatda o'chirilgan qatorni qaytarmaydi, shuning uchun bu yerda faqat{' '}
        <code>error</code>ni destructuring qilamiz.
      </p>

      <h2>App.jsx'ga handleToggle va handleDelete qo'shish</h2>
      <p>
        <code>App.jsx</code>ga ikkita yangi funksiya qo'shamiz. Ikkalasi ham bazaga so'rov
        yuboradi, so'ng muvaffaqiyat holatida <strong>lokal</strong> <code>tasks</code> holatini
        ham yangilaydi — shunda ekran serverdan qayta ma'lumot so'ramasdan darhol yangilanadi:
      </p>
      <CodeBlock lang="jsx">{`async function handleToggle(id, isDone) {
  const { data, error } = await supabase
    .from('tasks')
    .update({ is_done: !isDone })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error(error)
    return
  }

  setTasks((prev) => prev.map((task) => (task.id === id ? data : task)))
}

async function handleDelete(id) {
  const { error } = await supabase.from('tasks').delete().eq('id', id)

  if (error) {
    console.error(error)
    return
  }

  setTasks((prev) => prev.filter((task) => task.id !== id))
}`}</CodeBlock>
      <p>
        <code>handleToggle</code> — hozirgi <code>isDone</code> qiymatini teskarisiga (
        <code>!isDone</code>) o'zgartiradi, so'ng <code>tasks</code> massivida faqat mos{' '}
        <code>id</code>ga ega vazifani serverdan qaytgan yangi <code>data</code> bilan
        almashtiradi (<code>.map</code>). <code>handleDelete</code> esa <code>tasks</code>{' '}
        massividan o'chirilgan <code>id</code>ga ega vazifani chiqarib tashlaydi (
        <code>.filter</code>). Bu — <strong>optimistik bo'lmagan</strong> yangilanish: avval
        bazaga so'rov yuboriladi, faqat u muvaffaqiyatli tugagach ekran o'zgaradi. Shu tufayli
        interfeys har doim bazadagi haqiqiy holatga mos keladi.
      </p>

      <p>
        Endi bu ikki funksiyani <code>TaskList</code>ga props sifatida uzatib, to'liq{' '}
        <code>App.jsx</code> quyidagi ko'rinishga keladi:
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

  async function handleToggle(id, isDone) {
    const { data, error } = await supabase
      .from('tasks')
      .update({ is_done: !isDone })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error(error)
      return
    }

    setTasks((prev) => prev.map((task) => (task.id === id ? data : task)))
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('tasks').delete().eq('id', id)

    if (error) {
      console.error(error)
      return
    }

    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="mb-4 text-2xl font-bold">Vazifalar boshqaruvchisi</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  )
}

export default App`}</CodeBlock>

      <h2>TaskList'ga checkbox va o'chirish tugmasini qo'shish</h2>
      <p>
        Endi <code>components/TaskList.jsx</code>ni to'ldiramiz — u endi <code>onToggle</code> va{' '}
        <code>onDelete</code> callback'larini ham props sifatida qabul qiladi:
      </p>
      <CodeBlock lang="jsx">{`export default function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <ul className="mt-4 flex flex-col gap-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between rounded-md border border-gray-200 px-3 py-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={task.is_done} onChange={() => onToggle(task.id, task.is_done)} />
            <span className={task.is_done ? 'text-gray-400 line-through' : ''}>{task.title}</span>
          </label>
          <button onClick={() => onDelete(task.id)} className="text-sm text-red-500 hover:text-red-700">
            O'chirish
          </button>
        </li>
      ))}
    </ul>
  )
}`}</CodeBlock>
      <p>
        <code>checked={'{task.is_done}'}</code> — checkbox'ning holati to'g'ridan-to'g'ri
        bazadagi <code>is_done</code> qiymatiga bog'langan, ya'ni bu{' '}
        <strong>boshqariladigan (controlled) komponent</strong>. Checkbox bosilganda{' '}
        <code>onChange</code> ishga tushadi va <code>onToggle(task.id, task.is_done)</code>ni
        chaqiradi — <strong>hozirgi</strong> qiymatni uzatadi, chunki yangi qiymatni hisoblash
        (<code>!isDone</code>) <code>App.jsx</code>dagi <code>handleToggle</code> ichida sodir
        bo'ladi. Bajarilgan vazifalar <code>className</code> orqali kulrang va chizib
        qo'yiladi (<code>line-through</code>).
      </p>

      <Callout type="tip" title="Nega o'chirish tugmasi tasdiqlashsiz ishlayapti?">
        Hozirgi variant sodda bo'lishi uchun <code>onDelete</code>ni to'g'ridan-to'g'ri bosish
        bilan chaqiradi — tasdiqlash oynasi (confirm dialog) yo'q. Ishlab chiqarish (production)
        darajasidagi ilovalarda odatda tasodifiy bosishning oldini olish uchun{' '}
        <code>window.confirm(...)</code> yoki alohida modal oyna qo'shiladi. Buni quyidagi
        mashqda o'zingiz qo'shib ko'rasiz.
      </Callout>

      <Exercise title="Mashq: o'chirishdan oldin tasdiqlash so'rash">
        <p>
          <code>TaskList.jsx</code>dagi o'chirish tugmasini shunday o'zgartiringki, bosilganda
          avval <code>window.confirm("Vazifani o'chirmoqchimisiz?")</code> chaqirilsin va faqat
          foydalanuvchi tasdiqlasa (natija <code>true</code> bo'lsa) <code>onDelete(task.id)</code>{' '}
          ishga tushsin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`function handleDeleteClick(id) {
  if (window.confirm("Vazifani o'chirmoqchimisiz?")) {
    onDelete(id)
  }
}

// JSX ichida:
<button onClick={() => handleDeleteClick(task.id)} className="text-sm text-red-500 hover:text-red-700">
  O'chirish
</button>`}</CodeBlock>
        </Solution>
      </Exercise>

      <Quiz
        question="handleToggle funksiyasida .eq('id', id) filtri olib tashlansa (va RLS bo'lmasa), nima yuz berishi mumkin edi?"
        options={[
          "Hech narsa o'zgarmaydi, chunki update har doim faqat bitta qatorni yangilaydi",
          "Supabase xatolik qaytarib, so'rovni butunlay bekor qiladi",
          "Jadvaldagi barcha qatorlarning is_done qiymati o'zgartirilib yuboriladi",
          "Faqat eng yangi qo'shilgan vazifa yangilanadi",
        ]}
        correctIndex={2}
        explanation=".eq('id', id) — qaysi qator yangilanishini belgilaydigan filtr. Agar bu filtr bo'lmasa, update() jadvaldagi barcha mos keluvchi qatorlarga qo'llaniladi, ya'ni butun jadval o'zgarib ketishi mumkin. Shu sababli har doim aniq filtr yozish muhim."
      />

      <KeyPoints>
        <li>
          <code>.update({'{ ... }'}).eq('id', id)</code> — belgilangan qatorni yangilaydi;{' '}
          <code>.eq(...)</code> filtri qaysi qator yangilanishini aniqlaydi va uni tushirib
          qoldirmaslik muhim.
        </li>
        <li>
          <code>.delete().eq('id', id)</code> — belgilangan qatorni o'chiradi, natijada odatda{' '}
          faqat <code>error</code> qaytariladi.
        </li>
        <li>
          <code>handleToggle</code> va <code>handleDelete</code> — bazaga so'rov muvaffaqiyatli
          bo'lgandan keyingina lokal <code>tasks</code> holatini <code>.map</code> yoki{' '}
          <code>.filter</code> orqali yangilaydi.
        </li>
        <li>
          <code>TaskList</code> endi <code>onToggle</code> va <code>onDelete</code>{' '}
          callback'larini qabul qiladi — checkbox <code>is_done</code>ga bog'langan boshqariladigan
          (controlled) input.
        </li>
        <li>
          Shu bilan CRUD to'liq amalga oshdi: qo'shish, o'qish, yangilash, o'chirish — hammasi
          Supabase orqali ishlaydi.
        </li>
      </KeyPoints>
    </>
  )
}
