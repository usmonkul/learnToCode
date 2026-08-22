import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "RLS + Auth birgalikda",
  section: "5-bo'lim: Autentifikatsiya",
}

export default function Lesson19RlsVaAuth() {
  return (
    <>
      <p>
        Bu — 5-bo'limning yakuniy va eng muhim darsi. Hozirgacha yig'gan barcha qismlar — autentifikatsiya (15-17-darslar) va <code>user_id</code> ustuni (18-dars) — shu daqiqagacha to'liq ma'noga ega bo'lmagan edi, chunki 4-bo'limda yozgan RLS policy'lari hali ham <strong>hammaga ochiq</strong> edi. Bu darsda o'sha ochiq policy'larni olib tashlab, o'rniga faqat egasiga ruxsat beradigan policy'larni yozamiz — va aynan shu daqiqada ilovamiz haqiqatan ham xususiy (private), ko'p foydalanuvchili (multi-tenant) ilovaga aylanadi.
      </p>

      <h2>Eslatma: hozirgi holat</h2>
      <p>
        13- va 14-darslarda yozilgan policy'lar shunday edi:
      </p>
      <CodeBlock lang="sql">{`create policy "Public read access"
on tasks for select
using (true);

create policy "Public insert access"
on tasks for insert
with check (true);

create policy "Public update access"
on tasks for update
using (true);

create policy "Public delete access"
on tasks for delete
using (true);`}</CodeBlock>
      <p>
        <code>using (true)</code> va <code>with check (true)</code> — bu "shart doim to'g'ri" degani, ya'ni cheklov aslida yo'q edi. Endi 18-darsda qo'shilgan <code>user_id</code> ustunidan foydalanib, <code>true</code> o'rniga haqiqiy shartni yozamiz.
      </p>

      <h2>Eski policy'larni o'chirish</h2>
      <p>
        Postgres'da bir xil harakat (masalan, <code>select</code>) uchun bir nechta policy mavjud bo'lsa, ular <strong>OR</strong> mantig'i bilan qo'shiladi — ya'ni istalgan birortasi ruxsat bersa, harakat o'tadi. Shuning uchun eski "hammaga ochiq" policy'larni shunchaki qoldirib, ustiga yangisini qo'shish yetarli emas — eski policy hali ham "true" deb turaveradi va yangi cheklovni bekor qilib qo'yadi. Avval ularni aniq <code>drop policy</code> bilan o'chirish shart:
      </p>
      <CodeBlock lang="sql">{`drop policy "Public read access" on tasks;
drop policy "Public insert access" on tasks;
drop policy "Public update access" on tasks;
drop policy "Public delete access" on tasks;`}</CodeBlock>

      <Callout type="warning" title="Policy nomlari aniq mos kelishi kerak">
        <code>drop policy</code> policy nomini harfma-harf, tirnoq ichidagi ko'rinishda talab qiladi. Agar 13-14-darslarda policy'larga boshqacharoq nom bergan bo'lsangiz (masalan, boshqa katta-kichik harf bilan), Table Editor'ning <strong>Authentication → Policies</strong> bo'limiga kirib, jadval nomlarini aniq nusxalab oling — aks holda <code>drop policy</code> "policy topilmadi" xatosini beradi.
      </Callout>

      <h2>Yangi, foydalanuvchiga bog'liq policy'lar</h2>
      <p>
        Endi har bir harakat uchun <code>auth.uid() = user_id</code> shartini yozamiz — bu "so'rovni yuborayotgan foydalanuvchining id'si qatordagi <code>user_id</code> bilan bir xil bo'lsagina ruxsat ber" degani:
      </p>
      <CodeBlock lang="sql">{`create policy "Users can view own tasks"
on tasks for select
using (auth.uid() = user_id);

create policy "Users can insert own tasks"
on tasks for insert
with check (auth.uid() = user_id);

create policy "Users can update own tasks"
on tasks for update
using (auth.uid() = user_id);

create policy "Users can delete own tasks"
on tasks for delete
using (auth.uid() = user_id);`}</CodeBlock>
      <p>
        12-darsda <code>using</code> va <code>with check</code> orasidagi farqni ko'rgan edik: <code>using</code> — "qaysi mavjud qatorlarga ruxsat bor" (select/update/delete uchun), <code>with check</code> esa "yangi yoziladigan/o'zgartiriladigan qator shu shartga mos bo'lishi shart" (insert/update uchun). Shu farq bu yerda ham saqlanadi — <code>select</code>, <code>update</code>, <code>delete</code>da <code>using</code>, <code>insert</code>da <code>with check</code> ishlatiladi.
      </p>

      <h2>Bu amalda qanday ishlaydi?</h2>
      <p>
        Endi to'liq zanjirni ko'rib chiqamiz. Foydalanuvchi A tizimga kiradi, uning sessiyasi JWT tokenida uning <code>id</code>sini olib yuradi. U vazifa qo'shganda:
      </p>
      <ol>
        <li>
          Frontend <code>supabase.from('tasks').insert({'{ title }'})</code>ni chaqiradi — <code>user_id</code> haqida hech narsa aytmaydi.
        </li>
        <li>
          So'rov Supabase serveriga foydalanuvchi A'ning JWT tokeni bilan birga yetib boradi.
        </li>
        <li>
          Postgres qatorni yozishdan oldin <code>user_id</code> ustunining <code>default auth.uid()</code>sini ishlatib, uni foydalanuvchi A'ning id'siga to'ldiradi.
        </li>
        <li>
          <code>"Users can insert own tasks"</code> policy'si tekshiriladi: <code>auth.uid() = user_id</code> — ikkalasi ham foydalanuvchi A'ning id'si, demak <code>true</code>, yozish ruxsat etiladi.
        </li>
      </ol>
      <p>
        Foydalanuvchi A endi <code>select</code> qilganda esa <code>"Users can view own tasks"</code> policy'si ishga tushadi va Postgres jadvaldagi <strong>faqat</strong> <code>user_id = auth.uid()</code>ga mos qatorlarni qaytaradi — foydalanuvchi B'ning vazifalari natijaga umuman kirmaydi, xuddi ular mavjud emasdek. Bu — <code>WHERE user_id = ...</code> shartini frontend kodida yozishga o'xshaydi, lekin muhim farqi bilan: bu shart frontend'da emas, <strong>bazaning o'zida</strong>, majburiy tarzda qo'llaniladi. Frontend kodi buni "unutib qo'yishi" yoki chetlab o'tishi mumkin emas.
      </p>

      <Callout type="tip" title="Bu — standart Supabase ko'p foydalanuvchili (multi-tenant) naqsh">
        <code>user_id</code> ustuni + <code>default auth.uid()</code> + <code>auth.uid() = user_id</code> shartli RLS policy — bu Supabase loyihalarida eng ko'p uchraydigan naqsh, "har bir foydalanuvchi faqat o'z ma'lumotini ko'radi" degan talab qo'yiladigan deyarli har qanday ilovada (vazifalar ro'yxati, eslatmalar, buyurtmalar va h.k.) aynan shu uch narsa birga ishlatiladi. Buni bir marta tushunib olsangiz, boshqa jadvallarga ham osongina qo'llay olasiz.
      </Callout>

      <Quiz
        question="Nega eski 'Public read access' kabi policy'larni drop qilmasdan, ustiga shunchaki yangi cheklangan policy qo'shib bo'lmaydi?"
        options={[
          "Postgres bitta jadvalda bir nechta select policy'siga umuman ruxsat bermaydi",
          "Bir xil harakat uchun policy'lar OR mantig'i bilan qo'shiladi, shuning uchun eski 'true' policy hali ham hamma narsaga ruxsat berib turaveradi",
          "Yangi policy avtomatik ravishda eskisini almashtiradi, lekin sekinroq ishlaydi",
          "drop qilinmagan policy'lar RLS'ni butunlay o'chirib qo'yadi",
        ]}
        correctIndex={1}
        explanation="Bitta jadvalda bir xil harakat (masalan, select) uchun bir nechta policy bo'lishi mumkin, va ular OR mantig'i bilan birlashadi. Agar eski 'using (true)' policy o'chirilmasa, u hali ham har doim true qaytaradi va yangi, cheklangan policy amalda hech narsani cheklamay qoladi."
      />

      <Exercise title="Amaliy mashq: RLS'ni qattiqlashtirish">
        <p>
          SQL Editor'da avval to'rtta <code>drop policy</code> buyrug'ini, so'ng to'rtta yangi, foydalanuvchiga bog'liq policy'ni ishga tushiring. Keyin brauzerda ikkita xil hisob bilan sinab ko'ring: birinchi hisob bilan kirib bir nechta vazifa qo'shing, chiqing, ikkinchi (yangi) hisob bilan kiring va vazifalar ro'yxati bo'sh (yoki faqat ikkinchi hisobning o'z vazifalari) ko'rinayotganini tasdiqlang.
        </p>
        <Solution>
          <CodeBlock lang="sql">{`drop policy "Public read access" on tasks;
drop policy "Public insert access" on tasks;
drop policy "Public update access" on tasks;
drop policy "Public delete access" on tasks;

create policy "Users can view own tasks"
on tasks for select
using (auth.uid() = user_id);

create policy "Users can insert own tasks"
on tasks for insert
with check (auth.uid() = user_id);

create policy "Users can update own tasks"
on tasks for update
using (auth.uid() = user_id);

create policy "Users can delete own tasks"
on tasks for delete
using (auth.uid() = user_id);`}</CodeBlock>
          <p>
            Agar ikkinchi hisobda birinchi hisobning vazifalari ko'rinmasa va faqat o'z vazifalari (agar qo'shgan bo'lsangiz) ko'rinsa — RLS to'g'ri ishlayapti degani. Bu — ilovangiz endi haqiqatan ham har bir foydalanuvchi uchun xususiy ekanligining eng ishonchli isboti.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Bir xil harakat uchun bir nechta RLS policy OR mantig'i bilan qo'shiladi, shuning uchun eski "ochiq" policy'larni yangisini qo'shishdan oldin <code>drop policy</code> bilan albatta o'chirish kerak.
        </li>
        <li>
          Yangi policy'lar <code>auth.uid() = user_id</code> shartidan foydalanadi — <code>select</code>/<code>update</code>/<code>delete</code>da <code>using</code>, <code>insert</code>da <code>with check</code>.
        </li>
        <li>
          Bu shart bazaning o'zida, majburiy tarzda qo'llaniladi — frontend kodi uni chetlab o'ta olmaydi, xuddi 18-darsdagi <code>default auth.uid()</code> kabi.
        </li>
        <li>
          <code>user_id</code> ustuni + <code>default auth.uid()</code> + <code>auth.uid() = user_id</code> policy — bu Supabase'dagi standart ko'p foydalanuvchili (multi-tenant) naqsh.
        </li>
        <li>
          Aynan shu dars bilan ilova haqiqatan ham xususiy bo'ladi: har bir foydalanuvchi faqat o'z vazifalarini ko'radi va boshqara oladi.
        </li>
      </KeyPoints>
    </>
  )
}
