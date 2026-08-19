import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Kortejlar (Tuples)',
  section: "Satrlar va ma'lumotlar tuzilmalari",
}

export default function TuplesLesson() {
  return (
    <>
      <p>
        Ro'yxatlar (list) bilan bir qatorda, Python'da yana bir ma'lumot tuzilmasi bor —{' '}
        <strong>kortej (tuple)</strong>. U ro'yxatga juda o'xshaydi: bir nechta qiymatni birgalikda
        saqlaydi, indekslash va kesish ham xuddi ro'yxatdagidek ishlaydi. Lekin ular orasida bitta
        tub farq bor, va aynan shu farq kortejni qachon ishlatishni belgilaydi.
      </p>

      <h2>Kortej yaratish</h2>
      <p>
        Kortej kvadrat qavs <code>[]</code> o'rniga oddiy qavs <code>()</code> ichida yaratiladi:
      </p>
      <CodeBlock lang="python">{`nuqta = (3, 5)
print(nuqta)       # (3, 5)
print(type(nuqta)) # <class 'tuple'>`}</CodeBlock>
      <p>Indekslash va kesish ro'yxatdagi kabi ishlaydi:</p>
      <CodeBlock lang="python">{`rangalar = ("qizil", "yashil", "ko'k")
print(rangalar[0])   # qizil
print(rangalar[-1])  # ko'k
print(rangalar[0:2]) # ('qizil', 'yashil')`}</CodeBlock>

      <h2>Asosiy farq: kortej o'zgarmas (immutable)</h2>
      <p>
        10-darsda ro'yxatlarning <strong>o'zgaruvchan (mutable)</strong> ekanligini, ya'ni
        elementini indeks orqali qayta yozish mumkinligini ko'rgan edik. Kortej esa satr (str)
        kabi <strong>o'zgarmas (immutable)</strong> — bir marta yaratilgach, uning elementini
        o'zgartirib bo'lmaydi:
      </p>
      <CodeBlock lang="python">{`nuqta = (3, 5)
nuqta[0] = 10  # XATO — TypeError: 'tuple' object does not support item assignment`}</CodeBlock>
      <p>Solishtirish uchun, ro'yxat bilan bu xato bermaydi:</p>
      <CodeBlock lang="python">{`royxat = [3, 5]
royxat[0] = 10  # ishlaydi
print(royxat)  # [10, 5]`}</CodeBlock>
      <Callout type="note" title="Nega bu foydali?">
        O'zgarmaslik — bu kamchilik emas, aksincha xususiyat. Agar ma'lumot dastur davomida
        o'zgarmasligi kerakligini bilsangiz (masalan, koordinata yoki sana), kortej ishlatish
        buni ataylab shunday qilib qo'yganingizni bildiradi — boshqa dasturchi (yoki siz
        keyinroq) uni tasodifan o'zgartirib qo'ymaydi.
      </Callout>

      <Quiz
        question="Ro'yxat va kortej orasidagi asosiy farq nima?"
        options={[
          "Kortej faqat sonlarni, ro'yxat esa faqat matnlarni saqlaydi",
          "Kortej o'zgarmas (immutable), ro'yxat esa o'zgaruvchan (mutable)",
          "Kortejda indekslash yo'q, ro'yxatda bor",
          "Ular orasida hech qanday farq yo'q",
        ]}
        correctIndex={1}
        explanation="Ro'yxat elementini indeks orqali qayta yozish mumkin, kortejniki esa mumkin emas — bu ikkisi orasidagi asosiy farq."
      />

      <h2>
        Kortejni "ochish" (unpacking) — 2-darsdagi bir xil mexanizm
      </h2>
      <p>
        2-darsda bir qatorda bir nechta o'zgaruvchiga bir nechta qiymat berishni o'rgangan edik:{' '}
        <code>{`ism, yosh, shahar = "Aziz", 25, "Toshkent"`}</code>. Aslida, o'ng tomondagi{' '}
        <code>{`"Aziz", 25, "Toshkent"`}</code> — bu vergul bilan ajratilgan qiymatlar, ya'ni
        qavssiz yozilgan kortej! Shu sababli kortejni o'zgaruvchilarga "ochib" (unpack qilib)
        berish xuddi o'sha mexanizm:
      </p>
      <CodeBlock lang="python">{`nuqta = (3, 5)
x, y = nuqta
print(x)  # 3
print(y)  # 5`}</CodeBlock>
      <p>
        Bu ishlashi uchun chap tomondagi o'zgaruvchilar soni o'ng tomondagi kortej uzunligiga mos
        kelishi kerak — aks holda xato chiqadi:
      </p>
      <CodeBlock lang="python">{`nuqta = (3, 5, 7)
x, y = nuqta  # XATO — ValueError: too many values to unpack`}</CodeBlock>

      <h2>Kortej qachon ishlatiladi</h2>
      <p>
        Kortej odatda <strong>o'zgarmasligi kerak bo'lgan qattiq (fixed) yozuv</strong>ni
        ifodalash uchun ishlatiladi — masalan, koordinata juftligi:
      </p>
      <CodeBlock lang="python">{`nuqta = (3, 5)          # x, y koordinatasi — bu ikki qiymat birga boradi
rang_kodi = (255, 0, 0)  # RGB rang — qizil`}</CodeBlock>
      <Callout type="tip" title="Oldinga qarab: funksiyalar bir nechta qiymat qaytarishi">
        Keyinroq funksiyalarni (16-darsda) o'rganganimizda ko'ramizki, funksiya bir vaqtning
        o'zida bir nechta qiymat qaytarmoqchi bo'lsa, Python buni kulisa ortida kortej sifatida
        qaytaradi — masalan, <code>{`return x, y`}</code> aslida <code>{`return (x, y)`}</code>{' '}
        degani. Hozircha buni shunchaki bilib qo'yish kifoya.
      </Callout>

      <Exercise title="Mashq">
        <p>
          <code>{`talaba = ("Aziz", 21, "Matematika")`}</code> kortej berilgan (ism, yosh, fakultet).
          Quyidagilarni bajaring:
        </p>
        <ul>
          <li>
            Kortejni <code>ism</code>, <code>yosh</code>, <code>fakultet</code> o'zgaruvchilariga
            "ochib" (unpack qilib) oling.
          </li>
          <li>Ularni f-string yordamida bitta xabarga birlashtirib chop eting.</li>
          <li>
            <code>talaba[0] = "Vali"</code> qatorini yozib, nima xato chiqishini o'ylab ko'ring
            (kodni ishga tushirmang, faqat izoh sifatida yozing).
          </li>
        </ul>
        <Solution>
          <CodeBlock lang="python">{`talaba = ("Aziz", 21, "Matematika")

ism, yosh, fakultet = talaba
print(f"{ism}, {yosh} yosh, {fakultet} fakulteti")

# talaba[0] = "Vali"  # XATO — TypeError: kortej o'zgarmas (immutable),
#                        elementini qayta yozib bo'lmaydi`}</CodeBlock>
        </Solution>
      </Exercise>

      <Quiz
        question={
          'nuqta = (10, 20)  bo\'lsa, a, b = nuqta  yozilganda nima sodir bo\'ladi?'
        }
        options={[
          "a = 10, b = 20 — kortej o'zgaruvchilarga ochiladi",
          "XATO — kortejni ochib bo'lmaydi",
          "a = (10, 20), b = (10, 20)",
          "a = 20, b = 10 — teskari tartibda",
        ]}
        correctIndex={0}
        explanation="Kortejdagi qiymatlar chap tomondagi o'zgaruvchilarga tartib bo'yicha 'ochiladi' (unpack qilinadi): a birinchi qiymatni, b ikkinchisini oladi."
      />

      <KeyPoints>
        <li>
          Kortej <code>()</code> ichida yaratiladi: <code>(1, 2, 3)</code>. Indekslash va kesish
          ro'yxatdagi kabi ishlaydi.
        </li>
        <li>
          Kortej <strong>o'zgarmas (immutable)</strong> — <code>t[0] = 5</code> xato beradi. Bu
          ro'yxatdan asosiy farqi.
        </li>
        <li>
          Kortej unpacking (<code>x, y = nuqta</code>) — 2-darsdagi ko'p o'zgaruvchiga qiymat
          berish bilan bir xil mexanizm.
        </li>
        <li>
          Kortej ko'pincha o'zgarmasligi kerak bo'lgan qattiq yozuvlar (koordinata, RGB rang) uchun
          ishlatiladi; funksiyalar ham bir nechta qiymatni kortej sifatida qaytarishi mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
