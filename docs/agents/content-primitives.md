# Content primitives

Reached from AGENTS.md when writing lesson or challenge prose that needs more than plain semantic HTML. Prose itself needs no component: lesson files write plain `<p>`, `<h2>`, `<ul>`, `<strong>`, `<blockquote>`, and `LessonPage` wraps the rendered lesson in `@tailwindcss/typography`'s `.prose` class for free. Reach for a primitive only for what HTML alone can't do — and use these exact contracts, don't invent new props.

All live in `src/components/content/`.

| Component | Props | Notes |
|---|---|---|
| `CodeBlock` | `lang` (string, e.g. `"python"`), `children` (a template-string code sample) | Static, syntax-highlighted, has a copy button. Never make this editable/runnable — live code execution is explicitly out of scope. |
| `Callout` | `type` (`"tip"` \| `"note"` \| `"warning"` \| `"danger"`), `title` (optional), `children` | Colored box with an icon per type. |
| `Quiz` | `question`, `options` (string array, **no duplicates within one Quiz** — array items double as React keys), `correctIndex`, `explanation` | Local `useState` only. Progress tracking is scoped to lesson completion (see `docs/agents/auth-and-progress.md`) — don't wire individual quiz answers to Supabase or any other persistence. |
| `Exercise` | `title` (defaults to `"Mashq"`), `children` | Prompt box; typically wraps a `<Solution>`. |
| `Solution` | `children` | Collapsible "Yechimni ko'rsatish", built on `ui/Disclosure`. |
| `KeyPoints` | `children` (`<li>` elements) | Bulleted summary box, usually at a lesson's end. |
| `Figure` | `src`, `alt` (defaults to `''`, but always pass a real one), `caption` (optional) | Image + caption. |
| `SqlPlayground` | `schema` (SQL string: `CREATE TABLE`/`INSERT` statements that seed a fresh in-memory SQLite database on mount), `initialQuery` (optional starter query) | The **one, deliberate exception** to "no live code execution" — runs real queries client-side via `sql.js`/WASM (see `src/lib/sqlEngine.js`, a memoized loader shared across instances so the ~700KB engine is fetched once, lazily, only when a playground actually mounts). Each instance owns an isolated, ephemeral database; a "Qayta tiklash" button re-seeds it from `schema`. Used in two places: SQL-course lesson bodies, and `ArenaTopicPage.jsx`'s live sandbox pane for `sql`-topic challenges. Both are still "the SQL course/topic" — don't reuse this pattern for any other language's "run my code" impulse without an explicit ask. Its editor chrome (`bg-neutral-900`/`text-neutral-*`) is a deliberate, permanently-dark exception to the token system (see `docs/agents/dark-mode.md`) — a code editor reads as dark chrome regardless of site theme, so it does not use `bg-canvas`/`text-ink` and needs no `dark:` variants; the result table beneath it switches back to normal tokens. |

The canonical primary-CTA button/link — `rounded-full bg-brand-600 px-{n} py-{n} text-sm font-semibold text-canvas-muted hover:bg-brand-700` — now repeats verbatim across half a dozen files (`HomePage`, `CourseOverviewPage`, `NotFoundPage`, `LoginPage`, `UserMenu`, `Footer`'s brand-icon badge). It has already crossed the old "extract at the third occurrence" threshold below; the working choice so far has been to keep copying the exact class string rather than add a `ui/Button`. When adding a new primary CTA, copy that string exactly rather than approximating it — and if you're the one who finally extracts it into `ui/Button`, that's a real refactor with its own review, not a drive-by while doing something else.

Don't add `ui/Badge` or `ui/IconButton` speculatively — dropped from an earlier draft of this architecture because nothing needed them. Same rule as above: a second occurrence of new shared styling is a coincidence, a third is a pattern worth naming.
