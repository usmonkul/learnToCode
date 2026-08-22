import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Ustun turlari va cheklovlar",
  section: "2-bo'lim: Ma'lumotlar bazasi va jadvallar",
}

export default function Lesson05UstunTurlariVaCheklovlar() {
  return (
    <>
      <p>
        O'tgan darsda <code>tasks</code> jadvalini yaratdik va unga <code>text</code>,{' '}
        <code>bool</code>, <code>timestamptz</code> turidagi ustunlar qo'shdik — lekin bu
        turlar aslida nimani anglatadi va nega aynan ular tanlangan? Bu darsda Postgres'ning
        eng ko'p ishlatiladigan ustun turlarini va ularga qo'yiladigan cheklovlarni (constraints)
        chuqurroq ko'rib chiqamiz.
      </p>

      <h2>Ustun turi (column type) nima uchun kerak?</h2>
      <p>
        Har bir ustunga tur belgilash — Postgres'ga "bu ustunga faqat shu formatdagi qiymat
        kiritilishi mumkin" deyishdir. Masalan, <code>is_done</code> ustuni <code>bool</code>{' '}
        turida bo'lsa, unga <code>"ha"</code> yoki <code>1</code> kabi qiymat yozishga urinib
        ko'rsangiz, ma'lumotlar bazasi xatolik qaytaradi. Bu — kamchilik emas, aksincha himoya:
        noto'g'ri formatdagi ma'lumot jadvalga umuman kirmaydi, demak keyinchalik ilovangizda
        "kutilmagan qiymat" tufayli buzilishlar bo'lmaydi.
      </p>

      <h2>text — matn uchun</h2>
      <p>
        <code>tasks.title</code> ustuni <code>text</code> turida. Postgres'da <code>text</code>{' '}
        ustuniga istalgan uzunlikdagi matn yozish mumkin — MySQL yoki boshqa ba'zi
        ma'lumotlar bazalaridan farqli o'laroq, Postgres'da <code>varchar(255)</code> kabi
        uzunlik chegarasini oldindan belgilashning amaliy foydasi deyarli yo'q, chunki{' '}
        <code>text</code> ham xuddi shunday tez ishlaydi.
      </p>
      <Callout type="tip" title="text yetarli, varchar shart emas">
        Ko'plab boshqa ma'lumotlar bazalarida odat bo'yicha <code>VARCHAR(n)</code> ishlatiladi,
        lekin Postgres'da <code>text</code> ustuni ishlash tezligi jihatidan{' '}
        <code>varchar</code>dan farq qilmaydi. Shuning uchun zamonaviy Postgres/Supabase
        loyihalarida deyarli har doim oddiy <code>text</code> ishlatiladi, uzunlik chegarasi esa
        kerak bo'lsa alohida cheklov (constraint) sifatida qo'shiladi.
      </Callout>

      <h2>bool — ha/yo'q uchun</h2>
      <p>
        <code>tasks.is_done</code> ustuni <code>bool</code> (yoki to'liq nomi bilan{' '}
        <code>boolean</code>) turida. Bu ustun faqat ikkita qiymat qabul qiladi:{' '}
        <code>true</code> yoki <code>false</code> (yana bir maxsus holat —{' '}
        <code>null</code>, ya'ni "qiymat umuman kiritilmagan", agar ustun buni ruxsat bersa).
        Vazifa bajarilganmi yoki yo'qmi — bu aynan shunday ikki holatli ma'lumot, shuning
        uchun <code>bool</code> tabiiy tanlov.
      </p>

      <h2>timestamptz — vaqt zonasi bilan sana/vaqt</h2>
      <p>
        <code>tasks.created_at</code> ustuni <code>timestamptz</code> turida —{' '}
        <em>timestamp with time zone</em> degani. Bu — sana va vaqtni <strong>UTC</strong>{' '}
        formatida saqlab, uni o'qiganda so'rov yuborgan mijozning vaqt zonasiga moslab
        ko'rsatadigan tur.
      </p>
      <Callout type="warning" title="timestamptz, timestamp emas">
        Postgres'da <code>timestamp</code> (vaqt zonasisiz) va <code>timestamptz</code> (vaqt
        zonasi bilan) — ikkita boshqa-boshqa tur. Agar siz <code>timestamp</code> ishlatsangiz
        va foydalanuvchilaringiz turli mamlakatlarda bo'lsa, saqlangan vaqt qaysi zonaga
        tegishli ekanini aniqlash imkonsiz bo'lib qoladi. Shu sababli deyarli har doim{' '}
        <code>timestamptz</code> tanlang — bu Postgres hamjamiyatida keng tarqalgan tavsiya.
      </Callout>
      <p>
        <code>created_at</code> ustunining standart qiymati <code>now()</code> — bu Postgres'ning
        joriy vaqtni qaytaruvchi funksiyasi. Yangi qator qo'shilganda, agar{' '}
        <code>created_at</code> qiymati aniq ko'rsatilmasa, Postgres avtomatik ravishda{' '}
        <code>now()</code>ni chaqirib, o'sha paytdagi aniq vaqtni yozadi. Shuning uchun frontend
        kodida bu maydonni hech qachon qo'lda to'ldirish shart bo'lmaydi.
      </p>

      <h2>NOT NULL cheklovi</h2>
      <p>
        <code>NOT NULL</code> — ustunga <code>null</code> (ya'ni "qiymat yo'q") kiritishni
        taqiqlaydigan cheklov. <code>tasks.title</code> ustuni <code>NOT NULL</code> qilib
        belgilangan, shuning uchun sarlavhasiz vazifa qo'shishga urinsangiz, Postgres qatorni
        umuman saqlamaydi va xatolik qaytaradi:
      </p>
      <CodeBlock lang="sql">{`-- title bermasdan qator qo'shishga urinish:
insert into tasks (is_done) values (false);
-- Xato: null value in column "title" violates not-null constraint`}</CodeBlock>
      <p>
        Bu — xato emas, aksincha ma'lumotlar bazasining o'zi sizning ilovangiz mantiqini
        himoya qiladigan joy: hatto frontend kodida qandaydir tekshiruv o'tkazib
        yuborilgan taqdirda ham, ma'lumotlar bazasi noto'g'ri (bo'sh sarlavhali) qatorni
        qabul qilmaydi.
      </p>

      <h2>DEFAULT qiymati</h2>
      <p>
        <code>DEFAULT</code> — agar qiymat aniq ko'rsatilmasa, ustunga avtomatik yoziladigan
        qiymatni belgilaydi. Bizning jadvalimizda ikkita ustunda default bor:
      </p>
      <ul>
        <li>
          <code>is_done</code> — default <code>false</code>: yangi vazifa har doim
          "bajarilmagan" holatda boshlanadi.
        </li>
        <li>
          <code>created_at</code> — default <code>now()</code>: yaratilgan vaqt avtomatik
          yoziladi.
        </li>
      </ul>
      <p>
        Muhim farq: <code>NOT NULL</code> qiymat kiritishni <strong>majburiy</strong> qiladi,
        <code>DEFAULT</code> esa kiritilmagan holatda <strong>o'rnini bosadigan</strong> qiymat
        beradi. Ular birga ham ishlatiladi — masalan <code>is_done</code> ustuni ham{' '}
        <code>NOT NULL</code>, ham <code>DEFAULT false</code>: qiymat hech qachon{' '}
        <code>null</code> bo'la olmaydi, lekin aniq ko'rsatilmasa, avtomatik{' '}
        <code>false</code> bo'ladi.
      </p>

      <h2>id — primary key va identity</h2>
      <p>
        <code>tasks.id</code> ustuni ikkita alohida xususiyatga ega:
      </p>
      <ul>
        <li>
          <strong>Primary key</strong> — bu ustun jadvaldagi har bir qatorni{' '}
          <strong>bir ma'noli tarzda aniqlaydi</strong> (unique identifier). Ikki qatorda bir
          xil <code>id</code> bo'lishi mumkin emas, va Postgres bu qoidani avtomatik nazorat
          qiladi.
        </li>
        <li>
          <strong>Identity</strong> — <code>id</code>ning qiymatini siz emas, Postgres'ning
          o'zi hisoblaydi: har bir yangi qatorga avtomatik ravishda 1 dan boshlab ketma-ket
          son beradi.
        </li>
      </ul>
      <p>
        Shu tufayli qator qo'shganda <code>id</code>ni hech qachon qo'lda kiritmaysiz — buni
        keyingi darslarda amalda ko'ramiz.
      </p>

      <Quiz
        question="tasks jadvalidagi created_at ustuni nega timestamp emas, timestamptz turida?"
        options={[
          "timestamptz tezroq ishlaydi",
          "timestamptz vaqtni UTC formatida saqlab, o'qiganda vaqt zonasiga moslashtiradi — bu turli hududdagi foydalanuvchilar uchun to'g'ri natija beradi",
          "timestamp turi Supabase'da umuman mavjud emas",
          "timestamptz kamroq joy egallaydi",
        ]}
        correctIndex={1}
        explanation="timestamptz vaqt zonasini hisobga oladi va vaqtni UTC'da saqlaydi, shuning uchun turli vaqt zonasidagi foydalanuvchilar uchun ma'lumot noaniqlikka olib kelmaydi. timestamp esa vaqt zonasisiz saqlaydi va bu muammoli bo'lishi mumkin."
      />

      <Quiz
        question="NOT NULL va DEFAULT cheklovlari orasidagi farq nimada?"
        options={[
          "Ular bir xil narsani anglatadi",
          "NOT NULL qiymat kiritishni majburiy qiladi, DEFAULT esa qiymat kiritilmaganda o'rnini bosadigan qiymat beradi",
          "DEFAULT qiymat kiritishni majburiy qiladi, NOT NULL esa o'rnini bosadigan qiymat beradi",
          "Ikkalasi ham faqat matn (text) ustunlarida ishlatiladi",
        ]}
        correctIndex={1}
        explanation="NOT NULL — qiymat majburiy, bo'sh (null) bo'lishi mumkin emas. DEFAULT — qiymat aniq ko'rsatilmasa, avtomatik ishlatiladigan zaxira qiymat. Ular bir-birini to'ldirib, birga ishlatilishi ham mumkin (masalan is_done ustunida)."
      />

      <KeyPoints>
        <li>
          Ustun turi Postgres'ga qaysi formatdagi qiymatlar qabul qilinishini aytadi va
          noto'g'ri formatdagi ma'lumot jadvalga kirishining oldini oladi.
        </li>
        <li>
          <code>text</code> — cheklanmagan uzunlikdagi matn uchun, Postgres'da{' '}
          <code>varchar(n)</code>dan tezligi jihatidan farqi yo'q.
        </li>
        <li>
          <code>bool</code> — <code>true</code>/<code>false</code> qiymatlari uchun,{' '}
          <code>timestamptz</code> — vaqt zonasini hisobga oladigan sana/vaqt uchun (har doim
          oddiy <code>timestamp</code>dan afzal).
        </li>
        <li>
          <code>NOT NULL</code> qiymat kiritishni majburiy qiladi, <code>DEFAULT</code> esa
          qiymat berilmaganda avtomatik ishlatiladigan zaxira qiymatni belgilaydi.
        </li>
        <li>
          <code>id</code> ustuni <strong>primary key</strong> (qatorni bir ma'noli aniqlaydi)
          va <strong>identity</strong> (qiymatini Postgres o'zi avtomatik hisoblaydi)
          xususiyatlariga ega.
        </li>
      </KeyPoints>
    </>
  )
}
