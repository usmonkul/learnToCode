import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import Figure from '@/components/content/Figure'
import renderCommit from '@/assets/render-commit.svg'
import stateSnapshot from '@/assets/state-snapshot.svg'

export const meta = {
  title: "React qanday render qiladi: state — surat",
  section: 'Interaktivlik',
}

export default function RenderAndCommitLesson() {
  return (
    <>
      <h2>Muammo: "+3" tugmasi faqat 1 qo'shadi</h2>
      <p>
        13-darsdagi hisoblagichga "+3" tugmasini qo'shdik. Mantiq oddiy — uch marta bittadan
        qo'shamiz:
      </p>
      <CodeBlock lang="jsx">{`function Hisoblagich() {
  const [soni, setSoni] = useState(0)

  function handleUchta() {
    setSoni(soni + 1)
    setSoni(soni + 1)
    setSoni(soni + 1)
    console.log(soni)   // 0 ?!
  }

  return <button onClick={handleUchta}>{soni} (+3)</button>
}`}</CodeBlock>
      <p>
        Bosamiz — ekranda <strong>1</strong>. Konsolda esa — <strong>0</strong>, garchi
        setter'ni allaqachon uch marta chaqirgan bo'lsak ham. Bu xato emas: React aynan shunday
        ishlashi kerak. Buni tushunish uchun React ekranni qanday yangilashini bosqichma-bosqich
        ko'rib chiqamiz. Bu dars kursdagi eng "nazariy" darslardan biri, lekin keyingi barcha
        mavzular — obyektlar, massivlar, formalar, effektlar — shu modelga tayanadi.
      </p>

      <h2>Uch bosqich: trigger, render, commit</h2>
      <p>
        Restoranni tasavvur qiling: komponentlar — oshpazlar, React esa — ofitsiant. Ofitsiant
        buyurtmani oladi (trigger), oshpazlar taomni tayyorlaydi (render), ofitsiant uni
        stolga olib boradi (commit). Ekranda biror narsa o'zgarishi uchun har doim shu uch
        bosqich o'tadi:
      </p>
      <Figure
        src={renderCommit}
        alt="To'rtta quti strelkalar bilan: 1. Trigger (setSoni yoki birinchi ochilish), 2. Render (komponent chaqiriladi), 3. Commit (DOM'ga faqat farq yoziladi), keyin Paint (brauzer chizadi)."
        caption="1-rasm: state o'zgarishidan ekrangacha bo'lgan yo'l"
      />
      <ol>
        <li>
          <strong>Trigger (sabab).</strong> Render ikki holatda boshlanadi: ilova birinchi
          ochilganda (<code>createRoot(...).render(...)</code>, 2-dars) yoki biror komponentning
          state'i setter orqali o'zgarganda. Setter "buyurtma" beradi, lekin hech narsani darhol
          o'zgartirmaydi.
        </li>
        <li>
          <strong>Render (chizish).</strong> React komponent funksiyasini chaqiradi va u qaytargan
          JSX'ni hisoblaydi. Birinchi safar — butun daraxtni, keyingi safarlar — state'i o'zgargan
          komponentni va uning ichidagi barcha komponentlarni (9-darsdagi render daraxti). Bu
          bosqichda DOM'ga hali hech narsa tegmaydi — shuning uchun render sof bo'lishi kerak.
        </li>
        <li>
          <strong>Commit (yozish).</strong> React yangi JSX'ni oldingi render natijasi bilan
          solishtiradi va DOM'ga <strong>faqat farq qilgan joylarni</strong> yozadi. Agar render
          natijasi avvalgisi bilan bir xil bo'lsa, DOM'ga umuman tegilmaydi.
        </li>
      </ol>
      <p>
        Shundan keyin brauzer o'zgargan sahifani ekranga chizadi (paint). Muhim xulosa:{' '}
        <strong>"render" — ekranni chizish emas, komponent funksiyasini chaqirish</strong>.
        Komponent ko'p marta render bo'lishi, DOM esa shunda ham bir marta ham o'zgarmasligi
        mumkin.
      </p>
      <Callout type="tip" title="O'zingiz ko'ring">
        Komponent tanasining boshiga <code>{"console.log('render', soni)"}</code> qo'shing. Har
        bir bosishda log chiqadi (StrictMode'da ikki marta) — bu render. React DevTools'da
        "Highlight updates when components render" sozlamasini yoqsangiz, qayta chizilgan
        komponentlar ekranda bir lahza ramka bilan belgilanadi.
      </Callout>

      <h2>State — har bir render uchun surat</h2>
      <p>
        Endi muammoga qaytamiz. Kalit g'oya: <strong>state — oddiy o'zgaruvchi emas, u
        surat</strong> (snapshot). React komponentni chaqirganda, o'sha render uchun state'ning
        qiymatini "suratga oladi" va beradi. <code>soni</code> — o'sha renderda doim{' '}
        <code>0</code> bo'lgan oddiy <code>const</code>. Shu render paytida yaratilgan barcha
        narsalar — JSX ham, event handler'lar ham — aynan shu suratni ko'radi.
      </p>
      <p>
        <code>setSoni(soni + 1)</code> joriy suratni o'zgartirmaydi. U React'ga "keyingi render
        uchun <code>soni</code>ni <code>1</code> qil" deb buyurtma beradi. Shuning uchun
        handler'imiz ichida:
      </p>
      <CodeBlock lang="jsx">{`// bu renderda soni = 0
setSoni(soni + 1)   // setSoni(0 + 1) — "keyingi safar 1 bo'lsin"
setSoni(soni + 1)   // setSoni(0 + 1) — "keyingi safar 1 bo'lsin"
setSoni(soni + 1)   // setSoni(0 + 1) — "keyingi safar 1 bo'lsin"
console.log(soni)   // 0 — surat o'zgarmagan`}</CodeBlock>
      <Figure
        src={stateSnapshot}
        alt="Chap qutida 1-render surati: soni 0, uchta setSoni(soni + 1) ham 0 + 1 ni hisoblaydi. O'ng qutida 2-render: soni 1."
        caption="2-rasm: bitta renderdagi barcha kod bir xil state suratini ko'radi"
      />
      <p>
        Surat vaqt o'tsa ham o'zgarmaydi. Masalan, handler'da taymer qo'ysak:
      </p>
      <CodeBlock lang="jsx">{`function handleClick() {
  setSoni(soni + 5)
  setTimeout(() => {
    alert(soni)   // 0 — 3 soniyadan keyin ham!
  }, 3000)
}`}</CodeBlock>
      <p>
        <code>alert</code> 3 soniyadan keyin, ekranda allaqachon 5 turganda ishlaydi — lekin u{' '}
        <strong>0</strong> ko'rsatadi, chunki taymer funksiyasi bosish paytidagi render
        suratida yaratilgan. Bu React'ni oldindan aytib bo'ladigan qiladi: handler qachon tugashidan
        qat'i nazar, u bosilgan paytdagi ma'lumot bilan ishlaydi.
      </p>

      <h2>Batching: yangilanishlar to'planadi</h2>
      <p>
        React setter chaqiruvlarini darhol bajarmaydi. U handler'dagi <strong>barcha</strong>{' '}
        kod tugashini kutadi, so'ng to'plangan barcha state o'zgarishlarini birga qo'llab,{' '}
        <strong>bitta</strong> render qiladi. Bu <strong>batching</strong> (to'plab bajarish) deb
        ataladi — xuddi ofitsiant har bir taomni alohida oshxonaga tashimay, butun buyurtmani
        yozib olib, keyin bir yo'la berishi kabi.
      </p>
      <CodeBlock lang="jsx">{`function handleTozalash() {
  setIsm('')
  setTelefon('')
  setXatolar([])
  // uchta setter — lekin faqat BITTA render
}`}</CodeBlock>
      <p>
        Batching tufayli foydalanuvchi hech qachon "yarim yangilangan" ekranni ko'rmaydi (ism
        tozalangan, telefon esa hali yo'q), va ortiqcha renderlar bo'lmaydi.
      </p>

      <h2>Updater funksiya: oldingi qiymatdan hisoblash</h2>
      <p>
        Xo'sh, "+3" ni qanday to'g'ri yozamiz? Setter'ga qiymat emas,{' '}
        <strong>funksiya</strong> berish mumkin. React uni navbatga qo'yadi va keyingi render
        paytida navbatdagi <em>eng so'nggi</em> qiymatni argument sifatida berib chaqiradi:
      </p>
      <CodeBlock lang="jsx">{`function handleUchta() {
  setSoni((s) => s + 1)   // navbat: 0 → 1
  setSoni((s) => s + 1)   // navbat: 1 → 2
  setSoni((s) => s + 1)   // navbat: 2 → 3
}
// keyingi renderda soni = 3 ✓`}</CodeBlock>
      <p>
        <code>{'(s) => s + 1'}</code> — <strong>updater funksiya</strong>. U "soni + 1 bo'lsin"
        demaydi, "oldingi qiymat qanday bo'lsa, unga 1 qo'sh" deydi. Argument nomi odatda state
        nomining birinchi harfi yoki <code>prev</code> bo'ladi:{' '}
        <code>{'setSoni(prev => prev + 1)'}</code>.
      </p>
      <p>Qiymat va funksiyani aralashtirsa nima bo'ladi?</p>
      <CodeBlock lang="jsx">{`// soni = 0 bo'lsin
setSoni(soni + 5)        // navbat: "5 bilan almashtir"     → 5
setSoni((s) => s + 1)    // navbat: "oldingiga 1 qo'sh"      → 6
setSoni(42)              // navbat: "42 bilan almashtir"    → 42
// keyingi renderda: 42`}</CodeBlock>
      <Callout type="note" title="Qachon updater kerak?">
        Yangi qiymat <strong>oldingi qiymatga bog'liq</strong> bo'lsa (hisoblagich,{' '}
        <code>!ochiq</code>, ro'yxatga element qo'shish) va bir handler'da bir necha marta
        yangilanishi mumkin bo'lsa — updater ishlating. Oddiy holatda (bitta{' '}
        <code>setSoni(soni + 1)</code>) ikkalasi ham to'g'ri ishlaydi; ko'pchilik dasturchilar
        bunday holatda ham xavfsizlik uchun updater yozadi. Yangi qiymat oldingisiga bog'liq
        bo'lmasa (<code>setIsm(e.target.value)</code>) — oddiy qiymat yetarli.
      </Callout>

      <h2>State o'zgarmasa — render ham yo'q</h2>
      <p>
        Agar setter'ga joriy qiymatning o'zini bersangiz, React buni sezadi va odatda komponentni
        ham, uning bolalarini ham qayta render qilmaydi (u <code>Object.is</code> bilan
        solishtiradi; ba'zan komponentni bir marta chaqirib ko'rishi mumkin, lekin natijani
        tashlab yuboradi):
      </p>
      <CodeBlock lang="jsx">{`const [rang, setRang] = useState('qizil')

setRang('qizil')   // qiymat bir xil — qayta render yo'q`}</CodeBlock>
      <p>
        Bu oddiy qiymatlar uchun qulay, lekin obyekt va massivlar uchun kutilmagan tuzoq
        yaratadi: obyekt ichini o'zgartirib, xuddi o'sha obyektni setter'ga bersangiz, React
        "o'sha obyekt" deb hech narsa qilmaydi. Bu keyingi ikki darsning mavzusi.
      </p>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Setter'dan keyin yangi qiymatni o'qish.</strong>{' '}
            <code>setSoni(5); console.log(soni)</code> — eski qiymat. Yangi qiymat kerak bo'lsa,
            uni o'zgaruvchiga oling: <code>const yangi = soni + 5; setSoni(yangi);</code> va{' '}
            <code>yangi</code>ni ishlating.
          </li>
          <li>
            <strong>Ketma-ket <code>setX(x + 1)</code>.</strong> Hammasi bir xil suratdan
            hisoblanadi — updater ishlating: <code>{'setX(prev => prev + 1)'}</code>.
          </li>
          <li>
            <strong>Updater ichida side effect.</strong>{' '}
            <code>{'setSoni(s => { saqla(s); return s + 1 })'}</code> — updater ham render paytida
            (va StrictMode'da ikki marta) ishlaydi, u sof bo'lishi kerak.
          </li>
          <li>
            <strong>"Render" va "ekran yangilandi"ni bir narsa deb o'ylash.</strong> Render —
            funksiya chaqiruvi; DOM faqat commit'da va faqat farq bo'lsa o'zgaradi.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="soni = 0. Handler'da: setSoni(soni + 2); setSoni(s => s * 10); alert(soni). Alert nimani ko'rsatadi va keyingi renderda soni nechaga teng?"
        options={[
          "alert: 0; keyingi renderda: 20",
          "alert: 20; keyingi renderda: 20",
          "alert: 2; keyingi renderda: 20",
          "alert: 0; keyingi renderda: 2",
        ]}
        correctIndex={0}
        explanation="alert joriy suratni ko'radi — 0. Navbat: setSoni(0 + 2) → 2, so'ng updater 2 * 10 → 20. Keyingi renderda soni = 20."
      />

      <Quiz
        question="Handler ichida uchta turli state'ning setter'i (setIsm, setYosh, setShahar) ketma-ket chaqirildi. Komponent necha marta qayta render bo'ladi?"
        options={['1 marta', '3 marta', '0 marta', '6 marta']}
        correctIndex={0}
        explanation="React handler'dagi barcha yangilanishlarni to'plab (batching), handler tugagandan keyin bitta render qiladi. (StrictMode dasturlash rejimida komponentni ikki marta chaqiradi, lekin bu baribir bitta render hisoblanadi.)"
      />

      <Exercise title="1-mashq: svetofor">
        <p>
          Quyidagi komponentda tugma bosilganda svetofor yonadi va alert chiqadi. Tugmani bir
          marta bosganda (boshlang'ich holatda yashil) alert'da nima ko'rinadi? Avval o'ylab
          javob bering, keyin tekshiring.
        </p>
        <CodeBlock lang="jsx">{`export default function Svetofor() {
  const [yashil, setYashil] = useState(true)

  function handleClick() {
    setYashil(!yashil)
    alert(yashil ? 'Keyingisi: qizil' : 'Keyingisi: yashil')
  }

  return (
    <>
      <button onClick={handleClick}>Almashtirish</button>
      <h1 style={{ color: yashil ? 'darkgreen' : 'darkred' }}>
        {yashil ? 'Yuring' : "To'xtang"}
      </h1>
    </>
  )
}`}</CodeBlock>
        <Solution>
          <p>
            Alert'da "Keyingisi: qizil" chiqadi. <code>setYashil(!yashil)</code> joriy suratni
            o'zgartirmaydi — handler ichida <code>yashil</code> hali ham <code>true</code>.
            Alert yopilgandan keyin React yangi render qiladi va ekranda "To'xtang" chiqadi.
            Alert matni aynan to'g'ri bo'lib chiqdi — chunki u eski suratdan "keyingisi"ni
            hisoblaydi.
          </p>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: navbat hisoblagichi">
        <p>
          Restoran navbatini ko'rsatadigan komponent yozing: "Navbatda: N kishi". Uchta tugma:
          "+1 mijoz", "+5 (avtobus keldi)" va "Bittasini xizmat qilish" (−1). "+5" tugmasi
          bitta updater bilan emas, aynan besh marta <code>setNavbat</code> chaqirib yozilsin —
          va baribir to'g'ri ishlasin. Navbat 0 dan pastga tushmasin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useState } from 'react'

export default function Navbat() {
  const [navbat, setNavbat] = useState(0)

  function handleBitta() {
    setNavbat((n) => n + 1)
  }

  function handleAvtobus() {
    for (let i = 0; i < 5; i++) {
      setNavbat((n) => n + 1)     // har biri oldingi natijadan davom etadi
    }
  }

  function handleXizmat() {
    setNavbat((n) => Math.max(0, n - 1))
  }

  return (
    <div>
      <h2>Navbatda: {navbat} kishi</h2>
      <button onClick={handleBitta}>+1 mijoz</button>
      <button onClick={handleAvtobus}>+5 (avtobus keldi)</button>
      <button onClick={handleXizmat} disabled={navbat === 0}>
        Bittasini xizmat qilish
      </button>
    </div>
  )
}`}</CodeBlock>
          <p>
            <code>{'setNavbat(navbat + 1)'}</code> bilan beshta chaqiruv faqat +1 qo'shardi.
            Updater bilan esa har biri navbatdagi oxirgi qiymatni oladi va natija +5 bo'ladi —
            lekin baribir faqat bitta render.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Ekran uch bosqichda yangilanadi: trigger (setter yoki birinchi ochilish) → render
          (komponent chaqiriladi) → commit (DOM'ga faqat farq yoziladi).
        </li>
        <li>
          State — har bir render uchun surat: shu renderdagi JSX va handler'lar bir xil qiymatni
          ko'radi; setter uni joriy renderda o'zgartirmaydi.
        </li>
        <li>
          React handler'dagi barcha setter'larni to'plab, handler tugagach bitta render qiladi
          (batching).
        </li>
        <li>
          Yangi qiymat oldingisiga bog'liq bo'lsa — updater funksiya:{' '}
          <code>{'setSoni(prev => prev + 1)'}</code>. Updater sof bo'lishi kerak.
        </li>
        <li>
          Setter'ga joriy qiymatning o'zi berilsa, React qayta render qilmaydi — obyekt va massivlarda bu
          muhim (15–16-darslar).
        </li>
      </KeyPoints>
    </>
  )
}
