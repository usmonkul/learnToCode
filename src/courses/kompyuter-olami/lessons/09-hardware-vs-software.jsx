import Callout from '@/components/content/Callout'
import Figure from '@/components/content/Figure'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import hardwareSoftwareLayers from '@/assets/hardware-software-layers.svg'

export const meta = {
  title: "Qattiq va yumshoq qism: Hardware va Software",
  section: "Dastur va dasturiy ta'minot",
}

export default function HardwareVsSoftwareLesson() {
  return (
    <>
      <p>
        Endi biz protsessor, xotira va qurilmalarni bilamiz — bularning barchasi kompyuterning{' '}
        <strong>ushlab ko'rish mumkin bo'lgan</strong> qismlari. Lekin telefoningizdagi o'yin yoki
        rasm chizish ilovasini ushlab bo'lmaydi-ku! Bu qanday tushuntiriladi?
      </p>

      <h2>Pianino va nota</h2>
      <p>
        Pianinoni tasavvur qiling — u og'ir, jismoniy, ushlab ko'rsa bo'ladigan asbob. Endi
        pianinoda chalinadigan <strong>musiqa notasini</strong> tasavvur qiling — bu qog'ozdagi
        belgilar, ular pianinoga "qanday chalish kerakligini" aytadi. Pianinoning o'zi hech qachon
        o'zgarmaydi, lekin unda turli notalarni chalib, mutlaqo boshqa-boshqa musiqalar hosil
        qilish mumkin.
      </p>
      <p>
        Kompyuterda ham xuddi shunday ikki qism bor:
      </p>
      <ul>
        <li>
          <strong>Hardware (qattiq qism)</strong> — ushlab ko'rsa bo'ladigan jismoniy qismlar:
          protsessor, xotira, ekran, klaviatura. Bu — "pianino".
        </li>
        <li>
          <strong>Software (dasturiy ta'minot)</strong> — ushlab bo'lmaydigan, lekin qattiq
          qismga "nima qilish kerakligini" aytadigan buyruqlar to'plami. Bu — "nota".
        </li>
      </ul>

      <Figure
        src={hardwareSoftwareLayers}
        alt="Qattiq qism, operatsion tizim va ilovalarning uch qavatli sxemasi"
        caption="4-rasm: qattiq qism ustiga operatsion tizim, uning ustiga esa ilovalar joylashadi"
      />

      <h2>Software'ning ikki turi</h2>
      <p>
        Dasturiy ta'minot ham ikki qavatga bo'linadi:
      </p>
      <ul>
        <li>
          <strong>Operatsion tizim (OS)</strong> — Windows, macOS, Android yoki iOS kabi
          dasturlar. Bu — kompyuterning "asosiy boshqaruvchisi", u qattiq qismni boshqaradi va
          boshqa dasturlarga ishlash imkonini beradi.
        </li>
        <li>
          <strong>Ilovalar (Apps)</strong> — brauzer, o'yinlar, kalkulyator kabi siz to'g'ridan-
          to'g'ri ishlatadigan dasturlar. Ular operatsion tizim "ustida" ishlaydi.
        </li>
      </ul>

      <Callout type="note" title="Bitta qattiq qism — minglab dasturlar">
        Bir xil telefonda siz ham o'yin o'ynaysiz, ham suratga olasiz, ham xabar yozasiz. Qattiq
        qism (protsessor, xotira) bir xil qoladi — o'zgaradigan narsa faqat qaysi dastur
        (software) ishlab turgani.
      </Callout>

      <Exercise title="Mashq: Hardware yoki Software?">
        <p>
          Quyidagilarni Hardware yoki Software toifasiga ajrating: klaviatura, YouTube ilovasi,
          protsessor, Windows operatsion tizimi, ekran, kalkulyator dasturi.
        </p>
        <Solution>
          <p>
            <strong>Hardware:</strong> klaviatura, protsessor, ekran — bularning barchasini
            ushlab ko'rsa bo'ladi.
          </p>
          <p>
            <strong>Software:</strong> YouTube ilovasi, Windows operatsion tizimi, kalkulyator
            dasturi — bularning hech birini ushlab bo'lmaydi, ular buyruqlar to'plamidir.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="Qaysi javob to'g'ri: Hardware va Software o'rtasidagi farq nimada?"
        options={[
          "Hardware qimmat, Software arzon",
          "Hardware ushlab ko'rsa bo'ladigan jismoniy qism, Software esa unga buyruq beruvchi dastur",
          "Hardware faqat telefonlarda, Software faqat kompyuterlarda bo'ladi",
          "Ular orasida hech qanday farq yo'q, ikkalasi ham bir xil narsa",
        ]}
        correctIndex={1}
        explanation="Hardware — kompyuterning ushlab ko'rsa bo'ladigan jismoniy qismlari (protsessor, ekran, klaviatura). Software esa shu qismlarga nima qilish kerakligini aytadigan, ushlab bo'lmaydigan buyruqlar to'plami."
      />

      <KeyPoints>
        <li>Hardware — kompyuterning ushlab ko'rsa bo'ladigan jismoniy qismlari.</li>
        <li>Software — hardware'ga buyruq beradigan, ushlab bo'lmaydigan dasturlar to'plami.</li>
        <li>Software o'zi ham ikki qavat: operatsion tizim (asosiy boshqaruvchi) va uning ustidagi ilovalar.</li>
      </KeyPoints>
    </>
  )
}
