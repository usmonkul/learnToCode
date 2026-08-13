import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Git o'rnatish va konfiguratsiya",
  section: 'Modul 2. Git asoslari',
}

export default function Lesson06GitOrnatishVaKonfiguratsiya() {
  return (
    <>
      <h2>Git dasturini kompyuterga o'rnatish</h2>
      <p>
        Git bilan ishlashni boshlash uchun uni kompyuteringiz operatsion tizimiga mos ravishda o'rnatib olishingiz kerak.
      </p>

      <h3>1. Windows uchun</h3>
      <p>
        Rasmiy <a href="https://git-scm.com" target="_blank" rel="noreferrer" className="text-brand-600 underline">git-scm.com</a> saytiga kiring va Windows uchun installer faylini yuklab oling. O'rnatish jarayonida barcha standart (default) sozlamalarni qoldirib, <strong>Next</strong> tugmasini bosib bering. O'rnatish davomida kompyuteringizga <strong>Git Bash</strong> terminali ham birga o'rnatiladi.
      </p>

      <h3>2. macOS uchun</h3>
      <p>
        Mac foydalanuvchilari terminalni ochib, <code>git --version</code> buyrug'ini kiritishlari kifoya. Agar Git o'rnatilmagan bo'lsa, tizim avtomatik ravishda Xcode Command Line Tools o'rnatishni taklif qiladi. Yoki Homebrew orqali o'rnatishingiz mumkin:
      </p>
      <CodeBlock lang="bash">{`brew install git`}</CodeBlock>

      <h3>3. Linux (Ubuntu/Debian) uchun</h3>
      <p>
        Linux terminalida quyidagi buyruqni kiriting:
      </p>
      <CodeBlock lang="bash">{`sudo apt update
sudo apt install git`}</CodeBlock>

      <h2>O'rnatishni tekshirish</h2>
      <p>
        Terminal (PowerShell, Command Prompt yoki Git Bash) ni oching va quyidagi buyruqni kiriting:
      </p>
      <CodeBlock lang="bash">{`git --version`}</CodeBlock>
      <p>
        Ekranda <code>git version 2.4x.x</code> kabi javob chiqsa, demak Git kompyuteringizga muvaffaqiyatli o'rnatilgan!
      </p>

      <h2>Git dasturini dastlabki konfiguratsiya qilish (git config)</h2>
      <p>
        Git o'rnatilgach, birinchi navbatda o'zingizning <strong>ism-sharifingiz</strong> va <strong>emailingizni</strong> ko'rsatishingiz shart. Ushbu ma'lumotlar siz yuboradigan har bir commit versiyasiga mualliflik muhri sifatida yoziladi.
      </p>

      <Callout type="warning" title="Diqqat: Email mosligi">
        Email manzilingiz GitHub saytidagi ro'yxatdan o me'moriy o me'moriy o'tgan emailingiz bilan bir xil bo'lishi kerak. Aks holda GitHub sizning lokal commit'laringizni profilingizga bog'lay olmaydi.
      </Callout>

      <p>
        Terminalga quyidagi buyruqlarni ketma-ket kiriting:
      </p>
      <CodeBlock lang="bash">{`git config --global user.name "Eldor Karimov"
git config --global user.email "example@gmail.com"`}</CodeBlock>

      <p>
        Bu yerda <code>--global</code> kaliti ushbu sozlamalarni kompyuteringizdagi barcha kelgusi Git loyihalari uchun amal qilishini ta'minlaydi.
      </p>

      <Quiz
        question="Nima uchun 'git config' buyrug'ida ko'rsatilgan email GitHub'dagi email bilan bir xil bo'lishi kerak?"
        options={[
          "Aks holda Git dasturi umuman ishlamaydi va xatolik beradi",
          "GitHub siz yuborgan commit muallifini aynan shu email orqali profilingiz bilan bog'laydi",
          "Emailingiz xato bo'lsa kompyuteringiz paroli o'chib ketadi",
          "Git faqat gmail.com pochtalari bilan ishlaydi",
        ]}
        correctIndex={1}
        explanation="GitHub har bir commit'dagi email manziliga qarab, o'sha o'zgarishni muayyan GitHub profiliga biriktiradi."
      />

      <h2>Sozlamalarni tekshirish</h2>
      <p>
        Kiritgan ma'lumotlaringiz to'g'riligini tekshirish uchun quyidagi buyruqdan foydalaning:
      </p>
      <CodeBlock lang="bash">{`git config --list`}</CodeBlock>
      <p>
        Yoki konkret bitta parametrimizni tekshirishimiz mumkin:
      </p>
      <CodeBlock lang="bash">{`git config user.name
git config user.email`}</CodeBlock>

      <Exercise title="Amaliy mashq: Git konfiguratsiyasini sozlash">
        <p>
          Kompyuteringiz terminalini oching va quyidagi amallarni bajaring:
        </p>
        <ol>
          <li>Git o'rnatilganini <code>git --version</code> bilan tekshiring.</li>
          <li>O'z ism-sharifingizni <code>user.name</code> ga o'rnating.</li>
          <li>GitHub'dan ro'yxatdan o'tgan emailingizni <code>user.email</code> ga o'rnating.</li>
        </ol>
        <Solution>
          <CodeBlock lang="bash">{`git --version
git config --global user.name "Sizning Ismingiz"
git config --global user.email "sizning_emailingiz@gmail.com"`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="Challenge: Sozlamalarni o'qish">
        <p>
          Terminalda <code>git config user.name</code> va <code>git config user.email</code> buyruqlarini kiritib, kiritilgan ma'lumotlar ekranga to'g'ri chiqayotganini tasdiqlang.
        </p>
        <Solution>
          <CodeBlock lang="bash">{`$ git config user.name
Eldor Karimov

$ git config user.email
example@gmail.com`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Git rasmiy <code>git-scm.com</code> saytidan yuklab olinadi va o'rnatiladi.
        </li>
        <li>
          <code>git --version</code> buyrug'i Git o'rnatilganligini va uning versiyasini ko'rsatadi.
        </li>
        <li>
          <code>git config --global user.name</code> va <code>user.email</code> buyruqlari commit muallifini aniqlaydi.
        </li>
        <li>
          Global email GitHub akkauntingiz emaili bilan bir xil bo'lishi shart.
        </li>
      </KeyPoints>
    </>
  )
}
