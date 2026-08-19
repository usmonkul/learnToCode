import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import Figure from '@/components/content/Figure'
import KeyPoints from '@/components/content/KeyPoints'
import listIndexing from '@/assets/list-indexing.svg'

export const meta = {
  title: "Ro'yxatlar (Lists) asoslari",
  section: "Satrlar va ma'lumotlar tuzilmalari",
}

export default function ListsLesson() {
  return (
    <>
      <p>
        Hozirgacha har bir o'zgaruvchida bitta qiymat saqlab keldik. Lekin ko'pincha bir nechta
        qiymatni birgalikda saqlash kerak bo'ladi — masalan, do'kondagi barcha mevalar ro'yxati
        yoki sinfdagi barcha o'quvchilarning ismlari. Buning uchun Python'da{' '}
        <strong>ro'yxat (list)</strong> ma'lumot tuzilmasi (data structure) ishlatiladi.
      </p>

      <h2>Ro'yxat yaratish</h2>
      <p>
        Ro'yxat kvadrat qavslar <code>[]</code> ichida, elementlar orasiga vergul qo'yib
        yaratiladi:
      </p>
      <CodeBlock lang="python">{`mevalar = ["olma", "nok", "uzum", "gilos", "anor"]
print(mevalar)  # ['olma', 'nok', 'uzum', 'gilos', 'anor']`}</CodeBlock>
      <p>
        Ro'yxat turli xil turlardagi qiymatlarni ham saqlashi mumkin, lekin tushunarlilik uchun
        odatda bir xil turdagi qiymatlarni (masalan, faqat matnlarni yoki faqat sonlarni)
        birgalikda saqlash tavsiya etiladi — biz ham shu uslubda davom etamiz.
      </p>

      <h2>Indekslash va kesish — xuddi satrlardagi kabi</h2>
      <p>
        9-darsda satrlarni indekslash va kesishni o'rgangan edik. Ro'yxatlar ham{' '}
        <strong>xuddi satrlardagi kabi</strong> ishlaydi — indeks 0'dan boshlanadi, manfiy
        indekslar oxiridan hisoblaydi:
      </p>
      <CodeBlock lang="python">{`mevalar = ["olma", "nok", "uzum", "gilos", "anor"]
print(mevalar[0])   # olma — birinchi element
print(mevalar[2])   # uzum
print(mevalar[-1])  # anor — oxirgi element
print(mevalar[-2])  # gilos — oxiridan ikkinchi`}</CodeBlock>

      <Figure
        src={listIndexing}
        alt="Beshta meva nomidan iborat ro'yxat qutilarda ko'rsatilgan, har bir qutining ustida musbat indeks (0 dan 4 gacha), ostida esa manfiy indeks (-5 dan -1 gacha) yozilgan"
        caption="1-rasm: ro'yxat elementlarining musbat (yuqorida) va manfiy (pastda) indekslari"
      />

      <p>Kesish (slicing) ham xuddi satrlardagi kabi ishlaydi — bir qismini ajratib oladi:</p>
      <CodeBlock lang="python">{`mevalar = ["olma", "nok", "uzum", "gilos", "anor"]
print(mevalar[1:3])  # ['nok', 'uzum']
print(mevalar[:2])   # ['olma', 'nok']
print(mevalar[3:])   # ['gilos', 'anor']`}</CodeBlock>

      <Quiz
        question={
          'mevalar = ["olma", "nok", "uzum"]  bo\'lsa, mevalar[-1] nimani qaytaradi?'
        }
        options={['olma', 'nok', 'uzum', 'IndexError']}
        correctIndex={2}
        explanation="Manfiy indeks -1 ro'yxatning oxirgi elementini bildiradi — bu misolda 'uzum'."
      />

      <h2>O'zgaruvchanlik (mutability): ro'yxatlar bilan satrlarning asosiy farqi</h2>
      <p>
        Bu — ro'yxatlar haqidagi eng muhim tushuncha. Satrlar <strong>o'zgarmas (immutable)</strong>{' '}
        — bir marta yaratilgach, ularning alohida belgisini o'zgartirib bo'lmaydi:
      </p>
      <CodeBlock lang="python">{`soz = "salom"
soz[0] = "S"  # XATO — TypeError: 'str' object does not support item assignment`}</CodeBlock>
      <p>
        Ro'yxatlar esa <strong>o'zgaruvchan (mutable)</strong> — istalgan elementni indeksi
        orqali yangi qiymatga almashtirish mumkin:
      </p>
      <CodeBlock lang="python">{`mevalar = ["olma", "nok", "uzum"]
mevalar[0] = "shaftoli"
print(mevalar)  # ['shaftoli', 'nok', 'uzum']`}</CodeBlock>
      <Callout type="note" title="Nega bu muhim?">
        Satr o'zgartirilmoqchi bo'lsa, har doim <strong>yangi satr</strong> yaratiladi (masalan,{' '}
        <code>.replace()</code> natijasi). Ro'yxat esa xotiradagi o'sha joyning o'zida
        o'zgartiriladi — yangi ro'yxat yaratilmaydi. Bu farq keyingi darsda ro'yxat metodlarini
        o'rganganda yana ahamiyatli bo'ladi.
      </Callout>

      <h2>
        <code>len()</code> va ro'yxat bo'yicha aylanish
      </h2>
      <p>
        Ro'yxatdagi elementlar sonini <code>len()</code> bilan bilib olish mumkin — xuddi
        satrlardagi kabi:
      </p>
      <CodeBlock lang="python">{`mevalar = ["olma", "nok", "uzum", "gilos", "anor"]
print(len(mevalar))  # 5`}</CodeBlock>
      <p>
        Ro'yxatning har bir elementini birma-bir ko'rib chiqish uchun <code>for</code> sikli
        ishlatiladi:
      </p>
      <CodeBlock lang="python">{`mevalar = ["olma", "nok", "uzum"]
for meva in mevalar:
    print(meva)

# olma
# nok
# uzum`}</CodeBlock>
      <Callout type="tip" title="range(len(...)) shart emas">
        Ko'p yangi boshlovchilar <code>for i in range(len(mevalar)):</code> deb yozib, keyin{' '}
        <code>mevalar[i]</code>dan foydalanadi. Bu ishlaydi, lekin ortiqcha — Python'da elementga
        to'g'ridan-to'g'ri <code>for meva in mevalar:</code> orqali murojaat qilish tabiiyroq va
        o'qilishi osonroq.
      </Callout>

      <Exercise title="Mashq">
        <p>
          <code>{`sonlar = [10, 20, 30, 40, 50]`}</code> ro'yxati berilgan. Quyidagilarni bajaring:
        </p>
        <ul>
          <li>Ro'yxatning birinchi va oxirgi elementlarini chop eting.</li>
          <li>
            0-indeksdagi elementni <code>100</code> qiymatiga almashtiring va yangi ro'yxatni
            chop eting.
          </li>
          <li>
            <code>for</code> sikli yordamida barcha elementlarni birma-bir chop eting.
          </li>
        </ul>
        <Solution>
          <CodeBlock lang="python">{`sonlar = [10, 20, 30, 40, 50]

print(sonlar[0])   # 10
print(sonlar[-1])  # 50

sonlar[0] = 100
print(sonlar)  # [100, 20, 30, 40, 50]

for son in sonlar:
    print(son)`}</CodeBlock>
        </Solution>
      </Exercise>

      <Quiz
        question="Satr va ro'yxat orasidagi asosiy farq nimada?"
        options={[
          "Satrlar faqat sonlarni saqlaydi, ro'yxatlar esa matnlarni",
          "Ro'yxatlar o'zgaruvchan (mutable), satrlar esa o'zgarmas (immutable)",
          "Satrlarda indekslash yo'q, ro'yxatlarda bor",
          "Ro'yxatlarni len() bilan o'lchab bo'lmaydi",
        ]}
        correctIndex={1}
        explanation="Ro'yxat elementlarini indeks orqali qayta yozish mumkin (mutable), satrning alohida belgisini esa o'zgartirib bo'lmaydi (immutable)."
      />

      <KeyPoints>
        <li>
          Ro'yxat <code>[]</code> ichida, vergul bilan ajratilgan elementlardan yaratiladi:{' '}
          <code>["olma", "nok"]</code>.
        </li>
        <li>
          Indekslash va kesish satrlardagi kabi ishlaydi: <code>mevalar[0]</code>,{' '}
          <code>mevalar[-1]</code>, <code>mevalar[1:3]</code>.
        </li>
        <li>
          Ro'yxatlar o'zgaruvchan (mutable) — element indeks orqali qayta yoziladi:{' '}
          <code>mevalar[0] = "yangi"</code>. Satrlar esa o'zgarmas (immutable) — bu ikkisi
          orasidagi asosiy farq.
        </li>
        <li>
          <code>len(mevalar)</code> elementlar sonini beradi;{' '}
          <code>for element in mevalar:</code> har bir elementni birma-bir ko'rib chiqadi.
        </li>
      </KeyPoints>
    </>
  )
}
