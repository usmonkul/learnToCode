import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import SqlPlayground from '@/components/content/SqlPlayground'

export const meta = {
  title: 'LIMIT',
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

export default function LimitLesson() {
  return (
    <>
      <h2>Natija qatorlar sonini cheklash</h2>
      <p>
        Bizning <code>mahsulotlar</code> jadvalimizda bor-yo'g'i o'nta qator bor, shuning uchun
        hozirgacha "natijada juda ko'p qator chiqib ketdi" degan muammoga duch kelmadik. Lekin
        haqiqiy loyihalarda jadvallarda minglab, hatto millionlab qator bo'lishi mumkin. Bunday
        holatlarda ko'pincha bizga barcha natija emas, faqat "birinchi bir nechtasi" kerak
        bo'ladi — masalan, "eng qimmat uchta mahsulot". Aynan shuning uchun{' '}
        <code>LIMIT</code> kalit so'zi bor.
      </p>

      <h2>LIMIT qanday ishlaydi</h2>
      <p>
        <code>LIMIT</code> so'rov oxiriga qo'shiladi va undan keyingi son natijada nechta qator
        qaytishini belgilaydi:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, narx FROM mahsulotlar
LIMIT 3;`}</CodeBlock>
      <p>
        Bu so'rov jadvaldagi <strong>birinchi</strong> uchta qatornigina qaytaradi — qolgan
        yettitasi natijaga umuman kirmaydi. Diqqat qiling: bu yerda "birinchi uchta" degani
        "eng yaxshi uchta" degani emas — bu shunchaki jadvaldagi joriy tartibda birinchi
        uchtasi, hech qanday ma'noli saralash bo'lmasa.
      </p>

      <h2>LIMIT + ORDER BY — "eng yaxshi N ta" patterni</h2>
      <p>
        <code>LIMIT</code>ning haqiqiy kuchi u o'tgan darsda o'rgangan <code>ORDER BY</code>{' '}
        bilan birga ishlatilganda ko'rinadi. Avval natijani kerakli tartibda saralaymiz, so'ng{' '}
        <code>LIMIT</code> bilan faqat "yuqori qismini" olamiz. Masalan, eng qimmat uchta
        mahsulotni topish uchun:
      </p>
      <CodeBlock lang="sql">{`SELECT nom, narx FROM mahsulotlar
ORDER BY narx DESC
LIMIT 3;`}</CodeBlock>
      <p>
        Bu yerda ish tartibi muhim: avval <code>ORDER BY narx DESC</code> barcha o'nta
        mahsulotni eng qimmatidan eng arzonigacha saralaydi, so'ng <code>LIMIT 3</code> shu
        saralangan ro'yxatning faqat birinchi uchtasini qaytaradi — ya'ni haqiqatan ham eng
        qimmat uchta mahsulotni: Noutbuk, Monitor va Kitob tokchasi.
      </p>
      <Callout type="warning" title="ORDER BY'siz LIMIT ma'nosiz bo'lishi mumkin">
        Agar <code>ORDER BY</code>siz <code>LIMIT</code> ishlatsangiz, qaysi qatorlar
        qaytishini oldindan aytib bo'lmaydi — ma'lumotlar bazasi ularni istalgan ichki
        tartibda saqlashi mumkin. "Eng yaxshi/eng qimmat/eng yangi N ta" kabi ma'noli natija
        kerak bo'lsa, <code>LIMIT</code>ni har doim mos <code>ORDER BY</code> bilan birga
        ishlating.
      </Callout>

      <h2>O'zingiz sinab ko'ring</h2>
      <p>
        Quyidagi maydonchada eng qimmat uchta mahsulotni topadigan so'rov tayyor.{' '}
        <strong>Bajarish</strong>ni bosing, so'ng <code>LIMIT</code> qiymatini{' '}
        <code>5</code>ga o'zgartirib, natija qanday kengayishini kuzating.
      </p>
      <SqlPlayground
        schema={MAHSULOTLAR_SCHEMA}
        initialQuery={`SELECT nom, narx FROM mahsulotlar
ORDER BY narx DESC
LIMIT 3;`}
      />

      <Quiz
        question="Eng arzon ikkita mahsulotni topish uchun qaysi so'rov to'g'ri?"
        options={[
          "SELECT nom, narx FROM mahsulotlar LIMIT 2;",
          "SELECT nom, narx FROM mahsulotlar ORDER BY narx DESC LIMIT 2;",
          "SELECT nom, narx FROM mahsulotlar ORDER BY narx LIMIT 2;",
          "SELECT nom, narx FROM mahsulotlar ORDER BY narx;"
        ]}
        correctIndex={2}
        explanation="Avval narx bo'yicha o'sish tartibida (standart ASC) saralash kerak, so'ng LIMIT 2 bilan eng arzon ikkitasini olish kerak. LIMIT'siz yoki ORDER BY'siz variantlar to'g'ri natija bermaydi."
      />

      <Quiz
        question="ORDER BY'siz, faqat LIMIT 3 ishlatilgan so'rov haqida nima to'g'ri?"
        options={[
          "U har doim eng qimmat uchta mahsulotni qaytaradi",
          "U har doim eng arzon uchta mahsulotni qaytaradi",
          "U qaysi uchta qator qaytishini kafolatlamaydi — tartib aniq emas",
          "U SQL xatosiga olib keladi"
        ]}
        correctIndex={2}
        explanation="ORDER BY bo'lmasa, ma'lumotlar bazasi qatorlarni istalgan ichki tartibda qaytarishi mumkin, shuning uchun 'birinchi 3ta' degani ma'noli tanlov emas."
      />

      <Exercise title="Mashq">
        <p>
          Yuqoridagi SQL maydonchasida narx bo'yicha eng arzon <strong>ikkita</strong>{' '}
          mahsulotni (nomi va narxi bilan) topadigan so'rov yozing.
        </p>
        <Solution>
          <CodeBlock lang="sql">{`SELECT nom, narx FROM mahsulotlar
ORDER BY narx
LIMIT 2;`}</CodeBlock>
          <p>
            Natijada Sichqoncha (85000) va Futbolka (95000) chiqadi — ular jadvaldagi eng arzon
            ikkita mahsulot.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>LIMIT n</code> natijadagi qatorlar sonini <code>n</code>ta bilan cheklaydi.
        </li>
        <li>
          <code>ORDER BY</code>siz <code>LIMIT</code> qaysi qatorlar qaytishini kafolatlamaydi.
        </li>
        <li>
          <code>ORDER BY ustun DESC LIMIT n</code> — "eng yuqori N ta" (masalan, eng qimmat
          mahsulotlar) topishning standart usuli.
        </li>
      </KeyPoints>
    </>
  )
}
