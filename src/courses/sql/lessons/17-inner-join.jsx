import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'INNER JOIN',
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

export default function InnerJoinLesson() {
  return (
    <>
      <h2>Jadvallarni birlashtirish</h2>
      <p>
        Oldingi darsda <code>mijozlar</code> va <code>buyurtmalar</code> jadvallarini alohida
        so'radik — biri ismni, ikkinchisi <code>mijoz_id</code>ni ko'rsatardi. Endi ikkalasini
        <strong> bitta natijada</strong> birlashtiramiz, shunda har bir buyurtma qatorida
        mijozning ismi ham ko'rinadi. Buning uchun <code>JOIN</code> kalit so'zi ishlatiladi.
      </p>

      <h2>JOIN sintaksisi</h2>
      <p>
        <code>JOIN</code> (to'liq nomi <code>INNER JOIN</code>, lekin SQLite'da{' '}
        <code>JOIN</code> deb yozsa ham bo'ladi) ikkita jadvalni umumiy ustun bo'yicha
        birlashtiradi:
      </p>
      <CodeBlock lang="sql">{`SELECT mijozlar.ism, buyurtmalar.sana
FROM mijozlar
JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id;`}</CodeBlock>
      <p>Bu so'rovning qismlari:</p>
      <ul>
        <li>
          <code>FROM mijozlar</code> — asosiy jadval sifatida <code>mijozlar</code>dan
          boshlaymiz.
        </li>
        <li>
          <code>JOIN buyurtmalar</code> — unga <code>buyurtmalar</code> jadvalini
          qo'shamiz.
        </li>
        <li>
          <code>ON mijozlar.id = buyurtmalar.mijoz_id</code> — bu ikki jadval qanday
          bog'lanishini ko'rsatadi: <code>mijozlar</code>ning <code>id</code>si{' '}
          <code>buyurtmalar</code>ning <code>mijoz_id</code>siga teng bo'lgan qatorlar
          birlashtiriladi. Aynan shu — o'tgan darsda ko'rgan tashqi kalit bog'lanishi.
        </li>
      </ul>
      <p>
        Diqqat qiling — ustun nomlari ikkala jadvalda ham uchramasligi mumkin bo'lsa-da
        (masalan, <code>mijoz_id</code> faqat <code>buyurtmalar</code>da bor), qaysi
        jadvaldan ekanini aniq ko'rsatish uchun <code>jadval.ustun</code> shaklida yozamiz —
        bu ayniqsa ikkala jadvalda ham <code>id</code> ustuni borligi sababli muhim.
      </p>

      <h2>Natijani sinab ko'ring</h2>
      <SqlPlayground
        schema={PHASE2_SCHEMA}
        initialQuery={`SELECT mijozlar.ism, buyurtmalar.sana
FROM mijozlar
JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id;`}
      />
      <p>
        Natijada 10 ta qator qaytadi — ma'lumotlar bazasida jami 10 ta buyurtma bor, va har
        bir buyurtma qatoriga tegishli mijozning ismi qo'shildi. Masalan, Aziz Karimov uchta
        marta uchraydi — chunki u uchta buyurtma bergan (JOIN natijasida uning ismi har bir
        buyurtma uchun alohida qatorda takrorlanadi, lekin bu safar bu — takrorlanish
        muammosi emas, balki natijaning tabiiy ko'rinishi: bitta mijoz, bir nechta buyurtma).
      </p>

      <h2>Diqqat: mos kelmagan qatorlar tushib qoladi</h2>
      <p>
        Ma'lumotlar bazasida 6 ta mijoz bor, lekin yuqoridagi natijada faqat 5 ta{' '}
        <strong>noyob</strong> ism ko'rinadi. Buni tekshirib ko'ring:
      </p>
      <CodeBlock lang="sql">{`SELECT DISTINCT mijozlar.ism
FROM mijozlar
JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id;`}</CodeBlock>
      <p>
        Bu — <code>JOIN</code>ning muhim xususiyati: agar mijozning{' '}
        <code>buyurtmalar</code> jadvalida <strong>hech qanday</strong> mos qatori bo'lmasa
        (ya'ni u hech qachon buyurtma bermagan bo'lsa), u natijada{' '}
        <strong>umuman ko'rinmaydi</strong>. <code>JOIN</code> (aniqrog'i,{' '}
        <code>INNER JOIN</code>) faqat <strong>ikkala jadvalda ham mos qatori bor</strong>{' '}
        yozuvlarni qaytaradi — shuning uchun "ichki" (inner) deb ataladi.
      </p>
      <Callout type="warning" title="INNER JOIN mos kelmagan qatorlarni tashlab yuboradi">
        Agar sizga <strong>hech qachon buyurtma bermagan mijozlar</strong> ham kerak bo'lsa
        (masalan, "qaysi mijozlarga eslatma yuborish kerak" degan savolga javob berish
        uchun), oddiy <code>JOIN</code> yetarli emas — u ularni butunlay ko'rsatmaydi. Buning
        yechimi keyingi darsda: <code>LEFT JOIN</code>.
      </Callout>

      <h2>Qaysi ustunlar chiqishini o'zingiz tanlaysiz</h2>
      <p>
        <code>SELECT</code> ro'yxatida ikkala jadvaldan xohlagan ustunlarni birga
        ko'rsatishingiz mumkin:
      </p>
      <CodeBlock lang="sql">{`SELECT mijozlar.ism, mijozlar.shahar, buyurtmalar.id, buyurtmalar.sana
FROM mijozlar
JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id;`}</CodeBlock>
      <p>
        Bu — mijozning ismi, shahri va uning har bir buyurtmasining raqami hamda sanasini
        bitta jadvalda ko'rsatadi. E'tibor bering, biz hech qachon <code>mijoz_id</code>ni
        o'zini SELECT qilmadik — u faqat <code>ON</code> shartida, jadvallarni bog'lash uchun
        ishlatildi.
      </p>

      <Quiz
        question="mijozlar JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id so'rovi qaysi qatorlarni qaytaradi?"
        options={[
          "Barcha mijozlarni, buyurtmasi bo'lsa ham, bo'lmasa ham",
          "Faqat kamida bitta buyurtma bergan mijozlarga tegishli qatorlarni — buyurtmasi yo'q mijozlar natijada umuman ko'rinmaydi",
          "Faqat buyurtmalar jadvalidagi barcha qatorlarni, mijozlar jadvaliga bog'lamasdan",
          "Faqat 2026-yildagi buyurtmalarni"
        ]}
        correctIndex={1}
        explanation="INNER JOIN (oddiy JOIN) faqat ikkala jadvalda ham mos qatori bo'lgan yozuvlarni qaytaradi. Hech qachon buyurtma bermagan mijoz buyurtmalar jadvalida moslashuvchi qatorga ega emas, shuning uchun natijadan butunlay tushib qoladi."
      />

      <Quiz
        question="JOIN so'rovidagi ON mijozlar.id = buyurtmalar.mijoz_id qismi nima uchun kerak?"
        options={[
          "U natijani alifbo tartibida saralaydi",
          "U ikki jadvalning qaysi ustunlari bo'yicha bog'lanishini ko'rsatadi — qaysi qatorlar 'mos keladi'gan hisoblanishini aniqlaydi",
          "U faqat 1-mijozning ma'lumotlarini ko'rsatadi",
          "U ikkita jadvalni bitta jadvalga birlashtirib, doimiy saqlaydi"
        ]}
        correctIndex={1}
        explanation="ON sharti JOIN'ning yuragi — u qaysi mezon bo'yicha ikki jadval qatorlari 'mos' deb hisoblanishini belgilaydi. Bu misolda, mijozning id'si buyurtmaning mijoz_id'siga teng bo'lgan qatorlar bog'lanadi."
      />

      <Exercise title="Mashq">
        <p>
          Quyidagi maydonchada <code>mijozlar</code> va <code>buyurtmalar</code> jadvallarini
          birlashtirib, faqat <code>Toshkent</code> shahridagi mijozlarning buyurtmalarini
          (ism va sana) ko'rsatadigan so'rov yozing. <code>JOIN</code> va{' '}
          <code>WHERE</code>ni birga ishlating.
        </p>
        <SqlPlayground
          schema={PHASE2_SCHEMA}
          initialQuery={`SELECT mijozlar.ism, buyurtmalar.sana
FROM mijozlar
JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id;`}
        />
        <Solution>
          <CodeBlock lang="sql">{`SELECT mijozlar.ism, buyurtmalar.sana
FROM mijozlar
JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id
WHERE mijozlar.shahar = 'Toshkent';`}</CodeBlock>
          <p>
            Natijada 5 ta qator qaytadi — Toshkentda ikkita mijoz bor (Aziz Karimov va
            Dilnoza Xolova), va ularning barcha buyurtmalari (Aziz — 3 ta, Dilnoza — 2 ta)
            ko'rsatiladi. <code>WHERE</code> shartini <code>JOIN</code>dan keyin, oddiy
            ustun shartlariga qo'shgandek yozish mumkin.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>JOIN ... ON ...</code> ikki jadvalni umumiy ustun (odatda asosiy kalit va
          tashqi kalit) bo'yicha birlashtiradi.
        </li>
        <li>
          <code>ON</code> shartidagi ustunlar qaysi qatorlar bir-biriga "mos" deb
          hisoblanishini belgilaydi.
        </li>
        <li>
          <code>JOIN</code> (to'liq nomi <code>INNER JOIN</code>) faqat{' '}
          <strong>ikkala jadvalda ham</strong> mos qatori bor yozuvlarni qaytaradi —
          moslashuvchi qatori yo'q yozuvlar (masalan, buyurtma bermagan mijozlar) natijada
          umuman ko'rinmaydi.
        </li>
        <li>
          Ikkala jadvaldagi istalgan ustunlarni <code>SELECT</code> ro'yxatida{' '}
          <code>jadval.ustun</code> shaklida birga ko'rsatish mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
