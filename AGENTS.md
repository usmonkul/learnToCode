# AGENTS.md

Instructions for any AI coding tool (Claude Code, Cursor, Copilot, etc.) working in this repo. Follow this file's conventions over your own defaults.

## What this is

A front-end-only, no-backend, no-auth programming tutorial platform. Students pick a course and read lessons. Lessons are plain JSX files composed from a small library of **content primitives**. There is no CMS and no database — the filesystem *is* the content, and Vite's `import.meta.glob` discovers it at build time through `src/courses/registry.js`.

**The one idea that drives every folder-structure and component decision here: adding a lesson is one file, and adding a course is one folder.** Never reintroduce a hand-maintained index of lessons/courses — that's exactly what the registry exists to avoid.

## Tech stack — do not add competing libraries

React 19, Vite, React Router 7, Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`), Zustand 5, lucide-react (icons), `prism-react-renderer` (code highlighting), `@tailwindcss/typography` (prose), `clsx` + `tailwind-merge` (via the `cn()` helper). Plain JavaScript `.jsx` files — **no TypeScript**, despite `@types/react`/`@types/react-dom` being present (editor intellisense only; there is no `tsconfig.json` and no `.tsx` file anywhere). See `package.json` for exact versions.

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

Don't add `ui/Button`, `ui/Badge`, or `ui/IconButton` speculatively — they were deliberately dropped from an earlier draft of this architecture because nothing needed them. Two occurrences of a styled `<button>`/`<Link>` (there are exactly two CTA buttons today, in `CourseOverviewPage.jsx` and `NotFoundPage.jsx`) is below the extraction threshold; revisit only at a third occurrence.

## Styling

Tailwind v4, CSS-first config in `src/index.css` (`@import "tailwindcss"`, `@plugin "@tailwindcss/typography"`, an `@theme` block). Use the existing design tokens instead of raw hex or ad-hoc Tailwind colors:

- `bg-brand-{50..900}` / `text-brand-*` / `border-brand-*` — the indigo brand scale
- `bg-canvas` (white) / `bg-canvas-muted` (page background) / `border-line` — surfaces
- `text-ink` (primary text) / `text-ink-muted` (secondary text)

**Never build a Tailwind class from a runtime string** (e.g. `` `bg-${course.color}-50` ``) — Tailwind's compiler only picks up classes it can see as literal text in source, so a templated class silently renders unstyled. If a value needs to control color, map it through a static lookup object instead (see `CourseCard.jsx`'s `ICONS` map for the pattern with icons).

Use `cn()` from `@/lib/cn` for any conditional/variant classNames — never string-concatenate or use bare template literals for classes.

Light mode only, for now — the token-based setup above is intentionally dark-mode-ready (semantic names, not raw values), but do not add a dark theme, a toggle, or `dark:` variants unless asked.

## Language

Lesson prose and all UI chrome (buttons, nav labels, headings) are written in **Uzbek**. Code, language keywords, and technical terms stay in English; add a bracketed Uzbek translation inline where it helps a beginner (`o'zgaruvchi (variable)`). This is a fixed content convention, not an i18n system — there's no language switcher and there shouldn't be one.

## Non-goals — do not add these without being explicitly asked

No backend, no authentication, no user accounts. No progress tracking or persistence of any kind (no localStorage, no `persist` middleware on the zustand store — it holds only ephemeral mobile-sidebar-open state). No live/editable code execution. No TypeScript. No automated test runner.

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
