import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Oxiridan boshlab o'ylash",
  section: 'Yechim topish',
}

export default function OxiridanBoshlabOylashLesson() {
  return (
    <>
      <h2>Nega ba'zida oxiridan boshlash osonroq?</h2>
      <p>
        Odatda muammoni boshidan oxiriga qarab yechamiz: birinchi qadam, keyin ikkinchisi va
        hokazo. Lekin ba'zi muammolarda bu qiyin — chunki boshlanish nuqtasidan qaysi yo'l
        maqsadga olib borishi darrov ko'rinmaydi. Bunday holatlarda teskarisini qilish — maqsaddan
        orqaga qarab, "bundan oldin nima bo'lishi kerak edi?" deb so'rash — ancha osonroq bo'ladi.
      </p>

      <h2>Misol: soat nechada uyg'onish kerak?</h2>
      <p>
        Ertalab soat 8:00 da maktabda bo'lishingiz kerak. Nechada uyg'onish kerakligini bilish
        uchun maqsaddan boshlab, orqaga qarab hisoblaymiz:
      </p>
      <div className="not-prose my-6 flex flex-col items-center gap-2 rounded-xl border border-line bg-canvas-muted p-6 text-center text-sm text-ink">
        <div className="rounded-full border border-brand-300 bg-brand-50 px-4 py-2 font-medium text-brand-700">
          Maqsad: 8:00 — maktabda bo'lish
        </div>
        <span className="text-ink-muted">↓ bundan oldin:</span>
        <div className="rounded-lg border border-line bg-canvas px-4 py-2">
          7:40 — uydan chiqish (yo'l 20 daqiqa oladi)
        </div>
        <span className="text-ink-muted">↓ bundan oldin:</span>
        <div className="rounded-lg border border-line bg-canvas px-4 py-2">
          7:15 — tayyorgarlikni boshlash (kiyinish + nonushta — 25 daqiqa)
        </div>
        <span className="text-ink-muted">↓ bundan oldin:</span>
        <div className="rounded-lg border border-line bg-canvas px-4 py-2">
          7:00 — uyg'onish (yuvinish — 15 daqiqa)
        </div>
      </div>
      <p>
        Diagrammani yuqoridan pastga o'qidik — bu bizning fikrlash tartibimiz edi (maqsaddan
        orqaga). Lekin haqiqiy hayotda voqealar pastdan yuqoriga sodir bo'ladi: avval 7:00 da
        uyg'onasiz, keyin 7:15 da tayyorgarlikni boshlaysiz, 7:40 da uydan chiqasiz va 8:00 da
        maktabda bo'lasiz. Agar 7:00 dan kech uyg'onsangiz, zanjirning hammasi siljib, 8:00 ga
        ulgurmasligingiz mumkin.
      </p>
      <Callout type="note" title="Muhim">
        Oxiridan o'ylash — bu shunchaki "orqaga sanash" emas. Har bosqichda o'zingizdan bitta
        savol so'raysiz: "Shu holatga yetish uchun bundan oldin nima bajarilgan bo'lishi kerak
        edi?" Shu savolni takrorlab, siz maqsaddan boshlanish nuqtasigacha butun zanjirni
        qurib chiqasiz.
      </Callout>

      <h2>Ikkinchi misol: labirintni chiqishdan yechish</h2>
      <p>
        Xuddi shu fikrlash yo'l topishmoqlarida ham ishlaydi. Ba'zan kirish nuqtasidan
        boshlab yo'l izlash chalkash bo'ladi, chunki bir nechta yo'nalish bir vaqtda ochiq
        ko'rinadi. Lekin chiqish nuqtasidan orqaga — kirishga qarab — yurish ko'pincha
        yagona to'g'ri yo'lni tezroq ko'rsatadi. Quyidagi kichik labirintga qarang: {' '}
        <code>#</code> — devor, <code>.</code> — ochiq yo'l, <code>S</code> — kirish,{' '}
        <code>E</code> — chiqish.
      </p>
      <pre className="not-prose my-6 rounded-lg border border-line bg-canvas-muted p-4 font-mono text-sm leading-relaxed">
        {`#####
#S..#
#.#.#
#..E#
#####`}
      </pre>
      <p>
        Chiqishdan (E) boshlaymiz: yuqoriga bir qadam, yana yuqoriga, so'ng chapga, yana
        chapga — va kirishga (S) yetib boramiz. Buni oldindan (S dan E ga) o'qisak, xuddi shu
        yo'l teskari tartibda va teskari yo'nalishlarda takrorlanadi: o'ngga, o'ngga, pastga,
        pastga. Ikkala tomondan boshlash ham bir xil yo'lni topadi — muhimi, qaysi tomondan
        boshlash sizga qulayroq va tushunarliroq.
      </p>

      <Quiz
        question="Oxiridan o'ylash usulida har bosqichda o'zingizdan qanday savol so'raysiz?"
        options={[
          "Bu qadam qancha vaqt oladi?",
          "Shu holatga yetish uchun bundan oldin nima bo'lishi kerak edi?",
          "Bu eng qiziqarli qadammi?",
          "Buni kim bajaradi?",
        ]}
        correctIndex={1}
        explanation="Oxiridan o'ylashning mohiyati — maqsaddan boshlab, har safar 'bundan oldin nima kerak edi?' deb so'rab, zanjirni boshlanish nuqtasigacha qurib chiqish."
      />

      <Exercise title="Mashq">
        <p>
          Kechqurun soat 22:00 da uxlashni rejalashtiryapsiz. Uxlashdan oldin quyidagilarni
          bajarish kerak: kitob o'qish (15 daqiqa), tishlarni yuvish (5 daqiqa), pijama
          kiyish (5 daqiqa). Oxiridan boshlab o'ylab, nechada tayyorgarlikni boshlashingiz
          kerakligini toping.
        </p>
        <Solution>
          <p>
            Maqsaddan orqaga hisoblaymiz: 22:00 (uxlash) — 15 daqiqa (kitob) = 21:45 — 5
            daqiqa (tishlar) = 21:40 — 5 daqiqa (pijama) = 21:35. Demak, tayyorgarlikni soat
            21:35 da boshlash kerak, shundagina 22:00 ga aynan ulguriladi.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="Nima uchun ba'zi topshiriqlarni oxiridan (maqsaddan) boshlab yechish qulayroq?"
        options={[
          "Chunki boshidan boshlash har doim noto'g'ri",
          "Chunki maqsaddan orqaga har bosqichni aniq belgilash osonroq bo'lishi mumkin",
          "Chunki oxiridan boshlash tezroq vaqt oladi",
          "Chunki bu yagona to'g'ri usul",
        ]}
        correctIndex={1}
        explanation="Ba'zi muammolarda kerakli bosqichlar maqsaddan orqaga qarab ancha aniqroq ko'rinadi — bu usul har doim shart emas, lekin foydali qo'shimcha vosita."
      />

      <KeyPoints>
        <li>
          Oxiridan boshlab o'ylash — maqsaddan boshlab, har bosqichda "bundan oldin nima kerak
          edi?" deb so'rab, orqaga qarab zanjir qurish.
        </li>
        <li>
          Bu usul vaqt rejalashtirish (masalan, nechada uyg'onish kerak) kabi muammolarda
          juda foydali.
        </li>
        <li>
          Yo'l va labirint topshiriqlarida chiqishdan kirishga qarab yurish ham xuddi shu
          mantiqqa asoslanadi.
        </li>
        <li>
          Oldindan va orqadan yechish ko'pincha bir xil yo'lni topadi — qaysi tomondan
          boshlash qulayroq bo'lsa, o'shani tanlang.
        </li>
      </KeyPoints>
    </>
  )
}
