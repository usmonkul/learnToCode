import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Katta muammoni bo'laklarga bo'lish",
  section: 'Muammolarni tahlil qilish',
}

export default function BolaklashLesson() {
  return (
    <>
      <p>
        O'tgan darsda muammo nima ekanini bilib oldik. Lekin ba'zi muammolar shunchalik katta va
        cho'chitib yuboradiganki, ularga qayerdan qo'l urishni ham bilmay qolamiz. "Butun xonani
        tozalash kerak" yoki "katta bayram tashkil qilish kerak" — buni eshitgan zahoti boshimiz
        aylanib ketishi mumkin. Bu darsda shunday katta muammolarni yengish uchun eng kuchli
        usullardan birini o'rganamiz.
      </p>

      <h2>Katta muammoni nega bo'laklash kerak?</h2>
      <p>
        Katta muammo qo'rqinchli tuyuladi, chunki uni bir zumda, bittada yechib bo'lmaydi. Lekin
        deyarli har qanday katta muammoni bir nechta <strong>kichik, aniq va bajarilishi oson</strong>{' '}
        bo'laklarga bo'lish mumkin. Har bir bo'lakni alohida yechish esa ancha oson — chunki har biri
        endi o'z-o'zidan kichik muammoga aylanadi. Bu usul <strong>bo'laklarga bo'lish</strong>{' '}
        deb ataladi.
      </p>

      <h2>Misol: "Xonani tozalash"</h2>
      <p>
        "Xonani tozalash" degan gapning o'zi juda mavhum va katta eshitiladi. Lekin uni mayda
        qadamlarga bo'lsak:
      </p>
      <div className="not-prose my-6 flex flex-col items-center gap-2 rounded-xl border border-line bg-canvas-muted p-6 text-center text-sm text-ink">
        <div className="rounded-full border border-brand-300 bg-brand-50 px-4 py-2 font-medium text-brand-700 dark:border-brand-700 dark:bg-brand-950 dark:text-brand-300">
          Katta muammo: "Xonani tozalash"
        </div>
        <span className="text-ink-muted">↓ bo'laklarga bo'lamiz</span>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-canvas px-4 py-2">
            1. Keraksiz narsalarni yig'ish
          </div>
          <div className="rounded-lg border border-line bg-canvas px-4 py-2">
            2. Kiyimlarni joyiga solish
          </div>
          <div className="rounded-lg border border-line bg-canvas px-4 py-2">3. Chang artish</div>
          <div className="rounded-lg border border-line bg-canvas px-4 py-2">4. Pol supurish</div>
        </div>
      </div>
      <p>
        Endi har bir qadam alohida — va har biri bir necha daqiqada bajarib bo'ladigan, aniq
        ish. "Xonani tozalash" degan qo'rqinchli gap o'rniga endi sizda to'rtta oddiy topshiriq bor.
      </p>

      <h2>Misol: "Sinf sayohatini tashkil qilish"</h2>
      <p>
        Yana bir misol — kattaroq va murakkabroq muammo. "Sinf bilan sayohatga chiqish"ni qanday
        bo'laklarga bo'lish mumkin?
      </p>
      <ul>
        <li>
          <strong>Manzil</strong> — qayerga borish kerak?
        </li>
        <li>
          <strong>Transport</strong> — u yerga qanday borib, qanday qaytish kerak?
        </li>
        <li>
          <strong>Oziq-ovqat</strong> — yo'lda va manzilda nima yeyiladi?
        </li>
        <li>
          <strong>Dastur</strong> — u yerda qanday mashg'ulotlar, o'yinlar bo'ladi?
        </li>
        <li>
          <strong>Ruxsatnoma</strong> — ota-onalardan qanday ruxsat olish kerak?
        </li>
      </ul>
      <p>
        Diqqat qiling — bu beshta bo'lakning har biri o'zi alohida kichik muammo bo'lib, ularni bir
        vaqtning o'zida yoki turli odamlar bajarishi ham mumkin. Katta muammoni bo'laklashning
        yana bir foydasi — shu: endi vazifani bo'lishib olish osonlashadi.
      </p>

      <Callout type="note" title="Bu dasturchilarning ham sevimli usuli">
        Dasturchilar buni <strong>"decomposition"</strong> (bo'laklarga ajratish) deb atashadi.
        Hatto eng ulkan kompyuter dasturlari — masalan, million odam ishlatadigan ilovalar — ham
        bittada emas, balki juda ko'p sonli mayda-mayda bo'laklardan yig'ilgan. Katta narsani kichik
        qismlarga bo'lish — bu nafaqat uy ishlarida, balki har qanday katta loyihada ishlaydigan
        universal usul.
      </Callout>

      <Exercise title="Mashq: bayramni bo'laklarga bo'ling">
        <p>
          "Maktab bayramini tashkil qilish" — katta va murakkab muammo. Uni <strong>4-5 ta</strong>{' '}
          kichik bo'lakka bo'ling. Har bir bo'lak aniq va bajarish mumkin bo'lgan ish bo'lsin.
        </p>
        <Solution>
          <p>Mumkin bo'lgan bo'laklardan biri (sizniki boshqacha bo'lishi ham mumkin):</p>
          <ul>
            <li>Dastur rejasini tuzish (qaysi tadbirlar, qay tartibda bo'ladi)</li>
            <li>Zal yoki hovlini bezash</li>
            <li>Ishtirokchilarni (o'quvchilarni) tayyorlash — raqs, qo'shiq, chiqishlar</li>
            <li>Musiqa va texnika tayyorlash</li>
            <li>Mehmonlarni (ota-onalar, o'qituvchilar) taklif qilish</li>
          </ul>
        </Solution>
      </Exercise>

      <Quiz
        question="'Sinf xonasini yangi o'quv yiliga tayyorlash' muammosini kimdir quyidagicha bo'lakladi: '1) Hammasini qilish, 2) Yaxshi qilish'. Bu yaxshi bo'laklashmi?"
        options={[
          "Ha, chunki ikkita bo'lakka bo'lingan",
          "Yo'q, chunki bo'laklar hali ham mavhum va aniq ish emas — nima qilish kerakligi hamon noaniq",
          "Ha, chunki qisqa va sodda",
          "Yo'q, chunki bo'laklar juda ko'p",
        ]}
        correctIndex={1}
        explanation="Yaxshi bo'lak — aniq va bajarish mumkin bo'lgan ish bo'lishi kerak ('partalarni artish', 'devorga plakat osish' kabi). 'Hammasini qilish' yoki 'yaxshi qilish' — bular hali ham katta va mavhum, ular haqiqiy bo'lak emas."
      />

      <KeyPoints>
        <li>Katta va qo'rqinchli muammoni kichik, aniq bo'laklarga bo'lish mumkin.</li>
        <li>
          Har bir bo'lak o'zi alohida, oson yechiladigan kichik muammo bo'lishi kerak — mavhum
          emas, aniq bo'lishi kerak.
        </li>
        <li>Bo'laklarga bo'lish vazifani bo'lishib olishni ham osonlashtiradi.</li>
        <li>
          Bu usul "decomposition" deb ataladi va hatto eng katta loyihalar ham xuddi shu tarzda,
          mayda qismlardan yig'iladi.
        </li>
      </KeyPoints>
    </>
  )
}
