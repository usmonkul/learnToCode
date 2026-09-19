import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "BEM va CSS arxitekturasi",
  section: "Professional CSS",
}

export default function BemAndArchitectureLesson() {
  return (
    <>
      <p>
        Kichik saytda CSS yozish oson. 50 ta sahifa va 5 ta dasturchi bo'lganda esa savol
        boshqacha: "Shu qoidani o'zgartirsam, qaysi joy buziladi?" CSS arxitekturasi shu
        savolga javob beradi.
      </p>

      <h2>Muammo: global CSS</h2>
      <p>
        CSS qoidalari global. <code>.title</code> deb nomlangan class bitta joyda yozilsa,
        boshqa joyda tasodifan xuddi shu nomdagi class bilan to'qnashadi va uslublar
        aralashib ketadi.
      </p>

      <h2>BEM nomlash usuli</h2>
      <p>
        BEM = <strong>B</strong>lock (blok), <strong>E</strong>lement, <strong>M</strong>odifier
        (modifikator). Nomdan qaysi qismga tegishli ekani ko'rinib turadi.
      </p>
      <CodeBlock lang="css">{`.karta { }                     /* Block: mustaqil komponent */
.karta__sarlavha { }           /* Element: blokning qismi (ikki pastki chiziq) */
.karta__tugma { }
.karta--asosiy { }             /* Modifier: variant (ikki tire) */
.karta__tugma--katta { }`}</CodeBlock>
      <CodeBlock lang="html">{`<article class="karta karta--asosiy">
  <h3 class="karta__sarlavha">Sarlavha</h3>
  <p class="karta__matn">Matn</p>
  <button class="karta__tugma karta__tugma--katta">Batafsil</button>
</article>`}</CodeBlock>
      <ul>
        <li>Faqat class selektori ishlatiladi: aniqlik doim past va bashorat qilinadigan.</li>
        <li>Element ichma-ich yozilmaydi: <code>.karta__matn__havola</code> emas, <code>.karta__havola</code>.</li>
        <li>Modifikator alohida ishlatilmaydi, har doim asosiy class bilan birga.</li>
      </ul>
      <Callout type="note" title="Kamchilik">
        BEM class nomlari uzun bo'ladi. Buning evaziga ehtimoliy to'qnashuv va "bu class
        qayerda ishlatiladi?" degan savollar yo'qoladi.
      </Callout>

      <h2>Fayl tuzilmasi</h2>
      <CodeBlock lang="text">{`css/
  main.css              /* faqat @import lar */
  base/
    reset.css
    tokens.css          /* :root o'zgaruvchilari */
    typography.css
  layout/
    konteyner.css
    grid.css
  components/
    tugma.css
    karta.css
    navigatsiya.css
  utilities/
    yordamchi.css       /* .matn-markaz, .yashirin va h.k. */`}</CodeBlock>
      <p>
        Kalit g'oya: <strong>umumiydan xususiyga</strong> tartibda yozing (reset → o'zgaruvchilar
        → maket → komponentlar → yordamchilar). Buni <code>@layer</code> bilan ham
        mustahkamlash mumkin (5-darsga qarang).
      </p>

      <h2>Boshqa yondashuvlar</h2>
      <ul>
        <li><strong>Utility-first (Tailwind):</strong> tayyor kichik class'lar to'plami bilan HTMLning o'zida uslub yoziladi.</li>
        <li><strong>CSS Modules:</strong> build vositasi class nomlarini avtomatik noyob qiladi.</li>
        <li><strong>Web Components / Shadow DOM:</strong> uslub komponent ichida izolyatsiya qilinadi.</li>
      </ul>
      <p>
        "Eng yaxshi" yagona yondashuv yo'q. Muhimi — jamoa bitta qoidaga rioya qilishi.
      </p>

      <h2>Yaxshi amaliyotlar</h2>
      <ul>
        <li>Selektorlarni sayoz va past aniqlikda saqlang (2–3 daraja ichma-ichdan oshirmang).</li>
        <li>Element nomiga emas, class'ga tayaning (<code>div.karta &gt; p</code> — mo'rt).</li>
        <li>Class nomi rolni bildirsin, ko'rinishni emas (<code>.tugma--xavfli</code>, <code>.qizil-tugma</code> emas).</li>
        <li>Ishlatilmaydigan CSSni o'chirib turing.</li>
      </ul>

      <Quiz
        question="BEM'da 'karta' blokidagi 'sarlavha' elementi qanday yoziladi?"
        options={[".karta-sarlavha", ".karta__sarlavha", ".karta--sarlavha", ".karta.sarlavha"]}
        correctIndex={1}
        explanation="Element blok nomi + ikki pastki chiziq + element nomi: .karta__sarlavha. Modifikator esa ikki tire bilan yoziladi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: BEM'ga o'tkazish">
        <p>Quyidagi kodni BEM nomlash bilan qayta yozing (HTML va CSS).</p>
        <CodeBlock lang="html">{`<div class="box big">
  <h2 class="title">Sarlavha</h2>
  <a class="btn btn-red">Bosish</a>
</div>`}</CodeBlock>
        <Solution>
          <CodeBlock lang="html">{`<div class="quti quti--katta">
  <h2 class="quti__sarlavha">Sarlavha</h2>
  <a class="quti__tugma quti__tugma--xavfli">Bosish</a>
</div>`}</CodeBlock>
          <CodeBlock lang="css">{`.quti { }
.quti--katta { }
.quti__sarlavha { }
.quti__tugma { }
.quti__tugma--xavfli { background: #dc2626; }`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>BEM: <code>blok__element--modifikator</code>, faqat class selektorlari bilan.</li>
        <li>Selektorlar sayoz va past aniqlikda bo'lsin.</li>
        <li>Fayllarni umumiydan xususiyga tartiblang: reset, tokenlar, maket, komponentlar, yordamchilar.</li>
        <li>Muhimi — jamoa bitta konvensiyaga rioya qilishi.</li>
      </KeyPoints>
    </>
  )
}
