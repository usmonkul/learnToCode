import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import Figure from '@/components/content/Figure'
import KeyPoints from '@/components/content/KeyPoints'
import nestedLoopsGrid from '@/assets/nested-loops-grid.svg'

export const meta = {
  title: 'Ichma-ich sikllar',
  section: 'Boshqaruv tuzilmalari',
}

export default function NestedLoopsLesson() {
  return (
    <>
      <p>
        Sikl ichida yana bir sikl yozish mumkin — bunga ichma-ich sikl (nested loop) deyiladi.
        Bu, masalan, jadval, koordinatalar to'ri (grid) yoki har bir elementni boshqa har bir
        element bilan solishtirish kerak bo'lgan vazifalarda juda foydali.
      </p>

      <h2>Ichma-ich <code>for</code> sikli qanday ishlaydi</h2>
      <p>
        Kichik misolni birma-bir kuzatamiz — tashqi (outer) sikl <code>i</code> bo'yicha, ichki
        (inner) sikl esa <code>j</code> bo'yicha yuradi:
      </p>
      <CodeBlock lang="python">{`for i in range(3):
    for j in range(2):
        print(i, j)`}</CodeBlock>
      <p>Natija:</p>
      <CodeBlock lang="python">{`0 0
0 1
1 0
1 1
2 0
2 1`}</CodeBlock>
      <p>
        Muhim qoida: <strong>tashqi sikl har bir qadamida ichki sikl to'liq boshidan oxirigacha
        aylanib chiqadi</strong>. Ya'ni <code>i = 0</code> bo'lganda <code>j</code> avval{' '}
        <code>0</code>, keyin <code>1</code> qiymatini oladi — shundagina tashqi sikl{' '}
        <code>i = 1</code>ga o'tadi va ichki sikl yana <code>0</code>dan boshlab aylanadi.
      </p>

      <Figure
        src={nestedLoopsGrid}
        alt="Ichma-ich siklning bosib o'tish tartibini ko'rsatuvchi 3x2 katakli sxema, har bir katakda tartib raqami va (i, j) juftligi"
        caption="1-rasm: for i in range(3): for j in range(2) siklining bosib o'tish tartibi — ichki sikl har bir i uchun to'liq aylanadi"
      />

      <Callout type="note" title="Nechta marta takrorlanadi?">
        Yuqoridagi misolda tashqi sikl 3 marta, har safar ichki sikl 2 marta ishlaydi — jami{' '}
        <code>3 &times; 2 = 6</code> marta <code>print</code> chaqiriladi. Bu sonni keyinroq
        "ishlash tezligi" bo'limida yana ko'ramiz.
      </Callout>

      <Quiz
        question="for i in range(2): for j in range(3): print(i, j) kodi nechta qator chop etadi?"
        options={['2', '3', '5', '6']}
        correctIndex={3}
        explanation="Tashqi sikl 2 marta, har safar ichki sikl 3 marta ishlaydi: 2 x 3 = 6 marta print chaqiriladi."
      />

      <h2>Amaliy misol: ko'paytirish jadvali (multiplication table)</h2>
      <p>
        Ichma-ich sikllarning klassik qo'llanilishi — ko'paytirish jadvali. Tashqi sikl qatorni
        (row), ichki sikl esa ustunni (column) hosil qiladi:
      </p>
      <CodeBlock lang="python">{`for i in range(1, 6):
    for j in range(1, 6):
        natija = i * j
        print(f"{i} x {j} = {natija}")
    print()  # har bir qator (i) tugagach bo'sh qator qo'shish uchun`}</CodeBlock>
      <p>
        Bu kod <code>1</code> dan <code>5</code> gacha bo'lgan har bir <code>i</code> uchun,
        yana <code>1</code> dan <code>5</code> gacha bo'lgan har bir <code>j</code> bilan
        ko'paytmani hisoblab chiqadi — jami <code>5 &times; 5 = 25</code> qator natija beradi.
        E'tibor bering: <code>print()</code> qatori ichki siklning <strong>tashqarisida</strong>,
        lekin tashqi siklning <strong>ichida</strong> joylashgan — shu sababli u har bir{' '}
        <code>i</code> tugagach bir marta, jami 5 marta bajariladi.
      </p>

      <h2>Ishlash tezligi haqida intuitsiya</h2>
      <p>
        Ichma-ich sikllar iteratsiyalar sonini <strong>ko'paytiradi</strong>, qo'shmaydi. Agar
        tashqi sikl <code>n</code> marta, ichki sikl esa har safar <code>m</code> marta
        ishlasa, ichki bloq jami <code>n &times; m</code> marta bajariladi. Masalan,{' '}
        <code>range(100)</code> ichida yana <code>range(100)</code> bo'lsa — bu{' '}
        <code>100 &times; 100 = 10 000</code> marta bajarilish degani, garchi kod atigi ikki
        qator bo'lsa ham.
      </p>
      <Callout type="tip" title="Nega bu muhim?">
        Katta ma'lumotlar bilan ishlaganda ichma-ich sikllar sekinlashtirishi mumkin — bu haqda
        rasmiy hisob-kitob (Big-O) keyinroq, murakkabroq darslarda o'rganiladi. Hozircha shuni
        eslab qoling: har bir qo'shimcha ichki sikl, umumiy ishlash vaqtini sezilarli darajada
        oshirishi mumkin.
      </Callout>

      <h2>Uch qavatgacha ham bo'lishi mumkin</h2>
      <p>
        Sikllarni ikkitadan ortiq qavatga ham joylashtirish mumkin, lekin har bir qo'shimcha
        qavat kodni o'qishni qiyinlashtiradi va ishlash tezligini yanada pasaytiradi — shuning
        uchun odatda 2-3 qavatdan oshirmaslikka harakat qilinadi.
      </p>

      <Exercise title="Mashq">
        <p>
          Ichma-ich sikllar yordamida quyidagi uchburchak shaklini ekranga chiqaring
          (har bir qator o'z raqamiga teng sondagi <code>*</code> belgisidan iborat bo'lsin):
        </p>
        <CodeBlock lang="python">{`*
**
***
****
*****`}</CodeBlock>
        <Solution>
          <CodeBlock lang="python">{`for i in range(1, 6):
    qator = ""
    for j in range(i):
        qator += "*"
    print(qator)`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Ichma-ich sikl — bir siklning ichida yana bir sikl; tashqi siklning har bir qadamida
          ichki sikl to'liq boshidan oxirigacha aylanadi.
        </li>
        <li>
          Ko'paytirish jadvali kabi ikki o'lchamli naqshlar (pattern) uchun tashqi sikl qator,
          ichki sikl ustun rolini o'ynaydi.
        </li>
        <li>
          <code>n</code> martalik tashqi sikl va <code>m</code> martalik ichki sikl jami{' '}
          <code>n &times; m</code> marta bajariladi — sikllarni ichma-ich joylashtirish
          takrorlanish sonini ko'paytiradi.
        </li>
        <li>
          Kodni o'qish va tezlikni saqlash uchun odatda ichma-ich sikllarni 2-3 qavatdan
          oshirmaslik tavsiya etiladi.
        </li>
      </KeyPoints>
    </>
  )
}
