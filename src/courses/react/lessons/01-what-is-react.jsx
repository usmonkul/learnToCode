import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import Figure from '@/components/content/Figure'
import componentTree from '@/assets/component-tree.svg'

export const meta = {
  title: 'React nima va nega hooklar',
  section: 'Boshlash',
}

export default function ReactNimaLesson() {
  return (
    <>
      <p>
        React — foydalanuvchi interfeyslarini (UI) qurish uchun ishlatiladigan JavaScript
        kutubxonasi. U sizga butun sahifani bir yo'la yozish o'rniga, uni kichik, qayta
        ishlatiladigan qismlarga bo'lib chiqishni, so'ng ularni bir-biriga birlashtirib katta
        ilova hosil qilishni taklif qiladi. Ana shu kichik qismlar — <strong>komponent</strong>lar
        (component) deb ataladi, va butun React dunyoqarashi ular atrofida qurilgan.
      </p>

      <h2>Komponent (component) nima?</h2>
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
        sintaksisini keyingi darsda batafsil o'rganamiz; hozircha shuni bilish kifoya: bu yerda
        biz funksiyaga "ekranda shu narsani chiqar" deb aytayapmiz.
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
        Bu daraxtning har bir qutisi — alohida komponent. Ular birgalikda ishlab, yagona sahifani
        hosil qiladi. Bir komponentni tuzatish yoki qayta ishlatish qolganlariga deyarli
        ta'sir qilmaydi — bu esa katta ilovalarni ham boshqarib bo'ladigan holda saqlab turadi.
      </p>

      <h2>Nega React deklarativ (declarative) deb ataladi?</h2>
      <p>
        React paydo bo'lishidan oldin (va React'siz ham) veb-sahifani o'zgartirish uchun brauzer
        DOM'iga to'g'ridan-to'g'ri, qadam-baqadam buyruq berish kerak edi: element yarat, unga matn
        qo'y, sahifaga qo'shib qo'y, keyin foydalanuvchi biror narsa bosganda o'zgargan qismini
        qo'lda toping va yangilang. Konseptual jihatdan bu shunga o'xshaydi:
      </p>
      <CodeBlock lang="js">{`const sarlavha = document.createElement('h1')
sarlavha.textContent = 'Salom, Aziz!'
document.body.appendChild(sarlavha)

const tugma = document.createElement('button')
tugma.textContent = 'Bosish soni: 0'
let soni = 0
tugma.addEventListener('click', () => {
  soni += 1
  tugma.textContent = \`Bosish soni: \${soni}\`
})
document.body.appendChild(tugma)`}</CodeBlock>
      <p>
        Bu yondashuv — <strong>imperativ</strong>: biz React'ga (yoki brauzerga) natijaga qanday
        yetib borishni, qadamma-qadam aytamiz. Kod ko'payishi bilan qaysi qism qachon
        yangilanishini kuzatib borish tobora qiyinlashadi.
      </p>
      <Callout type="tip" title="Restoran analogiyasi">
        Imperativ yondashuv — bu oshpazga taomni tayyorlashning har bir qadamini aytib berish
        ("suvni qaynatib, tuzini solib, ..."). Deklarativ yondashuv esa — shunchaki menyudan
        "osh" deb buyurtma qilish: siz nima istayotganingizni aytasiz, qanday tayyorlanishini esa
        oshpazga (React'ga) ishonib topshirasiz.
      </Callout>
      <p>
        React'da esa siz ekranda nima ko'rinishi kerakligini <strong>tasvirlaysiz</strong>, DOM'ni
        qadam-baqadam qanday o'zgartirishni esa React'ning o'ziga qoldirasiz. Ma'lumot
        o'zgarganda, React kerakli joylarni o'zi hisoblab, DOM'ni mos ravishda yangilaydi. Yuqoridagi
        misolning tasvirlovchi (hali to'liq ishlamaydigan) ko'rinishi shunday bo'lardi:
      </p>
      <CodeBlock lang="jsx">{`function Salomlash() {
  return (
    <div>
      <h1>Salom, Aziz!</h1>
      <button>Bosish soni: 0</button>
    </div>
  )
}`}</CodeBlock>
      <p>
        Diqqat: bu komponent hozircha hech narsani hisoblamaydi — u faqat "boshlang'ich holatda
        ekran qanday ko'rinishi kerak" degan tasvirni beradi. Sonni haqiqatan oshirib borishni esa
        komponentga "eslab qolish" qobiliyati kerak, va aynan shu joyda hooklar ishga tushadi.
      </p>

      <h2>Funksional komponent — React kodi shunday yoziladi</h2>
      <p>
        Zamonaviy React'da komponentlar shunchaki JSX qaytaradigan oddiy JavaScript funksiyalari
        sifatida yoziladi — buni "funksional komponent" (function component) deb atashadi. Bu
        React kodini yozishning yagona keng tarqalgan usuli: alohida "eski" yoki "yangi" usul
        haqida o'ylashning hojati yo'q — funksiya yozib, undan JSX qaytarish kifoya.
      </p>
      <Callout type="note" title="Yodda tuting">
        Komponent nomi doim katta harf bilan boshlanadi (<code>Sarlavha</code>,{' '}
        <code>Salomlash</code>) — buning sababini keyingi darsda ko'rib chiqamiz. Hozircha shu
        odatga rioya qiling.
      </Callout>

      <h2>Hook degani nima?</h2>
      <p>
        Hook — nomi <code>use</code> bilan boshlanadigan maxsus funksiya (<code>useState</code>,{' '}
        <code>useEffect</code> va boshqalar), u funksional komponentga React'ning ichki
        imkoniyatlaridan foydalanish yo'lini ochadi: masalan, komponentga qandaydir qiymatni
        "eslab qolish" yoki tashqi dunyo (masalan, taymer yoki tarmoq so'rovi) bilan
        sinxronlashish imkonini beradi. Yuqoridagi tugmani haqiqatan ishlaydigan qilib ko'raylik:
      </p>
      <CodeBlock lang="jsx">{`import { useState } from 'react'

function Hisoblagich() {
  const [soni, setSoni] = useState(0)

  return <button onClick={() => setSoni(soni + 1)}>Bosish soni: {soni}</button>
}`}</CodeBlock>
      <p>
        Bu yerda <code>useState(0)</code> — bitta hook chaqiruvi. U <code>Hisoblagich</code>{' '}
        komponentiga <code>soni</code> degan qiymatni ikkita renderlar orasida ham eslab qolishga
        yordam beradi, <code>setSoni</code> esa uni o'zgartirish uchun berilgan funksiya.{' '}
        <code>useState</code>ning ichida qanday ishlashini keyingi darslarda batafsil
        o'rganamiz — hozircha shuni bilish kifoya: hook'lar aynan funksional komponentlarga
        React'ning "xotira" va boshqa imkoniyatlaridan foydalanish yo'lini ochadi.
      </p>
      <Callout type="note" title="Nomlash odati">
        Barcha React hooklari nomi <code>use</code> bilan boshlanadi: <code>useState</code>,{' '}
        <code>useEffect</code>, <code>useRef</code> va hokazo. Kodda <code>use...</code> ko'rgan
        joyingizda — bu hook chaqirilganini bildiradi.
      </Callout>
      <Callout type="warning" title="Keng tarqalgan xato">
        React komponenti ichida <code>document.getElementById</code> yoki shunga o'xshash
        usullar bilan DOM'ni to'g'ridan-to'g'ri qo'lda o'zgartirmang. React DOM'ni o'zi
        boshqaradi, va uning "orqasidan" qo'lda aralashish kutilmagan xatolarga olib kelishi
        mumkin. Buning o'rniga ekran qanday ko'rinishi kerakligini tasvirlab bering — qolganini
        React o'ziga qoldirsin.
      </Callout>

      <Quiz
        question="Sonni oshirish uchun ikki usul bor: (1) button.textContent'ni har bosishda qo'lda yangilash, (2) soni qiymatini useState orqali saqlab, JSX'da {soni} deb yozish. Ikkinchi usul qanday yondashuv deb ataladi?"
        options={['Deklarativ', 'Rekursiv', 'Statik', 'Asenkron']}
        correctIndex={0}
        explanation="Ikkinchi usulda biz UI qanday ko'rinishi kerakligini tasvirlaymiz (deklarativ), DOM'ni qadam-baqadam qo'lda yangilashni esa React'ning o'ziga topshiramiz."
      />

      <Exercise title="Mashq">
        <p>
          Quyidagi UI'ni tasvirlaydigan <code>Kutubxona</code> nomli funksional komponent yozing:
          sahifada <code>{'<h1>Kutubxona</h1>'}</code> sarlavhasi va uning ostida{' '}
          <code>{'<p>Xush kelibsiz!</p>'}</code> matni chiqishi kerak.
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

      <KeyPoints>
        <li>
          Komponent — ekranda biror narsa chiqaradigan, qayta ishlatiladigan oddiy JavaScript
          funksiyasi; React ilovasi komponentlar daraxtidan tashkil topadi.
        </li>
        <li>
          React deklarativ: siz ekran qanday ko'rinishi kerakligini tasvirlaysiz, DOM'ni
          qadam-baqadam qo'lda yangilash esa React'ning zimmasida.
        </li>
        <li>
          Zamonaviy React kodi to'liq funksional komponentlar va hooklar yordamida yoziladi.
        </li>
        <li>
          Hook — nomi <code>use</code> bilan boshlanadigan maxsus funksiya (<code>useState</code>
          , <code>useEffect</code> va h.k.), u komponentga qiymatni eslab qolish yoki tashqi
          dunyo bilan sinxronlashish kabi imkoniyatlarni ochadi.
        </li>
        <li>
          Komponent ichida DOM'ni qo'lda o'zgartirmang — bu React'ning ishi, siz esa faqat
          natijani tasvirlaysiz.
        </li>
      </KeyPoints>
    </>
  )
}
