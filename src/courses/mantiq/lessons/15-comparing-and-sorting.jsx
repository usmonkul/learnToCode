import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Taqqoslash va saralash',
  section: 'Mantiqiy fikrlash',
}

export default function TaqqoslashVaSaralashLesson() {
  return (
    <>
      <h2>Ikkitadan solishtirib chiqish</h2>
      <p>
        Jismoniy tarbiya darsida sinf bo'yiga qarab saf tortishi kerak bo'lsa, o'qituvchi hamma
        o'quvchining bo'yini bir vaqtda solishtirmaydi — bu imkonsiz. Buning o'rniga o'quvchilar{' '}
        <strong>ikkitadan</strong> solishtiriladi: qo'shni turgan ikkita o'quvchi bir-biriga
        qaraydi, kichigi oldinga (yoki kelishilgan tomonga) o'tadi, so'ng navbat keyingi juftlikka
        o'tadi. Shu jarayonni butun saf bo'ylab bir necha marta takrorlash orqali, oxir-oqibat
        hamma to'g'ri joyga tushib qoladi.
      </p>
      <p>Usul aniq shunday ishlaydi:</p>
      <ol>
        <li>Safning boshidan ikkita qo'shni kishini solishtiring.</li>
        <li>Agar ular noto'g'ri tartibda bo'lsa (kattasi oldinda), joylarini almashtiring.</li>
        <li>Keyingi juftlikka o'ting va shu jarayonni safning oxirigacha davom ettiring.</li>
        <li>
          Safning oxiriga yetganingizda, agar hech bo'lmasa bitta almashtirish bo'lgan bo'lsa,
          butun jarayonni safning boshidan yana takrorlang.
        </li>
        <li>Hech qanday almashtirish kerak bo'lmay qolganda — saf to'liq tartiblangan bo'ladi.</li>
      </ol>

      <h2>Kichik misolda ko'ramiz</h2>
      <p>To'rtta sonimiz bor: 7, 2, 9, 4. Ularni kichikdan kattaga tartiblaymiz.</p>
      <p>
        <strong>1-aylanish:</strong> 7 va 2 ni solishtiramiz — 7 kattaroq, joy almashtiramiz: 2,
        7, 9, 4. Endi 7 va 9 ni solishtiramiz — tartib to'g'ri, o'zgartirmaymiz: 2, 7, 9, 4. Endi 9
        va 4 ni solishtiramiz — 9 kattaroq, joy almashtiramiz: 2, 7, 4, 9.
      </p>
      <p>
        1-aylanish oxirida ro'yxat: 2, 7, 4, 9. Hali kamida bitta almashtirish bo'lgani uchun,
        yana boshidan boshlaymiz.
      </p>
      <p>
        <strong>2-aylanish:</strong> 2 va 7 — tartib to'g'ri. 7 va 4 ni solishtiramiz — 7
        kattaroq, joy almashtiramiz: 2, 4, 7, 9. 7 va 9 — tartib to'g'ri.
      </p>
      <p>
        2-aylanish oxirida ro'yxat: 2, 4, 7, 9. Yana bir marta tekshirib chiqamiz — endi hech
        qanday almashtirish kerak emas. Demak, ro'yxat to'liq tartiblangan:{' '}
        <strong>2, 4, 7, 9</strong>.
      </p>
      <Callout type="note" title="Nima uchun ishlaydi?">
        Har bir aylanishda eng katta son asta-sekin o'ng tomonga "suzib" boradi — chunki u har bir
        solishtirishda albatta kattaroq chiqadi va joy almashtiriladi. Bir necha aylanishdan
        keyin, hamma son o'z to'g'ri joyiga tushadi.
      </Callout>

      <Quiz
        question="Ikkita qo'shni odamni solishtirib, kichigini oldinga qo'yish jarayonini butun saf bo'ylab bir necha marta takrorlasangiz, oxir-oqibat nima hosil bo'ladi?"
        options={[
          'Tasodifiy tartib',
          "To'liq tartiblangan (bo'yi bo'yicha saralangan) saf",
          'Faqat ikkita oxirgi kishi to\'g\'ri joyda bo\'ladi',
          "Hech narsa o'zgarmaydi",
        ]}
        correctIndex={1}
        explanation="Har bir aylanishda kamida bitta katta qiymat o'z to'g'ri joyiga suriladi, shuning uchun yetarlicha aylanishdan keyin butun saf to'liq tartiblanadi."
      />

      <Exercise title="Mashq: o'zingiz saralang">
        <p>
          Quyidagi ro'yxatni kichikdan kattaga tartiblang: <strong>8, 3, 6, 1, 5</strong>. Har bir
          solishtirish va almashtirishni alohida yozib boring — xuddi yuqoridagi misoldagidek.
        </p>
        <Solution>
          <p>
            <strong>1-aylanish:</strong> [8, 3, 6, 1, 5] → 8 va 3: almashtiramiz → [3, 8, 6, 1, 5]
            → 8 va 6: almashtiramiz → [3, 6, 8, 1, 5] → 8 va 1: almashtiramiz → [3, 6, 1, 8, 5] →
            8 va 5: almashtiramiz → [3, 6, 1, 5, 8].
          </p>
          <p>
            <strong>2-aylanish:</strong> [3, 6, 1, 5, 8] → 3 va 6: tartib to'g'ri → 6 va 1:
            almashtiramiz → [3, 1, 6, 5, 8] → 6 va 5: almashtiramiz → [3, 1, 5, 6, 8] → 6 va 8:
            tartib to'g'ri.
          </p>
          <p>
            <strong>3-aylanish:</strong> [3, 1, 5, 6, 8] → 3 va 1: almashtiramiz → [1, 3, 5, 6, 8]
            → 3 va 5, 5 va 6, 6 va 8: hammasi tartib to'g'ri.
          </p>
          <p>
            <strong>4-aylanish (tekshiruv):</strong> [1, 3, 5, 6, 8] — hech qanday almashtirish
            kerak emas. Demak, saralash tugadi.
          </p>
          <p>
            <strong>Javob:</strong> 1, 3, 5, 6, 8.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="5 ta o'quvchidan iborat safda, bitta aylanishda nechta qo'shni juftlikni solishtirish kerak bo'ladi?"
        options={['3', '4', '5', '6']}
        correctIndex={1}
        explanation="5 ta kishi bo'lsa, qo'shni juftliklar soni har doim kishilar sonidan bitta kam bo'ladi: 1-2, 2-3, 3-4, 4-5 — jami 4 ta juftlik."
      />

      <KeyPoints>
        <li>
          Ko'p narsani tartiblash uchun ularni bir vaqtda emas, ikkitadan solishtirib chiqish
          mumkin.
        </li>
        <li>Agar juftlik noto'g'ri tartibda bo'lsa, joylarini almashtirib, keyingi juftlikka o'tiladi.</li>
        <li>
          Butun ro'yxat bo'ylab bu jarayonni bir necha marta takrorlash orqali, oxir-oqibat hammasi
          to'g'ri tartibga tushadi.
        </li>
        <li>
          Bu usul sonlar, ismlar, bo'yi yoki og'irlik — solishtirish mumkin bo'lgan istalgan
          narsani tartiblash uchun ishlaydi.
        </li>
      </KeyPoints>
    </>
  )
}
