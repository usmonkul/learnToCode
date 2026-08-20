import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'Taxalluslar (Aliases)',
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

export default function TaxalluslarLesson() {
  return (
    <>
      <h2>Muammo: uzun jadval nomlari o'qishni qiyinlashtiradi</h2>
      <p>
        Oldingi darsda 4 ta jadvalni bog'laganimizda, har bir ustunni to'liq{' '}
        <code>jadval_nomi.ustun_nomi</code> shaklida yozgan edik — masalan,{' '}
        <code>buyurtma_tafsilotlari.mahsulot_id</code>. Bu ishlaydi, lekin so'rov qanchalik
        uzun jadval nomlari bilan to'lib ketishini ko'ring:
      </p>
      <CodeBlock lang="sql">{`SELECT mijozlar.ism, buyurtmalar.id
FROM mijozlar
JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id;`}</CodeBlock>
      <p>
        <strong>Taxallus (alias)</strong> — jadval yoki ustunga vaqtinchalik, qisqa nom
        berish usuli. U faqat shu so'rov davomida amal qiladi, ma'lumotlar bazasidagi
        haqiqiy nomni o'zgartirmaydi.
      </p>

      <h2>Ustun taxallusi: AS</h2>
      <p>
        Natijadagi ustun nomini o'zgartirish uchun <code>AS</code> ishlatiladi. Masalan,{' '}
        <code>narx</code> ustunini natijada <code>narxi</code> deb ko'rsatish:
      </p>
      <CodeBlock lang="sql">{`SELECT narx AS narxi FROM mahsulotlar;`}</CodeBlock>
      <p>
        Bu 19-darsda <code>SUM(...) AS jami_miqdor</code> misolida allaqachon ko'rgan
        narsangiz — <code>AS</code> hisoblangan ustunlarga ham, oddiy ustunlarga ham
        qo'llanadi.
      </p>

      <h2>Jadval taxallusi: qulaylik qayerda?</h2>
      <p>
        Jadvallarga ham xuddi shunday qisqa nom berish mumkin. Buning asosiy foydasi{' '}
        <code>JOIN</code>li so'rovlarda ko'rinadi — ayniqsa bir nechta jadval bo'lganda.
        Avvalgi 4 jadvalli so'rovni <code>AS</code> bilan qayta yozamiz:
      </p>
      <CodeBlock lang="sql">{`SELECT m.ism, p.nom, bt.miqdor, b.sana
FROM mijozlar AS m
JOIN buyurtmalar AS b ON m.id = b.mijoz_id
JOIN buyurtma_tafsilotlari AS bt ON b.id = bt.buyurtma_id
JOIN mahsulotlar AS p ON bt.mahsulot_id = p.id
ORDER BY m.ism, b.sana;`}</CodeBlock>
      <p>
        Solishtiring: <code>mijozlar.ism</code> o'rniga <code>m.ism</code>,{' '}
        <code>buyurtma_tafsilotlari.miqdor</code> o'rniga <code>bt.miqdor</code>. Natija
        so'rovning oldingi versiyasi bilan <strong>bir xil</strong> — 13 ta qator, xuddi shu
        ma'lumotlar — faqat so'rov matni ancha qisqa va ko'zga tezroq tushadigan bo'ldi.
        <code>AS</code> so'zini yozmasdan ham (<code>mijozlar m</code>) taxallus berish
        mumkin, lekin aniqlik uchun <code>AS</code>ni yozib turish tavsiya etiladi.
      </p>
      <Callout type="tip" title="Nega bu muhim">
        Taxalluslar shunchaki "qisqaroq yozish" emas — 4-5 jadvalli so'rovda har bir ustun
        oldida to'liq jadval nomini takrorlash o'qishni sekinlashtiradi va xato qilish
        ehtimolini oshiradi (masalan, <code>buyurtma_tafsilotlari</code> so'zini bir joyda
        noto'g'ri yozib qo'yish). Qisqa harf yoki bo'g'in (<code>m</code>, <code>b</code>,{' '}
        <code>bt</code>, <code>p</code>) bilan bu xavf deyarli yo'qoladi.
      </Callout>

      <h2>Sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada taxalluslangan so'rovni ishga tushiring, so'ng ustunlarga ham{' '}
        <code>AS mijoz</code>, <code>AS mahsulot</code> kabi taxalluslar qo'shib ko'ring:
      </p>
      <SqlPlayground
        schema={PHASE2_SCHEMA}
        initialQuery={`SELECT m.ism AS mijoz, p.nom AS mahsulot, bt.miqdor AS soni
FROM mijozlar AS m
JOIN buyurtmalar AS b ON m.id = b.mijoz_id
JOIN buyurtma_tafsilotlari AS bt ON b.id = bt.buyurtma_id
JOIN mahsulotlar AS p ON bt.mahsulot_id = p.id
ORDER BY m.ism;`}
      />
      <p>
        Ustun taxalluslari bilan natija jadvalining sarlavhalari ham o'qishga qulay bo'ladi:{' '}
        <code>ism</code> o'rniga <code>mijoz</code>, <code>nom</code> o'rniga{' '}
        <code>mahsulot</code>.
      </p>

      <Quiz
        question="FROM mijozlar AS m JOIN buyurtmalar AS b ON m.id = b.mijoz_id qatorida m va b nima?"
        options={[
          "Ular yangi jadval yaratadigan buyruqlar",
          "Ular mijozlar va buyurtmalar jadvallariga shu so'rov davomida beriladigan qisqa taxalluslar",
          "Ular mijozlar va buyurtmalar jadvallarining haqiqiy, doimiy nomlarini o'zgartiradi",
          "Ular faqat SELECT ro'yxatida ishlatilishi mumkin, JOIN ON qatorida emas"
        ]}
        correctIndex={1}
        explanation="AS m va AS b — mijozlar va buyurtmalar jadvallariga faqat shu so'rov davomida amal qiladigan vaqtinchalik qisqa nomlar. Ma'lumotlar bazasidagi haqiqiy jadval nomlari o'zgarmaydi, va bu taxalluslarni JOIN ON shartida ham, SELECT ro'yxatida ham ishlatish mumkin."
      />

      <Quiz
        question="SELECT narx AS narxi FROM mahsulotlar; so'rovida natija jadvalidagi ustun sarlavhasi qanday bo'ladi?"
        options={[
          "narx",
          "narxi",
          "mahsulotlar.narx",
          "AS narxi"
        ]}
        correctIndex={1}
        explanation="AS narxi — narx ustuniga natijada ko'rsatiladigan yangi nom beradi. Natija jadvalining sarlavhasida narx emas, narxi ko'rinadi."
      />

      <Exercise title="Mashq">
        <p>
          Taxalluslardan foydalanib, Toshkent shahridagi mijozlar sotib olgan mahsulotlar
          ro'yxatini chiqaradigan so'rov yozing. Mijoz ismini <code>mijoz</code>, mahsulot
          nomini <code>mahsulot</code> deb nomlang.
        </p>
        <SqlPlayground
          schema={PHASE2_SCHEMA}
          initialQuery={`SELECT m.ism AS mijoz, p.nom AS mahsulot
FROM mijozlar AS m
JOIN buyurtmalar AS b ON m.id = b.mijoz_id
JOIN buyurtma_tafsilotlari AS bt ON b.id = bt.buyurtma_id
JOIN mahsulotlar AS p ON bt.mahsulot_id = p.id;`}
        />
        <Solution>
          <CodeBlock lang="sql">{`SELECT m.ism AS mijoz, p.nom AS mahsulot
FROM mijozlar AS m
JOIN buyurtmalar AS b ON m.id = b.mijoz_id
JOIN buyurtma_tafsilotlari AS bt ON b.id = bt.buyurtma_id
JOIN mahsulotlar AS p ON bt.mahsulot_id = p.id
WHERE m.shahar = 'Toshkent';`}</CodeBlock>
          <p>
            Natijada 7 ta qator chiqadi — Aziz Karimov (Noutbuk, Sichqoncha, Monitor,
            yana Sichqoncha) va Dilnoza Xolova (Sport krossovka, Monitor, Stol lampa),
            chunki ikkalasi ham <code>shahar = 'Toshkent'</code>ga ega. Diqqat qiling:{' '}
            <code>WHERE</code> shartida ham <code>m.shahar</code> — jadval taxallusi{' '}
            <code>WHERE</code>da ham xuddi <code>SELECT</code>dagidek ishlatiladi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>AS</code> ustun yoki jadvalga so'rov davomida amal qiladigan vaqtinchalik
          taxallus beradi — haqiqiy nomlar o'zgarmaydi.
        </li>
        <li>
          Ustun taxallusi (<code>narx AS narxi</code>) natija jadvalining sarlavhasini
          o'zgartiradi.
        </li>
        <li>
          Jadval taxallusi (<code>mijozlar AS m</code>) ko'p jadvalli <code>JOIN</code>larni
          ancha qisqa va o'qilishi oson qiladi.
        </li>
        <li>
          Bir marta berilgan jadval taxallusini <code>SELECT</code>, <code>JOIN ON</code> va{' '}
          <code>WHERE</code> qatorlarining barchasida ishlatish mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
