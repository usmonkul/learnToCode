import CodeBlock from '@/components/content/CodeBlock'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import Quiz from '@/components/content/Quiz'
import Figure from '@/components/content/Figure'
import loopFlow from '@/assets/loop-flow.svg'

export const meta = {
  title: 'Sikllar',
  section: 'Boshqaruv tuzilmalari',
}

export default function LoopsLesson() {
  return (
    <>
      <p>
        Sikl (loop) — bir xil kodni bir necha marta takrorlash uchun ishlatiladi. Python'da
        ikkita asosiy sikl turi mavjud: <code>for</code> va <code>while</code>.
      </p>
      <h2>
        <code>for</code> sikli
      </h2>
      <p>
        <code>for</code> sikli ro'yxat (list) yoki <code>range()</code> kabi ketma-ketlik
        (sequence) elementlari bo'ylab yurish uchun ishlatiladi:
      </p>
      <CodeBlock lang="python">{`for son in range(1, 6):
    print(son)`}</CodeBlock>
      <p>
        Bu kod 1 dan 5 gacha bo'lgan sonlarni chop etadi. <code>range(1, 6)</code> — 1 dan
        boshlab 6 gacha (6 kirmaydi) sonlar ketma-ketligini hosil qiladi.
      </p>
      <h2>
        <code>while</code> sikli
      </h2>
      <p>Shart (condition) rost bo'lguncha takrorlanadigan sikl:</p>
      <CodeBlock lang="python">{`son = 1
while son <= 5:
    print(son)
    son += 1`}</CodeBlock>
      <Figure
        src={loopFlow}
        alt="Sikl ishlash jarayonini ko'rsatuvchi sxema"
        caption="1-rasm: while siklining ishlash jarayoni"
      />
      <Exercise title="Mashq">
        <p>
          1 dan 10 gacha bo'lgan sonlar yig'indisini (sum) hisoblab, ekranga chiqaradigan kod
          yozing.
        </p>
        <Solution>
          <CodeBlock lang="python">{`yigindi = 0
for son in range(1, 11):
    yigindi += son

print(yigindi)  # 55`}</CodeBlock>
        </Solution>
      </Exercise>
      <Quiz
        question="range(1, 6) qancha ta son hosil qiladi?"
        options={['4', '5', '6', '7']}
        correctIndex={1}
        explanation="range(1, 6) — 1, 2, 3, 4, 5 sonlarini hosil qiladi, ya'ni 5 ta son. Oxirgi qiymat (6) natijaga kirmaydi."
      />
    </>
  )
}
