import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'useRef va DOM bilan ishlash',
  section: 'Effektlar va hooklar',
}

export default function UseRefAndDomLesson() {
  return (
    <>
      <p>
        <code>useState</code> — komponentda "ekranda ko'rinishi kerak bo'lgan" qiymatlarni
        saqlash uchun ishlatiladi: uni o'zgartirsangiz, komponent qayta render bo'ladi va yangi
        qiymat ekranga chiqadi. Lekin har doim ham shunday emas — ba'zan komponentga renderlar
        orasida "eslab qoladigan" qiymat kerak bo'ladi-yu, lekin o'sha qiymat o'zgarganda ekranni
        qayta chizishning hojati bo'lmaydi. Aynan shu vazifa uchun React'da boshqa bir hook bor —{' '}
        <code>useRef</code>.
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
        qayta render sodir bo'lardi — bu esa umuman kerak emas.
      </p>

      <Callout type="tip" title="State va ref'ni farqlash qoidasi">
        Eslab qolishning eng oson yo'li: <strong>state</strong> — ekranda ko'rinishi kerak
        bo'lgan narsa uchun (u o'zgarsa, foydalanuvchi buni ko'rishi kerak). <strong>ref</strong>{' '}
        — ko'rinmaydigan, lekin eslab qolinishi kerak bo'lgan narsa uchun (u o'zgarsa, ekranga
        hech qanday ta'siri bo'lmasligi kerak). Agar o'zingizga "buni o'zgartirsam, ekranda
        biror narsa yangilanishi kerakmi?" deb savol bersangiz — javob "ha" bo'lsa, state;
        "yo'q" bo'lsa, ref kerak.
      </Callout>

      <Quiz
        question="Komponent ichida const renderSoni = useRef(0) yaratilgan, va har render bo'lganda renderSoni.current + 1 qilinadi (useEffect ichida, dependency arraysiz). Bu qiymat komponentning JSX qismida {renderSoni.current} deb chiqarilsa, u foydalanuvchi ko'z oldida qanday yangilanadi?"
        options={[
          "Har o'zgarishda darhol, chunki useRef ham useState kabi qayta renderni ishga tushiradi",
          "Ekranda ko'rinadigan qiymat har doim bir render \"orqada qoladi\", chunki ref o'zgarishi qayta renderni ishga tushirmaydi",
          "Umuman ko'rinmaydi, chunki useRef qiymatlari JSX ichida ishlatilmaydi",
          "React bu yozuvni build vaqtida xato deb hisoblaydi",
        ]}
        correctIndex={1}
        explanation={`useRef.current ning o'zgarishi qayta renderni ishga tushirmaydi. Shu sababli renderSoni.current effekt ichida yangilansa ham, ekranda ko'rsatilgan {renderSoni.current} faqat boshqa bir sabab (masalan, biror state o'zgarishi) tufayli komponent qayta render bo'lgandagina yangi qiymatni ko'rsatadi — doim bir qadam "orqada" bo'lib qoladi.`}
      />

      <Exercise>
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

      <KeyPoints>
        <li>
          <code>useRef(boshlangichQiymat)</code> — bitta <code>current</code> xususiyatiga ega,
          o'zgaruvchan (mutable) obyekt qaytaradi; bu obyekt komponent renderlar orasida bir
          xil, o'zgarmas nusxada saqlanadi.
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
          (masalan, oldingi qiymat yoki <code>setInterval</code>dan qaytgan id).
        </li>
        <li>
          Oddiy qoida: state — ekranda ko'rinishi kerak bo'lgan narsa uchun; ref — ko'rinmaydigan,
          lekin eslab qolinishi kerak bo'lgan narsa uchun.
        </li>
      </KeyPoints>
    </>
  )
}
