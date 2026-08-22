import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "SQL Editor bilan ishlash",
  section: "2-bo'lim: Ma'lumotlar bazasi va jadvallar",
}

export default function Lesson06SqlEditor() {
  return (
    <>
      <p>
        Oldingi ikki darsda <code>tasks</code> jadvalini Table Editor'ning grafik interfeysi
        orqali yaratdik va uning ustun turlarini chuqur o'rgandik. Lekin Table Editor —
        Supabase'ning faqat bitta "ko'rinishi" (view). Boshqa yo'l — to'g'ridan-to'g'ri{' '}
        <strong>SQL</strong> yozib, xuddi shu natijaga erishish. Bu darsda <code>tasks</code>{' '}
        jadvalining aynan o'zini SQL orqali qanday yaratish mumkinligini ko'ramiz.
      </p>

      <h2>Nega SQL'ni ham bilish kerak?</h2>
      <p>
        Table Editor boshlang'ich bosqichda juda qulay, lekin haqiqiy loyihalarda SQL'ni bilish
        muhim sabablarga ega:
      </p>
      <ul>
        <li>
          Murakkab o'zgarishlarni (masalan, bir nechta ustun qo'shish, cheklov o'zgartirish)
          bir marta SQL sifatida yozib, uni jamoadoshlaringiz bilan ulashish yoki keyinroq
          qayta ishlatish mumkin.
        </li>
        <li>
          RLS siyosatlari (policies), funksiyalar va trigger'lar kabi ilg'or imkoniyatlar
          faqat SQL orqali yoziladi — bu haqda keyingi bo'limlarda gaplashamiz.
        </li>
        <li>
          SQL Editor'da yozilgan buyruqni saqlab qo'yish (Save) va keyin qayta ishga tushirish
          mumkin — bu jarayonni hujjatlashtirish (documentation) vazifasini ham bajaradi.
        </li>
      </ul>

      <Callout type="note" title="Table Editor va SQL Editor — bitta ma'lumotlar bazasi">
        Bu ikkalasi alohida ma'lumotlar bazalari emas — ular bitta Postgres ma'lumotlar
        bazasiga ikki xil "kirish eshigi". Table Editor'da yaratgan jadvalingiz SQL Editor'da{' '}
        <code>select * from tasks;</code> deb so'rov yuborsangiz ham darhol ko'rinadi, va
        aksincha — SQL orqali yaratilgan jadval Table Editor'da grafik jadval sifatida
        darhol paydo bo'ladi.
      </Callout>

      <h2>SQL Editor'ga o'tish</h2>
      <p>
        Chap tomondagi navigatsiyada <strong>SQL Editor</strong> bo'limini tanlang. Bu yerda
        bo'sh matn maydoni (editor) va uning ostida <strong>Run</strong> tugmasi bor. Siz bu
        yerga istalgan SQL buyrug'ini yozib, <strong>Run</strong> tugmasini (yoki{' '}
        <code>Ctrl+Enter</code> / <code>Cmd+Enter</code> tugmalar birikmasini) bosib ishga
        tushira olasiz.
      </p>

      <h2>CREATE TABLE sintaksisi</h2>
      <p>
        <code>tasks</code> jadvalini SQL orqali yaratish uchun quyidagi buyruqni
        ishlatamiz — bu Table Editor orqali qo'lda yaratgan jadvalimizning aynan SQL
        ekvivalenti:
      </p>
      <CodeBlock lang="sql">{`create table tasks (
  id bigint generated always as identity primary key,
  title text not null,
  is_done boolean not null default false,
  created_at timestamptz not null default now()
);`}</CodeBlock>
      <p>Buyruqni qatordan-qatorga tahlil qilamiz:</p>
      <ul>
        <li>
          <code>create table tasks (...)</code> — <code>tasks</code> nomli yangi jadval
          yaratishni buyuradi, qavs ichida esa ustunlar ro'yxati keladi.
        </li>
        <li>
          <code>id bigint generated always as identity primary key</code> — Table Editor'da
          "avtomatik" deb ko'rgan <code>id</code> ustunimizning aynan o'zi:{' '}
          <code>bigint</code> (katta butun son, Table Editor'dagi <code>int8</code> bilan bir
          xil), <code>generated always as identity</code> qiymatni Postgres o'zi
          hisoblashini bildiradi, <code>primary key</code> esa uni bir ma'noli
          identifikator qiladi.
        </li>
        <li>
          <code>title text not null</code> — matn ustuni, bo'sh bo'lishi mumkin emas.
        </li>
        <li>
          <code>is_done boolean not null default false</code> — ha/yo'q ustuni, majburiy,
          standart qiymati <code>false</code>.
        </li>
        <li>
          <code>created_at timestamptz not null default now()</code> — vaqt zonasi bilan
          sana/vaqt, majburiy, standart qiymati joriy vaqt.
        </li>
      </ul>

      <Callout type="warning" title="Bitta loyihada jadval nomi faqat bitta marta band qilinadi">
        Agar avvalgi darsda Table Editor orqali <code>tasks</code> jadvalini allaqachon
        yaratgan bo'lsangiz, yuqoridagi <code>create table</code> buyrug'ini shu holicha ishga
        tushirsangiz, Postgres <code>relation "tasks" already exists</code> xatosini
        qaytaradi — bu normal, chunki bir xil nomli jadval ikki marta yaratilmaydi. Bu SQL
        buyrug'i shunchaki Table Editor orqali qilingan ishning{' '}
        <strong>ekvivalentini ko'rsatish</strong> uchun keltirilgan; loyihangizda{' '}
        <code>tasks</code> jadvali allaqachon bor, uni qayta yaratishning hojati yo'q.
      </Callout>

      <h2>Natijalar paneli</h2>
      <p>
        <strong>Run</strong> tugmasini bosgach, muvaffaqiyatli bajarilgan buyruq uchun editor
        ostida "Success. No rows returned" kabi xabar chiqadi — <code>create table</code>{' '}
        buyrug'i hech qanday qator qaytarmaydi, u faqat jadval tuzilmasini yaratadi. Agar
        buyruqda xatolik bo'lsa (masalan, sintaksis xatosi yoki jadval allaqachon mavjud
        bo'lsa), qizil rangda aniq xato matni ko'rsatiladi — qaysi qatorda va nima sababdan
        xato borligini aytadi.
      </p>
      <p>
        Natijani tekshirish uchun Table Editor'ga qaytib, <code>tasks</code> jadvalining
        ustunlari darsda ko'rsatilgan tuzilmaga mos kelishini ko'rishingiz mumkin.
      </p>

      <Quiz
        question={`CREATE TABLE buyrug'ida "generated always as identity" nimani anglatadi?`}
        options={[
          "Ustun hech qachon o'zgartirilmasligi kerakligini",
          "Ustun qiymatini Postgres avtomatik, ketma-ket hisoblab qo'yishini",
          "Ustunda faqat matn saqlash mumkinligini",
          "Ustun jadvaldan avtomatik o'chirilishini",
        ]}
        correctIndex={1}
        explanation="'generated always as identity' Postgres'ga ushbu ustun qiymatini o'zi, ketma-ket sonlar bilan (1, 2, 3...) avtomatik to'ldirishini buyuradi — bu id ustunlarida keng ishlatiladigan yondashuv."
      />

      <Exercise title="Amaliy mashq: SQL bilan sinab ko'ring">
        <p>
          SQL Editor'da yangi so'rov oching (agar <code>tasks</code> jadvalingiz allaqachon
          mavjud bo'lsa, bu jadvalni o'zgartirmang — faqat quyidagi so'rovni yozib
          mashq qiling, ishga tushirish shart emas). Darsdagi <code>tasks</code> jadvaliga
          o'xshash, lekin <code>notes</code> nomli, faqat ikkita ustunli yangi jadval yarating:
        </p>
        <ol>
          <li>
            <code>id</code> — <code>bigint</code>, <code>generated always as identity</code>,{' '}
            <code>primary key</code>.
          </li>
          <li>
            <code>content</code> — <code>text</code>, <code>not null</code>.
          </li>
        </ol>
        <Solution>
          <CodeBlock lang="sql">{`create table notes (
  id bigint generated always as identity primary key,
  content text not null
);`}</CodeBlock>
          <p>
            Bu buyruq <code>notes</code> nomli, ikkita ustunli yangi jadval yaratadi. Agar uni
            haqiqatan ham ishga tushirsangiz, keyinroq{' '}
            <code>drop table notes;</code> buyrug'i bilan o'chirib tashlashingiz mumkin —
            bu jadval faqat mashq uchun, "Vazifalar boshqaruvchisi" loyihasining bir qismi
            emas.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          SQL Editor — Table Editor'ning muqobili, xuddi shu Postgres ma'lumotlar bazasiga
          to'g'ridan-to'g'ri SQL buyruqlari orqali kirish imkonini beradi.
        </li>
        <li>
          <code>create table jadval_nomi (ustun1 tur cheklov, ustun2 tur cheklov, ...);</code>{' '}
          — jadval yaratish sintaksisi.
        </li>
        <li>
          Table Editor'da yaratilgan <code>tasks</code> jadvalining SQL ekvivalenti:{' '}
          <code>id bigint generated always as identity primary key</code>,{' '}
          <code>title text not null</code>, <code>is_done boolean not null default false</code>,{' '}
          <code>created_at timestamptz not null default now()</code>.
        </li>
        <li>
          Ikki interfeys ham bitta ma'lumotlar bazasiga ishlaydi — birida qilingan o'zgarish
          ikkinchisida darhol aks etadi.
        </li>
        <li>
          RLS siyosatlari, funksiyalar va trigger'lar kabi ilg'or imkoniyatlar odatda faqat
          SQL Editor orqali yoziladi.
        </li>
      </KeyPoints>
    </>
  )
}
