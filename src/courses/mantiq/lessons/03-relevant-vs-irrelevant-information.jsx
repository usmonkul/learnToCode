import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Kerakli va keraksiz ma'lumot",
  section: 'Muammolarni tahlil qilish',
}

export default function KerakliMalumotLesson() {
  return (
    <>
      <p>
        Ba'zan muammoning o'zi unchalik qiyin emas — qiyini shundaki, muammo juda ko'p{' '}
        <strong>keraksiz tafsilotlar</strong> ichiga ko'milib qolgan bo'ladi. Yaxshi muammo yechuvchi
        bo'lishning muhim bir ko'nikmasi — bir qarashda qaysi ma'lumot muhim, qaysi biri shunchaki
        "shovqin" ekanini ajrata bilish.
      </p>

      <h2>Misol: sotib olish masalasi</h2>
      <p>Quyidagi voqeani diqqat bilan o'qing:</p>
      <blockquote>
        Malika kitob do'koniga bordi. Bugun yakshanba edi, tashqarida yomg'ir yog'ayotgan edi.
        Malika ko'k rangli sumka ko'targan bo'lib, sumkasida oldindan 5000 so'm bor edi. Do'konda
        juda ko'p kitoblar bor edi, devorlar sariq rangga bo'yalgan edi. Malika 4 ta daftar sotib
        oldi. Har bir daftar 1200 so'mdan turardi. Sotuvchi opa juda mehribon va kulib turardi.
        <br />
        <strong>Savol: Malika daftarlar uchun jami qancha pul to'ladi?</strong>
      </blockquote>
      <p>
        Bu voqeada juda ko'p gap bor — lekin savolga javob berish uchun bizga bor-yo'g'i{' '}
        <strong>ikkita son</strong> kerak: daftarlar soni (<strong>4 ta</strong>) va bitta daftar
        narxi (<strong>1200 so'm</strong>). Shu ikkitasini ko'paytirsak — <code>4 × 1200 = 4800</code>{' '}
        so'm. Tamom, javob tayyor!
      </p>
      <p>
        Qolgan hamma narsa — kun nomi, ob-havo, sumka rangi, devor rangi, sotuvchining kayfiyati, hatto
        Malikaning boshida cho'ntagida qancha pul borligi ham — bu safar bizga kerak emas. Bular
        hikoyani qiziqarli qilish uchun qo'shilgan, lekin javobga hech qanday ta'sir qilmaydi.
      </p>

      <h2>Misol: xarita</h2>
      <p>
        Xuddi shu g'oya xaritalarda ham ishlaydi. Agar do'stingizga uydan maktabgacha yo'lni
        tushuntirmoqchi bo'lsangiz, siz har bir daraxt, har bir eshik yoki har bir mashinani chizib
        o'tirmaysiz — bu xaritani faqat chalkashtirib yuboradi. Yaxshi xarita faqat kerakli narsalarni
        ko'rsatadi: asosiy ko'cha, burilish kerak bo'lgan joylar va bir-ikkita taniqli mo'ljal (masalan,
        "katta do'kon burchagida chapga buriling"). Qolgan hammasi — keraksiz shovqin, uni xaritadan
        olib tashlash xaritani <em>yomonlashtirmaydi</em>, aksincha, tushunarliroq qiladi.
      </p>

      <Callout type="tip" title="Foydali savol">
        Har safar uzun va chalkash matn bilan ishlaganingizda, o'zingizga shu savolni bering:{' '}
        <em>"Aynan shu savolga javob berish uchun menga qaysi faktlar kerak?"</em> Qolganini
        vaqtincha unutib turishingiz mumkin.
      </Callout>

      <Exercise title="Mashq: kerakli faktlarni toping">
        <p>Quyidagi hikoyani o'qib, savolga javob berish uchun faqat kerakli faktlarni ajrating:</p>
        <blockquote>
          Nilufar bog'da do'stlari bilan o'ynayotgan edi, ular jami 6 kishi edi. Bog'da katta
          favvora bor edi, uning atrofida qizil va sariq gullar ochilgan edi. O'yin davomida
          Nilufar avval 3 marta sakrash arqonida sakradi, keyin dam olib, yana 5 marta sakradi.
          Uning sevimli rangi pushti edi.
          <br />
          <strong>Savol: Nilufar jami necha marta sakrash arqonida sakradi?</strong>
        </blockquote>
        <Solution>
          <p>
            Kerakli faktlar — faqat ikkita son: birinchi safar <strong>3 marta</strong>, ikkinchi
            safar <strong>5 marta</strong> sakragan. Jami: <code>3 + 5 = 8</code> marta.
          </p>
          <p>
            Keraksiz tafsilotlar: do'stlarining soni (6 kishi), favvora, gullarning rangi, Nilufarning
            sevimli rangi — bularning hech biri savolga javob berishga yordam bermaydi.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="Yuqoridagi Nilufar haqidagi hikoyada qaysi ma'lumot savolga javob berish uchun KERAK EMAS edi?"
        options={[
          'Birinchi safar necha marta sakragani',
          'Ikkinchi safar necha marta sakragani',
          "Bog'dagi gullarning rangi",
          'Ikkalasi ham (3 va 5) kerak edi',
        ]}
        correctIndex={2}
        explanation="Gullarning rangi hikoyani jonli qilish uchun qo'shilgan, lekin sakrashlar sonini hisoblashga hech qanday aloqasi yo'q — bu keraksiz ma'lumot."
      />

      <KeyPoints>
        <li>
          Uzun matn yoki masalaning barcha tafsilotlari birdek muhim emas — ba'zilari shunchaki
          "shovqin".
        </li>
        <li>
          Har doim o'zingizga savol bering: "Aynan shu savolga javob berish uchun menga nima kerak?"
        </li>
        <li>Keraksiz ma'lumotni chetga surish javobni topishni ancha osonlashtiradi.</li>
        <li>
          Bu ko'nikma nafaqat masala yechishda, balki xarita, ko'rsatma yoki har qanday
          tushuntirishni soddalashtirishda ham foydali.
        </li>
      </KeyPoints>
    </>
  )
}
