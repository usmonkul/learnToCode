import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'GitHub nima?',
  section: 'Modul 1. GitHub bilan tanishish',
}

export default function Lesson01GitHubNima() {
  return (
    <>
      <h2>GitHub nima?</h2>
      <p>
        <strong>GitHub</strong> — bu dasturchilar uchun mo'ljallangan dunyodagi eng katta bulutli (cloud) platforma va ijtimoy tarmoqdir. U millionlab dasturchilarga o'z loyihalari kodini xavfsiz saqlash, o'zgarishlar tarixini kuzatib borish va boshqa dasturchilar bilan birgalikda jamoaviy ishlash imkonini beradi.
      </p>
      <p>
        Oddiyroq aytganda, GitHub'ni <em>"dasturchilarning Google Drive'i yoki Instagram'i"</em> deb tasavvur qilish mumkin. Faqat bu yerda rasm yoki fayl o'rniga kod va loyihalar ulashiladi.
      </p>

      <Callout type="note" title="Muhim tushuncha">
        Ko'pchilik Git va GitHub'ni bitta narsa deb o'ylaydi. Aslida:
        <br />
        <strong>Git</strong> — bu kompyuteringizda ishlaydigan version control (versiyalarni boshqarish) dasturi.
        <br />
        <strong>GitHub</strong> — bu Git repository (ombor) larini internetda saqlash va boshqalar bilan bo'lishish uchun mo'ljallangan onlayn platforma.
      </Callout>

      <h2>GitHub nima uchun kerak?</h2>
      <p>
        Zamonaviy dasturlashda GitHub'siz ishlashni tasavvur qilib bo'lmaydi. U quyidagi asosiy muammolarni hal qiladi:
      </p>
      <ul>
        <li>
          <strong>Kodni xavfsiz saqlash (Backup):</strong> Kompyuteringiz buzilsa yoki yo'qolsa ham, loyihangiz kodi GitHub serverlarida xavfsiz saqlanib qoladi.
        </li>
        <li>
          <strong>O'zgarishlar tarixi:</strong> Loyihaning 1 yil oldingi yoki kechagi holatiga osongina qaytishingiz va kim, qachon, qaysi qator kodni o'zgartirganini aniq ko'rishingiz mumkin.
        </li>
        <li>
          <strong>Jamoaviy ishlash (Collaboration):</strong> Bir nechta dasturchi bitta loyiha ustida bir vaqtning o'zida bir-biriga xalaqit bermasdan ishlashi mumkin.
        </li>
        <li>
          <strong>Dasturchi portfoliosi:</strong> Ishga topshirayotganingizda HR va Senior dasturchilar rezyumengizdan ko'ra GitHub profilingizga ko me'moriy baho berishadi.
        </li>
      </ul>

      <h2>GitHub va oddiy fayl saqlash o'rtasidagi farq</h2>
      <p>
        Ko'pchilik yangi boshlovchilar: <em>"Loyiha kodini Telegram'da yuborsam yoki Google Drive'ga yuklasam bo'lmaydimi?"</em> deb so'rashadi. Keling, farqini solishtiramiz:
      </p>

      <table className="my-4 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-canvas-muted">
            <th className="p-3 font-semibold text-ink">Xususiyat</th>
            <th className="p-3 font-semibold text-ink">Oddiy fayl saqlash (Google Drive / Zip)</th>
            <th className="p-3 font-semibold text-ink">GitHub</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">Versiyalar berish</td>
            <td className="p-3 text-ink-muted"><code>project_v1.zip</code>, <code>project_final_v2.zip</code> kaos hosil bo'ladi</td>
            <td className="p-3 text-ink-muted">Har bir commit aniq versiya va izoh bilan tartibli saqlanadi</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">Birga ishlash</td>
            <td className="p-3 text-ink-muted">2 kishi bir faylni o'zgartirsa, birining kodi o'chib ketadi</td>
            <td className="p-3 text-ink-muted">O'zgarishlar avtomatik birlashtiriladi (Merge)</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">Farqlarni ko'rish</td>
            <td className="p-3 text-ink-muted">Aynan qaysi belgi yoki qator o'zgarganini ko'rib bo'lmaydi</td>
            <td className="p-3 text-ink-muted">Qizil va yashil ranglarda har bir qator diff ko'rinadi</td>
          </tr>
        </tbody>
      </table>

      <Quiz
        question="Oddiy fayl saqlash xizmatlariga (masalan Google Drive) nisbatan GitHub'ning eng katta afzalligi nimada?"
        options={[
          'Fayllarni tezroq yuklab olish imkoniyati',
          'Koddagi har bir o\'zgarishlar tarixini va muallifini aniq kuzatish hamda jamoaviy ishlash',
          'Cheksiz miqdorda video va rasmlar saqlash',
          'Kodni avtomatik ravishda xatosiz yozib berishi',
        ]}
        correctIndex={1}
        explanation="GitHub aynan Git versiyalarni boshqarish tizimi bilan integratsiyalashgan bo'lib, har bir o'zgarish tarixi, muallifi va jamoaviy ishlash imkoniyatlarini taqdim etadi."
      />

      <h2>Developer GitHub'dan qanday foydalanadi?</h2>
      <p>
        Kunlik ish faoliyatida dasturchi GitHub'dan quyidagi maqsadlarda foydalanadi:
      </p>
      <ul>
        <li><strong>Repositories (Repository'lar):</strong> O'zining va jamoasining loyihalarini saqlaydi.</li>
        <li><strong>Pull Requests (PR):</strong> Yozgan kodini asosiy loyihaga qo'shishdan oldin jamoadoshlariga ko'rsatib, code review (kod ko'rigi) dan o'tkazadi.</li>
        <li><strong>Issues:</strong> Loyihadagi xatoliklar (bug) va yangi funksiyalarni (feature) ro'yxatga oladi va vazifalarni taqsimlaydi.</li>
        <li><strong>GitHub Actions:</strong> Kodingizni avtomatik ravishda testdan o'tkazish va serverga joylash (CI/CD).</li>
      </ul>

      <h2>Open Source (Ochiq kodli dasturiy ta'minot) tushunchasi</h2>
      <p>
        <strong>Open Source</strong> — bu kodi hamma uchun ochiq bo'lgan dasturlardir. Istalgan kishi bu kodni ko'rishi, o'rganishi, o'zgartirishi va takomillashtirish uchun taklif berishi mumkin.
      </p>
      <p>
        Masalan: <strong>Linux</strong> operatsion tizimi, <strong>Python</strong> dasturlash tili, <strong>React</strong> va <strong>Vue.js</strong> kabi mashhur kutubxonalar va freymvorklar — barchasi Open Source loyihalar bo'lib, GitHub'da ochiq saqlanadi.
      </p>

      <Callout type="tip" title="Open Source maslahat">
        Siz ham boshqa dasturchilarning ochiq kodli loyihalarini o'rganish orqali tajribangizni juda tez oshirishingiz va dunyo miqyosidagi loyihalarga o'z hissangizni (contribution) qo'shishingiz mumkin.
      </Callout>

      <Quiz
        question="Open Source loyiha nima?"
        options={[
          'Faqat pullik obuna orqali ishlatiladigan dastur',
          'Manba kodi ochiq bo\'lgan, har kim ko\'rishi va rivojlantirishi mumkin bo\'lgan dastur',
          'Faqat GitHub kompaniyasi tomonidan yozilgan loyihalar',
          'Faqat bitta dasturchi tomonidan yaratilgan shaxsiy proekt',
        ]}
        correctIndex={1}
        explanation="Open Source — bu kodi barcha uchun ochiq bo'lgan, hamjamiyat tomonidan birgalikda rivojlantiriladigan dasturiy ta'minotdir."
      />

      <Exercise title="Kichik mashq: GitHub account ochish va profilni sozlash">
        <p>
          Ushbu mashqni bajarish uchun quyidagi qadamlarni ketma-ket amalga oshiring:
        </p>
        <ol>
          <li><a href="https://github.com" target="_blank" rel="noreferrer" className="text-brand-600 underline">github.com</a> saytiga kiring.</li>
          <li><strong>Sign up</strong> tugmasini bosing va emailingiz orqali ro'yxatdan o'ting.</li>
          <li>Foydalanuvchi nomingizni (username) professional tanlang (masalan: <code>ali-valiyev</code> yoki <code>alivaliyev-dev</code>).</li>
          <li>Profil sozlamalariga kirib (Settings → Profile), o'zingiz haqingizda qisqacha ma'lumot (Bio) va rasm (Avatar) qo'ying.</li>
        </ol>
        <Solution>
          <p>
            Muvaffaqiyatli ro'yxatdan o'tganingizdan so'ng, profilingiz havolasi <code>https://github.com/sizning-username</code> ko'rinishida bo'ladi. Profildagi rasm va bio dasturchi sifatida dastlabki taassurotni shakllantiradi!
          </p>
        </Solution>
      </Exercise>

      <Exercise title="Challenge: 3 ta mashhur developer repository'sini topish">
        <p>
          GitHub search (qidiruv) bo'limidan foydalanib, quyidagi 3 ta mashhur ochiq kodli loyihani toping va ularning sahifasiga kiring:
        </p>
        <ul>
          <li><code>facebook/react</code></li>
          <li><code>python/cpython</code></li>
          <li><code>torvalds/linux</code></li>
        </ul>
        <p>
          Har bir repository'da qancha <strong>Star</strong> (yulduzcha) borligini va ularning nima uchun foydali ekanligini ko'rib chiqing.
        </p>
        <Solution>
          <p>Ushbu repository'lar haqida qisqacha:</p>
          <ul>
            <li><strong>facebook/react:</strong> Veb-saytlar UI yaratish uchun ishlatiladigan eng mashhur JavaScript kutubxonasi.</li>
            <li><strong>python/cpython:</strong> Python dasturlash tilining rasmiy C tildagi manba kodi.</li>
            <li><strong>torvalds/linux:</strong> Dunyoni harakatlantiruvchi Linux operatsion tizimi yadrosi (Linus Torvalds tomonidan yaratilgan).</li>
          </ul>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          GitHub — bu Git repository'larini saqlash, ulashish va jamoaviy ishlash uchun mo'ljallangan bulutli platforma.
        </li>
        <li>
          Git — version control dasturi (lokal), GitHub esa uning onlayn platformasidir (cloud).
        </li>
        <li>
          GitHub har bir o'zgarish tarixini xavfsiz saqlaydi va oddiy Google Drive/Zip arxivlashdan farqli ravishda avtomatik versiyalash va jamoaviy ishlashni ta'minlaydi.
        </li>
        <li>
          Open Source — bu manba kodi ochiq bo'lgan dasturiy ta'minot bo'lib, har kim unga o'z hissasini qo'shishi mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
