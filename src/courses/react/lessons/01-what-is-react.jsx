import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import Figure from '@/components/content/Figure'
import componentTree from '@/assets/component-tree.svg'

export const meta = {
  title: "React nima va u nima uchun kerak",
  section: 'Boshlash',
}

export default function WhatIsReactLesson() {
  return (
    <>
      <h2>Muammo: ekranni ma'lumot bilan sinxron saqlash</h2>
      <p>
        Tasavvur qiling, siz oddiy JavaScript bilan savatcha yozyapsiz. Sahifaning tepasida
        savatchadagi mahsulotlar soni ko'rsatilgan nishon (badge) bor, pastda esa "Savatchaga
        qo'shish" tugmasi va savatcha ro'yxati. Har safar tugma bosilganda siz uchta joyni qo'lda
        yangilashingiz kerak:
      </p>
      <CodeBlock lang="js">{`let soni = 0

tugma.addEventListener('click', () => {
  soni += 1
  nishon.textContent = soni                 // 1-joy: tepadagi nishon
  royxat.appendChild(yangiQator())          // 2-joy: ro'yxat
  jamiNarx.textContent = hisoblaJami()      // 3-joy: jami narx
})

ochirishTugmasi.addEventListener('click', () => {
  soni -= 1
  nishon.textContent = soni
  // ... ro'yxatdan qatorni topib o'chirish
  // ... jami narxni qayta hisoblash — yoki unutib qo'yish!
})`}</CodeBlock>
      <p>
        Ilova kattalashgan sari bunday "ma'lumot o'zgardi — endi ekranning qaysi qismlarini
        yangilashim kerak edi?" degan savollar ko'payib boradi. Bitta joyni unutsangiz, nishonda
        3 turadi, ro'yxatda esa 2 ta mahsulot — ekran ma'lumotga mos kelmay qoladi. Bu xatoni
        topish ham qiyin, chunki u faqat ma'lum ketma-ketlikdagi bosishlardan keyin paydo
        bo'ladi.
      </p>
      <p>
        <strong>React</strong> aynan shu muammoni hal qilish uchun yaratilgan: siz faqat
        ma'lumotni o'zgartirasiz, ekranning qaysi qismini qanday yangilashni esa React o'zi
        hal qiladi.
      </p>

      <h2>React nima?</h2>
      <p>
        React — foydalanuvchi interfeyslarini (UI) qurish uchun JavaScript{' '}
        <strong>kutubxonasi</strong> (library). Uni Meta (Facebook) kompaniyasi 2013-yilda ochiq
        kodli qilib chiqargan; bugun Instagram, Netflix, Airbnb va minglab boshqa ilovalar React
        bilan yozilgan. U dunyodagi eng ko'p ishlatiladigan frontend vositasi, shuning uchun
        frontend vakansiyalarining katta qismi React bilimini talab qiladi.
      </p>
      <p>
        "Kutubxona" so'zi muhim: React faqat bitta ishni qiladi — ma'lumotdan UI yasaydi.
        Sahifalar orasida yurish (routing), serverdan ma'lumot olish yoki formalarni tekshirish
        uchun u tayyor yechim bermaydi — bular uchun alohida kutubxonalar bor, ularni keyingi
        kursda (<code>react-advanced</code>) ko'rib chiqamiz.
      </p>

      <h2>Komponent (component) nima?</h2>
      <p>
        React sizga butun sahifani bir yo'la yozish o'rniga, uni kichik, qayta ishlatiladigan
        qismlarga bo'lib chiqishni, so'ng ularni birlashtirib katta ilova hosil qilishni taklif
        qiladi. Ana shu kichik qismlar <strong>komponent</strong>lar (component) deb ataladi.
      </p>
      <p>
        Komponentni LEGO qismiga o'xshatish mumkin: har biri kichik va o'z-o'zidan tugallangan,
        lekin ularni birlashtirib istagancha katta va murakkab narsa yasash mumkin. React'da
        komponent — ekranda nimanidir chiqaradigan oddiy JavaScript funksiyasi, xolos:
      </p>
      <CodeBlock lang="jsx">{`function Sarlavha() {
  return <h1>Mening ilovam</h1>
}`}</CodeBlock>
      <p>
        <code>return</code>dan keyingi <code>{'<h1>Mening ilovam</h1>'}</code> ko'rinishidagi
        yozuv — bu JSX (JavaScript'ning HTML'ga o'xshab ko'rinadigan kengaytmasi). Uning
        qoidalarini 3-darsda batafsil o'rganamiz; hozircha shuni bilish kifoya: bu yerda biz
        funksiyaga "ekranda shu narsani chiqar" deb aytayapmiz.
      </p>
      <p>
        Haqiqiy ilova odatda o'nlab, hattoki yuzlab komponentdan iborat bo'ladi, va ular
        bir-birining ichiga joylashtiriladi — xuddi papkalar ichida papkalar bo'lgani kabi.
        Masalan, <code>App</code> komponenti o'z ichida <code>Header</code> va{' '}
        <code>List</code> komponentlarini chaqirishi mumkin:
      </p>
      <Figure
        src={componentTree}
        alt="App komponentidan Header va List, List'dan esa ikkita elementga tarqaladigan daraxt sxemasi"
        caption="1-rasm: komponentlar daraxti — App eng tepada, qolganlari uning ichiga joylashadi"
      />
      <p>
        Bu daraxtning har bir qutisi — alohida komponent. Bir komponentni tuzatish yoki qayta
        ishlatish qolganlariga deyarli ta'sir qilmaydi — bu esa katta ilovalarni ham boshqarib
        bo'ladigan holda saqlab turadi. Bitta <code>MahsulotKartasi</code> komponentini yozib,
        uni sahifada 50 marta turli ma'lumot bilan ishlatish mumkin.
      </p>

      <h2>Nega React deklarativ (declarative) deb ataladi?</h2>
      <p>
        Yuqoridagi savatcha misolida biz brauzerga qadam-baqadam buyruq berdik: matnni
        o'zgartir, qator qo'sh, narxni qayta yoz. Bu yondashuv <strong>imperativ</strong>{' '}
        (imperative) deb ataladi — natijaga <em>qanday</em> yetib borishni aytamiz. Oddiyroq
        misol:
      </p>
      <CodeBlock lang="js">{`const tugma = document.createElement('button')
tugma.textContent = 'Bosish soni: 0'
let soni = 0
tugma.addEventListener('click', () => {
  soni += 1
  tugma.textContent = \`Bosish soni: \${soni}\`
})
document.body.appendChild(tugma)`}</CodeBlock>
      <p>
        React'da esa siz ekran <em>nima</em> ko'rinishi kerakligini{' '}
        <strong>tasvirlaysiz</strong>, va bu tasvir ma'lumotga bog'liq bo'ladi:
      </p>
      <CodeBlock lang="jsx">{`function Hisoblagich() {
  // soni qayerdan kelishini 13-darsda ko'ramiz
  return <button>Bosish soni: {soni}</button>
}`}</CodeBlock>
      <p>
        Bu yerda "matnni yangila" degan buyruq yo'q. Biz faqat "tugmada doim joriy son yozilgan
        bo'lsin" deymiz. <code>soni</code> o'zgarsa, React komponentni qayta chaqiradi, yangi
        natijani eskisi bilan solishtiradi va brauzer DOM'ida faqat o'zgargan qismni — shu
        holatda bitta matnni — yangilaydi.
      </p>
      <Callout type="tip" title="Restoran analogiyasi">
        Imperativ yondashuv — oshpazga taomni tayyorlashning har bir qadamini aytib berish
        ("suvni qaynatib, tuzini solib, ..."). Deklarativ yondashuv esa — menyudan "osh" deb
        buyurtma qilish: siz nima istayotganingizni aytasiz, qanday tayyorlanishini esa oshpazga
        (React'ga) topshirasiz.
      </Callout>
      <p>
        Butun React g'oyasini bitta formula bilan ifodalash mumkin:{' '}
        <strong>UI = f(ma'lumot)</strong>. Komponent — ma'lumotni olib, ekran tasvirini
        qaytaradigan funksiya. Ma'lumot bir xil bo'lsa, tasvir ham bir xil bo'ladi. Savatchadagi
        "nishon 3, ro'yxatda 2 ta" xatosi bu modelda paydo bo'la olmaydi, chunki nishon ham,
        ro'yxat ham bitta ma'lumotdan chizilyapti.
      </p>

      <h2>Komponentning "xotirasi" — hooklar haqida bir og'iz</h2>
      <p>
        Yuqoridagi <code>Hisoblagich</code>da <code>soni</code> qayerdan kelishini aytmadik.
        Komponent qandaydir qiymatni "eslab qolishi" uchun React <strong>hook</strong>lar
        beradi — nomi <code>use</code> bilan boshlanadigan maxsus funksiyalar (
        <code>useState</code>, <code>useEffect</code> va boshqalar). Ular kursning katta qismini
        tashkil qiladi, lekin birinchi hookni 13-darsda, avval komponent va JSX asoslarini
        o'rganib bo'lganimizdan keyin ko'ramiz.
      </p>

      <h2>Bu kursda nimani o'rganasiz</h2>
      <ol>
        <li>
          <strong>Boshlash</strong> — React loyihasini kompyuteringizda yaratish, JSX va
          komponentlar.
        </li>
        <li>
          <strong>UI'ni tasvirlash</strong> — props, ro'yxatlar, shartli render, stil berish.
          Yakunida: osh markazi menyusi loyihasi.
        </li>
        <li>
          <strong>Interaktivlik</strong> — hodisalar, state, React qanday render qilishi, forma.
          Yakunida: uy vazifalari kuzatuvchisi.
        </li>
        <li>
          <strong>State boshqaruvi</strong> — state'ni to'g'ri tuzish, ulashish,{' '}
          <code>useReducer</code> va context. Yakunida: bozor savatchasi.
        </li>
        <li>
          <strong>Ref va effektlar</strong> — tashqi dunyo bilan ishlash, serverdan ma'lumot
          olish, o'z hooklaringizni yozish. Yakunida: kitob qidiruv ilovasi.
        </li>
      </ol>
      <p>
        Kurs JavaScript'ni yaxshi bilishingizni nazarda tutadi: funksiyalar, massiv metodlari (
        <code>map</code>, <code>filter</code>), destructuring, spread (<code>...</code>),
        modullar (<code>import</code>/<code>export</code>) va <code>fetch</code>. Agar bular
        notanish bo'lsa, avval JavaScript kurslarini tugatib oling.
      </p>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong>DOM'ni qo'lda o'zgartirish.</strong> React komponenti ichida{' '}
            <code>document.getElementById(...).textContent = ...</code> kabi kod yozmang. React
            DOM'ni o'zi boshqaradi; uning "orqasidan" qo'lda aralashish keyingi renderda
            o'chib ketadi yoki kutilmagan xatolarga olib keladi.
          </li>
          <li>
            <strong>React'ni hamma narsani qiladigan framework deb o'ylash.</strong> React
            faqat UI qatlami. "React'da qanday qilib sahifa almashtiraman?" degan savolga javob
            — alohida kutubxona.
          </li>
          <li>
            <strong>JavaScript asoslarini o'tkazib yuborish.</strong> React xatolarining
            ko'pchiligi aslida JavaScript xatolari (massiv yoki obyektni joyida o'zgartirish,
            obyekt nusxasini noto'g'ri olish). Kurs davomida spread va <code>map</code>/<code>filter</code>{' '}
            juda ko'p ishlatiladi.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="Sonni oshirish uchun ikki usul bor: (1) button.textContent'ni har bosishda qo'lda yangilash, (2) sonni saqlab, JSX'da {soni} deb yozish va qolganini React'ga qoldirish. Ikkinchi usul qanday yondashuv deb ataladi?"
        options={['Deklarativ', 'Imperativ', 'Rekursiv', 'Asinxron']}
        correctIndex={0}
        explanation="Ikkinchi usulda biz UI qanday ko'rinishi kerakligini tasvirlaymiz (deklarativ), DOM'ni qadam-baqadam yangilashni esa React'ga topshiramiz. Birinchi usul — imperativ."
      />

      <Quiz
        question="Quyidagilardan qaysi biri React'ning o'z vazifasi hisoblanadi?"
        options={[
          "Ma'lumotdan UI yasash va ma'lumot o'zgarganda ekranni yangilash",
          "Sahifalar orasida URL bo'yicha yurish (routing)",
          "Ma'lumotlar bazasiga so'rov yuborish",
          "Server tomonida foydalanuvchini autentifikatsiya qilish",
        ]}
        correctIndex={0}
        explanation="React — UI kutubxonasi: u faqat ma'lumotdan interfeys yasaydi va uni yangilab turadi. Routing, server bilan ishlash va autentifikatsiya uchun alohida kutubxonalar yoki server kodi ishlatiladi."
      />

      <Exercise title="1-mashq: birinchi komponent">
        <p>
          Quyidagi UI'ni tasvirlaydigan <code>Kutubxona</code> nomli komponent yozing: sahifada{' '}
          <code>{'<h1>Kutubxona</h1>'}</code> sarlavhasi va uning ostida{' '}
          <code>{'<p>Xush kelibsiz!</p>'}</code> matni chiqishi kerak. Hozircha kodni qog'ozda
          yoki matn muharririda yozing — loyihani keyingi darsda yaratamiz.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`function Kutubxona() {
  return (
    <div>
      <h1>Kutubxona</h1>
      <p>Xush kelibsiz!</p>
    </div>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: sahifani komponentlarga bo'lish">
        <p>
          Onlayn do'konning mahsulot sahifasini tasavvur qiling: tepada logotip va qidiruv
          qatori bor sarlavha, chapda kategoriyalar menyusi, o'rtada mahsulot kartalari to'ri
          (har bir kartada rasm, nom, narx va "Savatchaga" tugmasi), pastda esa footer. Bu
          sahifani qanday komponentlarga bo'lgan bo'lardingiz? Komponentlar daraxtini matn
          ko'rinishida chizing.
        </p>
        <Solution>
          <p>Bitta yaxshi variant (yagona to'g'ri javob yo'q):</p>
          <CodeBlock lang="text">{`App
├── Header
│   ├── Logo
│   └── SearchBar
├── CategoryMenu
├── ProductGrid
│   └── ProductCard   (har bir mahsulot uchun bittadan)
│       └── AddToCartButton
└── Footer`}</CodeBlock>
          <p>
            Asosiy qoida: takrorlanadigan narsa (mahsulot kartasi) — albatta alohida komponent;
            mustaqil ma'noga ega bo'lak (qidiruv, menyu) — ham alohida komponent bo'lishga
            loyiq. <code>ProductCard</code>ni bir marta yozib, uni har bir mahsulot uchun qayta
            ishlatamiz.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          React — ma'lumotdan UI yasaydigan JavaScript kutubxonasi; u ekranni ma'lumot bilan
          sinxron saqlash muammosini hal qiladi.
        </li>
        <li>
          Komponent — ekranda biror narsa chiqaradigan, qayta ishlatiladigan oddiy JavaScript
          funksiyasi; ilova komponentlar daraxtidan tashkil topadi.
        </li>
        <li>
          React deklarativ: siz ekran qanday ko'rinishi kerakligini tasvirlaysiz (UI =
          f(ma'lumot)), DOM'ni yangilash esa React'ning ishi.
        </li>
        <li>
          Komponent qiymatni "eslab qolishi" uchun hooklar ishlatiladi — ular <code>use</code>{' '}
          bilan boshlanadi; birinchisi, <code>useState</code>, 13-darsda.
        </li>
        <li>
          React komponenti ichida DOM'ni qo'lda o'zgartirmang — bu React'ning ishi.
        </li>
      </KeyPoints>
    </>
  )
}
