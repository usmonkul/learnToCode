import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Context va tashqi ma'lumotlarni tiplashtirish",
  section: 'TypeScript va React',
}

export default function ContextAndApiTypesLesson() {
  return (
    <>
      <p>
        Bu darsda ikkita, bir-biriga o'xshash muammoni ko'ramiz: ikkalasida ham TypeScript'ga
        "siz to'liq nazorat qila olmaydigan" narsa haqida ma'lumot berish kerak bo'ladi. Birinchisi
        — <code>Context</code>: u boshlanishida <code>undefined</code> bo'lishi mumkin, lekin
        foydalanish joyida deyarli hech qachon shunday bo'lmasligi kerak. Ikkinchisi — tashqi
        API'dan kelgan javob: siz uning shaklini <code>interface</code> orqali tasvirlaysiz,
        lekin bu tasvir haqiqiy runtime kafolatiga aylanmaydi.
      </p>

      <h2>Context'ni tiplashtirish: <code>undefined</code> holatini xavfsiz yopish</h2>
      <p>
        <code>createContext</code>ga boshlang'ich qiymat sifatida odatda ikkita variantdan
        birini berasiz: haqiqiy, mazmunli "bo'sh" qiymat (masalan, standart tema obyekti), yoki{' '}
        <code>undefined</code> — agar mazmunli standart qiymat umuman bo'lmasa (masalan,
        foydalanuvchi ma'lumoti — hali tizimga kirilmagan holatda "bo'sh foydalanuvchi" degan
        narsa mantiqan noto'g'ri). Ikkinchi holatda context tipini <code>T | undefined</code>{' '}
        deb e'lon qilamiz:
      </p>
      <CodeBlock lang="tsx">{`interface AuthContextValue {
  foydalanuvchi: { id: number; ism: string } | null
  chiqish: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)`}</CodeBlock>
      <p>
        Muammo shunda: agar komponentlar <code>useContext(AuthContext)</code>ni to'g'ridan-to'g'ri
        chaqirsa, ularning har biri qiymatni ishlatishdan oldin <code>undefined</code> holatini
        tekshirib o'tirishi kerak bo'ladi — bu takrorlanadi va oson unutiladi. Yaxshiroq yechim —
        buni bitta custom hook ichiga yopish, u <code>undefined</code>ni tekshiradi va faqat
        haqiqiy, non-undefined qiymatni qaytaradi (yoki context Provider'siz ishlatilsa, aniq
        xatolik chiqaradi):
      </p>
      <CodeBlock lang="tsx">{`function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth AuthContext.Provider ichida ishlatilishi kerak")
  }

  return context
}

// Endi boshqa komponentlarda:
function ProfilTugmasi() {
  const { foydalanuvchi, chiqish } = useAuth() // bu yerda tip AuthContextValue, undefined emas
  // ...
}`}</CodeBlock>
      <p>
        Bu naqsh ikki narsani birlashtiradi: agar dasturchi <code>useAuth</code>ni tegishli{' '}
        <code>Provider</code>dan tashqarida ishlatib qo'ysa, xatolik darhol, aniq xabar bilan
        chiqadi (uzoq izlanadigan <code>undefined</code> bilan bog'liq bug' emas); va{' '}
        <code>useAuth</code>dan qaytgan qiymatning tipi endi oddiy, aniq{' '}
        <code>AuthContextValue</code> — uni ishlatgan joyda hech qanday qo'shimcha{' '}
        <code>undefined</code> tekshiruvi kerak emas.
      </p>
      <Callout type="tip" title="Nega context'ni to'g'ridan-to'g'ri eksport qilmaslik">
        Odatda <code>AuthContext</code>ning o'zini boshqa fayllarga eksport qilmay, faqat{' '}
        <code>useAuth</code> hook'ini va <code>AuthProvider</code> komponentini eksport qilish
        yaxshi amaliyot hisoblanadi — shunda barcha foydalanuvchilar majburan xavfsiz hook
        orqali murojaat qiladi, <code>undefined</code> tekshiruvini "unutish" imkoniyati umuman
        yo'qoladi.
      </Callout>

      <h2>API javoblarini tiplashtirish — va uning chegarasi</h2>
      <p>
        Tashqi API'dan ma'lumot olganda, javob shaklini tasvirlaydigan <code>interface</code>{' '}
        yozish odatiy holat:
      </p>
      <CodeBlock lang="tsx">{`interface Foydalanuvchi {
  id: number
  ism: string
  email: string
}

async function foydalanuvchiniOl(id: number): Promise<Foydalanuvchi> {
  const javob = await fetch(\`/api/foydalanuvchilar/\${id}\`)
  const data = (await javob.json()) as Foydalanuvchi
  return data
}`}</CodeBlock>
      <p>
        Bu kod muammosiz kompilyatsiya bo'ladi, va <code>foydalanuvchiniOl</code>dan qaytgan
        qiymat bilan ishlashda TypeScript sizga to'liq intellisense va tip tekshiruvini beradi.
        Lekin shuni aniq tushunish kerak: <code>as Foydalanuvchi</code> — bu{' '}
        <strong>ishonch bildirish (assertion)</strong>, tekshiruv emas. Agar server kutilganidan
        boshqacha shaklda ma'lumot qaytarsa (masalan, <code>email</code> maydoni yo'q, yoki{' '}
        <code>id</code> satr sifatida kelsa), <code>response.json()</code> baribir muvaffaqiyatli
        ishlaydi va hech qanday xatolik bermaydi — TypeScript esa siz "his qilgan" (asserted)
        tipga ishonib, xato ma'lumot bilan ham xuddi to'g'ri <code>Foydalanuvchi</code> kabi
        ishlashda davom etadi.
      </p>
      <Callout type="warning" title="TypeScript kompilyatsiya vaqtida ishlaydi, runtime'da emas">
        <code>interface</code> va <code>as</code> orqali qilingan tasvir faqat kompilyatsiya
        vaqtida mavjud — build tugagach, bu ma'lumot butunlay yo'qoladi (JavaScript'ga
        aylantirilgan kodda hech qanday tip tekshiruvi qolmaydi). Shu sababli tashqi manbadan
        (API, foydalanuvchi kiritgan fayl va h.k.) kelgan ma'lumotni chindan ham tekshirish
        kerak bo'lsa, buni runtime'da qiladigan alohida vosita (masalan, Zod kabi
        validatsiya kutubxonalari) kerak bo'ladi — bu kursning doirasidan tashqarida, lekin
        katta loyihalarda tez-tez uchraydigan muhim mavzu.
      </Callout>

      <Quiz
        question={`const data = (await javob.json()) as Foydalanuvchi qatori haqida qaysi tasdiq to'g'ri?`}
        options={[
          "Bu qator server haqiqatan ham Foydalanuvchi shaklidagi ma'lumot qaytarganini runtime'da tekshiradi",
          "Bu faqat TypeScript'ga \"bu qiymatni Foydalanuvchi deb hisobla\" deyish, xolos — runtime'da hech qanday tekshiruv sodir bo'lmaydi",
          "Agar server boshqacha shakldagi ma'lumot qaytarsa, bu qator xatolik tashlaydi",
          "as Foydalanuvchi build tugagandan keyin ham runtime tekshiruvi sifatida ishlashda davom etadi",
        ]}
        correctIndex={1}
        explanation={`"as" — bu TypeScript'ga qaratilgan ishonch bildirish (assertion): u faqat kompilyatsiya vaqtida ishlaydi va hech qanday runtime tekshiruvi qo'shmaydi. Agar server kutilganidan boshqacha ma'lumot qaytarsa, kod baribir davom etadi, faqat endi noto'g'ri ma'lumot bilan — buni ushlash uchun alohida runtime-validatsiya kerak bo'ladi.`}
      />

      <Exercise title="Mashq">
        <p>
          <code>ThemeContext</code> nomli context yarating — u{' '}
          <code>{'{ mode: "light" | "dark"; almashtirish: () => void }'}</code> shaklidagi
          qiymatni saqlasin, boshlang'ich qiymati <code>undefined</code> bo'lsin. Shu context
          asosida <code>useTheme()</code> nomli custom hook yozing — u <code>undefined</code>{' '}
          holatini tekshirib, agar <code>Provider</code>siz chaqirilsa aniq xatolik chiqarsin,
          aks holda xavfsiz, non-undefined qiymatni qaytarsin.
        </p>
        <Solution>
          <CodeBlock lang="tsx">{`import { createContext, useContext } from "react"

interface ThemeContextValue {
  mode: "light" | "dark"
  almashtirish: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error("useTheme ThemeContext.Provider ichida ishlatilishi kerak")
  }

  return context
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Context'ni <code>createContext&lt;T | undefined&gt;(undefined)</code> bilan e'lon
          qilib, undan foydalanishni faqat custom hook orqali ochish — hook{' '}
          <code>undefined</code>ni tekshirib, tashqariga har doim aniq, non-undefined tipni
          beradi.
        </li>
        <li>
          Provider'siz chaqirilganda hook aniq xatolik tashlashi kerak — bu dasturchi
          xatosini darhol, aniq xabar bilan ko'rsatadi.
        </li>
        <li>
          API javobi uchun <code>interface</code> yozish TypeScript'ga faqat kompilyatsiya
          vaqtidagi tasvir beradi — <code>response.json()</code> va <code>as</code> runtime'da
          hech narsani tekshirmaydi, shuning uchun chindan ham noma'lum manbadan kelgan
          ma'lumotga ishonch kerak bo'lsa, alohida runtime-validatsiya vositasi zarur bo'ladi.
        </li>
      </KeyPoints>
    </>
  )
}
