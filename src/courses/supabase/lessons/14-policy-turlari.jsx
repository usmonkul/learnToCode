import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Policy turlari: insert, update, delete",
  section: "4-bo'lim: Row Level Security",
}

export default function Lesson14PolicyTurlari() {
  return (
    <>
      <p>
        Oldingi darsda <code>tasks</code> jadvalida RLS'ni yoqdik va faqat o'qish (select) uchun
        policy yozdik. Lekin "Vazifalar boshqaruvchisi" ilovamiz allaqachon yangi vazifa qo'shish
        (insert), bajarilgan deb belgilash (update) va o'chirish (delete) imkoniyatlariga ega —
        va bularning hammasi hozir RLS tomonidan rad etilmoqda, chunki bu amaliyotlar uchun hali
        policy yo'q. Bu darsda qolgan uchta policy turini qo'shamiz.
      </p>

      <h2>Har bir amaliyot uchun alohida policy</h2>
      <p>
        RLS'da <code>select</code>, <code>insert</code>, <code>update</code> va{' '}
        <code>delete</code> — har biri o'zining alohida policy'sini talab qiladi. Bitta "hamma
        narsaga ruxsat" degan universal policy yo'q (garchi <code>for all</code> yozib, bir nechta
        amaliyotni bitta policy'da birlashtirish texnik jihatdan mumkin bo'lsa ham, aniqlik uchun
        odatda har biri alohida yoziladi). Quyidagi uchta buyruqni SQL Editor'da ketma-ket ishga
        tushiramiz:
      </p>
      <CodeBlock lang="sql">{`create policy "Public insert access"
on tasks for insert
with check (true);

create policy "Public update access"
on tasks for update
using (true);

create policy "Public delete access"
on tasks for delete
using (true);`}</CodeBlock>
      <p>
        Diqqat qiling: <code>insert</code> policy'sida <code>using</code> emas,{' '}
        <code>with check</code> ishlatilgan. Bu — tasodif emas, va aynan shu farqni tushunish RLS
        bilan ishlashning eng muhim qismi.
      </p>

      <h2>using vs with check — nima farqi bor?</h2>
      <p>
        Ikkalasi ham "shart" (condition) beradi, lekin ular <strong>turli savollarga</strong>{' '}
        javob beradi:
      </p>
      <ul>
        <li>
          <code>using</code> — "so'rov qaysi <strong>mavjud</strong> qatorlarga tega
          oladi?" degan savolga javob beradi. U <code>select</code>, <code>update</code> va{' '}
          <code>delete</code> uchun ishlatiladi, chunki bu amaliyotlarning barchasi allaqachon
          bazada turgan qatorlarni "topib", ularga ta'sir qiladi. Masalan,{' '}
          <code>update ... using (true)</code> degani — "har qanday mavjud qatorni yangilash
          uchun tanlash mumkin".
        </li>
        <li>
          <code>with check</code> — "yozilayotgan <strong>yangi</strong> qiymat qanday
          bo'lishi ruxsat etiladi?" degan savolga javob beradi. U <code>insert</code> uchun majburiy
          (chunki insert'da "mavjud qator" degan narsa yo'q — hammasi yangi), va{' '}
          <code>update</code> uchun ixtiyoriy qo'shimcha sifatida ham ishlatilishi mumkin (yangi
          qiymat qanday bo'lishini tekshirish uchun).
        </li>
      </ul>
      <p>
        Boshqacha qilib aytganda: <code>using</code> — "kirish eshigidagi" tekshiruv (qaysi
        qatorga yaqinlashish mumkin), <code>with check</code> — "chiqish eshigidagi" tekshiruv
        (nima yozib qoldirish mumkin). <code>update</code> uchun ikkalasi ham berilishi
        mumkin: <code>using</code> — qaysi qatorni yangilay olasiz, <code>with check</code> — o'sha
        qatorni yangilagandan keyin natija qanday bo'lishi kerakligini nazorat qiladi.
      </p>

      <Callout type="note" title="Misol: update uchun using va with check birga">
        Masalan, agar keyinchalik faqat o'z vazifalaringizni yangilashga, va yangilagandan keyin
        ham ularning egasi o'zgarmasligiga ishonch hosil qilmoqchi bo'lsangiz, shunday yozilishi
        mumkin edi:
        <CodeBlock lang="sql">{`create policy "Users can update own tasks"
on tasks for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);`}</CodeBlock>
        Bu yerda <code>using</code> — "faqat o'zingizga tegishli qatorni tanlay olasiz",{' '}
        <code>with check</code> — "yangilagandan keyin ham u sizga tegishli bo'lib qolishi kerak"
        (ya'ni <code>user_id</code>ni boshqa foydalanuvchiga "topshirib" bo'lmaydi). Bizga hali
        bu kerak emas — bu misol faqat farqni ko'rsatish uchun.
      </Callout>

      <h2>Ushbu policy'lar hozircha nima uchun bunday ochiq</h2>
      <p>
        E'tibor bering: barcha to'rtta policy'da ham shart — <code>true</code>. Bu degani, hozircha{' '}
        <strong>har qanday kishi</strong> istalgan vazifani qo'shishi, yangilashi yoki o'chirishi
        mumkin — hatto boshqa birovning vazifasini ham. Bu, albatta, chinakam ilova uchun yaroqsiz
        holat, lekin bizning hozirgi bosqichimizda ataylab shunday: 5-bo'limgacha ilovamizda hali
        autentifikatsiya yo'q, demak "faqat o'zingizning vazifangiz" degan tushunchaning o'zi hali
        mavjud emas — hech bir qatorda "kimga tegishli" degan ma'lumot yo'q.
      </p>

      <Callout type="warning" title="Bu — vaqtinchalik holat, production uchun emas">
        Hozirgi to'rtta policy — <strong>faqat o'rganish maqsadida</strong> ataylab ochiq
        qoldirilgan. Haqiqiy loyihada jadvalni bunday holatda qoldirib bo'lmaydi: istalgan
        tashrif buyuruvchi barcha foydalanuvchilarning vazifalarini ko'rishi, o'zgartirishi va
        o'chirishi mumkin bo'lib qoladi. 5-bo'limda autentifikatsiya qo'shgach, 19-darsda aynan
        shu to'rtta policy'ni o'chirib, ularning o'rniga <code>auth.uid() = user_id</code> shartiga
        asoslangan, har bir foydalanuvchini faqat o'z vazifalari bilan cheklaydigan policy'larni
        yozamiz. Hozircha shuni yodda tuting: <strong>"ochiq" — bu bosqich, yakuniy holat emas</strong>.
      </Callout>

      <Quiz
        question="tasks jadvalida for update policy'si using (true) bilan, lekin with check yozilmagan holda yaratilsa, nima bo'ladi?"
        options={[
          "Update umuman ishlamaydi, chunki with check majburiy",
          "Update ishlaydi: using sharti qaysi qatorni yangilash mumkinligini belgilaydi, with check berilmasa esa yangi qiymat uchun qo'shimcha cheklov qo'yilmaydi",
          "Postgres avtomatik ravishda with check (true) qo'shib qo'yadi va boshqa hech narsa o'zgarmaydi",
          "Faqat select policy'si bo'lgan qatorlarni yangilash mumkin bo'ladi",
        ]}
        correctIndex={1}
        explanation="with check ixtiyoriy: update uchun berilmasa, faqat using sharti (qaysi mavjud qatorni tanlash mumkinligi) tekshiriladi, yangi yoziladigan qiymatga alohida cheklov qo'yilmaydi."
      />

      <Exercise title="Amaliy mashq: policy'larni tekshirish">
        <p>
          Uchala buyruqni (insert, update, delete policy'lari) SQL Editor'da ishga tushiring.
          So'ng ilovangizni (<code>npm run dev</code>) qayta oching va quyidagilarni sinab
          ko'ring: yangi vazifa qo'shing, uni bajarilgan deb belgilang, so'ng o'chirib
          tashlang. Hammasi xatosiz ishlashi kerak.
        </p>
        <p>
          Keyin, mustaqil mashq sifatida: xayoliy <code>comments</code> (izohlar) jadvali bor deb
          faraz qiling, unda <code>id</code>, <code>vazifa_id</code> va <code>matn</code> ustunlari
          bor. Shu jadval uchun — faqat o'qish va qo'shish mumkin bo'lgan, lekin{' '}
          <strong>yangilash va o'chirish taqiqlangan</strong> (ya'ni ular uchun policy umuman
          yozilmagan) — RLS sozlamalarini SQL sifatida yozing.
        </p>
        <Solution>
          <CodeBlock lang="sql">{`alter table comments enable row level security;

create policy "Public read access"
on comments for select
using (true);

create policy "Public insert access"
on comments for insert
with check (true);

-- update va delete uchun policy yozilmaydi —
-- shuning uchun bu ikki amaliyot RLS tomonidan avtomatik rad etiladi`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          RLS'da har bir amaliyot turi (select, insert, update, delete) o'zining alohida
          policy'sini talab qiladi — birortasi yo'q bo'lsa, o'sha amaliyot rad etiladi.
        </li>
        <li>
          <code>using</code> — qaysi mavjud qatorlarga so'rov tega oladi (select, update, delete);{' '}
          <code>with check</code> — yozilayotgan yangi qiymat qanday bo'lishi ruxsat etiladi
          (insert, va ixtiyoriy ravishda update).
        </li>
        <li>
          <code>insert</code> uchun har doim <code>with check</code> ishlatiladi, chunki insert'da
          "mavjud qator" degan tushuncha yo'q.
        </li>
        <li>
          Hozirgi to'rtta policy (<code>using (true)</code> / <code>with check (true)</code>) —
          faqat vaqtinchalik, autentifikatsiya hali mavjud emasligi sababli ataylab ochiq
          qoldirilgan holat, production uchun emas.
        </li>
        <li>
          5-bo'limda autentifikatsiya qo'shilgach, 19-darsda bu policy'lar{' '}
          <code>auth.uid() = user_id</code> shartiga asoslangan, har bir foydalanuvchini o'z
          vazifalari bilan cheklaydigan policy'larga almashtiriladi.
        </li>
      </KeyPoints>
    </>
  )
}
