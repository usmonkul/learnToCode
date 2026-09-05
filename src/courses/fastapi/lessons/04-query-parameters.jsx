import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Query parametrlar — qidiruv, filtr, sahifalash',
  section: 'CRUD amallari',
}

export default function QueryParametersLesson() {
  return (
    <>
      <h2>
        Muammo: <code>GET /contacts</code> juda "qo'pol"
      </h2>
      <p>
        Hozircha <code>GET /contacts</code> har doim <strong>butun ro'yxatni</strong> qaytaradi.
        Bu 4 ta kontakt bilan muammo emas, lekin tasavvur qiling — real ilovada 10,000 ta kontakt
        bo'lsa nima bo'ladi?
      </p>
      <ul>
        <li>Client faqat ismida "Ali" bor kontaktlarni ko'rmoqchi bo'lsa-chi?</li>
        <li>Client faqat "sevimlilar"ni ko'rmoqchi bo'lsa-chi?</li>
        <li>10,000 ta kontaktni bitta so'rovda yuborish sekin va isrofgarchilik bo'lmaydimi?</li>
        <li>Ismlar tartibida yoki ID tartibida ko'rsatishni tanlash imkoni kerak emasmi?</li>
      </ul>
      <p>
        Bularning barchasi — <strong>query parametrlar</strong> yordamida yechiladi.
      </p>

      <h2>Query parametr path parametrdan nimasi bilan farq qiladi?</h2>
      <p>
        3-darsda <code>contact_id</code> degan <strong>path parametr</strong>ni ko'rgan edik — u
        manzilning bir qismi edi: <code>/contacts/{'{contact_id}'}</code>.
      </p>
      <p>
        <strong>Query parametr</strong> esa manzil oxirida <code>?</code> belgisidan keyin,{' '}
        <code>kalit=qiymat</code> shaklida, <code>&amp;</code> bilan ajratilib yoziladi:
      </p>
      <CodeBlock lang="text">{`GET /contacts?search=ali&favorites_only=true&limit=5`}</CodeBlock>
      <p>
        FastAPI'da buni yozish uchun sizga hech qanday maxsus sintaksis kerak emas — funksiyaga
        oddiy parametr sifatida qo'shsangiz bo'ldi:
      </p>
      <CodeBlock lang="python">{`@app.get("/contacts")
def list_contacts(search: str | None = None):
    ...`}</CodeBlock>
      <Callout type="tip" title="Bilib oling — FastAPI qanday tushunadi bu query parametr ekanini?">
        Qoida juda oddiy: FastAPI funksiya parametrlariga qarab, avtomatik uchta toifaga ajratadi:
        agar parametr nomi manzildagi <code>{'{ }'}</code> ichida bo'lsa →{' '}
        <strong>path parametr</strong>; agar parametr turi <code>BaseModel</code>dan meros olsa →{' '}
        <strong>request body</strong>; qolgan barcha oddiy turdagi (<code>str</code>,{' '}
        <code>int</code>, <code>bool</code>, ...) parametrlar → <strong>query parametr</strong>.
        Demak, biz hech qayerda "bu query parametr" deb yozmaymiz — FastAPI buni parametrning
        o'zidan bilib oladi.
      </Callout>

      <h2>
        Ixtiyoriy qidiruv: <code>search</code>
      </h2>
      <CodeBlock lang="python">{`@app.get("/contacts")
def list_contacts(search: str | None = None):
    results = contacts

    if search:
        results = [c for c in results if search.lower() in c.full_name.lower()]

    return results`}</CodeBlock>
      <ul>
        <li>
          <code>search: str | None = None</code> — 2-darsda ko'rgan xuddi shu yozuv. Standart
          qiymat borligi uchun bu <strong>ixtiyoriy</strong> query parametr:{' '}
          <code>GET /contacts</code> (search'siz) ham, <code>GET /contacts?search=ali</code> ham
          ishlaydi.
        </li>
        <li>
          <code>search.lower() in c.full_name.lower()</code> — katta-kichik harflarga sezgir
          bo'lmasligi uchun ikkalasini ham kichik harfga o'tkazamiz, so'ng bittasi ikkinchisi
          ichida bor-yo'qligini tekshiramiz.
        </li>
      </ul>
      <p>
        <code>GET /contacts?search=ali</code> so'rovi natijasida ismida "ali" (katta-kichik harf
        farqisiz) bo'lgan barcha kontaktlar qaytadi — masalan "Ali Karimov", "Vali Aliyev", "Aziz
        Aliyev" kabi.
      </p>

      <h2>
        Mantiqiy filtr: <code>favorites_only</code>
      </h2>
      <CodeBlock lang="python">{`def list_contacts(search: str | None = None, favorites_only: bool = False):
    results = contacts

    if search:
        results = [c for c in results if search.lower() in c.full_name.lower()]

    if favorites_only:
        results = [c for c in results if c.is_favorite]

    return results`}</CodeBlock>
      <p>
        <code>bool</code> turidagi query parametrlar juda qulay —{' '}
        <code>GET /contacts?favorites_only=true</code> deb yuborsangiz bo'ldi, FastAPI{' '}
        <code>"true"</code> matnini avtomatik <code>True</code> qiymatiga aylantiradi.
      </p>
      <p>
        Diqqat qiling — biz filtrlarni <strong>ketma-ket</strong> qo'llayapmiz: avval{' '}
        <code>search</code> bo'yicha, so'ng natija ustidan yana <code>favorites_only</code>{' '}
        bo'yicha. Bu ikkala filtrni birga ham ishlatish imkonini beradi:{' '}
        <code>?search=ali&amp;favorites_only=true</code>.
      </p>

      <h2>
        Cheklangan variantli saralash: <code>Enum</code>
      </h2>
      <p>
        Saralash uchun clientga "istalgan maydon bo'yicha" saralash imkonini berish xavfli —
        masalan kimdir <code>sort_by=parol_hash</code> desa-chi (agar bunday maydon bo'lganida)?
        Bizga <strong>faqat ruxsat etilgan variantlar</strong> kerak. Buning uchun Python'ning{' '}
        <code>Enum</code> klassidan foydalanamiz:
      </p>
      <CodeBlock lang="python">{`from enum import Enum


class SortBy(str, Enum):
    id = "id"
    full_name = "full_name"


class SortOrder(str, Enum):
    asc = "asc"
    desc = "desc"`}</CodeBlock>
      <p>
        <code>class SortBy(str, Enum):</code> — bu ham <code>str</code>, ham <code>Enum</code>{' '}
        xususiyatlariga ega klass yaratadi. Har bir qator (<code>id = "id"</code>) — ruxsat
        etilgan bitta variantni bildiradi. Buni query parametr turi sifatida ishlatganimizda,
        FastAPI avtomatik ravishda: faqat shu ikki qiymatdan birini qabul qiladi, boshqasini
        yuborishga urinilsa — <strong>422 xato</strong> qaytaradi, <strong>va</strong>{' '}
        <code>/docs</code> sahifasida bu parametr uchun matn maydoni o'rniga tayyor tanlov
        ro'yxati (dropdown) ko'rsatiladi!
      </p>
      <p>Endi funksiyaga qo'shamiz:</p>
      <CodeBlock lang="python">{`def list_contacts(
    search: str | None = None,
    favorites_only: bool = False,
    sort_by: SortBy = SortBy.id,
    order: SortOrder = SortOrder.asc,
):
    results = contacts
    # ... search va favorites_only filtrlari ...

    results = sorted(
        results,
        key=lambda c: getattr(c, sort_by.value),
        reverse=(order == SortOrder.desc),
    )

    return results`}</CodeBlock>
      <ul>
        <li>
          <code>sorted(results, key=..., reverse=...)</code> — Python'ning standart saralash
          funksiyasi. <code>key</code> — har bir elementdan nima bo'yicha saralashni bildiradi,{' '}
          <code>reverse=True</code> bo'lsa — kamayish tartibida.
        </li>
        <li>
          <code>getattr(c, sort_by.value)</code> — bu yerda kichik "sehr" bor:{' '}
          <code>sort_by</code> — bu <code>SortBy.id</code> yoki <code>SortBy.full_name</code>{' '}
          degan Enum qiymati, uning <code>.value</code> qismi esa oddiy matn (<code>"id"</code>{' '}
          yoki <code>"full_name"</code>). <code>getattr(obyekt, "maydon_nomi")</code> funksiyasi —
          obyektning shu nomdagi maydoni qiymatini qaytaradi. Ya'ni{' '}
          <code>getattr(c, "full_name")</code> aslida <code>c.full_name</code> bilan bir xil —
          lekin bu safar maydon nomi <strong>o'zgaruvchida</strong> saqlangan, shuning uchun{' '}
          <code>c.full_name</code> deb to'g'ridan-to'g'ri yoza olmaymiz (chunki{' '}
          <code>sort_by</code> runtime'da aniqlanadi).
        </li>
      </ul>

      <h2>
        Sahifalash (pagination): <code>skip</code> va <code>limit</code>
      </h2>
      <p>Endi eng muhim optimallashtirish — butun ro'yxatni emas, faqat bir "bo'lak"ini qaytarish:</p>
      <CodeBlock lang="python">{`from fastapi import FastAPI, HTTPException, Query

def list_contacts(
    # ... yuqoridagi parametrlar ...
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=10, ge=1, le=50),
):
    # ... filtr va saralashdan keyin ...
    return results[skip : skip + limit]`}</CodeBlock>
      <p>Ikkita yangi narsa:</p>
      <ul>
        <li>
          <code>results[skip : skip + limit]</code> — Python'ning <strong>slice</strong> (bo'lak
          olish) sintaksisi. Masalan <code>skip=2, limit=3</code> bo'lsa,{' '}
          <code>results[2:5]</code> — ya'ni 3-elementdan boshlab, 3 tasini oladi (indekslar 0'dan
          boshlanishini eslang). Bu — "sahifalash" mantig'ining o'zi: <code>skip</code> — nechta
          elementni tashlab ketish, <code>limit</code> — nechtasini qaytarish.
        </li>
        <li>
          <code>Query(default=0, ge=0)</code> — bu safar standart qiymatni oddiy <code>= 0</code>{' '}
          deb emas, <code>fastapi.Query(...)</code> funksiyasi orqali beryapmiz. Bu bizga standart
          qiymatdan tashqari, <strong>qo'shimcha cheklovlar</strong> qo'yish imkonini beradi:{' '}
          <code>ge=0</code> — "greater than or equal", ya'ni qiymat 0 dan kichik bo'lmasin.{' '}
          <code>limit</code> uchun <code>ge=1, le=50</code> — 1 dan 50 gacha bo'lgan oraliqda
          bo'lsin (aks holda kimdir <code>limit=1000000</code> deb butun bazani so'rab olishi
          mumkin edi).
        </li>
      </ul>
      <Callout type="tip" title="Bilib oling">
        <code>Query(...)</code> — bu xuddi 2-darsdagi Pydantic modelidagi maydonlar kabi, lekin
        endi bu <strong>query parametrlar</strong> uchun. Body maydonlariga cheklov qo'yishning
        o'xshash usuli (<code>Field(...)</code>) bilan 6-darsda tanishamiz — mantiq deyarli bir
        xil.
      </Callout>

      <h2>
        Yakuniy <code>list_contacts</code> funksiyasi
      </h2>
      <CodeBlock lang="python">{`@app.get("/contacts")
def list_contacts(
    search: str | None = None,
    favorites_only: bool = False,
    sort_by: SortBy = SortBy.id,
    order: SortOrder = SortOrder.asc,
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=10, ge=1, le=50),
):
    results = contacts

    if search:
        results = [c for c in results if search.lower() in c.full_name.lower()]

    if favorites_only:
        results = [c for c in results if c.is_favorite]

    results = sorted(
        results,
        key=lambda c: getattr(c, sort_by.value),
        reverse=(order == SortOrder.desc),
    )

    return results[skip : skip + limit]`}</CodeBlock>
      <p>
        Diqqat qiling — bu yerda oltita parametrning barchasi ixtiyoriy (hammasi standart
        qiymatga ega). Demak <code>GET /contacts</code> (hech qanday query parametrsiz) ham
        hozirgidek ishlayveradi — biz faqat <strong>imkoniyat</strong> qo'shdik, eskisini
        buzmadik.
      </p>

      <h2>Sinab ko'ramiz</h2>
      <p>
        To'rtta kontakt yaratamiz deb faraz qilaylik: Vali Aliyev (sevimli), Ali Karimov, Aziz
        Aliyev (sevimli), Bekzod Yusupov (<code>id</code> mos ravishda 1, 2, 3, 4).
      </p>

      <table className="my-4 w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-canvas-muted">
            <th className="p-3 font-semibold text-ink">So'rov</th>
            <th className="p-3 font-semibold text-ink">Natija</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>GET /contacts</code>
            </td>
            <td className="p-3 text-ink-muted">
              Hammasi, <code>id</code> bo'yicha o'sish tartibida (1, 2, 3, 4)
            </td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>GET /contacts?search=ali</code>
            </td>
            <td className="p-3 text-ink-muted">
              Vali Aliyev, Ali Karimov, Aziz Aliyev (Bekzod Yusupov yo'q)
            </td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>GET /contacts?favorites_only=true</code>
            </td>
            <td className="p-3 text-ink-muted">Vali Aliyev va Aziz Aliyev</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>GET /contacts?sort_by=full_name</code>
            </td>
            <td className="p-3 text-ink-muted">
              Ali Karimov, Aziz Aliyev, Bekzod Yusupov, Vali Aliyev (alifbo tartibida)
            </td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>GET /contacts?sort_by=full_name&amp;order=desc</code>
            </td>
            <td className="p-3 text-ink-muted">Vali Aliyev, Bekzod Yusupov, Aziz Aliyev, Ali Karimov</td>
          </tr>
          <tr className="border-b border-line">
            <td className="p-3 font-medium text-ink">
              <code>GET /contacts?skip=1&amp;limit=2</code>
            </td>
            <td className="p-3 text-ink-muted">
              ID bo'yicha tartiblangan ro'yxatning 2- va 3-elementlari (Ali Karimov va Aziz
              Aliyev)
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Limitdan oshib ketish</strong> — <code>GET /contacts?limit=51</code> →{' '}
        <code>422 Unprocessable Entity</code>:
      </p>
      <CodeBlock lang="json">{`{
  "detail": [
    {
      "type": "less_than_equal",
      "loc": ["query", "limit"],
      "msg": "Input should be less than or equal to 50",
      "input": "51",
      "ctx": { "le": 50 }
    }
  ]
}`}</CodeBlock>
      <p>
        <strong>Ruxsat etilmagan sort_by qiymati</strong> — <code>GET /contacts?sort_by=phone</code> →{' '}
        <code>422</code>:
      </p>
      <CodeBlock lang="json">{`{
  "detail": [
    {
      "type": "enum",
      "loc": ["query", "sort_by"],
      "msg": "Input should be 'id' or 'full_name'",
      "input": "phone",
      "ctx": { "expected": "'id' or 'full_name'" }
    }
  ]
}`}</CodeBlock>
      <p>
        Bu ikkala xatoni ham biz hech qayerda if bilan tekshirmadik — <code>Enum</code> va{' '}
        <code>Query(ge=..., le=...)</code> buni bizning o'rnimizga bajardi.
      </p>

      <Quiz
        question="GET /contacts?favorites_only=true&sort_by=phone so'rovi yuborilsa nima bo'ladi?"
        options={[
          "So'rov bajariladi, lekin saralash e'tiborsiz qoldiriladi",
          "422 xato qaytadi, chunki phone SortBy Enum'ida ruxsat etilgan qiymat emas",
          "phone maydoni avtomatik full_name'ga almashtiriladi",
          "Faqat favorites_only ishlaydi, sort_by umuman e'tiborga olinmaydi",
        ]}
        correctIndex={1}
        explanation="SortBy Enum faqat 'id' va 'full_name' qiymatlarini ruxsat etadi. 'phone' bu ro'yxatda yo'q, shuning uchun FastAPI avtomatik 422 xato qaytaradi."
      />

      <Exercise title="Mustaqil mashq">
        <ul>
          <li>
            <code>/docs</code> orqali yuqoridagi barcha misollarni o'zingiz sinab ko'ring,
            natijalarni oldindan taxmin qiling, keyin solishtiring.
          </li>
          <li>
            Yangi query parametr qo'shing: <code>has_email: bool = False</code> — <code>true</code>{' '}
            bo'lsa, faqat <code>email</code> maydoni to'ldirilgan (ya'ni <code>None</code> emas)
            kontaktlarni qaytarsin.
          </li>
          <li>
            Hozirgi kodda, agar <code>contacts</code> bo'sh bo'lsa yoki <code>search</code> hech
            narsaga mos kelmasa, funksiya bo'sh ro'yxat (<code>[]</code>) qaytaradi, xato emas.
            Nega bu — xato emas, balki to'g'ri xulq-atvor ekanini tushuntirib bering (qachon bo'sh
            natija normal, qachon 404 kerak bo'lishini solishtiring — 3-darsdagi{' '}
            <code>get_contact</code>ni eslang).
          </li>
        </ul>
        <Solution>
          <CodeBlock lang="python">{`def list_contacts(
    search: str | None = None,
    favorites_only: bool = False,
    has_email: bool = False,
    sort_by: SortBy = SortBy.id,
    order: SortOrder = SortOrder.asc,
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=10, ge=1, le=50),
):
    results = contacts

    if search:
        results = [c for c in results if search.lower() in c.full_name.lower()]

    if favorites_only:
        results = [c for c in results if c.is_favorite]

    if has_email:
        results = [c for c in results if c.email is not None]

    results = sorted(
        results,
        key=lambda c: getattr(c, sort_by.value),
        reverse=(order == SortOrder.desc),
    )

    return results[skip : skip + limit]`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Query parametr path parametrdan (manzil ichida) va body'dan (<code>BaseModel</code>)
          farq qiladi — u manzil oxirida <code>?kalit=qiymat</code> shaklida yoziladi.
        </li>
        <li>Ixtiyoriy str | None va bool query parametrlar bilan filtrlash mumkin.</li>
        <li>
          <code>Enum</code> yordamida query parametrni cheklangan variantlar bilan chegaralash
          mumkin — bonus sifatida <code>/docs</code>da avtomatik dropdown paydo bo'ladi.
        </li>
        <li>
          <code>sorted()</code> va <code>getattr()</code> yordamida dinamik saralash amalga
          oshiriladi.
        </li>
        <li>
          <code>Query(default=..., ge=..., le=...)</code> yordamida son chegaralarini belgilash
          mumkin.
        </li>
        <li>
          Python slice sintaksisi (<code>list[skip:skip+limit]</code>) yordamida sahifalash amalga
          oshiriladi.
        </li>
      </KeyPoints>
    </>
  )
}
