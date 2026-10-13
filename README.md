# Mess Manager BD

Offline bilingual (English / Bangla) meal manager for Bangladeshi student messes.
Implements the classic BD "meal system": members log lunch/dinner counts, the
meal manager logs bazaar (grocery) expenses, and each member's bill is their
share of the total cost -- `bill = meals x per-meal rate`, where
`per-meal rate = total bazaar cost / total meals`. Balances are settled against
per-member advances.

**Status:** MVP complete. 136/136 node unit tests + 49/49 headless-Chrome smoke
checks green, 0 console/page errors. Ships EMPTY (no demo members).
Personal tracker -- not accounting software.

## Problem

Student messes in Bangladesh run on a shared meal ledger: every member eats a
different number of meals, one person does the bazaar, and at month end someone
has to split the cost fairly by hand in a notebook. This app replaces the
notebook with an offline, Bengali-friendly calculator that does the split
exactly and keeps the history.

## Features

- **Dashboard** -- stat cards (members, total meals, bazaar cost, meal rate,
  advances, net balance), a meal-rate hero, and a per-member bill table
  (meals, bill, advance, balance with owes/gets-back/settled badges),
  sorted biggest-ower-first.
- **Meals** -- date picker (defaults to today), per-member lunch/dinner
  steppers (0-5), day-total counter, save. Future dates rejected.
- **Members** -- add/edit/delete with inline validation (non-empty, <=60 chars,
  no exact-duplicate names), advance amounts, active/inactive toggle.
  Deleted members' meals are excluded from totals (documented).
- **Bazaar** -- expense entry (date, optional note, amount), newest-first list,
  delete, and a this-month total.
- **Data** -- JSON export (download), JSON import with strict schema
  validation (malformed files rejected, existing data left intact), and
  erase-all with confirmation.
- **Bilingual** -- EN/Bangla toggle, persisted; Bengali digits in BN mode.
- **Offline-first** -- zero network requests by design; works from `file://`.
  Data lives in `localStorage` (key `mess-manager-bd-v1`); corrupted storage
  is detected and the app restarts fresh with a notice.
- **Money as integer paisa** -- no floating-point money anywhere; the meal
  rate is shown with 2 decimals and each bill is `round(meals x rate)`.

## Stack

- Plain HTML + CSS + JavaScript. No frameworks, no build step, no CDNs.
- `logic.js` -- pure, DOM-free logic (also `require()`-able in Node).
- Tests: Node unit tests + headless-Chrome smoke tests over raw CDP.

## Install / run

No install needed. Open `index.html` in any modern browser, or serve it:

```sh
# option 1: just open the file
xdg-open index.html

# option 2: local server
python3 -m http.server 8080
# then visit http://localhost:8080/
```

## Dev commands

```sh
# unit tests (needs only node)
node tests/run-node-tests.js

# browser smoke tests (needs /opt/meta-chromium/chrome on this VM;
# uses raw CDP, no npm packages)
node tests/smoke.mjs .

# ASCII hygiene check (all sources must be pure ASCII;
# Bengali ships as \uXXXX escapes)
grep -rP '[^\x00-\x7F]' index.html logic.js tests/ README.md TEST_RESULTS.md .gitignore \
  && echo "NON-ASCII FOUND" || echo "ASCII CLEAN"
```

The smoke test accepts a `?asof=YYYY-MM-DD` override so "today" is
deterministic (used as `index.html?asof=2026-10-13` in CI-style runs).

## Testing

- `tests/run-node-tests.js` -- 136 assertions: date helpers, money parsing/
  formatting (EN + Bengali digits), member/meal/expense validators and
  boundary cases, the hand-verified billing scenario (see below), sorting,
  delete-excludes-meals, export/import round-trip, 13 malformed-import cases,
  i18n key/placeholder parity, and corrupt-storage recovery.
- `tests/smoke.mjs` -- 49 checks in headless Chrome: full UI flows (add
  members -> log meals for two days -> add expenses -> exact dashboard values),
  inline validation errors, BN toggle with Bengali digits + reload persistence,
  export -> erase -> import round-trip, malformed import rejected with data
  intact, 390px mobile (no horizontal overflow on any tab), and zero
  non-`file://` network requests.

Hand-verified scenario (unit + smoke): Rahim (advance BDT 2000), Karim (BDT 1500),
Sumon (BDT 0); day1 meals 2/2/1, day2 meals 2/1/0 -> totals 4/3/1 = 8 meals;
expenses BDT 800 + BDT 400 = BDT 1200 -> rate BDT 150.00/meal; bills BDT 600/BDT 450/BDT 150;
balances +BDT 1400/+BDT 1050/-BDT 150; table sorted Sumon, Karim, Rahim.

See `TEST_RESULTS.md` for the full recorded results.

## Deployment (GitHub Pages)

This is a static site -- any static host works:

1. Push `index.html`, `logic.js`, `README.md`, `.gitignore` to a repo.
2. Enable GitHub Pages (Settings -> Pages -> Deploy from branch -> `main`).
3. Open `https://<user>.github.io/<repo>/`.

No server, no environment variables, no secrets.

## Limitations

- Single-device: data lives in the browser's `localStorage`; no sync, no
  multi-user, no manager/member roles.
- Rounding: the per-meal rate is a repeating decimal in general; bills are
  rounded per member, so the sum of bills can differ from total cost by a few
  paisa. This is standard for the manual meal system and is shown as-is.
- Inactive members keep their history; only *deleted* members are excluded
  from totals.
- Import replaces all current data (after successful validation only).
- Personal tracker for mess bookkeeping -- not accounting software, not
  financial advice.

## License

MIT -- do what you want, no warranty.
