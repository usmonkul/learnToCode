import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'CRUD amallari — xotirada saqlash',
  section: 'CRUD amallari',
}

export default function CrudInMemoryLesson() {
  return (
    <>
      <h2>CRUD nima?</h2>
      <p>
        Deyarli har qanday backend ilova to'rtta asosiy amalni bajaradi. Ularning inglizcha bosh
        harflaridan <strong>CRUD</strong> degan qisqartma kelib chiqqan:
      </p>

      <table className="my-4 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-canvas-muted">
            <th className="p-3 font-semibold text-ink">Harf</th>
            <th className="p-3 font-semibold text-ink">Amal</th>
            <th className="p-3 font-semibold text-ink">HTTP metodi</th>
            <th className="p-3 font-semibold text-ink">Bizning misolda</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <strong>C</strong>reate
            </td>
            <td className="p-3 text-ink-muted">Yaratish</td>
            <td className="p-3 text-ink-muted">
              <code>POST</code>
            </td>
            <td className="p-3 text-ink-muted">Yangi kontakt qo'shish</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <strong>R</strong>ead
            </td>
            <td className="p-3 text-ink-muted">O'qish</td>
            <td className="p-3 text-ink-muted">
              <code>GET</code>
            </td>
            <td className="p-3 text-ink-muted">Kontaktlar ro'yxatini yoki bittasini ko'rish</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <strong>U</strong>pdate
            </td>
            <td className="p-3 text-ink-muted">Yangilash</td>
            <td className="p-3 text-ink-muted">
              <code>PUT</code>
            </td>
            <td className="p-3 text-ink-muted">Kontakt ma'lumotini o'zgartirish</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <strong>D</strong>elete
            </td>
            <td className="p-3 text-ink-muted">O'chirish</td>
            <td className="p-3 text-ink-muted">
              <code>DELETE</code>
            </td>
            <td className="p-3 text-ink-muted">Kontaktni o'chirish</td>
          </tr>
        </tbody>
      </table>

      <p>
        Bugun biz aynan shu to'rtta amalni Contact App uchun yozamiz. Hozircha ma'lumotni haqiqiy
        ma'lumotlar bazasida emas, oddiy Python <strong>list</strong> ichida saqlaymiz — bu bizga
        DB murakkabligisiz CRUD mantig'ining o'ziga e'tibor qaratish imkonini beradi. Haqiqiy
        bazaga 5-darsda o'tamiz.
      </p>
      <Callout type="warning" title="Bilib oling">
        Xotirada (list ichida) saqlangan ma'lumot serverni to'xtatib qayta ishga tushirganingizda{' '}
        <strong>yo'qoladi</strong> — chunki u faqat dastur ishlab turgan vaqtda kompyuter
        xotirasida (RAM) yashaydi. Bu — bugungi yechimning asosiy kamchiligi, va aynan shu muammo
        bizni 5-darsda haqiqiy ma'lumotlar bazasiga olib boradi.
      </Callout>

      <h2>Ikkita model: nega bittasi yetarli emas?</h2>
      <p>
        2-darsda bitta <code>Contact</code> modeli yozgan edik. Endi savol tug'iladi: kontaktni{' '}
        <strong>yaratayotganda</strong> client <code>id</code> yubormaydi (chunki ID'ni server
        o'zi beradi), lekin kontaktni <strong>qaytarayotganda</strong> javobda <code>id</code>{' '}
        bo'lishi kerak. Shuning uchun ikkita model yaratamiz:
      </p>
      <CodeBlock lang="python">{`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()


class ContactCreate(BaseModel):
    full_name: str
    phone: str
    email: str | None = None
    notes: str | None = None
    is_favorite: bool = False


class Contact(ContactCreate):
    id: int`}</CodeBlock>
      <p>
        Bu yerda muhim narsa — <code>class Contact(ContactCreate):</code> qatori. Bu{' '}
        <strong>meros olish (inheritance)</strong> deb ataladi: <code>Contact</code> klassi{' '}
        <code>ContactCreate</code>ning barcha maydonlarini (<code>full_name</code>,{' '}
        <code>phone</code>, <code>email</code>, <code>notes</code>, <code>is_favorite</code>)
        avtomatik oladi va ustiga yana bitta maydon — <code>id: int</code> — qo'shadi. Shu tariqa
        bir xil maydonlarni ikki marta yozishga hojat qolmaydi.
      </p>
      <ul>
        <li>
          <code>ContactCreate</code> — client biror kontakt <strong>yaratmoqchi yoki
          yangilamoqchi</strong> bo'lganda yuboradigan ma'lumot shakli (ID'siz).
        </li>
        <li>
          <code>Contact</code> — server clientga <strong>qaytaradigan</strong> to'liq ma'lumot
          shakli (ID bilan).
        </li>
      </ul>

      <h2>Xotirada "soxta baza" tayyorlaymiz</h2>
      <CodeBlock lang="python">{`contacts: list[Contact] = []
next_id = 1


def generate_id() -> int:
    global next_id
    current_id = next_id
    next_id += 1
    return current_id`}</CodeBlock>
      <ul>
        <li>
          <code>contacts: list[Contact] = []</code> — barcha kontaktlarimiz saqlanadigan bo'sh
          ro'yxat. Bu bizning "jadval"imiz o'rnini bosadi.
        </li>
        <li>
          <code>next_id</code> — keyingi beriladigan ID raqamini eslab turadigan o'zgaruvchi.
        </li>
        <li>
          <code>generate_id()</code> funksiyasi ichidagi <code>global next_id</code> — Python'ga
          shuni aytadi: "men funksiya ichida <code>next_id</code> deganda, funksiyadan tashqarida
          e'lon qilingan o'sha o'zgaruvchini nazarda tutyapman, yangi lokal o'zgaruvchi emas."{' '}
          <code>global</code> kalit so'zisiz, <code>next_id += 1</code> qatori xato beradi, chunki
          Python buni yangi lokal o'zgaruvchi deb tushunib qoladi.
        </li>
      </ul>
      <Callout type="tip" title="Bilib oling">
        Nega shunchaki <code>len(contacts) + 1</code> deb ID bermaymiz? Chunki agar biror
        kontaktni o'chirsak, ro'yxat uzunligi kamayadi va keyingi yangi kontakt eskisi bilan bir
        xil ID olib qolishi mumkin — bu esa chalkashlikka olib keladi. Alohida hisoblagich (
        <code>next_id</code>) bu muammoni oldini oladi.
      </Callout>

      <h2>Create — yangi kontakt qo'shish</h2>
      <CodeBlock lang="python">{`@app.post("/contacts", status_code=201)
def create_contact(contact_data: ContactCreate):
    contact = Contact(id=generate_id(), **contact_data.model_dump())
    contacts.append(contact)
    return contact`}</CodeBlock>
      <p>Yangi narsalar:</p>
      <ul>
        <li>
          <code>status_code=201</code> — decoratorga qo'shimcha parametr berdik.{' '}
          <code>201 Created</code> — "yangi resurs muvaffaqiyatli yaratildi" degan maxsus status
          kodi. (Eslatma: oddiy <code>GET</code> uchun <code>200 OK</code> ishlatiladi, biz buni
          standart holda avtomatik olamiz — hozirgacha alohida yozmagan edik.)
        </li>
        <li>
          <code>contact_data.model_dump()</code> — Pydantic modelini oddiy Python dict'ga
          aylantiradi. Masalan <code>ContactCreate(full_name="Ali", phone="123")</code> →{' '}
          <code>
            {'{'}"full_name": "Ali", "phone": "123", "email": None, "notes": None, "is_favorite":
            False{'}'}
          </code>
          .
        </li>
        <li>
          <code>Contact(id=generate_id(), **contact_data.model_dump())</code> — yangi{' '}
          <code>Contact</code> obyektini yaratamiz: <code>id</code>ni o'zimiz beramiz, qolgan
          maydonlarni esa <code>**</code> (dict'ni "yoyish" operatori) yordamida{' '}
          <code>contact_data</code>dan olamiz.
        </li>
        <li>
          <code>contacts.append(contact)</code> — yangi kontaktni ro'yxatimizga qo'shamiz.
        </li>
      </ul>

      <h2>Read — o'qish (ro'yxat va bitta kontakt)</h2>
      <CodeBlock lang="python">{`@app.get("/contacts")
def list_contacts():
    return contacts


@app.get("/contacts/{contact_id}")
def get_contact(contact_id: int):
    for contact in contacts:
        if contact.id == contact_id:
            return contact
    raise HTTPException(status_code=404, detail="Kontakt topilmadi")`}</CodeBlock>
      <p>
        <code>GET /contacts</code> juda oddiy — butun ro'yxatni qaytaramiz. FastAPI Pydantic
        obyektlar ro'yxatini avtomatik JSON massiviga aylantiradi.
      </p>
      <p>
        <code>GET /contacts/{'{contact_id}'}</code> esa yangi tushunchani o'z ichiga oladi —{' '}
        <strong>path parametr</strong>:
      </p>
      <ul>
        <li>
          <code>{'{contact_id}'}</code> — manzil ichidagi joker belgi. Kimdir{' '}
          <code>/contacts/5</code> ga so'rov yuborsa, FastAPI <code>contact_id = 5</code> deb
          funksiyaga uzatadi.
        </li>
        <li>
          <code>contact_id: int</code> — biz turini <code>int</code> deb belgiladik. FastAPI
          manzildagi matnni (<code>"5"</code>) avtomatik ravishda butun songa (<code>5</code>)
          aylantiradi. Agar kimdir <code>/contacts/abc</code> desa nima bo'ladi? Pastda ko'ramiz.
        </li>
        <li>
          <code>raise HTTPException(status_code=404, detail="Kontakt topilmadi")</code> — agar{' '}
          <code>for</code> sikli hech qanday mos kontakt topmasa (ya'ni <code>return</code>{' '}
          ishga tushmasa), biz maxsus xato ko'taramiz. <code>HTTPException</code> — FastAPI'ga
          tegishli maxsus Python xatosi bo'lib, uni "ko'targaningizda" (<code>raise</code>),
          FastAPI buni avtomatik to'g'ri HTTP javobiga aylantiradi.
        </li>
      </ul>
      <Callout type="tip" title="Bilib oling">
        Nega oddiy <code>return {'{'}"error": "topilmadi"{'}'}</code> emas? Agar shunchaki dict
        qaytarsak, status kodi baribir <code>200 OK</code> bo'lib qoladi — client esa "hammasi
        joyida" deb o'ylaydi, faqat javob matnini o'qib ko'rgandagina xato borligini bilib oladi.{' '}
        <code>HTTPException</code> esa <strong>to'g'ri status kodni</strong> (
        <code>404 Not Found</code>) ham qaytaradi — bu API'lar bilan ishlashning umumiy qoidasi
        va yaxshi odati hisoblanadi.
      </Callout>

      <h2>Update — yangilash</h2>
      <CodeBlock lang="python">{`@app.put("/contacts/{contact_id}")
def update_contact(contact_id: int, contact_data: ContactCreate):
    for index, contact in enumerate(contacts):
        if contact.id == contact_id:
            updated_contact = Contact(id=contact_id, **contact_data.model_dump())
            contacts[index] = updated_contact
            return updated_contact
    raise HTTPException(status_code=404, detail="Kontakt topilmadi")`}</CodeBlock>
      <p>Bu yerda ikkita narsa bir vaqtda ishlatilgan:</p>
      <ul>
        <li>
          <strong>Path parametr</strong> (<code>contact_id: int</code>) — qaysi kontaktni
          yangilash kerakligini bildiradi.
        </li>
        <li>
          <strong>Request body</strong> (<code>contact_data: ContactCreate</code>) — kontaktning
          yangi ma'lumotlarini oladi.
        </li>
      </ul>
      <p>
        FastAPI bularni avtomatik farqlaydi: manzil ichida yozilgani (<code>{'{contact_id}'}</code>
        ) — path parametr, <code>BaseModel</code>dan meros olgani (<code>ContactCreate</code>) —
        body, deb tushunadi.
      </p>
      <p>
        <code>enumerate(contacts)</code> — ro'yxat elementlari bilan birga ularning{' '}
        <strong>indeksini</strong> ham beradi (<code>index</code>), chunki kontaktni yangilash
        uchun uni ro'yxatdagi o'rnini bilishimiz kerak: <code>contacts[index] = updated_contact</code>.
      </p>
      <Callout type="tip" title="Bilib oling">
        Bu yerda biz <code>PUT</code>dan foydalanmoqdamiz — bu barcha maydonlarni{' '}
        <strong>to'liq almashtirish</strong> degani (client hamma maydonni qayta yuborishi kerak).
        Agar faqat bitta maydonni (masalan, faqat <code>is_favorite</code>ni) o'zgartirish
        imkonini bermoqchi bo'lsak, buning uchun <code>PATCH</code> metodi ishlatiladi — buni
        keyinroq, kerak bo'lganda ko'rib chiqamiz.
      </Callout>

      <h2>Delete — o'chirish</h2>
      <CodeBlock lang="python">{`@app.delete("/contacts/{contact_id}")
def delete_contact(contact_id: int):
    for index, contact in enumerate(contacts):
        if contact.id == contact_id:
            contacts.pop(index)
            return {"message": "Kontakt o'chirildi"}
    raise HTTPException(status_code=404, detail="Kontakt topilmadi")`}</CodeBlock>
      <p>
        <code>contacts.pop(index)</code> — ro'yxatdan berilgan indeksdagi elementni olib
        tashlaydi. Bu yerda ham xuddi avvalgi endpointlar kabi — agar kontakt topilmasa,{' '}
        <code>404</code> xato qaytaramiz.
      </p>

      <h2>Sinab ko'ramiz</h2>
      <p>
        Serverni ishga tushirib (<code>uv run uvicorn main:app --reload</code>), <code>/docs</code>{' '}
        orqali quyidagi ketma-ketlikni sinab ko'ring:
      </p>
      <p>
        <strong>1. Ikkita kontakt yaratamiz:</strong>{' '}
        <code>POST /contacts</code> →{' '}
        <code>{'{'}"full_name": "Ali Valiyev", "phone": "+998901234567"{'}'}</code>
      </p>
      <CodeBlock lang="json">{`// 201 Created
{
  "full_name": "Ali Valiyev",
  "phone": "+998901234567",
  "email": null,
  "notes": null,
  "is_favorite": false,
  "id": 1
}`}</CodeBlock>
      <p>
        <code>POST /contacts</code> →{' '}
        <code>
          {'{'}"full_name": "Vali Aliyev", "phone": "+998907654321", "is_favorite": true{'}'}
        </code>{' '}
        → <code>id: 2</code> bilan qaytadi.
      </p>
      <p>
        <strong>2. Ro'yxatni ko'ramiz:</strong> <code>GET /contacts</code> → ikkala kontakt ham
        bor bo'lgan massiv qaytadi (<code>200 OK</code>).
      </p>
      <p>
        <strong>3. Mavjud bo'lmagan kontaktni so'raymiz:</strong> <code>GET /contacts/99</code>
      </p>
      <CodeBlock lang="json">{`// 404 Not Found
{
  "detail": "Kontakt topilmadi"
}`}</CodeBlock>
      <p>
        <strong>4. Path parametrga noto'g'ri tur yuboramiz:</strong> <code>GET /contacts/abc</code>
      </p>
      <CodeBlock lang="json">{`// 422 Unprocessable Entity
{
  "detail": [
    {
      "type": "int_parsing",
      "loc": ["path", "contact_id"],
      "msg": "Input should be a valid integer, unable to parse string as an integer",
      "input": "abc"
    }
  ]
}`}</CodeBlock>
      <p>
        Diqqat qiling — bu xatoni biz hech qayerda o'zimiz yozmadik! Biz shunchaki{' '}
        <code>contact_id: int</code> deb tur belgilaganimiz uchun, FastAPI matnni songa
        aylantira olmasa, avtomatik shu xatoni qaytaradi. 2-darsda ko'rgan validatsiya endi path
        parametrlar uchun ham xuddi shunday ishlayapti.
      </p>
      <p>
        <strong>5. Kontaktni yangilaymiz:</strong> <code>PUT /contacts/1</code> →{' '}
        <code>
          {'{'}"full_name": "Ali Valiyev", "phone": "+998901111111", "is_favorite": true{'}'}
        </code>{' '}
        → yangilangan Contact qaytadi, <code>id: 1</code> saqlanib qoladi.
      </p>
      <p>
        <strong>6. Kontaktni o'chiramiz:</strong> <code>DELETE /contacts/2</code>
      </p>
      <CodeBlock lang="json">{`// 200 OK
{
  "message": "Kontakt o'chirildi"
}`}</CodeBlock>
      <p>
        <code>GET /contacts</code> qilib ko'rsangiz, endi faqat <code>id: 1</code> bo'lgan kontakt
        qolganini ko'rasiz. Agar <code>DELETE /contacts/2</code>ni yana bir marta yuborsangiz —
        endi u topilmaydi, <code>404</code> qaytadi.
      </p>

      <Quiz
        question="Nega Contact modeli alohida (ContactCreate'dan meros olib) yaratilgan, faqat bitta model ishlatilmagan?"
        options={[
          'Chunki Pydantic bir nechta modelsiz ishlamaydi',
          'Chunki client yangi kontakt yaratganda id yubormaydi, lekin server javobda id qaytarishi kerak',
          "Bu shunchaki kod ko'rinishini chiroyli qilish uchun",
          "Chunki id maydoni har doim matn (str) bo'lishi kerak",
        ]}
        correctIndex={1}
        explanation="ContactCreate - client yuboradigan (id'siz) shakl, Contact esa server qaytaradigan (id bilan) shakl. Ular ajratilgani uchun har biri o'z vazifasiga mos keladi."
      />

      <Exercise title="Mustaqil mashq">
        <ul>
          <li>
            Yuqoridagi barcha sinovlarni o'zingiz <code>/docs</code> orqali qaytadan bajaring —
            ayniqsa 404 va 422 xatolarini o'z ko'zingiz bilan ko'ring.
          </li>
          <li>
            Yangi endpoint qo'shing: <code>GET /contacts/count</code>, u hozircha bazadagi
            kontaktlar sonini qaytarsin: <code>{'{'}"count": &lt;son&gt;{'}'}</code>. Diqqat: bu
            endpointni albatta <code>GET /contacts/{'{contact_id}'}</code>dan{' '}
            <strong>oldin</strong> yozing — aks holda FastAPI <code>"count"</code> so'zini{' '}
            <code>contact_id</code> sifatida (va uni songa aylantirishga urinib, xato) qabul
            qilib qoladi!
          </li>
        </ul>
        <Solution>
          <CodeBlock lang="python">{`@app.get("/contacts/count")
def count_contacts():
    return {"count": len(contacts)}


@app.get("/contacts/{contact_id}")
def get_contact(contact_id: int):
    for contact in contacts:
        if contact.id == contact_id:
            return contact
    raise HTTPException(status_code=404, detail="Kontakt topilmadi")`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          CRUD — Create/Read/Update/Delete, mos ravishda <code>POST</code>/<code>GET</code>/
          <code>PUT</code>/<code>DELETE</code> HTTP metodlariga to'g'ri keladi.
        </li>
        <li>
          Ikkita bog'liq Pydantic modeli — <code>ContactCreate</code> (kirish) va undan meros
          olgan <code>Contact</code> (chiqish, ID bilan).
        </li>
        <li>
          Xotirada (Python list) oddiy "soxta baza" yaratish, ID generatsiya qilish (
          <code>global</code> kalit so'zi).
        </li>
        <li>
          Path parametrlar (<code>{'{contact_id}'}</code>) va ularning avtomatik tur tekshiruvi.
        </li>
        <li>
          <code>HTTPException</code> yordamida to'g'ri status kod (<code>404</code>) bilan xato
          qaytarish.
        </li>
        <li>
          <code>status_code=201</code> — resurs yaratilganda to'g'ri status kod qaytarish odati.
        </li>
      </KeyPoints>
    </>
  )
}
