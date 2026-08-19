import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Lambda funksiyalar',
  section: 'Funksiyalar',
}

export default function LambdaLesson() {
  return (
    <>
      <p>
        "Funksiyalar" bo'limining oxirgi mavzusi — <strong>lambda funksiyalar</strong>. Bu —
        nomsiz (anonymous), bitta ifodadan (expression) iborat kichik funksiyalarni yaratishning
        qisqartirilgan usuli.
      </p>

      <h2>
        <code>lambda</code> — nomsiz funksiya
      </h2>
      <p>
        Oddiy <code>def</code> funksiyasi va unga teng keluvchi <code>lambda</code> funksiyasini
        solishtiraylik:
      </p>
      <CodeBlock lang="python">{`def ikkilantir(x):
    return x * 2

ikkilantir_lambda = lambda x: x * 2

print(ikkilantir(5))         # 10
print(ikkilantir_lambda(5))  # 10 — natija bir xil`}</CodeBlock>
      <p>
        <code>lambda</code> sintaksisi: <code>lambda parametrlar: ifoda</code>. E'tibor bering,
        bu yerda <code>return</code> kalit so'zi yozilmaydi — ifodaning natijasi avtomatik
        qaytariladi. <code>lambda</code> funksiyasining nomi ham bo'lishi shart emas — yuqorida
        biz uni faqat ko'rsatish uchun <code>ikkilantir_lambda</code> o'zgaruvchisiga saqladik.
      </p>

      <h2>
        Qachon <code>lambda</code>, qachon <code>def</code> ishlatish kerak
      </h2>
      <p>
        <code>lambda</code> faqat <strong>bitta ifodadan</strong> iborat bo'lishi mumkin — ichida
        bir nechta qator kod, shart operatorlari yoki sikllar bo'lishi mumkin emas. Shuning uchun
        u quyidagi holatlarga mos:
      </p>
      <ul>
        <li>Mantiq juda qisqa va bitta ifoda bilan ifodalanadigan bo'lsa.</li>
        <li>
          Funksiya bir martalik (throwaway) bo'lib, faqat boshqa funksiyaga argument sifatida
          berilishi kerak bo'lsa.
        </li>
      </ul>
      <p>
        Agar mantiq bir nechta qatordan iborat bo'lsa, shart yoki sikl talab qilsa, yoki
        funksiyani keyinchalik qayta ishlatish uchun unga aniq nom kerak bo'lsa — odatdagi{' '}
        <code>def</code>dan foydalaning. <code>lambda</code> qulaylik uchun mo'ljallangan
        qisqartma, <code>def</code>ning o'rnini bosuvchi umumiy vosita emas.
      </p>

      <h2>
        Amaliy misol: <code>sorted()</code> bilan <code>lambda</code>
      </h2>
      <p>
        <code>lambda</code>ning eng ko'p uchraydigan ishlatilishi — boshqa funksiyaga{' '}
        <code>key</code> (saralash mezoni) sifatida berish. Masalan, lug'atlar ro'yxatini
        yoshiga qarab saralaymiz:
      </p>
      <CodeBlock lang="python">{`talabalar = [
    {"ism": "Aziz", "yosh": 25},
    {"ism": "Vali", "yosh": 19},
    {"ism": "Laylo", "yosh": 22},
]

saralangan = sorted(talabalar, key=lambda talaba: talaba["yosh"])
for t in saralangan:
    print(t["ism"], t["yosh"])
# Vali 19
# Laylo 22
# Aziz 25`}</CodeBlock>
      <p>
        Bu yerda <code>lambda talaba: talaba["yosh"]</code> — har bir elementdan saralash uchun
        qaysi qiymatni olishni <code>sorted()</code>ga aytib beruvchi kichik funksiya. Uni alohida{' '}
        <code>def</code> bilan yozish ham mumkin bo'lardi, lekin bitta joyda, bir martalik
        ishlatiladigan bunday mantiq uchun <code>lambda</code> qulayroq va qisqaroq.
      </p>
      <p>
        Xuddi shunday, <code>map()</code> funksiyasi bilan har bir elementga o'zgartirish
        qo'llash mumkin:
      </p>
      <CodeBlock lang="python">{`sonlar = [1, 2, 3, 4]
ikkilangan = list(map(lambda x: x * 2, sonlar))
print(ikkilangan)  # [2, 4, 6, 8]`}</CodeBlock>
      <Callout type="tip" title="lambda — bir og'iz maslahat">
        <code>lambda</code>ni uzoq yoki murakkab mantiq uchun majburlamang. Agar uni bir qatorga
        sig'dirish qiyin bo'lsa yoki uni o'qish uchun bir necha marta o'ylashga to'g'ri kelsa —
        oddiy <code>def</code> funksiyasi yaxshiroq tanlov.
      </Callout>

      <Quiz
        question="lambda funksiyasi haqida qaysi gap TO'G'RI?"
        options={[
          "lambda ichida return kalit so'zi yoziladi",
          'lambda faqat bitta ifodadan iborat bo\'lishi mumkin',
          'lambda def o\'rnini har doim bosa oladi',
          'lambda faqat sonlar bilan ishlaydi',
        ]}
        correctIndex={1}
        explanation="lambda faqat bitta ifodadan iborat bo'ladi va uning natijasi avtomatik qaytariladi — return kalit so'zisiz."
      />

      <Exercise title="Mashq">
        <p>
          <code>{`sozlar = ["banan", "olma", "behi", "uzum"]`}</code> ro'yxati berilgan.{' '}
          <code>sorted()</code> va <code>lambda</code> yordamida bu ro'yxatni har bir so'zning
          uzunligiga (harflar soniga) qarab saralang.
        </p>
        <Solution>
          <CodeBlock lang="python">{`sozlar = ["banan", "olma", "behi", "uzum"]

saralangan = sorted(sozlar, key=lambda s: len(s))
print(saralangan)  # ['olma', 'behi', 'uzum', 'banan']`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>lambda parametrlar: ifoda</code> — nomsiz, bitta ifodadan iborat funksiya;{' '}
          <code>return</code> yozilmaydi, natija avtomatik qaytariladi.
        </li>
        <li>
          <code>lambda</code>ni qisqa, bir martalik mantiq uchun ishlating; ko'p qatorli yoki
          qayta ishlatiladigan mantiq uchun <code>def</code>dan foydalaning.
        </li>
        <li>
          Eng ko'p uchraydigan ishlatilishi — <code>sorted()</code>ga <code>key</code> sifatida
          yoki <code>map()</code>/<code>filter()</code>ga argument sifatida berish.
        </li>
      </KeyPoints>
    </>
  )
}
