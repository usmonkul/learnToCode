# Organic Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin every existing page to the approved "Organic" mockup — warm terracotta/olive palette, Caprasimo+Figtree typography, pill/rounded shapes — with zero route, data, or behavior changes.

**Architecture:** Token-first. Task 1 redefines the same CSS custom properties (`--color-brand-*`, `--color-canvas`, `--color-canvas-muted`, `--color-line`, `--color-ink`, `--color-ink-muted`) the whole app already reads through Tailwind utility classes, plus adds `--color-brand2-*` (second accent) and font tokens — this re-colors everything for free. Every later task then does the *shape* pass (pill buttons/tags/nav, `rounded-3xl` cards, `rounded-[40px]` sections) per-component, since Tailwind has no radius token to swap centrally.

**Tech Stack:** React 19, Tailwind CSS v4 (CSS-first `@theme`), react-router-dom, lucide-react. No new dependencies except a Google Fonts `@import`.

**Spec:** `docs/superpowers/specs/2026-08-24-organic-redesign-design.md`

## Global Constraints

- **No behavior changes.** Every route, every data fetch, every store, every interactive affordance keeps working exactly as today. This is a visual pass only.
- **Mockup reference files** (read-only, already extracted from the Claude Design project) live at `/private/tmp/claude-501/-Users-khakimusmon-Desktop-Study-Course-books/78a2bbe8-c625-4ee1-8a2a-bca066f53310/scratchpad/redesign/`: `styles.css` (Organic design-system tokens/classes) and `screen-01-Asosiy.html` through `screen-08-Qorongi-mavzu.html` (the 8 approved screens). Each task below names which screen file to open for exact spacing/copy/icon reference — the plan's code blocks are the required implementation, the screen files are there to resolve anything a task's code block doesn't spell out (exact padding, icon names, copy wording).
- **Shape convention** (apply everywhere, no exceptions without a note in the task): buttons / tags / badges / pills / nav links / segmented control / form inputs / avatar circles → `rounded-full`. Cards (course cards, list rows, stat tiles, content-primitive boxes) → `rounded-3xl`. Large page-level sections (hero image frame, banded sections, CTA banners) → `rounded-[40px]`.
- **Icons**: `lucide-react` only (already a dependency) — map every mockup `data-lucide="x"` name to its PascalCase `lucide-react` import (`book-open`→`BookOpen`, `arrow-right`→`ArrowRight`, `check-circle-2`→`CheckCircle2`, `flame`→`Flame`, `puzzle`→`Puzzle`, `git-branch`→`GitBranch`, `code-2`→`Code2`, `database`→`Database`, `zap`→`Zap`, `layout-template`→`LayoutTemplate`, `swords`→`Swords`, `quote`→`Quote`, `play`→`Play`, `rotate-ccw`→`RotateCcw`, `check`→`Check`, `check-circle-2`→`CheckCircle2`, `lightbulb`→`Lightbulb`, `copy`→`Copy`, `trophy`→`Trophy`, `mail`→`Mail`, `log-out`→`LogOut`, `arrow-left`→`ArrowLeft`, `github`→`Github`). Never load `unpkg.com/lucide` (that's the mockup's own standalone-preview mechanism, not for the real app).
- **Uzbek apostrophe rule still applies**: any JS string with `o'`/`g'` needs double quotes or backticks, never single quotes (same rule as the rest of this codebase — see `docs/superpowers/plans/2026-08-24-arena-sql-challenges.md`'s Global Constraints for why).
- **Explicitly out of scope, unchanged**: `CodeBlock.jsx` (its light/dark-theme-following `prism-react-renderer` mechanism is a documented, intentional AGENTS.md feature; the mockup's one incidental dark code sample is read as a generic "code blocks look dark" preview choice, not a mandate to make `CodeBlock` ignore the site theme — raise this with the user separately if a permanently-dark code block turns out to be wanted). `AuthCallbackPage.jsx` (no visible UI). Any store, any Supabase call, any route path, `RequireAuth`, `sqlEngine.js`, the courses/arena registries.
- **Verification per task**: `npm run build && npm run lint` (no test runner in this repo, by design). Final task is a full manual browser pass across light + dark + every route, since Tailwind/CSS correctness can't be confirmed by build/lint alone.
- **Reused new pattern**: a small `tag` helper (see Task 3) — `<span>` with variant classes — used by course cards, difficulty badges, etc. It is **not** a new file/primitive under `src/components/content/` (those are lesson-authoring primitives per AGENTS.md); it lives inline where first needed (`CourseCard.jsx`) and is duplicated (not extracted) at other call sites, since AGENTS.md's own precedent is "extract only at the third occurrence" and this plan's per-file tasks make a shared import awkward across unrelated directories. Note any 3rd+ occurrence you hit as a `DONE_WITH_CONCERNS` observation.

---

## Task 1: Design tokens and fonts

**Files:**
- Modify: `src/index.css` (full rewrite)

**Interfaces:**
- Consumes: nothing (first task).
- Produces: every later task depends on these token values resolving correctly. New Tailwind utilities available from here on: `bg-brand2-{50..950}`, `text-brand2-{50..950}`, `border-brand2-{50..950}`, `font-heading`, `font-body` (Tailwind v4 auto-generates `font-*` utilities from `--font-*` theme keys, same mechanism that generates `bg-*`/`text-*` from `--color-*` keys). Existing utilities (`bg-brand-*`, `bg-canvas`, `bg-canvas-muted`, `border-line`, `text-ink`, `text-ink-muted`) keep their names, get new values.

- [ ] **Step 1: Replace `src/index.css`**

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@import url('https://fonts.googleapis.com/css2?family=Caprasimo&family=Figtree:wght@400;600;700&display=swap');

@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

@theme {
  --color-brand-50: #fff8f4;
  --color-brand-100: #fff2eb;
  --color-brand-200: #ffe1d0;
  --color-brand-300: #ffc6a5;
  --color-brand-400: #f6a06b;
  --color-brand-500: #d67f48;
  --color-brand-600: #c67139;
  --color-brand-700: #8c491a;
  --color-brand-800: #643312;
  --color-brand-900: #402310;
  --color-brand-950: #2a1509;

  --color-brand2-50: #f7fdf0;
  --color-brand2-100: #f0fae1;
  --color-brand2-200: #e1eecc;
  --color-brand2-300: #ccdbb2;
  --color-brand2-400: #aebf92;
  --color-brand2-500: #8fa073;
  --color-brand2-600: #7a8a5e;
  --color-brand2-700: #56633f;
  --color-brand2-800: #3d472b;
  --color-brand2-900: #272e1b;
  --color-brand2-950: #1a1f11;

  --color-canvas: #ebddc5;
  --color-canvas-muted: #f5ead8;
  --color-line: color-mix(in srgb, #201e1d 16%, transparent);
  --color-ink: #201e1d;
  --color-ink-muted: #6b6358;

  --font-heading: "Caprasimo", system-ui, sans-serif;
  --font-body: "Figtree", system-ui, sans-serif;
}

/* Dark palette — overrides the same semantic tokens above; every component using
   bg-canvas/text-ink/etc. adapts automatically, no per-component dark: needed.
   --color-brand-*/--color-brand2-* are NOT overridden here — dark-mode emphasis for
   those already happens per-component via manual dark: variants that pick a lighter
   ramp step (e.g. text-brand-700 dark:text-brand-300), unchanged by this redesign. */
[data-theme='dark'] {
  --color-canvas: #474238;
  --color-canvas-muted: #2e2b25;
  --color-line: color-mix(in srgb, #f9f4ed 18%, transparent);
  --color-ink: #f9f4ed;
  --color-ink-muted: #a89f92;
}

body {
  background-color: var(--color-canvas-muted);
  color: var(--color-ink);
  font-family: var(--font-body);
}

h1, h2, h3 {
  font-family: var(--font-heading);
  font-weight: 400;
}
```

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint`
Expected: both clean. The app will look visually broken/half-migrated at this point (new colors, old shapes) — that's expected until later tasks land; this step only confirms the CSS itself is valid and nothing crashes.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "Add Organic redesign color/font tokens"
```

---

## Task 2: Top navigation shell — TopNav, UserMenu, ThemeToggle

**Files:**
- Modify: `src/components/layout/TopNav.jsx` (full rewrite)
- Modify: `src/components/layout/UserMenu.jsx` (full rewrite)
- Modify: `src/components/layout/ThemeToggle.jsx` (shape-only edit)

**Interfaces:**
- Consumes: `--color-brand-*`/`--color-brand2-*`/`font-heading` from Task 1. `NAV_ITEMS` from `@/components/layout/navItems` (unchanged). `useUIStore`, `useAuthStore`, `useProgressStore`, `useThemeStore` (unchanged stores). `Avatar` from `@/components/ui/Avatar` (unchanged this task — Avatar needs no edits, its colors are token-driven and it's already `rounded-full`).
- Produces: nothing new consumed by later tasks — layout chrome is a leaf.

Reference: every screen's `<header class="o-nav">` block is identical across screens A–F (only the right-hand side differs: marketing "Kirish/Bepul boshlash" buttons when signed out, streak-chip + avatar when signed in). See any of `screen-01` through `screen-06`.

- [ ] **Step 1: Replace `src/components/layout/TopNav.jsx`**

```jsx
import { useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { Menu, X, BookOpen } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { NAV_ITEMS } from '@/components/layout/navItems'
import ThemeToggle from '@/components/layout/ThemeToggle'
import UserMenu from '@/components/layout/UserMenu'
import { cn } from '@/lib/cn'

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const { courseId, slug } = useParams()
  const hasSidebar = Boolean(courseId && slug)

  const mobileMenuOpen = hasSidebar ? sidebarOpen : menuOpen

  function handleToggleMobileMenu() {
    if (hasSidebar) toggleSidebar()
    else setMenuOpen((value) => !value)
  }

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-canvas-muted/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-6">
        <Link to="/" className="mr-3 flex shrink-0 items-center gap-2.5 font-heading text-lg text-ink">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-canvas-muted">
            <BookOpen className="h-4 w-4" />
          </span>
          Darsliklar
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium',
                  isActive
                    ? 'bg-brand-200 text-brand-800 dark:bg-brand-950 dark:text-brand-300'
                    : 'text-ink-muted hover:bg-canvas hover:text-ink'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <UserMenu />
          <ThemeToggle />
          <button
            type="button"
            onClick={handleToggleMobileMenu}
            className="rounded-full p-2 text-ink-muted hover:bg-canvas md:hidden"
            aria-label={mobileMenuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {!hasSidebar && menuOpen && (
        <>
          <button
            type="button"
            aria-label="Fonni yopish"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/30 md:hidden"
          />
          <nav className="absolute inset-x-0 top-full z-40 border-b border-line bg-canvas-muted px-6 py-3 shadow-lg md:hidden">
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-full px-3.5 py-2 text-sm font-medium',
                      isActive
                        ? 'bg-brand-200 text-brand-800 dark:bg-brand-950 dark:text-brand-300'
                        : 'text-ink-muted hover:bg-canvas hover:text-ink'
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
```

Note: `bg-canvas-muted/95` (not `bg-canvas`) and a kept `border-b border-line` are a deliberate deviation from the mockup — the mockup is a static, non-scrolling preview where the header floats on the same flat background with no visible border. The real app has a sticky header over scrolling content, so a subtle border is needed for the header to stay visually separated from content scrolling beneath it (otherwise, since nav bg now exactly equals page bg, there'd be zero visual boundary). This is a functional necessity the static mockup can't show, not a fidelity gap.

- [ ] **Step 2: Replace `src/components/layout/UserMenu.jsx`**

```jsx
import { Link } from 'react-router-dom'
import { Flame, LogOut } from 'lucide-react'
import { useAuthStore, signOut, getDisplayName, getAvatarUrl } from '@/store/authStore'
import { useProgressStore } from '@/store/progressStore'
import Avatar from '@/components/ui/Avatar'

export default function UserMenu() {
  const status = useAuthStore((state) => state.status)
  const user = useAuthStore((state) => state.user)
  const streak = useProgressStore((state) => state.streak)

  if (status === 'loading') return null

  if (status === 'signedOut') {
    return (
      <div className="flex items-center gap-2">
        <Link
          to="/login"
          className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-muted hover:bg-canvas hover:text-ink"
        >
          Kirish
        </Link>
        <Link
          to="/login"
          className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-canvas-muted hover:bg-brand-700"
        >
          Bepul boshlash
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1">
      <span
        className="flex items-center gap-1 rounded-full px-2.5 py-1.5 text-sm font-medium text-ink-muted"
        title={`Eng uzun ketma-ketlik: ${streak.longest} kun`}
      >
        <Flame className="h-4 w-4 text-brand-600" />
        {streak.current}
      </span>
      <Link
        to="/profile"
        className="rounded-full ring-offset-2 ring-offset-canvas-muted transition-shadow hover:ring-2 hover:ring-brand-500/40"
        aria-label="Profil"
        title="Profil"
      >
        <Avatar src={getAvatarUrl(user)} name={getDisplayName(user)} size="sm" />
      </Link>
      <button
        type="button"
        onClick={() => signOut()}
        className="rounded-full p-2 text-ink-muted hover:bg-canvas hover:text-ink"
        aria-label="Chiqish"
        title="Chiqish"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  )
}
```

This adds a "Bepul boshlash" primary CTA next to "Kirish" for signed-out visitors, matching every mockup screen's nav — a small addition beyond the current single "Kirish" link, but it's pure markup (links to the same `/login` route, no new behavior).

- [ ] **Step 3: Edit `src/components/layout/ThemeToggle.jsx`**

Change the button's className from `"rounded-md p-2 text-ink-muted hover:bg-canvas-muted hover:text-ink"` to `"rounded-full p-2 text-ink-muted hover:bg-canvas hover:text-ink"` (shape + hover-surface only — no other changes).

- [ ] **Step 4: Verify**

Run: `npm run build && npm run lint`
Expected: both clean.

Run `npm run dev`, open the app, confirm the nav renders (pill nav items, circular brand mark, pill "Kirish"/"Bepul boshlash" when signed out or streak+avatar when signed in), and that mobile menu toggle still works.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/TopNav.jsx src/components/layout/UserMenu.jsx src/components/layout/ThemeToggle.jsx
git commit -m "Reskin top navigation to the Organic pill nav pattern"
```

---

## Task 3: Content primitives — Callout, Quiz, Exercise, Solution, KeyPoints, Figure, Disclosure

**Files:**
- Modify: `src/components/content/Callout.jsx`
- Modify: `src/components/content/Quiz.jsx`
- Modify: `src/components/content/Exercise.jsx`
- Modify: `src/components/content/KeyPoints.jsx`
- Modify: `src/components/content/Figure.jsx`
- Modify: `src/components/ui/Disclosure.jsx`
- No changes: `src/components/content/Solution.jsx` (only wraps `Disclosure`, nothing to edit), `src/components/ui/Avatar.jsx` (already `rounded-full`, colors already token-driven)

**Interfaces:**
- Consumes: Task 1's tokens (existing `bg-emerald-*`/`bg-amber-*`/`bg-red-*`/`bg-brand-*` hue families are kept as-is per the spec's non-goals — only shape changes).
- Produces: nothing new — these are leaf lesson-authoring primitives used across every course.

No mockup screen shows these (lesson-content screens weren't mocked at this granularity) — apply the shape convention directly: these are all "card"-family boxes, so `rounded-lg` → `rounded-3xl` everywhere; Quiz's option buttons are button-family, so their `rounded-md` → `rounded-full`.

- [ ] **Step 1: Edit `src/components/content/Callout.jsx`**

Change the container className from:
```
'not-prose my-6 flex gap-3 rounded-lg border p-4'
```
to:
```
'not-prose my-6 flex gap-3 rounded-3xl border p-5'
```
(padding bumped from `p-4` to `p-5` since the larger radius reads cramped at the old padding — no other changes; the four `VARIANTS` hue definitions are untouched.)

- [ ] **Step 2: Edit `src/components/content/Quiz.jsx`**

Three shape-only changes in `SingleQuiz`:
1. Container: `'not-prose my-6 rounded-lg border border-line bg-canvas p-5'` → `'not-prose my-6 rounded-3xl border border-line bg-canvas p-6'`
2. Option buttons: `'flex items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors'` → `'flex items-center justify-between rounded-full border px-4 py-2.5 text-left text-sm transition-colors'`

And in `MultiQuiz`'s results box: `'mt-8 p-6 bg-brand-50 border border-brand-200 rounded-lg text-center dark:bg-brand-950 dark:border-brand-800'` → `'mt-8 p-6 bg-brand-50 border border-brand-200 rounded-3xl text-center dark:bg-brand-950 dark:border-brand-800'`

No other changes — all color classes (`emerald`/`red`/`brand`) stay exactly as they are.

- [ ] **Step 3: Edit `src/components/content/Exercise.jsx`**

Change the container className from:
```
'not-prose my-6 rounded-lg border border-brand-200 bg-brand-50 p-5 dark:border-brand-800 dark:bg-brand-950'
```
to:
```
'not-prose my-6 rounded-3xl border border-brand-200 bg-brand-50 p-6 dark:border-brand-800 dark:bg-brand-950'
```

- [ ] **Step 4: Edit `src/components/content/KeyPoints.jsx`**

Change the container className from:
```
'not-prose my-6 rounded-lg border border-line bg-canvas-muted p-5'
```
to:
```
'not-prose my-6 rounded-3xl border border-line bg-canvas-muted p-6'
```

- [ ] **Step 5: Edit `src/components/content/Figure.jsx`**

Change the image className from `'w-full rounded-lg border border-line'` to `'w-full rounded-3xl border border-line'`.

- [ ] **Step 6: Edit `src/components/ui/Disclosure.jsx`**

Change the outer container className from `'rounded-md border border-line'` to `'rounded-3xl border border-line'`. Change the button's className from `'flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-sm font-medium text-ink'` to `'flex w-full items-center justify-between gap-2 px-5 py-3 text-left text-sm font-medium text-ink'` (padding bump to match the larger radius, same reasoning as Callout). The expanded content div's className stays `'border-t border-line px-4 py-3 text-sm'` unchanged (inner content padding doesn't need to scale with the outer radius).

- [ ] **Step 7: Verify**

Run: `npm run build && npm run lint`
Expected: both clean.

Run `npm run dev`, open any SQL course lesson with a `SqlPlayground`+`Callout`+`Quiz`+`Exercise`/`Solution`+`KeyPoints` (e.g. `/sql/13-agregat-funksiyalar`), confirm every primitive renders with rounded-3xl shapes and unchanged colors.

- [ ] **Step 8: Commit**

```bash
git add src/components/content/Callout.jsx src/components/content/Quiz.jsx src/components/content/Exercise.jsx src/components/content/KeyPoints.jsx src/components/content/Figure.jsx src/components/ui/Disclosure.jsx
git commit -m "Reskin content primitives to the Organic rounded-3xl card shape"
```

---

## Task 4: HomePage and new Footer

**Files:**
- Create: `src/lib/courseIcons.js`
- Create: `src/components/layout/Footer.jsx`
- Modify: `src/pages/HomePage.jsx` (full rewrite)
- Modify: `src/components/layout/CourseCard.jsx` (use the new shared icon map — see Step 1)

**Interfaces:**
- Consumes: `getAllCourses()`, `getLessons(courseId)` from `@/courses/registry`. `getChallenges(topicId)`, `getTopics()` from `@/arena/registry`. Task 1's tokens.
- Produces: `resolveCourseIcon(iconName)` from `@/lib/courseIcons` — consumed by `CourseCard.jsx` (this task) and `Task 5`'s `CoursesPage.jsx` rewrite (indirectly, via `CourseCard`). `Footer` component — consumed only by `HomePage.jsx` (homepage-only, per the spec's explicit decision).

Reference: `screen-01-Asosiy.html` (hero, "Qanday ishlaydi" 3-step band, course grid, testimonials, CTA banner, footer).

- [ ] **Step 1: Extract the shared course-icon map to `src/lib/courseIcons.js`**

`CourseCard.jsx` currently owns a local `ICONS` map; this task's `HomePage.jsx` needs the exact same icon set for its own course grid, which crosses AGENTS.md's "extract at the third occurrence" guidance once a second consumer exists alongside the first. Create:

```js
import { Code2, LayoutTemplate, Palette, Terminal, GitBranch, Atom, Database, Puzzle, Zap } from 'lucide-react'

const ICONS = {
  Code2,
  'layout-template': LayoutTemplate,
  palette: Palette,
  python: Terminal,
  'git-branch': GitBranch,
  git: GitBranch,
  github: GitBranch,
  react: Atom,
  database: Database,
  puzzle: Puzzle,
  zap: Zap,
}

export function resolveCourseIcon(iconName) {
  return ICONS[iconName] ?? Code2
}
```

- [ ] **Step 2: Edit `src/components/layout/CourseCard.jsx`**

Replace the full file:

```jsx
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { resolveCourseIcon } from '@/lib/courseIcons'
import { cn } from '@/lib/cn'

export default function CourseCard({ course, lessonCount }) {
  const Icon = resolveCourseIcon(course.icon)

  return (
    <Link
      to={`/${course.id}`}
      className="group flex flex-col gap-3 rounded-3xl bg-canvas p-6 transition-transform hover:-translate-y-1 hover:shadow-md"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-200 text-brand-800">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <h3 className="font-heading text-xl text-ink">{course.title}</h3>
        <p className="mt-1 text-sm text-ink-muted">{course.description}</p>
      </div>
      <div className="mt-auto flex items-center justify-between pt-2 text-sm">
        <span className="rounded-full bg-canvas-muted px-3 py-1 text-xs text-ink-muted">{lessonCount} ta dars</span>
        <span
          className={cn(
            'flex items-center gap-1 font-medium text-brand-700 transition-transform',
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

(Dropped the `border border-line hover:border-brand-300` treatment — the mockup's cards float on `--color-surface`/`bg-canvas` with no border, using a hover lift + shadow instead, matching `.o-card-link:hover { transform: translateY(-3px); box-shadow: var(--shadow-md) }` from `styles.css`.)

- [ ] **Step 3: Create `src/components/layout/Footer.jsx`**

```jsx
import { Link } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { getAllCourses } from '@/courses/registry'

export default function Footer() {
  const courses = getAllCourses()

  return (
    <footer className="bg-ink px-12 pb-9 pt-14 text-canvas-muted">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="flex items-center gap-2.5 font-heading text-lg text-canvas-muted">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-ink">
              <BookOpen className="h-4 w-4" />
            </span>
            Darsliklar
          </Link>
          <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-canvas-muted/60">
            O'zbek tilidagi bepul dasturlash darsliklari — mantiqiy fikrlashdan to'liq web ilovagacha.
          </p>
        </div>
        <div>
          <p className="mb-3.5 text-[11px] font-medium uppercase tracking-[.12em] text-canvas-muted/45">Kurslar</p>
          <div className="flex flex-col gap-2.5">
            {courses.map((course) => (
              <Link key={course.id} to={`/${course.id}`} className="text-sm text-canvas-muted/70 hover:text-brand-300">
                {course.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3.5 text-[11px] font-medium uppercase tracking-[.12em] text-canvas-muted/45">Platforma</p>
          <div className="flex flex-col gap-2.5">
            <Link to="/arena" className="text-sm text-canvas-muted/70 hover:text-brand-300">
              Arena masalalari
            </Link>
            <Link to="/profile" className="text-sm text-canvas-muted/70 hover:text-brand-300">
              Mening progressim
            </Link>
            <Link to="/login" className="text-sm text-canvas-muted/70 hover:text-brand-300">
              Kirish
            </Link>
          </div>
        </div>
        <div>
          <p className="mb-3.5 text-[11px] font-medium uppercase tracking-[.12em] text-canvas-muted/45">Loyiha</p>
          <div className="flex flex-col gap-2.5">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-canvas-muted/70 hover:text-brand-300">
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-11 flex max-w-6xl items-center justify-between gap-5 border-t border-canvas-muted/10 pt-5">
        <p className="text-sm text-canvas-muted/45">© 2026 Darsliklar. Ochiq kodli loyiha.</p>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-canvas-muted/70 hover:text-brand-300">
          GitHub
        </a>
      </div>
    </footer>
  )
}
```

Two deliberate simplifications from the mockup, noted so the reviewer doesn't flag them as missed requirements: (1) "Yangi dars taklif qilish" and "Telegram" links in the mockup have no real destination in this app (no issue-submission flow, no Telegram channel configured) — dropped rather than linking to `#`, since a dead link is worse than an absent one; (2) the "Platforma" and "Kurslar" columns pull real data (`getAllCourses()`) instead of the mockup's hardcoded 7-course list, so the footer never drifts out of sync as courses are added — consistent with AGENTS.md's "adding a course is one folder" principle.

- [ ] **Step 4: Replace `src/pages/HomePage.jsx`**

```jsx
import { Link } from 'react-router-dom'
import { ArrowRight, Flame, Quote } from 'lucide-react'
import { getAllCourses, getLessons } from '@/courses/registry'
import { getChallenges, getTopics } from '@/arena/registry'
import CourseCard from '@/components/layout/CourseCard'
import Footer from '@/components/layout/Footer'

const TESTIMONIALS = [
  {
    quote:
      "Mantiq kursidan boshladim — birinchi marta «algoritm» degan so'z qo'rqitmadi. Ikki oyda Python'da yakuniy loyihani yozdim.",
    initials: 'MK',
    name: 'Madina Karimova',
    role: 'Talaba, Namangan',
    tone: 'brand',
  },
  {
    quote:
      "SQL darslaridagi maydoncha hammasini o'zgartirdi: o'qib, darhol so'rov yozib ko'rasiz. Arenadagi 12 masalani ish uchun mashq qildim.",
    initials: 'JT',
    name: "Jasur To'rayev",
    role: 'Sotuvdan analitikaga oʼtdi',
    tone: 'brand2',
  },
  {
    quote: "Git kursi 29 ta qisqa darsdan iborat — kuniga bittasi. Streak ko'rinib turgani uchun tashlab ketmadim.",
    initials: 'SA',
    name: 'Sarvar Aliyev',
    role: "Frontend'ni o'rganmoqda",
    tone: 'brand',
  },
]

export default function HomePage() {
  const courses = getAllCourses()
  const lessonCount = courses.reduce((total, course) => total + getLessons(course.id).length, 0)
  const arenaChallengeCount = getTopics().reduce((total, topic) => total + getChallenges(topic.id).length, 0)

  return (
    <div>
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-14 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div>
            <span className="rounded-full bg-brand2-100 px-3.5 py-1.5 text-xs font-medium text-brand2-800">
              Bepul · O'zbek tilida
            </span>
            <h1 className="mt-5 max-w-[15ch] text-5xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
              Kod yozishni noldan o'rganing
            </h1>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink-muted">
              Mantiqiy fikrlashdan boshlab Git, Python, SQL va React'gacha — har bir dars tushuntirish, misol va
              amaliy mashq bilan. Kompyuter oldida ham, daftar bilan ham.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/kurslar"
                className="flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-canvas-muted hover:bg-brand-700"
              >
                Kurslarni ko'rish <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/arena"
                className="flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink hover:bg-canvas"
              >
                Arenani sinash
              </Link>
            </div>
            <div className="mt-9 flex items-center gap-6">
              <div>
                <p className="font-heading text-2xl text-ink">{courses.length}</p>
                <p className="mt-0.5 text-sm text-ink-muted">kurs</p>
              </div>
              <span className="h-8 w-px bg-line" />
              <div>
                <p className="font-heading text-2xl text-ink">{lessonCount}</p>
                <p className="mt-0.5 text-sm text-ink-muted">dars</p>
              </div>
              <span className="h-8 w-px bg-line" />
              <div>
                <p className="font-heading text-2xl text-ink">{arenaChallengeCount}</p>
                <p className="mt-0.5 text-sm text-ink-muted">Arena masalasi</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="flex aspect-[4/3] items-center justify-center rounded-[40px] bg-gradient-to-br from-brand2-200 to-brand-200" />
            <div className="absolute -bottom-6 -left-6 w-56 rounded-3xl bg-canvas p-5 shadow-lg">
              <div className="flex items-center gap-2">
                <Flame className="h-4.5 w-4.5 text-brand-600" />
                <span className="font-heading text-base text-ink">5 kunlik ketma-ketlik</span>
              </div>
              <div className="mt-2.5 flex gap-1.5">
                {[1, 1, 1, 1, 1, 0, 0].map((filled, index) => (
                  <span
                    key={index}
                    className={`h-2 flex-1 rounded-full ${filled ? 'bg-brand-600' : 'bg-canvas-muted'}`}
                  />
                ))}
              </div>
              <p className="mt-2.5 text-xs text-ink-muted">Bugun 1 dars qoldi</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-[40px] bg-brand2-100 p-10 lg:p-12">
          <p className="text-xs font-medium uppercase tracking-[.12em] text-brand2-700">Qanday ishlaydi</p>
          <h2 className="mt-2.5 max-w-[24ch] text-3xl text-ink">Uch qadamda birinchi darsingizgacha</h2>
          <div className="mt-9 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: 1,
                title: 'Kursni tanlang',
                body: "Yetti kurs — mantiqiy fikrlashdan Supabase'gacha. Tajribangiz bo'lmasa, «Mantiqiy va Algoritmik Fikrlash»dan boshlang.",
              },
              {
                step: 2,
                title: "O'qing va yozib ko'ring",
                body: "Har bir darsda tushuntirish, kod misoli, mashq va test bor. SQL darslarida so'rovni to'g'ridan-to'g'ri sahifada bajarasiz.",
              },
              {
                step: 3,
                title: 'Ketma-ketlikni uzmang',
                body: 'Tugallangan darslar va kunlik streak profilingizda saqlanadi — istalgan qurilmadan davom etasiz.',
              },
            ].map(({ step, title, body }) => (
              <div key={step}>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand2-300 font-heading text-2xl text-brand2-900">
                  {step}
                </span>
                <h3 className="mt-4.5 text-xl text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[.12em] text-brand-700">Kurslar</p>
            <h2 className="mt-2.5 text-3xl text-ink">Nimalarni o'rganasiz</h2>
          </div>
          <Link
            to="/kurslar"
            className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:bg-canvas"
          >
            Barchasi <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} lessonCount={getLessons(course.id).length} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <p className="text-xs font-medium uppercase tracking-[.12em] text-brand-700">O'quvchilar fikri</p>
        <h2 className="mt-2.5 max-w-[26ch] text-3xl text-ink">Noldan boshlaganlar nima deydi</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <div key={item.name} className="rounded-3xl bg-canvas-muted p-6">
              <Quote className="h-5 w-5 text-brand-600" />
              <p className="mt-3.5 text-base leading-relaxed text-ink">{item.quote}</p>
              <div className="mt-5 flex items-center gap-3">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full font-heading text-sm ${
                    item.tone === 'brand2' ? 'bg-brand2-200 text-brand2-800' : 'bg-brand-200 text-brand-800'
                  }`}
                >
                  {item.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{item.name}</p>
                  <p className="text-xs text-ink-muted">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex flex-col items-start gap-6 rounded-[40px] bg-brand-200 p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div>
            <h2 className="max-w-[22ch] text-3xl text-ink">Bugun birinchi darsni tugatib qo'ying</h2>
            <p className="mt-3 max-w-[44ch] text-base text-brand-900">
              Ro'yxatdan o'tish bepul. Progress va kunlik ketma-ketlik hisobingizda saqlanadi.
            </p>
          </div>
          <div className="flex flex-none gap-3">
            <Link
              to="/login"
              className="rounded-full bg-brand-600 px-6 py-3.5 text-sm font-semibold text-canvas-muted hover:bg-brand-700"
            >
              Bepul boshlash
            </Link>
            <Link
              to="/kurslar"
              className="rounded-full border border-brand-400 px-6 py-3.5 text-sm font-semibold text-brand-800 hover:bg-brand-100"
            >
              Kurslar ro'yxati
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
```

Note the hero's `<image-slot>` placeholder photo is replaced with a plain gradient panel (`bg-gradient-to-br from-brand2-200 to-brand-200`) rather than a real photo — this app has no student-photo asset and no image-hosting convention (per AGENTS.md), so fabricating an `<img src>` would be worse than an intentional, on-brand placeholder. The floating streak card stays a static marketing illustration (fixed "5 kunlik ketma-ketlik" / "1 dars qoldi", not wired to `useProgressStore`) since `HomePage` is public/signed-out-visible and showing a real user's streak there wouldn't make sense — same treatment `LoginPage` already gives its own illustrative streak panel today.

- [ ] **Step 5: Verify**

Run: `npm run build && npm run lint`
Expected: both clean.

Run `npm run dev`, open `/`, confirm: hero renders with real course/lesson/challenge counts, "Qanday ishlaydi" band, the full course grid (one card per real course, not hardcoded), testimonials, CTA banner, and the new footer with real course links. Confirm `/kurslar` still renders (uses the same `CourseCard`, now via `resolveCourseIcon`).

- [ ] **Step 6: Commit**

```bash
git add src/lib/courseIcons.js src/components/layout/Footer.jsx src/components/layout/CourseCard.jsx src/pages/HomePage.jsx
git commit -m "Reskin HomePage to the Organic mockup and add the homepage footer"
```

---

## Task 5: CoursesPage

**Files:**
- Modify: `src/pages/CoursesPage.jsx` (full rewrite)

**Interfaces:**
- Consumes: `getAllCourses()`, `getLessons()` from `@/courses/registry` (unchanged). `CourseCard` from Task 4 (already updated).
- Produces: nothing new.

Reference: `screen-02-Kurslar.html`.

- [ ] **Step 1: Replace `src/pages/CoursesPage.jsx`**

```jsx
import { getAllCourses, getLessons } from '@/courses/registry'
import CourseCard from '@/components/layout/CourseCard'

const FILTERS = ['Hammasi', "Boshlang'ich", "Ma'lumot", 'Interfeys']

export default function CoursesPage() {
  const courses = getAllCourses()

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-5xl text-ink">Kurslar</h1>
          <p className="mt-3 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
            O'zingizga mos kursni tanlang va o'z sur'atingizda o'rganishni boshlang. Har bir kurs bo'limlarga
            bo'lingan.
          </p>
        </div>
        <div className="flex flex-none overflow-hidden rounded-full border border-line" role="presentation">
          {FILTERS.map((label, index) => (
            <span
              key={label}
              className={`px-3.5 py-2 text-sm ${index === 0 ? 'bg-brand-600 text-canvas-muted' : 'text-ink-muted'} ${
                index > 0 ? 'border-l border-line' : ''
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} lessonCount={getLessons(course.id).length} />
        ))}
      </div>
    </div>
  )
}
```

The segmented filter control is rendered inert (`role="presentation"`, plain `<span>`s, "Hammasi" always visually selected) — the mockup shows it but no filtering logic exists anywhere in this codebase today, and adding real category-filtering is a new feature outside this redesign's scope (see spec's Non-goals). If real filtering is wanted later, that's a separate, explicitly-requested task — flag this to the user rather than building it silently.

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint`
Expected: both clean.

Run `npm run dev`, open `/kurslar`, confirm the course grid and inert filter pill render correctly.

- [ ] **Step 3: Commit**

```bash
git add src/pages/CoursesPage.jsx
git commit -m "Reskin CoursesPage to the Organic mockup"
```

---

## Task 6: CourseOverviewPage

**Files:**
- Modify: `src/pages/CourseOverviewPage.jsx` (full rewrite)

**Interfaces:**
- Consumes: `getCourse`, `getGroupedLessons` from `@/courses/registry` (unchanged). `useProgressStore` (unchanged). `Breadcrumbs` from `@/components/layout/Breadcrumbs` (unchanged this task — see Task 7 for its shape update, shared with `LessonPage`).
- Produces: nothing new.

Reference: `screen-03-Kurs-sahifasi.html`.

- [ ] **Step 1: Replace `src/pages/CourseOverviewPage.jsx`**

```jsx
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { getCourse, getGroupedLessons } from '@/courses/registry'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { useProgressStore } from '@/store/progressStore'
import { cn } from '@/lib/cn'

export default function CourseOverviewPage() {
  const { courseId } = useParams()
  const course = getCourse(courseId)
  const isComplete = useProgressStore((state) => state.isComplete)
  if (!course) return <Navigate to="/not-found" replace />

  const groups = getGroupedLessons(courseId)
  const allLessons = groups.flatMap((group) => group.lessons)
  const doneCount = allLessons.filter((lesson) => isComplete(courseId, lesson.slug)).length
  const percent = allLessons.length ? Math.round((doneCount / allLessons.length) * 100) : 0
  const firstLesson = groups[0]?.lessons[0]

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumbs items={[{ label: 'Kurslar', to: '/kurslar' }, { label: course.title }]} />
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <h1 className="text-5xl text-ink">{course.title}</h1>
          <p className="mt-3.5 max-w-[52ch] text-lg leading-relaxed text-ink-muted">{course.description}</p>
          {firstLesson && (
            <div className="mt-6 flex items-center gap-3.5">
              <Link
                to={`/${courseId}/${firstLesson.slug}`}
                className="flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-canvas-muted hover:bg-brand-700"
              >
                {doneCount > 0 ? 'Davom etish' : 'Kursni boshlash'}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="text-sm text-ink-muted">
                {doneCount}/{allLessons.length} tugallangan
              </span>
            </div>
          )}
          {allLessons.length > 0 && (
            <div className="mt-4.5 h-2.5 max-w-[420px] overflow-hidden rounded-full bg-canvas-muted">
              <div className="h-full rounded-full bg-brand-600" style={{ width: `${percent}%` }} />
            </div>
          )}
        </div>
        <div className="rounded-3xl bg-canvas p-6">
          <p className="font-heading text-lg text-ink">Kurs tarkibi</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-ink-muted">
            {groups.map((group) => (
              <div key={group.lessons[0].slug} className="flex justify-between gap-3">
                <span>{group.section || course.title}</span>
                <span className="shrink-0">{group.lessons.length} dars</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-8">
        {groups.map((group) => (
          <div key={group.lessons[0].slug}>
            {group.section && <p className="mb-3.5 text-xs font-medium uppercase tracking-[.12em] text-brand-700">{group.section}</p>}
            <div className="flex flex-col gap-1.5">
              {group.lessons.map((lesson, index) => {
                const complete = isComplete(courseId, lesson.slug)
                return (
                  <Link
                    key={lesson.slug}
                    to={`/${courseId}/${lesson.slug}`}
                    className="flex items-center gap-4 rounded-full bg-canvas px-5 py-3 hover:bg-canvas/70"
                  >
                    <span
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium',
                        complete ? 'bg-brand2-300 text-brand2-900' : 'bg-canvas-muted text-ink-muted'
                      )}
                    >
                      {complete ? <Check className="h-4 w-4" /> : index + 1}
                    </span>
                    <span className="text-base text-ink">{lesson.meta.title}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint`
Expected: both clean.

Run `npm run dev`, open any course overview (e.g. `/python`), confirm progress bar, "kurs tarkibi" panel, and pill lesson rows render, and completed-lesson checkmarks still reflect real progress state.

- [ ] **Step 3: Commit**

```bash
git add src/pages/CourseOverviewPage.jsx
git commit -m "Reskin CourseOverviewPage to the Organic mockup"
```

---

## Task 7: LessonPage, Sidebar, LessonNav, Breadcrumbs

**Files:**
- Modify: `src/pages/LessonPage.jsx`
- Modify: `src/components/layout/Sidebar.jsx`
- Modify: `src/components/layout/LessonNav.jsx`
- Modify: `src/components/layout/Breadcrumbs.jsx`

**Interfaces:**
- Consumes: `getCourse`, `getLesson`, `getGroupedLessons`, `getAdjacentLessons` from `@/courses/registry` (unchanged). `useAuthStore`, `useProgressStore` (unchanged).
- Produces: nothing new. `Breadcrumbs` is shared with `CourseOverviewPage` (Task 6, already using it unmodified) and `ArenaTopicPage` (Task 9) — this task's shape edit applies everywhere those pages render it.

Reference: `screen-04-Dars.html`.

- [ ] **Step 1: Edit `src/components/layout/Breadcrumbs.jsx`**

Change the `<Link>` className from `'hover:text-brand-600'` to `'hover:text-brand-700'` (color step only, matches the new ramp's readable-on-cream range better than 600 for this small text) — no other changes.

- [ ] **Step 2: Replace `src/components/layout/Sidebar.jsx`**

```jsx
import { NavLink } from 'react-router-dom'
import { X, Check } from 'lucide-react'
import { getGroupedLessons } from '@/courses/registry'
import { useUIStore } from '@/store/uiStore'
import { useProgressStore } from '@/store/progressStore'
import { NAV_ITEMS } from '@/components/layout/navItems'
import { cn } from '@/lib/cn'

export default function Sidebar({ courseId }) {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)
  const closeSidebar = useUIStore((state) => state.closeSidebar)
  const isComplete = useProgressStore((state) => state.isComplete)
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
          'fixed inset-y-0 left-0 z-40 w-72 -translate-x-full overflow-y-auto bg-canvas p-5 transition-transform md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0 md:rounded-3xl',
          sidebarOpen && 'translate-x-0'
        )}
      >
        <div className="mb-4 flex items-center justify-between md:hidden">
          <span className="font-heading text-base text-ink">Menyu</span>
          <button type="button" onClick={closeSidebar} aria-label="Yopish">
            <X className="h-5 w-5 text-ink-muted" />
          </button>
        </div>

        <nav className="mb-5 flex flex-col gap-1 border-b border-line pb-5 md:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={closeSidebar}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3.5 py-2 text-sm font-medium',
                  isActive
                    ? 'bg-brand-200 text-brand-800 dark:bg-brand-950 dark:text-brand-300'
                    : 'text-ink-muted hover:bg-canvas-muted hover:text-ink'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <p className="mb-2 text-xs font-medium uppercase tracking-[.1em] text-ink-muted md:hidden">Dars mazmuni</p>
        <nav className="flex flex-col gap-5">
          {groups.map((group) => (
            <div key={group.lessons[0].slug}>
              {group.section && (
                <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[.1em] text-ink-muted">
                  {group.section}
                </p>
              )}
              <div className="flex flex-col gap-1">
                {group.lessons.map((lesson) => (
                  <NavLink
                    key={lesson.slug}
                    to={`/${courseId}/${lesson.slug}`}
                    end
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between gap-2 rounded-full px-3.5 py-2 text-sm',
                        isActive
                          ? 'bg-brand-200 font-medium text-brand-900'
                          : 'text-ink-muted hover:bg-canvas-muted'
                      )
                    }
                  >
                    <span>{lesson.meta.title}</span>
                    {isComplete(courseId, lesson.slug) && (
                      <Check className="h-3.5 w-3.5 shrink-0 text-brand2-700" />
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
```

Note `md:top-16`/`md:h-[calc(100vh-4rem)]` (was `top-14`/`3.5rem`) — `TopNav` grew from `h-14` (3.5rem/56px) to `h-16` (4rem/64px) in Task 2, so the sidebar's sticky offset must match the new header height or it'll sit 8px too high under the header on desktop.

- [ ] **Step 3: Edit `src/components/layout/LessonNav.jsx`**

Change both `<Link>` classNames from `'flex items-center gap-2 text-sm font-medium text-brand-600 hover:underline'` to `'flex items-center gap-2 text-sm font-medium text-brand-700 hover:underline'` (color step only — no other changes). Change the container's className from `'mt-10 flex items-center justify-between border-t border-line pt-6'` to `'mt-10 flex items-center justify-between border-t border-line pt-7'` (padding bump, no other change).

- [ ] **Step 4: Edit `src/pages/LessonPage.jsx`**

Change the "toggle complete" button's className:
```
'mt-6 flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium',
isComplete
  ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
  : 'border-line text-ink hover:border-brand-300'
```
to:
```
'mt-6 flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium',
isComplete
  ? 'border-brand2-300 bg-brand2-100 text-brand2-800 dark:border-brand2-700 dark:bg-brand2-950 dark:text-brand2-300'
  : 'border-line text-ink hover:border-brand-300'
```
(the "complete" state moves from the emerald hue family to `brand2`, since `brand2` — Organic's olive/sage — is this redesign's "positive/success" hue, matching how it's used for checkmarks and the "Oson" difficulty tag elsewhere; every other status color in the app, per the spec's non-goals, keeps its existing hue family — this one specific spot is a deliberate exception because "lesson complete" is exactly the kind of positive-affirmation moment `brand2` is used for throughout the mockup, e.g. the course-page checkmark circles use `--color-accent-2-300`/`900`, matching this element 1:1.) No other changes to this file.

- [ ] **Step 5: Verify**

Run: `npm run build && npm run lint`
Expected: both clean.

Run `npm run dev`, open any lesson (e.g. `/python/01-nima-uchun-python`), confirm the sidebar (desktop + mobile drawer), breadcrumbs, mark-complete button, and prev/next nav all render correctly and the sidebar's sticky offset lines up under the (now taller) header with no gap or overlap.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/Breadcrumbs.jsx src/components/layout/Sidebar.jsx src/components/layout/LessonNav.jsx src/pages/LessonPage.jsx
git commit -m "Reskin LessonPage, Sidebar, LessonNav, and Breadcrumbs to the Organic mockup"
```

---

## Task 8: ArenaPage

**Files:**
- Modify: `src/pages/ArenaPage.jsx` (full rewrite)

**Interfaces:**
- Consumes: `getTopics`, `getChallenges` from `@/arena/registry` (unchanged).
- Produces: nothing new.

No dedicated mockup screen exists for the Arena topic grid (only the workspace, screen D) — apply the same card treatment `CourseCard` uses (Task 4), since a topic card and a course card are the same visual object in this design language.

- [ ] **Step 1: Replace `src/pages/ArenaPage.jsx`**

```jsx
import { Link } from 'react-router-dom'
import { Database, Swords } from 'lucide-react'
import { getTopics, getChallenges } from '@/arena/registry'

const ICONS = {
  database: Database,
}

export default function ArenaPage() {
  const topics = getTopics()

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand2-200 text-brand2-800">
          <Swords className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-4xl text-ink">Arena</h1>
          <p className="mt-1.5 text-ink-muted">Mavzuni tanlang va masalalarni yechib, bilimingizni mashq qiling.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const Icon = ICONS[topic.icon] ?? Database
          return (
            <Link
              key={topic.id}
              to={`/arena/${topic.id}`}
              className="group flex flex-col gap-3 rounded-3xl bg-canvas p-6 transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand2-200 text-brand2-800">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-heading text-xl text-ink">{topic.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{topic.description}</p>
              </div>
              <div className="mt-auto pt-2 text-sm">
                <span className="rounded-full bg-canvas-muted px-3 py-1 text-xs text-ink-muted">
                  {getChallenges(topic.id).length} ta masala
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
```

(`brand2`, not `brand`, for the icon chips here — Arena's own mockup screen D uses `--color-accent-2` for its sword icon and difficulty-tag family, distinguishing it from the `brand`-toned course cards on Home/Courses.)

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint`
Expected: both clean.

Run `npm run dev`, open `/arena`, confirm the topic card renders.

- [ ] **Step 3: Commit**

```bash
git add src/pages/ArenaPage.jsx
git commit -m "Reskin ArenaPage to the Organic mockup"
```

---

## Task 9: ArenaTopicPage, ChallengeList, ChallengeDetail, SqlPlayground

**Files:**
- Modify: `src/pages/ArenaTopicPage.jsx`
- Modify: `src/components/arena/ChallengeList.jsx`
- Modify: `src/components/arena/ChallengeDetail.jsx`
- Modify: `src/components/content/SqlPlayground.jsx` (larger change — new dark editor chrome)

**Interfaces:**
- Consumes: everything from the existing Arena feature (`@/arena/registry`, `@/lib/sqlEngine`, `@/lib/cn`) — unchanged.
- Produces: nothing new. `SqlPlayground`'s prop contract (`schema`, `initialQuery`) is unchanged — only its internal markup/classes change, so no caller (`ArenaTopicPage`, every SQL-course lesson) needs edits beyond what this task makes directly.

Reference: `screen-05-Arena.html`. This is the biggest single visual departure from today's app: the mockup gives the SQL editor a permanent dark, code-editor-style chrome (independent of the site's light/dark theme toggle — same convention real code editors use), while the result table underneath stays on the normal light/dark-aware `bg-canvas`.

- [ ] **Step 1: Replace `src/pages/ArenaTopicPage.jsx`**

```jsx
import { Navigate, useParams } from 'react-router-dom'
import { getTopic, getChallenges, getChallenge } from '@/arena/registry'
import { SQL_SCHEMA } from '@/arena/sql/schema'
import ChallengeList from '@/components/arena/ChallengeList'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import SqlPlayground from '@/components/content/SqlPlayground'

export default function ArenaTopicPage() {
  const { topicId, challengeSlug } = useParams()
  const topic = getTopic(topicId)
  const challenges = getChallenges(topicId)

  if (!topic) return <Navigate to="/not-found" replace />

  if (!challengeSlug) {
    const first = challenges[0]
    if (!first) return <Navigate to="/not-found" replace />
    return <Navigate to={`/arena/${topicId}/${first.slug}`} replace />
  }

  const challenge = getChallenge(topicId, challengeSlug)
  if (!challenge) return <Navigate to="/not-found" replace />

  const schema = topicId === 'sql' ? SQL_SCHEMA : null
  const counts = challenges.reduce(
    (acc, c) => ({ ...acc, [c.difficulty]: (acc[c.difficulty] ?? 0) + 1 }),
    {}
  )

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumbs items={[{ label: 'Arena', to: '/arena' }, { label: topic.title }]} />
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="text-4xl text-ink">{topic.title} masalalari</h1>
        <div className="ml-auto flex gap-2">
          {counts.easy > 0 && (
            <span className="rounded-full bg-brand2-100 px-3 py-1 text-xs font-medium text-brand2-800">
              {counts.easy} oson
            </span>
          )}
          {counts.medium > 0 && (
            <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-800">
              {counts.medium} o'rta
            </span>
          )}
          {counts.hard > 0 && (
            <span className="rounded-full border border-brand-600 px-3 py-1 text-xs font-medium text-brand-700">
              {counts.hard} qiyin
            </span>
          )}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <ChallengeList
          challenges={challenges}
          activeSlug={challenge.slug}
          topicId={topicId}
          schema={schema}
        />
        {topic.hasSandbox && (
          <div className="min-w-0 [&>div]:my-0!">
            <SqlPlayground key={challenge.slug} schema={schema} initialQuery={challenge.starterQuery} />
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Replace `src/components/arena/ChallengeList.jsx`**

```jsx
import { Link } from 'react-router-dom'
import ChallengeDetail from '@/components/arena/ChallengeDetail'
import { cn } from '@/lib/cn'

const DIFFICULTY_LABELS = { easy: 'Oson', medium: "O'rta", hard: 'Qiyin' }
const DIFFICULTY_STYLES = {
  easy: 'bg-brand2-100 text-brand2-800',
  medium: 'bg-brand-100 text-brand-800',
  hard: 'border border-brand-600 text-brand-700',
}

export default function ChallengeList({ challenges, activeSlug, topicId, schema }) {
  return (
    <div className="flex min-w-0 flex-col gap-1 rounded-3xl bg-canvas p-3.5">
      {challenges.map((challenge, index) => {
        const isActive = challenge.slug === activeSlug
        return (
          <div key={challenge.slug} className={cn(isActive && 'rounded-[26px] bg-canvas-muted p-1')}>
            <Link
              to={`/arena/${topicId}/${challenge.slug}`}
              className={cn(
                'flex items-center justify-between gap-3 rounded-full px-4 py-3 text-sm',
                isActive ? 'bg-canvas-muted font-medium text-ink' : 'text-ink-muted hover:bg-canvas-muted'
              )}
            >
              <span>
                {index + 1}. {challenge.title}
              </span>
              <span className={cn('shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium', DIFFICULTY_STYLES[challenge.difficulty])}>
                {DIFFICULTY_LABELS[challenge.difficulty]}
              </span>
            </Link>
            {isActive && <ChallengeDetail challenge={challenge} schema={schema} />}
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 3: Replace `src/components/arena/ChallengeDetail.jsx`**

```jsx
import { useEffect, useState } from 'react'
import { getSqlEngine } from '@/lib/sqlEngine'
import { cn } from '@/lib/cn'

export default function ChallengeDetail({ challenge, schema }) {
  const [expected, setExpected] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setExpected(null)
    setError(null)

    getSqlEngine()
      .then((SQL) => {
        if (cancelled) return
        const db = new SQL.Database()
        try {
          db.run(schema)
          const output = db.exec(challenge.solutionQuery)
          setExpected(output[0] ?? { columns: [], values: [] })
        } catch (err) {
          setError(err.message)
        } finally {
          db.close()
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })

    return () => {
      cancelled = true
    }
  }, [challenge, schema])

  return (
    <div className="px-4 py-4">
      <p className="whitespace-pre-line text-sm text-ink">{challenge.prompt}</p>

      {error && (
        <p className="mt-3 rounded-full bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          Kutilgan natijani hisoblashda xatolik: {error}
        </p>
      )}

      {expected && !error && (
        <div className="mt-3">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-[.1em] text-ink-muted">Kutilgan natija</p>
          <div className="max-h-80 overflow-auto rounded-3xl bg-canvas-muted">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-canvas-muted text-ink-muted">
                <tr>
                  {expected.columns.map((column) => (
                    <th key={column} className="whitespace-nowrap px-4 py-2.5 font-medium">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {expected.values.map((row, rowIndex) => (
                  <tr key={rowIndex} className={cn(rowIndex > 0 && 'border-t border-line')}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="whitespace-nowrap px-4 py-2.5 text-ink">
                        {cell === null ? <span className="text-ink-muted italic">NULL</span> : String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {expected.values.length === 0 && (
              <p className="px-4 py-2.5 text-sm text-ink-muted">Natija topilmadi (0 qator).</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
```

(Dropped the `border-t border-line` / `rounded-md border border-line bg-canvas` container styling this had before — it now lives inside `ChallengeList`'s own `rounded-3xl bg-canvas` card, per Step 2 above, so it no longer needs its own border/background.)

- [ ] **Step 4: Replace `src/components/content/SqlPlayground.jsx`**

```jsx
import { useEffect, useRef, useState } from 'react'
import { Play, RotateCcw } from 'lucide-react'
import { getSqlEngine } from '@/lib/sqlEngine'
import { cn } from '@/lib/cn'

export default function SqlPlayground({ schema, initialQuery = '' }) {
  const engineRef = useRef(null)
  const dbRef = useRef(null)
  const [query, setQuery] = useState(initialQuery)
  const [status, setStatus] = useState('loading')
  const [initError, setInitError] = useState(null)
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState(null)
  const [runError, setRunError] = useState(null)

  useEffect(() => {
    let cancelled = false

    getSqlEngine()
      .then((SQL) => {
        if (cancelled) return
        engineRef.current = SQL
        const db = new SQL.Database()
        db.run(schema)
        dbRef.current = db
        setStatus('ready')
      })
      .catch((error) => {
        if (cancelled) return
        setInitError(error.message)
        setStatus('error')
      })

    return () => {
      cancelled = true
      dbRef.current?.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleRun() {
    const db = dbRef.current
    if (!db) return

    setRunError(null)
    setMessage(null)
    setResult(null)

    try {
      const output = db.exec(query)

      if (output.length > 0) {
        setResult(output[output.length - 1])
      } else {
        setMessage("So'rov muvaffaqiyatli bajarildi. Natijani ko'rish uchun SELECT so'rovini ishga tushiring.")
      }
    } catch (error) {
      setRunError(error.message)
    }
  }

  function handleReset() {
    const SQL = engineRef.current
    if (!SQL) return

    dbRef.current?.close()
    const db = new SQL.Database()
    db.run(schema)
    dbRef.current = db
    setQuery(initialQuery)
    setResult(null)
    setMessage(null)
    setRunError(null)
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-3xl bg-neutral-900">
      <div className="flex items-center justify-between px-5 py-3.5">
        <span className="text-xs font-medium uppercase tracking-[.12em] text-neutral-400">SQL maydonchasi</span>
        <button
          type="button"
          onClick={handleReset}
          disabled={status !== 'ready'}
          className="flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-neutral-100 disabled:opacity-50"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Qayta tiklash
        </button>
      </div>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={status !== 'ready'}
        rows={4}
        spellCheck={false}
        aria-label="SQL so'rovi"
        className="w-full resize-y bg-transparent px-5 py-1 font-mono text-sm text-neutral-100 outline-none disabled:opacity-50"
      />

      <div className="flex items-center justify-between px-5 pb-4 pt-1">
        <button
          type="button"
          onClick={handleRun}
          disabled={status !== 'ready'}
          className="flex items-center gap-1.5 rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-canvas-muted hover:bg-brand-700 disabled:opacity-50"
        >
          <Play className="h-3.5 w-3.5" />
          {status === 'loading' ? 'Yuklanmoqda...' : 'Bajarish'}
        </button>
        <span className="text-xs text-neutral-500">Ctrl + Enter</span>
      </div>

      {status === 'error' && (
        <p className="bg-red-50 px-5 py-3.5 text-sm text-red-700">SQL vositasini yuklab bo'lmadi: {initError}</p>
      )}

      {runError && <p className="bg-red-50 px-5 py-3.5 text-sm text-red-700">{runError}</p>}

      {message && !runError && (
        <p className="bg-canvas-muted px-5 py-3.5 text-sm text-ink">{message}</p>
      )}

      {result && !runError && (
        <div className="bg-canvas-muted p-4">
          <p className="mb-2 px-1 text-xs font-medium uppercase tracking-[.1em] text-ink-muted">
            Natija · {result.values.length} qator
          </p>
          <div className="max-h-80 overflow-auto rounded-3xl bg-canvas">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-canvas text-ink-muted">
                <tr>
                  {result.columns.map((column) => (
                    <th key={column} className="whitespace-nowrap px-4 py-2.5 font-medium">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.values.map((row, rowIndex) => (
                  <tr key={rowIndex} className={cn(rowIndex > 0 && 'border-t border-line')}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="whitespace-nowrap px-4 py-2.5 text-ink">
                        {cell === null ? <span className="text-ink-muted italic">NULL</span> : String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {result.values.length === 0 && (
              <p className="px-4 py-2.5 text-sm text-ink-muted">Natija topilmadi (0 qator).</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
```

`bg-neutral-900`/`text-neutral-*` here are Tailwind's stock default color scale (not this app's custom tokens) — intentionally page-theme-independent, matching how a real code editor always looks dark regardless of the surrounding site's light/dark mode, and matching the mockup's own explicit `--color-neutral-900` panel for this exact component. Error/message/result strips below the editor use the normal token-driven colors (`bg-red-50`, `bg-canvas-muted`, `text-ink`) since those aren't "editor chrome," they're regular page content sitting below it — this matches the mockup, where the result table area sits on `--color-bg` even though the editor above it is dark.

- [ ] **Step 5: Verify**

Run: `npm run build && npm run lint`
Expected: both clean.

Run `npm run dev`, sign in, open `/arena/sql/select-basics`, confirm: the challenge list card renders with the active challenge's prompt+expected table inline, the SQL editor has dark chrome with a working textarea/Run/Reset, and running a query shows results in the light result panel below. Switch between a few challenges to confirm `SqlPlayground` remounts (fresh sandbox) via its `key`. Also spot-check one SQL-course lesson (e.g. `/sql/02-jadval-qator-va-ustun`) to confirm the same dark-editor `SqlPlayground` renders correctly embedded in lesson prose.

- [ ] **Step 6: Commit**

```bash
git add src/pages/ArenaTopicPage.jsx src/components/arena/ChallengeList.jsx src/components/arena/ChallengeDetail.jsx src/components/content/SqlPlayground.jsx
git commit -m "Reskin the SQL Arena workspace and SqlPlayground to the Organic mockup"
```

---

## Task 10: ProfilePage

**Files:**
- Modify: `src/pages/ProfilePage.jsx` (full rewrite)

**Interfaces:**
- Consumes: `useAuthStore`, `useProgressStore`, `getAllCourses`, `getLessons` (unchanged). `Avatar` (unchanged).
- Produces: nothing new.

Reference: `screen-06-Profil.html`.

- [ ] **Step 1: Replace `src/pages/ProfilePage.jsx`**

```jsx
import { Link } from 'react-router-dom'
import { CheckCircle2, Flame, LogOut, Mail, Trophy } from 'lucide-react'
import { useAuthStore, signOut, getDisplayName, getAvatarUrl } from '@/store/authStore'
import { useProgressStore } from '@/store/progressStore'
import { getAllCourses, getLessons } from '@/courses/registry'
import Avatar from '@/components/ui/Avatar'

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const streak = useProgressStore((state) => state.streak)
  const completedCount = useProgressStore((state) => state.completions.size)
  const isComplete = useProgressStore((state) => state.isComplete)

  const displayName = getDisplayName(user)
  const avatarUrl = getAvatarUrl(user)
  const courses = getAllCourses()
  const totalLessons = courses.reduce((total, course) => total + getLessons(course.id).length, 0)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center gap-5">
        <Avatar src={avatarUrl} name={displayName} size="lg" />
        <div className="min-w-0">
          <h1 className="truncate text-4xl text-ink">{displayName}</h1>
          {user?.email && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{user.email}</span>
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => signOut()}
          className="ml-auto flex shrink-0 items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-canvas"
        >
          <LogOut className="h-4 w-4" />
          Chiqish
        </button>
      </div>

      <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-3xl bg-brand-200 p-6">
          <Flame className="h-6 w-6 text-brand-800" />
          <p className="mt-3.5 font-heading text-4xl leading-none text-brand-900">{streak.current}</p>
          <p className="mt-2 text-sm text-brand-900">Kunlik ketma-ketlik</p>
        </div>
        <div className="rounded-3xl bg-brand2-200 p-6">
          <Trophy className="h-6 w-6 text-brand2-800" />
          <p className="mt-3.5 font-heading text-4xl leading-none text-brand2-900">{streak.longest}</p>
          <p className="mt-2 text-sm text-brand2-900">Eng uzun ketma-ketlik</p>
        </div>
        <div className="rounded-3xl bg-canvas p-6">
          <CheckCircle2 className="h-6 w-6 text-ink-muted" />
          <p className="mt-3.5 font-heading text-4xl leading-none text-ink">{completedCount}</p>
          <p className="mt-2 text-sm text-ink-muted">Tugallangan darslar · {totalLessons} dan</p>
        </div>
      </div>

      <h2 className="mt-11 text-3xl text-ink">Kurslar bo'yicha progress</h2>
      <div className="mt-5 flex flex-col gap-3">
        {courses.map((course) => {
          const lessons = getLessons(course.id)
          const done = lessons.filter((lesson) => isComplete(course.id, lesson.slug)).length
          const percent = lessons.length ? Math.round((done / lessons.length) * 100) : 0
          return (
            <Link key={course.id} to={`/${course.id}`} className="rounded-3xl bg-canvas p-5 hover:bg-canvas/70">
              <div className="flex items-center justify-between gap-3">
                <span className="font-heading text-lg text-ink">{course.title}</span>
                <span className="shrink-0 text-sm text-ink-muted">
                  {done}/{lessons.length}
                </span>
              </div>
              <div className="mt-3.5 h-2.5 overflow-hidden rounded-full bg-canvas-muted">
                <div className="h-full rounded-full bg-brand-600" style={{ width: `${percent}%` }} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint`
Expected: both clean.

Run `npm run dev`, sign in, open `/profile`, confirm the 3 stat tiles and per-course progress rows render with real data.

- [ ] **Step 3: Commit**

```bash
git add src/pages/ProfilePage.jsx
git commit -m "Reskin ProfilePage to the Organic mockup"
```

---

## Task 11: LoginPage

**Files:**
- Modify: `src/pages/LoginPage.jsx` (full rewrite)

**Interfaces:**
- Consumes: `signInWithPassword`, `signUpWithPassword`, `signInWithOAuth` from `@/store/authStore` (unchanged). `cn` from `@/lib/cn` (unchanged).
- Produces: nothing new.

Reference: `screen-07-Kirish.html`. All validation logic, state, and handlers are unchanged — this is a pure markup/class rewrite of the same component.

- [ ] **Step 1: Replace `src/pages/LoginPage.jsx`**

Keep every line from `const EMAIL_RE` through the end of `handleOAuth` (lines 19–126 of the current file) byte-for-byte unchanged — only the `return (...)` JSX changes. Replace the file's imports and JSX with:

```jsx
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  CircleAlert,
  Eye,
  EyeOff,
  Flame,
  Github,
  Loader2,
  Lock,
  Mail,
  User,
} from 'lucide-react'
import { signInWithPassword, signUpWithPassword, signInWithOAuth } from '@/store/authStore'
import { cn } from '@/lib/cn'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputBase =
  'w-full rounded-full border bg-canvas py-2.5 pl-10 pr-10 text-sm text-ink placeholder:text-ink-muted/70 transition-colors focus:outline-none focus:ring-2'
const inputOk = 'border-line focus:border-brand-500 focus:ring-brand-500/20'
const inputError = 'border-red-400 focus:border-red-500 focus:ring-red-500/20'

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.63h6.48c-.28 1.5-1.14 2.77-2.41 3.62v3.01h3.89c2.28-2.1 3.56-5.19 3.56-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.89-3.01c-1.08.73-2.46 1.16-4.06 1.16-3.12 0-5.76-2.11-6.7-4.94H1.29v3.11C3.26 21.31 7.3 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.3 14.29A7.2 7.2 0 0 1 4.92 12c0-.8.14-1.57.38-2.29V6.6H1.29A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.29 5.4z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.35.61 4.6 1.8l3.45-3.45C17.95 1.19 15.24 0 12 0 7.3 0 3.26 2.69 1.29 6.6l4.01 3.11C6.24 6.88 8.88 4.75 12 4.75z"
      />
    </svg>
  )
}

function FieldError({ message }) {
  if (!message) return null
  return <p className="mt-1 text-xs text-red-600 dark:text-red-400">{message}</p>
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  const [mode, setMode] = useState('signIn')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [authError, setAuthError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function switchMode(nextMode) {
    setMode(nextMode)
    setFieldErrors({})
    setAuthError('')
    setConfirmPassword('')
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  function clearFieldError(field) {
    setFieldErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
  }

  function validate() {
    const errors = {}
    if (mode === 'signUp' && !fullName.trim()) {
      errors.fullName = "Ismingizni kiriting"
    }
    if (!EMAIL_RE.test(email)) {
      errors.email = "Email manzilini to'g'ri kiriting"
    }
    if (password.length < 6) {
      errors.password = "Parol kamida 6 ta belgidan iborat bo'lishi kerak"
    }
    if (mode === 'signUp' && confirmPassword !== password) {
      errors.confirmPassword = "Parollar mos kelmadi"
    }
    return errors
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setAuthError('')

    const errors = validate()
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSubmitting(true)
    const { error } =
      mode === 'signIn'
        ? await signInWithPassword(email, password)
        : await signUpWithPassword(email, password, fullName.trim())
    setSubmitting(false)

    if (error) {
      setAuthError(error.message)
      return
    }
    navigate(redirect, { replace: true })
  }

  async function handleOAuth(provider) {
    setAuthError('')
    const { error } = await signInWithOAuth(provider, redirect)
    if (error) setAuthError(error.message)
  }

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink">
            <ArrowLeft className="h-4 w-4" />
            Bosh sahifa
          </Link>

          <h1 className="mt-7 text-4xl text-ink">{mode === 'signIn' ? "Xush kelibsiz" : "Hisob yarating"}</h1>
          <p className="mt-2 text-sm text-ink-muted">
            {mode === 'signIn'
              ? "Davom etish uchun hisobingizga kiring."
              : "Progressingizni saqlash uchun ro'yxatdan o'ting."}
          </p>

          <div className="mt-6 flex rounded-full border border-line">
            <button
              type="button"
              onClick={() => switchMode('signIn')}
              className={cn(
                'flex-1 rounded-full py-2 text-sm font-medium transition-colors',
                mode === 'signIn' ? 'bg-brand-600 text-canvas-muted' : 'text-ink-muted'
              )}
            >
              Kirish
            </button>
            <button
              type="button"
              onClick={() => switchMode('signUp')}
              className={cn(
                'flex-1 rounded-full py-2 text-sm font-medium transition-colors',
                mode === 'signUp' ? 'bg-brand-600 text-canvas-muted' : 'text-ink-muted'
              )}
            >
              Ro'yxatdan o'tish
            </button>
          </div>

          {authError && (
            <div className="mt-4 flex items-start gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col gap-4">
            {mode === 'signUp' && (
              <div>
                <label htmlFor="fullName" className="text-sm font-medium text-ink">
                  Ism-familiya
                </label>
                <div className="relative mt-1.5">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Alisher Navoiy"
                    value={fullName}
                    onChange={(event) => {
                      setFullName(event.target.value)
                      clearFieldError('fullName')
                    }}
                    className={cn(inputBase, 'pr-4', fieldErrors.fullName ? inputError : inputOk)}
                  />
                </div>
                <FieldError message={fieldErrors.fullName} />
              </div>
            )}

            <div>
              <label htmlFor="email" className="text-sm font-medium text-ink">
                Email
              </label>
              <div className="relative mt-1.5">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="siz@misol.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    clearFieldError('email')
                  }}
                  className={cn(inputBase, 'pr-4', fieldErrors.email ? inputError : inputOk)}
                />
              </div>
              <FieldError message={fieldErrors.email} />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-ink">
                Parol
              </label>
              <div className="relative mt-1.5">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={mode === 'signIn' ? 'current-password' : 'new-password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    clearFieldError('password')
                  }}
                  className={cn(inputBase, fieldErrors.password ? inputError : inputOk)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
                  aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <FieldError message={fieldErrors.password} />
            </div>

            {mode === 'signUp' && (
              <div>
                <label htmlFor="confirmPassword" className="text-sm font-medium text-ink">
                  Parolni tasdiqlang
                </label>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value)
                      clearFieldError('confirmPassword')
                    }}
                    className={cn(inputBase, fieldErrors.confirmPassword ? inputError : inputOk)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
                    aria-label={showConfirmPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <FieldError message={fieldErrors.confirmPassword} />
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-canvas-muted transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === 'signIn' ? "Kirish" : "Ro'yxatdan o'tish"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-line" />
            <span className="text-xs text-ink-muted">yoki</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleOAuth('google')}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-canvas"
            >
              <GoogleIcon className="h-4 w-4" />
              Google orqali {mode === 'signIn' ? "kirish" : "ro'yxatdan o'tish"}
            </button>
            <button
              type="button"
              onClick={() => handleOAuth('github')}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-canvas"
            >
              <Github className="h-4 w-4" />
              GitHub orqali {mode === 'signIn' ? "kirish" : "ro'yxatdan o'tish"}
            </button>
          </div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-brand-800 lg:flex lg:flex-col lg:justify-center lg:px-14">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-300/20" />
        <div className="relative max-w-sm">
          <p className="text-xs font-medium uppercase tracking-[.12em] text-brand-300">Darsliklar</p>
          <h2 className="mt-3.5 text-4xl text-brand-100">Progressingiz siz bilan qoladi</h2>
          <p className="mt-3.5 text-brand-200">
            Kirgandan so'ng tugallangan darslaringiz va kunlik ketma-ketligingiz saqlanadi — istalgan
            qurilmadan davom eting.
          </p>

          <div className="mt-8 rounded-3xl bg-brand-100/15 p-6">
            <div className="flex items-center gap-2.5 text-brand-100">
              <Flame className="h-5 w-5 text-brand-300" />
              <span className="font-heading text-lg">5 kunlik ketma-ketlik</span>
            </div>
            <ul className="mt-4.5 flex flex-col gap-2.5">
              {["Git nima?", "O'zgaruvchilar", "SELECT va FROM"].map((title) => (
                <li key={title} className="flex items-center gap-2.5 text-sm text-brand-100">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-brand2-300" />
                  {title}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-3.5 text-xs text-brand-300">
            Namuna ko'rinish — kirgandan so'ng bu sizning haqiqiy progressingiz bo'ladi.
          </p>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint`
Expected: both clean.

Run `npm run dev`, sign out, open `/login`, confirm both sign-in and sign-up modes render, field validation errors still work, and the right-side illustrative panel renders. Confirm signing in still redirects correctly.

- [ ] **Step 3: Commit**

```bash
git add src/pages/LoginPage.jsx
git commit -m "Reskin LoginPage to the Organic mockup"
```

---

## Task 12: NotFoundPage

**Files:**
- Modify: `src/pages/NotFoundPage.jsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing new.

Not in any mockup screen — shape-only pass for consistency (button + heading font).

- [ ] **Step 1: Replace `src/pages/NotFoundPage.jsx`**

```jsx
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-3xl text-ink">Sahifa topilmadi</h1>
      <p className="mt-2 text-ink-muted">Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.</p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-canvas-muted hover:bg-brand-700"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint`
Expected: both clean.

Run `npm run dev`, visit a nonexistent route, confirm the 404 page renders.

- [ ] **Step 3: Commit**

```bash
git add src/pages/NotFoundPage.jsx
git commit -m "Reskin NotFoundPage to the Organic mockup"
```

---

## Task 13: Full manual verification pass (light + dark)

**Files:** none — verification only.

**Interfaces:** none — exercises every task above.

- [ ] **Step 1: Build/lint sanity**

Run: `npm run build && npm run lint`
Expected: both clean, matching every prior task's individual verification.

- [ ] **Step 2: Route-by-route visual pass, light mode**

With `npm run dev` running and light mode active, visit and eyeball: `/` (hero, how-it-works, course grid with real counts, testimonials, CTA, footer), `/kurslar`, any `/{courseId}` overview, any `/{courseId}/{slug}` lesson (check `Callout`/`Quiz`/`Exercise`/`Solution`/`KeyPoints`/`Figure` if the lesson has them, and `SqlPlayground` on a SQL lesson), `/arena`, `/arena/sql/<any-slug>`, `/profile`, `/login` (both sign-in and sign-up tabs), a nonexistent route (404). Confirm: no leftover `rounded-md`/`rounded-lg` boxes that should have become pills/`rounded-3xl`, no indigo left anywhere (search is a good backstop — see Step 4), headings render in Caprasimo, body text in Figtree.

- [ ] **Step 3: Dark mode pass**

Toggle dark mode via `ThemeToggle`. Re-check the same route list from Step 2. Confirm text stays legible against the dark `--color-canvas`/`--color-canvas-muted` backgrounds everywhere (existing `dark:` variants on Callout/Quiz semantic colors, brand/brand2 ramp steps in nav/buttons/cards), and that `SqlPlayground`'s dark editor chrome looks correct in both site themes (it should look identical in light and dark site mode, by design — confirm it does).

- [ ] **Step 4: Sweep for missed indigo/old-shape references**

Run: `grep -rn "rounded-md\|rounded-lg" src/components src/pages` and review each hit — confirm every remaining one is a deliberate, reviewed exception (none should be from this redesign's files; any that are indicate a missed spot in Tasks 2–12).

Run: `grep -rn "border-line hover:border-brand-300\|shadow-sm\b" src/components src/pages` as a spot-check for stray pre-redesign card styling that might have been missed by a task's rewrite.

- [ ] **Step 5: Auth-gated route check**

Sign out, confirm `/arena` and `/profile` still redirect to `/login?redirect=...` (unchanged `RequireAuth` behavior — this task doesn't touch routing, just confirming the reskin didn't accidentally break it).

No commit for this task — it's verification only. If any check fails, fix the relevant file from Tasks 1–12 and re-run the affected step.
