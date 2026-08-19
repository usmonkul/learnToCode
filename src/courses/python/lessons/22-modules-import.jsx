import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Modullar va import',
  section: 'Modullar va fayllar',
}

export default function ModulesImportLesson() {
  return (
    <>
      <h2>Modul (module) nima?</h2>
      <p>
        Hozirgacha yozgan barcha kodimiz bitta faylda edi. Lekin katta dasturlarni bitta faylga
        sig'dirish noqulay — shuning uchun Python kodi <strong>modul (module)</strong>larga
        bo'lib saqlanadi. Modul — bu shunchaki <code>.py</code> kengaytmali fayl bo'lib, ichida
        funksiyalar, o'zgaruvchilar yoki boshqa kod bo'lishi mumkin. Python o'zi bilan{' '}
        <strong>standart kutubxona (standard library)</strong> deb ataladigan yuzlab tayyor
        modullarni birga olib keladi — ularni o'rnatishning hojati yo'q, faqat{' '}
        <code>import</code> qilish kifoya.
      </p>

      <h2>
        <code>import module_name</code>
      </h2>
      <p>
        Modulni ishlatish uchun uni faylning boshida <code>import</code> qilamiz. Shundan so'ng
        modul ichidagi funksiyalarga <code>module_name.function()</code> ko'rinishida murojaat
        qilinadi — nuqta (<code>.</code>) modul nomini funksiya nomidan ajratadi:
      </p>
      <CodeBlock lang="python">{`import math

print(math.sqrt(16))  # 4.0
print(math.pi)         # 3.141592653589793`}</CodeBlock>
      <p>
        Bu yerda <code>math</code> — sonlar bilan ishlash uchun tayyor funksiyalarni o'z ichiga
        olgan modul, <code>sqrt</code> — kvadrat ildiz (square root) hisoblovchi funksiya,{' '}
        <code>pi</code> esa modul ichidagi tayyor o'zgaruvchi (doimiy son).
      </p>

      <h2>
        <code>from module import name</code>
      </h2>
      <p>
        Agar modul ichidan faqat bitta yoki bir nechta narsani ishlatmoqchi bo'lsangiz,{' '}
        <code>from ... import ...</code> yordamida ularni to'g'ridan-to'g'ri ismi bilan olib
        kelish mumkin — bu holda modul nomini har safar yozish shart emas:
      </p>
      <CodeBlock lang="python">{`from math import sqrt

print(sqrt(16))  # 4.0 — endi math. deb yozish shart emas`}</CodeBlock>
      <Callout type="note" title="Qachon qaysi uslubni tanlash kerak?">
        <code>import module_name</code> kodni o'qishda qayerdan kelganini aniq ko'rsatadi
        (<code>math.sqrt</code>), shuning uchun ko'pincha afzal. <code>from module import
        name</code> esa modul ichidan faqat bir-ikkita narsa tez-tez ishlatilganda qulayroq.
      </Callout>

      <h2>
        <code>import module as alias</code>
      </h2>
      <p>
        Modul nomi uzun bo'lsa yoki qisqartirib yozish qulayroq bo'lsa, unga taxallus (alias)
        berish mumkin — <code>as</code> kalit so'zi yordamida:
      </p>
      <CodeBlock lang="python">{`import datetime as dt

bugun = dt.date.today()
print(bugun)  # masalan: 2026-08-19`}</CodeBlock>
      <p>
        Endi <code>datetime</code> o'rniga qisqa <code>dt</code> nomidan foydalanildi. Bu uslub
        ayniqsa uzun yoki tez-tez ishlatiladigan modul nomlari uchun qulay.
      </p>

      <Quiz
        question={`from math import sqrt qatoridan keyin sqrt funksiyasini qanday chaqirish kerak?`}
        options={['math.sqrt(16)', 'sqrt(16)', 'math.sqrt.16', 'import.sqrt(16)']}
        correctIndex={1}
        explanation="from module import name orqali olib kelingan narsa to'g'ridan-to'g'ri o'z nomi bilan chaqiriladi, modul nomisiz."
      />

      <h2>Foydali standart modullarga qisqacha sayohat</h2>
      <p>
        Python standart kutubxonasida yuzlab modul bor. Keling, ulardan uchtasini — eng ko'p
        ishlatiladiganlarini — ko'rib chiqamiz.
      </p>

      <h3>
        <code>math</code> — matematik amallar
      </h3>
      <p>Sonlar bilan ishlashda kerak bo'ladigan tayyor funksiya va doimiylarni beradi:</p>
      <CodeBlock lang="python">{`import math

print(math.sqrt(25))    # 5.0 — kvadrat ildiz
print(math.pi)           # 3.141592653589793 — doira doimiysi
print(math.floor(4.7))  # 4 — pastga yaxlitlash
print(math.ceil(4.2))   # 5 — yuqoriga yaxlitlash`}</CodeBlock>

      <h3>
        <code>random</code> — tasodifiy qiymatlar
      </h3>
      <p>
        Tasodifiy son yoki tanlov kerak bo'lganda ishlatiladi — masalan, o'yin yoki
        simulyatsiyalarda. 10-darsda o'rgangan ro'yxatlar (lists) bilan ham birga ishlaydi:
      </p>
      <CodeBlock lang="python">{`import random

son = random.randint(1, 10)  # 1 dan 10 gacha (ikkalasi ham kiradi) tasodifiy butun son
print(son)

mevalar = ["olma", "banan", "shaftoli"]
tanlangan = random.choice(mevalar)  # ro'yxatdan tasodifiy elementni tanlaydi
print(tanlangan)`}</CodeBlock>

      <h3>
        <code>datetime</code> — sana va vaqt
      </h3>
      <p>Joriy sana yoki vaqt bilan ishlash uchun ishlatiladi:</p>
      <CodeBlock lang="python">{`import datetime

bugun = datetime.date.today()
print(bugun)        # masalan: 2026-08-19
print(bugun.year)   # 2026
print(bugun.month)  # 8`}</CodeBlock>
      <Callout type="tip" title="Yana ko'plab modullar mavjud">
        Bu uchtasi — faqat kichik namuna. Python standart kutubxonasida fayl yo'llari bilan
        ishlash (<code>os</code>), matn shakllarini qidirish (<code>re</code>) va boshqa ko'plab
        modullar mavjud. Kerak bo'lganda rasmiy hujjatlardan qidirib topish — dasturchilikning
        odatiy va normal qismi.
      </Callout>

      <Quiz
        question="random.choice(mevalar) nima qiladi?"
        options={[
          'mevalar ro\'yxatini alifbo tartibida saralaydi',
          "mevalar ro'yxatidan tasodifiy bitta elementni tanlab qaytaradi",
          "mevalar ro'yxatiga yangi element qo'shadi",
          "mevalar ro'yxatining uzunligini qaytaradi",
        ]}
        correctIndex={1}
        explanation="random.choice() berilgan ketma-ketlikdan (masalan, ro'yxatdan) tasodifiy bitta elementni tanlab qaytaradi."
      />

      <Exercise title="Mashq">
        <p>
          <code>math</code> modulini import qiling va <code>math.sqrt()</code> yordamida{' '}
          <code>144</code> sonining kvadrat ildizini chop eting. So'ng <code>random</code>{' '}
          modulini import qilib, <code>1</code> dan <code>6</code> gacha (ikkalasi ham kiradi)
          tasodifiy son hosil qiling va uni "zar tashlandi" degan xabar bilan birga chop eting.
        </p>
        <Solution>
          <CodeBlock lang="python">{`import math
import random

ildiz = math.sqrt(144)
print(f"144 ning kvadrat ildizi: {ildiz}")

zar = random.randint(1, 6)
print(f"Zar tashlandi: {zar}")`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Modul — <code>.py</code> fayli bo'lib, funksiya va o'zgaruvchilarni o'z ichiga oladi;{' '}
          <code>import module_name</code> orqali olib kelinadi va{' '}
          <code>module_name.function()</code> ko'rinishida ishlatiladi.
        </li>
        <li>
          <code>from module import name</code> — modul ichidan faqat kerakli narsani, modul
          nomisiz to'g'ridan-to'g'ri chaqirish uchun ishlatiladi.
        </li>
        <li>
          <code>import module as alias</code> — modulga qisqa taxallus berish uchun ishlatiladi.
        </li>
        <li>
          <code>math</code> — matematik amallar (<code>sqrt</code>, <code>pi</code>,{' '}
          <code>floor</code>, <code>ceil</code>), <code>random</code> — tasodifiy qiymatlar (
          <code>randint</code>, <code>choice</code>), <code>datetime</code> — sana va vaqt (
          <code>date.today()</code>) uchun standart modullar.
        </li>
        <li>
          Python standart kutubxonasida ko'plab tayyor modul mavjud — g'ildirakni qayta ixtiro
          qilishning (reinventing the wheel) hojati yo'q.
        </li>
      </KeyPoints>
    </>
  )
}
