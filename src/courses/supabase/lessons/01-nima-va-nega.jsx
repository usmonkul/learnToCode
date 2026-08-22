import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Supabase nima va u nimaga yordam beradi?",
  section: "1-bo'lim: Kirish va sozlash",
}

export default function Lesson01NimaVaNega() {
  return (
    <>
      <p>
        Har qanday zamonaviy veb yoki mobil ilova ikkita katta qismdan iborat: foydalanuvchi
        ko'radigan qism — <strong>frontend</strong> (React, Vue, mobil ilova va h.k.) va
        ma'lumotlarni saqlaydigan, foydalanuvchilarni tekshiradigan, fayllarni boshqaradigan
        yashirin qism — <strong>backend</strong>. Frontend yozish endilikda ancha oson va
        qiziqarli: komponentlar, holat (state), stil — bularning barchasi ko'rinadigan natija
        beradi. Backend esa boshqacha: server sozlash, ma'lumotlar bazasini o'rnatish,
        autentifikatsiya tizimini yozish, xavfsizlik qoidalarini qo'lda tekshirish — bularning
        barchasi ko'p vaqt va tajriba talab qiladi, lekin foydalanuvchiga bevosita ko'rinmaydi.
      </p>
      <p>
        Aynan shu og'irlikni yengillashtirish uchun <strong>Backend-as-a-Service (BaaS)</strong>{' '}
        — "xizmat sifatidagi backend" degan yondashuv paydo bo'ldi. Bu darsda biz shu
        yondashuvning eng mashhur vakillaridan biri — <strong>Supabase</strong> bilan
        tanishamiz.
      </p>

      <h2>Supabase nima?</h2>
      <p>
        Supabase — bu tayyor backend infratuzilmasini taqdim etadigan platforma. Siz server
        kodini noldan yozish o'rniga, Supabase taqdim etgan tayyor xizmatlardan foydalanib,
        backend qismini soatlar ichida tayyorlashingiz mumkin. Supabase o'z ichiga quyidagi
        asosiy qismlarni oladi:
      </p>
      <ul>
        <li>
          <strong>Ma'lumotlar bazasi (Postgres)</strong> — Supabase'ning yuragi. Bu — dunyoda
          eng ishonchli va keng tarqalgan ochiq kodli relyatsion ma'lumotlar bazalaridan biri
          bo'lgan <strong>PostgreSQL</strong>ning to'liq, cheklanmagan versiyasi. Siz jadvallar
          yaratasiz, ular orasida bog'lanishlar (relationships) quriasiz, va oddiy SQL
          buyruqlaridan tortib murakkab so'rovlargacha barchasini bajarishingiz mumkin.
        </li>
        <li>
          <strong>Auth (autentifikatsiya)</strong> — foydalanuvchilarni ro'yxatdan o'tkazish,
          kirish-chiqish, email tasdiqlash, Google/GitHub kabi tashqi provayderlar orqali kirish
          — bularning barchasi tayyor holda keladi. Sizga faqat kerakli funksiyalarni chaqirish
          qoladi.
        </li>
        <li>
          <strong>Storage (fayllarni saqlash)</strong> — rasmlar, hujjatlar va boshqa fayllarni
          yuklash, saqlash va ularga kirishni boshqarish uchun xizmat.
        </li>
        <li>
          <strong>Realtime (jonli yangilanishlar)</strong> — ma'lumotlar bazasidagi
          o'zgarishlarni (yangi qator qo'shilishi, yangilanishi, o'chirilishi) real vaqt
          rejimida frontendga "eshitish" imkoniyati — masalan, chat ilovasi yoki jonli tахtа
          uchun juda foydali.
        </li>
        <li>
          <strong>Avtomatik generatsiya qilingan API'lar</strong> — eng muhim xususiyatlardan
          biri: siz Supabase'da jadval yaratishingiz bilanoq, o'sha jadval uchun to'liq REST va
          real vaqtli API avtomatik tarzda tayyor bo'ladi. Backend kodi yozmasdan, to'g'ridan
          frontenddan ma'lumotlar bazasiga so'rov yuborishingiz mumkin.
        </li>
      </ul>

      <Callout type="note" title="Nega bu muhim?">
        An'anaviy yondashuvda backend server yozish, uni serverga joylashtirish, ma'lumotlar
        bazasi bilan ulanishni sozlash, autentifikatsiya tizimini xavfsiz qilib yozish — barchasi
        haftalab vaqt olishi mumkin edi. Supabase bilan esa siz shu xizmatlarning barchasini
        tayyor holda olasiz va o'z e'tiboringizni ilovangizning asosiy g'oyasiga qaratishingiz
        mumkin.
      </Callout>

      <h2>Supabase — Firebase bilan qisqacha taqqoslash</h2>
      <p>
        BaaS haqida gap ketganda, ko'pchilik avval <strong>Firebase</strong>ni eslaydi — Google
        tomonidan taqdim etiladigan, xuddi shunday xizmatlar to'plamini beruvchi platforma. Ikkalasi
        ham o'xshash muammoni hal qiladi, lekin muhim farqlari bor:
      </p>
      <ul>
        <li>
          <strong>Ma'lumotlar bazasi turi:</strong> Firebase — NoSQL (hujjat asosidagi, Firestore)
          ma'lumotlar bazasidan foydalanadi. Supabase esa — to'liq <strong>SQL (Postgres)</strong>{' '}
          ma'lumotlar bazasi. Agar siz jadvallar, ustunlar va ular orasidagi aniq bog'lanishlar
          bilan ishlashga o'rgangan bo'lsangiz (masalan, ma'lumotlar bazasi kursida), Supabase
          sizga tanishroq keladi.
        </li>
        <li>
          <strong>Ochiq kodliligi:</strong> Supabase — ochiq kodli (open source) loyiha. Uni
          o'zingizning serveringizda ham joylashtirish (self-host) mumkin, xohlasangiz Supabase
          kompaniyasining bulutli xizmatidan foydalanasiz. Firebase esa to'liq yopiq, faqat
          Google'ning o'z infratuzilmasida ishlaydi.
        </li>
        <li>
          <strong>SQL bilimi qayta ishlatiladi:</strong> Postgres — sanoat standarti bo'lgani
          uchun, Supabase'da o'rgangan SQL bilimingiz boshqa har qanday loyihada, hatto Supabase
          ishlatmasangiz ham, kerak bo'ladi.
        </li>
      </ul>
      <p>
        Ikkalasi ham yaxshi tanlov, lekin bu kursda biz Supabase'ni tanlaymiz — chunki u SQL
        asosida ishlaydi, ochiq kodli, va zamonaviy frontend freymvorklar (xususan React) bilan
        juda tabiiy integratsiya qiladi.
      </p>

      <h2>Kursda quramiz: "Vazifalar boshqaruvchisi"</h2>
      <p>
        Nazariyani yodlash o'rniga, biz shu kurs davomida haqiqiy, ishlaydigan bitta loyihani —{' '}
        <strong>"Vazifalar boshqaruvchisi" (Task Manager)</strong> ilovasini — boshidan oxirigacha
        birga quramiz. Bu — foydalanuvchi o'ziga vazifalar (task) qo'shadigan, ularni bajarilgan
        deb belgilaydigan, o'chiradigan va hatto ularga fayl biriktiradigan oddiy, ammo to'liq
        ishlaydigan veb-ilova bo'ladi.
      </p>
      <p>
        Loyiha <strong>Vite + React</strong> asosida quriladi, <strong>Tailwind CSS</strong> bilan
        stillashtiriladi, va butun backend qismi — ma'lumotlar bazasi, autentifikatsiya, fayllarni
        saqlash, jonli yangilanishlar — barchasi <strong>Supabase</strong> orqali amalga oshiriladi.
        Kurs oxiriga kelib siz quyidagilarni bajara oladigan tayyor ilovaga ega bo'lasiz:
      </p>
      <ul>
        <li>Foydalanuvchi email va parol bilan (yoki Google orqali) ro'yxatdan o'tadi va kiradi;</li>
        <li>Har bir foydalanuvchi faqat o'zining vazifalarini ko'radi (xavfsizlik qoidalari orqali);</li>
        <li>Vazifa qo'shish, bajarilgan deb belgilash va o'chirish mumkin;</li>
        <li>Vazifaga fayl (masalan, rasm yoki hujjat) biriktirish mumkin;</li>
        <li>Boshqa qurilmada vazifa qo'shilsa, ekranda darhol, sahifani yangilamasdan ko'rinadi.</li>
      </ul>
      <Callout type="tip" title="Qadam-baqadam boramiz">
        Har bir dars oldingi darsda qurilgan narsa ustiga qo'shimcha qiladi — biz hech qachon
        loyihani noldan qayta yozmaymiz. Shuning uchun har bir darsni ketma-ketlikda o'tish
        muhim: keyingi darslar oldingi darslarda yaratilgan jadval, komponent va sozlamalarga
        tayanadi.
      </Callout>

      <Quiz
        question="Supabase avtomatik ravishda taqdim etadigan API haqida qaysi tasvir to'g'ri?"
        options={[
          "Jadval yaratilgach, o'sha jadval uchun API'ni dasturchi qo'lda yozishi kerak",
          "Jadval yaratilishi bilanoq, o'sha jadval uchun REST va real vaqtli API avtomatik tarzda tayyor bo'ladi",
          "API faqat Supabase'ning pullik tarifida mavjud",
          "API faqat autentifikatsiya uchun ishlaydi, jadvallar uchun emas",
        ]}
        correctIndex={1}
        explanation="Supabase'ning eng katta afzalliklaridan biri shu — jadval yaratilishi bilan uning ustida CRUD amallarini bajaradigan API avtomatik generatsiya qilinadi, backend kodi yozish shart emas."
      />

      <Quiz
        question="Supabase va Firebase o'rtasidagi asosiy farqlardan biri qaysi?"
        options={[
          "Firebase ochiq kodli, Supabase esa yopiq",
          "Supabase Postgres (SQL) ma'lumotlar bazasidan, Firebase esa Firestore (NoSQL) dan foydalanadi",
          "Firebase faqat mobil ilovalar uchun, Supabase faqat veb uchun mo'ljallangan",
          "Ikkalasida ham ma'lumotlar bazasi mavjud emas",
        ]}
        correctIndex={1}
        explanation="Supabase — SQL asosidagi (Postgres) ma'lumotlar bazasidan foydalanadi va ochiq kodli, Firebase esa NoSQL (Firestore) asosida ishlaydi va yopiq platforma."
      />

      <KeyPoints>
        <li>
          Supabase — Backend-as-a-Service (BaaS) platformasi: Postgres ma'lumotlar bazasi, Auth,
          Storage, Realtime va avtomatik API'larni bitta joyda taqdim etadi.
        </li>
        <li>
          Har bir yaratilgan jadval uchun API avtomatik generatsiya qilinadi — backend kodini
          qo'lda yozish shart emas.
        </li>
        <li>
          Supabase — Firebase'dan farqli o'laroq, to'liq SQL (Postgres) asosida ishlaydi va ochiq
          kodli.
        </li>
        <li>
          Kurs davomida "Vazifalar boshqaruvchisi" nomli haqiqiy loyihani boshidan oxirigacha
          birga quramiz — Vite + React + Tailwind CSS + Supabase.
        </li>
        <li>
          Har bir keyingi dars oldingi darsdagi natijaga tayanadi, shuning uchun darslarni
          ketma-ketlikda o'tish muhim.
        </li>
      </KeyPoints>
    </>
  )
}
