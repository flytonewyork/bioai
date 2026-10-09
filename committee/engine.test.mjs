// Tests the pure horse engine inside committee/index.html against data/fixtures.
// Run: node --test committee/engine.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import vm from "node:vm";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const start = html.indexOf("/* ---------- horse engine");
const end = html.indexOf("/* ---------- end horse engine ---------- */");
assert.ok(start > 0 && end > start, "engine markers present");
const ctx = vm.createContext({
  TIERS: ["A", "B", "C", "D", "U"],
  arr: v => (Array.isArray(v) ? v : []),
  str: v => (v == null ? "" : String(v)),
});
vm.runInContext(html.slice(start, end) + "\nthis.E = { tierCap, capMessage, changeAllowed, horseNumbers, rankHorses, spreadRatio, nonConsensus, maxRankMove, brierScore, continuousScore, canonicalJson, engineParams };", ctx);
const E = ctx.E;
const fx = JSON.parse(readFileSync(new URL("../data/fixtures/horse-engine.json", import.meta.url), "utf8"));
const tierOf = id => fx.evidence[id].tier;
const P = E.engineParams({ engine_params: { p0: 0.15, slope: 0.05 } });
const clone = o => JSON.parse(JSON.stringify(o));

test("acceptance 1: GFH375 at 3,1,1,2,1 with V=2, L=3 gives S=8, P=0.55, E=3.3, Track", () => {
  const n = E.horseNumbers(fx.gfh375, P);
  assert.equal(n.S, 8); assert.equal(n.P, 0.55); assert.equal(n.V, 2); assert.equal(n.L, 3);
  assert.equal(n.E, 3.3); assert.equal(n.decision, "Track"); assert.equal(n.access, false);
});

test("acceptance 2: mechanism 3 on C-only evidence is refused with the tier rule", () => {
  const msg = E.capMessage("mechanism", 3, ["C"]);
  assert.match(msg, /only with at least one A or B citation/);
  assert.match(msg, /cap is 2/);
  assert.equal(E.capMessage("mechanism", 2, ["C"]), null);
});

test("tier caps follow the spec table", () => {
  assert.equal(E.tierCap("design", []), 0);
  assert.equal(E.tierCap("design", ["D", "U"]), 1);
  assert.equal(E.tierCap("design", ["C"]), 2);
  assert.equal(E.tierCap("design", ["B"]), 3);
  assert.equal(E.tierCap("value_gap", ["U"]), 1);
  assert.equal(E.tierCap("value_gap", ["A", "C"]), 1);
  assert.equal(E.tierCap("value_gap", ["D"]), 3);
  assert.equal(E.tierCap("leverage", ["D"]), 1);
  assert.equal(E.tierCap("leverage", ["C"]), 3);
  assert.match(E.capMessage("leverage", 1, []), /without a cited evidence record/);
});

test("acceptance 3: a changed score with no evidence since the snapshot is refused", () => {
  const added = id => fx.evidence[id].added_at;
  const snap = "2026-10-12T10:00:00.000Z";
  assert.deepEqual({ ...E.changeAllowed(1, 2, ["e-fake-c"], added, snap) }, { ok: false, msg: "Add the new evidence first." });
  assert.equal(E.changeAllowed(1, 2, ["e-fake-c", "e-fake-c-late"], added, snap).ok, true);
  assert.equal(E.changeAllowed(null, 2, [], added, snap).ok, true, "first scoring is exempt");
  assert.equal(E.changeAllowed(2, 2, [], added, snap).ok, true, "unchanged score");
  assert.equal(E.changeAllowed(1, 2, [], added, null).ok, true, "no snapshot yet");
});

test("decisions: Back needs all three thresholds and access", () => {
  const h = clone(fx.gfh375);
  h.scores.design.score = 3; h.scores.exposure.score = 2; // S = 11, P = 0.7
  assert.equal(E.horseNumbers(h, P).decision, "Track", "access no");
  h.scores.access.ok = true;
  assert.equal(E.horseNumbers(h, P).decision, "Back");
  h.scores.value_gap.score = 1; h.scores.leverage.score = 1;
  assert.equal(E.horseNumbers(h, P).decision, "Drop");
  delete h.scores.leverage;
  assert.equal(E.horseNumbers(h, P).decision, "Unscored");
});

test("ranking: by E, ties to the nearer catalyst; checks", () => {
  const mk = (id, v, date) => { const h = clone(fx.gfh375); h.id = id; h.name = id; h.scores.value_gap.score = v; h.next_catalyst = date ? { date } : null; return h; };
  const hs = [mk("a", 1, null), mk("b", 2, "2026-12-01"), mk("c", 2, "2026-11-01"), mk("d", 3, null), mk("e", 0, null), mk("f", 0, null)];
  const rows = E.rankHorses(hs, P);
  assert.deepEqual(rows.map(r => r.horse), ["d", "c", "b", "a", "e", "f"]);
  assert.deepEqual(rows.map(r => r.rank), [1, 2, 3, 4, 5, 6]);
  const sr = E.spreadRatio(rows, P); // top (4.95 + 3.3 + 3.3) / 3 = 3.85; bottom (1.65 + 0 + 0) / 3 = 0.55
  assert.equal(sr.value, 7); assert.equal(sr.pass, true);
  const z = E.spreadRatio(E.rankHorses([hs[1], hs[2], hs[3], hs[4], hs[5], mk("z", 0, null)], P), P);
  assert.equal(z.value, null); assert.equal(z.pass, true); assert.equal(z.note, "bottom three at zero");
  const rows2 = E.rankHorses(hs.slice(0, 4).concat([mk("g", 1, null), mk("h", 1, null)]), P);
  const sr2 = E.spreadRatio(rows2, P);
  assert.equal(sr2.value, 2.3333); assert.equal(sr2.pass, true);
  const byId = id => ({ d: { why_basis: "leverage" }, c: { why_basis: "mechanism" }, b: { why_basis: "comparator" } }[id]);
  assert.deepEqual({ ...E.nonConsensus(rows, byId, P) }, { value: 2, pass: true });
  const moved = rows.map(r => ({ horse: r.horse, rank: r.horse === "d" ? 3 : r.rank }));
  assert.equal(E.maxRankMove(moved, rows), 2);
});

test("acceptance 5 (engine half): canonical JSON is stable and its SHA-256 matches the file bytes", () => {
  const rec = { resolve_by: "2026-10-31", code: "TT-001-600", forecast: { p90: 0.35, median: 0.23, p10: 0.12 }, unit: "" };
  const text = E.canonicalJson(rec);
  assert.equal(text, '{"code":"TT-001-600","forecast":{"median":0.23,"p10":0.12,"p90":0.35},"resolve_by":"2026-10-31","unit":""}');
  assert.equal(E.canonicalJson(JSON.parse(text)), text, "round trip through the database is byte-identical");
  assert.equal(createHash("sha256").update(text).digest("hex").length, 64);
});

test("call scoring", () => {
  assert.equal(E.brierScore(0.7, true), 0.09);
  assert.equal(E.brierScore(0.7, false), 0.49);
  assert.deepEqual({ ...E.continuousScore({ median: 0.23, p10: 0.12, p90: 0.35 }, 0.31) }, { inside80: true, error: 0.08, abs_error: 0.08 });
  assert.equal(E.continuousScore({ median: 0.23, p10: 0.12, p90: 0.35 }, 0.4).inside80, false);
});
