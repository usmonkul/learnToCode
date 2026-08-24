# Arena SQL Challenges Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the placeholder `/arena` page into a working practice arena: a topic grid, and a LeetCode-style split SQL workspace (challenge list + description on the left, a runnable `SqlPlayground` + result on the right) for 12 SQL challenges against a shared car-dealership schema.

**Architecture:** A new `src/arena/` content tree, discovered via `import.meta.glob` through `src/arena/registry.js` — the same filesystem-is-the-content pattern `src/courses/registry.js` already uses. Each challenge is a plain data module (title/difficulty/prompt/starterQuery/solutionQuery). The existing `SqlPlayground` component is reused unmodified for the right-hand editor; the left-hand "expected result" table is computed by running each challenge's `solutionQuery` once against the shared schema via the existing `getSqlEngine()` loader.

**Tech Stack:** React 19, React Router 7, Tailwind CSS v4, lucide-react, sql.js (via the existing `src/lib/sqlEngine.js` loader — no new dependency).

**Spec:** `docs/superpowers/specs/2026-08-24-arena-sql-challenges-design.md`

## Global Constraints

- Plain JavaScript `.js`/`.jsx` — no TypeScript.
- All internal imports use the `@/` alias, never relative `../../..` paths.
- `SqlPlayground` (`src/components/content/SqlPlayground.jsx`) is reused as-is — do not modify it. It is the codebase's one deliberate live-execution exception, already scoped to SQL.
- UI chrome is Uzbek, per AGENTS.md. **Any JS string containing an Uzbek apostrophe (`o'`, `g'`, `bo'`, `ko'`, etc.) must use double quotes (`"..."`) or backticks (`` `...` ``) — never single quotes (`'...'`)**, since a single-quoted string ends at the first `'` inside the word and breaks the parser.
- No progress/"solved" tracking and no Supabase writes anywhere in this feature — the expected-result table is the only feedback, by design.
- Difficulty colors follow the existing `Callout`/`Quiz`/`SqlPlayground` convention: raw Tailwind status colors (not the `bg-canvas`/`text-ink` tokens) with an explicit `dark:` variant by hand — easy → `emerald`, medium → `amber`, hard → `red`.
- No automated test runner is installed (by design, per AGENTS.md). Per-task verification is `npm run build && npm run lint`. The final task is a full manual browser pass — the true end-to-end check for the registry's glob logic and for whether every `solutionQuery` is actually correct SQL.
- The seed data (`SQL_SCHEMA`) below is copied verbatim from the spec — do not hand-edit rows; if it ever needs to change, change it in exactly one place (`src/arena/sql/schema.js`) since every challenge's expected result is computed from it live.

---

## Task 1: Arena content registry — schema, topic meta, and discovery

**Files:**
- Create: `src/arena/registry.js`
- Create: `src/arena/sql/schema.js`
- Create: `src/arena/sql/topic.meta.js`

**Interfaces:**
- Consumes: nothing (first task).
- Produces (used by every later task): `getTopics()`, `getTopic(topicId)`, `getChallenges(topicId)`, `getChallenge(topicId, slug)` from `@/arena/registry`. `SQL_SCHEMA` (a string) from `@/arena/sql/schema`. A topic object shape of `{ id, title, icon, description, hasSandbox }`. A challenge object shape of `{ slug, path, title, difficulty, prompt, starterQuery, solutionQuery }`.

- [ ] **Step 1: Create the registry module**

Create `src/arena/registry.js`:

```js
const topicMetaModules = import.meta.glob('./*/topic.meta.js', { eager: true })
const challengeModules = import.meta.glob('./*/challenges/*.js', { eager: true })

// Challenge filenames must use a zero-padded two-digit prefix ("01-...", "02-...")
// so plain string sorting keeps them in the right order — same convention as
// src/courses/registry.js.
function topicIdFromPath(path) {
  return path.match(/^\.\/([^/]+)\//)[1]
}

function slugFromChallengePath(path) {
  return path
    .split('/')
    .pop()
    .replace(/\.js$/, '')
    .replace(/^\d+-/, '')
}

const topics = new Map()
for (const [path, mod] of Object.entries(topicMetaModules)) {
  const id = topicIdFromPath(path)
  topics.set(id, { ...mod.default, id })
}

const challengesByTopic = new Map()
for (const [path, mod] of Object.entries(challengeModules)) {
  const topicId = topicIdFromPath(path)
  const slug = slugFromChallengePath(path)
  if (!mod.default) {
    console.warn(`Challenge module "${path}" is missing a default export — skipping.`)
    continue
  }
  const entry = { slug, path, ...mod.default }
  if (!challengesByTopic.has(topicId)) challengesByTopic.set(topicId, [])
  challengesByTopic.get(topicId).push(entry)
}
for (const challenges of challengesByTopic.values()) {
  challenges.sort((a, b) => a.path.localeCompare(b.path))
}

export function getTopics() {
  return Array.from(topics.values())
}

export function getTopic(topicId) {
  return topics.get(topicId)
}

export function getChallenges(topicId) {
  return challengesByTopic.get(topicId) ?? []
}

export function getChallenge(topicId, slug) {
  return getChallenges(topicId).find((challenge) => challenge.slug === slug)
}
```

- [ ] **Step 2: Create the shared SQL schema constant**

Create `src/arena/sql/schema.js`:

```js
export const SQL_SCHEMA = `CREATE TABLE dealerships (
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
`
```

- [ ] **Step 3: Create the SQL topic metadata**

Create `src/arena/sql/topic.meta.js`:

```js
export default {
  title: 'SQL',
  icon: 'database',
  description: "So'rovlar yozib, jadvallar bilan ishlashni mashq qiling.",
  hasSandbox: true,
}
```

- [ ] **Step 4: Verify**

Run: `npm run lint`
Expected: no errors (nothing imports `src/arena/` yet, so `npm run build` won't exercise it — lint parses every file regardless, per AGENTS.md's note on oxlint).

- [ ] **Step 5: Commit**

```bash
git add src/arena/registry.js src/arena/sql/schema.js src/arena/sql/topic.meta.js
git commit -m "Add arena content registry, SQL sample schema, and topic metadata"
```

---

## Task 2: Author the 12 SQL challenges

**Files:**
- Create: `src/arena/sql/challenges/01-select-basics.js`
- Create: `src/arena/sql/challenges/02-select-columns.js`
- Create: `src/arena/sql/challenges/03-where-price.js`
- Create: `src/arena/sql/challenges/04-where-unsold.js`
- Create: `src/arena/sql/challenges/05-order-by-limit.js`
- Create: `src/arena/sql/challenges/06-group-by-count.js`
- Create: `src/arena/sql/challenges/07-group-by-avg.js`
- Create: `src/arena/sql/challenges/08-having.js`
- Create: `src/arena/sql/challenges/09-join-staff-dealerships.js`
- Create: `src/arena/sql/challenges/10-join-sold-cars.js`
- Create: `src/arena/sql/challenges/11-subquery-avg.js`
- Create: `src/arena/sql/challenges/12-top-seller.js`

**Interfaces:**
- Consumes: nothing directly (picked up by `Task 1`'s `import.meta.glob` in `registry.js` once these files exist).
- Produces: 12 challenge records discoverable via `getChallenges('sql')`, each `{ title, difficulty, prompt, starterQuery, solutionQuery }`.

- [ ] **Step 1: Create all 12 challenge files**

Create `src/arena/sql/challenges/01-select-basics.js`:

```js
export default {
  title: "Barcha mashinalarni ko'rish",
  difficulty: 'easy',
  prompt: `"cars" jadvalidagi barcha ustunlar va barcha qatorlarni chiqaring.`,
  starterQuery: '',
  solutionQuery: 'SELECT * FROM cars;',
}
```

Create `src/arena/sql/challenges/02-select-columns.js`:

```js
export default {
  title: 'Faqat kerakli ustunlar',
  difficulty: 'easy',
  prompt: `"cars" jadvalidan faqat "brand", "model" va "year" ustunlarini chiqaring.`,
  starterQuery: '',
  solutionQuery: 'SELECT brand, model, year FROM cars;',
}
```

Create `src/arena/sql/challenges/03-where-price.js`:

```js
export default {
  title: 'Qimmat mashinalar',
  difficulty: 'easy',
  prompt: `Narxi ("price") 50000 dan qimmat bo'lgan barcha mashinalarni chiqaring.`,
  starterQuery: '',
  solutionQuery: 'SELECT * FROM cars WHERE price > 50000;',
}
```

Create `src/arena/sql/challenges/04-where-unsold.js`:

```js
export default {
  title: 'Hali sotilmagan mashinalar',
  difficulty: 'easy',
  prompt: `Hali sotilmagan ("sold" = 0) barcha mashinalarni chiqaring.`,
  starterQuery: '',
  solutionQuery: 'SELECT * FROM cars WHERE sold = 0;',
}
```

Create `src/arena/sql/challenges/05-order-by-limit.js`:

```js
export default {
  title: 'Eng qimmat 5 ta mashina',
  difficulty: 'medium',
  prompt: `Eng qimmat 5 ta mashinaning "brand", "model" va "price" ustunlarini narx bo'yicha kamayish tartibida chiqaring.`,
  starterQuery: '',
  solutionQuery: 'SELECT brand, model, price FROM cars ORDER BY price DESC LIMIT 5;',
}
```

Create `src/arena/sql/challenges/06-group-by-count.js`:

```js
export default {
  title: 'Har bir brenddan nechtadan bor',
  difficulty: 'medium',
  prompt: `Har bir brend ("brand") uchun nechta mashina borligini hisoblang. Ustun nomi "soni" bo'lsin, natijani mashinalar soni bo'yicha kamayish tartibida chiqaring.`,
  starterQuery: '',
  solutionQuery: 'SELECT brand, COUNT(*) AS soni FROM cars GROUP BY brand ORDER BY soni DESC;',
}
```

Create `src/arena/sql/challenges/07-group-by-avg.js`:

```js
export default {
  title: "Rang bo'yicha o'rtacha narx",
  difficulty: 'medium',
  prompt: `Har bir rang ("color") uchun o'rtacha narxni hisoblang. Ustun nomi "orta_narx" bo'lsin.`,
  starterQuery: '',
  solutionQuery: 'SELECT color, AVG(price) AS orta_narx FROM cars GROUP BY color;',
}
```

Create `src/arena/sql/challenges/08-having.js`:

```js
export default {
  title: '3 tadan ortiq mashinasi bor brendlar',
  difficulty: 'medium',
  prompt: `Faqat 3 tadan ortiq mashinasi bo'lgan brendlarni va ularning mashinalar sonini chiqaring. Soni ustuni "soni" deb nomlansin.`,
  starterQuery: '',
  solutionQuery: 'SELECT brand, COUNT(*) AS soni FROM cars GROUP BY brand HAVING COUNT(*) > 3;',
}
```

Create `src/arena/sql/challenges/09-join-staff-dealerships.js`:

```js
export default {
  title: 'Xodimlar va ularning dilerliklari',
  difficulty: 'medium',
  prompt: `"staff" jadvalini "dealerships" jadvali bilan birlashtiring (JOIN) va har bir xodimning ismi ("name"), lavozimi ("role") va dilerlik nomini chiqaring. Dilerlik nomi ustunini "dilerlik" deb nomlang.`,
  starterQuery: '',
  solutionQuery:
    'SELECT s.name, s.role, d.name AS dilerlik FROM staff s JOIN dealerships d ON s.dealership_id = d.id;',
}
```

Create `src/arena/sql/challenges/10-join-sold-cars.js`:

```js
export default {
  title: 'Sotilgan mashinalar va sotuvchilar',
  difficulty: 'hard',
  prompt: `"sold_cars" jadvalini "cars" va "staff" jadvallari bilan birlashtiring (JOIN) va har bir sotilgan mashinaning brendi ("brand"), modeli ("model"), uni sotgan xodimning ismi ("sotuvchi" deb nomlang) va sotilgan narxini ("sold_price") chiqaring.`,
  starterQuery: '',
  solutionQuery:
    'SELECT c.brand, c.model, st.name AS sotuvchi, sc.sold_price FROM sold_cars sc JOIN cars c ON sc.cars_id = c.id JOIN staff st ON sc.seller = st.id;',
}
```

Create `src/arena/sql/challenges/11-subquery-avg.js`:

```js
export default {
  title: "O'rtacha narxdan qimmat mashinalar",
  difficulty: 'hard',
  prompt: `Narxi barcha mashinalarning o'rtacha narxidan qimmat bo'lgan mashinalarning "brand", "model" va "price" ustunlarini chiqaring. O'rtacha narxni ichki so'rov (subquery) yordamida hisoblang.`,
  starterQuery: '',
  solutionQuery: 'SELECT brand, model, price FROM cars WHERE price > (SELECT AVG(price) FROM cars);',
}
```

Create `src/arena/sql/challenges/12-top-seller.js`:

```js
export default {
  title: "Eng ko'p sotgan xodim",
  difficulty: 'hard',
  prompt: `"sold_cars" va "staff" jadvallarini birlashtirib, eng ko'p mashina sotgan xodimning ismi va sotgan mashinalar sonini chiqaring (faqat 1 ta qator). Soni ustuni "sotilgan_soni" deb nomlansin.`,
  starterQuery: '',
  solutionQuery:
    'SELECT st.name, COUNT(*) AS sotilgan_soni FROM sold_cars sc JOIN staff st ON sc.seller = st.id GROUP BY st.name ORDER BY sotilgan_soni DESC LIMIT 1;',
}
```

- [ ] **Step 2: Verify**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/arena/sql/challenges/
git commit -m "Add 12 SQL arena challenges (easy through hard)"
```

---

## Task 3: `ArenaPage` — topic grid

**Files:**
- Modify: `src/pages/ArenaPage.jsx` (full rewrite)

**Interfaces:**
- Consumes: `getTopics()`, `getChallenges(topicId)` from `@/arena/registry` (Task 1/2).
- Produces: nothing new consumed by later tasks — this page just needs `/arena/:topicId` to exist (Task 5).

- [ ] **Step 1: Rewrite `ArenaPage.jsx` as a topic grid**

Replace the full contents of `src/pages/ArenaPage.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { Database, Swords } from 'lucide-react'
import { getTopics, getChallenges } from '@/arena/registry'

const ICONS = {
  database: Database,
}

export default function ArenaPage() {
  const topics = getTopics()

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-10 flex items-center gap-3">
        <Swords className="h-8 w-8 text-brand-600" />
        <div>
          <h1 className="text-3xl font-bold text-ink">Arena</h1>
          <p className="mt-1 text-ink-muted">
            Mavzuni tanlang va masalalarni yechib, bilimingizni mashq qiling.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const Icon = ICONS[topic.icon] ?? Database
          return (
            <Link
              key={topic.id}
              to={`/arena/${topic.id}`}
              className="group flex flex-col gap-4 rounded-xl border border-line bg-canvas p-6 transition-colors hover:border-brand-300"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-ink">{topic.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{topic.description}</p>
              </div>
              <div className="mt-auto text-sm text-ink-muted">
                {getChallenges(topic.id).length} ta masala
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: succeeds (this is the first task that actually imports `src/arena/registry.js` from a route reachable through `main.jsx`, so it exercises the glob logic end-to-end for the first time).

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/ArenaPage.jsx
git commit -m "Turn ArenaPage into a topic grid backed by the arena registry"
```

---

## Task 4: `ChallengeList` and `ChallengeDetail` components

**Files:**
- Create: `src/components/arena/ChallengeDetail.jsx`
- Create: `src/components/arena/ChallengeList.jsx`

**Interfaces:**
- Consumes: `getSqlEngine()` from `@/lib/sqlEngine` (existing). `cn()` from `@/lib/cn` (existing). A challenge object `{ slug, title, difficulty, prompt, starterQuery, solutionQuery }` (Task 1/2).
- Produces: `<ChallengeDetail challenge schema />` and `<ChallengeList challenges activeSlug topicId schema />` — consumed by `ArenaTopicPage` (Task 5). Both components take the same `schema` prop name — the caller passes the topic's schema string through.

- [ ] **Step 1: Create `ChallengeDetail.jsx`**

Create `src/components/arena/ChallengeDetail.jsx`:

```jsx
import { useEffect, useState } from 'react'
import { getSqlEngine } from '@/lib/sqlEngine'
import { cn } from '@/lib/cn'

export default function ChallengeDetail({ challenge, schema }) {
  const [expected, setExpected] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setExpected(null)
    setError(null)

    getSqlEngine()
      .then((SQL) => {
        if (cancelled) return
        const db = new SQL.Database()
        try {
          db.run(schema)
          const output = db.exec(challenge.solutionQuery)
          setExpected(output[0] ?? { columns: [], values: [] })
        } catch (err) {
          setError(err.message)
        } finally {
          db.close()
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })

    return () => {
      cancelled = true
    }
  }, [challenge, schema])

  return (
    <div className="border-t border-line bg-canvas-muted px-4 py-4">
      <p className="whitespace-pre-line text-sm text-ink">{challenge.prompt}</p>

      {error && (
        <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          Kutilgan natijani hisoblashda xatolik: {error}
        </p>
      )}

      {expected && !error && (
        <div className="mt-3">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-muted">
            Kutilgan natija
          </p>
          <div className="overflow-x-auto rounded-md border border-line bg-canvas">
            <table className="w-full text-left text-sm">
              <thead className="bg-canvas-muted text-ink-muted">
                <tr>
                  {expected.columns.map((column) => (
                    <th key={column} className="whitespace-nowrap px-3 py-2 font-medium">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {expected.values.map((row, rowIndex) => (
                  <tr key={rowIndex} className={cn(rowIndex > 0 && 'border-t border-line')}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="whitespace-nowrap px-3 py-2 text-ink">
                        {cell === null ? <span className="text-ink-muted italic">NULL</span> : String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {expected.values.length === 0 && (
              <p className="px-3 py-2 text-sm text-ink-muted">Natija topilmadi (0 qator).</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create `ChallengeList.jsx`**

Create `src/components/arena/ChallengeList.jsx`:

```jsx
import { Link } from 'react-router-dom'
import ChallengeDetail from '@/components/arena/ChallengeDetail'
import { cn } from '@/lib/cn'

const DIFFICULTY_LABELS = { easy: 'Oson', medium: "O'rta", hard: 'Qiyin' }
const DIFFICULTY_STYLES = {
  easy: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  medium: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  hard: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
}

export default function ChallengeList({ challenges, activeSlug, topicId, schema }) {
  return (
    <ul className="flex min-w-0 flex-col divide-y divide-line overflow-hidden rounded-lg border border-line">
      {challenges.map((challenge, index) => {
        const isActive = challenge.slug === activeSlug
        return (
          <li key={challenge.slug} className="bg-canvas">
            <Link
              to={`/arena/${topicId}/${challenge.slug}`}
              className={cn(
                'flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-canvas-muted',
                isActive && 'bg-canvas-muted'
              )}
            >
              <span className="text-ink">
                {index + 1}. {challenge.title}
              </span>
              <span
                className={cn(
                  'shrink-0 rounded-full px-2 py-0.5 text-xs font-medium',
                  DIFFICULTY_STYLES[challenge.difficulty]
                )}
              >
                {DIFFICULTY_LABELS[challenge.difficulty]}
              </span>
            </Link>
            {isActive && <ChallengeDetail challenge={challenge} schema={schema} />}
          </li>
        )
      })}
    </ul>
  )
}
```

- [ ] **Step 3: Verify**

Run: `npm run lint`
Expected: no errors (neither component is imported by a page yet, so `npm run build` won't exercise them — Task 5 wires them in).

- [ ] **Step 4: Commit**

```bash
git add src/components/arena/ChallengeDetail.jsx src/components/arena/ChallengeList.jsx
git commit -m "Add ChallengeList and ChallengeDetail components for the arena workspace"
```

---

## Task 5: `ArenaTopicPage` and routing

**Files:**
- Create: `src/pages/ArenaTopicPage.jsx`
- Modify: `src/App.jsx:6-12,47-50` (add import, add two routes inside the existing `RequireAuth` block)

**Interfaces:**
- Consumes: `getTopic`, `getChallenges`, `getChallenge` from `@/arena/registry` (Task 1/2). `SQL_SCHEMA` from `@/arena/sql/schema` (Task 1). `ChallengeList` (Task 4). `SqlPlayground` from `@/components/content/SqlPlayground` (existing, unmodified). `Breadcrumbs` from `@/components/layout/Breadcrumbs` (existing).
- Produces: the `/arena/:topicId` and `/arena/:topicId/:challengeSlug` routes — the full feature is reachable end-to-end after this task.

- [ ] **Step 1: Create `ArenaTopicPage.jsx`**

Create `src/pages/ArenaTopicPage.jsx`:

```jsx
import { Navigate, useParams } from 'react-router-dom'
import { getTopic, getChallenges, getChallenge } from '@/arena/registry'
import { SQL_SCHEMA } from '@/arena/sql/schema'
import ChallengeList from '@/components/arena/ChallengeList'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import SqlPlayground from '@/components/content/SqlPlayground'

export default function ArenaTopicPage() {
  const { topicId, challengeSlug } = useParams()
  const topic = getTopic(topicId)
  const challenges = getChallenges(topicId)

  if (!topic) return <Navigate to="/not-found" replace />

  if (!challengeSlug) {
    const first = challenges[0]
    if (!first) return <Navigate to="/not-found" replace />
    return <Navigate to={`/arena/${topicId}/${first.slug}`} replace />
  }

  const challenge = getChallenge(topicId, challengeSlug)
  if (!challenge) return <Navigate to="/not-found" replace />

  const schema = topicId === 'sql' ? SQL_SCHEMA : null

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumbs items={[{ label: 'Arena', to: '/arena' }, { label: topic.title }]} />
      <h1 className="text-2xl font-bold text-ink">{topic.title}</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <ChallengeList
          challenges={challenges}
          activeSlug={challenge.slug}
          topicId={topicId}
          schema={schema}
        />
        {topic.hasSandbox && (
          <div className="min-w-0">
            <SqlPlayground key={challenge.slug} schema={schema} initialQuery={challenge.starterQuery} />
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Register the routes in `App.jsx`**

In `src/App.jsx`, add the import next to the other page imports (after `import ArenaPage from '@/pages/ArenaPage'`):

```js
import ArenaTopicPage from '@/pages/ArenaTopicPage'
```

Then replace the single arena route inside the `RequireAuth` block:

```jsx
        <Route path="/arena" element={<ArenaPage />} />
```

with:

```jsx
        <Route path="/arena" element={<ArenaPage />} />
        <Route path="/arena/:topicId" element={<ArenaTopicPage />} />
        <Route path="/arena/:topicId/:challengeSlug" element={<ArenaTopicPage />} />
```

- [ ] **Step 3: Verify**

Run: `npm run build && npm run lint`
Expected: both succeed with no errors.

Run: `npm run dev`, open `/arena`, click the SQL card. Expected: redirects to `/arena/sql/select-basics`, shows the challenge list on the left with the first challenge expanded (prompt + a one-row "Kutilgan natija" table showing all 73 cars... actually the full table), and a working SQL editor on the right seeded with the shared schema. Click a different challenge in the list — the editor remounts (fresh sandbox, its own `starterQuery`) and the left panel shows that challenge's own expected result.

- [ ] **Step 4: Commit**

```bash
git add src/pages/ArenaTopicPage.jsx src/App.jsx
git commit -m "Add ArenaTopicPage and wire up the SQL arena workspace routes"
```

---

## Task 6: Full manual verification pass

**Files:** none (verification only).

**Interfaces:** none — this task exercises everything built in Tasks 1–5.

- [ ] **Step 1: Verify every challenge's `solutionQuery` actually matches its own "expected" table**

With `npm run dev` running, for each of the 12 challenges at `/arena/sql/<slug>`:
1. Note the "Kutilgan natija" table shown in the left panel.
2. Paste that exact challenge's `solutionQuery` (from its file in `src/arena/sql/challenges/`) into the right-hand editor, replacing the starter query.
3. Click "Bajarish" (Run).
4. Confirm the right-hand result table matches the left-hand "Kutilgan natija" table exactly (same columns, same rows).

This is the real correctness check for the seed data and the 12 `solutionQuery` values — a typo in either would show up as a mismatch here.

- [ ] **Step 2: Verify difficulty badges and navigation**

Confirm all 4 "easy" challenges show an emerald "Oson" badge, all 4 "medium" show an amber "O'rta" badge, and all 4 "hard" show a red "Qiyin" badge. Confirm clicking any challenge in the list updates the URL to `/arena/sql/<that-slug>` and the browser back button returns to the previously selected challenge.

- [ ] **Step 3: Verify the auth gate still applies to the new nested routes**

Sign out (or open `/arena/sql/select-basics` in a private/incognito window). Expected: redirected to `/login?redirect=%2Farena%2Fsql%2Fselect-basics` — confirms `RequireAuth` covers the new nested routes, not just `/arena` itself.

- [ ] **Step 4: Verify dark mode**

Toggle dark mode (via `ThemeToggle` in `TopNav`). Expected: difficulty badges, the "Kutilgan natija" error/table backgrounds, and the topic grid card all render with legible contrast — no raw-white-on-dark or raw-black-on-light patches (this is the manual check for the `dark:` variants added in Tasks 3–4, since Tailwind can't be verified by `npm run build`/`lint` alone).

No commit for this task — it's verification only. If any check fails, fix the relevant file from Tasks 1–5 and re-run the affected step.
