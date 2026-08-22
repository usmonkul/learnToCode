import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Loyihani yaratish",
  section: "1-bo'lim: Kirish va sozlash",
}

export default function Lesson02LoyihaYaratish() {
  return (
    <>
      <p>
        Oldingi darsda Supabase nima ekanini va biz nima quramizligimizni ko'rdik. Endi amaliy
        qadamga o'tamiz: Supabase'da hisob (account) ochamiz va "Vazifalar boshqaruvchisi"
        loyihamiz uchun birinchi Supabase loyihasini yaratamiz.
      </p>

      <h2>1. Ro'yxatdan o'tish</h2>
      <p>
        Brauzeringizda{' '}
        <a
          href="https://supabase.com"
          target="_blank"
          rel="noreferrer"
          className="text-brand-600 underline"
        >
          supabase.com
        </a>{' '}
        saytiga o'ting va o'ng yuqori burchakdagi <strong>"Start your project"</strong> yoki{' '}
        <strong>"Sign up"</strong> tugmasini bosing. Eng qulay yo'l — GitHub hisobingiz orqali
        kirish: bitta tugma bosilishi bilan hisob yaratiladi va qo'shimcha parol o'ylab
        topishning hojati qolmaydi. Xohlasangiz, oddiy email va parol bilan ham ro'yxatdan
        o'tishingiz mumkin.
      </p>
      <Callout type="tip" title="Bepul reja yetarli">
        Supabase'ning <strong>Free (bepul)</strong> rejasi shu kurs uchun to'liq yetarli: 2 tagacha
        faol loyiha, 500 MB ma'lumotlar bazasi, 1 GB fayl saqlash joyi va cheksiz API so'rovlar
        beriladi. Kredit karta raqami talab qilinmaydi.
      </Callout>

      <h2>2. Yangi tashkilot (Organization)</h2>
      <p>
        Birinchi marta kirganingizda, Supabase sizdan <strong>Organization (tashkilot)</strong>{' '}
        yaratishni so'raydi. Tashkilot — bir nechta loyihalarni birlashtiradigan yuqori darajadagi
        guruh (masalan, kompaniyangiz yoki shaxsiy hisobingiz nomi). Shaxsiy o'quv loyihalari
        uchun o'zingizning ismingiz yoki "Personal" kabi nom bilan bitta tashkilot yaratishingiz
        kifoya — reja sifatida <strong>Free</strong>ni tanlang.
      </p>

      <h2>3. Yangi loyiha yaratish (New Project)</h2>
      <p>
        Tashkilot ichida <strong>"New Project"</strong> tugmasini bosing. Ochilgan formada uchta
        muhim maydonni to'ldirishingiz kerak bo'ladi:
      </p>
      <ul>
        <li>
          <strong>Name (loyiha nomi)</strong> — loyihangizga nom bering, masalan{' '}
          <code>vazifalar-boshqaruvchisi</code>. Bu nom faqat Supabase Dashboard'ida ko'rinadi,
          keyinchalik uni istalgan vaqt o'zgartirish mumkin.
        </li>
        <li>
          <strong>Database Password (ma'lumotlar bazasi paroli)</strong> — bu eng muhim maydon.
          Supabase avtomatik ravishda kuchli parol taklif qiladi (yashil "Generate a password"
          tugmasi) — shundan foydalaning. Bu parol to'g'ridan-to'g'ri Postgres ma'lumotlar
          bazangizga kirish uchun ishlatiladi.
        </li>
        <li>
          <strong>Region (mintaqa)</strong> — ma'lumotlar bazangiz jismonan qaysi serverda
          joylashishini tanlaysiz. O'zingizga eng yaqin mintaqani tanlang — bu ilovangizning
          tezligiga (latency, javob berish tezligiga) to'g'ridan-to'g'ri ta'sir qiladi:
          ma'lumotlar bazasi qanchalik yaqin bo'lsa, so'rovlar shunchalik tez qaytadi.
        </li>
      </ul>

      <Callout type="warning" title="Parolni albatta saqlang!">
        Database Password'ni yaratilgan zahoti xavfsiz joyga (parol menejeri, shifrlangan
        eslatma va h.k.) nusxalab saqlab qo'ying. Bu parol faqat bir marta to'liq ko'rinishda
        ko'rsatiladi — keyinchalik uni Dashboard'dan qayta ko'rish imkoni yo'q, faqat{' '}
        <strong>qayta o'rnatish (reset)</strong> mumkin. Bu parol keyingi darslarda kerak
        bo'lmaydi (chunki biz Table Editor va SQL Editor'dan foydalanamiz, to'g'ridan-to'g'ri
        ulanish emas), lekin uni yo'qotib qo'ymaslik — yaxshi odat.
      </Callout>

      <p>
        Barcha maydonlarni to'ldirgach, <strong>"Create new project"</strong> tugmasini bosing.
        Supabase orqa fonda sizga alohida Postgres ma'lumotlar bazasi va serverlarni tayyorlaydi
        — bu jarayon odatda bir necha daqiqa davom etadi. Tayyor bo'lganda, avtomatik ravishda
        loyihangizning Dashboard sahifasiga yo'naltirilasiz.
      </p>

      <h2>Nega region tanlash muhim?</h2>
      <p>
        Har bir so'rov (masalan, vazifalar ro'yxatini yuklash) frontenddan ma'lumotlar bazasi
        joylashgan serverga borib qaytishi kerak. Agar siz Toshkentda bo'lib, ma'lumotlar bazangiz
        AQSh g'arbida joylashgan bo'lsa, har bir so'rov ortiqcha yuz millisekundlarni yo'qotishi
        mumkin. O'quv loyihasi uchun bu katta muammo emas, lekin real ilovada foydalanuvchilaringiz
        qayerda ko'proq joylashgan bo'lsa, mintaqani o'shanga yaqinroq tanlash — yaxshi amaliyot
        hisoblanadi.
      </p>

      <Quiz
        question="Database Password haqida qaysi tasdiq to'g'ri?"
        options={[
          "Bu parolni istalgan vaqt Dashboard'da to'liq holda qayta ko'rish mumkin",
          "Bu parol faqat frontend kodida ishlatiladi, uni saqlashning hojati yo'q",
          "Bu parol yaratilgan zahoti saqlab qo'yish kerak, chunki keyinroq to'liq holda qayta ko'rsatilmaydi (faqat reset qilish mumkin)",
          "Bu parol loyiha nomi bilan avtomatik bir xil bo'ladi",
        ]}
        correctIndex={2}
        explanation="Supabase database parolini faqat yaratilgan paytda bir marta to'liq ko'rsatadi. Keyinchalik uni Dashboard orqali qayta ko'rish imkoni yo'q — faqat yangi parol bilan reset qilish mumkin, shuning uchun uni darhol xavfsiz joyga saqlab qo'yish kerak."
      />

      <Exercise title="Amaliy mashq: Supabase loyihasini yaratish">
        <p>
          Supabase'da hisob oching (agar hali ochmagan bo'lsangiz) va quyidagi qadamlarni
          bajaring:
        </p>
        <ol>
          <li>
            <code>supabase.com</code> saytida GitHub yoki email orqali ro'yxatdan o'ting.
          </li>
          <li>Shaxsiy tashkilot (Organization) yarating, reja sifatida Free'ni tanlang.</li>
          <li>
            Nomi <code>vazifalar-boshqaruvchisi</code> bo'lgan yangi loyiha yarating — parolni
            "Generate a password" orqali hosil qiling va darhol xavfsiz joyga saqlang.
          </li>
          <li>O'zingizga eng yaqin mintaqani (region) tanlang.</li>
          <li>Loyiha tayyor bo'lguncha kuting va Dashboard sahifasi ochilishini kuzating.</li>
        </ol>
        <Solution>
          <p>
            To'g'ri bajarilgan bo'lsa, Supabase Dashboard'ida chap tomonda loyihangiz nomi
            (masalan, <code>vazifalar-boshqaruvchisi</code>) ko'rinadi, va asosiy sahifada
            "Project is ready" yoki shunga o'xshash muvaffaqiyat xabari chiqadi. Database
            parolingiz xavfsiz joyda (parol menejerida yoki shifrlangan eslatmada) saqlanган
            bo'lishi kerak (parol menejerda yoki shifrlangan eslatmada) — Dashboard'dan uni endi
            qayta ko'ra olmaysiz.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Supabase'da hisob ochish GitHub orqali bir tugma bosish bilan yoki email/parol orqali
          amalga oshiriladi, va bepul reja bu kurs uchun to'liq yetarli.
        </li>
        <li>
          Yangi loyiha yaratishda uchta muhim maydon: loyiha nomi, database paroli va region
          (mintaqa).
        </li>
        <li>
          Database parolini "Generate a password" orqali hosil qilib, uni darhol xavfsiz joyga
          saqlash shart — keyinroq to'liq holda qayta ko'rsatilmaydi.
        </li>
        <li>
          Region — ma'lumotlar bazangiz jismonan joylashgan server; o'zingizga yaqin mintaqani
          tanlash so'rovlar tezligiga ijobiy ta'sir qiladi.
        </li>
        <li>
          Loyiha yaratilgach, Supabase orqa fonda Postgres ma'lumotlar bazasini bir necha
          daqiqada tayyorlaydi va sizni Dashboard'ga yo'naltiradi.
        </li>
      </KeyPoints>
    </>
  )
}
