import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Ro'yxat metodlari",
  section: "Satrlar va ma'lumotlar tuzilmalari",
}

export default function ListMethodsLesson() {
  return (
    <>
      <p>
        10-darsda ro'yxat yaratish, indekslash va elementni indeks orqali almashtirishni
        o'rgandik. Bu darsda ro'yxatni <strong>o'zgartiradigan (mutate qiladigan)</strong> tayyor
        metodlar bilan tanishamiz — element qo'shish, o'chirish, tartiblash va tekshirish.
      </p>

      <h2>
        <code>.append()</code> — oxiriga element qo'shish
      </h2>
      <p>Ro'yxat oxiriga yangi element qo'shadi:</p>
      <CodeBlock lang="python">{`mevalar = ["olma", "nok"]
print(mevalar)  # ['olma', 'nok']  — oldin

mevalar.append("uzum")
print(mevalar)  # ['olma', 'nok', 'uzum']  — keyin`}</CodeBlock>

      <h2>
        <code>.insert()</code> — ma'lum joyga element qo'shish
      </h2>
      <p>
        <code>.append()</code>dan farqli, <code>.insert(indeks, qiymat)</code> elementni
        ro'yxatning istalgan joyiga qo'shish imkonini beradi:
      </p>
      <CodeBlock lang="python">{`mevalar = ["olma", "nok", "uzum"]
print(mevalar)  # ['olma', 'nok', 'uzum']  — oldin

mevalar.insert(1, "gilos")
print(mevalar)  # ['olma', 'gilos', 'nok', 'uzum']  — keyin, 1-indeksga qo'shildi`}</CodeBlock>

      <h2>
        <code>.remove()</code> — qiymat bo'yicha o'chirish
      </h2>
      <p>
        Ro'yxatdan ko'rsatilgan qiymatga ega <strong>birinchi</strong> elementni o'chiradi
        (indeks emas, qiymatning o'zi beriladi):
      </p>
      <CodeBlock lang="python">{`mevalar = ["olma", "nok", "uzum"]
print(mevalar)  # ['olma', 'nok', 'uzum']  — oldin

mevalar.remove("nok")
print(mevalar)  # ['olma', 'uzum']  — keyin`}</CodeBlock>
      <Callout type="warning" title="Mavjud bo'lmagan qiymat">
        Agar <code>.remove()</code>ga ro'yxatda yo'q qiymat berilsa, Python{' '}
        <code>ValueError</code> xatoligini beradi. Ishonchli bo'lish uchun oldin{' '}
        <code>in</code> orqali tekshirish mumkin (quyida ko'ramiz).
      </Callout>

      <h2>
        <code>.pop()</code> — indeks bo'yicha o'chirish va qiymatni qaytarish
      </h2>
      <p>
        Ko'rsatilgan indeksdagi elementni ro'yxatdan olib tashlaydi <strong>va uni
        qaytaradi</strong> — bu boshqa metodlardan farqi. Indeks berilmasa, oxirgi elementni
        oladi:
      </p>
      <CodeBlock lang="python">{`mevalar = ["olma", "nok", "uzum"]
print(mevalar)  # ['olma', 'nok', 'uzum']  — oldin

olingan = mevalar.pop(0)
print(olingan)  # olma — o'chirilgan qiymat
print(mevalar)  # ['nok', 'uzum']  — keyin`}</CodeBlock>

      <Quiz
        question={
          'mevalar = ["olma", "nok", "uzum"]  bo\'lgach mevalar.pop()  chaqirilsa (indekssiz), qaysi element o\'chiriladi?'
        }
        options={['olma (birinchi)', 'uzum (oxirgi)', "hech qaysi biri, xato bo'ladi", "nok (o'rtadagi)"]}
        correctIndex={1}
        explanation="Indeks ko'rsatilmasa, .pop() ro'yxatning oxirgi elementini o'chirib, uni qaytaradi."
      />

      <h2>
        <code>.sort()</code> va <code>.reverse()</code>
      </h2>
      <p>
        <code>.sort()</code> ro'yxatni <strong>o'z ichida (in place)</strong> tartiblaydi — ya'ni
        asl ro'yxatning o'zi o'zgaradi, yangi ro'yxat qaytarilmaydi:
      </p>
      <CodeBlock lang="python">{`sonlar = [5, 2, 8, 1]
print(sonlar)  # [5, 2, 8, 1]  — oldin

sonlar.sort()
print(sonlar)  # [1, 2, 5, 8]  — keyin`}</CodeBlock>
      <p>
        <code>.reverse()</code> esa ro'yxat elementlarining tartibini teskarisiga o'giradi (bu
        tartiblash emas, shunchaki joylashuvni teskari qiladi):
      </p>
      <CodeBlock lang="python">{`sonlar = [1, 2, 5, 8]
sonlar.reverse()
print(sonlar)  # [8, 5, 2, 1]`}</CodeBlock>
      <Callout type="note" title="sorted() ham mavjud">
        Agar asl ro'yxatni o'zgartirmasdan, tartiblangan <strong>yangi</strong> ro'yxat kerak
        bo'lsa, <code>sorted(ro'yxat)</code> funksiyasidan foydalanish mumkin — u asl ro'yxatga
        tegmaydi. Bu darsda biz asosan o'z ichida ishlaydigan <code>.sort()</code>ga e'tibor
        qaratamiz.
      </Callout>

      <h2>
        Mavjudlikni tekshirish: <code>in</code>
      </h2>
      <p>
        Ro'yxatda ma'lum qiymat bor-yo'qligini tekshirish uchun <code>in</code> operatoridan
        foydalaniladi — natija <code>True</code> yoki <code>False</code> bo'lgan{' '}
        <code>bool</code> qiymat:
      </p>
      <CodeBlock lang="python">{`mevalar = ["olma", "nok", "uzum"]
print("olma" in mevalar)     # True
print("shaftoli" in mevalar) # False`}</CodeBlock>
      <p>
        Bu, masalan, <code>.remove()</code>ni xavfsiz chaqirish yoki <code>if</code> shartida
        ishlatish uchun juda foydali:
      </p>
      <CodeBlock lang="python">{`mevalar = ["olma", "nok"]
if "nok" in mevalar:
    mevalar.remove("nok")
    print("Nok o'chirildi")`}</CodeBlock>

      <Exercise title="Mashq">
        <p>
          <code>{`vazifalar = ["non olish", "kitob o'qish"]`}</code> ro'yxati berilgan. Quyidagilarni
          bajaring:
        </p>
        <ul>
          <li>
            <code>"sport zali"</code>ni ro'yxat oxiriga qo'shing.
          </li>
          <li>
            <code>"non olish"</code> ro'yxatda bor-yo'qligini <code>in</code> orqali tekshirib,
            agar bor bo'lsa, uni o'chiring.
          </li>
          <li>Natijaviy ro'yxatni tartiblab (alifbo bo'yicha) chop eting.</li>
        </ul>
        <Solution>
          <CodeBlock lang="python">{`vazifalar = ["non olish", "kitob o'qish"]

vazifalar.append("sport zali")
print(vazifalar)  # ['non olish', "kitob o'qish", 'sport zali']

if "non olish" in vazifalar:
    vazifalar.remove("non olish")

vazifalar.sort()
print(vazifalar)  # ["kitob o'qish", 'sport zali']`}</CodeBlock>
        </Solution>
      </Exercise>

      <Quiz
        question="Quyidagi metodlardan qaysi biri ro'yxatdan elementni o'chirib, o'sha elementning qiymatini qaytaradi?"
        options={['.remove()', '.append()', '.pop()', '.sort()']}
        correctIndex={2}
        explanation=".pop() indeks bo'yicha elementni o'chiradi va o'chirilgan qiymatni qaytaradi; .remove() esa hech narsa qaytarmaydi (None)."
      />

      <KeyPoints>
        <li>
          <code>.append(qiymat)</code> ro'yxat oxiriga qo'shadi,{' '}
          <code>.insert(indeks, qiymat)</code> ko'rsatilgan joyga qo'shadi.
        </li>
        <li>
          <code>.remove(qiymat)</code> qiymat bo'yicha birinchi mos elementni o'chiradi;{' '}
          <code>.pop(indeks)</code> indeks bo'yicha o'chiradi va o'chirilgan qiymatni qaytaradi.
        </li>
        <li>
          <code>.sort()</code> ro'yxatni o'z ichida (in place) tartiblaydi,{' '}
          <code>.reverse()</code> tartibini teskari qiladi; asl ro'yxatga tegmasdan tartiblangan
          nusxa kerak bo'lsa, <code>sorted()</code> ishlatiladi.
        </li>
        <li>
          <code>qiymat in ro'yxat</code> qiymat mavjudligini <code>True</code>/<code>False</code>{' '}
          shaklida tekshiradi.
        </li>
      </KeyPoints>
    </>
  )
}
