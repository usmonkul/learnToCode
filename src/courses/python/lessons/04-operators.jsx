import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Operatorlar: arifmetik, taqqoslash, mantiqiy',
  section: 'Amallar va shartlar',
}

export default function OperatorsLesson() {
  return (
    <>
      <h2>Arifmetik operatorlar (arithmetic operators)</h2>
      <p>
        2-darsda <code>//</code> va <code>%</code> operatorlarini ko'rgan edik. Endi Python'dagi
        barcha arifmetik operatorlarni (arithmetic operators) — sonlar ustida amal bajaruvchi
        belgilarni — to'liq ko'rib chiqamiz:
      </p>
      <CodeBlock lang="python">{`a = 17
b = 5

print(a + b)   # 22  — qo'shish
print(a - b)   # 12  — ayirish
print(a * b)   # 85  — ko'paytirish
print(a / b)   # 3.4 — bo'lish
print(a // b)  # 3   — butunga bo'lish
print(a % b)   # 2   — qoldiq
print(a ** b)  # 1419857 — darajaga ko'tarish`}</CodeBlock>
      <p>
        Ko'pchilik operator tanish — yangi ikkitasi <code>/</code> va <code>**</code>.{' '}
        <code>**</code> darajaga ko'tarish (exponentiation): <code>a ** b</code> — bu{' '}
        <code>a</code>ning <code>b</code>-darajasi.
      </p>
      <Callout type="warning" title="/ va // — natija turi boshqacha">
        Bu ikkalasi orasidagi farqni aniq eslab qoling: <code>/</code> — oddiy bo'lish — natija{' '}
        <strong>har doim</strong> <code>float</code> bo'ladi, hatto bo'linma butun son chiqsa ham.{' '}
        <code>//</code> — butunga bo'lish (floor division) — natijani pastga qarab butunlashtiradi
        va agar ikkala operand ham <code>int</code> bo'lsa, natija <code>int</code> bo'ladi:
      </Callout>
      <CodeBlock lang="python">{`print(10 / 2)   # 5.0  — float, garchi bo'linma butun bo'lsa ham
print(10 // 2)  # 5    — int
print(10 / 3)   # 3.3333333333333335
print(10 // 3)  # 3    — pastga qarab butunlashtirilgan`}</CodeBlock>
      <Quiz
        question="print(9 / 2) natijasi nima bo'ladi?"
        options={['4', '4.5', '4.0', 'XATO']}
        correctIndex={1}
        explanation="/ operatori har doim float qaytaradi, shuning uchun 9 / 2 natijasi 4.5 bo'ladi (// bo'lganda 4 chiqar edi)."
      />

      <h2>Taqqoslash operatorlari (comparison operators)</h2>
      <p>
        Taqqoslash operatorlari (comparison operators) ikkita qiymatni solishtirib, natija sifatida{' '}
        har doim <code>bool</code> — <code>True</code> yoki <code>False</code> qaytaradi:
      </p>
      <CodeBlock lang="python">{`x = 10
y = 7

print(x == y)  # False — teng
print(x != y)  # True  — teng emas
print(x > y)   # True  — katta
print(x < y)   # False — kichik
print(x >= 10) # True  — katta yoki teng
print(y <= 7)  # True  — kichik yoki teng`}</CodeBlock>
      <Callout type="note" title="== ni = bilan aralashtirmang">
        <code>=</code> — qiymat berish (assignment), <code>==</code> — taqqoslash (comparison).
        Ikkitasi butunlay boshqa amal: <code>{`x = 5`}</code> x'ga 5 qiymatini beradi, ammo{' '}
        <code>{`x == 5`}</code> x 5ga tengmi-yo'qmi tekshiradi va <code>bool</code> qaytaradi.
      </Callout>

      <h2>Mantiqiy operatorlar (logical operators)</h2>
      <p>
        Mantiqiy operatorlar (logical operators) bir nechta <code>bool</code> qiymatni
        birlashtirib, yangi <code>bool</code> natija hosil qiladi. Python'da uchtasi bor:{' '}
        <code>and</code>, <code>or</code> va <code>not</code>.
      </p>
      <ul>
        <li>
          <code>and</code> — ikkala shart ham <code>True</code> bo'lsa, natija{' '}
          <code>True</code>.
        </li>
        <li>
          <code>or</code> — shartlardan kamida bittasi <code>True</code> bo'lsa, natija{' '}
          <code>True</code>.
        </li>
        <li>
          <code>not</code> — qiymatni teskarisiga aylantiradi: <code>True</code> ni{' '}
          <code>False</code>ga, <code>False</code>ni <code>True</code>ga.
        </li>
      </ul>
      <CodeBlock lang="python">{`yosh = 20
talaba = True

print(yosh >= 18 and talaba)   # True  — ikkalasi ham to'g'ri
print(yosh >= 18 or talaba)    # True  — kamida bittasi to'g'ri bo'lsa yetadi
print(not talaba)              # False — talabaning teskarisi

print(True and False)   # False
print(True or False)    # True
print(not False)        # True`}</CodeBlock>
      <p>
        Amaliy misol: bank tizimida foydalanuvchi hisobidan pul yechish uchun ikkita shart bir
        vaqtda bajarilishi kerak bo'lishi mumkin — balans yetarli <strong>va</strong> hisob
        bloklanmagan:
      </p>
      <CodeBlock lang="python">{`balans = 500
soralgan = 300
bloklangan = False

ruxsat = balans >= soralgan and not bloklangan
print(ruxsat)  # True`}</CodeBlock>
      <Quiz
        question="x = 5. Quyidagilardan qaysi biri True bo'ladi: x > 10 or x == 5?"
        options={['True', 'False', 'XATO chiqadi', "aniqlab bo'lmaydi"]}
        correctIndex={0}
        explanation="x > 10 — False, lekin x == 5 — True. or operatorida kamida bitta shart to'g'ri bo'lsa yetarli, shuning uchun natija True."
      />

      <h2>Amallar bajarilish tartibi (operator precedence)</h2>
      <p>
        Bitta ifodada bir nechta operator turi aralashib kelganda, Python ularni ma'lum bir
        tartibda bajaradi: avval <strong>arifmetik</strong> operatorlar (<code>+</code>,{' '}
        <code>-</code>, <code>*</code> va h.k.), keyin <strong>taqqoslash</strong> operatorlari (
        <code>&gt;</code>, <code>==</code> va h.k.), va eng oxirida <strong>mantiqiy</strong>{' '}
        operatorlar (<code>and</code>, <code>or</code>, <code>not</code>) bajariladi:
      </p>
      <CodeBlock lang="python">{`x = 6
y = 5

natija = x + 1 > 5 and y < 10
print(natija)  # True`}</CodeBlock>
      <p>
        Bu ifoda quyidagicha bosqichma-bosqich hisoblanadi: avval <code>x + 1</code> (arifmetik) —{' '}
        <code>7</code> hosil bo'ladi; so'ng <code>7 &gt; 5</code> va <code>y &lt; 10</code>{' '}
        (taqqoslash) — ikkalasi ham <code>True</code>; va nihoyat <code>True and True</code>{' '}
        (mantiqiy) — <code>True</code>. Agar tartib boshqacha bo'lishini istasangiz, qavslardan{' '}
        <code>()</code> foydalaning — bu har doim eng aniq va o'qish oson yo'l.
      </p>

      <Exercise title="Mashq">
        <p>
          Ikkita o'zgaruvchi yarating: <code>narx</code> (masalan, <code>45000</code>) va{' '}
          <code>hamyon</code> (masalan, <code>50000</code>). Foydalanuvchi mahsulotni sotib ololishi
          uchun ikkita shart bajarilishi kerak: hamyonda mahsulot narxidan kam bo'lmagan pul bo'lishi
          va narx <code>0</code>dan katta bo'lishi. <code>and</code> yordamida shu shartni bitta{' '}
          <code>bool</code> o'zgaruvchida (<code>sotib_ola_oladi</code>) hisoblab, ekranga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="python">{`narx = 45000
hamyon = 50000

sotib_ola_oladi = hamyon >= narx and narx > 0
print(sotib_ola_oladi)  # True`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Arifmetik operatorlar: <code>+ - * / // % **</code> — <code>/</code> har doim{' '}
          <code>float</code> qaytaradi, <code>//</code> esa butunga bo'lib, pastga qarab
          butunlashtiradi.
        </li>
        <li>
          Taqqoslash operatorlari <code>== != &gt; &lt; &gt;= &lt;=</code> har doim{' '}
          <code>bool</code> qaytaradi.
        </li>
        <li>
          Mantiqiy operatorlar <code>and</code>, <code>or</code>, <code>not</code> bir nechta{' '}
          <code>bool</code> qiymatni birlashtiradi.
        </li>
        <li>
          Bajarilish tartibi: avval arifmetik, keyin taqqoslash, so'ngra mantiqiy operatorlar —
          noaniqlik bo'lsa, qavslardan <code>()</code> foydalaning.
        </li>
      </KeyPoints>
    </>
  )
}
