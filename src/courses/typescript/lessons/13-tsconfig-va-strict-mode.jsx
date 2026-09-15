import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'tsconfig.json va strict rejim',
  section: 'TypeScript asoslari',
}

export default function TsconfigStrictModeLesson() {
  return (
    <>
      <p>
        Shu paytgacha biz TypeScript'ning tip sintaksisiga — o'zgaruvchilar, funksiyalar,
        interfeyslar, generiklar — e'tibor qaratdik. Lekin bu sintaksis qanday qat'iylik bilan
        tekshirilishi loyihadan loyihaga farq qilishi mumkin, va bu farqni boshqaradigan fayl —{' '}
        <code>tsconfig.json</code>.
      </p>
      <p>
        Bu darsda <code>tsconfig.json</code> nima uchun kerakligini, eng muhim sozlamalarni va
        zamonaviy loyihalarda bu fayl bilan qanchalik ishlash kerakligini ko'rib chiqamiz.
      </p>

      <h2>tsconfig.json nima uchun kerak?</h2>
      <p>
        <code>tsconfig.json</code> — loyiha ildizidagi (root) konfiguratsiya fayli bo'lib, u
        TypeScript kompilyatoriga (compiler) ikkita asosiy narsani aytadi: qaysi fayllarni
        tekshirish kerak va ularni <strong>qanchalik qat'iy</strong> tekshirish kerak. Bu —
        loyiha darajasidagi (project-level) sozlama: bir marta yozilib, loyihadagi barcha{' '}
        <code>.ts</code>/<code>.tsx</code> fayllarga birdek ta'sir qiladi.
      </p>
      <CodeBlock lang="typescript">{`// tsconfig.json (soddalashtirilgan misol)
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true
  }
}`}</CodeBlock>
      <p>
        Fayl JSON formatida yozilgani uchun texnik jihatdan uning kengaytmasi <code>.json</code>,
        lekin ichidagi <code>compilerOptions</code> obyekti aynan TypeScript kompilyatorining
        xatti-harakatini belgilaydi.
      </p>

      <h2>Eng muhim sozlamalar</h2>
      <p>
        <code>tsconfig.json</code>da o'nlab sozlama bor, lekin amalda ulardan bir nechtasi
        boshqalariga qaraganda ancha ko'proq ahamiyatga ega:
      </p>
      <ul>
        <li>
          <code>target</code> — kompilyator TypeScript kodini qaysi JavaScript versiyasiga
          "tushirishi" (compile qilishi) kerakligini bildiradi (masalan, <code>ES2022</code>).
          Bu — sizning kodingiz qaysi brauzer/muhitlarda ishlashini belgilaydi.
        </li>
        <li>
          <code>module</code> — chiqarilgan kod qaysi modul tizimidan (masalan,{' '}
          <code>ESNext</code> — zamonaviy <code>import</code>/<code>export</code> sintaksisi)
          foydalanishini belgilaydi.
        </li>
        <li>
          <code>strict</code> — bir nechta qat'iy tekshiruvni bir vaqtda yoqadigan "asosiy
          kalit" (master switch).
        </li>
      </ul>
      <p>
        <code>strict</code> ichiga bir nechta alohida sozlama kiradi, ulardan eng ko'p uchraydigani
        — <code>noImplicitAny</code>. Bu sozlama yoqilganda, agar TypeScript biror o'zgaruvchi
        yoki parametrning tipini avtomatik aniqlay olmasa (siz uni ham yozmagan bo'lsangiz), u
        xatolik chiqaradi — aksincha, uni jim tarzda <code>any</code> deb hisoblab qo'ymaydi:
      </p>
      <CodeBlock lang="typescript">{`// noImplicitAny yoqilgan bo'lsa — xatolik:
function qoshish(a, b) {
  // Xato: Parameter 'a' implicitly has an 'any' type.
  return a + b
}

// To'g'ri: tip aniq yozilgan
function qoshish(a: number, b: number) {
  return a + b
}`}</CodeBlock>

      <Callout type="tip" title="strict: true — amaliy standart">
        Yangi loyihada <code>strict: true</code>ni doim yoqilgan holda qoldiring — bu TypeScript
        jamoasi va aksariyat zamonaviy loyihalar tomonidan amaliy standart (de facto standard)
        deb qabul qilingan. <code>strict</code>ni o'chirish TypeScript'ning eng katta afzalligi
        — ishonchli tip xavfsizligi (type safety) — ni yo'qqa chiqaradi. Bu sozlamani faqat eski
        (legacy) loyihani asta-sekin TypeScript'ga o'tkazayotganda, vaqtinchalik yumshatish
        mumkin.
      </Callout>

      <h2>Amalda: buni odatda vositalar o'zi yaratadi</h2>
      <p>
        Zamonaviy loyihalarda <code>tsconfig.json</code>ni odatda qo'lda, noldan yozish shart
        emas — Vite, Next.js kabi vositalar loyiha yaratilganda uni avtomatik generatsiya qilib
        beradi, allaqachon <code>strict: true</code> va boshqa maqbul sozlamalar bilan. Shu
        sababli, kundalik ishda bu faylni deyarli tegmasdan ham ishlatish mumkin.
      </p>
      <p>
        Shunga qaramay, uning nima uchun va qanday ishlashini tushunish muhim — chunki xato
        xabarlari (masalan, yuqoridagi <code>noImplicitAny</code> xatosi) aynan shu sozlamalardan
        kelib chiqadi, va ba'zida loyihaga qo'shimcha sozlama (masalan, boshqa kutubxona uchun
        kerak bo'ladigan bayroq) qo'lda qo'shilishi kerak bo'ladi.
      </p>

      <Quiz
        question="tsconfig.json'da strict: true sozlamasi nimani anglatadi?"
        options={[
          "Faqat kod formatini (formatting) tekshiradi, tiplarga ta'sir qilmaydi",
          "Bir nechta qat'iy tip tekshiruvini (jumladan noImplicitAny kabilarni) bir vaqtda yoqadigan asosiy kalit",
          "TypeScript kodini JavaScript'ga umuman kompilyatsiya qilmaslikni bildiradi",
          "Faqat .tsx fayllarga, .ts fayllarga ta'sir qilmaydi",
        ]}
        correctIndex={1}
        explanation="strict — bir nechta alohida qat'iy tekshiruvni (masalan, noImplicitAny) bir vaqtda yoqadigan asosiy kalit bo'lib, u zamonaviy TypeScript loyihalarida amaliy standart hisoblanadi."
      />

      <KeyPoints>
        <li>
          <code>tsconfig.json</code> — loyiha darajasidagi kompilyator sozlamalari fayli, u
          barcha <code>.ts</code>/<code>.tsx</code> fayllarga birdek ta'sir qiladi.
        </li>
        <li>
          <code>target</code> — chiqadigan JavaScript versiyasi, <code>module</code> — modul
          tizimi, <code>strict</code> — qat'iy tekshiruvlarni yoqadigan asosiy kalit.
        </li>
        <li>
          <code>noImplicitAny</code> (strict ichida) TypeScript tipni aniqlay olmagan joyda
          uni jim tarzda <code>any</code>ga aylantirish o'rniga xatolik chiqarishga majbur qiladi.
        </li>
        <li>
          Yangi loyihalarda <code>strict: true</code>ni yoqilgan holda qoldirish amaliy standart.
        </li>
        <li>
          Zamonaviy vositalar (Vite, Next.js) <code>tsconfig.json</code>ni avtomatik yaratib
          beradi, shuning uchun qo'lda batafsil sozlashga kam ehtiyoj bor — lekin uning nima
          uchun ishlashini tushunish muhim.
        </li>
      </KeyPoints>
    </>
  )
}
