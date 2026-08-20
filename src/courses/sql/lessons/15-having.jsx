import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'HAVING',
  section: 'Agregatsiya',
}

const MAHSULOTLAR_SCHEMA = `CREATE TABLE mahsulotlar (
  id INTEGER PRIMARY KEY,
  nom TEXT NOT NULL,
  narx REAL NOT NULL,
  kategoriya TEXT
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
  (10, 'Sovg''a sertifikati', 200000, NULL);`

export default function HavingLesson() {
  return (
    <>
      <h2>Guruhlarni filtrlash</h2>
      <p>
        Oldingi darsda <code>GROUP BY</code> yordamida mahsulotlarni kategoriya bo'yicha
        guruhladik va har bir guruh uchun <code>COUNT(*)</code>, <code>AVG(narx)</code> kabi
        agregat natijalar oldik. Endi savol: "faqat 2 tadan ko'p mahsulot bor
        kategoriyalarni ko'rsat" desak-chi? Bu — guruhlarning o'zini, ularning agregat
        natijasiga qarab, filtrlash degani. Buning uchun <code>WHERE</code> emas,{' '}
        <code>HAVING</code> ishlatiladi.
      </p>

      <h2>WHERE va HAVING — bosqichlar farqi</h2>
      <p>
        SQL so'rovi bajarilganda, uning qismlari ma'lum bir <strong>tartibda</strong>{' '}
        ishlaydi (yozilish tartibida emas):
      </p>
      <ol>
        <li>
          <strong>WHERE</strong> — dastlab, guruhlashdan <em>oldin</em>, har bir alohida
          qatorni tekshiradi va mos kelmaganlarini chiqarib tashlaydi.
        </li>
        <li>
          <strong>GROUP BY</strong> — qolgan qatorlarni guruhlarga (qutilarga) bo'ladi.
        </li>
        <li>
          Agregat funksiyalar (<code>COUNT</code>, <code>AVG</code> va h.k.) har bir guruh
          uchun hisoblanadi.
        </li>
        <li>
          <strong>HAVING</strong> — oxirida, guruhlash va agregatlashdan <em>keyin</em>, har
          bir guruhning agregat natijasini tekshiradi va mos kelmagan guruhlarni chiqarib
          tashlaydi.
        </li>
      </ol>
      <Callout type="note" title="Qisqacha farq">
        <code>WHERE</code> — <strong>qatorlarni</strong> guruhlashdan oldin filtrlaydi.{' '}
        <code>HAVING</code> — <strong>guruhlarni</strong> guruhlash va agregatlashdan keyin
        filtrlaydi.
      </Callout>

      <h2>HAVING misoli</h2>
      <p>
        2 tadan ko'p mahsulot bor kategoriyalarni topamiz:
      </p>
      <CodeBlock lang="sql">{`SELECT kategoriya, COUNT(*)
FROM mahsulotlar
GROUP BY kategoriya
HAVING COUNT(*) > 2;`}</CodeBlock>
      <p>
        Natija — bitta qator: <code>Elektronika</code>, <code>4</code>. To'rtta guruh (
        <code>Elektronika</code> — 4 ta, <code>Uy jihozlari</code> — 2 ta, <code>Kiyim</code> —
        2 ta, <code>NULL</code> — 2 ta) hosil bo'lgandan keyin, <code>HAVING</code> faqat{' '}
        <code>COUNT(*) &gt; 2</code> shartiga mos kelgan guruhni qoldirdi — qolgan uchtasi
        (har birida 2 tadan mahsulot) chiqarib tashlandi.
      </p>

      <h2>WHERE va HAVING bitta so'rovda</h2>
      <p>
        Ikkalasini bitta so'rovda birga ham ishlatish mumkin — ular turli bosqichlarda,
        turli narsani filtrlaydi:
      </p>
      <CodeBlock lang="sql">{`SELECT kategoriya, COUNT(*) AS soni
FROM mahsulotlar
WHERE narx > 100000
GROUP BY kategoriya
HAVING COUNT(*) >= 2;`}</CodeBlock>
      <p>
        Bu yerda avval <code>WHERE narx &gt; 100000</code> qatorlarni filtrlaydi (Sichqoncha —
        85000 va Futbolka — 95000 chiqarib tashlanadi, chunki ularning narxi 100000dan kam).
        Qolgan qatorlar kategoriya bo'yicha guruhlanadi. So'ng <code>HAVING COUNT(*) &gt;=
        2</code> faqat kamida 2 ta mahsuloti qolgan guruhlarni saqlab qoladi. Natijada{' '}
        <code>Elektronika</code> — 3, <code>Uy jihozlari</code> — 2 va <code>NULL</code> — 2
        guruhlari qoladi; <code>Kiyim</code> guruhida <code>WHERE</code>dan keyin faqat bitta
        mahsulot (Sport krossovka) qolgani uchun <code>HAVING</code> uni chiqarib tashlaydi.
      </p>

      <h2>Nega WHERE COUNT(*) &gt; 2 ishlamaydi</h2>
      <p>
        Yangi boshlovchilar ko'pincha <code>HAVING</code> o'rniga <code>WHERE</code>ni
        agregat funksiya bilan ishlatishga urinishadi:
      </p>
      <CodeBlock lang="sql">{`SELECT kategoriya, COUNT(*)
FROM mahsulotlar
WHERE COUNT(*) > 2
GROUP BY kategoriya;`}</CodeBlock>
      <p>
        Bu so'rov SQLite'da xato beradi:
      </p>
      <CodeBlock lang="text">{`misuse of aggregate: COUNT()`}</CodeBlock>
      <p>
        Sabab — bosqichlar tartibida yashiringan: <code>WHERE</code> guruhlashdan{' '}
        <strong>oldin</strong>, har bir alohida qatorni ko'rib chiqadi. O'sha bosqichda hali
        hech qanday guruh yo'q, demak <code>COUNT(*)</code> hisoblash uchun hali hech narsa
        yig'ilmagan — <code>COUNT(*)</code> tushunchasining o'zi hali mavjud emas.{' '}
        <code>HAVING</code> esa aynan guruhlash va agregatlashdan <strong>keyin</strong>{' '}
        ishlaydi, shuning uchun <code>COUNT(*)</code> qiymati allaqachon tayyor bo'ladi va uni
        shart sifatida ishlatish mumkin.
      </p>
      <Callout type="danger" title="Eslab qoling">
        Agregat funksiya bilan shart yozish kerak bo'lsa — <code>HAVING</code> ishlating.
        Oddiy ustun qiymati bilan shart yozish kerak bo'lsa (masalan,{' '}
        <code>narx &gt; 100000</code>) — <code>WHERE</code> ishlating.{' '}
        <code>WHERE COUNT(*) ...</code> yozish har doim xato beradi.
      </Callout>

      <h2>O'zingiz sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada avvalgi <code>HAVING COUNT(*) &gt; 2</code> so'rovini ishga
        tushiring. So'ng shartni <code>HAVING AVG(narx) &gt; 500000</code>ga o'zgartirib,
        qaysi kategoriyalar qolishini ko'ring.
      </p>
      <SqlPlayground
        schema={MAHSULOTLAR_SCHEMA}
        initialQuery={`SELECT kategoriya, COUNT(*) AS soni
FROM mahsulotlar
GROUP BY kategoriya
HAVING COUNT(*) > 2;`}
      />

      <Callout type="tip" title="Oldinga qarab: bir nechta jadval">
        Bu — <code>mahsulotlar</code> yagona jadvali bilan ishlaydigan oxirgi darsimiz.
        Keyingi darsdan boshlab, ma'lumotlar bazasiga <code>mijozlar</code>,{' '}
        <code>buyurtmalar</code> va <code>buyurtma_tafsilotlari</code> jadvallari qo'shiladi —
        va nega bitta jadval yetarli emasligini, jadvallarni qanday bog'lashni (JOIN)
        o'rganamiz.
      </Callout>

      <Quiz
        question="HAVING va WHERE orasidagi asosiy farq nima?"
        options={[
          "Ular bir xil, faqat HAVING yangi SQL standarti",
          "WHERE qatorlarni guruhlashdan oldin filtrlaydi, HAVING guruhlarni agregatlashdan keyin filtrlaydi",
          "WHERE faqat matn ustunlari uchun, HAVING faqat sonli ustunlar uchun",
          "HAVING har doim WHERE dan oldin bajariladi"
        ]}
        correctIndex={1}
        explanation="WHERE alohida qatorlarni guruhlash bosqichidan oldin filtrlaydi. HAVING esa guruhlash va agregat hisob-kitoblardan keyin, guruhlarning o'zini filtrlaydi."
      />

      <Quiz
        question="SELECT kategoriya, COUNT(*) FROM mahsulotlar WHERE COUNT(*) > 2 GROUP BY kategoriya; so'rovi nima uchun xato beradi?"
        options={[
          "kategoriya ustuni mavjud emasligi uchun",
          "GROUP BY WHERE dan oldin yozilishi kerakligi uchun",
          "WHERE bosqichida hali guruhlash bo'lmagani uchun, COUNT(*) qiymati hali mavjud emas",
          "COUNT(*) faqat SELECT ro'yxatida ishlatilishi mumkinligi uchun"
        ]}
        correctIndex={2}
        explanation="WHERE guruhlashdan oldingi bosqichda ishlaydi, o'sha paytda hali hech qanday guruh yo'q va COUNT(*) hisoblanmagan — shuning uchun uni WHERE shartida ishlatib bo'lmaydi. Buning o'rniga HAVING kerak."
      />

      <Exercise title="Mashq">
        <p>
          Yuqoridagi SQL maydonchasida o'rtacha narxi 300000dan yuqori bo'lgan kategoriyalarni
          topadigan so'rov yozing (<code>GROUP BY</code> va <code>HAVING</code> ishlatib).
          Natijada qaysi kategoriyalar chiqishini oldindan taxmin qiling.
        </p>
        <Solution>
          <CodeBlock lang="sql">{`SELECT kategoriya, AVG(narx) AS ortacha_narx
FROM mahsulotlar
GROUP BY kategoriya
HAVING AVG(narx) > 300000;`}</CodeBlock>
          <p>
            Natijada ikkita kategoriya qoladi: <code>Elektronika</code> (o'rtacha narxi{' '}
            <code>1573750</code>) va <code>Uy jihozlari</code> (<code>385000</code>) — ikkalasi
            ham 300000dan yuqori. <code>Kiyim</code> (<code>237500</code>) va <code>NULL</code>{' '}
            (<code>237500</code>) esa 300000dan past bo'lgani uchun chiqarib tashlanadi. Diqqat
            qiling — <code>HAVING</code> shu yerda ham guruhlash va <code>AVG</code>{' '}
            hisoblangandan keyin ishlayapti, xuddi <code>COUNT(*)</code> misolidagi kabi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>WHERE</code> qatorlarni guruhlashdan <strong>oldin</strong> filtrlaydi;{' '}
          <code>HAVING</code> guruhlarni guruhlash va agregatlashdan <strong>keyin</strong>{' '}
          filtrlaydi.
        </li>
        <li>
          <code>HAVING COUNT(*) &gt; 2</code> kabi shartlar faqat agregat natija tayyor
          bo'lgandan keyin ishlaydi, shuning uchun to'g'ri joy — <code>HAVING</code>, ustun
          nomidan keyin, <code>GROUP BY</code>dan keyin yoziladi.
        </li>
        <li>
          <code>WHERE COUNT(*) &gt; 2</code> yozish SQLite'da{' '}
          <code>misuse of aggregate: COUNT()</code> xatosini beradi — chunki{' '}
          <code>WHERE</code> bosqichida hali guruhlash bo'lmagan va agregat qiymat mavjud
          emas.
        </li>
        <li>
          <code>WHERE</code> va <code>HAVING</code>ni bitta so'rovda birga ishlatish mumkin —
          har biri o'z bosqichida, turli narsani filtrlaydi.
        </li>
        <li>
          Bu — <code>mahsulotlar</code> yagona jadvali bilan ishlaydigan oxirgi dars; keyingi
          darsdan boshlab bir nechta jadval va JOIN o'rganiladi.
        </li>
      </KeyPoints>
    </>
  )
}
