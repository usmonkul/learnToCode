import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Amaliy loyiha: Vazifalar ro'yxati — formalar va filtrlash",
  section: 'Amaliy loyiha',
}

export default function ProjectTodoFormsFilterLesson() {
  return (
    <>
      <p>
        18-darsda qurgan <code>TodoApp</code>'ni davom ettiramiz. O'shanda vazifa qo'shish,
        ro'yxatni render qilish va o'chirishni qurgan edik. Eslatib o'tamiz — boshlang'ich holat
        shunday edi:
      </p>
      <CodeBlock lang="jsx">{`import { useState } from 'react'

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, matn: "React asoslarini o'rganish", bajarildimi: true },
    { id: 2, matn: 'Amaliy loyiha ustida ishlash', bajarildimi: false },
    { id: 3, matn: 'useReducer bilan tanishish', bajarildimi: false },
  ])
  const [yangiMatn, setYangiMatn] = useState('')

  function handleQoshish(e) {
    e.preventDefault()
    if (yangiMatn.trim() === '') return
    setTodos([...todos, { id: Date.now(), matn: yangiMatn, bajarildimi: false }])
    setYangiMatn('')
  }

  function handleOchirish(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // ... render (18-darsga qarang)
}`}</CodeBlock>
      <p>
        Bu darsda uchta narsa qo'shamiz: har bir vazifani bajarilgan deb belgilash (checkbox),
        vazifalarni holatiga qarab filtrlash va bajarilganlarni birdaniga tozalash. Uchalasi ham
        avvalgi darslarda ko'rgan naqshlarning davomi — hech qanday yangi hook kerak emas.
      </p>

      <h2>Bajarilganlik holatini almashtirish (toggle)</h2>
      <p>
        Har bir <code>{'<li>'}</code>ga checkbox qo'shamiz. Checkbox bosilganda faqat o'sha bitta
        vazifaning <code>bajarildimi</code> qiymati teskarisiga o'zgarishi kerak, qolgan
        vazifalar tegilmasdan qolishi kerak. Buning uchun <code>.map()</code> orqali butun
        massivni aylanib o'tamiz, lekin faqat <code>id</code> mos kelgan elementni yangi obyekt
        bilan almashtiramiz — qolganlarini o'zgarishsiz qaytaramiz:
      </p>
      <CodeBlock lang="jsx">{`function handleToggle(id) {
  setTodos(
    todos.map((todo) =>
      todo.id === id ? { ...todo, bajarildimi: !todo.bajarildimi } : todo
    )
  )
}`}</CodeBlock>
      <p>
        <code>{'{ ...todo, bajarildimi: !todo.bajarildimi }'}</code> — mos kelgan vazifaning
        barcha maydonlarini nusxalab, faqat <code>bajarildimi</code>ni teskarisiga o'zgartirgan{' '}
        <strong>yangi</strong> obyekt yaratadi. Mos kelmagan elementlar esa <code>todo</code>{' '}
        holida, o'zgarishsiz qaytariladi. Natijada <code>.map()</code> — eski massivdagi barcha
        elementlarni o'z ichiga olgan, lekin bitta elementi yangisiga almashtirilgan{' '}
        <strong>yangi massiv</strong> qaytaradi.
      </p>
      <Callout type="warning" title="Nega todos[i].bajarildimi = true ishlamaydi">
        Agar to'g'ridan-to'g'ri <code>todo.bajarildimi = !todo.bajarildimi</code> deb yozilsa,
        bu — massiv ichidagi <strong>mavjud obyektni</strong> o'zgartirish, ya'ni mutatsiya.
        Massivning o'zi (<code>todos</code>) xotirada bir xil obyekt bo'lib qolaveradi, React esa
        eski va yangi qiymatni solishtirganda farq topolmay, qayta render qilmasligi mumkin.
        Shuning uchun har doim <code>.map()</code> orqali <strong>yangi</strong> massiv va{' '}
        <strong>yangi</strong> obyekt yaratib, natijasini <code>setTodos</code>ga beramiz.
      </Callout>
      <p>
        Endi render qismida checkbox qo'shamiz va bajarilgan vazifalarni chizib o'tilgan matn
        (strikethrough) bilan ko'rsatamiz:
      </p>
      <CodeBlock lang="jsx">{`<ul>
  {todos.map((todo) => (
    <li key={todo.id}>
      <input
        type="checkbox"
        checked={todo.bajarildimi}
        onChange={() => handleToggle(todo.id)}
      />
      <span className={todo.bajarildimi ? 'line-through' : ''}>
        {todo.matn}
      </span>
      <button onClick={() => handleOchirish(todo.id)}>O'chirish</button>
    </li>
  ))}
</ul>`}</CodeBlock>
      <p>
        Checkbox <code>checked</code> orqali <code>todo.bajarildimi</code>ga bog'langan —
        controlled input naqshining checkbox uchun ko'rinishi (8-darsdagi{' '}
        <code>e.target.checked</code>ni eslang, garchi bu yerda <code>onChange</code>{' '}
        qiymatning o'zini emas, faqat toggle harakatini chaqiradi). <code>className</code>{' '}
        esa <code>bajarildimi</code>ning qiymatiga qarab shartli ravishda tanlanadi.
      </p>

      <h2>Faqat kerakli vazifalarni ko'rsatish: filtrlash</h2>
      <p>
        Endi uchta rejim orasida almashish imkonini beramiz: "Hammasi", "Faol" (bajarilmagan) va
        "Bajarilgan". Buning uchun yana bitta state — <code>filter</code> — qo'shamiz, va
        render paytida joriy <code>filter</code>ga qarab ko'rsatiladigan ro'yxatni hisoblaymiz:
      </p>
      <CodeBlock lang="jsx">{`const [filter, setFilter] = useState('hammasi')

const filtrlanganTodos = todos.filter((todo) => {
  if (filter === 'faol') return !todo.bajarildimi
  if (filter === 'bajarilgan') return todo.bajarildimi
  return true // 'hammasi'
})`}</CodeBlock>
      <p>
        <code>filtrlanganTodos</code> — alohida state emas, u har render'da{' '}
        <code>todos</code> va <code>filter</code>dan <strong>hisoblab olinadigan</strong>{' '}
        qiymat (9-darsda ko'rgan shartli renderning bir turi). Uni yana bitta{' '}
        <code>useState</code> qilib saqlash noto'g'ri bo'lardi — chunki u holda{' '}
        <code>todos</code> yoki <code>filter</code> o'zgarganda uni qo'lda qayta hisoblab,
        sinxronlab turishga to'g'ri kelardi. Hisoblanadigan qiymatni hech qachon alohida state
        qilib saqlamang, agar uni mavjud state'lardan bevosita hisoblash mumkin bo'lsa.
      </p>
      <p>Render qismida esa <code>todos</code> o'rniga <code>filtrlanganTodos</code>ni chiqaramiz, va uch tugmani qo'shamiz:</p>
      <CodeBlock lang="jsx">{`<div>
  <button onClick={() => setFilter('hammasi')}>Hammasi</button>
  <button onClick={() => setFilter('faol')}>Faol</button>
  <button onClick={() => setFilter('bajarilgan')}>Bajarilgan</button>
</div>

<ul>
  {filtrlanganTodos.map((todo) => (
    <li key={todo.id}>
      {/* ...checkbox, matn, o'chirish tugmasi (yuqorida ko'rgandek) */}
    </li>
  ))}
</ul>`}</CodeBlock>

      <h2>Bajarilganlarni birdaniga tozalash</h2>
      <p>
        Oxirgi qulaylik — barcha bajarilgan vazifalarni bitta tugma bilan o'chirish. Bu ham{' '}
        18-darsda ko'rgan <code>.filter()</code> naqshining o'zi, faqat bu safar teskari
        shartda — faqat <strong>bajarilmagan</strong> vazifalarni saqlab qolamiz:
      </p>
      <CodeBlock lang="jsx">{`function handleTozalash() {
  setTodos(todos.filter((todo) => !todo.bajarildimi))
}`}</CodeBlock>
      <p>
        Bu tugmani filter tugmalari yonida joylashtirish mumkin:{' '}
        <code>{'<button onClick={handleTozalash}>Bajarilganlarni tozalash</button>'}</code>.
      </p>

      <Quiz
        question="handleToggle funksiyasi todos.map((todo) => todo.id === id ? { ...todo, bajarildimi: !todo.bajarildimi } : todo) deb yozilgan. Nega todos[index].bajarildimi = true kabi to'g'ridan-to'g'ri o'zgartirish o'rniga, butun massivni .map() orqali qayta yaratish kerak?"
        options={[
          "Chunki .map() tezroq ishlaydi va performance uchun har doim afzal",
          "Chunki state'dagi massiv yoki obyektni to'g'ridan-to'g'ri o'zgartirish (mutatsiya) React'ga o'zgarish borligini bildirmaydi — React eski va yangi qiymatni solishtirib, ular bir xil obyekt bo'lsa, qayta render qilish shart emas deb hisoblashi mumkin",
          "Chunki JavaScript'da massiv elementini indeks orqali o'zgartirish sintaktik xato hisoblanadi",
          "Farqi yo'q, ikkalasi ham bir xil natija beradi, .map() shunchaki qisqaroq yozuv",
        ]}
        correctIndex={1}
        explanation="React state o'zgarganini aniqlash uchun ko'pincha oldingi va yangi qiymatni solishtiradi. Agar massiv yoki obyekt joyida (mutatsiya orqali) o'zgartirilsa, u xotirada hamon bir xil obyekt bo'lib qoladi — React farqni sezmasligi va qayta render qilmasligi mumkin. .map() esa har doim butunlay yangi massiv (va o'zgargan elementlar uchun yangi obyektlar) qaytaradi, shuning uchun React o'zgarishni ishonchli tarzda aniqlaydi."
      />

      <Exercise title="Mashq">
        <p>
          <code>TodoApp</code>ga qidiruv (search) inputi qo'shing — foydalanuvchi matn kiritgan
          sayin, faqat shu matnni o'z ichiga olgan vazifalar ko'rsatilsin ({' '}
          <code>.includes()</code> yordamida). Qidiruv joriy <code>filter</code> bilan birga
          ishlashi kerak — ya'ni avval <code>filter</code> bo'yicha, so'ng qidiruv matni bo'yicha
          filtrlansin.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`const [qidiruv, setQidiruv] = useState('')

const filtrlanganTodos = todos
  .filter((todo) => {
    if (filter === 'faol') return !todo.bajarildimi
    if (filter === 'bajarilgan') return todo.bajarildimi
    return true
  })
  .filter((todo) =>
    todo.matn.toLowerCase().includes(qidiruv.toLowerCase())
  )

// render ichida:
<input
  type="text"
  value={qidiruv}
  onChange={(e) => setQidiruv(e.target.value)}
  placeholder="Qidirish..."
/>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          To-do ilovaning to'liq state shakli: <code>todos</code> (obyektlar massivi),{' '}
          <code>yangiMatn</code> (controlled input), <code>filter</code> (joriy ko'rinish rejimi)
          — hammasi <code>useState</code> orqali.
        </li>
        <li>
          Massiv yoki obyekt state'ini hech qachon joyida o'zgartirmang: qo'shish —{' '}
          <code>{'[...todos, yangi]'}</code>, o'chirish — <code>.filter()</code>, bitta
          elementni yangilash — <code>.map()</code> + shartli spread.
        </li>
        <li>
          Controlled input (<code>value</code> + <code>onChange</code>) matn kiritish uchun ham,
          checkbox (<code>checked</code> + <code>onChange</code>) bajarilganlik belgisi uchun ham
          bir xil naqsh bo'yicha ishlaydi.
        </li>
        <li>
          Ro'yxat <code>.map()</code> bilan, ma'lumotning o'z <code>id</code>si{' '}
          <code>key</code> sifatida render qilinadi.
        </li>
        <li>
          Filtrlangan ro'yxat — alohida state emas, mavjud <code>todos</code> va{' '}
          <code>filter</code>dan har render'da hisoblab olinadigan (derived) qiymat.
        </li>
        <li>
          Shu besh naqsh — immutable yangilash, controlled input, list render + key, shartli
          render, hisoblanadigan qiymat — React'da deyarli har qanday interaktiv ilovaning
          asosini tashkil qiladi.
        </li>
      </KeyPoints>
    </>
  )
}
