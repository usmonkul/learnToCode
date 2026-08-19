import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Shartli operatorlar (if, elif, else)',
  section: 'Amallar va shartlar',
}

export default function ConditionalsLesson() {
  return (
    <>
      <h2>
        <code>if</code> — shartli operator
      </h2>
      <p>
        O'tgan darsda taqqoslash va mantiqiy operatorlarni o'rgandik — ular natijasida{' '}
        <code>True</code> yoki <code>False</code> hosil bo'ladi. Endi shu natijaga qarab dastur
        turli yo'lni tanlashini o'rganamiz. Buning uchun shartli operator (conditional statement){' '}
        <code>if</code> ishlatiladi:
      </p>
      <CodeBlock lang="python">{`yosh = 20

if yosh >= 18:
    print("Siz kattasiz")`}</CodeBlock>
      <p>
        <code>if</code>dan keyingi shart <code>True</code> bo'lsa, ostidagi bloq (indent bilan
        ajratilgan qatorlar) bajariladi; <code>False</code> bo'lsa — o'tkazib yuboriladi. Python'da
        bloqlar figurali qavs emas, <strong>indentatsiya</strong> (odatda 4 bo'sh joy) bilan
        belgilanadi.
      </p>

      <h2>
        <code>if</code> / <code>else</code>
      </h2>
      <p>
        Agar shart <code>False</code> bo'lganda ham qandaydir kod bajarilishini istasak,{' '}
        <code>else</code> qo'shiladi — u "aks holda" degan ma'noni bildiradi:
      </p>
      <CodeBlock lang="python">{`yosh = 15

if yosh >= 18:
    print("Siz kattasiz")
else:
    print("Siz hali kichiksiz")
# natija: Siz hali kichiksiz`}</CodeBlock>

      <h2>
        <code>if</code> / <code>elif</code> / <code>else</code>
      </h2>
      <p>
        Ikkitadan ortiq variantni tekshirish kerak bo'lsa, <code>elif</code> (else if qisqartmasi)
        ishlatiladi. Python shartlarni yuqoridan pastga qarab tekshiradi va birinchi{' '}
        <code>True</code> chiqqan bloqni bajarib, qolganlarini tekshirmay to'xtaydi:
      </p>
      <CodeBlock lang="python">{`baho = 75

if baho >= 90:
    print("A'lo")
elif baho >= 70:
    print("Yaxshi")
elif baho >= 50:
    print("Qoniqarli")
else:
    print("Qoniqarsiz")
# natija: Yaxshi`}</CodeBlock>
      <Callout type="note" title="elif nechta bo'lishi mumkin?">
        Bitta <code>if</code> zanjirida <code>elif</code> istagancha bo'lishi mumkin, lekin{' '}
        <code>else</code> — faqat bitta va u har doim oxirida turadi (u ham shart emas, umuman
        yozmasa ham bo'ladi).
      </Callout>
      <Quiz
        question="baho = 65 bo'lsa, yuqoridagi kod nima chop etadi?"
        options={["A'lo", 'Yaxshi', 'Qoniqarli', 'Qoniqarsiz']}
        correctIndex={2}
        explanation="65 >= 90 va 65 >= 70 — ikkalasi ham False, lekin 65 >= 50 — True, shuning uchun 'Qoniqarli' chop etiladi."
      />

      <h2>Ichma-ich shartlar (nested conditions)</h2>
      <p>
        <code>if</code> ning ichida yana bir <code>if</code> yozish mumkin — bu ichma-ich shart
        (nested condition) deyiladi. Odatda tashqi shart bajarilganidan keyingina tekshiriladigan
        qo'shimcha shartlar uchun ishlatiladi:
      </p>
      <CodeBlock lang="python">{`yosh = 20
guvohnoma = True

if yosh >= 18:
    if guvohnoma:
        print("Avtomobil haydashingiz mumkin")
    else:
        print("Avval guvohnoma oling")
else:
    print("Siz hali yosh")
# natija: Avtomobil haydashingiz mumkin`}</CodeBlock>
      <p>
        Bu yerda ichki <code>if</code> faqat tashqi shart (<code>yosh &gt;= 18</code>){' '}
        <code>True</code> bo'lgandagina umuman tekshiriladi. Ichma-ich shartlarni juda chuqur
        qilmaslik kerak — 2-3 qavatdan ortiq bo'lsa, kod o'qishga qiyinlashadi.
      </p>

      <h2>Truthy va falsy qiymatlar</h2>
      <p>
        Python'da <code>if</code> shartiga <code>bool</code> emas, boshqa turdagi qiymatni ham
        yozish mumkin — Python uni avtomatik <code>True</code> yoki <code>False</code>ga
        aylantiradi. <code>0</code>, bo'sh matn (<code>""</code>) va bo'sh konteynerlar (masalan,
        bo'sh ro'yxat <code>[]</code>) — <strong>falsy</strong> (soxta, ya'ni <code>False</code>{' '}
        deb hisoblanadi); nolga teng bo'lmagan sonlar va bo'sh bo'lmagan matnlar —{' '}
        <strong>truthy</strong> (chin, ya'ni <code>True</code> deb hisoblanadi):
      </p>
      <CodeBlock lang="python">{`savatcha = []

if savatcha:
    print("Savatchada mahsulot bor")
else:
    print("Savatcha bo'sh")
# natija: Savatcha bo'sh

xabar = "Salom"
if xabar:
    print("Xabar mavjud")
# natija: Xabar mavjud`}</CodeBlock>
      <Callout type="tip" title="Amaliy foydasi">
        Shu sababli ko'p Python dasturlarida <code>if len(savatcha) &gt; 0:</code> o'rniga oddiy{' '}
        <code>if savatcha:</code> yozish afzal ko'riladi — ikkalasi ham xuddi shunday ishlaydi,
        lekin ikkinchisi qisqaroq va Python'ga xosroq (pythonic) hisoblanadi.
      </Callout>

      <h2>
        Shartlarni <code>and</code> / <code>or</code> bilan birlashtirish
      </h2>
      <p>
        O'tgan darsda o'rgangan mantiqiy operatorlarni <code>if</code> ichida bir nechta shartni
        birlashtirish uchun ishlatish mumkin:
      </p>
      <CodeBlock lang="python">{`yosh = 25
maosh = 5000000

if yosh >= 18 and maosh >= 3000000:
    print("Kredit uchun ariza qabul qilinadi")
else:
    print("Shartlar bajarilmadi")
# natija: Kredit uchun ariza qabul qilinadi`}</CodeBlock>
      <CodeBlock lang="python">{`kun = "shanba"

if kun == "shanba" or kun == "yakshanba":
    print("Bugun dam olish kuni")
else:
    print("Bugun ish kuni")
# natija: Bugun dam olish kuni`}</CodeBlock>

      <Exercise title="Mashq">
        <p>
          Foydalanuvchidan yoshini (<code>int</code> sifatida) va u talaba ekan-emasligini (
          <code>True</code>/<code>False</code>) so'rash o'rniga, quyidagi qiymatlarni to'g'ridan-
          to'g'ri kod ichida belgilang: <code>yosh = 17</code>, <code>talaba = True</code>. Chipta
          narxini aniqlovchi mantiq yozing: agar yosh <code>18</code>dan kichik{' '}
          <strong>yoki</strong> talaba <code>True</code> bo'lsa — "Chegirmali chipta", aks holda —
          "To'liq narxdagi chipta" chop eting.
        </p>
        <Solution>
          <CodeBlock lang="python">{`yosh = 17
talaba = True

if yosh < 18 or talaba:
    print("Chegirmali chipta")
else:
    print("To'liq narxdagi chipta")`}</CodeBlock>
        </Solution>
      </Exercise>

      <Quiz
        question="savat = 0 bo'lsa, if savat: bloki bajariladimi?"
        options={[
          "Ha, chunki 0 ham qiymat",
          "Yo'q, chunki 0 falsy hisoblanadi",
          'XATO chiqadi',
          "Aniqlab bo'lmaydi",
        ]}
        correctIndex={1}
        explanation="Son 0 Python'da falsy hisoblanadi, shuning uchun if savat: sharti False bo'ladi va bloq bajarilmaydi."
      />

      <KeyPoints>
        <li>
          <code>if</code> shart <code>True</code> bo'lganda bloqni bajaradi;{' '}
          <code>else</code> — aks holda; <code>elif</code> — qo'shimcha shartlarni ketma-ket
          tekshiradi.
        </li>
        <li>
          Python birinchi <code>True</code> chiqqan bloqni bajarib, qolganlarini tekshirmaydi.
        </li>
        <li>
          <code>if</code> ichida yana <code>if</code> yozish mumkin (nested condition), lekin
          nesting'ni chuqurlashtirmaslik kerak.
        </li>
        <li>
          <code>0</code>, <code>""</code> va bo'sh konteynerlar — falsy; nolga teng bo'lmagan
          sonlar va bo'sh bo'lmagan matnlar — truthy.
        </li>
        <li>
          <code>and</code>/<code>or</code> yordamida bitta <code>if</code> ichida bir nechta
          shartni birlashtirish mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
