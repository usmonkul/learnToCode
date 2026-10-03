import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import Figure from '@/components/content/Figure'
import renderTree from '@/assets/render-tree.svg'

export const meta = {
  title: "Sof komponentlar",
  section: "UI'ni tasvirlash",
}

export default function PureComponentsLesson() {
  return (
    <>
      <h2>Muammo: raqamlar "o'zidan o'zi" sakraydi</h2>
      <p>
        Navbat chiptalarini chiqaradigan komponent yozdik. Har bir chiptaga tartib raqami
        kerak, shuning uchun tashqi o'zgaruvchini har chaqiruvda bittaga oshiramiz:
      </p>
      <CodeBlock lang="jsx">{`let tartibRaqami = 0

function Chipta() {
  tartibRaqami = tartibRaqami + 1     // tashqi o'zgaruvchini o'zgartiryapmiz!
  return <p>Chipta #{tartibRaqami}</p>
}

export default function Navbat() {
  return (
    <>
      <Chipta />
      <Chipta />
      <Chipta />
    </>
  )
}`}</CodeBlock>
      <p>
        Kutilgan natija: 1, 2, 3. Brauzerda esa (dasturlash rejimida) <strong>2, 4, 6</strong>{' '}
        chiqadi. Sahifadagi boshqa narsa o'zgarib, komponent qayta chizilsa — 8, 10, 12. Kod
        bitta, natija esa har safar boshqacha.
      </p>
      <p>
        Bu React'dagi xato emas. Bu komponent React bilan tuzilgan kelishuvni buzdi: u{' '}
        <strong>sof (pure)</strong> emas. Bu dars React'ning eng muhim, lekin ko'pincha
        tushuntirilmay qoladigan qoidasi haqida.
      </p>

      <h2>Sof funksiya nima?</h2>
      <p>Matematikadan tanish g'oya. Funksiya sof bo'lishi uchun ikki shart bajarilishi kerak:</p>
      <ol>
        <li>
          <strong>Bir xil kirish — bir xil natija.</strong> <code>y = 2x</code> funksiyasi{' '}
          <code>x = 3</code> uchun har doim <code>6</code> qaytaradi — bugun ham, ertaga ham,
          yuz marta chaqirilsa ham.
        </li>
        <li>
          <strong>O'z ishi bilan band.</strong> U chaqirilishidan oldin mavjud bo'lgan hech
          narsani — tashqi o'zgaruvchilarni, argument sifatida kelgan obyektlarni, sahifani —
          o'zgartirmaydi.
        </li>
      </ol>
      <CodeBlock lang="js">{`// SOF: faqat argumentdan natija hisoblaydi
function ikkiBarobar(x) {
  return x * 2
}

// SOF EMAS: tashqi o'zgaruvchini o'zgartiradi
let jami = 0
function qosh(x) {
  jami += x
  return jami
}
qosh(5) // 5
qosh(5) // 10 — kirish bir xil, natija boshqa!`}</CodeBlock>
      <p>
        React <strong>barcha komponentlaringiz sof funksiya</strong> deb hisoblaydi. Komponent
        uchun "kirish" — bu props (keyinroq state va context ham), "natija" — qaytarilgan JSX.
        Bir xil props bilan chaqirilgan komponent har doim bir xil JSX qaytarishi kerak.
      </p>

      <h2>Nega React buni talab qiladi?</h2>
      <p>
        Chunki komponentni <strong>React chaqiradi, siz emas</strong> — va qachon, necha marta
        chaqirishni ham o'zi hal qiladi. Komponent funksiyasining chaqirilishi{' '}
        <strong>render</strong> (chizish) deb ataladi. React komponentni:
      </p>
      <ul>
        <li>ilova ochilganda bir marta,</li>
        <li>uning ma'lumoti o'zgarganda qayta-qayta (re-render),</li>
        <li>ota komponent qayta chizilganda — ota bilan birga,</li>
        <li>dasturlash rejimida tekshirish uchun ataylab ikki marta</li>
      </ul>
      <p>
        render qilishi mumkin. Agar komponent sof bo'lsa, bularning hech biri muammo emas: necha
        marta chaqirilmasin, natija bir xil. Sof bo'lmasa — yuqoridagi chiptalar kabi, natija
        komponent necha marta chaqirilganiga bog'liq bo'lib qoladi. Shu kafolat tufayli React
        renderlarni xavfsiz takrorlay oladi, keraksizlarini o'tkazib yuboradi va
        optimallashtira oladi.
      </p>

      <h2>Render daraxti</h2>
      <p>
        React render'ni ildizdan boshlaydi: <code>App</code>ni chaqiradi, u qaytargan JSX'da{' '}
        <code>Sarlavha</code> va <code>Menyu</code>ni ko'radi va ularni chaqiradi, so'ng ularning
        ichidagilarni — va hokazo. Shu tarzda hosil bo'lgan "kim kimni chizdi" tuzilmasi{' '}
        <strong>render daraxti</strong> deb ataladi. Muhim xususiyati: biror komponent qayta
        chizilsa, React uning <strong>ichidagi barcha komponentlarni ham</strong> qayta
        chaqiradi.
      </p>
      <Figure
        src={renderTree}
        alt="App'dan Sarlavha va Menyu'ga, Menyu'dan uchta TaomKartasi'ga strelkalar. Menyu va uning TaomKartasi'lari qayta chizilgan deb belgilangan, Sarlavha esa tegilmagan."
        caption="1-rasm: Menyu qayta chizilganda uning butun pastki daraxti qayta chaqiriladi"
      />
      <p>
        Demak, bitta o'zgarish o'nlab komponentni qayta chaqirishga olib kelishi mumkin. Bu
        normal va odatda juda tez — lekin faqat komponentlar sof bo'lsa xavfsiz: "ortiqcha"
        chaqiruv hech narsani buzmasligi kerak.
      </p>

      <h2>StrictMode: ataylab ikki marta</h2>
      <p>
        2-darsda <code>main.jsx</code>da <code>{'<StrictMode>'}</code>ni ko'rdik. Endi uning
        vazifasi aniq: dasturlash rejimida u har bir komponentni{' '}
        <strong>ikki marta</strong> chaqiradi va ikkinchi natijani ishlatadi. Sof komponent
        uchun bu sezilmaydi. Sof bo'lmagan komponent esa darhol "o'zini fosh qiladi" — chiptalar
        1, 2, 3 o'rniga 2, 4, 6 bo'lib qoladi. Ya'ni StrictMode xatoni yaratmadi, u yashirin
        xatoni <em>ko'rinadigan</em> qildi.
      </p>
      <Callout type="note" title="Ishlab chiqarishda (production) ikki marta yo'q">
        Ikki marta chaqirish faqat <code>npm run dev</code>da bo'ladi. <code>npm run build</code>{' '}
        bilan yig'ilgan versiyada StrictMode hech narsa qilmaydi. Shuning uchun uni o'chirib
        qo'yish yechim emas — xato baribir qoladi, faqat foydalanuvchida, kutilmagan payt
        chiqadi.
      </Callout>

      <h2>Tuzatish: ma'lumotni props orqali bering</h2>
      <p>
        Chipta o'z raqamini o'zi hisoblamasin — uni tashqaridan, prop sifatida olsin. Endi{' '}
        <code>Chipta</code> faqat kirishidan natija yasaydi:
      </p>
      <CodeBlock lang="jsx">{`function Chipta({ raqam }) {
  return <p>Chipta #{raqam}</p>
}

export default function Navbat() {
  return (
    <>
      <Chipta raqam={1} />
      <Chipta raqam={2} />
      <Chipta raqam={3} />
    </>
  )
}`}</CodeBlock>
      <p>
        Endi har qanday holatda — bir marta, ikki marta yoki yuz marta render bo'lsa ham —
        natija 1, 2, 3. Ro'yxat massivdan kelganda esa <code>map</code> ikkinchi argumenti
        tayyor raqamni beradi: <code>{'navbat.map((odam, i) => <Chipta key={odam.id} raqam={i + 1} />)'}</code>.
      </p>

      <h2>Mahalliy o'zgartirish — mumkin</h2>
      <p>
        "Hech narsani o'zgartirma" degani "render ichida hech qanday o'zgaruvchi o'zgarmasin"
        degani emas. Komponent <strong>shu renderning o'zida yaratgan</strong> narsasini bemalol
        o'zgartirishi mumkin — u tashqi dunyoga hech qanday ta'sir qilmaydi:
      </p>
      <CodeBlock lang="jsx">{`function Navbat({ odamlar }) {
  const chiptalar = []                      // shu renderda yaratildi
  for (let i = 0; i < odamlar.length; i++) {
    chiptalar.push(                          // mahalliy massivni o'zgartirish — XAVFSIZ
      <Chipta key={odamlar[i].id} raqam={i + 1} />
    )
  }
  return <>{chiptalar}</>
}`}</CodeBlock>
      <p>
        Muammo faqat render <em>boshlanishidan oldin</em> mavjud bo'lgan narsani o'zgartirishda:
        modul darajasidagi o'zgaruvchilar, props, ota komponentdan kelgan massiv va obyektlar.
      </p>

      <h2>Unda "harakat" qayerda bo'ladi?</h2>
      <p>
        Ilova faqat ekran chizib turmaydi: tugma bosilganda ma'lumot o'zgaradi, serverga so'rov
        ketadi, <code>localStorage</code>ga yoziladi. Bunday "tashqi dunyoni o'zgartiradigan"
        ishlar <strong>side effect</strong> (yon ta'sir) deb ataladi. Ular renderda emas, ikki
        boshqa joyda yashaydi:
      </p>
      <ul>
        <li>
          <strong>Event handler</strong>lar (hodisa ishlovchilari) — foydalanuvchi biror narsa
          qilganda ishlaydigan funksiyalar. Ular render paytida emas, bosish paytida ishlaydi,
          shuning uchun sof bo'lishi shart emas. 12-darsda.
        </li>
        <li>
          <strong>Effect</strong>lar (yon ta'sir hook'i, <code>useEffect</code>) — "ekran chizilgandan keyin
          tashqi dunyo bilan sinxronlash" uchun. Faqat boshqa yo'l qolmaganda. 26-darsda.
        </li>
      </ul>
      <p>
        Qoidani bitta jumla bilan eslab qoling: <strong>render — faqat hisoblash; o'zgartirish
        — hodisalarda.</strong>
      </p>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Tashqi o'zgaruvchini render ichida o'zgartirish</strong> (
            <code>hisoblagich++</code>, <code>royxat.push(...)</code>) — natija render soniga
            bog'liq bo'lib qoladi.
          </li>
          <li>
            <strong>Props'dagi massiv yoki obyektni o'zgartirish.</strong>{' '}
            <code>kitoblar.sort()</code>, <code>kitob.narx = 0</code> — ota komponentning
            ma'lumotini buzadi. Nusxa ustida ishlang (<code>toSorted</code>, spread).
          </li>
          <li>
            <strong>Render ichida DOM'ga tegish yoki so'rov yuborish.</strong>{' '}
            <code>document.title = ...</code>, <code>fetch(...)</code>,{' '}
            <code>localStorage.setItem(...)</code> — bular side effect, ular hodisa yoki effect
            ichida bo'lishi kerak.
          </li>
          <li>
            <strong>"StrictMode xato chiqaryapti" deb uni o'chirish.</strong> StrictMode xatoni
            yaratmaydi, faqat ko'rsatadi. Komponentni tuzating.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="Quyidagilardan qaysi biri komponentning render qismida (funksiya tanasida, return'dan oldin) yozilsa, komponentni SOF EMAS qiladi?"
        options={[
          "Modul darajasidagi let savatchaSoni o'zgaruvchisini oshirish",
          "props.narx * 2 ni yangi o'zgaruvchiga yozish",
          "Shu renderda yaratilgan bo'sh massivga element qo'shish",
          "props.ism ni toUpperCase() bilan yangi o'zgaruvchiga yozish",
        ]}
        correctIndex={0}
        explanation="Modul darajasidagi o'zgaruvchi render boshlanishidan oldin mavjud — uni o'zgartirish tashqi dunyoga ta'sir qiladi va natija render soniga bog'liq bo'lib qoladi. Qolgan uchta variant faqat yangi qiymat hisoblaydi yoki shu renderda yaratilgan narsani o'zgartiradi — bular xavfsiz."
      />

      <Quiz
        question="Dasturlash rejimida komponentingiz konsolga ikki marta log chiqaryapti. Bu nimani bildiradi?"
        options={[
          "StrictMode komponentni sof ekanligini tekshirish uchun ataylab ikki marta chaqiryapti",
          "Komponentda xato bor va uni darhol tuzatish kerak",
          "React'ning versiyasi eskirgan",
          "Komponent ikki marta import qilingan",
        ]}
        correctIndex={0}
        explanation="StrictMode dasturlash rejimida har bir komponentni ikki marta chaqiradi. Agar komponent sof bo'lsa, buning hech qanday zarari yo'q — log ikki marta chiqishi normal. Ishlab chiqarish versiyasida bu sodir bo'lmaydi."
      />

      <Exercise title="1-mashq: sof qiling">
        <p>
          Quyidagi komponent mehmonlar ro'yxatini chiqaradi, lekin dasturlash rejimida ism
          yonidagi raqamlar noto'g'ri chiqadi. Sababini tushuntiring va komponentni sof qilib
          qayta yozing.
        </p>
        <CodeBlock lang="jsx">{`let hisob = 0

function Mehmon({ ism }) {
  hisob++
  return <li>{hisob}. {ism}</li>
}

function MehmonlarRoyxati({ mehmonlar }) {
  return (
    <ol>
      {mehmonlar.map((m) => (
        <Mehmon key={m.id} ism={m.ism} />
      ))}
    </ol>
  )
}`}</CodeBlock>
        <Solution>
          <p>
            <code>Mehmon</code> render paytida tashqi <code>hisob</code> o'zgaruvchisini
            o'zgartiradi. StrictMode har komponentni ikki marta chaqirgani uchun raqamlar 2, 4, 6
            bo'ladi, keyingi har bir qayta chizishda esa yanada oshib boradi. Raqamni
            tashqaridan uzatamiz:
          </p>
          <CodeBlock lang="jsx">{`function Mehmon({ raqam, ism }) {
  return <li>{raqam}. {ism}</li>
}

function MehmonlarRoyxati({ mehmonlar }) {
  return (
    <ol>
      {mehmonlar.map((m, i) => (
        <Mehmon key={m.id} raqam={i + 1} ism={m.ism} />
      ))}
    </ol>
  )
}`}</CodeBlock>
          <p>
            Yanada soddaroq: <code>{'<ol>'}</code> raqamlarni o'zi qo'yadi, shuning uchun
            raqamni umuman olib tashlash ham mumkin.
          </p>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: yashirin o'zgartirish">
        <p>
          Bu komponent birinchi qarashda sof ko'rinadi, lekin unda yashirin xato bor. Uni
          toping, nima uchun xavfli ekanini tushuntiring va tuzating.
        </p>
        <CodeBlock lang="jsx">{`function EngQimmatlari({ mahsulotlar }) {
  const saralangan = mahsulotlar.sort((a, b) => b.narx - a.narx)
  const uchtasi = saralangan.slice(0, 3)

  return (
    <ul>
      {uchtasi.map((m) => (
        <li key={m.id}>{m.nomi}</li>
      ))}
    </ul>
  )
}`}</CodeBlock>
        <Solution>
          <p>
            <code>sort()</code> yangi massiv yaratmaydi — u <code>mahsulotlar</code> massivini{' '}
            <em>joyida</em> qayta tartiblaydi va o'sha massivning o'zini qaytaradi. Bu massiv
            props orqali ota komponentdan kelgan, demak <code>EngQimmatlari</code> render
            paytida ota komponentning ma'lumotini o'zgartirib qo'ydi: ota o'z ro'yxatini
            boshqa tartibda chizishi mumkin. (<code>slice</code> esa xavfsiz — u yangi massiv
            qaytaradi.)
          </p>
          <CodeBlock lang="jsx">{`function EngQimmatlari({ mahsulotlar }) {
  const uchtasi = mahsulotlar
    .toSorted((a, b) => b.narx - a.narx)   // nusxa saralanadi
    .slice(0, 3)

  return (
    <ul>
      {uchtasi.map((m) => (
        <li key={m.id}>{m.nomi}</li>
      ))}
    </ul>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Sof komponent: bir xil props — bir xil JSX, va render paytida o'zidan oldin mavjud
          bo'lgan hech narsani o'zgartirmaydi.
        </li>
        <li>
          Komponentni React chaqiradi va buni istalgancha marta qilishi mumkin — sof bo'lish
          shuning uchun majburiy.
        </li>
        <li>
          <code>StrictMode</code> dasturlash rejimida komponentlarni ataylab ikki marta
          chaqirib, sof bo'lmagan kodni fosh qiladi; ishlab chiqarishda bunday qilmaydi.
        </li>
        <li>
          Shu renderda yaratilgan o'zgaruvchi va massivlarni o'zgartirish mumkin; props, modul
          o'zgaruvchilari va DOM'ni — yo'q.
        </li>
        <li>
          Side effect'lar (ma'lumotni o'zgartirish, so'rov, DOM) renderda emas — event
          handler'larda (12-dars) yoki, oxirgi chora sifatida, effect'larda (26-dars).
        </li>
      </KeyPoints>
    </>
  )
}
