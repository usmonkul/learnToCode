import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: "Quyi so'rovlar (Subqueries)",
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

export default function QuyiSorovlarLesson() {
  return (
    <>
      <h2>Savol: qaysi mahsulotlar hech bo'lmaganda bir marta sotib olingan?</h2>
      <p>
        Oldingi darsda 4 ta jadvalni <code>JOIN</code> qilib shunga o'xshash savollarga javob
        topgan edik. Lekin ba'zan bizga mahsulotning nomi, miqdori yoki sana kerak emas —
        shunchaki "qaysi mahsulotlar sotib olingan" degan oddiy ro'yxat kerak. Bunday hollarda{' '}
        <strong>quyi so'rov (subquery)</strong> — ya'ni <code>so'rov ichidagi so'rov</code> —{' '}
        <code>JOIN</code>dan ko'ra qulayroq bo'lishi mumkin.
      </p>

      <h2>Quyi so'rov qanday ishlaydi</h2>
      <p>
        Avval, qaysi mahsulotlar sotib olinganini bilish uchun{' '}
        <code>buyurtma_tafsilotlari</code> jadvalidan <code>mahsulot_id</code>larni olamiz:
      </p>
      <CodeBlock lang="sql">{`SELECT mahsulot_id FROM buyurtma_tafsilotlari;`}</CodeBlock>
      <p>
        Bu so'rov 13 ta qator qaytaradi (ba'zi <code>id</code>lar takrorlanadi — masalan,
        1-mahsulot bir necha marta sotib olingan). Endi shu ro'yxatni{' '}
        <code>mahsulotlar</code> jadvalidagi <code>id</code> bilan solishtirish uchun{' '}
        <code>IN</code>ni ishlatamiz — bu <code>IN</code>ni allaqachon 10-darsda ko'rgan
        edingiz, faqat u yerda qiymatlar qo'lda yozilgan edi (<code>IN (1, 2, 3)</code>),
        endi esa ular boshqa so'rovdan keladi:
      </p>
      <CodeBlock lang="sql">{`SELECT nom
FROM mahsulotlar
WHERE id IN (SELECT mahsulot_id FROM buyurtma_tafsilotlari);`}</CodeBlock>
      <p>
        Qavs ichidagi <code>SELECT mahsulot_id FROM buyurtma_tafsilotlari</code> —{' '}
        <strong>ichki so'rov (inner query)</strong>. Tashqaridagi{' '}
        <code>SELECT nom FROM mahsulotlar WHERE id IN (...)</code> —{' '}
        <strong>tashqi so'rov (outer query)</strong>. Natijada 8 ta mahsulot nomi chiqadi:
        Noutbuk, Sichqoncha, Klaviatura, Monitor, Stol lampa, Kitob tokchasi, Sport krossovka
        va Futbolka.
      </p>

      <Callout type="tip" title="Ichki so'rov mustaqil ishlaydi">
        Quyi so'rovni tushunishning eng oson yo'li — ichki so'rovni <strong>alohida</strong>{' '}
        so'rov sifatida tasavvur qilish. Kontseptual jihatdan, avval ichki so'rov mustaqil
        ravishda ishga tushadi va bir ustunli qiymatlar ro'yxatini hosil qiladi (bizning
        misolimizda — 13 ta <code>mahsulot_id</code>). Keyin tashqi so'rov shu ro'yxatni
        oddiy <code>IN (...)</code> ro'yxati kabi ishlatadi. Chalkashib qolsangiz, ichki
        so'rovni alohida ko'chirib, uni <code>SqlPlayground</code>da mustaqil ishga tushiring
        — natijasini ko'rib, keyin butun so'rovga qaytaring.
      </Callout>

      <h2>Sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada ichki so'rovni ham, to'liq quyi so'rovni ham ishga tushirib
        ko'ring — natijalar sonini solishtiring:
      </p>
      <SqlPlayground
        schema={PHASE2_SCHEMA}
        initialQuery={`SELECT nom
FROM mahsulotlar
WHERE id IN (SELECT mahsulot_id FROM buyurtma_tafsilotlari);`}
      />

      <h2>Teskarisi: hech qachon sotib olinmagan mahsulotlar</h2>
      <p>
        <code>IN</code> o'rniga <code>NOT IN</code> ishlatsak, natija teskari bo'ladi —
        ro'yxatda <strong>bo'lmagan</strong> qatorlar qaytadi:
      </p>
      <CodeBlock lang="sql">{`SELECT nom
FROM mahsulotlar
WHERE id NOT IN (SELECT mahsulot_id FROM buyurtma_tafsilotlari);`}</CodeBlock>
      <p>
        Natijada 2 ta mahsulot chiqadi: <strong>Ryukzak</strong> va{' '}
        <strong>Sovg'a sertifikati</strong> — bu ikkalasi hech qanday buyurtmada uchramagan.
        Bu ayni shu maqsad uchun <code>JOIN</code>dan ancha qulayroq: buni <code>JOIN</code>{' '}
        bilan yozish uchun <code>LEFT JOIN</code> va <code>IS NULL</code> kerak bo'lar edi
        (18-darsni eslang), quyi so'rov esa savolni to'g'ridan-to'g'ri, o'z so'zlari bilan
        ifodalaydi.
      </p>

      <h2>Quyi so'rov ichida yana quyi so'rov</h2>
      <p>
        Quyi so'rovlarni bir-biriga ichma-ich joylashtirish ham mumkin. Masalan, Aziz
        Karimov (1-mijoz) qaysi mahsulotlarni sotib olganini toping — buning uchun avval
        uning buyurtmalarini, keyin shu buyurtmalardagi mahsulot idlarini topish kerak:
      </p>
      <CodeBlock lang="sql">{`SELECT nom
FROM mahsulotlar
WHERE id IN (
  SELECT mahsulot_id FROM buyurtma_tafsilotlari
  WHERE buyurtma_id IN (
    SELECT id FROM buyurtmalar WHERE mijoz_id = 1
  )
);`}</CodeBlock>
      <p>
        Bu yerda uchta qatlam bor: eng ichkarida Aziz Karimovning buyurtma <code>id</code>
        larini topamiz, o'rtada shu buyurtmalardagi mahsulot <code>id</code>larini topamiz,
        eng tashqarida esa shu idlarga mos mahsulot nomlarini chiqaramiz. Natija: Noutbuk,
        Sichqoncha, Monitor. Har bir qatlam avvalgisining natijasidan foydalanadi — xuddi
        matryoshka qo'g'irchoq kabi.
      </p>
      <Callout type="note" title="Juda chuqurlashtirmang">
        Ichma-ich quyi so'rovlar ishlaydi, lekin ular 2-3 qatlamdan oshsa o'qish qiyinlashadi.
        Ko'pincha xuddi shu natijani <code>JOIN</code> bilan ham olish mumkin — qaysi biri
        aniqroq va o'qilishi osonroq bo'lsa, o'shani tanlang.
      </Callout>

      <Quiz
        question="SELECT nom FROM mahsulotlar WHERE id IN (SELECT mahsulot_id FROM buyurtma_tafsilotlari) so'rovida ichki so'rov nima qaytaradi?"
        options={[
          "Mahsulotlar jadvalidagi barcha mahsulot nomlarini",
          "buyurtma_tafsilotlari jadvalidagi mahsulot_id qiymatlari ro'yxatini (takrorlanishlar bilan)",
          "Faqat eng qimmat mahsulotning id sini",
          "Hech narsa — ichki so'rov faqat tashqi so'rov bilan birga ishlaydi"
        ]}
        correctIndex={1}
        explanation="Ichki so'rov mustaqil ravishda buyurtma_tafsilotlari jadvalidan mahsulot_id ustunini oladi — 13 ta qator, ba'zi qiymatlar takrorlangan holda. Tashqi so'rov keyin shu ro'yxatni IN orqali filtr sifatida ishlatadi."
      />

      <Quiz
        question="WHERE id NOT IN (SELECT mahsulot_id FROM buyurtma_tafsilotlari) so'rovi nechta mahsulot qaytaradi va nima uchun?"
        options={[
          "8 ta — sotib olingan mahsulotlar",
          "10 ta — barcha mahsulotlar, chunki NOT IN filtrni bekor qiladi",
          "2 ta — Ryukzak va Sovg'a sertifikati, chunki ular hech qanday buyurtma tafsilotida uchramaydi",
          "0 ta — chunki NOT IN har doim bo'sh natija qaytaradi"
        ]}
        correctIndex={2}
        explanation="NOT IN ichki so'rov ro'yxatida yo'q qiymatlarni tanlaydi. buyurtma_tafsilotlari jadvalida hech qachon uchramaydigan ikkita mahsulot — Ryukzak (9) va Sovg'a sertifikati (10) — natijada qoladi."
      />

      <Exercise title="Mashq">
        <p>
          Quyi so'rov yordamida, hech bo'lmaganda bitta buyurtma bergan mijozlarning ismini
          chiqaradigan so'rov yozing (ya'ni <code>buyurtmalar</code> jadvalida qatnashgan{' '}
          <code>mijoz_id</code>larga mos mijozlar).
        </p>
        <SqlPlayground
          schema={PHASE2_SCHEMA}
          initialQuery={`SELECT ism
FROM mijozlar
WHERE id IN (SELECT mijoz_id FROM buyurtmalar);`}
        />
        <Solution>
          <CodeBlock lang="sql">{`SELECT ism
FROM mijozlar
WHERE id IN (SELECT mijoz_id FROM buyurtmalar);`}</CodeBlock>
          <p>
            Natijada 5 ta mijoz chiqadi: Aziz Karimov, Malika Yusupova, Vali Rashidov,
            Dilnoza Xolova va Sardor Rustamov. Zarina Nabieva (6-mijoz) ro'yxatda yo'q —
            u hech qachon buyurtma bermagan, shuning uchun ichki so'rov qaytargan{' '}
            <code>mijoz_id</code> ro'yxatida uning <code>id</code>si yo'q.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Quyi so'rov (subquery) — bu boshqa so'rov ichiga qavs ichida joylashtirilgan{' '}
          <code>SELECT</code>.
        </li>
        <li>
          Ichki so'rov kontseptual jihatdan mustaqil ishlaydi va bir ustunli qiymatlar
          ro'yxatini hosil qiladi; tashqi so'rov shu ro'yxatdan <code>IN</code> yoki{' '}
          <code>NOT IN</code> orqali foydalanadi.
        </li>
        <li>
          <code>NOT IN</code> bilan quyi so'rov "hech qachon uchramagan" qiymatlarni topishda
          ayniqsa qulay — <code>LEFT JOIN</code> + <code>IS NULL</code> ga muqobil.
        </li>
        <li>
          Quyi so'rovlarni ichma-ich joylashtirish mumkin, lekin o'qilishi uchun 2-3
          qatlamdan oshirmaslik tavsiya etiladi.
        </li>
      </KeyPoints>
    </>
  )
}
