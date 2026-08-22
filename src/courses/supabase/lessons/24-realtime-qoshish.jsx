import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Loyihaga jonli yangilanish qo'shish",
  section: "7-bo'lim: Realtime",
}

export default function Lesson24RealtimeQoshish() {
  return (
    <>
      <p>
        Oldingi darsda Realtime nima ekanini va qachon kerak bo'lishini ko'rib chiqdik. Endi
        buni "Vazifalar boshqaruvchisi" loyihamizga qo'shamiz: <code>tasks</code> jadvali uchun
        Realtime'ni yoqamiz va <code>App.jsx</code>ga jonli obuna (subscription) qo'shib,
        vazifalar ro'yxati sahifani yangilamasdan turib o'z-o'zidan yangilanadigan qilamiz.
      </p>

      <h2>1-qadam: tasks jadvali uchun Realtime'ni yoqish</h2>
      <p>
        Odatiy holatda Supabase'dagi jadvallar Realtime orqali "translyatsiya qilinmaydi" —
        buni har bir jadval uchun alohida yoqish kerak. Buni ikki xil usulda qilish mumkin.
      </p>
      <p>
        <strong>Dashboard orqali</strong> — bu eng oddiy yo'l: Supabase loyihangizda{' '}
        <strong>Database → Replication</strong> bo'limiga o'ting, ro'yxatdagi <code>tasks</code>{' '}
        jadvalini toping va uning yonidagi tumblerni (toggle) yoqing. Shu bilan jadval Postgres
        replikatsiya oqimiga qo'shiladi va Realtime uchun ochiladi.
      </p>
      <p>
        <strong>SQL Editor orqali</strong> — bir xil natijaga SQL buyrug'i bilan ham erishish
        mumkin, agar siz allaqachon SQL Editor'ga o'rganib qolgan bo'lsangiz:
      </p>
      <CodeBlock lang="sql">{`alter publication supabase_realtime add table tasks;`}</CodeBlock>
      <p>
        Bu yerdagi <code>supabase_realtime</code> — Supabase loyiha yaratilganda avtomatik
        tuziladigan maxsus Postgres "publication" (nashr) — Realtime tizimi aynan shu
        publication'ga qo'shilgan jadvallarni kuzatib boradi. Dashboard'dagi tumbler ham aslida
        aynan shu SQL buyrug'ini orqa fonda bajaradi, shuning uchun ikkala usul ham bir xil
        natija beradi — qaysi biri qulayroq bo'lsa, o'shani tanlang.
      </p>

      <Callout type="warning" title="RLS Realtime uchun ham amal qiladi">
        Realtime hodisalari ham jadvaldagi Row Level Security policy'laridan o'tadi: agar
        foydalanuvchi <code>select</code> policy'si orqali biror qatorni ko'rishga ruxsati
        bo'lmasa, u qatorga tegishli Realtime hodisasini ham olmaydi. Bizning loyihamizda hozircha
        ochiq policy'lar bor (4-bo'lim), keyinroq auth qo'shilgach (5-bo'lim) esa har bir
        foydalanuvchi faqat o'ziga tegishli vazifalarning jonli o'zgarishlarini ko'radi — bu
        qo'shimcha sozlash talab qilmaydi, chunki bir xil RLS policy'lar ishlatiladi.
      </Callout>

      <h2>2-qadam: App.jsx'ga obuna qo'shish</h2>
      <p>
        Endi <code>App.jsx</code>dagi mavjud <code>useEffect</code>lar qatoriga yangi bittasini
        qo'shamiz. U komponent birinchi marta render bo'lganda websocket kanaliga ulanadi va{' '}
        <code>tasks</code> jadvalidagi har qanday o'zgarishni tinglaydi:
      </p>
      <CodeBlock lang="jsx">{`useEffect(() => {
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

  return () => {
    supabase.removeChannel(channel)
  }
}, [])`}</CodeBlock>
      <p>
        Bu <code>useEffect</code>ni <code>App</code> komponenti ichida, <code>fetchTasks</code>ni
        chaqiradigan <code>useEffect</code> bilan bir qatorda, alohida qo'shing — ikkalasi ham{' '}
        <code>[]</code> bog'liqlik massivi (dependency array) bilan, ya'ni faqat komponent
        birinchi render bo'lganda ishga tushadi.
      </p>

      <h3>Kod qanday ishlaydi</h3>
      <p>
        Keling, kodni qismlarga ajratib tushunamiz.
      </p>
      <p>
        <code>supabase.channel("tasks-changes")</code> — websocket "kanal"ini yaratadi.
        Kanal nomi (<code>"tasks-changes"</code>) — shunchaki siz tanlagan yorliq, u faqat shu
        obuna qaysi kanalga tegishli ekanini ajratib turish uchun kerak; bir nechta turli
        obuna bo'lsa, ularga turli nomlar berish tavsiya etiladi.
      </p>
      <p>
        <code>.on("postgres_changes", {`{ event: "*", schema: "public", table: "tasks" }`}, ...)</code>{' '}
        — shu kanalga qaysi hodisalarni tinglashni belgilaydi:
      </p>
      <ul>
        <li>
          <code>event: "*"</code> — barcha uchala turdagi hodisani tinglaymiz (
          <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>). Xohlasangiz, faqat
          bittasini, masalan <code>"INSERT"</code>ni tinglash uchun aniq shu qiymatni yozish ham
          mumkin.
        </li>
        <li>
          <code>schema: "public"</code> — jadval qaysi Postgres sxemasida ekanini ko'rsatadi;
          Supabase'da odatiy jadvallar <code>public</code> sxemasida joylashadi.
        </li>
        <li>
          <code>table: "tasks"</code> — faqat aynan shu jadvaldagi o'zgarishlarni tinglaymiz.
        </li>
      </ul>
      <p>
        Har bir hodisa yuz berganda callback funksiyaga <code>payload</code> obyekti keladi,
        unda <code>payload.eventType</code> ("INSERT", "UPDATE" yoki "DELETE"), o'zgargan qator
        haqidagi <code>payload.new</code> (yangi qiymat) va <code>payload.old</code> (eski
        qiymat, faqat <code>UPDATE</code>/<code>DELETE</code>da to'liq bo'ladi) mavjud bo'ladi.
      </p>
      <p>Endi uchta shart bo'yicha state qanday yangilanishini ko'ramiz:</p>
      <ul>
        <li>
          <strong>INSERT</strong> —{' '}
          <code>{`setTasks((prev) => [payload.new, ...prev])`}</code>. Yangi qo'shilgan qator (
          <code>payload.new</code>) mavjud ro'yxat boshiga qo'shiladi — xuddi{' '}
          <code>TaskForm</code>dagi <code>handleTaskAdded</code> qanday ishlagan bo'lsa, shunga
          o'xshash mantiq, faqat bu safar o'zgarish qayerdan kelganidan (siz o'zingiz qo'shdingizmi,
          boshqa oyna orqalimi) qat'i nazar ishlaydi.
        </li>
        <li>
          <strong>UPDATE</strong> —{' '}
          <code>setTasks((prev) =&gt; prev.map((t) =&gt; (t.id === payload.new.id ? payload.new : t)))</code>.
          Ro'yxat bo'ylab yurib, <code>id</code>si mos keladigan vazifani <code>payload.new</code>{' '}
          bilan almashtiradi, qolganlarini o'zgarishsiz qoldiradi.
        </li>
        <li>
          <strong>DELETE</strong> —{' '}
          <code>setTasks((prev) =&gt; prev.filter((t) =&gt; t.id !== payload.old.id))</code>.
          Bu yerda <code>payload.new</code> emas, <code>payload.old</code> ishlatiladi, chunki
          o'chirilgan qator endi mavjud emas — Postgres bizga faqat uning{' '}
          <em>eski</em> holatini, ya'ni o'chirilishidan oldingi qiymatini yuboradi va biz undan
          faqat <code>id</code>ni olib, o'sha vazifani ro'yxatdan filtrlaymiz.
        </li>
      </ul>

      <Callout type="tip" title="handleToggle va handleDelete endi ortiqcha emasmi?">
        Yo'q — ular hali ham kerak. <code>handleToggle</code> va <code>handleDelete</code>{' '}
        funksiyalari Supabase'ga <code>update</code>/<code>delete</code> so'rovini{' '}
        <strong>yuboradi</strong>; Realtime obunasi esa shu so'rov natijasida bazada yuz bergan
        o'zgarishni <strong>qaytarib qabul qiladi</strong> va state'ni yangilaydi. Amalda bu
        degani: <code>handleToggle</code> ichidagi <code>setTasks</code> chaqiruvi va Realtime
        obunasidagi <code>UPDATE</code> shoxobchasi bir xil o'zgarishni ikki marta qo'llashi
        mumkin — bu xavfsiz, chunki ikkalasi ham bir xil yakuniy qiymatga olib keladi. Katta
        loyihalarda ba'zan shu takrorni oldini olish uchun mahalliy (optimistic) yangilashni olib
        tashlab, faqat Realtime'ga tayanish ham amaliyot — lekin bu loyihada ikkalasini birga
        qoldirish sodda va tushunarli.
      </Callout>

      <h3>Nega tozalash (cleanup) muhim?</h3>
      <p>
        <code>useEffect</code>dan qaytarilayotgan funksiya —{' '}
        <code>{`() => { supabase.removeChannel(channel) }`}</code> — komponent ekrandan
        olib tashlanganda (unmount) ishga tushadi. Buni o'tkazib yuborish quyidagi muammolarga
        olib keladi:
      </p>
      <ul>
        <li>
          Har safar komponent qayta yaratilganda (masalan, sahifada navigatsiya bo'lganda) yangi
          websocket kanal ochiladi, lekin eskisi yopilmaydi — natijada vaqt o'tishi bilan bir
          nechta "ortiqcha" ulanish yig'ilib qoladi.
        </li>
        <li>
          Har bir ortiqcha ulanish <code>setTasks</code>ni chaqirishda davom etadi, hatto
          komponent endi ekranda bo'lmasa ham — bu xotira sizib chiqishi (memory leak) va React
          konsolida "state update on an unmounted component" ogohlantirishiga olib kelishi
          mumkin.
        </li>
      </ul>
      <p>
        <code>supabase.removeChannel(channel)</code> aynan shu kanalni yopadi va uning barcha
        tinglovchilarini (listeners) olib tashlaydi — shu bilan har bir komponent hayoti davomida
        faqat bitta faol obuna bo'lishini kafolatlaydi.
      </p>

      <Quiz
        question="tasks jadvalidan bir vazifa o'chirilganda (DELETE), Realtime callback'da payload obyektining qaysi qismidan foydalanish kerak?"
        options={[
          "payload.new, chunki u har doim eng so'nggi holatni bildiradi",
          "payload.old, chunki o'chirilgan qator endi mavjud emas va Postgres uning faqat eski holatini yuboradi",
          "payload.eventType, chunki u qatorning to'liq ma'lumotini o'z ichiga oladi",
          "Hech qaysi biri kerak emas — DELETE hodisasida payload bo'sh keladi",
        ]}
        correctIndex={1}
        explanation="INSERT va UPDATE'da payload.new ishlatiladi, lekin DELETE'da qator o'chirilgani uchun 'yangi' holat yo'q — Postgres faqat o'chirilishidan oldingi holatni payload.old orqali yuboradi, undan id olinib, ro'yxatdan filtrlanadi."
      />

      <Exercise title="Mashq: konsolga log qo'shish">
        <p>
          Realtime obunasi ichidagi callback funksiyasini shunday o'zgartiring: har bir
          hodisa kelganda, <code>setTasks</code>ni chaqirishdan oldin{' '}
          <code>console.log</code> orqali hodisa turini va qatorning <code>id</code>sini konsolga
          chiqaring (masalan: <code>"INSERT: 42"</code>). Bu — Realtime hodisalari qachon va
          qanday kelayotganini kuzatish uchun foydali debugging usuli.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`useEffect(() => {
  const channel = supabase
    .channel('tasks-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
      const changedId =
        payload.eventType === 'DELETE' ? payload.old.id : payload.new.id
      console.log(\`\${payload.eventType}: \${changedId}\`)

      if (payload.eventType === 'INSERT') {
        setTasks((prev) => [payload.new, ...prev])
      } else if (payload.eventType === 'UPDATE') {
        setTasks((prev) => prev.map((t) => (t.id === payload.new.id ? payload.new : t)))
      } else if (payload.eventType === 'DELETE') {
        setTasks((prev) => prev.filter((t) => t.id !== payload.old.id))
      }
    })
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [])`}</CodeBlock>
          <p>
            Diqqat qiling: <code>DELETE</code> hodisasida <code>payload.new</code> mavjud
            emasligi sababli, <code>id</code>ni olishdan oldin hodisa turini tekshirib, kerakli
            obyektni (<code>payload.old</code> yoki <code>payload.new</code>) tanlab olish kerak.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Realtime jadval darajasida ishlaydi va uni Database → Replication orqali (yoki{' '}
          <code>alter publication supabase_realtime add table tasks;</code> SQL buyrug'i bilan)
          har bir jadval uchun alohida yoqish kerak.
        </li>
        <li>
          <code>supabase.channel(...).on("postgres_changes", {`{...}`}, callback).subscribe()</code>{' '}
          — jadvaldagi <code>INSERT</code>/<code>UPDATE</code>/<code>DELETE</code> hodisalariga
          obuna bo'lishning umumiy shakli.
        </li>
        <li>
          <code>INSERT</code> va <code>UPDATE</code> uchun <code>payload.new</code>, <code>DELETE</code>{' '}
          uchun <code>payload.old</code> ishlatiladi — chunki o'chirilgan qatorning "yangi"
          holati yo'q.
        </li>
        <li>
          Realtime hodisalari ham RLS policy'laridan o'tadi — foydalanuvchi ko'ra olmaydigan
          qatorning o'zgarishi haqida ham xabar olmaydi.
        </li>
        <li>
          <code>useEffect</code>dan <code>supabase.removeChannel(channel)</code>ni qaytarish
          shart — aks holda komponent qayta yaratilganda eski kanallar yopilmay qoladi va xotira
          sizib chiqishiga olib keladi.
        </li>
      </KeyPoints>
    </>
  )
}
