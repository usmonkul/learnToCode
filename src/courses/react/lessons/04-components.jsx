import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Komponentlar va modullar",
  section: 'Boshlash',
}

export default function ComponentsLesson() {
  return (
    <>
      <h2>Muammo: hammasi bitta faylda</h2>
      <p>
        2-darsda <code>App.jsx</code>ga bitta sarlavha va paragraf yozdik. Endi sahifaga menyu,
        kitoblar ro'yxati, qidiruv va footer qo'shsak, <code>App</code> funksiyasi yuzlab
        qatorli bitta uzun JSX bo'lagiga aylanadi. Undagi menyuni boshqa sahifada qayta
        ishlatib bo'lmaydi, kitob kartasi 20 marta nusxalab yozilgan bo'ladi, va bitta xatoni
        topish uchun butun faylni varaqlash kerak.
      </p>
      <p>
        Yechim — UI'ni mustaqil <strong>komponentlar</strong>ga bo'lish va har birini alohida
        faylga qo'yish. Bu darsda komponentni to'g'ri e'lon qilish, nomlash, bir-birining ichiga
        joylashtirish va <code>import</code>/<code>export</code> orqali fayllarga ajratishni
        o'rganamiz.
      </p>

      <h2>Komponent — bu shunchaki funksiya</h2>
      <p>
        Funksional komponent yaratish uchun maxsus sintaksis kerak emas — oddiy JavaScript
        funksiyasini yozib, undan JSX qaytarish kifoya:
      </p>
      <CodeBlock lang="jsx">{`function Salomlash() {
  return <p>Salom, dunyo!</p>
}`}</CodeBlock>
      <p>
        Shu qadar. <code>Salomlash</code> — komponent nomi, funksiya tanasi esa "ekranda nima
        chiqishi kerak"ligini tasvirlaydi. Bunday funksiyani ekranga chiqarish uchun uni odatiy
        JavaScript chaqiruvi kabi <code>Salomlash()</code> deb emas, balki JSX tegi sifatida{' '}
        <code>{'<Salomlash />'}</code> deb yozamiz — buning sababini pastda ko'ramiz.
      </p>

      <h2>Nega komponent nomi katta harf bilan boshlanadi?</h2>
      <p>
        Komponent nomi doim katta harf bilan boshlanadi. Bu shunchaki uslub masalasi emas,
        JSX'ning ishlash tartibi shuni talab qiladi.
      </p>
      <p>
        3-darsda ko'rganimizdek, JSX kompilyatsiya vaqtida <code>React.createElement()</code>{' '}
        chaqiruviga aylanadi. Bu jarayonda JSX kompilyatori teg nomining birinchi harfiga qarab, uni ikki xil
        yo'l bilan talqin qiladi:
      </p>
      <ul>
        <li>
          Kichik harf bilan boshlansa (<code>{'<div>'}</code>, <code>{'<p>'}</code>,{' '}
          <code>{'<sarlavha>'}</code>) — kompilyator buni <strong>oddiy DOM tegi nomi</strong> (satr
          sifatida) deb hisoblaydi va brauzerdan aynan shu nomli HTML elementini so'raydi.
        </li>
        <li>
          Katta harf bilan boshlansa (<code>{'<Sarlavha>'}</code>) — kompilyator buni{' '}
          <strong>o'zgaruvchi nomi</strong> deb hisoblaydi va shu nomli funksiyani chaqirib,
          uning natijasini render qiladi.
        </li>
      </ul>
      <p>Konseptual jihatdan farq shunga o'xshaydi:</p>
      <CodeBlock lang="js">{`React.createElement('div', ...)       // 'div' — satr, brauzer tegi
React.createElement(Sarlavha, ...)    // Sarlavha — o'zgaruvchi, funksiyaga havola`}</CodeBlock>
      <p>
        Shu sababli komponent nomini kichik harf bilan yozib qo'ysangiz, JSX buni chaqirilishi
        kerak bo'lgan funksiya emas, balki noma'lum HTML tegi deb tushunadi:
      </p>
      <CodeBlock lang="jsx">{`function sarlavha() {
  return <h1>Kitob rastasi</h1>
}

function App() {
  return <sarlavha />
  // React buni <Sarlavha /> deb emas, noma'lum <sarlavha> HTML tegi deb o'qiydi
}`}</CodeBlock>
      <Callout type="note" title="Konsolda nima ko'rinadi">
        Yuqoridagi kodni ishga tushirsangiz, ekranda hech qanday sarlavha chiqmaydi va brauzer
        konsolida shunga o'xshash ogohlantirish paydo bo'ladi: "The tag &lt;sarlavha&gt; is
        unrecognized in this browser. If you meant to render a React component, start its name
        with an uppercase letter." React sizga aynan shu — nomni katta harf bilan
        boshlashni — maslahat beradi.
      </Callout>
      <p>To'g'ri yozilishi:</p>
      <CodeBlock lang="jsx">{`function Sarlavha() {
  return <h1>Kitob rastasi</h1>
}

function App() {
  return <Sarlavha />
}`}</CodeBlock>
      <Callout type="note" title="Yodda tuting">
        Qoida oddiy: komponent nomi har doim katta harf bilan boshlanadi (PascalCase —{' '}
        <code>Sarlavha</code>, <code>KitobKartasi</code>), oddiy HTML teglari esa har doim kichik
        harf bilan qoladi (<code>div</code>, <code>h1</code>, <code>button</code>). JSX aynan shu
        birinchi harfga qarab, kimni chaqirish va kimni brauzerga tayinlashni hal qiladi.
      </Callout>

      <h2>Komponentlarni bir-biriga joylashtirish (nesting)</h2>
      <p>
        Bitta komponent boshqa komponentlarni o'z JSX'i ichida oddiy teg kabi ishlatishi mumkin.
        Render paytida React har bir joylashtirilgan komponent tegini uchratganda, mos funksiyani
        chaqirib, uning natijasini aynan shu o'ringa qo'yadi. Shu tarzda kichik komponentlardan
        kattaroq sahifa yig'iladi:
      </p>
      <CodeBlock lang="jsx">{`function Sarlavha() {
  return <h1>Kitob rastasi</h1>
}

function Footer() {
  return <p>&copy; 2026 Kitob rastasi</p>
}

function App() {
  return (
    <>
      <Sarlavha />
      <p>Bu yerda kitoblar ro'yxati chiqadi.</p>
      <Footer />
    </>
  )
}`}</CodeBlock>
      <p>
        Bu yerda <code>App</code> — o'zi hech qanday <code>{'<h1>'}</code> yoki{' '}
        <code>{'<p>©...'}</code> yozmaydi, u shunchaki <code>Sarlavha</code> va{' '}
        <code>Footer</code>ni chaqiradi, ular esa o'z JSX'ini qaytaradi. Yakunda ekranga bularning
        hammasi birlashib chiqadi. Xuddi shunday, <code>Sarlavha</code> yoki <code>Footer</code>{' '}
        ham o'z ichiga yana boshqa komponentlarni joylashtirishi mumkin — bu jarayon istagancha
        chuqur davom etishi mumkin.
      </p>
      <Callout type="tip" title="Faqat JSX tegi orqali chaqiring">
        Komponentni <code>{'<Sarlavha />'}</code> emas, <code>{'Sarlavha()'}</code> deb oddiy
        funksiya kabi chaqirish texnik jihatdan kodni ishdan chiqarmaydi, lekin bunda React o'sha
        komponentni alohida, chegaralangan qism deb hisoblamay qoladi — u shunchaki chaqirgan
        komponentning davomi sifatida ko'riladi. Keyingi darslarda ko'radigan ba'zi
        imkoniyatlar aynan shu chegara borligiga tayanadi, shuning uchun komponentni har doim JSX
        tegi ko'rinishida <code>{'<Komponent />'}</code> chaqirish odat qilib olinadi.
      </Callout>

      <h2>Komponentni alohida faylga ajratish</h2>
      <p>
        Hozircha barcha komponentlar bitta faylda turibdi. Haqiqiy loyihada har bir komponent
        odatda <strong>o'z faylida</strong> yashaydi, fayl nomi esa komponent nomi bilan bir
        xil bo'ladi. Buning uchun JavaScript modullari — <code>export</code> va{' '}
        <code>import</code> — ishlatiladi. <code>src/components/</code> papkasini yarating:
      </p>
      <CodeBlock lang="text">{`src/
├── components/
│   ├── Sarlavha.jsx
│   └── Footer.jsx
├── App.jsx
└── main.jsx`}</CodeBlock>
      <CodeBlock lang="jsx">{`// src/components/Sarlavha.jsx
export default function Sarlavha() {
  return <h1>Kitob rastasi</h1>
}`}</CodeBlock>
      <CodeBlock lang="jsx">{`// src/components/Footer.jsx
export default function Footer() {
  return <p>&copy; 2026 Kitob rastasi</p>
}`}</CodeBlock>
      <CodeBlock lang="jsx">{`// src/App.jsx
import Sarlavha from './components/Sarlavha.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Sarlavha />
      <p>Bu yerda kitoblar ro'yxati chiqadi.</p>
      <Footer />
    </>
  )
}`}</CodeBlock>
      <p>
        <code>main.jsx</code> ham <code>App</code>ni xuddi shu yo'l bilan import qilgan edi
        — endi siz ham shu zanjirning bir qismini yozdingiz.
      </p>

      <h3>Default va named eksport</h3>
      <p>Moduldan narsani eksport qilishning ikki usuli bor:</p>
      <CodeBlock lang="jsx">{`// Default eksport — faylda faqat BITTA bo'ladi
export default function Sarlavha() { ... }
import Sarlavha from './Sarlavha.jsx'          // qavssiz, nomni o'zingiz tanlaysiz

// Named eksport — faylda bir nechta bo'lishi mumkin
export function Tugma() { ... }
export function Belgi() { ... }
import { Tugma, Belgi } from './ui.jsx'       // jingalak qavs ichida, nom AYNAN bir xil`}</CodeBlock>
      <p>
        Bu kursda odat shunday: <strong>bitta fayl — bitta asosiy komponent — default
        eksport</strong>. Named eksportni bir faylda bir nechta kichik, bog'liq yordamchi
        bo'lganda ishlatamiz. Muhimi — bir loyihada bitta uslubni izchil qo'llash.
      </p>

      <h3>Komponentni komponent ichida e'lon qilmang</h3>
      <p>
        Komponentlar har doim faylning eng yuqori darajasida e'lon qilinadi, boshqa
        komponentning funksiyasi ichida emas:
      </p>
      <CodeBlock lang="jsx">{`// XATO — Karta har safar App chizilganda QAYTA yaratiladi
function App() {
  function Karta() {
    return <div>...</div>
  }
  return <Karta />
}

// TO'G'RI — ikkalasi ham yuqori darajada
function Karta() {
  return <div>...</div>
}

function App() {
  return <Karta />
}`}</CodeBlock>
      <p>
        Birinchi variant hozircha ishlayotgandek ko'rinadi, lekin state qo'shganingizda (13-dars){' '}
        <code>Karta</code> har renderda "yangi" komponent bo'lib qoladi va ichidagi
        ma'lumotlar har safar o'chib ketadi. Bu nima uchun shunday ekanini 21-darsda ko'ramiz.
      </p>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Kichik harfli komponent nomi.</strong> <code>{'<kartochka />'}</code>{' '}
            chaqirilmaydi — React uni noma'lum HTML tegi deb biladi.
          </li>
          <li>
            <strong><code>export default</code>ni unutish.</strong> Sahifa oq bo'lib qoladi,
            brauzer konsolida esa <code>The requested module '/src/components/Sarlavha.jsx' does
            not provide an export named 'default'</code> xatosi chiqadi (<code>npm run build</code>{' '}
            esa <code>"default" is not exported</code> deb to'xtaydi). Bu xatoni ko'rsangiz,
            eksport/importni tekshiring.
          </li>
          <li>
            <strong>Default va named'ni adashtirish.</strong> <code>export default</code> qilingan
            narsani <code>{'import { Sarlavha }'}</code> deb (yoki teskarisi) import qilish ham
            xuddi shunday "does not provide an export named ..." xatosini beradi.
          </li>
          <li>
            <strong>Komponentni boshqa komponent ichida e'lon qilish</strong> — har renderda
            yangi komponent yaratiladi va uning state'i yo'qoladi.
          </li>
          <li>
            <strong>Komponentni funksiya sifatida chaqirish</strong> — <code>{'{Sarlavha()}'}</code>{' '}
            o'rniga doim <code>{'<Sarlavha />'}</code>.
          </li>
        </ul>
      </Callout>

      <Quiz
        question={`Bir talaba komponent funksiyasini "kartochka" deb (kichik harf bilan) nomlab, JSX ichida <kartochka /> deb yozdi. Ishga tushirganda nima bo'ladi?`}
        options={[
          "React funksiyani chaqirib, natijasini render qiladi",
          "React buni noma'lum HTML tegi deb hisoblab, funksiyani chaqirmaydi",
          "Build vaqtida JSX kompilyatsiya xatosi chiqadi",
          "React avtomatik ravishda nomni PascalCase'ga aylantirib oladi",
        ]}
        correctIndex={1}
        explanation="JSX teg nomining birinchi harfi kichik bo'lsa, React uni o'zgaruvchi (funksiya)ga havola deb emas, balki satr ko'rinishidagi HTML teg nomi deb talqin qiladi. Shu sababli kartochka funksiyasi chaqirilmaydi, konsolga esa noma'lum <kartochka> tegi haqida ogohlantirish chiqadi."
      />

      <Quiz
        question="Header.jsx faylida export function Header() {...} deb yozilgan. App.jsx'da import Header from './Header.jsx' deb import qilib, <Header /> ni chizganda nima bo'ladi?"
        options={[
          "Xato: Header.jsx'da default eksport yo'q",
          "Hammasi ishlaydi — React farqni o'zi aniqlaydi",
          "Header chiziladi, lekin konsolda ogohlantirish chiqadi",
          "Build vaqtida Header avtomatik default eksportga aylanadi",
        ]}
        correctIndex={0}
        explanation="Named eksport faqat jingalak qavs bilan, aynan shu nom bilan import qilinadi: import { Header } from './Header.jsx'. Qavssiz import fayldagi default eksportni qidiradi; u yo'q bo'lgani uchun brauzer modulni yuklay olmaydi (does not provide an export named 'default'), sahifa oq bo'lib qoladi, npm run build esa xato bilan to'xtaydi."
      />

      <Exercise title="1-mashq: Menyu komponenti">
        <p>
          Quyidagi <code>App</code> komponenti bitta sarlavha va bitta menyuni ekranga chiqarishi
          kerak, lekin hozircha faqat sarlavhani o'zi yozadi. Alohida <code>Menyu</code> nomli
          komponent yozing — u <code>{'<nav>'}</code> ichida uchta <code>{'<p>'}</code> qatorini
          ("Bosh sahifa", "Kitoblar", "Aloqa") qaytarsin — so'ng uni <code>App</code> ichiga
          joylashtiring.
        </p>
        <CodeBlock lang="jsx">{`function App() {
  return (
    <>
      <h1>Kitob rastasi</h1>
      {/* Menyu shu yerda chiqishi kerak */}
    </>
  )
}`}</CodeBlock>
        <Solution>
          <CodeBlock lang="jsx">{`function Menyu() {
  return (
    <nav>
      <p>Bosh sahifa</p>
      <p>Kitoblar</p>
      <p>Aloqa</p>
    </nav>
  )
}

function App() {
  return (
    <>
      <h1>Kitob rastasi</h1>
      <Menyu />
    </>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: fayllarga ajratish">
        <p>
          1-mashqdagi kodni loyihangizda uchta faylga ajrating: <code>Sarlavha</code> va{' '}
          <code>Menyu</code> komponentlari <code>src/components/</code> ichida o'z fayllarida
          (default eksport bilan) bo'lsin, <code>App.jsx</code> esa ularni import qilib
          ishlatsin. Keyin <code>Menyu</code>ni <code>App</code>da ikki marta — sarlavha ustida
          va footer o'rnida — chizib ko'ring.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`// src/components/Sarlavha.jsx
export default function Sarlavha() {
  return <h1>Kitob rastasi</h1>
}`}</CodeBlock>
          <CodeBlock lang="jsx">{`// src/components/Menyu.jsx
export default function Menyu() {
  return (
    <nav>
      <p>Bosh sahifa</p>
      <p>Kitoblar</p>
      <p>Aloqa</p>
    </nav>
  )
}`}</CodeBlock>
          <CodeBlock lang="jsx">{`// src/App.jsx
import Sarlavha from './components/Sarlavha.jsx'
import Menyu from './components/Menyu.jsx'

export default function App() {
  return (
    <>
      <Menyu />
      <Sarlavha />
      <p>Kitoblar ro'yxati shu yerda bo'ladi.</p>
      <Menyu />
    </>
  )
}`}</CodeBlock>
          <p>
            Bitta komponent ikki joyda ishlatildi — bu qayta ishlatishning eng oddiy ko'rinishi.
            Menyuga yangi band qo'shsangiz, ikkala joyda ham birdaniga paydo bo'ladi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Funksional komponent — JSX qaytaradigan oddiy JavaScript funksiyasi; uni maxsus
          sintaksis bilan e'lon qilish shart emas.
        </li>
        <li>
          Komponent nomi har doim katta harf bilan (PascalCase) boshlanadi, chunki JSX teg nomining
          birinchi harfiga qarab uni "o'zgaruvchiga havola" (komponent chaqiruvi) yoki "satr
          ko'rinishidagi HTML teg nomi" deb talqin qiladi.
        </li>
        <li>
          Kichik harf bilan boshlangan teg — masalan, <code>{'<sarlavha />'}</code> — React
          tomonidan noma'lum HTML elementi deb qabul qilinadi, komponent funksiyasi esa
          chaqirilmaydi.
        </li>
        <li>
          Komponentlar bir-birining JSX'i ichiga oddiy teg kabi joylashtirilib (nested),
          kichikroq komponentlardan kattaroq sahifa yig'iladi.
        </li>
        <li>
          Odatda har bir komponent o'z <code>.jsx</code> faylida, <code>export default</code>{' '}
          bilan yoziladi va <code>import Nom from './Nom.jsx'</code> orqali ulanadi; named
          eksport esa jingalak qavs bilan import qilinadi.
        </li>
        <li>
          Komponentni boshqa komponent ichida e'lon qilmang — har doim faylning yuqori
          darajasida.
        </li>
        <li>
          Komponentni har doim JSX tegi orqali (<code>{'<Komponent />'}</code>) chaqiring, oddiy
          funksiya chaqiruvi (<code>Komponent()</code>) sifatida emas.
        </li>
      </KeyPoints>
    </>
  )
}
