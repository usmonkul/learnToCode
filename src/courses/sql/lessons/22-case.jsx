import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'CASE',
  section: "Kengaytirilgan so'rovlar",
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

export default function CaseLesson() {
  return (
    <>
      <h2>Savol: mahsulotlarni narx bo'yicha toifalarga qanday ajratamiz?</h2>
      <p>
        Hozirgacha <code>WHERE</code> bilan qatorlarni <strong>tanlash</strong>ni (filtrlash)
        o'rgandik. Lekin ba'zan qatorlarni tashlab yubormasdan, ularga natijada yangi{' '}
        <strong>yorliq (label)</strong> qo'shmoqchi bo'lasiz — masalan, har bir mahsulotni
        narxiga qarab "Qimmat", "O'rtacha" yoki "Arzon" deb belgilash. Buning uchun{' '}
        <code>CASE</code> ishlatiladi.
      </p>

      <h2>CASE WHEN ... THEN ... ELSE ... END</h2>
      <p>
        <code>CASE</code> — <code>SELECT</code> ro'yxati ichida ishlatiladigan shartli
        ifoda. U yuqoridan pastga qarab shartlarni tekshiradi va birinchi to'g'ri kelgan{' '}
        <code>THEN</code>dagi qiymatni qaytaradi:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, narx,
  CASE
    WHEN narx > 1000000 THEN 'Qimmat'
    WHEN narx >= 200000 THEN 'O''rtacha'
    ELSE 'Arzon'
  END AS narx_toifasi
FROM mahsulotlar
ORDER BY narx;`}</CodeBlock>
      <p>
        Har bir qator uchun SQLite shartlarni ketma-ket tekshiradi: avval{' '}
        <code>narx &gt; 1000000</code>ni, agar u yolg'on bo'lsa —{' '}
        <code>narx &gt;= 200000</code>ni, va agar ikkalasi ham yolg'on bo'lsa —{' '}
        <code>ELSE</code>dagi <code>'Arzon'</code>ni qaytaradi. <code>END</code>{' '}
        <code>CASE</code>ni yakunlaydi, <code>AS narx_toifasi</code> esa natijadagi yangi
        ustunga nom beradi (21-darsdagi taxalluslarni eslang).
      </p>
      <p>
        Barcha 10 ta mahsulot bilan natijada uchta toifa hosil bo'ladi: eng arzon uchtasi —
        Sichqoncha (85000), Futbolka (95000) va Stol lampa (120000) — <code>'Arzon'</code>{' '}
        bo'ladi; o'rtadagi beshtasi — Sovg'a sertifikati (200000), Klaviatura (210000),
        Ryukzak (275000), Sport krossovka (380000) va Kitob tokchasi (650000) —{' '}
        <code>'O'rtacha'</code> bo'ladi; eng qimmat ikkitasi — Monitor (1500000) va Noutbuk
        (4500000) — <code>'Qimmat'</code> bo'ladi.
      </p>
      <p>
        Diqqat qiling — <code>Sovg'a sertifikati</code> aynan <code>200000</code> so'm, va u{' '}
        <code>'O'rtacha'</code> toifasiga tushdi, chunki ikkinchi shart{' '}
        <code>narx &gt;= 200000</code> (qat'iy emas, "katta yoki teng") — chegara qiymatning
        o'zi ham shu toifaga kiradi.
      </p>

      <Callout type="tip" title="Shartlar tartibi muhim">
        <code>CASE</code> shartlarni <strong>yuqoridan pastga</strong> ketma-ket tekshiradi
        va birinchi to'g'ri kelganidan keyin to'xtaydi — qolgan shartlarni tekshirmaydi.
        Shuning uchun eng qat'iy (tor) shartni birinchi, eng keng shartni oxiriga yozish
        kerak. Agar yuqoridagi misolda <code>narx &gt;= 200000</code> shartini birinchi
        yozsangiz, <code>Monitor</code> (1500000) ham noto'g'ri ravishda "O'rtacha" bo'lib
        chiqardi — chunki u ham <code>&gt;= 200000</code> shartiga mos keladi, va{' '}
        <code>CASE</code> shu yerda to'xtab qoladi.
      </Callout>

      <h2>Sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada narx toifalarini ishga tushiring, so'ng chegaralarni
        o'zgartirib (masalan, <code>1000000</code> o'rniga <code>500000</code>) natija
        qanday o'zgarishini kuzating:
      </p>
      <SqlPlayground
        schema={PHASE2_SCHEMA}
        initialQuery={`SELECT nom, narx,
  CASE
    WHEN narx > 1000000 THEN 'Qimmat'
    WHEN narx >= 200000 THEN 'O''rtacha'
    ELSE 'Arzon'
  END AS narx_toifasi
FROM mahsulotlar
ORDER BY narx;`}
      />

      <h2>CASE va GROUP BY birga: har bir toifada nechta mahsulot bor</h2>
      <p>
        <code>CASE</code> natijasini taxallus bilan nomlab, keyin unga qarab{' '}
        <code>GROUP BY</code> qilish ham mumkin — bu 14-darsda o'rgangan{' '}
        <code>GROUP BY</code>ning tabiiy davomi:
      </p>
      <CodeBlock lang="sql">{`SELECT
  CASE
    WHEN narx > 1000000 THEN 'Qimmat'
    WHEN narx >= 200000 THEN 'O''rtacha'
    ELSE 'Arzon'
  END AS narx_toifasi,
  COUNT(*) AS soni
FROM mahsulotlar
GROUP BY narx_toifasi;`}</CodeBlock>
      <p>
        Natija: <strong>Arzon — 3 ta</strong> (Sichqoncha, Futbolka, Stol lampa),{' '}
        <strong>O'rtacha — 5 ta</strong> (Sovg'a sertifikati, Klaviatura, Ryukzak, Sport
        krossovka, Kitob tokchasi), <strong>Qimmat — 2 ta</strong> (Monitor, Noutbuk).
        SQLite <code>SELECT</code> ro'yxatidagi <code>AS narx_toifasi</code> taxallusini{' '}
        <code>GROUP BY</code>da qayta ishlatishga ruxsat beradi — uni yana bir marta{' '}
        <code>CASE</code> bilan yozish shart emas.
      </p>

      <Quiz
        question="CASE WHEN narx > 1000000 THEN 'Qimmat' WHEN narx >= 200000 THEN 'O'rtacha' ELSE 'Arzon' END ifodasida Sovg'a sertifikati (narx = 200000) qaysi toifaga tushadi?"
        options={[
          "Qimmat, chunki 200000 eng katta shartga mos keladi",
          "O'rtacha, chunki narx >= 200000 sharti to'g'ri va bu ELSE dan oldin tekshiriladi",
          "Arzon, chunki 200000 kichik son hisoblanadi",
          "Hech qaysi biriga — CASE bu qiymatni qayta ishlay olmaydi"
        ]}
        correctIndex={1}
        explanation="Shartlar yuqoridan pastga tekshiriladi: narx > 1000000 yolg'on (200000 dan katta emas), keyingi narx >= 200000 esa to'g'ri (200000, 200000 ga teng) — shuning uchun 'O'rtacha' qaytadi, ELSE ga yetib bormaydi."
      />

      <Quiz
        question="CASE ifodasida bir nechta WHEN shart bir vaqtda to'g'ri bo'lsa, natija qanday aniqlanadi?"
        options={[
          "Barcha to'g'ri shartlarning THEN qiymatlari vergul bilan birlashtiriladi",
          "Eng oxirgi yozilgan to'g'ri shart ustunlik qiladi",
          "Birinchi (eng yuqorida yozilgan) to'g'ri kelgan WHEN ning THEN qiymati qaytadi, qolganlari tekshirilmaydi",
          "SQLite xatolik chiqaradi, chunki shartlar bir-biriga zid"
        ]}
        correctIndex={2}
        explanation="CASE shartlarni tepadan pastga ketma-ket tekshiradi va birinchi to'g'ri kelganidan keyin darhol to'xtaydi. Shuning uchun shartlar tartibi (tordan kengga) muhim."
      />

      <Exercise title="Mashq">
        <p>
          <code>CASE</code> yordamida har bir mahsulotni "Qimmat" (narx {'>'} 1000000) yoki
          "Oddiy" (qolgan hammasi) deb ikkita toifaga ajratadigan so'rov yozing, natijada{' '}
          <code>nom</code> va toifa ustunini ko'rsating.
        </p>
        <SqlPlayground
          schema={PHASE2_SCHEMA}
          initialQuery={`SELECT nom,
  CASE
    WHEN narx > 1000000 THEN 'Qimmat'
    ELSE 'Oddiy'
  END AS toifa
FROM mahsulotlar
ORDER BY narx DESC;`}
        />
        <Solution>
          <CodeBlock lang="sql">{`SELECT nom,
  CASE
    WHEN narx > 1000000 THEN 'Qimmat'
    ELSE 'Oddiy'
  END AS toifa
FROM mahsulotlar
ORDER BY narx DESC;`}</CodeBlock>
          <p>
            Ikkita mahsulot — Noutbuk (4500000) va Monitor (1500000) — "Qimmat" bo'ladi,
            qolgan 8 tasi (shu jumladan aynan 1000000 so'm chegarasidan past bo'lgan Kitob
            tokchasi, 650000) "Oddiy" bo'ladi. Ikki toifali <code>CASE</code>da{' '}
            <code>ELSE</code> yagona "qolgan hamma narsa" shartini bajaradi — qo'shimcha{' '}
            <code>WHEN</code> shart shart emas.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>CASE WHEN ... THEN ... ELSE ... END</code> — <code>SELECT</code> ro'yxati
          ichida qator bo'yicha shartli qiymat qaytaruvchi ifoda.
        </li>
        <li>
          Shartlar tepadan pastga ketma-ket tekshiriladi, birinchi to'g'ri kelgani
          tanlanadi — qolganlari tekshirilmaydi, shuning uchun tartib muhim.
        </li>
        <li>
          <code>ELSE</code> — hech qaysi <code>WHEN</code> shartga mos kelmagan barcha
          qatorlar uchun standart qiymat.
        </li>
        <li>
          <code>CASE</code> natijasiga <code>AS</code> bilan taxallus berib, uni{' '}
          <code>GROUP BY</code> bilan birga ishlatish mumkin — toifalar bo'yicha
          hisoblash uchun.
        </li>
      </KeyPoints>
    </>
  )
}
