import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "finally, raise va maxsus xatoliklar",
  section: 'Xatoliklar bilan ishlash',
}

export default function ExceptionsRaiseLesson() {
  return (
    <>
      <h2>
        <code>finally</code> bloki
      </h2>
      <p>
        Ba'zan xatolik chiqishidan qat'i nazar, muayyan kod har doim bajarilishi kerak bo'ladi —
        masalan, "tugatildi" degan xabar chop etish yoki resurslarni tozalash. Buning uchun{' '}
        <code>finally</code> bloki ishlatiladi: u <code>try</code> ichida xatolik chiqsa ham,
        chiqmasa ham, har doim bajariladi:
      </p>
      <CodeBlock lang="python">{`try:
    son = int("abc")
except ValueError:
    print("Xatolik yuz berdi")
finally:
    print("Dastur tugatildi")`}</CodeBlock>
      <CodeBlock lang="python">{`# natija:
# Xatolik yuz berdi
# Dastur tugatildi`}</CodeBlock>
      <p>
        Endi xatolik chiqmaydigan holatni ko'ring — <code>finally</code> baribir bajariladi:
      </p>
      <CodeBlock lang="python">{`try:
    son = int("42")
except ValueError:
    print("Xatolik yuz berdi")
finally:
    print("Dastur tugatildi")`}</CodeBlock>
      <CodeBlock lang="python">{`# natija:
# Dastur tugatildi
# (except bloki ishlamadi, chunki xatolik chiqmadi — lekin finally baribir bajarildi)`}</CodeBlock>
      <Callout type="note" title="Qachon foydali?">
        <code>finally</code> odatda "tozalash" kodi uchun ishlatiladi: fayl yopish, tarmoq
        ulanishini uzish va shu kabi harakatlar — bular xatolik bo'lsa ham albatta bajarilishi
        kerak bo'lgan amallar. 23-darsda fayllar bilan ishlashda bunga yana qaytamiz.
      </Callout>

      <h2>
        <code>raise</code> — o'zingiz xatolik chaqirish
      </h2>
      <p>
        Hozirgacha exception'lar Python o'zi (masalan, <code>int("abc")</code> orqali)
        chaqirganida ko'rgan edik. Lekin ba'zan dasturimizning o'z mantig'i buzilganda — masalan,
        yosh manfiy bo'lishi mumkin emasligini bilsak — o'zimiz ataylab xatolik
        chaqirishimiz kerak bo'ladi. Buning uchun <code>raise</code> kalit so'zi ishlatiladi:
      </p>
      <CodeBlock lang="python">{`def yosh_tekshir(yosh):
    if yosh < 0:
        raise ValueError("yosh manfiy bo'lishi mumkin emas")
    return yosh

yosh_tekshir(-5)
# ValueError: yosh manfiy bo'lishi mumkin emas`}</CodeBlock>
      <p>
        <code>raise ValueError("...")</code> — bu Python'ning tayyor <code>ValueError</code>{' '}
        turidan foydalanib, o'zimiz xohlagan xabar bilan xatolik chaqiramiz. Agar bu funksiya{' '}
        <code>try</code>/<code>except</code> ichida chaqirilmasa, xatolik odatdagidek butun
        dasturni to'xtatadi. Lekin uni ushlab, chiroyli xabar ko'rsatish ham mumkin:
      </p>
      <CodeBlock lang="python">{`try:
    yosh_tekshir(-5)
except ValueError as xato:
    print(f"Xatolik: {xato}")`}</CodeBlock>
      <CodeBlock lang="python">{`# natija:
# Xatolik: yosh manfiy bo'lishi mumkin emas`}</CodeBlock>
      <p>
        Bu yerda <code>as xato</code> — chaqirilgan exception obyektini o'zgaruvchiga saqlaydi;{' '}
        <code>f"{xato}"</code> esa <code>raise</code>ga berilgan xabar matnini chiqaradi.{' '}
        <code>raise</code>ni odatda funksiya ichida, kiritilgan qiymat mantiqan noto'g'ri
        bo'lganda ishlatiladi — funksiya o'zi "bu qiymat bilan ishlay olmayman" deb aniq
        aytadi.
      </p>

      <Quiz
        question="finally bloki qachon bajariladi?"
        options={[
          'Faqat try ichida xatolik yuz berganda',
          'Faqat try ichida xatolik yuz bermaganda',
          "Har doim — xatolik yuz bersa ham, bermasa ham",
          "Hech qachon avtomatik bajarilmaydi, uni alohida chaqirish kerak",
        ]}
        correctIndex={2}
        explanation="finally bloki try ichida xatolik chiqqan yoki chiqmaganidan qat'i nazar har doim bajariladi — shu sababli tozalash kodlari uchun mos keladi."
      />

      <h2>Maxsus xatolik turlari — bu kurs doirasidan tashqarida</h2>
      <p>
        Katta loyihalarda dasturchilar ko'pincha o'zlarining <strong>maxsus exception
        klasslarini</strong> yaratishadi (masalan, <code>class YoshXatoligi(Exception):</code>),
        bu esa xatolik turlarini yanada aniqroq nomlash imkonini beradi.
      </p>
      <Callout type="warning" title="Chegaraga e'tibor bering">
        <code>class</code> orqali maxsus exception yaratish — bu OOP (obyektga yo'naltirilgan
        dasturlash) mavzusi bo'lib, ushbu kursda o'rgatilmaydi. Bizga hozircha shuning o'zi
        yetarli: <code>raise</code> orqali Python'ning tayyor exception turidan (
        <code>ValueError</code>, <code>TypeError</code> va hokazo) foydalanib, o'zimiz xohlagan
        xabar bilan xatolik chaqirish. Bu amaliyotda ko'pgina holatlar uchun to'liq yetarli.
      </Callout>

      <Quiz
        question={`raise ValueError("yosh manfiy bo'lishi mumkin emas") qatori nima qiladi?`}
        options={[
          'Dasturni to\'xtatmasdan konsolga xabar chop etadi',
          "Ataylab xatolik chaqiradi va agar u ushlanmasa dasturni to'xtatadi",
          "Yangi maxsus exception klassi yaratadi",
          'Faqat try bloki ichida ishlaydi, boshqa joyda xatolik beradi',
        ]}
        correctIndex={1}
        explanation="raise ataylab exception chaqiradi; agar bu try/except bilan ushlanmasa, u oddiy ushlanmagan xatolik kabi dasturni to'xtatadi."
      />

      <Exercise title="Mashq">
        <p>
          <code>narx_tekshir(narx)</code> nomli funksiya yozing: agar <code>narx</code> nol yoki
          manfiy bo'lsa, <code>ValueError("narx musbat bo'lishi kerak")</code> xatoligini
          chaqiring; aks holda <code>narx</code>ni qaytaring. Funksiyani{' '}
          <code>try</code>/<code>except</code> ichida <code>-10</code> qiymati bilan chaqirib,
          xatolik xabarini chiroyli chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="python">{`def narx_tekshir(narx):
    if narx <= 0:
        raise ValueError("narx musbat bo'lishi kerak")
    return narx

try:
    narx_tekshir(-10)
except ValueError as xato:
    print(f"Xatolik: {xato}")
finally:
    print("Tekshiruv tugatildi")`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>finally</code> bloki <code>try</code> ichida xatolik chiqsa ham, chiqmasa ham har
          doim bajariladi — tozalash kodi uchun mos keladi.
        </li>
        <li>
          <code>raise</code> kalit so'zi orqali o'zingiz ataylab exception chaqirishingiz mumkin,
          masalan qiymat mantiqan noto'g'ri bo'lganda.
        </li>
        <li>
          <code>raise ValueError("xabar")</code> — Python'ning tayyor exception turidan o'z
          xabaringiz bilan foydalanish; bu qanday chaqirilgan bo'lsa, <code>except ... as</code>{' '}
          bilan xabarni o'qib olish mumkin.
        </li>
        <li>
          Maxsus exception klasslarini <code>class</code> orqali yaratish — bu OOP mavzusi bo'lib,
          ushbu kurs doirasidan tashqarida qoladi.
        </li>
      </KeyPoints>
    </>
  )
}
