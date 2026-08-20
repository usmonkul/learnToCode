import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'GROUP BY',
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

export default function GroupByLesson() {
  return (
    <>
      <h2>Butun jadval yetarli emas bo'lganda</h2>
      <p>
        Oldingi darsda <code>COUNT(*)</code> va <code>AVG(narx)</code> kabi agregat
        funksiyalarni butun <code>mahsulotlar</code> jadvali ustida ishlatdik — natija har
        doim bitta qator edi: "jami nechta mahsulot bor", "o'rtacha narx qancha". Lekin ko'pincha
        savol butun jadval haqida emas, balki <strong>har bir kategoriya haqida alohida</strong>{' '}
        beriladi: "har bir kategoriyada nechta mahsulot bor?", "har bir kategoriyaning o'rtacha
        narxi qancha?". Buning uchun <code>GROUP BY</code> kerak.
      </p>

      <h2>Mental model: qatorlarni qutilarga bo'lish</h2>
      <p>
        <code>GROUP BY</code>ni tushunishning eng oson yo'li — uni <strong>saralash
        qutilariga bo'lish</strong> jarayoni sifatida tasavvur qilish. <code>GROUP BY
        kategoriya</code> yozganingizda, SQL avval jadvaldagi barcha qatorlarni{' '}
        <code>kategoriya</code> ustunidagi qiymatiga qarab alohida qutilarga taqsimlaydi:
      </p>
      <ul>
        <li><strong>Elektronika</strong> qutisi: Noutbuk, Sichqoncha, Klaviatura, Monitor</li>
        <li><strong>Uy jihozlari</strong> qutisi: Stol lampa, Kitob tokchasi</li>
        <li><strong>Kiyim</strong> qutisi: Sport krossovka, Futbolka</li>
        <li><strong>NULL</strong> qutisi: Ryukzak, Sovg'a sertifikati</li>
      </ul>
      <p>
        Shundan so'ng, so'rovdagi har bir agregat funksiya (<code>COUNT</code>,{' '}
        <code>AVG</code> va h.k.) butun jadval ustida emas, balki <strong>har bir quti
        ichida alohida</strong> hisoblanadi. Natijada bitta qator emas — har bir quti uchun
        bittadan qator chiqadi.
      </p>

      <h2>GROUP BY + COUNT(*)</h2>
      <p>Har bir kategoriyada nechta mahsulot borligini topamiz:</p>
      <CodeBlock lang="sql">{`SELECT kategoriya, COUNT(*) FROM mahsulotlar GROUP BY kategoriya;`}</CodeBlock>
      <p>
        Natija — to'rtta qator, har bir "quti" uchun bittadan: <code>Elektronika</code> —{' '}
        <code>4</code>, <code>Uy jihozlari</code> — <code>2</code>, <code>Kiyim</code> —{' '}
        <code>2</code>, va <code>NULL</code> — <code>2</code>. Diqqat qiling —{' '}
        <code>NULL</code> ham o'z qutisiga ega bo'ladi, xuddi 12-darsda <code>DISTINCT</code>da
        ko'rganimizdek: barcha <code>NULL</code> qatorlar (Ryukzak, Sovg'a sertifikati) bitta
        guruhga birlashadi.
      </p>

      <h2>GROUP BY + AVG(narx)</h2>
      <p>Endi har bir kategoriyaning o'rtacha narxini topamiz:</p>
      <CodeBlock lang="sql">{`SELECT kategoriya, AVG(narx) FROM mahsulotlar GROUP BY kategoriya;`}</CodeBlock>
      <p>
        Bu safar <code>AVG(narx)</code> har bir kategoriya qutisi ichidagi narxlarning
        o'rtachasini hisoblaydi — masalan, Elektronika qutisidagi to'rtta narx (4500000, 85000,
        210000, 1500000) o'rtachasi <code>1573750</code> bo'ladi, butun jadval o'rtachasi
        (<code>801500</code>) emas.
      </p>

      <h2>Bir nechta agregatni birga ishlatish</h2>
      <p>
        Bitta so'rovda ham <code>COUNT</code>, ham <code>AVG</code>ni birga, taxalluslar
        (aliaslar) bilan ishlatish mumkin:
      </p>
      <CodeBlock lang="sql">{`SELECT kategoriya, COUNT(*) AS soni, AVG(narx) AS ortacha_narx
FROM mahsulotlar
GROUP BY kategoriya;`}</CodeBlock>
      <p>
        Bu so'rov har bir kategoriya uchun bir vaqtning o'zida mahsulotlar sonini ham,
        o'rtacha narxini ham ko'rsatadi — bitta natijada.
      </p>

      <Callout type="warning" title="SELECT ro'yxatidagi qoida">
        <code>GROUP BY</code> ishlatilganda, <code>SELECT</code> ro'yxatida odatda faqat{' '}
        <code>GROUP BY</code>da ko'rsatilgan ustunlar (masalan, <code>kategoriya</code>) va
        agregat funksiyalar bo'lishi kerak. <code>nom</code> kabi guruhlanmagan ustunni
        qo'shishga urinish mantiqan noaniq — har bir kategoriya qutisida bir nechta mahsulot
        nomi bor, SQL qaysi birini ko'rsatishni bilmaydi.
      </Callout>

      <h2>O'zingiz sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada avval <code>SELECT kategoriya, COUNT(*) FROM mahsulotlar GROUP BY
        kategoriya;</code> so'rovini ishga tushiring. So'ng <code>COUNT(*)</code>ni{' '}
        <code>SUM(narx)</code> yoki <code>MAX(narx)</code>ga almashtirib, natija qanday
        o'zgarishini kuzating.
      </p>
      <SqlPlayground
        schema={MAHSULOTLAR_SCHEMA}
        initialQuery={`SELECT kategoriya, COUNT(*) AS soni, AVG(narx) AS ortacha_narx
FROM mahsulotlar
GROUP BY kategoriya;`}
      />

      <Callout type="tip" title="Oldinga qarab: HAVING">
        <code>GROUP BY</code> guruhlarni yaratadi va ularni agregatlaydi, lekin natijadagi
        guruhlarni filtrlash imkonini bermaydi. Keyingi darsda <code>HAVING</code>ni
        o'rganamiz — u aynan shu uchun kerak: masalan, "faqat 2 tadan ko'p mahsulot bor
        kategoriyalarni ko'rsat".
      </Callout>

      <Quiz
        question="GROUP BY kategoriya qanday ishlaydi?"
        options={[
          "Jadvaldagi qatorlarni kategoriya bo'yicha saralaydi (ORDER BY kabi), lekin ularni birlashtirmaydi",
          "Qatorlarni kategoriya qiymatiga qarab guruhlarga bo'ladi, keyin agregat funksiyalar har bir guruh ichida alohida hisoblanadi",
          "Faqat noyob kategoriya qiymatlarini ro'yxat qiladi, agregat funksiyalarsiz",
          "Kategoriyasi NULL bo'lgan qatorlarni natijadan olib tashlaydi"
        ]}
        correctIndex={1}
        explanation="GROUP BY qatorlarni ustun qiymatiga qarab guruhlarga (qutilarga) bo'ladi, va so'rovdagi agregat funksiyalar butun jadval emas, balki har bir guruh ichida alohida hisoblanadi."
      />

      <Quiz
        question="SELECT kategoriya, COUNT(*) FROM mahsulotlar GROUP BY kategoriya; so'rovi necha qator qaytaradi?"
        options={[
          "1 — chunki COUNT(*) har doim bitta qator qaytaradi",
          "10 — jadvaldagi har bir mahsulot uchun bittadan",
          "4 — uchta kategoriya nomi va bitta NULL guruhi uchun bittadan",
          "3 — faqat NULL bo'lmagan kategoriyalar uchun"
        ]}
        correctIndex={2}
        explanation="GROUP BY jadvalni to'rtta guruhga bo'ladi: Elektronika, Uy jihozlari, Kiyim va NULL — shuning uchun natija to'rtta qatordan iborat bo'ladi, har bir guruh uchun bittadan COUNT(*) qiymati bilan."
      />

      <Exercise title="Mashq">
        <p>
          Yuqoridagi SQL maydonchasida har bir kategoriya uchun eng qimmat mahsulot narxini
          (<code>MAX(narx)</code>) topadigan so'rov yozing. Natijada Elektronika kategoriyasi
          uchun qaysi son chiqishini oldindan taxmin qiling, so'ng tekshiring.
        </p>
        <Solution>
          <CodeBlock lang="sql">{`SELECT kategoriya, MAX(narx) AS eng_qimmat
FROM mahsulotlar
GROUP BY kategoriya;`}</CodeBlock>
          <p>
            Elektronika qutisi uchun natija <code>4500000</code> (Noutbuk) bo'ladi — bu
            kategoriyadagi to'rtta mahsulot orasidagi eng katta narx. Har bir kategoriya
            o'zining qutisi ichidagi eng katta narxni qaytaradi — masalan, Uy jihozlari uchun
            natija <code>650000</code> (Kitob tokchasi) bo'ladi, butun jadvaldagi eng katta narx
            emas. Elektronika uchun bu ikkalasi tasodifan bir xil chiqdi (<code>4500000</code>),
            chunki eng qimmat mahsulot aynan shu kategoriyada joylashgan.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>GROUP BY ustun</code> qatorlarni shu ustundagi qiymatga qarab guruhlarga
          (qutilarga) bo'ladi.
        </li>
        <li>
          Agregat funksiyalar (<code>COUNT</code>, <code>SUM</code>, <code>AVG</code>,{' '}
          <code>MIN</code>, <code>MAX</code>) har bir guruh ichida alohida hisoblanadi —
          butun jadval bo'yicha emas.
        </li>
        <li>
          Natijada har bir guruh uchun bittadan qator chiqadi — nechta noyob qiymat bo'lsa,
          shuncha qator (<code>NULL</code> ham o'z guruhiga ega).
        </li>
        <li>
          <code>SELECT</code> ro'yxatida odatda faqat <code>GROUP BY</code>dagi ustunlar va
          agregat funksiyalar bo'lishi kerak.
        </li>
      </KeyPoints>
    </>
  )
}
