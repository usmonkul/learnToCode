import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'JSX asoslari',
  section: 'Boshlash',
}

export default function JsxLesson() {
  return (
    <>
      <h2>Muammo: UI'ni JavaScript bilan "qurish" og'ir</h2>
      <p>
        JSX bo'lmaganda, oddiy kartochkani ham DOM API orqali qadam-baqadam qurishga to'g'ri
        kelardi:
      </p>
      <CodeBlock lang="js">{`const karta = document.createElement('div')
karta.className = 'karta'
const sarlavha = document.createElement('h2')
sarlavha.textContent = kitob.nomi
const muallif = document.createElement('p')
muallif.textContent = 'Muallif: ' + kitob.muallif
karta.append(sarlavha, muallif)`}</CodeBlock>
      <p>
        Yetti qator kod — va natija qanday ko'rinishini tasavvur qilish uchun uni boshda
        "ijro etib" ko'rish kerak. JSX esa xuddi shu tuzilmani HTML'ga o'xshash, bir qarashda
        o'qiladigan ko'rinishda yozishga imkon beradi:
      </p>
      <CodeBlock lang="jsx">{`<div className="karta">
  <h2>{kitob.nomi}</h2>
  <p>Muallif: {kitob.muallif}</p>
</div>`}</CodeBlock>
      <p>
        Bu dars JSX sintaksisining o'zi haqida: u qanday ishlaydi, ichiga JavaScript
        qiymatlarini qanday "quyish" mumkin, va HTML'dan qaysi jihatlari bilan farq qiladi.
        Misollarni 2-darsda yaratgan loyihangizning <code>App.jsx</code> faylida sinab ko'ring.
      </p>

      <h2>JSX qanday ishlaydi?</h2>
      <p>
        JSX — HTML emas, balki JavaScript'ning kengaytmasi (extension). Brauzer JSX'ni
        to'g'ridan-to'g'ri o'qiy olmaydi; kod ishga tushishidan oldin Vite har bir JSX
        yozuvini oddiy funksiya chaqiruviga aylantirib beradi. Zamonaviy React'da bu funksiya{' '}
        <code>react/jsx-runtime</code> modulidagi <code>jsx()</code>, lekin g'oya eski{' '}
        <code>React.createElement()</code> bilan bir xil, shuning uchun uni misol qilib olamiz.
        Quyidagi yozuv:
      </p>
      <CodeBlock lang="jsx">{`const element = <h1 className="sarlavha">Salom!</h1>`}</CodeBlock>
      <p>kompilyatsiyadan keyin konseptual jihatdan shunga aylanadi:</p>
      <CodeBlock lang="js">{`const element = React.createElement(
  'h1',
  { className: 'sarlavha' },
  'Salom!'
)`}</CodeBlock>
      <p>
        <code>React.createElement</code> — ekranda "qanday element, qanday atributlar bilan va
        qanday ichki mazmun bilan chiqishi kerak"ligini tasvirlaydigan oddiy JavaScript obyektini
        qaytaradigan funksiya. Buni qo'lda hech qachon o'zingiz yozmaysiz — JSX aynan shu og'ir
        yozuvdan qutqarish uchun ixtiro qilingan. Lekin shuni bilish foydali: JSX "sehr" emas, u
        shunchaki funksiya chaqiruvlari uchun qulay qisqartma (syntactic sugar), xolos.
      </p>
      <Callout type="note" title="Nega bu muhim?">
        JSX oxir-oqibat oddiy JavaScript'ga aylanganligi sababli, uning ichida haqiqiy
        JavaScript qiymatlaridan erkin foydalanish mumkin — aynan shu narsani keyingi bo'limda
        ko'ramiz.
      </Callout>

      <h2>
        JS ifodalarini <code>{'{ }'}</code> bilan qo'shish
      </h2>
      <p>
        JSX ichida jingalak qavslar <code>{'{ }'}</code> yordamida istalgan JavaScript{' '}
        <strong>ifodasini (expression)</strong> yozib, uning natijasini to'g'ridan-to'g'ri
        belgilangan joyga "quyish" mumkin: o'zgaruvchi, arifmetik amal, funksiya chaqiruvi —
        hammasi ishlaydi.
      </p>
      <CodeBlock lang="jsx">{`const ism = 'Aziz'
const yosh = 25

function Salom() {
  return (
    <p>
      Salom, {ism}! Sen {yosh} yoshdasan, demak bir yildan keyin {yosh + 1} yoshga to'lasan.
    </p>
  )
}`}</CodeBlock>
      <p>
        Diqqat: jingalak qavslar ichiga faqat <strong>ifoda</strong> (natija beruvchi kod)
        yoziladi — <code>if</code>, <code>for</code> kabi <strong>statement</strong>larni
        to'g'ridan-to'g'ri yozib bo'lmaydi, chunki ular hech qanday qiymat "qaytarmaydi".
        Masalan, quyidagi kod xato beradi:
      </p>
      <CodeBlock lang="jsx">{`// XATO: if — statement, ifoda emas
return <p>{if (yosh > 18) { 'Katta' }}</p>`}</CodeBlock>
      <p>
        Buning o'rniga qiymat qaytaradigan ifoda kerak bo'ladi — masalan, ternary operatori:{' '}
        <code>{"{yosh > 18 ? 'Katta' : 'Kichik'}"}</code>. Shartga qarab turli narsa chizishning
        barcha usullarini 7-darsda ko'ramiz.
      </p>

      <h3>Atributlarda ham jingalak qavs</h3>
      <p>
        Jingalak qavslar faqat teglar orasidagi matnda emas, atribut qiymatida ham ishlaydi.
        Qo'shtirnoq — matn (satr) uchun, jingalak qavs — JavaScript qiymati uchun:
      </p>
      <CodeBlock lang="jsx">{`const kitob = {
  nomi: "O'tkan kunlar",
  muqova: '/images/otkan-kunlar.jpg',
  sahifalar: 384,
}

function KitobMuqovasi() {
  return (
    <img
      src={kitob.muqova}          // JS qiymati — qo'shtirnoqsiz!
      alt={kitob.nomi}
      width={120}                 // son
      className="muqova"          // oddiy satr — qo'shtirnoq bilan
    />
  )
}`}</CodeBlock>
      <p>
        Diqqat: <code>{'src="{kitob.muqova}"'}</code> deb yozsangiz, React buni so'zma-so'z{' '}
        <code>{'"{kitob.muqova}"'}</code> degan matn deb tushunadi va rasm yuklanmaydi. Yoki
        qo'shtirnoq, yoki jingalak qavs — ikkalasi birga emas.
      </p>

      <h3>JSX ham — oddiy qiymat</h3>
      <p>
        JSX ifoda bo'lgani uchun uni o'zgaruvchiga saqlash, funksiyadan qaytarish yoki boshqa
        JSX ichiga qo'yish mumkin:
      </p>
      <CodeBlock lang="jsx">{`const belgi = <span className="yangi">YANGI</span>

function KitobNomi() {
  return <h2>O'tkan kunlar {belgi}</h2>
}`}</CodeBlock>

      <h3>Jingalak qavs ichida nima chiziladi?</h3>
      <p>
        Hamma JavaScript qiymati ham ekranga bir xil chiqmaydi. Buni bilish keyinchalik
        ko'plab "nega ekranda 0 chiqyapti?" degan savollardan qutqaradi:
      </p>
      <ul>
        <li>
          <strong>Satr va son</strong> — matn sifatida chiziladi: <code>{'{"Salom"}'}</code>,{' '}
          <code>{'{42}'}</code>. Diqqat: <code>0</code> ham son, u ham chiziladi.
        </li>
        <li>
          <strong><code>true</code>, <code>false</code>, <code>null</code>,{' '}
          <code>undefined</code></strong> — hech narsa chizilmaydi. Bu shartli render uchun juda
          qulay (7-darsda).
        </li>
        <li>
          <strong>Massiv</strong> — har bir elementi ketma-ket chiziladi:{' '}
          <code>{"{['a', 'b']}"}</code> → "ab". Ro'yxat chizish shunga asoslangan (8-darsda).
        </li>
        <li>
          <strong>Oddiy obyekt</strong> — xato! <code>{'{kitob}'}</code> deb yozsangiz,
          ilova <code>Objects are not valid as a React child</code> xatosi bilan to'xtaydi.
          Obyektning o'zini emas, uning maydonini chizing: <code>{'{kitob.nomi}'}</code>.
        </li>
      </ul>
      <Callout type="tip" title="JSX ichida izoh yozish">
        Oddiy JavaScript'dagi <code>//</code> izohi JSX teglari orasida ishlamaydi, chunki u
        yerda siz JavaScript emas, "belgilash (markup)" rejimidasiz. JSX ichida izoh yozish
        uchun jingalak qavs va JS izohini birlashtiring: <code>{'{/* izoh matni */}'}</code>.
      </Callout>

      <h2>Bitta ildiz elementi va fragmentlar</h2>
      <p>
        Komponentning <code>return</code>i faqat <strong>bitta</strong> ildiz elementini
        qaytarishi mumkin — bir nechta "qo'shni" (sibling) elementni ayri-ayri, vergulsiz
        qaytarib bo'lmaydi. Quyidagi kod xato beradi:
      </p>
      <CodeBlock lang="jsx">{`function Sarlavhalar() {
  return (
    <h1>Salom!</h1>
    <h2>Xush kelibsiz</h2>
  )
}
// XATO: JSX elementlari yonma-yon (adjacent) turgan bo'lishi mumkin emas`}</CodeBlock>
      <p>
        Eng oddiy yechim — ularni bitta ota (parent) elementga, masalan <code>{'<div>'}</code>
        ga, o'rab qo'yish:
      </p>
      <CodeBlock lang="jsx">{`function Sarlavhalar() {
  return (
    <div>
      <h1>Salom!</h1>
      <h2>Xush kelibsiz</h2>
    </div>
  )
}`}</CodeBlock>
      <p>
        Lekin har doim ham qo'shimcha <code>{'<div>'}</code> chiqarish shart emas — ba'zan u
        sahifa tuzilishiga (masalan, CSS grid/flex qatlamlariga) keraksiz element bo'lib
        qo'shiladi. Aynan shu holat uchun React <strong>fragment</strong> beradi — ekranga
        hech qanday DOM elementi chiqarmaydigan "ko'rinmas" o'rovchi. Uning eng qisqa yozilishi
        — bo'sh burchakli qavslar:
      </p>
      <CodeBlock lang="jsx">{`function Sarlavhalar() {
  return (
    <>
      <h1>Salom!</h1>
      <h2>Xush kelibsiz</h2>
    </>
  )
}`}</CodeBlock>
      <p>
        <code>{'<>'}</code> va <code>{'</>'}</code> — <code>{'<React.Fragment>'}</code>ning
        qisqartirilgan yozilishi. Natija bir xil: brauzer DOM'ida qo'shimcha{' '}
        <code>{'<div>'}</code> paydo bo'lmaydi, faqat <code>{'<h1>'}</code> va{' '}
        <code>{'<h2>'}</code>ning o'zi qoladi.
      </p>
      <Callout type="note" title="Yodda tuting">
        Keyingi darslarda komponent bir nechta elementni <code>{'<>...</>'}</code> ichida
        qaytarganini tez-tez ko'rasiz — bu React kodida juda keng tarqalgan naqsh.
      </Callout>

      <h2>JSX va HTML orasidagi asosiy farqlar</h2>
      <p>
        JSX HTML'ga juda o'xshab ko'rinadi, lekin u aslida JavaScript, shuning uchun bir qancha
        joyda HTML qoidalaridan chetga chiqadi. Eng ko'p uchraydigan uchta farqni ko'rib
        chiqamiz.
      </p>

      <h3>
        <code>class</code> o'rniga <code>className</code>
      </h3>
      <p>
        HTML'da CSS klassi <code>class</code> atributi orqali beriladi. JSX esa buni boshqacha
        ko'radi: u DOM elementining haqiqiy JavaScript xususiyatlariga (properties) murojaat
        qiladi, HTML atributlarining o'ziga emas. Brauzer DOM'ida bu xususiyat{' '}
        <code>className</code> deb ataladi (chunki <code>class</code> so'zi JavaScript'da
        allaqachon band — class deklaratsiyalari uchun ishlatiladi), shuning uchun JSX ham xuddi
        shu nomdan foydalanadi:
      </p>
      <CodeBlock lang="jsx">{`<div className="karta">Salom!</div>`}</CodeBlock>
      <p>
        Xuddi shu sababdan <code>{'<label>'}</code>ning <code>for</code> atributi JSX'da{' '}
        <code>htmlFor</code> bo'ladi (<code>for</code> ham JavaScript'da band so'z).
      </p>

      <h3>O'z-o'zini yopadigan teglar</h3>
      <p>
        HTML'da <code>{'<img>'}</code>, <code>{'<input>'}</code> yoki <code>{'<br>'}</code> kabi
        ichki mazmuni bo'lmagan teglarni yopmasdan qoldirish mumkin edi. JSX bunga yo'l
        qo'ymaydi: har bir teg yopilishi shart, ichi bo'sh teglar esa oxirida{' '}
        <code>{'/>'}</code> bilan o'z-o'zini yopishi kerak:
      </p>
      <CodeBlock lang="jsx">{`// XATO — JSX'da yopilmagan teg qabul qilinmaydi
<img src="rasm.jpg">

// TO'G'RI — o'z-o'zini yopadigan teg
<img src="rasm.jpg" />`}</CodeBlock>
      <p>
        Bu qoida odatda mazmunli teglarga ham tegishli:{' '}
        <code>{'<div></div>'}</code> to'g'ri, lekin agar ichida hech narsa bo'lmasa, uni{' '}
        <code>{'<div />'}</code> deb ham yozish mumkin.
      </p>

      <h3>Atributlar camelCase'da yoziladi</h3>
      <p>
        Bir nechta so'zdan iborat HTML atributlari (masalan, <code>onclick</code>,{' '}
        <code>tabindex</code>) JSX'da camelCase uslubida yoziladi — bu JavaScript'ning o'zining
        nomlash konvensiyasi. Istisno — <code>aria-*</code> va <code>data-*</code> atributlari:
        ular HTML'dagidek chiziqcha bilan qoladi (<code>aria-label</code>,{' '}
        <code>data-id</code>).
      </p>
      <CodeBlock lang="jsx">{`<button onClick={() => console.log('bosildi')} tabIndex={0}>
  Bosish
</button>`}</CodeBlock>
      <p>
        Hodisa (event) uchun barcha ishlovchi atributlari shu qoidaga bo'ysunadi:{' '}
        <code>onClick</code>, <code>onChange</code>, <code>onSubmit</code> va hokazo — bularni
        12-darsda batafsil ko'ramiz, hozircha faqat nomlash uslubiga e'tibor bering.
      </p>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong><code>class</code> va <code>for</code> yozish.</strong> Kod kompilyatsiya
            bo'ladi, lekin konsolda <code>Invalid DOM property `class`. Did you mean
            `className`?</code> chiqadi. To'g'risi — <code>className</code> va{' '}
            <code>htmlFor</code>.
          </li>
          <li>
            <strong>Atributda qo'shtirnoq va jingalak qavsni aralashtirish.</strong>{' '}
            <code>{'src="{url}"'}</code> — so'zma-so'z matn; to'g'risi <code>{'src={url}'}</code>.
          </li>
          <li>
            <strong>Obyektni to'g'ridan-to'g'ri chizish.</strong>{' '}
            <code>{'<p>{foydalanuvchi}</p>'}</code> — "Objects are not valid as a React child"
            xatosi. Maydonini chizing: <code>{'{foydalanuvchi.ism}'}</code>.
          </li>
          <li>
            <strong>Yopilmagan teg.</strong> <code>{'<input>'}</code>, <code>{'<img>'}</code>,{' '}
            <code>{'<br>'}</code> — JSX'da doim <code>{'<input />'}</code>.
          </li>
          <li>
            <strong>Ikki ildiz element.</strong> <code>return</code> ichida yonma-yon ikkita
            teg — "Adjacent JSX elements must be wrapped..." yoki shunga o'xshash sintaksis xatosi. Fragmentga o'rang.
          </li>
        </ul>
      </Callout>

      <Quiz
        question={`Bir talaba komponentida <div class="karta">Salom!</div> deb yozgan JSX kodini ishga tushirganda brauzer konsolida "Invalid DOM property \`class\`. Did you mean \`className\`?" ogohlantirishini ko'radi. Bu ogohlantirish nimani bildiradi?`}
        options={[
          "class o'rniga className yozilishi kerak edi",
          "div elementi o'rniga fragment ishlatilishi kerak edi",
          "Salom! matni jingalak qavs ichiga olinishi kerak edi",
          'komponent funksiyasi kichik harf bilan boshlangan',
        ]}
        correctIndex={0}
        explanation="JSX HTML atributiga emas, DOM xususiyatiga mos keladi, va brauzer DOM'ida CSS klassi xususiyati className deb ataladi (chunki class so'zi JavaScript'da band). Shuning uchun JSX'da har doim className ishlatiladi, class emas."
      />

      <Quiz
        question="Komponent quyidagini qaytaradi: <p>{0}{false}{null}{'React'}</p>. Ekranda nima ko'rinadi?"
        options={['0React', 'React', '0falsenullReact', "Xato: bu qiymatlarni chizib bo'lmaydi"]}
        correctIndex={0}
        explanation="0 — son, shuning uchun u matn sifatida chiziladi. false va null esa hech narsa chizmaydi. Natija: 0React. Shartli renderda 0 ning ekranga chiqib qolishi aynan shu qoidadan kelib chiqadi."
      />

      <Exercise title="1-mashq: xatolarni tuzating">
        <p>
          Quyidagi <code>ProfilKarta</code> komponenti bir nechta JSX qoidasini buzgani uchun
          build paytida xatolik beradi. Xatolarni toping va komponentni to'g'ri JSX bilan qayta
          yozing:
        </p>
        <CodeBlock lang="jsx">{`function ProfilKarta() {
  return (
    <img src="avatar.jpg" class="avatar">
    <h2>Aziz Karimov</h2>
  )
}`}</CodeBlock>
        <Solution>
          <p>Bu yerda uchta xato bor edi:</p>
          <ul>
            <li>
              <code>{'<img>'}</code> teg yopilmagan edi — <code>{'/>'}</code> bilan
              o'z-o'zini yopishi kerak.
            </li>
            <li>
              <code>class</code> atributi ishlatilgan edi — <code>className</code> bo'lishi
              kerak.
            </li>
            <li>
              Ikkita ildiz elementi (<code>{'<img>'}</code> va <code>{'<h2>'}</code>) bitta ota
              elementsiz qaytarilgan edi — fragment ichiga o'ralishi kerak.
            </li>
          </ul>
          <CodeBlock lang="jsx">{`function ProfilKarta() {
  return (
    <>
      <img src="avatar.jpg" className="avatar" />
      <h2>Aziz Karimov</h2>
    </>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: ma'lumotdan kartochka">
        <p>
          <code>App.jsx</code>da quyidagi obyekt bor. Undan foydalanib <code>KitobKartasi</code>{' '}
          komponentini yozing: muqova rasmi (<code>src</code> va <code>alt</code> obyektdan
          olinsin), nomi <code>{'<h2>'}</code>da, muallifi <code>{'<p>'}</code>da, va narxi
          chegirma bilan hisoblanib "Narxi: 72000 so'm" ko'rinishida chiqsin. Hech qaysi matnni
          qo'lda takrorlab yozmang — hammasi obyektdan kelsin.
        </p>
        <CodeBlock lang="jsx">{`const kitob = {
  nomi: "O'tkan kunlar",
  muallif: "Abdulla Qodiriy",
  muqova: '/images/otkan-kunlar.jpg',
  narx: 90000,
  chegirma: 0.2, // 20%
}`}</CodeBlock>
        <Solution>
          <CodeBlock lang="jsx">{`function KitobKartasi() {
  return (
    <div className="karta">
      <img src={kitob.muqova} alt={kitob.nomi} width={120} />
      <h2>{kitob.nomi}</h2>
      <p>{kitob.muallif}</p>
      <p>Narxi: {kitob.narx * (1 - kitob.chegirma)} so'm</p>
    </div>
  )
}`}</CodeBlock>
          <p>
            <code>{'{kitob.narx * (1 - kitob.chegirma)}'}</code> — jingalak qavs ichida
            istalgan ifoda ishlaydi, shu jumladan arifmetika. Agar obyektdagi narx o'zgarsa,
            kartochka ham o'zi to'g'ri natijani ko'rsatadi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          JSX — JavaScript'ning kengaytmasi; kompilyatsiya vaqtida har bir yozuv oddiy funksiya
          chaqiruviga (konseptual jihatdan <code>React.createElement()</code>ga) aylanadi.
        </li>
        <li>
          Jingalak qavs <code>{'{ }'}</code> ichiga faqat JavaScript ifodasi (expression)
          yoziladi — o'zgaruvchi, arifmetik amal, funksiya chaqiruvi; <code>if</code>,{' '}
          <code>for</code> kabi statement to'g'ridan-to'g'ri yozilmaydi.
        </li>
        <li>
          <code>return</code> faqat bitta ildiz elementini qaytarishi mumkin — bir nechta
          elementni <code>{'<div>'}</code>ga yoki qo'shimcha DOM elementi qo'shmaydigan
          fragmentga (<code>{'<>...</>'}</code>) o'rab bering.
        </li>
        <li>
          HTML'ning <code>class</code>i JSX'da <code>className</code> bo'ladi, ko'p so'zli
          atributlar esa camelCase'da yoziladi (<code>onClick</code>, <code>tabIndex</code>).
        </li>
        <li>
          Atributda qo'shtirnoq — matn, jingalak qavs — JS qiymati (<code>{'src={url}'}</code>).
          Satr va sonlar chiziladi, <code>true/false/null/undefined</code> chizilmaydi, oddiy
          obyekt esa xato beradi.
        </li>
        <li>
          Ichi bo'sh teglar (<code>{'<img>'}</code>, <code>{'<input>'}</code> kabi) JSX'da{' '}
          <code>{'/>'}</code> bilan o'z-o'zini yopishi shart.
        </li>
      </KeyPoints>
    </>
  )
}
