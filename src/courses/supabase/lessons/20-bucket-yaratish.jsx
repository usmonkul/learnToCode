import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Storage bucket yaratish",
  section: "6-bo'lim: Fayllarni saqlash",
}

export default function Lesson20BucketYaratish() {
  return (
    <>
      <p>
        Hozirgacha "Vazifalar boshqaruvchisi" loyihasida faqat matn va raqamlarni saqladik —
        vazifa sarlavhasi, bajarilgan-bajarilmagan holati, foydalanuvchi identifikatori. Bularning
        barchasi Postgres jadvalidagi ustunlarda yashaydi. Ammo real hayotda ko'pincha vazifaga
        rasm, hujjat yoki boshqa faylni biriktirish kerak bo'ladi — masalan, "shartnomani skan
        qilib qo'ying" degan vazifaga PDF faylni biriktirish. Bunday fayllarni jadval ustuniga
        to'g'ridan-to'g'ri joylashtirib bo'lmaydi, chunki Postgres katta binar fayllarni saqlashga
        mo'ljallangan emas. Aynan shu ehtiyoj uchun Supabase alohida xizmat taklif qiladi:{' '}
        <strong>Storage</strong>.
      </p>

      <h2>Supabase Storage nima?</h2>
      <p>
        Supabase Storage — bu loyihangizga biriktirilgan, fayllarni saqlash uchun mo'ljallangan
        alohida omborxona. U Postgres bazangizdan butunlay ajratilgan holda ishlaydi: bazada
        faqat faylning <em>manzili</em> (yo'li) saqlanadi, faylning o'zi esa Storage'da yotadi.
        Buni ikki xil shkaf sifatida tasavvur qiling — bittasida hujjatlar ro'yxati (jadval),
        ikkinchisida esa haqiqiy qog'ozlar (fayllar) saqlanadi, va ro'yxatdagi har bir yozuvda
        tegishli qog'ozning turgan joyi yozib qo'yilgan.
      </p>
      <p>
        Storage ichida fayllar <strong>bucket</strong>larga (chelaklarga) guruhlanadi. Bucket —
        oddiy fayl tizimidagi papkaga o'xshaydi: unga nom berasiz, va shu nom ostida istagancha
        fayl yuklashingiz mumkin. Bitta loyihada bir nechta bucket bo'lishi mumkin — masalan,
        biri foydalanuvchi avatarlari uchun, boshqasi hujjatlar uchun, yana biri mahsulot rasmlari
        uchun. Har bir bucket o'zining kirish huquqlari (public yoki private) va policy'lariga ega
        bo'lishi mumkin.
      </p>

      <Callout type="note" title="Nega alohida xizmat?">
        Fayllarni to'g'ridan-to'g'ri bazaga (masalan, <code>bytea</code> ustuniga) yozish
        texnik jihatdan mumkin, lekin amaliyotda tavsiya etilmaydi: bu bazani og'irlashtiradi,
        so'rovlarni sekinlashtiradi va backup hajmini keragidan ortiq kattalashtiradi. Storage
        xizmatlari (Supabase Storage, AWS S3, Google Cloud Storage va h.k.) aynan katta binar
        fayllarni samarali saqlash va yetkazish uchun optimallashtirilgan — baza esa faqat
        faylning manzilini biladi.
      </Callout>

      <h2><code>task-files</code> bucket'ini yaratish</h2>
      <p>
        Supabase Dashboard'da loyihangizga kiring va chap tomondagi menyudan{' '}
        <strong>Storage</strong> bo'limini oching. Bu yerda hozircha bucket'lar ro'yxati bo'sh —
        birinchi bucket'imizni yaratamiz.
      </p>
      <ol>
        <li>
          <strong>"New bucket"</strong> tugmasini bosing.
        </li>
        <li>
          Bucket nomi sifatida <code>task-files</code> deb kiriting. Bu nom kod ichida ham aynan
          shu ko'rinishda ishlatiladi, shuning uchun xatosiz yozing.
        </li>
        <li>
          <strong>"Public bucket"</strong> tugmachasini yoqing (ON holatiga o'tkazing).
        </li>
        <li>
          <strong>"Create bucket"</strong> tugmasini bosib, yaratishni yakunlang.
        </li>
      </ol>
      <p>
        Shundan so'ng <code>task-files</code> nomli bucket ro'yxatda paydo bo'ladi. Uning ichiga
        kirsangiz, hozircha bo'sh papkani ko'rasiz — keyingi darsda dasturdan fayl yuklashni
        o'rganamiz.
      </p>

      <h2>Public va private bucket farqi</h2>
      <p>
        Bucket yaratishda "Public bucket" tugmachasini yoqib, biz eng oddiy variantni tanladik:{' '}
        <strong>public bucket</strong> — ya'ni, agar kimdir faylning to'g'ri URL manzilini bilsa,
        u faylni hech qanday autentifikatsiyasiz, to'g'ridan-to'g'ri brauzerda ochib
        ko'rishi mumkin. Bu o'quv loyihasi uchun juda qulay: fayl manzilini olib, uni oddiy{' '}
        <code>{'<a href="...">'}</code> havolasi sifatida ko'rsatsak bo'ldi, boshqa hech qanday
        murakkab logika kerak emas.
      </p>
      <p>
        Ammo real production loyihalarda, ayniqsa fayllar maxfiy bo'lsa (masalan, shaxsiy
        hujjatlar, shartnomalar), bucket'ni <strong>private</strong> (yopiq) qilib qoldirish va
        <strong> signed URL</strong>lardan (imzolangan, vaqtinchalik amal qiluvchi havolalardan)
        foydalanish tavsiya etiladi. Signed URL — bu Supabase tomonidan generatsiya qilinadigan,
        ma'lum muddat (masalan, 60 daqiqa) ichida amal qiluvchi maxsus havola. Muddat tugagach,
        havola ishlamay qoladi va faylga qayta kirish uchun yangi signed URL so'rash kerak
        bo'ladi. Bu yondashuv fayllarni tashqi odamlar tomonidan tasodifiy topilib
        ochilishidan himoya qiladi.
      </p>

      <Callout type="tip" title="Nega bu kursda public bucket tanlaymiz?">
        Public bucket bilan boshlash — o'rganish uchun eng qisqa yo'l: fayl yuklash va uni
        ko'rsatish mantig'ini signed URL generatsiya qilish murakkabligisiz tushunish mumkin.
        Loyihangiz kattalashib, haqiqiy foydalanuvchi ma'lumotlari bilan ishlay boshlaganda,
        bucket'ni private qilib, <code>createSignedUrl()</code> metodiga o'tishni unutmang —
        buning API'si <code>getPublicUrl()</code>ga juda o'xshash, faqat qo'shimcha ravishda
        amal qilish muddatini ko'rsatish talab qilinadi.
      </Callout>

      <Quiz
        question="Supabase Storage'da bucket nima vazifani bajaradi?"
        options={[
          "Postgres jadvalining bir turi bo'lib, unda fayl baytlari saqlanadi",
          "Fayllarni guruhlash uchun ishlatiladigan, oddiy fayl tizimidagi papkaga o'xshash konteyner",
          "Faqat rasm fayllarini saqlash uchun mo'ljallangan maxsus jadval",
          "Foydalanuvchi autentifikatsiyasi uchun ishlatiladigan sozlama"
        ]}
        correctIndex={1}
        explanation="Bucket — Storage ichida fayllarni guruhlash uchun ishlatiladigan konteyner, papkaga o'xshaydi. Loyihada bir nechta bucket bo'lishi mumkin, har biri o'z nomiga va kirish huquqlariga ega."
      />

      <Quiz
        question="Public bucket va private bucket o'rtasidagi asosiy farq nimada?"
        options={[
          "Public bucket'ga faqat rasm, private bucket'ga esa istalgan fayl yuklash mumkin",
          "Public bucket'dagi fayllar to'g'ri URL orqali hech qanday autentifikatsiyasiz ochiladi, private bucket'da esa signed URL yoki autentifikatsiya kerak bo'ladi",
          "Private bucket faqat to'lovli Supabase rejalarida mavjud",
          "Public bucket'dagi fayllar avtomatik ravishda 24 soatdan keyin o'chiriladi"
        ]}
        correctIndex={1}
        explanation="Public bucket'dagi faylning URL manzilini bilgan har kim uni to'g'ridan-to'g'ri ocha oladi. Private bucket'da esa fayl himoyalangan — unga kirish uchun signed URL (vaqtinchalik amal qiluvchi havola) yoki tegishli policy orqali autentifikatsiya kerak."
      />

      <KeyPoints>
        <li>
          Supabase Storage — Postgres bazasidan ajratilgan, fayllarni saqlash uchun mo'ljallangan
          alohida xizmat; baza faqat faylning manzilini (yo'lini) biladi, faylning o'zini emas.
        </li>
        <li>
          Fayllar <strong>bucket</strong>larga guruhlanadi — bucket papkaga o'xshaydi, har biri
          o'z nomiga va kirish sozlamalariga ega.
        </li>
        <li>
          Loyihamiz uchun Storage bo'limida <code>task-files</code> nomli bucket yaratildi va
          "Public bucket" sozlamasi yoqildi.
        </li>
        <li>
          Public bucket — o'rganish uchun eng oddiy variant: to'g'ri URL'ni bilgan har kim faylni
          ocha oladi, autentifikatsiya talab qilinmaydi.
        </li>
        <li>
          Production loyihalarda maxfiy fayllar uchun bucket'ni private qilib, muddatli
          amal qiluvchi <strong>signed URL</strong>lardan foydalanish tavsiya etiladi.
        </li>
      </KeyPoints>
    </>
  )
}
