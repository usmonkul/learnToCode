import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'INSERT',
  section: "Ma'lumotlarni o'zgartirish",
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

export default function InsertLesson() {
  return (
    <>
      <h2>Endi ma'lumotni o'zgartiramiz</h2>
      <p>
        1-dan 22-darsgacha faqat <code>SELECT</code> bilan ma'lumotni <strong>o'qidik</strong> —
        jadvallardagi qatorlarni hech qachon o'zgartirmadik. Endi yangi bo'limni boshlaymiz:{' '}
        <strong>ma'lumotlarni o'zgartirish (DML — Data Manipulation Language)</strong>. Bu
        bo'limda uchta buyruqni o'rganasiz: <code>INSERT</code> (yangi qator qo'shish),{' '}
        <code>UPDATE</code> (mavjud qatorni o'zgartirish) va <code>DELETE</code> (qatorni
        o'chirish). Ushbu darsda birinchisidan — <code>INSERT</code>dan — boshlaymiz.
      </p>

      <h2>INSERT INTO ... VALUES ...</h2>
      <p>
        <code>INSERT</code> jadvalga yangi qator qo'shadi. Sintaksis: jadval nomidan keyin
        qavs ichida <strong>qaysi ustunlarga</strong> qiymat berayotganingizni yozasiz, so'ng{' '}
        <code>VALUES</code> so'zidan keyin — xuddi shu tartibda — qiymatlarning o'zini:
      </p>
      <CodeBlock lang="sql">{`INSERT INTO mijozlar (ism, email, shahar)
VALUES ('Nodira Aliyeva', 'nodira@mail.uz', 'Farg''ona');`}</CodeBlock>
      <p>
        Bu yerda muhim narsa — <strong>ustunlar ro'yxati va qiymatlar tartibi mos kelishi
        kerak</strong>: birinchi ustunga (<code>ism</code>) birinchi qiymat (
        <code>'Nodira Aliyeva'</code>) tushadi, ikkinchisiga (<code>email</code>) ikkinchisi,
        va hokazo. E'tibor bering — <code>'Farg'ona'</code> so'zidagi apostrofni SQLda ikkita
        apostrof bilan yozish kerak (<code>'Farg''ona'</code>), aks holda SQL uni satrning
        oxiri deb tushunadi.
      </p>

      <h2>id ustunini nega yozmadik?</h2>
      <p>
        <code>mijozlar</code> jadvalidagi <code>id</code> ustuni{' '}
        <code>INTEGER PRIMARY KEY</code> qilib e'lon qilingan (16-darsni eslang). SQLite
        uchun bu maxsus holat: agar <code>INSERT</code>da <code>id</code>ni ko'rsatmasangiz,
        SQLite uni <strong>o'zi avtomatik ravishda</strong> — jadvaldagi eng katta mavjud{' '}
        <code>id</code>dan bittaga katta qilib — belgilaydi. Bizning{' '}
        <code>mijozlar</code> jadvalimizda oxirgi mijoz <code>id = 6</code> (Zarina Nabieva),
        shuning uchun yuqoridagi so'rovni ishga tushirganda Nodira Aliyeva{' '}
        <code>id = 7</code> bilan qo'shiladi — buni pastdagi maydonchada o'zingiz tekshirib
        ko'rasiz.
      </p>

      <Callout type="tip" title="id ni qachon yozish kerak, qachon kerak emas">
        Agar ustunlar ro'yxatida <code>id</code>ni tushirib qoldirsangiz (yuqoridagi kabi),
        SQLite uni avtomatik beradi — odatda shunday qilingani ma'qul, chunki qo'lda id
        tanlash xato yoki takrorlanishga olib kelishi mumkin. <code>id</code>ni faqat aniq
        bir qiymat berish zarur bo'lganda (masalan, boshlang'ich ma'lumotlarni yuklashda,
        Phase 2 sxemasidagi kabi) qo'lda yozamiz.
      </Callout>

      <h2>Sinab ko'ring: qo'shing, keyin tekshiring</h2>
      <p>
        Quyidagi maydonchada <code>INSERT</code> so'rovi tayyor turibdi. <strong>Bajarish</strong>{' '}
        tugmasini bosing — natijada jadval ko'rinmaydi, chunki <code>INSERT</code> hech qanday
        qator qaytarmaydi, faqat "so'rov muvaffaqiyatli bajarildi" degan xabar chiqadi. Yangi
        qator haqiqatan ham qo'shilganini bilish uchun — matn maydonini{' '}
        <code>SELECT * FROM mijozlar;</code> ga o'zgartirib, yana <strong>Bajarish</strong>ni
        bosing. Diqqat qiling: bu — <strong>bitta</strong> maydoncha, uning ichidagi baza
        ikkala bosishda ham bir xil (qayta tiklanmaydi) — shuning uchun birinchi bosishda
        qo'shgan qatoringiz ikkinchi bosishda natijada ko'rinadi.
      </p>
      <SqlPlayground
        schema={PHASE2_SCHEMA}
        initialQuery={`INSERT INTO mijozlar (ism, email, shahar)
VALUES ('Nodira Aliyeva', 'nodira@mail.uz', 'Farg''ona');`}
      />
      <p>
        <code>SELECT * FROM mijozlar;</code> ni ishga tushirganingizda, ro'yxat oxirida{' '}
        <code>7 | Nodira Aliyeva | nodira@mail.uz | Farg'ona</code> qatorini ko'rasiz —{' '}
        <code>id</code> avtomatik <code>7</code> bo'lib belgilangan.
      </p>

      <Callout type="note" title="Har doim SELECT bilan tekshiring">
        Bu — DML bilan ishlashning eng muhim odati: <code>INSERT</code>, <code>UPDATE</code>{' '}
        yoki <code>DELETE</code>dan so'ng natija ko'rinmasligi mumkin, shuning uchun{' '}
        o'zgarish haqiqatan ham kutganingizdek bo'lganini tekshirish uchun{' '}
        <code>SELECT</code> so'rovini qayta ishga tushiring. Bu odat 24- va 25-darslarda —{' '}
        <code>UPDATE</code> va <code>DELETE</code>da — ham xuddi shunday qo'l keladi.
      </Callout>

      <Quiz
        question="mijozlar jadvaliga INSERT qilganda id ustunini yozmasangiz, nima bo'ladi?"
        options={[
          "SQLite xatolik chiqaradi, chunki id majburiy ustun",
          "id ustuni bo'sh (NULL) qoladi",
          "SQLite eng katta mavjud id dan bittaga katta qiymatni avtomatik beradi, chunki id INTEGER PRIMARY KEY",
          "id har doim 1 bo'lib qoladi"
        ]}
        correctIndex={2}
        explanation="INTEGER PRIMARY KEY ustuni SQLite'da avtomatik o'sadigan identifikator vazifasini bajaradi — id ko'rsatilmasa, jadvaldagi eng katta mavjud qiymatdan bittaga katta son avtomatik beriladi."
      />

      <Quiz
        question="INSERT INTO mijozlar (ism, shahar) VALUES ('Bek', 'Andijon', 'ortiqcha') so'rovi nega xato beradi?"
        options={[
          "Chunki ustunlar ro'yxatida 2 ta ustun bor, lekin VALUES da 3 ta qiymat berilgan — ular soni mos kelishi kerak",
          "Chunki shahar ustuni mavjud emas",
          "Chunki ism ustuniga matn yozib bo'lmaydi",
          "Bu so'rov xato bermaydi, muvaffaqiyatli bajariladi"
        ]}
        correctIndex={0}
        explanation="Ustunlar ro'yxati va VALUES qiymatlari soni va tartibi bir-biriga mos kelishi shart — ustunlar ro'yxatida ikkita nom (ism, shahar) bo'lsa, VALUES ham aynan ikkita qiymat berishi kerak."
      />

      <Exercise title="Mashq">
        <p>
          <code>mahsulotlar</code> jadvaliga yangi mahsulot qo'shing: nomi{' '}
          <code>'Simsiz naushnik'</code>, narxi <code>320000</code>, kategoriyasi{' '}
          <code>'Elektronika'</code>. <code>id</code>ni yozmang — u avtomatik belgilansin.
          So'ng <code>SELECT</code> bilan yangi qatorni topib, unga qanday <code>id</code>{' '}
          berilganini tekshiring.
        </p>
        <SqlPlayground
          schema={PHASE2_SCHEMA}
          initialQuery={`INSERT INTO mahsulotlar (nom, narx, kategoriya)
VALUES ('Simsiz naushnik', 320000, 'Elektronika');`}
        />
        <Solution>
          <CodeBlock lang="sql">{`INSERT INTO mahsulotlar (nom, narx, kategoriya)
VALUES ('Simsiz naushnik', 320000, 'Elektronika');

SELECT * FROM mahsulotlar WHERE nom = 'Simsiz naushnik';`}</CodeBlock>
          <p>
            <code>mahsulotlar</code> jadvalida oxirgi mavjud <code>id</code> — <code>10</code>{' '}
            (Sovg'a sertifikati), shuning uchun yangi "Simsiz naushnik" avtomatik ravishda{' '}
            <code>id = 11</code> bilan qo'shiladi. Buni tekshirish uchun so'rovni ikkiga
            bo'lib, avval <code>INSERT</code>ni, keyin <code>SELECT</code>ni alohida ishga
            tushirishingiz mumkin — maydoncha bitta so'rov ichida ham ikkalasini ketma-ket
            bajaradi va faqat oxirgisining natijasini ko'rsatadi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>INSERT INTO jadval (ustun1, ustun2, ...) VALUES (qiymat1, qiymat2, ...)</code>{' '}
          — yangi qator qo'shadi; ustunlar va qiymatlar tartibi bir-biriga mos kelishi shart.
        </li>
        <li>
          <code>INTEGER PRIMARY KEY</code> ustunini <code>INSERT</code>da tushirib qoldirsangiz,
          SQLite uni avtomatik — mavjud eng katta qiymatdan bittaga katta qilib — beradi.
        </li>
        <li>
          Satr ichidagi apostrofni <code>''</code> (ikkita apostrof) bilan escape qilish kerak.
        </li>
        <li>
          <code>INSERT</code> natijada jadval qaytarmaydi — o'zgarish haqiqatan ham
          bo'lganini tekshirish uchun har doim <code>SELECT</code>ni qayta ishga tushiring.
        </li>
      </KeyPoints>
    </>
  )
}
