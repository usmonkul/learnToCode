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

export default function JsxAsoslariLesson() {
  return (
    <>
      <p>
        Oldingi darsda komponentlar <code>{'<h1>Mening ilovam</h1>'}</code>ga o'xshash yozuv
        qaytarishini ko'rdik va bu yozuvni JSX deb atadik, lekin uning qoidalariga chuqur
        kirmadik. Bu dars aynan shu — JSX sintaksisining o'zi — haqida: u qanday ishlaydi,
        HTML'dan qaysi jihatlari bilan farq qiladi, va uning ichiga qanday qilib JavaScript
        qiymatlarini "quyish" mumkin.
      </p>

      <h2>JSX qanday ishlaydi?</h2>
      <p>
        JSX — HTML emas, balki JavaScript'ning kengaytmasi (extension). Brauzer JSX'ni
        to'g'ridan-to'g'ri o'qiy olmaydi; kod ishga tushishidan oldin Vite (Babel orqali) har
        bir JSX yozuvini oddiy <code>React.createElement()</code> chaqiruviga aylantirib
        beradi. Masalan, quyidagi yozuv:
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
        Buning o'rniga har doim qiymat qaytaradigan ifoda ko'rinishidagi yechim kerak bo'ladi —
        buni keyingi darslarda ko'proq ko'ramiz.
      </p>
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
        Bu darsdagi barcha misollarda komponent bir nechta elementni <code>{'<>...</>'}</code>
        {' '}ichida qaytarganini ko'rasiz — bu React kodida juda keng tarqalgan naqsh.
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
      <Callout type="warning" title="Keng tarqalgan xato">
        Agar <code>class="karta"</code> deb yozsangiz, kod baribir kompilyatsiya bo'ladi, lekin
        brauzer konsolida <code>Invalid DOM property `class`. Did you mean `className`?</code>{' '}
        ogohlantirishi chiqadi va CSS klassingiz kutilganidek qo'llanmaydi. Bu — boshlanuvchilar
        orasida eng keng tarqalgan JSX xatolaridan biri.
      </Callout>

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
        Bu qoida ichi bo'sh bo'lmasligi mumkin bo'lgan teglarga ham tegishli:{' '}
        <code>{'<div></div>'}</code> to'g'ri, lekin agar ichida hech narsa bo'lmasa, uni{' '}
        <code>{'<div />'}</code> deb ham yozish mumkin.
      </p>

      <h3>Atributlar camelCase'da yoziladi</h3>
      <p>
        Bir nechta so'zdan iborat HTML atributlari (masalan, <code>onclick</code>,{' '}
        <code>tabindex</code>) JSX'da camelCase uslubida yoziladi — bu JavaScript'ning o'zining
        nomlash konvensiyasi:
      </p>
      <CodeBlock lang="jsx">{`<button onClick={() => console.log('bosildi')} tabIndex={0}>
  Bosish
</button>`}</CodeBlock>
      <p>
        Voqealar (event) uchun barcha handler atributlari shu qoidaga bo'ysunadi:{' '}
        <code>onClick</code>, <code>onChange</code>, <code>onSubmit</code> va hokazo — bularni
        keyingi darslarda batafsil ko'ramiz, hozircha faqat nomlash uslubiga e'tibor bering.
      </p>

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

      <Exercise title="Mashq">
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

      <KeyPoints>
        <li>
          JSX — JavaScript'ning kengaytmasi; kompilyatsiya vaqtida har bir yozuv{' '}
          <code>React.createElement()</code> chaqiruviga aylanadi.
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
          Ichi bo'sh teglar (<code>{'<img>'}</code>, <code>{'<input>'}</code> kabi) JSX'da{' '}
          <code>{'/>'}</code> bilan o'z-o'zini yopishi shart.
        </li>
      </KeyPoints>
    </>
  )
}
