import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import { Target, BookOpen, Laptop, Search, AlertTriangle, XCircle, Puzzle, Trophy, ClipboardList, CheckCircle, GraduationCap } from 'lucide-react'

export const meta = {
  title: 'Tailwind CSS nima?',
  section: '1-Dars'
}

export default function TailwindNima() {
  return (
    <>
      <h2 className="flex items-center gap-2"><Target className="text-indigo-500" /> Dars maqsadi</h2>
      <p>Bu darsda biz Tailwind CSS nima ekanligini, qanday ishlashini va nima uchun bugungi kunda dasturchilar orasida juda mashhurligini o'rganamiz. Shuningdek, u oddiy CSS'dan qanday farq qilishini ko'rib chiqamiz.</p>

      <h2 className="flex items-center gap-2"><BookOpen className="text-indigo-500" /> Mavzu tushuntirishi</h2>
      
      <h3>Tailwind CSS nima va u qanday ishlaydi?</h3>
      <p><strong>Tailwind CSS</strong> — bu veb-saytlar dizaynini yaratish uchun ishlatiladigan <em>Utility-first</em> (yordamchi classlarga asoslangan) CSS framework'idir. U o'zida yuzlab tayyor mitti "g'ishtchalarni" (classlarni) jamlagan bo'lib, siz ularni HTML faylingizning o'zida yig'ib, butun bir dizaynni qurasiz.</p>

      <h3>Class nima?</h3>
      <p>Class — bu HTML elementiga (masalan, matn, tugma, rasm) qandaydir uslub berish uchun ishlatiladigan nom. Oddiy CSS'da siz class nomini o'ylab topib, unga alohida faylda rang, o'lcham berasiz. Tailwind'da esa class nomi uning aynan nima ish qilishini bildirib turadi.</p>

      <h3>Utility-first nima?</h3>
      <p>Utility-first shuni anglatadiki, har bir CSS xususiyati (padding, margin, rang) uchun tayyor va bitta vazifani bajaradigan (utilita) class mavjud. Masalan, matn rangini qizil qilish uchun <code>text-red-500</code> klassidan foydalanasiz.</p>

      <h3>Qanday muammoni hal qiladi va qayerda ishlatiladi?</h3>
      <ul>
        <li><strong>Muammo:</strong> Katta loyihalarda CSS fayllar shishib, class nomlari chalkashib ketadi (masalan: <code>.btn-primary-large-active</code>). Kodni saqlash va o'zgartirish qiyinlashadi.</li>
        <li><strong>Yechim:</strong> Tailwind barcha classlarni HTML ichida berishni taklif qiladi. Hech qanday CSS fayl yozish, nom o'ylab topish shart emas.</li>
        <li><strong>Qayerda ishlatiladi:</strong> React, Vue, Next.js kabi zamonaviy frameworklar yordamida yaratiladigan barcha turdagi veb-saytlar va ilovalarda keng qo'llaniladi.</li>
      </ul>

      <h2 className="flex items-center gap-2"><Laptop className="text-indigo-500" /> Kod misollari</h2>
      <p>Oddiy CSS va Tailwind CSS o'rtasidagi farqni quyidagi taqqoslash orqali oson tushunish mumkin:</p>

      <h3>1. Matnni o'rtaga joylash (text-align)</h3>
      <p>Oddiy CSS:</p>
      <CodeBlock lang="css">{`text-align: center;`}</CodeBlock>
      <p>Tailwind CSS:</p>
      <CodeBlock lang="html">{`<p class="text-center">Matn</p>`}</CodeBlock>

      <h3>2. Ichki bo'shliq (padding)</h3>
      <p>Oddiy CSS:</p>
      <CodeBlock lang="css">{`padding: 16px;`}</CodeBlock>
      <p>Tailwind CSS:</p>
      <CodeBlock lang="html">{`<div class="p-4">Quti</div>`}</CodeBlock>

      <h3>3. Tashqi bo'shliq (margin)</h3>
      <p>Oddiy CSS:</p>
      <CodeBlock lang="css">{`margin: 16px;`}</CodeBlock>
      <p>Tailwind CSS:</p>
      <CodeBlock lang="html">{`<div class="m-4">Quti</div>`}</CodeBlock>

      <h3>4. Orqa fon rangi (background-color)</h3>
      <p>Oddiy CSS:</p>
      <CodeBlock lang="css">{`background-color: blue;`}</CodeBlock>
      <p>Tailwind CSS:</p>
      <CodeBlock lang="html">{`<div class="bg-blue-500">Moviy quti</div>`}</CodeBlock>

      <h3>5. Joylashuv (display: flex)</h3>
      <p>Oddiy CSS:</p>
      <CodeBlock lang="css">{`display: flex;`}</CodeBlock>
      <p>Tailwind CSS:</p>
      <CodeBlock lang="html">{`<div class="flex">Yonma-yon elementlar</div>`}</CodeBlock>

      <h2 className="flex items-center gap-2"><Search className="text-indigo-500" /> Kod tahlili</h2>
      <p>Keling, yuqoridagi kodni batafsil tahlil qilamiz:</p>
      <ul>
        <li><code>flex items-center justify-between</code> — elementlarni bir qatorga teradi va oralig'ini ochadi.</li>
        <li><code>p-4 bg-white rounded-lg shadow-md</code> — ichki bo'shliq, oq fon, burchaklarni yumaloqlash va soya beradi.</li>
        <li><code>text-lg font-bold text-gray-800</code> — matnni kattalashtiradi, qalin qiladi va to'q kulrang rang beradi.</li>
        <li><code>bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700</code> — tugma stili hamda ustiga borgandagi effekti (hover).</li>
      </ul>

      <h2 className="flex items-center gap-2"><AlertTriangle className="text-yellow-500" /> Eslatma</h2>
      <Callout type="note" title="Muhim qoida">
        Tailwind CSS'da classlar tartibi muhim emas, lekin loyihangizda bir xil tartibga amal qilish kodni o'qishni osonlashtiradi.
      </Callout>

      <h2 className="flex items-center gap-2"><XCircle className="text-red-500" /> Ko‘p uchraydigan xatolar</h2>
      <ul>
        <li>Class nomini noto'g'ri yozish (masalan: <code>text-center</code> o'rniga <code>text-align-center</code>).</li>
        <li>Juda ko'p class yozib yuborish natijasida HTML fayl chalkashib ketishi.</li>
      </ul>

      <h2 className="flex items-center gap-2"><Puzzle className="text-indigo-500" /> Kichik mashq</h2>
      <Exercise title="Mashq">
        <p>Quyidagi oddiy tugmaga Tailwind CSS classlarini qo'shing:</p>
        <p>1. Orqa fonini yashil qiling (bg-green-500)</p>
        <p>2. Matnini oq qiling (text-white)</p>
        <p>3. Ustiga borganda to'qlashsin (hover:bg-green-600)</p>
        <Solution>
          <CodeBlock lang="html">{`<button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
  Saqlash
</button>`}</CodeBlock>
        </Solution>
      </Exercise>

      <h2 className="flex items-center gap-2"><Trophy className="text-yellow-500" /> Mustaqil topshiriq</h2>
      <p>O'zingiz uchun profil kartochkasi (Profile Card) HTML tuzilmasini yarating. Unga Tailwind yordamida rasm, ism, kasb hamda "Bog'lanish" tugmasini joylashtiring va chiroyli stil bering.</p>

      <h2 className="flex items-center gap-2"><ClipboardList className="text-indigo-500" /> Quiz</h2>
      <p>O'z xotirangizni sinab ko'ring. Quyidagi kodlarning Tailwind ekvivalentini o'ylab toping (javobni miyangizda yoki qog'ozda yozing):</p>
      <ul>
        <li><code>margin: 16px;</code></li>
        <li><code>text-align: center;</code></li>
        <li><code>display: flex;</code></li>
      </ul>

      <Quiz questions={[
        {
          question: "Tailwind CSS qaysi yondashuvga asoslangan?",
          options: [
            "Component-first",
            "Utility-first",
            "Inline-styles",
            "Block-Element-Modifier (BEM)"
          ],
          correctIndex: 1,
          explanation: "Tailwind CSS 'utility-first' yondashuvidan foydalanadi, ya'ni har bir kichik CSS qoidasi uchun alohida yordamchi classlar beriladi."
        },
        {
          question: "Padding 16px bo'lishi uchun qaysi class ishlatiladi?",
          options: [
            "padding-16",
            "p-16",
            "p-4",
            "pad-4"
          ],
          correctIndex: 2,
          explanation: "Tailwind'da 1 birlik = 4px. Shuning uchun p-4 (4 * 4 = 16px) bo'ladi."
        },
        {
          question: "Orqa fonni yashil (green) rangning o'rtacha to'qligida qilish class'i qaysi?",
          options: [
            "background-green",
            "bg-green-500",
            "color-green",
            "bg-green-100"
          ],
          correctIndex: 1,
          explanation: "Fon rangi uchun 'bg-' ishlatiladi, rang nomi 'green' va o'rtacha to'qlik '500'."
        },
        {
          question: "Oddiy CSS yozishda va Tailwind ishlatishda nima farq bor?",
          options: [
            "Tailwind faqat ranglarni o'zgartiradi",
            "Oddiy CSS fayllarda yoziladi, Tailwind HTML class atributida",
            "Tailwind sekinroq ishlaydi",
            "Hech qanday farq yo'j"
          ],
          correctIndex: 1,
          explanation: "Asosiy farq — siz endi .css fayllarga qayta-qayta yozib o'tirmaysiz, hamma ish HTML faylni o'zida tayyor classlarni yig'ish bilan bo'ladi."
        },
        {
          question: "Matnni o'rtaga joylash (text-align: center) klassini toping:",
          options: [
            "center",
            "align-center",
            "text-center",
            "txt-mid"
          ],
          correctIndex: 2,
          explanation: "Tailwind'da matn xususiyatlari asosan 'text-' so'zi bilan boshlanadi."
        }
      ]} />

      <h2 className="flex items-center gap-2"><CheckCircle className="text-green-500" /> Quiz javoblari</h2>
      <p>1: B, 2: B, 3: B, 4: B, 5: B</p>

      <h2 className="flex items-center gap-2"><GraduationCap className="text-indigo-500" /> Nimani o‘rgandik?</h2>
      <KeyPoints>
        <li>Tailwind CSS bu utility-first framework.</li>
        <li>U alohida CSS yozish majburiyatidan qutqaradi va HTML faylida tez ishlash imkonini beradi.</li>
        <li>Classlarning nomlanishi mantiqiy (masalan, m = margin, p = padding).</li>
        <li>Sonli o'lchamlar asosan 4 pikselga (4px) ko'paytiriladi.</li>
      </KeyPoints>
    </>
  )
}
