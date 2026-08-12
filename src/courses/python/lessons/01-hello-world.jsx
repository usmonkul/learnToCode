import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Salom, Dunyo!',
  section: 'Boshlash uchun',
}

export default function HelloWorldLesson() {
  return (
    <>
      <p>
        Python — o'rganish uchun ancha oson, ammo ayni paytda juda kuchli dasturlash tili
        (programming language) hisoblanadi. U veb-dasturlash, ma'lumotlar tahlili (data
        analysis), sun'iy intellekt (AI) va avtomatlashtirish kabi ko'plab sohalarda
        qo'llaniladi.
      </p>
      <p>
        Har qanday dasturlash tilini o'rganishni an'anaviy ravishda ekranga matn chiqarishdan
        boshlaymiz. Buning uchun Python'da <code>print()</code> funksiyasidan foydalanamiz:
      </p>
      <CodeBlock lang="python">{`print("Salom, Dunyo!")`}</CodeBlock>
      <p>
        Bu kodni ishga tushirganingizda, ekranda <code>Salom, Dunyo!</code> matni chiqadi.{' '}
        <code>print()</code> funksiyasi qavs ichidagi qiymatni konsolga (console) chiqaradi.
      </p>
      <Callout type="tip" title="Maslahat">
        Bir nechta qiymatni vergul bilan ajratib, bitta <code>print()</code> chaqiruvida
        chiqarishingiz mumkin: <code>print("Salom,", "Dunyo!")</code>
      </Callout>
      <p>Keling, yana bir misolga qaraymiz:</p>
      <CodeBlock lang="python">{`print("Python o'rganish qiziqarli!")
print("Bu ikkinchi qator.")`}</CodeBlock>
      <KeyPoints>
        <li>
          <code>print()</code> funksiyasi ekranga matn yoki qiymat chiqarish uchun ishlatiladi.
        </li>
        <li>Matnlar (string) qo'shtirnoq yoki bitta tirnoq ichida yoziladi.</li>
        <li>
          Har bir <code>print()</code> chaqiruvi natijani yangi qatordan boshlaydi.
        </li>
      </KeyPoints>
    </>
  )
}
