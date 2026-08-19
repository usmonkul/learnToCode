import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Foydalanuvchidan ma'lumot olish",
  section: 'Boshlash uchun',
}

export default function InputLesson() {
  return (
    <>
      <h2>
        <code>input()</code> funksiyasi
      </h2>
      <p>
        Hozirgacha yozgan dasturlarimizda barcha qiymatlarni o'zimiz kod ichida belgilab qo'ygan
        edik. Lekin haqiqiy dasturlar odatda foydalanuvchi (user) bilan muloqot qiladi — undan
        ma'lumot so'raydi. Python'da buning uchun <code>input()</code> funksiyasi ishlatiladi:
      </p>
      <CodeBlock lang="python">{`ism = input("Ismingiz nima? ")
print(f"Salom, {ism}!")`}</CodeBlock>
      <p>
        Bu kod ishga tushganda, ekranda <code>Ismingiz nima?</code> degan xabar chiqadi va dastur
        to'xtab, foydalanuvchi klaviaturada nimadir yozib <code>Enter</code> bosishini kutadi.
        Foydalanuvchi yozgan matn <code>ism</code> o'zgaruvchisiga saqlanadi.
      </p>
      <Callout type="tip" title="input() ichidagi matn — bu prompt">
        <code>input()</code> qavs ichiga yozilgan matn — bu foydalanuvchiga ko'rsatiladigan taklif
        (prompt). U shart emas — <code>input()</code>ni bo'sh qavs bilan ham chaqirish mumkin —
        lekin foydalanuvchiga nima kiritish kerakligini tushuntirib turadi.
      </Callout>

      <h2>
        <code>input()</code> har doim <code>str</code> qaytaradi
      </h2>
      <p>
        Bu boshlang'ich dasturchilar ko'pincha tushunmay qoladigan eng muhim jihat:{' '}
        <code>input()</code> foydalanuvchi nima yozishidan qat'i nazar, natijani{' '}
        <strong>har doim</strong> matn (<code>str</code>) sifatida qaytaradi — hatto foydalanuvchi
        raqam yozgan bo'lsa ham:
      </p>
      <CodeBlock lang="python">{`yosh = input("Yoshingiz nechida? ")  # foydalanuvchi "25" deb yozdi
print(type(yosh))  # <class 'str'> — son emas, matn!`}</CodeBlock>
      <p>
        Shu sababli, agar <code>yosh</code> bilan arifmetik amal bajarmoqchi bo'lsak, xatolikka
        duch kelamiz:
      </p>
      <CodeBlock lang="python">{`yosh = input("Yoshingiz nechida? ")  # "25"
keyingi_yil = yosh + 1
# XATO: can only concatenate str (not "int") to str`}</CodeBlock>
      <p>
        Python bu yerda <code>yosh</code>ni son deb hisoblamaydi — u uchun bu oddiy matn, va
        matnga sonni to'g'ridan-to'g'ri qo'shib bo'lmaydi.
      </p>
      <Callout type="warning" title="Yechim: turini aylantiring">
        Agar kiritilgan qiymat son bo'lishi kerak bo'lsa, uni <code>int()</code> (butun son uchun)
        yoki <code>float()</code> (kasr son uchun) yordamida aylantiring (convert):
      </Callout>
      <CodeBlock lang="python">{`yosh = int(input("Yoshingiz nechida? "))  # "25" -> 25
keyingi_yil = yosh + 1
print(f"Bir yildan keyin sizga {keyingi_yil} yosh bo'ladi")`}</CodeBlock>
      <p>
        Bu yerda <code>int()</code>ni <code>input()</code>ning natijasiga to'g'ridan-to'g'ri
        qo'llash mumkin — avval matn qabul qilinadi, so'ng darhol songa aylantiriladi.
      </p>

      <h2>Amaliy misol: ism va yosh</h2>
      <p>
        Endi ikkita <code>input()</code>ni birlashtirib, kichik interaktiv dastur yozamiz:
      </p>
      <CodeBlock lang="python">{`ism = input("Ismingiz nima? ")
yosh = int(input("Yoshingiz nechida? "))

print(f"Salom, {ism}! Siz {yosh} yoshdasiz.")`}</CodeBlock>
      <p>
        Diqqat qiling: <code>ism</code> uchun aylantirish shart emas, chunki u matn bo'lib qoladi
        va f-string ichida to'g'ridan-to'g'ri ishlatilaveradi. <code>yosh</code> esa keyinchalik
        son sifatida ishlatilishi mumkin bo'lgani uchun <code>int()</code> bilan aylantirildi.
      </p>
      <Quiz
        question={`Quyidagi kod bajarilganda foydalanuvchi "7" deb yozsa, x o'zgaruvchisining turi qanday bo'ladi? x = input("Son kiriting: ")`}
        options={['int', 'float', 'str', 'bool']}
        correctIndex={2}
        explanation="input() natijasi har doim str turida bo'ladi, hatto foydalanuvchi raqam yozgan taqdirda ham — turini o'zgartirish uchun int() yoki float() kerak."
      />

      <Exercise title="Mashq">
        <p>
          Foydalanuvchidan mahsulot narxini (raqam sifatida) so'rang va uni <code>float()</code>{' '}
          yordamida songa aylantiring. So'ngra narxga 15% QQS (soliq) qo'shib, yakuniy narxni
          f-string yordamida ekranga chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="python">{`narx = float(input("Mahsulot narxini kiriting: "))
yakuniy_narx = narx * 1.15

print(f"QQS bilan yakuniy narx: {yakuniy_narx}")`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>input()</code> foydalanuvchiga xabar (prompt) ko'rsatadi va uning klaviaturada
          yozgan matnini qaytaradi.
        </li>
        <li>
          <code>input()</code> natijasi har doim <code>str</code> bo'ladi — hatto foydalanuvchi
          son yozgan bo'lsa ham.
        </li>
        <li>
          Son kerak bo'lganda, natijani <code>int()</code> yoki <code>float()</code> bilan
          aylantirish kerak, aks holda arifmetik amallarda xatolik chiqadi.
        </li>
        <li>
          Aylantirishni <code>input()</code>ning natijasiga to'g'ridan-to'g'ri qo'llash mumkin:{' '}
          <code>{`int(input(...))`}</code>.
        </li>
      </KeyPoints>
    </>
  )
}
