import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Ma'lumotlar bazasi va SQL nima?",
  section: 'Kirish',
}

export default function MalumotlarBazasiVaSqlNimaLesson() {
  return (
    <>
      <h2>Ma'lumotlar bazasi (database) nima?</h2>
      <p>
        Ma'lumotlar bazasi (database) — bu katta hajmdagi ma'lumotlarni tartibli, tuzilgan
        (structured) holda saqlash uchun mo'ljallangan tizim. Har bir onlayn-do'kon mahsulotlar
        ro'yxatini, har bir ijtimoiy tarmoq foydalanuvchilar profilini, har bir bank esa
        mijozlarning hisob raqamlarini aynan shunday tizimlarda saqlaydi. Ma'lumotlar bazasi
        ma'lumotni nafaqat saqlaydi, balki uni tez topish, yangilash va boshqa ma'lumotlar bilan
        bog'lash imkonini ham beradi.
      </p>
      <p>
        Nega oddiy jadval (masalan, Excel jadvali) yetarli emas, degan savol tug'ilishi mumkin.
        Kichik hajmdagi ma'lumot uchun elektron jadval (spreadsheet) yetarli bo'lishi mumkin,
        lekin ma'lumot hajmi va foydalanuvchilar soni oshgani sari bir nechta muammo paydo
        bo'ladi:
      </p>
      <ul>
        <li>
          <strong>Tezlik.</strong> Millionlab qatorli jadvalda kerakli ma'lumotni qo'lda yoki
          oddiy filtr orqali qidirish juda sekin ishlaydi.
        </li>
        <li>
          <strong>Bir vaqtda ko'p foydalanuvchi.</strong> Bir vaqtning o'zida yuzlab yoki
          minglab odam bitta faylni o'qib-yozishi kerak bo'lsa, elektron jadval bunga
          moslashmagan — fayl qulflanib qoladi yoki ma'lumot ziddiyatga (conflict) uchraydi.
        </li>
        <li>
          <strong>Ma'lumotlar bog'liqligi.</strong> Mijozlar, buyurtmalar va mahsulotlar kabi
          bir-biriga bog'liq ma'lumotlarni izchil (consistent) tarzda saqlash va ular orasidagi
          bog'lanishni ta'minlash jadvalda qiyin.
        </li>
        <li>
          <strong>Ishonchlilik.</strong> Ma'lumotlar bazasi noto'g'ri kiritilgan qiymatlarning
          oldini olish (masalan, narxni matn sifatida kiritishga yo'l qo'ymaslik) kabi qoidalarni
          o'rnatish imkonini beradi.
        </li>
      </ul>
      <Callout type="note" title="Elektron jadval ham kichik loyihalar uchun yaroqli">
        Bu degani, elektron jadval umuman yomon degani emas — kichik, shaxsiy hisob-kitoblar
        uchun u hozir ham juda qulay. Lekin dastur yoki veb-sayt ko'p foydalanuvchi va katta
        hajmdagi ma'lumot bilan ishlaganda, ma'lumotlar bazasi ancha ishonchli va tez yechim
        beradi.
      </Callout>

      <h2>Jadval (table) nima?</h2>
      <p>
        Ma'lumotlar bazasi ichida ma'lumot odatda <strong>jadval (table)</strong> ko'rinishida
        saqlanadi — xuddi Excel varag'iga o'xshab, satrlar (rows) va ustunlardan (columns)
        tashkil topgan tuzilma. Masalan, onlayn-do'konning mahsulotlar jadvali quyidagicha
        tasavvur qilinishi mumkin:
      </p>
      <ul>
        <li>Har bir <strong>ustun (column)</strong> — mahsulotning bitta xususiyati: nomi, narxi, kategoriyasi.</li>
        <li>Har bir <strong>satr/qator (row)</strong> — bitta aniq mahsulot haqidagi to'liq ma'lumot.</li>
      </ul>
      <p>
        Odatda ma'lumotlar bazasida bir emas, bir nechta jadval bo'ladi — masalan, alohida
        mahsulotlar jadvali, alohida mijozlar jadvali, alohida buyurtmalar jadvali. Bu jadvallar
        bir-biri bilan bog'lanib, birgalikda to'liq tizimni tashkil qiladi. Bu haqda keyingi
        darslarda batafsil to'xtalamiz — hozircha faqat "jadval" tushunchasini yodda tuting.
      </p>

      <h2>SQL nima?</h2>
      <p>
        SQL (Structured Query Language — "tuzilgan so'rovlar tili") — bu ma'lumotlar bazasidan
        ma'lumot so'rash, uni qo'shish, o'zgartirish yoki o'chirish uchun ishlatiladigan maxsus
        til. Uni dasturlash tili emas, balki ma'lumotlar bazasi bilan "muloqot qilish" tili deb
        tushunish qulayroq: siz SQL yordamida bazaga savol berasiz ("qaysi mahsulotlar 500 000
        so'mdan arzon?"), baza esa javob sifatida mos qatorlarni qaytaradi.
      </p>
      <p>
        SQL deyarli barcha zamonaviy ma'lumotlar bazalarida (PostgreSQL, MySQL, SQLite, SQL
        Server va boshqalar) ishlatiladi, shuning uchun uni o'rganish juda foydali ko'nikma
        hisoblanadi. SQL quyidagi sohalarda keng qo'llaniladi:
      </p>
      <ul>
        <li>
          <strong>Veb-ilovalar (web apps).</strong> Onlayn-do'kon, ijtimoiy tarmoq yoki bank
          ilovasi — foydalanuvchi har safar sahifani ochganda, orqa tomonda (backend) SQL
          so'rovlari ishlab, kerakli ma'lumotni ekranga chiqaradi.
        </li>
        <li>
          <strong>Tahlil (analytics).</strong> Kompaniyalar sotuvlar, foydalanuvchi xatti-harakati
          kabi katta hajmdagi ma'lumotlarni tahlil qilish uchun SQL so'rovlaridan foydalanadi.
        </li>
        <li>
          <strong>Hisobotlar (reporting).</strong> Oylik daromad, eng ko'p sotilgan mahsulot kabi
          hisobotlar ko'pincha to'g'ridan-to'g'ri SQL so'rovlari orqali tayyorlanadi.
        </li>
        <li>
          <strong>Ma'muriy ishlar (administration).</strong> Ma'lumotlar bazasini sozlash,
          foydalanuvchilarga ruxsat berish va uni boshqarish ham SQL orqali amalga oshiriladi.
        </li>
      </ul>
      <Callout type="tip" title="Keyingi darslardan boshlab — jonli amaliyot">
        Keyingi darsdan boshlab siz haqiqiy SQL so'rovlarini o'zingiz yozib, natijasini o'z
        ko'zingiz bilan ko'rasiz — sayt ichidagi maxsus "SQL maydonchasi" orqali. Bu darsda esa
        faqat asosiy tushunchalar bilan tanishib chiqamiz.
      </Callout>

      <Quiz
        question="Ma'lumotlar bazasi katta hajmdagi ma'lumot uchun elektron jadvaldan (spreadsheet) nima uchun ko'proq afzal?"
        options={[
          "Ma'lumotlar bazasi rangli diagrammalarni chiroyliroq chizadi",
          "Ma'lumotlar bazasi tez, bir nechta foydalanuvchi bilan bir vaqtda ishlashga va ma'lumotlar bog'liqligini saqlashga mos",
          "Elektron jadvalda umuman son saqlab bo'lmaydi",
          "SQL faqat ma'lumotlar bazasida ishlaydi, boshqa hech qayerda ishlatilmaydi",
        ]}
        correctIndex={1}
        explanation="Ma'lumotlar bazasi katta hajmdagi ma'lumot, ko'p foydalanuvchi va bog'liq ma'lumotlarni izchil saqlash uchun maxsus loyihalangan — bular elektron jadvalning kuchsiz tomonlari."
      />

      <Quiz
        question="Quyidagilardan qaysi biri SQL nima ekanini eng to'g'ri ta'riflaydi?"
        options={[
          'Veb-sayt dizayni uchun ishlatiladigan til',
          "Ma'lumotlar bazasidan ma'lumot so'rash va uni boshqarish uchun ishlatiladigan til",
          "Kompyuter operatsion tizimini boshqarish uchun ishlatiladigan til",
          'Faqat mobil ilovalar yaratish uchun ishlatiladigan til'
        ]}
        correctIndex={1}
        explanation="SQL — ma'lumotlar bazasidan ma'lumot so'rash, qo'shish, o'zgartirish va o'chirish uchun ishlatiladigan maxsus til."
      />

      <Exercise title="Mashq">
        <p>
          O'zingiz kundalik hayotda foydalanadigan yoki eshitgan uchta turli ilovani (app)
          o'ylab toping va ular nima uchun, sizningcha, ma'lumotlar bazasidan foydalanishi
          kerakligini bir-ikki gapda tushuntiring.
        </p>
        <Solution>
          <p>
            Namuna javob (sizning javobingiz boshqacha bo'lishi ham mumkin — muhimi, mantiq
            to'g'ri bo'lishi):
          </p>
          <ul>
            <li>
              <strong>Onlayn-do'kon ilovasi</strong> — mahsulotlar ro'yxatini, narxlarni va har
              bir mijozning buyurtma tarixini saqlashi kerak, shuning uchun ma'lumotlar bazasi
              zarur.
            </li>
            <li>
              <strong>Ijtimoiy tarmoq</strong> — millionlab foydalanuvchining profili, postlari
              va do'stlar ro'yxatini saqlash va tez qidirish uchun ma'lumotlar bazasidan
              foydalanadi.
            </li>
            <li>
              <strong>Bank ilovasi</strong> — hisob raqamlari, balanslar va tranzaksiyalarni
              aniq va ishonchli saqlash uchun ma'lumotlar bazasiga tayanadi, chunki bu yerda
              xatolikka yo'l qo'yib bo'lmaydi.
            </li>
          </ul>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Ma'lumotlar bazasi — katta hajmdagi tuzilgan ma'lumotni tez, ishonchli va bir nechta
          foydalanuvchi bilan bir vaqtda ishlashga mos saqlash tizimi.
        </li>
        <li>
          Elektron jadval kichik loyihalar uchun qulay, lekin hajm va foydalanuvchilar soni
          oshganda tezlik, ishonchlilik va ma'lumotlar bog'liqligi bo'yicha yetarli emas.
        </li>
        <li>
          Jadval (table) — satrlar (rows) va ustunlardan (columns) tashkil topgan tuzilma; har
          bir satr — bitta aniq yozuv, har bir ustun — o'sha yozuvning bitta xususiyati.
        </li>
        <li>
          SQL — ma'lumotlar bazasidan ma'lumot so'rash va uni boshqarish uchun ishlatiladigan
          til; veb-ilovalar, tahlil, hisobotlar va ma'muriy ishlarda keng qo'llaniladi.
        </li>
      </KeyPoints>
    </>
  )
}
