import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import { FaBullseye, FaBook, FaLaptopCode, FaSearch, FaExclamationTriangle, FaTimesCircle, FaPuzzlePiece, FaTrophy, FaClipboardList, FaCheckCircle, FaGraduationCap } from 'react-icons/fa'

export const meta = {
  title: 'Tailwind CSS\'ni o\'rnatish va ishlatish',
  section: '2-Dars'
}

export default function TailwindOrnatish() {
  return (
    <>
      <h2 className="flex items-center gap-2"><FaBullseye className="text-indigo-500" /> Dars maqsadi</h2>
      <p>Bu darsda biz Tailwind CSS ni 0 dan boshlab zamonaviy React + Vite loyihasiga qanday qo'shishni o'rganamiz. Shuningdek, terminal nima ekanligi va fayllar tuzilishi bilan tanishamiz.</p>

      <h2 className="flex items-center gap-2"><FaBook className="text-indigo-500" /> Mavzu tushuntirishi</h2>

      <h3>Terminal nima?</h3>
      <p>Terminal (yoki Command Prompt) — bu kompyuterga yozma (matnli) buyruqlar berish orqali boshqariladigan oyna. Biz loyiha yaratish, dasturlarni yuklab olish (masalan, Tailwind'ni o'rnatish) va saytimizni ishga tushirish uchun ushbu terminaldan foydalanamiz.</p>

      <h3>React + Vite loyihasida o'rnatish</h3>
      <p>Hozirgi kunda web loyihalar ko'pincha Vite nomli juda tezkor dastur yordamida yaratiladi. Keling, bosqichma-bosqich o'rnatamiz.</p>

      <h2 className="flex items-center gap-2"><FaLaptopCode className="text-indigo-500" /> Kod misollari (Qadam-ba-qadam)</h2>

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

      <h2 className="flex items-center gap-2"><FaSearch className="text-indigo-500" /> Kod tahlili</h2>
      <p>Qaysi faylga nima yoziladi va u qanday ishlaydi?</p>
      <ul>
        <li><strong><code>index.css</code>:</strong> Bu sizning yagona CSS faylingiz. Uni HTML'ingiz (yoki Reactdagi <code>main.jsx</code>) eng boshida import qilgan. Siz u yerga yozgan <code>@import "tailwindcss"</code> butun Tailwind sehri ishlashini ta'minlaydi.</li>
        <li><strong><code>App.jsx</code>:</strong> Bu siz HTML (yoki aniqrog'i JSX) va Tailwind classlarini yozadigan asosiy joyingizdir.</li>
      </ul>

      <h2 className="flex items-center gap-2"><FaExclamationTriangle className="text-yellow-500" /> Eslatma</h2>
      <Callout type="note" title="Terminal ishlash qoidasi">
        Buyruqlarni (command) doim loyihangiz papkasi ichida yozish kerak! Agar siz boshqa papkada turib <code>npm install</code> qilsangiz, Tailwind loyihangizga qo'shilmaydi.
      </Callout>

      <h2 className="flex items-center gap-2"><FaTimesCircle className="text-red-500" /> Ko‘p uchraydigan xatolar</h2>
      <ul>
        <li><strong>Terminalda xatolik (Error) chiqishi:</strong> Odatda papkaga kirmasdan (<code>cd mening-loyiham</code> qilmasdan) buyruq berish oqibatida kelib chiqadi.</li>
        <li><strong>CSS classlar ishlamasligi:</strong> <code>vite.config.js</code> ga plagin qo'shish yoddan ko'tarilgan bo'lsa yoki serverni o'chirib yoqish kerak bo'lsa shunday bo'ladi. Doim o'zgartirishlardan so'ng <code>npm run dev</code> ni qayta ishga tushirib turing.</li>
      </ul>

      <h2 className="flex items-center gap-2"><FaPuzzlePiece className="text-indigo-500" /> Kichik mashq</h2>
      <Exercise title="1-mashq: Sinov">
        <p>Tailwind to'g'ri ishlaganini sinash uchun <code>src/App.jsx</code> ichiga qanday kod yozib tekshirsak bo'ladi? Yozuv tagiga chizilgan, rangi qizil va juda katta bo'lishi kerak.</p>
        <Solution>
          <CodeBlock lang="jsx">{`export default function App() {
  return (
    <h1 class="text-3xl font-bold underline text-red-500">
      Salom, Tailwind!
    </h1>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <h2 className="flex items-center gap-2"><FaTrophy className="text-yellow-500" /> Mustaqil topshiriq</h2>
      <p>O'z kompyuteringizda terminalni oching. Mutlaqo yangi bitta Vite loyihasi yarating va Tailwind ni yuqoridagi 5 qadam asosida ulab chiqing. Brauzerda qizil matnni ko'rmaguningizcha taslim bo'lmang!</p>

      <h2 className="flex items-center gap-2"><FaClipboardList className="text-indigo-500" /> Quiz</h2>
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

      <h2 className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Quiz javoblari</h2>
      <p>Barcha to'g'ri javoblarning asosi yuqorida tushuntirilgan. Asosiy maqsad qaysi jarayon qayerda ketayotganini ko'z oldingizga keltira olishingizdir.</p>

      <h2 className="flex items-center gap-2"><FaGraduationCap className="text-indigo-500" /> Nimani o‘rgandik?</h2>
      <KeyPoints>
        <li>Terminal (qora oyna) orqali kompyuter bilan muloqot qilish mumkinligini bildik.</li>
        <li><code>npm create</code> va <code>npm install</code> yordamida loyiha tuzib, kutubxonalar qo'shishni o'rgandik.</li>
        <li>Tailwind v4 ni Vite bilan ishlatish qanchalik oson ekanligini, <code>vite.config.js</code> va bitta qator <code>@import</code> bilan ish bitishini ko'rdik.</li>
      </KeyPoints>
    </>
  )
}
