import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Rasm, video va audio",
  section: "Chuqur HTML",
}

export default function ResponsiveMediaLesson() {
  return (
    <>
      <p>
        Media fayllar sahifa og'irligining ko'p qismini tashkil qiladi. Telefonga 3000
        piksellik rasm yuborish trafik va vaqt isrofi. HTML bunga tayyor yechimlar beradi.
      </p>

      <h2>srcset va sizes</h2>
      <p>
        Bir rasmning bir nechta o'lchamini bering, brauzer qurilmaga mosini tanlaydi.
      </p>
      <CodeBlock lang="html">{`<img
  src="rasm-800.jpg"
  srcset="rasm-400.jpg 400w, rasm-800.jpg 800w, rasm-1600.jpg 1600w"
  sizes="(min-width: 1024px) 800px, 100vw"
  alt="Tog' manzarasi"
  width="800"
  height="533"
  loading="lazy"
/>`}</CodeBlock>
      <ul>
        <li><code>srcset</code> — variantlar ro'yxati va ularning haqiqiy kengligi (<code>w</code>).</li>
        <li><code>sizes</code> — rasm sahifada qancha joy egallashi.</li>
        <li><code>width</code>/<code>height</code> — aspect ratio'ni oldindan bildiradi, sahifa "sakramaydi" (CLS).</li>
        <li><code>loading="lazy"</code> — ekranga yaqinlashguncha yuklamaydi. Sahifa tepasidagi asosiy rasmda ishlatmang.</li>
      </ul>

      <h2>picture: format va dizayn tanlash</h2>
      <CodeBlock lang="html">{`<picture>
  <source srcset="rasm.avif" type="image/avif" />
  <source srcset="rasm.webp" type="image/webp" />
  <source media="(max-width: 600px)" srcset="rasm-kvadrat.jpg" />
  <img src="rasm.jpg" alt="Kofe finjoni" width="1200" height="800" />
</picture>`}</CodeBlock>
      <p>
        Brauzer <code>source</code>larni yuqoridan pastga ko'radi va birinchi mosini oladi.{' '}
        <code>img</code> zaxira va majburiy: <code>alt</code> ham shu yerda yoziladi. Bu
        yondashuv ikki holatda kerak: zamonaviy format (AVIF, WebP) berish va turli ekranga
        turlicha kadrlangan rasm (art direction) berish.
      </p>
      <Callout type="tip" title="CSS bilan">
        Rasmni konteynerga sig'dirish uchun: <code>img {`{ max-width: 100%; height: auto; }`}</code>.
        Rasmni to'ldirib, proporsiyani buzmasdan kesish uchun: <code>object-fit: cover</code>.
      </Callout>

      <h2>Video va audio</h2>
      <CodeBlock lang="html">{`<video controls width="640" poster="preview.jpg" preload="metadata">
  <source src="taqdimot.webm" type="video/webm" />
  <source src="taqdimot.mp4" type="video/mp4" />
  <track kind="captions" src="taqdimot-uz.vtt" srclang="uz" label="O'zbekcha" />
  Brauzeringiz video teglarini qo'llab-quvvatlamaydi.
</video>

<audio controls src="podcast.mp3"></audio>`}</CodeBlock>
      <ul>
        <li><code>controls</code> — brauzerning standart boshqaruvi.</li>
        <li><code>poster</code> — video boshlanmaguncha ko'rsatiladigan rasm.</li>
        <li><code>track</code> — subtitr; eshitish qiyin foydalanuvchilar uchun muhim.</li>
        <li><code>autoplay</code> ovozli videoda odatda bloklanadi va foydalanuvchini bezovta qiladi. <code>muted</code> bilan birga ishlatilsa ishlaydi.</li>
      </ul>

      <h2>SVG</h2>
      <p>
        Ikonka va logotip uchun SVG eng yaxshi: sifat yo'qolmaydi, hajmi kichik va CSS bilan
        rangini o'zgartirish mumkin (agar inline yozilsa).
      </p>
      <CodeBlock lang="html">{`<svg viewBox="0 0 24 24" width="24" height="24" role="img" aria-label="Qidiruv">
  <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2" />
  <path d="M20 20l-4-4" stroke="currentColor" stroke-width="2" />
</svg>`}</CodeBlock>
      <p>
        <code>currentColor</code> ikonka rangini atrofdagi matn rangidan oladi.
      </p>

      <Quiz
        question="Brauzerga bir necha o'lchamdagi rasmdan mosini tanlash imkonini beradigan atribut qaysi?"
        options={["srcset", "alt", "poster", "preload"]}
        correctIndex={0}
        explanation="srcset rasmning turli o'lchamli variantlarini beradi, brauzer ekran o'lchami va zichligiga qarab eng mosini yuklaydi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Optimal rasm">
        <p>
          Sahifa o'rtasidagi rasm uchun <code>picture</code> yozing: WebP manba, 600px
          gacha ekranda kvadrat variant va zaxira JPG. Lazy loading yoqing va o'lchamlarni
          belgilang.
        </p>
        <Solution>
          <CodeBlock lang="html">{`<picture>
  <source srcset="mahsulot.webp" type="image/webp" />
  <source media="(max-width: 600px)" srcset="mahsulot-kvadrat.jpg" />
  <img
    src="mahsulot.jpg"
    alt="Qo'lda ishlangan sopol kosa"
    width="1200"
    height="800"
    loading="lazy"
  />
</picture>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>srcset</code>/<code>sizes</code> qurilmaga mos o'lchamdagi rasmni beradi.</li>
        <li><code>picture</code> — zamonaviy formatlar va art direction uchun.</li>
        <li><code>width</code>/<code>height</code> va <code>loading="lazy"</code> tezlik va barqarorlikka yordam beradi.</li>
        <li>Videoga subtitr (<code>track</code>) qo'shing, SVG ikonkalar uchun <code>currentColor</code> ishlating.</li>
      </KeyPoints>
    </>
  )
}
