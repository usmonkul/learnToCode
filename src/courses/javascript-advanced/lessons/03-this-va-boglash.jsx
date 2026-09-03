import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "this kalit so'zi va uni bog'lash",
  section: 'Chuqur asoslar',
}

export default function ThisVaBoglashLesson() {
  return (
    <>
      <p>
        JavaScriptda <code>this</code> — funksiya ichida ishlatilganda, "hozir kim
        chaqiryapti" degan savolga javob beradigan maxsus kalit so'z. U boshqa
        tillardagi <code>this</code>/<code>self</code>dan farqli — qiymati funksiya{' '}
        <strong>qayerda yozilganiga</strong> emas, balki funksiya{' '}
        <strong>qanday chaqirilganiga</strong> qarab o'zgaradi. Bu — front-end
        kodida eng ko'p chalkashtiradigan mavzulardan biri, lekin uni tushunish
        event handlerlar va (keyingi darslarda) klasslar bilan ishlashda muhim.
      </p>

      <h2>this — chaqiruv usuliga bog'liq</h2>
      <p>Oddiy funksiya obyektning metodi sifatida chaqirilganda, <code>this</code> — o'sha obyektga ishora qiladi:</p>
      <CodeBlock lang="javascript">{`const foydalanuvchi = {
  ism: "Aziz",
  salomlash: function () {
    console.log("Salom, men " + this.ism)
  },
}

foydalanuvchi.salomlash() // "Salom, men Aziz" — this === foydalanuvchi`}</CodeBlock>
      <p>
        Lekin xuddi shu funksiyani obyektdan "ajratib" boshqa o'zgaruvchiga
        saqlasangiz, <code>this</code> yo'qoladi:
      </p>
      <CodeBlock lang="javascript">{`const salomlashFunksiyasi = foydalanuvchi.salomlash
salomlashFunksiyasi() // "Salom, men undefined" — this endi foydalanuvchiga ishora qilmaydi`}</CodeBlock>
      <p>
        Bu — <code>this</code>ning eng muhim xususiyati: u funksiya{' '}
        <strong>qayerda e'lon qilinganiga</strong> emas, balki{' '}
        <strong>qanday chaqirilganiga</strong> bog'liq. Yuqoridagi ikkinchi holatda
        funksiya endi obyektning metodi sifatida emas, "yolg'iz" chaqirilmoqda.
      </p>

      <h2>DOM'da this — event handler ichida</h2>
      <p>
        07-11-darslarda <code>addEventListener</code> ichida oddiy{' '}
        <code>function () {'{ }'}</code> ishlatilganda, <code>this</code> avtomatik
        ravishda <strong>hodisa biriktirilgan elementga</strong> ishora qiladi — bu
        juda foydali xususiyat:
      </p>
      <CodeBlock lang="javascript">{`const tugmalar = document.querySelectorAll(".mahsulot-tugma")

tugmalar.forEach((tugma) => {
  tugma.addEventListener("click", function () {
    this.classList.toggle("tanlangan") // this === bosilgan tugma
    console.log(this.textContent)
  })
})`}</CodeBlock>
      <p>
        Har bir tugma bosilganda, <code>this</code> aynan o'sha bosilgan tugmaga
        ishora qiladi — shuning uchun har bir tugma uchun alohida{' '}
        <code>querySelector</code> yozishga hojat qolmaydi.
      </p>

      <h2>Arrow funksiya this'ni "meros qilib olmaydi"</h2>
      <Callout type="warning" title="Bu yerda arrow funksiya boshqacha ishlaydi">
        Arrow funksiyalarning oddiy funksiyalardan asosiy farqi — ular{' '}
        <strong>o'zining <code>this</code>iga ega emas</strong>. Ular <code>this</code>ni
        atrofdagi (tashqi) kod bo'lagidan closure orqali "meros qilib oladi". Shu
        sababli yuqoridagi misolni arrow funksiya bilan yozsak, natija boshqacha
        bo'ladi:
      </Callout>
      <CodeBlock lang="javascript">{`tugma.addEventListener("click", () => {
  console.log(this) // bosilgan tugma EMAS — tashqi kod bo'lagidagi this (odatda undefined)
})`}</CodeBlock>
      <p>
        Bu — amaliy qoida bering: <strong>event elementining o'ziga murojaat qilish
        kerak bo'lganda</strong> oddiy <code>function () {'{ }'}</code> ishlating (yoki{' '}
        <code>event.target</code>ni ishlating — buni keyingi bo'limda o'rganamiz).
        Boshqa barcha hollarda arrow funksiya odatiy va tavsiya etiladigan uslub.
      </p>
      <Quiz
        question="const obyekt = { son: 5, oshir: () => { console.log(this.son) } }; obyekt.oshir() nima chiqaradi?"
        options={['5', 'undefined', '0', 'Xatolik beradi']}
        correctIndex={1}
        explanation="oshir arrow funksiya sifatida yozilgan, shuning uchun u o'z this'iga ega emas — tashqi (obyektdan yuqoridagi) this'ni ishlatadi, u yerda 'son' yo'q, shuning uchun undefined chiqadi."
      />

      <h2>call, apply, bind — this'ni qo'lda belgilash</h2>
      <p>
        Ba'zan funksiyani boshqa obyekt bilan "ishlatish" kerak bo'ladi —{' '}
        <code>this</code>ni qo'lda belgilash uchun uchta metod mavjud:{' '}
        <code>call</code>, <code>apply</code> va <code>bind</code>.
      </p>
      <p>
        <code>call(obyekt, arg1, arg2, ...)</code> — funksiyani darhol chaqiradi,{' '}
        <code>this</code>ni birinchi argument sifatida beriladigan obyektga
        o'rnatadi:
      </p>
      <CodeBlock lang="javascript">{`function tanishtir(shahar) {
  console.log(this.ism + " - " + shahar + "dan")
}

const foydalanuvchi = { ism: "Malika" }

tanishtir.call(foydalanuvchi, "Samarqand") // "Malika - Samarqanddan"`}</CodeBlock>
      <p>
        <code>apply</code> — <code>call</code> bilan bir xil, faqat argumentlar
        alohida emas, massiv sifatida beriladi:
      </p>
      <CodeBlock lang="javascript">{`tanishtir.apply(foydalanuvchi, ["Samarqand"]) // xuddi shu natija`}</CodeBlock>
      <p>
        <code>bind</code> esa funksiyani <strong>darhol chaqirmaydi</strong> — u{' '}
        <code>this</code> "yopishtirib qo'yilgan" <strong>yangi funksiya</strong>{' '}
        qaytaradi, uni keyinroq chaqirish mumkin:
      </p>
      <CodeBlock lang="javascript">{`const malikaTanishtir = tanishtir.bind(foydalanuvchi)

malikaTanishtir("Buxoro") // "Malika - Buxorodan" — keyinroq chaqirilsa ham this saqlanadi`}</CodeBlock>
      <p>
        <code>bind</code> — event handlerlarda ayniqsa foydali, chunki{' '}
        <code>addEventListener</code>ga funksiyani <strong>chaqirmasdan</strong>{' '}
        (qavssiz) berish kerak, lekin baribir kerakli <code>this</code>ni saqlab
        qolish kerak bo'lgan holatlarda ishlatiladi:
      </p>
      <CodeBlock lang="javascript">{`const savat = {
  mahsulotlar: [],
  qoshish: function (nom) {
    this.mahsulotlar.push(nom)
    console.log(this.mahsulotlar)
  },
}

const tugma = document.getElementById("qoshishTugmasi")

// this yo'qolib qolmasligi uchun bind ishlatiladi:
tugma.addEventListener("click", savat.qoshish.bind(savat, "Noutbuk"))`}</CodeBlock>
      <Callout type="tip" title="Amaliyotda ko'proq nima ishlatiladi?">
        Zamonaviy kodda <code>bind</code>ga qaraganda arrow funksiya ko'proq
        ishlatiladi (chunki u <code>this</code>ni tabiiy ravishda "meros qiladi"),
        lekin <code>call</code>/<code>apply</code>/<code>bind</code>ni tanish kerak
        — ular ko'plab kutubxonalar va eski kodlarda uchraydi, va{' '}
        <code>this</code>ning qanday ishlashini chuqur tushunishga yordam beradi.
      </Callout>

      <h2>Amaliy misol: bir nechta kartochka, this bilan boshqarish</h2>
      <p>
        HTML: bir nechta <code>{'<div class="mahsulot" data-narx="15000">'}</code>,
        har birida <code>{'<button class="savatga-tugma">Savatga</button>'}</code>.{' '}
        <code>this</code>dan foydalanib, bosilgan tugmaning "ota" elementidagi
        narxni o'qib olamiz:
      </p>
      <CodeBlock lang="javascript">{`document.querySelectorAll(".savatga-tugma").forEach((tugma) => {
  tugma.addEventListener("click", function () {
    const mahsulot = this.closest(".mahsulot") // keyingi bo'limda chuqur o'rganamiz
    const narx = Number(mahsulot.dataset.narx)

    console.log("Savatga qo'shildi:", narx, "so'm")
    this.textContent = "Qo'shildi ✓"
  })
})`}</CodeBlock>

      <h2>Amaliyot</h2>

      <Exercise title="1-vazifa: this'ni bashorat qiling">
        <p>
          Quyidagi ikki kod bo'lagi bir xil natija berishini yoki bermasligini
          aniqlang va sababini tushuntiring:
        </p>
        <CodeBlock lang="javascript">{`const a = { son: 1, korsat: function () { console.log(this.son) } }
const b = { son: 2, korsat: () => { console.log(this.son) } }

a.korsat()
b.korsat()`}</CodeBlock>
        <Solution>
          <p>
            <code>a.korsat()</code> — <code>1</code> chiqadi, chunki oddiy funksiya{' '}
            <code>this</code>ni chaqirilgan obyektdan (<code>a</code>) oladi.{' '}
            <code>b.korsat()</code> — <code>undefined</code> chiqadi, chunki arrow
            funksiya o'z <code>this</code>iga ega emas, u tashqi (obyektdan
            tashqaridagi) <code>this</code>ni ishlatadi.
          </p>
        </Solution>
      </Exercise>

      <Exercise title="2-vazifa: bind bilan xush kelibsiz funksiyasi">
        <p>
          <code>xushkelibsiz</code> funksiyasini yozing — u <code>this.ism</code>ni
          ishlatib "Xush kelibsiz, [ism]!" deb chiqaradi. Keyin{' '}
          <code>{'{ ism: "Vali" }'}</code> obyekti bilan <code>bind</code>{' '}
          qilib, yangi <code>valigaXushkelibsiz</code> funksiyasini yarating va
          chaqiring.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`function xushkelibsiz() {
  console.log("Xush kelibsiz, " + this.ism + "!")
}

const valigaXushkelibsiz = xushkelibsiz.bind({ ism: "Vali" })

valigaXushkelibsiz() // "Xush kelibsiz, Vali!"`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="3-vazifa: call bilan qarzga olingan metod">
        <p>
          <code>{'{ ism: "Kitob", narxKorsat: function() { console.log(this.ism + ": " + this.narx + " so\'m") } }'}</code>{' '}
          obyektidagi <code>narxKorsat</code> metodini <code>call</code> yordamida{' '}
          <code>{'{ ism: "Daftar", narx: 5000 }'}</code> obyektiga "qarzga bering" —
          ya'ni uni shu ikkinchi obyekt uchun ishlating.
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`const kitob = {
  ism: "Kitob",
  narxKorsat: function () {
    console.log(this.ism + ": " + this.narx + " so'm")
  },
}

const daftar = { ism: "Daftar", narx: 5000 }

kitob.narxKorsat.call(daftar) // "Daftar: 5000 so'm"`}</CodeBlock>
        </Solution>
      </Exercise>

      <Exercise title="4-vazifa: Tugmalar ro'yxatida this bilan tanlash">
        <p>
          HTML: bir nechta <code>{'<button class="rang-tugma">'}</code>, har biri
          o'z rangi bilan. Bosilgan tugmaga <code>"tanlangan"</code> klassini
          qo'shib, qolgan barcha tugmalardan shu klassni olib tashlaydigan kodni{' '}
          <code>this</code>dan foydalanib yozing (oddiy <code>function</code>{' '}
          ishlating, arrow emas).
        </p>
        <Solution>
          <CodeBlock lang="javascript">{`document.querySelectorAll(".rang-tugma").forEach((tugma) => {
  tugma.addEventListener("click", function () {
    document.querySelectorAll(".rang-tugma").forEach((t) => t.classList.remove("tanlangan"))
    this.classList.add("tanlangan")
  })
})`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>this</code>ning qiymati funksiya <strong>qanday chaqirilganiga</strong>{' '}
          bog'liq, funksiya qayerda yozilganiga emas.
        </li>
        <li>
          Metod obyekt orqali chaqirilganda (<code>obyekt.metod()</code>),{' '}
          <code>this</code> shu obyektga ishora qiladi; DOM event handlerida oddiy{' '}
          <code>function</code> ichida <code>this</code> — hodisa biriktirilgan
          elementga ishora qiladi.
        </li>
        <li>
          Arrow funksiyalar o'z <code>this</code>iga ega emas — ular <code>this</code>ni
          atrofdagi kod bo'lagidan meros qiladi, shuning uchun event elementiga
          murojaat kerak bo'lganda arrow o'rniga oddiy funksiya ishlatiladi.
        </li>
        <li>
          <code>call</code>/<code>apply</code> funksiyani darhol{' '}
          <code>this</code>ni belgilab chaqiradi (farqi — argumentlar berilishi:
          alohida yoki massiv sifatida); <code>bind</code> esa <code>this</code>{' '}
          "yopishtirilgan" yangi funksiya qaytaradi, keyinroq chaqirish uchun.
        </li>
      </KeyPoints>
    </>
  )
}
