import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Oraliq loyiha: Kalkulyator',
  section: 'Oraliq loyiha',
}

export default function MiniProjectCalculatorLesson() {
  return (
    <>
      <p>
        1-11-darslarda o'zgaruvchilar, operatorlar, shartli operatorlar va DOM bilan
        ishlashning to'liq asosini yig'dik. Massivlar va obyektlarga o'tishdan oldin,
        keling, shu bilimlarning o'zi bilan — hech qanday yangi mavzusiz — birinchi
        <strong> haqiqiy ilovamizni</strong> quramiz: oddiy kalkulyator.
      </p>

      <h2>Kerakli HTML va CSS</h2>
      <CodeBlock lang="html">{`<input type="number" id="birinchiSonInput" placeholder="Birinchi son" />
<select id="amalSelect">
  <option value="+">+ (qo'shish)</option>
  <option value="-">− (ayirish)</option>
  <option value="*">× (ko'paytirish)</option>
  <option value="/">÷ (bo'lish)</option>
</select>
<input type="number" id="ikkinchiSonInput" placeholder="Ikkinchi son" />
<button id="hisoblaTugmasi">Hisoblash</button>
<p id="natija"></p>`}</CodeBlock>
      <CodeBlock lang="css">{`.xato {
  border: 2px solid red;
}`}</CodeBlock>

      <h2>1-qadam: Elementlarni tanlash</h2>
      <CodeBlock lang="javascript">{`let birinchiSonInput = document.getElementById("birinchiSonInput")
let ikkinchiSonInput = document.getElementById("ikkinchiSonInput")
let amalSelect = document.getElementById("amalSelect")
let hisoblaTugmasi = document.getElementById("hisoblaTugmasi")
let natijaElement = document.getElementById("natija")`}</CodeBlock>

      <h2>2-qadam: Bo'sh maydonlarni tekshirish</h2>
      <p>
        11-darsdagi kabi, avval foydalanuvchi ikkala maydonni ham to'ldirganini
        tekshiramiz. Bo'sh bo'lsa, mos inputga <code>"xato"</code> klassini qo'shib,
        hisoblashni davom ettirmaymiz:
      </p>
      <CodeBlock lang="javascript">{`hisoblaTugmasi.onclick = function () {
  if (birinchiSonInput.value === "" || ikkinchiSonInput.value === "") {
    natijaElement.textContent = "Ikkala sonni ham kiriting"
    return
  }

  birinchiSonInput.classList.remove("xato")
  ikkinchiSonInput.classList.remove("xato")

  // keyingi qadamlar shu yerga qo'shiladi
}`}</CodeBlock>

      <h2>3-qadam: Amalni tanlab hisoblash</h2>
      <p>
        6-darsda ko'rgan <code>switch</code> — bir nechta variantdan birini tanlashga
        aynan mos keladi. <code>amalSelect.value</code> qaysi amal tanlanganini
        ("+", "-", "*" yoki "/") beradi:
      </p>
      <CodeBlock lang="javascript">{`hisoblaTugmasi.onclick = function () {
  if (birinchiSonInput.value === "" || ikkinchiSonInput.value === "") {
    natijaElement.textContent = "Ikkala sonni ham kiriting"
    return
  }

  let birinchiSon = Number(birinchiSonInput.value)
  let ikkinchiSon = Number(ikkinchiSonInput.value)
  let amal = amalSelect.value
  let natija

  switch (amal) {
    case "+":
      natija = birinchiSon + ikkinchiSon
      break
    case "-":
      natija = birinchiSon - ikkinchiSon
      break
    case "*":
      natija = birinchiSon * ikkinchiSon
      break
    case "/":
      if (ikkinchiSon === 0) {
        natijaElement.textContent = "Nolga bo'lib bo'lmaydi"
        return
      }
      natija = birinchiSon / ikkinchiSon
      break
  }

  // natijani ko'rsatish keyingi qadamda
}`}</CodeBlock>
      <Callout type="warning" title="Nega bo'lish (/) tekshiruvi switch ichida?">
        Nolga bo'lish faqat <code>"/"</code> tanlanganda muammo — qo'shish yoki
        ayirishda <code>ikkinchiSon</code> 0 bo'lishi hech qanday xato emas. Shuning
        uchun bu tekshiruv umumiy emas, aynan <code>"/"</code>ning <code>case</code>{' '}
        blokining ichida turadi.
      </Callout>

      <h2>4-qadam: Natijani ekranga chiqarish</h2>
      <p>
        4-darsda ko'rgan <code>.toFixed(2)</code> — natijani chiroyli, 2 xonali
        kasrgacha ko'rsatish uchun (masalan <code>10 / 3</code> natijasi{' '}
        <code>3.3333333333333335</code> emas, <code>"3.33"</code> bo'lib chiqadi):
      </p>
      <CodeBlock lang="javascript">{`  natijaElement.textContent = "Natija: " + natija.toFixed(2)
}`}</CodeBlock>
      <Quiz
        question={`Yuqoridagi switch blokida har bir case oxirida break yozilmasa nima bo'ladi?`}
        options={[
          "Hech narsa o'zgarmaydi, break shart emas",
          "Faqat mos case ishlaydi, qolganlari o'tkazib yuboriladi",
          "Mos case ishlagach, undan keyingi barcha case'lar ham ketma-ket ishlab ketaveradi",
          "Kod xatolik beradi"
        ]}
        correctIndex={2}
        explanation={`break bo'lmasa, JavaScript mos case topilgandan keyin ham pastga qarab davom etadi va keyingi case'larni ham bajaraveradi ("fall-through"). Masalan "+" tanlansa-yu break yo'q bo'lsa, natija "+" bilan hisoblanadi-yu, keyin "-" case'i ham ustiga qo'shilib ketadi.`}
      />

      <h2>Amaliyot</h2>
      <p>
        Yuqoridagi kalkulyatorga quyidagi qo'shimcha imkoniyatlarni qo'shing. Har
        birida yuqoridagi <code>birinchiSonInput</code>, <code>ikkinchiSonInput</code>,{' '}
        <code>amalSelect</code> va <code>natijaElement</code>dan foydalanasiz.
      </p>

      <Exercise title="1-vazifa: Tozalash tugmasi">
        <p>
          HTML: <code>{'<button id="tozalashTugmasi">Tozalash</button>'}</code>. Tugma
          bosilganda ikkala inputning qiymatini <code>""</code>ga tenglashtiring va{' '}
          <code>natijaElement.textContent</code>ni bo'shating.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let tozalashTugmasi = document.getElementById("tozalashTugmasi")

tozalashTugmasi.onclick = function () {
  birinchiSonInput.value = ""
  ikkinchiSonInput.value = ""
  natijaElement.textContent = ""
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Qoldiq (%) amalini qo'shish">
        <p>
          <code>{'<option value="%">% (qoldiq)</option>'}</code>ni <code>amalSelect</code>
          ga qo'shing. <code>switch</code>ga yangi <code>case "%"</code> qo'shing —
          nolga bo'lishda xuddi <code>"/"</code>dagi kabi xato ko'rsating, aks holda{' '}
          <code>%</code> operatori bilan qoldiqni hisoblang.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`    case "%":
      if (ikkinchiSon === 0) {
        natijaElement.textContent = "Nolga bo'lib bo'lmaydi"
        return
      }
      natija = birinchiSon % ikkinchiSon
      break`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Manfiy natijani qizil rangda ko'rsatish">
        <p>
          CSS'ga <code>{'.manfiy { color: red; font-weight: bold; }'}</code> qo'shing.
          Natija hisoblangandan so'ng, agar <code>natija</code> 0dan kichik bo'lsa,{' '}
          <code>natijaElement</code>ga <code>"manfiy"</code> klassini qo'shing, aks
          holda olib tashlang.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`  if (natija < 0) {
    natijaElement.classList.add("manfiy")
  } else {
    natijaElement.classList.remove("manfiy")
  }

  natijaElement.textContent = "Natija: " + natija.toFixed(2)
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Natijadan davom ettirish">
        <p>
          HTML: <code>{'<button id="davomEttirTugmasi">Bu natija bilan davom etish</button>'}</code>
          . Har safar hisoblanganda natijani <code>oxirgiNatija</code> nomli o'zgaruvchiga
          saqlab boring. Tugma bosilganda <code>birinchiSonInput.value</code>ni{' '}
          <code>oxirgiNatija</code>ga tenglashtirib, <code>ikkinchiSonInput</code>ni
          tozalang — shunda foydalanuvchi oldingi natija ustiga yangi amal qo'sha oladi.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let oxirgiNatija = 0
let davomEttirTugmasi = document.getElementById("davomEttirTugmasi")

// ...natija hisoblangan joyda:
oxirgiNatija = natija

davomEttirTugmasi.onclick = function () {
  birinchiSonInput.value = oxirgiNatija
  ikkinchiSonInput.value = ""
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Yangi mavzu o'rganmasdan ham — faqat o'zgaruvchi, operator, shart va DOM
          bilan — to'liq ishlaydigan kichik ilova qurish mumkin.
        </li>
        <li>
          Bir nechta variantdan birini tanlash kerak bo'lganda (amal turi kabi),{' '}
          <code>switch</code> ko'p <code>if/else if</code>dan ko'ra o'qilishi osonroq.
        </li>
        <li>
          Xatolikni tekshirish tartibi muhim: avval umumiy holat (bo'sh maydonlar),
          so'ng har bir amalga xos holat (nolga bo'lish) — faqat kerakli joyda.
        </li>
        <li>
          <code>.toFixed(2)</code> — hisoblash natijalarini foydalanuvchiga chiroyli
          ko'rsatishning standart usuli.
        </li>
        <li>
          Keyingi darsdan boshlab massivlar bilan tanishamiz — ular bitta o'zgaruvchida
          ko'plab qiymatlarni saqlashga, va bu kalkulyatorni kengroq (masalan,
          hisoblashlar tarixini saqlaydigan) qilishga imkon beradi.
        </li>
      </KeyPoints>
    </>
  )
}
