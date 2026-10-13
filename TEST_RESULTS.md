# TEST_RESULTS.md -- mess-manager-bd (run #50, 2026-10-13 10:00 slot)

## Summary

- Node unit: **136/136 passed**
- Headless-Chrome smoke: **49/49 passed** (two consecutive full runs, 0 console/page errors)
- ASCII hygiene: `grep -P '[^\x00-\x7F]'` -> **0 matches** across
  `index.html`, `logic.js`, `tests/*`, `README.md`, `TEST_RESULTS.md`, `.gitignore`
  (Bengali ships as `\uXXXX` escapes; verified by decode round-trip against the
  Bengali source text)
- Network: **0 non-`file://` requests** by design (no CDNs, no webfonts)

## Unit tests (`node tests/run-node-tests.js`) -- 136/136

| Area | Checks |
|---|---|
| Date helpers | todayISO format; strict ISO incl. leap-day 2024-02-29 ok / 2023-02-29 rejected / month 13 / day 32 / garbage / non-padded; future-date guard with `asof` |
| Money (integer paisa) | toPaisa: `150`->15000, `150.5`->15050, `0.99`->99, `1,200.50`->120050, `0`->0; rejected: 3dp, garbage, empty, trailing dot; `-5`->`neg`; fmtMoney EN: `BDT 150.00`, `-BDT 150.00`, `BDT 12,345,678.90`; BN: `BDT 150.00`; parseBDT max boundary |
| Members | empty/long(61)/duplicate (case-insensitive + trimmed) names rejected; negative/over-max advance rejected; add/edit/delete/deactivate ok; edit-to-duplicate rejected |
| Meals | slot 6, -1, 1.5 rejected; 5/5 ok; future/invalid date rejected; unknown member rejected; 0/0 removes entry; day total |
| **Hand-verified billing scenario** | Rahim 4 meals / Karim 3 / Sumon 1; total 8; cost 120000p; **rate 15000p = BDT 150.00**; bills 60000/45000/15000p; balances +140000/+105000/-15000p; sort order Sumon, Karim, Rahim; net 230000p |
| Empty-state math | rate null with no meals (divide-by-zero guard); bill 0; balance = advance |
| Expenses | future date, 121-char note, zero/negative/over-max amounts rejected; newest-first sort; monthly totals |
| Export/import | round-trip exact (members/mealDays/expenses/settings); `app:"mess-manager-bd"`; integer paisa in payload; **13 malformed cases rejected** (non-JSON, wrong app, wrong version, missing data, negative/float advance, empty name, dup names, meal 6, bad meal date, negative expense, bad expense date, bad lang); valid import still works after all rejections |
| i18n | 95 keys EN/BN parity; no empty values; `{min}`/`{max}`/`{n}` placeholder sets match per key; missing-key and unknown-lang fallback |
| Storage | empty -> blank; garbage JSON -> corrupt+blank; schema-invalid -> corrupt+blank; save->load round-trip exact |

## Smoke tests (`node tests/smoke.mjs .`, raw CDP, `/opt/meta-chromium/chrome`, `file://?asof=2026-10-13`) -- 49/49

- App boots; dashboard empty state; meal date defaults to `asof` (2026-10-13)
- Add 3 members via UI; exact-duplicate name and empty name rejected inline
- Meals tab: log day1 (2026-10-12) 2/2/1 -> day total 5; save -> toast; log day2 2/1/0 -> day total 3; save
- Bazaar tab: add BDT 800 + BDT 400 -> monthly total `BDT 1,200.00`
- Dashboard exact values: rate hero `BDT 150.00`; bill rows in order
  Sumon (1 meal, BDT 150.00 bill, BDT 0.00 advance, -BDT 150.00, "owes"),
  Karim (3, BDT 450.00, BDT 1,500.00, BDT 1,050.00, "gets back"),
  Rahim (4, BDT 600.00, BDT 2,000.00, BDT 1,400.00, "gets back")
- BN toggle: hero renders `BDT 150.00`, badges in Bengali, persists after reload (toggle shows EN)
- Export -> `window.__lastExport` valid JSON -> erase-all (modal confirm) -> data cleared -> import round-trip -> 3 rows + rate restored
- Malformed import rejected with inline error; data intact (3 rows, rate BDT 150.00)
- 390px viewport: `document.documentElement.scrollWidth <= 391` on all 5 tabs
- 0 non-file network requests; 0 console errors; 0 page errors

## Repairs

- **0 app-logic bugs found by tests.** Two consecutive full green runs.
- Build-hygiene fixes during authoring (before any test ran): stray non-ASCII
  bytes introduced while writing sources were replaced with `\uXXXX` escapes
  (`TAKA_SIGN`, the BN language-button label, a middle-dot separator).
- One smoke-runner flake on the very first invocation (a DOM check threw
  `null.hidden` while the page was provably fine -- a cold-start race against a
  lingering debug-session port); the next two full runs were 49/49 with no
  changes to the app. Not counted as an app repair.

## Notes / discrepancies

- None. The hand-verified scenario in the run brief (rate 120000/8 = 15000p =
  BDT 150.00/meal) matches the implementation exactly.
- Rounding: bills are `round(meals x rate)` per member; the sum of bills may
  differ from total cost by a few paisa on non-even splits (documented in README).
