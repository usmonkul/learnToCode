import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Muammo nima o'zi?",
  section: 'Muammolarni tahlil qilish',
}

export default function MuammoNimaLesson() {
  return (
    <>
      <p>
        Xush kelibsiz! Bu kurs sizga <strong>muammolarni yechuvchi kabi fikrlashni</strong>{' '}
        o'rgatadi — bu ko'nikma shaxmatda ham, sport musobaqasida ham, uy vazifasida ham, hatto
        do'stlaringiz bilan janjalni yarashtirishda ham kerak bo'ladi. Va eng qizig'i shundaki, bu
        ko'nikmani rivojlantirish uchun kompyuter deyarli kerak emas — bizga faqat miyamiz,
        qog'oz-qalam va biroz qiziqish kifoya.
      </p>
      <p>Lekin avval eng muhim savoldan boshlaylik: umuman, "muammo" nima o'zi?</p>

      <h2>Muammo — bu ikki nuqta orasidagi masofa</h2>
      <p>
        Har qanday muammoni ikkita narsa orqali tasvirlash mumkin:
      </p>
      <ul>
        <li>
          <strong>Hozirgi holat</strong> — hozir vaziyat qanday turibdi.
        </li>
        <li>
          <strong>Maqsad (natija)</strong> — siz qayerga yetib bormoqchisiz, vaziyat qanday
          bo'lishini xohlaysiz.
        </li>
      </ul>
      <p>
        Muammo — aynan shu ikkisi orasidagi <strong>farq</strong>. Agar hozirgi holat va maqsad bir
        xil bo'lsa, muammo yo'q — hammasi allaqachon joyida. Farq qancha katta bo'lsa, muammo shuncha
        "og'ir" his qilinadi. Va yechim topish degani — aynan shu farqni yo'qotadigan yo'lni topish
        degani.
      </p>

      <h2>Kundalik hayotdan misollar</h2>
      <p>Keling, bu g'oyani tanish vaziyatlarda ko'raylik:</p>
      <ul>
        <li>
          <strong>Maktabga sumka yig'ish.</strong> Hozirgi holat: kitoblar, daftarlar va qalamlar
          xonada tarqoq yotibdi. Maqsad: ertangi darslar uchun kerakli hamma narsa sumkada, tayyor.
        </li>
        <li>
          <strong>Tartibsiz xona.</strong> Hozirgi holat: kiyimlar stulda, o'yinchoqlar polda,
          kitoblar stolda uyum bo'lib yotibdi. Maqsad: har bir narsa o'z joyida, xona toza.
        </li>
        <li>
          <strong>Futbolda g'alaba qozonish strategiyasi.</strong> Hozirgi holat: ikkala jamoa ham
          hali gol urmagan, o'yin hozirgina boshlangan. Maqsad: o'yin oxirida sizning jamoangiz
          ko'proq gol urgan bo'lishi.
        </li>
        <li>
          <strong>Uy vazifasini o'z vaqtida topshirish.</strong> Hozirgi holat: vazifa hali
          bajarilmagan, ertaga topshirish kerak. Maqsad: vazifa to'liq bajarilgan va o'z vaqtida
          topshirilgan.
        </li>
      </ul>
      <p>
        Diqqat qiling — har bir misolda biz aniq ikkita narsani ayta oldik: "hozir qanday" va
        "qanday bo'lishi kerak". Shu ikkitasini aniq ayta olsangiz, siz muammoni tushunib
        yetgansiz — bu esa uni yechishning birinchi qadami.
      </p>

      <Callout type="tip" title="Buyuk kashfiyotlar qayerdan boshlanadi?">
        Ko'plab mashhur ixtirolar aslida kimdir bir muammoni <em>juda chuqur tushunib
        yetganidan</em> boshlangan. Muammoni aniq ko'ra olmagan odam uni hech qachon yaxshi yecha
        olmaydi — shuning uchun bu kursda biz avval "muammoni ko'rish"ni, keyin uni yechishni
        o'rganamiz.
      </Callout>

      <h2>Bu kursda nimalarni o'rganamiz?</h2>
      <p>
        Ushbu bo'limda siz muammoni tahlil qilishning to'rtta muhim ko'nikmasini o'rganasiz:
        muammoni to'g'ri aniqlash, uni kichik bo'laklarga bo'lish, kerakli ma'lumotni
        keraksizidan ajratish va naqshlarni (pattern) payqash. Keyingi darslarda esa shu
        ko'nikmalar orqali haqiqiy jumboqlarni yechamiz.
      </p>

      <Exercise title="Mashq: bugungi uchta muammoingiz">
        <p>
          Bugungi kuningizni eslang va o'zingizga tegishli <strong>uchta kichik muammoni</strong>{' '}
          toping (masalan: uyqudan kech turib qolish, do'stingiz bilan kelisha olmaslik, telefon
          quvvati tugab qolishi). Har biri uchun "hozirgi holat" va "maqsad"ni yozing.
        </p>
        <Solution>
          <p>Bu — sizning shaxsiy javobingiz, lekin format taxminan shunday bo'lishi kerak:</p>
          <ul>
            <li>
              <strong>Muammo:</strong> Ertalab uyqudan kech turib qoldim. <strong>Hozirgi holat:</strong>{' '}
              soat 8:00, hali kiyinmaganman. <strong>Maqsad:</strong> 8:20 gacha maktabga chiqib
              ulgurish.
            </li>
            <li>
              <strong>Muammo:</strong> Matematika masalasi chiqmayapti. <strong>Hozirgi holat:</strong>{' '}
              masala yarim yechilgan, qayerda xato borligi noma'lum. <strong>Maqsad:</strong> to'g'ri
              javobga ega bo'lish.
            </li>
            <li>
              <strong>Muammo:</strong> Telefon quvvati 5% qoldi. <strong>Hozirgi holat:</strong>{' '}
              quvvat tugayapti, zaryadlovchi topilmayapti. <strong>Maqsad:</strong> telefon o'chib
              qolmasligi.
            </li>
          </ul>
        </Solution>
      </Exercise>

      <Quiz
        question="Quyidagilardan qaysi biri haqiqiy 'muammo' hisoblanadi (aniq hozirgi holat va aniq maqsadga ega)?"
        options={[
          "Osmon bugun ko'k rangda",
          "Velosipedimning g'ildiragi puchayib qolgan, lekin maktabga vaqtida yetib borishim kerak",
          "Do'stimning ismi Aziz",
          'Bugun juma kuni',
        ]}
        correctIndex={1}
        explanation="Bu variantda aniq hozirgi holat (g'ildirak puchayib qolgan) va aniq maqsad (vaqtida yetib borish) bor — orasida yechish kerak bo'lgan farq mavjud. Qolganlari shunchaki faktlar, ular orasida yechilishi kerak bo'lgan farq yo'q."
      />

      <KeyPoints>
        <li>
          Muammo — hozirgi holat bilan maqsad orasidagi farq; yechim shu farqni yo'qotadigan yo'l.
        </li>
        <li>
          Har qanday muammoni tushunish uchun ikkita savolga aniq javob bering: "hozir qanday?" va
          "qanday bo'lishi kerak?".
        </li>
        <li>
          Kundalik hayotdagi ko'plab vaziyatlar (sumka yig'ish, xona tartibga solish, o'yin
          strategiyasi) aslida shu bir xil qolipga tushadi.
        </li>
        <li>
          Muammoni chuqur tushunish — uni yechishning birinchi va eng muhim qadami.
        </li>
      </KeyPoints>
    </>
  )
}
