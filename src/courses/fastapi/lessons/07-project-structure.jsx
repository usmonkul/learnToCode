import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Loyihani tashkillashtirish va yakunlash',
  section: 'Loyihani tashkillashtirish',
}

export default function ProjectStructureLesson() {
  return (
    <>
      <p>
        Bu — Contact App API loyihasining yakuniy darsi! Hozircha bitta <code>main.py</code>{' '}
        faylida: barcha modellar, <code>engine</code>, <code>Session</code> sozlamalari, barcha
        endpointlar va xato ishlov beruvchilar — hammasi birgalikda. 5-6 ta endpoint uchun bu
        chidasa bo'ladi, lekin tasavvur qiling — loyihangizda 50 ta endpoint, 10 ta model bo'lsa-
        chi? Bitta faylda kerakli narsani topish tobora qiyinlashadi.
      </p>
      <p>
        Bugun kodni <strong>mantiqiy qismlarga</strong> bo'lamiz. Bu API'ning tashqi xulq-atvorini
        o'zgartirmaydi (barcha endpointlar xuddi avvalgidek ishlayveradi), faqat kodni{' '}
        <strong>o'qish va kengaytirish osonroq</strong> bo'ladigan qilib qayta joylashtiramiz.
      </p>

      <h2>Yangi papka tuzilishi</h2>
      <CodeBlock lang="text">{`contact-app/
├── main.py              # ilovani yig'adi: FastAPI(), routerlarni ulash, xato handlerlar
├── database.py          # engine, Session, get_session (5-darsdan)
├── models.py            # barcha SQLModel klasslar (Contact, ContactCreate, ...)
└── routers/
    ├── __init__.py
    └── contacts.py       # /contacts bilan bog'liq barcha endpointlar`}</CodeBlock>
      <Callout type="tip" title="Bilib oling">
        Bu — FastAPI'ning rasmiy hujjatlarida ham tavsiya etiladigan, "kattaroq ilovalar" uchun
        standart tuzilma. Loyihangiz kattalashgan sari, <code>routers/</code> papkasiga yangi
        fayllar (<code>routers/users.py</code>, <code>routers/tasks.py</code> va h.k.) qo'shib
        borasiz — har biri o'z domeniga tegishli endpointlarni o'z ichiga oladi.
      </Callout>

      <h2>
        <code>database.py</code> — bazaga oid hamma narsa bir joyda
      </h2>
      <CodeBlock lang="python">{`from typing import Annotated

from fastapi import Depends
from sqlmodel import Session, SQLModel, create_engine

sqlite_file_name = "contacts.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, echo=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]`}</CodeBlock>
      <p>
        Bu — 5-darsda yozgan kodimiz, hech qanday o'zgarishsiz, faqat endi o'z faylida. Bazaga
        oid har qanday narsa (masalan, kelajakda Postgres'ga o'tish) endi faqat shu bitta faylga
        tegadi.
      </p>

      <h2>
        <code>models.py</code> — barcha ma'lumot shakllari bir joyda
      </h2>
      <CodeBlock lang="python">{`import re
from datetime import datetime, timezone
from enum import Enum

from pydantic import EmailStr, field_validator
from sqlmodel import Field, SQLModel

PHONE_PATTERN = re.compile(r"^\\+998\\d{9}$")


class ContactBase(SQLModel):
    full_name: str = Field(min_length=2, max_length=100)
    phone: str
    email: EmailStr | None = None
    notes: str | None = None
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


class Contact(ContactBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(ContactBase):
    pass


class ContactPublic(ContactBase):
    id: int
    created_at: datetime


class SortBy(str, Enum):
    id = "id"
    full_name = "full_name"


class SortOrder(str, Enum):
    asc = "asc"
    desc = "desc"`}</CodeBlock>
      <p>Bu yerda ikkita yangilik bor:</p>
      <p>
        <strong>1. <code>created_at: datetime</code></strong> — <code>Contact</code> jadvaliga
        yangi ustun qo'shdik: kontakt qachon yaratilganini avtomatik saqlaydigan vaqt belgisi.{' '}
        <code>default_factory=lambda: datetime.now(timezone.utc)</code> — bu maydonga standart
        qiymat berish o'rniga, har safar <strong>yangi obyekt yaratilganda funksiyani chaqirib</strong>
        , uning natijasini ishlatadi (agar oddiy <code>default=datetime.now(timezone.utc)</code>{' '}
        deb yozganimizda, bu bitta vaqt barcha kontaktlar uchun "qotib qolar" edi — chunki u
        dastur ishga tushganda bir marta hisoblanadi). Vaqtni har doim <strong>UTC</strong> (butun
        dunyo uchun umumiy, mintaqaviy vaqt zonasiga bog'liq bo'lmagan) formatda saqlaymiz — bu
        server qayerda joylashgan bo'lishidan qat'i nazar, vaqtlarni chalkashtirmaslikning
        standart usuli. Diqqat qiling — bu maydon <code>ContactBase</code>da emas, faqat{' '}
        <code>Contact</code>da: client bu qiymatni yubormaydi, uni server o'zi belgilaydi.
      </p>
      <Callout type="tip" title="Bilib oling">
        Ba'zi eski FastAPI/Python kod namunalarida <code>datetime.utcnow()</code> (qavssiz
        chaqiruv, <code>timezone.utc</code>siz) ishlatilganini ko'rishingiz mumkin. Bu funksiya{' '}
        <strong>eskirgan (deprecated)</strong> — Python buni kelajakda butunlay olib tashlashni
        rejalashtirmoqda, chunki u "vaqt zonasiz" (naive) qiymat qaytaradi, bu esa keyinchalik
        xatolarga sabab bo'lishi mumkin. Shuning uchun biz doim{' '}
        <code>datetime.now(timezone.utc)</code> yozamiz — bu "vaqt zonasi bilan" (aware) to'g'ri
        qiymat beradi.
      </Callout>
      <p>
        <strong>2. <code>ContactPublic</code></strong> — yangi model. Buning nima uchun
        kerakligini keyingi bo'limda ko'ramiz.
      </p>
      <Callout type="warning" title="Muhim ogohlantirish — mavjud contacts.db faylingiz bilan muammo!">
        Agar siz 5-6-darslardan beri shu bitta loyiha papkasida ishlab kelayotgan bo'lsangiz,
        sizda allaqachon eski sxema (ya'ni <code>created_at</code> ustunisiz) bilan yaratilgan{' '}
        <code>contacts.db</code> fayli bor. Buni tushunish juda muhim: 5-darsda ko'rgan{' '}
        <code>SQLModel.metadata.create_all(engine)</code> funksiyasi faqat{' '}
        <strong>mavjud bo'lmagan jadvallarni</strong> yaratadi — u hech qachon{' '}
        <strong>allaqachon mavjud jadvalga yangi ustun qo'shib bermaydi</strong>. Ya'ni, agar shu
        bosqichda serverni ishga tushirsangiz, <code>contact</code> jadvali eski holicha (
        <code>created_at</code>siz) qolib ketadi, kod esa <code>created_at</code> borligini
        kutadi — natijada <code>GET /contacts</code> chaqirganingizda serverning o'zi darhol{' '}
        <code>500 Internal Server Error</code> va <code>no such column: contact.created_at</code>{' '}
        degan xato bilan yiqiladi!
        <br />
        <br />
        <strong>Yechim (hozircha):</strong> loyiha papkangizdagi <code>contacts.db</code> faylini
        oddiygina <strong>o'chirib tashlang</strong>. Serverni qayta ishga tushirganingizda,{' '}
        <code>create_all()</code> uni yangi (to'g'ri) sxema bilan qaytadan yaratadi — albatta, bu
        safar eski test ma'lumotlaringiz ham birga o'chib ketadi, lekin bu darslik loyihasi uchun
        muammo emas.
        <br />
        <br />
        <strong>Nega bu real loyihalarda katta muammo?</strong> Chunki productionda ishlab turgan
        haqiqiy ilovada bazani shunchaki o'chirib tashlash mumkin emas — u yerda haqiqiy
        foydalanuvchilarning ma'lumotlari bor! Aynan shu muammoni hal qilish uchun{' '}
        <strong>Alembic</strong> degan alohida vosita mavjud — u bazadagi jadvallarni ma'lumotni
        yo'qotmasdan, bosqichma-bosqich ("migratsiya" qilib) o'zgartirish imkonini beradi. Biz
        Alembic bilan keyingi loyihalarda tanishamiz — hozircha shuni bilib oling: modelga yangi
        maydon qo'shish — bu har doim ham "bepul" o'zgarish emas, bazaning o'zi ham shu
        o'zgarishga mos kelishi kerak.
      </Callout>
      <p>Yuqoridagi ogohlantirishga amal qiling — davom etishdan oldin, terminalda quyidagini bajaring:</p>
      <CodeBlock lang="bash">{`rm contacts.db`}</CodeBlock>
      <p>Faqat shundan keyin serverni ishga tushiring.</p>

      <h2>
        Nega yana bitta model — <code>ContactPublic</code>?
      </h2>
      <p>
        Hozircha bizda uchta narsa bor edi: <code>ContactBase</code> (umumiy maydonlar),{' '}
        <code>Contact</code> (haqiqiy jadval, <code>id</code> va <code>created_at</code> bilan),{' '}
        <code>ContactCreate</code> (client yuboradigan ma'lumot). Savol: clientga javob{' '}
        <strong>qaytarayotganda</strong>, aynan qaysi shaklda qaytarish kerak?
      </p>
      <p>
        Hozirgacha biz shunchaki <code>Contact</code> obyektining o'zini qaytarardik va FastAPI
        uni avtomatik JSON'ga aylantirardi. Bu ishlagan, lekin muammosi shundaki —{' '}
        <strong>chiqish shakli bilan bazadagi jadval shakli bir xil narsa bo'lib qolayapti</strong>
        . Kelajakda (masalan, keyingi loyihada foydalanuvchi modelida) jadvalda{' '}
        <code>password_hash</code> kabi <strong>hech qachon clientga ko'rinmasligi kerak
        bo'lgan</strong> maydonlar paydo bo'ladi. Agar siz shunchaki jadval obyektini
        qaytaraversangiz, bir kun kelib tasodifan parol xeshini clientga oshkor qilib qo'yishingiz
        mumkin!
      </p>
      <p>Yechim — chiqish uchun alohida, aniq belgilangan model yaratish:</p>
      <CodeBlock lang="python">{`class ContactPublic(ContactBase):
    id: int
    created_at: datetime`}</CodeBlock>
      <p>
        Bu — "client bizdan javob olganda, aynan shu maydonlarni, aynan shu tartibda ko'radi"
        degan <strong>rasmiy shartnoma (contract)</strong>. Bazada nima bo'lishidan qat'i nazar,
        clientga faqat shu modelda yozilgan narsa yetib boradi.
      </p>

      <h2>
        <code>response_model</code> — shartnomani amalda joriy qilish
      </h2>
      <p>Endi buni endpointlarda ishlatamiz:</p>
      <CodeBlock lang="python">{`@router.post("", response_model=ContactPublic, status_code=201)
def create_contact(contact_data: ContactCreate, session: SessionDep):
    contact = Contact.model_validate(contact_data)
    session.add(contact)
    session.commit()
    session.refresh(contact)
    return contact`}</CodeBlock>
      <p>
        Diqqat qiling — funksiya hali ham to'liq <code>Contact</code> obyektini (
        <code>return contact</code>) qaytaryapti, biz <code>ContactPublic</code>ga aylantirish
        uchun hech qanday qo'shimcha kod yozmadik!{' '}
        <code>response_model=ContactPublic</code> FastAPI'ga shuni aytadi: "funksiya nima
        qaytarishidan qat'i nazar, javobni clientga yuborishdan oldin, uni{' '}
        <code>ContactPublic</code> shakliga moslashtir — ortiqcha maydonlarni tashla,
        yetishmaganini xato deb hisobla."
      </p>
      <Callout type="tip" title="Bilib oling — bu -> Contact qaytish turi izohidan nimasi bilan farq qiladi?">
        Aslida — filtrlash nuqtai nazaridan ikkalasi ham <strong>xuddi bir xil</strong> ishlaydi:
        agar <code>response_model=</code> berilmagan bo'lsa, FastAPI funksiyaning qaytish turi
        izohining o'zini <code>response_model</code> sifatida ishlatadi. Ya'ni{' '}
        <code>-&gt; Contact</code> ham xavfsiz emas, chiqishni filtrlamaydi, degani noto'g'ri
        bo'lardi. Unda nega baribir aniq <code>response_model=</code> yozamiz? Ikki sabab bor: (1)
        bu funksiyaning haqiqiy qaytish turini (masalan, <code>Contact</code> — bazadan kelgan
        obyekt) API'ning tashqi shartnomasidan (<code>ContactPublic</code>) ajratib turadi —
        funksiya ichida boshqa turdagi obyekt qaytarsangiz ham, chiqish shakli o'zgarmay qoladi;
        (2) bu kodni o'qiyotgan boshqa dasturchiga (yoki kelajakdagi o'zingizga) "bu yerda chiqish
        ataylab, aniq shu shaklda cheklangan" degan yaqqol signal beradi — buni keyingi loyihada
        (parol xeshini yashirishda) ayniqsa qadrlaysiz.
      </Callout>

      <h2>Xato qilib ko'raylik — nega bu muhimligini his qilish uchun</h2>
      <p>
        Keling, ataylab xato qilamiz. Agar <code>response_model=ContactPublic</code> o'rniga,
        xato bilan <code>response_model=ContactCreate</code> deb yozib qo'ysak nima bo'ladi?
      </p>
      <CodeBlock lang="python">{`@router.post("", response_model=ContactCreate, status_code=201)  # xato model!
def create_contact(contact_data: ContactCreate, session: SessionDep):
    ...
    return contact`}</CodeBlock>
      <p>Natija:</p>
      <CodeBlock lang="json">{`// 201 Created — lekin qarang, nima yetishmayapti!
{
  "full_name": "Ali Valiyev",
  "phone": "+998901234567",
  "email": "ali@example.com",
  "notes": null,
  "is_favorite": false
}`}</CodeBlock>
      <p>
        <strong>id va created_at butunlay yo'qolib qoldi!</strong> Hech qanday xato, hech qanday
        ogohlantirish — chunki <code>ContactCreate</code>da bu maydonlar yo'q,{' '}
        <code>response_model</code> esa shunchaki ularni "bilmaydi" va sokin tarzda tashlab
        yuboradi. Bu — <code>response_model</code>ning kuchi ham, xavfi ham: u sizni{' '}
        <strong>himoya qiladi</strong> (kerakmas narsani chiqarmaydi), lekin{' '}
        <strong>to'g'ri modelni tanlashni ham talab qiladi</strong> (aks holda kerakli narsani ham
        yo'qotib qo'yishingiz mumkin).
      </p>
      <p>
        To'g'ri variant (<code>response_model=ContactPublic</code>) bilan esa:
      </p>
      <CodeBlock lang="json">{`// 201 Created — hammasi joyida
{
  "full_name": "Ali Valiyev",
  "phone": "+998901234567",
  "email": "ali@example.com",
  "notes": null,
  "is_favorite": false,
  "id": 1,
  "created_at": "2026-08-26T01:11:00.652466"
}`}</CodeBlock>

      <h2>
        <code>routers/contacts.py</code> — endpointlarni ko'chiramiz
      </h2>
      <CodeBlock lang="python">{`from fastapi import APIRouter, HTTPException, Query
from sqlmodel import select

from database import SessionDep
from models import Contact, ContactCreate, ContactPublic, SortBy, SortOrder

router = APIRouter(prefix="/contacts", tags=["contacts"])


@router.post("", response_model=ContactPublic, status_code=201)
def create_contact(contact_data: ContactCreate, session: SessionDep):
    contact = Contact.model_validate(contact_data)
    session.add(contact)
    session.commit()
    session.refresh(contact)
    return contact


@router.get("", response_model=list[ContactPublic])
def list_contacts(
    session: SessionDep,
    search: str | None = None,
    favorites_only: bool = False,
    sort_by: SortBy = SortBy.id,
    order: SortOrder = SortOrder.asc,
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=10, ge=1, le=50),
):
    query = select(Contact)

    if search:
        query = query.where(Contact.full_name.contains(search))
    if favorites_only:
        query = query.where(Contact.is_favorite == True)

    sort_column = getattr(Contact, sort_by.value)
    if order == SortOrder.desc:
        sort_column = sort_column.desc()
    query = query.order_by(sort_column).offset(skip).limit(limit)

    return session.exec(query).all()


@router.get("/{contact_id}", response_model=ContactPublic)
def get_contact(contact_id: int, session: SessionDep):
    contact = session.get(Contact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Kontakt topilmadi")
    return contact


@router.put("/{contact_id}", response_model=ContactPublic)
def update_contact(contact_id: int, contact_data: ContactCreate, session: SessionDep):
    contact = session.get(Contact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Kontakt topilmadi")

    for key, value in contact_data.model_dump().items():
        setattr(contact, key, value)

    session.add(contact)
    session.commit()
    session.refresh(contact)
    return contact


@router.delete("/{contact_id}")
def delete_contact(contact_id: int, session: SessionDep):
    contact = session.get(Contact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Kontakt topilmadi")

    session.delete(contact)
    session.commit()
    return {"message": "Kontakt o'chirildi"}`}</CodeBlock>
      <p>
        Yangi tushuncha — <strong>APIRouter</strong>:
      </p>
      <ul>
        <li>
          <code>router = APIRouter(prefix="/contacts", tags=["contacts"])</code> —{' '}
          <code>app = FastAPI()</code>ga juda o'xshaydi, lekin bu "mini-ilova" bo'lib, keyinroq
          asosiy ilovaga "ulanadi".
        </li>
        <li>
          <code>prefix="/contacts"</code> — endi har bir endpoint manzilida{' '}
          <code>/contacts</code>ni qayta-qayta yozishning hojati yo'q!{' '}
          <code>@router.post("")</code> aslida <code>/contacts</code>ga,{' '}
          <code>@router.get("/{'{contact_id}'}")</code> esa <code>/contacts/{'{contact_id}'}</code>
          ga mos keladi.
        </li>
        <li>
          <code>tags=["contacts"]</code> — bu shunchaki <code>/docs</code> sahifasida barcha
          kontakt endpointlarini "contacts" degan bitta guruh ostiga yig'ib ko'rsatadi (loyiha
          kattalashganda, endpointlar guruhlarga bo'lingan bo'lsa, hujjat navigatsiya qilish
          ancha osonlashadi).
        </li>
        <li>
          <code>from database import SessionDep</code> va <code>from models import ...</code> —
          e'tibor bering, bu fayl endi boshqa fayllardagi narsalarni <strong>import qilib</strong>{' '}
          ishlatyapti. Aynan shu — fayllarga bo'lishning butun mohiyati.
        </li>
      </ul>

      <h2>
        <code>main.py</code> — hammasini yig'amiz
      </h2>
      <CodeBlock lang="python">{`from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from database import create_db_and_tables
from routers.contacts import router as contacts_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)
app.include_router(contacts_router)


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
    )


@app.get("/")
def read_root():
    return {"message": "Contact App API ishga tushdi!"}`}</CodeBlock>
      <p>
        Yangi qator — <code>app.include_router(contacts_router)</code>. Bu asosiy{' '}
        <code>app</code> obyektiga: "routerdagi barcha endpointlarni o'zingga qo'shib ol" deydi.
        Shu bir qator orqali <code>routers/contacts.py</code>dagi 5 ta endpoint butun ilovaga
        ulanadi.
      </p>
      <p>
        Diqqat qiling — <code>main.py</code> endi juda "yupqa": u faqat qismlarni{' '}
        <strong>yig'adi</strong> (<code>lifespan</code>, routerlar, global xato handlerlar), lekin
        endpointlarning o'zi endi bu yerda emas. Katta loyihalarda <code>main.py</code> aynan
        shunday — kichik va o'qish oson bo'lishi kerak.
      </p>

      <h2>Yakuniy papka tuzilishi va oxirgi ishga tushirish</h2>
      <CodeBlock lang="text">{`contact-app/
├── main.py
├── database.py
├── models.py
├── routers/
│   ├── __init__.py
│   └── contacts.py
└── contacts.db          (avtomatik yaratiladi)`}</CodeBlock>
      <p>Serverni xuddi avvalgidek ishga tushirasiz — hech narsa o'zgarmadi:</p>
      <CodeBlock lang="bash">{`uv run uvicorn main:app --reload`}</CodeBlock>
      <p>
        <code>/docs</code> sahifasini oching — endi barcha <code>/contacts</code> endpointlari{' '}
        <strong>"contacts"</strong> degan alohida guruh ostida, chiroyli tartibda ko'rsatilganini
        ko'rasiz. Har bir endpointning javob namunasida endi aynan <code>ContactPublic</code>{' '}
        sxemasi ko'rsatiladi.
      </p>

      <Callout type="tip" title="Tabriklaymiz — Contact App API to'liq yakunlandi!">
        1-darsdan beri bosib o'tgan yo'lingiz: FastAPI'ning o'zi va avtomatik hujjatlar (1-dars),
        Pydantic modellar (2-dars), to'liq CRUD xotirada (3-dars), query parametrlar — qidiruv,
        filtr, saralash, sahifalash (4-dars), haqiqiy SQLite baza SQLModel bilan (5-dars), chuqur
        validatsiya va izchil xatolar (6-dars) va bugun — kodni professional tarzda
        tashkillashtirish.
      </Callout>

      <Quiz
        question="response_model=ContactCreate deb (xato bilan) yozib qo'ysangiz, response_model=ContactPublic o'rniga, nima sodir bo'ladi?"
        options={[
          "Server xato beradi va so'rovni rad etadi",
          "id va created_at kabi ContactCreate'da yo'q maydonlar hech qanday ogohlantirishsiz javobdan tushib qoladi",
          "Hech narsa o'zgarmaydi, ikkalasi ham bir xil natija beradi",
          "FastAPI avtomatik ravishda to'g'ri modelni tanlab oladi",
        ]}
        correctIndex={1}
        explanation="response_model faqat o'sha modelda yozilgan maydonlarni chiqaradi. ContactCreate'da id va created_at yo'q, shuning uchun ular hech qanday xatosiz, sokin tarzda javobdan yo'qolib qoladi."
      />

      <Exercise title="Mustaqil mashq">
        <ul>
          <li>
            Loyihangizni yuqoridagi tuzilishga o'zingiz ko'chiring (agar hali qilmagan bo'lsangiz)
            va barcha eski testlaringizni (3–6-darslardagi) qayta bajarib, hammasi xuddi
            avvalgidek ishlashini tasdiqlang.
          </li>
          <li>
            <code>models.py</code>ga yangi model qo'shing:{' '}
            <code>ContactSummary(SQLModel)</code> — faqat <code>id</code> va{' '}
            <code>full_name</code> maydonlaridan iborat, "qisqa ko'rinish" uchun. Yangi endpoint
            yarating: <code>GET /contacts/summary</code>, <code>response_model=list[ContactSummary]</code>{' '}
            bilan — bu faqat ism va ID'larni qaytarsin (email, telefon va boshqalarsiz).
          </li>
          <li>
            <code>routers/</code>ga yana bitta fayl qo'shing — <code>routers/health.py</code>,
            ichida bitta endpoint: <code>GET /health</code>,{' '}
            <code>{'{'}"status": "ok"{'}'}</code> qaytaruvchi (bu — real loyihalarda serverning
            "tirikligini" tekshirish uchun keng qo'llaniladigan naqsh). Uni <code>main.py</code>da{' '}
            <code>app.include_router(...)</code> orqali ulang.
          </li>
        </ul>
        <Solution>
          <CodeBlock lang="python">{`# models.py ichida
class ContactSummary(SQLModel):
    id: int
    full_name: str


# routers/contacts.py ichida (contact_id bilan boshlanuvchi route'lardan oldin!)
@router.get("/summary", response_model=list[ContactSummary])
def summary_contacts(session: SessionDep):
    return session.exec(select(Contact)).all()`}</CodeBlock>
          <CodeBlock lang="python">{`# routers/health.py
from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
def health_check():
    return {"status": "ok"}`}</CodeBlock>
          <p>
            Va <code>main.py</code>ga qo'shimcha ulash:
          </p>
          <CodeBlock lang="python">{`from routers.health import router as health_router

app.include_router(health_router)`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Katta loyihalarni <code>models.py</code> / <code>database.py</code> / <code>routers/</code>{' '}
          fayllariga bo'lish kodni o'qish va kengaytirishni osonlashtiradi.
        </li>
        <li>
          <code>APIRouter(prefix=..., tags=...)</code> — endpoint guruhlarini yaratadi,{' '}
          <code>app.include_router()</code> ularni asosiy ilovaga ulaydi.
        </li>
        <li>
          <code>ContactPublic</code> — chiqish uchun alohida, xavfsiz model yaratish g'oyasi.
        </li>
        <li>
          <code>response_model=</code> — chiqishni rasman filtrlaydi va tekshiradi, lekin
          noto'g'ri tanlansa, ma'lumotni sokin tarzda yo'qotib qo'yishi mumkin.
        </li>
        <li>
          <code>default_factory=</code> — har safar yangi qiymat hisoblanadigan standart
          qiymatlar uchun ishlatiladi (<code>datetime.now(timezone.utc)</code>).
        </li>
        <li>
          Modelga yangi maydon qo'shish "bepul" emas — mavjud baza sxemasi bilan mos kelishi
          kerak; bu muammoni real loyihalarda Alembic hal qiladi.
        </li>
      </KeyPoints>
    </>
  )
}
