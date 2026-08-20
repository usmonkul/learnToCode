import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Rost yoki yolg'on?",
  section: 'Mantiqiy fikrlash',
}

export default function RostYokiYolgonLesson() {
  return (
    <>
      <h2>Har bir gap "rost" yoki "yolg'on" bo'la olmaydi</h2>
      <p>
        Kunlik hayotda biz juda ko'p gap eshitamiz va aytamiz. Lekin ularning hammasi bir xil
        emas. Ba'zi gaplarni tekshirib, aniq <strong>rost</strong> yoki <strong>yolg'on</strong>{' '}
        ekanini aytish mumkin. Bunday gaplarni <strong>mantiqiy gap</strong> deymiz. Masalan:
      </p>
      <ul>
        <li>"Bir haftada 7 kun bor." — rost.</li>
        <li>"Toshkent — O'zbekiston poytaxti." — rost.</li>
        <li>"Mushuklar parvoz qila oladi." — yolg'on.</li>
        <li>"Bir yilda 20 oy bor." — yolg'on.</li>
      </ul>
      <p>
        Bu gaplarning har birini tekshirib, "rost" yoki "yolg'on" deb aniq javob berish mumkin.
        Ammo hamma gap ham shunday emas. Quyidagilarni solishtiring:
      </p>
      <ul>
        <li>"Bu qo'shiq juda chiroyli." — bu shaxsiy fikr, kimdir rozi bo'lmasligi mumkin.</li>
        <li>"Bugun necha kun?" — bu savol, uni rost yoki yolg'on deb bo'lmaydi.</li>
        <li>"Eshikni yop!" — bu buyruq, u ham rost yoki yolg'on emas.</li>
      </ul>
      <p>
        Fikr, savol va buyruqlar mantiqiy gap emas — chunki ularni tekshirib, "rost" yoki
        "yolg'on" deb bo'lmaydi.
      </p>
      <Callout type="note" title="Tekshirish savoli">
        Har qanday gapga duch kelganda o'zingizdan so'rang: "Buni tekshirib, rostmi yoki
        yolg'onmi ekanini isbotlay olamanmi?" Agar javob "ha" bo'lsa — bu mantiqiy gap. Agar gap
        kimningdir shaxsiy hissiyoti, taxmini, savoli yoki buyrug'i bo'lsa — bu mantiqiy gap emas.
      </Callout>
      <Quiz
        question="Quyidagi gaplardan qaysi biri MANTIQIY GAP (ya'ni, uni rost yoki yolg'on deb aniq aytish mumkin)?"
        options={[
          'Bu film juda zerikarli',
          "Mushuklar itlardan yaxshiroq",
          'Bir kilogrammda 1000 gramm bor',
          "Menimcha, ertaga havo issiq bo'ladi",
        ]}
        correctIndex={2}
        explanation="Bu — tekshirib, aniq isbotlash mumkin bo'lgan fakt, shuning uchun mantiqiy gap. Qolgan uchtasi — shaxsiy fikr yoki taxmin, ularni 'rost' yoki 'yolg'on' deb qat'iy ayta olmaymiz."
      />

      <h2>Doim rost va doim yolg'on gapiruvchilar jumbog'i</h2>
      <p>
        Endi mantiqiy gaplardan foydalanib, kichik bir jumboqni yechamiz. Tasavvur qiling: kichik
        bir orolda ikki turdagi odam yashaydi. Bir turdagilar <strong>DOIM ROST</strong> gapiradi
        — ularning har bir gapi rost. Ikkinchi turdagilar esa <strong>DOIM YOLG'ON</strong>{' '}
        gapiradi — ularning har bir gapi yolg'on. Ular hech qachon aralashtirib gapirmaydi.
      </p>
      <Exercise title="Jumboqni yeching">
        <p>
          Orolda ikki kishi bilan tanishasiz: <strong>Bekzod</strong> va <strong>Nilufar</strong>.
          Ularning har biri — yoki doim rost gapiruvchi, yoki doim yolg'on gapiruvchi. Bekzod
          sizga shunday deydi:
        </p>
        <p>"Ikkalamiz ham yolg'onchimiz."</p>
        <p>
          Savol: Bekzod va Nilufardan kim rost gapiradi, kim yolg'on gapiradi? (Maslahat: ikkala
          imkoniyatni — "Bekzod rost gapiradi" va "Bekzod yolg'on gapiradi" — birma-bir sinab
          ko'ring va qaysi biri ziddiyatga olib kelmasligini toping.)
        </p>
        <Solution>
          <p>
            <strong>1-holat: Bekzod rost gapiradi deb faraz qilaylik.</strong> Bu holda uning
            aytgan gapi — "ikkalamiz ham yolg'onchimiz" — ham rost bo'lishi kerak. Lekin bu gap
            rost bo'lishi uchun Bekzodning o'zi ham yolg'onchi bo'lishi shart. Bu esa boshlang'ich
            farazimizga ("Bekzod rost gapiradi") to'g'ridan-to'g'ri zid keladi. Demak, bu holat
            mumkin emas.
          </p>
          <p>
            <strong>2-holat: Bekzod yolg'on gapiradi deb faraz qilaylik.</strong> Bu holda uning
            aytgan gapi yolg'on bo'lishi kerak. "Ikkalamiz ham yolg'onchimiz" gapi yolg'on bo'lishi
            uchun, bu ikkalasi birdek yolg'onchi emas — ya'ni kamida bittasi yolg'onchi emas
            degani. Bekzodning o'zi yolg'onchi ekanini farazimizdan bilamiz, demak, yolg'onchi
            emas bo'lishi kerak bo'lgan kishi — Nilufar. Ya'ni Nilufar rost gapiradi. Bu holatda
            hech qanday ziddiyat yo'q — hammasi mos tushadi.
          </p>
          <p>
            <strong>Javob:</strong> Bekzod — yolg'onchi, Nilufar — rostgo'y.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="Karim va Dilnoza haqida bitta narsani bilamiz: Karim DOIM ROST gapiradi. Bir kuni Karim shunday dedi: 'Dilnoza — yolg'onchi.' Bu holda Dilnoza haqida nima deya olamiz?"
        options={['Dilnoza rostgo\'y', 'Dilnoza yolg\'onchi', 'Buni aniqlab bo\'lmaydi', 'Ikkalasi ham to\'g\'ri']}
        correctIndex={1}
        explanation="Karim doim rost gapirgani uchun uning har qanday gapi rost bo'ladi. Demak 'Dilnoza — yolg'onchi' gapi ham rost, ya'ni Dilnoza haqiqatan ham yolg'onchi."
      />

      <KeyPoints>
        <li>
          Mantiqiy gap — rost yoki yolg'on deb aniq aytish mumkin bo'lgan gap. Savol, buyruq va
          shaxsiy fikrlar mantiqiy gap emas.
        </li>
        <li>Har bir mantiqiy gap ikkita holatdan biriga ega: yoki rost, yoki yolg'on — uchinchisi yo'q.</li>
        <li>
          Murakkab jumboqlarni yechishda har ikkala imkoniyatni ("agar rost bo'lsa..." va "agar
          yolg'on bo'lsa...") birma-bir sinab ko'rib, qaysi biri ziddiyatga olib kelmasligini
          topish — kuchli yechish usuli.
        </li>
        <li>
          O'zi haqida gapiradigan gaplarni (masalan "biz yolg'onchimiz" turidagi gaplarni)
          alohida ehtiyotkorlik bilan, qadam-baqadam tekshirish kerak.
        </li>
      </KeyPoints>
    </>
  )
}
