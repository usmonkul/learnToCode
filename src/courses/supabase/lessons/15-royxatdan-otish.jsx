import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Email va parol bilan ro'yxatdan o'tish",
  section: "5-bo'lim: Autentifikatsiya",
}

export default function Lesson15RoyxatdanOtish() {
  return (
    <>
      <p>
        Hozirgacha "Vazifalar boshqaruvchisi" ilovamizdagi barcha vazifalarni <strong>hamma</strong> ko'ra oladi va o'zgartira oladi — chunki 4-bo'limda yozgan RLS policy'lari ataylab ochiq qilib qo'yilgan edi. Haqiqiy ilovada esa har bir foydalanuvchi faqat o'zining vazifalarini ko'rishi kerak. Buning uchun avval ilovaga <strong>autentifikatsiya (authentication)</strong> — ya'ni foydalanuvchini tanish va tasdiqlash mexanizmini qo'shishimiz kerak.
      </p>
      <p>
        Supabase autentifikatsiyani <code>supabase.auth</code> nomli tayyor modul orqali taqdim etadi. U email/parol, Google, GitHub kabi ko'plab usullarni qo'llab-quvvatlaydi va foydalanuvchilarni o'z ichidagi maxsus <code>auth.users</code> jadvalida saqlaydi. Bu jadvalni siz to'g'ridan-to'g'ri boshqara olmaysiz — u Supabase tomonidan avtomatik yuritiladi, lekin keyingi darslarda ko'ramizki, boshqa jadvallardan (masalan, bizning <code>tasks</code> jadvalimizdan) unga bog'lanish mumkin.
      </p>

      <h2>Yangi komponent: AuthForm.jsx</h2>
      <p>
        Autentifikatsiya bilan bog'liq barcha UI'ni alohida komponentga chiqaramiz — <code>src/components/AuthForm.jsx</code>. Bu darsda uni faqat <strong>ro'yxatdan o'tish (sign up)</strong> funksiyasi bilan yozamiz, keyingi darsda kirish (sign in) funksiyasini qo'shamiz.
      </p>
      <CodeBlock lang="jsx">{`import { useState } from 'react'
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

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-2">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-md border border-gray-300 px-3 py-2" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Parol" className="rounded-md border border-gray-300 px-3 py-2" />
      <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white">Ro'yxatdan o'tish</button>
    </form>
  )
}`}</CodeBlock>
      <p>
        Bu kod tuzilishi bizga tanish — xuddi <code>TaskForm.jsx</code>dagidek, ikkita kontrollanadigan (controlled) input, <code>useState</code> orqali ularning qiymatini saqlash va <code>onSubmit</code> orqali forma yuborilganda ishlaydigan funksiya. Farqi shundaki, bu safar <code>supabase.from('tasks').insert(...)</code> o'rniga <code>supabase.auth.signUp(...)</code> chaqiramiz.
      </p>

      <h2>supabase.auth.signUp nima qiladi?</h2>
      <p>
        <code>supabase.auth.signUp({'{ email, password }'})</code> chaqirilganda Supabase orqa tomonda quyidagi ishlarni bajaradi:
      </p>
      <ol>
        <li>
          <code>auth.users</code> jadvalida yangi qator yaratadi va unga <strong>UUID</strong> ko'rinishidagi noyob <code>id</code> beradi — bu id keyinchalik "shu foydalanuvchi kim" degan savolga javob berish uchun butun tizim bo'ylab ishlatiladi.
        </li>
        <li>
          Parolni hech qachon ochiq (plain text) holda saqlamaydi — uni xesh (hash) qilib saqlaydi.
        </li>
        <li>
          Loyihangizning Authentication sozlamalarida <strong>email tasdiqlash (email confirmation)</strong> yoqilgan bo'lsa (bu — Supabase'da standart holat), foydalanuvchining emailiga tasdiqlash havolasi bilan xat yuboradi. Foydalanuvchi shu havolani bosmaguncha, uning hisobi "tasdiqlanmagan" holatda qoladi.
        </li>
      </ol>
      <p>
        <code>signUp</code> funksiyasi Promise qaytaradi, biz uni <code>await</code> bilan kutamiz va natijadan <code>{'{ error }'}</code>ni ajratib olamiz — bu naqsh butun kurs davomida takrorlanadi: agar <code>error</code> bo'lsa, konsolga chiqarib chiqamiz va funksiyadan qaytamiz (<code>return</code>), aks holda davom etamiz.
      </p>

      <Callout type="note" title="Email tasdiqlashni sinov paytida o'chirish mumkin">
        Rivojlantirish (development) bosqichida har safar test email'ini tasdiqlash noqulay bo'lishi mumkin. Supabase Dashboard'da <strong>Authentication → Providers → Email</strong> bo'limida "Confirm email" tugmasini vaqtincha o'chirib qo'yish mumkin — shunda <code>signUp</code>dan keyin foydalanuvchi darhol "tasdiqlangan" hisoblanadi. Production'ga chiqarishdan oldin uni albatta qayta yoqib qo'ying.
      </Callout>

      <h2>Nega alert() ishlatildi?</h2>
      <p>
        Hozircha <code>alert()</code> — eng sodda usul bilan foydalanuvchiga xabar berish. Keyinchalik buni chiroyliroq UI elementi (masalan, forma ustida matn) bilan almashtirish mumkin, lekin bu darsning maqsadi — autentifikatsiya mantig'ini tushunish, shuning uchun UI'ni ataylab minimal qoldiramiz.
      </p>

      <Quiz
        question="supabase.auth.signUp({ email, password }) chaqirilganda nima sodir bo'ladi?"
        options={[
          "tasks jadvaliga yangi qator qo'shiladi",
          "auth.users jadvalida yangi foydalanuvchi yaratiladi va odatda tasdiqlash emaili yuboriladi",
          "Parol ochiq matn (plain text) holida saqlanadi",
          "Foydalanuvchi avtomatik ravishda tizimga kiritiladi (session yaratiladi) va boshqa hech narsa sodir bo'lmaydi",
        ]}
        correctIndex={1}
        explanation="signUp Supabase'ning ichki auth.users jadvalida yangi foydalanuvchi yaratadi, parolni xesh qilib saqlaydi va (standart sozlamada) tasdiqlash emaili yuboradi. tasks jadvaliga bu bilan hech qanday bog'liqlik yo'q — buni 18-darsda ko'ramiz."
      />

      <Exercise title="Amaliy mashq: AuthForm komponentini yaratish">
        <p>
          <code>src/components/AuthForm.jsx</code> faylini yuqoridagi kod bilan yarating. So'ng uni vaqtincha <code>App.jsx</code>ga import qilib, <code>{'<TaskForm />'}</code> ustiga qo'shib ko'ring va brauzerda formani sinab ko'ring — o'z email va parolingiz bilan ro'yxatdan o'ting, so'ng Supabase Dashboard'dagi <strong>Authentication → Users</strong> bo'limida yangi foydalanuvchi paydo bo'lganini tekshiring.
        </p>
        <Solution>
          <p>
            <code>App.jsx</code>ga vaqtincha qo'shish:
          </p>
          <CodeBlock lang="jsx">{`import AuthForm from './components/AuthForm'

// return ichida, TaskForm dan oldin:
<AuthForm />`}</CodeBlock>
          <p>
            Ro'yxatdan o'tgandan so'ng Dashboard'ning <strong>Authentication → Users</strong> jadvalida yangi qator ko'rinadi — unda email manzil, yaratilgan sana va "Confirmed" ustuni bor. Keyingi darsda bu vaqtinchalik joylashtirishni to'g'ri, doimiy holatga keltiramiz.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Autentifikatsiya <code>supabase.auth</code> moduli orqali ishlaydi, foydalanuvchilar Supabase'ning ichki <code>auth.users</code> jadvalida saqlanadi.
        </li>
        <li>
          <code>AuthForm.jsx</code> — autentifikatsiya UI'si uchun alohida komponent, u <code>TaskForm.jsx</code>ga o'xshash controlled-input naqshidan foydalanadi.
        </li>
        <li>
          <code>supabase.auth.signUp({'{ email, password }'})</code> yangi foydalanuvchi yaratadi, parolni xesh qilib saqlaydi va odatda tasdiqlash emaili yuboradi.
        </li>
        <li>
          Email tasdiqlash sozlamasini Dashboard'dagi Authentication → Providers → Email bo'limidan boshqarish mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
