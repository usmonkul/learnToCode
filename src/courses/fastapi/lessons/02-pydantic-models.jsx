import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Pydantic modellar bilan ma'lumotni shakllantirish",
  section: "Ma'lumot modellari",
}

export default function PydanticModelsLesson() {
  return (
    <>
      <h2>Muammo: dict'lar hech narsani kafolatlamaydi</h2>
      <p>1-darsda biz shunday yozgan edik:</p>
      <CodeBlock lang="python">{`@app.get("/")
def read_root():
    return {"message": "Contact App API ishga tushdi!"}`}</CodeBlock>
      <p>
        Bu yerda muammo yo'q, chunki biz faqat <strong>javob qaytaryapmiz</strong>. Lekin endi
        tasavvur qiling — biz clientdan yangi kontakt ma'lumotini <strong>qabul qilishimiz</strong>{' '}
        kerak (POST so'rov orqali). Agar buni oddiy Python bilan yozsak:
      </p>
      <CodeBlock lang="python">{`@app.post("/contacts")
def create_contact(contact: dict):
    return contact`}</CodeBlock>
      <p>Bu ishlaydi, lekin juda ko'p muammosi bor:</p>
      <ul>
        <li>
          Client <code>{'{'}"ism": "Ali"{'}'}</code> yuborsa ham, <code>{'{'}"random_key": 123{'}'}</code>{' '}
          yuborsa ham — funksiya baribir ishga tushadi. Hech qanday tekshiruv yo'q.
        </li>
        <li>
          Kontaktda qanday maydonlar bo'lishi kerakligini (ism, telefon, email) hech yerda yozib
          qo'ymagansiz — bu faqat sizning boshingizda.
        </li>
        <li>
          <code>/docs</code> sahifasida ham FastAPI bu "contact" aslida qanday ko'rinishga ega
          ekanini ko'rsata olmaydi, chunki <code>dict</code> — bu "istalgan narsa" degani.
        </li>
      </ul>
      <p>
        Bizga kerak: "Kontakt aynan shunday maydonlarga ega bo'lishi kerak" deb, bir marta e'lon
        qiladigan va FastAPI buni o'zi tekshiradigan vosita. Ana shu vosita — <strong>Pydantic</strong>.
      </p>

      <h2>Pydantic nima?</h2>
      <p>
        <strong>Pydantic</strong> — Python uchun ma'lumotlar validatsiyasi kutubxonasi. U sizga
        oddiy Python klassi yordamida ma'lumotning "shakli"ni (schema) tasvirlash imkonini beradi,
        so'ng kelgan ma'lumot shu shaklga mos kelishini avtomatik tekshiradi.
      </p>
      <p>
        FastAPI'ning o'zi ham ichkarida Pydantic'dan foydalanadi — shuning uchun ular bir-biriga
        juda mos ishlaydi. Aslida, FastAPI + Pydantic kombinatsiyasi aynan shu framework'ning eng
        katta kuchli tomonlaridan biri hisoblanadi.
      </p>
      <Callout type="tip" title="Bilib oling">
        Siz SQL'da jadval yaratganda ustunlar uchun tur belgilaysiz (<code>VARCHAR</code>,{' '}
        <code>INT</code>, <code>BOOLEAN</code>). Pydantic modeli ham aynan shunga o'xshaydi —
        faqat bu SQL jadvali emas, balki <strong>ma'lumot shakli</strong> bo'lib, u API orqali
        qabul qilinadigan yoki qaytariladigan ma'lumotni tasvirlaydi.
      </Callout>

      <h2>
        Birinchi Pydantic modelimiz: <code>Contact</code>
      </h2>
      <p>
        <code>main.py</code> faylimizni ochamiz va yangi import qo'shamiz:
      </p>
      <CodeBlock lang="python">{`from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Contact(BaseModel):
    full_name: str
    phone: str
    email: str | None = None
    notes: str | None = None
    is_favorite: bool = False`}</CodeBlock>
      <p>Keling, bu klassni qatordan-qator tushunib chiqamiz:</p>
      <ul>
        <li>
          <code>class Contact(BaseModel):</code> — Pydantic'ning <code>BaseModel</code> klassidan
          meros oladigan yangi klass yaratamiz. Shu bir qatorning o'zi bu klassga "validatsiya
          qila olish" super-kuchini beradi.
        </li>
        <li>
          <code>full_name: str</code> — bu maydon <strong>majburiy</strong> (chunki standart
          qiymati yo'q) va u albatta <code>str</code> (matn) turida bo'lishi kerak.
        </li>
        <li>
          <code>phone: str</code> — xuddi shunday, majburiy matn maydoni.
        </li>
        <li>
          <code>email: str | None = None</code> — bu maydon <strong>ixtiyoriy</strong>.{' '}
          <code>str | None</code> degani — "yoki matn, yoki hech narsa (<code>None</code>)"
          degani. <code>= None</code> esa standart qiymatini belgilaydi — agar client bu maydonni
          yubormasa, <code>None</code> qiymati ishlatiladi.
        </li>
        <li>
          <code>notes: str | None = None</code> — xuddi email kabi, ixtiyoriy izoh maydoni.
        </li>
        <li>
          <code>is_favorite: bool = False</code> — mantiqiy (<code>True</code>/<code>False</code>)
          qiymat, standart holatda <code>False</code>.
        </li>
      </ul>
      <Callout type="tip" title="Bilib oling">
        <code>str | None</code> yozuvi — bu Python 3.10+ versiyasida qo'shilgan zamonaviy yozuv
        uslubi bo'lib, "bu qiymat shu turlardan biri bo'lishi mumkin" degan ma'noni bildiradi
        (<strong>Union type</strong>). Eski kodlarda buning o'rniga <code>Optional[str]</code>{' '}
        yozilganini ko'rishingiz mumkin (<code>from typing import Optional</code>) — ikkalasi ham
        xuddi bir xil narsani anglatadi, lekin <code>str | None</code> — hozirgi zamonaviy va
        tavsiya etiladigan uslub.
      </Callout>

      <h2>Modelni request body sifatida ishlatish</h2>
      <p>Endi shu Contact modelidan foydalanib, yangi endpoint yozamiz:</p>
      <CodeBlock lang="python">{`@app.post("/contacts")
def create_contact(contact: Contact):
    return contact`}</CodeBlock>
      <p>
        Diqqat qiling — biz hech qanday qo'shimcha kod yozmadik, faqat parametr turini{' '}
        <code>dict</code> emas, <code>Contact</code> deb belgiladik. FastAPI buni ko'rib,
        avtomatik ravishda quyidagilarni bajaradi:
      </p>
      <ol>
        <li>
          Kelayotgan so'rovning <strong>body</strong> (tanasi) qismini JSON sifatida o'qiydi.
        </li>
        <li>
          Uni <code>Contact</code> modeliga mos kelishini <strong>tekshiradi</strong>{' '}
          (validatsiya).
        </li>
        <li>
          Agar hammasi to'g'ri bo'lsa — tayyor, to'ldirilgan <code>Contact</code> obyektini{' '}
          <code>contact</code> parametriga uzatadi.
        </li>
        <li>
          Agar noto'g'ri bo'lsa — avtomatik ravishda aniq xato xabari bilan{' '}
          <strong>422 status code</strong> qaytaradi (buni pastda ko'ramiz).
        </li>
      </ol>
      <Callout type="tip" title="Bilib oling">
        FastAPI qayerdan bilyaptiki, <code>contact</code> — bu request body, path parametri emas?
        Qoida oddiy: agar parametr turi <code>BaseModel</code>'dan meros olgan klass bo'lsa,
        FastAPI buni avtomatik ravishda "bu JSON body" deb tushunadi. Buni hech qayerda alohida
        yozib qo'yishning hojati yo'q.
      </Callout>

      <h2>Sinab ko'ramiz</h2>
      <p>Serverni ishga tushiring:</p>
      <CodeBlock lang="bash">{`uv run uvicorn main:app --reload`}</CodeBlock>
      <p>
        <code>http://127.0.0.1:8000/docs</code> sahifasini oching. Endi u yerda yangi{' '}
        <code>POST /contacts</code> endpointi paydo bo'lganini, va uning yonida aynan sizning{' '}
        <code>Contact</code> modelingiz asosida tayyor bo'lgan JSON namunasi ko'rsatilganini
        ko'rasiz! Bu — Pydantic modelidan foydalanishning bonusi: hujjatlar avtomatik ravishda
        yanada foydaliroq bo'ladi.
      </p>
      <p>"Try it out" tugmasini bosib, quyidagi ma'lumotni yuboring:</p>
      <CodeBlock lang="json">{`{
  "full_name": "Ali Valiyev",
  "phone": "+998901234567"
}`}</CodeBlock>
      <p>Javobda quyidagini ko'rasiz:</p>
      <CodeBlock lang="json">{`{
  "full_name": "Ali Valiyev",
  "phone": "+998901234567",
  "email": null,
  "notes": null,
  "is_favorite": false
}`}</CodeBlock>
      <p>
        Diqqat qiling — biz <code>email</code>, <code>notes</code>, <code>is_favorite</code>'ni
        yubormagan bo'lsak ham, Pydantic ularni standart qiymatlar bilan avtomatik to'ldirdi.
      </p>

      <h2>Validatsiya ishlashini ko'ramiz</h2>
      <p>
        Endi ataylab xato qilib ko'ramiz. <code>full_name</code>'ni yubormasdan, faqat shuni
        jo'natamiz:
      </p>
      <CodeBlock lang="json">{`{
  "phone": "+998901234567"
}`}</CodeBlock>
      <p>
        Javobda <strong>200 emas, balki 422 status code</strong> va quyidagiga o'xshash xato
        xabarini ko'rasiz:
      </p>
      <CodeBlock lang="json">{`{
  "detail": [
    {
      "type": "missing",
      "loc": ["body", "full_name"],
      "msg": "Field required",
      "input": {
        "phone": "+998901234567"
      }
    }
  ]
}`}</CodeBlock>
      <p>
        Bu xabarni o'qishni o'rganib oling — bu backend dasturchisi sifatida doim ishlatadigan
        ko'nikma:
      </p>
      <ul>
        <li>
          <code>"loc": ["body", "full_name"]</code> — muammo qayerda? So'rov tanasidagi (
          <code>body</code>) <code>full_name</code> maydonida.
        </li>
        <li>
          <code>"msg": "Field required"</code> — muammo nima? Bu maydon majburiy, lekin
          yuborilmagan.
        </li>
        <li>
          <code>"input"</code> — client aslida nima yuborgan edi.
        </li>
      </ul>
      <p>
        Eng muhim narsa shuki — <strong>biz bu tekshiruvni yozish uchun bironta ham if operatori
        ishlatmadik</strong>. Buning hammasini Pydantic va FastAPI bizning o'rnimizga bajardi,
        chunki biz ma'lumot shaklini bir marta, aniq qilib e'lon qildik.
      </p>

      <table className="my-4 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-canvas-muted">
            <th className="p-3 font-semibold text-ink"> </th>
            <th className="p-3 font-semibold text-ink">
              Oddiy <code>dict</code>
            </th>
            <th className="p-3 font-semibold text-ink">
              Pydantic <code>BaseModel</code>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">Qanday maydonlar borligi aniqmi?</td>
            <td className="p-3 text-ink-muted">Yo'q, hujjatsiz</td>
            <td className="p-3 text-ink-muted">Ha, klassning o'zida yozilgan</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">Noto'g'ri ma'lumot kelsa</td>
            <td className="p-3 text-ink-muted">
              Kod ishlab, keyinroq buziladi (yoki xato umuman sezilmaydi)
            </td>
            <td className="p-3 text-ink-muted">Darhol, aniq 422 xato bilan to'xtaydi</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>/docs</code>da ko'rinishi
            </td>
            <td className="p-3 text-ink-muted">"object" (noaniq)</td>
            <td className="p-3 text-ink-muted">Aniq maydonlar va turlar bilan namuna</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">Standart qiymatlar</td>
            <td className="p-3 text-ink-muted">
              Qo'lda <code>dict.get("key", default)</code> yozish kerak
            </td>
            <td className="p-3 text-ink-muted">Modelning o'zida e'lon qilinadi</td>
          </tr>
        </tbody>
      </table>

      <Quiz
        question="full_name maydonini yubormasdan POST /contacts so'rovini yuborsangiz nima bo'ladi?"
        options={[
          "FastAPI full_name'ni bo'sh matn deb hisoblab, so'rovni qabul qiladi",
          '422 status kod va aniq "Field required" xabari qaytadi',
          'Server 500 xato bilan qulaydi',
          "full_name avtomatik ravishda telefon raqamidan olinadi",
        ]}
        correctIndex={1}
        explanation="full_name majburiy maydon (standart qiymati yo'q), shuning uchun Pydantic uni yo'qligini sezib, 422 status kod bilan aniq xato xabarini qaytaradi."
      />

      <Exercise title="Mustaqil mashq">
        <ul>
          <li>
            <code>Contact</code> modeliga yangi ixtiyoriy maydon qo'shing:{' '}
            <code>company: str | None = None</code> (ish joyi). <code>/docs</code> orqali yangi
            maydon avtomatik paydo bo'lganini tekshiring.
          </li>
          <li>
            Ataylab turdagi xato qiling — <code>phone</code> maydoniga matn o'rniga son yuboring
            (masalan <code>"phone": 998901234567</code>, tirnoqsiz) va nima xato qaytishini
            kuzating. Xato xabaridagi <code>"loc"</code> va <code>"msg"</code> qismlarini
            tushuntirib bering (o'zingizga yoki do'stingizga).
          </li>
          <li>
            Yangi Pydantic modeli yarating — <code>Address</code> nomli, <code>city: str</code> va{' '}
            <code>street: str</code> maydonlari bilan. (Hozircha uni hech qayerda ishlatmang —
            shunchaki modelni yozib, tuzilishini his qiling.)
          </li>
        </ul>
        <Solution>
          <CodeBlock lang="python">{`class Contact(BaseModel):
    full_name: str
    phone: str
    email: str | None = None
    notes: str | None = None
    is_favorite: bool = False
    company: str | None = None


class Address(BaseModel):
    city: str
    street: str`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Oddiy dict hech narsani kafolatlamaydi — istalgan kalit va qiymat qabul qilinaveradi.</li>
        <li>
          Pydantic — ma'lumot shaklini (schema) <code>BaseModel</code>dan meros oluvchi klass
          orqali tasvirlash va tekshirish kutubxonasi.
        </li>
        <li>
          <code>str | None = None</code> — ixtiyoriy maydonni belgilashning zamonaviy usuli.
        </li>
        <li>
          Parametr turini <code>BaseModel</code>dan meros oladigan klass qilib belgilash — FastAPI
          buni avtomatik request body deb tushunishi uchun yetarli.
        </li>
        <li>
          Noto'g'ri ma'lumot yuborilganda FastAPI avtomatik <strong>422</strong> xato qaytaradi va
          xato aniq qaysi maydonda (<code>loc</code>) va nimaga (<code>msg</code>) bog'liqligini
          ko'rsatadi.
        </li>
      </KeyPoints>
    </>
  )
}
