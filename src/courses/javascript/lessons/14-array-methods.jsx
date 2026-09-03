import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Massivlarning asosiy metodlari',
  section: 'Massivlar',
}

export default function ArrayMethodsLesson() {
  return (
    <>
      <p>
        4-darsda matnlar (string) ustida tayyor amallar bajaradigan metodlarni o'rgangan
        edik. Massivlarning ham o'z metodlari bor — ular yordamida elementlarni qo'shish,
        olib tashlash va qidirish uchun kodni qo'lda yozishga hojat qolmaydi. Bu darsda eng
        ko'p ishlatiladigan, asosiy massiv metodlarini ko'rib chiqamiz (
        <code>forEach</code>, <code>map</code>, <code>filter</code>, <code>reduce</code>,{' '}
        <code>sort</code>, <code>find</code> kabi metodlar keyingi darslarga qoldiriladi).
      </p>

      <h2>
        <code>.push()</code> — oxiriga element qo'shish
      </h2>
      <p>Massivning oxiriga bitta (yoki bir nechta) yangi element qo'shadi:</p>
      <CodeBlock lang="javascript">{`let mevalar = ["olma", "banan"]
mevalar.push("shaftoli")
console.log(mevalar) // ["olma", "banan", "shaftoli"]`}</CodeBlock>

      <h2>
        <code>.pop()</code> — oxiridan element olib tashlash
      </h2>
      <p>
        Massivning oxirgi elementini olib tashlaydi va <strong>o'sha elementni</strong>{' '}
        natija sifatida qaytaradi:
      </p>
      <CodeBlock lang="javascript">{`let mevalar = ["olma", "banan", "shaftoli"]
let olibTashlangan = mevalar.pop()

console.log(olibTashlangan) // "shaftoli"
console.log(mevalar)        // ["olma", "banan"]`}</CodeBlock>

      <h2>
        <code>.unshift()</code> va <code>.shift()</code> — boshidan qo'shish/olib tashlash
      </h2>
      <p>
        <code>push</code>/<code>pop</code>ning "boshi" versiyasi:{' '}
        <code>unshift()</code> massivning <strong>boshiga</strong> element qo'shadi,{' '}
        <code>shift()</code> esa <strong>birinchi</strong> elementni olib tashlaydi:
      </p>
      <CodeBlock lang="javascript">{`let navbat = ["Aziz", "Vali"]

navbat.unshift("Malika")
console.log(navbat) // ["Malika", "Aziz", "Vali"]

let xizmatQilingan = navbat.shift()
console.log(xizmatQilingan) // "Malika"
console.log(navbat)         // ["Aziz", "Vali"]`}</CodeBlock>
      <Callout type="tip" title="push/pop tezroq, unshift/shift sekinroq">
        <code>push()</code> va <code>pop()</code> faqat oxirgi elementga tegadi, shuning
        uchun tez ishlaydi. <code>unshift()</code> va <code>shift()</code> esa boshidan
        o'zgartirgani uchun, massivdagi qolgan barcha elementlarning indeksini qayta
        hisoblashi kerak — katta massivlarda bu sezilarli sekinroq. Amaliyotda, imkon
        bo'lsa, <code>push</code>/<code>pop</code>ni afzal ko'ring.
      </Callout>
      <Quiz
        question={`let ro'yxat = ["A", "B", "C"]; let natija = ro'yxat.pop(); natija va ro'yxat oxirida nimaga teng bo'ladi?`}
        options={[
          `natija = "A", ro'yxat = ["B", "C"]`,
          `natija = "C", ro'yxat = ["A", "B"]`,
          `natija = ["A", "B"], ro'yxat = "C"`,
          `natija = undefined, ro'yxat o'zgarmaydi`,
        ]}
        correctIndex={1}
        explanation={`pop() massivning oxirgi elementini ("C") olib tashlaydi va uni qaytaradi; ro'yxatda qolgan elementlar ["A", "B"] bo'lib qoladi.`}
      />

      <h2>
        <code>.indexOf()</code> — elementning indeksini topish
      </h2>
      <p>
        Berilgan qiymat massivda birinchi marta qayerda uchrashini (indeksini) qaytaradi;
        topilmasa <code>-1</code> qaytaradi — xuddi 4-darsdagi matn uchun ko'rgan{' '}
        <code>.indexOf()</code> kabi:
      </p>
      <CodeBlock lang="javascript">{`let mevalar = ["olma", "banan", "shaftoli"]

console.log(mevalar.indexOf("banan")) // 1
console.log(mevalar.indexOf("uzum"))  // -1 — topilmadi`}</CodeBlock>

      <h2>
        <code>.includes()</code> — massivda bor-yo'qligini tekshirish
      </h2>
      <p>
        Berilgan qiymat massivda bor-yo'qligini <code>boolean</code> sifatida qaytaradi —
        "bormi yo'qmi" savoliga <code>{'indexOf(...) !== -1'}</code>dan ancha o'qish
        uchun qulayroq javob:
      </p>
      <CodeBlock lang="javascript">{`let mevalar = ["olma", "banan", "shaftoli"]

console.log(mevalar.includes("banan")) // true
console.log(mevalar.includes("uzum"))  // false`}</CodeBlock>

      <h2>
        <code>.join()</code> — massivni matnga birlashtirish
      </h2>
      <p>
        Massivning barcha elementlarini bitta matnga (string) birlashtiradi, orasiga
        berilgan ajratuvchi (separator) qo'yib:
      </p>
      <CodeBlock lang="javascript">{`let mevalar = ["olma", "banan", "shaftoli"]

console.log(mevalar.join(", ")) // "olma, banan, shaftoli"
console.log(mevalar.join(" - ")) // "olma - banan - shaftoli"
console.log(mevalar.join(""))    // "olmabananshaftoli" — ajratuvchisiz`}</CodeBlock>
      <p>
        Ajratuvchi berilmasa, standart holatda vergul ishlatiladi:{' '}
        <code>{'mevalar.join()'}</code> → <code>"olma,banan,shaftoli"</code>.
      </p>

      <h2>
        <code>.slice()</code> — massivning bir qismini olish
      </h2>
      <p>
        3-darsda matn uchun ko'rgan <code>.slice()</code> massivlar uchun ham xuddi shunday
        ishlaydi: boshlanish va tugash indeksi bo'yicha bir qismini <strong>yangi
        massiv</strong> sifatida qaytaradi, tugash indeksi natijaga kirmaydi:
      </p>
      <CodeBlock lang="javascript">{`let mevalar = ["olma", "banan", "shaftoli", "uzum", "anor"]

console.log(mevalar.slice(0, 2)) // ["olma", "banan"]
console.log(mevalar.slice(1))    // ["banan", "shaftoli", "uzum", "anor"] — oxirigacha`}</CodeBlock>
      <Callout type="note" title="Muhim: slice() asl massivni o'zgartirmaydi">
        <code>push</code>, <code>pop</code>, <code>unshift</code>, <code>shift</code> — bu
        to'rttasi asl massivning o'zini o'zgartiradi (<strong>mutating</strong>).{' '}
        <code>slice()</code> esa asl massivga tegmaydi, faqat undan nusxa olib,{' '}
        <strong>yangi massiv</strong> qaytaradi (<strong>non-mutating</strong>). Bu farqni
        bilish muhim — <code>slice()</code>dan keyin ham eski massiv o'zgarishsiz qoladi.
      </Callout>
      <CodeBlock lang="javascript">{`let mevalar = ["olma", "banan", "shaftoli"]
let ikkitasi = mevalar.slice(0, 2)

console.log(ikkitasi) // ["olma", "banan"] — yangi massiv
console.log(mevalar)  // ["olma", "banan", "shaftoli"] — o'zgarishsiz qoldi`}</CodeBlock>
      <Quiz
        question={`push(), pop(), unshift(), shift() va slice() orasida qaysi biri asl massivni o'zgartirmaydi (yangi massiv qaytaradi)?`}
        options={['push()', 'pop()', 'slice()', 'shift()']}
        correctIndex={2}
        explanation={`push, pop, unshift va shift — barchasi asl massivning o'zini o'zgartiradi. slice() esa asl massivga tegmasdan, undan nusxa olib yangi massiv qaytaradi.`}
      />

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Vazifalar ro'yxatiga qo'shish">
        <p>
          <code>{`let vazifalar = ["Non olish", "Kitob o'qish"]`}</code> massivi bor. Unga{' '}
          <code>push()</code> yordamida <code>"Sport zaliga borish"</code> vazifasini
          qo'shing va yangilangan massivni <code>console.log()</code> bilan chiqaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let vazifalar = ["Non olish", "Kitob o'qish"]
vazifalar.push("Sport zaliga borish")
console.log(vazifalar)`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: Oxirgi bajarilgan vazifani olib tashlash">
        <p>
          HTML: <code>{'<button id="bajarildiTugmasi">Oxirgisini bajardim</button>'}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. Tugma bosilganda{' '}
          <code>vazifalar</code> massividan <code>pop()</code> bilan oxirgi vazifani olib
          tashlang va <code>"Bajarildi: &lt;vazifa&gt;"</code> deb <code>natija</code>ga
          yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let vazifalar = ["Non olish", "Kitob o'qish", "Sport zaliga borish"]
let bajarildiTugmasi = document.getElementById("bajarildiTugmasi")
let natijaElement = document.getElementById("natija")

bajarildiTugmasi.onclick = function () {
  let bajarilgan = vazifalar.pop()
  natijaElement.textContent = \`Bajarildi: \${bajarilgan}\`
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Navbatga mijoz qo'shish">
        <p>
          <code>{'let navbat = ["Aziz", "Vali"]'}</code> massivi bor. VIP mijoz{' '}
          <code>"Malika"</code> navbatning <strong>boshiga</strong> qo'shilishi kerak (
          <code>unshift()</code>). So'ng navbatdagi <strong>birinchi</strong> mijozga xizmat
          ko'rsatib, uni navbatdan chiqaring (<code>shift()</code>) va{' '}
          <code>"Xizmat ko'rsatilmoqda: &lt;ism&gt;"</code> deb <code>console.log()</code>{' '}
          qiling.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let navbat = ["Aziz", "Vali"]

navbat.unshift("Malika")

let xizmatKorsatilayotgan = navbat.shift()
console.log(\`Xizmat ko'rsatilmoqda: \${xizmatKorsatilayotgan}\`)
console.log(navbat) // ["Aziz", "Vali"]`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Mahsulot mavjudligini tekshirish">
        <p>
          HTML: <code>{'<input type="text" id="qidiruvInput" />'}</code>,{' '}
          <code>{'<button id="qidirTugmasi">Qidirish</button>'}</code>,{' '}
          <code>{'<p id="natija"></p>'}</code>. <code>{'let ombor = ["Kitob", "Daftar", "Ruchka"]'}</code>{' '}
          massivi bor. Tugma bosilganda <code>includes()</code> yordamida inputga kiritilgan
          nom omborda bor-yo'qligini tekshiring — bor bo'lsa "Mavjud", yo'q bo'lsa "Mavjud
          emas" deb yozing.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let ombor = ["Kitob", "Daftar", "Ruchka"]
let qidiruvInput = document.getElementById("qidiruvInput")
let qidirTugmasi = document.getElementById("qidirTugmasi")
let natijaElement = document.getElementById("natija")

qidirTugmasi.onclick = function () {
  if (ombor.includes(qidiruvInput.value)) {
    natijaElement.textContent = "Mavjud"
  } else {
    natijaElement.textContent = "Mavjud emas"
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="5-vazifa: Savatni bitta qatorda ko'rsatish">
        <p>
          <code>{'let savat = ["Non", "Sut", "Tuxum"]'}</code> massivi bor. HTML:{' '}
          <code>{'<p id="natija"></p>'}</code>. <code>join(", ")</code> yordamida savat
          tarkibini bitta matn qatorida <code>natija</code>ga chiqaring (masalan: "Savatda:
          Non, Sut, Tuxum").
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let savat = ["Non", "Sut", "Tuxum"]
let natijaElement = document.getElementById("natija")

natijaElement.textContent = \`Savatda: \${savat.join(", ")}\``}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="6-vazifa: TOP-3 reyting">
        <p>
          <code>{'let reyting = ["Aziz", "Vali", "Malika", "Nodira", "Sardor"]'}</code>{' '}
          massivi (kelib tushish o'rniga qarab tartiblangan) bor. <code>slice()</code>{' '}
          yordamida faqat birinchi uchtasini olib, yangi <code>top3</code> massiviga
          saqlang va uni <code>console.log()</code> bilan chiqaring (eslatma: asl{' '}
          <code>reyting</code> massivi o'zgarishsiz qolishi kerak).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`let reyting = ["Aziz", "Vali", "Malika", "Nodira", "Sardor"]
let top3 = reyting.slice(0, 3)

console.log(top3)     // ["Aziz", "Vali", "Malika"]
console.log(reyting)  // o'zgarishsiz: barcha 5 ta ism`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>push()</code> — oxiriga qo'shadi, <code>pop()</code> — oxiridan olib
          tashlaydi va uni qaytaradi.
        </li>
        <li>
          <code>unshift()</code> — boshiga qo'shadi, <code>shift()</code> — boshidan olib
          tashlaydi va uni qaytaradi; ikkalasi <code>push</code>/<code>pop</code>dan
          sekinroq.
        </li>
        <li>
          <code>indexOf()</code> — elementning indeksini (yoki <code>-1</code>) qaytaradi;{' '}
          <code>includes()</code> — bor-yo'qligini <code>boolean</code> sifatida qaytaradi.
        </li>
        <li>
          <code>join(ajratuvchi)</code> — massivni bitta matnga birlashtiradi.
        </li>
        <li>
          <code>slice(boshlanish, tugash)</code> — massivning bir qismini{' '}
          <strong>yangi massiv</strong> sifatida qaytaradi, asl massivni o'zgartirmaydi.
        </li>
        <li>
          <code>push</code>/<code>pop</code>/<code>unshift</code>/<code>shift</code> asl
          massivni o'zgartiradi (mutating), <code>slice()</code> esa o'zgartirmaydi
          (non-mutating) — bu farqni doim yodda tuting.
        </li>
      </KeyPoints>
    </>
  )
}
