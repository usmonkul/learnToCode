import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import Figure from '@/components/content/Figure'
import copyVsMutate from '@/assets/copy-vs-mutate.svg'

export const meta = {
  title: "State'dagi obyektlarni yangilash",
  section: 'Interaktivlik',
}

export default function StateObjectsLesson() {
  return (
    <>
      <h2>Muammo: o'zgartirdim, lekin ekran "qotib" qoldi</h2>
      <p>
        Buyurtma kartasi bir nechta bog'liq maydondan iborat, shuning uchun ularni bitta
        obyektda saqlaymiz. Porsiya sonini oshirish uchun eng tabiiy JavaScript kodi:
      </p>
      <CodeBlock lang="jsx">{`const [buyurtma, setBuyurtma] = useState({
  taom: 'Osh',
  porsiya: 1,
  izoh: '',
})

function handlePlus() {
  buyurtma.porsiya = buyurtma.porsiya + 1   // obyektni o'zgartiramiz
  setBuyurtma(buyurtma)                      // va uni setter'ga beramiz
}`}</CodeBlock>
      <p>
        Bosamiz — hech narsa bo'lmaydi. Konsolga chiqarsak, <code>porsiya</code> haqiqatan oshgan.
        Lekin ekran eskicha. Keyin boshqa narsa (masalan, izoh) o'zgartirilsa, porsiya birdan
        "sakrab" yangi qiymatga o'tadi. Bunday xatolar eng chalkashlari — ular kodning boshqa
        joyidagi o'zgarishga bog'liq bo'lib, gohida bor, gohida yo'q.
      </p>

      <h2>Nima uchun bunday bo'ldi?</h2>
      <p>
        14-darsning oxirida aytganimizdek, React setter'ga berilgan qiymatni oldingi qiymat bilan
        solishtiradi va bir xil bo'lsa — render qilmaydi. Obyektlar uchun "bir xil" degani{' '}
        <strong>aynan o'sha obyekt</strong> (xotiradagi o'sha manzil) degani — ichidagi
        maydonlar emas. Biz obyektning ichini o'zgartirdik, lekin setter'ga{' '}
        <em>o'sha obyektning o'zini</em> berdik. React uchun: "eski obyekt === yangi obyekt —
        o'zgarish yo'q".
      </p>
      <Figure
        src={copyVsMutate}
        alt="Chapda: user.ism o'zgartirilib, o'sha obyekt setUser'ga beriladi — eski va yangi state bir xil obyekt, render yo'q. O'ngda: spread bilan yangi obyekt yaratiladi — eski obyekt o'zgarmagan, yangisi boshqa obyekt, React qayta render qiladi."
        caption="1-rasm: React obyektning ichini emas, havolasini solishtiradi"
      />
      <p>
        Bundan tashqari, mutatsiya (obyektni joyida o'zgartirish) 14-darsdagi "surat"ni ham
        buzadi: eski render paytida yaratilgan handler'lar endi o'zgargan obyektni ko'radi.
        Shuning uchun qoida qat'iy:
      </p>
      <Callout type="note" title="Asosiy qoida">
        State'dagi obyektni <strong>faqat o'qish uchun</strong> deb hisoblang. Uni o'zgartirish
        o'rniga, kerakli o'zgarish bilan <strong>yangi obyekt</strong> yarating va setter'ga
        shuni bering. Bu yondashuv <strong>immutable</strong> (o'zgarmas) yangilash deb ataladi.
      </Callout>

      <h2>Spread bilan nusxa olish</h2>
      <p>
        JavaScript'ning spread sintaksisi (<code>...</code>) obyektning barcha maydonlarini yangi
        obyektga ko'chiradi. Undan keyin yozilgan maydon esa ko'chirilganning ustiga yoziladi:
      </p>
      <CodeBlock lang="jsx">{`function handlePlus() {
  setBuyurtma({
    ...buyurtma,                    // taom, porsiya, izoh — hammasi ko'chiriladi
    porsiya: buyurtma.porsiya + 1,  // porsiya esa yangisi bilan almashtiriladi
  })
}`}</CodeBlock>
      <p>
        Natija — yangi obyekt: <code>{"{ taom: 'Osh', porsiya: 2, izoh: '' }"}</code>. Eski
        obyekt tegilmagan. React yangi havolani ko'radi va qayta render qiladi.
      </p>
      <p>
        Spread'siz, faqat o'zgargan maydonni bersangiz, qolganlari yo'qoladi —{' '}
        <code>useState</code> setter'i maydonlarni "birlashtirmaydi", u state'ni butunlay
        almashtiradi:
      </p>
      <CodeBlock lang="jsx">{`setBuyurtma({ porsiya: 2 })
// state endi: { porsiya: 2 } — taom va izoh YO'QOLDI`}</CodeBlock>
      <p>
        Yangi qiymat oldingisidan hisoblangani uchun 14-darsdagi updater shakli ham ishlaydi va
        ketma-ket yangilanishlarda xavfsizroq:
      </p>
      <CodeBlock lang="jsx">{`setBuyurtma((b) => ({ ...b, porsiya: b.porsiya + 1 }))`}</CodeBlock>
      <p>
        E'tibor bering: strelkali funksiyadan obyekt qaytarish uchun uni qavsga olish kerak —{' '}
        <code>{'(b) => ({ ... })'}</code>. Qavssiz <code>{'{'}</code> funksiya tanasining boshi
        deb tushuniladi.
      </p>

      <h2>Bitta handler — ko'p maydon</h2>
      <p>
        Obyektdagi har bir maydon uchun alohida handler yozish shart emas. Input'ga{' '}
        <code>name</code> atributi berib, uni <strong>hisoblangan kalit</strong> (
        <code>[nom]: qiymat</code>) sifatida ishlatish mumkin:
      </p>
      <CodeBlock lang="jsx">{`export default function Profil() {
  const [profil, setProfil] = useState({
    ism: '',
    familiya: '',
    telefon: '',
  })

  function handleChange(e) {
    setProfil({
      ...profil,
      [e.target.name]: e.target.value,   // name="ism" bo'lsa — ism: '...'
    })
  }

  return (
    <>
      <input name="ism" value={profil.ism} onChange={handleChange} />
      <input name="familiya" value={profil.familiya} onChange={handleChange} />
      <input name="telefon" value={profil.telefon} onChange={handleChange} />
      <p>
        {profil.ism} {profil.familiya} — {profil.telefon}
      </p>
    </>
  )
}`}</CodeBlock>
      <p>
        <code>{'value={...}'}</code> va <code>onChange</code> juftligi — boshqariladigan input
        (controlled input) — 17-darsning mavzusi. Hozircha <code>[e.target.name]</code> naqshiga
        e'tibor bering: bitta funksiya istalgancha maydonni boshqaradi.
      </p>

      <h2>Ichma-ich obyektlar</h2>
      <p>
        Spread faqat <strong>bir qavat</strong> chuqurlikda nusxa oladi (shallow copy). Ichki
        obyekt nusxalanmaydi — yangi obyekt o'sha ichki obyektga havola saqlaydi:
      </p>
      <CodeBlock lang="jsx">{`const [buyurtma, setBuyurtma] = useState({
  taom: 'Osh',
  manzil: {
    shahar: 'Toshkent',
    kocha: 'Navoiy 12',
  },
})

// XATO: ichki obyekt mutatsiya qilinyapti
buyurtma.manzil.kocha = 'Bobur 5'
setBuyurtma({ ...buyurtma })
// tashqi obyekt yangi, lekin manzil — o'sha ESKI obyekt, va u o'zgartirildi`}</CodeBlock>
      <p>
        Bu yerda render bo'ladi (tashqi obyekt yangi), lekin eski state ham buzildi: oldingi
        suratdagi <code>manzil</code> ham endi "Bobur 5". Agar boshqa komponent shu{' '}
        <code>manzil</code> obyektini olgan bo'lsa, u ham jimgina o'zgaradi.
      </p>
      <p>
        Ichki maydonni yangilash uchun <strong>yo'l bo'yidagi har bir qavatni</strong>{' '}
        nusxalash kerak:
      </p>
      <CodeBlock lang="jsx">{`setBuyurtma({
  ...buyurtma,               // 1-qavat nusxasi
  manzil: {
    ...buyurtma.manzil,      // 2-qavat nusxasi
    kocha: 'Bobur 5',        // va faqat shu maydon yangi
  },
})`}</CodeBlock>
      <p>
        Uch-to'rt qavatli obyektlarda bu tez noqulay bo'lib qoladi. Ikki yo'l bor: state'ni
        tekisroq qilib loyihalash (19-dars), yoki <strong>Immer</strong> kutubxonasi — u
        "mutatsiya qilayotgandek" yozishga ruxsat beradi, lekin ichida o'zi yangi obyekt yaratadi.
        Avval spread'ni yaxshi o'rganing: Immer ham aynan shu ishni avtomatlashtiradi, xolos.
      </p>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Mutatsiya + o'sha obyektni setter'ga berish.</strong>{' '}
            <code>obj.x = 1; setObj(obj)</code> — render bo'lmaydi. Doim{' '}
            <code>{'setObj({ ...obj, x: 1 })'}</code>.
          </li>
          <li>
            <strong>Spread'ni unutish.</strong> <code>{'setObj({ x: 1 })'}</code> — qolgan barcha
            maydonlar o'chadi. Setter birlashtirmaydi, almashtiradi.
          </li>
          <li>
            <strong>Spread'ni oxirga qo'yish.</strong>{' '}
            <code>{'{ x: 1, ...obj }'}</code> — <code>obj.x</code> yangi qiymat ustidan yoziladi.
            Spread — birinchi, o'zgarishlar — keyin.
          </li>
          <li>
            <strong>Ichki obyektni nusxalamaslik.</strong> Spread faqat bir qavat; ichki obyektni
            ham <code>{'{ ...obj.ichki, ... }'}</code> bilan nusxalang.
          </li>
          <li>
            <strong>Updater'da qavslarni unutish.</strong> <code>{'prev => { ...prev }'}</code>{' '}
            — sintaksis xatosi yoki <code>undefined</code>. To'g'risi:{' '}
            <code>{'prev => ({ ...prev })'}</code>.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="state = { ism: 'Ali', yosh: 20, shahar: 'Buxoro' }. setState({ ...state, yosh: 21, ism: 'Vali' }) dan keyin state qanday bo'ladi?"
        options={[
          "{ ism: 'Vali', yosh: 21, shahar: 'Buxoro' }",
          "{ yosh: 21, ism: 'Vali' }",
          "{ ism: 'Ali', yosh: 20, shahar: 'Buxoro' }",
          "{ ism: 'Ali', yosh: 21, shahar: 'Buxoro' }",
        ]}
        correctIndex={0}
        explanation="Spread barcha maydonlarni ko'chiradi, keyin yozilgan yosh va ism ularning ustidan yoziladi. shahar o'zgarishsiz qoladi."
      />

      <Quiz
        question="Quyidagilardan qaysi biri state'dagi obyektni TO'G'RI yangilaydi?"
        options={[
          "setSozlama({ ...sozlama, tungiRejim: !sozlama.tungiRejim })",
          "sozlama.tungiRejim = !sozlama.tungiRejim; setSozlama(sozlama)",
          "setSozlama({ tungiRejim: !sozlama.tungiRejim })",
          "setSozlama(Object.assign(sozlama, { tungiRejim: true }))",
        ]}
        correctIndex={0}
        explanation="Faqat birinchi variant yangi obyekt yaratadi va qolgan maydonlarni saqlaydi. Ikkinchisi va to'rtinchisi (Object.assign birinchi argumentni o'zgartiradi) o'sha obyektni mutatsiya qiladi — render bo'lmaydi. Uchinchisi qolgan maydonlarni o'chirib yuboradi."
      />

      <Exercise title="1-mashq: sozlamalar paneli">
        <p>
          <code>Sozlamalar</code> komponentini yozing. State — bitta obyekt:{' '}
          <code>{"{ tungiRejim: false, bildirishnomalar: true, til: 'uz' }"}</code>. Uchta
          boshqaruv: ikkita tugma (tungi rejim va bildirishnomalarni yoqib-o'chiradi) va til
          uchun uchta tugma (uz / ru / en — tanlangani qalin bo'lsin). Pastda joriy sozlamalar
          matn ko'rinishida chiqsin. Har bir yangilanishda qolgan maydonlar saqlanib qolsin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useState } from 'react'

const TILLAR = ['uz', 'ru', 'en']

export default function Sozlamalar() {
  const [sozlama, setSozlama] = useState({
    tungiRejim: false,
    bildirishnomalar: true,
    til: 'uz',
  })

  function almashtir(kalit) {
    setSozlama((s) => ({ ...s, [kalit]: !s[kalit] }))
  }

  return (
    <div>
      <button onClick={() => almashtir('tungiRejim')}>
        Tungi rejim: {sozlama.tungiRejim ? 'yoqilgan' : "o'chirilgan"}
      </button>
      <button onClick={() => almashtir('bildirishnomalar')}>
        Bildirishnomalar: {sozlama.bildirishnomalar ? 'yoqilgan' : "o'chirilgan"}
      </button>
      <div>
        {TILLAR.map((til) => (
          <button
            key={til}
            onClick={() => setSozlama((s) => ({ ...s, til }))}
            style={{ fontWeight: sozlama.til === til ? 'bold' : 'normal' }}
          >
            {til}
          </button>
        ))}
      </div>
      <p>{JSON.stringify(sozlama)}</p>
    </div>
  )
}`}</CodeBlock>
          <p>
            <code>almashtir</code> hisoblangan kalit bilan ikkala boolean'ni ham boshqaradi.{' '}
            <code>{'{ ...s, til }'}</code> — <code>{'{ ...s, til: til }'}</code>ning qisqa
            yozuvi.
          </p>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: yetkazib berish manzili">
        <p>
          State: <code>{"{ mijoz: 'Aziz', manzil: { shahar: 'Toshkent', kocha: '', uy: '' } }"}</code>.
          Uchta input (shahar, ko'cha, uy) <code>manzil</code> ichidagi maydonlarni yangilasin,
          bitta umumiy <code>handleManzil</code> funksiyasi orqali. Pastda to'liq manzil
          chiqsin: "Aziz uchun: Toshkent, Navoiy ko'chasi, 12-uy".
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useState } from 'react'

export default function YetkazibBerish() {
  const [buyurtma, setBuyurtma] = useState({
    mijoz: 'Aziz',
    manzil: { shahar: 'Toshkent', kocha: '', uy: '' },
  })

  function handleManzil(e) {
    setBuyurtma({
      ...buyurtma,
      manzil: {
        ...buyurtma.manzil,
        [e.target.name]: e.target.value,
      },
    })
  }

  const { shahar, kocha, uy } = buyurtma.manzil

  return (
    <div>
      <input name="shahar" value={shahar} onChange={handleManzil} placeholder="Shahar" />
      <input name="kocha" value={kocha} onChange={handleManzil} placeholder="Ko'cha" />
      <input name="uy" value={uy} onChange={handleManzil} placeholder="Uy" />
      <p>
        {buyurtma.mijoz} uchun: {shahar}, {kocha} ko'chasi, {uy}-uy
      </p>
    </div>
  )
}`}</CodeBlock>
          <p>
            Ikki qavat — ikki spread: tashqi obyekt va <code>manzil</code>. <code>mijoz</code>{' '}
            ham, manzilning qolgan maydonlari ham saqlanadi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          React obyektlarni havola bo'yicha solishtiradi: ichini o'zgartirib o'sha obyektni
          setter'ga bersangiz, render bo'lmaydi.
        </li>
        <li>
          State'dagi obyektni faqat o'qish uchun deb hisoblang; yangilash uchun spread bilan yangi
          obyekt yarating: <code>{'{ ...obj, maydon: yangi }'}</code>.
        </li>
        <li>
          <code>useState</code> setter'i maydonlarni birlashtirmaydi — spread'siz qolgan maydonlar
          yo'qoladi.
        </li>
        <li>
          <code>[e.target.name]</code> hisoblangan kaliti bilan bitta handler ko'p maydonni
          yangilaydi.
        </li>
        <li>
          Spread bir qavatli nusxa oladi: ichma-ich obyektda yo'l bo'yidagi har bir qavatni
          nusxalang.
        </li>
      </KeyPoints>
    </>
  )
}
