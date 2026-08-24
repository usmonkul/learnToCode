# Arena — SQL Challenges Design

**Date:** 2026-08-24
**Status:** Approved

## Purpose

`ArenaPage` ([src/pages/ArenaPage.jsx](../../../src/pages/ArenaPage.jsx)) is currently a placeholder behind `RequireAuth`. This spec turns it into a working practice arena: a topic grid, and — for the SQL topic — a LeetCode-style split workspace (challenge list + description on the left, a runnable SQL playground + result on the right). Students self-check against an expected-result table shown in the challenge description; nothing is graded or persisted.

Other topics (React, JavaScript, etc.) are explicitly out of scope for this pass — only the SQL topic ships. The architecture generalizes cleanly to a future no-sandbox topic (a `hasSandbox: false` topic just wouldn't render a playground pane), but no other topic folder is created now.

## Architecture

**New content tree — `src/arena/`, mirroring `src/courses/`:**

```
src/arena/
  registry.js                    # import.meta.glob discovery, same pattern as courses/registry.js
  sql/
    topic.meta.js                 # { title, icon, hasSandbox: true, description }
    schema.js                     # SQL_SCHEMA constant — see "The sample database" below
    challenges/
      01-select-basics.js
      02-select-columns.js
      03-where-price.js
      04-where-unsold.js
      05-order-by-limit.js
      06-group-by-count.js
      07-group-by-avg.js
      08-having.js
      09-join-staff-dealerships.js
      10-join-sold-cars.js
      11-subquery-avg.js
      12-top-seller.js
```

`registry.js` exports `getTopics()`, `getTopic(topicId)`, `getChallenges(topicId)`, `getChallenge(topicId, slug)` — same shape and discovery mechanism (`import.meta.glob`, filename-derived slug, zero-padded ordering prefix) as `src/courses/registry.js`, so a future topic is "add a folder," consistent with the repo's one rule.

Each challenge file is a plain data module (not JSX — a challenge is a structured record, not composed prose):

```js
export default {
  title: 'Barcha mashinalarni ko\'rish',
  difficulty: 'easy', // 'easy' | 'medium' | 'hard'
  prompt: `cars jadvalidagi barcha ma'lumotlarni chiqaring.`,
  starterQuery: '',
  solutionQuery: 'SELECT * FROM cars;',
}
```

`topic.meta.js`:
```js
export default {
  title: 'SQL',
  icon: 'database', // resolved through the same ICONS map as CourseCard
  description: "So'rovlar yozib, jadvallar bilan ishlashni mashq qiling.",
  hasSandbox: true,
}
```

**Routing** (in `App.jsx`, inside the existing `RequireAuth` block):
- `/arena` — `ArenaPage.jsx`, rewritten as a topic grid (one "SQL" card via `getTopics()`).
- `/arena/:topicId/:challengeSlug?` — new `ArenaTopicPage.jsx`. No `challengeSlug` → redirect to the first challenge in `getChallenges(topicId)`. An unknown `topicId`/`challengeSlug` → `NotFoundPage` (same pattern `CourseOverviewPage`/`LessonPage` already use for unknown course/lesson).

**`ArenaTopicPage.jsx` layout** (two columns, `hasSandbox: true` path — the only path built now):
- **Left** (`ChallengeList` + `ChallengeDetail`, new components under `src/components/arena/`): a scrollable list of challenge titles with a difficulty badge (`easy/medium/hard` → "Oson"/"O'rta"/"Qiyin", colored chips following the `Callout`/`Quiz` pattern of raw Tailwind status colors + explicit `dark:` variants). The selected challenge expands inline showing `prompt` and an expected-result table.
- **Right**: the existing `SqlPlayground` component, reused unchanged — `schema={SQL_SCHEMA}` `initialQuery={challenge.starterQuery}` `key={challenge.slug}` (the `key` forces a full remount, so switching challenges always starts from a fresh in-memory database and the challenge's own starter query, exactly like `SqlPlayground`'s existing per-mount seeding behavior). This is a reuse of the SQL playground for SQL, not an extension of "live code execution" to a new language — consistent with AGENTS.md's scoping of that primitive.

**Expected-result computation:** `ChallengeDetail` runs `challenge.solutionQuery` once against a short-lived database seeded from `SQL_SCHEMA` (via the existing `getSqlEngine()` singleton loader — no second WASM fetch, it's memoized) whenever the selected challenge changes, and renders the resulting `{ columns, values }` as a table using the same markup `SqlPlayground` already uses for its result table. This keeps the shown "expected" table always in sync with the real schema — no hand-typed rows to drift.

**Navigation:** clicking a challenge in the list updates the route (`navigate` to `/arena/sql/<slug>`), not just local state — consistent with the rest of the app's URL-addressable content (`LessonPage`) and giving deep-linkable/shareable/back-button-friendly challenge URLs for free.

**No progress tracking.** No "solved" state, no Supabase writes — consistent with AGENTS.md's existing non-goal ("no tracking of anything besides lesson completions"). The expected-result table is the only feedback; the student judges correctness themselves.

## The sample database

One shared schema for every SQL challenge, seeded fresh per challenge selection (via `SqlPlayground`'s own remount-on-`key` behavior) and again for expected-result computation. Adapted from the provided Postgres dump to SQLite (the dialect `sql.js` executes, same as the existing SQL course): `SERIAL PRIMARY KEY` → `INTEGER PRIMARY KEY`, `BOOLEAN` → `INTEGER` (0/1), `DATE` → `TEXT`. Four tables: `dealerships`, `staff`, `cars`, `sold_cars`.

Two data fixes made while consolidating the dump into one clean seed (noted here so nobody "fixes" them back to match the dump later): the dump's `staff` insert for dealership 1 appears twice (identical 7 rows) — included once. One `sold_cars` row references `cars_id = 77`, which doesn't exist in either `cars` insert batch (max id is 73) — dropped, since a dangling reference would make that row silently unjoinable and pointless as practice data.

Full seed SQL (`src/arena/sql/schema.js`'s `SQL_SCHEMA` export, verbatim):

```sql
CREATE TABLE dealerships (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO dealerships (id, name) VALUES
  (1, 'Downtown Motors'),
  (2, 'Riverside Auto'),
  (3, 'Highland Classics');

CREATE TABLE staff (
  id INTEGER PRIMARY KEY,
  dealership_id INTEGER NOT NULL REFERENCES dealerships(id),
  name TEXT NOT NULL,
  role TEXT NOT NULL
);

INSERT INTO staff (id, dealership_id, name, role) VALUES
  (1, 1, 'Rodney Ride', 'CEO'),
  (2, 1, 'Penny Piston', 'Accountant'),
  (3, 1, 'Rhonda Rules', 'HR Officer'),
  (4, 1, 'Nina Nitro', 'Salesperson'),
  (5, 1, 'Frankie Fender', 'Salesperson'),
  (6, 1, 'Mike Anic', 'Mechanic'),
  (7, 1, 'Meg A Byte', 'Data Administrator'),
  (8, 2, 'Tina Torque', 'Salesperson'),
  (9, 2, 'Owen Carr', 'Salesperson'),
  (10, 2, 'Clara Beck', 'Salesperson'),
  (11, 2, 'Mo Motor', 'Mechanic'),
  (12, 3, 'Sasha Miles', 'Salesperson'),
  (13, 3, 'Bobby Turner', 'Salesperson'),
  (14, 3, 'Cal Mason', 'Salesperson'),
  (15, 3, 'Reggie Ratchet', 'Mechanic');

CREATE TABLE cars (
  id INTEGER PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price INTEGER NOT NULL,
  color TEXT NOT NULL,
  condition INTEGER NOT NULL,
  sold INTEGER NOT NULL,
  dealership_id INTEGER NOT NULL REFERENCES dealerships(id)
);

INSERT INTO cars (id, brand, model, year, price, color, condition, sold, dealership_id) VALUES
  (1, 'Ford', 'Mustang', 1965, 45000, 'white', 4, 0, 1),
  (2, 'Chevrolet', 'Camaro', 1970, 48000, 'red', 2, 0, 1),
  (3, 'Dodge', 'Charger', 1969, 58000, 'black', 4, 1, 1),
  (4, 'Porsche', '911', 1985, 85000, 'silver', 5, 0, 1),
  (5, 'Jaguar', 'E-Type', 1967, 56000, 'green', 2, 1, 1),
  (6, 'Jaguar', 'S-Type', 1963, 100000, 'dark green', 3, 1, 1),
  (7, 'Jaguar', 'X-Type', 2001, 10000, 'black', 3, 1, 1),
  (8, 'BMW', 'M3', 1990, 35000, 'green-yellow', 1, 1, 1),
  (9, 'Ferrari', 'F355', 1997, 150000, 'red', 5, 0, 1),
  (10, 'Ford', 'Mustang', 1967, 15000, 'dark blue', 0, 0, 1),
  (11, 'Aston Martin', 'DB5', 1964, 595000, 'silver', 5, 0, 1),
  (12, 'Aston Martin', 'DB4', 1960, 465000, 'light green', 5, 0, 1),
  (13, 'Aston Martin', 'DBS', 1969, 99000, 'red', 2, 0, 1),
  (14, 'Aston Martin', 'DB4', 1960, 425000, 'green', 3, 0, 1),
  (15, 'Aston Martin', 'DB5', 1965, 649000, 'dark red', 5, 0, 1),
  (16, 'Toyota', 'Supra', 1994, 68000, 'black', 4, 1, 1),
  (17, 'Nissan', 'Skyline GT-R', 1999, 95000, 'blue', 5, 0, 1),
  (18, 'Volkswagen', 'Beetle', 1963, 25000, 'yellow', 3, 1, 1),
  (19, 'Lamborghini', 'Countach', 1989, 320000, 'red', 5, 0, 1),
  (20, 'Rolls-Royce', 'Silver Shadow', 1975, 55000, 'white', 2, 1, 1),
  (21, 'Bentley', 'Continental GT', 2005, 85000, 'black', 5, 0, 1),
  (22, 'Maserati', 'GranTurismo', 2010, 75000, 'blue', 4, 1, 1),
  (23, 'Alfa Romeo', 'Spider', 1986, 28000, 'red', 3, 1, 1),
  (24, 'Ford', 'Mustang', 1965, 20000, 'dark red', 1, 1, 1),
  (25, 'Lotus', 'Esprit', 1993, 62000, 'light yellow', 4, 0, 1),
  (26, 'Triumph', 'Herald', 1965, 12500, 'cream', 3, 1, 1),
  (27, 'Ford', 'Capri', 1983, 22000, 'blue', 2, 0, 1),
  (28, 'Ford', 'Granada', 1977, 18000, 'black', 1, 0, 1),
  (29, 'Volkswagen', 'Golf GTI', 1991, 12500, 'light green', 1, 1, 1),
  (30, 'Chevrolet', 'Camaro', 1969, 54000, 'mint green', 5, 1, 1),
  (31, 'Chevrolet', 'Corvette', 1967, 88000, 'red', 5, 1, 1),
  (32, 'Chevrolet', 'Corvette C5', 2001, 32000, 'yellow', 4, 1, 1),
  (33, 'Ferrari', 'Testarossa', 1988, 195000, 'red', 5, 1, 1),
  (34, 'Ferrari', '360 Modena', 2003, 125000, 'silver', 5, 1, 1),
  (35, 'Bentley', 'Arnage', 2001, 45000, 'black', 4, 0, 1),
  (36, 'Bentley', 'Continental R', 1999, 68000, 'blue', 5, 0, 1),
  (37, 'Jaguar', 'XJ220', 1994, 450000, 'silver', 5, 0, 1),
  (38, 'Porsche', '911 Carrera', 1985, 85000, 'red', 5, 0, 1),
  (39, 'Porsche', '911 Turbo', 1995, 12000, 'black', 1, 0, 1),
  (40, 'Porsche', '944 Turbo', 1986, 48000, 'white', 4, 1, 1),
  (41, 'Porsche', '356B', 1960, 265000, 'silver', 4, 0, 1),
  (42, 'Mercedes-Benz', '300SLR', 1955, 142000000, 'silver', 5, 0, 1),
  (43, 'Bentley', 'T2', 1978, 52000, 'silver', 4, 0, 1),
  (44, 'Volkswagen', 'Beetle', 1967, 15000, 'black', 1, 0, 1),
  (45, 'Volkswagen', 'Beetle', 1967, 25000, 'red', 3, 1, 2),
  (46, 'Ford', 'Mustang', 1965, 10000, 'yellow', 0, 0, 2),
  (47, 'Mercedes-Benz', '300SL', 1954, 35000, 'green', 4, 0, 1),
  (48, 'Porsche', '356', 1955, 40000, 'cream', 5, 1, 2),
  (49, 'Aston Martin', 'DB5', 1964, 45000, 'blue', 5, 1, 2),
  (50, 'AMC', 'Javelin', 1971, 22000, 'cream', 2, 0, 1),
  (51, 'Fiat', '124 Spider', 1978, 30000, 'green', 3, 1, 1),
  (52, 'BMW', '2002', 1973, 32000, 'green', 4, 0, 2),
  (53, 'Volkswagen', 'Beetle', 1967, 28000, 'grey', 3, 0, 3),
  (54, 'Volkswagen', 'Beetle', 1967, 12000, 'blue', 1, 0, 3),
  (55, 'AMC', 'Javelin', 1971, 18000, 'blue', 1, 1, 2),
  (56, 'BMW', '2002', 1973, 35000, 'black', 4, 0, 1),
  (57, 'Chevrolet', 'Bel Air', 1957, 38000, 'white', 4, 0, 3),
  (58, 'Toyota', '2000GT', 1967, 45000, 'blue', 5, 1, 1),
  (59, 'Pontiac', 'GTO', 1966, 30000, 'cream', 3, 0, 2),
  (60, 'Chevrolet', 'Bel Air', 1957, 24000, 'white', 2, 1, 2),
  (61, 'Alfa Romeo', 'Spider', 1974, 33000, 'blue', 3, 0, 3),
  (62, 'AMC', 'Javelin', 1971, 16000, 'green', 1, 0, 3),
  (63, 'Fiat', '124 Spider', 1978, 18000, 'green', 2, 1, 1),
  (64, 'Pontiac', 'GTO', 1966, 50000, 'red', 5, 1, 1),
  (65, 'Toyota', '2000GT', 1967, 47000, 'red', 5, 1, 1),
  (66, 'Lincoln', 'Continental', 1965, 32000, 'white', 4, 1, 2),
  (67, 'Alfa Romeo', 'Spider', 1974, 26000, 'black', 2, 1, 3),
  (68, 'Ferrari', '250 GTO', 1962, 60000, 'white', 5, 0, 2),
  (69, 'AMC', 'Javelin', 1971, 22000, 'grey', 2, 1, 2),
  (70, 'Volkswagen', 'Beetle', 1967, 29000, 'green', 3, 0, 1),
  (71, 'Pontiac', 'GTO', 1966, 17000, 'cream', 2, 0, 1),
  (72, 'Toyota', '2000GT', 1967, 48000, 'black', 5, 0, 2),
  (73, 'AMC', 'Javelin', 1971, 14000, 'blue', 1, 1, 2);

CREATE TABLE sold_cars (
  id INTEGER PRIMARY KEY,
  cars_id INTEGER NOT NULL REFERENCES cars(id),
  seller INTEGER NOT NULL REFERENCES staff(id),
  sold_date TEXT NOT NULL,
  sold_price INTEGER NOT NULL
);

INSERT INTO sold_cars (id, cars_id, seller, sold_date, sold_price) VALUES
  (1, 49, 10, '2023-01-09', 45500),
  (2, 52, 5, '2025-04-17', 18500),
  (3, 53, 4, '2020-11-19', 51000),
  (4, 55, 8, '2020-06-28', 56500),
  (5, 59, 12, '2020-11-12', 58500),
  (6, 62, 10, '2022-10-05', 64500),
  (7, 64, 8, '2022-05-18', 33000),
  (8, 67, 10, '2024-03-17', 14500),
  (9, 68, 5, '2024-10-08', 44500),
  (10, 69, 14, '2021-06-21', 73500),
  (11, 70, 12, '2025-03-15', 56000),
  (12, 71, 4, '2020-09-01', 26000),
  (13, 73, 14, '2022-06-23', 19000);
```

## Challenge list

12 challenges, `easy → medium → hard`, each a self-contained SQL concept using the schema above. `starterQuery` is `''` for all (blank editor) except where noted.

| File | Difficulty | Concept | `solutionQuery` |
|---|---|---|---|
| `01-select-basics.js` | easy | `SELECT *` | `SELECT * FROM cars;` |
| `02-select-columns.js` | easy | Choosing columns | `SELECT brand, model, year FROM cars;` |
| `03-where-price.js` | easy | `WHERE` numeric filter | `SELECT * FROM cars WHERE price > 50000;` |
| `04-where-unsold.js` | easy | `WHERE` on a flag column | `SELECT * FROM cars WHERE sold = 0;` |
| `05-order-by-limit.js` | medium | `ORDER BY` + `LIMIT` | `SELECT brand, model, price FROM cars ORDER BY price DESC LIMIT 5;` |
| `06-group-by-count.js` | medium | `GROUP BY` + `COUNT` | `SELECT brand, COUNT(*) AS soni FROM cars GROUP BY brand ORDER BY soni DESC;` |
| `07-group-by-avg.js` | medium | `GROUP BY` + `AVG` | `SELECT color, AVG(price) AS orta_narx FROM cars GROUP BY color;` |
| `08-having.js` | medium | `HAVING` | `SELECT brand, COUNT(*) AS soni FROM cars GROUP BY brand HAVING COUNT(*) > 3;` |
| `09-join-staff-dealerships.js` | medium | Two-table `JOIN` | `SELECT s.name, s.role, d.name AS dilerlik FROM staff s JOIN dealerships d ON s.dealership_id = d.id;` |
| `10-join-sold-cars.js` | hard | Three-table `JOIN` | `SELECT c.brand, c.model, st.name AS sotuvchi, sc.sold_price FROM sold_cars sc JOIN cars c ON sc.cars_id = c.id JOIN staff st ON sc.seller = st.id;` |
| `11-subquery-avg.js` | hard | Subquery in `WHERE` | `SELECT brand, model, price FROM cars WHERE price > (SELECT AVG(price) FROM cars);` |
| `12-top-seller.js` | hard | `JOIN` + `GROUP BY` + `ORDER BY` + `LIMIT` | `SELECT st.name, COUNT(*) AS sotilgan_soni FROM sold_cars sc JOIN staff st ON sc.seller = st.id GROUP BY st.name ORDER BY sotilgan_soni DESC LIMIT 1;` |

Each `prompt` is written in Uzbek (per AGENTS.md's language convention), phrased as a task description, e.g. challenge 3's prompt: `"cars" jadvalidan narxi 50 000 dan qimmat bo'lgan barcha mashinalarni chiqaring.`. Exact prompt wording is an implementation detail, not fixed by this spec — the table above fixes the *SQL concept and correct answer* each challenge tests.

## Component contracts

- **`src/arena/registry.js`** — `getTopics(): Topic[]`, `getTopic(topicId): Topic`, `getChallenges(topicId): Challenge[]`, `getChallenge(topicId, slug): Challenge`. Same `import.meta.glob` + filename-slug pattern as `src/courses/registry.js`; a challenge missing required fields logs a `console.warn` and falls back the same way a lesson missing `meta` does.
- **`ArenaPage.jsx`** — topic grid. Each card links to `/arena/<topicId>`. No props (reads the registry directly), same pattern `CoursesPage.jsx` uses for `getAllCourses()`.
- **`ArenaTopicPage.jsx`** — reads `:topicId`/`:challengeSlug` from the route, resolves via the registry, redirects (`<Navigate>`) to the first challenge when `challengeSlug` is absent, renders `NotFoundPage` behavior on an unknown topic/slug. Owns no challenge-solving state itself — `SqlPlayground` and `ChallengeDetail` each derive everything from the resolved `challenge` object and remount via `key`.
- **`src/components/arena/ChallengeList.jsx`** — props: `challenges`, `activeSlug`, `topicId` (for building links). Renders titles + difficulty chips as a list; the active item renders `ChallengeDetail` inline directly beneath it (per the approved "list + detail combined" layout) — `ChallengeList` owns the `<ChallengeDetail>` render, `ArenaTopicPage` does not render it separately.
- **`src/components/arena/ChallengeDetail.jsx`** — props: `challenge`, `schema` (defaults to the topic's `SQL_SCHEMA`). Runs `solutionQuery` on mount/`challenge` change via `getSqlEngine()`, renders `prompt` + the resulting table using the same column/row markup `SqlPlayground` uses.

## Error handling

- Unknown `topicId` or `challengeSlug` in the URL → same `NotFoundPage` fallback `CourseOverviewPage`/`LessonPage` already use for unknown course/lesson.
- `ChallengeDetail`'s expected-result query failing (should never happen if `solutionQuery` is correct, but a typo is possible while authoring) → surfaced the same way `SqlPlayground` surfaces a run error: a red inline message, not a crash. This doubles as an authoring self-check — a broken `solutionQuery` is visibly broken when the page loads.
- `SqlPlayground`'s own loading/error states (WASM fetch failure, query errors) are unchanged — it's reused as-is.

## Testing

No test runner in this repo (per AGENTS.md). Verification is:
1. `npm run build && npm run lint` clean.
2. Manual browser pass on `/arena` → `/arena/sql/<each of the 12 slugs>`: challenge list renders with correct difficulty chips, selecting a challenge shows its prompt + expected-result table, the playground on the right seeds fresh per challenge and `Run` produces the same result as the shown "expected" table when the student pastes in `solutionQuery` verbatim (this doubles as correctness-proofing the seed data / solution queries against each other).
3. Confirm `/arena` and `/arena/:topicId/...` still redirect signed-out visitors to `/login?redirect=...` (existing `RequireAuth` behavior, unchanged — just confirming the new nested route inherited it correctly).

## Non-goals (this pass)

- No React/JavaScript/other topic content or topic cards.
- No solved/progress tracking or Supabase writes of any kind.
- No automated correctness checking of a student's query — the expected-result table is the only feedback, by design (per the approved conversation).
