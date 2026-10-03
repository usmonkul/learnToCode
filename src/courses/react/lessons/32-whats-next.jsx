import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Xulosa va keyingi qadamlar',
  section: 'Ref va effektlar',
}

export default function WhatsNextLesson() {
  return (
    <>
      <h2>Muammo: "Endi nima?"</h2>
      <p>
        Siz React'ning asosini to'liq o'tdingiz va to'rtta ishlaydigan ilova qurdingiz. Lekin
        haqiqiy loyihaga kirishingiz bilan yangi savollar paydo bo'ladi: bir nechta sahifa
        qanday qilinadi? Ma'lumotni har safar qaytadan yuklamaslik uchun nima qilish kerak? Ilova
        sekinlashsa-chi? Bu dars — o'rganganlaringizni bir joyga yig'ish va keyingi yo'lni
        ko'rsatish uchun.
      </p>

      <h2>Bu kursda nimalarni o'rgandingiz</h2>
      <ul>
        <li>
          <strong>Boshlash.</strong> React — ma'lumotdan UI yasaydigan deklarativ kutubxona; Vite
          loyihasi; JSX; komponentlar va modullar.
        </li>
        <li>
          <strong>UI'ni tasvirlash.</strong> Props va <code>children</code>; shartli render;
          ro'yxatlar va <code>key</code>; sof komponentlar va render daraxti; CSS Modules.
        </li>
        <li>
          <strong>Interaktivlik.</strong> Hodisalar; <code>useState</code>; render va commit,
          state — surat, batching, updater; obyekt va massivlarni immutable yangilash; formalar.
        </li>
        <li>
          <strong>State boshqaruvi.</strong> Minimal state; state'ni ko'tarish; o'rin va{' '}
          <code>key</code> bilan state saqlash/tozalash; <code>useReducer</code>; context.
        </li>
        <li>
          <strong>Ref va effektlar.</strong> <code>useRef</code>; <code>useEffect</code> va
          cleanup; ma'lumot yuklash va poyga holati; effect kerak bo'lmagan holatlar; custom
          hook'lar.
        </li>
      </ul>
      <p>
        Agar bitta fikrni eslab qolish kerak bo'lsa, u shu: <strong>UI = f(state)</strong>.
        Minimal state saqlang, qolganini render paytida hisoblang, foydalanuvchi harakatlarini
        handler'larda, tashqi dunyo bilan sinxronlashni effect'larda qiling.
      </p>

      <h2>Keyingi kurs: react-advanced</h2>
      <Callout type="note" title="Kurs tayyorlanmoqda">
        <code>react-advanced</code> kursi hozir tayyorlanmoqda. Quyidagi mavzular u chiqqanda
        shu yerda havolalar bilan paydo bo'ladi. Ungacha bu ro'yxatdan mustaqil o'rganish rejasi
        sifatida foydalanishingiz mumkin.
      </Callout>
      <ol>
        <li>
          <strong>Routing — React Router.</strong> Bir nechta sahifa, URL parametrlari (
          <code>/kitob/:id</code>), ichma-ich maketlar, sahifa ochilishidan oldin ma'lumot yuklash
          (loader'lar).
        </li>
        <li>
          <strong>Ma'lumot bilan ishlash — TanStack Query.</strong> Keshlash, fon rejimida
          yangilash, sahifalash, so'rov holatlarini avtomatik boshqarish; Suspense va{' '}
          <code>use</code> hook'i. 28-darsdagi qo'lda yozilgan kodning "sanoat" varianti.
        </li>
        <li>
          <strong>React 19 formalari.</strong> Actions, <code>useActionState</code>,{' '}
          <code>useFormStatus</code>, <code>useOptimistic</code> — 17-darsdagi formalarni
          yuborish, kutish va xatolarni boshqarishning yangi usuli.
        </li>
        <li>
          <strong>Tezlik.</strong> Qayta renderlar qanday tarqaladi, React DevTools Profiler,{' '}
          <code>memo</code>, <code>useMemo</code>, <code>useCallback</code>, React Compiler;{' '}
          <code>lazy</code> va kodni bo'laklarga bo'lish.
        </li>
        <li>
          <strong>Mustahkamlik va naqshlar.</strong> Error boundary'lar, portallar (modal oynalar
          uchun), murakkab komponent naqshlari.
        </li>
        <li>
          <strong>Global state.</strong> Context yetmay qolganda — Zustand.
        </li>
        <li>
          <strong>Sifat.</strong> Vitest va React Testing Library bilan test yozish; ilovani
          internetga joylash (deploy).
        </li>
        <li>
          <strong>Yakuniy loyiha</strong> — ko'p sahifali, server bilan ishlaydigan to'liq ilova.
        </li>
      </ol>

      <h2>Hozir nima qilish kerak?</h2>
      <p>
        Eng yaxshi o'qituvchi — o'z loyihangiz. Kurs loyihalaridan farqli o'laroq, unda qadamlar
        yozilmagan, va aynan shu "qayerdan boshlayman?" holati sizni dasturchiga aylantiradi.
      </p>
      <ul>
        <li>
          <strong>Loyihalar sahifasidagi</strong> React loyihalarini o'zingiz qaytadan yozing —
          avval ko'rib chiqing, keyin kodga qaramasdan quring.
        </li>
        <li>
          <strong>To'rtta kurs loyihasining qo'shimcha topshiriqlarini</strong> bajaring — ular
          ataylab yechimsiz qoldirilgan.
        </li>
        <li>
          <strong>Hujjatlarni o'qing.</strong> <a href="https://react.dev">react.dev</a> — React
          jamoasining rasmiy qo'llanmasi; bu kursdagi ko'p g'oyalar o'sha yerdan. Endi uni bemalol
          tushuna olasiz.
        </li>
        <li>
          <strong>Kodingizni GitHub'ga joylang</strong> va Vercel yoki Netlify orqali internetga
          chiqaring — ishga topshirishda portfolio sifatida ko'rsatish uchun.
        </li>
        <li>
          <strong>TypeScript</strong> — React loyihalarining aksariyati endi TypeScript'da
          yoziladi. Platformadagi TypeScript kursida React bilan ishlash bo'limi bor.
        </li>
      </ul>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Kutubxonalarga erta o'tish.</strong> Asoslarni mustahkamlamay turib Redux,
            Next.js, TanStack Query'ni o'rganish — ular hal qiladigan muammoni his qilmasdan,
            ularni tushunish qiyin.
          </li>
          <li>
            <strong>Faqat video ko'rish.</strong> React faqat yozish orqali o'rganiladi. Har
            mavzudan keyin kichik narsa quring.
          </li>
          <li>
            <strong>"Tutorial do'zaxi".</strong> Ketma-ket qo'llanmalarni takrorlash o'rniga,
            o'zingiz o'ylab topgan kichik ilovani boshidan oxirigacha quring — xato qilib, o'zingiz
            tuzating.
          </li>
          <li>
            <strong>Eski maqolalarga ishonish.</strong> Internetda class komponentlar,{' '}
            <code>forwardRef</code>, <code>create-react-app</code> va <code>.Provider</code>{' '}
            bilan yozilgan ko'p material bor. Ular ishlaydi, lekin yangi kodni bu kursdagidek
            yozing.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="Komponentda foydalanuvchilar ro'yxati va qidiruv so'zi bor; filtrlangan ro'yxat ekranda ko'rsatiladi. Filtrlangan ro'yxat qayerda bo'lishi kerak?"
        options={[
          "Render paytida hisoblanadigan oddiy o'zgaruvchi",
          "Alohida useState, qidiruv so'zi o'zgarganda useEffect bilan yangilanadi",
          "useRef ichida",
          "Context ichida",
        ]}
        correctIndex={0}
        explanation="Filtrlangan ro'yxat ro'yxat va qidiruv so'zidan hisoblanadi — u state emas (19-dars) va effect ham kerak emas (29-dars). Ref esa ekranda ko'rinadigan qiymat uchun emas (25-dars)."
      />

      <Quiz
        question="Foydalanuvchi 'Saqlash' tugmasini bosganda ma'lumot serverga yuborilishi, sahifa ochilganda esa serverdan yuklanishi kerak. To'g'ri juftlik qaysi?"
        options={[
          "Saqlash — handler'da; yuklash — effect'da (poyga himoyasi bilan)",
          "Ikkalasi ham effect'da",
          "Ikkalasi ham handler'da",
          "Saqlash — effect'da; yuklash — render paytida",
        ]}
        correctIndex={0}
        explanation="Saqlash foydalanuvchi harakati sababli — handler. Yuklash komponent ko'ringani uchun va tashqi tizim bilan sinxronlash — effect, cleanup'da eskirgan javobni bekor qilish bilan (28-dars)."
      />

      <Exercise title="1-mashq: o'z loyihangizni rejalashtiring">
        <p>
          O'zingizga kerakli kichik ilova tanlang (masalan: xarajatlar daftari, so'z yodlash
          kartochkalari, sport mashg'ulotlari jurnali). Kod yozishdan oldin 19-darsdagi "React'da
          fikrlash" qadamlarini qog'ozda bajaring: komponentlar daraxti, minimal state ro'yxati,
          har bir state qayerda yashashi, va qaysi ishlar handler'da, qaysilari effect'da
          bo'lishi.
        </p>
        <Solution>
          <p>Namuna: so'z yodlash kartochkalari.</p>
          <CodeBlock lang="text">{`Komponentlar:
App
├── Sarlavha            (bugun takrorlangan so'zlar soni)
├── SozQoshishFormasi   (o'z state'i: inglizcha, o'zbekcha)
├── Kartochka           (o'z state'i: aylantirilganmi)
│   └── BahoTugmalari   (Bildim / Bilmadim)
└── Statistika

Minimal state:
- sozlar: [{ id, inglizcha, ozbekcha, bilganlar, oxirgiTakror }]  → App, useLocalStorage
- joriyId                                                         → App
- forma maydonlari                                                → SozQoshishFormasi
- aylantirilgan                                                   → Kartochka (key={joriyId} bilan tozalanadi)

Hisoblanadi: bugungi takrorlar soni, keyingi so'z, statistika foizlari.

Handler'lar: so'z qo'shish, baho berish, keyingi so'zga o'tish.
Effect'lar: localStorage (useLocalStorage ichida), document.title.`}</CodeBlock>
          <p>
            Yagona to'g'ri javob yo'q — muhimi, kod yozishdan oldin state qayerda va nima
            ekanini aniq bilish.
          </p>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: kod ko'rib chiqish">
        <p>
          Quyidagi komponentda kursda o'rganilgan kamida beshta xato bor. Ularni toping va
          to'g'ri variantini yozing.
        </p>
        <CodeBlock lang="jsx">{`function Royxat({ elementlar }) {
  const [tanlangan, setTanlangan] = useState(elementlar[0])
  const [soni, setSoni] = useState(0)

  useEffect(() => {
    setSoni(elementlar.length)
  }, [elementlar])

  function Qator({ el }) {
    return <li onClick={setTanlangan(el)}>{el.nomi}</li>
  }

  elementlar.sort((a, b) => a.nomi.localeCompare(b.nomi))

  return (
    <ul>
      {soni && <p>{soni} ta element</p>}
      {elementlar.map((el, i) => <Qator key={i} el={el} />)}
      <p>Tanlangan: {tanlangan.nomi}</p>
    </ul>
  )
}`}</CodeBlock>
        <Solution>
          <ol>
            <li>
              <code>tanlangan</code> — obyektning nusxasi (19-dars); id saqlash kerak.
            </li>
            <li>
              <code>soni</code> — ortiqcha state + effect (29-dars); <code>elementlar.length</code>{' '}
              hisoblanadi.
            </li>
            <li>
              <code>Qator</code> komponent ichida e'lon qilingan (4 va 21-darslar).
            </li>
            <li>
              <code>{'onClick={setTanlangan(el)}'}</code> — render paytida chaqiriladi, cheksiz
              render (13-dars).
            </li>
            <li>
              <code>elementlar.sort</code> — props'ni mutatsiya qiladi (9-dars); <code>toSorted</code>.
            </li>
            <li>
              <code>{'{soni && ...}'}</code> — 0 bo'lsa ekranda "0" (7-dars).
            </li>
            <li>
              <code>{'key={i}'}</code> — indeks key, ro'yxat saralanadi (8-dars).
            </li>
            <li>
              <code>{'<p>'}</code> <code>{'<ul>'}</code> ichida — noto'g'ri HTML; ro'yxatdan
              tashqariga chiqaring.
            </li>
          </ol>
          <CodeBlock lang="jsx">{`function Qator({ el, tanlangan, onTanlash }) {
  return (
    <li onClick={() => onTanlash(el.id)} className={tanlangan ? 'tanlangan' : ''}>
      {el.nomi}
    </li>
  )
}

function Royxat({ elementlar }) {
  const [tanlanganId, setTanlanganId] = useState(elementlar[0]?.id ?? null)

  const saralangan = elementlar.toSorted((a, b) => a.nomi.localeCompare(b.nomi))
  const tanlangan = elementlar.find((el) => el.id === tanlanganId)

  return (
    <>
      {elementlar.length > 0 && <p>{elementlar.length} ta element</p>}
      <ul>
        {saralangan.map((el) => (
          <Qator
            key={el.id}
            el={el}
            tanlangan={el.id === tanlanganId}
            onTanlash={setTanlanganId}
          />
        ))}
      </ul>
      {tanlangan && <p>Tanlangan: {tanlangan.nomi}</p>}
    </>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          React'ning asosi: UI = f(state) — minimal state, qolgani hisoblanadi; harakatlar —
          handler'da, tashqi tizimlar — effect'da.
        </li>
        <li>
          Keyingi qadam — <code>react-advanced</code>: routing, TanStack Query, React 19
          formalari, tezlik, error boundary, Zustand, testlar (kurs tayyorlanmoqda).
        </li>
        <li>
          Eng tez o'sish — o'z loyihangizni rejalashtirib, boshidan oxirigacha qurish va uni
          portfolioga joylash.
        </li>
        <li>
          Rasmiy hujjat — react.dev; eski uslubdagi (class, <code>forwardRef</code>,{' '}
          <code>.Provider</code>) materiallarni farqlay oling.
        </li>
      </KeyPoints>
    </>
  )
}
