import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Custom hook'larni tiplashtirish",
  section: 'TypeScript va React',
}

export default function CustomHookTypesLesson() {
  return (
    <>
      <p>
        Custom hook — bu shunchaki nomi <code>use</code> bilan boshlanadigan oddiy funksiya,
        odatda boshqa hook'lardan (<code>useState</code>, <code>useEffect</code> va h.k.)
        foydalanib, takrorlanadigan mantiqni qayta ishlatiladigan shaklga chiqaradi. TypeScript
        bilan custom hook yozganda ikkita narsa muhim: generic parametrlar orqali hook'ni turli
        tipdagi ma'lumot bilan qayta ishlatiladigan qilish, va qaytar tipni to'g'ri, ayniqsa
        tuple ko'rinishida, belgilash.
      </p>

      <h2>Generic custom hook: <code>useLocalStorage&lt;T&gt;</code></h2>
      <p>
        Ko'plab custom hook'lar aslida <code>useState</code>ning "kengaytirilgan" varianti —
        masalan, qiymatni komponent state'ida emas, <code>localStorage</code>da ham saqlab
        turadigan hook. Bunday hook aynan qanday tipdagi qiymat bilan ishlashini oldindan
        bilmaydi (son, matn, obyekt — barchasi bo'lishi mumkin), shuning uchun uni generic
        qilib yozamiz:
      </p>
      <CodeBlock lang="tsx">{`function useLocalStorage<T>(key: string, boshlangichQiymat: T) {
  const [qiymat, setQiymat] = useState<T>(() => {
    const saqlangan = localStorage.getItem(key)
    return saqlangan ? (JSON.parse(saqlangan) as T) : boshlangichQiymat
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(qiymat))
  }, [key, qiymat])

  return [qiymat, setQiymat] as const
}`}</CodeBlock>
      <p>
        Bu hook'ni chaqirganda <code>T</code> odatda ikkinchi argument — {' '}
        <code>boshlangichQiymat</code>dan avtomatik xulosa qilinadi, uni qo'lda yozish shart
        emas:
      </p>
      <CodeBlock lang="tsx">{`// T avtomatik "string" deb xulosa qilinadi
const [ism, setIsm] = useLocalStorage("ism", "Ali")

// T avtomatik "number" deb xulosa qilinadi
const [yosh, setYosh] = useLocalStorage("yosh", 20)`}</CodeBlock>

      <h2>Qaytar tipni aniq belgilash: tuple muammosi</h2>
      <p>
        <code>useState</code>ni eslang: u <code>[qiymat, setQiymat]</code> ko'rinishida ikki
        elementli <strong>tuple</strong> qaytaradi — birinchi element doim qiymat, ikkinchisi
        doim setter funksiya, va bu tartib muhim (<code>const [a, b] = ...</code> deb emas,
        aynan shu tartibda destructuring qilinadi). Custom hook yozganda xuddi shunday tuple
        qaytarmoqchi bo'lsangiz, muammo chiqishi mumkin — TypeScript ba'zan buni tuple emas,
        oddiy massiv deb xulosa qiladi:
      </p>
      <CodeBlock lang="tsx">{`// XATO XULOSA: qaytar tip "(T | Dispatch<SetStateAction<T>>)[]" deb
// xulosa qilinishi mumkin — ya'ni "har ikkala turdan biri bo'lgan elementlar massivi",
// tuple emas
function useLocalStorage(key, boshlangichQiymat) {
  const [qiymat, setQiymat] = useState(boshlangichQiymat)
  // ...
  return [qiymat, setQiymat] // tartib va har bir elementning aniq tipi yo'qoladi
}`}</CodeBlock>
      <p>
        Bunday holatda <code>const [ism, setIsm] = useLocalStorage(...)</code> deb
        destructuring qilinganda, TypeScript <code>ism</code> va <code>setIsm</code>ning
        ikkalasiga ham "qiymat yoki setter funksiya" degan bir xil, kengroq union tipni
        beradi — aslida <code>ism</code> aniq <code>T</code>, <code>setIsm</code> esa aniq
        setter funksiya bo'lishi kerak edi. Buning yechimi ikkita: massivni{' '}
        <code>as const</code> bilan belgilash, yoki funksiyaning qaytar tipini aniq yozish:
      </p>
      <CodeBlock lang="tsx">{`// 1-yechim: "as const" — massivni o'zgarmas tuple sifatida belgilaydi
function useLocalStorage<T>(key: string, boshlangichQiymat: T) {
  const [qiymat, setQiymat] = useState<T>(boshlangichQiymat)
  // ...
  return [qiymat, setQiymat] as const
}

// 2-yechim: qaytar tipni to'g'ridan-to'g'ri tuple sifatida yozish
function useLocalStorage<T>(
  key: string,
  boshlangichQiymat: T
): [T, Dispatch<SetStateAction<T>>] {
  const [qiymat, setQiymat] = useState<T>(boshlangichQiymat)
  // ...
  return [qiymat, setQiymat]
}`}</CodeBlock>
      <Callout type="warning" title="Nega bu jim (silent) muammo">
        Tuple o'rniga oddiy massiv deb xulosa qilinishi build'ni buzmaydi — kod baribir
        ishlaydi, chunki JavaScript darajasida hech qanday farq yo'q. Muammo faqat hook'dan
        foydalangan joyda paydo bo'ladi: destructuring qilingan elementlarning tipi noaniq
        yoki noto'g'ri bo'lib qoladi, va bu odatda hook chaqirilgan joyda, ancha keyinroq,
        tushunarsiz tip xatoligi sifatida namoyon bo'ladi.
      </Callout>

      <Quiz
        question="Custom hook return [qiymat, setQiymat] deb yozganda, TypeScript buni ba'zan nima deb xulosa qilishi mumkin va bu nega muammo?"
        options={[
          "Har doim to'g'ri tuple deb xulosa qiladi, hech qanday muammo yo'q",
          "Oddiy massiv (masalan (T | Setter)[]) deb — bu holda har ikkala elementning aniq pozitsiyaga bog'liq tipi yo'qoladi",
          "Har doim any[] deb, chunki generic funksiyalar tuple qaytara olmaydi",
          "Xatolik chiqadi, chunki massiv literal ichida ikki xil tip bo'lishi mumkin emas",
        ]}
        correctIndex={1}
        explanation="TypeScript ba'zan [qiymat, setQiymat]ni ikkala elementning umumiy union tipidan iborat oddiy massiv deb xulosa qilishi mumkin, tuple deb emas. Bu holda destructuring qilingan har bir o'zgaruvchi o'zining aniq (pozitsiyaga bog'liq) tipini emas, kengroq union tipni oladi. Buning yechimi — 'as const' yoki aniq tuple qaytar tip annotatsiyasi."
      />

      <Exercise title="Mashq">
        <p>
          <code>useToggle</code> nomli custom hook yozing: u boolean qiymatni saqlaydi
          (boshlang'ich qiymat parametr sifatida beriladi, standart holatda{' '}
          <code>false</code>) va <code>[qiymat, almashtirish]</code> tuple'ini qaytaradi, bu
          yerda <code>almashtirish</code> — argumentsiz chaqirilganda qiymatni teskarisiga
          o'zgartiradigan funksiya. Qaytar tipning to'g'ri tuple sifatida saqlanishini
          ta'minlang.
        </p>
        <Solution>
          <CodeBlock lang="tsx">{`import { useState } from "react"

function useToggle(boshlangichQiymat: boolean = false): [boolean, () => void] {
  const [qiymat, setQiymat] = useState<boolean>(boshlangichQiymat)

  function almashtirish() {
    setQiymat((prev) => !prev)
  }

  return [qiymat, almashtirish]
}

// Foydalanish:
function YoritishTugmasi() {
  const [yoqilgan, almashtirish] = useToggle()

  return (
    <button onClick={almashtirish}>{yoqilgan ? "Yoqilgan" : "O'chirilgan"}</button>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Custom hook'ni generic qilib yozish (<code>useLocalStorage&lt;T&gt;</code> kabi)
          uni turli tipdagi qiymatlar bilan qayta ishlatiladigan qiladi; <code>T</code> odatda
          argumentdan avtomatik xulosa qilinadi.
        </li>
        <li>
          <code>[qiymat, setQiymat]</code> ko'rinishida qaytarilgan massiv TypeScript
          tomonidan ba'zan tuple emas, oddiy massiv deb xulosa qilinishi mumkin — bu
          destructuring qilingan elementlarning aniq tipini yo'qotadi.
        </li>
        <li>
          Buning oldini olish uchun qaytariladigan massivni <code>as const</code> bilan
          belgilang, yoki funksiyaning qaytar tipini <code>[T, Dispatch&lt;SetStateAction&lt;T&gt;&gt;]</code>{' '}
          kabi aniq tuple sifatida yozing.
        </li>
      </KeyPoints>
    </>
  )
}
