# SQL Course Content — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author the 28 lesson files for the new `sql` course (`src/courses/sql/`, folder + `course.meta.js` + `database` icon + the `SqlPlayground` primitive + `sqlEngine.js` loader all already built and validated — see git history). This plan covers lesson content only.

**Design doc:** `docs/superpowers/specs/2026-08-20-sql-course-content-design.md` — read for full rationale (audience, the two-phase sample database, hands-on requirement).

**Audience & scope:** Absolute beginners, zero prior SQL/database experience. Core querying through basic DML/DDL. No transactions/indexes/views/window functions/stored procedures/normalization theory — out of scope for this track.

## Global Constraints

Apply to every task in this plan:

- **Language:** Uzbek prose, matching `src/courses/python/lessons/02-variables.jsx`'s tone/register. SQL keywords conventionally uppercase; new terms get a bracketed Uzbek translation on first use per lesson.
- **Primitives only:** `CodeBlock` (`lang="sql"`, `children`), `Callout` (`type`, `title?`, `children`), `Quiz` (`question`, `options` — no duplicate strings, `correctIndex`, `explanation`), `Exercise` (`title?`, `children`) wrapping `Solution` (`children`), `KeyPoints` (`children` as `<li>`s), and `SqlPlayground` (`schema`, `initialQuery?`). Never invent new props or components — if something seems to need a capability the primitive set doesn't have, stop and flag it.
- **Hands-on requirement:** every lesson from Task 2 (lesson 02) onward includes at least one `SqlPlayground` the student actually runs. `initialQuery` must be a real, runnable query — never empty, never a comment-only placeholder.
- **Apostrophe escaping:** any Uzbek string value containing `'` must double it inside SQL (`'Sovg''a sertifikati'`). Check every schema/query sample for this before finishing a task.
- **Verification per task:** `npm run build && npm run lint` must both stay clean after each lesson.
- **Sequencing:** tasks build on prior vocabulary and the schema's Phase 1 → Phase 2 transition at lesson 16 is a hard boundary — do not reorder or parallelize.

### The sample database (copy verbatim into `SqlPlayground schema` props)

**Phase 1 schema** — use for lessons 02–15:

```sql
CREATE TABLE mahsulotlar (
  id INTEGER PRIMARY KEY,
  nom TEXT NOT NULL,
  narx REAL NOT NULL,
  kategoriya TEXT
);

INSERT INTO mahsulotlar (id, nom, narx, kategoriya) VALUES
  (1, 'Noutbuk', 4500000, 'Elektronika'),
  (2, 'Sichqoncha', 85000, 'Elektronika'),
  (3, 'Klaviatura', 210000, 'Elektronika'),
  (4, 'Monitor', 1500000, 'Elektronika'),
  (5, 'Stol lampa', 120000, 'Uy jihozlari'),
  (6, 'Kitob tokchasi', 650000, 'Uy jihozlari'),
  (7, 'Sport krossovka', 380000, 'Kiyim'),
  (8, 'Futbolka', 95000, 'Kiyim'),
  (9, 'Ryukzak', 275000, NULL),
  (10, 'Sovg''a sertifikati', 200000, NULL);
```

**Phase 2 schema** — use for lessons 16–28 (superset of Phase 1: same `mahsulotlar` table plus three more):

```sql
CREATE TABLE mahsulotlar (
  id INTEGER PRIMARY KEY,
  nom TEXT NOT NULL,
  narx REAL NOT NULL,
  kategoriya TEXT
);

CREATE TABLE mijozlar (
  id INTEGER PRIMARY KEY,
  ism TEXT NOT NULL,
  email TEXT,
  shahar TEXT
);

CREATE TABLE buyurtmalar (
  id INTEGER PRIMARY KEY,
  mijoz_id INTEGER,
  sana TEXT,
  FOREIGN KEY (mijoz_id) REFERENCES mijozlar(id)
);

CREATE TABLE buyurtma_tafsilotlari (
  id INTEGER PRIMARY KEY,
  buyurtma_id INTEGER,
  mahsulot_id INTEGER,
  miqdor INTEGER,
  FOREIGN KEY (buyurtma_id) REFERENCES buyurtmalar(id),
  FOREIGN KEY (mahsulot_id) REFERENCES mahsulotlar(id)
);

INSERT INTO mahsulotlar (id, nom, narx, kategoriya) VALUES
  (1, 'Noutbuk', 4500000, 'Elektronika'),
  (2, 'Sichqoncha', 85000, 'Elektronika'),
  (3, 'Klaviatura', 210000, 'Elektronika'),
  (4, 'Monitor', 1500000, 'Elektronika'),
  (5, 'Stol lampa', 120000, 'Uy jihozlari'),
  (6, 'Kitob tokchasi', 650000, 'Uy jihozlari'),
  (7, 'Sport krossovka', 380000, 'Kiyim'),
  (8, 'Futbolka', 95000, 'Kiyim'),
  (9, 'Ryukzak', 275000, NULL),
  (10, 'Sovg''a sertifikati', 200000, NULL);

INSERT INTO mijozlar (id, ism, email, shahar) VALUES
  (1, 'Aziz Karimov', 'aziz@mail.uz', 'Toshkent'),
  (2, 'Malika Yusupova', 'malika@mail.uz', 'Samarqand'),
  (3, 'Vali Rashidov', NULL, 'Buxoro'),
  (4, 'Dilnoza Xolova', 'dilnoza@mail.uz', 'Toshkent'),
  (5, 'Sardor Rustamov', 'sardor@mail.uz', NULL),
  (6, 'Zarina Nabieva', 'zarina@mail.uz', 'Samarqand');

INSERT INTO buyurtmalar (id, mijoz_id, sana) VALUES
  (1, 1, '2026-01-05'),
  (2, 2, '2026-01-07'),
  (3, 1, '2026-01-12'),
  (4, 3, '2026-01-15'),
  (5, 4, '2026-01-20'),
  (6, 2, '2026-01-22'),
  (7, 5, '2026-01-25'),
  (8, 1, '2026-02-01'),
  (9, 4, '2026-02-03'),
  (10, 3, '2026-02-10');

INSERT INTO buyurtma_tafsilotlari (id, buyurtma_id, mahsulot_id, miqdor) VALUES
  (1, 1, 1, 1),
  (2, 1, 2, 1),
  (3, 2, 3, 2),
  (4, 2, 8, 1),
  (5, 3, 4, 3),
  (6, 4, 6, 1),
  (7, 5, 7, 2),
  (8, 5, 4, 1),
  (9, 6, 1, 1),
  (10, 7, 8, 1),
  (11, 8, 2, 3),
  (12, 9, 5, 1),
  (13, 10, 6, 2);
```

Note customer 6 (Zarina) has zero orders (LEFT JOIN payoff, lesson 18), customer 3 has a `NULL` email and customer 5 a `NULL` city, and products 9–10 have `NULL` category — all deliberate, all referenced by specific later lessons.

---

## Task 1: Lesson 01 — Ma'lumotlar bazasi va SQL nima?

**Files:** Create `src/courses/sql/lessons/01-malumotlar-bazasi-va-sql-nima.jsx`

**Interfaces:** Consumes: nothing (first lesson). Produces: "ma'lumotlar bazasi", "jadval", "SQL" vocabulary assumed known from here on.

**meta:** `{ title: 'Ma\'lumotlar bazasi va SQL nima?', section: 'Kirish' }`

**Must cover:** What a database is (an organized place to store structured data) and why spreadsheets don't scale; what a table is at a conceptual level; what SQL is (a language for asking questions of that data) and where it's used (web apps, analytics, etc.). No `SqlPlayground` in this lesson — pure orientation. End with `KeyPoints`, at least one `Quiz`, at least one `Exercise`+`Solution` (a conceptual exercise, e.g. "name three kinds of apps that use a database").

---

## Task 2: Lesson 02 — Jadvallar, qatorlar va ustunlar

**Files:** Create `src/courses/sql/lessons/02-jadval-qator-va-ustun.jsx`

**Interfaces:** Consumes: Task 1's concepts. Produces: the `mahsulotlar` table students will reuse through lesson 15; "qator (row)"/"ustun (column)"/"asosiy kalit (primary key)" vocabulary.

**meta:** `{ title: 'Jadvallar, qatorlar va ustunlar', section: 'Kirish' }`

**Must cover:** Introduce the `mahsulotlar` table (Phase 1 schema) as a concrete example; rows vs. columns; what a primary key is and why `id` is one. First-ever `SqlPlayground` in the course — `schema` = Phase 1 schema, `initialQuery="SELECT * FROM mahsulotlar;"`, with prose walking through what the result means. End with `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 3: Lesson 03 — SELECT va FROM

**Files:** Create `src/courses/sql/lessons/03-select-va-from.jsx`

**Interfaces:** Consumes: `mahsulotlar` table from Task 2. Produces: `SELECT`/`FROM` fluency assumed from here on.

**meta:** `{ title: 'SELECT va FROM', section: 'SELECT asoslari' }`

**Must cover:** `SELECT * FROM table` vs. selecting specific columns (`SELECT nom, narx FROM mahsulotlar`); column order in the result follows the SELECT list, not the table definition. `SqlPlayground` (Phase 1 schema) practicing both forms. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 4: Lesson 04 — WHERE — filtrlash

**Files:** Create `src/courses/sql/lessons/04-where.jsx`

**Interfaces:** Consumes: SELECT/FROM (Task 3). Produces: `WHERE` fluency, used in nearly every later lesson.

**meta:** `{ title: 'WHERE — filtrlash', section: 'SELECT asoslari' }`

**Must cover:** Basic row filtering with `WHERE` (e.g. `WHERE kategoriya = 'Elektronika'`); filtering happens before column selection conceptually. `SqlPlayground` practicing a filter. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 5: Lesson 05 — Solishtirish operatorlari

**Files:** Create `src/courses/sql/lessons/05-solishtirish-operatorlari.jsx`

**Interfaces:** Consumes: WHERE (Task 4). Produces: comparison-operator fluency.

**meta:** `{ title: 'Solishtirish operatorlari', section: 'SELECT asoslari' }`

**Must cover:** `= != > < >= <=` with numeric (`narx`) and text (`kategoriya`) examples; note `!=` vs `<>` (both work in SQLite, pick one convention and stay consistent — recommend `!=`). `SqlPlayground` exercising at least two operators. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 6: Lesson 06 — ORDER BY

**Files:** Create `src/courses/sql/lessons/06-order-by.jsx`

**Interfaces:** Consumes: WHERE/comparisons (Tasks 4–5). Produces: sorting fluency.

**meta:** `{ title: 'ORDER BY', section: 'SELECT asoslari' }`

**Must cover:** `ORDER BY column`, default ascending, `DESC`; multi-column sort (`ORDER BY kategoriya, narx DESC`) and how ties are broken by the second column. `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 7: Lesson 07 — LIMIT

**Files:** Create `src/courses/sql/lessons/07-limit.jsx`

**Interfaces:** Consumes: ORDER BY (Task 6) — LIMIT is most useful combined with it ("top N"). Produces: LIMIT fluency.

**meta:** `{ title: 'LIMIT', section: 'SELECT asoslari' }`

**Must cover:** `LIMIT n` capping result rows; the "top N most expensive products" pattern (`ORDER BY narx DESC LIMIT 3`) as the motivating example, explicitly tying back to Task 6. `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 8: Lesson 08 — AND, OR, NOT

**Files:** Create `src/courses/sql/lessons/08-and-or-not.jsx`

**Interfaces:** Consumes: WHERE/comparisons. Produces: combined-condition fluency used throughout the rest of the course.

**meta:** `{ title: 'AND, OR, NOT', section: 'Murakkab filtrlash' }`

**Must cover:** Combining conditions with `AND`/`OR`/`NOT`; operator precedence gotcha (`AND` binds tighter than `OR`) and using parentheses to be explicit — one concrete example where omitting parentheses changes the result. `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 9: Lesson 09 — NULL bilan ishlash

**Files:** Create `src/courses/sql/lessons/09-null.jsx`

**Interfaces:** Consumes: WHERE (Task 4). Produces: NULL-handling fluency, directly relevant again at Task 18 (LEFT JOIN) and Task 24 (UPDATE safety).

**meta:** `{ title: 'NULL bilan ishlash', section: 'Murakkab filtrlash' }`

**Must cover:** What `NULL` means (absence of a value, not zero/empty string); `WHERE kategoriya = NULL` never matches anything (demonstrate this surprising behavior in the playground); `IS NULL` / `IS NOT NULL` as the correct tools, using the two `NULL`-`kategoriya` rows (Ryukzak, Sovg'a sertifikati). `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 10: Lesson 10 — IN va BETWEEN

**Files:** Create `src/courses/sql/lessons/10-in-va-between.jsx`

**Interfaces:** Consumes: WHERE/comparisons. Produces: IN/BETWEEN fluency.

**meta:** `{ title: 'IN va BETWEEN', section: 'Murakkab filtrlash' }`

**Must cover:** `IN (...)` as a shorthand for multiple `OR`s on the same column (explicitly show the equivalent `OR` chain first, then the `IN` rewrite); `BETWEEN a AND b` as inclusive range filtering on `narx`. `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 11: Lesson 11 — LIKE

**Files:** Create `src/courses/sql/lessons/11-like.jsx`

**Interfaces:** Consumes: WHERE. Produces: pattern-matching fluency.

**meta:** `{ title: 'LIKE', section: 'Murakkab filtrlash' }`

**Must cover:** `LIKE` with `%` (any number of characters) and `_` (exactly one character) wildcards on `nom`; case-sensitivity note (SQLite's default `LIKE` is case-insensitive for ASCII, worth one line). `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 12: Lesson 12 — DISTINCT

**Files:** Create `src/courses/sql/lessons/12-distinct.jsx`

**Interfaces:** Consumes: SELECT. Produces: DISTINCT fluency, useful again conceptually at Task 14 (GROUP BY does something related but different — worth a forward one-liner).

**meta:** `{ title: 'DISTINCT', section: 'Murakkab filtrlash' }`

**Must cover:** `SELECT DISTINCT kategoriya FROM mahsulotlar` to list unique categories; contrast against `SELECT kategoriya FROM mahsulotlar` (which repeats). `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 13: Lesson 13 — Agregat funksiyalar

**Files:** Create `src/courses/sql/lessons/13-agregat-funksiyalar.jsx`

**Interfaces:** Consumes: WHERE, comparisons. Produces: aggregate-function fluency that Tasks 14–15 (GROUP BY/HAVING) directly build on.

**meta:** `{ title: 'Agregat funksiyalar', section: 'Agregatsiya' }`

**Must cover:** `COUNT(*)`, `SUM(narx)`, `AVG(narx)`, `MIN(narx)`, `MAX(narx)` — each with its own example over the whole `mahsulotlar` table (no GROUP BY yet, that's next lesson). `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 14: Lesson 14 — GROUP BY

**Files:** Create `src/courses/sql/lessons/14-group-by.jsx`

**Interfaces:** Consumes: aggregates (Task 13). Produces: GROUP BY fluency Task 15 (HAVING) directly builds on.

**meta:** `{ title: 'GROUP BY', section: 'Agregatsiya' }`

**Must cover:** `GROUP BY kategoriya` combined with `COUNT(*)`/`AVG(narx)` per category; the mental model (split rows into buckets by the grouped column, then aggregate within each bucket). `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 15: Lesson 15 — HAVING

**Files:** Create `src/courses/sql/lessons/15-having.jsx`

**Interfaces:** Consumes: GROUP BY (Task 14). Produces: HAVING fluency; last lesson of the Phase 1 (single-table) schema.

**meta:** `{ title: 'HAVING', section: 'Agregatsiya' }`

**Must cover:** `HAVING` filters *after* grouping/aggregating, `WHERE` filters *before* — a direct side-by-side contrast is required (e.g. `HAVING COUNT(*) > 2` to find categories with more than 2 products), plus why `WHERE COUNT(*) > 2` is invalid SQL (aggregates don't exist yet at the WHERE stage). `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 16: Lesson 16 — Nega bir nechta jadval kerak?

**Files:** Create `src/courses/sql/lessons/16-nega-bir-nechta-jadval.jsx`

**Interfaces:** Consumes: everything through Task 15. Produces: introduces the Phase 2 schema (`mijozlar`, `buyurtmalar`, `buyurtma_tafsilotlari`) and "foreign key" vocabulary that every remaining lesson depends on.

**meta:** `{ title: 'Nega bir nechta jadval kerak?', section: 'JOIN' }`

**Must cover:** Why cramming everything into one table causes repetition/inconsistency (a brief "what if we stored customer info on every order row" thought experiment); introduce the full Phase 2 schema and what a foreign key is (`buyurtmalar.mijoz_id` referencing `mijozlar.id`); a `SqlPlayground` just exploring the new tables separately (no JOIN yet — that's next lesson). `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 17: Lesson 17 — INNER JOIN

**Files:** Create `src/courses/sql/lessons/17-inner-join.jsx`

**Interfaces:** Consumes: Phase 2 schema (Task 16). Produces: INNER JOIN fluency, directly built on by Tasks 18–19.

**meta:** `{ title: 'INNER JOIN', section: 'JOIN' }`

**Must cover:** `SELECT ... FROM mijozlar JOIN buyurtmalar ON mijozlar.id = buyurtmalar.mijoz_id` — combining matched rows; explicitly note unmatched rows (customers with no orders) are dropped, setting up the LEFT JOIN contrast next lesson. `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 18: Lesson 18 — LEFT JOIN

**Files:** Create `src/courses/sql/lessons/18-left-join.jsx`

**Interfaces:** Consumes: INNER JOIN (Task 17), NULL handling (Task 9 — unmatched columns come back NULL). Produces: LEFT JOIN fluency.

**meta:** `{ title: 'LEFT JOIN', section: 'JOIN' }`

**Must cover:** `LEFT JOIN` keeps every row from the left table even with no match, filling unmatched right-side columns with `NULL`; use Zarina Nabieva (customer 6, zero orders) as the concrete payoff — she appears in a LEFT JOIN but not an INNER JOIN, demonstrate both side by side. `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 19: Lesson 19 — Bir nechta jadvalni birlashtirish

**Files:** Create `src/courses/sql/lessons/19-kop-jadval-birlashtirish.jsx`

**Interfaces:** Consumes: INNER/LEFT JOIN (Tasks 17–18). Produces: multi-join fluency; last lesson before "Kengaytirilgan so'rovlar".

**meta:** `{ title: 'Bir nechta jadvalni birlashtirish', section: 'JOIN' }`

**Must cover:** Joining all 4 tables in one query (`mijozlar` → `buyurtmalar` → `buyurtma_tafsilotlari` → `mahsulotlar`) to answer "which customer bought which product" — build it up incrementally (2 tables, then 3, then 4) rather than dropping the full join at once. `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 20: Lesson 20 — Quyi so'rovlar (Subqueries)

**Files:** Create `src/courses/sql/lessons/20-quyi-sorovlar.jsx`

**Interfaces:** Consumes: JOIN fluency, IN (Task 10). Produces: subquery fluency.

**meta:** `{ title: "Quyi so'rovlar (Subqueries)", section: "Kengaytirilgan so'rovlar" }`

**Must cover:** A query inside a query — e.g. `SELECT nom FROM mahsulotlar WHERE id IN (SELECT mahsulot_id FROM buyurtma_tafsilotlari)` (products that have been ordered at least once); explain the inner query runs first/conceptually independently. `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 21: Lesson 21 — Taxalluslar (Aliases)

**Files:** Create `src/courses/sql/lessons/21-taxalluslar.jsx`

**Interfaces:** Consumes: JOIN fluency (multi-table queries get unwieldy without aliases). Produces: alias fluency used freely from here on.

**meta:** `{ title: 'Taxalluslar (Aliases)', section: "Kengaytirilgan so'rovlar" }`

**Must cover:** Column aliases (`SELECT narx AS narxi`), table aliases (`FROM mijozlar AS m JOIN buyurtmalar AS b ON m.id = b.mijoz_id`) — rewrite a Task 19-style join query with aliases to show the readability win. `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 22: Lesson 22 — CASE

**Files:** Create `src/courses/sql/lessons/22-case.jsx`

**Interfaces:** Consumes: SELECT, comparisons. Produces: CASE fluency; last lesson of "Kengaytirilgan so'rovlar".

**meta:** `{ title: 'CASE', section: "Kengaytirilgan so'rovlar" }`

**Must cover:** `CASE WHEN ... THEN ... ELSE ... END` inside a SELECT list — e.g. labeling products as "Qimmat"/"O'rtacha"/"Arzon" by price tier. `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 23: Lesson 23 — INSERT

**Files:** Create `src/courses/sql/lessons/23-insert.jsx`

**Interfaces:** Consumes: Phase 2 schema. Produces: INSERT fluency.

**meta:** `{ title: 'INSERT', section: "Ma'lumotlarni o'zgartirish" }`

**Must cover:** `INSERT INTO mijozlar (ism, email, shahar) VALUES (...)` adding a new customer; note `id` can be omitted if it's an `INTEGER PRIMARY KEY` (auto-assigned); a `SqlPlayground` where the student inserts a row, then runs a `SELECT` to confirm it's there (explicitly walk through "run SELECT again to check" as the verification habit). `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 24: Lesson 24 — UPDATE

**Files:** Create `src/courses/sql/lessons/24-update.jsx`

**Interfaces:** Consumes: INSERT (Task 23), WHERE. Produces: UPDATE fluency.

**meta:** `{ title: 'UPDATE', section: "Ma'lumotlarni o'zgartirish" }`

**Must cover:** `UPDATE mijozlar SET shahar = '...' WHERE id = ...`; the "forgot WHERE" danger — demonstrate (in prose, and/or by having the student try it in the playground and then Reset) that omitting `WHERE` updates every row. `Callout type="warning"` on this specifically. `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 25: Lesson 25 — DELETE

**Files:** Create `src/courses/sql/lessons/25-delete.jsx`

**Interfaces:** Consumes: UPDATE (Task 24) — same WHERE-safety lesson applies. Produces: DELETE fluency; last DML lesson.

**meta:** `{ title: 'DELETE', section: "Ma'lumotlarni o'zgartirish" }`

**Must cover:** `DELETE FROM mijozlar WHERE id = ...`; same forgot-WHERE danger as Task 24, explicitly cross-referenced rather than re-explained from scratch. `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 26: Lesson 26 — CREATE TABLE

**Files:** Create `src/courses/sql/lessons/26-create-table.jsx`

**Interfaces:** Consumes: the whole schema as prior art to model against. Produces: CREATE TABLE fluency; the `sharhlar` (reviews) table this lesson has the student create becomes the subject of Task 27.

**meta:** `{ title: 'CREATE TABLE', section: 'Jadval yaratish' }`

**Must cover:** `CREATE TABLE` syntax, common column types (`INTEGER`, `TEXT`, `REAL`); the student builds a `sharhlar` table (`id INTEGER PRIMARY KEY, mahsulot_id INTEGER, matn TEXT, baho INTEGER`) themselves in the `SqlPlayground` (schema prop seeds Phase 2 as usual, but `initialQuery` is a starter `CREATE TABLE` statement with a blank/TODO the student completes), then inserts a row and selects it back to confirm. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 27: Lesson 27 — PRIMARY KEY va FOREIGN KEY

**Files:** Create `src/courses/sql/lessons/27-primary-va-foreign-key.jsx`

**Interfaces:** Consumes: CREATE TABLE (Task 26), foreign keys (Task 16). Produces: keys fluency; last lesson before the capstone.

**meta:** `{ title: 'PRIMARY KEY va FOREIGN KEY', section: 'Jadval yaratish' }`

**Must cover:** What a primary key guarantees (uniqueness, one row's identity); what a foreign key does (references another table's primary key, keeps data consistent) — revisit `buyurtmalar.mijoz_id → mijozlar.id` from Task 16, then extend Task 26's `sharhlar` table with a proper `FOREIGN KEY (mahsulot_id) REFERENCES mahsulotlar(id)` clause. `SqlPlayground`. `KeyPoints`, `Quiz`, `Exercise`+`Solution`.

---

## Task 28: Lesson 28 — Yakuniy loyiha (capstone)

**Files:** Create `src/courses/sql/lessons/28-yakuniy-loyiha.jsx`

**Interfaces:** Consumes: everything (SELECT, filtering, aggregation, JOIN, subqueries, DML, DDL). Produces: nothing further (last lesson).

**meta:** `{ title: 'Yakuniy loyiha', section: 'Amaliy loyiha' }`

**Must cover:** A series of 5–6 real business questions posed in prose, each with its own `SqlPlayground` (Phase 2 schema) for the student to answer themselves before a `Solution` reveals the reference query — e.g. "Qaysi shaharda eng ko'p mijoz bor?", "Eng ko'p sotilgan mahsulot qaysi?", "Hech qanday buyurtma bermagan mijozlarni toping" (LEFT JOIN payoff), "Har bir mijozning umumiy xarid summasi qancha?" (JOIN + SUM + GROUP BY). This lesson still needs both a standalone `Exercise`+`Solution` *and* the per-question playgrounds — they're not mutually exclusive here, the whole lesson is exercise-shaped. End with `KeyPoints` summarizing the full course, and at least one `Quiz`.

---

## Final check

After Task 28's review is clean: `npm run build && npm run lint` must both pass. Then one full manual pass with `npm run dev`: confirm the sidebar shows all 9 sections in the right order with lessons correctly grouped, prev/next navigation works end-to-end from lesson 01 through the capstone, and spot-check several `SqlPlayground` instances across different lessons (run a query, confirm results, try Reset) — this is the one point in the whole pass worth an actual browser check, since lesson content is where a schema-copy mistake or a subtly wrong query would first surface, even though the primitive itself is already validated.
