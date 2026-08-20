import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'Yakuniy loyiha',
  section: 'Amaliy loyiha',
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

export default function YakuniyLoyihaLesson() {
  return (
    <>
      <h2>Tabriklaymiz — bu kurs bo'yicha oxirgi dars!</h2>
      <p>
        27 ta darsda siz SQL'ni noldan boshlab — <code>SELECT</code>dan tortib{' '}
        <code>FOREIGN KEY</code>gacha — o'rgandingiz. Endi hammasini birlashtirish vaqti
        keldi. Bu darsda alohida "yangi mavzu" yo'q — buning o'rniga siz haqiqiy{' '}
        <strong>biznes savollari</strong>ga duch kelasiz, xuddi haqiqiy loyihada bo'lgani
        kabi. Har bir savol uchun avval o'zingiz SQL maydonchasida sinab ko'ring, so'ngra
        "Yechimni ko'rsatish"ni bosib javobingizni tekshiring.
      </p>
      <p>
        Barcha savollar 16-darsdan buyon tanish bo'lgan sxemaga asoslangan: to'rtta
        jadval — <code>mahsulotlar</code>, <code>mijozlar</code>, <code>buyurtmalar</code>{' '}
        va <code>buyurtma_tafsilotlari</code>.
      </p>

      <Callout type="tip" title="Maslahat">
        Har bir savolni o'qigach, avval qaysi jadval(lar) kerakligini va qaysi amal
        (filtrlash, birlashtirish, agregatsiya) kerakligini o'ylab ko'ring — so'ngra SQL
        yozing. Bu — haqiqiy loyihalarda ham ishlaydigan yondashuv.
      </Callout>

      <h2>1-savol: Qaysi shaharda eng ko'p mijoz bor?</h2>
      <p>
        Kompaniya marketing bo'limi qaysi shaharga ko'proq e'tibor qaratish kerakligini
        bilishni xohlaydi. <code>mijozlar</code> jadvalidagi <code>shahar</code> ustunidan
        foydalanib, har bir shaharda nechta mijoz borligini toping va eng ko'pini
        aniqlang. Diqqat: ba'zi mijozlarning shahri <code>NULL</code> (noma'lum) — bunday
        yozuvlarni hisobga olmaslik kerak.
      </p>
      <Exercise title="1-savol: Eng ko'p mijozli shahar">
        <p>
          Har bir shahardagi mijozlar sonini hisoblovchi so'rov yozing va natijani eng
          ko'pdan kamiga qarab tartiblang.
        </p>
        <SqlPlayground schema={PHASE2_SCHEMA} initialQuery={`SELECT * FROM mijozlar;`} />
        <Solution>
          <CodeBlock lang="sql">{`SELECT shahar, COUNT(*) AS mijozlar_soni
FROM mijozlar
WHERE shahar IS NOT NULL
GROUP BY shahar
ORDER BY mijozlar_soni DESC;`}</CodeBlock>
          <p>
            Natija: <strong>Toshkent — 2 mijoz</strong> va{' '}
            <strong>Samarqand — 2 mijoz</strong>, ikkalasi ham teng birinchi o'rinda!
            Buxoroda esa faqat 1 mijoz bor. Bu — haqiqiy ma'lumotlarda tez-tez uchraydigan
            holat: "eng ko'p" degan savolga har doim ham bitta aniq javob bo'lavermaydi.
            Bunday holatda to'g'ri javob — natijadagi barcha teng ballli qatorlarni
            ko'rsatish, faqat birinchisini tanlab olib qolmaslik. Shuningdek, e'tibor
            bering: <code>WHERE shahar IS NOT NULL</code> yozuvi Sardor Rustamovni (shahri{' '}
            <code>NULL</code>) hisobdan chiqarib tashladi — 9-darsda o'rgangan{' '}
            <code>NULL</code> qoidasi shu yerda amalda ishladi.
          </p>
        </Solution>
      </Exercise>

      <h2>2-savol: Eng ko'p sotilgan mahsulot qaysi?</h2>
      <p>
        Bu yerda so'zni aniq tushunish muhim: "eng ko'p sotilgan" deganda biz{' '}
        <strong>jami sotilgan dona (miqdor)</strong>ni nazarda tutamiz, "necha marta
        buyurtma qilingan" (buyurtmalar soni) emas — bular ikki xil metrika va turlicha
        javob berishi mumkin. Biz <code>buyurtma_tafsilotlari</code> jadvalidagi{' '}
        <code>miqdor</code> ustunini <code>mahsulot_id</code> bo'yicha
        yig'indilaymiz (<code>SUM</code>).
      </p>
      <Exercise title="2-savol: Eng ko'p sotilgan mahsulot">
        <p>
          Har bir mahsulot bo'yicha jami sotilgan miqdorni hisoblang va eng ko'pidan
          boshlab tartiblang. Mahsulot nomini ko'rsatish uchun <code>mahsulotlar</code>{' '}
          jadvali bilan birlashtiring (<code>JOIN</code>).
        </p>
        <SqlPlayground
          schema={PHASE2_SCHEMA}
          initialQuery={`SELECT * FROM buyurtma_tafsilotlari;`}
        />
        <Solution>
          <CodeBlock lang="sql">{`SELECT m.nom, SUM(bt.miqdor) AS jami_miqdor
FROM buyurtma_tafsilotlari bt
JOIN mahsulotlar m ON bt.mahsulot_id = m.id
GROUP BY m.id
ORDER BY jami_miqdor DESC;`}</CodeBlock>
          <p>
            Bu safar ham durrang (tie) chiqadi: <strong>Monitor</strong> va{' '}
            <strong>Sichqoncha</strong> ikkalasi ham jami <strong>4 donadan</strong>{' '}
            sotilgan — eng yuqori ko'rsatkich. Shuning uchun "eng ko'p sotilgan mahsulot"
            savoliga to'g'ri javob — ikkalasi ham, faqat bittasi emas. Natijani diqqat
            bilan o'qimasdan faqat birinchi qatorni olish — bu yerda xato javobga olib
            kelardi.
          </p>
        </Solution>
      </Exercise>

      <h2>3-savol: Hech qanday buyurtma bermagan mijozlarni toping</h2>
      <p>
        Bu — 18-darsda o'rgangan <code>LEFT JOIN</code>ning klassik amaliy foydasi.
        Kompaniya "uxlab qolgan" mijozlarga maxsus chegirma yubormoqchi — lekin buning
        uchun avval ular kimligini bilish kerak.
      </p>
      <Exercise title="3-savol: Buyurtma bermagan mijozlar">
        <p>
          <code>mijozlar</code> jadvalini <code>buyurtmalar</code> bilan{' '}
          <code>LEFT JOIN</code> qilib, natijada mos buyurtmasi topilmagan (
          <code>NULL</code>) mijozlarni ajratib oling.
        </p>
        <SqlPlayground schema={PHASE2_SCHEMA} initialQuery={`SELECT * FROM buyurtmalar;`} />
        <Solution>
          <CodeBlock lang="sql">{`SELECT mj.ism
FROM mijozlar mj
LEFT JOIN buyurtmalar b ON mj.id = b.mijoz_id
WHERE b.id IS NULL;`}</CodeBlock>
          <p>
            Natija: faqat <strong>Zarina Nabieva</strong>. <code>LEFT JOIN</code> barcha
            mijozlarni saqlab qoladi, hatto mos buyurtmasi bo'lmasa ham — mos kelmagan
            joylarda <code>buyurtmalar</code> ustunlari <code>NULL</code> bo'ladi. Shu{' '}
            <code>NULL</code>likni <code>WHERE b.id IS NULL</code> bilan filtrlab, faqat
            "hech qachon buyurtma bermagan" mijozlarni topamiz. Agar o'rniga oddiy{' '}
            <code>INNER JOIN</code> ishlatilganda, Zarina natijada umuman ko'rinmasdi —
            chunki <code>INNER JOIN</code> faqat ikkala tomonda ham mos yozuv bo'lgan
            qatorlarni qaytaradi.
          </p>
        </Solution>
      </Exercise>

      <h2>4-savol: Har bir mijozning umumiy xarid summasi qancha?</h2>
      <p>
        Moliya bo'limi har bir mijoz kompaniyaga jami qancha pul keltirganini bilishni
        xohlaydi. Bu to'rtta ko'nikmani birlashtiradi: <strong>JOIN</strong> (uchta
        jadvalni bog'lash), <strong>ko'paytirish</strong> (<code>miqdor × narx</code>),{' '}
        <strong>SUM</strong> va <strong>GROUP BY</strong>.
      </p>
      <Exercise title="4-savol: Mijozlarning umumiy xarid summasi">
        <p>
          <code>mijozlar</code>, <code>buyurtmalar</code>,{' '}
          <code>buyurtma_tafsilotlari</code> va <code>mahsulotlar</code> jadvallarini
          birlashtirib, har bir mijozning <code>miqdor × narx</code> yig'indisini
          hisoblang. Natijani eng ko'p xarid qilgandan boshlab tartiblang.
        </p>
        <SqlPlayground schema={PHASE2_SCHEMA} initialQuery={`SELECT * FROM mahsulotlar;`} />
        <Solution>
          <CodeBlock lang="sql">{`SELECT mj.ism, SUM(bt.miqdor * m.narx) AS jami_summa
FROM mijozlar mj
JOIN buyurtmalar b ON mj.id = b.mijoz_id
JOIN buyurtma_tafsilotlari bt ON b.id = bt.buyurtma_id
JOIN mahsulotlar m ON bt.mahsulot_id = m.id
GROUP BY mj.id
ORDER BY jami_summa DESC;`}</CodeBlock>
          <p>
            Natija: Aziz Karimov — 9 340 000, Malika Yusupova — 5 015 000, Dilnoza
            Xolova — 2 380 000, Vali Rashidov — 1 950 000, Sardor Rustamov — 95 000.
            E'tibor bering — bu ro'yxatda <strong>Zarina Nabieva umuman yo'q</strong>,
            chunki biz oddiy <code>JOIN</code> (ya'ni <code>INNER JOIN</code>)
            ishlatdik va u hech qanday buyurtmaga ega emas (3-savolni eslang) — mos
            keluvchi qatorlar bo'lmagani uchun u natijadan tabiiy ravishda tushib qoladi.
            Agar Zarinani ham "0 so'm" bilan ro'yxatda ko'rsatish kerak bo'lsa,{' '}
            <code>JOIN</code> o'rniga <code>LEFT JOIN</code> va{' '}
            <code>SUM</code>ni <code>NULL</code>dan himoya qiluvchi qiymat bilan
            ishlatish kerak bo'lardi.
          </p>
        </Solution>
      </Exercise>

      <h2>5-savol: Bir martadan ortiq buyurtma bergan mijozlarni toping</h2>
      <p>
        Sodiq mijozlarni aniqlash uchun kompaniya kamida ikkita buyurtma bergan
        mijozlarni bilishni xohlaydi. Bu — 15-darsda o'rgangan{' '}
        <code>GROUP BY</code> + <code>HAVING</code> naqshining aynan o'zi:{' '}
        <code>WHERE</code> guruhlashdan oldin xom qatorlarni filtrlaydi,{' '}
        <code>HAVING</code> esa guruhlangan (agregatsiya qilingan) natija ustida
        ishlaydi.
      </p>
      <Exercise title="5-savol: Bir martadan ortiq buyurtma bergan mijozlar">
        <p>
          Har bir mijozning buyurtmalar sonini hisoblang va faqat{' '}
          <code>1</code>dan ortig'ini bergan mijozlarni qoldiring.
        </p>
        <SqlPlayground schema={PHASE2_SCHEMA} initialQuery={`SELECT * FROM buyurtmalar;`} />
        <Solution>
          <CodeBlock lang="sql">{`SELECT mj.ism, COUNT(b.id) AS buyurtmalar_soni
FROM mijozlar mj
JOIN buyurtmalar b ON mj.id = b.mijoz_id
GROUP BY mj.id
HAVING COUNT(b.id) > 1
ORDER BY buyurtmalar_soni DESC;`}</CodeBlock>
          <p>
            Natija: Aziz Karimov (3 ta), Dilnoza Xolova (2 ta), Vali Rashidov (2 ta),
            Malika Yusupova (2 ta). Sardor Rustamov (1 ta) va Zarina Nabieva (0 ta)
            natijaga tushmaydi, chunki ularning buyurtmalar soni <code>1</code>dan
            ortiq emas.
          </p>
        </Solution>
      </Exercise>

      <h2>6-savol: O'rtacha narxdan qimmatroq mahsulotlarni toping</h2>
      <p>
        Va nihoyat — 20-darsda o'rgangan <strong>quyi so'rov (subquery)</strong>. Kompaniya
        "premium" toifadagi mahsulotlarni — ya'ni narxi barcha mahsulotlarning o'rtacha
        narxidan qimmatroq bo'lganlarini — aniqlashni xohlaydi.
      </p>
      <Exercise title="6-savol: O'rtacha narxdan qimmat mahsulotlar">
        <p>
          Avval <code>mahsulotlar</code> jadvalidagi barcha narxlarning o'rtachasini
          hisoblang, so'ngra shu o'rtachadan qimmatroq mahsulotlarni toping — buni ikkita
          alohida so'rov emas, bitta so'rovda bajaring: o'rtachani hisoblovchi qismni quyi
          so'rov (subquery) sifatida yozing.
        </p>
        <SqlPlayground schema={PHASE2_SCHEMA} initialQuery={`SELECT * FROM mahsulotlar;`} />
        <Solution>
          <CodeBlock lang="sql">{`SELECT nom, narx
FROM mahsulotlar
WHERE narx > (SELECT AVG(narx) FROM mahsulotlar)
ORDER BY narx DESC;`}</CodeBlock>
          <p>
            O'rtacha narx — 801 500 so'm. Undan qimmatroq faqat ikkita mahsulot bor:{' '}
            <strong>Noutbuk</strong> (4 500 000) va <strong>Monitor</strong> (1 500 000).
            Qolgan sakkizta mahsulot o'rtacha narxdan arzon — shuning uchun o'rtacha
            qiymat ko'pincha "tipik" mahsulotdan yuqoriroq bo'ladi, chunki bir nechta
            qimmat mahsulot uni yuqoriga tortadi.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="1-savolda Toshkent va Samarqand ikkalasi ham 2 tadan mijozga ega bo'lib chiqdi. ORDER BY mijozlar_soni DESC ishlatilganda bu holatda nima bo'ladi?"
        options={[
          "Ikkala shahar ham natijada alohida qator sifatida ko'rinadi, chunki ORDER BY faqat tartiblaydi, ortiqcha qatorlarni olib tashlamaydi",
          "Faqat alifbo bo'yicha birinchi keladigan shahar (Samarqand) qaytariladi",
          "SQLite tenglikni aniqlab, xatolik qaytaradi",
          "Ikkala shahar bitta qatorga birlashtirilib, mijozlar_soni 4 deb ko'rsatiladi"
        ]}
        correctIndex={0}
        explanation="ORDER BY natija qatorlarining tartibini belgilaydi, lekin qatorlar sonini o'zgartirmaydi. Agar bir nechta guruh bir xil qiymatga ega bo'lsa, ularning barchasi natijada qoladi — shuning uchun 'eng ko'p' degan savolga bir nechta to'g'ri javob bo'lishi mumkin."
      />

      <Quiz
        question="5-savolda mijozlarni buyurtmalar soniga qarab filtrlash uchun nima uchun WHERE emas, balki HAVING ishlatildi?"
        options={[
          "WHERE va HAVING to'liq bir xil ishlaydi, farqi yo'q",
          "HAVING guruhlangan (agregatsiya qilingan) natija ustida filtrlaydi (masalan, COUNT(b.id) > 1), WHERE esa GROUP BY'dan oldin, xom qatorlar ustida ishlaydi",
          "WHERE faqat matn ustunlari bilan, HAVING faqat son ustunlari bilan ishlaydi",
          "HAVING faqat CREATE TABLE ichida ishlatiladi"
        ]}
        correctIndex={1}
        explanation="WHERE guruhlashdan oldin xom qatorlarni filtrlaydi, shuning uchun u agregat funksiya natijasini (masalan, COUNT) bilmaydi. HAVING esa aynan GROUP BY natijasi — allaqachon hisoblangan agregat qiymatlar — ustida ishlaydi."
      />

      <KeyPoints>
        <li>
          <strong>SELECT / FROM / WHERE</strong> — so'rovning asosi: qaysi ustunlarni,
          qaysi jadvaldan, qaysi shartlar bilan olish (3–5-darslar).
        </li>
        <li>
          <strong>Filtrlash vositalari</strong> — solishtirish operatorlari,{' '}
          <code>AND</code>/<code>OR</code>/<code>NOT</code>, <code>NULL</code> bilan
          ishlash, <code>IN</code>/<code>BETWEEN</code>, <code>LIKE</code>,{' '}
          <code>DISTINCT</code> (6–12-darslar).
        </li>
        <li>
          <strong>Agregatsiya</strong> — <code>COUNT</code>, <code>SUM</code>,{' '}
          <code>AVG</code>, <code>MIN</code>/<code>MAX</code> kabi funksiyalar,{' '}
          <code>GROUP BY</code> bilan guruhlarga bo'lish va <code>HAVING</code> bilan
          guruhlangan natijani filtrlash (13–15-darslar).
        </li>
        <li>
          <strong>JOIN</strong> — <code>INNER JOIN</code> faqat ikkala tomonda mos
          yozuv bo'lgan qatorlarni, <code>LEFT JOIN</code> esa chap jadvalning barcha
          qatorlarini (mos kelmasa <code>NULL</code> bilan) qaytaradi; bir nechta
          jadvalni birlashtirish mumkin (16–19-darslar).
        </li>
        <li>
          <strong>Kengaytirilgan so'rovlar</strong> — quyi so'rovlar (subqueries),
          taxalluslar (aliases) va <code>CASE</code> bilan shartli mantiq
          (20–22-darslar).
        </li>
        <li>
          <strong>Ma'lumotlarni o'zgartirish (DML)</strong> — <code>INSERT</code> bilan
          qo'shish, <code>UPDATE</code> bilan yangilash, <code>DELETE</code> bilan
          o'chirish (23–25-darslar).
        </li>
        <li>
          <strong>Jadval yaratish (DDL)</strong> — <code>CREATE TABLE</code>, ustun
          turlari va cheklovlar, <code>PRIMARY KEY</code> (noyoblik va identity),{' '}
          <code>FOREIGN KEY</code> (jadvallar orasidagi bog'lanish) va SQLite'da uni
          haqiqatan ishlatish uchun kerak bo'ladigan{' '}
          <code>PRAGMA foreign_keys = ON;</code> (26–27-darslar).
        </li>
        <li>
          Haqiqiy biznes savollariga javob berish odatda bu vositalarning{' '}
          <strong>bir nechtasini birlashtirishni</strong> talab qiladi — va ba'zida
          "eng ko'p"/"eng yaxshi" kabi savollarga bir nechta teng to'g'ri javob
          bo'lishi mumkin, shuning uchun natijani har doim diqqat bilan tekshirish
          kerak.
        </li>
      </KeyPoints>
    </>
  )
}
