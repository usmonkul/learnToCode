import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Tailwind bilan amaliy ishlash',
  section: '4-Dars',
}

export default function TailwindAmaliy() {
  return (
    <>
      <h2>Interaktiv holatlar va Responsive dizayn</h2>
      <p>
        Tailwind CSS nafaqat statik ko'rinish berish, balki sichqoncha ustiga kelganda (<code>hover:</code>), fokus tushganda (<code>focus:</code>) va har xil ekran o'lchamlari (<code>md:</code>, <code>lg:</code>) uchun moslashuvchan dizayn qurishda juda qulaydir.
      </p>

      <h2>1. Hover va Focus effektlari</h2>
      <p>
        Klass oldiga <code>hover:</code> yoki <code>focus:</code> prefiksini qo'yish orqali holatlarni boshqarish mumkin:
      </p>
      <CodeBlock lang="html">{`<button class="bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 text-white font-semibold py-2 px-5 rounded-lg transition-all">
  Tugma
</button>`}</CodeBlock>

      <h2>2. Responsive dizayn (Mobil va Desktop)</h2>
      <p>
        Tailwind <strong>Mobile-first</strong> yondashuviga asoslangan. Ya'ni boshlang'ich klasslar mobil ekran uchun, prefikslar esa kattaroq ekranlar uchun ishlaydi:
      </p>
      <ul>
        <li><code>sm:</code> &mdash; 640px va undan katta</li>
        <li><code>md:</code> &mdash; 768px va undan katta (planshet/noutbuk)</li>
        <li><code>lg:</code> &mdash; 1024px va undan katta (desktop)</li>
        <li><code>xl:</code> &mdash; 1280px va undan katta</li>
      </ul>

      <p>Misol uchun, mobilda 1 ustun, kompyuterda 3 ustunli grid:</p>
      <CodeBlock lang="html">{`<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div class="p-6 bg-white rounded-xl shadow">1-blok</div>
  <div class="p-6 bg-white rounded-xl shadow">2-blok</div>
  <div class="p-6 bg-white rounded-xl shadow">3-blok</div>
</div>`}</CodeBlock>

      <h2>3. Amaliy loyiha: Zamonaviy kurs kartochkasi</h2>
      <CodeBlock lang="html">{`<div class="max-w-sm bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100">
  <span class="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
    Yangi dars
  </span>
  <h3 class="mt-4 text-xl font-bold text-gray-900">
    Tailwind CSS Masterclass
  </h3>
  <p class="mt-2 text-gray-600 text-sm">
    Zamonaviy veb-ilovalarni chiroyli va tezkor dizayn qilishni o'rganing.
  </p>
  <div class="mt-6 flex items-center justify-between">
    <span class="text-lg font-bold text-gray-900">Bepul</span>
    <button class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
      Boshlash
    </button>
  </div>
</div>`}</CodeBlock>

      <Callout type="tip" title="Smooth animatsiyalar">
        Hover o'zgarishlari silliq bo'lishi uchun har doim <code>transition-all</code> yoki <code>transition-colors</code> klassini qo'shib qo'ying.
      </Callout>

      <Quiz
        question="Tailwind'da element faqat planshet va kompyuter ekranlarida (768px+) ko'rinishi, mobilda esa yashirin (hidden) bo'lishi uchun qaysi klasslar birikmasi ishlatiladi?"
        options={[
          'hidden md:block',
          'mobile:hidden desktop:block',
          'show-desktop hide-mobile',
          'display-none md:flex',
        ]}
        correctIndex={0}
        explanation="Mobile-first tamoyiliga ko'ra 'hidden' mobilda elementni yashiradi, 'md:block' esa 768px dan boshlab uni ko'rsatadi."
      />

      <Exercise title="Mashq: Responsive interaktiv tugma yaratish">
        <p>
          Mobilda to'liq kenglikdagi (<code>w-full</code>), kompyuterda esa avtomatik kenglikdagi (<code>md:w-auto</code>), sichqoncha ustiga borganda rangi to'qlashadigan tugma yarating.
        </p>
        <Solution>
          <CodeBlock lang="html">{`<button class="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-xl transition-colors">
  Ro'yxatdan o'tish
</button>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          <code>hover:</code> va <code>focus:</code> prefikslari interaktivlik beradi.
        </li>
        <li>
          Tailwind mobilga yo'naltirilgan (mobile-first): <code>md:</code>, <code>lg:</code> kattaroq ekranlar uchun qo'llaniladi.
        </li>
        <li>
          <code>transition-colors</code> va <code>transition-shadow</code> orqali silliq animatsiyalar yaratiladi.
        </li>
      </KeyPoints>
    </>
  )
}
