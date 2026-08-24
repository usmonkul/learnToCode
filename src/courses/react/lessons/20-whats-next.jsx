import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Xulosa va keyingi qadamlar',
  section: 'Amaliy loyiha',
}

export default function CourseWrapUpLesson() {
  return (
    <>
      <p>
        Shu kursni boshlaganimizda, komponent — bu ekranning bir bo'lagini tasvirlab beruvchi
        oddiy JavaScript funksiyasi ekanini ko'rgan edik. Shundan keyin bosqichma-bosqich
        qatlam ustiga qatlam qo'shib bordik: avval komponentga tashqaridan ma'lumot uzatishni
        (<strong>props</strong>) va JSX'ning o'zini komponent ichiga joylashtirishni (
        <strong>children</strong> va composition) o'rgandik. So'ng komponentni "jonlantirdik" —{' '}
        <strong>useState</strong> orqali vaqt o'tishi bilan o'zgaruvchi ma'lumotni saqlashni, va{' '}
        <strong>event handler</strong>lar orqali foydalanuvchi harakatlariga javob berishni,
        shu jumladan controlled forma va inputlarni qurishni ko'rdik.
      </p>
      <p>
        Keyin ma'lumot o'zgarganda ekranning o'zi qanday o'zgarishini — <strong>shartli
        render</strong> (<code>&&</code>, ternary) va <strong>ro'yxatlarni</strong>{' '}
        <code>.map()</code> hamda <code>key</code> yordamida chizishni — o'rgandik. Undan
        keyin komponentni React dunyosidan tashqariga — tarmoq so'rovlari, taymerlar, DOM'ning
        o'ziga — bog'lashni <strong>useEffect</strong> va <strong>useRef</strong> orqali
        ko'rdik. So'ngra state boshqaruvining kattaroq naqshlariga o'tdik: state'ni yuqoriga
        ko'tarish (lifting state up), murakkabroq state mantig'ini <strong>useReducer</strong>{' '}
        bilan tartibga solish, takrorlanadigan mantiqni <strong>custom hook</strong>larga
        chiqarish va <strong>useContext</strong> orqali state'ni komponent daraxti bo'ylab
        "prop drilling"siz uzatish. Nihoyat, hammasini bitta amaliy loyihada — Vazifalar
        ro'yxati ilovasida — birlashtirdik: state shakli, immutable yangilash, formalar va
        filtrlash.
      </p>
      <p>
        Bu — React'ning asosiy grammatikasi. Undan keyingi hamma narsa (marshrutlash, katta
        loyihalarda state'ni tashkil qilish, testlash va boshqalar) — aynan shu grammatika
        ustiga quriladi, uni almashtirmaydi.
      </p>

      <h2>React ekotizimida keyingi qadamlar</h2>
      <p>
        Bu kurs faqat React'ning o'zini — komponentlar, props, state, effektlar — qamrab oldi.
        Haqiqiy loyihalarda odatda yana bir nechta narsa kerak bo'ladi. Quyidagilar bu kursda{' '}
        <strong>o'rgatilmagan</strong>, lekin React bilan ishlaganda tez-tez uchraydigan
        yo'nalishlar — ular haqida faqat umumiy tasavvur berish uchun sanab o'tamiz:
      </p>
      <ul>
        <li>
          <strong>Ko'p sahifali navigatsiya (routing).</strong> Bir sahifali ilova (SPA) ichida
          "sahifalar" orasida URL orqali o'tishni ta'minlaydigan router kutubxonasi (masalan,
          React Router) — bu kursda ishlatilgan lekin o'rgatilmagan; har bir "sahifa" hozircha
          alohida darsning o'zi edi.
        </li>
        <li>
          <strong>Katta masshtabda state almashish.</strong> <code>useContext</code> kichik va
          o'rta loyihalar uchun yetarli, lekin juda katta ilovalarda ko'pincha maxsus
          state-boshqaruv kutubxonalari (masalan, Zustand) ishlatiladi — ular
          performance va tashkil etish jihatidan qo'shimcha imkoniyatlar beradi.
        </li>
        <li>
          <strong>Statik tiplashtirish.</strong> TypeScript — JavaScript ustiga tip
          tekshiruvini qo'shadigan til kengaytmasi; katta jamoaviy loyihalarda xatolarni
          yozish bosqichidayoq topishga yordam beradi.
        </li>
        <li>
          <strong>Avtomatik testlash.</strong> Komponentlarning to'g'ri ishlashini qo'lda emas,
          balki avtomatik skriptlar orqali tekshirish — komponent testlari va
          end-to-end testlar shu yo'nalishga kiradi.
        </li>
        <li>
          <strong>To'liq stack freymvorklar.</strong> Next.js kabi freymvorklar React'ning
          ustiga server-side render qilish, fayl asosidagi routing va backend bilan integratsiya
          kabi qo'shimcha imkoniyatlarni qo'shadi — kattaroq, production darajasidagi
          ilovalarda tez-tez uchraydi.
        </li>
      </ul>
      <Callout type="note" title="Bu ro'yxat — xarita, jadval emas">
        Yuqoridagilar hozircha shu platformaning bir qismi emas — bu shunchaki React
        ekotizimida odatda qanday yo'nalishlar borligi haqida umumiy mo'ljal. Qaysi birini
        qachon o'rganish kerakligini loyihangizning ehtiyoji hal qiladi: masalan, ilovangizda
        bir nechta sahifa kerak bo'lsa — routing, jamoaviy loyihada xatolarni kamaytirish kerak
        bo'lsa — TypeScript.
      </Callout>

      <h2>Endi nima qilish kerak?</h2>
      <p>
        Eng yaxshi keyingi qadam — yangi mavzuni o'qishdan oldin, shu kursda qurgan Vazifalar
        ro'yxati ilovasini o'zingiz davom ettirish. Kichik, aniq maqsadli qo'shimcha
        funksiyalar — tahrirlash, saralash, mahalliy saqlash (<code>localStorage</code>) —
        aynan shu darslarda ko'rgan naqshlarni (state, immutable yangilash, controlled input)
        yangi vaziyatlarda qo'llashga majbur qiladi, va bu bilim eng mustahkam aynan shunday
        mashq qilish orqali o'rnashadi.
      </p>

      <Exercise title="Mashq (ochiq)">
        <p>
          18—19-darslarda qurgan <code>TodoApp</code>'ga o'zingiz yana bitta funksiya qo'shing —
          masalan, <strong>tahrirlash (edit)</strong> imkoniyati: foydalanuvchi vazifa matnini
          bosganda u inputga aylanadi, va yangi matnni kiritib, Enter bosilganda yoki input'dan
          chiqib ketilganda (blur) vazifa yangilanadi. Bu — bitta "to'g'ri" yechimi bo'lmagan
          ochiq mashq; muhimi — qaysi yondashuvni tanlashingizdan qat'i nazar, state'ni hamon
          immutable tarzda yangilang.
        </p>
        <Solution>
          <p>
            Bitta mumkin bo'lgan yondashuv: har bir vazifa uchun "tahrirlanyaptimi" degan
            alohida holatni kuzatib borish o'rniga, butun ilova uchun bitta{' '}
            <code>tahrirlanayotganId</code> state saqlash — bir vaqtda faqat bitta vazifa
            tahrirlanishi mumkin bo'lgani uchun bu yetarli:
          </p>
          <CodeBlock lang="jsx">{`const [tahrirlanayotganId, setTahrirlanayotganId] = useState(null)

function handleTahrirlash(id, yangiMatn) {
  setTodos(
    todos.map((todo) =>
      todo.id === id ? { ...todo, matn: yangiMatn } : todo
    )
  )
  setTahrirlanayotganId(null)
}

// render ichida, har bir <li> uchun:
{tahrirlanayotganId === todo.id ? (
  <input
    type="text"
    defaultValue={todo.matn}
    autoFocus
    onBlur={(e) => handleTahrirlash(todo.id, e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter') handleTahrirlash(todo.id, e.target.value)
    }}
  />
) : (
  <span onClick={() => setTahrirlanayotganId(todo.id)}>{todo.matn}</span>
)}`}</CodeBlock>
          <p>
            Bu yerda ham xuddi 19-darsdagi <code>handleToggle</code> kabi — massiv{' '}
            <code>.map()</code> orqali qayta yaratiladi, faqat mos <code>id</code>li element
            yangi <code>matn</code> bilan almashtiriladi. Sizning yechimingiz boshqacha bo'lishi
            mumkin (masalan, har bir vazifada o'zining <code>tahrirlanyaptimi</code> maydoni
            bo'lishi) — muhimi shu darslarda ko'rgan immutable yangilash qoidasiga rioya
            qilish.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <strong>Komponentlar va props</strong> — ekranni qayta ishlatiladigan, ma'lumot
          qabul qiladigan funksiyalarga bo'lish; <code>children</code> orqali JSX'ni ham
          uzatish mumkin.
        </li>
        <li>
          <strong>State (useState)</strong> — komponentning renderlar orasida "eslab
          qoladigan" ma'lumoti; uni o'zgartirish React'ga qayta render qilishni buyuradi.
        </li>
        <li>
          <strong>Hodisalar va formalar</strong> — <code>onClick</code>, <code>onChange</code>,{' '}
          <code>onSubmit</code> orqali foydalanuvchi harakatiga javob berish; controlled input
          — state va inputni ikki tomonlama bog'lash.
        </li>
        <li>
          <strong>Shartli render va ro'yxatlar</strong> — <code>&&</code>/ternary orqali "bu
          shartda shu ko'rinsin", <code>.map()</code> + <code>key</code> orqali massivni JSX
          ro'yxatiga aylantirish.
        </li>
        <li>
          <strong>Effektlar va reflar</strong> — <code>useEffect</code> React dunyosidan
          tashqariga (tarmoq, taymer) chiqish uchun, <code>useRef</code> — DOM'ga bevosita
          murojaat yoki qayta render talab qilmaydigan qiymatlarni saqlash uchun.
        </li>
        <li>
          <strong>State boshqaruv naqshlari</strong> — state'ni yuqoriga ko'tarish,{' '}
          <code>useReducer</code> murakkab mantiq uchun, custom hook'lar takrorlanadigan
          mantiqni chiqarish uchun, <code>useContext</code> — prop drilling'siz uzatish uchun.
        </li>
        <li>
          <strong>Immutable yangilash</strong> — state'dagi massiv yoki obyektni hech qachon
          joyida o'zgartirmaslik, har doim spread yoki <code>.map()</code>/<code>.filter()</code>{' '}
          orqali yangi nusxa yaratish — butun kurs davomida qaytarilgan eng muhim qoida.
        </li>
        <li>
          Bu asoslar ustiga navigatsiya, katta masshtabli state boshqaruvi, TypeScript,
          testlash va to'liq-stack freymvorklar kabi mavzular quriladi — ularning har biri
          o'z ehtiyoji tug'ilganda o'rganiladigan alohida yo'nalish.
        </li>
      </KeyPoints>
    </>
  )
}
