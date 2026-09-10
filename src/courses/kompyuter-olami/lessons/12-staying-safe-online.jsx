import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Internetda xavfsiz bo'lish qoidalari",
  section: "Internet va xavfsizlik",
}

export default function StayingSafeOnlineLesson() {
  return (
    <>
      <p>
        Internet — juda foydali, lekin haqiqiy shahar kabi, unda ham diqqat bilan yurish kerak
        bo'lgan joylar bor. Keling, kichik tadqiqotchi sifatida internetda o'zingizni xavfsiz
        tutish qoidalarini o'rganamiz.
      </p>

      <h2>Parol — uyingizning kaliti</h2>
      <p>
        Parol — xuddi uyingizning kalitiga o'xshaydi: uni faqat o'zingiz bilishingiz kerak.
        Yaxshi parol quyidagicha bo'ladi:
      </p>
      <ul>
        <li>Uzun (kamida 8-10 belgi) va taxmin qilish qiyin.</li>
        <li>Ismingiz yoki tug'ilgan yilingiz kabi oson topiladigan narsalardan iborat emas.</li>
        <li>Har bir sayt uchun boshqa-boshqa (bittasi o'g'irlansa, boshqalari xavfsiz qoladi).</li>
        <li>Faqat ota-onangiz yoki o'zingiz biladigan, hech kim bilan (hatto eng yaqin do'stingiz bilan ham) baham ko'rilmagan.</li>
      </ul>

      <Callout type="warning" title="Yodda tuting">
        Hech qachon parolingizni internetda notanish odamga yoki noma'lum saytga yozmang —
        hatto u "sovg'a yutdingiz" yoki "hisobingiz bloklanadi" deb qo'rqitsa ham. Bunday
        xabarlar ko'pincha aldov (fishing/scam) bo'ladi.
      </Callout>

      <h2>Notanish odamlar bilan muloqot</h2>
      <p>
        Internetda siz bilan gaplashayotgan odam har doim ham o'zi aytgan kim ekanini
        bildirmaydi. Shuning uchun:
      </p>
      <ul>
        <li>Shaxsiy ma'lumotlaringizni (uy manzili, maktab nomi, telefon raqami) notanishlarga bermang.</li>
        <li>Internetda tanishgan odam bilan real hayotda uchrashishdan oldin, albatta, katta yoshdagi ishonchli kishiga ayting.</li>
        <li>Sizni noqulay his qildiradigan har qanday xabar yoki taklifni ota-onangizga yoki o'qituvchingizga darhol ko'rsating.</li>
      </ul>

      <h2>Ekran vaqti va sog'lom odat</h2>
      <p>
        Kompyuter va telefonlar juda foydali, lekin ulardan haddan tashqari ko'p foydalanish
        ko'z charchashi, uyqu buzilishi va do'stlar bilan real muloqotning kamayishiga olib
        kelishi mumkin. Kunlik ekran vaqtingizni ota-onangiz bilan birga rejalashtirish — sog'lom
        odatlardan biri.
      </p>

      <Exercise title="Mashq: xavfsizmi yoki xavflimi?">
        <p>
          Quyidagi vaziyatlarning har biri xavfsizmi yoki xavflimi, ayting: 1) Do'stingizga
          o'yin haqida xabar yozasiz. 2) Notanish odam sizdan uy manzilingizni so'raydi va siz
          uni yuborasiz.
        </p>
        <Solution>
          <p>
            <strong>1) Do'stingizga o'yin haqida yozish</strong> — odatda xavfsiz, chunki bu
            tanigan va ishongan odamingiz bilan muloqot.
          </p>
          <p>
            <strong>2) Notanish odamga uy manzilini berish</strong> — xavfli! Shaxsiy
            ma'lumotni hech qachon notanish odamga bermaslik kerak. Bunday holatda darhol
            ota-onangiz yoki katta yoshdagi ishonchli kishiga ayting.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="Notanish sayt sizdan parolingizni so'rasa, nima qilish kerak?"
        options={[
          "Darhol parolni yozib yuborish, chunki sayt so'rayapti",
          "Parolni yozmaslik va bu haqda ota-ona yoki ishonchli kattalarga aytish",
          "Boshqa, osonroq parol o'ylab, o'shani yuborish",
          "Do'stlarga parolni yuborib, ular bilan maslahatlashish",
        ]}
        correctIndex={1}
        explanation="Parolni hech qachon notanish saytga yoki odamga yozib yubormaslik kerak — bu ko'pincha aldov bo'ladi. Bunday holatda darhol ota-ona yoki ishonchli kattalarga aytish eng to'g'ri yo'l."
      />

      <KeyPoints>
        <li>Kuchli va sirli parol — internetdagi xavfsizlikning asosi.</li>
        <li>Shaxsiy ma'lumotlarni (manzil, telefon, maktab) notanishlarga hech qachon bermang.</li>
        <li>Noqulay yoki shubhali narsa uchrasa, darhol ota-ona yoki ishonchli kattalarga ayting.</li>
        <li>Ekran vaqtini o'lchab, sog'lom odatlarni saqlash muhim.</li>
      </KeyPoints>
    </>
  )
}
