import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "DevTools va CSS debug qilish",
  section: "Professional CSS",
}

export default function DevtoolsDebuggingLesson() {
  return (
    <>
      <p>
        Professional frontend dasturchi va boshlovchi o'rtasidagi katta farq: birinchisi
        "nima uchun ishlamayapti?" degan savolga tez javob topa oladi. Buning asosiy vositasi
        — brauzer DevTools'i (F12 yoki o'ng tugma → Inspect).
      </p>

      <h2>Elements paneli</h2>
      <ul>
        <li><strong>Elementni tanlash:</strong> chapdagi strelka ikonkasi bilan sahifadagi istalgan elementni bosing.</li>
        <li><strong>Styles paneli:</strong> elementga tegishli barcha qoidalar, aniqlik bo'yicha tartiblangan. Bekor qilingan xossalar chizilgan holda ko'rinadi.</li>
        <li><strong>Computed:</strong> brauzer hisoblagan yakuniy qiymatlar va quti modeli diagrammasi.</li>
        <li>Qiymatlarni to'g'ridan-to'g'ri o'zgartirib ko'ring: fayl o'zgarmaydi, natijani darhol ko'rasiz.</li>
      </ul>
      <Callout type="tip" title="Foydali usullar">
        Rang kvadratiga bosing: rang tanlagich ochiladi va kontrast nisbati ko'rinadi.
        Xossa qiymatini o'q tugmalari (yuqoriga/pastga) bilan o'zgartirib, natijani
        real vaqtda kuzating.
      </Callout>

      <h2>"CSSim ishlamayapti" tekshiruv ro'yxati</h2>
      <ol>
        <li><strong>Selektor to'g'rimi?</strong> Elementni tanlab, Styles panelida qoidangiz ro'yxatda bormi, ko'ring.</li>
        <li><strong>Bekor qilinganmi?</strong> Xossa chizilgan bo'lsa, boshqa qoida uni yengyapti (aniqlik yoki tartib).</li>
        <li><strong>Yozuv xatosi?</strong> Noto'g'ri xossa yoki qiymat sariq ogohlantirish belgisi bilan ko'rsatiladi.</li>
        <li><strong>Fayl yuklanganmi?</strong> Network panelida CSS fayl 200 status bilan yuklanganini tekshiring; kesh muammosi bo'lsa, Ctrl/Cmd+Shift+R.</li>
        <li><strong>Xossa mos elementgami?</strong> Masalan, <code>width</code> <code>inline</code> elementda, <code>z-index</code> <code>static</code> elementda ta'sir qilmaydi.</li>
      </ol>

      <h2>Maketni tekshirish</h2>
      <ul>
        <li><strong>Flex/Grid belgisi:</strong> Elements panelida elementning yonidagi <code>flex</code> yoki <code>grid</code> yorlig'iga bosing: chiziqlar va oraliqlar sahifada chiziladi.</li>
        <li><strong>Quti modeli:</strong> Computed panelida margin, border, padding va content o'lchamlarini ko'ring.</li>
        <li><strong>Toshib ketish:</strong> sahifada gorizontal aylantirish paydo bo'lsa, qaysi element kengroq ekanini topish uchun uni vaqtincha ajratib ko'ring.</li>
      </ul>
      <CodeBlock lang="css">{`/* Toshib ketayotgan elementni topish uchun vaqtinchalik qoida */
* {
  outline: 1px solid rgba(255, 0, 0, 0.3);
}`}</CodeBlock>
      <p>
        Bu qoida hamma elementga qizil kontur chizadi. Muammoni topgach, uni olib tashlashni
        unutmang.
      </p>

      <h2>Responsive sinash</h2>
      <ul>
        <li><strong>Device toolbar</strong> (Ctrl/Cmd+Shift+M): turli telefon va planshet o'lchamlarini simulyatsiya qiladi.</li>
        <li>Sahifani sichqoncha bilan torayting va maket "sinadigan" joyni toping: shu yerga breakpoint qo'ying.</li>
        <li>Rendering paneli: <code>prefers-color-scheme</code> va <code>prefers-reduced-motion</code>ni qo'lda yoqib sinash mumkin.</li>
      </ul>

      <h2>Accessibility va samaradorlik</h2>
      <ul>
        <li><strong>Accessibility paneli:</strong> elementning ekran o'quvchiga qanday ko'rinishini ko'rsatadi.</li>
        <li><strong>Lighthouse:</strong> accessibility, SEO, tezlik bo'yicha ball va tavsiyalar beradi.</li>
        <li><strong>Performance:</strong> animatsiya paytida kadrlar tushib ketishini aniqlaydi.</li>
      </ul>

      <Quiz
        question="DevTools'ning Styles panelida xossa chizilgan (strikethrough) ko'rinsa, bu nimani anglatadi?"
        options={[
          "Xossa yozuv xatosi bilan yozilgan",
          "Boshqa qoida uni bekor qilgan",
          "Xossa yangi",
          "Brauzer uni qo'llab-quvvatlamaydi",
        ]}
        correctIndex={1}
        explanation="Chizilgan xossa boshqa, aniqligi yuqori yoki keyin yozilgan qoida tomonidan bekor qilinganini bildiradi. Yozuv xatosi esa sariq ogohlantirish belgisi bilan ko'rsatiladi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Xatoni toping">
        <p>
          Quyidagi kodda <code>.markaz</code> elementi vertikal markazlashmayapti. DevTools
          ochsangiz nimani tekshirgan bo'lardingiz va tuzatish qanday?
        </p>
        <CodeBlock lang="css">{`.markaz {
  display: flex;
  justify-content: center;
  align-items: center;
}`}</CodeBlock>
        <Solution>
          <p>
            Ota-elementning balandligi bor-yo'qligini tekshirardim (Computed paneli). Agar
            balandlik faqat kontent o'lchamiga teng bo'lsa, vertikal markazlash ko'zga
            tashlanmaydi. Yechim: balandlik berish.
          </p>
          <CodeBlock lang="css">{`.markaz {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Elements → Styles paneli qaysi qoida qo'llanayotganini va nima bekor qilinganini ko'rsatadi.</li>
        <li>Tekshiruv ro'yxati: selektor, bekor qilinish, yozuv xatosi, fayl yuklanishi, mos element turi.</li>
        <li>Flex/Grid belgilari va quti modeli diagrammasi maket muammolarini tez topadi.</li>
        <li>Device toolbar bilan turli ekranlarda sinang.</li>
      </KeyPoints>
    </>
  )
}
