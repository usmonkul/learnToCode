import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Event handlerlar bilan ishlash',
  section: 'State va interaktivlik',
}

export default function EventHandlingLesson() {
  return (
    <>
      <p>
        Oldingi darsda <code>onClick</code>ni allaqachon ishlatgan edik, lekin uni yuzaki
        ko'rib o'tdik. Endi <strong>event handler (hodisa ushlagichi)</strong> — foydalanuvchi
        harakatiga (tugma bosish, matn kiritish, forma yuborish va h.k.) javob beradigan
        funksiyalarni — batafsilroq o'rganamiz. Interaktiv interfeys qurish uchun state qanday
        saqlashni bilish yetarli emas, uni <strong>qachon</strong> va <strong>qanday</strong>{' '}
        o'zgartirishni ham bilish kerak — bu aynan event handlerlar orqali amalga oshadi.
      </p>

      <h2>JSX'dagi hodisa propslari</h2>
      <p>
        React'da HTML elementlariga hodisa ushlagichini biriktirish uchun maxsus propslar
        ishlatiladi: <code>onClick</code>, <code>onChange</code>, <code>onSubmit</code>,{' '}
        <code>onMouseEnter</code> va boshqalar. Ular oddiy HTML atributlariga o'xshaydi (
        <code>onclick</code> kabi), lekin ikkita farqi bor: nomi{' '}
        <strong>camelCase</strong> ko'rinishida yoziladi, va qiymati sifatida matn emas, balki
        haqiqiy JavaScript funksiyasi beriladi:
      </p>
      <CodeBlock lang="jsx">{`function Salomlash() {
  function handleClick() {
    alert('Salom!')
  }

  return <button onClick={handleClick}>Bosing</button>
}`}</CodeBlock>
      <p>
        Bu yerda <code>handleClick</code> — <strong>event handler</strong> funksiyasi. Uning
        nomi ixtiyoriy bo'lsa-da, React kodida keng tarqalgan odat bor:{' '}
        <code>handle</code> so'zi bilan boshlab, keyin hodisa nomini qo'shish —{' '}
        <code>handleClick</code>, <code>handleChange</code>, <code>handleSubmit</code>. Bu
        odat kod o'qilishini osonlashtiradi: funksiya nomiga qarab, u qaysi hodisaga javob
        berishini darhol tushunish mumkin.
      </p>

      <h2>
        Funksiyani <em>uzatish</em>, funksiyani <em>chaqirish</em> emas
      </h2>
      <p>
        Bu — React'ni endi o'rganayotganlar ko'pincha xato qiladigan joy. <code>onClick</code>
        ga funksiyaning o'zini (referensini) berish kerak, uni chaqirib, natijasini emas:
      </p>
      <CodeBlock lang="jsx">{`// TO'G'RI: funksiyaning o'zi uzatiladi, u faqat bosilganda chaqiriladi
<button onClick={handleClick}>Bosing</button>

// XATO: handleClick() darhol, render paytida chaqiriladi!
<button onClick={handleClick()}>Bosing</button>`}</CodeBlock>
      <p>
        Ikkinchi variantda <code>handleClick()</code> qavslar bilan yozilgani uchun JSX bu
        ifodani darhol, komponent render qilinayotgan paytning o'zida bajaradi — tugma
        bosilishini kutmaydi. Natijada <code>onClick</code>ga <code>handleClick</code>{' '}
        funksiyasining o'zi emas, balki uning <strong>natijasi</strong> (odatda{' '}
        <code>undefined</code>) beriladi, va tugma bosilganda hech narsa sodir bo'lmaydi.
      </p>
      <Callout type="warning" title="Eng ko'p uchraydigan xato">
        Agar tugma bosilganda emas, sahifa yuklanishi bilanoq nimadir sodir bo'layotgan bo'lsa
        (masalan, <code>alert</code> darhol chiqsa) — birinchi tekshiring: hodisa propida
        qavs (<code>()</code>) yo'qmi? <code>onClick={'{handleClick()}'}</code> —{' '}
        <code>onClick={'{handleClick}'}</code>dan farqli, funksiyani darhol chaqiradi.
      </Callout>

      <h2>Handlerga argument uzatish</h2>
      <p>
        Ba'zan handlerga qo'shimcha ma'lumot (masalan, qaysi elementga tegishli ekanligini)
        uzatish kerak bo'ladi. Bunday holatda funksiyani to'g'ridan-to'g'ri emas, uni chaqirib
        yuboradigan <strong>arrow funksiya</strong> ichiga o'rab beramiz:
      </p>
      <CodeBlock lang="jsx">{`function KitobRoyxati() {
  function handleOchirish(id) {
    console.log("O'chirilmoqda:", id)
  }

  return (
    <div>
      <button onClick={() => handleOchirish(1)}>1-kitobni o'chirish</button>
      <button onClick={() => handleOchirish(2)}>2-kitobni o'chirish</button>
    </div>
  )
}`}</CodeBlock>
      <p>
        Bu yerda <code>{'() => handleOchirish(1)'}</code> — argumentsiz, o'zi hech narsa
        qabul qilmaydigan yangi kichik funksiya. React uni tugma bosilganda chaqiradi, u esa
        o'z navbatida <code>handleOchirish(1)</code>ni ishga tushiradi. Muhim farq shundaki, bu
        arrow funksiyaning o'zi render paytida hech narsa <strong>bajarmaydi</strong> — u faqat
        "keyinroq, bosilganda, shu ishni bajar" degan ko'rsatmani saqlab turadi. Aynan shu
        sababli <code>onClick={'{() => handleOchirish(1)}'}</code> — to'g'ri, lekin{' '}
        <code>onClick={'{handleOchirish(1)}'}</code> — yana o'sha darhol-chaqirilish xatosi.
      </p>

      <h2>Hodisa obyekti — <code>e</code></h2>
      <p>
        React har bir event handlerga avtomatik ravishda bitta argument — <strong>hodisa
        obyekti (event object)</strong>ni uzatadi. Odatda uni <code>e</code> yoki{' '}
        <code>event</code> deb nomlaydi. Bu obyekt hodisa haqida turli ma'lumotlarni o'z ichiga
        oladi: qaysi element ustida sodir bo'lgani, klaviaturada qaysi tugma bosilgani va h.k.:
      </p>
      <CodeBlock lang="jsx">{`function Input() {
  function handleChange(e) {
    console.log('Yozilgan matn:', e.target.value)
  }

  return <input onChange={handleChange} />
}`}</CodeBlock>
      <p>
        Bu yerda <code>e.target</code> — hodisa sodir bo'lgan haqiqiy DOM elementi (shu holatda{' '}
        <code>input</code>ning o'zi), <code>e.target.value</code> esa uning joriy matni. Bu
        naqsh — inputdagi matnni <code>onChange</code> orqali o'qish — keyingi darsda formalar
        va controlled input'larni o'rganishimizning asosini tashkil qiladi.
      </p>
      <Callout type="note" title="preventDefault() haqida qisqacha">
        Ba'zi hodisalarning "standart" brauzer xatti-harakati bor — masalan, forma yuborilganda
        (<code>onSubmit</code>) sahifa avtomatik qayta yuklanadi. Buni to'xtatish uchun{' '}
        <code>e.preventDefault()</code> chaqiriladi. Bu mavzuni keyingi darsda, formalar bilan
        ishlashda batafsil ko'rib chiqamiz — hozircha shuni bilish kifoya: <code>e</code>{' '}
        obyekti nafaqat ma'lumot o'qish, balki brauzerning standart xatti-harakatini boshqarish
        uchun ham ishlatiladi.
      </Callout>

      <Quiz
        question={`Quyidagi ikki yozuvdan qaysi biri XATO va nega: (A) "onClick={handleOchirish}" (B) "onClick={handleOchirish(id)}" (qavs bilan, argument bilan)?`}
        options={[
          "B xato, chunki handleOchirish(id) render paytida darhol chaqiriladi, tugma bosilishini kutmaydi",
          "A xato, chunki funksiyaga argument berilmagan",
          "Ikkalasi ham to'g'ri, farqi yo'q",
          "B xato, chunki JSX'da qavs bilan yozish sintaktik xatolik hisoblanadi",
        ]}
        correctIndex={0}
        explanation="handleOchirish(id) qavs bilan yozilgani uchun bu ifoda komponent render qilinayotganda darhol bajariladi, uning natijasi (odatda undefined) onClick'ga beriladi. Argument bilan handlerni bosilgandagina chaqirish uchun uni onClick={() => handleOchirish(id)} kabi arrow funksiya ichiga o'rab berish kerak."
      />

      <Exercise title="Mashq">
        <p>
          <code>KorsatishTugmasi</code> nomli komponent yozing. U <code>useState</code> orqali{' '}
          boolean state saqlasin (boshlang'ich qiymat <code>false</code>) — bu qo'shimcha
          matnning ko'rinish/yashirin holatini bildiradi. Tugma bosilganda{' '}
          <code>handleToggle</code> nomli funksiya chaqirilib, state teskarisiga o'zgarsin.
          Tugma matni holatga qarab <code>"Ko'rsatish"</code> yoki <code>"Yashirish"</code>{' '}
          bo'lsin, va state <code>true</code> bo'lganda tugma ostida{' '}
          <code>{'<p>Bu qo\'shimcha matn!</p>'}</code> chiqsin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useState } from 'react'

function KorsatishTugmasi() {
  const [korinadi, setKorinadi] = useState(false)

  function handleToggle() {
    setKorinadi(prev => !prev)
  }

  return (
    <div>
      <button onClick={handleToggle}>
        {korinadi ? 'Yashirish' : "Ko'rsatish"}
      </button>
      {korinadi && <p>Bu qo'shimcha matn!</p>}
    </div>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Hodisa propslari (<code>onClick</code>, <code>onChange</code>, <code>onSubmit</code>{' '}
          va h.k.) camelCase nomlanadi va qiymati sifatida funksiyaning o'zini kutadi.
        </li>
        <li>
          Handler nomlash odati — <code>handle</code> bilan boshlab, hodisa nomini qo'shish:{' '}
          <code>handleClick</code>, <code>handleChange</code>.
        </li>
        <li>
          <code>onClick={'{handleClick}'}</code> — funksiyani uzatadi (to'g'ri);{' '}
          <code>onClick={'{handleClick()}'}</code> — funksiyani darhol chaqiradi (keng tarqalgan
          xato).
        </li>
        <li>
          Handlerga argument uzatish uchun uni arrow funksiya ichiga o'rab bering:{' '}
          <code>{'onClick={() => handleClick(id)}'}</code>.
        </li>
        <li>
          Har bir event handler avtomatik ravishda hodisa obyekti <code>e</code>ni oladi;{' '}
          <code>e.target.value</code> orqali inputning joriy qiymatini o'qish mumkin.
        </li>
        <li>
          <code>e.preventDefault()</code> brauzerning standart xatti-harakatini (masalan, forma
          yuborilganda sahifa qayta yuklanishini) to'xtatadi — batafsili keyingi darsda.
        </li>
      </KeyPoints>
    </>
  )
}
