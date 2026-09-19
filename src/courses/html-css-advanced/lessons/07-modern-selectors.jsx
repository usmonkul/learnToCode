import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Zamonaviy selektorlar",
  section: "CSS chuqur",
}

export default function ModernSelectorsLesson() {
  return (
    <>
      <p>
        Zamonaviy CSS selektorlari ilgari JavaScript yoki qo'shimcha class talab qilgan
        ishlarni o'zi bajaradi: "ichida rasm bor karta", "oxirgisidan boshqa hammasi".
      </p>

      <h2>:is() va :where()</h2>
      <p>Uzun ro'yxatlarni qisqartiradi:</p>
      <CodeBlock lang="css">{`/* Oldin */
header a:hover, nav a:hover, footer a:hover {
  color: crimson;
}

/* Endi */
:is(header, nav, footer) a:hover {
  color: crimson;
}

/* :where() — xuddi shunday, lekin aniqligi 0 */
:where(ul, ol) {
  padding-left: 1.5rem;
}`}</CodeBlock>

      <h2>:not()</h2>
      <CodeBlock lang="css">{`/* Oxirgisidan boshqa hamma li ostiga chiziq */
li:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
}

a:not([href^="http"]) {
  /* ichki havolalar */
}`}</CodeBlock>

      <h2>:has() — "ota-element selektori"</h2>
      <p>
        <code>:has()</code> CSS tarixidagi eng kutilgan imkoniyatlardan biri: element o'z{' '}
        <em>ichidagi</em> narsaga qarab tanlanadi.
      </p>
      <CodeBlock lang="css">{`/* Rasmi bor karta */
.karta:has(img) {
  display: grid;
  grid-template-columns: 120px 1fr;
}

/* Fokus olgan input turgan label / forma guruhi */
.maydon:has(input:focus) {
  outline: 2px solid teal;
}

/* Yoqilgan checkbox bor bo'lsa, o'sha qatorni ajratish */
li:has(input:checked) {
  text-decoration: line-through;
}

/* Xato bor bo'lsa, butun formaga belgi */
form:has(:user-invalid) button[type="submit"] {
  opacity: 0.6;
}`}</CodeBlock>

      <h2>nth-child formulalari</h2>
      <CodeBlock lang="css">{`li:nth-child(odd)   { background: #f9fafb; }   /* 1, 3, 5... */
li:nth-child(3n)    { color: red; }            /* 3, 6, 9... */
li:nth-child(n + 4) { opacity: 0.5; }          /* 4-chidan boshlab */
li:nth-child(-n + 3){ font-weight: bold; }     /* dastlabki 3 tasi */
li:nth-of-type(2)   { }                        /* ikkinchi li (tur bo'yicha) */
li:first-child:last-child { }                  /* yagona bola */`}</CodeBlock>

      <h2>Boshqa foydali selektorlar</h2>
      <CodeBlock lang="css">{`:focus-visible   { }  /* faqat klaviatura fokusi */
:focus-within    { }  /* ichida fokus bo'lgan ota-element */
:target          { }  /* URLdagi #id ga mos element */
::selection      { background: gold; }
::placeholder    { color: #9ca3af; }
:empty           { display: none; }   /* bo'sh element */
:disabled        { opacity: 0.5; }`}</CodeBlock>
      <Callout type="note" title="Brauzer qo'llab-quvvatlashi">
        <code>:has()</code>, <code>:is()</code>, <code>:where()</code> hamma zamonaviy
        brauzerlarda ishlaydi. Yangi imkoniyatdan foydalanishdan oldin MDN yoki caniuse.com da
        qo'llab-quvvatlashni tekshirib olish yaxshi odat.
      </Callout>

      <Quiz
        question="Ichida rasm (img) bo'lgan .karta elementlarini tanlash uchun qaysi selektor mos?"
        options={[".karta img", ".karta:has(img)", ".karta:is(img)", ".karta > img:not()"]}
        correctIndex={1}
        explanation=".karta img rasmning o'zini tanlaydi. .karta:has(img) esa ichida rasm bor kartaning o'zini tanlaydi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Formadagi guruh">
        <p>
          <code>.maydon</code> ichida input fokus olsa, butun <code>.maydon</code>ning fon
          rangi och ko'k bo'lsin. Ro'yxatdagi birinchi uchta elementni qalin qiling va
          oxirgisidan boshqa hammasiga pastki chiziq qo'shing.
        </p>
        <Solution>
          <CodeBlock lang="css">{`.maydon:has(input:focus) {
  background: #eff6ff;
}

li:nth-child(-n + 3) {
  font-weight: bold;
}

li:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>:is()</code> va <code>:where()</code> uzun selektorlarni qisqartiradi (<code>:where</code> aniqligi 0).</li>
        <li><code>:has()</code> element ichidagi narsaga qarab tanlash imkonini beradi.</li>
        <li><code>:not()</code> istisnolar uchun, <code>:nth-child()</code> formulalar uchun.</li>
        <li><code>:focus-visible</code> va <code>:focus-within</code> accessibility uchun foydali.</li>
      </KeyPoints>
    </>
  )
}
