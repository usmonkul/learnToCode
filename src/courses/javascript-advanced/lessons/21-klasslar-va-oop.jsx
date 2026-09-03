import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Klasslar va OOP asoslari',
  section: 'Zamonaviy JS: modullar va klasslar',
}

export default function KlasslarVaOopLesson() {
  return (
    <>
      <p>
        14-darsda oddiy obyektlar (<code>{'{ ism: "Aziz", yosh: 25 }'}</code>
        ) bilan ishlashni o'rgangan edingiz. Agar bir xil "shakl"dagi ko'plab
        obyekt yaratish kerak bo'lsa (masalan, o'nlab mahsulot, foydalanuvchi
        yoki vazifa), har birini qo'lda yozish takrorlanadigan va xatoga
        moyil bo'ladi. <strong>Klass</strong> (class) — bir xil "shakl" va
        xatti-harakatga ega obyektlarni yasash uchun{' '}
        <strong>qolip</strong> (blueprint). Bu — obyektga yo'naltirilgan
        dasturlash (OOP, Object-Oriented Programming)ning asosiy vositasi.
      </p>

      <h2>Klass yaratish va obyekt hosil qilish</h2>
      <CodeBlock lang="javascript">{`class Mahsulot {
  constructor(nom, narx) {
    this.nom = nom
    this.narx = narx
  }
}

const noutbuk = new Mahsulot("Noutbuk", 8000000)
const sichqoncha = new Mahsulot("Sichqoncha", 150000)

console.log(noutbuk.nom)   // "Noutbuk"
console.log(sichqoncha.narx) // 150000`}</CodeBlock>
      <p>
        <code>constructor</code> — klassdan <code>new</code> orqali yangi
        obyekt ("instance") yaratilganda avtomatik chaqiriladigan maxsus
        metod. <code>this</code> (03-darsda o'rgangan) — aynan yaratilayotgan
        yangi obyektga ishora qiladi.
      </p>
      <Callout type="tip" title="Klass — closure/fabrika funksiyasining muqobili">
        02-darsda <code>hisoblagichYarat()</code> kabi "fabrika
        funksiyalari" bilan bir xil (bir shakldagi obyektlar yasash)
        maqsadga xizmat qilgan edingiz. Klass — xuddi shu maqsad uchun,
        lekin ko'proq obyekt yaratish kerak bo'lganda ancha o'qish oson va
        tanish sintaksis beradi.
      </Callout>

      <h2>Metodlar — klassning "xatti-harakati"</h2>
      <p>
        Klass ichida oddiy funksiyalar ham yozish mumkin — bular{' '}
        <strong>metod</strong> deyiladi, ular avtomatik ravishda barcha
        obyektlarga (instance) tegishli bo'ladi:
      </p>
      <CodeBlock lang="javascript">{`class Mahsulot {
  constructor(nom, narx) {
    this.nom = nom
    this.narx = narx
  }

  malumot() {
    return this.nom + " — " + this.narx + " so'm"
  }

  chegirmaliNarx(foiz) {
    return this.narx - (this.narx * foiz) / 100
  }
}

const noutbuk = new Mahsulot("Noutbuk", 8000000)

console.log(noutbuk.malumot())          // "Noutbuk — 8000000 so'm"
console.log(noutbuk.chegirmaliNarx(20)) // 6400000`}</CodeBlock>
      <p>
        Metod ichida <code>this</code> — har doim{' '}
        <strong>o'sha metodni chaqirgan obyektga</strong> ishora qiladi (03-
        darsda o'rganganingiz kabi). Bu — har bir <code>Mahsulot</code>{' '}
        obyekti o'zining <code>nom</code> va <code>narx</code>i bilan
        ishlashini ta'minlaydi.
      </p>
      <Quiz
        question="class Hisob { constructor(balans) { this.balans = balans } } const a = new Hisob(100); const b = new Hisob(200); a.balans nima?"
        options={['100', '200', '300', 'undefined']}
        correctIndex={0}
        explanation="Har bir 'new Hisob(...)' chaqiruvi mustaqil, o'z holatiga ega yangi obyekt yaratadi. 'a' — balans 100 bilan yaratilgan, shuning uchun a.balans === 100, b'ning 200 qiymati unga ta'sir qilmaydi."
      />

      <h2>extends va super — meros olish (inheritance)</h2>
      <p>
        Ba'zan yangi klass, mavjud klassning barcha xususiyat va
        metodlarini "meros qilib olib", ustiga qo'shimcha narsa qo'shishi
        kerak bo'ladi. Bu — <code>extends</code> orqali qilinadi:
      </p>
      <CodeBlock lang="javascript">{`class Mahsulot {
  constructor(nom, narx) {
    this.nom = nom
    this.narx = narx
  }

  malumot() {
    return this.nom + " — " + this.narx + " so'm"
  }
}

class RaqamliMahsulot extends Mahsulot {
  constructor(nom, narx, kafolatOyi) {
    super(nom, narx) // ota klassning constructor'ini chaqiradi (nom va narxni o'rnatadi)
    this.kafolatOyi = kafolatOyi
  }

  malumot() {
    return super.malumot() + " (kafolat: " + this.kafolatOyi + " oy)"
  }
}

const telefon = new RaqamliMahsulot("Telefon", 5000000, 12)

console.log(telefon.malumot()) // "Telefon — 5000000 so'm (kafolat: 12 oy)"`}</CodeBlock>
      <Callout type="note" title="super — ikki xil vazifada">
        <code>super(...)</code> — constructor ichida ota klassning
        constructor'ini chaqiradi (bola klass o'z <code>this</code>ini
        ishlatishdan oldin <strong>albatta</strong> chaqirilishi shart).{' '}
        <code>super.metodNomi()</code> — ota klassning metodini chaqirib,
        uning natijasi ustiga qo'shimcha ish qilish uchun ishlatiladi (
        yuqoridagi misolda <code>malumot()</code>ni qayta yozib, lekin ota
        klassning versiyasidan ham foydalanib).
      </Callout>

      <h2>Real hayotiy misol: to-do loyihasini klass bilan qayta yozish</h2>
      <p>
        19-darsdagi to-do loyihasida har bir vazifa oddiy obyekt (
        <code>{'{ id, matn, bajarildi }'}</code>) edi. Klass bilan, vazifaga
        tegishli mantiqni (masalan, belgilash) ham shu yerga jamlash mumkin:
      </p>
      <CodeBlock lang="javascript">{`class Vazifa {
  constructor(matn) {
    this.id = Date.now() // 18-darsda o'rgangan noyob ID naqshi
    this.matn = matn
    this.bajarildi = false
  }

  belgilash() {
    this.bajarildi = !this.bajarildi
  }

  htmlChiqar() {
    return \`
      <li class="vazifa \${this.bajarildi ? "bajarilgan" : ""}">
        <span>\${this.matn}</span>
      </li>
    \`
  }
}

const vazifa1 = new Vazifa("Non sotib olish")
vazifa1.belgilash()

console.log(vazifa1.bajarildi) // true
console.log(vazifa1.htmlChiqar())`}</CodeBlock>
      <Callout type="tip" title="Klass shart emas — bu tanlov masalasi">
        E'tibor bering: 19-darsdagi oddiy obyekt + alohida funksiyalar
        yondashuvi ham to'g'ri, ishlaydigan kod edi. Klass — ma'lumot
        (<code>matn</code>, <code>bajarildi</code>) va u bilan bog'liq
        xatti-harakatni (<code>belgilash</code>, <code>htmlChiqar</code>)
        bitta joyga <strong>jamlash</strong> uchun qulay uslub, lekin
        JavaScriptda majburiy emas — ko'p loyihalar oddiy obyekt va
        funksiyalar bilan ham mukammal ishlaydi.
      </Callout>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: Oddiy klass yaratish">
        <p>
          <code>Talaba</code> klassini yozing — <code>constructor</code>{' '}
          <code>ism</code> va <code>ball</code>ni qabul qilsin,{' '}
          <code>otdiMi()</code> metodi <code>ball</code>ning 60 dan
          katta/tengligini <code>true</code>/<code>false</code> qaytarsin.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`class Talaba {
  constructor(ism, ball) {
    this.ism = ism
    this.ball = ball
  }

  otdiMi() {
    return this.ball >= 60
  }
}

const aziz = new Talaba("Aziz", 75)
console.log(aziz.otdiMi()) // true`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: extends va super">
        <p>
          <code>Hayvon</code> klassini yozing (<code>constructor</code>{' '}
          <code>ism</code>ni qabul qiladi, <code>ovozChiqar()</code> metodi{' '}
          <code>"..."</code> qaytaradi). Keyin <code>Mushuk</code> klassini{' '}
          <code>Hayvon</code>dan <code>extends</code> qilib yarating,{' '}
          <code>ovozChiqar()</code>ni qayta yozib <code>"Miyov!"</code>{' '}
          qaytaring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`class Hayvon {
  constructor(ism) {
    this.ism = ism
  }

  ovozChiqar() {
    return "..."
  }
}

class Mushuk extends Hayvon {
  ovozChiqar() {
    return "Miyov!"
  }
}

const pushok = new Mushuk("Pushok")
console.log(pushok.ism)         // "Pushok"
console.log(pushok.ovozChiqar()) // "Miyov!"`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: Savat klassi">
        <p>
          <code>Savat</code> klassini yozing — <code>constructor</code> bo'sh{' '}
          <code>mahsulotlar</code> massivini o'rnatsin,{' '}
          <code>qoshish(nom, narx)</code> metodi massivga yangi mahsulot
          qo'shsin, <code>jamiNarx()</code> metodi 5-darsda o'rgangan{' '}
          <code>reduce</code> yordamida barcha mahsulotlar narxining
          yig'indisini qaytarsin.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`class Savat {
  constructor() {
    this.mahsulotlar = []
  }

  qoshish(nom, narx) {
    this.mahsulotlar.push({ nom, narx })
  }

  jamiNarx() {
    return this.mahsulotlar.reduce((jami, mahsulot) => jami + mahsulot.narx, 0)
  }
}

const savat = new Savat()
savat.qoshish("Kitob", 30000)
savat.qoshish("Ruchka", 5000)

console.log(savat.jamiNarx()) // 35000`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Klass — bir xil "shakl"dagi obyektlarni yasash uchun qolip;{' '}
          <code>new KlassNomi(...)</code> orqali yangi obyekt (instance)
          yaratiladi.
        </li>
        <li>
          <code>constructor</code> — yangi obyekt yaratilganda avtomatik
          ishga tushib, boshlang'ich xususiyatlarni <code>this</code> orqali
          o'rnatadigan maxsus metod.
        </li>
        <li>
          Klass ichidagi metodlar — barcha obyektlarga tegishli bo'lgan
          funksiyalar; ularda <code>this</code> metodni chaqirgan aniq
          obyektga ishora qiladi.
        </li>
        <li>
          <code>extends</code> — bir klassni boshqasidan meros olib
          kengaytirish; <code>super(...)</code> ota klass constructor'ini,{' '}
          <code>super.metod()</code> ota klass metodini chaqiradi.
        </li>
        <li>
          Klass — ma'lumot va u bilan bog'liq xatti-harakatni bitta joyga
          jamlash uchun qulay, lekin majburiy bo'lmagan uslub.
        </li>
      </KeyPoints>
    </>
  )
}
