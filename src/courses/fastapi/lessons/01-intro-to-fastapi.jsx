import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'FastAPI bilan tanishuv',
  section: "FastAPI'ga kirish",
}

export default function IntroToFastApiLesson() {
  return (
    <>
      <p>
        Ushbu kursda biz <strong>Contact App API</strong> — kontaktlar kitobi uchun to'liq
        ishlaydigan backend server — yozamiz. Har bir dars oldingisining ustiga quriladi, toki
        oxirida haqiqiy ma'lumotlar bazasi, validatsiya va toza tuzilmaga ega bo'lgan API
        tayyor bo'lguncha. Boshlash uchun sizga asosiy Python (funksiyalar, o'zgaruvchilar,
        dict/list) yetarli.
      </p>

      <h2>API va Backend nima?</h2>
      <p>
        Tasavvur qiling — siz Instagram ilovasini ochdingiz. Ekranda rasmlar, ismlar, like'lar
        ko'rinadi. Bu ma'lumotlar qayerdan keladi?
      </p>
      <p>
        Bu ma'lumotlar sizning telefoningizda emas — ular uzoqdagi bir <strong>serverda</strong>{' '}
        saqlanadi. Instagram ilovasi (bu <strong>client</strong> — mijoz deb ataladi) serverga
        "menga shu foydalanuvchining postlarini ber" deb <strong>so'rov (request)</strong>{' '}
        yuboradi. Server bu so'rovni qayta ishlaydi va <strong>javob (response)</strong>{' '}
        qaytaradi — odatda JSON formatida.
      </p>
      <CodeBlock lang="text">{`[ Mobil ilova / Brauzer ]  --- so'rov (request) --->  [ Backend server ]
      (client)             <--- javob (response) ---       (bizning kod)`}</CodeBlock>
      <p>
        Ana shu server tomonidagi kodni yozish — <strong>backend dasturlash</strong> deyiladi.
        Va client bilan server o'rtasidagi "gaplashish qoidalari" — bu{' '}
        <strong>API (Application Programming Interface)</strong> deb ataladi. Biz ushbu kursda
        aynan shu backend qismini — ya'ni serverni — Python tilida, <strong>FastAPI</strong>{' '}
        freymvorki yordamida yozishni o'rganamiz.
      </p>

      <h2>Nega aynan FastAPI?</h2>
      <p>
        Python'da backend yozish uchun bir nechta freymvork bor (Django, Flask, FastAPI). Biz
        FastAPI'ni tanlaymiz, chunki:
      </p>
      <ul>
        <li>
          <strong>Tez</strong> — ishlash tezligi bo'yicha Python freymvorklari orasida eng
          yaxshilaridan biri.
        </li>
        <li>
          <strong>Avtomatik hujjatlar</strong> — kod yozishning o'zida, hech qanday qo'shimcha
          ish qilmasdan, chiroyli va interaktiv API hujjatlari avtomatik yaratiladi (buni bugun
          ko'ramiz — bu juda "vau" effekt beradi).
        </li>
        <li>
          <strong>Zamonaviy</strong> — siz allaqachon bilgan Python type hint'laridan (
          <code>str</code>, <code>int</code>, va h.k.) foydalanib, ma'lumotlarni tekshiradi.
        </li>
        <li>
          <strong>Sanoatda keng qo'llaniladi</strong> — Microsoft, Netflix, Uber kabi kompaniyalar
          FastAPI'dan foydalanadi.
        </li>
      </ul>

      <h2>Muhitni sozlash</h2>
      <p>
        Kompyuteringizda Python 3.12 yoki undan yangi versiya o'rnatilgan bo'lishi kerak.
        Tekshirib ko'ring:
      </p>
      <CodeBlock lang="bash">{`python3 --version`}</CodeBlock>
      <p>
        Biz paketlarni o'rnatish uchun <code>uv</code> degan vositadan foydalanamiz. Bu{' '}
        <code>pip</code> va virtual environment yaratishning o'rnini bosadigan, juda tez
        ishlaydigan zamonaviy vosita hisoblanadi. O'rnatish (agar hali o'rnatilmagan bo'lsa) —
        operatsion tizimingizga mos usulni tanlang:
      </p>
      <CodeBlock lang="bash">{`# macOS / Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# macOS (Homebrew o'rnatilgan bo'lsa)
brew install uv`}</CodeBlock>
      <CodeBlock lang="text">{`# Windows (PowerShell)
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`}</CodeBlock>
      <Callout type="tip" title="Bilib oling">
        Uchala usul ham bir xil natijaga olib keladi — shunchaki qaysi operatsion tizim va qaysi
        vositalar (masalan, Homebrew) sizda allaqachon o'rnatilganiga qarab birini tanlang. Agar
        Mac'ingizda Homebrew bo'lsa, u orqali o'rnatish keyinchalik yangilashni (
        <code>brew upgrade uv</code>) ham osonlashtiradi.
      </Callout>
      <p>O'rnatilganini tekshiring:</p>
      <CodeBlock lang="bash">{`uv --version`}</CodeBlock>
      <Callout type="tip" title="Bilib oling">
        Nega <code>pip</code> emas, <code>uv</code>? <code>pip</code> ham ishlaydi, lekin{' '}
        <code>uv</code> ancha tezroq va paketlarni, virtual environment'ni, hatto Python
        versiyasini ham bitta vosita orqali boshqarish imkonini beradi. Hozirgi zamonaviy Python
        loyihalarining ko'pchiligi <code>uv</code>ga o'tmoqda.
      </Callout>
      <p>
        <code>contact-app</code> papkasiga o'ting va loyihani ishga tushiring:
      </p>
      <CodeBlock lang="bash">{`mkdir -p contact-app
cd contact-app
uv init --no-readme .
uv add fastapi uvicorn`}</CodeBlock>
      <p>Bu buyruqlar nima qiladi?</p>
      <ul>
        <li>
          <code>uv init</code> — loyiha uchun kerakli fayllarni (<code>pyproject.toml</code>)
          yaratadi.
        </li>
        <li>
          <code>uv add fastapi uvicorn</code> — <code>fastapi</code> (freymvorkning o'zi) va{' '}
          <code>uvicorn</code> (serverni ishga tushiruvchi dastur) paketlarini o'rnatadi va
          avtomatik virtual environment yaratadi.
        </li>
      </ul>
      <Callout type="tip" title="Bilib oling">
        FastAPI — bu faqat "qoidalar to'plami" (qanday route yozish, qanday validatsiya qilish
        kerakligini biladi), lekin u o'zi internet so'rovlarini qabul qilolmaydi. Buning uchun{' '}
        <strong>ASGI server</strong> kerak — biz <code>uvicorn</code>dan foydalanamiz. Bu xuddi
        mashina (FastAPI) va uni haydovchi (uvicorn) kabi — ikkalasi ham kerak.
      </Callout>

      <h2>Birinchi FastAPI ilovamiz</h2>
      <p>
        <code>contact-app</code> papkasi ichida <code>main.py</code> faylini oching (yoki
        yarating) va quyidagi kodni yozing:
      </p>
      <CodeBlock lang="python">{`from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Contact App API ishga tushdi!"}


@app.get("/ping")
def ping():
    return {"status": "ok"}`}</CodeBlock>
      <p>
        Bor-yo'g'i 8 qator kod bilan biz to'liq ishlaydigan veb-server yozdik! Keling, har bir
        qismini tushunib olamiz:
      </p>
      <ul>
        <li>
          <code>from fastapi import FastAPI</code> — FastAPI kutubxonasidan asosiy klassni import
          qilamiz.
        </li>
        <li>
          <code>app = FastAPI()</code> — ilovamizning "yuragi" bo'lgan obyektni yaratamiz. Butun
          ilova shu <code>app</code> obyekti atrofida quriladi.
        </li>
        <li>
          <code>@app.get("/")</code> — bu <strong>decorator</strong> deb ataladi (Python'da
          funksiya ustiga yoziladigan maxsus belgi). U FastAPI'ga shuni aytadi: "Kimdir{' '}
          <code>/</code> manziliga GET so'rovi yuborsa, quyidagi funksiyani chaqir."
        </li>
        <li>
          <code>def read_root():</code> — oddiy Python funksiyasi. Uning nomi ixtiyoriy, lekin
          ma'noli nom tanlash yaxshi odat.
        </li>
        <li>
          <code>return {'{'}"message": ...{'}'}</code> — funksiya Python dict qaytaradi. FastAPI
          buni avtomatik ravishda <strong>JSON</strong> formatiga o'giradi va clientga javob
          sifatida yuboradi.
        </li>
      </ul>
      <p>
        Bu yerda <code>@app.get("/")</code> va <code>@app.get("/ping")</code> —{' '}
        <strong>path operation</strong> (yo'l amali) deb ataladi. "Path" — manzil (<code>/</code>,{' '}
        <code>/ping</code>), "operation" — HTTP metodi (<code>GET</code>).
      </p>

      <table className="my-4 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-canvas-muted">
            <th className="p-3 font-semibold text-ink">Metod</th>
            <th className="p-3 font-semibold text-ink">Vazifasi</th>
            <th className="p-3 font-semibold text-ink">Bizning misolda</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>GET</code>
            </td>
            <td className="p-3 text-ink-muted">ma'lumot olish uchun</td>
            <td className="p-3 text-ink-muted">kontaktlar ro'yxatini ko'rish</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>POST</code>
            </td>
            <td className="p-3 text-ink-muted">yangi ma'lumot yaratish uchun</td>
            <td className="p-3 text-ink-muted">yangi kontakt qo'shish</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>PUT</code>
            </td>
            <td className="p-3 text-ink-muted">ma'lumotni yangilash uchun</td>
            <td className="p-3 text-ink-muted">kontaktni to'liq yangilash</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>DELETE</code>
            </td>
            <td className="p-3 text-ink-muted">ma'lumotni o'chirish uchun</td>
            <td className="p-3 text-ink-muted">kontaktni o'chirish</td>
          </tr>
        </tbody>
      </table>
      <p>
        Bugun biz faqat <code>GET</code> bilan tanishamiz. Qolganlarini 3-darsda, CRUD amallarini
        yozayotganda chuqur o'rganamiz.
      </p>

      <h2>Serverni ishga tushirish</h2>
      <p>Terminalda quyidagi buyruqni yozing:</p>
      <CodeBlock lang="bash">{`uv run uvicorn main:app --reload`}</CodeBlock>
      <p>Bu buyruq nima anglatadi?</p>
      <ul>
        <li>
          <code>main:app</code> — <code>main.py</code> faylidagi <code>app</code> degan obyektni
          ishga tushir, degani.
        </li>
        <li>
          <code>--reload</code> — kodga o'zgartirish kiritganingizda, server avtomatik qayta ishga
          tushadi. Bu development (ishlab chiqish) paytida juda qulay — har safar serverni qo'lda
          to'xtatib, qayta yoqishning hojati yo'q.
        </li>
      </ul>
      <p>Agar hammasi to'g'ri bo'lsa, terminalda shunga o'xshash yozuv ko'rasiz:</p>
      <CodeBlock lang="text">{`INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Application startup complete.`}</CodeBlock>
      <p>
        Endi brauzeringizda <code>http://127.0.0.1:8000</code> manzilini oching. Ekranda shu
        ko'rinishi kerak:
      </p>
      <CodeBlock lang="json">{`{"message": "Contact App API ishga tushdi!"}`}</CodeBlock>
      <p>Tabriklaymiz — sizning birinchi backend serveringiz ishlayapti!</p>

      <h2>Avtomatik hujjatlar — FastAPI'ning "sehri"</h2>
      <p>
        Endi eng qiziqarli qismga o'tamiz. Brauzerda <code>http://127.0.0.1:8000/docs</code>{' '}
        manzilini oching.
      </p>
      <p>
        Siz <strong>Swagger UI</strong> deb ataladigan, to'liq interaktiv API hujjatini ko'rasiz —
        biz yozgan har bir endpoint (<code>/</code> va <code>/ping</code>) shu yerda avtomatik
        paydo bo'ladi! Siz hech qanday hujjat yozmadingiz, lekin FastAPI kodingizni o'qib, o'zi
        hujjat yaratdi.
      </p>
      <p>
        <code>/ping</code> yozuvi ustiga bosing → "Try it out" → "Execute" tugmasini bosing. Siz
        to'g'ridan-to'g'ri brauzerdan, kod yozmasdan, o'z API'ingizni sinab ko'rishingiz mumkin!
      </p>
      <p>
        Yana bir manzilni ham ko'ring: <code>http://127.0.0.1:8000/redoc</code>. Bu —{' '}
        <strong>ReDoc</strong> deb ataladigan, boshqacharoq ko'rinishdagi hujjat sahifasi.
        Ikkalasi ham bir xil ma'lumotdan (sizning kodingizdan) avtomatik yaratiladi.
      </p>
      <Callout type="tip" title="Bilib oling">
        Bu hujjatlar <strong>OpenAPI</strong> degan standart asosida yaratiladi. Katta
        kompaniyalarda frontend dasturchilar backend tugashini kutmasdan, shu <code>/docs</code>{' '}
        sahifasiga qarab, API qanday ishlashini tushunib, o'z ishlarini boshlashlari mumkin.
      </Callout>

      <h2>
        <code>async def</code> haqida qisqacha
      </h2>
      <p>
        Ba'zi FastAPI misollarida <code>def read_root():</code> o'rniga{' '}
        <code>async def read_root():</code> yozilganini ko'rasiz. Hozircha ikkalasi ham xuddi shu
        tarzda ishlayveradi — farqini keyingi darslarda, ma'lumotlar bazasi bilan ishlashni
        boshlaganimizda chuqurroq tushuntiramiz. Hozircha shuni bilib qo'ying:
      </p>
      <ul>
        <li>
          <code>async def</code> — funksiya "kutish" (masalan, ma'lumotlar bazasidan javob
          kutish) kerak bo'lganda, shu vaqtda server boshqa so'rovlarni ham qayta ishlay olishini
          anglatadi.
        </li>
        <li>Oddiy def ham FastAPI'da to'liq ishlaydi, chunki FastAPI buni orqa fonda o'zi to'g'ri boshqaradi.</li>
      </ul>
      <p>Hozircha oddiy def bilan davom etamiz.</p>

      <Quiz
        question="Nega FastAPI ilovasini ishga tushirish uchun alohida uvicorn kerak?"
        options={[
          "FastAPI internet so'rovlarini qabul qila olmaydi, buning uchun ASGI server kerak",
          'uvicorn kodni tezroq yozishga yordam beradi',
          'FastAPI faqat uvicorn bilan birga sotiladi',
          "uvicorn - bu FastAPI'ning eski nomi",
        ]}
        correctIndex={0}
        explanation="FastAPI faqat qoidalar to'plami (routing, validatsiya) - u o'zi tarmoq so'rovlarini qabul qilolmaydi. uvicorn - bu ASGI server bo'lib, haqiqiy so'rovlarni qabul qilib, FastAPI'ga uzatadi."
      />

      <Exercise title="Mustaqil mashq">
        <p>
          Keyingi darsga o'tishdan oldin, quyidagilarni o'zingiz bajarib ko'ring (bu darsni
          chinakam tushunib-tushunmaganingizni tekshirib beradi):
        </p>
        <ul>
          <li>
            <code>main.py</code> fayliga yana bitta yangi endpoint qo'shing: <code>/about</code>,
            u <code>{'{'}"team": "Contact App tutorial", "version": "0.1"{'}'}</code> degan javob
            qaytarsin.
          </li>
          <li>
            <code>/hello/world</code> degan manzil yarating (hozircha manzil ichida o'zgaruvchi
            ishlatmasdan, oddiy statik matn bilan) — u{' '}
            <code>{'{'}"message": "Salom, Dunyo!"{'}'}</code> qaytarsin.
          </li>
          <li>
            Serverni qayta ishga tushirmasdan (<code>--reload</code> yoqilgan bo'lgani uchun)
            brauzerni yangilab, yangi endpointlaringiz <code>/docs</code> sahifasida avtomatik
            paydo bo'lganini tekshiring.
          </li>
        </ul>
        <Solution>
          <CodeBlock lang="python">{`from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Contact App API ishga tushdi!"}


@app.get("/ping")
def ping():
    return {"status": "ok"}


@app.get("/about")
def about():
    return {"team": "Contact App tutorial", "version": "0.1"}


@app.get("/hello/world")
def hello_world():
    return {"message": "Salom, Dunyo!"}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>API — client va server o'rtasidagi "gaplashish qoidalari"; backend bu server tomonidagi kod.</li>
        <li>FastAPI — tez, zamonaviy va avtomatik hujjatlarga ega Python backend freymvorki.</li>
        <li>
          <code>uv</code> — paketlarni o'rnatish va virtual environment yaratish uchun zamonaviy
          vosita.
        </li>
        <li>
          <code>app = FastAPI()</code> va <code>@app.get(...)</code> — birinchi path operation'larni
          yaratish uchun kerak bo'ladigan minimal kod.
        </li>
        <li>
          <code>uvicorn</code> — ASGI server, FastAPI ilovasini haqiqiy so'rovlarga ulaydi.
        </li>
        <li>
          <code>/docs</code> va <code>/redoc</code> — kod yozgan zahotingiz avtomatik yaratiladigan
          interaktiv API hujjatlari.
        </li>
      </KeyPoints>
    </>
  )
}
