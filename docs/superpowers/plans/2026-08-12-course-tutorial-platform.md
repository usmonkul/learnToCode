# Course Tutorial Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the front-end architecture for a self-serve, front-end-only programming tutorial platform, and prove it end-to-end with one real sample course (Python Basics, 3 lessons).

**Architecture:** Lessons are discovered from the filesystem at build time via Vite's `import.meta.glob` and read through a single `registry.js` module. Lesson files compose a small library of content primitives (`CodeBlock`, `Callout`, `Quiz`, `Exercise`/`Solution`, `KeyPoints`, `Figure`) plus plain semantic HTML styled for free by `@tailwindcss/typography`. Layout components (`TopNav`, `Sidebar`, `LessonNav`, `Breadcrumbs`, `CourseCard`) and three routes (`/`, `/:courseId`, `/:courseId/:slug`) render the registry's data.

**Tech Stack:** React 19, Vite 8, React Router 7, Tailwind CSS v4 (CSS-first config), Zustand 5, lucide-react, prism-react-renderer, @tailwindcss/typography, clsx, tailwind-merge.

## Global Constraints

- No backend, no authentication, no progress persistence in this phase.
- Code blocks are static (syntax-highlighted + copy button) — no live/editable execution.
- Light mode only. Colors are defined as CSS custom properties / Tailwind `@theme` tokens so dark mode is cheap to add later, but no dark theme is implemented now.
- Single language: **Uzbek** for all lesson prose and all UI chrome (buttons, nav labels, headings). Code, keywords, and technical terms stay in English; a bracketed Uzbek translation is added inline where it helps (e.g. `o'zgaruvchi (variable)`). This is a hardcoded copy convention, not an i18n system.
- Plain JavaScript with `.jsx` files — no TypeScript (matches the existing scaffold; `@types/*` packages already present are for editor intellisense only).
- No automated test runner is installed this phase. Per-task verification is `npm run lint` (oxlint parses every file, catching syntax/hook/JSX errors project-wide regardless of what's wired into `App.jsx` yet) and, once a task's files are actually imported into the app, `npm run build`. The final task ends with a full dev-server browser smoke test — that is the true end-to-end check for `registry.js`'s glob/sort/group logic, since it depends on real files existing and being rendered.
- All internal imports use the `@/` alias for `src/` (added in Task 1), not relative `../../..` paths.
- Deviations from the design doc, made during planning for concreteness: `course.meta.js` omits `id` (the registry derives it from the folder name — one source of truth instead of two) and omits `color` (no per-course visual differentiation is needed yet with a single course). The `ui/` primitives folder ends up containing only `Disclosure` — `Badge`/`Button`/`IconButton` were dropped because nothing in the built app actually needs them (avoiding unused, premature abstractions).

---

## Task 1: Project setup — dependencies, path alias, theme tokens

**Files:**
- Modify: `package.json` (new dependencies)
- Modify: `vite.config.js` (add `@` alias)
- Create: `jsconfig.json` (editor path resolution for the alias)
- Modify: `src/index.css` (typography plugin + theme tokens)
- Create: `src/lib/cn.js`

**Interfaces:**
- Consumes: nothing (first task)
- Produces: `cn(...inputs)` from `@/lib/cn` — used by every component task from here on. Tailwind utility classes `bg-brand-{50..900}`, `text-brand-{50..900}`, `border-brand-{50..900}`, `bg-canvas`, `bg-canvas-muted`, `text-ink`, `text-ink-muted`, `border-line` — used throughout all later tasks. The `@/*` import alias resolving to `src/*` — used throughout all later tasks.

- [ ] **Step 1: Install new dependencies**

Run:
```bash
npm install prism-react-renderer @tailwindcss/typography clsx tailwind-merge
```

Expected: `package.json` `dependencies` gains all four packages; install completes with no errors.

- [ ] **Step 2: Add the `@` path alias to Vite config**

Replace the full contents of `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
```

- [ ] **Step 3: Add `jsconfig.json` so editors resolve the alias too**

Create `jsconfig.json` at the project root:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

- [ ] **Step 4: Register the typography plugin and brand/semantic color tokens**

Replace the full contents of `src/index.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-300: #a5b4fc;
  --color-brand-400: #818cf8;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;

  --color-canvas: #ffffff;
  --color-canvas-muted: #f8fafc;
  --color-line: #e2e8f0;
  --color-ink: #0f172a;
  --color-ink-muted: #475569;
}

body {
  background-color: var(--color-canvas-muted);
  color: var(--color-ink);
}
```

- [ ] **Step 5: Create the `cn()` classname helper**

Create `src/lib/cn.js`:

```js
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 6: Verify**

Run: `npm run build`
Expected: build succeeds (this exercises the new `index.css` through `main.jsx`, confirming the `@plugin` directive and `@theme` tokens parse correctly).

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.js jsconfig.json src/index.css src/lib/cn.js
git commit -m "Add path alias, theme tokens, and content-library dependencies"
```

---

## Task 2: Simple content primitives — CodeBlock, Callout, KeyPoints, Figure

**Files:**
- Create: `src/components/content/CodeBlock.jsx`
- Create: `src/components/content/Callout.jsx`
- Create: `src/components/content/KeyPoints.jsx`
- Create: `src/components/content/Figure.jsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/cn` (Task 1)
- Produces:
  - `<CodeBlock lang="python">{"code string"}</CodeBlock>` — default export
  - `<Callout type="tip"|"note"|"warning"|"danger" title="...">children</Callout>` — default export
  - `<KeyPoints>{"<li> elements"}</KeyPoints>` — default export
  - `<Figure src alt caption />` — default export

  All four are consumed by the sample lesson files in Task 5.

- [ ] **Step 1: Create `CodeBlock`**

Create `src/components/content/CodeBlock.jsx`:

```jsx
import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { Check, Copy } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function CodeBlock({ lang = 'text', children }) {
  const [copied, setCopied] = useState(false)
  const code = children.trim()

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Highlight theme={themes.oneLight} code={code} language={lang}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="not-prose my-6 overflow-hidden rounded-lg border border-line">
          <div className="flex items-center justify-between border-b border-line bg-canvas-muted px-4 py-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
              {lang}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-brand-600"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Nusxalandi' : 'Nusxalash'}
            </button>
          </div>
          <pre className={cn(className, 'overflow-x-auto px-4 py-3 text-sm')} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        </div>
      )}
    </Highlight>
  )
}
```

- [ ] **Step 2: Create `Callout`**

Create `src/components/content/Callout.jsx`:

```jsx
import { Info, Lightbulb, AlertTriangle, AlertOctagon } from 'lucide-react'
import { cn } from '@/lib/cn'

const VARIANTS = {
  tip: {
    icon: Lightbulb,
    className: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    iconClassName: 'text-emerald-600',
  },
  note: {
    icon: Info,
    className: 'border-brand-200 bg-brand-50 text-brand-900',
    iconClassName: 'text-brand-600',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-amber-200 bg-amber-50 text-amber-900',
    iconClassName: 'text-amber-600',
  },
  danger: {
    icon: AlertOctagon,
    className: 'border-red-200 bg-red-50 text-red-900',
    iconClassName: 'text-red-600',
  },
}

export default function Callout({ type = 'note', title, children }) {
  const variant = VARIANTS[type] ?? VARIANTS.note
  const Icon = variant.icon

  return (
    <div className={cn('not-prose my-6 flex gap-3 rounded-lg border p-4', variant.className)}>
      <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', variant.iconClassName)} />
      <div className="text-sm leading-relaxed">
        {title && <p className="mb-1 font-semibold">{title}</p>}
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `KeyPoints`**

Create `src/components/content/KeyPoints.jsx`:

```jsx
import { CheckCircle2 } from 'lucide-react'

export default function KeyPoints({ children }) {
  return (
    <div className="not-prose my-6 rounded-lg border border-line bg-canvas-muted p-5">
      <p className="mb-3 flex items-center gap-2 font-semibold text-ink">
        <CheckCircle2 className="h-5 w-5 text-brand-600" />
        Asosiy fikrlar
      </p>
      <ul className="flex flex-col gap-2 text-sm text-ink-muted">{children}</ul>
    </div>
  )
}
```

- [ ] **Step 4: Create `Figure`**

Create `src/components/content/Figure.jsx`:

```jsx
export default function Figure({ src, alt, caption }) {
  return (
    <figure className="not-prose my-6">
      <img src={src} alt={alt} className="w-full rounded-lg border border-line" />
      {caption && <figcaption className="mt-2 text-center text-sm text-ink-muted">{caption}</figcaption>}
    </figure>
  )
}
```

- [ ] **Step 5: Verify**

Run: `npm run lint`
Expected: no errors. (These files aren't imported anywhere yet, so `npm run build` won't exercise them — that happens once Task 5's lessons and Task 7's pages wire everything together.)

- [ ] **Step 6: Commit**

```bash
git add src/components/content/CodeBlock.jsx src/components/content/Callout.jsx src/components/content/KeyPoints.jsx src/components/content/Figure.jsx
git commit -m "Add static content primitives: CodeBlock, Callout, KeyPoints, Figure"
```

---

## Task 3: Interactive content primitives — Disclosure, Quiz, Exercise, Solution

**Files:**
- Create: `src/components/ui/Disclosure.jsx`
- Create: `src/components/content/Quiz.jsx`
- Create: `src/components/content/Exercise.jsx`
- Create: `src/components/content/Solution.jsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/cn` (Task 1)
- Produces:
  - `<Disclosure summary="...">children</Disclosure>` — default export from `@/components/ui/Disclosure`, consumed by `Solution` in this same task
  - `<Quiz question options={[...]} correctIndex={n} explanation="..." />` — default export
  - `<Exercise title="Mashq">children</Exercise>` — default export
  - `<Solution>children</Solution>` — default export

  `Quiz`, `Exercise`, and `Solution` are consumed by the sample lesson files in Task 5.

- [ ] **Step 1: Create the `Disclosure` ui primitive**

Create `src/components/ui/Disclosure.jsx`:

```jsx
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function Disclosure({ summary, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-md border border-line">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm font-medium text-ink"
      >
        {summary}
        <ChevronDown className={cn('h-4 w-4 shrink-0 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="border-t border-line px-4 py-3 text-sm">{children}</div>}
    </div>
  )
}
```

- [ ] **Step 2: Create `Solution` (built on `Disclosure`)**

Create `src/components/content/Solution.jsx`:

```jsx
import Disclosure from '@/components/ui/Disclosure'

export default function Solution({ children }) {
  return (
    <div className="not-prose mt-4">
      <Disclosure summary="Yechimni ko'rsatish">{children}</Disclosure>
    </div>
  )
}
```

- [ ] **Step 3: Create `Exercise`**

Create `src/components/content/Exercise.jsx`:

```jsx
export default function Exercise({ title = 'Mashq', children }) {
  return (
    <div className="not-prose my-6 rounded-lg border border-brand-200 bg-brand-50 p-5">
      <p className="mb-2 font-semibold text-brand-900">{title}</p>
      <div className="text-sm leading-relaxed text-ink">{children}</div>
    </div>
  )
}
```

- [ ] **Step 4: Create `Quiz`**

Create `src/components/content/Quiz.jsx`:

```jsx
import { useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '@/lib/cn'

export default function Quiz({ question, options, correctIndex, explanation }) {
  const [selected, setSelected] = useState(null)
  const answered = selected !== null
  const isCorrect = selected === correctIndex

  return (
    <div className="not-prose my-6 rounded-lg border border-line bg-canvas p-5">
      <p className="mb-3 font-semibold text-ink">{question}</p>
      <div className="flex flex-col gap-2">
        {options.map((option, index) => {
          const isSelected = selected === index
          const showCorrect = answered && index === correctIndex
          const showWrong = answered && isSelected && !isCorrect

          return (
            <button
              key={option}
              type="button"
              disabled={answered}
              onClick={() => setSelected(index)}
              className={cn(
                'flex items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors',
                'border-line hover:border-brand-300',
                showCorrect && 'border-emerald-400 bg-emerald-50',
                showWrong && 'border-red-400 bg-red-50',
                answered && !showCorrect && !showWrong && 'opacity-60'
              )}
            >
              <span>{option}</span>
              {showCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
              {showWrong && <XCircle className="h-4 w-4 text-red-600" />}
            </button>
          )
        })}
      </div>
      {answered && explanation && <p className="mt-3 text-sm text-ink-muted">{explanation}</p>}
    </div>
  )
}
```

- [ ] **Step 5: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/Disclosure.jsx src/components/content/Quiz.jsx src/components/content/Exercise.jsx src/components/content/Solution.jsx
git commit -m "Add interactive content primitives: Disclosure, Quiz, Exercise, Solution"
```

---

## Task 4: Course registry

**Files:**
- Create: `src/courses/registry.js`

**Interfaces:**
- Consumes: nothing (reads the filesystem directly via `import.meta.glob`)
- Produces (all named exports from `@/courses/registry`):
  - `getAllCourses(): Array<{ id, title, description, icon }>`
  - `getCourse(courseId): { id, title, description, icon } | undefined`
  - `getLessons(courseId): Array<{ slug, path, meta: { title, section }, Component }>`
  - `getLesson(courseId, slug): { slug, path, meta, Component } | undefined`
  - `getAdjacentLessons(courseId, slug): { prev: lessonOrNull, next: lessonOrNull }`
  - `getGroupedLessons(courseId): Array<{ section: string, lessons: Array<lesson> }>`

  Consumed by Task 6 (`Sidebar`, `LessonNav`) and Task 7 (all pages). Requires course folders shaped as `src/courses/<id>/course.meta.js` (default-exports `{ title, description, icon }`) and `src/courses/<id>/lessons/<NN-slug>.jsx` (exports `meta: { title, section }` and a default component) — created in Task 5.

- [ ] **Step 1: Create `registry.js`**

Create `src/courses/registry.js`:

```js
const courseMetaModules = import.meta.glob('./*/course.meta.js', { eager: true })
const lessonModules = import.meta.glob('./*/lessons/*.jsx', { eager: true })

// Lesson filenames must use a zero-padded two-digit prefix ("01-...", "02-...")
// so plain string sorting keeps them in the right order.
function courseIdFromPath(path) {
  return path.match(/^\.\/([^/]+)\//)[1]
}

function slugFromLessonPath(path) {
  return path
    .split('/')
    .pop()
    .replace(/\.jsx$/, '')
    .replace(/^\d+-/, '')
}

const courses = new Map()
for (const [path, mod] of Object.entries(courseMetaModules)) {
  const id = courseIdFromPath(path)
  courses.set(id, { ...mod.default, id })
}

const lessonsByCourse = new Map()
for (const [path, mod] of Object.entries(lessonModules)) {
  const courseId = courseIdFromPath(path)
  const entry = {
    slug: slugFromLessonPath(path),
    path,
    meta: mod.meta,
    Component: mod.default,
  }
  if (!lessonsByCourse.has(courseId)) lessonsByCourse.set(courseId, [])
  lessonsByCourse.get(courseId).push(entry)
}
for (const lessons of lessonsByCourse.values()) {
  lessons.sort((a, b) => a.path.localeCompare(b.path))
}

export function getAllCourses() {
  return Array.from(courses.values())
}

export function getCourse(courseId) {
  return courses.get(courseId)
}

export function getLessons(courseId) {
  return lessonsByCourse.get(courseId) ?? []
}

export function getLesson(courseId, slug) {
  return getLessons(courseId).find((lesson) => lesson.slug === slug)
}

export function getAdjacentLessons(courseId, slug) {
  const lessons = getLessons(courseId)
  const index = lessons.findIndex((lesson) => lesson.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? lessons[index - 1] : null,
    next: index < lessons.length - 1 ? lessons[index + 1] : null,
  }
}

export function getGroupedLessons(courseId) {
  const lessons = getLessons(courseId)
  const groups = []
  for (const lesson of lessons) {
    const section = lesson.meta?.section ?? ''
    const lastGroup = groups[groups.length - 1]
    if (lastGroup && lastGroup.section === section) {
      lastGroup.lessons.push(lesson)
    } else {
      groups.push({ section, lessons: [lesson] })
    }
  }
  return groups
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint`
Expected: no errors. (No course folders exist yet, so the globs resolve to empty objects — that's fine, this task only proves the module itself is well-formed. Task 5 gives it real data; Task 7's smoke test proves the logic is correct.)

- [ ] **Step 3: Commit**

```bash
git add src/courses/registry.js
git commit -m "Add filesystem-driven course registry"
```

---

## Task 5: Sample course — Python Basics (3 lessons)

**Files:**
- Create: `src/courses/python/course.meta.js`
- Create: `src/assets/loop-flow.svg`
- Create: `src/courses/python/lessons/01-hello-world.jsx`
- Create: `src/courses/python/lessons/02-variables.jsx`
- Create: `src/courses/python/lessons/03-loops.jsx`

**Interfaces:**
- Consumes: `CodeBlock`, `Callout`, `KeyPoints`, `Figure` (Task 2); `Quiz`, `Exercise`, `Solution` (Task 3); matches the file-shape `registry.js` (Task 4) expects
- Produces: real content that `registry.js` will discover once it's wired into the app (Task 7). No other file imports these lesson files directly — they're only reached through the registry's glob.

- [ ] **Step 1: Create the course metadata**

Create `src/courses/python/course.meta.js`:

```js
export default {
  title: 'Python',
  description:
    "Python tilining asoslarini noldan boshlab, amaliy misollar va mashqlar orqali o'rganing.",
  icon: 'Code2',
}
```

- [ ] **Step 2: Create the loop-flow diagram used by lesson 3**

Create `src/assets/loop-flow.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 460" width="320" height="460" role="img" aria-labelledby="loop-flow-title">
  <title id="loop-flow-title">While siklining ishlash sxemasi</title>
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
      <path d="M0,0 L10,5 L0,10 Z" fill="#4f46e5" />
    </marker>
  </defs>

  <rect x="110" y="10" width="100" height="44" rx="22" fill="#eef2ff" stroke="#4f46e5" stroke-width="2" />
  <text x="160" y="37" text-anchor="middle" font-size="14" fill="#312e81" font-family="sans-serif">Boshlash</text>

  <line x1="160" y1="54" x2="160" y2="94" stroke="#4f46e5" stroke-width="2" marker-end="url(#arrow)" />

  <polygon points="160,90 230,150 160,210 90,150" fill="#ffffff" stroke="#4f46e5" stroke-width="2" />
  <text x="160" y="145" text-anchor="middle" font-size="13" fill="#312e81" font-family="sans-serif">Shart</text>
  <text x="160" y="163" text-anchor="middle" font-size="13" fill="#312e81" font-family="sans-serif">rostmi?</text>

  <line x1="160" y1="210" x2="160" y2="250" stroke="#4f46e5" stroke-width="2" marker-end="url(#arrow)" />
  <text x="176" y="235" font-size="12" fill="#475569" font-family="sans-serif">ha</text>

  <rect x="90" y="250" width="140" height="50" rx="8" fill="#eef2ff" stroke="#4f46e5" stroke-width="2" />
  <text x="160" y="280" text-anchor="middle" font-size="13" fill="#312e81" font-family="sans-serif">Amalni bajarish</text>

  <path d="M90,275 H40 V150 H88" fill="none" stroke="#4f46e5" stroke-width="2" marker-end="url(#arrow)" />

  <line x1="230" y1="150" x2="270" y2="150" stroke="#4f46e5" stroke-width="2" />
  <text x="245" y="140" font-size="12" fill="#475569" font-family="sans-serif">yo'q</text>
  <path d="M270,150 V400 H210" fill="none" stroke="#4f46e5" stroke-width="2" marker-end="url(#arrow)" />

  <rect x="110" y="400" width="100" height="44" rx="22" fill="#eef2ff" stroke="#4f46e5" stroke-width="2" />
  <text x="160" y="427" text-anchor="middle" font-size="14" fill="#312e81" font-family="sans-serif">Tugatish</text>
</svg>
```

- [ ] **Step 3: Create lesson 1 — Hello, World**

Create `src/courses/python/lessons/01-hello-world.jsx`:

```jsx
import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: 'Salom, Dunyo!',
  section: 'Boshlash uchun',
}

export default function HelloWorldLesson() {
  return (
    <>
      <p>
        Python — o'rganish uchun ancha oson, ammo ayni paytda juda kuchli dasturlash tili
        (programming language) hisoblanadi. U veb-dasturlash, ma'lumotlar tahlili (data
        analysis), sun'iy intellekt (AI) va avtomatlashtirish kabi ko'plab sohalarda
        qo'llaniladi.
      </p>
      <p>
        Har qanday dasturlash tilini o'rganishni an'anaviy ravishda ekranga matn chiqarishdan
        boshlaymiz. Buning uchun Python'da <code>print()</code> funksiyasidan foydalanamiz:
      </p>
      <CodeBlock lang="python">{`print("Salom, Dunyo!")`}</CodeBlock>
      <p>
        Bu kodni ishga tushirganingizda, ekranda <code>Salom, Dunyo!</code> matni chiqadi.{' '}
        <code>print()</code> funksiyasi qavs ichidagi qiymatni konsolga (console) chiqaradi.
      </p>
      <Callout type="tip" title="Maslahat">
        Bir nechta qiymatni vergul bilan ajratib, bitta <code>print()</code> chaqiruvida
        chiqarishingiz mumkin: <code>print("Salom,", "Dunyo!")</code>
      </Callout>
      <p>Keling, yana bir misolga qaraymiz:</p>
      <CodeBlock lang="python">{`print("Python o'rganish qiziqarli!")
print("Bu ikkinchi qator.")`}</CodeBlock>
      <KeyPoints>
        <li>
          <code>print()</code> funksiyasi ekranga matn yoki qiymat chiqarish uchun ishlatiladi.
        </li>
        <li>Matnlar (string) qo'shtirnoq yoki bitta tirnoq ichida yoziladi.</li>
        <li>
          Har bir <code>print()</code> chaqiruvi natijani yangi qatordan boshlaydi.
        </li>
      </KeyPoints>
    </>
  )
}
```

- [ ] **Step 4: Create lesson 2 — Variables & Types**

Create `src/courses/python/lessons/02-variables.jsx`:

```jsx
import CodeBlock from '@/components/content/CodeBlock'
import Callout from '@/components/content/Callout'
import Quiz from '@/components/content/Quiz'
import KeyPoints from '@/components/content/KeyPoints'

export const meta = {
  title: "O'zgaruvchilar va turlar",
  section: 'Boshlash uchun',
}

export default function VariablesLesson() {
  return (
    <>
      <p>
        O'zgaruvchi (variable) — bu qiymatni saqlab turadigan nom. Python'da o'zgaruvchi
        yaratish uchun uning turini (type) oldindan e'lon qilish shart emas — bu boshqa ko'plab
        tillardan farqli xususiyat.
      </p>
      <CodeBlock lang="python">{`ism = "Aziz"
yosh = 25
narx = 9.99
talaba = True`}</CodeBlock>
      <Callout type="tip" title="Dinamik tiplash (dynamic typing)">
        Python o'zgaruvchining turini qiymatga qarab avtomatik aniqlaydi. Yuqoridagi misolda{' '}
        <code>ism</code> — matn (str), <code>yosh</code> — butun son (int),{' '}
        <code>narx</code> — kasr son (float), <code>talaba</code> esa mantiqiy qiymat
        (boolean).
      </Callout>
      <p>
        O'zgaruvchining turini <code>type()</code> funksiyasi yordamida tekshirishingiz mumkin:
      </p>
      <CodeBlock lang="python">{`yosh = 25
print(type(yosh))  # <class 'int'>`}</CodeBlock>
      <Callout type="warning" title="Diqqat">
        Matn (str) va sonni to'g'ridan-to'g'ri qo'shib bo'lmaydi. Masalan,{' '}
        <code>{`"Yosh: " + 25`}</code> xatolikka olib keladi — avval sonni matnga aylantirish
        kerak: <code>{`"Yosh: " + str(25)`}</code>.
      </Callout>
      <p>
        Amaliyotda tez-tez f-string (formatlangan satr) qulayroq ishlatiladi, chunki u
        turlarni avtomatik moslashtiradi:
      </p>
      <CodeBlock lang="python">{`yosh = 25
print(f"Mening yoshim {yosh} da")`}</CodeBlock>
      <Quiz
        question="Quyidagi qiymatlardan qaysi biri Python'da avtomatik 'float' turiga ega bo'ladi?"
        options={['narx = 10', 'narx = "10"', 'narx = 10.5', 'narx = True']}
        correctIndex={2}
        explanation="Kasr son (masalan, 10.5) Python tomonidan avtomatik ravishda float turi sifatida aniqlanadi."
      />
      <KeyPoints>
        <li>O'zgaruvchi yaratishda tur (type) ko'rsatish shart emas.</li>
        <li>
          Asosiy turlar: <code>str</code>, <code>int</code>, <code>float</code>,{' '}
          <code>bool</code>.
        </li>
        <li>
          Turni <code>type()</code> bilan tekshirish, f-string bilan formatlash mumkin.
        </li>
      </KeyPoints>
    </>
  )
}
```

- [ ] **Step 5: Create lesson 3 — Loops**

Create `src/courses/python/lessons/03-loops.jsx`:

```jsx
import CodeBlock from '@/components/content/CodeBlock'
import Exercise from '@/components/content/Exercise'
import Solution from '@/components/content/Solution'
import Quiz from '@/components/content/Quiz'
import Figure from '@/components/content/Figure'
import loopFlow from '@/assets/loop-flow.svg'

export const meta = {
  title: 'Sikllar',
  section: 'Boshqaruv tuzilmalari',
}

export default function LoopsLesson() {
  return (
    <>
      <p>
        Sikl (loop) — bir xil kodni bir necha marta takrorlash uchun ishlatiladi. Python'da
        ikkita asosiy sikl turi mavjud: <code>for</code> va <code>while</code>.
      </p>
      <h2>
        <code>for</code> sikli
      </h2>
      <p>
        <code>for</code> sikli ro'yxat (list) yoki <code>range()</code> kabi ketma-ketlik
        (sequence) elementlari bo'ylab yurish uchun ishlatiladi:
      </p>
      <CodeBlock lang="python">{`for son in range(1, 6):
    print(son)`}</CodeBlock>
      <p>
        Bu kod 1 dan 5 gacha bo'lgan sonlarni chop etadi. <code>range(1, 6)</code> — 1 dan
        boshlab 6 gacha (6 kirmaydi) sonlar ketma-ketligini hosil qiladi.
      </p>
      <h2>
        <code>while</code> sikli
      </h2>
      <p>Shart (condition) rost bo'lguncha takrorlanadigan sikl:</p>
      <CodeBlock lang="python">{`son = 1
while son <= 5:
    print(son)
    son += 1`}</CodeBlock>
      <Figure
        src={loopFlow}
        alt="Sikl ishlash jarayonini ko'rsatuvchi sxema"
        caption="1-rasm: while siklining ishlash jarayoni"
      />
      <Exercise title="Mashq">
        <p>
          1 dan 10 gacha bo'lgan sonlar yig'indisini (sum) hisoblab, ekranga chiqaradigan kod
          yozing.
        </p>
        <Solution>
          <CodeBlock lang="python">{`yigindi = 0
for son in range(1, 11):
    yigindi += son

print(yigindi)  # 55`}</CodeBlock>
        </Solution>
      </Exercise>
      <Quiz
        question="range(1, 6) qancha ta son hosil qiladi?"
        options={['4', '5', '6', '7']}
        correctIndex={1}
        explanation="range(1, 6) — 1, 2, 3, 4, 5 sonlarini hosil qiladi, ya'ni 5 ta son. Oxirgi qiymat (6) natijaga kirmaydi."
      />
    </>
  )
}
```

- [ ] **Step 6: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/courses/python
git commit -m "Add Python Basics sample course with 3 lessons"
```

---

## Task 6: Layout components and UI state

**Files:**
- Create: `src/store/uiStore.js`
- Create: `src/components/layout/TopNav.jsx`
- Create: `src/components/layout/Sidebar.jsx`
- Create: `src/components/layout/LessonNav.jsx`
- Create: `src/components/layout/Breadcrumbs.jsx`
- Create: `src/components/layout/CourseCard.jsx`

**Interfaces:**
- Consumes: `getGroupedLessons`, `getAdjacentLessons` from `@/courses/registry` (Task 4); `cn` from `@/lib/cn` (Task 1); `react-router-dom`'s `Link`/`NavLink`
- Produces:
  - `useUIStore` (zustand hook) from `@/store/uiStore` with state `{ sidebarOpen, toggleSidebar(), closeSidebar() }`
  - `<TopNav />` — no props, renders site header, calls `toggleSidebar()`
  - `<Sidebar courseId />` — renders grouped lesson nav, reads/writes `useUIStore`
  - `<LessonNav courseId slug />` — prev/next lesson links
  - `<Breadcrumbs items={[{ label, to? }]} />`
  - `<CourseCard course lessonCount />`

  All consumed by Task 7's pages.

- [ ] **Step 1: Create the UI store**

Create `src/store/uiStore.js`:

```js
import { create } from 'zustand'

export const useUIStore = create((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  closeSidebar: () => set({ sidebarOpen: false }),
}))
```

- [ ] **Step 2: Create `TopNav`**

Create `src/components/layout/TopNav.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { Menu, BookOpen } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'

export default function TopNav() {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-ink">
          <BookOpen className="h-5 w-5 text-brand-600" />
          Darsliklar
        </Link>
        <button
          type="button"
          onClick={toggleSidebar}
          className="rounded-md p-2 text-ink-muted hover:bg-canvas-muted md:hidden"
          aria-label="Menyuni ochish"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Create `Sidebar`**

Create `src/components/layout/Sidebar.jsx`:

```jsx
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { getGroupedLessons } from '@/courses/registry'
import { useUIStore } from '@/store/uiStore'
import { cn } from '@/lib/cn'

export default function Sidebar({ courseId }) {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)
  const closeSidebar = useUIStore((state) => state.closeSidebar)
  const groups = getGroupedLessons(courseId)

  return (
    <>
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Menyuni yopish"
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-72 -translate-x-full overflow-y-auto border-r border-line bg-canvas p-5 transition-transform md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:translate-x-0',
          sidebarOpen && 'translate-x-0'
        )}
      >
        <div className="mb-4 flex items-center justify-between md:hidden">
          <span className="font-semibold text-ink">Dars mazmuni</span>
          <button type="button" onClick={closeSidebar} aria-label="Yopish">
            <X className="h-5 w-5 text-ink-muted" />
          </button>
        </div>
        <nav className="flex flex-col gap-6">
          {groups.map((group) => (
            <div key={group.section}>
              {group.section && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  {group.section}
                </p>
              )}
              <ul className="flex flex-col gap-1">
                {group.lessons.map((lesson) => (
                  <li key={lesson.slug}>
                    <NavLink
                      to={`/${courseId}/${lesson.slug}`}
                      end
                      onClick={closeSidebar}
                      className={({ isActive }) =>
                        cn(
                          'block rounded-md px-3 py-2 text-sm',
                          isActive
                            ? 'bg-brand-50 font-medium text-brand-700'
                            : 'text-ink-muted hover:bg-canvas-muted'
                        )
                      }
                    >
                      {lesson.meta.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
```

- [ ] **Step 4: Create `LessonNav`**

Create `src/components/layout/LessonNav.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getAdjacentLessons } from '@/courses/registry'

export default function LessonNav({ courseId, slug }) {
  const { prev, next } = getAdjacentLessons(courseId, slug)
  if (!prev && !next) return null

  return (
    <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
      {prev ? (
        <Link
          to={`/${courseId}/${prev.slug}`}
          className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {prev.meta.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={`/${courseId}/${next.slug}`}
          className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:underline"
        >
          {next.meta.title}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <span />
      )}
    </div>
  )
}
```

- [ ] **Step 5: Create `Breadcrumbs`**

Create `src/components/layout/Breadcrumbs.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumbs({ items }) {
  return (
    <nav className="mb-4 flex items-center gap-1.5 text-sm text-ink-muted">
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
          {item.to ? (
            <Link to={item.to} className="hover:text-brand-600">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
```

- [ ] **Step 6: Create `CourseCard`**

Create `src/components/layout/CourseCard.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { Code2, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'

const ICONS = { Code2 }

export default function CourseCard({ course, lessonCount }) {
  const Icon = ICONS[course.icon] ?? Code2

  return (
    <Link
      to={`/${course.id}`}
      className="group flex flex-col gap-4 rounded-xl border border-line bg-canvas p-6 transition-colors hover:border-brand-300"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <h3 className="text-lg font-semibold text-ink">{course.title}</h3>
        <p className="mt-1 text-sm text-ink-muted">{course.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between text-sm text-ink-muted">
        <span>{lessonCount} ta dars</span>
        <span
          className={cn(
            'flex items-center gap-1 font-medium text-brand-600 transition-transform',
            'group-hover:translate-x-0.5'
          )}
        >
          Boshlash <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
```

- [ ] **Step 7: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add src/store/uiStore.js src/components/layout
git commit -m "Add layout components and mobile sidebar UI state"
```

---

## Task 7: Pages, routing, and full integration smoke test

**Files:**
- Create: `src/pages/HomePage.jsx`
- Create: `src/pages/CourseOverviewPage.jsx`
- Create: `src/pages/LessonPage.jsx`
- Create: `src/pages/NotFoundPage.jsx`
- Modify: `src/App.jsx`
- Modify: `src/main.jsx`

**Interfaces:**
- Consumes: `getAllCourses`, `getCourse`, `getLessons`, `getLesson`, `getGroupedLessons`, `getAdjacentLessons` (Task 4); `TopNav`, `Sidebar`, `LessonNav`, `Breadcrumbs`, `CourseCard` (Task 6); real course/lesson data (Task 5)
- Produces: the fully wired app — this is the last task, nothing downstream depends on it

- [ ] **Step 1: Create `HomePage`**

Create `src/pages/HomePage.jsx`:

```jsx
import { getAllCourses, getLessons } from '@/courses/registry'
import CourseCard from '@/components/layout/CourseCard'

export default function HomePage() {
  const courses = getAllCourses()

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-ink">Kurslar</h1>
        <p className="mt-2 text-ink-muted">
          O'zingizga mos kursni tanlang va o'z sur'atingizda o'rganishni boshlang.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} lessonCount={getLessons(course.id).length} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `CourseOverviewPage`**

Create `src/pages/CourseOverviewPage.jsx`:

```jsx
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getCourse, getGroupedLessons } from '@/courses/registry'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export default function CourseOverviewPage() {
  const { courseId } = useParams()
  const course = getCourse(courseId)
  if (!course) return <Navigate to="/404" replace />

  const groups = getGroupedLessons(courseId)
  const firstLesson = groups[0]?.lessons[0]

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Breadcrumbs items={[{ label: 'Kurslar', to: '/' }, { label: course.title }]} />
      <h1 className="text-3xl font-bold text-ink">{course.title}</h1>
      <p className="mt-3 text-ink-muted">{course.description}</p>
      {firstLesson && (
        <Link
          to={`/${courseId}/${firstLesson.slug}`}
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Kursni boshlash
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
      <div className="mt-10 flex flex-col gap-8">
        {groups.map((group) => (
          <div key={group.section}>
            {group.section && (
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
                {group.section}
              </h2>
            )}
            <ul className="flex flex-col gap-2">
              {group.lessons.map((lesson, index) => (
                <li key={lesson.slug}>
                  <Link
                    to={`/${courseId}/${lesson.slug}`}
                    className="flex items-center gap-3 rounded-md border border-line px-4 py-3 text-sm hover:border-brand-300"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-canvas-muted text-xs font-medium text-ink-muted">
                      {index + 1}
                    </span>
                    <span className="text-ink">{lesson.meta.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `LessonPage`**

Create `src/pages/LessonPage.jsx`:

```jsx
import { Navigate, useParams } from 'react-router-dom'
import { getCourse, getLesson } from '@/courses/registry'
import Sidebar from '@/components/layout/Sidebar'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import LessonNav from '@/components/layout/LessonNav'

export default function LessonPage() {
  const { courseId, slug } = useParams()
  const course = getCourse(courseId)
  const lesson = getLesson(courseId, slug)
  if (!course || !lesson) return <Navigate to="/404" replace />

  const LessonContent = lesson.Component

  return (
    <div className="mx-auto flex max-w-6xl">
      <Sidebar courseId={courseId} />
      <main className="min-w-0 flex-1 px-6 py-10">
        <Breadcrumbs
          items={[
            { label: 'Kurslar', to: '/' },
            { label: course.title, to: `/${courseId}` },
            { label: lesson.meta.title },
          ]}
        />
        <article className="prose prose-slate max-w-none">
          <h1>{lesson.meta.title}</h1>
          <LessonContent />
        </article>
        <LessonNav courseId={courseId} slug={slug} />
      </main>
    </div>
  )
}
```

- [ ] **Step 4: Create `NotFoundPage`**

Create `src/pages/NotFoundPage.jsx`:

```jsx
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-2xl font-bold text-ink">Sahifa topilmadi</h1>
      <p className="mt-2 text-ink-muted">
        Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  )
}
```

- [ ] **Step 5: Wire the route table**

Replace the full contents of `src/App.jsx`:

```jsx
import { Routes, Route, Outlet } from 'react-router-dom'
import TopNav from '@/components/layout/TopNav'
import HomePage from '@/pages/HomePage'
import CourseOverviewPage from '@/pages/CourseOverviewPage'
import LessonPage from '@/pages/LessonPage'
import NotFoundPage from '@/pages/NotFoundPage'

function RootLayout() {
  return (
    <div className="min-h-screen bg-canvas-muted">
      <TopNav />
      <Outlet />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/:courseId" element={<CourseOverviewPage />} />
        <Route path="/:courseId/:slug" element={<LessonPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
```

- [ ] **Step 6: Wrap the app in a router**

Replace the full contents of `src/main.jsx`:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

- [ ] **Step 7: Build check**

Run: `npm run build`
Expected: build succeeds with no errors — this is the first point where `registry.js`'s `import.meta.glob` calls actually resolve against the real `src/courses/python` files, so a failure here likely means a mismatch between a lesson file's export shape and what `registry.js` expects.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 8: Manual browser smoke test**

Run: `npm run dev` and open the printed local URL (or use the `run` skill to launch and screenshot it). Verify, in order:

1. **`/`** — shows "Kurslar" heading and one course card for "Python" with "3 ta dars".
2. Click the Python card → **`/python`** — shows the course description, a "Kursni boshlash" button, and two grouped sections ("Boshlash uchun" with 2 lessons, "Boshqaruv tuzilmalari" with 1 lesson).
3. Click "Kursni boshlash" → **`/python/hello-world`** — shows the sidebar with all 3 lessons grouped into 2 sections, "Salom, Dunyo!" highlighted as active, lesson content renders (prose, one code block with a working copy button, a tip callout, key points box), and a "next" link at the bottom pointing to "O'zgaruvchilar va turlar" (no "prev" link, since this is lesson 1).
4. Click next → **`/python/variables`** — content renders including both callouts (tip + warning) and the quiz (click an option, confirm right/wrong feedback and the explanation appear); prev/next links both present.
5. Click next → **`/python/loops`** — content renders including the loop-flow diagram image, the exercise box with a collapsible "Yechimni ko'rsatish" solution (click it, confirm the solution code block appears), and the quiz; only a "prev" link present (last lesson).
6. Navigate to a nonexistent URL, e.g. **`/python/does-not-exist`** — redirects to the "Sahifa topilmadi" 404 page with a working "Bosh sahifaga qaytish" link back to `/`.
7. Shrink the browser to a mobile width — confirm the sidebar is hidden by default on `/python/hello-world` and the header's menu button opens/closes it.

Expected: all 7 checks pass. If any fail, fix the relevant component before moving on — this is the task that proves the whole architecture actually works together.

- [ ] **Step 9: Commit**

```bash
git add src/pages src/App.jsx src/main.jsx
git commit -m "Wire routing and pages, completing the tutorial platform MVP"
```
