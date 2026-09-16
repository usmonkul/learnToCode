# The registry contracts

Reached from AGENTS.md when changing how content is *discovered* — editing `src/courses/registry.js`, `src/projects/registry.js`, `src/arena/registry.js`, or the shape of `course.meta.js`/`project.meta.js`/`topic.meta.js`. Not needed just to add a lesson, project, or challenge file; the recipes in AGENTS.md cover that.

## Courses (`src/courses/registry.js`)

This is reference material, not something to reimplement — read the file itself before changing content-discovery behavior. The parts that aren't obvious from reading the code once:

- Lesson filenames need a **zero-padded two-digit prefix** (`01-hello-world.jsx`, `02-variables.jsx`, up to `99-`). Ordering is a plain string sort on the glob path, so an unpadded or missing prefix silently breaks ordering.
- A lesson's `slug` is derived from its filename (numeric prefix and `.jsx` stripped) — you never set a slug explicitly.
- `getGroupedLessons` groups only **consecutive** lessons sharing the same `meta.section`. Keep a section's lessons adjacent in the file listing; if you must reorder and a section becomes non-contiguous, the sidebar will just show it as two separate groups with the same heading — not a crash, but confusing for students.
- A lesson missing `export const meta` doesn't crash the app — it falls back to `{ title: slug, section: '' }` and logs a `console.warn`. Still write `meta` explicitly; the fallback exists to keep the failure loud-but-survivable, not as a substitute.
- A course's `id` comes from its folder name, not from anything inside `course.meta.js` — don't add an `id` field there, it would be a second, contradicting source of truth.

Exported API — everything downstream (pages, layout components) reads through this, never through `import.meta.glob` directly: `getAllCourses()`, `getCourse(courseId)`, `getLessons(courseId)`, `getLesson(courseId, slug)`, `getAdjacentLessons(courseId, slug)`, `getGroupedLessons(courseId)`.

## Projects (`src/projects/registry.js`)

"Loyihalar" is the practice-projects gallery at `/loyihalar` — a flat list of small, fully-working project components (in the spirit of 100jsprojects.com), filesystem-driven like courses and Arena. It differs from both in one important way: there's no separate "content" vs. "grading" split — a project's `Project.jsx` *is* the finished, interactive thing a student uses, not prose or a self-check.

- Unlike a course (whose `id` comes from the folder name verbatim) or an Arena challenge (whose `slug` comes from the filename), a project's `id` comes from its **folder name** with the numeric prefix stripped (`01-age-calculator` → `age-calculator`) — same derivation rule as a lesson's slug, just applied to a folder instead of a file, since a project is a folder of exactly two files (`project.meta.js`, `Project.jsx`). That folder name (and therefore the `id`/URL slug) is always English, even though `project.meta.js`'s `title`/`description` are Uzbek — see AGENTS.md's "Language" section.
- Ordering is a plain string sort on the folder's glob path, same zero-padded-prefix rule as lessons and challenges.
- The registry merges `project.meta.js`'s export and `Project.jsx`'s default export into one entry keyed by folder; a `Project.jsx` with no matching `project.meta.js` folder is skipped with a `console.warn` (mirrors the courses/arena "missing piece is loud-but-survivable" pattern) — in practice this shouldn't happen since both files always live in the same folder.
- Exported API: `getAllProjects()`, `getProject(id)`.
- Routing is intentionally asymmetric with courses/Arena: `/loyihalar` (the gallery) renders inside the normal `RootLayout` (TopNav visible), but `/loyihalar/:projectSlug` (an individual project) is a sibling top-level route in `App.jsx`, outside `RootLayout` entirely — no TopNav, no Footer. `ProjectDetailPage` renders `Project.jsx` directly (full page, no imposed container) behind a small fixed-position "back to gallery" link, so opening a project feels like navigating to its own site. Don't move this route back inside `RootLayout` without an explicit ask — that's the whole point of the split.

## Arena (`src/arena/registry.js`)

"Arena" is the practice-challenges area at `/arena` — topics (currently `sql` and `javascript`) each holding a list of self-checked challenges. It mirrors the courses registry's filesystem-driven design on purpose: same `import.meta.glob` discovery, same zero-padded-prefix ordering rule, same "adding one is one file" principle. Only what differs from the courses contract above is called out here:

- A challenge's `slug` is derived from its filename the same way a lesson's is (numeric prefix and `.js` stripped).
- `topic.meta.js` sets `hasSandbox: true` to opt a topic into rendering a live sandbox next to its challenge list (`ArenaTopicPage.jsx` checks this flag, then branches on `topicId` to pick `SqlPlayground` or `JsPlayground`) — a topic without a runnable sandbox would omit it or set it `false`.
- The two topics grade differently, and neither shape is shared: a `sql` challenge has no stored "expected result" — `SqlChallengeDetail.jsx` computes it live by running `solutionQuery` against a fresh in-memory database on mount, and self-checking against that computed table is the entire mechanism (no automated pass/fail). A `javascript` challenge instead ships `functionName`/`paramNames`/`starterCode`/`examples`/`tests`, and `JsPlayground` actually grades it, LeetCode-style — "Yuritish" (Run) checks the function against `examples` only (quick feedback, never marks solved); "Yuborish" (Submit) checks it against the full `tests` array, and a pass on every case persists to Supabase (`arena_solved_challenges`, via `useArenaStore.markSolved`). Don't blur the two shapes together, and don't add a third grading style without an explicit ask.
- Exported API: `getTopics()`, `getTopic(topicId)`, `getChallenges(topicId)`, `getChallenge(topicId, slug)`.
