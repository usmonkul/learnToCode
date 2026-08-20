import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Algoritm nima?',
  section: 'Algoritmik yondashuv',
}

export default function AlgoritmNimaLesson() {
  return (
    <>
      <p>
        Oldingi bo'limlarda siz muammoni tahlil qilishni, yechim izlashni va mantiqiy fikrlashni
        o'rgandingiz. Endi navbat — shu ko'nikmalarni <strong>amalga oshirish</strong>ga keldi.
        Buning uchun bizga bitta yangi asbob kerak: <strong>algoritm</strong>.
      </p>

      <h2>Retsept — bu ham algoritm</h2>
      <p>
        Oshpaz yangi taom pishirganda retseptga qaraydi: qanday mahsulotlar kerak, ularni qanday
        tartibda solish kerak, qancha vaqt pishirish kerak. Agar retseptga aniq amal qilsa, taom
        har safar deyarli bir xil chiqadi. Aynan shu narsa — algoritm.
      </p>
      <p>
        <strong>Algoritm</strong> — bu biror maqsadga yetish uchun bajariladigan aniq va tartibli
        qadamlar ketma-ketligi. Har bir qadam nima qilish kerakligini aniq aytadi, qadamlar esa
        muayyan tartibda bajariladi — birinchisidan boshlab, oxirgisiga qadar.
      </p>

      <h2>Misol: choy damlash algoritmi</h2>
      <p>Kundalik ishlarimizning ko'pchiligi aslida algoritm. Choy damlashni olaylik:</p>
      <div className="not-prose my-6 flex flex-col items-center gap-2 rounded-xl border border-line bg-canvas-muted p-6 text-center text-sm text-ink">
        <div className="rounded-full border border-brand-300 bg-brand-50 px-4 py-2 font-medium text-brand-700 dark:border-brand-700 dark:bg-brand-950 dark:text-brand-300">
          Boshlash
        </div>
        <span className="text-ink-muted">↓</span>
        <div className="rounded-lg border border-line bg-canvas px-4 py-2">Choynakka suv solish</div>
        <span className="text-ink-muted">↓</span>
        <div className="rounded-lg border border-line bg-canvas px-4 py-2">Suvni qaynatish</div>
        <span className="text-ink-muted">↓</span>
        <div className="rounded-lg border border-line bg-canvas px-4 py-2">
          Piyolaga choy barglarini solish
        </div>
        <span className="text-ink-muted">↓</span>
        <div className="rounded-lg border border-line bg-canvas px-4 py-2">
          Qaynagan suvni piyolaga quyish
        </div>
        <span className="text-ink-muted">↓</span>
        <div className="rounded-lg border border-line bg-canvas px-4 py-2">3–5 daqiqa kutish</div>
        <span className="text-ink-muted">↓</span>
        <div className="rounded-full border border-brand-300 bg-brand-50 px-4 py-2 font-medium text-brand-700 dark:border-brand-700 dark:bg-brand-950 dark:text-brand-300">
          Tugash
        </div>
      </div>
      <p>
        Diqqat qiling: qadamlar tartibi muhim. Agar choy barglarini eng oxirida, piyola
        allaqachon bo'shab qolganidan keyin solsangiz, choy umuman chiqmaydi. Algoritmda tartibni
        almashtirish — natijani ham almashtiradi.
      </p>
      <Quiz
        question="Agar choy damlash algoritmida 'suvni qaynatish' qadami tashlab ketilsa, nima bo'ladi?"
        options={[
          "Choy tezroq tayyor bo'ladi",
          'Choy sovuq va xom chiqadi',
          "Hech narsa o'zgarmaydi",
          'Choynak sinib qoladi',
        ]}
        correctIndex={1}
        explanation="Har bir qadam natijaga ta'sir qiladi. Qaynatish qadami bo'lmasa, suv issiq bo'lmaydi va choy chiqmaydi — algoritmning har bir qadami bejiz turmaydi."
      />

      <h2>Algoritmlar hamma joyda yashiringan</h2>
      <p>
        Bir marta ko'zingizni ochsangiz, algoritmlarni har qadamda ko'rasiz — ular kompyuterga
        emas, hayotning o'ziga tegishli:
      </p>
      <ul>
        <li>
          <strong>GPS yo'nalishi</strong> — "300 metrdan keyin o'ngga bur, so'ng to'g'ri yur" kabi
          aniq va tartibli qadamlar orqali sizni manzilga olib boradi.
        </li>
        <li>
          <strong>Kir yuvish mashinasi dasturi</strong> — suv olish, kir yuvish vositasini
          qo'shish, aylantirib yuvish, chayish, siqib quritish — bularning barchasi qat'iy
          tartibda ishlaydi.
        </li>
        <li>
          <strong>Tish yuvish tartibi</strong> — pastani cho'tkaga surish, tishlarni tozalash,
          og'izni chayish — har kuni bir xil qadamlarni bajarasiz, buni o'ylab ham
          o'tirmaysiz, chunki bu allaqachon sizning shaxsiy algoritmingiz.
        </li>
      </ul>

      <h2>Yaxshi algoritmning uch belgisi</h2>
      <p>Har qanday yaxshi algoritm quyidagi uchta xususiyatga ega bo'lishi kerak:</p>
      <ul>
        <li>
          <strong>Aniq</strong> — har bir qadam tushunarli va bir xil ma'noda o'qiladi. "Biroz
          kutish" emas, balki "3 daqiqa kutish".
        </li>
        <li>
          <strong>Tartiblangan</strong> — qadamlar ma'lum bir ketma-ketlikda bajariladi, va bu
          tartibni o'zgartirish natijani ham o'zgartiradi (choy misolida ko'rganimizdek).
        </li>
        <li>
          <strong>Cheklangan</strong> — algoritm albatta bir joyda tugaydi. U abadiy davom
          etmaydi.
        </li>
      </ul>
      <Callout type="warning" title="Cheklanmagan algoritm xavfi">
        Agar kimdir sizga "xona toza bo'lguncha supur" desa-yu, "toza" nima ekanini aniq
        aytmasa, siz hech qachon to'xtamasligingiz mumkin. Har doim "bu algoritm qachon
        tugaydi?" degan savolga aniq javob bo'lishi kerak.
      </Callout>

      <Exercise title="Mashq: sendvich tayyorlash algoritmi">
        <p>
          O'zingiz sendvich tayyorlaydigan algoritmni yozing. "Boshlash" bilan boshlang,
          "Tugash" bilan tugating, oralig'ida esa raqamlangan, aniq qadamlar bo'lsin (nima
          olish kerak, qanday tartibda qo'yish kerak).
        </p>
        <Solution>
          <p>Bunday variant to'g'ri hisoblanadi:</p>
          <ol>
            <li>Boshlash.</li>
            <li>Ikki bo'lak non oling.</li>
            <li>Bir bo'lak nonning bir tomoniga yupqa qilib moy suring.</li>
            <li>Ustiga kolbasa yoki pishloq qo'ying.</li>
            <li>Ustidan pomidor va bodring bo'laklarini qo'ying.</li>
            <li>Ikkinchi non bo'lagi bilan yoping.</li>
            <li>Sendvichni diagonal kesib, likobchaga qo'ying.</li>
            <li>Tugash.</li>
          </ol>
        </Solution>
      </Exercise>

      <Quiz
        question="Do'stingiz sizga aytdi: '1) Xonani tozala. 2) Kiyimlaringni tashla.' — lekin 'tozala' deganda aniq nima qilish kerakligini tushuntirmadi. Bu yerda algoritmning qaysi xususiyati yetishmayapti?"
        options={[
          'Aniqlik — nima qilish kerakligi aniq emas',
          "Tartib — qadamlar noto'g'ri ketma-ketlikda",
          'Cheklanganlik — algoritm hech qachon tugamaydi',
          "Hech narsa yetishmayapti, bu to'liq algoritm",
        ]}
        correctIndex={0}
        explanation="'Tozala' — noaniq buyruq. Nimani, qanday va qay darajada tozalash kerakligi aytilmagan, shuning uchun bu yerda aniqlik yetishmayapti."
      />

      <KeyPoints>
        <li>
          Algoritm — maqsadga yetish uchun bajariladigan aniq va tartibli qadamlar
          ketma-ketligi, xuddi retsept kabi.
        </li>
        <li>Qadamlar tartibini o'zgartirish odatda natijani ham o'zgartiradi.</li>
        <li>
          Yaxshi algoritm uchta xususiyatga ega: <strong>aniq</strong>,{' '}
          <strong>tartiblangan</strong> va <strong>cheklangan</strong> (albatta tugaydigan).
        </li>
        <li>
          Algoritmlar faqat kompyuterlarga xos emas — GPS, kir yuvish mashinasi, hatto tish
          yuvish tartibi ham algoritm.
        </li>
      </KeyPoints>
    </>
  )
}
