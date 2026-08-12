import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Funksional komponentlar',
  section: 'Komponentlar va Props',
}

export default function FunksionalKomponentlarLesson() {
  return (
    <>
      <p>
        1-darsda komponent — JSX qaytaradigan oddiy JavaScript funksiyasi ekanini, 2-darsda esa
        JSX'ning o'zi qanday ishlashini ko'rdik. Endi bu ikkisini birlashtirib, komponentlarni
        qanday to'g'ri nomlash va bir-birining ichiga qanday joylashtirish (nesting) kerakligini
        chuqurroq ko'rib chiqamiz.
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
        1-darsda komponent nomini doim katta harf bilan boshlashni aytib, sababini keyingi darsga
        qoldirgan edik. Mana javob: bu shunchaki uslub masalasi emas, JSX'ning ishlash tartibi
        shuni talab qiladi.
      </p>
      <p>
        2-darsda ko'rganimizdek, JSX kompilyatsiya vaqtida <code>React.createElement()</code>{' '}
        chaqiruviga aylanadi. Bu jarayonda React teg nomining birinchi harfiga qarab, uni ikki xil
        yo'l bilan talqin qiladi:
      </p>
      <ul>
        <li>
          Kichik harf bilan boshlansa (<code>{'<div>'}</code>, <code>{'<p>'}</code>,{' '}
          <code>{'<sarlavha>'}</code>) — React buni <strong>oddiy DOM tegi nomi</strong> (satr
          sifatida) deb hisoblaydi va brauzerdan aynan shu nomli HTML elementini so'raydi.
        </li>
        <li>
          Katta harf bilan boshlansa (<code>{'<Sarlavha>'}</code>) — React buni{' '}
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
      <Callout type="warning" title="Konsolda nima ko'rinadi">
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

      <Quiz
        question={`Bir talaba komponent funksiyasini "kartochka" deb (kichik harf bilan) nomlab, JSX ichida <kartochka /> deb yozdi. Ishga tushirganda nima bo'ladi?`}
        options={[
          "React funksiyani chaqirib, natijasini render qiladi",
          "React buni noma'lum HTML tegi deb hisoblab, funksiyani chaqirmaydi",
          "Build vaqtida JSX kompilyatsiya xatosi chiqadi",
          "React avtomatik ravishda nomni PascalCase'ga aylantirib oladi",
        ]}
        correctIndex={1}
        explanation="JSX teg nomining birinchi harfi kichik bo'lsa, React uni o'zgaruvchi (funksiya)ga havola deb emas, balki satr ko'rinishidagi HTML teg nomi deb talqin qiladi. Shu sababli kartochka funksiyasi chaqirilmaydi, ekranga esa noma'lum <kartochka> tegi haqida ogohlantirish chiqadi."
      />

      <Exercise title="Mashq">
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
          Komponentni har doim JSX tegi orqali (<code>{'<Komponent />'}</code>) chaqiring, oddiy
          funksiya chaqiruvi (<code>Komponent()</code>) sifatida emas.
        </li>
      </KeyPoints>
    </>
  )
}
