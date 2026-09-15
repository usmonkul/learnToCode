import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "enum, as const va satisfies",
  section: 'TypeScript asoslari',
}

export default function ConstAssertionsVaSatisfiesLesson() {
  return (
    <>
      <p>
        TypeScript'da bir nechta nomlangan qiymatdan birini ifodalashning bir necha usuli
        bor. Tarixiy jihatdan buning uchun <code>enum</code> kalit so'zi ishlatilgan, lekin
        ko'plab zamonaviy loyihalar undan qochib, o'rniga <strong>union literal + as const</strong>{' '}
        yondashuvini afzal ko'radi. Bu darsda ikkalasini ham ko'ramiz, farqini tushunamiz va
        obyekt literalining tipini tekshirib, lekin uni toraytirmaydigan{' '}
        <code>satisfies</code> operatori bilan tanishamiz.
      </p>

      <h2>
        <code>enum</code> — klassik yondashuv
      </h2>
      <p>
        <code>enum</code> — nomlangan qiymatlar to'plamini e'lon qilish usuli:
      </p>
      <CodeBlock lang="typescript">{`enum Holat {
  Loading,
  Success,
  Error,
}

function xabar(holat: Holat) {
  if (holat === Holat.Success) {
    console.log("Muvaffaqiyatli!")
  }
}

xabar(Holat.Success)`}</CodeBlock>
      <p>
        Yozishga oson va tanish ko'rinsa-da, <code>enum</code>ning bir nechta amaliy
        muammosi bor: u faqat TypeScript'ga xos konstruksiya (JavaScript'da <code>enum</code>{' '}
        yo'q), shuning uchun kompilyatsiyada qo'shimcha JavaScript kodi generatsiya qiladi
        (oddiy tiplardan farqli o'laroq, ular kompilyatsiyada butunlay yo'qoladi). Bundan
        tashqari, raqamli <code>enum</code>'lar odatdagidan ko'ra ancha erkinroq — masalan,{' '}
        <code>0</code> kabi oddiy sonni ham <code>Holat</code> o'rniga qabul qilishi mumkin.
      </p>

      <h2>
        Zamonaviy alternativa: union literal + <code>as const</code>
      </h2>
      <p>
        Ko'plab zamonaviy TS loyihalari <code>enum</code> o'rniga oddiy obyektni{' '}
        <code>as const</code> bilan belgilashni afzal ko'radi. <code>as const</code> —{' '}
        <strong>const assertion (o'zgarmaslik tasdig'i)</strong> bo'lib, TypeScript'ga
        obyektning har bir maydonini kengaytirilgan tip (masalan <code>string</code>) o'rniga
        aynan o'sha literal qiymat sifatida ko'rishni buyuradi:
      </p>
      <CodeBlock lang="typescript">{`const Holat = {
  Loading: "loading",
  Success: "success",
  Error: "error",
} as const

type Holat = (typeof Holat)[keyof typeof Holat] // "loading" | "success" | "error"

function xabar(holat: Holat) {
  if (holat === Holat.Success) {
    console.log("Muvaffaqiyatli!")
  }
}

xabar(Holat.Success) // "success"`}</CodeBlock>
      <p>
        Bu yondashuvning afzalliklari: natijaviy JavaScript kod hajmi kichikroq (u shunchaki
        oddiy obyekt, hech qanday qo'shimcha kod generatsiya qilinmaydi), qiymatlar oddiy
        satrlar (string) bo'lgani uchun konsolda ko'rish yoki JSON'ga serializatsiya qilish
        osonroq, va u JavaScript dasturchisiga tanish bo'lgan oddiy obyekt xatti-harakatiga
        yaqinroq.
      </p>
      <Callout type="note" title="as const'siz nima o'zgaradi?">
        Agar <code>as const</code> yozilmasa, TypeScript <code>Holat.Success</code>ning
        tipini keng <code>string</code> deb xulosa qiladi — <code>"success"</code> literal
        tipini emas. <code>as const</code> aynan shu kengaytirishning oldini olib, har bir
        maydonni o'zining aniq literal qiymatiga "muzlatadi".
      </Callout>

      <h2>
        <code>satisfies</code> — tipni tekshirish, lekin toraytirmaslik
      </h2>
      <p>
        Ba'zan obyekt literalining ma'lum bir tipga mos kelishini tekshirmoqchi bo'lasiz, lekin
        shu bilan birga uning <strong>aniq</strong> (torroq) literal tipini ham saqlab
        qolishni xohlaysiz. Buni oddiy annotatsiya bilan qilishga urinib ko'raylik — rang
        palitrasi misolida:
      </p>
      <CodeBlock lang="typescript">{`type Rang = string | [number, number, number]

const palitra: Record<string, Rang> = {
  qizil: [255, 0, 0],
  yashil: "#00ff00",
}

// Muammo: TS endi palitra.qizil ni faqat Rang deb biladi,
// uning aslida massiv ekanligini "unutadi"
palitra.qizil.length // Xatolik! Rang — string ham bo'lishi mumkin, length har doim mavjud emas`}</CodeBlock>
      <p>
        <code>satisfies</code> operatori bu ikkalasini birlashtiradi: u obyekt{' '}
        <code>Record&lt;string, Rang&gt;</code> shartiga mos kelishini tekshiradi, lekin
        o'zgaruvchining <strong>e'lon qilingan tipini</strong> kengaytirmaydi — obyekt
        o'zining asl, aniqroq literal tipida qoladi:
      </p>
      <CodeBlock lang="typescript">{`const palitra = {
  qizil: [255, 0, 0],
  yashil: "#00ff00",
} satisfies Record<string, Rang>

palitra.qizil.length          // to'g'ri — TS biladi: qizil aynan [number, number, number]
palitra.yashil.toUpperCase()  // to'g'ri — TS biladi: yashil aynan string`}</CodeBlock>
      <Callout type="tip" title="satisfies vs oddiy tip annotatsiyasi">
        Oddiy <code>: Record&lt;string, Rang&gt;</code> annotatsiyasi o'zgaruvchining tipini{' '}
        <strong>o'sha e'lon qilingan tipga</strong> tenglashtiradi — har bir maydonning aniq
        literal tipi yo'qoladi. <code>satisfies</code> esa faqat "obyekt shu shartga mos
        keladimi?" deb tekshiradi, natijada o'zgaruvchi hali ham o'zining eng aniq, xulosa
        qilingan tipida qoladi.
      </Callout>

      <Quiz
        question="const Holat = { Success: 'success' } as const yozilganda, as const nima uchun kerak?"
        options={[
          "Obyektni butunlay o'zgarmas (immutable) qilib, uni klonlashtirish uchun",
          "Har bir maydon qiymatini keng string o'rniga aniq literal tipga \"muzlatish\" uchun",
          "Obyektni enum'ga avtomatik aylantirish uchun",
          "TypeScript kompilyatsiyasini tezlashtirish uchun",
        ]}
        correctIndex={1}
        explanation={`as const bo'lmasa, TypeScript Holat.Success ni keng string deb xulosa qiladi. as const har bir maydonni o'zining aniq literal qiymatiga (masalan "success") toraytirib, ularni o'zgartirib bo'lmaydigan qilib belgilaydi.`}
      />

      <Exercise title="Mashq">
        <p>
          Buyurtma holatlarini ifodalovchi <code>as const</code> obyekt yarating:{' '}
          <code>BuyurtmaHolati</code> nomli obyekt <code>Yangi</code>, <code>Jonatildi</code>{' '}
          va <code>Yetkazildi</code> kalitlariga mos <code>"yangi"</code>,{' '}
          <code>"jonatildi"</code>, <code>"yetkazildi"</code> qiymatlarini saqlasin. Shu
          obyektdan <code>BuyurtmaHolati</code> nomli union tip hosil qiling (barcha
          qiymatlarning union'i) va uni qabul qiluvchi <code>holatniChop(holat: BuyurtmaHolati)</code>{' '}
          funksiyasini yozing.
        </p>
        <Solution>
          <CodeBlock lang="typescript">{`const BuyurtmaHolati = {
  Yangi: "yangi",
  Jonatildi: "jonatildi",
  Yetkazildi: "yetkazildi",
} as const

type BuyurtmaHolati = (typeof BuyurtmaHolati)[keyof typeof BuyurtmaHolati]

function holatniChop(holat: BuyurtmaHolati) {
  console.log(\`Buyurtma holati: \${holat}\`)
}

holatniChop(BuyurtmaHolati.Jonatildi) // Buyurtma holati: jonatildi`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>enum</code> nomlangan qiymatlar to'plamini beradi, lekin qo'shimcha
          JavaScript kodi generatsiya qiladi va raqamli variantlarda kutilganidan erkinroq
          bo'ladi.
        </li>
        <li>
          Zamonaviy TS kodida ko'pincha oddiy obyektni <code>as const</code> bilan
          belgilash afzal ko'riladi — kichikroq chiqadigan JS va oddiy obyekt xatti-harakati
          uchun.
        </li>
        <li>
          <code>as const</code> obyekt maydonlarini keng tiplar (masalan{' '}
          <code>string</code>) o'rniga aniq literal qiymatlarga "muzlatadi".
        </li>
        <li>
          <code>satisfies</code> obyekt literalining ma'lum bir tipga mos kelishini
          tekshiradi, lekin uning aniq, xulosa qilingan literal tipini kengaytirmasdan
          saqlab qoladi.
        </li>
      </KeyPoints>
    </>
  )
}
