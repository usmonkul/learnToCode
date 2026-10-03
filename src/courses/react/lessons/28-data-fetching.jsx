import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import Figure from '@/components/content/Figure'
import fetchRace from '@/assets/fetch-race.svg'

export const meta = {
  title: "Serverdan ma'lumot olish",
  section: 'Ref va effektlar',
}

export default function DataFetchingLesson() {
  return (
    <>
      <h2>Muammo: brauzer serverga yuzlab so'rov yuboryapti</h2>
      <p>
        Shu paytgacha barcha ma'lumot faylda edi. Haqiqiy ilovada esa u serverdan keladi. Birinchi
        urinish — <code>fetch</code>ni to'g'ridan-to'g'ri komponentda chaqirish:
      </p>
      <CodeBlock lang="jsx">{`function Foydalanuvchilar() {
  const [royxat, setRoyxat] = useState([])

  fetch('https://jsonplaceholder.typicode.com/users')
    .then((javob) => javob.json())
    .then((data) => setRoyxat(data))

  return <ul>{royxat.map((f) => <li key={f.id}>{f.name}</li>)}</ul>
}`}</CodeBlock>
      <p>
        DevTools'ning Network tabini oching — so'rovlar to'xtovsiz ketyapti. Render{' '}
        <code>fetch</code> qiladi → javob <code>setRoyxat</code> qiladi → yangi render → yana{' '}
        <code>fetch</code>... Bu 9-darsdagi qoidaning buzilishi: render paytida side effect.
        Server bilan sinxronlash — effect'ning ishi (26-dars). Lekin "shunchaki effect'ga
        o'rash" ham yetarli emas: yuklanish va xato holatlari, eskirgan javoblar, sekin tarmoq —
        bularni ham o'ylash kerak. Bu dars shu haqda.
      </p>

      <h2>Effect ichida fetch</h2>
      <p>
        Mashq uchun bepul test API'dan foydalanamiz —{' '}
        <a href="https://jsonplaceholder.typicode.com">JSONPlaceholder</a>: u soxta
        foydalanuvchilar, postlar va izohlarni JSON ko'rinishida qaytaradi.
      </p>
      <CodeBlock lang="jsx">{`import { useEffect, useState } from 'react'

export default function Foydalanuvchilar() {
  const [royxat, setRoyxat] = useState([])

  useEffect(() => {
    async function yuklash() {
      const javob = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await javob.json()
      setRoyxat(data)
    }
    yuklash()
  }, [])                     // bir marta — sahifa ochilganda

  return (
    <ul>
      {royxat.map((f) => (
        <li key={f.id}>{f.name}</li>
      ))}
    </ul>
  )
}`}</CodeBlock>
      <p>
        E'tibor bering: effect funksiyasining o'zi <code>async</code> emas. Effect faqat
        cleanup funksiyasini (yoki hech narsa) qaytarishi mumkin, <code>async</code> funksiya esa
        doim Promise qaytaradi. Shuning uchun ichida alohida <code>async</code> funksiya e'lon
        qilib, uni darhol chaqiramiz.
      </p>

      <h2>Yuklanish, xato va ma'lumot</h2>
      <p>
        Tarmoq sekin bo'lishi yoki umuman ishlamasligi mumkin. Foydalanuvchi bo'sh ekranga
        qarab "ilova buzilgan" deb o'ylamasligi uchun so'rovning har bir holatini ko'rsatish
        kerak. 19-darsdagi qoida: uchta boolean emas, bitta <code>holat</code>:
      </p>
      <CodeBlock lang="jsx">{`export default function Foydalanuvchilar() {
  const [holat, setHolat] = useState('yuklanmoqda')   // 'yuklanmoqda' | 'xato' | 'tayyor'
  const [royxat, setRoyxat] = useState([])
  const [xato, setXato] = useState(null)

  useEffect(() => {
    async function yuklash() {
      try {
        const javob = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!javob.ok) {
          throw new Error(\`Server xatosi: \${javob.status}\`)
        }
        const data = await javob.json()
        setRoyxat(data)
        setHolat('tayyor')
      } catch (err) {
        setXato(err.message)
        setHolat('xato')
      }
    }
    yuklash()
  }, [])

  if (holat === 'yuklanmoqda') return <p>Yuklanmoqda...</p>
  if (holat === 'xato') return <p className="xato">Xatolik: {xato}</p>
  if (royxat.length === 0) return <p>Hech kim topilmadi.</p>

  return (
    <ul>
      {royxat.map((f) => (
        <li key={f.id}>{f.name}</li>
      ))}
    </ul>
  )
}`}</CodeBlock>
      <ul>
        <li>
          <strong><code>javob.ok</code>ni tekshiring.</strong> <code>fetch</code> faqat tarmoq
          umuman ishlamaganda xato beradi. Server 404 yoki 500 qaytarsa ham, Promise muvaffaqiyatli
          bajariladi — xatoni o'zimiz "tashlashimiz" kerak.
        </li>
        <li>
          <strong>To'rt xil ekran:</strong> yuklanmoqda, xato, bo'sh natija va ma'lumot. Bo'sh
          natija ham xato emas — u alohida xabarga loyiq.
        </li>
        <li>
          Erta <code>return</code>lar (7-dars) har bir holatni alohida, o'qishga qulay qiladi.
        </li>
      </ul>

      <h2>Parametrga bog'liq so'rov va poyga holati</h2>
      <p>
        Endi foydalanuvchi tanlanadi va uning postlari yuklanadi. So'rov{' '}
        <code>foydalanuvchiId</code>ga bog'liq — u dependency:
      </p>
      <CodeBlock lang="jsx">{`function Postlar({ foydalanuvchiId }) {
  const [postlar, setPostlar] = useState([])

  useEffect(() => {
    async function yuklash() {
      const javob = await fetch(
        \`https://jsonplaceholder.typicode.com/posts?userId=\${foydalanuvchiId}\`
      )
      setPostlar(await javob.json())
    }
    yuklash()
  }, [foydalanuvchiId])
  ...
}`}</CodeBlock>
      <p>
        Bu kodda yashirin xato bor. Foydalanuvchi avval 1-ni, darhol keyin 2-ni tanladi. Ikki
        so'rov parallel ketdi. Agar 1-so'rov sekinroq bo'lsa, uning javobi <em>keyinroq</em>{' '}
        keladi va ekranda 2-tanlangan bo'lsa ham 1-ning postlari qoladi:
      </p>
      <Figure
        src={fetchRace}
        alt="Vaqt chizig'i: id 1 uchun uzun so'rov, keyin id 2 uchun qisqa so'rov. 2-javob avval keladi va ekranda to'g'ri ma'lumot; keyin 1-javob kelib, uni noto'g'ri ma'lumot bilan almashtiradi."
        caption="1-rasm: poyga holati (race condition) — eski javob yangisining ustiga yoziladi"
      />
      <p>
        Bu <strong>poyga holati</strong> (race condition). Yechim — 27-darsdagi cleanup:
        "effect qayta ishga tushsa, eski so'rovning javobini e'tiborsiz qoldir":
      </p>
      <CodeBlock lang="jsx">{`useEffect(() => {
  let eskirdi = false

  async function yuklash() {
    const javob = await fetch(
      \`https://jsonplaceholder.typicode.com/posts?userId=\${foydalanuvchiId}\`
    )
    const data = await javob.json()
    if (!eskirdi) {
      setPostlar(data)
    }
  }
  yuklash()

  return () => {
    eskirdi = true
  }
}, [foydalanuvchiId])`}</CodeBlock>
      <p>
        Har bir effect ishga tushishining o'z <code>eskirdi</code> o'zgaruvchisi bor.{' '}
        <code>foydalanuvchiId</code> o'zgarganda eski effect'ning cleanup'i <em>o'sha</em>{' '}
        effect'ning bayrog'ini <code>true</code> qiladi — uning javobi kelsa ham, state'ga
        yozilmaydi. StrictMode'dagi "effect → cleanup → effect" ham shu bilan muammosiz o'tadi:
        birinchi so'rovning javobi e'tiborsiz qoldiriladi.
      </p>

      <h3>AbortController: so'rovni haqiqatan bekor qilish</h3>
      <p>
        Bayroq javobni e'tiborsiz qoldiradi, lekin so'rov baribir oxirigacha yuklanadi. Brauzerning{' '}
        <code>AbortController</code>i esa so'rovni tarmoq darajasida to'xtatadi:
      </p>
      <CodeBlock lang="jsx">{`useEffect(() => {
  const controller = new AbortController()

  async function yuklash() {
    try {
      const javob = await fetch(
        \`https://jsonplaceholder.typicode.com/posts?userId=\${foydalanuvchiId}\`,
        { signal: controller.signal }
      )
      setPostlar(await javob.json())
    } catch (err) {
      if (err.name === 'AbortError') return   // bekor qilingan — bu xato emas
      setXato(err.message)
    }
  }
  yuklash()

  return () => controller.abort()
}, [foydalanuvchiId])`}</CodeBlock>
      <p>
        <code>abort()</code> chaqirilganda <code>fetch</code> <code>AbortError</code> bilan
        tugaydi — uni oddiy xatolardan ajratib, e'tiborsiz qoldirish kerak. Ikkala usul ham
        to'g'ri; AbortController sekin internetda keraksiz trafikni ham tejaydi.
      </p>

      <h2>Effect emas, handler kerak bo'lgan holatlar</h2>
      <p>
        Hamma so'rov ham effect'da bo'lmaydi. Qoida: <strong>so'rov nima uchun
        yuboriladi?</strong>
      </p>
      <ul>
        <li>
          <strong>Komponent ekranda ko'ringani uchun</strong> (sahifa ochildi, tanlangan id
          o'zgardi) — ma'lumotni ekran bilan sinxronlash, effect.
        </li>
        <li>
          <strong>Foydalanuvchi biror narsa qilgani uchun</strong> (forma yubordi, "Saqlash"
          bosdi, sharh qo'shdi) — bu hodisa, so'rov handler ichida yuboriladi.
        </li>
      </ul>
      <CodeBlock lang="jsx">{`async function handleSubmit(e) {
  e.preventDefault()
  setHolat('yuborilmoqda')
  const javob = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: sarlavha, body: matn, userId: 1 }),
  })
  setHolat(javob.ok ? 'yuborildi' : 'xato')
}`}</CodeBlock>

      <Callout type="note" title="Haqiqiy loyihalarda">
        Effect ichida fetch — ishlaydigan va tushunish uchun eng muhim usul. Lekin katta
        ilovalarda uning kamchiliklari seziladi: javoblar keshlanmaydi (sahifaga qaytsangiz,
        hammasi qaytadan yuklanadi), sahifalar orasida ma'lumotni ulashish qiyin. Shuning uchun
        amalda ko'pincha <strong>TanStack Query</strong> kabi kutubxonalar yoki framework'larning
        o'z vositalari ishlatiladi — ular aynan shu darsdagi muammolarni hal qiladi. Ularni{' '}
        <code>react-advanced</code> kursida o'rganamiz; avval qo'lda qanday ishlashini bilish
        shart.
      </Callout>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Render ichida fetch</strong> — cheksiz so'rovlar sikli. Faqat effect yoki
            handler.
          </li>
          <li>
            <strong><code>useEffect(async () =&gt; ...)</code>.</strong> Effect Promise
            qaytaradi — React ogohlantiradi va cleanup ishlamaydi. Ichida alohida{' '}
            <code>async</code> funksiya yozing.
          </li>
          <li>
            <strong><code>javob.ok</code>ni tekshirmaslik.</strong> 404 sahifasining HTML'ini{' '}
            <code>.json()</code> qilishga urinish "Unexpected token &lt;" xatosini beradi.
          </li>
          <li>
            <strong>Dependency'ni unutish.</strong> URL'da <code>foydalanuvchiId</code>{' '}
            ishlatilsa-yu, u array'da bo'lmasa — boshqa foydalanuvchi tanlanganda yangi so'rov
            ketmaydi.
          </li>
          <li>
            <strong>Poyga holatini e'tiborsiz qoldirish.</strong> Parametrga bog'liq har bir
            so'rovda <code>eskirdi</code> bayrog'i yoki AbortController.
          </li>
          <li>
            <strong>Faqat muvaffaqiyatli holatni chizish.</strong> Yuklanish va xato holatlarisiz
            foydalanuvchi bo'sh ekranga qaraydi.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="fetch('/api/kitob/999') chaqirildi, server 404 qaytardi. try/catch ichida await fetch(...) qatoridan keyin nima bo'ladi?"
        options={[
          "fetch muvaffaqiyatli tugaydi, javob.ok === false; xatoni o'zimiz tekshirishimiz kerak",
          "fetch darhol xato tashlaydi va catch blokiga o'tiladi",
          "fetch null qaytaradi",
          "Brauzer sahifani 404 sahifasiga yo'naltiradi",
        ]}
        correctIndex={0}
        explanation="fetch faqat tarmoq xatosida (internet yo'q, server topilmadi) reject bo'ladi. HTTP xato kodlari (404, 500) ham 'javob' hisoblanadi: Promise muvaffaqiyatli, lekin javob.ok false va javob.status 404. Shuning uchun if (!javob.ok) throw ... yoziladi."
      />

      <Quiz
        question="Qidiruv sahifasida natijalar qidiruv so'ziga qarab effect ichida yuklanadi. Foydalanuvchi 'react' deb yozib, tezda 'reactjs'ga o'zgartirdi. 'react' so'rovi sekinroq javob berdi. Cleanup'da hech narsa qilinmagan bo'lsa, ekranda nima qoladi?"
        options={[
          "'react' natijalari — u oxirgi kelgan javob",
          "'reactjs' natijalari — u oxirgi yuborilgan so'rov",
          "Ikkalasining natijalari aralash",
          "Hech narsa — React ikkala javobni ham bekor qiladi",
        ]}
        correctIndex={0}
        explanation="Har bir javob kelganda setState qilinadi. 'react' javobi keyinroq kelgani uchun u 'reactjs' natijalarining ustiga yoziladi — ekranda qidiruv qatoridagi so'zga mos kelmaydigan natijalar qoladi. Cleanup'dagi bayroq yoki AbortController buning oldini oladi."
      />

      <Exercise title="1-mashq: foydalanuvchilar ro'yxati">
        <p>
          <code>https://jsonplaceholder.typicode.com/users</code> manzilidan foydalanuvchilar
          ro'yxatini yuklang va har birining ismi (<code>name</code>), emaili va shahri (
          <code>address.city</code>) bilan kartochka chiqaring. Yuklanish, xato va bo'sh
          holatlarni ko'rsating. Xato holatini sinash uchun URL'ni ataylab buzing (masalan,{' '}
          <code>/userz</code>). Qo'shimcha: xato holatida "Qayta urinish" tugmasi bo'lsin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useEffect, useState } from 'react'

export default function Foydalanuvchilar() {
  const [holat, setHolat] = useState('yuklanmoqda')
  const [royxat, setRoyxat] = useState([])
  const [xato, setXato] = useState(null)
  const [urinish, setUrinish] = useState(0)   // o'zgarsa — effect qayta ishlaydi

  useEffect(() => {
    let eskirdi = false

    async function yuklash() {
      try {
        const javob = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!javob.ok) throw new Error(\`Server xatosi: \${javob.status}\`)
        const data = await javob.json()
        if (!eskirdi) {
          setRoyxat(data)
          setHolat('tayyor')
        }
      } catch (err) {
        if (!eskirdi) {
          setXato(err.message)
          setHolat('xato')
        }
      }
    }
    yuklash()

    return () => {
      eskirdi = true
    }
  }, [urinish])

  if (holat === 'yuklanmoqda') return <p>Yuklanmoqda...</p>
  if (holat === 'xato') {
    return (
      <div>
        <p>Xatolik: {xato}</p>
        <button
          onClick={() => {
            setHolat('yuklanmoqda')
            setUrinish(urinish + 1)
          }}
        >
          Qayta urinish
        </button>
      </div>
    )
  }
  if (royxat.length === 0) return <p>Foydalanuvchilar yo'q.</p>

  return (
    <div className="kartalar">
      {royxat.map((f) => (
        <div key={f.id} className="karta">
          <h3>{f.name}</h3>
          <p>{f.email}</p>
          <p>{f.address.city}</p>
        </div>
      ))}
    </div>
  )
}`}</CodeBlock>
          <p>
            "Qayta urinish" uchun <code>urinish</code> hisoblagichi dependency qilib qo'yildi:
            uni oshirish effect'ni qaytadan ishga tushiradi. "Yuklanmoqda" holatiga qaytish esa
            handler'da — effect boshida sinxron <code>setHolat</code> chaqirish ortiqcha render
            beradi va ESLint'ning yangi versiyalari bu haqda ogohlantiradi.
          </p>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: foydalanuvchi va uning postlari">
        <p>
          1-mashqni kengaytiring: foydalanuvchi kartasi bosilganda u tanlansin, yonda esa uning
          postlari (<code>/posts?userId=ID</code>) ko'rsatilsin. Postlar yuklanayotganda
          "Postlar yuklanmoqda..." yozuvi chiqsin. Poyga holatidan AbortController bilan
          himoyalaning. Tekshirish uchun DevTools'da Network → "Slow 4G" rejimini yoqib, tez-tez
          turli foydalanuvchilarni bosing — ekrandagi postlar doim oxirgi tanlanganniki bo'lishi
          kerak.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`function Postlar({ foydalanuvchiId }) {
  const [holat, setHolat] = useState('yuklanmoqda')
  const [postlar, setPostlar] = useState([])

  useEffect(() => {
    const controller = new AbortController()

    async function yuklash() {
      try {
        const javob = await fetch(
          \`https://jsonplaceholder.typicode.com/posts?userId=\${foydalanuvchiId}\`,
          { signal: controller.signal }
        )
        if (!javob.ok) throw new Error(\`Server xatosi: \${javob.status}\`)
        setPostlar(await javob.json())
        setHolat('tayyor')
      } catch (err) {
        if (err.name === 'AbortError') return
        setHolat('xato')
      }
    }
    yuklash()

    return () => controller.abort()
  }, [foydalanuvchiId])

  if (holat === 'yuklanmoqda') return <p>Postlar yuklanmoqda...</p>
  if (holat === 'xato') return <p>Postlarni yuklab bo'lmadi.</p>

  return (
    <ul>
      {postlar.map((p) => (
        <li key={p.id}>
          <strong>{p.title}</strong>
        </li>
      ))}
    </ul>
  )
}

// Foydalanuvchilar komponentida:
// const [tanlanganId, setTanlanganId] = useState(null)
// kartaga: onClick={() => setTanlanganId(f.id)}
// yonida: {tanlanganId && <Postlar key={tanlanganId} foydalanuvchiId={tanlanganId} />}`}</CodeBlock>
          <p>
            <code>Postlar</code> alohida komponent — o'z holati va o'z effect'i bilan. Ota
            komponent faqat "qaysi foydalanuvchi" ekanini biladi. Eski so'rov{' '}
            <code>abort()</code> qilinadi, shuning uchun uning javobi hech qachon state'ga
            yozilmaydi. <code>{'key={tanlanganId}'}</code> (21-dars) esa boshqa foydalanuvchi
            tanlanganda <code>Postlar</code>ni noldan yaratadi — <code>holat</code> o'zi{' '}
            <code>'yuklanmoqda'</code>ga qaytadi va eski postlar bir lahza ham ko'rinmaydi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Komponent ko'ringani uchun kerak bo'lgan ma'lumot — effect ichida yuklanadi;
          foydalanuvchi harakati sababli yuboriladigan so'rov — handler'da.
        </li>
        <li>
          Effect funksiyasi <code>async</code> bo'lmaydi — ichida alohida <code>async</code>{' '}
          funksiya yozib, uni chaqiring.
        </li>
        <li>
          Har bir so'rovning to'rt holati: yuklanmoqda, xato, bo'sh, tayyor — bitta{' '}
          <code>holat</code> state'i bilan; <code>javob.ok</code>ni doim tekshiring.
        </li>
        <li>
          Parametrga bog'liq so'rovlarda poyga holati bor: cleanup'da <code>eskirdi</code>{' '}
          bayrog'i yoki <code>AbortController</code> bilan eski javobni e'tiborsiz qoldiring.
        </li>
        <li>
          Katta ilovalarda keshlash va ulashish uchun TanStack Query kabi vositalar
          ishlatiladi — <code>react-advanced</code> kursida.
        </li>
      </KeyPoints>
    </>
  )
}
