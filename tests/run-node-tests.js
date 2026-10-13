"use strict";
// Node unit tests for mess-manager-bd logic.js. Pure ASCII sources.
const M = require("../logic.js");

let pass = 0, fail = 0;
const failures = [];
function eq(a, b, msg) {
  const sa = JSON.stringify(a), sb = JSON.stringify(b);
  if (sa === sb) { pass++; }
  else { fail++; failures.push(msg + " | got " + sa + " want " + sb); }
}
function ok(c, msg) {
  if (c) { pass++; } else { fail++; failures.push(msg); }
}

// localStorage stub for storage tests
global.localStorage = {
  _s: {},
  getItem(k) { return Object.prototype.hasOwnProperty.call(this._s, k) ? this._s[k] : null; },
  setItem(k, v) { this._s[k] = String(v); },
  removeItem(k) { delete this._s[k]; },
  clear() { this._s = {}; }
};

const TAKA = "\u09F3"; // taka sign U+09F3
const T = TAKA;

/* ---------- dates ---------- */
ok(/^\d{4}-\d{2}-\d{2}$/.test(M.todayISO()), "todayISO format");
eq(M.isValidISODate("2026-10-13"), true, "valid ISO");
eq(M.isValidISODate("2024-02-29"), true, "leap day valid");
eq(M.isValidISODate("2023-02-29"), false, "non-leap Feb29 invalid");
eq(M.isValidISODate("2026-13-01"), false, "month 13 invalid");
eq(M.isValidISODate("2026-10-32"), false, "day 32 invalid");
eq(M.isValidISODate("abc"), false, "garbage invalid");
eq(M.isValidISODate("2026-1-5"), false, "non-padded invalid");
eq(M.isFutureDate("2026-10-14", "2026-10-13"), true, "future detected");
eq(M.isFutureDate("2026-10-13", "2026-10-13"), false, "same day not future");
eq(M.validateDate("2026-10-14", "2026-10-13"), "errDateFuture", "validateDate future");
eq(M.validateDate("2026-02-30", "2026-10-13"), "errDateInvalid", "validateDate invalid");
eq(M.validateDate("2026-10-13", "2026-10-13"), null, "validateDate ok");

/* ---------- money ---------- */
eq(M.toPaisa("150"), { ok: true, paisa: 15000 }, "toPaisa 150");
eq(M.toPaisa("150.5"), { ok: true, paisa: 15050 }, "toPaisa 150.5");
eq(M.toPaisa("0.99"), { ok: true, paisa: 99 }, "toPaisa 0.99");
eq(M.toPaisa("1,200.50"), { ok: true, paisa: 120050 }, "toPaisa grouped");
eq(M.toPaisa("0"), { ok: true, paisa: 0 }, "toPaisa zero");
eq(M.toPaisa("1.234"), { ok: false, err: "bad" }, "toPaisa 3dp rejected");
eq(M.toPaisa("abc"), { ok: false, err: "bad" }, "toPaisa garbage rejected");
eq(M.toPaisa(""), { ok: false, err: "bad" }, "toPaisa empty rejected");
eq(M.toPaisa("-5"), { ok: false, err: "neg" }, "toPaisa negative flagged");
eq(M.toPaisa("12."), { ok: false, err: "bad" }, "toPaisa trailing dot rejected");
eq(M.fmtMoney(15000, "en"), T + "150.00", "fmtMoney en basic");
eq(M.fmtMoney(-15000, "en"), "-" + T + "150.00", "fmtMoney en negative");
eq(M.fmtMoney(1234567890, "en"), T + "12,345,678.90", "fmtMoney en grouping");
eq(M.fmtMoney(15000, "bn"), TAKA + "\u09E7\u09EB\u09E6.\u09E6\u09E6", "fmtMoney bn digits");
eq(M.bnDigits("150.00"), "\u09E7\u09EB\u09E6.\u09E6\u09E6", "bnDigits");
eq(M.parseBDT("1000000", M.MAX_ADVANCE_BDT), { ok: true, paisa: 100000000 }, "parseBDT at max");
eq(M.parseBDT("1000000.01", M.MAX_ADVANCE_BDT), { ok: false, err: "max" }, "parseBDT over max");

/* ---------- members ---------- */
(function () {
  const st = M.blankState();
  eq(M.addMember(st, "   ", 0).err, "errNameEmpty", "empty name rejected");
  eq(M.addMember(st, "x".repeat(61), 0).err, "errNameLong", "long name rejected");
  eq(M.addMember(st, "x".repeat(60), 0).ok, true, "60-char name ok");
  eq(M.addMember(st, "Rahim", -100).err, "errAdvanceNeg", "negative advance rejected");
  eq(M.addMember(st, "Rahim", 100000001).err, "errAdvanceMax", "over-max advance rejected");
  const r = M.addMember(st, "Rahim", 200000);
  eq(r.ok, true, "addMember ok");
  eq(M.addMember(st, "rahim", 0).err, "errNameDup", "duplicate name (case-insensitive) rejected");
  eq(M.addMember(st, "  Rahim  ", 0).err, "errNameDup", "duplicate name (trimmed) rejected");
  eq(M.editMember(st, r.member.id, "Karim", 150000).ok, true, "editMember ok");
  eq(M.editMember(st, r.member.id, "Karim", 0).ok, true, "editMember same-name ok");
  M.addMember(st, "Sumon", 0);
  eq(M.editMember(st, r.member.id, "sumon", 0).err, "errNameDup", "edit to dup name rejected");
  eq(M.deleteMember(st, "nope").ok, false, "delete unknown member fails");
  eq(M.setMemberActive(st, r.member.id, false).member.active, false, "deactivate ok");
})();

/* ---------- meals ---------- */
(function () {
  const st = M.blankState();
  const a = M.addMember(st, "Rahim", 0).member;
  eq(M.setMeals(st, "2026-10-13", a.id, 6, 0, "2026-10-13").err, "errMealRange", "meal 6 rejected");
  eq(M.setMeals(st, "2026-10-13", a.id, -1, 0, "2026-10-13").err, "errMealRange", "meal -1 rejected");
  eq(M.setMeals(st, "2026-10-13", a.id, 1.5, 0, "2026-10-13").err, "errMealRange", "meal 1.5 rejected");
  eq(M.setMeals(st, "2026-10-13", a.id, 5, 5, "2026-10-13").ok, true, "meal 5/5 ok");
  eq(M.setMeals(st, "2026-10-14", a.id, 1, 0, "2026-10-13").err, "errDateFuture", "future meal date rejected");
  eq(M.setMeals(st, "2026-02-30", a.id, 1, 0, "2026-10-13").err, "errDateInvalid", "invalid meal date rejected");
  eq(M.setMeals(st, "2026-10-13", "ghost", 1, 0, "2026-10-13").err, "noMember", "unknown member rejected");
  eq(M.setMeals(st, "2026-10-13", a.id, 0, 0, "2026-10-13").ok, true, "0/0 clears entry");
  eq(M.getDayMeals(st, "2026-10-13")[a.id], undefined, "entry removed after 0/0");
  M.setMeals(st, "2026-10-13", a.id, 1, 2, "2026-10-13");
  eq(M.dayTotalMeals(st, "2026-10-13"), 3, "day total 3");
})();

/* ---------- hand-verified scenario ---------- */
function buildScenario() {
  const st = M.blankState();
  const rahim = M.addMember(st, "Rahim", 200000).member;   // advance 2000.00 BDT
  const karim = M.addMember(st, "Karim", 150000).member;   // advance 1500.00 BDT
  const sumon = M.addMember(st, "Sumon", 0).member;
  const A = "2026-10-13";
  // day1 = 2026-10-12, day2 = 2026-10-13
  M.setMeals(st, "2026-10-12", rahim.id, 1, 1, A);
  M.setMeals(st, "2026-10-12", karim.id, 1, 1, A);
  M.setMeals(st, "2026-10-12", sumon.id, 1, 0, A);
  M.setMeals(st, "2026-10-13", rahim.id, 1, 1, A);
  M.setMeals(st, "2026-10-13", karim.id, 1, 0, A);
  M.setMeals(st, "2026-10-13", sumon.id, 0, 0, A);
  M.addExpense(st, "2026-10-12", "bazaar", 80000, A);
  M.addExpense(st, "2026-10-13", "bazaar", 40000, A);
  return { st, rahim, karim, sumon };
}
(function () {
  const { st, rahim, karim, sumon } = buildScenario();
  eq(M.memberMeals(st, rahim.id), 4, "Rahim meals = 4");
  eq(M.memberMeals(st, karim.id), 3, "Karim meals = 3");
  eq(M.memberMeals(st, sumon.id), 1, "Sumon meals = 1");
  eq(M.totalMeals(st), 8, "total meals = 8");
  eq(M.totalCost(st), 120000, "total cost = 120000p");
  eq(M.mealRatePaisa(st), 15000, "rate = 15000p/meal");
  eq(M.memberBillPaisa(st, rahim.id), 60000, "Rahim bill = 60000p");
  eq(M.memberBillPaisa(st, karim.id), 45000, "Karim bill = 45000p");
  eq(M.memberBillPaisa(st, sumon.id), 15000, "Sumon bill = 15000p");
  eq(M.memberBalancePaisa(st, rahim.id), 140000, "Rahim balance = +140000p");
  eq(M.memberBalancePaisa(st, karim.id), 105000, "Karim balance = +105000p");
  eq(M.memberBalancePaisa(st, sumon.id), -15000, "Sumon balance = -15000p");
  const order = M.billSummary(st).map(r => r.name);
  eq(order, ["Sumon", "Karim", "Rahim"], "sorted biggest-ower-first");
  eq(M.totalAdvances(st), 350000, "total advances");
  eq(M.totalBills(st), 120000, "total bills");
  eq(M.netBalance(st), 230000, "net balance = 230000p");
  // deleteMember excludes meals from totals
  M.deleteMember(st, sumon.id);
  eq(M.totalMeals(st), 7, "deleted member meals excluded");
  eq(M.billSummary(st).length, 2, "deleted member off bill table");
})();

/* ---------- empty-state math ---------- */
(function () {
  const st = M.blankState();
  eq(M.mealRatePaisa(st), null, "rate null with no meals");
  const m = M.addMember(st, "Rahim", 50000).member;
  eq(M.memberBillPaisa(st, m.id), 0, "bill 0 with no meals");
  eq(M.memberBalancePaisa(st, m.id), 50000, "balance = advance with no meals");
  eq(M.fmtMoney(M.memberBillPaisa(st, m.id), "en"), T + "0.00", "zero bill formats");
})();

/* ---------- expenses ---------- */
(function () {
  const st = M.blankState();
  const A = "2026-10-13";
  eq(M.addExpense(st, "2026-10-14", "x", 100, A).err, "errDateFuture", "future expense rejected");
  eq(M.addExpense(st, "2026-10-13", "x".repeat(121), 100, A).err, "errNoteLong", "long note rejected");
  eq(M.addExpense(st, "2026-10-13", "", 0, A).err, "errAmountPos", "zero amount rejected");
  eq(M.addExpense(st, "2026-10-13", "", -5, A).err, "errAmountPos", "negative amount rejected");
  eq(M.addExpense(st, "2026-10-13", "", 1000000001, A).err, "errAmountMax", "over-max amount rejected");
  M.addExpense(st, "2026-10-13", "new", 40000, A);
  M.addExpense(st, "2026-10-12", "old", 80000, A);
  M.addExpense(st, "2026-09-01", "sept", 10000, A);
  const s = M.expensesSorted(st).map(e => e.date);
  eq(s, ["2026-10-13", "2026-10-12", "2026-09-01"], "expenses newest-first");
  eq(M.monthlyTotal(st, "2026-10"), 120000, "monthly total Oct");
  eq(M.monthlyTotal(st, "2026-09"), 10000, "monthly total Sep");
  const id = st.expenses[0].id;
  eq(M.deleteExpense(st, id).ok, true, "delete expense ok");
  eq(M.deleteExpense(st, "nope").ok, false, "delete unknown expense fails");
})();

/* ---------- export / import ---------- */
(function () {
  const { st } = buildScenario();
  const json = M.exportJSON(st);
  const parsed = JSON.parse(json);
  eq(parsed.app, "mess-manager-bd", "export app id");
  eq(parsed.version, 1, "export version");
  ok(Number.isInteger(parsed.data.members[0].advancePaisa), "export paisa integer");
  ok(Number.isInteger(parsed.data.expenses[0].amountPaisa), "export expense paisa integer");
  const r = M.importJSON(json);
  eq(r.ok, true, "round-trip import ok");
  eq(r.state.members, st.members, "round-trip members equal");
  eq(r.state.mealDays, st.mealDays, "round-trip mealDays equal");
  eq(r.state.expenses, st.expenses, "round-trip expenses equal");
  eq(r.state.settings, st.settings, "round-trip settings equal");

  const base = JSON.parse(json);
  const badCases = [
    ["not json", "this is not json"],
    ["wrong app", JSON.stringify(Object.assign({}, base, { app: "other" }))],
    ["wrong version", JSON.stringify(Object.assign({}, base, { version: 2 }))],
    ["missing data", JSON.stringify({ app: "mess-manager-bd", version: 1 })],
    ["negative advance", JSON.stringify(Object.assign({}, base, { data: Object.assign({}, base.data, { members: [{ id: "a", name: "X", advancePaisa: -5, active: true }] }) }))],
    ["float advance", JSON.stringify(Object.assign({}, base, { data: Object.assign({}, base.data, { members: [{ id: "a", name: "X", advancePaisa: 10.5, active: true }] }) }))],
    ["empty member name", JSON.stringify(Object.assign({}, base, { data: Object.assign({}, base.data, { members: [{ id: "a", name: "  ", advancePaisa: 0, active: true }] }) }))],
    ["dup member names", JSON.stringify(Object.assign({}, base, { data: Object.assign({}, base.data, { members: [{ id: "a", name: "X", advancePaisa: 0, active: true }, { id: "b", name: "x", advancePaisa: 0, active: true }] }) }))],
    ["meal slot 6", JSON.stringify(Object.assign({}, base, { data: Object.assign({}, base.data, { mealDays: { "2026-10-13": { a: { lunch: 6, dinner: 0 } } } }) }))],
    ["meal bad date", JSON.stringify(Object.assign({}, base, { data: Object.assign({}, base.data, { mealDays: { "2026-13-01": { a: { lunch: 1, dinner: 0 } } } }) }))],
    ["expense negative", JSON.stringify(Object.assign({}, base, { data: Object.assign({}, base.data, { expenses: [{ id: "e1", date: "2026-10-13", note: "", amountPaisa: -100 }] }) }))],
    ["expense bad date", JSON.stringify(Object.assign({}, base, { data: Object.assign({}, base.data, { expenses: [{ id: "e1", date: "tomorrow", note: "", amountPaisa: 100 }] }) }))],
    ["bad lang", JSON.stringify(Object.assign({}, base, { data: Object.assign({}, base.data, { settings: { lang: "fr" } }) }))],
  ];
  badCases.forEach(function ([name, text]) {
    const rr = M.importJSON(text);
    eq(rr.ok, false, "malformed rejected: " + name);
    ok(rr.errors.length > 0, "errors listed: " + name);
  });
  // data intact: a fresh valid import still works after all rejections
  eq(M.importJSON(json).ok, true, "valid import still ok after rejections");
})();

/* ---------- i18n ---------- */
(function () {
  const keys = M.i18nKeys();
  // parity is structural: every key resolvable in bn
  let missing = 0, empty = 0, phMismatch = 0;
  keys.forEach(function (k) {
    const en = M.t("en", k), bn = M.t("bn", k);
    if (bn === k && en === k) missing++;
    if (!en || !bn) empty++;
    const ph = s => (s.match(/\{[a-z]+\}/g) || []).sort().join(",");
    if (ph(en) !== ph(bn)) phMismatch++;
  });
  eq(missing, 0, "no missing keys");
  eq(empty, 0, "no empty values");
  eq(phMismatch, 0, "placeholder parity");
  eq(M.t("en", "noSuchKey"), "noSuchKey", "missing key falls back to key");
  eq(M.t("en", "errNameLong", { max: 60 }), "Name must be 60 characters or fewer.", "en placeholder");
  eq(M.t("fr", "add"), "Add", "unknown lang falls back to en");
})();

/* ---------- storage ---------- */
(function () {
  localStorage.clear();
  let r = M.loadState();
  eq(r.corrupt, false, "empty storage not corrupt");
  eq(r.state.members.length, 0, "empty storage blank");
  localStorage.setItem(M.STORAGE_KEY, "{not json");
  r = M.loadState();
  eq(r.corrupt, true, "garbage storage flagged corrupt");
  eq(r.state.members.length, 0, "corrupt storage resets blank");
  localStorage.setItem(M.STORAGE_KEY, JSON.stringify({ members: [{ id: "a" }], mealDays: {}, expenses: [], settings: { lang: "en" } }));
  r = M.loadState();
  eq(r.corrupt, true, "schema-invalid storage flagged corrupt");
  const { st } = buildScenario();
  ok(M.saveState(st), "saveState ok");
  r = M.loadState();
  eq(r.corrupt, false, "saved state loads clean");
  eq(r.state.members.length, 3, "saved members reload");
  eq(M.totalMeals(r.state), 8, "saved meals reload");
  localStorage.clear();
})();

console.log("\n" + pass + " passed, " + fail + " failed");
if (failures.length) {
  console.log("FAILURES:");
  failures.forEach(f => console.log(" - " + f));
  process.exit(1);
}
