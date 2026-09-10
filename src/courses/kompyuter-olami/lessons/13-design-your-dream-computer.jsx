import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Yakuniy loyiha: o'z kompyuteringizni yarating",
  section: "Yakuniy loyiha",
}

export default function DesignYourDreamComputerLesson() {
  return (
    <>
      <p>
        Tabriklaymiz — siz kompyuter olamining eng muhim sirlarini kashf qildingiz! Endi
        o'rganganlaringizni birlashtirib, hayoliy o'z kompyuteringizni "yaratish" vaqti keldi.
      </p>

      <h2>Nimalarni bilib oldingiz?</h2>
      <ul>
        <li>Kompyuter — kirish, qayta ishlash va chiqish qadamlarini bajaradigan mashina.</li>
        <li>Protsessor (CPU) — buyruqlarni juda tez bajaradigan "miya".</li>
        <li>RAM — tezkor, lekin vaqtinchalik xotira; Storage — sekinroq, lekin doimiy xotira.</li>
        <li>Kirish/chiqish qurilmalari — inson va kompyuter orasidagi ko'prik.</li>
        <li>Ikkilik kod (0 va 1) — kompyuterning "tili".</li>
        <li>Hardware — jismoniy qism; Software — unga buyruq beruvchi dasturlar.</li>
        <li>Dastur (algoritm) — aniq tartibdagi qadamlar to'plami.</li>
        <li>Internet — dunyodagi millionlab tarmoqning birlashmasi.</li>
        <li>Internetda xavfsiz yurish qoidalari.</li>
      </ul>

      <Callout type="tip" title="Endi navbat sizda">
        Haqiqiy muhandislar ham aynan shu yo'ldan boshlaydi: avval mavjud narsalarni o'rganish,
        keyin o'zlari xohlagan narsani loyihalash. Endi siz ham shunga tayyorsiz!
      </Callout>

      <Exercise title="Yakuniy loyiha: xayoliy kompyuteringizni chizing">
        <p>
          Qog'ozga (yoki rasm chizish dasturida) o'zingiz orzu qilgan kompyuterni chizing va
          quyidagi savollarga javob bering:
        </p>
        <ul>
          <li>Bu kompyuter qanday <strong>Kirish</strong> qurilmalariga ega (masalan: fikringizni o'qiydigan sensor)?</li>
          <li>U qanday <strong>Chiqish</strong> beradi (masalan: hidni his qildiradigan qurilma)?</li>
          <li>Bu kompyuter qaysi <strong>muammoni</strong> yechish uchun yaratilgan?</li>
          <li>Uning "miyasi" (protsessori) qanday ishlarni bajaradi?</li>
        </ul>
        <Solution>
          <p>
            Bu — sizning ijodiy javobingiz, to'g'ri yoki noto'g'ri javob yo'q! Namuna g'oya:
            "Uy vazifasi yordamchisi" nomli kompyuter — Kirish sifatida ovozli savollarni
            eshitadi, Chiqish sifatida ekranda tushuntirish va rasm chizadi, muammosi — bolalarga
            uy vazifasini tushunishga yordam berish, protsessori esa savolni tahlil qilib, eng
            tushunarli javobni tanlaydi.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="Kompyuterni yaratayotganda, dastlab uning qaysi qismini o'ylab topish kerak — u qaysi muammoni yechishi kerakligini emas, balki?"
        options={[
          "To'g'ri, avval rangini tanlash kerak",
          "Noto'g'ri — har qanday yaxshi loyiha avval \"qanday muammoni yechamiz?\" degan savoldan boshlanadi",
          "To'g'ri, avval narxini belgilash kerak",
          "To'g'ri, avval qanday reklama qilishni o'ylash kerak",
        ]}
        correctIndex={1}
        explanation={`Har qanday yaxshi kompyuter yoki dastur, avvalambor, "qanday muammoni yechish uchun yaratilyapti" degan savoldan boshlanadi — bu Mantiqiy va Algoritmik Fikrlash kursida ham o'rgangan eng muhim g'oya edi.`}
      />

      <KeyPoints>
        <li>Kompyuter olami — kirish/chiqish, protsessor, xotira, ikkilik kod va dasturlardan iborat yaxlit tizim.</li>
        <li>Har bir kompyuter loyihasi biror aniq muammoni yechish uchun yaratiladi.</li>
        <li>Endi siz kompyuterlar haqida savol berishga va ularning ichki dunyosini tushunishga tayyorsiz — bu esa dasturlashni o'rganish sari birinchi qadam!</li>
      </KeyPoints>
    </>
  )
}
