import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Custom hook yaratish',
  section: 'State boshqaruvi naqshlari',
}

export default function CustomHooksLesson() {
  return (
    <>
      <p>
        Hozirgacha <code>useState</code>, <code>useEffect</code>, <code>useRef</code> va{' '}
        <code>useReducer</code> kabi React'ning tayyor hook'laridan foydalanib keldik. Lekin
        ko'pincha bir xil stateful (state bilan bog'liq) mantiq bir nechta turli komponentlarda
        takrorlanadi — masalan, bir nechta joyda "ochiq/yopiq" holatini boshqarish, yoki bir
        nechta joyda ma'lumotni <code>localStorage</code>da saqlash. Bunday holatlarda o'zimiz{' '}
        <strong>custom hook</strong> (maxsus hook) yozib, shu mantiqni bitta joyga jamlab, qayta
        ishlatishimiz mumkin.
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
        orasidagi asosiy farq shunda: oddiy funksiya hech qanday hook chaqira olmaydi — agar u{' '}
        <code>useState</code>ni ichida chaqirsa, React xato beradi, chunki React hook'larni
        faqat komponent yoki boshqa hook ichidan chaqirilishini kutadi. Custom hook esa aynan
        shu — hook'larni chaqirishga ruxsat berilgan, qayta ishlatiladigan funksiya.
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
    <aside className={kengaytirilgan ? 'w-64' : 'w-16'}>
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
        Agar <code>useToggle</code>ni oddiy funksiya sifatida yozmoqchi bo'lsak-chi? Bu ishlamaydi
        — chunki u ichida <code>useState</code>ni chaqiradi, va bu chaqiruv aynan shu funksiyani
        chaqirgan komponentning render jarayoniga bog'lanishi kerak. Custom hook — bu React'ga
        "men shu komponentning state'i bilan ishlayapman" deb aytishning yagona yo'li. Shuning
        uchun stateful mantiqni qayta ishlatish uchun har doim custom hook kerak bo'ladi, oddiy
        funksiya emas.
      </Callout>

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
    const saqlangan = localStorage.getItem(kalit)
    return saqlangan !== null ? JSON.parse(saqlangan) : boshlangichQiymat
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

      <Exercise title="Mashq">
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

      <KeyPoints>
        <li>
          Custom hook — nomi <code>use</code> bilan boshlanadigan va o'z ichida boshqa
          hook'larni chaqiradigan oddiy JavaScript funksiyasi.
        </li>
        <li>
          Custom hook yaratishning asosiy sababi — stateful (state bilan bog'liq) mantiqni bir
          nechta komponent orasida takrorlamasdan qayta ishlatish; oddiy yordamchi funksiya
          buni qila olmaydi, chunki u hook chaqira olmaydi.
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
