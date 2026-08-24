import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'useReducer bilan murakkab state',
  section: 'State boshqaruvi naqshlari',
}

export default function UseReducerLesson() {
  return (
    <>
      <p>
        <code>useState</code> ko'pchilik holatlar uchun yetarli — bitta son, bitta matn, bitta
        boolean qiymat. Lekin ba'zan komponentda bir nechta state bo'lagi bor va ular deyarli
        har doim birga o'zgaradi, yoki bitta state'ni yangilash logikasi bir nechta turli
        event handlerlarga tarqalib ketadi. Shu holatda kod tez orada chalkash bo'lib qoladi —
        har bir handler o'z bilganicha state'ni o'zgartiradi, va qayerda nima o'zgarishi
        mumkinligini kuzatish qiyinlashadi. Aynan shu muammoni hal qilish uchun React{' '}
        <code>useReducer</code> hook'ini taklif qiladi.
      </p>

      <h2>Muammo: state yangilash logikasi tarqalib ketishi</h2>
      <p>
        Tasavvur qiling, savat (cart) komponentida bir nechta amal bor: mahsulot qo'shish,
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
        o'qib chiqish kerak bo'ladi.
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
        ma'lumotni ham olib yurishi kerak — masalan, qaysi mahsulot qo'shilayotgani. Bu odatda{' '}
        <code>payload</code> deb ataladigan qo'shimcha maydon orqali beriladi:
      </p>
      <CodeBlock lang="jsx">{`function vazifalarReducer(state, action) {
  switch (action.type) {
    case 'qoshish':
      return [...state, { id: Date.now(), matn: action.payload, bajarildi: false }]
    case 'belgilash':
      return state.map((v) =>
        v.id === action.payload ? { ...v, bajarildi: !v.bajarildi } : v
      )
    case 'ochirish':
      return state.filter((v) => v.id !== action.payload)
    default:
      return state
  }
}

// Chaqirish: dispatch({ type: 'qoshish', payload: 'Non olish' })`}</CodeBlock>

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

      <Exercise title="Mashq">
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
          Bog'liq action'lar qo'shimcha ma'lumotni odatda <code>payload</code> maydoni orqali
          olib yuradi (masalan, <code>{"{ type: 'qoshish', payload: matn }"}</code>).
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
