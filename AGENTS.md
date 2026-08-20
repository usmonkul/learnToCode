# AGENTS.md

Instructions for any AI coding tool (Claude Code, Cursor, Copilot, etc.) working in this repo. Follow this file's conventions over your own defaults.

## What this is

A front-end-only, no-backend, no-auth programming tutorial platform. Students pick a course and read lessons. Lessons are plain JSX files composed from a small library of **content primitives**. There is no CMS and no database — the filesystem *is* the content, and Vite's `import.meta.glob` discovers it at build time through `src/courses/registry.js`.

**The one idea that drives every folder-structure and component decision here: adding a lesson is one file, and adding a course is one folder.** Never reintroduce a hand-maintained index of lessons/courses — that's exactly what the registry exists to avoid.

## Tech stack — do not add competing libraries

React 19, Vite, React Router 7, Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`), Zustand 5, lucide-react (icons), `prism-react-renderer` (code highlighting), `@tailwindcss/typography` (prose), `clsx` + `tailwind-merge` (via the `cn()` helper). Plain JavaScript `.jsx` files — **no TypeScript**, despite `@types/react`/`@types/react-dom` being present (editor intellisense only; there is no `tsconfig.json` and no `.tsx` file anywhere). See `package.json` for exact versions.

One scoped exception: `sql.js` (WASM SQLite, runs entirely client-side) backs the `SqlPlayground` primitive used by the SQL course — see that primitive's row below and `src/lib/sqlEngine.js`. Don't reach for it, or any other execution engine, outside that one documented use.

No test runner is installed, on purpose — see "Verifying your work" below for what stands in for it.

## Folder structure

```
src/
  courses/
    registry.js           # the ONLY module with real logic — read it before touching content discovery
    <course-id>/
      course.meta.js       # course-level branding: { title, description, icon }
      lessons/
        01-<slug>.jsx        # export const meta = { title, section }; default export = lesson body
  components/
    content/                # primitives lesson authors use directly: CodeBlock, Callout, Quiz, Exercise, Solution, KeyPoints, Figure
    layout/                 # page chrome: TopNav, Sidebar, LessonNav, Breadcrumbs, CourseCard
    ui/                     # generic internals shared by the above (currently just Disclosure)
  pages/                   # one file per route: HomePage, CourseOverviewPage, LessonPage, NotFoundPage
  store/uiStore.js         # zustand — UI-only state (mobile sidebar open/closed), nothing else
  lib/cn.js                # clsx + tailwind-merge classname helper — use this, never string-concat classNames
  App.jsx                  # route table + RootLayout (TopNav + scroll/sidebar reset on navigation)
```

Always import via the `@` alias (`@/components/content/CodeBlock`, `@/courses/registry`, `@/lib/cn`) — never relative `../../..` paths. The only exception is `src/main.jsx`, the Vite entry point, which has no parent to route through.

## The registry contract (`src/courses/registry.js`)

This is reference material, not something to reimplement — read the file itself before changing content-discovery behavior. The parts that aren't obvious from reading the code once:

- Lesson filenames need a **zero-padded two-digit prefix** (`01-hello-world.jsx`, `02-variables.jsx`, up to `99-`). Ordering is a plain string sort on the glob path, so an unpadded or missing prefix silently breaks ordering.
- A lesson's `slug` is derived from its filename (numeric prefix and `.jsx` stripped) — you never set a slug explicitly.
- `getGroupedLessons` groups only **consecutive** lessons sharing the same `meta.section`. Keep a section's lessons adjacent in the file listing; if you must reorder and a section becomes non-contiguous, the sidebar will just show it as two separate groups with the same heading — not a crash, but confusing for students.
- A lesson missing `export const meta` doesn't crash the app — it falls back to `{ title: slug, section: '' }` and logs a `console.warn`. Still write `meta` explicitly; the fallback exists to keep the failure loud-but-survivable, not as a substitute.
- A course's `id` comes from its folder name, not from anything inside `course.meta.js` — don't add an `id` field there, it would be a second, contradicting source of truth.

Exported API — everything downstream (pages, layout components) reads through this, never through `import.meta.glob` directly: `getAllCourses()`, `getCourse(courseId)`, `getLessons(courseId)`, `getLesson(courseId, slug)`, `getAdjacentLessons(courseId, slug)`, `getGroupedLessons(courseId)`.

## Content primitives — use these exact contracts, don't invent new props

All live in `src/components/content/`. Prose itself needs no component: lesson files write plain semantic HTML (`<p>`, `<h2>`, `<ul>`, `<strong>`, `<blockquote>`) and `LessonPage` wraps the rendered lesson in `@tailwindcss/typography`'s `.prose` class for free. Reach for a primitive only for what HTML alone can't do:

| Component | Props | Notes |
|---|---|---|
| `CodeBlock` | `lang` (string, e.g. `"python"`), `children` (a template-string code sample) | Static, syntax-highlighted, has a copy button. Never make this editable/runnable — live code execution is explicitly out of scope. |
| `Callout` | `type` (`"tip"` \| `"note"` \| `"warning"` \| `"danger"`), `title` (optional), `children` | Colored box with an icon per type. |
| `Quiz` | `question`, `options` (string array, **no duplicates within one Quiz** — array items double as React keys), `correctIndex`, `explanation` | Local `useState` only. Never wire this to any persistence — no progress tracking exists in this app by design. |
| `Exercise` | `title` (defaults to `"Mashq"`), `children` | Prompt box; typically wraps a `<Solution>`. |
| `Solution` | `children` | Collapsible "Yechimni ko'rsatish", built on `ui/Disclosure`. |
| `KeyPoints` | `children` (`<li>` elements) | Bulleted summary box, usually at a lesson's end. |
| `Figure` | `src`, `alt` (defaults to `''`, but always pass a real one), `caption` (optional) | Image + caption. |
| `SqlPlayground` | `schema` (SQL string: `CREATE TABLE`/`INSERT` statements that seed a fresh in-memory SQLite database on mount), `initialQuery` (optional starter query) | The **one, deliberate exception** to "no live code execution" — runs real queries client-side via `sql.js`/WASM (see `src/lib/sqlEngine.js`, a memoized loader shared across instances so the ~700KB engine is fetched once, lazily, only when a playground actually mounts). Each instance owns an isolated, ephemeral database; a "Qayta tiklash" button re-seeds it from `schema`. Scoped to the SQL course only — don't reuse this pattern for any other language's "run my code" impulse without an explicit ask. |

Don't add `ui/Button`, `ui/Badge`, or `ui/IconButton` speculatively — they were deliberately dropped from an earlier draft of this architecture because nothing needed them. Two occurrences of a styled `<button>`/`<Link>` (there are exactly two CTA buttons today, in `CourseOverviewPage.jsx` and `NotFoundPage.jsx`) is below the extraction threshold; revisit only at a third occurrence.

## Styling

Tailwind v4, CSS-first config in `src/index.css` (`@import "tailwindcss"`, `@plugin "@tailwindcss/typography"`, an `@theme` block). Use the existing design tokens instead of raw hex or ad-hoc Tailwind colors:

- `bg-brand-{50..900}` / `text-brand-*` / `border-brand-*` — the indigo brand scale
- `bg-canvas` (white) / `bg-canvas-muted` (page background) / `border-line` — surfaces
- `text-ink` (primary text) / `text-ink-muted` (secondary text)

**Never build a Tailwind class from a runtime string** (e.g. `` `bg-${course.color}-50` ``) — Tailwind's compiler only picks up classes it can see as literal text in source, so a templated class silently renders unstyled. If a value needs to control color, map it through a static lookup object instead (see `CourseCard.jsx`'s `ICONS` map for the pattern with icons).

Use `cn()` from `@/lib/cn` for any conditional/variant classNames — never string-concatenate or use bare template literals for classes.

### Dark mode

The app supports light/dark/system, toggled from `ThemeToggle` in `TopNav`. How it works, so you don't have to reverse-engineer it:

- **Selector**: Tailwind's `dark:` variant is remapped in `src/index.css` via `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));` — it matches on a `data-theme="dark"` attribute on `<html>`, not the default `prefers-color-scheme` media query. This is what makes a manual light/dark/system toggle possible (a pure media-query variant can't be manually overridden).
- **State**: `src/store/themeStore.js` (zustand) holds `preference` (`'light' | 'dark' | 'system'`) and the resolved `resolvedTheme` (`'light' | 'dark'`). It resolves `'system'` via `matchMedia('(prefers-color-scheme: dark)')`, live-updates on OS theme changes when `preference === 'system'`, and is the one deliberate exception to "no localStorage" (see Non-goals) — it persists `preference` manually (`localStorage.getItem`/`setItem` inside the store's own logic, **not** zustand's `persist` middleware, which stays off-limits). `index.html` has a small inline blocking script that reads the same localStorage key before first paint, so there's no flash of the wrong theme on load.
- **Tokens vs. `dark:` utilities — two different mechanisms, use the right one**:
  - The semantic tokens (`bg-canvas`, `bg-canvas-muted`, `border-line`, `text-ink`, `text-ink-muted`) are CSS custom properties, redefined once under `[data-theme='dark']` in `src/index.css`. Any component using these tokens adapts automatically — **no `dark:` classes needed**, and none should be added for these.
  - Anywhere a component reaches for a raw Tailwind color instead of a token (status colors in `Callout`/`Quiz`/`SqlPlayground` — `emerald`/`amber`/`red`, or a `bg-brand-50`/`bg-brand-100`-style light chip like `CourseCard`'s icon badge or a lesson's flowchart box), add an explicit `dark:` variant by hand, following the pattern already in those files (e.g. `bg-emerald-50 ... dark:bg-emerald-950 dark:text-emerald-200`). A `--color-brand-950` token exists in `@theme` specifically for these light-chip-on-dark-background cases.
  - `LessonPage` adds `dark:prose-invert` next to `prose prose-slate` so plain lesson prose (headings, paragraphs, lists, `<code>`) inverts for free via `@tailwindcss/typography`.
  - `CodeBlock` reads `resolvedTheme` from `themeStore` and swaps the `prism-react-renderer` theme between `themes.oneLight` and `themes.oneDark` — this can't be done via CSS since prism applies inline styles, hence the JS-level dependency on the store.

## Language

Lesson prose and all UI chrome (buttons, nav labels, headings) are written in **Uzbek**. Code, language keywords, and technical terms stay in English; add a bracketed Uzbek translation inline where it helps a beginner (`o'zgaruvchi (variable)`). This is a fixed content convention, not an i18n system — there's no language switcher and there shouldn't be one.

## Non-goals — do not add these without being explicitly asked

No backend, no authentication, no user accounts. No progress tracking or persistence of any kind (no `persist` middleware on any zustand store), **except** the theme preference in `themeStore.js` (see Styling → Dark mode) — a one-time, explicitly-approved exception, using a plain manual `localStorage` read/write, not the `persist` middleware. `uiStore.js` itself stays ephemeral (mobile-sidebar-open state only). No live/editable code execution, **except** `SqlPlayground` (see Content primitives above) — a one-time, explicitly-approved exception for the SQL course, not a precedent for adding one to every language. No TypeScript. No automated test runner.

## Adding a new lesson

1. Create `src/courses/<course-id>/lessons/NN-<slug>.jsx` with the next zero-padded number.
2. Export `meta = { title: '...', section: '...' }` and a default component composing prose + content primitives.
3. Nothing else needs to change — the registry picks it up automatically.

## Adding a new course

1. Create `src/courses/<course-id>/course.meta.js` exporting `{ title, description, icon }` (`icon` is a string name resolved through `CourseCard.jsx`'s `ICONS` map — add the lucide-react icon there if it's a new one).
2. Add `src/courses/<course-id>/lessons/01-....jsx` (and more) following the lesson recipe above.
3. It appears on the home page automatically — no route, page, or nav code to touch.

## Verifying your work

There is no test suite — this is what stands in for one. Before considering any change done:

```bash
npm run build   # must succeed — this is also the only thing that actually exercises registry.js's import.meta.glob against real content
npm run lint     # must be clean (a handful of pre-existing `only-export-components` warnings on lesson files are expected and fine — they're inherent to the meta-export pattern, not a regression)
```

For anything touching rendered UI or interaction (a new content primitive, layout change, routing change), also run `npm run dev` and check it in an actual browser — build/lint passing proves the code is well-formed, not that it looks or behaves right.
