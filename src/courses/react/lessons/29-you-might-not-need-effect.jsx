import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Effect kerak bo'lmagan holatlar",
  section: 'Ref va effektlar',
}

export default function YouMightNotNeedEffectLesson() {
  return (
    <>
      <h2>Muammo: effect bilan "sinxronlangan" state</h2>
      <p>
        <code>useEffect</code>ni o'rgangandan keyin uni hamma joyda ishlatish vasvasasi paydo
        bo'ladi. Mana tipik kod:
      </p>
      <CodeBlock lang="jsx">{`function Forma() {
  const [ism, setIsm] = useState('Aziz')
  const [familiya, setFamiliya] = useState('Karimov')
  const [toliqIsm, setToliqIsm] = useState('')

  useEffect(() => {
    setToliqIsm(ism + ' ' + familiya)
  }, [ism, familiya])
  ...
}`}</CodeBlock>
      <p>
        U ishlaydi — lekin ortiqcha ish qiladi. Har bir harf yozilganda: render (eski{' '}
        <code>toliqIsm</code> bilan) → commit → effect → <code>setToliqIsm</code> → yana render
        va commit. Har bir o'zgarish uchun ikki render, va bir xil ma'lumot ikki joyda
        saqlanadi. Kod esa uzunroq va chalkashroq. Bu effect umuman kerak emas edi:
      </p>
      <CodeBlock lang="jsx">{`const toliqIsm = ism + ' ' + familiya   // render paytida hisoblanadi`}</CodeBlock>
      <p>
        Effect — "qochish yo'li": React'dan <strong>tashqaridagi</strong> tizim (brauzer API,
        taymer, server, uchinchi tomon kutubxona) bilan sinxronlash uchun. Agar tashqi tizim
        ishtirok etmasa — ehtimol effect kerak emas. Bu darsda eng ko'p uchraydigan "ortiqcha
        effect"larni va ularning to'g'ri o'rnini ko'ramiz.
      </p>

      <h2>1. Props yoki state'dan hisoblanadigan qiymat</h2>
      <p>
        Yuqoridagi misol — eng ko'p uchraydigani. 19-darsdagi qoida: hisoblab bo'ladigan narsa
        state emas. Filtrlangan ro'yxat, jami summa, saralangan massiv, forma xatolari — hammasi
        render paytida oddiy o'zgaruvchi:
      </p>
      <CodeBlock lang="jsx">{`// YOMON
const [korinadiganlar, setKorinadiganlar] = useState([])
useEffect(() => {
  setKorinadiganlar(vazifalar.filter((v) => filtr === 'hammasi' || v.holat === filtr))
}, [vazifalar, filtr])

// YAXSHI
const korinadiganlar = vazifalar.filter((v) => filtr === 'hammasi' || v.holat === filtr)`}</CodeBlock>
      <Callout type="note" title="Hisoblash qimmat bo'lsa-chi?">
        Minglab elementni har renderda filtrlash sekin bo'lsa, natijani keshlash uchun{' '}
        <code>useMemo</code> hook'i bor — u ham effect emas, render paytida ishlaydi. Lekin
        aksariyat ro'yxatlar uchun oddiy hisoblash millisekunddan kam vaqt oladi; optimallashtirish
        faqat haqiqiy sekinlik o'lchanganda kerak (<code>react-advanced</code> kursida).
      </Callout>

      <h2>2. Prop o'zgarganda state'ni tozalash</h2>
      <p>Profil sahifasidagi sharh maydoni boshqa foydalanuvchiga o'tganda tozalanishi kerak:</p>
      <CodeBlock lang="jsx">{`// YOMON — avval eski sharh bilan chiziladi, keyin tozalanadi
function Profil({ foydalanuvchiId }) {
  const [sharh, setSharh] = useState('')
  useEffect(() => {
    setSharh('')
  }, [foydalanuvchiId])
  ...
}

// YAXSHI — 21-dars: boshqa key — boshqa komponent
<Profil key={foydalanuvchiId} foydalanuvchiId={foydalanuvchiId} />`}</CodeBlock>
      <p>
        <code>key</code> bilan butun komponent va uning barcha ichki state'lari noldan yaratiladi
        — hech narsani qo'lda tozalashni unutib bo'lmaydi.
      </p>

      <h2>3. Tanlangan element mavjudligini "tuzatish"</h2>
      <p>
        Ro'yxat o'zgarganda tanlangan element o'chib ketgan bo'lishi mumkin. Effect bilan
        "tozalash" o'rniga 19-darsdagi usul: tanlangan <strong>id</strong>ni saqlang va
        elementni render paytida toping. Element yo'q bo'lsa — <code>find</code> o'zi{' '}
        <code>undefined</code> qaytaradi:
      </p>
      <CodeBlock lang="jsx">{`// YOMON
useEffect(() => {
  if (!mahsulotlar.some((m) => m.id === tanlanganId)) setTanlanganId(null)
}, [mahsulotlar, tanlanganId])

// YAXSHI
const tanlangan = mahsulotlar.find((m) => m.id === tanlanganId) ?? null`}</CodeBlock>

      <h2>4. Foydalanuvchi harakatiga javob — handler'da</h2>
      <p>
        Bu eng muhim va eng ko'p chalkashtiriladigan holat. Savatchaga qo'shilganda xabar
        chiqarish kerak:
      </p>
      <CodeBlock lang="jsx">{`// YOMON
useEffect(() => {
  if (mahsulot.savatda) {
    bildirishnoma(\`\${mahsulot.nomi} savatga qo'shildi!\`)
  }
}, [mahsulot])

// YAXSHI
function handleQoshish() {
  qoshishSavatga(mahsulot)
  bildirishnoma(\`\${mahsulot.nomi} savatga qo'shildi!\`)
}`}</CodeBlock>
      <p>
        Effect varianti nega yomon? Sahifa qayta ochilganda (mahsulot allaqachon savatda bo'lsa)
        xabar <em>yana</em> chiqadi — garchi foydalanuvchi hech narsa bosmagan bo'lsa ham. Xabar
        "mahsulot savatda" bo'lgani uchun emas, "foydalanuvchi qo'shish tugmasini bosgani"
        uchun chiqishi kerak. Xuddi shunday: forma yuborilganda serverga POST so'rov, "Sotib
        olish"da analitika hodisasi — hammasi handler'da.
      </p>
      <Callout type="tip" title="Bitta savol">
        Kod qatorini qayerga yozishni bilmasangiz, o'zingizdan so'rang:{' '}
        <strong>bu kod nima sababdan ishlashi kerak?</strong>
        <ul>
          <li>
            <strong>Foydalanuvchi biror narsa qilgani uchun</strong> (bosdi, yozdi, yubordi) —
            event handler.
          </li>
          <li>
            <strong>Komponent ekranda ko'ringani uchun</strong> va tashqi tizim bilan moslashish
            kerak (ulanish, so'rov, DOM API) — effect.
          </li>
          <li>
            <strong>Mavjud ma'lumotdan yangi qiymat kerak</strong> — render paytida hisoblash.
          </li>
        </ul>
      </Callout>

      <h2>5. Effect'lar zanjiri</h2>
      <CodeBlock lang="jsx">{`// YOMON — har bir bosqich alohida render
useEffect(() => {
  if (karta !== null && karta.oltin) setOltinSoni((s) => s + 1)
}, [karta])

useEffect(() => {
  if (oltinSoni > 3) {
    setRaund((r) => r + 1)
    setOltinSoni(0)
  }
}, [oltinSoni])

useEffect(() => {
  if (raund > 5) setOyinTugadi(true)
}, [raund])`}</CodeBlock>
      <p>
        Bitta harakat (karta qo'yildi) to'rtta ketma-ket render chaqiradi, va mantiqni kuzatish
        uchun uchta effect'ni sakrab o'qish kerak. Hammasi bitta handler'da, oddiy kod sifatida
        yozilishi kerak — keyingi holat oldingisidan hisoblanadi va barcha setter'lar bitta
        renderga to'planadi (14-dars). <code>oyinTugadi</code> esa umuman state emas:{' '}
        <code>const oyinTugadi = raund {'>'} 5</code>.
      </p>

      <h2>6. Ota komponentga xabar berish</h2>
      <CodeBlock lang="jsx">{`// YOMON — avval bola yangilanadi, keyin effect otaga xabar beradi (ikki render)
function Almashtirgich({ onChange }) {
  const [yoqiq, setYoqiq] = useState(false)
  useEffect(() => {
    onChange(yoqiq)
  }, [yoqiq, onChange])
  return <button onClick={() => setYoqiq(!yoqiq)}>...</button>
}

// YAXSHI — bitta hodisada ikkalasi
function Almashtirgich({ onChange }) {
  const [yoqiq, setYoqiq] = useState(false)
  function handleClick() {
    setYoqiq(!yoqiq)
    onChange(!yoqiq)
  }
  return <button onClick={handleClick}>...</button>
}`}</CodeBlock>
      <p>
        Yanada yaxshisi — 20-darsdagidek state'ni butunlay otaga ko'tarib, komponentni
        boshqariladigan qilish: shunda sinxronlashning o'zi kerak bo'lmaydi.
      </p>

      <h2>Effect qachon haqiqatan kerak?</h2>
      <ul>
        <li>Brauzer API bilan sinxronlash: <code>document.title</code>, <code>scrollIntoView</code> (26-dars).</li>
        <li>Taymerlar, <code>window</code> hodisalari, WebSocket ulanishlari — cleanup bilan (27-dars).</li>
        <li>Komponent ko'ringani uchun serverdan ma'lumot olish — poyga himoyasi bilan (28-dars).</li>
        <li>Brauzer xotirasi bilan sinxronlash: <code>localStorage</code> (keyingi dars).</li>
        <li>React'da yozilmagan kutubxonalar (xarita, grafik) bilan ishlash.</li>
      </ul>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Hisoblanadigan qiymat uchun state + effect</strong> — har o'zgarishda ortiqcha
            render va ikki joyda saqlangan ma'lumot. Render paytida hisoblang.
          </li>
          <li>
            <strong>Foydalanuvchi harakati mantig'i effect'da</strong> — u sahifa qayta
            ochilganda ham ishlab ketadi. Handler'ga ko'chiring.
          </li>
          <li>
            <strong>State'ni tozalash uchun effect</strong> — <code>key</code> ishlating.
          </li>
          <li>
            <strong>Effect'lar zanjiri</strong> — har biri yangi render; mantiqni bitta
            handler'ga yig'ing.
          </li>
          <li>
            <strong>Effect ichida sinxron <code>setState</code></strong> — ko'pincha "bu yerda
            effect kerak emas" degan belgi. Yangi ESLint qoidalari (
            <code>react-hooks/set-state-in-effect</code>) bu haqda ogohlantiradi.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="Forma yuborilgandan keyin serverga POST so'rov yuborish kerak. Qaysi joy to'g'ri?"
        options={[
          "onSubmit handler'ining ichida",
          "useEffect ichida, yuborildi state'i dependency bo'lib",
          "Komponent tanasida, render paytida",
          "useEffect ichida, bo'sh dependency array bilan",
        ]}
        correctIndex={0}
        explanation="So'rov foydalanuvchi formani yuborgani uchun ketadi — bu hodisa, demak handler. Effect varianti ortiqcha render qiladi va state qayta tiklangan holatlarda (masalan, sahifaga qaytganda) so'rov kutilmaganda yana ketishi mumkin."
      />

      <Quiz
        question="Quyidagilardan qaysi biri uchun useEffect haqiqatan ham to'g'ri tanlov?"
        options={[
          "Chat xonasiga WebSocket orqali ulanish va xona o'zgarganda qayta ulanish",
          "Savatdagi mahsulotlar summasini hisoblash",
          "'Saqlash' bosilganda 'Saqlandi!' xabarini ko'rsatish",
          "userId prop'i o'zgarganda formadagi barcha maydonlarni tozalash",
        ]}
        correctIndex={0}
        explanation="WebSocket — tashqi tizim, va ulanish komponent ko'ringan va xona tanlangan ekan davom etishi kerak: bu klassik effect (cleanup bilan). Summa — render paytida hisoblanadi, 'Saqlandi' — handler'da, formani tozalash — key bilan."
      />

      <Exercise title="1-mashq: ortiqcha effect'larni olib tashlang">
        <p>
          Quyidagi komponentda ikkita keraksiz effect bor. Ularni olib tashlab, xatti-harakatni
          saqlagan holda qayta yozing.
        </p>
        <CodeBlock lang="jsx">{`function Savatcha({ qatorlar }) {
  const [jami, setJami] = useState(0)
  const [bepulYetkazish, setBepulYetkazish] = useState(false)
  const [promokod, setPromokod] = useState('')

  useEffect(() => {
    setJami(qatorlar.reduce((s, q) => s + q.narx * q.soni, 0))
  }, [qatorlar])

  useEffect(() => {
    setBepulYetkazish(jami >= 100000)
  }, [jami])

  return (
    <div>
      <input value={promokod} onChange={(e) => setPromokod(e.target.value)} />
      <p>Jami: {jami} so'm</p>
      {bepulYetkazish && <p>Yetkazib berish bepul!</p>}
    </div>
  )
}`}</CodeBlock>
        <Solution>
          <CodeBlock lang="jsx">{`function Savatcha({ qatorlar }) {
  const [promokod, setPromokod] = useState('')

  const jami = qatorlar.reduce((s, q) => s + q.narx * q.soni, 0)
  const bepulYetkazish = jami >= 100000

  return (
    <div>
      <input value={promokod} onChange={(e) => setPromokod(e.target.value)} />
      <p>Jami: {jami} so'm</p>
      {bepulYetkazish && <p>Yetkazib berish bepul!</p>}
    </div>
  )
}`}</CodeBlock>
          <p>
            Ikki state va ikki effect yo'qoldi. Effect'li versiyada <code>qatorlar</code>{' '}
            o'zgarganda uchta render bo'lardi (asl, <code>setJami</code>dan keyin,{' '}
            <code>setBepulYetkazish</code>dan keyin), endi — bitta. <code>promokod</code> esa
            haqiqiy state: uni hech narsadan hisoblab bo'lmaydi.
          </p>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: hodisa yoki effect?">
        <p>
          Ro'yxatdan o'tish formasi: yuborilganda (1) serverga POST so'rov ketishi, (2)
          "Xush kelibsiz!" xabari chiqishi, va (3) sahifa sarlavhasi (
          <code>document.title</code>) forma qaysi bosqichda ekaniga qarab o'zgarishi kerak: "1/2
          — Ma'lumotlar" yoki "2/2 — Tasdiqlash". Har biri qayerda — handler'da, effect'da yoki
          render'da — bo'lishi kerakligini aniqlang va komponentni yozing (so'rov uchun{' '}
          <code>https://jsonplaceholder.typicode.com/users</code> manziliga POST).
        </p>
        <Solution>
          <p>
            (1) va (2) — foydalanuvchi yuborgani uchun: handler. (3) — sarlavha forma holati bilan
            sinxron bo'lishi kerak va brauzer API: effect.
          </p>
          <CodeBlock lang="jsx">{`import { useEffect, useState } from 'react'

export default function Royxatdan() {
  const [bosqich, setBosqich] = useState(1)
  const [ism, setIsm] = useState('')
  const [xabar, setXabar] = useState('')

  useEffect(() => {
    document.title = bosqich === 1 ? "1/2 — Ma'lumotlar" : '2/2 — Tasdiqlash'
  }, [bosqich])

  async function handleSubmit(e) {
    e.preventDefault()
    if (bosqich === 1) {
      setBosqich(2)
      return
    }
    const javob = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: ism }),
    })
    setXabar(javob.ok ? \`Xush kelibsiz, \${ism}!\` : "Xatolik, qayta urinib ko'ring")
  }

  return (
    <form onSubmit={handleSubmit}>
      {bosqich === 1 ? (
        <input value={ism} onChange={(e) => setIsm(e.target.value)} placeholder="Ism" />
      ) : (
        <p>Tasdiqlaysizmi: {ism}?</p>
      )}
      <button type="submit">{bosqich === 1 ? 'Keyingi' : 'Tasdiqlash'}</button>
      {xabar && <p>{xabar}</p>}
    </form>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Effect — faqat React'dan tashqaridagi tizim bilan sinxronlash uchun; tashqi tizim
          bo'lmasa, ehtimol effect kerak emas.
        </li>
        <li>
          Props/state'dan hisoblanadigan qiymat — render paytida oddiy o'zgaruvchi, state + effect
          emas.
        </li>
        <li>
          Prop o'zgarganda state'ni tozalash — <code>key</code>; tanlangan elementni "tuzatish" —
          id saqlab, render'da topish.
        </li>
        <li>
          Foydalanuvchi harakati sababli bajariladigan kod (so'rov, xabar, otaga xabar berish) —
          event handler'da.
        </li>
        <li>
          Savol: "bu kod nima sababdan ishlaydi?" — harakat → handler; ko'rinish + tashqi tizim →
          effect; mavjud ma'lumot → render.
        </li>
      </KeyPoints>
    </>
  )
}
