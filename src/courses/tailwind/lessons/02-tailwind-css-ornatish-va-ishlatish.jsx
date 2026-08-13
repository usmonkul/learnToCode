import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import { Target, BookOpen, Laptop, Search, AlertTriangle, XCircle, Puzzle, Trophy, ClipboardList, CheckCircle, GraduationCap } from 'lucide-react'

export const meta = {
  title: 'Tailwind CSS\'ni o\'rnatish va ishlatish',
  section: '2-Dars'
}

export default function TailwindOrnatish() {
  return (
    <>
      <h2 className="flex items-center gap-2"><Target className="text-indigo-500" /> Dars maqsadi</h2>
      <p>Bu darsda biz Tailwind CSS-ni Vite loyihasiga o'rnatish va amalda ishlatishni o'rganamiz.</p>

      <h2 className="flex items-center gap-2"><BookOpen className="text-indigo-500" /> Mavzu tushuntirishi</h2>
      <p>Tailwind CSS v4 versiyasida o'rnatish jarayoni va konfiguratsiya juda soddalashtirilgan.</p>

      <h2 className="flex items-center gap-2"><Laptop className="text-indigo-500" /> Kod misollari (Qadam-ba-qadam)</h2>

      <h3>Terminal nima?</h3>
      <p>Terminal (yoki Command Prompt) — bu kompyuterga yozma (matnli) buyruqlar berish orqali boshqariladigan oyna. Biz loyiha yaratish, dasturlarni yuklab olish (masalan, Tailwind'ni o'rnatish) va saytimizni ishga tushirish uchun ushbu terminaldan foydalanamiz.</p>

      <h3>React + Vite loyihasida o'rnatish</h3>
      <p>Hozirgi kunda web loyihalar ko'pincha Vite nomli juda tezkor dastur yordamida yaratiladi. Keling, bosqichma-bosqich o'rnatamiz.</p>

      <h3>1-qadam: Loyiha yaratish</h3>
      <p>Terminalda (masalan, VS Code ichida "New Terminal" ochib) quyidagini yozing:</p>
      
      <CodeBlock lang="bash">{`npm create vite@latest mening-loyiham -- --template react
cd mening-loyiham`}</CodeBlock>

      <ul>
        <li><strong>Nima qiladi?</strong> Yangi React loyihasi yaratadi va o'sha papkaga (<code>cd</code> orqali) kiradi.</li>
        <li><strong>Natija:</strong> Kompyuteringizda "mening-loyiham" nomli yangi papka paydo bo'ladi.</li>
      </ul>

      <h3>2-qadam: Tailwind CSS'ni o'rnatish</h3>
      <p>Loyihaning ichiga kirgach, endi Tailwind'ni yuklab olamiz:</p>

      <CodeBlock lang="bash">{`npm install -D tailwindcss @tailwindcss/vite`}</CodeBlock>
      
      <ul>
        <li><strong>Nima qiladi?</strong> Internetdan Tailwind'ning eng so'nggi v4 versiyasini va uni Vite bilan bog'lovchi plagini yuklab oladi.</li>
        <li><strong>Natija:</strong> Loyihangizga ulkan Tailwind kutubxonasi qo'shiladi.</li>
      </ul>

      <h3>3-qadam: Vite konfiguratsiyasini sozlash</h3>
      <p>Loyihangizdagi <code>vite.config.js</code> faylini oching va uni shunday o'zgartiring:</p>

      <CodeBlock lang="javascript">{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})`}</CodeBlock>

      <ul>
        <li><strong>Qayerda yoziladi?</strong> <code>vite.config.js</code> fayli ichida.</li>
        <li><strong>Nima qiladi?</strong> Vite'ga saytni yig'ayotganda Tailwind classlarini ham o'qishini aytadi.</li>
      </ul>

      <h3>4-qadam: CSS faylini tozalash va Tailwind'ni ulash</h3>
      <p>Odatda <code>src/index.css</code> nomli asosiy CSS fayli bo'ladi. Uning ichidagi <strong>barcha narsani o'chirib tashlang</strong> va o'rniga faqat shuni yozing:</p>

      <CodeBlock lang="css">{`@import "tailwindcss";`}</CodeBlock>

      <h3>5-qadam: Loyihani ishga tushirish</h3>
      <p>Endi yana Terminalga qaytib, oxirgi buyruqni beramiz:</p>

      <CodeBlock lang="bash">{`npm run dev`}</CodeBlock>
      <ul>
        <li><strong>Nima qiladi?</strong> Veb saytingizni mahalliy serverda (Localhost) ishga tushiradi.</li>
        <li><strong>Natijasi:</strong> Terminalda ssilka chiqadi (masalan, <code>http://localhost:5173</code>), uni brauzerda ochishingiz kerak.</li>
      </ul>

      <h2 className="flex items-center gap-2"><Search className="text-indigo-500" /> Kod tahlili</h2>
      <p>O'rnatish jarayoni 3 ta asosiy qadamdan iborat:</p>
      <ul>
        <li><code>npm install tailwindcss @tailwindcss/vite</code> — kerakli kutubxona va Vite plaginini o'rnatish.</li>
        <li><code>vite.config.js</code> fayliga <code>tailwindcss()</code> plaginini qo'shish.</li>
        <li>CSS faylga <code>@import "tailwindcss";</code> direktivasini kiritish.</li>
      </ul>

      <h2 className="flex items-center gap-2"><AlertTriangle className="text-yellow-500" /> Eslatma</h2>
      <Callout type="warning" title="Vite konfiguratsiyasi">
        Vite konfiguratsiya fayliga plaginni qo'shgandan so'ng dev serverni qayta ishga tushirish talab etilishi mumkin.
      </Callout>

      <h2 className="flex items-center gap-2"><XCircle className="text-red-500" /> Ko‘p uchraydigan xatolar</h2>
      <ul>
        <li>CSS faylda <code>@import "tailwindcss";</code> ni unutib qoldirish.</li>
        <li><code>vite.config.js</code> faylida plaginni noto'g'ri ulash.</li>
      </ul>

      <h2 className="flex items-center gap-2"><Puzzle className="text-indigo-500" /> Kichik mashq</h2>
      <Exercise title="Mashq">
        <p>Vite loyihasida Tailwind v4-ni sozlash uchun CSS faylga qaysi qator qo'shiladi?</p>
        <Solution>
          <CodeBlock lang="css">{`@import "tailwindcss";`}</CodeBlock>
        </Solution>
      </Exercise>

      <h2 className="flex items-center gap-2"><Trophy className="text-yellow-500" /> Mustaqil topshiriq</h2>
      <p>Yangi Vite loyihasi yarating va unga Tailwind CSS v4 ni noldan o'rnatib ko'ring.</p>

      <h2 className="flex items-center gap-2"><ClipboardList className="text-indigo-500" /> Quiz</h2>
      <Quiz questions={[
        {
          question: "Terminal nima?",
          options: [
            "Brauzer turi",
            "Kompyuterga yozma buyruqlar berish oynasi",
            "Kod yozadigan matn muharriri",
            "Vebsaytning bir qismi"
          ],
          correctIndex: 1,
          explanation: "Terminal orqali biz kompyuterning o'ziga to'g'ridan-to'g'ri buyruqlar yuboramiz (loyihani yarat, kutubxona yukla, serverni yoq va hk)."
        },
        {
          question: "npm run dev qanday vazifa bajaradi?",
          options: [
            "Loyihani o'chirib tashlaydi",
            "Tailwindni o'rnatadi",
            "Loyihani kompyuterdagi mahalliy serverda (localhost) ishga tushiradi",
            "Fayllarni internetga yuklaydi"
          ],
          correctIndex: 2,
          explanation: "Bu buyruq siz yozgan kodlarni brauzer tushunadigan shaklga o'girib, qarab turish uchun saytni ochib beradi."
        },
        {
          question: "Vite + Tailwind v4 kombinatsiyasida index.css fayli ichiga aynan nima yoziladi?",
          options: [
            "@import 'tailwindcss';",
            "import Tailwind from 'react';",
            "@tailwind base; @tailwind components;",
            "Hech narsa, css fayli o'chirib tashlanadi"
          ],
          correctIndex: 0,
          explanation: "Tailwind v4 dagi eng katta qulayliklardan biri shuki, uni ulash uchun shunchaki asosiy CSS fayliga @import 'tailwindcss'; deb yozish kifoya."
        },
        {
          question: "Nega ba'zida npm install buyrug'i ishlamaydi yoki boshqa joyga o'rnatilib qoladi?",
          options: [
            "Internet ishlamayapti",
            "Terminal noto'g'ri papkada turibdi (cd qilinmagan)",
            "Node.js buzuq",
            "Windowsda shunday bo'ladi"
          ],
          correctIndex: 1,
          explanation: "Boshlang'ich dasturchilar eng ko'p qiladigan xato - loyiha yaratilgandan so'ng uning ichiga kirishni esdan chiqarib (cd mening-loyiham), to'g'ridan to'g'ri install qilib yuborishadi."
        },
        {
          question: "vite.config.js faylining vazifasi nima?",
          options: [
            "Faqat CSS kodlarini saqlaydi",
            "Vite dasturining qanday ishlashi va qaysi plaginlarni (masalan Tailwind) ishlatishini belgilaydi",
            "HTML strukturasini yaratadi",
            "Rasm va videolarni siqadi"
          ],
          correctIndex: 1,
          explanation: "Ushbu konfiguratsiya fayli sayt qurish vositasi (Vite) ga loyihamiz qoidalari va plaginlarini tushuntiradi."
        }
      ]} />

      <h2 className="flex items-center gap-2"><CheckCircle className="text-green-500" /> Quiz javoblari</h2>
      <p>1: B, 2: B, 3: B, 4: B, 5: B</p>

      <h2 className="flex items-center gap-2"><GraduationCap className="text-indigo-500" /> Nimani o‘rgandik?</h2>
      <KeyPoints>
        <li>Terminal (qora oyna) orqali kompyuter bilan muloqot qilish mumkinligini bildik.</li>
        <li><code>npm create</code> va <code>npm install</code> yordamida loyiha tuzib, kutubxonalar qo'shishni o'rgandik.</li>
        <li>Tailwind v4 ni Vite bilan ishlatish qanchalik oson ekanligini, <code>vite.config.js</code> va bitta qator <code>@import</code> bilan ish bitishini ko'rdik.</li>
      </KeyPoints>
    </>
  )
}
