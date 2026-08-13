import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import { FaBullseye, FaBook, FaLaptopCode, FaSearch, FaExclamationTriangle, FaTimesCircle, FaPuzzlePiece, FaTrophy, FaClipboardList, FaCheckCircle, FaGraduationCap } from 'react-icons/fa'

export const meta = {
  title: 'Oddiy CSS\'dan Tailwind CSS\'ga',
  section: '3-Dars'
}

export default function CssToTailwind() {
  return (
    <>
      <h2 className="flex items-center gap-2"><FaBullseye className="text-indigo-500" /> Dars maqsadi</h2>
      <p>Bu darsning asosiy maqsadi — siz avvaldan bilgan va yozgan oddiy CSS kodlarini qanday qilib Tailwind CSS classlariga to'g'ri va tez o'girishni o'rganishdir.</p>

      <h2 className="flex items-center gap-2"><FaBook className="text-indigo-500" /> Mavzu tushuntirishi va Kod misollari</h2>
      <p>Keling, har bir CSS xususiyatini birma-bir ko'rib chiqamiz.</p>

      <h3>1. Display (Ko'rinish turi)</h3>
      <p>Elementning ekranda qanday joy egallashini belgilaydi.</p>
      <ul>
        <li><code>display: block;</code> &rarr; <code>block</code></li>
        <li><code>display: flex;</code> &rarr; <code>flex</code></li>
        <li><code>display: grid;</code> &rarr; <code>grid</code></li>
        <li><code>display: none;</code> &rarr; <code>hidden</code></li>
      </ul>
      <p><strong>Qachon ishlatiladi?</strong> Elementni yashirish uchun (hidden) yoki ichidagi narsalarni yonma-yon qilish uchun (flex, grid).</p>

      <h3>2. Position (Joylashuv turi)</h3>
      <p>Elementni erkin siljitish uchun.</p>
      <ul>
        <li><code>position: relative;</code> &rarr; <code>relative</code></li>
        <li><code>position: absolute;</code> &rarr; <code>absolute</code></li>
        <li><code>position: fixed;</code> &rarr; <code>fixed</code></li>
      </ul>

      <h3>3. Margin (Tashqi bo'shliq)</h3>
      <p>Elementning tashqarisidan ochiladigan masofa (m = margin).</p>
      <ul>
        <li><code>margin: 16px;</code> &rarr; <code>m-4</code></li>
        <li><code>margin-top: 16px;</code> &rarr; <code>mt-4</code></li>
        <li><code>margin-bottom: 16px;</code> &rarr; <code>mb-4</code></li>
        <li><code>margin-left: 16px;</code> &rarr; <code>ml-4</code></li>
        <li><code>margin-right: 16px;</code> &rarr; <code>mr-4</code></li>
      </ul>

      <h3>4. Padding (Ichki bo'shliq)</h3>
      <p>Element devori bilan uning ichidagi kontent orasidagi masofa (p = padding).</p>
      <ul>
        <li><code>padding: 16px;</code> &rarr; <code>p-4</code></li>
        <li><code>padding-top: 16px;</code> &rarr; <code>pt-4</code></li>
        <li><code>padding-bottom: 16px;</code> &rarr; <code>pb-4</code></li>
        <li><code>padding-left: 16px; padding-right: 16px;</code> &rarr; <code>px-4</code> (x o'qi, chap+o'ng)</li>
        <li><code>padding-top: 16px; padding-bottom: 16px;</code> &rarr; <code>py-4</code> (y o'qi, tepa+past)</li>
      </ul>

      <h3>5. Gap (Oraliq masofa)</h3>
      <p>Faqat flex va grid ichidagi elementlar orasidagi masofa.</p>
      <ul>
        <li><code>gap: 16px;</code> &rarr; <code>gap-4</code></li>
      </ul>

      <h3>6. Width va Height (Kenglik va Balandlik)</h3>
      <ul>
        <li><code>width: 100%;</code> &rarr; <code>w-full</code></li>
        <li><code>height: 100vh;</code> &rarr; <code>h-screen</code></li>
      </ul>

      <h3>7. Text (Matn xususiyatlari)</h3>
      <ul>
        <li><code>font-size: 16px;</code> &rarr; <code>text-base</code></li>
        <li><code>font-weight: 700;</code> &rarr; <code>font-bold</code></li>
        <li><code>text-align: center;</code> &rarr; <code>text-center</code></li>
        <li><code>color: red;</code> &rarr; <code>text-red-500</code></li>
      </ul>

      <h3>8. Background (Orqa fon)</h3>
      <ul>
        <li><code>background-color: blue;</code> &rarr; <code>bg-blue-500</code></li>
      </ul>

      <h3>9. Border (Chegara) va Border Radius (Burchaklarni yumaloqlash)</h3>
      <ul>
        <li><code>border: 1px solid ...;</code> &rarr; <code>border</code></li>
        <li><code>border-radius: 8px;</code> &rarr; <code>rounded-lg</code></li>
      </ul>

      <h3>10. Shadow (Soya)</h3>
      <ul>
        <li><code>box-shadow: 0 4px 6px ...;</code> &rarr; <code>shadow-md</code></li>
      </ul>

      <h3>11. Flexbox</h3>
      <ul>
        <li><code>justify-content: center;</code> &rarr; <code>justify-center</code></li>
        <li><code>align-items: center;</code> &rarr; <code>items-center</code></li>
        <li><code>flex-direction: row;</code> &rarr; <code>flex-row</code> (standart)</li>
        <li><code>flex-direction: column;</code> &rarr; <code>flex-col</code></li>
      </ul>

      <h3>12. Grid</h3>
      <ul>
        <li><code>grid-template-columns: repeat(3, 1fr);</code> &rarr; <code>grid-cols-3</code></li>
      </ul>

      <h2 className="flex items-center gap-2"><FaSearch className="text-indigo-500" /> Kod tahlili</h2>
      <p>Biz nima uchun aynan bu raqamlarni yozyapmiz? Chunki Tailwind'ning asosiy dizayn tizimi juda tartibli. Bitta rangning (masalan ko'kning) 10 ga yaqin xili bor. Raqam qancha kichik bo'lsa (masalan <code>bg-blue-100</code>) shuncha och rang, raqam katta bo'lsa (900) shuncha to'q. O'lchamlarda (margin, padding, gap) esa asosan 1 birlik = 4px formulasi ishlaydi.</p>

      <h2 className="flex items-center gap-2"><FaExclamationTriangle className="text-yellow-500" /> Eslatma</h2>
      <Callout type="warning" title="E'tibor bering">
        <code>display: none</code> uchun <code>none</code> degan class ishlatilmaydi, uning o'rniga HTML'dagi ma'nosi (yashirin) ga asoslanib <code>hidden</code> so'zi ishlatiladi. Xuddi shunday chap va o'ng uchun (left, right) bitta <code>x</code>, tepa va past uchun <code>y</code> xarflari kiritilgan (<code>px</code>, <code>py</code>, <code>mx</code>, <code>my</code>).
      </Callout>

      <h2 className="flex items-center gap-2"><FaTimesCircle className="text-red-500" /> Ko‘p uchraydigan xatolar</h2>
      <ul>
        <li><strong>justify va items adashtirilishi:</strong> <code>justify-center</code> matnni (text-align kabi) emas, flexbox ichidagi elementni (kenglik bo'ylab) markazlashtiradi.</li>
        <li><strong>Ranglarda daraja yozmaslik:</strong> <code>text-red</code> deb yozish xato, har doim darajasi (masalan 500) yozilishi shart: <code>text-red-500</code>.</li>
      </ul>

      <h2 className="flex items-center gap-2"><FaPuzzlePiece className="text-indigo-500" /> Kichik mashq</h2>
      <Exercise title="2-mashq: Matn xususiyatlarini yig'ing">
        <p>Matn rangi oq, matn markazlashtirilgan, harflari qalin va razmeri o'rtacha (base) bo'lgan classlarni yozing.</p>
        <Solution>
          <CodeBlock lang="html">{`class="text-white text-center font-bold text-base"`}</CodeBlock>
        </Solution>
      </Exercise>

      <h2 className="flex items-center gap-2"><FaTrophy className="text-yellow-500" /> Mustaqil topshiriq</h2>
      <p>Quyidagi 15 ta oddiy CSS kodini qog'ozga yozib, yoniga Tailwind classini yozing. Keyin internetdan tekshirib ko'ring.</p>
      <ol>
        <li>display: flex;</li>
        <li>justify-content: space-between;</li>
        <li>align-items: center;</li>
        <li>width: 100%;</li>
        <li>padding-left: 16px; padding-right: 16px;</li>
        <li>padding-top: 8px; padding-bottom: 8px;</li>
        <li>background-color: black;</li>
        <li>color: white;</li>
        <li>border-radius: 4px;</li>
        <li>margin-top: 32px;</li>
        <li>display: none;</li>
        <li>font-weight: 600; (yarim qalin)</li>
        <li>box-shadow: 0 1px 3px ...; (kichik soya)</li>
        <li>gap: 24px;</li>
        <li>height: 100vh;</li>
      </ol>

      <h2 className="flex items-center gap-2"><FaClipboardList className="text-indigo-500" /> Quiz</h2>
      <Quiz questions={[
        {
          question: "Chap va o'ng tomondan 16px padding berish uchun eng qisqa class qaysi?",
          options: [
            "pl-4 pr-4",
            "p-left-right-4",
            "px-4",
            "padding-x-16"
          ],
          correctIndex: 2,
          explanation: "X o'qi gorizontal chiziqni anglatadi (chap va o'ng). Shuning uchun px (padding x-axis) ishlatiladi."
        },
        {
          question: "display: none; ning Tailwind ekvivalenti nima?",
          options: [
            "none",
            "display-none",
            "hidden",
            "invisible"
          ],
          correctIndex: 2,
          explanation: "Elementni DOM dan yashirish uchun hidden classidan foydalaniladi (invisible esa opacity: 0; ga teng)."
        },
        {
          question: "Elementni butun ekran bo'yi (height: 100vh;) cho'zish class'i qaysi?",
          options: [
            "h-full",
            "h-100",
            "h-screen",
            "height-max"
          ],
          correctIndex: 2,
          explanation: "h-full bu height: 100%, h-screen esa height: 100vh (viewport height) ya'ni butun ekranni to'ldirish."
        },
        {
          question: "Matnni qalinlash (font-weight: 700) class'i nima?",
          options: [
            "text-bold",
            "font-700",
            "font-bold",
            "text-weight-bold"
          ],
          correctIndex: 2,
          explanation: "Tailwind'da font xususiyatlari (shrift turi, qalinligi) 'font-' prefiksi bilan boshlanadi."
        },
        {
          question: "Tepadan 32px joy (margin) tashlash class'ini toping.",
          options: [
            "mt-32",
            "margin-t-8",
            "mt-8",
            "m-top-32"
          ],
          correctIndex: 2,
          explanation: "margin (m), top (t). 32 ni 4 ga bo'lsak 8 bo'ladi. Demak: mt-8."
        }
      ]} />

      <h2 className="flex items-center gap-2"><FaCheckCircle className="text-green-500" /> Quiz javoblari</h2>
      <p>Agarda o'lchamlarda adashayotgan bo'lsangiz, hammasini 4 raqami atrofida hisoblashni unutmang. 1 = 4px, 2 = 8px, 4 = 16px, 8 = 32px va hk.</p>

      <h2 className="flex items-center gap-2"><FaGraduationCap className="text-indigo-500" /> Nimani o‘rgandik?</h2>
      <KeyPoints>
        <li>Qariyb barcha eng mashhur CSS qoidalarining Tailwind tilidagi tarjimasini.</li>
        <li>O'lchamlar va margin/padding qanday mantiq bilan yozilishini.</li>
        <li>CSS dagi uzoq va zerikarli qoidalarni (masalan padding-left, padding-right) bitta qisqa qatorda (px-4) yozish mumkinligini.</li>
      </KeyPoints>
    </>
  )
}
