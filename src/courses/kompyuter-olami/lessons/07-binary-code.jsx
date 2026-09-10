import Callout from '@/components/content/Callout'
import Figure from '@/components/content/Figure'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'
import binarySwitches from '@/assets/binary-switches.svg'

export const meta = {
  title: "Ikkilik kod: hammasi 0 va 1",
  section: "Kompyuter qanday o'ylaydi",
}

export default function BinaryCodeLesson() {
  return (
    <>
      <p>
        Bu kursning eng sirli qismiga xush kelibsiz! Endi javob beramiz: protsessorning ichidagi
        millionlab "kalitchalar" aslida <strong>nima</strong>, va ular qanday qilib rasm, musiqa
        va matnni "tushunadi"?
      </p>

      <h2>Chiroq — yonadi yoki o'chadi, uchinchisi yo'q</h2>
      <p>
        Xonangizdagi chiroqni tasavvur qiling. Uning faqat ikkita holati bor: <strong>yonik
        (ON)</strong> yoki <strong>o'chiq (OFF)</strong>. "Yarim yonik" degan holat yo'q. Aynan
        shu oddiy g'oya — kompyuterning butun ishlash sirining o'zagi!
      </p>
      <p>
        Protsessor ichidagi har bir kichkina qismcha (uni <strong>tranzistor</strong> deb
        atashadi) xuddi shunday — u yoki oqim o'tkazadi (yonik), yoki o'tkazmaydi (o'chiq). Bu
        ikki holatni odamlar qulay yozish uchun raqamlarga o'xshatishgan:
      </p>
      <ul>
        <li>Yonik (ON) → <strong>1</strong></li>
        <li>O'chiq (OFF) → <strong>0</strong></li>
      </ul>
      <p>
        Faqat shu ikkita raqamdan (0 va 1) tuzilgan tizim — <strong>ikkilik kod (binary
        code)</strong> deyiladi. Kompyuterning ichida — bor-yo'g'i shu ikki holatning
        turli kombinatsiyalari!
      </p>

      <Figure
        src={binarySwitches}
        alt="Sakkizta chiroqchaning yonik va o'chiq holatlarini ko'rsatuvchi sxema"
        caption="3-rasm: sakkizta chiroqcha — bitta bayt (byte)"
      />

      <h2>Bit va bayt</h2>
      <p>
        Bitta 0 yoki 1 — <strong>bit</strong> deyiladi (bu "ikkilik raqam" degan inglizcha
        so'zning qisqargani). Sakkizta bitni yig'sak — <strong>bayt (byte)</strong> hosil bo'ladi.
        Bitta bayt orqali kompyuter, masalan, bitta harfni "eslab qolishi" mumkin.
      </p>

      <Callout type="tip" title="Bu — chinakam katta sirlarning kaliti">
        Siz ekranda ko'rayotgan har bir rasm, o'qiyotgan har bir harf, eshitayotgan har bir
        musiqa notasi — barchasi tagida, aslida, shunchaki uzun-uzun 0 va 1 lar qatoridir. Farqi
        faqat — kompyuter ularni qanday "tushunish" bo'yicha kelishib olganida.
      </Callout>

      <h2>Nega aynan ikkita holat?</h2>
      <p>
        Chunki elektr signalini aniq ikki holatga ("bor" yoki "yo'q") ajratish — texnika uchun
        eng ishonchli yo'l. Agar kompyuter, aytaylik, o'nta turli signal darajasini
        farqlashi kerak bo'lganida, ozgina shovqin yoki tebranish ularni bir-biriga aralashtirib
        yuborishi mumkin edi. Ikkita aniq holat esa — hech qachon adashtirib bo'lmaydigan
        yechim.
      </p>

      <Exercise title={`Sen ham "protsessor" bo'lib ko'r`}>
        <p>
          Do'stlaringiz bilan o'ynang: har biringiz qo'lingizni yoki ko'tarasiz (1), yoki
          tushirasiz (0). To'rttangiz safga turib, kimdir sizga "1-0-1-1" deb aytsin — shu
          buyruqqa qarab qo'llaringizni ko'taring/tushiring. Bu — sizning birinchi "ikkilik
          kod bilan ishlash" tajribangiz!
        </p>
        <Solution>
          <p>
            Bu mashqda to'g'ri/noto'g'ri javob yo'q — maqsad shuni his qilish: kompyuter ham xuddi
            shunday, millionlab kichik "qo'l"larni (tranzistorlarni) 0 va 1 buyrug'iga qarab
            "ko'targan" yoki "tushirgan" holda ishlaydi, faqat buni sekund ulushida bajaradi.
          </p>
        </Solution>
      </Exercise>

      <Quiz
        question="Ikkilik kod (binary code) nima uchun faqat 0 va 1 dan iborat?"
        options={[
          "Chunki kompyuter faqat shu ikki raqamni yozishni biladi",
          "Chunki elektr signalining ikkita aniq holati (bor/yo'q) bor va bu eng ishonchli usul",
          "Chunki dasturchilar shunchaki shunday kelishib olishgan, boshqa sababi yo'q",
          "Chunki 0 va 1 — eng oson chiziladigan raqamlar",
        ]}
        correctIndex={1}
        explanation="Kompyuterning ichidagi elektr signali aniq ikki holatga ega bo'lishi mumkin: oqim bor (1) yoki yo'q (0). Bu ikki holat hech qachon bir-biriga aralashib ketmaydi, shuning uchun ishonchli va aniq ishlashning kaliti aynan shu."
      />

      <KeyPoints>
        <li>Kompyuterning ichida hamma narsa — 0 va 1 (yonik/o'chiq) kombinatsiyasi orqali ifodalanadi. Bu — ikkilik kod.</li>
        <li>Bitta 0 yoki 1 — bit; sakkizta bit — bayt.</li>
        <li>Rasm, matn va musiqa — bularning barchasi tagida, aslida, uzun 0 va 1 lar qatori yotadi.</li>
      </KeyPoints>
    </>
  )
}
