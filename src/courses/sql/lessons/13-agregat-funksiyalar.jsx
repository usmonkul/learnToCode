import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'Agregat funksiyalar',
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

export default function AgregatFunksiyalarLesson() {
  return (
    <>
      <h2>Ko'p qatorni bitta songa aylantirish</h2>
      <p>
        Hozirgacha o'rgangan har bir so'rov natijasi bir nechta qator qaytargan — filtrlangan,
        saralangan yoki noyoblashtirilgan bo'lsa ham, baribir "qatorlar ro'yxati" edi. Ba'zida
        esa bizga alohida qatorlar emas, balki butun jadval (yoki uning bir qismi) haqida{' '}
        <strong>bitta yakuniy son</strong> kerak bo'ladi: "jami nechta mahsulot bor?",
        "eng qimmat mahsulot narxi qancha?", "o'rtacha narx qancha?".
      </p>
      <p>
        Bunday savollarga javob berish uchun <strong>agregat funksiyalar (aggregate
        functions)</strong> ishlatiladi — ular ko'p qatordagi qiymatlarni qabul qilib, bitta
        natija qaytaradi. Bu darsda beshta eng ko'p ishlatiladigan agregat funksiyani —{' '}
        <code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code>,{' '}
        <code>MAX</code> — butun <code>mahsulotlar</code> jadvali ustida ko'ramiz.
      </p>

      <h2>COUNT(*) — qatorlarni sanash</h2>
      <p>
        <code>COUNT(*)</code> jadvaldagi (yoki <code>WHERE</code> bilan filtrlangandan keyingi)
        qatorlar sonini qaytaradi:
      </p>
      <CodeBlock lang="sql">{`SELECT COUNT(*) FROM mahsulotlar;`}</CodeBlock>
      <p>
        Natija — bitta qator, bitta ustun, qiymati <code>10</code> — jadvalda o'nta mahsulot
        borligini bildiradi.
      </p>

      <h2>SUM(narx) — yig'indi</h2>
      <p>
        <code>SUM</code> berilgan ustundagi barcha sonli qiymatlarni qo'shadi:
      </p>
      <CodeBlock lang="sql">{`SELECT SUM(narx) FROM mahsulotlar;`}</CodeBlock>
      <p>
        Natija — <code>8015000</code>, ya'ni barcha o'nta mahsulotning narxlari yig'indisi
        (butun do'kondagi tovarlarning umumiy qiymati kabi tushunish mumkin).
      </p>

      <h2>AVG(narx) — o'rtacha qiymat</h2>
      <p>
        <code>AVG</code> ustundagi qiymatlarning o'rtacha arifmetigini hisoblaydi (yig'indini
        qatorlar soniga bo'ladi):
      </p>
      <CodeBlock lang="sql">{`SELECT AVG(narx) FROM mahsulotlar;`}</CodeBlock>
      <p>
        Natija — <code>801500</code>, ya'ni <code>8015000 / 10</code>. Bu bitta mahsulotning
        "o'rtacha" narxi qanchaligini ko'rsatadi.
      </p>

      <h2>MIN(narx) va MAX(narx) — eng kichik va eng katta</h2>
      <p>
        <code>MIN</code> va <code>MAX</code> ustundagi eng kichik va eng katta qiymatlarni
        topadi:
      </p>
      <CodeBlock lang="sql">{`SELECT MIN(narx) FROM mahsulotlar;`}</CodeBlock>
      <p>
        Natija — <code>85000</code> (Sichqoncha) — jadvaldagi eng arzon mahsulot narxi.
      </p>
      <CodeBlock lang="sql">{`SELECT MAX(narx) FROM mahsulotlar;`}</CodeBlock>
      <p>
        Natija — <code>4500000</code> (Noutbuk) — jadvaldagi eng qimmat mahsulot narxi.
      </p>
      <p>
        Bitta so'rovda bir nechta agregat funksiyani birga ham chaqirish mumkin — masalan,
        eng kichik va eng katta narxni bitta natijada ko'rish uchun:
      </p>
      <CodeBlock lang="sql">{`SELECT MIN(narx), MAX(narx) FROM mahsulotlar;`}</CodeBlock>

      <Callout type="note" title="COUNT(*) va COUNT(ustun) farqi">
        <code>COUNT(*)</code> barcha qatorlarni sanaydi, ustun qiymati <code>NULL</code>{' '}
        bo'lsa ham. Ammo <code>COUNT(kategoriya)</code> faqat <code>kategoriya</code> ustuni{' '}
        <code>NULL</code> bo'lmagan qatorlarni sanaydi — natija <code>10</code> emas,{' '}
        <code>8</code> bo'ladi (Ryukzak va Sovg'a sertifikati kategoriyasi{' '}
        <code>NULL</code> bo'lgani uchun hisobga olinmaydi). Bu 9-darsda ko'rgan{' '}
        <code>NULL</code>ning "qiymat yo'qligi" xususiyati bilan bog'liq — agregat funksiyalar
        odatda <code>NULL</code>ni e'tiborsiz qoldiradi.
      </Callout>

      <h2>O'zingiz sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada har bir agregat funksiyani birma-bir ishga tushiring va
        natijalarni <code>SELECT * FROM mahsulotlar;</code> natijasi bilan solishtirib
        tekshiring.
      </p>
      <SqlPlayground
        schema={MAHSULOTLAR_SCHEMA}
        initialQuery={`SELECT COUNT(*), SUM(narx), AVG(narx), MIN(narx), MAX(narx) FROM mahsulotlar;`}
      />

      <Callout type="tip" title="Oldinga qarab: GROUP BY">
        Bu darsda agregat funksiyalarni butun jadval ustida ishlatdik — natija har doim bitta
        qator edi. Keyingi darsda <code>GROUP BY</code>ni o'rganamiz — u jadvalni guruhlarga
        bo'lib, har bir guruh uchun alohida agregat natija chiqarish imkonini beradi (masalan,
        "har bir kategoriyada nechta mahsulot bor").
      </Callout>

      <Quiz
        question="SELECT SUM(narx) FROM mahsulotlar; so'rovi nimani qaytaradi?"
        options={[
          "Jadvaldagi eng qimmat mahsulot narxini",
          "Barcha mahsulotlar narxining yig'indisini",
          "Mahsulotlar sonini",
          "Har bir mahsulot narxini alohida ro'yxat qilib"
        ]}
        correctIndex={1}
        explanation="SUM(narx) narx ustunidagi barcha qiymatlarni qo'shib, bitta yig'indi sonini qaytaradi — bu holda 8015000."
      />

      <Quiz
        question="COUNT(*) va COUNT(kategoriya) natijalari nega bir xil emas?"
        options={[
          "COUNT(*) faqat NULL bo'lmagan qatorlarni sanaydi, COUNT(kategoriya) hammasini sanaydi",
          "COUNT(*) barcha qatorlarni sanaydi, COUNT(kategoriya) esa kategoriya NULL bo'lmagan qatorlarnigina sanaydi",
          "Ular har doim bir xil natija beradi, farq yo'q",
          "COUNT(kategoriya) faqat noyob kategoriyalarni sanaydi, xuddi DISTINCT kabi"
        ]}
        correctIndex={1}
        explanation="COUNT(*) jadvaldagi barcha qatorlarni sanaydi (10 ta), COUNT(kategoriya) esa kategoriya ustuni NULL bo'lmagan qatorlarnigina sanaydi (8 ta), chunki agregat funksiyalar NULLni e'tiborsiz qoldiradi."
      />

      <Exercise title="Mashq">
        <p>
          Yuqoridagi SQL maydonchasida jadvaldagi mahsulotlarning o'rtacha narxini alohida
          so'rov bilan toping. So'ng shu narxni <code>MIN(narx)</code> va{' '}
          <code>MAX(narx)</code> bilan solishtirib, o'rtacha narx ikkisining orasida
          yotishiga ishonch hosil qiling.
        </p>
        <Solution>
          <CodeBlock lang="sql">{`SELECT AVG(narx) FROM mahsulotlar;`}</CodeBlock>
          <p>
            Natija — <code>801500</code>. Bu qiymat <code>MIN(narx)</code> (<code>85000</code>
            ) bilan <code>MAX(narx)</code> (<code>4500000</code>) orasida yotadi — bu mantiqan
            to'g'ri, chunki o'rtacha qiymat hech qachon eng kichik qiymatdan kam yoki eng katta
            qiymatdan ko'p bo'lolmaydi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Agregat funksiyalar ko'p qatordagi qiymatlarni qabul qilib, bitta natija qaytaradi.
        </li>
        <li>
          <code>COUNT(*)</code> — qatorlar sonini, <code>SUM(ustun)</code> — yig'indini,{' '}
          <code>AVG(ustun)</code> — o'rtacha qiymatni, <code>MIN(ustun)</code> va{' '}
          <code>MAX(ustun)</code> — eng kichik va eng katta qiymatni qaytaradi.
        </li>
        <li>
          <code>COUNT(*)</code> barcha qatorlarni sanaydi, lekin{' '}
          <code>COUNT(ustun_nomi)</code> shu ustun <code>NULL</code> bo'lmagan qatorlarnigina
          sanaydi.
        </li>
        <li>
          Bitta <code>SELECT</code>da bir nechta agregat funksiyani birga chaqirish mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
