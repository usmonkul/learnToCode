import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Ikkilik sonlar bilan o'ynaymiz",
  section: "Kompyuter qanday o'ylaydi",
}

export default function HowComputersCountLesson() {
  return (
    <>
      <p>
        O'tgan darsda kompyuter faqat 0 va 1 bilan "gaplashishini" bilib oldik. Lekin kompyuter
        qanday qilib faqat shu ikkita raqamdan foydalanib, <strong>istalgan sonni</strong> ifodalay
        oladi? Keling, buni barmoqlarimiz bilan o'ynab ko'raylik!
      </p>

      <h2>Biz odatda ishlatadigan sonlar</h2>
      <p>
        Biz kundalik hayotda <strong>o'nlik (decimal)</strong> sanoq tizimidan foydalanamiz — 0
        dan 9 gacha o'nta raqam bor. Har bir xona (birlik, o'nlik, yuzlik) oldingisidan 10 marta
        katta qiymatga ega.
      </p>
      <p>
        Kompyuter esa faqat ikkita raqamga (0 va 1) ega — shuning uchun u{' '}
        <strong>ikkilik (binary)</strong> sanoq tizimidan foydalanadi. Bu yerda har bir xona
        oldingisidan 10 marta emas, balki <strong>2 marta</strong> katta qiymatga ega:
      </p>

      <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-center text-sm">
          <thead>
            <tr className="bg-canvas-muted">
              <th className="border-b border-line px-3 py-2">8</th>
              <th className="border-b border-line px-3 py-2">4</th>
              <th className="border-b border-line px-3 py-2">2</th>
              <th className="border-b border-line px-3 py-2">1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2 text-ink-muted">xona</td>
              <td className="px-3 py-2 text-ink-muted">xona</td>
              <td className="px-3 py-2 text-ink-muted">xona</td>
              <td className="px-3 py-2 text-ink-muted">xona</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Bu — xuddi to'rtta chiroqcha qatorida, har biri o'ziga xos "og'irlikka" ega bo'lgani
        kabi: eng chapdagi chiroqcha yonik bo'lsa 8 qiymatini, keyingisi 4 ni, keyingisi 2 ni, eng
        o'ngdagisi esa 1 ni bildiradi. Yonik chiroqchalarning qiymatlarini qo'shsak — sonni topamiz!
      </p>

      <h2>Misol: 5 sonini ikkilik kodda yozish</h2>
      <p>
        5 sonini 4 ni va 1 ni qo'shib hosil qilish mumkin (4 + 1 = 5). Demak, "4" va "1"
        xonalaridagi chiroqchalar yonik, qolganlari o'chiq bo'lishi kerak:
      </p>
      <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full text-center text-sm">
          <thead>
            <tr className="bg-canvas-muted">
              <th className="border-b border-line px-3 py-2">8</th>
              <th className="border-b border-line px-3 py-2">4</th>
              <th className="border-b border-line px-3 py-2">2</th>
              <th className="border-b border-line px-3 py-2">1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2 font-semibold text-ink">0</td>
              <td className="px-3 py-2 font-semibold text-brand-600">1</td>
              <td className="px-3 py-2 font-semibold text-ink">0</td>
              <td className="px-3 py-2 font-semibold text-brand-600">1</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Demak, o'nlik tizimdagi <strong>5</strong> — ikkilik tizimda <strong>0101</strong>{' '}
        ko'rinishida yoziladi.
      </p>

      <Callout type="tip" title="Yodda tuting">
        Har bir keyingi xona — oldingisidan roppa-rosa ikki marta katta: 1, 2, 4, 8, 16, 32... Bu
        qator qancha davom etsa, kompyuter shuncha katta sonlarni ifodalay oladi.
      </Callout>

      <Exercise title="Mashq: o'zingiz sonni toping">
        <p>
          Yuqoridagi 8-4-2-1 jadvalidan foydalanib, <strong>10</strong> sonini ikkilik kodda
          yozishga harakat qiling. Qaysi xonalar yonik bo'lishi kerak?
        </p>
        <Solution>
          <p>
            10 = 8 + 2. Demak, "8" va "2" xonalari yonik (1), "4" va "1" xonalari o'chiq (0)
            bo'ladi: <strong>1010</strong>.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="8-4-2-1 jadvali bo'yicha, ikkilik kod 0110 qaysi o'nlik songa teng?"
        options={['4', '5', '6', '7']}
        correctIndex={2}
        explanation="0110 da yonik xonalar — 4 va 2. 4 + 2 = 6. Demak, 0110 — o'nlik tizimda 6 songa teng."
      />

      <KeyPoints>
        <li>Kompyuter sonlarni ikkilik (binary) tizimda ifodalaydi — har bir xona oldingisidan 2 marta katta.</li>
        <li>8-4-2-1 jadvali yordamida istalgan kichik sonni ikkilik kodga aylantirish mumkin.</li>
        <li>Yonik xonalarning qiymatlarini qo'shish — ikkilik kodni o'nlik songa aylantirish usuli.</li>
      </KeyPoints>
    </>
  )
}
