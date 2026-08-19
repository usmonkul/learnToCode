import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "To'plamlar (Sets)",
  section: "Satrlar va ma'lumotlar tuzilmalari",
}

export default function SetsLesson() {
  return (
    <>
      <p>
        Ro'yxat (list), kortej (tuple) va lug'at (dict)dan so'ng, ma'lumotlar tuzilmalarining
        to'rtinchisi — <strong>to'plam (set)</strong>. Uning eng muhim xususiyati:{' '}
        <strong>har bir qiymat faqat bir marta</strong> saqlanadi — takrorlanuvchi elementlar
        avtomatik ravishda olib tashlanadi.
      </p>

      <h2>Yagonalik (uniqueness): asosiy xususiyat</h2>
      <p>
        Ro'yxatni <code>set()</code> funksiyasi orqali to'plamga aylantirsak, takrorlangan
        elementlar o'zi yo'qolib qoladi:
      </p>
      <CodeBlock lang="python">{`sonlar = [1, 2, 2, 3, 3, 3]
toplam = set(sonlar)
print(toplam)  # {1, 2, 3}`}</CodeBlock>
      <p>
        E'tibor bering: <code>[1, 2, 2, 3, 3, 3]</code> ro'yxatida oltita element bor edi, lekin
        to'plamga aylantirilgach faqat uchtasi qoldi — <code>2</code> va <code>3</code> ning
        takrorlari avtomatik tashlab yuborildi.
      </p>

      <h2>To'plam yaratish</h2>
      <p>
        To'plamni bevosita figurali qavs <code>{'{}'}</code> ichida ham yaratish mumkin (lug'atga
        o'xshab ko'rinsa ham, ichida <code>kalit: qiymat</code> emas, faqat qiymatlar bor):
      </p>
      <CodeBlock lang="python">{`rangalar = {"qizil", "yashil", "ko'k"}
print(rangalar)  # {'qizil', 'yashil', "ko'k"} — tartib kafolatlanmaydi`}</CodeBlock>
      <Callout type="warning" title="Diqqat: bo'sh {} — dict, set emas!">
        Bu — boshlovchilarni ko'p chalg'itadigan nozik joy: <code>{'{}'}</code> yolg'iz o'zi bo'sh{' '}
        <strong>lug'at (dict)</strong> yaratadi, bo'sh to'plam emas! Bo'sh to'plam yaratish uchun{' '}
        faqat <code>set()</code> funksiyasidan foydalaning:
      </Callout>
      <CodeBlock lang="python">{`bosh_lugat = {}
print(type(bosh_lugat))  # <class 'dict'>

bosh_toplam = set()
print(type(bosh_toplam))  # <class 'set'>`}</CodeBlock>

      <Quiz
        question="Bo'sh to'plam (set) qanday yaratiladi?"
        options={['{}', 'set()', '[]', '()']}
        correctIndex={1}
        explanation="{} yolg'iz o'zi bo'sh lug'at (dict) yaratadi. Bo'sh to'plam faqat set() funksiyasi orqali yaratiladi."
      />

      <h2>
        To'plam amallari: <code>.union()</code>, <code>.intersection()</code>,{' '}
        <code>.difference()</code>
      </h2>
      <p>
        Matematikadagi to'plamlar nazariyasidagi kabi, Python to'plamlari ustida uchta asosiy
        amalni bajarish mumkin:
      </p>
      <CodeBlock lang="python">{`a = {1, 2, 3, 4}
b = {3, 4, 5, 6}`}</CodeBlock>
      <p>
        <code>.union()</code> — ikkala to'plamdagi barcha elementlarni (takrorlarsiz)
        birlashtiradi:
      </p>
      <CodeBlock lang="python">{`print(a.union(b))  # {1, 2, 3, 4, 5, 6}`}</CodeBlock>
      <p>
        <code>.intersection()</code> — ikkala to'plamda ham mavjud bo'lgan elementlarni (kesishma)
        qaytaradi:
      </p>
      <CodeBlock lang="python">{`print(a.intersection(b))  # {3, 4}`}</CodeBlock>
      <p>
        <code>.difference()</code> — birinchi to'plamda bor, lekin ikkinchisida yo'q elementlarni
        qaytaradi (ayirma):
      </p>
      <CodeBlock lang="python">{`print(a.difference(b))  # {1, 2}
print(b.difference(a))  # {5, 6} — tartib muhim, natija boshqacha`}</CodeBlock>
      <Callout type="note" title="| & - belgilari haqida">
        Python'da bu amallarni <code>|</code>, <code>&</code>, <code>-</code> belgilari orqali ham
        yozish mumkin (masalan, <code>a | b</code>). Aniqlik uchun bu darsda metod nomlaridan (
        <code>.union()</code>, <code>.intersection()</code>, <code>.difference()</code>)
        foydalanamiz — ular nima qilishini nomidanoq tushunish osonroq.
      </Callout>

      <Exercise title="Mashq">
        <p>
          <code>{`talabalar_python = {"Aziz", "Vali", "Laylo"}`}</code> va{' '}
          <code>{`talabalar_java = {"Vali", "Laylo", "Karim"}`}</code> to'plamlari berilgan.
          Quyidagilarni bajaring:
        </p>
        <ul>
          <li>Har ikkala tilni ham o'rganayotgan talabalarni toping (kesishma).</li>
          <li>Faqat Python o'rganayotgan (Java'ni o'rganmayotgan) talabalarni toping.</li>
          <li>Ikkala guruhdagi barcha talabalarning birlashmasini toping.</li>
        </ul>
        <Solution>
          <CodeBlock lang="python">{`talabalar_python = {"Aziz", "Vali", "Laylo"}
talabalar_java = {"Vali", "Laylo", "Karim"}

ikkalasi_ham = talabalar_python.intersection(talabalar_java)
print(ikkalasi_ham)  # {'Vali', 'Laylo'}

faqat_python = talabalar_python.difference(talabalar_java)
print(faqat_python)  # {'Aziz'}

barchasi = talabalar_python.union(talabalar_java)
print(barchasi)  # {'Aziz', 'Vali', 'Laylo', 'Karim'}`}</CodeBlock>
        </Solution>
      </Exercise>

      <h2>To'plamni qachon ishlatish kerak</h2>
      <Callout type="tip" title="To'plam ishlating, agar...">
        <ul>
          <li>
            <strong>Tez mavjudlikni tekshirish</strong> kerak bo'lsa — katta to'plamda{' '}
            <code>qiymat in toplam</code> katta ro'yxatda tekshirishdan sezilarli tezroq ishlaydi.
          </li>
          <li>
            <strong>Takrorlarni avtomatik olib tashlash</strong> kerak bo'lsa — ro'yxatni to'plamga
            aylantirish orqali noyob (unique) qiymatlarni bir amalda olish mumkin.
          </li>
          <li>Elementlar tartibi muhim bo'lmasa (to'plam tartibni saqlamaydi).</li>
        </ul>
      </Callout>

      <Quiz
        question={
          'x = set([1, 1, 2, 3, 3, 3])  bo\'lsa, print(x)  nimani chiqaradi?'
        }
        options={['{1, 1, 2, 3, 3, 3}', '[1, 2, 3]', '{1, 2, 3}', '6']}
        correctIndex={2}
        explanation="set() ro'yxatni to'plamga aylantirib, takrorlangan qiymatlarni avtomatik olib tashlaydi: natija {1, 2, 3}."
      />

      <KeyPoints>
        <li>
          To'plam har bir qiymatni faqat bir marta saqlaydi — <code>set([1, 2, 2, 3])</code>{' '}
          natijasi <code>{'{1, 2, 3}'}</code>.
        </li>
        <li>
          To'plam <code>{'{1, 2, 3}'}</code> yoki <code>set()</code> orqali yaratiladi;{' '}
          <code>{'{}'}</code> yolg'iz o'zi bo'sh lug'at (dict) yaratadi, bo'sh to'plam emas.
        </li>
        <li>
          <code>.union()</code> birlashma, <code>.intersection()</code> kesishma,{' '}
          <code>.difference()</code> ayirmani qaytaradi.
        </li>
        <li>
          To'plamdan tez mavjudlikni tekshirish va avtomatik takrorsizlik kerak bo'lganda
          foydalaning.
        </li>
      </KeyPoints>
    </>
  )
}
