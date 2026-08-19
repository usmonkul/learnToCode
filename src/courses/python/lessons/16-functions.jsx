import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Funksiyalar asoslari',
  section: 'Funksiyalar',
}

export default function FunctionsLesson() {
  return (
    <>
      <p>
        Shu paytgacha o'rgangan barcha narsalarimiz — o'zgaruvchilar, shartlar, sikllar,
        ma'lumotlar tuzilmalari — kodni bir marta yozib, uni yuqoridan pastga o'qib chiqar edik.
        Endi kodni <strong>funksiya (function)</strong> — nomi bilan chaqiriladigan, qayta-qayta
        ishlatsa bo'ladigan kod bo'lagi ichiga o'rash bilan tanishamiz.
      </p>

      <h2>Nima uchun funksiya kerak?</h2>
      <p>
        Tasavvur qiling, dasturingizda uchta joyda foydalanuvchini salomlashingiz kerak. Funksiyasiz
        yozsak, bir xil kodni uch marta ko'chirib yozishga to'g'ri keladi:
      </p>
      <CodeBlock lang="python">{`print("Salom, Aziz!")
print("Xush kelibsiz!")

print("Salom, Vali!")
print("Xush kelibsiz!")

print("Salom, Laylo!")
print("Xush kelibsiz!")`}</CodeBlock>
      <p>
        Bu kod ishlaydi, lekin muammoli: agar salomlashish xabarini o'zgartirmoqchi bo'lsangiz, uni
        uchta joyda ham o'zgartirish kerak bo'ladi. Endi shu kodni funksiya ichiga o'rab ko'ramiz:
      </p>
      <CodeBlock lang="python">{`def salomla(ism):
    print(f"Salom, {ism}!")
    print("Xush kelibsiz!")

salomla("Aziz")
salomla("Vali")
salomla("Laylo")`}</CodeBlock>
      <p>
        Endi kod ham qisqaroq, ham o'qish osonroq, ham xabarni o'zgartirish uchun faqat bitta
        joyni — funksiya tanasini — o'zgartirish kifoya. Bu funksiyaning ikkita asosiy foydasi:{' '}
        <strong>qayta ishlatish (reuse)</strong> va <strong>o'qilishni yaxshilash (readability)</strong>.
      </p>

      <h2>
        Funksiya yaratish: <code>def</code>
      </h2>
      <p>
        Funksiya <code>def</code> (define — aniqlash) kalit so'zi bilan boshlanadi. Eng oddiy
        funksiya hech qanday parametr qabul qilmaydi:
      </p>
      <CodeBlock lang="python">{`def salom_ayt():
    print("Salom, dunyo!")`}</CodeBlock>
      <p>
        Bu yerda <code>salom_ayt</code> — funksiya nomi, qavslar <code>()</code> ichida parametrlar
        (parameters) — funksiyaga beriladigan qiymatlar — ro'yxati turadi (hozircha bo'sh), qatordan
        keyingi qatorlar esa funksiya tanasi (body) bo'lib, chekinish (indentation) bilan ajratiladi.
      </p>
      <p>
        Funksiyani yaratish uni hali <strong>ishlatmaydi</strong> — funksiyani ishga tushirish uchun
        uni nomi va qavslar bilan <strong>chaqirish (call)</strong> kerak:
      </p>
      <CodeBlock lang="python">{`def salom_ayt():
    print("Salom, dunyo!")

salom_ayt()  # Salom, dunyo!
salom_ayt()  # Salom, dunyo! — qayta chaqirish mumkin`}</CodeBlock>
      <Callout type="note" title="def qatorini ishga tushirish funksiyani chaqirmaydi">
        Python faylni yuqoridan pastga o'qiganda, <code>def salom_ayt():</code> qatoriga yetganda
        funksiya faqat <strong>yaratiladi</strong> — ichidagi kod hali bajarilmaydi. Kod faqat
        funksiya <code>salom_ayt()</code> deb chaqirilganda ishga tushadi.
      </Callout>

      <h2>Parametrli funksiya</h2>
      <p>
        Funksiyaga tashqaridan qiymat berish uchun qavslar ichiga parametr qo'shamiz. Parametr —
        funksiya ichida ishlatiladigan, chaqirilganda qiymat oladigan o'zgaruvchi:
      </p>
      <CodeBlock lang="python">{`def salomla(ism):
    print(f"Salom, {ism}!")

salomla("Aziz")   # Salom, Aziz!
salomla("Laylo")  # Salom, Laylo!`}</CodeBlock>
      <p>
        Funksiya bir nechta parametr qabul qilishi ham mumkin — ularni vergul bilan ajratamiz:
      </p>
      <CodeBlock lang="python">{`def toliq_malumot(ism, yosh):
    print(f"{ism}, {yosh} yoshda.")

toliq_malumot("Aziz", 25)  # Aziz, 25 yoshda.`}</CodeBlock>

      <h2>
        <code>return</code> — qiymatni qaytarish
      </h2>
      <p>
        Hozirgacha funksiyalarimiz faqat <code>print()</code> orqali ekranga natija chiqargan.
        Lekin bu chegaralangan: natija faqat ko'rsatiladi, uni boshqa hisob-kitoblarda qayta
        ishlatib bo'lmaydi. <code>return</code> kalit so'zi funksiyaga natijani{' '}
        <strong>chaqirgan joyga qaytarish</strong> imkonini beradi:
      </p>
      <CodeBlock lang="python">{`def kvadrat(son):
    return son * son

natija = kvadrat(5)
print(natija)  # 25`}</CodeBlock>
      <p>
        Farqni solishtiring: <code>print()</code>li funksiya faqat ekranga chiqaradi va boshqa
        hech narsa qilmaydi, <code>return</code>li funksiya esa qiymatni hisoblab, uni chaqirgan
        kodga <strong>qaytaradi</strong> — shu qiymatni o'zgaruvchiga saqlash, boshqa funksiyaga
        berish yoki hisob-kitobda ishlatish mumkin bo'ladi:
      </p>
      <CodeBlock lang="python">{`def kvadrat_chop(son):
    print(son * son)  # faqat chiqaradi, qiymat qaytarmaydi

def kvadrat_qaytar(son):
    return son * son  # qiymatni qaytaradi

kvadrat_chop(4)              # 16 — ekranga chiqadi, lekin saqlab bo'lmaydi
natija = kvadrat_qaytar(4)   # natija 16ga teng bo'ladi
print(natija + 1)            # 17 — qaytarilgan qiymat bilan ishlash mumkin`}</CodeBlock>
      <Callout type="tip" title="return — nima uchun muhim">
        <code>return</code>li funksiya ko'proq qayta ishlatiladigan (reusable) bo'ladi: uning
        natijasini keyingi hisob-kitoblarda, boshqa funksiyalarda yoki shartlarda erkin ishlatish
        mumkin. <code>print()</code> esa faqat ekranga chiqarish uchun — natija dastur ichida
        "yo'qoladi".
      </Callout>
      <p>
        <code>return</code>ga yetgan zahoti funksiya ishlashni to'xtatadi — undan keyingi kod
        bajarilmaydi:
      </p>
      <CodeBlock lang="python">{`def tekshir(son):
    if son > 0:
        return "musbat"
    return "musbat emas"

print(tekshir(5))   # musbat
print(tekshir(-3))  # musbat emas`}</CodeBlock>

      <Quiz
        question="Funksiya ichida qiymatni chaqirgan kodga qaytarish uchun qaysi kalit so'z ishlatiladi?"
        options={['print', 'return', 'yield', 'output']}
        correctIndex={1}
        explanation="return funksiya hisoblagan qiymatni chaqirgan joyga qaytaradi, u yerda o'zgaruvchiga saqlash yoki qayta ishlatish mumkin bo'ladi."
      />

      <Exercise title="Mashq">
        <p>
          <code>kub(son)</code> nomli funksiya yozing — u parametr sifatida bitta son qabul qilib,
          uning kubini (<code>son * son * son</code>) <code>return</code> orqali qaytarsin.
          Funksiyani <code>3</code> bilan chaqirib, natijani o'zgaruvchiga saqlang va uni
          f-string yordamida chop eting.
        </p>
        <Solution>
          <CodeBlock lang="python">{`def kub(son):
    return son * son * son

natija = kub(3)
print(f"3ning kubi: {natija}")  # 3ning kubi: 27`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Funksiya bir xil kodni takrorlashning oldini oladi va kodni o'qishni osonlashtiradi
          (reuse va readability).
        </li>
        <li>
          Funksiya <code>def nomi(parametrlar):</code> bilan yaratiladi va{' '}
          <code>nomi(argumentlar)</code> orqali chaqiriladi — yaratish uni ishga tushirmaydi.
        </li>
        <li>Funksiya hech qanday parametrsiz yoki bir nechta parametr bilan yozilishi mumkin.</li>
        <li>
          <code>print()</code> natijani faqat ekranga chiqaradi, <code>return</code> esa natijani
          chaqirgan kodga qaytarib, uni qayta ishlatish imkonini beradi.
        </li>
        <li>
          <code>return</code>ga yetgan zahoti funksiya ishlashni to'xtatadi.
        </li>
      </KeyPoints>
    </>
  )
}
