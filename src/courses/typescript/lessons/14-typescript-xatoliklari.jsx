import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Keng tarqalgan xatolar va anti-patternlar',
  section: 'TypeScript asoslari',
}

export default function TypeScriptAntiPatternsLesson() {
  return (
    <>
      <p>
        TypeScript'ning butun ma'nosi — xatolarni ishga tushirishdan (runtime) oldin, kompilyatsiya
        paytida topish. Lekin kompilyator xato ko'rsatganda, uni "yashirish" yo'llari ham bor —
        va aynan shu yo'llar TypeScript'ning foydasini yo'qqa chiqaradi. Bu darsda eng ko'p
        uchraydigan to'rtta anti-patternni ko'ramiz.
      </p>
      <Callout type="tip" title="Asosiy qoida">
        TypeScript xatosini ko'rganingizda, uni <strong>yashirishga emas</strong>, sababini{' '}
        <strong>tushunishga</strong> harakat qiling. Har bir usul — <code>any</code>,{' '}
        <code>!</code>, <code>as</code>, <code>@ts-ignore</code> — biror joyda haqiqatan ham
        kerak bo'lishi mumkin, lekin ular "tezroq ishlab ketsin" degan sabab bilan qo'llanilsa,
        muammoni yo'qotmaydi, faqat uni keyinroqqa, ishlash vaqtiga (runtime) o'tkazadi.
      </Callout>

      <h2>
        <code>any</code>dan suiiste'mol qilish
      </h2>
      <p>
        Funksiya parametrining tipini qanday yozishni bilmay qolganda, eng oson yo'l —{' '}
        <code>any</code> qo'yib qo'yish. Bu ishlaydi, lekin narxi katta: <code>any</code> tipidagi
        qiymat uchun TypeScript butunlay tip tekshiruvini o'chirib qo'yadi.
      </p>
      <CodeBlock lang="typescript">{`function jamlaQiymatlarni(royxat: any) {
  return royxat.reduce((yigindi, son) => yigindi + son, 0)
}

// Kompilyator hech qanday xato bermaydi — lekin bu ishlashda buziladi:
jamlaQiymatlarni("men_royxat_emasman") // runtime xatosi, kompilyator sukut saqladi`}</CodeBlock>
      <p>
        Muammo shundaki, <code>any</code> "yuqadi" — <code>any</code> tipidagi qiymatdan
        foydalanilgan har qanday joy ham o'z tip xavfsizligini yo'qotadi. Ko'pincha to'g'ri yechim
        — kerakli aniq tipni yozish (<code>number[]</code>), yoki tip hali noma'lum bo'lsa,{' '}
        <code>unknown</code>dan foydalanish — u <code>any</code>dek moslashuvchan, lekin
        qiymatdan foydalanishdan oldin uning tipini tekshirishga majbur qiladi.
      </p>

      <h2>
        Non-null assertion (<code>!</code>) xavfi
      </h2>
      <p>
        <code>!</code> belgisi ("non-null assertion operator") kompilyatorga "ishonch bering,
        bu qiymat <code>null</code> yoki <code>undefined</code> emas" deb aytadi — lekin bu
        haqiqiy tekshiruv emas, faqat kompilyatorni jim qildirish:
      </p>
      <CodeBlock lang="typescript">{`function foydalanuvchiIsmi(foydalanuvchi: { ism?: string }) {
  return foydalanuvchi.ism!.toUpperCase() // "ism har doim bor" deb da'vo qilinmoqda
}

foydalanuvchiIsmi({}) // TypeScript xato bermaydi, lekin runtime'da xatolik: undefined'ning toUpperCase'i yo'q`}</CodeBlock>
      <p>
        Agar <code>ism</code> haqiqatan ham <code>undefined</code> bo'lib chiqsa, dastur ishga
        tushgandan keyin qulaydi (crash) — aynan TypeScript'ning oldini olishi kerak bo'lgan
        xatolik turi. To'g'riroq yondashuv — qiymatni haqiqatan tekshirish:
      </p>
      <CodeBlock lang="typescript">{`function foydalanuvchiIsmi(foydalanuvchi: { ism?: string }) {
  if (!foydalanuvchi.ism) {
    return "Noma'lum"
  }
  return foydalanuvchi.ism.toUpperCase() // bu yerda TypeScript ism string ekanini biladi
}`}</CodeBlock>

      <h2>
        <code>as</code> bilan majburiy cast qilish
      </h2>
      <p>
        <code>as</code> kalit so'zi bir tipni boshqasiga "majburlab" o'zgartiradi — lekin bu ham
        haqiqiy tekshiruv emas, faqat kompilyatorga "bu qiymatni boshqacha tipda ko'r" deyish:
      </p>
      <CodeBlock lang="typescript">{`type Foydalanuvchi = { ism: string; yosh: number }

function malumotOl(): unknown {
  return { ism: 'Ali' } // yosh yo'q!
}

const foydalanuvchi = malumotOl() as Foydalanuvchi
console.log(foydalanuvchi.yosh.toFixed(0)) // runtime xatosi: yosh undefined`}</CodeBlock>
      <p>
        <code>as</code> tipni haqiqatan <strong>tekshirmaydi</strong> — u faqat kompilyatorga
        "menga ishoning" deydi, obyektning haqiqiy shaklini o'zgartirmaydi. Ba'zi holatlarda (masalan,
        DOM elementlari bilan ishlaganda) <code>as</code> haqiqatan zarur bo'ladi, lekin uni
        "tipni moslashtirish qiyin bo'lgani uchun" ishlatish — anti-pattern.
      </p>

      <h2>
        <code>@ts-ignore</code> va <code>@ts-expect-error</code>
      </h2>
      <p>
        Ikkalasi ham keyingi qatordagi TypeScript xatosini bostiradi, lekin muhim farq bor:
      </p>
      <CodeBlock lang="typescript">{`// @ts-ignore — xato bor-yo'qligidan qat'iy nazar, keyingi qatorni jim qiladi
// @ts-ignore
const son: number = "bu string" // xato bostirildi, lekin hech kim bilmaydi

// @ts-expect-error — xuddi shunday bostiradi, LEKIN agar keyingi qatorda
// haqiqatan xato bo'lmasa, o'ZI xato chiqaradi
// @ts-expect-error
const son2: number = "bu ham string" // hozircha xato bor, shuning uchun jim`}</CodeBlock>
      <p>
        Farq shunda: agar kimdir keyinchalik kodni tuzatib, xatoni yo'qotsa,{' '}
        <code>@ts-ignore</code> hech narsa demaydi — izoh keraksiz bo'lib qolgani haqida hech kim
        bilmaydi. <code>@ts-expect-error</code> esa aynan shu holatda o'zi yangi xato chiqaradi
        ("Unused '@ts-expect-error' directive"), chunki kutilgan xato endi yo'q. Shu sababli{' '}
        <code>@ts-expect-error</code> odatda afzalroq — u o'z-o'zini yangilab turadi.
      </p>

      <Quiz
        question={`@ts-ignore o'rniga @ts-expect-error'ni afzal ko'rish odatda tavsiya qilinadi, chunki...`}
        options={[
          "@ts-expect-error tezroq ishlaydi",
          "@ts-expect-error keyingi qatorda xato yo'qolib qolsa, o'zi signal (yangi xato) beradi, @ts-ignore esa jim qolaveradi",
          "@ts-ignore faqat eski TypeScript versiyalarida ishlaydi",
          "@ts-expect-error butun faylni emas, faqat bitta funksiyani tekshirishdan chiqarib tashlaydi",
        ]}
        correctIndex={1}
        explanation={`@ts-expect-error o'zi bostirgan xato haqiqatan mavjud bo'lishini talab qiladi — agar kod tuzatilib xato yo'qolsa, u "kerak bo'lmagan directive" haqida yangi xato chiqaradi. @ts-ignore esa xato bor-yo'qligidan qat'i nazar doim jim qoladi, shuning uchun eskirgan bostirishlar sezilmay qolib ketishi mumkin.`}
      />

      <Exercise title="Mashq">
        <p>
          Quyidagi kodda uchta anti-pattern bor: <code>any</code> parametr, ortiqcha{' '}
          <code>!</code> ishlatilishi va keraksiz <code>as</code>. Kodni o'qing va uni to'g'riroq
          — <code>any</code>siz, <code>!</code>siz va <code>as</code>siz — qayta yozing:
        </p>
        <CodeBlock lang="typescript">{`type Mahsulot = { nomi: string; narxi?: number }

function narxChiqar(mahsulot: any) {
  const narx = mahsulot.narxi!
  return (narx as number).toFixed(2)
}`}</CodeBlock>
        <Solution>
          <CodeBlock lang="typescript">{`type Mahsulot = { nomi: string; narxi?: number }

function narxChiqar(mahsulot: Mahsulot) {
  if (mahsulot.narxi === undefined) {
    return "Narx ko'rsatilmagan"
  }
  return mahsulot.narxi.toFixed(2)
}`}</CodeBlock>
          <p>
            Endi parametr aniq <code>Mahsulot</code> tipida, <code>narxi</code>ning{' '}
            <code>undefined</code> bo'lishi mumkinligi haqiqatan tekshirilyapti (assertion emas),
            va shu tekshiruvdan keyin TypeScript o'zi <code>narxi</code>ning <code>number</code>{' '}
            ekanini biladi — <code>as</code> kerak emas.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>any</code> butun tip tekshiruvini o'chiradi va "yuqadi" — o'rniga aniq tip yoki{' '}
          <code>unknown</code>dan foydalaning.
        </li>
        <li>
          Non-null assertion (<code>!</code>) haqiqiy tekshiruv emas — qiymat kutilganidek
          bo'lmasa, xatolik runtime'da chiqadi.
        </li>
        <li>
          <code>as</code> bilan cast qilish tipni "bostiradi", lekin obyektning haqiqiy shaklini
          tekshirmaydi.
        </li>
        <li>
          <code>@ts-expect-error</code> odatda <code>@ts-ignore</code>dan afzalroq, chunki xato
          yo'qolganda o'zi signal beradi.
        </li>
        <li>
          TypeScript xatosini ko'rganda, uni yashirish emas, sababini tushunish — to'g'ri odat.
        </li>
      </KeyPoints>
    </>
  )
}
