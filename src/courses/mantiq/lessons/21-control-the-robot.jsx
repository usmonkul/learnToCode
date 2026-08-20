import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Amaliyot: 'Robotni boshqar' o'yini",
  section: 'Algoritmik yondashuv',
}

export default function RobotniBoshqarLesson() {
  return (
    <>
      <p>
        Endi to'rtta darsda o'rgangan hamma narsani — aniqlik, tartib, takrorlash va shartlar —
        bitta o'yinda birlashtiramiz. Vazifa oddiy: kichkina robotni panjaraning bir uchidan
        ikkinchi uchiga, hech qanday to'siqqa urilmasdan olib borish uchun aniq buyruqlar
        ro'yxatini yozish.
      </p>

      <h2>Panjara va belgilar</h2>
      <p>
        Quyida 5×5 panjara (grid) berilgan. <strong>B</strong> — robotning boshlang'ich joyi
        (u yuqoriga qarab turibdi, buni ↑ belgisi ko'rsatadi), <strong>M</strong> — maqsad
        katak, <strong>✕</strong> belgili qizg'ish kataklar esa — to'siqlar, ulardan robot
        o'ta olmaydi.
      </p>
      <div className="not-prose my-6 flex flex-col items-center gap-4">
        <div className="grid grid-cols-5 gap-1 rounded-xl border border-line bg-canvas-muted p-4">
          {/* 1-qator (eng tepa) */}
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border-2 border-emerald-400 bg-emerald-100 text-sm font-bold text-emerald-700 dark:border-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
            M
          </div>
          {/* 2-qator */}
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          {/* 3-qator */}
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-red-300 bg-red-100 text-sm font-bold text-red-500 dark:border-red-700 dark:bg-red-950 dark:text-red-400">
            ✕
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-red-300 bg-red-100 text-sm font-bold text-red-500 dark:border-red-700 dark:bg-red-950 dark:text-red-400">
            ✕
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          {/* 4-qator */}
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          {/* 5-qator (eng past) */}
          <div className="flex h-14 w-14 items-center justify-center rounded-md border-2 border-brand-400 bg-brand-100 text-sm font-bold text-brand-700 dark:border-brand-600 dark:bg-brand-950 dark:text-brand-300">
            B↑
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-line bg-canvas"></div>
        </div>
        <p className="max-w-md text-center text-xs text-ink-muted">
          Ustunlar chapdan o'ngga 1-dan 5-gacha, qatorlar yuqoridan pastga 1-dan 5-gacha
          hisoblanadi. B — boshlang'ich katak (1-ustun, 5-qator), yuqoriga qarab turibdi. M —
          maqsad katak (5-ustun, 1-qator). ✕ — to'siqlar (1-ustun/3-qator va 3-ustun/3-qator).
        </p>
      </div>

      <h2>Buyruqlar to'plami</h2>
      <p>
        Robotni boshqarish uchun faqat uchta buyruqdan foydalanish mumkin. Robot har doim
        bitta tomonga (yuqoriga, o'ngga, pastga yoki chapga) "qarab" turadi:
      </p>
      <ul>
        <li>
          <strong>OLDINGA YUR</strong> — robot hozir qarab turgan tomonga qarab bitta katak
          siljiydi.
        </li>
        <li>
          <strong>O'NGGA BURIL</strong> — robot joyidan qo'zg'almay, o'ngga (soat mili
          yo'nalishida) 90 daraja buriladi. Joyi o'zgarmaydi, faqat qarash tomoni o'zgaradi.
        </li>
        <li>
          <strong>CHAPGA BURIL</strong> — robot joyidan qo'zg'almay, chapga (soat miliga
          qarshi) 90 daraja buriladi. Joyi o'zgarmaydi, faqat qarash tomoni o'zgaradi.
        </li>
      </ul>
      <Callout type="tip" title="TAKRORLA va AGAR ham ishlatilishi mumkin">
        Bir necha marta ketma-ket OLDINGA YUR yozish o'rniga "3 marta TAKRORLA: OLDINGA YUR"
        deb yozishingiz mumkin — bu ilgari o'rgangan takrorlash. Robot xaritani (chizmani)
        oldindan bilgani uchun butun yo'lni oldindan rejalashtirib, bitta to'liq buyruqlar
        ro'yxatini yozib qo'yish mumkin — bu shart emas, lekin ro'yxatni qisqartiradi.
      </Callout>

      <Quiz
        question="Robot hozir yuqoriga qarab turibdi. Unga CHAPGA BURIL desak, endi u qaysi tomonga qaraydi?"
        options={['Pastga', 'Chapga', "O'ngga", "Yuqoriga (o'zgarmaydi)"]}
        correctIndex={1}
        explanation="Yuqoriga qarab turgan robot chapga (soat miliga qarshi) 90 daraja burilsa, endi chap tomonga qaraydi. Joyi o'zgarmaydi — faqat yo'nalishi."
      />

      <Exercise title="Mashq: robotni B dan M ga olib boring">
        <p>
          Yuqoridagi panjaraga qarab, robotni B kataqidan M kataqiga, ikkala ✕ to'siqqa
          urilmasdan va panjaradan chiqib ketmasdan olib boradigan aniq buyruqlar ro'yxatini
          yozing. Faqat OLDINGA YUR, O'NGGA BURIL va CHAPGA BURIL buyruqlaridan (xohlasangiz,
          TAKRORLA bilan birga) foydalaning. Avval o'zingiz urinib ko'ring, so'ng yechimni
          ochib tekshiring.
        </p>
        <Solution>
          <p>
            Quyidagi 12 ta buyruq robotni B (1-ustun, 5-qator) dan M (5-ustun, 1-qator) ga
            xavfsiz olib boradi. Har bir buyruqdan keyin robotning yangi joyi va qarash
            tomoni ko'rsatilgan — shu tarzda har bir qadamni "qadam-baqadam" tekshirib
            chiqish mumkin:
          </p>
          <ol>
            <li>OLDINGA YUR → 1-ustun, 4-qator (yuqoriga qarab)</li>
            <li>O'NGGA BURIL → 1-ustun, 4-qator (endi o'ngga qarab)</li>
            <li>OLDINGA YUR → 2-ustun, 4-qator (o'ngga qarab)</li>
            <li>CHAPGA BURIL → 2-ustun, 4-qator (endi yuqoriga qarab)</li>
            <li>OLDINGA YUR → 2-ustun, 3-qator (yuqoriga qarab)</li>
            <li>OLDINGA YUR → 2-ustun, 2-qator (yuqoriga qarab)</li>
            <li>O'NGGA BURIL → 2-ustun, 2-qator (endi o'ngga qarab)</li>
            <li>OLDINGA YUR → 3-ustun, 2-qator (o'ngga qarab)</li>
            <li>OLDINGA YUR → 4-ustun, 2-qator (o'ngga qarab)</li>
            <li>OLDINGA YUR → 5-ustun, 2-qator (o'ngga qarab)</li>
            <li>CHAPGA BURIL → 5-ustun, 2-qator (endi yuqoriga qarab)</li>
            <li>OLDINGA YUR → 5-ustun, 1-qator — bu MAQSAD (M)!</li>
          </ol>
          <p>
            Tekshirib ko'raylik: robot hech qachon 1-ustun/3-qator yoki 3-ustun/3-qator
            kataklariga (to'siqlarga) kirmadi va panjara chegarasidan (1-5 oralig'idan)
            hech qachon chiqmadi — demak, bu buyruqlar ro'yxati to'g'ri va xavfsiz.
          </p>
          <p>
            8, 9 va 10-buyruqlarni "3 marta TAKRORLA: OLDINGA YUR" deb ham yozish mumkin —
            natija bir xil, faqat ro'yxat qisqaroq bo'ladi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Har bir buyruq aniq bo'lishi kerak — robot faqat aytilganini bajaradi, "taxminan
          shu tomonga" degan narsani tushunmaydi.
        </li>
        <li>
          Buyruqlar tartibi muhim — burilish va yurish ketma-ketligini almashtirsangiz, robot
          boshqa joyga boradi.
        </li>
        <li>
          Bir xil qadam bir necha marta kerak bo'lsa, TAKRORLA yordamida ro'yxatni
          qisqartirish mumkin.
        </li>
        <li>
          Ba'zan yo'lni oldindan bilib, to'g'ridan-to'g'ri chizib qo'yish mumkin, lekin
          murakkabroq holatlarda "AGAR to'siq bo'lsa..." kabi shartlar yo'lni moslashtirishga
          yordam beradi.
        </li>
      </KeyPoints>
    </>
  )
}
