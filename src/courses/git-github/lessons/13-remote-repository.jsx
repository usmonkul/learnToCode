import CodeBlock from '@/components/content/CodeBlock'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Remote repository',
  section: 'Modul 3. Git + GitHub',
}

export default function Lesson13RemoteRepository() {
  return (
    <>
      <h2>Remote Repository (Masofaviy ombor) nima?</h2>
      <p>
        Shu paytgacha biz faqat o'z kompyuterimizdagi <strong>Local Repository</strong> (Lokal ombor) bilan ishladik.
      </p>
      <p>
        <strong>Remote Repository</strong> — bu internetda (masalan GitHub, GitLab yoki Bitbucket serverlarida) saqlanadigan masofaviy repository'dir. U loyiha kodini zaxiralash va jamoa a'zolari bilan almashish imkonini beradi.
      </p>

      <h2>origin tushunchasi</h2>
      <p>
        Git'da masofaviy server uchun standart (default) beriladigan qisqa nom <code>origin</code> deb ataladi. U serverning to'liq HTTPS yoki SSH URL manziliga havola (alias) vazifasini o'taydi.
      </p>

      <h2>git remote buyruqlari</h2>
      <p>
        Lokal repository'ingizga ulangan masofaviy repository'larni ko'rish uchun:
      </p>
      <CodeBlock lang="bash">{`git remote`}</CodeBlock>

      <p>
        Ularning to'liq URL manzillarini ko'rish uchun:
      </p>
      <CodeBlock lang="bash">{`git remote -v`}</CodeBlock>

      <Quiz
        question="Git'da 'origin' nomi nimani anglatadi?"
        options={[
          'Birinchi yaratilgan commit nomi',
          'Masofaviy (remote) GitHub repository URL manzili uchun beriladigan standart nom',
          'Lokal papkaning asosiy nomi',
          'Loyihaning eng birinchi varianti',
        ]}
        correctIndex={1}
        explanation="origin — bu masofaviy repository URL manzilining qisqacha Git'dagi nomlanishidir."
      />

      <Exercise title="Mashq: Remote manzillarni tekshirish">
        <p>
          Terminalingizda <code>git remote -v</code> buyrug'ini kiriting va ulanish mavjudligini ko'ring.
        </p>
        <Solution>
          <CodeBlock lang="bash">{`$ git remote -v
origin  https://github.com/username/my-project.git (fetch)
origin  https://github.com/username/my-project.git (push)`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Remote Repository — tarmoqda yoki GitHub serverlarida saqlanadigan repository.
        </li>
        <li>
          <code>origin</code> masofaviy repository havolasining standart nomlanishidir.
        </li>
        <li>
          <code>git remote -v</code> ulangan masofaviy URL manzillarini ko'rsatadi.
        </li>
      </KeyPoints>
    </>
  )
}
