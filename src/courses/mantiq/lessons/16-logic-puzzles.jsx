import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Amaliyot: Mantiqiy jumboqlar',
  section: 'Mantiqiy fikrlash',
}

export default function MantiqiyJumboqlarLesson() {
  return (
    <>
      <p>
        Rost va yolg'onni ajratish, "agar... u holda" xulosalar chiqarish, VA/YOKI/EMAS bilan
        imkoniyatlarni toraytirish, tartibni hisobga olish va faktlarni birma-bir solishtirib
        chiqish — bularning barchasi bitta katta ko'nikmaning qismlari: sinchkovlik bilan, qadam
        baqadam fikrlash. Endi shu ko'nikmalarning barchasini bitta jumboqda birlashtiramiz.
      </p>

      <h2>Jumboq: Uch do'st</h2>
      <p>
        Uchta bola bor: <strong>Aziz</strong>, <strong>Malika</strong> va <strong>Sardor</strong>.
        Ularning har biri boshqa-boshqa <strong>sport</strong> turi bilan shug'ullanadi — futbol,
        shaxmat yoki suzish — va boshqa-boshqa <strong>shaharda</strong> yashaydi — Toshkent,
        Samarqand yoki Buxoro. Har bir sport faqat bitta bolaga tegishli, har bir shahar ham
        faqat bitta bolaga tegishli.
      </p>
      <Callout type="tip" title="Yordamchi maslahat">
        Qog'ozga uchta ustun chizib, har bir bolaning ismi qarshisiga aniqlangan faktlarni yozib
        boring. Har bir yangi xulosa keyingisiga poydevor bo'ladi — shuning uchun faktlarni
        tartib bilan, qadam baqadam qo'llang.
      </Callout>

      <Exercise title="Jumboqni yeching">
        <p>Quyidagi 5 ta faktdan foydalanib, har bir bolaning sportini va shahrini toping:</p>
        <ol>
          <li>Malika Buxoroda ham, Samarqandda ham yashamaydi.</li>
          <li>Agar bola Toshkentda yashasa, u suzish bilan shug'ullanmaydi.</li>
          <li>Aziz futbol YOKI shaxmat bilan shug'ullanadi.</li>
          <li>Suzish bilan shug'ullanadigan bola Samarqandda yashamaydi.</li>
          <li>Agar bola Toshkentda yashasa, u futbol bilan ham shug'ullanmaydi.</li>
        </ol>
        <Solution>
          <p>
            <strong>1-qadam (1-fakt):</strong> Malika Buxoroda ham, Samarqandda ham yashamaydi.
            Uchta shahardan ikkitasi unga to'g'ri kelmasa, faqat Toshkent qoladi. → Malika —
            Toshkent.
          </p>
          <p>
            <strong>2-qadam (2-fakt + 1-qadam):</strong> Malika Toshkentda yashaydi. 2-faktga
            ko'ra, Toshkentda yashovchi bola suzish bilan shug'ullanmaydi. → Malika suzmaydi.
          </p>
          <p>
            <strong>3-qadam (5-fakt + 1-qadam):</strong> Xuddi shunday, 5-faktga ko'ra
            Toshkentda yashovchi bola futbol bilan ham shug'ullanmaydi. → Malika futbol bilan ham
            shug'ullanmaydi.
          </p>
          <p>
            <strong>4-qadam (2- va 3-qadamlardan):</strong> Malika na suzish, na futbol bilan
            shug'ullanadi. Uchta sportdan ikkitasi unga to'g'ri kelmasa, faqat shaxmat qoladi. →
            Malika — shaxmat.
          </p>
          <p>
            <strong>5-qadam (3-fakt):</strong> Aziz futbol yoki shaxmat bilan shug'ullanadi —
            demak, Aziz suzish bilan shug'ullanmaydi.
          </p>
          <p>
            <strong>6-qadam (4- va 5-qadamlardan):</strong> Shaxmat allaqachon Malikaga tegishli
            (4-qadam), Aziz esa suzmaydi (5-qadam). Uch boladan — Malika, Aziz, Sardor — suzish
            kimga qoladi? Malikaga emas, Azizga emas — demak, Sardorga. → Sardor — suzish.
          </p>
          <p>
            <strong>7-qadam (4-fakt + 6-qadam):</strong> 4-faktga ko'ra, suzuvchi bola
            Samarqandda yashamaydi. Sardor suzadi, demak Sardor Samarqandda yashamaydi.
            Toshkent esa allaqachon Malikaga tegishli (1-qadam). Uchta shahardan ikkitasi
            Sardorga to'g'ri kelmasa, faqat Buxoro qoladi. → Sardor — Buxoro.
          </p>
          <p>
            <strong>8-qadam:</strong> Uchta shahardan ikkitasi band: Toshkent — Malikaniki,
            Buxoro — Sardorniki. Qolgan shahar — Samarqand — Azizga tegishli. → Aziz — Samarqand.
          </p>
          <p>
            <strong>9-qadam:</strong> Uchta sportdan ikkitasi band: shaxmat — Malikaniki, suzish
            — Sardorniki. Qolgan sport — futbol — Azizga tegishli. → Aziz — futbol.
          </p>
          <table>
            <thead>
              <tr>
                <th>Bola</th>
                <th>Sport</th>
                <th>Shahar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Aziz</td>
                <td>Futbol</td>
                <td>Samarqand</td>
              </tr>
              <tr>
                <td>Malika</td>
                <td>Shaxmat</td>
                <td>Toshkent</td>
              </tr>
              <tr>
                <td>Sardor</td>
                <td>Suzish</td>
                <td>Buxoro</td>
              </tr>
            </tbody>
          </table>
          <p>
            Barcha 5 ta faktni bu javob bilan tekshirib ko'ring — har biri to'liq mos keladi, va
            boshqa hech qanday taqsimot bunga to'g'ri kelmaydi.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="Mantiqiy jumboqni yechishni qaysi faktdan boshlash maqsadga muvofiq?"
        options={[
          'Eng noaniq va umumiy faktdan',
          'Eng ko\'p imkoniyatni darhol chiqarib tashlaydigan (eng cheklovchi) faktdan',
          'Har doim ro\'yxatdagi oxirgi faktdan',
          'Faktlarning tartibi ahamiyatsiz, tasodifiy boshlasa ham bo\'ladi',
        ]}
        correctIndex={1}
        explanation="Eng aniq va cheklovchi fakt darhol ko'p imkoniyatni chiqarib tashlaydi, shundan keyin qolgan faktlarni qo'llash ancha osonlashadi."
      />

      <Quiz
        question="Jumboqni yechib bo'lgach, barcha faktlarga mos keladigan IKKITA xil javob topsangiz, bu nimani anglatadi?"
        options={[
          "Jumboq juda oson ekan",
          "Nimadir noto'g'ri — yo bir faktni noto'g'ri qo'llagansiz, yo jumboqda yetarli ma'lumot yo'q",
          'Ikkala javob ham to\'g\'ri deb qabul qilinadi',
          'Bu mantiqiy jumboqlarda odatiy holat',
        ]}
        correctIndex={1}
        explanation="Yaxshi mantiqiy jumboqda faqat bitta to'g'ri javob bo'lishi kerak. Ikkita javob chiqsa, biror xulosa noto'g'ri chiqarilgan yoki faktlar yetarli emas."
      />

      <KeyPoints>
        <li>Mantiqiy gaplar aniq rost yoki yolg'on bo'ladi — har bir faktni shu tarzda tekshiramiz.</li>
        <li>"Agar... u holda" qoidalari ma'lum faktlardan yangi xulosalar chiqarish imkonini beradi.</li>
        <li>VA, YOKI, EMAS bog'lovchilari yordamida imkoniyatlar doirasi bosqichma-bosqich toraytiriladi.</li>
        <li>
          Nomzodlarni tartib bilan elab, mos kelmaydiganlarini chiqarib tashlash — istalgan
          mantiqiy jumboqni yechishning asosiy usuli.
        </li>
        <li>
          Yaxshi jumboqda barcha faktlar birlashganda aynan bitta yechim qoladi — ortiqcha ham,
          kam ham emas.
        </li>
      </KeyPoints>
    </>
  )
}
