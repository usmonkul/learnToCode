import Callout from '@/components/content/Callout'
import Figure from '@/components/content/Figure'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import ioSandwich from '@/assets/io-sandwich.svg'

export const meta = {
  title: "Kirish, qayta ishlash, chiqish",
  section: "Kompyuter qanday ishlaydi",
}

export default function InputProcessOutputLesson() {
  return (
    <>
      <p>
        Endi kompyuterning ichiga "kirib" ko'raylik. Har qanday kompyuter — mikroto'lqinli
        pechdan tortib eng zamonaviy o'yin konsoligacha — bitta oddiy uch qadamli yo'l bilan
        ishlaydi. Buni <strong>sendvich yasash</strong>ga o'xshatib tushuntiramiz.
      </p>

      <h2>Uch qadamli yo'l</h2>
      <p>
        Sendvich yasaganingizda, avval oshxonaga <strong>kirasiz</strong> (non va go'sht olasiz),
        keyin ularni <strong>tayyorlaysiz</strong> (kesasiz, joylashtirasiz), va oxirida tayyor
        sendvichni <strong>chiqarasiz</strong> (tarelkaga qo'yasiz). Kompyuter ham xuddi shunday
        ishlaydi:
      </p>

      <Figure
        src={ioSandwich}
        alt="Kirish, qayta ishlash va chiqish uch bosqichini ko'rsatuvchi sxema"
        caption="1-rasm: har qanday kompyuter shu uch qadamni bajaradi"
      />

      <ul>
        <li>
          <strong>Kirish (Input)</strong> — kompyuter tashqaridan ma'lumot oladi: siz bosgan
          tugma, aytgan so'z, yoki kameraga tushgan rasm.
        </li>
        <li>
          <strong>Qayta ishlash (Process)</strong> — kompyuterning "miyasi" (protsessor) shu
          ma'lumot ustida ishlaydi: hisoblaydi, taqqoslaydi, o'zgartiradi.
        </li>
        <li>
          <strong>Chiqish (Output)</strong> — natija tashqariga chiqadi: ekranda rasm, dinamikdan
          ovoz yoki printerdan qog'oz.
        </li>
      </ul>

      <Callout type="tip" title="Har doim shu uchtasi">
        Telefoningizda musiqa quloqchinda eshitilishidan tortib, svetoforning rangi
        almashishigacha — barcha-barcha kompyuter ishi shu uch qadamga sig'adi. Farqi faqat —
        qanday kirish, qanday qayta ishlash va qanday chiqish ishlatilishida.
      </Callout>

      <h2>Bir necha misol</h2>
      <ul>
        <li>
          <strong>Kalkulyator:</strong> Kirish — siz bosgan raqamlar va "+" belgisi. Qayta ishlash
          — qo'shish amali. Chiqish — ekrandagi javob.
        </li>
        <li>
          <strong>Musiqa pleyeri:</strong> Kirish — siz tanlagan qo'shiq. Qayta ishlash —
          qo'shiqning raqamli faylini ovozga aylantirish. Chiqish — quloqchindan chiqqan musiqa.
        </li>
        <li>
          <strong>Svetofor:</strong> Kirish — soatning necha soniya o'tgani. Qayta ishlash — "20
          soniya o'tdimi, yo'qmi" tekshiruvi. Chiqish — chiroq rangining almashishi.
        </li>
      </ul>

      <Exercise title="Mashq: uch qadamni top">
        <p>
          Quyidagi qurilmalar uchun Kirish, Qayta ishlash va Chiqish nima ekanini toping:{' '}
          <strong>1) Aqlli soat qadam sonini sanaydi. 2) Kir yuvish mashinasi kirni yuvadi.</strong>
        </p>
        <Solution>
          <p>
            <strong>Aqlli soat:</strong> Kirish — qo'lning harakati (sensordan). Qayta ishlash —
            harakatlarni "qadam"ga aylantirish hisob-kitobi. Chiqish — ekrandagi qadamlar soni.
          </p>
          <p>
            <strong>Kir yuvish mashinasi:</strong> Kirish — tanlangan dastur va suv/kir og'irligi.
            Qayta ishlash — qancha vaqt aylantirish va qancha suv ishlatish kerakligini hisoblash.
            Chiqish — mashinaning aylanishi, suv quyilishi va quritish.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question={`Kalkulyatorda siz "5 + 3" deb tersangiz, javob 8 ekranda chiqadi. Bu qaysi qadam?`}
        options={['Kirish (Input)', 'Qayta ishlash (Process)', 'Chiqish (Output)', 'Bularning hech biri emas']}
        correctIndex={2}
        explanation="8 raqamining ekranda ko'rinishi — tashqariga chiqqan natija, ya'ni Chiqish (Output). 5 va 3 raqamlarini terish — Kirish, qo'shish amali esa Qayta ishlash bosqichi edi."
      />

      <KeyPoints>
        <li>Har qanday kompyuter uch qadamda ishlaydi: Kirish → Qayta ishlash → Chiqish.</li>
        <li>Kirish — tashqaridan olingan ma'lumot; Chiqish — kompyuterdan tashqariga chiqqan natija.</li>
        <li>Bu uch qadamli model oddiy kalkulyatordan tortib eng murakkab kompyutergacha bir xil ishlaydi.</li>
      </KeyPoints>
    </>
  )
}
