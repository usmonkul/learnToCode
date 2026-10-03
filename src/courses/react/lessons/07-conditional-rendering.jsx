import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Shartli render',
  section: "UI'ni tasvirlash",
}

export default function ConditionalRenderingLesson() {
  return (
    <>
      <h2>Muammo: ma'lumotga qarab har xil ko'rinish</h2>
      <p>
        Haqiqiy UI deyarli hech qachon bir xil ko'rinmaydi. Mahsulot sotuvda bo'lsa — "Savatchaga"
        tugmasi, tugagan bo'lsa — "Sotuvda yo'q" yozuvi. Foydalanuvchi tizimga kirgan bo'lsa —
        uning ismi, kirmagan bo'lsa — "Kirish" tugmasi. Chegirma bo'lsa — eski narx ustidan
        chizilgan, bo'lmasa — oddiy narx.
      </p>
      <p>
        HTML'da bunday "agar ... bo'lsa" degan narsa yo'q. JSX esa JavaScript bo'lgani uchun, bu
        mantiqni oddiy JavaScript vositalari — <code>if</code>, <code>&&</code> va ternary
        operatori — bilan yozamiz. Bu <strong>shartli render (conditional rendering)</strong> deb
        ataladi. Bu darsdagi barcha misollarda shart props'dan keladi; 13-darsdan boshlab xuddi
        shu usullarni state bilan ishlatamiz.
      </p>

      <h2>
        <code>if</code> va erta <code>return</code>
      </h2>
      <p>
        Eng sodda va eng o'qiladigan usul — komponent funksiyasining ichida oddiy{' '}
        <code>if</code> bilan har xil JSX qaytarish:
      </p>
      <CodeBlock lang="jsx">{`function MahsulotHolati({ qoldiq }) {
  if (qoldiq === 0) {
    return <p className="tugagan">Sotuvda yo'q</p>
  }
  return <p className="mavjud">Omborda {qoldiq} dona bor</p>
}`}</CodeBlock>
      <p>
        <code>if</code> JSX'ning <em>ichida</em> ishlamaydi (u ifoda emas, 3-darsni eslang),
        lekin JSX'dan <em>oldin</em>, funksiya tanasida — bemalol. Bu usul ikki variant butunlay
        boshqa-boshqa ko'rinishga ega bo'lganda eng qulay.
      </p>

      <h3>
        Hech narsa chizmaslik: <code>return null</code>
      </h3>
      <p>
        Ba'zan komponent umuman hech narsa chiqarmasligi kerak — masalan, ko'rsatiladigan xabar
        yo'q bo'lsa. Buning uchun <code>null</code> qaytaring:
      </p>
      <CodeBlock lang="jsx">{`function OgohlantirishPaneli({ xabar }) {
  if (!xabar) {
    return null
  }

  return (
    <div className="ogohlantirish-paneli">
      <strong>Diqqat:</strong> {xabar}
    </div>
  )
}

<OgohlantirishPaneli xabar="Ertaga dars bo'lmaydi" />   // panel chiqadi
<OgohlantirishPaneli />                                  // hech narsa chiqmaydi`}</CodeBlock>
      <p>
        React uchun komponentdan <code>null</code> qaytarish — mutlaqo normal holat: ekranga hech
        qanday DOM elementi chiqmaydi. Bu naqsh "guard" (qo'riqchi) deb ham ataladi: funksiya
        boshida "ko'rsatishga hech narsa bo'lmasa — darhol chiqib ket", qolgan kod esa faqat
        normal holat uchun yoziladi.
      </p>

      <h2>Ternary operator: ikkalasidan biri</h2>
      <p>
        Ko'pincha butun komponent emas, faqat uning kichik bir bo'lagi shartga bog'liq bo'ladi.
        Butun JSX'ni ikki marta yozmaslik uchun <strong>ternary operator</strong> (
        <code>shart ? A : B</code>) to'g'ridan-to'g'ri JSX ichida ishlatiladi:
      </p>
      <CodeBlock lang="jsx">{`function MahsulotKartasi({ nomi, narx, qoldiq }) {
  return (
    <div className="karta">
      <h3>{nomi}</h3>
      <p>{narx} so'm</p>
      {qoldiq > 0 ? (
        <button>Savatchaga</button>
      ) : (
        <span className="tugagan">Sotuvda yo'q</span>
      )}
    </div>
  )
}`}</CodeBlock>
      <p>
        Ternary — <code>if/else</code>ning ifoda ko'rinishi: u qiymat qaytaradi, shuning uchun JSX
        ichiga joylashtirish mumkin. Ko'p qatorli JSX'ni ternary ichida qavslarga olib, yuqoridagi
        kabi formatlash odat tusiga kirgan.
      </p>
      <p>Ternary atributlarda ham juda qulay:</p>
      <CodeBlock lang="jsx">{`<span className={qoldiq > 0 ? 'belgi yashil' : 'belgi qizil'}>
  {qoldiq > 0 ? 'Mavjud' : 'Tugagan'}
</span>`}</CodeBlock>

      <h2>
        <code>&&</code> operatori: ko'rsatish yoki hech narsa
      </h2>
      <p>
        Agar "aks holda" qismi bo'sh bo'lsa — ya'ni shart to'g'ri bo'lganda nimadir chiqadi,
        bo'lmasa hech narsa — ternary'dagi <code>: null</code> ni yozib o'tirmaslik uchun{' '}
        <code>&&</code> (mantiqiy VA) ishlatiladi:
      </p>
      <CodeBlock lang="jsx">{`function KitobKartasi({ nomi, yangi, chegirma }) {
  return (
    <div className="karta">
      <h3>
        {nomi} {yangi && <span className="belgi">YANGI</span>}
      </h3>
      {chegirma && <p className="chegirma">Chegirma: {chegirma}%</p>}
    </div>
  )
}`}</CodeBlock>
      <p>
        <code>&&</code> chapdan o'ngga baholanadi: chap tomon falsy (<code>false</code>,{' '}
        <code>null</code>, <code>undefined</code>, <code>0</code>, <code>""</code>) bo'lsa,
        butun ifoda o'sha falsy qiymatning o'ziga teng bo'ladi; truthy bo'lsa — o'ng tomondagi
        JSX'ga. 3-darsdan eslaysiz: <code>false</code>, <code>null</code> va{' '}
        <code>undefined</code> ekranda hech narsa chizmaydi.
      </p>

      <h3>
        Klassik tuzoq: <code>0 &&</code>
      </h3>
      <p>
        Lekin <code>0</code> ham falsy, va 3-darsda ko'rganimizdek, u <strong>chiziladi</strong>.
        Yuqoridagi <code>KitobKartasi</code>ga <code>{'chegirma={0}'}</code> uzatilsa, ekranda
        yolg'iz <code>0</code> raqami paydo bo'ladi:
      </p>
      <CodeBlock lang="jsx">{`// chegirma = 0 bo'lganda: {0 && <p>...</p>}  →  {0}  →  ekranda "0"
{chegirma && <p className="chegirma">Chegirma: {chegirma}%</p>}

// TO'G'RI: chap tomon har doim haqiqiy true/false
{chegirma > 0 && <p className="chegirma">Chegirma: {chegirma}%</p>}`}</CodeBlock>
      <p>
        Qoida oddiy: <code>&&</code>ning chap tomoniga son yoki satrni to'g'ridan-to'g'ri
        qo'ymang. <code>{'soni > 0'}</code>, <code>{'royxat.length > 0'}</code>,{' '}
        <code>{"matn !== ''"}</code> kabi taqqoslash bilan uni boolean'ga aylantiring.
      </p>

      <h2>Ko'p variant: o'zgaruvchi yoki lug'at obyekt</h2>
      <p>
        Ikki emas, to'rt-besh variant bo'lsa, ternary'larni bir-birining ichiga joylashtirish (
        <code>a ? x : b ? y : z</code>) tezda o'qib bo'lmaydigan holga keladi. Bunday holatda
        variantni <code>return</code>dan oldin o'zgaruvchiga hisoblab qo'ying:
      </p>
      <CodeBlock lang="jsx">{`function BuyurtmaKartasi({ id, holat }) {
  let holatMatni
  if (holat === 'kutilmoqda') {
    holatMatni = <p className="sariq">Buyurtma kutilmoqda...</p>
  } else if (holat === 'yolda') {
    holatMatni = <p className="kok">Buyurtma yo'lda</p>
  } else if (holat === 'yetkazildi') {
    holatMatni = <p className="yashil">Buyurtma yetkazildi</p>
  } else {
    holatMatni = <p className="qizil">Noma'lum holat</p>
  }

  return (
    <div className="buyurtma-kartasi">
      <h3>Buyurtma #{id}</h3>
      {holatMatni}
    </div>
  )
}`}</CodeBlock>
      <p>
        Variantlar faqat matn yoki klass bilan farq qilsa, undan ham ixchamroq usul — kalitlari
        holat nomlari bo'lgan <strong>lug'at obyekt</strong>:
      </p>
      <CodeBlock lang="jsx">{`const HOLATLAR = {
  kutilmoqda: { matn: 'Buyurtma kutilmoqda...', klass: 'sariq' },
  yolda: { matn: "Buyurtma yo'lda", klass: 'kok' },
  yetkazildi: { matn: 'Buyurtma yetkazildi', klass: 'yashil' },
}

function BuyurtmaKartasi({ id, holat }) {
  const info = HOLATLAR[holat] ?? { matn: "Noma'lum holat", klass: 'qizil' }

  return (
    <div className="buyurtma-kartasi">
      <h3>Buyurtma #{id}</h3>
      <p className={info.klass}>{info.matn}</p>
    </div>
  )
}`}</CodeBlock>
      <p>
        Yangi holat qo'shish endi bitta qator — <code>HOLATLAR</code>ga yangi kalit. Komponent
        kodiga tegish shart emas.
      </p>

      <Callout type="note" title="Qaysi usulni qachon tanlash kerak?">
        <ul>
          <li>Butun komponent boshqacha yoki hech narsa — <code>if</code> + erta <code>return</code>.</li>
          <li>JSX ichidagi kichik bo'lak, ikki variant — ternary.</li>
          <li>JSX ichidagi kichik bo'lak, "bor yoki yo'q" — <code>&&</code> (chap tomon boolean!).</li>
          <li>Uch va undan ko'p variant — o'zgaruvchi yoki lug'at obyekt.</li>
        </ul>
      </Callout>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>
              <code>0 &&</code>.
            </strong>{' '}
            Son chap tomonda — ekranda tasodifiy <code>0</code>. Doim taqqoslang:{' '}
            <code>{'soni > 0 &&'}</code>.
          </li>
          <li>
            <strong>JSX ichida <code>if</code> yozish.</strong>{' '}
            <code>{'{if (x) { ... }}'}</code> — sintaksis xatosi. JSX ichida ternary yoki{' '}
            <code>&&</code>, JSX'dan oldin esa <code>if</code>.
          </li>
          <li>
            <strong>Ichma-ich ternary'lar.</strong> <code>a ? x : b ? y : c ? z : w</code> —
            ishlaydi, lekin uni hech kim o'qiy olmaydi. O'zgaruvchi yoki lug'at obyektga
            o'tkazing.
          </li>
          <li>
            <strong>Ternary'da "aks holda" qismini unutish.</strong>{' '}
            <code>{'{shart ? <A />}'}</code> — sintaksis xatosi. Ikkinchi qism kerak bo'lmasa,{' '}
            <code>&&</code> ishlating.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="tanlanganlarSoni === 0 bo'lganda, {tanlanganlarSoni && <p>Tanlanganlar bor</p>} ifodasi ekranga nima chiqaradi?"
        options={[
          "Hech narsa chiqmaydi, chunki 0 — falsy qiymat",
          "Ekranga yolg'iz 0 raqami chiqadi",
          "<p>Tanlanganlar bor</p> baribir chiqadi",
          "Build vaqtida xatolik yuz beradi",
        ]}
        correctIndex={1}
        explanation="0 && <p>...</p> ifodasining natijasi 0 ning o'zi, chunki && chap tomon falsy bo'lganda o'sha qiymatni qaytaradi. React esa 0 ni chizadi (false/null/undefined'dan farqli o'laroq). Shuning uchun tanlanganlarSoni > 0 && ... deb yozish kerak."
      />

      <Quiz
        question="Komponentda 5 xil buyurtma holati bor va har birida faqat matn va rang o'zgaradi. Eng toza yechim qaysi?"
        options={[
          "Holat nomlarini kalit qilib, matn va rangni lug'at obyektda saqlash",
          "JSX ichida to'rtta ichma-ich ternary",
          "Har bir holat uchun alohida && qatori",
          "Har bir holat uchun alohida komponent va beshta if",
        ]}
        correctIndex={0}
        explanation="Variantlar faqat ma'lumot (matn, klass) bilan farq qilganda, lug'at obyekt eng ixcham: mantiq bitta qator HOLATLAR[holat], yangi holat qo'shish esa obyektga bitta kalit qo'shish. Ichma-ich ternary o'qilmaydi, beshta && esa takrorlanuvchi kod."
      />

      <Exercise title="1-mashq: kirish tugmasi">
        <p>
          <code>FoydalanuvchiPaneli</code> komponentini yozing. U <code>ism</code> prop'ini
          oladi. Agar <code>ism</code> berilgan bo'lsa — "Salom, Aziz!" matni va "Chiqish"
          tugmasi chiqsin; berilmagan bo'lsa — faqat "Kirish" tugmasi. <code>App</code>da uni bir
          marta <code>ism</code> bilan, bir marta <code>ism</code>siz chaqirib tekshiring.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`function FoydalanuvchiPaneli({ ism }) {
  if (!ism) {
    return <button>Kirish</button>
  }

  return (
    <div>
      <span>Salom, {ism}!</span>
      <button>Chiqish</button>
    </div>
  )
}

function App() {
  return (
    <>
      <FoydalanuvchiPaneli ism="Aziz" />
      <FoydalanuvchiPaneli />
    </>
  )
}`}</CodeBlock>
          <p>
            Ikki holat butunlay boshqa JSX bo'lgani uchun erta <code>return</code> eng toza
            variant. Ternary bilan ham yozish mumkin edi, lekin u ancha uzun chiqadi.
          </p>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: narx kartasi">
        <p>
          <code>NarxKartasi</code> komponenti <code>nomi</code>, <code>narx</code>,{' '}
          <code>chegirma</code> (foizda, standart qiymati <code>0</code>) va <code>qoldiq</code>{' '}
          props'larini oladi. Talablar:
        </p>
        <ul>
          <li>
            Chegirma bo'lsa: eski narx <code>{'<s>'}</code> tegi ichida (chizilgan), yonida yangi
            narx. Bo'lmasa: faqat oddiy narx.
          </li>
          <li>Chegirma 0 bo'lganda ekranda hech qanday ortiqcha "0" chiqmasin.</li>
          <li>Qoldiq 5 dan kam (lekin 0 dan katta) bo'lsa, "Oz qoldi!" yozuvi chiqsin.</li>
          <li>Qoldiq 0 bo'lsa, butun karta o'rniga faqat "{'{nomi}'} — sotuvda yo'q" matni.</li>
        </ul>
        <Solution>
          <CodeBlock lang="jsx">{`function NarxKartasi({ nomi, narx, chegirma = 0, qoldiq }) {
  if (qoldiq === 0) {
    return <p className="tugagan">{nomi} — sotuvda yo'q</p>
  }

  const yangiNarx = narx * (1 - chegirma / 100)

  return (
    <div className="karta">
      <h3>{nomi}</h3>
      {chegirma > 0 ? (
        <p>
          <s>{narx} so'm</s> <strong>{yangiNarx} so'm</strong>
        </p>
      ) : (
        <p>{narx} so'm</p>
      )}
      {qoldiq < 5 && <p className="ogohlantirish">Oz qoldi!</p>}
    </div>
  )
}`}</CodeBlock>
          <p>
            Uchta usul birga ishladi: tugagan mahsulot uchun erta <code>return</code>, narx
            uchun ternary, "Oz qoldi" uchun <code>&&</code>. <code>{'qoldiq < 5'}</code> har doim
            boolean bo'lgani uchun "0" muammosi yo'q; <code>qoldiq === 0</code> holati esa
            yuqorida allaqachon chiqib ketgan.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Shartli render — oddiy JavaScript: JSX'dan oldin <code>if</code>, JSX ichida ternary
          yoki <code>&&</code>.
        </li>
        <li>
          <code>return null</code> — komponent hech narsa chizmasligi uchun; funksiya boshidagi
          "guard" sifatida juda qulay.
        </li>
        <li>
          <code>shart ? A : B</code> — ikki variantdan biri; <code>{'shart && <A />'}</code> —
          "bor yoki yo'q".
        </li>
        <li>
          <code>&&</code>ning chap tomoni doim boolean bo'lsin: aks holda <code>0</code>{' '}
          ekranga chiqib qoladi.
        </li>
        <li>
          Uch va undan ko'p variant uchun — <code>return</code>dan oldingi o'zgaruvchi yoki lug'at
          obyekt, ichma-ich ternary emas.
        </li>
      </KeyPoints>
    </>
  )
}
