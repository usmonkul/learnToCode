import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'git log',
  section: 'Modul 2. Git asoslari',
}

export default function Lesson11GitLog() {
  return (
    <>
      <h2>git log (O'zgarishlar tarixi) nima?</h2>
      <p>
        <strong>git log</strong> — bu loyihada amalga oshirilgan barcha commit'lar tarixini ko'rish uchun ishlatiladigan buyruqdir.
        U kim, qachon va qanday o'zgarishlar kiritganini ketma-ketlikda ko'rsatib beradi.
      </p>

      <h2>Asosiy buyruq: git log</h2>
      <p>
        Terminalda oddiy <code>git log</code> buyrug'ini kiritsangiz, har bir commit haqida to'liq ma'lumot chiqadi:
      </p>
      <CodeBlock lang="bash">{`$ git log
commit 9f8a3c2e1b4d5f6a7b8c9d0e1f2a3b4c5d6e7f8a (HEAD -> main)
Author: Ismingiz <email@example.com>
Date:   Mon Jan 15 14:30:00 2024 +0500

    Add navigation bar

commit 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b
Author: Ismingiz <email@example.com>
Date:   Mon Jan 15 14:00:00 2024 +0500

    Initial commit`}</CodeBlock>

      <h2>git log variantlari</h2>
      <p>
        Tarixni yanada ixcham va qulay ko'rish uchun maxsus parametrlardan foydalaniladi:
      </p>

      <h3>1. Bir qatorli ko'rinish: --oneline</h3>
      <p>
        Har bir commit'ni qisqa hash va xabar bilan bitta qatorda chiqaradi:
      </p>
      <CodeBlock lang="bash">{`git log --oneline`}</CodeBlock>
      <CodeBlock lang="text">{`9f8a3c2 (HEAD -> main) Add navigation bar
1a2b3c4 Initial commit`}</CodeBlock>

      <h3>2. Oxirgi N ta commit'ni ko'rish: -n</h3>
      <CodeBlock lang="bash">{`git log -n 3`}</CodeBlock>

      <Callout type="note" title="Log'dan chiqish">
        Agar <code>git log</code> natijasi uzun bo'lsa, terminal sahifalash rejimiga (pager) o'tadi. Undan chiqish uchun klaviaturadagi <strong>q</strong> (quit) tugmasini bosing.
      </Callout>

      <Quiz
        question="Commit'lar tarixini har bir commit uchun faqat bir qatordan iborat ixcham ko'rinishda chiqarish buyrug'i qaysi?"
        options={[
          'git log --short',
          'git log --oneline',
          'git log --simple',
          'git log -1',
        ]}
        correctIndex={1}
        explanation="git log --oneline har bir commit'ni qisqa hash va commit xabari bilan bitta qatorda ifodalaydi."
      />

      <Exercise title="Mashq: Tarixni tekshirish">
        <p>
          Loyihangizda <code>git log --oneline</code> buyrug'ini kiriting va barcha mavjud commit'lar ro'yxatini ko'ring.
        </p>
        <Solution>
          <CodeBlock lang="bash">{`git log --oneline`}</CodeBlock>
          <p>
            Har bir commit oldidagi 7 xonali kod (masalan: <code>9f8a3c2</code>) commit'ning qisqartirilgan SHA-1 hashidir.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>git log</code> loyihaning to'liq commit'lar tarixini ko'rsatadi.
        </li>
        <li>
          <code>git log --oneline</code> tarixni ixcham bitta qatorda ko'rsatish uchun eng qulay buyruqdir.
        </li>
        <li>
          Log ko'rish rejimini yopish uchun <code>q</code> tugmasi bosiladi.
        </li>
      </KeyPoints>
    </>
  )
}
