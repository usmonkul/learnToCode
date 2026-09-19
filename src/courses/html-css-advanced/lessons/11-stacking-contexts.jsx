import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Position va z-index: stacking context",
  section: "Layout",
}

export default function StackingContextsLesson() {
  return (
    <>
      <p>
        "Men <code>z-index: 9999</code> berdim, lekin baribir orqada qolyapti!" — har bir
        frontend dasturchi bu holatga tushgan. Sabab: <code>z-index</code> hamma elementlar
        orasida emas, faqat bitta <strong>stacking context</strong> ichida ishlaydi.
      </p>

      <h2>z-index qachon ishlaydi</h2>
      <p>
        <code>z-index</code> faqat <code>position</code> qiymati <code>static</code> bo'lmagan
        elementlarda (<code>relative</code>, <code>absolute</code>, <code>fixed</code>,{' '}
        <code>sticky</code>), shuningdek flex/grid bolalarida ishlaydi.
      </p>
      <CodeBlock lang="css">{`.orqa {
  position: relative;
  z-index: 1;
}

.old {
  position: relative;
  z-index: 2;   /* .orqa dan yuqori */
}`}</CodeBlock>

      <h2>Stacking context nima?</h2>
      <p>
        Stacking context — elementlarning "qavat guruhi". Ichidagi elementlar faqat o'zaro
        <code>z-index</code> bo'yicha taqqoslanadi va butun guruh bitta bo'lib tashqaridagi
        boshqa elementlar bilan tartiblanadi.
      </p>
      <p>Yangi context quyidagilar bilan yaratiladi:</p>
      <ul>
        <li>Ildiz element (<code>html</code>).</li>
        <li><code>position: fixed</code> yoki <code>sticky</code>.</li>
        <li><code>position: relative/absolute</code> + <code>z-index</code> (auto emas).</li>
        <li><code>opacity</code> 1 dan kichik.</li>
        <li><code>transform</code>, <code>filter</code>, <code>backdrop-filter</code>, <code>will-change</code>.</li>
        <li><code>isolation: isolate</code> — aynan shu maqsadda.</li>
      </ul>
      <CodeBlock lang="html">{`<div class="A">        <!-- z-index: 1, yangi context -->
  <div class="A-ichki">   <!-- z-index: 9999 -->
</div>
<div class="B">        <!-- z-index: 2 -->
</div>`}</CodeBlock>
      <p>
        Bu yerda <code>.A-ichki</code> qancha katta z-index bermang, <code>.B</code>ning
        ustiga chiqolmaydi: chunki <code>.A</code> butunlay (bitta qavat sifatida){' '}
        <code>.B</code> dan pastda turibdi.
      </p>
      <Callout type="warning" title="Ko'p uchraydigan tuzoq">
        Ota-elementga <code>transform</code> yoki <code>opacity</code> qo'shish tasodifan yangi
        stacking context yaratadi va ichidagi modal yoki dropdown'ning z-index'i "buzilib"
        qoladi. Muammoni izlaganda ota-elementlarni birma-bir tekshiring.
      </Callout>

      <h2>isolation: isolate</h2>
      <p>
        Komponentning ichki z-index'lari tashqariga ta'sir qilmasligi uchun uni o'zi
        alohida stacking context qiling:
      </p>
      <CodeBlock lang="css">{`.komponent {
  isolation: isolate;   /* ichidagi z-index lar faqat shu yerda hisoblanadi */
}`}</CodeBlock>

      <h2>z-index bilan tartibli ishlash</h2>
      <CodeBlock lang="css">{`:root {
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-modal: 30;
  --z-toast: 40;
}

.modal { position: fixed; z-index: var(--z-modal); }`}</CodeBlock>
      <p>
        9999 kabi katta sonlar o'rniga kichik, nomli qatlamlar tizimi ishlating.
      </p>

      <Quiz
        question="z-index: 9999 berilgan element boshqa elementning ustiga chiqmayapti. Eng ehtimoliy sabab nima?"
        options={[
          "z-index maksimal qiymatdan oshib ketgan",
          "U boshqa stacking context ichida joylashgan",
          "Brauzer z-index'ni qo'llab-quvvatlamaydi",
          "position: static berilgan bo'lishi shart emas",
        ]}
        correctIndex={1}
        explanation="z-index faqat bitta stacking context ichida taqqoslanadi. Ota-element yangi context yaratgan bo'lsa, ichidagi qiymat tashqaridagi elementlarga ta'sir qilmaydi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Modal qatlami">
        <p>
          Sahifada qora yarim shaffof <code>.overlay</code> (butun ekran) va uning ustida{' '}
          <code>.modal</code> bo'lsin. z-index qiymatlari CSS o'zgaruvchilarida saqlansin.
        </p>
        <Solution>
          <CodeBlock lang="css">{`:root {
  --z-overlay: 100;
  --z-modal: 110;
}

.overlay {
  position: fixed;
  inset: 0;                       /* top/right/bottom/left: 0 */
  background: rgba(0, 0, 0, 0.5);
  z-index: var(--z-overlay);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 12px;
  z-index: var(--z-modal);
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>z-index</code> faqat bitta stacking context ichida taqqoslanadi.</li>
        <li><code>transform</code>, <code>opacity</code>, <code>filter</code>, <code>position: fixed</code> yangi context yaratadi.</li>
        <li><code>isolation: isolate</code> komponent ichini tashqi dunyodan ajratadi.</li>
        <li>z-index qiymatlarini kichik va nomli o'zgaruvchilarda saqlang.</li>
      </KeyPoints>
    </>
  )
}
