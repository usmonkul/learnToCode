import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Formalar va boshqariladigan inputlar",
  section: 'Interaktivlik',
}

export default function FormsLesson() {
  return (
    <>
      <h2>Muammo: input'dagi qiymat qayerda?</h2>
      <p>
        Buyurtma formasini tasavvur qiling: ism, telefon, manzil, porsiyalar soni, izoh. "Yuborish"
        bosilganda bularning hammasini bitta obyektga yig'ish, tekshirish ("telefon kiritilmadi"),
        xato bo'lsa — tugmani o'chirib qo'yish, muvaffaqiyatli bo'lsa — formani tozalash kerak.
        Oddiy HTML'da qiymat input'ning o'zida, brauzer ichida yashaydi va har safar uni
        DOM'dan "so'rab olish" kerak. React'da esa qiymat state'da bo'lsa, bularning hammasi
        oddiy JavaScript'ga aylanadi.
      </p>
      <p>
        12-darsda <code>onChange</code> orqali inputdagi matnni qanday o'qishni ko'rgan
        edik. Endi bu bilimni to'liq forma qurishga qo'llaymiz — foydalanuvchi ma'lumot
        kiritadigan, tanlaydigan va yuboradigan interfeyslar. React'da bunday elementlar bilan
        ishlashning standart usuli — <strong>controlled component (boshqariladigan
        komponent)</strong> naqshi deb ataladi.
      </p>

      <h2>Controlled input naqshi nima?</h2>
      <p>
        Oddiy HTML'da <code>{'<input>'}</code> o'zining qiymatini o'zi, brauzer ichida
        saqlaydi — siz uni o'qish uchun DOM'ga murojaat qilishingiz kerak bo'ladi. React'da esa
        boshqacha yondashuv qo'llaniladi: inputning <code>value</code> atributi to'g'ridan-to'g'ri
        state'ga bog'lanadi, va har bir bosilgan harf <code>onChange</code> orqali o'sha
        state'ni yangilaydi:
      </p>
      <CodeBlock lang="jsx">{`import { useState } from 'react'

function IsmInputi() {
  const [ism, setIsm] = useState('')

  function handleChange(e) {
    setIsm(e.target.value)
  }

  return (
    <div>
      <input value={ism} onChange={handleChange} />
      <p>Salom, {ism || 'notanish odam'}!</p>
    </div>
  )
}`}</CodeBlock>
      <p>
        Bu yerda <code>input</code>ning ko'rinadigan matni endi brauzer emas, balki{' '}
        <code>ism</code> state'i tomonidan boshqariladi — shu sababli bunday input{' '}
        <strong>controlled (boshqariladigan)</strong> deb ataladi. Foydalanuvchi harf
        bosganda voqealar zanjiri quyidagicha bo'ladi: brauzer <code>onChange</code>ni ishga
        tushiradi → <code>handleChange</code> yangi matnni <code>e.target.value</code>dan
        o'qib, <code>setIsm</code> orqali state'ga yozadi → komponent qayta render bo'ladi →{' '}
        <code>input</code>ning <code>value</code> atributi yangilangan <code>ism</code>ni
        oladi. Natijada inputda ko'ringan matn har doim aynan state'dagi qiymatga teng bo'ladi.
      </p>
      <Callout type="tip" title="Nega aynan shunday qilinadi?">
        Bu naqsh <strong>"yagona haqiqat manbai" (single source of truth)</strong> deb ataladigan
        printsipni amalga oshiradi: inputning qiymati faqat bitta joyda — React state'ida —
        yashaydi, DOM esa shunchaki o'sha qiymatning aksi (ko'zgusi). Shu tufayli istalgan
        vaqtda <code>ism</code> qiymatini kod ichida o'qish, tekshirish (validatsiya qilish)
        yoki boshqa joyga (masalan, boshqa komponentga) uzatish oddiy va bashorat qilinadigan
        bo'ladi — DOM'ning o'zidan "so'rashning" hojati yo'q.
      </Callout>

      <h2>Bir nechta inputni bitta state obyekti bilan boshqarish</h2>
      <p>
        Formada odatda bir nechta input bo'ladi. Har biriga alohida <code>useState</code>{' '}
        yozish ham mumkin, lekin ko'p input bo'lganda bu tez noqulay bo'lib qoladi. Buning
        o'rniga barcha maydonlarni bitta obyekt ichida saqlab, umumiy bitta handler yozish
        ancha qulay — bu yerda <code>e.target.name</code> qaysi maydon o'zgarganini bildiradi:
      </p>
      <CodeBlock lang="jsx">{`function RoyxatdanOtishFormasi() {
  const [malumot, setMalumot] = useState({ ism: '', email: '' })

  function handleChange(e) {
    const { name, value } = e.target
    setMalumot(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form>
      <input name="ism" value={malumot.ism} onChange={handleChange} />
      <input name="email" value={malumot.email} onChange={handleChange} />
    </form>
  )
}`}</CodeBlock>
      <p>
        Har bir <code>input</code>ga <code>name</code> atributi berilgan — <code>"ism"</code>{' '}
        va <code>"email"</code>. <code>handleChange</code> ichida{' '}
        <code>e.target.name</code> orqali qaysi input o'zgarganini bilib olamiz, va{' '}
        <code>{'{ ...prev, [name]: value }'}</code> yozuvi — <strong>computed property
        name (hisoblangan xossa nomi)</strong> — spread bilan avvalgi barcha maydonlarni
        saqlab qolgan holda, faqat o'sha bitta maydonni yangi qiymat bilan almashtiradi. Bu
        yerda ham 15-darsdagi qoida ishlaydi: obyekt state'i mutatsiya qilinmaydi, har safar
        yangi obyekt yaratiladi.
      </p>

      <h2>Textarea, select va radio</h2>
      <p>
        React boshqa forma elementlarini ham bir xil shaklga keltirgan — hammasida{' '}
        <code>value</code> + <code>onChange</code>:
      </p>
      <CodeBlock lang="jsx">{`// textarea — HTML'dagidek ichiga matn emas, value atributi
<textarea name="izoh" value={forma.izoh} onChange={handleChange} />

// select — tanlangan variant select'ning o'zidagi value orqali
<select name="taom" value={forma.taom} onChange={handleChange}>
  <option value="osh">Osh</option>
  <option value="manti">Manti</option>
  <option value="lagmon">Lag'mon</option>
</select>

// radio — har biri o'z value'si bilan, checked esa taqqoslashdan
<label>
  <input type="radio" name="tolov" value="naqd"
    checked={forma.tolov === 'naqd'} onChange={handleChange} />
  Naqd
</label>
<label>
  <input type="radio" name="tolov" value="karta"
    checked={forma.tolov === 'karta'} onChange={handleChange} />
  Karta
</label>`}</CodeBlock>
      <p>
        Uchalasi ham <code>name</code> atributiga ega, shuning uchun yuqoridagi bitta{' '}
        <code>handleChange</code> ularning hammasiga ishlaydi.
      </p>

      <h3>Sonlar satr bo'lib keladi</h3>
      <p>
        <code>{'<input type="number">'}</code> bo'lsa ham, <code>e.target.value</code> doim{' '}
        <strong>satr</strong>: <code>"3"</code>, <code>3</code> emas. Hisob-kitobdan oldin uni
        songa aylantiring, aks holda <code>"3" + 1 = "31"</code> bo'ladi (5-darsdagi tuzoq):
      </p>
      <CodeBlock lang="jsx">{`<input
  type="number"
  min="1"
  value={porsiya}
  onChange={(e) => setPorsiya(Number(e.target.value))}
/>`}</CodeBlock>

      <h2>Checkbox — <code>checked</code> va <code>e.target.checked</code></h2>
      <p>
        Matn inputlari <code>value</code>/<code>e.target.value</code> juftligidan foydalansa,
        checkbox butunlay boshqacha ishlaydi — uning qiymati matn emas, balki boolean. Shu
        sababli <code>value</code> o'rniga <code>checked</code>, <code>e.target.value</code>{' '}
        o'rniga esa <code>e.target.checked</code> ishlatiladi:
      </p>
      <CodeBlock lang="jsx">{`function ObunaCheckbox() {
  const [obunaBolgan, setObunaBolgan] = useState(false)

  function handleChange(e) {
    setObunaBolgan(e.target.checked)
  }

  return (
    <label>
      <input type="checkbox" checked={obunaBolgan} onChange={handleChange} />
      Yangiliklar bulletiniga obuna bo'lish
    </label>
  )
}`}</CodeBlock>
      <p>
        Agar <code>e.target.value</code>ni ishlatishga urinsangiz, checkbox har doim bir xil
        matn (odatda <code>"on"</code>) qaytaradi — chunki bu uning haqiqiy holatini emas,
        balki HTML atributining qiymatini bildiradi. Checkbox belgilangan yoki belgilanmaganini
        bilish uchun har doim <code>e.target.checked</code> kerak.
      </p>

      <h2>Forma yuborish: <code>onSubmit</code> va <code>preventDefault()</code></h2>
      <p>
        Forma <code>{'<form>'}</code> teg ichiga joylashtirilib, unga <code>onSubmit</code>{' '}
        handleri biriktiriladi. Bu handler faqat <code>{'<button type="submit">'}</code>{' '}
        bosilganda emas, input ichida <kbd>Enter</kbd> bosilganda ham ishga tushadi. Lekin brauzerning standart xatti-harakati forma yuborilganda sahifani{' '}
        <strong>to'liq qayta yuklash</strong>, bu esa React ilovasidagi barcha state'ni
        yo'qotib qo'yadi. Shu sababli deyarli har doim <code>e.preventDefault()</code>{' '}
        chaqiriladi:
      </p>
      <CodeBlock lang="jsx">{`function OddiyForma() {
  const [ism, setIsm] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    console.log('Yuborilgan ism:', ism)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={ism} onChange={(e) => setIsm(e.target.value)} />
      <button type="submit">Yuborish</button>
    </form>
  )
}`}</CodeBlock>
      <p>
        <code>e.preventDefault()</code> chaqirilishi bilan brauzer sahifani qayta yuklamaydi,
        va biz forma ma'lumotini xohlagancha, React'ning o'zida — masalan, boshqa state'ga
        yozib, serverga yuborib yoki ekranda ko'rsatib — qayta ishlashimiz mumkin bo'ladi.
      </p>
      <h2>Tekshirish (validatsiya) va formani tozalash</h2>
      <p>
        Xatolar ro'yxatini alohida state'da saqlash shart emas — u forma qiymatlaridan har
        renderda <strong>hisoblanadi</strong>. State'da faqat "foydalanuvchi yuborishga
        urindimi" degan bayroq saqlanadi, toki xatolar yozishni boshlashdan oldin qizarib
        chiqmasin:
      </p>
      <CodeBlock lang="jsx">{`const BOSH_FORMA = { ism: '', telefon: '' }

export default function BuyurtmaFormasi() {
  const [forma, setForma] = useState(BOSH_FORMA)
  const [urindi, setUrindi] = useState(false)
  const [yuborildi, setYuborildi] = useState(false)

  // hisoblanadigan qiymatlar — state emas
  const xatolar = {}
  if (forma.ism.trim() === '') xatolar.ism = 'Ismni kiriting'
  if (!/^\\+?\\d{9,12}$/.test(forma.telefon)) xatolar.telefon = "Telefon noto'g'ri"
  const yaroqli = Object.keys(xatolar).length === 0

  function handleChange(e) {
    setForma({ ...forma, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setUrindi(true)
    if (!yaroqli) return

    console.log('Yuborildi:', forma)   // haqiqiy ilovada — serverga (28-dars)
    setForma(BOSH_FORMA)               // formani tozalash
    setUrindi(false)
    setYuborildi(true)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="ism" value={forma.ism} onChange={handleChange} placeholder="Ism" />
      {urindi && xatolar.ism && <p className="xato">{xatolar.ism}</p>}

      <input name="telefon" value={forma.telefon} onChange={handleChange} placeholder="+998..." />
      {urindi && xatolar.telefon && <p className="xato">{xatolar.telefon}</p>}

      <button type="submit" disabled={urindi && !yaroqli}>Buyurtma berish</button>
      {yuborildi && <p>Rahmat! Buyurtmangiz qabul qilindi.</p>}
    </form>
  )
}`}</CodeBlock>
      <ul>
        <li>
          <code>xatolar</code> va <code>yaroqli</code> state emas — forma o'zgarishi bilan ular
          o'zi qayta hisoblanadi va hech qachon formadan "orqada qolmaydi".
        </li>
        <li>
          Formani tozalash — state'ni boshlang'ich obyektga qaytarish: controlled input'lar uni
          darhol aks ettiradi.
        </li>
        <li>
          Bitta handler'da uchta setter — 14-darsdagi batching tufayli bitta render.
        </li>
        <li>
          Brauzerning o'z tekshiruvi ham bor (<code>required</code>, <code>{'type="email"'}</code>,{' '}
          <code>min</code>) — oddiy holatlar uchun yetarli va uni React bilan birga ishlatish mumkin.
        </li>
      </ul>

      <Callout type="note" title="Uncontrolled inputlar haqida qisqacha">
        React'da yana bir usul bor — <strong>uncontrolled (boshqarilmaydigan) input</strong>,
        unda qiymat state emas, <code>useRef</code> orqali to'g'ridan-to'g'ri DOM elementidan
        o'qiladi. Bu usul ba'zi holatlarda (masalan, fayl yuklash inputlarida) foydali, lekin
        bu kursda asosan controlled yondashuvni ishlatamiz. <code>useRef</code>ni 25-darsda
        ko'ramiz. (React 19'da formalar uchun yangi "Actions" imkoniyati ham paydo bo'ldi —
        uni <code>react-advanced</code> kursida o'rganamiz.)
      </Callout>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong><code>value</code> bor, <code>onChange</code> yo'q.</strong> Input "qotib"
            qoladi — yozib bo'lmaydi, konsolda esa "You provided a `value` prop to a form field
            without an `onChange` handler" ogohlantirishi. Yoki <code>onChange</code> qo'shing,
            yoki faqat boshlang'ich qiymat kerak bo'lsa — <code>defaultValue</code>.
          </li>
          <li>
            <strong><code>undefined</code> bilan boshlash.</strong>{' '}
            <code>useState()</code> (qiymatsiz) yoki obyektda maydon yo'q bo'lsa,{' '}
            <code>value</code> avval <code>undefined</code>, keyin satr bo'ladi — "changing an
            uncontrolled input to be controlled" ogohlantirishi. Doim <code>''</code> bilan
            boshlang.
          </li>
          <li>
            <strong><code>preventDefault()</code>ni unutish.</strong> Sahifa qayta yuklanadi va
            barcha state yo'qoladi.
          </li>
          <li>
            <strong>Checkbox'da <code>e.target.value</code>.</strong> Doim <code>"on"</code>{' '}
            qaytaradi; to'g'risi — <code>e.target.checked</code>.
          </li>
          <li>
            <strong>Sonni satr sifatida hisoblash.</strong> <code>e.target.value</code> — doim
            satr; <code>Number(...)</code> bilan aylantiring.
          </li>
          <li>
            <strong>Xatolarni alohida state'da sinxronlash.</strong> Forma o'zgarganda xatolarni
            ham "yangilashni" unutish oson — ularni har renderda hisoblang.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="Forma onSubmit handlerida e.preventDefault() chaqirilmasa, forma yuborilganda nima sodir bo'ladi?"
        options={[
          "Brauzer sahifani to'liq qayta yuklaydi, va shu bilan React ilovasidagi barcha state yo'qoladi",
          "Hech narsa o'zgarmaydi, chunki React preventDefault()ni avtomatik chaqiradi",
          "Forma umuman yuborilmaydi, chunki React uni bloklab qo'yadi",
          "Faqat konsolga ogohlantirish (warning) chiqadi, boshqa hech qanday ta'sir bo'lmaydi",
        ]}
        correctIndex={0}
        explanation="Forma yuborilishining brauzer standart xatti-harakati — sahifani to'liq qayta yuklash. e.preventDefault() chaqirilmasa, bu standart xatti-harakat ishga tushib, sahifa qayta yuklanadi va React ilovasidagi barcha state (shu jumladan formaga kiritilgan ma'lumotlar) yo'qoladi."
      />

      <Quiz
        question="Komponentda const [ism, setIsm] = useState('') va <input value={ism} /> bor, lekin onChange yo'q. Foydalanuvchi yozmoqchi bo'lsa nima bo'ladi?"
        options={[
          "Input'ga hech narsa yozilmaydi, konsolda onChange yo'qligi haqida ogohlantirish chiqadi",
          "Matn yoziladi va ism state'i avtomatik yangilanadi",
          "Matn yoziladi, lekin ism state'i o'zgarmaydi",
          "Komponent xato bilan to'xtaydi",
        ]}
        correctIndex={0}
        explanation="value={ism} input'ni state'ga qattiq bog'laydi: React har renderda uning qiymatini '' ga qaytaradi. onChange bo'lmagani uchun state hech qachon o'zgarmaydi — input faqat o'qish uchun bo'lib qoladi."
      />

      <Exercise title="1-mashq: ro'yxatdan o'tish">
        <p>
          <code>RoyxatdanOtish</code> nomli komponent yozing — kichik ro'yxatdan o'tish
          formasi. U bitta obyekt state saqlasin:{' '}
          <code>{'{ ism: "", email: "" }'}</code>. Formada ikkita controlled{' '}
          <code>{'<input>'}</code> bo'lsin (<code>name="ism"</code> va{' '}
          <code>name="email"</code>), ikkalasi ham bitta umumiy <code>handleChange</code>{' '}
          funksiyasidan foydalansin (<code>e.target.name</code> orqali). Forma{' '}
          <code>onSubmit</code> handleriga ega bo'lsin — u{' '}
          <code>e.preventDefault()</code>ni chaqirib, to'plangan{' '}
          <code>malumot</code> obyektini konsolga chiqarsin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useState } from 'react'

function RoyxatdanOtish() {
  const [malumot, setMalumot] = useState({ ism: '', email: '' })

  function handleChange(e) {
    const { name, value } = e.target
    setMalumot(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log("Yuborilgan ma'lumot:", malumot)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="ism" value={malumot.ism} onChange={handleChange} placeholder="Ismingiz" />
      <input name="email" value={malumot.email} onChange={handleChange} placeholder="Email" />
      <button type="submit">Ro'yxatdan o'tish</button>
    </form>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: stol band qilish">
        <p>
          Restoranda stol band qilish formasini yozing: ism (matn), mehmonlar soni (son, 1–12),
          vaqt (<code>select</code>: 18:00, 19:00, 20:00), joy (radio: "Zal" yoki "Ayvon") va
          "Tug'ilgan kun" (checkbox). Talablar:
        </p>
        <ul>
          <li>Bitta obyekt state va bitta umumiy <code>handleChange</code> (checkbox ham, son ham shu handler orqali).</li>
          <li>Ism bo'sh bo'lsa, yuborishga urinishdan keyin xato chiqsin.</li>
          <li>
            Muvaffaqiyatli yuborilganda forma o'rniga xulosa chiqsin: "Aziz, 4 kishi, 19:00, ayvonda
            🎂".
          </li>
        </ul>
        <Solution>
          <CodeBlock lang="jsx">{`import { useState } from 'react'

const BOSH = { ism: '', mehmonlar: 2, vaqt: '19:00', joy: 'zal', tugilganKun: false }

export default function StolBand() {
  const [forma, setForma] = useState(BOSH)
  const [urindi, setUrindi] = useState(false)
  const [natija, setNatija] = useState(null)

  const ismXato = forma.ism.trim() === ''

  function handleChange(e) {
    const { name, type, value, checked } = e.target
    let yangi = value
    if (type === 'checkbox') yangi = checked
    if (type === 'number') yangi = Number(value)
    setForma({ ...forma, [name]: yangi })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setUrindi(true)
    if (ismXato) return
    setNatija(forma)
  }

  if (natija) {
    return (
      <p>
        {natija.ism}, {natija.mehmonlar} kishi, {natija.vaqt},{' '}
        {natija.joy === 'ayvon' ? 'ayvonda' : 'zalda'} {natija.tugilganKun && '🎂'}
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="ism" value={forma.ism} onChange={handleChange} placeholder="Ism" />
      {urindi && ismXato && <p className="xato">Ismni kiriting</p>}

      <input type="number" name="mehmonlar" min="1" max="12"
        value={forma.mehmonlar} onChange={handleChange} />

      <select name="vaqt" value={forma.vaqt} onChange={handleChange}>
        <option value="18:00">18:00</option>
        <option value="19:00">19:00</option>
        <option value="20:00">20:00</option>
      </select>

      <label>
        <input type="radio" name="joy" value="zal"
          checked={forma.joy === 'zal'} onChange={handleChange} /> Zal
      </label>
      <label>
        <input type="radio" name="joy" value="ayvon"
          checked={forma.joy === 'ayvon'} onChange={handleChange} /> Ayvon
      </label>

      <label>
        <input type="checkbox" name="tugilganKun"
          checked={forma.tugilganKun} onChange={handleChange} /> Tug'ilgan kun
      </label>

      <button type="submit">Band qilish</button>
    </form>
  )
}`}</CodeBlock>
          <p>
            <code>handleChange</code> <code>e.target.type</code>ga qarab qiymatni to'g'ri turga
            keltiradi: checkbox — boolean, son — <code>Number</code>, qolganlari — satr.
            (Kamchiligi: son maydoni tozalansa, <code>Number('')</code> 0 beradi — maydonni
            butunlay bo'shatib bo'lmaydi. Buni oldini olish uchun qiymatni satr holida saqlab,
            faqat yuborishda songa aylantirish mumkin.){' '}
            <code>tugilganKun && '🎂'</code>da chap tomon boolean, shuning uchun "false" yoki
            "0" chiqib qolmaydi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Controlled input — <code>value</code>si React state'iga bog'langan, o'zgarishi{' '}
          <code>onChange</code> orqali o'sha state'ni yangilaydigan input; DOM shu bilan
          state'ning aksiga aylanadi ("yagona haqiqat manbai" printsipi).
        </li>
        <li>
          Bir nechta inputni bitta obyekt state va umumiy handler bilan boshqarish mumkin —{' '}
          <code>e.target.name</code> qaysi maydon o'zgarganini, <code>e.target.value</code>{' '}
          esa yangi qiymatni bildiradi.
        </li>
        <li>
          Checkbox <code>value</code> emas, <code>checked</code> atributidan va{' '}
          <code>e.target.value</code> emas, <code>e.target.checked</code>dan foydalanadi.
        </li>
        <li>
          Forma <code>onSubmit</code> handlerida <code>e.preventDefault()</code> chaqirilmasa,
          brauzer sahifani to'liq qayta yuklaydi va React state'i yo'qoladi.
        </li>
        <li>
          Obyekt state'ini yangilaganda ham mutatsiya emas, spread orqali yangi obyekt yaratish
          qoidasi amal qiladi: <code>{'{ ...prev, [name]: value }'}</code>.
        </li>
        <li>
          <code>textarea</code> va <code>select</code> ham <code>value</code> +{' '}
          <code>onChange</code>; radio — <code>{"checked={qiymat === 'x'}"}</code>;{' '}
          <code>e.target.value</code> doim satr.
        </li>
        <li>
          Xatolar va "yaroqli"lik state'da saqlanmaydi — forma qiymatlaridan har renderda
          hisoblanadi; formani tozalash — state'ni boshlang'ich obyektga qaytarish.
        </li>
      </KeyPoints>
    </>
  )
}
