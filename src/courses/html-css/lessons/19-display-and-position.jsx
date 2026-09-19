import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Display va position",
  section: "CSS asoslari",
}

export default function DisplayAndPositionLesson() {
  return (
    <>
      <p>
        Elementlar sahifada qanday joylashishini ikki asosiy xossa belgilaydi:{' '}
        <code>display</code> (element qanday "turdagi" quti) va <code>position</code>{' '}
        (aniq joylashish usuli).
      </p>

      <h2>display</h2>
      <ul>
        <li>
          <code>block</code> — yangi qatordan boshlanadi, mavjud kenglikning hammasini oladi.{' '}
          <code>div</code>, <code>p</code>, <code>h1</code>, <code>section</code> shunday.
        </li>
        <li>
          <code>inline</code> — matn ichida oqadi, <code>width</code>/<code>height</code>{' '}
          qabul qilmaydi. <code>span</code>, <code>a</code>, <code>strong</code> shunday.
        </li>
        <li>
          <code>inline-block</code> — qatorda turadi, lekin o'lcham va vertikal
          margin/paddingni qabul qiladi.
        </li>
        <li><code>none</code> — element butunlay yo'qoladi (joy ham egallamaydi).</li>
        <li><code>flex</code>, <code>grid</code> — zamonaviy joylashtirish (keyingi dars).</li>
      </ul>
      <CodeBlock lang="css">{`a.tugma {
  display: inline-block;   /* havola tugmaga o'xshasin */
  padding: 10px 20px;
  background: teal;
  color: white;
}

.yashirin {
  display: none;
}`}</CodeBlock>

      <h2>position</h2>
      <ul>
        <li><code>static</code> — standart, oddiy oqim.</li>
        <li><code>relative</code> — o'z joyidan siljitish mumkin; ichidagi <code>absolute</code> elementlar uchun tayanch nuqta bo'ladi.</li>
        <li><code>absolute</code> — oddiy oqimdan chiqadi, eng yaqin <code>position</code>i bor ota-elementga nisbatan joylashadi.</li>
        <li><code>fixed</code> — ko'rinish oynasiga mahkamlanadi, aylantirganda ham joyida turadi.</li>
        <li><code>sticky</code> — aylantirilganda ma'lum joyga yetgach "yopishib" qoladi.</li>
      </ul>
      <CodeBlock lang="css">{`/* Rasm ustidagi belgi */
.rasm-quti {
  position: relative;
}
.rasm-quti .belgi {
  position: absolute;
  top: 8px;
  right: 8px;
}

/* Doim tepada turadigan menyu */
.menyu {
  position: sticky;
  top: 0;
  background: white;
}`}</CodeBlock>
      <Callout type="warning" title="absolute va ota-element">
        <code>absolute</code> element o'zidan yuqoridagi <code>position: relative</code>{' '}
        (yoki boshqa non-static) ota-elementni qidiradi. Topmasa, butun sahifaga nisbatan
        joylashadi. Odatda ota-elementga <code>position: relative</code> berishni unutmang.
      </Callout>

      <Quiz
        question="Aylantirilganda oynaning tepasida qotib turadigan menyu uchun qaysi qiymat mos?"
        options={["position: relative", "position: sticky", "display: inline", "position: static"]}
        correctIndex={1}
        explanation="sticky (yoki fixed) elementni aylantirish paytida joyida ushlab turadi. sticky oddiy oqimda joy egallaydi va belgilangan chegaraga yetgach yopishadi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Yopishqoq header">
        <p>
          <code>header</code>ni sahifa tepasiga yopishtiring (oq fon bilan) va{' '}
          <code>span.chegirma</code> belgisini <code>.mahsulot</code> kartochkasining yuqori
          o'ng burchagiga joylashtiring.
        </p>
        <Solution>
          <CodeBlock lang="css">{`header {
  position: sticky;
  top: 0;
  background: white;
}

.mahsulot {
  position: relative;
}

.mahsulot .chegirma {
  position: absolute;
  top: 8px;
  right: 8px;
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>block</code> — to'liq qator, <code>inline</code> — matn ichida, <code>inline-block</code> — qatorda, lekin o'lchamli.</li>
        <li><code>relative</code> ota-element + <code>absolute</code> farzand — belgi va badge'lar uchun klassik juftlik.</li>
        <li><code>fixed</code> oynaga, <code>sticky</code> aylantirish paytida yopishadi.</li>
        <li><code>display: none</code> elementni butunlay yashiradi.</li>
      </KeyPoints>
    </>
  )
}
