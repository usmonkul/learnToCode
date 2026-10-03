import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'useState va state asoslari',
  section: 'Interaktivlik',
}

export default function UseStateLesson() {
  return (
    <>
      <h2>Muammo: o'zgaruvchi o'zgaradi, ekran — yo'q</h2>
      <p>
        12-darsni shu kod bilan tugatgan edik — tugma bosilganda son bittaga oshishi kerak:
      </p>
      <CodeBlock lang="jsx">{`function Hisoblagich() {
  let soni = 0

  function handleClick() {
    soni = soni + 1
    console.log(soni) // konsolda oshib boradi
  }

  return <button onClick={handleClick}>Bosish soni: {soni}</button>
}`}</CodeBlock>
      <p>
        Bu kodni ishga tushirib ko'rsangiz, konsolda <code>soni</code> qiymati haqiqatan ham
        1, 2, 3 bo'lib oshib borayotganini ko'rasiz — lekin ekrandagi tugma matni doim{' '}
        <code>Bosish soni: 0</code> bo'lib qolaveradi. Ikkita sabab bor:
      </p>
      <ol>
        <li>
          <strong>O'zgaruvchini o'zgartirish React'ga hech narsa demaydi.</strong> React
          komponentni o'z-o'zidan qayta chaqirmaydi; <code>soni</code> xotirada o'zgardi, lekin
          ekranni qayta chizish kerakligini hech kim aytmadi.
        </li>
        <li>
          <strong>Mahalliy o'zgaruvchi renderlar orasida saqlanmaydi.</strong> Agar React
          komponentni boshqa sababdan qayta chaqirsa ham, <code>let soni = 0</code> qatori yana
          bajariladi — son qaytadan 0 bo'ladi.
        </li>
      </ol>
      <p>
        Demak, ekranni yangilash uchun ikki narsa kerak: qiymatni renderlar orasida{' '}
        <strong>eslab qolish</strong> va o'zgarganda React'ga{' '}
        <strong>qayta chizishni buyurish</strong>. React'da buning uchun{' '}
        <strong>state</strong> (holat) bor.
      </p>
      <Callout type="note" title="Re-render nima?">
        <strong>Re-render (qayta chizish)</strong> — React'ning komponent funksiyasini qaytadan
        chaqirib, yangi JSX natijasini hisoblab, ekrandagi kerakli qismlarni yangilash jarayoni.
        Oddiy o'zgaruvchini o'zgartirish bu jarayonni ishga tushirmaydi — React buni "bilmaydi".
      </Callout>

      <h2>
        <code>useState</code> — React'ga "eslab qol va qayta chiz" deyish
      </h2>
      <p>
        Aynan shu muammoni hal qilish uchun React <code>useState</code> hook'ini beradi. U
        ikkita narsani qaytaradi: joriy qiymat va o'sha qiymatni o'zgartirish uchun maxsus
        funksiya — <strong>setter</strong>:
      </p>
      <CodeBlock lang="jsx">{`import { useState } from 'react'

function Hisoblagich() {
  const [soni, setSoni] = useState(0)

  function handleClick() {
    setSoni(soni + 1)
  }

  return <button onClick={handleClick}>Bosish soni: {soni}</button>
}`}</CodeBlock>
      <p>
        <code>useState(0)</code> chaqiruvi <code>soni</code>ning boshlang'ich qiymatini{' '}
        <code>0</code> qilib belgilaydi va ikki elementli massiv qaytaradi:{' '}
        <code>[qiymat, setterFunksiya]</code>. Massiv destructuring yordamida bu ikkalasini{' '}
        <code>soni</code> va <code>setSoni</code> nomlariga ajratib olamiz — nomlarni o'zingiz
        tanlaysiz, lekin odat bo'yicha <code>[narsa, setNarsa]</code> ko'rinishida yoziladi.
        Endi <code>setSoni(soni + 1)</code> chaqirilganda ikkita narsa sodir bo'ladi: React{' '}
        <code>soni</code>ning yangi qiymatini eslab qoladi, va <code>Hisoblagich</code>{' '}
        komponentini qayta render qiladi — bu safar <code>useState(0)</code> yana chaqirilsa
        ham, React unga boshlang'ich <code>0</code>ni emas, balki eslab qolgan yangi qiymatni
        qaytaradi.
      </p>
      <Callout type="tip" title="useState'ni qanday tasavvur qiling">
        <code>useState</code>ni komponentga berilgan "xotira katakchasi" deb tasavvur qiling.
        Oddiy o'zgaruvchi har render'da qaytadan <code>0</code>dan yaratiladi va unutiladi;{' '}
        <code>useState</code> orqali olingan qiymat esa React'ning o'zida, komponentdan{' '}
        <strong>tashqarida</strong> saqlanadi va renderlar orasida saqlanib qoladi.
      </Callout>

      <h2>State — har bir komponent nusxasiga alohida</h2>
      <p>
        Muhim xususiyat: agar bitta komponentni bir necha marta chaqirsangiz, har bir chaqiruv{' '}
        <strong>o'zining alohida state'iga</strong> ega bo'ladi. Ular bir-biriga hech qanday
        ta'sir qilmaydi:
      </p>
      <CodeBlock lang="jsx">{`function App() {
  return (
    <>
      <Hisoblagich />
      <Hisoblagich />
      <Hisoblagich />
    </>
  )
}`}</CodeBlock>
      <p>
        Bu yerda ekranda uchta mustaqil tugma chiqadi, har birining o'z <code>soni</code>{' '}
        qiymati bor. Birinchi tugmani bosish faqat o'sha nusxaning state'ini oshiradi, qolgan
        ikkitasiga hech qanday ta'sir qilmaydi. React har bir komponent nusxasini alohida
        "xotira katakchasi" bilan kuzatib boradi — xuddi bir xil andozadan (shablondan)
        yasalgan, lekin har biri o'zining ma'lumotini saqlaydigan alohida obyektlar kabi.
      </p>

      <h2>Bir nechta state</h2>
      <p>
        Komponentda istalgancha state bo'lishi mumkin — har biri uchun alohida{' '}
        <code>useState</code> chaqiruvi. Qiymat turi ham istalgan: son, satr, boolean, massiv,
        obyekt.
      </p>
      <CodeBlock lang="jsx">{`import { useState } from 'react'

export default function TaomTanlash() {
  const [soni, setSoni] = useState(1)
  const [izohOchiq, setIzohOchiq] = useState(false)

  return (
    <div className="karta">
      <h3>Osh</h3>
      <div>
        <button onClick={() => setSoni(soni - 1)} disabled={soni === 1}>−</button>
        <span>{soni} porsiya</span>
        <button onClick={() => setSoni(soni + 1)}>+</button>
      </div>
      <p>Jami: {soni * 45000} so'm</p>

      <button onClick={() => setIzohOchiq(!izohOchiq)}>
        {izohOchiq ? 'Tarkibni yashirish' : "Tarkibni ko'rsatish"}
      </button>
      {izohOchiq && <p>Devzira guruch, qo'y go'shti, sariq sabzi, no'xat.</p>}
    </div>
  )
}`}</CodeBlock>
      <p>Bu kichik misolda butun bo'limning g'oyasi bor:</p>
      <ul>
        <li>
          <code>soni</code> va <code>izohOchiq</code> — bir-biriga bog'liq bo'lmagan ikki ma'lumot,
          shuning uchun ikki alohida state.
        </li>
        <li>
          "Jami" alohida state emas — u har renderda <code>soni</code>dan{' '}
          <strong>hisoblanadi</strong>. Hisoblab bo'ladigan narsani state'da saqlamang (19-darsda
          batafsil).
        </li>
        <li>
          Shartli render (7-dars) endi jonlandi: <code>izohOchiq</code> o'zgarganda tarkib paydo
          bo'ladi yoki yo'qoladi.
        </li>
        <li>
          <code>disabled</code> ham state'dan hisoblanadi: 1 porsiyadan kamaytirib bo'lmaydi.
        </li>
      </ul>

      <h2>Hook qoidalari</h2>
      <p>
        <code>useState</code> — birinchi <strong>hook</strong>ingiz. <code>use</code> bilan
        boshlanadigan barcha funksiyalar hook hisoblanadi va ular uchun ikki qat'iy qoida bor:
      </p>
      <ol>
        <li>
          <strong>Hook'larni faqat komponentning eng yuqori darajasida chaqiring</strong> —{' '}
          <code>if</code>, sikl, ichki funksiya yoki <code>return</code>dan keyin emas.
        </li>
        <li>
          <strong>Hook'larni faqat React komponentlari</strong> (yoki o'zingiz yozgan hook'lar,
          30-dars) <strong>ichida chaqiring</strong> — oddiy JavaScript funksiyalarida emas.
        </li>
      </ol>
      <CodeBlock lang="jsx">{`function Profil({ kirgan }) {
  // XATO: hook shart ichida
  if (kirgan) {
    const [ism, setIsm] = useState('')
  }

  // XATO: erta return'dan keyin hook
  if (!kirgan) return null
  const [yosh, setYosh] = useState(0)
  ...
}`}</CodeBlock>
      <p>
        Nega? React state'larni nomi bo'yicha emas, <strong>chaqirilish tartibi</strong> bo'yicha
        taniydi: "bu komponentdagi 1-useState, 2-useState...". Agar biror renderda bitta hook
        shart tufayli chaqirilmay qolsa, tartib siljiydi va React ikkinchi state'ga birinchisining
        qiymatini berib yuboradi. Shuning uchun hook'lar har renderda bir xil tartibda, bir xil
        sonda chaqirilishi shart. Vite shablonidagi ESLint bu qoidani buzsangiz darhol
        ogohlantiradi.
      </p>

      <h2>State va props: farqi nima?</h2>
      <ul>
        <li>
          <strong>Props</strong> — komponentga <em>tashqaridan</em> keladi; komponent ularni
          o'zgartira olmaydi. Funksiyaning argumentlariga o'xshaydi.
        </li>
        <li>
          <strong>State</strong> — komponentning <em>o'z</em> xotirasi; uni faqat shu komponent
          o'zgartiradi. Funksiya ichida yashaydigan, lekin chaqiruvlar orasida unutilmaydigan
          o'zgaruvchiga o'xshaydi.
        </li>
      </ul>
      <p>
        Ular ko'pincha birga ishlaydi: ota komponentning state'i bolaga props bo'lib tushadi.
        Ota state'ni o'zgartirganda bola ham yangi props bilan qayta chiziladi. State'ni bir
        nechta komponent orasida qanday ulashishni 20-darsda ko'ramiz.
      </p>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>State'ni to'g'ridan-to'g'ri o'zgartirish.</strong> <code>soni = soni + 1</code>{' '}
            yoki <code>soni++</code> — ekran yangilanmaydi. Doim setter:{' '}
            <code>setSoni(soni + 1)</code>.
          </li>
          <li>
            <strong>Setter'ni render paytida chaqirish.</strong>{' '}
            <code>{'onClick={setSoni(soni + 1)}'}</code> — render ichida state o'zgaradi, bu yana
            render chaqiradi va hokazo: "Too many re-renders" xatosi. To'g'risi:{' '}
            <code>{'onClick={() => setSoni(soni + 1)}'}</code>.
          </li>
          <li>
            <strong>Hook'ni shart yoki sikl ichida chaqirish</strong> — hook'lar doim yuqori
            darajada, har renderda bir xil tartibda.
          </li>
          <li>
            <strong><code>useState</code>ni import qilishni unutish.</strong>{' '}
            <code>useState is not defined</code> — fayl boshida{' '}
            <code>{"import { useState } from 'react'"}</code>.
          </li>
          <li>
            <strong>Setter'dan keyin yangi qiymatni kutish.</strong>{' '}
            <code>setSoni(5); console.log(soni)</code> — hali eski qiymatni ko'rsatadi. Nega —
            keyingi darsda.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="Sahifada <Hisoblagich /> uch marta chizilgan. Birinchisini 3 marta bossangiz, uchinchisida nechchi ko'rinadi?"
        options={['0', '3', '1', '9']}
        correctIndex={0}
        explanation="Har bir komponent nusxasining o'z alohida state'i bor. Birinchi hisoblagichni bosish faqat uning soni'ni o'zgartiradi; uchinchisi hali 0 da."
      />

      <Quiz
        question="Quyidagi kod 'Too many re-renders' xatosini beradi: <button onClick={setOchiq(true)}>Ochish</button>. Sababi nima?"
        options={[
          "setOchiq(true) render paytida chaqiriladi, state o'zgaradi, bu yana render chaqiradi — cheksiz sikl",
          "boolean state'ni true qilib bo'lmaydi",
          "useState import qilinmagan",
          "onClick faqat satr qabul qiladi",
        ]}
        correctIndex={0}
        explanation="Qavslar tufayli setOchiq(true) bosilganda emas, har renderda bajariladi. State o'zgarishi yangi render chaqiradi, u yana setOchiq'ni chaqiradi... React buni to'xtatib, xato beradi. To'g'risi: onClick={() => setOchiq(true)}."
      />

      <Exercise title="1-mashq: yoqtirish tugmasi">
        <p>
          <code>YoqtirishTugmasi</code> nomli komponent yozing (like-button uslubida). U ichida{' '}
          <code>useState</code> orqali boolean state saqlasin (boshlang'ich qiymat{' '}
          <code>false</code>) — bu foydalanuvchi "yoqtirgan" yoki "yoqtirmagan" holatini
          bildiradi. Tugma bosilganda state teskarisiga o'zgarsin. Tugma matni holatga qarab{' '}
          <code>"♡ Yoqtirish"</code> yoki <code>"♥ Yoqtirildi"</code> bo'lsin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useState } from 'react'

function YoqtirishTugmasi() {
  const [yoqtirilgan, setYoqtirilgan] = useState(false)

  function handleClick() {
    setYoqtirilgan(!yoqtirilgan)
  }

  return (
    <button onClick={handleClick}>
      {yoqtirilgan ? '♥ Yoqtirildi' : '♡ Yoqtirish'}
    </button>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: yulduzcha reyting">
        <p>
          <code>Reyting</code> komponentini yozing: beshta yulduz (★) tugmasi, boshida hammasi
          kulrang. Foydalanuvchi 4-yulduzni bossa, birinchi to'rttasi sariq bo'lsin va ostida
          "Bahoyingiz: 4/5" chiqsin. Hali baho berilmagan bo'lsa — "Baho bering". Qo'shimcha:
          sichqoncha yulduz ustiga kelganda (<code>onMouseEnter</code>) shu yulduzgacha
          vaqtinchalik sariq bo'lsin, chiqib ketganda (<code>onMouseLeave</code>) tanlangan bahoga
          qaytsin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useState } from 'react'

const YULDUZLAR = [1, 2, 3, 4, 5]

export default function Reyting() {
  const [baho, setBaho] = useState(0)        // tanlangan baho
  const [ustida, setUstida] = useState(0)    // sichqoncha turgan yulduz

  const korsatilgan = ustida || baho         // ustida bo'lsa — u, aks holda baho

  return (
    <div>
      {YULDUZLAR.map((n) => (
        <button
          key={n}
          onClick={() => setBaho(n)}
          onMouseEnter={() => setUstida(n)}
          onMouseLeave={() => setUstida(0)}
          style={{ color: n <= korsatilgan ? '#f5b301' : '#d4d4d4', fontSize: 28 }}
        >
          ★
        </button>
      ))}
      <p>{baho > 0 ? \`Bahoyingiz: \${baho}/5\` : 'Baho bering'}</p>
    </div>
  )
}`}</CodeBlock>
          <p>
            Ikki state — chunki "tanlangan" va "hozir ko'rsatilayotgan" ikki xil narsa.{' '}
            <code>korsatilgan</code> esa state emas, ikkalasidan hisoblanadi. Rang dinamik
            bo'lgani uchun <code>style</code> prop'ida (10-dars).
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Oddiy o'zgaruvchini o'zgartirish React'ga qayta render qilish kerakligini bildirmaydi
          — <code>useState</code> aynan shu muammoni hal qiladi.
        </li>
        <li>
          <code>const [qiymat, setQiymat] = useState(boshlangich)</code> — <code>qiymat</code>{' '}
          renderlar orasida saqlanadi, <code>setQiymat</code> uni o'zgartirib qayta render
          qiladi.
        </li>
        <li>
          Bir xil komponentning har bir nusxasi o'zining mustaqil state'iga ega — bittasidagi
          o'zgarish boshqasiga ta'sir qilmaydi.
        </li>
        <li>
          Hook'lar (<code>use...</code>) faqat komponentning yuqori darajasida, shartsiz va har
          renderda bir xil tartibda chaqiriladi.
        </li>
        <li>
          Props — tashqaridan keladi va o'zgartirilmaydi; state — komponentning o'z xotirasi, faqat
          setter orqali o'zgaradi. Hisoblab bo'ladigan qiymatni state'da saqlamang.
        </li>
      </KeyPoints>
    </>
  )
}
