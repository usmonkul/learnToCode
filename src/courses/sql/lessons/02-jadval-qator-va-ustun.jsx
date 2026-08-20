import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'Jadvallar, qatorlar va ustunlar',
  section: 'Kirish',
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

export default function JadvalQatorVaUstunLesson() {
  return (
    <>
      <h2>Amaliy misol: mahsulotlar jadvali</h2>
      <p>
        O'tgan darsda jadval (table) — satrlar (rows) va ustunlardan (columns) tashkil topgan
        tuzilma ekanini aytgan edik. Endi buni haqiqiy misolda ko'ramiz. Shu darsdan boshlab, biz
        butun kurs davomida bir xayoliy onlayn-do'konning <code>mahsulotlar</code> (products)
        jadvali bilan ishlaymiz. Bu jadval quyidagi maydonchada allaqachon tayyor holda mavjud —
        keling, uning tarkibini ko'ramiz:
      </p>
      <SqlPlayground schema={MAHSULOTLAR_SCHEMA} initialQuery="SELECT * FROM mahsulotlar;" />
      <p>
        Yuqoridagi maydonchada tayyor so'rov allaqachon yozilgan — <strong>Bajarish</strong>{' '}
        tugmasini bosing va natijani ko'ring. Bu — sizning kursdagi birinchi haqiqiy SQL
        so'rovingiz! <code>SELECT * FROM mahsulotlar;</code> so'rovi "mahsulotlar jadvalidagi
        barcha ustunlarni, barcha qatorlar bo'yicha ko'rsat" degan ma'noni anglatadi (
        <code>SELECT</code> va <code>FROM</code> operatorlari haqida keyingi darsda batafsil
        gaplashamiz).
      </p>

      <h2>Natija jadvalini o'qish</h2>
      <p>
        Bajarish tugmasini bosgach, ekranda o'nta qatordan iborat jadval paydo bo'ladi. Uni
        birma-bir tahlil qilamiz:
      </p>
      <ul>
        <li>
          <strong>Ustunlar (columns)</strong> — jadval tepasidagi sarlavhalar: <code>id</code>,{' '}
          <code>nom</code>, <code>narx</code>, <code>kategoriya</code>. Har bir ustun mahsulotning
          bitta xususiyatini bildiradi: <code>id</code> — mahsulotning noyob raqami,{' '}
          <code>nom</code> — mahsulot nomi, <code>narx</code> — narxi (so'mda),{' '}
          <code>kategoriya</code> — qaysi turkumga tegishli ekani.
        </li>
        <li>
          <strong>Qatorlar (rows)</strong> — jadvaldagi har bir satr bitta aniq mahsulot haqidagi
          to'liq ma'lumotni ifodalaydi. Masalan, birinchi qator — <code>id</code>si 1,{' '}
          <code>nom</code>i "Noutbuk", <code>narx</code>i 4500000, <code>kategoriya</code>si
          "Elektronika" bo'lgan mahsulot.
        </li>
      </ul>
      <p>
        Diqqat bilan qarasangiz, 9- va 10-qatorlarda (<code>Ryukzak</code> va{' '}
        <code>Sovg'a sertifikati</code>) <code>kategoriya</code> ustuni <code>NULL</code> deb
        ko'rsatilgan. <code>NULL</code> — bu "bo'sh satr" ham, "nol" ham emas, balki "bu yerda
        umuman qiymat yo'q" degani. Bu haqda alohida darsda batafsil to'xtalamiz.
      </p>

      <h2>Asosiy kalit (primary key) nima?</h2>
      <p>
        Jadvaldagi <code>id</code> ustuniga alohida e'tibor bering. Uning sxemadagi ta'rifi{' '}
        <code>INTEGER PRIMARY KEY</code> — ya'ni "asosiy kalit (primary key)". Asosiy kalit —
        jadvaldagi har bir qatorni boshqalardan farqlash uchun ishlatiladigan noyob (unique)
        qiymat. Asosiy kalitning ikkita muhim xususiyati bor:
      </p>
      <ul>
        <li>
          <strong>Noyobligi.</strong> Jadvalda ikkita qatorning <code>id</code>si bir xil bo'lishi
          mumkin emas — har bir mahsulot o'zining yagona raqamiga ega.
        </li>
        <li>
          <strong>O'zgarmasligi.</strong> <code>id</code> odatda mahsulotning nomi yoki narxi
          o'zgarganda ham o'zgarmaydi — u shu qatorning doimiy "shaxsiy raqami" bo'lib qoladi.
        </li>
      </ul>
      <p>
        Nega bu muhim? Chunki nom yoki narx orqali mahsulotni aniqlash xavfli — ikkita mahsulot
        bir xil nomga ega bo'lishi mumkin, narx esa vaqt o'tishi bilan o'zgarishi mumkin. Ammo{' '}
        <code>id</code> orqali biz har doim aynan qaysi mahsulot haqida gap ketayotganini
        ishonchli tarzda bilamiz. Keyinchalik jadvallarni bir-biriga bog'lashda ham (masalan,
        buyurtma qaysi mahsulotga tegishli ekanini ko'rsatishda) aynan shu <code>id</code>dan
        foydalaniladi.
      </p>
      <Callout type="tip" title="Sinab ko'ring">
        Yuqoridagi maydonchada so'rovni <code>SELECT * FROM mahsulotlar WHERE id = 5;</code> deb
        o'zgartirib, <strong>Bajarish</strong>ni bosing — faqat 5-<code>id</code>li mahsulot
        qaytadi. Xato qilib qo'ysangiz ham xavotir olmang — <strong>Qayta tiklash</strong> tugmasi
        jadvalni boshidagi holatga qaytaradi.
      </Callout>

      <Quiz
        question="Mahsulotlar jadvalida bitta qator (row) nimani ifodalaydi?"
        options={[
          "Butun jadvalning nomini",
          "Bitta aniq mahsulot haqidagi to'liq ma'lumotni",
          "Faqat mahsulot nomini",
          "Jadvaldagi barcha ustunlar ro'yxatini"
        ]}
        correctIndex={1}
        explanation="Har bir qator (row) jadvaldagi bitta aniq yozuvni — bu holda bitta mahsulot haqidagi barcha ma'lumotni (id, nom, narx, kategoriya) ifodalaydi."
      />

      <Quiz
        question="mahsulotlar jadvalida id ustuni nima uchun asosiy kalit (primary key) qilib belgilangan?"
        options={[
          "Chunki u har doim eng katta son bo'ladi",
          "Chunki har bir qatorni noyob va ishonchli tarzda aniqlash kerak",
          "Chunki narx ustuni son emas",
          "Chunki kategoriya ustuni NULL bo'lishi mumkin"
        ]}
        correctIndex={1}
        explanation="Asosiy kalit har bir qatorni boshqalardan noyob tarzda farqlash uchun ishlatiladi; id nom yoki narxdan farqli o'laroq hech qachon takrorlanmaydi va o'zgarmaydi."
      />

      <Exercise title="Mashq">
        <p>
          Yuqoridagi SQL maydonchasida so'rovni <code>SELECT * FROM mahsulotlar WHERE kategoriya = 'Kiyim';</code>{' '}
          deb o'zgartiring va <strong>Bajarish</strong>ni bosing. Natijada nechta qator
          qaytganini va ular qaysi mahsulotlar ekanini yozing.
        </p>
        <Solution>
          <p>
            Ikkita qator qaytadi: <code>id</code>si 7 bo'lgan "Sport krossovka" (narxi 380000) va{' '}
            <code>id</code>si 8 bo'lgan "Futbolka" (narxi 95000) — chunki faqat shu ikkalasining{' '}
            <code>kategoriya</code>si "Kiyim"ga teng.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Jadval satrlar (rows) va ustunlardan (columns) tashkil topadi; har bir satr bitta aniq
          yozuv, har bir ustun o'sha yozuvning bitta xususiyati.
        </li>
        <li>
          <code>mahsulotlar</code> jadvalida to'rtta ustun bor: <code>id</code>, <code>nom</code>,{' '}
          <code>narx</code>, <code>kategoriya</code>.
        </li>
        <li>
          Asosiy kalit (primary key) — jadvaldagi har bir qatorni noyob tarzda aniqlaydigan
          ustun; <code>mahsulotlar</code> jadvalida bu <code>id</code> ustuni.
        </li>
        <li>
          <code>NULL</code> — "bo'sh qiymat emas", balki "qiymat umuman yo'q" degani; bunga
          alohida dars bag'ishlanadi.
        </li>
        <li>
          SQL maydonchasidagi <strong>Qayta tiklash</strong> tugmasi jadvalni har doim boshlang'ich
          holatga qaytaradi, shuning uchun so'rovlarni erkin sinab ko'rish mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
