import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import Figure from '@/components/content/Figure'
import effectLifecycle from '@/assets/effect-lifecycle.svg'

export const meta = {
  title: "Effect'ni tozalash (cleanup)",
  section: 'Ref va effektlar',
}

export default function UseEffectCleanupFetchingLesson() {
  return (
    <>
      <h2>Muammo: soat tobora tezlashadi</h2>
      <p>
        Sahifada soniyalarni sanaydigan taymer bor. Uning qadamini (1 yoki 5) sozlamada
        tanlash mumkin, shuning uchun <code>qadam</code> effect'ning dependency'si. Taymer{' '}
        <code>useEffect</code> ichida <code>setInterval</code> bilan ishlaydi:
      </p>
      <CodeBlock lang="jsx">{`function Taymer({ qadam }) {
  const [soni, setSoni] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setSoni((s) => s + qadam)
    }, 1000)
  }, [qadam])

  return <p>{soni}</p>
}`}</CodeBlock>
      <p>
        Dasturlash rejimida taymer birinchi soniyadanoq har sekundda ikki qadam tashlaydi.
        Qadamni 1 dan 5 ga, keyin yana 1 ga o'zgartiring — har sekundda sanoq 2 + 5 + 1 ga
        oshib boradi. Har safar effect qayta ishlaganda yangi interval yaratiladi, eskilari esa
        hech qachon to'xtatilmaydi — intervallar to'planib boradi. Komponent sahifadan olib
        tashlansa ham, ular fonda behuda ishlashda davom etadi.
      </p>
      <p>
        26-darsda effect'ni "sinxronlash" deb atadik. Sinxronlashning ikki tomoni bor:{' '}
        <strong>boshlash</strong> (ulanish, taymer yoqish, tinglovchi qo'shish) va{' '}
        <strong>to'xtatish</strong>. Biz faqat birinchisini yozdik.
      </p>

      <h2>Cleanup funksiyasi nima?</h2>
      <p>
        Effekt funksiyasi ixtiyoriy ravishda o'zi <strong>funksiya qaytarishi</strong> mumkin —
        aynan shu qaytarilgan funksiya cleanup (tozalash) funksiyasi deb ataladi. React uni
        ikkita holatda avtomatik chaqiradi: (1) effekt qayta ishga tushishidan{' '}
        <strong>oldin</strong> — eski effekt natijasini tozalash uchun, va (2) komponent
        ekrandan butunlay olib tashlanganda (unmount bo'lganda) — oxirgi marta tozalash uchun:
      </p>
      <CodeBlock lang="jsx">{`useEffect(() => {
  // effekt kodi

  return () => {
    // cleanup — effekt qayta ishga tushishidan oldin yoki unmount paytida chaqiriladi
  }
}, [bogliqliklar])`}</CodeBlock>
      <p>
        Ketma-ketlikni aniq tasavvur qiling: komponent birinchi render bo'lganda — effekt ishga
        tushadi (cleanup hali chaqirilmaydi, chunki hali eski natija yo'q). Dependency
        o'zgargani sababli effekt qayta ishga tushishi kerak bo'lganda — avval{' '}
        <strong>oldingi</strong> effektning cleanup'i chaqiriladi, so'ng yangi effekt ishga
        tushadi. Komponent butunlay olib tashlanganda — oxirgi effektning cleanup'i chaqiriladi.
      </p>
      <Figure
        src={effectLifecycle}
        alt="Vaqt chizig'i: effect 'osh' xonasiga ulanadi; roomId o'zgarganda avval cleanup 'osh'dan uziladi, keyin effect 'manti'ga ulanadi; komponent olib tashlanganda cleanup 'manti'dan uziladi."
        caption="1-rasm: har bir effect ishga tushishining o'z cleanup'i bor"
      />

      <h2>
        Misol: <code>setInterval</code> va tozalashning zarurligi
      </h2>
      <p>
        Taymer — cleanup nima uchun kerakligini eng aniq ko'rsatadigan misol. Har soniyada
        sanoqni oshiradigan komponentni ko'raylik:
      </p>
      <CodeBlock lang="jsx">{`import { useState, useEffect } from 'react'

function Soniyalar() {
  const [soni, setSoni] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setSoni((oldingi) => oldingi + 1)
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [])

  return <p>O'tgan vaqt: {soni} soniya</p>
}`}</CodeBlock>
      <p>
        Dependency array bo'sh bo'lgani uchun bu effekt faqat bir marta, mount paytida ishga
        tushadi va bitta interval yaratadi. Cleanup funksiyasi — <code>clearInterval(id)</code> —
        komponent unmount bo'lganda shu intervalni to'xtatadi. Agar cleanup yozilmasa, komponent
        ekrandan olib tashlansa ham interval xotirada ishlab qolaveradi — bu{' '}
        <strong>xotira sizib chiqishi</strong> (memory leak) deb ataladi.
      </p>
      <p>
        Muammo yanada jiddiyroq bo'ladi, agar dependency array bo'sh bo'lmay, effekt qayta-qayta
        ishga tushadigan bo'lsa. Masalan, effekt ichida <code>soni</code> array'ga qo'shilgan
        deb tasavvur qiling — har safar <code>soni</code> o'zgarganda effekt qayta ishlaydi va,
        cleanup bo'lmasa, <strong>yangi interval eskisining ustiga qo'shiladi</strong> — natijada
        bir nechta interval bir vaqtda ishlab, sanoq tezlashib ketadi. Cleanup aynan shu holatni
        oldini oladi: har safar effekt qayta ishga tushishidan oldin, eski interval to'xtatiladi.
      </p>

      <Callout type="warning" title="Cleanup'siz effekt = to'planib boruvchi nusxalar">
        Har qanday effekt tashqi resurs bilan "obuna bo'lsa" — <code>setInterval</code>,{' '}
        <code>setTimeout</code>, <code>addEventListener</code>, WebSocket ulanishi — deyarli
        har doim cleanup talab qiladi. Qoida shunday: agar effekt biror narsani{' '}
        <em>boshlagan</em> yoki <em>qo'shgan</em> bo'lsa (taymer, tinglovchi, obuna), cleanup uni{' '}
        <em>to'xtatishi</em> yoki <em>olib tashlashi</em> kerak. Aks holda, komponent qayta
        render bo'lgan yoki unmount bo'lgan sayin, eski nusxalar to'planib boraveradi.
      </Callout>

      <h2>Hodisa tinglovchisi bilan misol</h2>
      <p>
        Xuddi shu naqsh brauzer hodisalarini tinglashda ham qo'llaniladi — masalan, oyna
        o'lchamini kuzatish:
      </p>
      <CodeBlock lang="jsx">{`useEffect(() => {
  function handleResize() {
    console.log('Oyna kengligi:', window.innerWidth)
  }

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])`}</CodeBlock>
      <p>
        <code>addEventListener</code> va <code>removeEventListener</code>ga aynan bir xil
        funksiya (<code>handleResize</code>) berilishi muhim — aks holda brauzer qaysi
        tinglovchini olib tashlashni bilmay qoladi va u ham xotirada qolib ketaveradi.
      </p>

      <h2>Nega dasturlash rejimida effect ikki marta ishlaydi?</h2>
      <p>
        26-darsda aytganimizdek, StrictMode dasturlash rejimida har bir komponentni birinchi
        chizgandan keyin uni bir marta "olib tashlab, qayta qo'yadi": effect → cleanup → effect.
        Muammodagi taymer aynan shu sababdan birinchi soniyadanoq ikki barobar tez yurdi —
        birinchi interval tozalanmay qoldi.
      </p>
      <p>
        Bu ataylab qilingan tekshiruv: foydalanuvchi sahifalar orasida yurganda komponentlar
        haqiqatan ham ko'p marta olib tashlanadi va qayta qo'yiladi. Agar effect'ingiz
        "ulanish → uzish → ulanish" ketma-ketligida to'g'ri ishlasa, u har qanday holatda to'g'ri
        ishlaydi. To'g'ri yechim — StrictMode'ni o'chirish yoki "effect bir marta ishlasin" deb
        hiyla qilish emas, balki <strong>cleanup yozish</strong>. Cleanup bilan StrictMode'da
        foydalanuvchi hech narsani sezmaydi: bitta interval yaratiladi, tozalanadi va yana
        bittasi yaratiladi.
      </p>

      <h2>Bitta effect — bitta jarayon</h2>
      <p>
        Komponentda bir nechta mustaqil sinxronlash bo'lsa (masalan, taymer va oyna o'lchamini
        kuzatish), ularni bitta effect'ga tiqmang — har biri o'z <code>useEffect</code>i, o'z
        dependency'lari va o'z cleanup'i bilan alohida yozilsin. Shunda biri o'zgarganda
        ikkinchisi keraksiz qayta ishlamaydi va kodni o'qish oson.
      </p>
      <p>
        Cleanup kerakmi yoki yo'qmi — oddiy savol: <strong>effect biror narsani boshladimi?</strong>{' '}
        Interval, timeout, tinglovchi, obuna, ulanish, animatsiya — ha, to'xtatish kerak.{' '}
        <code>document.title</code>ni o'zgartirish yoki <code>scrollIntoView</code> — yo'q,
        to'xtatadigan narsa yo'q. Serverga so'rov esa alohida holat — uni keyingi darsda ko'ramiz.
      </p>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Cleanup'ni unutish</strong> — taymerlar va tinglovchilar to'planadi, komponent
            yo'qolgandan keyin ham ishlayveradi.
          </li>
          <li>
            <strong>Cleanup o'rniga funksiyani chaqirib yuborish.</strong>{' '}
            <code>return clearInterval(id)</code> — interval darhol to'xtaydi. Funksiya
            qaytaring: <code>{'return () => clearInterval(id)'}</code>.
          </li>
          <li>
            <strong><code>removeEventListener</code>ga boshqa funksiya berish.</strong>{' '}
            <code>{"addEventListener('resize', () => ...)"}</code> va{' '}
            <code>{"removeEventListener('resize', () => ...)"}</code> — ikki xil funksiya,
            tinglovchi olib tashlanmaydi. Funksiyani o'zgaruvchiga oling.
          </li>
          <li>
            <strong>Interval ichida eski state.</strong>{' '}
            <code>setSoni(soni + 1)</code> bo'sh dependency bilan — interval doim birinchi
            renderdagi <code>soni</code>ni ko'radi va 1 da qotadi. Updater:{' '}
            <code>{'setSoni(s => s + 1)'}</code>.
          </li>
          <li>
            <strong>"Effect ikki marta ishlayapti" deb StrictMode'ni o'chirish.</strong> Muammo
            cleanup'da, StrictMode'da emas.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="useEffect(() => { const id = setInterval(tik, 1000); return () => clearInterval(id) }, [tezlik]). tezlik prop'i 1 marta o'zgardi, so'ng komponent olib tashlandi. clearInterval necha marta chaqiriladi (StrictMode'siz)?"
        options={['2 marta', '1 marta', '0 marta', '3 marta']}
        correctIndex={0}
        explanation="tezlik o'zgarganda yangi effect'dan oldin eski effect'ning cleanup'i chaqiriladi — 1. Komponent olib tashlanganda oxirgi effect'ning cleanup'i — 2. Har bir yaratilgan interval aynan bir marta to'xtatildi."
      />

      <Quiz
        question="Dasturlash rejimida effect ichidagi console.log('ulandi') ikki marta, cleanup ichidagi console.log('uzildi') bir marta chiqdi: ulandi, uzildi, ulandi. Bu nimani bildiradi?"
        options={[
          "Hammasi joyida: StrictMode effect'ni tekshirish uchun bir marta tozalab, qayta ishga tushirdi",
          "Effect'da xato bor — u faqat bir marta ishlashi kerak edi",
          "Dependency array noto'g'ri yozilgan",
          "Komponent ikki marta import qilingan",
        ]}
        correctIndex={0}
        explanation="StrictMode dasturlash rejimida komponentni mount → unmount → mount qilib tekshiradi. Natijada 'ulandi, uzildi, ulandi' — va oxirida bitta faol ulanish qoladi. Cleanup to'g'ri yozilgani shundan bilinadi."
      />

      <Exercise title="1-mashq: soat">
        <p>
          <code>Soatlar</code> nomli komponent yozing: u <code>useState</code> orqali{' '}
          <code>vaqt</code> nomli state (boshlang'ich qiymati — <code>new Date()</code>) saqlasin.{' '}
          <code>useEffect</code> ichida <code>setInterval</code> yordamida har soniyada{' '}
          <code>vaqt</code>ni yangi <code>new Date()</code> qiymatiga yangilab tursin, va cleanup
          funksiyasi orqali intervalni to'g'ri tozalasin. Ekranga{' '}
          <code>{'vaqt.toLocaleTimeString()'}</code> chiqarilsin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useState, useEffect } from 'react'

function Soatlar() {
  const [vaqt, setVaqt] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => {
      setVaqt(new Date())
    }, 1000)

    return () => {
      clearInterval(id)
    }
  }, [])

  return <p>Hozirgi vaqt: {vaqt.toLocaleTimeString()}</p>
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: Escape bilan yopiladigan oyna">
        <p>
          <code>Modal</code> komponentini yozing: u <code>onYopish</code> va{' '}
          <code>children</code> props'larini oladi va ekran o'rtasida oyna ko'rsatadi. Oyna
          ochiq turganda klaviaturada <kbd>Escape</kbd> bosilsa, <code>onYopish</code>{' '}
          chaqirilsin. Ota komponentda "Oynani ochish" tugmasi va <code>ochiq</code> state bo'lsin.
          Oyna yopilgandan keyin Escape tinglovchisi qolib ketmasligiga ishonch hosil qiling.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useEffect, useState } from 'react'

function Modal({ onYopish, children }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onYopish()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onYopish])

  return (
    <div className="modal-fon">
      <div className="modal">
        {children}
        <button onClick={onYopish}>Yopish</button>
      </div>
    </div>
  )
}

export default function Sahifa() {
  const [ochiq, setOchiq] = useState(false)

  return (
    <>
      <button onClick={() => setOchiq(true)}>Oynani ochish</button>
      {ochiq && (
        <Modal onYopish={() => setOchiq(false)}>
          <p>Escape tugmasini bosib ko'ring.</p>
        </Modal>
      )}
    </>
  )
}`}</CodeBlock>
          <p>
            Tinglovchi <code>Modal</code> ichida qo'shilgani uchun u faqat oyna ochiq paytda
            mavjud: <code>ochiq</code> false bo'lganda <code>Modal</code> olib tashlanadi va
            cleanup tinglovchini o'chiradi. <code>onYopish</code> effect ichida ishlatilgani
            uchun dependency'da. (U har renderda yangi funksiya bo'lgani uchun effect ham har
            renderda qayta ulanadi — bu yerda zararsiz, va buni optimallashtirish usullari{' '}
            <code>react-advanced</code> kursida.)
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Effect funksiyasi cleanup funksiyasini qaytarishi mumkin — React uni effect qayta
          ishga tushishidan oldin va komponent olib tashlanganda chaqiradi.
        </li>
        <li>
          Effect biror narsani boshlasa (interval, timeout, tinglovchi, ulanish), cleanup uni
          to'xtatishi kerak: <code>{'return () => clearInterval(id)'}</code>.
        </li>
        <li>
          <code>addEventListener</code>/<code>removeEventListener</code>ga aynan bitta funksiya
          beriladi.
        </li>
        <li>
          Dasturlash rejimida StrictMode effect → cleanup → effect qiladi; cleanup to'g'ri bo'lsa,
          foydalanuvchi buni sezmaydi.
        </li>
        <li>
          Har bir mustaqil sinxronlash — alohida <code>useEffect</code>, o'z dependency'lari va
          cleanup'i bilan.
        </li>
      </KeyPoints>
    </>
  )
}
