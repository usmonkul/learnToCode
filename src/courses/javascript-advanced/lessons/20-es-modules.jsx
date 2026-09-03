import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'ES Modules: import va export',
  section: 'Zamonaviy JS: modullar va klasslar',
}

export default function EsModulesLesson() {
  return (
    <>
      <p>
        Hozirgacha barcha kodimiz — bitta faylda edi. Fundamentals kursidagi
        to-do loyihasi (19-dars) ham bitta katta JavaScript faylida
        yozilgan. Real loyihalar esa yuzlab, hatto minglab fayldan iborat
        bo'ladi. Bu darsda kodni bir nechta faylga bo'lib, ular orasida
        funksiya, o'zgaruvchi va klasslarni (keyingi darsda) ulashish uchun
        JavaScriptning rasmiy vositasi — <strong>ES Modules</strong>ni
        o'rganamiz.
      </p>

      <h2>Nega kodni fayllarga bo'lish kerak?</h2>
      <p>
        Bitta 2000 qatorli faylda barcha funksiyalarni topish, tushunish va
        o'zgartirish qiyin. Modullar kodni mantiqiy bo'laklarga ajratish
        imkonini beradi — masalan:
      </p>
      <CodeBlock lang="text">{`loyiha/
  api.js        // fetch chaqiruvlari
  domYordamchi.js // DOM bilan ishlash funksiyalari
  utils.js      // debounce, formatlash va h.k.
  main.js       // barchasini birlashtiruvchi asosiy fayl`}</CodeBlock>
      <p>
        Har bir fayl — o'z <strong>moduli</strong>: unda e'lon qilingan
        o'zgaruvchi/funksiya sukut bo'yicha faqat o'sha faylda ko'rinadi
        (01-darsdagi scope kabi, lekin butun fayl darajasida). Boshqa
        fayllarga "ochiq" qilish uchun <code>export</code>, ulardan
        foydalanish uchun <code>import</code> ishlatiladi.
      </p>

      <h2>Named export/import — nomlangan eksport</h2>
      <p>Bitta faylda bir nechta narsani eksport qilish mumkin:</p>
      <CodeBlock lang="javascript">{`// utils.js
export function debounce(funksiya, kechikish) {
  let taymer
  return (...argumentlar) => {
    clearTimeout(taymer)
    taymer = setTimeout(() => funksiya(...argumentlar), kechikish)
  }
}

export const SOM_BELGISI = "so'm"`}</CodeBlock>
      <p>Boshqa faylda ularni <code>{'{ }'}</code> ichida, aniq nomi bilan olib kelamiz:</p>
      <CodeBlock lang="javascript">{`// main.js
import { debounce, SOM_BELGISI } from "./utils.js"

const kechiktirilganQidiruv = debounce(shaharniQidirish, 400)
console.log(100000 + " " + SOM_BELGISI) // "100000 so'm"`}</CodeBlock>
      <Callout type="tip" title="Qayta nomlash">
        Agar ikkita fayldan bir xil nomli narsa import qilinsa (nom
        to'qnashuvi), <code>as</code> bilan qayta nomlash mumkin:{' '}
        <code>{'import { debounce as kechiktir } from "./utils.js"'}</code>.
      </Callout>

      <h2>Default export/import — asosiy eksport</h2>
      <p>
        Har bir faylda <strong>bitta</strong> "asosiy" narsani eksport
        qilish uchun <code>export default</code> ishlatiladi — bu aynan
        Fundamentals va bu kursning har bir lesson faylida{' '}
        <code>export default function LessonNomi()</code> ko'rinishida
        allaqachon ishlatilib kelinmoqda:
      </p>
      <CodeBlock lang="javascript">{`// apiKlient.js
export default function malumotOlish(manzil) {
  return fetch(manzil).then((javob) => javob.json())
}`}</CodeBlock>
      <p>
        Default import — <code>{'{ }'}</code>siz, va olib kelayotgan tomon
        unga <strong>istalgan nom</strong> berishi mumkin (nom eksport
        qilingan nomga mos kelishi shart emas):
      </p>
      <CodeBlock lang="javascript">{`// main.js
import malumotOlish from "./apiKlient.js" // yoki istalgan boshqa nom bilan ham olish mumkin

malumotOlish("https://api.open-meteo.com/v1/forecast?latitude=41.3&longitude=69.3&current_weather=true")
  .then((malumot) => console.log(malumot))`}</CodeBlock>
      <Callout type="note" title="Named vs default — qachon qaysi birini ishlatish kerak">
        Faylda bitta "asosiy" narsa bo'lsa (bitta funksiya, bitta klass) —{' '}
        <code>export default</code>. Faylda bir nechta yordamchi
        funksiya/qiymat bo'lsa (masalan, <code>utils.js</code>) — named
        export tabiiyroq, chunki u har birini alohida, aniq nomi bilan
        import qilish imkonini beradi.
      </Callout>
      <Quiz
        question="Named export bilan default export'ning asosiy farqi nima?"
        options={[
          "Named export faqat funksiyalar uchun, default faqat obyektlar uchun",
          "Bitta faylda bir nechta named export bo'lishi mumkin, lekin faqat bitta default export; import paytida named nomga mos kelishi kerak, default'ga istalgan nom berish mumkin",
          "Ular bir xil, faqat yozilishi farq qiladi",
          "Default export faqat asinxron funksiyalar uchun ishlatiladi",
        ]}
        correctIndex={1}
        explanation="Bir faylda cheklovsiz sonli named export bo'lishi mumkin (har biri { } ichida, aniq nomi bilan import qilinadi), lekin faqat bitta default export bo'ladi (u { }siz, istalgan nom bilan import qilinadi)."
      />

      <h2>Import/export bir faylda birga</h2>
      <p>Bitta faylda ham named, ham default export bo'lishi mumkin:</p>
      <CodeBlock lang="javascript">{`// obHavoXizmati.js
export const API_MANZILI = "https://api.open-meteo.com/v1/forecast"

export function haroratniFormatla(daraja) {
  return daraja + "°C"
}

export default async function obHavoniOl(kenglik, uzunlik) {
  const javob = await fetch(\`\${API_MANZILI}?latitude=\${kenglik}&longitude=\${uzunlik}&current_weather=true\`)
  return javob.json()
}`}</CodeBlock>
      <CodeBlock lang="javascript">{`// main.js
import obHavoniOl, { API_MANZILI, haroratniFormatla } from "./obHavoXizmati.js"

obHavoniOl(41.3, 69.3).then((malumot) => {
  console.log(haroratniFormatla(malumot.current_weather.temperature))
})`}</CodeBlock>

      <h2>Real loyihada modullar qanday ko'rinishda bo'ladi</h2>
      <p>
        Bu darsda ko'rgan sintaksis — hozir siz o'qiyotgan bu platformaning
        o'zida ham har kuni ishlatiladi: har bir dars fayli o'zining{' '}
        <code>meta</code>sini <code>export const</code> bilan, lesson
        komponentini <code>export default</code> bilan chiqaradi, boshqa
        fayllar esa <code>import CodeBlock from '@/components/content/CodeBlock'</code>{' '}
        kabi qatorlar bilan ularni ishlatadi — xuddi shu darsda o'rgangan
        naqsh.
      </p>
      <Callout type="warning" title="Bu darsdagi misollar — brauzerda to'g'ridan-to'g'ri ishlamaydi">
        <code>import</code>/<code>export</code> to'g'ri ishlashi uchun
        loyihada build vositasi (Vite, Webpack va h.k.) yoki HTML'da{' '}
        <code>{'<script type="module">'}</code> kerak. Oddiy{' '}
        <code>{'<script src="skript.js">'}</code> bilan ochilgan faylda{' '}
        <code>import</code>/<code>export</code> ishlamaydi — bu, aslida, siz
        hozir o'rganayotgan platforma qurilgan Vite kabi vositalarning aynan
        nima uchun kerakligini ko'rsatadi.
      </Callout>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Named export/import">
        <p>
          Tasavvuran <code>matematika.js</code> faylida{' '}
          <code>kvadrat(son)</code> va <code>kub(son)</code> funksiyalarini{' '}
          <code>export</code> qiling (kod yozing). Keyin{' '}
          <code>main.js</code>da ularni <code>import</code> qilib,{' '}
          <code>kvadrat(4)</code> va <code>kub(3)</code>ni konsolga
          chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`// matematika.js
export function kvadrat(son) {
  return son * son
}

export function kub(son) {
  return son * son * son
}

// main.js
import { kvadrat, kub } from "./matematika.js"

console.log(kvadrat(4)) // 16
console.log(kub(3))     // 27`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Default export bilan konfiguratsiya">
        <p>
          <code>sozlamalar.js</code> faylida{' '}
          <code>{'{ shahar: "Toshkent", til: "uz" }'}</code> obyektini{' '}
          <code>export default</code> qiling. <code>main.js</code>da uni{' '}
          <code>konfiguratsiya</code> nomi bilan import qilib, konsolga
          chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`// sozlamalar.js
export default {
  shahar: "Toshkent",
  til: "uz",
}

// main.js
import konfiguratsiya from "./sozlamalar.js"

console.log(konfiguratsiya) // { shahar: "Toshkent", til: "uz" }`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          ES Modules — kodni fayllarga bo'lib, ular orasida{' '}
          <code>export</code>/<code>import</code> orqali ulashish uchun
          JavaScriptning rasmiy tizimi.
        </li>
        <li>
          Named export (<code>export function/const</code>) — bitta faylda
          bir nechta bo'lishi mumkin, import paytida <code>{'{ }'}</code>{' '}
          ichida, aniq nomi bilan olinadi.
        </li>
        <li>
          Default export (<code>export default</code>) — faylda faqat bitta
          bo'ladi, import paytida <code>{'{ }'}</code>siz, istalgan nom
          bilan olinadi.
        </li>
        <li>
          Bitta faylda named va default export'lar birga ishlatilishi
          mumkin; import qilinganda ular bitta qatorda birlashtiriladi.
        </li>
      </KeyPoints>
    </>
  )
}
