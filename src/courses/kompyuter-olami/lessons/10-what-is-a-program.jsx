import Callout from '@/components/content/Callout'
import CodeBlock from '@/components/content/CodeBlock'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Dastur nima va uni kim yozadi?",
  section: "Dastur va dasturiy ta'minot",
}

export default function WhatIsAProgramLesson() {
  return (
    <>
      <p>
        O'tgan darsda "software" — kompyuterga buyruq beradigan narsa ekanini bilib oldik. Endi
        yaqinroqdan qaraymiz: bu buyruqlar aslida <strong>nima</strong>, va ularni kim yozadi?
      </p>

      <h2>Dastur — bu retsept</h2>
      <p>
        Dastur (program) — bu, aslida, oshxona retseptiga juda o'xshaydi: aniq ketma-ketlikdagi
        qadamlar to'plami. Tort tayyorlash retsepti sizga "avval unni elang, keyin tuxumni
        qo'shing, keyin 30 daqiqa pishiring" deb aytganidek, dastur ham protsessorga "avval buni
        qil, keyin buni qil" deb ko'rsatma beradi.
      </p>
      <p>
        Bu qadamlar ketma-ketligi <strong>algoritm</strong> deyiladi — "kompyuter olami"ning eng
        muhim so'zlaridan biri. Agar siz allaqachon Mantiqiy va Algoritmik Fikrlash kursini
        o'tgan bo'lsangiz, algoritm nima ekanini bilasiz — dastur esa aynan shu algoritmning
        kompyuter tushunadigan tilda yozilgan ko'rinishi, xolos.
      </p>

      <h2>Dasturlash tili — inson va kompyuter orasidagi tarjimon</h2>
      <p>
        Kompyuter faqat 0 va 1 tilida "gaplashadi", inson esa o'z tilida gapiradi. Ikkovi
        o'rtasida <strong>dasturlash tili</strong> (masalan, Python, JavaScript) — tarjimon
        vazifasini bajaradi. Dasturchi o'ziga tushunarli, inson tiliga yaqinroq so'zlar bilan
        buyruq yozadi, kompyuter esa buni avtomatik ravishda 0 va 1 larga aylantirib bajaradi.
      </p>

      <CodeBlock lang="python">{`ism = "Aziz"
print("Salom, " + ism + "!")`}</CodeBlock>

      <p>
        Bu — Python dasturlash tilida yozilgan juda oddiy dastur. U kompyuterga aniq ikki
        buyruq beradi: "Aziz" degan so'zni eslab qol, keyin "Salom, Aziz!" deb ekranga chiqar.
        Ko'ryapsizmi — bu deyarli inson tiliga o'xshaydi!
      </p>

      <Callout type="tip" title="Dasturchi kim?">
        Dasturchi (programmer) — kompyuterga tushunarli tilda aniq buyruqlar yozadigan odam. Bu
        kasb aynan yozuvchi retsept yozgan kabi ishlaydi: qadamlar qanchalik aniq va to'g'ri
        tartibda yozilsa, natija ham shunchalik yaxshi chiqadi.
      </Callout>

      <h2>Agar dastur noto'g'ri yozilsa-chi?</h2>
      <p>
        Xuddi retseptda "tuxum qo'shish" qadami tushib qolsa tort yaxshi chiqmagani kabi, dastur
        ham noto'g'ri yoki chalkash yozilsa — kompyuter kutilmagan natija beradi yoki umuman
        ishlamay qoladi. Bunday xatolarni topish va tuzatish jarayoni{' '}
        <strong>debugging (xatolarni tuzatish)</strong> deb ataladi — hatto tajribali
        dasturchilar ham har kuni shug'ullanadigan ish.
      </p>

      <Exercise title="Mashq: o'zingiz retsept-dastur yozing">
        <p>
          "Tishlarni yuvish" jarayonini xuddi kompyuterga tushuntirayotgandek, aniq va tartib
          bilan qadamlarga bo'ling (masalan: 1. Cho'tkaga tish pastasi surtish. 2. ...). Har bir
          qadam shu qadar aniq bo'lsinki, hech narsani "taxmin qilish" kerak bo'lmasin.
        </p>
        <Solution>
          <p>Namuna:</p>
          <ol>
            <li>Cho'tkani suv bilan hollang.</li>
            <li>Cho'tkaga tish pastasidan siqib chiqaring.</li>
            <li>Yuqori tishlarni 30 soniya artib yuving.</li>
            <li>Pastki tishlarni 30 soniya artib yuving.</li>
            <li>Og'izni suv bilan chayqating.</li>
            <li>Cho'tkani suv bilan yuvib, joyiga qo'ying.</li>
          </ol>
        </Solution>
      </Exercise>

      <Quiz
        question="Algoritm nima?"
        options={[
          "Kompyuterning jismoniy qismi",
          "Bir masalani yechish uchun aniq tartibdagi qadamlar ketma-ketligi",
          "Faqat dasturchilar ishlatadigan maxsus til",
          "Kompyuterning nomi",
        ]}
        correctIndex={1}
        explanation="Algoritm — bu bir masalani yechish uchun aniq tartibda bajariladigan qadamlar ketma-ketligi, xuddi retsept kabi. Dastur — shu algoritmning kompyuter tushunadigan tilda yozilgan ko'rinishi."
      />

      <KeyPoints>
        <li>Dastur — protsessorga aniq tartibda beriladigan qadamlar (algoritm) to'plami, xuddi retsept kabi.</li>
        <li>Dasturlash tili — inson va kompyuter o'rtasidagi tarjimon vazifasini bajaradi.</li>
        <li>Dasturdagi xatolarni topish va tuzatish jarayoni debugging deb ataladi.</li>
      </KeyPoints>
    </>
  )
}
