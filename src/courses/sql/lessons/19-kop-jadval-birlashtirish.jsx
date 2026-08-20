import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: "Bir nechta jadvalni birlashtirish",
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

export default function KopJadvalBirlashtirishLesson() {
  return (
    <>
      <h2>Savol: qaysi mijoz qaysi mahsulotni sotib oldi?</h2>
      <p>
        Ma'lumotlar bazamizda 4 ta jadval bor, va ular zanjir kabi bog'langan:{' '}
        <code>mijozlar</code> → <code>buyurtmalar</code> → <code>buyurtma_tafsilotlari</code>{' '}
        → <code>mahsulotlar</code>. Har bir mijozning ismi qaysi mahsulotning nomi bilan
        bog'liqligini bilish uchun bu zanjirning <strong>hammasidan</strong> o'tish kerak —
        chunki hech qanday jadvalda bevosita "mijoz ismi + mahsulot nomi" juftligi saqlanmagan.
        Buni bosqichma-bosqich quramiz.
      </p>

      <h2>1-qadam: ikkita jadval — mijoz va buyurtma</h2>
      <p>Buni oldingi darslarda allaqachon ko'rdik:</p>
      <CodeBlock lang="sql">{`SELECT mijozlar.ism, buyurtmalar.id AS buyurtma_id
FROM mijozlar
JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id;`}</CodeBlock>
      <p>
        Natija — 10 ta qator: har bir buyurtma qaysi mijozga tegishli ekani ko'rinadi. Lekin
        bu yerda hali mahsulot haqida hech narsa yo'q — buyurtma faqat "kim, qachon"ni
        bildiradi, "nima sotib olingani"ni emas.
      </p>

      <h2>2-qadam: uchinchi jadval qo'shamiz — buyurtma tafsilotlari</h2>
      <p>
        Qaysi mahsulotlar sotib olinganini bilish uchun <code>buyurtma_tafsilotlari</code>{' '}
        jadvalini ham zanjirga qo'shamiz. U <code>buyurtmalar.id</code> bilan{' '}
        <code>buyurtma_tafsilotlari.buyurtma_id</code> orqali bog'lanadi:
      </p>
      <CodeBlock lang="sql">{`SELECT mijozlar.ism, buyurtmalar.id AS buyurtma_id, buyurtma_tafsilotlari.mahsulot_id, buyurtma_tafsilotlari.miqdor
FROM mijozlar
JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id
JOIN buyurtma_tafsilotlari ON buyurtmalar.id = buyurtma_tafsilotlari.buyurtma_id;`}</CodeBlock>
      <p>
        Natija — endi 13 ta qator (10 emas!). Nega ko'proq? Chunki ba'zi buyurtmalarda bir
        nechta xil mahsulot bor — masalan, 1-buyurtmada 2 ta xil mahsulot bo'lgani uchun,
        Aziz Karimovning shu buyurtmasi endi <strong>ikkita</strong> qatorga bo'linadi (har
        bir mahsulot uchun bittadan). Bu — <code>JOIN</code>ning tabiiy natijasi: har bir mos
        keluvchi juftlik uchun alohida qator hosil bo'ladi.
      </p>
      <p>
        Lekin natijada hali mahsulotning <strong>nomi</strong> yo'q — faqat{' '}
        <code>mahsulot_id</code> raqami ko'rinadi. Buni o'qish qiyin: "8-mahsulot" nima
        ekanini bilish uchun yana bir qadam kerak.
      </p>

      <h2>3-qadam: to'rtinchi jadval qo'shamiz — mahsulot nomi</h2>
      <p>
        Endi <code>mahsulotlar</code> jadvalini ham qo'shamiz, uni{' '}
        <code>buyurtma_tafsilotlari.mahsulot_id</code> orqali <code>mahsulotlar.id</code>ga
        bog'laymiz:
      </p>
      <CodeBlock lang="sql">{`SELECT mijozlar.ism, mahsulotlar.nom, buyurtma_tafsilotlari.miqdor, buyurtmalar.sana
FROM mijozlar
JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id
JOIN buyurtma_tafsilotlari ON buyurtmalar.id = buyurtma_tafsilotlari.buyurtma_id
JOIN mahsulotlar ON buyurtma_tafsilotlari.mahsulot_id = mahsulotlar.id
ORDER BY mijozlar.ism, buyurtmalar.sana;`}</CodeBlock>
      <p>
        Endi savolimizga to'liq javob bor: har bir qatorda mijozning ismi,{' '}
        <strong>haqiqiy mahsulot nomi</strong>, miqdori va sana — hammasi bitta natijada.
        Qatorlar soni hali ham 13 — to'rtinchi <code>JOIN</code> faqat mavjud qatorlarga
        mahsulot nomini "yopishtirib qo'ydi", yangi qator qo'shmadi (chunki har bir{' '}
        <code>mahsulot_id</code> <code>mahsulotlar</code> jadvalida aynan bitta mos qatorga
        ega).
      </p>
      <Callout type="tip" title="Zanjir mantiqi">
        To'rt jadvalli <code>JOIN</code>ni qo'rqinchli deb o'ylamang — u shunchaki bir qator{' '}
        <code>JOIN ... ON ...</code> zanjiri, har biri ikkita jadvalni bog'laydi. Zanjirni bir
        vaqtning o'zida qurishga urinmang: avval ikkita jadvalni bog'lang, natijani tekshiring,
        so'ng navbatdagi jadvalni qo'shing.
      </Callout>

      <h2>Sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada to'liq to'rt jadvalli so'rovni ishga tushiring. Natijada Aziz
        Karimov nechta xil mahsulot sotib olganini toping:
      </p>
      <SqlPlayground
        schema={PHASE2_SCHEMA}
        initialQuery={`SELECT mijozlar.ism, mahsulotlar.nom, buyurtma_tafsilotlari.miqdor, buyurtmalar.sana
FROM mijozlar
JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id
JOIN buyurtma_tafsilotlari ON buyurtmalar.id = buyurtma_tafsilotlari.buyurtma_id
JOIN mahsulotlar ON buyurtma_tafsilotlari.mahsulot_id = mahsulotlar.id
ORDER BY mijozlar.ism, buyurtmalar.sana;`}
      />
      <p>
        <code>WHERE mijozlar.ism = 'Aziz Karimov'</code> qo'shib ko'ring — natijada 4 ta
        qator qoladi: Noutbuk, Sichqoncha (1-buyurtmadan), Monitor (3-buyurtmadan) va yana
        Sichqoncha (8-buyurtmadan, boshqa miqdorda). Diqqat qiling — Sichqoncha ikki marta
        chiqadi, chunki Aziz uni ikki marta, turli buyurtmalarda sotib olgan.
      </p>

      <h2>GROUP BY bilan birga: har bir mijoz nechta mahsulot sotib oldi</h2>
      <p>
        Ko'p jadvalli <code>JOIN</code>ni agregatsiya bilan birga ham ishlatish mumkin —
        masalan, har bir mijoz jami nechta mahsulot birligi sotib olganini hisoblash:
      </p>
      <CodeBlock lang="sql">{`SELECT mijozlar.ism, SUM(buyurtma_tafsilotlari.miqdor) AS jami_miqdor
FROM mijozlar
JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id
JOIN buyurtma_tafsilotlari ON buyurtmalar.id = buyurtma_tafsilotlari.buyurtma_id
GROUP BY mijozlar.ism;`}</CodeBlock>
      <p>
        Bu yerda 12-14-darslarda o'rgangan <code>GROUP BY</code> va agregat funksiyalar bilan
        JOIN bir so'rovda birlashdi — bu naqsh keyingi darslarda, ayniqsa yakuniy loyihada,
        tez-tez uchraydi.
      </p>

      <Quiz
        question="4 ta jadvalni bog'lashda nima uchun bosqichma-bosqich (avval 2 ta, keyin 3 ta) qurish tavsiya etiladi?"
        options={[
          "Chunki SQLite bir vaqtning o'zida 2 tadan ortiq JOIN yozishga ruxsat bermaydi",
          "Chunki har bir qadamda natijani tekshirib, JOIN shartlari to'g'ri ekanini aniqlash osonroq va xatoni tezroq topish mumkin",
          "Chunki bosqichma-bosqich yozish so'rovni tezroq ishlaydigan qiladi",
          "Chunki ORDER BY faqat 2 jadvalli so'rovlarda ishlaydi"
        ]}
        correctIndex={1}
        explanation="Bosqichma-bosqich qurish — bu ishlash tezligi yoki sintaksis cheklovi bilan bog'liq emas, balki xatolarni oson aniqlash uchun amaliy uslub: har bir JOIN qo'shilgandan keyin natijani tekshirib, keyin davom etish xatoni tezroq topishga yordam beradi."
      />

      <Quiz
        question="2-qadamda (mijozlar + buyurtmalar + buyurtma_tafsilotlari) nima uchun natija 10 emas, 13 ta qator bo'ldi?"
        options={[
          "Chunki so'rovda xatolik bor edi",
          "Chunki ba'zi buyurtmalarda bir nechta xil mahsulot bor, va JOIN har bir mos keluvchi juftlik uchun alohida qator hosil qiladi",
          "Chunki buyurtma_tafsilotlari jadvalida takrorlangan qatorlar bor",
          "Chunki LEFT JOIN ishlatilgan edi"
        ]}
        correctIndex={1}
        explanation="Bir buyurtmada bir nechta xil mahsulot bo'lishi mumkin (masalan, 1-buyurtmada Noutbuk ham, Sichqoncha ham bor). JOIN har bir mos keluvchi (buyurtma, mahsulot) juftligi uchun alohida qator chiqaradi, shuning uchun qatorlar soni buyurtmalar sonidan ko'p bo'lib chiqishi mumkin."
      />

      <Exercise title="Mashq">
        <p>
          Quyidagi maydonchada 4 ta jadvalni bog'lab, faqat <code>Elektronika</code>{' '}
          kategoriyasidagi mahsulotlarni sotib olgan mijozlarning ismi va mahsulot nomini
          ko'rsatadigan so'rov yozing.
        </p>
        <SqlPlayground
          schema={PHASE2_SCHEMA}
          initialQuery={`SELECT mijozlar.ism, mahsulotlar.nom, mahsulotlar.kategoriya
FROM mijozlar
JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id
JOIN buyurtma_tafsilotlari ON buyurtmalar.id = buyurtma_tafsilotlari.buyurtma_id
JOIN mahsulotlar ON buyurtma_tafsilotlari.mahsulot_id = mahsulotlar.id;`}
        />
        <Solution>
          <CodeBlock lang="sql">{`SELECT mijozlar.ism, mahsulotlar.nom
FROM mijozlar
JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id
JOIN buyurtma_tafsilotlari ON buyurtmalar.id = buyurtma_tafsilotlari.buyurtma_id
JOIN mahsulotlar ON buyurtma_tafsilotlari.mahsulot_id = mahsulotlar.id
WHERE mahsulotlar.kategoriya = 'Elektronika';`}</CodeBlock>
          <p>
            Natijada 7 ta qator qaytadi: Noutbuk (2 marta — Aziz va Malika), Sichqoncha (2
            marta — ikkalasi ham Aziz, chunki u uni ikki xil buyurtmada sotib olgan),
            Klaviatura (Malika) va Monitor (2 marta — Aziz va Dilnoza).{' '}
            <code>WHERE</code> shartini to'rt jadvalli <code>JOIN</code>ning oxiriga, oddiy
            so'rovdagidek qo'shish yetarli — u ustunning qaysi jadvaldan kelganidan qat'i
            nazar ishlaydi.
          </p>
        </Solution>
      </Exercise>

      <Callout type="tip" title="Oldinga qarab: qulayroq yozish usullari">
        Keyingi bo'limda so'rovlarni yanada qisqa va o'qilishi oson qilish usullarini
        o'rganamiz — jumladan, uzun jadval nomlari o'rniga qisqa taxalluslar (aliases)
        ishlatish, bu ayniqsa shu kabi ko'p jadvalli JOIN'larda juda foydali bo'ladi.
      </Callout>

      <KeyPoints>
        <li>
          Bir nechta <code>JOIN</code>ni zanjir kabi ketma-ket yozish mumkin — har biri
          navbatdagi jadvalni qo'shadi.
        </li>
        <li>
          Ko'p jadvalli so'rovni bosqichma-bosqich qurish (avval 2, keyin 3, keyin 4 jadval)
          xatolarni tezroq topishga yordam beradi.
        </li>
        <li>
          Har bir <code>JOIN</code> mos keluvchi juftliklar sonicha qator hosil qiladi —
          natijadagi qatorlar soni har doim ham manba jadvallardagi qatorlar soniga teng
          bo'lavermaydi.
        </li>
        <li>
          4 jadvalli <code>JOIN</code>ni <code>GROUP BY</code> va agregat funksiyalar bilan
          birga ishlatish mumkin — bu naqsh real hisobotlarda tez-tez uchraydi.
        </li>
      </KeyPoints>
    </>
  )
}
