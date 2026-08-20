import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'SELECT va FROM',
  section: 'SELECT asoslari',
}

const MAHSULOTLAR_SCHEMA = `CREATE TABLE mahsulotlar (
  id INTEGER PRIMARY KEY,
  nom TEXT NOT NULL,
  narx REAL NOT NULL,
  kategoriya TEXT
);

INSERT INTO mahsulotlar (id, nom, narx, kategoriya) VALUES
  (1, 'Noutbuk', 4500000, 'Elektronika'),
  (2, 'Sichqoncha', 85000, 'Elektronika'),
  (3, 'Klaviatura', 210000, 'Elektronika'),
  (4, 'Monitor', 1500000, 'Elektronika'),
  (5, 'Stol lampa', 120000, 'Uy jihozlari'),
  (6, 'Kitob tokchasi', 650000, 'Uy jihozlari'),
  (7, 'Sport krossovka', 380000, 'Kiyim'),
  (8, 'Futbolka', 95000, 'Kiyim'),
  (9, 'Ryukzak', 275000, NULL),
  (10, 'Sovg''a sertifikati', 200000, NULL);`

export default function SelectVaFromLesson() {
  return (
    <>
      <h2>SELECT va FROM — so'rovning tayanchi</h2>
      <p>
        O'tgan darsda siz allaqachon <code>SELECT * FROM mahsulotlar;</code> so'rovini ishga
        tushirgan edingiz. Endi shu ikki kalit so'zni — <code>SELECT</code> va{' '}
        <code>FROM</code>ni — batafsil o'rganamiz, chunki deyarli har bir SQL so'rovi aynan
        shulardan boshlanadi.
      </p>
      <ul>
        <li>
          <code>FROM</code> — qaysi jadvaldan ma'lumot olishni ko'rsatadi. Bizning holimizda bu{' '}
          <code>mahsulotlar</code> jadvali.
        </li>
        <li>
          <code>SELECT</code> — o'sha jadvaldan qaysi ustunlarni ko'rishni xohlayotganingizni
          ko'rsatadi.
        </li>
      </ul>
      <p>
        Ya'ni SQL so'rovini o'qishning eng oson yo'li — uni orqadan oldinga o'qish: avval{' '}
        <code>FROM</code>ga qarab "qaysi jadvaldan" ekanini aniqlaymiz, so'ng{' '}
        <code>SELECT</code>ga qarab "qaysi ustunlar" kerakligini bilamiz.
      </p>

      <h2>Barcha ustunlar: SELECT *</h2>
      <p>
        Yulduzcha (<code>*</code>) belgisi "barcha ustunlar" degan ma'noni anglatadi:
      </p>
      <CodeBlock lang="sql">{`SELECT * FROM mahsulotlar;`}</CodeBlock>
      <p>
        Bu so'rov <code>mahsulotlar</code> jadvalidagi barcha to'rtta ustunni (
        <code>id</code>, <code>nom</code>, <code>narx</code>, <code>kategoriya</code>) qaytaradi.
        Tez tekshirish yoki kichik jadvallar bilan ishlashda <code>*</code> juda qulay, lekin
        katta jadvallarda kerak bo'lmagan ustunlarni ham olib kelishi mumkin — bu esa haqiqiy
        loyihalarda ortiqcha ish yuklaydi.
      </p>

      <h2>Faqat kerakli ustunlar</h2>
      <p>
        Ko'pincha bizga jadvaldagi barcha ustunlar emas, faqat ba'zilari kerak bo'ladi. Buning
        uchun <code>*</code> o'rniga kerakli ustunlar nomini vergul bilan ajratib yozamiz:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, narx FROM mahsulotlar;`}</CodeBlock>
      <p>
        Bu so'rov endi barcha o'nta qatorni qaytaradi, lekin har bir qatorda faqat ikkita ustun —{' '}
        <code>nom</code> va <code>narx</code> — bo'ladi. <code>id</code> va{' '}
        <code>kategoriya</code> natijada umuman ko'rinmaydi.
      </p>
      <Callout type="tip" title="Muhim: natijadagi ustunlar tartibi">
        Natija jadvalidagi ustunlar tartibi <strong>SELECT ro'yxatida yozgan tartibingizga</strong>{' '}
        qarab belgilanadi — jadvalning o'zi qanday yaratilganiga (ya'ni <code>CREATE TABLE</code>
        dagi tartibga) emas! Masalan, <code>SELECT narx, nom FROM mahsulotlar;</code> deb yozsangiz,
        natijada avval <code>narx</code>, keyin <code>nom</code> ustuni chiqadi — garchi jadvalning
        o'zida <code>nom</code> ustuni <code>narx</code>dan oldin joylashgan bo'lsa ham.
      </Callout>

      <h2>O'zingiz sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada avval <code>SELECT nom, narx FROM mahsulotlar;</code> so'rovi
        tayyor turibdi. <strong>Bajarish</strong>ni bosing, so'ng so'rovni{' '}
        <code>SELECT narx, nom FROM mahsulotlar;</code> deb o'zgartirib, ustunlar tartibi qanday
        o'zgarishini kuzating.
      </p>
      <SqlPlayground
        schema={MAHSULOTLAR_SCHEMA}
        initialQuery="SELECT nom, narx FROM mahsulotlar;"
      />

      <Quiz
        question="SELECT * FROM mahsulotlar; so'rovi nimani qaytaradi?"
        options={[
          "Faqat id ustunini",
          "Jadvaldagi barcha ustunlarni, barcha qatorlar bo'yicha",
          "Faqat birinchi qatorni",
          "Hech narsa qaytarmaydi, chunki * xato belgi"
        ]}
        correctIndex={1}
        explanation="Yulduzcha (*) 'barcha ustunlar' degan ma'noni anglatadi, shuning uchun so'rov jadvaldagi barcha ustunlarni, barcha qatorlar bo'yicha qaytaradi."
      />

      <Quiz
        question="SELECT narx, nom FROM mahsulotlar; so'rovining natijasida ustunlar qanday tartibda chiqadi?"
        options={[
          "Har doim jadval yaratilgandagi tartibda: nom, keyin narx",
          "Alifbo tartibida",
          "SELECT ro'yxatida yozilgan tartibda: narx, keyin nom",
          "Tasodifiy tartibda"
        ]}
        correctIndex={2}
        explanation="Natijadagi ustunlar tartibi SELECT ro'yxatida yozilgan tartibga mos keladi, jadvalning CREATE TABLE'dagi asl tartibiga emas."
      />

      <Exercise title="Mashq">
        <p>
          Yuqoridagi SQL maydonchasida faqat <code>nom</code> va <code>kategoriya</code>{' '}
          ustunlarini, aynan shu tartibda qaytaradigan so'rov yozing.
        </p>
        <Solution>
          <CodeBlock lang="sql">{`SELECT nom, kategoriya FROM mahsulotlar;`}</CodeBlock>
          <p>
            Bu so'rov barcha o'nta qatorni qaytaradi, lekin har birida faqat ikkita ustun —
            avval <code>nom</code>, keyin <code>kategoriya</code> — ko'rsatiladi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>FROM</code> — qaysi jadvaldan, <code>SELECT</code> — qaysi ustunlarni olishni
          ko'rsatadi.
        </li>
        <li>
          <code>SELECT * FROM jadval;</code> jadvaldagi barcha ustunlarni qaytaradi.
        </li>
        <li>
          Kerakli ustunlarni <code>SELECT ustun1, ustun2 FROM jadval;</code> ko'rinishida vergul
          bilan ajratib yozish mumkin.
        </li>
        <li>
          Natija jadvalidagi ustunlar tartibi <code>SELECT</code> ro'yxatida yozilgan tartibga
          mos keladi, jadvalning asl tuzilishiga emas.
        </li>
      </KeyPoints>
    </>
  )
}
