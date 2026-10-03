import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "useRef: eslab qolish va DOM'ga murojaat",
  section: 'Ref va effektlar',
}

export default function UseRefLesson() {
  return (
    <>
      <h2>Muammo: to'xtatib bo'lmaydigan sekundomer</h2>
      <p>
        Sekundomer yozyapmiz. "Boshlash" bosilganda <code>setInterval</code> har 100 ms da
        vaqtni yangilaydi, "To'xtatish" esa <code>clearInterval</code> bilan uni to'xtatishi
        kerak. Buning uchun interval id'sini qayerdadir saqlash kerak:
      </p>
      <CodeBlock lang="jsx">{`function Sekundomer() {
  const [boshlanish, setBoshlanish] = useState(null)
  const [hozir, setHozir] = useState(null)
  let intervalId = null                       // oddiy o'zgaruvchi

  function handleBoshlash() {
    setBoshlanish(Date.now())
    setHozir(Date.now())
    intervalId = setInterval(() => setHozir(Date.now()), 100)
  }

  function handleToxtatish() {
    clearInterval(intervalId)                 // null! — to'xtamaydi
  }
  ...
}`}</CodeBlock>
      <p>
        Sekundomer to'xtamaydi. Sabab 13-darsdan tanish: <code>setHozir</code> komponentni
        qayta render qiladi, <code>let intervalId = null</code> yana bajariladi, va "To'xtatish"
        handler'i yangi renderdagi <code>null</code>ni ko'radi. Id'ni state'ga qo'ysak-chi? U
        saqlanadi, lekin id ekranda ko'rsatilmaydi — uni o'zgartirish keraksiz render
        chaqiradi. Bizga uchinchi narsa kerak: <strong>renderlar orasida saqlanadigan, lekin
        render chaqirmaydigan</strong> xotira. Bu — <code>useRef</code>.
      </p>

      <h2>
        <code>useRef</code> nima qaytaradi?
      </h2>
      <p>
        <code>useRef(boshlangichQiymat)</code> — bitta xususiyatga ega, o'zgaruvchan
        (mutable) obyekt qaytaradi: <code>{'{ current: boshlangichQiymat }'}</code>. Shu
        obyektning o'zi komponent renderlar orasida <strong>bir xil</strong> — aynan bitta
        nusxada — qolaveradi:
      </p>
      <CodeBlock lang="jsx">{`import { useRef } from 'react'

function Misol() {
  const sonRef = useRef(0)

  function bosildi() {
    sonRef.current = sonRef.current + 1
    console.log('Hozirgi qiymat:', sonRef.current)
  }

  return <button onClick={bosildi}>Bos</button>
}`}</CodeBlock>
      <p>
        Bu yerda <code>sonRef.current</code>ni o'zgartirish — oddiy JavaScript
        o'zgaruvchisining qiymatini o'zgartirishga o'xshaydi: hech qanday maxsus funksiya
        (masalan, <code>setSon</code> kabi) chaqirilmaydi, shunchaki{' '}
        <code>.current</code>ga to'g'ridan-to'g'ri yangi qiymat yoziladi.
      </p>

      <h2>
        Asosiy farq: <code>useRef</code> qayta render qildirmaydi
      </h2>
      <p>
        Bu — <code>useState</code> bilan solishtirganda eng muhim farq. <code>setSon(yangi)</code>{' '}
        chaqirilganda React komponentni qayta render qilishni rejalashtiradi va ekran yangi
        qiymat bilan yangilanadi. <code>sonRef.current = yangi</code> yozilganda esa — hech
        narsa qayta render bo'lmaydi, React buni umuman bilmaydi ham. Qiymat obyekt ichida
        saqlanib qoladi, lekin ekran darhol yangilanmaydi:
      </p>
      <CodeBlock lang="jsx">{`function Solishtirish() {
  const [stateSon, setStateSon] = useState(0)
  const refSon = useRef(0)

  function ikkalasiniOshir() {
    setStateSon(stateSon + 1) // komponent qayta render bo'ladi, ekran yangilanadi
    refSon.current = refSon.current + 1 // hech narsa render bo'lmaydi, ekran eskicha qoladi
  }

  console.log("Render bo'ldi, refSon.current:", refSon.current)

  return (
    <div>
      <p>State: {stateSon}</p>
      <p>Ref (ekranda eskirgan bo'lishi mumkin): {refSon.current}</p>
      <button onClick={ikkalasiniOshir}>Ikkalasini ham oshirish</button>
    </div>
  )
}`}</CodeBlock>
      <p>
        Tugma bosilganda <code>stateSon</code> ekranda darhol yangilanadi, chunki{' '}
        <code>setStateSon</code> qayta renderni ishga tushiradi. <code>refSon.current</code>{' '}
        ham xuddi shu vaqtda o'zgaradi, lekin ekrandagi{' '}
        <code>{'{refSon.current}'}</code> faqat <strong>keyingi</strong> render bo'lganda — bu
        holatda <code>stateSon</code> o'zgargani sababli sodir bo'ladigan renderda — yangi
        qiymatni ko'rsatadi. Aslida uni to'g'ridan-to'g'ri renderda ko'rsatishning o'zi noto'g'ri
        foydalanish — <code>useRef</code>ning asl vazifasi ekranga emas, "eslab qolishga"
        xizmat qilish.
      </p>

      <h2>Sekundomerni tuzatamiz</h2>
      <CodeBlock lang="jsx">{`import { useRef, useState } from 'react'

export default function Sekundomer() {
  const [boshlanish, setBoshlanish] = useState(null)
  const [hozir, setHozir] = useState(null)
  const intervalRef = useRef(null)

  function handleBoshlash() {
    setBoshlanish(Date.now())
    setHozir(Date.now())
    clearInterval(intervalRef.current)        // ikki marta bosilsa ham bitta interval
    intervalRef.current = setInterval(() => setHozir(Date.now()), 100)
  }

  function handleToxtatish() {
    clearInterval(intervalRef.current)
  }

  const otdi = boshlanish && hozir ? (hozir - boshlanish) / 1000 : 0

  return (
    <>
      <h1>{otdi.toFixed(1)} s</h1>
      <button onClick={handleBoshlash}>Boshlash</button>
      <button onClick={handleToxtatish}>To'xtatish</button>
    </>
  )
}`}</CodeBlock>
      <p>
        Ekranda ko'rinadigan narsa (<code>boshlanish</code>, <code>hozir</code>) — state.
        Faqat handler'lar uchun kerak bo'lgan, ekranga ta'sir qilmaydigan narsa (interval id) —
        ref. (Bu yerda <code>Date.now()</code> handler'larda chaqiriladi, render'da emas — 9-dars.)
      </p>

      <h2>Qoida: render paytida ref'ni o'qimang va yozmang</h2>
      <p>
        Ref o'zgarishi render chaqirmagani uchun, uning qiymatini JSX'da ko'rsatish ishonchsiz:
        ekran faqat boshqa biror sabab bilan render bo'lganda yangilanadi va ko'pincha "orqada"
        qoladi. Shuning uchun React jamoasining tavsiyasi:{' '}
        <strong><code>ref.current</code>ni faqat event handler'larda (va effect'larda, 26-dars)
        o'qing va o'zgartiring</strong>, render paytida emas. Render paytida kerak bo'lgan
        ma'lumot — state.
      </p>

      <h2>Birinchi qo'llanilishi: DOM elementiga to'g'ridan-to'g'ri murojaat</h2>
      <p>
        <code>useRef</code>ning eng keng tarqalgan ishlatilishi — biror JSX elementiga{' '}
        <code>ref</code> atributi orqali "ilova qilib", o'sha elementning haqiqiy DOM tuguniga
        to'g'ridan-to'g'ri murojaat qilish. Bu — masalan, inputga fokus qilish, elementning
        o'lchamini o'lchash yoki video pleerni boshqarish kabi ishlarda kerak bo'ladi, chunki
        bularning hech biri oddiy JSX/state orqali ifodalanmaydi:
      </p>
      <CodeBlock lang="jsx">{`import { useRef } from 'react'

function FokusliInput() {
  const inputRef = useRef(null)

  function fokusQil() {
    inputRef.current.focus()
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={fokusQil}>Inputga fokus qil</button>
    </div>
  )
}`}</CodeBlock>
      <p>
        Bu yerda <code>useRef(null)</code>ning boshlang'ich qiymati <code>null</code> qilib
        beriladi, chunki birinchi render paytida DOM elementi hali mavjud emas. React JSX'ni
        haqiqiy DOM'ga aylantirgandan keyin, <code>inputRef.current</code>ni avtomatik ravishda
        o'sha <code>{'<input>'}</code> elementining haqiqiy DOM tuguniga o'rnatadi. Shundan
        keyin, <code>fokusQil</code> funksiyasi ichida <code>inputRef.current.focus()</code>{' '}
        chaqirilsa — bu xuddi vanilla JavaScript'da{' '}
        <code>document.querySelector(...).focus()</code> yozgandek ishlaydi, faqat React
        elementni o'zi topib beradi.
      </p>
      <p>
        DOM ref'lari bilan qilinadigan odatiy ishlar: <code>focus()</code>,{' '}
        <code>scrollIntoView()</code> (ro'yxatdagi elementga aylantirish), o'lchamni o'qish (
        <code>getBoundingClientRect()</code>), <code>{'<video>'}</code>ni{' '}
        <code>play()</code>/<code>pause()</code> qilish. Bular — React'ning deklarativ
        modelidan tashqaridagi brauzer imkoniyatlari, shuning uchun ref "qochish yo'li"
        (escape hatch) deb ataladi. DOM'ni ref orqali <em>o'zgartirish</em> (elementlarni
        o'chirish, matnini almashtirish) esa React boshqaradigan narsaga aralashish bo'ladi —
        bundan saqlaning.
      </p>

      <h3>O'z komponentingizga ref uzatish</h3>
      <p>
        <code>ref</code> atributini <code>{'<input>'}</code> kabi oddiy teglarga berish mumkin.
        O'z komponentingiz ichidagi elementga murojaat kerak bo'lsa, React 19'da{' '}
        <code>ref</code>ni oddiy prop sifatida qabul qilib, kerakli elementga uzatish kifoya:
      </p>
      <CodeBlock lang="jsx">{`function QidiruvMaydoni({ ref, ...props }) {
  return <input ref={ref} className="qidiruv" {...props} />
}

export default function Sahifa() {
  const inputRef = useRef(null)
  return (
    <>
      <QidiruvMaydoni ref={inputRef} placeholder="Qidirish..." />
      <button onClick={() => inputRef.current.focus()}>🔍</button>
    </>
  )
}`}</CodeBlock>
      <p>
        Eski kodda buning uchun <code>forwardRef</code> funksiyasi ishlatilardi — internetda uni
        ko'p uchratasiz, React 19'da u endi shart emas.
      </p>

      <h2>Ikkinchi qo'llanilishi: renderlar orasida qiymat saqlash</h2>
      <p>
        <code>useRef</code>ning ikkinchi katta qo'llanilishi — DOM bilan umuman bog'liq bo'lmagan
        holda, shunchaki renderlar orasida "eslab qolinishi kerak, lekin ekranga ta'sir
        qilmaydigan" qiymatni saqlash. Klassik misol — <code>setInterval</code>dan qaytgan
        interval id'sini saqlash, keyinchalik <code>clearInterval</code> chaqirish uchun:
      </p>
      <CodeBlock lang="jsx">{`function Taymer() {
  const [ishlayapti, setIshlayapti] = useState(false)
  const intervalRef = useRef(null)

  function boshlash() {
    setIshlayapti(true)
    intervalRef.current = setInterval(() => {
      console.log('tik-tak')
    }, 1000)
  }

  function toxtatish() {
    setIshlayapti(false)
    clearInterval(intervalRef.current)
  }

  return (
    <div>
      <button onClick={boshlash} disabled={ishlayapti}>Boshlash</button>
      <button onClick={toxtatish} disabled={!ishlayapti}>To'xtatish</button>
    </div>
  )
}`}</CodeBlock>
      <p>
        <code>intervalRef.current</code>ga interval id yozilishi ekranga hech qanday ta'sir
        qilmasligi kerak — foydalanuvchi buni ko'rmaydi, u faqat <code>toxtatish</code>{' '}
        funksiyasi keyinchalik to'g'ri intervalni to'xtatishi uchun kerak. Agar bu maqsadda{' '}
        <code>useState</code> ishlatilganda edi, har safar interval id o'rnatilganda ortiqcha
        qayta render sodir bo'lardi — bu esa umuman kerak emas. (Bu misolda tik-tak faqat
        konsolga chiqadi; ekranda vaqtni ko'rsatish kerak bo'lsa — yuqoridagi sekundomerdagi
        kabi state ham kerak.)
      </p>

      <Callout type="tip" title="State va ref'ni farqlash qoidasi">
        Eslab qolishning eng oson yo'li: <strong>state</strong> — ekranda ko'rinishi kerak
        bo'lgan narsa uchun (u o'zgarsa, foydalanuvchi buni ko'rishi kerak). <strong>ref</strong>{' '}
        — ko'rinmaydigan, lekin eslab qolinishi kerak bo'lgan narsa uchun (u o'zgarsa, ekranga
        hech qanday ta'siri bo'lmasligi kerak). Agar o'zingizga "buni o'zgartirsam, ekranda
        biror narsa yangilanishi kerakmi?" deb savol bersangiz — javob "ha" bo'lsa, state;
        "yo'q" bo'lsa, ref kerak.
      </Callout>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Ekranda ko'rinadigan qiymat uchun ref.</strong> <code>ref.current</code>{' '}
            o'zgarsa ekran yangilanmaydi. Ko'rinadigan narsa — state.
          </li>
          <li>
            <strong>Render paytida <code>ref.current</code>ni ishlatish.</strong> JSX'da{' '}
            <code>{'{sonRef.current}'}</code> yoki render'da <code>inputRef.current.focus()</code>{' '}
            — birinchi renderda DOM ref hali <code>null</code>, keyinroq esa qiymat eskirgan
            bo'ladi.
          </li>
          <li>
            <strong><code>.current</code>ni unutish.</strong> <code>inputRef.focus()</code> —{' '}
            "is not a function" xatosi. To'g'risi <code>inputRef.current.focus()</code>.
          </li>
          <li>
            <strong>DOM'ni ref orqali o'zgartirish.</strong>{' '}
            <code>listRef.current.innerHTML = ''</code> — React o'zi boshqaradigan elementni
            buzadi va keyingi render'da xatolar paydo bo'ladi. Ref — fokus, aylantirish, o'lchash
            uchun.
          </li>
          <li>
            <strong>Oddiy <code>let</code> o'zgaruvchi bilan id saqlash</strong> — har renderda
            qayta e'lon qilinadi. Renderlar orasida saqlash kerak bo'lsa — <code>useRef</code>.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="Tugma bosilganda handler'da bosishlarRef.current += 1 qilinadi va JSX'da {bosishlarRef.current} ko'rsatiladi. Komponentda boshqa state yo'q. Uch marta bosilgandan keyin ekranda nima turadi?"
        options={['0', '3', '1', '6']}
        correctIndex={0}
        explanation="ref.current o'zgarishi qayta render chaqirmaydi. Komponent boshqa sababdan render bo'lmagani uchun ekran birinchi renderdagi 0 ni ko'rsatishda davom etadi, garchi ref ichida 3 bo'lsa ham. Ko'rinadigan qiymat — state bo'lishi kerak."
      />

      <Quiz
        question="Quyidagilardan qaysi biri useRef uchun to'g'ri tanlov EMAS?"
        options={[
          "Savatchadagi mahsulotlar soni (sarlavhada ko'rsatiladi)",
          "setTimeout'dan qaytgan id (keyin bekor qilish uchun)",
          "Input DOM elementi (fokus berish uchun)",
          "Oxirgi marta yuborilgan so'rov vaqti (ekranda ko'rsatilmaydi)",
        ]}
        correctIndex={0}
        explanation="Mahsulotlar soni ekranda ko'rsatiladi — u o'zgarganda ekran yangilanishi kerak, demak bu state (yoki state'dan hisoblanadigan qiymat). Qolgan uchtasi ekranga ta'sir qilmaydi: ular ref uchun mos."
      />

      <Exercise title="1-mashq: avto-fokus">
        <p>
          <code>AvtoFokusForma</code> nomli komponent yozing: unda bitta matnli{' '}
          <code>{'<input>'}</code> va bitta <code>{'<button>'}</code> bo'lsin. Tugma
          bosilganda, <code>useRef</code> yordamida saqlangan inputga fokus tushsin (ya'ni
          foydalanuvchi kursor shu inputga tushganini ko'rsin). <code>useState</code>dan
          foydalanmang — bu vazifa faqat <code>useRef</code> bilan yechiladi.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useRef } from 'react'

function AvtoFokusForma() {
  const inputRef = useRef(null)

  function fokusTushir() {
    inputRef.current.focus()
  }

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Shu yerga yozing..." />
      <button onClick={fokusTushir}>Inputga o'tish</button>
    </div>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: chatda pastga aylantirish">
        <p>
          Chat oynasi: xabarlar ro'yxati (balandligi cheklangan, <code>overflow-y: auto</code>),
          pastda input va "Yuborish". Yangi xabar yuborilganda input tozalansin va fokusda
          qolsin. Qo'shimcha: ro'yxat ustida "Eng yangisiga" tugmasi bo'lsin — u oxirgi xabarga
          silliq aylantirsin (<code>{"scrollIntoView({ behavior: 'smooth' })"}</code>).
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useRef, useState } from 'react'

export default function Chat() {
  const [xabarlar, setXabarlar] = useState([
    { id: 1, matn: 'Salom!' },
    { id: 2, matn: 'Darsga tayyormisan?' },
  ])
  const [matn, setMatn] = useState('')
  const inputRef = useRef(null)
  const oxirgiRef = useRef(null)

  function handleYuborish(e) {
    e.preventDefault()
    if (!matn.trim()) return
    setXabarlar([...xabarlar, { id: crypto.randomUUID(), matn: matn.trim() }])
    setMatn('')
    inputRef.current.focus()
  }

  function handlePastga() {
    oxirgiRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <button onClick={handlePastga}>Eng yangisiga ↓</button>
      <ul style={{ height: 160, overflowY: 'auto' }}>
        {xabarlar.map((x, i) => (
          <li key={x.id} ref={i === xabarlar.length - 1 ? oxirgiRef : null}>
            {x.matn}
          </li>
        ))}
      </ul>
      <form onSubmit={handleYuborish}>
        <input ref={inputRef} value={matn} onChange={(e) => setMatn(e.target.value)} />
        <button type="submit">Yuborish</button>
      </form>
    </div>
  )
}`}</CodeBlock>
          <p>
            Ikki ref — ikki DOM element: input (fokus uchun) va oxirgi xabar (aylantirish uchun).
            Ref faqat handler'larda ishlatiladi. Yangi xabar kelganda <em>avtomatik</em>{' '}
            pastga aylantirish esa "render tugagandan keyin" qilinadigan ish — buni keyingi
            darsdagi effect bilan qilamiz.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>useRef(boshlangichQiymat)</code> — bitta <code>current</code> xususiyatiga ega,
          o'zgaruvchan (mutable) obyekt qaytaradi; renderlar orasida bu doim aynan o'sha bitta
          obyekt bo'lib qoladi.
        </li>
        <li>
          <code>ref.current</code>ni o'zgartirish — <code>useState</code>dan farqli o'laroq —
          komponentni qayta render qildirmaydi; ekran darhol yangilanmaydi.
        </li>
        <li>
          Birinchi asosiy qo'llanilish — JSX elementiga <code>ref</code> atributi orqali
          "ilova qilib", uning haqiqiy DOM tuguniga to'g'ridan-to'g'ri murojaat qilish
          (masalan, <code>inputRef.current.focus()</code>).
        </li>
        <li>
          Ikkinchi asosiy qo'llanilish — renderlar orasida saqlanishi kerak, lekin
          o'zgarganda ekranga ta'sir qilmasligi kerak bo'lgan qiymatlarni ushlab turish
          (masalan, <code>setInterval</code>dan qaytgan id).
        </li>
        <li>
          <code>ref.current</code>ni render paytida emas, handler'larda (va effect'larda) o'qing
          va yozing; React 19'da <code>ref</code> o'z komponentlaringizga oddiy prop bo'lib
          uzatiladi.
        </li>
        <li>
          Oddiy qoida: state — ekranda ko'rinishi kerak bo'lgan narsa uchun; ref — ko'rinmaydigan,
          lekin eslab qolinishi kerak bo'lgan narsa uchun.
        </li>
      </KeyPoints>
    </>
  )
}
