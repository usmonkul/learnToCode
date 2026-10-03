import styles from './Project.module.css'
import { restoran, bolimlar } from './menu.js'

// React kursining 11-darsi (project-restaurant-menu) quradigan ilovaning tayyor varianti.
// Darsda har bir komponent alohida faylda; bu yerda galereya uchun bitta faylga jamlangan.

function formatlash(son) {
  return son.toLocaleString('uz-UZ') + " so'm"
}

function Narx({ narx, chegirma = 0 }) {
  if (chegirma === 0) {
    return <div className={styles.narx}>{formatlash(narx)}</div>
  }

  const yangiNarx = narx * (1 - chegirma / 100)
  return (
    <div className={styles.narx}>
      <span className={styles.eskiNarx}>{formatlash(narx)}</span>
      <span className={styles.yangiNarx}>{formatlash(yangiNarx)}</span>
    </div>
  )
}

const BELGI_KLASSLARI = {
  Vegetarian: styles.yashil,
  Achchiq: styles.qizil,
  Tugadi: styles.qizil,
  Yangi: styles.sariq,
}

function Belgi({ matn }) {
  const qoshimcha = BELGI_KLASSLARI[matn] ?? ''
  return <span className={`${styles.belgi} ${qoshimcha}`}>{matn}</span>
}

function TaomKartasi({ taom }) {
  return (
    <li className={taom.mavjud ? styles.karta : `${styles.karta} ${styles.tugagan}`}>
      <div>
        <h3 className={styles.taomNomi}>
          {taom.nomi}
          {taom.belgilar.map((belgi) => (
            <Belgi key={belgi} matn={belgi} />
          ))}
          {!taom.mavjud && <Belgi matn="Tugadi" />}
        </h3>
        <p className={styles.tavsif}>{taom.tavsif}</p>
      </div>
      <Narx narx={taom.narx} chegirma={taom.chegirma} />
    </li>
  )
}

function Bolim({ nomi, izoh, children }) {
  return (
    <section className={styles.bolim}>
      <div className={styles.bolimSarlavhasi}>
        <h2 className={styles.bolimNomi}>{nomi}</h2>
        <span className={styles.bolimIzohi}>{izoh}</span>
      </div>
      {children}
    </section>
  )
}

function Sarlavha({ nomi, manzil, ishVaqti }) {
  return (
    <header className={styles.sarlavha}>
      <h1 className={styles.restoranNomi}>{nomi}</h1>
      <p className={styles.manzil}>
        {manzil} · {ishVaqti}
      </p>
    </header>
  )
}

export default function RestaurantMenuProject() {
  return (
    <div className={styles.sahifa}>
      <div className={styles.konteyner}>
        <Sarlavha nomi={restoran.nomi} manzil={restoran.manzil} ishVaqti={restoran.ishVaqti} />

        <main>
          {bolimlar.map((bolim) => {
            const mavjudlari = bolim.taomlar.filter((taom) => taom.mavjud)
            // mavjud taomlar tepada, tugaganlari pastda
            const tartiblangan = bolim.taomlar.toSorted((a, b) => b.mavjud - a.mavjud)

            return (
              <Bolim
                key={bolim.id}
                nomi={bolim.nomi}
                izoh={`${bolim.taomlar.length} tadan ${mavjudlari.length} tasi mavjud`}
              >
                {mavjudlari.length === 0 && (
                  <p className={styles.ogohlantirish}>Bu bo'limdagi barcha taomlar bugun tugadi.</p>
                )}
                <ul className={styles.royxat}>
                  {tartiblangan.map((taom) => (
                    <TaomKartasi key={taom.id} taom={taom} />
                  ))}
                </ul>
              </Bolim>
            )
          })}
        </main>

        <footer className={styles.footer}>Narxlar QQS bilan. Yoqimli ishtaha!</footer>
      </div>
    </div>
  )
}
