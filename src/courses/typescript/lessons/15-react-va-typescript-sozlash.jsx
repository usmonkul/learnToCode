import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'React loyihasida TypeScript sozlash',
  section: 'TypeScript va React',
}

export default function ReactTypeScriptSetupLesson() {
  return (
    <>
      <p>
        Shu paytgacha biz TypeScript'ni oddiy funksiya va obyektlar ustida o'rgandik. Endi kursning
        ikkinchi yarmi boshlanadi — bu yerda TypeScript'ni React bilan birga qo'llaymiz. Agar siz
        ushbu platformaning React kursida <code>useState</code>, props va event handler'lar bilan
        allaqachon tanish bo'lsangiz, bu yerda React'ning o'zini emas, balki TypeScript uni qanday
        o'zgartirishini o'rganasiz.
      </p>
      <p>
        Bu qisqa dars — sozlash (setup) haqida. Undan keyingi darslarda esa amaliy naqshlarga
        (patterns) o'tamiz: props tiplari, <code>useState</code> generiklari va event tiplari.
      </p>

      <h2>
        <code>.tsx</code> fayl kengaytmasi
      </h2>
      <p>
        Oddiy TypeScript fayllar <code>.ts</code> kengaytmasida yoziladi. Lekin JSX sintaksisi
        (<code>{'<div>...</div>'}</code> kabi) ishlatilgan faylda kompilyator JSX va TypeScript'ning
        generik sintaksisini (<code>{'<T>'}</code>) bir-biridan ajrata olishi kerak — shu sababli
        JSX ishlatiladigan har qanday TypeScript fayl <code>.tsx</code> kengaytmasida yoziladi:
      </p>
      <CodeBlock lang="tsx">{`// Salom.tsx
function Salom({ ism }: { ism: string }) {
  return <p>Salom, {ism}!</p>
}`}</CodeBlock>
      <p>
        Qisqacha aytganda: JSX yo'q, mantiq bor faylga — <code>.ts</code>. JSX bor faylga —{' '}
        <code>.tsx</code>. Bu shunchaki fayl nomi kengaytmasi, lekin uni to'g'ri tanlash muhim —
        aks holda kompilyator JSX'ni tushunmay xato beradi.
      </p>

      <h2>Loyiha yaratish: Vite'ning TypeScript shabloni</h2>
      <p>
        Amalda hech kim React + TypeScript loyihasini noldan, qo'lda sozlamaydi. Vite (yoki
        Next.js kabi boshqa vositalar) loyiha yaratishda tayyor TypeScript shablonini taklif
        qiladi — u kerakli <code>tsconfig.json</code>, fayl tuzilishi va bog'liqliklarni
        (dependencies) o'zi o'rnatib beradi:
      </p>
      <CodeBlock lang="typescript">{`npm create vite@latest mening-loyiham -- --template react-ts`}</CodeBlock>
      <p>
        Shu buyruqdan keyin loyihada <code>src/App.tsx</code>, <code>tsconfig.json</code> va
        boshqa kerakli fayllar tayyor holda paydo bo'ladi — avvalgi darsda ko'rgan{' '}
        <code>strict: true</code> kabi sozlamalar bilan birga.
      </p>

      <h2>
        <code>@types/react</code> va <code>@types/react-dom</code> nima uchun kerak?
      </h2>
      <p>
        React'ning o'zi TypeScript'da emas, oddiy JavaScript'da yozilgan — shuning uchun uning
        ichida <code>useState</code>, <code>props</code>, JSX elementlari kabi narsalarning
        tiplari yo'q. Bu tiplar alohida, jamoat tomonidan (community) qo'llab-quvvatlanadigan{' '}
        <code>@types/react</code> va <code>@types/react-dom</code> paketlarida tarqatiladi:
      </p>
      <CodeBlock lang="typescript">{`npm install --save-dev @types/react @types/react-dom`}</CodeBlock>
      <p>
        Bu paketlar React'ning o'ziga hech qanday kod qo'shmaydi — ular faqat TypeScript
        kompilyatoriga "React'dagi <code>useState</code> shunday ishlaydi, <code>props</code>{' '}
        bunday shaklda bo'ladi" deb aytib beradi. Vite'ning <code>react-ts</code> shabloni bu
        ikkalasini avtomatik qo'shib qo'yadi, shuning uchun odatda ularni qo'lda o'rnatishga
        ehtiyoj bo'lmaydi.
      </p>
      <Callout type="note" title="Nega alohida paket kerak?">
        Ko'p JavaScript kutubxonalari (React jumladan) TypeScript paydo bo'lishidan oldin yozilgan
        yoki hozir ham sof JavaScript'da yoziladi. Ularning tiplarini <code>@types/</code>{' '}
        prefiksli alohida paketlarda saqlash — bu <strong>DefinitelyTyped</strong> deb ataladigan
        katta ochiq loyihaning konventsiyasi. Kutubxonaning o'zi TypeScript'da yozilgan bo'lsa
        (masalan, ko'plab zamonaviy kutubxonalar), alohida <code>@types/</code> paket kerak
        bo'lmaydi — tiplar to'g'ridan-to'g'ri paket ichida keladi.
      </Callout>

      <h2>
        <code>tsconfig.json</code>dagi <code>jsx</code> sozlamasi
      </h2>
      <p>
        React loyihasining <code>tsconfig.json</code>ida bitta qo'shimcha sozlama bo'ladi —{' '}
        <code>jsx</code>. U kompilyatorga JSX sintaksisini qanday qayta ishlashni aytadi
        (masalan, <code>"react-jsx"</code> qiymati — Vite va zamonaviy React loyihalarining
        standart tanlovi):
      </p>
      <CodeBlock lang="typescript">{`// tsconfig.json (qisqartirilgan)
{
  "compilerOptions": {
    "jsx": "react-jsx"
  }
}`}</CodeBlock>
      <p>
        Bu sozlama ham Vite'ning shabloni tomonidan avtomatik to'g'ri qo'yiladi — uni odatda
        qo'lda o'zgartirishga hojat yo'q, lekin xato xabarlarida bu nom uchrab qolsa, endi u
        nimani anglatishini bilasiz.
      </p>

      <Callout type="tip" title="Bundan keyingi darslarda">
        Shu darsdan boshlab, ushbu kursdagi barcha kod misollari <code>.tsx</code> uslubida —
        ya'ni JSX va TypeScript birgalikda — yoziladi. Kod bloklari endi{' '}
        <code>tsx</code> sifatida belgilanadi.
      </Callout>

      <Quiz
        question="@types/react paketi nima uchun kerak?"
        options={[
          "React'ning o'zini tezroq ishlashga majburlaydi",
          "React JavaScript'da yozilgani uchun, TypeScript'ga uning API'lari qanday shaklda ekanini alohida aytib berish uchun",
          "U .tsx fayllarni .ts fayllarga aylantiradi",
          "U faqat production build paytida kerak bo'ladi, development uchun kerak emas",
        ]}
        correctIndex={1}
        explanation="React'ning o'zi JavaScript'da yozilgan, shuning uchun uning tiplari (useState qanday ishlashi, props qanday shaklda bo'lishi kabi) TypeScript kompilyatoriga alohida @types/react paketi orqali yetkaziladi."
      />

      <KeyPoints>
        <li>
          JSX ishlatilgan TypeScript fayl <code>.tsx</code> kengaytmasida yoziladi, mantiq-only
          fayl — <code>.ts</code>da.
        </li>
        <li>
          Amalda React + TypeScript loyihasi odatda Vite'ning{' '}
          <code>react-ts</code> shablonidan (yoki shunga o'xshash vositadan) yaratiladi.
        </li>
        <li>
          <code>@types/react</code> va <code>@types/react-dom</code> — React'ning JavaScript'da
          yozilgan API'lari uchun TypeScript tiplarini beruvchi alohida paketlar.
        </li>
        <li>
          <code>tsconfig.json</code>dagi <code>jsx</code> sozlamasi JSX'ni qanday qayta
          ishlashni belgilaydi — zamonaviy loyihalarda odatda <code>"react-jsx"</code>.
        </li>
        <li>
          Shu darsdan boshlab kursdagi kod misollari <code>.tsx</code> uslubida yoziladi.
        </li>
      </KeyPoints>
    </>
  )
}
