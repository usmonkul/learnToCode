import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'LIKE',
  section: 'Murakkab filtrlash',
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

export default function LikeLesson() {
  return (
    <>
      <h2>LIKE — matn ichidan qidirish</h2>
      <p>
        <code>=</code> operatori matnni faqat <strong>to'liq</strong> mos kelganda topadi.
        Lekin ko'pincha aniq matnni emas, balki bir qismini bilamiz — masalan, "nomida{' '}
        <em>'buk'</em> so'zi bor mahsulotlarni ko'rsat". Bunday <strong>naqsh (pattern)</strong>{' '}
        bo'yicha qidirish uchun SQL <code>LIKE</code> operatorini beradi. U ikkita maxsus
        belgi — <code>%</code> va <code>_</code> — bilan ishlaydi.
      </p>

      <h2>% — istalgan sondagi belgi</h2>
      <p>
        <code>%</code> naqsh ichida "bu yerda nol yoki undan ko'p istalgan belgi bo'lishi
        mumkin" degan ma'noni bildiradi. Nomi "S" harfi bilan boshlanadigan mahsulotlarni
        topamiz:
      </p>
      <CodeBlock lang="sql">{`SELECT nom FROM mahsulotlar
WHERE nom LIKE 'S%';`}</CodeBlock>
      <p>
        Natijada to'rtta qator chiqadi: Sichqoncha, Sovg'a sertifikati, Sport krossovka, Stol
        lampa — nomi <code>S</code> bilan boshlanib, keyin istalgan sondagi belgi kelgan
        barcha mahsulotlar. <code>%</code>ni naqshning istalgan joyiga qo'yish mumkin —
        masalan, nomi <code>"buk"</code> bilan tugaydigan mahsulotni topish uchun:
      </p>
      <CodeBlock lang="sql">{`SELECT nom FROM mahsulotlar
WHERE nom LIKE '%buk';`}</CodeBlock>
      <p>
        Bu safar faqat bitta qator qaytadi — Noutbuk. <code>%</code> naqsh boshida turgani
        uchun "oldidan istalgan narsa kelishi mumkin, lekin nom aynan <code>buk</code> bilan
        tugashi kerak" degan shart hosil bo'ladi.
      </p>

      <h2>_ — aynan bitta belgi</h2>
      <p>
        <code>_</code> (pastki chiziqcha) esa <code>%</code>dan farqli — u naqshdagi{' '}
        <strong>aynan bitta</strong> istalgan belgi o'rnini bosadi, ko'p ham, kam ham emas.
        Masalan, "Monitor" so'zini birinchi harfini bilmasdan qidiramiz deylik:
      </p>
      <CodeBlock lang="sql">{`SELECT nom FROM mahsulotlar
WHERE nom LIKE '_onitor';`}</CodeBlock>
      <p>
        Natijada Monitor topiladi — <code>_</code> aynan bitta belgi (<code>M</code>) o'rnini
        bosdi, qolgan <code>onitor</code> qismi so'zma-so'z mos kelishi shart edi. Agar shu
        yerda <code>%</code> ishlatilganda ham xuddi shunday natija chiqardi, lekin{' '}
        <code>_</code> aynan "bitta belgi" ekanini kafolatlaydi — bu naqshni aniqroq va
        tasodifiy keng mos kelishlardan himoyalangan qiladi.
      </p>

      <Callout type="note" title="LIKE odatda katta-kichik harfga sezgir emas">
        SQLite'da <code>LIKE</code> operatori ASCII harflari uchun sukut bo'yicha{' '}
        <strong>katta-kichik harfga sezgir emas (case-insensitive)</strong>. Ya'ni{' '}
        <code>nom LIKE 'noutbuk'</code> ham, <code>nom LIKE 'NOUTBUK'</code> ham xuddi bir xil
        — ikkalasi ham "Noutbuk"ni topadi.
      </Callout>

      <h2>O'zingiz sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada <code>%</code> bilan naqsh qidiruvi tayyor. Uni ishga tushiring,
        so'ng naqshni <code>'%o%'</code> ga o'zgartirib, tarkibida "o" harfi bor barcha
        mahsulotlar qanday chiqishini kuzating.
      </p>
      <SqlPlayground
        schema={MAHSULOTLAR_SCHEMA}
        initialQuery={`SELECT nom FROM mahsulotlar
WHERE nom LIKE 'S%';`}
      />

      <Quiz
        question="LIKE naqshidagi % belgisi nimani bildiradi?"
        options={[
          "Aynan bitta istalgan belgi",
          "Nol yoki undan ko'p istalgan belgi",
          "Faqat raqamlarni",
          "Naqshning boshlanishini"
        ]}
        correctIndex={1}
        explanation="% — nol yoki undan ko'p istalgan belgi o'rnini bosadi. Bitta aniq belgi uchun esa _ ishlatiladi."
      />

      <Quiz
        question="nom LIKE 'noutbuk' so'rovi 'Noutbuk' qatorini topadimi?"
        options={[
          "Yo'q, chunki harflar katta-kichikligi mos kelmaydi",
          "Ha, chunki SQLite'da LIKE ASCII uchun sukut bo'yicha katta-kichik harfga sezgir emas",
          "Faqat WHERE UPPER(nom) = 'NOUTBUK' yozilsa topiladi",
          "Bu SQL xatosiga olib keladi"
        ]}
        correctIndex={1}
        explanation="SQLite'da LIKE operatori ASCII harflari uchun katta-kichik harfni farqlamaydi, shuning uchun 'noutbuk' ham 'Noutbuk'ni topadi."
      />

      <Exercise title="Mashq">
        <p>
          Yuqoridagi SQL maydonchasida nomi <strong>"K"</strong> harfi bilan boshlanadigan
          barcha mahsulotlarni chiqaradigan <code>LIKE</code> so'rovi yozing.
        </p>
        <Solution>
          <CodeBlock lang="sql">{`SELECT nom FROM mahsulotlar
WHERE nom LIKE 'K%';`}</CodeBlock>
          <p>
            Natijada ikkita qator chiqadi: Kitob tokchasi va Klaviatura — nomi{' '}
            <code>K</code> bilan boshlanadigan mahsulotlar.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>LIKE</code> — matn ustunlarida naqsh (pattern) bo'yicha qidirish uchun
          ishlatiladi, <code>=</code>dan farqli, to'liq mos kelishni talab qilmaydi.
        </li>
        <li>
          <code>%</code> — nol yoki undan ko'p istalgan belgi; <code>_</code> — aynan bitta
          istalgan belgi.
        </li>
        <li>
          SQLite'da <code>LIKE</code> ASCII harflari uchun sukut bo'yicha katta-kichik harfga
          sezgir emas.
        </li>
      </KeyPoints>
    </>
  )
}
