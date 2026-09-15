import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Asinxron kod va tiplar',
  section: 'TypeScript asoslari',
}

export default function AsyncVaTiplarLesson() {
  return (
    <>
      <p>
        JavaScript'da <code>async</code>/<code>await</code> bilan allaqachon tanishsiz.
        TypeScript bu yerda ham foydali: u <code>Promise</code>ning "ichida qanday qiymat
        kelishini" aniq ifodalash imkonini beradi va tashqi manbadan (masalan, tarmoq
        so'rovidan) kelgan ma'lumotni tiplashda yordam beradi. Bu darsda{' '}
        <code>Promise&lt;T&gt;</code>, <code>fetch</code> natijasini tiplash va{' '}
        <code>try</code>/<code>catch</code> ichidagi tiplarni ko'ramiz.
      </p>

      <h2>
        <code>Promise&lt;T&gt;</code> va <code>async</code> funksiyalar
      </h2>
      <p>
        <code>Promise&lt;T&gt;</code> — kelajakda <code>T</code> tipidagi qiymat bilan
        bajariladigan (yoki xatolik bilan rad etiladigan) promise'ni bildiradi. Har qanday{' '}
        <code>async</code> funksiya avtomatik ravishda natijasini <code>Promise</code> ichiga
        o'rab qaytaradi — buni funksiya tipida qo'lda yozish shart emas, TypeScript o'zi
        xulosa qiladi:
      </p>
      <CodeBlock lang="typescript">{`async function foydalanuvchiIdOl(): Promise<number> {
  return 42 // async funksiya bu qiymatni avtomatik Promise<number> ichiga o'raydi
}

async function ishlat() {
  const id = await foydalanuvchiIdOl() // await'dan keyin id — allaqachon number, Promise emas
  console.log(id.toFixed(0))
}`}</CodeBlock>
      <p>
        E'tibor bering: <code>return 42</code> yozilgan bo'lsa ham, funksiyaning haqiqiy
        natijasi <code>number</code> emas, <code>Promise&lt;number&gt;</code> — chunki{' '}
        <code>async</code> kalit so'zi buni avtomatik shunday qiladi. <code>await</code>{' '}
        aynan shu "o'rovni" ochib, ichidagi haqiqiy qiymatni beradi.
      </p>
      <Callout type="tip" title="await faqat async funksiya ichida ishlaydi">
        <code>await</code>ni faqat <code>async</code> deb belgilangan funksiya ichida (yoki
        modul darajasidagi top-level await'da) ishlatish mumkin. Bu — TypeScript'ga xos
        emas, JavaScript'ning o'zining qoidasi, lekin async kod bilan ishlaganda doim esda
        tutish kerak.
      </Callout>

      <h2>
        <code>fetch</code> natijasini tiplash
      </h2>
      <p>
        <code>fetch</code>dan qaytgan <code>response.json()</code> natijasi TypeScript'da{' '}
        <code>Promise&lt;any&gt;</code> — chunki javob tanasi qanday tuzilishga ega ekanini
        TypeScript oldindan bila olmaydi:
      </p>
      <CodeBlock lang="typescript">{`async function foydalanuvchiOl(id: number) {
  const javob = await fetch(\`/api/users/\${id}\`)
  const malumot = await javob.json() // tipi: any — xavfli!

  console.log(malumot.ism.toUpperCase()) // Xatolik yo'q, hatto ism mavjud bo'lmasa ham
}`}</CodeBlock>
      <p>
        <code>any</code> bu yerda tip xavfsizligini butunlay yo'qqa chiqaradi. Eng oddiy
        yechim — natijani darhol aniq annotatsiya bilan belgilash:
      </p>
      <CodeBlock lang="typescript">{`interface User {
  id: number
  ism: string
}

async function foydalanuvchiOl(id: number): Promise<User> {
  const javob = await fetch(\`/api/users/\${id}\`)
  const malumot: User = await javob.json()
  return malumot
}`}</CodeBlock>
      <p>
        Bunday chaqiruvlar ko'p bo'lsa, generik yordamchi funksiya yozish qulayroq — u har
        safar aynan qaysi tip kutilayotganini chaqiruvchi tomonga beradi:
      </p>
      <CodeBlock lang="typescript">{`async function jsonOl<T>(url: string): Promise<T> {
  const javob = await fetch(url)
  return javob.json() as Promise<T>
}

async function foydalanuvchiOl(id: number) {
  const malumot = await jsonOl<User>(\`/api/users/\${id}\`)
  console.log(malumot.ism.toUpperCase()) // xavfsiz — malumot aynan User
}`}</CodeBlock>
      <Callout type="warning" title="Annotatsiya faqat va'da, tekshiruv emas">
        <code>: User</code> yoki <code>jsonOl&lt;User&gt;</code> yozish TypeScript'ga "bu
        qiymat shunday ko'rinishga ega bo'ladi" deb <strong>va'da beradi</strong> — lekin
        runtime'da serverdan haqiqatan ham shu tuzilishdagi ma'lumot kelishini{' '}
        <strong>tekshirmaydi</strong>. Ishonchsiz tashqi manbalar bilan ishlaganda buni
        runtime validatsiya kutubxonalari (masalan, Zod) bilan birga ishlatish tavsiya
        etiladi — bu mavzu ushbu kursning doirasidan tashqarida.
      </Callout>

      <h2>
        <code>try</code>/<code>catch</code> ichida <code>catch</code> parametrining tipi
      </h2>
      <p>
        JavaScript'da <code>throw</code> orqali istalgan qiymatni (nafaqat{' '}
        <code>Error</code> obyektini) tashlash mumkin. Shu sababli TypeScript{' '}
        <code>catch</code> blokidagi xatolik parametrini <code>Error</code> emas,{' '}
        <code>unknown</code> deb belgilaydi — chunki u qanday qiymat ekanini oldindan bilib
        bo'lmaydi:
      </p>
      <CodeBlock lang="typescript">{`async function malumotOl() {
  try {
    const malumot = await jsonOl<User>("/api/users/1")
    return malumot
  } catch (xato) {
    // xato — bu yerda tipi: unknown
    console.log(xato.message) // Xatolik! unknown'da to'g'ridan-to'g'ri .message yo'q
  }
}`}</CodeBlock>
      <p>
        <code>unknown</code>dan foydalanishdan oldin uni albatta narrowing orqali
        tekshirish kerak — eng keng tarqalgan usul <code>instanceof Error</code>:
      </p>
      <CodeBlock lang="typescript">{`async function malumotOl() {
  try {
    const malumot = await jsonOl<User>("/api/users/1")
    return malumot
  } catch (xato) {
    if (xato instanceof Error) {
      console.log(xato.message) // xavfsiz — xato bu yerda Error
    } else {
      console.log("Noma'lum xatolik:", xato)
    }
  }
}`}</CodeBlock>
      <Callout type="note" title="Nega any emas, unknown?">
        Agar <code>catch</code> parametri <code>any</code> bo'lganida, unga hech qanday
        tekshiruvsiz <code>.message</code> yoki boshqa istalgan xususiyatni yozib bo'lardi —
        bu xato tashlangan qiymat haqiqatan <code>Error</code> bo'lmasa, runtime'da yangi
        xatolikka olib kelardi. <code>unknown</code> esa foydalanishdan oldin narrowing'ni
        majburiy qilib, shu xavfni oldindan ushlaydi.
      </Callout>

      <Quiz
        question="TypeScript'da try/catch blokidagi catch (xato) parametrining standart tipi qanday?"
        options={['any', 'Error', 'unknown', 'never']}
        correctIndex={2}
        explanation="TypeScript catch parametrini unknown deb belgilaydi, chunki throw orqali istalgan qiymat (nafaqat Error obyekti) tashlanishi mumkin. Undan foydalanishdan oldin instanceof Error kabi tekshiruv bilan narrowing qilish kerak."
      />

      <Exercise title="Mashq">
        <p>
          <code>Post</code> nomli interfeys yarating (<code>id: number</code>,{' '}
          <code>title: string</code>). Keyin <code>postniOl(id: number): Promise&lt;Post&gt;</code>{' '}
          nomli <code>async</code> funksiya yozing — u{' '}
          <code>{'`/api/posts/${id}`'}</code> manzilidan <code>fetch</code> qilib,
          natijani <code>Post</code> sifatida qaytarsin. Funksiyani{' '}
          <code>try</code>/<code>catch</code> bilan chaqiruvchi kod yozing —{' '}
          <code>catch</code> blokida xatolikni <code>instanceof Error</code> orqali tekshirib,
          xabarini chop eting.
        </p>
        <Solution>
          <CodeBlock lang="typescript">{`interface Post {
  id: number
  title: string
}

async function postniOl(id: number): Promise<Post> {
  const javob = await fetch(\`/api/posts/\${id}\`)
  const malumot: Post = await javob.json()
  return malumot
}

async function chopEt() {
  try {
    const post = await postniOl(1)
    console.log(post.title)
  } catch (xato) {
    if (xato instanceof Error) {
      console.log("Xatolik yuz berdi:", xato.message)
    } else {
      console.log("Noma'lum xatolik:", xato)
    }
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>Promise&lt;T&gt;</code> kelajakda <code>T</code> tipidagi qiymat bilan
          bajariladigan promise'ni bildiradi; <code>async</code> funksiya natijasini
          avtomatik <code>Promise</code>ga o'raydi, <code>await</code> esa uni ochadi.
        </li>
        <li>
          <code>response.json()</code> natijasi <code>any</code> — uni generik yordamchi
          funksiya yoki aniq annotatsiya bilan kerakli tipga bog'lash kerak.
        </li>
        <li>
          Tip annotatsiyasi faqat kompilyatsiya vaqtidagi va'da — u runtime'da ma'lumot
          haqiqatan shu tuzilishga ega ekanini tekshirmaydi.
        </li>
        <li>
          <code>catch</code> parametrining tipi <code>unknown</code> — undan foydalanishdan
          oldin <code>instanceof Error</code> kabi narrowing bilan tekshirish kerak.
        </li>
      </KeyPoints>
    </>
  )
}
