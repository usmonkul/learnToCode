import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'git status',
  section: 'Modul 2. Git asoslari',
}

export default function Lesson08GitStatus() {
  return (
    <>
      <h2>git status buyrug'i va fayllar holati</h2>
      <p>
        <code>git status</code> — bu Git bilan ishlaganda eng ko'p ishlatiladigan buyruqlardan biridir. U joriy repository holatini, qaysi fayllar o'zgargani yoki tayyorlanayotganini ko'rsatib beradi.
      </p>

      <h2>Fayllarning 4 xil holati (File States)</h2>
      <p>
        Git loyihadagi fayllarni 4 ta asosiy holatda ko'radi:
      </p>

      <ul>
        <li>
          <strong>Untracked (Kuzatilmayotgan):</strong> Yangi yaratilgan fayl. Git bu fayl haqida hali hech narsa bilmaydi.
        </li>
        <li>
          <strong>Modified (O'zgargan):</strong> Ilgari saqlangan faylga o'zgartirish kiritilgan, lekin hali saqlashga tayyorlanmagan.
        </li>
        <li>
          <strong>Staged (Tayyorlangan):</strong> <code>git add</code> buyrug'i orqali keyingi commit (saqlash) uchun tayyorlab qo'yilgan fayl.
        </li>
        <li>
          <strong>Committed (Saqlangan):</strong> O'zgarishlar Git bazasiga muvaffaqiyatli saqlangan.
        </li>
      </ul>

      <Callout type="tip" title="Oltin qoida">
        Ish davomida har bir qadamdan so'ng <code>git status</code> buyrug'ini ishga tushirish odati koddagi chalkashliklarning oldini oladi.
      </Callout>

      <Quiz
        question="Yangi yaratilgan, lekin 'git add' qilinmagan fayl Git'da qanday holatda bo'ladi?"
        options={[
          'Staged',
          'Committed',
          'Untracked',
          'Modified',
        ]}
        correctIndex={2}
        explanation="Yangi yaratilgan va hali Git indeksiga qo'shilmagan fayllar Untracked (kuzatilmayotgan) holatida bo'ladi."
      />

      <Exercise title="Mashq: git status bilan amaliyot">
        <p>
          Quyidagi ketma-ketlikni bajaring va terminal natijasini kuzating:
        </p>
        <ol>
          <li><code>index.html</code> nomli yangi fayl yarating.</li>
          <li>Terminalda <code>git status</code> buyrug'ini kiriting (fayl qizil rangda Untracked bo'lib chiqadi).</li>
          <li><code>index.html</code> ichiga kod yozing va saqlang.</li>
          <li>Yana <code>git status</code> buyrug'ini kiritib natijani tahlil qiling.</li>
        </ol>
        <Solution>
          <CodeBlock lang="bash">{`$ git status
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        index.html

nothing added to commit but untracked files present (use "git add" to track)`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>git status</code> loyihaning joriy holatini va fayllar darajasini ko'rsatadi.
        </li>
        <li>
          Fayllar Untracked, Modified, Staged va Committed holatlarida bo'lishi mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
