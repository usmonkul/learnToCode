import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "React loyihasini yaratish",
  section: 'Boshlash',
}

export default function ProjectSetupLesson() {
  return (
    <>
      <h2>Muammo: brauzer JSX'ni tushunmaydi</h2>
      <p>
        O'tgan darsda <code>{'return <h1>Mening ilovam</h1>'}</code> kabi kod yozdik. Agar
        bu kodni oddiy <code>{'<script>'}</code> tegi orqali brauzerga bersangiz, u darhol{' '}
        <code>SyntaxError: Unexpected token '&lt;'</code> xatosini beradi: JSX — JavaScript
        standartining bir qismi emas. Bundan tashqari, haqiqiy ilova o'nlab fayllarga bo'lingan
        bo'ladi va <code>npm</code>dan o'rnatilgan kutubxonalarni (<code>react</code>ning
        o'zini ham) <code>import</code> qiladi — buni ham brauzer o'zi hal qila olmaydi.
      </p>
      <p>
        Shuning uchun React bilan ishlashda <strong>build vositasi</strong> (build tool)
        ishlatiladi: u JSX'ni oddiy JavaScript'ga aylantiradi, fayllarni bog'laydi, va kodni
        saqlashingiz bilan brauzerni yangilab turadi. Bu kursda eng tez va eng ommabop
        vositalardan biri — <strong>Vite</strong> (o'qilishi: "vit") — bilan ishlaymiz. Shu
        darsdan boshlab barcha mashqlarni o'z kompyuteringizdagi Vite loyihasida bajarasiz.
      </p>

      <h2>1-qadam: kerakli dasturlar</h2>
      <ul>
        <li>
          <strong>Node.js</strong> — JavaScript'ni brauzerdan tashqarida ishga tushiradigan
          muhit; Vite va <code>npm</code> aynan unda ishlaydi. <a href="https://nodejs.org">nodejs.org</a>{' '}
          saytidan <strong>LTS</strong> versiyasini o'rnating (20.19+ yoki 22.12+).
        </li>
        <li>
          <strong>Kod muharriri</strong> — eng ko'p ishlatiladigani VS Code. JSX uchun alohida
          kengaytma shart emas, u JSX'ni o'zi taniydi.
        </li>
        <li>
          <strong>Brauzer</strong> — Chrome, Edge yoki Firefox (React DevTools kengaytmasi
          shularda ishlaydi).
        </li>
      </ul>
      <p>O'rnatilganini terminalda tekshiring:</p>
      <CodeBlock lang="bash">{`node -v
# v22.20.0 (yoki shunga o'xshash: 20.19+ yoki 22.12+)

npm -v
# 10.9.0`}</CodeBlock>

      <h2>2-qadam: loyihani yaratish</h2>
      <p>
        Loyihalaringiz turadigan papkaga terminalda o'ting va quyidagi buyruqni bering (
        <code>kitob-rastasi</code> o'rniga istalgan nom yozishingiz mumkin):
      </p>
      <CodeBlock lang="bash">{`npm create vite@latest kitob-rastasi -- --template react`}</CodeBlock>
      <p>
        Bu buyruq <code>kitob-rastasi</code> papkasini yaratib, ichiga tayyor React shablonini
        (template) ko'chiradi. <code>--template react</code> — oddiy JavaScript bilan React
        shabloni (<code>react-ts</code> esa TypeScript varianti, bizga hozircha kerak emas).
        Agar Vite qo'shimcha savol bersa (masalan, "Install with npm and start now?"), standart
        javobni tanlash kifoya. So'ng:
      </p>
      <CodeBlock lang="bash">{`cd kitob-rastasi
npm install      # package.json'dagi kutubxonalarni node_modules'ga yuklab oladi
npm run dev      # dasturlash serverini ishga tushiradi`}</CodeBlock>
      <p>Terminalda shunga o'xshash xabar chiqadi:</p>
      <CodeBlock lang="text">{`  VITE v8.x.x  ready in 312 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose`}</CodeBlock>
      <p>
        Brauzerda <code>http://localhost:5173</code> manzilini oching — Vite va React
        logotiplari hamda hisoblagich tugmasi bor sahifa chiqadi. Tabriklaymiz, birinchi React
        ilovangiz ishlayapti.
      </p>
      <Callout type="note" title="Hozircha o'rnatib bo'lmasa">
        Agar kompyuteringizga hozircha Node.js o'rnatishning imkoni bo'lmasa, brauzerda{' '}
        <a href="https://vite.new/react">vite.new/react</a> manzilini oching — StackBlitz
        saytida xuddi shu Vite + React shabloni onlayn ochiladi, va undagi fayllar tuzilishi
        aynan shu darsdagidek bo'ladi. Bu vaqtinchalik yechim: kursdagi mashqlar mahalliy
        loyihaga mo'ljallangan, va haqiqiy ishda doim mahalliy loyiha bilan ishlaysiz.
      </Callout>

      <h2>3-qadam: loyiha tuzilishi</h2>
      <p>Loyiha papkasini VS Code'da oching (<code>code .</code>). Ichida shu fayllar bor:</p>
      <CodeBlock lang="text">{`kitob-rastasi/
├── node_modules/      # o'rnatilgan kutubxonalar — hech qachon qo'lda tahrirlanmaydi
├── public/            # o'zgarishsiz beriladigan fayllar (favicon, rasmlar)
├── src/               # SIZNING KODINGIZ — deyarli hamma ish shu yerda
│   ├── assets/        # import qilinadigan rasmlar
│   ├── App.css
│   ├── App.jsx        # asosiy (ildiz) komponent
│   ├── index.css      # butun sahifa uchun umumiy stillar
│   └── main.jsx       # kirish nuqtasi — React shu yerda ishga tushadi
├── index.html         # brauzer ochadigan yagona HTML sahifa
├── package.json       # loyiha nomi, skriptlar va kutubxonalar ro'yxati
├── vite.config.js     # Vite sozlamalari
└── eslint.config.js   # kod sifatini tekshiruvchi qoidalar`}</CodeBlock>

      <h2>React qanday ishga tushadi: index.html → main.jsx → App</h2>
      <p>
        Brauzer avval <code>index.html</code>ni ochadi. Unda deyarli hech narsa yo'q — faqat
        bitta bo'sh <code>div</code> va <code>main.jsx</code>ga havola:
      </p>
      <CodeBlock lang="html">{`<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>`}</CodeBlock>
      <p>
        <code>main.jsx</code> esa React'ni ana shu bo'sh <code>div</code>ga "ulaydi":
      </p>
      <CodeBlock lang="jsx">{`import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)`}</CodeBlock>
      <ul>
        <li>
          <code>createRoot(...)</code> — <code>#root</code> elementini React boshqaradigan
          hududga aylantiradi. Bundan keyin uning ichidagi hamma narsani React chizadi.
        </li>
        <li>
          <code>.render(...)</code> — shu hududga qaysi komponentni chizish kerakligini aytadi.
          Bu yerda — <code>App</code>.
        </li>
        <li>
          <code>StrictMode</code> — faqat dasturlash paytida ishlaydigan "qattiqqo'l
          tekshiruvchi". U ba'zi xatolarni erta topish uchun komponentlarni ataylab ikki marta
          chaqiradi — bu nima uchun foydali ekanini 9-darsda ko'ramiz.
        </li>
      </ul>
      <p>
        Demak <code>App</code> — butun komponentlar daraxtining ildizi. Siz yozadigan hamma
        boshqa komponentlar oxir-oqibat <code>App</code>ning ichida (yoki uning ichidagilar
        ichida) chaqiriladi. <code>main.jsx</code>ni odatda bir marta ko'rib, keyin deyarli
        tegmaysiz.
      </p>

      <h2>Toza boshlash va hot reload</h2>
      <p>
        Shablondagi namunaviy kodni o'chirib, <code>src/App.jsx</code>ni quyidagicha
        almashtiring, <code>App.css</code> importini ham olib tashlang:
      </p>
      <CodeBlock lang="jsx">{`function App() {
  return (
    <main>
      <h1>Kitob rastasi</h1>
      <p>Bu mening birinchi React ilovam.</p>
    </main>
  )
}

export default App`}</CodeBlock>
      <p>
        Faylni saqlang va brauzerga qarang — sahifa o'zi yangilandi, siz hech narsani qayta
        yuklamadingiz. Bu <strong>hot reload</strong> (HMR — Hot Module Replacement): Vite
        o'zgargan faylni kuzatib turadi va faqat uni brauzerga qayta yuboradi. Oxiridagi{' '}
        <code>export default App</code> qatori <code>main.jsx</code> bu komponentni import
        qila olishi uchun kerak — modullarni 4-darsda batafsil ko'ramiz.
      </p>

      <h2>React DevTools</h2>
      <p>
        Brauzeringiz kengaytmalar do'konidan <strong>React Developer Tools</strong>ni o'rnating.
        Shundan keyin brauzerning dasturchi oynasida (F12) ikkita yangi tab paydo bo'ladi:
      </p>
      <ul>
        <li>
          <strong>Components</strong> — sahifadagi komponentlar daraxti. Har bir komponentni
          tanlab, uning props va state'ini ko'rish (hatto o'zgartirish) mumkin. Elements tabi
          sizga HTML teglarni ko'rsatsa, bu tab — siz yozgan komponentlarni.
        </li>
        <li>
          <strong>Profiler</strong> — qaysi komponent qancha vaqt render bo'lganini o'lchaydi.
          Bu tezlikni optimallashtirishda kerak bo'ladi, hozircha unga tegmaymiz.
        </li>
      </ul>

      <h2>Asosiy npm skriptlari</h2>
      <CodeBlock lang="bash">{`npm run dev       # dasturlash serveri (hot reload bilan) — kundalik ish shu
npm run build     # ishlab chiqarish uchun optimallashtirilgan versiyani dist/ papkasiga yig'adi
npm run preview   # dist/ dagi tayyor versiyani mahalliy serverda ko'rsatadi
npm run lint      # ESLint bilan kodni tekshiradi`}</CodeBlock>
      <p>
        <code>npm run dev</code> ishlab turgan terminal oynasini yopsangiz, server ham to'xtaydi
        va <code>localhost:5173</code> ochilmay qoladi — bu normal holat, qayta{' '}
        <code>npm run dev</code> bering.
      </p>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Noto'g'ri papkada buyruq berish.</strong>{' '}
            <code>npm run dev</code> faqat <code>package.json</code> turgan papkada ishlaydi.
            "Missing script: dev" yoki "Could not read package.json" xatosi — avval{' '}
            <code>cd kitob-rastasi</code> qilish kerakligini bildiradi.
          </li>
          <li>
            <strong><code>npm install</code>ni unutish.</strong> Loyihani boshqa joydan (masalan,
            GitHub'dan) ko'chirib olganda <code>node_modules</code> bo'lmaydi; "vite: command not
            found" xatosi shuni bildiradi.
          </li>
          <li>
            <strong>JSX'ni <code>.js</code> faylga yozish.</strong> Vite JSX'ni faqat{' '}
            <code>.jsx</code> kengaytmali fayllarda kutadi. Komponent fayllarini doim{' '}
            <code>.jsx</code> deb nomlang.
          </li>
          <li>
            <strong><code>dist/</code> yoki <code>node_modules/</code>ni tahrirlash.</strong>{' '}
            Ikkalasi ham avtomatik yaratiladi; ulardagi o'zgarishlar keyingi build yoki install
            paytida o'chib ketadi. Kod faqat <code>src/</code>da yoziladi.
          </li>
          <li>
            <strong>Juda eski Node.js.</strong> Vite'ning yangi versiyalari eski Node bilan
            ishlamaydi va g'alati xatolar beradi — <code>node -v</code> bilan versiyani
            tekshiring.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="Vite loyihasida React birinchi bo'lib qaysi faylda ishga tushiriladi (createRoot qaysi faylda chaqiriladi)?"
        options={['src/main.jsx', 'src/App.jsx', 'index.html', 'vite.config.js']}
        correctIndex={0}
        explanation="index.html faqat bo'sh #root div'ini va main.jsx'ga havolani beradi. React'ni o'sha div'ga ulaydigan createRoot(...).render(<App />) chaqiruvi main.jsx'da turadi. App.jsx — chiziladigan ildiz komponent."
      />

      <Quiz
        question="Siz src/App.jsx'dagi matnni o'zgartirib saqladingiz, va brauzer sahifani qayta yuklamasdan yangi matnni ko'rsatdi. Bu qaysi imkoniyat?"
        options={[
          "Hot reload (HMR)",
          "StrictMode",
          "npm run build",
          "React DevTools",
        ]}
        correctIndex={0}
        explanation="Vite'ning dasturlash serveri fayllarni kuzatadi va o'zgargan modulni brauzerga darhol yuboradi — bu Hot Module Replacement (hot reload) deb ataladi. Build esa tayyor versiyani dist/ papkasiga yig'adi, sahifani jonli yangilamaydi."
      />

      <Exercise title="1-mashq: o'z loyihangiz">
        <p>
          Darsdagi qadamlar bo'yicha <code>kitob-rastasi</code> loyihasini yarating va ishga
          tushiring. So'ng <code>App.jsx</code>ni shunday o'zgartiringki, sahifada ismingiz
          yozilgan <code>{'<h1>'}</code> va React'ni o'rganishdan maqsadingiz yozilgan{' '}
          <code>{'<p>'}</code> chiqsin. Saqlaganingizda brauzer o'zi yangilanishiga ishonch
          hosil qiling.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`function App() {
  return (
    <main>
      <h1>Aziz Karimov</h1>
      <p>Men React'ni o'rganib, o'z onlayn do'konimni qurmoqchiman.</p>
    </main>
  )
}

export default App`}</CodeBlock>
          <p>
            Agar sahifa yangilanmasa: terminalda <code>npm run dev</code> hali ishlayotganini
            va faylni haqiqatan saqlaganingizni tekshiring.
          </p>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: DevTools va build">
        <p>
          (a) React DevTools'ni o'rnatib, Components tabida <code>App</code> komponentini
          toping. Elements tabidagi HTML bilan solishtiring: <code>StrictMode</code> Elements'da
          ko'rinadimi?
        </p>
        <p>
          (b) <code>npm run build</code>, keyin <code>npm run preview</code> bering.{' '}
          <code>dist/</code> papkasida qanday fayllar paydo bo'ldi? Ular ichida JSX bormi?
        </p>
        <Solution>
          <p>
            (a) Components tabida faqat <code>App</code> ko'rinadi: <code>StrictMode</code> na
            Components'da (DevTools uni ataylab yashiradi), na Elements'da ko'rinadi — u hech
            qanday HTML elementi chizmaydi, faqat tekshiruvchi o'rovchi. Elements'da esa{' '}
            <code>{'<div id="root">'}</code> ichidagi <code>main</code>, <code>h1</code>,{' '}
            <code>p</code> bor.
          </p>
          <p>
            (b) <code>dist/</code>da <code>index.html</code> va <code>assets/</code> papkasi
            ichida nomi hash (mazmundan hisoblangan kod, masalan <code>index-B4x9kQ2a.js</code>)
            bilan tugaydigan <code>.js</code> va <code>.css</code> fayllar, hamda{' '}
            <code>public/</code>dan o'zgarishsiz ko'chirilgan fayllar (<code>vite.svg</code>)
            paydo bo'ladi. Ularda JSX yo'q — Vite uni oddiy,
            siqilgan (minified) JavaScript'ga aylantirgan. Aynan shu <code>dist/</code> papkasi
            hostingga yuklanadi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Brauzer JSX'ni o'qiy olmaydi, shuning uchun React loyihalari build vositasi bilan
          ishlaydi; bu kursda — Vite.
        </li>
        <li>
          Yangi loyiha: <code>npm create vite@latest nom -- --template react</code>, so'ng{' '}
          <code>npm install</code> va <code>npm run dev</code>.
        </li>
        <li>
          Ishga tushish zanjiri: <code>index.html</code>dagi <code>#root</code> →{' '}
          <code>main.jsx</code>dagi <code>createRoot(...).render(&lt;App /&gt;)</code> →{' '}
          <code>App</code> komponenti.
        </li>
        <li>
          Kod faqat <code>src/</code>da, JSX faqat <code>.jsx</code> fayllarda yoziladi;{' '}
          <code>node_modules/</code> va <code>dist/</code> qo'lda tahrirlanmaydi.
        </li>
        <li>
          React DevTools'ning Components tabi komponentlar daraxtini va ularning props/state'ini
          ko'rsatadi — xato qidirishda eng foydali vosita.
        </li>
      </KeyPoints>
    </>
  )
}
