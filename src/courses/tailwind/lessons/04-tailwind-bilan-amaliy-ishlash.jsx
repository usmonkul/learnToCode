import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import { FaBullseye, FaBook, FaLaptopCode, FaSearch, FaExclamationTriangle, FaTimesCircle, FaTrophy, FaClipboardList, FaCheckCircle, FaGraduationCap } from 'react-icons/fa'

export const meta = {
  title: 'Tailwind CSS bilan amaliy ishlash',
  section: '4-Dars'
}

export default function AmaliyIshlash() {
  return (
    <>
      <h2 className="flex items-center gap-2"><FaBullseye className="text-indigo-500" /> Dars maqsadi</h2>
      <p>Bu so'nggi va eng qiziqarli darsimizda siz oldingi 3 ta darsda o'rgangan nazariy bilimlaringizni real, amaliy kichik loyihalarga aylantirasiz.</p>

      <h2 className="flex items-center gap-2"><FaBook className="text-indigo-500" /> Mavzu tushuntirishi</h2>
      <p>Biz barcha muhim konseptlarni: Colors, Spacing, Flexbox, Grid, Typography, Width/Height, Border, Border Radius, Shadow, Responsive Design hamda animatsiyalar (hover, focus, transition) ni kichik-kichik detallarni yasash orqali birlashtiramiz.</p>

      <h2 className="flex items-center gap-2"><FaLaptopCode className="text-indigo-500" /> Kod misollari va Amaliy Mashqlar</h2>

      <h3>1-mashq: Chiroyli va Interaktiv Button (Tugma)</h3>
      <p><strong>Maqsad:</strong> Matni qalin, chetlari yumaloq, ustiga borganda rangi o'zgaradigan va soyasi paydo bo'ladigan tugma yasash.</p>
      
      <p><strong>Bosqichma-bosqich:</strong></p>
      <ol>
        <li>Tugmaga orqa fon va matn rangi beramiz: <code>bg-indigo-600 text-white</code></li>
        <li>O'lcham va bo'shliqlar: <code>px-6 py-2</code> (kengroq ko'rinishi uchun x kattaroq)</li>
        <li>Shakl va matn qalinligi: <code>rounded-full font-semibold</code></li>
        <li>Interaktivlik (silliq hover): <code>transition hover:bg-indigo-700 hover:shadow-lg</code></li>
      </ol>

      <CodeBlock lang="html">{`<button class="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold transition hover:bg-indigo-700 hover:shadow-lg">
  Boshlash
</button>`}</CodeBlock>

      <h3>2-mashq: Card (Oddiy Karta) yaratish</h3>
      <p><strong>Maqsad:</strong> Oq fonli, ramkasiz, biroz soyali va ichki paddingga ega oddiy kontent qutisini yasash.</p>
      
      <CodeBlock lang="html">{`<div class="bg-white p-6 rounded-xl shadow-md max-w-sm">
  <h3 class="text-xl font-bold text-gray-800">Assalomu alaykum!</h3>
  <p class="text-gray-600 mt-2">Bu yerda Tailwind CSS qanchalik ajoyib ekanligi haqida matn bo'lishi mumkin.</p>
</div>`}</CodeBlock>

      <h3>3-mashq: Profile Card (Foydalanuvchi profili) yaratish</h3>
      <p><strong>Maqsad:</strong> Yuqoridagi Card ichiga rasm va markazlashtirilgan elementlarni (flex/text-center) joylash.</p>
      
      <CodeBlock lang="html">{`<div class="bg-white p-6 rounded-xl shadow-lg max-w-sm text-center mx-auto">
  <img 
    class="w-24 h-24 rounded-full mx-auto border-4 border-gray-100" 
    src="https://via.placeholder.com/150" 
    alt="Avatar" 
  />
  <h2 class="text-2xl font-bold text-gray-800 mt-4">Alisher Navoiy</h2>
  <p class="text-indigo-500 font-medium">Senior Frontend Dasturchi</p>
  <button class="mt-6 bg-gray-900 text-white w-full py-2 rounded-lg hover:bg-gray-800 transition">
    Kuzatish
  </button>
</div>`}</CodeBlock>
      <p><strong>Qaysi classlar ishlatildi?</strong> <code>mx-auto</code> elementni gorizontal markazlashtiradi. Rasm to'liq dumaloq bo'lishi uchun <code>rounded-full</code>, atrofiga qalin chiziq tortish uchun <code>border-4</code> ishlatildi.</p>

      <h3>4-mashq: Navbar (Menyu) yaratish</h3>
      <p><strong>Maqsad:</strong> Ekran chetlariga yoyilgan (Flexbox), hover qilinganda rangi o'zgaradigan Navigatsiya paneli yaratish.</p>
      
      <CodeBlock lang="html">{`<nav class="bg-white shadow px-6 py-4 flex justify-between items-center">
  <div class="text-2xl font-black text-indigo-600">MeningSaytim</div>
  <div class="flex gap-6">
    <a href="#" class="text-gray-600 hover:text-indigo-600 font-medium transition">Asosiy</a>
    <a href="#" class="text-gray-600 hover:text-indigo-600 font-medium transition">Loyihalar</a>
    <a href="#" class="text-gray-600 hover:text-indigo-600 font-medium transition">Aloqa</a>
  </div>
</nav>`}</CodeBlock>

      <h3>5-mashq: Responsive Card Grid yaratish</h3>
      <p><strong>Maqsad:</strong> Grid yordamida kartochkalarni telefonda ustma-ust (1 ta ustun), planshetda (2 ta ustun), kompyuterda (3 ta ustun) joylash.</p>
      
      <CodeBlock lang="html">{`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  <!-- Bu yerga yuqoridagi 2-mashqdagi Card kodini 3 marta qo'ying -->
  <div class="bg-blue-100 p-6 rounded-lg">1-karta</div>
  <div class="bg-green-100 p-6 rounded-lg">2-karta</div>
  <div class="bg-red-100 p-6 rounded-lg">3-karta</div>
</div>`}</CodeBlock>
      <p><strong>Qaysi classlar ishlatildi?</strong> Mobile-first dizayn. Avval standart <code>grid-cols-1</code> o'qiladi. Ekran o'rtacha (md: 768px) bo'lganda <code>md:grid-cols-2</code> ga, katta bo'lganda <code>lg:grid-cols-3</code> ga aylanadi.</p>

      <h3>6-mashq: Oddiy Landing Page yaratish</h3>
      <p><strong>Maqsad:</strong> Yuqorida yig'ilgan bilimlardan foydalanib bitta to'liq sahifa ko'rinishini yasash.</p>
      
      <CodeBlock lang="html">{`<!-- Asosiy quti: Ekran balandligi bo'ylab o'rtada joylashtirish -->
<div class="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
  <div class="max-w-2xl">
    <h1 class="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
      Dizaynni <span class="text-indigo-600">Tezroq</span> Yarating
    </h1>
    <p class="mt-4 text-lg md:text-xl text-gray-600">
      Tailwind CSS orqali tayyor klasslarni birlashtirib noldan chiroyli va responsiv web ilovalar quring.
    </p>
    <div class="mt-8 flex flex-col sm:flex-row justify-center gap-4">
      <button class="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition">
        Boshlash
      </button>
      <button class="bg-white text-gray-800 border border-gray-300 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition">
        Hujjatlarni o'qish
      </button>
    </div>
  </div>
</div>`}</CodeBlock>
      <p><strong>Qaysi classlar ishlatildi?</strong> Butun ekranni egallash uchun <code>min-h-screen</code> va Flexbox orqali markazlashtirish (<code>flex items-center justify-center</code>). Tugmalar telefonda ustma-ust bo'ladi (<code>flex-col</code>), ekrani sal kattalashishi bilan yonma-yon aylanadi (<code>sm:flex-row</code>).</p>

      <h2 className="flex items-center gap-2"><FaSearch className="text-indigo-500" /> Kod tahlili</h2>
      <p>Ahamiyat bergan bo'lsangiz, biz biron marta ham HTML faylidan chiqib .css fayliga kod yozmadik. Murakkab hover, focus va ekran o'lchamlari (responsive) ham to'g'ridan-to'g'ri elementning o'zida ifodalandi. Shu orqali biz HTML elementiga qarab turib, uning qanday ko'rinishda ekanini to'liq o'qiy olamiz.</p>

      <h2 className="flex items-center gap-2"><FaExclamationTriangle className="text-yellow-500" /> Eslatma</h2>
      <Callout type="note" title="Doimiy amaliyot">
        Tailwind classlarini yodlab bo'lmaydi. Uni faqatgina amaliyotda loyihalar qilish orqaligina o'rganish mumkin. Agar biron class qanday yozilishini unutib qo'ysangiz TailwindCSS rasmiy saytidan qidirishga odatlaning.
      </Callout>

      <h2 className="flex items-center gap-2"><FaTimesCircle className="text-red-500" /> Ko‘p uchraydigan xatolar</h2>
      <ul>
        <li><strong>Responsive classlarni teskari yozish:</strong> Katta ekranlardan kichigiga qarab emas (masalan, <code>lg:text-sm text-lg</code> emas), doim <strong>Kichik ekrandan kattasiga qarab yozing</strong> (<code>text-sm lg:text-lg</code>).</li>
        <li><strong>O'ta uzun classlar:</strong> Katta loyihalarda HTML kodi juda yoyilib ketadi. Bu normal holat. Agar bezovta qilsa, React kabi frameworklarda tayyor komponentlar (masalan <code>&lt;Button /&gt;</code>) yaratib oling.</li>
      </ul>

      <h2 className="flex items-center gap-2"><FaTrophy className="text-yellow-500" /> Mustaqil yakuniy topshiriq</h2>
      <p>Menyu (Navbar) ni shunday qayta yozingki, u telefonda (kichik ekranda) linklarni yashirib qo'ysin va uning o'rnida faqat "Menu" degan yozuvli tugma tursin. Noutbukda ochilganda esa "Menu" tugmasi yo'qolib, barcha 3 ta link ekranga chiqsin.</p>

      <h2 className="flex items-center gap-2"><FaClipboardList className="text-indigo-500" /> Quiz</h2>
      
      <Quiz questions={[
        {
          question: "Tugma ustiga qadam bosilganda (hover bo'lganda) animatsiyani sekin, yoyib ko'rsatish uchun qaysi class zarur?",
          options: [
            "animation-slow",
            "hover-slow",
            "transition",
            "hover:animate"
          ],
          correctIndex: 2,
          explanation: "transition klassi bo'lmasa, hoverdagi rang yoki hajm o'zgarishi animatsiyasiz (birdaniga) ro'y beradi."
        },
        {
          question: "Siz margin-left va margin-right berish uchun mr-4 va ml-4 ni ishlata olasiz, buni bitta class bilan qanday qilasiz?",
          options: [
            "mx-4",
            "my-4",
            "m-lr-4",
            "margin-x-4"
          ],
          correctIndex: 0,
          explanation: "x o'qi gorizontal chiziqni anglatadi (chap va o'ng)."
        },
        {
          question: "Matn hajmini qanday qilib telefonda o'rtacha (base), planshetda katta (lg) qilish mumkin?",
          options: [
            "text-base lg:text-lg",
            "text-base md:text-lg",
            "md:text-base text-lg",
            "text-lg sm:text-base"
          ],
          correctIndex: 1,
          explanation: "Avval oddiy class (text-base), keyin esa ekran kattalashganda ishlab ketuvchi prefiks (md:text-lg)."
        },
        {
          question: "Elementni butun ekran bo'ylab gorizontal va vertikaliga o'rtaga (markazga) joylash uchun qanday texnika ishlatildi?",
          options: [
            "text-center margin-auto",
            "flex justify-center items-center h-screen",
            "grid-center",
            "absolute-center"
          ],
          correctIndex: 1,
          explanation: "Eng mashhur usul: h-screen qilib joy ochiladi, flex yordamida o'rtaga olinadi (justify-center, items-center)."
        },
        {
          question: "rounded-full classining vazifasi nima?",
          options: [
            "Ekranni to'ldiradi",
            "Matnni dumaloqlaydi",
            "Burchaklarni to'liq doira yoki kapsula shaklida yumaloqlaydi",
            "Faqat rasmlarni yumaloqlaydi"
          ],
          correctIndex: 2,
          explanation: "CSS dagi border-radius: 9999px vazifasini bajaradi."
        },
        {
          question: "Kichik soyani berish class'ini toping.",
          options: [
            "shadow",
            "shadow-lg",
            "shadow-xl",
            "box-shadow"
          ],
          correctIndex: 0,
          explanation: "shadow (o'zi yozilsa kichik soya), shadow-md (o'rtacha soya), shadow-lg (katta soya)."
        },
        {
          question: "Agar siz lg:grid-cols-3 yozsangiz mobil telefonda nechta ustun bo'ladi?",
          options: [
            "3 ta",
            "2 ta",
            "1 ta",
            "Xato beradi"
          ],
          correctIndex: 2,
          explanation: "Agar mobil telefon uchun aniq grid-cols-* ko'rsatilmagan bo'lsa, bloklar odatiy holatida 1 ta ustun bo'lib (ustma ust) joylashadi."
        },
        {
          question: "Ranglarda daraja nima uchun kerak? (masalan, bg-red-100 va bg-red-900 farqi)",
          options: [
            "100 katta va 900 kichik",
            "100 och rang, 900 juda to'q rangni anglatadi",
            "Farqi yo'q, ikkalasi bir xil",
            "O'lchamlarini bildiradi"
          ],
          correctIndex: 1,
          explanation: "Tailwind rang palitrasi ochiq ranglardan (50, 100) to'q ranglargacha (900, 950) ketma-ketlikda yozilgan."
        },
        {
          question: "Qachon max-w-* classlari ishlatiladi?",
          options: [
            "Ekranga sig'may qolganda",
            "Element kengligini chegaralash uchun (masalan card juda kengayib ketmasligi uchun)",
            "Balandlikni o'zgartirish uchun",
            "Umuman ishlatilmaydi"
          ],
          correctIndex: 1,
          explanation: "max-w-sm kabi classlar (max-width) kontentning ma'lum bir chiziqdan u yog'iga cho'zilib ketishini taqiqlaydi."
        },
        {
          question: "Kursni muvaffaqiyatli tugatdingizmi?",
          options: [
            "Ha, albatta!",
            "Ha, amaliyotlarni o'zim ham yozib ko'rdim!",
            "Endi o'zim real proyektlarni Tailwind da qila olaman!",
            "Barcha javoblar to'g'ri"
          ],
          correctIndex: 3,
          explanation: "Siz barakallasiz! :)"
        }
      ]} />

      <h2 className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Quiz javoblari</h2>
      <p>Umid qilamizki, siz hamma savollarga to'g'ri javob topa oldingiz. Agarda nimadir esingizdan chiqqan bo'lsa oldingi darslarga qaytib bir marta takrorlab olish foydadan xoli bo'lmaydi.</p>

      <h2 className="flex items-center gap-2"><FaGraduationCap className="text-indigo-500" /> Umumiy Xulosa (Nimani o‘rgandik?)</h2>
      <p>Ushbu barcha 4 darslik yakunida biz nimalarga erishdik?</p>
      <KeyPoints>
        <li><strong>Mustaqillik:</strong> Oddiy CSS kodlarini ko'rganda uni qo'rqmasdan Tailwind'ga o'gira olasiz.</li>
        <li><strong>Arxitektura:</strong> Dizaynni qanday boshlash (Mobile-first) ni tushunasiz.</li>
        <li><strong>Tajriba:</strong> Real loyihalardagi UI komponentlari (Card, Navbar, Grid) qanday yozilishini amalda qo'llab ko'rdingiz.</li>
      </KeyPoints>
      
      <p>Endigi navbat faqat <strong>amaliyot</strong>. O'zingiz qandaydir web-saytni ko'z ostingizga oling va uni faqatgina HTML va Tailwind CSS yordamida yasashga urinib ko'ring. Omad!</p>
    </>
  )
}
