import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Protsessor — kompyuterning miyasi",
  section: "Kompyuterning asosiy qismlari",
}

export default function CpuTheBrainLesson() {
  return (
    <>
      <p>
        Oldingi darsda "Qayta ishlash" qadamini o'rgandik. Ana shu qadamni aynan qaysi qism
        bajaradi, bilasizmi? Javob — <strong>protsessor</strong>, inglizcha nomi bilan{' '}
        <strong>CPU</strong> (Central Processing Unit — "markaziy qayta ishlash qurilmasi").
      </p>

      <h2>Nega uni "miya" deyishadi?</h2>
      <p>
        Protsessor — kompyuterning eng ichkarisida joylashgan, tirnoq kattaligidagi kichkina bir
        bo'lak. Lekin uning ichida millionlab-milliardlab juda kichik "kalitchalar" (bularni
        keyingi darsda batafsil o'rganamiz) joylashgan. Har bir buyruq — masalan, "2 + 2 ni
        qo'sh" yoki "bu rasmni ekranga chiqar" — protsessorga yetib boradi, va u shu buyruqni
        bajaradi.
      </p>
      <p>
        Protsessor bir soniyada <strong>milliardlab</strong> shunday kichik buyruqni bajarishga
        qodir. Solishtirish uchun: agar siz bir soniyada bittadan qo'shish amalini
        bajarsangiz, protsessorning bir soniyalik ishini bajarish uchun sizga necha yuz yil
        kerak bo'lardi!
      </p>

      <Callout type="note" title="Protsessor — ijodkor emas, ijrochi">
        Miya g'oya o'ylab topadi, protsessor esa unga berilgan buyruqni bajaradi — xuddi juda
        tez ishlaydigan, lekin faqat aniq ko'rsatma bo'yicha harakat qiladigan ishchi kabi.
        Shuning uchun uni "aqlli" emas, balki "juda tez ijrochi" deb atash to'g'riroq.
      </Callout>

      <h2>Protsessor qanday "band" bo'ladi?</h2>
      <p>
        Kompyuteringiz bir vaqtning o'zida musiqa chalayotgan, o'yin ishlayotgan va sizning
        yozganlaringizni ekranga chiqarayotgandek tuyulishi mumkin. Aslida esa protsessor bir
        vaqtning o'zida bitta amalni bajaradi — lekin u bir ishdan ikkinchisiga <strong>shu
        qadar tez</strong> o'tadiki, inson ko'ziga hammasi bir vaqtda sodir bo'layotgandek
        ko'rinadi. Bu — xuddi juda tez tomosha ko'rsatuvchi jonglyor kabi: bir vaqtning o'zida
        faqat bitta to'pni ushlaydi, lekin shunchalik tez almashtiradiki, hammasi havoda
        turgandek tuyuladi.
      </p>

      <h2>Zamonaviy protsessorlar — bir nechta "miyacha" birga</h2>
      <p>
        Hozirgi telefon va kompyuterlarning ko'pchiligida protsessor ichida bir nechta kichik
        "yadro" (core) bo'ladi — har biri alohida ishlay oladigan mustaqil miyachalar. Bu, xuddi
        bitta odam o'rniga bir nechta ishchi birgalikda ishlaganidek, kompyuterni yanada tezroq
        qiladi.
      </p>

      <Quiz
        question="Protsessor (CPU) haqida qaysi gap eng to'g'ri?"
        options={[
          "U kompyuterning eng katta va og'ir qismi",
          "U kompyuterga berilgan buyruqlarni juda tez bajaradigan qism",
          "U faqat ekranga rasm chiqarish uchun ishlatiladi",
          "U kompyuterni o'zi mustaqil qarorlar chiqarishga o'rgatadi",
        ]}
        correctIndex={1}
        explanation="Protsessor — kompyuterga berilgan buyruqlarni juda tez bajaradigan kichkina, lekin kuchli qism. U mustaqil o'ylamaydi, faqat unga kelgan buyruqlarni ijro etadi."
      />

      <KeyPoints>
        <li>Protsessor (CPU) — kompyuterning barcha buyruqlarini bajaradigan asosiy qismi.</li>
        <li>Protsessor bir soniyada milliardlab kichik amalni bajara oladi.</li>
        <li>Protsessor "ijodkor" emas — u faqat berilgan buyruqni juda tez ijro etadigan qism.</li>
        <li>Zamonaviy protsessorlarda bir nechta yadro (core) birgalikda ishlaydi.</li>
      </KeyPoints>
    </>
  )
}
