import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "Tailwind CSS o'rnatish va sozlash",
  section: '2-Dars',
}

export default function TailwindOrnatish() {
  return (
    <>
      <h2>Tailwind CSS'ni loyihaga ulash usullari</h2>
      <p>
        Tailwind CSS'dan foydalanishning 2 ta asosiy usuli mavjud:
      </p>
      <ul>
        <li><strong>Playground / CDN:</strong> Kichik sinovlar va o'rganish uchun tezkor usul.</li>
        <li><strong>Vite / PostCSS (Tavsiya etiladi):</strong> Haqiqiy loyihalar va production uchun eng optimal, tez va engil usul.</li>
      </ul>

      <h2>1. CDN orqali tezkor ulash (HTML uchun)</h2>
      <p>
        Hech qanday o'rnatishlarsiz to'g'ridan-to'g'ri <code>index.html</code> faylining <code>&lt;head&gt;</code> qismiga skript qo'shish kifoya:
      </p>
      <CodeBlock lang="html">{`<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8" />
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen">
  <h1 class="text-3xl font-bold text-indigo-600">Salom Tailwind!</h1>
</body>
</html>`}</CodeBlock>

      <h2>2. Vite + React loyihasiga Tailwind CSS v4 o'rnatish</h2>
      <p>
        Zamonaviy React yoki Vite loyihasida Tailwind v4 ni o'rnatish juda osonlashgan:
      </p>

      <h3>1-qadam: Paketlarni o'rnatish</h3>
      <CodeBlock lang="bash">{`npm install tailwindcss @tailwindcss/vite`}</CodeBlock>

      <h3>2-qadam: vite.config.js faylini sozlash</h3>
      <CodeBlock lang="javascript">{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})`}</CodeBlock>

      <h3>3-qadam: index.css fayliga Tailwind'ni import qilish</h3>
      <CodeBlock lang="css">{`@import "tailwindcss";`}</CodeBlock>

      <Callout type="tip" title="Tailwind v4 qulayligi">
        Tailwind CSS v4 versiyasida ortiqcha <code>tailwind.config.js</code> yoki <code>postcss.config.js</code> fayllari shart emas — faqat bitta <code>@import "tailwindcss";</code> yetarli!
      </Callout>

      <Quiz
        question="Vite bilan yaratilgan yangi loyihada Tailwind CSS v4 ni ulash uchun CSS fayliga nima yoziladi?"
        options={[
          '@import "tailwindcss";',
          '@tailwind base; @tailwind components;',
          '<link rel="stylesheet" href="tailwind.css">',
          'import tailwind from "tailwindcss"',
        ]}
        correctIndex={0}
        explanation="Tailwind v4 CSS-first arxitekturaga ega bo'lib, CSS fayl boshida @import 'tailwindcss'; yozish orqali ulanadi."
      />

      <Exercise title="Mashq: Birinchi Tailwind komponentini yaratish">
        <p>
          HTML yoki JSX sahifangizda markazda joylashgan, ko'k rangli (<code>bg-blue-600</code>), matni oq (<code>text-white</code>) va burchaklari yumaloqlangan (<code>rounded-lg</code>) tugma yarating.
        </p>
        <Solution>
          <CodeBlock lang="html">{`<button class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg shadow transition-colors">
  Boshlash
</button>`}</CodeBlock>
        </Solution>
      </Exercise>

      <KeyPoints>
        <li>
          CDN orqali tezkor sinab ko'rish mumkin, lekin production uchun Vite/PostCSS tavsiya etiladi.
        </li>
        <li>
          Tailwind v4 da sozlash uchun <code>@tailwindcss/vite</code> va <code>@import "tailwindcss";</code> kifoya.
        </li>
        <li>
          Klasslar to'g'ridan-to'g'ri HTML yoki JSX'dagi <code>class</code> / <code>className</code> orqali yoziladi.
        </li>
      </KeyPoints>
    </>
  )
}
