# AGENTS.md

Instructions for any AI coding tool (Claude Code, Cursor, Copilot, etc.) working in this repo. Follow this file's conventions over your own defaults.

## What this is

A programming tutorial platform. Students pick a course and read lessons. Lessons are plain JSX files composed from a small library of **content primitives**. There is no CMS and no database for *content* — the filesystem *is* the content, and Vite's `import.meta.glob` discovers it at build time through `src/courses/registry.js`. Students can create an account (Supabase Auth) to track which lessons they've completed and keep a day-streak — see `docs/agents/auth-and-progress.md` if you're touching that. Course content itself stays filesystem-driven either way. Signed-in students can also practice in **Arena** (`/arena`) — self-checked challenges, filesystem-driven the same way courses are, currently one topic (SQL) with a live query sandbox.

**The one idea that drives every folder-structure and component decision here: adding a lesson is one file, and adding a course is one folder.** Never reintroduce a hand-maintained index of lessons/courses — that's exactly what the registry exists to avoid.

## Tech stack — do not add competing libraries

React 19, Vite, React Router 7, Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`), Zustand 5, lucide-react (icons), `prism-react-renderer` (code highlighting), `@tailwindcss/typography` (prose), `clsx` + `tailwind-merge` (via the `cn()` helper), `@supabase/supabase-js` (auth + progress tracking). Plain JavaScript `.jsx` files — **no TypeScript**, despite `@types/react`/`@types/react-dom` being present (editor intellisense only; there is no `tsconfig.json` and no `.tsx` file anywhere). See `package.json` for exact versions.

One scoped exception: `sql.js` (WASM SQLite, runs entirely client-side) backs the `SqlPlayground` primitive used by the SQL course and the SQL Arena topic (see `docs/agents/content-primitives.md` and `src/lib/sqlEngine.js`). Don't reach for it, or any other execution engine, outside that one documented use.

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
    registry.js              # same import.meta.glob pattern as courses/registry.js, for practice challenges
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
    themeStore.js            # zustand — light/dark/system preference (see docs/agents/dark-mode.md)
    authStore.js             # zustand — thin mirror of supabase-js's auth session (see docs/agents/auth-and-progress.md)
    progressStore.js         # zustand — lesson completions + streak, fetched from Supabase per session
  lib/
    cn.js                   # clsx + tailwind-merge classname helper — use this, never string-concat classNames
    courseIcons.js            # resolveCourseIcon(iconName) — the ICONS lookup, shared by CourseCard and HomePage (see the "runtime string" rule below)
    sqlEngine.js               # memoized sql.js/WASM loader — see docs/agents/content-primitives.md
    supabaseClient.js        # singleton Supabase client
  App.jsx                  # route table + RootLayout (TopNav + scroll/sidebar reset on navigation)
supabase/
  migrations/               # versioned SQL — the source of truth for the Postgres schema, not the dashboard
```

Always import via the `@` alias (`@/components/content/CodeBlock`, `@/courses/registry`, `@/lib/cn`) — never relative `../../..` paths. The only exception is `src/main.jsx`, the Vite entry point, which has no parent to route through.

Changing how content is *discovered* (editing either `registry.js`, or the shape of `course.meta.js`/`topic.meta.js`) — see [`docs/agents/registry-contract.md`](docs/agents/registry-contract.md) for the exact contract (slug derivation, section-grouping rules, exported API) first.

Writing lesson or challenge prose that needs more than plain HTML — a code block, callout, quiz, exercise, figure, or the SQL sandbox — see [`docs/agents/content-primitives.md`](docs/agents/content-primitives.md) for the exact prop contracts. Don't invent new props or new primitives, and don't add `ui/Badge`/`ui/IconButton` speculatively.

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

The app also supports a manual light/dark/system toggle. The tokens above already adapt automatically — no `dark:` classes needed for them. Adding or touching a `dark:` class, a raw Tailwind color (status colors, a `brand`/`brand2` chip), or anything else that isn't one of those tokens — see [`docs/agents/dark-mode.md`](docs/agents/dark-mode.md) for how the toggle works and the exact chip/section/text pairing rules before you do.

Touching sign-in, sessions, lesson-completion/streak tracking, or the Supabase schema — see [`docs/agents/auth-and-progress.md`](docs/agents/auth-and-progress.md) for how auth state, progress state, and RLS are wired.

## Language

Lesson prose and all UI chrome (buttons, nav labels, headings) are written in **Uzbek**. Code, language keywords, and technical terms stay in English; add a bracketed Uzbek translation inline where it helps a beginner (`o'zgaruvchi (variable)`). This is a fixed content convention, not an i18n system — there's no language switcher and there shouldn't be one.

## Non-goals — do not add these without being explicitly asked

Authentication and progress tracking exist now (Supabase-backed, see `docs/agents/auth-and-progress.md`) — scoped narrowly to sign-in and lesson-completion/streak tracking. The Arena practice-challenges area also exists now (see `docs/agents/registry-contract.md`) — scoped narrowly to challenge-list-plus-sandbox self-checking, SQL only. Still out of scope without an explicit ask: no admin panel or course-authoring UI (content stays filesystem-driven via the registries, auth doesn't change that), no user profile/settings page beyond what's needed for sign-in, no tracking of anything besides lesson completions or challenge attempts (Arena has no submission history — every visit re-runs `solutionQuery` fresh), no automated grading/diffing on Arena challenges (self-check against the computed expected result is the whole mechanism), no `persist` middleware on any zustand store beyond the two existing manual-`localStorage` exceptions (`themeStore.js`'s preference, `supabase-js`'s own session persistence, which `authStore.js` merely mirrors). `uiStore.js` itself stays ephemeral (mobile-sidebar-open state only). No live/editable code execution, **except** `SqlPlayground` (see `docs/agents/content-primitives.md`) — a one-time, explicitly-approved exception for SQL lessons and the SQL Arena topic, not a precedent for adding one to every language or every Arena topic. No TypeScript. No automated test runner.

## Writing a course

Adding a new lesson, adding a new course, or authoring/editing lesson prose — see [`docs/agents/course-writing.md`](docs/agents/course-writing.md) for the exact recipe plus the Uzbek-quoting/JSX-tag gotchas that have broken the build before (more than once, on some of them).

## Adding an Arena challenge (or topic)

1. To add a challenge to the existing `sql` topic: create `src/arena/sql/challenges/NN-<slug>.js` with the next zero-padded number, default-exporting `{ title, difficulty: 'easy' | 'medium' | 'hard', prompt, starterQuery, solutionQuery }`. `prompt` should be a full paragraph (multiple sentences: what the table/columns mean, what the query needs to do, any relevant SQL concept) — a one-line prompt reads as unfinished next to the others. `prompt` is Uzbek prose, same as lesson content — the quoting gotchas in `docs/agents/course-writing.md` apply here too.
2. To add a whole new topic: create `src/arena/<topic-id>/topic.meta.js` exporting `{ title, icon, description, hasSandbox }`, then challenges under `src/arena/<topic-id>/challenges/` as above. Only set `hasSandbox: true` if there's a runnable primitive for that language wired into `ArenaTopicPage.jsx` — right now that's only `SqlPlayground`/SQL.
3. It appears on `/arena` automatically — no route, page, or nav code to touch.

## Verifying your work

There is no test suite — this is what stands in for one. Before considering any change done:

```bash
npm run build   # must succeed — this is also the only thing that actually exercises registry.js's import.meta.glob against real content
npm run lint     # must be clean (a handful of pre-existing `only-export-components` warnings on lesson files are expected and fine — they're inherent to the meta-export pattern, not a regression)
```

For anything touching rendered UI or interaction (a new content primitive, layout change, routing change), also run `npm run dev` and check it in an actual browser — build/lint passing proves the code is well-formed, not that it looks or behaves right.
