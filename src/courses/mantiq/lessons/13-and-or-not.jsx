import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'VA, YOKI, EMAS',
  section: 'Mantiqiy fikrlash',
}

export default function VaYokiEmasLesson() {
  return (
    <>
      <h2>Restoran menyusidan boshlaylik</h2>
      <p>
        Kafega kirdingiz va menyuda shunday yozuvlarni ko'rdingiz. Ularning har biri boshqa-boshqa
        ma'noni bildiradi:
      </p>
      <ul>
        <li>
          <strong>"Choy VA kofe"</strong> — bu kombinatsiyada ikkalasi ham keladi: sizga bitta
          choy va bitta kofe olib kelishadi.
        </li>
        <li>
          <strong>"Choy YOKI kofe"</strong> — bu yerda faqat bittasini tanlaysiz: yoki choy, yoki
          kofe.
        </li>
        <li>
          <strong>"Shakarsiz"</strong> — bu "shakar bilan" degan gapning inkori: ichimlikda shakar
          bo'lmaydi.
        </li>
      </ul>
      <p>
        Mantiqda bu uchta so'z — <strong>VA</strong>, <strong>YOKI</strong> va{' '}
        <strong>EMAS</strong> — bog'lovchi vazifasini bajaradi. Ular yordamida oddiy gaplardan
        yangi, aniqroq gaplar hosil qilamiz:
      </p>
      <ul>
        <li>
          <strong>VA</strong> — ikkala shart ham bajarilishi kerak. "Issiq VA shirin" desangiz,
          ovqat ham issiq, ham shirin bo'lishi kerak.
        </li>
        <li>
          <strong>YOKI</strong> — kamida bitta shart bajarilsa, gap to'g'ri bo'ladi. "Choy YOKI
          kofe" desangiz, ikkalasidan birini olganingiz yetarli.
        </li>
        <li>
          <strong>EMAS</strong> — gapni teskarisiga aylantiradi. "Shirin EMAS" — "shirin"
          gapining inkori.
        </li>
      </ul>
      <Callout type="tip" title="Kichik nozik jihat">
        Ba'zan YOKI "kamida bittasi" degan ma'noni ham anglatadi — ikkalasi bo'lishi ham mumkin.
        Masalan, kimdir sizdan "sizda qalam yoki ruchka bormi?" deb so'rasa va sizda ikkalasi ham
        bo'lsa, javobingiz baribir "ha" bo'ladi.
      </Callout>

      <h2>Guruhlarga ajratib, VA va YOKI ni ko'rish</h2>
      <p>
        Sinfda so'rov o'tkazdik: kim sportga, kim musiqaga qiziqadi. Natija shunday chiqdi:
      </p>
      <ul>
        <li>
          <strong>A guruhi (sportga qiziqadiganlar):</strong> Aziz, Malika, Bobur
        </li>
        <li>
          <strong>B guruhi (musiqaga qiziqadiganlar):</strong> Malika, Nodira, Sardor
        </li>
        <li>
          <strong>A VA B (ikkalasiga ham qiziqadiganlar):</strong> Malika
        </li>
        <li>
          <strong>A YOKI B (kamida bittasiga qiziqadiganlar):</strong> Aziz, Malika, Bobur,
          Nodira, Sardor
        </li>
      </ul>
      <p>
        Diqqat qiling: <strong>A VA B</strong> guruhida faqat ikkala guruhga ham tegishli bo'lgan
        ism qoladi (Malika). <strong>A YOKI B</strong> guruhida esa kamida bitta guruhga tegishli
        bo'lgan hamma ism qoladi — deyarli butun sinf.
      </p>

      <h2>EMAS bilan bir jumboqni yechamiz</h2>
      <p>Bitta hayvon haqida menga uchta narsani aytishdi:</p>
      <ul>
        <li>Uning mo'ynasi bor VA u suvda ajoyib suzadi.</li>
        <li>U uchuvchi EMAS — parvoz qila olmaydi.</li>
        <li>U daryoning oldini yog'ochlar bilan to'sib, "to'g'on" quradi.</li>
      </ul>
      <p>
        Birinchi ikkita fakt ("mo'ynali, suzuvchi, uchmaydigan hayvon") ko'plab hayvonlarga mos
        kelishi mumkin edi — masalan foka yoki suvsarga ham. Lekin uchinchi fakt — "daryoga to'g'on
        quradi" — bu hayvonni aniq bir turga bog'laydi: bu <strong>qunduz</strong>. Har bir yangi
        fakt "VA" bilan qo'shilib, imkoniyatlar doirasini toraytirib boradi, toki faqat bitta javob
        qolguncha.
      </p>

      <Quiz
        question="Menyuda: 'Salat pomidor VA bodring bilan keladi.' Bu qanday ma'noni bildiradi?"
        options={['Faqat pomidor keladi', 'Faqat bodring keladi', 'Ikkalasi ham keladi', 'Hech biri kelmaydi']}
        correctIndex={2}
        explanation="VA bog'lovchisi ikkala shart ham bajarilishini bildiradi — demak, salatda ham pomidor, ham bodring bo'ladi."
      />

      <Exercise title="Mashq: qaysi meva?">
        <p>
          Nomzodlar: <strong>olma, banan, uzum, tarvuz</strong>. Quyidagi uchta faktdan foydalanib,
          qaysi meva haqida gap ketayotganini toping:
        </p>
        <ul>
          <li>Bu meva uzun shaklda EMAS.</li>
          <li>Bu meva mayda-mayda donalardan iborat EMAS (bir tup uzumdek emas).</li>
          <li>Bu meva juda katta VA tashqi po'sti yashil rangda.</li>
        </ul>
        <Solution>
          <p>
            1-fakt ("uzun shaklda emas") bananni chiqarib tashlaydi — banan uzun shaklda. Qoldi:
            olma, uzum, tarvuz.
          </p>
          <p>
            2-fakt ("mayda-mayda donalardan iborat emas") uzumni chiqarib tashlaydi — uzum bir
            tupda ko'plab mayda donalardan iborat. Qoldi: olma, tarvuz.
          </p>
          <p>
            3-fakt ("juda katta VA tashqi po'sti yashil") olma va tarvuzdan faqat bittasiga mos
            keladi: olma unchalik katta emas, tarvuz esa aynan shunday — juda katta va tashqi
            po'sti yashil.
          </p>
          <p>
            <strong>Javob:</strong> tarvuz.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="'Bu hayvon uchuvchi EMAS' gapi rost bo'lsa, bu hayvon haqida nima deya olamiz?"
        options={['U albatta parvoz qila oladi', 'U parvoz qila olmaydi', 'U suzadi', "Hech narsa deya olmaymiz"]}
        correctIndex={1}
        explanation="EMAS gapni teskarisiga aylantiradi: 'uchuvchi emas' — hayvon parvoz qila olmasligini bildiradi."
      />

      <KeyPoints>
        <li>VA — ikkala shart ham bajarilishi kerak; YOKI — kamida bittasi bajarilsa yetarli.</li>
        <li>EMAS gapni teskarisiga aylantiradi — inkor qiladi.</li>
        <li>
          Guruhlarni "A VA B" (ikkalasida ham bor) va "A YOKI B" (kamida bittasida bor) tarzida
          solishtirish, umumiy va farqli narsalarni aniq ko'rsatadi.
        </li>
        <li>
          Bir nechta faktni VA bilan birlashtirib, imkoniyatlar doirasini toraytirib borish orqali
          jumboqning yagona javobini topish mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
