// Headless-Chrome smoke tests for mess-manager-bd (raw CDP, file:// + ?asof=). ASCII only.
import { launchChrome, waitPort, newPage, CDP, sleep } from "./cdp.mjs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const T = "\u09F3"; // taka sign U+09F3
const DIR = path.resolve(process.argv[2] || ".");
const PAGE_URL = pathToFileURL(path.join(DIR, "index.html")).href + "?asof=2026-10-13";
const PORT = 9333 + (process.pid % 500);

let pass = 0, fail = 0;
const failures = [];
function check(c, msg, extra) {
  if (c) { pass++; }
  else { fail++; failures.push(msg + (extra !== undefined ? " | got: " + JSON.stringify(extra) : "")); }
}

const proc = launchChrome(PORT);
const errors = { console: [], page: [] };
const netReqs = [];
let cdp, page;
try {
  await waitPort(PORT);
  page = await newPage(PORT, PAGE_URL);
  cdp = new CDP(page.webSocketDebuggerUrl);
  await cdp.connect();
  cdp.on("Runtime.consoleAPICalled", p => {
    if (p.type === "error") errors.console.push(JSON.stringify(p.args).slice(0, 300));
  });
  cdp.on("Log.entryAdded", p => {
    if (p.entry.level === "error") errors.console.push(p.entry.text.slice(0, 300));
  });
  cdp.on("Runtime.exceptionThrown", p => {
    errors.page.push((p.exceptionDetails.text || "exception").slice(0, 300));
  });
  cdp.on("Network.requestWillBeSent", p => { netReqs.push(p.request.url); });
  await cdp.send("Runtime.enable"); await cdp.send("Page.enable");
  await cdp.send("Network.enable"); await cdp.send("Log.enable");

  const ev = (js) => cdp.eval(js);
  async function waitFor(js, tries = 40) {
    for (let i = 0; i < tries; i++) {
      try { if (await ev(js)) return true; } catch (e) {}
      await sleep(150);
    }
    return false;
  }
  check(await waitFor("!!window.__mm"), "app booted (window.__mm)");

  // 1. empty states
  check(await ev("!document.getElementById('dashEmpty').hidden"), "dashboard empty state visible");
  check(await ev("document.getElementById('mealDate').value"), "asof date default", await ev("document.getElementById('mealDate').value"));
  check(await ev("document.getElementById('mealDate').value") === "2026-10-13", "meal date defaults to asof");

  // 2. add members via UI
  async function addMember(name, adv) {
    return ev(`(() => {
      document.getElementById('mName').value = ${JSON.stringify(name)};
      document.getElementById('mAdvance').value = ${JSON.stringify(adv)};
      document.getElementById('mAdd').click();
      return document.querySelectorAll('#memberList .member-row').length;
    })()`);
  }
  check(await addMember("Rahim", "2000") === 1, "member 1 added");
  check(await addMember("Karim", "1500") === 2, "member 2 added");
  check(await addMember("Sumon", "0") === 3, "member 3 added");
  // duplicate rejected inline
  await addMember("rahim", "100");
  check(await ev("!document.getElementById('mErr').hidden"), "duplicate name inline error");
  check(await ev("document.querySelectorAll('#memberList .member-row').length") === 3, "dup not added");
  // empty name rejected inline
  await ev(`(() => { document.getElementById('mName').value=''; document.getElementById('mAdd').click(); return !document.getElementById('mErr').hidden; })()`)
    .then(v => check(v, "empty name inline error"));

  // 3. meals tab: log day1 (2026-10-12) then day2 (asof)
  await ev(`(() => { document.querySelector('[data-tab="meals"]').click(); return true; })()`);
  async function setDate(d) {
    await ev(`(() => { const i = document.getElementById('mealDate'); i.value = ${JSON.stringify(d)}; i.dispatchEvent(new Event('change', {bubbles:true})); return true; })()`);
    await sleep(200);
  }
  async function logMeals(name, lunch, dinner) {
    return ev(`(() => {
      const rows = [...document.querySelectorAll('#mealRows .meal-row')];
      const row = rows.find(r => r.querySelector('.nm').textContent.trim() === ${JSON.stringify(name)});
      const inc = row.querySelectorAll('button[data-act="inc"]');
      for (let i = 0; i < ${lunch}; i++) inc[0].click();
      for (let i = 0; i < ${dinner}; i++) inc[1].click();
      return document.getElementById('dayTotalVal').textContent;
    })()`);
  }
  await setDate("2026-10-12");
  await logMeals("Rahim", 1, 1); await logMeals("Karim", 1, 1); await logMeals("Sumon", 1, 0);
  check(await ev("document.getElementById('dayTotalVal').textContent") === "5", "day1 total = 5");
  await ev("document.getElementById('saveMeals').click()"); await sleep(300);
  check(await ev("document.getElementById('toast').textContent").then(t => t.includes("Meals")), "meals saved toast");
  await setDate("2026-10-13");
  await logMeals("Rahim", 1, 1); await logMeals("Karim", 1, 0);
  check(await ev("document.getElementById('dayTotalVal').textContent") === "3", "day2 total = 3");
  await ev("document.getElementById('saveMeals').click()"); await sleep(300);

  // 4. bazaar expenses via UI
  await ev(`(() => { document.querySelector('[data-tab="bazaar"]').click(); return true; })()`);
  async function addExpense(date, note, amount) {
    return ev(`(() => {
      document.getElementById('eDate').value = ${JSON.stringify(date)};
      document.getElementById('eNote').value = ${JSON.stringify(note)};
      document.getElementById('eAmount').value = ${JSON.stringify(amount)};
      document.getElementById('eAdd').click();
      return document.querySelectorAll('#expenseList .exp-row').length;
    })()`);
  }
  check(await addExpense("2026-10-12", "bazaar", "800") === 1, "expense 1 added");
  check(await addExpense("2026-10-13", "bazaar", "400") === 2, "expense 2 added");
  check(await ev("document.getElementById('monthTotal').textContent") === T + "1,200.00", "monthly total", await ev("document.getElementById('monthTotal').textContent"));

  // 5. dashboard: hand-verified values
  await ev(`(() => { document.querySelector('[data-tab="dashboard"]').click(); return true; })()`);
  await sleep(200);
  check(await ev("document.getElementById('rateHero').textContent") === T + "150.00", "rate hero 150.00", await ev("document.getElementById('rateHero').textContent"));
  const rows = await ev("([...document.querySelectorAll('#billBody tr')].map(tr => [...tr.cells].map(td => td.textContent.trim())))");
  check(rows.length === 3, "3 bill rows");
  check(rows[0][0] === "Sumon", "row1 = Sumon (biggest ower first)", rows[0] && rows[0][0]);
  check(rows[0][1] === "1" && rows[0][2] === T + "150.00" && rows[0][3] === T + "0.00", "Sumon meals/bill/advance", rows[0]);
  check(rows[0][4].startsWith("-" + T + "150.00"), "Sumon balance -150.00", rows[0] && rows[0][4]);
  check(rows[1][0] === "Karim" && rows[1][1] === "3" && rows[1][2] === T + "450.00", "Karim row", rows[1]);
  check(rows[1][4].startsWith(T + "1,050.00"), "Karim balance 1050.00", rows[1] && rows[1][4]);
  check(rows[2][0] === "Rahim" && rows[2][1] === "4" && rows[2][2] === T + "600.00", "Rahim row", rows[2]);
  check(rows[2][4].startsWith(T + "1,400.00"), "Rahim balance 1400.00", rows[2] && rows[2][4]);

  // 6. BN toggle: Bengali digits + persists after reload
  await ev("document.getElementById('langBtn').click()"); await sleep(300);
  const bnHero = await ev("document.getElementById('rateHero').textContent");
  check(bnHero === T + "\u09E7\u09EB\u09E6.\u09E6\u09E6", "BN rate hero Bengali digits", bnHero);
  const bnBadge = await ev("document.querySelector('#billBody .badge.owes').textContent");
  check(bnBadge.length > 0 && bnBadge !== "owes", "BN badge translated", bnBadge);
  await cdp.send("Page.navigate", { url: PAGE_URL }); await sleep(500);
  check(await waitFor("!!window.__mm"), "reloaded after BN toggle");
  await sleep(300);
  check(await ev("document.getElementById('langBtn').textContent") === "EN", "BN lang persisted (toggle shows EN)");
  const bnHero2 = await ev("document.getElementById('rateHero').textContent");
  check(bnHero2 === bnHero, "BN rate persists after reload", bnHero2);
  // back to EN for the rest
  await ev("document.getElementById('langBtn').click()"); await sleep(300);

  // 7. export -> clear -> import round-trip
  await ev(`(() => { document.querySelector('[data-tab="data"]').click(); return true; })()`);
  await ev("document.getElementById('expBtn').click()"); await sleep(400);
  const exported = await ev("window.__lastExport");
  check(typeof exported === "string" && exported.includes('"app":"mess-manager-bd"'), "export JSON captured");
  const expObj = JSON.parse(exported);
  check(Number.isInteger(expObj.data.members[0].advancePaisa), "export paisa integers");
  await ev("document.getElementById('clearBtn').click()"); await sleep(200);
  check(await ev("!document.getElementById('modal').hidden"), "clear-all modal shown");
  await ev("document.getElementById('modalOk').click()"); await sleep(400);
  check(await ev("!document.getElementById('dashEmpty').hidden") || await ev("document.querySelectorAll('#billBody tr').length") === 0, "data cleared");
  const impOk = await ev(`window.__importText(window.__lastExport)`);
  await sleep(300);
  check(impOk === true, "import round-trip ok");
  check(await ev("document.querySelectorAll('#billBody tr').length") === 3, "3 bill rows restored");
  check(await ev("document.getElementById('rateHero').textContent") === T + "150.00", "rate restored");

  // 8. malformed import rejected, data intact
  const badOk = await ev(`window.__importText('{"app":"wrong","version":1}')`);
  check(badOk === false, "malformed import rejected");
  check(await ev("!document.getElementById('dErr').hidden"), "import error shown");
  check(await ev("document.querySelectorAll('#billBody tr').length") === 3, "data intact after bad import");
  check(await ev("document.getElementById('rateHero').textContent") === T + "150.00", "rate intact after bad import");

  // 9. 390px mobile: no horizontal overflow on any tab
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await sleep(400);
  for (const tab of ["dashboard", "meals", "members", "bazaar", "data"]) {
    await ev(`(() => { document.querySelector('[data-tab="${tab}"]').click(); return true; })()`);
    await sleep(250);
    const sw = await ev("document.documentElement.scrollWidth");
    check(sw <= 391, "390px no overflow: " + tab, sw);
  }

  // 10. zero non-file network requests
  const ext = netReqs.filter(u => !u.startsWith("file://") && !u.startsWith("blob:") && !u.startsWith("data:"));
  check(ext.length === 0, "zero non-file network requests", ext.slice(0, 3));
} finally {
  try { cdp && cdp.close(); } catch (e) {}
  try { await fetch("http://127.0.0.1:" + PORT + "/json/close/" + (page && page.id), { method: "PUT" }).catch(() => {}); } catch (e) {}
  proc.kill();
}

check(errors.console.length === 0, "zero console errors", errors.console.slice(0, 3));
check(errors.page.length === 0, "zero page errors", errors.page.slice(0, 3));

console.log("\n" + pass + " passed, " + fail + " failed");
if (failures.length) { console.log("FAILURES:"); failures.forEach(f => console.log(" - " + f)); process.exit(1); }
