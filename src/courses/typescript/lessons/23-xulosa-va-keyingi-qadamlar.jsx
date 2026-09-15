import Callout from '@/components/content/Callout'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Xulosa va keyingi qadamlar',
  section: 'TypeScript va React',
}

export default function TypescriptWrapUpLesson() {
  return (
    <>
      <p>
        Bu kursni boshlaganimizda, TypeScript'ni JavaScript ustiga statik tiplarni qo'shadigan
        vosita sifatida tanishtirgan edik — asosiy maqsad xatolarni kod ishga tushmasdan turib,
        yozish bosqichidayoq topish. Shundan so'ng asosiy tiplashtirish grammatikasini
        qurdik: <strong>oddiy tiplar</strong> va TypeScript'ning ularni o'zi{' '}
        <strong>xulosa qilishi (inference)</strong>, <strong>interface</strong> va{' '}
        <strong>type</strong> orasidagi farq, <strong>union</strong> va{' '}
        <strong>discriminated union</strong> orqali "bu yoki u" holatlarini ifodalash,{' '}
        <strong>generic</strong>lar orqali kod bilan turli tiplarda ishlaydigan qayta
        ishlatiladigan funksiyalar yozish, tayyor <strong>utility tiplar</strong> (
        <code>Partial</code>, <code>Pick</code>, <code>Omit</code> va boshqalar),{' '}
        <code>const</code> assertion va <code>satisfies</code> yordamida qiymatni tor va
        aniq tiplarga bog'lash, va oxirida <strong>async/Promise</strong> kodni tiplashtirish.
      </p>
      <p>
        Shundan keyin e'tiborni React'ga qaratdik: loyihada TypeScript'ni sozlashdan boshlab,{' '}
        <strong>props</strong>larni <code>interface</code> orqali tasvirlashni,{' '}
        <strong>useState</strong>ning generic parametrini (ayniqsa boshlang'ich qiymat{' '}
        <code>null</code> yoki <code>undefined</code> bo'lishi mumkin bo'lgan holatlarda) va{' '}
        <strong>hodisa (event)</strong> obyektlarini to'g'ri tiplashtirishni ko'rdik. Shu
        asosda oxirgi beshta darsda chuqurroq React+TypeScript naqshlariga o'tdik:{' '}
        <code>useReducer</code> uchun action'larni discriminated union sifatida
        modellashtirish va reducer ichidagi narrowing, DOM va oddiy mutable{' '}
        <code>useRef</code>larning farqi, generic <strong>custom hook</strong>lar va tuple
        qaytar tiplarining nozik joyi, hamda <strong>Context</strong> va tashqi{' '}
        <strong>API</strong> javoblarini tiplashtirishning chegaralari.
      </p>
      <p>
        Bu — TypeScript va React'ni birga ishlatishning asosiy grammatikasi. Undan keyingi
        hamma narsa (runtime-validatsiya, ilg'or tip texnikalari, katta loyihalarni tashkil
        qilish) — aynan shu grammatika ustiga quriladi, uni almashtirmaydi.
      </p>

      <h2>Bu kursda ataylab qamrab olinmagan mavzular</h2>
      <p>
        Quyidagilar — bu kursda <strong>o'rgatilmagan</strong>, lekin TypeScript bilan real
        loyihalarda ishlaganda tez-tez uchraydigan yo'nalishlar. Ularni sanab o'tishdan
        maqsad — "buni ham o'rganishingiz kerak edi" degan ro'yxat emas, balki keyinchalik
        duch kelganingizda "ha, bu haqida eshitgandim" deya tanib olishingiz uchun xarita
        chizib berish:
      </p>
      <ul>
        <li>
          <strong>Runtime-validatsiya kutubxonalari.</strong> 22-darsda ko'rganimizdek,{' '}
          <code>as SomeType</code> faqat kompilyatsiya vaqtida ishlaydi. Zod kabi kutubxonalar
          tashqi ma'lumotni (API javoblari, forma kiritmalari) haqiqiy runtime'da tekshirib,
          natijada TypeScript tipini ham shundan xulosa qilib beradi — "tashqi dunyoga
          ishonmaslik" degan katta mavzuning amaliy yechimi.
        </li>
        <li>
          <strong>Ilg'or va shartli (conditional) tiplar.</strong>{' '}
          <code>infer</code>, mapped tiplar (<code>{'{ [K in keyof T]: ... }'}</code>) va
          shartli tiplar (<code>T extends U ? X : Y</code>) — kutubxona darajasidagi murakkab
          tip mantig'ini yozish uchun kerak bo'ladigan, lekin oddiy ilova kodida kamdan-kam
          zarur bo'ladigan vositalar.
        </li>
        <li>
          <strong>Monorepo va umumiy tiplar.</strong> Frontend va backend bir xil tiplarni
          (masalan, API javob shakllarini) baham ko'rishi kerak bo'lgan katta loyihalarda,
          tiplarni alohida umumiy paketga chiqarib, ikkala tomonda ham import qilish — bu
          kursning bitta-loyiha doirasidan tashqarida qoladigan tashkiliy masala.
        </li>
        <li>
          <strong>Test fayllarini tiplashtirish.</strong> Vitest yoki Jest kabi test
          freymvorklari bilan TypeScript'da test yozish — mock funksiyalarni, komponent
          renderlarini va assertion'larni tiplashtirishning o'ziga xos kichik naqshlari bor,
          bu kurs esa umuman avtomatik testlashni qamrab olmadi.
        </li>
      </ul>
      <Callout type="note" title="Bu ro'yxat — xarita, jadval emas">
        Yuqoridagilarning hech biri shu kursning davomi sifatida rejalashtirilmagan — bu
        shunchaki TypeScript ekotizimida odatda qanday yo'nalishlar borligi haqida umumiy
        mo'ljal. Qaysi birini qachon o'rganish kerakligini loyihangizning haqiqiy ehtiyoji hal
        qiladi: masalan, tashqi API bilan ko'p ishlaydigan loyihada — runtime-validatsiya,
        umumiy kutubxona yozayotganda — ilg'or tip texnikalari.
      </Callout>

      <h2>Endi nima qilish kerak?</h2>
      <p>
        Eng yaxshi keyingi qadam — yangi mavzuni o'qishdan oldin, avval yozilgan biror kichik
        JavaScript yoki React loyihangizni TypeScript'ga <strong>fayl-fayl</strong>{' '}
        o'tkazish. Bu — TypeScript'ni haqiqatan o'rganishning eng samarali yo'li, chunki u
        sizni shu kursda ko'rgan har bir naqshni (props tiplari, state, event'lar, reducer,
        ref, custom hook, context) haqiqiy, allaqachon yozilgan kod ustida, real vaziyatlarda
        qo'llashga majbur qiladi — yangi loyihani noldan TypeScript'da yozishga qaraganda ancha
        ko'proq narsani ochib beradi, chunki eski kodda ko'pincha "noaniq" joylar (nima
        kelishi mumkinligi hujjatlashtirilmagan funksiya, ba'zan <code>null</code> bo'ladigan
        qiymat) bo'ladi, va aynan o'sha joylarda TypeScript'ning eng katta foydasi ko'rinadi.
      </p>
      <p>
        Amalda bu ko'chirish odatda quyidagi tartibda ketadi: avval loyihaning eng "chekka"
        fayllaridan (yordamchi funksiyalar, konstantalar) boshlab, ular hech kimga bog'liq
        bo'lmagani uchun oson tiplashtiriladi; keyin ma'lumot oqimi bo'ylab (API funksiyalari,
        keyin ularni chaqiradigan hook'lar) yuqoriga qarab davom etiladi; va eng oxirida
        komponentlarning o'ziga — props, state, event'lar — yetib boriladi. Har bir faylni
        o'tkazgach loyiha hali ham ishlab turishi kerak — bir vaqtning o'zida yarim loyiha{' '}
        <code>.js</code>, yarmi <code>.ts</code>/<code>.tsx</code> bo'lib turishi butunlay
        normal holat.
      </p>

      <Exercise title="Mashq (ochiq)">
        <p>
          Avval yozgan kichik bir JavaScript yoki React funksiyangizni (yoki komponentingizni)
          tanlang va uni TypeScript'ga o'tkazing: parametr va qaytar tiplarini, propslarni,{' '}
          <code>useState</code>/<code>useReducer</code> state shaklini aniq yozing. Agar kodda{' '}
          <code>null</code> yoki <code>undefined</code> bo'lishi mumkin bo'lgan, lekin hech
          qachon hujjatlashtirilmagan joy topsangiz — bu odatda TypeScript sizga ko'rsatib
          bergan birinchi haqiqiy foyda bo'ladi. Bitta "to'g'ri" yechimi yo'q — muhimi, shu
          kursda ko'rgan naqshlarni (discriminated union, generic, tuple qaytar tip va h.k.)
          o'z kodingizda tanib, qo'llay olishingiz.
        </p>
        <Solution>
          <p>
            Yechim sizning tanlagan kodingizga bog'liq bo'lgani uchun bitta namunaviy javob
            yo'q. Tekshirish uchun o'zingizga savol bering: har bir funksiya parametri va
            qaytar qiymat aniq tipga ega bormi; komponent propslari <code>interface</code>{' '}
            orqali tasvirlanganmi; state'da <code>null</code>/<code>undefined</code> bo'lishi
            mumkin bo'lgan joylar shunday deb belgilanganmi; va agar tashqi ma'lumot (API,
            <code>localStorage</code>) bilan ishlasangiz, uni tiplashtirishning chegarasini —
            22-darsda ko'rganimizdek — anglaysizmi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <strong>Tiplar va xulosa qilish (inference)</strong> — TypeScript ko'p holatda
          qiymat tipini o'zi biladi; qo'lda tip yozish faqat kerak bo'lgan joyda ishlatiladi.
        </li>
        <li>
          <strong>Union, discriminated union va narrowing</strong> — "bu yoki u" holatlarini
          ifodalash va kod oqimida tipni xavfsiz toraytirish.
        </li>
        <li>
          <strong>Generic'lar va utility tiplar</strong> — kodni turli tiplar bilan qayta
          ishlatish, va tayyor tiplardan (<code>Partial</code>, <code>Pick</code> va h.k.)
          yangi tiplar hosil qilish.
        </li>
        <li>
          <strong>React'da props, state va event'lar</strong> — komponent chegaralarini{' '}
          <code>interface</code> bilan, <code>useState</code>ni generic parametr bilan,
          hodisa obyektlarini mos event tipi bilan tasvirlash.
        </li>
        <li>
          <strong>useReducer, useRef, custom hook, Context</strong> — action'larni
          discriminated union sifatida modellashtirish, ikki xil ref o'rtasidagi farq, generic
          custom hook va tuple qaytar tip, Context'ni <code>undefined</code>siz xavfsiz
          ochish.
        </li>
        <li>
          <strong>Tiplashtirishning chegarasi</strong> — TypeScript faqat kompilyatsiya
          vaqtida ishlaydi; tashqi ma'lumotga (API, foydalanuvchi kiritmasi) chindan ishonish
          uchun runtime-validatsiya kerak bo'ladi.
        </li>
        <li>
          Bu asoslar ustiga runtime-validatsiya, ilg'or/shartli tiplar, monorepo'da umumiy
          tiplar va testlarni tiplashtirish kabi mavzular quriladi — ularning har biri o'z
          ehtiyoji tug'ilganda o'rganiladigan alohida yo'nalish.
        </li>
      </KeyPoints>
    </>
  )
}
