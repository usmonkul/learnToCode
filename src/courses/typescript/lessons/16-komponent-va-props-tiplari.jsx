import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Komponent va props tiplari',
  section: 'TypeScript va React',
}

export default function ComponentPropsTypesLesson() {
  return (
    <>
      <p>
        React kursida <code>props</code>ni komponentga tashqaridan uzatiladigan ma'lumot sifatida
        o'rgangansiz. TypeScript bilan bu tushuncha o'zgarmaydi — faqat endi har bir komponent
        qanday props qabul qilishini <strong>aniq e'lon qilasiz</strong>, va TypeScript siz
        komponentni noto'g'ri ishlatsangiz (masalan, kerakli prop'ni unutib qoldirsangiz)
        kompilyatsiya paytida ogohlantiradi.
      </p>

      <h2>
        Props uchun <code>interface</code> yoki <code>type</code> yozish
      </h2>
      <p>
        Komponentning props'i uchun odatda alohida tip e'lon qilinadi — <code>interface</code>{' '}
        yoki <code>type</code> orqali, ikkalasi ham amalda ishlaydi. Keyin bu tip funksiyaning
        yagona parametri sifatida ishlatiladi:
      </p>
      <CodeBlock lang="tsx">{`interface FoydalanuvchiKartaProps {
  ism: string
  yosh: number
}

function FoydalanuvchiKarta(props: FoydalanuvchiKartaProps) {
  return (
    <div>
      <p>{props.ism}</p>
      <p>{props.yosh} yosh</p>
    </div>
  )
}`}</CodeBlock>
      <p>
        Amalda esa, deyarli har doim <code>props</code>ni to'g'ridan-to'g'ri funksiya parametrida{' '}
        <strong>destructuring</strong> qilib yozish afzalroq — bu React kursida ko'rgan
        odatiy uslub, TypeScript bilan ham xuddi shunday davom etadi:
      </p>
      <CodeBlock lang="tsx">{`interface FoydalanuvchiKartaProps {
  ism: string
  yosh: number
}

function FoydalanuvchiKarta({ ism, yosh }: FoydalanuvchiKartaProps) {
  return (
    <div>
      <p>{ism}</p>
      <p>{yosh} yosh</p>
    </div>
  )
}`}</CodeBlock>

      <h2>Ixtiyoriy props va children</h2>
      <p>
        Har bir prop ham majburiy bo'lishi shart emas — <code>?</code> belgisi bilan prop'ni
        ixtiyoriy (optional) qilib belgilash mumkin, xuddi oddiy interfeys maydonlarida bo'lgani
        kabi:
      </p>
      <CodeBlock lang="tsx">{`interface TugmaProps {
  matn: string
  rang?: string // ixtiyoriy — berilmasa, undefined bo'ladi
}

function Tugma({ matn, rang }: TugmaProps) {
  return <button style={{ backgroundColor: rang }}>{matn}</button>
}

<Tugma matn="Yuborish" />              {/* to'g'ri — rang ixtiyoriy */}
<Tugma matn="Bekor qilish" rang="red" /> {/* ham to'g'ri */}`}</CodeBlock>
      <p>
        Komponent ichiga JSX bolalari (children) uzatilishi kerak bo'lsa — masalan, o'rovchi
        (wrapper) komponent yasayotganda — <code>children</code> propining tipi{' '}
        <code>ReactNode</code> bo'ladi. Bu tip React ko'tara oladigan deyarli har qanday narsani
        (JSX, matn, son, massiv, <code>null</code>) qamrab oladi:
      </p>
      <CodeBlock lang="tsx">{`import type { ReactNode } from 'react'

interface KartaProps {
  children: ReactNode
}

function Karta({ children }: KartaProps) {
  return <div className="karta">{children}</div>
}

<Karta>
  <p>Bu — Karta ichidagi matn</p>
</Karta>`}</CodeBlock>

      <h2>Standart qiymatli props</h2>
      <p>
        Ixtiyoriy prop uchun standart qiymat berish kerak bo'lsa, destructuring'ning o'z
        sintaksisidan foydalaniladi — tip e'lonida <code>?</code> qo'yiladi, standart qiymat esa
        destructuring paytida beriladi:
      </p>
      <CodeBlock lang="tsx">{`interface TugmaProps {
  matn: string
  rang?: string
}

function Tugma({ matn, rang = 'gray' }: TugmaProps) {
  return <button style={{ backgroundColor: rang }}>{matn}</button>
}`}</CodeBlock>
      <p>
        Bu yerda <code>rang</code> prop sifatida berilmasa, <code>'gray'</code> qiymati
        ishlatiladi — va TypeScript komponent ichida <code>rang</code>ning har doim{' '}
        <code>string</code> (hech qachon <code>undefined</code> emas) ekanini biladi.
      </p>

      <h2>
        Nega <code>React.FC</code>dan ko'pincha qochiladi?
      </h2>
      <p>
        Eski React + TypeScript kodida ko'pincha <code>React.FC</code> (yoki{' '}
        <code>React.FunctionComponent</code>) tipini ko'rish mumkin:
      </p>
      <CodeBlock lang="tsx">{`// Eski uslub — hozir odatda tavsiya qilinmaydi
const Tugma: React.FC<TugmaProps> = ({ matn }) => {
  return <button>{matn}</button>
}`}</CodeBlock>
      <p>
        Bu ishlaydi, lekin zamonaviy React jamoasi oddiy funksiya yozishni afzal ko'radi — ikkita
        aniq sababga ko'ra:
      </p>
      <ul>
        <li>
          <code>React.FC</code> avtomatik ravishda <code>children</code> propini (hatto siz uni
          <code>Props</code>da e'lon qilmagan bo'lsangiz ham) qo'shib qo'yadi — bu komponentga
          haqiqatda kerak bo'lmagan children qabul qilish imkonini "yashirincha" berib qo'yadi.
        </li>
        <li>
          Generik komponent (masalan, ro'yxatni istalgan tipdagi elementlar bilan render qiladigan
          komponent) yozganda, <code>React.FC</code> generik parametrlarni to'g'ri qo'llab-quvvatlamaydi
          — bu noqulaylik tug'diradi.
        </li>
      </ul>
      <p>
        Shu sabablarga ko'ra, zamonaviy tavsiya — oddiy funksiya yozib, unga aniq <code>Props</code>{' '}
        tipini berish (yuqoridagi barcha misollarda qilganimizdek), <code>React.FC</code> o'rniga:
      </p>
      <CodeBlock lang="tsx">{`// Zamonaviy tavsiya
function Tugma({ matn }: TugmaProps) {
  return <button>{matn}</button>
}`}</CodeBlock>

      <Callout type="tip" title="Qisqacha xulosa">
        Props uchun har doim aniq <code>interface</code> yoki <code>type</code> yozing,
        destructuring bilan qabul qiling, kerak bo'lsa <code>?</code> va standart qiymatlardan
        foydalaning, <code>children</code> uchun <code>ReactNode</code>ni ishlating —{' '}
        <code>React.FC</code>ni esa yangi kodda ishlatmang.
      </Callout>

      <Quiz
        question="React.FC'dan hozirgi kunda ko'pincha qochilishining asosiy sabablaridan biri nima?"
        options={[
          "React.FC ishlatilgan komponentlar sekinroq render bo'ladi",
          "React.FC avtomatik ravishda children propini qo'shib qo'yadi va generik komponentlar bilan noqulay ishlaydi",
          "React.FC faqat class komponentlarda ishlaydi",
          "React.FC props'ni destructuring qilishga umuman ruxsat bermaydi",
        ]}
        correctIndex={1}
        explanation="React.FC har doim (hatto kerak bo'lmasa ham) children propini qo'shib qo'yadi va generik komponentlar bilan mos kelmaydi. Shu sabab oddiy funksiya + aniq Props tipi yozish zamonaviy tavsiya hisoblanadi."
      />

      <Exercise title="Mashq">
        <p>
          <code>Mahsulot</code> nomli komponent yozing. U quyidagi props'larni qabul qilsin:{' '}
          <code>nomi</code> (majburiy, <code>string</code>), <code>narxi</code> (majburiy,{' '}
          <code>number</code>), <code>chegirmada</code> (ixtiyoriy, <code>boolean</code>,
          standart qiymati <code>false</code>). Komponent mahsulot nomi va narxini ko'rsatsin,
          agar <code>chegirmada</code> rost bo'lsa, qo'shimcha "Chegirmada!" matnini ham
          chiqarsin. <code>React.FC</code>dan foydalanmang.
        </p>
        <Solution>
          <CodeBlock lang="tsx">{`interface MahsulotProps {
  nomi: string
  narxi: number
  chegirmada?: boolean
}

function Mahsulot({ nomi, narxi, chegirmada = false }: MahsulotProps) {
  return (
    <div>
      <p>{nomi} — {narxi} so'm</p>
      {chegirmada && <p>Chegirmada!</p>}
    </div>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Props uchun aniq <code>interface</code>/<code>type</code> yozing va uni funksiya
          parametrida destructuring bilan qabul qiling.
        </li>
        <li>
          Ixtiyoriy props <code>?</code> bilan belgilanadi, standart qiymat esa destructuring
          paytida beriladi.
        </li>
        <li>
          Komponent JSX bolalarini qabul qilishi kerak bo'lsa, <code>children</code> propining
          tipi <code>ReactNode</code> bo'ladi.
        </li>
        <li>
          <code>React.FC</code>dan qoching — u kerak bo'lmagan <code>children</code>ni majburan
          qo'shadi va generik komponentlar bilan noqulay ishlaydi. Oddiy funksiya + aniq{' '}
          <code>Props</code> tipi — zamonaviy tavsiya.
        </li>
      </KeyPoints>
    </>
  )
}
