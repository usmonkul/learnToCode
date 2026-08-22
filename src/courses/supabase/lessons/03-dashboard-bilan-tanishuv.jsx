import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Dashboard bilan tanishuv",
  section: "1-bo'lim: Kirish va sozlash",
}

export default function Lesson03DashboardBilanTanishuv() {
  return (
    <>
      <p>
        Loyihangiz yaratilgach, siz Supabase <strong>Dashboard</strong>ida — loyihangizning
        boshqaruv panelida — o'zingizni topasiz. Bu sahifa dastlab ko'p bo'limli va murakkab
        ko'rinishi mumkin, lekin aslida chap tomondagi menyu bir necha aniq bo'limga bo'lingan.
        Keyingi darslarda biz shu bo'limlarning har biridan navbat bilan foydalanamiz, shuning
        uchun bu darsda ularning har biri nima uchun kerakligini umumiy tarzda ko'rib chiqamiz.
      </p>

      <h2>Table Editor</h2>
      <p>
        Chap menyudagi <strong>Table Editor</strong> — ma'lumotlar bazangizdagi jadvallarni
        vizual, jadval (Excel'ga o'xshash) ko'rinishda ko'rish va boshqarish uchun bo'lim. Bu
        yerda siz:
      </p>
      <ul>
        <li>Yangi jadval yaratasiz ("New table" tugmasi orqali) — ustun nomlarini, turlarini belgilaysiz;</li>
        <li>Mavjud jadvaldagi qatorlarni ko'rasiz, qo'shasiz, tahrirlaysiz va o'chirasiz;</li>
        <li>Ustunlar orasidagi bog'lanishlarni (foreign key) vizual tarzda sozlaysiz.</li>
      </ul>
      <p>
        Keyingi bo'limda biz aynan shu Table Editor orqali birinchi jadvalimiz —{' '}
        <code>tasks</code>ni yaratamiz, u yerda SQL yozishga hojat qolmaydi.
      </p>

      <h2>SQL Editor</h2>
      <p>
        <strong>SQL Editor</strong> — to'g'ridan-to'g'ri Postgres ma'lumotlar bazangizga SQL
        buyruqlarini yozib yuborish imkonini beruvchi bo'lim. Table Editor'da bajarish mumkin
        bo'lgan har qanday amalni (jadval yaratish, ustun qo'shish, ma'lumot kiritish) shu yerda
        oddiy SQL kodi yordamida ham bajarish mumkin — ikkalasi bir xil ma'lumotlar bazasi bilan
        ishlaydi, faqat interfeysi farq qiladi.
      </p>
      <Callout type="note" title="Nega ikkalasi ham kerak?">
        Table Editor — tez va vizual, ayniqsa boshlang'ich bosqichda qulay. SQL Editor esa
        murakkabroq so'rovlar, xavfsizlik qoidalari (RLS policy) yozish va bir nechta amalni
        birgalikda (masalan, jadval yaratish + boshlang'ich ma'lumot kiritish) bajarish kerak
        bo'lganda ishlatiladi. Ikkalasini ham bilish foydali — biz kursning keyingi bo'limida
        ikkalasidan ham foydalanamiz.
      </Callout>

      <h2>Authentication</h2>
      <p>
        <strong>Authentication</strong> bo'limi — loyihangizga ro'yxatdan o'tgan
        foydalanuvchilarni boshqarish uchun. Bu yerda siz ro'yxatdan o'tgan foydalanuvchilar
        ro'yxatini ko'rasiz, qaysi usul bilan kirish (email/parol, Google, GitHub va h.k.)
        yoqilganini sozlaysiz, va autentifikatsiya bilan bog'liq boshqa sozlamalarni (masalan,
        email tasdiqlash talab qilinadimi yoki yo'q) boshqarasiz. Bu bo'limdan biz kursning{' '}
        <strong>Autentifikatsiya</strong> bo'limida — foydalanuvchilarga ro'yxatdan o'tish va
        kirish imkonini qo'shganimizda — batafsil foydalanamiz.
      </p>

      <h2>Storage</h2>
      <p>
        <strong>Storage</strong> bo'limi — fayllarni (rasmlar, hujjatlar, video va h.k.) saqlash
        uchun. Bu yerda siz "bucket" deb ataladigan fayl-papkalar yaratasiz, ularni ochiq
        (public) yoki yopiq (private) qilib belgilaysiz, va yuklangan fayllarni ko'rasiz.
        "Vazifalar boshqaruvchisi" loyihamizda biz keyinroq har bir vazifaga fayl biriktirish
        imkonini qo'shganimizda shu bo'limdan foydalanamiz.
      </p>

      <h2>API sozlamalari — URL va anon key</h2>
      <p>
        Chap menyudagi <strong>Project Settings → API</strong> (ba'zi versiyalarda shunchaki{' '}
        <strong>API Settings</strong>) sahifasi — bizning frontend ilovamiz uchun eng muhim
        sahifalardan biri. Aynan shu yerda ikkita qiymatni topasiz:
      </p>
      <ul>
        <li>
          <strong>Project URL</strong> — loyihangizning manzili, masalan{' '}
          <code>https://xxxxxxxxxxxx.supabase.co</code> ko'rinishida.
        </li>
        <li>
          <strong>anon (public) key</strong> — frontend kodimiz Supabase'ga ulanish uchun
          ishlatadigan ochiq kalit.
        </li>
      </ul>
      <p>
        Keyinroq, loyihamizni Vite + React bilan sozlaganimizda, aynan shu ikkita qiymatni{' '}
        <code>.env</code> faylimizga qo'yamiz — bu haqida keyingi bo'limda batafsil gaplashamiz.
      </p>
      <Callout type="tip" title="anon key'dan qo'rqmang">
        <code>anon key</code> nomidan qo'rqib ketmang — bu kalitni frontend kodida ochiq
        qoldirish, hatto brauzerning devtools'ida ko'rinib turishi ham — normal holat, chunki u{' '}
        <strong>ochiq bo'lish uchun mo'ljallangan</strong>. Haqiqiy xavfsizlik bu kalitni
        yashirishdan emas, balki ma'lumotlar bazasidagi <strong>Row Level Security (RLS)</strong>{' '}
        qoidalaridan keladi — bu haqida alohida bo'limda batafsil o'rganamiz. Faqat bitta narsani
        aniq eslab qoling: shu sahifada ko'rinadigan boshqa bir kalit —{' '}
        <strong>service_role key</strong> — hech qachon frontend kodiga qo'yilmasligi kerak, u
        ma'lumotlar bazangizga barcha cheklovlarni chetlab o'tib kirish huquqini beradi.
      </Callout>

      <h2>Boshqa bo'limlar — qisqacha</h2>
      <p>
        Menyuda yana bir qancha bo'lim bor — <strong>Database</strong> (jadvallar, kengaytmalar,
        replikatsiya sozlamalari), <strong>Edge Functions</strong> (server tomonidagi maxsus
        funksiyalar), <strong>Logs</strong> (loyihangizda yuz bergan so'rovlar tarixi). Bularning
        ba'zilarini kursning oxirgi bo'limlarida qisqacha ko'rib chiqamiz, lekin hozircha asosiy
        e'tiborimiz yuqorida sanab o'tilgan beshta bo'limda: Table Editor, SQL Editor,
        Authentication, Storage va API sozlamalari.
      </p>

      <Quiz
        question="Frontend ilovamiz Supabase'ga ulanishi uchun qaysi ikkita qiymat kerak bo'ladi, va ular qayerdan olinadi?"
        options={[
          "Database Password va loyiha nomi, Table Editor'dan olinadi",
          "Project URL va anon key, Project Settings → API sahifasidan olinadi",
          "service_role key va Database Password, SQL Editor'dan olinadi",
          "Foydalanuvchi email va parol, Authentication bo'limidan olinadi",
        ]}
        correctIndex={1}
        explanation="Frontend kodi Supabase'ga ulanishi uchun Project URL va anon (public) key kerak bo'ladi — ikkalasini ham Project Settings → API sahifasida topish mumkin."
      />

      <Quiz
        question="anon key va service_role key haqida qaysi tasdiq to'g'ri?"
        options={[
          "Ikkalasi ham frontend kodida bemalol ishlatilishi mumkin, farqi yo'q",
          "anon key ochiq bo'lishga mo'ljallangan (haqiqiy himoya RLS orqali), service_role key esa hech qachon frontendga qo'yilmasligi kerak",
          "service_role key faqat Storage bo'limi uchun ishlatiladi",
          "anon key ma'lumotlar bazasiga to'liq, cheklovsiz kirish huquqini beradi",
        ]}
        correctIndex={1}
        explanation="anon key — ochiq bo'lish uchun mo'ljallangan, haqiqiy xavfsizlik Row Level Security (RLS) qoidalaridan keladi. service_role key esa barcha cheklovlarni chetlab o'tadi va faqat serverda, hech qachon frontend kodida ishlatilmasligi kerak."
      />

      <Exercise title="Amaliy topshiriq: Dashboard'ni o'rganish">
        <p>
          Yaratgan Supabase loyihangizning Dashboard'ida quyidagi ma'lumotlarni toping:
        </p>
        <ol>
          <li>
            <strong>Project Settings → API</strong> sahifasiga o'ting va{' '}
            <code>Project URL</code> qiymatini toping — u <code>https://...supabase.co</code>{' '}
            ko'rinishida bo'lishi kerak.
          </li>
          <li>Xuddi shu sahifada <code>anon public</code> kalitini toping.</li>
          <li>
            <strong>Table Editor</strong> bo'limiga o'ting va hozircha jadvallar yo'qligini
            tasdiqlang ("New table" tugmasi ko'rinadi).
          </li>
          <li>
            <strong>Authentication → Providers</strong> bo'limiga o'ting va standart holatda
            qaysi kirish usuli (provider) allaqachon yoqilganini aniqlang.
          </li>
        </ol>
        <Solution>
          <p>
            Project URL va anon key'ni topgan bo'lsangiz, ularni hozircha shunchaki ko'rib
            chiqing — ularni haqiqiy loyihaga keyinroq, Vite + React sozlash darsida{' '}
            <code>.env</code> fayliga qo'shamiz. Table Editor bo'sh bo'lishi kerak, chunki hali
            birorta ham jadval yaratmadik. Authentication → Providers bo'limida esa, odatda,{' '}
            <strong>Email</strong> provayderi Supabase'da standart bo'yicha allaqachon yoqilgan
            holda turadi — biz undan kursning Autentifikatsiya bo'limida foydalanamiz.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Table Editor — jadvallarni vizual (Excel'ga o'xshash) ko'rinishda yaratish va
          boshqarish uchun, SQL Editor esa to'g'ridan-to'g'ri SQL buyruqlari yozish uchun.
        </li>
        <li>
          Authentication bo'limi ro'yxatdan o'tgan foydalanuvchilarni va kirish usullarini
          boshqaradi, Storage esa fayllarni saqlash uchun bucket'larni.
        </li>
        <li>
          Project Settings → API sahifasida frontend uchun kerakli ikkita qiymat joylashgan:{' '}
          Project URL va anon key.
        </li>
        <li>
          anon key ochiq bo'lish uchun mo'ljallangan — haqiqiy xavfsizlik Row Level Security
          (RLS) orqali ta'minlanadi.
        </li>
        <li>
          service_role key esa cheklovlarni chetlab o'tadi va hech qachon frontend kodiga
          qo'yilmasligi kerak.
        </li>
      </KeyPoints>
    </>
  )
}
