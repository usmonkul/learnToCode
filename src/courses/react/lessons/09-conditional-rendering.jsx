import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Shartli render',
  section: 'Render qilish naqshlari',
}

export default function ConditionalRenderingLesson() {
  return (
    <>
      <p>
        Oldingi bo'limda <code>useState</code> va event handlerlar orqali komponent ichida
        o'zgaruvchan holat (state) yaratish va uni foydalanuvchi harakatiga javoban yangilashni
        ko'rdik. Lekin state o'zgarganda ko'pincha ekranda butunlay boshqa narsa ko'rinishi kerak
        bo'ladi: foydalanuvchi tizimga kirgan bo'lsa — bitta ko'rinish, kirmagan bo'lsa —
        boshqasi; ro'yxat bo'sh bo'lsa — bitta xabar, to'la bo'lsa — o'zi. Bu —{' '}
        <strong>shartli render (conditional rendering)</strong>: JSX'ni odatiy JavaScript shartlari
        yordamida "shu holatda shu, boshqa holatda boshqa narsa chiqsin" deb boshqarish.
      </p>

      <h2>
        <code>&&</code> operatori bilan ko'rsatish/yashirish
      </h2>
      <p>
        Eng oddiy holat — biror narsani faqat bitta shart to'g'ri bo'lganda ko'rsatish, aks holda
        umuman hech narsa chiqarmaslik. Bunga JavaScript'ning <code>&&</code> (mantiqiy VA)
        operatori juda mos keladi, chunki uning natijasi to'g'ridan-to'g'ri JSX ichiga
        joylashtirilishi mumkin:
      </p>
      <CodeBlock lang="jsx">{`function Bildirishnoma({ xabar }) {
  return (
    <div>
      <h2>Pochta qutisi</h2>
      {xabar && <p className="ogohlantirish">{xabar}</p>}
    </div>
  )
}`}</CodeBlock>
      <p>
        <code>&&</code> operatori chapdan o'ngga baholanadi: agar chap tomon (<code>xabar</code>)
        "falsy" (<code>false</code>, <code>null</code>, <code>undefined</code>, bo'sh satr{' '}
        <code>""</code>) bo'lsa, butun ifoda o'sha falsy qiymatga aylanadi va React uni hech narsa
        deb render qiladi. Agar chap tomon "truthy" bo'lsa (masalan, bo'sh bo'lmagan satr), ifoda
        o'ng tomonga — <code>{'<p>{xabar}</p>'}</code>ga — aylanadi va u ekranga chiqadi. Shu
        tariqa bitta qatorda "shart to'g'ri bo'lsa — chiqar, bo'lmasa — chiqarma" degan mantiqni
        yozib bo'ladi.
      </p>

      <h2>
        Klassik xato: <code>0 &&</code> muammosi
      </h2>
      <p>
        <code>&&</code>ning qulayligi bitta jiddiy tuzoq bilan keladi. Agar chap tomon son{' '}
        <code>0</code> bo'lsa, <code>0</code> — falsy qiymat, lekin u <code>false</code> yoki{' '}
        <code>null</code> emas, balki <strong>o'zi</strong>. React esa <code>false</code>,{' '}
        <code>null</code> va <code>undefined</code>ni ekranga hech narsa chiqarmasdan tashlab
        yuboradi, lekin <code>0</code>ni — chiqaradi, chunki u haqiqiy, ko'rsatsa bo'ladigan
        qiymat. Natijada quyidagi kod kutilmagan holatda ekranga yolg'iz <code>0</code> raqamini
        chiqarib qo'yadi:
      </p>
      <CodeBlock lang="jsx">{`function Savatcha({ mahsulotlarSoni }) {
  return (
    <div>
      {/* XATO: mahsulotlarSoni === 0 bo'lganda, ekranga "0" chiqadi! */}
      {mahsulotlarSoni && <p>Savatchada {mahsulotlarSoni} ta mahsulot bor</p>}
    </div>
  )
}`}</CodeBlock>
      <p>
        Savatcha bo'sh bo'lganda (<code>mahsulotlarSoni === 0</code>) hech qanday xabar
        chiqmasligi kerak edi, lekin ekranda tanho <code>0</code> yozuvi paydo bo'ladi — chunki{' '}
        <code>0 && <p>...</p></code> ifodasining natijasi <code>0</code>ning o'zi, va React uni
        haqiqiy kontent deb render qiladi. Buni tuzatish uchun chap tomonni doim haqiqiy boolean
        qiymatga aylantirish kerak — masalan, taqqoslash operatoridan foydalanib:
      </p>
      <CodeBlock lang="jsx">{`function Savatcha({ mahsulotlarSoni }) {
  return (
    <div>
      {/* TO'G'RI: mahsulotlarSoni > 0 — har doim true yoki false */}
      {mahsulotlarSoni > 0 && <p>Savatchada {mahsulotlarSoni} ta mahsulot bor</p>}
    </div>
  )
}`}</CodeBlock>
      <Callout type="warning" title="&& chap tomoni doim boolean bo'lsin">
        <code>&&</code>dan foydalanganda chap tomonga son yoki satrni to'g'ridan-to'g'ri
        qo'ymang — <code>{'soni > 0'}</code>, <code>{'satr.length > 0'}</code>,{' '}
        <code>Boolean(qiymat)</code>{' '}
        kabi ifodalar bilan uni haqiqiy <code>true</code>/<code>false</code>ga aylantiring. Aks
        holda <code>0</code> yoki bo'sh satr kabi "falsy, lekin ko'rsatsa bo'ladigan" qiymatlar
        ekranga tasodifan chiqib qolishi mumkin.
      </Callout>

      <h2>
        Ternary operator: ikkalasidan biri
      </h2>
      <p>
        <code>&&</code> faqat "ko'rsatish yoki hech narsa chiqarmaslik" holatiga mos keladi. Agar
        ikkita variantning birontasi har doim ko'rinishi kerak bo'lsa — masalan, "Kirish" yoki
        "Chiqish" tugmasi — u holda <strong>ternary operator</strong> (<code>shart ? A : B</code>)
        qulayroq:
      </p>
      <CodeBlock lang="jsx">{`function HolatBelgisi({ ulangan }) {
  return (
    <p>
      {ulangan ? <span className="yashil">Ulangan</span> : <span className="qizil">Uzilgan</span>}
    </p>
  )
}`}</CodeBlock>
      <p>
        Ternary — bu oddiy <code>if/else</code>ning ifoda (expression) ko'rinishi: u qiymat
        qaytaradi, shuning uchun JSX ichiga to'g'ridan-to'g'ri joylashtirish mumkin, aksincha{' '}
        <code>if/else</code> operatori esa qiymat qaytarmaydi va JSX ichida ishlatib bo'lmaydi.
      </p>

      <h2>O'zgaruvchida hisoblab, keyin render qilish</h2>
      <p>
        Shartlar ko'payib, bir-birining ichiga joylashgan (nested) ternarylar paydo bo'la
        boshlasa, JSX o'qishga qiyin bo'lib qoladi. Bunday holatda shartni <code>return</code>dan{' '}
        <strong>oldin</strong>, alohida o'zgaruvchida hisoblab qo'yish va keyin JSX ichida shunchaki
        o'sha o'zgaruvchini chiqarish ancha toza yechim:
      </p>
      <CodeBlock lang="jsx">{`function Buyurtma({ holat }) {
  let matn

  if (holat === 'kutilmoqda') {
    matn = <p className="sariq">Buyurtma kutilmoqda...</p>
  } else if (holat === 'yolda') {
    matn = <p className="ko'k">Buyurtma yo'lda</p>
  } else if (holat === 'yetkazildi') {
    matn = <p className="yashil">Buyurtma yetkazildi</p>
  } else {
    matn = <p className="qizil">Noma'lum holat</p>
  }

  return (
    <div className="buyurtma-kartasi">
      <h3>Buyurtma #{id}</h3>
      {matn}
    </div>
  )
}`}</CodeBlock>
      <p>
        Bu yondashuvning afzalligi shundaki, tanlash mantig'i (qaysi holatda nima ko'rsatilishi
        kerakligi) va chiqarish (rendering) qismi bir-biridan ajratilgan. Shartlar necha marta
        ko'paysa ham, <code>return</code> ichidagi JSX o'zgarmay qoladi — u shunchaki{' '}
        <code>{'{matn}'}</code>ni chiqaradi.
      </p>

      <h2>
        Hech narsa render qilmaslik: <code>return null</code>
      </h2>
      <p>
        Ba'zan komponent umuman hech narsa chiqarmasligi kerak bo'ladi — masalan, ko'rsatiladigan
        ma'lumot hali kelmagan yoki foydalanuvchi biror narsani yashirgan bo'lsa. Bunday holatda
        komponent funksiyasining boshida shartni tekshirib, <code>null</code> qaytarish qulay:
      </p>
      <CodeBlock lang="jsx">{`function OgohlantirishPaneli({ xabarlar }) {
  if (xabarlar.length === 0) {
    return null
  }

  return (
    <div className="ogohlantirish-paneli">
      {xabarlar.map((xabar) => (
        <p key={xabar.id}>{xabar.matn}</p>
      ))}
    </div>
  )
}`}</CodeBlock>
      <p>
        React uchun komponentdan <code>null</code> qaytarish — mutlaqo normal holat: u ekranga
        hech qanday DOM elementi chiqarmaydi, xuddi o'sha komponent umuman chaqirilmagandek. Bu
        naqsh ayniqsa komponent funksiyasining eng boshida, "agar ko'rsatishga hech narsa bo'lmasa
        — darhol chiqib ket" tarzida ishlatilganda foydali — qolgan kod esa "normal holat" uchun
        yozilgan bo'lib qoladi, shartlar bilan chalkashmaydi.
      </p>
      <Callout type="note" title="undefined emas, aynan null">
        Komponent hech narsa qaytarmasligi kerak bo'lganda, aynan <code>null</code> qaytaring, oddiy{' '}
        <code>return</code> (qiymatsiz, ya'ni <code>undefined</code> qaytaradigan) emas. Ikkalasi
        ham amalda bir xil natija beradi — ekranga hech narsa chiqmaydi — lekin{' '}
        <code>null</code> "men ataylab hech narsa qaytarmayapman" degan niyatni aniqroq bildiradi.
      </Callout>

      <Quiz
        question="mahsulotlarSoni === 0 bo'lganda, {mahsulotlarSoni && <p>Mahsulotlar bor</p>} ifodasi ekranga nima chiqaradi?"
        options={[
          'Hech narsa chiqmaydi, chunki 0 — falsy qiymat',
          "Ekranga yolg'iz \"0\" raqami chiqadi",
          '<p>Mahsulotlar bor</p> baribir chiqadi',
          "Build vaqtida xatolik yuz beradi",
        ]}
        correctIndex={1}
        explanation="0 && <p>...</p> ifodasining natijasi 0ning o'zi bo'ladi, chunki && chap tomon falsy bo'lganda o'sha qiymatni qaytaradi. React esa 0ni haqiqiy, ko'rsatsa bo'ladigan qiymat deb hisoblaydi va uni ekranga chiqaradi — hech narsa chiqarmasdan tashlab yubormaydi. Shu sababli soni > 0 kabi haqiqiy boolean shart ishlatish kerak."
      />

      <Exercise>
        <p>
          <code>useState</code> yordamida <code>isLoggedIn</code> nomli boolean state yarating
          (boshlang'ich qiymati <code>false</code>). Komponent quyidagicha ishlashi kerak: agar{' '}
          <code>isLoggedIn</code> — <code>false</code> bo'lsa, "Kirish" yozuvli tugma chiqsin;
          agar <code>true</code> bo'lsa, "Chiqish" yozuvli tugma chiqsin. Tugmani bosganda{' '}
          <code>isLoggedIn</code> qiymati teskarisiga o'zgarsin (event handlerni oldingi darsda
          ko'rgan usulda yozing).
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`import { useState } from 'react'

function KirishChiqish() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function handleBosish() {
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    <button onClick={handleBosish}>
      {isLoggedIn ? 'Chiqish' : 'Kirish'}
    </button>
  )
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>{'{shart && <Element />}'}</code> — biror narsani faqat shart to'g'ri bo'lganda
          ko'rsatish, aks holda hech narsa chiqarmaslik uchun ishlatiladi.
        </li>
        <li>
          <code>&&</code>ning chap tomoni son yoki satr bo'lib, <code>0</code> yoki bo'sh satr
          kabi falsy-lekin-ko'rsatsa-bo'ladigan qiymat bo'lib qolsa, React uni ekranga
          chiqaradi — shuning uchun chap tomon doim haqiqiy boolean bo'lishi kerak (
          <code>{'soni > 0'}</code> kabi).
        </li>
        <li>
          <code>shart ? A : B</code> ternary operatori — ikkita variantdan biri har doim
          ko'rsatilishi kerak bo'lganda ishlatiladi, chunki u <code>if/else</code>dan farqli
          o'laroq qiymat qaytaradigan ifoda.
        </li>
        <li>
          Shartlar murakkablashib, ko'p sonli nested ternarylar paydo bo'lsa, mantiqni{' '}
          <code>return</code>dan oldin alohida o'zgaruvchida hisoblab, keyin JSX ichida
          o'zgaruvchini chiqarish o'qilishini osonlashtiradi.
        </li>
        <li>
          Komponent funksiyasi boshida shartni tekshirib <code>return null</code> qilish —
          "ko'rsatishga hech narsa bo'lmasa, darhol chiqib ket" degan keng tarqalgan naqsh.
        </li>
      </KeyPoints>
    </>
  )
}
