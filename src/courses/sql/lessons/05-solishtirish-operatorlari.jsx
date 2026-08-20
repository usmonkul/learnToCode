import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'Solishtirish operatorlari',
  section: 'SELECT asoslari',
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

export default function SolishtirishOperatorlariLesson() {
  return (
    <>
      <h2>= dan boshqa shartlar ham bor</h2>
      <p>
        O'tgan darsda biz <code>WHERE</code>da faqat tenglik (<code>=</code>) belgisidan
        foydalandik. Lekin haqiqiy hayotda savollar ko'pincha "tengmi" emas, "kattami",
        "kichikmi" yoki "tengmasmi" degan shaklda bo'ladi — masalan, "500 000 so'mdan qimmat
        mahsulotlar", "Elektronika bo'lmagan mahsulotlar". Buning uchun SQL bir nechta{' '}
        <strong>solishtirish operatori (comparison operator)</strong>ni taqdim etadi:
      </p>
      <ul>
        <li>
          <code>=</code> — teng
        </li>
        <li>
          <code>!=</code> — teng emas
        </li>
        <li>
          <code>&gt;</code> — katta
        </li>
        <li>
          <code>&lt;</code> — kichik
        </li>
        <li>
          <code>&gt;=</code> — katta yoki teng
        </li>
        <li>
          <code>&lt;=</code> — kichik yoki teng
        </li>
      </ul>

      <h2>Sonlar bilan: narx ustuni</h2>
      <p>
        Solishtirish operatorlari sonli ustunlarda tabiiy ishlaydi. Masalan, 500 000 so'mdan
        qimmat mahsulotlarni topish:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, narx FROM mahsulotlar
WHERE narx > 500000;`}</CodeBlock>
      <p>
        Yoki 200 000 so'mdan arzon yoki teng mahsulotlarni topish:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, narx FROM mahsulotlar
WHERE narx <= 200000;`}</CodeBlock>

      <h2>Matn bilan: kategoriya ustuni</h2>
      <p>
        Solishtirish operatorlari matnli ustunlarda ham ishlaydi — bunda "katta/kichik" harflar
        alifbo tartibiga qarab solishtiriladi, lekin eng ko'p ishlatiladigani{' '}
        <code>!=</code> ("teng emas"). Masalan, Elektronika bo'lmagan barcha mahsulotlarni
        topish:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, kategoriya FROM mahsulotlar
WHERE kategoriya != 'Elektronika';`}</CodeBlock>
      <Callout type="note" title="!= yoki <>?">
        SQLite'da "teng emas"ni ifodalash uchun ikkita belgi ham ishlaydi: <code>!=</code> va{' '}
        <code>&lt;&gt;</code>. Ikkalasi ham to'g'ri va bir xil natija beradi. Bu kursda izchillik
        uchun har doim <code>!=</code>dan foydalanamiz — siz ham loyihalaringizda ikkalasidan
        birini tanlab, unga sodiq qoling.
      </Callout>

      <h2>O'zingiz sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada narxi 100 000 so'mdan katta bo'lgan mahsulotlarni topadigan so'rov
        tayyor. <strong>Bajarish</strong>ni bosing, so'ng shartni <code>kategoriya != 'Kiyim'</code>
        ga o'zgartirib qayta sinab ko'ring.
      </p>
      <SqlPlayground
        schema={MAHSULOTLAR_SCHEMA}
        initialQuery={`SELECT nom, narx FROM mahsulotlar
WHERE narx > 100000;`}
      />

      <Quiz
        question="SQLite'da 'teng emas' shartini ifodalash uchun qaysi belgilar ishlatiladi?"
        options={[
          "Faqat !=",
          "Faqat <>",
          "!= va <> — ikkalasi ham ishlaydi",
          "== belgisi"
        ]}
        correctIndex={2}
        explanation="SQLite'da != va <> ikkalasi ham 'teng emas' ma'nosini beradi va bir xil natija qaytaradi; kursda izchillik uchun != tanlangan."
      />

      <Quiz
        question="WHERE narx >= 200000; sharti qaysi mahsulotlarni qoldiradi?"
        options={[
          "Narxi aynan 200000 bo'lganlarni",
          "Narxi 200000dan qat'iy katta bo'lganlarni",
          "Narxi 200000ga teng yoki undan katta bo'lganlarni",
          "Narxi 200000dan kichik bo'lganlarni"
        ]}
        correctIndex={2}
        explanation=">= operatori 'katta yoki teng' degani, shuning uchun narxi 200000ga teng yoki undan katta bo'lgan barcha mahsulotlar qoladi."
      />

      <Exercise title="Mashq">
        <p>
          Yuqoridagi SQL maydonchasida narxi 1 000 000 so'mdan kichik bo'lgan{' '}
          <strong>va</strong> kategoriyasi Elektronika bo'lmagan mahsulotlarni topish uchun ikkita
          alohida so'rov yozing: biri narx bo'yicha, ikkinchisi kategoriya bo'yicha (hozircha
          ikkalasini bitta so'rovda birlashtirishni bilmaymiz — bu keyingi darslarda o'tiladi).
        </p>
        <Solution>
          <CodeBlock lang="sql">{`SELECT nom, narx FROM mahsulotlar
WHERE narx < 1000000;`}</CodeBlock>
          <CodeBlock lang="sql">{`SELECT nom, kategoriya FROM mahsulotlar
WHERE kategoriya != 'Elektronika';`}</CodeBlock>
          <p>
            Birinchi so'rov narxi 1 000 000dan kichik bo'lgan barcha mahsulotlarni qaytaradi.
            Ikkinchisi esa kategoriyasi Elektronika bo'lmagan mahsulotlarni qaytaradi — lekin{' '}
            <code>NULL</code> kategoriyali Ryukzak va Sovg'a sertifikati bu natijaga{' '}
            <strong>kirmaydi</strong>. Sababi: <code>NULL</code> qiymatni hech qanday narsa bilan
            solishtirib bo'lmaydi (hatto <code>!=</code> bilan ham) — buni 9-darsda batafsil
            ko'ramiz.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Asosiy solishtirish operatorlari: <code>=</code>, <code>!=</code>, <code>&gt;</code>,{' '}
          <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>.
        </li>
        <li>
          Bu operatorlar ham sonli ustunlarda (<code>narx</code>), ham matnli ustunlarda (
          <code>kategoriya</code>) ishlaydi.
        </li>
        <li>
          SQLite'da <code>!=</code> va <code>&lt;&gt;</code> ikkalasi ham "teng emas" degani —
          izchillik uchun bittasini tanlab qolgan joyda ham shu uslubga amal qiling.
        </li>
      </KeyPoints>
    </>
  )
}
