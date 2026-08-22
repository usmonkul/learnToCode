import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Birinchi policy'ni yaratish",
  section: "4-bo'lim: Row Level Security",
}

export default function Lesson13BirinchiPolicy() {
  return (
    <>
      <p>
        Oldingi darsda RLS nima ekanligini va nega u shart ekanligini ko'rdik. Endi buni amalda
        qo'llaymiz: <code>tasks</code> jadvalimizda RLS'ni yoqamiz va birinchi policy'mizni
        yozamiz. Buni Supabase Dashboard'dagi <strong>SQL Editor</strong> orqali qilamiz — xuddi
        6-darsda jadval yaratganimizga o'xshab.
      </p>

      <h2>RLS'ni yoqish</h2>
      <p>
        Har qanday jadvalda RLS'ni yoqish uchun bitta SQL buyrug'i kifoya:
      </p>
      <CodeBlock lang="sql">{`alter table tasks enable row level security;`}</CodeBlock>
      <p>
        Bu buyruqni SQL Editor'ga kiritib, <strong>Run</strong> tugmasini bosing. Endi{' '}
        <code>tasks</code> jadvali "qulflangan" holatga o'tdi — lekin diqqat qiling: bu jadvalni
        butunlay yopib qo'ymaydi, faqat sukut bo'yicha (default) <strong>hamma narsani rad
        etadi</strong>. RLS yoqilgan jadvalga hech qanday policy yozilmagan bo'lsa, hech kim (siz
        ham!) unga so'rov orqali kira olmaydi — hatto siz Dashboard'dagi Table Editor'da qatorlarni
        ko'rmoqchi bo'lsangiz ham (agar shu Dashboard so'rovi ham anon/authenticated kalit orqali
        ishlasa).
      </p>

      <Callout type="warning" title="RLS yoqish = hamma narsani rad etish, hali emas ruxsat berish">
        Ko'p boshlang'ich dasturchilar RLS'ni yoqqach, "nega endi ma'lumotlarim ko'rinmay
        qoldi?" deb hayron bo'lishadi. Javob oddiy: RLS yoqilgan jadval, policy yozilmaguncha,{' '}
        <strong>hech kimga hech narsani ko'rsatmaydi</strong>. Bu — xavfsizlik nuqtai nazaridan
        to'g'ri xatti-harakat: "aniq ruxsat berilmagan bo'lsa — rad et" (deny by default).
      </Callout>

      <h2>Birinchi policy'ni yozish</h2>
      <p>
        Endi <code>tasks</code> jadvalidan hamma o'qiy olishi (select qila olishi) uchun policy
        yaratamiz. Bizning ilovamizda hali autentifikatsiya yo'q — foydalanuvchilar hali
        "tizimga kirmagan", shuning uchun hozircha ataylab <strong>hammaga ochiq</strong> policy
        yozamiz. Buni keyinroq, 5-bo'limda autentifikatsiya qo'shilgach, tor qilamiz.
      </p>
      <CodeBlock lang="sql">{`create policy "Public read access"
on tasks for select
using (true);`}</CodeBlock>
      <p>
        Bu ikki qatorli SQL buyrug'ini birma-bir tahlil qilaylik:
      </p>
      <ul>
        <li>
          <code>create policy "Public read access"</code> — policy'ga nom beryapmiz. Nom
          — ixtiyoriy matn, faqat sizga (va boshqa dasturchilarga) policy nima qilishini
          tushunish uchun kerak. Har bir policy nomi jadval ichida noyob (unique) bo'lishi kerak.
        </li>
        <li>
          <code>on tasks</code> — bu policy qaysi jadvalga tegishli ekanini ko'rsatadi.
        </li>
        <li>
          <code>for select</code> — bu policy faqat <strong>o'qish</strong> (select)
          amaliyotlariga tegishli. Boshqa amaliyotlar — insert, update, delete — hali ham rad
          etilgan holicha qoladi, chunki ular uchun policy hali yozilmagan (buni keyingi darsda
          qilamiz).
        </li>
        <li>
          <code>using (true)</code> — bu policy'ning "shart"i. <code>using</code> ifodasi har bir
          mavjud qator uchun tekshiriladi: agar ifoda <code>true</code> qaytarsa, o'sha qatorni
          o'qishga ruxsat beriladi. Biz doim <code>true</code> yozganimiz uchun — bu shart har
          doim rost, demak <strong>har bir</strong> qator har bir so'rovchi uchun ko'rinadi.
        </li>
      </ul>

      <p>
        Bu buyruqni ham SQL Editor'ga qo'shib ishga tushiring. Endi ilovamizga qaytib{' '}
        <code>npm run dev</code> orqali ochsangiz, vazifalar ro'yxati oldingidek yana ko'rinadi —
        chunki endi select uchun aniq ruxsat mavjud.
      </p>

      <h2>Nega "using (true)" — ochiq eshik emas, balki chegara</h2>
      <p>
        <code>using (true)</code> — eng keng (permissive) shart, chunki u hech qanday cheklov
        qo'ymaydi. Lekin muhim farqni tushunish kerak: bu — RLS'ni chetlab o'tish emas, balki{' '}
        <strong>RLS orqali</strong> ataylab keng ruxsat berish. Boshqacha aytganda, tizim hamon
        ishlayapti va nazorat qilyapti — biz shunchaki hozircha "hammaga ruxsat" deb belgiladik.
        Keyinroq, foydalanuvchilar tizimga kira boshlagach, shu bir qatorni{' '}
        <code>using (auth.uid() = user_id)</code> kabi aniqroq shartga almashtiramiz, va u vaqtda
        har bir foydalanuvchi faqat o'z vazifalarini ko'radi.
      </p>

      <Quiz
        question={`"create policy ... for select using (true)" policy'si tasks jadvaliga qo'shilgandan keyin, shu jadvalga insert (qo'shish) so'rovi yuborilsa nima bo'ladi?`}
        options={[
          "Insert ham avtomatik ruxsat etiladi, chunki using (true) barcha amaliyotlarga tegishli",
          "Insert rad etiladi, chunki policy faqat 'for select' uchun yozilgan, insert uchun alohida policy kerak",
          "Insert ruxsat etiladi, lekin faqat autentifikatsiyadan o'tgan foydalanuvchilar uchun",
          "RLS avtomatik o'chib qoladi va jadval yana ochiq bo'lib qoladi",
        ]}
        correctIndex={1}
        explanation="Har bir policy faqat o'zi ko'rsatgan amaliyot turiga (for select, for insert va h.k.) tegishli. Insert uchun alohida policy yozilmasa, RLS yoqilgan jadvalda insert sukut bo'yicha rad etiladi."
      />

      <Exercise title="Amaliy mashq: Policy'ni tekshirish">
        <p>
          SQL Editor'da yozgan ikkita buyruqni (RLS'ni yoqish va "Public read access"
          policy'sini) qayta ishga tushiring, so'ng quyidagi so'rov yordamida jadvaldagi barcha
          policy'larni ro'yxatini ko'ring:
        </p>
        <CodeBlock lang="sql">{`select * from pg_policies where tablename = 'tasks';`}</CodeBlock>
        <p>
          Natijada nechta qator qaytishi kerak, va nima uchun?
        </p>
        <Solution>
          <p>
            Natijada bitta qator qaytadi — chunki hozircha bitta policy yozilgan (
            <code>"Public read access"</code>, <code>for select</code>). Ustunlar orasida{' '}
            <code>cmd</code> ustuni <code>SELECT</code> qiymatini, <code>qual</code> ustuni esa{' '}
            <code>using</code> shartimizni (<code>true</code>) ko'rsatadi. Keyingi darsda insert,
            update, delete uchun policy'lar qo'shilgach, bu so'rov to'rtta qator qaytaradi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>alter table tasks enable row level security;</code> jadvalda RLS'ni yoqadi va
          sukut bo'yicha barcha so'rovlarni rad etadi — policy yozilmaguncha.
        </li>
        <li>
          <code>create policy "nom" on jadval for select using (shart)</code> — o'qish uchun
          policy yaratish sintaksisi; <code>shart</code> har bir qator uchun tekshiriladi.
        </li>
        <li>
          <code>using (true)</code> — har doim rost bo'ladigan shart, demak barcha qatorlar
          ko'rinadi; bu RLS'ni chetlab o'tish emas, balki ataylab keng ruxsat berish.
        </li>
        <li>
          Har bir policy faqat o'zi ko'rsatgan amaliyot turiga (select, insert, update yoki
          delete) tegishli — qolgan amaliyotlar uchun alohida policy kerak.
        </li>
        <li>
          Bu policy hozircha vaqtinchalik ochiq — 5-bo'limda autentifikatsiya qo'shilgach, uni
          har bir foydalanuvchiga tegishli qatorlargagina cheklaymiz.
        </li>
      </KeyPoints>
    </>
  )
}
