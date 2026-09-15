import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'useState bilan tiplar',
  section: 'TypeScript va React',
}

export default function UseStateTypesLesson() {
  return (
    <>
      <p>
        React kursida <code>useState</code>ning ishlash mexanizmini — qiymat va setter qaytarishini
        — o'rgangansiz. TypeScript bilan ishlaganda bu mexanizm o'zgarmaydi, faqat{' '}
        <code>useState</code>ning qaytargan qiymati qanday tipda ekanini TypeScript qanday bilib
        olishi muhim bo'ladi.
      </p>

      <h2>Avtomatik tip xulosasi</h2>
      <p>
        Ko'p hollarda <code>useState</code>ga hech qanday qo'shimcha tip yozish shart emas —
        TypeScript boshlang'ich qiymatdan state'ning tipini o'zi xulosa qiladi (type inference):
      </p>
      <CodeBlock lang="tsx">{`const [soni, setSoni] = useState(0)
// soni: number, setSoni: (yangiQiymat: number | ((prev: number) => number)) => void

const [matn, setMatn] = useState('')
// matn: string

const [ochiqmi, setOchiqmi] = useState(false)
// ochiqmi: boolean`}</CodeBlock>
      <p>
        Bu holatlarda TypeScript <code>useState(0)</code>ni ko'rib, "boshlang'ich qiymat son
        ekan, demak bu state doim son bo'ladi" deb xulosa chiqaradi — <code>setSoni</code>ga
        satr (string) yuborishga harakat qilsangiz, kompilyator darhol xato beradi.
      </p>

      <h2>Aniq generic kerak bo'ladigan holatlar</h2>
      <p>
        Ba'zida boshlang'ich qiymatdan kelib chiqib tipni to'liq xulosa qilib bo'lmaydi — masalan,
        state boshida <code>null</code> bilan boshlanib, keyinchalik haqiqiy ma'lumot bilan
        to'ldirilishi kerak bo'lsa. Bunday holatlarda <code>useState</code>ga{' '}
        <strong>generic</strong> parametr aniq beriladi:
      </p>
      <CodeBlock lang="tsx">{`interface FoydalanuvchiMalumoti {
  ism: string
  yosh: number
}

// null'dan xulosa qilinsa, TypeScript "har doim null" deb hisoblab qo'yadi —
// shuning uchun mumkin bo'lgan tiplarni generic orqali aniq ko'rsatamiz:
const [foydalanuvchi, setFoydalanuvchi] = useState<FoydalanuvchiMalumoti | null>(null)

// keyinroq, masalan server javobidan keyin:
setFoydalanuvchi({ ism: 'Ali', yosh: 25 })`}</CodeBlock>
      <p>
        Agar bu yerda <code>useState&lt;FoydalanuvchiMalumoti | null&gt;</code>ni yozmasangiz,
        TypeScript <code>foydalanuvchi</code>ni faqat <code>null</code> tipida deb hisoblaydi va{' '}
        <code>setFoydalanuvchi</code>ga haqiqiy obyekt berishga harakat qilganingizda xato
        chiqaradi.
      </p>
      <p>
        Xuddi shunday, bo'sh massiv bilan boshlanadigan state ham aniq generic talab qiladi —
        bo'sh massivdan TypeScript elementlarning qanday tipda bo'lishini bila olmaydi:
      </p>
      <CodeBlock lang="tsx">{`// Bo'sh massiv — TypeScript element tipini bila olmaydi
const [royxat, setRoyxat] = useState<string[]>([])

setRoyxat(['olma', 'nok']) // to'g'ri
setRoyxat([1, 2, 3])       // xato — number[] emas, string[] kutilgan`}</CodeBlock>

      <h2>Union va literal tiplar bilan state</h2>
      <p>
        Agar state faqat oldindan belgilangan bir nechta qiymatdan birini olishi kerak bo'lsa
        (masalan, so'rov holati), oddiy <code>string</code> o'rniga aniq union/literal tip
        berish ancha xavfsizroq — bu kursning oldingi qismida ko'rgan{' '}
        <strong>discriminated union</strong>larga o'xshash mantiq:
      </p>
      <CodeBlock lang="tsx">{`type Holat = 'yuklanmoqda' | 'muvaffaqiyatli' | 'xato'

const [holat, setHolat] = useState<Holat>('yuklanmoqda')

setHolat('muvaffaqiyatli') // to'g'ri
setHolat('bekor qilindi')  // xato — Holat tipida bunday qiymat yo'q`}</CodeBlock>
      <p>
        Agar bu yerda tipni aniq yozmasdan <code>useState('yuklanmoqda')</code> deb qoldirsangiz,
        TypeScript state tipini kengaytirib, oddiy <code>string</code> deb xulosa qiladi —
        natijada <code>setHolat('istalgan_matn')</code> ham hech qanday xatosiz o'tib ketadi.
        Aniq union tipini berish esa state faqat belgilangan qiymatlardan birini olishini
        kompilyatsiya darajasida kafolatlaydi.
      </p>

      <Callout type="tip" title="Qachon generic yozish kerak?">
        Oddiy qoida: agar boshlang'ich qiymatdan kelib chiqib TypeScript to'g'ri tipni xulosa
        qila olsa (<code>0</code>, <code>''</code>, <code>false</code> kabi aniq qiymatlar) —
        generic yozish shart emas. Agar boshlang'ich qiymat <code>null</code>/
        <code>undefined</code> bo'lsa, bo'sh massiv/obyekt bo'lsa, yoki state faqat cheklangan
        to'plamdagi qiymatlardan birini olishi kerak bo'lsa — <code>useState&lt;Tip&gt;(...)</code>{' '}
        orqali aniq generic bering.
      </Callout>

      <Quiz
        question="const [royxat, setRoyxat] = useState([]) deb yozilganda nima muammo bo'lishi mumkin?"
        options={[
          "Kod umuman ishlamaydi, useState bo'sh massivni qabul qilmaydi",
          "TypeScript massiv elementlarining tipini aniqlay olmaydi, shuning uchun keyinchalik noto'g'ri tipdagi element qo'shilsa ham xato chiqmasligi mumkin",
          "React bo'sh massivni state sifatida saqlay olmaydi",
          "setRoyxat funksiyasi umuman generatsiya qilinmaydi",
        ]}
        correctIndex={1}
        explanation="Bo'sh massivdan TypeScript element tipini xulosa qila olmaydi, ko'pincha uni any[] yoki juda keng tipga aylantiradi. To'g'ri element tipini kafolatlash uchun useState<Tur[]>([]) kabi aniq generic berish kerak."
      />

      <Exercise title="Mashq">
        <p>
          Vazifalar ro'yxati (todo list) komponenti uchun ikkita state e'lon qiling:{' '}
          <code>vazifalar</code> — <code>{'{ id: number; matn: string; bajarildimi: boolean }'}</code>{' '}
          shaklidagi obyektlar massivi, boshlang'ich qiymati bo'sh massiv; va{' '}
          <code>filtr</code> — faqat <code>"barchasi"</code>, <code>"faol"</code> yoki{' '}
          <code>"bajarilgan"</code> qiymatlaridan birini olishi kerak bo'lgan state, boshlang'ich
          qiymati <code>"barchasi"</code>.
        </p>
        <Solution>
          <CodeBlock lang="tsx">{`interface Vazifa {
  id: number
  matn: string
  bajarildimi: boolean
}

type Filtr = 'barchasi' | 'faol' | 'bajarilgan'

const [vazifalar, setVazifalar] = useState<Vazifa[]>([])
const [filtr, setFiltr] = useState<Filtr>('barchasi')`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>useState</code> boshlang'ich qiymatdan tipni avtomatik xulosa qiladi —{' '}
          <code>useState(0)</code> → <code>number</code>, <code>useState('')</code> →{' '}
          <code>string</code> va hokazo.
        </li>
        <li>
          Boshlang'ich qiymat <code>null</code>, bo'sh massiv yoki bo'sh obyekt bo'lganda, aniq
          generic berish kerak: <code>useState&lt;User | null&gt;(null)</code>,{' '}
          <code>useState&lt;string[]&gt;([])</code>.
        </li>
        <li>
          State faqat cheklangan to'plamdagi qiymatlarni olishi kerak bo'lsa, union/literal tip
          bilan generic berish state'ni noto'g'ri qiymatlardan himoya qiladi.
        </li>
      </KeyPoints>
    </>
  )
}
