import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Hammasini birlashtirish",
  section: "8-bo'lim: Yakuniy loyiha",
}

export default function Lesson25HammasiniBirlashtirish() {
  return (
    <>
      <p>
        Yetti bo'lim davomida bitta g'isht ustiga boshqa g'isht qo'yib bordik: bo'sh jadvaldan
        boshlab, ma'lumot qo'shish, RLS, autentifikatsiya, fayl saqlash va real vaqtli
        yangilanishlarni qatlab-qatlab qo'shdik. Bugun yangi kod yozmaymiz — buning o'rniga bir
        qadam orqaga chekinib, <strong>"Vazifalar boshqaruvchisi"</strong>ning yakuniy holatini
        boshidan oxirigacha ko'rib chiqamiz va har bir qismning nega aynan shunday
        yozilganini eslaymiz.
      </p>

      <h2>Yakuniy App.jsx: barcha qatlamlar bir joyda</h2>
      <p>
        <code>App.jsx</code> — butun ilovaning markazi. Unda to'rtta muhim qatlam mavjud:
        sessiyani kuzatish (auth gate), ma'lumotni birinchi marta yuklash (fetch), jonli
        yangilanishlarga obuna bo'lish (realtime) va CRUD amallarini boshqaruvchi funksiyalar.
      </p>
      <CodeBlock lang="jsx">{`import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import AuthForm from './components/AuthForm'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  const [session, setSession] = useState(null)
  const [tasks, setTasks] = useState([])

  // 1. Auth gate: kim tizimga kirganini kuzatib turadi
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // 2. Birinchi yuklash: foydalanuvchi tizimga kirgach, uning vazifalarini olib keladi
  useEffect(() => {
    if (!session) return
    fetchTasks()
  }, [session])

  // 3. Realtime: boshqa qurilma yoki oynadagi o'zgarishlarni jonli kuzatadi
  useEffect(() => {
    if (!session) return

    const channel = supabase
      .channel('tasks-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setTasks((prev) => [payload.new, ...prev])
        } else if (payload.eventType === 'UPDATE') {
          setTasks((prev) => prev.map((t) => (t.id === payload.new.id ? payload.new : t)))
        } else if (payload.eventType === 'DELETE') {
          setTasks((prev) => prev.filter((t) => t.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [session])

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

  // 4. CRUD: TaskForm va TaskList'dan chaqiriladigan amallar
  function handleTaskAdded(newTask) {
    setTasks((prev) => [newTask, ...prev])
  }

  async function handleToggle(id, isDone) {
    const { error } = await supabase.from('tasks').update({ is_done: !isDone }).eq('id', id)
    if (error) console.error(error)
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) console.error(error)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-md p-6">
        <h1 className="mb-4 text-2xl font-bold">Vazifalar boshqaruvchisi</h1>
        <AuthForm />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vazifalar boshqaruvchisi</h1>
        <button onClick={handleSignOut} className="text-sm text-gray-500 hover:text-gray-700">
          Chiqish
        </button>
      </div>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  )
}

export default App`}</CodeBlock>
      <p>
        E'tibor bering: <code>session</code> yo'q bo'lsa, komponent <code>AuthForm</code>dan
        boshqa hech narsani render qilmaydi — ma'lumot olib kelish (<code>fetchTasks</code>) ham,
        realtime obuna ham faqat foydalanuvchi tizimga kirgandan keyin ishga tushadi. Bu — bazaga
        keraksiz so'rov yubormaslik va RLS policy'larimizning mantig'iga ("faqat o'z vazifalarini
        ko'rish mumkin") mos kelish uchun.
      </p>

      <h2>AuthForm.jsx: uchta kirish yo'li</h2>
      <p>
        <code>AuthForm</code> — foydalanuvchiga uchta imkoniyat beradi: ro'yxatdan o'tish, email
        va parol bilan kirish, hamda Google orqali bir bosishda kirish.
      </p>
      <CodeBlock lang="jsx">{`import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignUp(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) console.error(error)
  }

  async function handleSignIn(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) console.error(error)
  }

  async function handleGoogleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
    if (error) console.error(error)
  }

  return (
    <form className="flex flex-col gap-2">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-md border border-gray-300 px-3 py-2" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Parol" className="rounded-md border border-gray-300 px-3 py-2" />
      <button onClick={handleSignIn} className="rounded-md bg-blue-600 px-4 py-2 text-white">Kirish</button>
      <button onClick={handleSignUp} className="rounded-md border border-blue-600 px-4 py-2 text-blue-600">Ro'yxatdan o'tish</button>
      <button onClick={handleGoogleSignIn} className="rounded-md border border-gray-300 px-4 py-2 font-medium hover:bg-gray-50">
        Google bilan kirish
      </button>
    </form>
  )
}`}</CodeBlock>
      <p>
        Bu komponentning o'zi bazaga to'g'ridan-to'g'ri murojaat qilmaydi — u faqat{' '}
        <code>supabase.auth</code> orqali Supabase'ning tayyor autentifikatsiya tizimiga
        murojaat qiladi. Sessiya paydo bo'lgach, <code>App.jsx</code>dagi{' '}
        <code>onAuthStateChange</code> buni avtomatik ushlab oladi — <code>AuthForm</code>ning
        o'zi hech qanday navigatsiya yoki holat almashtirish mantig'ini bilishi shart emas.
      </p>

      <h2>TaskForm.jsx: yozish (insert) va fayl yuklash</h2>
      <p>
        <code>TaskForm</code> — yangi vazifa qo'shish uchun javobgar, va agar foydalanuvchi fayl
        tanlagan bo'lsa, avval uni Storage'ga yuklab, keyin uning yo'lini bazaga yozadi:
      </p>
      <CodeBlock lang="jsx">{`import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    let filePath = null

    if (file) {
      const path = \`\${crypto.randomUUID()}-\${file.name}\`
      const { error: uploadError } = await supabase.storage.from('task-files').upload(path, file)
      if (uploadError) {
        console.error(uploadError)
        return
      }
      filePath = path
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert({ title, file_path: filePath })
      .select()
      .single()

    if (error) {
      console.error(error)
      return
    }

    onTaskAdded(data)
    setTitle('')
    setFile(null)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Yangi vazifa..."
          className="flex-1 rounded-md border border-gray-300 px-3 py-2"
        />
        <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white">
          Qo'shish
        </button>
      </div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    </form>
  )
}`}</CodeBlock>
      <p>
        E'tibor bering: <code>title</code>dan tashqari <code>user_id</code>ni bu yerda hech
        qachon qo'lda yubormaymiz. Buning sababi — bazada <code>user_id</code> ustuni{' '}
        <code>default auth.uid()</code> bilan sozlangan, shuning uchun Postgres uni har bir
        yozuv uchun avtomatik to'ldiradi.
      </p>

      <h2>TaskList.jsx: o'qish, yangilash, o'chirish va biriktirilgan fayl</h2>
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
        Bu komponent hech qachon bazaga o'zi murojaat qilmaydi (faqat fayl uchun public URL
        hisoblashda <code>supabase.storage</code>dan foydalanadi) — u faqat <code>App.jsx</code>{' '}
        bergan <code>tasks</code> massivini ko'rsatadi va foydalanuvchi bosgan tugmalarni{' '}
        <code>onToggle</code>/<code>onDelete</code> orqali yuqoriga xabar qiladi. Haqiqiy
        o'zgarish esa <code>App.jsx</code>dagi funksiyalarda sodir bo'ladi.
      </p>

      <h2>Baza: yakuniy tasks jadvali</h2>
      <p>
        Ustunlarni bir necha dars davomida qo'sha bordik — <code>alter table</code> orqali. Agar
        hozir shu jadvalni noldan yaratmoqchi bo'lsak, u quyidagicha ko'rinardi:
      </p>
      <CodeBlock lang="sql">{`create table tasks (
  id bigint generated always as identity primary key,
  title text not null,
  is_done boolean not null default false,
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users default auth.uid(),
  file_path text
);`}</CodeBlock>
      <p>
        Oltita ustun — oltita alohida qaror: <code>id</code> har bir qatorni noyob belgilaydi,{' '}
        <code>title</code> vazifaning matni, <code>is_done</code> bajarilganlik holati,{' '}
        <code>created_at</code> saralash uchun vaqt tamg'asi, <code>user_id</code> qaysi
        foydalanuvchiga tegishli ekanini bildiradi (va <code>auth.uid()</code> orqali o'zi
        to'ladi), <code>file_path</code> esa ixtiyoriy biriktirilgan faylning Storage'dagi
        manzili.
      </p>

      <h2>Baza: yakuniy to'rtta RLS policy</h2>
      <p>
        Jadval qanchalik to'g'ri tuzilgan bo'lmasin, RLS yoqilmasa yoki policy'lar yo'q bo'lsa,
        har qanday foydalanuvchi boshqa birovning vazifalarini ko'rishi yoki o'zgartirishi mumkin
        edi. Yakuniy holatda to'rtta policy har bir amalni aynan shu qatorning egasi bilan
        cheklaydi:
      </p>
      <CodeBlock lang="sql">{`create policy "Users can view own tasks"
on tasks for select
using (auth.uid() = user_id);

create policy "Users can insert own tasks"
on tasks for insert
with check (auth.uid() = user_id);

create policy "Users can update own tasks"
on tasks for update
using (auth.uid() = user_id);

create policy "Users can delete own tasks"
on tasks for delete
using (auth.uid() = user_id);`}</CodeBlock>

      <Callout type="tip" title="Har bir qatlam bitta savolga javob beradi">
        Butun loyihani shunday xotirlash mumkin: React komponentlari — "foydalanuvchiga nima
        ko'rsatilsin?" degan savolga javob beradi. Auth — "bu kim?" degan savolga. RLS — "bu
        odamga aynan shu qatorni ko'rish/o'zgartirish mumkinmi?" degan savolga. Storage — "fayl
        qayerda saqlansin?" degan savolga. Realtime esa — "bu o'zgarish boshqa ochiq oynalarga
        qachon yetib borsin?" degan savolga. Har bir qatlam mustaqil, ammo birgalikda ishlaydi —
        aynan shuning uchun ularni alohida-alohida o'rgandik.
      </Callout>

      <Quiz
        question="TaskForm komponenti nega bazaga insert qilayotganda user_id maydonini yubormaydi?"
        options={[
          "user_id maydoni umuman ishlatilmaydi, u faqat tarixiy sabablarga ko'ra jadvalda qolgan",
          "user_id ustuni default auth.uid() bilan sozlangan, shuning uchun Postgres uni tizimga kirgan foydalanuvchidan avtomatik oladi",
          "RLS policy user_id'ni frontend o'rniga avtomatik hisoblab, keyin uni o'zi qo'shib qo'yadi",
          "user_id faqat admin panelida qo'lda kiritiladi",
        ]}
        correctIndex={1}
        explanation="user_id ustuniga default auth.uid() qo'yilgani uchun, har bir yangi qatorga bu qiymat avtomatik, so'rovni yuborayotgan foydalanuvchining ID'si asosida to'ladi — frontend kodi bu haqda hech narsa bilishi shart emas."
      />

      <KeyPoints>
        <li>
          <code>App.jsx</code> to'rt qatlamni birlashtiradi: auth gate, birinchi yuklash (fetch),
          realtime obuna va CRUD funksiyalari.
        </li>
        <li>
          Har bir komponent — <code>AuthForm</code>, <code>TaskForm</code>, <code>TaskList</code>{' '}
          — o'z vazifasiga tor ixtisoslashgan va faqat kerakli Supabase API'ga murojaat qiladi.
        </li>
        <li>
          Yakuniy <code>tasks</code> jadvali oltita ustundan iborat: <code>id</code>,{' '}
          <code>title</code>, <code>is_done</code>, <code>created_at</code>, <code>user_id</code>,{' '}
          <code>file_path</code>.
        </li>
        <li>
          To'rtta RLS policy (select/insert/update/delete) har bir amalni{' '}
          <code>auth.uid() = user_id</code> shartiga bog'laydi — bu butun ilovaning xavfsizlik
          poydevori.
        </li>
        <li>
          Frontend, baza sxemasi, RLS, autentifikatsiya, Storage va realtime — hammasi birgalikda
          to'liq, ishlaydigan mahsulotni tashkil qiladi.
        </li>
      </KeyPoints>
    </>
  )
}
