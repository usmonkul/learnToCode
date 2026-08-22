import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Keyingi qadamlar",
  section: "8-bo'lim: Yakuniy loyiha",
}

export default function Lesson27KeyingiQadamlar() {
  return (
    <>
      <p>
        Tabriklaymiz — siz noldan boshlab, haqiqiy autentifikatsiyasi, xavfsizlik qatlami,
        fayl saqlash imkoniyati va jonli yangilanishlari bo'lgan to'liq ishlaydigan ilova
        qurdingiz, va uni internetga joylashtirdingiz. Bu kurs "Vazifalar boshqaruvchisi"
        misolida tugadi, lekin Supabase imkoniyatlari bundan ancha kengroq. Bu qisqa yakuniy
        darsda — keyingi safar nimani o'rganish mumkinligiga ikkita yo'nalishni ko'rsatib
        o'tamiz.
      </p>

      <h2>Edge Functions: server kodini qachon yozish kerak bo'ladi</h2>
      <p>
        Shu kurs davomida biz hech qachon o'zimizning "backend" kodimizni yozmadik — buning
        o'rniga frontend to'g'ridan-to'g'ri Supabase'ning bazasi va servislariga murojaat
        qildi, xavfsizlikni esa RLS policy'lari ta'minladi. Bu ko'p holatlar uchun yetarli.
        Lekin ba'zan sizga <strong>chinakam server-tomonidagi kod</strong> kerak bo'ladi —
        masalan:
      </p>
      <ul>
        <li>
          Uchinchi tomon API'siga (masalan, to'lov tizimi yoki SMS xizmati) maxfiy kalit bilan
          murojaat qilish kerak bo'lsa — bu kalitni hech qachon frontend'ga chiqarib
          bo'lmaydi.
        </li>
        <li>
          Murakkab mantiq bir nechta xizmatni birlashtirishi kerak bo'lsa (masalan, vazifa
          yaratilganda avtomatik email yuborish).
        </li>
        <li>
          RLS policy orqali ifodalab bo'lmaydigan hisob-kitob yoki tekshiruv kerak bo'lsa.
        </li>
      </ul>
      <p>
        Aynan shu holatlar uchun Supabase <strong>Edge Functions</strong>ni taklif qiladi —
        Deno muhitida ishlaydigan, serversiz (serverless) funksiyalar. Ularni yozasiz,{' '}
        <code>supabase functions deploy</code> orqali joylashtirasiz, va ular Supabase'ning
        infratuzilmasida, sizga tegishli maxfiy kalitlar bilan, dunyoning turli nuqtalariga
        yaqin joylarda ishga tushadi. Frontend ularni oddiy HTTP so'rovi orqali chaqiradi —
        xuddi o'z API endpoint'ingiz bo'lgandek.
      </p>

      <CodeBlock lang="js">{`// misol uchun frontend'dan Edge Function'ni chaqirish
const { data, error } = await supabase.functions.invoke('send-notification', {
  body: { taskId: 42 },
})`}</CodeBlock>

      <h2>Database Functions va Triggers: mantiqni bazaning o'ziga joylashtirish</h2>
      <p>
        Edge Functions — alohida, tashqi kod. Lekin ba'zan mantiq shu qadar bazaga yaqinki, uni
        to'g'ridan-to'g'ri Postgres'ning o'zida yozish ma'qulroq bo'ladi. Buning uchun{' '}
        <strong>Database Functions</strong> (Postgres funksiyalari, odatda SQL yoki
        PL/pgSQL'da yoziladi) va <strong>Triggers</strong> (ma'lum bir amal — masalan{' '}
        <code>insert</code> yoki <code>update</code> — sodir bo'lganda avtomatik ishga
        tushadigan funksiyalar) bor. Klassik misollar:
      </p>
      <ul>
        <li>
          Har safar qator yangilanganda <code>updated_at</code> ustunini avtomatik joriy
          vaqtga o'rnatish.
        </li>
        <li>
          Yangi foydalanuvchi ro'yxatdan o'tganda, <code>auth.users</code>ga qo'shilgan
          zahoti unga mos <code>profiles</code> qatorini avtomatik yaratish.
        </li>
        <li>
          Bir nechta ustundan hisoblab olinadigan qiymatni (masalan, umumiy vazifalar soni)
          har safar qo'lda hisoblash o'rniga bazaning o'zida saqlab, avtomatik yangilab
          turish.
        </li>
      </ul>
      <p>
        Bunday mantiq bazaning o'zida yashagani uchun, uni qaysi frontend orqali murojaat
        qilinganidan qat'i nazar (veb, mobil, boshqa xizmat) — har doim, izchil ishlaydi.
      </p>

      <Callout type="note" title="Qaysi birini tanlash kerak?">
        Oddiy qoida: agar mantiq faqat ma'lumotlar bilan bog'liq bo'lsa va tashqi xizmatga
        chiqish shart bo'lmasa (masalan, vaqt tamg'asini yangilash) — Database
        Function/Trigger. Agar mantiq tashqi API'ga murojaat qilishi, maxfiy kalit
        ishlatishi yoki murakkab, ko'p qadamli jarayon bo'lsa — Edge Function. Ikkalasi ham
        bu kursning doirasidan tashqarida, ammo endi ularning nima uchun kerakligini va qaysi
        muammoni yechishini bilasiz — Supabase hujjatlarida chuqurroq o'rganish uchun yaxshi
        boshlanish nuqtasi shu.
      </Callout>

      <h2>Endi nima qurish mumkin?</h2>
      <p>
        Siz shunchaki bitta darslikni tugatmadingiz — siz production'ga tayyor ilova qurish
        uchun zarur bo'lgan barcha asosiy qatlamlarni: ma'lumotlar bazasi loyihalash, xavfsizlik
        (RLS), autentifikatsiya, fayl saqlash va real vaqtli sinxronizatsiyani, birma-bir,
        haqiqiy loyihada qo'llab ko'rdingiz. Bu — ko'plab startap va shaxsiy loyihalarning
        aynan shu qatlamlar ustiga qurilgani degani: ijtimoiy tarmoq, chat ilovasi, buyurtma
        tizimi, hamkorlikda ishlash vositasi — barchasi shu bugun o'rgangan naqshlar
        (patterns) asosida quriladi. Keyingi loyihangizni "Vazifalar boshqaruvchisi"dan
        boshlab, uni o'zingizga kerakli narsaga aylantiring — endi buning uchun barcha
        vositalar qo'lingizda.
      </p>

      <KeyPoints>
        <li>
          Edge Functions — Deno'da ishlaydigan serversiz funksiyalar, maxfiy kalit talab
          qiluvchi yoki murakkab, tashqi xizmatlarga bog'liq mantiq uchun.
        </li>
        <li>
          Database Functions va Triggers — bazaning o'zida ishlaydigan Postgres mantiqi,
          masalan avtomatik vaqt tamg'asi yoki hisoblangan qiymatlar uchun.
        </li>
        <li>
          Ikkalasi ham RLS/policy orqali ifodalab bo'lmaydigan holatlar uchun mo'ljallangan —
          bu kursda ko'rilmadi, lekin endi qachon kerak bo'lishini bilasiz.
        </li>
        <li>
          Bu kursda o'rgangan naqshlar — baza loyihalash, RLS, auth, storage, realtime — har
          qanday zamonaviy ilova quruvchi asos hisoblanadi.
        </li>
      </KeyPoints>
    </>
  )
}
