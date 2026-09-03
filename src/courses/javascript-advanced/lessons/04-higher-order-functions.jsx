import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Yuqori darajali funksiyalar (higher-order functions)',
  section: 'Chuqur asoslar',
}

export default function HigherOrderFunctionsLesson() {
  return (
    <>
      <p>
        16-darsda funksiyani <strong>o'zgaruvchiga saqlash</strong> mumkinligini
        ko'rgan edingiz (arrow funksiyalar). JavaScriptda funksiyalar aslida{' '}
        <strong>oddiy qiymatlar</strong> kabi — sonlar yoki matnlar kabi —
        o'zgaruvchiga saqlanishi, boshqa funksiyaga argument sifatida berilishi va
        hatto funksiyadan <code>return</code> qilinishi mumkin. Bu bo'limda shu
        g'oyani rasmiylashtiramiz: <strong>yuqori darajali funksiya</strong>{' '}
        (higher-order function, HOF) — boshqa funksiyani argument sifatida qabul
        qiladigan yoki funksiya qaytaradigan funksiya. Bu tushuncha keyingi darsdagi{' '}
        <code>map</code>/<code>filter</code>/<code>reduce</code> kabi zamonaviy
        massiv metodlarining asosini tashkil qiladi.
      </p>

      <h2>Funksiyani argument sifatida berish</h2>
      <p>
        Siz buni allaqachon ishlatgansiz — <code>addEventListener</code>ning
        ikkinchi argumenti aynan funksiya edi:
      </p>
      <CodeBlock lang="javascript">{`tugma.addEventListener("click", function () {
  console.log("Bosildi!")
})`}</CodeBlock>
      <p>
        <code>addEventListener</code> — bu yuqori darajali funksiyaning eng yaqin
        misoli: u sizning funksiyangizni "saqlab qo'yadi" va kerakli vaqtda (tugma
        bosilganda) o'zi chaqiradi. O'zimiz ham xuddi shunday funksiya yozishimiz
        mumkin:
      </p>
      <CodeBlock lang="javascript">{`function ikkiMartaBajar(funksiya) {
  funksiya()
  funksiya()
}

ikkiMartaBajar(() => console.log("Salom!"))
// "Salom!"
// "Salom!"`}</CodeBlock>
      <p>
        <code>ikkiMartaBajar</code> — o'zi nima qilishni bilmaydi, u faqat{' '}
        <strong>o'ziga berilgan funksiyani</strong> ikki marta ishga tushiradi. Bu —
        HOFning kuchi: xulq-atvorni (nima qilishni) chaqiruvchi tomonga qoldirib,
        umumiy naqshni (necha marta, qachon) qayta ishlatiladigan qilib yozish.
      </p>

      <h2>Argument sifatida berilgan funksiyaga qiymat uzatish</h2>
      <p>
        HOF o'ziga berilgan funksiyaga foydali ma'lumot ham uzatishi mumkin.
        Masalan, massivning har bir elementini "aylanib chiqadigan" o'zimizning
        oddiy funksiyamiz:
      </p>
      <CodeBlock lang="javascript">{`function herBiriUchun(massiv, funksiya) {
  for (let i = 0; i < massiv.length; i++) {
    funksiya(massiv[i], i)
  }
}

const mahsulotlar = ["Noutbuk", "Sichqoncha", "Klaviatura"]

herBiriUchun(mahsulotlar, (mahsulot, indeks) => {
  console.log(indeks + ": " + mahsulot)
})
// 0: Noutbuk
// 1: Sichqoncha
// 2: Klaviatura`}</CodeBlock>
      <Callout type="note" title="Tanish tuyuladimi?">
        Aynan shu naqsh — massivni aylanib, har bir elementga funksiya chaqirish —
        JavaScriptning o'zida <code>forEach</code> nomi bilan tayyor mavjud (buni
        oldingi darslarda ko'rgan edingiz). Keyingi darsda <code>forEach</code>,{' '}
        <code>map</code>, <code>filter</code> va <code>reduce</code>ni chuqur
        o'rganamiz — ularning barchasi aynan shu HOF g'oyasiga asoslangan.
      </Callout>

      <h2>Funksiya qaytaruvchi funksiya (recap)</h2>
      <p>
        O'tgan darsda closure orqali funksiya qaytaruvchi funksiyalarni ko'rgan
        edingiz — bu ham HOFning bir turi:
      </p>
      <CodeBlock lang="javascript">{`function chegirmaHisoblovchiYarat(foiz) {
  return (narx) => narx - (narx * foiz) / 100
}

const yigirmaFoizChegirma = chegirmaHisoblovchiYarat(20)
const ellikFoizChegirma = chegirmaHisoblovchiYarat(50)

console.log(yigirmaFoizChegirma(100000)) // 80000
console.log(ellikFoizChegirma(100000))   // 50000`}</CodeBlock>
      <p>
        Bu — real do'kon ilovalarida juda foydali naqsh: turli chegirma
        turlari (mavsumiy, VIP mijoz, birinchi xarid) uchun har safar yangi
        funksiya yozish o'rniga, bitta "funksiya fabrikasi"dan foydalanamiz.
      </p>
      <Quiz
        question="function ishla(f) { return f(f(2)) } ishla(x => x + 3) nima qaytaradi?"
        options={['5', '8', '2', 'Xatolik beradi']}
        correctIndex={1}
        explanation="ishla(f) — f(f(2)) ni bajaradi. Avval f(2) = 2 + 3 = 5, keyin f(5) = 5 + 3 = 8. f funksiyasi ikki marta ketma-ket chaqirilgan."
      />

      <h2>Real hayotiy misol: forma validatsiyasi qoidalari</h2>
      <p>
        HOF'lar forma validatsiyasini juda moslashuvchan qiladi — har bir
        maydon uchun turli "qoida funksiyalari"ni ro'yxat sifatida berish mumkin:
      </p>
      <CodeBlock lang="javascript">{`const boshQatorEmas = (qiymat) => qiymat.trim().length > 0
const minimalUzunlik = (uzunlik) => (qiymat) => qiymat.length >= uzunlik
const faqatRaqam = (qiymat) => /^\\d+$/.test(qiymat)

function maydonniTekshir(qiymat, qoidalar) {
  for (const qoida of qoidalar) {
    if (!qoida(qiymat)) return false
  }
  return true
}

const parolInput = document.getElementById("parol").value

const parolTogri = maydonniTekshir(parolInput, [boshQatorEmas, minimalUzunlik(8)])
console.log(parolTogri) // true yoki false — barcha qoidalarga mos kelsagina true`}</CodeBlock>
      <p>
        Diqqat qiling: <code>minimalUzunlik</code> — funksiya qaytaruvchi
        funksiya (xuddi chegirma misoli kabi), shuning uchun <code>minimalUzunlik(8)</code>{' '}
        qoidalar ro'yxatiga to'g'ridan-to'g'ri qo'yiladigan tayyor tekshiruvchi
        funksiyani beradi. Bu naqsh — kelajakda validatsiya qoidalarini{' '}
        qayta yozmasdan, faqat ro'yxatga qo'shib/olib tashlab boshqarish imkonini
        beradi.
      </p>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: takrorlovchi funksiya">
        <p>
          <code>nMartaBajar(n, funksiya)</code> nomli funksiya yozing — u{' '}
          <code>funksiya</code>ni <code>n</code> marta chaqiradi, har safar
          joriy iteratsiya raqamini (0dan boshlab) argument sifatida uzatib.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function nMartaBajar(n, funksiya) {
  for (let i = 0; i < n; i++) {
    funksiya(i)
  }
}

nMartaBajar(3, (i) => console.log("Marta: " + i))
// Marta: 0
// Marta: 1
// Marta: 2`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: shart bo'yicha bajarish">
        <p>
          <code>agarBajar(shart, funksiya)</code> nomli funksiya yozing —{' '}
          <code>shart</code> (boolean) <code>true</code> bo'lsagina{' '}
          <code>funksiya</code>ni chaqiradi. Uni sonning musbat ekanini
          tekshirib, faqat musbat bo'lsa konsolga chiqarish uchun ishlating.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function agarBajar(shart, funksiya) {
  if (shart) funksiya()
}

const son = 7
agarBajar(son > 0, () => console.log(son + " — musbat son"))`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: narx formatlovchi fabrika">
        <p>
          <code>valyutaFormatlovchiYarat(belgi)</code> funksiyasini yozing — u{' '}
          <code>belgi</code>ni (masalan, <code>"so'm"</code> yoki{' '}
          <code>"$"</code>) "eslab qoladigan" yangi funksiya qaytaradi; bu
          yangi funksiya sonni qabul qilib, <code>"15000 so'm"</code> kabi
          matn qaytaradi.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function valyutaFormatlovchiYarat(belgi) {
  return (son) => son + " " + belgi
}

const somFormatla = valyutaFormatlovchiYarat("so'm")
const dollarFormatla = valyutaFormatlovchiYarat("$")

console.log(somFormatla(15000))  // "15000 so'm"
console.log(dollarFormatla(20))  // "20 $"`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: tugmalar ro'yxatiga umumiy handler">
        <p>
          HTML: bir nechta <code>{'<button class="amal-tugma" data-amal="ochirish">O\'chirish</button>'}</code>{' '}
          tugmasi (turli <code>data-amal</code> qiymatlari bilan).{' '}
          <code>tugmaTayyorla(tugma, amallar)</code> nomli funksiya yozing — bu
          yerda <code>amallar</code> — obyekt, kalitlari <code>data-amal</code>{' '}
          qiymatlariga mos keladi, qiymatlari esa shu amal bosilganda chaqiriladigan
          funksiyalar. Funksiya tugmaga <code>click</code> listener biriktirib,{' '}
          <code>this.dataset.amal</code>ga mos amalni chaqirsin.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function tugmaTayyorla(tugma, amallar) {
  tugma.addEventListener("click", function () {
    const amal = this.dataset.amal
    if (amallar[amal]) amallar[amal]()
  })
}

const amallar = {
  ochirish: () => console.log("O'chirildi"),
  tahrirlash: () => console.log("Tahrirlash rejimi"),
}

document.querySelectorAll(".amal-tugma").forEach((tugma) => {
  tugmaTayyorla(tugma, amallar)
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          JavaScriptda funksiyalar oddiy qiymatlar kabi — o'zgaruvchiga
          saqlanadi, argument sifatida beriladi, funksiyadan qaytariladi.
        </li>
        <li>
          Yuqori darajali funksiya (HOF) — boshqa funksiyani argument sifatida
          qabul qiladigan yoki funksiya qaytaradigan funksiya;{' '}
          <code>addEventListener</code> va <code>forEach</code> — HOFga misol.
        </li>
        <li>
          Funksiya qaytaruvchi funksiyalar (funksiya fabrikalari) closure bilan
          birga ishlatilib, moslashuvchan, qayta ishlatiladigan kod yaratadi
          (masalan, chegirma yoki valyuta formatlovchilar).
        </li>
        <li>
          HOFlar validatsiya qoidalari, event handlerlar va kelajakda{' '}
          <code>map</code>/<code>filter</code>/<code>reduce</code> kabi zamonaviy
          massiv metodlarining asosini tashkil qiladi.
        </li>
      </KeyPoints>
    </>
  )
}
