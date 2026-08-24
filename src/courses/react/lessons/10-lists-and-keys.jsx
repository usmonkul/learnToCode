import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Ro'yxatlar va key'lar",
  section: 'Render qilish naqshlari',
}

export default function ListsAndKeysLesson() {
  return (
    <>
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
        matni kabi o'z ichki state'i bo'lsa (masalan, controlled input), bu state ham noto'g'ri
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

      <h2>
        <code>useState</code>dan kelgan ro'yxatni render qilish
      </h2>
      <p>
        Amaliyotda ro'yxat ko'pincha state'ning o'zida saqlanadi va foydalanuvchi harakati bilan
        o'zgaradi. Oddiy xaridlar ro'yxati misolida ko'raylik:
      </p>
      <CodeBlock lang="jsx">{`import { useState } from 'react'

function XaridlarRoyxati() {
  const [mahsulotlar, setMahsulotlar] = useState([
    { id: 1, nomi: 'Sut' },
    { id: 2, nomi: 'Non' },
    { id: 3, nomi: 'Tuxum' },
  ])

  function handleOchirish(id) {
    setMahsulotlar(mahsulotlar.filter((mahsulot) => mahsulot.id !== id))
  }

  return (
    <ul>
      {mahsulotlar.map((mahsulot) => (
        <li key={mahsulot.id}>
          {mahsulot.nomi}
          <button onClick={() => handleOchirish(mahsulot.id)}>O'chirish</button>
        </li>
      ))}
    </ul>
  )
}`}</CodeBlock>
      <p>
        Bu yerda muhim narsa — <code>mahsulotlar</code> massivini to'g'ridan-to'g'ri
        o'zgartirmaymiz (masalan, <code>.push()</code> yoki <code>.splice()</code> orqali),
        balki <code>.filter()</code> yangi massiv qaytaradi va biz o'sha yangi massivni{' '}
        <code>setMahsulotlar</code> orqali state'ga o'rnatamiz. Bu — oldingi darsda ko'rgan
        "state'ni to'g'ridan-to'g'ri o'zgartirmaslik" qoidasining ro'yxatlar uchun ko'rinishi.
        Bu — Amaliy loyiha bo'limida quriladigan vazifalar ro'yxati (todo-list) ilovasining ham
        asosiy mexanizmi, faqat o'sha yerda funksionallik kengroq bo'ladi.
      </p>

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

      <Exercise>
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
          Ro'yxatni <code>useState</code>da saqlab, uni <code>.filter()</code>,{' '}
          <code>.map()</code> kabi metodlar bilan yangi massiv yaratib yangilash — mavjud
          massivni to'g'ridan-to'g'ri o'zgartirmaslik qoidasining ro'yxatlar uchun ko'rinishi.
        </li>
        <li>
          <code>key</code> — komponentning o'ziga <code>props</code> sifatida yetib bormaydi, u
          faqat React'ning ichki reconciliation mexanizmi uchun ishlatiladigan maxsus ko'rsatma.
        </li>
      </KeyPoints>
    </>
  )
}
