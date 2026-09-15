import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'useReducer va action tiplari',
  section: 'TypeScript va React',
}

export default function UseReducerDiscriminationLesson() {
  return (
    <>
      <p>
        <code>useState</code>ni tiplashtirishni allaqachon ko'rgan edik — u bitta qiymat bilan
        ishlaganda juda qulay. Lekin state o'zgarish mantig'i murakkablashsa (bir nechta
        o'zaro bog'liq maydon, yoki "nima sodir bo'ldi"ga qarab turlicha yangilanish kerak
        bo'lgan holatlar), <code>useReducer</code> ko'proq tartib beradi. TypeScript bilan
        birga ishlatilganda <code>useReducer</code>ning eng katta kuchi — bu darsda ko'rib
        chiqadigan <strong>discriminated union</strong> orqali modellashtirilgan
        action'lardan keladi.
      </p>

      <h2>Action'larni discriminated union sifatida modellashtirish</h2>
      <p>
        Oldingi darslarda discriminated union'ni <code>type</code> maydoni orqali bir-biridan
        ajratiladigan tiplar to'plami sifatida ko'rgan edik. Reducer'larda bu naqsh juda tabiiy
        joylashadi: har bir "harakat" (action) o'zining <code>type</code> maydoniga ega bo'ladi,
        va ba'zilari qo'shimcha ma'lumot (<code>payload</code>) tashiydi. Oddiy hisoblagich
        uchun quyidagicha yozish mumkin:
      </p>
      <CodeBlock lang="tsx">{`type CounterAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "set"; payload: number }`}</CodeBlock>
      <p>
        Bu yerda uchta variant bor: <code>increment</code> va <code>decrement</code>ning
        qo'shimcha ma'lumoti yo'q, ular faqat "nima sodir bo'lgani"ni bildiradi; <code>set</code>{' '}
        esa yangi qiymatni <code>payload</code> orqali oladi. Har bir variant faqat o'ziga
        tegishli maydonlarga ega — <code>increment</code> action'ida <code>payload</code>ga
        murojaat qilishga urinsangiz, TypeScript darhol xatolik beradi.
      </p>

      <h2>Reducer funksiyasi va switch orqali narrowing</h2>
      <p>
        Reducer — bu joriy state va action'ni qabul qilib, yangi state qaytaradigan oddiy
        funksiya. Uni yozganda TypeScript <code>switch (action.type)</code> ichidagi har bir{' '}
        <code>case</code>'da <code>action</code>ni mos discriminated union a'zosiga toraytiradi
        (narrowing) — xuddi 7-darsda ko'rgan <code>typeof</code>/<code>in</code> narrowing'i
        kabi, faqat bu safar diskriminant maydon <code>type</code>ning o'zi:
      </p>
      <CodeBlock lang="tsx">{`function counterReducer(state: number, action: CounterAction): number {
  switch (action.type) {
    case "increment":
      return state + 1
    case "decrement":
      return state - 1
    case "set":
      // Bu case ichida TS "action"ni faqat
      // { type: "set"; payload: number } deb biladi
      return action.payload
    default:
      return state
  }
}`}</CodeBlock>
      <p>
        Agar <code>case "increment"</code> ichida <code>action.payload</code>ga murojaat
        qilishga urinsangiz, TypeScript xatolik chiqaradi — chunki shu branch ichida{' '}
        <code>action</code>ning tipi <code>{'{ type: "increment" }'}</code>ga toraytirilgan va
        unda <code>payload</code> maydoni umuman yo'q. Bu — action turlarini "qo'lda"
        tekshirishga qaraganda ancha xavfsiz: yangi maydon qo'shsangiz ham, noto'g'ri joyda
        ishlatilgan maydon kompilyatsiya paytida ushlanadi.
      </p>
      <Callout type="tip" title="Exhaustiveness tekshiruvi">
        Agar <code>default</code> branch'ida <code>action</code>ni <code>never</code> tipiga
        tekshirsangiz (masalan, <code>{'const _: never = action'}</code>), TypeScript barcha
        action variantlari <code>switch</code>da ko'rib chiqilganini tekshirib beradi — kelajakda
        yangi action turi qo'shilib, uni reducer'da unutib qo'yilsa, bu xatolikni darhol topadi.
      </Callout>

      <h2>
        <code>useReducer</code>ning generic parametrlari — odatda avtomatik xulosa
      </h2>
      <p>
        <code>useReducer</code>ni chaqirganda odatda hech qanday generic parametrni qo'lda
        yozish shart emas — TypeScript reducer funksiyasining o'zidan (uning parametr va
        qaytar tiplaridan) hamda boshlang'ich state'dan kerakli tiplarni xulosa qiladi:
      </p>
      <CodeBlock lang="tsx">{`function Hisoblagich() {
  // state: number, dispatch faqat CounterAction qabul qiladi —
  // ikkalasi ham counterReducer'dan avtomatik xulosa qilinadi
  const [state, dispatch] = useReducer(counterReducer, 0)

  return (
    <div>
      <p>Hisob: {state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+1</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
      <button onClick={() => dispatch({ type: "set", payload: 100 })}>100ga o'rnat</button>
    </div>
  )
}`}</CodeBlock>
      <p>
        Shu sabab <code>dispatch({'{'} type: "noto'g'ri" {'}'})</code> yoki{' '}
        <code>dispatch({'{'} type: "set" {'}'})</code> (payload'siz) kabi noto'g'ri chaqiruvlar
        kompilyatsiya paytidayoq xatolik beradi — <code>dispatch</code>ning tipi to'g'ridan-to'g'ri{' '}
        <code>CounterAction</code>ga bog'langan.
      </p>

      <Quiz
        question={`Quyidagi reducer'da "case \\"set\\":" branch'i ichida TypeScript "action" o'zgaruvchisini qanday tip deb biladi?`}
        options={[
          "Hali ham butun CounterAction union, chunki narrowing faqat typeof/instanceof bilan ishlaydi",
          `{ type: "set"; payload: number } — chunki switch(action.type) diskriminant maydon orqali toraytiradi`,
          "any, chunki reducer funksiyasi payload borligini bilmaydi",
          "Xatolik chiqadi, chunki union tipdagi qiymatni switch bilan tekshirib bo'lmaydi",
        ]}
        correctIndex={1}
        explanation={`TypeScript "type" maydonini diskriminant sifatida tanib, "switch (action.type)"ning har bir case'ida "action"ni mos union a'zosiga toraytiradi. Shu sabab "set" case'i ichida "action.payload"ga xavfsiz murojaat qilish mumkin.`}
      />

      <Exercise title="Mashq">
        <p>
          Kichik vazifalar ro'yxati (todo) uchun action union yozing:{' '}
          <code>{'{ type: "add"; text: string }'}</code>,{' '}
          <code>{'{ type: "toggle"; id: number }'}</code> va{' '}
          <code>{'{ type: "remove"; id: number }'}</code>. Shu action'larni qabul qiladigan{' '}
          <code>todosReducer</code> funksiyasini yozing — state sifatida{' '}
          <code>{'{ id: number; text: string; done: boolean }[]'}</code>dan foydalaning.
        </p>
        <Solution>
          <CodeBlock lang="tsx">{`interface Todo {
  id: number
  text: string
  done: boolean
}

type TodoAction =
  | { type: "add"; text: string }
  | { type: "toggle"; id: number }
  | { type: "remove"; id: number }

function todosReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), text: action.text, done: false }]
    case "toggle":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      )
    case "remove":
      return state.filter((todo) => todo.id !== action.id)
    default:
      return state
  }
}`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          Reducer action'larini discriminated union sifatida modellashtirish — har birini{' '}
          <code>type</code> maydoni orqali ajratib, faqat unga tegishli qo'shimcha maydonlar
          (<code>payload</code> kabi) bilan.
        </li>
        <li>
          Reducer funksiyasi ichidagi <code>switch (action.type)</code> har bir{' '}
          <code>case</code>da <code>action</code>ni mos union a'zosiga avtomatik toraytiradi
          (narrowing) — noto'g'ri maydonga murojaat kompilyatsiya paytida ushlanadi.
        </li>
        <li>
          <code>useReducer</code>ning state va dispatch tiplari odatda reducer funksiyasi va
          boshlang'ich state'dan avtomatik xulosa qilinadi — qo'lda generic yozish kamdan-kam
          kerak bo'ladi.
        </li>
      </KeyPoints>
    </>
  )
}
