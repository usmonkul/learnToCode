# React Course — Restructure Design

**Date:** 2026-10-03
**Status:** Approved
**Supersedes:** [2026-08-12-react-course-content-design.md](2026-08-12-react-course-content-design.md)

## Why

The first version of the `react` course (20 lessons) had three problems:

- **Order didn't follow React's own logic.** Lists and conditional rendering came after state, `useRef` sat under effects, lifting state came after effects, and custom hooks came before context.
- **The mental model was missing.** Nothing taught render/commit, purity, state as a snapshot, immutable object/array updates, or state preservation by tree position. The to-do project relied on immutable array updates that were never taught.
- **Practical gaps and thin lessons.** No project setup, no styling, about 2 quizzes and exercises per lesson, and a single project at the very end.

## Scope

React becomes a **course pair** (see `CONTEXT.md`):

- `react` (this spec): JS-literate students with zero React knowledge, through to building a small single-page app with data fetching. **Out of scope:** routing, TanStack Query, React 19 Actions (`useActionState`, `useFormStatus`, `useOptimistic`), `use`, `memo`/`useMemo`/`useCallback`, `lazy`/Suspense, error boundaries, portals, Zustand, testing.
- `react-advanced` (outline only, gets its own design later): routing → data → React 19 forms → performance → resilience and patterns → global state → testing and deployment → multi-page course project.

The course card keeps `level: 'Intermediate'`, and the description states the JavaScript prerequisite.

## Lesson tree

Numbers set the order. Slugs are English, and renaming old slugs is accepted (student progress on renamed lessons resets).

| # | Slug | Section | Source |
|---|---|---|---|
| 01 | `what-is-react` | Boshlash | old 01, minus the "why hooks" framing |
| 02 | `project-setup` | Boshlash | **new**: Node, `npm create vite`, folder tour, dev server, React DevTools, StackBlitz fallback callout |
| 03 | `jsx` | Boshlash | old 02 |
| 04 | `components` | Boshlash | old 03, plus `import`/`export` and one component per file |
| 05 | `props` | UI'ni tasvirlash | old 04 |
| 06 | `children-composition` | UI'ni tasvirlash | old 05 |
| 07 | `conditional-rendering` | UI'ni tasvirlash | old 09 |
| 08 | `lists-and-keys` | UI'ni tasvirlash | old 10 |
| 09 | `pure-components` | UI'ni tasvirlash | **new**: pure render, render tree, StrictMode double render |
| 10 | `styling` | UI'ni tasvirlash | **new**: `className`, CSS files, CSS Modules, `style` prop, mention of Tailwind |
| 11 | `project-restaurant-menu` | UI'ni tasvirlash | **section project**: a static *osh markazi* menu from a data array, with categories and a "sold out" state |
| 12 | `event-handling` | Interaktivlik | old 07, now placed before state |
| 13 | `usestate` | Interaktivlik | old 06 |
| 14 | `render-and-commit` | Interaktivlik | **new**: render triggers, state as a snapshot, batching, updater functions |
| 15 | `state-objects` | Interaktivlik | **new**: immutable object updates, spread, nested objects |
| 16 | `state-arrays` | Interaktivlik | **new**: immutable add, remove, update, insert and sort |
| 17 | `forms` | Interaktivlik | old 08 |
| 18 | `project-homework-tracker` | Interaktivlik | **section project**: merges old 18 and 19 |
| 19 | `structuring-state` | State boshqaruvi | **new**: minimal state, derived values, avoiding duplication and contradictions, "thinking in React" |
| 20 | `lifting-state-up` | State boshqaruvi | old 14 |
| 21 | `preserving-state` | State boshqaruvi | **new**: state tied to tree position, resetting it with `key` |
| 22 | `usereducer` | State boshqaruvi | old 15 |
| 23 | `usecontext` | State boshqaruvi | old 17 |
| 24 | `project-bazaar-cart` | State boshqaruvi | **section project**: reducer and context together |
| 25 | `useref` | Ref va effektlar | old 13 |
| 26 | `useeffect` | Ref va effektlar | old 11 |
| 27 | `effect-cleanup` | Ref va effektlar | first half of old 12 |
| 28 | `data-fetching` | Ref va effektlar | second half of old 12, expanded: loading/error states, race conditions, `AbortController` |
| 29 | `you-might-not-need-effect` | Ref va effektlar | **new** |
| 30 | `custom-hooks` | Ref va effektlar | old 16, with `useFetch`/`useLocalStorage` examples |
| 31 | `project-book-search` | Ref va effektlar | **course project**: Open Library API search, debounce, loading/error states, favourites in localStorage via a custom hook |
| 32 | `whats-next` | Ref va effektlar | old 20, rewritten as a bridge to `react-advanced`, listing its topics with a "kurs tayyorlanmoqda" note and no links |

## Lesson template (every non-project lesson)

1. **Muammo** — opens with a concrete pain the concept fixes.
2. Explanation with examples, built up step by step.
3. `Figure` when a mechanism is involved.
4. `Callout type="warning" title="Keng tarqalgan xatolar"`.
5. At least 2 `Quiz`.
6. At least 2 `Exercise` with a `Solution`, in increasing difficulty.
7. `KeyPoints`.

Target length is about 300–450 lines. Exercises are written for the student's local Vite project, set up in lesson 02.

## Section project lessons (11, 18, 24, 31)

1. A link at the top, "Tayyor natijani ko'ring", to the finished app at `/loyihalar/<slug>`.
2. Requirements list.
3. A component-split plan with a component-tree `Figure`.
4. 4–6 steps, each with a goal, the code, and "why this way".
5. Full final code.
6. 2–3 **stretch tasks** ("Qo'shimcha topshiriqlar"), without solutions.
7. `KeyPoints`.

Each one has a matching Loyihalar entry `src/projects/NN-react-<theme>/` with `type: 'React'`. Levels: restaurant menu and homework tracker are `'Beginner'`; bazaar cart and book search are `'Intermediate'`. The `Project.jsx` is the same app the lesson builds.

## Conventions

- **Styling:** plain CSS and CSS Modules throughout; Tailwind only gets a mention in lesson 10.
- **Terms:** English technical noun with an Uzbek gloss on first use per lesson. The fixed list lives in `docs/agents/course-writing.md`.
- **Figures:** hand-written SVGs in `src/assets/`, Organic palette. Main elements: stroke `#c67139`, fill `#fff2eb`, text `#402310`. Secondary elements: stroke `#7a8a5e`, fill `#f0fae1`, text `#3d472b`. Muted text: `#6a675e`. White background. The minimum new figures cover render→commit→paint and the state snapshot (14), copy vs mutate (15), state by tree position (21), reducer flow (22), context through the tree (23), effect timing and cleanup (26–27), and the fetch race (28). Each project lesson also gets a component tree.

## Delivery

One branch, `react-course-restructure`, merged once.

- **Phase 0:** rename, renumber and re-section the existing lessons; recolour the old SVGs.
- **Then one commit per section:** new and expanded lessons, figures, and that section's Loyihalar project.

`npm run build` and `npm run lint` must pass after every commit. Each section is written directly, then gets one reviewer pass against this spec.
