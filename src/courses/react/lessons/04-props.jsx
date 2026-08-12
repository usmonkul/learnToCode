import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import Figure from '@/components/content/Figure'
import propsFlow from '@/assets/props-flow.svg'

export const meta = {
  title: "Props orqali ma'lumot uzatish",
  section: 'Komponentlar va Props',
}

export default function PropsLesson() {
  return (
    <>
      <p>
        Oldingi darsda <code>Sarlavha</code> va <code>Footer</code> kabi komponentlarni{' '}
        <code>App</code> ichiga joylashtirishni ko'rdik — lekin ular har doim bir xil, qattiq
        yozilgan (hardcoded) matnni qaytardi. Haqiqiy ilovalarda esa bir xil komponentni turli
        ma'lumot bilan qayta-qayta ishlatish kerak bo'ladi: masalan, kitob do'konida har bir
        kitob kartasi bir xil ko'rinishga ega, lekin sarlavhasi va muallifi har xil. Aynan shu
        muammoni <strong>props</strong> (properties — xususiyatlar) hal qiladi.
      </p>

      <h2>Props nima?</h2>
      <p>
        Props — ota komponentdan (parent) bola komponentga (child) uzatiladigan ma'lumot. Ular
        JSX tegida oddiy atribut sifatida yoziladi, xuddi HTML atributlariga o'xshab:
      </p>
      <CodeBlock lang="jsx">{`function KitobKartasi(props) {
  return (
    <div>
      <h3>{props.sarlavha}</h3>
      <p>{props.muallif}</p>
    </div>
  )
}

function App() {
  return (
    <>
      <KitobKartasi sarlavha="O'tkan kunlar" muallif="Abdulla Qodiriy" />
      <KitobKartasi sarlavha="Sarob" muallif="Abdulla Qodiriy" />
    </>
  )
}`}</CodeBlock>
      <p>
        Bu yerda <code>{'<KitobKartasi sarlavha="..." muallif="..." />'}</code> deb yozilgan har
        bir atribut React tomonidan yig'ilib, bitta <code>{'{ sarlavha: "...", muallif: "..." }'}</code>{' '}
        ko'rinishidagi obyektga aylanadi va komponent funksiyasiga <strong>birinchi
        parametr</strong> sifatida uzatiladi. <code>KitobKartasi</code> funksiyasi ichida bu
        obyektni <code>props</code> deb nomladik — nom istalgan bo'lishi mumkin, lekin{' '}
        <code>props</code> deb atash odat tusiga kirgan.
      </p>
      <Callout type="tip" title="Funksiya argumentiga o'xshating">
        Props'ni komponentga uzatiladigan oddiy funksiya argumenti deb tasavvur qiling: xuddi{' '}
        <code>salomlash(ism)</code> funksiyasiga <code>ism</code>ni uzatganingiz kabi,{' '}
        <code>{'<KitobKartasi sarlavha="..." />'}</code> orqali <code>KitobKartasi</code>{' '}
        funksiyasiga <code>sarlavha</code>ni uzatasiz — farqi shundaki, bu qiymatlar JSX
        atributi ko'rinishida yoziladi va yagona <code>props</code> obyektiga yig'iladi.
      </Callout>
      <p>
        Endi bitta <code>KitobKartasi</code> komponentini istagancha marta, har safar boshqa
        <code> sarlavha</code> va <code>muallif</code> bilan qayta ishlatish mumkin — bu esa
        komponentlarni nega shunchalik qayta ishlatiladigan (reusable) qilib qurish mumkinligini
        ko'rsatadi.
      </p>
      <p>
        Ma'lumot doimo faqat bitta yo'nalishda — ota komponentdan bola komponentga — oqadi. Bu
        yo'nalish React'da <strong>yuqoridan pastga oqim (top-down data flow)</strong> deb
        ataladi: bola o'ziga qanday props kelayotganini tanlay olmaydi va ularni ota komponentga
        qaytarib "yubora" olmaydi.
      </p>
      <Figure
        src={propsFlow}
        alt="Ota komponentdan bola komponentga props bir tomonlama oqib borayotgan, orqaga qaytish esa bloklangan sxema"
        caption="1-rasm: props faqat ota komponentdan bola komponentga, bir tomonlama oqadi"
      />

      <h2>Props obyektini destructuring qilish</h2>
      <p>
        Har safar <code>props.sarlavha</code>, <code>props.muallif</code> deb yozish tezda
        noqulay bo'lib qoladi, ayniqsa props ko'p bo'lganda. Buning o'rniga JavaScript'ning{' '}
        <strong>destructuring (qismlarga ajratib olish)</strong> sintaksisidan foydalanib,
        kerakli maydonlarni to'g'ridan funksiya parametrida yozib olish mumkin:
      </p>
      <CodeBlock lang="jsx">{`function KitobKartasi({ sarlavha, muallif }) {
  return (
    <div>
      <h3>{sarlavha}</h3>
      <p>{muallif}</p>
    </div>
  )
}`}</CodeBlock>
      <p>
        Bu — avvalgi <code>props.sarlavha</code> yozuvi bilan bir xil narsa, shunchaki qisqaroq.
        Amaliyotda React kodining aksariyati aynan shu destructuring uslubida yoziladi — funksiya
        parametrlariga qarab, komponent qaysi props'larni kutayotganini bir qarashda bilib olish
        mumkin.
      </p>

      <h2>Standart qiymatlar (default prop values)</h2>
      <p>
        Ba'zan bir prop berilmasligi mumkin — masalan, muallifi noma'lum kitob. Bunday holatda
        destructuring'ning o'zidagi <code>=</code> yordamida <strong>standart qiymat</strong>{' '}
        belgilash mumkin:
      </p>
      <CodeBlock lang="jsx">{`function KitobKartasi({ sarlavha, muallif = "Noma'lum muallif" }) {
  return (
    <div>
      <h3>{sarlavha}</h3>
      <p>{muallif}</p>
    </div>
  )
}

// muallif prop berilmagan — standart qiymat ishlatiladi
<KitobKartasi sarlavha="Kutilmagan mehmon" />
// Ekranda: "Kutilmagan mehmon" / "Noma'lum muallif"`}</CodeBlock>
      <Callout type="note" title="Standart qiymat qachon ishlaydi?">
        Standart qiymat faqat prop umuman berilmaganda yoki aniq <code>undefined</code> qilib
        uzatilganda ishga tushadi. Agar prop <code>0</code>, <code>""</code> yoki{' '}
        <code>false</code> kabi qiymat bilan uzatilsa, bu — haqiqiy qiymat hisoblanadi va
        standart qiymat ishlatilmaydi.
      </Callout>

      <h2>Props — faqat o'qish uchun (read-only)</h2>
      <p>
        Eng muhim qoida: komponent o'ziga kelgan props'ni hech qachon qayta yozmasligi
        (reassign) yoki o'zgartirmasligi kerak. Quyidagi kod — xato namuna:
      </p>
      <CodeBlock lang="jsx">{`function KitobKartasi({ sarlavha }) {
  sarlavha = sarlavha.toUpperCase() // XATO: propsni qayta yozish
  return <h3>{sarlavha}</h3>
}`}</CodeBlock>
      <p>
        Bu kod JavaScript nuqtai nazaridan ishlab ketadi — <code>sarlavha</code> shunchaki
        mahalliy (lokal) o'zgaruvchi, va uni qayta yozish sintaktik xato emas. Lekin natija
        deyarli hech narsaga foyda keltirmaydi: bu o'zgartirish faqat funksiya ichida, bitta
        render davomida yashaydi, ota komponentdagi asl qiymatga hech qanday ta'sir qilmaydi, va
        keyingi safar komponent qayta render bo'lganda ota komponent yana asl{' '}
        <code>sarlavha</code>ni yuboradi — qilingan "o'zgartirish" izsiz yo'qoladi. Shu bilan
        birga, React barcha komponentlarni <strong>sof funksiya (pure function)</strong> sifatida
        ko'radi: bir xil props uchun komponent doim bir xil natija qaytarishi kutiladi, propsni
        ichkarida o'zgartirish esa aynan shu kelishuvni buzadi va kodni o'qishni
        qiyinlashtiradi.
      </p>
      <Callout type="warning" title="Ayniqsa ehtiyot bo'ling: obyekt va massiv props">
        Agar prop sifatida obyekt yoki massiv (array) uzatilsa, uning{' '}
        <strong>ichidagi</strong> qiymatni o'zgartirish (masalan, <code>ro'yxat.push(...)</code>)
        yanada xavfliroq: JavaScript'da obyekt va massivlar havola (reference) orqali uzatiladi,
        shuning uchun bunday o'zgartirish ota komponentdagi asl ma'lumotni ham "sirtdan"
        o'zgartirib qo'yadi. Agar props asosida yangi qiymat kerak bo'lsa, uni har doim yangi
        lokal o'zgaruvchiga yozing, propsning o'ziga tegmang:
      </Callout>
      <CodeBlock lang="jsx">{`function KitobKartasi({ sarlavha }) {
  const kattaSarlavha = sarlavha.toUpperCase() // TO'G'RI: yangi o'zgaruvchi
  return <h3>{kattaSarlavha}</h3>
}`}</CodeBlock>

      <Quiz
        question={`KitobKartasi komponenti ichida "sarlavha = sarlavha.toUpperCase()" deb o'z propsini qayta yozsa, nima bo'ladi?`}
        options={[
          "Kod ishlaydi, lekin bu React'ning qoidasini buzadi va komponent qayta render bo'lganda o'zgartirish yo'qoladi",
          "Komponent qayta render bo'lganda ota komponentdagi asl qiymat ham katta harfga aylanadi",
          'Build vaqtida JSX kompilyatsiya xatosi chiqadi',
          "React bu qatorni ishga tushirishning o'zini bloklab, ishga tushish vaqtida xato tashlaydi",
        ]}
        correctIndex={0}
        explanation="sarlavha — funksiyaning mahalliy o'zgaruvchisi, uni qayta yozish sintaktik jihatdan ishlab ketadi, lekin ota komponentdagi asl qiymatga ta'sir qilmaydi va keyingi render'da yo'qoladi. Shunga qaramay, bu React'ning 'props faqat o'qish uchun' qoidasini buzadi, shuning uchun bunday kod yozilmaydi."
      />

      <Exercise title="Mashq">
        <p>
          <code>Mahsulot</code> nomli funksional komponent yozing, u <code>nomi</code> va{' '}
          <code>narx</code> props'larini destructuring orqali qabul qilsin.{' '}
          <code>narx</code> prop'i uchun standart qiymat <code>0</code> qilib belgilang. Komponent{' '}
          <code>{'<h4>{nomi}</h4>'}</code> va <code>{'<p>Narxi: {narx} so\'m</p>'}</code>ni
          qaytarsin. So'ng <code>App</code> ichida uni ikki marta chaqiring: birinchisida ham{' '}
          <code>nomi</code>, ham <code>narx</code>ni bering, ikkinchisida faqat{' '}
          <code>nomi</code>ni bering (standart qiymat ishlashini tekshirish uchun).
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`function Mahsulot({ nomi, narx = 0 }) {
  return (
    <div>
      <h4>{nomi}</h4>
      <p>Narxi: {narx} so'm</p>
    </div>
  )
}

function App() {
  return (
    <>
      <Mahsulot nomi="Daftar" narx={5000} />
      <Mahsulot nomi="Ruchka" />
      {/* narx berilmagan — standart qiymat 0 ishlatiladi */}
    </>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Props — ota komponentdan bola komponentga JSX atributlari orqali uzatiladigan
          ma'lumot; ular yagona obyekt sifatida komponent funksiyasining birinchi parametriga
          keladi.
        </li>
        <li>
          Props'ni <code>{'{ sarlavha, muallif }'}</code> ko'rinishida funksiya parametrida
          destructuring qilish — <code>props.sarlavha</code> deb yozishdan qisqaroq va React
          kodida keng tarqalgan uslub.
        </li>
        <li>
          Destructuring ichida <code>{'muallif = "..."'}</code> deb standart qiymat belgilash
          mumkin — u faqat prop berilmagan yoki <code>undefined</code> bo'lganda ishga tushadi.
        </li>
        <li>
          Ma'lumot faqat bitta yo'nalishda — ota komponentdan bolaga — oqadi (yuqoridan pastga
          oqim / top-down data flow).
        </li>
        <li>
          Props — faqat o'qish uchun (read-only): komponent o'ziga kelgan propsni hech qachon
          qayta yozmasligi yoki (ayniqsa obyekt/massiv bo'lsa) ichidan o'zgartirmasligi kerak.
        </li>
      </KeyPoints>
    </>
  )
}
