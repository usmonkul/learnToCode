import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Yakuniy loyiha',
  section: 'Amaliy loyiha',
}

export default function CapstoneLesson() {
  return (
    <>
      <p>
        Tabriklaymiz — bu kursning oxirgi darsi! Shu paytgacha o'zgaruvchilar, shartlar, sikllar,
        ma'lumotlar tuzilmalari, funksiyalar va xatoliklar bilan ishlashni alohida-alohida
        o'rgandik. Endi hammasini birlashtirib, <strong>haqiqiy, to'liq ishlaydigan dastur</strong>{' '}
        yozamiz: <strong>kontaktlar boshqaruvchisi</strong> (contact manager). Dastur menyu orqali
        boshqariladi, foydalanuvchi yangi kontakt qo'shishi, mavjud kontaktni qidirib topishi va
        istalgan vaqtda dasturdan chiqishi mumkin bo'ladi.
      </p>

      <h2>Loyiha rejasi</h2>
      <p>Dasturimiz quyidagi qismlardan iborat bo'ladi:</p>
      <ul>
        <li>
          Barcha kontaktlarni saqlaydigan bitta <strong>lug'at (dictionary)</strong> — 14-darsda
          o'rgangan ma'lumot tuzilmasi.
        </li>
        <li>
          Foydalanuvchidan buyruq qabul qiladigan, u <code>"chiqish"</code> deb yozmaguncha
          takrorlanadigan <strong>menyu sikli</strong> — 7-darsdagi <code>break</code> va
          20-darsda ko'rgan <code>while True</code> naqshi.
        </li>
        <li>
          Kod takrorlanmasligi uchun har bir amal — qo'shish, qidirish — alohida{' '}
          <strong>funksiya</strong>ga o'ralgan — 16-darsdagi <code>def</code> va{' '}
          <code>return</code>.
        </li>
        <li>
          Foydalanuvchi yoshni noto'g'ri kiritsa dastur qulamasligi uchun{' '}
          <strong>try/except</strong> — 20-darsdagi xavfsiz konvertatsiya naqshi.
        </li>
      </ul>

      <h2>1-qadam: menyu skeleti</h2>
      <p>
        Avval dasturning "skeletini" quramiz — hali hech narsa qo'shmaydi yoki qidirmaydi, faqat
        menyuni ko'rsatib, buyruqni o'qiydi. 3-darsda o'rgangan <code>input()</code> bilan
        foydalanuvchidan matn olamiz, 5-darsdagi <code>if</code>/<code>elif</code>/<code>else</code>{' '}
        bilan buyruqni tekshiramiz, 20-darsda ko'rgan <code>while True</code> naqshi esa
        foydalanuvchi <code>"chiqish"</code> deb yozmaguncha menyuni qayta-qayta ko'rsatadi:
      </p>
      <CodeBlock lang="python">{`while True:
    print("\\n--- Kontaktlar boshqaruvchisi ---")
    print("qo'shish  — yangi kontakt qo'shish")
    print("qidirish  — kontaktni topish")
    print("chiqish   — dasturdan chiqish")
    buyruq = input("\\nBuyruq kiriting: ")

    if buyruq == "chiqish":
        print("Xayr!")
        break
    elif buyruq == "qo'shish":
        pass  # keyingi qadamda to'ldiramiz
    elif buyruq == "qidirish":
        pass  # keyingi qadamda to'ldiramiz
    else:
        print("Noma'lum buyruq, qaytadan urinib ko'ring")`}</CodeBlock>
      <p>
        <code>break</code> — 7-darsda ko'rgan kalit so'z — <code>while True</code> siklini
        to'xtatadi, shu bilan dastur ham tugaydi. <code>pass</code> — hech narsa qilmaydigan
        "bo'sh" qator, uni keyingi qadamlarda haqiqiy kod bilan almashtiramiz.
      </p>

      <h2>2-qadam: kontakt qo'shish funksiyasi</h2>
      <p>
        Endi kontakt qo'shadigan alohida funksiya yozamiz. 16-darsda ko'rganimizdek, takrorlanadigan
        amalni funksiyaga o'rash kodni tartibli qiladi. Kontaktni <strong>lug'at</strong> sifatida
        saqlaymiz — kalit (key) sifatida ism, qiymat (value) sifatida esa telefon raqamini o'z
        ichiga olgan yana bir lug'at ishlatiladi:
      </p>
      <CodeBlock lang="python">{`def kontakt_qoshish(kontaktlar):
    ism = input("Ism: ")
    telefon = input("Telefon raqami: ")
    kontaktlar[ism] = {"telefon": telefon}
    print(f"{ism} qo'shildi!")`}</CodeBlock>
      <p>
        Bu yerda <code>kontaktlar</code> — funksiyaga parametr sifatida beriladigan asosiy lug'at.
        Funksiya uning ichiga <code>kontaktlar[ism] = {'{'}"telefon": telefon{'}'}</code> qatori
        bilan yangi kalit-qiymat juftligini qo'shadi — xuddi 14-darsda o'rgangan{' '}
        <code>d["yangi_kalit"] = qiymat</code> naqshi kabi.
      </p>

      <h2>3-qadam: kontakt qidirish funksiyasi</h2>
      <p>
        Qidirish funksiyasi ism bo'yicha lug'atdan ma'lumot topadi. Kontakt mavjudligini
        tekshirish uchun 14-darsda o'rgangan <code>in</code> operatoridan foydalanamiz — bu{' '}
        <code>KeyError</code> xatoligiga yo'l qo'ymaydi:
      </p>
      <CodeBlock lang="python">{`def kontakt_qidirish(kontaktlar):
    ism = input("Qaysi ismni qidiryapsiz? ")
    if ism in kontaktlar:
        malumot = kontaktlar[ism]
        print(f"Ism: {ism}")
        print(f"Telefon: {malumot['telefon']}")
    else:
        print(f"{ism} kontaktlar orasida topilmadi")`}</CodeBlock>
      <p>
        <code>if ism in kontaktlar:</code> — 5-darsdagi shartli operator bilan 14-darsdagi{' '}
        <code>in</code> tekshiruvining birgalikda ishlashi: agar ism topilmasa,{' '}
        <code>else</code> blokidagi xabar chiqadi, dastur qulamaydi.
      </p>

      <h2>4-qadam: yoshni xavfsiz olish — try/except</h2>
      <p>
        Endi har bir kontaktga yosh ham qo'shmoqchimiz. Muammo shundaki, foydalanuvchi son o'rniga
        matn kiritishi mumkin (masalan <code>"yigirma besh"</code>), bu esa{' '}
        <code>int()</code>ni <code>ValueError</code> bilan qulatadi — 20-darsda aynan shu holatni
        ko'rgan edik. Yechim — <code>while True</code> siklini <code>try</code>/<code>except</code>{' '}
        bilan birlashtirib, to'g'ri son kiritilguncha qayta so'rash:
      </p>
      <CodeBlock lang="python">{`def yosh_olish():
    while True:
        matn = input("Yosh: ")
        try:
            yosh = int(matn)
            return yosh
        except ValueError:
            print("Yosh son bo'lishi kerak, qaytadan kiriting")`}</CodeBlock>
      <Callout type="tip" title="return sikldan ham, funksiyadan ham chiqaradi">
        20-darsda <code>try</code> ichida to'g'ri qiymat topilganda <code>break</code> bilan
        sikldan chiqqan edik. Bu yerda esa <code>return yosh</code> ishlatilyapti — u nafaqat{' '}
        <code>while True</code> siklini, balki butun <code>yosh_olish()</code> funksiyasini ham
        shu zahoti tugatadi va topilgan qiymatni chaqirgan joyga qaytaradi — 16-darsdagi{' '}
        <code>return</code> xususiyati.
      </Callout>
      <p>
        Endi 2- va 3-qadamdagi funksiyalarni yosh maydoni bilan yangilaymiz —{' '}
        <code>kontakt_qoshish</code> yangi <code>yosh_olish()</code>ni chaqiradi, ikkalasi ham
        natijani lug'atga qo'shadi:
      </p>
      <CodeBlock lang="python">{`def kontakt_qoshish(kontaktlar):
    ism = input("Ism: ")
    telefon = input("Telefon raqami: ")
    yosh = yosh_olish()
    kontaktlar[ism] = {"telefon": telefon, "yosh": yosh}
    print(f"{ism} qo'shildi!")


def kontakt_qidirish(kontaktlar):
    ism = input("Qaysi ismni qidiryapsiz? ")
    if ism in kontaktlar:
        malumot = kontaktlar[ism]
        print(f"Ism: {ism}")
        print(f"Telefon: {malumot['telefon']}")
        print(f"Yosh: {malumot['yosh']}")
    else:
        print(f"{ism} kontaktlar orasida topilmadi")`}</CodeBlock>

      <Quiz
        question={`Agar foydalanuvchi yosh o'rniga "yigirma besh" kabi matn kiritsa, yosh_olish() funksiyasida nima sodir bo'ladi?`}
        options={[
          "Dastur ValueError xatoligi bilan darhol to'xtaydi",
          "except bloki ishga tushadi, xabar chiqadi va while True sikli yana bir marta aylanib, yosh qaytadan so'raladi",
          "yosh o'zgaruvchisiga avtomatik 0 qiymati beriladi",
          "Kontakt yoshsiz, faqat ism va telefon bilan saqlanadi",
        ]}
        correctIndex={1}
        explanation="int(matn) ValueError chaqarsa, except bloki xabarni chiqaradi, lekin funksiya hali qaytmagani uchun while True sikli davom etadi va foydalanuvchidan yana so'raladi — bu 20-darsdagi 'to'g'ri qiymat kiritilguncha qayta so'rash' naqshi."
      />

      <h2>5-qadam: hammasini birlashtiramiz</h2>
      <p>
        Endi barcha qismlarni bitta faylga yig'amiz: yordamchi funksiyalar yuqorida, bo'sh{' '}
        <code>kontaktlar</code> lug'ati va menyu sikli pastda:
      </p>
      <CodeBlock lang="python">{`def yosh_olish():
    while True:
        matn = input("Yosh: ")
        try:
            yosh = int(matn)
            return yosh
        except ValueError:
            print("Yosh son bo'lishi kerak, qaytadan kiriting")


def kontakt_qoshish(kontaktlar):
    ism = input("Ism: ")
    telefon = input("Telefon raqami: ")
    yosh = yosh_olish()
    kontaktlar[ism] = {"telefon": telefon, "yosh": yosh}
    print(f"{ism} qo'shildi!")


def kontakt_qidirish(kontaktlar):
    ism = input("Qaysi ismni qidiryapsiz? ")
    if ism in kontaktlar:
        malumot = kontaktlar[ism]
        print(f"Ism: {ism}")
        print(f"Telefon: {malumot['telefon']}")
        print(f"Yosh: {malumot['yosh']}")
    else:
        print(f"{ism} kontaktlar orasida topilmadi")


kontaktlar = {}

while True:
    print("\\n--- Kontaktlar boshqaruvchisi ---")
    print("qo'shish  — yangi kontakt qo'shish")
    print("qidirish  — kontaktni topish")
    print("chiqish   — dasturdan chiqish")
    buyruq = input("\\nBuyruq kiriting: ")

    if buyruq == "chiqish":
        print("Xayr!")
        break
    elif buyruq == "qo'shish":
        kontakt_qoshish(kontaktlar)
    elif buyruq == "qidirish":
        kontakt_qidirish(kontaktlar)
    else:
        print("Noma'lum buyruq, qaytadan urinib ko'ring")`}</CodeBlock>
      <p>Masalan, foydalanuvchi ketma-ket shunday harakat qilsa:</p>
      <CodeBlock lang="python">{`# Buyruq kiriting: qo'shish
# Ism: Aziz
# Telefon raqami: +998901234567
# Yosh: yigirma besh
# Yosh son bo'lishi kerak, qaytadan kiriting
# Yosh: 25
# Aziz qo'shildi!
#
# Buyruq kiriting: qidirish
# Qaysi ismni qidiryapsiz? Aziz
# Ism: Aziz
# Telefon: +998901234567
# Yosh: 25
#
# Buyruq kiriting: chiqish
# Xayr!`}</CodeBlock>
      <p>
        Diqqat qiling: <code>kontaktlar</code> lug'ati <code>while True</code> siklidan{' '}
        <strong>tashqarida</strong> bir marta yaratiladi — agar u sikl ichida yaratilganida, har
        bir aylanishda qayta bo'shab, oldin qo'shilgan kontaktlar yo'qolib qolar edi. Funksiyalarga
        esa u har safar parametr sifatida uzatiladi, shuning uchun ikkala funksiya ham bitta,
        umumiy lug'at bilan ishlaydi.
      </p>

      <Callout type="note" title="Butun kursni birlashtirib ko'ring">
        Bu dasturda ishlatilgan har bir qism avval alohida darsda o'rgangan tushuncha: 2-darsdagi
        o'zgaruvchilar, 3-darsdagi <code>input()</code>, 4–5-darsdagi operatorlar va shartlar,
        6–7-darsdagi <code>while</code>/<code>break</code>, 14-darsdagi lug'atlar, 16-darsdagi
        funksiyalar va 20-darsdagi <code>try</code>/<code>except</code>. Yakka holda oddiy
        ko'ringan bu tushunchalar birlashganda haqiqiy dasturga aylanadi.
      </Callout>

      <Quiz
        question="Kontaktlar boshqaruvchisi dasturida kontaktlar lug'atining har bir kaliti (key) nimani bildiradi?"
        options={[
          "Kontaktning telefon raqamini",
          "Kontaktning ismini",
          "Kontaktning yoshini",
          "Menyudagi buyruqni",
        ]}
        correctIndex={1}
        explanation="kontaktlar lug'atida har bir ism kalit (key) sifatida ishlatiladi; unga mos qiymat esa telefon va yoshni o'z ichiga olgan ichki lug'at."
      />

      <Exercise title="Mashq">
        <p>
          Dasturga yana bitta buyruq qo'shing: <code>"ro'yxat"</code> — barcha saqlangan
          kontaktlarni ism, telefon va yosh bilan birga chop etadi. Quyidagilarga amal qiling:
        </p>
        <ul>
          <li>
            Yangi <code>barcha_kontaktlar(kontaktlar)</code> funksiyasini yozing — u 14-darsdagi{' '}
            <code>.items()</code> yordamida lug'at bo'yicha aylanib, har bir kontaktni chop etsin.
          </li>
          <li>
            Agar <code>kontaktlar</code> hali bo'sh bo'lsa (5-darsdagi falsy qiymatlarni eslang —
            bo'sh lug'at ham falsy hisoblanadi), <code>"Hali birorta ham kontakt yo'q"</code>{' '}
            xabarini chop eting va funksiyadan chiqing.
          </li>
          <li>
            Asosiy menyu sikliga <code>elif buyruq == "ro'yxat":</code> shartini qo'shib, yangi
            funksiyani chaqiring.
          </li>
        </ul>
        <Solution>
          <CodeBlock lang="python">{`def barcha_kontaktlar(kontaktlar):
    if not kontaktlar:
        print("Hali birorta ham kontakt yo'q")
        return
    for ism, malumot in kontaktlar.items():
        print(f"{ism}: {malumot['telefon']}, {malumot['yosh']} yosh")`}</CodeBlock>
          <p>Va menyu siklidagi shartlar zanjiriga yangi tarmoq qo'shiladi:</p>
          <CodeBlock lang="python">{`    if buyruq == "chiqish":
        print("Xayr!")
        break
    elif buyruq == "qo'shish":
        kontakt_qoshish(kontaktlar)
    elif buyruq == "qidirish":
        kontakt_qidirish(kontaktlar)
    elif buyruq == "ro'yxat":
        barcha_kontaktlar(kontaktlar)
    else:
        print("Noma'lum buyruq, qaytadan urinib ko'ring")`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <strong>2-dars:</strong> o'zgaruvchilar va turlar (<code>str</code>, <code>int</code>)
          dasturning har bir qismida ishlatiladi.
        </li>
        <li>
          <strong>3-dars:</strong> <code>input()</code> foydalanuvchidan har doim <code>str</code>{' '}
          qaytaradi — shu sabab yoshni <code>int()</code> bilan aylantirish kerak bo'ldi.
        </li>
        <li>
          <strong>4–5-dars:</strong> taqqoslash (<code>==</code>) va <code>if</code>/
          <code>elif</code>/<code>else</code> buyruqlarni ajratish uchun ishlatildi.
        </li>
        <li>
          <strong>6–7-dars:</strong> <code>while True</code> menyuni takrorlaydi, <code>break</code>{' '}
          esa <code>"chiqish"</code> kiritilganda dasturni to'xtatadi.
        </li>
        <li>
          <strong>14-dars:</strong> lug'at (kontaktlar) ma'lumotlarni ism bo'yicha saqlash uchun
          asosiy tuzilma bo'ldi — <code>in</code> va <code>.items()</code> ham shu yerdan.
        </li>
        <li>
          <strong>16-dars:</strong> funksiyalar (<code>def</code>, <code>return</code>) kodni
          takrorlanmaydigan, tartibli qismlarga bo'ldi.
        </li>
        <li>
          <strong>20-dars:</strong> <code>try</code>/<code>except</code> foydalanuvchi noto'g'ri
          qiymat kiritganda dasturni qulashdan saqladi.
        </li>
        <li>
          Kichik, alohida tushunchalar to'g'ri birlashtirilganda — to'liq, ishlaydigan dastur
          hosil bo'ladi. Tabriklaymiz, siz Python asoslarini muvaffaqiyatli tugatdingiz!
        </li>
      </KeyPoints>
    </>
  )
}
