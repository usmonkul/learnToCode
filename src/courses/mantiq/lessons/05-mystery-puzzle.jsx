import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Amaliyot: Sirli topishmoq',
  section: 'Muammolarni tahlil qilish',
}

export default function SirliTopishmoqLesson() {
  return (
    <>
      <p>
        Endi sizda to'rtta kuchli qurol bor: <strong>muammoni aniqlash</strong>,{' '}
        <strong>uni bo'laklarga bo'lish</strong>, <strong>kerakli ma'lumotni ajratish</strong> va{' '}
        <strong>naqshni topish</strong>. Vaqt keldi — hammasini birlashtirib, bitta haqiqiy sirli
        topishmoqni yechamiz.
      </p>

      <h2>Vaziyat</h2>
      <p>
        Mantiq to'garagi rahbari Aziza opa bugun sinfga qiziq narsa qoldirdi: kitob javonining
        tepasida kichkina yog'och sandiqcha turibdi, uning ichida katta stiker to'plami bor. Lekin
        sandiqcha 3 xonali raqamli kod bilan qulflangan. Aziza opa stol ustiga bitta xat qoldirib
        ketgan:
      </p>
      <blockquote>
        Salom, tadqiqotchilar!
        <br />
        <br />
        Bugun ob-havo juda issiq, termometr ko'chada 34 gradusni ko'rsatib turibdi. Tushlikda men
        sabzavotli osh yedim — juda mazali edi. O'tgan haftada to'garagimizga 12 kishi kelgan edi,
        lekin bugun sinfda faqat 7 nafar a'zo yig'ilgan edi. Sandiqning kodini toping!
        <br />
        <br />
        1) Kodning BIRINCHI raqami — bugun to'garakka yig'ilgan a'zolar soniga teng (yuqoridagi
        hikoyani diqqat bilan qayta o'qing).
        <br />
        <br />
        2) Kodning IKKINCHI raqami — quyidagi ketma-ketlikning davomi: 1, 3, 5, 7, ? Naqshni
        toping-da, keyingi sonni yozing.
        <br />
        <br />
        3) Kodning UCHINCHI raqami: Agar hozirgi soatdan 3 soat oldin soat 5 bo'lgan bo'lsa, hozir
        soat nechida? O'sha son — oxirgi raqamimiz.
        <br />
        <br />
        Omad tilayman! — Aziza opa
      </blockquote>

      <Callout type="tip" title="Detektivlar xuddi shunday ishlaydi">
        Haqiqiy detektivlar ham katta "nima bo'lgan?" degan savolni kichik-kichik savollarga
        bo'lib, keraksiz gaplarni chetga surib, faqat dalillarga tayanib xulosa chiqarishadi. Siz
        hozir xuddi shu narsani qilasiz.
      </Callout>

      <Exercise title="Mashq: sandiqning kodini toping">
        <p>
          Yuqoridagi xatni yana bir marta diqqat bilan o'qing va sandiqning <strong>3 xonali
          kodini</strong> toping. Yordam uchun o'zingizga shu savollarni bering:
        </p>
        <ul>
          <li>Haqiqiy maqsadim nima? (Nimani topishim kerak?)</li>
          <li>Katta savolni qanday kichik savollarga bo'lsam bo'ladi?</li>
          <li>Xatdagi qaysi raqamlar haqiqatan ham kerak, qaysilari shunchaki "shovqin"?</li>
          <li>Sonlar ketma-ketligida qanday naqsh bor?</li>
        </ul>
        <Solution>
          <p>
            <strong>1-qadam — muammoni aniqlash:</strong> Hozirgi holat — sandiq yopiq, kod
            noma'lum. Maqsad — 3 xonali kodni topish.
          </p>
          <p>
            <strong>2-qadam — bo'laklarga bo'lish:</strong> "Kodni topish" degan katta savolni
            uchta kichik savolga bo'lamiz: birinchi raqam qanday, ikkinchi raqam qanday, uchinchi
            raqam qanday.
          </p>
          <p>
            <strong>3-qadam — birinchi raqam (kerakli ma'lumotni ajratish):</strong> Xatda ikkita
            son bor: "o'tgan hafta 12 kishi kelgan" va "bugun 7 nafar a'zo yig'ilgan". Savol aniq{' '}
            <em>bugungi</em> son haqida so'ragani uchun, 12 — keraksiz (eski) ma'lumot, kerakli son
            — <strong>7</strong>.
          </p>
          <p>
            <strong>4-qadam — ikkinchi raqam (naqshni topish):</strong> 1, 3, 5, 7 — bu toq sonlar,
            har safar 2 qo'shiladi. Demak keyingi son — <strong>9</strong>.
          </p>
          <p>
            <strong>5-qadam — uchinchi raqam:</strong> Agar hozirgi soatdan 3 soat oldin soat 5
            bo'lgan bo'lsa, hozir soat <code>5 + 3 = 8</code>. Uchinchi raqam —{' '}
            <strong>8</strong>.
          </p>
          <p>
            <strong>Javob: kod — 798.</strong> Tekshirib ko'raylik: birinchi raqam bugungi a'zolar
            soniga (7) teng — mos keladi; ikkinchi raqam ketma-ketlik naqshiga (9) mos keladi;
            uchinchi raqam soat hisobiga (8) mos keladi. Uchala shart ham faqat bitta-bitta aniq
            javobga olib keladi, shuning uchun kod noyob — boshqacha bo'lishi mumkin emas:{' '}
            <strong>798</strong>.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="Katta va chalkash topishmoq bilan uchrashganingizda, eng yaxshi strategiya qaysi?"
        options={[
          "Barcha mumkin bo'lgan javoblarni tasodifiy sinab ko'rish",
          "Avval nimani topish kerakligini aniqlab, uni kichik savollarga bo'lib, faqat kerakli faktlarga e'tibor berish va naqshlarni izlash",
          "Topishmoqning eng qiyin qismidan boshlash, qolganini o'qimaslik",
          "Darhol tasodifiy javob yozib, tekshirmasdan qoldirish",
        ]}
        correctIndex={1}
        explanation="Muammoni aniqlash, uni bo'laklarga bo'lish, keraksiz ma'lumotni chetga surish va naqshlarni izlash — bu tartib istalgan chalkash topishmoqni tizimli tarzda yechishga yordam beradi."
      />

      <KeyPoints>
        <li>
          <strong>Muammoni aniqlash</strong> — hozirgi holat va maqsadni aniq bilish, aynan nimani
          topish kerakligini tushunish.
        </li>
        <li>
          <strong>Bo'laklarga bo'lish</strong> — katta va murakkab savolni bir nechta kichik, oson
          savollarga ajratish.
        </li>
        <li>
          <strong>Kerakli ma'lumotni ajratish</strong> — uzun matn ichidan faqat javobga kerakli
          faktlarni topib, qolganini chetga surish.
        </li>
        <li>
          <strong>Naqshni topish</strong> — ketma-ketliklarda va vaziyatlarda takrorlanuvchi
          qoidani payqash.
        </li>
        <li>
          Bu to'rtta ko'nikma birgalikda ishlaganda, hatto eng chalkash topishmoq ham bosqichma-bosqich
          yechiladigan oddiy vazifaga aylanadi — bu esa nafaqat o'yinlarda, balki hayotning istalgan
          murakkab vaziyatida ishlaydi.
        </li>
      </KeyPoints>
    </>
  )
}
