import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'NULL bilan ishlash',
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

export default function NullLesson() {
  return (
    <>
      <h2>NULL nima?</h2>
      <p>
        Bizning <code>mahsulotlar</code> jadvalimizda Ryukzak va Sovg'a sertifikatining{' '}
        <code>kategoriya</code> ustuni <code>NULL</code> qiymatga ega. <code>NULL</code>{' '}
        <strong>"qiymat yo'qligi"</strong>ni bildiradi — u nol (<code>0</code>) ham, bo'sh
        matn (<code>''</code>) ham emas. Bu shunchaki "bu yerda hech qanday ma'lumot
        kiritilmagan" degani. Masalan, Ryukzakni qaysi kategoriyaga qo'yishni hali
        aniqlashmagan bo'lishi mumkin — shuning uchun u qiymat <code>0</code> yoki{' '}
        <code>''</code> emas, balki umuman <strong>yo'q</strong>.
      </p>
      <Callout type="note" title="NULL — bu qiymat emas, qiymat yo'qligi">
        <code>0</code> — bu son. <code>''</code> — bu bo'sh, lekin mavjud matn. <code>NULL</code>{' '}
        esa umuman hech narsa emas: "bu maydon uchun ma'lumot kiritilmagan" degan holat. Aynan
        shu farq quyida ko'radigan g'alati xatti-harakatning sababi.
      </Callout>

      <h2>Kutilmagan holat: WHERE kategoriya = NULL ishlamaydi</h2>
      <p>
        Ryukzak va Sovg'a sertifikatini topish uchun instinktiv ravishda shunday yozgimiz
        keladi:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, kategoriya FROM mahsulotlar
WHERE kategoriya = NULL;`}</CodeBlock>
      <p>
        Bu so'rovni ishga tushiring — u xato bermaydi, lekin natijada{' '}
        <strong>bironta ham qator qaytmaydi</strong>, garchi jadvalda aynan{' '}
        <code>NULL</code> kategoriyali ikkita qator bo'lsa ham. Bu ko'plab boshlovchilarni
        hayratda qoldiradi: nega o'zi mos keladigan qatorlar bor bo'lsa ham, natija bo'sh?
      </p>

      <h2>Sabab: uch qiymatli mantiq (three-valued logic)</h2>
      <p>
        Oddiy dasturlash tillarida shart yoki <code>true</code>, yoki <code>false</code> bo'ladi.
        SQLda esa har qanday qiymatni <code>NULL</code> bilan solishtirganda uchinchi natija
        paydo bo'ladi: <strong>"noma'lum" (unknown)</strong>. <code>NULL</code>{' '}
        "hech qanday qiymat emas", shuning uchun uni boshqa hech narsa bilan{' '}
        <strong>solishtirib bo'lmaydi</strong> — hatto boshqa <code>NULL</code> bilan ham.{' '}
        <code>kategoriya = NULL</code> ifodasining natijasi <code>true</code> ham,{' '}
        <code>false</code> ham emas — u <strong>noma'lum</strong>. <code>WHERE</code> esa faqat{' '}
        natijasi aniq <code>true</code> bo'lgan qatorlarni qoldiradi; "noma'lum" natijali
        qatorlar ham chetlab o'tiladi — xuddi <code>false</code> kabi, lekin sabab boshqacha.
      </p>
      <p>
        Aynan shu qoida <code>!=</code> operatoriga ham tegishli. 5-darsda{' '}
        <code>WHERE kategoriya != 'Elektronika'</code> so'rovi <code>NULL</code> kategoriyali
        Ryukzak va Sovg'a sertifikatini natijaga qo'shmasligini ko'rgan edik. Sababi endi aniq:{' '}
        <code>NULL != 'Elektronika'</code> ifodasi ham "noma'lum" natija beradi — chunki bu
        yerda ham <code>NULL</code> biror narsa bilan solishtirilmoqda. "Noma'lum" natija esa{' '}
        <code>WHERE</code> uchun <code>true</code> emas, shuning uchun bu qatorlar ham
        chetlanadi. Tekshirib ko'raylik:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, kategoriya FROM mahsulotlar
WHERE kategoriya != 'Elektronika';`}</CodeBlock>
      <p>
        Natijada to'rtta qator chiqadi (Stol lampa, Kitob tokchasi, Sport krossovka, Futbolka) —
        Ryukzak va Sovg'a sertifikati bu yerda ham yo'q. Demak <code>=</code> ham,{' '}
        <code>!=</code> ham — SQLning <strong>hech qanday</strong> solishtirish operatori{' '}
        <code>NULL</code>ni "topa olmaydi". Bu tasodif emas, mantiqiy qoida.
      </p>

      <h2>To'g'ri yechim: IS NULL va IS NOT NULL</h2>
      <p>
        <code>NULL</code>ni tekshirish uchun SQL alohida operatorlar beradi:{' '}
        <code>IS NULL</code> va <code>IS NOT NULL</code>. Ular solishtirish emas, balki
        "bu qiymat yo'qmi?" degan to'g'ridan-to'g'ri savol. Kategoriyasi belgilanmagan
        mahsulotlarni topish:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, kategoriya FROM mahsulotlar
WHERE kategoriya IS NULL;`}</CodeBlock>
      <p>
        Bu safar natijada aynan kutganimizdek ikkita qator chiqadi: Ryukzak va Sovg'a
        sertifikati. Aksincha, kategoriyasi belgilangan barcha mahsulotlarni topish uchun{' '}
        <code>IS NOT NULL</code>dan foydalanamiz:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, kategoriya FROM mahsulotlar
WHERE kategoriya IS NOT NULL;`}</CodeBlock>
      <p>
        Bu so'rov qolgan sakkizta mahsulotni qaytaradi — ularning barchasida kategoriya
        belgilangan.
      </p>
      <Callout type="warning" title="Eslab qoling">
        <code>NULL</code>ni tekshirish uchun hech qachon <code>= NULL</code> yoki{' '}
        <code>!= NULL</code> yozmang — ular hech qachon mos qator topmaydi. Har doim{' '}
        <code>IS NULL</code> yoki <code>IS NOT NULL</code>dan foydalaning.
      </Callout>

      <h2>O'zingiz sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada <code>kategoriya IS NULL</code> so'rovi tayyor. Uni{' '}
        <strong>Bajarish</strong>ni bosib ishga tushiring, so'ng <code>kategoriya = NULL</code>{' '}
        ga o'zgartirib natija qanday farq qilishini o'z ko'zingiz bilan ko'ring.
      </p>
      <SqlPlayground
        schema={MAHSULOTLAR_SCHEMA}
        initialQuery={`SELECT nom, kategoriya FROM mahsulotlar
WHERE kategoriya IS NULL;`}
      />

      <Quiz
        question="WHERE kategoriya = NULL; so'rovi nima qaytaradi?"
        options={[
          "kategoriya NULL bo'lgan barcha qatorlarni",
          "Hech qanday qatorni qaytarmaydi (0 qator)",
          "SQL xatosiga olib keladi",
          "Barcha jadval qatorlarini qaytaradi"
        ]}
        correctIndex={1}
        explanation="NULL bilan hech qanday solishtirish (= yoki !=) hech qachon true natija bermaydi, shuning uchun bu so'rov xatosiz, lekin 0 qator bilan qaytadi."
      />

      <Quiz
        question="Nega WHERE kategoriya != 'Elektronika' ham NULL kategoriyali qatorlarni o'z ichiga olmaydi?"
        options={[
          "Chunki != operatori SQLite'da ishlamaydi",
          "Chunki NULL har qanday solishtirishda 'noma'lum' natija beradi, WHERE esa faqat aniq true qatorlarni qoldiradi",
          "Chunki NULL avtomatik ravishda 'Elektronika'ga teng deb hisoblanadi",
          "Chunki NULL qatorlar jadvaldan butunlay o'chirilgan"
        ]}
        correctIndex={1}
        explanation="NULL bilan har qanday solishtirish (= ham, != ham) 'noma'lum' natija beradi, chunki NULLni hech narsa bilan solishtirib bo'lmaydi. WHERE esa faqat natijasi aniq true bo'lgan qatorlarni saqlab qoladi."
      />

      <Exercise title="Mashq">
        <p>
          Yuqoridagi SQL maydonchasida kategoriyasi belgilangan (ya'ni <code>NULL</code> emas)
          barcha mahsulotlarni nomi, narxi va kategoriyasi bilan chiqaradigan so'rov yozing.
        </p>
        <Solution>
          <CodeBlock lang="sql">{`SELECT nom, narx, kategoriya FROM mahsulotlar
WHERE kategoriya IS NOT NULL;`}</CodeBlock>
          <p>
            Natijada sakkizta mahsulot chiqadi — Ryukzak va Sovg'a sertifikatidan tashqari
            barchasi, chunki faqat shu ikkitasining kategoriyasi <code>NULL</code>.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>NULL</code> — qiymat yo'qligi, u <code>0</code> yoki <code>''</code> bilan bir
          xil emas.
        </li>
        <li>
          <code>WHERE ustun = NULL</code> hech qachon mos qator topmaydi — u xato bermaydi, lekin
          har doim 0 qator qaytaradi.
        </li>
        <li>
          Sabab — SQLning uch qiymatli mantig'i: <code>NULL</code> bilan solishtirish (
          <code>=</code> ham, <code>!=</code> ham) "noma'lum" natija beradi, <code>true</code>{' '}
          emas, shuning uchun <code>WHERE</code> bunday qatorlarni chetlab o'tadi.
        </li>
        <li>
          <code>NULL</code>ni tekshirish uchun to'g'ri operatorlar: <code>IS NULL</code> va{' '}
          <code>IS NOT NULL</code>.
        </li>
      </KeyPoints>
    </>
  )
}
