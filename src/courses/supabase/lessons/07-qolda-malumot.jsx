import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Ma'lumotlarni qo'lda qo'shish va tahrirlash",
  section: "2-bo'lim: Ma'lumotlar bazasi va jadvallar",
}

export default function Lesson07QoldaMalumot() {
  return (
    <>
      <p>
        Hozirgacha faqat <code>tasks</code> jadvalining <strong>tuzilmasini</strong> (schema)
        qurdik — ustunlar, turlar, cheklovlar. Lekin jadval hali bo'sh, ichida bironta ham
        vazifa yo'q. Bu darsda hali bironta ham kod yozmasdan, faqat Table Editor'ning grafik
        interfeysi orqali qatorlar qo'shishni, tahrirlashni va o'chirishni o'rganamiz — bu esa
        keyingi bo'limda React kodi qanday ishlashini tushunish uchun mustahkam poydevor
        bo'ladi.
      </p>

      <h2>CRUD — to'rtta asosiy amal</h2>
      <p>
        Deyarli har qanday ma'lumotlar bilan ishlaydigan ilova to'rtta asosiy amalni bajaradi.
        Bu to'rtta amal ingliz tilidagi birinchi harflaridan <strong>CRUD</strong> deb
        qisqartiriladi:
      </p>
      <ul>
        <li>
          <strong>Create</strong> — yangi qator qo'shish (masalan, yangi vazifa yaratish).
        </li>
        <li>
          <strong>Read</strong> — mavjud qatorlarni o'qish/ko'rish.
        </li>
        <li>
          <strong>Update</strong> — mavjud qatorni yangilash (masalan, vazifani "bajarildi"
          deb belgilash).
        </li>
        <li>
          <strong>Delete</strong> — qatorni o'chirish.
        </li>
      </ul>
      <p>
        "Vazifalar boshqaruvchisi" loyihamiz aynan shu to'rtta amal atrofida quriladi. Keyingi
        bo'limda React kodi ichida bu amallarni <code>supabase-js</code> kutubxonasi orqali
        bajarishni o'rganamiz, lekin avval ularning har birini Table Editor'da qo'lda,
        vizual tarzda his qilib ko'raylik.
      </p>

      <h2>Create: yangi qator qo'shish</h2>
      <p>
        Table Editor'da <code>tasks</code> jadvalini oching. Jadval ustidagi{' '}
        <strong>Insert</strong> tugmasini bosib, <strong>Insert row</strong>ni tanlang.
        Ochilgan formada:
      </p>
      <ul>
        <li>
          <code>id</code> — bo'sh qoldiring, u avtomatik hisoblanadi (identity, eslaysizmi?).
        </li>
        <li>
          <code>title</code> — masalan, <code>Sut sotib olish</code> deb yozing.
        </li>
        <li>
          <code>is_done</code> — standart holatda <code>false</code> bo'lib turadi, o'zgartirish
          shart emas.
        </li>
        <li>
          <code>created_at</code> — bo'sh qoldiring, u ham avtomatik to'ldiriladi (
          <code>now()</code>).
        </li>
      </ul>
      <p>
        <strong>Save</strong>ni bosing — jadvalda birinchi qatoringiz paydo bo'ladi. Xuddi shu
        tartibda yana ikkita vazifa qo'shing, masalan <code>Uy vazifasini bajarish</code> va{' '}
        <code>Sport zalga borish</code>.
      </p>

      <Callout type="tip" title="Table Editor sahnasi ortida nima sodir bo'ladi?">
        Har safar <strong>Insert row</strong> orqali qator qo'shganingizda, Supabase sahna
        ortida aynan shu turdagi SQL buyrug'ini bajaradi:
        <CodeBlock lang="sql">{`insert into tasks (title) values ('Sut sotib olish');`}</CodeBlock>
        <code>id</code> va <code>created_at</code> ustunlari <code>insert</code> buyrug'ida
        ko'rsatilmayapti — chunki ular avtomatik (identity va default <code>now()</code>)
        to'ldiriladi. Keyingi bo'limda React kodidagi <code>supabase.from(&apos;tasks&apos;).insert(...)</code>{' '}
        chaqiruvi ham aynan shu SQL'ni bajaradi — faqat buni endi tugma bosish o'rniga
        JavaScript orqali qilamiz.
      </Callout>

      <h2>Read: qatorlarni ko'rish</h2>
      <p>
        Bu — eng oddiy amal: Table Editor'da <code>tasks</code> jadvalini ochganingizning
        o'zi allaqachon "Read" amali. Jadvalda hozir uchta qator ko'rinishi kerak, har birida{' '}
        <code>id</code>, <code>title</code>, <code>is_done</code> va <code>created_at</code>{' '}
        qiymatlari bilan. <code>created_at</code> ustunidagi vaqtlarga qarab, qatorlar qaysi
        tartibda qo'shilganini ham bilib olishingiz mumkin.
      </p>

      <h2>Update: qatorni yangilash</h2>
      <p>
        Endi "Sut sotib olish" vazifasini bajarilgan deb belgilaymiz. Bu qatorning{' '}
        <code>is_done</code> katagiga bosing — bu katakcha (checkbox) ko'rinishida bo'ladi.
        Uni belgilang (true qilib), o'zgarish avtomatik saqlanadi. Xohlasangiz,{' '}
        <code>title</code> katagiga ikki marta bosib, matnni ham tahrirlab ko'rishingiz
        mumkin — masalan <code>Sut sotib olish</code>ni <code>Sut va non sotib olish</code>{' '}
        deb o'zgartiring.
      </p>
      <p>Bu amal sahna ortida quyidagi SQL bilan bir xil natijani beradi:</p>
      <CodeBlock lang="sql">{`update tasks set is_done = true where id = 1;`}</CodeBlock>

      <h2>Delete: qatorni o'chirish</h2>
      <p>
        "Sport zalga borish" qatorini o'chirib ko'raylik. Qator chap tomonidagi katakchani
        (checkbox) belgilang, so'ng paydo bo'lgan <strong>Delete</strong> tugmasini bosing va
        tasdiqlang. Bu amal quyidagi SQL bilan teng:
      </p>
      <CodeBlock lang="sql">{`delete from tasks where id = 3;`}</CodeBlock>

      <Callout type="warning" title="O'chirishni ehtiyotkorlik bilan bajaring">
        Table Editor'da qatorni o'chirish — qaytarib bo'lmaydigan amal (agar maxsus zaxira
        nusxa olinmagan bo'lsa). Haqiqiy loyihada foydalanuvchi ma'lumotlarini o'chirishdan
        oldin har doim tasdiqlash so'raladi — buni keyinroq frontend kodida ham qo'llaymiz.
      </Callout>

      <h2>Nega bu muhim?</h2>
      <p>
        Keyingi bo'limda "Vazifalar boshqaruvchisi" ilovasiga React kodini ulaganimizda, siz
        yozadigan har bir funksiya — <code>insert</code>, <code>select</code>,{' '}
        <code>update</code>, <code>delete</code> — aynan hozir Table Editor'da qo'lingiz bilan
        bajargan amallarning dasturiy (programmatic) ko'rinishi bo'ladi. Interfeys tugmalar
        o'rniga kod chaqiruvlariga almashadi, lekin ma'lumotlar bazasi darajasidagi mantiq
        bir xil qoladi.
      </p>

      <Quiz
        question={`Table Editor'da "Insert row" orqali yangi vazifa qo'shganingizda, id va created_at ustunlarini nega bo'sh qoldirasiz?`}
        options={[
          "Chunki ular ixtiyoriy va umuman qiymatga ega bo'lmaydi",
          "Chunki ular identity va default (now()) tufayli Postgres tomonidan avtomatik to'ldiriladi",
          "Chunki Table Editor bu ustunlarni tahrirlashga umuman ruxsat bermaydi",
          "Chunki ular faqat SQL Editor orqali to'ldiriladi",
        ]}
        correctIndex={1}
        explanation="id ustuni 'generated always as identity' tufayli, created_at esa 'default now()' tufayli, ikkalasi ham qiymat aniq berilmasa, Postgres tomonidan avtomatik hisoblab to'ldiriladi."
      />

      <Exercise title="Amaliy mashq: CRUD'ni qo'lda sinab ko'ring">
        <p>Table Editor'da <code>tasks</code> jadvalida quyidagi amallarni ketma-ket bajaring:</p>
        <ol>
          <li>
            <strong>Create</strong>: <code>Kitob o'qish</code> nomli yangi vazifa qo'shing.
          </li>
          <li>
            <strong>Update</strong>: shu vazifaning <code>is_done</code> qiymatini{' '}
            <code>true</code>ga o'zgartiring.
          </li>
          <li>
            <strong>Delete</strong>: jadvaldagi eng birinchi qo'shilgan vazifani o'chiring.
          </li>
        </ol>
        <p>
          Har bir amaldan so'ng, xuddi shu natijani beradigan SQL buyrug'ini yozib qo'ying.
        </p>
        <Solution>
          <CodeBlock lang="sql">{`-- 1. Create
insert into tasks (title) values ('Kitob o''qish');

-- 2. Update (masalan, yangi qatorning id'si 4 bo'lsa)
update tasks set is_done = true where id = 4;

-- 3. Delete (birinchi qo'shilgan qatorning id'si 1 bo'lsa)
delete from tasks where id = 1;`}</CodeBlock>
          <p>
            Diqqat qiling: SQL'da matn ichida apostrof bo'lsa (<code>Kitob o&apos;qish</code>),
            uni ikki marta yozib qochib ketiladi (<code>o&apos;&apos;qish</code>) — bu SQL'ning
            o'ziga xos qoidasi, Table Editor formasida esa buni o'ylashning hojati yo'q, chunki
            interfeys buni siz uchun avtomatik hal qiladi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          CRUD — Create (qo'shish), Read (o'qish), Update (yangilash), Delete (o'chirish) —
          ma'lumotlar bilan ishlashning to'rtta asosiy amali.
        </li>
        <li>
          Table Editor'da <strong>Insert row</strong> orqali qator qo'shiladi,{' '}
          <code>id</code> va <code>created_at</code> avtomatik to'ldirilgani uchun bo'sh
          qoldiriladi.
        </li>
        <li>
          Katakka bosib qiymatni tahrirlash — Update, qator checkbox'ini belgilab{' '}
          <strong>Delete</strong>ni bosish — o'chirish amali.
        </li>
        <li>
          Table Editor'dagi har bir amal sahna ortida <code>insert</code>, <code>update</code>{' '}
          yoki <code>delete</code> SQL buyrug'iga teng — bu keyingi bo'limda React kodida
          yoziladigan funksiyalarning aynan asosini tashkil qiladi.
        </li>
        <li>
          Qatorni o'chirish qaytarib bo'lmaydigan amal, shuning uchun ehtiyotkorlik talab
          qiladi.
        </li>
      </KeyPoints>
    </>
  )
}
