import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'Nega bir nechta jadval kerak?',
  section: 'JOIN',
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

export default function NegaBirNechtaJadvalLesson() {
  return (
    <>
      <h2>Bitta jadval yetarli emas</h2>
      <p>
        15 ta darsda biz faqat <code>mahsulotlar</code> jadvali bilan ishladik — bitta{' '}
        <strong>jadval (table)</strong>. Lekin haqiqiy dunyoda do'kon faqat mahsulotlarni
        emas, balki <strong>mijozlarni</strong> (customers) va ular bergan{' '}
        <strong>buyurtmalarni</strong> (orders) ham saqlashi kerak. Keling, buni bitta
        jadvalga sig'dirishga urinib ko'raylik va nima uchun bu yomon fikr ekanini ko'raylik.
      </p>

      <h2>Fikriy tajriba: hammasini bitta jadvalga solsak-chi?</h2>
      <p>
        Tasavvur qiling, <code>buyurtmalar</code> jadvalining har bir qatorida nafaqat
        buyurtma haqida ma'lumot, balki mijozning <strong>ismi, emaili va shahri</strong> ham
        saqlanadi:
      </p>
      <CodeBlock lang="text">{`id | mijoz_ism      | mijoz_email      | mijoz_shahar | sana
1  | Aziz Karimov   | aziz@mail.uz     | Toshkent     | 2026-01-05
2  | Malika Yusupova| malika@mail.uz   | Samarqand    | 2026-01-07
3  | Aziz Karimov   | aziz@mail.uz     | Toshkent     | 2026-01-12
8  | Aziz Karimov   | aziz@mail.uz     | Toshkent     | 2026-02-01`}</CodeBlock>
      <p>
        Aziz Karimov uchta marta buyurtma bergan, shuning uchun uning ismi, emaili va shahri
        ham <strong>uch marta takrorlangan</strong>. Bu ikkita jiddiy muammoga olib keladi:
      </p>
      <ul>
        <li>
          <strong>Takrorlanish (repetition)</strong> — bir xil ma'lumot (Azizning emaili) bir
          nechta qatorda qayta-qayta yoziladi. Bu joy behuda sarflanadi va ma'lumotlarni
          kiritishni ham qiyinlashtiradi.
        </li>
        <li>
          <strong>Nomuvofiqlik xavfi (inconsistency)</strong> — agar Aziz o'z emailini
          o'zgartirsa, uni <em>barcha uchta qatorda</em> yangilash kerak bo'ladi. Bittasini
          unutib qo'ysangiz, endi bitta mijozning ikki xil emaili "haqiqat" bo'lib qoladi —
          qaysi biri to'g'ri, aniq emas.
        </li>
      </ul>
      <Callout type="warning" title="Muammoning ildizi">
        Muammo shundaki, mijozga oid ma'lumot (ism, email, shahar) buyurtmaga emas,{' '}
        <strong>mijozning o'ziga</strong> tegishli. Uni har bir buyurtma qatorida takrorlash
        o'rniga, mijozni <em>bir marta</em> alohida joyda saqlab, buyurtmalarni unga{' '}
        <em>bog'lash</em> kerak.
      </Callout>

      <h2>Yechim: ma'lumotlarni alohida jadvallarga bo'lish</h2>
      <p>
        To'g'ri yondashuv — har bir "narsa turi" (mahsulot, mijoz, buyurtma) uchun alohida
        jadval yaratish, so'ng ularni bir-biriga <strong>bog'lash (link)</strong>. Bugungi
        darsdan boshlab, ma'lumotlar bazamizda to'rtta jadval bo'ladi:
      </p>
      <ul>
        <li>
          <code>mahsulotlar</code> — mahsulotlar (allaqachon tanish).
        </li>
        <li>
          <code>mijozlar</code> — mijozlar: ism, email, shahar.
        </li>
        <li>
          <code>buyurtmalar</code> — buyurtmalar: qaysi mijoz, qaysi sanada buyurtma bergan.
        </li>
        <li>
          <code>buyurtma_tafsilotlari</code> — har bir buyurtmaning tafsilotlari: qaysi
          mahsulot, qanday miqdorda buyurtma qilingan.
        </li>
      </ul>
      <CodeBlock lang="sql">{`CREATE TABLE mahsulotlar (
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
);`}</CodeBlock>
      <p>
        Endi mijozning ismi va emaili <code>mijozlar</code> jadvalida{' '}
        <strong>faqat bir marta</strong> saqlanadi. <code>buyurtmalar</code> jadvali esa
        mijozning ma'lumotlarini takrorlamaydi — u faqat mijozning{' '}
        <code>id</code>sini eslab qoladi.
      </p>

      <h2>Tashqi kalit (Foreign Key) nima?</h2>
      <p>
        <code>buyurtmalar</code> jadvalidagi <code>mijoz_id</code> ustuniga e'tibor bering.
        Bu — <strong>tashqi kalit (foreign key)</strong>: boshqa jadvalning{' '}
        <strong>asosiy kaliti (primary key)</strong>ga ishora qiluvchi ustun. Aniqrog'i:
      </p>
      <ul>
        <li>
          <code>mijozlar.id</code> — <code>mijozlar</code> jadvalining asosiy kaliti; har bir
          mijozni noyob (unique) belgilaydi.
        </li>
        <li>
          <code>buyurtmalar.mijoz_id</code> — <code>mijozlar.id</code>ga "ishora qiladi"
          (references); har bir buyurtma qaysi mijozga tegishli ekanini bildiradi.
        </li>
      </ul>
      <p>
        Masalan, <code>buyurtmalar</code> jadvalidagi <code>id=1</code> qatorida{' '}
        <code>mijoz_id=1</code> bo'lsa, bu — "1-buyurtma <code>mijozlar</code> jadvalidagi{' '}
        <code>id=1</code> bo'lgan mijozga (Aziz Karimov) tegishli" degani.{' '}
        <code>FOREIGN KEY (mijoz_id) REFERENCES mijozlar(id)</code> yozuvi aynan shu bog'lanishni
        SQLite'ga bildiradi.
      </p>
      <Callout type="tip" title="Tashqi kalit — ko'rsatkich (pointer)">
        Tashqi kalitni "boshqa jadvaldagi qatorga ko'rsatkich" deb tasavvur qiling.{' '}
        <code>mijoz_id</code> ustunining o'zi mijoz haqida hech narsa "bilmaydi" — u faqat bir
        son (masalan, <code>1</code>) saqlaydi, va o'sha son <code>mijozlar</code> jadvalidagi
        qaysi qatorga mos kelishini bildiradi.
      </Callout>

      <h2>Yangi jadvallarni ko'rib chiqamiz</h2>
      <p>
        Hozircha jadvallarni <strong>alohida-alohida</strong> ko'ramiz — ularni bog'lab so'rov
        yozishni (JOIN) keyingi darsda o'rganamiz. Quyidagi maydonchada har bir jadvalni
        alohida so'rab ko'ring:
      </p>
      <CodeBlock lang="sql">{`SELECT * FROM mijozlar;`}</CodeBlock>
      <CodeBlock lang="sql">{`SELECT * FROM buyurtmalar;`}</CodeBlock>
      <CodeBlock lang="sql">{`SELECT * FROM buyurtma_tafsilotlari;`}</CodeBlock>
      <SqlPlayground
        schema={PHASE2_SCHEMA}
        initialQuery={`SELECT * FROM mijozlar;`}
      />
      <p>
        <code>mijozlar</code> jadvalida 6 ta mijoz bor. Diqqat qiling — Vali Rashidovning{' '}
        <code>email</code>i <code>NULL</code> (ma'lum emas), Sardor Rustamovning esa{' '}
        <code>shahar</code>i <code>NULL</code>. Endi <code>buyurtmalar</code> jadvalini
        ko'ring — yuqoridagi so'rovni <code>SELECT * FROM buyurtmalar;</code>ga o'zgartiring
        va ishga tushiring. Har bir qatorda <code>mijoz_id</code> bor, lekin mijozning ismi
        yo'q — ism faqat <code>mijozlar</code> jadvalida saqlanadi.
      </p>
      <p>
        Bitta mijozning barcha buyurtmalarini <code>WHERE</code> bilan ham topsa bo'ladi —
        masalan, Aziz Karimovning (<code>id=1</code>) buyurtmalari:
      </p>
      <CodeBlock lang="sql">{`SELECT * FROM buyurtmalar WHERE mijoz_id = 1;`}</CodeBlock>
      <p>
        Bu so'rov 3 ta qator qaytaradi — Aziz uchta marta buyurtma bergan. Lekin natijada
        hali ham faqat <code>mijoz_id</code> ko'rinadi, ism emas. Ismni ham ko'rish uchun
        ikkita jadvalni <strong>birlashtirish (JOIN)</strong> kerak bo'ladi — buni aynan
        keyingi darsda o'rganamiz.
      </p>

      <Quiz
        question="Nega mijozning ismi va emailini har bir buyurtma qatorida takrorlash yomon fikr?"
        options={[
          "Chunki SQL matnlarni ikki marta saqlashga ruxsat bermaydi",
          "Chunki bu joy behuda sarflanadi va ma'lumot o'zgarganda barcha nusxalarni yangilash kerak bo'ladi, aks holda nomuvofiqlik yuzaga keladi",
          "Chunki jadvalda faqat bitta ustun bo'lishi kerak",
          "Chunki SQLite bunday jadvallarni yaratishga umuman ruxsat bermaydi"
        ]}
        correctIndex={1}
        explanation="Takrorlangan ma'lumot joy isrof qiladi va, muhimrog'i, yangilanganda barcha nusxalarni sinxron saqlash qiyin — bittasini unutib qo'ysangiz, ma'lumotlar bir-biriga zid (nomuvofiq) bo'lib qoladi."
      />

      <Quiz
        question="buyurtmalar.mijoz_id ustuni nima vazifani bajaradi?"
        options={[
          "U mijozning to'liq ismini saqlaydi",
          "U tashqi kalit (foreign key) — mijozlar jadvalidagi tegishli mijozning id (asosiy kalit) qiymatini saqlab, o'sha mijozga ishora qiladi",
          "U buyurtmaning umumiy narxini hisoblaydi",
          "U faqat SQLite ichki ehtiyojlari uchun ishlatiladi va so'rovlarda foydalanib bo'lmaydi"
        ]}
        correctIndex={1}
        explanation="mijoz_id — tashqi kalit: u mijozlar jadvalidagi bir qatorning id (asosiy kalit) qiymatini saqlab, o'sha qatorga 'ishora qiladi'. Shu orqali buyurtma qaysi mijozga tegishli ekani aniqlanadi."
      />

      <Exercise title="Mashq">
        <p>
          Quyidagi maydonchada <code>buyurtma_tafsilotlari</code> jadvalidan faqat{' '}
          <code>buyurtma_id = 5</code> bo'lgan qatorlarni tanlaydigan so'rov yozing. Nechta
          qator qaytishini va ularda qaysi <code>mahsulot_id</code>lar borligini oldindan
          taxmin qiling.
        </p>
        <SqlPlayground
          schema={PHASE2_SCHEMA}
          initialQuery={`SELECT * FROM buyurtma_tafsilotlari;`}
        />
        <Solution>
          <CodeBlock lang="sql">{`SELECT * FROM buyurtma_tafsilotlari WHERE buyurtma_id = 5;`}</CodeBlock>
          <p>
            Natijada 2 ta qator qaytadi: <code>mahsulot_id=7</code> (miqdor 2) va{' '}
            <code>mahsulot_id=4</code> (miqdor 1). Bu shuni bildiradiki, 5-buyurtmada mijoz
            ikkita xil mahsulot sotib olgan — buyurtma bitta bo'lsa ham, unda bir nechta
            mahsulot bo'lishi mumkin. Aynan shuning uchun{' '}
            <code>buyurtma_tafsilotlari</code> alohida jadval sifatida mavjud.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Mijozga oid ma'lumotni har bir buyurtma qatorida takrorlash joy isrof qiladi va
          ma'lumotlar nomuvofiq bo'lib qolish xavfini tug'diradi.
        </li>
        <li>
          Yechim — ma'lumotlarni alohida jadvallarga bo'lish: <code>mahsulotlar</code>,{' '}
          <code>mijozlar</code>, <code>buyurtmalar</code>, <code>buyurtma_tafsilotlari</code>.
        </li>
        <li>
          <strong>Tashqi kalit (foreign key)</strong> — boshqa jadvalning asosiy kalitiga
          ishora qiluvchi ustun. <code>buyurtmalar.mijoz_id</code> —{' '}
          <code>mijozlar.id</code>ga ishora qiladi.
        </li>
        <li>
          Hozircha jadvallarni alohida so'raymiz; ularni bog'lab, ism va buyurtmani bitta
          natijada ko'rsatish uchun <code>JOIN</code> kerak — bu keyingi mavzu.
        </li>
      </KeyPoints>
    </>
  )
}
