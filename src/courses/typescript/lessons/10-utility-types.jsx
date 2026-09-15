import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Utility tiplar: Partial, Pick, Omit, Record',
  section: 'TypeScript asoslari',
}

export default function UtilityTypesLesson() {
  return (
    <>
      <p>
        Ko'pincha yangi <code>interface</code> yozish o'rniga, mavjud bir tipdan{' '}
        <strong>o'zgartirilgan versiyasini</strong> hosil qilish kerak bo'ladi — masalan, "shu
        obyektning barcha maydonlari ixtiyoriy bo'lgan varianti" yoki "shu obyektning faqat
        ikkita maydoni". TypeScript buning uchun tayyor <strong>utility (yordamchi) tiplar</strong>{' '}
        to'plamini beradi. Ularning o'nlab turi bor, lekin kundalik ishda haqiqatan ham
        muntazam ishlatiladigani — atigi bir nechtasi.
      </p>

      <h2>Boshlang'ich tip</h2>
      <p>Quyidagi misollarning barchasi shu interfeys ustida ishlaydi:</p>
      <CodeBlock lang="typescript">{`interface User {
  id: number
  ism: string
  email: string
  yosh: number
}`}</CodeBlock>

      <h2>
        <code>Partial&lt;T&gt;</code> va <code>Required&lt;T&gt;</code>
      </h2>
      <p>
        <code>Partial&lt;T&gt;</code> — <code>T</code>ning barcha maydonlarini ixtiyoriy
        (optional) qiladi. Bu ayniqsa "obyektni qisman yangilash" funksiyalarida juda foydali:
      </p>
      <CodeBlock lang="typescript">{`function foydalanuvchiniYangila(eski: User, ozgarishlar: Partial<User>): User {
  return { ...eski, ...ozgarishlar }
}

const eski: User = { id: 1, ism: "Ali", email: "ali@mail.com", yosh: 20 }

// faqat yoshni o'zgartiramiz, boshqa maydonlarni yozish shart emas
const yangi = foydalanuvchiniYangila(eski, { yosh: 21 })`}</CodeBlock>
      <p>
        Agar <code>ozgarishlar</code> parametri oddiy <code>User</code> tipida bo'lganida,
        chaqiruvchi har safar barcha to'rtta maydonni to'liq berishga majbur bo'lardi — bu
        "qisman yangilash" g'oyasiga zid. <code>Required&lt;T&gt;</code> esa buning
        teskarisini qiladi — barcha ixtiyoriy maydonlarni majburiy qiladi:
      </p>
      <CodeBlock lang="typescript">{`interface Sozlama {
  tema?: string
  til?: string
}

function sozlamaniQollash(sozlama: Required<Sozlama>) {
  console.log(sozlama.tema, sozlama.til) // ikkalasi ham albatta mavjud
}`}</CodeBlock>

      <h2>
        <code>Readonly&lt;T&gt;</code>
      </h2>
      <p>
        <code>Readonly&lt;T&gt;</code> barcha maydonlarni faqat o'qish uchun (read-only) qiladi
        — ularga qayta qiymat berishga urinish kompilyatsiya vaqtida xatolikka olib keladi:
      </p>
      <CodeBlock lang="typescript">{`const foydalanuvchi: Readonly<User> = { id: 1, ism: "Ali", email: "ali@mail.com", yosh: 20 }

foydalanuvchi.yosh = 21 // Xatolik! yosh — readonly`}</CodeBlock>

      <h2>
        <code>Pick&lt;T, K&gt;</code> va <code>Omit&lt;T, K&gt;</code>
      </h2>
      <p>
        <code>Pick&lt;T, K&gt;</code> — <code>T</code>dan faqat ko'rsatilgan maydonlarni
        tanlab olib, kichikroq tip hosil qiladi:
      </p>
      <CodeBlock lang="typescript">{`type UserQisqa = Pick<User, "id" | "ism">
// { id: number; ism: string }

const royxatElementi: UserQisqa = { id: 1, ism: "Ali" }`}</CodeBlock>
      <p>
        <code>Omit&lt;T, K&gt;</code> esa teskarisini qiladi — ko'rsatilgan maydonlarni{' '}
        <strong>chiqarib tashlab</strong>, qolganlarini saqlaydi. Bu, masalan, "parolsiz
        foydalanuvchi" kabi holatlarda qulay:
      </p>
      <CodeBlock lang="typescript">{`interface UserToliq extends User {
  parolHash: string
}

type UserJamoat = Omit<UserToliq, "parolHash">
// { id: number; ism: string; email: string; yosh: number }`}</CodeBlock>

      <h2>
        <code>Record&lt;K, V&gt;</code>
      </h2>
      <p>
        <code>Record&lt;K, V&gt;</code> — kalitlari <code>K</code> tipida, qiymatlari{' '}
        <code>V</code> tipida bo'lgan obyekt tipini hosil qiladi. Bu lug'at (dictionary)
        ko'rinishidagi obyektlar uchun qulay:
      </p>
      <CodeBlock lang="typescript">{`type RollarRuxsati = Record<"admin" | "moderator" | "user", string[]>

const ruxsatlar: RollarRuxsati = {
  admin: ["oqish", "yozish", "ochirish"],
  moderator: ["oqish", "yozish"],
  user: ["oqish"],
}`}</CodeBlock>
      <Callout type="tip" title="Bularning barchasi built-in, import shart emas">
        <code>Partial</code>, <code>Required</code>, <code>Readonly</code>, <code>Pick</code>,{' '}
        <code>Omit</code> va <code>Record</code> — TypeScript'ning o'zida standart bo'lib
        keladi, ularni ishlatish uchun hech qanday import kerak emas. Bulardan tashqari yana
        o'nlab utility tip mavjud, lekin amaliyotda aynan shu oltitasi kundalik kodda eng
        ko'p uchraydi.
      </Callout>

      <Quiz
        question="type UserQisqa = Pick<User, 'id' | 'ism'> qanday tip hosil qiladi?"
        options={[
          "User'ning id va ism'dan tashqari barcha maydonlarini",
          "Faqat id va ism maydonlaridan iborat tipni",
          "User'ning barcha maydonlarini optional qilingan holda",
          "Faqat id va ism nomli ikkita alohida o'zgaruvchi",
        ]}
        correctIndex={1}
        explanation="Pick<T, K> berilgan T tipidan faqat K sifatida ko'rsatilgan maydonlarni tanlab, ulardan iborat yangi, kichikroq tip hosil qiladi — bu yerda faqat id va ism qoladi."
      />

      <Exercise title="Mashq">
        <p>
          Yuqoridagi <code>User</code> interfeysidan foydalanib: (1) <code>Omit</code>{' '}
          yordamida <code>id</code> maydonisiz <code>YangiUser</code> nomli tip yasang (yangi
          foydalanuvchi yaratishda <code>id</code> serverda avtomatik beriladi, deb faraz
          qiling); (2) <code>Record</code> yordamida kalitlari{' '}
          <code>"admin" | "user"</code>, qiymatlari <code>number</code> (masalan, har bir rol
          uchun ruxsat darajasi) bo'lgan <code>RolDarajasi</code> nomli tip yasang.
        </p>
        <Solution>
          <CodeBlock lang="typescript">{`type YangiUser = Omit<User, "id">

const yangiFoydalanuvchi: YangiUser = {
  ism: "Malika",
  email: "malika@mail.com",
  yosh: 24,
}

type RolDarajasi = Record<"admin" | "user", number>

const darajalar: RolDarajasi = {
  admin: 10,
  user: 1,
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>Partial&lt;T&gt;</code> barcha maydonlarni ixtiyoriy qiladi — qisman
          yangilash funksiyalarida foydali; <code>Required&lt;T&gt;</code> esa teskarisini
          qiladi.
        </li>
        <li>
          <code>Readonly&lt;T&gt;</code> barcha maydonlarni faqat o'qish uchun qiladi.
        </li>
        <li>
          <code>Pick&lt;T, K&gt;</code> faqat tanlangan maydonlarni oladi,{' '}
          <code>Omit&lt;T, K&gt;</code> esa ko'rsatilgan maydonlarni chiqarib tashlaydi.
        </li>
        <li>
          <code>Record&lt;K, V&gt;</code> kalit-qiymat (dictionary) ko'rinishidagi obyekt
          tipini hosil qiladi.
        </li>
        <li>Bularning barchasi TypeScript'da built-in bo'lib keladi — import kerak emas.</li>
      </KeyPoints>
    </>
  )
}
