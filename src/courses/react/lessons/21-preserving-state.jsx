import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import Figure from '@/components/content/Figure'
import statePosition from '@/assets/state-position.svg'

export const meta = {
  title: "State'ni saqlash va qayta boshlash",
  section: 'State boshqaruvi',
}

export default function PreservingStateLesson() {
  return (
    <>
      <h2>Muammo: xabar noto'g'ri odamga ketdi</h2>
      <p>
        Oddiy messenjer: chapda kontaktlar ro'yxati, o'ngda tanlangan kontakt bilan chat va
        xabar yozish maydoni. Maydonning matni <code>Chat</code> komponentining o'z state'ida:
      </p>
      <CodeBlock lang="jsx">{`function Chat({ kontakt }) {
  const [matn, setMatn] = useState('')
  return (
    <section>
      <h3>{kontakt.ism}</h3>
      <textarea value={matn} onChange={(e) => setMatn(e.target.value)} />
      <button>{kontakt.ism}ga yuborish</button>
    </section>
  )
}

export default function Messenjer() {
  const [tanlanganId, setTanlanganId] = useState('ali')
  const kontakt = KONTAKTLAR.find((k) => k.id === tanlanganId)

  return (
    <div className="messenjer">
      <KontaktlarRoyxati tanlanganId={tanlanganId} onTanlash={setTanlanganId} />
      <Chat kontakt={kontakt} />
    </div>
  )
}`}</CodeBlock>
      <p>
        Ali'ga "Ertaga uchrashamizmi?" deb yozdingiz, yubormasdan Vali'ga o'tdingiz — va
        maydonda o'sha matn turibdi, tugmada esa "Valiga yuborish". Bir bosish — va xabar
        noto'g'ri odamga ketdi. Nega state saqlanib qoldi? Biz boshqa kontaktni tanladik-ku!
      </p>
      <p>
        Javob React state'ni <strong>qayerda</strong> saqlashida. Bu darsda shu qoidani
        o'rganamiz — va 4 va 8-darslardagi ikki "sirli" ogohlantirish (komponentni komponent
        ichida e'lon qilmang; indeksni key qilmang) nihoyat to'liq ma'noga ega bo'ladi.
      </p>

      <h2>State daraxtdagi o'ringa bog'langan</h2>
      <p>
        <code>useState</code> chaqiruvi state'ni komponent funksiyasining ichida saqlayotgandek
        ko'rinadi, lekin aslida uni <strong>React</strong> saqlaydi — va har bir state'ni render
        daraxtidagi (9-dars) muayyan <strong>o'ringa</strong> bog'laydi: "App ichidagi
        div'dagi ikkinchi bola". Har renderda React yangi JSX'ni oldingisi bilan o'rinma-o'rin
        solishtiradi:
      </p>
      <ul>
        <li>
          <strong>O'sha o'rinda o'sha turdagi komponent</strong> bo'lsa — bu o'sha komponent,
          state saqlanadi. Props o'zgargani ahamiyatga ega emas.
        </li>
        <li>
          <strong>O'rinda boshqa turdagi komponent</strong> (yoki boshqa HTML teg) paydo bo'lsa —
          eskisi butun pastki daraxti va barcha state'i bilan o'chiriladi, yangisi noldan
          yaratiladi.
        </li>
        <li>
          <strong>Komponent umuman chizilmay qolsa</strong> — uning state'i yo'q qilinadi. Qayta
          paydo bo'lganda — boshlang'ich qiymatdan.
        </li>
      </ul>
      <Figure
        src={statePosition}
        alt="Uch qator. 1: Chat kimga Ali o'rniga Chat kimga Vali — state saqlanadi. 2: Chat key ali o'rniga Chat key vali — state qayta yaratiladi. 3: Chat o'rniga Profil — Chat'ning state'i yo'qoladi."
        caption="1-rasm: React state'ni JSX'ga emas, daraxtdagi o'ringa (tur + key) bog'laydi"
      />
      <p>
        Messenjerimizda <code>{'<Chat />'}</code> doim o'sha o'rinda — <code>div</code>ning
        ikkinchi bolasi — va doim o'sha turdagi komponent. React uchun bu{' '}
        <strong>o'sha Chat</strong>, faqat boshqa <code>kontakt</code> prop'i bilan. Shuning uchun{' '}
        <code>matn</code> saqlandi.
      </p>
      <Callout type="note" title="Ternary ham aldamaydi">
        <code>{'{birinchi ? <Hisoblagich /> : <Hisoblagich />}'}</code> — ikki xil JSX yozilgandek,
        lekin har ikki holatda ham o'sha o'rinda o'sha tur. React farqni ko'rmaydi va state'ni
        saqlaydi. React kodni emas, natijaviy daraxtni solishtiradi.
      </Callout>

      <h2>key bilan state'ni qayta boshlash</h2>
      <p>
        8-darsda <code>key</code>ni ro'yxatlar uchun ko'rdik. Aslida u istalgan komponentga
        berilishi mumkin va React'ga "bu elementning shaxsi" degan ma'noni beradi. O'rin bir xil
        bo'lsa ham, <strong>key boshqa bo'lsa — bu boshqa komponent</strong>:
      </p>
      <CodeBlock lang="jsx">{`<Chat key={kontakt.id} kontakt={kontakt} />`}</CodeBlock>
      <p>
        Endi Ali'dan Vali'ga o'tganda key <code>"ali"</code>dan <code>"vali"</code>ga o'zgaradi,
        React eski <code>Chat</code>ni (va uning <code>matn</code>ini) o'chirib, yangisini noldan
        yaratadi. Bitta so'z — va xato tuzatildi. Bu naqsh juda keng tarqalgan:{' '}
        <strong>"boshqa ma'lumot uchun komponentni yangidan boshla"</strong> kerak bo'lgan har
        qanday joyda — profil tahrirlash formasi, mahsulot sahifasi, savol-javob testidagi
        savol.
      </p>
      <p>
        Xuddi shu usul bilan formani "Tozalash" tugmasi bilan qayta boshlash ham mumkin —
        har bir maydonni qo'lda <code>''</code> qilish o'rniga key'ni o'zgartirish:
      </p>
      <CodeBlock lang="jsx">{`export default function Anketa() {
  const [versiya, setVersiya] = useState(0)
  return (
    <>
      <AnketaFormasi key={versiya} />
      <button onClick={() => setVersiya(versiya + 1)}>Boshidan boshlash</button>
    </>
  )
}`}</CodeBlock>

      <h2>Boshqa yo'l bilan state saqlash</h2>
      <p>
        Ba'zan teskarisi kerak: komponent yashiringanda ham uning state'i yo'qolmasin. Masalan,
        messenjerda har bir kontakt uchun yozilgan, lekin yuborilmagan qoralamani eslab qolish.
        Ikki yechim:
      </p>
      <ul>
        <li>
          <strong>State'ni yuqoriga ko'tarish</strong> (20-dars). Ota komponent har bir kontakt
          uchun qoralamani saqlaydi: <code>{"{ ali: 'Ertaga...', vali: '' }"}</code>, va{' '}
          <code>Chat</code>ga props orqali beradi. <code>Chat</code> o'chirilsa ham, ma'lumot
          otada qoladi. Odatda eng to'g'ri yo'l.
        </li>
        <li>
          <strong>Komponentni o'chirmasdan yashirish</strong> — CSS bilan (
          <code>{"style={{ display: ochiq ? 'block' : 'none' }}"}</code>). Komponent daraxtda
          qoladi, state ham. Kichik va kam sonli komponentlar uchun mos; yuzlab yashirin
          komponent esa sahifani sekinlashtiradi.
        </li>
      </ul>

      <h2>Endi 4-darsdagi qoida tushunarli</h2>
      <p>
        4-darsda "komponentni komponent ichida e'lon qilmang" degan edik. Mana nima uchun:
      </p>
      <CodeBlock lang="jsx">{`export default function Forma() {
  const [soni, setSoni] = useState(0)

  function Maydon() {                 // har renderda YANGI funksiya
    const [matn, setMatn] = useState('')
    return <input value={matn} onChange={(e) => setMatn(e.target.value)} />
  }

  return (
    <>
      <Maydon />
      <button onClick={() => setSoni(soni + 1)}>Bosildi: {soni}</button>
    </>
  )
}`}</CodeBlock>
      <p>
        Tugma bosilganda <code>Forma</code> qayta render bo'ladi va <code>Maydon</code> —{' '}
        <strong>yangi</strong> funksiya sifatida qayta yaratiladi. React uchun komponentning
        "turi" — aynan shu funksiya. Funksiya boshqa — demak tur boshqa — demak eski{' '}
        <code>Maydon</code> o'chiriladi va inputga yozilgan matn yo'qoladi. Yechim: har doim
        komponentlarni faylning yuqori darajasida e'lon qiling.
      </p>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Props o'zgarsa state ham o'zgaradi deb kutish.</strong> O'sha o'rindagi
            komponent props'i o'zgarganda state saqlanadi. Ma'lumot almashganda yangidan
            boshlash kerak bo'lsa — <code>key</code>.
          </li>
          <li>
            <strong>Komponent ichida komponent e'lon qilish</strong> — har renderda state
            yo'qoladi, input fokusni yo'qotadi.
          </li>
          <li>
            <strong>Shartli o'rovchi.</strong>{' '}
            <code>{'{katta ? <div><Forma /></div> : <section><Forma /></section>}'}</code> — ota
            teg turi o'zgaradi, demak <code>Forma</code>ning o'rni ham o'zgaradi va uning state'i
            yo'qoladi.
          </li>
          <li>
            <strong>State'ni tozalash uchun ko'p setter.</strong> Formani qayta boshlash uchun
            har bir maydonni qo'lda tozalash o'rniga ko'pincha <code>key</code> almashtirish
            soddaroq va xatosiz.
          </li>
          <li>
            <strong>Key'ni har renderda o'zgartirish.</strong>{' '}
            <code>{'key={Math.random()}'}</code> — komponent har renderda noldan yaratiladi,
            state hech qachon saqlanmaydi.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="Sahifada {tungi ? <Sozlamalar mavzu='tungi' /> : <Sozlamalar mavzu='kunduzgi' />} bor. Sozlamalar ichida foydalanuvchi bir nechta checkbox belgiladi, so'ng tungi o'zgardi. Checkbox'lar nima bo'ladi?"
        options={[
          "Saqlanadi — o'sha o'rinda o'sha turdagi komponent",
          "Tozalanadi — JSX'da ikki xil element yozilgan",
          "Tozalanadi — props o'zgardi",
          "React xato beradi",
        ]}
        correctIndex={0}
        explanation="React JSX kodini emas, natijaviy daraxtni solishtiradi. Ikkala holatda ham o'sha o'rinda Sozlamalar komponenti — bu o'sha komponent, faqat boshqa props bilan. State saqlanadi. Tozalash kerak bo'lsa, ularga turli key berish kerak."
      />

      <Quiz
        question="Mahsulot sahifasida <SharhFormasi mahsulot={m} /> bor. Foydalanuvchi bir mahsulot uchun sharh yozib, boshqa mahsulotga o'tsa, yozgan matni yangi mahsulot formasida qolmasligi kerak. Eng sodda yechim qaysi?"
        options={[
          "<SharhFormasi key={m.id} mahsulot={m} />",
          "SharhFormasi ichida mahsulot o'zgarganini tekshirib, matnni qo'lda tozalash",
          "SharhFormasi'ni App ichida, App funksiyasining ichida e'lon qilish",
          "key={Math.random()} berish",
        ]}
        correctIndex={0}
        explanation="key mahsulot id'siga bog'langanda, boshqa mahsulotga o'tish boshqa key degani — React eski formani o'chirib, yangisini noldan yaratadi. Math.random() esa har renderda formani tozalab yuboradi — hatto har bir harf yozilganda ham."
      />

      <Exercise title="1-mashq: messenjerni tuzating">
        <p>
          Darsdagi messenjerni loyihangizda quring (<code>KONTAKTLAR</code> — uchta{' '}
          <code>{'{ id, ism }'}</code> obyekti; <code>KontaktlarRoyxati</code> — har bir kontakt
          uchun tugma, tanlangani qalin). Muammoni takrorlang, so'ng key bilan tuzating.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useState } from 'react'

const KONTAKTLAR = [
  { id: 'ali', ism: 'Ali' },
  { id: 'vali', ism: 'Vali' },
  { id: 'malika', ism: 'Malika' },
]

function KontaktlarRoyxati({ tanlanganId, onTanlash }) {
  return (
    <ul>
      {KONTAKTLAR.map((k) => (
        <li key={k.id}>
          <button
            onClick={() => onTanlash(k.id)}
            style={{ fontWeight: k.id === tanlanganId ? 'bold' : 'normal' }}
          >
            {k.ism}
          </button>
        </li>
      ))}
    </ul>
  )
}

function Chat({ kontakt }) {
  const [matn, setMatn] = useState('')
  return (
    <section>
      <textarea
        value={matn}
        onChange={(e) => setMatn(e.target.value)}
        placeholder={kontakt.ism + 'ga xabar'}
      />
      <button>{kontakt.ism}ga yuborish</button>
    </section>
  )
}

export default function Messenjer() {
  const [tanlanganId, setTanlanganId] = useState('ali')
  const kontakt = KONTAKTLAR.find((k) => k.id === tanlanganId)

  return (
    <div className="messenjer">
      <KontaktlarRoyxati tanlanganId={tanlanganId} onTanlash={setTanlanganId} />
      <Chat key={kontakt.id} kontakt={kontakt} />
    </div>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: qoralamalarni eslab qolish">
        <p>
          Endi talab o'zgardi: kontaktlar orasida o'tganda har bir kontakt uchun yozilgan qoralama
          <strong> saqlansin</strong> — Ali'ga yozganingizga qaytsangiz, matn joyida bo'lsin.
          "Yuborish" bosilganda esa o'sha kontaktning qoralamasi tozalansin. <code>key</code>ni
          qoldiring (u endi zarar qilmaydi) va state'ni yuqoriga ko'taring.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`function Chat({ kontakt, matn, onMatnChange, onYuborish }) {
  return (
    <section>
      <textarea value={matn} onChange={(e) => onMatnChange(e.target.value)} />
      <button onClick={onYuborish}>{kontakt.ism}ga yuborish</button>
    </section>
  )
}

export default function Messenjer() {
  const [tanlanganId, setTanlanganId] = useState('ali')
  const [qoralamalar, setQoralamalar] = useState({})   // { ali: '...', vali: '...' }
  const kontakt = KONTAKTLAR.find((k) => k.id === tanlanganId)

  function handleMatn(matn) {
    setQoralamalar({ ...qoralamalar, [tanlanganId]: matn })
  }

  function handleYuborish() {
    alert(\`\${kontakt.ism}ga: \${qoralamalar[tanlanganId] ?? ''}\`)
    setQoralamalar({ ...qoralamalar, [tanlanganId]: '' })
  }

  return (
    <div className="messenjer">
      <KontaktlarRoyxati tanlanganId={tanlanganId} onTanlash={setTanlanganId} />
      <Chat
        key={kontakt.id}
        kontakt={kontakt}
        matn={qoralamalar[tanlanganId] ?? ''}
        onMatnChange={handleMatn}
        onYuborish={handleYuborish}
      />
    </div>
  )
}`}</CodeBlock>
          <p>
            Qoralamalar endi <code>Chat</code>da emas, otada — kontakt id'si bo'yicha obyektda.{' '}
            <code>Chat</code> boshqariladigan komponentga aylandi (20-dars), shuning uchun u
            qayta yaratilsa ham hech narsa yo'qolmaydi. <code>?? ''</code> — hali yozilmagan
            kontakt uchun <code>undefined</code> o'rniga bo'sh satr (17-darsdagi controlled input
            ogohlantirishidan qochish uchun).
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          React state'ni render daraxtidagi o'ringa bog'laydi: o'sha o'rinda o'sha turdagi
          komponent bo'lsa — state saqlanadi, props o'zgarsa ham.
        </li>
        <li>
          O'rinda boshqa tur paydo bo'lsa yoki komponent chizilmay qolsa — uning va butun pastki
          daraxtining state'i yo'qoladi.
        </li>
        <li>
          <code>key</code> o'zgarsa — React buni boshqa komponent deb biladi va noldan yaratadi:{' '}
          <code>{'<Chat key={kontakt.id} />'}</code>.
        </li>
        <li>
          Yashirilgan komponentning state'ini saqlash uchun — state'ni yuqoriga ko'taring yoki
          CSS bilan yashiring.
        </li>
        <li>
          Komponentni komponent ichida e'lon qilmang: har renderda yangi tur — har renderda
          yo'qolgan state.
        </li>
      </KeyPoints>
    </>
  )
}
