import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Obyekt tiplari va interface',
  section: 'TypeScript asoslari',
}

export default function ObjectsAndInterfacesLesson() {
  return (
    <>
      <p>
        Real loyihalarda ma'lumotlarning aksariyati obyekt shaklida keladi — foydalanuvchi,
        mahsulot, buyurtma va h.k. Bu darsda obyektlarning "shaklini" (qanday xususiyatlarga
        ega ekanini) qanday belgilashni va bu shaklni qayta ishlatish uchun{' '}
        <code>interface</code>dan qanday foydalanishni ko'ramiz.
      </p>

      <h2>Inline obyekt tipi</h2>
      <p>
        Obyektning tipini to'g'ridan-to'g'ri, o'zgaruvchi e'lon qilinayotgan joyda ham yozish
        mumkin:
      </p>
      <CodeBlock lang="typescript">{`let foydalanuvchi: { ism: string; yosh: number } = {
  ism: "Aziz",
  yosh: 25,
}`}</CodeBlock>
      <p>
        Bu ishlaydi, lekin bir muammosi bor: agar shu shakldagi obyektni bir nechta joyda
        ishlatish kerak bo'lsa (masalan, bir nechta funksiya parametrida), bu tipni har safar
        qaytadan yozishga to'g'ri keladi.
      </p>

      <h2>
        <code>interface</code> — qayta ishlatiladigan shakl
      </h2>
      <p>
        <code>interface</code> obyektning shaklini bir marta belgilab, unga nom berish
        imkonini beradi:
      </p>
      <CodeBlock lang="typescript">{`interface Foydalanuvchi {
  ism: string
  yosh: number
}

const foydalanuvchi1: Foydalanuvchi = { ism: "Aziz", yosh: 25 }
const foydalanuvchi2: Foydalanuvchi = { ism: "Laylo", yosh: 30 }

function malumotChop(f: Foydalanuvchi): void {
  console.log(\`\${f.ism}, \${f.yosh} yoshda\`)
}`}</CodeBlock>
      <p>
        Endi <code>Foydalanuvchi</code> shaklini istagancha joyda — funksiya parametrida,
        boshqa o'zgaruvchida, boshqa interfeys ichida — qayta ishlatish mumkin, va agar shaklni
        o'zgartirish kerak bo'lsa, buni faqat bitta joyda qilish yetarli.
      </p>

      <h2>Ixtiyoriy xususiyatlar</h2>
      <p>
        Xuddi funksiya parametrlaridagi kabi, obyekt xususiyatiga ham <code>?</code> qo'yib,
        uni ixtiyoriy qilish mumkin:
      </p>
      <CodeBlock lang="typescript">{`interface Foydalanuvchi {
  ism: string
  yosh: number
  email?: string
}

const f1: Foydalanuvchi = { ism: "Aziz", yosh: 25 } // email berilmasa ham bo'ladi
const f2: Foydalanuvchi = { ism: "Vali", yosh: 28, email: "vali@example.com" }`}</CodeBlock>

      <h2>
        <code>readonly</code> xususiyatlar
      </h2>
      <p>
        <code>readonly</code> kalit so'zi xususiyatni yaratilgandan keyin o'zgartirib
        bo'lmaydigan qiladi — bu ayniqsa, o'zgarmasligi kerak bo'lgan identifikatorlar uchun
        foydali:
      </p>
      <CodeBlock lang="typescript">{`interface Foydalanuvchi {
  readonly id: number
  ism: string
}

const f: Foydalanuvchi = { id: 1, ism: "Aziz" }
f.ism = "Vali" // OK
f.id = 2       // Xato: id — readonly, uni o'zgartirib bo'lmaydi`}</CodeBlock>
      <Callout type="tip" title="readonly qachon foydali">
        <code>readonly</code>ni obyekt yaratilgandan keyin o'zgarishi mantiqan noto'g'ri
        bo'lgan xususiyatlarga (masalan, baza ID'si, yaratilgan sana) qo'shing. Bu shunday
        xususiyatni tasodifan o'zgartirib qo'yishning oldini oladi va kompilyatsiya bosqichida
        xato beradi.
      </Callout>

      <h2>Ichma-ich (nested) obyektlar</h2>
      <p>
        Obyekt xususiyatining o'zi ham obyekt bo'lishi mumkin — bunday holatda uni alohida
        interfeys sifatida ajratib, keyin asosiy interfeys ichida ishlatish tavsiya etiladi:
      </p>
      <CodeBlock lang="typescript">{`interface Manzil {
  shahar: string
  kocha: string
}

interface Foydalanuvchi {
  ism: string
  manzil: Manzil
}

const f: Foydalanuvchi = {
  ism: "Aziz",
  manzil: {
    shahar: "Toshkent",
    kocha: "Amir Temur",
  },
}

console.log(f.manzil.shahar) // "Toshkent"`}</CodeBlock>
      <p>
        Bu yondashuv kodni o'qishga osonlashtiradi va <code>Manzil</code> shaklini boshqa
        interfeyslarda (masalan, <code>Kompaniya</code> ichida) ham qayta ishlatish imkonini
        beradi.
      </p>

      <Quiz
        question="Interfeysdagi qaysi xususiyat, obyekt yaratilgandan keyin uning qiymatini o'zgartirishga urinilsa, kompilyatsiya xatosiga olib keladi?"
        options={['optional (?)', 'readonly', 'static', 'const']}
        correctIndex={1}
        explanation="readonly xususiyat faqat obyekt yaratilayotganda belgilanadi, undan keyin uni o'zgartirishga urinish TypeScript kompilyatsiya xatosiga olib keladi."
      />

      <Exercise title="Mashq">
        <p>
          <code>Kitob</code> nomli interfeys yarating: <code>readonly id: number</code>,{' '}
          <code>sarlavha: string</code>, <code>muallif: string</code> va ixtiyoriy{' '}
          <code>reyting?: number</code> xususiyatlariga ega bo'lsin. Shu interfeys tipidagi
          bitta obyekt yarating (reytingsiz) va uning sarlavhasini konsolga chop eting.
        </p>
        <Solution>
          <CodeBlock lang="typescript">{`interface Kitob {
  readonly id: number
  sarlavha: string
  muallif: string
  reyting?: number
}

const kitob: Kitob = {
  id: 1,
  sarlavha: "O'tkan kunlar",
  muallif: "Abdulla Qodiriy",
}

console.log(kitob.sarlavha) // O'tkan kunlar`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Obyekt tipini inline (<code>{'{ ism: string }'}</code>) yozish mumkin, lekin qayta
          ishlatish kerak bo'lsa, <code>interface</code> ma'qulroq.
        </li>
        <li>
          <code>interface</code> obyektning shaklini bir marta belgilab, unga nom beradi va
          ko'p joyda qayta ishlatish imkonini beradi.
        </li>
        <li>
          Ixtiyoriy xususiyat <code>?</code> bilan, o'zgarmas xususiyat esa{' '}
          <code>readonly</code> bilan belgilanadi.
        </li>
        <li>
          Ichma-ich obyektlarni alohida interfeys sifatida ajratish kodni o'qish va qayta
          ishlatishni osonlashtiradi.
        </li>
      </KeyPoints>
    </>
  )
}
