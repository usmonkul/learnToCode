import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "State'ni to'g'ri tuzish",
  section: 'State boshqaruvi',
}

export default function StructuringStateLesson() {
  return (
    <>
      <h2>Muammo: "bo'lishi mumkin bo'lmagan" holatlar</h2>
      <p>
        Fikr-mulohaza formasini yozdik. Yuborish jarayonini kuzatish uchun uchta boolean state
        qo'shdik:
      </p>
      <CodeBlock lang="jsx">{`const [yuborilmoqda, setYuborilmoqda] = useState(false)
const [yuborildi, setYuborildi] = useState(false)
const [xato, setXato] = useState(false)

async function handleSubmit(e) {
  e.preventDefault()
  setYuborilmoqda(true)
  try {
    await yuborish(matn)
    setYuborildi(true)
    // setYuborilmoqda(false) ni unutdik...
  } catch {
    setXato(true)
  }
}`}</CodeBlock>
      <p>
        Bitta qatorni unutdik — va endi ekranda bir vaqtda "Yuborilmoqda..." aylanib turibdi va
        "Rahmat, yuborildi!" yozuvi turibdi. Uchta boolean — bu 2 × 2 × 2 = 8 ta kombinatsiya,
        ulardan faqat 4 tasi ma'noli. Qolgan 4 tasi — <strong>bo'lishi mumkin bo'lmagan</strong>{' '}
        holatlar, va ularning har biri bitta unutilgan setter bilan reallikka aylanadi.
      </p>
      <p>
        Bu bo'limda state'ni qayerda saqlash va qanday ulashishni o'rganamiz. Lekin undan oldin
        eng muhim savol: <strong>state'da aslida nima bo'lishi kerak?</strong> Yaxshi tuzilgan
        state'da xato qilishning o'zi qiyin bo'ladi.
      </p>

      <h2>1-qoida: qarama-qarshiliklardan qoching</h2>
      <p>
        Bir vaqtda faqat bittasi to'g'ri bo'lishi mumkin bo'lgan boolean'lar o'rniga bitta{' '}
        <strong>holat</strong> o'zgaruvchisi saqlang:
      </p>
      <CodeBlock lang="jsx">{`// 'kiritilmoqda' | 'yuborilmoqda' | 'yuborildi' | 'xato'
const [holat, setHolat] = useState('kiritilmoqda')

async function handleSubmit(e) {
  e.preventDefault()
  setHolat('yuborilmoqda')
  try {
    await yuborish(matn)
    setHolat('yuborildi')
  } catch {
    setHolat('xato')
  }
}

// kerak bo'lsa, boolean'lar hisoblanadi:
const yuborilmoqda = holat === 'yuborilmoqda'`}</CodeBlock>
      <p>
        Endi "bir vaqtda ham yuborilmoqda, ham yuborildi" holatini yozishning iloji ham yo'q:{' '}
        <code>holat</code> bir paytda faqat bitta qiymatga ega. 7-darsdagi lug'at obyekt bilan esa
        har bir holat uchun matnni bitta joyda saqlash mumkin.
      </p>

      <h2>2-qoida: ortiqcha state saqlamang</h2>
      <p>
        Agar qiymatni boshqa state yoki props'dan render paytida hisoblab bo'lsa — u state'da
        bo'lmasligi kerak. Bu qoidani 13 va 18-darslarda allaqachon qo'lladik; endi u nega
        muhimligini ko'raylik:
      </p>
      <CodeBlock lang="jsx">{`// XATO: toliqIsm — ortiqcha state
const [ism, setIsm] = useState('')
const [familiya, setFamiliya] = useState('')
const [toliqIsm, setToliqIsm] = useState('')

function handleIsm(e) {
  setIsm(e.target.value)
  setToliqIsm(e.target.value + ' ' + familiya)   // har safar sinxronlash kerak
}
// ...va handleFamiliya'da ham, va formani tozalashda ham...`}</CodeBlock>
      <CodeBlock lang="jsx">{`// TO'G'RI: hisoblanadi
const [ism, setIsm] = useState('')
const [familiya, setFamiliya] = useState('')
const toliqIsm = ism + ' ' + familiya`}</CodeBlock>
      <p>
        Har bir ortiqcha state — sinxronlashni unutish uchun yana bir imkoniyat. Hisoblangan
        qiymat esa hech qachon "orqada qolmaydi": u har renderda yangidan, joriy ma'lumotdan
        olinadi. Savolni o'zingizga bering:{' '}
        <strong>"Buni boshqa narsadan hisoblab bo'ladimi?"</strong> Bo'lsa — state emas.
      </p>

      <h3>Props'ni state'ga ko'chirmang</h3>
      <p>Ortiqcha state'ning eng ayyor turi — props'ni state'ga "nusxalash":</p>
      <CodeBlock lang="jsx">{`function Xabar({ rang }) {
  const [matnRangi, setMatnRangi] = useState(rang)   // XATO
  ...
}`}</CodeBlock>
      <p>
        <code>useState(rang)</code> faqat <strong>birinchi</strong> renderda ishlatiladi. Ota
        komponent keyinroq boshqa <code>rang</code> yuborsa, <code>matnRangi</code> eskicha
        qoladi. Agar props'ning joriy qiymati kerak bo'lsa — to'g'ridan-to'g'ri{' '}
        <code>rang</code>ni ishlating. Agar ataylab faqat boshlang'ich qiymat kerak bo'lsa, buni
        nomda ko'rsating: <code>boshlangichRang</code> — shunda o'quvchi keyingi o'zgarishlar
        e'tiborga olinmasligini tushunadi.
      </p>

      <h2>3-qoida: ma'lumotni takrorlamang</h2>
      <p>
        Ro'yxatdan tanlangan elementni ko'rsatish kerak. Birinchi xayolga keladigani — tanlangan
        obyektning o'zini saqlash:
      </p>
      <CodeBlock lang="jsx">{`const [taomlar, setTaomlar] = useState(boshlangichTaomlar)
const [tanlangan, setTanlangan] = useState(taomlar[0])   // obyektning nusxasi`}</CodeBlock>
      <p>
        Endi bitta taom ikki joyda yashaydi: <code>taomlar</code> ichida va{' '}
        <code>tanlangan</code>da. Foydalanuvchi tanlangan taom nomini tahrirlasa,{' '}
        <code>taomlar</code> yangilanadi, <code>tanlangan</code> esa eski nom bilan qoladi.
        Yechim — obyektni emas, uning <strong>id</strong>sini saqlash va obyektni hisoblash:
      </p>
      <CodeBlock lang="jsx">{`const [taomlar, setTaomlar] = useState(boshlangichTaomlar)
const [tanlanganId, setTanlanganId] = useState(boshlangichTaomlar[0].id)

const tanlangan = taomlar.find((t) => t.id === tanlanganId)`}</CodeBlock>
      <p>
        Ma'lumot bitta joyda — "yagona haqiqat manbai". Bir nechta element tanlansa ham xuddi
        shunday: obyektlar massivi emas, id'lar massivi (yoki <code>Set</code>).
      </p>

      <h2>4-qoida: bog'liq state'ni guruhlang</h2>
      <p>
        Doim birga o'zgaradigan qiymatlar — masalan, sichqoncha koordinatalari <code>x</code> va{' '}
        <code>y</code> — bitta obyektda saqlanadi, aks holda bittasini yangilab, ikkinchisini
        unutish oson:
      </p>
      <CodeBlock lang="jsx">{`// ikki alohida state — doim birga yangilash kerak
const [x, setX] = useState(0)
const [y, setY] = useState(0)

// bitta obyekt — yaxlit yangilanadi
const [joy, setJoy] = useState({ x: 0, y: 0 })
setJoy({ x: e.clientX, y: e.clientY })`}</CodeBlock>
      <p>
        Teskari holat ham bor: bir-biriga bog'liq bo'lmagan qiymatlarni bitta katta obyektga
        tiqishning foydasi yo'q — har bir yangilanishda spread yozish kerak bo'ladi. Qoida:{' '}
        <strong>birga o'zgaradigan narsalar — birga, mustaqil narsalar — alohida</strong>.
      </p>

      <h2>5-qoida: chuqur ichma-ichlikdan qoching</h2>
      <p>
        15-darsda ko'rganimizdek, 3–4 qavatli obyektni yangilash uchun har bir qavatni nusxalash
        kerak. Agar ma'lumot daraxt shaklida bo'lsa (bo'limlar ichida kategoriyalar, ular ichida
        taomlar), uni ko'pincha "tekis" qilib saqlash qulayroq: har bir element o'z{' '}
        <code>id</code>si bilan bitta ro'yxatda, ota-bola bog'lanishi esa id'lar orqali (
        <code>bolimId: 'osh'</code>). Bu ma'lumotlar bazasidagi jadvallarga o'xshaydi va
        yangilashni ancha soddalashtiradi.
      </p>

      <h2>React'da fikrlash: 5 qadam</h2>
      <p>
        Yangi ilova yoki komponent yozishda React jamoasi tavsiya qiladigan tartib — va siz
        11 va 18-darslardagi loyihalarda aynan shunday ishladingiz:
      </p>
      <ol>
        <li>
          <strong>UI'ni komponentlar daraxtiga bo'ling</strong> (1 va 11-darslar).
        </li>
        <li>
          <strong>Statik versiyani quring</strong> — faqat props bilan, hech qanday state'siz (11-dars).
        </li>
        <li>
          <strong>Minimal state'ni toping.</strong> Har bir ma'lumot uchun so'rang: vaqt o'tishi
          bilan o'zgaradimi? Props'dan keladimi? Boshqa narsadan hisoblab bo'ladimi? Faqat
          o'zgaradigan, tashqaridan kelmaydigan va hisoblab bo'lmaydigan narsa — state.
        </li>
        <li>
          <strong>State qayerda yashashini aniqlang</strong> — uni ishlatadigan barcha
          komponentlarning eng yaqin umumiy otasida (keyingi dars).
        </li>
        <li>
          <strong>Teskari oqimni qo'shing</strong> — bolalar <code>on...</code> handler'lar orqali
          ota state'ini o'zgartiradi (12 va 18-darslar).
        </li>
      </ol>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Bir nechta "bir-birini istisno qiluvchi" boolean.</strong>{' '}
            <code>yuklanmoqda</code>, <code>xato</code>, <code>tayyor</code> — bitta{' '}
            <code>holat</code> satri bilan almashtiring.
          </li>
          <li>
            <strong>Hisoblanadigan qiymatni state'da saqlash</strong> — jami summa, filtrlangan
            ro'yxat, to'liq ism, elementlar soni.
          </li>
          <li>
            <strong>Props'ni <code>useState(prop)</code> bilan nusxalash</strong> — ota yangilasa
            ham state eskicha qoladi.
          </li>
          <li>
            <strong>Tanlangan obyektning o'zini saqlash.</strong> Id'ni saqlang, obyektni{' '}
            <code>find</code> bilan oling.
          </li>
          <li>
            <strong>Hamma narsani bitta ulkan obyektga yig'ish</strong> — mustaqil qiymatlar
            uchun alohida <code>useState</code>.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="Savatcha komponentida quyidagilar bor: mahsulotlar ro'yxati, jami narx, mahsulotlar soni, chegirma kodi kiritilgan input matni. Ulardan qaysilari state bo'lishi kerak?"
        options={[
          "Faqat mahsulotlar ro'yxati va chegirma kodi matni",
          "To'rttalasi ham",
          "Faqat jami narx va mahsulotlar soni",
          "Faqat mahsulotlar ro'yxati",
        ]}
        correctIndex={0}
        explanation="Jami narx va mahsulotlar soni ro'yxatdan hisoblanadi — ular state bo'lsa, sinxronlashni unutish xavfi bor. Mahsulotlar ro'yxati va foydalanuvchi yozayotgan kod matni esa vaqt o'tishi bilan o'zgaradi va hech narsadan hisoblab bo'lmaydi — ular state."
      />

      <Quiz
        question="function Profil({ ism }) { const [joriyIsm, setJoriyIsm] = useState(ism) ... } — ota komponent ism prop'ini 'Ali'dan 'Vali'ga o'zgartirdi. Profil ekranda nimani ko'rsatadi (agar joriyIsm chizilsa)?"
        options={[
          "Ali — useState boshlang'ich qiymatni faqat birinchi renderda oladi",
          "Vali — state avtomatik yangilanadi",
          "Hech narsa — komponent xato beradi",
          "Navbat bilan ikkalasi",
        ]}
        correctIndex={0}
        explanation="useState(ism) argumenti faqat komponent birinchi marta chizilganda ishlatiladi. Keyingi renderlarda React saqlangan state'ni qaytaradi va yangi ism prop'ini e'tiborsiz qoldiradi. Shuning uchun props'ni state'ga nusxalash o'rniga to'g'ridan-to'g'ri prop'ni ishlating."
      />

      <Exercise title="1-mashq: state'ni tozalang">
        <p>
          Quyidagi komponentda keragidan ortiq state bor. Minimal state'ni qoldirib, qolganini
          hisoblanadigan qiymatlarga aylantiring. Komponent xatti-harakati o'zgarmasin.
        </p>
        <CodeBlock lang="jsx">{`function Sayohat() {
  const [joylar, setJoylar] = useState([
    { id: 1, nomi: 'Samarqand', tashrif: true },
    { id: 2, nomi: 'Buxoro', tashrif: false },
    { id: 3, nomi: 'Xiva', tashrif: false },
  ])
  const [tashrifSoni, setTashrifSoni] = useState(1)
  const [hammasiTugadi, setHammasiTugadi] = useState(false)
  const [tanlangan, setTanlangan] = useState(null)   // joy obyekti

  function handleAlmashtir(id) {
    const yangi = joylar.map((j) => (j.id === id ? { ...j, tashrif: !j.tashrif } : j))
    setJoylar(yangi)
    const soni = yangi.filter((j) => j.tashrif).length
    setTashrifSoni(soni)
    setHammasiTugadi(soni === yangi.length)
  }
  ...
}`}</CodeBlock>
        <Solution>
          <CodeBlock lang="jsx">{`function Sayohat() {
  const [joylar, setJoylar] = useState([
    { id: 1, nomi: 'Samarqand', tashrif: true },
    { id: 2, nomi: 'Buxoro', tashrif: false },
    { id: 3, nomi: 'Xiva', tashrif: false },
  ])
  const [tanlanganId, setTanlanganId] = useState(null)

  // hisoblanadi:
  const tashrifSoni = joylar.filter((j) => j.tashrif).length
  const hammasiTugadi = tashrifSoni === joylar.length
  const tanlangan = joylar.find((j) => j.id === tanlanganId) ?? null

  function handleAlmashtir(id) {
    setJoylar(joylar.map((j) => (j.id === id ? { ...j, tashrif: !j.tashrif } : j)))
  }
  ...
}`}</CodeBlock>
          <p>
            To'rtta state'dan ikkitasi qoldi. <code>tashrifSoni</code> va{' '}
            <code>hammasiTugadi</code> ro'yxatdan hisoblanadi; <code>tanlangan</code> obyekt
            o'rniga id saqlanadi — tanlangan joy tahrirlansa ham, u doim ro'yxatdagi eng yangi
            ma'lumotni ko'rsatadi. <code>handleAlmashtir</code> esa uch qatordan bitta qatorga
            qisqardi.
          </p>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: buyurtma holati">
        <p>
          Taom yetkazib berish ilovasida buyurtma holatini ko'rsatadigan komponent uchun state
          loyihalang. Buyurtma ketma-ket quyidagi bosqichlardan o'tadi: qabul qilindi →
          tayyorlanmoqda → yo'lda → yetkazildi; istalgan bosqichda u bekor qilinishi mumkin.
          Ekranda joriy bosqich nomi, progress (masalan, "2/4") va "Keyingi bosqich" tugmasi
          (yetkazilgan yoki bekor qilingan buyurtmada o'chirilgan) bo'lsin. Avval qaysi
          state'lar kerakligini yozing, keyin komponentni yozing.
        </p>
        <Solution>
          <p>
            Bitta state yetarli: <code>holat</code> satri. Progress, tugmaning faolligi va matn —
            hammasi undan hisoblanadi. Beshta boolean (<code>qabulQilindi</code>,{' '}
            <code>yolda</code>...) esa 32 kombinatsiya beradi, ulardan faqat 5 tasi ma'noli.
          </p>
          <CodeBlock lang="jsx">{`import { useState } from 'react'

const BOSQICHLAR = ['qabul', 'tayyorlanmoqda', 'yolda', 'yetkazildi']
const NOMLAR = {
  qabul: 'Qabul qilindi',
  tayyorlanmoqda: 'Tayyorlanmoqda',
  yolda: "Yo'lda",
  yetkazildi: 'Yetkazildi',
  bekor: 'Bekor qilindi',
}

export default function BuyurtmaHolati() {
  const [holat, setHolat] = useState('qabul')

  const indeks = BOSQICHLAR.indexOf(holat)          // bekor bo'lsa: -1
  const tugagan = holat === 'yetkazildi' || holat === 'bekor'

  function handleKeyingi() {
    setHolat(BOSQICHLAR[indeks + 1])
  }

  return (
    <div>
      <h3>{NOMLAR[holat]}</h3>
      {holat !== 'bekor' && <p>{indeks + 1}/{BOSQICHLAR.length}</p>}
      <button onClick={handleKeyingi} disabled={tugagan}>Keyingi bosqich</button>
      <button onClick={() => setHolat('bekor')} disabled={tugagan}>Bekor qilish</button>
    </div>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Bir-birini istisno qiluvchi boolean'lar o'rniga bitta <code>holat</code> qiymati —
          "bo'lishi mumkin bo'lmagan" holatlar yo'qoladi.
        </li>
        <li>
          Hisoblab bo'ladigan narsani state'da saqlamang; props'ni <code>useState</code>ga
          nusxalamang.
        </li>
        <li>
          Ma'lumotni takrorlamang: tanlangan obyekt o'rniga uning id'sini saqlang.
        </li>
        <li>
          Birga o'zgaradigan qiymatlarni guruhlang, chuqur ichma-ich tuzilmani tekislang.
        </li>
        <li>
          React'da fikrlash: komponentlarga bo'lish → statik versiya → minimal state → state
          joyi → teskari oqim.
        </li>
      </KeyPoints>
    </>
  )
}
