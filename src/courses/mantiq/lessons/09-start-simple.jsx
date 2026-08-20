import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Eng oddiy yechimdan boshla',
  section: 'Yechim topish',
}

export default function EngOddiyYechimdanBoshlaLesson() {
  return (
    <>
      <h2>Katta muammo qo'rqinchli tuyuladi</h2>
      <p>
        Sizga 100 ta kitobni muallif ismi bo'yicha tartiblash topshirilsa, birinchi fikringiz
        shunday bo'lishi mumkin: "bu juda ko'p, qayerdan boshlashni bilmayman". Bunday paytda
        eng yaxshi yo'l — muammoning to'liq katta versiyasi haqida emas, uning eng kichik va
        eng oddiy versiyasi haqida o'ylash.
      </p>
      <p>
        100 ta kitob o'rniga faqat 5 tasini tartiblashni tasavvur qiling. Buni qanday
        qilasiz? Ehtimol, birinchi ikkitasini solishtirib, qaysi biri oldin kelishini
        aniqlaysiz, keyin uchinchisini to'g'ri joyga qo'yasiz, va hokazo. Bu usul ishlaganini
        ko'rgach, xuddi shu usulni 100 ta kitobga ham qo'llash mumkin — faqat ko'proq marta
        takrorlaysiz.
      </p>
      <Callout type="tip" title="Kichik versiya — arzon sinov maydoni">
        Kichik va oddiy versiyada xato qilish deyarli hech narsaga tushmaydi — uni tezda
        payqab, tuzatib bo'ladi. Katta, murakkab versiyada esa xato qilib, buni payqamasdan
        uzoq davom etish osonroq. Shuning uchun avval kichikda sinab, keyin kattalashtirish
        aqlliroq.
      </Callout>

      <h2>Oshxonadan misol</h2>
      <p>
        Yangi va notanish retseptni sinab ko'rmoqchisiz — masalan, 20 kishilik katta ziyofat
        uchun. Agar birinchi marta to'g'ridan-to'g'ri katta miqdorda tayyorlasangiz va retsept
        noto'g'ri chiqsa, ko'p mahsulot behuda ketadi. Aqlliroq yo'l — avval 1-2 kishilik kichik
        porsiyada sinab ko'rish. Agar mazasi yoqsa, retseptni ishonch bilan katta miqdorga
        ko'paytirasiz. Agar biror narsa noto'g'ri bo'lsa, buni kichik va arzon sinovda
        bilib olasiz — katta ziyofatda emas.
      </p>

      <Quiz
        question="Nega katta muammoni yechishdan oldin uning kichik versiyasida sinab ko'rish foydali?"
        options={[
          "Chunki kichik versiya har doim qiziqarliroq",
          "Chunki kichik versiyada xato qilish arzon va tezda tuzatiladi",
          "Chunki katta versiyani yechish shart emas",
          "Chunki kichik versiya har doim tezroq tugaydi",
        ]}
        correctIndex={1}
        explanation="Kichik versiyada xatoning narxi past — uni tezda topib, usulni tuzatib, keyin katta muammoga ishonch bilan qo'llash mumkin."
      />

      <h2>Qanday qilib "kichraytirish" kerak?</h2>
      <p>Katta muammoni kichraytirishning bir necha usuli bor:</p>
      <ul>
        <li>
          <strong>Sonini kamaytirish</strong> — 100 ta o'rniga 5 ta bilan ishlash.
        </li>
        <li>
          <strong>Miqyosini toraytirish</strong> — butun maktab o'rniga bitta sinf bilan
          boshlash.
        </li>
        <li>
          <strong>Vaqtni qisqartirish</strong> — bir yillik reja o'rniga bir haftalik reja
          bilan sinab ko'rish.
        </li>
      </ul>

      <Exercise title="Mashq">
        <p>
          Muammo: "Butun maktab miqyosida sport musobaqasi tashkil qilish kerak — bunda 500
          nafar o'quvchi ishtirok etadi." Bu juda katta va murakkab tuyuladi. Buning eng
          oddiy, kichraytirilgan versiyasini tasvirlab bering — nimadan boshlagan bo'lardingiz?
        </p>
        <Solution>
          <p>
            Masalan: avval faqat bitta sinf (25 nafar o'quvchi) uchun kichik musobaqa
            o'tkazib ko'rish. Shu tajriba orqali qanday qoidalar kerakligini, qancha vaqt
            ketishini, qanday muammolar chiqishi mumkinligini bilib olasiz. Keyin shu
            tajribadan foydalanib, avval bir necha sinf, so'ng butun maktab miqyosiga
            kengaytirasiz.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="100 ta buyumni saralash kerak bo'lsa, eng oddiy yechimdan boshlash tamoyiliga ko'ra qanday harakat qilish maqsadga muvofiq?"
        options={[
          "Darhol barcha 100 tasini bir vaqtda tartiblashga urinish",
          "Avval kichik guruh (masalan 5 ta) bilan usulni sinab ko'rish, keyin kengaytirish",
          "Muammoni butunlay chetlab o'tish",
          "Faqat eng qiyin buyumlardan boshlash",
        ]}
        correctIndex={1}
        explanation="Kichik guruhda ishlaydigan usulni topib, keyin uni kattaroq guruhga qo'llash — xatoni arzon narxda topish va aqlli kengaytirish imkonini beradi."
      />

      <KeyPoints>
        <li>
          Katta va qo'rqinchli tuyulgan muammoni kichik, sodda versiyasidan boshlab o'rganish
          osonroq.
        </li>
        <li>Kichik versiyada xato qilish arzon — uni tezda payqab, tuzatish mumkin.</li>
        <li>
          Muammoni kichraytirish uchun sonini kamaytirish, miqyosini toraytirish yoki vaqtni
          qisqartirish mumkin.
        </li>
        <li>
          Kichik versiyada ishlagan usul odatda katta versiyaga ham ishonch bilan qo'llanadi.
        </li>
      </KeyPoints>
    </>
  )
}
