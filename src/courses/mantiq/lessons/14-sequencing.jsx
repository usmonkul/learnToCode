import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Ketma-ketlik va tartib',
  section: 'Mantiqiy fikrlash',
}

export default function KetmaKetlikVaTartibLesson() {
  return (
    <>
      <h2>Bir xil qadamlar, boshqa tartib — boshqa natija</h2>
      <p>
        Tasavvur qiling: kiyinayotganda avval poyabzalingizni kiyib, keyingina paypog'ingizni
        kiyishga urinasiz. Bu — ayni bir xil ikkita qadam (paypoq kiyish, poyabzal kiyish), lekin
        noto'g'ri tartibda. Natija — noqulay va deyarli imkonsiz holat, garchi ikkala qadam ham
        o'z-o'zidan to'g'ri bo'lsa ham.
      </p>
      <p>
        Bu misol kulgili tuyulishi mumkin, lekin muhim bir haqiqatni ko'rsatadi: ba'zi ishlarda{' '}
        <strong>qaysi qadamni qachon bajarish</strong> xuddi qadamning o'zi kabi muhim. Bir xil
        qadamlar to'plami, tartibi noto'g'ri bo'lsa, noto'g'ri yoki hatto bajarib bo'lmaydigan
        natijaga olib kelishi mumkin.
      </p>
      <Callout type="tip" title="Tartibni tekshirishning oson yo'li">
        Har bir qadamdan oldin o'zingizdan so'rang: "Bu qadamni bajarish uchun avval nima tayyor
        bo'lishi kerak?" Agar javob — ro'yxatda hali bajarilmagan boshqa bir qadam bo'lsa, demak
        siz uni birinchi qo'yishingiz kerak.
      </Callout>

      <Quiz
        question="Quyidagi holatlarning qaysi birida TARTIB albatta muhim (tartibni o'zgartirsangiz, natija buziladi)?"
        options={[
          'Ikki xil rangdagi qalamni bitta qutiga solish',
          'Avval tortni pishirish, keyin uning ustiga krem surish',
          "Ikki kitobni javonga bir-biri yoniga qo'yish",
          'Xonadagi yostiqlarni turli burchaklarga joylashtirish',
        ]}
        correctIndex={1}
        explanation="Tortni krem surishdan oldin pishirish shart — aks holda krem erib, tort xom qoladi. Qolgan misollarda tartib natijaga deyarli ta'sir qilmaydi."
      />

      <Exercise title="Mashq 1: Gulni to'g'ri ekish">
        <p>Quyidagi qadamlar aralashib ketgan. Ularni to'g'ri tartibga soling:</p>
        <ul>
          <li>Suv sepish</li>
          <li>Chuqurchaga urug' qo'yish</li>
          <li>Ustidan tuproq bilan ko'mish</li>
          <li>Tuproqqa kichik chuqurcha kovlash</li>
        </ul>
        <Solution>
          <ol>
            <li>Tuproqqa kichik chuqurcha kovlash</li>
            <li>Chuqurchaga urug' qo'yish</li>
            <li>Ustidan tuproq bilan ko'mish</li>
            <li>Suv sepish</li>
          </ol>
          <p>
            Chuqurcha bo'lmasa, urug'ni qo'yadigan joy yo'q; urug' qo'yilmasa, ko'madigan narsa
            yo'q; ko'milmasa, suv sepish ma'nosiz — har bir qadam o'zidan oldingisiga bog'liq.
          </p>
        </Solution>
      </Exercise>

      <Exercise title="Mashq 2: Tishlarni to'g'ri yuvish">
        <p>Bu qadamlar ham aralashib ketgan. Ularni to'g'ri tartibga soling:</p>
        <ul>
          <li>Og'izni suv bilan chayish</li>
          <li>Cho'tkani suv bilan yuvib, joyiga qo'yish</li>
          <li>Cho'tkaga tish pastasi surtish</li>
          <li>Tishlarni kamida 2 daqiqa yuvish</li>
          <li>Tish cho'tkasini suv bilan namlash</li>
        </ul>
        <Solution>
          <ol>
            <li>Tish cho'tkasini suv bilan namlash</li>
            <li>Cho'tkaga tish pastasi surtish</li>
            <li>Tishlarni kamida 2 daqiqa yuvish</li>
            <li>Og'izni suv bilan chayish</li>
            <li>Cho'tkani suv bilan yuvib, joyiga qo'yish</li>
          </ol>
          <p>
            Pastani namlanmagan cho'tkaga surtish qiyin, yuvmasdan chayish ma'nosiz, chaymasdan
            cho'tkani yig'ishtirish esa og'izda pasta qoldirib ketadi — shuning uchun aynan shu
            tartib mantiqan to'g'ri.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="Nega 'avval poyabzal, keyin paypoq' tartibi noto'g'ri?"
        options={[
          "Chunki paypoq umuman kerak emas",
          "Chunki poyabzal kiyilgan holda paypoq kiyish deyarli imkonsiz va noqulay",
          "Chunki poyabzal rangi paypoqqa mos kelmaydi",
          "Hech qanday farqi yo'q, ikkalasi ham bir xil natija beradi",
        ]}
        correctIndex={1}
        explanation="Poyabzal oyoqqa kiyilgandan keyin paypoq kiyish uchun joy deyarli qolmaydi — bu qadam avvalgi qadamga bog'liq bo'lgani uchun tartib muhim."
      />

      <KeyPoints>
        <li>
          Bir xil qadamlar boshqa tartibda bajarilsa, natija noto'g'ri yoki hatto kulgili bo'lishi
          mumkin.
        </li>
        <li>
          Har bir qadamdan oldin "bu qadam uchun avval nima tayyor bo'lishi kerak?" deb so'rash
          to'g'ri tartibni topishga yordam beradi.
        </li>
        <li>Ba'zi ishlarda esa tartib umuman muhim emas — buni farqlay bilish ham kerak.</li>
      </KeyPoints>
    </>
  )
}
