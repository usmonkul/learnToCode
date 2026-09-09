# The registry contracts

Reached from AGENTS.md when changing how content is *discovered* — editing `src/courses/registry.js`, `src/arena/registry.js`, or the shape of `course.meta.js`/`topic.meta.js`. Not needed just to add a lesson or challenge file; the recipes in AGENTS.md cover that.

## Courses (`src/courses/registry.js`)

This is reference material, not something to reimplement — read the file itself before changing content-discovery behavior. The parts that aren't obvious from reading the code once:

- Lesson filenames need a **zero-padded two-digit prefix** (`01-hello-world.jsx`, `02-variables.jsx`, up to `99-`). Ordering is a plain string sort on the glob path, so an unpadded or missing prefix silently breaks ordering.
- A lesson's `slug` is derived from its filename (numeric prefix and `.jsx` stripped) — you never set a slug explicitly.
- `getGroupedLessons` groups only **consecutive** lessons sharing the same `meta.section`. Keep a section's lessons adjacent in the file listing; if you must reorder and a section becomes non-contiguous, the sidebar will just show it as two separate groups with the same heading — not a crash, but confusing for students.
- A lesson missing `export const meta` doesn't crash the app — it falls back to `{ title: slug, section: '' }` and logs a `console.warn`. Still write `meta` explicitly; the fallback exists to keep the failure loud-but-survivable, not as a substitute.
- A course's `id` comes from its folder name, not from anything inside `course.meta.js` — don't add an `id` field there, it would be a second, contradicting source of truth.

Exported API — everything downstream (pages, layout components) reads through this, never through `import.meta.glob` directly: `getAllCourses()`, `getCourse(courseId)`, `getLessons(courseId)`, `getLesson(courseId, slug)`, `getAdjacentLessons(courseId, slug)`, `getGroupedLessons(courseId)`.

## Arena (`src/arena/registry.js`)

"Arena" is the practice-challenges area at `/arena` — topics (currently just `sql`) each holding a list of self-checked challenges. It mirrors the courses registry's filesystem-driven design on purpose: same `import.meta.glob` discovery, same zero-padded-prefix ordering rule, same "adding one is one file" principle. Only what differs from the courses contract above is called out here:

- A challenge's `slug` is derived from its filename the same way a lesson's is (numeric prefix and `.js` stripped).
- `topic.meta.js` sets `hasSandbox: true` to opt a topic into rendering a live `SqlPlayground` next to its challenge list (`ArenaTopicPage.jsx` checks this flag) — a topic without a runnable sandbox (a future non-SQL topic) would omit it or set it `false`.
- A challenge has no stored "expected result" — `ChallengeDetail.jsx` computes it live by running `solutionQuery` against a fresh in-memory database on mount. There is no automated grading; self-checking against that computed table is the entire mechanism. Don't add a diffing/grading layer without an explicit ask.
- Exported API: `getTopics()`, `getTopic(topicId)`, `getChallenges(topicId)`, `getChallenge(topicId, slug)`.
