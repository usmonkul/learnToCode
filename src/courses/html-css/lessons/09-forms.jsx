import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Formalar",
  section: "HTML",
}

export default function FormsLesson() {
  return (
    <>
      <p>
        Formalar foydalanuvchidan ma'lumot olish uchun: ro'yxatdan o'tish, qidiruv, xabar
        yuborish. Bu HTMLning eng boy qismlaridan biri.
      </p>

      <h2>Form va input</h2>
      <CodeBlock lang="html">{`<form action="/yuborish" method="post">
  <label for="ism">Ismingiz</label>
  <input type="text" id="ism" name="ism" placeholder="Masalan, Aziz" />

  <button type="submit">Yuborish</button>
</form>`}</CodeBlock>
      <ul>
        <li><code>{`<form>`}</code> — barcha maydonlarni o'rab turadi. <code>action</code> ma'lumot yuboriladigan manzil, <code>method</code> — usul.</li>
        <li><code>{`<label>`}</code> — maydon yorlig'i. <code>for</code> qiymati inputning <code>id</code>siga teng bo'lsa, yorliqni bosganda maydon faollashadi.</li>
        <li><code>{`<input>`}</code> — kiritish maydoni. <code>name</code> yuborilayotgan ma'lumot nomi.</li>
        <li><code>{`<button>`}</code> — tugma. <code>type="submit"</code> formani yuboradi.</li>
      </ul>
      <Callout type="warning" title="Label majburiy">
        Har bir maydon uchun <code>label</code> yozing. Faqat <code>placeholder</code> ga
        tayanmang: u yozishni boshlaganda yo'qoladi va ekran o'quvchilar uchun yorliq
        o'rnini bosmaydi.
      </Callout>

      <h2>Input turlari</h2>
      <CodeBlock lang="html">{`<input type="email" name="email" />
<input type="password" name="parol" />
<input type="number" name="yosh" min="0" max="120" />
<input type="date" name="tugilgan" />
<input type="checkbox" name="rozilik" />
<input type="radio" name="jins" value="erkak" />
<input type="range" name="daraja" min="1" max="10" />
<input type="file" name="rasm" />`}</CodeBlock>
      <p>
        To'g'ri <code>type</code> tanlash telefonda mos klaviatura chiqarishga va brauzerning
        o'zi tekshirishiga yordam beradi.
      </p>

      <h2>Boshqa elementlar</h2>
      <CodeBlock lang="html">{`<label for="xabar">Xabar</label>
<textarea id="xabar" name="xabar" rows="4"></textarea>

<label for="shahar">Shahar</label>
<select id="shahar" name="shahar">
  <option value="tosh">Toshkent</option>
  <option value="sam">Samarqand</option>
  <option value="buxoro">Buxoro</option>
</select>

<fieldset>
  <legend>Jinsi</legend>
  <label><input type="radio" name="jins" value="erkak" /> Erkak</label>
  <label><input type="radio" name="jins" value="ayol" /> Ayol</label>
</fieldset>`}</CodeBlock>

      <h2>Oddiy tekshiruv (validation)</h2>
      <CodeBlock lang="html">{`<input type="email" name="email" required />
<input type="text" name="ism" minlength="2" maxlength="30" required />`}</CodeBlock>
      <p>
        <code>required</code> maydonni majburiy qiladi, <code>minlength</code>/<code>maxlength</code>{' '}
        uzunlikni cheklaydi. Brauzer xato bo'lsa formani yubormaydi va xabar ko'rsatadi.
      </p>

      <Quiz
        question="Label bosilganda mos input faollashishi uchun nima kerak?"
        options={[
          "label ichiga placeholder yozish",
          "label for qiymati inputning id siga teng bo'lishi",
          "inputga class berish",
          "ikkalasini div ichiga olish",
        ]}
        correctIndex={1}
        explanation="label ning for atributi inputning id atributiga mos kelganda ular bog'lanadi. Bu qulaylik va accessibility uchun muhim."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Ro'yxatdan o'tish formasi">
        <p>
          Ism (majburiy), email (majburiy), parol va "Shartlarga roziman" checkboxi bo'lgan
          forma yarating. Har bir maydonda label bo'lsin.
        </p>
        <Solution>
          <CodeBlock lang="html">{`<form>
  <label for="ism">Ism</label>
  <input type="text" id="ism" name="ism" required />

  <label for="email">Email</label>
  <input type="email" id="email" name="email" required />

  <label for="parol">Parol</label>
  <input type="password" id="parol" name="parol" minlength="8" />

  <label>
    <input type="checkbox" name="rozilik" required />
    Shartlarga roziman
  </label>

  <button type="submit">Ro'yxatdan o'tish</button>
</form>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li><code>form</code> maydonlarni jamlaydi, <code>button type="submit"</code> yuboradi.</li>
        <li>Har bir maydonga <code>label</code> (<code>for</code> ↔ <code>id</code>) yozing.</li>
        <li>To'g'ri <code>type</code>: <code>email</code>, <code>number</code>, <code>date</code> va h.k.</li>
        <li><code>required</code>, <code>minlength</code>, <code>max</code> — brauzer tekshiruvi.</li>
      </KeyPoints>
    </>
  )
}
