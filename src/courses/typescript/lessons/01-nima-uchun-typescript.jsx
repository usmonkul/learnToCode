import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Nima uchun TypeScript?',
  section: 'TypeScript asoslari',
}

export default function WhyTypeScriptLesson() {
  return (
    <>
      <p>
        Agar siz JavaScript'ni bilsangiz, TypeScript sizga tanish tuyuladi — chunki u aynan
        shu JavaScript, faqat ustiga <strong>statik tip tekshiruvi (static type checking)</strong>{' '}
        qo'shilgan. TypeScript'da yozilgan har qanday kod, aslida, deyarli har doim to'g'ri
        JavaScript ham hisoblanadi — farq shundaki, TypeScript sizga o'zgaruvchilar, funksiyalar
        va obyektlarning "shakli" (qanday tipdagi qiymatlarni saqlashi kerakligi) haqida oldindan
        aytib qo'yish imkonini beradi.
      </p>
      <p>
        Bu darsda TypeScript aslida nima ekanini, u qanday ishlashini va nega hozirgi zamonaviy
        frontend loyihalarining aksariyati u bilan yozilishini ko'rib chiqamiz.
      </p>

      <h2>TypeScript = JavaScript + tiplar</h2>
      <p>
        TypeScript'ni alohida dasturlash tili deb emas, JavaScript'ning ustiga qurilgan qatlam
        deb tasavvur qiling. Siz oddiy JavaScript sintaksisini yozasiz, lekin qo'shimcha ravishda
        qiymatlarning tipini ham belgilashingiz mumkin:
      </p>
      <CodeBlock lang="typescript">{`// Oddiy JavaScript
function qoshish(a, b) {
  return a + b
}

// TypeScript — parametrlar tipi bilan
function qoshish(a: number, b: number): number {
  return a + b
}`}</CodeBlock>
      <p>
        Muhim jihat: brauzer ham, Node.js ham TypeScript kodini{' '}
        <strong>bevosita tushunmaydi</strong>. TypeScript fayllari (<code>.ts</code>) avval oddiy
        JavaScript'ga <strong>tarjima (transpile)</strong> qilinishi kerak — bu jarayonda barcha
        tip annotatsiyalari olib tashlanadi va faqat toza JavaScript qoladi. Yuqoridagi misol
        tarjima qilingandan keyin quyidagicha ko'rinadi:
      </p>
      <CodeBlock lang="typescript">{`function qoshish(a, b) {
  return a + b
}`}</CodeBlock>

      <h2>Asosiy foyda: xatolarni yozish paytida topish</h2>
      <p>
        JavaScript'da ko'p xatolar dastur ishga tushgandan keyin, kutilmagan joyda paydo bo'ladi.
        TypeScript esa bu xatolarning ko'pini siz kodni <strong>hali yozayotganingizda</strong> —
        kompilyatsiya (compile-time) bosqichida — aniqlab beradi:
      </p>
      <CodeBlock lang="typescript">{`function qoshish(a: number, b: number): number {
  return a + b
}

qoshish(5, "10") // Xato: "10" — string, number emas`}</CodeBlock>
      <p>
        Bundan tashqari, TypeScript IDE'larga (masalan, VS Code) o'zgaruvchi yoki obyektning
        qanday xususiyatlarga ega ekanini aniq aytib berish orqali{' '}
        <strong>avtomatik to'ldirish (autocomplete)</strong>ni ancha aniqroq qiladi va katta
        loyihada bir joyni o'zgartirganda boshqa joylar buzilib qolmasligiga ishonch bilan{' '}
        <strong>refaktoring</strong> qilish imkonini beradi — ayniqsa bir nechta dasturchi
        birga ishlaydigan jamoaviy loyihalarda bu juda qimmatli.
      </p>
      <Callout type="tip" title="Jamoaviy loyihalarda TypeScript nega ko'proq foyda beradi">
        Kichik, yakka o'zingiz yozadigan skriptda siz butun kodni yodda tutasiz. Lekin o'nlab
        fayl va bir nechta dasturchi bo'lgan loyihada hech kim har bir funksiyaning qanday
        qiymat kutishini eslab yura olmaydi — TypeScript bu ma'lumotni kod ichida "hujjatlashtirib"
        qo'yadi va boshqa birov noto'g'ri qiymat bersa, darhol ogohlantiradi.
      </Callout>

      <h2>Amalda qanday ishlatiladi</h2>
      <p>
        Hozirgi kunda deyarli barcha zamonaviy frontend loyihalar — Vite bilan yaratilgan React
        loyihalari, Next.js loyihalari va h.k. — boshidanoq TypeScript bilan sozlangan holda
        boshlanadi. Yaxshi xabar shundaki, sizga odatda TypeScript kompilyatori (<code>tsc</code>)ni
        qo'lda ishga tushirishning hojati yo'q — buni bundler yoki dev-server (Vite kabi) o'zi,
        fon rejimida, avtomatik bajaradi. Siz shunchaki <code>.ts</code>/<code>.tsx</code>{' '}
        faylga kod yozasiz, qolganini asboblar o'zi qiladi.
      </p>

      <Callout type="warning" title="TypeScript runtime'da hech narsani tekshirmaydi">
        Bu — eng ko'p noto'g'ri tushuniladigan joylardan biri: TypeScript'ning tip tekshiruvi
        faqat <strong>yozish va qurish (build) bosqichida</strong> ishlaydi. Kod JavaScript'ga
        aylantirilgach, barcha tip ma'lumotlari yo'qoladi va dastur{' '}
        <strong>ishlab turgan paytda (runtime'da)</strong> hech qanday tip tekshiruvi
        bajarilmaydi. Agar dasturga tashqaridan (masalan, API javobidan) kutilmagan shakldagi
        ma'lumot kelsa, TypeScript buni ushlab qololmaydi — bu haligacha sizning
        mas'uliyatingizda qoladi.
      </Callout>

      <Quiz
        question="TypeScript kodini brauzer yoki Node.js ishga tushirishidan oldin nima sodir bo'ladi?"
        options={[
          "Hech narsa — brauzer TypeScript'ni to'g'ridan-to'g'ri tushunadi",
          "U oddiy JavaScript'ga tarjima (transpile) qilinadi, tip annotatsiyalari esa olib tashlanadi",
          "TypeScript kodi avtomatik ravishda Python'ga aylantiriladi",
          "TypeScript kodi runtime'da tiplarni tekshirib, keyin ishga tushadi",
        ]}
        correctIndex={1}
        explanation="TypeScript brauzer yoki Node tomonidan bevosita tushunilmaydi. Kod avval kompilyator (masalan, tsc yoki Vite kabi bundler ichidagi vosita) orqali oddiy JavaScript'ga tarjima qilinadi, va bu jarayonda barcha tip annotatsiyalari yo'qoladi."
      />

      <Exercise title="Mashq">
        <p>
          O'z so'zlaringiz bilan tushuntirib bering: nega TypeScript "runtime'da hech qanday
          tip tekshiruvi bajarmaydi" degan gap to'g'ri, va bu amalda qanday oqibatlarga olib
          kelishi mumkin (masalan, tashqi API'dan kelgan ma'lumot bilan ishlaganda)?
        </p>
        <Solution>
          <p>
            TypeScript'ning tip tekshiruvi faqat kod yozilayotganda va kompilyatsiya (build)
            bosqichida ishlaydi — u sizning kod yozish vaqtingizda xatolarni topadigan vosita,
            xolos. Kod JavaScript'ga aylantirilgach, barcha <code>: number</code>,{' '}
            <code>: string</code> kabi annotatsiyalar butunlay olib tashlanadi, chunki oddiy
            JavaScript ularni tushunmaydi. Shu sababli, agar dastur ishlab turgan paytda
            tashqaridan (masalan, tarmoq orqali kelgan API javobidan) kutilganidan boshqacha
            shakldagi ma'lumot kelsa — masalan, <code>number</code> kutilgan joyga{' '}
            <code>null</code> kelsa — TypeScript buni ushlab qololmaydi, chunki bu tekshiruv
            allaqachon o'chib ketgan. Shu sababli tashqi manbalardan kelgan ma'lumotni har doim
            ehtiyotkorlik bilan, runtime'da ham tekshirish (validatsiya) kerak bo'ladi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          TypeScript — JavaScript'ning ustiga statik tip tekshiruvi qo'shilgan qatlam, alohida
          til emas.
        </li>
        <li>
          Brauzer va Node TypeScript'ni bevosita tushunmaydi — kod avval oddiy JavaScript'ga
          tarjima (transpile) qilinadi.
        </li>
        <li>
          Asosiy foyda — xatolarni kod yozish paytida (compile-time) topish, aniqroq
          avtomatik to'ldirish va ishonchli refaktoring, ayniqsa jamoaviy loyihalarda.
        </li>
        <li>
          Zamonaviy asboblar (Vite, Next.js) <code>tsc</code>ni siz uchun avtomatik ishga
          tushiradi — uni qo'lda chaqirish odatda kerak emas.
        </li>
        <li>
          TypeScript'ning tip tekshiruvi faqat build bosqichida ishlaydi — runtime'da hech
          qanday tip tekshiruvi bajarilmaydi.
        </li>
      </KeyPoints>
    </>
  )
}
