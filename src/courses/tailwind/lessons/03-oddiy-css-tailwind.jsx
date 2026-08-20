import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Oddiy CSS va Tailwind taqqosi',
  section: '3-Dars',
}

export default function OddiyCssTailwind() {
  return (
    <>
      <h2>Oddiy CSS xususiyatlari Tailwind'da qanday yoziladi?</h2>
      <p>
        Tailwind CSS utility-first yondashuvidan foydalangani uchun har bir odatiy CSS qoidasining o'ziga mos qisqa va qulay klassi mavjud.
      </p>

      <h2>1. Ranglar (Colors)</h2>
      <p>
        Matn, orqa fon va hoshiya ranglari uchun maxsus prefikslar ishlatiladi:
      </p>
      <ul>
        <li><code>color: #ef4444;</code> &rarr; <code>text-red-500</code></li>
        <li><code>background-color: #3b82f6;</code> &rarr; <code>bg-blue-500</code></li>
        <li><code>border-color: #10b981;</code> &rarr; <code>border-emerald-500</code></li>
      </ul>

      <h2>2. Bo'shliqlar (Spacing: Padding va Margin)</h2>
      <p>
        Tailwind'da 1 birlik o'lcham <strong>4px</strong> ga teng (masalan, <code>4</code> = 16px, <code>6</code> = 24px, <code>8</code> = 32px):
      </p>
      <ul>
        <li><code>padding: 16px;</code> &rarr; <code>p-4</code></li>
        <li><code>padding-left: 24px; padding-right: 24px;</code> &rarr; <code>px-6</code></li>
        <li><code>margin-top: 8px; margin-bottom: 8px;</code> &rarr; <code>my-2</code></li>
        <li><code>margin: 0 auto;</code> &rarr; <code>mx-auto</code></li>
      </ul>

      <h2>3. Tipografiya (Typography)</h2>
      <p>
        Matn o'lchami va qalinligini boshqarish:
      </p>
      <ul>
        <li><code>font-size: 14px;</code> &rarr; <code>text-sm</code></li>
        <li><code>font-size: 24px;</code> &rarr; <code>text-2xl</code></li>
        <li><code>font-weight: 700;</code> &rarr; <code>font-bold</code></li>
        <li><code>text-align: center;</code> &rarr; <code>text-center</code></li>
      </ul>

      <h2>4. Flexbox va Joylashuv (Layout)</h2>
      <p>
        Elementlarni yonma-yon yoki ustma-ust tartiblash:
      </p>
      <CodeBlock lang="html">{`<div class="flex items-center justify-between gap-4">
  <span>Chap tomon</span>
  <span>O'ng tomon</span>
</div>`}</CodeBlock>

      <Callout type="tip" title="Burchaklarni yumaloqlash">
        To'liq aylana qilish uchun <code>rounded-full</code>, o'rtacha yumaloqlash uchun <code>rounded-lg</code> yoki <code>rounded-xl</code> klasslaridan foydalaning.
      </Callout>

      <Quiz
        question="Elementning yuqori va pastki tomoniga 16px (y-o'qi bo'ylab) ichki bo'shliq (padding) berish uchun qaysi class ishlatiladi?"
        options={[
          'px-4',
          'py-4',
          'pt-16',
          'pad-y-16',
        ]}
        correctIndex={1}
        explanation="py-4 y-o'qi (yuqori va past) bo'yicha 4 birlik (4 * 4px = 16px) ichki bo'shliq beradi."
      />

      <Exercise title="Mashq: Profil kartochkasi qatori">
        <p>
          Rasm va ismni yonma-yon (flex), vertikal markazda (items-center) va orasi 12px (gap-3) bo'lgan qator ko'rinishida yozing.
        </p>
        <Solution>
          <CodeBlock lang="html">{`<div class="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
  <div class="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
    U
  </div>
  <div>
    <h4 class="font-semibold text-gray-900">Usmon</h4>
    <p class="text-sm text-gray-500">Dasturchi</p>
  </div>
</div>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>text-*</code> matn rangini, <code>bg-*</code> fon rangini belgilaydi.
        </li>
        <li>
          <code>p-*</code> va <code>m-*</code> ichki va tashqi bo'shliqlar (1 birlik = 4px).
        </li>
        <li>
          <code>flex</code>, <code>items-center</code>, <code>justify-between</code> yordamida tezkor tartib yaratiladi.
        </li>
      </KeyPoints>
    </>
  )
}
