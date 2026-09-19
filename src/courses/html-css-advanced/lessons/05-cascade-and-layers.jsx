import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Cascade, aniqlik va @layer",
  section: "CSS chuqur",
}

export default function CascadeAndLayersLesson() {
  return (
    <>
      <p>
        Katta loyihalarda CSS ko'pincha "tartibsiz urush"ga aylanadi: qoida yozasiz, ishlamaydi,{' '}
        <code>!important</code> qo'shasiz, u boshqa joyni buzadi. Buning sababi cascade
        (pog'onali) algoritmini to'liq tushunmaslikda. Endi uni aniq o'rganamiz.
      </p>

      <h2>Cascade tartibi</h2>
      <p>Brauzer ziddiyatli qoidalar orasidan g'olibni shu tartibda aniqlaydi:</p>
      <ol>
        <li><strong>Manba va muhimlik:</strong> <code>!important</code> qoidalar oddiylardan ustun.</li>
        <li><strong>Cascade layer:</strong> keyin e'lon qilingan qatlam oldingisidan ustun (oddiy qoidalarda).</li>
        <li><strong>Aniqlik (specificity).</strong></li>
        <li><strong>Tartib:</strong> keyin yozilgan oldingisini bekor qiladi.</li>
      </ol>

      <h2>Aniqlikni hisoblash</h2>
      <p>
        Aniqlik uch raqam (ID, class, element) sifatida yoziladi va chapdan o'ngga
        taqqoslanadi: <code>0-1-0</code> har qanday <code>0-0-99</code> dan kuchli.
      </p>
      <CodeBlock lang="css">{`p                    /* 0-0-1 */
.karta p             /* 0-1-1 */
.karta.faol p        /* 0-2-1 */
#asosiy .karta       /* 1-1-0 */
a:hover              /* 0-1-1 (pseudo-class = class) */
input[type="text"]   /* 0-1-1 (atribut = class) */
ul li::before        /* 0-0-3 (pseudo-element = element) */`}</CodeBlock>
      <Callout type="note" title="Aniqlikni nol qiladiganlar">
        <code>:where()</code> ichidagi hamma narsa 0 aniqlik beradi, <code>:is()</code> va{' '}
        <code>:not()</code> esa ichidagi eng kuchli selektor aniqligini oladi. Bu utility va
        reset qoidalar uchun juda foydali.
      </Callout>

      <h2>@layer: tartibni o'zingiz boshqaring</h2>
      <p>
        <code>@layer</code> bilan CSSni qatlamlarga bo'lasiz. Qatlamlar tartibi aniqlikdan{' '}
        <em>ustun</em> turadi: keyingi qatlamdagi oddiy selektor oldingi qatlamdagi kuchli
        selektorni yengadi.
      </p>
      <CodeBlock lang="css">{`/* Tartibni boshida e'lon qiling: oxirgisi eng kuchli */
@layer reset, base, components, utilities;

@layer reset {
  * { box-sizing: border-box; margin: 0; }
}

@layer base {
  body { font-family: system-ui, sans-serif; line-height: 1.6; }
  a { color: #2563eb; }
}

@layer components {
  .tugma { padding: 0.6rem 1.2rem; background: #2563eb; color: white; }
  .karta a { color: inherit; }  /* aniqligi 0-1-1, lekin base dagi a ni yengadi */
}

@layer utilities {
  .matn-markaz { text-align: center; }
}`}</CodeBlock>
      <ul>
        <li>Qatlamsiz (layer'ga kirmagan) qoidalar hamma qatlamlardan kuchli hisoblanadi.</li>
        <li>Uchinchi tomon CSS (masalan, kutubxona) ni alohida qatlamga solib, o'zingiznikini uning ustiga qo'yish mumkin.</li>
        <li>Ichma-ich qatlam: <code>@layer components.karta {`{ ... }`}</code>.</li>
      </ul>
      <Callout type="tip" title="Qachon kerak?">
        Kichik loyihada shart emas. Lekin CSS kutubxonasi ishlatsangiz yoki jamoada yirik
        loyiha yozsangiz, <code>@layer</code> aniqlik urushlarini deyarli yo'q qiladi.
      </Callout>

      <Quiz
        question="Selektor aniqligi 1-0-0 (ID) bo'lgan, lekin oldingi qatlamdagi qoida bilan aniqligi 0-0-1 bo'lgan keyingi qatlamdagi qoida ziddiyatda. Qaysi biri g'olib?"
        options={[
          "ID selektori, chunki aniqligi baland",
          "Keyingi qatlamdagi qoida, chunki qatlam tartibi aniqlikdan oldin tekshiriladi",
          "Ikkalasi bekor bo'ladi",
          "Tasodifiy",
        ]}
        correctIndex={1}
        explanation="Cascade layer aniqlikdan oldin hisobga olinadi: keyinroq e'lon qilingan qatlamdagi oddiy qoida oldingi qatlamdagi har qanday aniqlikni yengadi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Aniqlik hisobi">
        <p>
          <code>{`nav ul li a:hover`}</code> va <code>{`.menyu .band.faol`}</code> selektorlarining
          aniqligini hisoblang. Qaysi biri kuchli?
        </p>
        <Solution>
          <p>
            <code>{`nav ul li a:hover`}</code>: element 4 ta (nav, ul, li, a) + pseudo-class 1
            ta → <strong>0-1-4</strong>.
          </p>
          <p>
            <code>{`.menyu .band.faol`}</code>: 3 ta class → <strong>0-3-0</strong>.
          </p>
          <p>
            Chapdan o'ngga taqqoslanadi: class soni 3 &gt; 1, shuning uchun ikkinchisi kuchli,
            element soni ahamiyatsiz.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Cascade tartibi: muhimlik → layer → aniqlik → yozilish tartibi.</li>
        <li>Aniqlik (ID-class-element) chapdan o'ngga taqqoslanadi, o'nlik raqam kabi emas.</li>
        <li><code>@layer</code> bilan CSS qatlamlarga bo'linadi va qatlam tartibi aniqlikdan ustun.</li>
        <li><code>:where()</code> nol aniqlik beradi — reset va default uslublar uchun qulay.</li>
      </KeyPoints>
    </>
  )
}
