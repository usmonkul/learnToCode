import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Google orqali kirish (OAuth)",
  section: "5-bo'lim: Autentifikatsiya",
}

export default function Lesson17GoogleOrqaliKirish() {
  return (
    <>
      <p>
        Email va parol bilan kirish ishlaydi, lekin ko'p ilovalarda foydalanuvchilar yana bitta parolni eslab qolishni xohlamaydi — ular "Google bilan kirish" tugmasini afzal ko'rishadi. Bu — <strong>OAuth</strong> deb ataladigan protokol orqali amalga oshiriladi: foydalanuvchi sizning ilovangizga to'g'ridan-to'g'ri parol bermaydi, buning o'rniga Google orqali tasdiqlanadi va Google sizning ilovangizga "bu foydalanuvchi haqiqiy" degan tasdiqni yuboradi.
      </p>
      <p>
        Supabase OAuth'ni juda soddalashtirgan — lekin uni ishga tushirish uchun avval Google tomonida "credentials" (ilova identifikatorlari) yaratishimiz kerak. Bu dars ikki qismdan iborat: avval Google Cloud Console va Supabase Dashboard'da qo'lda sozlash, so'ng bittagina qator kod.
      </p>

      <h2>1-qism: Google Cloud Console'da sozlash</h2>
      <p>
        Bu bosqichlarning barchasi brauzerda, kod yozmasdan bajariladi. Diqqat bilan, ketma-ket bajaring — bitta noto'g'ri manzil butun sozlamani ishlamay qo'yishi mumkin.
      </p>
      <ol>
        <li>
          <a href="https://console.cloud.google.com" target="_blank" rel="noreferrer" className="text-brand-600 underline">
            console.cloud.google.com
          </a> manziliga o'ting va Google hisobingiz bilan kiring.
        </li>
        <li>
          Yuqori chap burchakdagi loyiha tanlovchidan (project selector) yangi loyiha yarating (<strong>New Project</strong>) yoki mavjud loyihani tanlang. Loyihaga istalgan nom bering, masalan <code>vazifalar-boshqaruvchisi</code>.
        </li>
        <li>
          Chap tomondagi menyudan <strong>APIs & Services → Credentials</strong> bo'limiga o'ting.
        </li>
        <li>
          Agar bu birinchi marta bo'lsa, avval <strong>OAuth consent screen</strong>ni sozlashingiz so'raladi — foydalanuvchi turi sifatida <strong>External</strong>ni tanlang, ilova nomi va o'z emailingizni kiritib, saqlang (test rejimida qolsa ham bo'ladi, keyinroq o'zgartirish mumkin).
        </li>
        <li>
          <strong>Credentials</strong> sahifasida <strong>+ Create Credentials → OAuth client ID</strong>ni bosing. Application type sifatida <strong>Web application</strong>ni tanlang.
        </li>
        <li>
          <strong>Authorized redirect URIs</strong> bo'limiga Supabase bergan qaytish manzilini qo'shishingiz kerak. Bu manzilni Supabase Dashboard'ning <strong>Authentication → Providers → Google</strong> sahifasida topasiz — u har doim quyidagi ko'rinishda bo'ladi (o'z loyiha referensingizni qo'ying):
        </li>
      </ol>
      <CodeBlock lang="text">{`https://<project-ref>.supabase.co/auth/v1/callback`}</CodeBlock>
      <ol start={7}>
        <li>
          <strong>Create</strong>ni bosing. Google sizga ikkita qiymat ko'rsatadi: <strong>Client ID</strong> va <strong>Client Secret</strong>. Ularni nusxalab, xavfsiz joyda saqlang — Client Secret'ni hech qachon frontend kodiga yoki public repository'ga qo'ymang.
        </li>
      </ol>

      <Callout type="warning" title="Eng ko'p uchraydigan xato: redirect URI mos kelmasligi">
        Google OAuth sozlashda eng ko'p uchraydigan muammo — <strong>redirect URI mismatch</strong> xatosi. Bu Google'dagi "Authorized redirect URIs"ga kiritilgan manzil Supabase kutgan manzil bilan <em>harfma-harf</em> mos kelmasa yuz beradi (masalan, oxiridagi <code>/</code> belgisi qo'shilib yoki tushib qolsa, yoki <code>http</code> o'rniga <code>https</code> yozilmasa). Manzilni qo'lda yozish o'rniga har doim Supabase Dashboard'dagi Google provider sahifasidan to'g'ridan-to'g'ri nusxalab oling — bu xatoning eng ishonchli oldini olish usuli.
      </Callout>

      <h2>2-qism: Supabase Dashboard'da yoqish</h2>
      <ol>
        <li>
          Supabase loyihangizda <strong>Authentication → Providers</strong> bo'limiga o'ting va ro'yxatdan <strong>Google</strong>ni toping.
        </li>
        <li>
          Uni yoqing (toggle) va Google'dan olgan <strong>Client ID</strong> hamda <strong>Client Secret</strong>ni tegishli maydonlarga joylashtiring.
        </li>
        <li>
          <strong>Save</strong>ni bosing. Shu bilan Google provider loyihangiz uchun faollashadi.
        </li>
      </ol>

      <h2>3-qism: Frontend'ga tugma qo'shish</h2>
      <p>
        Dashboard tomoni sozlangach, kod tomoni ajablanarli darajada oddiy. <code>AuthForm.jsx</code>ga yana bitta funksiya qo'shamiz:
      </p>
      <CodeBlock lang="jsx">{`// AuthForm.jsx ichida, handleSignIn yonida:
async function handleGoogleSignIn() {
  const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
  if (error) console.error(error)
}`}</CodeBlock>
      <p>
        Va formaning ostiga tugma qo'shamiz:
      </p>
      <CodeBlock lang="jsx">{`<button onClick={handleGoogleSignIn} className="rounded-md border border-gray-300 px-4 py-2 font-medium hover:bg-gray-50">
  Google bilan kirish
</button>`}</CodeBlock>
      <p>
        <code>signInWithOAuth({'{ provider: "google" }'})</code> chaqirilganda Supabase foydalanuvchini avtomatik ravishda Google'ning kirish sahifasiga yo'naltiradi (redirect). Foydalanuvchi o'z Google hisobi bilan tasdiqlagach, Google uni yuqorida sozlagan <code>.../auth/v1/callback</code> manziliga qaytaradi, Supabase esa sessiya yaratib, foydalanuvchini sizning ilovangizga qaytarib yuboradi. Bu butun jarayon — bir nechta sahifa almashinuvi — sizning kodingizda hech qanday qo'shimcha yozuvsiz avtomatik ishlaydi.
      </p>
      <p>
        Eng muhimi: 16-darsda yozgan <code>onAuthStateChange</code> tinglovchisi Google orqali kirishni ham xuddi email/parol orqali kirishdek "eshitadi" va <code>session</code> state'ini xuddi shunday yangilaydi. Ya'ni <code>App.jsx</code>ga bu dars uchun hech qanday o'zgarish kiritish shart emas — u allaqachon har qanday kirish usulini qo'llab-quvvatlaydi.
      </p>

      <Quiz
        question="Google OAuth sozlashda 'redirect URI mismatch' xatosi odatda nima sababdan yuz beradi?"
        options={[
          "Client Secret noto'g'ri nusxalanganda",
          "Google Cloud Console'dagi Authorized redirect URI Supabase kutgan manzil bilan aniq mos kelmaganda",
          "signInWithOAuth funksiyasida provider nomi xato yozilganda",
          "OAuth consent screen sozlanmaganda",
        ]}
        correctIndex={1}
        explanation="Redirect URI mismatch — Google Cloud Console'da kiritilgan Authorized redirect URI Supabase'ning kutgan https://<project-ref>.supabase.co/auth/v1/callback manzili bilan harfma-harf mos kelmaganda yuzaga keladi. Eng ishonchli yechim — manzilni Supabase Dashboard'dan to'g'ridan-to'g'ri nusxalab olish."
      />

      <Callout type="tip" title="App.jsx'ga tegish shart emas">
        Chunki <code>onAuthStateChange</code> allaqachon barcha auth hodisalarini kuzatib boradi, Google orqali kirishni qo'shish uchun <code>App.jsx</code>da bitta qatorni ham o'zgartirish shart emas — bu autentifikatsiyani <code>AuthForm</code>dan alohida ajratib qo'yishning aynan qulayligi.
      </Callout>

      <KeyPoints>
        <li>
          OAuth orqali kirish uchun avval Google Cloud Console'da OAuth client ID (Web application turi) yaratish va Authorized redirect URI sifatida Supabase'ning <code>.../auth/v1/callback</code> manzilini qo'shish kerak.
        </li>
        <li>
          Client ID va Client Secret Supabase Dashboard'ning Authentication → Providers → Google bo'limiga kiritiladi va provider yoqiladi.
        </li>
        <li>
          Eng ko'p uchraydigan xato — redirect URI mismatch; manzilni har doim Supabase Dashboard'dan nusxalab olish kerak, qo'lda yozmaslik kerak.
        </li>
        <li>
          Frontend tomonda faqat <code>supabase.auth.signInWithOAuth({'{ provider: "google" }'})</code> chaqirilishi kifoya — qolgan hamma narsani Supabase o'zi boshqaradi.
        </li>
        <li>
          <code>onAuthStateChange</code> allaqachon barcha kirish usullarini qamrab olganligi sababli <code>App.jsx</code>ga qo'shimcha o'zgartirish kerak emas.
        </li>
      </KeyPoints>
    </>
  )
}
