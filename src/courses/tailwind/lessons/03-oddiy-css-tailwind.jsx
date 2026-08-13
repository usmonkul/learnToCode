import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import { Target, BookOpen, Search, AlertTriangle, XCircle, Puzzle, Trophy, ClipboardList, CheckCircle, GraduationCap } from 'lucide-react'

export const meta = {
  title: 'Oddiy CSS\'dan Tailwind CSS\'ga',
  section: '3-Dars'
}

export default function CssToTailwind() {
  return (
    <>
      <h2 className="flex items-center gap-2"><Target className="text-indigo-500" /> Dars maqsadi</h2>
      <p>Bu darsda biz oddiy CSS xossalarining Tailwind CSS'dagi ekvivalentlarini va ulardan foydalanishni o'rganamiz.</p>

      <h2 className="flex items-center gap-2"><BookOpen className="text-indigo-500" /> Mavzu tushuntirishi va Kod misollari</h2>
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

      <h2 className="flex items-center gap-2"><Search className="text-indigo-500" /> Kod tahlili</h2>
      <p>Oddiy CSS va Tailwind o'rtasidagi asosiy farqlar:</p>
      <ul>
        <li>Qisqartmalar va tayyor o'lchamlar ishlatiladi (<code>p-4</code>, <code>m-2</code>).</li>
        <li>Barcha stillar HTML atributida yoziladi.</li>
      </ul>

      <h2 className="flex items-center gap-2"><AlertTriangle className="text-yellow-500" /> Eslatma</h2>
      <Callout type="note" title="Moslashuvchanlik">
        Tayyor o'lchamlar loyihangizda bir xillik va tartib saqlanishini ta'minlaydi.
      </Callout>

      <h2 className="flex items-center gap-2"><XCircle className="text-red-500" /> Ko‘p uchraydigan xatolar</h2>
      <ul>
        <li>Tailwind classlarini chalkashtirib yuborish.</li>
        <li>Notug'ri o'lcham qiymatlarini kiritish.</li>
      </ul>

      <h2 className="flex items-center gap-2"><Puzzle className="text-indigo-500" /> Kichik mashq</h2>
      <Exercise title="Mashq">
        <p>Margin 20px (m-5) va padding 16px (p-4) berilgan div yasang.</p>
        <Solution>
          <CodeBlock lang="html">{`<div class="m-5 p-4 bg-gray-100">Kontent</div>`}</CodeBlock>
        </Solution>
      </Exercise>

      <h2 className="flex items-center gap-2"><Trophy className="text-yellow-500" /> Mustaqil topshiriq</h2>
      <p>Oddiy CSS da yozgan kartangizni Tailwind CSS classlariga o'tkazing.</p>

      <h2 className="flex items-center gap-2"><ClipboardList className="text-indigo-500" /> Quiz</h2>
      <ol>
        <li>display: flex;</li>
        <li>justify-content: space-between;</li>
        <li>align-items: center;</li>
        <li>width: 100%;</li>
      </ol>
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

      <h2 className="flex items-center gap-2"><CheckCircle className="text-green-500" /> Quiz javoblari</h2>
      <p>1: B, 2: B, 3: B, 4: B, 5: B</p>

      <h2 className="flex items-center gap-2"><GraduationCap className="text-indigo-500" /> Nimani o‘rgandik?</h2>
      <KeyPoints>
        <li>Qariyb barcha eng mashhur CSS qoidalarining Tailwind tilidagi tarjimasini.</li>
        <li>O'lchamlar va margin/padding qanday mantiq bilan yozilishini.</li>
        <li>CSS dagi uzoq va zerikarli qoidalarni (masalan padding-left, padding-right) bitta qisqa qatorda (px-4) yozish mumkinligini.</li>
      </KeyPoints>
    </>
  )
}
