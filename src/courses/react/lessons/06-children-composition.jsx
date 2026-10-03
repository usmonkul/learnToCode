import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "children va composition",
  section: "UI'ni tasvirlash",
}

export default function ChildrenCompositionLesson() {
  return (
    <>
      <h2>Muammo: ichi har xil bo'lgan bir xil "qobiq"</h2>
      <p>
        Oldingi darsda props orqali komponentga ma'lumot uzatishni ko'rdik — <code>sarlavha</code>
        , <code>muallif</code> kabi atributlar. Lekin ba'zan komponentga uzatiladigan narsa oddiy
        matn yoki son emas, balki butun boshli JSX bo'lishi kerak: masalan, "shu ramka ichiga
        istalgan narsani joylashtir" degan vazifa. Aynan shu holat uchun React'da maxsus, o'zi
        avtomatik yaratiladigan prop bor — <code>children</code> (bolalar).
      </p>

      <h2>
        <code>children</code> nima?
      </h2>
      <p>
        Komponent tegining ochilish va yopilish qismi orasiga yozilgan har qanday JSX —
        avtomatik ravishda o'sha komponentning <code>children</code> propiga aylanadi. Buni alohida
        belgilash shart emas, JSX'ning o'zi buni "bolalar" (children) deb nomlaydi va uzatadi:
      </p>
      <CodeBlock lang="jsx">{`function Ramka({ children }) {
  return <div className="ramka">{children}</div>
}

function App() {
  return (
    <Ramka>
      <p>Bu matn Ramka ichiga joylashtirildi.</p>
    </Ramka>
  )
}`}</CodeBlock>
      <p>
        Bu yerda <code>{'<Ramka>...</Ramka>'}</code> ichiga yozilgan{' '}
        <code>{'<p>Bu matn Ramka ichiga joylashtirildi.</p>'}</code> — <code>Ramka</code>{' '}
        komponentiga <code>children</code> nomli prop sifatida keladi, xuddi{' '}
        <code>{'<Ramka sarlavha="...">'}</code> deb yozilganda <code>sarlavha</code> propi kelgani
        kabi. Farqi shundaki, <code>children</code> JSX atributi ko'rinishida emas, teglar orasiga
        joylashtirilgan mazmun orqali beriladi. <code>Ramka</code> funksiyasi o'zining ichiga nima
        kelayotganini bilmaydi va bilishi ham shart emas — u shunchaki{' '}
        <code>{'{children}'}</code>ni qayerga qo'yishni hal qiladi.
      </p>
      <Callout type="tip" title="Funksiya argumentiga o'xshating">
        <code>children</code>ni ham oddiy prop deb qarang — u boshqa propslardan faqat kelish
        yo'li bilan farq qiladi: <code>{'<Komponent nomi="...">'}</code> deb atribut sifatida emas,{' '}
        <code>{'<Komponent>...mazmun...</Komponent>'}</code> deb teglar orasiga yozib beriladi.
        Ikkisi ham xuddi shu <code>props</code> obyektining ichida yashaydi:{' '}
        <code>{'props.children'}</code>.
      </Callout>
      <p>
        Agar komponent teglari orasiga hech narsa yozilmasa (masalan,{' '}
        <code>{'<Ramka />'}</code> deb o'z-o'zini yopadigan holda chaqirilsa), u holda{' '}
        <code>children</code> propi <code>undefined</code> bo'ladi — bu ham odatiy holat, boshqa
        har qanday berilmagan prop kabi.
      </p>

      <h2>Umumiy o'rovchi (wrapper) komponent qurish</h2>
      <p>
        <code>children</code>ning eng foydali qo'llanilishi — bir xil "qobiq" (masalan, ramka,
        soya, chekka chizig'i) berib, ichini har safar boshqa mazmun bilan to'ldirish mumkin
        bo'lgan umumiy komponent yaratish. Masalan, kartochka ko'rinishidagi panel:
      </p>
      <CodeBlock lang="jsx">{`function Panel({ children }) {
  return (
    <div className="panel">
      {children}
    </div>
  )
}

function App() {
  return (
    <>
      <Panel>
        <h3>Yangiliklar</h3>
        <p>Bugun kutubxonaga 5 ta yangi kitob keldi.</p>
      </Panel>

      <Panel>
        <h3>E'lon</h3>
        <p>Dushanba kuni kutubxona yopiq bo'ladi.</p>
      </Panel>
    </>
  )
}`}</CodeBlock>
      <p>
        <code>Panel</code> komponenti o'zi hech qanday sarlavha yoki matn haqida bilmaydi — u
        faqat "har qanday mazmunni shu uslub bilan o'rab ber" degan vazifani bajaradi. Ikkinchi va
        undan keyingi <code>Panel</code> chaqiruvlarida mazmun butunlay boshqacha, lekin tashqi
        ko'rinish (ramka, soya) bir xil qoladi. Bu — <strong>o'rovchi (wrapper)</strong>{' '}
        komponentning klassik naqshi: tashqi ko'rinishni bir joyda belgilab, ichki mazmunni ochiq
        qoldirish.
      </p>
      <p>
        <code>children</code>ni boshqa props bilan birga ishlatish ham juda keng tarqalgan:
        qobiqning o'zgaruvchan, lekin oddiy qismi (sarlavha) — prop, erkin mazmun esa —{' '}
        <code>children</code>:
      </p>
      <CodeBlock lang="jsx">{`function Panel({ sarlavha, children }) {
  return (
    <div className="panel">
      <h3 className="panel-sarlavha">{sarlavha}</h3>
      <div className="panel-tanasi">{children}</div>
    </div>
  )
}

<Panel sarlavha="Yangiliklar">
  <p>Bugun kutubxonaga 5 ta yangi kitob keldi.</p>
  <a href="/yangiliklar">Hammasi</a>
</Panel>`}</CodeBlock>

      <h2>
        Composition (tarkib qurish) va konfiguratsiya (configuration)
      </h2>
      <p>
        <code>children</code>siz ham xuddi shunga o'xshash natijaga erishish mumkin edi — masalan,{' '}
        <code>Panel</code>ga <code>sarlavha</code> va <code>matn</code> nomli propslar qo'shib:
      </p>
      <CodeBlock lang="jsx">{`function Panel({ sarlavha, matn }) {
  return (
    <div className="panel">
      <h3>{sarlavha}</h3>
      <p>{matn}</p>
    </div>
  )
}`}</CodeBlock>
      <p>
        Bu yondashuv ishlaydi, lekin unga qulaylik qo'shmoqchi bo'lgan sari — masalan, ba'zi
        panellarga rasm, ba'zilariga tugma, ba'zilariga ro'yxat kerak bo'lsa — <code>Panel</code>{' '}
        propslar ro'yxati tobora uzayib ketadi: <code>rasm</code>, <code>tugmaMatni</code>,{' '}
        <code>royxatElementlari</code> va hokazo. Bu — <strong>konfiguratsiya</strong> yondashuvi:
        komponentning ichki tuzilishini har bir holat uchun alohida propslar orqali "sozlab"
        beramiz.
      </p>
      <p>
        <code>children</code> bilan qurilgan <code>Panel</code> esa bunday muammoga umuman
        duch kelmaydi — chunki u ichki tuzilishni oldindan belgilamaydi, shunchaki istalgan JSX'ni
        qabul qiladi. Rasm kerak bo'lsa — <code>{'<Panel><img ... /></Panel>'}</code>, tugma kerak
        bo'lsa — <code>{'<Panel><button>...</button></Panel>'}</code>, hatto bir nechta elementni
        birga ham joylashtirish mumkin. <code>Panel</code>ning o'zini o'zgartirish shart emas.
        Bu — <strong>composition</strong> deb ataladi: yangi propslar qo'shish o'rniga, kichik
        komponentlarni bir-birining ichiga joylashtirib, kattaroq va moslashuvchan natija olish.
      </p>
      <Callout type="note" title="Qachon qaysi biri kerak?">
        Konfiguratsiya (ko'p propslar) — komponent ichidagi mazmun har doim taxminan bir xil
        tuzilishga ega bo'lganda mos keladi (masalan, <code>nomi</code> va <code>narx</code>i
        bo'lgan mahsulot kartasi). Composition (<code>children</code>) esa — komponentning vazifasi
        faqat "tashqi qobiq" yoki "joylashuv" bo'lib, ichidagi mazmun har safar butunlay boshqacha
        bo'lishi mumkin bo'lgan holatlarda kuchliroq ishlaydi — xuddi <code>Panel</code> yoki
        sahifa maketi (layout) kabi.
      </Callout>

      <h2>Bir nechta children joyi — alohida propslar sifatida</h2>
      <p>
        Ba'zan bitta <code>children</code>ning o'zi kamlik qiladi — masalan, sahifa maketida
        "yon panel" va "asosiy mazmun" kabi ikki alohida joy kerak bo'lishi mumkin. Bunday holatda
        JSX'ni oddiy prop qiymati sifatida ham uzatish mumkin, chunki JSX — shunchaki bir qiymat:
      </p>
      <CodeBlock lang="jsx">{`function Maket({ yonPanel, asosiyMazmun }) {
  return (
    <div className="maket">
      <aside>{yonPanel}</aside>
      <main>{asosiyMazmun}</main>
    </div>
  )
}

function App() {
  return (
    <Maket
      yonPanel={<p>Menyu</p>}
      asosiyMazmun={<p>Sahifaning asosiy matni</p>}
    />
  )
}`}</CodeBlock>
      <p>
        Bu yerda <code>yonPanel</code> va <code>asosiyMazmun</code> — oddiy propslar, ularning
        qiymati esa JSX. <code>children</code> — aynan shu naqshning maxsus, avtomatik holati:
        u faqat komponent teglari orasiga yozilgan mazmun uchun ishlaydi, qolgan barcha "JSX joyi"
        kerak bo'lgan hollarda esa oddiy nomlangan prop ishlatiladi.
      </p>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong><code>{'{children}'}</code>ni chizishni unutish.</strong> O'rovchi
            komponent <code>children</code>ni qabul qilib, uni JSX'ga qo'ymasa, teglar orasidagi
            mazmun jimgina yo'qoladi — hech qanday xato chiqmaydi.
          </li>
          <li>
            <strong>Destructuring'da nomni o'zgartirish.</strong> Prop nomi doim{' '}
            <code>children</code>; <code>{'function Panel({ child })'}</code> yoki{' '}
            <code>{'({ bolalar })'}</code> deb yozsangiz, qiymat <code>undefined</code> bo'ladi.
          </li>
          <li>
            <strong>Har narsa uchun yangi prop qo'shish.</strong> <code>rasm</code>,{' '}
            <code>tugmaMatni</code>, <code>tugma2Matni</code>... ro'yxati uzayib ketayotgan bo'lsa
            — komponentni <code>children</code> qabul qiladigan qilib qayta yozish vaqti keldi.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="Panel komponenti { children } destructuring orqali qabul qilinadi va return { children } ni <div> ichida chiqaradi. <Panel><h3>Salom</h3></Panel> deb chaqirilganda, ekranga nima chiqadi?"
        options={[
          "<div> ichida <h3>Salom</h3>",
          "Faqat bo'sh <div>, chunki Panel h3 haqida bilmaydi",
          "Build vaqtida xatolik, chunki Panel hech qanday prop kutmagan",
          "<h3>Salom</h3> va uning ostida yana bo'sh <div>",
        ]}
        correctIndex={0}
        explanation="Panel tegi ichiga yozilgan <h3>Salom</h3> avtomatik ravishda children propiga aylanadi. Panel esa {children}ni <div> ichida chiqaradi, shuning uchun natija <div> ichidagi <h3>Salom</h3> bo'ladi."
      />

      <Quiz
        question="Sizga Modal (oyna) komponenti kerak: har doim bir xil soya va yopish tugmasi bor, lekin ichida ba'zan forma, ba'zan rasm, ba'zan ogohlantirish matni bo'ladi. Qaysi yondashuv to'g'ri?"
        options={[
          "Modal children qabul qilsin va uni qobiq ichida chizsin",
          "Har bir holat uchun alohida prop: formaMaydonlari, rasmManzili, ogohlantirishMatni",
          "Har bir holat uchun alohida FormaModal, RasmModal, OgohlantirishModal komponentlari",
          "Modal ichida if bilan har bir holatni tekshirish",
        ]}
        correctIndex={0}
        explanation="Modal'ning vazifasi — tashqi qobiq (soya, yopish tugmasi). Ichidagi mazmun butunlay har xil bo'lgani uchun composition — children — eng moslashuvchan yechim: Modal'ni o'zgartirmasdan istalgan mazmunni joylashtirish mumkin."
      />

      <Exercise title="1-mashq: Kartochka o'rovchisi">
        <p>
          <code>Kartochka</code> nomli o'rovchi (wrapper) komponent yozing — u{' '}
          <code>children</code>ni qabul qilib, uni <code>{'<div className="kartochka">'}</code>{' '}
          ichida qaytarsin. So'ng <code>App</code> ichida <code>Kartochka</code>ni ikki marta
          chaqiring: birinchisida ichiga bitta kitobning sarlavhasi va muallifini (
          <code>{'<h3>'}</code> va <code>{'<p>'}</code> orqali), ikkinchisida esa butunlay boshqa
          mazmun — masalan, rasm va tugma — joylashtiring.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`function Kartochka({ children }) {
  return <div className="kartochka">{children}</div>
}

function App() {
  return (
    <>
      <Kartochka>
        <h3>O'tkan kunlar</h3>
        <p>Abdulla Qodiriy</p>
      </Kartochka>

      <Kartochka>
        <img src="reklama.jpg" alt="Reklama banneri" />
        <button>Batafsil</button>
      </Kartochka>
    </>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: sahifa maketi">
        <p>
          <code>SahifaMaketi</code> komponentini yozing: u <code>sarlavha</code> (satr),{' '}
          <code>yonPanel</code> (JSX) va <code>children</code> props'larini olsin. Natija:
          tepada <code>{'<header>'}</code> ichida sarlavha, pastda yonma-yon{' '}
          <code>{'<aside>'}</code> (yon panel) va <code>{'<main>'}</code> (children). So'ng uni
          "Kitoblar" sahifasi uchun ishlating: yon panelda janrlar (oddiy <code>{'<p>'}</code>
          lar), asosiy qismda esa 5-darsdagi <code>KitobKartasi</code>dan ikkitasi.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`function SahifaMaketi({ sarlavha, yonPanel, children }) {
  return (
    <div className="maket">
      <header>
        <h1>{sarlavha}</h1>
      </header>
      <div className="maket-tanasi">
        <aside>{yonPanel}</aside>
        <main>{children}</main>
      </div>
    </div>
  )
}

function App() {
  return (
    <SahifaMaketi
      sarlavha="Kitoblar"
      yonPanel={
        <>
          <p>Roman</p>
          <p>She'riyat</p>
          <p>Tarix</p>
        </>
      }
    >
      <KitobKartasi sarlavha="O'tkan kunlar" muallif="Abdulla Qodiriy" />
      <KitobKartasi sarlavha="Kecha va kunduz" muallif="Cho'lpon" />
    </SahifaMaketi>
  )
}`}</CodeBlock>
          <p>
            Yon panel uchun bir nechta element kerak bo'lgani uchun ular fragmentga o'raldi —
            prop qiymati bitta JSX qiymati bo'lishi kerak.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>children</code> — komponent teglarining ochilish va yopilish qismi orasiga
          yozilgan JSX'dan avtomatik hosil bo'ladigan maxsus prop; alohida atribut sifatida
          yozilmaydi.
        </li>
        <li>
          Komponent teglari orasida hech narsa bo'lmasa (yoki komponent{' '}
          <code>{'<Komponent />'}</code> ko'rinishida o'z-o'zini yopib chaqirilsa),{' '}
          <code>children</code> — <code>undefined</code> bo'ladi.
        </li>
        <li>
          <code>children</code> yordamida umumiy o'rovchi (wrapper) komponent qurish mumkin —
          tashqi ko'rinish (ramka, soya) bir joyda belgilanadi, ichki mazmun esa har safar
          erkin o'zgaradi.
        </li>
        <li>
          Composition (tarkib qurish) — kichik komponentlarni bir-birining ichiga joylashtirib
          natija olish — ko'p sonli konfiguratsiya propslariga qaraganda moslashuvchan, ayniqsa
          komponent vazifasi faqat "qobiq" yoki "joylashuv" bo'lganda.
        </li>
        <li>
          Bitta <code>children</code>dan tashqari, JSX'ni istalgan oddiy prop qiymati sifatida
          ham uzatish mumkin (masalan, <code>{'yonPanel={<p>...</p>}'}</code>) — bu bir nechta
          alohida "JSX joyi" kerak bo'lganda foydali.
        </li>
      </KeyPoints>
    </>
  )
}
