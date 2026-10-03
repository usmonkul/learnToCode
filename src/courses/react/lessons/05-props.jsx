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
  section: "UI'ni tasvirlash",
}

export default function PropsLesson() {
  return (
    <>
      <h2>Muammo: bir xil komponent, har xil ma'lumot</h2>
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

      <h2>Props sifatida istalgan JavaScript qiymati</h2>
      <p>
        Qo'shtirnoqdagi qiymat har doim <strong>satr</strong> bo'ladi. Son, mantiqiy qiymat,
        massiv yoki obyekt uzatish uchun jingalak qavs kerak — xuddi 3-darsdagi atributlar
        kabi:
      </p>
      <CodeBlock lang="jsx">{`<KitobKartasi
  sarlavha="O'tkan kunlar"            // satr
  sahifalar={384}                       // son
  mavjud={true}                         // boolean
  janrlar={['roman', 'tarixiy']}        // massiv
  muallif={{ ism: 'Abdulla', familiya: 'Qodiriy' }}  // obyekt — ikki qavat qavs!
/>`}</CodeBlock>
      <p>
        <code>{"muallif={{ ... }}"}</code>dagi ikki qavat qavs maxsus sintaksis emas: tashqi
        juft — "bu yerda JavaScript qiymati", ichki juft — obyekt literalining o'zi.
      </p>
      <p>
        Mantiqiy prop uchun qisqa yozuv ham bor: qiymatsiz yozilgan atribut <code>true</code>{' '}
        degani. <code>{'<KitobKartasi mavjud />'}</code> ={' '}
        <code>{'<KitobKartasi mavjud={true} />'}</code>.
      </p>
      <p>
        Props sifatida hatto funksiya ham uzatish mumkin — bola komponent otaga "xabar berishi"
        aynan shu yo'l bilan bo'ladi. Buni 12-darsda, hodisalar bilan birga ko'ramiz.
      </p>

      <h3>Obyektni spread bilan uzatish</h3>
      <p>
        Agar ma'lumot allaqachon obyektda bo'lsa va uning maydon nomlari props nomlariga mos
        kelsa, spread sintaksisi bilan hammasini birdaniga uzatish mumkin:
      </p>
      <CodeBlock lang="jsx">{`const kitob = { sarlavha: "O'tkan kunlar", muallif: 'Abdulla Qodiriy' }

<KitobKartasi {...kitob} />
// bu bilan bir xil:
<KitobKartasi sarlavha={kitob.sarlavha} muallif={kitob.muallif} />`}</CodeBlock>
      <p>
        Qulay, lekin me'yorida ishlating: <code>{'{...kitob}'}</code> ko'rinishida komponent
        aslida qaysi props'ni olayotgani ko'rinmay qoladi.
      </p>

      <h2>Props — faqat o'qish uchun (read-only)</h2>
      <p>
        Eng muhim qoida: komponent o'ziga kelgan props'ni <strong>o'zgartirmasligi</strong>{' '}
        (mutate) kerak. Ayniqsa xavfli holat — prop sifatida obyekt yoki massiv kelganda:
      </p>
      <CodeBlock lang="jsx">{`function ChegirmaliKarta({ kitob }) {
  kitob.narx = kitob.narx * 0.9     // XATO: ota komponentning obyektini o'zgartiryapti!
  return <p>{kitob.nomi}: {kitob.narx} so'm</p>
}`}</CodeBlock>
      <p>
        JavaScript'da obyekt va massivlar havola (reference) orqali uzatiladi: <code>kitob</code>{' '}
        — ota komponentdagi <em>aynan o'sha</em> obyekt, nusxasi emas. Shuning uchun{' '}
        <code>kitob.narx = ...</code> ota komponentning ma'lumotini ham o'zgartiradi. Komponent
        har safar chizilganda narx yana 10% ga kamayadi, va shu kitobni ko'rsatadigan boshqa
        komponentlar ham noto'g'ri narxni ko'radi. <code>push</code>, <code>sort</code>,{' '}
        <code>splice</code> kabi massivni joyida o'zgartiradigan metodlar ham xuddi shunday
        xavfli.
      </p>
      <p>
        React barcha komponentlarni <strong>sof funksiya (pure function)</strong> deb biladi:
        bir xil props uchun doim bir xil natija, va hech narsani o'zgartirmaslik. Props'ni
        o'zgartirish aynan shu kelishuvni buzadi (sof komponentlar haqida 9-darsda batafsil).
        Agar props asosida boshqa qiymat kerak bo'lsa, uni <strong>yangi</strong>{' '}
        o'zgaruvchiga hisoblang:
      </p>
      <CodeBlock lang="jsx">{`function ChegirmaliKarta({ kitob }) {
  const yangiNarx = kitob.narx * 0.9   // TO'G'RI: yangi o'zgaruvchi, kitob tegilmagan
  return <p>{kitob.nomi}: {yangiNarx} so'm</p>
}`}</CodeBlock>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Sonni qo'shtirnoqda uzatish.</strong> <code>{'narx="5000"'}</code> — bu
            satr; <code>{'narx + 1000'}</code> natijasi <code>"50001000"</code> bo'ladi. Son
            uchun <code>{'narx={5000}'}</code>.
          </li>
          <li>
            <strong>Destructuring'da jingalak qavsni unutish.</strong>{' '}
            <code>function Karta(sarlavha)</code> — bu yerda <code>sarlavha</code> aslida butun
            props obyekti; <code>{'{sarlavha}'}</code> esa ekranda xato beradi. To'g'risi —{' '}
            <code>{'function Karta({ sarlavha })'}</code>.
          </li>
          <li>
            <strong>Prop nomida xato.</strong> <code>{'<Karta sarlavh="..." />'}</code> —
            React ogohlantirmaydi, prop shunchaki <code>undefined</code> bo'lib keladi. Ekranda
            narsa chiqmasa, birinchi navbatda nomlarni solishtiring (React DevTools'da props
            ko'rinadi).
          </li>
          <li>
            <strong>Props'ni o'zgartirish</strong> — ayniqsa obyekt yoki massiv props ichini
            (<code>.push</code>, <code>obj.x = ...</code>). Yangi qiymat kerak bo'lsa, yangi
            o'zgaruvchi yarating.
          </li>
        </ul>
      </Callout>

      <Quiz
        question={`Komponent ichida props'dan kelgan massivga "janrlar.push('yangi')" qilinsa, nima bo'ladi?`}
        options={[
          "Ota komponentdagi asl massiv ham o'zgaradi, chunki massiv havola orqali uzatilgan",
          "Faqat komponent ichidagi nusxa o'zgaradi, ota komponentga ta'siri yo'q",
          "Build vaqtida JSX kompilyatsiya xatosi chiqadi",
          "React push'ni avtomatik bloklaydi",
        ]}
        correctIndex={0}
        explanation="Props orqali kelgan massiv — ota komponentdagi aynan o'sha massiv, nusxa emas. push uni joyida o'zgartiradi, shuning uchun ota komponentning ma'lumoti ham buziladi. Bu 'props faqat o'qish uchun' qoidasini buzadi; kerak bo'lsa yangi massiv yarating: [...janrlar, 'yangi']."
      />

      <Quiz
        question={`<Narx qiymat="5000" /> deb chaqirilgan komponent ichida {qiymat + 1000} hisoblanadi. Ekranda nima chiqadi?`}
        options={['50001000', '6000', 'NaN', "Xato: satrga son qo'shib bo'lmaydi"]}
        correctIndex={0}
        explanation="Qo'shtirnoqdagi prop har doim satr. Satrga son qo'shilganda JavaScript ularni birlashtiradi: '5000' + 1000 = '50001000'. Son uzatish uchun qiymat={5000} deb yozish kerak."
      />

      <Exercise title="1-mashq: Mahsulot komponenti">
        <p>
          <code>Mahsulot</code> nomli funksional komponent yozing, u <code>nomi</code> va{' '}
          <code>narx</code> props'larini destructuring orqali qabul qilsin.{' '}
          <code>narx</code> prop'i uchun standart qiymat <code>0</code> qilib belgilang. Komponent{' '}
          <code>{'<h4>{nomi}</h4>'}</code> va <code>{"<p>Narxi: {narx} so'm</p>"}</code>ni
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

      <Exercise title="2-mashq: talaba profili">
        <p>
          <code>TalabaProfili</code> komponentini yozing. U quyidagi props'larni oladi:{' '}
          <code>ism</code> (satr), <code>kurs</code> (son), <code>fanlar</code> (satrlar
          massivi) va <code>aloqa</code> (<code>{'{ telefon, email }'}</code> obyekti).
          Komponent ismni sarlavhada, "3-kurs talabasi" ko'rinishidagi matnni, fanlar sonini
          ("4 ta fan") va email'ni chiqarsin. <code>App</code>da uni barcha props'larni to'g'ri
          turdagi qiymat bilan uzatib chaqiring.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`function TalabaProfili({ ism, kurs, fanlar, aloqa }) {
  return (
    <section>
      <h2>{ism}</h2>
      <p>{kurs}-kurs talabasi</p>
      <p>{fanlar.length} ta fan</p>
      <p>Email: {aloqa.email}</p>
    </section>
  )
}

function App() {
  return (
    <TalabaProfili
      ism="Malika Yusupova"
      kurs={3}
      fanlar={['Matematika', 'Fizika', 'Informatika', 'Ingliz tili']}
      aloqa={{ telefon: '+998 90 123 45 67', email: 'malika@example.com' }}
    />
  )
}`}</CodeBlock>
          <p>
            Fanlarning o'zini ro'yxat qilib chiqarish uchun massivni JSX elementlariga
            aylantirish kerak — buni 8-darsda o'rganamiz.
          </p>
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
          Qo'shtirnoqdagi prop — satr; son, boolean, massiv, obyekt va funksiya jingalak qavs
          bilan uzatiladi (<code>{'narx={5000}'}</code>,{' '}
          <code>{'muallif={{ ism: "..." }}'}</code>).
        </li>
        <li>
          Ma'lumot faqat bitta yo'nalishda — ota komponentdan bolaga — oqadi (yuqoridan pastga
          oqim / top-down data flow).
        </li>
        <li>
          Props — faqat o'qish uchun (read-only): ayniqsa obyekt va massiv props'ni ichidan
          o'zgartirmang (<code>obj.x = ...</code>, <code>push</code>, <code>sort</code>) — ular
          ota komponentning ma'lumoti. Yangi qiymatni yangi o'zgaruvchiga hisoblang.
        </li>
      </KeyPoints>
    </>
  )
}
