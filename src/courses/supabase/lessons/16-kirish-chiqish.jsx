import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Kirish, chiqish va sessiya",
  section: "5-bo'lim: Autentifikatsiya",
}

export default function Lesson16KirishChiqish() {
  return (
    <>
      <p>
        O'tgan darsda foydalanuvchi ro'yxatdan o'tishni o'rgandik, lekin ro'yxatdan o'tish — bu faqat yarim ish. Foydalanuvchi keyingi safar saytga kirganda uni qayta tanib olish, ya'ni <strong>kirish (sign in)</strong> va <strong>sessiya (session)</strong>ni boshqarish kerak. Bu darsda uch narsani qo'shamiz: parol bilan kirish, chiqish (sign out) va — eng muhimi — ilovaning "kim tizimga kirgan" holatini butun vaqt davomida kuzatib borishi.
      </p>

      <h2>signInWithPassword — parol bilan kirish</h2>
      <p>
        <code>AuthForm.jsx</code>ga <code>handleSignUp</code> yonida yana bitta funksiya qo'shamiz:
      </p>
      <CodeBlock lang="jsx">{`// AuthForm.jsx ichida, handleSignUp bilan bir qatorda:
async function handleSignIn(e) {
  e.preventDefault()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) console.error(error)
}`}</CodeBlock>
      <p>
        E'tibor bering: <code>handleSignIn</code> muvaffaqiyatli bo'lganda hech qanday <code>alert()</code> yoki qo'lda holat o'zgartirish yozmadik. Sabab shuki, kirish muvaffaqiyatli bo'lganda Supabase avtomatik ravishda <strong>sessiya (session)</strong> yaratadi — va biz buni pastda ko'radigan <code>onAuthStateChange</code> orqali "tinglaymiz". Formaga ikkinchi tugma sifatida qo'shish kifoya:
      </p>
      <CodeBlock lang="jsx">{`<button type="button" onClick={handleSignIn} className="rounded-md border border-gray-300 px-4 py-2 font-medium">
  Kirish
</button>`}</CodeBlock>
      <p>
        Bu tugma <code>type="button"</code> bilan yozilgan (formaning standart <code>submit</code>i emas), chunki bitta formada ikkita harakat — ro'yxatdan o'tish va kirish — bor: <code>onSubmit</code> orqali <code>handleSignUp</code> ishga tushadi, "Kirish" tugmasining <code>onClick</code>i esa alohida <code>handleSignIn</code>ni chaqiradi.
      </p>

      <h2>Sessiya nima va nega uni kuzatib borish kerak?</h2>
      <p>
        Foydalanuvchi tizimga kirganda Supabase unga <strong>JWT (JSON Web Token)</strong> asosidagi sessiya beradi va uni brauzerning <code>localStorage</code>'ida saqlaydi. Shu token har bir keyingi so'rovga (masalan, <code>tasks</code> jadvalidan <code>select</code> qilganda) avtomatik qo'shiladi — Supabase server tomonida shu tokendan foydalanuvchining kimligini bilib oladi. Bu keyingi darslarda ko'radigan RLS policy'lari uchun asos bo'ladi.
      </p>
      <p>
        React tomonida esa bizga sessiyaning <strong>hozirgi holatini</strong> bilish kerak — sahifa bo'sh joyida "kim kirgan, kim kirmagan" degan savolga javob berish uchun. Buning uchun <code>App.jsx</code>ga <code>session</code> state va uni yangilab turadigan effekt qo'shamiz:
      </p>
      <CodeBlock lang="jsx">{`// App.jsx ichida:
const [session, setSession] = useState(null)

useEffect(() => {
  supabase.auth.getSession().then(({ data }) => setSession(data.session))

  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session)
  })

  return () => listener.subscription.unsubscribe()
}, [])`}</CodeBlock>
      <p>
        Bu effektda ikkita ish qilinadi:
      </p>
      <ol>
        <li>
          <code>supabase.auth.getSession()</code> — sahifa birinchi marta yuklanganda, brauzerda allaqachon saqlangan sessiya bor-yo'qligini tekshiradi (masalan, foydalanuvchi oldin kirib, sahifani yangilagan bo'lsa).
        </li>
        <li>
          <code>supabase.auth.onAuthStateChange(...)</code> — kirish, chiqish, token yangilanishi kabi <strong>har qanday</strong> autentifikatsiya hodisasi sodir bo'lganda avtomatik chaqiriladigan tinglovchi (listener) o'rnatadi. Aynan shu tinglovchi tufayli <code>handleSignIn</code>ning o'zida <code>setSession</code> chaqirishga hojat yo'q — kirish muvaffaqiyatli bo'lgan zahoti bu listener ishga tushadi va <code>session</code> state'ini yangilaydi.
        </li>
      </ol>
      <Callout type="tip" title="Nega useEffect ichida unsubscribe qilinadi?">
        <code>onAuthStateChange</code> o'rnatgan tinglovchi komponent ekrandan yo'qolgandan keyin ham ishlashda davom etishi mumkin, agar uni o'chirmasak — bu xotira sizib chiqishi (memory leak)ga olib keladi. <code>useEffect</code>ning tozalash (cleanup) funksiyasida <code>listener.subscription.unsubscribe()</code> chaqirish — bu odatiy React naqshi, xuddi <code>setInterval</code>dan keyin <code>clearInterval</code> chaqirgandek.
      </Callout>

      <h2>Chiqish (sign out)</h2>
      <p>
        Chiqish uchun bitta chaqiruv kifoya:
      </p>
      <CodeBlock lang="jsx">{`supabase.auth.signOut()`}</CodeBlock>
      <p>
        Buni ham qo'lda <code>setSession(null)</code> qilishga hojat yo'q — <code>signOut()</code> chaqirilgach, <code>onAuthStateChange</code> tinglovchisi avtomatik ishga tushadi va <code>session</code>ni <code>null</code>ga aylantiradi.
      </p>

      <h2>App.jsx: session asosida shartli render qilish</h2>
      <p>
        Endi <code>App.jsx</code>ning eng muhim o'zgarishi — u endi <code>session</code>ning bor-yo'qligiga qarab, yoki <code>AuthForm</code>ni, yoki vazifalar UI'sini ko'rsatadi:
      </p>
      <CodeBlock lang="jsx">{`return (
  <div className="mx-auto max-w-md p-6">
    <h1 className="mb-4 text-2xl font-bold">Vazifalar boshqaruvchisi</h1>

    {!session ? (
      <AuthForm />
    ) : (
      <>
        <button onClick={() => supabase.auth.signOut()} className="mb-4 text-sm text-gray-500 underline">
          Chiqish
        </button>
        <TaskForm onTaskAdded={handleTaskAdded} />
        <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
      </>
    )}
  </div>
)`}</CodeBlock>
      <p>
        Bu — React'da juda keng tarqalgan naqsh: <code>session</code> — bu shunchaki bitta o'zgaruvchi (<code>null</code> yoki obyekt), va biz shartli (ternary) operator bilan butun UI blokini almashtiramiz. Hech qanday routing kutubxonasi kerak emas — faqat bitta state va shartli render.
      </p>

      <Quiz
        question="handleSignIn funksiyasi muvaffaqiyatli ishlaganda App.jsx dagi session state qanday yangilanadi?"
        options={[
          "handleSignIn ichida to'g'ridan-to'g'ri setSession chaqiriladi",
          "onAuthStateChange tinglovchisi avtomatik ishga tushib, session state'ini yangilaydi",
          "Sahifa avtomatik qayta yuklanadi (reload) va getSession qayta chaqiriladi",
          "session state qo'lda, useEffect tashqarisida yangilanishi kerak",
        ]}
        correctIndex={1}
        explanation="AuthForm.jsx ning handleSignIn funksiyasi faqat signInWithPassword'ni chaqiradi va xatoni tekshiradi. session state'ini yangilash mas'uliyati App.jsx dagi onAuthStateChange tinglovchisiga tegishli — u har qanday auth hodisasida (kirish, chiqish va h.k.) avtomatik ishga tushadi."
      />

      <Exercise title="Amaliy mashq: kirish va chiqishni ulash">
        <p>
          <code>AuthForm.jsx</code>ga <code>handleSignIn</code> funksiyasi va "Kirish" tugmasini qo'shing. <code>App.jsx</code>ga <code>session</code> state, <code>useEffect</code> (getSession + onAuthStateChange) va shartli render'ni qo'shing. So'ng brauzerda: avval 15-darsda yaratgan hisobingiz bilan kiring, "Chiqish" tugmasi paydo bo'lganini tekshiring, keyin chiqib, formaga qaytganingizni tasdiqlang.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`// AuthForm.jsx — to'liq holat
import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignUp(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      console.error(error)
      return
    }
    alert("Ro'yxatdan o'tish muvaffaqiyatli! Emailingizni tekshiring.")
  }

  async function handleSignIn(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) console.error(error)
  }

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-2">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-md border border-gray-300 px-3 py-2" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Parol" className="rounded-md border border-gray-300 px-3 py-2" />
      <div className="flex gap-2">
        <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white">Ro'yxatdan o'tish</button>
        <button type="button" onClick={handleSignIn} className="rounded-md border border-gray-300 px-4 py-2 font-medium">Kirish</button>
      </div>
    </form>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>supabase.auth.signInWithPassword({'{ email, password }'})</code> mavjud foydalanuvchini tizimga kiritadi va JWT asosidagi sessiya yaratadi.
        </li>
        <li>
          Sessiya <code>localStorage</code>'da saqlanadi va har bir keyingi Supabase so'roviga avtomatik qo'shiladi.
        </li>
        <li>
          <code>getSession()</code> sahifa yuklanganda mavjud sessiyani tekshiradi, <code>onAuthStateChange</code> esa kirish/chiqish kabi hodisalarda <code>session</code> state'ini avtomatik yangilaydi.
        </li>
        <li>
          <code>supabase.auth.signOut()</code> chiqish uchun ishlatiladi — <code>session</code>ni qo'lda <code>null</code>ga aylantirish shart emas.
        </li>
        <li>
          <code>App.jsx</code> endi <code>session</code>ning bor-yo'qligiga qarab <code>AuthForm</code> yoki vazifalar UI'sini shartli render qiladi.
        </li>
      </KeyPoints>
    </>
  )
}
