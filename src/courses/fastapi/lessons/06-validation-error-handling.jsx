import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Ma'lumotni chuqurroq tekshirish va izchil xatolar",
  section: 'Validatsiya va xato boshqaruvi',
}

export default function ValidationErrorHandlingLesson() {
  return (
    <>
      <h2>Hozirgi holatdagi teshik</h2>
      <p>
        Hozircha <code>email: str | None</code> va <code>phone: str</code> — bu ikkalasi ham{' '}
        <strong>oddiy matn</strong>. Demak, quyidagilarning barchasi hozircha "to'g'ri" deb qabul
        qilinadi:
      </p>
      <ul>
        <li>
          <code>email: "salom"</code> — @ belgisi ham yo'q, lekin baza buni qabul qiladi.
        </li>
        <li>
          <code>phone: "12345"</code> — bu telefon raqamiga o'xshamaydi ham, lekin xato bermaydi.
        </li>
        <li>
          <code>full_name: "   "</code> — faqat bo'shliqlardan iborat "ism".
        </li>
      </ul>
      <p>
        Bugun bularning barchasini to'g'irlaymiz — va bonus sifatida, butun ilovamizdagi{' '}
        <strong>barcha</strong> xato javoblarini (404 ham, 422 ham) bir xil, izchil ko'rinishga
        keltiramiz.
      </p>

      <h2>
        Email: <code>EmailStr</code>
      </h2>
      <p>
        Pydantic'da email formatini tekshirish uchun tayyor tur mavjud — <code>EmailStr</code>.
        Buni ishlatish uchun qo'shimcha kutubxona kerak:
      </p>
      <CodeBlock lang="bash">{`uv add email-validator`}</CodeBlock>
      <p>Endi modelimizda:</p>
      <CodeBlock lang="python">{`from pydantic import EmailStr

class ContactBase(SQLModel):
    # ...
    email: EmailStr | None = None`}</CodeBlock>
      <p>
        Bor-yo'g'i turni <code>str</code>dan <code>EmailStr</code>ga o'zgartirdik. Endi noto'g'ri
        email yuborilsa:
      </p>
      <CodeBlock lang="json">{`POST /contacts  {"full_name": "Ali Valiyev", "phone": "+998901234567", "email": "not-an-email"}`}</CodeBlock>
      <CodeBlock lang="json">{`// 422
{
  "detail": [
    {
      "type": "value_error",
      "loc": ["body", "email"],
      "msg": "value is not a valid email address: An email address must have an @-sign.",
      "input": "not-an-email"
    }
  ]
}`}</CodeBlock>
      <p>
        Diqqat qiling — xato xabari hatto <strong>nima yetishmayotganini aniq tushuntiradi</strong>{' '}
        ("@-sign yo'q"). Buning uchun biz hech qanday kod yozmadik.
      </p>

      <h2>
        O'z tekshiruv qoidamizni yozish: <code>@field_validator</code>
      </h2>
      <p>
        <code>EmailStr</code> tayyor yechim, lekin telefon raqami uchun tayyor Pydantic turi yo'q
        — chunki har mamlakatda format boshqacha. Bizga <strong>o'zimizning qoidamizni</strong>{' '}
        yozish kerak. Buning uchun Pydantic'ning <code>@field_validator</code> decoratoridan
        foydalanamiz:
      </p>
      <CodeBlock lang="python">{`import re
from pydantic import field_validator

PHONE_PATTERN = re.compile(r"^\\+998\\d{9}$")


class ContactBase(SQLModel):
    full_name: str = Field(min_length=2, max_length=100)
    phone: str
    email: EmailStr | None = None
    notes: str | None = None
    is_favorite: bool = False

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        if not PHONE_PATTERN.fullmatch(value):
            raise ValueError("Telefon raqam +998XXXXXXXXX shaklida bo'lishi kerak")
        return value`}</CodeBlock>
      <p>Qatordan-qator tushunamiz:</p>
      <ul>
        <li>
          <code>re.compile(r"^\+998\d{'{9}'}$")</code> — bu <strong>regex (regular expression /
          muntazam ifoda)</strong> deb ataladi — matn shablonlarini tasvirlash uchun ishlatiladigan
          maxsus til. Hozircha uni to'liq o'rganish shart emas, faqat shu bitta shablonni
          tushunib oling: <code>^</code> — matn boshini bildiradi; <code>\+998</code> — aynan{' '}
          <code>+998</code> matni (backslash <code>\+</code> — chunki <code>+</code> belgisi
          regex'da maxsus ma'no anglatadi, uni "oddiy plyus" deb belgilash uchun oldiga{' '}
          <code>\</code> qo'yamiz); <code>\d{'{9}'}</code> — aynan 9 ta raqam (<code>\d</code> —
          bitta raqam, <code>{'{9}'}</code> — 9 marta takrorlansin); <code>$</code> — matn
          oxirini bildiradi. Ya'ni: "matn aynan <code>+998</code> bilan boshlanib, undan keyin
          aynan 9 ta raqam kelib, shu yerda tugashi kerak" — masalan <code>+998901234567</code>.
        </li>
        <li>
          <code>@field_validator("phone")</code> — bu decorator Pydantic'ga aytadi: "
          <code>phone</code> maydoni tekshirilayotganda, standart tur tekshiruvidan (bu{' '}
          <code>str</code> ekanligini tekshirish) so'ng, qo'shimcha ravishda shu funksiyani ham
          ishga tushir."
        </li>
        <li>
          <code>@classmethod</code> — Pydantic validator funksiyalari doim <code>classmethod</code>{' '}
          bo'lishi kerak (bu qat'iy qoida, hozircha shunchaki yodda tuting).
        </li>
        <li>
          Funksiya ichida — agar qiymat shablonga mos kelmasa,{' '}
          <code>raise ValueError(...)</code> qilamiz. Pydantic bu xatoni avtomatik ushlab,
          to'g'ri validatsiya xatosiga aylantiradi.
        </li>
        <li>
          Agar hammasi joyida bo'lsa, funksiya <strong>tozalangan qiymatni qaytarishi shart</strong>{' '}
          (<code>return value</code>) — aks holda maydon qiymatsiz qolib ketadi.
        </li>
      </ul>
      <Callout type="tip" title="Bilib oling — nega Field(pattern=...) emas, alohida funksiya?">
        To'g'ri, Pydantic'da oddiy shablon tekshiruvlari uchun <code>Field(pattern=...)</code>{' '}
        degan qisqaroq yo'l ham bor. Lekin <code>@field_validator</code> undan ancha kuchliroq:
        unda istalgan Python kodini yoza olasiz — bir nechta shartni tekshirish, xato xabarini
        moslashtirish, yoki (keyingi bo'limda ko'rganimizdek) qiymatni{' '}
        <strong>o'zgartirib qaytarish</strong> ham mumkin. Murakkabroq qoidalar uchun har doim{' '}
        <code>@field_validator</code>ga murojaat qiling.
      </Callout>

      <h2>Ismni "tozalash": validator qiymatni o'zgartirishi ham mumkin</h2>
      <p>
        <code>full_name</code> uchun <code>Field(min_length=2)</code> yetarlimi? Sinab ko'raylik:{' '}
        <code>full_name: "   "</code> (uchta bo'shliq) — uzunligi 3, ya'ni{' '}
        <code>min_length=2</code> shartidan <strong>o'tib ketadi</strong>! Lekin bu aslida bo'sh
        ism, hech qanday ma'noli belgi yo'q.
      </p>
      <p>
        Buni tuzatish uchun yana <code>@field_validator</code>dan foydalanamiz — bu safar u
        qiymatni ham <strong>tekshiradi, ham tozalaydi</strong>:
      </p>
      <CodeBlock lang="python">{`@field_validator("full_name")
@classmethod
def normalize_full_name(cls, value: str) -> str:
    cleaned = value.strip()
    if len(cleaned) < 2:
        raise ValueError("Ism kamida 2 ta belgidan iborat bo'lishi kerak")
    return cleaned`}</CodeBlock>
      <ul>
        <li>
          <code>value.strip()</code> — boshi va oxiridagi bo'shliqlarni olib tashlaydi.
        </li>
        <li>
          Tozalangandan <strong>keyin</strong> uzunlikni tekshiramiz — endi{' '}
          <code>"   "</code> → tozalangach <code>""</code> (bo'sh) bo'ladi, uzunligi 0, demak xato
          beradi. To'g'ri!
        </li>
        <li>
          <code>"  Vali Aliyev  "</code> kabi qiymat esa → tozalangach{' '}
          <code>"Vali Aliyev"</code> bo'lib, <strong>shu tozalangan holda bazaga saqlanadi</strong>.
          Bu — validatorning ikkinchi super-kuchi: u nafaqat tekshiradi, balki ma'lumotni{' '}
          <strong>standartlashtiradi</strong> ham.
        </li>
      </ul>

      <h2>Muammo: hozirgi xato javoblari izchil emas</h2>
      <p>Hozirgacha ko'rgan xatolarimizga qarang:</p>
      <ul>
        <li>
          Validatsiya xatosi (422): <code>{'{'}"detail": [{'{'}"type": ..., "loc": ..., "msg": ...{'}'}]{'}'}</code>
        </li>
        <li>
          <code>HTTPException</code> (404): <code>{'{'}"detail": "Kontakt topilmadi"{'}'}</code>
        </li>
      </ul>
      <p>
        Ikkalasida ham <code>"detail"</code> kaliti bor, lekin birida u <strong>ro'yxat</strong>,
        ikkinchisida oddiy <strong>matn</strong>. Agar siz frontend dasturchisi bo'lganingizda,
        har safar "bu safar <code>detail</code> matnmi yoki ro'yxatmi?" deb tekshirib
        o'tirishingiz kerak bo'lardi — bu noqulay va xato qilish oson.
      </p>
      <p>
        Yaxshi API'lar <strong>barcha</strong> xatolarni bir xil "konvert" (shakl) ichida
        qaytaradi. Keling, shuni quramiz:
      </p>
      <CodeBlock lang="json">{`{
  "error": {
    "status_code": <son>,
    "message": <matn>,
    "details": <qo'shimcha ma'lumot yoki null>
  }
}`}</CodeBlock>

      <h2>
        Global xato handlerlar (<code>exception_handler</code>)
      </h2>
      <p>
        FastAPI'da standart xato ishlov beruvchilarni <strong>butun ilova uchun</strong>{' '}
        almashtirish mumkin:
      </p>
      <CodeBlock lang="python">{`from fastapi import Request
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "error": {
                "status_code": 422,
                "message": "Yuborilgan ma'lumot noto'g'ri",
                "details": jsonable_encoder(exc.errors()),
            }
        },
    )


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "status_code": exc.status_code,
                "message": exc.detail,
                "details": None,
            }
        },
    )`}</CodeBlock>
      <p>Tushuntirib chiqamiz:</p>
      <ul>
        <li>
          <code>@app.exception_handler(RequestValidationError)</code> — "har safar validatsiya
          xatosi (422) yuz berganda, standart FastAPI xulqi o'rniga, shu funksiyani chaqir"
          degani. <code>RequestValidationError</code> — Pydantic/FastAPI ichkarida aynan shu
          xatoni ko'taradi (siz buni hech qachon o'zingiz <code>raise</code> qilmaysiz — u
          avtomatik yuz beradi).
        </li>
        <li>
          <code>jsonable_encoder(exc.errors())</code> — <strong>muhim detal</strong>.{' '}
          <code>exc.errors()</code> Pydantic'dan xato ro'yxatini oladi, lekin unda ba'zan JSON'ga
          to'g'ridan-to'g'ri aylanmaydigan Python obyektlari bo'lishi mumkin (masalan, bizning{' '}
          <code>@field_validator</code>da <code>raise ValueError(...)</code> qilganimizda, asl{' '}
          <code>ValueError</code> obyektining o'zi natija ichida "yashirin" bo'lib qoladi).{' '}
          <code>jsonable_encoder(...)</code> — bularning barchasini xavfsiz, JSON'ga mos shaklga
          aylantiradi. <strong>Agar buni unutib qo'ysangiz, server 500 xato bilan yiqiladi</strong>{' '}
          — shuning uchun buni albatta yozing.
        </li>
        <li>
          <code>@app.exception_handler(StarletteHTTPException)</code> — nega{' '}
          <code>fastapi.HTTPException</code> emas, <code>starlette.exceptions.HTTPException</code>
          ? Chunki FastAPI'ning o'z <code>HTTPException</code>si aslida Starlette'nikidan meros
          oladi, va FastAPI standart xato ishlov beruvchisini aynan shu Starlette'nikiga
          ro'yxatdan o'tkazgan. Shuning uchun uni almashtirish uchun ham xuddi shu klassni
          ko'rsatishimiz kerak — bu FastAPI hujjatlarida ham aynan shunday tavsiya etiladi.
        </li>
        <li>
          <code>exc.detail</code> — biz <code>raise HTTPException(status_code=404, detail="Kontakt topilmadi")</code>{' '}
          deganimizdagi o'sha <code>detail="..."</code> matni.
        </li>
      </ul>
      <p>
        Bu ikkala handlerni qo'shgach — kod bazamizning qolgan qismida (
        <code>raise HTTPException(...)</code>) <strong>hech narsani o'zgartirishga hojat yo'q</strong>
        ! Handler shunchaki javobni chiqishdan oldin "qadoqlaydi".
      </p>

      <h2>Natijani solishtiramiz</h2>
      <p>
        <strong>Oldin</strong> (404):
      </p>
      <CodeBlock lang="json">{`{"detail": "Kontakt topilmadi"}`}</CodeBlock>
      <p>
        <strong>Endi</strong> (404):
      </p>
      <CodeBlock lang="json">{`{
  "error": {
    "status_code": 404,
    "message": "Kontakt topilmadi",
    "details": null
  }
}`}</CodeBlock>
      <p>
        <strong>Endi</strong> (422, custom validator xatosi bilan):
      </p>
      <CodeBlock lang="json">{`{
  "error": {
    "status_code": 422,
    "message": "Yuborilgan ma'lumot noto'g'ri",
    "details": [
      {
        "type": "value_error",
        "loc": ["body", "phone"],
        "msg": "Value error, Telefon raqam +998XXXXXXXXX shaklida bo'lishi kerak",
        "input": "901234567",
        "ctx": { "error": {} }
      }
    ]
  }
}`}</CodeBlock>
      <p>
        Endi ikkalasi ham bir xil "konvert" ichida — <code>error.status_code</code>,{' '}
        <code>error.message</code>, <code>error.details</code>. Frontend dasturchisi endigina
        bitta formatni bilsa, barcha xatolarni boshqara oladi.
      </p>

      <table className="my-4 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-canvas-muted">
            <th className="p-3 font-semibold text-ink">Yuborilgan ma'lumot</th>
            <th className="p-3 font-semibold text-ink">Natija</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>phone: "+998901234567"</code>, to'g'ri email
            </td>
            <td className="p-3 text-ink-muted">
              <code>201 Created</code>
            </td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>email: "not-an-email"</code>
            </td>
            <td className="p-3 text-ink-muted">422 — "@-sign yo'q"</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>phone: "901234567"</code> (kod yo'q)
            </td>
            <td className="p-3 text-ink-muted">422 — "shaklida bo'lishi kerak"</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>phone: "+99890123"</code> (raqam kam)
            </td>
            <td className="p-3 text-ink-muted">422 — "shaklida bo'lishi kerak"</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>full_name: "   "</code>
            </td>
            <td className="p-3 text-ink-muted">422 — "kamida 2 ta belgidan iborat"</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>full_name: "  Vali Aliyev  "</code>
            </td>
            <td className="p-3 text-ink-muted">
              201 Created, saqlangan qiymat: "Vali Aliyev" (tozalangan)
            </td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">Mavjud bo'lmagan contact_id</td>
            <td className="p-3 text-ink-muted">404 — endi izchil error konvertida</td>
          </tr>
        </tbody>
      </table>

      <Quiz
        question="Nega global exception handler ichida jsonable_encoder(exc.errors()) chaqiriladi, oddiy exc.errors() emas?"
        options={[
          'Chunki exc.errors() sekin ishlaydi',
          "Chunki exc.errors() ichida JSON'ga to'g'ridan-to'g'ri aylanmaydigan Python obyektlari bo'lishi mumkin, aks holda server 500 xato bilan yiqiladi",
          "Chunki jsonable_encoder xatolarni avtomatik tuzatib beradi",
          "Bu ikkalasi butunlay bir xil, farqi yo'q",
        ]}
        correctIndex={1}
        explanation="exc.errors() ba'zan JSON'ga bevosita aylanmaydigan Python obyektlarini o'z ichiga oladi. jsonable_encoder bularni xavfsiz JSON-mos shaklga aylantiradi - buni unutish serverni 500 xato bilan qulatishi mumkin."
      />

      <Exercise title="Mustaqil mashq">
        <ul>
          <li>Yuqoridagi jadvaldagi barcha holatlarni /docs orqali o'zingiz sinab ko'ring.</li>
          <li>
            <code>notes</code> maydoniga <code>Field(max_length=500)</code> qo'shing — juda uzun
            izohlarni cheklang.
          </li>
          <li>
            Yangi validator yozing: <code>email</code>ni har doim kichik harflarga o'tkazadigan (
            <code>value.lower()</code>) — chunki <code>Ali@Example.com</code> va{' '}
            <code>ali@example.com</code> aslida bitta manzil bo'lishi kerak.
          </li>
        </ul>
        <Solution>
          <CodeBlock lang="python">{`class ContactBase(SQLModel):
    full_name: str = Field(min_length=2, max_length=100)
    phone: str
    email: EmailStr | None = None
    notes: str | None = Field(default=None, max_length=500)
    is_favorite: bool = False

    @field_validator("full_name")
    @classmethod
    def normalize_full_name(cls, value: str) -> str:
        cleaned = value.strip()
        if len(cleaned) < 2:
            raise ValueError("Ism kamida 2 ta belgidan iborat bo'lishi kerak")
        return cleaned

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        if not PHONE_PATTERN.fullmatch(value):
            raise ValueError("Telefon raqam +998XXXXXXXXX shaklida bo'lishi kerak")
        return value

    @field_validator("email")
    @classmethod
    def normalize_email(cls, value: str | None) -> str | None:
        return value.lower() if value else value`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>EmailStr</code> — tayyor email format tekshiruvchisi.
        </li>
        <li>
          <code>@field_validator</code> — o'zimizning maxsus tekshiruv qoidamizni (regex bilan)
          yozish imkonini beradi.
        </li>
        <li>Validator nafaqat tekshirishi, balki qiymatni tozalab/standartlashtirib qaytarishi ham mumkin (.strip()).</li>
        <li>
          Bir xil ko'rinishga ega bo'lmagan (<code>detail</code> ba'zan matn, ba'zan ro'yxat)
          xato javoblari yomon amaliyot hisoblanadi.
        </li>
        <li>
          <code>@app.exception_handler(...)</code> — global xato ishlov beruvchilarni butun
          ilova uchun almashtirish imkonini beradi.
        </li>
        <li>
          <code>jsonable_encoder(exc.errors())</code> — validatsiya xatolarini xavfsiz JSON'ga
          aylantiradi; buni unutish serverni 500 xato bilan qulatishi mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
