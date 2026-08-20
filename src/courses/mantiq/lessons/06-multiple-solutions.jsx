import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Bitta muammo — ko'p yechim",
  section: 'Yechim topish',
}

export default function BittaMuammoKopYechimLesson() {
  return (
    <>
      <h2>Manzilga necha xil yo'l bilan borish mumkin?</h2>
      <p>
        Ko'pchilik shunday deb o'ylaydi: "har bir muammoning faqat bitta to'g'ri yechimi bor,
        boshqa hammasi xato". Aslida bu unchalik to'g'ri emas. Aksariyat muammolarning bir emas,
        bir nechta yechimi bo'ladi — va ularning barchasi maqsadga olib kelishi mumkin, faqat har
        biri boshqacha yo'l bilan.
      </p>
      <p>
        Masalan, uyingizdan maktabgacha borish kerak. Buning kamida uchta yo'li bor:
      </p>
      <div className="not-prose my-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-line bg-canvas-muted p-4 text-center text-sm text-ink">
          <p className="font-semibold text-brand-700">Piyoda</p>
          <p className="mt-1 text-ink-muted">~20 daqiqa · bepul · sog'lom, lekin sekin</p>
        </div>
        <div className="rounded-lg border border-line bg-canvas-muted p-4 text-center text-sm text-ink">
          <p className="font-semibold text-brand-700">Velosipedda</p>
          <p className="mt-1 text-ink-muted">~8 daqiqa · bepul · yomg'irda noqulay</p>
        </div>
        <div className="rounded-lg border border-line bg-canvas-muted p-4 text-center text-sm text-ink">
          <p className="font-semibold text-brand-700">Avtobusda</p>
          <p className="mt-1 text-ink-muted">~15 daqiqa · pul kerak · jadvalga bog'liq</p>
        </div>
      </div>
      <p>
        Uchala variant ham sizni bir xil manzilga — maktabga — olib boradi. Demak, uchalasi ham
        "to'g'ri" yechim. Ular orasidagi farq maqsadga yetish-yetmasligida emas, balki tezlik,
        narx va qulaylikda.
      </p>
      <Callout type="note" title="Muhim tushuncha">
        Muammoning "to'g'ri yechimi" ko'pincha "yagona yechim" degani emas — "maqsadga olib
        boradigan yechim" degani. Va bunday yechimlar bir nechta bo'lishi juda mumkin.
      </Callout>

      <h2>Boshqa misol: bitta taom, ikkita retsept</h2>
      <p>
        Somsa pishirmoqchisiz. Buning ham kamida ikkita yo'li bor. Birinchisi — do'kondan tayyor
        xamir sotib olish: tez, oson, lekin ta'mi ozgina sodda chiqadi. Ikkinchisi — xamirni
        o'zingiz qorish: ko'proq vaqt va mehnat talab qiladi, lekin natija ko'pincha mazaliroq
        bo'ladi.
      </p>
      <p>
        Ikkala usul ham sizni bir xil natijaga — pishgan somsaga — olib keladi. Qaysi birini
        tanlash esa vaziyatga bog'liq: agar mehmonlar 20 daqiqadan keyin kelsa, birinchi usul
        aqlliroq. Agar erta tongdan boshlab pishirishga vaqtingiz bo'lsa, ikkinchisi.
      </p>
      <Quiz
        question="Sizning yechimingiz do'stingiznikidan butunlay farq qiladi, lekin ikkalasi ham natijaga olib keladi. Bu nimani anglatadi?"
        options={[
          "Faqat sizniki to'g'ri, do'stingizniki xato",
          'Ikkalasi ham to\'g\'ri bo\'lishi mumkin — ular shunchaki boshqa-boshqa yo\'llar',
          "Faqat do'stingizniki to'g'ri",
          "Ikkalasi ham xato, chunki ular bir xil emas",
        ]}
        correctIndex={1}
        explanation="Bir xil natijaga olib keladigan har xil yo'llarning barchasi to'g'ri yechim hisoblanadi — muammolarning ko'pchiligida yagona 'to'g'ri' javob yo'q."
      />

      <h2>Yechimlarni qanday solishtirish mumkin?</h2>
      <p>
        Agar bir nechta yechim bo'lsa, qaysi birini tanlash kerak? Buning uchun mezonlarga
        (criteria) qarab baholang:
      </p>
      <ul>
        <li>
          <strong>Tezroq</strong> — qaysi yechim maqsadga eng tez yetkazadi?
        </li>
        <li>
          <strong>Osonroq</strong> — qaysi yechim kamroq kuch va bilim talab qiladi?
        </li>
        <li>
          <strong>Arzonroq</strong> — qaysi yechim kamroq pul yoki resurs sarflaydi?
        </li>
        <li>
          <strong>Sifatliroq</strong> — qaysi yechim natijasi yaxshiroq chiqadi?
        </li>
      </ul>
      <Callout type="tip" title="Har doim eng tezi eng yaxshisi emas">
        Agar shoshilinch bo'lmasangiz, tezlik unchalik muhim emas — balki sifat yoki narx
        muhimroq bo'lishi mumkin. To'g'ri yechim — vaziyatga eng mos keladigan yechim, hamma
        vaqt "eng tezi" emas.
      </Callout>

      <Exercise title="Mashq">
        <p>
          Muammo: sinfdoshingizga juda muhim xabar yetkazish kerak, lekin uning telefon raqami
          sizda yo'q. Buning kamida ikkita boshqa-boshqa yechimini yozing. Keyin javob bering:
          agar xabar juda shoshilinch bo'lsa (bir necha daqiqa ichida yetib borishi kerak),
          qaysi yechim yaxshiroq va nega?
        </p>
        <Solution>
          <p>
            Masalan: 1) boshqa umumiy sinfdoshdan telefon raqamini so'rab olish va o'zingiz
            yozish; 2) ijtimoiy tarmoq yoki maktab guruhi orqali xabar qoldirish; 3) uning
            ota-onasiga yoki ukasiga xabar berish. Agar xabar juda shoshilinch bo'lsa, eng tez
            javob keladigan usul (masalan, darhol online bo'lgan umumiy do'stingiz orqali) eng
            yaxshi tanlov bo'ladi — bu yerda tezlik hal qiluvchi mezon.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="Agar sizga tezlik emas, balki pulni tejash muhim bo'lsa, yechimni qaysi mezon bo'yicha tanlaysiz?"
        options={['Tezlik', 'Narx (arzonlik)', 'Chiroylilik', 'Mashhurlik']}
        correctIndex={1}
        explanation="Har bir vaziyatda muhim bo'lgan mezon boshqacha bo'lishi mumkin — bu yerda maqsad pul tejash bo'lgani uchun eng arzon yechim eng mos keladi."
      />

      <KeyPoints>
        <li>Aksariyat muammolarning yagona emas, bir nechta to'g'ri yechimi bor.</li>
        <li>
          Bir xil natijaga olib keladigan turli yo'llarning barchasi "to'g'ri" hisoblanadi —
          ular faqat tezlik, narx, qulaylik kabi jihatlar bilan farq qiladi.
        </li>
        <li>
          Yechimlarni tanlashda mezonlardan foydalaning: tezroq, osonroq, arzonroq, sifatliroq.
        </li>
        <li>Eng yaxshi yechim vaziyatga bog'liq — u har doim ham "eng tezi" degani emas.</li>
      </KeyPoints>
    </>
  )
}
