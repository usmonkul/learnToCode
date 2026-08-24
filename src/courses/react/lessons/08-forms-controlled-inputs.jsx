import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Formalar va controlled inputlar',
  section: 'State va interaktivlik',
}

export default function FormsControlledInputsLesson() {
  return (
    <>
      <p>
        Oldingi darsda <code>onChange</code> orqali inputdagi matnni qanday o'qishni ko'rgan
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
        yerda ham oldingi darsda ko'rgan qoida qaytadan ishlaydi: obyekt state'i mutatsiya
        qilinmaydi, har safar yangi obyekt yaratiladi.
      </p>

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
        handleri biriktiriladi. Bu handler tugma bosilganda emas — foydalanuvchi{' '}
        <kbd>Enter</kbd> bossa ham, <code>{'<button type="submit">'}</code>ni bossa ham — ishga
        tushadi. Lekin brauzerning standart xatti-harakati forma yuborilganda sahifani{' '}
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
      <Callout type="warning" title="preventDefault()ni unutmang">
        Agar <code>onSubmit</code> handlerida <code>e.preventDefault()</code>ni chaqirishni
        unutsangiz, forma yuborilishi bilan sahifa to'liq qayta yuklanadi — bu esa React
        ilovasini "qayta ishga tushirilgandek" qilib qo'yadi va barcha state yo'qoladi. Bu —
        formalar bilan ishlashda eng ko'p uchraydigan xatolardan biri.
      </Callout>

      <Callout type="note" title="Uncontrolled inputlar haqida qisqacha">
        React'da yana bir usul bor — <strong>uncontrolled (boshqarilmaydigan) input</strong>,
        unda qiymat state emas, <code>useRef</code> orqali to'g'ridan-to'g'ri DOM elementidan
        o'qiladi. Bu usul ba'zi holatlarda (masalan, fayl yuklash inputlarida) foydali, lekin
        bu kursda biz faqat controlled yondashuvga e'tibor qaratamiz — <code>useRef</code>ni
        keyingi bo'limda boshqa maqsadlar uchun ko'rib chiqamiz.
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

      <Exercise title="Mashq">
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
          Uncontrolled (<code>useRef</code> orqali) inputlar ham mavjud, lekin bu kursda
          controlled yondashuvga e'tibor qaratiladi.
        </li>
      </KeyPoints>
    </>
  )
}
