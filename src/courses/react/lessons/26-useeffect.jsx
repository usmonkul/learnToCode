import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import Figure from '@/components/content/Figure'
import effectLifecycle from '@/assets/effect-lifecycle.svg'

export const meta = {
  title: 'useEffect asoslari',
  section: 'Ref va effektlar',
}

export default function UseEffectBasicsLesson() {
  return (
    <>
      <h2>Muammo: "render tugagandan keyin" qilinadigan ish</h2>
      <p>
        25-darsdagi chatda "Eng yangisiga" tugmasi bor edi. Endi talab: yangi xabar kelganda
        ro'yxat <strong>o'zi</strong> pastga aylansin. Qayerga yozamiz?
      </p>
      <ul>
        <li>
          <strong>Render ichiga?</strong> <code>oxirgiRef.current.scrollIntoView()</code> — render
          paytida yangi xabarning DOM elementi hali yaratilmagan (commit hali bo'lmagan, 14-dars),
          va render sof bo'lishi kerak (9-dars).
        </li>
        <li>
          <strong>Handler ichiga?</strong> <code>handleYuborish</code>da — xabar faqat
          foydalanuvchi yuborganda qo'shilsa ishlardi. Lekin xabar serverdan, boshqa odamdan
          kelsa-chi? Unda hech qanday handler yo'q. Va handler ichida ham DOM hali eski.
        </li>
      </ul>
      <p>
        Bizga uchinchi joy kerak: "komponent chizilib, DOM yangilangandan keyin, ekrandagi narsa
        bilan tashqi dunyoni moslashtir". Bu — <strong>effect</strong>, va uning hook'i —{' '}
        <code>useEffect</code>.
      </p>

      <h2>Nega side effect'lar alohida joyga muhtoj?</h2>
      <p>
        Komponent funksiyasining o'zi — bu hisoblash funksiyasi bo'lishi kerak: berilgan{' '}
        <code>props</code> va <code>state</code> asosida qanday JSX kerakligini aniqlaydi, xolos.
        Agar shu funksiya ichiga to'g'ridan-to'g'ri <code>document.title = "..."</code> yoki{' '}
        <code>fetch(...)</code> kabi kod yozilsa, bu kod komponent har render bo'lganda —
        hattoki ekranga hech narsa o'zgarmagan holatlarda ham — qayta-qayta ishga tushaveradi va
        buni nazorat qilish qiyinlashadi. <code>useEffect</code> React'ga aniq signal beradi: "bu
        kodni render tugagandan keyin, DOM yangilangandan so'ng bajar" — ya'ni render hisoblashi
        bilan yon ta'sirlarni ikkiga ajratib beradi.
      </p>

      <h2>
        <code>useEffect</code>ning shakli
      </h2>
      <p>
        <code>useEffect</code> ikkita argument qabul qiladi: bajariladigan funksiya va{' '}
        <em>dependency array</em> (bog'liqlik massivi):
      </p>
      <CodeBlock lang="jsx">{`import { useEffect } from 'react'

useEffect(() => {
  // bu yerdagi kod render tugagandan keyin ishga tushadi
}, [bogliqliklar])`}</CodeBlock>
      <p>
        Bu yerda muhim narsa — <code>useEffect</code>ga berilgan funksiya komponent{' '}
        <em>render bo'lib bo'lgandan keyin</em> ishlaydi, render paytida emas. React avval JSX'ni
        hisoblaydi, uni ekrandagi haqiqiy DOM'ga aylantiradi (commit), brauzer ekranni chizadi,
        va faqat shundan keyin effekt funksiyasini chaqiradi. Shu tartib tufayli effekt ichida
        DOM elementiga murojaat qilish xavfsiz — DOM allaqachon yangilangan bo'ladi.
      </p>
      <Figure
        src={effectLifecycle}
        alt="Vaqt chizig'i: 1-render, commit va paint'dan keyin effect 'osh' xonasiga ulanadi. roomId o'zgarganda yangi render va commit'dan keyin avval eski effect'ning cleanup'i (uzish), so'ng yangi effect (ulanish). Komponent olib tashlanganda oxirgi cleanup."
        caption="1-rasm: effect render va chizishdan keyin ishlaydi; cleanup — keyingi darsda"
      />
      <p>
        Effect'lar haqida o'ylashning eng to'g'ri usuli — "hayot sikli" emas,{' '}
        <strong>sinxronlash</strong>: "<code>roomId</code> qanday bo'lsa, shu xonaga ulangan
        bo'l", "<code>soni</code> qanday bo'lsa, sarlavhada shu yozilsin". Dependency'lar
        o'zgarganda React sinxronlashni qaytadan bajaradi. Rasmdagi "uzish" bosqichi — cleanup —
        keyingi darsning mavzusi.
      </p>

      <h2>Dependency array — uchta holat</h2>
      <p>
        Ikkinchi argument — dependency array — <code>useEffect</code>ning qachon qayta ishga
        tushishini belgilaydi. Uning uchta ko'rinishi bor, va har biri butunlay boshqacha
        xatti-harakatni bildiradi:
      </p>

      <h3>1. Array umuman berilmasa</h3>
      <CodeBlock lang="jsx">{`useEffect(() => {
  console.log('Har render sayin ishga tushadi')
})`}</CodeBlock>
      <p>
        Ikkinchi argument butunlay yo'q bo'lsa, effekt <strong>har bir renderdan keyin</strong>{' '}
        qayta ishga tushadi — komponent birinchi marta chizilganda ham, keyingi har qanday{' '}
        <code>state</code> yoki <code>props</code> o'zgarishi natijasida qayta render
        bo'lganda ham. Bu shakl kamdan-kam kerak bo'ladi, chunki odatda effektni faqat aniq bir
        narsa o'zgarganda ishga tushirish kerak bo'ladi.
      </p>

      <h3>
        2. Bo'sh array — <code>[]</code>
      </h3>
      <CodeBlock lang="jsx">{`useEffect(() => {
  console.log('Faqat bir marta, komponent birinchi chizilganda')
}, [])`}</CodeBlock>
      <p>
        Bo'sh array berilsa, effekt faqat <strong>bir marta</strong> — komponent birinchi marta
        render bo'lgandan keyin — ishga tushadi va boshqa hech qachon qayta ishlamaydi (komponent
        ekrandan butunlay olib tashlanmaguncha). Buni odatda{' '}
        <em>"mount paytida"</em> (komponent ekranga birinchi marta chiqqanda) ishlaydigan effekt
        deyishadi — masalan, sahifa ochilganda bir marta ma'lumot yuklab olish.
      </p>

      <h3>
        3. Qiymatlar bilan array — <code>[qiymat]</code>
      </h3>
      <CodeBlock lang="jsx">{`useEffect(() => {
  console.log("Mount paytida va soni o'zgargan har safar")
}, [soni])`}</CodeBlock>
      <p>
        Array ichida bitta yoki bir nechta qiymat ko'rsatilsa, effekt komponent birinchi
        render bo'lganda ishga tushadi, so'ng — faqat o'sha ro'yxatdagi qiymatlardan{' '}
        <strong>kamida bittasi oldingi renderga nisbatan o'zgarganda</strong> — qayta ishga
        tushadi. Agar keyingi renderda <code>soni</code>ning qiymati aynan bir xil qolsa,
        effekt qayta ishlamaydi — React buni har render orasida solishtirib turadi.
      </p>

      <h2>Amaliy misol: sahifa sarlavhasini state bilan sinxronlash</h2>
      <p>
        Brauzer tab'idagi sarlavhani <code>document.title</code> orqali o'zgartirish — klassik
        side effect misoli, chunki u DOM bilan emas, butun sahifa bilan ishlaydi va render
        natijasi (JSX) orqali ifodalanmaydi:
      </p>
      <CodeBlock lang="jsx">{`import { useState, useEffect } from 'react'

function Hisoblagich() {
  const [soni, setSoni] = useState(0)

  useEffect(() => {
    document.title = \`Bosishlar soni: \${soni}\`
  }, [soni])

  return (
    <div>
      <p>Siz {soni} marta bosdingiz.</p>
      <button onClick={() => setSoni(soni + 1)}>Bos</button>
    </div>
  )
}`}</CodeBlock>
      <p>
        Bu yerda <code>soni</code> o'zgarganda komponent qayta render bo'ladi, DOM yangilanadi
        (tugma ostidagi matn yangi qiymatni ko'rsatadi) va shundan keyingina effekt ishga tushib,
        sahifa sarlavhasini yangi qiymat bilan yangilaydi. <code>soni</code> array ichida
        ko'rsatilgani uchun, agar komponent boshqa sababdan (masalan, boshqa bir prop o'zgarishi
        tufayli) qayta render bo'lsa-yu, ammo <code>soni</code>ning o'zi o'zgarmasa, effekt qayta
        ishga tushmaydi — bu ortiqcha ishni oldini oladi.
      </p>

      <Callout type="warning" title="Dependency arrayni to'liq yozing">
        Effekt ichida o'qilayotgan har qanday <code>state</code> yoki <code>props</code> qiymati —
        odatda dependency array ichida ham bo'lishi kerak. Agar effekt ichida{' '}
        <code>soni</code>dan foydalanilsa-yu, lekin u array'ga qo'shilmasa, effekt eski
        (stale) — o'sha birinchi renderdagi — <code>soni</code> qiymatini "eslab qolib" ishlata
        beradi, hatto <code>soni</code> keyinchalik o'zgargan bo'lsa ham. Bu — React'dagi eng keng
        tarqalgan xatolardan biri. Bu mavzuni keyingi darsda chuqurroq ko'ramiz, hozircha shuni
        eslab qoling: <strong>effekt ichida ishlatilgan qiymat — arrayda ham bo'lsin</strong>.
        Vite shablonidagi ESLint (<code>react-hooks/exhaustive-deps</code> qoidasi) unutilgan
        dependency'ni o'zi topib, ogohlantiradi — bu ogohlantirishni hech qachon e'tiborsiz
        qoldirmang.
      </Callout>

      <h2>Muammomizni hal qilamiz</h2>
      <CodeBlock lang="jsx">{`useEffect(() => {
  oxirgiRef.current?.scrollIntoView({ behavior: 'smooth' })
}, [xabarlar])`}</CodeBlock>
      <p>
        "<code>xabarlar</code> o'zgargan har safar, ekran chizilgandan keyin, oxirgi xabarga
        aylantir". Xabar kim tomonidan va qanday qo'shilgani ahamiyatsiz — effect natijaga
        (ekrandagi ro'yxatga) qarab ishlaydi. <code>?.</code> (optional chaining) — ro'yxat bo'sh
        bo'lib, ref <code>null</code> bo'lgan holat uchun.
      </p>

      <Callout type="note" title="Dasturlash rejimida effect ikki marta ishlaydi">
        StrictMode (9-dars) dasturlash rejimida har bir komponentni birinchi marta chizgandan
        keyin uni darhol "olib tashlab, qayta qo'yadi" — ya'ni effect ishlaydi, tozalanadi va
        yana ishlaydi. Agar <code>console.log</code> ikki marta chiqsa — bu shundan. Maqsad —
        tozalanmagan effect'larni erta topish. Bu haqda keyingi darsda batafsil.
      </Callout>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>Dependency'ni unutish.</strong> Effect eski (stale) qiymat bilan ishlaydi.
            Effect ichida o'qilgan har bir props/state — arrayda.
          </li>
          <li>
            <strong>Effect ichida state'ni o'zgartirib, uni dependency qilish.</strong>{' '}
            <code>{'useEffect(() => setSoni(soni + 1), [soni])'}</code> — har o'zgarish yangi
            effect'ni, u esa yangi o'zgarishni chaqiradi: cheksiz sikl.
          </li>
          <li>
            <strong>Array'ni butunlay unutish.</strong> <code>useEffect(fn)</code> har renderdan
            keyin ishlaydi — ko'pincha bu kutilgan narsa emas.
          </li>
          <li>
            <strong>Hamma narsa uchun effect.</strong> Props'dan qiymat hisoblash yoki tugma
            bosilganda nimadir qilish uchun effect kerak emas — bular render va handler'ning ishi.
            Bu haqda 29-darsda.
          </li>
          <li>
            <strong>Effect'ni shart ichida chaqirish.</strong> <code>useEffect</code> ham hook —
            faqat yuqori darajada (13-dars). Shartni effect'ning <em>ichiga</em> yozing.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="Quyidagi effektni ko'ring: useEffect(() => { console.log(nom) }, []) — nom degan state bor va u tugma bosilganda o'zgaradi. Tugma necha marta bosilsa ham, effekt konsolga qanday natija chiqaradi?"
        options={[
          "Har safar nomning eng oxirgi, yangilangan qiymatini",
          "Faqat birinchi renderdagi (eski) nom qiymatini, chunki effekt faqat bir marta ishlagan",
          "Har safar undefined, chunki nom arrayga qo'shilmagan",
          "Xatolik chiqadi, chunki React buni ishlatishga ruxsat bermaydi",
        ]}
        correctIndex={1}
        explanation="Dependency array bo'sh bo'lgani uchun effekt faqat komponent birinchi marta render bo'lganda ishga tushadi va qayta ishlamaydi. Effekt ichidagi console.log o'sha birinchi ishga tushishda qanday nom qiymati bo'lgan bo'lsa, o'shani konsolga chiqargan — keyingi o'zgarishlarni ko'rmaydi, chunki effektning o'zi qayta chaqirilmaydi."
      />

      <Quiz
        question="useEffect(() => { console.log('effect') }, [a, b]) — komponent birinchi chizildi, keyin faqat c state'i o'zgardi, keyin a o'zgardi. 'effect' necha marta chiqadi (StrictMode'ni hisobga olmang)?"
        options={['2 marta', '3 marta', '1 marta', '0 marta']}
        correctIndex={0}
        explanation="Birinchi chizilishda — 1. c o'zgarganda komponent qayta render bo'ladi, lekin a va b o'zgarmagani uchun effect o'tkazib yuboriladi. a o'zgarganda — 2. Jami 2 marta."
      />

      <Exercise title="1-mashq: sahifa sarlavhasi">
        <p>
          <code>SahifaSarlavha</code> nomli komponent yozing. Unda <code>useState</code> orqali{' '}
          <code>bosh</code> nomli boolean state bo'lsin (boshlang'ich qiymati{' '}
          <code>true</code>), va bitta tugma shu qiymatni teskarisiga o'zgartirsin (
          <code>true</code>dan <code>false</code>ga va aksincha). <code>useEffect</code>{' '}
          yordamida, <code>bosh</code> qiymatiga qarab <code>document.title</code>ni "Bosh sahifa"
          yoki "Boshqa sahifa" qiymatiga o'rnating. Dependency arrayni to'g'ri yozing.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useState, useEffect } from 'react'

function SahifaSarlavha() {
  const [bosh, setBosh] = useState(true)

  useEffect(() => {
    document.title = bosh ? 'Bosh sahifa' : 'Boshqa sahifa'
  }, [bosh])

  return (
    <div>
      <p>Hozirgi sahifa: {bosh ? 'Bosh sahifa' : 'Boshqa sahifa'}</p>
      <button onClick={() => setBosh(!bosh)}>Sahifani almashtirish</button>
    </div>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: chatni avtomatik aylantirish">
        <p>
          25-darsdagi 2-mashq chatiga effect qo'shing: yangi xabar qo'shilganda ro'yxat avtomatik
          oxirgi xabarga aylansin. Sinash uchun "Bot javobi" tugmasini qo'shing — u 1 soniyadan
          keyin (<code>setTimeout</code>) "Qabul qildim!" degan xabar qo'shsin. Avtomatik
          aylantirish foydalanuvchi xabari uchun ham, bot xabari uchun ham ishlashi kerak.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`// 25-darsdagi Chat komponentiga qo'shimchalar:
import { useEffect, useRef, useState } from 'react'

// ... komponent ichida:
useEffect(() => {
  oxirgiRef.current?.scrollIntoView({ behavior: 'smooth' })
}, [xabarlar])

function handleBot() {
  setTimeout(() => {
    setXabarlar((eski) => [...eski, { id: crypto.randomUUID(), matn: 'Qabul qildim!' }])
  }, 1000)
}

// JSX'da:
<button onClick={handleBot}>Bot javobi</button>`}</CodeBlock>
          <p>
            Effect xabar <em>qayerdan</em> kelganini bilmaydi va bilishi shart emas — u faqat
            "ro'yxat o'zgardi — pastga aylantir" deydi. <code>setTimeout</code> ichida updater (
            <code>{'eski => ...'}</code>) ishlatildi: 1 soniya ichida foydalanuvchi yana xabar
            yuborsa, u yo'qolmaydi (14-darsdagi surat muammosi).
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Side effect (yon ta'sir) — komponentning render hisoblashdan tashqari, tashqi dunyo
          bilan aloqaga kiradigan har qanday harakati: DOM'ni to'g'ridan-to'g'ri o'zgartirish,
          taymer, tarmoq so'rovi va h.k.
        </li>
        <li>
          <code>useEffect(fn, deps)</code>ga berilgan funksiya komponent render bo'lib,
          DOM yangilangandan <strong>keyin</strong> ishga tushadi — render paytida emas.
        </li>
        <li>
          Dependency array yo'q bo'lsa — effekt har render sayin ishlaydi; bo'sh{' '}
          <code>[]</code> bo'lsa — faqat bir marta, mount paytida; qiymatlar bilan{' '}
          <code>[qiymat]</code> bo'lsa — mount paytida va o'sha qiymat o'zgargan har safar.
        </li>
        <li>
          Effekt ichida ishlatilgan har qanday state yoki props qiymati dependency arrayga
          qo'shilishi kerak — aks holda effekt shu qiymatning eski (stale) nusxasi bilan ishlab
          qoladi.
        </li>
        <li>
          Effect — komponentni tashqi tizim (DOM API, taymer, server, brauzer) bilan
          sinxronlash uchun; "hayot sikli" emas, "shu qiymatlar bilan sinxron bo'l" deb o'ylang.
        </li>
      </KeyPoints>
    </>
  )
}
