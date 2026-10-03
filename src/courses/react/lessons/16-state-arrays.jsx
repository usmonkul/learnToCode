import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "State'dagi massivlarni yangilash",
  section: 'Interaktivlik',
}

export default function StateArraysLesson() {
  return (
    <>
      <h2>Muammo: push qildim, ro'yxat o'zgarmadi</h2>
      <p>
        Xarid ro'yxati: input'ga mahsulot nomini yozib, "Qo'shish" bosiladi. JavaScript'da
        massivga element qo'shishning birinchi kelgan usuli — <code>push</code>:
      </p>
      <CodeBlock lang="jsx">{`const [royxat, setRoyxat] = useState([
  { id: 1, nomi: 'Non' },
  { id: 2, nomi: 'Sut' },
])

function handleQoshish() {
  royxat.push({ id: 3, nomi: 'Tuxum' })
  setRoyxat(royxat)   // o'sha massiv — React o'zgarishni ko'rmaydi
}`}</CodeBlock>
      <p>
        15-darsdagi muammoning aynan o'zi: massiv ham obyekt, <code>push</code> uni joyida
        o'zgartiradi, setter esa o'sha massivni oladi — render yo'q. Qoida ham o'sha:{' '}
        <strong>state'dagi massivni faqat o'qish uchun deb hisoblang va har safar yangi massiv
        yarating</strong>. Faqat massivlar uchun obyektlardagi spread'dan tashqari o'z
        vositalari bor.
      </p>

      <h2>Qaysi metodlar xavfsiz?</h2>
      <p>
        JavaScript massiv metodlarining bir qismi massivni joyida o'zgartiradi (mutatsiya),
        boshqalari esa yangi massiv qaytaradi. React state'i bilan faqat ikkinchilarini
        ishlating:
      </p>
      <table>
        <thead>
          <tr>
            <th>Amal</th>
            <th>Ishlatmang (o'zgartiradi)</th>
            <th>Ishlating (yangi massiv)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Qo'shish</td>
            <td>
              <code>push</code>, <code>unshift</code>
            </td>
            <td>
              <code>{'[...arr, x]'}</code>, <code>{'[x, ...arr]'}</code>
            </td>
          </tr>
          <tr>
            <td>O'chirish</td>
            <td>
              <code>pop</code>, <code>shift</code>, <code>splice</code>
            </td>
            <td>
              <code>filter</code>, <code>slice</code>
            </td>
          </tr>
          <tr>
            <td>Almashtirish</td>
            <td>
              <code>{'arr[i] = x'}</code>, <code>splice</code>
            </td>
            <td>
              <code>map</code>, <code>with</code>
            </td>
          </tr>
          <tr>
            <td>Saralash</td>
            <td>
              <code>sort</code>, <code>reverse</code>
            </td>
            <td>
              <code>toSorted</code>, <code>toReversed</code>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <code>slice</code> (nusxa qaytaradi) va <code>splice</code> (joyida o'zgartiradi)
        nomlari o'xshash, lekin vazifasi teskari — eng ko'p adashtiriladigan juftlik.
      </p>

      <h2>Qo'shish</h2>
      <CodeBlock lang="jsx">{`function handleQoshish(nomi) {
  setRoyxat([
    ...royxat,                              // eski elementlar
    { id: crypto.randomUUID(), nomi },      // va yangisi oxirida
  ])
}

// boshiga qo'shish:
setRoyxat([{ id: crypto.randomUUID(), nomi }, ...royxat])`}</CodeBlock>
      <p>
        <code>crypto.randomUUID()</code> — brauzerning o'zida bor, noyob satr qaytaradigan
        funksiya (<code>"3b241101-e2bb-4255-8caf-4136c566a962"</code>). Yangi element uchun id
        aynan <strong>handler</strong> ichida yaratiladi — render ichida emas: renderda
        yaratilgan id har renderda o'zgarib, 8-darsdagi tasodifiy key muammosini beradi.
        Eslatma: <code>crypto.randomUUID</code> faqat xavfsiz kontekstda — <code>localhost</code>{' '}
        yoki HTTPS'da — ishlaydi; sahifani lokal tarmoqdagi IP manzil orqali ochsangiz,{' '}
        <code>crypto.randomUUID is not a function</code> xatosi chiqadi.
      </p>

      <h2>O'chirish: filter</h2>
      <p>
        "Shu id'li elementdan boshqa hammasini qoldir":
      </p>
      <CodeBlock lang="jsx">{`function handleOchirish(id) {
  setRoyxat(royxat.filter((m) => m.id !== id))
}

// ro'yxatda:
<button onClick={() => handleOchirish(m.id)}>O'chirish</button>`}</CodeBlock>

      <h2>Bitta elementni yangilash: map</h2>
      <p>
        "Hamma elementni o'zgarishsiz qoldir, faqat keraklisini almashtir". Ro'yxatdagi
        elementlar obyekt bo'lgani uchun, o'zgaradigan element ham <strong>yangi
        obyekt</strong> bo'lishi kerak (15-dars):
      </p>
      <CodeBlock lang="jsx">{`function handleOlindi(id) {
  setRoyxat(
    royxat.map((m) =>
      m.id === id
        ? { ...m, olindi: !m.olindi }   // keraklisi — yangi obyekt
        : m                              // qolganlari — o'zgarishsiz
    )
  )
}`}</CodeBlock>
      <Callout type="note" title="map ichida mutatsiya — yashirin xato">
        <code>map</code> yangi massiv qaytaradi, lekin ichidagi obyektlar o'shalar. Shuning
        uchun{' '}
        <code>{'royxat.map(m => { if (m.id === id) m.olindi = true; return m })'}</code> — yangi
        massiv, lekin eski obyekt mutatsiya qilindi. Bu eski suratni buzadi va keyinroq
        (masalan, "bekor qilish" uchun eski holatlar tarixini saqlaganda) g'alati
        xatolar beradi. Doim <code>{'{ ...m, maydon: yangi }'}</code>.
      </Callout>

      <h2>O'rtaga qo'shish va saralash</h2>
      <p>
        Muayyan joyga qo'shish uchun massivni <code>slice</code> bilan ikki bo'lakka bo'lib,
        o'rtasiga yangi elementni qo'yamiz:
      </p>
      <CodeBlock lang="jsx">{`function handleJoyiga(index, yangi) {
  setRoyxat([
    ...royxat.slice(0, index),   // index'gacha
    yangi,
    ...royxat.slice(index),      // index'dan keyin
  ])
}`}</CodeBlock>
      <p>
        Saralash va teskari aylantirish uchun <code>toSorted</code> va <code>toReversed</code>{' '}
        — ular nusxa qaytaradi (8-dars). Ko'pincha esa saralangan ro'yxatni state'da saqlash
        umuman shart emas: asl ro'yxat state'da qoladi, saralangan versiya esa render paytida{' '}
        <strong>hisoblanadi</strong>:
      </p>
      <CodeBlock lang="jsx">{`const [royxat, setRoyxat] = useState(boshlangich)
const [tartib, setTartib] = useState('nom')   // 'nom' yoki 'narx'

const korsatiladigan = royxat.toSorted((a, b) =>
  tartib === 'nom' ? a.nomi.localeCompare(b.nomi) : a.narx - b.narx
)`}</CodeBlock>
      <p>
        Bu yerda state — faqat <code>royxat</code> va <code>tartib</code>;{' '}
        <code>korsatiladigan</code> — ulardan hisoblanadi. Filtrlash ham xuddi shunday (18-darsdagi
        loyihada aynan shu naqshni ishlatamiz).
      </p>

      <Callout type="warning" title="Keng tarqalgan xatolar">
        <ul>
          <li>
            <strong><code>push</code>/<code>splice</code>/<code>sort</code> state ustida.</strong>{' '}
            Massivni joyida o'zgartiradi — render bo'lmaydi yoki eski surat buziladi.
          </li>
          <li>
            <strong><code>push</code>ning natijasini setter'ga berish.</strong>{' '}
            <code>setRoyxat(royxat.push(x))</code> — <code>push</code> yangi uzunlikni (son!)
            qaytaradi, state son bo'lib qoladi va <code>royxat.map is not a function</code> xatosi
            chiqadi.
          </li>
          <li>
            <strong><code>map</code> ichida elementni mutatsiya qilish.</strong> O'zgaradigan
            element uchun ham yangi obyekt: <code>{'{ ...m, olindi: true }'}</code>.
          </li>
          <li>
            <strong>Indeks bo'yicha o'chirish.</strong> <code>{'filter((_, i) => i !== index)'}</code>{' '}
            ishlaydi, lekin id bo'yicha o'chirish ishonchliroq — ro'yxat saralangan yoki
            filtrlangan bo'lsa, ko'rinadigan indeks asl massivdagi indeks bilan mos kelmaydi.
          </li>
          <li>
            <strong>Render ichida id yaratish.</strong> <code>{'key={crypto.randomUUID()}'}</code>{' '}
            — har renderda yangi key. Id faqat element yaratilganda, handler'da beriladi.
          </li>
        </ul>
      </Callout>

      <Quiz
        question="royxat state'idan id'si 7 bo'lgan elementni o'chirishning to'g'ri usuli qaysi?"
        options={[
          "setRoyxat(royxat.filter((x) => x.id !== 7))",
          "royxat.splice(royxat.findIndex((x) => x.id === 7), 1); setRoyxat(royxat)",
          "setRoyxat(royxat.filter((x) => x.id === 7))",
          "delete royxat[7]; setRoyxat([...royxat])",
        ]}
        correctIndex={0}
        explanation="filter yangi massiv qaytaradi va shartga mos elementlarni qoldiradi — id 7 bo'lmaganlarni. splice asl massivni o'zgartiradi va o'sha massiv setter'ga beriladi. Uchinchi variant teskari: faqat 7-ni qoldiradi. delete esa 7-INDEKSDAGI elementni o'chiradi (id emas) va massivda bo'sh joy qoldiradi."
      />

      <Quiz
        question="Vazifalar ro'yxatida bitta vazifaning bajarildi maydonini almashtirish kerak. Qaysi kod to'g'ri?"
        options={[
          "setVazifalar(vazifalar.map((v) => v.id === id ? { ...v, bajarildi: !v.bajarildi } : v))",
          "setVazifalar(vazifalar.map((v) => { if (v.id === id) v.bajarildi = !v.bajarildi; return v }))",
          "vazifalar.find((v) => v.id === id).bajarildi = true; setVazifalar([...vazifalar])",
          "setVazifalar({ ...vazifalar, bajarildi: true })",
        ]}
        correctIndex={0}
        explanation="Birinchi variant yangi massiv yaratadi va o'zgargan vazifa uchun ham yangi obyekt. Ikkinchi va uchinchisi yangi massiv beradi, lekin ichidagi eski obyektni mutatsiya qiladi. To'rtinchisi massivni obyektga aylantirib yuboradi."
      />

      <Exercise title="1-mashq: xarid ro'yxati">
        <p>
          Xarid ro'yxati ilovasini yozing. State — <code>{'{ id, nomi, olindi }'}</code>{' '}
          obyektlari massivi. Imkoniyatlar:
        </p>
        <ul>
          <li>Input va "Qo'shish" tugmasi — yangi mahsulot ro'yxat oxiriga qo'shiladi (bo'sh nom qo'shilmaydi).</li>
          <li>Har bir mahsulot bosilganda "olindi" holati almashadi (olinganlari chizilgan bo'ladi).</li>
          <li>Har birining yonida "×" tugmasi — o'chiradi.</li>
          <li>Pastda: "5 tadan 2 tasi olindi".</li>
        </ul>
        <Solution>
          <CodeBlock lang="jsx">{`import { useState } from 'react'

export default function XaridRoyxati() {
  const [royxat, setRoyxat] = useState([
    { id: 'a', nomi: 'Non', olindi: false },
    { id: 'b', nomi: 'Sut', olindi: true },
  ])
  const [yangiNom, setYangiNom] = useState('')

  function handleQoshish() {
    const nomi = yangiNom.trim()
    if (nomi === '') return
    setRoyxat([...royxat, { id: crypto.randomUUID(), nomi, olindi: false }])
    setYangiNom('')
  }

  function handleAlmashtir(id) {
    setRoyxat(royxat.map((m) => (m.id === id ? { ...m, olindi: !m.olindi } : m)))
  }

  function handleOchirish(id) {
    setRoyxat(royxat.filter((m) => m.id !== id))
  }

  const olinganlar = royxat.filter((m) => m.olindi).length

  return (
    <div>
      <input value={yangiNom} onChange={(e) => setYangiNom(e.target.value)} />
      <button onClick={handleQoshish}>Qo'shish</button>

      <ul>
        {royxat.map((m) => (
          <li key={m.id}>
            <span
              onClick={() => handleAlmashtir(m.id)}
              style={{ textDecoration: m.olindi ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {m.nomi}
            </span>
            <button onClick={() => handleOchirish(m.id)}>×</button>
          </li>
        ))}
      </ul>

      <p>
        {royxat.length} tadan {olinganlar} tasi olindi
      </p>
    </div>
  )
}`}</CodeBlock>
          <p>
            Uch amal — uch xil metod: qo'shish — spread, almashtirish — <code>map</code> +
            spread, o'chirish — <code>filter</code>. <code>olinganlar</code> state emas, har
            renderda hisoblanadi.
          </p>
        </Solution>
      </Exercise>

      <Exercise title="2-mashq: navbatni tartiblash">
        <p>
          1-mashqdagi ro'yxatga har bir element yoniga "↑" va "↓" tugmalarini qo'shing: ular
          elementni bir pog'ona yuqoriga yoki pastga suradi. Birinchi elementning "↑" va
          oxirgisining "↓" tugmasi o'chirilgan (<code>disabled</code>) bo'lsin. Massivni joyida
          o'zgartirmang.
        </p>
        <Solution>
          <CodeBlock lang="jsx">{`function handleSurish(index, yonalish) {
  const yangiIndex = index + yonalish        // yonalish: -1 (yuqori) yoki +1 (past)
  const nusxa = [...royxat]                  // yangi massiv — endi uni o'zgartirsa bo'ladi
  ;[nusxa[index], nusxa[yangiIndex]] = [nusxa[yangiIndex], nusxa[index]]
  setRoyxat(nusxa)
}

// ro'yxatda (map'ning ikkinchi argumenti — index):
{royxat.map((m, i) => (
  <li key={m.id}>
    {m.nomi}
    <button onClick={() => handleSurish(i, -1)} disabled={i === 0}>↑</button>
    <button onClick={() => handleSurish(i, 1)} disabled={i === royxat.length - 1}>↓</button>
  </li>
))}`}</CodeBlock>
          <p>
            <code>{'[...royxat]'}</code> — yangi massiv, shuning uchun uning ichida elementlarning
            o'rnini almashtirish xavfsiz: biz state'ni emas, shu handler'da yaratilgan nusxani
            o'zgartiryapmiz (9-darsdagi "mahalliy o'zgartirish"). Elementlarning o'zi (obyektlar)
            o'zgarmadi — faqat tartib. Key'lar id bo'lgani uchun React elementlarni to'g'ri
            ko'chiradi.
          </p>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          State'dagi massivni joyida o'zgartirmang (<code>push</code>, <code>splice</code>,{' '}
          <code>sort</code>, <code>{'arr[i] = x'}</code>) — har safar yangi massiv yarating.
        </li>
        <li>
          Qo'shish — <code>{'[...arr, x]'}</code>; o'chirish — <code>filter</code>; yangilash —{' '}
          <code>map</code>; o'rtaga qo'shish — <code>slice</code> + spread; saralash —{' '}
          <code>toSorted</code>.
        </li>
        <li>
          Massivdagi obyektni yangilashda o'sha element uchun ham yangi obyekt:{' '}
          <code>{'m.id === id ? { ...m, ... } : m'}</code>.
        </li>
        <li>
          Yangi elementning id'si handler'da yaratiladi (<code>crypto.randomUUID()</code>),
          render'da emas.
        </li>
        <li>
          Saralangan yoki filtrlangan versiyani state'da saqlamang — uni asl ro'yxat va
          tanlangan tartib/filtrdan har renderda hisoblang.
        </li>
      </KeyPoints>
    </>
  )
}
