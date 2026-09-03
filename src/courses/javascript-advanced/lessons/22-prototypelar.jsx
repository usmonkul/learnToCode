import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Prototype va prototypal inheritance',
  section: 'Zamonaviy JS: modullar va klasslar',
}

export default function PrototypelarLesson() {
  return (
    <>
      <p>
        O'tgan darsda <code>class</code> sintaksisini o'rgandik. Bu qism —
        pardaning orqasiga bir qadam: <code>class</code> aslida{' '}
        <strong>yangi mexanizm emas</strong>, u JavaScriptning eskidan
        mavjud bo'lgan <strong>prototype</strong> tizimi ustiga qurilgan
        "chiroyli qobiq" (syntactic sugar). Buni tushunish — nafaqat
        JavaScriptni chuqurroq bilish uchun, balki massiv/matn metodlari
        (<code>map</code>, <code>slice</code> va h.k.) qayerdan "kelib
        chiqishini" tushunish uchun ham foydali.
      </p>

      <h2>Har bir obyektning "yashirin" havolasi bor</h2>
      <p>
        JavaScriptdagi har bir obyekt boshqa bir obyektga — o'zining{' '}
        <strong>prototype</strong>iga — yashirin havolaga ega. Agar
        obyektdan xususiyat/metod so'ralsa-yu, u obyektning o'zida
        topilmasa, JavaScript uni prototype'dan qidiradi:
      </p>
      <CodeBlock lang="javascript">{`const massiv = [1, 2, 3]

console.log(massiv.map) // function — lekin biz "map"ni massivning o'ziga yozmagan edik!`}</CodeBlock>
      <Callout type="note" title="map qayerdan keladi?">
        <code>massiv</code> obyektining o'zida <code>map</code> metodi{' '}
        <strong>yo'q</strong>. Lekin JavaScript uni topolmagach,{' '}
        <code>massiv</code>ning prototype'iga (<code>Array.prototype</code>)
        qaraydi — va aynan o'sha yerda barcha massiv metodlari (
        <code>map</code>, <code>filter</code>, <code>push</code> va h.k.)
        <strong> bitta marta</strong> yozilgan bo'ladi. Har bir yangi massiv
        o'zining nusxasini olmaydi — ular hammasi bitta umumiy prototype'ga
        "havola" qiladi.
      </Callout>

      <h2>Object.create — prototype'ni qo'lda ko'rish</h2>
      <p>
        Prototype qanday ishlashini <code>class</code>siz, to'g'ridan-to'g'ri
        ko'rsak:
      </p>
      <CodeBlock lang="javascript">{`const hayvonPrototype = {
  ovozChiqar() {
    return this.ovoz + "!"
  },
}

const mushuk = Object.create(hayvonPrototype) // "mushuk"ning prototype'i — hayvonPrototype
mushuk.ovoz = "Miyov"

console.log(mushuk.ovozChiqar()) // "Miyov!" — mushukning o'zida yo'q metod, prototype'dan topildi`}</CodeBlock>
      <p>
        <code>mushuk</code> obyektining o'zida faqat <code>ovoz</code>{' '}
        xususiyati bor. <code>ovozChiqar()</code> chaqirilganda, JavaScript
        avval <code>mushuk</code>ning o'zidan qidiradi (topolmaydi), keyin
        uning prototype'i — <code>hayvonPrototype</code>dan topadi.
      </p>
      <Quiz
        question="const a = [1, 2, 3]; a.push metodi qayerdan 'keladi'?"
        options={[
          "Har bir massiv o'z push metodining alohida nusxasini yaratadi",
          "Array.prototype'dan — barcha massivlar shu bitta umumiy obyektga havola qiladi",
          "push — JavaScript tilining maxsus kalit so'zi, obyekt emas",
          "push global window obyektida saqlanadi",
        ]}
        correctIndex={1}
        explanation="push, map, filter kabi barcha massiv metodlari Array.prototype'da bitta marta yozilgan. Har bir yangi massiv o'z metodlarining nusxasini olmaydi — ular JavaScriptning prototype zanjiri orqali bitta umumiy Array.prototype'ga murojaat qiladi, bu xotirani tejaydi."
      />

      <h2>class — prototype ustiga qurilgan qobiq</h2>
      <p>
        O'tgan darsdagi <code>class Mahsulot</code> aslida "sahna orqasida"
        xuddi shu prototype mexanizmi bilan ishlaydi. Ikkalasini
        solishtiramiz:
      </p>
      <CodeBlock lang="javascript">{`// class bilan (o'tgan darsdan tanish):
class Mahsulot {
  constructor(nom) {
    this.nom = nom
  }
  malumot() {
    return "Mahsulot: " + this.nom
  }
}

// Xuddi shu narsa, faqat "eski", prototype uslubida yozilsa:
function MahsulotEski(nom) {
  this.nom = nom
}

MahsulotEski.prototype.malumot = function () {
  return "Mahsulot: " + this.nom
}

const a = new Mahsulot("Noutbuk")
const b = new MahsulotEski("Noutbuk")

console.log(a.malumot()) // "Mahsulot: Noutbuk"
console.log(b.malumot()) // "Mahsulot: Noutbuk" — bir xil natija!`}</CodeBlock>
      <Callout type="tip" title="Nega class ixtiro qilindi, agar u faqat 'qobiq' bo'lsa?">
        <code>MahsulotEski.prototype.malumot = function () {'{ }'}</code>{' '}
        uslubi ishlaydi, lekin yozish noqulay va meros olish (
        <code>extends</code>) bilan ishlash yanada murakkablashadi.{' '}
        <code>class</code> sintaksisi xuddi shu prototype mexanizmini{' '}
        <strong>tanish, boshqa tillarga o'xshash</strong> ko'rinishda taqdim
        etadi — texnik jihatdan hech narsa o'zgarmaydi, faqat yozish va
        o'qish ancha osonlashadi.
      </Callout>

      <h2>Nega buni bilish foydali?</h2>
      <p>
        Prototype tushunchasi amaliyotda ikkita joyda foydali bo'ladi:
      </p>
      <ol>
        <li>
          Xatolik xabarlarini tushunish: <code>"x.y is not a
          function"</code> — bu <code>y</code> metodi <code>x</code>ning
          o'zida ham, uning prototype zanjirida ham topilmaganini
          bildiradi.
        </li>
        <li>
          Massiv/matn metodlari qayerdan kelishini bilish — ular sizning
          kodingizda emas, <code>Array.prototype</code>/
          <code>String.prototype</code>da "bir marta" yozilgan va{' '}
          <strong>barcha</strong> massiv/matnlar ularga bepul kirish
          huquqiga ega.
        </li>
      </ol>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Object.create bilan prototype yaratish">
        <p>
          <code>transportPrototype</code> obyektini yarating, unda{' '}
          <code>tavsif()</code> metodi <code>this.turi + " harakatlanadi"</code>
          ni qaytarsin. <code>Object.create</code> yordamida{' '}
          <code>velosiped</code> obyektini yarating (<code>turi</code>{' '}
          xususiyatini <code>"Velosiped"</code> qilib), va{' '}
          <code>tavsif()</code>ni chaqiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const transportPrototype = {
  tavsif() {
    return this.turi + " harakatlanadi"
  },
}

const velosiped = Object.create(transportPrototype)
velosiped.turi = "Velosiped"

console.log(velosiped.tavsif()) // "Velosiped harakatlanadi"`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: class va prototype'ning bir xilligi">
        <p>
          Quyidagi <code>class</code>ni <code>function</code> +{' '}
          <code>.prototype</code> uslubiga o'girib yozing:
        </p>
        <CodeBlock lang="javascript">{`class Hisoblagich {
  constructor() {
    this.son = 0
  }
  ortir() {
    this.son++
  }
}`}</CodeBlock>
        <Solution>
          <CodeBlock lang="javascript">{`function Hisoblagich() {
  this.son = 0
}

Hisoblagich.prototype.ortir = function () {
  this.son++
}

const h = new Hisoblagich()
h.ortir()
h.ortir()
console.log(h.son) // 2`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Har bir JavaScript obyekti boshqa obyektga (prototype'iga)
          yashirin havolaga ega; obyektning o'zida topilmagan
          xususiyat/metod prototype'dan qidiriladi.
        </li>
        <li>
          Massiv, matn va boshqa yorliq metodlari (<code>map</code>,{' '}
          <code>slice</code> va h.k.) har bir obyektda emas, bitta umumiy{' '}
          <code>Array.prototype</code>/<code>String.prototype</code>da
          saqlanadi.
        </li>
        <li>
          <code>class</code> — prototype mexanizmi ustiga qurilgan, uni
          o'qish va yozishni osonlashtiruvchi sintaksis; texnik jihatdan
          ikkalasi bir xil ishlaydi.
        </li>
        <li>
          <code>Object.create(prototype)</code> — prototype zanjirini{' '}
          <code>class</code>siz, to'g'ridan-to'g'ri qo'lda ko'rsatish
          usuli.
        </li>
      </KeyPoints>
    </>
  )
}
