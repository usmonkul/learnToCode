import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "State'ni yuqoriga ko'tarish",
  section: 'State boshqaruvi naqshlari',
}

export default function LiftingStateUpLesson() {
  return (
    <>
      <p>
        Oldingi darslarda <code>useState</code>ni bitta komponent ichida ko'rdik — tugma bosilsa,
        o'sha komponentning o'zi qayta render bo'ladi. Lekin amaliyotda tez-tez shunday holat
        chiqadi: ikkita alohida komponent bir xil ma'lumotni bilishi va bir-biriga mos holda
        ishlashi kerak bo'ladi. Masalan, bitta komponent mahsulotlar ro'yxatini ko'rsatadi va
        foydalanuvchi bittasini tanlaydi, ikkinchi komponent esa o'sha tanlangan mahsulotning
        tafsilotlarini chiqarishi kerak. Agar "tanlangan mahsulot" state'i faqat birinchi
        komponent ichida yashasa, ikkinchisi undan umuman xabardor bo'lolmaydi.
      </p>

      <h2>Muammo: opa-uka komponentlar orasida state almashish</h2>
      <p>
        Tasavvur qiling, bizda ikkita komponent bor — <code>RangTanlovchi</code> va{' '}
        <code>Namuna</code> — ikkalasi ham <code>App</code>ning bolalari (sibling, ya'ni
        bir-birining opa-ukasi). <code>RangTanlovchi</code> foydalanuvchiga rang tanlash imkonini
        beradi, <code>Namuna</code> esa o'sha rangni katta kvadrat ko'rinishida ko'rsatishi kerak.
        Agar tanlangan rang state'ini <code>RangTanlovchi</code> ichida saqlasak:
      </p>
      <CodeBlock lang="jsx">{`function RangTanlovchi() {
  const [rang, setRang] = useState('qizil')

  return (
    <select value={rang} onChange={(e) => setRang(e.target.value)}>
      <option value="qizil">Qizil</option>
      <option value="yashil">Yashil</option>
      <option value="ko'k">Ko'k</option>
    </select>
  )
}

function Namuna() {
  // Bu yerda "rang" haqida hech qanday ma'lumot yo'q!
  return <div className="h-24 w-24" />
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
        bolalardan biri o'sha state'ni o'zgartirishi kerak bo'lsa, ota-komponent{' '}
        <code>setRang</code> kabi funksiyani ham props sifatida pastga uzatadi — bola shu
        funksiyani chaqiradi, ota state'ni yangilaydi, va React ikkala bolani ham yangi qiymat
        bilan qayta render qiladi:
      </p>
      <CodeBlock lang="jsx">{`function RangTanlovchi({ rang, setRang }) {
  return (
    <select value={rang} onChange={(e) => setRang(e.target.value)}>
      <option value="qizil">Qizil</option>
      <option value="yashil">Yashil</option>
      <option value="ko'k">Ko'k</option>
    </select>
  )
}

function Namuna({ rang }) {
  return <div className="h-24 w-24" style={{ backgroundColor: rang }} />
}

function App() {
  const [rang, setRang] = useState('qizil')

  return (
    <>
      <RangTanlovchi rang={rang} setRang={setRang} />
      <Namuna rang={rang} />
    </>
  )
}`}</CodeBlock>
      <p>
        Endi state faqat bitta joyda — <code>App</code> ichida — yashaydi. Ikkala bola komponent
        ham uni props orqali oladi: <code>RangTanlovchi</code> joriy qiymatni ko'rsatish va uni
        o'zgartirish uchun <code>setRang</code>ni chaqirish imkoniga ega, <code>Namuna</code> esa
        faqat o'qish uchun qiymatni oladi. <code>select</code>ning qiymati o'zgarganda{' '}
        <code>setRang</code> chaqiriladi, <code>App</code> qayta render bo'ladi, va yangi{' '}
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

      <h2>Uch qavatli misol: state ikkita "aka-uka" guruh orasida</h2>
      <p>
        Ba'zan state kerak bo'lgan komponentlar bir-biridan uzoqroqda joylashgan bo'lishi mumkin.
        Masalan, savat sahifasida <code>MahsulotRoyxati</code> va <code>SavatXulosasi</code> ikki
        alohida bo'lim, lekin ikkalasi ham "savatga qo'shilgan mahsulotlar" ro'yxatini bilishi
        kerak. Bu holda ham printsip bir xil — state ikkalasining umumiy ota-komponentiga
        ko'tariladi, hatto u ancha yuqorida bo'lsa ham:
      </p>
      <CodeBlock lang="jsx">{`function MahsulotRoyxati({ savat, setSavat }) {
  function qoshish(mahsulot) {
    setSavat([...savat, mahsulot])
  }

  return (
    <button onClick={() => qoshish({ nomi: 'Kitob', narxi: 45000 })}>
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

  return (
    <>
      <MahsulotRoyxati savat={savat} setSavat={setSavat} />
      <SavatXulosasi savat={savat} />
    </>
  )
}`}</CodeBlock>
      <p>
        <code>MahsulotRoyxati</code> savatni o'zgartiradi, <code>SavatXulosasi</code> esa faqat
        uni o'qib, jamlaydi — lekin ikkalasi ham bitta manba (single source of truth), ya'ni{' '}
        <code>App</code>dagi <code>savat</code> state'iga tayanadi. Bu naqsh katta ilovalarda
        ham xuddi shu tarzda ishlaydi, faqat komponentlar orasidagi qavatlar soni ko'proq
        bo'lishi mumkin — keyingi darsda buni Context orqali qanday soddalashtirishni
        ko'ramiz.
      </p>

      <Quiz
        question="Ikkita opa-uka komponent (RangTanlovchi va Namuna) bir xil 'tanlangan rang' qiymatini bo'lishishi kerak. Bu qiymat qayerda useState orqali e'lon qilinishi to'g'ri?"
        options={[
          "RangTanlovchi ichida, chunki u qiymatni birinchi bo'lib o'zgartiradi",
          "Namuna ichida, chunki u qiymatni ko'rsatadi",
          'Ikkalasining umumiy ota-komponentida (masalan, App), keyin props orqali ikkalasiga uzatiladi',
          "Ikkalasida alohida-alohida, keyin ikkala state'ni useEffect bilan sinxronlash kerak",
        ]}
        correctIndex={2}
        explanation="State faqat bitta komponentga tegishli bo'ladi va boshqa komponentlarga avtomatik ko'rinmaydi. Ikkita opa-uka komponent bir xil qiymatni bo'lishishi uchun, u ularning umumiy ota-komponentida yashashi va props orqali pastga uzatilishi kerak — shunda ikkalasi ham doimo sinxron qoladi."
      />

      <Exercise title="Mashq">
        <p>
          <code>Kirim</code> va <code>Kozgu</code> nomli ikkita opa-uka komponent yozing.{' '}
          <code>Kirim</code> — <code>{'<input>'}</code> orqali matn kiritish imkonini beradi,{' '}
          <code>Kozgu</code> esa o'sha matnni katta harflarga o'girib (<code>toUpperCase()</code>)
          ekranga chiqaradi. State'ni <code>App</code> komponentida saqlang va uni props orqali
          ikkalasiga uzating, shunda foydalanuvchi <code>Kirim</code>ga yozganda{' '}
          <code>Kozgu</code> darhol yangilanib tursin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`function Kirim({ matn, setMatn }) {
  return (
    <input
      value={matn}
      onChange={(e) => setMatn(e.target.value)}
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
      <Kirim matn={matn} setMatn={setMatn} />
      <Kozgu matn={matn} />
    </>
  )
}`}</CodeBlock>
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
          Ota-komponent state qiymatini props orqali pastga uzatadi, kerak bo'lsa setter
          funksiyani ham (masalan, <code>setRang</code>) uzatadi — shunda bola komponent ham
          qiymatni o'qiy oladi, ham uni o'zgartirishni so'rashi mumkin.
        </li>
        <li>
          Bola komponent state'ni to'g'ridan-to'g'ri o'zgartirmaydi — u faqat ota-dan kelgan
          funksiyani chaqiradi; state'ning o'zi hamon faqat ota-komponentda yashaydi.
        </li>
        <li>
          Umumiy qoida: state — uni ishlatadigan komponentlarning eng pastki umumiy joyida
          yashasin, na undan yuqorida (keraksiz murakkablik), na pastida (bo'lisha olmaslik).
        </li>
      </KeyPoints>
    </>
  )
}
