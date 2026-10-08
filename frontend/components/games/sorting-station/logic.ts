// Sorting Station — pure game logic (no React).

import { BinIndex, RULE_PAIRS, RulePair, SortItem, SortRule } from "./data";

export const ROUNDS = 2;
export const ITEMS_PER_RULE = 6;
export const ITEMS_PER_ROUND = ITEMS_PER_RULE * 2; // 12
export const TOTAL_ITEMS = ROUNDS * ITEMS_PER_ROUND; // 24
/** Wrong answers on this many items right after each rule change count as switch errors. */
export const SWITCH_WINDOW = 2;

export type RuleKey = "a" | "b";

export interface Trial {
  item: SortItem;
  rule: RuleKey;
}

export interface Round {
  pair: RulePair;
  trials: Trial[]; // 6 under Rule A, then 6 under Rule B
}

type Rng = () => number;

export function shuffle<T>(arr: readonly T[], rng: Rng = Math.random): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function ruleOf(pair: RulePair, key: RuleKey): SortRule {
  return key === "a" ? pair.ruleA : pair.ruleB;
}

export function correctBin(trial: Trial): BinIndex {
  return trial.rule === "a" ? trial.item.a : trial.item.b;
}

/**
 * Pick `n` items from `pool`, aiming for an even split between the two bins
 * under `rule` so that always tapping one bin doesn't pay off. Falls back to
 * any remaining items if a bin runs short.
 */
function pickBalanced(pool: SortItem[], rule: RuleKey, n: number, rng: Rng): SortItem[] {
  const bin0 = shuffle(pool.filter((it) => it[rule] === 0), rng);
  const bin1 = shuffle(pool.filter((it) => it[rule] === 1), rng);
  const half = Math.floor(n / 2);
  const chosen = [...bin0.slice(0, half), ...bin1.slice(0, n - half)];
  if (chosen.length < n) {
    const rest = shuffle(
      pool.filter((it) => !chosen.includes(it)),
      rng
    );
    chosen.push(...rest.slice(0, n - chosen.length));
  }
  return shuffle(chosen, rng);
}

function isBalanced(items: SortItem[], rule: RuleKey): boolean {
  const zeros = items.filter((it) => it[rule] === 0).length;
  return zeros === Math.floor(items.length / 2);
}

function drawRound(pair: RulePair, rng: Rng): { first: SortItem[]; second: SortItem[] } {
  const first = pickBalanced(pair.items, "a", ITEMS_PER_RULE, rng);
  const remaining = pair.items.filter((it) => !first.includes(it));
  const second = pickBalanced(remaining, "b", ITEMS_PER_RULE, rng);
  return { first, second };
}

export function buildRound(pair: RulePair, rng: Rng = Math.random): Round {
  // The first half can occasionally use up one Rule-B bin; redraw until both halves are even.
  let draw = drawRound(pair, rng);
  for (let attempt = 0; attempt < 50; attempt++) {
    if (isBalanced(draw.first, "a") && isBalanced(draw.second, "b")) break;
    draw = drawRound(pair, rng);
  }
  return {
    pair,
    trials: [
      ...draw.first.map((item): Trial => ({ item, rule: "a" })),
      ...draw.second.map((item): Trial => ({ item, rule: "b" })),
    ],
  };
}

/** A full session: 2 rounds, each using a different random rule pair. */
export function buildSession(rng: Rng = Math.random): Round[] {
  const pairs = shuffle(RULE_PAIRS, rng).slice(0, ROUNDS);
  return pairs.map((p) => buildRound(p, rng));
}

/** True for the first SWITCH_WINDOW items after the mid-round rule change. */
export function isSwitchTrial(trialIndex: number): boolean {
  return trialIndex >= ITEMS_PER_RULE && trialIndex < ITEMS_PER_RULE + SWITCH_WINDOW;
}

export function computeScore(correct: number): number {
  return Math.round((correct / TOTAL_ITEMS) * 100);
}
