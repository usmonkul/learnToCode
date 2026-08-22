import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Vite + React + Tailwind loyihasini sozlash",
  section: "3-bo'lim: Frontendni ulash",
}

export default function Lesson08LoyihaSozlash() {
  return (
    <>
      <p>
        Oldingi bo'limda Supabase'da <code>tasks</code> jadvalini yaratdik va unga qo'lda
        ma'lumot qo'shib ko'rdik. Endi shu bazani haqiqiy frontend ilova bilan ulash vaqti keldi.
        Ushbu darsdan boshlab butun kurs davomida bitta loyiha ustida ishlaymiz —{' '}
        <strong>"Vazifalar boshqaruvchisi"</strong> (Task Manager). Bugun uning skeletini
        yaratamiz: Vite + React loyihasi, Tailwind CSS v4 bilan stillashtirish va Supabase
        klientini ulash.
      </p>

      <h2>1. Vite loyihasini yaratish</h2>
      <p>
        Terminalda quyidagi buyruqni bajaring — bu React shabloni asosida{' '}
        <code>vazifalar-boshqaruvchisi</code> nomli yangi papka yaratadi:
      </p>
      <CodeBlock lang="bash">{`npm create vite@latest vazifalar-boshqaruvchisi -- --template react
cd vazifalar-boshqaruvchisi
npm install`}</CodeBlock>
      <p>
        <code>npm create vite@latest</code> — Vite'ning rasmiy shablonlaridan foydalanib yangi
        loyiha skeletini quradi; <code>-- --template react</code> qismi Vite'ga aynan React
        shablonini tanlashni buyuradi. <code>npm install</code> esa <code>package.json</code>{' '}
        ichidagi barcha bog'liqliklarni (dependencies) yuklab oladi.
      </p>

      <h2>2. Tailwind CSS v4 va Supabase client'ni o'rnatish</h2>
      <p>
        Loyiha ichida turib, ikkita muhim paketni qo'shamiz — stillashtirish uchun{' '}
        <strong>Tailwind CSS v4</strong> va Supabase bilan gaplashish uchun{' '}
        <strong>supabase-js</strong> kutubxonasi:
      </p>
      <CodeBlock lang="bash">{`npm install tailwindcss @tailwindcss/vite
npm install @supabase/supabase-js`}</CodeBlock>
      <p>
        Tailwind v4 avvalgi versiyalardan farqli o'laroq alohida <code>tailwind.config.js</code>{' '}
        va PostCSS sozlamalarini talab qilmaydi — buning o'rniga rasmiy{' '}
        <code>@tailwindcss/vite</code> plagini bevosita Vite konfiguratsiyasiga ulanadi va
        hammasini o'zi boshqaradi.
      </p>

      <h2>3. Vite konfiguratsiyasi</h2>
      <p>
        <code>vite.config.js</code> faylini oching va Tailwind plaginini <code>react()</code>{' '}
        yonida qo'shing:
      </p>
      <CodeBlock lang="js">{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})`}</CodeBlock>

      <h2>4. Tailwind'ni CSS'ga ulash</h2>
      <p>
        <code>src/index.css</code> faylining butun mazmunini o'chirib, o'rniga faqat bitta qatorni
        yozing:
      </p>
      <CodeBlock lang="css">{`@import "tailwindcss";`}</CodeBlock>
      <p>
        Shu bitta qator — Tailwind'ning barcha utility klasslarini (masalan,{' '}
        <code>flex</code>, <code>px-4</code>, <code>rounded-md</code>) loyihaga ulash uchun kifoya.
        Eski Tailwind versiyalaridagi <code>@tailwind base; @tailwind components; @tailwind
        utilities;</code> uchta qatori endi kerak emas.
      </p>

      <h2>5. Supabase loyiha kalitlarini olish</h2>
      <p>
        Supabase dashboard'ida loyihangizga o'ting →{' '}
        <strong>Project Settings</strong> → <strong>API</strong> bo'limiga kiring. U yerda ikkita
        qiymat kerak bo'ladi: <strong>Project URL</strong> va <strong>anon public</strong> kaliti.
      </p>
      <p>
        Loyiha papkasining ildizida (root) <code>.env</code> nomli fayl yarating (agar u
        Vite tomonidan avtomatik yaratilgan <code>.gitignore</code>'ga kirmagan bo'lsa, tekshirib
        ko'ring — standart Vite shabloni <code>.env</code>ni allaqachon e'tiborsiz qoldiradi):
      </p>
      <CodeBlock lang="env">{`VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxxxxxxxxxxxxxxxxxx...`}</CodeBlock>
      <p>
        Vite'da atrof-muhit o'zgaruvchilari (environment variables) brauzer kodiga chiqishi uchun
        ular <code>VITE_</code> prefiksi bilan boshlanishi shart — aks holda Vite ularni frontend
        bundle'iga qo'shmaydi.
      </p>

      <Callout type="warning" title="anon key xavfsizmi?">
        Ha — <code>VITE_SUPABASE_ANON_KEY</code> frontend kodida ochiq turishi uchun mo'ljallangan
        kalit, u brauzerning tarmoq so'rovlarida ham ko'rinadi va bu normal holat. Haqiqiy himoya
        bu kalitni yashirishdan emas, balki jadvallardagi{' '}
        <strong>Row Level Security (RLS)</strong> policy'laridan keladi — buni keyingi bo'limda
        batafsil ko'rib chiqamiz. Ammo <code>anon</code> kalitini{' '}
        <strong>service_role</strong> kaliti bilan aslo aralashtirmang: service_role kaliti RLS'ni
        butunlay chetlab o'tadi va faqat serverda (frontendda hech qachon emas) ishlatilishi
        kerak — u frontend kodiga tushib qolsa, bazangizga to'liq, cheklovsiz kirish imkoni
        ochiladi.
      </Callout>

      <h2>6. Supabase klientini yaratish</h2>
      <p>
        Endi <code>src/supabaseClient.js</code> faylini yarating — bu fayl butun ilova davomida
        Supabase bilan aloqa qiluvchi yagona "eshik" bo'ladi:
      </p>
      <CodeBlock lang="js">{`import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)`}</CodeBlock>
      <p>
        <code>import.meta.env</code> — Vite'ning <code>.env</code> fayllaridagi o'zgaruvchilarni
        o'qish usuli. <code>createClient</code> esa URL va anon kalit asosida{' '}
        <code>supabase</code> nomli obyekt yaratadi — keyingi darslarda aynan shu obyekt orqali
        ma'lumot qo'shamiz, o'qiymiz, yangilaymiz va o'chiramiz.
      </p>

      <h2>7. Ishga tushirish</h2>
      <p>Hammasi joyida ekanini tekshirish uchun development serverni ishga tushiring:</p>
      <CodeBlock lang="bash">{`npm run dev`}</CodeBlock>
      <p>
        Brauzerda <code>http://localhost:5173</code> ochiladi va Vite'ning standart React
        sahifasi ko'rinadi. Konsolda (browser DevTools) hech qanday xatolik bo'lmasa — demak,
        Tailwind ham, Supabase client ham to'g'ri ulangan. Keyingi darsda aynan shu{' '}
        <code>supabase</code> obyekti orqali <code>tasks</code> jadvaliga birinchi ma'lumotni
        qo'shamiz.
      </p>

      <Quiz
        question="Nega .env faylidagi o'zgaruvchilar VITE_ prefiksi bilan boshlanishi kerak?"
        options={[
          "Bu shunchaki nom berish an'anasi, prefikssiz ham xuddi shunday ishlaydi",
          "Vite faqat VITE_ prefiksli o'zgaruvchilarni frontend bundle'iga qo'shadi, qolganlari xavfsizlik uchun brauzerga chiqarilmaydi",
          "VITE_ prefiksi Supabase tomonidan talab qilinadi, Vite'ga aloqasi yo'q",
          "Prefikssiz o'zgaruvchilar avtomatik ravishda service_role kaliti deb hisoblanadi",
        ]}
        correctIndex={1}
        explanation="Vite atayin faqat VITE_ bilan boshlanadigan o'zgaruvchilarni brauzer kodiga chiqaradi — bu server-tomonidagi maxfiy o'zgaruvchilarning tasodifan frontend bundle'iga tushib qolishining oldini oladi."
      />

      <KeyPoints>
        <li>
          <code>npm create vite@latest ... -- --template react</code> — yangi React loyihasini
          yaratadi.
        </li>
        <li>
          Tailwind CSS v4 <code>@tailwindcss/vite</code> plagini orqali <code>vite.config.js</code>
          ga ulanadi, <code>src/index.css</code>da esa faqat{' '}
          <code>{'@import "tailwindcss";'}</code> qatori kerak.
        </li>
        <li>
          Supabase URL va anon kaliti <code>.env</code> faylida <code>VITE_</code> prefiksi bilan
          saqlanadi va <code>import.meta.env</code> orqali o'qiladi.
        </li>
        <li>
          <code>src/supabaseClient.js</code> — <code>createClient</code> orqali yaratilgan yagona{' '}
          <code>supabase</code> obyekti, butun ilova shu orqali baza bilan ishlaydi.
        </li>
        <li>
          <code>anon</code> kaliti ochiq bo'lishi mumkin (himoya RLS orqali keladi), lekin{' '}
          <code>service_role</code> kaliti hech qachon frontend kodiga tushmasligi kerak.
        </li>
      </KeyPoints>
    </>
  )
}
