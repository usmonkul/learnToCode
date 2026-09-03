import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Salom, Dunyo!',
  section: 'Boshlash uchun',
}

export default function HelloWorldLesson() {
  return (
    <>
      <p>
        JavaScript — veb-sahifalarni statik (o'zgarmas) rasmdan interaktiv, "jonli" tajribaga
        aylantiruvchi dasturlash tili (programming language). HTML sahifaning tuzilishini,
        CSS uning ko'rinishini belgilasa, JavaScript sahifaga <strong>xatti-harakat</strong>{' '}
        (behavior) qo'shadi: tugma bosilganda nimadir sodir bo'lishi, forma to'g'ri
        to'ldirilmasa xato ko'rsatilishi, sahifa qayta yuklanmasdan yangi ma'lumot yuklanishi —
        bularning barchasi JavaScript orqali amalga oshadi.
      </p>
      <p>
        JavaScript dastlab faqat brauzerda ishlash uchun yaratilgan edi, lekin hozirda undan
        ancha kengroq foydalaniladi:
      </p>
      <ul>
        <li>
          <strong>Frontend (veb-interfeys):</strong> saytlardagi barcha interaktivlik —
          menyular, formalar, animatsiyalar, real vaqtdagi yangilanishlar — JavaScript orqali
          yoziladi. React, Vue kabi mashhur kutubxonalar ham aynan shu tilda ishlaydi.
        </li>
        <li>
          <strong>Backend (server):</strong> Node.js tufayli JavaScript brauzerdan tashqarida,
          serverda ham ishlay oladi — ma'lumotlar bazasi bilan ishlash, API yaratish va
          boshqalar.
        </li>
        <li>
          <strong>Mobil va desktop ilovalar:</strong> React Native, Electron kabi vositalar
          yordamida bitta til bilan mobil va kompyuter ilovalarini ham yozish mumkin.
        </li>
      </ul>
      <p>
        JavaScript'ning eng katta afzalligi — u <strong>har bir zamonaviy brauzerda o'rnatilgan
        holda</strong> keladi, ya'ni uni ishga tushirish uchun alohida dastur o'rnatish shart
        emas. Shu sababli u dunyoda eng ko'p qo'llaniladigan dasturlash tillaridan biriga
        aylangan.
      </p>
      <p>
        Har qanday dasturlash tilini o'rganishni an'anaviy ravishda ekranga matn chiqarishdan
        boshlaymiz. Buning uchun JavaScript'da <code>console.log()</code> funksiyasidan
        foydalanamiz:
      </p>
      <CodeBlock lang="javascript">{`console.log("Salom, Dunyo!")`}</CodeBlock>
      <p>
        Bu kodni ishga tushirganingizda, brauzer konsolida (yoki terminalda) <code>Salom,
        Dunyo!</code> matni chiqadi. <code>console.log()</code> funksiyasi qavs ichidagi
        qiymatni konsolga chiqaradi.
      </p>
      <Callout type="tip" title="Maslahat">
        Bir nechta qiymatni vergul bilan ajratib, bitta <code>console.log()</code> chaqiruvida
        chiqarishingiz mumkin: <code>console.log("Salom,", "Dunyo!")</code>
      </Callout>
      <p>Keling, yana bir misolga qaraymiz:</p>
      <CodeBlock lang="javascript">{`console.log("JavaScript o'rganish qiziqarli!")
console.log("Bu ikkinchi qator.")`}</CodeBlock>
      <Quiz
        question={`console.log("Ismim:", "Aziz") kodi konsolga nimani chiqaradi?`}
        options={[
          '"Ismim:Aziz"',
          'Ismim: Aziz',
          'Xatolik yuz beradi',
          "Faqat \"Aziz\" chiqadi",
        ]}
        correctIndex={1}
        explanation={`console.log() vergul bilan ajratilgan barcha qiymatlarni, orasiga bo'sh joy qo'yib, ketma-ket chiqaradi: Ismim: Aziz.`}
      />

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Birinchi qatorlar">
        <p>
          <code>console.log()</code>dan foydalanib, ketma-ket uchta qatorda o'zingiz haqingizda
          yozing: ismingiz, yashash shahringiz va sevimli mashg'ulotingiz.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`console.log("Ismim: Aziz")
console.log("Shahrim: Toshkent")
console.log("Sevimli mashg'ulotim: kitob o'qish")`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Bitta chaqiruvda bir nechta qiymat">
        <p>
          Bitta <code>console.log()</code> chaqiruvida, vergul bilan ajratib, ismingiz va
          yoshingizni chiqaring (masalan: <code>Ismim: Aziz Yoshim: 22</code>).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`console.log("Ismim:", "Aziz", "Yoshim:", 22)`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Kichik she'r">
        <p>
          To'rtta alohida <code>console.log()</code> chaqiruvi yordamida, har birida bitta
          qatordan iborat, o'zingiz tanlagan qisqa she'r yoki gaplar to'plamini konsolga
          chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`console.log("Quyosh chiqdi tog' ustidan,")
console.log("Nur sochildi dala-dashtdan.")
console.log("Bugun kunim bo'lsin yaxshi,")
console.log("Har bir qadam ilm izidan.")`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>JavaScript veb-sahifalarga interaktivlik (xatti-harakat) qo'shadigan til.</li>
        <li>
          Brauzerda (frontend), serverda (Node.js orqali backend) va hatto mobil/desktop
          ilovalarda ham ishlatiladi.
        </li>
        <li>
          <code>console.log()</code> funksiyasi konsolga matn yoki qiymat chiqarish uchun
          ishlatiladi.
        </li>
        <li>Matnlar (string) qo'shtirnoq yoki bitta tirnoq ichida yoziladi.</li>
        <li>
          Har bir <code>console.log()</code> chaqiruvi natijani yangi qatordan boshlaydi.
        </li>
      </KeyPoints>
    </>
  )
}
