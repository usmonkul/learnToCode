import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Shartlar algoritmda',
  section: 'Algoritmik yondashuv',
}

export default function ShartlarAlgoritmdaLesson() {
  return (
    <>
      <h2>Algoritm har doim to'g'riga yurmaydi</h2>
      <p>
        Choy damlash yoki sendvich tayyorlash algoritmlarida har bir qadam navbat bilan, hech
        qanday tanlovsiz bajarilardi. Lekin ko'p hayotiy algoritmlarda vaziyatga qarab{' '}
        <strong>yo'l tanlash</strong> kerak bo'ladi. Buning uchun quyidagi qolipdan
        foydalanamiz: <em>AGAR shart bajarilsa, U HOLDA bir yo'l; aks holda — boshqa yo'l</em>.
      </p>

      <h2>Misol: svetofor oldida</h2>
      <p>
        Har kuni ko'chadan o'tayotganda ongsiz ravishda bitta kichik algoritmni bajaramiz.
        Uni aniq yozib chiqsak:
      </p>
      <div className="not-prose my-6 flex flex-col items-center gap-2 rounded-xl border border-line bg-canvas-muted p-6 text-center text-sm text-ink">
        <div className="rounded-full border border-brand-300 bg-brand-50 px-4 py-2 font-medium text-brand-700">
          Boshlash
        </div>
        <span className="text-ink-muted">↓</span>
        <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 font-medium text-amber-800">
          Chiroq qizilmi?
        </div>
        <div className="mt-2 flex flex-row gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-ink-muted">ha</span>
            <div className="rounded-lg border border-line bg-canvas px-4 py-2">To'xta va kut</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-ink-muted">yo'q</span>
            <div className="rounded-lg border border-line bg-canvas px-4 py-2">Yur</div>
          </div>
        </div>
        <span className="mt-2 text-ink-muted">↓</span>
        <div className="rounded-full border border-brand-300 bg-brand-50 px-4 py-2 font-medium text-brand-700">
          Tugash
        </div>
      </div>
      <p>
        Bu yerda <strong>shart</strong> — "chiroq qizilmi?", ikkita yo'l esa — "to'xta" va "yur".
        Qaysi yo'l tanlanishi shartning javobiga (ha yoki yo'q) bog'liq. Ikkala holatda ham
        algoritm oxir-oqibat davom etadi, faqat oralig'ida boshqacha amal bajaradi.
      </p>

      <Quiz
        question="Yuqoridagi algoritm chiroq sariq bo'lgan holatni umuman hisobga olmagan. Agar chiroq sariq bo'lsa, algoritm bilan nima muammo bo'ladi?"
        options={[
          "Algoritm albatta to'xtaydi, chunki shart faqat qizil uchun tekshirilgan",
          "Algoritm albatta yuradi, chunki 'qizilmi?' javobi 'yo'q' chiqadi",
          "Algoritm sariq holatni hisobga olmagan — bu aniqlikda kamchilik",
          "Bunday holat hech qachon bo'lmaydi",
        ]}
        correctIndex={2}
        explanation="Shart faqat 'qizil yoki qizil emas' deb ikkiga bo'lgan, lekin haqiqatda uchinchi holat (sariq) ham bor. Yaxshi algoritm barcha mumkin bo'lgan holatlarni hisobga olishi kerak — bu 'aniqlik' xususiyatining davomi."
      />

      <h2>Yana bir misol: kiyim tanlash</h2>
      <p>
        Ertalab kiyim tanlashda ham xuddi shu qolipdan foydalanamiz: "AGAR tashqarida sovuq
        bo'lsa, U HOLDA kurtka kiyaman; aks holda — yengil kiyim kiyaman."
      </p>
      <Callout type="note" title="Shartlarni VA / YOKI bilan birlashtirish">
        "AGAR tashqarida sovuq VA shamol bo'lsa, U HOLDA qalin kurtka kiyaman" — bu ikkita
        shartni bir vaqtda tekshiradi. Mantiqiy fikrlash bo'limida VA, YOKI, EMAS bilan
        shartlarni birlashtirishni allaqachon o'rgangansiz — ular AGAR bilan birga algoritm
        ichida ham juda yaxshi ishlaydi.
      </Callout>

      <Exercise title="Mashq: yomg'ir algoritmi">
        <p>
          "Agar tashqarida yomg'ir yog'sa..." jumlasidan boshlab, uydan chiqishdan oldingi
          qisqa branching algoritmni yozing. AGAR / U HOLDA / aks holda qolipidan foydalaning.
        </p>
        <Solution>
          <ol>
            <li>Boshlash.</li>
            <li>Tashqariga qarang (yoki ob-havo ilovasini tekshiring).</li>
            <li>
              AGAR yomg'ir yog'ayotgan bo'lsa, U HOLDA:
              <ul>
                <li>Soyabon oling.</li>
                <li>Yomg'irpo'sh kiying.</li>
              </ul>
              Aks holda:
              <ul>
                <li>Oddiy kiyim kiying.</li>
              </ul>
            </li>
            <li>Uydan chiqing.</li>
            <li>Tugash.</li>
          </ol>
        </Solution>
      </Exercise>

      <Quiz
        question="'AGAR soat 7dan o'tgan bo'lsa, U HOLDA uyg'on; aks holda, uxlashda davom et' jumlasida SHART qaysi qism?"
        options={[
          'Uyg\'on',
          "Soat 7dan o'tgan bo'lsa",
          'Uxlashda davom et',
          "Jumlaning hammasi shart",
        ]}
        correctIndex={1}
        explanation="Shart — tekshiriladigan holat, ya'ni 'soat 7dan o'tgan bo'lsa'. Qolgan ikki qism esa shartga qarab tanlanadigan ikki yo'l."
      />

      <KeyPoints>
        <li>
          Algoritm har doim to'g'riga yurmaydi — ba'zan "AGAR shart bajarilsa, U HOLDA bir
          yo'l; aks holda — boshqa yo'l" tarzida tanlov qilish kerak bo'ladi.
        </li>
        <li>
          Yaxshi shart barcha mumkin bo'lgan holatlarni hisobga oladi (masalan, faqat
          qizil-yo'q emas, balki sariqni ham).
        </li>
        <li>
          Shartlarni VA, YOKI, EMAS bilan birlashtirib, murakkabroq qarorlar qabul qilish
          mumkin.
        </li>
        <li>
          Har ikki yo'l — "ha" ham, "yo'q" ham — oxir-oqibat algoritmni davom ettiradi, faqat
          oraliqdagi amal boshqacha bo'ladi.
        </li>
      </KeyPoints>
    </>
  )
}
