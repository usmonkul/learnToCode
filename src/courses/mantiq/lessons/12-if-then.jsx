import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'AGAR... U HOLDA',
  section: 'Mantiqiy fikrlash',
}

export default function AgarUHoldaLesson() {
  return (
    <>
      <h2>Kundalik hayotda "agar... u holda"</h2>
      <p>
        Siz har kuni, o'zingiz sezmasdan, "agar... u holda" tarzida fikrlaysiz. Masalan:
      </p>
      <ul>
        <li>"Agar yomg'ir yog'sa, soyabon olib chiqaman."</li>
        <li>"Agar uyg'onish vaqti kelsa, soat jiringlaydi."</li>
        <li>"Agar issiq bo'lsa, konditsionerni yoqaman."</li>
      </ul>
      <p>
        Bunday gapning ikki qismi bor: <strong>shart</strong> ("agar" dan keyingi qism) va{' '}
        <strong>natija</strong> ("u holda" dan keyingi qism). Agar shart bajarilsa, natija ham
        albatta yuz beradi — buni <strong>shart-natija qoidasi</strong> deyish mumkin.
      </p>
      <Callout type="tip" title="Ikki qismni ajrating">
        "Agar yomg'ir yog'sa, soyabon olib chiqaman" gapida shart — "yomg'ir yog'ishi", natija esa
        — "soyabon olib chiqish". Har qanday "agar... u holda" gapini o'qiganda, avval shu ikki
        qismni aniq ajratib oling — bu keyingi xulosa chiqarishni ancha osonlashtiradi.
      </Callout>

      <h2>Bir nechta qoidani zanjirlab bog'lash</h2>
      <p>
        Eng qiziq joyi shundaki, bir nechta "agar... u holda" qoidasini ketma-ket qo'llab, uzoqroq
        xulosa zanjiriga erishish mumkin. Masalan, quyidagi uchta faktni ko'ring:
      </p>
      <ol>
        <li>Agar chiroq yonayotgan bo'lsa, xonada tok bor.</li>
        <li>Agar xonada tok bor bo'lsa, konditsioner ishlaydi.</li>
        <li>Xonadagi chiroq hozir yonyapti.</li>
      </ol>
      <p>
        3-faktdan bilamizki, chiroq yonyapti. 1-qoidani qo'llasak: chiroq yonyapti, demak xonada
        tok bor. Endi 2-qoidani qo'llasak: xonada tok bor, demak konditsioner ishlaydi. Ikki
        qoidani ketma-ket qo'llab, bitta oddiy kuzatuvdan ("chiroq yonyapti") ancha uzoqroq
        xulosaga ("konditsioner ishlaydi") yetib keldik:
      </p>
      <div className="not-prose my-6 flex flex-col items-center gap-2 rounded-xl border border-line bg-canvas-muted p-6 text-center text-sm text-ink">
        <div className="rounded-full border border-brand-300 bg-brand-50 px-4 py-2 font-medium text-brand-700 dark:border-brand-700 dark:bg-brand-950 dark:text-brand-300">
          Chiroq yonyapti
        </div>
        <span className="text-ink-muted">↓ (1-qoida)</span>
        <div className="rounded-lg border border-line bg-canvas px-4 py-2">Xonada tok bor</div>
        <span className="text-ink-muted">↓ (2-qoida)</span>
        <div className="rounded-full border border-brand-300 bg-brand-50 px-4 py-2 font-medium text-brand-700 dark:border-brand-700 dark:bg-brand-950 dark:text-brand-300">
          Konditsioner ishlaydi
        </div>
      </div>

      <Callout type="warning" title="Diqqat: teskarisi har doim ham to'g'ri emas">
        "Agar yomg'ir yog'sa, yer nam bo'ladi" — bu to'g'ri qoida. Lekin agar siz yerni nam ko'rib
        qolsangiz, bu albatta yomg'ir yog'gan degani emas — balki kimdir gullarni sug'organ
        bo'lishi ham mumkin. Natijani ko'rish shartning albatta yuz berganini isbotlamaydi, chunki
        bir xil natijaga boshqa sabab ham olib kelishi mumkin.
      </Callout>

      <Quiz
        question="'Agar hayvon qush bo'lsa, uning patlari bor. Tovus — qush.' Shu ikki faktdan qanday xulosa chiqarish mumkin?"
        options={[
          'Tovusning patlari bor',
          'Tovus uchadi',
          'Barcha patli hayvonlar qush',
          'Hech qanday xulosa chiqmaydi',
        ]}
        correctIndex={0}
        explanation="1-qoidani ('agar qush bo'lsa, patlari bor') tovusga qo'llaymiz: tovus qush ekan, demak uning patlari bor. Bu — oddiy va to'g'ri xulosa."
      />

      <Exercise title="Mashq: xulosa chiqaring">
        <p>Quyidagi uchta faktni o'qing:</p>
        <ol>
          <li>Agar bugun juma bo'lsa, Malika sport zaliga boradi.</li>
          <li>Agar Malika sport zaliga borsa, u sport formasini kiyadi.</li>
          <li>Bugun juma.</li>
        </ol>
        <p>Savol: Malika bugun sport formasini kiyadimi? Xulosangizni qadam-baqadam isbotlang.</p>
        <Solution>
          <p>
            3-faktdan bilamiz: bugun juma. 1-qoidani qo'llaymiz — bugun juma ekan, demak Malika
            sport zaliga boradi. Endi 2-qoidani qo'llaymiz — Malika sport zaliga borar ekan,
            demak u sport formasini kiyadi.
          </p>
          <p>
            <strong>Javob:</strong> ha, Malika bugun sport formasini kiyadi — bu ikkita qoidani
            ketma-ket qo'llash orqali aniq isbotlanadi.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="'It hursa, kimdir kelgan. It hurmayapti.' Shundan 'demak, hech kim kelmagan' deb xulosa chiqarish TO'G'RIMI?"
        options={[
          "Ha, bu har doim to'g'ri xulosa",
          "Yo'q — it hurmasa ham, kimdir sekin, sezdirmasdan kelgan bo'lishi mumkin",
          "Bu gapning umuman aloqasi yo'q",
          "It hech qachon hurmaydi",
        ]}
        correctIndex={1}
        explanation="Qoida faqat 'it hursa, kimdir kelgan' deydi — bu 'it hurmasa, hech kim kelmagan' degani emas. Shartning teskarisidan xulosa chiqarish xato bo'lishi mumkin."
      />

      <KeyPoints>
        <li>"Agar... u holda" gapi ikki qismdan iborat: shart va natija.</li>
        <li>Agar qoida to'g'ri bo'lsa va shart bajarilsa, natija ham albatta yuz beradi.</li>
        <li>
          Bir nechta "agar... u holda" qoidasini ketma-ket qo'llab, uzoqroq xulosa zanjiriga
          erishish mumkin.
        </li>
        <li>
          Natijaning yuz berishi shartning albatta bajarilganini bildirmaydi — bir xil natijaga
          boshqa sabab ham olib kelishi mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
