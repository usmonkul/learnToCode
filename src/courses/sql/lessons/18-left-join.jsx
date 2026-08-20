import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'LEFT JOIN',
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

export default function LeftJoinLesson() {
  return (
    <>
      <h2>Muammo: yo'qolgan mijoz</h2>
      <p>
        Oldingi darsda ko'rdikki, <code>JOIN</code> faqat ikkala jadvalda ham mos qatori bor
        yozuvlarni qaytaradi. Ma'lumotlar bazasida 6 ta mijoz bor, lekin{' '}
        <code>mijozlar JOIN buyurtmalar</code> natijasida faqat 5 ta noyob ism ko'rinadi.
        Kim yo'qoladi? Tekshirib ko'ramiz:
      </p>
      <CodeBlock lang="sql">{`SELECT mijozlar.ism, buyurtmalar.id AS buyurtma_id
FROM mijozlar
JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id
WHERE mijozlar.ism = 'Zarina Nabieva';`}</CodeBlock>
      <p>
        Bu so'rovni sinab ko'ring — natija <strong>bo'sh</strong> bo'ladi. Sabab: Zarina
        Nabieva hech qachon buyurtma bermagan, shuning uchun <code>buyurtmalar</code>{' '}
        jadvalida uning <code>mijoz_id</code>siga mos qator umuman yo'q. <code>JOIN</code>{' '}
        uchun mos qator topilmagani sababli, Zarina butun natijadan tushib qoladi — hatto
        biz uning ismini aniq <code>WHERE</code> bilan so'ragan bo'lsak ham.
      </p>

      <h2>LEFT JOIN — "chapdagi" jadvalning barcha qatorlarini saqlab qol</h2>
      <p>
        Ba'zan bizga aynan <strong>mos kelmagan</strong> qatorlar kerak bo'ladi — masalan,
        "qaysi mijozlar hali birorta ham buyurtma bermagan?" degan savolga javob berish
        uchun. Buning uchun <code>LEFT JOIN</code> ishlatiladi:
      </p>
      <CodeBlock lang="sql">{`SELECT mijozlar.ism, buyurtmalar.id AS buyurtma_id, buyurtmalar.sana
FROM mijozlar
LEFT JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id;`}</CodeBlock>
      <p>
        <code>LEFT JOIN</code> — <code>FROM</code>dan keyingi jadvalni ("chap" jadval,{' '}
        <code>mijozlar</code>) <strong>to'liq</strong> saqlaydi. Agar biror mijoz uchun{' '}
        <code>buyurtmalar</code>da mos qator topilmasa, u baribir natijada qoladi — lekin{' '}
        <code>buyurtmalar</code>ga tegishli ustunlar (<code>buyurtma_id</code>,{' '}
        <code>sana</code>) <code>NULL</code> bilan to'ldiriladi.
      </p>

      <h2>INNER JOIN va LEFT JOIN — yonma-yon</h2>
      <p>
        Ikkalasini solishtiramiz. Avval oddiy <code>JOIN</code> (INNER JOIN):
      </p>
      <CodeBlock lang="sql">{`SELECT mijozlar.ism, buyurtmalar.id AS buyurtma_id, buyurtmalar.sana
FROM mijozlar
JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id
ORDER BY mijozlar.id;`}</CodeBlock>
      <p>Natija — 10 ta qator, Zarina Nabieva umuman ko'rinmaydi.</p>
      <p>Endi <code>LEFT JOIN</code>:</p>
      <CodeBlock lang="sql">{`SELECT mijozlar.ism, buyurtmalar.id AS buyurtma_id, buyurtmalar.sana
FROM mijozlar
LEFT JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id
ORDER BY mijozlar.id;`}</CodeBlock>
      <p>
        Natija — 11 ta qator (10 ta buyurtma + Zarina uchun 1 ta qo'shimcha qator). Oxirgi
        qatorda:
      </p>
      <CodeBlock lang="text">{`ism             | buyurtma_id | sana
Zarina Nabieva  | NULL        | NULL`}</CodeBlock>
      <p>
        Zarina endi natijada bor, lekin uning buyurtmaga oid ustunlari{' '}
        <code>NULL</code> — chunki unga mos keladigan buyurtma haqiqatan ham mavjud emas.
      </p>
      <Callout type="note" title="INNER JOIN va LEFT JOIN farqi">
        <code>JOIN</code> (INNER JOIN) — faqat ikkala jadvalda ham mos qatori bor yozuvlar.{' '}
        <code>LEFT JOIN</code> — chap jadvalning <strong>barcha</strong> qatorlari, mos
        kelmaganlari uchun o'ng jadval ustunlari <code>NULL</code> bilan to'ldiriladi.
      </Callout>

      <h2>Sinab ko'ring: Zarinani topish</h2>
      <p>
        Quyidagi maydonchada <code>LEFT JOIN</code> so'rovini ishga tushiring va natijada
        Zarina Nabievaning qatorini toping. So'ng <code>LEFT JOIN</code>ni oddiy{' '}
        <code>JOIN</code>ga o'zgartirib qayta ishga tushiring — Zarina yo'qolganini kuzating.
      </p>
      <SqlPlayground
        schema={PHASE2_SCHEMA}
        initialQuery={`SELECT mijozlar.ism, buyurtmalar.id AS buyurtma_id, buyurtmalar.sana
FROM mijozlar
LEFT JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id
ORDER BY mijozlar.id;`}
      />

      <h2>Faqat mos kelmaganlarni topish: IS NULL</h2>
      <p>
        "Hech qachon buyurtma bermagan mijozlar" ro'yxatini olish uchun{' '}
        <code>LEFT JOIN</code>ni <code>WHERE ... IS NULL</code> bilan birga ishlatamiz (bu —
        9-darsda o'rgangan <code>IS NULL</code>ning yangi, foydali qo'llanilishi):
      </p>
      <CodeBlock lang="sql">{`SELECT mijozlar.ism
FROM mijozlar
LEFT JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id
WHERE buyurtmalar.id IS NULL;`}</CodeBlock>
      <p>
        Bu so'rov faqat 1 ta qator qaytaradi: <code>Zarina Nabieva</code>. Mantiq: agar{' '}
        <code>LEFT JOIN</code>dan keyin <code>buyurtmalar.id</code> <code>NULL</code> bo'lsa,
        demak o'sha mijoz uchun hech qanday mos buyurtma topilmagan — ya'ni u hech qachon
        buyurtma bermagan.
      </p>

      <Quiz
        question="mijozlar LEFT JOIN buyurtmalar so'rovida, buyurtmasi bo'lmagan mijoz natijada qanday ko'rinadi?"
        options={[
          "U natijadan butunlay tushib qoladi, xuddi INNER JOIN'dagidek",
          "U natijada qoladi, lekin buyurtmalar jadvaliga tegishli ustunlari NULL bo'ladi",
          "SQLite xato beradi, chunki mos qator topilmaydi",
          "U natijada qoladi, lekin buyurtmalar ustunlari 0 bilan to'ldiriladi"
        ]}
        correctIndex={1}
        explanation="LEFT JOIN chap jadvalning (bu yerda mijozlar) barcha qatorlarini saqlaydi. Mos kelmagan qatorlar uchun o'ng jadval (buyurtmalar) ustunlari NULL qiymat bilan to'ldiriladi — 0 emas, chunki 0 'buyurtma yo'q' emas, 'mos yozuv yo'q' degani."
      />

      <Quiz
        question="Hech qachon buyurtma bermagan mijozlarni topish uchun eng to'g'ri yondashuv qaysi?"
        options={[
          "mijozlar JOIN buyurtmalar ON ... — oddiy JOIN ishlatish",
          "mijozlar LEFT JOIN buyurtmalar ON ... WHERE buyurtmalar.id IS NULL",
          "mijozlar LEFT JOIN buyurtmalar ON ... WHERE buyurtmalar.id = 0",
          "Faqat SELECT * FROM mijozlar; yozib, natijani ko'zdan kechirish"
        ]}
        correctIndex={1}
        explanation="LEFT JOIN barcha mijozlarni saqlaydi, mos kelmaganlar uchun buyurtmalar ustunlari NULL bo'ladi. WHERE buyurtmalar.id IS NULL shu NULL qatorlarni, ya'ni mos buyurtmasi bo'lmagan mijozlarni ajratib beradi."
      />

      <Exercise title="Mashq">
        <p>
          Quyidagi maydonchada <code>mijozlar</code> va <code>buyurtmalar</code>ni{' '}
          <code>LEFT JOIN</code> bilan birlashtirib, har bir mijozning ismi va u bergan
          buyurtmalar soni (<code>COUNT</code>) chiqadigan so'rov yozing —{' '}
          <code>GROUP BY mijozlar.ism</code> ishlating. Zarina Nabieva uchun necha ta
          buyurtma chiqishini oldindan taxmin qiling.
        </p>
        <SqlPlayground
          schema={PHASE2_SCHEMA}
          initialQuery={`SELECT mijozlar.ism, buyurtmalar.id
FROM mijozlar
LEFT JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id;`}
        />
        <Solution>
          <CodeBlock lang="sql">{`SELECT mijozlar.ism, COUNT(buyurtmalar.id) AS buyurtmalar_soni
FROM mijozlar
LEFT JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id
GROUP BY mijozlar.ism;`}</CodeBlock>
          <p>
            Zarina Nabieva uchun natija <code>0</code> chiqadi —{' '}
            <code>COUNT(buyurtmalar.id)</code> faqat <code>NULL</code> bo'lmagan qiymatlarni
            sanaydi (<code>COUNT(*)</code>dan farqli, u <code>NULL</code> qatorni ham
            sanagan bo'lardi). Shuning uchun bu yerda aynan <code>COUNT(buyurtmalar.id)</code>{' '}
            ishlatildi, <code>COUNT(*)</code> emas.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>JOIN</code> (INNER JOIN) mos kelmagan qatorlarni butunlay tashlab yuboradi —
          buyurtmasi yo'q mijoz natijada umuman ko'rinmaydi.
        </li>
        <li>
          <code>LEFT JOIN</code> chap jadvalning (<code>FROM</code>dan keyingi) barcha
          qatorlarini saqlaydi; mos kelmagan qatorlar uchun o'ng jadval ustunlari{' '}
          <code>NULL</code> bo'ladi.
        </li>
        <li>
          Zarina Nabieva — hech qachon buyurtma bermagan mijoz: u <code>INNER JOIN</code>{' '}
          natijasida yo'q, lekin <code>LEFT JOIN</code> natijasida <code>NULL</code>{' '}
          buyurtma ustunlari bilan bor.
        </li>
        <li>
          <code>LEFT JOIN ... WHERE right_table.col IS NULL</code> — "mos yozuvi yo'q"
          qatorlarni topishning standart usuli.
        </li>
      </KeyPoints>
    </>
  )
}
