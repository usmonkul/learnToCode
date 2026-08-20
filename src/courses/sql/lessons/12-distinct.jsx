import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'DISTINCT',
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

export default function DistinctLesson() {
  return (
    <>
      <h2>Takrorlangan qiymatlar</h2>
      <p>
        <code>mahsulotlar</code> jadvalida o'nta qator bor, lekin ularning{' '}
        <code>kategoriya</code> ustuni faqat bir nechta xil qiymatdan iborat — chunki bir
        nechta mahsulot bir xil kategoriyaga tegishli. Buni ko'rish uchun oddiy so'rov yozamiz:
      </p>
      <CodeBlock lang="sql">{`SELECT kategoriya FROM mahsulotlar;`}</CodeBlock>
      <p>
        Bu so'rov <strong>o'nta qator</strong> qaytaradi — jadvaldagi har bir mahsulot uchun
        bittadan, hech narsa qisqartirilmagan holda: <code>Elektronika</code> to'rt marta,{' '}
        <code>Uy jihozlari</code> ikki marta, <code>Kiyim</code> ikki marta va{' '}
        <code>NULL</code> yana ikki marta (Ryukzak va Sovg'a sertifikati uchun) takrorlanadi.
        Agar bizga faqat "qanday kategoriyalar mavjud" degan savol qiziqtirsa, bu ko'p
        takrorlanish ortiqcha shovqin.
      </p>

      <h2>DISTINCT — faqat noyob qiymatlar</h2>
      <p>
        <code>SELECT</code>ga <code>DISTINCT</code> kalit so'zini qo'shsak, natijadagi
        takrorlangan qatorlar bittaga qisqartiriladi:
      </p>
      <CodeBlock lang="sql">{`SELECT DISTINCT kategoriya FROM mahsulotlar;`}</CodeBlock>
      <p>
        Bu safar natijada bor-yo'g'i <strong>to'rtta</strong> qator chiqadi: <code>Elektronika</code>,{' '}
        <code>Uy jihozlari</code>, <code>Kiyim</code> va <code>NULL</code>. Diqqat qiling —{' '}
        <code>NULL</code> ham alohida qiymat sifatida hisoblanadi va ikkala <code>NULL</code>{' '}
        qator (Ryukzak, Sovg'a sertifikati) natijada bitta guruhga birlashtirilib, bitta{' '}
        <code>NULL</code> qator sifatida qaytadi.{' '}
        <code>DISTINCT</code> shunchaki "takrorlarni olib tashlaydi" demaslik kerak — aniqrog'i,
        u <strong>bir xil qiymatga ega qatorlarni bitta guruhga birlashtiradi</strong>, va{' '}
        <code>NULL</code> ham shu qoidaga bo'ysunadi: barcha <code>NULL</code> qiymatlar bitta
        guruh hisoblanadi, garchi 9-darsda ko'rganimizdek <code>NULL</code>ni odatiy{' '}
        <code>=</code> bilan solishtirib bo'lmasa ham.
      </p>
      <Callout type="note" title="DISTINCT vs oddiy SELECT">
        <code>SELECT kategoriya</code> — jadvaldagi har bir qator uchun bittadan natija
        qatorini beradi (takrorlar bilan). <code>SELECT DISTINCT kategoriya</code> — faqat
        noyob qiymatlar ro'yxatini beradi, har biri bir marta, <code>NULL</code>{' '}
        shu jumladan.
      </Callout>

      <h2>O'zingiz sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada avval <code>SELECT kategoriya FROM mahsulotlar;</code> so'rovini
        ishga tushiring va necha qator qaytishini sanang. So'ng oldiga <code>DISTINCT</code>{' '}
        qo'shib qayta ishga tushiring va farqni ko'ring.
      </p>
      <SqlPlayground
        schema={MAHSULOTLAR_SCHEMA}
        initialQuery={`SELECT kategoriya FROM mahsulotlar;`}
      />

      <Callout type="tip" title="Oldinga qarab: GROUP BY">
        <code>DISTINCT</code> faqat noyob qiymatlarni ko'rsatadi. Keyinchalik "Agregatsiya"
        bo'limida <code>GROUP BY</code>ni o'rganamiz — u ham qatorlarni qiymat bo'yicha
        guruhlaydi, lekin har bir guruh haqida qo'shimcha hisob-kitob (masalan, "har bir
        kategoriyada nechta mahsulot bor") qilish imkonini beradi.
      </Callout>

      <Quiz
        question="SELECT DISTINCT kategoriya FROM mahsulotlar; so'rovi necha qator qaytaradi?"
        options={[
          "10 — jadvaldagi har bir qator uchun bittadan",
          "3 — faqat NULL bo'lmagan noyob kategoriyalar",
          "4 — uchta noyob kategoriya nomi va bitta NULL guruhi",
          "0 — DISTINCT NULL qiymatlarni butunlay chiqarib tashlaydi"
        ]}
        correctIndex={2}
        explanation="Jadvalda uchta noyob kategoriya nomi (Elektronika, Uy jihozlari, Kiyim) bor, plus ikkita NULL qator bitta guruhga birlashadi — jami to'rt qator."
      />

      <Quiz
        question="DISTINCT NULL qiymatlarni qanday ishlaydi?"
        options={[
          "Har bir NULL qatorni alohida, noyob qator sifatida qaytaradi",
          "Barcha NULL qiymatlarni butunlay natijadan chiqarib tashlaydi",
          "Barcha NULL qiymatlarni bitta guruhga birlashtirib, bitta NULL qator qaytaradi",
          "NULL qiymatlar bo'lsa, DISTINCT SQL xatosi beradi"
        ]}
        correctIndex={2}
        explanation="DISTINCT bir xil qiymatga ega qatorlarni bitta guruhga birlashtiradi, va bu qoida NULLga ham tegishli — barcha NULL qatorlar bitta guruh sifatida hisoblanadi."
      />

      <Exercise title="Mashq">
        <p>
          Yuqoridagi SQL maydonchasida jadvaldagi barcha noyob narxlarni (<code>narx</code>{' '}
          ustuni) ko'rsatadigan so'rov yozing. Natija necha qatordan iborat bo'lishini oldindan
          taxmin qiling, so'ng ishga tushirib tekshiring.
        </p>
        <Solution>
          <CodeBlock lang="sql">{`SELECT DISTINCT narx FROM mahsulotlar;`}</CodeBlock>
          <p>
            Natijada aynan <strong>o'nta</strong> qator chiqadi — jadvaldagi barcha o'nta
            mahsulotning narxi turlicha, hech ikkitasi bir xil emas. Bu shuni ko'rsatadiki,{' '}
            <code>DISTINCT</code> har doim ham qator sonini kamaytiravermaydi — u faqat
            haqiqatan ham takrorlangan qiymatlar bo'lgandagina qisqartiradi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>SELECT kategoriya FROM mahsulotlar</code> jadvaldagi har bir qator uchun
          bittadan natija beradi — takrorlar bilan.
        </li>
        <li>
          <code>SELECT DISTINCT kategoriya FROM mahsulotlar</code> bir xil qiymatga ega
          qatorlarni bitta guruhga birlashtirib, faqat noyob qiymatlarni qaytaradi.
        </li>
        <li>
          <code>DISTINCT</code> uchun barcha <code>NULL</code> qiymatlar ham bitta guruh
          hisoblanadi — ular natijada bitta <code>NULL</code> qator sifatida chiqadi, alohida
          emas.
        </li>
        <li>
          Agar ustundagi barcha qiymatlar allaqachon noyob bo'lsa (masalan, <code>narx</code>),{' '}
          <code>DISTINCT</code> qator sonini kamaytirmaydi.
        </li>
      </KeyPoints>
    </>
  )
}
