import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Hodisalarga javob berish',
  section: 'Interaktivlik',
}

export default function EventHandlingLesson() {
  return (
    <>
      <h2>Muammo: sahifa hali "jim"</h2>
      <p>
        11-darsdagi menyu chiroyli, lekin unda hech narsani bosib bo'lmaydi. Haqiqiy ilova esa
        foydalanuvchiga javob beradi: tugma bosilganda savatchaga qo'shadi, matn yozilganda
        qidiradi, forma yuborilganda saqlaydi. Bu bo'limda ilovalarga "jon" kiritamiz, va
        birinchi qadam — foydalanuvchi harakatlarini (hodisalarni) ushlash.
      </p>
      <p>
        Oddiy JavaScript'da buning uchun <code>addEventListener</code> ishlatardik. React'da esa
        bu ham deklarativ (1-dars): elementni topib, unga tinglovchi ulash o'rniga, JSX'ning
        o'zida "bu tugma bosilganda shu funksiya ishlasin" deb yozamiz.
      </p>

      <h2>Event handler qo'shish</h2>
      <p>
        <strong>Event handler</strong> (hodisa ishlovchisi) — hodisa yuz berganda React
        chaqiradigan funksiya. Uni komponent ichida e'lon qilib, JSX'ga prop sifatida
        uzatamiz:
      </p>
      <CodeBlock lang="jsx">{`export default function Salomlash() {
  function handleClick() {
    alert('Salom!')
  }

  return <button onClick={handleClick}>Bosing</button>
}`}</CodeBlock>
      <p>Uchta qoida:</p>
      <ul>
        <li>
          Hodisa prop'larining nomi <strong>camelCase</strong>: <code>onClick</code>,{' '}
          <code>onChange</code>, <code>onSubmit</code>, <code>onMouseEnter</code>,{' '}
          <code>onKeyDown</code> (HTML'dagi <code>onclick</code> emas).
        </li>
        <li>
          Qiymati — satr emas, <strong>funksiya</strong>: <code>{'onClick={handleClick}'}</code>.
        </li>
        <li>
          Odatda handler nomi <code>handle</code> + hodisa nomi bo'ladi:{' '}
          <code>handleClick</code>, <code>handleChange</code>, <code>handleSubmit</code>.
          Majburiy emas, lekin kodni o'qishni ancha osonlashtiradi.
        </li>
      </ul>
      <p>
        Qisqa handler'larni to'g'ridan-to'g'ri JSX ichida strelkali funksiya qilib yozish ham
        mumkin: <code>{"onClick={() => alert('Salom!')}"}</code>. Bir-ikki qatordan uzun bo'lsa
        — alohida funksiya o'qishga qulayroq.
      </p>

      <h2>
        Funksiyani <em>uzatish</em>, funksiyani <em>chaqirish</em> emas
      </h2>
      <p>Boshlovchilarning eng ko'p uchraydigan xatosi:</p>
      <CodeBlock lang="jsx">{`// TO'G'RI: funksiyaning o'zi uzatiladi, React uni bosilganda chaqiradi
<button onClick={handleClick}>Bosing</button>

// XATO: handleClick() HOZIR, render paytida chaqiriladi!
<button onClick={handleClick()}>Bosing</button>`}</CodeBlock>
      <p>
        Ikkinchi variantda qavslar tufayli <code>handleClick</code> komponent chizilayotgan
        paytning o'zida bajariladi: <code>alert</code> sahifa ochilishi bilan chiqadi (StrictMode
        tufayli hatto ikki marta), <code>onClick</code>ga esa funksiya emas, uning natijasi —{' '}
        <code>undefined</code> — beriladi va tugma bosilganda hech narsa bo'lmaydi.
      </p>

      <h3>Handlerga argument uzatish</h3>
      <p>
        Agar handlerga qo'shimcha ma'lumot kerak bo'lsa (masalan, qaysi taom tanlangani),
        qavslarni to'g'ridan-to'g'ri yozib bo'lmaydi — yuqoridagi xatoga tushamiz. Buning
        o'rniga uni strelkali funksiyaga o'raymiz:
      </p>
      <CodeBlock lang="jsx">{`function TaomlarRoyxati({ taomlar }) {
  function handleTanlash(nomi) {
    alert(nomi + ' tanlandi')
  }

  return (
    <ul>
      {taomlar.map((taom) => (
        <li key={taom.id}>
          {taom.nomi}
          <button onClick={() => handleTanlash(taom.nomi)}>Tanlash</button>
        </li>
      ))}
    </ul>
  )
}`}</CodeBlock>
      <p>
        <code>{'() => handleTanlash(taom.nomi)'}</code> — render paytida hech narsa
        bajarmaydigan yangi kichik funksiya. U faqat "bosilganda shu ishni qil" degan
        ko'rsatmani saqlaydi. Har bir tugma o'z <code>taom.nomi</code>sini "eslab" qoladi.
      </p>

      <h2>
        Hodisa obyekti — <code>e</code>
      </h2>
      <p>
        React har bir handlerga avtomatik ravishda bitta argument uzatadi — hodisa obyektini
        (odatda <code>e</code> deb nomlanadi). Unda hodisa haqidagi ma'lumot bor:
      </p>
      <CodeBlock lang="jsx">{`function Qidiruv() {
  function handleChange(e) {
    console.log('Yozilgan matn:', e.target.value)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      console.log('Enter bosildi')
    }
  }

  return <input onChange={handleChange} onKeyDown={handleKeyDown} />
}`}</CodeBlock>
      <ul>
        <li>
          <code>e.target</code> — hodisa yuz bergan DOM elementi; <code>e.target.value</code> —
          inputning joriy matni.
        </li>
        <li>
          <code>e.key</code> — bosilgan klaviatura tugmasi (<code>'Enter'</code>,{' '}
          <code>'Escape'</code>, <code>'a'</code>...).
        </li>
      </ul>
      <Callout type="note" title="onChange — har bir harfda">
        HTML'da <code>change</code> hodisasi input'dan fokus ketganda ishlaydi. React'ning{' '}
        <code>onChange</code>i esa <strong>har bir o'zgarishda</strong> — har bir yozilgan yoki
        o'chirilgan harfda ishlaydi. Bu ataylab qilingan va formalar bilan ishlashni ancha
        osonlashtiradi (17-dars).
      </Callout>

      <h3>Brauzerning standart harakatini to'xtatish</h3>
      <p>
        Ba'zi hodisalarning brauzerdagi "standart" harakati bor: forma yuborilganda sahifa qayta
        yuklanadi, havola bosilganda boshqa sahifaga o'tiladi. React ilovasida bu odatda
        kerak emas — buni <code>e.preventDefault()</code> to'xtatadi:
      </p>
      <CodeBlock lang="jsx">{`function ObunaFormasi() {
  function handleSubmit(e) {
    e.preventDefault()          // sahifa qayta yuklanmaydi
    alert("Obuna bo'ldingiz!")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" />
      <button type="submit">Obuna</button>
    </form>
  )
}`}</CodeBlock>
      <p>
        E'tibor bering: handler <code>{'<form>'}</code>ning <code>onSubmit</code>iga ulangan,
        tugmaning <code>onClick</code>iga emas. Shunda forma tugma bosilganda ham, input ichida
        Enter bosilganda ham yuboriladi.
      </p>

      <h2>Handlerni props orqali uzatish</h2>
      <p>
        Ko'pincha tugma bitta komponentda turadi, lekin bosilganda nima bo'lishini boshqa —
        ota — komponent hal qiladi. 5-darsda aytganimizdek, props sifatida funksiya ham
        uzatish mumkin:
      </p>
      <CodeBlock lang="jsx">{`function Tugma({ onClick, children }) {
  return (
    <button className="tugma" onClick={onClick}>
      {children}
    </button>
  )
}

export default function Pleer() {
  return (
    <div>
      <Tugma onClick={() => alert('Ijro etilmoqda')}>▶ Ijro</Tugma>
      <Tugma onClick={() => alert("To'xtatildi")}>⏸ Pauza</Tugma>
    </div>
  )
}`}</CodeBlock>
      <p>
        <code>Tugma</code> faqat ko'rinish uchun javob beradi, uning "nima qilishi" esa
        tashqaridan keladi — bitta komponent turli joylarda turli ish qiladi. Nomlash odati:
        handler <strong>prop</strong>lari <code>on</code> bilan boshlanadi (
        <code>onClick</code>, <code>onTanlash</code>, <code>onOchirish</code>), ularni uzatadigan
        funksiyalar esa <code>handle</code> bilan (<code>handleTanlash</code>). Bu naqsh
        keyingi darslarda bola komponent otaga "xabar berishi"ning asosiy yo'li bo'ladi.
      </p>

      <h2>Hodisaning yuqoriga ko'tarilishi (propagation)</h2>
      <p>
        Hodisa avval bosilgan elementda ishlaydi, keyin uning ota elementlariga "ko'tariladi"
        (bubbling). Ichma-ich elementlarning ikkalasida ham <code>onClick</code> bo'lsa,
        ikkalasi ham ishlaydi:
      </p>
      <CodeBlock lang="jsx">{`function TaomKartasi() {
  return (
    <div className="karta" onClick={() => alert('Karta ochildi')}>
      <h3>Osh</h3>
      <button
        onClick={(e) => {
          e.stopPropagation()       // hodisa kartaga ko'tarilmaydi
          alert("Savatchaga qo'shildi")
        }}
      >
        Savatchaga
      </button>
    </div>
  )
}`}</CodeBlock>
      <p>
        <code>stopPropagation()</code>siz "Savatchaga" bosilganda ikkita alert chiqardi —
        avval tugmaniki, keyin kartaniki. <code>e.stopPropagation()</code> hodisaning yuqoriga
        ko'tarilishini to'xtatadi. (<code>preventDefault</code> bilan adashtirmang: u
        brauzerning standart harakatini to'xtatadi, ko'tarilishni emas.)
      </p>

      <h2>Handler'lar side effect qila oladi</h2>
      <p>
        9-darsda render sof bo'lishi kerakligini aytdik. Event handler'lar esa render paytida
        emas, foydalanuvchi harakat qilganda ishlaydi — shuning uchun ular "o'zgartiradigan"
        ish uchun to'g'ri joy: <code>alert</code>, serverga so'rov, <code>localStorage</code>ga
        yozish. Endi eng muhim savolga keldik: handler ichida <em>ekrandagi</em> narsani qanday
        o'zgartiramiz? Sinab ko'raylik:
      </p>
      <CodeBlock lang="jsx">{`export default function Hisoblagich() {
  let soni = 0

  function handleClick() {
    soni = soni + 1
    console.log('soni:', soni)   // 1, 2, 3...
  }

  return <button onClick={handleClick}>Bosildi: {soni} marta</button>
}`}</CodeBlock>
      <p>
        Konsolda son oshib boradi, lekin tugmada doim "Bosildi: 0 marta". Nega? Va buni qanday
        tuzatamiz? Bu — keyingi darsning, va butun React'ning eng muhim mavzusi:{' '}
        <strong>state</strong>.
      </p>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Handler'ni chaqirib yuborish.</strong> <code>{'onClick={handleClick()}'}</code>{' '}
            — render paytida ishlaydi. To'g'risi: <code>{'onClick={handleClick}'}</code> yoki{' '}
            <code>{'onClick={() => handleClick(id)}'}</code>.
          </li>
          <li>
            <strong>Satr uzatish.</strong> <code>{'onClick="handleClick()"'}</code> — HTML odati;
            React'da xato beradi. Doim jingalak qavs va funksiya.
          </li>
          <li>
            <strong>Kichik harfli nom.</strong> <code>onclick</code> — React buni tanimaydi va
            konsolda ogohlantiradi.
          </li>
          <li>
            <strong>Formani tugma orqali boshqarish.</strong> Tugmaning <code>onClick</code>
            idagi mantiq Enter bosilganda ishlamaydi. <code>{'<form onSubmit>'}</code> +{' '}
            <code>e.preventDefault()</code> ishlating.
          </li>
          <li>
            <strong>Ichki tugma tashqi handler'ni ham ishga tushiradi.</strong> Kartaning ichidagi
            tugma uchun <code>e.stopPropagation()</code>.
          </li>
        </ul>
      </Callout>

      <Quiz
        question={`Quyidagi ikki yozuvdan qaysi biri XATO va nega: (A) onClick={handleOchirish} (B) onClick={handleOchirish(id)}`}
        options={[
          "B xato: handleOchirish(id) render paytida darhol chaqiriladi, bosilishni kutmaydi",
          "A xato: funksiyaga argument berilmagan",
          "Ikkalasi ham to'g'ri, farqi yo'q",
          "B xato: JSX'da qavs yozish sintaksis xatosi",
        ]}
        correctIndex={0}
        explanation="Qavslar bilan yozilgan ifoda komponent chizilayotganda bajariladi va onClick'ga uning natijasi (undefined) beriladi. Argument bilan bosilgandagina chaqirish uchun: onClick={() => handleOchirish(id)}."
      />

      <Quiz
        question="Kartaning o'ziga ham, ichidagi 'Like' tugmasiga ham onClick berilgan. Tugma bosilganda faqat like ishlashi, karta ochilmasligi uchun tugma handler'ida nima chaqirish kerak?"
        options={[
          "e.stopPropagation()",
          "e.preventDefault()",
          "return false",
          "e.target.blur()",
        ]}
        correctIndex={0}
        explanation="Hodisa bosilgan elementdan ota elementlarga ko'tariladi. stopPropagation() bu ko'tarilishni to'xtatadi. preventDefault() esa brauzerning standart harakatini (forma yuborish, havolaga o'tish) to'xtatadi, ko'tarilishga ta'sir qilmaydi. return false React'da hech narsa qilmaydi."
      />

      <Exercise title="1-mashq: taom tanlash">
        <p>
          11-darsdagi menyudagi har bir <code>TaomKartasi</code>ga "Buyurtma" tugmasini qo'shing.
          Tugma bosilganda <code>{`"Osh — 45000 so'm buyurtma qilindi"`}</code> ko'rinishidagi
          alert chiqsin. Tugagan taomda tugma umuman chiqmasin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`// src/components/TaomKartasi.jsx — 11-darsdagi komponent + handler va tugma
import styles from '../Menyu.module.css'
import Belgi from './Belgi.jsx'
import Narx from './Narx.jsx'

export default function TaomKartasi({ taom }) {
  function handleBuyurtma() {
    const narx = taom.narx * (1 - (taom.chegirma ?? 0) / 100)
    alert(\`\${taom.nomi} — \${narx} so'm buyurtma qilindi\`)
  }

  return (
    <li className={taom.mavjud ? styles.karta : \`\${styles.karta} \${styles.tugagan}\`}>
      <div>
        <h3 className={styles.taomNomi}>
          {taom.nomi}
          {taom.belgilar.map((belgi) => (
            <Belgi key={belgi} matn={belgi} />
          ))}
          {!taom.mavjud && <Belgi matn="Tugadi" />}
        </h3>
        <p className={styles.tavsif}>{taom.tavsif}</p>
      </div>
      <div>
        <Narx narx={taom.narx} chegirma={taom.chegirma} />
        {taom.mavjud && <button onClick={handleBuyurtma}>Buyurtma</button>}
      </div>
    </li>
  )
}`}</CodeBlock>
          <p>
            Handler komponent ichida e'lon qilingani uchun u <code>taom</code> prop'ini
            to'g'ridan-to'g'ri ko'radi — argument uzatish shart emas. Narx chegirma bilan
            hisoblanadi, aks holda alert'dagi narx kartadagisidan farq qilardi.
          </p>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: qayta ishlatiladigan tasdiqlash tugmasi">
        <p>
          <code>XavfliTugma</code> komponentini yozing. U <code>children</code> (tugma matni),{' '}
          <code>savol</code> (masalan, "Rostdan o'chirasizmi?") va <code>onTasdiq</code>{' '}
          (funksiya) props'larini oladi. Bosilganda <code>window.confirm(savol)</code>{' '}
          ko'rsatilsin, va faqat foydalanuvchi "OK" bossa <code>onTasdiq</code> chaqirilsin. So'ng
          uni ota komponentda ikki xil vazifa bilan ishlating: "Savatchani tozalash" va "Hisobni
          o'chirish" (har biri o'z alert'ini chiqarsin).
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`function XavfliTugma({ savol, onTasdiq, children }) {
  function handleClick() {
    if (window.confirm(savol)) {
      onTasdiq()
    }
  }

  return (
    <button className="xavfli" onClick={handleClick}>
      {children}
    </button>
  )
}

export default function Sozlamalar() {
  return (
    <div>
      <XavfliTugma
        savol="Savatchadagi hamma narsa o'chadi. Davom etasizmi?"
        onTasdiq={() => alert('Savatcha tozalandi')}
      >
        Savatchani tozalash
      </XavfliTugma>
      <XavfliTugma
        savol="Hisobingiz butunlay o'chiriladi. Ishonchingiz komilmi?"
        onTasdiq={() => alert("Hisob o'chirildi")}
      >
        Hisobni o'chirish
      </XavfliTugma>
    </div>
  )
}`}</CodeBlock>
          <p>
            <code>XavfliTugma</code> "qanday so'rash"ni biladi, "nima qilish"ni esa ota
            komponent <code>onTasdiq</code> orqali beradi. <code>onTasdiq</code> faqat handler
            ichida chaqiriladi — render paytida emas.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Event handler — hodisa yuz berganda React chaqiradigan funksiya; JSX'da camelCase
          prop orqali ulanadi: <code>{'onClick={handleClick}'}</code>.
        </li>
        <li>
          Funksiyani uzating, chaqirmang; argument kerak bo'lsa —{' '}
          <code>{'onClick={() => handle(id)}'}</code>.
        </li>
        <li>
          Hodisa obyekti <code>e</code>: <code>e.target.value</code>, <code>e.key</code>,{' '}
          <code>e.preventDefault()</code> (standart harakat), <code>e.stopPropagation()</code>{' '}
          (ko'tarilish).
        </li>
        <li>
          Handler'ni props orqali uzatish mumkin: prop nomi <code>on...</code>, funksiya nomi{' '}
          <code>handle...</code>. Bola shu yo'l bilan otaga "xabar beradi".
        </li>
        <li>
          Handler'lar side effect uchun to'g'ri joy. Lekin oddiy o'zgaruvchini o'zgartirish
          ekranni yangilamaydi — buning uchun state kerak (13-dars).
        </li>
      </KeyPoints>
    </>
  )
}
