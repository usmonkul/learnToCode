import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "State'ni yuqoriga ko'tarish",
  section: 'State boshqaruvi',
}

export default function LiftingStateUpLesson() {
  return (
    <>
      <h2>Muammo: opa-uka komponentlar orasida state almashish</h2>
      <p>
        Shu paytgacha state ko'pincha bitta komponent ichida yashadi. Lekin tez-tez ikkita
        alohida komponent bir xil ma'lumotni bilishi kerak bo'ladi.
        Tasavvur qiling, bizda ikkita komponent bor — <code>RangTanlovchi</code> va{' '}
        <code>Namuna</code> — ikkalasi ham <code>App</code>ning bolalari (sibling, ya'ni
        bir-birining opa-ukasi). <code>RangTanlovchi</code> foydalanuvchiga rang tanlash imkonini
        beradi, <code>Namuna</code> esa o'sha rangni katta kvadrat ko'rinishida ko'rsatishi kerak.
        Agar tanlangan rang state'ini <code>RangTanlovchi</code> ichida saqlasak:
      </p>
      <CodeBlock lang="jsx">{`function RangTanlovchi() {
  const [rang, setRang] = useState('tomato')

  return (
    <select value={rang} onChange={(e) => setRang(e.target.value)}>
      <option value="tomato">Qizil</option>
      <option value="seagreen">Yashil</option>
      <option value="royalblue">Ko'k</option>
    </select>
  )
}

function Namuna() {
  // Bu yerda "rang" haqida hech qanday ma'lumot yo'q!
  return <div className="namuna" />
}`}</CodeBlock>
      <p>
        <code>Namuna</code> komponenti <code>rang</code> state'iga umuman kira olmaydi — u boshqa
        komponentning ichida, izolyatsiya qilingan holda yashaydi. React'da state har doim{' '}
        <strong>o'z komponentiga xos</strong> — hech qanday "global" o'zgaruvchidek boshqa
        komponentlarga avtomatik ko'rinmaydi. Shunday ekan, ikkita opa-uka komponent bir xil
        ma'lumotni bo'lishishi kerak bo'lsa, uni qayerdadir umumiy joyda saqlash kerak.
      </p>

      <h2>Yechim: state'ni umumiy ota-komponentga ko'tarish</h2>
      <p>
        Yechim — <strong>lifting state up</strong> (state'ni yuqoriga ko'tarish) deb ataladigan
        naqsh: state'ni ikkala komponentning eng yaqin umumiy ota-komponentiga (nearest common
        parent) ko'chirib, keyin uni props orqali pastga, ikkala bolaga ham uzatish. Agar
        bolalardan biri o'sha state'ni o'zgartirishi kerak bo'lsa, ota-komponent unga
        funksiyani ham props sifatida uzatadi (12-darsdagi <code>on...</code> naqshi) — bola shu
        funksiyani chaqiradi, ota state'ni yangilaydi, va React ikkala bolani ham yangi qiymat
        bilan qayta render qiladi:
      </p>
      <CodeBlock lang="jsx">{`function RangTanlovchi({ rang, onRangChange }) {
  return (
    <select value={rang} onChange={(e) => onRangChange(e.target.value)}>
      <option value="tomato">Qizil</option>
      <option value="seagreen">Yashil</option>
      <option value="royalblue">Ko'k</option>
    </select>
  )
}

function Namuna({ rang }) {
  return <div className="namuna" style={{ backgroundColor: rang }} />
}

function App() {
  const [rang, setRang] = useState('tomato')

  return (
    <>
      <RangTanlovchi rang={rang} onRangChange={setRang} />
      <Namuna rang={rang} />
    </>
  )
}`}</CodeBlock>
      <p>
        Endi state faqat bitta joyda — <code>App</code> ichida — yashaydi. Ikkala bola komponent
        ham uni props orqali oladi: <code>RangTanlovchi</code> joriy qiymatni ko'rsatadi va
        o'zgartirish kerak bo'lganda <code>onRangChange</code>ni chaqiradi, <code>Namuna</code> esa
        faqat o'qish uchun qiymatni oladi. <code>select</code>ning qiymati o'zgarganda{' '}
        <code>onRangChange</code> (ya'ni <code>App</code>dagi <code>setRang</code>) chaqiriladi, <code>App</code> qayta render bo'ladi, va yangi{' '}
        <code>rang</code> qiymati ikkala bolaga ham qayta uzatiladi — shu tarzda ular doimo
        sinxron qoladi.
      </p>

      <Callout type="tip" title="State qayerda yashashi kerak?">
        Umumiy qoida: state — uni ishlatadigan komponentlarning{' '}
        <strong>eng pastki umumiy komponentida</strong> yashashi kerak, na undan yuqorida, na
        pastida. Agar state faqat bitta komponentga kerak bo'lsa, uni o'sha komponentning o'zida
        qoldiring — keraksiz yerga ko'tarish kodni murakkablashtiradi. Agar ikkita yoki undan
        ko'p komponent bir xil ma'lumotga muhtoj bo'lsa, uni ularning eng yaqin umumiy
        ota-komponentiga ko'taring — undan ham yuqoriga ko'tarish shart emas.
      </Callout>

      <h2>Savat misoli: o'zgartiruvchi va o'quvchi</h2>
      <p>
        Yana bir odatiy holat: savat sahifasida <code>MahsulotRoyxati</code> va <code>SavatXulosasi</code> ikki
        alohida bo'lim, lekin ikkalasi ham "savatga qo'shilgan mahsulotlar" ro'yxatini bilishi
        kerak. Bittasi savatni o'zgartiradi, ikkinchisi faqat o'qiydi — printsip baribir bir
        xil: state ikkalasining umumiy ota-komponentiga ko'tariladi:
      </p>
      <CodeBlock lang="jsx">{`function MahsulotRoyxati({ onQoshish }) {
  return (
    <button onClick={() => onQoshish({ id: 'k1', nomi: 'Kitob', narxi: 45000 })}>
      Savatga qo'shish
    </button>
  )
}

function SavatXulosasi({ savat }) {
  const jami = savat.reduce((yigindi, mahsulot) => yigindi + mahsulot.narxi, 0)
  return <p>Jami: {jami} so'm ({savat.length} ta mahsulot)</p>
}

function App() {
  const [savat, setSavat] = useState([])

  function handleQoshish(mahsulot) {
    setSavat((eski) => [...eski, mahsulot])
  }

  return (
    <>
      <MahsulotRoyxati onQoshish={handleQoshish} />
      <SavatXulosasi savat={savat} />
    </>
  )
}`}</CodeBlock>
      <p>
        <code>MahsulotRoyxati</code> savat qanday tuzilganini umuman bilmaydi — u faqat
        "shu mahsulot qo'shilsin" deb xabar beradi. Savatni o'zgartirish mantig'i esa uning
        egasi — <code>App</code> — ichida. <code>SavatXulosasi</code> esa savatni
        faqat o'qib, jamlaydi. Ikkalasi ham bitta manbaga (single source of truth) —{' '}
        <code>App</code>dagi <code>savat</code> state'iga tayanadi. Bu naqsh katta ilovalarda
        ham xuddi shu tarzda ishlaydi, faqat komponentlar orasidagi qavatlar soni ko'proq
        bo'lishi mumkin — buni qanday soddalashtirishni 23-darsda ko'ramiz.
      </p>

      <h2>Klassik misol: faqat bitta ochiq panel</h2>
      <p>
        Ko'p so'raladigan savollar (FAQ) sahifasi: har bir savol bosilganda javobi ochiladi.
        Birinchi variantda har bir panel o'zining <code>ochiq</code> state'iga ega:
      </p>
      <CodeBlock lang="jsx">{`function Panel({ savol, children }) {
  const [ochiq, setOchiq] = useState(false)
  return (
    <section>
      <button onClick={() => setOchiq(!ochiq)}>{savol}</button>
      {ochiq && <p>{children}</p>}
    </section>
  )
}`}</CodeBlock>
      <p>
        Endi yangi talab keldi: <strong>bir vaqtda faqat bitta panel ochiq bo'lsin</strong>.
        Panellar bir-birining state'ini ko'ra olmaydi, shuning uchun buni ularning ichida hal
        qilib bo'lmaydi. State'ni yuqoriga ko'taramiz — uch qadamda:
      </p>
      <ol>
        <li>
          <strong>Boladan olib tashlang.</strong> <code>Panel</code>dan <code>useState</code>ni
          o'chirib, <code>ochiq</code>ni prop qiling.
        </li>
        <li>
          <strong>Otaga qo'shing.</strong> Ota "qaysi panel ochiq"ni saqlaydi — 19-darsdagi
          qoidaga ko'ra boolean'lar emas, bitta indeks yoki id.
        </li>
        <li>
          <strong>Pastga uzating.</strong> Har bir panelga <code>ochiq</code> va{' '}
          <code>onOchish</code> props'ini bering.
        </li>
      </ol>
      <CodeBlock lang="jsx">{`function Panel({ savol, ochiq, onOchish, children }) {
  return (
    <section>
      <button onClick={onOchish}>{savol}</button>
      {ochiq && <p>{children}</p>}
    </section>
  )
}

export default function FAQ() {
  const [ochiqId, setOchiqId] = useState('yetkazish')

  return (
    <>
      <Panel
        savol="Yetkazib berish qancha vaqt oladi?"
        ochiq={ochiqId === 'yetkazish'}
        onOchish={() => setOchiqId('yetkazish')}
      >
        Toshkent bo'ylab 40–60 daqiqa.
      </Panel>
      <Panel
        savol="Qanday to'lash mumkin?"
        ochiq={ochiqId === 'tolov'}
        onOchish={() => setOchiqId('tolov')}
      >
        Naqd, karta yoki Click/Payme orqali.
      </Panel>
    </>
  )
}`}</CodeBlock>
      <p>
        Endi <code>Panel</code> o'z holatini o'zi hal qilmaydi — uni ota boshqaradi. Bunday
        komponent <strong>boshqariladigan</strong> (controlled) deb ataladi — xuddi 17-darsdagi
        controlled input kabi: qiymat props'dan keladi, o'zgarish esa handler orqali so'raladi.
        O'z state'iga ega birinchi variant esa <strong>boshqarilmaydigan</strong>{' '}
        (uncontrolled): uni ishlatish oson, lekin otasi uning ichidagi holatga ta'sir qila
        olmaydi. Komponent yozayotganda o'zingizdan so'rang: bu holatni tashqaridan boshqarish
        kerak bo'ladimi?
      </p>

      <h2>Prop drilling</h2>
      <p>
        State'ni ko'targan sari u daraxtda yuqoriroqqa chiqadi va pastga tushish yo'li uzayadi.
        Ba'zan ma'lumot o'zi kerak bo'lmagan oraliq komponentlar orqali 3–4 qavat "o'tkazilib"
        tushiriladi:
      </p>
      <CodeBlock lang="jsx">{`<App foydalanuvchi={f}>
  <Sahifa foydalanuvchi={f}>          // o'zi ishlatmaydi, faqat uzatadi
    <Sarlavha foydalanuvchi={f}>      // o'zi ishlatmaydi, faqat uzatadi
      <Avatar foydalanuvchi={f} />    // faqat shu ishlatadi`}</CodeBlock>
      <p>
        Bu <strong>prop drilling</strong> deb ataladi. Ikki-uch qavatda bu muammo emas — aksincha,
        ma'lumot qayerdan kelayotgani aniq ko'rinadi. Juda chuqur bo'lib ketsa, yechimlar bor:
        ko'pincha 6-darsdagi <code>children</code> bilan composition oraliq qavatlarni
        qisqartiradi, eng chuqur holatlar uchun esa context (23-dars) bor.
      </p>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Ikki joyda bir xil state.</strong> Ikkala bolada alohida{' '}
            <code>useState</code> va ularni qo'lda "sinxronlashga" urinish — ular albatta bir
            kun ajralib ketadi. Bitta egasi bo'lsin.
          </li>
          <li>
            <strong>Juda yuqoriga ko'tarish.</strong> Faqat bitta komponentga kerak bo'lgan state'ni{' '}
            <code>App</code>ga chiqarish — keraksiz props va keraksiz renderlar.
          </li>
          <li>
            <strong>Bolada props'dan state yaratish.</strong> Ko'tarilgan state'ni bola yana{' '}
            <code>useState(prop)</code> bilan nusxalasa, ota yangilaganda bola eskicha qoladi
            (19-dars).
          </li>
          <li>
            <strong>Setter'ni o'ylamay uzatish.</strong> Bolaga <code>setSavat</code> berilsa, u
            savatni istalgan ko'rinishga keltirishi mumkin. <code>onQoshish</code> kabi aniq
            handler'lar ma'lumotni qanday o'zgarishini ota qo'lida saqlaydi.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="Ikkita opa-uka komponent (RangTanlovchi va Namuna) bir xil 'tanlangan rang' qiymatini bo'lishishi kerak. Bu qiymat qayerda useState orqali e'lon qilinishi to'g'ri?"
        options={[
          "RangTanlovchi ichida, chunki u qiymatni birinchi bo'lib o'zgartiradi",
          "Namuna ichida, chunki u qiymatni ko'rsatadi",
          'Ikkalasining umumiy ota-komponentida (masalan, App), keyin props orqali ikkalasiga uzatiladi',
          "Ikkalasida alohida-alohida, keyin har bir handler'da ikkalasini qo'lda sinxronlash kerak",
        ]}
        correctIndex={2}
        explanation="State faqat bitta komponentga tegishli bo'ladi va boshqa komponentlarga avtomatik ko'rinmaydi. Ikkita opa-uka komponent bir xil qiymatni bo'lishishi uchun, u ularning umumiy ota-komponentida yashashi va props orqali pastga uzatilishi kerak — shunda ikkalasi ham doimo sinxron qoladi."
      />

      <Quiz
        question="Tab komponentlari ichida har birining o'z faol state'i bor edi. Endi tashqaridagi tugma bosilganda 3-tab ochilishi kerak. Nima qilish kerak?"
        options={[
          "Faol tab state'ini ota komponentga ko'tarib, tablarni boshqariladigan qilish",
          "Tugmadan document.querySelector bilan tabni topib, uni bosish",
          "Har bir tab ichida tugmani ham joylashtirish",
          "Tugma bosilganda butun sahifani qayta yuklash",
        ]}
        correctIndex={0}
        explanation="Ota komponent bolaning ichki state'iga ta'sir qila olmaydi. Tashqaridan boshqarish kerak bo'lsa, state otaga ko'tariladi va tablar faol qiymatni props orqali oladi — ular boshqariladigan (controlled) bo'ladi."
      />

      <Exercise title="1-mashq: kirim va ko'zgu">
        <p>
          <code>Kirim</code> va <code>Kozgu</code> nomli ikkita opa-uka komponent yozing.{' '}
          <code>Kirim</code> — <code>{'<input>'}</code> orqali matn kiritish imkonini beradi,{' '}
          <code>Kozgu</code> esa o'sha matnni katta harflarga o'girib (<code>toUpperCase()</code>)
          ekranga chiqaradi. State'ni <code>App</code> komponentida saqlang va uni props orqali
          ikkalasiga uzating, shunda foydalanuvchi <code>Kirim</code>ga yozganda{' '}
          <code>Kozgu</code> darhol yangilanib tursin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`function Kirim({ matn, onMatnChange }) {
  return (
    <input
      value={matn}
      onChange={(e) => onMatnChange(e.target.value)}
      placeholder="Biror narsa yozing..."
    />
  )
}

function Kozgu({ matn }) {
  return <p>{matn.toUpperCase()}</p>
}

function App() {
  const [matn, setMatn] = useState('')

  return (
    <>
      <Kirim matn={matn} onMatnChange={setMatn} />
      <Kozgu matn={matn} />
    </>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: valyuta konvertori">
        <p>
          Ikki input: "So'm" va "Dollar" (kurs: 1 $ = 12 600 so'm). Istalganiga yozilganda
          ikkinchisi avtomatik yangilansin. Bitta <code>ValyutaInput</code> komponentini yozib,
          uni ikki marta ishlating. Diqqat: ikki state (so'm va dollar) saqlamang — 19-darsni
          eslang. Qaysi minimal ma'lumot yetarli?
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useState } from 'react'

const KURS = 12600

function ValyutaInput({ belgi, qiymat, onQiymatChange }) {
  return (
    <label>
      {belgi}:{' '}
      <input value={qiymat} onChange={(e) => onQiymatChange(e.target.value)} />
    </label>
  )
}

function aylantir(matn, koeff) {
  const son = Number(matn)
  if (matn === '' || Number.isNaN(son)) return ''
  return String(Math.round(son * koeff * 100) / 100)
}

export default function Konvertor() {
  // minimal state: oxirgi yozilgan qiymat va u qaysi valyutada
  const [kiritma, setKiritma] = useState({ valyuta: 'som', matn: '' })

  const som = kiritma.valyuta === 'som' ? kiritma.matn : aylantir(kiritma.matn, KURS)
  const dollar = kiritma.valyuta === 'dollar' ? kiritma.matn : aylantir(kiritma.matn, 1 / KURS)

  return (
    <>
      <ValyutaInput
        belgi="So'm"
        qiymat={som}
        onQiymatChange={(matn) => setKiritma({ valyuta: 'som', matn })}
      />
      <ValyutaInput
        belgi="Dollar"
        qiymat={dollar}
        onQiymatChange={(matn) => setKiritma({ valyuta: 'dollar', matn })}
      />
    </>
  )
}`}</CodeBlock>
          <p>
            Ikkala input ham boshqariladigan: qiymat otadan keladi. Ota faqat "foydalanuvchi
            nima yozdi va qayerga" ni saqlaydi; ikkinchi qiymat hisoblanadi. Ikki alohida state
            bo'lganida, bittasini yangilab, ikkinchisini qayta hisoblashni har safar unutmaslik
            kerak bo'lardi — va yaxlitlash tufayli yozilayotgan son "sakrab" ketardi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          React'da state har doim o'z komponentiga xos — boshqa komponentlar unga avtomatik
          kira olmaydi, hatto ular opa-uka (sibling) bo'lsa ham.
        </li>
        <li>
          Ikkita yoki undan ko'p komponent bir xil ma'lumotni bo'lishishi kerak bo'lsa, state'ni
          ularning eng yaqin umumiy ota-komponentiga ko'chirish kerak — bu{' '}
          <strong>lifting state up</strong> deb ataladi.
        </li>
        <li>
          Ota-komponent state qiymatini props orqali pastga uzatadi, o'zgartirish uchun esa{' '}
          <code>on...</code> handler'ini — bola qiymatni o'qiydi va o'zgarishni so'raydi.
        </li>
        <li>
          Bola komponent state'ni to'g'ridan-to'g'ri o'zgartirmaydi — u faqat ota-dan kelgan
          funksiyani chaqiradi; state'ning o'zi hamon faqat ota-komponentda yashaydi.
        </li>
        <li>
          Holati props'dan boshqariladigan komponent — controlled, o'z state'iga ega —
          uncontrolled. Tashqaridan boshqarish kerak bo'lsa, state'ni ko'taring.
        </li>
        <li>
          Umumiy qoida: state — uni ishlatadigan komponentlarning eng pastki umumiy joyida
          yashasin, na undan yuqorida (keraksiz murakkablik), na pastida (bo'lisha olmaslik).
        </li>
      </KeyPoints>
    </>
  )
}
