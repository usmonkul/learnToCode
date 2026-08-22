import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Vazifaga fayl biriktirish",
  section: "6-bo'lim: Fayllarni saqlash",
}

export default function Lesson21FaylYuklash() {
  return (
    <>
      <p>
        Oldingi darsda <code>task-files</code> bucket'ini yaratdik — endi uni haqiqiy ishga
        soladigan vaqt keldi. Bu darsda vazifa qo'shish formasiga fayl tanlash maydonini
        qo'shamiz, faylni Storage'ga yuklaymiz va yuklangan faylning manzilini{' '}
        <code>tasks</code> jadvaliga yozamiz.
      </p>

      <h2><code>file_path</code> ustunini qo'shish</h2>
      <p>
        Avval jadvalga yangi ustun kerak — u yuklangan faylning Storage ichidagi yo'lini
        (masalan, <code>"a1b2c3-shartnoma.pdf"</code> kabi qiymatni) saqlaydi. E'tibor bering:
        faylning o'zi bu ustunda saqlanmaydi, faqat uning manzili — faylning o'zi{' '}
        <code>task-files</code> bucket'ida yotadi. SQL Editor'ga o'ting va quyidagi buyruqni
        ishga tushiring:
      </p>
      <CodeBlock lang="sql">{`alter table tasks add column file_path text;`}</CodeBlock>
      <p>
        Ustunni ataylab <code>nullable</code> (bo'sh bo'lishi mumkin) qilib qoldiramiz, chunki
        har bir vazifaga fayl biriktirish shart emas — ko'p vazifalar faqat matndan iborat
        bo'lib qolaveradi.
      </p>

      <Callout type="note" title="Nega file_path, file_url emas?">
        Ustunga faylning to'liq URL manzilini emas, faqat uning bucket ichidagi yo'lini
        saqlaymiz. Sababi: agar keyinchalik bucket'ni public'dan private'ga o'zgartirsangiz yoki
        Storage domenini almashtirsangiz, to'liq URL'lar eskirib qoladi. Yo'lni saqlab,
        ko'rsatish kerak bo'lganda <code>getPublicUrl()</code> (yoki private bucket uchun{' '}
        <code>createSignedUrl()</code>) chaqirib, haqiqiy URL'ni har safar yangidan hosil
        qilish — ancha moslashuvchan yondashuv.
      </Callout>

      <h2>Fayl tanlash maydonini qo'shish</h2>
      <p>
        Endi <code>TaskForm.jsx</code> komponentiga o'tamiz. Unga ikkita narsa qo'shamiz: tanlangan
        faylni saqlab turadigan state va HTML'ning <code>{'<input type="file">'}</code> elementi.
        Fayl tanlanganda brauzer bizga <code>File</code> obyektini beradi — uni{' '}
        <code>onChange</code> orqali ushlab qolamiz:
      </p>
      <CodeBlock lang="jsx">{`import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)

  // ... handleSubmit keyingi qismda

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Yangi vazifa..."
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
          Qo'shish
        </button>
      </div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    </form>
  )
}`}</CodeBlock>
      <p>
        <code>e.target.files</code> — brauzer tomonidan taqdim etiladigan{' '}
        <code>FileList</code> obyekti (foydalanuvchi bir nechta fayl tanlashi mumkin bo'lgan
        holatlar uchun massivga o'xshash tuzilma). Bizga bittagina fayl kifoya, shuning uchun{' '}
        <code>files[0]</code>ni olamiz. Fayl tanlanmagan bo'lsa, <code>file</code> state'i{' '}
        <code>null</code> bo'lib qoladi — buni keyingi qadamda tekshiramiz.
      </p>

      <h2>Yuklash-va-keyin-qo&apos;shish (upload-then-insert) oqimi</h2>
      <p>
        Endi eng muhim qism — <code>handleSubmit</code> funksiyasi. Mantiq shunday: agar
        foydalanuvchi fayl tanlagan bo'lsa, avval uni Storage'ga yuklaymiz, so'ng qaytgan yo'lni{' '}
        <code>tasks</code> jadvaliga insert qilamiz. Ikkala amal ham tarmoq orqali ketadigan
        asinxron so'rovlar, shuning uchun ularni ketma-ket <code>await</code> bilan bajaramiz —
        avval yuklash tugaydi, keyingina insert boshlanadi.
      </p>
      <CodeBlock lang="jsx">{`async function handleSubmit(e) {
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
}`}</CodeBlock>
      <p>
        Bir necha muhim detalga e'tibor bering:
      </p>
      <ul>
        <li>
          <code>crypto.randomUUID()</code> — brauzerda o'rnatilgan (hech qanday kutubxona
          o'rnatish shart emas), tasodifiy, deyarli takrorlanmaydigan identifikator generatsiya
          qiladigan funksiya. Uni fayl nomiga qo'shib qo'yamiz, chunki agar ikkita foydalanuvchi
          bir xil nomli fayl (masalan, <code>rasm.png</code>) yuklasa, ular Storage'da bir-birini
          ustidan yozib yubormasligi kerak. <code>randomUUID()</code> shunga o'xshash{' '}
          <code>{'"a1b2c3d4-...-rasm.png"'}</code> ko'rinishidagi noyob yo'l hosil qiladi.
        </li>
        <li>
          <code>supabase.storage.from('task-files').upload(path, file)</code> — bu Storage
          API'sining o'zi, <code>.from()</code> jadval so'rovlaridagidek emas, bucket nomini
          bildiradi. <code>upload()</code> ham xuddi jadval so'rovlari kabi{' '}
          <code>{'{ data, error }'}</code> qaytaradi.
        </li>
        <li>
          Yuklash xato bilan tugasa (<code>uploadError</code>), funksiyadan{' '}
          <code>return</code> bilan chiqamiz — yarim ishlagan holatda (fayl yuklanmagan, lekin
          vazifa yaratilgan) qolmaslik uchun insert bosqichiga umuman o'tmaymiz.
        </li>
        <li>
          Agar fayl umuman tanlanmagan bo'lsa, <code>filePath</code> — <code>null</code> bo'lib
          qoladi va u shunday holda <code>tasks</code> jadvaliga yoziladi — bu{' '}
          <code>file_path</code> ustunini <code>nullable</code> qilib belgilaganimiz uchun
          muammosiz ishlaydi.
        </li>
      </ul>

      <Callout type="warning" title="Bu yerda hali fayl turi va hajmi tekshirilmaydi">
        Hozirgi kod istalgan hajmdagi va turdagi faylni qabul qiladi — bu o'quv maqsadida
        soddalik uchun qoldirilgan. Real loyihada fayl hajmini (masalan, 5 MB dan katta bo'lmasin)
        va turini (masalan, faqat rasm yoki PDF) frontendda ham, Storage bucket sozlamalarida ham
        cheklash tavsiya etiladi — buni pastdagi mashqda amalga oshirib ko'rasiz.
      </Callout>

      <Quiz
        question="Nega handleSubmit ichida avval fayl Storage'ga yuklanadi, keyingina tasks jadvaliga insert qilinadi (aksincha emas)?"
        options={[
          "Chunki Supabase insert operatsiyasi fayl bilan bir vaqtda ishlay olmaydi",
          "Chunki file_path ustuniga yozadigan qiymat (fayl yo'li) faqat yuklash muvaffaqiyatli tugagandan keyin ma'lum bo'ladi",
          "Chunki upload() metodi insert()dan tezroq ishlaydi va vaqtni tejash uchun",
          "Farqi yo'q, ikkalasini istalgan tartibda chaqirish mumkin"
        ]}
        correctIndex={1}
        explanation="filePath qiymati faqat upload() muvaffaqiyatli tugagandan keyin aniq bo'ladi (biz uni o'zimiz path o'zgaruvchisidan olamiz, lekin fayl haqiqatan Storage'ga tushganini yuklash tasdiqlashi kerak). Shuning uchun avval yuklaymiz, xatolikni tekshiramiz, va faqat shundan keyin insert bosqichiga o'tamiz."
      />

      <Exercise title="Mashq: Fayl hajmini cheklash">
        <p>
          Hozirgi <code>handleSubmit</code> istalgan hajmdagi faylni qabul qiladi. Kodni
          o'zgartirib, agar tanlangan fayl <strong>2 MB</strong>dan katta bo'lsa, yuklashni
          boshlamasdan turib <code>alert()</code> orqali xabar bering va funksiyadan chiqing.
          Eslatma: <code>file.size</code> baytlarda beriladi, shuning uchun 2 MB —{' '}
          <code>2 * 1024 * 1024</code> bayt.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`async function handleSubmit(e) {
  e.preventDefault()
  if (!title.trim()) return

  const MAX_SIZE = 2 * 1024 * 1024 // 2 MB

  if (file && file.size > MAX_SIZE) {
    alert("Fayl hajmi 2 MB dan oshmasligi kerak")
    return
  }

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
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>tasks</code> jadvaliga <code>file_path text</code> ustuni qo'shildi — u faylning
          o'zini emas, uning Storage ichidagi yo'lini saqlaydi.
        </li>
        <li>
          <code>{'<input type="file" onChange={(e) => setFile(e.target.files[0])} />'}</code>{' '}
          orqali foydalanuvchi tanlagan <code>File</code> obyekti state'ga saqlanadi.
        </li>
        <li>
          Yuklash oqimi ikki bosqichli: avval <code>supabase.storage.from('task-files').upload()</code>{' '}
          bilan fayl Storage'ga yuklanadi, so'ng qaytgan yo'l <code>tasks</code> jadvaliga insert
          qilinadi.
        </li>
        <li>
          <code>crypto.randomUUID()</code> yordamida har bir fayl uchun noyob yo'l hosil
          qilinadi — bu ikki xil foydalanuvchining bir xil nomli fayllari bir-birini bosib
          yozib yuborishining oldini oladi.
        </li>
        <li>
          Yuklash xato bilan tugasa, funksiya darhol to'xtaydi — yarim bajarilgan (fayl
          yuklanmagan, vazifa esa yaratilgan) holatga yo'l qo'yilmaydi.
        </li>
      </KeyPoints>
    </>
  )
}
