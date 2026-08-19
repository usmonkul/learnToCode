import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Standart va nomlangan argumentlar',
  section: 'Funksiyalar',
}

export default function DefaultArgsLesson() {
  return (
    <>
      <p>
        Oldingi darsda funksiyaga parametr orqali qiymat berishni ko'rdik. Lekin ba'zida
        parametrning ko'pincha bir xil qiymati bo'ladi va har safar uni qo'lda yozish
        noqulay. Bu darsda <strong>standart qiymatlar (default values)</strong> va{' '}
        <strong>nomlangan argumentlar (keyword arguments)</strong> bilan tanishamiz — ular
        funksiya chaqiruvini qisqaroq va aniqroq qiladi.
      </p>

      <h2>Standart parametr qiymatlari</h2>
      <p>
        Parametrga <code>=</code> orqali standart qiymat berish mumkin. Agar funksiya
        chaqirilganda o'sha argument berilmasa, standart qiymat ishlatiladi:
      </p>
      <CodeBlock lang="python">{`def salomla(ism="Do'st"):
    print(f"Salom, {ism}!")

salomla("Aziz")  # Salom, Aziz!
salomla()        # Salom, Do'st! — argument berilmadi, standart qiymat ishlatildi`}</CodeBlock>
      <p>
        Bu foydali: funksiyani chaqirganda argumentni berish ixtiyoriy bo'ladi, lekin bersangiz —
        standart qiymat o'rniga o'sha qiymat ishlatiladi.
      </p>
      <CodeBlock lang="python">{`def daraja_hisobla(son, daraja=2):
    return son ** daraja

print(daraja_hisobla(5))     # 25 — daraja berilmadi, standart 2 ishlatildi
print(daraja_hisobla(5, 3))  # 125 — daraja 3 berildi`}</CodeBlock>

      <h2>Nomlangan argumentlar (keyword arguments)</h2>
      <p>
        Funksiyani chaqirganda argumentlarni pozitsiyasi (tartibi) bo'yicha emas, balki{' '}
        <code>parametr_nomi=qiymat</code> shaklida, ya'ni <strong>nomi bilan</strong> berish
        mumkin:
      </p>
      <CodeBlock lang="python">{`def profil(ism, yosh, shahar):
    print(f"{ism}, {yosh} yosh, {shahar}dan.")

profil(ism="Aziz", yosh=25, shahar="Toshkent")
profil(shahar="Samarqand", ism="Vali", yosh=30)  # tartib muhim emas!`}</CodeBlock>
      <p>
        Ikkala chaqiruv ham bir xil natija beradi — nomlangan argumentlarda tartib muhim emas,
        chunki Python har bir qiymatni nomi bo'yicha to'g'ri parametrga bog'laydi. Bu ayniqsa
        parametrlari ko'p funksiyalarda foydali: kod o'qiganda har bir qiymat nimaga tegishli
        ekani darhol ko'rinib turadi, pozitsiyaga qarab taxmin qilishga hojat qolmaydi.
      </p>
      <CodeBlock lang="python">{`# Qaysi qiymat nimaga tegishli — darhol tushunarli emas:
profil("Aziz", 25, "Toshkent")

# Nomlangan argumentlar bilan — har bir qiymat aniq:
profil(ism="Aziz", yosh=25, shahar="Toshkent")`}</CodeBlock>

      <h2>Pozitsion va nomlangan argumentlarni aralashtirish</h2>
      <p>
        Bitta chaqiruvda pozitsion (tartib bo'yicha) va nomlangan argumentlarni birga ishlatish
        mumkin, lekin qat'iy qoida bor: <strong>pozitsion argumentlar birinchi kelishi kerak</strong>,
        nomlangan argumentlar esa ulardan keyin:
      </p>
      <CodeBlock lang="python">{`def profil(ism, yosh, shahar):
    print(f"{ism}, {yosh} yosh, {shahar}dan.")

profil("Aziz", yosh=25, shahar="Toshkent")  # to'g'ri — pozitsion birinchi
profil("Aziz", shahar="Toshkent", yosh=25)  # to'g'ri — nomlanganlar tartibsiz bo'lishi mumkin`}</CodeBlock>
      <Callout type="warning" title="Xato: pozitsion argument nomlangandan keyin kelsa">
        <code>{`profil(ism="Aziz", 25, "Toshkent")`}</code> kabi kod xatolik beradi — Python
        pozitsion argumentni nomlangan argumentdan keyin qabul qilmaydi. Qoida oddiy: avval
        barcha pozitsion argumentlarni yozing, keyin nomlanganlarini.
      </Callout>

      <Quiz
        question="Quyidagi funksiya chaqiruvlaridan qaysi biri XATOLIK beradi?"
        options={[
          'profil("Aziz", yosh=25, shahar="Toshkent")',
          'profil(ism="Aziz", yosh=25, shahar="Toshkent")',
          'profil(yosh=25, ism="Aziz", shahar="Toshkent")',
          'profil(ism="Aziz", 25, "Toshkent")',
        ]}
        correctIndex={3}
        explanation="Pozitsion argument nomlangan argumentdan keyin kela olmaydi — avval barcha pozitsion argumentlar, keyin nomlanganlari yozilishi kerak."
      />

      <Exercise title="Mashq">
        <p>
          <code>buyurtma(mahsulot, miqdor=1, chegirma=0)</code> nomli funksiya yozing — u
          mahsulot nomini, miqdorini (standart qiymati <code>1</code>) va chegirma foizini
          (standart qiymati <code>0</code>) qabul qilib, quyidagi shaklda xabar chop etsin:{' '}
          <code>"2 dona non, 10% chegirma bilan"</code>. Funksiyani uch xil usulda chaqiring:
          faqat mahsulot nomi bilan, mahsulot va miqdor bilan, va barcha uchta argumentni
          nomlangan holda berib.
        </p>
        <Solution>
          <CodeBlock lang="python">{`def buyurtma(mahsulot, miqdor=1, chegirma=0):
    print(f"{miqdor} dona {mahsulot}, {chegirma}% chegirma bilan")

buyurtma("non")                                   # 1 dona non, 0% chegirma bilan
buyurtma("non", 2)                                # 2 dona non, 0% chegirma bilan
buyurtma(mahsulot="non", miqdor=2, chegirma=10)   # 2 dona non, 10% chegirma bilan`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Parametrga <code>parametr=qiymat</code> shaklida standart qiymat berish mumkin — argument
          berilmasa, o'sha qiymat ishlatiladi.
        </li>
        <li>
          Nomlangan argumentlar (<code>parametr_nomi=qiymat</code>) chaqiruvni aniqroq qiladi va
          tartibga bog'liq emas.
        </li>
        <li>
          Pozitsion va nomlangan argumentlarni aralashtirish mumkin, lekin pozitsion argumentlar
          har doim birinchi kelishi kerak.
        </li>
      </KeyPoints>
    </>
  )
}
