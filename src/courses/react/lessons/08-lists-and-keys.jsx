import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import Figure from '@/components/content/Figure'
import listKeys from '@/assets/list-keys.svg'

export const meta = {
  title: "Ro'yxatlar va key'lar",
  section: "UI'ni tasvirlash",
}

export default function ListsAndKeysLesson() {
  return (
    <>
      <h2>Muammo: 50 ta kartani qo'lda yozib bo'lmaydi</h2>
      <p>
        5-darsda <code>KitobKartasi</code>ni ikki marta, qo'lda chaqirdik. Lekin do'konda 50 ta
        kitob bo'lsa-chi? Yoki ular serverdan keladi va ularning soni oldindan noma'lum
        bo'lsa? Har birini <code>{'<KitobKartasi ... />'}</code> deb qo'lda yozish imkonsiz.
      </p>
      <p>
        Ko'pincha ilovada ma'lumot bitta obyekt emas, balki obyektlar massivi ko'rinishida
        keladi — kitoblar ro'yxati, xarid savatchasi, sharhlar. Bunday massivni ekranga
        chiqarish uchun har bir elementni bir xil JSX andozasi bo'yicha komponentga aylantirish
        kerak bo'ladi. Aynan shu vazifa uchun JavaScript'ning odatiy massiv metodi —{' '}
        <code>.map()</code> — React'da ro'yxat render qilishning standart usuliga aylangan.
      </p>

      <h2>
        <code>.map()</code> yordamida massivni JSX ro'yxatiga aylantirish
      </h2>
      <p>
        <code>.map()</code> — massivning har bir elementini qayta ishlab, yangi massiv
        qaytaradigan metod. React uchun bu juda qulay: massivdagi har bir ma'lumotni bitta JSX
        elementiga aylantirib, natijada JSX elementlaridan iborat yangi massiv olamiz — buni esa
        JSX ichida to'g'ridan-to'g'ri chiqarish mumkin:
      </p>
      <CodeBlock lang="jsx">{`const mevalar = ['Olma', 'Nok', 'Uzum']

function MevalarRoyxati() {
  return (
    <ul>
      {mevalar.map((meva) => (
        <li key={meva}>{meva}</li>
      ))}
    </ul>
  )
}`}</CodeBlock>
      <p>
        Bu yerda <code>{'{mevalar.map(...)}'}</code> — <code>{'<li>'}</code> elementlaridan
        iborat massiv qaytaradi, va React bu massivni xuddi bir nechta alohida element yozilgandek
        ketma-ket render qiladi. E'tibor bering — har bir <code>{'<li>'}</code>ga{' '}
        <code>key</code> nomli maxsus prop berilgan. Bu — tasodifiy qo'shimcha emas, React'ning
        o'zi talab qiladigan majburiy qoida.
      </p>

      <h2>
        Nega React <code>key</code> talab qiladi?
      </h2>
      <p>
        React har bir re-render (qayta chizish) vaqtida eski va yangi JSX daraxtini taqqoslaydi
        va faqat farqni haqiqiy DOM'ga qo'llaydi (bu jarayon "reconciliation" — moslashtirish deb
        ataladi). Bitta-bitta elementlar uchun bu oson: props o'zgargan bo'lsa, o'sha elementni
        yangilaydi. Lekin ro'yxat holatida React'ga bitta savol tug'iladi: "eski ro'yxatdagi
        uchinchi element, yangi ro'yxatdagi ham xuddi o'sha elementmi, yoki bu boshqa,
        yangi qo'shilgan elementmi?" <code>key</code> — aynan shu savolga javob beradi: u har bir
        elementga ro'yxat qayta chizilganda ham saqlanadigan <strong>barqaror shaxsni</strong>{' '}
        beradi. <code>key</code> yordamida React elementlarni pozitsiyasi bo'yicha emas, balki
        shaxsi bo'yicha moslashtiradi — qaysi element o'zgarmagan, qaysi biri yangi qo'shilgan,
        qaysi biri o'chirilgan yoki qayta tartiblangan ekanini aniq biladi.
      </p>
      <Figure
        src={listKeys}
        alt="Chapda oldingi render: v1 va v2 elementlari. O'ngda yangi render: tepada yangi v3, pastda o'sha v1 va v2. Bir xil key'li elementlar strelka bilan bog'langan."
        caption="1-rasm: ro'yxat boshiga element qo'shilganda React eski elementlarni key bo'yicha topadi"
      />
      <Callout type="tip" title="key — prop emas, ko'rsatma">
        <code>key</code> odatdagi propga o'xshab ko'rinsa-da, u komponentning o'ziga{' '}
        <code>props.key</code> sifatida uzatilmaydi — u faqat React'ning ichki mexanizmi uchun,
        "bu element qaysi ma'lumotga tegishli" ekanini bildiruvchi maxsus ko'rsatma.
      </Callout>

      <h2>
        Yaxshi key va yomon key: massiv indeksi nega muammo tug'diradi
      </h2>
      <p>
        Yaxshi <code>key</code> — ma'lumotning o'zidan kelgan, <strong>barqaror va noyob</strong>{' '}
        identifikator: ma'lumotlar bazasidagi <code>id</code>, yoki element yaratilganda mahalliy
        generatsiya qilingan noyob id. Yomon <code>key</code> — massiv indeksi (
        <code>{'array.map((item, index) => ...)'}</code>dagi <code>index</code>), chunki indeks
        ma'lumotning o'ziga emas, uning ro'yxatdagi joriy o'rniga bog'liq — ro'yxat tartibi
        o'zgarsa, indeks ham o'zgaradi, garchi ma'lumotning o'zi o'zgarmagan bo'lsa ham.
      </p>
      <p>
        Buni aniq misolda ko'raylik. Faraz qilaylik, vazifalar ro'yxati bor va uni indeks bo'yicha
        key qilib chiqaryapmiz:
      </p>
      <CodeBlock lang="jsx">{`// XATO: key sifatida indeks ishlatilgan
const vazifalar = ['Non olish', "Uy yig'ishtirish"]

vazifalar.map((vazifa, index) => (
  <li key={index}>{vazifa}</li>
))
// Boshlang'ich holat: key=0 -> "Non olish", key=1 -> "Uy yig'ishtirish"`}</CodeBlock>
      <p>
        Endi ro'yxat boshiga yangi vazifa qo'shilganda nima bo'lishini kuzatamiz:
      </p>
      <CodeBlock lang="jsx">{`// Ro'yxat boshiga yangi element qo'shildi:
const vazifalar = ['Idish yuvish', 'Non olish', "Uy yig'ishtirish"]

// Endi: key=0 -> "Idish yuvish", key=1 -> "Non olish", key=2 -> "Uy yig'ishtirish"`}</CodeBlock>
      <p>
        "Non olish" degan vazifa ma'lumot sifatida o'zgarmagan, lekin uning indeksi{' '}
        <code>0</code>dan <code>1</code>ga o'tib ketdi. React esa <code>key=0</code>ni "eski
        element hali ham shu joyda" deb hisoblaydi va uning ichidagi matnni "Non olish"dan
        "Idish yuvish"ga <strong>yangilaydi</strong> — aslida bu butunlay yangi element bo'lishi
        kerak edi. Agar har bir <code>{'<li>'}</code> ichida masalan checkbox holati yoki input
        matni kabi o'z ichki state (holat)i bo'lsa (masalan, boshqarilmagan input yoki checkbox), bu holat ham noto'g'ri
        elementga "yopishib qoladi" — foydalanuvchi "Non olish"ni belgilab qo'ygan bo'lsa, endi
        checkbox "Idish yuvish" qatorida belgilangan holda qoladi, garchi u hech qachon
        belgilanmagan bo'lsa ham. Xuddi shunday muammo ro'yxat o'rtasidan element o'chirilganda
        yoki qayta tartiblanganda ham yuzaga keladi — indeks siljiganda, React noto'g'ri
        elementlarni bir-biriga moslashtirib qo'yadi.
      </p>
      <p>
        To'g'ri yechim — ma'lumotning o'zida mavjud, barqaror <code>id</code>dan foydalanish:
      </p>
      <CodeBlock lang="jsx">{`// TO'G'RI: key sifatida ma'lumotning o'z id'si
const vazifalar = [
  { id: 'v1', matn: 'Non olish' },
  { id: 'v2', matn: "Uy yig'ishtirish" },
]

vazifalar.map((vazifa) => (
  <li key={vazifa.id}>{vazifa.matn}</li>
))`}</CodeBlock>
      <p>
        Endi ro'yxat boshiga yangi element qo'shilsa ham, "Non olish" doim <code>key="v1"</code>{' '}
        bilan qoladi — uning ro'yxatdagi o'rni o'zgarishi mumkin, lekin shaxsi o'zgarmaydi. React
        buni aniq ko'rib, faqat haqiqatan yangi qo'shilgan elementni yaratadi, qolganlarini
        tegmasdan qoldiradi.
      </p>
      <Callout type="warning" title="Indeksni qachon ishlatsa bo'ladi?">
        Massiv indeksini <code>key</code> sifatida ishlatish faqat ro'yxat{' '}
        <strong>statik</strong> bo'lsa (hech qachon qayta tartiblanmasa, elementlar o'rtadan
        qo'shilmasa yoki o'chirilmasa) va elementlarda ichki state bo'lmasa — nisbatan xavfsiz.
        Lekin bunday kafolat kamdan-kam bo'ladi, shuning uchun odat sifatida har doim
        ma'lumotning o'z id'sidan foydalaning.
      </Callout>

      <h2>Ro'yxat elementini alohida komponentga ajratish</h2>
      <p>
        Odatda <code>map</code> ichida oddiy <code>{'<li>'}</code> emas, butun bir komponent
        chiziladi. Bunda <code>key</code> <strong>map qaytarayotgan eng tashqi elementga</strong>{' '}
        — ya'ni komponent tegiga — beriladi, komponentning ichidagi JSX'ga emas:
      </p>
      <CodeBlock lang="jsx">{`const kitoblar = [
  { id: 1, nomi: "O'tkan kunlar", muallif: 'Abdulla Qodiriy' },
  { id: 2, nomi: 'Kecha va kunduz', muallif: "Cho'lpon" },
  { id: 3, nomi: 'Sariq devni minib', muallif: "Xudoyberdi To'xtaboyev" },
]

function KitobKartasi({ nomi, muallif }) {
  return (
    <li className="karta">       {/* bu yerda key KERAK EMAS */}
      <h3>{nomi}</h3>
      <p>{muallif}</p>
    </li>
  )
}

function KitoblarRoyxati() {
  return (
    <ul>
      {kitoblar.map((kitob) => (
        <KitobKartasi key={kitob.id} nomi={kitob.nomi} muallif={kitob.muallif} />
      ))}
    </ul>
  )
}`}</CodeBlock>
      <p>
        <code>key</code> komponentga prop sifatida yetib bormaydi: <code>KitobKartasi</code>{' '}
        ichida <code>props.key</code> — <code>undefined</code>. Agar komponentga id kerak bo'lsa,
        uni alohida prop bilan uzating: <code>{'<KitobKartasi key={kitob.id} id={kitob.id} />'}</code>.
      </p>

      <h3>Bir nechta element qaytarish: Fragment va key</h3>
      <p>
        Agar har bir element uchun ikki qo'shni teg kerak bo'lsa (masalan, lug'atdagi{' '}
        <code>{'<dt>'}</code> va <code>{'<dd>'}</code>), qisqa <code>{'<>...</>'}</code>{' '}
        fragmentga key berib bo'lmaydi. Buning uchun to'liq <code>Fragment</code> yozuvi
        ishlatiladi:
      </p>
      <CodeBlock lang="jsx">{`import { Fragment } from 'react'

function Lugat({ sozlar }) {
  return (
    <dl>
      {sozlar.map((soz) => (
        <Fragment key={soz.id}>
          <dt>{soz.atama}</dt>
          <dd>{soz.tarjima}</dd>
        </Fragment>
      ))}
    </dl>
  )
}`}</CodeBlock>

      <h2>Filtrlash, saralash va bo'sh ro'yxat</h2>
      <p>
        Ro'yxatni chizishdan oldin uni oddiy JavaScript massiv metodlari bilan tayyorlab olish
        mumkin. <code>filter</code> va <code>map</code> zanjiri — React kodida eng ko'p
        uchraydigan naqshlardan biri:
      </p>
      <CodeBlock lang="jsx">{`function ArzonKitoblar({ kitoblar }) {
  const arzonlari = kitoblar
    .filter((kitob) => kitob.narx < 50000)
    .toSorted((a, b) => a.narx - b.narx)   // narx bo'yicha o'sish tartibida

  if (arzonlari.length === 0) {
    return <p>Hozircha arzon kitoblar yo'q.</p>
  }

  return (
    <ul>
      {arzonlari.map((kitob) => (
        <li key={kitob.id}>
          {kitob.nomi} — {kitob.narx} so'm
        </li>
      ))}
    </ul>
  )
}`}</CodeBlock>
      <p>Uchta narsaga e'tibor bering:</p>
      <ul>
        <li>
          <strong><code>toSorted</code>, <code>sort</code> emas.</strong> <code>sort()</code>{' '}
          massivni <em>joyida</em> o'zgartiradi — bu props'ni o'zgartirish bo'lardi (5-dars).{' '}
          <code>toSorted()</code> esa yangi, saralangan nusxa qaytaradi. Eski brauzerlar uchun
          muqobili — <code>{'[...kitoblar].sort(...)'}</code>.
        </li>
        <li>
          <strong>Bo'sh holat.</strong> Ro'yxat bo'sh bo'lsa, foydalanuvchiga bo'sh joy emas,
          tushunarli xabar ko'rsating — bu 7-darsdagi shartli render.
        </li>
        <li>
          <strong>Hisoblangan qiymat.</strong> <code>arzonlari</code> — har renderda props'dan
          qayta hisoblanadigan oddiy o'zgaruvchi. Uni alohida saqlash shart emas.
        </li>
      </ul>

      <Callout type="note" title="Ro'yxat o'zgarganda nima bo'ladi?">
        Hozircha ro'yxatlarimiz o'zgarmas — ular props yoki fayldagi massivdan keladi. Ro'yxatga
        element qo'shish, o'chirish va uni yangilash (state bilan) — 16-darsning mavzusi. O'sha
        yerda <code>key</code> nega muhimligini amalda ko'rasiz.
      </Callout>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Key'ni unutish.</strong> Konsolda{' '}
            <code>Each child in a list should have a unique "key" prop</code> ogohlantirishi
            chiqadi. Ilova ishlayveradi, lekin ro'yxat o'zgarganda xatolar paydo bo'ladi.
          </li>
          <li>
            <strong>Key'ni noto'g'ri joyga qo'yish.</strong> Key komponent <em>ichidagi</em>{' '}
            <code>{'<li>'}</code>ga emas, <code>map</code> qaytarayotgan komponent tegiga
            beriladi.
          </li>
          <li>
            <strong>Indeks yoki tasodifiy key.</strong> <code>{'key={index}'}</code> ro'yxat
            o'zgarganda muammo beradi; <code>{'key={Math.random()}'}</code> esa undan ham yomon —
            har renderda barcha elementlar "yangi" deb qayta yaratiladi.
          </li>
          <li>
            <strong>Takrorlanadigan key.</strong> Bir ro'yxat ichida ikki element bir xil key
            olsa (masalan, key sifatida nom ishlatilganda ikki "Olma" bo'lsa), React ularni
            adashtiradi. Key faqat bitta ro'yxat ichida noyob bo'lishi kerak.
          </li>
          <li>
            <strong><code>map</code>dan qaytarishni unutish.</strong>{' '}
            <code>{'kitoblar.map((k) => { <li>{k.nomi}</li> })'}</code> — jingalak qavsli
            funksiya tanasida <code>return</code> yo'q, natija — <code>undefined</code>lar
            massivi va bo'sh ekran. Oddiy qavs <code>{'(k) => (<li>...</li>)'}</code> yoki
            aniq <code>return</code> yozing.
          </li>
          <li>
            <strong><code>sort()</code> bilan props'ni buzish</strong> — <code>toSorted()</code>{' '}
            yoki nusxa ustida saralang.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="Xaridlar ro'yxatida har bir <li> ga key sifatida massiv indeksi (index) berilgan. Foydalanuvchi ro'yxat o'rtasidagi bitta mahsulotni o'chirsa, nima uchun bu muammoli bo'lishi mumkin?"
        options={[
          "Hech qanday muammo bo'lmaydi, chunki React key'ga umuman e'tibor bermaydi",
          "O'chirilgandan keyingi elementlarning indeksi siljiydi, va React ularni noto'g'ri eski elementlar bilan moslashtirib, ichki state yoki DOM holatini aralashtirib yuborishi mumkin",
          "Build vaqtida xatolik chiqadi, chunki index key sifatida taqiqlangan",
          "Ro'yxat butunlay ekrandan yo'qolib ketadi",
        ]}
        correctIndex={1}
        explanation="Element o'chirilganda undan keyingi barcha elementlarning indeksi bittaga kamayadi. React key=indeks bo'yicha eski va yangi elementlarni moslashtirganda, indeksi o'zgargan, lekin ma'lumoti aslida boshqa bo'lgan elementlarni bir xil deb hisoblaydi — natijada checkbox holati, input matni kabi ichki state noto'g'ri elementga yopishib qolishi mumkin. Shu sababli ma'lumotning o'z barqaror id'sini key sifatida ishlatish tavsiya etiladi."
      />

      <Quiz
        question="Quyidagi kodda ekran bo'sh qoladi, xato ham chiqmaydi: {kitoblar.map((kitob) => { <li key={kitob.id}>{kitob.nomi}</li> })}. Sabab nima?"
        options={[
          "Strelkali funksiya jingalak qavsli tanaga ega, lekin return yo'q — map undefined'lar qaytaradi",
          "key sifatida id ishlatib bo'lmaydi",
          "map JSX ichida ishlamaydi, oldin o'zgaruvchiga saqlash kerak",
          "li elementi ul ichida bo'lishi shart emas",
        ]}
        correctIndex={0}
        explanation="(x) => { ... } — funksiya tanasi; undan qiymat qaytishi uchun return kerak. (x) => ( ... ) esa ifodani avtomatik qaytaradi. return yo'q bo'lsa, map [undefined, undefined, ...] qaytaradi, va React undefined'ni hech narsa deb chizadi."
      />

      <Exercise title="1-mashq: talabalar ro'yxati">
        <p>
          Quyidagi massivni <code>.map()</code> yordamida ro'yxat qilib render qiluvchi
          komponent yozing:
        </p>
        <CodeBlock lang="jsx">{`const talabalar = [
  { id: 101, nomi: 'Malika' },
  { id: 102, nomi: 'Aziz' },
  { id: 103, nomi: 'Kamola' },
]`}</CodeBlock>
        <p>
          Har bir talaba nomini <code>{'<li>'}</code> ichida, to'g'ri (ma'lumotning o'z{' '}
          <code>id</code>sidan olingan) <code>key</code> bilan chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`const talabalar = [
  { id: 101, nomi: 'Malika' },
  { id: 102, nomi: 'Aziz' },
  { id: 103, nomi: 'Kamola' },
]

function TalabalarRoyxati() {
  return (
    <ul>
      {talabalar.map((talaba) => (
        <li key={talaba.id}>{talaba.nomi}</li>
      ))}
    </ul>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: kategoriyali menyu">
        <p>
          Quyidagi taomlar massivi berilgan. <code>Menyu</code> komponentini yozing: u faqat{' '}
          <code>mavjud: true</code> bo'lgan taomlarni, narx bo'yicha arzondan qimmatga saralab,
          har birini alohida <code>TaomQatori</code> komponenti orqali chiqarsin ("Lag'mon —
          28000 so'm"). Agar mavjud taom bo'lmasa, "Bugun menyu bo'sh" yozuvi chiqsin. Asl
          massivni o'zgartirmang.
        </p>
        <CodeBlock lang="jsx">{`const taomlar = [
  { id: 't1', nomi: 'Osh', narx: 35000, mavjud: true },
  { id: 't2', nomi: "Lag'mon", narx: 28000, mavjud: true },
  { id: 't3', nomi: 'Manti', narx: 30000, mavjud: false },
  { id: 't4', nomi: "Sho'rva", narx: 25000, mavjud: true },
]`}</CodeBlock>
        <Solution>
          <CodeBlock lang="jsx">{`function TaomQatori({ nomi, narx }) {
  return (
    <li>
      {nomi} — {narx} so'm
    </li>
  )
}

function Menyu({ taomlar }) {
  const korsatiladigan = taomlar
    .filter((taom) => taom.mavjud)
    .toSorted((a, b) => a.narx - b.narx)

  if (korsatiladigan.length === 0) {
    return <p>Bugun menyu bo'sh</p>
  }

  return (
    <ul>
      {korsatiladigan.map((taom) => (
        <TaomQatori key={taom.id} nomi={taom.nomi} narx={taom.narx} />
      ))}
    </ul>
  )
}

// <Menyu taomlar={taomlar} />
// Natija: Sho'rva — 25000, Lag'mon — 28000, Osh — 35000`}</CodeBlock>
          <p>
            Key <code>TaomQatori</code> tegiga berildi, ichidagi <code>{'<li>'}</code>ga emas.{' '}
            <code>toSorted</code> asl <code>taomlar</code> massivini o'zgarishsiz qoldiradi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>.map()</code> massivning har bir elementini JSX elementiga aylantiradi, natijada
          hosil bo'lgan massivni JSX ichida to'g'ridan-to'g'ri chiqarish mumkin.
        </li>
        <li>
          React re-render vaqtida eski va yangi ro'yxatni moslashtirish uchun <code>key</code>ga
          muhtoj — u har bir elementga barqaror shaxs beradi, shunda React qaysi element
          o'zgarmagan, qaysi biri yangi yoki o'chirilgan ekanini biladi.
        </li>
        <li>
          Yaxshi <code>key</code> — ma'lumotning o'zidan kelgan noyob va barqaror{' '}
          <code>id</code>. Massiv indeksini key qilib ishlatish, ro'yxat qayta tartiblanganda,
          o'rtasiga element qo'shilganda yoki o'chirilganda elementlarni noto'g'ri
          moslashtirishga olib keladi.
        </li>
        <li>
          Chizishdan oldin ro'yxatni <code>filter</code>/<code>toSorted</code> bilan tayyorlang;
          asl massivni o'zgartiradigan <code>sort</code>/<code>push</code> ishlatmang. Bo'sh
          ro'yxat uchun alohida xabar ko'rsating.
        </li>
        <li>
          <code>key</code> <code>map</code> qaytargan eng tashqi elementga (odatda komponent
          tegiga) beriladi va komponentning o'ziga prop sifatida yetib bormaydi; bir nechta teg
          uchun <code>{'<Fragment key={...}>'}</code>.
        </li>
      </KeyPoints>
    </>
  )
}
