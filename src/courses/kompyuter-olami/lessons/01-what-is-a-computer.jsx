import Callout from '@/components/content/Callout'
import Figure from '@/components/content/Figure'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import computerPhoto from '@/assets/computer.png'

export const meta = {
  title: "Kompyuter nima o'zi?",
  section: 'Kompyuter nima?',
}

export default function WhatIsAComputerLesson() {
  return (
    <>
      <Figure
        src={computerPhoto}
        alt="Klaviatura va sichqonchasi bilan qadimiy shaxsiy kompyuter"
        caption="1-rasm: Kompyuter"
      />

      <p>
        Assalomu alaykum, kichik tadqiqotchi! Bu kursda biz birga <strong>kompyuter</strong> degan
        sirli qutichaning ichiga "kirib", u qanday ishlashini kashf qilamiz. Hech qanday dastur
        yozishni bilish shart emas — bizga faqat qiziqish va savol berishdan qo'rqmaslik kerak.
      </p>

      <h2>Kompyuter — bu nima?</h2>
      <p>
        Eng oddiy qilib aytganda, <strong>kompyuter</strong> — bu uchta ishni juda tez va aniq
        bajaradigan mashina:
      </p>
      <ul>
        <li>
          <strong>Ma'lumot qabul qiladi</strong> — masalan, siz klaviaturada bosgan harflarni.
        </li>
        <li>
          <strong>Ma'lumotni qayta ishlaydi</strong> — ya'ni u bilan biror amal bajaradi, hisoblaydi
          yoki o'zgartiradi.
        </li>
        <li>
          <strong>Natijani ko'rsatadi</strong> — masalan, ekranda rasm yoki matn sifatida.
        </li>
      </ul>
      <p>
        Xolos! Kompyuter — sehrgar emas. U shunchaki <em>juda-juda tez hisoblaydigan</em> mashina.
        Inson bir masalani qog'ozda bir necha daqiqada yechsa, kompyuter xuddi shu masalani bir
        soniyaning millionlab ulushida yechib qo'yadi.
      </p>

      <Callout type="tip" title="Qiziqarli fakt">
        Dunyodagi birinchi kompyuterlar butun bir xonani egallagan, og'irligi bir necha tonna
        bo'lgan! Hozir esa xuddi shunday kuchga ega kompyuter sizning cho'ntagingizga sig'adigan
        telefonda joylashgan.
      </Callout>

      <h2>Kompyuter va inson miyasi</h2>
      <p>
        Kompyuterni ba'zan sun'iy "miya"ga o'xshatishadi, lekin bu unchalik ham to'g'ri emas. Inson
        miyasi ijod qiladi, his qiladi va o'zi qaror chiqaradi. Kompyuter esa unga <strong>berilgan
        aniq buyruqlarni</strong> bajaradi — xolos. Kompyuter o'zidan hech narsa "o'ylab topmaydi",
        u faqat kimdir (ya'ni dasturchi) unga yozib bergan qoidalarga amal qiladi.
      </p>
      <p>
        Bu — bu kurs davomida yodda tutadigan eng muhim fikrlardan biri: <strong>kompyuter
        o'zidan aqlli emas, u faqat unga o'rgatilgan narsani juda tez bajaradi.</strong>
      </p>

      <Exercise title={`Mashq: sen ham "kompyuter" bo'lib ko'r`}>
        <p>
          Do'stingdan yoki oila a'zolaringdan biriga oddiy bir buyruq bering: masalan, "stoldagi
          qalamni ol va menga bering". Endi shu buyruqni <strong>faqat so'zma-so'z</strong>{' '}
          bajarishini so'rang — hech qanday o'zidan qo'shimcha fikrlamasdan. Nima bo'ldi? Buyruqda
          aytilmagan biror narsani u bilmay qoldimi?
        </p>
        <Solution>
          <p>
            Ko'pincha bunday o'yinda kulgili holatlar chiqadi — masalan, "qaysi qalam" deyilmagan
            bo'lsa, odam adashib qoladi yoki noto'g'ri qalamni oladi. Aynan shu — kompyuterning
            "hayoti"! U faqat aniq aytilgan narsani tushunadi, taxmin qilmaydi. Shuning uchun
            dasturchilar kompyuterga buyruqlarni juda <strong>aniq va batafsil</strong> yozishlari
            kerak.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="Kompyuter haqida qaysi gap to'g'ri?"
        options={[
          "Kompyuter o'zi mustaqil o'ylaydi va har doim eng yaxshi qarorni tanlaydi",
          "Kompyuter unga berilgan aniq buyruqlarni juda tez bajaradigan mashina",
          "Kompyuter faqat o'yin o'ynash uchun ixtiro qilingan",
          "Kompyuter inson miyasidan aqlliroq, chunki u tezroq hisoblaydi",
        ]}
        correctIndex={1}
        explanation={`Kompyuter o'z-o'zidan hech narsani o'ylab topmaydi — u faqat unga berilgan aniq buyruqlarni juda tez va aniq bajaradi. Uning "aqli" — aslida dasturchi yozib bergan qoidalar.`}
      />

      <KeyPoints>
        <li>Kompyuter — ma'lumot qabul qiladigan, uni qayta ishlaydigan va natija chiqaradigan mashina.</li>
        <li>Kompyuter o'zidan hech narsa o'ylab topmaydi — u faqat berilgan aniq buyruqlarga amal qiladi.</li>
        <li>Kompyuterning kuchi — tezligida: u millionlab amalni bir soniyada bajara oladi.</li>
      </KeyPoints>
    </>
  )
}
