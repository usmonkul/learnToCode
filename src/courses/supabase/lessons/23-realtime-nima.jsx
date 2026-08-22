import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Realtime nima va qachon kerak bo'ladi",
  section: "7-bo'lim: Realtime",
}

export default function Lesson23RealtimeNima() {
  return (
    <>
      <p>
        Hozirgi paytgacha "Vazifalar boshqaruvchisi" loyihamiz shunday ishlaydi: sahifa
        ochilganda <code>fetchTasks</code> chaqiriladi, ma'lumotlar bazasidan vazifalar bir marta
        o'qib olinadi va ekranga chiqariladi. Shundan keyin brauzer sahifasi ma'lumotlar bazasi
        bilan hech qanday aloqada bo'lmaydi — agar boshqa birov (yoki boshqa qurilmada
        siz o'zingiz) o'sha vazifalar jadvaliga o'zgartirish kiritsa, sizning ekraningiz buni
        <strong> bilmaydi ham</strong>. Sahifani qo'lda yangilamaguningizcha (refresh), eski holat
        ko'rinib turaveradi. Aynan shu muammoni hal qiladigan Supabase imkoniyati —{' '}
        <strong>Realtime</strong>.
      </p>

      <h2>Realtime qanday ishlaydi?</h2>
      <p>
        Realtime — Supabase'ning ma'lumotlar bazasidagi o'zgarishlarni brauzeringizga{' '}
        <strong>websocket</strong> ulanishi orqali jonli (live) yetkazib beradigan
        infratuzilmasi. Oddiy so'z bilan aytganda: siz frontend'da "menga <code>tasks</code>{' '}
        jadvalida biror narsa o'zgarsa, darhol xabar ber" deb "obuna" (subscribe) bo'lasiz.
        Shundan keyin, jadvalga qaysi manbadan bo'lmasin — sizning o'zingizning brauzeringizdan,
        boshqa foydalanuvchidan, hatto Table Editor'dan qo'lda kiritilgan yozuvdan ham — har
        qanday o'zgarish bo'lsa, Supabase serveri bu haqda websocket orqali sizning ochiq
        sahifangizga xabar yuboradi va siz sahifani yangilamasdan turib yangi holatni
        ko'rsatishingiz mumkin bo'ladi.
      </p>
      <p>
        Texnik jihatdan bu PostgreSQL'ning{' '}
        <strong>logical replication</strong> mexanizmiga asoslangan: Postgres har bir jadvalga
        yozilgan <code>INSERT</code>, <code>UPDATE</code> va <code>DELETE</code> amallarini{' '}
        "replikatsiya oqimi"ga chiqarib turadi, Supabase esa shu oqimni tinglab, har bir hodisani
        websocket orqali obuna bo'lgan barcha mijozlarga (client) tarqatadi. Bu — Supabase'ning
        o'zi qo'shimcha "pollingi" emas, balki bazaning ichki mexanizmi ustiga qurilgan
        haqiqiy voqea-asosli (event-driven) tizim.
      </p>
      <p>
        Supabase'da bu hodisalar umumiy nom bilan{' '}
        <strong><code>postgres_changes</code></strong> deb ataladi va uchta turga bo'linadi:
      </p>
      <ul>
        <li>
          <code>INSERT</code> — jadvalga yangi qator qo'shilganda.
        </li>
        <li>
          <code>UPDATE</code> — mavjud qator o'zgartirilganda.
        </li>
        <li>
          <code>DELETE</code> — qator o'chirilganda.
        </li>
      </ul>
      <p>
        Har bir hodisa qatorning o'zi bilan birga keladi (masalan, <code>INSERT</code> uchun
        yangi qo'shilgan qator, <code>UPDATE</code> uchun ham eski, ham yangi qiymat), shuning
        uchun frontend qo'shimcha so'rov yubormasdan, kelgan ma'lumot asosida to'g'ridan-to'g'ri
        o'z state'ini yangilay oladi.
      </p>

      <Callout type="note" title="Realtime faqat postgres_changes bilan cheklanmaydi">
        Bu darsda biz faqat <code>postgres_changes</code>'ga e'tibor qaratamiz, chunki u bizning
        loyihamizga eng mos keladi. Lekin Supabase Realtime'ning yana ikkita imkoniyati bor:{' '}
        <strong>Broadcast</strong> (foydalanuvchilar orasida bevosita, bazaga yozmasdan xabar
        almashish — masalan, "kimdir yozmoqda..." indikatori) va <strong>Presence</strong>{' '}
        (qaysi foydalanuvchilar hozir onlayn ekanini kuzatish). Ularni chuqurroq o'rganishni
        istasangiz, Supabase rasmiy hujjatlaridagi "Realtime" bo'limiga qarang.
      </Callout>

      <h2>Realtime qachon haqiqatan kerak bo'ladi?</h2>
      <p>
        Realtime — kuchli, lekin har doim ham kerak bo'lavermaydigan vosita. Uni qo'shishdan
        oldin o'zingizga savol bering: <em>"Ushbu ma'lumot bir necha soniya eskirgan bo'lsa,
        foydalanuvchi buni sezadimi va bu muammo tug'diradimi?"</em> Agar javob "ha" bo'lsa,
        Realtime o'z o'rnini topadi. Odatiy holatlar:
      </p>
      <ul>
        <li>
          <strong>Ko'p foydalanuvchili ilovalar</strong> — bir nechta odam bir xil ma'lumot bilan
          bir vaqtda ishlaydi (masalan, jamoaviy vazifalar ro'yxati, birgalikda tahrirlanadigan
          hujjat). Bittasi vazifa qo'shsa, boshqasi buni sahifani yangilamasdan ko'rishi kerak.
        </li>
        <li>
          <strong>Jonli boshqaruv panellari (live dashboards)</strong> — masalan, onlayn
          do'kondagi buyurtmalar soni, serverdagi faol foydalanuvchilar statistikasi. Raqamlar
          o'zgarganda ekranda darhol ko'rinishi kutiladi.
        </li>
        <li>
          <strong>Chat va xabar almashish</strong> — yangi xabar kelganda uni darhol ko'rsatish
          talab qilinadigan klassik holat.
        </li>
        <li>
          <strong>Bildirishnomalar (notifications)</strong> — masalan, kimdir sizga izoh
          qoldirganda darhol "qo'ng'iroq" belgisi yonishi kerak bo'lgan holatlar.
        </li>
      </ul>

      <h2>Qachon polling (qayta so'rash) yetarli?</h2>
      <p>
        Ko'pincha dasturchilar Realtime'ni "har doim yaxshiroq" deb o'ylab, kerak bo'lmagan
        joyda ham ishlatib yuboradi. Lekin websocket ulanishini ochiq saqlash, uni kuzatib
        turish va tozalash — qo'shimcha murakkablik va resurs sarfi. Ko'p holatlarda oddiy{' '}
        <strong>polling</strong> (masalan, <code>setInterval</code> yordamida har necha
        soniyada <code>fetchTasks</code>ni qayta chaqirish) yoki hatto shunchaki sahifa
        ochilganda bir marta so'rash — to'liq yetarli:
      </p>
      <ul>
        <li>
          Ma'lumot faqat siz — bitta foydalanuvchi — tomonidan o'zgartiriladigan shaxsiy ilovalar
          (masalan, shaxsiy kundalik, faqat o'zingiz ko'radigan sozlamalar sahifasi).
        </li>
        <li>
          Ma'lumot kamdan-kam o'zgaradigan sahifalar (masalan, blog postlari ro'yxati, mahsulot
          katalogi) — foydalanuvchi sahifani qayta ochganda yangi holatni ko'rishi kifoya.
        </li>
        <li>
          Admin panellari yoki ichki hisobot sahifalari, bunda bir necha soniyalik kechikish
          hech kimga ta'sir qilmaydi.
        </li>
      </ul>
      <Callout type="tip" title="Avval polling, keyin Realtime">
        Agar ishonchingiz komil bo'lmasa, avval eng oddiy yechim — sahifa ochilganda bir marta
        so'rash yoki kerak bo'lsa polling — bilan boshlang. Realtime'ni faqat foydalanuvchilar
        "nega ma'lumot yangilanmayapti, sahifani qayta ochishim kerakmi?" degan shikoyat qilishi
        mumkin bo'lgan aniq holatlarda qo'shing. Bu — kerak bo'lmagan murakkablikni oldini olishning
        yaxshi umumiy qoidasi.
      </Callout>

      <h2>Bizning loyihamiz uchun nega mos?</h2>
      <p>
        "Vazifalar boshqaruvchisi" — asosda shaxsiy ilova bo'lsa-da, biz uni Realtime
        misolida ko'rsatish uchun tanladik, chunki u eng oddiy va tushunarli holat: bir nechta
        oyna (yoki bir nechta qurilma)da bir xil hisobga kirib turib, bittasida vazifa
        qo'shsangiz yoki belgilasangiz, boshqasida darhol ko'rinishini kuzatish mumkin. Keyingi
        darsda aynan shuni amalga oshiramiz — <code>tasks</code> jadvali uchun Realtime'ni
        yoqamiz va <code>App.jsx</code>ga obuna (subscription) qo'shamiz.
      </p>

      <Quiz
        question="Quyidagi holatlardan qaysi biri uchun Realtime (postgres_changes) qo'shish eng mantiqiy?"
        options={[
          "Faqat bitta foydalanuvchi ko'radigan shaxsiy sozlamalar sahifasi",
          "Kamdan-kam yangilanadigan blog postlari ro'yxati",
          "Bir nechta foydalanuvchi bir vaqtda ishlaydigan jamoaviy vazifalar ro'yxati",
          "Har oyda bir marta yangilanadigan statik hisobot sahifasi",
        ]}
        correctIndex={2}
        explanation="Realtime eng katta foyda beradigan holat — bir nechta foydalanuvchi bir xil ma'lumot bilan bir vaqtda ishlaydigan, o'zgarishlarni darhol ko'rish muhim bo'lgan holatlar. Qolgan uchta misolda ma'lumot kam o'zgaradi yoki faqat bitta foydalanuvchiga tegishli, shuning uchun oddiy so'rov (yoki polling) yetarli."
      />

      <KeyPoints>
        <li>
          Supabase Realtime — ma'lumotlar bazasidagi o'zgarishlarni websocket orqali jonli
          yetkazib beradigan tizim, PostgreSQL'ning logical replication mexanizmiga asoslangan.
        </li>
        <li>
          <code>postgres_changes</code> — jadval darajasidagi <code>INSERT</code>,{' '}
          <code>UPDATE</code>, <code>DELETE</code> hodisalariga obuna bo'lish imkonini beradi.
        </li>
        <li>
          Realtime — ko'p foydalanuvchili ilovalar, jonli boshqaruv panellari va chat kabi
          holatlarda o'z o'rnini topadi, bunda ma'lumot eskirishi darhol sezilarli bo'ladi.
        </li>
        <li>
          Kamdan-kam o'zgaradigan yoki faqat bitta foydalanuvchiga tegishli ma'lumot uchun
          oddiy so'rov yoki polling ko'pincha yetarli va soddaroq yechim.
        </li>
        <li>
          Keyingi darsda <code>tasks</code> jadvali uchun Realtime yoqiladi va{' '}
          <code>App.jsx</code>ga jonli obuna qo'shiladi.
        </li>
      </KeyPoints>
    </>
  )
}
