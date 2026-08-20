import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Sinov va xato',
  section: 'Yechim topish',
}

export default function SinovVaXatoLesson() {
  return (
    <>
      <h2>Xato — bu muvaffaqiyatsizlik emas, ma'lumot</h2>
      <p>
        Qiyin video o'yinning bir bosqichini eslang. Birinchi urinishda deyarli hech kim
        g'olib chiqmaydi — siz o'lasiz, qayta boshlaysiz, yana o'lasiz. Lekin har safar biror
        narsani bilib olasiz: bu yerda sakrash kerak edi, u yerda dushman kutib turibdi. Bir
        necha o'nlab urinishdan keyin bosqichni yakunlaysiz. Bu — sinov va xato (trial and
        error).
      </p>
      <p>
        Xuddi shunday velosipedda yurishni o'rganganingizda yiqilgansiz, muvozanatni his
        qilishni o'rgangansiz. Yoki kombinatsiyali qulfni ochishga harakat qilganingizda —
        har bir noto'g'ri kombinatsiya sizni to'g'risiga yaqinlashtirgan.
      </p>
      <Callout type="tip" title="Asosiy g'oya">
        "Aqlli" sinov-xato — bu tasodifiy taxmin qilish emas. Har bir urinishdan xulosa
        chiqarib, keyingi urinishni yaxshilash kerak. Agar xatodan hech narsa o'rganmasangiz va
        xuddi shu narsani qayta-qayta sinasangiz, bu endi strategiya emas, oddiy tasodif.
      </Callout>

      <h2>Amaliyot: "Issiq-sovuq" o'yini</h2>
      <p>
        Do'stingiz 1 dan 50 gacha bo'lgan bitta sonni o'yladi. Siz taxmin qilasiz, u esa har
        safar sizga ikkita narsani aytadi: son <strong>kattaroqmi yoki kichikroqmi</strong> va
        siz <strong>issiqmi yoki sovuqmi</strong> (ya'ni javobga yaqinmisiz yoki uzoqmisiz).
        Keling, birga kuzatamiz:
      </p>
      <div className="not-prose my-6 flex flex-col items-center gap-2 rounded-xl border border-line bg-canvas-muted p-6 text-center text-sm text-ink">
        <div className="rounded-lg border border-line bg-canvas px-4 py-2">
          1-taxmin: 25 → "Sovuq, kichikroq kerak" (qoldi: 1–24)
        </div>
        <span className="text-ink-muted">↓</span>
        <div className="rounded-lg border border-line bg-canvas px-4 py-2">
          2-taxmin: 12 → "Sovuq, kattaroq kerak" (qoldi: 13–24)
        </div>
        <span className="text-ink-muted">↓</span>
        <div className="rounded-lg border border-line bg-canvas px-4 py-2">
          3-taxmin: 18 → "Issiqroq, kattaroq kerak" (qoldi: 19–24)
        </div>
        <span className="text-ink-muted">↓</span>
        <div className="rounded-lg border border-line bg-canvas px-4 py-2">
          4-taxmin: 21 → "Juda issiq, kichikroq kerak" (qoldi: 19–20)
        </div>
        <span className="text-ink-muted">↓</span>
        <div className="rounded-full border border-brand-300 bg-brand-50 px-4 py-2 font-medium text-brand-700 dark:border-brand-700 dark:bg-brand-950 dark:text-brand-300">
          5-taxmin: 19 → Topildi!
        </div>
      </div>
      <p>
        Diqqat qiling: har bir taxminda mumkin bo'lgan sonlar to'plami deyarli yarmiga
        qisqarib bordi. Bu tasodif emas — har bir javobdan xulosa chiqarib, keyingi taxmin
        avvalgisidan aqlliroq tanlandi. Agar buning o'rniga har safar tasodifiy son aytilganda
        (masalan 3, keyin 47, keyin 9), javobni topish uchun ancha ko'proq urinish kerak
        bo'lardi.
      </p>
      <Quiz
        question="Quyidagilardan qaysi biri 'aqlli' sinov-xatoga misol bo'ladi?"
        options={[
          "Har safar tasodifiy, avvalgi javoblarga bog'liq bo'lmagan son aytish",
          "Har bir javobdan xulosa chiqarib, keyingi taxminni shunga qarab tanlash",
          "Faqat bitta sonni qayta-qayta aytaverish",
          "Umuman taxmin qilmaslik",
        ]}
        correctIndex={1}
        explanation="Aqlli sinov-xatoning mohiyati — har bir urinishdan olingan ma'lumotdan foydalanib, keyingi urinishni yaxshilashda."
      />

      <Exercise title="Mashq">
        <p>
          Do'stingiz 1 dan 100 gacha bo'lgan sonni o'ylab qo'ydi. Siz "50" dedingiz, u "sovuq,
          kichikroq kerak" dedi. Keyin siz "25" dedingiz, u "issiq, kattaroq kerak" dedi. Endi
          qanday son taxmin qilgan bo'lardingiz va nega aynan shuni?
        </p>
        <Solution>
          <p>
            Javob 25 bilan 50 orasida (26–49 oralig'ida) bo'lishi kerak, chunki 50 dan
            kichikroq va 25 dan kattaroq. Shu oraliqning o'rtasiga yaqin son — masalan 37 —
            eng aqlli tanlov bo'ladi, chunki u qaysi javob chiqishidan qat'i nazar, qolgan
            oraliqni yana taxminan yarmiga qisqartiradi.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="Video o'yinda qiyin bosqichni birinchi urinishda o'ta olmaslik nimani anglatadi?"
        options={[
          "Siz bu o'yinni o'ynay olmaysiz",
          "Bu normal holat — har bir urinish sizga bosqich haqida yangi ma'lumot beradi",
          "O'yin buzilgan",
          "Boshqa o'yin tanlash kerak",
        ]}
        correctIndex={1}
        explanation="Xato — muvaffaqiyatsizlik emas, balki ma'lumot manbai. Har bir urinish keyingisini yaxshiroq qiladi."
      />

      <KeyPoints>
        <li>Sinov va xato — bu muvaffaqiyatsizlik emas, natijaga yetishning tabiiy usuli.</li>
        <li>
          "Aqlli" sinov-xato tasodifiy taxmin qilish emas — har bir urinishdan xulosa chiqarib,
          keyingisini yaxshilash kerak.
        </li>
        <li>
          Har bir "sovuq" yoki "noto'g'ri" javob ham foydali — u qidiruv doirasini
          toraytiradi.
        </li>
        <li>Xatodan o'rganish qobiliyati — muammo yechishning eng kuchli vositalaridan biri.</li>
      </KeyPoints>
    </>
  )
}
