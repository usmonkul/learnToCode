import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Takrorlash (loop)',
  section: 'Algoritmik yondashuv',
}

export default function TakrorlashLoopLesson() {
  return (
    <>
      <h2>Bir xil qadamni yigirma marta yozish shartmi?</h2>
      <p>
        Tasavvur qiling, sizga "20 marta sakra" degan mashqni algoritm sifatida yozish kerak.
        Buni shunday yozish mumkinmi: "sakra", "sakra", "sakra"... va shu tariqa 20 marta? Texnik
        jihatdan ha, lekin bu juda uzun va zerikarli bo'ladi. Buning o'rniga algoritmlarda maxsus
        so'z ishlatiladi: <strong>TAKRORLA</strong>.
      </p>

      <h2>TAKRORLA — bitta so'z, ko'p qadam</h2>
      <p>
        "TAKRORLA" bir yoki bir nechta qadamni qayta-qayta bajarishni bildiradi. Buning ikki
        asosiy ko'rinishi bor.
      </p>

      <h3>1. Aniq necha marta takrorlash</h3>
      <p>
        Bu yerda qadam necha marta bajarilishi oldindan ma'lum: <em>"10 marta TAKRORLA: sakra"</em>{' '}
        — bu shunchaki bola 10 marta sakrashini bildiradi, algoritmning o'zida esa faqat bitta
        qator kifoya qiladi.
      </p>

      <h3>2. Shart bajarilguncha takrorlash</h3>
      <p>
        Bu yerda necha marta takrorlanishi oldindan noma'lum — takrorlash faqat ma'lum bir shart
        bajarilganda to'xtaydi: <em>"xona toza bo'lguncha TAKRORLA: supur"</em>. Bir marta
        supurgandan keyin xona hali ham iflos bo'lsa, yana supurasiz — va bu xona chindan ham
        toza bo'lguncha davom etadi.
      </p>

      <p>Ikkinchi turini diagramma orqali ko'raylik:</p>
      <div className="not-prose my-6 flex flex-col items-center gap-2 rounded-xl border border-line bg-canvas-muted p-6 text-center text-sm text-ink">
        <div className="rounded-full border border-brand-300 bg-brand-50 px-4 py-2 font-medium text-brand-700">
          Boshlash
        </div>
        <span className="text-ink-muted">↓</span>
        <div className="rounded-lg border border-line bg-canvas px-4 py-2">Xonaning bir qismini supurish</div>
        <span className="text-ink-muted">↓</span>
        <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 font-medium text-amber-800">
          Xona toza bo'ldimi?
        </div>
        <div className="mt-2 flex flex-row gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-ink-muted">yo'q</span>
            <div className="rounded-lg border border-line bg-canvas px-4 py-2">
              ↻ yana supurish
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-ink-muted">ha</span>
            <div className="rounded-full border border-brand-300 bg-brand-50 px-4 py-2 font-medium text-brand-700">
              Tugash
            </div>
          </div>
        </div>
        <p className="mt-2 max-w-sm text-xs text-ink-muted">
          "Yo'q" javobida algoritm yana "supurish" qadamiga qaytadi va savolni qayta so'raydi —
          bu shart bajarilguncha davom etadi.
        </p>
      </div>
      <p>
        Diqqat qiling: bu yerda "supurish" qadami takrorlanadi, lekin savol ("xona toza
        bo'ldimi?") ham har safar qayta so'raladi. Aynan shu savol takrorlashning qachon
        to'xtashini belgilaydi.
      </p>

      <Quiz
        question="'20 marta o'tirib-turish mashqini bajarish' — bu qaysi turdagi takrorlashga misol?"
        options={[
          'Aniq necha marta takrorlash',
          'Shart bajarilguncha takrorlash',
          'Ikkalasi ham emas',
          'Bu umuman takrorlash emas',
        ]}
        correctIndex={0}
        explanation="Marta soni ('20 marta') oldindan aniq berilgan, shuning uchun bu 'aniq necha marta takrorlash' turiga kiradi."
      />

      <Callout type="warning" title="Ehtiyot bo'ling: shart hech qachon bajarilmasa">
        Agar "shart bajarilguncha" turidagi takrorlashda shart hech qachon rost bo'lmasa
        (masalan, shart noaniq yozilgan yoki umuman mumkin bo'lmagan narsa bo'lsa), algoritm
        abadiy davom etadi. Bunga <strong>cheksiz tsikl</strong> deyiladi — bu haqida
        birozdan keyin batafsilroq gaplashamiz.
      </Callout>

      <Exercise title="Mashq: o'tirib-turish mashqi algoritmi">
        <p>
          "20 marta o'tirib-turish mashqi" uchun to'liq algoritm yozing. TAKRORLA so'zidan
          foydalaning. "Boshlash" bilan boshlang, "Tugash" bilan tugating.
        </p>
        <Solution>
          <ol>
            <li>Boshlash.</li>
            <li>Tik turing, qo'llaringizni oldinga cho'zing.</li>
            <li>
              20 marta TAKRORLA:
              <ul>
                <li>Tizzalaringizni bukib, chuqur o'tiring.</li>
                <li>Yana tik turib oling.</li>
              </ul>
            </li>
            <li>Tugash.</li>
          </ol>
        </Solution>
      </Exercise>

      <Quiz
        question="'Barcha idishlar yuvilguncha idish yuvish' algoritmi qaysi turdagi takrorlashga misol?"
        options={[
          "Aniq necha marta takrorlash, chunki idishlar soni har doim bir xil",
          "Shart bajarilguncha takrorlash, chunki idishlar soni har safar boshqacha bo'lishi mumkin",
          "Bu umuman algoritm emas",
          "Bunda takrorlash kerak emas",
        ]}
        correctIndex={1}
        explanation="Idishlar soni oldindan aniq emas — ba'zan ko'p, ba'zan kam bo'ladi. Shuning uchun to'g'ri yechim: 'barcha idishlar yuvilguncha TAKRORLA: bitta idishni yuv.'"
      />

      <KeyPoints>
        <li>
          TAKRORLA — bir yoki bir nechta qadamni qayta-qayta bajarish uchun ishlatiladigan
          buyruq, uzun ro'yxat yozishning o'rnini bosadi.
        </li>
        <li>
          Ikki asosiy turi bor: <strong>aniq necha marta</strong> (masalan, "10 marta") va{' '}
          <strong>shart bajarilguncha</strong> (masalan, "xona toza bo'lguncha").
        </li>
        <li>
          Shart bajarilguncha takrorlashda har bosqichda shart qayta tekshiriladi — shart rost
          bo'lganda takrorlash to'xtaydi.
        </li>
        <li>
          Agar shart hech qachon rost bo'lmasa, algoritm abadiy davom etadi — bunga cheksiz
          tsikl deyiladi va bu xato hisoblanadi.
        </li>
      </KeyPoints>
    </>
  )
}
