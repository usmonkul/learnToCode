import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Asosiy tiplar',
  section: 'TypeScript asoslari',
}

export default function BasicTypesLesson() {
  return (
    <>
      <p>
        Har qanday TypeScript kodi asosiy (primitive) tiplarni belgilashdan boshlanadi. Bu
        darsda eng ko'p ishlatiladigan tiplarni — <code>string</code>, <code>number</code>,{' '}
        <code>boolean</code>, massivlar, tuple'lar va ikkita maxsus tip — <code>any</code> va{' '}
        <code>unknown</code>ni ko'rib chiqamiz.
      </p>

      <h2>Asosiy primitivlar</h2>
      <p>
        Tip annotatsiyasi o'zgaruvchi nomidan keyin ikki nuqta (<code>:</code>) bilan yoziladi:
      </p>
      <CodeBlock lang="typescript">{`let ism: string = "Aziz"
let yosh: number = 25
let faol: boolean = true`}</CodeBlock>
      <p>
        <code>number</code> tipi butun sonlar va kasr sonlarning ikkalasi uchun ham ishlatiladi
        — JavaScript'da bo'lgani kabi, TypeScript'da ham <code>int</code> va <code>float</code>{' '}
        alohida tiplar sifatida mavjud emas.
      </p>

      <h2>Massivlar</h2>
      <p>
        Massiv tipini ikki xil usulda yozish mumkin — ikkalasi ham bir xil ma'noni bildiradi:
      </p>
      <CodeBlock lang="typescript">{`let ismlar: string[] = ["Ali", "Vali", "Laylo"]
let ismlar2: Array<string> = ["Ali", "Vali", "Laylo"]

let sonlar: number[] = [1, 2, 3]`}</CodeBlock>
      <p>
        Ikkala yozuv ham funksional jihatdan bir xil — <code>string[]</code> ko'proq
        ishlatiladi, chunki u qisqaroq va o'qish osonroq, lekin <code>Array&lt;string&gt;</code>{' '}
        ko'rinishini ham kodda uchratib qolishingiz mumkin.
      </p>

      <h2>Tuple — uzunligi va tiplari qat'iy belgilangan massiv</h2>
      <p>
        Oddiy massivdan farqli o'laroq, <strong>tuple</strong> — har bir o'rindagi tip aniq
        belgilangan, uzunligi qat'iy massiv. Masalan, koordinatani ifodalash uchun:
      </p>
      <CodeBlock lang="typescript">{`let koordinata: [number, number] = [41.3, 69.2]

let foydalanuvchi: [string, number] = ["Aziz", 25]
// foydalanuvchi[0] — har doim string
// foydalanuvchi[1] — har doim number`}</CodeBlock>
      <p>
        Agar tartibni yoki tiplarni buzsangiz (masalan, <code>[25, "Aziz"]</code> desangiz),
        TypeScript xato beradi — bu oddiy <code>(string | number)[]</code> massividan farqli
        o'laroq, har bir pozitsiyaning ma'nosi qat'iy belgilanganini bildiradi.
      </p>

      <h2>
        <code>null</code> va <code>undefined</code>
      </h2>
      <p>
        JavaScript'dagi kabi, TypeScript'da ham <code>null</code> va <code>undefined</code> —
        "qiymat yo'q"ligini bildiruvchi ikkita alohida tip:
      </p>
      <CodeBlock lang="typescript">{`let izoh: string | null = null
izoh = "Bu izoh matni"`}</CodeBlock>
      <p>
        Bu yerdagi <code>string | null</code> — <strong>union tip</strong> (bir nechta tipdan
        birini bildiradi), keyingi darslarda bu haqida batafsilroq gaplashamiz.
      </p>

      <h2>
        <code>any</code> vs <code>unknown</code>
      </h2>
      <p>
        <code>any</code> — eng "erkin" tip: unga istalgan qiymatni berish mumkin, va u ustida
        istalgan amalni tip xatosisiz bajarish mumkin:
      </p>
      <CodeBlock lang="typescript">{`let narsa: any = "matn"
narsa = 5           // xato yo'q
narsa.qandaydirMetod() // xato yo'q, garchi bunday metod mavjud bo'lmasa ham!`}</CodeBlock>
      <Callout type="danger" title="any — tip tekshiruvini butunlay o'chirib qo'yadi">
        <code>any</code> ishlatilgan o'zgaruvchi uchun TypeScript hech qanday tekshiruv
        qilmaydi — bu, aslida, o'sha o'zgaruvchi uchun TypeScript'ni butunlay
        "o'chirib qo'yish" bilan barobar. Kod ko'rinishda tip xavfsiz tuyulishi mumkin, lekin
        haqiqatda oddiy JavaScript kabi xavfli bo'lib qoladi. <code>any</code>'dan faqat
        chinakam iloji bo'lmagan holatlarda (masalan, tipini bilib bo'lmaydigan uchinchi
        tomon kutubxonasi bilan ishlaganda) va vaqtinchalik yechim sifatida foydalaning.
      </Callout>
      <p>
        <code>unknown</code> — <code>any</code>ga o'xshab istalgan qiymatni qabul qiladi, lekin
        undan farqli o'laroq, uni ishlatishdan oldin tipini <strong>tekshirishni (narrowing)</strong>{' '}
        talab qiladi:
      </p>
      <CodeBlock lang="typescript">{`let narsa: unknown = "matn"

narsa.toUpperCase() // Xato: narsa hali "unknown", tekshirilmagan

if (typeof narsa === "string") {
  narsa.toUpperCase() // OK — bu yerda TypeScript narsa string ekanini biladi
}`}</CodeBlock>
      <p>
        Shu sababli <code>unknown</code> — <code>any</code>ning xavfsizroq muqobili: u sizni
        "bu qiymat nima ekanini bilmayman, ishlatishdan oldin tekshir" deb majburlaydi, buning
        o'rniga <code>any</code> esa hech qanday himoya bermaydi.
      </p>

      <Quiz
        question={`"any" va "unknown" o'rtasidagi asosiy farq nimada?`}
        options={[
          "Ular bir xil, faqat nomi boshqacha",
          "any istalgan amalni tekshiruvsiz ruxsat beradi, unknown esa ishlatishdan oldin tip tekshiruvini talab qiladi",
          "unknown faqat massivlar uchun, any esa faqat obyektlar uchun ishlatiladi",
          "any faqat funksiyalarda, unknown esa faqat o'zgaruvchilarda ishlatiladi",
        ]}
        correctIndex={1}
        explanation="any tip tekshiruvini butunlay o'chirib qo'yadi — undan istalgan amalni xatosiz bajarish mumkin. unknown esa xavfsizroq: qiymat ustida biror amal bajarishdan oldin uning haqiqiy tipini tekshirish (masalan, typeof orqali) talab qilinadi."
      />

      <Exercise title="Mashq">
        <p>
          Quyidagi o'zgaruvchilar uchun to'g'ri tip annotatsiyasini yozing:
        </p>
        <CodeBlock lang="typescript">{`let sarlavha = "Kitoblar ro'yxati"
let sahifalar = 320
let mavjud = true
let janrlar = ["fantastika", "tarix", "biografiya"]
let kitob = ["1984", 1949] // nom va nashr yili`}</CodeBlock>
        <Solution>
          <CodeBlock lang="typescript">{`let sarlavha: string = "Kitoblar ro'yxati"
let sahifalar: number = 320
let mavjud: boolean = true
let janrlar: string[] = ["fantastika", "tarix", "biografiya"]
let kitob: [string, number] = ["1984", 1949] // nom va nashr yili`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Asosiy tiplar — <code>string</code>, <code>number</code>, <code>boolean</code> —
          o'zgaruvchi nomidan keyin <code>:</code> bilan yoziladi.
        </li>
        <li>
          Massivlar <code>string[]</code> yoki <code>Array&lt;string&gt;</code> ko'rinishida
          yozilishi mumkin — ikkalasi bir xil ma'noni bildiradi.
        </li>
        <li>
          Tuple (<code>[string, number]</code>) — har bir o'rindagi tip va uzunlik qat'iy
          belgilangan massiv.
        </li>
        <li>
          <code>null</code> va <code>undefined</code> — "qiymat yo'q"ligini bildiruvchi
          alohida tiplar.
        </li>
        <li>
          <code>any</code> tip tekshiruvini butunlay o'chirib qo'yadi va xavfli hisoblanadi;{' '}
          <code>unknown</code> esa ishlatishdan oldin tekshirishni talab qiluvchi xavfsizroq
          muqobil.
        </li>
      </KeyPoints>
    </>
  )
}
