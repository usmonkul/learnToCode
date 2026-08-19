import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Xatoliklar bilan ishlash: try/except',
  section: 'Xatoliklar bilan ishlash',
}

export default function TryExceptLesson() {
  return (
    <>
      <h2>Dastur nega to'satdan to'xtaydi?</h2>
      <p>
        Hozirgacha yozgan dasturlarimizda hamma narsa "to'g'ri" ishlashini kutgan edik. Lekin
        haqiqiy hayotda foydalanuvchi kutilmagan narsa kiritishi mumkin — masalan, son o'rniga
        harflar. Quyidagi kodni ko'ring:
      </p>
      <CodeBlock lang="python">{`son = int("abc")
print("Bu qator hech qachon bajarilmaydi")`}</CodeBlock>
      <p>
        Bu kodni ishga tushirsangiz, Python quyidagi xatolikni chiqaradi va dastur{' '}
        <strong>shu yerdayoq to'xtaydi</strong> — undan keyingi hech qanday qator bajarilmaydi:
      </p>
      <CodeBlock lang="python">{`ValueError: invalid literal for int() with base 10: 'abc'`}</CodeBlock>
      <p>
        Bu turdagi ishlash vaqtidagi xatolik <strong>exception</strong> (favqulodda holat) deb
        ataladi. <code>ValueError</code> — Python'ning ko'plab tayyor exception turlaridan biri;
        u qiymatning turi to'g'ri, lekin mazmuni noto'g'ri bo'lganda yuzaga keladi (bu yerda —
        <code>"abc"</code> sonli matn emas). Agar biror exception "ushlab" qolinmasa, dastur
        butunlay to'xtaydi. Yaxshiyamki, Python bunday holatlarni oldindan boshqarish uchun{' '}
        <code>try</code>/<code>except</code> mexanizmini beradi.
      </p>

      <h2>
        <code>try</code>/<code>except</code> asosiy tuzilishi
      </h2>
      <p>
        <code>try</code> bloki ichiga xavfli (xatolik berishi mumkin bo'lgan) kodni yozamiz.
        Agar xatolik chiqsa, dastur to'xtash o'rniga <code>except</code> blokiga o'tadi va u
        yerdagi kodni bajaradi:
      </p>
      <CodeBlock lang="python">{`try:
    son = int("abc")
    print("Bu qator ishlamaydi, chunki yuqorida xatolik chiqdi")
except ValueError:
    print("Xatolik: bu haqiqiy son emas")

print("Dastur davom etmoqda")`}</CodeBlock>
      <CodeBlock lang="python">{`# natija:
# Xatolik: bu haqiqiy son emas
# Dastur davom etmoqda`}</CodeBlock>
      <p>
        Diqqat qiling: <code>try</code> bloki ichida xatolik chiqqan qatordan keyingi qatorlar
        (<code>print("Bu qator ishlamaydi...")</code>) bajarilmay qoladi — Python darhol{' '}
        <code>except</code> blokiga sakraydi. Lekin butun dastur to'xtamaydi — <code>try</code>
        /<code>except</code>dan keyingi kod (<code>print("Dastur davom etmoqda")</code>) odatdagidek
        ishlayveradi.
      </p>
      <Callout type="warning" title="Aniq xatolik turini ko'rsating">
        <code>except ValueError:</code> o'rniga faqat <code>except:</code> yozish ham mumkin — bu
        har qanday xatolikni ushlaydi. Lekin bu yomon amaliyot hisoblanadi: shu tariqa siz
        kutmagan, haqiqatan ham dasturingizdagi jiddiy xatoliklarni ham yashirib qo'yishingiz
        mumkin. Har doim aniq exception turini ko'rsating.
      </Callout>

      <h2>Bir nechta xatolik turini ushlash</h2>
      <p>
        Bitta <code>try</code> bloki ichida turli sabablarga ko'ra turli xil exception'lar
        yuzaga kelishi mumkin. Masalan, foydalanuvchidan ikkita son olib, ularni bir-biriga
        bo'lsak, ikki xil xatolik chiqishi mumkin: son o'rniga matn kiritilsa —{' '}
        <code>ValueError</code>, ikkinchi son <code>0</code> bo'lsa — <code>ZeroDivisionError</code>
        . Har biri uchun alohida <code>except</code> bloki yozish mumkin:
      </p>
      <CodeBlock lang="python">{`try:
    a = int(input("Birinchi son: "))
    b = int(input("Ikkinchi son: "))
    natija = a / b
    print(f"Natija: {natija}")
except ValueError:
    print("Iltimos, faqat son kiriting")
except ZeroDivisionError:
    print("Nolga bo'lib bo'lmaydi")`}</CodeBlock>
      <p>
        Agar bir nechta xatolik turi uchun bir xil harakat bajarilishi kerak bo'lsa, ularni bitta{' '}
        <code>except</code> qatorida qavs ichida ro'yxatlash mumkin:
      </p>
      <CodeBlock lang="python">{`qiymat = None

try:
    natija = int(qiymat)
except (TypeError, ValueError):
    print("Noto'g'ri qiymat kiritildi")`}</CodeBlock>
      <p>
        Bu yerda <code>int(None)</code> — <code>TypeError</code>, <code>int("abc")</code> esa{' '}
        <code>ValueError</code> beradi; ikkalasi ham bitta xabar bilan ishlov olinadi.
      </p>

      <Quiz
        question={`Quyidagi kod try/except ichiga o'ralmagan holda ishga tushirilsa nima sodir bo'ladi? son = int("abc")`}
        options={[
          "Dastur xatolikni e'tiborsiz qoldirib, davom etadi",
          'Dastur ValueError xatoligi bilan to\'xtaydi',
          'son avtomatik ravishda 0 ga aylanadi',
          "Python ogohlantirish chiqarib, keyingi qatorni bajaraveradi",
        ]}
        correctIndex={1}
        explanation="Agar xatolik try/except bilan ushlanmasa, u dasturni to'xtatadi — bu yerda ValueError chiqadi, chunki 'abc' haqiqiy songa aylantirilmaydi."
      />

      <h2>Amaliy misol: foydalanuvchidan xavfsiz son olish</h2>
      <p>
        3-darsda <code>input()</code> har doim <code>str</code> qaytarishini va uni songa
        aylantirish uchun <code>int()</code> kerakligini o'rgangan edik. Endi buni{' '}
        <code>try</code>/<code>except</code> bilan birlashtirib, foydalanuvchi to'g'ri son
        kiritmaguncha qayta-qayta so'raymiz:
      </p>
      <CodeBlock lang="python">{`while True:
    matn = input("Yoshingizni kiriting: ")
    try:
        yosh = int(matn)
        break
    except ValueError:
        print("Bu raqam emas, qaytadan urinib ko'ring")

print(f"Rahmat! Sizning yoshingiz: {yosh}")`}</CodeBlock>
      <p>
        Bu yerda <code>while True</code> sikli foydalanuvchi to'g'ri qiymat kiritguncha davom
        etadi: agar <code>int(matn)</code> muvaffaqiyatli bo'lsa, <code>break</code> sikldan
        chiqaradi; agar <code>ValueError</code> chiqsa, xabar ko'rsatilib, sikl yana bir marta
        aylanadi.
      </p>
      <Callout type="tip" title="Xatolik xabarini o'zi ham olish mumkin">
        <code>except ValueError as xato:</code> deb yozib, Python bergan xatolik xabarini
        o'zgaruvchiga saqlab olish va uni chop etish mumkin — bu diagnostika uchun foydali.
      </Callout>
      <CodeBlock lang="python">{`try:
    yosh = int(input("Yoshingizni kiriting: "))
except ValueError as xato:
    print(f"Xatolik tafsiloti: {xato}")`}</CodeBlock>

      <Quiz
        question="Nima uchun except: (aniq tur ko'rsatilmagan) o'rniga except ValueError: kabi aniq exception turini yozish tavsiya etiladi?"
        options={[
          'Kod shu tufayli tezroq ishlaydi',
          "Faqat kutilgan xatolik ushlanadi, boshqa kutilmagan xatoliklar yashirilib qolmaydi",
          'except ValueError boshqa Python versiyalarida ishlamaydi',
          "except: kalit so'zi Python'da umuman mavjud emas",
        ]}
        correctIndex={1}
        explanation="Aniq tur ko'rsatish faqat kutilgan xatolikni ushlab, boshqa (kutilmagan, haqiqatan ham tuzatilishi kerak bo'lgan) xatoliklarni yashirmaslikni ta'minlaydi."
      />

      <Exercise title="Mashq">
        <p>
          Foydalanuvchidan ikkita son so'rang va birinchisini ikkinchisiga bo'ling. Quyidagi
          xatoliklarni tegishli <code>except</code> bloklari bilan ushlang:
        </p>
        <ul>
          <li>
            Agar foydalanuvchi son o'rniga matn kiritsa — <code>"Iltimos, faqat son kiriting"</code>{' '}
            xabarini chiqaring (<code>ValueError</code>).
          </li>
          <li>
            Agar ikkinchi son <code>0</code> bo'lsa — <code>"Nolga bo'lib bo'lmaydi"</code>{' '}
            xabarini chiqaring (<code>ZeroDivisionError</code>).
          </li>
        </ul>
        <Solution>
          <CodeBlock lang="python">{`try:
    a = int(input("Birinchi son: "))
    b = int(input("Ikkinchi son: "))
    natija = a / b
    print(f"Natija: {natija}")
except ValueError:
    print("Iltimos, faqat son kiriting")
except ZeroDivisionError:
    print("Nolga bo'lib bo'lmaydi")`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Ushlanmagan (unhandled) xatolik butun dasturni to'xtatadi — undan keyingi hech qanday
          kod bajarilmaydi.
        </li>
        <li>
          <code>try</code> bloki xavfli kodni o'z ichiga oladi; xatolik chiqsa, mos{' '}
          <code>except</code> bloki ishga tushadi va dastur to'xtamasdan davom etadi.
        </li>
        <li>
          Aniq exception turini ko'rsatish (<code>except ValueError:</code>) tavsiya etiladi —
          umumiy <code>except:</code> kutilmagan xatoliklarni ham yashirib qo'yishi mumkin.
        </li>
        <li>
          Bir nechta xatolik turini alohida <code>except</code> bloklari bilan yoki bitta{' '}
          <code>except (Tur1, Tur2):</code> qatorida birgalikda ushlash mumkin.
        </li>
        <li>
          <code>try</code>/<code>except</code>ni <code>while True</code> va <code>break</code>{' '}
          bilan birlashtirib, foydalanuvchidan to'g'ri qiymat kiritilguncha qayta so'rash mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
