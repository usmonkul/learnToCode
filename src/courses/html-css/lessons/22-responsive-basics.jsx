import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Responsive dizayn asoslari",
  section: "CSS asoslari",
}

export default function ResponsiveBasicsLesson() {
  return (
    <>
      <p>
        Sizning saytingizga telefonda, planshetda va kompyuterda kirishadi. Sahifa hamma
        ekranda yaxshi ko'rinishi uchun <strong>responsive</strong> (moslashuvchan) dizayn
        kerak.
      </p>

      <h2>1. Viewport meta tegi</h2>
      <p>
        Telefonlar sahifani kompyuter kengligida ko'rsatib, keyin kichraytiradi. Buni to'xtatish
        uchun <code>head</code>da quyidagi teg bo'lishi shart:
      </p>
      <CodeBlock lang="html">{`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`}</CodeBlock>

      <h2>2. Moslashuvchan o'lchamlar</h2>
      <CodeBlock lang="css">{`/* Qat'iy width o'rniga max-width */
.konteyner {
  max-width: 1100px;   /* katta ekranda 1100px dan oshmaydi */
  margin: 0 auto;
  padding: 0 16px;
}

/* Rasmlar konteynerdan chiqib ketmasin */
img {
  max-width: 100%;
  height: auto;
}`}</CodeBlock>
      <Callout type="tip" title="max-width — do'stingiz">
        <code>width: 1100px</code> kichik ekranda gorizontal aylantirishga sabab bo'ladi.{' '}
        <code>max-width: 1100px</code> esa ekran kichik bo'lsa, o'zi kichrayadi.
      </Callout>

      <h2>3. Media query</h2>
      <p>
        Media query ekran o'lchamiga qarab boshqa CSS qoidalarini qo'llaydi.
      </p>
      <CodeBlock lang="css">{`/* Mobil uchun standart uslub */
.kartalar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 768px va undan keng ekranlarda */
@media (min-width: 768px) {
  .kartalar {
    flex-direction: row;
  }
}`}</CodeBlock>
      <p>
        Bu yondashuv <strong>mobile-first</strong> deyiladi: avval eng kichik ekran uchun
        yozasiz, keyin <code>min-width</code> bilan kattaroq ekranlar uchun kengaytirasiz. Bu
        odatda sodda va kam kod talab qiladi.
      </p>

      <h2>Odatiy to'xtash nuqtalari (breakpoints)</h2>
      <ul>
        <li><code>640px</code> — katta telefon.</li>
        <li><code>768px</code> — planshet.</li>
        <li><code>1024px</code> — kichik noutbuk.</li>
        <li><code>1280px</code> — katta ekran.</li>
      </ul>
      <Callout type="note" title="Nuqtani kontentga qarab tanlang">
        Bu raqamlar faqat namuna. Sahifani brauzerda torayting va dizayn "sinadigan" joyda
        nuqta qo'ying. DevTools'dagi qurilma rejimi (device toolbar) buning uchun juda qulay.
      </Callout>

      <Quiz
        question="Mobile-first yondashuvda odatda qaysi media query turi ishlatiladi?"
        options={["max-width", "min-width", "orientation", "print"]}
        correctIndex={1}
        explanation="Mobile-first: asosiy uslub kichik ekran uchun, min-width bilan esa keng ekranlarda qo'shimcha uslub beriladi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Moslashuvchan kartalar">
        <p>
          <code>.kartalar</code> mobilda ustun ko'rinishida (bir-birining tagida), 700px dan
          keng ekranlarda qator ko'rinishida bo'lsin. Har bir karta <code>flex: 1</code> bilan
          teng kenglikda bo'lsin.
        </p>
        <Solution>
          <CodeBlock lang="css">{`.kartalar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.kartalar .karta {
  flex: 1;
}

@media (min-width: 700px) {
  .kartalar {
    flex-direction: row;
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Viewport meta tegisiz mobil qurilmalarda sahifa noto'g'ri ko'rinadi.</li>
        <li><code>max-width</code> va <code>img {`{ max-width: 100%; }`}</code> — asosiy moslashuvchan qoidalar.</li>
        <li>Media query: <code>@media (min-width: 768px)</code>.</li>
        <li>Mobile-first: kichik ekran uchun yozing, keyin <code>min-width</code> bilan kengaytiring.</li>
      </KeyPoints>
    </>
  )
}
