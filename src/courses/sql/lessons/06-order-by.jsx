import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'ORDER BY',
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

export default function OrderByLesson() {
  return (
    <>
      <h2>Natijani tartiblash</h2>
      <p>
        Hozirgacha ishlatgan so'rovlarimizda qatorlar qanday tartibda qaytishini biz nazorat
        qilmadik — ular odatda jadvalga qo'shilgan tartibda chiqadi. Ko'pincha esa natijani
        ma'lum bir ustun bo'yicha — masalan, eng arzonidan eng qimmatigacha — tartiblab ko'rish
        kerak bo'ladi. Buning uchun <code>ORDER BY</code> ("bo'yicha tartiblash") kalit so'zi
        ishlatiladi.
      </p>

      <h2>ORDER BY — asosiy shakli</h2>
      <p>
        <code>ORDER BY</code> so'rov oxirida, ustun nomidan keyin yoziladi:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, narx FROM mahsulotlar
ORDER BY narx;`}</CodeBlock>
      <p>
        Bu so'rov mahsulotlarni <code>narx</code> bo'yicha <strong>o'sish tartibida</strong>{' '}
        (eng arzonidan eng qimmatigacha) qaytaradi. Agar hech qanday qo'shimcha so'z
        yozilmasa, SQL har doim o'sish tartibida (<code>ASC</code> — ascending) saralaydi — bu
        standart (default) xatti-harakat.
      </p>

      <h2>Kamayish tartibida: DESC</h2>
      <p>
        Agar teskarisini — eng qimmatidan eng arzonigacha — ko'rish kerak bo'lsa, ustun nomidan
        keyin <code>DESC</code> ("descending" — kamayish) so'zini qo'shamiz:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, narx FROM mahsulotlar
ORDER BY narx DESC;`}</CodeBlock>
      <Callout type="tip" title="ASC yozish shart emas">
        O'sish tartibi standart bo'lgani uchun <code>ORDER BY narx ASC</code> va{' '}
        <code>ORDER BY narx</code> bir xil natija beradi. Ko'pchilik <code>ASC</code>ni umuman
        yozmaydi, faqat <code>DESC</code> kerak bo'lganda uni aniq ko'rsatadi.
      </Callout>

      <h2>Bir nechta ustun bo'yicha tartiblash</h2>
      <p>
        Ba'zan bitta ustun yetarli bo'lmaydi. Masalan, mahsulotlarni avval{' '}
        <code>kategoriya</code> bo'yicha guruhlab, so'ng har bir kategoriya ichida{' '}
        <code>narx</code> bo'yicha (eng qimmatidan) tartiblashni xohlasak, vergul bilan
        ajratib ikkinchi ustunni ham qo'shamiz:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, kategoriya, narx FROM mahsulotlar
ORDER BY kategoriya, narx DESC;`}</CodeBlock>
      <p>
        Bu qanday ishlaydi: SQL avval barcha qatorlarni <code>kategoriya</code> bo'yicha alifbo
        tartibida joylaydi. Agar bir nechta qatorning <code>kategoriya</code>si bir xil bo'lsa
        (masalan, to'rtta Elektronika mahsuloti), o'sha "teng" qatorlar orasidagi tartib{' '}
        <strong>ikkinchi ustun</strong> — <code>narx DESC</code> — bo'yicha hal qilinadi. Ya'ni
        ikkinchi ustun faqat birinchi ustun bo'yicha <em>tenglik yuzaga kelganda</em> ("tie" —
        durrang holatda) ishga tushadi.
      </p>

      <h2>O'zingiz sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada mahsulotlar <code>kategoriya</code> bo'yicha, har bir kategoriya
        ichida esa <code>narx</code> bo'yicha kamayish tartibida saralangan so'rov tayyor.{' '}
        <strong>Bajarish</strong>ni bosing va Elektronika turkumidagi to'rtta mahsulotning o'zaro
        tartibiga (Noutbuk, Monitor, Klaviatura, Sichqoncha) e'tibor bering.
      </p>
      <SqlPlayground
        schema={MAHSULOTLAR_SCHEMA}
        initialQuery={`SELECT nom, kategoriya, narx FROM mahsulotlar
ORDER BY kategoriya, narx DESC;`}
      />

      <Quiz
        question="ORDER BY narx; so'rovida (qo'shimcha so'zsiz) natija qaysi tartibda chiqadi?"
        options={[
          "Kamayish tartibida (eng qimmatidan)",
          "O'sish tartibida (eng arzonidan) — bu standart tartib",
          "Tasodifiy tartibda",
          "id ustuni bo'yicha"
        ]}
        correctIndex={1}
        explanation="ORDER BY uchun standart (default) tartib — o'sish (ASC), shuning uchun ustunni aniq DESC deb belgilamasangiz, natija eng kichigidan eng kattasigacha chiqadi."
      />

      <Quiz
        question="ORDER BY kategoriya, narx DESC; so'rovida narx DESC qachon ishga tushadi?"
        options={[
          "Har doim, kategoriyadan qat'i nazar",
          "Faqat bir nechta qatorning kategoriyasi bir xil bo'lganda, o'sha guruh ichidagi tartibni hal qilish uchun",
          "Faqat kategoriya NULL bo'lganda",
          "Hech qachon, chunki faqat bitta ustun bo'yicha saralash mumkin"
        ]}
        correctIndex={1}
        explanation="Ikkinchi ustun faqat birinchi ustun bo'yicha tenglik (bir xil kategoriya) yuzaga kelganda, o'sha guruh ichidagi qatorlar tartibini aniqlash uchun ishlatiladi."
      />

      <Exercise title="Mashq">
        <p>
          Yuqoridagi SQL maydonchasida barcha mahsulotlarni <code>nom</code> (nomi) bo'yicha
          alifbo tartibida saralab chiqaradigan so'rov yozing.
        </p>
        <Solution>
          <CodeBlock lang="sql">{`SELECT nom, narx FROM mahsulotlar
ORDER BY nom;`}</CodeBlock>
          <p>
            <code>nom</code> matnli ustun bo'lgani uchun standart o'sish tartibi uni alifbo
            tartibida (A dan Z gacha) saralaydi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>ORDER BY ustun;</code> natijani berilgan ustun bo'yicha saralaydi; standart
          tartib — o'sish (<code>ASC</code>).
        </li>
        <li>
          Kamayish tartibi uchun ustun nomidan keyin <code>DESC</code> yoziladi.
        </li>
        <li>
          Bir nechta ustunni vergul bilan ajratib yozish mumkin: birinchi ustun asosiy tartib,
          ikkinchi ustun esa faqat birinchisi bo'yicha tenglik yuzaga kelganda ("tie-breaker")
          ishlatiladi.
        </li>
      </KeyPoints>
    </>
  )
}
