import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'AND, OR, NOT',
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

export default function AndOrNotLesson() {
  return (
    <>
      <h2>Bir nechta shartni birlashtirish</h2>
      <p>
        Hozirgacha <code>WHERE</code>da bir vaqtning o'zida faqat bitta shart yozdik. Lekin
        haqiqiy savollar ko'pincha bir nechta shartdan iborat bo'ladi — masalan, "Elektronika{' '}
        <strong>va</strong> narxi 500 000 so'mdan qimmat" yoki "Kiyim <strong>yoki</strong> Uy
        jihozlari". Buning uchun SQL uchta{' '}
        <strong>mantiqiy operator (logical operator)</strong>ni taqdim etadi: <code>AND</code>,{' '}
        <code>OR</code> va <code>NOT</code>.
      </p>

      <h2>AND — ikkala shart ham to'g'ri bo'lishi kerak</h2>
      <p>
        <code>AND</code> ikki (yoki undan ko'p) shartni bog'laydi, va qator natijaga faqat{' '}
        <strong>barcha</strong> shartlar bir vaqtda to'g'ri bo'lsagina kiradi. Masalan,
        Elektronika kategoriyasidagi va narxi 500 000 so'mdan qimmat mahsulotlarni topish:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, narx, kategoriya FROM mahsulotlar
WHERE kategoriya = 'Elektronika' AND narx > 500000;`}</CodeBlock>
      <p>
        Natijada faqat Noutbuk va Monitor chiqadi — chunki Sichqoncha va Klaviatura ham
        Elektronika, lekin narxlari 500 000dan past, shuning uchun ikkinchi shart ularga to'g'ri
        kelmaydi.
      </p>

      <h2>OR — kamida bitta shart to'g'ri bo'lsa yetarli</h2>
      <p>
        <code>OR</code> esa qatorni natijaga qo'shish uchun shartlardan{' '}
        <strong>kamida bittasi</strong> to'g'ri bo'lishini talab qiladi. Masalan, Kiyim yoki Uy
        jihozlari kategoriyasidagi mahsulotlarni topish:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, kategoriya FROM mahsulotlar
WHERE kategoriya = 'Kiyim' OR kategoriya = 'Uy jihozlari';`}</CodeBlock>
      <p>
        Natijada to'rtta mahsulot chiqadi: Stol lampa, Kitob tokchasi (Uy jihozlari), Sport
        krossovka va Futbolka (Kiyim).
      </p>

      <h2>NOT — shartni teskarisiga aylantiradi</h2>
      <p>
        <code>NOT</code> undan keyingi shartning natijasini teskarisiga o'giradi. Masalan,
        Elektronika bo'lmagan mahsulotlarni <code>NOT</code> bilan ham topish mumkin:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, kategoriya FROM mahsulotlar
WHERE NOT kategoriya = 'Elektronika';`}</CodeBlock>
      <p>
        Bu <code>kategoriya != 'Elektronika'</code> bilan bir xil natija beradi — ikkalasi ham
        Elektronika bo'lmagan to'rtta mahsulotni qaytaradi (Stol lampa, Kitob tokchasi, Sport
        krossovka, Futbolka).
      </p>

      <h2>Diqqat: AND, OR'dan kuchliroq bog'lanadi</h2>
      <p>
        <code>AND</code> va <code>OR</code>ni bitta shartda birga ishlatganda, muhim bir qoidani
        bilish kerak: SQL <code>AND</code>ni <code>OR</code>dan{' '}
        <strong>oldin</strong> hisoblaydi — xuddi matematikada ko'paytirish qo'shishdan oldin
        bajarilgani kabi. Bu qoidani bilmasangiz, so'rov natijasi kutganingizdan boshqacha
        chiqishi mumkin. Quyidagi so'rovni ko'ramiz — u "Kiyim bo'lgan YOKI (Elektronika bo'lgan
        VA narxi 1 000 000dan qimmat)" mahsulotlarni topmoqchi:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, narx, kategoriya FROM mahsulotlar
WHERE kategoriya = 'Kiyim' OR kategoriya = 'Elektronika' AND narx > 1000000;`}</CodeBlock>
      <p>
        Bu so'rov <strong>to'rtta</strong> qator qaytaradi: Noutbuk, Monitor (ikkalasi ham
        Elektronika va 1 000 000dan qimmat), shuningdek Sport krossovka va Futbolka (ikkalasi
        ham Kiyim — narxidan qat'i nazar). Sabab: SQL bu shartni{' '}
        <code>kategoriya = 'Kiyim' OR (kategoriya = 'Elektronika' AND narx &gt; 1000000)</code>{' '}
        deb o'qiydi — ya'ni <code>AND</code> qismi avval hisoblanadi, so'ng natija{' '}
        <code>OR</code> bilan Kiyim shartiga qo'shiladi. Shu sababli barcha Kiyim mahsulotlari
        (narxidan qat'i nazar) natijaga kiradi.
      </p>
      <p>
        Endi xuddi shu shartni qavs bilan yozamiz — bu safar "(Kiyim YOKI Elektronika) VA
        narxi 1 000 000dan qimmat" degan ma'noni beradi:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, narx, kategoriya FROM mahsulotlar
WHERE (kategoriya = 'Kiyim' OR kategoriya = 'Elektronika') AND narx > 1000000;`}</CodeBlock>
      <p>
        Bu safar natijada faqat <strong>ikkita</strong> qator qoladi: Noutbuk va Monitor. Sport
        krossovka va Futbolka endi natijaga kirmaydi, chunki ularning narxi 1 000 000dan past —
        qavs endi "narxi 1 000 000dan qimmat" shartini <strong>ikkala</strong> kategoriyaga ham
        tatbiq qiladi. Ko'rib turganingizdek, bitta qavs juftligi natijani to'rt qatordan ikki
        qatorgacha o'zgartirdi — bu tasodifiy misol emas, aynan operatorlar ustuvorligining
        real oqibati.
      </p>
      <Callout type="warning" title="Har doim qavsdan foydalaning">
        <code>AND</code> va <code>OR</code>ni birga ishlatganda, SQL qanday o'qishini yodda
        ushlab turishga ishonmang — har doim qavs qo'ying. Qavs shartni siz mo'ljallagan tartibda
        aniq belgilaydi va so'rovni o'qigan har qanday odam (shu jumladan bir necha oydan keyingi
        o'zingiz ham) uni darhol to'g'ri tushunadi.
      </Callout>

      <h2>O'zingiz sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada qavs bilan yozilgan to'g'ri so'rov tayyor. <strong>Bajarish</strong>
        ni bosing, so'ng qavslarni olib tashlab natija qanday o'zgarishini kuzating.
      </p>
      <SqlPlayground
        schema={MAHSULOTLAR_SCHEMA}
        initialQuery={`SELECT nom, narx, kategoriya FROM mahsulotlar
WHERE (kategoriya = 'Kiyim' OR kategoriya = 'Elektronika') AND narx > 1000000;`}
      />

      <Quiz
        question="WHERE kategoriya = 'Kiyim' OR kategoriya = 'Elektronika' AND narx > 1000000 shartida SQL qaysi qismni avval hisoblaydi?"
        options={[
          "kategoriya = 'Kiyim' OR kategoriya = 'Elektronika' qismini",
          "kategoriya = 'Elektronika' AND narx > 1000000 qismini",
          "So'rov chapdan o'ngga, tartib bo'yicha hisoblanadi",
          "Bu SQL xatosiga olib keladi"
        ]}
        correctIndex={1}
        explanation="AND, OR'dan oldin hisoblanadi, shuning uchun avval 'kategoriya = Elektronika AND narx > 1000000' qismi baholanadi, so'ng natija OR orqali 'kategoriya = Kiyim' shartiga qo'shiladi."
      />

      <Quiz
        question="NOT kategoriya = 'Elektronika' sharti qanday natija beradi?"
        options={[
          "Faqat kategoriya NULL bo'lgan qatorlarni",
          "Kategoriyasi Elektronika bo'lmagan qatorlarni (NULL qatorlarsiz)",
          "Barcha qatorlarni, chunki NOT hech narsani filtlamaydi",
          "SQL xatosini keltirib chiqaradi"
        ]}
        correctIndex={1}
        explanation="NOT shartning natijasini teskarisiga o'giradi, shuning uchun 'kategoriya = Elektronika'ga to'g'ri kelmaydigan qatorlar qoladi — bu kategoriya != 'Elektronika' bilan bir xil natija."
      />

      <Exercise title="Mashq">
        <p>
          Yuqoridagi SQL maydonchasida narxi 200 000 so'mdan arzon <strong>yoki</strong> Uy
          jihozlari kategoriyasidagi mahsulotlarni topadigan so'rov yozing. Keyin xuddi shu
          so'rovni <code>AND</code> bilan almashtirib ("narxi 200 000dan arzon{' '}
          <strong>va</strong> Uy jihozlari") natija qanday farq qilishini solishtiring.
        </p>
        <Solution>
          <CodeBlock lang="sql">{`SELECT nom, narx, kategoriya FROM mahsulotlar
WHERE narx < 200000 OR kategoriya = 'Uy jihozlari';`}</CodeBlock>
          <p>
            Bu so'rov Sichqoncha, Stol lampa, Kitob tokchasi va Futbolkani qaytaradi — ularning
            har biri kamida bitta shartga to'g'ri keladi (narxi arzon YOKI Uy jihozlari).
          </p>
          <CodeBlock lang="sql">{`SELECT nom, narx, kategoriya FROM mahsulotlar
WHERE narx < 200000 AND kategoriya = 'Uy jihozlari';`}</CodeBlock>
          <p>
            <code>AND</code> bilan esa faqat Stol lampa qoladi — chunki u yagona mahsulotki,
            narxi ham 200 000dan arzon, ham kategoriyasi Uy jihozlari (ikkala shart bir vaqtda
            to'g'ri). <code>OR</code> ko'proq qator qaytaradi, <code>AND</code> esa kamroq —
            chunki talablar qat'iyroq.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>AND</code> — barcha shartlar to'g'ri bo'lganda qator natijaga kiradi.
        </li>
        <li>
          <code>OR</code> — kamida bitta shart to'g'ri bo'lsa, qator natijaga kiradi.
        </li>
        <li>
          <code>NOT</code> — undan keyingi shartning natijasini teskarisiga o'giradi.
        </li>
        <li>
          <code>AND</code>, <code>OR</code>dan oldin hisoblanadi — bir shartda ikkalasini birga
          ishlatganda, natijani aniq belgilash uchun har doim qavsdan foydalaning.
        </li>
      </KeyPoints>
    </>
  )
}
