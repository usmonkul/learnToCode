import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'DELETE',
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

export default function DeleteLesson() {
  return (
    <>
      <h2>Qatorni butunlay o'chirish</h2>
      <p>
        <code>INSERT</code> qator qo'shadi, <code>UPDATE</code> mavjud qatorni o'zgartiradi —
        <code>DELETE</code> esa qatorni jadvaldan <strong>butunlay olib tashlaydi</strong>.
        Sintaksis <code>UPDATE</code>ga juda o'xshash, faqat <code>SET</code> qismi yo'q:
      </p>
      <CodeBlock lang="sql">{`DELETE FROM mijozlar
WHERE id = 6;`}</CodeBlock>
      <p>
        Bu so'rov <code>id = 6</code> bo'lgan mijozni — Zarina Nabievani (18-darsda LEFT
        JOIN misolida uchragan, hech qanday buyurtma bermagan mijoz) — jadvaldan butunlay
        o'chiradi. Ishga tushirgandan so'ng <code>SELECT * FROM mijozlar;</code> qilsangiz,
        Zarina endi ro'yxatda umuman ko'rinmaydi — <code>UPDATE</code>dagi kabi qator
        o'zgartirilmaydi, u shunchaki yo'qoladi.
      </p>

      <Callout type="warning" title="WHEREni unutish — xuddi 24-darsdagi kabi xavfli">
        <code>DELETE</code>da ham <code>WHERE</code> ixtiyoriy, va uni unutish xuddi{' '}
        <code>UPDATE</code>dagi kabi oqibatga olib keladi — faqat bu safar o'zgartirish
        emas, <strong>o'chirish</strong>: <code>DELETE FROM mijozlar;</code> (WHERE'siz){' '}
        <strong>barcha</strong> mijozlarni bir zumda o'chirib tashlaydi. Bu hatto{' '}
        <code>UPDATE</code>dan ham xavfliroq, chunki qaytarib bo'lmaydi — ma'lumot
        o'zgarmaydi, butunlay yo'qoladi.
      </Callout>

      <h2>Sinab ko'ring</h2>
      <p>
        Avval xavfli variantni ko'ring: quyidagi maydonchada <code>WHERE</code>siz{' '}
        <code>DELETE</code> tayyor turibdi. <strong>Bajarish</strong>ni bosing, so'ng{' '}
        <code>SELECT id, ism FROM mijozlar;</code> bilan tekshiring — jadval butunlay bo'sh
        chiqadi ("Natija topilmadi (0 qator)"). Keyin <strong>Qayta tiklash</strong>ni bosib,
        so'rovni <code>WHERE id = 6</code> qo'shib to'g'irlang va faqat Zarina Nabieva
        o'chirilganini, qolgan 5 ta mijoz joyida qolganini tasdiqlang.
      </p>
      <SqlPlayground
        schema={PHASE2_SCHEMA}
        initialQuery={`DELETE FROM mijozlar;`}
      />

      <Quiz
        question="DELETE FROM mijozlar; (WHEREsiz) so'rovi ishga tushirilsa, natija qanday bo'ladi?"
        options={[
          "Hech narsa o'chmaydi, chunki WHERE yo'q",
          "Faqat birinchi qator o'chadi",
          "mijozlar jadvalidagi barcha qatorlar o'chiriladi, jadval bo'sh qoladi",
          "SQL xatolik chiqarib, so'rovni bajarmaydi"
        ]}
        correctIndex={2}
        explanation="Xuddi UPDATE'dagi kabi, WHEREsiz DELETE jadvaldagi HAR BIR qatorga qo'llanadi — bu safar ularni o'chirib tashlaydi. Natijada jadval butunlay bo'sh qoladi."
      />

      <Exercise title="Mashq">
        <p>
          <code>mahsulotlar</code> jadvalidan <code>id = 9</code> bo'lgan mahsulotni (Ryukzak)
          o'chiring — <code>WHERE</code>ni unutmang! So'ng <code>SELECT</code> bilan qolgan
          mahsulotlar ro'yxatida Ryukzak yo'qligini tasdiqlang.
        </p>
        <SqlPlayground
          schema={PHASE2_SCHEMA}
          initialQuery={`DELETE FROM mahsulotlar
WHERE id = 9;`}
        />
        <Solution>
          <CodeBlock lang="sql">{`DELETE FROM mahsulotlar
WHERE id = 9;

SELECT * FROM mahsulotlar;`}</CodeBlock>
          <p>
            So'rovdan keyin <code>mahsulotlar</code> jadvalida 9 ta qator qoladi (10 ta
            edi) — Ryukzak (<code>id = 9</code>) ro'yxatda endi yo'q, qolgan barcha
            mahsulotlar (shu jumladan <code>id = 10</code>, Sovg'a sertifikati)
            o'zgarishsiz qoladi, chunki <code>WHERE id = 9</code> aynan bitta qatorni
            tanladi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>DELETE FROM jadval WHERE shart</code> — shartga mos qator(lar)ni jadvaldan
          butunlay o'chiradi (o'zgartirmaydi, yo'q qiladi).
        </li>
        <li>
          <code>WHERE</code>ni unutish — xuddi 24-darsdagi <code>UPDATE</code> xavfi kabi —
          jadvaldagi barcha qatorlarni o'chirib yuboradi, faqat bu safar qaytarib bo'lmaydi.
        </li>
        <li>
          <code>DELETE</code>dan oldin ham xuddi shu <code>WHERE</code> bilan{' '}
          <code>SELECT</code> qilib, qaysi qatorlar o'chishini oldindan tekshirish yaxshi
          odat.
        </li>
      </KeyPoints>
    </>
  )
}
