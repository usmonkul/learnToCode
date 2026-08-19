import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Fayllar bilan ishlash: o'qish va yozish",
  section: 'Modullar va fayllar',
}

export default function FilesLesson() {
  return (
    <>
      <h2>
        Fayl ochish: <code>open()</code>
      </h2>
      <p>
        Hozirgacha dasturimiz ishlatgan barcha ma'lumot dastur to'xtagach yo'qolib ketardi.
        Ma'lumotni doimiy saqlash uchun uni <strong>faylga</strong> yozish kerak. Python'da fayl
        bilan ishlash <code>open()</code> funksiyasidan boshlanadi — unga fayl nomi va{' '}
        <strong>rejim (mode)</strong> beriladi:
      </p>
      <CodeBlock lang="python">{`fayl = open("yozuvlar.txt", "r")`}</CodeBlock>
      <p>Rejim fayl bilan nima qilmoqchi ekaningizni bildiradi — uchta asosiy rejim bor:</p>
      <ul>
        <li>
          <code>"r"</code> (read) — o'qish rejimi. Fayl mavjud bo'lishi shart, aks holda xatolik
          chiqadi.
        </li>
        <li>
          <code>"w"</code> (write) — yozish rejimi. Fayl mavjud bo'lmasa, yangisini yaratadi;
          mavjud bo'lsa, <strong>ichidagi barcha eski matnni o'chirib</strong>, boshidan yozadi.
        </li>
        <li>
          <code>"a"</code> (append) — qo'shish rejimi. Fayl mavjud bo'lmasa, yangisini yaratadi;
          mavjud bo'lsa, eski matnni saqlab, yangi matnni <strong>oxiriga qo'shadi</strong>.
        </li>
      </ul>
      <Callout type="warning" title="'w' rejimiga ehtiyot bo'ling">
        <code>"w"</code> rejimida faylni ochish — mavjud faylning butun mazmunini darhol
        o'chiradi, hatto hali hech narsa yozmagan bo'lsangiz ham. Agar eski matnni saqlab, faqat
        qo'shimcha qilmoqchi bo'lsangiz, <code>"a"</code> rejimidan foydalaning.
      </Callout>

      <h2>
        <code>with</code> operatori — nega u muhim?
      </h2>
      <p>
        Faylni ochgandan so'ng, ish tugagach uni <strong>yopish</strong> kerak — aks holda
        operatsion tizim resurslarini bekor band qilib turadi va ba'zan yozilgan ma'lumot
        diskka to'liq saqlanmasligi mumkin. Buni qo'lda qilish mumkin:
      </p>
      <CodeBlock lang="python">{`fayl = open("yozuvlar.txt", "w")
fayl.write("Salom, dunyo!")
fayl.close()`}</CodeBlock>
      <p>
        Muammo shundaki, agar <code>write()</code> bilan <code>close()</code> orasida xatolik
        yuz bersa, <code>close()</code> qatori hech qachon bajarilmaydi va fayl ochiq qolib
        ketadi. Shuning uchun Python <code>with</code> operatorini taklif qiladi — u faylni
        <strong> avtomatik yopadi</strong>, hatto blok ichida xatolik yuz bersa ham:
      </p>
      <CodeBlock lang="python">{`with open("yozuvlar.txt", "w") as fayl:
    fayl.write("Salom, dunyo!")

# bu qatorga kelganda fayl allaqachon avtomatik yopilgan`}</CodeBlock>
      <p>
        <code>as fayl</code> — ochilgan fayl obyektini <code>fayl</code> nomli o'zgaruvchiga
        saqlaydi. <code>with</code> bloki tugashi bilan (oddiy holatda ham, xatolik chiqqan
        holatda ham) Python fayl uchun avtomatik <code>close()</code> chaqiradi — shuning uchun
        siz buni qo'lda unutib qo'yishdan xavotirlanmaysiz.
      </p>
      <Callout type="note" title="21-darsdagi va'daga qaytamiz">
        21-darsda <code>finally</code> ni "tozalash" kodi, masalan fayl yopish, uchun ishlatish
        mumkinligini aytgan edik. Fayllar bilan ishlashda buning hojati kamdan-kam bo'ladi —{' '}
        <code>with</code> operatori xuddi shu tozalashni o'zi, avtomatik ravishda bajaradi.
      </Callout>

      <h2>Fayldan o'qish</h2>
      <p>
        Faylni qator-qator (satr-satr) o'qishning eng qulay yo'li — <code>for</code> sikli bilan
        to'g'ridan-to'g'ri fayl obyekti ustidan yurish:
      </p>
      <CodeBlock lang="python">{`with open("yozuvlar.txt", "r") as fayl:
    for qator in fayl:
        print(qator.strip())  # strip() qator oxiridagi \\n belgisini olib tashlaydi`}</CodeBlock>
      <p>
        Agar barcha qatorlarni bitta ro'yxat sifatida olmoqchi bo'lsangiz,{' '}
        <code>.readlines()</code> metodidan foydalaning:
      </p>
      <CodeBlock lang="python">{`with open("yozuvlar.txt", "r") as fayl:
    qatorlar = fayl.readlines()
    print(qatorlar)  # ['Birinchi qator\\n', 'Ikkinchi qator\\n']`}</CodeBlock>
      <p>
        Butun faylni bitta yaxlit matn sifatida olish uchun esa <code>.read()</code> metodi
        ishlatiladi.
      </p>

      <h2>Faylga yozish</h2>
      <p>
        Yozish uchun <code>"w"</code> yoki <code>"a"</code> rejimida ochilgan fayl obyektining{' '}
        <code>.write()</code> metodidan foydalaniladi. Diqqat qiling — <code>.write()</code>{' '}
        qator oxiriga avtomatik yangi qator (<code>\n</code>) qo'shmaydi, buni o'zingiz
        yozishingiz kerak:
      </p>
      <CodeBlock lang="python">{`with open("yozuvlar.txt", "a") as fayl:
    fayl.write("Yangi qator\\n")
    fayl.write("Yana bir qator\\n")`}</CodeBlock>

      <Quiz
        question="'w' va 'a' rejimlari orasidagi asosiy farq nima?"
        options={[
          "'w' faylni faqat o'qish uchun ochadi, 'a' esa yozish uchun",
          "'w' eski matnni o'chirib boshidan yozadi, 'a' esa eski matnni saqlab oxiriga qo'shadi",
          "'w' va 'a' bir xil ishlaydi, faqat nomi boshqacha",
          "'w' faylni yaratadi, 'a' esa hech qachon yangi fayl yaratmaydi",
        ]}
        correctIndex={1}
        explanation="'w' rejimi mavjud faylning butun mazmunini o'chirib, qaytadan yozadi; 'a' rejimi esa eski matnni saqlab, yangisini oxiriga qo'shadi."
      />

      <h2>Xatolikka tayyor bo'lish: fayl topilmasa</h2>
      <p>
        20-darsda o'rgangan <code>try</code>/<code>except</code> fayllar bilan ishlashda ham
        juda foydali — masalan, mavjud bo'lmagan faylni o'qishga urinsangiz, Python{' '}
        <code>FileNotFoundError</code> xatoligini chiqaradi va dastur to'xtaydi:
      </p>
      <CodeBlock lang="python">{`try:
    with open("mavjud_emas.txt", "r") as fayl:
        matn = fayl.read()
        print(matn)
except FileNotFoundError:
    print("Bunday fayl topilmadi")`}</CodeBlock>
      <p>
        Bu yerda <code>with</code> va <code>try</code>/<code>except</code> birga ishlatildi:{' '}
        <code>with</code> faylni to'g'ri yopilishini kafolatlaydi, <code>except</code> esa fayl
        umuman mavjud bo'lmagan holatda dasturni to'xtatib qo'ymaydi.
      </p>

      <Quiz
        question="with operatoridan foydalanishning asosiy afzalligi nima?"
        options={[
          "Kod satrlari soni kamayadi, boshqa hech qanday amaliy farqi yo'q",
          "Fayl avtomatik yopiladi — blok ichida xatolik yuz bersa ham",
          "Faylni faqat o'qish rejimida ochish imkonini beradi",
          ".close() chaqirishni butunlay man qiladi va xatolik beradi",
        ]}
        correctIndex={1}
        explanation="with operatori blok tugagach faylni avtomatik yopadi, hatto blok ichida xatolik yuz bergan taqdirda ham — shu bois close() ni qo'lda chaqirib, uni unutib qo'yish xavfi yo'qoladi."
      />

      <Exercise title="Mashq">
        <p>
          <code>with</code> operatoridan foydalanib, <code>"hisobot.txt"</code> nomli faylni{' '}
          <code>"w"</code> rejimida oching va ikkita qatorni yozing: <code>"Kirim: 500000"</code>{' '}
          va <code>"Chiqim: 300000"</code> (har birini alohida qatorga). So'ng faylni{' '}
          <code>"r"</code> rejimida qayta oching va har bir qatorni <code>for</code> sikli
          yordamida chop eting. Butun o'qish qismini <code>try</code>/<code>except</code> bilan
          o'rab, <code>FileNotFoundError</code> chiqsa <code>"Fayl topilmadi"</code> deb chop
          eting.
        </p>
        <Solution>
          <CodeBlock lang="python">{`with open("hisobot.txt", "w") as fayl:
    fayl.write("Kirim: 500000\\n")
    fayl.write("Chiqim: 300000\\n")

try:
    with open("hisobot.txt", "r") as fayl:
        for qator in fayl:
            print(qator.strip())
except FileNotFoundError:
    print("Fayl topilmadi")`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>open(fayl_nomi, rejim)</code> faylni ochadi: <code>"r"</code> — o'qish,{' '}
          <code>"w"</code> — eski matnni o'chirib yozish, <code>"a"</code> — oxiriga qo'shish.
        </li>
        <li>
          <code>with open(...) as fayl:</code> faylni blok tugagach avtomatik yopadi, xatolik
          yuz bersa ham — bu qo'lda <code>.close()</code> chaqirib, uni unutib qo'yishdan
          xavfsizroq.
        </li>
        <li>
          Faylni satr-satr o'qish uchun <code>for qator in fayl:</code>, barcha qatorlarni
          ro'yxat sifatida olish uchun <code>.readlines()</code> ishlatiladi.
        </li>
        <li>
          Faylga yozish uchun <code>.write()</code> ishlatiladi; u qator oxiriga avtomatik{' '}
          <code>\n</code> qo'shmaydi, buni o'zingiz kiritishingiz kerak.
        </li>
        <li>
          Mavjud bo'lmagan faylni o'qishga urinish <code>FileNotFoundError</code> beradi — buni{' '}
          <code>try</code>/<code>except</code> bilan ushlab, dasturni to'xtab qolishdan
          saqlash mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
