import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Xatoni top va tuzat',
  section: 'Algoritmik yondashuv',
}

export default function XatoniTopVaTuzatLesson() {
  return (
    <>
      <p>
        Hatto eng yaxshi rejalashtirilgan algoritm ham xato bo'lishi mumkin. Bu — muvaffaqiyatsizlik
        belgisi emas, balki dasturchilar (va umuman rejalashtiruvchilarning barchasi) har kuni
        duch keladigan oddiy holat. Xatoni ingliz tilida <strong>"bug"</strong> deyishadi, uni
        topib tuzatish esa — <strong>"debugging"</strong>. Bu — juda qadrli ko'nikma.
      </p>

      <h2>Qadam-baqadam tekshirish usuli</h2>
      <p>
        Xatoni topishning eng ishonchli yo'li — 'Robotni boshqar' o'yinida qilganimizdek,
        algoritmni bitta-bitta qadam bo'yicha, boshidan boshlab bajarib chiqish. Har qadamdan
        keyin o'zingizdan so'rang: "hozir nima bo'ldi? Bu men kutgan holatmi?" Qaysi qadamdan
        keyin javob "yo'q" bo'lsa — xato aynan o'sha yerda.
      </p>
      <Callout type="tip" title="Xato topish — uyat emas, ustalik">
        Tajribali dasturchilar ham har kuni xato qiladi. Farqi shundaki, ular xatoni tez
        topishni va vahima qilmasdan tuzatishni bilishadi. Xatoni topa olish — bu algoritmni
        chuqur tushunganingizning belgisi.
      </Callout>

      <h2>Xato #1: sovuq choy</h2>
      <Exercise title="Nima xato?">
        <p>Do'stingiz choy damlash algoritmini shunday yozdi:</p>
        <ol>
          <li>Choynakka suv solish.</li>
          <li>Piyolaga choy barglarini solish.</li>
          <li>5 daqiqa kutish.</li>
          <li>Piyolaga quyish.</li>
        </ol>
        <p>
          U bu algoritmni bajardi, lekin choy sovuq va xom chiqdi. Algoritmni qadam-baqadam
          tekshiring: qaysi qadamdan keyin natija kutilganidan farq qila boshlaydi? Nima
          yetishmayapti?
        </p>
        <Solution>
          <p>
            Qadam-baqadam tekshirsak: 1-qadamdan keyin — choynakda suv bor, kutilganidek. 2 va
            3-qadamlardan keyin ham hammasi to'g'riday ko'rinadi. Lekin diqqat qiling: suv hech
            qachon <strong>qaynatilmagan</strong>! Algoritmda "suvni qaynatish" qadami butunlay
            yo'q — bu <strong>yetishmagan qadam</strong> turidagi xato. To'g'irlangan variant:
          </p>
          <ol>
            <li>Choynakka suv solish.</li>
            <li>Suvni qaynatish.</li>
            <li>Piyolaga choy barglarini solish.</li>
            <li>Qaynagan suvni piyolaga quyish.</li>
            <li>5 daqiqa kutish.</li>
          </ol>
        </Solution>
      </Exercise>

      <h2>Xato #2: tugamaydigan supurish</h2>
      <Exercise title="Nima xato?">
        <p>Boshqa bir algoritm shunday yozilgan:</p>
        <ol>
          <li>Xonani supurish boshlash.</li>
          <li>Xona osmonga uchib ketguncha TAKRORLA: supurish.</li>
        </ol>
        <p>
          Bu algoritmni ishga tushirgan bola hech qachon to'xtay olmadi. Nega bu algoritm
          tugamaydi? Uni qanday tuzatasiz?
        </p>
        <Solution>
          <p>
            "Xona osmonga uchib ketishi" degan shart — umuman rost bo'lmaydigan, hech qachon
            bajarilmaydigan shart. Shuning uchun "TAKRORLA, toki shart bajarilguncha" qismi
            hech qachon to'xtamaydi — bu <strong>cheksiz tsikl</strong> turidagi xato,
            noto'g'ri (mumkin bo'lmagan) to'xtash sharti tufayli yuzaga kelgan. To'g'irlangan
            variant — shartni haqiqiy va tekshirsa bo'ladigan holatga almashtirish kerak:
          </p>
          <ol>
            <li>Xonani supurish boshlash.</li>
            <li>Polda axlat qolmaguncha TAKRORLA: supurish.</li>
          </ol>
        </Solution>
      </Exercise>

      <h2>Xato #3: noto'g'ri tartibda kiyinish</h2>
      <Exercise title="Nima xato?">
        <p>Ertalab kiyinish algoritmi shunday yozilgan:</p>
        <ol>
          <li>Poyabzalni kiyish.</li>
          <li>Paypoqni kiyish.</li>
          <li>Uydan chiqish.</li>
        </ol>
        <p>
          Bu algoritm "maqsadga" olib bormaydi — ya'ni qulay va toza kiyinib chiqishga.
          Nima xato va uni qanday tuzatasiz?
        </p>
        <Solution>
          <p>
            Qadamlarning o'zi to'g'ri, lekin ular <strong>noto'g'ri tartibda</strong> yozilgan —
            poyabzal paypoqdan oldin kiyilgan, bu esa amalda mumkin emas (yoki juda noqulay).
            Bu <strong>tartib xatosi</strong>. To'g'irlangan variant — shunchaki ikkita
            qadamning o'rnini almashtirish kifoya:
          </p>
          <ol>
            <li>Paypoqni kiyish.</li>
            <li>Poyabzalni kiyish.</li>
            <li>Uydan chiqish.</li>
          </ol>
        </Solution>
      </Exercise>

      <Quiz
        question="Algoritmda 'krossovka kiy, keyin bog'chaga bor' deyilgan, lekin 'paypoq kiy' degan qadam butunlay yo'q. Bu qanday xato turi?"
        options={[
          'Yetishmagan qadam',
          "Noto'g'ri tartib",
          'Cheksiz tsikl',
          'Bu umuman xato emas',
        ]}
        correctIndex={0}
        explanation="Algoritmda kerakli qadamning o'zi butunlay yozilmagan — bu 'yetishmagan qadam' turidagi xato, tartib yoki to'xtash sharti bilan bog'liq emas."
      />

      <KeyPoints>
        <li>
          Xato (bug) — algoritm yozganda tabiiy holat; uni topish va tuzatish (debugging)
          qadrli va o'rganiladigan ko'nikma.
        </li>
        <li>
          Xatoni topishning ishonchli usuli — algoritmni qadam-baqadam bajarib, har qadamdan
          keyin "bu men kutgan holatmi?" deb tekshirish.
        </li>
        <li>
          Uch keng tarqalgan xato turi bor: <strong>yetishmagan qadam</strong>,{' '}
          <strong>noto'g'ri tartib</strong> va <strong>noto'g'ri (yoki yo'q) to'xtash shart</strong>{' '}
          (cheksiz tsiklga olib keladi).
        </li>
        <li>
          Xatoni tuzatish ko'pincha katta o'zgarish emas — bitta yetishmagan qadamni qo'shish,
          ikkita qadamning tartibini almashtirish yoki shartni to'g'irlash kifoya qiladi.
        </li>
      </KeyPoints>
    </>
  )
}
