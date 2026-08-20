import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'PRIMARY KEY va FOREIGN KEY',
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

export default function PrimaryVaForeignKeyLesson() {
  return (
    <>
      <h2>Asosiy kalit (PRIMARY KEY) — eslatma</h2>
      <p>
        2-darsda <code>mahsulotlar</code> jadvalidagi <code>id</code> ustuni misolida{' '}
        <strong>asosiy kalit (primary key)</strong> bilan tanishgan edik. Qisqacha
        eslatamiz — asosiy kalit ustuni ikkita narsani kafolatlaydi:
      </p>
      <ul>
        <li>
          <strong>Noyoblik (uniqueness)</strong> — jadvalda ikkita qatorning{' '}
          <code>id</code>si bir xil bo'lishi mumkin emas.
        </li>
        <li>
          <strong>Qatorning "shaxsi" (identity)</strong> — <code>id</code> aynan shu bitta
          qatorni boshqa hech qanday qator bilan aralashtirmasdan aniqlaydi, hatto boshqa
          ustunlar (nom, narx) o'zgarib qolsa ham.
        </li>
      </ul>
      <p>
        <code>CREATE TABLE</code>da buni <code>id INTEGER PRIMARY KEY</code> deb e'lon
        qilamiz — 26-darsda yaratgan <code>sharhlar</code> jadvalida ham aynan shunday
        yozilgan edi.
      </p>

      <h2>Tashqi kalit (FOREIGN KEY) — yana bir bor</h2>
      <p>
        16-darsda tashqi kalit (foreign key) tushunchasini <code>buyurtmalar.mijoz_id</code>{' '}
        misolida ko'rgan edik. Eslatib o'tamiz:
      </p>
      <CodeBlock lang="sql">{`CREATE TABLE buyurtmalar (
  id INTEGER PRIMARY KEY,
  mijoz_id INTEGER,
  sana TEXT,
  FOREIGN KEY (mijoz_id) REFERENCES mijozlar(id)
);`}</CodeBlock>
      <p>
        <code>mijoz_id</code> — <strong>tashqi kalit</strong>: u <code>mijozlar</code>{' '}
        jadvalining asosiy kalitiga (<code>mijozlar.id</code>) "ishora qiladi". Tashqi
        kalitning vazifasi ikki qismdan iborat:
      </p>
      <ul>
        <li>
          U qaysi jadvalning qaysi qatoriga bog'liq ekanini bildiradi (masalan, "bu buyurtma
          1-mijozga tegishli").
        </li>
        <li>
          <strong>Nazariyada</strong> ma'lumotlarning izchilligini (consistency) saqlashi
          kerak — ya'ni mavjud bo'lmagan mijozga ishora qiluvchi buyurtma yaratilishiga yo'l
          qo'ymasligi kerak.
        </li>
      </ul>

      <h2>sharhlar jadvaliga tashqi kalit qo'shamiz</h2>
      <p>
        26-darsda yaratgan <code>sharhlar</code> jadvalida <code>mahsulot_id</code> oddiy{' '}
        <code>INTEGER</code> edi — u <code>mahsulotlar</code> jadvaliga hech qanday rasman
        bog'lanmagan edi. Endi uni to'g'ri tashqi kalit bilan e'lon qilaylik:
      </p>
      <CodeBlock lang="sql">{`CREATE TABLE sharhlar (
  id INTEGER PRIMARY KEY,
  mahsulot_id INTEGER,
  matn TEXT,
  baho INTEGER,
  FOREIGN KEY (mahsulot_id) REFERENCES mahsulotlar(id)
);`}</CodeBlock>
      <p>
        Bu — xuddi <code>buyurtmalar.mijoz_id → mijozlar.id</code> naqshining o'zi, faqat bu
        safar <code>sharhlar.mahsulot_id → mahsulotlar.id</code>.
      </p>

      <Callout type="warning" title="Diqqat: SQLite tashqi kalitni avtomatik tekshirmaydi!">
        Ko'pchilik SQL o'quvchilari <code>FOREIGN KEY</code> yozilgan zahoti SQLite
        noto'g'ri qiymatlarni avtomatik rad etadi deb o'ylashadi — lekin bu{' '}
        <strong>noto'g'ri</strong>. SQLite'da tashqi kalit tekshiruvi{' '}
        <strong>standart holatda o'chirilgan (OFF)</strong>. Buni pastdagi maydonchada
        o'zingiz ko'rasiz.
      </Callout>

      <h2>Sinab ko'ring: standart holatda tashqi kalit ishlamaydi</h2>
      <p>
        Quyidagi so'rov yangi (tashqi kalitli) <code>sharhlar</code> jadvalini yaratadi, so'ng{' '}
        <code>mahsulotlar</code> jadvalida <strong>umuman mavjud bo'lmagan</strong>{' '}
        <code>mahsulot_id = 9999</code> bilan sharh qo'shishga urinadi:
      </p>
      <SqlPlayground
        schema={PHASE2_SCHEMA}
        initialQuery={`CREATE TABLE sharhlar (
  id INTEGER PRIMARY KEY,
  mahsulot_id INTEGER,
  matn TEXT,
  baho INTEGER,
  FOREIGN KEY (mahsulot_id) REFERENCES mahsulotlar(id)
);

INSERT INTO sharhlar (id, mahsulot_id, matn, baho)
VALUES (1, 9999, 'Mavjud bo''lmagan mahsulotga sharh', 5);

SELECT * FROM sharhlar;`}
      />
      <p>
        <strong>Bajarish</strong>ni bosing — kutilganidan farqli o'laroq, xatolik chiqmaydi!
        Natija jadvalida <code>mahsulot_id = 9999</code> bo'lgan qator xotirjam ko'rinadi,
        garchi <code>mahsulotlar</code> jadvalida bunday <code>id</code> umuman yo'q bo'lsa
        ham. <code>FOREIGN KEY</code> yozuvi bor, lekin u shunchaki{' '}
        <strong>hujjatlashtiruvchi izoh</strong> vazifasini bajardi — SQLite uni haqiqatan
        tekshirmadi.
      </p>

      <h2>PRAGMA foreign_keys = ON — tekshiruvni yoqish</h2>
      <p>
        Tashqi kalitni haqiqatan ta'minlash (enforce qilish) uchun SQLite'ga alohida buyruq
        berish kerak:
      </p>
      <CodeBlock lang="sql">{`PRAGMA foreign_keys = ON;`}</CodeBlock>
      <p>
        Bu — oddiy SQL buyrug'i emas, balki SQLite'ga xos <strong>sozlama (pragma)</strong>.
        Uni bir marta ishga tushirgandan so'ng, shu ulanish (connection) davomida SQLite
        endi har bir <code>INSERT</code>/<code>UPDATE</code>dagi tashqi kalit qiymatini
        chindan ham <code>mahsulotlar</code> jadvalidan qidirib, mos kelmasa{' '}
        <strong>rad etadi</strong>.
      </p>
      <p>
        Quyidagi maydonchada shu holatni sinab ko'ring: avval <code>sharhlar</code>ni
        yaratamiz, keyin <code>PRAGMA foreign_keys = ON;</code> bilan tekshiruvni yoqamiz, so'ng
        yana <code>mahsulot_id = 9999</code> bilan qo'shishga urinamiz:
      </p>
      <SqlPlayground
        schema={PHASE2_SCHEMA}
        initialQuery={`CREATE TABLE sharhlar (
  id INTEGER PRIMARY KEY,
  mahsulot_id INTEGER,
  matn TEXT,
  baho INTEGER,
  FOREIGN KEY (mahsulot_id) REFERENCES mahsulotlar(id)
);

PRAGMA foreign_keys = ON;

INSERT INTO sharhlar (id, mahsulot_id, matn, baho)
VALUES (1, 9999, 'Mavjud bo''lmagan mahsulotga sharh', 5);`}
      />
      <p>
        Bu safar <strong>Bajarish</strong>ni bosganingizda, natija panelida qizil xatolik
        xabari chiqadi: <code>FOREIGN KEY constraint failed</code>. SQLite endi{' '}
        <code>mahsulot_id = 9999</code> <code>mahsulotlar</code> jadvalida yo'qligini
        aniqladi va qatorni qo'shishdan bosh tortdi. Buni tekshirish uchun matn maydonini{' '}
        <code>SELECT * FROM sharhlar;</code>ga o'zgartirib qayta ishga tushiring — jadval
        bo'sh chiqadi ("Natija topilmadi (0 qator)"), demak noto'g'ri qator haqiqatan ham
        qo'shilmagan.
      </p>

      <Callout type="note" title="Nega SQLite buni standart holatda o'chirib qo'ygan?">
        Tarixiy sabablarga ko'ra, SQLite eski loyihalar bilan moslikni saqlash uchun tashqi
        kalit tekshiruvini standart ravishda o'chirib qo'ygan. Boshqa ko'pgina ma'lumotlar
        bazalari (masalan, PostgreSQL, MySQL) buni standart holatda yoqilgan qilib
        beradi. SQLite bilan ishlaganda buni har doim yodda tuting — sxemada{' '}
        <code>FOREIGN KEY</code> yozish yetarli emas, uni ishlatish uchun{' '}
        <code>PRAGMA foreign_keys = ON;</code> ham kerak.
      </Callout>

      <Quiz
        question="SQLite'da CREATE TABLE ichida FOREIGN KEY (mahsulot_id) REFERENCES mahsulotlar(id) yozilgan bo'lsa, standart holatda (hech qanday PRAGMA ishga tushirilmasa) nima bo'ladi?"
        options={[
          "SQLite mavjud bo'lmagan mahsulot_id bilan INSERT qilishga avtomatik yo'l qo'ymaydi",
          "SQLite bunday jadvalni yaratishga umuman ruxsat bermaydi",
          "Tashqi kalit tekshiruvi standart holatda o'chirilgan, shuning uchun mavjud bo'lmagan mahsulot_id bilan ham qator muvaffaqiyatli qo'shiladi",
          "SQLite mahsulot_id ustunini avtomatik NULL qilib qo'yadi"
        ]}
        correctIndex={2}
        explanation="SQLite'da tashqi kalit tekshiruvi standart holatda OFF — FOREIGN KEY yozuvi mavjud bo'lsa ham, PRAGMA foreign_keys = ON; ishga tushirilmasa, mos kelmaydigan qiymatlar ham xotirjam qo'shiladi."
      />

      <Quiz
        question="PRAGMA foreign_keys = ON; ishga tushirilgandan so'ng, mahsulotlar jadvalida mavjud bo'lmagan mahsulot_id bilan sharhlarga INSERT qilinsa, nima bo'ladi?"
        options={[
          "Qator baribir qo'shiladi, faqat ogohlantirish chiqadi",
          "SQLite xatolik beradi (FOREIGN KEY constraint failed) va qatorni qo'shmaydi",
          "mahsulot_id avtomatik ravishda mavjud bir qiymatga almashtiriladi",
          "Butun sharhlar jadvali o'chirib tashlanadi"
        ]}
        correctIndex={1}
        explanation="Tashqi kalit tekshiruvi yoqilgandan so'ng, SQLite har bir INSERT/UPDATE'dagi tashqi kalit qiymatini haqiqatan tekshiradi va mos kelmasa xatolik bilan rad etadi."
      />

      <Exercise title="Mashq">
        <p>
          Quyidagi maydonchada <code>PRAGMA foreign_keys = ON;</code> allaqachon yoqilgan va{' '}
          tashqi kalitli <code>sharhlar</code> jadvali yaratilgan. Endi <strong>to'g'ri</strong>{' '}
          — <code>mahsulotlar</code> jadvalida haqiqatan mavjud bo'lgan{' '}
          <code>mahsulot_id = 3</code> (Klaviatura) bilan sharh qo'shing va uni{' '}
          <code>SELECT</code> bilan tasdiqlang. Nega bu safar so'rov muvaffaqiyatli
          bajarilishini oldindan tushuntiring.
        </p>
        <SqlPlayground
          schema={PHASE2_SCHEMA}
          initialQuery={`CREATE TABLE sharhlar (
  id INTEGER PRIMARY KEY,
  mahsulot_id INTEGER,
  matn TEXT,
  baho INTEGER,
  FOREIGN KEY (mahsulot_id) REFERENCES mahsulotlar(id)
);

PRAGMA foreign_keys = ON;`}
        />
        <Solution>
          <CodeBlock lang="sql">{`INSERT INTO sharhlar (id, mahsulot_id, matn, baho)
VALUES (1, 3, 'Klaviatura tugmalari yumshoq va qulay.', 4);

SELECT * FROM sharhlar;`}</CodeBlock>
          <p>
            Bu safar so'rov muvaffaqiyatli bajariladi, chunki <code>mahsulot_id = 3</code>{' '}
            <code>mahsulotlar</code> jadvalida haqiqatan mavjud (Klaviatura). Tashqi kalit
            tekshiruvi faqat <strong>mavjud bo'lmagan</strong> qiymatlarni rad etadi — mavjud
            bo'lgan har qanday <code>mahsulotlar.id</code> qiymatini <code>mahsulot_id</code>{' '}
            sifatida ishlatish har doim ruxsat etiladi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <strong>Asosiy kalit (primary key)</strong> — jadvaldagi har bir qatorni noyob va
          ishonchli tarzda aniqlaydi (2-darsdan eslatma).
        </li>
        <li>
          <strong>Tashqi kalit (foreign key)</strong> — boshqa jadvalning asosiy kalitiga
          ishora qiluvchi ustun; <code>FOREIGN KEY (ustun) REFERENCES jadval(ustun)</code>{' '}
          bilan e'lon qilinadi (16-darsdagi <code>buyurtmalar.mijoz_id → mijozlar.id</code>{' '}
          va shu darsdagi <code>sharhlar.mahsulot_id → mahsulotlar.id</code>).
        </li>
        <li>
          SQLite'da tashqi kalit tekshiruvi <strong>standart holatda o'chirilgan</strong> —{' '}
          <code>FOREIGN KEY</code> yozuvi bo'lsa ham, mos kelmaydigan qiymatlar rad
          etilmasdan qo'shilib ketadi.
        </li>
        <li>
          <code>PRAGMA foreign_keys = ON;</code> tekshiruvni yoqadi — shundan so'ng SQLite
          mavjud bo'lmagan tashqi kalit qiymatlari bilan <code>INSERT</code>/
          <code>UPDATE</code>ni xatolik bilan rad etadi.
        </li>
      </KeyPoints>
    </>
  )
}
