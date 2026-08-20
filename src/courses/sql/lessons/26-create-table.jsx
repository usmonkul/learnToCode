import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'CREATE TABLE',
  section: 'Jadval yaratish',
}

const PHASE2_SCHEMA = `CREATE TABLE mahsulotlar (
  id INTEGER PRIMARY KEY,
  nom TEXT NOT NULL,
  narx REAL NOT NULL,
  kategoriya TEXT
);

CREATE TABLE mijozlar (
  id INTEGER PRIMARY KEY,
  ism TEXT NOT NULL,
  email TEXT,
  shahar TEXT
);

CREATE TABLE buyurtmalar (
  id INTEGER PRIMARY KEY,
  mijoz_id INTEGER,
  sana TEXT,
  FOREIGN KEY (mijoz_id) REFERENCES mijozlar(id)
);

CREATE TABLE buyurtma_tafsilotlari (
  id INTEGER PRIMARY KEY,
  buyurtma_id INTEGER,
  mahsulot_id INTEGER,
  miqdor INTEGER,
  FOREIGN KEY (buyurtma_id) REFERENCES buyurtmalar(id),
  FOREIGN KEY (mahsulot_id) REFERENCES mahsulotlar(id)
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
  (10, 'Sovg''a sertifikati', 200000, NULL);

INSERT INTO mijozlar (id, ism, email, shahar) VALUES
  (1, 'Aziz Karimov', 'aziz@mail.uz', 'Toshkent'),
  (2, 'Malika Yusupova', 'malika@mail.uz', 'Samarqand'),
  (3, 'Vali Rashidov', NULL, 'Buxoro'),
  (4, 'Dilnoza Xolova', 'dilnoza@mail.uz', 'Toshkent'),
  (5, 'Sardor Rustamov', 'sardor@mail.uz', NULL),
  (6, 'Zarina Nabieva', 'zarina@mail.uz', 'Samarqand');

INSERT INTO buyurtmalar (id, mijoz_id, sana) VALUES
  (1, 1, '2026-01-05'),
  (2, 2, '2026-01-07'),
  (3, 1, '2026-01-12'),
  (4, 3, '2026-01-15'),
  (5, 4, '2026-01-20'),
  (6, 2, '2026-01-22'),
  (7, 5, '2026-01-25'),
  (8, 1, '2026-02-01'),
  (9, 4, '2026-02-03'),
  (10, 3, '2026-02-10');

INSERT INTO buyurtma_tafsilotlari (id, buyurtma_id, mahsulot_id, miqdor) VALUES
  (1, 1, 1, 1),
  (2, 1, 2, 1),
  (3, 2, 3, 2),
  (4, 2, 8, 1),
  (5, 3, 4, 3),
  (6, 4, 6, 1),
  (7, 5, 7, 2),
  (8, 5, 4, 1),
  (9, 6, 1, 1),
  (10, 7, 8, 1),
  (11, 8, 2, 3),
  (12, 9, 5, 1),
  (13, 10, 6, 2);`

export default function CreateTableLesson() {
  return (
    <>
      <h2>Hozirgacha jadvallar tayyor edi</h2>
      <p>
        1-darsdan buyon biz <code>mahsulotlar</code>, <code>mijozlar</code>,{' '}
        <code>buyurtmalar</code> va <code>buyurtma_tafsilotlari</code> jadvallari bilan
        ishladik — lekin ularning barchasi bizga <strong>tayyor holda</strong> berilgan edi.
        Endi yangi bo'limni boshlaymiz: <strong>ma'lumotlar tuzilmasini yaratish (DDL — Data
        Definition Language)</strong>. Bu darsda <code>CREATE TABLE</code> buyrug'i bilan{' '}
        <strong>o'z jadvalingizni</strong> noldan qanday yaratishni o'rganasiz.
      </p>

      <h2>CREATE TABLE sintaksisi</h2>
      <p>
        Umumiy shakl: jadval nomidan keyin qavs ichida har bir ustunning{' '}
        <strong>nomi</strong> va <strong>turi (type)</strong> vergul bilan ajratib yoziladi:
      </p>
      <CodeBlock lang="sql">{`CREATE TABLE jadval_nomi (
  ustun1 TUR,
  ustun2 TUR,
  ustun3 TUR
);`}</CodeBlock>
      <p>
        Bu tanish ko'rinishi kerak — 16-darsda aynan shu sintaksis bilan{' '}
        <code>mijozlar</code>, <code>buyurtmalar</code> va boshqa jadvallar qanday
        yaratilganini ko'rgan edingiz. Endi uni o'zingiz yozasiz.
      </p>

      <h2>Ustun turlari: INTEGER, TEXT, REAL</h2>
      <p>
        Har bir ustunga qanday ma'lumot saqlanishini bildiruvchi <strong>tur (type)</strong>{' '}
        beriladi. Kurs davomida uchta asosiy turdan foydalanamiz — ularni{' '}
        <code>mahsulotlar</code> jadvalidan allaqachon bilasiz:
      </p>
      <ul>
        <li>
          <code>INTEGER</code> — butun son (masalan, <code>id</code>, miqdor, yosh).{' '}
          <code>mahsulotlar.id</code> aynan shu tur.
        </li>
        <li>
          <code>TEXT</code> — matn (masalan, ism, email, tavsif).{' '}
          <code>mahsulotlar.nom</code> aynan shu tur.
        </li>
        <li>
          <code>REAL</code> — kasr son, ya'ni vergul (aslida nuqta) bilan yoziladigan son
          (masalan, narx, foiz). <code>mahsulotlar.narx</code> aynan shu tur — narx odatda
          butun ko'rinsa ham, kelajakda <code>4500000.50</code> kabi kasr qiymat bo'lishi
          mumkinligi uchun <code>REAL</code> tanlangan.
        </li>
      </ul>
      <Callout type="tip" title="PRIMARY KEY — eslatma">
        18-darsdan buyon ko'rib kelayotgan <code>id INTEGER PRIMARY KEY</code> yozuvi — bu
        ustun turi (<code>INTEGER</code>) va uning <strong>asosiy kalit</strong> ekanligini
        bildiruvchi qo'shimcha belgi. Asosiy kalit haqida keyingi darsda batafsil gaplashamiz.
      </Callout>

      <h2>Yangi jadval: sharhlar (reviews)</h2>
      <p>
        Do'konimizga yetishmayotgan narsa bor — mijozlar mahsulotlarga{' '}
        <strong>sharh (review)</strong> qoldira olmaydi. Keling, buning uchun{' '}
        <code>sharhlar</code> jadvalini yarataylik. Unda to'rtta ustun bo'ladi:
      </p>
      <ul>
        <li>
          <code>id INTEGER PRIMARY KEY</code> — har bir sharhning noyob raqami.
        </li>
        <li>
          <code>mahsulot_id INTEGER</code> — sharh qaysi mahsulotga tegishli ekanini
          bildiradi (hozircha oddiy <code>INTEGER</code> — uni haqiqiy tashqi kalitga
          aylantirishni keyingi darsda qilamiz).
        </li>
        <li>
          <code>matn TEXT</code> — sharhning o'zi.
        </li>
        <li>
          <code>baho INTEGER</code> — baho (masalan, 1 dan 5 gacha).
        </li>
      </ul>
      <CodeBlock lang="sql">{`CREATE TABLE sharhlar (
  id INTEGER PRIMARY KEY,
  mahsulot_id INTEGER,
  matn TEXT,
  baho INTEGER
);`}</CodeBlock>

      <h2>Sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada aynan shu <code>CREATE TABLE</code> so'rovi tayyor turibdi —
        odatdagi Phase 2 jadvallarimiz (<code>mahsulotlar</code>, <code>mijozlar</code> va
        h.k.) ham fonda mavjud. <strong>Bajarish</strong>ni bosing — natijada jadval
        ko'rinmaydi, faqat "so'rov muvaffaqiyatli bajarildi" degan xabar chiqadi, chunki{' '}
        <code>CREATE TABLE</code> hech qanday qator qaytarmaydi. Keyin matn maydonini
        quyidagicha almashtirib, yana <strong>Bajarish</strong>ni bosing — yangi jadvalga
        bitta sharh qo'shiladi va darhol qaytarib ko'rsatiladi:
      </p>
      <CodeBlock lang="sql">{`INSERT INTO sharhlar (id, mahsulot_id, matn, baho)
VALUES (1, 1, 'Juda yaxshi noutbuk, tavsiya qilaman!', 5);

SELECT * FROM sharhlar;`}</CodeBlock>
      <SqlPlayground
        schema={PHASE2_SCHEMA}
        initialQuery={`CREATE TABLE sharhlar (
  id INTEGER PRIMARY KEY,
  mahsulot_id INTEGER,
  matn TEXT,
  baho INTEGER
);`}
      />
      <p>
        Diqqat qiling — bu <strong>bitta</strong> maydoncha, uning ichidagi baza har ikkala
        bosishda ham bir xil (qayta tiklanmaydi), shuning uchun birinchi bosishda yaratgan{' '}
        <code>sharhlar</code> jadvali ikkinchi bosishda ham joyida turadi. Endi o'zingiz sinab
        ko'ring: yuqoridagi <code>CREATE TABLE</code> so'roviga yana bitta ustun qo'shing
        (masalan, <code>sana TEXT</code>) yoki <code>baho</code>ning turini{' '}
        <code>REAL</code>ga o'zgartiring — <strong>Qayta tiklash</strong> tugmasi har doim
        boshidan boshlash imkonini beradi.
      </p>

      <Quiz
        question="mahsulotlar jadvalida narx ustuni nega INTEGER emas, REAL turida e'lon qilingan?"
        options={[
          "Chunki REAL matn saqlash uchun ishlatiladi",
          "Chunki narx kasr qiymat (masalan, tiyin) bo'lishi mumkin, INTEGER esa faqat butun sonni saqlaydi",
          "Chunki SQLite INTEGER turini umuman qo'llab-quvvatlamaydi",
          "Farqi yo'q, ikkalasi ham bir xil ishlaydi"
        ]}
        correctIndex={1}
        explanation="REAL kasr (nuqtali) sonlarni ham saqlay oladi, INTEGER esa faqat butun sonni. Narx kabi qiymatlar kelajakda kasr bo'lishi mumkinligi uchun REAL tanlanadi."
      />

      <Quiz
        question="CREATE TABLE sharhlar (id INTEGER PRIMARY KEY, matn TEXT); so'rovi ishga tushirilganda natija panelida nima ko'rinadi?"
        options={[
          "sharhlar jadvalining bo'sh qatorlar jadvali",
          "Xato xabari, chunki jadval hali bo'sh",
          "\"So'rov muvaffaqiyatli bajarildi\" degan xabar — chunki CREATE TABLE hech qanday qator qaytarmaydi",
          "mahsulotlar jadvalining tarkibi"
        ]}
        correctIndex={2}
        explanation="INSERT kabi, CREATE TABLE ham natija sifatida qator qaytarmaydi — u faqat jadval tuzilmasini yaratadi, shuning uchun SqlPlayground muvaffaqiyat xabarini ko'rsatadi."
      />

      <Exercise title="Mashq">
        <p>
          Yangi jadval yarating: <code>chegirmalar</code> (discounts) — ustunlari:{' '}
          <code>id INTEGER PRIMARY KEY</code>, <code>mahsulot_id INTEGER</code>,{' '}
          <code>foiz REAL</code> (chegirma foizi). Yaratgandan so'ng, unga{' '}
          <code>mahsulot_id = 1</code> va <code>foiz = 15.5</code> bo'lgan bitta qator
          qo'shing, so'ng <code>SELECT</code> bilan uni tekshiring.
        </p>
        <SqlPlayground
          schema={PHASE2_SCHEMA}
          initialQuery={`CREATE TABLE chegirmalar (
  id INTEGER PRIMARY KEY,
  mahsulot_id INTEGER,
  foiz REAL
);`}
        />
        <Solution>
          <CodeBlock lang="sql">{`CREATE TABLE chegirmalar (
  id INTEGER PRIMARY KEY,
  mahsulot_id INTEGER,
  foiz REAL
);

INSERT INTO chegirmalar (id, mahsulot_id, foiz)
VALUES (1, 1, 15.5);

SELECT * FROM chegirmalar;`}</CodeBlock>
          <p>
            Natijada bitta qator qaytadi: <code>id=1</code>, <code>mahsulot_id=1</code>,{' '}
            <code>foiz=15.5</code>. <code>foiz</code> ustuni <code>REAL</code> turida
            bo'lgani uchun kasr qiymat (<code>15.5</code>) muammosiz saqlanadi — agar u{' '}
            <code>INTEGER</code> bo'lganida, bu qiymat noto'g'ri saqlanishi mumkin edi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>CREATE TABLE jadval_nomi (ustun1 TUR, ustun2 TUR, ...)</code> — yangi jadval
          yaratadi; har bir ustunga nom va tur beriladi.
        </li>
        <li>
          Uchta asosiy tur: <code>INTEGER</code> (butun son), <code>TEXT</code> (matn),{' '}
          <code>REAL</code> (kasr son).
        </li>
        <li>
          <code>CREATE TABLE</code> — xuddi <code>INSERT</code> kabi — natijada qator
          qaytarmaydi, faqat jadval tuzilmasini yaratadi.
        </li>
        <li>
          Shu darsda yaratilgan <code>sharhlar</code> jadvalini keyingi darsda tashqi kalit
          bilan yanada mustahkamlaymiz.
        </li>
      </KeyPoints>
    </>
  )
}
