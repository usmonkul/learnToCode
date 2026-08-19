import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Satrlar chuqurroq',
  section: "Satrlar va ma'lumotlar tuzilmalari",
}

export default function StringsLesson() {
  return (
    <>
      <p>
        2-darsda <code>str</code> turi bilan tanishgan edik. Bu darsda satrlar (strings) bilan
        ancha chuqurroq ishlashni o'rganamiz: satrning istalgan belgisiga qanday murojaat qilish,
        satrning bir qismini qanday ajratib olish va satrlar ustida eng ko'p ishlatiladigan
        metodlarni ko'rib chiqamiz.
      </p>

      <h2>Indekslash (indexing)</h2>
      <p>
        Satr — bu belgilar (characters) ketma-ketligi, va har bir belgining o'z tartib raqami
        (indeksi) bor. Python'da hisoblash <strong>0</strong>dan boshlanadi, ya'ni birinchi belgi
        indeks <code>0</code>ga ega:
      </p>
      <CodeBlock lang="python">{`soz = "Python"
print(soz[0])  # P
print(soz[1])  # y
print(soz[5])  # n`}</CodeBlock>
      <p>
        Manfiy indekslar (negative indices) esa satrni oxiridan hisoblash imkonini beradi —{' '}
        <code>-1</code> oxirgi belgi, <code>-2</code> oxiridan ikkinchi belgi va hokazo:
      </p>
      <CodeBlock lang="python">{`soz = "Python"
print(soz[-1])  # n — oxirgi belgi
print(soz[-2])  # o — oxiridan ikkinchi belgi`}</CodeBlock>
      <Callout type="warning" title="Diapazondan tashqari indeks">
        Agar satrda mavjud bo'lmagan indeksga murojaat qilsangiz (masalan, 6 ta belgili satrda{' '}
        <code>soz[10]</code>), Python <code>IndexError</code> xatoligini beradi. Har doim
        satrning uzunligidan oshib ketmaslikka e'tibor bering.
      </Callout>

      <h2>Kesish (slicing)</h2>
      <p>
        Bitta belgi emas, satrning bir qismini (bo'lagini) olish uchun kesish (slicing)
        ishlatiladi: <code>satr[boshlanish:tugash]</code>. Muhim qoida — <code>tugash</code>{' '}
        indeksidagi belgi natijaga <strong>kiritilmaydi</strong>:
      </p>
      <CodeBlock lang="python">{`soz = "Python"
print(soz[1:4])  # yth — 1, 2, 3-indekslar (4-indeks kirmaydi)
print(soz[:3])   # Pyt — boshidan 3-indeksgacha
print(soz[3:])   # hon — 3-indeksdan oxirigacha`}</CodeBlock>
      <p>
        Agar <code>boshlanish</code> ko'rsatilmasa, kesish satr boshidan boshlanadi; agar{' '}
        <code>tugash</code> ko'rsatilmasa, satr oxirigacha davom etadi.
      </p>
      <Callout type="tip" title="Qiziqarli amaliyot: satrni teskari aylantirish">
        <code>satr[::-1]</code> yozuvi satrni to'liq teskari aylantirib beradi — qadam
        (step) sifatida <code>-1</code> berilgani uchun Python satrni oxiridan boshiga qarab
        o'qiydi. Bu — kesishning qiziqarli, amaliy foydalanish usuli:
      </Callout>
      <CodeBlock lang="python">{`soz = "Python"
print(soz[::-1])  # nohtyP`}</CodeBlock>

      <h2>
        <code>len()</code> — satr uzunligi
      </h2>
      <p>
        Satrdagi belgilar sonini <code>len()</code> funksiyasi bilan bilib olish mumkin:
      </p>
      <CodeBlock lang="python">{`soz = "Python"
print(len(soz))  # 6`}</CodeBlock>
      <Quiz
        question={'soz = "salom"  bo\'lsa, soz[1:4] nimani qaytaradi?'}
        options={['sal', 'alo', 'alom', 'salo']}
        correctIndex={1}
        explanation="1-indeksdan (a) boshlab 4-indeksgacha (kiritilmasdan) olinadi: a, l, o — natija 'alo'."
      />

      <h2>Eng ko'p ishlatiladigan satr metodlari</h2>
      <p>
        Python'da satrlar ustida ishlash uchun juda ko'p tayyor metod (method) mavjud. Eng
        muhimlarini ko'rib chiqamiz.
      </p>

      <h3>
        <code>.upper()</code> va <code>.lower()</code>
      </h3>
      <p>Barcha harflarni katta yoki kichik harfga o'tkazadi:</p>
      <CodeBlock lang="python">{`soz = "Salom Dunyo"
print(soz.upper())  # SALOM DUNYO
print(soz.lower())  # salom dunyo`}</CodeBlock>

      <h3>
        <code>.strip()</code>
      </h3>
      <p>
        Satrning boshi va oxiridagi bo'sh joylarni (probel, tab, yangi qator) olib tashlaydi —
        foydalanuvchi kiritgan matnni tozalashda juda foydali:
      </p>
      <CodeBlock lang="python">{`soz = "   Salom!   "
print(soz.strip())  # Salom!`}</CodeBlock>

      <h3>
        <code>.split()</code>
      </h3>
      <p>
        Satrni belgilangan ajratuvchi (separator) bo'yicha bo'laklarga bo'lib, ro'yxat (list)
        qaytaradi. Agar ajratuvchi ko'rsatilmasa, bo'sh joy bo'yicha bo'linadi:
      </p>
      <CodeBlock lang="python">{`gap = "olma, banan, uzum"
print(gap.split(", "))  # ['olma', 'banan', 'uzum']`}</CodeBlock>

      <h3>
        <code>.join()</code>
      </h3>
      <p>
        <code>.split()</code>ning teskarisi — bir nechta satrni (masalan, ro'yxatdagi
        elementlarni) birlashtirib, bitta satr hosil qiladi. Metod ajratuvchi satr ustida
        chaqiriladi:
      </p>
      <CodeBlock lang="python">{`mevalar = ["olma", "banan", "uzum"]
print(", ".join(mevalar))  # olma, banan, uzum`}</CodeBlock>

      <h3>
        <code>.replace()</code>
      </h3>
      <p>Satrdagi barcha ko'rsatilgan qismni boshqasiga almashtiradi:</p>
      <CodeBlock lang="python">{`soz = "Men Java o'rganyapman"
print(soz.replace("Java", "Python"))  # Men Python o'rganyapman`}</CodeBlock>
      <Callout type="note" title="Satrlar o'zgarmas (immutable)">
        Barcha satr metodlari asl satrni o'zgartirmaydi — ular har doim{' '}
        <strong>yangi satr qaytaradi</strong>. Bu haqda keyingi darsda ro'yxatlar bilan
        solishtirganda yana to'xtalamiz.
      </Callout>

      <h2>f-string formatlash: kenglik va aniqlik</h2>
      <p>
        2-darsda f-string (formatlangan satr) bilan oddiy qiymatlarni satr ichiga qo'yishni
        ko'rgan edik. Endi f-string ichida qiymatni qanday <strong>formatlash</strong> mumkinligini
        ko'ramiz — bu ayniqsa sonlarni chiroyli ko'rsatishda juda foydali.
      </p>
      <p>
        Kasr sonni aniq necha xonagacha yaxlitlab chiqarish uchun <code>:.Nf</code> formatidan
        foydalaniladi, bu yerda <code>N</code> — kasr qismidagi raqamlar soni:
      </p>
      <CodeBlock lang="python">{`narx = 9.5
print(f"Narx: {narx:.2f} so'm")  # Narx: 9.50 so'm

pi = 3.14159265
print(f"Pi: {pi:.3f}")  # Pi: 3.142`}</CodeBlock>
      <p>
        Matnni ma'lum kenglikda tekislash (alignment) uchun ham format ishlatish mumkin: {' '}
        <code>&lt;</code> chapga, <code>&gt;</code> o'ngga, <code>^</code> markazga tekislaydi,
        raqam esa umumiy kenglikni bildiradi:
      </p>
      <CodeBlock lang="python">{`ism = "Aziz"
print(f"[{ism:>10}]")  # [      Aziz] — o'ngga tekislangan, 10 belgi kenglik
print(f"[{ism:<10}]")  # [Aziz      ] — chapga tekislangan
print(f"[{ism:^10}]")  # [   Aziz   ] — markazga tekislangan`}</CodeBlock>
      <Callout type="tip" title="Ko'p ishlatiladigan kombinatsiya">
        Jadval yoki chek (chek/receipt) chiqarishda kenglik va aniqlikni birga ishlatish
        keng tarqalgan: <code>{`f"{mahsulot:<12}{narx:>8.2f}"`}</code> — mahsulot nomi 12
        belgi kenglikda chapga, narx esa 8 belgi kenglikda ikki xonali kasr bilan o'ngga
        tekislanadi.
      </Callout>

      <Exercise title="Mashq">
        <p>
          <code>soz = "  Salom, Dunyo!  "</code> o'zgaruvchisi berilgan. Quyidagilarni bajaring:
        </p>
        <ul>
          <li>Satrning boshi va oxiridagi bo'sh joylarni olib tashlang.</li>
          <li>Natijani katta harflarga o'tkazing.</li>
          <li>
            Alohida o'zgaruvchida <code>narx = 3.14159</code> sonini ikki xonali kasr shaklida
            chop eting.
          </li>
        </ul>
        <Solution>
          <CodeBlock lang="python">{`soz = "  Salom, Dunyo!  "
tozalangan = soz.strip()
print(tozalangan.upper())  # SALOM, DUNYO!

narx = 3.14159
print(f"{narx:.2f}")  # 3.14`}</CodeBlock>
        </Solution>
      </Exercise>

      <Quiz
        question={'f"{narx:.2f}" formatida narx = 7  bo\'lsa, natija nima bo\'ladi?'}
        options={['7', '7.0', '7.00', '"7.2f"']}
        correctIndex={2}
        explanation="`:.2f` formati sonni har doim ikki xonali kasr sifatida ko'rsatadi, hatto son butun bo'lsa ham: 7.00."
      />

      <KeyPoints>
        <li>
          Satr belgilariga <code>soz[i]</code> orqali murojaat qilinadi; indeks 0'dan boshlanadi,
          manfiy indekslar (<code>soz[-1]</code>) oxiridan hisoblaydi.
        </li>
        <li>
          Kesish <code>soz[boshlanish:tugash]</code> satrning bir qismini oladi;{' '}
          <code>tugash</code> indeksi natijaga kirmaydi; <code>soz[::-1]</code> satrni teskari
          aylantiradi.
        </li>
        <li>
          <code>len(soz)</code> satrdagi belgilar sonini qaytaradi.
        </li>
        <li>
          Eng ko'p ishlatiladigan metodlar: <code>.upper()</code>, <code>.lower()</code>,{' '}
          <code>.strip()</code>, <code>.split()</code>, <code>.join()</code>,{' '}
          <code>.replace()</code> — barchasi yangi satr qaytaradi, aslini o'zgartirmaydi.
        </li>
        <li>
          f-string ichida <code>:.2f</code> kasr aniqligini, <code>:&gt;10</code>,{' '}
          <code>:&lt;10</code>, <code>:^10</code> kabi yozuvlar esa tekislash va kenglikni
          boshqaradi.
        </li>
      </KeyPoints>
    </>
  )
}
