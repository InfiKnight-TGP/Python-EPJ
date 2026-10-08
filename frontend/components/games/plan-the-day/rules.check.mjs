// Run from frontend/: node components/games/plan-the-day/rules.check.mjs
// Checks the errand rules and that every piece of content is playable.
import assert from "node:assert/strict";
import { formatHour, ruleBreaker, validOrders } from "./rules.ts";
import { ERRAND_SETS, PLACES, TASKS } from "./data.ts";

assert.deepEqual([9, 11, 12, 13].map(formatHour), ["9 AM", "11 AM", "12 PM", "1 PM"]);

// Slots run 9-10, 10-11, 11-12.
const closes11 = { kind: "closes", errand: "b", hour: 11, icon: "", text: "", hint: "" };
assert.equal(ruleBreaker(["b", "a", "c"], closes11), null); // done by 10
assert.equal(ruleBreaker(["a", "b", "c"], closes11), null); // done by 11
assert.equal(ruleBreaker(["a", "c", "b"], closes11), "b"); // done at 12, too late

const opens10 = { kind: "opens", errand: "b", hour: 10, icon: "", text: "", hint: "" };
assert.equal(ruleBreaker(["b", "a", "c"], opens10), "b"); // 9 AM, still shut
assert.equal(ruleBreaker(["a", "b", "c"], opens10), null);

const before = { kind: "before", first: "a", then: "c", icon: "", text: "", hint: "" };
assert.equal(ruleBreaker(["a", "b", "c"], before), null);
assert.equal(ruleBreaker(["c", "b", "a"], before), "c"); // highlight the errand done too early

assert.ok(TASKS.length >= 10, "need at least 10 step tasks");
for (const task of TASKS) {
  assert.ok(task.steps.length >= 3 && task.steps.length <= 4, `${task.title}: 3-4 steps`);
  assert.equal(new Set(task.steps.map((s) => s.label)).size, task.steps.length, `${task.title}: duplicate step`);
}

assert.ok(ERRAND_SETS.length >= 8, "need at least 8 errand sets");
for (const set of ERRAND_SETS) {
  const ids = set.errands.map((e) => e.id);
  const name = set.rule.text;
  assert.equal(ids.length, 3, `${name}: 3 errands`);
  assert.equal(new Set(ids).size, 3, `${name}: duplicate errand id`);
  for (const e of set.errands) assert.ok(PLACES[e.place], `${name}: unknown place ${e.place}`);
  const named = set.rule.kind === "before" ? [set.rule.first, set.rule.then] : [set.rule.errand];
  for (const id of named) assert.ok(ids.includes(id), `${name}: rule names missing errand ${id}`);
  // The rule must be keepable, and breakable, or the round tests nothing.
  const valid = validOrders(set).length;
  assert.ok(valid > 0 && valid < 6, `${name}: ${valid} of 6 orders keep the rule`);
}

console.log(`OK: ${TASKS.length} tasks, ${ERRAND_SETS.length} errand sets`);
