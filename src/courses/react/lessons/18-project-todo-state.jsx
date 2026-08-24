import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Amaliy loyiha: Vazifalar ro'yxati — state va render",
  section: 'Amaliy loyiha',
}

export default function ProjectTodoStateLesson() {
  return (
    <>
      <p>
        Endi shu paytgacha o'rgangan narsalarni birlashtirib, haqiqiy kichik ilova quramiz —{' '}
        <strong>Vazifalar ro'yxati</strong> (to-do list). Bu loyiha ikki darsga bo'lingan: bu
        darsda ilovaning asosini — state shakli, yangi vazifa qo'shish, ro'yxatni render qilish
        va vazifani o'chirish — quramiz. Keyingi darsda esa shu ilovaga bajarilganlik belgisi va
        filtrlashni qo'shamiz. Yangi tushuncha yo'q — faqat <code>useState</code>, controlled
        input, <code>.map()</code> va immutable yangilash naqshlarini bitta real ilovada
        birlashtiramiz.
      </p>

      <h2>Boshlang'ich state: vazifalar massivi</h2>
      <p>
        Har bir vazifani bitta obyekt sifatida tasavvur qilamiz: unda noyob{' '}
        <code>id</code> (key uchun, 10-darsdagidek), <code>matn</code> (vazifaning o'zi) va{' '}
        <code>bajarildimi</code> (boolean, keyingi darsda kerak bo'ladi) bo'ladi. Butun ro'yxat
        esa shu obyektlardan iborat massiv — bitta <code>useState</code> ichida saqlanadi:
      </p>
      <CodeBlock lang="jsx">{`import { useState } from 'react'

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, matn: "React asoslarini o'rganish", bajarildimi: true },
    { id: 2, matn: 'Amaliy loyiha ustida ishlash', bajarildimi: false },
    { id: 3, matn: 'useReducer bilan tanishish', bajarildimi: false },
  ])

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.matn}</li>
      ))}
    </ul>
  )
}`}</CodeBlock>
      <p>
        Bu — hozircha faqat statik ro'yxatni ko'rsatadigan komponent. <code>todos</code> massivi
        boshlang'ich uchta element bilan urug'lantirilgan (seed qilingan), va{' '}
        <code>.map()</code> yordamida har bir obyekt <code>{'<li>'}</code>ga aylantiriladi,{' '}
        <code>key={'{todo.id}'}</code> esa React'ga har bir qatorning barqaror shaxsini beradi.
        Endi bu ro'yxatga interaktivlik qo'shamiz.
      </p>

      <h2>Yangi vazifa qo'shish: controlled input</h2>
      <p>
        Foydalanuvchi yangi vazifa kiritishi uchun ikkinchi <code>useState</code> kerak —
        inputning joriy matnini saqlash uchun. Inputni <code>value</code> va{' '}
        <code>onChange</code> orqali controlled qilib bog'laymiz (8-darsdagidek), formani esa{' '}
        <code>onSubmit</code> va <code>e.preventDefault()</code> bilan yig'amiz:
      </p>
      <CodeBlock lang="jsx">{`function TodoApp() {
  const [todos, setTodos] = useState([/* ... */])
  const [yangiMatn, setYangiMatn] = useState('')

  function handleQoshish(e) {
    e.preventDefault()
    if (yangiMatn.trim() === '') return

    const yangiVazifa = {
      id: Date.now(),
      matn: yangiMatn,
      bajarildimi: false,
    }
    setTodos([...todos, yangiVazifa])
    setYangiMatn('')
  }

  return (
    <div>
      <form onSubmit={handleQoshish}>
        <input
          type="text"
          value={yangiMatn}
          onChange={(e) => setYangiMatn(e.target.value)}
          placeholder="Yangi vazifa..."
        />
        <button type="submit">Qo'shish</button>
      </form>

      {/* ro'yxat shu yerda */}
    </div>
  )
}`}</CodeBlock>
      <p>
        <code>handleQoshish</code> yangi obyekt yaratadi (<code>id</code>ni oddiylik uchun{' '}
        <code>Date.now()</code> orqali generatsiya qilamiz — real loyihada bu odatda serverdan
        yoki maxsus kutubxonadan keladi) va uni <code>setTodos</code>ga uzatadi. Yuborish
        tugagach, <code>setYangiMatn('')</code> input maydonini tozalaydi.
      </p>
      <Callout type="warning" title="Massivni mutatsiya qilmang">
        E'tibor bering — <code>setTodos([...todos, yangiVazifa])</code> deb yozilgan, emas{' '}
        <code>todos.push(yangiVazifa)</code>. 6-darsda ko'rganimizdek, state'dagi massiv yoki
        obyektni to'g'ridan-to'g'ri o'zgartirish (mutatsiya) React'ga "qayta render qil" degan
        signal bermaydi — chunki massiv o'zi xotirada bir xil obyekt bo'lib qolaveradi. Spread
        sintaksisi (<code>...todos</code>) eski elementlarning barchasini nusxalab,{' '}
        <strong>yangi</strong> massiv yaratadi, faqat shu yangi massiv <code>setTodos</code>ga
        beriladi — React buni eski massivdan farqli deb tanib, komponentni qayta render qiladi.
      </Callout>

      <h2>Vazifani o'chirish</h2>
      <p>
        Har bir qatorga o'chirish tugmasi qo'shamiz. 10-darsda ko'rgan naqsh xuddi shu yerda ham
        ishlaydi: <code>.filter()</code> berilgan <code>id</code>dan boshqa barcha elementlarni
        o'z ichiga olgan yangi massiv qaytaradi, va biz o'sha yangi massivni state'ga
        o'rnatamiz:
      </p>
      <CodeBlock lang="jsx">{`function handleOchirish(id) {
  setTodos(todos.filter((todo) => todo.id !== id))
}`}</CodeBlock>
      <p>Endi hammasini birlashtirib, to'liq <code>TodoApp</code>ni ko'ramiz:</p>
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

    const yangiVazifa = {
      id: Date.now(),
      matn: yangiMatn,
      bajarildimi: false,
    }
    setTodos([...todos, yangiVazifa])
    setYangiMatn('')
  }

  function handleOchirish(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div>
      <form onSubmit={handleQoshish}>
        <input
          type="text"
          value={yangiMatn}
          onChange={(e) => setYangiMatn(e.target.value)}
          placeholder="Yangi vazifa..."
        />
        <button type="submit">Qo'shish</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.matn}
            <button onClick={() => handleOchirish(todo.id)}>O'chirish</button>
          </li>
        ))}
      </ul>
    </div>
  )
}`}</CodeBlock>
      <p>
        Shu bilan ilovaning asosi tayyor: vazifa qo'shish, ro'yxatni ko'rsatish va o'chirish —
        uchtasi ham <code>todos</code> massivini hech qachon to'g'ridan-to'g'ri o'zgartirmasdan,
        har safar yangi massiv yaratib ishlaydi. Keyingi darsda shu ilovaga bajarilganlik
        belgisi (checkbox) va filtrlashni qo'shamiz.
      </p>

      <Quiz
        question="TodoApp'da handleQoshish funksiyasi setTodos([...todos, yangiVazifa]) deb yozilgan. Agar buning o'rniga todos.push(yangiVazifa) deb yozilsa (va setTodos umuman chaqirilmasa), ekranda nima bo'ladi?"
        options={[
          "Hech narsa o'zgarmaydi — yangi vazifa massivga qo'shiladi, lekin komponent qayta render bo'lmagani uchun ekranda ko'rinmaydi",
          "Yangi vazifa darhol ekranda paydo bo'ladi, chunki push massivni to'g'ridan-to'g'ri o'zgartiradi",
          "Build vaqtida xatolik chiqadi, chunki push state massivida taqiqlangan",
          "Ilova butunlay ishlamay qoladi",
        ]}
        correctIndex={0}
        explanation="push() massivni joyida (in place) o'zgartiradi — xotiradagi massiv hali ham xuddi shu obyekt bo'lib qoladi. setTodos chaqirilmasa, React qayta render qilish kerakligini umuman bilmaydi, shuning uchun ekran eski holatda qolaveradi, garchi todos o'zgaruvchisining ichidagi massiv aslida o'zgargan bo'lsa ham. Shu sabab har doim yangi massiv yaratib (masalan, spread orqali) setter'ga berish kerak."
      />

      <Exercise title="Mashq">
        <p>
          <code>TodoApp</code>ga ro'yxat ustiga <strong>vazifalar soni</strong>ni ko'rsatuvchi
          qator qo'shing — masalan, <code>"Jami vazifalar: 3"</code>. Son{' '}
          <code>todos</code> massivining uzunligidan olinadi va har safar vazifa
          qo'shilganda/o'chirilganda avtomatik yangilanishi kerak (buning uchun alohida state
          shart emas — uzunlikni to'g'ridan-to'g'ri render paytida hisoblash kifoya).
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`return (
  <div>
    <form onSubmit={handleQoshish}>
      <input
        type="text"
        value={yangiMatn}
        onChange={(e) => setYangiMatn(e.target.value)}
        placeholder="Yangi vazifa..."
      />
      <button type="submit">Qo'shish</button>
    </form>

    <p>Jami vazifalar: {todos.length}</p>

    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.matn}
          <button onClick={() => handleOchirish(todo.id)}>O'chirish</button>
        </li>
      ))}
    </ul>
  </div>
)`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Vazifalar ro'yxati bitta <code>useState</code> massivida saqlanadi — har bir element{' '}
          <code>{'{ id, matn, bajarildimi }'}</code> shaklidagi obyekt.
        </li>
        <li>
          Input <code>value</code> + <code>onChange</code> orqali controlled qilib bog'lanadi;
          forma <code>onSubmit</code> va <code>e.preventDefault()</code> bilan yig'iladi.
        </li>
        <li>
          Yangi vazifa qo'shish — <code>setTodos([...todos, yangiVazifa])</code>: eski massiv
          spread qilinib, yangi element qo'shiladi, natijada butunlay yangi massiv hosil
          bo'ladi. <code>.push()</code> yoki boshqa mutatsiya usuli ishlatilmaydi.
        </li>
        <li>
          Ro'yxat <code>.map()</code> bilan render qilinadi, har bir qatorga ma'lumotning o'z{' '}
          <code>id</code>si <code>key</code> sifatida beriladi.
        </li>
        <li>
          Vazifani o'chirish — <code>todos.filter((todo) =&gt; todo.id !== id)</code>: berilgan{' '}
          <code>id</code>dan boshqa hamma elementni o'z ichiga olgan yangi massiv qaytariladi.
        </li>
      </KeyPoints>
    </>
  )
}
