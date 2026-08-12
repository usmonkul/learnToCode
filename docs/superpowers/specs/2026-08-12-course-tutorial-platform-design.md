# Course Tutorial Platform — Frontend Architecture

**Date:** 2026-08-12
**Status:** Approved

## Purpose

A self-serve, front-end-only tutorial platform for programming courses (Python, JavaScript, etc.). Students pick a course and work through lessons independently. Content is authored as JSX files by the instructor, composing a small library of reusable components so that "writing a tutorial" mostly means writing JSX, not rebuilding UI.

No backend and no authentication in this phase — the whole app is static, statically deployable content read from the filesystem at build time.

## Non-goals (this phase)

- Authentication / user accounts (may come later once a backend exists)
- Progress tracking / persistence of completion state
- Live/editable code execution (code blocks are static + copy-only)
- Dark mode (structured so it's cheap to add later, but not shipped now)
- i18n / multi-language switching (single language: Uzbek, hardcoded strings)

## Content language

Lesson prose and all UI chrome (buttons, nav labels, headings like "Copy", "Yechimni ko'rsatish", "Kursni boshlash") are written in **Uzbek**. Code, language keywords, and technical terms stay in English; where a term benefits from a translation, it's given inline in brackets, e.g. `o'zgaruvchi (variable)`. This is a content/copy convention, not an i18n system — there is exactly one language, hardcoded.

## Architecture overview

Lessons are discovered from the filesystem at build time via Vite's `import.meta.glob` — no hand-maintained index of lessons to keep in sync. Adding a new lesson means adding one `.jsx` file; adding a new course means adding one folder. All course/lesson lookups go through a single registry module so every page/component has one consistent API instead of touching the filesystem glob directly.

### Folder structure

```
src/
  courses/
    registry.js              # glob, sort, group — the one "smart" module
    python/
      course.meta.js         # { id, title, description, icon, color }
      lessons/
        01-hello-world.jsx    # export const meta = { title, section }; default export = content
        02-variables.jsx
        03-loops.jsx
  components/
    content/                 # authoring primitives (used inside lesson files)
      CodeBlock.jsx
      Callout.jsx
      Quiz.jsx
      Exercise.jsx
      Solution.jsx
      KeyPoints.jsx
      Figure.jsx
    layout/                  # page chrome
      TopNav.jsx
      Sidebar.jsx
      LessonNav.jsx
      CourseCard.jsx
      Breadcrumbs.jsx
    ui/                      # generic primitives content/layout components build on
      Badge.jsx
      Button.jsx
      Disclosure.jsx
      IconButton.jsx
  pages/
    HomePage.jsx              # lists all courses (from registry)
    CourseOverviewPage.jsx    # syllabus for one course + "Kursni boshlash" CTA
    LessonPage.jsx            # sidebar + rendered lesson + prev/next nav
    NotFoundPage.jsx
  store/
    uiStore.js                # zustand: mobile sidebar open/closed only
  lib/
    cn.js                     # clsx + tailwind-merge helper
  App.jsx                     # route table
  main.jsx
```

### Routing

- `/` — `HomePage`: course cards, generated from `registry.getAllCourses()`
- `/:courseId` — `CourseOverviewPage`: course description + full syllabus grouped by section
- `/:courseId/:slug` — `LessonPage`: sidebar (grouped lessons, active-state highlighting) + rendered lesson body + prev/next nav
- `*` — `NotFoundPage`

### Registry (`src/courses/registry.js`)

The only module with non-trivial logic:

- Globs `courses/*/course.meta.js` (eager) → course metadata list
- Globs `courses/*/lessons/*.jsx` (eager) → lesson modules, each exposing `meta` (`{ title, section }`) and a default-exported component
- Derives each lesson's `slug` from its filename (numeric prefix stripped, e.g. `02-variables.jsx` → `variables`) and sorts lessons within a course by filename so numeric prefixes control order
- Groups consecutive lessons sharing the same `meta.section` for sidebar rendering

Exposed API: `getAllCourses()`, `getCourse(courseId)`, `getLessons(courseId)`, `getLesson(courseId, slug)`, `getAdjacentLessons(courseId, slug)`.

Every page/component reads through this API; nothing else touches `import.meta.glob` directly.

### Why no `<Lesson>` wrapper component

`LessonPage` already has the lesson's `meta.title` from the registry, so it renders the heading and page chrome itself. Lesson files default-export just their body content — one less thing for the instructor to type per lesson.

### Prose is free, not a component

`@tailwindcss/typography` is added so lesson files write plain semantic HTML (`<p>`, `<h2>`, `<ul>`, `<strong>`, `<blockquote>`) and `LessonPage` wraps the rendered lesson in a single `<div className="prose">`. No custom `<Prose>` component needed. Custom components exist only for things HTML can't already do:

| Component | Purpose |
|---|---|
| `CodeBlock` | `lang` prop + children string → syntax-highlighted block (via `prism-react-renderer`) with a language label and copy button |
| `Callout` | `type="tip"\|"note"\|"warning"\|"danger"` — colored box with a lucide-react icon |
| `Quiz` | question + options + correct index + explanation; local `useState`, instant feedback, no persistence |
| `Exercise` / `Solution` | prompt box with a collapsible "Yechimni ko'rsatish" (Show Solution), built on the `Disclosure` ui primitive |
| `KeyPoints` | bulleted summary box, typically used at lesson end |
| `Figure` | image + caption |

A lesson file reads like: prose paragraphs interspersed with `<Callout type="tip">...</Callout>`, `<CodeBlock lang="python">{`x = 5`}</CodeBlock>`, `<Quiz .../>` — composing components, not building UI.

## Styling

Tailwind v4 stays CSS-first (`@import "tailwindcss"` in `index.css`, already configured via `@tailwindcss/vite`). A small set of CSS custom properties is added for brand colors so theming (including dark mode later) stays cheap to retrofit, even though only light mode ships now. `clsx` + `tailwind-merge` combine into a `cn()` helper (`src/lib/cn.js`) used by `ui/` primitives for variant classes (e.g. `Callout`'s four color variants).

## State management

`zustand` (already installed) is used minimally: a single `uiStore` holding whether the mobile sidebar drawer is open. No persistence middleware, no progress tracking — matches the decision to skip progress tracking in this phase.

## Error handling

Content is glob'd at build time, so the only runtime failure mode is a URL referencing an unknown `courseId` or `slug`. `CourseOverviewPage` / `LessonPage` check the registry lookup; on `undefined`, they redirect to `NotFoundPage`.

## Testing

`registry.js` is the only unit with real logic (globbing/sorting/grouping) and is the one candidate worth a Vitest unit test later. No test runner is being scaffolded in this pass since the rest of the app is declarative JSX composition with no other non-trivial logic.

## New dependencies

| Package | Purpose |
|---|---|
| `prism-react-renderer` | Static syntax highlighting for `CodeBlock` |
| `@tailwindcss/typography` | Free prose styling for lesson body text |
| `clsx` | Conditional className composition |
| `tailwind-merge` | Resolves conflicting Tailwind classes in `cn()` |

Already present and reused as-is: `react`, `react-dom`, `react-router-dom`, `zustand`, `lucide-react`, `tailwindcss`, `@tailwindcss/vite`.

## Sample content (proves the pattern end-to-end)

One course, **Python asoslari** (Python Basics), under `src/courses/python/`, in Uzbek:

| # | Lesson | Section | Demonstrates |
|---|---|---|---|
| 1 | Salom, Dunyo! (Hello, World) | Boshlash uchun | prose, one `CodeBlock`, `KeyPoints` |
| 2 | O'zgaruvchilar va turlar (Variables & Types) | Boshlash uchun | `Callout` (tip + warning), multiple `CodeBlock`s, `Quiz` |
| 3 | Sikllar (Loops) | Boshqaruv tuzilmalari | `Exercise` + `Solution`, `Figure`, `Quiz` |

Two sections across three lessons exercises every content primitive and the sidebar's section-grouping without requiring a full curriculum to be authored. `HomePage` lists this one course; a second course folder (e.g. `javascript/`) appears automatically once added, with no other code changes required.
