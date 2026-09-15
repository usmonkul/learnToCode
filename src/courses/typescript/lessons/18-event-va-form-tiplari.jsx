import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Event va forma tiplari',
  section: 'TypeScript va React',
}

export default function EventFormTypesLesson() {
  return (
    <>
      <p>
        React kursida <code>onClick</code>, <code>onChange</code>, <code>onSubmit</code> kabi
        event handler'larni allaqachon ishlatgansiz. TypeScript bilan ishlaganda, bu handler'lar
        qabul qiladigan <code>event</code> obyekti ham o'z tipiga ega bo'ladi — bu tip sizga event
        ichidagi qanday maydonlar (masalan, <code>event.target.value</code>) borligini oldindan
        aytib beradi.
      </p>

      <h2>Asosiy event tiplari</h2>
      <p>
        React har bir DOM hodisasi uchun o'z tipini beradi, va bu tiplar odatda{' '}
        <strong>qaysi HTML elementda</strong> sodir bo'lishini ham generic parametr sifatida
        oladi. Eng ko'p uchraydigan uchtasi:
      </p>
      <CodeBlock lang="tsx">{`function TugmaKomponenti() {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    console.log('Bosildi:', event.currentTarget)
  }

  return <button onClick={handleClick}>Bosish</button>
}`}</CodeBlock>
      <CodeBlock lang="tsx">{`function InputKomponenti() {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('Yangi qiymat:', event.target.value)
  }

  return <input onChange={handleChange} />
}`}</CodeBlock>
      <CodeBlock lang="tsx">{`function FormaKomponenti() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault() // sahifani qayta yuklashning oldini oladi
    console.log('Forma yuborildi')
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Yuborish</button>
    </form>
  )
}`}</CodeBlock>
      <p>
        Generic parametr (<code>&lt;HTMLButtonElement&gt;</code>,{' '}
        <code>&lt;HTMLInputElement&gt;</code>, <code>&lt;HTMLFormElement&gt;</code>) event qaysi
        elementga bog'langanini bildiradi — shu tufayli <code>event.target</code> yoki{' '}
        <code>event.currentTarget</code> o'sha elementga xos maydonlarga (masalan, input uchun{' '}
        <code>.value</code>) ega bo'ladi, va TypeScript ularni tanib oladi.
      </p>

      <Callout type="note" title="target vs currentTarget">
        <code>event.currentTarget</code> — handler biriktirilgan elementning o'zi (masalan,{' '}
        <code>&lt;button&gt;</code>), tipi generic parametr bilan aniq mos keladi.{' '}
        <code>event.target</code> esa hodisa haqiqatda qayerdan boshlanganini bildiradi (masalan,
        tugma ichidagi ikonka) — u ba'zan kutilganidan kengroq tipda bo'lishi mumkin. Oddiy
        holatlarda ikkalasi ham deyarli bir xil ishlaydi, lekin farqni bilish foydali.
      </Callout>

      <h2>Inline handler'da tip yozish shart emas</h2>
      <p>
        Agar handler funksiya to'g'ridan-to'g'ri JSX ichida, inline arrow-funksiya sifatida
        yozilsa, TypeScript event tipini <strong>kontekstdan o'zi biladi</strong> — chunki u{' '}
        <code>onClick</code>, <code>onChange</code> kabi propning kutilgan tipidan xulosa
        chiqaradi. Bunday holatda parametr tipini qo'lda yozish ortiqcha:
      </p>
      <CodeBlock lang="tsx">{`function InputKomponenti() {
  return (
    <input
      onChange={(event) => {
        // event avtomatik ravishda React.ChangeEvent<HTMLInputElement> deb tanilgan
        console.log(event.target.value)
      }}
    />
  )
}`}</CodeBlock>

      <h2>Alohida funksiyaga chiqarilganda tip zarur</h2>
      <p>
        Lekin handler alohida, komponent tanasida (yoki undan tashqarida) e'lon qilingan funksiya
        sifatida yozilsa, TypeScript uni qaysi elementga bog'lanishini oldindan bila olmaydi —
        shuning uchun bunday holatda parametr tipini <strong>qo'lda yozish shart</strong>:
      </p>
      <CodeBlock lang="tsx">{`function InputKomponenti() {
  // Alohida funksiya — tipni yozmasak, TypeScript "implicit any" deb xato beradi
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value)
  }

  return <input onChange={handleChange} />
}`}</CodeBlock>
      <p>
        Agar bu yerda <code>event</code> parametrining tipini yozmasangiz, avvalgi darsda
        ko'rgan <code>noImplicitAny</code> qoidasi ishga tushib, kompilyator xato beradi — chunki
        alohida funksiya JSX propidan tashqarida turadi va TypeScript uning qanday elementga
        ulanishini bila olmaydi.
      </p>

      <Quiz
        question="Nega alohida (komponent tanasida e'lon qilingan) event handler funksiyasida event parametrining tipini qo'lda yozish kerak, lekin inline arrow-funksiyada kerak emas?"
        options={[
          "Alohida funksiyalar umuman event obyektini qabul qila olmaydi",
          "Inline arrow-funksiyada TypeScript tipni onClick/onChange kabi propning kutilgan tipidan xulosa qiladi, alohida funksiyada esa bunday bog'lanish yo'q",
          "React alohida funksiyalarga boshqacha event obyekti yuboradi",
          "Bu shunchaki uslub (style) masalasi, ikkalasi ham texnik jihatdan bir xil",
        ]}
        correctIndex={1}
        explanation="JSX propiga (masalan, onChange={handler}) to'g'ridan-to'g'ri berilgan inline funksiya uchun TypeScript propning kutilgan tipidan (masalan, ChangeEventHandler<HTMLInputElement>) event tipini kontekstual xulosa qiladi. Alohida e'lon qilingan funksiya esa bu kontekstdan tashqarida turadi, shuning uchun event tipini aniq yozish kerak bo'ladi."
      />

      <Exercise title="Mashq">
        <p>
          Qidiruv input maydoni uchun <code>QidiruvInputi</code> komponentini yozing. U ichida
          alohida <code>handleChange</code> nomli funksiya e'lon qilsin (input qiymatini{' '}
          <code>console.log</code> qiling) va uni <code>input</code> elementining{' '}
          <code>onChange</code> propiga bog'lang. Handler parametriga to'g'ri tipni yozing.
        </p>
        <Solution>
          <CodeBlock lang="tsx">{`function QidiruvInputi() {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value)
  }

  return <input type="text" onChange={handleChange} placeholder="Qidirish..." />
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          React har bir DOM hodisasi uchun o'z tipini beradi:{' '}
          <code>React.MouseEvent&lt;HTMLButtonElement&gt;</code>,{' '}
          <code>React.ChangeEvent&lt;HTMLInputElement&gt;</code>,{' '}
          <code>React.FormEvent&lt;HTMLFormElement&gt;</code> — eng ko'p uchraydigan uchtasi.
        </li>
        <li>
          Generic parametr event qaysi HTML elementga bog'langanini bildiradi, shu orqali{' '}
          <code>event.target</code>/<code>event.currentTarget</code> to'g'ri maydonlarga ega
          bo'ladi.
        </li>
        <li>
          Inline arrow-funksiya handler'da event tipini yozish shart emas — TypeScript uni
          propning kutilgan tipidan o'zi xulosa qiladi.
        </li>
        <li>
          Handler alohida funksiya sifatida chiqarilganda, event parametrining tipini qo'lda
          yozish kerak — aks holda <code>noImplicitAny</code> xatosi chiqadi.
        </li>
      </KeyPoints>
    </>
  )
}
