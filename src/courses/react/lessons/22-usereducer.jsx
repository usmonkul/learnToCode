import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import Figure from '@/components/content/Figure'
import reducerFlow from '@/assets/reducer-flow.svg'

export const meta = {
  title: "useReducer: state mantig'ini bir joyga yig'ish",
  section: 'State boshqaruvi',
}

export default function UseReducerLesson() {
  return (
    <>
      <h2>Muammo: state yangilash logikasi tarqalib ketishi</h2>
      <p>
        <code>useState</code> ko'p holatlar uchun yetarli. Lekin state'ni o'zgartiradigan
        amallar ko'paygan sari mantiq turli handler'lar bo'ylab tarqalib ketadi. Tasavvur
        qiling, savat (cart) komponentida bir nechta amal bor: mahsulot qo'shish,
        o'chirish, sonini oshirish, sonini kamaytirish va savatni tozalash. Agar har birini
        alohida <code>useState</code> setter chaqiruvi orqali yozsak, har bir handler ichida
        state qanday o'zgarishi haqida mustaqil qaror qabul qiladi:
      </p>
      <CodeBlock lang="jsx">{`function Savat() {
  const [mahsulotlar, setMahsulotlar] = useState([])

  function qoshish(mahsulot) {
    setMahsulotlar([...mahsulotlar, mahsulot])
  }

  function ochirish(id) {
    setMahsulotlar(mahsulotlar.filter((m) => m.id !== id))
  }

  function sonioshir(id) {
    setMahsulotlar(
      mahsulotlar.map((m) => (m.id === id ? { ...m, soni: m.soni + 1 } : m))
    )
  }

  // ... yana bir nechta shunga o'xshash handler
}`}</CodeBlock>
      <p>
        Har bir handler o'zi mustaqil ravishda <code>mahsulotlar</code> massivini qanday
        o'zgartirishni biladi. Komponent kattalashgani sari bunday handlerlar soni ko'payadi, va
        "state qanday o'zgarishi mumkin" degan savolga javob topish uchun butun komponentni
        o'qib chiqish kerak bo'ladi. 18-darsdagi uy vazifalari ilovasining <code>App</code>{' '}
        komponentini eslang — unda ham to'rtta shunday handler bor edi.
      </p>

      <h2>Reducer naqshi: barcha o'zgarish logikasini bir joyga jamlash</h2>
      <p>
        <strong>Reducer</strong> — bu shunchaki <code>(state, action)</code> ni qabul qilib, yangi
        state qaytaradigan oddiy, pure (yon ta'sirsiz) funksiya:{' '}
        <code>{'(state, action) => newState'}</code>. U <code>state</code>ni to'g'ridan-to'g'ri
        o'zgartirmaydi — har doim yangi qiymat qaytaradi. <code>action</code> esa "nima sodir
        bo'ldi" ni tasvirlaydigan oddiy obyekt, odatda <code>type</code> maydoni bilan (masalan,{' '}
        <code>{"{ type: 'qoshish', mahsulot }"}</code>). Muhim farq shunda: action{' '}
        <strong>nima sodir bo'lganini</strong> aytadi (masalan, "foydalanuvchi mahsulot
        qo'shdi"), lekin <strong>state qanday o'zgarishi kerakligini</strong> aytmaydi — buni hal
        qilish butunlay reducer funksiyaning vazifasi:
      </p>
      <CodeBlock lang="jsx">{`function hisoblagichReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { soni: state.soni + 1 }
    case 'decrement':
      return { soni: state.soni - 1 }
    case 'reset':
      return { soni: 0 }
    default:
      throw new Error("Noma'lum action turi: " + action.type)
  }
}`}</CodeBlock>
      <p>
        Bu funksiya hech qanday React kodi bilan bog'liq emas — u oddiy JavaScript. Bir xil{' '}
        <code>state</code> va <code>action</code> berilsa, u har doim bir xil natija qaytaradi
        — shuning uchun uni alohida test qilish ham oson.
      </p>

      <h2>
        <code>useReducer</code>ni ishlatish
      </h2>
      <p>
        Reducer funksiyani komponentga ulash uchun <code>useReducer</code> hook'idan
        foydalanamiz. U ikkita narsa qaytaradi: joriy <code>state</code> va{' '}
        <code>dispatch</code> nomli funksiya. <code>dispatch</code>ni chaqirish — "mana bu action
        sodir bo'ldi" deb React'ga xabar berish; React esa reducer'ni{' '}
        <code>(joriy state, yuborilgan action)</code> bilan chaqirib, natijani yangi state
        sifatida saqlaydi va komponentni qayta render qiladi:
      </p>
      <CodeBlock lang="jsx">{`import { useReducer } from 'react'

function hisoblagichReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { soni: state.soni + 1 }
    case 'decrement':
      return { soni: state.soni - 1 }
    case 'reset':
      return { soni: 0 }
    default:
      throw new Error("Noma'lum action turi: " + action.type)
  }
}

function Hisoblagich() {
  const [state, dispatch] = useReducer(hisoblagichReducer, { soni: 0 })

  return (
    <div>
      <p>Hozirgi son: {state.soni}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  )
}`}</CodeBlock>
      <p>
        E'tibor bering: <code>Hisoblagich</code> komponentining event handlerlari juda sodda —
        ular faqat "nima sodir bo'lganini" e'lon qiladi (<code>dispatch</code> orqali). State
        qanday o'zgarishi kerakligi haqidagi butun mantiq bitta joyda, <code>hisoblagichReducer</code>{' '}
        funksiyasida jamlangan. Bu ikki narsani beradi: komponent JSX'i soddaroq bo'ladi, va
        state o'zgarishi mumkin bo'lgan barcha yo'llarni bitta funksiyani o'qib tushunish mumkin
        bo'ladi.
      </p>
      <Figure
        src={reducerFlow}
        alt="Event handler'dan dispatch(action)ga, undan reducer'ga, reducer'dan yangi state'ga, undan qayta render'ga strelkalar; render'dan keyingi hodisaga punktir strelka."
        caption="1-rasm: useReducer'da ma'lumot oqimi"
      />

      <Callout type="tip" title="useReducer — useState'ning kattaroq versiyasi">
        <code>useReducer</code>ni <code>useState</code>ning butunlay boshqa vositasi deb emas,
        balki uning "kattaroq, tartibliroq versiyasi" deb tasavvur qiling. Bitta oddiy qiymat
        (matn, son, boolean) uchun <code>useState</code> ko'pincha yetarli va soddaroq. Lekin bir
        nechta o'zaro bog'liq state bo'lagi bo'lsa, yoki state'ni yangilash logikasi bir nechta
        turli event'lardan chaqirilib, murakkablashib borsa — <code>useReducer</code>ga o'tish
        kodni tartibga soladi. Ikkisi ham bir xil maqsadga xizmat qiladi, faqat{' '}
        <code>useReducer</code> yangilash mantiqini bitta markazlashgan joyga jamlaydi.
      </Callout>

      <h2>Action'ga qo'shimcha ma'lumot (payload) uzatish</h2>
      <p>
        Ko'pincha action nafaqat "nima sodir bo'ldi"ni, balki shu bilan bog'liq qo'shimcha
        ma'lumotni ham olib yurishi kerak — masalan, qaysi vazifa o'chirilayotgani. Bu ma'lumot
        action obyektining qo'shimcha maydonlariga yoziladi:
      </p>
      <CodeBlock lang="jsx">{`function vazifalarReducer(state, action) {
  switch (action.type) {
    case 'qoshish':
      return [...state, { id: action.id, matn: action.matn, bajarildi: false }]
    case 'belgilash':
      return state.map((v) =>
        v.id === action.id ? { ...v, bajarildi: !v.bajarildi } : v
      )
    case 'ochirish':
      return state.filter((v) => v.id !== action.id)
    default:
      return state
  }
}

// Chaqirish (id handler'da yaratiladi — reducer sof bo'lishi kerak):
dispatch({ type: 'qoshish', id: crypto.randomUUID(), matn: 'Non olish' })
dispatch({ type: 'ochirish', id: 'v1' })`}</CodeBlock>
      <p>
        Qo'shimcha maydonlarni action obyektiga to'g'ridan-to'g'ri yozish mumkin (
        <code>id</code>, <code>matn</code>), yoki ularni bitta <code>payload</code> maydoniga
        yig'ish — ikkalasi ham keng tarqalgan, muhimi loyiha bo'ylab bir xil bo'lsin.
        E'tibor bering: yangi <code>id</code> reducer ichida emas, <code>dispatch</code>dan
        oldin yaratilgan. Reducer render paytida (va StrictMode'da ikki marta) chaqirilishi
        mumkin, shuning uchun u 9-darsdagi kabi sof bo'lishi shart: tasodifiy son,{' '}
        <code>Date.now()</code>, so'rov yoki mutatsiya — taqiqlangan.
      </p>

      <h2>useState'dan useReducer'ga: uch qadam</h2>
      <p>18-darsdagi <code>App</code>ni reducer'ga o'tkazamiz:</p>
      <ol>
        <li>
          <strong>Handler'larda state'ni o'zgartirish o'rniga action yuboring.</strong>{' '}
          <code>handleOchirish(id)</code> endi faqat{' '}
          <code>{"dispatch({ type: 'ochirish', id })"}</code> qiladi.
        </li>
        <li>
          <strong>Reducer yozing</strong> — har bir action turi uchun bitta <code>case</code>,
          ichida 16-darsdagi immutable yangilanish.
        </li>
        <li>
          <strong>Komponentda ulang:</strong>{' '}
          <code>{'const [vazifalar, dispatch] = useReducer(vazifalarReducer, BOSHLANGICH)'}</code>.
        </li>
      </ol>
      <CodeBlock lang="jsx">{`function vazifalarReducer(vazifalar, action) {
  switch (action.type) {
    case 'qoshish':
      return [...vazifalar, { ...action.vazifa, bajarildi: false }]
    case 'almashtirish':
      return vazifalar.map((v) =>
        v.id === action.id ? { ...v, bajarildi: !v.bajarildi } : v
      )
    case 'ochirish':
      return vazifalar.filter((v) => v.id !== action.id)
    case 'tozalash':
      return vazifalar.filter((v) => !v.bajarildi)
    default:
      throw new Error("Noma'lum action: " + action.type)
  }
}

export default function App() {
  const [vazifalar, dispatch] = useReducer(vazifalarReducer, BOSHLANGICH)
  const [filtr, setFiltr] = useState('hammasi')   // oddiy state — useState'da qoladi

  function handleQoshish(yangi) {
    dispatch({ type: 'qoshish', vazifa: { ...yangi, id: crypto.randomUUID() } })
  }
  function handleAlmashtir(id) {
    dispatch({ type: 'almashtirish', id })
  }
  function handleOchirish(id) {
    dispatch({ type: 'ochirish', id })
  }
  function handleTozalash() {
    dispatch({ type: 'tozalash' })
  }
  // ... JSX o'zgarishsiz
}`}</CodeBlock>
      <p>
        JSX bir qator ham o'zgarmadi. Endi esa "vazifalar ro'yxati qanday o'zgarishi mumkin?"
        degan savolga javob — bitta funksiya, 15 qator. Reducer React'ga bog'liq emas: uni
        alohida faylga (<code>vazifalarReducer.js</code>) chiqarish va oddiy JavaScript
        sifatida tekshirish mumkin. Bir komponentda <code>useState</code> va{' '}
        <code>useReducer</code>ni aralashtirish ham normal — oddiy qiymatlar uchun{' '}
        <code>useState</code> soddaroq.
      </p>

      <h2>Qachon qaysi biri?</h2>
      <ul>
        <li>
          <strong><code>useState</code></strong> — bir-biriga bog'liq bo'lmagan oddiy qiymatlar,
          bir-ikki xil yangilanish. Kamroq kod.
        </li>
        <li>
          <strong><code>useReducer</code></strong> — bir state'ni ko'p xil yo'l bilan
          o'zgartiradigan amallar, bir-biriga bog'liq bir nechta maydon, yoki yangilanish
          mantig'i murakkab bo'lsa. Mantiq bir joyda va komponentdan ajratilgan.
        </li>
      </ul>
      <p>
        Ikkalasi ham bir xil ishni qiladi — bu ta'm va o'qilishga oid tanlov. Istalgan paytda
        biridan ikkinchisiga o'tish mumkin. Keyingi darsda reducer'ni context bilan birlashtirib,
        uni butun ilova bo'ylab ishlatamiz.
      </p>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Reducer ichida state'ni mutatsiya qilish.</strong>{' '}
            <code>state.push(...); return state</code> — o'sha massiv, render yo'q. Reducer ham
            15–16-darslardagi qoidalarga bo'ysunadi.
          </li>
          <li>
            <strong>Reducer'da side effect.</strong> <code>fetch</code>,{' '}
            <code>localStorage</code>, <code>crypto.randomUUID()</code>, <code>Date.now()</code>{' '}
            — handler'da qiling va natijani action'ga qo'shing.
          </li>
          <li>
            <strong><code>return</code>ni unutish.</strong> Biror <code>case</code>dan qiymat
            qaytmasa, state <code>undefined</code> bo'lib qoladi va keyingi renderda "Cannot read
            properties of undefined" xatosi chiqadi.
          </li>
          <li>
            <strong>Action turi nomida xato.</strong>{' '}
            <code>{"dispatch({ type: 'ochrish' })"}</code> — <code>default</code> jimgina{' '}
            <code>state</code> qaytarsa, xato sezilmaydi. <code>default</code>da{' '}
            <code>throw new Error(...)</code> uni darhol ko'rsatadi.
          </li>
          <li>
            <strong>Obyekt state'da maydonlarni yo'qotish.</strong>{' '}
            <code>{"return { yuklanmoqda: true }"}</code> — qolgan maydonlar o'chadi;{' '}
            <code>{"{ ...state, yuklanmoqda: true }"}</code> yozing.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="useReducer bilan yozilgan komponentda dispatch({ type: 'increment' }) chaqirilganda, aslida nima sodir bo'ladi?"
        options={[
          "State darhol, sinxron ravishda { soni: state.soni + 1 } ga o'zgaradi",
          'React reducer funksiyani joriy state va shu action bilan chaqiradi, natijani yangi state sifatida saqlaydi va komponentni qayta render qiladi',
          "dispatch state'ni to'g'ridan-to'g'ri, reducer funksiyani chaqirmasdan yangilaydi",
          "Hech narsa sodir bo'lmaydi, chunki 'increment' reducer ichida e'lon qilinmagan",
        ]}
        correctIndex={1}
        explanation="dispatch state'ni bevosita o'zgartirmaydi — u faqat reducer funksiyani joriy state va yuborilgan action bilan chaqirishni React'ga topshiradi. Reducer qaytargan natija yangi state sifatida saqlanadi, shundan keyingina komponent qayta render bo'ladi."
      />

      <Quiz
        question="Quyidagi reducer'da nima xato? case 'qoshish': state.mahsulotlar.push(action.mahsulot); return state"
        options={[
          "State mutatsiya qilinyapti va o'sha obyekt qaytarilyapti — React o'zgarishni sezmaydi",
          "Reducer'da push ishlatib bo'lmaydi, chunki u sintaksis xatosi",
          "case nomi katta harf bilan yozilishi kerak",
          "Hech qanday xato yo'q",
        ]}
        correctIndex={0}
        explanation="push asl massivni o'zgartiradi, return state esa o'sha obyektni qaytaradi. React eski va yangi state'ni Object.is bilan solishtiradi — ular bir xil, render bo'lmaydi. To'g'risi: return { ...state, mahsulotlar: [...state.mahsulotlar, action.mahsulot] }."
      />

      <Exercise title="1-mashq: chiroq">
        <p>
          <code>chiroqReducer</code> nomli reducer funksiya yozing — u{' '}
          <code>{'{ yoqilgan: boolean }'}</code> ko'rinishidagi state'ni boshqaradi va ikkita
          action turini qo'llab-quvvatlaydi: <code>{"'yoqish'"}</code> (state'ni{' '}
          <code>{'{ yoqilgan: true }'}</code>ga o'zgartiradi) va <code>{"'ochirish'"}</code> (
          <code>{'{ yoqilgan: false }'}</code>ga o'zgartiradi). So'ng <code>Chiroq</code>{' '}
          komponentida <code>useReducer</code> orqali shu reducer'ni ulang va joriy holatga
          qarab "Yoniq" yoki "O'chiq" matnini hamda ikkita tugmani chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useReducer } from 'react'

function chiroqReducer(state, action) {
  switch (action.type) {
    case 'yoqish':
      return { yoqilgan: true }
    case 'ochirish':
      return { yoqilgan: false }
    default:
      return state
  }
}

function Chiroq() {
  const [state, dispatch] = useReducer(chiroqReducer, { yoqilgan: false })

  return (
    <div>
      <p>{state.yoqilgan ? 'Yoniq' : "O'chiq"}</p>
      <button onClick={() => dispatch({ type: 'yoqish' })}>Yoqish</button>
      <button onClick={() => dispatch({ type: 'ochirish' })}>O'chirish</button>
    </div>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: so'rovnoma qadamlari">
        <p>
          Uch bosqichli ro'yxatdan o'tish ustasi (wizard) uchun reducer yozing. State:{' '}
          <code>{"{ qadam: 1, malumot: { ism: '', email: '', tarif: 'oddiy' } }"}</code>.
          Action'lar: <code>maydon</code> (bitta maydonni yangilaydi: <code>nom</code> va{' '}
          <code>qiymat</code>), <code>keyingi</code> (qadamni oshiradi, 3 dan oshmaydi),{' '}
          <code>oldingi</code> (kamaytiradi, 1 dan kam emas) va <code>boshidan</code>{' '}
          (boshlang'ich holatga qaytaradi). Komponentda har bir qadamda bitta maydon va
          "Orqaga"/"Keyingi" tugmalari bo'lsin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useReducer } from 'react'

const BOSH = { qadam: 1, malumot: { ism: '', email: '', tarif: 'oddiy' } }

function ustaReducer(state, action) {
  switch (action.type) {
    case 'maydon':
      return {
        ...state,
        malumot: { ...state.malumot, [action.nom]: action.qiymat },
      }
    case 'keyingi':
      return { ...state, qadam: Math.min(3, state.qadam + 1) }
    case 'oldingi':
      return { ...state, qadam: Math.max(1, state.qadam - 1) }
    case 'boshidan':
      return BOSH
    default:
      throw new Error("Noma'lum action: " + action.type)
  }
}

export default function Usta() {
  const [{ qadam, malumot }, dispatch] = useReducer(ustaReducer, BOSH)

  function handleChange(e) {
    dispatch({ type: 'maydon', nom: e.target.name, qiymat: e.target.value })
  }

  return (
    <div>
      <p>{qadam}/3-qadam</p>
      {qadam === 1 && <input name="ism" value={malumot.ism} onChange={handleChange} />}
      {qadam === 2 && <input name="email" value={malumot.email} onChange={handleChange} />}
      {qadam === 3 && (
        <select name="tarif" value={malumot.tarif} onChange={handleChange}>
          <option value="oddiy">Oddiy</option>
          <option value="pro">Pro</option>
        </select>
      )}
      <button onClick={() => dispatch({ type: 'oldingi' })} disabled={qadam === 1}>
        Orqaga
      </button>
      <button onClick={() => dispatch({ type: 'keyingi' })} disabled={qadam === 3}>
        Keyingi
      </button>
      <button onClick={() => dispatch({ type: 'boshidan' })}>Boshidan</button>
    </div>
  )
}`}</CodeBlock>
          <p>
            Qadam chegaralari (1–3) reducer ichida — komponent ularni bilishi shart emas.{' '}
            <code>boshidan</code> uchun <code>BOSH</code> obyektining o'zini qaytarish xavfsiz:
            biz uni hech qachon mutatsiya qilmaymiz. <code>useReducer</code> qaytargan state'ni
            to'g'ridan-to'g'ri destructuring qilish ham mumkin.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Reducer — <code>(state, action) =&gt; newState</code> ko'rinishidagi pure funksiya;
          state'ni to'g'ridan-to'g'ri o'zgartirmaydi, har doim yangi qiymat qaytaradi.
        </li>
        <li>
          Action — odatda <code>type</code> maydoniga ega oddiy obyekt, "nima sodir bo'ldi"ni
          tasvirlaydi (masalan, <code>increment</code>), lekin "qanday o'zgarish kerak"ligini
          aytmaydi — buni reducer hal qiladi.
        </li>
        <li>
          <code>const [state, dispatch] = useReducer(reducer, initialState)</code> — komponent
          reducer'ni ulaydi; <code>dispatch(action)</code> chaqirilganda React reducer'ni joriy
          state va action bilan chaqirib, natijani yangi state qilib saqlaydi.
        </li>
        <li>
          Action qo'shimcha ma'lumotni o'z maydonlarida olib yuradi (
          <code>{"{ type: 'ochirish', id }"}</code>). Reducer sof: id, sana va so'rovlar
          handler'da yaratiladi.
        </li>
        <li>
          <code>useReducer</code> — <code>useState</code>ning almashtiruvchisi emas, balki
          bir nechta o'zaro bog'liq state bo'lagi yoki tarqoq yangilash logikasi bo'lgan
          holatlar uchun uning kattaroq, tartibliroq versiyasi.
        </li>
      </KeyPoints>
    </>
  )
}
