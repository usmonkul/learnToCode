import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Flexbox chuqur",
  section: "Layout",
}

export default function FlexboxDeepDiveLesson() {
  return (
    <>
      <p>
        Boshlang'ich kursda Flexbox'ning asosini o'rgandingiz. Endi elementlar
        o'lchamini boshqaradigan uch xossani va tez-tez uchraydigan muammolarni ko'ramiz.
      </p>

      <h2>flex-grow, flex-shrink, flex-basis</h2>
      <p>
        <code>flex</code> qisqa yozuvi uch qiymatdan iborat: <code>flex: grow shrink basis</code>.
      </p>
      <ul>
        <li><code>flex-basis</code> — boshlang'ich o'lcham (asosiy o'q bo'ylab).</li>
        <li><code>flex-grow</code> — bo'sh joy bo'lsa, qancha ulush olishi.</li>
        <li><code>flex-shrink</code> — joy yetmasa, qancha kichrayishi (<code>0</code> — kichraymaydi).</li>
      </ul>
      <CodeBlock lang="css">{`.yon-panel { flex: 0 0 260px; }  /* qat'iy 260px, o'smaydi, kichraymaydi */
.asosiy    { flex: 1 1 0; }      /* qolgan joyni egallaydi */
.katta     { flex: 2; }          /* boshqa flex:1 elementlardan 2 baravar katta ulush */`}</CodeBlock>

      <h2>Elementlar uchun align va order</h2>
      <CodeBlock lang="css">{`.qator {
  display: flex;
  align-items: flex-start;
}

.maxsus {
  align-self: flex-end;   /* faqat shu element boshqacha tekislanadi */
  order: -1;              /* vizual tartibni o'zgartirish */
}

/* Markazlash trikligi: auto margin */
.chap-logo { margin-right: auto; }   /* qolgan joyni o'ng tomonga suradi */`}</CodeBlock>
      <Callout type="warning" title="order va accessibility">
        <code>order</code> faqat ko'rinishni o'zgartiradi, klaviatura (Tab) tartibi va ekran
        o'quvchi tartibi esa HTML tartibida qoladi. Bu chalkashlikka olib keladi. Iloji
        bo'lsa, HTMLning o'zini kerakli tartibda yozing.
      </Callout>

      <h2>Ko'p qatorli flex va gap</h2>
      <CodeBlock lang="css">{`.kartalar {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.karta {
  flex: 1 1 260px;   /* kamida ~260px, sig'masa keyingi qatorga o'tadi */
}`}</CodeBlock>
      <p>
        <code>flex: 1 1 260px</code> + <code>wrap</code> — media query'siz responsive
        kartalar uchun juda foydali usul.
      </p>

      <h2>Odatiy muammolar</h2>
      <h3>1. Matn flex elementdan chiqib ketadi</h3>
      <p>
        Flex elementlarning standart <code>min-width</code>i <code>auto</code>, ya'ni
        elementni kontentidan kichik qilmaydi. Uzun so'z yoki rasm konteynerdan chiqib
        ketsa:
      </p>
      <CodeBlock lang="css">{`.element {
  min-width: 0;            /* kichrayishga ruxsat */
  overflow-wrap: anywhere; /* uzun so'zlarni bo'lish */
}`}</CodeBlock>
      <h3>2. Elementlar cho'zilib ketadi</h3>
      <p>
        Standartda <code>align-items: stretch</code>, ya'ni elementlar qator balandligigacha
        cho'ziladi. Buni <code>align-items: flex-start</code> bilan o'zgartiring.
      </p>
      <h3>3. Vertikal markazlash ishlamayapti</h3>
      <p>
        Ota-elementda balandlik bo'lishi kerak: <code>min-height: 100vh</code> yoki aniq{' '}
        <code>height</code>.
      </p>

      <Quiz
        question="flex: 0 0 260px nimani anglatadi?"
        options={[
          "Element 260px, o'smaydi va kichraymaydi",
          "Element 0 dan 260px gacha o'sadi",
          "Element yashiriladi",
          "Element qolgan joyni egallaydi",
        ]}
        correctIndex={0}
        explanation="grow=0 (o'smaydi), shrink=0 (kichraymaydi), basis=260px (boshlang'ich o'lcham): natijada element qat'iy 260px bo'ladi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Sidebar layout">
        <p>
          Chapda qat'iy 240px yon panel, o'ngda qolgan joyni egallaydigan asosiy kontent
          bo'lgan layout yozing. Uzun matn asosiy qismdan chiqib ketmasin.
        </p>
        <Solution>
          <CodeBlock lang="css">{`.layout {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.yon-panel {
  flex: 0 0 240px;
}

.asosiy {
  flex: 1;
  min-width: 0;
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>flex: grow shrink basis</code> — elementlar o'lchamini boshqaradi.</li>
        <li><code>flex: 1 1 260px</code> + <code>flex-wrap</code> — media query'siz moslashuvchan kartalar.</li>
        <li><code>min-width: 0</code> flex elementdagi toshib ketish muammosini hal qiladi.</li>
        <li><code>order</code> faqat vizual tartibni o'zgartiradi, accessibility tartibini emas.</li>
      </KeyPoints>
    </>
  )
}
