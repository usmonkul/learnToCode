import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'useState va state asoslari',
  section: 'State va interaktivlik',
}

export default function UseStateBasicsLesson() {
  return (
    <>
      <p>
        Birinchi darsda <code>useState</code>ni yuzaki ko'rib o'tgan edik — hozir uning nima
        uchun kerakligini, oddiy o'zgaruvchidan nimasi bilan farqlanishini va qanday ishlashini
        chuqurroq o'rganamiz. Bu — React'dagi eng muhim tushunchalardan biri:{' '}
        <strong>state (holat)</strong> — komponentning vaqt o'tishi bilan o'zgarib turadigan,
        lekin renderlar orasida "eslab qolinadigan" ma'lumoti.
      </p>

      <h2>Nega oddiy o'zgaruvchi yetarli emas?</h2>
      <p>
        Tasavvur qiling, biz oddiy hisoblagich (counter) yasamoqchimiz — tugma bosilganda son
        bittaga oshsin. Birinchi tajriba sifatida, o'rganganimizdek, oddiy <code>let</code>{' '}
        o'zgaruvchidan foydalanib ko'raylik:
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
        <code>Bosish soni: 0</code> bo'lib qolaveradi. Sabab oddiy: <code>soni</code> — bu shu
        funksiya chaqirilganda yaratiladigan oddiy JavaScript o'zgaruvchisi. Uni o'zgartirish
        xotirada bir sonni boshqasiga almashtiradi, xolos — bu React'ga "ekranni qayta chiz"
        deb signal bermaydi. React esa komponent funksiyasini o'z-o'zidan qayta chaqirmaydi,
        faqat u buni qachon qilish kerakligini bilgan holatlardagina ishlaydi.
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

      <h2>Funksional yangilash: <code>setValue(prev =&gt; ...)</code></h2>
      <p>
        <code>setSoni(soni + 1)</code> odatda ishlaydi, lekin bir muammoli holat bor: agar bir
        necha yangilanish ketma-ket, tez sodir bo'lsa (masalan, bir hodisa ichida{' '}
        <code>setSoni</code> ikki marta chaqirilsa), <code>soni</code> o'zgaruvchisi hali eski
        (stale) qiymatni "eslab" turishi mumkin, chunki u shu render paytidagi qiymat, real
        vaqtdagi eng so'nggi qiymat emas:
      </p>
      <CodeBlock lang="jsx">{`function handleClick() {
  setSoni(soni + 1)
  setSoni(soni + 1)
  // Kutilgan: +2, lekin haqiqatda faqat +1 bo'ladi,
  // chunki ikkala chaqiruv ham bir xil eski "soni" qiymatidan foydalanadi
}`}</CodeBlock>
      <p>
        Buning yechimi — setter'ga yangi qiymatning o'zini emas, balki{' '}
        <strong>funksiya</strong> uzatish. Bu funksiya argument sifatida eng so'nggi, haqiqiy
        joriy qiymatni (<code>prev</code>) oladi va yangi qiymatni shundan hisoblab qaytaradi:
      </p>
      <CodeBlock lang="jsx">{`function handleClick() {
  setSoni(prev => prev + 1)
  setSoni(prev => prev + 1)
  // Endi to'g'ri: +2, chunki har bir chaqiruv
  // eng so'nggi qiymatdan boshlanadi
}`}</CodeBlock>
      <p>
        Bu — <strong>funksional yangilash (functional update)</strong> shakli deb ataladi.
        React ketma-ket kelgan <code>setSoni</code> chaqiruvlarini navbatga qo'yib, ularni
        birma-bir, har birini oldingisining haqiqiy natijasidan boshlab bajaradi — shu sabab
        stale closure (eskirgan yopilish) muammosi yo'qoladi. Oddiy sanoqda farq sezilmasligi
        mumkin, lekin yangi qiymat eski qiymatga bog'liq bo'lgan har qanday holatda (masalan,
        tez-tez bosiladigan tugma, animatsiya, yoki bir necha joydan kelayotgan yangilanishlar)
        funksional shaklni ishlatish xavfsizroq odat hisoblanadi.
      </p>
      <Callout type="tip" title="Qachon qaysi shaklni ishlatish kerak?">
        Agar yangi qiymat oldingi qiymatga bog'liq bo'lsa (<code>soni + 1</code> kabi) —
        funksional shakl <code>{'setSoni(prev => prev + 1)'}</code>ni afzal ko'ring. Agar yangi
        qiymat oldingisiga bog'liq bo'lmasa (masalan, inputdan kelgan yangi matn) — oddiy{' '}
        <code>setQiymat(yangiQiymat)</code> yetarli.
      </Callout>

      <Callout type="warning" title="Obyekt va massiv state'ini mutatsiya qilmang">
        Agar state'da obyekt yoki massiv saqlansa, uni <strong>ichidan</strong> o'zgartirish
        (masalan, <code>obj.nomi = "yangi"</code> yoki <code>royxat.push(elem)</code>) ishlamaydi
        — React eski va yangi qiymat bir xil obyekt ekanligini ko'rib, qayta render qilish
        kerakligini bilmay qoladi. Buning o'rniga har doim <strong>yangi</strong> obyekt yoki
        massiv yaratib, uni setter'ga berish kerak — spread sintaksisi (<code>...</code>) buning
        uchun qulay:
        <CodeBlock lang="jsx">{`const [foydalanuvchi, setFoydalanuvchi] = useState({ ism: 'Ali', yosh: 20 })

// XATO: obyektni ichidan o'zgartirish
foydalanuvchi.yosh = 21

// TO'G'RI: yangi obyekt yaratib, uni setterga berish
setFoydalanuvchi({ ...foydalanuvchi, yosh: 21 })`}</CodeBlock>
        Bu mavzuni hozircha shu darajada bilish kifoya — batafsilroq keyingi darslarda, ayniqsa{' '}
        <code>useReducer</code> va custom hook'lar bilan ishlaganda qayta ko'rib chiqamiz.
      </Callout>

      <Quiz
        question={`Bitta komponent ichida quyidagi kod bor: "setSoni(soni + 1); setSoni(soni + 1)". Bu ikki chaqiruv bir hodisa ichida ketma-ket bajarilsa, soni nechaga oshadi va nega?`}
        options={[
          "Faqat +1ga, chunki ikkala chaqiruv ham hodisa boshlanishidagi bir xil eski \"soni\" qiymatidan foydalanadi",
          "+2ga, chunki har bir setSoni chaqiruvi darhol yangi qiymatni o'qib oladi",
          "Xatolik chiqadi, chunki setterni bir hodisada ikki marta chaqirib bo'lmaydi",
          "+1ga, chunki React ikkinchi chaqiruvni butunlay e'tiborsiz qoldiradi",
        ]}
        correctIndex={0}
        explanation="soni + 1 ifodasi hodisa boshlanganda hisoblangan bitta eski qiymatga tayanadi. Ikkala setSoni chaqiruvi ham xuddi shu eski qiymat asosida bir xil yangi qiymatni yuboradi, shuning uchun natija +2 emas, +1 bo'ladi. Buning oldini olish uchun funksional yangilash — setSoni(prev => prev + 1) — ishlatiladi."
      />

      <Exercise title="Mashq">
        <p>
          <code>YoqtirishTugmasi</code> nomli komponent yozing (like-button uslubida). U ichida{' '}
          <code>useState</code> orqali boolean state saqlasin (boshlang'ich qiymat{' '}
          <code>false</code>) — bu foydalanuvchi "yoqtirgan" yoki "yoqtirmagan" holatini
          bildiradi. Tugma bosilganda state teskarisiga o'zgarsin (funksional yangilash shaklida,
          ya'ni <code>{'prev => !prev'}</code> orqali). Tugma matni holatga qarab{' '}
          <code>"♡ Yoqtirish"</code> yoki <code>"♥ Yoqtirildi"</code> bo'lsin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useState } from 'react'

function YoqtirishTugmasi() {
  const [yoqtirilgan, setYoqtirilgan] = useState(false)

  function handleClick() {
    setYoqtirilgan(prev => !prev)
  }

  return (
    <button onClick={handleClick}>
      {yoqtirilgan ? '♥ Yoqtirildi' : '♡ Yoqtirish'}
    </button>
  )
}`}</CodeBlock>
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
          Yangi qiymat oldingi qiymatga bog'liq bo'lsa, funksional yangilash shaklini —{' '}
          <code>{'setQiymat(prev => ...)'}</code> — ishlating, bu stale (eskirgan) qiymat
          muammosining oldini oladi.
        </li>
        <li>
          Obyekt yoki massiv state'ini hech qachon ichidan o'zgartirmang (mutatsiya qilmang) —
          har doim spread sintaksisi bilan yangi nusxa yaratib, uni setter'ga bering.
        </li>
      </KeyPoints>
    </>
  )
}
