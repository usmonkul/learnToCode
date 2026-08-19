import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import Figure from '@/components/content/Figure'
import KeyPoints from '@/components/content/KeyPoints'
import dictMapping from '@/assets/dict-mapping.svg'

export const meta = {
  title: "Lug'atlar (Dictionaries)",
  section: "Satrlar va ma'lumotlar tuzilmalari",
}

export default function DictionariesLesson() {
  return (
    <>
      <p>
        Ro'yxatda elementlarga sonli indeks (<code>0</code>, <code>1</code>, <code>2</code>, ...)
        orqali murojaat qilamiz. Lekin ba'zan ma'lumotga ism (masalan, "yosh" yoki "shahar")
        orqali murojaat qilish tabiiyroq bo'ladi. Buning uchun Python'da{' '}
        <strong>lug'at (dictionary, qisqacha dict)</strong> ma'lumot tuzilmasi ishlatiladi — u har
        bir qiymatni <strong>kalit (key)</strong>ga bog'lab saqlaydi.
      </p>

      <h2>Lug'at yaratish va kalit orqali murojaat</h2>
      <p>
        Lug'at figurali qavs <code>{'{}'}</code> ichida, <code>kalit: qiymat</code> juftliklari
        vergul bilan ajratilgan holda yaratiladi:
      </p>
      <CodeBlock lang="python">{`talaba = {"ism": "Aziz", "yosh": 25}
print(talaba)  # {'ism': 'Aziz', 'yosh': 25}`}</CodeBlock>
      <p>
        Qiymatga kalit orqali kvadrat qavs ichida murojaat qilinadi — ro'yxatdagi indeks o'rnida
        kalit ishlatiladi:
      </p>
      <CodeBlock lang="python">{`print(talaba["ism"])  # Aziz
print(talaba["yosh"]) # 25`}</CodeBlock>

      <Figure
        src={dictMapping}
        alt="Chapda uchta kalit ('ism', 'yosh', 'shahar') va o'ngda ularga mos uchta qiymat ('Aziz', 25, 'Toshkent') ko'rsatilgan, har bir kalitdan o'ziga mos qiymatga o'q chizilgan"
        caption="1-rasm: lug'atdagi har bir kalit o'ziga mos qiymatga bog'langan"
      />

      <h2>Yangi kalit qo'shish va mavjudini yangilash</h2>
      <p>
        Yangi kalitga qiymat berish orqali lug'atga yangi juftlik qo'shiladi; mavjud kalitga
        qiymat berish esa uning eski qiymatini yangisiga almashtiradi:
      </p>
      <CodeBlock lang="python">{`talaba = {"ism": "Aziz", "yosh": 25}

talaba["shahar"] = "Toshkent"  # yangi kalit qo'shiladi
print(talaba)  # {'ism': 'Aziz', 'yosh': 25, 'shahar': 'Toshkent'}

talaba["yosh"] = 26  # mavjud kalit yangilanadi
print(talaba)  # {'ism': 'Aziz', 'yosh': 26, 'shahar': 'Toshkent'}`}</CodeBlock>
      <Callout type="warning" title="Mavjud bo'lmagan kalitga murojaat">
        Agar lug'atda yo'q kalitga <code>talaba["email"]</code> kabi murojaat qilsangiz, Python{' '}
        <code>KeyError</code> xatoligini beradi. Kalit bor-yo'qligini oldindan tekshirish uchun{' '}
        <code>in</code> operatoridan foydalaning (quyida ko'ramiz).
      </Callout>

      <Quiz
        question={
          'talaba = {"ism": "Aziz"}  bo\'lsa, talaba["yosh"]  qatori nima qiladi?'
        }
        options={[
          "None qaytaradi",
          "KeyError xatoligini beradi, chunki 'yosh' kaliti mavjud emas",
          "0 qaytaradi",
          "Avtomatik ravishda 'yosh': 0 juftligini qo'shadi"
        ]}
        correctIndex={1}
        explanation="Lug'atda mavjud bo'lmagan kalitga kvadrat qavs orqali murojaat qilinsa, Python KeyError xatoligini beradi."
      />

      <h2>
        <code>.keys()</code>, <code>.values()</code>, <code>.items()</code>
      </h2>
      <p>
        Lug'atning barcha kalitlarini, barcha qiymatlarini yoki ikkalasini birgalikda olish uchun
        uchta metod bor:
      </p>
      <CodeBlock lang="python">{`talaba = {"ism": "Aziz", "yosh": 25, "shahar": "Toshkent"}

print(talaba.keys())    # dict_keys(['ism', 'yosh', 'shahar'])
print(talaba.values())  # dict_values(['Aziz', 25, 'Toshkent'])
print(talaba.items())   # dict_items([('ism', 'Aziz'), ('yosh', 25), ('shahar', 'Toshkent')])`}</CodeBlock>
      <p>Har biri bo'yicha <code>for</code> sikli bilan aylanish mumkin:</p>
      <CodeBlock lang="python">{`for kalit in talaba.keys():
    print(kalit)
# ism
# yosh
# shahar

for qiymat in talaba.values():
    print(qiymat)
# Aziz
# 25
# Toshkent`}</CodeBlock>
      <p>
        Eng foydalisi — <code>.items()</code> bo'yicha aylanish, chunki u har bir kalit-qiymat
        juftligini <strong>kortej</strong> sifatida qaytaradi. 13-darsda o'rgangan kortej
        unpacking'ni eslaysizmi? Aynan o'sha mexanizm bu yerda ishlaydi — har bir juftlik ikkita
        o'zgaruvchiga bir vaqtda "ochiladi":
      </p>
      <CodeBlock lang="python">{`for kalit, qiymat in talaba.items():
    print(f"{kalit}: {qiymat}")

# ism: Aziz
# yosh: 25
# shahar: Toshkent`}</CodeBlock>
      <Callout type="tip" title="Nega .items() qulay">
        <code>.keys()</code> bilan aylanib, keyin har birida <code>talaba[kalit]</code> deb
        qiymatni alohida olish ham mumkin edi, lekin bu ortiqcha. <code>.items()</code> kalit va
        qiymatni bitta qadamda, tuple unpacking orqali birga beradi — xuddi 13-darsdagi{' '}
        <code>x, y = nuqta</code> kabi, faqat bu yerda <code>for</code> sikli har bir kalit-qiymat
        kortejini navbatma-navbat "ochadi".
      </Callout>

      <h2>
        Kalit mavjudligini tekshirish: <code>in</code>
      </h2>
      <p>
        <code>in</code> operatori lug'atda ma'lum kalit bor-yo'qligini tekshiradi (qiymat emas,
        kalit tekshiriladi):
      </p>
      <CodeBlock lang="python">{`talaba = {"ism": "Aziz", "yosh": 25}

print("ism" in talaba)    # True
print("email" in talaba)  # False

if "email" not in talaba:
    print("Email kiritilmagan")`}</CodeBlock>

      <Exercise title="Mashq">
        <p>
          <code>{`mahsulot = {"nomi": "Noutbuk", "narx": 4500000}`}</code> lug'ati berilgan. Quyidagilarni
          bajaring:
        </p>
        <ul>
          <li>
            <code>"mavjud"</code> kalitini <code>True</code> qiymati bilan qo'shing.
          </li>
          <li>
            <code>.items()</code> va <code>for</code> sikli yordamida har bir kalit-qiymat
            juftligini <code>"kalit: qiymat"</code> shaklida chop eting.
          </li>
          <li>
            <code>"rang"</code> kaliti lug'atda bor-yo'qligini <code>in</code> orqali tekshirib,
            natijani chop eting.
          </li>
        </ul>
        <Solution>
          <CodeBlock lang="python">{`mahsulot = {"nomi": "Noutbuk", "narx": 4500000}

mahsulot["mavjud"] = True

for kalit, qiymat in mahsulot.items():
    print(f"{kalit}: {qiymat}")

print("rang" in mahsulot)  # False`}</CodeBlock>
        </Solution>
      </Exercise>

      <Quiz
        question={
          'talaba = {"ism": "Aziz", "yosh": 25}  bo\'lsa, for kalit, qiymat in talaba.items():  qatorida .items() nimani qaytaradi?'
        }
        options={[
          "Faqat kalitlar ro'yxatini",
          "Faqat qiymatlar ro'yxatini",
          "Har bir kalit-qiymatni kortej sifatida beruvchi juftliklar ketma-ketligini",
          "Lug'atning uzunligini"
        ]}
        correctIndex={2}
        explanation=".items() har bir kalit-qiymat juftligini (kalit, qiymat) kortej ko'rinishida qaytaradi, shu bois ularni bevosita ikkita o'zgaruvchiga unpack qilish mumkin."
      />

      <KeyPoints>
        <li>
          Lug'at <code>{'{'}kalit: qiymat{'}'}</code> shaklida yaratiladi; qiymatga{' '}
          <code>d["kalit"]</code> orqali murojaat qilinadi.
        </li>
        <li>
          <code>d["yangi_kalit"] = qiymat</code> yangi kalit qo'shadi yoki mavjudini yangilaydi.
        </li>
        <li>
          <code>.keys()</code>, <code>.values()</code>, <code>.items()</code> mos ravishda
          kalitlar, qiymatlar va kalit-qiymat kortejlari bo'yicha aylanish imkonini beradi.
        </li>
        <li>
          <code>for kalit, qiymat in d.items():</code> — 13-darsdagi kortej unpacking
          mexanizmining amaliy qo'llanilishi.
        </li>
        <li>
          <code>"kalit" in d</code> kalit mavjudligini tekshiradi; mavjud bo'lmagan kalitga{' '}
          <code>d["yoq_kalit"]</code> orqali murojaat qilish <code>KeyError</code> beradi.
        </li>
      </KeyPoints>
    </>
  )
}
