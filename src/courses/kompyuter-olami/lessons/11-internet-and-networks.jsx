import Callout from '@/components/content/Callout'
import Figure from '@/components/content/Figure'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import internetNetworkMap from '@/assets/internet-network-map.svg'

export const meta = {
  title: "Kompyuterlar bir-biri bilan qanday gaplashadi?",
  section: "Internet va xavfsizlik",
}

export default function InternetAndNetworksLesson() {
  return (
    <>
      <p>
        Do'stingizga masofadan video qo'ng'iroq qilganingizda, aslida nima sodir bo'ladi?
        Sizning telefoningiz uning telefoni bilan qanday qilib "gaplasha oladi"? Javob —{' '}
        <strong>tarmoq (network)</strong> va <strong>internet</strong> degan tushunchalarda.
      </p>

      <h2>Pochta xizmatiga o'xshatish</h2>
      <p>
        Ikki uy o'rtasida xat yuborishni tasavvur qiling. Xatni pochta orqali yuborish uchun
        sizga aniq manzil kerak, va pochta xizmati xatni qadam-baqadam kerakli uyga yetkazadi.
        Kompyuterlar ham xuddi shunday ishlaydi — har bir qurilma o'ziga xos raqamli
        "manzil"ga (IP-manzil deyiladi) ega, va ma'lumot shu manzillar orqali "yo'l topib"
        boradi.
      </p>

      <Figure
        src={internetNetworkMap}
        alt="Internet orqali bir-biriga ulangan turli qurilmalar sxemasi"
        caption="5-rasm: turli qurilmalar internet orqali bir-biriga ulanadi"
      />

      <h2>Tarmoq (network) va internet</h2>
      <ul>
        <li>
          <strong>Tarmoq (network)</strong> — bir nechta kompyuterning bir-biriga ulanishi.
          Masalan, uyingizdagi Wi-Fi router orqali telefon, noutbuk va televizor bir-biriga
          ulangan — bu kichik, mahalliy tarmoq.
        </li>
        <li>
          <strong>Internet</strong> — dunyodagi millionlab kichik tarmoqlarning bir-biriga
          ulanishidan hosil bo'lgan, sayyoramizni qamrab olgan <em>ulkan tarmoqlar tarmog'i</em>.
        </li>
      </ul>
      <p>
        Siz brauzeringizda biror sayt ochganingizda, so'rovingiz Wi-Fi orqali routerga, u orqali
        internet-provayderga, va so'ngra dunyoning istalgan burchagida joylashgan{' '}
        <strong>server</strong> (sizga kerakli ma'lumotni saqlaydigan kuchli kompyuter) ga
        yetib boradi — va bularning barchasi soniyaning bir necha ulushida sodir bo'ladi!
      </p>

      <Callout type="note" title="Wi-Fi — simsiz pochtachi">
        Wi-Fi — kompyuterlar orasida ma'lumotni radiotolqinlar orqali (simsiz) uzatish usuli.
        Xuddi ko'zga ko'rinmas pochtachi kabi, u ma'lumotni havo orqali routerdan qurilmangizga
        va aksincha yetkazib turadi.
      </Callout>

      <Exercise title="Mashq: sayohat yo'lini chizing">
        <p>
          Qog'ozga chizing: siz telefoningizdan bir video jo'natasiz, u do'stingizning
          telefoniga yetib boradi. Orada qatnashishi mumkin bo'lgan barcha "bekatlar"ni
          (masalan: sizning telefoningiz → Wi-Fi router → internet → do'stingizning telefoni)
          ketma-ket chizib chiqing.
        </p>
        <Solution>
          <p>
            Oddiy yo'l quyidagicha bo'lishi mumkin: Sizning telefoningiz → uyingizdagi Wi-Fi
            router → internet-provayder → internet (dunyo bo'ylab tarmoqlar) → do'stingiz
            uyidagi router → do'stingizning telefoni. Har bir bekatda ma'lumot kichik
            "paket"larga bo'linib, tez va aniq yo'naltiriladi.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="Internet nima?"
        options={[
          "Bitta juda katta kompyuter",
          "Dunyodagi millionlab kichik tarmoqlarning bir-biriga ulanishidan hosil bo'lgan ulkan tarmoq",
          "Faqat video ko'rish uchun mo'ljallangan dastur",
          "Wi-Fi routerning boshqa nomi",
        ]}
        correctIndex={1}
        explanation="Internet — bitta qurilma emas, balki dunyo bo'ylab millionlab kichik tarmoqlarning bir-biriga ulanishidan hosil bo'lgan ulkan tarmoqlar tarmog'i. Wi-Fi esa shu tarmoqqa simsiz ulanish usullaridan biri, xolos."
      />

      <KeyPoints>
        <li>Tarmoq (network) — bir nechta kompyuterning o'zaro ulanishi; internet — millionlab tarmoqning ulkan birlashmasi.</li>
        <li>Har bir qurilma o'ziga xos raqamli manzilga ega, ma'lumot shu manzillar orqali yo'naltiriladi.</li>
        <li>Wi-Fi — ma'lumotni radiotolqinlar orqali simsiz uzatish usuli.</li>
      </KeyPoints>
    </>
  )
}
