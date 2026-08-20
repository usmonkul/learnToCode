import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Amaliyot: Labirintdan chiqish',
  section: 'Yechim topish',
}

export default function LabirintdanChiqishLesson() {
  return (
    <>
      <h2>Endi hammasini birlashtiramiz</h2>
      <p>
        Yechim topishning bir nechta foydali usulini ko'rib chiqdik: bitta muammoning bir
        nechta yechimi bo'lishi mumkinligini, sinov va xatoning aqlli tarzda ishlashini,
        maqsaddan orqaga qarab o'ylashni va eng oddiy yechimdan boshlashni. Endi shularning
        barchasini bitta amaliy topshiriqda — labirintdan chiqishda — qo'llab ko'ramiz.
      </p>
      <p>
        Quyida kichik labirint berilgan. Belgilar: <code>#</code> — devor (o'tib bo'lmaydi),{' '}
        <code>.</code> — ochiq yo'l, <code>S</code> — kirish (start), <code>E</code> — chiqish
        (exit). Faqat yuqoriga, pastga, chapga yoki o'ngga yurish mumkin — diagonal (qiyshiq)
        harakat yo'q.
      </p>
      <pre className="not-prose my-6 rounded-lg border border-line bg-canvas-muted p-4 font-mono text-sm leading-relaxed">
        {`#######
#S..###
###.###
#....##
#.#####
#....E#
#######`}
      </pre>
      <p>Buni yechishning bir nechta yo'li bor — o'zingizga qulayini tanlang:</p>
      <ul>
        <li>
          <strong>Sinov va xato:</strong> bir yo'nalishni sinab ko'ring, tor ko'chaga
          (dead end) kelib qolsangiz, orqaga qaytib boshqasini sinang — har bir "noto'g'ri"
          qadam sizga qayerga bormaslik kerakligini ko'rsatadi.
        </li>
        <li>
          <strong>Oxiridan boshlab o'ylash:</strong> <code>E</code> dan boshlab, orqaga —{' '}
          <code>S</code> tomon — yo'l izlang.
        </li>
        <li>
          <strong>Eng oddiy yechimdan boshlash:</strong> butun labirint bilan bir vaqtda
          shug'ullanmang — bitta hududga (masalan yuqori qismiga) e'tibor qarating, uni
          yechgach, keyingi hududga o'ting.
        </li>
      </ul>
      <Callout type="tip" title="Yordamchi maslahat">
        Labirintda <code>S</code> dan chiqqach, bir joyda ikkita yo'nalish ochiq ko'rinadi —
        ulardan biri chiqishga olib boradi, ikkinchisi esa tor ko'chaga tugaydi. Bu — sinov va
        xatoning aynan o'zi: ikkalasini ham sinab ko'rish mumkin, muhimi tor ko'chaga
        kirib qolsangiz, undan xulosa chiqarib orqaga qaytish.
      </Callout>

      <Exercise title="Mashq">
        <p>
          Yuqoridagi labirintni o'zingiz yeching. Yo'lni qadamlar ro'yxati sifatida yozib
          qo'ying (masalan: "o'ngga, pastga, chapga..."). Tayyor bo'lgach, yechimni tekshiring.
        </p>
        <Solution>
          <p>
            To'g'ri yo'l: o'ngga, o'ngga, pastga, pastga, chapga, chapga, pastga, pastga,
            o'ngga, o'ngga, o'ngga, o'ngga — va siz <code>E</code> ga yetib borasiz.
          </p>
          <p>
            Izoh: <code>S</code> dan ikki marta o'ngga yurgach, pastga tushib pastki
            qatorlarga o'tasiz. Yo'l davomida o'ng tomonga ochiq ko'ringan bitta katak (yuqori
            qismidagi tor ko'cha) aslida hech qayerga olib bormaydi — bu labirintdagi yagona
            "aldamchi" yo'nalish. Qolgan barcha qadamlar yagona to'g'ri yo'lni tashkil qiladi.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="Labirintni yechishda bir yo'nalish tor ko'chaga (dead end) olib kelsa, bu nimani anglatadi?"
        options={[
          'Labirintning yechimi umuman yo\'q',
          "Bu normal holat — orqaga qaytib, boshqa yo'nalishni sinash kerak",
          'Siz labirintni noto\'g\'ri chizgansiz',
          "Darhol mashqni tashlab qo'yish kerak",
        ]}
        correctIndex={1}
        explanation="Tor ko'chaga kirib qolish sinov-xato jarayonining tabiiy qismi — undan xulosa chiqarib, boshqa yo'nalishni sinash kerak."
      />

      <KeyPoints>
        <li>Ko'pchilik muammoning bitta emas, bir nechta yechim yo'li bo'lishi mumkin.</li>
        <li>
          Sinov va xato — noto'g'ri urinishlardan xulosa chiqarib, keyingi urinishni
          yaxshilash orqali ishlaydigan aqlli strategiya.
        </li>
        <li>
          Oxiridan (maqsaddan) boshlab, "bundan oldin nima kerak edi?" deb so'rash ba'zi
          muammolarni ancha osonlashtiradi.
        </li>
        <li>
          Katta yoki murakkab tuyulgan muammoni kichik qismlarga bo'lib, bittadan hal qilish
          uni boshqariladigan qiladi.
        </li>
        <li>
          Bu to'rtta usul birga ishlaydi — real hayotdagi muammolarni yechayotganda ularni
          aralashtirib qo'llashdan tortinmang.
        </li>
      </KeyPoints>
    </>
  )
}
