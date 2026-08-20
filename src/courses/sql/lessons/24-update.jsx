import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'UPDATE',
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

export default function UpdateLesson() {
  return (
    <>
      <h2>Mavjud qatorni o'zgartirish</h2>
      <p>
        23-darsda <code>INSERT</code> bilan yangi qator qo'shishni o'rgandik. Endi{' '}
        <strong>mavjud</strong> qatordagi qiymatni o'zgartiraylik — masalan, mijoz shaharini
        yangilash. Buning uchun <code>UPDATE</code> ishlatiladi:
      </p>
      <CodeBlock lang="sql">{`UPDATE mijozlar
SET shahar = 'Namangan'
WHERE id = 3;`}</CodeBlock>
      <p>
        Bu so'rov uch qismdan iborat: <code>UPDATE mijozlar</code> — qaysi jadvalda
        o'zgartirayotganingiz, <code>SET shahar = 'Namangan'</code> — qaysi ustunga qanday
        yangi qiymat berayotganingiz, va <code>WHERE id = 3</code> — <strong>qaysi
        qator(lar)</strong>ga bu o'zgarish tegishli ekanligi. Bizning jadvalimizda{' '}
        <code>id = 3</code> — Vali Rashidov; shu so'rovdan keyin faqat uning{' '}
        <code>shahar</code>i <code>'Buxoro'</code>dan <code>'Namangan'</code>ga o'zgaradi,
        qolgan besh mijoz o'zgarishsiz qoladi.
      </p>
      <p>
        Bir nechta ustunni bir vaqtda yangilash uchun <code>SET</code>da ularni vergul bilan
        ajratib yozasiz:
      </p>
      <CodeBlock lang="sql">{`UPDATE mijozlar
SET shahar = 'Namangan', email = 'vali@mail.uz'
WHERE id = 3;`}</CodeBlock>

      <Callout type="warning" title="WHERE ni unutmang — bu eng xavfli xato">
        <code>UPDATE</code>da <code>WHERE</code> shart <strong>ixtiyoriy</strong> — SQL buni
        xatolik deb hisoblamaydi. Lekin agar <code>WHERE</code>ni yozishni unutsangiz,{' '}
        <code>SET</code>dagi o'zgarish jadvaldagi <strong>barcha</strong> qatorlarga
        qo'llanadi:
        <CodeBlock lang="sql">{`UPDATE mijozlar
SET shahar = 'Namangan';`}</CodeBlock>
        Bu so'rov faqat bitta mijozni emas — <code>mijozlar</code> jadvalidagi{' '}
        <strong>hamma</strong> 6 ta mijozning shahrini <code>'Namangan'</code>ga
        o'zgartiradi. Ishlab chiqarish (production) bazasida bu qaytarib bo'lmaydigan
        zarar keltiradi. Pastdagi maydonchada buni xavfsiz — mashq bazasida — o'zingiz
        ko'rib chiqasiz.
      </Callout>

      <h2>Sinab ko'ring: avval xavfli, keyin to'g'ri</h2>
      <p>
        Quyidagi maydonchada <code>WHERE</code>siz <code>UPDATE</code> so'rovi tayyor turibdi.
        Qadamlar:
      </p>
      <ol>
        <li>
          <strong>Bajarish</strong>ni bosing — so'rov ishlaydi (xatolik chiqmaydi).
        </li>
        <li>
          Matn maydonini <code>SELECT id, ism, shahar FROM mijozlar;</code>ga o'zgartirib,
          yana <strong>Bajarish</strong>ni bosing — <strong>barcha</strong> 6 ta mijozning
          shahri <code>'Namangan'</code> bo'lib qolganini ko'rasiz.
        </li>
        <li>
          <strong>Qayta tiklash</strong> tugmasini bosing — baza boshlang'ich holatiga
          qaytadi, xavfli o'zgarish bekor bo'ladi.
        </li>
        <li>
          Endi matn maydoniga <code>WHERE id = 3</code> qo'shilgan to'g'ri so'rovni yozing (
          <code>UPDATE mijozlar SET shahar = 'Namangan' WHERE id = 3;</code>) va{' '}
          <strong>Bajarish</strong>ni bosing, so'ng <code>SELECT id, ism, shahar FROM
          mijozlar;</code> bilan — faqat Vali Rashidovning shahri o'zgarganini,
          qolganlari o'zgarishsiz qolganini tekshiring.
        </li>
      </ol>
      <SqlPlayground
        schema={PHASE2_SCHEMA}
        initialQuery={`UPDATE mijozlar
SET shahar = 'Namangan';`}
      />

      <Quiz
        question="UPDATE mijozlar SET shahar = 'Namangan'; so'rovida WHERE shart yozilmagan. Natijada nima bo'ladi?"
        options={[
          "SQL xatolik chiqaradi, chunki WHERE majburiy",
          "Hech narsa o'zgarmaydi, chunki qaysi qatorga tegishli ekani noaniq",
          "mijozlar jadvalidagi barcha qatorlarning shahar ustuni 'Namangan'ga o'zgaradi",
          "Faqat birinchi qatorning shahri o'zgaradi"
        ]}
        correctIndex={2}
        explanation="WHERE ixtiyoriy shart — u yozilmasa, SET dagi o'zgarish jadvaldagi HAR BIR qatorga qo'llanadi. Shuning uchun UPDATE yozishdan oldin WHERE shartini tekshirish juda muhim."
      />

      <Quiz
        question="UPDATE mijozlar SET shahar = 'Namangan', email = 'vali@mail.uz' WHERE id = 3; so'rovida nechta ustun yangilanadi?"
        options={[
          "Faqat bitta — shahar",
          "Ikkita — shahar va email, chunki SET da vergul bilan ajratilgan",
          "Barcha ustunlar avtomatik yangilanadi",
          "Hech biri, chunki bitta UPDATE da faqat bitta ustunni o'zgartirish mumkin"
        ]}
        correctIndex={1}
        explanation="SET qismida vergul bilan ajratilgan har bir ustun = qiymat juftligi alohida yangilanadi — bu misolda id = 3 bo'lgan qatorning ham shahar, ham email ustunlari bir vaqtda o'zgaradi."
      />

      <Exercise title="Mashq">
        <p>
          Sardor Rustamovning (<code>id = 5</code>) shahrini <code>'Namangan'</code> qilib
          yangilang — <code>WHERE</code>ni unutmang! So'ng <code>SELECT</code> bilan faqat
          uning qatori o'zgarganini, qolgan mijozlar o'zgarishsiz qolganini tekshiring.
        </p>
        <SqlPlayground
          schema={PHASE2_SCHEMA}
          initialQuery={`UPDATE mijozlar
SET shahar = 'Namangan'
WHERE id = 5;`}
        />
        <Solution>
          <CodeBlock lang="sql">{`UPDATE mijozlar
SET shahar = 'Namangan'
WHERE id = 5;

SELECT id, ism, shahar FROM mijozlar;`}</CodeBlock>
          <p>
            Bu so'rovdan keyin faqat Sardor Rustamovning (<code>id = 5</code>) shahri{' '}
            <code>NULL</code>dan <code>'Namangan'</code>ga o'zgaradi — u avval shahri{' '}
            <code>NULL</code> bo'lgan yagona mijoz edi (5-darsda o'rgangan{' '}
            <code>NULL</code>ni eslang). Qolgan 5 ta mijoz o'zgarishsiz qoladi, chunki{' '}
            <code>WHERE id = 5</code> aynan shu bitta qatorni tanladi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>UPDATE jadval SET ustun = qiymat WHERE shart</code> — mavjud qator(lar)ni
          yangilaydi; <code>SET</code>da bir nechta ustunni vergul bilan ajratib yangilash
          mumkin.
        </li>
        <li>
          <code>WHERE</code> — SQL uchun ixtiyoriy, lekin amaliyotda deyarli har doim
          <strong> majburiy</strong>: uni unutish jadvaldagi barcha qatorlarni o'zgartiradi.
        </li>
        <li>
          <code>UPDATE</code>ni ishga tushirishdan oldin xuddi shu <code>WHERE</code> shart
          bilan <code>SELECT</code> qilib, qaysi qatorlar o'zgarishini oldindan ko'rib
          chiqish yaxshi odat.
        </li>
        <li>
          O'zgarish haqiqatan ham kutganingizdek bo'lganini <code>SELECT</code>ni qayta
          ishga tushirib tekshiring — bu odat 23-darsdan boshlab har bir DML so'rovi uchun
          amal qiladi.
        </li>
      </KeyPoints>
    </>
  )
}
