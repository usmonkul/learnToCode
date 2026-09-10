import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Kirish va chiqish qurilmalari",
  section: "Kompyuterning asosiy qismlari",
}

export default function InputOutputDevicesLesson() {
  return (
    <>
      <p>
        3-darsda Kirish va Chiqish haqida gapirgan edik. Endi ularni amalga oshiradigan{' '}
        <strong>jismoniy qurilmalarni</strong> ko'rib chiqamiz — bularsiz protsessor bilan
        muloqot qilishning iloji yo'q.
      </p>

      <h2>Kirish qurilmalari — kompyuterga gapirish usullari</h2>
      <ul>
        <li>
          <strong>Klaviatura</strong> — har bir tugma bosilganda kompyuterga "shu harf bosildi"
          degan signal yuboradi.
        </li>
        <li>
          <strong>Sichqoncha (mouse)</strong> — harakat va bosishlarni kompyuterga uzatadi.
        </li>
        <li>
          <strong>Sensorli ekran (touchscreen)</strong> — barmog'ingiz qayerga tegayotganini
          his qiladi.
        </li>
        <li>
          <strong>Mikrofon</strong> — ovozni raqamli signalga aylantirib kompyuterga uzatadi.
        </li>
        <li>
          <strong>Kamera</strong> — atrofdagi manzarani rasmga aylantirib kompyuterga beradi.
        </li>
      </ul>

      <h2>Chiqish qurilmalari — kompyuterning javob berish usullari</h2>
      <ul>
        <li>
          <strong>Ekran (monitor)</strong> — natijani rasm va matn shaklida ko'rsatadi.
        </li>
        <li>
          <strong>Dinamik (karnay)</strong> — natijani ovoz shaklida chiqaradi.
        </li>
        <li>
          <strong>Printer</strong> — natijani qog'ozga chop etadi.
        </li>
        <li>
          <strong>Vibratsiya motori</strong> — telefoningiz titrab, sizga signal beradi.
        </li>
      </ul>

      <Callout type="note" title="Ikki tomonlama qurilmalar ham bor">
        Sensorli ekran — ham Kirish (siz bosasiz), ham Chiqish (u rasm ko'rsatadi) qurilmasi bir
        vaqtning o'zida! Shuningdek, aqlli soatning tebranishi ham signal (Chiqish), ammo
        siz uni bosganingizda u Kirish qurilmasiga aylanadi.
      </Callout>

      <h2>Bu qurilmalar nima uchun kerak?</h2>
      <p>
        Protsessor faqat raqamlar bilan ishlaydi — u insonning ovozini, qo'l harakatini yoki
        chizgan rasmini o'z-o'zicha "tushunmaydi". Kirish qurilmalari — bizning "inson tili"dagi
        harakatlarimizni kompyuterga tushunarli raqamlarga aylantiradi. Chiqish qurilmalari esa
        aksincha — kompyuterning raqamli javobini biz tushunadigan ko'rinishga (rasm, ovoz,
        harakat) qaytaradi.
      </p>

      <Exercise title="Mashq: qurilmani toping">
        <p>
          Har bir vaziyat uchun bu Kirish qurilmasimi yoki Chiqish qurilmasimi, ayting: 1) Video
          qo'ng'iroqda do'stingizning ovozini eshitasiz. 2) Video qo'ng'iroqda o'zingiz gapirasiz.
        </p>
        <Solution>
          <p>
            <strong>1) Ovozni eshitish</strong> — Chiqish: telefoningiz dinamigi orqali ovoz
            sizga uzatiladi.
          </p>
          <p>
            <strong>2) O'zingiz gapirish</strong> — Kirish: mikrofon ovozingizni kompyuterga
            uzatib, do'stingizga jo'natadi.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="Quyidagilardan qaysi biri Chiqish (Output) qurilmasiga misol bo'ladi?"
        options={['Klaviatura', 'Mikrofon', 'Dinamik (karnay)', 'Sichqoncha']}
        correctIndex={2}
        explanation="Dinamik kompyuterdan chiqqan natijani ovoz shaklida bizga yetkazadi, shuning uchun u Chiqish qurilmasi. Klaviatura, mikrofon va sichqoncha esa bizdan kompyuterga ma'lumot uzatadigan Kirish qurilmalari."
      />

      <KeyPoints>
        <li>Kirish qurilmalari (klaviatura, sichqoncha, mikrofon, kamera) inson harakatini kompyuterga uzatadi.</li>
        <li>Chiqish qurilmalari (ekran, dinamik, printer) kompyuterning natijasini insonga tushunarli qiladi.</li>
        <li>Sensorli ekran kabi ba'zi qurilmalar bir vaqtda ham Kirish, ham Chiqish bo'lishi mumkin.</li>
      </KeyPoints>
    </>
  )
}
