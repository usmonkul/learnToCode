import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "O'zgaruvchilar va turlar",
  section: 'Boshlash uchun',
}

export default function VariablesLesson() {
  return (
    <>
      <p>
        O'zgaruvchi (variable) — bu qiymatni saqlab turadigan nom. Python'da o'zgaruvchi
        yaratish uchun uning turini (type) oldindan e'lon qilish shart emas — bu boshqa ko'plab
        tillardan farqli xususiyat.
      </p>
      <CodeBlock lang="python">{`ism = "Aziz"
yosh = 25
narx = 9.99
talaba = True`}</CodeBlock>
      <Callout type="tip" title="Dinamik tiplash (dynamic typing)">
        Python o'zgaruvchining turini qiymatga qarab avtomatik aniqlaydi. Yuqoridagi misolda{' '}
        <code>ism</code> — matn (str), <code>yosh</code> — butun son (int),{' '}
        <code>narx</code> — kasr son (float), <code>talaba</code> esa mantiqiy qiymat
        (boolean).
      </Callout>
      <p>
        O'zgaruvchining turini <code>type()</code> funksiyasi yordamida tekshirishingiz mumkin:
      </p>
      <CodeBlock lang="python">{`yosh = 25
print(type(yosh))  # <class 'int'>`}</CodeBlock>
      <Callout type="warning" title="Diqqat">
        Matn (str) va sonni to'g'ridan-to'g'ri qo'shib bo'lmaydi. Masalan,{' '}
        <code>{`"Yosh: " + 25`}</code> xatolikka olib keladi — avval sonni matnga aylantirish
        kerak: <code>{`"Yosh: " + str(25)`}</code>.
      </Callout>
      <p>
        Amaliyotda tez-tez f-string (formatlangan satr) qulayroq ishlatiladi, chunki u
        turlarni avtomatik moslashtiradi:
      </p>
      <CodeBlock lang="python">{`yosh = 25
print(f"Mening yoshim {yosh} da")`}</CodeBlock>
      <Quiz
        question="Quyidagi qiymatlardan qaysi biri Python'da avtomatik 'float' turiga ega bo'ladi?"
        options={['narx = 10', 'narx = "10"', 'narx = 10.5', 'narx = True']}
        correctIndex={2}
        explanation="Kasr son (masalan, 10.5) Python tomonidan avtomatik ravishda float turi sifatida aniqlanadi."
      />
      <KeyPoints>
        <li>O'zgaruvchi yaratishda tur (type) ko'rsatish shart emas.</li>
        <li>
          Asosiy turlar: <code>str</code>, <code>int</code>, <code>float</code>,{' '}
          <code>bool</code>.
        </li>
        <li>
          Turni <code>type()</code> bilan tekshirish, f-string bilan formatlash mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
