import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Yakuniy loyiha',
  section: 'Amaliy loyiha',
}

export default function YakuniyLoyihaLesson() {
  return (
    <>
      <p>
        Yigirma ikkita darsda siz uzoq yo'l bosib o'tdingiz. Boshida katta va tartibsiz ko'ringan
        muammolarni kichik, tushunarli bo'laklarga bo'lishni va ular orasidan faqat kerakli
        ma'lumotni ajratib olishni o'rgandingiz. So'ngra bitta muammoning bir emas, bir nechta
        yechimi bo'lishi mumkinligini, sinov-va-xato bilan izlanishni va ba'zida oxiridan orqaga
        qarab o'ylashni bilib oldingiz. Keyin mantiqqa o'tdingiz — rost va yolg'on gaplarni
        ajratish, AGAR-U HOLDA fikrlash, VA/YOKI/EMAS bilan shartlarni birlashtirish, narsalarni
        to'g'ri tartibda joylashtirish va taqqoslash. Va nihoyat, bularning barchasini boshqa
        birov — hatto robot ham! — aniq bajara oladigan tartiblangan qadamlar, ya'ni{' '}
        <strong>algoritm</strong> shakliga solishni o'rgandingiz.
      </p>
      <p>
        Bu — kursning so'nggi ikkita darsidan birinchisi. Bu yerda alohida yangi mavzu yo'q.
        Buning o'rniga siz o'rgangan hamma narsani birlashtirib, haqiqiy hayotdagi bir muammoni
        boshidan oxirigacha, o'zingiz yechasiz.
      </p>

      <h2>Har qanday muammoni yechishning 5 qadami</h2>
      <p>
        Muammo qanday bo'lishidan qat'iy nazar — maktabda, uyda yoki hayotning istalgan
        joyida — quyidagi besh qadam har doim ishlaydi:
      </p>
      <ol>
        <li>
          <strong>Muammoni aniq belgilang.</strong> Hozir qanday holatdasiz va nimaga
          erishmoqchisiz? Ikkalasini ham aniq so'zlar bilan yozib qo'ying — "nimadir noto'g'ri"
          emas, balki "hozir X, men esa Y ga erishmoqchiman".
        </li>
        <li>
          <strong>Uni kichik bo'laklarga bo'ling.</strong> Katta muammoni bittada yechish qiyin,
          lekin uni bir nechta kichik, boshqarish mumkin bo'lgan qismlarga bo'lsangiz, har bir
          qism alohida ancha oson ko'rinadi.
        </li>
        <li>
          <strong>Bir nechta yechim variantini o'ylab toping.</strong> Birinchi xayolingizga
          kelgan g'oyaga darrov yopishmang — kamida ikki-uch xil yo'lni tasavvur qiling.
        </li>
        <li>
          <strong>Mantiqiy fikrlash bilan eng maqbulini tanlang.</strong> Har bir variantni
          shartlaringizga (vaqt, byudjet, imkoniyat) solishtirib, AGAR-U HOLDA fikrlash yordamida
          eng mos kelganini tanlang.
        </li>
        <li>
          <strong>Uni aniq algoritm sifatida yozing.</strong> Tanlangan yechimni tartiblangan,
          raqamlangan qadamlar ro'yxatiga aylantiring — shu qadar aniqki, uni boshqa birov ham,
          sizsiz ham, xatosiz bajara olsin.
        </li>
      </ol>
      <Callout type="tip" title="Bu faqat maktab uchun emas">
        Kattalar ham katta qaror qabul qilganda — ish tanlashda, uy sotib olishda, sayohat
        rejalashtirishda — aslida xuddi shu besh qadamni bajarishadi, faqat buni shunday
        nomlashmaydi, xolos.
      </Callout>

      <h2>Endi navbat sizda: mavzuni tanlang</h2>
      <p>
        Quyida to'rtta haqiqiy muammo keltirilgan. Har biri xuddi maktabda yoki uyda haqiqatan
        ham duch kelishingiz mumkin bo'lgan vaziyat:
      </p>
      <ul>
        <li>Sinfxonani tartibga solish tizimi</li>
        <li>Maktabga eng qulay yetib borish rejasi</li>
        <li>Tug'ilgan kun bazmini tashkil qilish</li>
        <li>Uy vazifalarini samarali bajarish tartibi</li>
      </ul>
      <p>
        Avval birga bitta namunani to'liq ko'rib chiqamiz — shundan so'ng qolgan uchtasidan
        birini tanlab, xuddi shunday besh qadamni o'zingiz mustaqil bajarasiz.
      </p>

      <Quiz
        question="Do'stingiz biror muammoga duch kelib, boshqa variantlarni umuman o'ylab ko'rmasdan, birinchi xayoliga kelgan g'oyani darrov qo'llashga qaror qildi. U besh qadamdan qaysi birini o'tkazib yubordi?"
        options={[
          '1-qadam: muammoni aniq belgilash',
          "2-qadam: kichik bo'laklarga bo'lish",
          "3-qadam: bir nechta yechim variantini o'ylab topish",
          '5-qadam: aniq algoritm sifatida yozish',
        ]}
        correctIndex={2}
        explanation="Faqat bitta variantni ko'rib, boshqalari bilan solishtirmasdan qaror qilish — bir nechta yechim o'ylab topishni (3-qadam) o'tkazib yuborish demakdir. Ko'proq variant bo'lsa, ular orasidan eng maqbulini tanlash imkoni ham ortadi."
      />

      <Exercise title="Namuna: tug'ilgan kun bazmini tashkil qilish">
        <p>
          Tug'ilgan kuningizga ikki hafta qoldi, ota-onangiz bazm uchun 150 000 so'm byudjet va
          shanba kuni tushdan keyingi vaqtni ajratib berishdi. Hozircha hech narsa
          tayyorlanmagan. Yuqoridagi besh qadamni shu muammoga qanday qo'llagan bo'lardingiz?
          Avval o'zingiz o'ylab ko'ring, so'ng yechimni ochib tekshiring.
        </p>
        <Solution>
          <p>
            <strong>1-qadam — muammoni aniq belgilash.</strong> Hozirgi holat: bazmga 2 hafta
            qoldi, hech narsa tayyor emas. Maqsad: do'stlar bilan yodda qoladigan bazm
            o'tkazish, lekin 150 000 so'mdan oshirmasdan va faqat shanba tushdan keyin.
          </p>
          <p>
            <strong>2-qadam — kichik bo'laklarga bo'lish.</strong> Muammoni beshta kichik
            qismga bo'lamiz: kimlarni taklif qilish, qayerda o'tkazish, nima yeyish, nima
            qilish (dastur) va kim nimani tayyorlaydi.
          </p>
          <p>
            <strong>3-qadam — bir nechta yechim variantini o'ylab topish.</strong>
          </p>
          <ul>
            <li>
              <strong>A variant:</strong> 15 mehmon, uyda, do'kondan sotib olingan katta tort.
            </li>
            <li>
              <strong>B variant:</strong> 6 ta eng yaqin do'st, mahalladagi parkda piknik, o'zi
              pishirgan kichik tort.
            </li>
            <li>
              <strong>C variant:</strong> 6 mehmon uyda, kino tomosha qilish va pitsa
              buyurtma qilish.
            </li>
          </ul>
          <p>
            <strong>4-qadam — mantiqiy fikrlash bilan tanlash.</strong> AGAR byudjet 150 000
            so'mdan oshmasligi kerak BO'LSA, U HOLDA A variant mos kelmaydi — 15 kishiga
            do'kon torti juda qimmatga tushadi. B variant eng arzon, lekin ochiq havoda
            bo'lgani uchun yomg'ir yog'sa butunlay barbod bo'lishi mumkin. C variant ham
            byudjetga sig'adi, ham ob-havodan mustaqil. Shuning uchun <strong>C variant</strong>{' '}
            tanlanadi — u VA byudjetga, VA vaqtga, VA ob-havo xavfsizligiga bir vaqtda javob
            beradi.
          </p>
          <p>
            <strong>5-qadam — aniq algoritm sifatida yozish.</strong>
          </p>
          <ol>
            <li>Mehmonlar ro'yxatini tuzish va ota-onadan tasdiq olish.</li>
            <li>Sana va vaqtni belgilash: shanba, soat 15:00.</li>
            <li>Taklifnomalarni kamida 10 kun oldin yuborish.</li>
            <li>Pitsa va ichimliklarni oldindan buyurtma qilish.</li>
            <li>2-3 ta film tanlash va xonani bezash.</li>
            <li>
              Bazm kuni: mehmonlarni kutib olish → pitsa yeyish → kino ko'rish → tort kesish.
            </li>
            <li>Mehmonlarni kuzatib qo'yish va xonani yig'ishtirish.</li>
          </ol>
          <div className="not-prose my-6 flex flex-col items-center gap-2 rounded-xl border border-line bg-canvas-muted p-6 text-center text-sm text-ink">
            <div className="rounded-full border border-brand-300 bg-brand-50 px-4 py-2 font-medium text-brand-700 dark:border-brand-700 dark:bg-brand-950 dark:text-brand-300">
              Boshlash
            </div>
            <span className="text-ink-muted">↓</span>
            <div className="rounded-lg border border-line bg-canvas px-4 py-2">
              Ro'yxat va ruxsat
            </div>
            <span className="text-ink-muted">↓</span>
            <div className="rounded-lg border border-line bg-canvas px-4 py-2">
              Taklifnoma va buyurtma
            </div>
            <span className="text-ink-muted">↓</span>
            <div className="rounded-lg border border-line bg-canvas px-4 py-2">
              Bazm kuni: kutib olish → kino → tort
            </div>
            <span className="text-ink-muted">↓</span>
            <div className="rounded-full border border-brand-300 bg-brand-50 px-4 py-2 font-medium text-brand-700 dark:border-brand-700 dark:bg-brand-950 dark:text-brand-300">
              Tugash
            </div>
          </div>
        </Solution>
      </Exercise>

      <Exercise title="Sizning loyihangiz">
        <p>
          Endi o'zingiz navbat oling. Yuqoridagi uchta mavzudan (sinfxona, maktabga yo'l, uy
          vazifasi tartibi) bittasini — yoki o'zingiz o'ylab topgan boshqa haqiqiy
          muammoni — tanlang. Daftaringizga xuddi yuqoridagi namunadagi kabi barcha beshta
          qadamni alohida-alohida yozib chiqing: hozirgi holat va maqsad, bo'laklar, kamida ikki
          variant, mantiqiy asos bilan tanlov va oxirida raqamlangan algoritm.
        </p>
      </Exercise>

      <KeyPoints>
        <li>
          Katta muammo boshida qanchalik tartibsiz ko'ringan bo'lmasin, uni kichik
          bo'laklarga bo'lish va kerakli ma'lumotni keraksizidan ajratish orqali boshqarish
          mumkin bo'lib qoladi.
        </li>
        <li>
          Bitta muammoning ko'pincha bir nechta yechimi bor — sinov-va-xato, oxiridan orqaga
          o'ylash va eng oddiy yo'ldan boshlash barchasi foydali qidiruv usullari.
        </li>
        <li>
          Mantiqiy fikrlash — rost/yolg'on gaplar, AGAR-U HOLDA, VA/YOKI/EMAS, tartib va
          taqqoslash — variantlar orasidan aniq asos bilan eng to'g'risini tanlash imkonini
          beradi.
        </li>
        <li>
          Algoritm — hech qanday noaniqlik qoldirmaydigan, tartiblangan qadamlar ro'yxati;
          uni takrorlash va shartlar yordamida yozish mumkin, shunda uni boshqa birov (yoki
          robot) ham xatosiz bajara oladi.
        </li>
        <li>
          Har qanday real muammoni shu besh qadam orqali yechish mumkin: aniq belgilash,
          bo'laklarga bo'lish, variantlar o'ylab topish, mantiq bilan tanlash va aniq algoritm
          qilib yozish.
        </li>
        <li>
          Bu ko'nikmalar dasturlash uchungina emas — kundalik hayotdagi har qanday reja va
          qarorni yaxshiroq qabul qilish uchun ham ishlaydi. Tabriklaymiz, siz endi muammolarni
          mantiqiy va tartibli fikrlash bilan yecha olasiz!
        </li>
      </KeyPoints>
    </>
  )
}
