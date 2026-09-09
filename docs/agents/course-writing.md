# Writing a course

Reached from AGENTS.md when adding a new lesson, adding a new course, or authoring/editing lesson prose. Composing the lesson body itself uses the content primitives — see [`docs/agents/content-primitives.md`](content-primitives.md) for their exact props.

## Adding a new lesson

1. Create `src/courses/<course-id>/lessons/NN-<slug>.jsx` with the next zero-padded number.
2. Export `meta = { title: '...', section: '...' }` and a default component composing prose + content primitives.
3. Nothing else needs to change — the registry picks it up automatically.

## Adding a new course

1. Create `src/courses/<course-id>/course.meta.js` exporting `{ title, description, icon }` (`icon` is a string name resolved through `src/lib/courseIcons.js`'s `resolveCourseIcon` — add the lucide-react icon there if it's a new one).
2. Add `src/courses/<course-id>/lessons/01-....jsx` (and more) following the lesson recipe above.
3. It appears on the home page automatically — no route, page, or nav code to touch.

## Content-authoring gotchas

Uzbek prose is where the build breaks. These four have each bitten this repo — some more than once, even after being flagged in review — so check for all of them before running `npm run build` on new or edited lesson (or Arena challenge `prompt`) content:

- **English slugs.** The filename/URL slug (`NN-<slug>.jsx`) is always English, even for a fully-Uzbek-content course with no English technical terms to anchor to (e.g. a logic/algorithmic-thinking course). Don't transliterate the Uzbek title into the slug (`katta-muammoni-bolaklarga-bolish`) — write a clean English one (`splitting-a-big-problem`). Prose, `meta.title`, and all UI text still stay Uzbek.
- **Uzbek string quotes.** Never delimit a JS string literal (`meta.title`, a `Quiz` `options`/`explanation` array entry, any prop string) with single quotes when it holds Uzbek text. Uzbek's apostrophe letters (`o'`, `g'` — `o'zgaruvchi`, `bog'lash`) and possessives break a `'...'`-quoted string's parsing. Use `"..."` or a template literal instead. `meta.title` is the recurring hotspot — it reads as "structural" rather than "prose," so the single-quote habit slips back in there specifically; check it as a deliberate final step.
- **JSX attribute quotes.** A JSX attribute string (`question="..."`, `explanation="..."`, `title="..."`) is not a JS string literal — `\"` inside one is not an escape, it's a literal backslash, and rolldown/vite fails the build with "Invalid Unicode escape sequence". If the text needs an embedded `"`, pass the prop as a template-literal expression instead: `` question={`... "Bekor qilish" ...?`} ``.
- **JSX tag balance.** A `<Callout>` immediately followed by a `<CodeBlock>` (or the reverse) invites a swapped closing tag — `<Callout>...</CodeBlock>`. After writing a new lesson file, `grep -n "Callout\|CodeBlock" <file>` and eyeball that every open has a matching close of the *same* component before running the build.

## Workflow

When writing a batch of lesson files for one course (or a multi-lesson addition), don't `git add`/commit after each individual file. Track progress with TodoWrite instead, and stage + commit the whole finished batch together — one clean commit (or a small number) covering the finished body of work, not a commit trail per lesson.
