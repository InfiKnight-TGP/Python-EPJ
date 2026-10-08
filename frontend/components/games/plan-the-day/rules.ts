// Pure errand-planning logic, shared by the game and rules.check.mjs.
// No imports, so Node can run the check directly.

export type Place = "home" | "pharmacy" | "market" | "temple" | "bank";

export interface Errand {
  id: string;
  label: string; // short task, e.g. "Buy medicine"
  place: Place;
}

export type Rule = { icon: string; text: string; hint: string } & (
  | { kind: "closes"; errand: string; hour: number } // must be finished by `hour`
  | { kind: "opens"; errand: string; hour: number } // can't start before `hour`
  | { kind: "before"; first: string; then: string }
);

export interface ErrandSet {
  errands: Errand[]; // 3 errands
  rule: Rule;
}

export const DAY_START = 9; // 9 AM; each errand takes 1 hour

export const formatHour = (hour: number) => `${((hour + 11) % 12) + 1} ${hour < 12 ? "AM" : "PM"}`;

/** The errand id that breaks the rule for this order of errand ids, or null if the order is fine. */
export function ruleBreaker(order: string[], rule: Rule): string | null {
  if (rule.kind === "before") {
    return order.indexOf(rule.first) < order.indexOf(rule.then) ? null : rule.then;
  }
  const start = DAY_START + order.indexOf(rule.errand);
  const broken = rule.kind === "closes" ? start + 1 > rule.hour : start < rule.hour;
  return broken ? rule.errand : null;
}

function permutations<T>(items: T[]): T[][] {
  if (items.length <= 1) return [items];
  return items.flatMap((item, i) =>
    permutations([...items.slice(0, i), ...items.slice(i + 1)]).map((rest) => [item, ...rest])
  );
}

/** Every order of the set's errands that keeps the rule. */
export function validOrders(set: ErrandSet): string[][] {
  return permutations(set.errands.map((e) => e.id)).filter((order) => ruleBreaker(order, set.rule) === null);
}
