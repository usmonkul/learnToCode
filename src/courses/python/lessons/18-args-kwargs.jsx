import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: '*args va **kwargs',
  section: 'Funksiyalar',
}

export default function ArgsKwargsLesson() {
  return (
    <>
      <p>
        Oldingi darslarda funksiya nechta parametr qabul qilishini oldindan aniq bilar edik.
        Lekin ba'zida argumentlar soni oldindan noma'lum bo'ladi — masalan, ikkita son yig'indisini
        emas, balki foydalanuvchi bergan istalgan miqdordagi sonlar yig'indisini hisoblovchi
        funksiya kerak bo'lsa-chi? Buning uchun Python'da <code>*args</code> va{' '}
        <code>**kwargs</code> mavjud.
      </p>

      <h2>
        <code>*args</code> — istalgan miqdordagi pozitsion argument
      </h2>
      <p>
        Parametr nomi oldiga bitta yulduzcha (<code>*</code>) qo'yilsa, funksiya chaqirilganda
        berilgan barcha pozitsion argumentlar bitta <strong>kortej (tuple)</strong>ga yig'iladi:
      </p>
      <CodeBlock lang="python">{`def total(*numbers):
    print(numbers)       # (1, 2, 3) — kortej
    return sum(numbers)

print(total(1, 2, 3))       # 6
print(total(10, 20))        # 30
print(total(5))             # 5
print(total())              # 0`}</CodeBlock>
      <p>
        Funksiya nechta argument bilan chaqirilishidan qat'i nazar (hattoki nolta bilan ham) —{' '}
        <code>total()</code> ishlayveradi, chunki <code>*numbers</code> ularning barchasini
        avtomatik yig'ib oladi.
      </p>

      <h2>
        <code>**kwargs</code> — istalgan miqdordagi nomlangan argument
      </h2>
      <p>
        Xuddi shunday, parametr nomi oldiga ikkita yulduzcha (<code>**</code>) qo'yilsa, funksiya
        chaqirilganda berilgan barcha nomlangan argumentlar bitta <strong>lug'at (dict)</strong>ga
        yig'iladi — kalitlar argument nomlari, qiymatlar esa ularga berilgan qiymatlar bo'ladi:
      </p>
      <CodeBlock lang="python">{`def profil_chop(**kwargs):
    for kalit, qiymat in kwargs.items():
        print(f"{kalit}: {qiymat}")

profil_chop(ism="Aziz", yosh=25, shahar="Toshkent")
# ism: Aziz
# yosh: 25
# shahar: Toshkent`}</CodeBlock>
      <p>
        <code>profil_chop</code> funksiyasi oldindan qancha va qanday nomdagi argument
        kelishini bilmasa ham, <code>**kwargs</code> tufayli barchasini qabul qilib, ular ustida
        ishlay oladi.
      </p>

      <Callout type="note" title="args va kwargs — shunchaki nom">
        <code>args</code> va <code>kwargs</code> — bu shunchaki an'anaviy (conventional) nomlar,
        ularning o'zi Python uchun ahamiyatsiz. Asosiy narsa — <code>*</code> va{' '}
        <code>**</code> belgilari; parametrni <code>*sonlar</code> yoki{' '}
        <code>**maʼlumotlar</code> deb ham nomlash mumkin, natija bir xil bo'ladi.
      </Callout>

      <Quiz
        question="Funksiya ichida *args orqali qabul qilingan argumentlar qaysi turga yig'iladi?"
        options={['list', 'tuple', 'dict', 'set']}
        correctIndex={1}
        explanation="*args orqali qabul qilingan barcha pozitsion argumentlar tuple (kortej) turiga yig'iladi."
      />

      <Exercise title="Mashq">
        <p>
          <code>eng_katta(*sonlar)</code> nomli funksiya yozing — u istalgan miqdordagi son qabul
          qilib, ular orasidan eng kattasini <code>return</code> orqali qaytarsin (Python'ning
          ichki <code>max()</code> funksiyasidan foydalanishingiz mumkin). Funksiyani uch xil
          sonlar to'plami bilan sinab ko'ring.
        </p>
        <Solution>
          <CodeBlock lang="python">{`def eng_katta(*sonlar):
    return max(sonlar)

print(eng_katta(3, 7, 2))        # 7
print(eng_katta(10))             # 10
print(eng_katta(-5, -1, -20))    # -1`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>*args</code> funksiyaga berilgan barcha pozitsion argumentlarni bitta{' '}
          <code>tuple</code>ga yig'adi.
        </li>
        <li>
          <code>**kwargs</code> funksiyaga berilgan barcha nomlangan argumentlarni bitta{' '}
          <code>dict</code>ga yig'adi.
        </li>
        <li>
          <code>args</code>/<code>kwargs</code> — shunchaki qulay nomlar; asosiy narsa{' '}
          <code>*</code> va <code>**</code> belgilarining o'zi.
        </li>
      </KeyPoints>
    </>
  )
}
