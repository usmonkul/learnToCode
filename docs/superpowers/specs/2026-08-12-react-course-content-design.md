# React Course — Content Design

**Date:** 2026-08-12
**Status:** Approved

## Purpose

Author the lesson content for the new `react` course (folder + `course.meta.js` + icon registration already done — see [src/courses/react/course.meta.js](../../../src/courses/react/course.meta.js)). This spec covers only the 13 lesson files and any supporting illustration assets.

## Audience & scope

JS-literate beginners to React — assume solid JavaScript (functions, arrays/array methods, destructuring, ES6+) but zero React knowledge. Fundamentals only: function components + hooks exclusively (no class components, not even as "the old way" — hooks are simply how React is written today). No React Router, no Context, no global state library, no React 19 experimental APIs (`use()`, Actions) — those are out of scope for this track.

## Lesson list

One concept per lesson, atomic and self-contained per [AGENTS.md](../../../AGENTS.md), same style as the existing Python course. Sections are consecutive so the sidebar groups them correctly.

| File | `meta.section` | `meta.title` | Must cover |
|---|---|---|---|
| `01-react-nima-va-nega-hooklar.jsx` | Boshlash | React nima va nega hooklar | What a component is and why React exists (declarative UI vs. manual DOM manipulation); function components + hooks as the sole modern approach |
| `02-jsx-asoslari.jsx` | Boshlash | JSX asoslari | JSX syntax, embedding JS expressions with `{}`, one root element / fragments (`<>...</>`), JSX vs HTML differences (`className`, self-closing tags) |
| `03-funksional-komponentlar.jsx` | Komponentlar va Props | Funksional komponentlar | Defining a component as a function returning JSX, PascalCase naming, composing components inside other components |
| `04-props.jsx` | Komponentlar va Props | Props orqali ma'lumot uzatish | Passing props, destructuring props, default values, props are read-only |
| `05-children-composition.jsx` | Komponentlar va Props | children va composition | `props.children`, wrapping/layout components, composition over configuration |
| `06-usestate.jsx` | State va interaktivlik | useState bilan holat | `useState` basics, state vs. props, re-render on state change, why you never mutate state directly |
| `07-event-handling.jsx` | State va interaktivlik | Voqealarni boshqarish | `onClick`/`onChange`/etc., passing handler functions, the event object, avoiding inline-arrow pitfalls (conceptually, not perf-obsessed) |
| `08-formalar.jsx` | State va interaktivlik | Formalar (controlled inputs) | Controlled `<input>`/`<textarea>`/`<select>`/checkbox, `onSubmit` + `preventDefault` |
| `09-royxatlar-va-key.jsx` | Ro'yxat va shartli render | Ro'yxatlarni render qilish | `.map()` to render lists, why `key` is required, picking a stable key (not array index when avoidable) |
| `10-shartli-render.jsx` | Ro'yxat va shartli render | Shartli render | `&&`, ternary, early `return null`, when to prefer one over the other |
| `11-useeffect.jsx` | Effektlar | useEffect asoslari | Side effects vs. render, dependency array (no deps / `[]` / `[dep]`), cleanup function, common pitfall of missing deps |
| `12-useref.jsx` | Effektlar | useRef asoslari | `useRef` for DOM access (e.g. focusing an input) and for mutable values that don't trigger re-render; explicitly when *not* to reach for a ref (state should drive UI) |
| `13-yakuniy-loyiha.jsx` | Amaliy loyiha | Yakuniy loyiha: Vazifalar ro'yxati | Capstone to-do list app combining `useState`, event handling, controlled form input, list rendering + `key`, conditional rendering (empty state) |

## Content requirements (apply to every lesson)

- **Language:** Uzbek prose, matching the existing Python lessons' tone and register (see `src/courses/python/lessons/02-variables.jsx` as the reference example). Code/keywords stay in English; inline-bracket translations for new terms (`holat (state)`, `qanca (props)` etc.) on first use per lesson.
- **Primitives:** use only the contracts documented in AGENTS.md (`CodeBlock`, `Callout`, `Quiz`, `Exercise`, `Solution`, `KeyPoints`, `Figure`). Never invent new props or new components.
- **Interactivity:** every lesson includes at least one `Quiz` and one `Exercise`+`Solution` pair. Quiz options must have no duplicate strings (they're used as React keys).
- **Illustrations:** every lesson where a diagram genuinely clarifies a mechanism (not decorative) gets one hand-authored inline SVG under `src/assets/`, following the existing `loop-flow.svg` pattern — indigo brand palette (`#4f46e5` stroke/arrows, `#eef2ff` fill, `#312e81` text), `viewBox`, a `<title>` for accessibility, referenced via `Figure`. Minimum: lessons 01 (component tree / declarative-vs-manual), 04 (props flow parent→child), 06 (state → re-render cycle), 09 (list + key mapping), 11 (render → paint → effect timing), 13 (capstone data-flow diagram). Other lessons may skip illustration if nothing benefits from one — don't force it.
- **Code samples:** realistic, runnable-looking JSX (even though the app has no live execution), consistent variable naming across a lesson, comments in Uzbek where they clarify non-obvious output (matching Python lessons' `# natija` style, adapted to `//`).
- **KeyPoints:** every lesson ends with a `KeyPoints` summary.
- **Structure:** every lesson exports `meta = { title, section }` per the table above and a default function component named after the topic (e.g. `export default function UseStateLesson()`).

## Workflow

Use `subagent-driven-development`. For each of the 13 lessons, in order:

1. **Writer subagent** drafts the lesson file per the table row and the content requirements above, plus any SVG asset it needs.
2. **Reviewer subagent** checks the draft against: the "Must cover" column for that lesson, the content requirements list, AGENTS.md's primitive contracts and folder/registry rules, and factual/technical correctness of the React explanations. Reviewer reports concrete issues (missing topic, wrong primitive usage, incorrect technical claim, key-duplication bug, etc.) or approves.
3. Writer addresses reviewer feedback (same subagent turn or a follow-up) until the reviewer approves.
4. Move to the next lesson. Lessons build on prior vocabulary (e.g. lesson 07 can assume lesson 06 already introduced `useState`), so order matters and lessons must be done sequentially, not in parallel.

No Playwright/browser testing for this pass. After each lesson is approved, run `npm run build && npm run lint` (per AGENTS.md's "Verifying your work") — must stay clean throughout.

## Out of scope

- React Router, Context, global state, Server Components, React 19 experimental APIs — explicitly excluded from this fundamentals track (see Scope above).
- Any change to `registry.js`, content primitives, or layout components — this pass is content-only. If a genuine gap in the primitive set is discovered while writing, stop and flag it rather than inventing a new component ad hoc.
