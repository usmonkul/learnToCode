import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "RLS nima va nega har doim yoqilgan bo'lishi kerak",
  section: "4-bo'lim: Row Level Security",
}

export default function Lesson12RlsNima() {
  return (
    <>
      <p>
        Oldingi bo'limda "Vazifalar boshqaruvchisi" ilovasini Supabase'ga ulab, brauzerdan
        to'g'ridan-to'g'ri <code>tasks</code> jadvaliga so'rov yubordik — <code>select</code>,{' '}
        <code>insert</code>, <code>update</code>, <code>delete</code>. Buning ishlashi ajablanarli
        tuyulishi mumkin: axir biz backend server yozmadik, autentifikatsiya ham yo'q, lekin
        brauzer baribir ma'lumotlar bazasi bilan bemalol gaplashyapti. Bu qanday xavfsiz bo'lishi
        mumkin? Javob — <strong>Row Level Security (RLS)</strong> deb ataladigan mexanizmda.
      </p>

      <h2>RLS nima?</h2>
      <p>
        Row Level Security — bu Supabase'ning o'zi o'ylab topgan narsa emas, balki uning ostida
        yotgan <strong>PostgreSQL</strong> ma'lumotlar bazasining o'ziga xos (native) xavfsizlik
        xususiyati. RLS yoqilgan jadvalga har qanday so'rov (select, insert, update, delete)
        kelganda, Postgres avval siz yozgan <strong>policy (siyosat)</strong>larni tekshiradi va
        faqat shu policy'lar ruxsat bergan qatorlargagina (row'largagina) so'rovni qo'llaydi.
        Nomidagi "row level" — aynan shuni anglatadi: ruxsat butun jadval darajasida emas, balki
        <strong> har bir qator darajasida</strong> tekshiriladi.
      </p>
      <p>
        Boshqacha aytganda, RLS yordamida siz "kim nimani ko'ra oladi, kim nimani yoza oladi"
        degan qoidalarni ilova kodida (masalan, <code>if</code> shartlar bilan React yoki Node.js
        ichida) emas, balki to'g'ridan-to'g'ri <strong>ma'lumotlar bazasining o'zida</strong>{' '}
        belgilaysiz. Bu — juda muhim farq, va aynan shuning uchun Supabase'ning butun xavfsizlik
        modeli RLS atrofida qurilgan.
      </p>

      <h2>Nega bu Supabase uchun alohida muhim?</h2>
      <p>
        An'anaviy (klassik) veb-arxitekturada frontend ma'lumotlar bazasiga to'g'ridan-to'g'ri
        murojaat qilmaydi. O'rtada backend server turadi: frontend so'rov yuboradi, server uni
        tekshiradi ("bu foydalanuvchi shu ma'lumotni ko'rishga haqlimi?"), va faqat shundan keyin
        bazaga murojaat qiladi. Bazaning o'zi hech qanday tekshiruv qilmaydi — u serverga ishonadi.
      </p>
      <p>
        Supabase'da esa bu oraliq qatlam yo'q (yoki kamroq). React ilovamiz{' '}
        <code>supabase-client-js</code> orqali bazaga <strong>bevosita</strong> so'rov yuboradi.
        Demak, tekshiruvni kim bajarishi kerak? Aynan ma'lumotlar bazasining o'zi — va buni RLS
        policy'lari orqali amalga oshiradi. Agar RLS bo'lmasa, bazaga "ruxsat berilganmi?" degan
        savolni beruvchi hech kim qolmaydi.
      </p>

      <h2>Anon key ochiq — himoya undan emas</h2>
      <p>
        Eslab qoling: <code>.env</code> faylidagi <code>VITE_SUPABASE_ANON_KEY</code> — ataylab{' '}
        <strong>ochiq (public)</strong> kalit. U build qilingan JavaScript fayl ichida yashiringan
        holda ham, brauzer Network panelida ham, sayt manba kodida ham har qanday tashrif buyuruvchi
        uchun ko'rinadi. Bu — xato yoki xavfsizlik teshigi emas, Supabase'ning atayin qilingan
        dizayn qarori: anon key faqat "men Supabase API'siga murojaat qilyapman" degan
        identifikatsiya, u hech qanday maxsus huquq bermaydi.
      </p>
      <p>
        Demak, real himoya anon key'ni yashirishdan kelmaydi — u allaqachon ochiq. Real himoya faqat
        RLS policy'laridan keladi: anon key bilan kirgan har qanday so'rov, aynan siz belgilagan
        policy qoidalariga bo'ysunadi. Kalit — eshikning kaliti emas, balki eshikka yaqinlashish
        huquqi; kim qaysi xonaga kira olishini esa RLS belgilaydi.
      </p>

      <Callout type="danger" title="RLS o'chirilgan jadval — qulflanmagan ombor">
        Yangi jadval yaratganda Supabase RLS'ni <strong>o'chirilgan</strong> holatda qoldiradi
        (aynan shuning uchun bizning <code>tasks</code> jadvalimiz hozircha RLS'siz ishlayapti).
        Agar jadvalda RLS o'chirilgan bo'lsa va u ochiq API orqali (anon key bilan) erishiladigan
        bo'lsa — bu, aslida, qulfsiz qoldirilgan ombor eshigiga o'xshaydi: har qanday kishi sizning
        loyihangizning URL manzili va anon key'ini brauzer Network panelidan topib olib, jadvaldagi{' '}
        <strong>barcha</strong> qatorlarni o'qiy oladi, o'zgartira oladi yoki butunlay o'chirib
        tashlashi mumkin — hech qanday login talab qilinmasdan.
      </Callout>

      <h2>Amalda nima xato ketishi mumkin?</h2>
      <p>
        Tasavvur qiling: "Vazifalar boshqaruvchisi" o'rniga siz onlayn-do'kon qurayapsiz, va{' '}
        <code>orders</code> (buyurtmalar) jadvalida mijozlarning ismi, manzili va telefon raqami
        saqlanadi. Agar RLS o'chirilgan bo'lsa:
      </p>
      <ul>
        <li>
          Har qanday kishi <code>supabase.from('orders').select('*')</code> so'rovini o'z
          konsolidan yuborib, <strong>barcha</strong> mijozlarning shaxsiy ma'lumotlarini ko'rib
          chiqishi mumkin — nafaqat o'zinikini.
        </li>
        <li>
          Kimdir <code>.update({`{ is_paid: true }`})</code> yuborib, to'lanmagan buyurtmani
          "to'langan" deb belgilashi mumkin.
        </li>
        <li>
          Kimdir <code>.delete()</code> chaqirib, boshqa foydalanuvchining butun buyurtma
          tarixini o'chirib yuborishi mumkin.
        </li>
      </ul>
      <p>
        Bularning barchasi — hech qanday murakkab "xakerlik" emas, faqat brauzer Developer Tools
        konsoliga bir necha qator JavaScript kod yozish. Aynan shuning uchun RLS — ixtiyoriy
        qo'shimcha emas, balki Supabase loyihasining <strong>xavfsizlik poydevori</strong>.
      </p>

      <h2>Qoida: RLS deyarli har doim yoqilgan bo'lishi kerak</h2>
      <p>
        Agar jadval anon yoki authenticated kalit orqali API'dan erishiladigan bo'lsa, unda RLS
        yoqilgan bo'lishi shart. Bundan yagona istisno — jadval faqat{' '}
        <code>service_role</code> kaliti orqali (masalan, ishonchli backend yoki Edge Function
        ichidan) ishlatiladigan, hech qachon frontend'dan to'g'ridan-to'g'ri murojaat
        qilinmaydigan holatlar. Bizning "Vazifalar boshqaruvchisi" loyihamizda esa React ilovasi
        bazaga bevosita ulanadi — demak, bizga RLS shart.
      </p>

      <Callout type="tip" title="Postgres RLS'ni default'da yoqmagani nima uchun">
        Supabase jadval yaratilganda RLS'ni avtomatik yoqmaydi, chunki bu boshlang'ich
        bosqichdagi ishlab chiqishni (masalan, Table Editor'da qo'lda ma'lumot qo'shishni)
        qiyinlashtirib qo'ymaslik uchun qilingan qaror. Lekin Supabase Dashboard'da RLS
        o'chirilgan va ochiq jadval bo'lsa, buni ogohlantiruvchi belgi bilan alohida
        ko'rsatib turadi — bu belgini jiddiy qabul qilish kerak.
      </Callout>

      <Quiz
        question="Nega Supabase loyihasida RLS ayniqsa muhim, an'anaviy backend-server arxitekturasiga qaraganda?"
        options={[
          "Chunki Supabase Postgres o'rniga boshqa, kamroq ishonchli baza ishlatadi",
          "Chunki frontend bazaga bevosita ulanadi, va tekshiruvni bajaradigan oraliq server qatlami yo'q",
          "Chunki anon key har safar ilova ishga tushganda avtomatik o'zgarib turadi",
          "Chunki RLS faqat Supabase'da mavjud, boshqa hech qanday Postgres'da yo'q",
        ]}
        correctIndex={1}
        explanation="Klassik arxitekturada backend server ruxsatlarni tekshiradi. Supabase'da frontend bazaga bevosita murojaat qiladi, shuning uchun ruxsatni tekshirish vazifasi bazaning o'zida — RLS policy'lari orqali — bajarilishi kerak."
      />

      <h2>Keyingi darsda</h2>
      <p>
        Endi nazariyani bilib oldik — keyingi darsda <code>tasks</code> jadvalida RLS'ni haqiqatan
        ham yoqamiz va birinchi policy'mizni yozamiz.
      </p>

      <KeyPoints>
        <li>
          Row Level Security (RLS) — PostgreSQL'ning o'zida mavjud xususiyat: jadvalga kelgan har
          bir so'rov faqat siz yozgan policy'lar ruxsat bergan qatorlarga qo'llaniladi.
        </li>
        <li>
          Supabase'da frontend ma'lumotlar bazasiga bevosita ulanadi, oraliq backend server yo'q —
          shuning uchun ruxsatni tekshirish vazifasi bazaning o'ziga, ya'ni RLS'ga yuklanadi.
        </li>
        <li>
          Anon key ataylab ochiq (public) kalit — u hech qanday maxsus huquq bermaydi, real himoya
          faqat RLS policy'laridan keladi.
        </li>
        <li>
          RLS o'chirilgan va ochiq API orqali erishiladigan jadval — istalgan kishi to'liq
          o'qiy/yoza/o'chira oladigan qulfsiz ombor bilan barobar.
        </li>
        <li>
          Qoida: agar jadval anon yoki authenticated kalit orqali erishiladigan bo'lsa, unda RLS
          deyarli har doim yoqilgan bo'lishi kerak.
        </li>
      </KeyPoints>
    </>
  )
}
