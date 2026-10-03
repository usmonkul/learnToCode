import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "O'z hook'laringizni yozish",
  section: 'Ref va effektlar',
}

export default function CustomHooksLesson() {
  return (
    <>
      <h2>Muammo: bir xil effect ikki joyda</h2>
      <p>
        Ilovada ikki komponent internet ulanishini kuzatadi: sarlavhadagi belgi va "Saqlash"
        tugmasi (oflayn bo'lsa o'chiriladi). Ikkalasida ham aynan bir xil kod:
      </p>
      <CodeBlock lang="jsx">{`function UlanishBelgisi() {
  const [onlayn, setOnlayn] = useState(navigator.onLine)

  useEffect(() => {
    function handleOnlayn() { setOnlayn(true) }
    function handleOflayn() { setOnlayn(false) }
    window.addEventListener('online', handleOnlayn)
    window.addEventListener('offline', handleOflayn)
    return () => {
      window.removeEventListener('online', handleOnlayn)
      window.removeEventListener('offline', handleOflayn)
    }
  }, [])

  return <span>{onlayn ? '🟢 Onlayn' : '🔴 Oflayn'}</span>
}

function SaqlashTugmasi() {
  const [onlayn, setOnlayn] = useState(navigator.onLine)
  useEffect(() => { /* ... xuddi shu 10 qator ... */ }, [])
  return <button disabled={!onlayn}>Saqlash</button>
}`}</CodeBlock>
      <p>
        Takrorlangan kod — takrorlangan xatolar: birida cleanup tuzatilsa, ikkinchisida unutiladi.
        Oddiy JavaScript'da takrorlangan kodni funksiyaga chiqaramiz. React'da ham xuddi shunday —
        faqat bu funksiya ichida hook'lar bor. Bunday funksiya <strong>custom hook</strong>{' '}
        (o'zingiz yozgan hook) deb ataladi:
      </p>
      <CodeBlock lang="jsx">{`function useOnlineStatus() {
  const [onlayn, setOnlayn] = useState(navigator.onLine)

  useEffect(() => {
    function handleOnlayn() { setOnlayn(true) }
    function handleOflayn() { setOnlayn(false) }
    window.addEventListener('online', handleOnlayn)
    window.addEventListener('offline', handleOflayn)
    return () => {
      window.removeEventListener('online', handleOnlayn)
      window.removeEventListener('offline', handleOflayn)
    }
  }, [])

  return onlayn
}

function UlanishBelgisi() {
  const onlayn = useOnlineStatus()
  return <span>{onlayn ? '🟢 Onlayn' : '🔴 Oflayn'}</span>
}

function SaqlashTugmasi() {
  const onlayn = useOnlineStatus()
  return <button disabled={!onlayn}>Saqlash</button>
}`}</CodeBlock>
      <p>
        Komponentlar endi <em>nima</em> kerakligini aytadi ("onlayn holat"), <em>qanday</em>{' '}
        olinishini esa hook yashiradi. Sinash uchun DevTools'da Network → "Offline" ni belgilang.
      </p>

      <h2>Custom hook — bu shunchaki oddiy funksiya</h2>
      <p>
        Custom hook — hech qanday sehrli narsa emas. Bu oddiy JavaScript funksiyasi, faqat
        ikkita shartga javob beradi: uning nomi <code>use</code> bilan boshlanadi (masalan,{' '}
        <code>useToggle</code>, <code>useLocalStorage</code>) va u o'z ichida bitta yoki bir
        nechta boshqa hook'ni chaqiradi (<code>useState</code>, <code>useEffect</code> va
        hokazo). <code>use</code> bilan boshlanishi shart — bu React'ga ham, boshqa
        dasturchilarga ham "bu funksiya ichida hook'lar chaqiriladi, uni oddiy funksiya kabi
        shartli chaqirmang" deb signal beradi.
      </p>
      <p>
        Oddiy yordamchi funksiya (masalan, <code>formatSana(sana)</code>) va custom hook
        orasidagi farq — hook chaqirish-chaqirmasligida. Ishlash vaqtida React ularni farqlay
        olmaydi: <code>use</code>siz nomlangan funksiya ham ichida <code>useState</code>{' '}
        chaqirsa, komponent render paytida uni chaqirganda ishlab ketadi. Lekin linter (
        <code>react-hooks/rules-of-hooks</code>) hook qoidalarini faqat <code>use</code> bilan
        boshlanadigan funksiyalarda tekshiradi. Nomsiz qolgan "yashirin hook"ni kimdir shart
        ichida chaqirsa, hech kim ogohlantirmaydi — natija esa runtime xatosi emas, 13-darsdagi
        kabi g'alati xatolar.
      </p>

      <h2>
        Birinchi custom hook: <code>useToggle</code>
      </h2>
      <p>
        Tasavvur qiling, ilovamizda bir nechta joyda "ochiq/yopiq" yoki "yoqilgan/o'chirilgan"
        kabi boolean state va uni almashtiruvchi funksiya kerak — modal oyna, akkordeon,
        sidebar. Har safar <code>useState(false)</code> va uni almashtiruvchi funksiyani qo'lda
        yozish o'rniga, buni bitta custom hook'ga chiqarib olamiz:
      </p>
      <CodeBlock lang="jsx">{`import { useState } from 'react'

function useToggle(boshlangichQiymat = false) {
  const [qiymat, setQiymat] = useState(boshlangichQiymat)

  function toggle() {
    setQiymat((oldingi) => !oldingi)
  }

  return [qiymat, toggle]
}`}</CodeBlock>
      <p>
        <code>useToggle</code> — <code>useState</code>ga juda o'xshaydi: u{' '}
        <code>[qiymat, funksiya]</code> juftligini qaytaradi. Farqi shundaki, u{' '}
        <code>useState</code>ning ustiga qurilgan, o'zining qo'shimcha mantig'i bilan —{' '}
        <code>toggle</code> funksiyasi qiymatni avtomatik teskarisiga o'zgartiradi, har safar
        buni qo'lda yozish shart emas. Endi buni istalgan komponentda ishlatish mumkin:
      </p>
      <CodeBlock lang="jsx">{`function Modal() {
  const [ochiq, toggleOchiq] = useToggle(false)

  return (
    <div>
      <button onClick={toggleOchiq}>{ochiq ? 'Yopish' : 'Ochish'}</button>
      {ochiq && <div className="modal">Modal mazmuni</div>}
    </div>
  )
}

function Sidebar() {
  const [kengaytirilgan, toggleKengaytirilgan] = useToggle(true)

  return (
    <aside className={kengaytirilgan ? 'yon-panel keng' : 'yon-panel tor'}>
      <button onClick={toggleKengaytirilgan}>Kichraytirish/Kattalashtirish</button>
    </aside>
  )
}`}</CodeBlock>
      <p>
        Ikkala komponent ham <code>useToggle</code>ning ichki qanday ishlashi haqida
        qayg'urmaydi — ular faqat uning API'sidan (qiymat va toggle funksiyasi) foydalanadi. Agar
        kelajakda <code>useToggle</code>ning ichki mantig'ini o'zgartirish kerak bo'lsa (masalan,
        toggle vaqtida konsolga log yozish qo'shilsa), buni bitta joyda o'zgartirish yetarli —
        uni ishlatuvchi barcha komponentlar avtomatik yangi xatti-harakatni oladi.
      </p>

      <Callout type="tip" title="Nega custom hook, oddiy funksiya emas?">
        <code>useToggle</code> ichidagi <code>useState</code> uni chaqirgan komponentning
        state'iga aylanadi — xuddi o'sha komponentda yozilgandek. Shuning uchun u faqat render
        paytida, yuqori darajada chaqirilishi kerak. <code>use</code> prefiksi shu qoidalarni
        o'quvchiga ham, linter'ga ham bildiradi: nomni ko'rgan har kim bu funksiyani shart
        ichida yoki event handler'da chaqirib bo'lmasligini biladi.
      </Callout>

      <h2>Hook mantiqni ulashadi, state'ni emas</h2>
      <p>
        Muhim nuqta: <code>Modal</code> va <code>Sidebar</code> ikkalasi <code>useToggle</code>ni
        chaqiradi, lekin ularning <code>ochiq</code> va <code>kengaytirilgan</code> qiymatlari{' '}
        <strong>butunlay mustaqil</strong>. Custom hook chaqirilganda uning ichidagi{' '}
        <code>useState</code> xuddi o'sha komponentda yozilgandek ishlaydi — har bir chaqiruvning
        o'z state'i bo'ladi. Hook — kod qismini qayta ishlatish usuli, ma'lumotni ulashish emas.
        Bir nechta komponent <em>bitta</em> state'ni ko'rishi kerak bo'lsa — state'ni ko'tarish
        (20-dars) yoki context (23-dars).
      </p>

      <h2>
        Ikkinchi misol: <code>useLocalStorage</code>
      </h2>
      <p>
        Yana bir foydali custom hook — state'ni <code>localStorage</code> bilan sinxronlab
        turadigan hook. U <code>useState</code>ga juda o'xshab ishlaydi, faqat qiymat sahifa
        yangilanganidan keyin ham saqlanib qoladi:
      </p>
      <CodeBlock lang="jsx">{`import { useState, useEffect } from 'react'

function useLocalStorage(kalit, boshlangichQiymat) {
  const [qiymat, setQiymat] = useState(() => {
    try {
      const saqlangan = localStorage.getItem(kalit)
      return saqlangan !== null ? JSON.parse(saqlangan) : boshlangichQiymat
    } catch {
      return boshlangichQiymat   // buzilgan JSON yoki xotira yopiq
    }
  })

  useEffect(() => {
    localStorage.setItem(kalit, JSON.stringify(qiymat))
  }, [kalit, qiymat])

  return [qiymat, setQiymat]
}

function Sozlamalar() {
  const [tema, setTema] = useLocalStorage('tema', 'yorug')

  return (
    <select value={tema} onChange={(e) => setTema(e.target.value)}>
      <option value="yorug">Yorug'</option>
      <option value="qorongi">Qorong'i</option>
    </select>
  )
}`}</CodeBlock>
      <p>
        Bu yerda <code>useLocalStorage</code> ikkita hook'ni — <code>useState</code> va{' '}
        <code>useEffect</code>ni — birlashtirib, ular ustiga yangi, yuqoriroq darajadagi
        xatti-harakat quradi. <code>Sozlamalar</code> komponenti esa <code>localStorage</code>{' '}
        haqida umuman bilmaydi — u faqat oddiy <code>[qiymat, setQiymat]</code> juftligidan
        foydalanadi, xuddi <code>useState</code>dan foydalangandek.
      </p>
      <p>
        <code>{'useState(() => ...)'}</code> — funksiya berilgan boshlang'ich qiymat (
        <strong>lazy initializer</strong>). Oddiy <code>useState(localStorage.getItem(...))</code>{' '}
        deb yozsak, <code>localStorage</code>dan o'qish va <code>JSON.parse</code> har renderda
        bajarilardi (natijasi esa faqat birinchisida ishlatiladi). Funksiya berilsa, React uni
        faqat birinchi renderda chaqiradi.
      </p>

      <h2>
        Uchinchi misol: <code>useFetch</code>
      </h2>
      <p>
        28-darsdagi ma'lumot yuklash kodi — yuklanish holati, xato, <code>javob.ok</code>{' '}
        tekshiruvi, poyga himoyasi — har bir so'rov uchun 25 qator. Uni hook'ga chiqaramiz:
      </p>
      <CodeBlock lang="jsx">{`import { useEffect, useState } from 'react'

export function useFetch(url) {
  const [natija, setNatija] = useState({ holat: 'yuklanmoqda', data: null, xato: null })

  useEffect(() => {
    if (!url) return
    const controller = new AbortController()

    async function yuklash() {
      try {
        const javob = await fetch(url, { signal: controller.signal })
        if (!javob.ok) throw new Error(\`Server xatosi: \${javob.status}\`)
        const data = await javob.json()
        setNatija({ holat: 'tayyor', data, xato: null })
      } catch (err) {
        if (err.name === 'AbortError') return
        setNatija({ holat: 'xato', data: null, xato: err.message })
      }
    }
    yuklash()

    return () => controller.abort()
  }, [url])

  if (!url) return { holat: 'kutilmoqda', data: null, xato: null }
  return natija
}

// ishlatish:
function Postlar({ foydalanuvchiId }) {
  const { holat, data, xato } = useFetch(
    \`https://jsonplaceholder.typicode.com/posts?userId=\${foydalanuvchiId}\`
  )

  if (holat === 'yuklanmoqda') return <p>Yuklanmoqda...</p>
  if (holat === 'xato') return <p>Xatolik: {xato}</p>
  return <ul>{data.map((p) => <li key={p.id}>{p.title}</li>)}</ul>
}`}</CodeBlock>
      <p>
        <code>url</code> bo'lmasa (masalan, qidiruv so'zi hali kiritilmagan), hook so'rov
        yubormaydi va <code>'kutilmoqda'</code> holatini qaytaradi — bu holat state emas,
        render paytida hisoblanadi. Komponent 25 qatordan 5 qatorga tushdi. <code>url</code> o'zgarganda hook o'zi qayta
        yuklaydi va eski so'rovni bekor qiladi. Bu misolda ham hook nomi va qaytaradigan qiymati
        — uning "API"si: komponentlar ichki tafsilotlarni bilmaydi.
      </p>
      <Callout type="note" title="url o'zgarganda eski ma'lumot">
        <code>url</code> o'zgarganda, yangi javob kelguncha <code>natija</code>da eski
        ma'lumot qoladi (holat <code>'tayyor'</code>). Ko'pincha bu hatto qulay — sahifa
        "sakramaydi". Yangi so'rovda darhol "yuklanmoqda" kerak bo'lsa, komponentga{' '}
        <code>{'key={url}'}</code> bering (21-dars).
      </Callout>

      <h2>
        To'rtinchi misol: <code>useDebounce</code>
      </h2>
      <p>
        Qidiruv maydoniga "osh" deb yozilsa, har bir harf uchun so'rov ketmasligi kerak: "o",
        "os", "osh" — uchta keraksiz so'rov. <strong>Debounce</strong> — qiymat o'zgarishni
        to'xtatgandan keyin ma'lum vaqt kutib, faqat oxirgisini qabul qilish:
      </p>
      <CodeBlock lang="jsx">{`import { useEffect, useState } from 'react'

export function useDebounce(qiymat, kechikish = 400) {
  const [kechiktirilgan, setKechiktirilgan] = useState(qiymat)

  useEffect(() => {
    const id = setTimeout(() => setKechiktirilgan(qiymat), kechikish)
    return () => clearTimeout(id)     // yangi harf — eski taymer bekor
  }, [qiymat, kechikish])

  return kechiktirilgan
}

// ishlatish:
const [soz, setSoz] = useState('')
const qidiruvSozi = useDebounce(soz, 500)
const { holat, data } = useFetch(qidiruvSozi ? \`/api/qidiruv?q=\${qidiruvSozi}\` : null)`}</CodeBlock>
      <p>
        Har bir harfda effect qayta ishlaydi: cleanup eski taymerni bekor qiladi, yangisi
        boshlanadi. Foydalanuvchi 500 ms yozmay tursa, taymer nihoyat ishlaydi va{' '}
        <code>kechiktirilgan</code> yangilanadi. Ikki hook — <code>useDebounce</code> va{' '}
        <code>useFetch</code> — bir-biriga ulanib, kutilgan natijani beradi: so'rov faqat
        foydalanuvchi yozib bo'lgandan keyin ketadi. Bu juftlik 31-darsdagi loyihaning asosi.
      </p>

      <h2>Hook qoidalari va ular nega bor</h2>
      <p>
        Custom hook yozganda ham, tayyor hook'larni ishlatganda ham ikkita qat'iy qoidaga rioya
        qilish kerak:
      </p>
      <p>
        <strong>1. Hook'larni faqat komponent yoki boshqa hook'ning eng yuqori darajasida
        chaqiring</strong> — shartlar (<code>if</code>), sikllar (<code>for</code>) yoki ichma-ich
        joylashgan funksiyalar ichida emas.
      </p>
      <p>
        <strong>2. Hook'larni faqat React funksional komponentlaridan yoki boshqa custom
        hook'lardan chaqiring</strong> — oddiy JavaScript funksiyalaridan yoki class
        komponentlardan emas.
      </p>
      <p>
        Bu qoidalar nega bor? React har bir hook chaqiruvini <strong>tartib (order) bo'yicha</strong>{' '}
        kuzatib boradi — u hook nomini emas, balki komponent render bo'lganda hook'lar qaysi
        ketma-ketlikda chaqirilganini eslab qoladi. Agar hook shartli ravishda chaqirilsa
        (masalan, <code>if</code> ichida), ketma-ket render'larda hook'lar soni yoki tartibi
        o'zgarib qolishi mumkin — va React qaysi state qaysi <code>useState</code> chaqiruviga
        tegishli ekanini adashtirib qo'yadi:
      </p>
      <CodeBlock lang="jsx">{`function Notogri({ shart }) {
  if (shart) {
    const [a, setA] = useState(0) // XATO: shartli chaqiruv
  }
  const [b, setB] = useState(0)
  // Agar "shart" render'lar orasida o'zgarsa, React
  // ikkinchi useState'ni noto'g'ri state bilan bog'lab qo'yishi mumkin
}`}</CodeBlock>
      <p>
        Har bir render'da bir xil sonli hook, bir xil tartibda chaqirilsa, React har bir hook
        chaqiruvini ishonchli ravishda o'zining state'iga bog'lay oladi. Shuning uchun shartli
        mantiq hook chaqiruvining <em>ichida</em> bo'lishi kerak (masalan,{' '}
        <code>if (shart) {'{ setA(0) }'}</code>), hook chaqiruvining o'zi shartli bo'lmasligi
        kerak.
      </p>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong><code>use</code>siz nom.</strong> Ichida hook chaqiradigan{' '}
            <code>getOnlineStatus()</code> — linter hook qoidalarini tekshira olmaydi, o'quvchi
            esa uni shart ichida chaqirish mumkin deb o'ylaydi.
          </li>
          <li>
            <strong>Hook chaqirmaydigan funksiyaga <code>use</code> qo'shish.</strong>{' '}
            <code>useFormatSana(sana)</code> ichida hook bo'lmasa — bu oddiy funksiya, uni{' '}
            <code>formatSana</code> deb nomlang.
          </li>
          <li>
            <strong>Hook state'ni ulashadi deb o'ylash.</strong> Ikki komponentdagi{' '}
            <code>useToggle()</code> — ikki mustaqil state.
          </li>
          <li>
            <strong>Hook'ni shart ichida chaqirish.</strong>{' '}
            <code>{'if (kerak) useFetch(url)'}</code> — xato. Hook'ga shartni parametr bilan
            bering: <code>useFetch(kerak ? url : null)</code>.
          </li>
          <li>
            <strong>Juda umumiy hook'lar.</strong> <code>useEffectOnce</code>,{' '}
            <code>useMount</code> kabi "hayot sikli" hook'lari effect'ning asl ma'nosini
            yashiradi. Yaxshi hook aniq maqsadni nomlaydi: <code>useOnlineStatus</code>,{' '}
            <code>useChatRoom</code>.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="useOnlineStatus nomli funksiya foydalanuvchi internetga ulanganmi yo'qmi ekanini kuzatish uchun ichida useState va useEffect'ni chaqiradi. Bu funksiyani oddiy yordamchi funksiya sifatida (use prefiksisiz) e'lon qilsa bo'ladimi?"
        options={[
          "Ha, chunki useState va useEffect istalgan funksiya ichida ishlaydi",
          "Yo'q — funksiya ichida boshqa hook'lar chaqirilar ekan, u custom hook hisoblanadi va nomi use bilan boshlanishi, faqat komponent yoki boshqa hook ichidan chaqirilishi kerak",
          "Ha, agar funksiya faqat bitta komponentda ishlatilsa, use prefiksi shart emas",
          "Yo'q, chunki useState va useEffect umuman birga bir funksiyada ishlatib bo'lmaydi",
        ]}
        correctIndex={1}
        explanation="Ichida boshqa hook chaqiradigan har qanday funksiya — custom hook hisoblanadi, uni ishlatish soniga yoki joyiga qaramay. use prefiksi shart, chunki u React'ga va boshqa dasturchilarga bu funksiya ichida hook qoidalariga rioya qilish kerakligini bildiradi, va u faqat komponent yoki boshqa custom hook ichidan chaqirilishi mumkin."
      />

      <Quiz
        question="Sahifada <A /> va <B /> komponentlari bor, ikkalasi ham const [ochiq, toggle] = useToggle() chaqiradi. A'dagi toggle bosilsa, B'dagi ochiq nima bo'ladi?"
        options={[
          "O'zgarmaydi — har bir hook chaqiruvining o'z state'i bor",
          "A bilan birga o'zgaradi — ular bitta hook'ni ishlatadi",
          "B qayta render bo'lib, false bo'ladi",
          "Xato — bitta hook'ni ikki komponentda ishlatib bo'lmaydi",
        ]}
        correctIndex={0}
        explanation="Custom hook — kodni qayta ishlatish usuli. Uning ichidagi useState har bir chaqiruvda alohida state yaratadi, xuddi komponentda to'g'ridan-to'g'ri yozilgandek. Umumiy state kerak bo'lsa — state'ni ko'tarish yoki context."
      />

      <Exercise title="1-mashq: useCounter">
        <p>
          <code>useCounter</code> nomli custom hook yozing. U ixtiyoriy <code>boshlangich</code>{' '}
          parametrini qabul qilsin (standart qiymati <code>0</code>) va{' '}
          <code>{'[soni, oshirish, kamaytirish, reset]'}</code> massivini qaytarsin:{' '}
          <code>soni</code> — joriy son, <code>oshirish</code> uni <code>1</code>ga oshiradi,{' '}
          <code>kamaytirish</code> — <code>1</code>ga kamaytiradi, <code>reset</code> esa uni{' '}
          <code>boshlangich</code> qiymatga qaytaradi. So'ng shu hook'ni ishlatuvchi{' '}
          <code>Hisoblagich</code> komponentini yozing.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useState } from 'react'

function useCounter(boshlangich = 0) {
  const [soni, setSoni] = useState(boshlangich)

  function oshirish() {
    setSoni((oldingi) => oldingi + 1)
  }

  function kamaytirish() {
    setSoni((oldingi) => oldingi - 1)
  }

  function reset() {
    setSoni(boshlangich)
  }

  return [soni, oshirish, kamaytirish, reset]
}

function Hisoblagich() {
  const [soni, oshirish, kamaytirish, reset] = useCounter(0)

  return (
    <div>
      <p>Son: {soni}</p>
      <button onClick={oshirish}>+1</button>
      <button onClick={kamaytirish}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: useWindowWidth">
        <p>
          <code>useWindowWidth</code> hook'ini yozing: u oynaning joriy kengligini qaytaradi va
          oyna o'lchami o'zgarganda yangilanadi (<code>resize</code> hodisasi, cleanup bilan).
          So'ng uni ikki komponentda ishlating: <code>Menyu</code> 700px dan tor ekranda "☰"
          tugmasini, kengida esa to'liq havolalar qatorini ko'rsatsin; <code>Footer</code> esa
          joriy kenglikni "Ekran: 1280px" deb ko'rsatsin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useEffect, useState } from 'react'

function useWindowWidth() {
  const [kenglik, setKenglik] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setKenglik(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return kenglik
}

function Menyu() {
  const kenglik = useWindowWidth()
  if (kenglik < 700) return <button>☰</button>
  return (
    <nav>
      <a href="#">Bosh sahifa</a> · <a href="#">Kitoblar</a> · <a href="#">Aloqa</a>
    </nav>
  )
}

function Footer() {
  const kenglik = useWindowWidth()
  return <footer>Ekran: {kenglik}px</footer>
}`}</CodeBlock>
          <p>
            Har bir komponentning o'z tinglovchisi va o'z state'i bor — hook mantiqni ulashdi,
            state'ni emas. Faqat CSS bilan hal qilinadigan narsalar uchun (masalan, faqat
            ko'rinishni o'zgartirish) media query yetarli; hook JSX'ning o'zi o'zgarishi kerak
            bo'lganda foydali.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Custom hook — nomi <code>use</code> bilan boshlanadigan va o'z ichida boshqa
          hook'larni chaqiradigan oddiy JavaScript funksiyasi.
        </li>
        <li>
          Custom hook yaratishning asosiy sababi — stateful (state bilan bog'liq) mantiqni bir
          nechta komponent orasida takrorlamasdan qayta ishlatish; nom <code>use</code> bilan
          boshlanadi, shunda linter hook qoidalarini tekshira oladi.
        </li>
        <li>
          Har bir hook chaqiruvining o'z state'i bor — hook mantiqni ulashadi, state'ni emas.
        </li>
        <li>
          Foydali naqshlar: <code>useOnlineStatus</code>, <code>useLocalStorage</code>,{' '}
          <code>useFetch</code>, <code>useDebounce</code> — hook'lar bir-biriga ulanib ishlay
          oladi.
        </li>
        <li>
          Custom hook komponentga o'xshab ishlaydi — u o'z ichida <code>useState</code>,{' '}
          <code>useEffect</code> kabi hook'larni birlashtirib, ularni chaqirgan komponentga
          soddaroq API taqdim etadi.
        </li>
        <li>
          Hook'lar faqat komponent yoki boshqa hook'ning eng yuqori darajasida chaqirilishi
          kerak — shartlar, sikllar yoki ichma-ich funksiyalar ichida emas.
        </li>
        <li>
          Bu qoida React hook'lar ketma-ketligini kuzatib borishiga asoslangan: har bir
          render'da bir xil sonli hook bir xil tartibda chaqirilsa, React har bir hook'ni
          to'g'ri state bilan bog'lay oladi.
        </li>
        <li>
          Hook'lar faqat React funksional komponentlaridan yoki boshqa custom hook'lardan
          chaqirilishi mumkin — oddiy JavaScript funksiyalaridan emas.
        </li>
      </KeyPoints>
    </>
  )
}
