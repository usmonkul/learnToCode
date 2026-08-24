# Organic Redesign — Design

**Date:** 2026-08-24
**Status:** Approved

## Purpose

Re-skin the entire app to match the "Organic" design system and 8-screen mockup approved in Claude Design (project `4ddbf611-2124-419f-ae8e-acf5d5ae1db1`, file `Darsliklar - Redesign.dc.html`). This is a visual re-theme only — no route, data, or behavior changes. Every existing page keeps doing exactly what it does today; it just looks different: a warm terracotta/olive palette instead of indigo, Caprasimo (display) + Figtree (body) instead of the system font stack, and a softer, rounder, more pill-shaped component language.

Source of truth for exact values: the mockup's own `styles.css` (design tokens + component classes) and the 8 screens (`A` Asosiy/Home, `B` Kurslar/Courses, `B2` Kurs sahifasi/Course detail, `C` Dars/Lesson, `D` Arena, `E` Profil, `F` Kirish/Login, `G` Qorong'i mavzu/Dark theme). All are saved locally at `/private/tmp/claude-501/-Users-khakimusmon-Desktop-Study-Course-books/78a2bbe8-c625-4ee1-8a2a-bca066f53310/scratchpad/redesign/` (`styles.css`, `screen-01-Asosiy.html` … `screen-08-Qorongi-mavzu.html`) for the implementation plan to reference verbatim — this spec fixes the *mapping decisions*, the mockup files fix the *exact markup/values*.

## Scope

**In scope:** every existing route's visual presentation — `HomePage`, `CoursesPage`+`CourseCard`, `CourseOverviewPage`, `LessonPage`+`Sidebar`+`LessonNav`, all content primitives (`Callout`, `Quiz`, `Exercise`, `Solution`, `KeyPoints`, `Figure`, `Disclosure`, `Avatar`), `ArenaPage`, `ArenaTopicPage`+`ChallengeList`+`ChallengeDetail`, `SqlPlayground`, `ProfilePage`, `LoginPage`, `TopNav`+`UserMenu`+`ThemeToggle`, and a **new** `Footer` component (homepage-only — the mockup shows a footer only on screen A; no other screen has one, and the user confirmed homepage-only over site-wide). `NotFoundPage` isn't in any mockup screen but gets the same button/shape treatment for consistency (low-risk, two elements).

**Out of scope:** `AuthCallbackPage` (no visible UI, just a loading transition — nothing to reskin). Any new feature, new route, or behavior change. Lesson *content* (prose, exercises, quiz questions) — only the primitives that render it.

## Design tokens (`src/index.css`)

Same token *names* the app already uses (`--color-brand-*`, `--color-canvas`, `--color-canvas-muted`, `--color-line`, `--color-ink`, `--color-ink-muted`) get new values, plus one new scale (`--color-brand2-*`, for Organic's second accent hue) and two new font tokens. Because color is token-driven everywhere already, this alone re-colors the whole app with zero per-component edits — only *shape* (radius) needs per-component changes, covered below.

### Colors — light (`@theme` root)

| Token | Value | Source |
|---|---|---|
| `--color-brand-50` | `#fff8f4` | synthesized (lighter than accent-100) |
| `--color-brand-100` | `#fff2eb` | Organic `--color-accent-100` |
| `--color-brand-200` | `#ffe1d0` | `--color-accent-200` |
| `--color-brand-300` | `#ffc6a5` | `--color-accent-300` |
| `--color-brand-400` | `#f6a06b` | `--color-accent-400` |
| `--color-brand-500` | `#d67f48` | `--color-accent-500` |
| `--color-brand-600` | `#c67139` | Organic's literal `--color-accent` (not the ramp's own 600 step) — this is the exact hex `.btn-primary` uses, and `bg-brand-600`/`text-brand-600` is this app's most-used "primary" step (every CTA, every active nav link, every icon accent), so it gets pixel-fidelity over ramp consistency |
| `--color-brand-700` | `#8c491a` | `--color-accent-700` |
| `--color-brand-800` | `#643312` | `--color-accent-800` |
| `--color-brand-900` | `#402310` | `--color-accent-900` |
| `--color-brand-950` | `#2a1509` | synthesized (darker than accent-900) |
| `--color-brand2-50` | `#f7fdf0` | synthesized |
| `--color-brand2-100` | `#f0fae1` | Organic `--color-accent-2-100` |
| `--color-brand2-200` | `#e1eecc` | `--color-accent-2-200` |
| `--color-brand2-300` | `#ccdbb2` | `--color-accent-2-300` |
| `--color-brand2-400` | `#aebf92` | `--color-accent-2-400` |
| `--color-brand2-500` | `#8fa073` | `--color-accent-2-500` |
| `--color-brand2-600` | `#7a8a5e` | literal `--color-accent-2` (same fidelity reasoning as brand-600) |
| `--color-brand2-700` | `#56633f` | `--color-accent-2-700` |
| `--color-brand2-800` | `#3d472b` | `--color-accent-2-800` |
| `--color-brand2-900` | `#272e1b` | `--color-accent-2-900` |
| `--color-brand2-950` | `#1a1f11` | synthesized |
| `--color-canvas` | `#ebddc5` | Organic `--color-surface` (cards/panels) |
| `--color-canvas-muted` | `#f5ead8` | Organic `--color-bg` (page background) |
| `--color-line` | `color-mix(in srgb, #201e1d 16%, transparent)` | Organic `--color-divider` |
| `--color-ink` | `#201e1d` | Organic `--color-text` |
| `--color-ink-muted` | `#6b6358` | flat approximation of `color-mix(in srgb, var(--color-text) 65%, transparent)` over the new light background — matches this file's existing pattern of flat hex values, not a live `color-mix` |

### Colors — dark (`[data-theme='dark']`, values from screen G's inline override)

| Token | Value |
|---|---|
| `--color-canvas` | `#474238` |
| `--color-canvas-muted` | `#2e2b25` |
| `--color-line` | `color-mix(in srgb, #f9f4ed 18%, transparent)` |
| `--color-ink` | `#f9f4ed` |
| `--color-ink-muted` | `#a89f92` |

`--color-brand-*`/`--color-brand2-*` do **not** get dark overrides at the token level. Dark-mode adaptation for these already happens per-component today via manual `dark:` variants that pick a different ramp step for dark backgrounds (e.g. `TopNav.jsx`'s active link is `text-brand-700 dark:text-brand-300` — a deep step for the light background, a light step for the dark one) — this pattern carries over unchanged once the ramp's hex values are swapped, exactly like it already does for the current indigo ramp. Screen G's dark-mode primary button uses `#f6a06b`, which lands almost exactly on the new `--color-brand-400` — confirming a lighter ramp step is the right choice for dark-mode emphasis, consistent with the existing per-component pattern rather than a new requirement to satisfy.

### Fonts

Add to the top of `src/index.css`, before `@theme`:
```css
@import url('https://fonts.googleapis.com/css2?family=Caprasimo&family=Figtree:wght@400;600;700&display=swap');
```
Add to `@theme`:
```css
--font-heading: "Caprasimo", system-ui, sans-serif;
--font-body: "Figtree", system-ui, sans-serif;
```
Apply `font-family: var(--font-body)` on `body` (replacing the implicit system stack) and `font-family: var(--font-heading)` on every `h1`–`h3` used as a page/section title — done per-component via a `font-heading` Tailwind arbitrary utility (`className="font-[var(--font-heading)]"`) or, more simply, a small global rule in `index.css`:
```css
h1, h2, h3 { font-family: var(--font-heading); font-weight: 400; }
```
This matches the mockup's own `styles.css` (`h1,h2,h3,h4,h5,h6 { font-family: var(--font-heading); font-weight: var(--font-heading-weight) }`) and means no per-component font className changes are needed for headings — only body text that should stay `--font-body` (already the default) needs nothing at all.

## Shape convention (no new tokens — direct utility classes per element, since redefining Tailwind's built-in `rounded-*` scale would silently change every existing `rounded-*` usage sitewide, including ones this redesign doesn't touch)

Applied consistently by every task below:

- **Buttons, tags/badges/chips, pills, nav links, segmented control, form inputs, avatar/icon circles** → `rounded-full`
- **Cards** (CourseCard, challenge-list rows, profile stat tiles, Callout/Exercise/KeyPoints/Quiz boxes, login form) → `rounded-3xl` (Tailwind's built-in 24px step — close to the mockup's ~32px `.card` radius, no arbitrary value needed)
- **Large page-level sections** (hero image frame, "Qanday ishlaydi" band, CTA banner, the page-frame wrapper around each mockup screen) → `rounded-[40px]` matching the mockup's literal inline values, since these are few enough per page that an arbitrary value is fine
- **Small inline elements that were never rounded before** (table cells, dividers) stay unrounded

## Component → mockup mapping

| Component/page | Mockup screen(s) | Notes |
|---|---|---|
| `src/index.css` | `styles.css` (tokens) | Task 1 |
| `TopNav.jsx`, `UserMenu.jsx`, `ThemeToggle.jsx` | every screen's `<header class="o-nav">` | pill nav links, circular icon-badge brand mark, streak chip + avatar pattern from screens B–G |
| `Callout.jsx`, `Quiz.jsx`, `Exercise.jsx`, `Solution.jsx`, `KeyPoints.jsx`, `Figure.jsx`, `Disclosure.jsx`, `Avatar.jsx` | not directly mocked (no lesson-content screen shows them), reskin via the shape convention + existing semantic hue families (unchanged — see below) | `.card`/`.tag`/pill button classes from `styles.css` are the reference even without a literal screen |
| `HomePage.jsx` + new `Footer.jsx` | screen A (`Asosiy`) | hero, "Qanday ishlaydi" 3-step band, 6-course grid, testimonials, CTA banner, footer |
| `CoursesPage.jsx`, `CourseCard.jsx` | screen B (`Kurslar`) | segmented filter control is decorative only (no filtering logic exists today — render it inert, `Hammasi` selected, not wired to state; this is a visual-only port, not a new feature) |
| `CourseOverviewPage.jsx` | screen B2 (`Kurs sahifasi`) | progress bar, "kurs tarkibi" side panel, pill lesson rows |
| `LessonPage.jsx`, `Sidebar.jsx`, `LessonNav.jsx` | screen C (`Dars`) | pill sidebar rows, checkmark-in-circle completed state |
| `ArenaPage.jsx` | (topic grid — closest analog is screen B's card grid; no dedicated topic-grid screen exists) | apply the same card treatment as `CourseCard` |
| `ArenaTopicPage.jsx`, `ChallengeList.jsx`, `ChallengeDetail.jsx`, `SqlPlayground.jsx` | screen D (`Arena`) | dark code-editor panel (`--color-neutral-900`) is intentional per the mockup regardless of light/dark site theme — same visual treatment `SqlPlayground` already has today (its result table stays on `--color-canvas`, only the editor chrome goes dark) |
| `ProfilePage.jsx` | screen E (`Profil`) | 3 stat tiles (streak/longest-streak/completed), pill progress rows |
| `LoginPage.jsx` | screen F (`Kirish`) | split-screen retained; right panel becomes solid `--color-brand-800` (was a brand gradient) with a decorative circle, segmented sign-in/sign-up control restyled to pill |
| `NotFoundPage.jsx` | none | apply button/shape convention only, no layout change |
| dark mode everywhere | screen G (`Qorong'i mavzu`) | proves the token-only approach — G shows only the home hero re-themed, confirming the same component markup works in dark mode via token overrides alone |

## Non-goals

- No new functionality: the courses-page segmented filter control renders but does not filter (matches "reskin only, no behavior changes").
- No change to `RequireAuth`, routing, Supabase wiring, the SQL sandbox engine, or any store.
- No change to lesson *content* — only the primitives/pages that render it.
- Footer is homepage-only, not site-wide (explicit user decision — see "Scope").
- Callout/Quiz/SqlPlayground's existing semantic status colors (emerald=tip/correct, amber=warning, red=danger/wrong, blue-ish `brand`=note) are **not** remapped to the new `brand`/`brand2` hues — the mockup never redefines these semantics, so touching them would be scope creep beyond "reskin to match the mockup." Only their *shape* changes (pill/rounded-3xl per the shape convention).
