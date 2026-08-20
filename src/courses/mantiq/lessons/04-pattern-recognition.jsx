import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Naqshni top',
  section: 'Muammolarni tahlil qilish',
}

export default function NaqshniTopLesson() {
  return (
    <>
      <p>
        Dunyoda hamma narsa tasodifiy emas — juda ko'p narsalar ma'lum bir <strong>naqsh
        (pattern)</strong> bo'yicha takrorlanadi yoki o'zgaradi. Naqshni payqash — bu keyingi qadamni
        oldindan bilish, hatto kim ham aytmagan bo'lsa. Keling, bir nechta kichik jumboq orqali bu
        ko'nikmani mashq qilamiz.
      </p>

      <h2>1-jumboq: sonlar ketma-ketligi</h2>
      <p className="text-center text-lg font-semibold text-ink">2, 4, 6, 8, ?</p>
      <p>
        Har bir keyingi son oldingisidan qancha katta? <code>4 − 2 = 2</code>,{' '}
        <code>6 − 4 = 2</code>, <code>8 − 6 = 2</code>. Naqsh topildi: har safar{' '}
        <strong>2 qo'shiladi</strong>. Demak, keyingi son: <code>8 + 2 = 10</code>.
      </p>

      <h2>2-jumboq: shakllar ketma-ketligi</h2>
      <p className="text-center text-2xl">🔴 🔵 🔴 🔵 🔴 ?</p>
      <p>
        Bu yerda sonlar emas, shakllar (rang) almashinyapti: qizil, ko'k, qizil, ko'k, qizil...
        Naqsh — ikkita rang <strong>navbatma-navbat</strong> takrorlanyapti. Demak, keyingisi —
        ko'k (🔵).
      </p>

      <h2>3-jumboq: harflar ketma-ketligi</h2>
      <p className="text-center text-lg font-semibold text-ink">A, C, E, G, ?</p>
      <p>
        Alifboni tasavvur qiling: A, B, C, D, E, F, G... Bu ketma-ketlikda har safar bitta harf
        <strong> tashlab ketilyapti</strong> (B, D, F tashlangan). Demak, G'dan keyin H'ni tashlab,
        keyingi harf — <strong>I</strong>.
      </p>

      <Callout type="note" title="Naqshni qanday topamiz?">
        Har uchala jumboqda ham biz bir xil narsa qildik: ketma-ket kelayotgan ikkita elementni
        solishtirdik va "nima o'zgardi?" deb so'radik. Naqsh — shu o'zgarishning o'zi
        takrorlanishi.
      </Callout>

      <h2>Naqshlar hayotimizning har joyida</h2>
      <p>
        Naqshlar nafaqat jumboqlarda, balki atrofimizdagi hayotda ham to'lib-toshgan:
      </p>
      <ul>
        <li>
          <strong>Haftaning kunlari:</strong> Dushanba, Seshanba, Chorshanba, Payshanba, Juma,
          Shanba, Yakshanba — va yana Dushanbadan boshlanadi. Bu 7 kunlik naqsh doim takrorlanadi.
        </li>
        <li>
          <strong>Fasllar:</strong> Bahor, Yoz, Kuz, Qish — va yana Bahor. Bu ham har yili
          takrorlanadigan naqsh.
        </li>
      </ul>
      <p>
        Naqshni payqash foydali, chunki u kelajakni bashorat qilish imkonini beradi — masalan, agar
        bugun payshanba bo'lsa, siz "ertaga juma" ekanini hisoblab o'tirmaysiz, chunki naqsh sizga
        allaqachon ma'lum. Bu ko'nikma keyinchalik yana ish beradi: kimgadir ko'rsatma
        berayotganda bir xil amalni har safar boshidan tushuntirib o'tirish o'rniga, "bu naqsh
        takrorlanadi" deb bir marta aytish kifoya qiladi.
      </p>

      <Exercise title="Mashq: keyingisi nima?">
        <p>Quyidagi uchta ketma-ketlikning har birida keyingi elementni toping:</p>
        <ol>
          <li>5, 10, 15, 20, ?</li>
          <li>⭐⭐🌙 ⭐⭐🌙 ⭐⭐ ?</li>
          <li>B, D, F, H, ?</li>
        </ol>
        <Solution>
          <ol>
            <li>
              <strong>25</strong> — har safar 5 qo'shiladi (<code>20 + 5 = 25</code>).
            </li>
            <li>
              <strong>🌙</strong> — naqsh "⭐⭐🌙" guruhi bo'lib takrorlanadi; ⭐⭐ dan keyin doim 🌙
              keladi.
            </li>
            <li>
              <strong>J</strong> — har safar bitta harf tashlab ketiladi (alifboda +2 qadam):
              B→D→F→H→J.
            </li>
          </ol>
        </Solution>
      </Exercise>

      <Quiz
        question="Naqshni topishda birinchi navbatda nima qilish kerak?"
        options={[
          'Darhol javobni taxmin qilish',
          "Ketma-ket kelgan ikkita elementni solishtirib, ular orasida nima o'zgarganini aniqlash",
          "Ketma-ketlikning oxirgi elementini o'chirib tashlash",
          "Boshqa odamdan javobni so'rash",
        ]}
        correctIndex={1}
        explanation="Naqshni topishning eng ishonchli yo'li — qo'shni elementlarni solishtirib, ular orasidagi o'zgarish qoidasini topish. Shu qoida keyingi elementni ham aniqlashtiradi."
      />

      <KeyPoints>
        <li>Naqsh — bir xil qoida bo'yicha takrorlanadigan o'zgarish yoki tartib.</li>
        <li>
          Naqshni topish uchun ketma-ket elementlarni solishtiring va "nima o'zgardi?" deb so'rang.
        </li>
        <li>
          Naqshlar sonlarda, shakllarda, harflarda va hayotning o'zida (haftaning kunlari,
          fasllar) uchraydi.
        </li>
        <li>Naqshni payqash kelajakni bashorat qilish va tushuntirishlarni qisqartirish imkonini beradi.</li>
      </KeyPoints>
    </>
  )
}
