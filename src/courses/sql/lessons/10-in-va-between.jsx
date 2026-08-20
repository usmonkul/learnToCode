import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'IN va BETWEEN',
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

export default function InVaBetweenLesson() {
  return (
    <>
      <h2>Bir ustunga bir nechta OR — noqulay uzun</h2>
      <p>
        8-darsda <code>OR</code> yordamida bir nechta shartni birlashtirishni ko'rgan edik.
        Endi faraz qilaylik, "Kiyim" yoki "Uy jihozlari" kategoriyasidagi mahsulotlarni
        topmoqchimiz:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, kategoriya FROM mahsulotlar
WHERE kategoriya = 'Kiyim' OR kategoriya = 'Uy jihozlari';`}</CodeBlock>
      <p>
        Bu so'rov to'g'ri ishlaydi va to'rtta qatorni qaytaradi: Stol lampa, Kitob tokchasi,
        Sport krossovka, Futbolka. Lekin agar uchta, to'rtta, hattoki o'nta kategoriyani
        tekshirish kerak bo'lsa-chi? Har safar yangi <code>OR kategoriya = '...'</code>{' '}
        qo'shish tez orada so'rovni o'qib bo'lmas darajada uzun qiladi — va bir joyda{' '}
        <code>OR</code> yozishni unutib qo'yish oson.
      </p>

      <h2>IN — bir xil ustun uchun qisqartma</h2>
      <p>
        Aynan shu holat uchun SQL <code>IN</code> operatorini beradi. U "ustun shu ro'yxatdagi
        qiymatlardan biriga teng bo'lsin" degan ma'noni bildiradi — va bir xil ustunga
        qaratilgan bir nechta <code>OR</code> shartining qisqa yozuvi, xolos:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, kategoriya FROM mahsulotlar
WHERE kategoriya IN ('Kiyim', 'Uy jihozlari');`}</CodeBlock>
      <p>
        Bu so'rov yuqoridagi <code>OR</code> zanjiri bilan <strong>bir xil</strong> natijani
        beradi — o'sha to'rtta qator. Farqi faqat yozilishida: <code>IN</code> qavs ichiga
        qiymatlar ro'yxatini oladi, shuning uchun nechta variant bo'lishidan qat'i nazar
        so'rov qisqa va o'qish oson bo'lib qoladi. Quyida o'zingiz solishtirib ko'ring:
      </p>
      <SqlPlayground
        schema={MAHSULOTLAR_SCHEMA}
        initialQuery={`SELECT nom, kategoriya FROM mahsulotlar
WHERE kategoriya IN ('Kiyim', 'Uy jihozlari');`}
      />
      <Callout type="tip" title="IN qanchalik qisqartiradi">
        Ikkita qiymat uchun farq unchalik katta emas, lekin besh yoki o'nta qiymatni
        tekshirish kerak bo'lsa, <code>IN ('A', 'B', 'C', 'D', 'E')</code> — beshta{' '}
        <code>OR kategoriya = '...'</code> yozishdan ancha qulayroq va xatoga kamroq moyil.
      </Callout>

      <h2>BETWEEN — sonli oraliqni filtrlash</h2>
      <p>
        Narxlar bilan ishlaganda ko'pincha "ma'lum oraliqdagi" mahsulotlarni topish kerak
        bo'ladi. Buni <code>&gt;=</code> va <code>&lt;=</code>ni <code>AND</code> bilan
        birlashtirib yozish mumkin, lekin <code>BETWEEN</code> buning uchun qulayroq qisqartma:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, narx FROM mahsulotlar
WHERE narx BETWEEN 95000 AND 275000;`}</CodeBlock>
      <p>
        Bu so'rov beshta qatorni qaytaradi: Futbolka (95000), Stol lampa (120000), Sovg'a
        sertifikati (200000), Klaviatura (210000) va Ryukzak (275000). E'tibor bering —{' '}
        <code>narx</code>i aynan <strong>95000</strong> bo'lgan Futbolka ham,{' '}
        <strong>275000</strong> bo'lgan Ryukzak ham natijaga kiritilgan.
      </p>
      <Callout type="note" title="BETWEEN ikkala chegarani ham o'z ichiga oladi">
        <code>BETWEEN a AND b</code> — <code>narx &gt;= a AND narx &lt;= b</code>ning
        qisqartmasi. Ya'ni chegara qiymatlarning o'zi ham (a va b) natijaga{' '}
        <strong>kiradi</strong> — bu diapazon "inklyuziv" (inclusive) deb ataladi.
      </Callout>

      <h2>O'zingiz sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada <code>BETWEEN</code> so'rovi tayyor. Uni ishga tushiring, so'ng
        chegara qiymatlarni o'zgartirib qaysi mahsulotlar natijaga kirishini kuzating.
      </p>
      <SqlPlayground
        schema={MAHSULOTLAR_SCHEMA}
        initialQuery={`SELECT nom, narx FROM mahsulotlar
WHERE narx BETWEEN 95000 AND 275000;`}
      />

      <Quiz
        question="WHERE kategoriya IN ('Kiyim', 'Uy jihozlari') so'rovi nimaga teng?"
        options={[
          "WHERE kategoriya = 'Kiyim' AND kategoriya = 'Uy jihozlari'",
          "WHERE kategoriya = 'Kiyim' OR kategoriya = 'Uy jihozlari'",
          "WHERE kategoriya != 'Kiyim' AND kategoriya != 'Uy jihozlari'",
          "WHERE kategoriya IS NULL"
        ]}
        correctIndex={1}
        explanation="IN — bir xil ustunga qaratilgan bir nechta OR shartining qisqa yozuvi. Ikkalasi ham bir xil qatorlarni qaytaradi."
      />

      <Quiz
        question="narx BETWEEN 95000 AND 275000 shartida narxi aynan 95000 bo'lgan mahsulot natijaga kiradimi?"
        options={[
          "Ha, chunki BETWEEN ikkala chegarani ham o'z ichiga oladi",
          "Yo'q, chunki BETWEEN chegara qiymatlarni hisobga olmaydi",
          "Faqat narx pastki chegaradan katta bo'lsagina kiradi",
          "Bu SQL xatosiga olib keladi"
        ]}
        correctIndex={0}
        explanation="BETWEEN a AND b — narx >= a AND narx <= b ning qisqartmasi, shuning uchun ikkala chegara qiymati ham natijaga kiradi (inklyuziv diapazon)."
      />

      <Exercise title="Mashq">
        <p>
          Yuqoridagi SQL maydonchasida <code>BETWEEN</code> yordamida narxi{' '}
          <strong>200000</strong> dan <strong>500000</strong>gacha (ikkala chegara ham
          kiritilgan holda) bo'lgan mahsulotlarning nomi va narxini chiqaradigan so'rov yozing.
        </p>
        <Solution>
          <CodeBlock lang="sql">{`SELECT nom, narx FROM mahsulotlar
WHERE narx BETWEEN 200000 AND 500000;`}</CodeBlock>
          <p>
            Natijada to'rtta qator chiqadi: Sovg'a sertifikati (200000), Klaviatura (210000),
            Ryukzak (275000) va Sport krossovka (380000) — barchasi belgilangan oraliqda,
            chegara qiymatlar ham hisobga olingan.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>IN (qiymat1, qiymat2, ...)</code> — bir xil ustunga qaratilgan bir nechta{' '}
          <code>OR</code> shartining qisqa yozuvi; qancha ko'p variant bo'lsa, shuncha foydali.
        </li>
        <li>
          <code>BETWEEN a AND b</code> — <code>ustun &gt;= a AND ustun &lt;= b</code>ning
          qisqartmasi, sonli (yoki sanaviy) oraliqni filtrlash uchun ishlatiladi.
        </li>
        <li>
          <code>BETWEEN</code> <strong>inklyuziv</strong> — ikkala chegara qiymati ham
          natijaga kiradi, faqat ular orasidagi qiymatlar emas.
        </li>
      </KeyPoints>
    </>
  )
}
