import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'WHERE — filtrlash',
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

export default function WhereLesson() {
  return (
    <>
      <h2>Nega filtrlash kerak?</h2>
      <p>
        Hozirgacha biz <code>SELECT</code> orqali qaysi <strong>ustunlarni</strong> ko'rishni
        tanladik, lekin har doim jadvaldagi <strong>barcha</strong> qatorlar qaytardi. Aslida esa
        ko'pincha bizga faqat ma'lum shartga mos keladigan qatorlar kerak bo'ladi — masalan,
        "faqat Elektronika turkumidagi mahsulotlar" yoki "faqat 200 000 so'mdan qimmat
        mahsulotlar". Aynan shu uchun <code>WHERE</code> (qaerda / qaysi shart bo'yicha) kalit
        so'zi bor — u qatorlarni <strong>filtrlash (filter)</strong> imkonini beradi.
      </p>

      <h2>WHERE qanday ishlatiladi</h2>
      <p>
        <code>WHERE</code> so'zi <code>FROM</code>dan keyin, so'rov oxirida yoziladi va undan
        keyin shart (condition) keladi:
      </p>
      <CodeBlock lang="sql">{`SELECT * FROM mahsulotlar
WHERE kategoriya = 'Elektronika';`}</CodeBlock>
      <p>
        Bu so'rov faqat <code>kategoriya</code> ustuni aynan <code>'Elektronika'</code>ga teng
        bo'lgan qatorlarni qaytaradi — bizning jadvalimizda bular Noutbuk, Sichqoncha, Klaviatura
        va Monitor. Matnli qiymatlarni har doim bitta qo'shtirnoq (<code>'...'</code>) ichiga
        olish kerakligiga e'tibor bering.
      </p>

      <h2>WHERE va SELECT — ish tartibi</h2>
      <p>
        Muhim tushuncha: <code>WHERE</code> so'rov matnida <code>SELECT</code>dan keyin
        yozilsa-da, ma'lumotlar bazasi uni <strong>SELECT'dan oldin</strong> bajaradi deb
        tasavvur qiling. Ya'ni jarayon quyidagicha ketadi:
      </p>
      <ol>
        <li>
          Avval <code>FROM</code> orqali jadval tanlanadi.
        </li>
        <li>
          So'ng <code>WHERE</code> sharti bo'yicha qatorlar filtrlanadi — shartga mos
          kelmaydigan qatorlar butunlay tashlab yuboriladi.
        </li>
        <li>
          Faqat shundan keyin <code>SELECT</code> qolgan qatorlardan qaysi ustunlarni ko'rsatish
          kerakligini hal qiladi.
        </li>
      </ol>
      <p>
        Boshqacha aytganda, <code>WHERE</code> — "qaysi qatorlar qoladi" degan savolga,{' '}
        <code>SELECT</code> esa "qolgan qatorlarda qaysi ustunlar ko'rinadi" degan savolga
        javob beradi. Bu ikkalasi bir-biriga bog'liq emas: <code>WHERE</code>da ishlatilgan
        ustun <code>SELECT</code> ro'yxatida umuman bo'lmasligi ham mumkin.
      </p>
      <Callout type="note" title="Masalan">
        <code>SELECT nom FROM mahsulotlar WHERE narx &gt; 1000000;</code> so'rovida{' '}
        <code>narx</code> filtrlash uchun ishlatiladi, lekin natija jadvalida{' '}
        <code>narx</code> ustuni umuman ko'rinmaydi — faqat <code>nom</code> chiqadi.
      </Callout>

      <h2>O'zingiz sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada Uy jihozlari turkumidagi mahsulotlarni topadigan so'rov tayyor.{' '}
        <strong>Bajarish</strong>ni bosing, so'ng shartni <code>kategoriya = 'Kiyim'</code>ga
        o'zgartirib qayta ishga tushiring.
      </p>
      <SqlPlayground
        schema={MAHSULOTLAR_SCHEMA}
        initialQuery={`SELECT nom, narx FROM mahsulotlar
WHERE kategoriya = 'Uy jihozlari';`}
      />

      <Quiz
        question="SELECT nom FROM mahsulotlar WHERE narx > 500000; so'rovida narx ustuni nima uchun ishlatiladi?"
        options={[
          "Natija jadvalida ko'rsatish uchun",
          "Faqat qatorlarni filtrlash uchun — u natijada ko'rinmasligi ham mumkin",
          "Jadvalni saralash uchun",
          "SQL da bu majburiy ustun"
        ]}
        correctIndex={1}
        explanation="WHERE'da ishlatilgan ustun faqat qatorlarni filtrlash uchun xizmat qiladi; u SELECT ro'yxatida bo'lishi shart emas va natijada ko'rinmasligi mumkin."
      />

      <Quiz
        question="Ma'lumotlar bazasi so'rovni bajarayotganda, WHERE va SELECT dan qaysi biri mantiqan avval ishlaydi?"
        options={[
          "SELECT avval, keyin WHERE",
          "WHERE avval — qatorlar filtrlanadi, keyin SELECT ustunlarni tanlaydi",
          "Ikkalasi bir vaqtda ishlaydi",
          "Bu SQL versiyasiga bog'liq"
        ]}
        correctIndex={1}
        explanation="Mantiqan avval WHERE shartiga mos qatorlar tanlanadi, so'ng qolgan qatorlardan SELECT ro'yxatidagi ustunlar ko'rsatiladi."
      />

      <Exercise title="Mashq">
        <p>
          Yuqoridagi SQL maydonchasida narxi aynan 200000 so'm bo'lgan mahsulot(lar)ni topadigan
          so'rov yozing (barcha ustunlar bilan).
        </p>
        <Solution>
          <CodeBlock lang="sql">{`SELECT * FROM mahsulotlar
WHERE narx = 200000;`}</CodeBlock>
          <p>
            Bitta qator qaytadi: <code>id</code>si 10 bo'lgan "Sovg'a sertifikati", chunki uning{' '}
            <code>narx</code>i aynan 200000ga teng.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>WHERE</code> — jadvaldan faqat berilgan shartga mos keladigan qatorlarni tanlab
          olish uchun ishlatiladi.
        </li>
        <li>
          Matnli qiymatlar <code>WHERE</code> shartida bitta qo'shtirnoq ichiga olinadi:{' '}
          <code>kategoriya = 'Elektronika'</code>.
        </li>
        <li>
          Mantiqan <code>WHERE</code> filtrlashi <code>SELECT</code>ning ustun tanlashidan oldin
          sodir bo'ladi — bu ikkalasi bir-biridan mustaqil ishlaydi.
        </li>
        <li>
          <code>WHERE</code>da ishlatilgan ustun natija jadvalida ko'rinishi shart emas.
        </li>
      </KeyPoints>
    </>
  )
}
