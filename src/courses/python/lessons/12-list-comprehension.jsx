import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'List comprehension',
  section: "Satrlar va ma'lumotlar tuzilmalari",
}

export default function ListComprehensionLesson() {
  return (
    <>
      <p>
        10 va 11-darslarda ro'yxat yaratish va uni metodlar bilan o'zgartirishni o'rgandik. Juda
        tez-tez uchraydigan vazifa bor: mavjud ro'yxatning har bir elementidan yangi ro'yxat
        yasash. Buning uchun Python'da qisqa va o'qilishi oson maxsus sintaksis —{' '}
        <strong>list comprehension</strong> (ro'yxat yig'indisi) — mavjud.
      </p>

      <h2>Oddiy usuldan boshlaymiz: for + .append()</h2>
      <p>
        Aytaylik, sonlar ro'yxatidagi har bir sonning kvadratidan (kvadratga oshirilgan qiymat)
        iborat yangi ro'yxat kerak. Buni oddiy <code>for</code> sikli va{' '}
        <code>.append()</code> yordamida yozamiz:
      </p>
      <CodeBlock lang="python">{`sonlar = [1, 2, 3, 4, 5]

kvadratlar = []
for son in sonlar:
    kvadratlar.append(son ** 2)

print(kvadratlar)  # [1, 4, 9, 16, 25]`}</CodeBlock>
      <p>
        Bu kod to'rtta qatordan iborat: bo'sh ro'yxat yaratish, sikl boshlash, hisoblash va
        qo'shish. Ishlaydi, lekin shu qadar oddiy vazifa uchun biroz uzun.
      </p>

      <h2>List comprehension: xuddi shu narsa, qisqaroq</h2>
      <p>
        List comprehension yuqoridagi to'rtta qatorni bitta qatorga siqadi. Umumiy shakli:{' '}
        <code>[ifoda for x in iterable]</code>. Yuqoridagi misolni shu shaklda qayta yozamiz:
      </p>
      <CodeBlock lang="python">{`sonlar = [1, 2, 3, 4, 5]
kvadratlar = [son ** 2 for son in sonlar]
print(kvadratlar)  # [1, 4, 9, 16, 25]`}</CodeBlock>
      <p>
        Bu ikkalasi <strong>aynan bir xil natija</strong> beradi — faqat ikkinchisi Python'ning
        o'zi <code>[]</code> ichida bo'sh ro'yxat yaratib, sikl davomida unga avtomatik ravishda{' '}
        <code>append</code> qilib boradi, deb tasavvur qilish mumkin. Yozish tartibi:
      </p>
      <ul>
        <li>
          <code>son ** 2</code> — har bir element bilan nima qilish kerakligini bildiruvchi{' '}
          <strong>ifoda (expression)</strong>.
        </li>
        <li>
          <code>for son in sonlar</code> — qayerdan elementlar olinishini bildiruvchi oddiy{' '}
          <code>for</code> sikli, xuddi avvalgidek.
        </li>
      </ul>
      <Callout type="tip" title="Yana bir misol">
        Har bir mevaning nomini katta harflarga o'tkazish:
      </Callout>
      <CodeBlock lang="python">{`mevalar = ["olma", "nok", "uzum"]
katta_harfli = [meva.upper() for meva in mevalar]
print(katta_harfli)  # ['OLMA', 'NOK', 'UZUM']`}</CodeBlock>

      <Quiz
        question={
          'sonlar = [1, 2, 3]  bo\'lsa, [son * 10 for son in sonlar]  nimani qaytaradi?'
        }
        options={['[1, 2, 3]', '[10, 20, 30]', '30', 'XATO']}
        correctIndex={1}
        explanation="Har bir son 10ga ko'paytirilib, natijalar yangi ro'yxatga yig'iladi: [10, 20, 30]."
      />

      <h2>Filtr qo'shish: shart bilan tanlash</h2>
      <p>
        List comprehension'ga <code>if</code> shartini qo'shib, faqat ma'lum shartga mos
        elementlarnigina yangi ro'yxatga olish mumkin. Umumiy shakli:{' '}
        <code>[ifoda for x in iterable if shart]</code>.
      </p>
      <p>Avval bu ham oddiy siklda qanday ko'rinishini eslaylik:</p>
      <CodeBlock lang="python">{`sonlar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

juftlar = []
for son in sonlar:
    if son % 2 == 0:
        juftlar.append(son)

print(juftlar)  # [2, 4, 6, 8, 10]`}</CodeBlock>
      <p>List comprehension bilan bitta qatorda:</p>
      <CodeBlock lang="python">{`sonlar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
juftlar = [son for son in sonlar if son % 2 == 0]
print(juftlar)  # [2, 4, 6, 8, 10]`}</CodeBlock>
      <p>
        Bu yerda <code>son</code> ifodasi o'zgarmagan (har bir juft son o'z holicha olinyapti),
        faqat <code>if son % 2 == 0</code> sharti orqali toq sonlar chiqarib tashlanmoqda.
        Ifoda va shartni birga ham ishlatish mumkin:
      </p>
      <CodeBlock lang="python">{`sonlar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
juft_kvadratlar = [son ** 2 for son in sonlar if son % 2 == 0]
print(juft_kvadratlar)  # [4, 16, 36, 64, 100]`}</CodeBlock>

      <h2>Qachon comprehension, qachon oddiy sikl?</h2>
      <p>
        List comprehension har doim ham to'g'ri tanlov emas. Buni tanlashda quyidagi qoidaga amal
        qiling:
      </p>
      <Callout type="note" title="Qachon comprehension ishlating">
        Agar vazifa <strong>bitta oddiy amal</strong> (transformatsiya yoki filtr) bo'lsa va uni
        bitta qatorda o'qish qiyin bo'lmasa — comprehension ishlating. U qisqa, tabiiy va
        Python'chalar orasida keng qabul qilingan uslub.
      </Callout>
      <Callout type="warning" title="Qachon oddiy for sikli ishlating">
        Agar vazifada bir nechta qadam bor bo'lsa (masalan, har bir qadamda alohida hisoblash),
        yon effektlar (side effects — masalan, <code>print()</code> qilish yoki faylga yozish)
        bo'lsa, yoki ifoda shu qadar uzun/murakkab bo'lsaki, bitta qatorda o'qish qiyinlashsa —
        oddiy <code>for</code> siklini ishlating. O'qilishi qiyin bo'lgan "aqlli" bitta qatorli
        kod — yomon kod, garchi u ishlasa ham.
      </Callout>
      <CodeBlock lang="python">{`# YOMON: juda murakkab, o'qish qiyin
natija = [x ** 2 if x % 2 == 0 else x ** 3 for x in sonlar if x > 0 and x < 100]

# YAXSHI: bir nechta qadam bo'lsa, oddiy sikl aniqroq
natija = []
for x in sonlar:
    if x > 0 and x < 100:
        if x % 2 == 0:
            natija.append(x ** 2)
        else:
            natija.append(x ** 3)`}</CodeBlock>

      <Exercise title="Mashq">
        <p>
          <code>{`sozlar = ["olma", "behi", "tut", "gilos", "uzum"]`}</code> ro'yxati berilgan. List
          comprehension yordamida uzunligi 4 harfdan katta bo'lgan so'zlardan iborat yangi
          ro'yxat yarating.
        </p>
        <Solution>
          <CodeBlock lang="python">{`sozlar = ["olma", "behi", "tut", "gilos", "uzum"]

uzun_sozlar = [soz for soz in sozlar if len(soz) > 4]
print(uzun_sozlar)  # ['gilos']`}</CodeBlock>
        </Solution>
      </Exercise>

      <Quiz
        question="List comprehension ishlatish uchun eng yaxshi holat qaysi?"
        options={[
          "Faylga yozish kabi yon effekt (side effect) bajarish kerak bo'lganda",
          "Bir nechta shart va qadam ketma-ket bajarilishi kerak bo'lganda",
          "Ro'yxat ustida oddiy, bitta qatorda o'qiladigan transformatsiya yoki filtr kerak bo'lganda",
          "Hech qachon, u doim oddiy sikldan yomonroq",
        ]}
        correctIndex={2}
        explanation="List comprehension oddiy, bitta amalli transformatsiya/filtr uchun eng qulay — murakkab, ko'p qadamli yoki yon effektli vazifalar uchun oddiy for sikli o'qilishi osonroq bo'ladi."
      />

      <KeyPoints>
        <li>
          List comprehension <code>[ifoda for x in iterable]</code> shaklida — bu oddiy{' '}
          <code>for</code> + <code>.append()</code> siklining qisqartirilgan yozilishi.
        </li>
        <li>
          Filtr qo'shish uchun oxiriga <code>if shart</code> qo'shiladi:{' '}
          <code>[ifoda for x in iterable if shart]</code>.
        </li>
        <li>
          Comprehension'ni oddiy, bitta qatorda tushunarli transformatsiya/filtr uchun ishlating;
          ko'p qadamli yoki yon effektli (side effect) vazifalar uchun oddiy <code>for</code>{' '}
          siklidan foydalaning.
        </li>
      </KeyPoints>
    </>
  )
}
