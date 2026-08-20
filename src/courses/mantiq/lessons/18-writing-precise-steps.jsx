import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Aniq qadamlar yozish',
  section: 'Algoritmik yondashuv',
}

export default function AniqQadamlarYozishLesson() {
  return (
    <>
      <p>
        O'tgan darsda algoritmning uchta belgisini o'rgandik: aniq, tartiblangan, cheklangan.
        Shulardan birinchisi — <strong>aniqlik</strong> — aslida eng qiyini. Chunki odamlar
        bir-biriga ko'rsatma berayotganda ko'p narsani "o'zi tushunadi" deb taxmin qiladi. Bugun
        aynan shu muammoni yechishni mashq qilamiz.
      </p>

      <h2>Robotcha bilan tanishing</h2>
      <Callout type="note" title="Robotcha">
        Tasavvur qiling: sizda kichkina robot bor. U juda aqlli, lekin bitta g'alati xususiyati
        bor — u faqat aytilgan so'zlarni, so'zma-so'z bajaradi. Hech narsani taxmin qilmaydi,
        hech narsani "o'zi tushunib olmaydi". Agar biror narsani aytmasangiz, u buni bilmaydi
        deb hisoblang. Keling, unga ko'rsatma berishga harakat qilamiz.
      </Callout>

      <h2>Noaniq ko'rsatma qanday muammo tug'diradi</h2>
      <p>Robotchaga shunday desak:</p>
      <Callout type="warning" title="Noaniq buyruq">
        "Noningga moy surt."
      </Callout>
      <p>Robotcha darrov to'xtaydi, chunki bu jumlada juda ko'p narsa noaniq:</p>
      <ul>
        <li>Qaysi non? (stolda bir nechta non bo'lagi bo'lishi mumkin)</li>
        <li>Qancha moy solish kerak?</li>
        <li>Qanday moy — sariyog'mi, o'simlik moyimi?</li>
        <li>Nonning qaysi tomoniga surtish kerak?</li>
      </ul>
      <p>
        Agar Robotcha shu savollarga o'zi javob topib, taxmin qila boshlasa — natija kutilganidan
        butunlay boshqacha bo'lishi mumkin (masalan, butun moy idishini nonning ikkala tomoniga
        to'kib yuborishi mumkin). Endi shu ko'rsatmani Robotcha aniq bajara oladigan qilib
        qayta yozamiz:
      </p>
      <ol>
        <li>Stoldagi bitta bo'lak nonni oling.</li>
        <li>Pichoq bilan sariyog' idishidan bir choy qoshiq moy oling.</li>
        <li>Moyni nonning yuqori tomoniga, bir chetidan ikkinchi chetigacha tekis suring.</li>
        <li>Pichoqni likobchaga qo'ying.</li>
      </ol>
      <p>
        Endi hech qanday savol qolmadi — Robotcha bu ko'rsatmani xatosiz bajaradi, chunki har
        bir so'z aniq bir amalni bildiradi.
      </p>

      <Quiz
        question="Robotcha quyidagi to'rtta ko'rsatmadan qaysi birini hech qanday qo'shimcha savolsiz bajara oladi?"
        options={[
          'Uyni tez tozala',
          '3 ta qalamni stol ustidan olib, qutiga sol',
          "Ovqatni yaxshilab pishir",
          "Xonani chiroyli qil",
        ]}
        correctIndex={1}
        explanation="Faqat ikkinchi variantda aniq son (3 ta), aniq buyum (qalam), aniq joy (stol ustidan) va aniq amal (qutiga solish) bor. Qolganlarida 'tez', 'yaxshilab', 'chiroyli' kabi so'zlar odam uchun tushunarli, lekin so'zma-so'z bajaruvchi uchun noaniq."
      />

      <h2>"Taxmin qilma, yoz" qoidasi</h2>
      <p>
        Aniq algoritm yozishning eng oddiy qoidasi shu: agar o'quvchi (yoki Robotcha) biror
        narsani bilishi kerak bo'lsa — buni taxmin qilib qoldirmang, jumlaning ichiga aniq
        yozib qo'ying.
      </p>
      <Callout type="tip" title="Taxmin qilma, yoz">
        Ko'rsatma yozayotganda o'zingizga shunday savol bering: "Agar buni o'qigan odam hech
        narsa bilmasa-chi?" Shunda qaysi so'z noaniq qolganini darrov payqaysiz.
      </Callout>

      <Exercise title="Mashq: uy vazifasi ko'rsatmasini aniqlashtiring">
        <p>Sizga shunday uy vazifasi ko'rsatmasi berilgan, lekin u juda noaniq:</p>
        <ol>
          <li>Kitobni och.</li>
          <li>Mashqlarni yech.</li>
          <li>Daftarni yop.</li>
        </ol>
        <p>
          Robotcha bu ko'rsatmani bajara olmaydi — u qaysi kitobni, qaysi betni, qaysi
          mashqlarni yechish kerakligini bilmaydi. Ko'rsatmani Robotcha aniq bajara oladigan
          qilib qayta yozing.
        </p>
        <Solution>
          <p>Masalan, shunday variant to'g'ri bo'ladi:</p>
          <ol>
            <li>Matematika kitobini 45-betga oching.</li>
            <li>45-betdagi 1-dan 5-gacha bo'lgan mashqlarni daftaringizga yozib yeching.</li>
            <li>Javoblaringizni bir marta qayta tekshiring.</li>
            <li>Daftarni yoping va sumkangizga soling.</li>
          </ol>
        </Solution>
      </Exercise>

      <Quiz
        question="'Xonani supur' degan buyruqda Robotcha uchun aniq nima yetishmayapti?"
        options={[
          'Qaysi xona ekanligi va qachon to\'xtash kerakligi',
          "Supurgichning rangi",
          "Kunning qaysi vaqti ekanligi",
          "Hech narsa, bu allaqachon aniq buyruq",
        ]}
        correctIndex={0}
        explanation="'Xona' — noaniq (uyda bir nechta xona bo'lishi mumkin), 'supur' esa qachon to'xtash kerakligini aytmaydi. Aniq buyruq: 'Mehmonxonaning polini supur, toki tagida axlat qolmaguncha.'"
      />

      <KeyPoints>
        <li>
          Aniqlik — algoritmning eng muhim xususiyati, chunki bajaruvchi faqat aytilganini
          bajaradi, ortig'ini emas.
        </li>
        <li>
          Robotcha kabi tasavvuriy, so'zma-so'z bajaruvchi bilan sinab ko'rish noaniq
          joylarni topishning yaxshi usuli.
        </li>
        <li>
          Noaniq so'zlar ("biroz", "tez", "yaxshilab", "xona") aniq son, joy va amal bilan
          almashtirilishi kerak.
        </li>
        <li>Qoida: taxmin qilma, yoz — bilishi kerak bo'lgan har narsani jumlaga aniq kiriting.</li>
      </KeyPoints>
    </>
  )
}
