import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Birinchi jadvalni yaratish",
  section: "2-bo'lim: Ma'lumotlar bazasi va jadvallar",
}

export default function Lesson04BirinchiJadval() {
  return (
    <>
      <p>
        Oldingi bo'limda Dashboard'ning barcha bo'limlari bilan tanishib chiqdik. Endi esa
        "Vazifalar boshqaruvchisi" loyihamizning yuragi — <code>tasks</code> jadvalini —
        yaratishdan boshlaymiz. Har bir vazifa (task) shu jadvalda bitta qator sifatida
        saqlanadi, va biz keyingi bo'limlarda React ilovamizni aynan shu jadval bilan
        gaplashtiramiz.
      </p>

      <h2>Jadval nima va nega kerak?</h2>
      <p>
        Supabase'ning asosida odatiy Postgres ma'lumotlar bazasi yotadi. Postgres — bu{' '}
        <strong>relyatsion ma'lumotlar bazasi</strong>, ya'ni ma'lumotlar jadvallar (tables)
        ko'rinishida, qatorlar (rows) va ustunlar (columns) bilan tashkil etiladi — xuddi Excel
        jadvaliga o'xshab, faqat ancha qat'iy qoidalar bilan. Har bir ustun oldindan aniqlangan{' '}
        <strong>turga (type)</strong> ega bo'lishi kerak: masalan, matn uchun <code>text</code>,
        ha/yo'q uchun <code>boolean</code>. Bu qat'iylik afzallik — ma'lumotlar bazasi noto'g'ri
        formatdagi ma'lumotni saqlashga umuman yo'l qo'ymaydi.
      </p>
      <p>
        Bizga kerak bo'lgan birinchi jadval — <code>tasks</code>. Uning vazifasi oddiy: har bir
        vazifaning sarlavhasini, bajarilgan-bajarilmaganligini va qachon yaratilganini saqlash.
      </p>

      <h2>Table Editor'ga o'tish</h2>
      <p>
        Chap tomondagi navigatsiyada <strong>Table Editor</strong> bo'limini tanlang. Bu yerda
        siz jadval yaratishning ikki yo'lidan birini — grafik interfeys orqali — ko'rasiz
        (ikkinchi yo'l, SQL orqali, keyingi darsda). Yangi loyihada bu yerda faqat Supabase
        o'zining ichki jadvallari (masalan, keyinroq ko'radigan <code>auth</code> sxemasi)
        bo'lishi mumkin, sizning jadvalingiz esa hali yo'q.
      </p>
      <p>
        <strong>New table</strong> tugmasini bosing. Ochilgan oynada quyidagilarni to'ldiring:
      </p>
      <ul>
        <li>
          <strong>Name</strong> — jadval nomi: <code>tasks</code>.
        </li>
        <li>
          <strong>Description</strong> — ixtiyoriy, masalan "Foydalanuvchi vazifalari".
        </li>
      </ul>

      <Callout type="note" title="Nega tasks, ko'plikda?">
        Ma'lumotlar bazasi jadvallarini nomlashda ko'plik sonini ishlatish keng tarqalgan
        konvensiya — jadval ko'plab qatorlarni (ya'ni ko'plab "task"larni) saqlaydi. Shu sababli{' '}
        <code>task</code> emas, <code>tasks</code> deb nomlaymiz, va bu nom butun kurs davomida
        o'zgarmasdan qoladi.
      </Callout>

      <h2>Supabase avtomatik qo'shadigan ustunlar</h2>
      <p>
        Oynani pastga tushirsangiz, Table Editor allaqachon ikkita ustunni siz uchun tayyorlab
        qo'yganini ko'rasiz:
      </p>
      <ul>
        <li>
          <code>id</code> — turi <code>int8</code> (katta butun son), <strong>primary key</strong>{' '}
          sifatida belgilangan va <strong>identity</strong> xususiyatiga ega — ya'ni har bir yangi
          qator qo'shilganda Postgres bu qiymatni avtomatik, o'zi hisoblab, 1, 2, 3... tartibida
          to'ldiradi. Siz hech qachon <code>id</code>ni qo'lda kiritmaysiz.
        </li>
        <li>
          <code>created_at</code> — turi <code>timestamptz</code> (vaqt zonasi bilan sana/vaqt),
          standart qiymati <code>now()</code> — ya'ni qator yaratilgan aniq vaqt avtomatik
          yoziladi.
        </li>
      </ul>
      <p>
        Bu ikkita ustun deyarli har qanday jadvalda kerak bo'ladigan "bo'ylab" (boilerplate)
        ustunlar bo'lgani uchun Supabase ularni har safar avtomatik taklif qiladi. Ularni
        o'chirmang — <code>tasks</code> jadvalimizga aynan shu holida kerak bo'ladi.
      </p>

      <h2>title ustunini qo'shish</h2>
      <p>
        <strong>Add column</strong> tugmasini bosib, yangi ustun qo'shamiz:
      </p>
      <ul>
        <li>
          <strong>Name</strong> — <code>title</code>
        </li>
        <li>
          <strong>Type</strong> — <code>text</code>
        </li>
        <li>
          <strong>Is Nullable</strong> — bu katakchani <strong>o'chirib qo'ying</strong> (uncheck),
          ya'ni <code>title</code> maydoni hech qachon bo'sh bo'lishi mumkin emas.
        </li>
      </ul>
      <p>
        Har bir vazifaning nomi bo'lishi shart — sarlavhasiz vazifa mantiqan noto'g'ri, shuning
        uchun bu ustunni majburiy qilamiz.
      </p>

      <h2>is_done ustunini qo'shish</h2>
      <p>
        Yana bir marta <strong>Add column</strong> tugmasini bosing:
      </p>
      <ul>
        <li>
          <strong>Name</strong> — <code>is_done</code>
        </li>
        <li>
          <strong>Type</strong> — <code>bool</code>
        </li>
        <li>
          <strong>Default Value</strong> — <code>false</code>
        </li>
      </ul>
      <p>
        Yangi qo'shilgan har bir vazifa avtomatik ravishda "bajarilmagan" holatda boshlanishi
        kerak, shuning uchun standart qiymatni <code>false</code> qilib qo'yamiz. Foydalanuvchi
        vazifani bajargach, biz shu qiymatni <code>true</code>ga o'zgartiramiz — buni keyingi
        bo'limlarda ko'ramiz.
      </p>

      <p>
        Barcha ustunlarni to'ldirgach, <strong>Save</strong> tugmasini bosing. Supabase RLS
        (Row Level Security) haqida ogohlantirish oynasini ko'rsatishi mumkin — hozircha uni
        e'tiborsiz qoldirib, jadvalni saqlashda davom eting. RLS haqida to'liq alohida bo'limda
        gaplashamiz.
      </p>

      <Callout type="tip" title="RLS ogohlantirishidan qo'rqmang">
        Yangi jadval yaratganda Supabase "Row Level Security yoqilmagan" degan ogohlantirish
        chiqarishi mumkin. Bu — xavfsizlik bo'yicha foydali eslatma, xato emas. Loyihani
        o'rganish bosqichida bu jadvalni ochiq holda qoldiramiz, keyinroq maxsus bo'limda RLS
        siyosatlarini (policies) qo'shib, jadvalni himoyalaymiz.
      </Callout>

      <h2>Natijani tekshirish</h2>
      <p>
        Saqlangach, Table Editor'da <code>tasks</code> jadvali paydo bo'ladi va uning ustunlari
        quyidagicha ko'rinadi:
      </p>
      <CodeBlock lang="sql">{`id          int8       (primary key, identity)
title       text       (not null)
is_done     bool       (default: false)
created_at  timestamptz (default: now())`}</CodeBlock>
      <p>
        Jadval hozircha bo'sh — hech qanday qator yo'q. Bu — normal holat. Ustunlar tuzilmasi
        (schema) va qatorlar (ma'lumotlar) — ikki xil narsa; biz hozir faqat tuzilmani
        yaratdik. Qatorlarni qo'lda qo'shishni bir necha dars keyin ko'ramiz.
      </p>

      <Quiz
        question="Yangi tasks jadvali yaratilganda Supabase Table Editor qaysi ikkita ustunni avtomatik taklif qiladi?"
        options={[
          "title va is_done",
          "id va created_at",
          "email va password",
          "is_done va created_at",
        ]}
        correctIndex={1}
        explanation="Table Editor har doim id (primary key, identity) va created_at (timestamptz, default now()) ustunlarini avtomatik qo'shib qo'yadi, chunki bu ikkalasi deyarli har qanday jadvalda kerak bo'ladi."
      />

      <Exercise title="Amaliy mashq: tasks jadvalini yarating">
        <p>
          Supabase Dashboard'ingizda Table Editor'ga o'ting va darsda ko'rsatilgan qadamlarni
          bajarib, <code>tasks</code> nomli jadval yarating. Quyidagi ustunlar bo'lishi kerak:
        </p>
        <ol>
          <li>
            <code>id</code> va <code>created_at</code> — Supabase avtomatik qo'shadi, tegmang.
          </li>
          <li>
            <code>title</code> — turi <code>text</code>, <strong>Is Nullable</strong> o'chirilgan.
          </li>
          <li>
            <code>is_done</code> — turi <code>bool</code>, standart qiymati <code>false</code>.
          </li>
        </ol>
        <Solution>
          <p>
            To'g'ri bajarilgan bo'lsa, Table Editor'dagi <code>tasks</code> jadvali quyidagi
            to'rtta ustunni ko'rsatishi kerak:
          </p>
          <CodeBlock lang="sql">{`id          int8        (primary key, identity)
title       text        (not null)
is_done     bool        (default: false)
created_at  timestamptz (default: now())`}</CodeBlock>
          <p>
            Agar biror ustun turi yoki cheklovi (masalan, <code>Is Nullable</code>) noto'g'ri
            bo'lib qolgan bo'lsa, ustun nomiga bosib, <strong>Edit column</strong> orqali
            tuzatishingiz mumkin — jadval yaratilgandan keyin ham ustun sozlamalarini
            o'zgartirish mumkin.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Postgres — relyatsion ma'lumotlar bazasi: ma'lumotlar jadvallarda, qatorlar va
          ustunlar ko'rinishida saqlanadi, har bir ustun qat'iy turga ega.
        </li>
        <li>
          Table Editor orqali yangi jadval yaratganda Supabase <code>id</code> (primary key,
          identity) va <code>created_at</code> (timestamptz, default <code>now()</code>)
          ustunlarini avtomatik qo'shadi.
        </li>
        <li>
          <code>tasks</code> jadvaliga <code>title</code> (text, not null) va{' '}
          <code>is_done</code> (bool, default false) ustunlarini qo'lda qo'shdik.
        </li>
        <li>
          Jadval tuzilmasi (schema) va undagi ma'lumotlar (rows) — ikki alohida narsa; jadval
          yaratilgach hali qatorlar bo'lmasligi mumkin.
        </li>
        <li>
          RLS haqidagi ogohlantirish hozircha e'tiborsiz qoldiriladi — bu keyingi bo'limda
          batafsil o'rganiladi.
        </li>
      </KeyPoints>
    </>
  )
}
