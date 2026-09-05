import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Haqiqiy ma'lumotlar bazasi: SQLite va SQLModel",
  section: "Ma'lumotlar bazasi",
}

export default function SqliteSqlmodelLesson() {
  return (
    <>
      <p>
        Hozircha yozgan kodimizning bitta jiddiy kamchiligi bor: <code>contacts</code> — oddiy
        Python list, ya'ni ma'lumot faqat kompyuter <strong>operativ xotirasida (RAM)</strong>{' '}
        yashaydi. Serverni to'xtatsangiz (<code>Ctrl+C</code>) — hammasi yo'qoladi.
      </p>
      <p>
        Bugun buni tuzatamiz — kontaktlarni <strong>diskdagi haqiqiy faylga</strong>, SQL
        ma'lumotlar bazasi ko'rinishida saqlaymiz. Va eng qizig'i — buning uchun siz allaqachon
        bilgan SQL bilimingiz to'g'ridan-to'g'ri kerak bo'ladi.
      </p>

      <h2>ORM nima va nega u kerak?</h2>
      <p>Siz SQL'da jadval yaratishni bilasiz:</p>
      <CodeBlock lang="sql">{`CREATE TABLE contact (
    id INTEGER PRIMARY KEY,
    full_name VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    email VARCHAR,
    notes VARCHAR,
    is_favorite BOOLEAN NOT NULL
);`}</CodeBlock>
      <p>Va ma'lumot qo'shish/olishni ham bilasiz:</p>
      <CodeBlock lang="sql">{`INSERT INTO contact (full_name, phone) VALUES ('Ali Valiyev', '+998901234567');
SELECT * FROM contact WHERE full_name LIKE '%ali%' ORDER BY full_name;`}</CodeBlock>
      <p>
        Endi savol: Python kodimizdan turib, har safar shu SQL matnlarini qo'lda yozib, ularni
        bazaga yuborib, natijasini qayta Python obyektlariga aylantirib o'tirishimiz kerakmi? Bu
        ishlaydi, lekin juda ko'p qo'lda yoziladigan, xatoga moyil kod talab qiladi.
      </p>
      <p>
        <strong>ORM (Object-Relational Mapper)</strong> — aynan shu ishni siz uchun
        avtomatlashtiradigan vosita. U SQL jadvalini Python klassi sifatida, jadval qatorini esa
        shu klassning bitta obyekti sifatida ifodalaydi. Siz Python kodi yozasiz — ORM buni orqa
        fondagi to'g'ri SQL'ga aylantiradi.
      </p>
      <p>
        Biz <strong>SQLModel</strong> kutubxonasidan foydalanamiz — uni FastAPI'ning o'zi bilan
        bir xil muallif (Sebastián Ramírez) yozgan, va u ikkita mashhur kutubxonani birlashtiradi:{' '}
        <strong>SQLAlchemy</strong> (Python'dagi eng mashhur ORM) va <strong>Pydantic</strong>{' '}
        (2-darsda o'rgangan validatsiya kutubxonamiz).
      </p>
      <p>
        Buning ma'nosi — <strong>bitta klass yozib, ikkita maqsadga erishasiz</strong>: u ham
        Pydantic modeli (validatsiya uchun), ham SQL jadvali (saqlash uchun) bo'ladi.
      </p>

      <h2>O'rnatish</h2>
      <CodeBlock lang="bash">{`uv add sqlmodel`}</CodeBlock>

      <h2>
        <code>Contact</code> klassini SQL jadvaliga aylantiramiz
      </h2>
      <p>2- va 3-darslarda bunday yozgan edik:</p>
      <CodeBlock lang="python">{`class ContactCreate(BaseModel):
    full_name: str
    phone: str
    email: str | None = None
    notes: str | None = None
    is_favorite: bool = False


class Contact(ContactCreate):
    id: int`}</CodeBlock>
      <p>
        Endi buni SQLModel'ga moslashtiramiz — g'oya bir xil (umumiy maydonlar + ID qo'shilgan
        versiya), faqat bittasi endi <strong>haqiqiy jadval</strong> bo'ladi:
      </p>
      <CodeBlock lang="python">{`from sqlmodel import Field, SQLModel


class ContactBase(SQLModel):
    full_name: str
    phone: str
    email: str | None = None
    notes: str | None = None
    is_favorite: bool = False


class Contact(ContactBase, table=True):
    id: int | None = Field(default=None, primary_key=True)


class ContactCreate(ContactBase):
    pass`}</CodeBlock>
      <p>Nima o'zgardi:</p>
      <ul>
        <li>
          <code>SQLModel</code>dan meros olamiz, <code>BaseModel</code>dan emas — SQLModel klassi
          Pydantic'ning barcha imkoniyatlarini (validatsiya, <code>str | None</code>, standart
          qiymatlar) o'zida saqlaydi.
        </li>
        <li>
          <code>ContactBase</code> — umumiy maydonlarni bir joyga yig'ib turadigan ota-klass (bu
          3-darsda ko'rgan g'oyaning davomi — kod takrorlanmasin).
        </li>
        <li>
          <code>class Contact(ContactBase, table=True):</code> — <strong>eng muhim qator!</strong>{' '}
          <code>table=True</code> degani: "bu klass endi shunchaki validatsiya sxemasi emas,
          balki haqiqiy SQL jadvali." SQLModel klass nomidan (<code>Contact</code> →{' '}
          <code>contact</code>) avtomatik jadval nomini ham hosil qiladi.
        </li>
        <li>
          <code>id: int | None = Field(default=None, primary_key=True)</code> —{' '}
          <code>Field(...)</code> bu yerda SQL ustunining xususiyatlarini belgilaydi.{' '}
          <code>primary_key=True</code> — sizga SQL'dan tanish <strong>PRIMARY KEY</strong>.{' '}
          <code>default=None</code> — biz yangi kontakt yaratayotganda ID bermaymiz, buni
          ma'lumotlar bazasining o'zi avtomatik beradi (SQL'dagi <code>AUTOINCREMENT</code> kabi).
        </li>
        <li>
          <code>ContactCreate(ContactBase): pass</code> — bu klass <code>table=True</code> emas,
          ya'ni jadval yaratmaydi, faqat validatsiya uchun ishlatiladi (xuddi avvalgidek — client
          yangi kontakt yuborganda <code>id</code>siz ma'lumot kutamiz).
        </li>
      </ul>
      <Callout type="tip" title="Bilib oling">
        Nega hali ham <code>ContactCreate</code> alohida kerak, <code>Contact</code>ning o'zidan
        foydalanmaymiz? Chunki <code>Contact</code>da <code>id</code> maydoni bor, lekin client
        yangi kontakt yaratayotganda <code>id</code> yubormasligi kerak (buni server/baza o'zi
        beradi). Ikkita klassni ajratib turish — client nimani yuborishi <strong>kerak</strong>
        ligi bilan, server nimani <strong>qaytarishi</strong>ni aniq ajratib turadi.
      </Callout>

      <h2>
        Bazaga ulanish: <code>engine</code>
      </h2>
      <CodeBlock lang="python">{`from sqlmodel import create_engine, SQLModel

sqlite_file_name = "contacts.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, echo=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)`}</CodeBlock>
      <ul>
        <li>
          <code>engine</code> — bazaga ulanishni boshqaradigan obyekt.{' '}
          <code>sqlite:///contacts.db</code> — SQLite bazasi joriy papkada <code>contacts.db</code>{' '}
          nomli faylda saqlanishini bildiradi (SQLite'ning o'ziga xosligi — bitta oddiy fayl,
          alohida server kerak emas).
        </li>
        <li>
          <code>echo=True</code> — juda foydali sozlama: har safar SQLModel bazaga so'rov
          yuborganda, u <strong>haqiqiy generatsiya qilingan SQL matnini</strong> terminalga
          chiqaradi. Bu bizga "Python kodim aslida qanday SQL'ga aylanyapti?" degan savolga har
          doim javob berish imkonini beradi.
        </li>
        <li>
          <code>create_db_and_tables()</code> — <code>table=True</code> deb belgilangan barcha
          klasslar uchun jadvallarni yaratadi (agar ular hali mavjud bo'lmasa) — bu xuddi{' '}
          <code>CREATE TABLE IF NOT EXISTS</code> degani.
        </li>
      </ul>

      <h2>
        Server ishga tushganda jadval yaratish: <code>lifespan</code>
      </h2>
      <p>
        Jadvallarni <strong>server ishga tushganda, birinchi so'rov kelishidan oldin</strong> bir
        marta yaratishimiz kerak. Buning uchun FastAPI'ning <code>lifespan</code> mexanizmidan
        foydalanamiz:
      </p>
      <CodeBlock lang="python">{`from contextlib import asynccontextmanager
from fastapi import FastAPI


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)`}</CodeBlock>
      <ul>
        <li>
          <code>yield</code>dan <strong>oldingi</strong> kod — server ishga tushganda bir marta
          ishlaydi (bizning holatda — jadvallarni yaratish).
        </li>
        <li>
          <code>yield</code>dan <strong>keyingi</strong> kod (hozircha bo'sh) — server to'xtaganda
          ishlaydi (masalan, bazaga ulanishni yopish kerak bo'lganda shu yerga yoziladi).
        </li>
        <li>
          <code>app = FastAPI(lifespan=lifespan)</code> — FastAPI'ga shu funksiyani ishlatishni
          aytamiz.
        </li>
      </ul>

      <h2>
        Har bir so'rov uchun <code>Session</code> — bog'liqlik in'yeksiyasi (<code>Depends</code>)
      </h2>
      <p>
        Bazaga har bir so'rovda alohida "suhbat" (session) orqali murojaat qilishimiz kerak. Buni
        qo'lda har bir funksiyada ochib-yopib o'tirmaslik uchun, FastAPI'ning{' '}
        <strong>Dependency Injection (bog'liqlikni in'yeksiya qilish)</strong> mexanizmidan
        foydalanamiz:
      </p>
      <CodeBlock lang="python">{`from typing import Annotated
from fastapi import Depends
from sqlmodel import Session


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]`}</CodeBlock>
      <p>Bu qismni tushunib olish juda muhim:</p>
      <ul>
        <li>
          <code>get_session()</code> — har chaqirilganda yangi <code>Session</code> ochadi, uni
          funksiyani chaqirgan joyga "beradi" (<code>yield</code>), va so'rov tugagach avtomatik
          yopadi (<code>with</code> bloki tufayli).
        </li>
        <li>
          <code>Depends(get_session)</code> — FastAPI'ga shuni aytadi: "bu parametrni to'ldirishdan
          oldin, avval <code>get_session()</code> funksiyasini chaqir, va uning natijasini shu
          parametrga ber."
        </li>
        <li>
          <code>SessionDep = Annotated[Session, Depends(get_session)]</code> — bu shunchaki
          qulaylik uchun: har bir endpointda <code>session: Session = Depends(get_session)</code>{' '}
          deb uzun yozish o'rniga, endi faqat <code>session: SessionDep</code> deb yozamiz.
        </li>
      </ul>
      <Callout type="tip" title="Bilib oling — nega bu foydali?">
        Tasavvur qiling, sizda 20 ta endpoint bor va har birida bazaga ulanish kerak.{' '}
        <code>Depends</code> bo'lmasa, har birida qo'lda <code>session = Session(engine)</code>{' '}
        ochib, oxirida <code>session.close()</code> deb yopishni hech qachon unutmasligingiz
        kerak bo'lardi. <code>Depends</code> bilan buni FastAPI har doim, har bir so'rov uchun,
        to'g'ri va avtomatik bajaradi — hatto funksiya ichida xato yuz bersa ham, session baribir
        to'g'ri yopiladi.
      </Callout>

      <h2>Endpointlarni bazaga ulaymiz</h2>
      <h3>Create</h3>
      <CodeBlock lang="python">{`@app.post("/contacts", status_code=201)
def create_contact(contact_data: ContactCreate, session: SessionDep) -> Contact:
    contact = Contact.model_validate(contact_data)
    session.add(contact)
    session.commit()
    session.refresh(contact)
    return contact`}</CodeBlock>
      <ul>
        <li>
          <code>Contact.model_validate(contact_data)</code> — <code>ContactCreate</code>{' '}
          obyektidan yangi <code>Contact</code> (jadval qatori) obyektini yaratadi. Bu 3-darsdagi{' '}
          <code>Contact(**contact_data.model_dump())</code> yozuvining zamonaviyroq, SQLModel
          tavsiya qiladigan varianti — ikkalasi ham xuddi bir xil natijani beradi.
        </li>
        <li>
          <code>session.add(contact)</code> — yangi obyektni sessiyaga "qo'shishga tayyorlaymiz"
          (hali bazaga yozilmagan).
        </li>
        <li>
          <code>session.commit()</code> — o'zgarishlarni <strong>haqiqatan ham bazaga yozadi</strong>.
          Bu — SQL'dagi <code>COMMIT</code> bilan bir xil narsa.
        </li>
        <li>
          <code>session.refresh(contact)</code> — <code>commit()</code>dan keyin, baza avtomatik
          bergan <code>id</code> qiymatini Python obyektimizga qaytarib "yangilaydi".
        </li>
      </ul>

      <h3>Read (ro'yxat — filtr, saralash, sahifalash bilan)</h3>
      <CodeBlock lang="python">{`from sqlmodel import select


@app.get("/contacts")
def list_contacts(
    session: SessionDep,
    search: str | None = None,
    favorites_only: bool = False,
    sort_by: SortBy = SortBy.id,
    order: SortOrder = SortOrder.asc,
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=10, ge=1, le=50),
) -> list[Contact]:
    query = select(Contact)

    if search:
        query = query.where(Contact.full_name.contains(search))

    if favorites_only:
        query = query.where(Contact.is_favorite == True)

    sort_column = getattr(Contact, sort_by.value)
    if order == SortOrder.desc:
        sort_column = sort_column.desc()
    query = query.order_by(sort_column)

    query = query.offset(skip).limit(limit)

    return session.exec(query).all()`}</CodeBlock>
      <p>
        4-darsda biz shu mantiqning barchasini Python'ning o'zida (<code>for</code>,{' '}
        <code>sorted()</code>, slice) yozgan edik. Endi ularning har biri to'g'ridan-to'g'ri
        SQL'ga mos keladi:
      </p>

      <table className="my-4 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-canvas-muted">
            <th className="p-3 font-semibold text-ink">4-darsdagi Python kodi</th>
            <th className="p-3 font-semibold text-ink">Endi SQLModel kodi</th>
            <th className="p-3 font-semibold text-ink">Natijadagi SQL</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>[c for c in results if search in c.full_name]</code>
            </td>
            <td className="p-3 text-ink-muted">
              <code>.where(Contact.full_name.contains(search))</code>
            </td>
            <td className="p-3 text-ink-muted">
              <code>WHERE full_name LIKE '%...%'</code>
            </td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>[c for c in results if c.is_favorite]</code>
            </td>
            <td className="p-3 text-ink-muted">
              <code>.where(Contact.is_favorite == True)</code>
            </td>
            <td className="p-3 text-ink-muted">
              <code>WHERE is_favorite = 1</code>
            </td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>sorted(results, key=...)</code>
            </td>
            <td className="p-3 text-ink-muted">
              <code>.order_by(sort_column)</code>
            </td>
            <td className="p-3 text-ink-muted">
              <code>ORDER BY ...</code>
            </td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>results[skip:skip+limit]</code>
            </td>
            <td className="p-3 text-ink-muted">
              <code>.offset(skip).limit(limit)</code>
            </td>
            <td className="p-3 text-ink-muted">
              <code>LIMIT ... OFFSET ...</code>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        <code>select(Contact)</code> — SQL'dagi <code>SELECT * FROM contact</code> bilan bir xil,
        faqat Python sintaksisida. <code>session.exec(query).all()</code> esa so'rovni haqiqatan
        ham bajarib, natijalarni Python ro'yxati sifatida qaytaradi.
      </p>
      <Callout type="tip" title="Bilib oling — Contact.is_favorite == True nega g'alati ko'rinadi?">
        Odatda Python'da <code>if x == True</code> yozish yomon odat hisoblanadi (
        <code>if x:</code> deb yozish kerak). Lekin bu yerda boshqacha holat:{' '}
        <code>Contact.is_favorite</code> — bu oddiy <code>True</code>/<code>False</code> qiymat
        emas, balki "SQL shart yasovchi maxsus obyekt". <code>== True</code> yozganimizda, biz
        Python solishtiruvi qilmayapmiz — balki SQLAlchemy'ga "<code>is_favorite = 1</code> degan
        SQL sharti yasa" deb buyuryapmiz. Bu — ORM'larning operatorlarni "qayta belgilash"
        (operator overloading) orqali ishlaydigan qiziq xususiyati.
      </Callout>
      <Callout type="tip" title="Bilib oling — xavfsizlik bonusi">
        <code>echo=True</code> orqali terminalda ko'rsangiz, generatsiya qilingan SQL aslida
        shunday ko'rinadi: <code>WHERE (full_name LIKE '%' || ? || '%')</code> — qiymatning o'zi
        emas, <code>?</code> belgisi turibdi. Bu <strong>parametrlashtirilgan so'rov</strong> deb
        ataladi va <strong>SQL Injection</strong> hujumidan avtomatik himoya qiladi. Agar siz
        qo'lda <code>f"WHERE full_name LIKE '%{'{search}'}%'"</code> deb matn birlashtirib
        yozganingizda, bu xavfsizlik teshigi bo'lardi. SQLModel/SQLAlchemy bu haqida sizning
        o'rningizga qayg'uradi.
      </Callout>

      <h3>Read (bitta kontakt)</h3>
      <CodeBlock lang="python">{`@app.get("/contacts/{contact_id}")
def get_contact(contact_id: int, session: SessionDep) -> Contact:
    contact = session.get(Contact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Kontakt topilmadi")
    return contact`}</CodeBlock>
      <p>
        <code>session.get(Contact, contact_id)</code> — PRIMARY KEY bo'yicha bitta qatorni
        topishning eng tez usuli (<code>SELECT * FROM contact WHERE id = ?</code> bilan bir xil
        natija). Topilmasa, <code>None</code> qaytaradi — biz buni avvalgidek{' '}
        <code>HTTPException</code> bilan ushlaymiz.
      </p>

      <h3>Update va Delete</h3>
      <CodeBlock lang="python">{`@app.put("/contacts/{contact_id}")
def update_contact(contact_id: int, contact_data: ContactCreate, session: SessionDep) -> Contact:
    contact = session.get(Contact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Kontakt topilmadi")

    for key, value in contact_data.model_dump().items():
        setattr(contact, key, value)

    session.add(contact)
    session.commit()
    session.refresh(contact)
    return contact


@app.delete("/contacts/{contact_id}")
def delete_contact(contact_id: int, session: SessionDep) -> dict:
    contact = session.get(Contact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Kontakt topilmadi")

    session.delete(contact)
    session.commit()
    return {"message": "Kontakt o'chirildi"}`}</CodeBlock>
      <p>
        <code>update_contact</code>da e'tibor bering: biz yangi obyekt yaratmaymiz, balki bazadan
        topilgan <strong>mavjud</strong> <code>contact</code> obyektining maydonlarini birma-bir
        yangilaymiz (<code>setattr</code>), so'ng shu o'zgargan obyektni qayta saqlaymiz.{' '}
        <code>delete_contact</code>da esa <code>session.delete(contact)</code> — SQL'dagi{' '}
        <code>DELETE FROM contact WHERE id = ...</code> bilan bir xil.
      </p>

      <h2>Sinab ko'ramiz</h2>
      <p>
        Serverni ishga tushiring va terminalga qarang — endi har bir so'rovda haqiqiy SQL chiqib
        turadi (bu <code>echo=True</code> tufayli). Masalan kontakt yaratganingizda, terminalda
        shunga o'xshash narsani ko'rasiz:
      </p>
      <CodeBlock lang="sql">{`INSERT INTO contact (full_name, phone, email, notes, is_favorite) VALUES (?, ?, ?, ?, ?)`}</CodeBlock>
      <p>
        <code>/docs</code> orqali bir nechta kontakt qo'shing, keyin <strong>serverni to'xtating</strong>{' '}
        (<code>Ctrl+C</code>) va <strong>qayta ishga tushiring</strong>:
      </p>
      <CodeBlock lang="bash">{`uv run uvicorn main:app --reload`}</CodeBlock>
      <p>
        <code>GET /contacts</code> qiling — kontaktlaringiz <strong>hali ham o'sha yerda</strong>!
        Chunki ular endi RAM'da emas, <code>contacts.db</code> faylida saqlangan. Loyiha
        papkangizga qarasangiz, yangi <code>contacts.db</code> fayli paydo bo'lganini ko'rasiz —
        bu haqiqiy SQLite ma'lumotlar bazasi fayli (uni "DB Browser for SQLite" kabi bepul dastur
        bilan ochib, jadvalni ko'zingiz bilan ko'rishingiz ham mumkin).
      </p>
      <p>
        Barcha filtr, qidiruv, saralash va sahifalash — 4-darsdagi kabi xuddi shunday ishlayveradi,
        faqat endi natijalar Python list emas, haqiqiy bazadan kelmoqda.
      </p>

      <Quiz
        question="Nega SQLModel bir vaqtning o'zida ham Pydantic modeli, ham SQL jadvali sifatida ishlaydi?"
        options={[
          "Chunki u SQLAlchemy va Pydantic'ni birlashtiradi, va table=True SQL jadval sifatida belgilaydi",
          'Chunki u faqat SQLite bilan ishlaydi, boshqa bazalar bilan ishlamaydi',
          'Chunki Pydantic modellari avtomatik ravishda SQL jadvaliga aylanadi, hech qanday sozlash kerak emas',
          'Chunki FastAPI buni majburiy talab qiladi',
        ]}
        correctIndex={0}
        explanation="SQLModel SQLAlchemy (ORM) va Pydantic (validatsiya)ni birlashtiradi. table=True belgilangan klass ham validatsiya qiladi, ham haqiqiy SQL jadvaliga mos keladi."
      />

      <Exercise title="Mustaqil mashq">
        <ul>
          <li>
            Serverni bir necha marta to'xtatib-yoqib, ma'lumotlar haqiqatan ham saqlanib
            qolishini o'z ko'zingiz bilan tekshiring.
          </li>
          <li>
            <code>echo=True</code> tufayli terminalda chiqayotgan SQL'larni har bir endpointni
            chaqirganingizda diqqat bilan o'qing — qaysi Python kodi qaysi SQL'ga aylanayotganini
            mos tushunib chiqing.
          </li>
          <li>
            Yangi query parametr qo'shing: <code>GET /contacts?email_domain=gmail.com</code> —
            faqat email manzili shu domen bilan tugaydigan kontaktlarni qaytarsin (maslahat:{' '}
            <code>Contact.email.endswith(...)</code> yoki <code>.contains(...)</code>dan
            foydalaning).
          </li>
        </ul>
        <Solution>
          <CodeBlock lang="python">{`@app.get("/contacts")
def list_contacts(
    session: SessionDep,
    search: str | None = None,
    favorites_only: bool = False,
    email_domain: str | None = None,
    sort_by: SortBy = SortBy.id,
    order: SortOrder = SortOrder.asc,
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=10, ge=1, le=50),
) -> list[Contact]:
    query = select(Contact)

    if search:
        query = query.where(Contact.full_name.contains(search))

    if favorites_only:
        query = query.where(Contact.is_favorite == True)

    if email_domain:
        query = query.where(Contact.email.endswith(email_domain))

    sort_column = getattr(Contact, sort_by.value)
    if order == SortOrder.desc:
        sort_column = sort_column.desc()
    query = query.order_by(sort_column).offset(skip).limit(limit)

    return session.exec(query).all()`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>ORM SQL'ni qo'lda yozishdan qulayroq — Python obyektlari orqali bazaga murojaat qilish imkonini beradi.</li>
        <li>
          SQLModel — bitta klass orqali ham Pydantic modeli, ham SQL jadvalini (
          <code>table=True</code>) tasvirlaydi.
        </li>
        <li>
          <code>Field(primary_key=True)</code> — SQL'dagi PRIMARY KEY'ning Python ko'rinishi.
        </li>
        <li>
          <code>engine</code>, <code>create_engine</code>,{' '}
          <code>SQLModel.metadata.create_all()</code> — bazaga ulanish va jadval yaratish uchun
          kerak.
        </li>
        <li>
          <code>lifespan</code> — server ishga tushganda bir martalik ishlarni bajarish uchun
          ishlatiladi.
        </li>
        <li>
          <code>Depends</code> va <code>Session</code> — har bir so'rov uchun bazaga alohida,
          avtomatik boshqariladigan ulanish (dependency injection) ta'minlaydi.
        </li>
        <li>
          <code>select()</code>, <code>.where()</code>, <code>.order_by()</code>,{' '}
          <code>.offset()/.limit()</code> — Python kodini SQL so'roviga aylantiradi.
        </li>
        <li>Parametrlashtirilgan so'rovlar SQL Injection'dan avtomatik himoya qiladi.</li>
      </KeyPoints>
    </>
  )
}
