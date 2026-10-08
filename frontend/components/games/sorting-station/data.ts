// Sorting Station — rule pairs and items.
//
// Every item stores its correct bin under BOTH rules of its pair:
//   a: bin index (0 | 1) under Rule A
//   b: bin index (0 | 1) under Rule B
// Bin 0 / bin 1 refer to the order of `bins` on each rule.
// Items were chosen so each answer is unambiguous in an everyday Indian home
// (e.g. no tomato for fruit/vegetable, no coconut for puja/kitchen).

export type BinIndex = 0 | 1;

export interface Bin {
  emoji: string;
  label: string;
}

export interface SortRule {
  /** Short phrase used in "Now sort by ___" and above the bins. */
  sortBy: string;
  bins: [Bin, Bin];
}

export interface SortItem {
  emoji: string;
  label: string;
  a: BinIndex;
  b: BinIndex;
}

export interface RulePair {
  id: string;
  ruleA: SortRule;
  ruleB: SortRule;
  items: SortItem[];
}

// ---------------------------------------------------------------------------
// Pair 1: Wet waste vs Dry waste  ->  Kitchen items vs Bathroom items
// a: 0 = Wet, 1 = Dry      b: 0 = Kitchen, 1 = Bathroom
// ---------------------------------------------------------------------------
const WASTE_ROOM: RulePair = {
  id: "waste-room",
  ruleA: {
    sortBy: "Wet waste or Dry waste",
    bins: [
      { emoji: "🟢", label: "Wet waste" },
      { emoji: "🔵", label: "Dry waste" },
    ],
  },
  ruleB: {
    sortBy: "Kitchen or Bathroom",
    bins: [
      { emoji: "🍳", label: "Kitchen" },
      { emoji: "🛁", label: "Bathroom" },
    ],
  },
  items: [
    { emoji: "🍌", label: "Banana peel", a: 0, b: 0 },
    { emoji: "🥕", label: "Carrot peels", a: 0, b: 0 },
    { emoji: "🥚", label: "Eggshells", a: 0, b: 0 },
    { emoji: "🍚", label: "Leftover rice", a: 0, b: 0 },
    { emoji: "🍵", label: "Used tea leaves", a: 0, b: 0 },
    { emoji: "🧅", label: "Onion skins", a: 0, b: 0 },
    { emoji: "🍋", label: "Squeezed lemon", a: 0, b: 0 },
    { emoji: "🥛", label: "Empty milk packet", a: 1, b: 0 },
    { emoji: "🍪", label: "Biscuit wrapper", a: 1, b: 0 },
    { emoji: "🥫", label: "Empty tin can", a: 1, b: 0 },
    { emoji: "🫙", label: "Empty glass jar", a: 1, b: 0 },
    { emoji: "🧴", label: "Empty shampoo bottle", a: 1, b: 1 },
    { emoji: "🪥", label: "Old toothbrush", a: 1, b: 1 },
    { emoji: "🧼", label: "Soap wrapper", a: 1, b: 1 },
    { emoji: "🪒", label: "Used razor", a: 1, b: 1 },
    { emoji: "🧻", label: "Toilet roll tube", a: 1, b: 1 },
    { emoji: "🩴", label: "Old bathroom slipper", a: 1, b: 1 },
    { emoji: "🪣", label: "Broken bathroom mug", a: 1, b: 1 },
  ],
};

// ---------------------------------------------------------------------------
// Pair 2: Fruits vs Vegetables  ->  Red/orange vs Green
// a: 0 = Fruit, 1 = Vegetable      b: 0 = Red/orange, 1 = Green
// ---------------------------------------------------------------------------
const FRUIT_COLOUR: RulePair = {
  id: "fruit-colour",
  ruleA: {
    sortBy: "Fruit or Vegetable",
    bins: [
      { emoji: "🍎", label: "Fruit" },
      { emoji: "🥦", label: "Vegetable" },
    ],
  },
  ruleB: {
    sortBy: "Colour: Red/orange or Green",
    bins: [
      { emoji: "🟠", label: "Red / orange" },
      { emoji: "🟩", label: "Green" },
    ],
  },
  items: [
    { emoji: "🍎", label: "Red apple", a: 0, b: 0 },
    { emoji: "🥭", label: "Ripe mango", a: 0, b: 0 },
    { emoji: "🍊", label: "Orange", a: 0, b: 0 },
    { emoji: "🍓", label: "Strawberry", a: 0, b: 0 },
    { emoji: "🍒", label: "Cherries", a: 0, b: 0 },
    { emoji: "🍏", label: "Green apple", a: 0, b: 1 },
    { emoji: "🍐", label: "Green pear", a: 0, b: 1 },
    { emoji: "🥕", label: "Carrot", a: 1, b: 0 },
    { emoji: "🌶️", label: "Red chilli", a: 1, b: 0 },
    { emoji: "🎃", label: "Pumpkin", a: 1, b: 0 },
    { emoji: "🥦", label: "Broccoli", a: 1, b: 1 },
    { emoji: "🥒", label: "Cucumber", a: 1, b: 1 },
    { emoji: "🫑", label: "Green capsicum", a: 1, b: 1 },
    { emoji: "🥬", label: "Spinach (palak)", a: 1, b: 1 },
    { emoji: "🫛", label: "Green peas (matar)", a: 1, b: 1 },
    { emoji: "🌿", label: "Methi leaves", a: 1, b: 1 },
  ],
};

// ---------------------------------------------------------------------------
// Pair 3: Things you eat vs Things you wear  ->  Hot vs Cold
// a: 0 = Eat, 1 = Wear      b: 0 = Hot / warm, 1 = Cold / cool
// Clothes are all warm winter wear so "Hot / warm" is the only sensible answer.
// ---------------------------------------------------------------------------
const EAT_TEMP: RulePair = {
  id: "eat-temp",
  ruleA: {
    sortBy: "Things you eat or Things you wear",
    bins: [
      { emoji: "🍽️", label: "Eat" },
      { emoji: "👕", label: "Wear" },
    ],
  },
  ruleB: {
    sortBy: "Hot or Cold",
    bins: [
      { emoji: "🔥", label: "Hot / warm" },
      { emoji: "❄️", label: "Cold / cool" },
    ],
  },
  items: [
    { emoji: "🥟", label: "Hot momos", a: 0, b: 0 },
    { emoji: "🍛", label: "Hot dal-chawal", a: 0, b: 0 },
    { emoji: "🍜", label: "Hot Maggi noodles", a: 0, b: 0 },
    { emoji: "🌽", label: "Roasted bhutta", a: 0, b: 0 },
    { emoji: "🫓", label: "Fresh hot roti", a: 0, b: 0 },
    { emoji: "🍦", label: "Ice cream cone", a: 0, b: 1 },
    { emoji: "🍧", label: "Ice gola", a: 0, b: 1 },
    { emoji: "🍨", label: "Kulfi", a: 0, b: 1 },
    { emoji: "🍉", label: "Chilled watermelon", a: 0, b: 1 },
    { emoji: "🍮", label: "Chilled fruit custard", a: 0, b: 1 },
    { emoji: "🥭", label: "Chilled mango slices", a: 0, b: 1 },
    { emoji: "🧶", label: "Woollen sweater", a: 1, b: 0 },
    { emoji: "🧣", label: "Woollen muffler", a: 1, b: 0 },
    { emoji: "🧤", label: "Woollen gloves", a: 1, b: 0 },
    { emoji: "🧥", label: "Winter jacket", a: 1, b: 0 },
    { emoji: "🧦", label: "Woollen socks", a: 1, b: 0 },
  ],
};

// ---------------------------------------------------------------------------
// Pair 4: Puja items vs Kitchen items  ->  Metal vs Not metal
// a: 0 = Puja, 1 = Kitchen      b: 0 = Metal, 1 = Not metal
// ---------------------------------------------------------------------------
const PUJA_METAL: RulePair = {
  id: "puja-metal",
  ruleA: {
    sortBy: "Puja item or Kitchen item",
    bins: [
      { emoji: "🛕", label: "Puja" },
      { emoji: "🍳", label: "Kitchen" },
    ],
  },
  ruleB: {
    sortBy: "Metal or Not metal",
    bins: [
      { emoji: "🔩", label: "Metal" },
      { emoji: "🌱", label: "Not metal" },
    ],
  },
  items: [
    { emoji: "🔔", label: "Brass puja bell", a: 0, b: 0 },
    { emoji: "🪔", label: "Brass diya", a: 0, b: 0 },
    { emoji: "🏺", label: "Copper kalash", a: 0, b: 0 },
    { emoji: "🪙", label: "Silver puja coin", a: 0, b: 0 },
    { emoji: "🌼", label: "Marigold flowers", a: 0, b: 1 },
    { emoji: "🧵", label: "Sacred thread (mauli)", a: 0, b: 1 },
    { emoji: "🌿", label: "Tulsi leaves", a: 0, b: 1 },
    { emoji: "🔴", label: "Kumkum powder", a: 0, b: 1 },
    { emoji: "🍳", label: "Iron tawa", a: 1, b: 0 },
    { emoji: "🥄", label: "Steel spoon", a: 1, b: 0 },
    { emoji: "🔪", label: "Kitchen knife", a: 1, b: 0 },
    { emoji: "🫕", label: "Pressure cooker", a: 1, b: 0 },
    { emoji: "🪵", label: "Wooden belan", a: 1, b: 1 },
    { emoji: "🫙", label: "Glass pickle jar", a: 1, b: 1 },
    { emoji: "🧽", label: "Dish sponge", a: 1, b: 1 },
    { emoji: "🥣", label: "Ceramic bowl", a: 1, b: 1 },
  ],
};

export const RULE_PAIRS: RulePair[] = [WASTE_ROOM, FRUIT_COLOUR, EAT_TEMP, PUJA_METAL];
