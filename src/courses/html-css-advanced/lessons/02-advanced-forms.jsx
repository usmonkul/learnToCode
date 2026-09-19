import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Ilg'or formalar va validatsiya",
  section: "Chuqur HTML",
}

export default function AdvancedFormsLesson() {
  return (
    <>
      <p>
        Formalar foydalanuvchi bilan asosiy muloqot vositasi. To'g'ri sozlangan forma JavaScript
        yozmasdan ham tekshiruv, avtoto'ldirish va qulay klaviaturani beradi.
      </p>

      <h2>Validatsiya atributlari</h2>
      <CodeBlock lang="html">{`<form>
  <label for="ism">Ism</label>
  <input id="ism" name="ism" type="text" required minlength="2" maxlength="40" />

  <label for="yosh">Yosh</label>
  <input id="yosh" name="yosh" type="number" min="16" max="99" step="1" />

  <label for="tel">Telefon</label>
  <input
    id="tel" name="tel" type="tel"
    pattern="\\+998[0-9]{9}"
    title="Format: +998901234567"
    required
  />

  <button type="submit">Yuborish</button>
</form>`}</CodeBlock>
      <ul>
        <li><code>required</code>, <code>min</code>, <code>max</code>, <code>minlength</code>, <code>maxlength</code>, <code>step</code> — oddiy cheklovlar.</li>
        <li><code>pattern</code> — muntazam ifoda (regular expression) bilan tekshirish.</li>
        <li><code>type="email"</code>, <code>type="url"</code> — formatni brauzer tekshiradi.</li>
      </ul>
      <Callout type="warning" title="Server tekshiruvi shart">
        Brauzerdagi tekshiruvni chetlab o'tish oson. U faqat foydalanuvchiga qulaylik uchun:
        haqiqiy xavfsizlik uchun ma'lumotni serverda ham tekshirish kerak.
      </Callout>

      <h2>Validatsiyani CSS bilan bezash</h2>
      <CodeBlock lang="css">{`input:user-invalid {
  border-color: #dc2626;
}

input:user-valid {
  border-color: #16a34a;
}`}</CodeBlock>
      <p>
        <code>:invalid</code> foydalanuvchi hali hech narsa yozmasa ham ishlaydi, ya'ni
        sahifa ochilishi bilan qizil maydonlar chiqadi. <code>:user-invalid</code> esa
        foydalanuvchi maydon bilan o'zaro ishlagandan keyingina qo'llanadi.
      </p>

      <h2>autocomplete va inputmode</h2>
      <CodeBlock lang="html">{`<input type="text" name="ism" autocomplete="name" />
<input type="email" name="email" autocomplete="email" />
<input type="password" name="parol" autocomplete="new-password" />
<input type="text" name="kod" inputmode="numeric" autocomplete="one-time-code" />`}</CodeBlock>
      <p>
        <code>autocomplete</code> brauzerga ma'lumotni avtomatik to'ldirishga, parol
        menejerlariga esa maydonni tanishga yordam beradi. <code>inputmode</code> mobilda
        mos klaviatura chiqaradi.
      </p>

      <h2>datalist, output va progress</h2>
      <CodeBlock lang="html">{`<label for="shahar">Shahar</label>
<input id="shahar" list="shaharlar" />
<datalist id="shaharlar">
  <option value="Toshkent"></option>
  <option value="Samarqand"></option>
  <option value="Buxoro"></option>
</datalist>

<label for="yuklash">Yuklanish</label>
<progress id="yuklash" value="70" max="100">70%</progress>`}</CodeBlock>

      <h2>Maydonlarni guruhlash</h2>
      <CodeBlock lang="html">{`<fieldset>
  <legend>Yetkazib berish usuli</legend>
  <label><input type="radio" name="usul" value="kuryer" /> Kuryer</label>
  <label><input type="radio" name="usul" value="olib" /> O'zim olib ketaman</label>
</fieldset>`}</CodeBlock>

      <Quiz
        question="Foydalanuvchi maydonga tegmasdan turib qizil xato ko'rsatmaslik uchun qaysi pseudo-class yaxshi?"
        options={[":invalid", ":user-invalid", ":focus", ":required"]}
        correctIndex={1}
        explanation=":user-invalid faqat foydalanuvchi maydon bilan o'zaro ishlagandan keyin qo'llanadi, :invalid esa sahifa yuklanishi bilan ishlaydi."
      />

      <h2>Amaliyot</h2>
      <Exercise title="1-vazifa: Buyurtma formasi">
        <p>
          Formada: majburiy ism (2–40 belgi), telefon (+998 bilan boshlanadigan pattern),
          <code>datalist</code> bilan shahar tanlash va yetkazib berish usuli (<code>fieldset</code>
          ichida radio) bo'lsin. <code>:user-invalid</code> uchun qizil chegara bering.
        </p>
        <Solution>
          <CodeBlock lang="html">{`<form>
  <label for="ism">Ism</label>
  <input id="ism" name="ism" required minlength="2" maxlength="40" autocomplete="name" />

  <label for="tel">Telefon</label>
  <input id="tel" name="tel" type="tel" required pattern="\\+998[0-9]{9}"
         title="Format: +998901234567" autocomplete="tel" />

  <label for="shahar">Shahar</label>
  <input id="shahar" name="shahar" list="shaharlar" />
  <datalist id="shaharlar">
    <option value="Toshkent"></option>
    <option value="Samarqand"></option>
  </datalist>

  <fieldset>
    <legend>Yetkazib berish</legend>
    <label><input type="radio" name="usul" value="kuryer" required /> Kuryer</label>
    <label><input type="radio" name="usul" value="olib" /> O'zim olaman</label>
  </fieldset>

  <button type="submit">Buyurtma berish</button>
</form>`}</CodeBlock>
          <CodeBlock lang="css">{`input:user-invalid {
  border-color: #dc2626;
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>Brauzer validatsiyasi: <code>required</code>, <code>pattern</code>, <code>min</code>/<code>max</code>, to'g'ri <code>type</code>.</li>
        <li><code>:user-invalid</code>/<code>:user-valid</code> — foydalanuvchi harakatidan keyin bezash.</li>
        <li><code>autocomplete</code> va <code>inputmode</code> foydalanuvchi vaqtini tejaydi.</li>
        <li>Server tekshiruvi har doim kerak.</li>
      </KeyPoints>
    </>
  )
}
