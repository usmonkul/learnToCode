import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Vazifalarni foydalanuvchiga bog'lash",
  section: "5-bo'lim: Autentifikatsiya",
}

export default function Lesson18VazifalarniFoydalanuvchigaBoglash() {
  return (
    <>
      <p>
        Endi ilovamizda kirish va chiqish ishlayapti, lekin bitta muammo bor: <code>tasks</code> jadvalidagi qatorlar hech kimga tegishli emas. Har qanday foydalanuvchi kirsa ham, u hali ham <strong>hamma</strong>ning vazifalarini ko'radi — chunki jadvalda "bu vazifa kimniki" degan ma'lumot umuman yo'q. Bu darsda shu bog'lanishni qo'shamiz, keyingi darsda esa RLS policy'larini shu bog'lanishdan foydalanadigan qilib qattiqlashtiramiz.
      </p>

      <h2>user_id ustunini qo'shish</h2>
      <p>
        SQL Editor'ga o'tib, <code>tasks</code> jadvaliga yangi ustun qo'shamiz:
      </p>
      <CodeBlock lang="sql">{`alter table tasks
  add column user_id uuid not null references auth.users default auth.uid();`}</CodeBlock>
      <p>
        Bu bitta qatorda uch narsa aytilgan:
      </p>
      <ul>
        <li>
          <code>uuid</code> — chunki Supabase'dagi <code>auth.users</code> jadvalining <code>id</code>si UUID formatida (masalan, <code>3fa85f64-5717-4562-b3fc-2c963f66afa6</code>).
        </li>
        <li>
          <code>references auth.users</code> — bu <strong>foreign key</strong> cheklovi: <code>user_id</code>ga faqat haqiqatan mavjud bo'lgan foydalanuvchining id'sini yozish mumkin, boshqa qiymat bazani xato beradi.
        </li>
        <li>
          <code>default auth.uid()</code> — bu ustunning eng muhim qismi, va u haqida alohida to'xtalib o'tamiz.
        </li>
      </ul>

      <h2>auth.uid() nima va nega u sehrga o'xshaydi?</h2>
      <p>
        <code>auth.uid()</code> — bu Supabase'ning Postgres ichiga qo'shib qo'ygan maxsus funksiyasi. U hozirgi so'rovni yuborgan foydalanuvchining id'sini qaytaradi — bu ma'lumotni Postgres so'rov bilan birga kelgan JWT tokendan (16-darsda gaplashgan sessiya tokenidan) o'qiydi. Agar so'rov autentifikatsiya qilinmagan (anonim) foydalanuvchidan kelsa, <code>auth.uid()</code> <code>null</code> qaytaradi.
      </p>
      <p>
        Ustunga <code>default auth.uid()</code> deb belgilash — "agar insert paytida <code>user_id</code> qiymati berilmasa, uni avtomatik ravishda hozirgi so'rovni yuborgan foydalanuvchining id'siga teng qil" degani. Bu Postgres darajasida, so'rov bazaga yetib borgan zahoti ishlaydi.
      </p>

      <Callout type="tip" title="Nega frontend kodini o'zgartirish shart emas?">
        Eslab qoling — <code>TaskForm.jsx</code>dagi insert kodi hech qachon <code>user_id</code>ni o'z ichiga olmagan:
        <CodeBlock lang="jsx">{`const { data, error } = await supabase
  .from('tasks')
  .insert({ title })
  .select()
  .single()`}</CodeBlock>
        Va shunday bo'lib qoladi ham — biz bu kodga umuman tegmaymiz. Chunki <code>user_id</code> ustuni Postgres darajasida <code>default auth.uid()</code>ga ega, baza o'zi <code>{'{ title }'}</code>ni qabul qilib, qatorni saqlashdan oldin bo'sh qolgan <code>user_id</code>ni avtomatik to'ldiradi. Frontend kodi bu haqda umuman "bilishi" shart emas — vazifa to'liq baza tomonida hal qilinadi.
      </Callout>

      <p>
        Bu — kuchli dizayn qarori, chunki u ikkita muammoning oldini oladi. Birinchidan, frontend kodini soddaligicha qoldiradi: har bir joyda <code>insert</code> chaqirganda <code>user_id: session.user.id</code> deb qo'shib yurishga hojat qolmaydi. Ikkinchidan — va bu muhimroq — <strong>xavfsizlik</strong>ni kuchaytiradi: agar <code>user_id</code>ni frontend'dan yuborish talab qilinganda, nazariy jihatdan kimdir brauzer konsolidan boshqa foydalanuvchining id'sini qo'lda yuborib, o'sha odam nomidan vazifa yaratishga urinishi mumkin edi. <code>default auth.uid()</code> bilan bu imkoniyat butunlay yo'qoladi — qiymat faqat server tomonda, joriy sessiyadan olinadi, frontend uni hech qachon "tanlay" olmaydi.
      </p>

      <Callout type="warning" title="not null — mavjud qatorlar bilan ehtiyot bo'ling">
        Ustun <code>not null</code> qilib qo'shilmoqda. Agar jadvalda allaqachon qatorlar bo'lsa (masalan, avvalgi darslarda RLS'ni sinash uchun qo'shgan test ma'lumotlar), bu buyruq xato beradi — chunki mavjud qatorlarda <code>user_id</code> uchun qiymat yo'q va default faqat <strong>yangi</strong> insert'larga ta'sir qiladi, mavjud qatorlarni orqaga qaytib to'ldirmaydi. O'quv loyihasida eng oddiy yechim — sinov uchun qo'shilgan eski qatorlarni <code>delete from tasks;</code> bilan tozalab, keyin ustunni qo'shish.
      </Callout>

      <Quiz
        question="user_id ustuniga default auth.uid() belgilanganidan keyin TaskForm.jsx dagi insert({ title }) chaqiruvini o'zgartirish kerakmi?"
        options={[
          "Ha, insert({ title, user_id: session.user.id }) deb yozish kerak",
          "Yo'q, chunki Postgres user_id qiymatini bazaning o'zida, joriy sessiyadan avtomatik to'ldiradi",
          "Ha, lekin faqat AuthForm.jsx orqali kirgan foydalanuvchilar uchun",
          "Yo'q, lekin buning o'rniga TaskList.jsx ni o'zgartirish kerak",
        ]}
        correctIndex={1}
        explanation="default auth.uid() ustunga qiymat berilmaganda uni avtomatik joriy foydalanuvchining id'siga tenglashtiradi. Bu Postgres darajasida ishlagani uchun TaskForm.jsx dagi insert({ title }) chaqiruvi o'zgarishsiz qoladi va baribir to'g'ri ishlaydi."
      />

      <h2>Natijani Table Editor'da tekshirish</h2>
      <p>
        Ustunni qo'shgandan so'ng, ilovaga kirib (sign in qilib) bir nechta yangi vazifa qo'shing. So'ng Supabase Dashboard'ning <strong>Table Editor</strong> bo'limida <code>tasks</code> jadvalini oching — yangi qo'shilgan qatorlarning <code>user_id</code> ustunida hozirgi kirgan foydalanuvchingizning UUID'i avtomatik yozilganini ko'rasiz. Buni <strong>Authentication → Users</strong> bo'limidagi id bilan solishtirib, ular bir xilligiga ishonch hosil qiling.
      </p>
      <p>
        Agar ilovaga kirmasdan turib (session yo'q holatda) vazifa qo'shishga urinsangiz, <code>auth.uid()</code> <code>null</code> qaytaradi va <code>not null</code> cheklovi tufayli insert xato bilan qaytadi. Bu — kutilgan xatti-harakat: autentifikatsiyalanmagan foydalanuvchi umuman vazifa yarata olmasligi kerak, va bu darsda hali RLS'ni qattiqlashtirmagan bo'lsak ham, <code>not null</code> cheklovi allaqachon bir darajada himoya beryapti.
      </p>

      <Exercise title="Amaliy mashq: user_id ustunini qo'shish va tekshirish">
        <p>
          SQL Editor'da yuqoridagi <code>alter table</code> buyrug'ini ishga tushiring (agar jadvalda eski test qatorlar bo'lsa, avval ularni <code>delete from tasks;</code> bilan tozalang). So'ng ilovaga kirib, yangi vazifa qo'shing va Table Editor'da <code>user_id</code> ustuni to'g'ri to'ldirilganini tekshiring.
        </p>
        <Solution>
          <CodeBlock lang="sql">{`-- agar kerak bo'lsa, avval eski test qatorlarni tozalang:
delete from tasks;

-- ustunni qo'shish:
alter table tasks
  add column user_id uuid not null references auth.users default auth.uid();`}</CodeBlock>
          <p>
            Ilovada yangi vazifa qo'shgandan so'ng, Table Editor'dagi <code>tasks</code> jadvalida shu qatorning <code>user_id</code> ustuni bo'sh emasligini va u hozirgi kirgan foydalanuvchining id'siga teng ekanligini ko'rasiz — buni frontend kodiga hech qanday o'zgartirish kiritmasdan oldik.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>tasks</code> jadvaliga <code>user_id uuid not null references auth.users default auth.uid()</code> ustuni qo'shildi.
        </li>
        <li>
          <code>auth.uid()</code> — hozirgi so'rovni yuborgan foydalanuvchining id'sini JWT tokendan o'qib qaytaradigan Postgres funksiyasi.
        </li>
        <li>
          <code>default auth.uid()</code> tufayli <code>user_id</code> qiymati baza tomonida avtomatik to'ldiriladi — frontend kodida hech qanday o'zgarish talab qilinmaydi.
        </li>
        <li>
          Bu yondashuv shunchaki qulaylik emas — <code>user_id</code>ni frontend'dan yuborishga majburlashdan ko'ra xavfsizroq, chunki qiymatni faqat server, joriy sessiyadan belgilaydi.
        </li>
        <li>
          <code>not null</code> cheklovi mavjud qatorlarda muammo tug'dirishi mumkin — ustun qo'shishdan oldin test ma'lumotlarni tozalash tavsiya etiladi.
        </li>
      </KeyPoints>
    </>
  )
}
