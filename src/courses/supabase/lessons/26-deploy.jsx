import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Loyihani joylashtirish",
  section: "8-bo'lim: Yakuniy loyiha",
}

export default function Lesson26Deploy() {
  return (
    <>
      <p>
        Hozirgacha "Vazifalar boshqaruvchisi" faqat bitta joyda — <code>localhost:5173</code>{' '}
        manzilida, sizning kompyuteringizda ishlab turibdi. Boshqa hech kim unga kira olmaydi.
        Loyihani haqiqiy foydalanuvchilarga ko'rsatish uchun uni internetga{' '}
        <strong>joylashtirish (deploy)</strong> kerak. Bu darsda buni qadam-baqadam bajaramiz —
        va bu jarayonda ko'pchilik boshlovchilar duch keladigan bitta muhim tuzoqni ham
        ko'rsatamiz.
      </p>

      <h2>1. Production build yaratish</h2>
      <p>
        <code>npm run dev</code> — faqat development uchun, u kodni tez qayta yuklash
        (hot reload) uchun optimallashtirilgan, lekin production uchun mos emas: fayllar
        siqilmagan, kod bo'lib-bo'lib yuklanmaydi (code splitting yo'q). Production uchun
        maxsus buyruq bor:
      </p>
      <CodeBlock lang="bash">{`npm run build`}</CodeBlock>
      <p>
        Bu buyruq Vite'ga butun loyihani siqilgan, optimallashtirilgan HTML/CSS/JS fayllar
        to'plamiga aylantirishni buyuradi va natijani <code>dist/</code> nomli papkaga yozadi.
        Aynan shu <code>dist/</code> papka — statik fayllar to'plami sifatida — istalgan
        hosting xizmatiga yuklanadi.
      </p>
      <p>
        Natijani mahalliy tekshirib ko'rish uchun (ixtiyoriy, lekin foydali):
      </p>
      <CodeBlock lang="bash">{`npm run preview`}</CodeBlock>
      <p>
        Bu buyruq <code>dist/</code> papkasini lokal serverda ko'tarib, production
        build'ning aynan qanday ishlashini ko'rsatadi — <code>npm run dev</code>dan farqli
        o'laroq, bu haqiqiy production fayllarni ishlatadi.
      </p>

      <h2>2. Hosting xizmatini tanlash: Cloudflare Pages yoki Netlify</h2>
      <p>
        Ikkalasi ham React kabi statik-build ilovalar uchun bepul darajasi (free tier) bilan
        keladi, GitHub repozitoriyasiga ulanganda har bir <code>push</code>'da avtomatik
        qayta joylashtiradi (CI/CD), va sozlash jarayoni deyarli bir xil:
      </p>
      <ol>
        <li>Loyihangizni GitHub'ga yuklang (agar hali qilmagan bo'lsangiz).</li>
        <li>
          Cloudflare Pages yoki Netlify dashboard'ida "yangi loyiha" / "import project"ni
          tanlab, GitHub repozitoriyangizni ulang.
        </li>
        <li>
          <strong>Build command</strong> maydoniga: <code>npm run build</code>
        </li>
        <li>
          <strong>Build output directory</strong> (yoki "Publish directory") maydoniga:{' '}
          <code>dist</code>
        </li>
      </ol>
      <p>
        Shu ikkita sozlama — build buyrug'i va chiqish papkasi — istalgan statik hosting
        xizmatida so'raladigan asosiy ma'lumot. Hosting xizmati har safar sizning kodingizni
        oladi, ko'rsatilgan buyruqni bajaradi, va natijaviy papkani internetga chiqaradi.
      </p>

      <h2>3. Muhit o'zgaruvchilarini (env vars) hostda sozlash</h2>
      <p>
        <code>.env</code> fayli — <code>.gitignore</code>'ga kirgani uchun GitHub'ga
        yuklanmaydi. Bu to'g'ri xatti-harakat (maxfiy qiymatlarni repozitoriyaga qo'shmaslik
        kerak), lekin buning natijasida hosting serveri sizning{' '}
        <code>VITE_SUPABASE_URL</code> va <code>VITE_SUPABASE_ANON_KEY</code>{' '}
        qiymatlaringizni bilmaydi. Shuning uchun ularni hosting dashboard'ida qo'lda kiritish
        kerak — odatda "Environment variables" yoki "Build settings" bo'limida:
      </p>
      <CodeBlock lang="env">{`VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxxxxxxxxxxxxxxxxxx...`}</CodeBlock>
      <p>
        Bu qiymatlar aynan <code>.env</code> faylidagi bilan bir xil bo'lishi kerak — ularni
        Supabase dashboard'idagi <strong>Project Settings → API</strong> bo'limidan qayta
        nusxalab olishingiz mumkin. Sozlagach, hosting xizmati keyingi build'da bu
        o'zgaruvchilarni <code>import.meta.env</code> orqali kodga singdiradi.
      </p>

      <Callout type="note" title="Nega .env fayl o'zi yuklanmaydi?">
        Vite build vaqtida <code>VITE_</code> prefiksli o'zgaruvchilarni to'g'ridan-to'g'ri
        JavaScript kodiga "yozib qo'yadi" (bundle qiladi) — bu qiymatlar keyinchalik server
        emas, balki build jarayonida kerak bo'ladi. Shuning uchun ularni hosting
        provider'ining o'zida, build boshlanishidan oldin sozlash kerak: build shu
        qiymatlarni o'qib, natijaviy JS fayllar ichiga joylashtiradi.
      </Callout>

      <h2>4. Unutiladigan qadam: Supabase Auth URL sozlamalarini yangilash</h2>
      <p>
        Loyiha muvaffaqiyatli joylashtirildi, sayt ochiladi — lekin birdan email/parol yoki
        Google orqali kirish ishlamay qoladi, xatolik esa faqat production'da paydo bo'ladi.
        Sababi deyarli har doim bitta: Supabase va Google Cloud hali ham faqat{' '}
        <code>localhost</code>ni "ishonchli" domen deb bilishadi.
      </p>

      <Callout type="warning" title="#1 tuzoq: lokal ishlaydi, productionda buziladi">
        Bu — boshlovchilar orasida eng ko'p uchraydigan deploy xatosi. Ilova frontend
        jihatidan mutlaqo to'g'ri yozilgan bo'lishi mumkin, lekin auth muvaffaqiyatsiz
        tugaydi, chunki Supabase va Google sizning yangi production domeningizni hali
        tanimaydi. Bu — kod xatosi emas, sozlama xatosi, va uni faqat dashboard'larda
        tuzatish mumkin.
      </Callout>

      <p>Ikkita joyni yangilash kerak:</p>

      <h3>4a. Supabase Dashboard → Authentication → URL Configuration</h3>
      <ol>
        <li>
          <strong>Site URL</strong> maydonini <code>http://localhost:5173</code>dan yangi
          production manzilingizga (masalan,{' '}
          <code>https://vazifalar-boshqaruvchisi.pages.dev</code>) almashtiring.
        </li>
        <li>
          <strong>Redirect URLs</strong> ro'yxatiga production domeningizni qo'shing (eski{' '}
          <code>localhost</code> yozuvini development uchun qoldirsangiz ham bo'ladi) — bu
          Supabase email tasdiqlash havolasi yoki OAuth login'dan keyin foydalanuvchini qayerga
          qaytarishini belgilaydi.
        </li>
      </ol>

      <h3>4b. Google Cloud Console → OAuth client sozlamalari</h3>
      <p>
        Agar Google orqali kirishni ulagan bo'lsangiz (17-darsda ko'rgan edik), Google Cloud
        Console'dagi OAuth client'ning{' '}
        <strong>Authorized redirect URIs</strong> ro'yxati ham{' '}
        <code>https://&lt;project-ref&gt;.supabase.co/auth/v1/callback</code> manzilini allaqachon
        o'z ichiga oladi — bu manzil o'zgarmaydi, chunki OAuth oqimi har doim Supabase orqali
        o'tadi, to'g'ridan-to'g'ri sizning saytingizga emas. Shunga qaramay,{' '}
        <strong>Authorized JavaScript origins</strong> ro'yxatiga yangi production domeningizni
        qo'shishni unutmang — aks holda Google brauzerdan kelayotgan so'rovni "ishonchsiz manba"
        deb rad etishi mumkin.
      </p>

      <Callout type="tip" title="Tekshirish tartibi">
        Deploy qilgach, avval production saytida yangi akkaunt bilan ro'yxatdan o'tishni sinab
        ko'ring, keyin Google orqali kirishni sinang. Agar xatolik chiqsa — brauzer konsolidagi
        xabarni o'qing: odatda u aynan qaysi redirect URL mos kelmayotganini ko'rsatadi.
      </Callout>

      <Quiz
        question="Ilova localhost'da mukammal ishlaydi, lekin production domenida email/parol bilan kirishga urinilganda xatolik chiqadi. Eng ehtimolli sabab nima?"
        options={[
          "npm run build buyrug'i xato ishlagan va JavaScript kodi buzilgan",
          "Supabase Authentication → URL Configuration bo'limidagi Site URL/Redirect URLs hali production domenini o'z ichiga olmaydi",
          "Tailwind CSS production build'da ishlamaydi",
          "tasks jadvalidagi RLS policy'lar production'da avtomatik o'chib qoladi",
        ]}
        correctIndex={1}
        explanation="Bu klassik 'lokal ishlaydi, productionda buziladi' auth muammosi — Supabase (va Google OAuth ishlatilsa, Google Cloud) hali faqat localhost'ni ishonchli manzil deb biladi. Yangi production domenini Site URL/Redirect URLs va OAuth client sozlamalariga qo'shish kerak."
      />

      <Exercise title="Amaliy mashq: Joylashtirish uchun tekshiruv ro'yxati">
        <p>
          "Vazifalar boshqaruvchisi"ni Cloudflare Pages yoki Netlify'ga joylashtirish uchun
          bajarishingiz kerak bo'lgan barcha qadamlarni tartib bilan yozing — mahalliy
          build'dan tortib, auth sozlamalarigacha.
        </p>
        <Solution>
          <ol>
            <li>
              <code>npm run build</code> — <code>dist/</code> papkasini yaratish (ixtiyoriy:{' '}
              <code>npm run preview</code> bilan lokal tekshirish).
            </li>
            <li>Loyihani GitHub'ga push qilish.</li>
            <li>
              Cloudflare Pages yoki Netlify'da repozitoriyani ulash: build command{' '}
              <code>npm run build</code>, output directory <code>dist</code>.
            </li>
            <li>
              Hosting dashboard'ida <code>VITE_SUPABASE_URL</code> va{' '}
              <code>VITE_SUPABASE_ANON_KEY</code>ni environment variable sifatida kiritish.
            </li>
            <li>
              Supabase Dashboard → Authentication → URL Configuration'da Site URL va Redirect
              URLs'ni yangi production domeni bilan yangilash.
            </li>
            <li>
              Google OAuth ishlatilgan bo'lsa, Google Cloud Console'dagi Authorized JavaScript
              origins ro'yxatiga production domenini qo'shish.
            </li>
            <li>
              Production saytida ro'yxatdan o'tish, kirish va Google orqali kirishni qo'lda
              sinab ko'rish.
            </li>
          </ol>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>npm run build</code> — production uchun optimallashtirilgan statik fayllarni{' '}
          <code>dist/</code> papkasiga yig'adi; aynan shu papka hostinga yuklanadi.
        </li>
        <li>
          Cloudflare Pages va Netlify'da sozlash bir xil: build command{' '}
          <code>npm run build</code>, output directory <code>dist</code>.
        </li>
        <li>
          <code>.env</code> fayli repozitoriyaga yuklanmagani uchun{' '}
          <code>VITE_SUPABASE_URL</code>/<code>VITE_SUPABASE_ANON_KEY</code>ni hosting
          dashboard'ida environment variable sifatida qo'lda kiritish kerak.
        </li>
        <li>
          Eng ko'p uchraydigan production auth xatosi — Supabase'ning Site URL/Redirect URLs
          va Google Cloud'ning Authorized origins hali yangi domenni bilmasligi.
        </li>
        <li>
          Deploy'dan keyin har doim production saytida ro'yxatdan o'tish va kirishni qo'lda
          sinab ko'ring — bu xatolarni foydalanuvchilar topishidan oldin aniqlash imkonini
          beradi.
        </li>
      </KeyPoints>
    </>
  )
}
