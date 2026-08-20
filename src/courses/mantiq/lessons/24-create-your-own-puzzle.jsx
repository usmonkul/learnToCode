import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "O'z jumbog'ingni yarat",
  section: 'Amaliy loyiha',
}

export default function OzJumboqingniYaratLesson() {
  return (
    <>
      <p>
        Kurs boshida siz muammolarni tahlil qilishni, yechim izlashni, mantiqiy fikrlashni va
        algoritm yozishni — boshqalar yaratgan jumboqlar, labirintlar va topishmoqlar orqali
        o'rgandingiz. Bu oxirgi darsda esa vaziyat teskarisiga aylanadi: endi siz{' '}
        <strong>yechuvchi emas, yaratuvchi</strong> bo'lasiz.
      </p>
      <p>
        Bu — tasodifiy tanlov emas. Biror g'oya atrofida yaxshi jumboq o'ylab topish, o'sha
        g'oyani shunchaki yechishdan ko'ra ancha chuqurroq tushunishni talab qiladi. Agar
        mantiqiy jumboq, topishmoq, labirint, tartiblash masalasi yoki "robotni boshqar"
        uslubidagi topshiriq yarata olsangiz — demak, siz bu mavzuni haqiqatan ham
        o'zlashtirgansiz.
      </p>

      <h2>Yaxshi jumboqning uch belgisi</h2>
      <p>Jumbog'ingizni do'stingizga berishdan oldin, uni shu uch mezon bo'yicha tekshiring:</p>
      <ul>
        <li>
          <strong>Aniq bitta to'g'ri yechimi bor.</strong> Agar bir nechta javob ham to'g'ri
          bo'lib chiqsa, jumboq o'z ma'nosini yo'qotadi — yechuvchi tasodifan ham to'g'ri javob
          topishi mumkin bo'lib qoladi.
        </li>
        <li>
          <strong>Barcha kerakli ma'lumot berilgan.</strong> Yechish uchun yetarli
          ma'lumot bo'lishi kerak, lekin chalg'ituvchi ortiqcha tafsilotlar ko'p bo'lmasin —
          bir-ikkitasi qiziqarli, lekin ular jumboqni chalkashtirib yubormasligi kerak.
        </li>
        <li>
          <strong>Qiziqarli va qiyin — lekin imkoni bor.</strong> Juda oson jumboq zerikarli,
          imkonsiz jumboq esa asabiylashtiradi. Yaxshi jumboq bir necha daqiqa o'ylashni talab
          qiladi, lekin oxir-oqibat yechiladi.
        </li>
      </ul>

      <Quiz
        question={
          "Do'stingiz sizga bunday jumboq berdi: \"Men hayvonman. To'rt oyog'im bor. Men kimman?\" Bu jumboqda muammo bor. Qaysi mezon buzilgan?"
        }
        options={[
          "aniq bitta to'g'ri yechimi bor emas — mushuk, it, ot va boshqa ko'plab hayvonlar javob bo'la oladi",
          "barcha kerakli ma'lumot berilmagan, umuman hech qanday ma'lumot yo'q",
          "u juda qiyin va yechib bo'lmaydi",
          "u qiziqarli emas, chunki hayvonlar haqida",
        ]}
        correctIndex={0}
        explanation="To'rt oyoqli hayvon juda ko'p — mushuk ham, it ham, ot ham, sigir ham to'g'ri keladi. Jumboq aniq bitta yechimga ega bo'lishi uchun javobni yagona qiladigan yetarlicha aniq ma'lumot kerak."
      />

      <h2>Shablon 1: "Men kimman?" topishmoq skeleti</h2>
      <p>
        Bu shablon bo'yicha bir toifa (hayvon, kasb, joy, narsa) tanlang, so'ng uni bosqichma-
        bosqich toraytiruvchi ma'lumotlar yozing — oxirgi ma'lumot javobni yagona qilib
        belgilaydigan hal qiluvchi tafsilot bo'lsin:
      </p>
      <blockquote>
        Men ___ (toifa)man.
        <br />
        1-ma'lumot: ___
        <br />
        2-ma'lumot: ___
        <br />
        3-ma'lumot (hal qiluvchi tafsilot): ___<br />
        Savol: Men kimman?
      </blockquote>

      <Exercise title="Namuna: shablon qanday to'ldiriladi">
        <p>
          Quyida shu shablon bo'yicha to'ldirilgan tayyor jumboq bor. Avval o'zingiz javobni
          topishga urinib ko'ring, so'ng "Yechimni ko'rsatish"ni bosib tekshiring va nega bu
          jumboq yaxshi ekanligini o'qing.
        </p>
        <blockquote>
          Men hayvonman.
          <br />
          1-ma'lumot: Men issiq emas, sovuq iqlimda yashayman.
          <br />
          2-ma'lumot: Mening patlarim bor, lekin ucholmayman.
          <br />
          3-ma'lumot: Men suvda ajoyib suzaman, quruqlikda esa noqulay yuraman.
          <br />
          Savol: Men kimman?
        </blockquote>
        <Solution>
          <p>
            Javob: <strong>pingvin</strong>. Uchala ma'lumot ham birga ishlaganda javob
            yagona bo'lib qoladi — "patlari bor, lekin ucholmaydi" o'zi ham kamdan-kam
            hayvonlarga to'g'ri keladi, "sovuq iqlim va suvda suzish" esa uni yanada
            toraytiradi. Shu bilan birga ma'lumotlar soni ortiqcha emas — uchtasi ham javob
            uchun zarur, hech biri "bekorchi" emas. Aynan shu — yaxshi jumboqning uch mezoniga
            mos keladi.
          </p>
        </Solution>
      </Exercise>

      <h2>Shablon 2: o'z labirintingni chiz</h2>
      <p>
        Qog'ozga katakli katta kvadrat (masalan, 6×6 katak) chizing. Bir burchakka{' '}
        <strong>"Boshlanish"</strong>, boshqasiga <strong>"Tugash"</strong> deb belgi qo'ying.
        So'ng ba'zi kataklarni "devor" sifatida bo'yab, yo'lni to'sib qo'ying — shunday qilingki,
        boshlanishdan tugashgacha faqat <strong>bitta</strong> to'g'ri yo'l qolsin (yoki bir
        nechta yo'l bo'lsa ham, ulardan biri aniq eng qisqasi bo'lsin). Labirintni
        do'stingizga bering va u ruchka bilan yo'lni chizib topsin — yoki, agar 17-22-darslardagi
        "robotni boshqar" o'yinini eslasangiz, yo'lni "oldinga bir qadam", "o'ngga bur",
        "chapga bur" kabi buyruqlar ro'yxati sifatida yozib bering va do'stingiz shu buyruqlarga
        aniq amal qilib, maqsadga yetib borsin.
      </p>
      <Callout type="tip" title="Sinovdan o'tkazing">
        Jumbog'ingizni berishdan oldin uni birov ustida (yoki hech bo'lmasa o'zingiz qayta) sinab
        ko'ring. Ko'pincha yaratuvchi o'ziga hammasi tushunarli tuyuladi, lekin tashqaridan
        qaraganda bir joyda ma'lumot yetishmasligi ma'lum bo'lib qoladi.
      </Callout>

      <Exercise title="O'z jumbog'ingni yarat">
        <p>
          Endi navbat sizda. Ikkita shablondan (topishmoq yoki labirint) birini tanlang — yoki
          butunlay o'zingiz mantiqiy jumboq, tartiblash masalasi yoki "robotni boshqar"
          topshirig'ini o'ylab toping. Uni daftaringizga to'liq yozib chiqing, so'ng yuqoridagi
          uch mezon bilan o'zingiz tekshiring: aniq bitta yechimi bormi? Barcha kerakli ma'lumot
          bormi, ortiqchasi yo'qmi? Qiziqarli va yechib bo'ladigan darajada qiyinmi? Shundan
          keyingina uni do'stingizga yoki sinfdoshingizga taqdim eting.
        </p>
      </Exercise>

      <p>
        Sizga topshiriq berilganda uni yechish uchun tahlil qilish, yechim variantlarini
        o'ylab topish, mantiq bilan tekshirish va aniq qadamlarga bo'lish kerak bo'ladi. Endi
        siz jumboq <strong>yaratganingizda</strong> ham aynan shu to'rtta ko'nikmadan
        foydalanasiz — faqat bu safar teskari yo'nalishda: avval yechimni bilasiz, so'ng uning
        atrofida savol quryasiz. Bu ikkalasi bir xil fikrlash mushagini ishlatadi.
      </p>

      <KeyPoints>
        <li>
          Yaxshi jumboqning uchta belgisi bor: aniq bitta to'g'ri yechim, barcha kerakli
          ma'lumot ortiqchasiz berilgan va qiziqarli-lekin-yechish-mumkin bo'lgan qiyinlik
          darajasi.
        </li>
        <li>
          Biror mavzu atrofida jumboq yarata olish — o'sha mavzuni shunchaki yechishdan ham
          chuqurroq tushunish belgisidir.
        </li>
        <li>
          Topishmoq, labirint va "robotni boshqar" kabi shablonlarni o'zgartirib, o'zingizning
          jumbog'ingizni tuzishingiz mumkin — asosiysi, uni berishdan oldin sinab ko'rish.
        </li>
        <li>
          Butun kurs davomida siz to'rtta ustunni qurdingiz: muammoni{' '}
          <strong>tahlil qilish</strong> (kattasini bo'laklarga bo'lish), <strong>yechim
          topish</strong> (bir nechta yo'lni sinab ko'rish), <strong>mantiqiy fikrlash</strong>{' '}
          (rost-yolg'on, AGAR-U HOLDA, VA/YOKI/EMAS bilan asoslash) va{' '}
          <strong>algoritmik yondashuv</strong> (aniq, tartiblangan qadamlar yozish).
        </li>
        <li>
          Bu to'rttasi endi sizniki — kompyuter yoki dasturlash tili bo'lmasa ham, ular
          maktabda, uyda va hayotning istalgan burchagida ishlayveradi. Tabriklaymiz, kursni
          muvaffaqiyatli yakunladingiz!
        </li>
      </KeyPoints>
    </>
  )
}
