# React Course Content — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author the 13 lesson files for the new `react` course (`src/courses/react/`, folder + `course.meta.js` + `Atom` icon already exist — see git history). Course-level scaffolding is done; this plan covers lesson content only.

**Design doc:** `docs/superpowers/specs/2026-08-12-react-course-content-design.md` — read for full rationale (audience, scope decisions, illustration/interactivity bar). This plan operationalizes that spec into one task per lesson.

**Audience & scope:** JS-literate beginners to React, fundamentals only. Function components + hooks exclusively — no class components mentioned at all, not even as history. No React Router, Context, global state, or React 19 experimental APIs (`use()`, Actions) — out of scope for this track.

## Global Constraints

Apply to every task in this plan:

- **Language:** Uzbek prose, matching the existing Python lessons' tone/register — read `src/courses/python/lessons/02-variables.jsx` as the reference example before writing. Code/keywords stay in English; new terms get an inline bracket translation on first use per lesson (e.g. `holat (state)`).
- **Primitives only:** use exactly the contracts in AGENTS.md — `CodeBlock` (`lang`, `children`), `Callout` (`type`, `title?`, `children`), `Quiz` (`question`, `options` array with **no duplicate strings**, `correctIndex`, `explanation`), `Exercise` (`title?`, `children`) wrapping `Solution` (`children`), `KeyPoints` (`children` as `<li>`s), `Figure` (`src`, `alt`, `caption?`). Never invent new props or new components. If a lesson seems to need something the primitive set can't do, stop and flag it rather than improvising.
- **Interactivity:** every lesson includes at least one `Quiz` and one `Exercise` + `Solution` pair.
- **Illustrations:** where a diagram genuinely clarifies a mechanism, add a hand-authored inline SVG under `src/assets/`, following the existing `src/assets/loop-flow.svg` pattern exactly — `viewBox`, indigo brand palette (`#4f46e5` stroke/arrows/marker, `#eef2ff` fill, `#312e81` text, `#475569` secondary labels), a `<title id="...">` for accessibility referenced via `aria-labelledby`, sans-serif `font-family`. Import it (`import xyzDiagram from '@/assets/xyz-diagram.svg'`) and render via `<Figure src={xyzDiagram} alt="..." caption="..." />`. Each task below states whether it requires one.
- **Code samples:** realistic JSX, consistent naming within a lesson, Uzbek comments where they clarify output (`//` style, matching the Python lessons' `#` style adapted to JS).
- **Structure:** every lesson file exports `meta = { title, section }` (exact values given per task) and a default function component. Filename and `meta` values are given per task — use them verbatim, they drive the sidebar grouping (`registry.js` groups only *consecutive* lessons sharing `meta.section`).
- **Verification per task:** `npm run build && npm run lint` must both stay clean after each lesson is added. No Playwright/browser testing this pass.
- **Sequencing:** tasks depend on prior lessons' vocabulary (e.g. Task 7 assumes Task 6 already introduced `useState`) — do not reorder or parallelize.

---

## Task 1: Lesson 01 — React nima va nega hooklar

**Files:**
- Create: `src/courses/react/lessons/01-react-nima-va-nega-hooklar.jsx`
- Create (if a diagram helps): an SVG under `src/assets/` for a component-tree or declarative-vs-manual-DOM illustration

**Interfaces:**
- Consumes: nothing (first lesson)
- Produces: introduces the vocabulary "komponent", "deklarativ", "hook" that later lessons assume is already known

**meta:** `{ title: 'React nima va nega hooklar', section: 'Boshlash' }`

**Must cover:**
- What a component is, and why React exists — declarative UI description vs. manually mutating the DOM (a short "before/after" contrast is fine, described in prose/code, not literal vanilla-JS DOM API teaching).
- Function components and hooks as the sole modern approach — state this as simply how React is written today, not as "the new way replacing the old way." Do not mention class components.
- Illustration: a diagram showing a small component tree (e.g. App → Header/List) or a declarative-vs-manual contrast is a good fit here — include one per Global Constraints.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 2: Lesson 02 — JSX asoslari

**Files:**
- Create: `src/courses/react/lessons/02-jsx-asoslari.jsx`

**Interfaces:**
- Consumes: "komponent" vocabulary from Task 1
- Produces: JSX syntax vocabulary (expressions, fragments, `className`) assumed known from here on

**meta:** `{ title: 'JSX asoslari', section: 'Boshlash' }`

**Must cover:**
- JSX syntax basics: it compiles to `React.createElement`-style calls conceptually (brief mention, not a deep compiler dive).
- Embedding JS expressions with `{}`.
- One root element per return / fragments (`<>...</>`).
- Key JSX-vs-HTML differences: `className` instead of `class`, self-closing tags (`<img />`), camelCase attributes.
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 3: Lesson 03 — Funksional komponentlar

**Files:**
- Create: `src/courses/react/lessons/03-funksional-komponentlar.jsx`

**Interfaces:**
- Consumes: JSX vocabulary from Task 2
- Produces: "komponentni chaqirish/joylashtirish" (composing components) vocabulary used from here on

**meta:** `{ title: 'Funksional komponentlar', section: 'Komponentlar va Props' }`

**Must cover:**
- Defining a component as a function that returns JSX.
- PascalCase naming convention and why it matters (React treats lowercase tags as native DOM elements).
- Composing components by nesting them inside other components' JSX.
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 4: Lesson 04 — Props orqali ma'lumot uzatish

**Files:**
- Create: `src/courses/react/lessons/04-props.jsx`
- Create: an SVG under `src/assets/` illustrating props flowing one-way from parent to child

**Interfaces:**
- Consumes: component composition from Task 3
- Produces: "props" vocabulary, "yuqoridan pastga oqim (top-down data flow)" concept used from here on

**meta:** `{ title: "Props orqali ma'lumot uzatish", section: 'Komponentlar va Props' }`

**Must cover:**
- Passing props from parent to child, reading them via the function parameter.
- Destructuring props in the function signature.
- Default prop values.
- Props are read-only (a component must never reassign its own props).
- Illustration required per Global Constraints: a parent→child box-and-arrow diagram showing props flowing one direction.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 5: Lesson 05 — children va composition

**Files:**
- Create: `src/courses/react/lessons/05-children-composition.jsx`

**Interfaces:**
- Consumes: props vocabulary from Task 4
- Produces: `props.children` / composition vocabulary, used implicitly by the capstone (Task 13)

**meta:** `{ title: 'children va composition', section: 'Komponentlar va Props' }`

**Must cover:**
- `props.children` — what it is and how JSX nested inside a component's tags becomes it.
- Using `children` to build a generic wrapper/layout component (e.g. a card or panel).
- Composition-over-configuration framing: prefer nesting components over passing many config props.
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 6: Lesson 06 — useState bilan holat

**Files:**
- Create: `src/courses/react/lessons/06-usestate.jsx`
- Create: an SVG under `src/assets/` illustrating the state-change → re-render cycle

**Interfaces:**
- Consumes: components/props vocabulary from Tasks 3-5
- Produces: `useState`, "holat (state)", "qayta render (re-render)" vocabulary used from here on (Tasks 7, 8, 9, 10, 13 all build UI that holds state)

**meta:** `{ title: 'useState bilan holat', section: 'State va interaktivlik' }`

**Must cover:**
- `useState` basic usage: `const [value, setValue] = useState(initial)`.
- State vs. props: state is owned/changed by the component itself, props come from the parent.
- Calling the setter triggers a re-render; explain this is *why* the UI updates.
- Never mutate state directly (e.g. don't push into a state array in place) — always call the setter with a new value.
- Illustration required per Global Constraints: a cycle diagram (event → setState call → re-render → new UI).
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 7: Lesson 07 — Voqealarni boshqarish

**Files:**
- Create: `src/courses/react/lessons/07-event-handling.jsx`

**Interfaces:**
- Consumes: `useState` from Task 6
- Produces: event-handler vocabulary used by Task 8 (forms) and Task 13 (capstone)

**meta:** `{ title: 'Voqealarni boshqarish', section: 'State va interaktivlik' }`

**Must cover:**
- Attaching handlers: `onClick`, `onChange`, etc.
- Passing a function reference vs. calling it immediately (`onClick={handleClick}` vs. the `onClick={handleClick()}` pitfall).
- The event object (e.g. reading `e.target.value`).
- Combining an event handler with `useState` from Task 6 to make something interactive (e.g. a counter).
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 8: Lesson 08 — Formalar (controlled inputs)

**Files:**
- Create: `src/courses/react/lessons/08-formalar.jsx`

**Interfaces:**
- Consumes: `useState` (Task 6) + event handling (Task 7)
- Produces: "boshqariladigan input (controlled input)" vocabulary used by the capstone (Task 13)

**meta:** `{ title: 'Formalar (controlled inputs)', section: 'State va interaktivlik' }`

**Must cover:**
- Controlled `<input>`: `value` bound to state, `onChange` updates that state.
- Controlled `<textarea>`, `<select>`, and a checkbox (`checked`/`onChange`).
- Handling submission: `onSubmit` on the `<form>` and `e.preventDefault()`.
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 9: Lesson 09 — Ro'yxatlarni render qilish

**Files:**
- Create: `src/courses/react/lessons/09-royxatlar-va-key.jsx`
- Create: an SVG under `src/assets/` illustrating an array mapping to a list of elements with keys

**Interfaces:**
- Consumes: `useState` (Task 6)
- Produces: `.map()`-to-JSX + `key` vocabulary used by the capstone (Task 13)

**meta:** `{ title: "Ro'yxatlarni render qilish", section: "Ro'yxat va shartli render" }`

**Must cover:**
- Rendering a list with `.map()` returning JSX elements.
- Why `key` is required (React's reconciliation needs a stable identity per item) and what breaks without one (console warning, and reordering/animation bugs — explain conceptually).
- Picking a stable key (an item id) rather than the array index, and when index is acceptable (static lists that never reorder).
- Illustration required per Global Constraints: array items mapping to list elements, each tagged with its key.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 10: Lesson 10 — Shartli render

**Files:**
- Create: `src/courses/react/lessons/10-shartli-render.jsx`

**Interfaces:**
- Consumes: `useState` (Task 6)
- Produces: conditional-rendering vocabulary used by the capstone (Task 13, empty-state handling)

**meta:** `{ title: 'Shartli render', section: "Ro'yxat va shartli render" }`

**Must cover:**
- `&&` for "render this or nothing" (and the falsy-zero pitfall: `count && <p>...</p>` rendering a stray `0`).
- Ternary for "render one of two things."
- Early `return null` (or an early-return branch) for a whole component.
- Guidance on when to prefer each.
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 11: Lesson 11 — useEffect asoslari

**Files:**
- Create: `src/courses/react/lessons/11-useeffect.jsx`
- Create: an SVG under `src/assets/` illustrating render → paint → effect timing

**Interfaces:**
- Consumes: `useState` (Task 6)
- Produces: `useEffect` vocabulary (not directly required by the capstone, but part of the fundamentals track)

**meta:** `{ title: 'useEffect asoslari', section: 'Effektlar' }`

**Must cover:**
- Side effects vs. rendering — why some logic (subscriptions, timers, syncing with something outside React) doesn't belong in the render body.
- The dependency array: no array (every render), `[]` (once, on mount), `[dep]` (when `dep` changes).
- The cleanup function (return a function from the effect) and why it matters (e.g. clearing an interval/subscription).
- Common pitfall: missing a dependency and the bug that causes (stale value captured in the closure).
- Illustration required per Global Constraints: a timing diagram showing render → screen paint → effect runs.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 12: Lesson 12 — useRef asoslari

**Files:**
- Create: `src/courses/react/lessons/12-useref.jsx`

**Interfaces:**
- Consumes: `useState` (Task 6), `useEffect` (Task 11, for the DOM-access-after-mount example)
- Produces: `useRef` vocabulary (fundamentals-track completeness; not required by the capstone)

**meta:** `{ title: 'useRef asoslari', section: 'Effektlar' }`

**Must cover:**
- `useRef` for direct DOM access (e.g. focusing an `<input>` on mount).
- `useRef` for a mutable value that persists across renders without triggering a re-render (contrast directly with `useState`).
- Explicit guidance on when *not* to reach for a ref: if a value should show up in the UI, it belongs in state, not a ref.
- No illustration required unless genuinely useful.
- End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution`.

---

## Task 13: Lesson 13 — Yakuniy loyiha: Vazifalar ro'yxati (capstone)

**Files:**
- Create: `src/courses/react/lessons/13-yakuniy-loyiha.jsx`
- Create: an SVG under `src/assets/` illustrating the capstone app's overall data flow

**Interfaces:**
- Consumes: `useState` (6), event handling (7), controlled forms (8), lists+key (9), conditional rendering (10) — this lesson is the integration point for the whole fundamentals track
- Produces: nothing further (last lesson)

**meta:** `{ title: "Yakuniy loyiha: Vazifalar ro'yxati", section: 'Amaliy loyiha' }`

**Must cover:**
- A complete to-do list app built up in the lesson, combining: `useState` for the task list, a controlled text input for adding a task, `onSubmit` handling, `.map()` with `key` to render the list, a way to remove/toggle a task (event handling on each item), and conditional rendering for an empty-list state ("Hali vazifalar yo'q" or similar).
- Walk through the app incrementally (add state → add input → add render list → add remove/toggle → add empty state) rather than dropping the whole final component at once, so each piece connects back to the lesson that taught it.
- Illustration required per Global Constraints: a data-flow diagram for the finished app (state → list render → user action → state update loop).
- This lesson replaces the standalone `Exercise`+`Solution` requirement with the capstone itself being the exercise — still include a final `KeyPoints` summarizing the whole fundamentals track's key takeaways, and at least one `Quiz` testing understanding of the assembled app.

---

## Final check

After Task 13's review is clean, do a full-course build: `npm run build && npm run lint`, then confirm in the rendered registry data (or a quick `npm run dev` skim, per AGENTS.md — browser check is optional per this plan's "no Playwright" instruction, but at minimum verify the 13 lessons appear in order under the right section groupings via `getGroupedLessons` — e.g. a short Node/vitest-free script or manual trace through `registry.js` is enough, a full browser session is not required).
