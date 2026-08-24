# AGENTS.md

Instructions for any AI coding tool (Claude Code, Cursor, Copilot, etc.) working in this repo. Follow this file's conventions over your own defaults.

## What this is

A programming tutorial platform. Students pick a course and read lessons. Lessons are plain JSX files composed from a small library of **content primitives**. There is no CMS and no database for *content* — the filesystem *is* the content, and Vite's `import.meta.glob` discovers it at build time through `src/courses/registry.js`. Students can create an account (Supabase Auth) to track which lessons they've completed and keep a day-streak — see "Auth & progress" below. Course content itself stays filesystem-driven either way. Signed-in students can also practice in **Arena** (`/arena`) — self-checked challenges, filesystem-driven the same way courses are (see "The arena registry contract" below), currently one topic (SQL) with a live query sandbox.

**The one idea that drives every folder-structure and component decision here: adding a lesson is one file, and adding a course is one folder.** Never reintroduce a hand-maintained index of lessons/courses — that's exactly what the registry exists to avoid.

## Tech stack — do not add competing libraries

React 19, Vite, React Router 7, Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`), Zustand 5, lucide-react (icons), `prism-react-renderer` (code highlighting), `@tailwindcss/typography` (prose), `clsx` + `tailwind-merge` (via the `cn()` helper), `@supabase/supabase-js` (auth + progress tracking — see "Auth & progress" below). Plain JavaScript `.jsx` files — **no TypeScript**, despite `@types/react`/`@types/react-dom` being present (editor intellisense only; there is no `tsconfig.json` and no `.tsx` file anywhere). See `package.json` for exact versions.

One scoped exception: `sql.js` (WASM SQLite, runs entirely client-side) backs the `SqlPlayground` primitive used by the SQL course and the SQL Arena topic — see that primitive's row below and `src/lib/sqlEngine.js`. Don't reach for it, or any other execution engine, outside that one documented use.

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
  arena/
    registry.js              # same import.meta.glob pattern as courses/registry.js, for practice challenges — see "The arena registry contract" below
    <topic-id>/
      topic.meta.js            # { title, icon, description, hasSandbox }
      challenges/
        01-<slug>.js             # default export = { title, difficulty, prompt, starterQuery, solutionQuery }
  components/
    content/                # primitives lesson (and challenge) authors use directly: CodeBlock, Callout, Quiz, Exercise, Solution, KeyPoints, Figure, SqlPlayground
    arena/                   # ArenaTopicPage-only: ChallengeList (left pane), ChallengeDetail (prompt + expected-result, nested inside the active list item)
    layout/                  # page chrome: TopNav (site nav + auth), Footer (homepage only), Sidebar, LessonNav, Breadcrumbs, CourseCard, UserMenu, ThemeToggle
    ui/                     # generic internals shared by the above (Disclosure, Avatar)
    auth/RequireAuth.jsx     # route guard — redirects signed-out visitors to /login?redirect=<path>
  pages/                   # one file per route: HomePage (landing, "/"), CoursesPage ("/kurslar"), ArenaPage ("/arena", auth-gated),
                            # ArenaTopicPage ("/arena/:topicId" and "/arena/:topicId/:challengeSlug", auth-gated),
                            # ProfilePage ("/profile", auth-gated), CourseOverviewPage, LessonPage, LoginPage ("/login"),
                            # AuthCallbackPage, NotFoundPage
  store/
    uiStore.js               # zustand — UI-only state (mobile sidebar open/closed), nothing else
    themeStore.js            # zustand — light/dark/system preference (see Dark mode below)
    authStore.js             # zustand — thin mirror of supabase-js's auth session (see Auth & progress below)
    progressStore.js         # zustand — lesson completions + streak, fetched from Supabase per session
  lib/
    cn.js                   # clsx + tailwind-merge classname helper — use this, never string-concat classNames
    courseIcons.js            # resolveCourseIcon(iconName) — the ICONS lookup, shared by CourseCard and HomePage (see the "runtime string" rule below)
    sqlEngine.js               # memoized sql.js/WASM loader — see SqlPlayground below
    supabaseClient.js        # singleton Supabase client
  App.jsx                  # route table + RootLayout (TopNav + scroll/sidebar reset on navigation)
supabase/
  migrations/               # versioned SQL — the source of truth for the Postgres schema, not the dashboard
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

## The arena registry contract (`src/arena/registry.js`)

"Arena" is the practice-challenges area at `/arena` — topics (currently just `sql`) each holding a list of self-checked challenges. It mirrors the courses registry's filesystem-driven design on purpose: same `import.meta.glob` discovery, same zero-padded-prefix ordering rule, same "adding one is one file" principle. Read `src/courses/registry.js`'s notes above first; only what differs is called out here:

- A challenge's `slug` is derived from its filename the same way a lesson's is (numeric prefix and `.js` stripped).
- `topic.meta.js` sets `hasSandbox: true` to opt a topic into rendering a live `SqlPlayground` next to its challenge list (`ArenaTopicPage.jsx` checks this flag) — a topic without a runnable sandbox (a future non-SQL topic) would omit it or set it `false`.
- A challenge has no stored "expected result" — `ChallengeDetail.jsx` computes it live by running `solutionQuery` against a fresh in-memory database on mount. There is no automated grading; self-checking against that computed table is the entire mechanism. Don't add a diffing/grading layer without an explicit ask.
- Exported API: `getTopics()`, `getTopic(topicId)`, `getChallenges(topicId)`, `getChallenge(topicId, slug)`.

## Content primitives — use these exact contracts, don't invent new props

All live in `src/components/content/`. Prose itself needs no component: lesson files write plain semantic HTML (`<p>`, `<h2>`, `<ul>`, `<strong>`, `<blockquote>`) and `LessonPage` wraps the rendered lesson in `@tailwindcss/typography`'s `.prose` class for free. Reach for a primitive only for what HTML alone can't do:

| Component | Props | Notes |
|---|---|---|
| `CodeBlock` | `lang` (string, e.g. `"python"`), `children` (a template-string code sample) | Static, syntax-highlighted, has a copy button. Never make this editable/runnable — live code execution is explicitly out of scope. |
| `Callout` | `type` (`"tip"` \| `"note"` \| `"warning"` \| `"danger"`), `title` (optional), `children` | Colored box with an icon per type. |
| `Quiz` | `question`, `options` (string array, **no duplicates within one Quiz** — array items double as React keys), `correctIndex`, `explanation` | Local `useState` only. Progress tracking is scoped to lesson completion (see "Auth & progress" below) — don't wire individual quiz answers to Supabase or any other persistence. |
| `Exercise` | `title` (defaults to `"Mashq"`), `children` | Prompt box; typically wraps a `<Solution>`. |
| `Solution` | `children` | Collapsible "Yechimni ko'rsatish", built on `ui/Disclosure`. |
| `KeyPoints` | `children` (`<li>` elements) | Bulleted summary box, usually at a lesson's end. |
| `Figure` | `src`, `alt` (defaults to `''`, but always pass a real one), `caption` (optional) | Image + caption. |
| `SqlPlayground` | `schema` (SQL string: `CREATE TABLE`/`INSERT` statements that seed a fresh in-memory SQLite database on mount), `initialQuery` (optional starter query) | The **one, deliberate exception** to "no live code execution" — runs real queries client-side via `sql.js`/WASM (see `src/lib/sqlEngine.js`, a memoized loader shared across instances so the ~700KB engine is fetched once, lazily, only when a playground actually mounts). Each instance owns an isolated, ephemeral database; a "Qayta tiklash" button re-seeds it from `schema`. Used in two places: SQL-course lesson bodies, and `ArenaTopicPage.jsx`'s live sandbox pane for `sql`-topic challenges. Both are still "the SQL course/topic" — don't reuse this pattern for any other language's "run my code" impulse without an explicit ask. Its editor chrome (`bg-neutral-900`/`text-neutral-*`) is a deliberate, permanently-dark exception to the token system below — a code editor reads as dark chrome regardless of site theme, so it does not use `bg-canvas`/`text-ink` and needs no `dark:` variants; the result table beneath it switches back to normal tokens. |

The canonical primary-CTA button/link — `rounded-full bg-brand-600 px-{n} py-{n} text-sm font-semibold text-canvas-muted hover:bg-brand-700` — now repeats verbatim across half a dozen files (`HomePage`, `CourseOverviewPage`, `NotFoundPage`, `LoginPage`, `UserMenu`, `Footer`'s brand-icon badge). It has already crossed the old "extract at the third occurrence" threshold below; the working choice so far has been to keep copying the exact class string rather than add a `ui/Button`. When adding a new primary CTA, copy that string exactly rather than approximating it — and if you're the one who finally extracts it into `ui/Button`, that's a real refactor with its own review, not a drive-by while doing something else.

Don't add `ui/Badge` or `ui/IconButton` speculatively — dropped from an earlier draft of this architecture because nothing needed them. Same rule as above: a second occurrence of new shared styling is a coincidence, a third is a pattern worth naming.

## Styling

Tailwind v4, CSS-first config in `src/index.css` (`@import "tailwindcss"`, a Google Fonts `@import` — must stay ordered before `@plugin`/`@theme`, since CSS requires `@import` rules to precede everything but `@charset`, `@plugin "@tailwindcss/typography"`, an `@theme` block). This is the "Organic" identity (warm terracotta + olive, replacing an earlier indigo theme) — use the existing design tokens instead of raw hex or ad-hoc Tailwind colors:

- `bg-brand-{50..950}` / `text-brand-*` / `border-brand-*` — warm terracotta/orange, the primary brand scale (main CTAs, links, Home/Courses accents)
- `bg-brand2-{50..950}` / `text-brand2-*` / `border-brand2-*` — olive/moss green, the secondary accent scale, used where a page deliberately wants visual distinction from the primary scale (e.g. Arena's icon badges and "easy"-difficulty chips vs. `brand`'s "medium"-difficulty chips) — don't reach for `brand2` just for variety; it signals a specific section or state
- `bg-canvas` / `bg-canvas-muted` / `border-line` — surfaces (canvas is the lighter of the two; canvas-muted is the page background)
- `text-ink` (primary text) / `text-ink-muted` (secondary text)
- `font-heading` (Caprasimo, a display serif — headings and other intentionally-branded text) / `font-body` (Figtree — the default; `body` already sets this, so most elements need no explicit `font-body`)

A CSS **comment must never contain a literal `*/` substring** anywhere inside it (e.g. writing `--color-brand-*/--color-brand2-*` inline) — `*/` closes the comment early regardless of intent, silently corrupting whatever CSS follows. Write `* /` (a space before the slash) or rephrase.

**Never build a Tailwind class from a runtime string** (e.g. `` `bg-${course.color}-50` ``) — Tailwind's compiler only picks up classes it can see as literal text in source, so a templated class silently renders unstyled. If a value needs to control color, map it through a static lookup object instead (see `src/lib/courseIcons.js`'s `resolveCourseIcon` for the pattern with icons, shared by `CourseCard` and `HomePage`).

Use `cn()` from `@/lib/cn` for any conditional/variant classNames — never string-concatenate or use bare template literals for classes.

### Dark mode

The app supports light/dark/system, toggled from `ThemeToggle` in `TopNav`. How it works, so you don't have to reverse-engineer it:

- **Selector**: Tailwind's `dark:` variant is remapped in `src/index.css` via `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));` — it matches on a `data-theme="dark"` attribute on `<html>`, not the default `prefers-color-scheme` media query. This is what makes a manual light/dark/system toggle possible (a pure media-query variant can't be manually overridden).
- **State**: `src/store/themeStore.js` (zustand) holds `preference` (`'light' | 'dark' | 'system'`) and the resolved `resolvedTheme` (`'light' | 'dark'`). It resolves `'system'` via `matchMedia('(prefers-color-scheme: dark)')`, live-updates on OS theme changes when `preference === 'system'`, and is the one deliberate exception to "no localStorage" (see Non-goals) — it persists `preference` manually (`localStorage.getItem`/`setItem` inside the store's own logic, **not** zustand's `persist` middleware, which stays off-limits). `index.html` has a small inline blocking script that reads the same localStorage key before first paint, so there's no flash of the wrong theme on load.
- **Tokens vs. `dark:` utilities — two different mechanisms, use the right one**:
  - The semantic tokens (`bg-canvas`, `bg-canvas-muted`, `border-line`, `text-ink`, `text-ink-muted`) are CSS custom properties, redefined once under `[data-theme='dark']` in `src/index.css`. Any component using these tokens adapts automatically — **no `dark:` classes needed**, and none should be added for these.
  - Anywhere a component reaches for a raw Tailwind color instead of a token (status colors in `Callout`/`Quiz`/`SqlPlayground` — `emerald`/`amber`/`red` — or a `bg-brand-*`/`bg-brand2-*` light chip like `CourseCard`'s icon badge, a difficulty pill, or a lesson's flowchart box), add an explicit `dark:` variant by hand. `--color-brand-950`/`--color-brand2-950` tokens exist in `@theme` specifically for these light-chip-on-dark-background cases. The binding pairing rule, by shape:
    - **A small chip/badge/circle** (icon badge, pill, tag) using `bg-brand-100..300 text-brand-700..900` gets `dark:bg-brand-950 dark:text-brand-400` (swap `brand`→`brand2` for the secondary scale).
    - **A large colored section background** (a full-width band, a card) gets `dark:bg-brand-900` or `dark:bg-brand2-950` — a deeper step than the chip case, since it covers more area.
    - **A standalone kicker/label/link** with brand-colored text but no background gets `dark:text-brand-300` (or `dark:text-brand2-300`).
    - **A bare icon with no background of its own** does not need a `dark:` variant — it inherits legibility from its container.
    - This is the single most common review finding across the redesign work: new brand/brand2 usage shipping with no dark pairing at all. Check for it every time you add one.
  - `LessonPage` adds `dark:prose-invert` next to `prose prose-slate` so plain lesson prose (headings, paragraphs, lists, `<code>`) inverts for free via `@tailwindcss/typography`.
  - `CodeBlock` reads `resolvedTheme` from `themeStore` and swaps the `prism-react-renderer` theme between `themes.oneLight` and `themes.oneDark` — this can't be done via CSS since prism applies inline styles, hence the JS-level dependency on the store.
  - `SqlPlayground`'s editor chrome is the one deliberate exception: permanently dark (`bg-neutral-900`), independent of `data-theme`, with no `dark:` classes at all — see the content-primitives table above.

### Auth & progress

Supabase provides authentication (email/password, Google, GitHub) and the Postgres backing store for lesson completions and streaks. How it works, so you don't have to reverse-engineer it:

- **Env vars**: `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`, read via `import.meta.env` in `src/lib/supabaseClient.js`. Vite bakes `VITE_`-prefixed vars into the bundle **at build time** — `wrangler.jsonc` only serves static assets (no Worker `vars` block), so these must be present in whatever shell runs `npm run build`, locally or in CI, before `wrangler deploy`. See `.env.example`.
- **Auth state**: `src/store/authStore.js` mirrors `supabase.auth.onAuthStateChange` into a zustand store (`session`, `user`, `status: 'loading' | 'signedIn' | 'signedOut'`). It does **not** use `persist` — `supabase-js` already persists its own session to `localStorage`.
- **Progress state**: `src/store/progressStore.js` fetches a signed-in student's `lesson_completions` and `streaks` rows once (on sign-in), then updates optimistically through `markComplete`/`markIncomplete`. Keys are `courseId`/`lesson_slug` from `registry.js` directly — no separate "lessons" table in Postgres.
- **Schema**: `supabase/migrations/*.sql` is the source of truth for the Postgres schema (`profiles`, `lesson_completions`, `streaks`, plus the streak-maintaining trigger and `recompute_streak()` repair function) — apply changes via `supabase db push`, never hand-edit the schema in the dashboard.
- **RLS is mandatory** on every table here. `streaks` in particular has no client-writable policy at all — it's written only by a `SECURITY DEFINER` trigger, so a student can never PATCH their own streak directly.
- **Login UI**: a dedicated route, `/login` (`src/pages/LoginPage.jsx`) — email/password form plus Google/GitHub buttons, not a modal. It reads a `?redirect=<path>` query param and, after a successful sign-in, navigates there (default `/`). `/auth/callback` (`src/pages/AuthCallbackPage.jsx`) exists only to show a brief loading state while `supabase-js` finishes parsing the OAuth redirect, then reads the same `?redirect=` param (round-tripped through `signInWithOAuth`'s `redirectTo` URL, since a full-page OAuth redirect loses any React Router `location.state`) and navigates there; Cloudflare's SPA fallback means neither route needs anything server-side.
- **Protected routes**: `src/components/auth/RequireAuth.jsx` is a layout route — wrap any route that needs a signed-in user with it (see `/arena` and `/profile` in `App.jsx`) and it redirects signed-out visitors to `/login?redirect=<the path they tried>`. A component-level action that needs auth without a full route guard (e.g. `LessonPage`'s mark-complete button) just checks `authStore`'s `status` itself and `navigate()`s to the same `/login?redirect=...` pattern by hand.
- **Display name & avatar**: `getDisplayName(user)` / `getAvatarUrl(user)` in `authStore.js` read `user.user_metadata`, falling back across the different fields Google/GitHub/email-password populate (`full_name`, `name`, `user_name`, then the email's local part). `src/components/ui/Avatar.jsx` renders the photo when `getAvatarUrl` returns one, silently falling back to an initials badge on a missing URL *or* a failed image load (`onError`) — never assume a provider's avatar URL stays reachable. Used in `UserMenu` (small, links to `/profile`) and `ProfilePage` (large).

## Language

Lesson prose and all UI chrome (buttons, nav labels, headings) are written in **Uzbek**. Code, language keywords, and technical terms stay in English; add a bracketed Uzbek translation inline where it helps a beginner (`o'zgaruvchi (variable)`). This is a fixed content convention, not an i18n system — there's no language switcher and there shouldn't be one.

## Non-goals — do not add these without being explicitly asked

Authentication and progress tracking exist now (Supabase-backed, see "Auth & progress" below) — scoped narrowly to sign-in and lesson-completion/streak tracking. The Arena practice-challenges area also exists now (see "The arena registry contract" above) — scoped narrowly to challenge-list-plus-sandbox self-checking, SQL only. Still out of scope without an explicit ask: no admin panel or course-authoring UI (content stays filesystem-driven via the registries, auth doesn't change that), no user profile/settings page beyond what's needed for sign-in, no tracking of anything besides lesson completions (see the `Quiz` primitive note above) or challenge attempts (Arena has no submission history — every visit re-runs `solutionQuery` fresh), no automated grading/diffing on Arena challenges (self-check against the computed expected result is the whole mechanism), no `persist` middleware on any zustand store beyond the two existing manual-`localStorage` exceptions (`themeStore.js`'s preference, see Styling → Dark mode; `supabase-js`'s own session persistence, which `authStore.js` merely mirrors). `uiStore.js` itself stays ephemeral (mobile-sidebar-open state only). No live/editable code execution, **except** `SqlPlayground` (see Content primitives above) — a one-time, explicitly-approved exception for SQL lessons and the SQL Arena topic, not a precedent for adding one to every language or every Arena topic. No TypeScript. No automated test runner.

## Adding a new lesson

1. Create `src/courses/<course-id>/lessons/NN-<slug>.jsx` with the next zero-padded number.
2. Export `meta = { title: '...', section: '...' }` and a default component composing prose + content primitives.
3. Nothing else needs to change — the registry picks it up automatically.

## Adding a new course

1. Create `src/courses/<course-id>/course.meta.js` exporting `{ title, description, icon }` (`icon` is a string name resolved through `src/lib/courseIcons.js`'s `resolveCourseIcon` — add the lucide-react icon there if it's a new one).
2. Add `src/courses/<course-id>/lessons/01-....jsx` (and more) following the lesson recipe above.
3. It appears on the home page automatically — no route, page, or nav code to touch.

## Adding an Arena challenge (or topic)

1. To add a challenge to the existing `sql` topic: create `src/arena/sql/challenges/NN-<slug>.js` with the next zero-padded number, default-exporting `{ title, difficulty: 'easy' | 'medium' | 'hard', prompt, starterQuery, solutionQuery }`. `prompt` should be a full paragraph (multiple sentences: what the table/columns mean, what the query needs to do, any relevant SQL concept) — a one-line prompt reads as unfinished next to the others.
2. To add a whole new topic: create `src/arena/<topic-id>/topic.meta.js` exporting `{ title, icon, description, hasSandbox }`, then challenges under `src/arena/<topic-id>/challenges/` as above. Only set `hasSandbox: true` if there's a runnable primitive for that language wired into `ArenaTopicPage.jsx` — right now that's only `SqlPlayground`/SQL.
3. It appears on `/arena` automatically — no route, page, or nav code to touch.

## Verifying your work

There is no test suite — this is what stands in for one. Before considering any change done:

```bash
npm run build   # must succeed — this is also the only thing that actually exercises registry.js's import.meta.glob against real content
npm run lint     # must be clean (a handful of pre-existing `only-export-components` warnings on lesson files are expected and fine — they're inherent to the meta-export pattern, not a regression)
```

For anything touching rendered UI or interaction (a new content primitive, layout change, routing change), also run `npm run dev` and check it in an actual browser — build/lint passing proves the code is well-formed, not that it looks or behaves right.
