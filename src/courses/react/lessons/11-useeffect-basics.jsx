import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'useEffect asoslari',
  section: 'Effektlar va hooklar',
}

export default function UseEffectBasicsLesson() {
  return (
    <>
      <p>
        Hozirgacha ko'rgan komponentlar bitta ishni bajargan — ular <code>state</code> va{' '}
        <code>props</code> asosida qanday JSX chiqarishni hisoblab, ekranga chizib berishgan. Lekin
        haqiqiy ilovalarda komponentlar ko'pincha bundan tashqari ish ham qilishi kerak: sahifa
        sarlavhasini o'zgartirish, serverdan ma'lumot so'rash, taymer ishga tushirish, brauzer
        hodisasini tinglash. Bularning barchasi — <strong>side effect</strong> (yon ta'sir): render
        paytida JSX hisoblashdan tashqari, "tashqi dunyo" bilan aloqaga kiradigan har qanday harakat.
        React'da bunday ishlarni to'g'ri joyda bajarish uchun maxsus hook bor — <code>useEffect</code>.
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
        hisoblaydi, uni ekrandagi haqiqiy DOM'ga aylantiradi, va faqat shundan keyin effekt
        funksiyasini chaqiradi. Shu tartib tufayli effekt ichida <code>document.title</code>ni
        o'qish yoki DOM elementiga murojaat qilish xavfsiz — DOM allaqachon yangilangan bo'ladi.
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

      <Exercise>
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
          <code>useEffect</code> orqali komponentning "nima chizish kerak" mantig'i bilan "bundan
          tashqari nima qilish kerak" mantig'i aniq ajratiladi.
        </li>
      </KeyPoints>
    </>
  )
}
