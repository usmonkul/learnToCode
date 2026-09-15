import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Tip xulosasi va qachon annotatsiya yozish kerak',
  section: 'TypeScript asoslari',
}

export default function TypeInferenceLesson() {
  return (
    <>
      <p>
        Oldingi darsda har bir o'zgaruvchiga qo'lda tip yozdik. Lekin haqiqiy TypeScript
        kodining aksariyat qismida buning hojati yo'q — TypeScript ko'p holatda tipni{' '}
        <strong>o'zi aniqlab oladi</strong>. Bu jarayon <strong>tip xulosasi (type inference)</strong>{' '}
        deb ataladi va zamonaviy TypeScript'da yozishning asosiy uslubi aynan shunga tayanadi.
      </p>

      <h2>TypeScript tipni o'zi qanday aniqlaydi</h2>
      <p>
        O'zgaruvchiga boshlang'ich qiymat berilganda, TypeScript o'sha qiymatdan tipni avtomatik
        chiqarib oladi — annotatsiya yozmasangiz ham:
      </p>
      <CodeBlock lang="typescript">{`const x = 5          // TypeScript buni "number" deb biladi
const ism = "Aziz"    // "string" deb biladi
const royxat = [1, 2, 3] // "number[]" deb biladi`}</CodeBlock>
      <p>
        Bu yerda <code>: number</code> deb qo'lda yozish shart emas — TypeScript{' '}
        <code>x</code>ning <code>5</code> ekanini ko'rib, uni <code>number</code> deb
        belgilaydi va shu tipni keyingi kodda ham qat'iy nazorat qiladi:
      </p>
      <CodeBlock lang="typescript">{`const x = 5
x = "matn" // Xato: TypeScript x'ni "number" deb xulosa qilgan, endi string berib bo'lmaydi`}</CodeBlock>
      <Callout type="tip" title="Avval xulosaga ishoning">
        Har bir o'zgaruvchiga qo'lda tip yozish shart emas — va bu, aksincha, yaxshi amaliyot
        hisoblanmaydi. TypeScript'ning tip xulosasi juda kuchli: agar boshlang'ich qiymat
        bo'lsa, u tipni deyarli har doim to'g'ri aniqlaydi. Avval TypeScript'ga ishoning, va
        faqat u tipni aniq bilolmaydigan yoki noto'g'ri aniqlashi mumkin bo'lgan joylardagina
        qo'lda annotatsiya qo'shing.
      </Callout>

      <h2>Qachon aniq annotatsiya kerak bo'ladi</h2>
      <p>
        Tip xulosasi kuchli bo'lsa-da, u har doim yetarli emas. Quyidagi holatlarda annotatsiya
        yozish shart, deyarli har doim:
      </p>
      <p>
        <strong>1. Funksiya parametrlari.</strong> TypeScript funksiya qanday argumentlar bilan
        chaqirilishini oldindan bila olmaydi, shuning uchun parametr tiplarini deyarli har doim
        qo'lda yozish kerak:
      </p>
      <CodeBlock lang="typescript">{`function qoshish(a: number, b: number) {
  return a + b // qaytar tip avtomatik "number" deb xulosa qilinadi
}`}</CodeBlock>
      <p>
        <strong>2. Murakkab yoki public funksiyalarning qaytar tipi.</strong> Oddiy
        funksiyalarda qaytar tipni yozmasangiz ham bo'ladi (TypeScript uni funksiya tanasidan
        xulosa qiladi), lekin boshqa fayllardan ishlatiladigan (public) yoki mantiqi murakkab
        funksiyalarda qaytar tipni aniq yozish tavsiya etiladi — bu funksiyaning "shartnomasini"
        aniq qilib, tasodifiy o'zgarishlardan himoya qiladi:
      </p>
      <CodeBlock lang="typescript">{`function foydalanuvchiniTop(id: number): string | null {
  // murakkab mantiq...
  return null
}`}</CodeBlock>
      <p>
        <strong>3. Bo'sh massiv yoki keyinroq to'ldiriladigan o'zgaruvchi.</strong> Agar
        boshlang'ich qiymat bo'lmasa yoki bo'sh bo'lsa, TypeScript tipni to'g'ri xulosa
        qilolmasligi mumkin:
      </p>
      <CodeBlock lang="typescript">{`let natijalar = [] // TypeScript buni "any[]" deb xulosa qiladi — foydali emas
let natijalar2: number[] = [] // aniq annotatsiya bilan xavfsizroq

let tanlangan // TypeScript buni "any" deb xulosa qiladi
tanlangan = 5

let tanlangan2: number | undefined // qiymat keyinroq beriladi, tipi oldindan ma'lum`}</CodeBlock>

      <h2>"Overtyping"dan saqlaning</h2>
      <p>
        Ba'zi dasturchilar, ayniqsa boshqa qattiq tiplangan tillardan kelganlar, har bir kichik
        o'zgaruvchiga ham qo'lda tip yozishga moyil bo'lishadi — bunga <strong>overtyping</strong>{' '}
        deyiladi. Bu shart emas va zamonaviy amaliyotda yaxshi uslub hisoblanmaydi:
      </p>
      <CodeBlock lang="typescript">{`// Ortiqcha — TypeScript buni allaqachon biladi
const yosh: number = 25
const faol: boolean = true

// Yetarli — tip xulosasi o'zi ishlaydi
const yosh2 = 25
const faol2 = true`}</CodeBlock>
      <p>
        Ortiqcha annotatsiyalar kodni uzun va o'qishga og'ir qiladi, hech qanday qo'shimcha
        xavfsizlik bermaydi. Yaxshi qoida: <strong>funksiya chegaralarida</strong>{' '}
        (parametrlar, ba'zan qaytar tip) aniq yozing, lokal o'zgaruvchilarda esa xulosaga
        ishonib qoldiring.
      </p>

      <Quiz
        question="Quyidagilardan qaysi biri annotatsiya yozish haqiqatan ham zarur bo'lgan holat?"
        options={[
          "const soni = 10 kabi to'g'ridan-to'g'ri songa teng o'zgaruvchi",
          "Boshlang'ich qiymatga ega bo'lgan oddiy lokal o'zgaruvchi",
          "Funksiya parametrlari",
          `const ism = "Aziz" kabi to'g'ridan-to'g'ri matnga teng o'zgaruvchi`,
        ]}
        correctIndex={2}
        explanation="Funksiya parametrlari uchun TypeScript chaqiruv paytida qanday argument kelishini oldindan bila olmaydi, shuning uchun ularga deyarli har doim aniq tip annotatsiyasi yozish kerak. Boshlang'ich qiymatga ega oddiy o'zgaruvchilarda esa tip xulosasi odatda yetarli."
      />

      <Exercise title="Mashq">
        <p>
          Quyidagi kodda ortiqcha yozilgan annotatsiyalarni olib tashlang, lekin haqiqatan ham
          zarur bo'lgan joylarni (funksiya parametrlari va bo'sh massiv) o'zgarishsiz qoldiring:
        </p>
        <CodeBlock lang="typescript">{`const shahar: string = "Toshkent"
const aholi: number = 3000000

function masofaniHisobla(a, b) {
  return Math.abs(a - b)
}

let shaharlar = []`}</CodeBlock>
        <Solution>
          <CodeBlock lang="typescript">{`const shahar = "Toshkent"
const aholi = 3000000

function masofaniHisobla(a: number, b: number) {
  return Math.abs(a - b)
}

let shaharlar: string[] = []`}</CodeBlock>
          <p>
            <code>shahar</code> va <code>aholi</code>da boshlang'ich qiymat borligi uchun
            annotatsiya ortiqcha edi. <code>masofaniHisobla</code>ning parametrlari va bo'sh{' '}
            <code>shaharlar</code> massivi esa aniq tip talab qiladi, chunki TypeScript ularni
            to'g'ri yoki foydali tarzda xulosa qilolmaydi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          TypeScript boshlang'ich qiymatga ega o'zgaruvchilarning tipini avtomatik xulosa
          qiladi (type inference) — bu holatlarda qo'lda annotatsiya shart emas.
        </li>
        <li>
          Annotatsiya deyarli har doim kerak: funksiya parametrlarida, murakkab/public
          funksiyalarning qaytar tipida va bo'sh yoki keyinroq to'ldiriladigan o'zgaruvchilarda.
        </li>
        <li>
          Har bir narsani qo'lda yozish ("overtyping") zamonaviy amaliyotda yaxshi hisoblanmaydi
          — bu kodni uzun qiladi, lekin qo'shimcha xavfsizlik bermaydi.
        </li>
        <li>
          Yaxshi qoida: funksiya chegaralarida aniq yozing, lokal o'zgaruvchilarda xulosaga
          ishoning.
        </li>
      </KeyPoints>
    </>
  )
}
