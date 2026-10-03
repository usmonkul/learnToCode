import { useState } from 'react'
import styles from './Project.module.css'
import { KATEGORIYALAR, MAHSULOTLAR, BEPUL_YETKAZISH_CHEGARASI, qadam, somda, hisobla } from './bozor.js'
import { SavatProvider, useSavat, useSavatDispatch } from './SavatContext.jsx'

// React kursining 24-darsi (project-bazaar-cart) quradigan ilovaning tayyor varianti.
// Darsda komponentlar alohida fayllarda; bu yerda galereya uchun bitta faylga jamlangan.

function Sarlavha() {
  const { qatorlar } = useSavat()

  return (
    <header className={styles.sarlavha}>
      <div>
        <h1 className={styles.logo}>Chorsu Online</h1>
        <p className={styles.shior}>Bozordan uyingizgacha — bir soatda</p>
      </div>
      <div className={styles.savatBelgisi} aria-label={`Savatda ${qatorlar.length} xil mahsulot`}>
        🧺
        {qatorlar.length > 0 && <span className={styles.nishon}>{qatorlar.length}</span>}
      </div>
    </header>
  )
}

function KategoriyaFiltri({ tanlangan, onTanlash }) {
  return (
    <nav className={styles.kategoriyalar}>
      {KATEGORIYALAR.map((k) => (
        <button
          key={k.id}
          className={k.id === tanlangan ? `${styles.kategoriya} ${styles.kategoriyaFaol}` : styles.kategoriya}
          onClick={() => onTanlash(k.id)}
        >
          {k.nomi}
        </button>
      ))}
    </nav>
  )
}

function MahsulotKartasi({ mahsulot }) {
  const { qatorlar } = useSavat()
  const dispatch = useSavatDispatch()

  const qator = qatorlar.find((q) => q.mahsulotId === mahsulot.id)

  function handleQoshish() {
    dispatch({ type: 'qoshish', mahsulotId: mahsulot.id, miqdor: qadam(mahsulot.birlik) })
  }

  return (
    <article className={styles.karta}>
      <div className={styles.kartaBelgi}>{mahsulot.belgi}</div>
      <h3 className={styles.kartaNomi}>{mahsulot.nomi}</h3>
      <p className={styles.kartaNarx}>
        {somda(mahsulot.narx)} <span>/ {mahsulot.birlik}</span>
      </p>
      <button className={styles.qoshishTugmasi} onClick={handleQoshish}>
        {qator ? `Savatda: ${qator.miqdor} ${mahsulot.birlik} · +${qadam(mahsulot.birlik)}` : "Savatga qo'shish"}
      </button>
    </article>
  )
}

function SavatQatori({ qator }) {
  const dispatch = useSavatDispatch()
  const { mahsulot, miqdor, summa } = qator
  const q = qadam(mahsulot.birlik)

  function ozgartir(yangiMiqdor) {
    dispatch({ type: 'ozgartirish', mahsulotId: mahsulot.id, miqdor: yangiMiqdor })
  }

  return (
    <li className={styles.qator}>
      <span className={styles.qatorBelgi}>{mahsulot.belgi}</span>
      <div className={styles.qatorMatni}>
        <strong>{mahsulot.nomi}</strong>
        <span>{somda(summa)}</span>
      </div>
      <div className={styles.miqdor}>
        <button onClick={() => ozgartir(miqdor - q)} aria-label="Kamaytirish">−</button>
        <span>
          {miqdor} {mahsulot.birlik}
        </span>
        <button onClick={() => ozgartir(miqdor + q)} aria-label="Ko'paytirish">+</button>
      </div>
      <button
        className={styles.olib}
        onClick={() => dispatch({ type: 'ochirish', mahsulotId: mahsulot.id })}
        aria-label="Olib tashlash"
      >
        ×
      </button>
    </li>
  )
}

function SavatPaneli({ onRasmiylashtirish }) {
  const { qatorlar } = useSavat()
  const dispatch = useSavatDispatch()
  const { batafsil, oraliq, yetkazish, jami } = hisobla(qatorlar)

  if (batafsil.length === 0) {
    return (
      <aside className={styles.panel}>
        <h2 className={styles.panelSarlavha}>Savatcha</h2>
        <p className={styles.bosh}>Savatcha bo'sh. Bozorni aylanib chiqing!</p>
      </aside>
    )
  }

  const bepulgacha = BEPUL_YETKAZISH_CHEGARASI - oraliq

  return (
    <aside className={styles.panel}>
      <h2 className={styles.panelSarlavha}>Savatcha</h2>
      <ul className={styles.qatorlar}>
        {batafsil.map((q) => (
          <SavatQatori key={q.mahsulotId} qator={q} />
        ))}
      </ul>

      <dl className={styles.hisob}>
        <dt>Mahsulotlar</dt>
        <dd>{somda(oraliq)}</dd>
        <dt>Yetkazib berish</dt>
        <dd>{yetkazish === 0 ? 'Bepul' : somda(yetkazish)}</dd>
        <dt className={styles.jami}>Jami</dt>
        <dd className={styles.jami}>{somda(jami)}</dd>
      </dl>
      {bepulgacha > 0 && (
        <p className={styles.maslahat}>Yana {somda(bepulgacha)} — va yetkazib berish bepul!</p>
      )}

      <button className={styles.rasmiylashtirish} onClick={() => onRasmiylashtirish({ batafsil, jami })}>
        Buyurtma berish
      </button>
      <button className={styles.tozalash} onClick={() => dispatch({ type: 'tozalash' })}>
        Savatchani tozalash
      </button>
    </aside>
  )
}

function Tasdiq({ buyurtma, onYangi }) {
  return (
    <section className={styles.tasdiq}>
      <div className={styles.tasdiqBelgi}>✅</div>
      <h2>Buyurtmangiz qabul qilindi!</h2>
      <ul>
        {buyurtma.batafsil.map((q) => (
          <li key={q.mahsulotId}>
            {q.mahsulot.nomi} — {q.miqdor} {q.mahsulot.birlik}
          </li>
        ))}
      </ul>
      <p className={styles.tasdiqJami}>To'lov: {somda(buyurtma.jami)}</p>
      <button className={styles.rasmiylashtirish} onClick={onYangi}>
        Yangi xarid
      </button>
    </section>
  )
}

function Bozor() {
  const dispatch = useSavatDispatch()
  const [kategoriya, setKategoriya] = useState('hammasi')
  const [buyurtma, setBuyurtma] = useState(null) // null — xarid qilinmoqda

  function handleRasmiylashtirish(malumot) {
    setBuyurtma(malumot)
    dispatch({ type: 'tozalash' })
  }

  const korsatiladigan =
    kategoriya === 'hammasi' ? MAHSULOTLAR : MAHSULOTLAR.filter((m) => m.kategoriya === kategoriya)

  return (
    <div className={styles.sahifa}>
      <div className={styles.konteyner}>
        <Sarlavha />
        {buyurtma ? (
          <Tasdiq buyurtma={buyurtma} onYangi={() => setBuyurtma(null)} />
        ) : (
          <div className={styles.asosiy}>
            <main>
              <KategoriyaFiltri tanlangan={kategoriya} onTanlash={setKategoriya} />
              <div className={styles.tor}>
                {korsatiladigan.map((m) => (
                  <MahsulotKartasi key={m.id} mahsulot={m} />
                ))}
              </div>
            </main>
            <SavatPaneli onRasmiylashtirish={handleRasmiylashtirish} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function BazaarCartProject() {
  return (
    <SavatProvider>
      <Bozor />
    </SavatProvider>
  )
}
