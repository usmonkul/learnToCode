import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Sikllarni boshqarish: break, continue, else',
  section: 'Boshqaruv tuzilmalari',
}

export default function LoopControlLesson() {
  return (
    <>
      <p>
        O'tgan darsda <code>for</code> va <code>while</code> sikllarini o'rgandik — ular
        ketma-ketlik bo'ylab yoki shart rost bo'lguncha avtomatik takrorlanadi. Ba'zan esa
        siklning odatiy oqimini o'zimiz qo'lda o'zgartirishimiz kerak bo'ladi: uni muddatidan
        oldin to'xtatish yoki bitta qadamni o'tkazib yuborish. Buning uchun{' '}
        <code>break</code> va <code>continue</code> kalit so'zlari ishlatiladi.
      </p>

      <h2>
        <code>break</code> — sikldan chiqish (exit)
      </h2>
      <p>
        <code>break</code> siklni darhol to'xtatadi — qolgan barcha elementlar tekshirilmasdan
        sikldan chiqib ketiladi. Odatda biror narsani qidirib, uni topgach davom etishning
        hojati bo'lmaganda ishlatiladi:
      </p>
      <CodeBlock lang="python">{`for son in [3, 7, 12, 9, 5]:
    if son == 12:
        print("Topildi:", son)
        break
    print("Tekshirilyapti:", son)`}</CodeBlock>
      <p>
        Natija:
      </p>
      <CodeBlock lang="python">{`Tekshirilyapti: 3
Tekshirilyapti: 7
Topildi: 12`}</CodeBlock>
      <p>
        E'tibor bering — <code>9</code> va <code>5</code> umuman tekshirilmadi, chunki{' '}
        <code>12</code> topilgan zahoti <code>break</code> butun siklni to'xtatdi.
      </p>

      <h2>
        <code>continue</code> — keyingi qadamga o'tish (skip)
      </h2>
      <p>
        <code>continue</code> siklni to'xtatmaydi — u faqat joriy qadamning qolgan qismini
        o'tkazib yuborib, keyingi elementga o'tadi:
      </p>
      <CodeBlock lang="python">{`for son in range(1, 6):
    if son % 2 == 0:
        continue
    print(son)`}</CodeBlock>
      <CodeBlock lang="python">{`1
3
5`}</CodeBlock>
      <p>
        Bu yerda juft sonlarga yetganda <code>continue</code> ishga tushadi va{' '}
        <code>print(son)</code> qatoriga yetmasdan keyingi songa o'tiladi — sikl davom etadi,
        faqat o'sha bitta qadam "o'tkazib yuboriladi".
      </p>
      <Callout type="note" title="break vs continue">
        <code>break</code> — siklni butunlay tugatadi. <code>continue</code> — faqat joriy
        qadamni tugatadi va siklni davom ettiradi. Ikkalasi ham odatda <code>if</code> sharti
        ichida ishlatiladi.
      </Callout>

      <Quiz
        question="continue kalit so'zi ishlatilganda nima sodir bo'ladi?"
        options={[
          'Butun sikl to\'xtaydi',
          'Joriy qadam o\'tkazib yuborilib, sikl keyingi elementga o\'tadi',
          'Dastur xato beradi',
          'Sikl boshidan qayta boshlanadi'
        ]}
        correctIndex={1}
        explanation="continue faqat joriy iteratsiyaning qolgan qismini o'tkazib yuboradi va siklni keyingi element bilan davom ettiradi — sikl to'xtamaydi."
      />

      <h2>
        <code>for...else</code> — sikl to'liq tugaganda
      </h2>
      <p>
        Kamdan-kam ishlatiladigan, ammo bilib qo'yish kerak bo'lgan xususiyat: <code>for</code>{' '}
        (va <code>while</code>) siklidan keyin <code>else</code> bloki yozish mumkin. Bu bloq{' '}
        <strong>faqat</strong> sikl <code>break</code>siz to'liq yakunlansa bajariladi — agar
        sikl <code>break</code> orqali to'xtatilgan bo'lsa, <code>else</code> o'tkazib
        yuboriladi:
      </p>
      <CodeBlock lang="python">{`for son in [3, 7, 9]:
    if son == 12:
        print("Topildi")
        break
else:
    print("12 topilmadi — sikl to'liq tugadi")
# natija: 12 topilmadi — sikl to'liq tugadi`}</CodeBlock>
      <Callout type="tip" title="Amaliyotda qanchalik kerak?">
        <code>for...else</code> Python'ga xos, boshqa ko'p tillarda umuman uchramaydigan
        xususiyat. Amaliyotda kamdan-kam ishlatiladi — ko'pchilik dasturchi buning o'rniga
        alohida bayroq (flag) o'zgaruvchi ishlatishni afzal ko'radi. Shunga qaramay, tayyor
        kodda uchrab qolishi mumkin, shuning uchun nima ekanligini bilish foydali.
      </Callout>

      <Exercise title="Mashq">
        <p>
          <code>for son in [4, 8, 15, 16, 23, 42]:</code> sikli yordamida ro'yxatdagi sonlarni
          birma-bir tekshiring. Agar son <code>15</code>ga teng bo'lsa, "15 topildi!" chop etib{' '}
          <code>break</code> bilan sikldan chiqing. Qolgan sonlar uchun (agar son juft bo'lsa){' '}
          <code>continue</code> bilan o'tkazib yuboring, toq sonlarni esa chop eting.
        </p>
        <Solution>
          <CodeBlock lang="python">{`for son in [4, 8, 15, 16, 23, 42]:
    if son == 15:
        print("15 topildi!")
        break
    if son % 2 == 0:
        continue
    print(son)
# natija: 15 topildi!
# (4 va 8 juft bo'lgani uchun o'tkazib yuboriladi, 15ga yetganda esa sikl to'xtaydi)`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>break</code> siklni darhol to'xtatadi — qolgan elementlar tekshirilmaydi.
        </li>
        <li>
          <code>continue</code> faqat joriy qadamni o'tkazib yuboradi, sikl davom etadi.
        </li>
        <li>
          <code>for...else</code>dagi <code>else</code> bloki faqat sikl <code>break</code>siz
          to'liq tugagandagina bajariladi — bu kamdan-kam ishlatiladigan xususiyat.
        </li>
      </KeyPoints>
    </>
  )
}
