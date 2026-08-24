import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Tozalash va ma'lumot olib kelish",
  section: 'Effektlar va hooklar',
}

export default function UseEffectCleanupFetchingLesson() {
  return (
    <>
      <p>
        Oldingi darsda <code>useEffect</code>ning asosiy shaklini va dependency arrayning uchta
        holatini ko'rdik. Lekin ba'zi effektlar shunchaki bir marta ishlab, unutilib qolmaydi —
        ular taymer ishga tushiradi, hodisa tinglovchisini (event listener) qo'shadi yoki tarmoq
        so'rovi yuboradi. Bunday effektlarning ko'pchiligi <strong>cleanup</strong> (tozalash) —
        ya'ni "bu ishni tugatganimda yoki qaytadan boshlaganimda, avvalgisini yig'ishtirib qo'y"
        degan qo'shimcha mantiqqa muhtoj. Shu darsda — cleanup funksiyasi va{' '}
        <code>useEffect</code> ichida ma'lumot olib kelish (data fetching) naqshini ko'ramiz.
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
        funksiya (<code>handleResize</code>) berilishi muhim — aks holda React qaysi
        tinglovchini olib tashlashni bilmay qoladi va u ham xotirada qolib ketaveradi.
      </p>

      <h2>
        <code>useEffect</code> ichida ma'lumot olib kelish
      </h2>
      <p>
        Serverdan ma'lumot so'rash — <code>useEffect</code>ning eng ko'p uchraydigan
        qo'llanilishlaridan biri. Odatiy naqsh — uchta state: <code>data</code> (kelgan
        ma'lumot), <code>loading</code> (so'rov jarayonda ekanligi) va <code>error</code>{' '}
        (xatolik bo'lsa):
      </p>
      <CodeBlock lang="jsx">{`import { useState, useEffect } from 'react'

function FoydalanuvchiKartasi({ id }) {
  const [malumot, setMalumot] = useState(null)
  const [loading, setLoading] = useState(true)
  const [xato, setXato] = useState(null)

  useEffect(() => {
    setLoading(true)
    setXato(null)

    fetch(\`/api/foydalanuvchi/\${id}\`)
      .then((javob) => javob.json())
      .then((data) => {
        setMalumot(data)
        setLoading(false)
      })
      .catch((xatolik) => {
        setXato(xatolik.message)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Yuklanmoqda...</p>
  if (xato) return <p>Xatolik: {xato}</p>
  return <p>{malumot.ism}</p>
}`}</CodeBlock>
      <p>
        <code>id</code> array ichida ko'rsatilgani uchun, <code>FoydalanuvchiKartasi</code>{' '}
        boshqa <code>id</code> bilan qayta chaqirilsa (masalan, foydalanuvchi ro'yxatidan
        boshqasini tanlasa), effekt qayta ishga tushadi va yangi <code>id</code> uchun so'rov
        yuboradi.
      </p>

      <h2>Stale response muammosi</h2>
      <p>
        Yuqoridagi kodda yashirin xato bor: agar <code>id</code> tez-tez o'zgarsa (masalan,
        foydalanuvchi ro'yxatda tez almashtirsa), bir nechta so'rov bir vaqtda "havoda" bo'lishi
        mumkin. Muammo shundaki — tarmoq so'rovlari yuborilgan tartibda emas, balki javob
        kelgan tartibda qayta ishlanadi. Agar birinchi so'rov (eski <code>id</code> uchun) biror
        sababdan ikkinchisidan (yangi <code>id</code> uchun) kechroq javob bersa, uning natijasi
        yangi, to'g'ri natijaning ustiga yozilib, ekranda <strong>eski ma'lumot</strong> qolib
        ketadi. Bu — <strong>stale response</strong> (eskirgan javob) muammosi, "race condition"
        (poyga holati)ning bir turi.
      </p>
      <p>
        Yechim — cleanup funksiyasidan foydalanib, "bu so'rov endi kerak emasligini" belgilash:
      </p>
      <CodeBlock lang="jsx">{`useEffect(() => {
  let bekorQilindi = false

  setLoading(true)
  setXato(null)

  fetch(\`/api/foydalanuvchi/\${id}\`)
    .then((javob) => javob.json())
    .then((data) => {
      if (!bekorQilindi) {
        setMalumot(data)
        setLoading(false)
      }
    })
    .catch((xatolik) => {
      if (!bekorQilindi) {
        setXato(xatolik.message)
        setLoading(false)
      }
    })

  return () => {
    bekorQilindi = true
  }
}, [id])`}</CodeBlock>
      <p>
        Bu yerda <code>bekorQilindi</code> — effektning har bir ishga tushishiga xos, alohida
        o'zgaruvchi (closure orqali "eslab qolinadi"). <code>id</code> o'zgarib, effekt qayta
        ishga tushganda, avvalgi effektning cleanup'i chaqirilib, o'sha eski effektga tegishli{' '}
        <code>bekorQilindi</code>ni <code>true</code>ga o'rnatadi. Shu sababli eski so'rovning
        javobi kelib qolsa ham, <code>if (!bekorQilindi)</code> tekshiruvi uni e'tiborsiz
        qoldiradi — faqat oxirgi, hali "bekor qilinmagan" so'rovning natijasi state'ga yoziladi.
      </p>

      <Callout type="note" title="Fetch chaqiruvi arrayga qo'shilmaydi">
        Diqqat qiling — <code>fetch(...)</code>ning o'zi dependency array ichida yo'q, faqat{' '}
        <code>id</code> bor. Bu tasodifiy emas: array faqat effekt ichida <em>o'qiladigan,
        render paytida hisoblanadigan qiymatlar</em>ni o'z ichiga olishi kerak. <code>fetch</code>{' '}
        — global brauzer funksiyasi, u render natijasiga bog'liq emas va render paytida
        o'zgarmaydi, shuning uchun uni arrayga qo'shishning hojati yo'q. Arrayga faqat so'rovning
        haqiqiy "kirish qiymatlari" — masalan, <code>id</code> yoki qidiruv so'zi — kiradi.
      </Callout>

      <Quiz
        question="Foydalanuvchi ro'yxatda tez-tez boshqa id tanlaydi, va har safar useEffect ichida fetch(`/api/foydalanuvchi/${id}`) yuboriladi, id esa dependency arrayda bor. Agar cleanup ichida bekorQilindi flag ishlatilmasa, nima xavf bor?"
        options={[
          "Hech qanday xavf yo'q, chunki React so'rovlarni avtomatik navbatga qo'yadi",
          "Eski, sekinroq so'rovning javobi keyinroq kelib, yangi tanlangan foydalanuvchi ma'lumotini eski ma'lumot bilan almashtirib qo'yishi mumkin",
          "Effekt umuman ishlamay qoladi, chunki id har safar o'zgaradi",
          "Build vaqtida xatolik chiqadi",
        ]}
        correctIndex={1}
        explanation="Tarmoq so'rovlari javob kelgan tartibda qayta ishlanadi, yuborilgan tartibda emas. Agar eski id uchun yuborilgan so'rov yangi id uchun yuborilgan so'rovdan kechroq javob bersa va buni tekshiradigan flag bo'lmasa, uning natijasi ekrandagi to'g'ri, yangi ma'lumotning ustiga yozilib, foydalanuvchi eskirgan (stale) ma'lumotni ko'radi."
      />

      <Exercise>
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

      <KeyPoints>
        <li>
          Effekt funksiyasi ixtiyoriy ravishda o'z cleanup (tozalash) funksiyasini qaytarishi
          mumkin — React uni effekt qayta ishga tushishidan oldin va komponent unmount
          bo'lganda avtomatik chaqiradi.
        </li>
        <li>
          <code>setInterval</code>/<code>addEventListener</code> kabi "obuna bo'luvchi" effektlar
          deyarli har doim cleanup talab qiladi — aks holda eski taymer/tinglovchi nusxalari
          to'planib, xotira sizib chiqishi (memory leak) yuzaga keladi.
        </li>
        <li>
          Ma'lumot olib kelishda odatiy naqsh — <code>loading</code>, <code>error</code>,{' '}
          <code>data</code> nomli uchta state va <code>useEffect</code> ichidagi{' '}
          <code>fetch</code> chaqiruvi.
        </li>
        <li>
          Stale response (eskirgan javob) muammosi — sekinroq eski so'rovning javobi tezroq
          yangi so'rov natijasining ustiga yozilib qolishi — cleanup ichida{' '}
          <code>bekorQilindi</code> kabi flag bilan oldini olinadi.
        </li>
        <li>
          Dependency arrayga faqat render paytida o'qiladigan haqiqiy kirish qiymatlari
          (masalan, <code>id</code>) kiradi — <code>fetch</code>ning o'zi kabi global,
          o'zgarmas funksiyalar arrayga qo'shilmaydi.
        </li>
      </KeyPoints>
    </>
  )
}
