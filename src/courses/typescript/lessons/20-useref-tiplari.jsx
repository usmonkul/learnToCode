import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'useRef tiplari',
  section: 'TypeScript va React',
}

export default function UseRefTypesLesson() {
  return (
    <>
      <p>
        <code>useRef</code> React'da ikki mutlaqo boshqa vazifani bajaradi: DOM elementiga
        to'g'ridan-to'g'ri murojaat qilish (masalan, input'ga fokus berish) va qayta render
        talab qilmaydigan, renderlar orasida saqlanadigan oddiy "quti" (mutable qiymat)
        sifatida ishlash. TypeScript nuqtai nazaridan bu ikkalasi turlicha tiplashtiriladi va
        turlicha xavfsizlik talablariga ega — bu darsda ikkalasini ham ko'rib chiqamiz.
      </p>

      <h2>DOM elementiga ref: <code>useRef&lt;HTMLInputElement&gt;(null)</code></h2>
      <p>
        Bir DOM elementga (masalan, <code>&lt;input&gt;</code>ga) murojaat qilish uchun{' '}
        <code>useRef</code>ni element tipi bilan generic sifatida chaqirasiz, boshlang'ich
        qiymat sifatida esa doim <code>null</code> berasiz — chunki komponent birinchi marta
        render bo'lganda DOM elementi hali mavjud emas:
      </p>
      <CodeBlock lang="tsx">{`function FokusliInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleClick() {
    inputRef.current?.focus()
  }

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Fokus berish</button>
    </>
  )
}`}</CodeBlock>
      <p>
        Diqqat qiling: <code>inputRef.current</code>ning tipi <code>HTMLInputElement | null</code>{' '}
        bo'ladi, <code>HTMLInputElement</code>ning o'zi emas. Shuning uchun TypeScript{' '}
        <code>inputRef.current.focus()</code> deb yozishga ruxsat bermaydi — <code>current</code>{' '}
        hali <code>null</code> bo'lishi mumkinligini "bilib turadi". Yechim — optional chaining (
        <code>?.</code>) yoki oddiy shart orqali tekshirish:
      </p>
      <CodeBlock lang="tsx">{`function handleClick() {
  // Variant 1: optional chaining
  inputRef.current?.focus()

  // Variant 2: aniq shart
  if (inputRef.current) {
    inputRef.current.focus()
  }
}`}</CodeBlock>
      <Callout type="note" title="Nega current React tomonidan boshqariladi?">
        DOM ref uchun <code>ref={'{'}inputRef{'}'}</code> deb yozganingizda, <code>current</code>{' '}
        qiymatini React o'zi to'ldiradi: komponent DOM'ga qo'shilganda haqiqiy element bilan,
        DOM'dan olib tashlanganda esa yana <code>null</code> bilan. Siz bu maydonni o'zingiz
        qo'lda o'zgartirmaysiz — faqat o'qish (masalan, <code>.focus()</code>,{' '}
        <code>.value</code>) uchun ishlatasiz.
      </Callout>

      <h2>Oddiy mutable qiymat uchun ref: <code>useRef&lt;number&gt;(0)</code></h2>
      <p>
        <code>useRef</code>ning ikkinchi qo'llanilishi — DOM bilan umuman bog'liq bo'lmagan,
        lekin renderlar orasida saqlanishi kerak bo'lgan oddiy qiymat uchun. Masalan, bir
        komponent nechta marta render bo'lganini hisoblash uchun, yoki <code>setInterval</code>{' '}
        identifikatorini saqlash uchun:
      </p>
      <CodeBlock lang="tsx">{`function RenderSanogichi() {
  const renderSoni = useRef<number>(0)

  renderSoni.current += 1

  return <p>Bu komponent {renderSoni.current} marta render bo'ldi</p>
}`}</CodeBlock>
      <p>
        Bu yerda katta farq shunda: <code>renderSoni.current</code>ning boshlang'ich qiymati{' '}
        <code>null</code> emas, to'g'ridan-to'g'ri <code>0</code> — shuning uchun uning tipi
        oddiy <code>number</code>, <code>number | null</code> emas. Bunday ref'ning{' '}
        <code>current</code>ini istalgan vaqtda, istalgan qiymatga o'zgartirish mumkin — hech
        qanday <code>null</code> tekshiruvi kerak emas, chunki uni React emas, siz o'zingiz
        to'liq boshqarasiz.
      </p>
      <Callout type="tip" title="Ikki turdagi ref'ni farqlash">
        Agar boshlang'ich qiymat <code>null</code> bo'lib, keyinchalik uni bir DOM elementi
        egallashini kutayotgan bo'lsangiz — bu DOM ref (<code>current</code>ni React
        to'ldiradi, sizga faqat o'qish qoladi va <code>null</code> tekshiruvi shart). Agar
        boshlang'ich qiymat haqiqiy, tayyor qiymat (<code>0</code>, <code>""</code>, bo'sh
        massiv) bo'lsa — bu oddiy mutable ref (<code>current</code>ini siz o'zingiz erkin
        o'zgartirasiz, <code>null</code> tekshiruvi kerak emas).
      </Callout>

      <Quiz
        question="useRef<HTMLInputElement>(null) orqali olingan ref'ning current maydonidan foydalanishdan oldin nega null tekshiruvi (yoki optional chaining) kerak?"
        options={[
          "Chunki TypeScript har doim barcha obyekt maydonlarini null deb hisoblaydi",
          "Chunki current boshlang'ich qiymati null va DOM element mavjud bo'lgunga qadar shunday bo'lib qoladi — TS buni current tipida (T | null) aks ettiradi",
          "Chunki useRef umuman DOM bilan ishlay olmaydi",
          "Chunki null tekshiruvi faqat useState uchun kerak, useRef uchun emas",
        ]}
        correctIndex={1}
        explanation="useRef<HTMLInputElement>(null) chaqirilganda current maydonining tipi HTMLInputElement | null bo'ladi, chunki komponent birinchi render bo'lganda DOM elementi hali yaratilmagan. TS buni bilib, current'ni to'g'ridan-to'g'ri ishlatishga ruxsat bermaydi — optional chaining yoki shart orqali tekshirish kerak."
      />

      <Exercise title="Mashq">
        <p>
          <code>AvtoFokusInput</code> nomli komponent yozing: u <code>useRef&lt;HTMLInputElement&gt;(null)</code>{' '}
          orqali ref yaratsin va <code>useEffect</code> ichida komponent birinchi marta
          render bo'lganda input'ga avtomatik fokus bersin (null tekshiruvini unutmang).
          Shu bilan bir qatorda, komponent nechta marta qayta render bo'lganini hisoblaydigan{' '}
          <code>useRef&lt;number&gt;(0)</code> asosidagi hisoblagichni ham qo'shing.
        </p>
        <Solution>
          <CodeBlock lang="tsx">{`import { useEffect, useRef } from "react"

function AvtoFokusInput() {
  const inputRef = useRef<HTMLInputElement>(null)
  const renderSoni = useRef<number>(0)

  renderSoni.current += 1

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Avtomatik fokus" />
      <p>Render soni: {renderSoni.current}</p>
    </div>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          DOM elementiga ref — <code>useRef&lt;HTMLInputElement&gt;(null)</code>: boshlang'ich
          qiymat doim <code>null</code>, <code>current</code>ning tipi{' '}
          <code>T | null</code> bo'ladi, ishlatishdan oldin optional chaining yoki shart orqali
          tekshirish kerak.
        </li>
        <li>
          DOM ref'ning <code>current</code>ini React o'zi to'ldiradi va tozalaydi — siz uni
          faqat o'qiysiz, qo'lda yozmaysiz.
        </li>
        <li>
          Oddiy mutable qiymat uchun ref — <code>useRef&lt;number&gt;(0)</code> kabi haqiqiy
          boshlang'ich qiymat bilan: <code>current</code>ni siz o'zingiz erkin o'zgartirasiz,{' '}
          <code>null</code> tekshiruvi shart emas.
        </li>
      </KeyPoints>
    </>
  )
}
