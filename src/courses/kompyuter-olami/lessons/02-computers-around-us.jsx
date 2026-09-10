import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Kompyuterlar hamma joyda yashiringan',
  section: 'Kompyuter nima?',
}

export default function ComputersAroundUsLesson() {
  return (
    <>
      <p>
        O'tgan darsda kompyuter nima ekanini bilib oldik. Endi kulgili savol: uyingizda nechta
        kompyuter bor deb o'ylaysiz? Agar javobingiz "bitta — stol ustidagi noutbuk" bo'lsa, ajablanishga
        tayyor bo'ling — javob, ehtimol, o'ntadan ko'p!
      </p>

      <h2>Ko'rinmas kompyuterlar</h2>
      <p>
        Kompyuter — albatta ekran va klaviaturaga ega bo'lishi shart emas. Ichida kichkina
        "miyacha" (protsessor) bo'lgan va aniq buyruqlarga amal qiladigan har qanday qurilma —
        aslida kompyuterdir. Mana bir nechta misol:
      </p>
      <ul>
        <li>
          <strong>Mikroto'lqinli pech</strong> — siz vaqtni tering, u aynan shuncha vaqt ishlaydi
          va so'ng to'xtaydi.
        </li>
        <li>
          <strong>Muzlatgich</strong> — ichkaridagi haroratni doimiy tekshirib, kerak bo'lsa
          sovutishni kuchaytiradi.
        </li>
        <li>
          <strong>Svetofor</strong> — belgilangan vaqt oralig'ida rangini almashtirib turadi.
        </li>
        <li>
          <strong>Zamonaviy mashina</strong> — o'nlab kichik kompyuterlarga ega: tezlikni
          o'lchaydi, xavfsizlik yostiqchasini boshqaradi, musiqa qo'yadi.
        </li>
        <li>
          <strong>Aqlli soat va o'yin konsoli</strong> — bularning har biri ham to'liq kompyuter.
        </li>
      </ul>

      <Callout type="note" title="Diqqat">
        Telefoningiz ham, aslida, cho'ntagingizga sig'adigan to'liq huquqli kompyuter! U qo'ng'iroq
        qilish, o'yin o'ynash, rasm chizish va internetga chiqish — hammasini bir vaqtda
        bajara oladi.
      </Callout>

      <h2>Nega buncha ko'p kompyuter kerak?</h2>
      <p>
        Chunki kompyuterlar bir ishni <strong>aniq va toliqmasdan</strong> takrorlashda juda
        yaxshi. Inson soatlab bir xil ishni bajarsa charchaydi va xato qiladi, kompyuter esa
        millionlab marta bir xil aniqlikda ishlayveradi. Shuning uchun muhandislar har bir kichik
        vazifa uchun ham alohida kichik kompyuter qo'shishni ma'qul ko'rishadi.
      </p>

      <Exercise title="Mashq: uyingizdagi kompyuterlarni sanang">
        <p>
          Uyingiz bo'ylab yurib, "bu ichida kichik miyacha bormi?" deb o'ylab, kamida beshta
          qurilmani ro'yxatga oling (masalan: mikroto'lqinli pech, televizor puldi, o'yinchoq
          robot). Har biri uchun, u sizningcha nima "buyruq"qa amal qilishini yozing.
        </p>
        <Solution>
          <p>Namuna ro'yxat:</p>
          <ul>
            <li>Kir yuvish mashinasi — tanlangan dastur bo'yicha suv quyish, aylantirish, quritish.</li>
            <li>Televizor puldi — tugma bosilganda kanalni almashtirish yoki ovozni sozlash.</li>
            <li>Aqlli lampochka — telefon orqali yoqish/o'chirish buyrug'ini kutish.</li>
            <li>O'yinchoq robot — tugma bosilsa, oldinga yurish yoki tovush chiqarish.</li>
            <li>Klimat-kontrol (konditsioner) — belgilangan haroratni saqlash uchun o'zini yoqish/o'chirish.</li>
          </ul>
        </Solution>
      </Exercise>

      <Quiz
        question="Quyidagilardan qaysi biri ham, aslida, kichik kompyuterga ega?"
        options={["Mikroto'lqinli pech", "Oddiy yog'och stul", "Qog'oz varag'i", "Toshdan yasalgan haykal"]}
        correctIndex={0}
        explanation="Mikroto'lqinli pech ichida vaqtni hisoblaydigan va oshxona jarayonini boshqaradigan kichik protsessor bor. Stul, qog'oz va tosh haykal esa hech qanday buyruqni bajarmaydi — ular kompyuter emas."
      />

      <KeyPoints>
        <li>Kompyuter — albatta ekranli qurilma emas; ichida "miyacha" bo'lgan har qanday buyruqbajar qurilma kompyuter bo'lishi mumkin.</li>
        <li>Mikroto'lqinli pechdan tortib mashinagacha — atrofimizdagi ko'plab qurilmalar aslida kichik kompyuterlar.</li>
        <li>Kompyuterlar aniq va toliqmasdan takrorlanuvchi ishlarni bajarishda insondan ustun.</li>
      </KeyPoints>
    </>
  )
}
