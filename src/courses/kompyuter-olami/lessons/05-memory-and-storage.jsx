import Callout from '@/components/content/Callout'
import Figure from '@/components/content/Figure'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import memoryStorage from '@/assets/memory-storage.svg'

export const meta = {
  title: "Xotira turlari: RAM va Storage",
  section: "Kompyuterning asosiy qismlari",
}

export default function MemoryAndStorageLesson() {
  return (
    <>
      <p>
        Protsessor buyruqlarni bajarish uchun ma'lumotni <em>qayerdandir</em> olishi kerak, va
        natijani ham <em>qayergadir</em> saqlashi kerak. Kompyuterda buning uchun ikki xil xotira
        bor — va ular bir-biridan juda farq qiladi.
      </p>

      <h2>Ish stoli va kutubxona</h2>
      <p>
        Tasavvur qiling: siz uy vazifasini bajarasiz. Hozir kerak bo'lgan kitob va daftarlarni{' '}
        <strong>ish stoliga</strong> yoyib qo'yasiz — ular qo'l uzatsangoq yetadigan joyda. Lekin
        ishlatilmaydigan boshqa kitoblaringiz <strong>kutubxona javoniga</strong> tartib bilan
        joylashtirilgan. Ish stoli — kichik, lekin tez; kutubxona — katta, lekin bir oz uzoqroq.
      </p>

      <Figure
        src={memoryStorage}
        alt="Ish stoli (RAM) va kutubxona (doimiy xotira) taqqoslash sxemasi"
        caption="2-rasm: RAM — ish stoli, Storage — kutubxona"
      />

      <ul>
        <li>
          <strong>RAM (tezkor xotira)</strong> — bu "ish stoli". Kompyuter hozir ishlatayotgan
          dastur va fayllar shu yerda turadi. U juda tez, lekin kompyuter o'chirilsa — bo'shab
          qoladi.
        </li>
        <li>
          <strong>Storage (doimiy xotira)</strong> — bu "kutubxona". Barcha suratlar, video va
          o'rnatilgan dasturlar shu yerda saqlanadi. U RAM'dan sekinroq, lekin kompyuter
          o'chirilsa ham hech narsa yo'qolmaydi.
        </li>
      </ul>

      <Callout type="tip" title={`Nega telefoningiz "xotira to'ldi" deb yozadi?`}>
        Bu ogohlantirish odatda <strong>doimiy xotira</strong> (Storage) — ya'ni suratlar, video
        va dasturlar uchun joy tugaganini bildiradi. Buni "kutubxonada javon joyi qolmadi" deb
        tasavvur qiling — yangi kitob (fayl) qo'yish uchun eskilaridan biroz bo'shatish kerak.
      </Callout>

      <h2>Nega ikkalasi ham kerak?</h2>
      <p>
        Agar faqat kutubxona (Storage) bo'lganida, protsessor har safar kerakli ma'lumotni uzoq
        javondan izlashi kerak bo'lardi — bu sekin bo'lardi. Agar faqat ish stoli (RAM) bo'lganida
        esa, kompyuter o'chirilganda hamma narsa yo'qolib ketardi. Shuning uchun ikkalasi
        birgalikda ishlatiladi: RAM tezlik uchun, Storage esa doimiy saqlash uchun.
      </p>

      <Exercise title="Mashq: RAM yoki Storage?">
        <p>
          Quyidagi holatlarning har biri RAM'ga ko'proq o'xshaydimi yoki Storage'gami? 1) Siz hozir
          yozayotgan, hali saqlamagan insho. 2) Telefoningizdagi bir yil oldin olingan suratlar.
        </p>
        <Solution>
          <p>
            <strong>1) Hali saqlamagan insho</strong> — RAM'ga o'xshaydi: u hozirgina "ish
            stolida", va agar kompyuter to'satdan o'chib qolsa, saqlanmagan qismi yo'qolishi
            mumkin.
          </p>
          <p>
            <strong>2) Bir yil oldingi suratlar</strong> — Storage'ga o'xshaydi: ular doimiy
            saqlangan, telefonni o'chirib-yoqsangiz ham joyida turadi.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="Kompyuterni o'chirib qayta yoqqaningizda qaysi xotiradagi ma'lumot yo'qoladi?"
        options={['Storage (doimiy xotira)', 'RAM (tezkor xotira)', 'Ikkalasi ham', 'Hech biri']}
        correctIndex={1}
        explanation="RAM — vaqtinchalik xotira: kompyuter o'chirilganda unda saqlangan hamma narsa tozalanadi. Storage esa doimiy — kompyuter o'chirilsa ham, undagi fayllar joyida qoladi."
      />

      <KeyPoints>
        <li>RAM (tezkor xotira) — hozir ishlatilayotgan ma'lumotlar uchun, tez, lekin vaqtinchalik.</li>
        <li>Storage (doimiy xotira) — barcha fayllar uchun, sekinroq, lekin doimiy.</li>
        <li>Kompyuter o'chirilganda RAM tozalanadi, Storage esa saqlanib qoladi.</li>
      </KeyPoints>
    </>
  )
}
