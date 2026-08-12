import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "O'zgaruvchilar va turlar",
  section: 'Boshlash uchun',
}

export default function VariablesLesson() {
  return (
    <>
      <h2>O'zgaruvchi (variable) nima?</h2>
      <p>
        O'zgaruvchi — bu qiymatni xotirada saqlab turadigan nom. Uni yorlig'i (label) yopishtirilgan
        quti deb tasavvur qiling: qutining ichida qandaydir qiymat yotadi, biz esa o'sha qutiga
        ism qo'yib, keyinchalik shu ism orqali qiymatga murojaat qilamiz.
      </p>
      <CodeBlock lang="python">{`ism = "Aziz"`}</CodeBlock>
      <p>
        Bu yerda <code>ism</code> — o'zgaruvchi nomi, <code>=</code> — qiymat berish (assignment)
        operatori, <code>"Aziz"</code> esa unga berilayotgan qiymat.
      </p>
      <Callout type="note" title="Diqqat: bu tenglik emas">
        Dasturlashda <code>=</code> matematikadagi "tenglik" degani emas, balki "o'ngdagi qiymatni
        chapdagi o'zgaruvchiga yoz" degani. Shuning uchun <code>{`yosh = yosh + 1`}</code> kabi kod
        Python'da mutlaqo normal — u "yosh o'zgaruvchisining eski qiymatiga 1 qo'shib, natijani
        yana <code>yosh</code>ga yoz" deb o'qiladi.
      </Callout>
      <p>
        Python'da o'zgaruvchi yaratish uchun uning turini (type) oldindan e'lon qilish shart emas —
        bu boshqa ko'plab tillardan farqli xususiyat. Python qiymatga qarab turini o'zi aniqlaydi:
      </p>
      <CodeBlock lang="python">{`ism = "Aziz"
yosh = 25
narx = 9.99
talaba = True`}</CodeBlock>

      <h2>O'zgaruvchilarni nomlash qoidalari</h2>
      <p>Python'da o'zgaruvchi nomi quyidagi qoidalarga bo'ysunadi:</p>
      <ul>
        <li>Faqat harflar, raqamlar va pastki chiziqdan (underscore, <code>_</code>) iborat bo'lishi mumkin.</li>
        <li>Raqam bilan boshlana olmaydi (lekin ichida yoki oxirida raqam bo'lishi mumkin).</li>
        <li>Bo'sh joy (space) ishlatib bo'lmaydi — o'rniga pastki chiziqdan foydalaniladi.</li>
        <li>
          Katta-kichik harfga sezgir (case-sensitive): <code>yosh</code> va <code>Yosh</code> — ikkita
          butunlay boshqa o'zgaruvchi.
        </li>
        <li>
          Python'ning zaxira so'zlari (masalan <code>for</code>, <code>if</code>, <code>class</code>,{' '}
          <code>True</code>) o'zgaruvchi nomi sifatida ishlatilmaydi.
        </li>
      </ul>
      <CodeBlock lang="python">{`yosh = 25          # to'g'ri
_maxfiy_kod = 123  # to'g'ri — pastki chiziq bilan boshlash mumkin
talaba2 = "Vali"    # to'g'ri — oxirida raqam bo'lishi mumkin

2talaba = "Vali"    # XATO — raqam bilan boshlana olmaydi
talaba nomi = "Vali" # XATO — bo'sh joy ishlatib bo'lmaydi`}</CodeBlock>

      <h2>Ko'p so'zli nomlar</h2>
      <p>
        O'zgaruvchi nomi bir nechta so'zdan tashkil topganda, so'zlarni ajratishning bir nechta
        uslubi (style) mavjud:
      </p>
      <CodeBlock lang="python">{`talaba_ismi = "Aziz"      # snake_case — Python'ning rasmiy uslubi (PEP 8)
talabaIsmi = "Aziz"       # camelCase — Java/JavaScript'da keng tarqalgan
TalabaIsmi = "Aziz"       # PascalCase — Python'da odatda klass (class) nomlari uchun
MAKSIMAL_YOSH = 100       # UPPER_CASE — doimiylar (constants) uchun`}</CodeBlock>
      <Callout type="tip" title="Qaysi uslubni tanlash kerak?">
        Python jamoasi rasmiy ravishda <code>snake_case</code>ni tavsiya qiladi (PEP 8 uslub
        qo'llanmasi). <code>PascalCase</code>ni klass nomlari uchun, <code>UPPER_CASE</code>ni esa
        o'zgarmaydigan qiymatlar (doimiylar) uchun ishlating.
      </Callout>
      <Quiz
        question="Quyidagi o'zgaruvchi nomlaridan qaysi biri Python'da NOTO'G'RI (xato)?"
        options={['talaba_soni', '_maxfiy', 'natija2', '2natija']}
        correctIndex={3}
        explanation="O'zgaruvchi nomi raqam bilan boshlana olmaydi, shuning uchun 2natija xato hisoblanadi."
      />

      <h2>Ma'lumot turlari (data types)</h2>
      <p>
        Python'dagi har bir qiymat ma'lum bir turga (type) tegishli. Eng asosiy to'rtta turni
        birma-bir ko'rib chiqamiz.
      </p>

      <h3>
        <code>str</code> — matn turi
      </h3>
      <p>
        Harflar, raqamlar va belgilar ketma-ketligi (string). Bitta yoki qo'shtirnoq ichida
        yoziladi — ikkalasi ham bir xil ishlaydi:
      </p>
      <CodeBlock lang="python">{`ism = "Aziz"
familiya = 'Karimov'
toliq_ism = ism + " " + familiya
print(toliq_ism)  # Aziz Karimov`}</CodeBlock>

      <h3>
        <code>int</code> — butun son turi
      </h3>
      <p>Kasrsiz, butun sonlar (musbat yoki manfiy). Ustida arifmetik amallar bajarish mumkin:</p>
      <CodeBlock lang="python">{`a = 10
b = 3
print(a + b)   # 13
print(a - b)   # 7
print(a * b)   # 30
print(a // b)  # 3  — butunga bo'lish
print(a % b)   # 1  — bo'lishdan qolgan qoldiq`}</CodeBlock>

      <h3>
        <code>float</code> — kasr son turi
      </h3>
      <p>
        Vergul (nuqta) bilan yozilgan sonlar — narx, o'lchov kabi aniq qiymatlar uchun
        ishlatiladi:
      </p>
      <CodeBlock lang="python">{`narx = 9.99
chegirma = 2.5
yakuniy_narx = narx - chegirma
print(yakuniy_narx)  # 7.49`}</CodeBlock>

      <h3>
        <code>bool</code> — mantiqiy qiymat turi
      </h3>
      <p>
        Faqat ikkita qiymat qabul qiladi: <code>True</code> yoki <code>False</code>. Odatda
        taqqoslash (comparison) amallari natijasida hosil bo'ladi va shartlarni (if) tekshirishda
        ishlatiladi:
      </p>
      <CodeBlock lang="python">{`katta = 18 > 15
print(katta)        # True
print(type(katta))  # <class 'bool'>`}</CodeBlock>

      <p>
        O'zgaruvchining turini <code>type()</code> funksiyasi yordamida istalgan vaqtda
        tekshirishingiz mumkin:
      </p>
      <CodeBlock lang="python">{`yosh = 25
print(type(yosh))  # <class 'int'>`}</CodeBlock>
      <Callout type="warning" title="Diqqat">
        Matn (str) va sonni to'g'ridan-to'g'ri qo'shib bo'lmaydi. Masalan,{' '}
        <code>{`"Yosh: " + 25`}</code> xatolikka olib keladi — avval sonni matnga aylantirish
        kerak: <code>{`"Yosh: " + str(25)`}</code>.
      </Callout>
      <p>
        Amaliyotda tez-tez f-string (formatlangan satr) qulayroq ishlatiladi, chunki u
        turlarni avtomatik moslashtiradi:
      </p>
      <CodeBlock lang="python">{`yosh = 25
print(f"Mening yoshim {yosh} da")`}</CodeBlock>
      <Quiz
        question="Quyidagi qiymatlardan qaysi biri Python'da avtomatik 'float' turiga ega bo'ladi?"
        options={['narx = 10', 'narx = "10"', 'narx = 10.5', 'narx = True']}
        correctIndex={2}
        explanation="Kasr son (masalan, 10.5) Python tomonidan avtomatik ravishda float turi sifatida aniqlanadi."
      />

      <h2>Bir nechta qiymatni bir nechta o'zgaruvchiga berish</h2>
      <p>
        Python'da bir qatorda bir nechta o'zgaruvchiga bir nechta qiymatni parallel ravishda
        berish mumkin:
      </p>
      <CodeBlock lang="python">{`ism, yosh, shahar = "Aziz", 25, "Toshkent"
print(ism)     # Aziz
print(yosh)    # 25
print(shahar)  # Toshkent`}</CodeBlock>
      <p>Bir xil qiymatni bir nechta o'zgaruvchiga bir vaqtda berish ham mumkin:</p>
      <CodeBlock lang="python">{`x = y = z = 0
print(x, y, z)  # 0 0 0`}</CodeBlock>
      <Callout type="tip" title="Qiziqarli amaliyot: qiymatlarni almashtirish">
        Python'da ikkita o'zgaruvchining qiymatini vaqtinchalik o'zgaruvchisiz almashtirish
        mumkin — boshqa ko'plab tillarda buning uchun qo'shimcha o'zgaruvchi kerak bo'ladi:
      </Callout>
      <CodeBlock lang="python">{`a = 5
b = 10
a, b = b, a
print(a, b)  # 10 5`}</CodeBlock>

      <Exercise title="Mashq">
        <p>
          Bitta qatorda <code>ism</code>, <code>yosh</code> va <code>til</code> (sevimli
          dasturlash tili) uchun uchta o'zgaruvchi yarating, so'ng f-string yordamida ularni bitta
          xabarga birlashtirib chop eting.
        </p>
        <Solution>
          <CodeBlock lang="python">{`ism, yosh, til = "Aziz", 25, "Python"
print(f"Salom, mening ismim {ism}, yoshim {yosh} va men {til} tilini yaxshi ko'raman")`}</CodeBlock>
        </Solution>
      </Exercise>

      <h2>Global va lokal o'zgaruvchilar</h2>
      <p>
        O'zgaruvchi qayerda yaratilishiga qarab ikki xil ko'lamga (scope) ega bo'ladi: global va
        lokal.
      </p>
      <p>
        <strong>Global o'zgaruvchi</strong> — funksiyadan tashqarida, dastur faylining asosiy
        qismida yaratiladi va dasturning istalgan joyidan, jumladan funksiyalar ichidan ham
        o'qish mumkin:
      </p>
      <CodeBlock lang="python">{`xabar = "Salom!"  # global o'zgaruvchi

def salomlash():
    print(xabar)  # global o'zgaruvchini funksiya ichida o'qish mumkin

salomlash()  # Salom!`}</CodeBlock>
      <p>
        <strong>Lokal o'zgaruvchi</strong> — funksiya ichida yaratiladi va faqat o'sha funksiya
        ichida mavjud bo'ladi. Funksiya tugagach, u yo'qoladi:
      </p>
      <CodeBlock lang="python">{`def hisoblash():
    natija = 10 * 2  # lokal o'zgaruvchi
    return natija

print(hisoblash())  # 20
print(natija)        # XATO — natija bu yerda mavjud emas`}</CodeBlock>
      <Callout type="warning" title="Keng tarqalgan xato">
        Agar funksiya ichida global o'zgaruvchiga oddiy <code>=</code> orqali yangi qiymat
        bermoqchi bo'lsangiz, Python global o'zgaruvchini o'zgartirmaydi — buning o'rniga xuddi
        shu nomli <strong>yangi lokal o'zgaruvchi</strong> yaratadi. Global o'zgaruvchini haqiqatan
        ham o'zgartirish uchun <code>global</code> kalit so'zidan foydalaning:
      </Callout>
      <CodeBlock lang="python">{`hisob = 0

def hisobni_oshir():
    global hisob
    hisob += 1

hisobni_oshir()
print(hisob)  # 1`}</CodeBlock>
      <Quiz
        question="Agar funksiya ichida global o'zgaruvchining qiymatini o'zgartirmoqchi bo'lsangiz, nima ishlatish kerak?"
        options={['local', 'global', 'static', 'public']}
        correctIndex={1}
        explanation="global kalit so'zi funksiya ichida global o'zgaruvchini o'zgartirish imkonini beradi; aks holda Python yangi lokal o'zgaruvchi yaratadi."
      />

      <KeyPoints>
        <li>
          O'zgaruvchi — qiymatni saqlab turadigan nom; <code>=</code> tenglik emas, balki qiymat
          berish operatori.
        </li>
        <li>
          Nom raqam bilan boshlanmasligi, bo'sh joysiz yozilishi va case-sensitive ekanligi kerak.
        </li>
        <li>
          Ko'p so'zli nomlar uchun Python'da <code>snake_case</code> tavsiya etiladi.
        </li>
        <li>
          To'rtta asosiy tur: <code>str</code>, <code>int</code>, <code>float</code>,{' '}
          <code>bool</code> — turni <code>type()</code> bilan tekshirish mumkin.
        </li>
        <li>
          Bir qatorda bir nechta o'zgaruvchiga qiymat berish (<code>a, b = 1, 2</code>) va
          qiymatlarni almashtirish (<code>a, b = b, a</code>) mumkin.
        </li>
        <li>
          Global o'zgaruvchi hamma joydan o'qiladi, lokal o'zgaruvchi faqat o'z funksiyasi ichida
          mavjud; global qiymatni funksiya ichida o'zgartirish uchun <code>global</code> kerak.
        </li>
      </KeyPoints>
    </>
  )
}
