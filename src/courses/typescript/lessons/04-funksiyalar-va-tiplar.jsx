import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Funksiyalar va tiplar',
  section: 'TypeScript asoslari',
}

export default function FunctionsAndTypesLesson() {
  return (
    <>
      <p>
        Funksiyalar — har qanday dasturning yuragi, va TypeScript'ning eng katta foydasi ham
        aynan funksiyalarning "shartnomasini" — qanday argumentlar kutilishi va nima
        qaytarilishini — aniq belgilashda ko'rinadi. Bu darsda funksiya parametrlari va qaytar
        tiplarini yozishning barcha asosiy usullarini ko'rib chiqamiz.
      </p>

      <h2>Parametr va qaytar tiplar</h2>
      <p>
        Har bir parametrga alohida tip yozamiz, qaytar tip esa parametrlar ro'yxatidan keyin,
        ikki nuqta bilan ko'rsatiladi:
      </p>
      <CodeBlock lang="typescript">{`function qoshish(a: number, b: number): number {
  return a + b
}`}</CodeBlock>
      <p>
        Amalda qaytar tipni ko'p hollarda yozmasa ham bo'ladi — TypeScript uni funksiya
        tanasidan xulosa qiladi. Lekin murakkabroq yoki boshqa fayllardan ishlatiladigan
        funksiyalarda uni aniq yozish tavsiya etiladi (oldingi darsda ko'rganimizdek).
      </p>

      <h2>Ixtiyoriy va standart qiymatli parametrlar</h2>
      <p>
        Parametr nomidan keyin <code>?</code> qo'ysangiz, u <strong>ixtiyoriy (optional)</strong>{' '}
        bo'ladi — funksiya uni bermasdan ham chaqirilishi mumkin:
      </p>
      <CodeBlock lang="typescript">{`function salomla(ism: string, unvon?: string): string {
  if (unvon) {
    return \`Salom, \${unvon} \${ism}!\`
  }
  return \`Salom, \${ism}!\`
}

salomla("Aziz")            // "Salom, Aziz!"
salomla("Aziz", "Janob")   // "Salom, Janob Aziz!"`}</CodeBlock>
      <p>
        Ixtiyoriy parametrning tipi ichki tomondan <code>string | undefined</code> bilan bir
        xil — ya'ni u yo berilgan qiymatga, yo <code>undefined</code>ga teng bo'lishi mumkin.
      </p>
      <p>
        Muqobil sifatida <strong>standart qiymat (default parameter)</strong> berish mumkin —
        bunda parametr berilmasa, ko'rsatilgan standart qiymat ishlatiladi:
      </p>
      <CodeBlock lang="typescript">{`function salomla2(ism: string, unvon: string = "Hurmatli"): string {
  return \`Salom, \${unvon} \${ism}!\`
}

salomla2("Aziz")            // "Salom, Hurmatli Aziz!"
salomla2("Aziz", "Janob")   // "Salom, Janob Aziz!"`}</CodeBlock>
      <p>
        Standart qiymatli parametrga tip annotatsiyasi yozish shart emas — TypeScript uni
        standart qiymatdan xulosa qiladi, lekin aniqlik uchun yozish ham xato bo'lmaydi.
      </p>

      <h2>Rest parametrlar</h2>
      <p>
        Agar funksiya nomalum sondagi argumentlarni qabul qilishi kerak bo'lsa,{' '}
        <strong>rest parametr</strong> (<code>...</code>) ishlatiladi — u barcha qolgan
        argumentlarni massiv sifatida yig'adi:
      </p>
      <CodeBlock lang="typescript">{`function jamla(...sonlar: number[]): number {
  return sonlar.reduce((jami, son) => jami + son, 0)
}

jamla(1, 2, 3)       // 6
jamla(10, 20, 30, 40) // 100`}</CodeBlock>

      <h2>
        <code>void</code> qaytar tip
      </h2>
      <p>
        Agar funksiya hech qanday qiymat qaytarmasa (faqat biror amal bajarsa, masalan{' '}
        <code>console.log</code>), qaytar tip sifatida <code>void</code> ishlatiladi:
      </p>
      <CodeBlock lang="typescript">{`function xabarChop(matn: string): void {
  console.log(matn)
}`}</CodeBlock>
      <Callout type="note" title="void — nima uchun kerak">
        Amalda <code>void</code>ni ko'p hollarda o'zingiz qo'lda yozmaysiz — TypeScript uni
        funksiya tanasida <code>return</code> yo'qligidan o'zi xulosa qiladi. Lekin funksiya
        tipini alohida yozayotganda (masalan, callback parametrida) <code>void</code>ni aniq
        ko'rish keng tarqalgan.
      </Callout>

      <h2>Funksiya tipini o'zgaruvchiga annotatsiya qilish</h2>
      <p>
        Funksiyani o'zgaruvchiga saqlaganda, uning to'liq tipini — qanday parametrlar qabul
        qilishi va nima qaytarishini — alohida yozish mumkin. Bu ayniqsa funksiyani boshqa
        funksiyaga argument sifatida uzatish kerak bo'lganda foydali:
      </p>
      <CodeBlock lang="typescript">{`const qoshish: (a: number, b: number) => number = (a, b) => {
  return a + b
}`}</CodeBlock>
      <p>
        Bu yerda <code>(a: number, b: number) =&gt; number</code> — funksiyaning{' '}
        <strong>tipi</strong>: ikki <code>number</code> parametr qabul qilib, <code>number</code>{' '}
        qaytarishini bildiradi. E'tibor bering: o'zgaruvchi tipida parametr tiplari yozilgani
        uchun, funksiya tanasidagi <code>(a, b)</code>da ularni qayta yozish shart emas —
        TypeScript ularni o'zgaruvchi tipidan xulosa qiladi.
      </p>

      <Quiz
        question="Funksiya biror qiymat qaytarmasdan, faqat console.log orqali biror narsa chop etsa, uning qaytar tipi qanday yoziladi?"
        options={['any', 'undefined', 'void', 'null']}
        correctIndex={2}
        explanation="void — funksiya hech qanday foydali qiymat qaytarmasligini bildiradi. Bu, odatda, faqat biror yon ta'sir (side effect, masalan chop etish) bajaruvchi funksiyalar uchun ishlatiladi."
      />

      <Exercise title="Mashq">
        <p>
          Quyidagi shartlarga mos <code>royxatniChopEt</code> funksiyasini yozing: u{' '}
          <code>sarlavha</code> nomli majburiy <code>string</code> parametr va undan keyin
          nomalum sondagi <code>elementlar</code> (rest parametr, <code>string[]</code>)
          qabul qilsin. Funksiya avval sarlavhani, keyin har bir elementni alohida qatorda
          chop etsin va hech narsa qaytarmasin.
        </p>
        <Solution>
          <CodeBlock lang="typescript">{`function royxatniChopEt(sarlavha: string, ...elementlar: string[]): void {
  console.log(sarlavha)
  for (const element of elementlar) {
    console.log(\`- \${element}\`)
  }
}

royxatniChopEt("Mevalar", "olma", "banan", "anor")
// Mevalar
// - olma
// - banan
// - anor`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Funksiya parametrlariga tip yozish deyarli har doim kerak; qaytar tipni ko'p
          hollarda TypeScript o'zi xulosa qiladi.
        </li>
        <li>
          Ixtiyoriy parametr <code>?</code> bilan, standart qiymatli parametr esa{' '}
          <code>= qiymat</code> bilan belgilanadi.
        </li>
        <li>
          Rest parametr (<code>...nomi: Tip[]</code>) nomalum sondagi argumentlarni massiv
          sifatida yig'adi.
        </li>
        <li>
          <code>void</code> — funksiya foydali qiymat qaytarmasligini bildiruvchi qaytar tip.
        </li>
        <li>
          Funksiya tipini o'zgaruvchiga <code>(param: Tip) =&gt; QaytarTip</code> ko'rinishida
          annotatsiya qilish mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
